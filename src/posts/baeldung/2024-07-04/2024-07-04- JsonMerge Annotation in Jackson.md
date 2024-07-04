---
date: 2022-04-01
category:
  - Jackson
  - Java
tag:
  - Jackson
  - JSON
  - Java
head:
  - - meta
    - name: keywords
      content: Jackson, JSON, Java, @JsonMerge, 合并
---

# Jackson中@JsonMerge注解的使用

在本教程中，我们将探讨Jackson Java库中的@JsonMerge注解。Jackson以其在Java应用程序中处理JSON的能力而闻名。这个注解允许我们将新数据合并到嵌套的POJO（普通旧Java对象）或Map中的对象。我们将先看看没有使用注解时的现有功能，然后看看使用它在我们的代码中会产生什么不同。

## @JsonMerge的作用

ObjectMapper是Jackson最常用的特性之一，它允许我们将JSON映射到我们的Java对象，并进行反向操作。ObjectMapper的一个能力是读取一个对象，并用JSON字符串中的新数据更新它，假设JSON结构正确。在引入@JsonMerge之前，更新能力的局限性在于它会覆盖POJO和Map。有了这个注解，嵌套POJO和Map中的属性在更新时会被合并。

让我们看看如何在实践中使用@JsonMerge。我们将创建两个对象，首先是键盘：

```java
class Keyboard {
    String style;
    String layout;
    // 标准getter、setter和构造函数
}
```

其次是将使用键盘的程序员：

```java
class ProgrammerNotAnnotated {
    String name;
    String favouriteLanguage;
    Keyboard keyboard;
    // 标准getter、setter和构造函数
}
```

稍后我们将添加@JsonMerge注解，但现在我们已经准备好了。

## 不使用@JsonMerge的合并

要更新一个对象，我们首先需要一个表示我们想要合并的新数据的JSON字符串：

```json
String newData = "{\"favouriteLanguage\":\"Java\",\"keyboard\":{\"style\":\"Mechanical\"}}";
```

然后我们需要创建我们想要用新数据更新的对象：

```java
ProgrammerNotAnnotated programmerToUpdate = new ProgrammerNotAnnotated("John", "C++", new Keyboard("Membrane", "US"));
```

让我们使用我们刚刚定义的字符串和对象，看看没有注解会发生什么。我们首先创建一个ObjectMapper实例，然后使用它创建一个ObjectReader。ObjectReader是一个轻量级、线程安全的我们可以用于许多与ObjectMapper相同功能的实例，但开销更少。我们可以在每次序列化/反序列化的基础上使用ObjectReader实例，因为它们制作和配置都非常便宜。

我们将使用ObjectMapper.readerForUpdating()创建ObjectReader，传入我们想要更新的对象作为唯一参数。这是一个专门为返回将用JSON字符串中的新数据更新给定对象的ObjectReader实例的工厂方法。一旦我们有了ObjectReader，我们只需调用readValue()并传入我们的新数据：

```java
@Test
void givenAnObjectAndJson_whenNotUsingJsonMerge_thenExpectNoUpdateInPOJO() throws JsonProcessingException {
    ObjectMapper objectMapper = new ObjectMapper();
    ObjectReader objectReader = objectMapper.readerForUpdating(programmerToUpdate);
    ProgrammerNotAnnotated update = objectReader.readValue(newData);

    assert(update.getFavouriteLanguage()).equals("Java");
    assertNull(update.getKeyboard()
      .getLayout());
}
```

之后，我们可以打印出update，清楚地看到我们最终得到了什么：

```json
{name='John', favouriteLanguage='Java', keyboard=Keyboard{style='Mechanical', layout='null'}}
```

我们从测试断言和JSON中可以看出，我们的programmerToUpdate接收到了顶层更新，他最喜欢的语言现在是Java。然而，我们完全覆盖了嵌套的Keyboard对象，即使新数据只包含了一个样式，我们还是丢失了布局属性。像Keyboard这样的POJO合并能力是@JsonMerge注解的主要好处之一，正如我们将在下一节中看到的。

## 使用@JsonMerge的合并

现在让我们创建一个新的带有@JsonMerge注解的程序员对象：

```java
class ProgrammerAnnotated {
    String name;
    String favouriteLanguage;
    @JsonMerge
    Keyboard keyboard;
    // 标准getter、setter和构造函数
}
```

如果我们像上面一样使用这个对象，我们会得到一个不同的结果：

```java
@Test
void givenAnObjectAndJson_whenUsingJsonMerge_thenExpectUpdateInPOJO() throws JsonProcessingException {
    String newData = "{\"favouriteLanguage\":\"Java\",\"keyboard\":{\"style\":\"Mechanical\"}}";
    ProgrammerAnnotated programmerToUpdate = new ProgrammerAnnotated("John", "C++", new Keyboard("Membrane", "US"));

    ObjectMapper objectMapper = new ObjectMapper();
    ProgrammerAnnotated update = objectMapper.readerForUpdating(programmerToUpdate).readValue(newData);

    assert(update.getFavouriteLanguage()).equals("Java");
    // 只有在注解下才有效
    assert(update.getKeyboard().getLayout()).equals("US");
}
```

最后，我们可以再次打印出update，看看这次我们更新了嵌套的Keyboard POJO：

```json
{name='John', favouriteLanguage='Java', keyboard=Keyboard{style='Mechanical', layout='US'}}
```

这里清楚地看到了注解的行为。嵌套对象中的传入字段覆盖了现有的字段。新数据中没有匹配的字段则保持不变。

## 使用@JsonMerge合并Map

合并Map的过程与我们已经看到的非常相似。让我们创建一个带有Map的对象，我们可以用它来演示：

```java
class ObjectWithMap {
    String name;
    @JsonMerge
    Map``<String, String>`` stringPairs;
    // 标准getter、setter和构造函数
}
```

然后，让我们创建一个包含我们将更新对象的Map的起始JSON字符串：

```json
String newData = "{\"stringPairs\":{\"field1\":\"value1\",\"field2\":\"value2\"}}";
```

最后，我们需要实例化ObjectWithMap，我们想要更新：

```java
Map``<String, String>`` map = new HashMap<>();
map.put("field3", "value3");
ObjectWithMap objectToUpdateWith = new ObjectWithMap("James", map);
```

现在我们可以使用我们之前使用过的相同过程来更新我们的对象：

```java
@Test
void givenAnObjectWithAMap_whenUsingJsonMerge_thenExpectAllFieldsInMap() throws JsonProcessingException {
    ObjectMapper objectMapper = new ObjectMapper();
    ObjectWithMap update = objectMapper.readerForUpdating(objectToUpdateWith).readValue(newData);

    assertTrue(update.getStringPairs().containsKey("field1"));
    assertTrue(update.getStringPairs().containsKey("field2"));
    assertTrue(update.getStringPairs().containsKey("field3"));
}
```

如果我们再次打印出update以查看最终结果，它看起来像这样：

```json
{name='James', something={field1=value1, field3=value3, field2=value2}}
```

我们从测试和打印输出中看到，使用注解已经导致Map中的所有三对键值存在。如果没有注解，我们只会有新数据中的键值对。

## 结论

在本文中，我们看到了我们可以使用Jackson用新的传入JSON数据更新现有对象。此外，通过在我们的Java对象中使用@JsonMerge注解，我们可以让Jackson合并嵌套的POJO和Map。如果没有注解，Jackson将覆盖它们，所以它的有用性取决于我们的用例。

如常，示例的完整代码可在GitHub上找到。