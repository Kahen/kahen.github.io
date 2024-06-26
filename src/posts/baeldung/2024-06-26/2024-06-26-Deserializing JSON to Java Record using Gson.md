---
date: 2024-06-26
category:
  - Java
  - JSON
tag:
  - Gson
  - Deserialization
head:
  - - meta
    - name: keywords
      content: Java, JSON, Deserialization, Gson, Records
---

# 使用Gson将JSON反序列化为Java记录

## 1. 引言

反序列化过程涉及将对象（或数据）的JSON表示转换为编程语言中的等效对象，例如Java对象。Gson是一个流行的Java库，用于JSON序列化和反序列化，简化了这一过程。

**在本教程中，我们将探讨如何使用Gson将JSON数据反序列化为Java记录。**

## 2. 创建Java记录

在深入代码示例之前，我们需要确保已经将Gson库添加到我们的项目中。**我们可以将其作为构建工具的依赖项添加，例如Maven或Gradle。对于Maven，我们添加以下依赖项：**

```xml
`<dependency>`
    `<groupId>`com.google.code.gson`</groupId>`
    `<artifactId>`gson`</artifactId>`
    `<version>`2.8.9`</version>`
`</dependency>`
```

让我们通过定义一个简单的Java _记录_来开始，我们将用于反序列化。例如，考虑一个具有 _名称_、_年龄_ 和 _地址_ 字段的 _Person_ 记录：

```java
public record Person(String name, int age, String address) {
    // 不需要显式定义构造函数、getter或其他方法
}
```

## 3. 将JSON反序列化为Java记录

现在，让我们看看如何使用Gson将JSON数据反序列化为我们的 _Person_ 记录。假设我们有以下JSON表示的 _person_：

```json
{ "name": "John Doe", "age": 30, "address": "123 Main St" }
```

让我们使用Gson的 _fromJson()_ 方法将此JSON字符串转换为 _Person_ 记录：

```java
@Test
public void givenJsonString_whenDeserialized_thenPersonRecordCreated() {
    String json = "{\"name\":\"John Doe\",\"age\":30,\"address\":\"123 Main St\"}";

    Person person = new Gson().fromJson(json, Person.class);

    assertEquals("John Doe", person.name());
    assertEquals(30, person.age());
    assertEquals("123 Main St", person.address());
}
```

在这个例子中，_fromJson()_ 方法接受JSON字符串和类类型（ _Person.class_），JSON应该转换为该类型。随后，Gson自动将JSON字段映射到相应的记录组件。

## 4. 处理嵌套对象

如果我们有一个包含嵌套对象的JSON怎么办？Gson也可以处理它们！

让我们扩展我们的 _Person_ 记录，以包括一个 _Contact_ 记录，用于存储人的联系信息：

```java
public record Contact(String email, String phone) {
    // 构造函数、getter和其他方法将自动生成
}
public record Person(String name, int age, String address, Contact contact) {
    // 构造函数、getter和其他方法将自动生成
}
```

现在，让我们考虑一个包含联系信息的JSON表示：

```json
{ "name": "John Doe", "age": 30, "address": "123 Main St", "contact": { "email": "john.doe@example.com", "phone": "555-1234" } }
```

反序列化代码几乎保持不变，Gson处理嵌套对象：

```java
@Test
public void givenNestedJsonString_whenDeserialized_thenPersonRecordCreated() {
    String json = "{\"name\":\"John Doe\",\"age\":30,\"address\":\"123 Main St\",\"contact\":{\"email\":\"john.doe@example.com\",\"phone\":\"555-1234\"}}";

    Person person = new Gson().fromJson(json, Person.class);

    assertNotNull(person);
    assertEquals("John Doe", person.name());
    assertEquals(30, person.age());
    assertEquals("123 Main St", person.address());

    Contact contact = person.contact();

    assertNotNull(contact);
    assertEquals("john.doe@example.com", contact.email());
    assertEquals("555-1234", contact.phone());
}
```

## 5. 结论

总之，Gson和Java记录的结合提供了一种简洁而富有表现力的方式来处理JSON反序列化，即使是嵌套结构也是如此。

如常，本文的完整代码示例可以在GitHub上找到。

OK