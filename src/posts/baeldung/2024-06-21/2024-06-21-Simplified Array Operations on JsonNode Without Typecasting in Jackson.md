---
date: 2024-06-21
category:
  - Java
  - Jackson
tag:
  - JsonNode
  - ArrayNode
head:
  - - meta
    - name: keywords
      content: Jackson, JsonNode, ArrayNode, JSON操作, Java
---
# Jackson中无需类型转换简化JsonNode数组操作

在Java中使用JSON（JavaScript对象标记）通常涉及到使用像Jackson这样的库，它提供了多种类来表示这种类型的数据，比如_JsonNode, ObjectNode,_ 和 _ArrayNode_。

**在本教程中，我们将** **探索不同的方法来简化对_JsonNode_的数组操作，而无需在Java中显式地将其转换为_ArrayNode_。** 这在我们直接在代码中操作数据时是必要的。

_JsonNode_ 是Jackson库中的一个抽象类，它表示JSON树中的一个节点。它是所有节点的基类，并且能够存储不同类型的数据，包括对象、数组、字符串、数字、布尔值和null值。**_JsonNode_ 实例是不可变的，这意味着我们不能在它们上面设置属性。**

_ArrayNode_ 是_JsonNode_的一个特定类型，它表示一个JSON数组。它扩展了_JsonNode_的功能，包括添加、删除和按索引访问数组元素的方法。

通过使用_JsonNode_方法，我们可以将其转换为_ArrayNode_而无需显式转换。这种方法在我们需要对JSON数组中的每个元素执行特定操作或验证时非常有用：

```java
@Test
void givenJsonNode_whenUsingJsonNodeMethods_thenConvertToArrayNode() throws JsonProcessingException {
    int count = 0;
    String json = "{'objects': ['One', 'Two', 'Three']}";
    JsonNode arrayNode = new ObjectMapper().readTree(json).get("objects");
    assertNotNull(arrayNode, "The 'objects' array should not be null");
    assertTrue(arrayNode.isArray(), "The 'objects' should be an array");
    if (arrayNode.isArray()) {
        for (JsonNode objNode : arrayNode) {
            assertNotNull(objNode, "Array element should not be null");
            count++;
        }
    }
    assertEquals(3, count, "The 'objects' array should have 3 elements");
}
```

这种方法还确保我们在尝试遍历其元素之前，正在使用一个数组结构，这有助于防止与意外的JSON结构相关的潜在运行时错误。

在Jackson中，我们可以使用_createObjectNode()_方法创建一个JSON对象。同样，我们可以使用_ObjectMapper_类的_createArrayNode()_方法来创建一个JSON数组。_method createArrayNode()_ 将返回一个_ArrayNode_类的引用：

```java
@Test
void givenJsonNode_whenUsingCreateArrayNode_thenConvertToArrayNode() throws Exception {
    ObjectMapper objectMapper = new ObjectMapper();
    JsonNode originalJsonNode = objectMapper.readTree("{'objects': ['One', 'Two', 'Three']}");
    ArrayNode arrayNode = objectMapper.createArrayNode();
    originalJsonNode.get("objects").elements().forEachRemaining(arrayNode::add);
    assertEquals("['One','Two','Three']", arrayNode.toString());
}
```

这种方法在我们需要将JSON结构的特定部分转换为_ArrayNode_而无需显式转换时非常有用。显式创建_ArrayNode_清楚地传达了我们正在使用一个_数组_，使代码更易于阅读和表达。

_StreamSupport_ 是一个实用类，它提供了静态方法来创建各种数据结构上的_Stream_ 和 _Spliterator_，包括集合、数组和专门的迭代器。字符串使用_ObjectMapper_反序列化为_JsonNode_对象。在这里，我们从_objects_数组的_Spliterator_创建一个_Stream_，并将元素收集到_List```<JsonNode>```_中：

```java
@Test
void givenJsonNode_whenUsingStreamSupport_thenConvertToArrayNode() throws Exception {
    String json = "{'objects': ['One', 'Two', 'Three']}";
    JsonNode obj = new ObjectMapper().readTree(json);
    List```<JsonNode>``` objects = StreamSupport
      .stream(obj.get("objects").spliterator(), false)
      .collect(Collectors.toList());

    assertEquals(3, objects.size(), "The 'objects' list should contain 3 elements");

    JsonNode firstObject = objects.get(0);
    assertEquals("One", firstObject.asText(), "The first element should be One");
}
```

当我们想要利用Java Streams以简洁和表达方式从JSON数组中提取和处理元素时，这种方法非常有用。

一个_Iterator_ 是我们可以遍历集合的多种方式之一。在这种方法中，我们使用迭代器遍历给定JSON结构中_objects_数组的元素：

```java
@Test
void givenJsonNode_whenUsingIterator_thenConvertToArrayNode() throws Exception {
    String json = "{'objects': ['One', 'Two', 'Three']}";
    JsonNode datasets = new ObjectMapper().readTree(json);
    Iterator```<JsonNode>``` iterator = datasets.withArray("objects").elements();

    int count = 0;
    while (iterator.hasNext()) {
        JsonNode dataset = iterator.next();
        System.out.print(dataset.toString() + " ");
        count++;
    }
    assertEquals(3, count, "The 'objects' list should contain 3 elements");
}
```

这种方法通过直接遍历元素减少了整体复杂性。它为在迭代期间自定义处理JSON元素提供了一种直接的机制。

### 结论

在本教程中，我们探索了在Jackson中简化_JsonNode_数组操作的不同方法，而无需显式地将其类型转换为_ArrayNode_。

如常，源代码可在GitHub上找到。