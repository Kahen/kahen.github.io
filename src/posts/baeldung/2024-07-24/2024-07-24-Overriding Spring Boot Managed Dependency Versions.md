---
date: 2022-04-01
category:
  - Spring Boot
  - Maven
tag:
  - Spring Boot
  - Maven
  - Gradle
head:
  - - meta
    - name: keywords
      content: Spring Boot, Maven, Gradle, Dependency Management
------
# 覆盖 Spring Boot 管理的依赖版本

## 1. 引言

Spring Boot 是一个出色的框架，用于快速启动新项目。它帮助开发者快速创建新应用程序的一种方式是通过定义一套适合大多数用户的依赖项。

然而，在某些情况下，**可能需要覆盖一个或多个依赖项的版本**。

在本教程中，我们将探讨如何覆盖 Spring Boot 管理的依赖项及其版本。

## 2. Spring Boot 材料清单 (BOM)

让我们首先看看 Spring Boot 如何管理依赖项。简而言之，Spring Boot 使用材料清单 (BOM) 来定义依赖项和版本。

大多数 Spring Boot 项目继承自 spring-boot-starter-parent 构件，它本身又继承自 spring-boot-dependencies 构件。**后者是 Spring Boot BOM**，它只是一个包含大量 _dependencyManagement_ 部分的 Maven POM 文件：

```
`<dependencyManagement>`
    `<dependencies>`
        ````<dependency>````
            ...
        ````</dependency>````
        ````<dependency>````
            ...
        ````</dependency>````
    `</dependencies>`
`</dependencyManagement>`
```

通过使用 Maven 的 _dependencyManagement_，**BOM 可以指定如果我们的应用程序选择使用它们，应使用的默认库版本**。让我们看一个例子。

Spring Boot BOM 中的一个条目如下：

```
````<dependency>````
    ``<groupId>``org.apache.activemq``</groupId>``
    ``<artifactId>``activemq-amqp``</artifactId>``
    ``<version>``${activemq.version}``</version>``
````</dependency>````
```

这意味着项目中依赖于 ActiveMQ 的任何构件都将默认使用此版本。

还请注意，**版本是使用属性占位符指定的**。这是 Spring Boot BOM 中的常见做法，它在自身的 _properties_ 部分提供此属性及其他属性的值。

现在我们已经了解了 Spring Boot 如何管理依赖版本，让我们看看如何覆盖它们。

### 3.1. Maven

对于 Maven，我们有两种方法可以覆盖 Spring Boot 管理的依赖项。首先，对于 Spring Boot BOM 使用属性占位符指定版本的任何依赖项，**我们只需要在我们的项目 POM 中设置该属性**：

```
`<properties>`
    `<activemq.version>`5.16.3`</activemq.version>`
`</properties>`
```

这将导致使用 _activemq.version_ 属性的任何依赖项使用我们指定的版本，而不是 Spring Boot BOM 中的版本。

此外，如果版本在 BOM 中的 _dependency_ 标签中明确指定而不是作为占位符，则我们可以简单地在我们的项目依赖项条目中明确覆盖 _version_：

```
````<dependency>````
    ``<groupId>``org.apache.activemq``</groupId>``
    ``<artifactId>``activemq-amqp``</artifactId>``
    ``<version>``5.16.3``</version>``
````</dependency>````
```

### 3.2. Gradle

**Gradle 需要一个插件来遵守 Spring Boot BOM 的依赖管理**。因此，要开始，我们必须包含插件并导入 BOM：

```
apply plugin: "io.spring.dependency-management"
dependencyManagement {
    imports {
        mavenBom 'io.spring.platform:platform-bom:2.5.5'
    }
}
```

现在，如果我们想覆盖特定依赖项的版本，我们只需要将 BOM 中的相应属性指定为 Gradle _ext_ 属性：

```
ext['activemq.version'] = '5.16.3'
```

如果没有 BOM 中的属性可以覆盖，我们总是可以在声明依赖项时直接指定版本：

```
compile 'org.apache.activemq:activemq-amqp:5.16.3'
```

### 3.3. 警告

这里值得提及几个警告。

首先，重要的是要记住，Spring Boot 是使用其 BOM 中指定的库版本构建和测试的。**每次我们指定不同的库版本时，都有引入不兼容的风险**。因此，每次我们偏离标准依赖版本时，都必须测试我们的应用程序。

另外，请记住，**这些提示仅适用于我们使用 Spring Boot 材料清单 (BOM)**。对于 Maven，这意味着使用 Spring Boot 父项目。对于 Gradle，这意味着使用 Spring 依赖插件。

## 4. 查找依赖版本

我们已经看到了 Spring Boot 如何管理依赖版本以及如何覆盖它们。在这一部分中，我们将看看如何查找项目正在使用的库的版本。**这对于识别库版本并确认我们对项目的任何覆盖都得到满足非常有用**。

### 4.1. Maven

Maven 提供了一个目标，我们可以使用它来显示所有依赖项及其版本的列表。例如，如果我们运行以下命令：

```
mvn dependency:tree
```

我们应该看到类似于以下的输出：

```
[INFO] com.baeldung:dependency-demo:jar:0.0.1-SNAPSHOT
[INFO] +- org.springframework.boot:spring-boot-starter-web:jar:2.5.7-SNAPSHOT:compile
[INFO] |  +- org.springframework.boot:spring-boot-starter:jar:2.5.7-SNAPSHOT:compile
[INFO] |  |  +- org.springframework.boot:spring-boot:jar:2.5.7-SNAPSHOT:compile
[INFO] |  |  +- org.springframework.boot:spring-boot-autoconfigure:jar:2.5.7-SNAPSHOT:compile
[INFO] |  |  +- org.springframework.boot:spring-boot-starter-logging:jar:2.5.7-SNAPSHOT:compile
[INFO] |  |  |  +- ch.qos.logback:logback-classic:jar:1.2.6:compile
[INFO] |  |  |  |  \- ch.qos.logback:logback-core:jar:1.2.6:compile
```

输出显示了项目的所有构件和版本。**这些依赖项以树形结构呈现**，便于识别每个构件如何被导入到项目中。

在上面的例子中，_logback-classic_ 构件是 _spring-boot-starter-logging_ 库的依赖项，该库本身是 _spring-boot-starter_ 模块的依赖项。因此，我们可以沿着树形结构回到我们的顶级项目。

### 4.2. Gradle

Gradle 提供了一个任务，生成类似的依赖树。例如，如果我们运行以下命令：

```
gradle dependencies
```

我们将获得类似于以下的输出：

```
compileClasspath - Compile classpath for source set 'main'.
\--- org.springframework.boot:spring-boot-starter-web -> 1.3.8.RELEASE
     +--- org.springframework.boot:spring-boot-starter:1.3.8.RELEASE
     |    +--- org.springframework.boot:spring-boot:1.3.8.RELEASE
     |    |    +--- org.springframework:spring-core:4.2.8.RELEASE
     |    |    \--- org.springframework:spring-context:4.2.8.RELEASE
     |    |         +--- org.springframework:spring-aop:4.2.8.RELEASE
```

就像 Maven 输出一样，我们可以轻松识别个构件被引入项目的原因以及使用的版本。

## 5. 结论

在本文中，我们学习了 Spring Boot 如何管理依赖版本。我们还看到了如何在 Maven 和 Gradle 中覆盖这些依赖版本。最后，我们看到了如何验证这两种项目类型的依赖版本。