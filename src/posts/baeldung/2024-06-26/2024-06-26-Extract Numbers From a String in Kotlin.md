---
date: 2024-06-26
category:
  - Kotlin
  - 编程
tag:
  - Kotlin
  - 字符串
  - 数字提取
head:
  - - meta
    - name: keywords
      content: Kotlin, 字符串, 数字提取, 正则表达式, for循环
---

# 在Kotlin中从字符串中提取数字

## 1. 引言

在数据分析和处理中，从文本中提取数字信息是一个关键且基本的任务。这对于解析标识符、提取电话号码、解释邮政编码等任务至关重要。

在本教程中，我们将探讨在Kotlin中从字符串中提取数字的不同方法。

## 2. 假设

对于手头的问题，我们将仅关注提取可以转换为_BigInteger_数据类型的十进制正整数。小数和非十进制数字不在提取方法的范围内。

## 3. 使用循环

我们可以使用传统的_for_循环来遍历文本中的每个字符并提取数字。让我们看看实现：

```kotlin
fun extractNumbersUsingLoop(str: String): List`````<BigInteger>````` {
    val numbers = mutableListOf`````<BigInteger>`````()
    val currentNumber = StringBuilder()
    for (char in str) {
        if (char.isDigit()) {
            currentNumber.append(char)
        } else if (currentNumber.isNotEmpty()) {
            numbers.add(currentNumber.toString().toBigInteger())
            currentNumber.clear()
        }
    }
    if (currentNumber.isNotEmpty()) {
        numbers.add(currentNumber.toString().toBigInteger())
    }
    return numbers
}
```

在这种方法中，我们遍历文本中的每个字符。我们使用_StringBuilder_在迭代过程中高效地构建数字子字符串并提取连续的数字。然后，这些提取的数字被追加到我们从方法返回的列表中。**注意我们使用_toBigInteger()_方法将字符串转换为数字，以确保正确处理非常大的数字**。

## 4. 使用正则表达式

正则表达式是查找文本中特定模式的强大工具。我们可以使用正则表达式从字符串中提取数字，而无需手动遍历文本中的每个字符：

```kotlin
fun extractMultipleUsingRegex(str: String): List`````<BigInteger>````` {
    return Regex("\\d+").findAll(str).map { it.value.toBigInteger() }.toList()
}
```

在这里，**我们使用正则表达式_\\d_来匹配字符串中的数字字符**。_apply()_函数应用于_Regex_对象时，识别所有这些数字的实例并生成一系列_MatchResult_对象。通过迭代这个序列并映射元素，我们可以将_String_转换为_BigInteger_的列表。

## 5. 使用_split()_

另一种提取数字的方法是使用带正则表达式的_split()_方法。正则表达式方法使实现比迭代方法更灵活和简洁。

让我们看看实现：

```kotlin
fun extractNumbersUsingSplitAndRegex(str: String): List`````<BigInteger>````` {
    return str.split(Regex("\\D+"))
        .filter { it.isNotBlank() }
        .map { it.toBigInteger() }
}
```

在这种情况下，我们使用正则表达式_\\D+_来分割字符串。**这个正则表达式_\\D_匹配任何非数字字符，而正则表达式_\\d_匹配数字。加号_+_指定我们想要匹配一个或多个随后的数字。**在分割字符串后，我们移除空结果，并将_String_转换为_BigInteger_。

## 6. 测试实现

实现了从字符串中提取数字的不同方法后，让我们编写单元测试以确保实现的正确性。**我们可以利用参数化测试来覆盖各种情况**。

让我们添加依赖项以包含_junit-jupiter-params_库来编写参数化测试：

```xml
`<dependency>`
    `<groupId>`org.junit.jupiter`</groupId>`
    `<artifactId>`junit-jupiter-params`</artifactId>`
    `<version>`5.10.2`</version>`
    `<scope>`test`</scope>`
`</dependency>`
```

为了简洁，我们将在本文中仅展示一个实现的测试：

```kotlin
@ParameterizedTest
@CsvSource(
    "string with 123 and 333 in the text, 123:333",
    "another string with 456 and 789, 456:789",
    "string 123-234, 123:234",
    "no numbers,",
    "3 4 50 numbers6, 3",
    "91234567891011121314151617181920number, 91234567891011121314151617181920",
    "123456789large numbers0, 123456789"
)
fun `extract all occurrences of numbers from string using regex`(str: String, expected: String?) {
    val numbers = extractMultipleUsingRegex(str)
    val expectedList = expected?.split(":")?.map { it.toBigInteger() } ?: emptyList()
    Assertions.assertEquals(expectedList, numbers)
}
```

**在这里，我们使用_@CsvSource_注解和自定义分隔符_:_来定义每个案例的不同数据**。在测试中，我们分割这个字符串并将其与方法的结果进行比较。测试套件涵盖了各种场景，包括包含非常大数字的字符串、数字和字符的混合、特殊字符等。

同样，我们也可以为其他实现编写测试。

此外，当在_@CsvSource_中定义测试数据变得笨拙时，由于它处理数据的方式，选择传统的单元测试提供了一个简单的解决方案。例如，让我们编写**一个简单的单元测试来检查空字符串场景**：

```kotlin
@Test
fun `check empty string scenario for split`() {
    val numbers = extractNumbersUsingSplitAndRegex("")
    Assertions.assertIterableEquals(numbers, listOf`````<BigInteger>`````())
}
```

## 7. 结论

在本文中，我们探讨了在Kotlin中从字符串中提取数字的不同方法，包括正则表达式和_for_循环。此外，我们强调了测试的重要性，利用参数化测试和单独的测试用例来彻底验证实现。

如往常一样，本文中使用的示例代码可在GitHub上找到。

OK