---
date: 2022-04-01
category:
  - Java
  - XML
tag:
  - DOM
  - XML Parsing
head:
  - - meta
    - name: keywords
      content: Java, XML, DOM, Document Object Model, XML Parsing
---
# 将包含 XML 的字符串转换为 org.w3c.dom.Document

XML（可扩展标记语言）是当今最常见的数据格式之一，广泛应用于应用程序之间的数据结构化和交换。此外，在Java中，将XML标记文本的某些部分转换为_org.w3c.dom.Document_对象是常见的用例。

在本教程中，我们将讨论如何在Java中将包含XML内容的字符串转换为_Org.w3c.dom.Document_。

_org.w3c.dom.Document_是Java中文档对象模型（DOM）XML API的一个核心组件。这个重要的类代表整个XML文档，并提供了一套全面的方法来浏览、修改和检索XML文档中的数据。在Java中使用XML时，_org.w3c.dom.Document_对象成为一个不可或缺的工具。

为了更好地理解如何创建_org.w3c.dom.Document_对象，让我们看以下示例：

```java
try {
    // 创建DocumentBuilderFactory
    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();

    // 创建DocumentBuilder
    DocumentBuilder builder = factory.newDocumentBuilder();

    // 创建一个新的Document
    Document document = builder.newDocument();

    // 创建示例XML结构
    Element rootElement = document.createElement("root");
    document.appendChild(rootElement);

    Element element = document.createElement("element");
    element.appendChild(document.createTextNode("XML Document Example"));
    rootElement.appendChild(element);

} catch (ParserConfigurationException e) {
    e.printStackTrace();
}
```

在前面的代码中，我们首先创建了解析XML所需的元素，例如_DocumentBuilderFactory_和_DocumentBuilder_。之后，它构建了一个基本的XML架构，其中包含一个标记为_“root”_的初始节点元素，该元素包含另一个称为_“element”_的子节点元素，该元素具有字符串_“XML文档示例”_。此外，XML输出应如下所示：

```
``<root>``
    ``<element>``XML Document Example``</element>``
``</root>``
```

## 3. 从字符串解析XML

需要解析XML字符串，以便将包含XML的字符串转换为_org.w3c.dom.Document_。幸运的是，Java中有几种XML解析库，包括DOM、SAX和StAX。

本文通过专注于DOM解析器来简化解释。让我们逐步了解如何解析包含XML的字符串并创建_org.w3c.dom.Document_对象：

```java
@Test
public void givenValidXMLString_whenParsing_thenDocumentIsCorrect()
    throws ParserConfigurationException {
    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
    DocumentBuilder builder = factory.newDocumentBuilder();
    String xmlString = "``<root>````<element>``XML Parsing Example``</element>````</root>``";
    InputSource is = new InputSource(new StringReader(xmlString));
    Document xmlDoc = null;
    try {
        xmlDoc = builder.parse(is);
    } catch (SAXException e) {
        throw new RuntimeException(e);
    } catch (IOException e) {
        throw new RuntimeException(e);
    }

    assertEquals("root", xmlDoc.getDocumentElement().getNodeName());
    assertEquals("element", xmlDoc.getDocumentElement().getElementsByTagName("element").item(0).getNodeName());
    assertEquals("XML Parsing Example",
      xmlDoc.getDocumentElement().getElementsByTagName("element").item(0).getTextContent());
}
```

在上述代码中，我们创建了_DocumentBuilderFactory_和_DocumentBuilder_，它们对XML解析至关重要。**此外，我们定义了一个示例XML字符串（_xmlString_），它被转换为用于解析的_InputSource_。我们在_try-catch_块中解析XML，并捕获任何可能的异常，如_SAXException_或_IOException_。**

最后，我们使用一系列断言来验证解析的XML文档的正确性，包括使用_getDocumentElement().getNodeName()_检查根元素的名称，使用_getDocumentElement().getElementsByTagName()_检查子元素的名称，以及检查子元素内的文本内容。

## 4. 结论

总之，对于任何处理众多应用程序中基于XML的数据的熟练Java开发人员，从数据处理到Web服务或配置任务，了解如何操作_org.w3c.dom.Document_（NS）至关重要。

如常，本文的完整代码示例可以在GitHub上找到。翻译已经完成，以下是剩余部分：

---

## 4. 结论

总之，对于任何熟练的Java开发者来说，处理众多应用程序中的基于XML的数据，无论是数据处理、Web服务还是配置任务，了解如何操作org.w3c.dom.Document（NS）都是至关重要的。

如常，本文的完整代码示例可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)![img](https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK