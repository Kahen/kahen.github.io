---
date: 2022-11-01
category:
  - Kotlin
  - Enums
tag:
  - Kotlin
  - Enum
  - String
head:
  - - meta
    - name: keywords
      content: Kotlin, Enum, String, contains, tutorial
---
# 在Kotlin中检查枚举值是否包含给定字符串

枚举是Kotlin中的一项强大功能，它允许程序员定义一组命名常量。它们通常用于表示一个封闭的值集合，比如一周的天数或一年中的月份。有时，我们可能需要检查某个字符串值是否包含在枚举中。

在本教程中，我们将探讨在Kotlin中检查枚举值是否包含给定字符串的多种方法。

## 2. 枚举类定义

在本教程中，我们将查看各种方法和技术，以检查枚举值是否包含某个字符串。首先，我们定义我们的枚举常量：

```kotlin
enum class DaysOfWeek {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY

    companion object {
        val names by lazy { DaysOfWeek.values().map{ it.name } }
    }
}
```

我们的枚举类包含七个值，代表一周的天数。此外，这个类包含一个伴生对象，它使用_map()_方法为每个枚举常量生成名称。这会创建一个字符串值列表，我们稍后将能够使用。

## 3. 使用for()循环

我们可以通过使用传统的for()循环来检查枚举值是否包含特定的字符串：

```kotlin
fun containsValueUsingForLoop(value: String): Boolean {
    for (day in DaysOfWeek.values()) {
        if (day.name == value) {
            return true
        }
    }
    return false
}
```

**在这种方法中，我们遍历所有的枚举常量，并检查给定的字符串是否匹配任何枚举的_name_**。

始终对代码进行单元测试以确保其按预期工作是一个好主意：

```kotlin
@Test
fun `checks if enum value contains a specific string correctly using for loop`() {
    assertFalse(containsValueUsingForLoop("RED"))
    assertTrue(containsValueUsingForLoop("WEDNESDAY"))
    assertFalse(containsValueUsingForLoop("AUGUST"))
    assertTrue(containsValueUsingForLoop("SATURDAY"))
}
```

在这段代码中，我们使用辅助方法来确定是否任何枚举值包含给定的字符串。使用断言语句，我们断言枚举不包含字符串“RED”和“AUGUST”。然而，我们的枚举确实包含字符串“WEDNESDAY”和“SATURDAY”，正如预期的那样。

## 4. 使用when()表达式

我们同样可以使用when()表达式来检查给定的字符串是否包含在枚举值中：

```kotlin
fun containsValueUsingWhenExpression(value: String): Boolean {
    return when (value) {
        in DaysOfWeek.names -> true
        else -> false
    }
}
```

与前一种技术中的辅助方法不同，**这种方法不执行迭代，而是简单地使用when()表达式来检查给定值是否与任何枚举常量的_name_匹配**。如果有匹配，它返回_true_，否则返回_false_。注意，这是使用了我们从枚举的列表名称中的辅助属性。

让我们也测试一下我们的辅助方法：

```kotlin
@Test
fun `checks if enum value contains a specific string correctly using when expression`() {
    assertFalse(containsValueUsingWhenExpression("RED"))
    assertTrue(containsValueUsingWhenExpression("WEDNESDAY"))
    assertFalse(containsValueUsingWhenExpression("AUGUST"))
    assertTrue(containsValueUsingWhenExpression("SATURDAY"))
}
```

我们的辅助方法正确地报告了给定的字符串是否与任何枚举常量的名称匹配。

## 5. 使用map()方法

正如前面提到的，我们也可以利用map()方法。我们可以使用map()方法生成一个包含我们所有枚举常量的名称的列表，然后看看给定的字符串是否包含在名称列表中：

```kotlin
@Test
fun `checks if enum value contains a specific string correctly using map method`() {
    val names = DaysOfWeek.values().map { it.name }

    assertFalse(names.contains("RED"))
    assertTrue(names.contains("WEDNESDAY"))
    assertFalse(names.contains("AUGUST"))
    assertTrue(names.contains("SATURDAY"))
}
```

map()方法返回了枚举类中所有常量的名称列表。随后，我们使用名称列表上的contains()方法来检查给定的字符串是否存在于其中。如果存在，那么这个表达式的结果将是_true_；否则，将是_false_。

### 5.1. 使用any()方法

**然而，map()方法的方法必须不可避免地对所有枚举常量应用lambda函数**。因此，作为一种优化策略，我们可以使用any()代替。

any()方法接受一个lambda函数，并在lambda函数中的条件对任何数组项成立时返回_true_：

```kotlin
@Test
fun `checks if enum value contains a specific string correctly using any method`() {
    val names = DaysOfWeek.values()
    assertFalse(names.any{ it.name == "RED" })
    assertTrue(names.any{ it.name == "WEDNESDAY" })
    assertFalse(names.any{ it.name == "AUGUST" })
    assertTrue(names.any{ it.name == "SATURDAY" })
}
```

我们使用values()方法来获取所有枚举常量的数组，any()方法检查该数组中的任何枚举常量的名称是否等于给定的值。

**这种方法比map()方法的方法更好，因为它在找到匹配项后就会停止查找**。注意我们没有首先转换_values()_，而是只在_any()_检查中只展开_name_。

## 6. 使用HashSet

最后，**我们还可以通过创建一个包含所有枚举常量名称的_HashSet_来检查枚举值是否包含给定的字符串**：

```kotlin
fun containsValueUsingHashSet(value: String): Boolean {
    val set = HashSet`<String>`()
    DaysOfWeek.values().forEach { set.add(it.name) }
    return set.contains(value)
}
```

这个辅助方法将创建一个_DaysOfWeek_名称的_HashSet_。然后我们可以使用_set_的_contains()_方法来检查给定的值是否包含在其中。

和往常一样，我们也需要测试这个：

```kotlin
@Test
fun `checks if enum value contains a specific string correctly using a hashset`() {
    assertFalse(containsValueUsingHashSet("RED"))
    assertTrue(containsValueUsingHashSet("WEDNESDAY"))
    assertFalse(containsValueUsingHashSet("AUGUST"))
    assertTrue(containsValueUsingHashSet("SATURDAY"))
}
```

在这个测试中，我们可以轻松地断言字符串“WEDNESDAY”和“SATURDAY”与我们的枚举常量中的一个名称匹配。

## 7. 结论

在本文中，我们探讨了在Kotlin中检查枚举值是否包含给定字符串的多种方式。通过拥有多种实现相同结果的方式，我们有灵活性选择最适合我们需求的方法。此外，拥有不同的选项可以帮助我们避免在使用特定方法时可能出现的潜在陷阱和限制。

此外，可用的选项范围使我们能够学习不同的Kotlin语言结构和概念，这可以帮助我们成为更好的程序员。因此，了解检查枚举是否包含字符串的不同方式非常重要，这样我们就可以在编写代码时做出明智的决策。

和往常一样，与本文相关的代码样本和测试用例可以在GitHub上找到。