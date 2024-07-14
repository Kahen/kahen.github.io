---
date: 2022-04-01
category:
  - Java
  - Protobuf
tag:
  - JSON
  - Protobuf
head:
  - - meta
    - name: keywords
      content: Java, Protobuf, JSON, 转换, 序列化
---
# Java中JSON和Protobuf的互转

在本教程中，我们将演示如何从JSON转换到Protobuf以及从Protobuf转换到JSON。
Protobuf是一个免费且开源的跨平台数据格式，用于序列化结构化数据。

要开始，让我们通过包含`protobuf-java-util`依赖项来创建一个Spring Boot项目：

```xml
`<dependency>`
    `<groupId>`com.google.protobuf`</groupId>`
    `<artifactId>`protobuf-java-util`</artifactId>`
    `<version>`3.25.3`</version>`
`</dependency>`
```

我们可以使用`JsonFormat`类将JSON转换为protobuf消息。`JsonFormat`是一个实用工具类，用于将protobuf消息转换为JSON格式。`JsonFormat`的`parser()`方法创建了一个`Parser`，它使用`_merge()`方法将JSON解析为protobuf消息。

让我们创建一个方法，它接受JSON并生成一个protobuf消息：

```java
public static Message fromJson(String json) throws IOException {
    Builder structBuilder = Struct.newBuilder();
    JsonFormat.parser().ignoringUnknownFields().merge(json, structBuilder);
    return structBuilder.build();
}
```

让我们使用以下示例JSON：

```json
{
    "boolean": true,
    "color": "gold",
    "object": {
      "a": "b",
      "c": "d"
    },
    "string": "Hello World"
}
```

现在，让我们编写一个简单的测试来验证从JSON到protobuf消息的转换：

```java
@Test
public void givenJson_convertToProtobuf() throws IOException {
    Message protobuf = ProtobufUtil.fromJson(jsonStr);
    Assert.assertTrue(protobuf.toString().contains("key: \"boolean\""));
    Assert.assertTrue(protobuf.toString().contains("string_value: \"Hello World\""));
}
```

我们可以使用方法`JsonFormat`的`printer()`方法将protobuf消息转换为JSON，它接受protobuf作为`MessageOrBuilder`：

```java
public static String toJson(MessageOrBuilder messageOrBuilder) throws IOException {
    return JsonFormat.printer().print(messageOrBuilder);
}
```

让我们编写一个简单的测试来验证从protobuf到JSON消息的转换：

```java
@Test
public void givenProtobuf_convertToJson() throws IOException {
    Message protobuf = ProtobufUtil.fromJson(jsonStr);
    String json = ProtobufUtil.toJson(protobuf);
    Assert.assertTrue(json.contains("\"boolean\": true"));
    Assert.assertTrue(json.contains("\"string\": \"Hello World\""));
    Assert.assertTrue(json.contains("\"color\": \"gold\""));
}
```

## 结论

在本文中，我们展示了如何将JSON转换为protobuf以及反之。

如常，本教程中使用的所有代码示例都可以在GitHub上找到。翻译已结束，以下是剩余部分：

## 结论

在本文中，我们展示了如何将JSON转换为protobuf以及反之。

如常，本教程中使用的所有代码示例都可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)![img](https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK