---
date: 2022-04-01
category:
  - Java
  - MIME类型
tag:
  - Java
  - MIME类型
  - 文件扩展名
head:
  - - meta
    - name: keywords
      content: Java, MIME类型, 文件扩展名, Apache Tika, Jodd Util, SimpleMagic
------
# 在Java中根据MIME类型获取文件扩展名 | Baeldung

## 1. 概述

MIME类型是用于指定互联网上数据类型和格式的标签。**一个MIME类型可以与多个文件扩展名关联。例如，“_image/jpeg_” MIME类型包括像“. _jpg_“、“. _jpeg_”或“. _jpe_”这样的扩展名。**

在本教程中，我们将探索在Java中确定特定MIME类型的文件扩展名的不同方法。我们将重点关注四种主要的解决方法。

我们的一些实现将包括扩展名中的最后一个可选点。例如，如果我们的MIME类型名称是“_image/jpeg_”，那么“_jpg_”或“_.jpg_”将作为文件扩展名返回。

## 2. 使用Apache Tika

Apache Tika是一个可以检测和提取各种文件的元数据和文本的工具包。它包括一个丰富而强大的API，可用于检测MIME类型的文件扩展名。

让我们从配置Maven依赖开始：

```
```<dependency>```
    ```<groupId>```org.apache.tika```</groupId>```
    ```<artifactId>```tika-core```</artifactId>```
    ```<version>```2.9.0```</version>```
```</dependency>```
```

如前所述，一个单一的MIME类型可以有多个扩展。为此，《MimeType》类提供了两个不同的方法：_getExtension()_和_getExtensions()_。

**_getExtension()_方法返回首选的文件扩展名，而_getExtensions()_返回该MIME类型所有已知文件扩展名的列表。**

接下来，我们将使用_MimeType_类中的两种方法来检索扩展名：

```java
@Test
public void whenUsingTika_thenGetFileExtension() {
    List``````<String>`````` expectedExtensions = Arrays.asList(".jpg", ".jpeg", ".jpe", ".jif", ".jfif", ".jfi");
    MimeTypes allTypes = MimeTypes.getDefaultMimeTypes();
    MimeType type = allTypes.forName("image/jpeg");
    String primaryExtension = type.getExtension();
    assertEquals(".jpg", primaryExtension);
    List``````<String>`````` detectedExtensions = type.getExtensions();
    assertThat(detectedExtensions).containsExactlyElementsOf(expectedExtensions);
}
```

## 3. 使用Jodd Util

我们也可以另外使用Jodd Util库，其中包含一个用于查找MIME类型的文件扩展名的实用工具。

让我们从添加Maven依赖开始：

```
```<dependency>```
    ```<groupId>```org.jodd```</groupId>```
    ```<artifactId>```jodd-util```</artifactId>```
    ```<version>```6.2.1```</version>```
```</dependency>```
```

接下来，我们将**使用_findExtensionsByMimeTypes()_方法获取所有支持的文件扩展名**：

```java
@Test
public void whenUsingJodd_thenGetFileExtension() {
    List``````<String>`````` expectedExtensions = Arrays.asList("jpeg", "jpg", "jpe");
    String[] detectedExtensions = MimeTypes.findExtensionsByMimeTypes("image/jpeg", false);
    assertThat(detectedExtensions).containsExactlyElementsOf(expectedExtensions);
}
```

Jodd Util提供了一组有限的识别文件类型和扩展名。它优先考虑简单性而不是全面覆盖。

在_findExtensionsByMimeTypes()_方法中，我们可以通过将第二个_boolean_参数设置为_true_来激活通配符模式。当提供通配符模式作为MIME类型时，我们将获得与指定通配符模式匹配的所有MIME类型的扩展名。

例如，当我们将MIME类型设置为_image/*_并启用通配符模式时，我们将获得_image_类别中所有MIME类型的扩展名。

## 4. 使用SimpleMagic

SimpleMagic是一个主要用于文件MIME类型检测的实用程序包。它还包含一种将MIME类型转换为文件扩展名的方法。

让我们从添加Maven依赖开始：

```
```<dependency>```
    ```<groupId>```com.j256.simplemagic```</groupId>```
    ```<artifactId>```simplemagic```</artifactId>```
    ```<version>```1.17```</version>```
```</dependency>```
```

现在，我们将**使用_ContentInfo_类的_getFileExtensions()_方法获取所有支持的文件扩展名**：

```java
@Test
public void whenUsingSimpleMagic_thenGetFileExtension() {
    List``````<String>`````` expectedExtensions = Arrays.asList("jpeg", "jpg", "jpe");
    String[] detectedExtensions = ContentType.fromMimeType("image/jpeg").getFileExtensions();
    assertThat(detectedExtensions).containsExactlyElementsOf(expectedExtensions);
}
```

SimpleMagic库中有一个_ContentType_枚举，其中包含MIME类型及其相应的文件扩展名和简单名称的映射。_getFileExtensions()_使用这个枚举，使我们能够根据提供的MIME类型检索文件扩展名。

## 5. 使用自定义的MIME类型到扩展名的_Map_

我们也可以不依赖外部库从MIME类型中获取文件扩展名。我们将创建一个自定义的MIME类型到文件扩展名的映射来实现这一点。

让我们创建一个名为_mimeToExtensionMap_的_HashMap_来关联MIME类型及其相应的文件扩展名。**_get()_方法允许我们在映射中查找为提供的MIME类型预配置的文件扩展名并返回它们：**

```java
@Test
public void whenUsingCustomMap_thenGetFileExtension() {
    Map<String, Set``````<String>``````> mimeToExtensionMap = new HashMap<>();
    List``````<String>`````` expectedExtensions = Arrays.asList(".jpg", ".jpe", ".jpeg");
    addMimeExtensions(mimeToExtensionMap, "image/jpeg", ".jpg");
    addMimeExtensions(mimeToExtensionMap, "image/jpeg", ".jpe");
    addMimeExtensions(mimeToExtensionMap, "image/jpeg", ".jpeg");
    Set``````<String>`````` detectedExtensions = mimeToExtensionMap.get("image/jpeg");
    assertThat(detectedExtensions).containsExactlyElementsOf(expectedExtensions);
}

void addMimeExtensions(Map<String, Set``````<String>``````> map, String mimeType, String extension) {
    map.computeIfAbsent(mimeType, k -> new HashSet<>()).add(extension);
}
```

示例映射包括一些示例，但可以根据需要轻松自定义，通过添加其他映射。

## 6. 结论

在本文中，我们探讨了从MIME类型中提取文件扩展名的不同方法。**我们检查了两种不同的方法：利用现有库和制定符合我们需求的自定义逻辑。**

当处理有限的MIME类型集时，自定义逻辑是一个选项，尽管它可能存在维护挑战。相反，像**Apache Tika或Jodd Util这样的库提供了广泛的MIME类型覆盖和易用性**，使它们成为处理各种MIME类型的可靠选择。

如往常一样，本文中使用的源代码可在GitHub上获得。