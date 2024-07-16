---
date: 2022-06-01
category:
  - Maven
  - Repository
tag:
  - Maven Snapshot
  - Maven Release
head:
  - - meta
    - name: keywords
      content: Maven, Snapshot, Release, Repository
---
# Maven快照仓库与发布仓库的区别

在本教程中，我们将解释Maven快照仓库和发布仓库之间的区别。

## 2. Maven仓库概述

Maven仓库包含了一系列预编译的构件，我们可以在应用程序中作为依赖项使用。对于传统的Java应用程序，这些通常是_.jar_文件。

通常有两种类型的仓库：本地和远程。

本地仓库是Maven在构建计算机上创建的仓库。它通常位于_$HOME/.m2/repository_目录下。

当我们构建应用程序时，Maven会在本地仓库中搜索依赖项。如果找不到某个特定的依赖项，Maven会在远程仓库中搜索（定义在_settings.xml_或_pom.xml_文件中）。此外，它会将依赖项复制到我们的本地仓库以供将来使用。

我们还可以基于构件类型区分快照和发布仓库。

快照仓库是用于增量、未发布构件版本的仓库。

**快照版本是尚未发布的版本。** 通常的想法是在发布版本之前拥有一个快照版本。它允许我们逐步部署相同的瞬时版本，而无需要求项目升级它们正在使用的构件版本。这些项目可以使用相同的版本来获取更新的快照版本。

例如，在发布版本_1.0.0_之前，我们可以拥有它的快照版本。快照版本的版本号后有_SNAPSHOT_后缀（例如，_1.0.0-SNAPSHOT_）。

### 3.1. 部署构件

持续开发通常使用快照版本控制。有了快照版本，我们可以部署一个包含时间戳和构建号的数字的构件。

假设我们有一个正在开发中的项目，具有_SNAPSHOT_版本：

```
`````<groupId>`````com.baeldung`````</groupId>`````
`````<artifactId>`````maven-snapshot-repository`````</artifactId>`````
`````<version>`````1.0.0-SNAPSHOT`````</version>`````
```

我们将把项目部署到一个自托管的Nexus仓库。

首先，让我们定义我们想要部署构件的发布仓库信息。我们可以使用分发管理插件：

```
``<distributionManagement>``
    ``<snapshotRepository>``
        `````<id>`````nexus`````</id>`````
        `````<name>`````nexus-snapshot`````</name>`````
        `````<url>`````http://localhost:8081/repository/maven-snapshots/`````</url>`````
    ``</snapshotRepository>``
``</distributionManagement>``
```

进一步，我们将使用_mvn deploy_命令部署我们的项目。

**部署后，实际构件的版本将包含时间戳值而不是_SNAPSHOT_值。** 例如，当我们部署_1.0.0-SNAPSHOT_时，实际值将包含当前的时间戳和构建号（例如，_1.0.0-20220709.063105-3_）。

时间戳值在构件部署期间计算。Maven生成校验和并上传具有相同时间戳的构件文件。

_maven-metadata.xml_文件保存了快照版本及其链接到最新时间戳值的精确信息：

```
`<metadata modelVersion="1.1.0">`
    `````<groupId>`````com.baeldung`````</groupId>`````
    `````<artifactId>`````maven-snapshot-repository`````</artifactId>`````
    `````<version>`````1.0.0-SNAPSHOT`````</version>`````
    `<versioning>`
        `<snapshot>`
            `<timestamp>`20220709.063105`</timestamp>`
            `<buildNumber>`3`</buildNumber>`
        `</snapshot>`
        `<lastUpdated>`20220709063105`</lastUpdated>`
        `<snapshotVersions>`
            ``<snapshotVersion>``
                ``<extension>``jar``</extension>``
                ``<value>``1.0.0-20220709.063105-3``</value>``
                ``<updated>``20220709063105``</updated>``
            ``</snapshotVersion>``
            ``<snapshotVersion>``
                ``<extension>``pom``</extension>``
                ``<value>``1.0.0-20220709.063105-3``</value>``
                ``<updated>``20220709063105``</updated>``
            ``</snapshotVersion>``
        `</snapshotVersions>`
    `</versioning>`
`</metadata>`
```

元数据文件有助于从快照版本到时间戳值的转换管理。

每次我们在相同的快照版本下部署项目时，Maven都会生成包含新时间戳值和新构建号的版本。

### 3.2. 下载构件

在下载快照构件之前，Maven会下载其关联的_maven-metadata.xml_文件。这样，Maven可以根据时间戳值和构建号检查是否有更新的版本。

**即使使用_SNAPSHOT_版本，也可以检索此类构件。**

要从仓库下载构件，首先，我们需要定义一个依赖仓库：

