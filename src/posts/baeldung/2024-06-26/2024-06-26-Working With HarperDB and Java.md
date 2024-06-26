---
date: 2024-06-26
category:
  - Java
  - HarperDB
tag:
  - Java
  - NoSQL
  - JDBC
head:
  - - meta
    - name: keywords
      content: Java, HarperDB, JDBC, SQL, NoSQL数据库
------
# 使用Java与HarperDB的教程

在这个教程中，我们将讨论Java对HarperDB的支持，**HarperDB是一个高性能的灵活NoSQL数据库，具有SQL的强大功能**。毫无疑问，标准的Java数据库连接有助于将其与广泛的领先BI、报告、ETL工具和自定义应用程序集成。它还提供了REST API，用于执行数据库管理和操作。

然而，JDBC简化并加速了HarperDB在应用程序中的采用。它可能显著简化并加快这一过程。

对于本教程，我们将使用Java Test Container库。这将使我们能够运行一个HarperDB Docker容器并展示实时集成。

让我们通过一些示例探索HarperDB对JDBC支持的范围。

### 2. JDBC库

HarperDB提供了一个JDBC库，我们将在我们的_pom.xml_文件中导入：

```xml
`<dependency>`
    `<groupId>`com.baeldung`</groupId>`
    `<artifactId>`java-harperdb`</artifactId>`
    `<version>`4.2`</version>`
    `<scope>`system`</scope>`
    `<systemPath>`${project.basedir}/lib/cdata.jdbc.harperdb.jar`</systemPath>`
`</dependency>`
```

由于它不在公共Maven仓库中，我们必须从我们的本地目录或私有Maven仓库中导入它。

### 3. 创建JDBC连接

**在我们开始在Harper DB中执行SQL语句之前，我们将探索如何获取java.sql.Connection对象**。

让我们从第一个选项开始：

```java
@Test
void whenConnectionInfoInURL_thenConnectSuccess() {
    assertDoesNotThrow(() -> {
        final String JDBC_URL = "jdbc:harperdb:Server=127.0.0.1:" + port + ";User=admin;Password=password;";

        try (Connection connection = DriverManager.getConnection(JDBC_URL)) {
            connection.createStatement().executeQuery("select 1");
            logger.info("连接成功");
        }
    });
}
```

与获取关系型数据库的连接相比，除了JDBC URL中的前缀_jdbc:harperdb:_之外，没有太大区别。通常，**密码在传递到URL之前应该始终被加密和解密**。

接下来，让我们看看第二个选项：

```java
@Test
void whenConnectionInfoInProperties_thenConnectSuccess() {
    assertDoesNotThrow(() -> {
        Properties prop = new Properties();
        prop.setProperty("Server", "127.0.0.1:" + port);
        prop.setProperty("User", "admin");
        prop.setProperty("Password", "password");

        try (Connection connection = DriverManager.getConnection("jdbc:harperdb:", prop)) {
            connection.createStatement().executeQuery("select 1");
            logger.info("连接成功");
        }
    });
}
```

与早期的选项相比，我们使用_Properties_对象将连接详细信息传递给_DriveManager_。

应用程序通常使用连接池以获得最佳性能。因此，可以合理预期HarperDB的JDBC驱动程序也包含相同的功能：

```java
@Test
void whenConnectionPooling_thenConnectSuccess() {
    assertDoesNotThrow(() -> {
        HarperDBConnectionPoolDataSource harperdbPoolDataSource = new HarperDBConnectionPoolDataSource();
        final String JDBC_URL = "jdbc:harperdb:UseConnectionPooling=true;PoolMaxSize=2;Server=127.0.0.1:" + port
          + ";User=admin;Password=password;";
        harperdbPoolDataSource.setURL(JDBC_URL);

        try(Connection connection = harperdbPoolDataSource.getPooledConnection().getConnection()) {
            connection.createStatement().executeQuery("select 1");
            logger.info("连接成功");
        }
    });
}
```

为了启用连接池，我们使用了属性_UseConnectionPooling=true_。此外，我们还必须使用驱动程序类_HarperDBConnectionPoolDataSource_来获取连接池。

此外，还可以使用其他连接属性以获得更多选项。

### 4. 创建模式和表

HarperDB提供了RESTful数据库操作API，用于配置和管理数据库。它还有用于创建数据库对象并对其执行SQL CRUD操作的API。

然而，不支持像_Create Table, Create Schema_等DDL语句。然而，**HarperDB提供了存储过程来创建模式和表**：

