---
date: 2022-06-06
category:
  - Maven
  - Java
tag:
  - Maven Artifact
  - Build Tool
head:
  - - meta
    - name: keywords
      content: Maven, Java, Build Tool, Artifact
---
# Apache Maven 构件是什么？

手动构建一个复杂项目相当繁琐。使用构建工具可以更容易地完成这项工作。众所周知，Java项目的主要构建工具之一是Maven。Maven帮助标准化应用程序的构建和部署。

在本教程中，我们将讨论Maven构件是什么以及它的关键元素是什么。我们还将查看Maven坐标、依赖管理，最后是Maven仓库。

## **1. 概述**

我们可以使用Maven构建和管理任何基于Java的项目。它提供了许多功能，例如：

- 构建和编译
- 文档和报告
- 依赖管理
- 源代码管理
- 项目更新
- 部署

每个Maven项目都有自己的POM文件。我们可以配置Maven来构建一个项目或多个项目。

通常，多项目在根目录中定义一个POM文件，并在_modules_部分列出各个项目。简而言之，**Maven构建产生一个或多个构件**。

## **3. Maven构件是什么？**

构件是项目可以使用或产生的元素。在Maven术语中，**一个构件** **是在Maven项目构建后生成的输出**。例如，它可以是一个_jar_、_war_或任何其他可执行文件。

此外，Maven构件包括五个关键元素，_groupId_、_artifactId_、_version_、_packaging_和_classifier_。这些是我们用来识别构件的元素，被称为Maven坐标。

## **4. Maven坐标**

**Maven坐标** 是给定构件的 _groupId_、_artifactId_ 和 _version_ 的值的组合。此外，Maven使用坐标来查找与 _groupId_、_artifactId_ 和 _version_ 的值匹配的任何组件。

在坐标元素中，我们必须定义 _groupId_、_artifactId_ 和 _version_。_packaging_ 元素是可选的，我们不能直接定义 _classifier_。

例如，下面的 _pom.xml_ 配置文件显示了一个Maven坐标的示例：

```xml
``<project>``
    ``<modelVersion>``4.0.0``</modelVersion>``
    `````<groupId>`````org.baeldung`````</groupId>`````
    `````<artifactId>`````org.baeldung.java`````</artifactId>`````
    `<packaging>`jar`</packaging>`
    `````<version>`````1.0.0-SNAPSHOT`````</version>`````
    `<name>`org.baeldung.java`</name>`
    `<url>`http://maven.apache.org`</url>`
    ``<dependencies>``
        ```<dependency>```
            `````<groupId>`````junit`````</groupId>`````
            `````<artifactId>`````junit`````</artifactId>`````
            `````<version>`````4.1.2`````</version>`````
            ``<scope>``test``</scope>``
        ```</dependency>```
    ``</dependencies>``
``</project>``
```

让我们详细看看每个Maven坐标。

### 4.1. _groupId_ 元素

**_groupId_ 元素是项目起源组的标识符**。这个关键使得组织和查找项目更加容易和快速。

此外，_groupId_ 遵循与Java包相同的命名规则，我们通常选择项目的顶级包名称作为 _groupId_。

例如，一个 _groupId_ 为 _org.apache.commons_ 对应于 _${repository_home}/org/apache/commons._。

### 4.2. _artifactId_ 元素

**_artifactId_ 元素是组内项目的标识符**。它默认用于构建构件的最终名称。因此，这个名称有一些规范，因为它应该是理想的短长度。命名 _artifactId_ 的最佳实践是使用实际的项目名称作为前缀。这样做的好处是它使得查找构件更加容易。

像 _groupId_ 一样，_artifactId_ 在表示 _groupId_ 的目录树中表现为一个子目录。

例如，一个 _artifactId_ 为 _commons-lang3_ 在 _groupId_ 为 _org.apache.commons_ 下，将决定构件位于：_${repository_home}/org/apache/commons/commons-lang3/_。

### 4.3. _version_ 元素

_version_ 用作构件标识符的一部分。**它定义了Maven项目当前的版本**。我们应该注意到Maven定义了一组版本规范，以及发布和快照的概念，我们将在后面介绍。

一个 _version_ 在由 _groupId_ 和 _artifactId_ 形成的目录树中被表示为一个子目录。

例如，一个 _artifactId_ 为 _commons-lang3_ 在 _groupId_ 为 _org.apache.commons_ 下的版本为 _3.1.1_，将决定构件位于：_${repository_home}/org/apache/commons/commons-lang3/3.1.1/_。

### 4.4. _packaging_ 元素

这个元素用于指定项目生成的构件类型。**_packaging_ 可以是描述任何二进制软件格式的任何东西**，包括 _ZIP_、_EAR_、_WAR_、_SWC_、_NAR_、_SWF_、_SAR_。

