---
date: 2022-06-01
category:
  - Maven
  - Javadoc
tag:
  - Maven
  - Javadoc
  - Java
head:
  - - meta
    - name: keywords
      content: Maven, Javadoc, Java, 插件, 构建
---

# Maven禁用Javadoc插件

## 1. 概述

Apache Maven Javadoc 插件允许我们在 Maven 构建过程中为指定项目生成 Javadocs。此外，该插件非常方便，因为它使用标准的 _javadoc_ 工具自动生成 Javadocs。

在这个快速教程中，我们将看看如何在 Maven 构建中暂时禁用 Javadocs 生成。

## 2. 问题介绍

我们可以在我们的 _pom.xml_ 中配置 Maven Javadoc 插件以生成 Javadocs 并将们附加到构建的 _jar_ 文件上，例如：

```
...
``<plugin>``
    ``<groupId>``org.apache.maven.plugins``</groupId>``
    ``<artifactId>``maven-javadoc-plugin``</artifactId>``
    `<executions>`
        `<execution>`
            `<id>`attach-javadocs`</id>`
            `<goals>`
                `<goal>`jar`</goal>`
            `</goals>`
        `</execution>`
    `</executions>`
``</plugin>``
...
```

这很方便。但是，有时在我们进行发布时，我们不想将 Javadocs 附加到 _jar_ 文件上。但我们也不想移除 Maven Javadoc 插件。

因此，我们需要一种方法在构建中跳过 Javadocs 生成。接下来，让我们看看如何实现它。

## 3. _maven.javadoc.skip_ 选项

Maven Javadoc 插件提供了一个 _maven.javadoc.skip_ 选项来跳过 Javadocs 生成。

如果我们在构建项目时传递这个选项，并将其值设置为 _true_，我们的 Maven 构建将不会生成 Javadocs：

```
mvn clean install -Dmaven.javadoc.skip=true
```

## 4. 使用 Maven Release 插件跳过 Javadocs 生成

Maven Release 插件广泛用于自动发布管理。

假设我们已在项目中配置了 Maven Release 插件和 Javadoc 插件。

现在，我们希望 Maven Javadoc 插件在常规构建中生成 Javadocs，但仅在发布构建中跳过 Javadocs 生成。

我们有 **两种方法** 可以实现这个目标。

第一种方法是在我们开始发布构建时向 _mvn_ 命令行传递一个参数：

```
mvn release:perform -Darguments="-Dmaven.javadoc.skip=true"
```

或者，我们可以在 Maven Release 插件配置中添加 _maven.javadoc.skip=true_ 参数：

```
``<plugin>``
    ``<groupId>``org.apache.maven.plugins``</groupId>``
    ``<artifactId>``maven-release-plugin``</artifactId>``
    `<configuration>`
        `<arguments>`-Dmaven.javadoc.skip=true`</arguments>`
    `</configuration>`
``</plugin>``
```

这样，所有使用 Maven Release 插件的构建都将跳过 Javadocs 生成。

## 5. 结论

在这篇文章中，我们讨论了如何在 _pom.xml_ 中配置了 Maven Javadoc 插件时跳过 Javadocs 生成。