---
date: 2024-06-14
category:
  - Java
  - PDF
tag:
  - Apache PDFBox
  - iText
---
# 使用Java合并多个PDF文件

在现代商业和文档管理流程中，将多个PDF文件合并成一个单独的PDF文档是一个常见的需求。常见的用例包括演示文稿、整合报告或将多个包编译成一个单一的包。

在Java中，存在多个库，它们提供了现成的功能来处理PDF并将它们合并成一个单独的PDF。Apache PDFBox和iText是其中最受欢迎的。

在本教程中，我们将使用Apache PDFBox和iText实现PDF合并功能。

## 2. 设置

在深入实现之前，让我们先了解必要的设置步骤。我们将为项目添加所需的依赖项，此外，我们将为我们的测试创建辅助方法。

### 2.1. 依赖项

我们将使用Apache PDFBox和iText来合并PDF文件。要使用Apache PDFBox，我们需要在_pom.xml_文件中添加以下依赖项：

```xml
\<dependency\>
    \<groupId\>org.apache.pdfbox\</groupId\>
    \<artifactId\>pdfbox\</artifactId\>
    \<version\>2.0.31\</version\>
\</dependency\>
```

要使用iText，我们需要在_pom.xml_文件中添加以下依赖项：

```xml
\<dependency\>
    \<groupId\>com.itextpdf\</groupId\>
    \<artifactId\>itextpdf\</artifactId\>
    \<version\>5.5.13.3\</version\>
\</dependency\>
```

### 2.2. 测试设置

让我们创建一个我们将用于测试我们逻辑的示例PDF文件。我们可以创建一个实用方法来创建PDF，这样我们就可以跨不同的测试使用它：

```java
static void createPDFDoc(String content, String filePath) throws IOException {
    PDDocument document = new PDDocument();
    for (int i = 0; i \< 3; i++) {
        PDPage page = new PDPage();
        document.addPage(page);

        try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
            contentStream.beginText();
            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 14);
            contentStream.showText(content + ", page:" + i);
            contentStream.endText();
        }
    }
    document.save("src/test/resources/temp/" + filePath);
    document.close();
}
```

在上面的逻辑中，我们创建了一个PDF文档，并使用自定义字体添加了三页。既然我们有了_createPDFDoc()_方法，让我们在每个测试之前调用它，并在测试完成后删除文件：

```java
@BeforeEach
public void create() throws IOException {
    File tempDirectory = new File("src/test/resources/temp");
    tempDirectory.mkdirs();
    List.of(List.of("hello_world1", "file1.pdf"), List.of("hello_world2", "file2.pdf"))
        .forEach(pair -\> {
            try {
                createPDFDoc(pair.get(0), pair.get(1));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
}

@AfterEach
public void destroy() throws IOException {
    Stream\<Path\> paths = Files.walk(Paths.get("src/test/resources/temp/"));
    paths.sorted((p1, p2) -\> -p1.compareTo(p2))
         .forEach(path -\> {
            try {
                Files.delete(path);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
}
```

## 3. 使用Apache PDFBox

Apache PDFBox是一个开源的Java库，用于处理PDF文档。它提供了一系列的功能，以编程方式创建、操作和从PDF文件中提取内容。

**PDFBox提供了一个_PDFMergerUtility_帮助类来合并多个PDF文档。我们可以使用_addSource()_方法添加PDF文件。_mergeDocuments()_方法合并所有添加的源，结果是一个最终合并的PDF文档：**

```java
void mergeUsingPDFBox(List\<String\> pdfFiles, String outputFile) throws IOException {
    PDFMergerUtility pdfMergerUtility = new PDFMergerUtility();
    pdfMergerUtility.setDestinationFileName(outputFile);

    pdfFiles.forEach(file -\> {
        try {
            pdfMergerUtility.addSource(new File(file));
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
    });

    pdfMergerUtility.mergeDocuments(MemoryUsageSetting.setupMainMemoryOnly());
}
```

如上所示，_mergeDocuments()_方法接受一个参数来配置合并文档时的内存使用。我们定义仅使用主内存，即RAM，在合并文档期间进行缓冲。我们可以选择许多其他缓冲内存的选项，包括磁盘、RAM和磁盘的组合等。

