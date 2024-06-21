---
date: 2024-06-20
category:
  - Java
  - 编程
tag:
  - InputStream
  - InputStreamReader
head:
  - - meta
    - name: keywords
      content: Java, InputStream, InputStreamReader, 字节流, 字符流, 编码, 转换
---
# Java InputStream与InputStreamReader | Baeldung

在本文中，我们将讨论InputStream类以及它如何处理来自不同来源的二进制信息。我们还将讨论InputStreamReader类以及它与InputStream的不同之处。

## 2. InputStream是什么？
InputStream是一个类，它以字节的形式从源读取二进制数据。因为它是一个抽象类，我们只能通过它的子类来实例化它，比如FileInputStream和ByteArrayInputStream等。

## 3. InputStreamReader是什么？
与InputStream类相比，InputStreamReader直接处理字符或文本。它使用给定的InputStream读取字节，然后根据某种字符集将其转换为字符。我们可以显式设置字符集，比如UTF-8、UTF-16等，或者依赖JVM的默认字符集：

```java
@Test
public void givenAStringWrittenToAFile_whenReadByInputStreamReader_thenShouldMatchWhenRead(@TempDir Path tempDir) throws IOException {
    String sampleTxt = "Good day. This is just a test. Good bye.";
    Path sampleOut = tempDir.resolve("sample-out.txt");
    List`<String>` lines = Arrays.asList(sampleTxt);
    Files.write(sampleOut, lines);
    String absolutePath = String.valueOf(sampleOut.toAbsolutePath());
    try (InputStreamReader reader = new InputStreamReader(new FileInputStream(absolutePath), StandardCharsets.UTF_8)) {
        boolean isMatched = false;
        int b;
        StringBuilder sb = new StringBuilder();
        while ((b = reader.read()) != -1) {
            sb.append((char) b);
            if (sb.toString().contains(sampleTxt)) {
                isMatched = true;
                break;
            }
        }
        assertThat(isMatched).isTrue();
    }
}
```

上述代码片段展示了我们如何使用StandardCharsets.UTF_8常量来显式设置InputStreamReader的编码。

我们的FileInputStream，InputStream的一种类型，被InputStreamReader包装。因此，我们可以看到InputStreamReader将InputStream解释为文本而不是原始字节信息。

InputStreamReader是从字节流到字符流的桥梁。这个类接受一个InputStream实例，读取字节，并使用字符编码将它们解码成字符。它有一个read()方法，读取一个单一的字符。这个方法通过在其底层InputStream的当前位置之前读取一个或多个字节来将字节转换为字符。当流的末尾被到达时，它返回-1。

相比之下，InputStream是所有表示字节输入流的类的超类。这个类是InputStreamReader的主要构造函数参数，意味着任何InputStream的子类都是InputStreamReader的有效字节源。

InputStream类还有一个read()方法，读取一个单个字节。然而，InputStream.read()方法不会将字节解码成字符，而InputStreamReader.read()会。

## 5. 结论
在本文中，我们讨论了InputStream和InputStreamReader。InputStream是一个抽象类，有各种子类专门处理二进制数据，比如FileInputStream和ByteArrayInputStream等。相比之下，InputStreamReader从InputStream读取字节并将其转换为指定编码的字符。

这两个类之间的区别很直接。当我们需要处理二进制数据时，我们应该使用InputStream。如果我们需要处理字符流，我们可能会从使用InputStreamReader中受益。

InputStream是创建InputStreamReader所需的主要构造函数参数。

文章中使用的所有代码示例都可以在GitHub上找到。