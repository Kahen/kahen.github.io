---
date: 2024-06-19
category:
  - Apache Commons Compress
  - Java
tag:
  - Java
  - Compression
  - Archiving
head:
  - - meta
    - name: keywords
      content: Apache Commons Compress, Java, Compression, Archiving
---
# Apache Commons Compress 项目简介

在本教程中，我们将学习如何使用 Apache Commons Compress 来压缩、归档和提取文件。我们还将了解其支持的格式以及一些限制。

## 2. Apache Commons Compress 是什么

**Apache Commons Compress 是一个库，它为最广泛使用的压缩和归档格式创建了一个标准接口。** 它从无处不在的 TAR、ZIP 和 GZIP 到不太知名但同样常用的格式，如 BZIP2、XZ、LZMA 和 Snappy。

### 2.1. 压缩器和归档器之间的区别

**归档器（例如 TAR）将目录结构捆绑到一个单一文件中，而压缩器接收一个字节流并使其变小，节省空间。** 有些格式（如 ZIP）可以充当归档器和压缩器，但库中将其视为归档器。

我们可以通过查看 Commons Compress 提供的 _ArchiveStreamFactory_ 类的一些静态字段来检查支持的归档格式。相反，我们可以查看 _CompressorStreamFactory_ 来了解支持的压缩格式。

### 2.2. Commons Compress 和附加依赖

让我们从向我们的项目添加 _commons-compress_ 开始：

```xml
```<dependency>```
    ```<groupId>```org.apache.commons```</groupId>```
    ```<artifactId>```commons-compress```</artifactId>```
    ```<version>```1.26.1```</version>```
```</dependency>```
```

**开箱即用，Commons Compress 支持 TAR、ZIP、BZIP2、CPIO 和 GZIP。但是，对于其他格式，我们需要额外的依赖。** 让我们添加 XZ、7z 和 LZMA 支持：

```xml
```<dependency>```
    ```<groupId>```org.tukaani```</groupId>```
    ```<artifactId>```xz```</artifactId>```
    ```<version>```1.9```</version>```
```</dependency>```
```

最后，对于 LZ4 和 ZSTD：

```xml
```<dependency>```
    ```<groupId>```com.github.luben```</groupId>```
    ```<artifactId>```zstd-jni```</artifactId>```
    ```<version>```1.5.5-11```</version>```
```</dependency>```
```

有了这些，我们将避免在读写这些类型的文件时出现错误。

## 3. 压缩和解压缩流

虽然库为这些不同格式的共同操作创建了一个抽象，但它们也有独特的功能。我们使用特定的实现来访问这些功能，例如 _GzipCompressorInputStream_ 和 _LZMACompressorInputStream_。**相反，我们将专注于 _CompressorStreamFactory_，它帮助我们获取一个实现，而不需要特定的类，这有助于创建格式无关的代码。**

### 3.1. 压缩文件

在压缩文件时，我们必须将所需的压缩格式传递给工厂方法。Commons Compress 包含一个 _FileNameUtils_ 类，我们将使用它来获取我们的文件扩展名并将其作为格式传递。然后，我们打开一个输出流，获取一个压缩器实例，并将来自我们的 _Path_ 的字节写入其中：

```java
public class CompressUtils {
    public static void compressFile(Path file, Path destination) {
        String format = FileNameUtils.getExtension(destination);

        try (OutputStream out = Files.newOutputStream(destination);
             BufferedOutputStream buffer = new BufferedOutputStream(out);
             CompressorOutputStream compressor = new CompressorStreamFactory()
                .createCompressorOutputStream(format, buffer)) {
            IOUtils.copy(Files.newInputStream(file), compressor);
        }
    }

    // ...
}
```

让我们用一个简单的文本文件来测试它：

```java
@Test
void givenFile_whenCompressing_thenCompressed() {
    Path destination = Paths.get("/tmp/simple.txt.gz");

    CompressUtils.compressFile(Paths.get("/tmp/simple.txt"), destination);

    assertTrue(Files.isRegularFile(destination));
}
```

**注意我们这里使用的是 GZIP，它由“gz”扩展名表示。我们可以通过改变所需 _destination_ 的扩展名来使用任何其他支持的格式。** 此外，我们可以将任何文件类型作为输入。

### 3.2. 解压缩压缩文件

