---
date: 2024-07-03
category:
  - Java
  - Gradle
tag:
  - JVM
  - Toolchains
head:
  - - meta
    - name: keywords
      content: Java, Gradle, Toolchains, JVM, 编译, 构建
---
# Gradle工具链支持JVM项目

在本教程中，我们将探索Gradle对JVM项目的工具链支持。

我们首先理解这一特性背后的动机。然后，我们将定义它，并用实际的例子来尝试它。

在讨论什么是工具链之前，我们需要谈论它存在的原因。假设我们要写一个Java项目。我们的Java项目可能包含一些测试。因此，我们至少想要编译我们的代码并运行测试。我们添加了内置的Gradle Java插件，并指定了我们想要的字节码版本：

```groovy
plugins {
    id 'java'
}

java {
    sourceCompatibility = JavaVersion.VERSION_1_8
    targetCompatibility = JavaVersion.VERSION_1_8
}

```

此外，如果需要，我们还可以告诉Gradle将我们的测试类编译成不同的字节码版本：

```groovy
tasks {
    compileTestJava {
        sourceCompatibility = JavaVersion.VERSION_1_7
        targetCompatibility = JavaVersion.VERSION_1_7
    }
}
```

到目前为止，一切都很好。**唯一的细微差别是，Gradle编译我们的源代码/测试类时，使用的是它自己的JDK，即它运行时相同的JDK**。我们可以通过指定要使用的确切可执行文件来解决这个问题：

```groovy
compileTestJava.getOptions().setFork(true)
compileTestJava.getOptions().getForkOptions().setExecutable('/home/mpolivaha/.jdks/corretto-17.0.4.1/bin/javac')

compileJava.getOptions().setFork(true)
compileJava.getOptions().getForkOptions().setExecutable('/home/mpolivaha/.jdks/corretto-17.0.4.1/bin/javac')
```

然而，**如果我们在构建过程中使用不同的JDKs**，就会出现问题。

例如，假设我们在发布之前必须在我们的客户的JDKs上测试我们的Java应用程序。这些JDKs可能来自不同的供应商，尽管符合规范，但在细节上可能有所不同。我们理论上可以不使用工具链来解决这个问题，但这将是一个更复杂的解决方案。工具链使配置构建变得更容易，这些构建需要不同目的的不同JDKs。

从6.7版本开始，Gradle引入了JVM工具链特性。工具链的概念并不新鲜，它在Maven中已经存在了一段时间。一般来说，**工具链是构建、测试和运行软件所需的一套工具和二进制文件**。因此，在Java中，我们可以将JDK视为Java工具链，因为它允许编译、测试和运行Java程序。

我们可以在项目级别定义工具链，例如，在这种情况下，它看起来像这样：

```groovy
java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(17)
        vendor = JvmVendorSpec.AMAZON
        implementation = JvmImplementation.VENDOR_SPECIFIC
    }
}
```

这样，我们可以指定所需的Java版本、JDK供应商以及这个供应商的特定JVM实现。为了使工具链规范正确，我们至少必须设置版本。

当Gradle处理工具链时，它的操作很简单。首先，它会尝试在本地找到请求的工具链；这里有一个特定的算法。如果Gradle在本地找不到所需的工具链，它会尝试远程查找并下载它。如果Gradle无法远程找到所需的工具链，构建将失败。

还值得一提的是，有时我们可能想要禁用自动配置。我们可以通过向Gradle可执行文件传递`-Porg.gradle.java.installations.auto-download=false`来实现这一点。在这种情况下，如果找不到本地工具链，Gradle构建将失败。

工具链的真正威力在于能够按任务方式指定JDK安装：

```groovy
tasks.named('compileJava').get().configure {
    javaCompiler = javaToolchains.compilerFor {
        languageVersion = JavaLanguageVersion.of(17)
        vendor = JvmVendorSpec.AMAZON
        implementation = JvmImplementation.VENDOR_SPECIFIC
    }
}

tasks.register("testOnAmazonJdk", Test.class, {
    javaLauncher = javaToolchains.launcherFor {
        languageVersion = JavaLanguageVersion.of(17)
        vendor = JvmVendorSpec.AMAZON
    }
})

tasks.named("testClasses").get().finalizedBy("testOnAmazonJdk")
```

在上面的例子中，我们配置了compileJava任务在Oracle JDK 15上运行。我们还创建了testOnAmazonJdk任务，它将在testClasses任务之后立即运行。注意，这个新任务也在一个单独的JDK上执行。

最后，Gradle允许我们使用以下命令查看当前项目可用的本地工具链安装：

```groovy
gradle javaToolchains
```

首先，Gradle将在当前位置搜索构建文件。然后，它将根据构建文件中指定的位置/规则列出找到的工具链。

## 6. 结论

在这个快速教程中，我们回顾了Gradle工具链特性。如果适用，这个特性简化了在构建过程中使用不同的JDKs的工作。它从Gradle 6.7开始可用，并且我们可以在任务级别应用它，这使得这个特性非常有价值。

如常，本文的源代码可以在GitHub上找到。