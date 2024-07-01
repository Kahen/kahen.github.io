---
date: 2023-08-05
category:
  - Maven
  - Build Optimization
tag:
  - Maven Build
  - Performance
head:
  - - meta
    - name: keywords
      content: Maven, Build Optimization, Performance
---
# 如何加速Maven构建

在本教程中，我们将学习如何加速我们的Maven构建。我们将介绍各种优化构建时间的技术，并评论它们的优点和缺点。

## 2. 一般建议

在进行任何优化尝试之前，让我们回顾一下，**使用正确的Maven阶段可以节省我们大量的时间**。为什么我们要运行完整的_install_并污染我们的本地仓库，而我们只需要编译代码呢？

另一方面，在多模块项目中，我们只能重新构建更改过的模块以及依赖它们的模块。例如，如果我们只在_module1_和_module2_中进行更改，我们可以运行：

```shell
$ mvn clean install -pl module1,module2 -am
```

## 3. 使用多线程

默认情况下，Maven构建在单线程中顺序运行。然而，现在所有的计算机都有多个核心。让我们利用这一点，使用_-T_选项，并**并行构建我们的模块**：

```shell
$ mvn clean install -T 1C
```

- _-T 1C_意味着Maven将使用每个可用核心的一个线程。
- _-T 4_将强制Maven使用四个线程。

最后但同样重要的是，Maven Reactor确保所有相互依赖的模块将按顺序运行。

## 4. 优化测试

测试是软件开发的重要组成部分。然而，减少运行它们的时间可以节省大量时间。

### 4.1. 并行运行测试

默认情况下，Surefire插件按顺序运行单元测试。然而，我们可以将其配置为并行运行。例如，**要并行运行所有测试套件并使用每个可用核心的一个线程，我们将运行**：

```shell
mvn clean install -Dparallel=all -DperCoreThreadCount=true
```

然而，如果我们的项目中没有很多单元测试，那么并行化的开销成本可能会抵消速度增益。

### 4.2. 跳过测试执行

有时我们不需要在本地环境中运行测试。**Maven _-DskipTests_ 选项在仍然编译测试文件夹的同时跳过测试执行**：

```shell
$ mvn clean install -DskipTests
```

在一个高度测试的项目中，当我们不需要它们时跳过测试可以节省时间！

### 4.3. 跳过测试编译

**此外，我们可以通过使用 _-Dmaven.test.skip=true_ 选项跳过测试执行，甚至不编译它们**：

```shell
$ mvn clean install -Dmaven.test.skip=true
```

这种方法进一步减少了总构建时间。

## 5. 优化JVM参数

**默认情况下，HotSpot JVM使用分层编译**：它使用客户端和服务器编译器来优化Java字节码。这种功能优化了服务器上的长寿命进程。然而，构建是一系列短命进程的连续。因此，让我们使用以下JVM参数：

- _-XX:-TieredCompilation_：JVM不会使用分层编译
- _-XX:TieredStopAtLevel=1_：JVM将只使用客户端编译器

我们可以通过创建一个包含以下内容的_.mvn/jvm.config_文件来让Maven使用这些选项：

```shell
-XX:-TieredCompilation -XX:TieredStopAtLevel=1
```

实际上，Maven使用缓存和增量构建技术来避免重新编译未更改的代码。因此，Maven需要编译的新代码越多，这种技术就越有效。

## 6. 离线模式

**Maven在构建过程中会多次往返服务器，例如，用于依赖解析和插件下载**。特别是，它每次都会检查新的快照更新。我们可以通过进入离线模式来避免这种情况：

```shell
$ mvn clean install -o
```

显然，当我们需要更新一些依赖时，我们不能使用离线模式。

## 7. 识别瓶颈

如果前面的技术不能帮助我们将构建时间恢复到可接受的水平，**我们可以通过分析器来排查我们的构建**。首先，让我们创建一个新的Maven项目。然后，我们将按照Maven分析器项目的GitHub上的说明进行安装。最后，我们需要在_pom.xml_中添加依赖：

```xml
``<build>``
    ``<plugins>``
        ```<plugin>```
            ```<groupId>```org.apache.maven.plugins```</groupId>```
            ```<artifactId>```maven-profiler-plugin```</artifactId>```
            ``<version>``1.7``</version>``
        ```</plugin>```
    ``</plugins>``
``</build>``
```

现在我们可以使用它来通过启动命令来更深入地了解我们的构建时间：

```shell
$ mvn clean install -Dprofile
```

构建完成后，我们可以在_.profiler_文件夹内找到HTML文本形式的报告。让我们来看一下：

## ![img](https://www.baeldung.com/wp-content/uploads/2023/08/maven_profiler_results_05_08-300x241.png)

正如我们所看到的，分析器列出了所有插件执行并记录了它们所花费的时间。第二部分列出了下载的工件。这些信息可以帮助我们识别在目标环境中运行时间很长但提供很少或没有价值的插件。

## 8. 使用Maven配置文件

一旦我们识别出瓶颈，我们就可以**使用Maven配置文件按需跳过它们并节省时间**。例如，执行集成测试通常非常长。此外，在本地环境中每次运行它们是没有用的。

让我们在_pom.xml_中添加_failsafe_插件配置：

```xml
```<plugin>```
    ```<groupId>```org.apache.maven.plugins```</groupId>```
    ```<artifactId>```maven-failsafe-plugin```</artifactId>```
    ``<version>``3.1.2``</version>``
    `<executions>`
        `<execution>`
            `<goals>`
                ``<goal>``integration-test``</goal>``
                ``<goal>``verify``</goal>``
            `</goals>`
        `</execution>`
    `</executions>`
```</plugin>```
```

现在我们可以添加一个用于跳过它们的配置文件：

```xml
`<profiles>`
    `<profile>`
        `<id>`skipITs`</id>`
        ``<build>``
            ``<plugins>``
                ```<plugin>```
                    ```<groupId>```org.apache.maven.plugins```</groupId>```
                    ```<artifactId>```maven-failsafe-plugin```</artifactId>```
                    `<configuration>`
                        `<skip>`true`</skip>`
                    `</configuration>`
                ```</plugin>```
            ``</plugins>``
        ``</build>``
    `</profile>`
`</profiles>`
```

借助配置覆盖，通过激活_skipITs_配置文件，集成测试现在被跳过了：

```shell
$ mvn clean install -PskipITs
```

## 9. 使用Maven守护进程

**Maven守护进程旨在提高Maven构建的速度**。守护进程是一个长寿命的后台进程，即使构建完成后也会保持活跃。它通过保持关键组件在内存中来减少构建开销，通过避免重复的启动和初始化过程来实现更快的项目构建。要安装它，我们可以按照项目GitHub页面上的说明进行。现在让我们使用它来启动构建：

```shell
$ mvnd clean install
```

如果守护进程需要启动，构建时间会略高。最后但同样重要的是，我们可以将前面的技术与Maven守护进程结合起来。例如，我们可以通过守护进程构建并跳过测试：

```shell
$ mvnd clean install -Dmaven.test.skip=true
```

然而，让我们指出，由于Maven守护进程是一个长寿命进程，像我们之前那样设置JVM参数可能会弊大于利。

## 10. 结论

在本文中，我们展示了各种技术来减少Maven的构建时间。简而言之，我们应该开始使用Maven守护进程。然后，让我们记住在不需要运行测试时跳过它们。我们还可以分析构建并使用Maven配置文件来排除耗时低价值的任务。如果这些还不够，我们可以尝试文章中描述的其他技术。

如往常一样，代码可以在GitHub上找到。