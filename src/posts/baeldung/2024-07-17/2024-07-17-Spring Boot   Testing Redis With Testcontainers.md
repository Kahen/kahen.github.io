---
date: 2022-04-01
category:
  - Spring Boot
  - Redis
tag:
  - Testcontainers
  - Java
head:
  - - meta
    - name: keywords
      content: Spring Boot, Redis, Testcontainers, Java
------
# Spring Boot – 使用 Testcontainers 测试 Redis

## 1. 概述

Testcontainers 是一个用于创建临时 Docker 容器以进行单元测试的 Java 库。当我们希望避免使用实际服务器进行测试时，它非常有用。

在本教程中，**我们将学习如何在测试使用 Redis 的 Spring Boot 应用程序时使用 Testcontainers。**

## 2. 项目设置

使用任何测试容器的首要前提是**在运行测试的机器上安装 Docker。**

一旦我们安装了 Docker，我们就可以开始设置我们的 Spring Boot 应用程序。

在这个应用程序中，我们将设置一个 Redis 哈希表、一个仓库和一个服务，该服务将使用仓库与 Redis 进行交互。

### 2.1. 依赖项

让我们首先向项目添加所需的依赖项。

首先，我们将添加 Spring Boot Starter Test 和 Spring Boot Starter Data Redis 依赖项：

```xml
`````<dependency>`````
    `````<groupId>`````org.springframework.boot`````</groupId>`````
    `````<artifactId>`````spring-boot-starter-test`````</artifactId>`````
`````</dependency>`````
`````<dependency>`````
    `````<groupId>`````org.springframework.boot`````</groupId>`````
    `````<artifactId>`````spring-boot-starter-data-redis`````</artifactId>`````
`````</dependency>`````
```

接下来，让我们添加 Testcontainers 依赖项：

```xml
`````<dependency>`````
    `````<groupId>`````org.testcontainers`````</groupId>`````
    `````<artifactId>`````testcontainers`````</artifactId>`````
    ```<version>```1.19.7```</version>```
    ```<scope>```test```</scope>```
`````</dependency>`````
```

### 2.2. 自动配置

由于我们不需要任何高级配置，我们可以使用自动配置来设置与 Redis 服务器的连接。

为此，我们需要将 Redis 连接详细信息添加到 _application.properties_ 文件中：

```properties
spring.redis.host=127.0.0.1
spring.redis.port=6379
```

## 3. 应用程序设置

让我们从我们的主应用程序代码开始。我们将构建一个小型应用程序，该应用程序读取并写入产品到 Redis 数据库。

### 3.1. 实体

让我们从 _Product_ 类开始：

```java
@RedisHash("product")
public class Product implements Serializable {
    private String id;
    private String name;
    private double price;

    // 构造函数，getter 和 setter
}
```

_@RedisHash_ 注解用于告诉 Spring Data Redis 这个类应该存储在 Redis 哈希表中。将实体存储为哈希表对于不包含嵌套对象的实体是有好处的。

### 3.2. 仓库

接下来，我们可以为我们的 _Product_ 哈希定义一个仓库：

```java
@Repository
public interface ProductRepository extends CrudRepository`<Product, String>` {
}
```

CRUD 仓库接口已经实现了我们需要保存、更新、删除和查找产品的方法。所以我们不需要自己定义任何方法。

### 3.3. 服务

最后，让我们创建一个服务，使用 _ProductRepository_ 执行读写操作：

```java
@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product getProduct(String id) {
        return productRepository.findById(id).orElse(null);
    }

    // 其他方法
}
```

然后，这个服务可以被控制器或服务用来对产品执行 CRUD 操作。

在实际应用程序中，这些方法可能包含更复杂的逻辑，但为了本教程的目的，我们将只关注 Redis 交互。

现在，我们将为我们的 _ProductService_ 编写测试，以测试 CRUD 操作。

### 4.1. 测试服务

让我们为 _ProductService_ 编写一个集成测试：

```java
@Test
void givenProductCreated_whenGettingProductById_thenProductExistsAndHasSameProperties() {
    Product product = new Product("1", "Test Product", 10.0);
    productService.createProduct(product);
    Product productFromDb = productService.getProduct("1");
    assertEquals("1", productFromDb.getId());
    assertEquals("Test Product", productFromDb.getName());
    assertEquals(10.0, productFromDb.getPrice());
}
```

**这假设 Redis 数据库在属性中指定的 URL 上运行。如果我们没有运行 Redis 实例或我们的服务器无法连接到它，测试将遇到错误。**

