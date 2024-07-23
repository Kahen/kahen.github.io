---
date: 2024-07-23
category:
  - Spring Boot
  - Performance
tag:
  - Spring Boot
  - Startup Time
  - JVM
  - GraalVM
head:
  - - meta
    - name: keywords
      content: Spring Boot, Startup Time, Performance Optimization
------
# 提高Spring Boot启动时间

## 1. 引言

在本教程中，我们将介绍不同的配置和设置，这些可以帮助减少Spring Boot的启动时间。首先，我们将讨论特定于Spring的配置。其次，我们将涵盖Java虚拟机选项。最后，我们将介绍如何利用GraalVM和原生镜像编译进一步减少启动时间。

## 2. Spring调整

在我们开始之前，让我们设置一个测试应用程序。我们将使用Spring Boot版本2.5.4，并将Spring Web、Spring Actuator和Spring Security作为依赖项。在_pom.xml_中，我们将添加_spring-boot-maven-plugin_，并配置打包我们的应用程序为jar文件：

```xml
`<plugin>`
    `````<groupId>`````org.springframework.boot`````</groupId>`````
    `````<artifactId>`````spring-boot-maven-plugin`````</artifactId>`````
    ``<version>``${spring-boot.version}``</version>``
    `<configuration>`
        `<finalName>`springStartupApp`</finalName>`
        `<mainClass>`com.baeldung.springStart.SpringStartApplication`</mainClass>`
    `</configuration>`
    `<executions>`
        `<execution>`
            `<goals>`
                `<goal>`repackage`</goal>`
            `</goals>`
        `</execution>`
    `</executions>`
`</plugin>`
```

我们使用标准的_java -jar_命令运行我们的jar文件，并监控我们应用程序的启动时间：

```shell
c.b.springStart.SpringStartApplication   : Started SpringStartApplication in 3.403 seconds (JVM running for 3.961)
```

正如我们所看到的，我们的应用程序大约在3.4秒内启动。我们将使用这个时间作为未来调整的参考。

### 2.1. 延迟初始化

Spring框架支持延迟初始化。**延迟初始化意味着Spring不会在启动时创建所有bean。此外，Spring将在需要该bean之前不注入任何依赖项。** 自Spring Boot版本2.2起，可以通过_application.properties_启用延迟初始化：

```properties
spring.main.lazy-initialization=true
```

在构建新的jar文件并像前一个示例中那样启动后，新的启动时间略有改善：

```shell
c.b.springStart.SpringStartApplication   : Started SpringStartApplication in 2.95 seconds (JVM running for 3.497)
```

**根据我们的代码库大小，延迟初始化可以显著减少启动时间。** 减少的幅度取决于我们应用程序的依赖图。

延迟初始化在开发期间也有益处，同时使用DevTools热重启功能。延迟初始化的增加重启次数将使JVM能够更好地优化代码。

然而，延迟初始化有一些缺点。最显著的缺点是应用程序将更慢地服务第一个请求。因为Spring需要时间来初始化所需的bean，另一个缺点是我们可能会错过一些启动时的错误。这可能导致在运行时出现_ClassNotFoundException_。

### 2.2. 排除不必要的自动配置

Spring Boot总是优先考虑约定而不是配置。**Spring可能会初始化我们的应用程序不需要的bean。** 我们可以使用启动日志检查所有自动配置的bean。在_application.properties_中将日志级别设置为DEBUG：：

```properties
logging.level.org.springframework.boot.autoconfigure=DEBUG
```

在日志中，我们将看到专门用于自动配置的新行，以：

```shell
============================
CONDITIONS EVALUATION REPORT
============================
```

开始。

使用此报告，我们可以排除应用程序配置的部分。要排除配置的一部分，我们使用_@EnableAutoConfiguration_注解：

```java
@EnableAutoConfiguration(exclude = {JacksonAutoConfiguration.class, JvmMetricsAutoConfiguration.class,
  LogbackMetricsAutoConfiguration.class, MetricsAutoConfiguration.class})
```

如果我们排除了我们不使用的Jackson JSON库和一些度量配置，我们可以节省一些启动时间：

```shell
c.b.springStart.SpringStartApplication   : Started SpringStartApplication in 3.183 seconds (JVM running for 3.732)
```

### 2.3. 其他小调整

Spring Boot带有嵌入式servlet容器。默认情况下，我们得到Tomcat。**虽然Tomcat在大多数情况下足够好，但其他servlet容器可能更具有性能优势**。在测试中，JBoss的Undertow比Tomcat或Jetty表现更好。它需要更少的内存并且具有更好的平均响应时间。要切换到Undertow，我们需要更改_pom.xml_：

```xml
```<dependency>```
    `````<groupId>`````org.springframework.boot`````</groupId>`````
    `````<artifactId>`````spring-boot-starter-web`````</artifactId>`````
    `<exclusions>`
        `<exclusion>`
            `````<groupId>`````org.springframework.boot`````</groupId>`````
            `````<artifactId>`````spring-boot-starter-tomcat`````</artifactId>`````
        `</exclusion>`
    `</exclusions>`
```</dependency>```
```<dependency>```
    `````<groupId>`````org.springframework.boot`````</groupId>`````
    `````<artifactId>`````spring-boot-starter-undertow`````</artifactId>`````
```</dependency>```
```

