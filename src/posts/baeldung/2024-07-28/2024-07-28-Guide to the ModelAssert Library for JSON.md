---
date: 2024-07-29
category:
  - Testing
  - JSON
tag:
  - ModelAssert
  - JSON Testing
  - AssertJ
  - Jackson
head:
  - - meta
    - name: keywords
      content: JSON, ModelAssert, Testing, AssertJ, Jackson
------
# ModelAssert 库指南：用于 JSON

## 1. 概述

在编写使用 JSON 的软件的自动化测试时，我们经常需要将 JSON 数据与某个预期值进行比较。

在某些情况下，我们可以将实际和预期的 JSON 作为字符串进行字符串比较，但这种方法有很多限制。

在本教程中，我们将探讨如何使用 ModelAssert 编写断言并比较 JSON 值。我们将看到如何在 JSON 文档中的单个值上构建断言以及如何比较文档。我们还将涵盖如何处理无法预测确切值的字段，例如日期或 GUID。

## 2. 入门

ModelAssert 是一个数据断言库，语法类似于 AssertJ，并具有与 JSONAssert 相似的功能。它基于 Jackson 进行 JSON 解析，并使用 JSON Pointer 表达式来描述文档中字段的路径。

让我们从为以下 JSON 编写一些简单的断言开始：

```json
{
   "name": "Baeldung",
   "isOnline": true,
   "topics": [ "Java", "Spring", "Kotlin", "Scala", "Linux" ]
}
```

### 2.1. 依赖

首先，让我们将 ModelAssert 添加到我们的 _pom.xml_：

```xml
`<dependency>`
    `<groupId>`uk.org.webcompere`</groupId>`
    `<artifactId>`model-assert`</artifactId>`
    `<version>`1.0.0`</version>`
    `<scope>`test`</scope>`
`</dependency>`
```

### 2.2. 断言 JSON 对象中的字段

假设示例 JSON 已作为 _String_ 返回给我们，我们希望检查 _name_ 字段是否等于 _Baeldung_：

```java
assertJson(jsonString)
  .at("/name").isText("Baeldung");
```

_assertJson_ 方法将从各种来源读取 JSON，包括 _String_、_File_、_Path_ 和 Jackson 的 _JsonNode_。返回的对象是一个断言，我们可以在其上使用流畅的 DSL（领域特定语言）来添加条件。

_at_ 方法描述了我们希望进行字段断言的文档中的位置。然后，_isText_ 指定我们期望一个文本节点，其值为 _Baeldung_。

我们可以通过使用稍长的 JSON Pointer 表达式来断言 _topics_ 数组中的路径：

```java
assertJson(jsonString)
  .at("/topics/1").isText("Spring");
```

虽然我们可以逐个编写字段断言，**我们也可以将它们组合成一个单一的断言**：

```java
assertJson(jsonString)
  .at("/name").isText("Baeldung")
  .at("/topics/1").isText("Spring");
```

### 2.3. 为什么字符串比较不起作用

通常我们希望将整个 JSON 文档与另一个文档进行比较。虽然在某些情况下字符串比较是可能的，但往往会因为不相关的 JSON 格式问题而 **陷入困境**：

```java
String expected = loadFile(EXPECTED_JSON_PATH);
assertThat(jsonString)
  .isEqualTo(expected);
```

这种失败消息很常见：

```java
org.opentest4j.AssertionFailedError:
expected: "{\n    \"name\": \"Baeldung\",\n    \"isOnline\": true,\n    \"topics\": [ \"Java\", \"Spring\", \"Kotlin\", \"Scala\", \"Linux\" ]\n}"
but was : "{\"name\": \"Baeldung\",\"isOnline\": true,\"topics\": [ \"Java\", \"Spring\", \"Kotlin\", \"Scala\", \"Linux\" ]}"
```

### 2.4. 语义上比较树

**要进行整个文档的比较，我们可以使用 _isEqualTo_**：

```java
assertJson(jsonString)
  .isEqualTo(EXPECTED_JSON_PATH);
```

在这种情况下，实际 JSON 的字符串由 _assertJson_ 加载，预期的 JSON 文档 - 由 _Path_ 描述的文件 - 在 _isEqualTo_ 内部加载。比较是基于数据进行的。

### 2.5. 不同格式

ModelAssert 还支持可以由 Jackson 转换为 _JsonNode_ 的 Java 对象，以及 _yaml_ 格式。

