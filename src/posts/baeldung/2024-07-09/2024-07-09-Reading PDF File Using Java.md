---
date: 2024-07-10
category:
  - Java
  - 教程
tag:
  - PDF
  - Apache PDFBox
  - iText
head:
  - - meta
    - name: keywords
      content: Java, PDF, Apache PDFBox, iText, 文档处理
---

# Java中读取PDF文件的教程

1. 概述

便携式文档格式（PDF）是一种用于文档的常见文件格式。它用于分发需要保留原始格式的电子文档。

在本教程中，我们将探索Java中读取PDF文件的两个最流行的库：Apache PDFBox和iText。

2. 配置

我们将使用Maven来管理依赖。

此外，我们将向项目根目录添加一个示例PDF文件。该文件包含一个简单的短语“Hello World!”。

接下来，我们将读取示例PDF文件，并测试提取的文本与预期结果是否一致。

3. 使用Apache PDFBox

**Apache PDFBox是一个用于处理和操作PDF文档的免费开源Java库**。其功能包括提取文本、将PDF渲染成图像以及合并和拆分PDF。

让我们将Apache PDFBox依赖项添加到_pom.xml_：

```
``<dependency>``
    ``<groupId>``org.apache.pdfbox``</groupId>``
    ``<artifactId>``pdfbox``</artifactId>``
    ``<version>``${pdfbox.version}``</version>``
``</dependency>``
```

以下是使用Apache PDFBox从PDF文件中读取文本的简单示例：

```
@Test
public void givenSamplePdf_whenUsingApachePdfBox_thenCompareOutput() throws IOException {
    String expectedText = "Hello World!\n";
    File file = new File("sample.pdf");
    PDDocument document = PDDocument.load(file);
    PDFTextStripper stripper = new PDFTextStripper();
    String text = stripper.getText(document);
    document.close();

    assertEquals(expectedText, text);
}
```

在这个示例中，我们创建了一个新的_PDDocument_实例来将PDF文件加载到程序中。然后，我们创建了一个新的_PDFTextStripper_实例，并调用_getText()_从PDF文件中提取文本。

4. 使用iText

**iText是一个用于在Java中生成和使用PDF文件的开源库**。它提供了一个简单的API，用于从PDF文件中读取文本。

首先，让我们在_pom.xml_中包括iText依赖项：

```
``<dependency>``
    ``<groupId>``com.itextpdf``</groupId>``
    ``<artifactId>``itextpdf``</artifactId>``
    ``<version>``${itextpdf.version}``</version>``
``</dependency>``
```

让我们看看使用iText PDF库从PDF文件中提取文本的简单示例：

```
@Test
public void givenSamplePdf_whenUsingiTextPdf_thenCompareOutput() throws IOException {
    String expectedText = "Hello World!";
    PdfReader reader = new PdfReader("sample.pdf");
    int pages = reader.getNumberOfPages();
    StringBuilder text = new StringBuilder();
    for (int i = 1; i <= pages; i++) {
        text.append(PdfTextExtractor.getTextFromPage(reader, i));
    }
    reader.close();

    assertEquals(expectedText, text.toString());
}
```

在这个示例中，我们创建了一个新的_PdfReader_实例来打开PDF文件。然后，我们调用_getNumberOfPages()_方法来获取PDF文件的页数。最后，我们循环遍历页面，并在_PdfTextExtractor_上调用_getTextFromPage()_来提取页面的内容。

5. 结论

在本文中，我们学习了在Java中读取PDF文件的两种不同方式。我们使用了iText和Apache PDFBox库从示例PDF文件中提取文本。这两个库都提供了简单有效的API来从PDF文档中提取文本。

像往常一样，示例的完整源代码可以在GitHub上找到。

[给Kimi加油](kimi://action?name=cheer-on-kimi)