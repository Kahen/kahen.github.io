---
date: 2022-04-01
category:
  - Java
  - Jackson
tag:
  - Java
  - Validation API
  - Deserialization
head:
  - - meta
    - name: keywords
      content: Java, Jackson, Validation API, Deserialization
------
# Java对象反序列化后验证

在本教程中，我们将看到如何使用Java的验证API在反序列化后验证对象。

## 1. 概述

## 2. 手动触发验证
Java的bean验证API定义在JSR 380中。它的一个常见用途是在Spring控制器中使用`@Valid`注解参数。然而，在本文中，我们将专注于控制器之外的验证。

首先，让我们编写一个方法来验证对象的内容是否符合其验证约束。为此，我们将从默认验证器工厂获取`Validator`。然后，我们将`validate()`方法应用于对象。此方法返回一个`ConstraintViolation`的`Set`。`ConstraintViolation`封装了一些有关验证错误的提示。为了保持简单，如果出现任何验证问题，我们将只抛出一个`ConstraintViolationException`：

```java
`<T>` void validate(T t) {
    Set<ConstraintViolation`<T>`> violations = validator.validate(t);
    if (!violations.isEmpty()) {
        throw new ConstraintViolationException(violations);
    }
}
```

如果我们在对象上调用此方法，如果对象不尊重任何验证约束，它将会抛出异常。此方法可以在任何具有附加约束的现有对象上调用。

## 3. 将验证集成到反序列化过程中

我们现在的目标是将验证集成到反序列化过程中。具体来说，我们将重写Jackson的反序列化器，在反序列化后立即执行验证。这将确保每次我们反序列化一个对象时，如果它不符合要求，我们不允许进行任何进一步的处理。

首先，我们需要重写默认的`BeanDeserializer`。`BeanDeserializer`是一个可以反序列化对象的类。我们希望调用基本的反序列化方法，然后应用我们的`validate()`方法到创建的实例。我们的`BeanDeserializerWithValidation`看起来像这样：

```java
public class BeanDeserializerWithValidation extends BeanDeserializer {

    protected BeanDeserializerWithValidation(BeanDeserializerBase src) {
        super(src);
    }

    @Override
    public Object deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        Object instance = super.deserialize(p, ctxt);
        validate(instance);
        return instance;
    }
}
```

下一步是实现我们自己的`BeanDeserializerModifier`。这将允许我们使用在`BeanDeserializerWithValidation`中定义的行为来改变反序列化过程：

```java
public class BeanDeserializerModifierWithValidation extends BeanDeserializerModifier {

    @Override
    public JsonDeserializer``<?>`` modifyDeserializer(DeserializationConfig config, BeanDescription beanDesc, JsonDeserializer``<?>`` deserializer) {
        if (deserializer instanceof BeanDeserializer) {
            return new BeanDeserializerWithValidation((BeanDeserializer) deserializer);
        }

        return deserializer;
    }

}
```

最后，我们需要创建一个`ObjectMapper`并将我们的`BeanDeserializerModifier`注册为一个`Module`。`Module`是扩展Jackson默认功能的一种方式。让我们将它包装在一个方法中：

```java
ObjectMapper getObjectMapperWithValidation() {
    SimpleModule validationModule = new SimpleModule();
    validationModule.setDeserializerModifier(new BeanDeserializerModifierWithValidation());
    ObjectMapper mapper = new ObjectMapper();
    mapper.registerModule(validationModule);
    return mapper;
}
```

## 4. 示例用法：从文件读取并验证对象

现在我们将展示一个小示例，展示如何使用我们的自定义`ObjectMapper`。首先，让我们定义一个`Student`对象。一个`Student`有一个名字。名字的长度必须在5到10个字符之间：

```java
public class Student {

    @Size(min = 5, max = 10, message = "Student's name must be between 5 and 10 characters")
    private String name;

    public String getName() {
        return name;
    }

}
```

现在让我们创建一个`validStudent.json`文件，其中包含有效`Student`对象的JSON表示：

```json
{
  "name": "Daniel"
}
```

我们将以`InputStream`的形式读取此文件的内容。首先，让我们定义一个方法，将`InputStream`解析为`Student`对象并同时进行验证。为此，我们想使用我们的`ObjectMapper`：

```java
Student readStudent(InputStream inputStream) throws IOException {
    ObjectMapper mapper = getObjectMapperWithValidation();
    return mapper.readValue(inputStream, Student.class);
}
```

现在我们可以编写一个测试，我们将：

- 首先将文件的内容读入`InputStream`
- 将`InputStream`转换为`Student`对象
- 检查`Student`对象的内容是否与预期一致

这个测试看起来像这样：

```java
@Test
void givenValidStudent_WhenReadStudent_ThenReturnStudent() throws IOException {
    InputStream inputStream = getClass().getClassLoader().getResourceAsStream("validStudent.json");
    Student result = readStudent(inputStream);
    assertEquals("Daniel", result.getName());
}
```

类似地，我们可以创建一个`invalid.json`文件，其中包含一个名字长度少于5个字符的`Student`的JSON表示：

```json
{
  "name": "Max"
}
```

现在我们需要调整我们的测试，以检查是否真的抛出了`ConstraintViolationException`。此外，我们可以检查错误消息是否正确：

```java
@Test
void givenStudentWithInvalidName_WhenReadStudent_ThenThrows() {
    InputStream inputStream = getClass().getClassLoader().getResourceAsStream("invalidStudent.json");
    ConstraintViolationException constraintViolationException = assertThrows(ConstraintViolationException.class, () -> readStudent(inputStream));
    assertEquals("name: Student's name must be between 5 and 10 characters", constraintViolationException.getMessage());
}
```

## 5. 结论

在本文中，我们看到了如何重写Jackson的配置，在反序列化后立即验证一个对象。因此，我们可以保证之后不可能使用无效的对象进行工作。

如常，相关代码可在GitHub上找到。