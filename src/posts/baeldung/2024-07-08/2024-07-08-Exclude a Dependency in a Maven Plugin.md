---
date: 2022-04-01
category:
  - Maven
  - 插件
tag:
  - Maven插件
  - 依赖排除
head:
  - - meta
    - name: keywords
      content: Maven, Maven插件, 依赖排除, 插件依赖, 排除插件依赖
---
# Maven插件中排除依赖

## 1. 概述

在Maven中排除依赖是一项常见操作。然而，当涉及到Maven插件时，这一操作会变得更加困难。

## 2. 什么是依赖排除

Maven管理依赖的传递性。这意味着**Maven可以自动添加我们添加的依赖所需的所有依赖**。在某些情况下，这种**传递性可以迅速增加依赖的数量，因为它添加了级联依赖**。

例如，如果我们有依赖关系如A → B → C → D，那么A将依赖于B、C和D。如果A只使用B的一小部分，而这部分不需要C，那么我们可以告诉Maven在A中忽略B → C的依赖。

因此，A将只依赖于B，而不再依赖于C和D。这被称为依赖排除。

## 3. 排除传递依赖

我们可以使用_`````<exclusions>`````_元素来排除子依赖，该元素包含对特定依赖的一组排除。**简言之，我们只需要在POM文件中的_```<dependency>```_元素中添加一个_`````<exclusions>`````_元素即可**。

例如，考虑_commons-text_依赖的例子，假设我们的项目只使用_commons-text_的代码，而不需要_commons-lang_子依赖。

我们将能够在POM文件中_commons-text_依赖声明中添加一个_`````<exclusions>`````_部分，从而从我们的项目中排除_commons-lang_依赖，如下所示：

```
`<project>`
    ...
    ``<dependencies>``
        ...
        ```<dependency>```
            `````<groupId>`````org.apache.commons`````</groupId>`````
            `````<artifactId>`````commons-text`````</artifactId>`````
            ````<version>````1.1````</version>````
            `````<exclusions>`````
                `<exclusion>`
                    `````<groupId>`````org.apache.commons`````</groupId>`````
                    `````<artifactId>`````commons-lang3`````</artifactId>`````
                `</exclusion>`
            `</exclusions>`
        ``</dependency>``
    ``</dependencies>``
    ...
``</project>``
```

因此，如果我们使用上述POM重建项目，我们将看到_commons-text_库被集成到我们的项目中，但没有_commons-lang_库。

## 4. 从插件中排除传递依赖

到目前为止，Maven还不支持从插件中排除直接依赖，并且已经有一个开放的问题来包含这个新功能。在本章中，**我们将讨论一个通过使用虚拟依赖来覆盖来排除Maven插件的直接依赖的解决方法**。

假设我们必须排除Maven Surefire插件的JUnit 4.7依赖。

首先，我们必须创建一个虚拟模块，它必须是我们项目根POM的一部分。该模块将只包含一个POM文件，如下所示：

```
`<?xml version="1.0" encoding="UTF-8"?>`
`<project xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://maven.apache.org/POM/4.0.0"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">`
    `<modelVersion>`4.0.0`</modelVersion>`
    `````<groupId>`````org.apache.maven.surefire`````</groupId>`````
    `````<artifactId>`````surefire-junit47`````</artifactId>`````
    ````<version>````dummy````</version>````
``</project>``
```

接下来，我们需要调整我们希望停用依赖的子POM。为此，我们必须将虚拟版本的依赖添加到Maven Surefire插件声明中：

```
`<build>`
    `<plugins>`
        `<plugin>`
            `````<groupId>`````org.apache.maven.plugins`````</groupId>`````
            `````<artifactId>`````maven-surefire-plugin`````</artifactId>`````
            ````<version>````${surefire-version}````</version>````
            `<configuration>`
                `<runOrder>`alphabetical`</runOrder>`
                `<threadCount>`1`</threadCount>`
                `<properties>`
                    `<property>`
                        `<name>`junit`</name>`
                        `<value>`false`</value>`
                    `</property>`
                `</properties>`
            `</configuration>`
            ``<dependencies>``
                ```<dependency>```
                    `<!-- 通过使用空的虚拟依赖来停用JUnit 4.7引擎 -->`
                    `````<groupId>`````org.apache.maven.surefire`````</groupId>`````
                    `````<artifactId>`````surefire-junit47`````</artifactId>`````
                    ````<version>````dummy````</version>````
                ``</dependency>``
            ``</dependencies>``
        `</plugin>`
    `</plugins>`
`</build>`
```

最后，一旦我们构建项目，我们将看到Maven Surefire插件的JUnit 4.7依赖没有被包含在项目中，并且排除已经成功。

## 5. 结论

在这个快速教程中，我们解释了依赖排除以及如何使用_`````<exclusions>`````_元素来排除传递依赖。此外，我们展示了一个排除插件中直接依赖的解决方法，即通过使用虚拟依赖来覆盖。

如常，代码可在GitHub上找到。