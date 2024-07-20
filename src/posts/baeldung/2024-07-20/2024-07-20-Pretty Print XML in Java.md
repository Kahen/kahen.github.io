---
date: 2024-07-21
category:
  - Java
  - XML
tag:
  - Pretty-Print
  - XML
  - Java
head:
  - - meta
    - name: keywords
      content: Java, XML, Pretty-Print, 格式化
------
# Java中美化打印XML

当我们需要手动读取XML文件时，通常我们希望以美化打印的格式来阅读内容。许多文本编辑器或IDE可以重新格式化XML文档。如果我们在Linux环境下工作，我们可以从命令行美化打印XML文件。

然而，有时我们有需求在我们的Java程序中将原始的XML字符串转换为美化打印的格式。例如，我们可能希望在用户界面显示一个美化打印的XML文档，以便更好地视觉理解。

在本教程中，我们将探讨如何在Java中美化打印XML。

## 2. 问题介绍

为了简单起见，我们将以一个未格式化的_emails.xml_文件作为输入：

```
``````<emails>``````
  ``````````<email>``````````
    ``````````<from>``````````Kai``````````</from>``````````
    `````````<to>`````````Amanda`````````</to>`````````
    `````````<time>`````````2018-03-05`````````</time>`````````
    `````````<subject>`````````I am flying to you`````````</subject>`````````
  `````````</email>`````````
  ``````````<email>``````````
    ``````````<from>``````````Jerry``````````</from>``````````
    `````````<to>`````````Tom`````````</to>`````````
    `````````<time>`````````1992-08-08`````````</time>`````````
    `````````<subject>`````````Hey Tom, catch me if you can!`````````</subject>`````````
  `````````</email>`````````
`````</emails>`````
```

正如我们所看到的，_emails.xml_文件格式良好。但由于格式混乱，阅读起来并不容易。

**我们的目标是创建一个方法，将这个丑陋的原始XML字符串转换为一个美化格式的字符串。**

此外，我们将讨论自定义两个常见的输出属性：缩进大小（整数）和抑制XML声明（布尔值）。

缩进大小属性非常直接：它是每个级别缩进的空格数。另一方面，抑制XML声明选项决定我们是否希望在生成的XML中包含XML声明标签。一个典型的XML声明看起来像这样：

```
``<?xml version="1.0" encoding="UTF-8"?>``
```

在本教程中，我们将使用标准Java API和使用外部库的另一种方法来解决这个问题。

接下来，让我们看看它们是如何工作的。

## 3. 使用_Transformer_类美化打印XML

Java API提供了_Transformer_类来进行XML转换。

### 3.1. 使用默认_Transformer_

首先，让我们看看使用_Transformer_类的美化打印解决方案：

```java
public static String prettyPrintByTransformer(String xmlString, int indent, boolean ignoreDeclaration) {
    try {
        InputSource src = new InputSource(new StringReader(xmlString));
        Document document = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(src);

        TransformerFactory transformerFactory = TransformerFactory.newInstance();
        transformerFactory.setAttribute("indent-number", indent);
        Transformer transformer = transformerFactory.newTransformer();
        transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
        transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, ignoreDeclaration ? "yes" : "no");
        transformer.setOutputProperty(OutputKeys.INDENT, "yes");

        Writer out = new StringWriter();
        transformer.transform(new DOMSource(document), new StreamResult(out));
        return out.toString();
    } catch (Exception e) {
        throw new RuntimeException("Error occurs when pretty-printing xml:\n" + xmlString, e);
    }
}
```

现在，让我们快速浏览一下这个方法并弄清楚它的工作原理：

- 首先，我们解析原始的XML字符串并获取一个_Document_对象。
- 接下来，我们获取一个_TransformerFactory_实例并设置所需的缩进大小属性。
- 然后，我们可以从配置的_tranformerFactory_对象中获取一个默认的transformer实例。
- _transformer_对象支持各种输出属性。**为了决定我们是否想要跳过声明，我们设置了_OutputKeys.OMIT_XML_DECLARATION_属性。**
- 由于我们希望有一个美化格式的_String_对象，最后，我们_transform()_解析的XML _Document_到一个_StringWriter_并返回转换后的_String_。

我们在上述方法中的_TransformerFactory_对象上设置了缩进大小。**或者，我们也可以在_transformer_实例上定义_indent-amount_属性：**

