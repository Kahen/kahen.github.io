---
date: 2024-06-30
category:
  - Java
  - GraalVM
tag:
  - Docker
  - Native Image
head:
  - - meta
    - name: keywords
      content: Java, GraalVM, Docker, Native Image, AOT, JIT
---
# 创建一个GraalVM Docker镜像

GraalVM使用其Ahead-Of-Time (AOT)编译器将Java应用程序编译成机器可执行文件。这些可执行文件直接在目标机器上执行，无需使用Just-In-Time (JIT)编译器。GraalVM生成的二进制文件更小，具有快速启动时间，并在不需要预热的情况下提供峰值性能。此外，这些可执行文件的内存占用和CPU使用率比在JVM上运行的应用程序要低。

Docker允许我们将软件组件打包成Docker镜像，并作为Docker容器运行。Docker容器包含了应用程序运行所需的一切，包括应用程序代码、运行时、系统工具和库。

在本教程中，我们将讨论如何为Java应用程序创建GraalVM原生镜像。然后，我们将讨论如何使用这个原生镜像作为Docker镜像，并将其作为Docker容器运行。

原生镜像是一种技术，它将Java代码提前编译成原生可执行文件。这个原生可执行文件只包含在运行时需要的代码。这包括应用程序类、标准库类、语言运行时，以及从JDK静态链接的原生代码。

原生镜像构建器（_native-image_）扫描应用程序类和其他元数据，以创建特定于操作系统和架构的二进制文件。_native-image_工具执行静态应用程序代码分析，以确定在应用程序运行时可以访问的类和方法。然后，它将所需的类、方法和资源编译成一个二进制可执行文件。

原生镜像可执行文件有几个好处：
- 作为一个原生镜像构建器，它只编译运行时需要的资源，因此可执行文件的大小很小。
- 原生可执行文件具有极快的启动时间，因为它们直接在目标机器上执行，无需JIT编译器。
- 由于它只打包所需的应用程序资源，因此攻击面较小。
- 适用于打包在轻量级容器镜像中，例如Docker镜像，以实现快速高效的部署。

在本节中，我们将为Spring Boot应用程序构建GraalVM原生镜像。首先，我们需要安装GraalVM并设置_JAVA_HOME_环境变量。其次，创建一个带有Spring Web和GraalVM原生支持依赖项的Spring Boot应用程序：

```xml
`<dependency>`
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-web``</artifactId>``
    ``<version>``3.1.5``</version>``
`</dependency>`
```

我们还需要添加以下插件以支持GraalVM原生：

```xml
`<build>`
    `<plugins>`
        `<plugin>`
            ``<groupId>``org.graalvm.buildtools``</groupId>``
            ``<artifactId>``native-maven-plugin``</artifactId>``
            ``<version>``0.9.27``</version>``
        `</plugin>`
    `</plugins>`
`</build>`
```

这个应用程序包含一个示例rest控制器：

```java
@RestController
class HelloController {

    @GetMapping
    public String hello() {
        return "Hello GraalVM";
    }
}
```

让我们使用Maven命令构建原生可执行文件：

```shell
$mvn -Pnative native:compile
```

_native-maven-plugin_构建GraalVM原生镜像。由于GraalVM原生镜像编译器执行静态代码分析，构建时间比常规Java应用程序编译要长。

以下是GraalVM编译的输出：

```shell
========================================================================================================
GraalVM Native Image: Generating 'springboot-graalvm-docker' (executable)...
========================================================================================================
[1/8] Initializing... (42.7s @ 0.15GB)
Java version: 17.0.8+9-LTS, vendor version: Oracle GraalVM 17.0.8+9.1
Graal compiler: optimization level: 2, target machine: x86-64-v3, PGO: ML-inferred
C compiler: gcc (linux, x86_64, 11.3.0)
Garbage collector: Serial GC (max heap size: 80% of RAM)

// 为清晰起见省略了部分内容

[2/8] Performing analysis... [******] (234.6s @ 1.39GB)
15,543 (90.25%) of 17,222 types reachable
25,854 (67.59%) of 38,251 fields reachable
84,701 (65.21%) of 129,883 methods reachable
4,906 types, 258 fields, and 4,984 methods registered for reflection
64 types, 70 fields, and 55 methods registered for JNI access
4 native libraries: dl, pthread, rt, z
[3/8] Building universe... (14.7s @ 2.03GB)
[4/8] Parsing methods... [*******] (55.6s @ 2.05GB)
[5/8] Inlining methods... [***] (4.9s @ 2.01GB)
[6/8] Compiling methods... [**********]
[6/8] Compiling methods... [*******************] (385.2s @ 3.02GB)
[7/8] Layouting methods... [****] (14.0s @ 2.00GB)
[8/8] Creating image... [*****] (30.7s @ 2.72GB)
48.81MB (58.93%) for code area: 48,318 compilation units
30.92MB (37.33%) for image heap: 398,288 objects and 175 resources
3.10MB ( 3.75%) for other data
82.83MB in total

// 为清晰起见省略了部分内容

Finished generating 'springboot-graalvm-docker' in 13m 7s.
```

在上述编译输出中，以下是几个关键点：

- 编译使用GraalVM Java编译器编译应用程序
- 编译器对类型、字段和方法进行可达性检查
- 接下来，它构建原生执行文件，并显示可执行文件的大小和编译所需的时间

构建成功后，我们可以在目标目录中找到原生可执行文件。这个可执行文件可以在命令行中执行。

在本节中，我们将为上一步生成的原生可执行文件开发Docker镜像。

让我们创建以下Dockerfile：

```dockerfile
FROM ubuntu:jammy
COPY target/springboot-graalvm-docker /springboot-graalvm-docker
CMD ["/springboot-graalvm-docker"]
```

接下来，我们使用以下命令构建Docker镜像：

```shell
$docker build -t springboot-graalvm-docker .
```

构建成功后，我们可以注意到_springboot-graalvm-docker_ Docker镜像可用：

```shell
$docker images | grep springboot-graalvm-docker
```

我们可以使用以下命令执行此镜像：

```shell
$docker run -p 8080:8080 springboot-graalvm-docker
```

上述命令启动容器，我们可以注意到Spring Boot启动日志：

```shell
// 省略了部分内容以清晰
*** INFO 1 --- [ main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 14 ms
*** INFO 1 --- [ main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
*** INFO 1 --- [ main] c.b.g.GraalvmDockerImageApplication      : Started GraalvmDockerImageApplication in 0.043 seconds (process running for 0.046)
```

**应用程序在43毫秒内启动**。我们可以通过访问以下命令来访问REST端点：

```shell
$curl localhost:8080
```

它显示以下输出：

```shell
Hello GraalVM
```

## 结论

在本文中，我们为GraalVM原生可执行文件构建了一个Docker镜像。

我们首先讨论了GraalVM原生镜像及其优势。它适用于需要首次启动和低内存占用的使用场景。接下来，我们使用GraalVM原生镜像编译器生成了Spring Boot应用程序的原生可执行文件。最后，我们开发了一个带有原生可执行文件的Docker镜像，并使用镜像启动了一个Docker容器。

该应用程序的源代码可在GitHub上找到。