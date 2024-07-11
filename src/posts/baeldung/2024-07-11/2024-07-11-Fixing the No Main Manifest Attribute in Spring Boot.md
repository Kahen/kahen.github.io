---
date: 2022-04-01
category:
  - Spring Boot
  - Maven
tag:
  - Spring Boot
  - Maven
  - Executable JAR
head:
  - - meta
    - name: keywords
      content: Spring Boot, Maven, Executable JAR, Main Manifest Attribute
------
# 解决Spring Boot中“没有主清单属性”的问题

每当我们在Spring Boot可执行jar中遇到“没有主清单属性”的消息时，这是因为我们缺少了MANIFEST.MF文件中的Main-Class元数据属性声明，该文件位于META-INF文件夹下。

在这篇简短的教程中，我们将重点讨论这个问题的原因以及如何解决它。

## Spring Boot启动器简介
对最常见的Spring Boot启动器进行快速概述，以及如何在现实世界项目中使用它们的示例。

## 问题发生时
通常情况下，如果我们从Spring Initializr获取我们的pom，我们不会有任何问题。但是，如果我们通过向我们的pom.xml添加spring-boot-starter-parent手动构建我们的项目，我们可能会遇到这个问题。我们可以通过尝试进行jar的清洁构建来复制它：

```shell
$ mvn clean package
```

当我们运行jar时，我们将遇到错误：

```shell
$ java -jar target\spring-boot-artifacts-2.jar
```

```plaintext
no main manifest attribute, in target\spring-boot-artifacts-2.jar
```

在这个例子中，MANIFEST.MF文件的内容是：

```plaintext
Manifest-Version: 1.0
Archiver-Version: Plexus Archiver
Created-By: Apache Maven 3.6.3
Built-By: Baeldung
Build-Jdk: 11.0.13
```

## 使用Maven插件进行修复
### 3.1 添加插件
在这种情况下，最常见的问题是我们错过了在pom.xml文件中添加spring-boot-maven-plugin声明。

我们将在我们的pom.xml中添加插件定义，Main-Class声明在plugins标签下的configuration中：

```xml
`<plugins>`
    `<plugin>`
        `<groupId>`org.springframework.boot`</groupId>`
        `<artifactId>`spring-boot-maven-plugin`</artifactId>`
        `<configuration>`
            `<mainClass>`com.baeldung.demo.DemoApplication`</mainClass>`
            `<layout>`JAR`</layout>`
        `</configuration>`
    `</plugin>`
`</plugins>`
```

然而，**这可能不足以解决我们的问题**。即使在重建并运行我们的jar之后，我们可能仍然会收到“没有主清单属性”的消息。

让我们看看我们有哪些额外的配置和替代方案来解决这个问题。

### 3.2 Maven插件执行目标
让我们在spring-boot-maven-plugin声明后的configuration标签中添加repackage目标：

```xml
`<executions>`
    `<execution>`
        `<goals>`
            `<goal>`repackage`</goal>`
        `</goals>`
    `</execution>`
`</executions>`
```

### 3.3 Maven属性和内联命令执行目标
或者，**将start-class属性添加到我们的pom.xml文件的properties标签中，可以在构建过程中提供更多的灵活性**：

```xml
`<properties>`
    `<start-class>`com.baeldung.demo.DemoApplication`</start-class>`
`</properties>`
```

现在我们需要使用Maven内联命令spring-boot:repackage执行目标来构建jar：

```shell
$ mvn package spring-boot:repackage
```

## 检查MANIFEST.MF文件内容
让我们应用我们的解决方案，构建jar，然后检查MANIFEST.MF文件。

我们将注意到Main-Class和Start-Class属性的存在：

```plaintext
Manifest-Version: 1.0
Archiver-Version: Plexus Archiver
Created-By: Apache Maven 3.6.3
Built-By: Baeldung
Build-Jdk: 11.0.13
Main-Class: org.springframework.boot.loader.JarLauncher
Start-Class: com.baeldung.demo.DemoApplication
Spring-Boot-Version: 2.7.5
Spring-Boot-Classes: BOOT-INF/classes/
Spring-Boot-Lib: BOOT-INF/lib/
Spring-Boot-Classpath-Index: BOOT-INF/classpath.idx
Spring-Boot-Layers-Index: BOOT-INF/layers.idx
```

现在执行jar，不再出现“没有主清单属性”的消息，应用程序可以运行。

## 结论
在本文中，我们学习了如何解决执行Spring Boot可执行jar时出现的“没有主清单属性”消息。

我们展示了这个问题是如何来自手动创建的pom.xml文件的，以及如何添加和配置Spring Maven插件来修复它。

如常，示例代码可在GitHub上找到。