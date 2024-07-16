---
date: 2024-07-16
category:
  - Spring Data MongoDB
  - MongoDB
tag:
  - Spring Boot
  - MongoDB
  - Database Connection
head:
  - - meta
    - name: keywords
      content: MongoDB, Spring Boot, Database Connection
------
# 1. 概述

在本教程中，**我们将学习在Spring Boot应用程序中配置MongoDB连接的不同方法**。我们将利用Spring Data MongoDB项目提供的强大的功能。通过利用Spring Data MongoDB项目，我们可以使用丰富的工具和功能，简化在Spring环境中使用MongoDB数据库的过程。

通过深入研究Spring的灵活配置选项，我们将探索建立数据库连接的各种方法。通过动手示例，我们将为每种方法创建单独的应用程序，使我们能够选择最适合我们特定需求的配置方法。

# 2. 测试我们的连接

在我们开始构建应用程序之前，我们将创建一个测试类。让我们从一些我们将重用的常量开始：

```java
public class MongoConnectionApplicationLiveTest {
    private static final String HOST = "localhost";
    private static final String PORT = "27017";
    private static final String DB = "baeldung";
    private static final String USER = "admin";
    private static final String PASS = "password";

    // 测试用例
}
```

**我们的测试包括运行我们的应用程序，然后尝试在名为 _“items”_ 的集合中插入一个文档**。插入我们的文档后，我们应该从我们的数据库中收到一个 _“\_id”_，我们将认为测试成功。现在让我们创建一个助手方法：

```java
private void assertInsertSucceeds(ConfigurableApplicationContext context) {
    String name = "A";

    MongoTemplate mongo = context.getBean(MongoTemplate.class);
    Document doc = Document.parse("{\"name\":\"" + name + "\"}");
    Document inserted = mongo.insert(doc, "items");

    assertNotNull(inserted.get("_id"));
    assertEquals(inserted.get("name"), name);
}
```

我们的方法接收来自我们应用程序的Spring上下文，以便我们可以检索 _MongoTemplate_ 实例。接下来，我们将使用 _Document.parse()_ 从字符串构建一个简单的JSON文档。

**这样，我们就不需要创建一个仓库或文档类**。然后，在插入后，我们将断言我们插入的文档的属性是我们期望的。

重要的是要注意，我们需要运行一个真实的MongoDB实例。为此，我们可以将MongoDB作为docker容器运行。

# 3. 通过属性配置连接

在Spring Boot应用程序中配置MongoDB连接，我们通常使用属性。在属性中，我们定义了诸如数据库主机、端口、认证凭据和数据库名称等基本连接详细信息。我们将在以下小节中详细查看这些属性。

### 3.1. 使用 _application.properties_

我们的第一个示例是配置连接的最常见方式。**我们只需要在我们的 _application.properties_ 中提供我们的数据库信息：**

```properties
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.database=baeldung
spring.data.mongodb.username=admin
spring.data.mongodb.password=password
```

所有可用的属性都位于Spring Boot的 _MongoProperties_ 类中。我们还可以使用这个类来检查默认值。**我们可以通过应用程序参数在我们的属性文件中定义任何配置。**

在我们的应用程序类中，我们需要排除 _EmbeddedMongoAutoConfiguration_ 类以启动和运行：

```java
@SpringBootApplication(exclude={EmbeddedMongoAutoConfiguration.class})
public class SpringMongoConnectionViaPropertiesApp {

    public static void main(String... args) {
        SpringApplication.run(SpringMongoConnectionViaPropertiesApp.class, args);
    }
}
```

**这种配置是我们连接到数据库实例所需的全部**。_@SpringBootApplication_ 注解包括 _@EnableAutoConfiguration_。它负责发现我们的应用程序是基于我们的类路径的MongoDB应用程序。

要测试它，我们可以使用 _SpringApplicationBuilder_ 来获取应用程序上下文的引用。**然后，为了断言我们的连接有效，我们将使用之前创建的 _assertInsertSucceeds_ 方法：**

```java
@Test
public void whenPropertiesConfig_thenInsertSucceeds() {
    SpringApplicationBuilder app = new SpringApplicationBuilder(SpringMongoConnectionViaPropertiesApp.class);
    app.run();

    assertInsertSucceeds(app.context());
}
```

最后，我们的应用程序成功地使用我们的 _application.properties_ 文件连接。

### 3.2. 使用命令行参数覆盖属性