此外，_packaging_ 定义了在项目的默认生命周期期间要执行的不同目标。例如，打包阶段为jar类型构件执行 _jar:jar_ 目标，为war类型构件执行 _war:war_ 目标。

### 4.5. _classifier_ 元素

我们通常出于技术原因使用 _classifier_，当交付相同的代码但作为几个单独的构件时。

例如，如果我们想要用不同的Java编译器构建两个 _JAR_ 构件，我们可以轻松地使用 _classifier_ 来实现，因为它允许使用相同的 _groupId:artifactId:version_ 组合生产两个不同的构件。

此外，我们还可以在打包源代码、构件的JavaDoc或组装二进制文件时使用 _classifier_。

对于我们上述的 _commons-lang3_ 示例，要查找的构件是：_commons-lang3-3.10-javadoc.jar_ 或 _commons-lang3-3.10-sources.jar_，在 _${repository_home}/org/apache/commons/commons-lang3/3.1.0/_ 下。

## 5. 发布版与快照版构件

现在，让我们看看快照构件和发布版构件之间的区别。

### 5.1. 发布版构件

一个 **发布** **构件** 表示该版本是稳定的，并且可以在开发过程之外使用，如集成测试、客户资格认证、预生产等。

此外，一个 **发布版构件是唯一的**。运行 _mvn_ _deploy_ 命令将把我们的项目部署到仓库。但是，对具有相同版本的同一项目再次执行相同的命令将导致失败。

### 5.2. 快照版构件

**快照版构件** 表示项目正在开发中。当我们安装或发布一个组件时，Maven会检查 _version_ 属性。如果它包含字符串“SNAPSHOT”，Maven会将这个键转换为UTC（协调世界时）格式的日期和时间值。

例如，如果我们的项目版本为 1.0-SNAPSHOT，并且我们在Maven仓库上部署其构件，Maven会将这个版本转换为“1.0-202202019-230800”，假设我们在2022年2月19日23:08 UTC部署。

换句话说，当我们部署一个快照时，我们不是在交付一个软件组件，我们只是交付了它的一个快照。

## **6.** **依赖管理**

在Maven世界中，依赖管理是至关重要的。例如，当一个项目在其操作过程中（编译、执行）依赖其他类时，就有必要从远程仓库中识别并导入这些依赖到本地仓库。因此，项目将依赖这些库，这些库最终将被添加到项目的类路径中。

此外，Maven的依赖管理基于几个概念：

- 仓库：存储构件所必需的
- 范围：允许我们指定我们在哪个上下文中使用依赖
- 传递性：允许我们管理依赖的依赖
- 继承：从父POM继承的POM可以通过仅提供依赖的 _groupId_ 和 _artifactId_ 而不带 _version_ 属性来设置它们的依赖。Maven从父POM文件中获取适当的版本。

使用Maven，**依赖管理是通过 _pom.xml_ 完成的**。例如，Maven项目中的依赖声明如下所示：

```xml
``<dependencies>``
    ```<dependency>```
        `````<groupId>`````org.apache.maven`````</groupId>`````
        `````<artifactId>`````maven-plugin-api`````</artifactId>`````
        `````<version>`````3.8.4`````</version>`````
        ``<scope>``provided``</scope>``
    ```</dependency>```
    ```<dependency>```
        `````<groupId>`````org.springframework`````</groupId>`````
        `````<artifactId>`````spring-web`````</artifactId>`````
        `````<version>`````5.3.15`````</version>`````
    ```</dependency>```
``</dependencies>``
```

## **7. Maven仓库**

**Maven使用仓库来存储构建项目所需的依赖和插件等元素**。这使得可以集中这些通常在多个项目中使用的元素。

正如我们前面提到的，仓库使用一组坐标：_groupId_、_artifactId_、_version_ 和 _packaging_ 来存储构件。此外，Maven使用特定的目录结构来组织仓库的内容，并允许它找到所需的元素：_${repository_home}/groupId/artifactIdversion_。

例如，让我们考虑这个POM配置。

```xml
``<project>``
    ``<modelVersion>``4.0.0``</modelVersion>``
    `````<groupId>`````com.baeldung`````</groupId>`````
    `````<artifactId>`````myApp`````</artifactId>`````
    `````<version>`````1.0.0`````</version>`````
``</project>``
```

使用上述配置，我们的项目将存储在仓库的 _${repository_home}/com/baeldung/myApp/1.0.0/_ 路径中。

## **8. 结论**

在本文中，我们讨论了Maven构件及其坐标系统的概念。我们还学习了依赖和仓库等相关概念。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/0728087722c48c379bfd934fd8723735?s=50&r=g)![img](https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2022/06/maven-ebook-post-footer-1.jpg)![img](https://www.baeldung.com/wp-content/uploads/2022/06/maven-ebook-post-footer-icon.png)

OK