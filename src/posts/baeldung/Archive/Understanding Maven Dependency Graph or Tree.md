---
date: 2024-06-15
category:
  - Maven
  - 依赖管理
tag:
  - Maven
  - 依赖树
  - 依赖图
---
# Maven依赖图或树的理解

在处理大型Maven项目时可能会感到畏惧，同时跟踪所有模块和库之间的依赖关系并解决它们之间的冲突也是一个挑战。

在本教程中，我们将学习有关Maven依赖图或树的知识。首先，我们将了解如何创建依赖树，过滤依赖项，并创建不同的输出格式。接下来，我们将讨论以图形方式查看依赖树的不同方法。

## 2. 项目设置

在现实生活的项目中，依赖树会迅速增长并变得复杂。然而，对于我们的示例，我们将创建一个包含两个模块_module1_和_module2_的小项目，每个模块都有两到三个依赖项。此外，_module1_依赖于_module2_。

我们将创建我们的第一个模块_module2，并添加_commons-collections, slf4j-api, spring-bean_和_junit_依赖项：

```xml
``<dependencies>``
    ````````<dependency>````````
        ````````<groupId>````````commons-collections````````</groupId>````````
        ````````<artifactId>````````commons-collections````````</artifactId>````````
        ````````<version>````````3.2.2````````</version>````````
    ````````</dependency>````````
    ````````<dependency>````````
        ````````<groupId>````````org.slf4j````````</groupId>````````
        ````````<artifactId>````````slf4j-api````````</artifactId>````````
        ````````<version>````````1.7.25````````</version>````````
    ````````</dependency>````````
    ````````<dependency>````````
        ````````<groupId>````````org.springframework````````</groupId>````````
        ````````<artifactId>````````spring-bean````````</artifactId>````````
        ````````<version>````````6.1.1````````</version>````````
    ````````</dependency>````````
    ````````<dependency>````````
        ````````<groupId>````````junit````````</groupId>````````
        ````````<artifactId>````````junit````````</artifactId>````````
        ````````<version>````````4.13.2````````</version>````````
        `<scope>`test`</scope>`
    ````````</dependency>````````
``</dependencies>``
```

现在，我们创建一个新的模块_module1，并添加_commons-collections, spring-core, slf4j-api,_以及我们的_module2_作为依赖项：

```xml
``<dependencies>``
    ````````<dependency>````````
        ````````<groupId>````````commons-collections````````</groupId>````````
        ````````<artifactId>````````commons-collections````````</artifactId>````````
        ````````<version>````````3.2.2````````</version>````````
    ````````</dependency>````````
    ````````<dependency>````````
        ````````<groupId>````````org.springframework````````</groupId>````````
        ````````<artifactId>````````spring-core````````</artifactId>````````
        ````````<version>````````6.1.1````````</version>````````
    ````````</dependency>````````
    ````````<dependency>````````
        ````````<groupId>````````org.slf4j````````</groupId>````````
        ````````<artifactId>````````slf4j-api````````</artifactId>````````
        ````````<version>````````1.7.25````````</version>````````
    ````````</dependency>````````
    ````````<dependency>````````
        ````````<groupId>````````com.baeldung.module2````````</groupId>````````
        ````````<artifactId>````````module2````````</artifactId>````````
        ````````<version>````````1.0````````</version>````````
    ````````</dependency>````````
``</dependencies>``
```

我们在这里不关心库的功能，而是关心它们是如何为我们的项目派生的，以检测版本冲突，识别不必要的依赖项，解决构建或运行时问题，并可视化依赖树。

## 3. 分析依赖图或树的方法

有多种方法可以分析依赖树或图。

### 3.1. 使用Maven依赖插件

_maven-dependency-plugin_默认以文本格式显示给定项目的依赖树。

让我们在_module2_目录下运行Maven命令以获取我们的_module2_的依赖树：

```shell
$ mvn dependency:tree
// 输出片段
[INFO] com.baeldung.module2:module2:jar:1.0
[INFO] +- commons-collections:commons-collections:jar:3.2.2:compile
[INFO] +- org.slf4j:slf4j-api:jar:1.7.25:compile
[INFO] +- org.springframework:spring-beans:jar:6.1.1:compile
[INFO] |  \- org.springframework:spring-core:jar:6.1.1:compile
[INFO] |     \- org.springframework:spring-jcl:jar:6.1.1:compile
[INFO] \- junit:junit:jar:4.13.2:test
[INFO]    \- org.hamcrest:hamcrest-core:jar:1.3:test
```

现在，让我们在_module1_目录下运行Maven命令以获取其依赖树：

```shell
$ mvn dependency:tree
// 输出片段
[INFO] com.baeldung.module1:module1:jar:1.0
[INFO] +- commons-collections:commons-collections:jar:3.2.2:compile
[INFO] +- org.springframework:spring-core:jar:6.1.1:compile
[INFO] |  \- org.springframework:spring-jcl:jar:6.1.1:compile
[INFO] +- org.slf4j:slf4j-api:jar:1.7.25:compile
[INFO] \- com.baeldung.module2:module2:jar:1.0:compile
[INFO]    \- org.springframework:spring-beans:jar:6.1.1:compile
```

