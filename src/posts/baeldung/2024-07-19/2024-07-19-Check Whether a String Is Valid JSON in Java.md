---
date: 2024-07-19
category:
  - Java
  - JSON
tag:
  - JSON验证
  - Java
head:
  - - meta
    - name: keywords
      content: Java, JSON, 验证, Gson, Jackson, JSON API
---
# 在Java中检查字符串是否为有效的JSON

当在Java中使用原始JSON值时，有时需要检查它是否有效。有几个库可以帮助我们完成这项工作：Gson、JSON API和Jackson。每个工具都有其自身的优势和限制。

在本教程中，我们将使用它们中的每一个来实现JSON字符串验证，并仔细查看方法之间的主要差异以及实际示例。

## 2. 使用JSON API进行验证

最轻量级和简单的库是JSON API。

检查一个字符串是否为有效JSON的通用方法是异常处理。因此，我们委托JSON解析并在出现不正确的值时处理特定类型的错误，或者假设如果没有异常发生，则值是正确的。

### 2.1. **Maven依赖**

首先，我们需要在我们的_pom.xml_中包含_json_依赖：

```xml
```<dependency>```
    ```<groupId>```org.json```</groupId>```
    ```<artifactId>```json```</artifactId>```
    ```<version>```20211205```</version>```
```</dependency>```
```

### 2.2. **使用_JSONObject_进行验证**

首先，为了检查字符串是否为JSON，我们将尝试创建一个_JSONObject_。进一步地，在非有效值的情况下，我们将得到一个_JSONException_：

```java
public boolean isValid(String json) {
    try {
        new JSONObject(json);
    } catch (JSONException e) {
        return false;
    }
    return true;
}
```

让我们用一个简单的例子来试试：

```java
String json = "{\"email\": \"example@com\", \"name\": \"John\"}";
assertTrue(validator.isValid(json));
```

```java
String json = "Invalid_Json";
assertFalse(validator.isValid(json));
```

然而，这种方法的缺点是字符串只能是对象而不能是使用_JSONObject_的数组。

例如，让我们看看它如何处理数组：

```java
String json = "[{\"email\": \"example@com\", \"name\": \"John\"}]";
assertFalse(validator.isValid(json));
```

### 2.3. **使用_JSONArray_进行验证**

为了验证无论字符串是对象还是数组，我们需要在_JSONObject_创建失败时添加一个额外的条件。类似地，如果字符串不适合JSON数组，_JSONArray_也会抛出一个_JSONException_：

```java
public boolean isValid(String json) {
    try {
        new JSONObject(json);
    } catch (JSONException e) {
        try {
            new JSONArray(json);
        } catch (JSONException ne) {
            return false;
        }
    }
    return true;
}
```

结果，我们可以验证任何值：

```java
String json = "[{\"email\": \"example@com\", \"name\": \"John\"}]";
assertTrue(validator.isValid(json));
```

## 3. 使用Jackson进行验证

类似地，Jackson库提供了基于_异常_处理的JSON验证方式。它是一个更复杂的工具，具有许多类型的解析策略。然而，它更容易使用。

### 3.1. **Maven依赖**

让我们添加_jackson-databind_ Maven依赖：

```xml
```<dependency>```
    ```<groupId>```com.fasterxml.jackson.core```</groupId>```
    ```<artifactId>```jackson-databind```</artifactId>```
    ```<version>```2.13.0```</version>```
```</dependency>```
```

### 3.2. **使用_ObjectMapper_进行验证**

我们使用_readTree()_方法读取整个JSON并在语法不正确时得到一个_JacksonException_。

换句话说，我们不需要提供额外的检查。它适用于对象和数组：

```java
ObjectMapper mapper = new ObjectMapper()
  .enable(DeserializationFeature.FAIL_ON_TRAILING_TOKENS)
  .build()

public boolean isValid(String json) {
    try {
        mapper.readTree(json);
    } catch (JacksonException e) {
        return false;
    }
    return true;
}
```

让我们看看如何用示例使用这个：

```java
String json = "{\"email\": \"example@com\", \"name\": \"John\"}";
assertTrue(validator.isValid(json));

String json = "[{\"email\": \"example@com\", \"name\": \"John\"}]";
assertTrue(validator.isValid(json));

String json = "Invalid_Json";
assertFalse(validator.isValid(json));
```

注意，我们还启用了FAIL_ON_TRAILING_TOKENS选项，以确保如果有效JSON之后有任何文本（除了空格），验证将失败。

如果不使用此选项，形式为_{“email”:”example@com”}text_的JSON仍然会被视为有效，即使它不是。

## 4. 使用Gson进行验证

Gson是另一个常见的库，允许我们使用相同的方法验证原始JSON值。它是一个复杂的工具，用于Java对象映射和不同类型的JSON处理。

### 4.1. **Maven依赖**

让我们添加_gson_ Maven依赖：

```xml
```<dependency>```
    ```<groupId>```com.google.code.gson```</groupId>```
    ```<artifactId>```gson```</artifactId>```
    ```<version>```2.11.0```</version>```
```</dependency>```
```

### 4.2. 非严格**验证**

Gson提供了_JsonParser_来读取指定的JSON到_JsonElement_的树中。因此，如果读取时出现错误，它保证我们会得到_JsonSyntaxException_。

因此，我们可以使用_parse()_方法计算_String_并在JSON值格式错误时处理_Exception_：

```java
public boolean isValid(String json) {
    try {
        JsonParser.parseString(json);
    } catch (JsonSyntaxException e) {
        return false;
    }
    return true;
}
```

让我们编写一些测试来检查主要情况：

```java
String json = "{\"email\": \"example@com\", \"name\": \"John\"}";
assertTrue(validator.isValid(json));

String json = "[{\"email\": \"example@com\", \"name\": \"John\"}]";
assertTrue(validator.isValid(json));
```

**这种方法的主要区别是Gson的默认策略认为单独的字符串和数值值作为_JsonElement_节点的一部分是有效的。换句话说，它认为一个单独的字符串或数字与JSON对象一样有效。**

例如，让我们看看它如何处理一个单独的字符串：

```java
String json = "Invalid_Json";
assertTrue(validator.isValid(json));
```

然而，如果我们想将这样的值视为格式错误，我们需要在我们的_JsonParser_上执行严格的类型策略。

### 4.3. 严格**验证**

要实现严格的类型策略，我们创建一个_TypeAdapter_并定义_JsonElement_类作为必需的类型匹配。结果，如果类型不是JSON对象或数组，_JsonParser_将抛出_JsonSyntaxException_。

我们可以调用_fromJson()_方法使用特定的_TypeAdapter_读取原始JSON：

```java
final TypeAdapter`<JsonElement>` strictAdapter = new Gson().getAdapter(JsonElement.class);

public boolean isValid(String json) {
    try {
        strictAdapter.fromJson(json);
    } catch (JsonSyntaxException | IOException e) {
        return false;
    }
    return true;
}
```

最后，我们可以检查JSON是否有效：

```java
String json = "Invalid_Json";
assertFalse(validator.isValid(json));
```

## 5. 结论

在本文中，我们看到了检查一个_String_是否为有效JSON的不同方式。

每种方法都有其优势和限制。**虽然JSON API可以用于简单的对象验证，Gson可以更可扩展地用于JSON对象中的原始值验证。然而，Jackson更易于使用。因此，我们应该使用最适合的那一个。**

此外，我们还应该检查是否已经有库在使用中，或者是否适用于其他目标。

如常，示例的源代码可以在GitHub上找到。