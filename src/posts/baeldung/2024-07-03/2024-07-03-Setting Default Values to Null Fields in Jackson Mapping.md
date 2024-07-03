---
date: 2022-04-01
category:
  - Java
  - Jackson
tag:
  - JSON
  - POJO
  - Default Values
head:
  - - meta
    - name: keywords
      content: Jackson, JSON, Default Values, Java
------
# Jackson 映射中为 Null 字段设置默认值

在本教程中，我们将探讨使用 Jackson 解析 JSON 字符串时处理空值或缺失值的不同方法。我们将详细探讨三种提供不同控制级别的选项。

## 2. 在类级别设置默认值

我们将看到的第一个示例是如何在 POJO 中获取默认值，当它们完全缺失于传入的 JSON 字符串中。让我们创建一个对象，包含两个字段，一个是必需的，另一个我们将为其设置默认值：

```java
class NonAnnotatedDefaultValue {
    String required;
    String optional = "defaultValue";
    // 标准 getter 和 setter
}
```

我们在这里为名为 `optional` 的字段分配了一个值。这将导致 Jackson 在 JSON 中缺少该字段时使用该字符串。现在让我们使用 `ObjectMapper` 对象及其 `readValue()` 方法来使用该对象：

```java
@Test
void givenAClassWithADefaultValue_whenReadingJsonWithoutOptionalValue_thenExpectDefaultValueInResult() 
    throws JsonProcessingException {
    String noOptionalField = "{\"required\": \"value\"}";
    ObjectMapper objectMapper = new ObjectMapper();
    NonAnnotatedDefaultValue createdObject = objectMapper.readValue(noOptionalField, NonAnnotatedDefaultValue.class);
    assert(createdObject.getRequired()).equals("value");
    assert(createdObject.getOptional()).equals("defaultValue");
}
```

从断言中我们可以看到，结果对象既有来自 JSON 的值，也有我们之前指定的默认值。

**这种方法的缺点是，如果传入的 JSON 中属性完全缺失，它才能工作。**如果属性存在但值为 null，则 Jackson 不会应用默认值。在接下来的部分中，我们将看到让我们更好地处理 null 的方法。

## 3. 实现 Setter 方法以获得最大控制

我们可以通过实现字段的 setter 方法来完全控制映射过程。让我们创建一个带有 Jackson 在创建对象时将使用的必要 setter 的对象：

```java
class SetterDefaultValue {
   String required;
   String optional = "valueIfMissingEntirely";

   public void setOptional(String optional) {
       if (optional == null) {
           this.optional = "valueIfNull";
       }
   }
   // 标准 getter 和 setter
}
```

在这里我们像之前一样在类级别提供了默认值。然而，我们还提供了一个 setter 方法。在那个 setter 方法中，我们现在可以做任何我们想做的事情。在这个例子中，我们明确提供了如果值为 null 时预期的行为。如果在我们的 JSON 中没有包含该属性，Jackson 现在将把 `optional` 设置为 `valueIfMissingEntirely`，或者如果它被包含但设置为 null，则设置为 `valueIfNull`。

如果这符合我们的要求，我们可以将两个值都设为相同。让我们看看它在实践中的表现：

```java
@Test
void givenAClassWithASetter_whenReadingJsonWithNullOptionalValue_thenExpectDefaultValueInResult() 
    throws JsonProcessingException {
    String nullOptionalField = "{\"required\": \"value\", \"optional\": null}";
    ObjectMapper objectMapper = new ObjectMapper();
    JsonSetterDefaultValue createdObject = objectMapper.readValue(nullOptionalField, JsonSetterDefaultValue.class);
    assert(createdObject.getRequired()).equals("value");
    assert(createdObject.getOptional()).equals("valueIfNull");
}
```

在这里我们提供了一个 JSON，其中名为 `optional` 的字段被设置为 null。**从断言中我们可以看到，在由 Jackson 创建的结果对象中，该字段已被设置为 `valueIfNull`，这得益于我们的注解。** 这个选项为我们的方法提供了巨大的灵活性。如果我们愿意，我们也可以检查空字符串并以相同的方式应用默认值。

## 4. 使用 @JsonSetter 与 Nulls.SKIP

我们最后的选项是使用 @JsonSetter 并扩展其使用，以告诉它忽略 null。让我们创建一个新的类：

```java
class NullsSkipDefaultValue {
    private String required;
    @JsonSetter(nulls = Nulls.SKIP)
    private String optional = "defaultValue";
    // 标准 getter 和 setter
}
```

**_Nulls.SKIP 参数告诉 @JsonSetter 跳过任何输入值为 null 的情况。** 然后 Jackson 使用提供的默认值。在 Nulls 枚举中我们可以使用几种其他选项。例如，Nulls.SET 将告诉 Jackson 将 JSON 中的 null 转换为 POJO 中的 Java null。今天我们将坚持使用 Nulls.SKIP：

```java
@Test
void givenAClassWithAJsonSetterNullsSkip_whenReadingJsonWithNullOptionalValue_thenExpectDefaultValueInResult() throws JsonProcessingException {
    String nullOptionalField = "{\"required\": \"value\", \"optional\": null}";
    ObjectMapper objectMapper = new ObjectMapper();
    NullsSkipDefaultValue createdObject = objectMapper.readValue(nullOptionalField, NullsSkipDefaultValue.class);
    assert(createdObject.getRequired()).equals("value");
    assert(createdObject.getOptional()).equals("defaultValue");
}
```

在上面，我们可以看到，考虑到与第 3 节中相同的输入 JSON，其中 `optional` 字段被赋值为 null，我们得到了我们想要的默认值。如果我们没有提供可选字段，也会得到相同的结果。

## 5. 结论

在本文中，我们探讨了使用 Jackson 解析 JSON 时处理缺失或 null 值的三种方式。

在类级别设置值很有用，但如果我们有一个 null 值，它就会失败。我们可以改为实现一个 setter 方法以获得最大控制。或者，我们可以使用 @JsonSetter 覆盖字段声明以简单地忽略 nulls。所有三种方法都可能适合我们的情况，这取决于我们希望应用程序如何处理值为 null 的属性。

正如往常一样，示例的完整代码可在 GitHub 上找到。