---
date: 2024-06-13
category:
  - Java
  - XML
tag:
  - XML转换
  - DOM
  - Java
---

# 在Java中将org.w3c.dom.Document转换为String的方法 | Baeldung## 概述

在Java中处理XML时，我们经常需要将一个_org.w3c.dom.Document_实例转换为_String_。**通常我们可能出于多种原因需要这样做，例如序列化、记录日志以及处理HTTP请求或响应。**

在这个快速教程中，我们将看到如何将一个_Document_转换为_String_。要了解更多关于Java中使用XML的信息，请查看我们关于XML的全面系列。

## 创建一个简单的文档

本教程的示例将集中在一个描述一些水果的简单XML文档上：

```
<fruit>
    <name>Apple</name>
    <color>Red</color>
    <weight unit="grams">150</weight>
    <sweetness>7</sweetness>
</fruit>
```

让我们继续从该字符串创建一个XML _Document_对象：

```java
private static final String FRUIT_XML = "<fruit><name>Apple</name><color>Red</color><weight unit=\"grams\">150</weight><sweetness>7</sweetness></fruit>";
public static Document getDocument() throws SAXException, IOException, ParserConfigurationException {
    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
    Document document = factory.newDocumentBuilder()
      .parse(new InputSource(new StringReader(FRUIT_XML)));
    return document;
}
```

如我们所见，我们创建了一个用于构建新_Document_的工厂，然后我们调用了使用给定输入源内容的_parse_方法。在这种情况下，我们的输入源是一个包含我们水果XML字符串有效载荷的_StringReader_对象。

## 使用XML转换API进行转换

**_javax.xml.transform_包包含一组通用API，用于执行从源到结果的转换**。在我们的情况下，源是XML文档，结果是输出字符串：

```java
public static String toString(Document document) throws TransformerException {
    TransformerFactory transformerFactory = TransformerFactory.newInstance();
    Transformer transformer = transformerFactory.newTransformer();
    StringWriter stringWriter = new StringWriter();
    transformer.transform(new DOMSource(document), new StreamResult(stringWriter));
    return stringWriter.toString();
}
```

让我们浏览一下我们的_toString_方法的关键部分：

首先，我们开始创建我们的_TransformerFactory_。我们将使用这个工厂来创建转换器，在本例中，转换器将简单地使用平台的默认设置。

现在，我们可以指定转换的源和结果。在这里，我们将使用我们的_Document_来构建一个DOM源和一个_StringWriter_来保存结果。

**最后，我们调用我们的_StringWriter_对象上的_toString_，它将字符流的当前值作为字符串返回。**

## 单元测试

现在我们有了一个将XML文档转换为字符串的简单方法，让我们继续测试它是否正常工作：

```java
@Test
public void givenXMLDocument_thenConvertToStringSuccessfully() throws Exception {
    Document document = XmlDocumentToString.getDocument();

    String expectedDeclartion = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>";
    assertEquals(expectedDeclartion + XmlDocumentToString.FRUIT_XML, XmlDocumentToString.toString(document));
}
```

**请注意，我们的转换默认会在字符串的开头添加标准的XML声明。在我们的测试中，我们简单地检查转换后的字符串是否与原始的水果XML匹配，**包括标准声明。

## 自定义输出

现在，让我们看看我们的输出。默认情况下，我们的转换器不会应用任何形式的输出格式化：

```
<?xml version="1.0" encoding="UTF-8" standalone="no"?><fruit><name>Apple</name><color>Red</color><weight unit="grams">150</weight><sweetness>7</sweetness></fruit>
```

显然，对于大型文档，使用这种单行格式化，我们的XML文档很快就会变得难以阅读。幸运的是，_Transformer_接口提供了多种输出属性来帮助我们。

让我们使用这些输出属性稍微重构一下我们的转换代码：

```java
public static String toStringWithOptions(Document document) throws TransformerException {
    Transformer transformer = getTransformer();
    transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
    transformer.setOutputProperty(OutputKeys.INDENT, "yes");
    transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");

    StringWriter stringWriter = new StringWriter();
    transformer.transform(new DOMSource(document), new StreamResult(stringWriter));
    return stringWriter.toString();
}

private static Transformer getTransformer() throws TransformerConfigurationException {
    TransformerFactory transformerFactory = TransformerFactory.newInstance();
    return transformerFactory.newTransformer();
}
```

有时，我们可能想要排除XML声明。我们可以通过设置_OutputKeys.OMIT_XML_DECLARATION_属性来配置我们的转换器来做到这一点。

现在，要应用一些缩进，我们可以使用两个属性：_OutputKeys.INDENT_和缩进量属性来指定缩进量。这将正确地缩进输出，因为默认情况下，缩进使用零个空格。

通过设置上述属性，我们得到了一个看起来更好的输出：

```
<fruit>
    <name>Apple</name>
    <color>Red</color>
    <weight unit="grams">150</weight>
    <sweetness>7</sweetness>
</fruit>
```

## 结论

在这篇简短的文章中，我们学习了如何从Java _String_对象创建XML Document，然后我们看到了如何使用_javax.xml.transform_包将这个Document转换回_String_。

除此之外，我们还看到了几种自定义XML输出的方法，这在将XML记录到控制台时非常有用。

如往常一样，文章的完整源代码可以在GitHub上找到。

OK