```java
Map`<String, String>` map = new HashMap<>();
map.put("name", "baeldung");

assertJson(map)
  .isEqualToYaml("name: baeldung");
```

对于 _yaml_ 处理，使用 _isEqualToYaml_ 方法来指示字符串或文件的格式。如果源是 _yaml_，则需要使用 _assertYaml_：

```java
assertYaml("name: baeldung")
  .isEqualTo(map);
```

## 3. 字段断言

到目前为止，我们已经看到了一些基本的断言。让我们看看更多的 DSL。

### 3.1. 在任何节点断言

ModelAssert 的 DSL 允许几乎可以在树的任何节点上添加可能的条件。这是因为 JSON 树在任何级别都可能包含任何类型的节点。

让我们看看我们可能会在示例 JSON 的根节点上添加的一些断言：

```java
assertJson(jsonString)
  .isNotNull()
  .isNotNumber()
  .isObject()
  .containsKey("name");
```

由于断言对象在其接口上提供了这些方法，我们的 IDE 会在我们按下 _“.”_ 键时立即建议我们可以添加的各种断言。

在大多数情况下，我们使用 JSON Pointer 表达式从根节点开始，以便对树中较低级别的节点进行断言：

```java
assertJson(jsonString)
  .at("/topics").hasSize(5);
```

这个断言使用 _hasSize_ 来检查 _topic_ 字段中的数组有五个元素。_hasSize_ 方法适用于对象、数组和字符串。对象的大小是其键的数量，字符串的大小是其字符数，数组的大小是其元素数量。

我们对字段进行的大多数断言都取决于字段的确切类型。我们可以使用方法 _number_、_array_、_text_、_booleanNode_ 和 _object_ 来进入更具体的断言子集，当我们试图对特定类型的字段编写断言时。这是可选的，但可以更有表现力：

```java
assertJson(jsonString)
  .at("/isOnline").booleanNode().isTrue();
```

当我们在 IDE 中按下 _booleanNode_ 后的 _“.”_ 键时，我们只会看到布尔节点的自动完成选项。

### 3.2. 文本节点

当我们断言文本节点时，我们可以使用 _isText_ 进行精确值比较。或者，我们可以使用 _textContains_ 来断言一个子字符串：

```java
assertJson(jsonString)
  .at("/name").textContains("ael");
```

我们还可以通过对 __matches_ 的使用来使用正则表达式：

```java
assertJson(jsonString)
  .at("/name").matches("[A-Z].+");
```

这个例子断言 _name_ 以大写字母开头。

### 3.3. 数字节点

对于数字节点，DSL 提供了一些有用的数字比较：

```java
assertJson("{count: 12}")
  .at("/count").isBetween(1, 25);
```

我们还可以指定我们期望的 Java 数字类型：

```java
assertJson("{height: 6.3}")
  .at("/height").isGreaterThanDouble(6.0);
```

_isEqualTo_ 方法保留用于整个树匹配，因此对于比较数字等式，我们使用 _isNumberEqualTo_：

```java
assertJson("{height: 6.3}")
  .at("/height").isNumberEqualTo(6.3);
```

### 3.4. 数组节点

我们可以使用 _isArrayContaining_ 来测试数组的内容：

```java
assertJson(jsonString)
  .at("/topics").isArrayContaining("Scala", "Spring");
```

这测试了给定值的存在，并允许实际数组包含其他项目。如果我们希望断言更精确的匹配，我们可以使用 _isArrayContainingExactlyInAnyOrder_：

```java
assertJson(jsonString)
   .at("/topics")
   .isArrayContainingExactlyInAnyOrder("Scala", "Spring", "Java", "Linux", "Kotlin");
```

我们还可以使其要求确切的顺序：

```java
assertJson(ACTUAL_JSON)
  .at("/topics")
  .isArrayContainingExactly("Java", "Spring", "Kotlin", "Scala", "Linux");
```

这是一种在数组包含原始值时断言数组内容的好技术。如果数组包含对象，我们可能希望使用 _isEqualTo_ 代替。

## 4. 整棵树匹配

虽然我们可以使用多个特定于字段的条件构建断言来检查 JSON 文档中的内容，但我们经常需要将整个文档与另一个文档进行比较。

_isEqualTo_ 方法（或 _isNotEqualTo_）用于比较整棵树。这可以与 _at_ 结合使用，以便在进行比较之前移动到实际的子树：