**我们可以在运行应用程序时使用命令行参数覆盖我们的属性文件**。这些是在运行应用程序时传递给应用程序的，可以通过java命令、mvn命令或IDE配置传递。提供这些的方法将取决于我们使用的命令。

让我们看看使用 _mvn_ 运行我们的Spring Boot应用程序的示例：

```shell
mvn spring-boot:run -Dspring-boot.run.arguments='--spring.data.mongodb.port=7017 --spring.data.mongodb.host=localhost'
```

要使用它，我们指定我们的属性作为 _spring-boot.run.arguments_ 参数的值。我们使用与预期的Spring Data变量相同的属性名称，但前面加上两个破折号。**自Spring Boot 2以来，多个属性应通过空格分隔。** 最后，在运行命令后，不应该有任何错误。

以这种方式配置的选项始终优先于属性文件。**这种选项在我们不需要更改属性文件就可以更改应用程序参数时非常有用**。例如，如果我们的凭据已更改，我们无法再连接。

为了在我们的测试中模拟这一点，我们可以在运行应用程序之前设置系统属性。我们还可以使用 _properties_ 方法覆盖我们的 _application.properties_：

```java
@Test
public void givenPrecedence_whenSystemConfig_thenInsertSucceeds() {
    System.setProperty("spring.data.mongodb.host", HOST);
    System.setProperty("spring.data.mongodb.port", PORT);
    System.setProperty("spring.data.mongodb.database", DB);
    System.setProperty("spring.data.mongodb.username", USER);
    System.setProperty("spring.data.mongodb.password", PASS);

    SpringApplicationBuilder app = new SpringApplicationBuilder(SpringMongoConnectionViaPropertiesApp.class)
      .properties(
        "spring.data.mongodb.host=oldValue",
        "spring.data.mongodb.port=oldValue",
        "spring.data.mongodb.database=oldValue",
        "spring.data.mongodb.username=oldValue",
        "spring.data.mongodb.password=oldValue"
      );
    app.run();

    assertInsertSucceeds(app.context());
}
```

**结果，我们属性文件中的旧值不会影响我们的应用程序，因为系统属性具有更高的优先级**。这在我们需要在不更改代码的情况下使用新的连接详细信息重新启动应用程序时非常有用。

### 3.3. 使用连接URI属性

也可以使用单个属性而不是单独的主机、端口等：

```properties
spring.data.mongodb.uri="mongodb://admin:password@localhost:27017/baeldung"
```

**此属性包括初始属性中的所有值，因此我们不需要指定全部五个**。让我们检查基本格式：

```plaintext
mongodb://`<username>`:`<password>`@`<host>`:`<port>`/`<database>`
```

URI中的 _database_ 部分更具体地说是默认认证数据库。**最重要的是，_spring.data.mongodb.uri_ 属性不能与单独的主机、端口和凭据一起指定**。否则，我们在运行应用程序时会收到以下错误：

```java
@Test
public void givenConnectionUri_whenAlsoIncludingIndividualParameters_thenInvalidConfig() {
    System.setProperty(
      "spring.data.mongodb.uri",
      "mongodb://" + USER + ":" + PASS + "@" + HOST + ":" + PORT + "/" + DB
    );

    SpringApplicationBuilder app = new SpringApplicationBuilder(SpringMongoConnectionViaPropertiesApp.class)
      .properties(
        "spring.data.mongodb.host=" + HOST,
        "spring.data.mongodb.port=" + PORT,
        "spring.data.mongodb.username=" + USER,
        "spring.data.mongodb.password=" + PASS
      );

    BeanCreationException e = assertThrows(BeanCreationException.class, () -> {
        app.run();
    });

    Throwable rootCause = e.getRootCause();
    assertTrue(rootCause instanceof IllegalStateException);
    assertThat(rootCause.getMessage()
      .contains("Invalid mongo configuration, either uri or host/port/credentials/replicaSet must be specified"));
}
```

**最后，这种配置选项不仅更短，有时还是必须的**。这是因为某些选项只能通过连接字符串使用，比如使用 _mongodb+srv_ 连接到副本集。因此，我们将仅在下一个示例中使用这个更简单的配置属性。

# 4. 使用MongoClient的Java设置

**_MongoClient_ 代表我们与MongoDB数据库的连接，总是在后台创建，但我们也可以以编程方式设置它**。尽管这种方法更冗长，但它有一些优点。让我们在接下来的几个小节中看看它们。

