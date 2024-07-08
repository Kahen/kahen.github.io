---
date: 2023-03-01
category:
  - Java
  - Maven
tag:
  - Maven Reactor
  - 多模块项目
head:
  - - meta
    - name: keywords
      content: Maven, Maven Reactor, 多模块项目, 构建依赖
---
# Maven Reactor 简介

在本教程中，我们将快速了解 Maven Reactor 的基本概念以及其在 Maven 生态系统中的位置。

我们将从 Maven Reactor 的介绍开始。接下来，我们将设置一个具有模块间依赖的简单多模块 Maven 项目的示例，并看到 Reactor 如何运作以确定构建依赖。我们将触及一些可用的标志，这些标志可以微调 Maven Reactor 的行为。最后，我们将总结使用 Reactor 的一些好处。

## Maven Reactor 的基础知识

**Maven Reactor 是 Maven 的内置部分，负责管理项目依赖和构建。** **它负责执行 Maven 构建，并确保项目以正确的顺序构建以满足依赖。在具有许多模块间依赖的复杂多模块项目中，可以真正体会到 Maven Reactor 的好处。**

**Reactor 使用有向无环图（DAG）来确定项目的构建顺序。**

它作为 Maven 核心的一部分执行以下功能：

- 收集所有可供构建的模块
- 将项目组织到适当的构建顺序中
- 按顺序依次执行选定的项目

## 示例用例

让我们考虑一个涉及开发用于管理患者信息的基于 Web 的应用程序的项目。该项目由三个模块组成：

1. **patient-web 模块** - 这个模块作为应用程序的用户界面
2. **patient-data 模块** - 这个模块处理所有数据库 CRUD 操作
3. **patient-domain 模块** - 这个模块包含应用程序使用的领域实体

在这个项目中，**patient-web 模块** 依赖于其他两个模块，因为它从持久存储中检索和显示数据。另一方面，**patient-data 模块** 依赖于 **patient-domain 模块**，因为它需要访问领域实体以执行 CRUD 操作。重要的是要注意，**patient-data 模块** 独立于其他两个模块。

### 4.1 Maven 设置

为了实现我们的简单示例，让我们设置一个名为 **sample-reactor-project** 的多模块项目，包含三个模块。每个模块将服务于前面提到的目的：

![img](https://www.baeldung.com/wp-content/uploads/2023/03/Maven-reactor-project-300x169.png)

在这一点上，让我们窥视一下项目 **POM**：

```xml
``````````<artifactId>``````````maven-reactor``````````</artifactId>``````````
````````<version>````````1.0-SNAPSHOT````````</version>````````
````<name>````maven-reactor````</name>````
`<packaging>`pom`</packaging>`
`<modules>`
    ````<module>````patient-web````</module>````
    ````<module>````patient-data````</module>````
    ````<module>````patient-domain````</module>````
`</modules>`
```

**本质上，我们在这里定义了一个多模块项目，并在项目 **pom** 中的 _````<module>```` .. ````</module>````_ 标签内声明了所有三个模块。**

现在，让我们看看 **patient-data 模块** 的 **POM**：

```xml
``````````<artifactId>``````````patient-data``````````</artifactId>``````````
````<name>````patient-data````</name>````
```<parent>```
    ``````<groupId>``````com.baeldung``````</groupId>``````
    ``````````<artifactId>``````````maven-reactor``````````</artifactId>``````````
    ````````<version>````````1.0-SNAPSHOT````````</version>````````
```</parent>```
``<dependencies>``
    ```<dependency>```
        ``````<groupId>``````com.baeldung``````</groupId>``````
        ``````````<artifactId>``````````patient-domain``````````</artifactId>``````````
        ````````<version>````````1.0-SNAPSHOT````````</version>````````
    ```</dependency>```
``</dependencies>``
```

**在这里，我们可以看到 **patient data** 依赖于 **patient-domain。**

对于我们的用例，我们将假设 **patient-domain 模块** 独立于其他模块，并且可以独立构建。它的 **POM** 如下所示：

```xml
``````````<artifactId>``````````patient-domain``````````</artifactId>``````````
````<name>````patient-domain````</name>````
```<parent>```
    ``````<groupId>``````com.baeldung``````</groupId>``````
    ``````````<artifactId>``````````maven-reactor``````````</artifactId>``````````
    ````````<version>````````1.0-SNAPSHOT````````</version>````````
```</parent>```
```

**最后，**patient-web** 应该依赖于 **patient-data** 和 **patient-domain**：

```xml
``````````<artifactId>``````````patient-web``````````</artifactId>``````````
````````<version>````````1.0-SNAPSHOT````````</version>````````
````<name>````patient-web````</name>````
```<parent>```
    ``````<groupId>``````com.baeldung``````</groupId>``````
    ``````````<artifactId>``````````maven-reactor``````````</artifactId>``````````
    ````````<version>````````1.0-SNAPSHOT````````</version>````````
```</parent>```
``<dependencies>``
    ```<dependency>```
        ``````<groupId>``````com.baeldung``````</groupId>``````
        ``````````<artifactId>``````````patient-data``````````</artifactId>``````````
        ````````<version>````````1.0-SNAPSHOT````````</version>````````
    ```</dependency>```
    ```<dependency>```
        ``````<groupId>``````com.baeldung``````</groupId>``````
        ``````````<artifactId>``````````patient-domain``````````</artifactId>``````````
        ````````<version>````````1.0-SNAPSHOT````````</version>````````
    ```</dependency>```
``</dependencies>``
```

### 4.2 Maven Reactor 在行动

要看到 Reactor 在行动，让我们进入项目的父目录 **(maven-reactor)** 并执行 **mvn clean install**。

此时，Maven 将使用 Reactor 执行以下任务：

1. 收集项目中的所有可用模块（在本例中为 **patient-web**、**patient-data** 和 **patient-domain**）
2. **根据它们的依赖确定构建模块的正确顺序（在本例中，**patient-domain** 必须在 **patient-data** 之前构建，**patient-data** 必须在 **patient-web** 之前构建）**
3. 按正确的顺序构建每个模块，确保正确解析依赖

这是成功的构建顺序的 Reactor 构建顺序：

![img](https://www.baeldung.com/wp-content/uploads/2023/03/build-order.png)

## 5. 配置 Reactor

尽管 Reactor 默认是 Maven 的一部分，但我们仍然可以通过使用几个命令行开关来修改其行为。这些开关被认为是必需的，因为它们允许我们控制 Reactor 如何构建我们的项目。一些需要考虑的重要开关包括：

- **–resume-from:** 允许我们在构建中途失败时从特定项目恢复 reactor
- **–also-make:** 构建指定的项目及其 reactor 中的任何依赖项
- **–also-make-dependents:** 构建指定的项目以及依赖它们的任何项目
- **–fail-fast:** 每当模块构建失败时立即停止整体构建（默认）
- **–fail-at-end:** 即使特定模块构建失败，此选项也会继续 reactor 构建，并在最后报告所有失败的模块
- **–non-recursive:** 使用此选项，我们可以禁用 Reactor 构建，并仅构建当前目录中的项目，即使项目的 pom 声明了其他模块

通过使用这些选项，我们可以微调 reactor 的行为，并以我们需要的方式构建我们的项目。

## 6. 结论

在本文中，我们快速了解了使用 Maven Reactor 作为 Apache Maven 生态系统的一部分来构建多模块复杂项目的好处，它从开发者那里接管了解析依赖和构建顺序的责任，同时也减少了构建时间。

像往常一样，本教程中展示的所有代码示例都可以在 GitHub 上找到。