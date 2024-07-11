---
date: 2022-12-01
category:
  - Java
  - iText
tag:
  - PDF
  - Watermark
head:
  - - meta
    - name: keywords
      content: iText, PDF, Watermark, Java
---
# 使用Java中的iText添加水印

iText PDF是一个用于创建和操作PDF文件的Java库。水印有助于保护机密信息。

在本教程中，我们将通过为水印创建一个新的PDF文件并为现有PDF文件添加水印来探索iText PDF库。

## 2. Maven依赖项

在本教程中，我们将使用Maven来管理我们的依赖项。我们将需要iText依赖项来开始使用iText PDF库。此外，我们还需要_AssertJ_依赖项进行测试。我们将在_pom.xml_中添加这两个依赖项：

```xml
``<dependency>``
    ``<groupId>``com.itextpdf``</groupId>``
    ``<artifactId>``itext7-core``</artifactId>``
    ``<version>``7.2.4``</version>``
    `<type>`pom`</type>`
``</dependency>``
``<dependency>``
    ``<groupId>``org.assertj``</groupId>``
    ``<artifactId>``assertj-core``</artifactId>``
    ``<version>``3.25.3``</version>``
    `<scope>`test`</scope>`
``</dependency>``
```

水印有助于在文档或图像文件上叠加或下层文本或徽标。这对于版权保护、数字产品营销、防止伪造等至关重要。

在本教程中，我们将为我们生成的PDF添加“机密”水印。水印将防止未经授权的使用我们生成的PDF：

