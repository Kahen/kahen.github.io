---
date: 2024-06-26
category:
  - XML
  - CSV
tag:
  - Java
  - 数据转换
head:
  - - meta
    - name: keywords
      content: XML转CSV, Java, 数据交换格式
---
# 将 XML 文件转换为 CSV 文件 | Baeldung

在本文中，我们将探索使用 Java 将 XML 文件转换为 CSV 格式的多种方法。

XML（可扩展标记语言）和 CSV（逗号分隔值）都是数据交换的流行选择。**虽然 XML 是一个强大的选项，允许对复杂数据集进行结构化、分层的方法，但 CSV 更直接，主要设计用于表格数据。**

有时，我们可能需要将 XML 转换为 CSV，以使数据导入或分析更加容易。

## **2. XML 数据布局介绍**

设想我们经营着一群书店，我们将库存数据存储在类似于下面示例的 XML 格式中：

```xml
``<?xml version="1.0"?>``
`<Bookstores>`
    `<Bookstore id="S001">`
        ``<Books>``
            `<Book id="B001" category="Fiction">`
                ```<Title>```Death and the Penguin```</Title>```
                `<Author id="A001">`Andrey Kurkov```</Author>```
                ```<Price>```10.99```</Price>```
            ```</Book>```
            `<Book id="B002" category="Poetry">`
                ```<Title>```Kobzar```</Title>```
                `<Author id="A002">`Taras Shevchenko```</Author>```
                ```<Price>```8.50```</Price>```
            ```</Book>```
        ``</Books>``
    ``</Bookstore>``
    `<Bookstore id="S002">`
        ``<Books>``
            `<Book id="B003" category="Novel">`
                ```<Title>```Voroshilovgrad```</Title>```
                `<Author id="A003">`Serhiy Zhadan```</Author>```
                ```<Price>```12.99```</Price>```
            ```</Book>```
        ``</Books>``
    ``</Bookstore>``
`</Bookstores>`
```

此 XML 将属性 'id' 和 'category' 以及文本元素 'Title'、'Author' 和 'Price' 整齐地组织在一个层次结构中。确保结构良好的 XML 简化了转换过程，使其更加直接和无误。

我们的目标是将这些数据转换为 CSV 格式，以便在表格形式中更容易处理。例如，让我们看看我们的 XML 数据中的书店如何在 CSV 格式中表示：

```
bookstore_id,book_id,category,title,author_id,author_name,price
S001,B001,Fiction,Death and the Penguin,A001,Andrey Kurkov,10.99
S001,B002,Poetry,Kobzar,A002,Taras Shevchenko,8.50
S002,B003,Novel,Voroshilovgrad,A003,Serhiy Zhadan,12.99
```

接下来，我们将讨论实现这种转换的方法。

## **3. 使用 XSLT 转换**

### 3.1. XSLT 介绍

**XSLT（可扩展样式表语言转换）是一个将 XML 文件转换为 HTML、纯文本甚至 CSV 等其他格式的工具。**

它通过遵循在特殊样式表中设置的规则来操作，通常是一个 XSL 文件。当我们的目标是将 XML 转换为 CSV 以便于使用时，这变得特别有用。

### 3.2. XSLT 转换过程

要开始，我们需要创建一个 XSLT 样式表，该样式表使用 XPath 导航 XML 树结构，并指定如何将 XML 元素转换为 CSV 行和列。

下面是一个这样的 XSLT 文件示例：

```xml
``<?xml version="1.0"?>``
`<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">`
    `<xsl:output method="text" omit-xml-declaration="yes" indent="no"/>`
    `<xsl:template match="/">`
        ````<xsl:text>````bookstore_id,book_id,category,title,author_id,author_name,price````</xsl:text>````
        ````<xsl:text>````&#xA;````</xsl:text>````
        `<xsl:for-each select="//Bookstore">`
            `<xsl:variable name="bookstore_id" select="@id"/>`
            `<xsl:for-each select="./Books/Book">`
                `<xsl:variable name="book_id" select="@id"/>`
                `<xsl:variable name="category" select="@category"/>`
                `<xsl:variable name="title" select="Title"/>`
                `<xsl:variable name="author_id" select="Author/@id"/>`
                `<xsl:variable name="author_name" select="Author"/>`
                `<xsl:variable name="price" select="Price"/>`
                `<xsl:value-of select="concat($bookstore_id, ',', $book_id, ',', $category, ',', $title, ',', $author_id, ',', $author_name, ',', $price)"/>`
                ````<xsl:text>````&#xA;````</xsl:text>````
            ``</xsl:for-each>``
        ``</xsl:for-each>``
    `</xsl:template>`
