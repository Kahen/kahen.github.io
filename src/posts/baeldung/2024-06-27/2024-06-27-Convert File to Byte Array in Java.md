---
date: 2024-06-28
category:
  - Java
  - 文件操作
tag:
  - Java
  - 文件转换
  - 字节数组
head:
  - - meta
    - name: keywords
      content: Java, 文件转换, 字节数组
------
# Java中将文件转换为字节数组

在这篇快速教程中，我们将看到如何在Java中将文件转换为字节数组。

首先，我们将学习如何使用内置的JDK解决方案进行转换。然后，我们将讨论如何使用Apache Commons IO和Guava实现相同的结果。

### 2.1 使用Java
JDK提供了几种方便的方法将文件转换为字节数组。例如，我们可以使用java.io或java.nio包来回答我们的中心问题。让我们仔细看看每个选项。

#### 2.1.1 FileInputStream
让我们从使用IO包中的FileInputStream类开始，这是最简单的解决方案。通常，这个类带有将文件内容读取为字节的方法。

例如，假设我们有一个名为sample.txt的文件，内容为“Hello World”：

```java
class FileToByteArrayUnitTest {
    private static final String FILE_NAME = "src" + File.separator + "test" + File.separator + "resources" + File.separator + "sample.txt";
    private final byte[] expectedByteArray = { 72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100 };

    @Test
    void givenFile_whenUsingFileInputStreamClass_thenConvert() throws IOException {
        File myFile = new File(FILE_NAME);
        byte[] byteArray = new byte[(int) myFile.length()];
        try (FileInputStream inputStream = new FileInputStream(myFile)) {
            inputStream.read(byteArray);
        }

        assertArrayEquals(expectedByteArray, byteArray);
    }
}
```

在这里，我们使用给定的sample.txt文件创建了FileInputStream类的实例。此外，我们调用了read(byte[] b)方法，将FileInputStream实例中的数据读取到定义的字节数组中。

值得注意的是，我们使用了try-with-resources方法来高效地处理资源的关闭。

### 2.2 Files#readAllBytes
或者，我们可以使用NIO API中的Files类。

```java
@Test
void givenFile_whenUsingNioApiFilesClass_thenConvert() throws IOException {
    byte[] byteArray = Files.readAllBytes(Paths.get(FILE_NAME));

    assertArrayEquals(expectedByteArray, byteArray);
}
```

正如我们所看到的，Files类带有readAllBytes()方法，它返回指定路径文件的所有字节。有趣的是，这个方法在读取字节后自动关闭文件。

另一个重要的注意事项是，这个方法不打算读取大文件。因此，我们只能在简单的情况下使用它。

### 3 使用Apache Commons IO
另一种解决方案是使用Apache Commons IO库。它提供了许多方便的实用类，我们可以使用它们来执行常见的IO任务。

首先，让我们将commons-io依赖项添加到pom.xml文件中：

```xml
``<dependency>``
    ``<groupId>``commons-io``</groupId>``
    ``<artifactId>``commons-io``</artifactId>``
    ``<version>``2.15.1``</version>``
``</dependency>``
```

#### 3.1 FileUtils#readFileToByteArray
FileUtils类，顾名思义，提供了一组用于文件操作的方法。在这些方法中，我们找到了readFileToByteArray()方法：

```java
@Test
void givenFile_whenUsingApacheCommonsFileUtilsClass_thenConvert() throws IOException {
    byte[] byteArray = FileUtils.readFileToByteArray(new File(FILE_NAME));

    assertArrayEquals(expectedByteArray, byteArray);
}
```

正如我们在上面看到的，readFileToByteArray()以一种直接的方式将指定文件的内容读取到一个字节数组中。这个方法的好处是文件总是被关闭的。

此外，这个方法没有Files#readAllBytes的限制，并且如果提供的文件是null，它会抛出NullPointerException。

#### 3.2 IOUtils#toByteArray
Apache Commons IO提供了另一种我们可以使用的替代方案来实现相同的结果。它提供了IOUtils类来处理一般的IO流操作。

让我们通过一个实际的例子来说明使用IOUtils：

```java
@Test
void givenFile_whenUsingApacheCommonsIOUtilsClass_thenConvert() throws IOException {
    File myFile = new File(FILE_NAME);
    byte[] byteArray = new byte[(int) myFile.length()];
    try (FileInputStream inputStream = new FileInputStream(myFile)) {
        byteArray = IOUtils.toByteArray(inputStream);
    }

    assertArrayEquals(expectedByteArray, byteArray);
}
```

简而言之，这个类带有toByteArray()方法，将InputStream的数据作为byte[]返回。我们这里不需要使用BufferedInputStream，因为这个方法内部会进行缓冲。

### 4 使用Guava
Guava库是将文件转换为字节数组时考虑的另一个选项。像往常一样，在开始使用这个库之前，我们需要将其依赖项添加到pom.xml中：

```xml
``<dependency>``
    ``<groupId>``com.google.guava``</groupId>``
    ``<artifactId>``guava``</artifactId>``
    ``<version>``32.1.3-jre``</version>``
``</dependency>``
```

#### 4.1 Files#toByteArray
Guava库提供了自己的Files类版本。让我们在实践中看看它：

```java
@Test
void givenFile_whenUsingGuavaFilesClass_thenConvert() throws IOException {
    byte[] byteArray = com.google.common.io.Files.toByteArray(new File(FILE_NAME));

    assertArrayEquals(expectedByteArray, byteArray);
}
```

简而言之，我们使用toByteArray()方法来获取包含给定文件所有字节的字节数组。

### 5 结论
在这篇简短的文章中，我们探索了使用JDK方法、Guava和Apache Commons IO库将文件转换为字节数组的各种方式。

正如往常一样，本文中使用的代码可以在GitHub上找到。