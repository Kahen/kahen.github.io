---
date: 2022-04-01
category:
  - Gradle
  - Build Automation
tag:
  - Gradle
  - Build Scripts
  - Build Automation
head:
  - - meta
    - name: keywords
      content: Gradle, Build Scripts, Build Automation, Tutorial
------
# Gradle构建脚本块

1. 概述

在本教程中，我们将学习Gradle构建脚本块（在_build.gradle_文件中的脚本）并详细了解_buildScript_块的目的。

2. 引言

2.1. Gradle是什么？

它是一个构建自动化工具，可以执行编译、打包、测试、部署、发布、依赖解析等任务。如果没有这个工具，我们将不得不手动执行这些任务，这相当复杂且耗时。在当今的软件开发中，很难不使用这样的构建工具。

2.2. Gradle的常见构建脚本块

在这一部分，我们将简要了解最常见的构建脚本块。_allProjects_、_subProjects_、_plugins_、_dependencies_、_repositories_、_publishing_和_buildScript_是最常见的构建脚本块。给出的列表介绍了这些块的概念：

- _allProjects_块配置根项目和每个子项目。
- _subProjects_块与_allProjects_不同，只配置子项目。
- _plugins_通过引入一组有用的功能来扩展Gradle的功能。例如，_java_插件添加了assemble、build、clean、jar、documentation等任务，等等。
- 顾名思义，_dependencies_是声明项目所需的所有jar的地方。
- _repositories_块包含Gradle将从哪里下载_dependencies_块中声明的jar的位置。可以声明多个位置，按声明顺序执行。
- 当我们开发一个库并希望发布它时，声明_publishing_块。这个块包含库jar的坐标和包含发布位置的_repositories_块。

现在，让我们考虑一个用例，我们想在构建脚本中使用一个库。在这种情况下，我们不能使用_dependencies_块，因为它包含项目类路径上所需的jar。

由于我们想在构建脚本本身中使用该库，因此需要将此库添加到脚本类路径上。这就是_buildScript_的作用。下一节将深入讨论_buildScript_块，并提供用例。

3. BuildScript块的目的

考虑到上述定义的用例，假设在Spring Boot应用程序中，我们想在构建脚本中读取application.yml文件中定义的属性。为了实现这一点，我们可以使用一个名为_snakeyaml_的库，该库解析YAML文件并轻松读取属性。

正如我们在上一节中讨论的，我们需要将此库添加到脚本类路径上。解决方案是在_buildScript_块中将其添加为依赖。

脚本显示如何读取application.yml文件中的_temp.files.path_属性。_buildScript_块包含_snakeyaml_库的依赖项和下载它的_repositories_位置：

```
import org.yaml.snakeyaml.Yaml

buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath group: 'org.yaml', name: 'snakeyaml', version: '1.19'
    }
}

plugins {
    //plugins
}

def prop = new Yaml().loadAll(new File("$projectDir/src/main/resources/application.yml")
  .newInputStream()).first()
var path = prop.temp.files.path
```

path变量包含_temp.files.path_的值。

更多关于_buildScript_块的信息：

- 它可以包含任何类型的依赖项，除了项目类型依赖项。
- 对于多项目构建，声明的依赖项对所有子项目的构建脚本都可用。
- 要将作为外部jar可用的二进制插件添加到项目中，我们应该将其添加到构建脚本类路径上，然后应用插件。

4. 结论

在本教程中，我们学习了Gradle的使用，构建脚本最常见的块的目的，并深入研究了_buildScript_块及其用例。