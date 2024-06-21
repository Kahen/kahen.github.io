---
date: 2024-06-21
category:
  - XML
  - Java
tag:
  - XML
  - Java
  - Invalid Characters
head:
  - - meta
    - name: keywords
      content: XML, Java, Invalid Characters, XML处理, Java编程
---

# XML中无效字符的处理

## 1. 概述

XML（可扩展标记语言）是用于跨不同平台和应用程序存储和传输数据的最广泛使用的格式之一。然而，尽管其具有强大的功能，XML并非没有问题，处理XML文档中的无效字符就是一个挑战。

在本文中，我们将探讨不同的无效字符以及如何在XML处理中处理它们。

## 2. XML中有效字符

XML规范定义了允许在元素内容和属性值中的字符。根据XML 1.0规范，可接受的字符如下所示。XML将这些范围之外的任何字符视为无效字符：

| **描述** | **范围** | **示例** |
| --- | --- | --- |
| 制表符（水平制表） | 9 (TAB) | \t |
| 换行符（新行） | 10 (LF) | \n |
| 回车符（回到行首） | 13 (CR) | \r |
| 基本多语言平面（BMP）中的字符，不包括代理块 | 32 to 55295 | A, b, &, 1, α（希腊字母α） |
| 辅助私用区A（SMP）中的字符，不包括代理块 | 57344 to 65533 | 😊（笑脸），🎉（派对彩带） |
| 辅助平面中的BMP之外的字符 | 65536 to 1114111 | 🌍（带有经线的地球），🚀（火箭） |

注意：在Unicode中，我们使用代理块作为UTF-16编码中特定的码点范围，以表示基本多语言平面之外的字符。

## 3. XML 1.1和处理无效字符

**XML 1.1作为XML 1.0的更新引入，提供了额外的灵活性和对更广泛字符范围的支持，包括整个Unicode字符集的字符**。它允许1-31范围内的字符（除了TAB、LF和CR）和某些控制字符，如NEL（下一行，Unicode 0x0085）。

XML中的无效字符通常分为两类：

### 4.1. 保留字符

XML为其语法内的特定目的保留了某些字符，例如 _`<_, _>`_, _&_, _"_ 和 _'_。当这些字符在没有适当编码的情况下出现在XML元素的上下文中时，它们可能会破坏解析过程并使XML文档无效。让我们看一个提供无效字符的代码示例：

```java
@Test
void givenXml_whenReservedCharacters_thenThrowException() {
    String invalidXmlString = "`````<?xml version=\"1.1\" encoding=\"UTF-8\"?>``````````<root>``````````<name>`````John & Doe`````</name>``````````</root>`````";
    assertThrowsExactly(SAXParseException.class, () -> parseXmlString(invalidXmlString));
}
```

**我们应该使用预定义的字符实体正确转义保留字符**。例如：

- _`<_ 应该被编码为 _&lt;_
- _>`_ 应该被编码为 _&gt;_
- _&_ 应该被编码为 _&amp;_
- _"_ 应该被编码为 _&quot;_
- _'_ 应该被编码为 _&apos;_

我们可以通过执行以下测试来测试它：

```java
@Test
void givenXml_whenReservedCharactersEscaped_thenSuccess() {
    String validXmlString = "`````<?xml version=\"1.1\" encoding=\"UTF-8\"?>``````````<root>``````````<name>`````John &amp; Doe`````</name>``````````</root>`````";

    assertDoesNotThrow(() -> {
        Document document = parseXmlString(validXmlString);

        assertNotNull(document);
        assertEquals("John & Doe", document.getElementsByTagName("name").item(0).getTextContent());
    });
}
```

处理XML中保留字符的另一种方法是使用CDATA节。它作为封装可能包含被解释为标记的字符的文本块的手段：

```java
@Test
void givenXml_whenUsingCdataForReservedCharacters_thenSuccess() {
    String validXmlString = "`````<?xml version=\"1.1\" encoding=\"UTF-8\"?>``````````<root>``````````<name>``````<![CDATA[John & Doe]]>``````</name>``````````</root>`````";

    assertDoesNotThrow(() -> {
        Document document = parseXmlString(validXmlString);

        assertNotNull(document);
        assertEquals("John & Doe", document.getElementsByTagName("name").item(0).getTextContent());
    });
}
```

### 4.2. Unicode字符

XML文档使用Unicode编码，支持来自不同语言和脚本的广泛字符范围。虽然Unicode提供了广泛的覆盖，但它也包括可能与XML编码标准不兼容的字符，导致解析错误。

让我们考察以下测试场景，我们在其中将记录分隔符纳入XML。Unicode将记录分隔符表示为 _\u001E_：

```java
@Test
void givenXml_whenUnicodeCharacters_thenThrowException() {
    String invalidXmlString = "`````<?xml version=\"1.1\" encoding=\"UTF-8\"?>``````````<root>``````````<name>`````John \u001E Doe`````</name>``````````</root>`````";
    assertThrowsExactly(SAXParseException.class, () -> parseXmlString(invalidXmlString));
}
```

该字符具有ASCII值为30，超出了接受范围。因此，解析它的测试将失败。**要正确处理非ASCII字符，我们应该使用Unicode方案如UTF-8或UTF-16对它们进行编码**。

这确保了在不同平台上的兼容性并避免了数据损坏问题。现在让我们用适当的编码执行以下测试：

```java
@Test
void givenXml_whenUnicodeCharactersEscaped_thenSuccess() {
    String validXmlString = "`````<?xml version=\"1.1\" encoding=\"UTF-8\"?>``````````<root>``````````<name>`````John &#x1E; Doe`````</name>``````````</root>`````";
    assertDoesNotThrow(() -> {
        Document document = parseXmlString(validXmlString);

        assertNotNull(document);
        assertEquals("John \u001E Doe", document.getElementsByTagName("name").item(0).getTextContent());
    });
}
```

## 5. 结论

在本文中，我们探讨了XML中的不同无效字符以及如何有效地处理它们。通过理解无效字符的原因并采用适当的处理策略，开发人员可以确保其XML处理流程的健壮性和可靠性。

如常，完整的源代码可在GitHub上获得。
OK
