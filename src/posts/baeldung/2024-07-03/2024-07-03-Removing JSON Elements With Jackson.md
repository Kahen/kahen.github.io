---
date: 2022-04-01
category:
  - Java
  - Jackson
tag:
  - JSON
  - Java
  - Jackson
head:
  - - meta
    - name: keywords
      content: Jackson, JSON, Java, remove elements
---
# 使用Jackson从JSON中移除元素

## 1. 引言

Jackson库是Java应用程序中处理JSON（JavaScript对象表示）的强大工具。此外，它提供了广泛的功能，用于高效地读取、写入和操作JSON数据。因此，处理JSON时的一个常见任务是从JSON结构中删除特定元素。

在本教程中，我们将探讨如何使用Jackson删除JSON元素，并通过实际示例理解这一过程。

## 2. 设置环境

要使用Jackson，我们首先需要在我们的_pom.xml_文件中添加_jackson-dataformat-xml_依赖项：

```
`<dependency>`
    `<groupId>`com.fasterxml.jackson.core`</groupId>`
    `<artifactId>`jackson-dataformat-xml`</artifactId>`
    `<version>`2.15.2`</version>`
`</dependency>`
```

这个库允许我们使用数据绑定API。

## 3. 通过键删除JSON元素

当涉及到删除JSON时，最简单的方法是通过其键。Jackson提供了几种方法来促进这项任务。**一种常用的方法是使用_JsonNode_类，它在Jackson API中表示JSON节点。**

要通过键删除一个元素，我们会遵循以下步骤：

- 使用Jackson的_ObjectMapper_解析JSON字符串或输入流
- 将JSON数据转换为_JsonNode_对象
- 在_JsonNode_对象上使用_remove(String fieldName)_方法来删除所需的元素
- 使用_ObjectMapper_将修改后的_JsonNode_重新转换为JSON字符串

假设我们有以下JSON对象：

```
{
    "name": "John",
    "age": 30,
    "city": "New York"
}
```

我们希望从这个对象中删除_age_属性。以下是相应的代码片段：

```java
@Test
public void given_JsonData_whenUsingJackson_thenRemoveElementByKey() throws JsonProcessingException {
    String json = "{\"name\": \"John\", \"age\": 30, \"city\": \"New York\"}";
    ObjectMapper objectMapper = new ObjectMapper();
    JsonNode jsonNode = objectMapper.readTree(json);
    ObjectNode object = (ObjectNode) jsonNode;
    object.remove("age");
    String updatedJson = objectMapper.writeValueAsString(object);
    Assertions.assertEquals("{\"name\":\"John\",\"city\":\"New York\"}", updatedJson);
}
```

在上面的测试方法中，我们从JSON对象中删除了键为_age_的元素，并验证结果JSON字符串不包含该元素。

预期和实际的JSON输出应该是相同的：

```
{
    "name": "John",
    "city": "New York"
}
```

## 4. 根据条件删除JSON元素

有时，我们需要根据特定条件从集合中删除元素。例如，我们可能想要删除所有具有特定值或特定类型的元素。

幸运的是，Jackson提供了多种方法来实现这一目标。一种方法涉及**使用_JsonNode_，遍历其元素，并删除满足给定条件的元素。**

让我们考虑以下场景，我们有以下JSON对象：

```
{
    "name": "John",
    "age": 30,
    "city": "New York"
}
```

我们希望从这个对象中删除任何是数字且值为_30_的元素。让我们看看如何做到这一点：

```java
@Test
public void given_JsonData_whenUsingJackson_thenRemoveElementsByCondition() throws JsonProcessingException {
    String json = "{\"name\": \"John\", \"age\": 30, \"city\": \"New York\"}";
    ObjectMapper objectMapper = new ObjectMapper();
    JsonNode jsonNode = objectMapper.readTree(json);
    Iterator`<JsonNode>` elements = jsonNode.elements();
    while (elements.hasNext()) {
        JsonNode element = elements.next();
        if (element.isNumber() && element.asInt() == 30) {
            elements.remove();
        }
    }
    String updatedJson = objectMapper.writeValueAsString(jsonNode);
    Assertions.assertEquals("{\"name\":\"John\",\"city\":\"New York\"}", updatedJson);
}
```

在上面的例子中，我们遍历_JsonNode_的元素，并删除任何是数字且值为_30_的元素。结果的JSON字符串不包含被删除的元素。

预期的JSON输出和实际的JSON输出应该是相同的：

```
{
    "name": "John",
    "city": "New York"
}
```

## 5. 从复杂结构中删除JSON元素

在某些情况下，我们可能会遇到包含嵌套对象或数组的复杂JSON结构。有效地处理这些结构需要我们能够根据我们的要求删除特定元素。

通过使用Jackson的丰富API集，**我们可以遍历_JsonNode_实例的元素，并执行条件检查以识别要删除的元素。**

要从嵌套对象或数组中删除元素，我们遵循以下步骤：

- 使用_ObjectMapper_解析JSON字符串或输入流
- 使用_JsonNode_方法如_get(String fieldName)_或_path(String fieldName)_遍历JSON结构以到达所需元素
- 在选定的_JsonNode_上使用适当的删除方法（_remove(String fieldName)_, _remove(int index)_等）
- 使用_ObjectMapper_将修改后的_JsonNode_重新转换为JSON字符串

假设我们正在处理一个具有复杂结构的嵌套JSON对象：

```
{
    "name": "John",
    "details": {
        "age": 30,
        "city": "New York"
    }
}
```

我们希望从_details_嵌套对象中删除键为_age_的元素：

```java
@Test
public void given_JsonData_whenUsingJackson_thenRemoveElementFromNestedStructure() throws JsonProcessingException {
    String json = "{\"name\": \"John\", \"details\": {\"age\": 30, \"city\": \"New York\"}}";
    ObjectMapper objectMapper = new ObjectMapper();
    JsonNode jsonNode = objectMapper.readTree(json);
    JsonNode detailsNode = jsonNode.path("details");
    ((ObjectNode) detailsNode).remove("age");
    String updatedJson = objectMapper.writeValueAsString(jsonNode);
    Assertions.assertEquals("{\"name\":\"John\",\"details\":{\"city\":\"New York\"}}", updatedJson);
}
```

在上面的代码中，我们访问嵌套对象（_details_）并删除键（_age_）的元素。结果的JSON字符串反映了修改后的结构，预期的JSON输出应该与实际的JSON输出相同：

```
{
    "name": "John",
    "details": {
        "city": "New York"
    }
}
```

## 6. 结论

在本文中，我们探讨了使用Java中的Jackson库删除JSON元素的不同技术。我们讨论了通过键删除元素、根据条件删除元素以及从复杂的JSON结构中删除元素。

总的来说，通过使用Jackson提供的强大的功能，我们可以轻松地操作JSON数据以满足我们应用程序的要求。

像往常一样，代码示例可以在GitHub上找到。