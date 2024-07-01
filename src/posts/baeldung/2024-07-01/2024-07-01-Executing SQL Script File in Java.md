---
date: 2022-04-01
category:
  - Java
  - SQL
tag:
  - MyBatis
  - Spring JDBC
head:
  - - meta
    - name: keywords
      content: Java, SQL, ScriptRunner, ScriptUtils, JDBC, 批处理
---

# 如何从Java运行SQL脚本

在本教程中，我们将讨论如何从Java运行SQL脚本。作为其中的一部分，我们将探索两个库：MyBatis和Spring JDBC。MyBatis提供了ScriptRunner类，而Spring JDBC提供了ScriptUtils，可以直接从磁盘读取SQL脚本文件并在目标数据库上运行它们。

我们还将实现一个自定义的数据库实用工具，用于从文件中读取SQL语句，然后批量执行它们。

为了保持简单并使代码能够迅速运行，让我们使用广泛使用的内存中H2嵌入式数据库进行测试。让我们看看它们都在行动。

## 使用MyBatis ScriptRunner执行SQL脚本

首先，让我们通过在pom.xml中包含以下内容来添加mybatis的Maven依赖项：

```
``<dependency>``
    ``<groupId>``org.mybatis``</groupId>``
    ``<artifactId>``mybatis``</artifactId>``
    ``<version>``3.5.7``</version>``
``</dependency>``
```

现在，让我们来看看MyBatisScriptUtility类：

```java
public class MyBatisScriptUtility {
    public static void runScript(
      String path,
      Connection connection
    ) throws Exception {
      ScriptRunner scriptRunner = new ScriptRunner(connection);
      scriptRunner.setSendFullScript(false);
      scriptRunner.setStopOnError(true);
      scriptRunner.runScript(new java.io.FileReader(path));
    }
}
```

正如上面的代码所示，ScriptRunner提供了逐行执行脚本以及一次性执行完整脚本的选项。

在执行SQL文件之前，让我们看看它：

```sql
-- 如果不存在，则创建employees表
CREATE TABLE employees (
    id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    department VARCHAR(50),
    salary DECIMAL(10, 2)
);

-- 插入员工记录
INSERT INTO employees (id, first_name, last_name, department, salary)
VALUES (1, 'John', 'Doe', 'HR', 50000.00);

INSERT INTO employees (id, first_name, last_name, department, salary)
VALUES (2, 'Jane', 'Smith', 'IT', 60000.00);
-- 更多SQL语句....
```

正如我们所看到的，上述文件包含了块注释、单行注释、空白行、创建表语句和插入语句的混合。这使我们能够测试本文讨论的库的解析能力。

执行整个脚本文件的实现是直接的。为此，**整个文件从磁盘读取并作为字符串参数传递给方法java.sql.Statement.execute()**。因此，我们更倾向于逐行运行它：

```java
@Test
public void givenConnectionObject_whenSQLFile_thenExecute() throws Exception {
    String path = new File(ClassLoader.getSystemClassLoader().getResource("employee.sql").getFile()).toPath().toString();
    MyBatisScriptUtility.runScript(path, connection);

    Statement statement = connection.createStatement();
    ResultSet resultSet = statement.executeQuery("SELECT COUNT(1) FROM employees");
    if (resultSet.next()) {
        int count = resultSet.getInt(1);
        Assert.assertEquals("插入的记录数量不正确", 20, count);
    }
}
```

在上面的示例中，我们使用了一个SQL文件，该文件创建了一个_employees_表，然后向其中插入了20条记录。

更好奇的读者也可以查看ScriptRunner的源代码。

## 使用Spring JDBC ScriptUtils执行SQL脚本

继续，是时候检查ScriptUtils类了。让我们首先处理Maven依赖项：

```
``<dependency>``
    ``<groupId>``org.springframework``</groupId>``
    ``<artifactId>``spring-jdbc``</artifactId>``
    ``<version>``5.3.29``</version>``
``</dependency>``
```

在此之后，让我们看看SpringScriptUtility类：

```java
public class SpringScriptUtility {
    public static void runScript(String path, Connection connection) {
        boolean continueOrError = false;
        boolean ignoreFailedDrops = false;
        String commentPrefix = "--";
        String separator = ";";
        String blockCommentStartDelimiter = "/*";
        String blockCommentEndDelimiter = "*/";

        ScriptUtils.executeSqlScript(
          connection,
          new EncodedResource(new PathResource(path)),
          continueOrError,
          ignoreFailedDrops,
          commentPrefix,
          separator,
          blockCommentStartDelimiter,
          blockCommentEndDelimiter
        );
    }
}
```

