---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Java Source
  - Java Target
head:
  - - meta
    - name: keywords
      content: Java, Java Source, Java Target, Cross-Compilation
---
# Java源和目标选项指南

在本教程中，我们将探索Java提供的`-source`和`-target`选项。此外，我们还将学习这些选项在Java 8中的工作方式以及从Java 9开始它们是如何发展的。

## 2. 与旧版Java的向后兼容性
由于Java的频繁发布和更新，应用程序可能无法每次都迁移到新版本。有时，应用程序需要确保它们的代码与旧版本的Java向后兼容。`javac`中的`-source`和`-target`选项使这变得容易。

为了详细了解这一点，我们首先创建一个示例类，并使用Java 9中添加的`List.of()`方法，但在Java 8中不存在：

```java
public class TestForSourceAndTarget {
    public static void main(String[] args) {
        System.out.println(List.of("Hello", "Baeldung"));
    }
}
```

假设我们使用Java 9编译代码，并希望与Java 8兼容。

我们可以使用`-source`和`-target`实现这一点：

```shell
/jdk9path/bin/javac TestForSourceAndTarget.java -source 8 -target 8
```

现在，在编译时我们得到了一个警告，但编译成功：

```shell
warning: [options] bootstrap class path not set in conjunction with -source 8
1 warning
```

让我们用Java 8运行代码，我们可以看到错误：

```shell
$ /jdk8path/bin/java TestForSourceAndTarget
Exception in thread "main" java.lang.NoSuchMethodError: 
  java.util.List.of(Ljava/lang/Object;Ljava/lang/Object;)Ljava/util/List;
  at com.baeldung.TestForSourceAndTarget.main(TestForSourceAndTarget.java:7)
```

在Java 8中，`List.of()`不存在。理想情况下，Java应该在编译时抛出这个错误。然而，在编译期间，我们只得到了一个警告。

让我们来看一下我们在编译期间收到的警告。`javac`告诉我们，引导类路径没有与`-source 8`一起设置。事实证明，**我们必须提供引导类文件路径，以便`javac`可以为交叉编译选择正确的文件。** 在我们的例子中，我们希望与Java 8兼容，但Java 9的引导类默认被选中了。

为了使其工作，**我们必须使用`-Xbootclasspath`指向所需交叉编译的Java版本的路径**：

```shell
/jdk9path/bin/javac TestForSourceAndTarget.java -source 8 -target 8 -Xbootclasspath ${jdk8path}/jre/lib/rt.jar
```

现在，让我们编译它，我们可以看到编译时的错误：

```shell
TestForSourceAndTarget.java:7: error: cannot find symbol
        System.out.println(List.of("Hello", "Baeldung"));
                                ^
  symbol:   method of(String,
String)
  location: interface List
1 error
```

## 3. 源选项
**`-source`选项指定编译器接受的Java源代码版本：**

```shell
/jdk9path/bin/javac TestForSourceAndTarget.java -source 8 -target 8
```

如果没有`-source`选项，编译器将根据使用的Java版本编译源代码。

在我们的示例中，如果没有提供`-source 8`，编译器将根据Java 9规范编译源代码。

`-source`值8还意味着我们不能使用任何特定于Java 9的API。为了使用Java 9中引入的任何API，如`List.of()`，我们必须将源选项的值设置为9。

## 4. 目标选项
**目标选项指定要生成的类文件的Java版本。目标版本必须等于或高于源选项：**

```shell
/jdk9path/bin/javac TestForSourceAndTarget.java -source 8 -target 8
```

在这里，**`-target`值8意味着这将生成一个需要Java 8或更高版本才能运行的类文件**。

如果我们在Java 7上运行上述类文件，我们将得到一个错误。

## 5. Java 8及更早版本中的源和目标
**正如我们从示例中看到的，直到Java 8，要正确进行交叉编译，我们需要提供三个选项，即`-source`、`-target`和`-Xbootclasspath`。** 例如，如果我们使用Java 9构建代码，但它需要与Java 8兼容：

```shell
/jdk9path/bin/javac TestForSourceAndTarget.java -source 8 -target 8 -Xbootclasspath ${jdk8path}/jre/lib/rt.jar
```

从JDK 8开始，使用1.5或更早的源或目标已被弃用，在JDK 9中，对1.5或更早的源或目标的支持被完全移除。

## 6. Java 9及更高版本中的源和目标
**尽管在Java 8中交叉编译工作得很好，但需要三个命令行选项。** 当我们有三个选项时，保持它们全部更新可能会很困难。

**作为Java 9的一部分，引入了`-release`选项以简化交叉编译过程。** 使用`-release`选项，我们可以完成与之前选项相同的交叉编译。

让我们使用`-release`选项编译我们之前的示例类：

```shell
/jdk9path/bin/javac TestForSourceAndTarget.java —release 8
```

```shell
TestForSourceAndTarget.java:7: error: cannot find symbol
        System.out.println(List.of("Hello", "Baeldung"));
                                ^
  symbol:   method of(String,String)
  location: interface List
1 error
```

显然，编译时只需要一个选项`-release`，错误表明`javac`内部为`-source`、`-target`和`-Xbootclasspath`分配了正确的值。

## 7. 结论
在本文中，我们学习了`javac`的`-source`和`-target`选项以及它们与交叉编译的关系。此外，我们还了解了它们在Java 8及以后版本中的使用方式。我们还学习了Java 9中引入的`-release`选项。