```java
transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", String.valueOf(indent));
```

接下来，让我们测试一下这个方法是否如预期工作。

### 3.2. 测试方法

我们的Java项目是一个Maven项目，我们已经将_emails.xml_放在_src/main/resources/xml/email.xml_下。我们创建了_readFromInputStream_方法将输入文件作为_String_读取。但是，我们不会深入这个方法的细节，因为它与我们的主题没有太多关系。假设我们想要将缩进大小设置为2，并在结果中跳过XML声明：

```java
public static void main(String[] args) throws IOException {
    InputStream inputStream = XmlPrettyPrinter.class.getResourceAsStream("/xml/emails.xml");
    String xmlString = readFromInputStream(inputStream);
    System.out.println("Pretty printing by Transformer");
    System.out.println("=============================================");
    System.out.println(prettyPrintByTransformer(xmlString, 2, true));
}
```

正如_main_方法所示，我们读取输入文件作为_String_，然后调用我们的_prettyPrintByTransformer_方法以获得一个美化打印的XML _String_。

接下来，**让我们用Java 8运行_main_方法：**

```
Pretty printing by Transformer
=============================================
``````<emails>``````
  ``````````<email>``````````
    ``````````<from>``````````Kai``````````</from>``````````
    `````````<to>`````````Amanda`````````</to>`````````
    `````````<time>`````````2018-03-05`````````</time>`````````
    `````````<subject>`````````I am flying to you`````````</subject>`````````
  `````````</email>`````````
  ``````````<email>``````````
    ``````````<from>``````````Jerry``````````</from>``````````
    `````````<to>`````````Tom`````````</to>`````````
    `````````<time>`````````1992-08-08`````````</time>`````````
    `````````<subject>`````````Hey Tom, catch me if you can!`````````</subject>`````````
  `````````</email>`````````
`````</emails>`````
```

正如上面的输出所示，我们的方法按预期工作。

然而，如果我们再次用Java 9或更高版本进行测试，我们可能会看到不同的输出。

接下来，**让我们看看如果我们用Java 9运行它会生成什么：**

```
Pretty printing by Transformer
=============================================
``````<emails>``````
 
  ``````````<email>``````````
 
    ``````````<from>``````````Kai``````````</from>``````````
 
    `````````<to>`````````Amanda`````````</to>`````````
 
    `````````<time>`````````2018-03-05`````````</time>`````````
 
    `````````<subject>`````````I am flying to you`````````</subject>`````````
  `````````</email>`````````
 
  ``````````<email>``````````
 
    ``````````<from>``````````Jerry``````````</from>``````````
 
    `````````<to>`````````Tom`````````</to>`````````
 
    `````````<time>`````````1992-08-08`````````</time>`````````
 
    `````````<subject>`````````Hey Tom, catch me if you can!`````````</subject>`````````
 
  `````````</email>`````````
 
`````</emails>`````
 
=============================================
```

正如上面的输出所示，输出中有一些意外的空行。

这是因为我们的原始输入包含元素之间的空白，例如：

```
``````<emails>`````` ``````````<email>`````````` ``````````<from>``````````Kai``````````</from>`````````` ...
```

**从Java 9开始，《Transformer》类的美化打印功能并没有定义实际的格式。因此，空白节点也将作为输出。** 这已经在JDK错误票据中讨论过。此外，Java 9的发布说明也在xml/jaxp部分解释了这一点。

**如果我们希望我们的美化打印方法在不同版本的Java下始终生成相同的格式，我们需要提供一个样式表文件。**

接下来，让我们创建一个简单的_xsl_文件来实现这一点。

### 3.3. 提供一个XSLT文件

首先，让我们创建_prettyprint.xsl_文件来定义输出格式：

```xml
`<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">`
    `<xsl:strip-space elements="*"/>`
    `<xsl:output method="xml" encoding="UTF-8"/>`
    
    `<xsl:template match="@*|node()">`
        `<xsl:copy>`
            `<xsl:apply-templates select="@*|node()"/>`
        `</xsl:copy>`
    `</xsl:template>`
