---
date: 2024-06-21
category:
  - Java
  - URI
tag:
  - URI
  - Java
  - 路径
head:
  - - meta
    - name: keywords
      content: Java URI 最后路径段 获取方法
---

# 在Java中获取URI的最后一个路径段

---

在Web开发和文件管理中，处理统一资源标识符（URI）是一项常见的操作。

除此之外，最常见的需求之一是从URL中获取最后一个路径段（最后一个段是在最后一个‘/’字符之后的最后一个段）。

**在本教程中，我们将探讨获取URL最后一个段的不同方法。**

### 2. 使用_URI_类

java.net.URI类提供了一种面向对象的URI解析和操作方法。为了简化，让我们以一个示例为例：

```java
@Test
public void givenURL_whenUsingURIClass_thenGetLastPathSegment() throws URISyntaxException {
    URI uri = new URI("https://www.example.com/path/to/resource");
    String path = uri.getPath();

    String[] segments = path.split("/");
    String lastSegment = segments[segments.length - 1];

    assertEquals("resource", lastSegment);
}
```

给定的方法使用示例URL初始化一个_URI_。随后，使用_getPath()_方法提取URI的路径。然后，将路径基于正斜杠（“/”）分隔符分割成段。**然后通过访问段数组的最后一个元素来确定最后一个路径段。**

最后，测试断言最后一个路径段与预期值匹配，确认功能正确地从URL中提取了预期的资源。

### 3. 使用_Path_类

在Java 7中，java.nio.file.Path类提供了文件和路径的平台独立表示。提供了一种有效的方法来提取URI的最后一个段。以下是一个示例：

```java
@Test
public void givenURL_whenUsingPathClass_thenGetLastPathSegment() {
    String exampleURI = "https://www.example.com/path/to/resource";

    try {
        URI uri = new URI(exampleURI);
        String pathString = uri.getPath();
        Path path = Paths.get(pathString);
        Path lastSegment = path.getName(path.getNameCount() - 1);

        assertEquals("resource", lastSegment.toString());
    } catch (Exception e) {
        fail("Exception occurred: " + e.getMessage());
    }
}
```

与前一节一样，我们首先初始化一个URI并使用_getPath()_方法。随后，我们从获取的_pathString_创建一个名为path的_Path_对象。**最后一个段是使用_index计算的_getName()_方法确定的。**然后将最后一个路径段转换为字符串进行比较。

### 4. 使用_FilenameUtils_类

Apache Commons IO库有一个_FilenameUtils_类，作为常用文件和路径任务的实用类。让我们以一个示例为例：

```java
@Test
public void givenURL_whenUsingFilenameUtilsClass_thenGetLastPathSegment() throws URISyntaxException {
    String exampleURI = "https://www.example.com/path/to/resource";

    URI uri = new URI(exampleURI);
    String path = uri.getPath();

    String lastSegment = FilenameUtils.getName(path);

    assertEquals("resource", lastSegment);
}
```

在使用_getPath()_方法提取_path_之后，我们使用_FilenameUtils_类使用_getName()_方法获取最后一个路径段，该方法以_path_作为参数。

### 5. 使用正则表达式

在从URL中提取最后一个路径段时，正则表达式提供了一种灵活且精确的模式定义的优雅解决方案。以下是一个示例：

```java
@Test
public void givenURL_whenUsingRegularExpression_thenGetLastPathSegment() throws URISyntaxException {
    URI uri = new URI("https://www.example.com/path/to/resource");
    String path = uri.getPath();

    Pattern pattern = Pattern.compile(".*/(.+)");
    Matcher matcher = pattern.matcher(path);

    if (!matcher.find()) {
        fail("Regex pattern didn't match.");
    }

    String lastSegment = matcher.group(1);
    assertEquals("resource", lastSegment);
}
```

在这里，我们定义了一个正则表达式模式“_/(.+)_”来精确捕获URL路径的最后一个段。**利用_Pattern_和_Matcher_类，我们使用_compile()_和_matcher()_方法编译并应用正则表达式模式到_path_字符串。**

此外，条件检查进一步验证了正则表达式模式应用的成功，使用_find()_方法。在成功匹配后，使用_Matcher_对象的_group(1)_方法提取最后一个路径段。

### 6. 结论

总之，本教程探索了多种Java方法，包括_URI_类、_Path_类、_FilenameUtils_和正则表达式，提供了从URL中有效提取最后一个路径段的多种方法。

像往常一样，相应的源代码可以在GitHub上找到。