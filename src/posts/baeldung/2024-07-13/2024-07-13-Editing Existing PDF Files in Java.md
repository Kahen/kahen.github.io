---
date: 2022-10-01
category:
  - Java
  - PDF
tag:
  - iText7
  - PDF编辑
head:
  - - meta
    - name: keywords
      content: Java, PDF编辑, iText7, 编辑现有PDF文件
---
# Java中编辑现有PDF文件

在这篇文章中，我们将看到如何在Java中编辑现有PDF文件的内容。首先，我们将只添加新内容。然后，我们将专注于移除或替换一些现有的内容。

## 2. 添加iText7依赖

**我们将使用iText7库来向PDF文件添加内容。** 稍后，我们将使用pdfSweep插件来移除或替换内容。

**请注意，iText是在AGPL许可下授权的，这可能会限制商业应用程序的分发：iText许可模型。**

首先，让我们将这些依赖项添加到我们的_pom.xml_中：

```
``<dependency>``
    ``<groupId>``com.itextpdf``</groupId>``
    ``<artifactId>``itext7-core``</artifactId>``
    ``<version>``7.2.3``</version>``
    `<type>`pom`</type>`
``</dependency>``
``<dependency>``
    ``<groupId>``com.itextpdf``</groupId>``
    ``<artifactId>``cleanup``</artifactId>``
    ``<version>``3.0.1``</version>``
``</dependency>``
```

## 3. 文件处理

让我们了解使用iText7处理PDF的步骤：

- 首先，我们打开一个_PdfReader_来读取源文件的内容。如果在读取文件时发生任何错误，这将抛出一个_IOException_。
- 然后，我们向目标文件打开一个_PdfWriter_。如果此文件不存在或无法创建，则会抛出一个_FileNotFoundException_。
- 之后，我们将打开一个使用我们的_PdfReader_和_PdfWriter_的_PdfDocument_。
- 最后，关闭_PdfDocument_将同时关闭底层的_PdfReader_和_PdfWriter_。

让我们编写一个_main()_方法来运行我们的整个处理。为了简单起见，我们将重新抛出可能发生的任何_Exception_：

```java
public static void main(String[] args) throws IOException {
    PdfReader reader = new PdfReader("src/main/resources/baeldung.pdf");
    PdfWriter writer = new PdfWriter("src/main/resources/baeldung-modified.pdf");
    PdfDocument pdfDocument = new PdfDocument(reader, writer);
    addContentToDocument(pdfDocument);
    pdfDocument.close();
}
```

在接下来的部分中，我们将逐步完成_addContentToDocument()_方法，以便用新内容填充我们的PDF。源文档是一个只包含文本“Hello Baeldung _“_在左上角的PDF文件。目标文件将由程序创建。

## 4. 向文件添加内容

现在我们将向文件添加各种类型的内容。

### 4.1. 添加一个表单

**我们将首先向文件添加一个表单。** 我们的表单将非常简单，只包含一个名为_name_的字段。

此外，我们需要告诉iText在哪里放置该字段。在这种情况下，我们将把它放在以下位置：_(35,400)_。坐标_(0,0)_指的是文档的左下角。最后，我们将设置字段的尺寸为_100×30_：

```java
PdfFormField personal = PdfFormField.createEmptyField(pdfDocument);
personal.setFieldName("information");
PdfTextFormField name = PdfFormField.createText(pdfDocument, new Rectangle(35, 400, 100, 30), "name", "");
personal.addKid(name);
PdfAcroForm.getAcroForm(pdfDocument, true)
    .addField(personal, pdfDocument.getFirstPage());
```

此外，我们明确指定iText将表单添加到文档的第一页。

### 4.2. 添加一个新页面

现在让我们看看如何向文档添加一个新页面。**我们将使用_addNewPage()_方法。**

这个方法可以接受添加页面的索引，如果我们想要指定它。例如，我们可以在文档的开头添加一个新页面：

```java
pdfDocument.addNewPage(1);
```

### 4.3. 添加注释

现在我们想要向文档添加一个注释。**具体来说，注释看起来像一个正方形的漫画气泡。**

我们将在现在位于文档第二页的表单上方添加它。因此，我们将把它放在坐标_(40,435)_。此外，我们将给它一个简单的名字和内容。这些只有在悬停在注释上时才会显示：

```java
PdfAnnotation ann = new PdfTextAnnotation(new Rectangle(40, 435, 0, 0)).setTitle(new PdfString("name"))
    .setContents("Your name");
pdfDocument.getPage(2)
    .addAnnotation(ann);
```

这是我们现在第二页中间的样子：

### 4.4. 添加图像

从现在开始，我们将向页面添加布局元素。为了做到这一点，我们将无法再直接操作_PdfDocument_。我们将创建一个从中的_Document_并使用它。此外，我们将在最后关闭_Document_。**关闭_Document_会自动关闭基础_PdfDocument._** 所以我们可以去掉我们之前关闭_PdfDocument_的部分：

```java
Document document = new Document(pdfDocument);
// add layout elements
document.close();
```

**现在，要添加图像，我们需要从其位置加载它。** 我们将使用_ImageDataFactory_类的_create()_方法来实现。如果传递的文件URL无法解析，这将抛出一个_MalformedURLException_。在这个例子中，我们将使用位于资源目录中的Baeldung的标志图像：

```java
ImageData imageData = ImageDataFactory.create("src/main/resources/baeldung.png");
```

下一步将是在文件中设置图像的属性。我们将将其大小设置为_550×100_。我们将把它放在我们PDF的第一页，在_(10,50)_坐标上。让我们看看添加图像的代码：

```java
Image image = new Image(imageData).scaleAbsolute(550,100)
    .setFixedPosition(1, 10, 50);
document.add(image);
```

