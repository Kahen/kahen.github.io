---
date: 2024-06-22
category:
  - Software Engineering
  - Testing
tag:
  - Testcontainers
  - Docker
  - Testing Tools
head:
  - - meta
    - name: keywords
      content: Testcontainers, Docker, Testing, Software Development
---
# Testcontainers 桌面应用 | Baeldung

在本教程中，我们将探索 Testcontainers 桌面应用程序，这是一个简单但功能强大的工具，用于运行 Testcontainers。我们将学习如何使用它来配置我们的 Docker 环境，管理容器生命周期，并了解我们开发和测试模式的见解。

Testcontainers 桌面提供了一个最小化的 UI 设计，旨在简化 Testcontainer 配置和调试。我们可以从官方网站免费下载 Testcontainers 桌面。要开始使用它，我们将通过创建账户或通过第三方如 Google、GitHub 或 Docker 进行注册。

就是这样！一旦我们安装了应用程序并登录，我们就可以在开发工作流程中开始使用 Testcontainers 桌面：

我们应该在任务栏中看到 Testcontainers 的标志。如果我们右键点击它，我们将看到一些我们将在今天探索的关键功能：

- 使用 Testcontainers 云
- 冻结容器关闭
- 定义固定端口
- 与容器交互
- 查看 Testcontainers 仪表板
- 执行高级自定义

## 3. Testcontainers 执行模式

Testcontainers 桌面为开发人员提供了两种主要的运行测试的方式：本地或在云端。值得注意的是，本地执行是默认行为。

### 3.1. 本地执行

本地执行利用我们本地的 Docker 环境。例如，让我们运行一个使用 Testcontainers 启动 MongoDB Docker 容器的 JUnit 测试：

```java
@Testcontainers
@SpringBootTest
class DynamicPropertiesLiveTest {

    @Container
    static MongoDBContainer mongoDBContainer = new MongoDBContainer(DockerImageName.parse("mongo:4.0.10"));

    @DynamicPropertySource
    static void setProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.data.mongodb.uri", mongoDBContainer::getReplicaSetUrl);
    }

    @Test
    void whenRequestingHobbits_thenReturnFrodoAndSam() {
        // ...
    }
}
```

如果我们还没有本地的 Docker 镜像，我们将在日志中看到 Docker 正在拉取它。之后，MongoDB 容器启动：

```plaintext
org.testcontainers.dockerclient.DockerClientProviderStrategy - 找到具有本地 Npipe 套接字的 Docker 环境 (npipe:////./pipe/docker_engine)
org.testcontainers.DockerClientFactory - Docker 主机 IP 地址是 localhost
org.testcontainers.DockerClientFactory - 已连接到 docker：
    服务器版本：4.8.3
    API 版本：1.41
    操作系统：fedora
    总内存：7871 MB
org.testcontainers.DockerClientFactory - 检查系统...
org.testcontainers.DockerClientFactory - ✔︎ Docker 服务器版本至少应该是 1.6.0
tc.mongo:4.0.10 - 正在拉取 Docker 镜像：mongo:4.0.10。请耐心等待；这可能需要一些时间，但只需要做一次。
tc.mongo:4.0.10 - 开始拉取镜像
tc.mongo:4.0.10 - 正在拉取镜像层：1 待处理，1 下载中，0 已解压，(0 字节/? MB)
[ ... ]
tc.mongo:4.0.10 - 拉取完成。14 层，17 秒内拉取完成（下载了 129 MB，速度为 7 MB/s）
tc.mongo:4.0.10 - 正在为镜像创建容器：mongo:4.0.10
tc.mongo:4.0.10 - 容器 mongo:4.0.10 已启动：3d74c3a...
tc.mongo:4.0.10 - 容器 mongo:4.0.10 已在 PT21.0624015S 内启动
```

此外，我们可以通过在终端中运行 "docker ps" 命令来手动检查容器是否已创建。

### 3.2. Testcontainers 云执行

Testcontainers 云提供了一个可扩展的平台，用于在云环境中运行测试。如果我们不想在本地运行容器，或者如果我们没有访问运行中的 Docker 环境，这将是理想的选择。

TestContainer 云是 Testcontainers 的付费功能，但我们可以每月免费使用多达 300 分钟。

从小型 UI 开始，让我们切换到 "使用 Testcontainers 云运行"：

让我们使用这个选项重新运行测试，并再次阅读日志：

```plaintext
org.testcontainers.dockerclient.DockerClientProviderStrategy - 找到带有 Testcontainers 主机的 Docker 环境，tc.host=tcp://127.0.0.1:65497
org.testcontainers.DockerClientFactory - Docker 主机 IP 地址是 127.0.0.1
org.testcontainers.DockerClientFactory - 已连接到 docker：
    服务器版本：78+testcontainerscloud（通过 Testcontainers 桌面 1.7.0）
    API 版本：1.43
    操作系统：Ubuntu 20.04 LTS
    总内存：7407 MB
org.testcontainers.DockerClientFactory - 检查系统...
org.testcontainers.DockerClientFactory - ✔︎ Docker 服务器版本至少应该是 1.6.0
tc.mongo:4.0.10 - 正在拉取 Docker 镜像：mongo:4.0.10。请耐心等待；这可能需要一些时间，但只需要做一次。
tc.mongo:4.0.10 - 开始拉取镜像
tc.mongo:4.0.10 - 正在拉取镜像层：0 待处理，0 下载中，0 已解压，(0 字节/0 字节)
[ ... ]
```

