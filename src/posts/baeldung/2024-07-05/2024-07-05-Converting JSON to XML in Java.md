---
date: 2024-07-05
category:
  - Java
  - XML
tag:
  - JSON
  - XML
  - 数据转换
head:
  - - meta
    - name: keywords
      content: Java, JSON, XML, 数据转换
---

# Java中将JSON转换为XML

## 1. 概述

JSON和XML是两种流行的数据交换格式。在实际应用中，我们经常需要在它们之间进行转换。

在本教程中，我们将探讨在Java中将JSON转换为XML的不同方法。

## 2. JSON-Java库

首先，JSON-Java库提供了一种简单的方法将JSON转换为XML。

### 2.1. 依赖项

让我们从向我们的_pom.xml_添加JSON-Java依赖项开始：

```xml
```<dependency>```
    ```<groupId>```org.json```</groupId>```
    ```<artifactId>```json```</artifactId>```
    ```<version>```20240303```</version>```
```</dependency>```
```

### 2.2. 代码示例

我们可以使用测试用例来演示转换。让我们创建一个测试用例，将JSON字符串转换为XML：

```java
@Test
public void givenJsonString_whenConvertToXMLUsingJsonJava_thenConverted() {
    String jsonString = "{\"name\":\"John\", \"age\":20, \"address\":{\"street\":\"Wall Street\", \"city\":\"New York\"}}";
    JSONObject jsonObject = new JSONObject(jsonString);
    String xmlString = XML.toString(jsonObject);
    Assertions.assertEquals("``<address>````<city>``New York```</city>``````<street>```Wall Street```</street>``````</address>````````<name>`````John`````</name>`````````<age>````20`````</age>`````", xmlString);
}

```

如我们所见，我们可以使用_XML.toString()_方法将JSON字符串转换为XML。此方法接受一个_JSONObject_作为参数，并返回一个XML字符串。然后我们断言字符串符合预期。

此方法创建了一个紧凑的XML字符串，其中每个键都转换为XML标签，值是标签的文本内容。

## 3. Jackson

Jackson是Java的一个流行的JSON库。它也可以用来将JSON转换为XML。

### 3.1. 依赖项

让我们从向我们的_pom.xml_添加Jackson依赖项开始：

```xml
```<dependency>```
    ```<groupId>```com.fasterxml.jackson.core```</groupId>```
    ```<artifactId>```jackson-databind```</artifactId>```
    ```<version>```2.15.2```</version>```
```</dependency>```
```

### 3.2. 代码示例

接下来，我们将创建一个测试用例，使用Jackson将JSON字符串转换为XML：

```java
@Test
public void givenJsonString_whenConvertToXMLUsingJackson_thenConverted() throws JsonProcessingException {
    String jsonString = "{\"name\":\"John\", \"age\":20, \"address\":{\"street\":\"Wall Street\", \"city\":\"New York\"}}";
    ObjectMapper objectMapper = new ObjectMapper();
    JsonNode jsonNode = objectMapper.readTree(jsonString);
    String xmlString = new XmlMapper().writeValueAsString(jsonNode);
    Assertions.assertEquals("`<ObjectNode>``````<name>`````John`````</name>`````````<age>````20`````</age>`````(address)```<street>```Wall Street```</street>```(city)New York```</city>``````</address>````</ObjectNode>`", xmlString);
}

```

如我们所见，我们可以使用_XmlMapper_类将JSON字符串转换为XML。该类有一个_writeValueAsString()_方法，它接受一个_JsonNode_作为参数，并返回一个XML字符串。此外，输出标签被包装在_ObjectNode_标签中。

### 3.3. 自定义输出

在前一个示例中，我们看到输出的XML字符串没有格式化，没有XML声明，根标签是_ObjectNode_。由于这不符合XML标准，**我们可以自定义输出以使其更具可读性和符合标准。**

让我们向_XmlMapper_对象添加一些配置选项以自定义输出：