### 4.2. 使用 Testcontainers 启动 Redis 容器

让我们通过在测试运行时运行 Redis 测试容器来解决这个问题。然后，我们将从代码本身更改连接详细信息。

让我们看看创建和运行测试容器的代码：

```java
static {
    GenericContainer``<?>`` redis =
      new GenericContainer<>(DockerImageName.parse("redis:5.0.3-alpine")).withExposedPorts(6379);
    redis.start();
}
```

让我们理解这段代码的不同部分：

- 我们从 _redis:5.0.3-alpine_ 镜像创建了一个新的容器
- 默认情况下，Redis 实例将在端口 _6379_ 上运行。为了暴露这个端口，我们可以使用 _withExposedPorts()_ 方法。**它将暴露这个端口并将其映射到主机机器上的一个随机端口**
- _start()_ 方法将启动容器并等待其准备就绪
- **我们将此代码添加到 _static_ 代码块中，以便在依赖注入和测试运行之前运行**

### 4.3. 更改连接详细信息

此时，我们有一个正在运行的 Redis 容器，但我们还没有更改应用程序使用的连接详细信息。为此，我们所要做的就是**使用系统属性覆盖 _application.properties_ 文件中的连接详细信息**：

```java
static {
    GenericContainer``<?>`` redis =
      new GenericContainer<>(DockerImageName.parse("redis:5.0.3-alpine")).withExposedPorts(6379);
    redis.start();
    System.setProperty("spring.redis.host", redis.getHost());
    System.setProperty("spring.redis.port", redis.getMappedPort(6379).toString());
}
```

我们**将 _spring.redis.host_ 属性设置为容器的 IP 地址。**

我们可以**获取端口 _6379_ 的映射端口以设置 _spring.redis.port_ 属性。**

现在当测试运行时，它们将连接到运行在容器上的 Redis 数据库。

### 4.4. Redis 容器的替代配置

另外，我们可以使用通过 _@Testcontainers_ 注解管理 Redis 容器的生命周期的 Jupiter 集成。当使用此集成时，我们可以使用 _@Container_ 注解标记容器以进行生命周期管理。让我们继续使用这种方法为我们的测试配置 Redis 容器。

首先，我们必须在项目的 _pom.xml_ 文件中添加 _junit-jupiter_ 和 _testcontainers-redis-junit-jupiter_ 依赖项：

```xml
`````<dependency>`````
    `````<groupId>`````org.testcontainers`````</groupId>`````
    `````<artifactId>`````junit-jupiter`````</artifactId>`````
    ```<version>```1.17.6```</version>```
    ```<scope>```test```</scope>```
`````</dependency>`````

`````<dependency>`````
    `````<groupId>`````com.redis.testcontainers`````</groupId>`````
    `````<artifactId>`````testcontainers-redis-junit-jupiter`````</artifactId>`````
    ```<version>```1.4.6```</version>```
    ```<scope>```test```</scope>```
`````</dependency>`````
```

接下来，让我们使用 _@Container_ 注解定义 _REDIS_CONTAINER_ 静态字段：

```java
@Container
private static final RedisContainer REDIS_CONTAINER =
  new RedisContainer(DockerImageName.parse("redis:5.0.3-alpine")).withExposedPorts(6379);
```

我们必须注意，定义为静态字段的容器将在测试方法之间共享，并且只启动一次。

此外，**让我们使用 _@DynamicPropertySource_ 注解定义 _registerRedisProperties()_ 方法来为应用程序配置连接属性**：

```java
@DynamicPropertySource
private static void registerRedisProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.redis.host", REDIS_CONTAINER::getHost);
    registry.add("spring.redis.port", () -> REDIS_CONTAINER.getMappedPort(6379).toString());
}
```

最后，让我们验证我们的配置是否按预期工作：

```java
@Test
void givenRedisContainerConfiguredWithDynamicProperties_whenCheckingRunningStatus_thenStatusIsRunning() {
    assertTrue(REDIS_CONTAINER.isRunning());
}
```

完美！我们可以看到 Redis 容器对测试方法可用。此外，我们不必更改其他测试方法，可以像以前一样使用它们。

## 5. 结论

在本文中，我们学习了如何使用 Redis Testcontainer 运行测试。我们还查看了 Spring Data Redis 的某些方面，以了解如何使用它。

一如既往，示例的源代码可以在 GitHub 上找到。