```java
@Test
void whenExecuteStoredToCreateTable_thenSuccess() throws SQLException {
    final String CREATE_TABLE_PROC = "CreateTable";
    try (Connection connection = getConnection()) {
        CallableStatement callableStatement = connection.prepareCall(CREATE_TABLE_PROC);

        callableStatement.setString("SchemaName", "Prod");
        callableStatement.setString("TableName", "Subject");
        callableStatement.setString("PrimaryKey", "id");
        Boolean result = callableStatement.execute();

        ResultSet resultSet = callableStatement.getResultSet();

        while (resultSet.next()) {
            String tableCreated = resultSet.getString("Success");
            assertEquals("true", tableCreated);
        }
    }
}
```

**_CallableStatement_执行_CreateTable_存储过程，并在_Prod_模式中创建了_Subject_表**。该过程将_SchemaName_、_TableName_和_PrimaryKey_作为输入参数。有趣的是，我们没有显式创建模式。如果数据库中不存在模式，则会创建模式。

类似地，其他存储过程如CreateHarperSchema、DropSchema、DropTable等也可以**通过_CallableStatement_调用**。

### 5. CRUD支持

HarperDB JDBC驱动程序支持CRUD操作。我们可以使用_java.sql.Statement_和_java.sql.PreparedSatement_来创建、查询、更新和从表中删除记录。

#### 5.1. 数据库模型

在我们继续下一节之前，**让我们为执行SQL语句设置一些数据**。假设有一个名为_Demo_的数据库模式，其中有三个表：

_Subject_和_Teacher_是两个主表。_Teacher_Details_表有教师教授的科目的详细信息。出乎意料的是，字段_teacher_id_和_subject_id_上没有外键约束，因为HarperDB不支持它。

让我们看看_Subject_表中的数据：

```json
[
  {"id":1, "name":"英语"},
  {"id":2, "name":"数学"},
  {"id":3, "name":"科学"}
]
```

类似地，让我们看看_Teacher_表中的数据：

```json
[
  {"id":1, "name":"James Cameron", "joining_date":"2000-05-04"},
  {"id":2, "name":"Joe Biden", "joining_date":"2005-10-20"},
  {"id":3, "name":"Jessie Williams", "joining_date":"1997-06-04"},
  {"id":4, "name":"Robin Williams", "joining_date":"2020-01-01"},
  {"id":5, "name":"Eric Johnson", "joining_date":"2022-05-04"},
  {"id":6, "name":"Raghu Yadav", "joining_date":"1999-02-02"}
]
```

现在，让我们看看_Teacher_Details_表中的记录：

```json
[
  {"id":1, "teacher_id":1, "subject_id":1},
  {"id":2, "teacher_id":1, "subject_id":2},
  {"id":3, "teacher_id":2, "subject_id":3 },
  {"id":4, "teacher_id":3, "subject_id":1},
  {"id":5, "teacher_id":3, "subject_id":3},
  {"id":6, "teacher_id":4, "subject_id":2},
  {"id":7, "teacher_id":5, "subject_id":3},
  {"id":8, "teacher_id":6, "subject_id":1},
  {"id":9, "teacher_id":6, "subject_id":2},
  {"id":15, "teacher_id":6, "subject_id":3}
]
```

值得注意的是，所有表中的_id_列是主键。

#### 5.2. 使用_Insert_创建记录

让我们通过在_Subject_表中创建一些记录来介绍更多的科目：

```java
@Test
void givenStatement_whenInsertRecord_thenSuccess() throws SQLException {
    final String INSERT_SQL = "insert into Demo.Subject(id, name) values "
      + "(4, '社会科学'),"
      + "(5, '地理')";

    try (Connection connection = getConnection()) {
        Statement statement = connection.createStatement();
        assertDoesNotThrow(() -> statement.execute(INSERT_SQL));
        assertEquals(2, statement.getUpdateCount());
    }
}
```

我们使用_java.sql.Statement_在_Subject_表中插入了两条记录。

让我们通过考虑_Teacher_表来实现一个更好的版本，使用_java.sql.PrepareStatement_：