接下来的小改进可以在类路径扫描中进行。Spring类路径扫描是一个快速操作。我们可以通过在大型代码库中创建静态索引来提高启动时间。**我们需要添加_spring-context-indexer_依赖项来生成索引。** Spring不需要任何额外的配置。在编译时，Spring将在_META-INF\spring.components_中创建一个额外的文件。Spring将在启动期间自动使用它：

```xml
```<dependency>```
    `````<groupId>`````org.springframework`````</groupId>`````
    `````<artifactId>`````spring-context-indexer`````</artifactId>`````
    ``<version>``${spring.version}``</version>``
    `<optional>`true`</optional>`
```</dependency>```
```

由于我们只有一个Spring组件，这个调整在我们的测试中没有产生显著的结果。

值得注意的是，_spring-context-indexer_自Spring 6.1起已被弃用。有关更多信息，可以在这里找到。

**接下来，有几个有效的地方可以放置_application.properties_（或.yml）文件**。最常见的是在类路径根目录或与jar文件相同的文件夹中。我们可以通过使用_spring.config.location_参数设置显式路径来避免搜索多个位置，并在搜索上节省几毫秒：

```shell
java -jar .\target\springStartupApp.jar --spring.config.location=classpath:/application.properties
```

最后，Spring Boot提供了一些MBeans，使用JMX监控我们的应用程序。**完全关闭JMX并避免创建这些bean的成本：**

```properties
spring.jmx.enabled=false
```

## 3. JVM调整

### 3.1. _V_ 验证标志

此标志设置字节码验证器模式。字节码验证提供类是否正确格式化并在JVM规范约束内。我们在启动期间将此标志设置在JVM上。

此标志有几个选项：

- **_-Xverify_ 是默认值，启用所有非引导程序类验证。**
- **_-Xverify:all_ 启用所有类的验证。** 此设置将对启动产生显著的负面影响。
- **_-Xverify:none_（或_-Xnoverify_）。** 此选项完全禁用验证器，并将显著减少启动时间。

我们可以在启动时传递此标志：

```shell
java -jar -noverify .\target\springStartupApp.jar
```

我们将从JVM收到一个警告，称此选项已被弃用。此外，启动时间将减少：

```shell
c.b.springStart.SpringStartApplication   : Started SpringStartApplication in 3.193 seconds (JVM running for 3.686)
```

此标志带来了显著的权衡。我们的应用程序在运行时可能会出错，而我们可能更早地捕获到这些错误。这是此选项在Java 13中被标记为弃用的原因之一。因此，它将在未来版本中被移除。

### 3.2. _TieredCompilation_ 标志

Java 7引入了分层编译。HotSpot编译器将使用不同级别的编译对代码进行编译。

我们知道，Java代码首先被解释为字节码。接下来，字节码被编译成机器码。这种转换发生在方法级别。C1编译器在一定数量的调用后编译一个方法。经过更多的运行，C2编译器将其编译，进一步提高性能。

**使用_-XX:-TieredCompilation_标志，我们可以禁用中间编译层。** 这意味着我们的方法将被解释或使用C2编译器进行编译，以实现最大优化。这不会减少启动速度。我们需要禁用C2编译。我们可以使用_-XX:TieredStopAtLevel=1_选项。结合_noverify_标志，这可以减少启动时间。不幸的是，这将减慢JIT编译器在后期阶段的速度。

单独使用TieredCompilation标志带来了显著的改进：

```shell
c.b.springStart.SpringStartApplication   : Started SpringStartApplication in 2.754 seconds (JVM running for 3.172)
```

为了额外的提升，从本节中同时运行两个标志可以进一步减少启动时间：

```shell
java -jar -XX:TieredStopAtLevel=1 -noverify .\target\springStartupApp.jar
c.b.springStart.SpringStartApplication : Started SpringStartApplication in 2.537 seconds (JVM running for 2.912)
```

## 4. Spring Native

原生镜像是使用提前编译器编译的Javacode compiled using an ahead-of-time compiler and packed into an executable file. It doesn’t require Java to run. The resulting program is faster and less memory-dependent since there is no JVM overhead. The GraalVM project introduced native images and required build tools.

**Spring Native is an experimental module that supports the native compilation of Spring applications using the GraalVM native-image compiler.** The ahead-of-time compiler executes several tasks during build time that reduce startup time (static analysis, removal of unused code, creating fixed classpath, etc.). There are still some limitations to native images:

- It doesn’t support all Java features
- Reflection requires a special configuration
- Lazy class loading is unavailable
- Windows compatibility is an issue.

To compile an application to a native image, we need to add the _spring-aot_ and _spring-aot-maven-plugin_ dependency to _pom.xml._ Maven will create the native image on the _package_ command in the _target_ folder.

## 5. Conclusion

In this article, we explored different ways to improve the startup time of Spring Boot applications. First, we covered various Spring related features that can help reduce startup time. Next, we showed JVM-specific options. Last, we introduced Spring Native and native image creation. As always, the code used in this article can be found over on GitHub.
OK