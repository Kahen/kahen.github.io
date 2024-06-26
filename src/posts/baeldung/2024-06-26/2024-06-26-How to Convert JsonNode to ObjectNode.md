---
date: 2024-06-26
category:
  - Java
  - Jackson
tag:
  - JsonNode
  - ObjectNode
head:
  - - meta
    - name: keywords
      content: Java, Jackson, JsonNode, ObjectNode, JSON转换
---
# 如何在Java中将JsonNode转换为ObjectNode

在Java中使用JSON（JavaScript对象表示法）通常涉及到使用像Jackson这样的库，它提供了各种类来表示这种类型的数据，例如_JsonNode_和_ObjectNode_。

**在本教程中，我们将探索如何在Java中将_JsonNode_转换为_ObjectNode_。** 这是当我们需要在代码中直接操作数据时的一个必要步骤。

### 2. 理解_JsonNode_和_ObjectNode_

_JsonNode_是Jackson库中的一个抽象类，它代表JSON树中的一个节点。它是所有节点的基类，并且能够存储不同类型的数据，包括对象、数组、字符串、数字、布尔值和null值。**_JsonNode_实例是不可变的，这意味着你不能在它们上设置属性。**

_ObjectNode_可以定义为_JsonNode_的一个可变子类，特别代表一个对象节点。它通过提供添加、删除和修改对象中键值对的方法，允许操作这些类型的对象。除了操作方法外，_ObjectNode_还提供了方便的访问器，如_asInt_、_asText_和_asBoolean_，以轻松地从对象节点中检索相应的数据类型。

### 3. 导入Jackson

Jackson库提供了广泛的功能，以高效地读取、写入和操作JSON数据。

在使用Jackson之前，有必要在我们的项目_pom.xml_中添加必要的依赖项：

```xml
`<dependency>`
    `<groupId>`com.fasterxml.jackson.dataformat`</groupId>`
    `<artifactId>`jackson-dataformat-xml`</artifactId>`
    `<version>`2.14.2`</version>`
`</dependency>`
```

### 4. 执行转换

假设我们定义一个简单的JSON对象：

```json
{
   "name":"John",
   "gender":"male",
   "company":"Baeldung",
   "isEmployee": true,
   "age": 30
}
```

我们将在代码中将其声明为一个_String_值：

```java
public static String jsonString = "{\"name\": \"John\", \"gender\": \"male\", \"company\": \"Baeldung\", \"isEmployee\": true, \"age\": 30}";
```

首先，我们使用Jackson的_ObjectMapper_类将这个字符串转换为_JsonNode_，使用_ObjectMapper.readTree()_方法。之后，我们可以简单地将其转换为_ObjectNode_：

```java
ObjectMapper objectMapper = new ObjectMapper();
JsonNode jsonNode = objectMapper.readTree(jsonString);
ObjectNode objectNode = (ObjectNode) jsonNode;
```

最后，让我们通过一系列断言来执行验证，检查从_JsonNode_转换到_ObjectNode_后数据的完整性：

```java
assertEquals("John", objectNode.get("name").asText());
assertEquals("male", objectNode.get("gender").asText());
assertEquals("Baeldung", objectNode.get("company").asText());
assertTrue(objectNode.get("isEmployee").asBoolean());
assertEquals(30, objectNode.get("age").asInt());
```

### 5. 结论

将_JsonNode_转换为_ObjectNode_的过程在使用Jackson库导航和与JSON数据交互时起着关键作用。

在本文中，我们展示了如何通过Jackson的_ObjectMapper_类执行这种转换。

如常，附带的源代码可以在GitHub上找到。