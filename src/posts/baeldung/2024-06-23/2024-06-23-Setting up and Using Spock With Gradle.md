---
date: 2024-06-24
category:
  - Java
  - Spock
tag:
  - Spock
  - Gradle
head:
  - - meta
    - name: keywords
      content: Spock, Gradle, Java, 测试框架, 构建工具
---

# Spock 与 Gradle 的设置和使用

## 1. 概述

Spock 框架是用于 Java 和 Groovy 应用程序的测试和规范框架。Gradle 是一个流行的构建工具，是 Maven 的替代品。

在本教程中，我们将展示如何使用 Gradle 设置项目并添加 Spock 测试依赖项。我们还将快速查看并逐步完全集成 Spock 与 Spring，同时仍使用 Gradle 构建过程。

我们需要创建一个 Gradle 项目并添加 Spock 依赖项。

### 2.1. 设置 Gradle 项目

首先，让我们在系统上安装 Gradle。然后可以使用 _gradle init_ 命令初始化 Gradle 项目。创建应用程序或库的不同选项，例如使用 Java 或 Kotlin。

无论如何，Gradle 项目总是会从以下配置中获取：

- **_build.gradle_**。它包含有关构建过程的信息，例如 Java 版本或用于实现或测试的库。我们将将其称为构建文件。
- **_settings.gradle_**。它添加项目范围的信息，例如项目名称或子模块结构。我们将将其称为设置文件。

Gradle 使用 JVM 插件来实现项目的编译、测试和打包功能。

如果我们选择 Java，我们将通过使用 _‘java‘_ 插件来保持简单，因为这将是最终扩展的基础。

让我们看看一个 Java 17 项目的简单构建骨架：

```groovy
plugins {
    id 'java'
}

repositories {
    mavenCentral()
}

dependencies {
    // 测试依赖
    testImplementation 'org.junit.jupiter:junit-jupiter:5.9.2'
    testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
}

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(17)
    }
}

test {
    useJUnitPlatform()

    testLogging {
        events "started", "passed", "skipped", "failed"
    }
}
```

这个文件是核心组件，定义了构建项目所需的任务。

我们添加了 JUnit5 测试依赖项：

```groovy
testImplementation 'org.junit.jupiter:junit-jupiter:5.9.2'
testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
```

我们需要在测试任务中添加 _useJUnitPlatform()_ 规范来运行测试。我们还为测试日志添加了一些属性，以便在任务运行时有输出：

```groovy
test {
    useJUnitPlatform()
    testLogging {
        events "started", "passed", "skipped", "failed"
    }
}
```

我们还看到我们的项目如何使用 _mavenCentral()_ 仓库下载依赖项：

```groovy
repositories {
    mavenCentral()
}
```

值得注意的是，一些人可能会发现，与基于 XML 的 _pom.xml_ 构建配置的 Maven 项目相比，配置更具可读性。

最后，让我们也看看设置文件：

```groovy
rootProject.name = 'spring-boot-testing-spock'
```

这是非常简单的，只配置了项目名称。然而，它可以包含相关信息，例如子模块包含或插件定义。

我们可以查看 Gradle DSL 参考以获取有关 _build_ 或 _settings_ 脚本的更多信息。

### 2.2. 添加 Spock 依赖项

将 Spock 添加到我们的 Gradle 项目中需要两个简单的步骤：

- 添加 _‘groovy’_ 插件
- 将 Spock 添加到测试依赖项

让我们看看构建文件：

```groovy
plugins {
    id 'java'
    id 'groovy'
}

repositories {
    mavenCentral()
}

dependencies {
    // Spock 测试依赖
    testImplementation 'org.spockframework:spock-core:2.4-M1-groovy-4.0'
    // JUnit 依赖
    testImplementation 'org.junit.jupiter:junit-jupiter:5.9.2'
    testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
}

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(17)
    }
}

test {
    useJUnitPlatform()
    testLogging {
        events "started", "passed", "skipped", "failed"
    }
}
```

**我们必须通过添加 _org.spockframework:spock-core_ 测试依赖项来更新我们的依赖项：**

```groovy
testImplementation 'org.spockframework:spock-core:2.4-M1-groovy-4.0'
```

