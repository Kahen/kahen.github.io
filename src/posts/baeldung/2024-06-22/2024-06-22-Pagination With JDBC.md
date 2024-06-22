---
date: 2024-06-23
category:
  - Java
  - JDBC
tag:
  - Pagination
  - JDBC
head:
  - - meta
    - name: Pagination With JDBC
      content: 介绍如何使用JDBC实现分页查询
---

# JDBC分页查询

## 1. 引言

大量表格读取可能会导致应用程序内存不足。它们还会给数据库增加额外的负载，并需要更多的带宽来执行。在读取大型表格时推荐的方法是使用分页查询。本质上，我们读取数据的一个子集（页面），处理数据，然后移动到下一页。

在本文中，我们将讨论并实现使用JDBC进行分页的不同策略。

## 2. 设置

首先，我们需要根据我们的数据库在_pom.xml_文件中添加适当的JDBC依赖项，以便我们可以连接到我们的数据库。例如，如果我们的数据库是PostgreSQL，我们需要添加PostgreSQL依赖项：

```xml
`<dependency>`
    `<groupId>`org.postgresql`</groupId>`
    `<artifactId>`postgresql`</artifactId>`
    `<version>`42.6.0`</version>`
`</dependency>`
```

其次，我们需要一个大型数据集来进行分页查询。让我们创建一个_employees_表，并向其中插入一百万个记录：

```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    salary DECIMAL(10, 2)
);
```

```sql
INSERT INTO employees (first_name, last_name, salary)
SELECT
    'FirstName' || series_number,
    'LastName' || series_number,
    (random() * 100000)::DECIMAL(10, 2) -- 根据需要调整范围
FROM generate_series(1, 1000000) as series_number;
```

最后，我们将在我们的示例应用程序中创建一个连接对象，并使用我们的数据库连接进行配置：

```java
Connection connect() throws SQLException {
    Connection connection = DriverManager.getConnection(url, user, password);
    if (connection != null) {
        System.out.println("Connected to database");
    }
    return connection;
}
```

**我们的数据集包含大约100万条记录，一次性查询它们不仅对数据库造成压力，还因为需要在给定时刻传输更多数据，对带宽造成压力。此外，它还对我们的内存应用程序空间造成压力，因为需要更多的数据适应RAM。在读取大型数据集时，始终建议以页面或批次的形式进行读取和处理。**

JDBC没有提供现成的方法来按页面读取，但我们可以通过自己实现一些方法。我们将讨论并实现这两种方法。

### 3.1. 使用LIMIT和OFFSET

**我们可以使用_LIMIT_和_OFFSET_与我们的选择查询一起返回定义大小的结果。_LIMIT_子句获取我们想要返回的行数，而_OFFSET_子句从查询结果中跳过定义的行数。**然后，我们可以通过控制_OFFSET_位置来分页我们的查询。

在下面的逻辑中，我们已经定义了_LIMIT_为_pageSize_和_offset_为读取记录的起始位置：

```java
ResultSet readPageWithLimitAndOffset(Connection connection, int offset, int pageSize) throws SQLException {
    String sql = """
        SELECT * FROM employees
        LIMIT ? OFFSET ?
    """;
    PreparedStatement preparedStatement = connection.prepareStatement(sql);
    preparedStatement.setInt(1, pageSize);
    preparedStatement.setInt(2, offset);

    return preparedStatement.executeQuery();
}
```

查询结果是数据的单页。要分页读取整个表，我们为每个页面迭代，处理每个页面的记录，然后移动到下一页。

### 3.2. 使用排序键与LIMIT

**我们还可以使用排序键与_LIMIT_来批量读取结果。**例如，在我们的_employees_表中，我们有一个_ID_列，这是一个自动递增的列，并且有一个索引。我们将使用这个_ID_列来设置我们页面的下限，而**_LIMIT_将帮助我们设置页面的上限**：

```java
ResultSet readPageWithSortedKeys(Connection connection, int lastFetchedId, int pageSize) throws SQLException {
    String sql = """
      SELECT * FROM employees
      WHERE id > ? LIMIT ?
    """;
    PreparedStatement preparedStatement = connection.prepareStatement(sql);
    preparedStatement.setInt(1, lastFetchedId);
    preparedStatement.setInt(2, pageSize);

    return preparedStatement.executeQuery();
}
```

正如我们在上述逻辑中看到的，我们传递_lastFetchedId_作为页面的下限，而_pageSize_将是我们使用_LIMIT_设置的上限。

## 4. 测试

