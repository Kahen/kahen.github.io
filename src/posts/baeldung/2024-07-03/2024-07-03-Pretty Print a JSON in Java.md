---
date: 2024-07-03
category:
  - Java
  - JSON
tag:
  - JSON格式化
  - Jackson
  - Gson
head:
  - - meta
    - name: keywords
      content: Java, JSON, 格式化, Jackson, Gson
------
# Java中美化JSON的打印

在本教程中，我们将深入了解在Java中格式化JSON数据以提高其可读性的过程。

通常，处理大型JSON对象时，理解和调试它们可能是一个艰巨的任务。因此，采用美化打印JSON对象的做法变得至关重要。

为了实现这一点，我们将利用Jackson和Gson库的功能，这些库提供了方便的方法来生成格式良好的JSON输出。

### 2.1 使用Jackson按需美化打印JSON

要实现按需美化打印JSON，我们可以利用`writeWithDefaultPrettyPrinter()`方法：

```java
String uglyJsonString = "{...}"; // 省略原始JSON字符串

public String prettyPrintJsonUsingDefaultPrettyPrinter(String uglyJsonString) {
    ObjectMapper objectMapper = new ObjectMapper();
    Object jsonObject = objectMapper.readValue(uglyJsonString, Object.class);
    String prettyJson = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(jsonObject);
    return prettyJson;
}
```

结果是格式良好的JSON对象：

```json
{
    "one" : "AAA",
    "two" : [ "BBB", "CCC" ],
    "three" : {
        "four" : "DDD",
        "five" : [ "EEE", "FFF" ]
    }
}
```

### 2.2 全局美化打印JSON

通过全局启用`INDENT_OUTPUT`设置，我们可以生成格式良好的JSON字符串，进行美化打印。这确保了整个系统中的JSON输出将以一致的、可读的方式进行格式化。

让我们继续启用`INDENT_OUTPUT`设置：

```java
public String prettyPrintUsingGlobalSetting(String uglyJsonString) {
    ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
    Object jsonObject = mapper.readValue(uglyJsonString, Object.class);
    String prettyJson = mapper.writeValueAsString(jsonObject);
    return prettyJson;
}
```

结果是格式良好的JSON对象：

```json
{
    "one" : "AAA",
    "two" : [ "BBB", "CCC" ],
    "three" : {
        "four" : "DDD",
        "five" : [ "EEE", "FFF" ]
    }
}
```

### 3. 使用Gson美化打印JSON

首先添加Gson Maven依赖：

```xml
`<dependency>`
    `<groupId>`com.google.code.gson`</groupId>`
    `<artifactId>`gson`</artifactId>`
    `<version>`2.10.1`</version>`
`</dependency>`
```

要美化打印JSON，我们将使用`GsonBuilder`的`setPrettyPrinting()`方法：

```java
public String prettyPrintUsingGson(String uglyJson) {
    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    JsonElement jsonElement = JsonParser.parseString(uglyJsonString);
    String prettyJsonString = gson.toJson(jsonElement);
    return prettyJsonString;
}
```

结果是格式良好的JSON对象：

```json
{
    "one": "AAA",
    "two": [
        "BBB",
        "CCC"
    ],
    "three": {
        "four": "DDD",
        "five": [
            "EEE",
            "FFF"
        ]
    }
}
```

## 4. 结论

在本文中，我们探讨了在Java中实现JSON美化打印的各种方法。

文章的源代码可以在GitHub上找到。