```java
@Test
void givenPrepareStatement_whenAddToBatch_thenSuccess() throws SQLException {
    final String INSERT_SQL = "insert into Demo.Teacher(id, name, joining_date) values"
      + "(?, ?, ?)";

    try (Connection connection = getConnection()) {
        PreparedStatement preparedStatement = connection.prepareStatement(INSERT_SQL);
        preparedStatement.setInt(1, 7);
        preparedStatement.setString(2, "Bret Lee");
        preparedStatement.setString(3, "2002-08-07");
        preparedStatement.addBatch();

        preparedStatement.setInt(1, 8);
        preparedStatement.setString(2, "Sarah Glimmer");
        preparedStatement.setString(3, "1997-08-07");

        int[] recordsInserted = preparedStatement.executeBatch();

        assertEquals(2, Arrays.stream(recordsInserted).sum());
    }
}
```

因此，我们参数化了_insert_语句，并使用_addBatch()_和_executeBatch()_方法批量执行它们。**批量执行对于处理大量记录至关重要**。因此，HarperDB的JDBC驱动程序支持这一点非常有价值。

#### 5.3. 使用_Insert Into Select_创建记录

**HarperDB JDBC驱动程序还提供了在运行时创建临时表的功能**。这个临时表稍后可以用单个_insert into select_语句用于插入到最终目标表中。**与批量执行类似，这也有助于减少对数据库的调用次数**。

让我们看看这个功能的实际应用：

```java
@Test
void givenTempTable_whenInsertIntoSelectTempTable_thenSuccess() throws SQLException {
    try (Connection connection = getConnection()) {
        Statement statement = connection.createStatement();
        assertDoesNotThrow(() -> {
            statement.execute("insert into Teacher#TEMP(id, name, joining_date) "
              + "values('12', 'David Flinch', '2014-04-04')");
            statement.execute("insert into Teacher#TEMP(id, name, joining_date) "
              + "values('13', 'Stephen Hawkins', '2017-07-04')");
            statement.execute("insert into Teacher#TEMP(id, name, joining_date) "
              + "values('14', 'Albert Einstein', '2020-08-12')");
            statement.execute("insert into Teacher#TEMP(id, name, joining_date) "
              + "values('15', 'Leo Tolstoy', '2022-08-20')");
        });
        assertDoesNotThrow(() -> statement.execute("insert into Demo.Teacher(id, name, joining_date) "
          + "select id, name, joining_date from Teacher#TEMP"));
        ResultSet resultSet = statement.executeQuery("select count(id) as rows from Demo.Teacher where id in"
          + " (12, 13, 14, 15)");
        resultSet.next();
        int totalRows = resultSet.getInt("rows");
        assertEquals(4, totalRows);
    }
}
```

**所有临时表都应该有格式_[table name]#TEMP_如_Teacher#TEMP_**。它在我们执行_insert_语句后立即被创建。四条记录被插入到临时表_Teacher#TEMP_中。然后通过一个_single insert into select_语句，所有的记录都被插入到了目标_Teacher_表中。

#### 5.4. 从表中读取记录

让我们从_Subject_表开始，使用_java.sql.Statement_查询：

```java
@Test
void givenStatement_whenFetchRecord_thenSuccess() throws SQLException {
    final String SQL_QUERY = "select id, name from Demo.Subject where name = 'Maths'";

    try (Connection connection = getConnection()) {
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery(SQL_QUERY);
        while (resultSet.next()) {
            Integer id = resultSet.getInt("id");
            String name = resultSet.getString("name");
            assertNotNull(id);
            logger.info("Subject id:" + id + " Subject Name:" + name);
        }
    }
}
```

_java.sql.Statement_的_executeQuery()_方法成功执行并获取记录。

让我们看看驱动程序是否支持_java.sql.PrepareStatement_。这次让我们执行一个带有连接条件的查询，使其更有趣和复杂一些：

```java
@Test
void givenPreparedStatement_whenExecuteJoinQuery_thenSuccess() throws SQLException {
    final String JOIN_QUERY = "SELECT t.name as teacher_name, t.joining_date as joining_date, s.name as subject_name "
      + "from Demo.Teacher_Details AS td "
      + "INNER JOIN Demo.Teacher AS t ON t.id = td.teacher_id "
      + "INNER JOIN Demo.Subject AS s on s.id = td.subject_id "
      + "where t.name = ?";

    try (Connection connection = getConnection()) {
        PreparedStatement preparedStatement = connection.prepareStatement(JOIN_QUERY);
        preparedStatement.setString(1, "Eric Johnson");

        ResultSet resultSet = preparedStatement.executeQuery();
        while (resultSet.next()) {
            String teacherName = resultSet.getString("teacher_name");
            String subjectName = resultSet.getString("subject_name");
            String joiningDate = resultSet.getString("joining_date");
            assertEquals("Eric Johnson", teacherName);
            assertEquals("Maths", subjectName);
        }
    }
}
```

