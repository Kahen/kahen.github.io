---
date: 2022-04-01
category:
  - Java
  - JSON
tag:
  - Java
  - JSON
  - URL
  - HTTP
  - HttpClient
  - Jackson
  - ObjectMapper
head:
  - - meta
    - name: keywords
      content: Java, JSON, URL, HTTP, HttpClient, Jackson, ObjectMapper
---
# 在Java中从URL读取JSON数据

## 1. 引言

在本快速教程中，我们将创建能够从任何URL读取JSON数据的方法。我们将从使用Java核心类开始，然后使用一些库来简化我们的代码。

## 2. 使用Java核心类

在Java中从URL读取数据的最简单方法之一是使用_URL_类。要使用它，我们对_URL_打开一个输入流，创建一个输入流读取器，然后读取所有字符。我们将这些字符追加到一个_StringBuilder_，然后将其作为_String_返回：

```java
public static String stream(URL url) {
    try (InputStream input = url.openStream()) {
        InputStreamReader isr = new InputStreamReader(input);
        BufferedReader reader = new BufferedReader(isr);
        StringBuilder json = new StringBuilder();
        int c;
        while ((c = reader.read()) != -1) {
            json.append((char) c);
        }
        return json.toString();
    }
}
```

这段代码包含了很多样板代码。此外，如果我们想要将我们的JSON转换为一个映射或POJO，它还需要更多的代码。即使使用新的Java 11 HttpClient，对于一个简单的GET请求来说，代码量也是很多的。而且，它也不帮助我们将响应从字符串转换为POJO。那么，让我们探索一些更简单的方法来做这件事。

## 3. 使用commons-io和org.json

一个非常流行的库是Apache Commons IO。我们将使用_IOUtils_来读取一个URL并得到一个_String_。然后，为了将其转换为_JSONObject_，我们将使用JSON-Java（org.json）库。这是json.org为Java提供的参考实现。让我们将它们结合在一个新的方法中：

```java
public static JSONObject getJson(URL url) {
    String json = IOUtils.toString(url, Charset.forName("UTF-8"));
    return new JSONObject(json);
}
```

使用_JSONObject_，我们可以调用_get()_来获取任何属性，并得到一个_Object_。有类似命名的方法用于特定类型。例如：

```java
jsonObject.getString("stringProperty");
```

## 4. 使用Jackson和_ObjectMapper_减少代码

有许多解决方案可以将JSON转换为POJO以及反之。但是，Jackson在像Jersey这样的项目和其他JAX-RS实现中被广泛使用。让我们将我们需要的依赖项添加到我们的_pom.xml_：

```xml
`<dependency>`
    `<groupId>`com.fasterxml.jackson.core`</groupId>`
    `<artifactId>`jackson-databind`</artifactId>`
    `<version>`2.13.3`</version>`
`</dependency>`
```

有了这个，我们不仅可以毫不费力地从URL读取JSON，而且同时还可以将其转换为POJO。

### 4.1. 反序列化为通用对象

Jackson中大部分动作来自_ObjectMapper_。_ObjectMapper_最常见的场景是给它一个_String_输入并得到一个对象。幸运的是，_ObjectMapper_也可以直接从互联网URL读取输入：

```java
public static JsonNode get(URL url) {
    ObjectMapper mapper = new ObjectMapper();
    return mapper.readTree(url);
}
```

使用_readTree()_，我们得到一个_JsonNode_，这是一个类似树形结构的对象。我们使用它的_get()_方法读取属性：

```java
json.get("propertyName");
```

因此，如果我们不想的话，我们不需要将我们的响应映射到特定类。

### 4.2. 反序列化为自定义类

但是，对于更复杂的对象，创建一个表示我们期望的JSON结构的类是有帮助的。**我们可以使用泛型来创建我们的方法的一个版本，使用_readValue()_将响应映射到我们想要的任何类**：

```java
public static ``<T>`` T get(URL url, Class``<T>`` type) {
    ObjectMapper mapper = new ObjectMapper();
    return mapper.readValue(url, type);
}
```

然后，只要我们的对象属性和结构匹配，我们就可以得到一个新实例，用JSON响应中的值填充。

## 5. 结论

在本文中，我们学习了如何向URL发出请求并获得JSON字符串。然后，我们使用了一些库来简化我们的代码。**最后，我们在几行代码中读取了JSON响应，同时将其映射到POJO。**

而且，一如既往，源代码可以在GitHub上找到。