`</xsl:stylesheet>`
```

这个样式表首先匹配根元素，然后检查每个 'Bookstore' 节点，收集它的属性和子元素。比如书的 _id_、_category_ 等，到变量中。然后使用这些变量构建 CSV 文件的每一行。CSV 将有列用于书店 ID、书籍 ID、类别、标题、作者 ID、作者名称和价格。

_\`<xsl:template>`_ 设置转换规则。它使用 _\`<xsl:template match="/"\>`_ 定位 XML 根，并定义 CSV 标题。

指令 \`<xsl:for-each select="//Bookstore"\>` 处理每个 'Bookstore' 节点并捕获其属性。另一个内部指令，\`<xsl:for-each select="./Books/Book"\>`，处理当前 'Bookstore' 中的每个 'Book'。

_concat()_ 函数将这些值组合成 CSV 行。

_\````<xsl:text>````&#xA;````</xsl:text>````_ 添加换行符（LF），对应十六进制表示中的 ASCII 值 0xA。

以下是我们如何使用基于 Java 的 XSLT 处理器的示例：

```java
void convertXml2CsvXslt(String xslPath, String xmlPath, String csvPath) throws IOException, TransformerException {
    StreamSource styleSource = new StreamSource(new File(xslPath));
    Transformer transformer = TransformerFactory.newInstance()
      .newTransformer(styleSource);
    Source source = new StreamSource(new File(xmlPath));
    Result outputTarget = new StreamResult(new File(csvPath));
    transformer.transform(source, outputTarget);
}
```

我们使用 _TransformerFactory_ 编译我们的 XSLT 样式表。然后，我们创建一个 _Transformer_ 对象，它负责将这个样式表应用到我们的 XML 数据上，将其转换为 CSV 文件。一旦代码成功运行，指定目录中将出现一个新文件。

使用 XSLT 进行 XML 到 CSV 转换非常方便和灵活，为大多数用例提供了标准化和强大的方法，但它需要将整个 XML 文件加载到内存中。这可能是一个缺点，对于大文件。虽然它非常适合中等大小的数据集，如果我们有一个更大的数据集，您可能需要考虑使用 StAX，我们将在接下来讨论。

## **4. 使用 StAX**

### 4.1. StAX 介绍

StAX（Streaming API for XML）旨在以更节省内存的方式读取和写入 XML 文件。它允许我们即时处理 XML 文档，非常适合处理大文件。

使用 StAX 进行转换涉及三个主要步骤。

- 初始化 StAX 解析器
- 读取 XML 元素
- 写入 CSV

### 4.2. StAX 转换过程

这里是一个完整的示例，封装在一个名为 _convertXml2CsvStax()_ 的方法中：

```java
void convertXml2CsvStax(String xmlFilePath, String csvFilePath) throws IOException, TransformerException {
    XMLInputFactory inputFactory = XMLInputFactory.newInstance();

    try (InputStream in = Files.newInputStream(Paths.get(xmlFilePath)); BufferedWriter writer = new BufferedWriter(new FileWriter(csvFilePath))) {
        writer.write("bookstore_id,book_id,category,title,author_id,author_name,price\n");

        XMLStreamReader reader = inputFactory.createXMLStreamReader(in);

        String currentElement;
        StringBuilder csvRow = new StringBuilder();
        StringBuilder bookstoreInfo = new StringBuilder();

        while (reader.hasNext()) {
            int eventType = reader.next();

            switch (eventType) {
                case XMLStreamConstants.START_ELEMENT:
                    currentElement = reader.getLocalName();
                    if ("Bookstore".equals(currentElement)) {
                        bookstoreInfo.setLength(0);
                        bookstoreInfo.append(reader.getAttributeValue(null, "id"))
                          .append(",");
                    }
                    if ("Book".equals(currentElement)) {
                        csvRow.append(bookstoreInfo)
                          .append(reader.getAttributeValue(null, "id"))
                          .append(",")
                          .append(reader.getAttributeValue(null, "category"))
                          .append(",");
                    }
                    if ("Author".equals(currentElement)) {
                        csvRow.append(reader.getAttributeValue(null, "id"))
                          .append(",");
                    }
                    break;

                case XMLStreamConstants.CHARACTERS:
如果翻译没有结束请继续，结束了请回复OK。

在这种情况下，我将继续翻译剩余的部分：

```java
                    if (!reader.isWhiteSpace()) {
                        csvRow.append(reader.getText().trim()).append(",");
                    }
                    break;

                case XMLStreamConstants.END_ELEMENT:
                    if ("Book".equals(reader.getLocalName())) {
                        csvRow.setLength(csvRow.length() - 1);
                        csvRow.append("\n");
                        writer.write(csvRow.toString());
                        csvRow.setLength(0);
                    }
                    break;
            }
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