正如我们在上面看到的，ScriptUtils提供了多种读取SQL文件的选项。因此，它支持使用不同分隔符进行注释识别的多种数据库引擎，超出了典型的“--”，“/*”和“*/”。此外，还有两个更多的参数continueOnError和ignoreFailedDrops，它们的目的不言自明。

与MyBatis库不同，ScriptUtils没有提供运行完整脚本的选项，而是更倾向于逐个运行SQL语句。这可以通过查看其源代码来确认。

让我们看看执行情况：

```java
@Test
public void givenConnectionObject_whenSQLFile_thenExecute() throws Exception {
    String path = new File(ClassLoader.getSystemClassLoader()
      .getResource("employee.sql").getFile()).toPath().toString();
    SpringScriptUtility.runScript(path, connection);

    Statement statement = connection.createStatement();
    ResultSet resultSet = statement.executeQuery("SELECT COUNT(1) FROM employees");
    if (resultSet.next()) {
        int count = resultSet.getInt(1);
        Assert.assertEquals("插入的记录数量不正确", 20, count);
    }
}
```

在上述方法中，我们只是使用_path_和_connection_对象调用了_SpringScriptUtility.runScript()_。

## 使用JDBC批量执行SQL语句

到目前为止，我们已经看到这两个库都相当支持执行SQL文件。但是，它们都没有提供批量运行SQL语句的选项。这是执行大型SQL文件的重要功能。

因此，让我们想出一个自己的SqlScriptBatchExecutor：

```java
static void executeBatchedSQL(String scriptFilePath, Connection connection, int batchSize) throws Exception {
    List````<String>```` sqlStatements = parseSQLScript(scriptFilePath);
    executeSQLBatches(connection, sqlStatements, batchSize);
}
```

上述实现可以总结为两行：**_parseSQLScript()_方法从文件中获取SQL语句，而_executeSQLBatches()_则按批次执行它们**。

让我们看看_parseSQLScript()_方法：

```java
static List````<String>```` parseSQLScript(String scriptFilePath) throws IOException {
    List````<String>```` sqlStatements = new ArrayList<>();
    try (BufferedReader reader = new BufferedReader(new FileReader(scriptFilePath))) {
        StringBuilder currentStatement = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            Matcher commentMatcher = COMMENT_PATTERN.matcher(line);
            line = commentMatcher.replaceAll("");

            line = line.trim();

            if (line.isEmpty()) {
                continue;
            }

            currentStatement.append(line).append(" ");
            
            if (line.endsWith(";")) {
                sqlStatements.add(currentStatement.toString());
                logger.info(currentStatement.toString());
                currentStatement.setLength(0);
            }
        }
    } catch (IOException e) {
       throw e;
    }
    return sqlStatements;
}
```

我们使用_COMMENT_PATTERN = Pattern.compile("–.*|/[\\*(.|\[\\r\\n])*?\*/")_来识别注释和空白行，然后从SQL文件中删除它们。像MyBatis一样，我们也只支持默认的注释分隔符。

现在，让我们看看_executeSQLBatches()_方法：

```java
static void executeSQLBatches(Connection connection, List````<String>```` sqlStatements, int batchSize)
        throws SQLException {
    int count = 0;
    Statement statement = connection.createStatement();

    for (String sql : sqlStatements) {
        statement.addBatch(sql);
        count++;

        if (count % batchSize == 0) {
            logger.info("Executing batch");
            statement.executeBatch();
            statement.clearBatch();
        }
    }
    if (count % batchSize != 0) {
        statement.executeBatch();
    }
    connnection.commit();
}
```

上述方法获取SQL语句列表，遍历它，然后在批量大小增长到参数_batchSize_的值时执行它。

让我们看看自定义程序的运行情况：

```java
@Test
public void givenConnectionObject_whenSQLFile_thenExecute() throws Exception {
    String path = new File(
      ClassLoader.getSystemClassLoader().getResource("employee.sql").getFile()).toPath().toString();
    SqlScriptBatchExecutor.executeBatchedSQL(path, connection, 10);
    Statement statement = connection.createStatement();
    ResultSet resultSet = statement.executeQuery("SELECT COUNT(1) FROM employees");

    if (resultSet.next()) {
        int count = resultSet.getInt(1);
        Assert.assertEquals("插入的记录数量不正确", 20, count);
    }
}
```

它分两批执行SQL语句，每批10条语句。值得注意的是，批量大小是参数化的，可以根据文件中的SQL语句数量进行调整。

## 结论

在本文中，我们了解了MyBatis和Spring JDBC提供的数据库实用工具来执行SQL文件。我们发现Spring JDBC在解析SQL文件方面更加灵活。此外，我们开发了一个自定义实用工具，支持SQL语句的批量执行。

像往常一样，本教程的代码可以在GitHub上找到。