让我们解压缩使用任何支持的格式压缩的文件。**首先，我们需要为文件打开一个缓冲输入流，并创建一个压缩输入流（通过读取文件的前几个字节来检测压缩格式）。然后，将压缩输入写入输出流，得到一个解压缩的文件或归档：**

```java
public static void decompress(Path file, Path destination) {
    try (InputStream in = Files.newInputStream(file);
         BufferedInputStream inputBuffer = new BufferedInputStream(in);
         OutputStream out = Files.newOutputStream(destination);
         CompressorInputStream decompressor = new CompressorStreamFactory()
            .createCompressorInputStream(inputBuffer)) {
        IOUtils.copy(decompressor, out);
    }
}
```

让我们用一个“tar.gz”文件来测试，这表明它是一个使用 GZIP 压缩的 TAR 归档：

```java
@Test
void givenCompressedArchive_whenDecompressing_thenArchiveAvailable() {
    Path destination = Paths.get("/tmp/decompressed-archive.tar");

    CompressUtils.decompress("/tmp/archive.tar.gz", destination);

    assertTrue(Files.isRegularFile(destination));
}
```

注意，任何支持的归档器和压缩器的组合在这里都可以工作，而不需要更改任何代码。例如，我们可以将“archive.cpio.xz”文件作为输入。我们甚至可以解压缩一个 GZIP 压缩的 ZIP 文件。**最重要的是，这个方法不仅限于归档文件。任何压缩文件都可以用它来解压缩。**

## 4. 创建和操作归档

要创建归档，我们需要指定我们想要的格式。**为了简化事情，_Archiver_ 类有一个方便的方法，可以将整个目录归档到目标文件：**

```java
public static void archive(Path directory, Path destination) {
    String format = FileNameUtils.getExtension(destination);
    new Archiver().create(format, destination, directory);
}
```

### 4.1. 结合归档器和压缩器

**我们也可以结合归档器和压缩器，在单个操作中创建一个压缩归档。** 为了简化这一点，我们将扩展名视为压缩格式，将前面的扩展名视为归档格式。然后，我们为生成的压缩归档打开一个缓冲输出流，根据我们的压缩格式创建一个压缩器，并实例化一个从我们压缩器的输出中消费的 _ArchiveOutputStream_：

```java
public static void archiveAndCompress(Path directory, Path destination) {
    String compressionFormat = FileNameUtils.getExtension(destination);
    String archiveFormat = FilenameUtils.getExtension(
      destination.getFileName().toString().replace("." + compressionFormat, ""));

    try (OutputStream archive = Files.newOutputStream(destination);
         BufferedOutputStream archiveBuffer = new BufferedOutputStream(archive);
         CompressorOutputStream compressor = new CompressorStreamFactory()
            .createCompressorOutputStream(compressionFormat, archiveBuffer);
         ArchiveOutputStream``<?>`` archiver = new ArchiveStreamFactory()
            .createArchiveOutputStream(archiveFormat, compressor)) {
        new Archiver().create(archiver, directory);
    }
}
```

最后，我们仍然使用 _Archiver_，但现在使用的是接收 _ArchiveOutputStream_ 的 _create()_ 版本。

### 4.2. 解归档归档

使用 _Expander_ 类，我们可以在一行中解归档我们的未压缩归档：

```java
public static void extract(Path archive, Path destination) {
    new Expander().expand(archive, destination);
}
```

我们传递归档文件和我们想要提取文件的目录。**这个实用方法负责打开（和关闭）输入流，检测归档类型，遍历归档中的所有条目，并将它们复制到我们选择的目录。**

让我们编写一个方法，而不是提取整个内容，而是从归档中提取单个条目：

```java
public static void extractOne(Path archivePath, String fileName, Path destinationDirectory) {
    try (InputStream input = Files.newInputStream(archivePath);
         BufferedInputStream buffer = new BufferedInputStream(input);
         ArchiveInputStream``<?>`` archive = new ArchiveStreamFactory()
            .createArchiveInputStream(buffer)) {

        ArchiveEntry entry;
        while ((entry = archive.getNextEntry()) != null) {
            if (entry.getName().equals(fileName)) {
                Path outFile = destinationDirectory.resolve(fileName);
                Files.createDirectories(outFile.getParent());
                try (OutputStream os = Files.newOutputStream(outFile)) {
                    IOUtils.copy(archive, os);
                }
                break;
            }
        }
    }
}
```

