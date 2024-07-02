---
date: 2022-04-01
category:
  - Java
  - JSON
tag:
  - JSON Minify
  - Whitespace Removal
head:
  - - meta
    - name: keywords
      content: JSON, Java, Minify, Whitespace Removal
---
# 在Java中从JSON移除空白符

## 1. 引言

在本教程中，我们将探索在Java中从JSON数据中移除额外空白符以进行压缩的过程。

我们经常面临需要压缩提供的JSON数据以优化存储，或者需要移除额外的空白符以便我们可以轻松比较多个JSON对象的情况。

为了实现这一点，我们将利用Jackson和Gson库的功能，这将有助于从提供的JSON数据中移除空白符。

## 2. 使用自定义逻辑移除空白符

JSON数据通常使用冒号(“:”)来分隔键和值，使用逗号(“,”)来分隔键值对。考虑到JSON键被引号(‘”‘)包围，并且JSON字符串使用转义序列，**我们可以实施一种逻辑，逐个读取字符并构建没有任何额外空白的JSON字符串。**

通过仔细处理字符，同时考虑引用部分和转义序列，我们可以确保一个干净且正确格式化的JSON输出：

```java
public String removeExtraWhiteSpaces(String jsonString) {
    StringBuilder result = new StringBuilder(json.length());
    boolean inQuotes = false;
    boolean escapeMode = false;
    for (char character : json.toCharArray()) {
        if (escapeMode) {
            result.append(character);
            escapeMode = false;
        } else if (character == '\"') {
            inQuotes = !inQuotes;
            result.append(character);
        } else if (character == '\\') {
            escapeMode = true;
            result.append(character);
        } else if (!inQuotes && character == ' ') {
            continue;
        } else {
            result.append(character);
        }
    }
    return result.toString();
}
```

## 3. 使用Jackson移除空白符

要使用Jackson移除空白符，让我们首先向_pom.xml_文件添加以下依赖项：

```xml
``<dependency>``
    ``<groupId>``com.fasterxml.jackson.core``</groupId>``
    ``<artifactId>``jackson-databind``</artifactId>``
    ``<version>``2.15.2``</version>``
``</dependency>``
```

强烈建议考虑使用Maven中央仓库中可用的最新版本的_jackson-databind_库。

要移除JSON字符串中的额外空白符，我们将使用_writeValueAsString(_)方法：

```java
public String removeExtraWhitespacesUsingJackson(String json) {
    ObjectMapper objectMapper = new ObjectMapper();
    JsonNode jsonNode = objectMapper.readTree(json);
    return objectMapper.writeValueAsString(jsonNode);
}
```

## 4. 使用Gson移除空白符

首先让我们添加Gson Maven依赖项：

```xml
``<dependency>``
    ``<groupId>``com.google.code.gson``</groupId>``
    ``<artifactId>``gson``</artifactId>``
    ``<version>``2.10.1``</version>``
``</dependency>``
```

我们鼓励您始终使用Maven中央仓库中最新版本的_gson_库。

**要从JSON字符串中移除空白符，我们需要使用自定义_JsonSerializer。**

我们将使用自定义_StringSerializer_来修剪JSON字符串值中的空白符。**通过将此序列化器注册到_GsonBuilder_，Gson将为字符串应用自定义序列化逻辑，有效地移除值中的空白符，同时保持JSON结构的完整性**：

```java
public String removeWhitespacesUsingGson(String json) {
    Gson gson = new GsonBuilder().registerTypeAdapter(String.class, new StringSerializer()).create();
    JsonElement jsonElement = gson.fromJson(json, JsonElement.class);
    return gson.toJson(jsonElement);
}

class StringSerializer implements JsonSerializer`<String>` {
    @Override
    public JsonElement serialize(String src, Type typeOfSrc, JsonSerializationContext context) {
        return new JsonPrimitive(src.trim());
    }
}
```

## 5. 结论

在本文中，我们探讨了在Java中从JSON字符串中移除额外空白符的各种方法。

文章的源代码可在GitHub上找到。