---
date: 2024-06-24
category:
  - Spring Cloud AWS
  - SQS Integration
tag:
  - Spring Cloud AWS 3.0
  - SQS
  - Integration Test
  - Testcontainers
  - LocalStack
head:
  - - meta
    - name: keywords
      content: Spring Cloud AWS, SQS Integration, Event-Driven, Asynchronous Messaging, Java, AWS
------
# Spring Cloud AWS 3.0 与 SQS 集成介绍

Spring Cloud AWS 是一个旨在简化与 AWS 服务交互的项目。Simple Queue Service（SQS）是 AWS 的一个解决方案，用于以可扩展的方式发送和接收异步消息。

在本教程中，我们将重新介绍 Spring Cloud AWS SQS 集成，该集成已为 Spring Cloud AWS 3.0 完全重写。

该框架提供了熟悉的 Spring 抽象来处理 SQS 队列，例如 SqsTemplate 和 @SqsListener 注解。

我们将通过事件驱动的场景，展示发送和接收消息的示例，并展示使用 Testcontainers（一种管理一次性 Docker 容器的工具）和 LocalStack（本地模拟类似 AWS 环境的工具）来设置集成测试的策略。

## 2. 依赖项

Spring Cloud AWS Bill of Materials (BOM) 确保了项目之间的版本兼容。它为许多依赖项声明了版本，包括 Spring Boot，并**应代替 Spring Boot 自己的 BOM 使用**。

以下是如何在我们的 pom.xml 文件中导入它的方式：

```xml
`<dependencyManagement>`
    `<dependencies>`
        ``````<dependency>``````
            ``````<groupId>``````io.awspring.cloud``````</groupId>``````
            ``````<artifactId>``````spring-cloud-aws``````</artifactId>``````
            `<version>`3.0.4`</version>`
            `<type>`pom`</type>`
            ````<scope>````import````</scope>````
        ``````</dependency>``````
    `</dependencies>`
`</dependencyManagement>`
```

我们将需要的主要依赖项是 SQS Starter，它包含了项目的所有 SQS 相关类。SQS 集成没有依赖于 Spring Boot，并且可以在任何标准 Java 应用程序中独立使用：

```xml
``````<dependency>``````
    ``````<groupId>``````io.awspring.cloud``````</groupId>``````
    ``````<artifactId>``````spring-cloud-aws-starter-sqs``````</artifactId>``````
``````</dependency>``````
```

对于像本教程中我们正在构建的 Spring Boot 应用程序，我们应该添加项目的核心启动器，因为它允许我们利用 Spring Boot 的自动配置功能，以及 AWS 配置，如凭证和区域：

```xml
``````<dependency>``````
    ``````<groupId>``````io.awspring.cloud``````</groupId>``````
    ``````<artifactId>``````spring-cloud-aws-starter``````</artifactId>``````
``````</dependency>``````
```

## 3. 设置本地测试环境

在这一部分中，我们将介绍如何使用 Testcontainers 设置 LocalStack 环境，以便在本地环境中测试我们的代码。请注意，**本教程中的示例也可以直接针对 AWS 执行**。

### 3.1. 依赖项

为了使用 JUnit 5 运行 LocalStack 和 TestContainers，我们需要两个额外的依赖项：

```xml
``````<dependency>``````
    ``````<groupId>``````org.testcontainers``````</groupId>``````
    ``````<artifactId>``````localstack``````</artifactId>``````
    ````<scope>````test````</scope>````
``````</dependency>``````
``````<dependency>``````
    ``````<groupId>``````org.testcontainers``````</groupId>``````
    ``````<artifactId>``````junit-jupiter``````</artifactId>``````
    ````<scope>````test````</scope>````
``````</dependency>``````
```

我们还要包括 awaitility 库，以帮助我们断言异步消息消费：

```xml
``````<dependency>``````
    ``````<groupId>``````org.awaitility``````</groupId>``````
    ``````<artifactId>``````awaitility``````</artifactId>``````
    ````<scope>````test````</scope>````
``````</dependency>``````
```

### 3.2. 配置

现在，我们将创建一个类来管理我们的容器逻辑，这可以由我们的测试套件继承。让我们将其命名为 _BaseSqsIntegrationTests_。对于扩展此类的每个测试套件，Testcontainers 将创建并启动一个新的容器，这对于**隔离每个套件的数据**至关重要。

@SpringBootTest 注解是必要的，以便 Spring 上下文被初始化，而 @Testcontainers 注解将我们的 Testcontainers 注解与 JUnit 的运行时关联起来，以便容器在测试套件运行时启动，并在测试完成后停止：

```java
@SpringBootTest
@Testcontainers
public class BaseSqsIntegrationTest {
   // 我们的测试配置将在这里添加
}
```

