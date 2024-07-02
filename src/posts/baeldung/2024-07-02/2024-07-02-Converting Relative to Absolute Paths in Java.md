---
date: 2022-04-01
category:
  - Java
  - 文件处理
tag:
  - Java
  - 文件路径
  - 绝对路径
head:
  - - meta
    - name: keywords
      content: Java, 相对路径, 绝对路径, 文件处理
---
# Java中将相对路径转换为绝对路径

在Java中处理文件路径是一项常见任务，有时我们需要将相对路径转换为绝对路径，出于各种原因。无论是处理文件操作、访问资源还是导航目录，知道如何将相对路径转换为绝对路径都至关重要。

在本教程中，我们将探索在Java中实现这种转换的不同方法。

### 2.1 使用Paths类
Java 7中引入的java.nio.file包提供了Paths类，它提供了一种方便的方式来操作文件和目录路径。

让我们使用Paths类将相对路径转换为绝对路径：

```java
String relativePath = "myFolder/myFile.txt";

Path absolutePath = Paths.get(relativePath).toAbsolutePath();
```

### 2.2 使用File类
在Java 7之前，java.io.File类提供了一种将相对路径转换为绝对路径的方式。

以下是如何使用File类转换相对路径的示例：

```java
String relativePath = "myFolder/myFile.txt";

File file = new File(relativePath);

String absolutePath = file.getAbsolutePath();
```

**虽然建议在新项目中使用更新的Paths类，但File类仍然适用于遗留代码。**

### 2.3 使用FileSystem类
另一种方法是使用java.nio.file.FileSystem类，它提供了转换路径的方法：

```java
String relativePath = "myFolder/myFile.txt";

Path absolutePath = FileSystems.getDefault().getPath(relativePath).toAbsolutePath();
```

## 3. 示例
让我们使用相对路径来测试我们的解决方案：

```java
String relativePath1 = "data/sample.txt";
System.out.println(convertToAbsoluteUsePathsClass(relativePath1));
System.out.println(convertToAbsoluteUseFileClass(relativePath1));
System.out.println(convertToAbsoluteUseFileSystemsClass(relativePath1));
```

结果看起来像这样（**结果可能因使用的操作系统而异** - 此示例使用Windows）：

```
D:\SourceCode\tutorials\core-java-modules\core-java-20\data\sample.txt
D:\SourceCode\tutorials\core-java-modules\core-java-20\data\sample.txt
D:\SourceCode\tutorials\core-java-modules\core-java-20\data\sample.txt
```

让我们再试一个：

```java
String relativePath2 = "../data/sample.txt";
System.out.println(convertToAbsoluteUsePathsClass(relativePath2));
System.out.println(convertToAbsoluteUseFileClass(relativePath2));
System.out.println(convertToAbsoluteUseFileSystemsClass(relativePath2));
```

这次的结果看起来像这样：

```
D:\SourceCode\tutorials\core-java-modules\core-java-20\..\data\sample.txt
D:\SourceCode\tutorials\core-java-modules\core-java-20\..\data\sample.txt
D:\SourceCode\tutorials\core-java-modules\core-java-20\..\data\sample.txt
```

**如果我们想从路径中移除任何冗余元素（如“.”或“..”），我们可以使用Path类的normalize()方法。**

## 4. 结论
在Java中将相对路径转换为绝对路径对于文件操作、资源访问或目录导航至关重要。

在本教程中，我们探索了实现这种转换的不同方法。

如往常一样，本文的示例代码可以在GitHub上找到。