---
date: 2023-09-26
category:
  - Spring Boot
  - Docker
tag:
  - Java
  - Liberica JDK
  - Alpaquita Linux
head:
  - - meta
    - name: keywords
      content: Spring Boot, Docker, Java, Liberica JDK, Alpaquita Linux
------
# 如何使用Spring Boot和Docker运行Java应用程序

在本教程中，我们将探索使用Docker容器运行使用Spring Boot创建的标准Java应用程序的方法。更具体地说，我们将使用基于Alpaquita Linux的Liberica JDK来创建将运行我们应用程序的Docker镜像。

Liberica JDK和Alpaquita Linux是BellSoft的产品提供的一部分。BellSoft是一个致力于使Java成为云原生应用程序首选语言的组织。通过他们的目标性产品，他们承诺提供更低的成本和更好的体验。

## 2. 一个简单的Spring Boot应用程序

让我们从创建一个简单的Java应用程序开始，然后我们将对其进行容器化处理。我们将使用Spring Boot来创建这个应用程序。**Spring Boot使得创建独立的、生产级别的基于Spring的应用程序变得容易**，只需最少的配置。

初始化Spring Boot应用程序的最简单方式是使用Spring Boot CLI。它允许我们通过命令行使用start.spring.io来创建一个新项目：

```shell
$ spring init --build=gradle --dependencies=web spring-bellsoft
```

在这里，我们添加了_web_作为依赖项，这使我们能够构建具有RESTful API的应用程序，并使用Apache Tomcat作为默认的嵌入式容器。我们在这里选择了Gradle作为构建工具。但是，它默认选择了Java作为语言和许多其他选项。

然后，**我们可以将生成的项目导入我们喜欢的IDE**，比如IntelliJ Idea，并开始开发应用程序。正如前面提到的，我们将保持这个非常简单。因此，我们将添加一个简单的REST API，它接受一个数字作为输入，并返回等于或小于该数字的斐波那契数列：

```java
@RestController
public class DemoController {

    @GetMapping("/api/v1/fibs")
    public List``<Integer>`` getFibonacciSeriesBelowGivenInteger(Integer input) {
        List``<Integer>`` result;
        if (input == 0)
            result = List.of(0);
        else {
            int n = 0; int m = 1;
            result = new ArrayList<>(Arrays.asList(n));
            while (m <= input) {
                result.add(m);
                m = n + m; n = m - n;
            }
        }
        return result;
    }
}
```

使用之前生成的Gradle包装器构建应用程序非常简单：

```shell
./gradlew clean build
```

**生成项目的默认打包格式是JAR**，这意味着上述命令成功后，最终的可执行JAR文件将被创建在输出目录“_./build/libs_”中。我们可以使用这个JAR文件启动应用程序：

```shell
java -jar ./build/libs/spring-bellsoft-0.0.1-SNAPSHOT.jar
```

然后，我们可以调用我们的API并查看它是否正常工作：

```shell
$ curl http://localhost:8080/api/v1/fibs?input=5
[0,1,1,2,3,5]
```

这结束了我们为教程其余部分创建简单应用程序的努力。我们将使用这个可部署的应用程序进行容器化。

## 3. 容器化我们的应用程序

容器是**一种标准软件单元，它将代码及其所有依赖项打包在一起**。它是一种操作系统虚拟化形式，提供了一种一致的方式来部署应用程序。如今，它已成为在云环境中运行任何应用程序的默认选择。

我们需要一个容器平台来将我们的简单应用程序作为容器运行。容器平台除了其他功能外，提供了一个容器引擎来创建和管理容器。Docker是最流行的平台，旨在构建、共享和运行容器应用程序。

容器引擎从容器镜像创建容器。**容器镜像是一个不可变的静态文件，包含了容器运行所需的一切**。然而，它共享了主机的操作系统内核。因此，它提供了完整的隔离，但仍然轻量级：