`</xsl:stylesheet>`
```

正如我们所看到的，在_prettyprint.xsl_文件中，**我们使用了`< _xsl:strip-space/_>`元素来移除空白节点，以便它们不会出现在输出中**。

接下来，我们仍然需要对我们的方法进行一些小的更改。我们将不再使用默认的transformer了。相反，**我们将使用我们的XSLT文档创建一个_Transformer_对象：**

```java
Transformer transformer = transformerFactory.newTransformer(new StreamSource(new StringReader(readPrettyPrintXslt())));
```

这里，_readPrettyPrintXslt()_方法读取_prettyprint.xsl_的内容。

现在，如果我们在Java 8和Java 9中测试这个方法，两者都会产生相同的输出：

```
Pretty printing by Transformer
=============================================
``````<emails>``````
  ``````````<email>``````````
    ``````````<from>``````````Kai``````````</from>``````````
    `````````<to>`````````Amanda`````````</to>`````````
    `````````<time>`````````2018-03-05`````````</time>`````````
    `````````<subject>`````````I am flying to you`````````</subject>`````````
  `````````</email>`````````
  ...
`````</emails>`````
```

我们已经使用标准Java API解决了问题。接下来，让我们使用外部库美化打印_emails.xml_。

## 4. 使用Dom4j库美化打印XML

Dom4j是一个流行的XML库。它允许我们轻松地美化打印XML文档。

首先，让我们将Dom4j依赖项添加到我们的_pom.xml_中：

```xml
`<dependency>`
    `<groupId>`org.dom4j`</groupId>`
    `<artifactId>`dom4j`</artifactId>`
    `<version>`2.1.3`</version>`
`</dependency>`
```

我们以2.1.3版本为例。我们可以在Maven中央仓库中找到最新版本。

接下来，让我们看看如何使用Dom4j库美化打印XML：

```java
public static String prettyPrintByDom4j(String xmlString, int indent, boolean skipDeclaration) {
    try {
        OutputFormat format = OutputFormat.createPrettyPrint();
        format.setIndentSize(indent);
        format.setSuppressDeclaration(skipDeclaration);
        format.setEncoding("UTF-8");

        org.dom4j.Document document = DocumentHelper.parseText(xmlString);
        StringWriter sw = new StringWriter();
        XMLWriter writer = new XMLWriter(sw, format);
        writer.write(document);
        return sw.toString();
    } catch (Exception e) {
        throw new RuntimeException("Error occurs when pretty-printing xml:\n" + xmlString, e);
    }
}
```

**Dom4j的_OutputFormat_类提供了一个_createPrettyPrint_方法来创建一个预定义的美化打印_OutputFormat_对象。** 如上方法所示，我们可以在默认美化打印格式上添加一些自定义。在这种情况下，我们设置了缩进大小，并决定是否希望在结果中包含声明。

接下来，我们解析原始的XML字符串并使用准备好的_OutputFormat_实例创建一个_XMLWritter_对象。

最后，_XMLWriter_对象将以所需的格式写入解析的XML文档。

接下来，让我们测试一下它是否可以美化打印_emails.xml_文件。这次，假设我们希望在结果中包含声明，并具有8个缩进大小：

```java
System.out.println("Pretty printing by Dom4j");
System.out.println("=============================================");
System.out.println(prettyPrintByDom4j(xmlString, 8, false));
```

当我们运行该方法时，我们将看到输出：

```
Pretty printing by Dom4j
=============================================
``<?xml version="1.0" encoding="UTF-8"?>``
``````<emails>``````
        ``````````<email>``````````
                ``````````<from>``````````Kai``````````</from>``````````
                `````````<to>`````````Amanda`````````</to>`````````
                `````````<time>`````````2018-03-05`````````</time>`````````
                `````````<subject>`````````I am flying to you`````````</subject>`````````
        `````````</email>`````````
        ``````````<email>``````````
                ``````````<from>``````````Jerry``````````</from>``````````
                `````````<to>`````````Tom`````````</to>`````````
                `````````<time>`````````1992-08-08`````````</time>`````````
                `````````<subject>`````````Hey Tom, catch me if you can!`````````</subject>`````````
        `````````</email>`````````
`````</emails>`````
```

正如上面的输出所示，该方法已经解决了问题。

## 5. 结论

在本文中，我们讨论了在Java中美化打印XML文件的两种方法。

我们可以使用标准Java API美化打印XML。然而，我们需要记住_Transformer_对象可能会根据Java版本产生不同的结果。解决方案是提供一个XSLT文件。

或者，Dom4j库可以直截了当地解决这个问题。

一如既往，代码的完整版本可以在GitHub上找到。