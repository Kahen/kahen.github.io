---
date: 2022-04-01
category:
  - Java
  - H2 Database
tag:
  - H2
  - In-Memory Database
  - Schema Creation
head:
  - - meta
    - name: keywords
      content: Java, H2, In-Memory Database, Schema Creation
---

# H2内存数据库自动创建模式

H2数据库引擎是一个流行的基于Java的开源数据库。在本简短教程中，我们将学习如何为H2内存数据库自动创建一个模式。

## 2. H2是什么？

**H2数据库引擎是一个基于Java的数据库，它既符合SQL也符合JDBC标准**。它具有一些使它与其他关系型数据库区别开来的特性：

- 持久性：它可以作为一个纯粹的内存数据库运行，或使用文件系统。
- 模式：作为一个独立的服务器运行，或嵌入到另一个应用程序中。

这两个特性使H2成为开发和测试目的的绝佳选择。然而，由于它的短暂性质，它也可能带来一些挑战。

**当连接到H2内存数据库时，模式可能不存在**。这是因为内存数据库的短暂性质，它们仅在运行它们的应用程序运行时存在。一旦应用程序终止，内存数据库的全部内容就会丢失。

接下来，我们将看到几种在连接到H2内存数据库时初始化H2内存数据库的不同方法。

## 3. 在H2中自动创建模式

有几种方法可以为H2内存数据库自动创建模式。正如大多数事情一样，每种方法都有其优缺点，选择使用哪一种取决于多种因素。

### 3.1. 纯Java

以下示例展示了如何使用纯Java代码和JDBC初始化一个内存H2数据库。这是对于那些不使用Spring或其他提供数据库连接的框架的应用程序的好选择：

```
Connection conn = DriverManager.getConnection(
  "jdbc:h2:mem:baeldung;INIT=CREATE SCHEMA IF NOT EXISTS baeldung",
  "admin",
  "password");
```

**在上面的示例中，我们使用连接URL来指定要创建的模式**。我们还可以传递其他命令来进一步初始化数据库：

```
Connection conn = DriverManager.getConnection(
  "jdbc:h2:mem:baeldung;INIT=CREATE SCHEMA IF NOT EXISTS baeldung\\;SET SCHEMA baeldung;CREATE TABLE users (name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL);",
  "admin",
  "password");
```

因为所有这些命令可能会使URL难以阅读，**H2还支持通过引用SQL文件来初始化内存数据库**。首先，我们创建包含初始化语句的文件：

```
CREATE SCHEMA IF NOT EXISTS baeldung;
SET SCHEMA baeldung;
CREATE TABLE users (name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL);
```

然后我们使用稍微修改过的连接URL来引用文件：

```
Connection conn = DriverManager.getConnection(
  "jdbc:h2:mem:baeldung;INIT=RUNSCRIPT FROM 'h2init.sql';",
  "admin",
  "password");
```

### 3.2. Spring Boot

当使用Spring Boot应用程序时，**我们也可以利用熟悉的Spring数据属性来初始化H2内存数据库**。

首先，我们可以像上面一样在URL本身中提供所有的初始化语句。我们首先定义H2数据源的Spring属性：

```
spring.datasource.url=jdbc:h2:mem:baeldung;INIT=CREATE SCHEMA IF NOT EXISTS baeldung\\;SET SCHEMA baeldung;
```

然后我们可以像在任何正常应用程序中一样使用默认的_Datasource_ bean：

```
public void initDatabaseUsingSpring(@Autowired DataSource ds) {
    try (Connection conn = ds.getConnection()) {
        conn.createStatement().execute("create table users (name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL);");
        conn.createStatement().execute("insert into users (name, email) values ('Mike', 'mike@baeldung.com')");
    }
    catch (Exception e) {
        e.printStackTrace();
    }
}
```

就像使用纯Java代码一样，我们也可以在连接URL中引用一个包含所有初始化语句的SQL文件。我们所要做的就是更新我们的属性：

```
spring.datasource.url=jdbc:h2:mem:baeldung;INIT=RUNSCRIPT FROM 'src/main/resources/h2init.sql';
```

**值得注意的是，H2不通过Spring Boot加载资源**。因此，我们必须在应用程序运行的完整上下文中引用文件路径。

现在我们可以像以前一样使用_Datasource_，但不需要首先初始化模式：

```
private void initDatabaseUsingSpring(@Autowired DataSource ds) {
    try (Connection conn = ds.getConnection()) {
        conn.createStatement().execute("insert into users (name, email) values ('Mike', 'mike@baeldung.com')");
    }
    catch (Exception e) {
        e.printStackTrace();
    }
}
```

最后，当使用Spring Boot时，我们还可以利用SQL init模式而不依赖于H2特性。我们只需将初始化文件重命名为_data.sql_并稍微更改我们的属性：

```
spring.datasource.url=jdbc:h2:mem:baeldung
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=admin
spring.datasource.password=password
spring.sql.init.mode=embedded
```

我们应该注意到，我们的属性没有提到模式或初始化文件。

### 3.3. Spring XML

此外，如果我们使用纯Spring XML来配置_Datasource_，我们也可以在那里包含初始化语句。

让我们看看如何创建模式：

```
``<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource">``
    ``<property name="driverClassName" value="org.h2.Driver"/>``
    `<property name="url" value="jdbc:h2:mem:testdb;INIT=CREATE SCHEMA IF NOT EXISTS baeldung\\;SET SCHEMA baeldung;"/>`
    ``<property name="username" value="admin"/>``
    ``<property name="password" value="password"/>``
``</bean>``
```

正如我们之前看到的，URL中的多个初始化语句可能会使属性难以阅读。因此，将它们放入一个单一的SQL文件中并在URL中引用该文件是一个好主意：

```
``<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource">``
    ``<property name="driverClassName" value="org.h2.Driver"/>``
    `<property name="url" value="jdbc:h2:mem:testdb;INIT=RUNSCRIPT FROM 'src/main/resources/h2init.sql';"/>`
    ``<property name="username" value="admin"/>``
    ``<property name="password" value="password"/>``
``</bean>``
```

## 4. 结论

H2内存数据库是Java开发者更受欢迎的内存和嵌入式数据库选项之一。因为它快速且占用空间小，非常适合用于软件测试和自动化流水线等用例。

在本文中，我们看到了几种种方法来确保我们的H2内存数据库在应用程序启动时自动初始化并准备好进行查询。无论我们使用纯JDBC还是Spring框架，**只需要几行配置就可以确保我们的内存数据库在启动时完全初始化并准备好使用**。

如常，上述代码示例可以在GitHub上找到。