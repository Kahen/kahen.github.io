---
date: 2024-07-04
category:
  - Java
  - 编程
tag:
  - tar
  - gzip
  - Apache Commons
  - Apache Ant
  - Apache Commons VFS
head:
  - - meta
    - name: keywords
      content: Java, tar, gzip, Apache Commons, Apache Ant, Apache Commons VFS, 解压
---
# Java中解压Tar文件

## 1. 引言

在本教程中，我们将探索不同的Java库，这些库可以用来解压tar归档文件。tar格式最初是作为Unix基础的实用程序，用于打包文件，未压缩。但今天，我们通常使用gzip压缩tar归档文件。因此，我们将看到压缩与未压缩的tar归档文件如何影响我们的代码。

## 2. 创建实现的基类

为了避免重复代码，我们首先从一个抽象类开始，我们将使用这个类作为我们实现的基础。这个类将定义一个单一的抽象方法untar()，它将执行解压：

```java
public abstract class TarExtractor {
    private InputStream tarStream;
    private boolean gzip;
    private Path destination;

    // ...

    public abstract void untar() throws IOException;
}
```

现在，让我们为我们的基类定义几个构造函数。**主构造函数将接收一个tar归档作为InputStream，无论内容是否被压缩，以及一个Path，文件将被解压到该位置：**

```java
protected TarExtractor(InputStream in, boolean gzip, Path destination) throws IOException {
    this.tarStream = in;
    this.gzip = gzip;
    this.destination = destination;

    Files.createDirectories(destination);
}
```

最重要的是，我们使用Files.createDirectories()为我们要解压的文件创建了基本目录结构。这样，我们就不需要自己创建目标文件夹了。**为了简单起见，我们使用一个布尔值来定义我们的归档是否使用gzip。因此，我们不需要编写代码通过其内容来检测实际的文件类型。**

然后，在我们的第二个构造函数中，我们将接受一个tar归档的Path，并根据文件名确定它是否被压缩。**注意，这依赖于文件名是正确的：**

```java
protected TarExtractor(Path tarFile, Path destination) throws IOException {
    this(Files.newInputStream(tarFile), tarFile.endsWith("gz"), destination);
}
```

最后，为了简化测试，我们将创建一个类，它包含一个方法，从我们的资源文件夹返回一个tar归档：

```java
public interface Resources {
    static InputStream tarGzFile() {
        return Resources.class.getResourceAsStream("/untar/test.tar.gz");
    }
}
```

这可以是任何使用gzip压缩的tar归档。我们只是把它放在一个方法中，以避免“流已关闭”的错误。

在我们的第一个实现中，我们将使用Apache Commons库commons-compress：

```xml
```<dependency>```
    ```<groupId>```org.apache.commons```</groupId>```
    ```<artifactId>```commons-compress```</artifactId>```
    ```<version>```1.23.0```</version>```
```</dependency>```
```

**解决方案涉及实例化一个TarArchiveInputStream，它将接收我们的归档流。然后，如果使用gzip，我们需要将它包装在GzipCompressorInputStream中：**

```java
public class TarExtractorCommonsCompress extends TarExtractor {

    protected TarExtractorCommonsCompress(InputStream in, boolean gzip, Path destination) throws IOException {
        super(in, gzip, destination);
    }

    public void untar() throws IOException {
        try (BufferedInputStream inputStream = new BufferedInputStream(getTarStream());
             TarArchiveInputStream tar = new TarArchiveInputStream(
                 isGzip() ? new GzipCompressorInputStream(inputStream) : inputStream)) {
            ArchiveEntry entry;
            while ((entry = tar.getNextEntry()) != null) {
                Path extractTo = getDestination().resolve(entry.getName());
                if (entry.isDirectory()) {
                    Files.createDirectories(extractTo);
                } else {
                    Files.copy(tar, extractTo);
                }
            }
        }
    }
}
```

首先，我们遍历我们的TarArchiveInputStream。为此，我们必须检查getNextEntry()是否返回了一个ArchiveEntry。**然后，如果它是一个目录，我们根据目标文件夹相对创建它。这样，我们在写入其中时就不会出错。**否则，我们使用Files.copy()从我们的tar复制到我们想要解压的地方。

让我们通过将归档内容解压到一个任意文件夹来测试它：

```java
@Test
public void givenTarGzFile_whenUntar_thenExtractedToDestination() throws IOException {
    Path destination = Paths.get("/tmp/commons-compress-gz");

    new TarExtractorCommonsCompress(Resources.tarGzFile(), true, destination).untar();

    try (Stream files = Files.list(destination)) {
        assertTrue(files.findFirst().isPresent());
    }
}
```

