---
date: 2022-04-01
category:
  - Java
  - XML
tag:
  - XML
  - XSD
  - Java
head:
  - - meta
    - name: keywords
      content: XML, XSD, Java, 验证
---

# 如何对XML文件进行XSD验证

在本教程中，我们将演示如何对XML文件进行XSD文件验证。

## 2. XML和两个XSD文件的定义

考虑以下XML文件_baeldung.xml_，其中包含一个名称和一个地址，地址本身由邮政编码和城市组成：

```xml
```<?xml version="1.0" encoding="UTF-8"?>```
`<individual>`
    `<name>`Baeldung`</name>`
    `<address>`
        `<zip>`00001`</zip>`
        `<city>`New York`</city>`
    `</address>`
`</individual>`
```

_baeldung.xml_的内容完全符合_person.xsd_文件的描述：

```xml
```<?xml version="1.0" encoding="UTF-8"?>```
``<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">``
    ``<xs:element name="individual">``
        ````<xs:complexType>````
            ````<xs:sequence>````
                `<xs:element name="name" type="xs:string" />`
                ``<xs:element name="address">``
                    ````<xs:complexType>````
                        ````<xs:sequence>````
                            ``<xs:element name="zip" type="xs:positiveInteger" />``
                            ``<xs:element name="city" type="xs:string" />``
                        ````</xs:sequence>````
                    ````</xs:complexType>````
                `````</xs:element>`````
            ````</xs:sequence>````
        ````</xs:complexType>````
    `````</xs:element>`````
``</xs:schema>``
```

然而，我们的XML文件不符合以下XSD文件_full-person.xsd_：

```xml
```<?xml version="1.0" encoding="UTF-8"?>```
``<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">``
    ``<xs:element name="individual">``
        ````<xs:complexType>````
            ````<xs:sequence>````
                `<xs:element name="name">`
                    `<xs:simpleType>`
                        `<xs:restriction base="xs:string">`
                            `<xs:maxLength value="5" />`
                        `</xs:restriction>`
                    `</xs:simpleType>`
                `````</xs:element>`````
                ``<xs:element name="address">``
                    ````<xs:complexType>````
                        ````<xs:sequence>````
                            ``<xs:element name="zip" type="xs:positiveInteger" />``
                            ``<xs:element name="city" type="xs:string" />``
                            `<xs:element name="street" type="xs:string" />`
                        ````</xs:sequence>````
                    ````</xs:complexType>````
                `````</xs:element>`````
            ````</xs:sequence>````
        ````</xs:complexType>````
    `````</xs:element>`````
``</xs:schema>``
```

存在两个问题：

- 名称属性限制为最多5个字符
- 地址期望有一个街道属性

让我们看看如何使用Java来获取这些信息。

## 3. 对XML文件进行XSD验证

**_javax.xml.validation_包定义了一个API，用于验证XML文档。**

首先，我们将准备一个能够读取遵循XML Schema 1.0规范的文件的_SchemaFactory_。然后，我们将使用这个_SchemaFactory_来创建对应于我们的XSD文件的_Schema_。一个_Schema_代表一组约束。

最后，我们将从_Schema_中检索_Validator_。一个_Validator_是一个处理器，它检查XML文档是否符合_Schema_：

```java
private Validator initValidator(String xsdPath) throws SAXException {
    SchemaFactory factory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
    Source schemaFile = new StreamSource(getFile(xsdPath));
    Schema schema = factory.newSchema(schemaFile);
    return schema.newValidator();
}
```

在这段代码中，_getFile_方法允许我们将XSD读入一个_File_。在我们的示例中，我们将文件放在资源目录下，所以这个方法读取：

```java
private File getFile(String location) {
    return new File(getClass().getClassLoader().getResource(location).getFile());
}
```

请注意，当我们创建_Schema_时，如果XSD文件无效，可能会抛出_SAXException_。

**现在我们可以使用_Validator_来验证XML文件是否符合XSD描述。** _validate_方法需要我们将_File_转换为_StreamSource_：

```java
public boolean isValid() throws IOException, SAXException {
    Validator validator = initValidator(xsdPath);
    try {
        validator.validate(new StreamSource(getFile(xmlPath)));
        return true;
    } catch (SAXException e) {
        return false;
    }
}
```

如果解析过程中出现错误，_validate_方法会抛出_SAXException_。这表明XML文件不符合XSD规范。

_validate_方法也可能在读取文件时抛出_IOException_。

现在我们可以将代码包装在一个_XmlValidator_类中，并检查_baeldung.xml_是否符合_person.xsd_的描述，但不符合_full-person.xsd_：

```java
@Test
public void givenValidXML_WhenIsValid_ThenTrue() throws IOException, SAXException {
    assertTrue(new XmlValidator("person.xsd", "baeldung.xml").isValid());
}

@Test
public void givenInvalidXML_WhenIsValid_ThenFalse() throws IOException, SAXException {
    assertFalse(new XmlValidator("full-person.xsd", "baeldung.xml").isValid());
}
```

## 4. 列出所有验证错误

_validate_方法的基本行为是在解析抛出_SAXException_时立即退出。

现在我们想要收集所有验证错误，我们需要改变这种行为。为此，**我们必须定义我们自己的_ErrorHandler_**：

```java
public class XmlErrorHandler implements ErrorHandler {

    private List```<SAXParseException>``` exceptions;

    public XmlErrorHandler() {
        this.exceptions = new ArrayList<>();
    }

    public List```<SAXParseException>``` getExceptions() {
        return exceptions;
    }

    @Override
    public void warning(SAXParseException exception) {
        exceptions.add(exception);
    }

    @Override
    public void error(SAXParseException exception) {
        exceptions.add(exception);
    }

    @Override
    public void fatalError(SAXParseException exception) {
        exceptions.add(exception);
    }
}
```

现在我们可以告诉_Validator_使用这个特定的_ErrorHandler_：

```java
public List```<SAXParseException>``` listParsingExceptions() throws IOException, SAXException {
    XmlErrorHandler xsdErrorHandler = new XmlErrorHandler();
    Validator validator = initValidator(xsdPath);
    validator.setErrorHandler(xsdErrorHandler);
    try {
        validator.validate(new StreamSource(getFile(xmlPath)));
    } catch (SAXParseException e) {
        // ...
    }
    xsdErrorHandler.getExceptions().forEach(e ->
        LOGGER.info(String.format("Line number: %s, Column number: %s. %s", e.getLineNumber(), e.getColumnNumber(), e.getMessage()))
    );
    return xsdErrorHandler.getExceptions();
}
```

由于_baeldung.xml_满足_person.xsd_的要求，在这种情况下没有列出错误。然而，在调用_full-person.xsd_时，我们将打印以下错误消息：

```
XmlValidator - Line number: 3, Column number: 26. cvc-maxLength-valid: Value 'Baeldung' with length = '8' is not facet-valid with respect to maxLength '5' for type '#AnonType_nameindividual'.
XmlValidator - Line number: 3, Column number: 26. cvc-type.3.1.3: The value 'Baeldung' of element 'name' is not valid.
XmlValidator - Line number: 7, Column number: 15. cvc-complex-type.2.4.b: The content of element 'address' is not complete. One of '{street}' is expected.
```

我们在第1节中提到的所有错误都通过程序找到了。

## 5. 结论

在本文中，我们看到了如何对XML文件进行XSD验证，并且我们还可以列出所有验证错误。

如常，代码可在GitHub上获得。