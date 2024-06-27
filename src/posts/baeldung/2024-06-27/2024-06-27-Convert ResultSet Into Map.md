---
date: 2024-06-27
category:
  - Java
  - JDBC
tag:
  - ResultSet
  - Map
head:
  - - meta
    - name: keywords
      content: Java, JDBC, ResultSet, Map, 数据库, 转换
------
# ResultSet 转换为 Map

Java应用程序广泛使用Java数据库连接（JDBC）API来连接和在数据库上执行查询。ResultSet是由这些查询提取的数据的表格表示。

在本教程中，我们将学习如何将JDBC ResultSet的数据转换为Map。

## 2. 设置

我们将编写一些测试用例来实现我们的目标。我们的数据源将是一个H2数据库。H2是一个快速的、开源的、内存中的数据库，支持JDBC API。让我们添加相关的Maven依赖项：

```
`<dependency>`
    `<groupId>`com.h2database`</groupId>`
    `<artifactId>`h2`</artifactId>`
`</dependency>`
```

数据库连接准备就绪后，我们将编写一个方法来为我们的测试用例进行初始数据设置。为此，我们首先创建一个JDBC Statement，然后使用它创建一个名为employee的数据库表。employee表包含名为empId、empName和empCity的列，将保存有关员工的ID、名称和城市的信息。现在我们可以使用Statement.execute()方法在表中插入示例数据：

```java
void initialDataSetup() throws SQLException {
    Statement statement = connection.createStatement();

    String sql = "CREATE TABLE employee ( "
      + "empId INTEGER not null, "
      + "empName VARCHAR(50), "
      + "empCity VARCHAR(50), "
      + "PRIMARY KEY (empId))";

    statement.execute(sql);

    List`<String>` sqlQueryList = Arrays.asList(
      "INSERT INTO employee VALUES (1, 'Steve','London')",
      "INSERT INTO employee VALUES (2, 'John','London')",
      "INSERT INTO employee VALUES (3, 'David', 'Sydney')",
      "INSERT INTO employee VALUES (4, 'Kevin','London')",
      "INSERT INTO employee VALUES (5, 'Jade', 'Sydney')");

    for (String query: sqlQueryList) {
        statement.execute(query);
    }
}
```

现在示例数据已经存在于数据库中，我们可以查询它以提取。查询数据库给出的输出形式是ResultSet。我们的目标是将来自这个ResultSet的数据转换为一个Map，其中键是城市名称，值是那个城市中员工名称的列表。

### 3.1. 使用Java 7

我们将首先从数据库连接创建一个PreparedStatement，并为其提供一个SQL查询。然后，我们可以使用PreparedStatement.executeQuery()方法来获取ResultSet。

现在我们可以迭代ResultSet数据并单独获取列数据。为此，我们可以使用ResultSet.getString()方法，通过传递employee表的列名来实现。之后，我们可以使用Map.containsKey()方法来检查映射是否已经包含该城市的条目。如果没有找到该城市的键，我们将添加一个条目，将城市名称作为键，一个空的ArrayList作为值。然后我们将员工的名称添加到该城市员工名称的列表中：

```java
@Test
void whenUsingContainsKey_thenConvertResultSetToMap() throws SQLException {
    ResultSet resultSet = connection.prepareStatement(
        "SELECT * FROM employee").executeQuery();
    Map<String, List`<String>`> valueMap = new HashMap<>();

    while (resultSet.next()) {
        String empCity = resultSet.getString("empCity");
        String empName = resultSet.getString("empName");
        if (!valueMap.containsKey(empCity)) {
            valueMap.put(empCity, new ArrayList<>());
        }
        valueMap.get(empCity).add(empName);
    }
    assertEquals(3, valueMap.get("London").size());
}
```

### 3.2. 使用Java 8

Java 8引入了lambda表达式和默认方法的概念。我们可以在实现中利用它们来简化输出映射中新键的输入。**我们可以使用Map类中的computeIfAbsent()方法**，它接受两个参数：一个键和一个映射函数。如果找到了键，则返回相关值；否则，它将使用映射函数创建默认值，并将新键值对存储在映射中。

以下是使用Java 8的先前测试用例的修改版本：

```java
@Test
void whenUsingComputeIfAbsent_thenConvertResultSetToMap() throws SQLException {
    ResultSet resultSet = connection.prepareStatement(
        "SELECT * FROM employee").executeQuery();
    Map<String, List`<String>`> valueMap = new HashMap<>();

    while (resultSet.next()) {
        String empCity = resultSet.getString("empCity");
        String empName = resultSet.getString("empName");
        valueMap.computeIfAbsent(empCity, data -> new ArrayList<>()).add(empName);
    }
    assertEquals(3, valueMap.get("London").size());
}
```

### 3.3. 使用Apache Commons DbUtils

Apache Commons DbUtils是一个第三方库，为JDBC操作提供了额外和简化的功能。它提供了一个有趣的接口名为ResultSetHandler，它将JDBC ResultSet作为输入，并允许我们将其实现为应用程序期望的对象。此外，这个库使用QueryRunner类在数据库表上运行SQL查询。**QueryRunner的query()方法接受数据库连接、SQL查询和ResultSetHandler作为输入，并直接返回预期的格式。**

让我们看看如何使用ResultSetHandler从ResultSet创建Map的示例：

```java
@Test
void whenUsingDbUtils_thenConvertResultSetToMap() throws SQLException {

    ResultSetHandler<Map<String, List`<String>`>> handler = new ResultSetHandler<Map<String, List`<String>`>>() {
        public Map<String, List`<String>`> handle(ResultSet resultSet) throws SQLException {
            Map<String, List`<String>`> result = new HashMap<>();
            while (resultSet.next()) {
                String empCity = resultSet.getString("empCity");
                String empName = resultSet.getString("empName");
                result.computeIfAbsent(empCity, data -> new ArrayList<>()).add(empName);
            }
            return result;
        }
    };
    QueryRunner run = new QueryRunner();
    Map<String, List`<String>`> valueMap = run.query(connection, "SELECT * FROM employee", handler);
    assertEquals(3, valueMap.get("London").size());
}
```

## 4. 结论

总结来说，我们探讨了几种将ResultSet聚合数据并转换为Map的方法，使用Java 7、Java 8和Apache DbUtils库。

如常，本文的完整代码可以在GitHub上找到。