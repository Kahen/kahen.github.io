---
date: 2022-04-01
category:
  - Java
  - Jackson
tag:
  - OffsetDateTime
  - Serialization
head:
  - - meta
    - name: keywords
      content: Java, Jackson, OffsetDateTime, Serialization
---
# Jackson中OffsetDateTime的序列化

在本教程中，我们将探讨如何使用Jackson序列化OffsetDateTime。

**OffsetDateTime是ISO-8601日历系统中带有UTC/格林尼治标准时间偏移的日期时间的不可变表示。** 例如，2023-10-31T01:30+01:00表示2023年10月31日的最后一分钟的日期时间，与UTC有一小时的偏移。

默认情况下，Jackson不序列化OffsetDateTime，因为它是Java 8日期时间类型。让我们看看如何启用它。

### 2.1. 依赖项
首先，让我们通过向我们的pom.xml添加Jackson databind依赖项来开始：

```xml
``<dependency>``
    ``<groupId>``com.fasterxml.jackson.core``</groupId>``
    ``<artifactId>``jackson-databind``</artifactId>``
    ``<version>``2.14.1``</version>``
``</dependency>``
```

### 2.2. 代码示例
首先，让我们定义我们想要序列化的类：

```java
public class User {
    private OffsetDateTime createdAt;

    // 构造函数，getter和setter
}
```

接下来，我们将创建一个方法将User对象序列化为JSON：

```java
String serializeUser() throws JsonProcessingException {
    ObjectMapper objectMapper = new ObjectMapper();
    User user = new User();
    user.setCreatedAt(OffsetDateTime.parse("2021-09-30T15:30:00+01:00"));

    return objectMapper.writeValueAsString(user);
}
```

如果我们调用上述方法，我们将得到以下错误：

```plaintext
Exception in thread "main" com.fasterxml.jackson.databind.exc.InvalidDefinitionException: Java 8 date/time type `java.time.OffsetDateTime` not supported by default: add Module "com.fasterxml.jackson.datatype:jackson-datatype-jsr310" to enable handling (through reference chain: com.baeldung.offsetdatetime.User["createdAt"])
```

正如我们所看到的，Jackson默认不支持序列化OffsetDateTime。让我们看看如何修复这个问题。

### 3. 注册JavaTimeModule
正如错误消息所建议的，Jackson提供了一个名为JavaTimeModule的模块，我们可以使用它来以正确的格式序列化OffsetDateTime。

首先，我们需要在我们的pom.xml中包含jackson-datatype-jsr310依赖项：

```xml
``<dependency>``
    ``<groupId>``com.fasterxml.jackson.datatype``</groupId>``
    ``<artifactId>``jackson-datatype-jsr310``</artifactId>``
    ``<version>``2.14.1``</version>``
``</dependency>``
```

现在，我们可以在序列化对象之前使用registerModule()方法将此模块注册到ObjectMapper：

```java
String serializeUser() throws JsonProcessingException {
    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    objectMapper.registerModule(new JavaTimeModule());

    User user = new User();
    user.setCreatedAt(OffsetDateTime.parse("2021-09-30T15:30:00+01:00"));

    return objectMapper.writeValueAsString(user);
}
```

我们使用registerModule()方法将JavaTimeModule注册到ObjectMapper。我们还禁用了SerializationFeature.WRITE_DATES_AS_TIMESTAMPS特性，以获取与输入格式相同的日期，而不是作为时间戳。

当我们再次调用该方法时，错误消失了，我们得到了序列化日期的输出。我们可以使用JUnit测试来测试这一点：

```java
@Test
void givenUser_whenSerialized_thenCreatedDateIsSerialized() throws JsonProcessingException {
    Assertions.assertEquals("{\"createdAt\":\"2021-09-30T15:30:00+01:00\"}", Main.serializeUser());
}
```

### 4. 自定义序列化和反序列化
另一种解决问题的方法是为OffsetDateTime创建自定义序列化器。如果我们还想要自定义日期的格式，这将是首选的方法。

