---
date: 2022-04-01
category:
  - Java
  - Jackson
tag:
  - JsonMappingException
  - Deserialization
head:
  - - meta
    - name: keywords
      content: Jackson, JsonMappingException, Deserialization, ArrayList, JSON
---
# 解决 JsonMappingException：无法从对象值（token `JsonToken.START_OBJECT`）反序列化 java.util.ArrayList 实例 | Baeldung

在这篇简短的教程中，我们将解释如何解决异常 _JsonMappingException: Can not deserialize instance of java.util.ArrayList from Object value (token `JsonToken.START_OBJECT`)_。

首先，我们将强调异常的主要原因。然后，我们将展示如何在实践中重现它，以及最终如何解决它。

### 2. 理解异常

通常，Jackson 在反序列化 JSON 字符串时抛出 _JsonMappingException_ 来**表示一个致命的映射错误**。因此，堆栈跟踪 “_Can not deserialize instance of java.util.ArrayList_” 表明 Jackson 未能将 JSON 属性映射到 _ArrayList_ 的一个实例。

简而言之，这种异常最常见的原因是**使用花括号 _“{…}”_ 而不是方括号 _“[ ]”_ 来表示集合**。

### 3. 重现异常

现在我们知道了什么导致 Jackson 抛出 _JsonMappingException_，让我们通过一个实际的例子来看看如何重现它。

让我们考虑 _Country_ 类：

```java
public class Country {
    private String name;
    private List`<String>` cities;

    // 标准 getter 和 setter
}
```

如我们所见，一个国家由名称和城市列表定义。

接下来，让我们假设在 JSON 字符串中使用花括号来定义城市：

```json
{
    "name": "Netherlands",
    "cities": {"Amsterdam", "Tamassint"}
}
```

现在尝试将 JSON 字符串反序列化为 _Country_ 类型的对象将导致以下错误：

```plaintext
Cannot deserialize value of type `java.util.ArrayList```<java.lang.String>```` from Object value (token `JsonToken.START_OBJECT`)
at [Source: (String)"{\"name\":\"Netherlands\",\"cities\":{\"Amsterdam\", \"Tamassint\"}}; line: 1, column: 32] 
(through reference chain: com.baeldung.mappingexception.Country["cities"])
...
```

最后，我们将创建一个测试用例来确认这一点：

```java
@Test
public final void givenJsonWithInvalidList_whenDeserializing_thenThrowException() throws JsonParseException, IOException {
    String json = "{\"name\":\"Netherlands\",\"cities\":{\"Amsterdam\", \"Tamassint\"}}";
    ObjectMapper mapper = new ObjectMapper();

    Exception exception = assertThrows(JsonMappingException.class, () -> mapper.reader()
      .forType(Country.class)
      .readValue(json));

    assertTrue(exception.getMessage()
      .contains("Cannot deserialize value of type `java.util.ArrayList```<java.lang.String>````"));
}
```

如上所示，Jackson 因 “_Cannot deserialize value of type `java.util.ArrayList```<java.lang.String>````” 而失败。

这里的主要原因是我们使用花括号来表示城市列表。对于 Jackson 来说，{“Amsterdam”, “Tamassint”} 不是一个 JSON 数组。

### 4. 修复异常

避免异常的最简单方法是使用方括号而不是花括号来定义元素集合。因此，要解决异常，我们首先需要修复我们的 JSON 字符串：

```json
{
    "name": "Netherlands",
    "cities": ["Amsterdam", "Tamassint"]
}
```

现在让我们使用一个测试用例来验证一切是否按预期工作：

```java
@Test
public final void givenJsonWithValidList_whenDeserializing_thenCorrect() throws JsonParseException, IOException {
    String json = "{\"name\":\"Netherlands\",\"cities\":[\"Amsterdam\", \"Tamassint\"]}";
    ObjectMapper mapper = new ObjectMapper();

    Country country = mapper.reader()
      .forType(Country.class)
      .readValue(json);

    assertEquals("Netherlands", country.getName());
    assertEquals(Arrays.asList("Amsterdam", "Tamassint"), country.getCities());
}
```

如我们所见，新的 JSON 字符串已成功反序列化为 _Country_ 对象。

### 5. 结论

在这篇简短的文章中，我们讨论了 _JsonMappingException: Can not deserialize instance of java.util.ArrayList from Object value (token `JsonToken.START_OBJECT`)_ 的主要原因。然后我们展示了如何产生异常，以及如何解决它。

如常，示例的完整源代码可以在 GitHub 上找到。