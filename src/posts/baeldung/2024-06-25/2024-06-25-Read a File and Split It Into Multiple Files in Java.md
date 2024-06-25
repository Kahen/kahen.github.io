---
date: 2024-06-25
category:
  - Java
  - 文件处理
tag:
  - Java
  - 文件分割
head:
  - - meta
    - name: keywords
      content: Java, 文件处理, 文件分割
---
# Java中读取文件并将其拆分为多个文件

在本教程中，我们将学习如何在Java中拆分大文件。首先，我们将比较将文件完整加载到内存中与使用流的方式读取文件。之后，我们将学习基于文件大小和数量来拆分文件。

## 2. 内存中读取文件与流式读取文件

当我们将文件完整加载到内存中时，JVM会将所有行保留在内存中。这对于小文件是一个很好的选择。然而，对于大文件来说，这经常会导致`OutOfMemoryException`。

流式读取文件是另一种读取方式，并且有很多方法可以流式读取大文件。**由于整个文件并不在内存中，它消耗的内存更少，并且可以很好地处理大文件而不抛出异常。**

在我们的示例中，我们将使用流来读取大文件。

## 3. 按文件大小拆分文件

虽然我们到目前为止已经学会了如何读取大文件，但有时我们需要将它们拆分成更小的文件或以更小的尺寸通过网络发送。

首先，我们将从将大文件拆分成具有特定大小的更小文件开始。

以我们的例子为例，我们将采用一个4.3MB的文件`largeFile.txt`，它位于我们项目的`src/main/resource`文件夹中，并将其拆分成每个1MB的文件，并将它们存储在`/target/split`目录下。

让我们首先**获取大文件并打开它的输入流**：

```java
File largeFile = new File("LARGE_FILE_PATH");
InputStream inputstream = Files.newInputStream(largeFile.toPath());
```

在这里，我们只是加载文件元数据，大文件的内容还没有加载到内存中。

对于我们的例子，我们有一个固定的常量大小。在实际使用案例中，这个`maxSizeOfSplitFiles`值可以根据应用程序的需要动态读取和更改。

现在，让我们**有一个方法，它接受`largeFile`对象和一个定义的`maxSizeOfSplitFiles`来拆分文件**：

```java
public List````<File>```` splitByFileSize(File largeFile, int maxSizeOfSplitFiles, String splitFileDirPath)
  throws IOException {
    // ...
}
```

现在，让我们创建一个`SplitLargeFile`类和`splitByFileSize()`方法：

```java
class SplitLargeFile {

    public List````<File>```` splitByFileSize(File largeFile, int maxSizeOfSplitFiles, String splitFileDirPath)
      throws IOException {

        List````<File>```` listOfSplitFiles = new ArrayList<>();
        try (InputStream in = Files.newInputStream(largeFile.toPath())) {
            final byte[] buffer = new byte[maxSizeOfSplitFiles];
            int dataRead = in.read(buffer);
            while (dataRead > -1) {
                File splitFile = getSplitFile(FilenameUtils.removeExtension(largeFile.getName()),
                  buffer, dataRead, splitFileDirPath);
                listOfSplitFiles.add(splitFile);
                dataRead = in.read(buffer);
            }
        }
        return listOfSplitFiles;
    }

    private File getSplitFile(String largeFileName, byte[] buffer, int length, String splitFileDirPath)
      throws IOException {

        File splitFile = File.createTempFile(largeFileName + "-", "-split", new File(splitFileDirPath));
        try (FileOutputStream fos = new FileOutputStream(splitFile)) {
            fos.write(buffer, 0, length);
        }
        return splitFile;
    }
}
```

使用`maxSizeOfSplitFiles`，我们可以指定每个较小的文件块可以有多少字节。

**`maxSizeOfSplitFiles`的数据量将被加载到内存中，处理，并制成一个小文件。然后我们丢弃它。**我们读取下一组`maxSizeOfSplitFiles`数据。这确保了不会抛出`OutOfMemoryException`。

作为最后一步，该方法返回存储在`splitFileDirPath`下的拆分文件列表。

我们可以将拆分的文件存储在任何临时目录或任何自定义目录中。

现在，让我们测试一下：

```java
public class SplitLargeFileUnitTest {

    @BeforeClass
    static void prepareData() throws IOException {
        Files.createDirectories(Paths.get("target/split"));
    }

    private String splitFileDirPath() throws Exception {
        return Paths.get("target").toString() + "/split";
    }

    private Path largeFilePath() throws Exception {
        return Paths.get(this.getClass().getClassLoader().getResource("largeFile.txt").toURI());
    }

    @Test
    void givenLargeFile_whenSplitLargeFile_thenSplitBySize() throws Exception {
        File input = largeFilePath().toFile();
        SplitLargeFile slf = new SplitLargeFile();
        slf.splitByFileSize(input, 1024_000, splitFileDirPath());
    }
}
```

最后，一旦我们测试，我们可以看到程序将大文件拆分成四个1MB的文件和一个240KB的文件，并将它们放在项目`target/split`目录下。

## 4. 按文件数量拆分文件

现在，让我们将给定的大文件拆分成指定数量的更小的文件。为此，首先，我们将**检查小文件的大小是否适合根据计数的文件数量**。

同样，我们将使用前面相同的`splitByFileSize()`方法来实际进行拆分。

让我们创建一个`splitByNumberOfFiles()`方法：

```java
class SplitLargeFile {

    public List````<File>```` splitByNumberOfFiles(File largeFile, int noOfFiles, String splitFileDirPath)
      throws IOException {
        return splitByFileSize(largeFile, getSizeInBytes(largeFile.length(), noOfFiles), splitFileDirPath);
    }

    private int getSizeInBytes(long largefileSizeInBytes, int numberOfFilesforSplit) {
        if (largefileSizeInBytes % numberOfFilesforSplit != 0) {
            largefileSizeInBytes = ((largefileSizeInBytes / numberOfFilesforSplit) + 1) * numberOfFilesforSplit;
        }
        long x = largefileSizeInBytes / numberOfFilesforSplit;
        if (x > Integer.MAX_VALUE) {
            throw new NumberFormatException("size too large");
        }
        return (int) x;
    }
}
```

现在，让我们测试一下：

```java
@Test
void givenLargeFile_whenSplitLargeFile_thenSplitByNumberOfFiles() throws Exception {
    File input = largeFilePath().toFile();
    SplitLargeFile slf = new SplitLargeFile();
    slf.splitByNumberOfFiles(input, 3, splitFileDirPath());
}
```

最后，一旦我们测试，我们可以看到程序将大文件拆分成3个1.4MB的文件，并将其放在项目`target/split`目录下。

## 5. 结论

在本文中，我们看到了在内存中读取文件和通过流读取文件之间的区别，这有助于我们为任何用例选择适当的方法。之后，我们讨论了如何将大文件拆分成小文件。然后，我们学习了按大小拆分和按文件数量拆分。

正如往常一样，本文中使用的所有示例代码都在GitHub上。