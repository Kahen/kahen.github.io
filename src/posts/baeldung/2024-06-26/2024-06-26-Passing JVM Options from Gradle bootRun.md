---
date: 2024-06-27
category:
  - Java
  - Gradle
tag:
  - JVM
  - Spring Boot
  - 配置
head:
  - - meta
    - name: keywords
      content: JVM, Spring Boot, Gradle, 配置, Java
---
# 通过Gradle bootRun传递JVM选项

Gradle是一个多用途的自动化构建工具，用于开发、编译和测试软件包。它支持多种语言，但我们主要用它来处理基于Java的语言，如Kotlin、Groovy和Scala。

在使用Java时，我们可能需要自定义Java应用程序中的JVM参数。由于我们使用Gradle来构建Java应用程序，我们也可以通过调整Gradle配置来自定义应用程序的JVM参数。

在本教程中，我们将学习如何从Gradle的_bootRun_向Spring Boot Java应用程序传递JVM参数。

### 2. 理解_bootRun_

**Gradle的_bootRun_是一个Gradle特定的任务，它随默认的Spring Boot Gradle插件一起提供。它帮助我们直接从Gradle运行Spring Boot应用程序。** 执行_bootRun_命令会在开发环境中启动我们的应用程序，这对于测试和开发目的非常有用。主要来说，它用于迭代开发，因为它不需要单独的构建或部署。

**简而言之，它提供了一种简化的方法，在开发环境中构建应用程序，并执行与Spring Boot开发相关的任务。**

### 3. 在_build.gradle_文件中使用_jvmArgs_

Gradle提供了一种直接在_bootRun_命令中添加JVM参数的方法，即使用_build.gradle_文件。例如，让我们看看如何使用_bootRun_命令向Spring Boot应用程序添加JVM参数：

```
bootRun {
    jvmArgs([
        "-Xms256m",
        "-Xmx512m"
    ])
}
```

如我们所见，使用_jvmArgs_选项修改了springboot应用程序的_max/min_堆。现在，让我们使用_ps_命令来验证对Spring Boot应用程序的JVM更改：

```
$ ps -ef | grep java | grep spring
502  7870  7254   0  8:07PM ??  0:03.89 /Library/Java/JavaVirtualMachines/jdk-14.0.2.jdk/Contents/Home/bin/java
-XX:TieredStopAtLevel=1 -Xms256m -Xmx512m -Dfile.encoding=UTF-8 -Duser.country=IN
-Duser.language=en com.example.demo.DemoApplication
```

在上面的_bootRun_任务中，我们使用_jvmArgs_选项更改了Spring Boot应用程序的_max_和_min_堆。**这样，JVM参数将动态附加到Spring Boot应用程序。此外，我们还可以使用_-D_选项向_bootRun_添加自定义属性。** 为了演示，让我们看看_bootRun_任务：

```
bootRun {
    jvmArgs(['-Dbaeldung=test', '-Xmx512m'])
}
```

这样，我们可以同时传递JVM选项和自定义属性。为了说明，让我们验证一下_jvm_参数中的自定义值：

```
$ ps -ef | grep java | grep spring
502  8423  7254   0  8:16PM ??  0:00.62 /Library/Java/JavaVirtualMachines/jdk-14.0.2.jdk/Contents/Home/bin/java
-XX:TieredStopAtLevel=1  -Dbaeldung=test -Xms256m -Xmx512m -Dfile.encoding=UTF-8 -Duser.country=IN
-Duser.language=en com.example.demo.DemoApplication
```

此外，我们还可以将这些属性文件放入_gradle.properties_，然后在_build.gradle_中使用它们：

```
baeldung=test
max.heap.size=512m
```

现在，我们可以在_bootRun_命令中使用它们：

```
bootRun {
    jvmArgs([
        "-Dbaeldung=${project.findProperty('baeldung')}",
        "-Xmx${project.findProperty('max.heap.size')}"
    ])
}
```

使用上述方法，我们可以将配置文件与主_build.gradle_文件分开。

### 4. 使用命令行参数

我们还可以直接在_./gradlew bootRun_命令中提供JVM选项。在Gradle中，可以使用_-D_标志指定系统属性，使用_-X_指定JVM选项：

```
$ ./gradlew bootRun --args='--spring-boot.run.jvmArguments="-Xmx512m" --baeldung=test'
```

**我们可以使用此命令在运行时动态提供JVM选项，而无需修改Gradle构建文件。** 为了演示，让我们使用_ps_命令验证JVM参数：

```
$ ps -ef | grep java | grep spring
 502 58504 90399   0  7:21AM ?? 0:02.95 /Library/Java/JavaVirtualMachines/jdk-14.0.2.jdk/Contents/Home/bin/java
 -XX:TieredStopAtLevel=1 -Xms256m -Xmx512m -Dfile.encoding=UTF-8 -Duser.country=IN -Duser.language=en
 com.example.demo.DemoApplication --spring-boot.run.jvmArguments=-Xmx512m --baeldung=test
```

上述命令直接使用_./gradlew bootRun_命令设置了_jvm_参数。

### 5. 结论

在本文中，我们学习了将JVM选项传递给_bootRun_命令的不同方法。

首先，我们了解了_bootRun_的重要性和基本用法。然后，我们探索了使用命令行参数和_build.gradle_文件向_bootRun_提供JVM选项的方法。