默认情况下，输出是以文本格式，我们可以看到依赖项是如何被包含在我们的项目中的。

**我们可以通过使用这个插件来过滤依赖树输出，通过排除或包括特定的构件。**

例如，如果我们只需要在依赖树中包括_slf4j_，我们可以使用_-Dinclude_选项来包括所有依赖项：

```shell
$ mvn dependency:tree -Dincludes=org.slf4j
//输出
[INFO] com.baeldung.module1:module1:jar:1.0
[INFO] \- org.slf4j:slf4j-api:jar:1.7.25:compile
```

如果我们需要在树中排除_slf4j_，我们可以使用_-Dexcludes_选项来排除所有依赖项：

```shell
$ mvn dependency:tree -Dexcludes=org.slf4j
//输出
[INFO] com.baeldung.module1:module1:jar:1.0
[INFO] +- commons-collections:commons-collections:jar:3.2.2:compile
[INFO] +- org.springframework:spring-core:jar:6.1.1:compile
[INFO] |  \- org.springframework:spring-jcl:jar:6.1.1:compile
[INFO] \- com.baeldung.module2:module2:jar:1.0:compile
[INFO]    \- org.springframework:spring-beans:jar:6.1.1:compile
```

现在，如果我们需要**详细分析所有依赖项，我们可以使用_-Dverbose_选项**：

```shell
$ mvn dependency:tree -Dverbose
//输出
[INFO] com.baeldung.module1:module1:jar:1.0
[INFO] +- commons-collections:commons-collections:jar:3.2.2:compile
[INFO] +- org.springframework:spring-core:jar:6.1.1:compile
[INFO] |  \- org.springframework:spring-jcl:jar:6.1.1:compile
[INFO] +- org.slf4j:slf4j-api:jar:1.7.25:compile
[INFO] \- com.baeldung.module2:module2:jar:1.0:compile
[INFO]    +- (commons-collections:commons-collections:jar:3.2.2:compile - omitted for duplicate)
[INFO]    +- (org.slf4j:slf4j-api:jar:1.7.25:compile - omitted for duplicate)
[INFO]    \- org.springframework:spring-beans:jar:6.1.1:compile
[INFO]       \- (org.springframework:spring-core:jar:6.1.1:compile - omitted for duplicate)
```

在这里，我们可以看到_module1_中的_spring-core_被选取，而_module2_中的被移除了。

此外，对于复杂项目，阅读这种格式是繁琐的。**这个插件允许我们创建另一种输出格式，如_dot_, _graphml_, 或 _tgf_，从相同的依赖树。** 稍后可以使用不同的编辑器可视化这些输出格式。

现在，让我们以_graphml_格式获取相同的依赖树，并将输出存储在_dependency.graphml_：

```shell
$ mvn dependency:tree -DoutputType=graphml -DoutputFile=dependency.graphml
```

在这里，我们可以使用任何在线可用的_graphml_阅读器工具来可视化依赖树。

对于我们的示例，我们将使用yED编辑器。我们可以在_yED_编辑器中导入_dependency.graphml_文件。虽然_yED_默认不格式化图表，但它提供了我们可以使用的多种格式。

要自定义，我们将转到_Layout_ > _Hierarchic_ > _Orientation_ > _Left to Right_ > _Apply_。我们也可以按照我们的需求在工具上进行许多其他自定义：

### 3.2. 使用Eclipse/IntelliJ等IDE

大多数开发人员使用Eclipse和IntelliJ等IDE，这些IDE具有MJD依赖树插件。首先，我们将从Eclipse的_m2e_插件开始，它提供了一个有用的依赖视图。

安装插件（如果尚未完成），我们将打开_module1_的_pom.xml_并从标签中选择_Dependency Hierarchy_。左侧显示了我们项目中的jar的层次结构（与_-Dverbose_输出相同）。解析后的列表显示在右侧。这些是我们项目中使用的jar：

IntelliJ还具有依赖分析工具。**默认的IntelliJ IDEA社区版提供了与Eclipse_m2e_插件相似的视图**。我们需要选择项目，右键单击它，并选择_Dependency Analyser_：

然而，IntelliJ IDEA Ultimate提供了更多选项和更高级的图形。为此，我们选择_module1_项目，右键单击它，选择_Maven_，然后单击_Show Diagram_：

### 3.3. 使用第三方库

我们有一些第三方工具可以帮助分析大型依赖树。它们可以导入使用_mvn dependency:tree_创建的_graphml_文件，并进一步使用它以可视化方式分析图表。

以下是我们可以用来可视化复杂依赖树的一些工具：

- yworks
- depgraph-maven-plugin
- pom-explorer

## 4. 结论

在本文中，我们讨论了如何获取Maven项目的依赖树，并学习了如何过滤依赖树。后来，我们看了一些工具和插件来可视化依赖树。

如常，所有示例的完整源代码可在GitHub上获得。
OK