![img](https://www.baeldung.com/wp-content/uploads/2023/09/Docker-Container-Stack.jpg)

创建Docker镜像的一种方式是**将创建镜像的配方描述为Dockerfile**。然后，我们可以使用Docker守护进程从Dockerfile创建镜像。Docker的原始镜像格式现在已成为开放容器倡议（OCI）镜像规范。

将应用程序作为容器运行的一个关键优势是，它提供了跨多个环境的一致部署体验。例如，想象我们交付了一个使用Java 17构建的简单应用程序，但是在具有Java 11运行时的环境中部署。

为了避免这种意外，容器镜像**允许我们为应用程序打包所有关键依赖项**，如操作系统二进制/库和Java运行时。通过这样做，我们可以确保我们的应用程序将表现得一样，无论它被部署到哪个环境。

## 4. Liberica运行时容器

容器镜像由多层堆叠在一起组成。每一层都表示对文件系统的特定修改。通常，我们从最符合我们应用程序要求的基础镜像开始，并在其上构建其他层。

**BellSoft提供了几种高度优化的镜像，用于在基于云的环境中运行Java应用程序**。它们是使用Alpaquita Linux和Liberica JDK构建的。在使用这些镜像之前，让我们检查一下BellSoft组件的好处。

### 4.1. Alpaquita Linux的好处

Alpaquita Linux是**一个基于Alpine Linux的轻量级操作系统**。它是为Java量身定制的，并针对云原生应用程序的部署进行了优化。它产生的基础镜像大小为3.22 MB，运行时需要的资源很少。

Alpaquita Linux有两个版本，一个基于优化的musl libc，另一个基于glibc。在这里，libc指的是ISO C标准中指定的C编程语言的标准库。它为多项任务提供宏、类型定义和函数。

除了针对Java应用程序进行优化外，Alpaquita Linux还**为我们的部署提供了多种安全功能**。这些包括网络功能、自定义构建选项和进程隔离。它还包括像内核锁定和内核模块签名这样的内核加固。

此外，Alpaquita Linux针对部署进行了优化，因为它使用内核模块压缩来减小包的大小。它提供了一个可靠和快速的堆栈来运行应用程序，具有像内核优化和内存管理这样的性能特性。

Alpaquita Linux**只打包了少量的操作系统组件**。然而，我们可以从Alpaquita APK仓库安装额外的模块和附加包。最重要的是，Alpaquita Linux的LTS版本有四年的支持生命周期。

### 4.2. Liberica JDK的好处

Liberica JDK是**一个开源Java运行时，用于现代Java部署**。它来自BellSoft，是OpenJDK的关键贡献者，并承诺为Java应用程序提供单一运行时，用于云、服务器和桌面使用。它也推荐用于基于Spring的Java应用程序。

Liberica JDK支持多种架构，如x86 64/32位、ARM、PowerPC和SPARC。它还支持多个操作系统，如Windows、macOS和大多数Linux发行版。此外，它支持几乎所有当前使用的Java版本。

Liberica JDK的一个关键优势是它非常轻量级。基于Alpaquita Linux的Java 17的Liberica运行时容器小于70 MB。它**承诺在减少流量、存储、内存消耗和总成本的同时提供更好的性能**。

它还具有多种工具，用于处理JDK运行时。有完整的工具访问权限，用于监控和更新。此外，用户还可以访问Liberica管理控制台（LAC），这是一个用于运行时监控、许可证控制和安全更新的企业工具。

Liberica JDK已经通过了Java SE规范的TCK验证，并在每个版本发布之前经过了彻底的测试。此外，BellSoft**保证至少八年的Liberica JDK生命周期**，包括错误修复、安全补丁和其他必要的改进。

## 5. 创建容器镜像

现在，我们已经准备好使用Alpaquita Linux和Liberica JDK来容器化我们的简单应用程序。第一步是选择一个带有这些依赖项的基础镜像。我们总是可以创建我们自己的基础镜像，但幸运的是，BellSoft在Docker Hub上维护了几个可供选择的镜像。

### 5.1. 选择Liberica运行时容器

这些是带有不同选项的Alpaquita Linux镜像，可以选择Liberica JDK Lite和Liberica JRE。我们通常可以从标签中识别这一点，其中可能包含以下之一：

- jdk：带有Liberica JDK Lite版本的Alpaquita Linux镜像
- jdk-all：包含Liberica JDK，可以使用jlink工具创建自定义运行时
- jre：仅包含运行Java应用程序所需的Liberica JRE

在这里，**镜像的标签除了包含它所包含的JDK版本信息之外，还揭示了镜像的其他信息**。让我们看看BellSoft使用的镜像标签的约定：

```shell
[JDK type]-Java version-[slim]-[OS release]-[libc type]-[date]
```

在这里，标签的不同部分告诉了镜像的特定方面，并帮助我们从许多可用的镜像中选择正确的一个：

- JDK类型：JDK的类型（如前所述的JDK、jdk-all和jre）
- Java版本：JDK符合的Java版本
- slim：表示镜像是否是精简版
- OS版本：操作系统version: 目前它只是_stream_版本
- libc类型：标准C库的类型（如前所述的glibc或musl）
- date: 镜像的发布日期

### 5.2. 容器化我们的应用程序

现在，我们已经拥有了镜像标签中的所有信息来选择正确的一个。例如，如果我们想要Java 17和glibc的应用程序，我们必须选择标签“_jdk-17-glibc_”。

一旦我们选择了正确的基础镜像标签，下一步是创建一个Dockerfile来定义我们如何创建应用程序的容器镜像：

```Dockerfile
FROM bellsoft/liberica-runtime-container:jdk-17-glibc
VOLUME /tmp
ARG JAR_FILE=build/libs/java-bellsoft-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

这个相当简单的Dockerfile说明我们希望**从提到的Liberica运行时容器开始，并复制我们的应用程序胖JAR**。我们还定义了入口点，指令是在容器实例化后运行我们的应用程序。

我们应该将这个Dockerfile放在应用程序代码库目录的根目录下。然后，我们可以使用以下命令在我们的本地仓库中创建容器镜像：

```shell
docker buildx build -t spring-bellsoft .
```

这将默认从注册表，Docker Hub中拉取基础镜像，并为我们的应用程序创建容器镜像。然后，我们可以将这个镜像作为容器运行：

```shell
docker run --name fibonacci -d -p 8080:8080 spring-bellsoft
```

请注意，我们已经将本地端口8080与容器端口8080映射。因此，我们可以像教程前面那样访问我们的应用程序：

```shell
$ curl http://localhost:8080/api/v1/fibs?input=5
[0,1,1,2,3,5]
```

这结束了我们使用BellSoft发布的Liberica运行时容器容器化我们在教程中早些时候创建的简单应用程序的努力。当然，**尝试更复杂的应用程序和其他Liberica运行时容器的变体**将会很有趣。

## 6. 结论

在本教程中，我们经历了为基于Spring Boot的简单Java应用程序创建容器的基础知识。我们探索了选择BellSoft Liberica运行时容器的选项。在这个过程中，我们创建了一个简单的应用程序并将其容器化。

这帮助我们理解了Alpaquita Linux和Liberica JDK的好处，它们是Liberica运行时容器的组成部分。这些是BellSoft的一些核心产品，致力于优化基于云环境的Java应用程序。

![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)
![img](https://www.baeldung.com/wp-content/uploads/2023/09/Docker-Container-Stack.jpg)

OK