现在让我们声明 _LocalStackContainer_。@Container 注解也是必要的，以便框架自动管理容器的生命周期：

```java
private static final String LOCAL_STACK_VERSION = "localstack/localstack:2.3.2";

@Container
static LocalStackContainer localstack = new LocalStackContainer(DockerImageName.parse(LOCAL_STACK_VERSION));
```

最后，我们将绑定 Spring Cloud AWS 框架用于自动配置的属性与 LocalStack。我们将在运行时获取容器端口和主机，因为 Testcontainers 将为我们提供一个随机端口，这对于并行测试是很好的。我们可以使用 @DynamicPropertySource 注解来实现这一点：

```java
@DynamicPropertySource
static void overrideProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.cloud.aws.region.static", () -> localStack.getRegion());
    registry.add("spring.cloud.aws.credentials.access-key", () -> localStack.getAccessKey());
    registry.add("spring.cloud.aws.credentials.secret-key", () -> localStack.getSecretKey());
    registry.add("spring.cloud.aws.sqs.endpoint", () -> localStack.getEndpointOverride(SQS)
      .toString());
    // ...其他 AWS 服务端点可以在这里添加
}
```

这就是我们使用 LocalStack、Testcontainers 和 Spring Cloud AWS 实现 Spring Boot 测试所需的全部。我们还需要**确保 Docker 引擎在我们的本地环境中运行**，然后再运行测试。

## 4. 设置队列名称

我们可以通过**利用 Spring Boot 的 _application.yml_ 属性机制**来设置队列名称。

对于本教程，我们将创建三个队列：

```yaml
events:
  queues:
    user-created-by-name-queue: user_created_by_name_queue
    user-created-record-queue: user_created_record_queue
    user-created-event-type-queue: user_created_event_type_queue
```

让我们创建一个 POJO 来表示这些属性：

```java
@ConfigurationProperties(prefix = "events.queues")
public class EventQueuesProperties {

    private String userCreatedByNameQueue;
    private String userCreatedRecordQueue;
    private String userCreatedEventTypeQueue;

    // getters and setters
}
```

最后，我们需要在带有 @Configuration 注解的类中，或主 Spring 应用程序类中使用 @EnableConfigurationProperties 注解，以让 Spring Boot 知道我们想要用我们的 _application.yml_ 属性填充它：

```java
@SpringBootApplication
@EnableConfigurationProperties(EventQueuesProperties.class)
public class SpringCloudAwsApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringCloudAwsApplication.class, args);
    }
}
```

现在，我们可以在需要队列名称时注入这些值本身或 POJO。

默认情况下，**Spring Cloud AWS SQS 会在找不到队列时创建它们**，这有助于我们快速设置开发环境。在生产环境中，应用程序不应该有权限创建队列，所以如果找不到队列，它将无法启动。框架也可以配置为如果找不到队列则显式失败。

## 5. 发送和接收消息

使用 Spring Cloud AWS 发送和接收 SQS 的消息有多种方式。在这里，我们将介绍最常见的几种方式，**使用 SqsTemplate 发送消息和使用 @SqsListener 注解接收它们**。

### 5.1. 场景

在我们的场景中，我们将**模拟一个事件驱动的应用程序**，它响应 UserCreatedEvent 通过在其本地存储库中保存相关信息。

让我们创建一个 User 实体：

```java
public record User(String id, String name, String email) {
}
```

让我们创建一个简单的内存 UserRepository：

```java
@Repository
public class UserRepository {

    private final Map`<String, User>` persistedUsers = new ConcurrentHashMap<>();

    public void save(User userToSave) {
        persistedUsers.put(userToSave.id(), userToSave);
    }

    public Optional``<User>`` findById(String userId) {
        return Optional.ofNullable(persistedUsers.get(userId));
    }

    public Optional``<User>`` findByName(String name) {
        return persistedUsers.values().stream()
          .filter(user -> user.name().equals(name))
          .findFirst();
    }
}
```

最后，让我们创建一个 UserCreatedEvent Java 记录类：

```java
public record UserCreatedEvent(String id, String username, String email) {
}
```

### 5.2. 设置

为了测试我们的场景，我们将创建一个 SpringCloudAwsSQSLiveTest 类，它扩展了我们之前创建的 BaseSqsIntegrationTest 文件。我们将自动装配三个依赖项：由框架自动配置的 SqsTemplate，UserRepository 以便我们可以断言我们的消息处理工作正常，以及我们的 EventQueuesProperties POJO 包含队列名称：

```java
public class SpringCloudAwsSQSLiveTest extends BaseSqsIntegrationTest {

    private static final Logger logger = LoggerFactory.getLogger(SpringCloudAwsSQSLiveTest.class);

    @Autowired
    private SqsTemplate sqsTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventQueuesProperties eventQueuesProperties;

   // ...
}
```