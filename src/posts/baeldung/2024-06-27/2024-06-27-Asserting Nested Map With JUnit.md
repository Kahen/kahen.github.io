---
date: 2024-06-27
category:
  - Testing & Debugging
tag:
  - JUnit
  - Hamcrest
  - Testing
head:
  - - meta
    - name: keywords
      content: JUnit, Hamcrest, Nested Map, Testing
------
# JUnit中断言嵌套映射的几种方式

在本教程中，我们将介绍一些不同的方法来断言在外部映射中存在一个嵌套映射。我们主要讨论JUnit Jupiter API和Hamcrest API。

## 2. 使用Jupiter API进行断言

本文使用Junit 5，让我们看看Maven依赖项：

```xml
``<dependency>``
    ``<groupId>``org.junit.jupiter``</groupId>``
    ``<artifactId>``junit-jupiter-engine``</artifactId>``
    ``<version>``5.10.2``</version>``
    ``<scope>``test``</scope>``
``</dependency>``
```

以一个具有外部映射和内部映射的Map对象为例。外部映射有一个"address"键，其值为内部映射。它还有一个"name"键，值为"John"：

```json
{
    "name":"John",
    "address":{"city":"Chicago"}
}
```

我们将通过示例来断言内部映射中的键值对的存在。

**让我们从Jupiter API的基本_assertTrue()_方法开始**：

```java
@Test
void givenNestedMap_whenUseJupiterAssertTrueWithCasting_thenTest() {
    Map``````````````<String, Object>`````````````` innerMap = Map.of("city", "Chicago");
    Map``````````````<String, Object>`````````````` outerMap = Map.of("address", innerMap);

    assertTrue(outerMap.containsKey("address")
      && ((Map``````````````<String, Object>``````````````)outerMap.get("address")).get("city").equals("Chicago"));
}
```

我们使用布尔表达式来评估内部映射是否在外部映射中。然后，我们检查内部映射是否有一个"city"键，其值为"Chicago"。

然而，由于上述类型转换的使用，可读性丢失。让我们尝试修复它：

```java
@Test
void givenNestedMap_whenUseJupiterAssertTrueWithoutCasting_thenTest() {
    Map``````````````<String, Object>`````````````` innerMap = Map.of("city", "Chicago");
    Map<String, Map``````````````<String, Object>``````````````> outerMap = Map.of("address", innerMap);

    assertTrue(outerMap.containsKey("address") && outerMap.get("address").get("city").equals("Chicago"));
}
```

现在，我们改变了之前声明外部映射的方式。我们将其声明为_Map<String, Map``````````````<String, Object>``````````````>_而不是_Map``````````````<String, Object>``````````````_。这样，我们避免了类型转换，代码的可读性也有所提高。

但是，如果测试失败，我们将不知道哪个断言失败了。为了解决这个问题，让我们引入_assertAll()_方法：

```java
@Test
void givenNestedMap_whenUseJupiterAssertAllAndAssertTrue_thenTest() {
    Map``````````````<String, Object>`````````````` innerMap = Map.of("city", "Chicago");
    Map<String, Map``````````````<String, Object>``````````````> outerMap = Map.of("address", innerMap);

    assertAll(
      () -> assertTrue(outerMap.containsKey("address")),
      () -> assertEquals(outerMap.get("address").get("city"), "Chicago")
    );
}
```

**我们将布尔表达式移动到了_assertAll()_中的_assertTrue()_和_assertEquals()_方法内。因此，现在我们将知道确切的失败点**。此外，这也提高了代码的可读性。

## 3. 使用Hamcrest API进行断言

Hamcrest库提供了一个非常灵活的框架，通过_Matchers_帮助编写JUnit测试。我们将使用它的现成_Matchers_并使用其框架开发自定义_Matcher_，以验证嵌套映射中键值对的存在。

### 3.1. 使用现有的Matchers

要使用Hamcrest库，我们需要在_pom.xml_文件中更新Maven依赖项：

```xml
``<dependency>``
    ``<groupId>``org.hamcrest``</groupId>``
    ``<artifactId>``hamcrest``</artifactId>``
    ``<version>``2.2``</version>``
    ``<scope>``test``</scope>``
``</dependency>``
```

在我们深入示例之前，让我们首先了解Hamcrest库对测试_Map_的支持。Hamcrest支持以下_Matchers_，可以与_assertThat()_方法一起使用：

- **_hasEntry()_** – 当被检查的_Map_至少包含一个其键等于指定键且其值等于指定值的条目时，创建一个匹配器
- _**hasKey()** –_ 当被检查的_Map_至少包含一个满足指定匹配器的键时，创建一个匹配器
- _**hasValue()** –_ 当被检查的_Map_至少包含一个满足指定值匹配器的值时，创建一个匹配器

让我们以与前一节基本相同的例子开始，但我们将使用_assertThat()_和_hasEntry()_方法：