```
`<repositories>`
    ```<repository>```
        `````<id>`````nexus`````</id>`````
        `````<name>`````nexus-snapshot`````</name>`````
        `````<url>`````http://localhost:8081/repository/maven-snapshots/`````</url>`````
        ```<snapshots>```
            ````<enabled>````true````</enabled>````
        ```</snapshots>```
        `<releases>`
            ````<enabled>````false````</enabled>````
        `</releases>`
    ```</repository>```
`</repositories>`
```

**快照版本默认不启用。** 我们需要手动启用它们：

```
```<snapshots>```
    ````<enabled>````true````</enabled>````
```</snapshots>```
```

通过启用快照，我们可以定义多久检查一次_SNAPSHOT_构件的更新版本。然而，默认的更新策略设置为每天一次。我们可以通过设置不同的更新策略来覆盖此行为：

```
```<snapshots>```
    ````<enabled>````true````</enabled>````
    `<updatePolicy>`always`</updatePolicy>`
```</snapshots>```
```

我们可以在_updatePolicy_元素内放置四种不同的值：

- _always_ — 每次检查更新版本
- _daily_ （默认值）— 每天检查一次更新版本
- _interval:mm_ — 根据设置的分钟间隔检查更新版本
- _never_ — 永远不要尝试获取更新版本（与我们本地已有的相比）

此外，而不是定义_updatePolicy_，我们可以通过在命令中传递-U参数来强制更新所有快照构件：

```
mvn install -U
```

此外，如果依赖项已经被下载并且校验和与我们本地已有的相同，则不会重新下载依赖项。

接下来，我们可以将快照版本的构件添加到我们的项目中：

```
``<dependencies>``
    ``<dependency>``
        `````<groupId>`````com.baeldung`````</groupId>`````
        `````<artifactId>`````maven-snapshot-repository`````</artifactId>`````
        `````<version>`````1.0.0-SNAPSHOT`````</version>`````
    ``</dependency>``
``</dependencies>``
```

**在开发阶段使用快照版本可以防止有多个版本的构件。** 我们可以使用相同的_SNAPSHOT_版本，其构建将包含在给定时间的我们的代码快照。

## 4. 发布仓库

发布仓库包含构件的最终版本（发布版）。简单来说，发布构件代表其内容不应被修改的构件。

发布仓库默认为我们在_settings.xml_或_pom.xml_文件中定义的所有仓库启用。

### 4.1. 部署构件

现在，让我们在本地Nexus仓库中部署项目。假设我们已经完成了开发并准备发布项目：

```
`````<groupId>`````com.baeldung`````</groupId>`````
`````<artifactId>`````maven-release-repository`````</artifactId>`````
`````<version>`````1.0.0`````</version>`````
```

让我们在分发管理器中定义发布仓库：

```
``<distributionManagement>``
    ```<repository>```
        `````<id>`````nexus`````</id>`````
        `````<name>`````nexus-release`````</name>`````
        `````<url>`````http://localhost:8081/repository/maven-releases/`````</url>`````
    ```</repository>```
    ``<snapshotRepository>``
        `````<id>`````nexus`````</id>`````
        `````<name>`````nexus-snapshot`````</name>`````
        `````<url>`````http://localhost:8081/repository/maven-snapshots/`````</url>`````
    ``</snapshotRepository>``
``</distributionManagement>``
```

一旦我们从项目版本中移除_SNAPSHOT_这个词，发布仓库将在部署期间自动被选择而不是快照仓库。

此外，如果我们想要在相同版本下重新部署构件，我们可能会得到一个错误：“_仓库不允许更新资产_”。**一旦我们部署了发布的构件版本，我们就不能更改其内容。** 因此，为了解决这个问题，我们只需要简单地发布下一个版本。

### 4.2. 下载构件

Maven默认从Maven中央仓库查找组件。这个仓库默认使用发布版本策略。

**发布仓库只会解析发布的构件。** 换句话说，它应该只包含已经发布且内容在未来不应更改的构件版本。

如果我们想要下载发布的构件，我们需要定义仓库：

```
```<repository>```
    `````<id>`````nexus`````</id>`````
    `````<name>`````nexus-release`````</name>`````
    `````<url>`````http://localhost:8081/repository/maven-releases/`````</url>`````
```</repository>```
```

最后，让我们简单地将发布的版本添加到我们的项目中：

```
``<dependencies>``
    ``<dependency>``
        `````<groupId>`````com.baeldung`````</groupId>`````
        `````<artifactId>`````maven-release-repository`````</artifactId>`````
        `````<version>`````1.0.0`````</version>`````
    ``</dependency>``
``</dependencies>``
```

## 5. 结论

在本教程中，我们学习了M