#### 4.1. 自定义序列化器
我们可以通过创建一个扩展Jackson JsonSerializer类的类并覆盖serialize()方法来实现这一点：

```java
public class OffsetDateTimeSerializer extends JsonSerializer``<OffsetDateTime>`` {
    private static final DateTimeFormatter DATE_TIME_FORMATTER
      = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss XXX");

    @Override
    public void serialize(OffsetDateTime value, JsonGenerator jsonGenerator, SerializerProvider serializerProvider)
      throws IOException {
        if (value == null) {
            throw new IOException("OffsetDateTime argument is null.");
        }
        jsonGenerator.writeString(DATE_TIME_FORMATTER.format(value));
    }
}
```

让我们看看上述代码的一些重要点：

- 我们创建了一个DateTimeFormatter，使用我们想要的格式。这里我们使用了与默认格式不同的格式。
- 接下来，我们通过调用DateTimeFormatter上的format()方法来格式化日期。
- 最后，我们通过调用JsonGenerator上的writeString()方法将格式化的日期写入。

现在我们可以在序列化对象之前将此序列化器注册到ObjectMapper：

```java
String customSerialize() throws JsonProcessingException {
    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.registerModule(new SimpleModule().addSerializer(OffsetDateTime.class, new OffsetDateTimeSerializer()));

    User user = new User();
    user.setCreatedAt(OffsetDateTime.parse("2021-09-30T15:30:00+01:00"));

    return objectMapper.writeValueAsString(user);
}
```

我们现在可以测试我们是否按照序列化器中指定的格式获得了日期：

```java
@Test
void givenUser_whenCustomSerialized_thenCreatedDateIsSerialized() throws JsonProcessingException {
    Assertions.assertEquals("{\"createdAt\":\"30-09-2021 15:30:00 +01:00\"}", Main.customSerialize());
}
```

#### 4.2. 自定义反序列化器
由于我们创建了一个自定义序列化器，我们还需要创建一个自定义反序列化器来从JSON字符串中反序列化日期。如果我们不这样做，我们会再次得到相同的InvalidDefinitionException。

我们可以通过创建一个扩展JsonDeserializer并覆盖deserialize()方法的类来实现这一点：

```java
public class OffsetDateTimeDeserializer extends JsonDeserializer``<OffsetDateTime>`` {
    private static final DateTimeFormatter DATE_TIME_FORMATTER
      = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss XXX");

    @Override
    public OffsetDateTime deserialize(JsonParser jsonParser, DeserializationContext deserializationContext)
      throws IOException {
        String dateAsString = jsonParser.getText();
        if (dateAsString == null) {
            throw new IOException("OffsetDateTime argument is null.");
        }
        return OffsetDateTime.parse(dateAsString, DATE_TIME_FORMATTER);
    }
}
```

与序列化器类似，我们创建了一个DateTimeFormatter，使用我们想要的格式。最后，我们将格式化器传递给parse()方法以获取OffsetDateTime对象并返回该值。

我们可以在任何想要反序列化对象的地方将此反序列化器注册到ObjectMapper：

```java
String customDeserialize() throws JsonProcessingException {
    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.registerModule(new SimpleModule().addDeserializer(OffsetDateTime.class, new OffsetDateTimeDeserializer()));

    String json = "{\"createdAt\":\"30-09-2021 15:30:00 +01:00\"}";
    User user = objectMapper.readValue(json, User.class);

    return returnedUser.getCreatedAt().toString();
}
```

我们在输出中以默认的OffsetDateTime格式获得了日期：

```java
@Test
void givenUser_whenCustomDeserialized_thenCreatedDateIsDeserialized() throws JsonProcessingException {
    Assertions.assertEquals("2021-09-30T15:30+01:00", Main.customDeserialize());
}
```

### 5. 结论
在本文中，我们看到了如何使用Jackson序列化和反序列化OffsetDateTime。我们看到了两种解决Jackson默认序列化OffsetDateTime的方法——首先是使用JavaTimeModule，其次是通过定义自定义序列化器。

如常，本文的代码示例可以在GitHub上找到。