**我们不仅执行了一个参数化查询，还发现HarperDB可以在非结构化数据上执行连接查询**。

#### 5.5. 从用户定义的视图中读取记录

HarperDB驱动程序具有创建用户定义视图的功能。**这些是虚拟视图，可以在我们无法访问表查询的情况下使用，即在使用工具时使用驱动程序**。

让我们在_UserDefinedViews.json_文件中定义一个视图：

```json
{
  "View_Teacher_Details": {
    "query": "SELECT t.name as teacher_name, t.joining_date as joining_date, s.name as subject_name from Demo.Teacher_Details AS td
      INNER JOIN Demo.Teacher AS t ON t.id = td.teacher_id INNER JOIN Demo.Subject AS s on s.id = td.subject_id"
  }
}
```

查询通过连接所有表来获取教师的详细信息。视图的默认模式是_UserViews_。

驱动程序在由连接属性_Location_定义的目录中查找_UserDefinedViews.json_。让我们看看这是如何工作的：

```java
@Test
void givenUserDefinedView_whenQueryView_thenSuccess() throws SQLException {
    URL url = ClassLoader.getSystemClassLoader().getResource("UserDefinedViews.json");

    String folderPath = url.getPath().substring(0, url.getPath().lastIndexOf('/'));

    try (Connection connection = getConnection(Map.of("Location", folderPath))) {
        PreparedStatement preparedStatement = connection.prepareStatement("select teacher_name,subject_name"
          + " from UserViews.View_Teacher_Details where subject_name = ?");
        preparedStatement.setString(1, "Science");
        ResultSet resultSet = preparedStatement.executeQuery();
        while (resultSet.next()) {
            assertEquals("Science", resultSet.getString("subject_name"));
        }
    }
}
```

为了创建数据库连接，程序将文件_UserDefinedViews.json_的文件夹路径传递给方法_getConnection()_。之后，驱动程序在视图_View_Teacher_Details_上执行查询，并获取所有教授_Science_的教师的详细信息。

#### 5.6. 保存和从缓存中读取记录

应用程序更喜欢缓存频繁使用和访问的数据以提高性能。HaperDB驱动程序可以在本地磁盘或数据库等位置启用缓存数据。

对于我们的示例，我们将在我们的Java应用程序中使用嵌入式Derby数据库作为缓存。但也可以为缓存选择其他数据库。

让我们进一步探索这一点：

```java
@Test
void givenAutoCache_whenQuery_thenSuccess() throws SQLException {
    URL url = ClassLoader.getSystemClassLoader().getResource("test.db");
    String folderPath = url.getPath().substring(0, url.getPath().lastIndexOf('/'));
    logger.info("Cache Location:" + folderPath);
    try (Connection connection = getConnection(Map.of("AutoCache", "true", "CacheLocation", folderPath))) {
        PreparedStatement preparedStatement = connection.prepareStatement("select id, name from Demo.Subject");

        ResultSet resultSet = preparedStatement.executeQuery();
        while (resultSet.next()) {
            logger.info("Subject Name:" + resultSet.getString("name"));
        }
    }
}
```

我们使用了两个连接属性_AutoCache_和_CacheLocation_。_AutoCache=true_意味着对表的所有查询都将被缓存到属性_CacheLocation_指定的位置。然而，驱动程序也提供了使用_CACHE语句_的显式缓存功能。

#### 5.7. 更新记录

让我们看一个使用_java.sql.Statement_更新教师教授科目的示例：

```java
@Test
void givenStatement_whenUpdateRecord_thenSuccess() throws SQLException {
    final String UPDATE_SQL = "update Demo.Teacher_Details set subject_id = 2 "
        + "where teacher_id in (2, 5)";
    final String UPDATE_SQL_WITH_SUB_QUERY = "update Demo.Teacher_Details "
        + "set subject_id = (select id from Demo.Subject where name = 'Maths') "
        + "where teacher_id in (select id from Demo.Teacher where name in ('Joe Biden', 'Eric Johnson'))";

    try (Connection connection = getConnection()) {
        Statement statement = connection.createStatement();
        assertDoesNotThrow(() -> statement.execute(UPDATE_SQL));
        assertEquals(2, statement.getUpdateCount());
    }

    try (Connection connection = getConnection()) {
        assertThrows(SQLException.class, () -> connection.createStatement().execute(UPDATE_SQL_WITH_SUB_QUERY));
    }
}
```

当我们直接使用教师和科目