值得注意的是，我们不需要像 Maven 项目那样配置 GMavenPlus 插件。

### 2.3. 运行测试

我们可以使用 Spock 进行不同类型的测试。让我们看看一个简单的测试用例：

```groovy
class SpockTest extends Specification {
    def "one plus one should equal two"() {
        expect:
        1 + 1 == 2
    }
}
```

每个测试都必须扩展 _Specification_ 类。此外，测试被定义为使用 Groovy _def_ 语法的函数。

如果我们习惯于使用 Java 编程，**我们需要记住 Spock 测试默认情况下在不同的包中，并且有另一个类扩展**。如果我们没有特别指定，必须将测试放在 _test/groovy_ 文件夹中。此外，类将具有 _.groovy_ 扩展名，例如 _SpockTest.groovy_。

要运行测试，我们需要使用 IDE 或命令行执行测试任务：

```shell
gradle test
```

让我们检查一些示例输出：

```
Starting a Gradle Daemon (subsequent builds will be faster)

> Task :test

SpockTest > one plus one should equal two STARTED

SpockTest > one plus one should equal two PASSED

BUILD SUCCESSFUL in 15s
7 actionable tasks: 7 executed
```

Gradle 使用缓存系统，并且只有在上次执行以来发生变化的测试才会重新运行。

## 3. 使用 Spock、Gradle 和 Spring

我们可能想要将 Spock 添加到 Spring 项目中。Spock 有一个特定的模块用于此。

让我们看看 Spock 与基本 Spring 配置的使用。稍后，我们还将看看 Spring Boot 设置。从现在开始，我们将省略构建文件中的 _java_ 和 _test_ 部分，以简洁起见，因为它们不会改变。

### 3.1. Spock 和 Spring

假设我们有一个 Spring 项目，并希望切换或采用 Spock 进行测试。

构建文件中的依赖结构现在变得更加复杂，让我们正确地注释每个部分：

```groovy
plugins {
    id 'java'
    id 'groovy'
}

repositories {
    mavenCentral()
}

dependencies {
    // Spring 实现依赖
    implementation 'org.springframework:spring-web:6.1.0'

    // Spring 测试依赖
    testImplementation 'org.springframework:spring-test:6.1.0'

    // Spring Spock 测试依赖
    testImplementation 'org.spockframework:spock-spring:2.4-M1-groovy-4.0'

    // Spock 核心测试依赖
    testImplementation 'org.spockframework:spock-core:2.4-M1-groovy-4.0'

    // JUnit 测试依赖
    testImplementation 'org.junit.jupiter:junit-jupiter:5.9.2'
    testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
}
```

我们添加了 _org.springframework:spring-web_ 来演示一个简单的 Spring 依赖。此外，如果我们想使用 Spring 测试特性，我们必须添加 _org.springframework:spring-test_ 测试依赖：

```groovy
// Spring 实现依赖
implementation 'org.springframework:spring-web:6.1.0'

// Spring 测试依赖
testImplementation 'org.springframework:spring-test:6.1.0'
```

**最后，让我们添加 _org.spockframework:spock-spring_ 依赖项。这是我们唯一需要集成 Spock 和 Spring 的依赖项：**

```groovy
// Spring Spock 测试依赖
testImplementation 'org.spockframework:spock-spring:2.4-M1-groovy-4.0'
```

### 3.2. Spock 和 Spring Boot

我们只需要用 Spring Boot 的依赖项替换之前的 Spring 基本依赖项。

让我们看看构建文件：

```groovy
plugins {
    id 'java'
    id 'groovy'
}

repositories {
    mavenCentral()
}

dependencies {
    // Spring 实现依赖
    implementation 'org.springframework.boot:spring-boot-starter-web:3.0.0'

    // Spring 测试依赖
    testImplementation 'org.springframework.boot:spring-boot-starter-test:3.0.0'

    // Spring Spock 测试依赖
    testImplementation 'org.spockframework:spock-spring:2.4-M1-groovy-4.0'

    // Spring 核心测试依赖
    testImplementation 'org.spockframework:spock-core:2.4-M1-groovy-4.0'

    // JUnit 测试依赖
    testImplementation