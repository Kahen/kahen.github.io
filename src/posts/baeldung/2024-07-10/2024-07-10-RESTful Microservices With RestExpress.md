---
date: 2022-04-01
category:
  - Java
  - RESTful Microservices
tag:
  - RestExpress
  - Microservices
head:
  - - meta
    - name: keywords
      content: Java, RESTful Microservices, RestExpress, Microservices
---
# 使用RestExpress构建RESTful微服务

现代软件架构常常是破碎的。缓慢的交付导致错失机会，由于架构复杂性，创新停滞不前，而且工程资源异常昂贵。

Orkes是领先的工作流编排平台，旨在使团队能够转变他们开发、连接和部署应用程序、微服务、AI代理等的方式。

通过Orkes Cloud管理的Orkes Conductor，开发人员可以专注于构建关键任务应用程序，而不必担心基础设施维护以满足目标，简单来说，就是更快地将新产品推向市场并降低总拥有成本。

**立即尝试Orkes Conductor的14天免费试用**。

## 1. 概述

在本教程中，我们将学习如何使用RestExpress构建RESTful微服务。

RestExpress是一个开源的Java框架，它使我们能够快速轻松地构建RESTful微服务。它基于Netty框架，旨在减少样板代码并加快RESTful微服务的开发。

此外，它使用插件架构，允许我们为我们的微服务添加功能。它支持插件以实现常见功能，如缓存、安全和持久性。

## 2. RestExpress原型

RestExpress原型是一个支持项目，提供一组Maven原型用于创建RestExpress项目。

截至撰写本文时，有三种原型可用：

1. **最小化** - 包含创建RESTful项目所需的最少代码。它包含主类、属性文件和示例API。
2. **mongodb** - 创建具有MongoDB支持的RESTful项目。除了最小化原型之外，它还包括MongoDB层。
3. **cassandra** - 类似于mongodb原型，向最小化原型添加了Cassandra层。

每个原型都附带一组插件，以为我们的微服务添加功能：

- CacheControlPlugin - 增加对Cache-Control头的支持
- CORSPlugin - 增加对CORS的支持
- MetricsPlugin - 增加对度量标准的支持
- SwaggerPlugin - 增加对Swagger的支持
- HyperExpressPlugin - 增加对HATEOAS的支持

默认情况下，只有MetricsPlugin启用，并使用Dropwizard Metrics。我们可以通过添加对他们的实现之一的依赖来**启用其他插件**。我们可能还需要添加属性来配置和启用某些插件。

在下一节中，我们将探讨如何使用_mongodb_原型创建项目。然后，我们将学习应用程序的配置，然后我们将查看生成的代码的某些方面。

### 2.1. 使用原型创建项目

让我们使用_mongodb_原型创建一个项目。

在终端上，让我们导航到我们想要创建项目的目录。我们将使用_mvn archetype:generate_命令：

```shell
$ mvn archetype:generate -DarchetypeGroupId=com.strategicgains.archetype -DarchetypeArtifactId=restexpress-mongodb -DarchetypeVersion=1.18 -DgroupId=com.baeldung -DartifactId=rest-express -Dversion=1.0-SNAPSHOT
```

这将创建一个带有一些示例代码和配置的项目：

