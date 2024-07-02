---
date: 2024-07-03
category:
  - Spring Boot
  - Docker Compose
tag:
  - Spring Boot 3
  - Docker Compose 支持
head:
  - - meta
    - name: keywords
      content: Spring Boot 3, Docker Compose, 集成, 教程
---
# Docker Compose 在 Spring Boot 3 中的支持

## 1. 概述

Spring Boot 3 引入了新特性，比如将应用程序构建为 GraalVM 原生映像或 Java 17 基线版本。然而，另一个重要的支持是 Docker Compose 的集成。

在本教程中，我们将看到如何将 Docker Compose 工作流程与 Spring Boot 3 集成。

## 2. Spring Boot 3 对 Docker Compose 的支持提供了什么？

通常，我们会运行 `docker-compose up` 来启动容器，并使用 `docker-compose down` 来停止基于 `docker-compose.yml` 的容器。现在，我们可以将这些 Docker Compose 命令委托给 Spring Boot 3。当 Spring Boot 应用程序启动或停止时，它也将管理我们的容器。

**此外，它内置了对多个服务的管理，如 SQL 数据库、MongoDB、Cassandra 等。因此，我们可能不需要在应用程序资源文件中重复配置类或属性。**

最后，我们将看到我们可以将这种支持与自定义 Docker 映像和 Docker Compose 配置文件一起使用。

## 3. 设置

我们需要 Docker Compose 和 Spring Boot 3 来探索这种新支持。

### 3.1. Docker Compose

Docker Compose 需要已经安装的 Docker 引擎。它们很容易安装，尽管根据操作系统可能会有所不同。

Docker 在我们的主机上作为服务运行。我们可以从 Docker 镜像中在我们的系统中运行容器作为轻量级进程。我们可以将镜像视为在最小的 Linux 内核之上的多层镜像。

### 3.2. Spring Boot 3

有几种设置 Spring Boot 3 项目的方法。例如，我们可以使用版本 3.1.0 的 Spring 初始化器。然而，我们总是需要 Spring Boot 3 启动器库来包含项目中的依赖项。

首先，我们添加一个父 POM：

```xml
`<parent>`
    `````<groupId>`````org.springframework.boot`````</groupId>`````
    `````<artifactId>`````spring-boot-starter-parent`````</artifactId>`````
    `<relativePath />`
`</parent>`
```

我们希望为我们的应用程序使用 REST 端点，所以我们需要 web 依赖项；

```xml
````<dependency>````
    `````<groupId>`````org.springframework.boot`````</groupId>`````
    `````<artifactId>`````spring-boot-starter-web`````</artifactId>`````
````</dependency>````
```

我们将连接到一个示例数据库。有多种内置支持。我们将使用 MongoDB：

```xml
````<dependency>````
    `````<groupId>`````org.springframework.boot`````</groupId>`````
    `````<artifactId>`````spring-boot-starter-data-mongodb`````</artifactId>`````
````</dependency>````
```

为了检查我们的应用程序是否正常运行，我们将使用 Spring Boot Actuator 进行健康检查：

```xml
````<dependency>````
    `````<groupId>`````org.springframework.boot`````</groupId>`````
    `````<artifactId>`````spring-boot-starter-actuator`````</artifactId>`````
````</dependency>````
```

最后，我们将添加 Docker Compose 依赖项。如果我们想使用其他项目功能但排除 Docker Compose 支持，我们可以将 _optional_ 标签设置为 _true_：

```xml
````<dependency>````
    `````<groupId>`````org.springframework.boot`````</groupId>`````
    `````<artifactId>`````spring-boot-docker-compose`````</artifactId>`````
    `<version>`3.1.1`</version>`
````</dependency>````
```

如果我们使用 Gradle，我们可能会考虑使用 Spring Boot Gradle 插件进行 BOM 类似的依赖管理。

## 4. Spring Boot 3 与 Docker Compose 应用程序快速启动

我们将使用 MongoDB 数据库创建一个 Spring Boot 3 应用程序。**一旦我们在启动时有了 `spring-boot-docker-compose` 依赖项，我们的应用程序就会在 `docker-compose.yml` 文件中启动所有服务。**

### 4.1. Docker Compose 文件

首先，让我们创建一个 `docker-compose.yml` 文件：

```yaml
version: '3.8'
services:
  db:
    image: mongo:latest
    ports:
      - '27017:27017'
    volumes:
      - db:/data/db
volumes:
  db:
    driver: local
```

### 4.2. Spring 配置文件

我们需要告诉 Spring Boot 3 Docker Compose 文件的名称和路径。我们可以在一个 `application-{profile}` 属性或 YAML 文件中添加这个信息。我们将使用一个 `docker-compose` Spring 配置文件。因此，我们将创建一个 `application-docker-compose.yml` 配置文件：

```yaml
spring:
  docker:
    compose:
      enabled: true
      file: docker-compose.yml
```

### 4.3. 数据库配置

我们不需要数据库配置。Docker Compose 支持将创建一个默认配置。然而，我们仍然可以使用配置文件添加我们的 MongoDB 配置，例如：

```java
@Profile("!docker-compose")
```

这样，我们可以选择是否使用 Docker Compose 支持。如果我们不使用配置文件，应用程序将期望数据库已经在运行。

### 4.4. 模型

然后，我们为一个通用项目创建一个简单的 `Document` 类：

