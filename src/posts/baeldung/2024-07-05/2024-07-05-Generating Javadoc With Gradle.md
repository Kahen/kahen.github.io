---
date: 2023-05-01
category:
  - Java
  - Gradle
tag:
  - Javadoc
  - 文档生成
head:
  - - meta
    - name: keywords
      content: Java, Gradle, Javadoc, 文档生成, 构建自动化
---
# 使用Gradle生成Javadoc

众所周知，创建清晰全面的文档对于代码维护至关重要。在Java中，我们可以通过使用Javadoc来实现这一点，Javadoc是一个文档生成器，它可以从Java源代码注释创建HTML文件。

在本教程中，我们将学习如何使用Gradle生成Javadoc，Gradle是一个流行的构建自动化工具。

## 2. 设置Gradle项目

简单来说，设置Gradle项目非常容易。首先，我们需要在我们的机器上安装Gradle构建工具。接下来，让我们创建一个空文件夹，并通过终端切换到该文件夹。然后，让我们通过终端初始化一个新的Gradle项目：

```shell
$ gradle init
```

该命令会询问我们一些问题以设置项目。我们将选择应用程序模板作为生成项目的类型。接下来，我们将选择Java作为实现语言，Groovy作为构建脚本。最后，我们将使用默认的测试框架，即JUnit 4，并为我们的项目命名。

**或者，我们也可以使用IntelliJ IDEA生成Gradle项目**。为此，我们创建一个新项目并选择Gradle作为构建系统。它会自动生成所需的所有文件夹的项目。

## 3. 项目设置

初始化Gradle项目后，让我们使用我们喜欢的IDE打开项目。接下来，我们将创建一个名为‘_addition_’的新包，并添加一个名为_Sum_的类：

```java
package com.baeldung.addition

/**
 * 这是一个示例类，展示了Javadoc注释。
 */
public class Sum {
    /**
     * 此方法返回两个整数的和。
     *
     * @param a 第一个整数
     * @param b 第二个整数
     * @return a和b的和
     */
    public int add(int a, int b) {
        return a + b;
    }
}
```

这个类展示了简单的加法功能。我们创建了一个_add()_方法，它接受两个参数并返回参数的和。

此外，我们在注释中添加了引言文档注释，并在注释中描述了_add()_方法。我们指定了它所接受的参数以及它返回的值。

接下来，让我们创建另一个名为‘_subtraction_’的包，并添加一个名为_Difference_的类：

```java
package com.baeldung.subtraction

/**
 * 这是一个示例类，展示了Javadoc注释。
 */
public class Difference {
    /**
     * 此方法返回两个整数之间的差。
     *
     * @param a 第一个整数
     * @param b 第二个整数
     * @return a和b之间的差
     */
    public int subtract(int a, int b) {
        return a - b;
    }
}
```

这个类展示了一个简单的方法，用于找出两个_Integer_之间的差异。

在下一节中，我们将学习如何通过指定要包含和排除的包来生成Javadoc。

## 5. 使用Gradle生成Javadoc

现在我们已经有一个带有文档注释的示例项目，我们希望通过Gradle生成Javadoc。为此，我们需要向_gradle.build_文件添加一些配置。该文件包含项目的配置，如插件、依赖项、项目组、版本等。

首先，让我们将Java插件应用到项目中：

```groovy
plugins {
    id 'java'
}
```

这告诉Gradle使用Java插件。**Java插件使开发Java应用程序变得更加容易，并提供了编译、代码测试、Javadoc任务等功能**。

此外，我们将为Javadoc任务向_gradle.build_文件添加代码：

```groovy
javadoc {
    destinationDir = file("${buildDir}/docs/javadoc")
}
```

这配置了Javadoc任务，并指定了存储生成文档的构建目录。

我们还可以**配置Javadoc任务在运行任务时包含和排除包**：

```groovy
javadoc {
    destinationDir = file("${buildDir}/docs/javadoc")
    include 'com/baeldung/addition/**'
    exclude 'com/baeldung/subtraction/**'
}
```

在这里，我们包含了_addition_包并排除了_subtraction_包。**_include_和_exclude_属性允许我们选择我们想要在Javadoc任务中的包**。

最后，要生成文档，让我们打开终端并切换到根文件夹。然后，让我们运行Gradle构建命令：

```shell
./gradlew javadoc
```

此命令执行Javadoc任务，并以HTML格式生成文档。HTML文件存储在指定的文件夹中。

这是一个HTML文件文档的示例：

![img](https://www.baeldung.com/wp-content/uploads/2023/05/gradle-generated-documentation-1.png)

## 6. 结论

在本文中，我们学习了如何使用Gradle构建系统生成Javadoc。此外，我们还看到了如何为两个Java类编写文档注释。我们还学习了如何配置Javadoc以包含和排除包。

如往常一样，示例的完整源代码可在GitHub上获得。