首先，我们通过创建 _XMLInputFactory_ 的实例来初始化 StAX 解析器。然后使用这个工厂对象生成一个 _XMLStreamReader_：

```java
XMLInputFactory inputFactory = XMLInputFactory.newInstance();
InputStream in = new FileInputStream(xmlFilePath);
XMLStreamReader reader = inputFactory.createXMLStreamReader(in);
```

**我们使用 _XMLStreamReader_ 遍历 XML 文件，并根据事件类型，如 _START_ELEMENT, CHARACTERS_ 和 _END_ELEMENT_，构建我们的 CSV 行。**

当我们读取 XML 数据时，我们构建 CSV 行，并使用 _BufferedWriter_ 将它们写入输出文件。

**简而言之，StAX 提供了一个内存效率高的解决方案，非常适合处理大型或实时 XML 文件。**虽然它可能需要更多的手动工作，并且缺乏 XSLT 的一些转换特性，但在资源利用是关注点的特定场景中，它表现出色。有了提供的基础知识和示例，我们现在准备好在特定条件适用时使用 StAX 来满足我们的 XML 到 CSV 转换需求。

## **5. 其他方法**

我们主要关注了 XSLT 和 StAX 作为 XML 到 CSV 转换的方法。**然而，还存在其他选项，如 DOM（文档对象模型）解析器、SAX（简单 API for XML）解析器和 Apache Commons CSV。**

不过，有一些因素需要考虑。DOM 解析器非常适合将整个 XML 文件加载到内存中，让您可以自由地遍历和操作 XML 树。另一方面，当您需要将 XML 数据转换为 CSV 格式时，它们会让您的工作更加艰难。

当涉及到 SAX 解析器时，它们更节省内存，但对于复杂的操作可能会带来挑战。它们的事件驱动特性要求您手动管理状态，并且它们不提供在 XML 文档中向前或向后看的选项，这使得某些转换变得复杂。

Apache Commons CSV 在写入 CSV 文件时表现出色，但期望您自己处理 XML 解析部分。

**总结来说，虽然每种替代方案都有自己的优势，但对于这个例子，XSLT 和 StAX 为大多数 XML 到 CSV 转换任务提供了更平衡的解决方案。**

## **6. 最佳实践**

**要将 XML 转换为 CSV，需要考虑几个因素，如数据完整性、性能和错误处理。** 根据其模式验证 XML 对于确认数据结构至关重要。此外，正确地将 XML 元素映射到 CSV 列是一个基本步骤。

对于大文件，使用像 StAX 这样的流技术在内存效率方面可能是有利的。另外，考虑将大文件拆分成更小的批次以便于处理。

**重要的是要提到，本文提供的代码示例可能没有处理 XML 数据中发现的特殊字符，包括但不限于逗号、换行符和双引号。** 例如，字段值中的逗号可能与 CSV 中用于分隔字段的逗号发生冲突。同样，换行符可能会破坏文件的逻辑结构。

解决这些问题可能很复杂，并且根据特定项目要求而有所不同。为了解决逗号问题，您可以在结果 CSV 文件中用双引号括起字段。也就是说，为了使本文中的代码示例易于理解，这些特殊情况没有被解决。因此，应该考虑到这一点以实现更准确的转换。

## **7. 结论**

在本文中，我们探讨了将 XML 转换为 CSV 的各种方法，特别深入研究了 XSLT 和 StAX 方法。无论选择哪种方法，拥有适合 CSV 的良好 XML 结构、实施数据验证以及知道要处理哪些特殊字符对于顺利和成功的转换至关重要。这些示例的代码可在 GitHub 上找到。

OK