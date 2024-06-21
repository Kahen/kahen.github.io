---
date: 2024-06-14
category:
  - Java
  - XML
tag:
  - XML to PDF
  - Apache FOP
  - iText
---
# 如何在Java中将XML转换为PDF | Baeldung

## 1. 概览

Java提供了多种库和API来处理XML和PDF文档。在Java中将XML转换为PDF涉及解析XML数据，应用样式和格式化，并生成PDF输出。

本文探讨了在Java中将XML转换为PDF的不同方法和库。

## 2. 理解转换过程

在讨论实现细节之前，让我们强调将XML转换为PDF的基本步骤。这个过程通常包括两个主要步骤：

1. **第一步是XML解析，分析XML内容并提取其结构和文本数据。** 在Java中，开发人员可以使用各种XML解析库，如DOM（文档对象模型）、SAX（简单API for XML）和StAX（流API for XML）。
2. **第二步涉及PDF生成。** 这一步包括创建PDF组件，如段落、表格、图像和其他元素。然后根据XML文档中定义的结构对这些组件进行组织和格式化。

## 3. 使用Apache FOP（格式化对象处理器）

Apache FOP是一个强大的开源库，用于将XML数据转换为包括PDF在内的各种输出格式。此外，FOP根据XSL-FO样式表转换XML内容，最终生成高质量的PDF文档。

### 3.1 Apache FOP的工作方式

Apache FOP通过以下关键阶段工作：

- XML解析：Apache FOP首先解析输入的XML数据。**这个过程涉及提取XML文档的结构和内容，** 这通常代表最终PDF输出中要呈现的数据。
- XSL-FO转换：**FOP应用一个XSL-FO样式表将XML元素格式化为相应的PDF元素**，如段落、表格和图像，确保遵守指定的样式和布局规则。
- PDF渲染：将内容转换为XSL-FO格式后，**Apache FOP将其渲染成视觉上吸引人的PDF文档，准确反映原始XML内容。**
- 输出生成：最后，FOP生成一个独立的PDF文件，封装了格式化后的内容，准备保存、显示或分发，适用于各种打印和查看目的。

### 3.2 使用Apache FOP将XML转换为PDF的示例

要使用Apache FOP库及其功能将XML转换为PDF，需要将Apache FOP依赖项集成到我们项目的构建配置中。

如果我们使用Maven，我们可以通过在_pom.xml_文件中包含FOP依赖项来实现这一点：

```
``<dependency>``
    ``<groupId>``org.apache.xmlgraphics``</groupId>``
    ``<artifactId>``fop``</artifactId>``
    ``<version>``2.9``</version>``
``</dependency>``
```

现在，让我们创建一个使用Apache FOP将XML转换为PDF的方法：

```java
void convertXMLtoPDFUsingFop(String xmlFilePath, String xsltFilePath, String pdfFilePath) throws Exception {
    FopFactory fopFactory = FopFactory.newInstance(new File(".").toURI());
    FOUserAgent foUserAgent = fopFactory.newFOUserAgent();

    try (OutputStream out = new BufferedOutputStream(Files.newOutputStream(new File(pdfFilePath).toPath()))) {
        Fop fop = fopFactory.newFop(MimeConstants.MIME_PDF, foUserAgent, out);
        TransformerFactory factory = TransformerFactory.newInstance();
        Transformer transformer = factory.newTransformer(new StreamSource(new File(xsltFilePath)));
        Source src = new StreamSource(new File(xmlFilePath));
        Result res = new SAXResult(fop.getDefaultHandler());
        transformer.transform(src, res);
    }
}
```

上述示例突出了转换过程中涉及的关键步骤，包括：

- 初始化：我们首先通过创建_FopFactory_和_FOUserAgent_的实例来初始化Apache FOP。
- 输出流：我们指定生成的PDF文件的输出流。
- FOP实例创建：使用_FopFactory_创建一个新的Fop实例，指定PDF输出格式。
- XSLT转换：我们根据_xsltFilePath_参数中指定的XSLT样式表创建一个Transformer实例。
- 转换应用：使用XSLT样式表转换定义在_xmlFilePath_参数中的XML数据，并将生成的_FO_（格式化对象）发送到FOP实例进行渲染。
- 输出生成：最后，该方法生成PDF输出并将其保存到在_pdfFilePath_参数中提供的指定文件路径。

## 4. 使用iText库

iText库是一个强大且灵活的解决方案，用于生成和管理PDF文件。它的全面能力使XML内容到PDF文档的转换变得无缝，提供了定制的定制和适应性。

### 4.1 iText的工作方式

iText通过以下关键阶段工作：

- HTML到PDF转换：**iText使用HTML作为中间格式将XML数据转换为PDF。** XML转换为HTML，利用iText的HTML解析能力无缝集成到PDF文档中。
- XML解析和渲染：iText解析XML内容并直接将其渲染到PDF中。它支持各种XML格式，如XHTML、SVG和MathML，并可以应用CSS样式以精确控制布局和外观。
- PDF生成：解析后，iText生成PDF元素，如文本、图像和表格。开发人员可以使用页眉、页脚和其他元素自定义输出，确保符合PDF标准的打印和查看。

### 4.2 使用iText在Java中将XML转换为PDF

要在Java中使用iText库进行PDF生成，我们必须在项目配置中包含_iTextPDF_依赖项。对于Maven，我们可以将iText依赖项添加到我们的_pom.xml_文件中：

```
``<dependency>``
    ``<groupId>``com.itextpdf``</groupId>``
    ``<artifactId>``itextpdf``</artifactId>``
    ``<version>``5.5.13.3``</version>``
``</dependency>``
```

这里是一个简单的示例，演示如何使用iText在Java中将XML转换为PDF：

```java
public static void convertXMLtoPDFUsingIText(String xmlFilePath, String pdfFilePath) throws Exception {
    try (FileOutputStream outputStream = new FileOutputStream(pdfFilePath)) {
        Document document = new Document();
        PdfWriter.getInstance(document, outputStream);
        document.open();

        String xmlContent = new String(Files.readAllBytes(Paths.get(xmlFilePath)));
        document.add(new Paragraph(xmlContent));
        document.close();
    }
}
```

上述示例展示了使用iText在Java中将XML转换为PDF的简单方法。首先，我们创建一个新的PDF文档对象。接下来，我们打开文档以写入内容。然后，我们从指定的文件路径读取XML内容并将其嵌入到PDF文档中。

最后，我们关闭文档和输出流，确保保存的PDF文件以结构化格式包含XML内容。

## 5. 结论

本文通过FOP和iText探索了XML到PDF的转换，为我们提供了宝贵的知识和实用技能。掌握这些技术使我们能够高效地将XML数据转换为精炼的PDF文档，增强了我们的Java应用程序的功能。

如常，源代码可在GitHub上获取。