![img](https://www.baeldung.com/wp-content/uploads/2023/01/rest-express-project-structure-1.png)

原型自动为我们创建了几个组件。它使用默认配置创建了一个服务器。这些**配置在_environment.properties_文件中**。

在_objectid_和_uuid_包中有**两组CRUD API**。每个包都包括一个实体、一个控制器、一个服务和一个存储库类。

_Configuration, Server, Main,_和_Routes_类在启动期间帮助配置服务器。

我们将在接下来的部分中探讨这些生成的类。

## 3. 生成的代码

让我们探索生成的代码。我们将重点关注主类、API方法和数据库层。这将让我们了解如何使用RestExpress创建一个简单的CRUD应用程序。

### 3.1. 主类

主类是我们应用程序的入口点。它**负责启动服务器和配置应用程序**。

让我们看看_Main_类的_main()_方法：

```java
public static void main(String[] args) throws Exception {
    Configuration config = Environment.load(args, Configuration.class);
    Server server = new Server(config);
    server.start().awaitShutdown();
}
```

让我们详细了解代码：

- **_Environment.load()_方法**从_environment.properties_文件中**加载配置**并创建一个_Configuration_对象。
- _Server_类负责启动服务器。它需要一个_Configuration_对象来设置服务器。我们将在接下来的部分中查看_Configuration_和_Server_类。
- _start()_方法启动服务器，_awaitShutdown()_方法等待服务器关闭。

### 3.2. 读取属性

_environment.properties_文件包含我们应用程序的配置。为了读取属性，_Configuration_类是自动创建的。

让我们看看_Configuration_类的不同部分。

_Configuration_类扩展了_Environment_类。这允许我们**从环境中读取属性**。它重写了_Environment_类的_fillValues()_方法以实现此目的：

```java
@Override
protected void fillValues(Properties p) {
    this.port = Integer.parseInt(p.getProperty(PORT_PROPERTY, String.valueOf(RestExpress.DEFAULT_PORT)));
    this.baseUrl = p.getProperty(BASE_URL_PROPERTY, "http://localhost:" + String.valueOf(port));
    this.executorThreadPoolSize = Integer.parseInt(p.getProperty(EXECUTOR_THREAD_POOL_SIZE, DEFAULT_EXECUTOR_THREAD_POOL_SIZE));
    this.metricsSettings = new MetricsConfig(p);
    MongoConfig mongo = new MongoConfig(p);
    initialize(mongo);
}
```

以上代码从环境中读取端口、基础URL和执行器线程池大小，并设置这些值到字段。它还创建了一个_MetricsConfig_对象和一个_MongoConfig_对象。

我们将在下一节中查看_initialize()_方法。

### 3.3. 初始化控制器和存储库

_initialize()_方法负责初始化控制器和存储库：

```java
private void initialize(MongoConfig mongo) {
    SampleUuidEntityRepository samplesUuidRepository = new SampleUuidEntityRepository(mongo.getClient(), mongo.getDbName());
    SampleUuidEntityService sampleUuidService = new SampleUuidEntityService(samplesUuidRepository);
    sampleUuidController = new SampleUuidEntityController(sampleUuidService);

    SampleOidEntityRepository samplesOidRepository = new SampleOidEntityRepository(mongo.getClient(), mongo.getDbName());
    SampleOidEntityService sampleOidService = new SampleOidEntityService(samplesOidRepository);
    sampleOidController = new SampleOidEntityController(sampleOidService);
}
```

以上代码**使用Mongo客户端和数据库名称创建了一个_SampleUuidEntityRepository_对象**。然后**使用存储库创建了一个_SampleUuidEntityService_对象**。最后，**使用服务创建了一个_SampleUuidEntityController_对象**。

对于_SampleOidEntityController_，重复相同的过程。这样，API和数据库层就被初始化了。

_Configuration_类负责创建我们在服务器启动时想要配置的任何对象。我们可以在_initialize()_方法中添加任何其他初始化代码。

同样，**我们可以向_environment.properties_文件添加更多属性，并在_fillValues()_方法中读取它们**。

我们也可以扩展_Configuration_类以实现我们自己的实现。在这种情况下，我们需要更新_Main_类以使用我们的实现而不是_Configuration_类。

## 4. RestExpress API

在上一节中，我们看到了_Configuration_类如何初始化控制器。让我们看看_SampleUuidEntityController_类，以了解如何创建API方法。

**示例控制器包含_create()_、_read()_、_readAll()_、_update()_和_delete()_方法的工作代码。**每个方法内部都调用服务类的相应方法，然后是存储库类。

接下来，让我们看几个方法来了解它们的工作原理。

### 4.1. 创建

让我们看看_create()_方法：

```java
public SampleOidEntity create(Request request, Response response) {
    SampleOidEntity entity = request.getBodyAs(SampleOidEntity.class, "Resource details not provided");
    SampleOidEntity saved = service.create(entity);

    // 构建创建的响应...
    response.setResponseCreated();

    // 包括位置头...
    String locationPattern = request.getNamedUrl(HttpMethod.GET, Constants.Routes.SINGLE_OID_SAMPLE);
    response.addLocationHeader(LOCATION_BUILDER.build(locationPattern, new DefaultTokenResolver()));

    // 返回新创建的资源...
    return saved;
}
```

以上代码：

- 读取请求体并将其转换为_SampleOidEntity_对象
- 调用服务类的_create()_方法并传递实体对象
- 将响应代码设置为_201 – 已创建_
- 向响应添加位置头
- 返回新创建的实体

如果我们查看服务类，我们会看到它执行验证并调用存储库类的_create()_方法。

_SampleOidEntityRepository_类扩展了_MongodbEntityRepository_类，后者内部使用Mongo Java驱动程序执行数据库操作：

```java
public class SampleOidEntityRepository extends MongodbEntityRepository`<SampleOidEntity>` {
    @SuppressWarnings("unchecked")
    public SampleOidEntityRepository(MongoClient mongo, String dbName) {
        super(mongo, dbName, SampleOidEntity.class);
    }
}
```

### 4.2. 读取

现在，让我们看看_read_方法：

```java
public SampleOidEntity read(Request request, Response response) {
    String id = request.getHeader(Constants.Url.SAMPLE_ID, "No resource ID supplied");
    SampleOidEntity entity = service.read(Identifiers.MONGOID.parse(id));

    return entity;
}
```

该方法从请求头解析ID，并调用服务类的_read()_方法。服务类随后调用存储库类的_read()_方法。存储库类从数据库检索并返回实体。

## 5. 服务器和路由

最后，让我们看看_Server_类。**_Server_类引导应用程序。它定义了路由和路由的控制器。它还使用度量和其他插件配置服务器。**

### 5.1. 创建服务器

让我们看看_Server_类的构造函数：

```java
public Server(Configuration config) {
    this.config = config;
    RestExpress.setDefaultSerializationProvider(new SerializationProvider());
    Identifiers.UUID.useShortUUID(true);

    this.server = new RestExpress()
      .setName(SERVICE_NAME)
      .setBaseUrl(config.getBaseUrl())
      .setExecutorThreadCount(config.getExecutorThreadPoolSize())
      .addMessageObserver(new SimpleConsoleLogMessageObserver());

    Routes.define(config,server);
    Relationships.define(server);
    configurePlugins(config,server);
    mapExceptions(server);
}
```

构造函数执行几个步骤：

- 它**创建一个_RestExpress_对象，并设置名称、基础URL、执行器线程池大小和控制台日志的消息观察者**。RestExpress**内部创建一个Netty服务器**。当我们在_Main_类的_start()_方法中调用时，此服务器将启动。
- 它调用_Routes.define()_方法来定义路由。我们将在下一节中查看_Routes_类。
- 它为我们的实体定义关系，根据提供的属性配置插件，并将某些内部异常映射到应用程序已处理的异常。

### 5.2. 路由

_Routes.define()_方法定义了路由和每个路由调用的控制器方法。

让我们看看_SampleOidEntityController_的路由：

```java
public static void define(Configuration config, RestExpress server) {
    // 其他路由为了简洁省略了...

    server.uri("/samples/oid/{uuid}.{format}", config.getSampleOidEntityController())
      .method(HttpMethod.GET, HttpMethod.PUT, HttpMethod.DELETE)
      .name(Constants.Routes.SINGLE_OID_SAMPLE);

    server.uri("/samples/oid.{format}", config.getSampleOidEntityController())
      .action("readAll", HttpMethod.GET)
      .method(HttpMethod.POST)
      .name(Constants.Routes.SAMPLE_OID_COLLECTION);
}
```

让我们详细看看第一个路由定义。_uri()_方法将模式_/samples/oid/{uuid}.{format}_映射到_SampleOidEntityController_。_{uuid}_和_{format}_是URL的路径参数。

**_GET_、_PUT_和_DELETE_方法分别映射到控制器的_read()_、_update()_和_delete()_方法。这是Netty服务器的默认行为。**

为路由分配了一个名称以便于按名称检索路由。**如果需要，可以使用_server.getRouteUrlsByName()_方法检索路由。**

上述模式适用于_read()_、_update()_和_delete()_，因为它们都需要一个ID。对于_create()_和_readAll()_，我们需要使用一个不需要ID的不同模式。

让我们看看第二个路由定义。模式_/samples/oid.{format}_映射到_SampleOidEntityController_。

**_action()_方法用于将方法名称映射到HTTP方法**。在这种情况下，_readAll()_方法映射到_GET_方法。

_POST_方法在模式上是允许的，并默认映射到控制器的_create()_方法。和以前一样，为路由分配了一个名称。

需要注意的一个重点是，**如果我们在控制器中定义了更多的方法或更改了标准方法的名称，我们将需要使用_action()_方法将它们映射到它们各自的HTTP方法。**

我们需要定义的任何其他URL模式都必须添加到_Routes.define()_方法中。

## 6. 运行应用程序

让我们运行应用程序并对实体执行一些操作。我们将使用_curl_命令来执行操作。

让我们通过运行_Main_类来启动应用程序。**应用程序在端口_8081_上启动。**

默认情况下，_SampleOidEntity_除了ID和时间戳外没有任何字段。让我们向实体添加一个名为_name_的字段：

```java
public class SampleOidEntity extends AbstractMongodbEntity implements Linkable {
    private String name;

    // 构造函数，getter和setter
}
```

### 6.1. 测试API

让我们通过运行一个_curl_命令来创建一个新的实体：

```shell
$ curl -X POST -H "Content-Type: application/json" -d "{\"name\":\"test\"}" http://localhost:8081/samples/oid.json
```

这应该会返回带有ID的新创建的实体：

```json
{
  "_links": {
    "self": {
      "href": "http://localhost:8081/samples/oid/63a5d983ef1e572664c148fd"
    },
    "up": {
      "href": "http://localhost:8081/samples/oid"
    }
  },
  "name": "test",
  "id": "63a5d983ef1e572664c148fd",
  "createdAt": "2022-12-23T16:38:27.733Z",
  "updatedAt": "2022-12-23T16:38:27.733Z"
}
```

接下来，让我们尝试使用上面返回的_id_读取创建的实体：

```shell
$ curl -X GET http://localhost:8081/samples/oid/63a5d983ef1e572664c148fd.json
```

这应该会返回与之前相同的实体。

## 7. 结论

在本文中，我们探讨了如何使用RestExpress创建REST API。

我们使用RestExpress _mongodb_原型创建了一个项目。然后，我们查看了项目结构和生成的类。最后，我们运行了应用程序并执行了一些操作来测试API。

本文中使用的所有代码示例都可以在GitHub上找到。

OK