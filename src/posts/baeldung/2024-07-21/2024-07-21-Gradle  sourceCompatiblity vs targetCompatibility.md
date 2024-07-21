---
date: 2024-07-22
category:
  - 编程
  - Java
tag:
  - Gradle
  - Java版本
head:
  - - meta
    - name: keywords
      content: Gradle, Java版本, sourceCompatibility, targetCompatibility
---
# Gradle: sourceCompatibility 与 targetCompatibility | Baeldung

## 1. 概述

在本文中，我们将探讨 Java 配置中的 **_sourceCompatibility_** 和 **_targetCompatibility_** 之间的差异以及它们在 Gradle 中的使用方式。

你可以查看我们关于 Gradle 入门的文章来了解更多基础知识。

## 2. Java 中的版本处理

当我们使用 **_javac_** 编译 Java 程序时，我们可以提供版本处理的编译选项。有两种可用的选项：

- **--source** 其值与 Java 版本匹配，**直至我们用于编译的 JDK 版本**（例如，JDK8 的 1.8）。我们提供的版本值将**限制我们可以在源代码中使用的 Java 语言特性**。
- **--target** 类似，但控制生成的类文件的版本。这意味着我们提供的版本值将是**我们的程序能够运行的最低 Java 版本**。

例如：

```shell
javac HelloWorld.java -source 1.6 -target 1.8
```

这将生成一个类文件，**需要 Java 8 或更高版本才能运行**。此外，源代码**不能包含 lambda 表达式或 Java 6 中不可用的特性**。

## 3. 使用 Gradle 处理版本

Gradle 以及 Java 插件允许我们使用 **java** 任务的 **_sourceCompatibility_** 和 **_targetCompatibility_** 配置来设置 **_source_** 和 **_target_** 选项。同样，**我们使用与** **javac** **相同的值**。

让我们设置 **build.gradle** 文件：

```groovy
plugins {
    id 'java'
}

group 'com.baeldung'

java {
    sourceCompatibility = "1.6"
    targetCompatibility = "1.8"
}
```

## 4. HelloWorldApp 示例编译

我们可以创建一个 Hello World! 控制台应用程序，并通过使用上述脚本构建它来演示功能。

让我们创建一个非常简单的类：

```java
public class HelloWorldApp {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```

当我们使用 **gradle build** 命令构建它时，Gradle 将生成一个名为 **HelloWorldApp.class** 的类文件。

我们可以使用 Java 附带的 **javap** 命令行工具来检查这个类文件生成的字节码版本：

```shell
javap -verbose HelloWorldApp.class
```

这打印了很多信息，但在前几行中，我们可以看到：

```shell
public class com.baeldung.helloworld.HelloWorldApp
  minor version: 0
  major version: 52
  flags: ACC_PUBLIC, ACC_SUPER
```

**主版本** 字段的值为 52，这是 Java 8 类文件的版本号。这意味着我们的 **HelloWorldApp.class** **只能使用 Java 8 及以上版本运行**。

要测试 **sourceCompatibility** 配置，我们可以更改源代码并引入 Java 6 中不可用的特性。

让我们使用一个 lambda 表达式：

```java
public class HelloWorldApp {

    public static void main(String[] args) {
        Runnable helloLambda = () -> {
            System.out.println("Hello World!");
        };
        helloLambda.run();
    }
}
```

如果我们尝试使用 Gradle 构建我们的代码，我们将看到一个编译错误：

```shell
error: lambda expressions are not supported in -source 1.6
```

相当于 **sourceCompatibility** 的 **-source** 选项防止了我们的代码编译。基本上，它**防止我们无意中使用高版本特性**，如果我们不想引入它们——例如，我们可能希望我们的应用程序也能在 Java 6 运行时上运行。

## 5. 结论

在本文中，我们解释了如何使用 **-source** 和 **-target** 编译选项来处理我们的 Java 源代码和目标运行时的版本。此外，我们学习了这些选项如何映射到 Gradle 的 **sourceCompatibility** 和 **targetCompatibility** 配置以及 Java 插件，并在实践中演示了它们的功能。

如往常一样，本文的源代码可在 GitHub 上获取。翻译已完成，以下是文章的剩余部分：

---

## 5. 结论

在本文中，我们解释了如何使用 **-source** 和 **-target** 编译选项来处理我们的 Java 源代码和目标运行时的版本。此外，我们学习了这些选项如何映射到 Gradle 的 **sourceCompatibility** 和 **targetCompatibility** 配置以及 Java 插件，并在实践中演示了它们的功能。

如往常一样，本文的源代码可在 GitHub 上获取。

OK