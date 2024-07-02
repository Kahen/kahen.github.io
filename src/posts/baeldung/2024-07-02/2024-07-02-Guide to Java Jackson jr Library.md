---
date: 2024-07-02
category:
  - Java
  - Jackson-jr
tag:
  - JSON
  - 库
  - 轻量级
head:
  - - meta
    - name: keywords
      content: Java, Jackson-jr, JSON, 轻量级库
---
# Jackson-jr 库指南

Jackson-jr 是一个为 Java 设计的轻量级 JSON 处理库，旨在为原始的 Jackson 库提供一个更简单和更小的替代品。凭借其小巧的体积和易于使用的 API，Jackson-jr 是**日常 JSON 读写场景的极佳选择**。

在本指南中，我们将探索 Jackson-jr 的关键特性和用法，以及示例和最佳实践。

### 2. Jackson-jr 入门

Jackson-jr 提供了一种轻量级且高效的方式来处理 Java 应用程序中的 JSON 数据。它提供了一个简单的 API 来处理 JSON 对象和数组，使解析、生成和操作 JSON 数据变得更容易。

首先，我们必须将 Jackson-jr 库包含在我们的项目中。我们可以通过将所需的 Jackson-jr 依赖项版本添加到项目的构建配置文件中来实现这一点。

对于 Maven，我们可以在 _pom.xml_ 文件中添加依赖项：

```xml
`<dependency>`
    `<groupId>`com.fasterxml.jackson.jr`</groupId>`
    `<artifactId>`jackson-jr-all`</artifactId>`
    `<version>`2.15.2`</version>`
`</dependency>`
```

对于 Gradle，我们可以在 _build.gradle_ 文件中添加依赖项：

```gradle
implementation 'com.fasterxml.jackson.jr:jackson-jr-all:2.15.2'
```

### 3. 使用 JSON 对象

使用 Jackson-jr 的基础对象是 _JSON 对象_。关于 _JSON_ 对象的一个非常重要的且不应忘记的事实：**每个 _JSON_ 实例都是完全不可变的且线程安全的**。我们可以随意使用它们，作为单例实例、Spring Bean，甚至构建个别对象。我们可以将同一个实例在不同线程间传递，因为它是完全不可变的。

#### 3.1. 创建 JSON 对象和数组

创建 JSON 对象和数组：Jackson-jr 提供了一个方便的 API 来创建 JSON 对象和数组。我们可以使用 _LinkedHashMap_ 类来表示 JSON 对象，使用 _ArrayList_ 来表示 JSON 数组。

JSON 对象是一个 _LinkedHashMap_。我们可以很容易地使用 _LinkedHashMap.put()_ 方法添加属性，并使用 _LinkedHashMap.get()_ 方法获取属性。

```java
String json = JSON.std
  .with(JSON.Feature.PRETTY_PRINT_OUTPUT)
  .asString(new LinkedHashMap`<String, Object>`() {{
      put("name", "John Doe");
      put("age", 30);
      put("email", "johndoe@example.com");
  }});
```

#### 3.2. Jackson-jr 作曲家

Jackson-jr 的另一个不错的特性是增加了 _Composer_ 接口，用于以构建器样式生成 JSON 内容：

```java
String json = JSON.std.with(JSON.Feature.PRETTY_PRINT_OUTPUT)
  .composeString()
  .startObject()
  .startArrayField("objectArray")
  .startObject()
  .put("name", "name1")
  .put("age", 11)
  .end()
  .startObject()
  .put("name", "name2")
  .put("age", 12)
  .end()
  .end()
  .startArrayField("array")
  .add(1)
  .add(2)
  .add(3)
  .end()
  .startObjectField("object")
  .put("name", "name3")
  .put("age", 13)
  .end()
  .put("last", true)
  .end()
  .finish();
```

这个构建器的结果如下 JSON：

```json
{
  "objectArray" : [ {
    "name" : "name1",
    "age" : 11
  }, {
    "name" : "name2",
    "age" : 12
  } ],
  "array" : [ 1, 2, 3 ],
  "object" : {
    "name" : "name3",
    "age" : 13
  },
  "last" : true
}
```

## 4. 序列化和反序列化

Jackson-jr 允许我们轻松地将 Java 对象转换为 JSON 字符串，反之亦然。我们可以配置写入器以所需的选项，例如美化打印或自定义日期格式，然后使用它将对象写为 JSON 字符串。