```java
@Test
void givenNestedMap_whenUseHamcrestAssertThatWithCasting_thenTest() {
    Map``````````````<String, Object>`````````````` innerMap = Map.of("city", "Chicago");
    Map``````````````<String, Object>`````````````` outerMap = Map.of("address", innerMap);

    assertThat((Map``````````````<String, Object>``````````````)outerMap.get("address"), hasEntry("city", "Chicago"));
}
```

除了丑陋的类型转换外，测试的可读性和可追踪性都大大提高了。然而，我们在获取其值之前错过了检查外部映射是否有键_address_。

我们不应该尝试修复上述测试吗？让我们使用_hasKey()_和_hasEntry()_来断言内部映射的存在：

```java
@Test
void givenNestedMap_whenUseHamcrestAssertThat_thenTest() {
    Map``````````````<String, Object>`````````````` innerMap = Map.of("city", "Chicago");
    Map<String, Map``````````````<String, Object>``````````````> outerMap = Map.of("address", innerMap);
    assertAll(
      () -> assertThat(outerMap, hasKey("address")),
      () -> assertThat(outerMap.get("address"), hasEntry("city", "Chicago"))
    );
}
```

有趣的是，**我们结合了Jupiter库的_assertAll()_和Hamcrest库来测试映射**。为了去除类型转换，我们调整了变量_outerMap_的定义。

让我们看看只用Hamcrest库来做同样事情的另一种方式：

```java
@Test
void givenNestedMapOfStringAndObject_whenUseHamcrestAssertThat_thenTest() {
    Map``````````````<String, Object>`````````````` innerMap = Map.of("city", "Chicago");
    Map<String, Map``````````````<String, Object>``````````````> outerMap = Map.of("address", innerMap);

    assertThat(outerMap, hasEntry(equalTo("address"), hasEntry("city", "Chicago")));
}
```

令人惊讶的是，我们可以嵌套_hasEntry()_方法。这是通过使用_equalTo()_方法实现的。如果没有它，方法将编译，但断言将失败。

### 3.2. 使用自定义Matcher

到目前为止，我们尝试了检查嵌套映射存在的方法。让我们尝试通过扩展Hamcrest库中的_TypeSafeMatcher_类来创建自定义Matcher。

```java
public class NestedMapMatcher``<K, V>`` extends TypeSafeMatcher`<Map`<K, Object>``> {
    private K key;
    private V subMapValue;

    public NestedMapMatcher(K key, V subMapValue) {
        this.key = key;
        this.subMapValue = subMapValue;
    }

    @Override
    protected boolean matchesSafely(Map`<K, Object>` item) {
        if (item.containsKey(key)) {
            Object actualValue = item.get(key);
            return subMapValue.equals(actualValue);
        }
        return false;
    }

    @Override
    public void describeTo(Description description) {
        description.appendText("a map containing key ").appendValue(key)
                .appendText(" with value ").appendValue(subMapValue);
    }

    public static ``<K, V>`` Matcher`<V>` hasNestedMapEntry(K key, V expectedValue) {
        return new NestedMapMatcher<>(key, expectedValue);
    }
}
```

我们必须重写_matchSafely()_方法来检查嵌套映射。

让我们看看如何使用它：

```java
@Test
void givenNestedMapOfStringAndObject_whenUseHamcrestAssertThatAndCustomMatcher_thenTest() {
    Map``````````````<String, Object>`````````````` innerMap = Map.of(
        "city", "Chicago",
        "zip", "10005"
    );
    Map<String, Map``````````````<String, Object>``````````````> outerMap = Map.of("address", innerMap);

    assertThat(outerMap, hasNestedMapEntry("address", innerMap));
}
```

显然，在_assertThat()_方法中检查嵌套映射的表达式大大简化了。我们只需要调用_hasNestedMapEntry()_方法来检查_innerMap_。此外，它比较了整个内部映射，而不像之前的检查只检查了一个条目。

**有趣的是，即使我们将外部映射定义为_Map(String, Object)_，自定义_Matcher_也能正常工作。我们不需要进行任何类型转换**：

```java
@Test
void givenOuterMapOfStringAndObjectAndInnerMap_whenUseHamcrestAssertThatAndCustomMatcher_thenTest() {
    Map``````````````<String, Object>`````````````` innerMap = Map.of(
        "city"Chicago",
"zip", "10005"
    );
    Map``````````````<String, Object>`````````````` outerMap = Map.of("address", innerMap);

    assertThat(outerMap, hasNestedMapEntry("address", innerMap));
}
```

## 4. 结论

在本文中，我们讨论了测试内部嵌套映射中键值对存在的不同方式。我们探索了Jupiter以及Hamcrest API。

Hamcrest提供了一些出色的现成方法来支持对嵌套映射的断言。这避免了使用样板代码，因此有助于以更声明性的方式编写测试。尽管如此，我们还是需要编写自定义_Matcher_，以使断言更加直观，并支持对嵌套映射中的多个条目进行断言。

如常，本文中使用的所有代码都可以在GitHub上找到。

OK