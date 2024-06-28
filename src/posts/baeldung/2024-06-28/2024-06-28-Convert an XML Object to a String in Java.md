---
date: 2024-06-28
category:
  - XML
  - Java
tag:
  - XML转换
  - 文档对象模型
  - 简单API
head:
  - - meta
    - name: keywords
      content: Java, XML, DOM, SAX, 转换
---

# 在Java中将XML对象转换为字符串

XML（可扩展标记语言）是用于信息结构化的一种非常流行的模式。此外，在Java中解析和操作XML文档通常使用DOM（文档对象模型）和SAX（简单API for XML）等技术。

在某些情况下，可能需要将XML文档对象转换为其字符串形式，这可以用于将XML信息存储在数据库中或通过网络传输。

**在本教程中，我们将讨论在Java中将XML文档对象转换为字符串的几种方法。**

假设我们有以下文档对象：

`Document document = // ...`

此文档对象在内存中表示XML内容：

```xml
`<?xml version="1.0" encoding="UTF-8" standalone="no"?>`
```<root>```
    `<child1>`This is child element 1`</child1>`
    `<child2>`This is child element 2`</child2>`
`</root>`
```

现在，我们需要将此XML文档对象转换为Java字符串。

### 使用XML转换API

Java中的`javax.xml.transform`包包括执行XML转换的类和接口。它的能力之一是将XML文档对象转换为字符串表示。以下代码演示了如何使用`javax.xml.transform`包将此XML文档对象解析为Java字符串：

```java
@Test
public void givenXMLDocument_whenUsingTransformer_thenConvertXMLToString() throws TransformerException {
    TransformerFactory transformerFactory = TransformerFactory.newInstance();
    Transformer transformer = transformerFactory.newTransformer();
    StringWriter stringWriter = new StringWriter();
    transformer.transform(new DOMSource(document), new StreamResult(stringWriter));
    String result = stringWriter.toString();

    assertTrue(result.contains("```<root>```"));
    assertTrue(result.contains("This is child element 1"));
    assertTrue(result.contains("This is child element 2"));
}
```

我们首先实例化一个`TransformerFactory`和一个`Transformer`，用于XML转换。然后，我们构建一个`StringWriter`来以文本形式存储转换后的XML。然后，`transform()`方法改变XML文档，我们可以使用`stringWrite.toString()`方法将其保存到`result`字符串中。

### 使用Java XMLBeans

使用Java XML操作世界中的XMLBeans方法，将XML文档和字符串之间的转换既简单又灵活。我们使用**_XmlObject.Factory.parse(document)_**，将XML文档解析为`XmlObject`以进行后续操作活动：

```java
@Test
public void givenXMLDocument_whenUsingXmlBeans_thenConvertXMLToString() {
    try {
        XmlObject xmlObject = XmlObject.Factory.parse(document);

        XmlOptions options = new XmlOptions();
        options.setSavePrettyPrint();
        options.setUseDefaultNamespace();
        options.setSaveAggressiveNamespaces();

        String xmlString = xmlObject.xmlText(options);

        xmlString = "`<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>`" + xmlString;

        assertTrue(xmlString.contains("```<root>```"));
        assertTrue(xmlString.contains("This is child element 1"));
        assertTrue(xmlString.contains("This is child element 2"));
    } catch (XmlException e) {
        e.printStackTrace();
    }
}
```

在上述测试方法中，我们使用`XmlOptions`解析文档为`XmlObject`，以自定义输出格式化，例如美化打印、命名空间等。此外，进行`asserts`以确定结果XML字符串包含XML声明和特定的XML元素和元素内容。

### 结论

在本教程中，我们讨论了如何在Java中将XML文档对象转换为字符串。

如常，本文的完整代码示例可以在GitHub上找到。