**打开 _ArchiveInputStream_ 后，我们不断调用归档上的 _getNextEntry()_，直到我们找到一个具有相同名称的条目。** 如有必要，还会创建任何父目录。然后，它的内容被写入我们的目的地目录。**请注意，文件名可以表示归档内的子目录。** 考虑我们的归档包含一个名为“some.txt”的文件在“sub-directory”下：

```java
@Test
void givenExistingArchive_whenExtractingSingleEntry_thenFileExtracted() {
    Path archive = Paths.get```java
    String targetFile = "sub-directory/some.txt";

    CompressUtils.extractOne(archive, targetFile, Paths.get("/tmp/"));

    assertTrue(Files.isRegularFile("/tmp/sub-directory/some.txt"));
}
```

### 4.4. 向现有归档添加条目

**不幸的是，该库没有给我们一个简单的方法来将新条目包含到现有归档中。** 如果我们打开归档并调用 _putArchiveEntry()_，我们将覆盖其内容。因此，在插入新条目之前，也需要重写所有现有条目。**而不是为此创建一个新方法，我们将重用我们创建的方法。我们将提取归档，将新文件复制到目录结构中，再次归档目录，然后删除旧归档：**

```java
@Test
void givenExistingArchive_whenAddingSingleEntry_thenArchiveModified() {
    Path archive = Paths.get("/tmp/archive.tar");
    Path newArchive = Paths.get("/tmp/modified-archive.tar");
    Path tmpDir = Paths.get("/tmp/extracted-archive");

    Path newEntry = Paths.get("/tmp/new-entry.txt");

    CompressUtils.extract(archive, tmpDir);
    assertTrue(Files.isDirectory(tmpDir));

    Files.copy(newEntry, tmpDir.resolve(newEntry.getFileName()));
    CompressUtils.archive(tmpDir, newArchive);
    assertTrue(Files.isRegularFile(newArchive));

    FileUtils.deleteDirectory(tmpDir.toFile());
    Files.delete(archive);
    Files.move(newArchive, archive);
    assertTrue(Files.isRegularFile(archive));
}
```

**这将销毁旧归档，因此建议保留备份。**

### 4.5. 直接使用具体实现以获得独家功能

如果我们想要从每种格式中获得独家功能，我们可以直接使用特定的实现类。**例如，而不是使用 _ArchiveOutputStream_，我们将实例化一个 _ZipArchiveOutputStream_，这样我们就可以直接设置其压缩方法和级别：**

```java
public static void zip(Path file, Path destination) {
    try (InputStream input = Files.newInputStream(file);
         OutputStream output = Files.newOutputStream(destination);
         ZipArchiveOutputStream archive = new ZipArchiveOutputStream(output)) {
        archive.setMethod(ZipEntry.DEFLATED);
        archive.setLevel(Deflater.BEST_COMPRESSION);

        archive.putArchiveEntry(new ZipArchiveEntry(file.getFileName().toString()));
        IOUtils.copy(input, archive);
        archive.closeArchiveEntry();
    }
}
```

这比仅使用 _Archiver_ 需要更多的代码，但提供了更多的控制。

## 5. 限制

虽然 Apache Commons Compress 提供了一个多功能的文件压缩和归档工具包，但认识到某些限制和考虑因素是很重要的。首先，虽然该库为各种压缩和归档格式提供了广泛的支持，但处理多卷归档可能会带来需要仔细考虑的挑战。**此外，可能会出现编码问题。主要是在处理不同的文件系统或非标准化数据时。**

此外，尽管该库提供了全面的功能，Apache 建议在特定场景中利用 ZipFile 以获得更好的控制。最后，TAR 格式也有专门的页面进行考虑。

## 6. 结论

在本文中，我们看到了 Apache Commons Compress 是一个有价值的资源，用于高效的文件压缩和归档解决方案。通过了解其功能、限制和最佳实践，我们可以有效地利用这个库，以一种格式无关的方式简化文件管理流程。

如常，源代码可在 GitHub 上获得。

发表文章后 30 天内开放评论。对于超过此日期的任何问题，请使用网站上的联系表单。

OK