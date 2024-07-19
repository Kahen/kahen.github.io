---
date: 2022-04-01
category:
  - Maven
tag:
  - Maven
  - Parent POM
  - Plugin
head:
  - - meta
    - name: keywords
      content: Maven, Parent POM, Plugin, Disable
------
# 如何禁用在父 POM 中定义的 Maven 插件

## 1. 概述

Maven 允许我们使用继承的概念来构建项目。**当父 POM 定义了一个插件时，所有的子模块都会继承它。**

但如果我们不想从父 POM 继承一个插件，而我们又不能修改父 POM 怎么办？

在本教程中，我们将探讨几种不同的方法来禁用在父 POM 中定义的 Maven 插件，特别是 Maven Enforcer 插件。

## 2. 我们为什么要禁用父 POM 中定义的插件？

在我们继续之前，让我们思考一下为什么我们可能需要这样做。

**Maven 偏好约定而不是配置**。我们需要记住，虽然禁用插件可能是对我们来说最快的解决方案，但它可能不是对项目最好的解决方案。

**禁用父 POM 中的插件的需求可能源于 Maven 项目的原始作者没有预见到我们的情况，我们没有办法自己修改父模块。**

假设原始作者假设一个特定的文件应该始终存在。然而，对于我们的模块来说，这个文件的存在是没有意义的。例如，父 POM 可能强制要求每个模块中都存在一个许可证文件，而我们没有。与其添加一个空文件，可能会引起混淆，我们更愿意禁用规则执行。

让我们通过在我们的 Maven 项目中添加一个父模块来设置这个场景，该模块实现了 _maven-enforcer-plugin_：

```xml
```<plugin>```
    `<groupId>`org.apache.maven.plugins`</groupId>`
    ```<artifactId>```maven-enforcer-plugin```</artifactId>```
    `<version>`3.0.0`</version>`
```</plugin>```
```

接下来，让我们为插件添加一个执行来强制执行一个规则，即每个模块的 _src_ 目录中必须存在一个名为 _file-that-must-exist.txt_ 的文件：

```xml
``<executions>``
    ```<execution>```
        ```<id>```enforce-file-exists```</id>```
        `<goals>`
            `<goal>`enforce`</goal>`
        `</goals>`
        ``<configuration>``
            `<rules>`
                `<requireFilesExist>`
                    `<files>`
                        `<file>`${project.basedir}/src/file-that-must-exist.txt`</file>`
                    `</files>`
                `</requireFilesExist>`
            `</rules>`
        ``</configuration>``
    ```</execution>```
``</executions>``
```

如果 _file-that-must-exist.txt_ 不存在，则构建将失败。

**由于子模块从其父模块继承插件，所有子模块都必须遵守这一规则。**

让我们看看我们如何在子 POM 中禁用这条规则。

首先，假设重构 Maven 项目或更改父 POM 是不可接受的解决方案。**如果我们能够修改父模块，那么我们可以通过在父 POM 中实现一个 _pluginManagement_ 部分来解决这个问题。**

我们可能无法修改父模块，因为我们不拥有该项目，因此我们没有权限在我们的模块之外进行更改。这可能是由于时间限制——重构一个项目需要时间，因此在子模块中禁用一个插件更方便。

此外，**我们假设插件实际上需要被禁用。**许多插件即使在它们不打算使用的模块上运行也不会有问题。

例如，假设我们有一个复制 Java 文件的插件。如果我们有一个没有 Java 文件的子项目，那么插件可能根本不会复制任何文件。它将这样做而不会引起问题。在这种情况下，更简单和更传统的方法是让插件继续运行。

假设在考虑了上述情况后，我们确实需要在我们的模块中禁用插件。

我们可以通过配置 _skip_ 参数来做到这一点。

### 3.1. 配置 _Skip_ 参数

**许多插件都有一个 _skip_ 参数。我们可以使用 _skip_ 参数来禁用插件。**

如果我们查看 _maven-enforcer-plugin_ 的文档，我们可以看到它有一个 _skip_ 参数，我们可以实施。

**支持 _skip_ 参数应该是我们首先检查的事情，因为它是最简单的解决方案**，也是最传统的方法。

让我们添加一个只包含 POM 的空子模块。如果我们使用 _mvn clean install_ 命令构建模块，我们会发现构建失败了。这是因为由于从我们的父模块继承了规则，我们的模块中不存在 _file-that-must-exist.txt_。

让我们在子 POM 中添加以下行以启用 _skip_ 参数：

```xml
```<plugin>```
    ```<artifactId>```maven-enforcer-plugin```</artifactId>```
    ``<configuration>``
        `<skip>`true`</skip>`
    ``</configuration>``
```</plugin>```
```

现在，如果我们运行项目，我们会发现构建是成功的。

然而，并非所有插件都有 _skip_ 参数。那么如果我们使用的插件没有 _skip_ 参数，我们该怎么办？

### 3.2. 移除 _Phase_ 参数

**一个 Maven 目标只有在绑定到构建阶段时才会运行。**

在我们的父 POM 中，我们已经配置了 enforce 目标以 id _enforce-file-exists_ 运行。

由于我们没有为 _enforce-file-exists_ 指定 _phase_ 参数，它将使用 enforce 目标的默认值。我们可以从文档中看到，默认值是 _validate_ 构建阶段。

我们可以通过为 _phase_ 参数指定一个替代值来在替代的构建阶段执行目标。

利用这一点，**我们可以将 _phase_ 参数设置为一个不存在的值。这意味着构建阶段将永远不会被执行。** 因此，目标不会被执行，有效地禁用了插件：

```xml
```<plugin>```
    ```<artifactId>```maven-enforcer-plugin```</artifactId>```
    ``<executions>``
        ```<execution>```
            ```<id>```enforce-file-exists```</id>```
            `<phase>`any-value-that-is-not-a-phase`</phase>`
        ```</execution>```
    ``</executions>``
```</plugin>```
```

为了让我们稍后查看代码的人更清楚，我们希望将 _phase_ 设置为一个明确的名称，如“none”或“null”。

然而，可能最清楚的方式是完全清除 _phase_ 参数：

```xml
```<execution>```
    ```<id>```enforce-file-exists```</id>```
    `<phase/>`
```</execution>```
```

由于执行的 _phase_ 现在是空的，目标将不会被绑定到运行的构建阶段。这有效地禁用了插件。

我们可以看到，当我们运行构建时，_enforce-file-exists_ 根本不会在我们的子模块中运行。

## 4. 结论

在本文中，我们讨论了为什么我们可能选择禁用在父 POM 中定义的插件。我们看到了禁用插件可能并不总是最好的事情，因为 Maven 偏好约定而不是配置。

然后，我们通过一个简单的例子展示了如何禁用由父 POM 声明的 _maven-enforcer-plugin_。

首先，**我们展示了如果插件有一个，我们可以配置插件的 _skip_ 参数。** 我们发现这是最传统的方法。

最后，**我们了解到清除插件的 _phase_ 参数将有效地禁用它。**

一如既往，示例项目在 GitHub 上可用。