![img](https://www.baeldung.com/wp-content/uploads/2022/12/watermarks.png)

## 4. 使用iText生成PDF

在本文中，让我们整理一个故事，并使用iText PDF库将我们的故事转换为PDF格式。我们将编写一个简单的程序，_StoryTime_。首先，我们将声明两个_String_类型的变量。我们将在声明的变量中存储我们的故事：

```java
public class StoryTime {
    String aliceStory = "I am ...";
    String paulStory = "I am Paul ..";
}
```

我们将简化_String_值以简化。然后，让我们声明一个_String_类型的变量，该变量将存储我们生成的PDF的输出路径：

```java
public static final String OUTPUT_DIR = "output/alice.pdf";
```

最后，让我们创建一个包含程序逻辑的方法。我们将创建一个_PdfWriter_实例以指定我们的输出路径和名称。

接下来，我们将创建一个_PdfDocument_实例来处理我们的PDF文件。为了将我们的_String_值添加到PDF文档中，我们将创建一个新的_Document_实例：

```java
public void createPdf(String output) throws IOException {

    PdfWriter writer = new PdfWriter(output);
    PdfDocument pdf = new PdfDocument(writer);
    try (Document document = new Document(pdf, PageSize.A4, false)) {
        document.add(new Paragraph(aliceSpeech)
          .setFont(PdfFontFactory.createFont(StandardFonts.TIMES_ROMAN)));
        document.add(new Paragraph(paulSpeech)
          .setFont(PdfFontFactory.createFont(StandardFonts.TIMES_ROMAN)));
        document.close();
    }
}
```

我们的方法将在_OUTPUT_DIR_生成一个新的PDF文件并存储它。

## 5. 向生成的PDF添加水印

在上一节中，我们使用iText PDF库生成了一个PDF文件。首先生成PDF有助于了解页面大小、旋转和页数。这有助于有效地添加水印。让我们为我们的简单程序添加更多的逻辑。我们的程序将向生成的PDF添加水印。

首先，让我们创建一个方法来指定我们水印的属性。我们将设置水印的_Font_、_fontSize_和_Opacity_：

```java
public Paragraph createWatermarkParagraph(String watermark) throws IOException {

    PdfFont font = PdfFontFactory.createFont(StandardFonts.HELVETICA);
    Text text = new Text(watermark);
    text.setFont(font);
    text.setFontSize(56);
    text.setOpacity(0.5f);
    return new Paragraph(text);
}
```

接下来，让我们创建一个包含将水印添加到我们PDF文档的逻辑的方法。该方法将接受_Document_、_Paragraph_和_offset_作为参数。我们将计算放置我们水印段落的位置和旋转：

```java
public void addWatermarkToGeneratedPDF(Document document, int pageIndex,
  Paragraph paragraph, float verticalOffset) {

    PdfPage pdfPage = document.getPdfDocument().getPage(pageIndex);
    PageSize pageSize = (PageSize) pdfPage.getPageSizeWithRotation();
    float x = (pageSize.getLeft() + pageSize.getRight()) / 2;
    float y = (pageSize.getTop() + pageSize.getBottom()) / 2;
    float xOffset = 100f / 2;
    float rotationInRadians = (float) (PI / 180 * 45f);
    document.showTextAligned(paragraph, x - xOffset, y + verticalOffset,
      pageIndex, CENTER, TOP, rotationInRadians);
}
```

我们通过调用_showTextAligned()_方法将水印段落添加到我们的文档中。接下来，让我们编写一个方法来生成一个新的PDF并添加水印。我们将调用_createWatermarkParagraph()_方法和_addWatermarkToGeneratedPDF()_方法：

```java
public void createNewPDF() throws IOException {

    StoryTime storyTime = new StoryTime();
    String waterMark = "CONFIDENTIAL";
    PdfWriter writer = new PdfWriter(storyTime.OUTPUT_FILE);
    PdfDocument pdf = new PdfDocument(writer);

    try (Document document = new Document(pdf)) {
        document.add(new Paragraph(storyTime.alice)
          .setFont(PdfFontFactory.createFont(StandardFonts.TIMES_ROMAN)));
        document.add(new Paragraph(storyTime.paul));
        Paragrapgh paragraph = storyTime.createWatermarkParagraph(waterMark);
        for (int i = 1; i <= document.getPdfDocument().getNumberOfPages(); i++) {
            storyTime.addWatermarkToGeneratedPDF(document, i, paragraph, 0f);
        }
    }
}
```

最后，让我们编写一个单元测试来验证水印的存在：

```java
@Test
public void givenNewTexts_whenGeneratingNewPDFWithIText() throws IOException {

    StoryTime storyTime = new StoryTime();
    String waterMark = "CONFIDENTIAL";
    LocationTextExtractionStrategy extStrategy = new LocationTextExtractionStrategy();
    try (PdfDocument pdfDocument = new PdfDocument(new PdfReader(storyTime.OUTPUT_FILE))) {
        for (int i = 1; i <= pdfDocument.getNumberOfPages(); i++) {
            String textFromPage = getTextFromPage(pdfDocument.getPage(i), extStrategy);
            assertThat(textFromPage).contains(waterMark);
        }
    }
}
```

我们的测试验证了我们生成的PDF中水印的存在。

## 6. 向现有PDF添加水印

**iText PDF库使向现有PDF添加水印变得容易**。我们将首先将我们的PDF文档加载到我们的程序中。并使用iText库来操作我们的现有PDF。

首先，我们需要创建一个添加水印段落的方法。由于我们在上一节中创建了一个，我们也可以在这里使用它。

接下来，我们将创建一个包含将帮助我们向现有PDF添加水印的逻辑的方法。该方法将接受_Document_、_Paragraph_、_PdfExtGState_、pageIndex和offSet_作为参数。在方法中，我们将创建一个新的_PdfCanvas_实例以将数据写入我们的PDF内容流。

然后，我们将计算PDF上水印的位置和旋转。我们将刷新文档并释放状态以提高性能：

```java
public void addWatermarkToExistingPDF(Document document, int pageIndex,
  Paragraph paragraph, PdfExtGState graphicState, float verticalOffset) {

    PdfDocument pdfDocument = document.getPdfDocument();
    PdfPage pdfPage = pdfDocument.getPage(pageIndex);
    PageSize pageSize = (PageSize) pdfPage.getPageSizeWithRotation();
    float x = (pageSize.getLeft() + pageSize.getRight()) / 2;
    float y = (pageSize.getTop() + pageSize.getBottom()) / 2;

    PdfCanvas over = new PdfCanvas(pdfDocument.getPage(pageIndex));
    over.saveState();
    over.setExtGState(graphicState);
    float xOffset = 14 / 2;
    float rotationInRadians = (float) (PI / 180 * 45f);

    document.showTextAligned(paragraph, x - xOffset, y + verticalOffset,
      pageIndex, CENTER, TOP, rotationInRadians);
    document.flush();
    over.restoreState();
    over.release();
}
```

最后，让我们编写一个方法来向现有PDF添加水印。我们将调用_createWatermarkParagraph()_来添加水印段落。此外，我们将调用_addWatermarkToExistingPDF()_来处理向页面添加水印的任务：

```java
public void addWatermarkToExistingPdf() throws IOException {

    StoryTime storyTime = new StoryTime();
    String outputPdf = "output/aliceNew.pdf";
    String watermark = "CONFIDENTIAL";

    try (PdfDocument pdfDocument = new PdfDocument(new PdfReader("output/alice.pdf"),
      new PdfWriter(outputPdf))) {
        Document document = new Document(pdfDocument);
        Paragraph paragraph = storyTime.createWatermarkParagraph(watermark);
        PdfExtGState transparentGraphicState = new PdfExtGState().setFillOpacity(0.5f);
        for (int i = 1; i <= document.getPdfDocument().getNumberOfPages(); i++) {
            storyTime.addWatermarkToExistingPage(document, i, paragraph,
              transparentGraphicState, 0f);
        }
    }
}

```
让我们编写一个单元测试来验证水印的存在：

```java
@Test
public void givenAnExistingPDF_whenManipulatedPDFWithITextmark() throws IOException {
    StoryTime storyTime = new StoryTime();
    String outputPdf = "output/aliceupdated.pdf";
    String watermark = "CONFIDENTIAL";

    LocationTextExtractionStrategy extStrategy
      = new LocationTextExtractionStrategy();
    try (PdfDocument pdfDocument = new PdfDocument(new PdfReader(outputPdf))) {
        for (int i = 1; i <= pdfDocument.getNumberOfPages(); i++) {
            String textFromPage = getTextFromPage(pdfDocument.getPage(i), extStrategy);
            assertThat(textFromPage).contains(watermark);
        }
    }
}
```

我们的测试验证了我们现有PDF中水印的存在。

## 7. 结论

在本教程中，我们通过生成一个新的PDF来探索iText PDF库。我们向生成的PDF添加了水印，然后又向现有PDF添加了水印。iText库在操作PDF方面看起来非常强大。完整的代码可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)![img](https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2022/12/watermarks.png)

OK