正如预期的那样，使用了不同的环境，Docker 镜像不再在本地下载。不用说，如果我们运行命令 "docker ps"，我们将看不到任何容器在本地运行。

## 4. 调试 Testcontainers

Testcontainers 桌面通过以下功能，提供了流畅的调试体验：防止容器关闭、定义固定端口、定制配置以满足我们的需求，以及直接与容器交互。

### 4.1. 冻结容器关闭

我们可以使用桌面应用程序手动控制容器的生命周期。例如，我们可以使用 "冻结容器关闭" 选项，允许运行中的容器即使在启动它的测试终止后也能继续运行：

如果我们启用此功能并重新运行测试，我们将收到通知，确认容器已被冻结。

接下来，我们将确定我们本地机器上对应于 Docker 容器暴露端口的端口。MongoDB 通常在端口 27017 上运行。让我们打开一个终端并运行命令 "docker ps" 来查看这个映射：

正如我们所看到的，Docker 将容器的端口 27017 映射到我们机器的端口 64215。因此，我们可以使用这个端口通过我们喜欢的 MongoDB 客户端应用程序连接到数据库。

Studio3T 是 MongoDB 的图形用户界面，便于数据库管理、查询和可视化。让我们使用它来配置并测试到我们的 Mongo Testcontainer 的连接：

我们的测试在 "test" 数据库的 "characters" 集合中插入了一些记录。让我们运行一个简单的查询，列出集合中的所有记录：

正如我们所看到的，所有记录都在数据库中。

### 4.2. 定义固定端口

通常，Testcontainers 在随机端口上启动。然而，如果我们经常需要为了调试目的找到暴露的端口，我们可以定义固定端口。要做到这一点，我们首先需要导航到 "服务 > 打开配置位置"。这会打开一个文件夹，其中包含一些更受欢迎的 Testconatiners 模块的配置示例：

让我们坚持我们的用例并检查 "mongodb.toml.example" 文件。首先，我们将把它重命名为 "mongodb.toml"，去掉 ".example" 扩展名。

现在，让我们检查文件的内容。注释逐步解释了如何自定义此文件，以允许 Testcontainers 桌面正确代理服务的端口。让我们关注 "ports" 变量，我们可以使用它来定义本地端口和容器端口之间的映射：

```toml
# `local-port` 配置在您的机器上服务暴露的端口。
# `container-port` 表示要代理的容器内的端口。
ports = [
  {local-port = 27017, container-port = 27017},
]
```

结果，仅仅通过重命名文件并启用此配置，我们将能够使用固定端口 27017 连接到 MongoDB 数据库。

换句话说，**我们不再需要每次重新运行测试时手动检查端口映射，而是可以依赖 Mongo 的默认端口。**

### 4.3. 与容器交互

有时，即使连接到数据库也不够，例如当我们需要更详细的调试时。在这种情况下，**我们可以直接访问 Docker 容器本身。** 例如，我们可以打开一个附加到容器的终端并与它交互。

要做到这一点，我们导航到 "容器"，然后选择我们想要调试的容器。之后，我们将被提示选择三个操作之一："打开终端"、"日志尾部" 或 "终止"：

"打开终端" 操作允许我们访问附加到容器的终端。例如，我们可以使用这个终端启动 MongoDB shell 并在不需要在本地系统上安装任何 MongoDB 客户端应用程序的情况下查询数据。

让我们首先打开一个终端（容器 > mongo:4.0.10 > 打开终端）：

从这一点开始，说明取决于我们使用的容器和我们想要调试的用例。在我们的例子中，让我们执行以下命令：

- “mongo” - 打开 MongoDB shell 提示符
- “show dbs” - 列出服务器上存在的数据库
- “use test” - 切换到 “test” 数据库，这是我们应用程序创建的
- “db.getCollection("characters").find({"race":"hobbit"})” - 查询 “characters” 集合，并按 “race” 属性进行过滤

正如预期的那样，我们可以看到使用 MongoDB shell 执行的命令。最后一个查询，db.getCollection(...), 从 “test” 数据库的 “characters” 集合中检索记录列表。

## 5. Testcontainers 仪表板

**Testcontainers 桌面提供了一个用户友好的仪表板，总结了我们使用的 Testcontainers。** 我们可以通过从菜单中选择 “打开仪表板…” 选项来访问这个网页：

仪表板提供了 Testcontainers 和使用的镜像的概述，以及有用的资源链接和账户设置。在页面底部，我们可以看到最近的活动和用于执行的环境。

**这个协作工具聚合了桌面和 CI 环境的测试数据，提供了对开发和测试模式的洞察。** 仪表板上的小部件帮助回答有关测试一致性、发布影响、流行的容器镜像和过时依赖的问题。

## 6. 结论

在本文中，我们发现 Testcontainers 桌面应用程序的多样化功能，帮助我们运行和调试 Testcontainers。我们探索了冻结容器关闭、使用固定端口和访问附加到容器的终端。此外，我们还查看了 Testcontainers 仪表板，这是一个增强测试活动可见性和洞察力的工具。

如常，本文中使用的代码示例可在 GitHub 上获得。

OK