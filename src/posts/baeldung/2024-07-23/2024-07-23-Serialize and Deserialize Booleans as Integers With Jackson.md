---
date: 2024-07-24
category:
  - Java
  - Jackson
tag:
  - JSON
  - Serialization
  - Deserialization
head:
  - - meta
    - name: keywords
      content: Jackson, JSON, Serialization, Deserialization, Boolean, Integer
---

# Jackson中将布尔值序列化为整数

Jackson库是Java世界处理JSON数据的事实标准。尽管Jackson有明确定义的默认设置，但要将布尔值映射为整数，我们仍然需要手动配置。

当然，一些开发人员想知道如何以最佳方式并以最小的努力实现这一点。

在本文中，我们将解释如何在Jackson中将布尔值序列化为整数和数字字符串，反之亦然。

## 2. 序列化

首先，我们将研究序列化部分。要测试布尔值到整数的序列化，让我们定义我们的模型，Game：

```java
public class Game {
    private Long id;
    private String name;
    private Boolean paused;
    private Boolean over;

    // 构造函数，getter和setter
}
```

像往常一样，默认的Game对象序列化将使用Jackson的ObjectMapper：

```java
ObjectMapper mapper = new ObjectMapper();
Game game = new Game(1L, "My Game");
game.setPaused(true);
game.setOver(false);
String json = mapper.writeValueAsString(game);
```

不出所料，布尔字段的输出将是默认的 - true或false：

```json
{"id":1, "name":"My Game", "paused":true, "over":false}
```

然而，我们的目标是最终从我们的Game对象中得到以下JSON输出：

```json
{"id":1, "name":"My Game", "paused":1, "over":0}
```

### 2.1. 字段级别配置

将布尔值序列化为整数的一个直接方法是使用@JsonFormat注解并设置Shape.NUMBER：

```java
@JsonFormat(shape = Shape.NUMBER)
private Boolean paused;

@JsonFormat(shape = Shape.NUMBER)
private Boolean over;
```

然后，让我们在测试方法中尝试我们的序列化：

```java
ObjectMapper mapper = new ObjectMapper();
Game game = new Game(1L, "My Game");
game.setPaused(true);
game.setOver(false);
String json = mapper.writeValueAsString(game);

assertThat(json)
  .isEqualTo("{\"id\":1,\"name\":\"My Game\",\"paused\":1,\"over\":0}");
```

正如我们在JSON输出中注意到的，我们的布尔字段 - paused和over - 变成了数字1和0。我们可以看到值是以整数格式存在的，因为它们没有被引号包围。

### 2.2. 全局配置

有时，注释每个字段并不实用。例如，根据要求，我们可能需要全局配置我们的布尔值到整数序列化。

幸运的是，**Jackson允许我们通过覆盖ObjectMapper中的默认值来全局配置@JsonFormat**：

```java
ObjectMapper mapper = new ObjectMapper();
mapper.configOverride(Boolean.class)
  .setFormat(JsonFormat.Value.forShape(Shape.NUMBER));

Game game = new Game(1L, "My Game");
game.setPaused(true);
game.setOver(false);
String json = mapper.writeValueAsString(game);

assertThat(json)
  .isEqualTo("{\"id\":1,\"name\":\"My Game\",\"paused\":1,\"over\":0}");
```

## 3. 反序列化

同样，我们可能还想在将JSON字符串反序列化为我们的模型时从数字中获取布尔值。

幸运的是，Jackson可以通过默认设置解析数字 - 只有1和0 - 到布尔值。因此，我们也不需要使用@JsonFormat注解或任何其他配置。

因此，无需配置，让我们借助另一个测试方法来查看这种行为：

```java
ObjectMapper mapper = new ObjectMapper();
String json = "{\"id\":1,\"name\":\"My Game\",\"paused\":1,\"over\":0}";
Game game = mapper.readValue(json, Game.class);

assertThat(game.isPaused()).isEqualTo(true);
assertThat(game.isOver()).isEqualTo(false);
```

因此，**整数到布尔值的反序列化在Jackson中是开箱即用的**。

## 4. 数字字符串而不是整数

另一个用例是使用数字字符串 - "1"和"0" - 而不是整数。在这种情况下，将布尔值序列化为数字字符串或将其反序列化回布尔值需要更多的努力。

### 4.1. 序列化为数字字符串

要将布尔值序列化为数字字符串等价物，我们需要定义自定义序列化器。

所以，让我们通过扩展Jackson的JsonSerializer创建我们的NumericBooleanSerializer：