```java
assertJson(jsonString)
  .at("/topics")
  .isEqualTo("[ \"Java\", \"Spring\", \"Kotlin\", \"Scala\", \"Linux\" ]");
```

当 JSON 包含数据时，整棵树比较可能会遇到问题，这些数据要么：

- 相同，但顺序不同
- 包含一些无法预测的值

_where_ 方法用于自定义下一次 _isEqualTo_ 操作，以解决这些问题。

### 4.1. 添加键顺序约束

让我们看两个看起来相同的 JSON 文档：

```java
String actualJson = "{a:{d:3, c:2, b:1}}";
String expectedJson = "{a:{b:1, c:2, d:3}}";
```

我们应该注意，这不是严格的 JSON 格式。**ModelAssert 允许我们使用 JSON 的 JavaScript 表示法**，以及通常引用字段名称的线路格式。

这两个文档在 _“a”_ 下面有完全相同的键，但它们的顺序不同。对这些文档的断言将会失败，因为 **ModelAssert 默认使用严格的键顺序**。

我们可以通过添加 _where_ 配置来放宽键顺序规则：

```java
assertJson(actualJson)
  .where().keysInAnyOrder()
  .isEqualTo(expectedJson);
```

这允许树中的任何对象具有与预期文档不同的键顺序，并且仍然匹配。

我们可以将此规则限制到特定路径：

```java
assertJson(actualJson)
  .where()
    .at("/a").keysInAnyOrder()
  .isEqualTo(expectedJson);
```

这将 _keysInAnyOrder_ 限制为仅根对象中的 _“a”_ 字段。

**自定义比较规则的能力使我们能够处理许多场景**，其中无法完全控制或预测生成的确切文档。

### 4.2. 放宽数组约束

如果我们有数组，其中值的顺序可能会变化，那么我们可以放宽整个比较的数组排序约束：

```java
String actualJson = "{a:[1, 2, 3, 4, 5]}";
String expectedJson = "{a:[5, 4, 3, 2, 1]}";

assertJson(actualJson)
  .where().arrayInAnyOrder()
  .isEqualTo(expectedJson);
```

或者，我们可以像我们对 _keysInAnyOrder_ 那样限制该约束。

### 4.3. 忽略路径

也许我们的实际文档包含一些我们不感兴趣或无法预测的字段。我们可以添加一个规则来忽略该路径：

```java
String actualJson = "{user:{name: \"Baeldung\", url:\"http://www.baeldung.com\"}}";
String expectedJson = "{user:{name: \"Baeldung\"}}";

assertJson(actualJson)
  .where()
    .at("/user/url").isIgnored()
  .isEqualTo(expectedJson);
```

我们应该注意到，我们表达的路径 **始终是实际中的 JSON Pointer**。

实际中的额外字段 _“url”_ 现在被忽略了。

### 4.4. 忽略任何 GUID

到目前为止，我们只添加了使用 _at_ 的规则，以便在文档的特定位置自定义比较。

_path_ 语法允许我们使用通配符来描述我们的规则适用的位置。当我们向比较的 _where_ 添加 _at_ 或 _path_ 条件时，**我们也可以提供任何上述字段断言**，以替代与预期文档的并排比较。

假设我们有一个 _id_ 字段，它出现在文档的多个地方，并且是一个我们无法预测的 GUID。

我们可以使用路径规则来忽略这个字段：

```java
String actualJson = "{user:{credentials:[\" + 
  \"{id:\"a7dc2567-3340-4a3b-b1ab-9ce1778f265d\",role:\"Admin\"},\" + 
  \"{id:\"09da84ba-19c2-4674-974f-fd5afff3a0e5\",role:\"Sales\"}]}}";
String expectedJson = "{user:{credentials:\" + 
  \"[{id:\"???\",role:\"Admin\"},\" + 
  \"{id:\"???\",role:\"Sales\"}]}}";

assertJson(actualJson)
  .where()
    .path("user", "credentials", ANY, "id").isIgnored()
  .isEqualTo(expectedJson);
```

在这里，我们的预期值可以有任何 _id_ 字段的值，因为我们简单地忽略了任何 JSON Pointer 以 _“/user/credentials”_ 开始，然后有一个单独的节点（数组索引）并以 _“/id”_ 结束的字段。

### 4.5. 匹配任何 GUID