如果我们的归档没有使用gzip，我们只需要在实例化我们的TarExtractorCommonsCompress对象时传递false。同样，请注意GzipCompressorInputStream可以提取除gzip之外的其他格式。

使用Apache ant，我们可以接近一个核心Java实现，因为我们可以在我们的归档使用gzip的情况下使用java.util中的GZIPInputStream：

```xml
```<dependency>```
    ```<groupId>```org.apache.ant```</groupId>```
    ```<artifactId>```ant```</artifactId>```
    ```<version>```1.10.13```</version>```
```</dependency>```
```

**我们将有一个非常相似的实现：**

```java
public class TarExtractorAnt extends TarExtractor {

    // 标准委托构造函数

    public void untar() throws IOException {
        try (TarInputStream tar = new TarInputStream(new BufferedInputStream(
              isGzip() ? new GZIPInputStream(getTarStream()) : getTarStream()))) {
            TarEntry entry;
            while ((entry = tar.getNextEntry()) != null) {
                Path extractTo = getDestination().resolve(entry.getName());
                if (entry.isDirectory()) {
                    Files.createDirectories(extractTo);
                } else {
                    Files.copy(tar, extractTo);
                }
            }
        }
    }
}
```

这里的逻辑是一样的，但我们使用Apache Ant的TarInputStream和TarEntry，而不是TarArchiveInputStream和ArchiveEntry。我们可以像之前的解决方案一样以相同的方式测试它：

```java
@Test
public void givenTarGzFile_whenUntar_thenExtractedToDestination() throws IOException {
    Path destination = Paths.get("/tmp/ant-gz");

    new TarExtractorAnt(Resources.tarGzFile(), true, destination).untar();

    try (Stream files = Files.list(destination)) {
        assertTrue(files.findFirst().isPresent());
    }
}
```

在我们最后一个例子中，我们将使用Apache commons-vfs2，它支持使用单一API的不同文件系统方案。其中之一是tar归档：

```xml
```<dependency>```
    ```<groupId>```org.apache.commons```</groupId>```
    ```<artifactId>```commons-vfs2```</artifactId>```
    ```<version>```2.9.0```</version>```
```</dependency>```
```

但是，由于我们是从输入流中读取，我们首先需要将我们的流保存到一个临时文件，这样我们之后就可以生成一个URI：

```java
public class TarExtractorVfs extends TarExtractor {

    // 标准委托构造函数

    public void untar() throws IOException {
        Path tmpTar = Files.createTempFile("temp", isGzip() ? ".tar.gz" : ".tar");
        Files.copy(getTarStream(), tmpTar);

        // ...

        Files.delete(tmpTar);
    }
}
```

我们将在提取结束时删除我们的临时文件。接下来，我们将获取FileSystemManager的一个实例，并将我们的文件URI解析为FileObject，然后我们将使用它来迭代我们的归档内容：

```java
FileSystemManager fsManager = VFS.getManager();
String uri = String.format("%s:file://%s", isGzip() ? "tgz" : "tar", tmpTar);
FileObject tar = fsManager.resolveFile(uri);
```

**注意，对于resolveFile()，我们根据是否使用gzip，以不同的方式构建我们的URI，如果使用gzip，则在前面加上“tgz”（这意味着tar + gzip），而不是“tar”。**然后，最后，我们迭代我们的归档内容，提取每个文件：

```java
for (FileObject entry : tar) {
    Path extractTo = Paths.get(
      getDestination().toString(), entry.getName().getPath());

    if (entry.isReadable() && entry.getType() == FileType.FILE) {
        Files.createDirectories(extractTo.getParent());

        try (FileContent content = entry.getContent();
             InputStream stream = content.getInputStream()) {
            Files.copy(stream, extractTo);
        }
    }
}
```

而且，因为我们可能会以无序的方式接收我们的项目，我们将检查我们的条目是否是文件，并在其父目录上调用createDirectories()。这样，我们就不会冒着在创建其目录之前创建文件的风险。**最后，由于条目路径返回时带有前导斜杠，我们将不会使用Paths.resolve()来创建目标文件，就像在以前的实现中那样。**让我们测试它：

```java
@Test
public void givenTarGzFile_whenUntar_thenExtractedToDestination() throws IOException {
    Path destination = Paths.get("/tmp/vfs-gz");

    new TarExtractorVfs(Resources.tarGzFile(), true, destination).untar();

    try (Stream files = Files.list(destination)) {
        assertTrue(files.findFirst().isPresent());
    }