```java
public class NumericBooleanSerializer extends JsonSerializer``<Boolean>`` {

    @Override
    public void serialize(Boolean value, JsonGenerator gen, SerializerProvider serializers)
      throws IOException {
        gen.writeString(value ? "1" : "0");
    }
}
```

顺便说一下，通常，布尔类型可以为null。但是，Jackson在内部处理这个问题，并且当value字段为null时，不会考虑我们的自定义序列化器。因此，我们在这里是安全的。

接下来，我们将注册我们的自定义序列化器，以便Jackson识别并使用它。

**如果我们只需要对有限数量的字段进行这种行为，我们可以选择使用@JsonSerialize注解进行字段级别配置。**

相应地，让我们注释我们的布尔字段，paused和over：

```java
@JsonSerialize(using = NumericBooleanSerializer.class)
private Boolean paused;

@JsonSerialize(using = NumericBooleanSerializer.class)
private Boolean over;
```

然后，同样地，在测试方法中尝试序列化：

```java
ObjectMapper mapper = new ObjectMapper();
Game game = new Game(1L, "My Game");
game.setPaused(true);
game.setOver(false);
String json = mapper.writeValueAsString(game);

assertThat(json)
  .isEqualTo("{\"id\":1,\"name\":\"My Game\",\"paused\":\"1\",\"over\":\"0\"}");
```

尽管测试方法的实现与之前的几乎相同，但我们应该注意到引号 - "paused":"1", "over":"0" - 围绕数字值。这肯定表明这些值实际上是包含数字内容的字符串。

最后但同样重要的是，如果我们需要在任何地方执行此自定义序列化，**Jackson通过将它们添加到ObjectMapper的Jackson模块来支持序列化器的全局配置**：

```java
ObjectMapper mapper = new ObjectMapper();
SimpleModule module = new SimpleModule();
module.addSerializer(Boolean.class, new NumericBooleanSerializer());
mapper.registerModule(module);

Game game = new Game(1L, "My Game");
game.setPaused(true);
game.setOver(false);
String json = mapper.writeValueAsString(game);

assertThat(json)
  .isEqualTo("{\"id\":1,\"name\":\"My Game\",\"paused\":\"1\",\"over\":\"0\"}");
```

结果，只要我们使用相同的ObjectMapper实例，Jackson将所有布尔类型的字段序列化为数字字符串。

### 4.2. 从数字字符串反序列化

与序列化类似，这次我们将定义一个自定义反序列化器来解析数字字符串为布尔值。

让我们通过扩展JsonDeserializer创建我们的类NumericBooleanDeserializer：

```java
public class NumericBooleanDeserializer extends JsonDeserializer``<Boolean>`` {

    @Override
    public Boolean deserialize(JsonParser p, DeserializationContext ctxt)
      throws IOException {
        if ("1".equals(p.getText())) {
            return Boolean.TRUE;
        }
        if ("0".equals(p.getText())) {
            return Boolean.FALSE;
        }
        return null;
    }

}
```

接下来，我们再次注释我们的布尔字段，但这次使用@JsonDeserialize：

```java
@JsonSerialize(using = NumericBooleanSerializer.class)
@JsonDeserialize(using = NumericBooleanDeserializer.class)
private Boolean paused;

@JsonSerialize(using = NumericBooleanSerializer.class)
@JsonDeserialize(using = NumericBooleanDeserializer.class)
private Boolean over;
```

所以，让我们编写另一个测试方法来看看我们的NumericBooleanDeserializer在行动：

```java
ObjectMapper mapper = new ObjectMapper();
String json = "{\"id\":1,\"name\":\"My Game\",\"paused\":\"1\",\"over\":\"0\"}";
Game game = mapper.readValue(json, Game.class);

assertThat(game.isPaused()).isEqualTo(true);
assertThat(game.isOver()).isEqualTo(false);
```

或者，通过Jackson模块，我们的自定义反序列化器的全局配置也是可能的：

```java
ObjectMapper mapper = new ObjectMapper();
SimpleModule module = new SimpleModule();
module.addDeserializer(Boolean.class, new NumericBooleanDeserializer());
mapper.registerModule(module);

String json = "{\"id\":1,\"name\":\"My Game\",\"paused\":\"1\",\"over\":\"0\"}";
Game game = mapper.readValue(json, Game.class);

assertThat(game.isPaused()).isEqualTo(true);
assertThat(game.isOver()).isEqualTo(false);
```

## 5. 结论

在本文中，我们描述了如何将布尔值序列化为整数和数字字符串，以及如何将它们反序列化回来。

如常，示例的源代码和更多内容可在GitHub上找到。