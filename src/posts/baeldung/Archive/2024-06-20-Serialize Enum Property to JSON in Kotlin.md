---
date: 2024-06-20
category:
  - Kotlin
  - JSON
tag:
  - Kotlin
  - JSON
  - Serialization
  - Enum
  - Jackson
  - Gson
  - kotlinx.serialization
head:
  - - meta
    - name: keywords
      content: Kotlin, JSON, Serialization, Enum, Jackson, Gson, kotlinx.serialization
---
# 在Kotlin中将枚举属性序列化为JSON

在Kotlin中，处理JSON序列化通常需要处理枚举。当将这些枚举序列化为JSON时，我们需要确保它们正确地转换为字符串表示形式。

在本教程中，我们将探讨如何使用一些流行的JSON序列化库在Kotlin中将枚举字段序列化为JSON。

## 2. 问题介绍

像往常一样，让我们通过一个例子来理解问题。假设我们有一个表示不同编程语言的枚举类：

```kotlin
enum class Language(val description: String) {
    KOTLIN("Kotlin_is_awesome"),
    JAVA("Java_is_great"),
    GO("Go_is_nice")
}
```

如上所示的_Language_枚举，它有一个_String_属性：_description_。

接下来，让我们创建一个使用_Language_枚举的数据类：

```kotlin
data class Dev(val name: String, val language: Language)
```

一个_Dev_实例代表一个开发者，包括他/她的名字和他/她主要使用的编程语言。

现在，让我们创建一个_Dev_实例并将对象序列化为JSON：

```kotlin
val mapper = ObjectMapper().registerModule(KotlinModule.Builder().build())
val dev = Dev("Kai", Language.KOTLIN)
val json = mapper.writeValueAsString(dev)
assertEquals("""{"name":"Kai","language":"KOTLIN"}""", json)
```

上述测试显示，默认情况下**枚举的_name_用于表示序列化JSON中的枚举对象**。

我们以流行的Jackson库为例来序列化_dev_对象。**其他JSON序列化方法，如Gson和kotlinx.serialization，遵循相同的默认行为。**

然而，有时我们希望**在JSON中使用枚举属性的值而不是其名称作为序列化结果**，例如，Language的_description_。

接下来，让我们看看如何使用不同的序列化库来实现它。

## 3. 使用Jackson库

**Jackson的_@JsonValue_注解允许我们使用注解属性的值作为结果JSON中的序列化输出。**

所以，让我们在_description_属性上放置_@JsonValue_：

```kotlin
enum class Language(@JsonValue val description: String) {
    KOTLIN("Kotlin_is_awesome"),
    JAVA("Java_is_great"),
    GO("Go_is_nice")
}

data class Dev ...
```

接下来，让我们创建一个测试来验证序列化的结果：

```kotlin
val mapper = ObjectMapper().registerModule(KotlinModule.Builder().build())
val dev = Dev("Kai", Language.KOTLIN)
val json = mapper.writeValueAsString(dev)
assertEquals("""{"name":"Kai","language":"Kotlin_is_awesome"}""", json)
```

正如测试所示，_@JsonValue_注解解决了问题。

## 4. 使用Gson库

Gson是另一个流行的JSON库。有两种方法可以用来自定义Gson序列化枚举的方式：使用_@SerializedName_注解和创建自定义序列化器。

接下来，让我们更详细地看看这些方法。

### 4.1. 使用_@SerializedName_注解

Gson的_@SerializedName_允许我们在序列化JSON中使用提供的名称来标注注解成员。

因此，**我们可以在枚举的每个实例上标注_@SerializedName，并使用相应的属性值作为名称**：

```kotlin
enum class Language(val description: String) {
    @SerializedName("Kotlin_is_awesome")
    KOTLIN("Kotlin_is_awesome"),

    @SerializedName("Java_is_great")
    JAVA("Java_is_great"),

    @SerializedName("Go_is_nice")
    GO("Go_is_nice")
}

data class Dev ...
```

与Jackson的_@JsonValue_不同，Gson的_@SerializedName_不能动态获取属性的值作为名称。因此，正如枚举代码所示，**我们必须将属性值复制到每个_@SerializedName_注解中**。

现在，如果我们使用Gson序列化一个_Dev_对象，Language.description的值将出现在JSON中，表示引用的_Language_对象：

```kotlin
val dev = Dev("Kai", Language.GO)
val json = Gson().toJson(dev)
assertEquals("""{"name":"Kai","language":"Go_is_nice"}""", json)
```

正如测试所示，_@SerializedName_解决了问题。但值得注意的是，我们必须手动将注解添加到每个枚举实例并复制相应的值。当一个枚举包含许多实例时，这些操作可能会出错。

为了避免这些手动步骤，我们可以创建一个自定义序列化器。

让我们接下来看看如何做到这一点。