忽略我们无法预测的字段是一个选项。更好的做法是按类型匹配这些节点，并可能还满足它们必须满足的其他条件。让我们切换到强制这些 GUID 匹配 GUID 的模式，并允许 _id_ 节点出现在树的任何叶节点：

```java
assertJson(actualJson)
  .where()
    .path(ANY_SUBTREE, "id").matches(GUID_PATTERN)
  .isEqualTo(expectedJson);
```

_ANY_SUBTREE_ 通配符匹配路径表达式的部分之间的任意数量的节点。_GUID_PATTERN_ 来自 ModelAssert 的 _Patterns_ 类，其中包含一些常见的正则表达式，用于匹配像数字和日期戳这样的东西。

### 4.6. 自定义 _isEqualTo_

_where_ 与 _path_ 或 _at_ 表达式的组合允许我们在树的任何位置覆盖比较。我们要么添加内置的对象或数组匹配规则，要么指定用于比较的特定替代断言，用于单个或类别的路径。

如果我们有一个在各种比较中重复使用的常见配置，我们可以将其提取到一个方法中：

```java
private static ```<T>``` WhereDsl```<T>``` idsAreGuids(WhereDsl```<T>``` where) {
    return where.path(ANY_SUBTREE, "id").matches(GUID_PATTERN);
}
```

然后，我们可以将该配置添加到特定断言中，使用 _configuredBy_：

```java
assertJson(actualJson)
  .where()
    .configuredBy(where -> idsAreGuids(where))
  .isEqualTo(expectedJson);
```

## 5. 与其他库的兼容性

ModelAssert 为互操作性而构建。到目前为止，我们已经看到了 AssertJ 风格的断言。这些可以有多个条件，并且 **它们将在第一个不满足的条件上失败**。

然而，有时我们需要为其他类型的测试生成匹配器对象。

### 5.1. Hamcrest 匹配器

Hamcrest 是一个由许多工具支持的主要断言助手库。**我们可以使用 ModelAssert 的 DSL 生成 Hamcrest 匹配器**：

```java
Matcher`<String>` matcher = json()
  .at("/name").hasValue("Baeldung");
```

_json_ 方法用于描述一个将接受包含 JSON 数据的 _String_ 的匹配器。我们也可以使用方法 _jsonFile_ 来生成一个期望断言 _File_ 内容的 _Matcher_。ModelAssert 的 _JsonAssertions_ 类包含多个像这样的构建器方法，以开始构建 Hamcrest 匹配器。

表达比较的 DSL 与 _assertJson_ 相同，但比较直到有东西使用匹配器时才会执行。

因此，我们可以使用 ModelAssert 与 Hamcrest 的 _MatcherAssert_：

```java
MatcherAssert.assertThat(jsonString, json()
  .at("/name").hasValue("Baeldung")
  .at("/topics/1").isText("Spring"));
```

### 5.2. 与 Spring Mock MVC 一起使用

在使用 Spring Mock MVC 的响应体验证时，我们可以使用 Spring 内置的 _jsonPath_ 断言。然而，Spring 还允许我们使用 Hamcrest 匹配器来断言作为响应内容返回的字符串。这意味着我们可以使用 ModelAssert 进行复杂的内容断言。

### 5.3. 与 Mockito 一起使用

Mockito 已经与 Hamcrest 互操作。然而，ModelAssert 还提供了一个本地的 _ArgumentMatcher_。这可以用于设置存根的行为以及验证对它们的调用：

```java
public interface DataService {
    boolean isUserLoggedIn(String userDetails);
}

@Mock
private DataService mockDataService;

@Test
void givenUserIsOnline_thenIsLoggedIn() {
    given(mockDataService.isUserLoggedIn(argThat(json()
      .at("/isOnline").isTrue()
      .toArgumentMatcher())))
      .willReturn(true);

    assertThat(mockDataService.isUserLoggedIn(jsonString))
      .isTrue();

    verify(mockDataService)
      .isUserLoggedIn(argThat(json()
        .at("/name").isText("Baeldung")
        .toArgumentMatcher()));
}
```

在这个例子中，Mockito 的 _argThat_ 用于模拟的设置和 _verify_。在其中，我们使用 Hamcrest 风格的构建器为匹配器 - _json_。然后我们向它添加条件，最后使用 _toArgumentMatcher_ 将其转换为 Mockito 的 _ArgumentMatcher_。

## 6. 结论

在本文中，我们探讨了在我们的测试中语义上比较 JSON 的