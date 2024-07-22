---
date: 2022-11-01
category:
  - Kotlin
  - JSON
tag:
  - JSON
  - Kotlinx Serialization
  - Gson
  - Jackson
head:
  - - meta
    - name: keywords
      content: Kotlin, JSON, Kotlinx Serialization, Gson, Jackson, JSON解析
---

# 如何在Kotlin中从JSON字符串提取单个值

JSON（JavaScript对象表示法）为应用程序之间存储和交换数据提供了一种方便的方式。因此，作为开发人员，我们通常需要执行从JSON字符串中提取单个JSON值的任务。

在本教程中，我们将探讨在Kotlin中从JSON字符串提取这些单个值的不同方法。

### 2.1 使用Kotlinx Serialization库

首先，我们可以利用Kotlin的一个扩展库Kotlinx.serialization。这个库提供了一种将Kotlin对象序列化和反序列化到JSON的简便方法。

#### 2.1.1 Maven和Gradle依赖

要使用这个库与Maven，我们需要在_pom.xml_文件中包含它的依赖：

```xml
```<dependency>```
    ```<groupId>```org.jetbrains.kotlinx```</groupId>```
    ```<artifactId>```kotlinx-serialization-json-jvm```</artifactId>```
    ```<version>```1.6.2```</version>```
```</dependency>```
```

对于Gradle，我们添加依赖到_build.gradle_文件：

```groovy
implementation("org.jetbrains.kotlinx:kotlinx-serialization-json-jvm:1.6.2")
```

#### 2.2 实现

包含Kotlinx.serialization依赖后，我们现在可以反序列化JSON字符串以从中获取特定值。

要使用这个库，我们需要使用_Json()_函数获取解析器的实例。**我们将一个配置lambda传递给这个函数，所以我们将_ignoreUnknownKeys_属性设置为_true_，这允许我们忽略在JSON中遇到的任何未知属性。** 虽然在我们的情况下使用_JsonObject_ s不是必需的，但具体类需要设置这个属性，如果JSON对象具有比我们类中更多的属性：

```kotlin
@Test
fun `使用Kotlinx序列化从JSON字符串提取值`() {
    val json = Json { ignoreUnknownKeys = true }
    val jsonString = "{ \"name\":\"John\", \"age\":30, \"city\":\"New York\"}"
    val jsonObject = json.parseToJsonElement(jsonString).jsonObject
    val name = jsonObject["name"]?.jsonPrimitive?.content
    val city = jsonObject["city"]?.jsonPrimitive?.content
    val age = jsonObject["age"]?.jsonPrimitive?.int

    assertEquals("John", name)
    assertEquals("New York", city)
    assertEquals(30, age)
    assertEquals("{\"name\":\"John\",\"age\":30,\"city\":\"New York\"}", jsonObject.toString())
}
```

在上面的代码中，我们使用_parseToJsonElement()_方法将JSON字符串解析为_JsonElement_。**然后我们从_JsonElement_获取_JsonObject_并使用[]（get）操作符获取任何属性的值作为_JsonPrimitive_**。最后，我们使用_JsonPrimitive_的_content_属性获取属性的值作为_String_。

### 3. 使用Gson库

Gson是一个流行的Java库，用于处理JSON。它提供了一种将Java对象序列化和反序列化到JSON的简单方法。

#### 3.1 Maven和Gradle依赖

要在使用Maven的项目中加入这个依赖，我们应该在_pom.xml_中包含它：

```xml
```<dependency>```
    ```<groupId>```com.google.code.gson```</groupId>```
    ```<artifactId>```gson```</artifactId>```
    ```<version>```2.10.1```</version>```
```</dependency>```
```

同样，对于Gradle项目，让我们将依赖添加到_build.gradle_文件：

```groovy
implementation("com.google.code.gson:gson:2.10.1")
```

#### 3.2 实现

让我们深入了解如何使用Gson库来反序列化JSON字符串并获取单独的属性值：

```kotlin
@Test
fun `使用Gson从JSON字符串提取值`() {
    val gson = Gson()
    val jsonString = "{ \"name\":\"John\", \"age\":30, \"city\":\"New York\"}"
    val jsonObject = gson.fromJson(jsonString, JsonObject::class.java)
    val name = jsonObject.get("name").asString
    val city = jsonObject.get("city").asString
    val age = jsonObject.get("age").asInt

    assertEquals("John", name)
    assertEquals("New York", city)
    assertEquals(30, age)
    assertEquals("{\"name\":\"John\",\"age\":30,\"city\":\"New York\"}", jsonObject.toString())
}
```

在上面的例子中，我们首先创建一个_Gson_对象，然后使用它的_fromJson()_方法将JSON字符串反序列化为_JsonObject_。**然后，我们使用_JsonObject_的_get()_方法来获取特定属性的值**。最后，我们使用_asString_或_asInt_属性将值转换为显式类型。

### 4. 使用Jackson库

Jackson库是另一个高性能的Java JSON处理器，当然也可以用于Kotlin。它也提供了将JSON解析为Java对象以及反之的方法。

#### 4.1 Maven和Gradle依赖

要使用Maven中的这个依赖项，让我们将指定的依赖项添加到我们的项目_pom.xml_文件中：

```xml
```<dependency>```
    ```<groupId>```com.fasterxml.jackson.core```</groupId>```
    ```<artifactId>```jackson-module-kotlin```</artifactId>```
    ```<version>```2.16.0```</version>```
```</dependency>```
```

同样，对于Gradle项目，让我们将依赖添加到_build.gradle_文件：

```groovy
implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.16.0")
```

#### 4.2 实现

包含Jackson库后，让我们现在看看如何将JSON属性反序列化为字符串：

```kotlin
@Test
fun `使用Jackson库从JSON字符串提取值`() {
    val objectMapper = jacksonObjectMapper()
    val jsonString = "{ \"name\":\"John\", \"age\":30, \"city\":\"New York\"}"
    val jsonObject = objectMapper.readValue`<JsonNode>`(jsonString)
    val name = jsonObject.get("name").asText()
    val city = jsonObject.get("city").asText()
    val age = jsonObject.get("age").asInt()

    assertEquals("John", name)
    assertEquals("New York", city)
    assertEquals(30, age)
    assertEquals("{\"name\":\"John\",\"age\":30,\"city\":\"New York\"}", jsonObject.toString())
}
```

在上面的代码中，我们使用_jacksonObjectMapper()_函数创建一个_ObjectMapper_实例。随后，我们创建一个JSON字符串，并使用_ObjectMapper_的_readValue()_方法将其转换为_JsonNode_。**最后，我们可以使用_JsonNode_的_get()_方法获取任何特定属性的值**。我们将使用_asText()_将属性转换为_String_，或使用_asInt()_将其转换为_Int_。

### 5. 结论

在本文中，我们讨论了如何在Kotlin中从JSON字符串中获取精确的值。我们探索了三种实现方式，包括_kotlinx.serialization_、_Gson_和_Jackson_。所有这些库在行业中都有广泛的使用，并具有它们各自的优势和劣势。我们需要选择最适合我们需求的库。

正如往常一样，本文中使用的代码示例可以在GitHub上找到。