### 4.2. 创建自定义序列化器

**要使用Gson创建自定义序列化器，我们可以继承_JsonSerializer_类并实现_serialize()_函数**：

```kotlin
class LanguageSerializer : JsonSerializer``<Language>`` {
    override fun serialize(src: Language?, typeOfSrc: Type?, context: JsonSerializationContext?): JsonElement {
        return JsonPrimitive(requireNotNull(src).description)
    }
}
```

由于_Language.description_是_String_，我们可以使用_JsonPrimitive()_函数将_Language.description_的值包装为_JsonElement_。

如果我们通过自定义序列化器进行序列化，我们可以**保持枚举和数据类原样**：

```kotlin
enum class Language(val description: String) {
    KOTLIN("Kotlin_is_awesome"),
    JAVA("Java_is_great"),
    GO("Go_is_nice")
}

data class Dev ...
```

现在，让我们告诉Gson使用我们的_LanguageSerializer_并序列化一个_Dev_对象：

```kotlin
val gson = GsonBuilder().registerTypeAdapter(Language::class.java, LanguageSerializer()).create()
val dev = Dev("Kai", Language.GO)
val json = gson.toJson(dev)
assertEquals("""{"name":"Kai","language":"Go_is_nice"}""", json)
```

正如上面的代码所示，**我们通过GsonBuilder()创建了一个_Gson_对象，注册了一个_LanguageSerializer_对象作为_TypeAdapter_**，并使用这个_Gson_对象来序列化_dev_实例。

## 5. 使用kotlinx.serialization

由于kotlinx.serialization是一个Kotlin原生且易于使用的序列化库，它在Kotlin项目中被广泛使用。这个库也提供了两种解决方案来解决我们的问题：使用_@SerialName_注解和创建自定义序列化器。

接下来，让我们更详细地看看它们。

### 5.1. 使用_@SerialName_注解

像Gson的_@SerializedName_注解一样，**kotlinx.serialization的_@SerialName_允许我们覆盖序列化JSON中类或属性的名称。**

它的用法也与Gson的_@SerializedName_非常相似。例如，**如果我们想在序列化JSON中使用_Language_的_description_作为名称，我们必须在每个枚举实例上添加_@SerialName_，并设置相应的_description_值作为名称。** 此外，我们必须在枚举和数据类上添加_@Serializable_：

```kotlin
@Serializable
enum class Language(val description: String) {
    @SerialName("Kotlin_is_awesome")
    KOTLIN("Kotlin_is_awesome"),

    @SerialName("Java_is_great")
    JAVA("Java_is_great"),

    @SerialName("Go_is_nice")
    GO("Go_is_nice")
}

@Serializable
data class Dev ...
```

现在，让我们序列化一个_Dev_对象，看看我们是否能得到预期的JSON：

```kotlin
val dev = Dev("Kai", Language.JAVA)
val json = Json.encodeToString(dev)
assertEquals("""{"name":"Kai","language":"Java_is_great"}""", json)
```

正如测试所示，_@SerialName_解决了问题。

### 5.2. 创建自定义序列化器

或者，**我们可以通过扩展_KSerializer_类来创建自定义序列化器**：

```kotlin
class LanguageSerializer : KSerializer``<Language>`` {
    override val descriptor: SerialDescriptor = PrimitiveSerialDescriptor("Language", PrimitiveKind.STRING)

    override fun deserialize(decoder: Decoder): Language {
        val desc = decoder.decodeString()
        return Language.entries.first { desc == it.description }
    }

    override fun serialize(encoder: Encoder, value: Language) {
        encoder.encodeString(value.description)
    }
}
```

当我们想要使用_LanguageSerializer_进行_Language_序列化时，我们可以**将_LanguageSerializer_添加到_Language_的_@Serializable_注解中**：

```kotlin
@Serializable(with = LanguageSerializer::class)
enum class Language(val description: String) {
    KOTINN("Kotlin_is_awesome"),
    JAVA("Java_is_great"),
    GO("Go_is_nice")
}

@Serializable
data class Dev ...
```

最后，让我们检查序列化一个_Dev_对象时得到的JSON字符串：

```kotlin
val dev = Dev("Kai", Language.JAVA)
val json = Json.encodeToString(dev)
assertEquals("""{"name":"Kai","language":"Java_is_great"}""", json)
```

正如我们所看到的，kotlinx.serialization使用了我们的_LanguageSerializer_来序列化枚举实例，我们得到了预期的结果。

## 6. 结论

在本文中，我们探讨了如何在Kotlin中使用流行的序列化库进行枚举的JSON序列化。有了这些知识，我们可以自信地处理在Kotlin项目中将枚举值转换为JSON。

如常，示例的完整源代码可在GitHub上获取。

[文章链接](https://www.baeldung.com/kotlin/json-enum-serialization)

OK