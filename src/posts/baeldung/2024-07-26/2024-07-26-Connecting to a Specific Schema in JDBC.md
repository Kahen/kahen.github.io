---
date: 2022-04-01
category:
  - JDBC
  - PostgreSQL
tag:
  - Database Schema
  - PostgreSQL
  - JDBC
head:
  - - meta
    - name: keywords
      content: JDBC, PostgreSQL, Database Schema
------
# 通过JDBC连接到特定模式

## 1. 引言

在本文中，我们将涵盖数据库模式的基础知识，为什么我们需要它们，以及它们是如何有用的。之后，我们将专注于使用PostgreSQL数据库的JDBC中设置模式的实际示例。

## 2. 数据库模式是什么

一般来说，数据库模式是一组规则，它规范了数据库。它是数据库的额外抽象层。有两种模式：
1. 逻辑数据库模式定义了适用于数据库中存储数据的规则。
2. 物理数据库模式定义了数据在存储系统上如何物理存储的规则。

在PostgreSQL中，模式指的是第一种。**模式是一个逻辑命名空间，包含数据库对象，如表、视图、索引等。** 每个模式属于一个数据库，每个数据库至少有一个模式。如果没有特别指定，PostgreSQL中的默认模式是public。我们创建的每个数据库对象，如果没有指定模式，都属于public模式。

PostgreSQL中的模式允许我们将表和视图组织成组，使它们更易于管理。这样，我们可以在更细粒度的级别上设置数据库对象的权限。此外，模式允许多个用户同时使用相同的数据库而不互相干扰。

## 3. 如何在PostgreSQL中使用模式

要访问数据库模式的对象，我们必须在要使用的对象名称之前指定模式的名称。例如，要查询模式store中的product表，我们需要使用表的限定名称：
```sql
SELECT * FROM store.product;
```

建议避免硬编码模式名称，以防止将具体模式与我们的应用程序耦合。这意味着我们直接使用数据库对象名称，并让数据库系统确定使用哪个模式。PostgreSQL通过遵循搜索路径来确定要搜索的表的位置。

### 3.1. PostgreSQL _search_path_

**搜索路径是定义数据库系统搜索给定数据库对象的有序模式列表。** 如果对象存在于任何（或多个）模式中，我们得到第一个发现的实例。否则，我们得到一个错误。搜索路径中的第一个模式也称为当前模式。要预览搜索路径上的模式，我们可以使用以下查询：
```sql
SHOW search_path;
```

默认的PostgreSQL配置将返回$user和public模式。我们已经提到了public模式，$user模式是以当前用户命名的模式，它可能不存在。在这种情况下，数据库会忽略该模式。

要将store模式添加到搜索路径，我们可以执行以下查询：
```sql
SET search_path TO store,public;
```

在此之后，我们可以在不指定模式的情况下查询product表。我们也可以从搜索路径中删除public模式。

如上所述设置搜索路径是角色级别的配置。我们可以通过更改postgresql.conf文件并重新加载数据库实例来更改整个数据库的搜索路径。

### 3.2. JDBC URL

我们可以使用JDBC URL在连接设置期间指定各种参数。通常的参数包括数据库类型、地址、端口、数据库名称等。**自Postgres版本9.4以来，增加了使用URL指定当前模式的支持。**

在我们将这个概念付诸实践之前，让我们设置一个测试环境。为此，我们将使用testcontainers库并创建以下测试设置：
```java
@ClassRule
public static PostgresqlTestContainer container = PostgresqlTestContainer.getInstance();

@BeforeClass
public static void setup() throws Exception {
    Properties properties = new Properties();
    properties.setProperty("user", container.getUsername());
    properties.setProperty("password", container.getPassword());
    Connection connection = DriverManager.getConnection(container.getJdbcUrl(), properties);
    connection.createStatement().execute("CREATE SCHEMA store");
    connection.createStatement().execute("CREATE TABLE store.product(id SERIAL PRIMARY KEY, name VARCHAR(20))");
    connection.createStatement().execute("INSERT INTO store.product VALUES(1, 'test product')");
}
```

使用@ClassRule，我们创建了一个PostgreSQL数据库容器的实例。接下来，在setup方法中，创建与该数据库的连接并创建所需的对象。

现在数据库设置好了，让我们使用JDBC URL连接到store模式：
```java
@Test
public void settingUpSchemaUsingJdbcURL() throws Exception {
    Properties properties = new Properties();
    properties.setProperty("user", container.getUsername());
    properties.setProperty("password", container.getPassword());
    Connection connection = DriverManager.getConnection(container.getJdbcUrl().concat("&" + "currentSchema=store"), properties);

    ResultSet resultSet = connection.createStatement().executeQuery("SELECT * FROM product");
    resultSet.next();

    assertThat(resultSet.getInt(1), equalTo(1));
    assertThat(resultSet.getString(2), equalTo("test product"));
}
```

**要更改默认模式，我们需要指定_currentSchema_参数。** 如果我们输入一个不存在的模式，在选择查询期间会抛出PSQLException，表示数据库对象缺失。

### 3.3. _PGSimpleDataSource_

要连接到数据库，**我们可以使用来自PostgreSQL驱动程序库的_javax.sql.DataSource_实现，名为_PGSimpleDataSource_。** 这个具体实现支持设置模式：
```java
@Test
public void settingUpSchemaUsingPGSimpleDataSource() throws Exception {
    int port = //extracting port from container.getJdbcUrl()
    PGSimpleDataSource ds = new PGSimpleDataSource();
    ds.setServerNames(new String[]{container.getHost()});
    ds.setPortNumbers(new int[]{port});
    ds.setUser(container.getUsername());
    ds.setPassword(container.getPassword());
    ds.setDatabaseName("test");
    ds.setCurrentSchema("store");

    ResultSet resultSet = ds.getConnection().createStatement().executeQuery("SELECT * FROM product");
    resultSet.next();

    assertThat(resultSet.getInt(1), equalTo(1));
    assertThat(resultSet.getString(2), equalTo("test product"));
}
```

在使用_PGSimpleDataSource_时，如果未设置模式，驱动程序将使用public模式作为默认模式。

### 3.4. javax.persistence包中的_Table_注解_

如果我们的项目中使用JPA，**我们可以使用_Table_注解在实体级别上指定模式。** 这个注解可以包含模式的值或默认为空字符串。让我们将product表映射到Product实体：
```java
@Entity
@Table(name = "product", schema = "store")
public class Product {

    @Id
    private int id;
    private String name;

    // getters and setters
}
```

为了验证这种行为，我们设置_EntityManager_实例来查询product表：
```java
@Test
public void settingUpSchemaUsingTableAnnotation(){
    Map``<String,String>`` props = new HashMap``<String,String>``();
    props.put("hibernate.connection.url", container.getJdbcUrl());
    props.put("hibernate.connection.user", container.getUsername());
    props.put("hibernate.connection.password", container.getPassword());
    EntityManagerFactory emf = Persistence.createEntityManagerFactory("postgresql_schema_unit", props);
    EntityManager entityManager = emf.createEntityManager();

    Product product = entityManager.find(Product.class, 1);

    assertThat(product.getName(), equalTo("test product"));
}
```

正如我们在第3节中提到的，最好避免将模式与代码耦合，出于各种原因。因此，这个功能经常被忽视，但当访问多个模式时，它可以是有利的。

## 4. 结论

在本教程中，首先，我们涵盖了数据库模式的基本理论。之后，我们描述了使用不同方法和技术设置数据库模式的多种方式。像往常一样，所有的代码示例都可以在GitHub上找到。