Jackson-jr 支持复杂对象结构，包括嵌套对象和数组。通过正确定义我们的 Java 类及其关系，Jackson-jr 可以处理复杂 JSON 数据的序列化和反序列化。

```java
// 序列化
String json = JSON.std.with(JSON.Feature.PRETTY_PRINT_OUTPUT)
  .asString(person);

// 反序列化
json = "{\"name\":\"John Doe\",\"age\":30}";
Person person1 = JSON.std.with(JSON.Feature.PRETTY_PRINT_OUTPUT)
  .beanFrom(Person.class, json);
```

### 4.1. Jackson-jr 中的自定义

Jackson-jr 支持各种注解，例如 _@JsonProperty_，以自定义序列化和反序列化过程。这些注解允许我们控制属性的名称，指定日期和时间格式，并处理其他自定义场景。我们可以在他们的官方 Github 项目中看到所有支持的注解列表。

Jackson-jr 有一系列特性自定义，我们可以使用它来自定义我们的序列化和反序列化的输入和输出，例如美化打印、写入空属性等。查看它们最简单的方式是在基础代码中。

```java
JSON jsonMapper = JSON.std.with(JSON.Feature.PRETTY_PRINT_OUTPUT)
  .with(JSON.Feature.WRITE_NULL_PROPERTIES)
  .with(JSON.Feature.FAIL_ON_DUPLICATE_MAP_KEYS);
String json = jsonMapper.asString(person);
```

Jackson-jr 允许我们创建自定义序列化器和反序列化器来处理特定数据类型或复杂的序列化场景。通过实现适当的接口，_ValueWriter_，和扩展提供的类，_ValueReader 和 ReadWriterProvider_，我们可以定义我们的自定义对象应该如何被序列化和反序列化。

Jackson-jr 不支持 _java.time._ 包，但我们可以通过自定义序列化器和反序列化器添加它：

```java
public class CustomDateSerializer implements ValueWriter {
    @Override
    public void writeValue(JSONWriter jsonWriter, JsonGenerator jsonGenerator, Object o) throws IOException {
        jsonGenerator.writeString(o.toString());
    }

    @Override
    public Class```<?>``` valueType() {
        return LocalDate.class;
    }
}
```

```java
public class CustomDateDeserializer extends ValueReader {
    private final static DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MMM-dd");

    public CustomDateDeserializer() {
        super(LocalDate.class);
    }

    @Override
    public Object read(JSONReader jsonReader, JsonParser jsonParser) throws IOException {
        return LocalDate.parse(jsonParser.getText(), dtf);
    }
}
```

注册它们之后，我们可以开始序列化和反序列化 _LocalDate_ 对象：

```java
public class MyHandlerProvider extends ReaderWriterProvider {

    @Override
    public ValueWriter findValueWriter(JSONWriter writeContext, Class```<?>``` type) {
        if (type == LocalDate.class) {
            return new CustomDateSerializer();
        }
        return null;
    }

    @Override
    public ValueReader findValueReader(JSONReader readContext, Class```<?>``` type) {
        if (type.equals(LocalDate.class)) {
            return new CustomDateDeserializer();
        }
        return null;
    }
}
```

```java
Person person = new Person("John Doe", 30, LocalDate.now());

JSON jsonMapper = JSON.builder().register(new JacksonJrExtension() {
    @Override
    protected void register(ExtensionContext extensionContext) {
        extensionContext.insertProvider(new MyHandlerProvider());
    }
}).build().with(JSON.Feature.PRETTY_PRINT_OUTPUT);

String json = jsonMapper.asString(person);
Person deserializedPerson = jsonMapper.beanFrom(Person.class, json);
```

| Jackson-jr | Jackson |
| --- | --- |
| 更小的 jar | 更大的 jar |
| 功能更少 | 更复杂的功能 |
| 更适合简单的序列化和反序列化 | 更适合更复杂的序列化和反序列化 |
| 启动时间更快 | 启动时间更慢 |
| 更简单的 API | 更复杂的 API |

## 6. 结论

Jackson-jr 为 Java 应用程序中的 JSON 处理提供了一种轻量级和用户友好的方法。凭借其简化的 API、自定义选项和高效的性能，它是需要轻量级 JSON 处理库且不牺牲功能的开发者的极佳选择。

如常，示例的源代码可在 GitHub 上找到。