```java
@Document("item")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Item {
    @Id
    private String id;
    private String name;
    private int quantity;
    private String category;
}
```

### 4.5. REST 控制器

最后，让我们定义一个带有一些 CRUD 操作的控制器：

```java
@RestController
@RequestMapping("/item")
@RequiredArgsConstructor
public class ItemController {
    ....
    @PostMapping(consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity`<Item>` save(final @RequestBody Item item) {
        return ResponseEntity.ok(itemRepository.save(item));
    }
    // 其他端点
}
```

## 5. 应用程序测试

我们可以通过从我们喜欢的 IDE 或命令行启动主 Spring Boot 3 类来启动应用程序。

### 5.1. 应用程序启动

让我们记得提到一个 Spring 配置文件。例如，从命令行，我们可以使用 Spring Boot maven 插件：

```shell
mvn spring-boot:run -Pdocker-compose -Dspring-boot.run.profiles=docker-compose
```

我们还添加了一个专用的 Maven 构建配置文件（`-Pdocker-compose`），以防存在其他配置文件。

现在，如果我们执行 `docker ps`，我们将看到我们的 MongoDB 容器正在运行：

```shell
CONTAINER ID   IMAGE             COMMAND                  CREATED        STATUS            PORTS                                           NAMES
77a9667b291a   mongo:latest      "docker-entrypoint.s…"   21 hours ago   Up 10 minutes     0.0.0.0:27017->27017/tcp, :::27017->27017/tcp   classes-db-1
```

现在我们可以对应用程序进行一些实时测试。

### 5.2. 应用程序检查

我们可以使用 actuator 端点检查我们的应用程序是否正常运行：

```shell
curl --location 'http://localhost:8080/actuator/health'
```

如果一切正常，我们应该得到一个 `200` 状态：

```json
{
    "status": "UP"
}
```

对于数据库检查，让我们在端点 `http://localhost:8080/item` 上使用 POST 调用添加一些项目。例如，让我们看看一个 `curl` Post 请求：

```shell
curl --location 'http://localhost:8080/item' \
--header 'Content-Type: application/json' \
--data '{
    "name" : "Tennis Ball",
    "quantity" : 5,
    "category" : "sport"
}'
```

我们将得到一个带有生成的项目 `id` 的响应：

```json
{
    "id": "64b117b6a805f7296d8412d9",
    "name": "Tennis Ball",
    "quantity": 5,
    "category": "sport"
}
```

### 5.3. 应用程序关闭

最后，关闭 Spring Boot 3 应用程序也将停止我们的容器。我们可以通过执行 `docker ps -a` 来看到这一点：

```shell
CONTAINER ID   IMAGE             COMMAND                  CREATED        STATUS                     PORTS     NAMES
77a9667b291a   mongo:latest      "docker-entrypoint.s…"   22 hours ago   Exited (0) 5 seconds ago             classes-db-1
```

## 6. Docker Compose 支持特性

让我们快速说明 Docker Compose 支持的一些最相关特性。

### 6.1. 服务连接

这种支持将在启动时自动发现多个服务。我们已经看到了 MongoDB。然而，还有其他的，比如 Redis 或 ElasticSearch。服务连接将找到并使用本地映射的端口。我们可以跳过配置类或属性。这是通过 Spring Boot 使用 `ConnectionDetails` 抽象来完成的。

### 6.2. 自定义映像

我们可以通过应用一个 `label` 来使用自定义 Docker 映像：

```yaml
version: '3.8'
services:
  db:
    image: our-custom-mongo-image
    ports:
      - '27017:27017'
    volumes```yaml
      - db:/data/db
    labels:
      org.springframework.boot.service-connection: mongo
volumes:
  db:
    driver: local
```

### 6.3. 等待容器就绪

有趣的是，Spring Boot 3 将自动检查容器的就绪状态。容器可能需要一些时间才能完全准备好。因此，这个特性让我们可以使用 `healthcheck` 命令来查看容器是否已经准备好。

### 6.4. 激活 Docker Compose 配置文件

我们可以在运行时在不同的 Docker Compose 配置文件之间切换。我们的服务定义可能很复杂，所以我们可能想要选择启用哪个配置文件，例如，如果我们在调试或生产环境中。我们可以通过使用配置属性来实现这一点：

```yaml
spring.docker.compose.profiles.active=myprofile
```

## 7. Docker Compose 支持的优势

在生产环境中，我们的 Docker 服务可能会分布在不同的实例上。因此，在这种情况下，我们可能不需要这种支持。然而，我们可以激活一个 Spring 配置文件，该文件仅从 `_docker-compose.yml_` 定义中加载本地开发环境。

**这种支持与我们的 IDE 集成得很好，我们将不会在命令行之间来回切换来启动和停止 Docker 服务。**

支持从版本 3.1 开始。总的来说，已经有不错的特性，例如多服务连接、默认的服务就绪性检查，以及使用 Docker Compose 配置文件的可能性。

## 8. 结论

在本文中，我们学习了 Spring Boot 3.1.0 中新的 Docker Compose 支持。我们看到了如何设置并创建一个使用它的 Spring Boot 3 应用程序。

遵循 Spring Boot 的开发便利性，这种支持非常实用，并且已经具有不错的特性。在启动和停止应用程序的同时，Spring Boot 3 管理了我们的 Docker 服务的生命周期。

如常，本文中展示的代码可以在 GitHub 上找到。

OK