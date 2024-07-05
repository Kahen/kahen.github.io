---
date: 2022-04-01
category:
  - Gradle
  - Maven
tag:
  - 依赖管理
  - 版本控制
head:
  - - meta
    - name: keywords
      content: Gradle, Maven, 依赖版本声明, 构建工具, JVM项目
---
# Gradle中不同的依赖版本声明方式

Gradle是JVM项目中最流行的构建工具之一。它提供了多种方式来声明和控制我们的依赖版本。

在这个简短的教程中，我们将看到如何在Gradle中定义最新的依赖版本。

首先，我们将探讨我们可能想要定义依赖版本的不同方式。然后，我们将创建一个小的Gradle项目，在其中我们将指定一些第三方库。最后，我们将分析Gradle的依赖树，并看看Gradle如何处理不同的版本声明。

### 2.1 精确版本声明
这是声明依赖版本的最直接方式。我们所要做的就是指定我们想要在应用程序中使用的确切版本，例如_1.0_。

大多数官方依赖通常只使用数字版本，如_3.2.1._。然而，依赖版本是一个字符串，所以它也可以包含字符。例如，Spring有一个版本是_5.2.22.RELEASE_。

### 2.2 Maven风格的版本范围
如果我们不想指定确切的依赖版本，我们可以使用Maven风格的版本范围，例如_\[1.0, 2.0), (1.0, 2.0)_。

方括号_\[_和_\]_表示包含边界。相反，圆括号_(_)和_)_表示不包含边界。此外，我们可以在版本声明中混合使用不同的括号。

### 2.3 前缀/通配符版本范围
我们可以使用+通配符来指定依赖版本范围 - 例如，_1.+._。**Gradle将寻找版本与+通配符前的部分完全匹配的依赖项**。

### 2.4 使用_latest_版本关键字
Gradle为我们的任何依赖提供了两个特殊的版本关键字：
- _latest.integration_将匹配最高版本的SNAPSHOT模块
- _latest.release_将匹配最高版本的非SNAPSHOT模块

### 3. 版本范围的优缺点
使用Maven风格或通配符版本范围作为依赖版本可能很有用。然而，我们必须考虑这种方法的优缺点。

版本范围的最大优势是**我们总是有最新的依赖可用**。我们不必每次构建应用程序时都搜索新的依赖版本。

然而，总是有最新的依赖可用也可能是一个很大的劣势。**我们的应用程序可能因为应用程序中使用的某些第三方依赖的新版本在版本之间更改了行为而从一个构建到下一个构建行为不同**，而我们却没有意识到。

根据我们的要求，为依赖指定版本范围可能很有帮助。然而，在使用之前，我们必须小心并确定依赖项遵循的版本算法。

### 4. 创建测试应用程序
让我们创建一个简单的Gradle应用程序，尝试使用不同版本声明的几个依赖项。

我们的应用程序将只包含一个文件，_build.gradle_：

```groovy
plugins {
    id 'java'
}

group = "com.baeldung.gradle"
version = "1.0.0-SNAPSHOT"
sourceCompatibility = JavaVersion.VERSION_17

repositories {
    mavenLocal()
    mavenCentral()
}

dependencies {
}
```

接下来，我们将添加一些具有不同版本声明的_org.apache.commons_依赖项。

让我们从最简单的精确版本开始：

```groovy
implementation group: 'org.apache.commons', name: 'commons-lang3', version: '3.12.0'
```

现在，让我们使用Maven风格的版本范围：

```groovy
implementation group: 'org.apache.commons', name: 'commons-math3', version: '[3.4, 3.5)'
```

这里我们指定，我们想要一个commons-math3依赖项，其版本将在3.4（包含）到3.5（不包含）之间。

下一个依赖项将使用通配符版本范围：

```groovy
implementation group: 'org.apache.commons', name: 'commons-collections4', version: '4.+'
```

我们希望拥有最新版本的commons-collections4依赖项，其版本与4.+前缀匹配。

最后，让我们使用Gradle的_latest.release_关键字：

```groovy
implementation group: 'org.apache.commons', name: 'commons-text', version: 'latest.release'
```

这是我们的完整依赖项部分，来自_build.gradle_文件：

```groovy
dependencies {
    implementation group: 'org.apache.commons', name: 'commons-lang3', version: '3.12.0'
    implementation group: 'org.apache.commons', name: 'commons-math3', version: '[3.4, 3.5)'
    implementation group: 'org.apache.commons', name: 'commons-collections4', version: '4.+'
    implementation group: 'org.apache.commons', name: 'commons-text', version: 'latest.release'
}
```

现在，让我们看看Gradle如何解决我们的版本声明。

### 5. 显示依赖树
让我们使用Gradle的_dependencies_任务来查看依赖报告：

```shell
$ gradle dependencies

compileClasspath - Compile classpath for source set 'main'.
+--- org.apache.commons:commons-lang3:3.12.0
+--- org.apache.commons:commons-collections4:4.+ -> 4.4
+--- org.apache.commons:commons-math3:[3.4, 3.5) -> 3.4.1
\--- org.apache.commons:commons-text:latest.release -> 1.10.0
```

在编写本文时，与指定范围匹配的最新commons-math3依赖项版本是3.4.1。我们可以看到Gradle使用了该版本。

此外，4.4是与4.+通配符匹配的最新commons-collections4版本。

同样，1.10.0是commons-text依赖项的最新发布版本。

### 6. 结论
在本文中，我们学习了如何在Gradle中以多种方式声明依赖版本。

首先，我们看到了如何在Gradle构建脚本中指定确切的依赖版本以及版本范围。然后，我们尝试了几种表达依赖项的方式。

最后，我们检查了Gradle如何解决这些版本。

如往常一样，示例代码可在GitHub上找到。