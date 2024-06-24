---
date: 2024-06-24
category:
  - Maven
  - HTTPS
tag:
  - Maven
  - HTTPS
  - 501错误
head:
  - - meta
    - name: keywords
      content: Maven, HTTPS, 501错误, 解决方案
---
# Maven依赖项因501错误“HTTPS Required”失败 | Baeldung

## 1. 概述

在本教程中，我们将了解错误“返回代码是：501，原因短语：HTTPS Required”。我们将首先理解这个错误的含义，然后探索解决此错误的步骤。

## 2. Maven转向HTTPS

Maven确保从Maven中央仓库自动下载外部库。然而，通过HTTP下载引发安全问题，例如中间人攻击（MITM）的风险。在这种攻击中，恶意代码可能在构建阶段被注入，这可能会感染下游组件及其最终用户。

**为了保持数据完整性和加密，从2020年1月15日起，Maven中央仓库已停止通过HTTP通信。这意味着任何使用HTTP访问中央仓库的尝试都将导致出现错误“返回代码是：501，原因短语：HTTPS Required”。要修复此错误，我们需要确保依赖项是通过HTTPS而不是HTTP获取的。**

## 3. 更新Maven版本

从Maven 3.2.3版本开始，默认通过HTTPS访问中央仓库。如果我们使用的是较旧版本的Maven，我们可以更新到3.2.3或更高版本来修复此错误。

要更新Maven版本，我们可以从官方Apache Maven下载页面下载最新稳定构建版本。

## 4. 限制当前Maven版本使用HTTPS链接

Maven提供了一个设置文件_settings.xml_，我们可以用它来配置Maven安装。这个_settings.xml_文件包含所有本地和远程仓库链接。要修复此错误，我们需要确保我们在Maven设置中使用HTTPS。以下是验证和更新Maven设置的步骤：

### 4.1. 修复_settings.xml_中的_mirrors_部分

如果_settings.xml_文件中存在``<mirrors>``部分，我们需要确保镜像的URL是_https://repo.maven.apache.org/maven2/_。如果该部分不存在，我们可以这样添加它：

```
``<mirrors>``
    `<mirror>`
        ```<id>```central```</id>```
        ```<url>```https://repo.maven.apache.org/maven2/```</url>```
        `<mirrorOf>`central`</mirrorOf>`
    `</mirror>`
`</mirrors>`
```

### 4.2. 修复_settings.xml_中的_pluginRepositories_部分

与镜像部分类似，我们也可能有一个_pluginRepositories_部分，我们需要使用带有HTTPS的URL：

```
`<pluginRepositories>`
    `<pluginRepository>`
        ```<id>```central```</id>```
        ```<url>```https://repo.maven.apache.org/maven2/```</url>```
    `</pluginRepository>`
`</pluginRepositories>`
```

### 4.3. 修复_pom.xml_中的_repositories_部分

_pom.xml_文件还包含一个仓库部分，我们需要使用带有HTTPS的URL：

```
`<repositories>`
    `<repository>`
        ```<id>```central```</id>```
        `<name>`Central Repository`</name>`
        ```<url>```https://repo.maven.apache.org/maven2```</url>```
        `<layout>`default`</layout>`
        `<snapshots>`
            `<enabled>`false`</enabled>`
        `</snapshots>`
    `</repository>`
`</repositories>`
```

在进行这些更改后，Maven应该通过HTTPS下载依赖项。

## 5. 当构建环境不支持HTTPS时的修复

有时，我们可能会遇到技术限制，例如在构建环境中使用JDK6或缺乏HTTPS支持。**这些限制可能会阻碍我们过渡到HTTPS。**

**为了支持这些场景，Maven团队已经建立了一个专用域用于不安全流量。我们可以将所有现有引用替换为此URL，以便于通过HTTP下载。**

## 6. 结论

在本教程中，我们探讨了解决“返回代码是：501，原因短语：HTTPS Required”错误的方法。首先，我们了解了错误的基本信息。

之后，我们通过更新Maven版本或修复_settings.xml_文件来查看修复方法。