```java
@Test
public void givenJsonString_whenConvertToXMLUsingJacksonWithXMLDeclarationAndRoot_thenConverted() throws JsonProcessingException {
    String jsonString = "{\"name\":\"John\", \"age\":20, \"address\":{\"street\":\"Wall Street\", \"city\":\"New York\"}}";
    ObjectMapper objectMapper = new ObjectMapper();
    JsonNode jsonNode = objectMapper.readTree(jsonString);

    XmlMapper xmlMapper = new XmlMapper();
    xmlMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
    xmlMapper.configure(ToXmlGenerator.Feature.WRITE_XML_DECLARATION, true);
    xmlMapper.configure(ToXmlGenerator.Feature.WRITE_XML_1_1, true);

    String xmlString = xmlMapper.writer().withRootName("root").writeValueAsString(jsonNode);

    Assertions.assertEquals("`<?xml version='1.1' encoding='UTF-8'?>`" + System.lineSeparator() +
        "```<root>```" + System.lineSeparator() +
        "  `````<name>`````John`````</name>`````" + System.lineSeparator() +
        "  ````<age>````20`````</age>`````" + System.lineSeparator() +
        "  ``<address>``" + System.lineSeparator() +
        "    ```<street>```Wall Street```</street>```" + System.lineSeparator() +
        "    ``<city>``New York```</city>```" + System.lineSeparator() +
        "  ```</address>```" + System.lineSeparator() +
        "```</root>```" + System.lineSeparator(), xmlString);
}

```

在这里，我们向_XmlMapper_对象添加了一些配置选项：

- _SerializationFeature.INDENT_OUTPUT_ 缩进输出的XML字符串，使其更易读
- _ToXmlGenerator.Feature.WRITE_XML_DECLARATION_ 在输出的XML字符串中添加XML声明
- _ToXmlGenerator.Feature.WRITE_XML_1_1_ 在XML声明中添加XML版本1.1
- _withRootName()_ 将根标签名称设置为root而不是_ObjectNode_

如我们所见，输出的XML字符串现在已格式化，具有XML声明，根标签是_root_。

## 4. 使用Underscore-java

Underscore-java是一个实用程序库，提供了将JSON转换为XML的方法。值得注意的是，**它需要Java 11或更高版本才能工作**。

在Jackson示例中，我们必须向_XmlMapper_对象添加一些配置选项以自定义输出以符合XML标准。**Underscore-java默认遵循XML标准**，不需要这些配置选项。

### 4.1. 依赖项

让我们从向我们的_pom.xml_添加Underscore-java依赖项开始：

```xml
```<dependency>```
    ```<groupId>```com.github.javadev```</groupId>```
    ```<artifactId>```underscore-java```</artifactId>```
    ```<version>```1.89```</version>```
```</dependency>```
```

### 4.2. 代码示例

接下来，让我们创建一个测试用例，使用Underscore-java将JSON字符串转换为XML：

```java
@Test
public void givenJsonString_whenConvertToXMLUsingUnderscoreJava_thenConverted() {
    String jsonString = "{\"name\":\"John\", \"age\":20}";
    String xmlString = U.jsonToXml(jsonString);
    Assertions.assertEquals("``<?xml version=\"1.0\" encoding=\"UTF-8\"?>``\n" +
        "```<root>```\n" +
        "  `````<name>`````John`````</name>`````\n" +
        "  `<age number=\"true\">`20`````</age>`````\n" +
        "```</root>```", xmlString);
}

```

如我们所见，我们可以使用_U.jsonToXml()_方法将JSON字符串转换为XML。

它还**添加了_root_元素和声明到XML字符串。**与其他库不同，输出默认为格式化，以提高可读性。

**对于所有非字符串字段，它在标签上添加了一个类型属性。**例如，它在_age_元素上添加了_number_属性。**这使得将XML字符串重新解析为JSON（如果需要）更加容易。**

如果我们不需要属性，我们可以使用_U.JsonToXmlMode.REMOVE_ATTRIBUTES_选项禁用它们：

```java
@Test
public void givenJsonString_whenConvertToXMLUsingUnderscoreJavaWithoutAttributes_thenConverted() {
    String jsonString = "{\"name\":\"John\", \"age\":20}";
    String xmlString = U.jsonToXml(jsonString, U.JsonToXmlMode.REMOVE_ATTRIBUTES);
    Assertions.assertEquals("``<?xml version=\"1.0\" encoding=\"UTF-8\"?>``\n" +
        "```<root>```\n" +
        "  `````<name>`````John`````</name>`````\n" +
        "  ````<age>````20`````</age>`````\n" +
        "```</root>```", xmlString);
}

```

如我们所见，_age_元素上不再添加_number_属性了。

## 5. 结论

在本文中，我们探讨了Java中将JSON转换为XML的不同方法。我们还查看了一些测试用例来理解转换。

如常，代码示例可在GitHub上找到。

OK