### 4.1. 通过 _AbstractMongoClientConfiguration_ 连接

在我们的第一个示例中，我们将在我们的应用程序类中扩展Spring Data MongoDB的 _AbstractMongoClientConfiguration_ 类：

```java
@SpringBootApplication
public class SpringMongoConnectionViaClientApp extends AbstractMongoClientConfiguration {
    // main method
}
```

接下来，我们将注入我们需要的属性：

```java
@Value("${spring.data.mongodb.uri}")
private String uri;

@Value("${spring.data.mongodb.database}")
private String db;
```

需要说明的是，这些属性可以硬编码。此外，它们可以使用与预期的Spring Data变量不同的名称。**最重要的是，这次我们使用URI而不是单独的连接属性，这不能混合使用**。因此，我们不能为此应用程序重用 _application.properties_，我们应该将其移动到其他地方。

_AbstractMongoClientConfiguration_ 要求我们重写 _getDatabaseName()_。这是因为URI中不需要数据库名称：

```java
protected String getDatabaseName() {
    return db;
}
```

到目前为止，因为我们使用了默认的Spring Data变量，我们已经能够连接到我们的数据库。此外，如果数据库不存在，MongoDB会创建它。让我们测试一下：

```java
@Test
public void whenClientConfig_thenInsertSucceeds() {
    SpringApplicationBuilder app = new SpringApplicationBuilder(SpringMongoConnectionViaClientApp.class);
    app.web(WebApplicationType.NONE)
      .run(
        "--spring.data.mongodb.uri=mongodb://" + USER + ":" + PASS + "@" + HOST + ":" + PORT + "/" + DB,
        "--spring.data.mongodb.database=" + DB
      );

    assertInsertSucceeds(app.context());
}
```

最后，我们可以重写 _mongoClient()_ 来获得比传统配置更多的优势。**这个方法将使用我们的URI变量来构建MongoDB客户端。这样，我们可以直接引用它**。例如，这使我们能够列出我们连接的所有数据库：

```java
@Override
public MongoClient mongoClient() {
    MongoClient client = MongoClients.create(uri);
    ListDatabasesIterable`<Document>` databases = client.listDatabases();
    databases.forEach(System.out::println);
    return client;
}
```

以这种方式配置连接对我们想要完全控制MongoDB客户端的创建非常有用。

### 4.2. 创建自定义 _MongoClientFactoryBean_

接下来的例子中，我们将创建一个 _MongoClientFactoryBean_。**这次，我们将创建一个名为 _custom.uri_ 的属性来保存我们的连接配置：**

```java
@SpringBootApplication
public class SpringMongoConnectionViaFactoryApp {

    // main method

    @Bean
    public MongoClientFactoryBean mongo(@Value("${custom.uri}") String uri) {
        MongoClientFactoryBean mongo = new MongoClientFactoryBean();
        ConnectionString conn = new ConnectionString(uri);
        mongo.setConnectionString(conn);

        MongoClient client = mongo.getObject();
        client.listDatabaseNames()
          .forEach(System.out::println);
        return mongo;
    }
}
```

**这种方法，我们不需要扩展 _AbstractMongoClientConfiguration_**。我们还控制了我们的 _MongoClient_ 的创建。例如，通过调用 _mongo.setSingleton(false)_，每次调用 _mongo.getObject()_ 时我们都会得到一个新的客户端，而不是单例。

### 4.3. 使用 MongoClientSettingsBuilderCustomizer 设置连接详细信息

在我们最后一个示例中，我们将使用一个 _MongoClientSettingsBuilderCustomizer_：

```java
@SpringBootApplication
public class SpringMongoConnectionViaBuilderApp {

    // main method

    @Bean
    public MongoClientSettingsBuilderCustomizer customizer(@Value("${custom.uri}") String uri) {
        ConnectionString connection = new ConnectionString(uri);
        return settings -> settings.applyConnectionString(connection);
    }
}
```

我们使用这个类来自定义我们连接的某些部分，但仍然有其余部分的自动配置。这 **在我们只需要以编程方式设置一些属性时非常有用**。

# 5. 结论

在本文中，我们检查了Spring Data MongoDB带来的不同工具。我们使用它们以不同的方式创建连接。此外，我们构建了测试用例以确保我们的配置按预期工作。最后，我们看到了配置优先级如何影响我们的连接属性。

如常，源代码可在GitHub上获得。

[给Kimi加油](kimi://action?name=cheer-on-kimi)

OK