我们可以编写一个单元测试来验证合并逻辑是否按预期工作：

```java
@Test
void givenMultiplePdfs_whenMergeUsingPDFBoxExecuted_thenPdfsMerged() throws IOException {
    List\<String\> files = List.of("src/test/resources/temp/file1.pdf", "src/test/resources/temp/file2.pdf");
    PDFMerge pdfMerge = new PDFMerge();
    pdfMerge.mergeUsingPDFBox(files, "src/test/resources/temp/output.pdf");

    try (PDDocument document = PDDocument.load(new File("src/test/resources/temp/output.pdf"))) {
        PDFTextStripper pdfStripper = new PDFTextStripper();
        String actual = pdfStripper.getText(document);
        String expected = """
            hello_world1, page:0
            hello_world1, page:1
            hello_world1, page:2
            hello_world2, page:0
            hello_world2, page:1
            hello_world2, page:2
            """;
        assertEquals(expected, actual);
    }
}
```

在上面的测试中，我们使用PDFBox将两个PDF文件合并到一个输出文件中，并验证了合并的内容。

## 4. 使用iText

iText是另一个流行的Java库，用于创建和操作PDF文档。它提供了广泛的功能，如在生成PDF文件时包括文本、图像、表格和其他元素，如超链接和表单字段。

**iText提供了_PdfReader_和_PdfWriter_类，这些类在读取输入文件和将它们写入输出文件时非常有用：**

```java
void mergeUsingIText(List\<String\> pdfFiles, String outputFile) throws IOException, DocumentException {
    List\<PdfReader\> pdfReaders = List.of(new PdfReader(pdfFiles.get(0)), new PdfReader(pdfFiles.get(1)));
    Document document = new Document();
    FileOutputStream fos = new FileOutputStream(outputFile);
    PdfWriter writer = PdfWriter.getInstance(document, fos);
    document.open();
    PdfContentByte directContent = writer.getDirectContent();
    PdfImportedPage pdfImportedPage;
    for (PdfReader pdfReader : pdfReaders) {
        int currentPdfReaderPage = 1;
        while (currentPdfReaderPage \<= pdfReader.getNumberOfPages()) {
            document.newPage();
            pdfImportedPage = writer.getImportedPage(pdfReader, currentPdfReaderPage);
            directContent.addTemplate(pdfImportedPage, 0, 0);
            currentPdfReaderPage++;
        }
    }
    fos.flush();
    document.close();
    fos.close();
}
```

在上面的逻辑中，我们读取然后导入_PdfReader_的页面到_PdfWrite_使用_getImportedPage()_方法，然后将它们添加到_directContent_对象，该对象本质上存储了内容的读取缓冲区。一旦我们完成阅读，我们刷新输出流_fos_，它写入输出文件。

我们可以通过编写单元测试来验证我们的逻辑：

```java
@Test
void givenMultiplePdfs_whenMergeUsingITextExecuted_thenPdfsMerged() throws IOException, DocumentException {
    List\<String\> files = List.of("src/test/resources/temp/file1.pdf", "src/test/resources/temp/file2.pdf");
    PDFMerge pdfMerge = new PDFMerge();
    pdfMerge.mergeUsingIText(files, "src/test/resources/temp/output1.pdf");
    try (PDDocument document = PDDocument.load(new File("src/test/resources/temp/output1.pdf"))) {
        PDFTextStripper pdfStripper = new PDFTextStripper();
        String actual = pdfStripper.getText(document);
        String expected = """
            hello_world1, page:0
            hello_world1, page:1
            hello_world1, page:2
            hello_world2, page:0
            hello_world2, page:1
            hello_world2, page:2
            """;
        assertEquals(expected, actual);
    }
}
```

我们的测试与前一节几乎相同。唯一的区别是我们调用了_mergeUsingIText()_方法，它使用_iText_来合并PDF文件。

## 5. 结论

在本文中，我们探讨了如何使用Apache PDFBox和iText合并PDF文件。这两个库都功能丰富，允许我们处理PDF文件中的不同类型的内容。我们实现了合并功能，并编写了测试来验证结果。

像往常一样，示例的完整源代码可以在GitHub上找到。
