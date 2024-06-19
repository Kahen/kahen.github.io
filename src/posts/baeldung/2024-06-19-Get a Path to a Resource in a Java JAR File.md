---
date: 2024-06-20
category:
  - Java
  - JAR文件
tag:
  - JAR
  - 资源路径
head:
  - - meta
    - name: keywords
      content: Java, JAR, 资源路径, 文件访问
---

# 在Java JAR文件中获取资源路径

## 1. 引言

Java中JAR文件内的资源通常使用相对于JAR文件根的路径来访问。此外，了解这路径的结构对于有效检索资源至关重要。

**在本教程中，我们将探讨获取Java JAR文件内资源路径的不同方法。**

## 2. 使用 _Class.getResource()_ 方法获取资源的URL

_Class.getResource()_ 方法提供了一种直接获取JAR文件内资源的_URL_ 的方式。让我们看看如何使用这个方法：

```java
@Test
public void givenFile_whenClassUsed_thenGetResourcePath() {
    URL resourceUrl = GetPathToResourceUnitTest.class.getResource("/myFile.txt");
    assertNotNull(resourceUrl);
}
```

在这个测试中，我们在 _GetPathToResourceUnitTest.class_ 上调用 _getResource()_ 方法，传递资源文件的路径 “ _/myFile.txt_” 作为参数。然后，我们断言获得的 _resourceUrl_ 不为空，这表明资源文件已成功定位。

## 3. 使用 _ClassLoader.getResource()_ 方法

或者，我们可以使用 _ClassLoader.getResource()_ 方法来访问JAR文件内的资源。当资源路径在编译时未知时，这个方法很有用：

```java
@Test
public void givenFile_whenClassLoaderUsed_thenGetResourcePath() {
    URL resourceUrl = GetPathToResourceUnitTest.class.getClassLoader().getResource("myFile.txt");
    assertNotNull(resourceUrl);
}
```

在这个测试中，我们使用类加载器 _GetPathToResourceUnitTest.class.getClassLoader()_ 来获取资源文件。与前一种方法不同，这种方法不依赖于类的包结构。相反，它在类路径的根级别搜索资源文件。

**这意味着它可以定位项目结构内任何位置的资源，使其在访问类包外的资源时更加灵活。**

## 4. 使用 _Paths.get()_ 方法

从Java 7开始，我们可以使用 _Paths.get()_ 方法来获取代表JAR文件内资源的 _Path_ 对象。以下是如何操作的：

```java
@Test
public void givenFile_whenPathUsed_thenGetResourcePath() throws Exception {
    Path resourcePath = Paths.get(Objects.requireNonNull(GetPathToResourceUnitTest.class.getResource("/myFile.txt")).toURI());
    assertNotNull(resourcePath);
}
```

这里，我们首先调用 _getResource()_ 方法检索资源文件的URL。然后，我们将这个URL转换为URI，并将其传递给 _Paths.get()_ 以获得代表资源文件位置的 _Path_ 对象。

**这种方法在我们需要以 _Path_ 对象的形式工作资源文件时非常有用。它支持更高级的文件操作，例如读取或写入文件内容。此外，它提供了在Java NIO包的上下文中与资源交互的便捷方式。**

## 5. 结论

总之，访问Java JAR文件内的资源对于许多应用程序至关重要。无论我们偏好 _Class.getResource()_ 的简单性，还是 _ClassLoader.getResource()_ 的灵活性，或是 _Paths.get()_ 的现代方法，Java都提供了多种方法来高效地完成这项任务。

如常，相关的源代码可以在GitHub上找到。

文章发布后的30天内开放评论。对于超过此日期的任何问题，请使用网站上的联系表单。