图像自动调整为给定的大小。所以它在文档中看起来是这样的：

### 4.5. 添加段落

**iText库带来了一些工具来向文件添加文本。** 字体可以在段落本身上参数化，也可以直接在_Paragraph_元素上。

例如，让我们在第一页的顶部添加以下句子：_这是来自Baeldung教程的演示。_ 我们将这句话的开始字体大小设置为_16_，并将_Paragraph_的全局字体大小设置为_8_：

```java
Text title = new Text("这是一次演示").setFontSize(16);
Text author = new Text("Baeldung教程。");
Paragraph p = new Paragraph().setFontSize(8)
    .add(title)
    .add("来自")
    .add(author);
document.add(p);
```

### 4.6. 添加表格

**最后但同样重要的是，我们也可以向文件添加一个表格。** 例如，我们将定义一个双列表格，上面有两行和两个标题。我们不会指定任何位置。所以它将自然地添加在文档的顶部，就在我们刚刚添加的_Paragraph_之后：

```java
Table table = new Table(UnitValue.createPercentArray(2));
table.addHeaderCell("#");
table.addHeaderCell("公司");
table.addCell("名字");
table.addCell("baeldung");
document.add(table);
```

让我们看看现在文档第一页的开头：

## 5. 从文件中移除内容

现在让我们看看如何从PDF文件中移除内容。为了保持简单，我们将编写另一个_main()_方法。

我们的源PDF文件将是_baeldung-modified.pdf_文件，目标将是一个新的_baeldung-cleaned.pdf_文件。我们将直接在_PdfDocument_对象上工作。从现在开始，我们将使用iText的pdfSweep插件。

### 5.1. 从文件中移除文本

**为了从文件中移除给定的文本，我们需要定义一个清理策略。** 在这个例子中，策略将简单地找到所有匹配_Baeldung_的文本。最后一步是调用_PdfCleaner_的_autoSweepCleanUp()_静态方法。这个方法将创建一个自定义_PdfCleanUpTool_，如果在文件处理过程中发生任何错误，将抛出一个_IOException_：

```java
CompositeCleanupStrategy strategy = new CompositeCleanupStrategy();
strategy.add(new RegexBasedCleanupStrategy("Baeldung"));
PdfCleaner.autoSweepCleanUp(pdfDocument, strategy);
```

正如我们所看到的，源文件中_Baeldung_一词的出现被黑色矩形覆盖在结果文件中。这种行为适合于数据匿名化：

### 5.2. 从文件中移除其他内容

不幸的是，检测文件中的任何非文本内容是非常困难的。**然而，pdfSweep提供了擦除文件一部分内容的可能性。** 因此，如果我们知道我们想要移除的内容位于哪里，我们将能够利用这种可能性。

例如，我们将擦除位于第二页_(35,400)_的尺寸为_100×35_的矩形内的内容。这意味着我们将摆脱所有表单和注释的内容。此外，我们将擦除第一页_(10,50)_的尺寸为_90×70_的矩形。这基本上移除了Baeldung的标志中的"B"。使用_PdfCleanUpTool_类，以下是执行所有操作的代码：

```java
List`<PdfCleanUpLocation>` cleanUpLocations = Arrays.asList(
    new PdfCleanUpLocation(1, new Rectangle(10, 50, 90, 70)),
    new PdfCleanUpLocation(2, new Rectangle(35, 400, 100, 35))
);
PdfCleanUpTool cleaner = new PdfCleanUpTool(pdfDocument, cleanUpLocations, new CleanUpProperties());
cleaner.cleanUp();
```

现在我们可以在_baeldung-cleaned.pdf_中看到以下图像：

## 6. 在文件中替换内容

在这一部分，我们将做与之前相同的工作，只是**我们将用新文本替换旧文本，而不仅仅是擦除它**。

为了更清晰，我们将再次使用一个新的_main()_方法。我们的源文件将是_baeldung-modified.pdf_文件。我们的目标文件将是一个新的_baeldung-fixed.pdf_文件。

早些时候我们看到移除的文本被黑色背景覆盖。然而，这种颜色是可配置的。由于我们知道文件中文本的背景是白色的，我们将强制覆盖为白色。处理的开始将与我们之前做的类似，只是我们将搜索文本_Baeldung tutorials_。

**然而，在调用_autoSweepCleanUp()_之后，我们将查询策略以获取移除代码的位置。** 然后我们将实例化一个_PdfCanvas_，其中包含替换文本_HIDDEN_。此外，我们将去除上边距，以便它与原始文本更好地对齐。默认的对齐确实不太好。让我们看看结果代码：

```java
CompositeCleanupStrategy strategy = new CompositeCleanupStrategy();
strategy.add(new RegexBasedCleanupStrategy("Baeldung").setRedactionColor(ColorConstants.WHITE));
PdfCleaner.autoSweepCleanUp(pdfDocument, strategy);

for (IPdfTextLocation location : strategy.getResultantLocations()) {
    PdfPage page = pdfDocument.getPage(location.getPageNumber() + 1);
    PdfCanvas pdfCanvas = new PdfCanvas(page.newContentStreamAfter(), page.getResources(), page.getDocument());
    Canvas canvas = new Canvas(pdfCanvas, location.getRectangle());
    canvas.add(new Paragraph("HIDDEN").setFontSize(8)
        .setMarginTop(0f));
}
```

我们可以查看文件：

## 7. 结论

在本教程中，我们看到了如何编辑PDF文件的内容。我们看到我们可以添加新内容，移除现有内容，甚至可以用新文本替换原始文件中的文本。

一如既往，本文的代码可以在GitHub上找到。