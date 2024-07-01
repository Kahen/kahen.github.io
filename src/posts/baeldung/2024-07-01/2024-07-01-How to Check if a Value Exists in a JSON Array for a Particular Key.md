---
date: 2022-04-01
category:
  - Java
  - JSON
tag:
  - Jackson
  - Gson
head:
  - - meta
    - name: keywords
      content: Java, JSON, Jackson, Gson, 检查数组中的键值对
---

# 如何检查JSON数组中特定键的值是否存在 | Baeldung

本文教程将学习如何检查JSON数组中是否存在特定的键，以及该键是否具有特定的值。我们将使用Java处理JSON的两个最流行的库：Jackson和Gson。

## 2. 设置

首先，**让我们创建一个JSON数组**。我们将保持简单，创建一个具有单个键/值对的对象数组：

```json
String exampleJson = "[{\"color\":\"red\"},{\"color\":\"blue\"},{\"color\":\"green\"}]";
```

所以，数组中的每个对象都有相同的属性_color_和不同的值。在我们的示例中，我们将检查对于键_color_，值_green_是否存在。

## 3. 使用Jackson

要在项目中使用Jackson，我们需要将其导入到我们的_pom.xml_：

```xml
``<dependency>``
    ``<groupId>``com.fasterxml.jackson.core``</groupId>``
    ``<artifactId>``jackson-databind``</artifactId>``
    ``<version>``2.15.2``</version>``
``</dependency>``
```

最新版本可在Maven仓库中找到。

现在让我们使用它来解决我们的问题：

```java
@Test
void givenJsonArray_whenUsingJackson_thenDetectKeyInArray() throws JsonProcessingException {
    ObjectMapper objectMapper = new ObjectMapper();
    JsonNode tree = objectMapper.readTree(exampleJson);

    Stream`<JsonNode>` s = StreamSupport.stream(tree.spliterator(), false);
    boolean result = s.map(entry -> entry.get("color"))
      .filter(Objects::nonNull)
      .anyMatch(color -> "green".equals(color.asText()));
    assertTrue(result);
}
```

**我们的第一个目标是解析JSON。为此，我们使用了_ObjectMapper_。**我们使用了_readTree()_方法将我们的JSON_String_转换为_JsonNode_。

接下来，我们将_JsonNode_转换为_Stream_。我们使用_StreamSupport_类，它包含创建和使用_Stream_s的集合实用程序。我们在这里使用的具体实用程序是_stream()_方法，它接受一个_Spliterator_和一个_boolean_标志。该标志允许我们选择顺序和并行_Stream_。

之后，有了_Stream_，我们依次检查每个_JsonNode_。我们需要在这里稍微小心。我们没有确认我们的输入JSON有任何名为_color_的键。**这可能导致在将值转换为_String_进行比较时出现_NullPointerException_。**

所以首先，我们尝试获取属性，然后过滤掉任何_null_s，这将发生在_JsonNode_没有名为_color_的键的情况下。一旦我们确信我们有了我们的值，我们可以调用_anyMatch()_。我们给它一个谓词，将每个值与我们选择的颜色_green_进行比较。

_anyMatch()_方法返回_true_如果有匹配。因此，我们在测试结束时的断言显示，对于所选键_color_，有一个值等于_green_。

## 4. 使用Gson

接下来，**我们将使用Gson库采用非常类似的方法**。要在项目中使用Gson，我们需要将其导入到我们的_pom.xml_：

```xml
``<dependency>``
    ``<groupId>``com.google.code.gson``</groupId>``
    ``<artifactId>``gson``</artifactId>``
    ``<version>``2.10.1``</version>``
``</dependency>``
```

最新版本可在Maven仓库中找到。

我们将应用与之前相同的计划，解析我们的JSON_String_，将其转换为_Stream_，并使用_anyMatch()_查找我们的值：

```java
@Test
void givenJsonArray_whenUsingGson_thenDetectKeyInArray() {
    Gson gson = new Gson();
    JsonArray parsed = gson.fromJson(exampleJson, JsonArray.class);

    Stream`<JsonElement>` s = StreamSupport.stream(parsed.spliterator(), false);
    boolean result = s.map(entry -> entry.getAsJsonObject()
      .get("color"))
      .filter(Objects::nonNull)
      .anyMatch(color -> "green".equals(color.getAsString()));
    assertTrue(result);
}
```

首先，我们使用_fromJson()_方法解析了_String_，得到了一个_JsonArray_。由于第二个参数，我们得到了_JsonArray_类型，我们可以指定我们想要将JSON解析为的类。

接下来，其余的应该看起来很熟悉。我们像以前一样使用_StreamSupport_实用程序来产生_JsonElement_s的_Stream_。唯一的其他变化是我们需要在我们的_JsonElement_上调用_getAsJsonObject()_。这使我们能够检索与_color_属性相关联的值，并将其与我们的_String_进行比较。

正如在这里再次看到的，匹配在_Stream_中成功找到。值得注意的是，我们采取了与之前相同的预防措施，以防止由于JSON中没有名为_color_的属性而可能发生的_NullPointerException_。如果我们能更确定哪些属性将可用，我们可以直接跳到_anyMatch()_步骤。

## 5. 结论

在本文中，我们看到了我们可以使用Jackson和Gson来检查JSON数组中是否存在选定属性的值。两种实现都是相似的。它们最终实现了解析JSON，将其转换为_Stream_，然后使用_Stream_实用程序来检查匹配的计划。一旦我们有了_Stream_，我们就可以使用任何比较方法来评估数组中的条目，这使得这是一个多功能的解决方案。

如往常一样，示例的完整代码可在GitHub上找到。