让我们通过编写简单的单元测试来测试我们的逻辑。为了测试，我们将设置一个数据库并向表中插入100万条记录。我们每个测试类运行一次_setup()_和_tearDown()_方法，用于设置测试数据和拆除：

```java
@BeforeAll
public static void setup() throws Exception {
    connection = connect(JDBC_URL, USERNAME, PASSWORD);
    populateDB();
}

@AfterAll
public static void tearDown() throws SQLException {
    destroyDB();
}
```

_populateDB()_方法首先创建一个_employees_表，并为100万员工插入样本记录：

```java
private static void populateDB() throws SQLException {
    String createTable = """
        CREATE TABLE EMPLOYEES (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(50),
            last_name VARCHAR(50),
            salary DECIMAL(10, 2)
        );
        """;
    PreparedStatement preparedStatement = connection.prepareStatement(createTable);
    preparedStatement.execute();

    String load = """
        INSERT INTO EMPLOYEES (first_name, last_name, salary)
        VALUES(?,?,?)
    """;
    IntStream.rangeClosed(1,1_000_000).forEach(i-> {
        PreparedStatement preparedStatement1 = null;
        try {
            preparedStatement1 = connection.prepareStatement(load);
            preparedStatement1.setString(1,"firstname"+i);
            preparedStatement1.setString(2,"lastname"+i);
            preparedStatement1.setDouble(3, 100_000+(1_000_000-100_000)+Math.random());

            preparedStatement1.execute();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    });
}
```

我们的_tearDown()_方法销毁了_employees_表：

```java
private static void destroyDB() throws SQLException {
    String destroy = """
        DROP table EMPLOYEES;
    """;
    connection
      .prepareStatement(destroy)
      .execute();
}
```

一旦我们设置了测试数据，我们可以**为_LIMIT_和_OFFSET_方法编写一个简单的单元测试**来验证页面大小：

```java
@Test
void givenDBPopulated_WhenReadPageWithLimitAndOffset_ThenReturnsPaginatedResult() throws SQLException {
    int offset = 0;
    int pageSize = 100_000;
    int totalPages = 0;
    while (true) {
        ResultSet resultSet = PaginationLogic.readPageWithLimitAndOffset(connection, offset, pageSize);
        if (!resultSet.next()) {
            break;
        }

        List`<String>` resultPage = new ArrayList<>();
        do {
            resultPage.add(resultSet.getString("first_name"));
        } while (resultSet.next());

        assertEquals("firstname" + (resultPage.size() * (totalPages + 1)), resultPage.get(resultPage.size() - 1));
        offset += pageSize;
        totalPages++;
    }
    assertEquals(10, totalPages);
}
```

正如我们在上面看到的，我们也循环读取数据库中的所有记录，分页进行，对于每一页，我们验证最后读取的记录。

类似地，我们可以**为使用_ID_列进行排序键分页**编写另一个测试：

```java
@Test
void givenDBPopulated_WhenReadPageWithSortedKeys_ThenReturnsPaginatedResult() throws SQLException {
    PreparedStatement preparedStatement = connection.prepareStatement("SELECT min(id) as min_id, max(id) as max_id FROM employees");
    ResultSet resultSet = preparedStatement.executeQuery();
    resultSet.next();

    int minId = resultSet.getInt("min_id");
    int maxId = resultSet.getInt("max_id");
    int lastFetchedId = 0; // 将lastFetchedId分配给minId

    int pageSize = 100_000;
    int totalPages = 0;

    while ((lastFetchedId + pageSize) <= maxId) {
        resultSet = PaginationLogic.readPageWithSortedKeys(connection, lastFetchedId, pageSize);
        if (!resultSet.next()) {
            break;
        }

        List`<String>` resultPage = new ArrayList<>();
        do {
            resultPage.add(resultSet.getString("first_name"));
            lastFetchedId = resultSet.getInt("id");
        } while (resultSet.next());

        assertEquals("firstname" + (resultPage.size() * (totalPages + 1)), resultPage.get(resultPage.size() - 1));
        totalPages++;
    }
    assertEquals(10, totalPages);
}
```

正如我们在上面看到的，我们循环遍历整个表，一次一页地读取所有数据。我们找到_minId_和_maxId_，这将帮助我们定义循环的迭代窗口。然后，我们为每一页断言最后读取的记录和总页面大小。

## 5. 结论

在本文中，我们讨论了分批读取大型数据集而不是一次性查询它们。我们讨论并实现了两种方法，并进行了单元测试验证了它们的工作。

_LIMIT_和_OFFSET_方法可能对大型数据集变得效率低下，因为它们读取所有行并跳过_OFFSET_位置定义的行，而排序键方法是高效的，因为它只查询使用