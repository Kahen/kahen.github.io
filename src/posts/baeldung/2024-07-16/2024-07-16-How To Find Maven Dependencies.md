---
date: 2022-08-01
category:
  - Java
  - Maven
tag:
  - Maven
  - Dependency Management
head:
  - - meta
    - name: keywords
      content: Maven, Dependency Management, POM, Java
------
# 如何查找Maven依赖

## 1. 引言

Maven 是一个项目管理和理解工具。它基于项目对象模型的概念，也称为 POM。使用 POM 作为中心信息，Maven 可以管理项目的构建、报告和文档。

**Maven 的一个重要部分是依赖管理。** 大多数开发人员在开发应用程序时会与 Maven 的这个特性交互。

Maven 的高级依赖管理提供了自动更新以及依赖闭包。公司使用 Maven 进行依赖管理的另一种方式是使用自定义的中央仓库。通过这样做，开发人员可以在公司内使用其他项目中的依赖。

在本教程中，我们将学习如何查找 Maven 依赖。

## 2. Maven 依赖是什么

在 Maven 的上下文中，**依赖只是一个由 Java 应用程序使用的 JAR 文件。** 根据 POM 文件，Maven 会下载并添加 JAR 文件到我们的 Java 路径。然后 Java 将能够找到并使用 JAR 文件中的类。

**还需要注意的是，Maven 有一个本地仓库，它下载所有的依赖。** 默认情况下，这位于 _{用户主文件夹}/.m2/repository_。

## 3. POM 文件

POM 文件使用 XML 语法，其中所有内容都包含在标签之间。

默认情况下，POM 文件只包含我们的项目信息。为了添加项目将使用的依赖，我们需要添加 _dependencies_ 部分：

```
`<project xmlns="http://maven.apache.org/POM/4.0.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">`
    `<modelVersion>`4.0.0`</modelVersion>`
    ``<groupId>``com.baeldung``</groupId>``
    ``<artifactId>``maven.dependency``</artifactId>``
    ``<version>``0.0.1-SNAPSHOT``</version>``

    `<dependencies>`
        ....
    `</dependencies>`
`</project>`
```

**这只在我们手动编辑 POM 文件时需要。**

在开始一个新项目或添加一个新功能时，我们可能会意识到需要向我们的项目中添加一个新的依赖。让我们以一个简单的例子为例，我们需要添加 JDBC 依赖。

根据我们的 IDE 和设置，有不同的方法来找到 JDBC 依赖所需的详细信息。

### 4.1. IntelliJ

如果我们使用 IntelliJ IDEA，我们可以通过以下步骤将新的依赖添加到项目的 POM：

首先，我们打开 POM 文件，然后按 ALT+INSERT，然后点击 DEPENDENCY 选项： ![img](https://www.baeldung.com/wp-content/uploads/2022/08/IntelliJAdd-Dependency-Menu.png)

然后，们可以搜索所需的依赖并点击 ADD： ![img](https://www.baeldung.com/wp-content/uploads/2022/08/IntelliJDependency-Search.png)

### 4.2. Eclipse

Eclipse IDE 有一个类似于 IntelliJ 的方法来添加新的依赖。

我们需要右键点击包资源管理器中的 POM 文件或在打开文件后，然后我们转到 Maven -> Add dependency 选项：
 ![img](https://www.baeldung.com/wp-content/uploads/2022/08/EclipseMaven-Menu.png) 然后，我们可以搜索所需的依赖并点击 OK： ![img](https://www.baeldung.com/wp-content/uploads/2022/08/EclipseDependency-Search.png)

### 4.3. 互联网搜索

**如果我们愿意手动编辑 POM 文件，那么我们可以直接在 search.maven.org 或 Google 上搜索以找到依赖的所有详细信息。**

当访问 **search.maven.org** 时，我们可以简单地在搜索栏中输入依赖，我们将找到许多依赖的版本。除非我们的项目中有其他限制，我们应该使用最新稳定版本：

 ![img](https://www.baeldung.com/wp-content/uploads/2022/08/SearchMaven-DependencySearch.png)

**在我们的 POM 文件中，在依赖部分，只需粘贴找到的依赖详细信息。**

```
`<dependency>`
    ``<groupId>``org.springframework``</groupId>``
    ``<artifactId>``spring-jdbc``</artifactId>``
    ``<version>``5.3.21``</version>``
`</dependency>`
```

还有许多其他类似于 **search.maven.org** 的网站，我们可以使用和探索。

## 5. 结论

在本教程中，我们看到了将 Maven 依赖添加到我们项目的不同方法。

我们还学习了如何编辑 POM 文件以使 Maven 下载并使用添加的依赖。