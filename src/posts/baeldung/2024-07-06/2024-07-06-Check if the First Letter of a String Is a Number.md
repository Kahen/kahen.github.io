---
date: 2024-07-06
category:
  - Java
  - 字符串处理
tag:
  - Java
  - 正则表达式
  - Guava
head:
  - - meta
    - name: keywords
      content: Java, 字符串, 数字, 正则表达式, Guava
---
# 检查字符串首字符是否为数字 | Baeldung

在本简短教程中，我们将学习如何在Java中检查字符串的第一个字符是否为数字。

我们将首先探索使用JDK本身的方法。然后，我们将看到如何使用第三方库，如Guava，来实现相同的目标。

### 使用JDK

Java提供了多种方便的方法来检查字符串是否以数字开头。让我们仔细看看每个选项。

#### 使用charAt()

实现我们目标的最简单方法是使用charAt()方法。

首先，我们将使用charAt(0)返回第一个字符：

```java
static boolean checkUsingCharAtMethod(String str) {
    if (str == null || str.length() == 0) {
        return false;
    }

    char c = str.charAt(0);
    return c >= '0' && c `<= '9';
}
```

在上面的例子中，如果指定的字符串为null或其长度为零，我们返回false。否则，我们获取第一个字符并检查它是否为数字。

接下来，让我们使用一个测试用例来确认：

```java
@Test
void givenString_whenUsingCharAtMethod_thenSuccess() {
    assertTrue(FirstCharDigit.checkUsingCharAtMethod("12 years"));
    assertFalse(FirstCharDigit.checkUsingCharAtMethod("years"));
    assertFalse(FirstCharDigit.checkUsingCharAtMethod(""));
    assertFalse(FirstCharDigit.checkUsingCharAtMethod(null));
}
```

#### 使用Character.isDigit()

Character类提供了一个方便的方法叫做isDigit()。顾名思义，它确定指定的字符是否为数字。

让我们看看它的实际应用：

```java
static boolean checkUsingIsDigitMethod(String str) {
    return Character.isDigit(str.charAt(0));
}
```

正如我们在上面看到的，我们使用charAt(0)获取第一个字符。然后，我们将返回的值传递给isDigit()方法。

现在，让我们使用一个测试用例来测试它：

```java
@Test
void givenString_whenUsingIsDigitMethod_thenSuccess() {
    assertTrue(FirstCharDigit.checkUsingIsDigitMethod("10 cm"));
    assertFalse(FirstCharDigit.checkUsingIsDigitMethod("cm"));
    assertFalse(FirstCharDigit.checkUsingIsDigitMethod(""));
    assertFalse(FirstCharDigit.checkUsingIsDigitMethod(null));
}
```

#### 使用Pattern类

或者，我们可以使用Pattern类来编译一个正则表达式，检查给定的字符串是否以数字开头。

通常，我们可以使用正则表达式"^[0-9]"或"^\\d"来匹配以数字开头的字符串。

接下来，让我们看看如何使用Pattern来编译我们的正则表达式与给定的字符串：

```java
static boolean checkUsingPatternClass(String str) {
    return Pattern.compile("^[0-9].*")
      .matcher(str)
      .matches();
}
```

正如我们所看到的，compile()返回一个Matcher，它提供了matches()方法。

这个解决方案也运行得很好，如单元测试所示：

```java
@Test
void givenString_whenUsingPatternClass_thenSuccess() {
    assertTrue(FirstCharDigit.checkUsingPatternClass("1 kg"));
    assertFalse(FirstCharDigit.checkUsingPatternClass("kg"));
    assertFalse(FirstCharDigit.checkUsingPatternClass(""));
    assertFalse(FirstCharDigit.checkUsingPatternClass(null));
}
```

#### 使用matches()

检查字符串是否以数字开头的另一种方法是使用matches()方法。它接受一个正则表达式作为参数。

所以，让我们重用我们在前面的例子中指定的相同正则表达式：

```java
static boolean checkUsingMatchesMethod(String str) {
    return str.matches("^[0-9].*");
}
```

现在让我们添加另一个测试用例来验证我们的方法按预期工作：

```java
@Test
void givenString_whenUsingMatchesMethod_thenSuccess() {
    assertTrue(FirstCharDigit.checkUsingMatchesMethod("123"));
    assertFalse(FirstCharDigit.checkUsingMatchesMethod("ABC"));
    assertFalse(FirstCharDigit.checkUsingMatchesMethod(""));
    assertFalse(FirstCharDigit.checkUsingMatchesMethod(null));
}
```

### 使用Guava

同样，我们可以使用Guava库来实现相同的目标。首先，我们需要将Guava依赖项添加到pom.xml文件中：

```xml
<dependency>`
    `<groupId>`com.google.guava`</groupId>`
    `<artifactId>`guava`</artifactId>`
    `<version>`31.0.1-jre`</version>`
`</dependency>`
```

Guava提供了一组用于字符串和字符操作的现成的实用类。在这些类中，我们找到了CharMatcher类。

#### 使用CharMatcher.inRange()

CharMatcher实用类带有一个名为inRange()的静态方法，它匹配给定范围内的任何字符。

这里的主要思想是定义一个只表示数字的范围。

现在，让我们举例说明CharMatcher.inRange()的使用：

```java
static boolean checkUsingCharMatcherInRangeMethod(String str) {
    return CharMatcher.inRange('0', '9')
      .matches(str.charAt(0));
}
```

值得注意的是，这里的两个端点'0'和'9'都是包含在内的。

像往常一样，让我们创建一个测试用例来测试我们的方法：

```java
@Test
void givenString_whenUsingCharMatcherInRangeMethod_thenSuccess() {
    assertTrue(FirstCharDigit.checkUsingCharMatcherInRangeMethod("2023"));
    assertFalse(FirstCharDigit.checkUsingCharMatcherInRangeMethod("abc"));
    assertFalse(FirstCharDigit.checkUsingCharMatcherInRangeMethod(""));
    assertFalse(FirstCharDigit.checkUsingCharMatcherInRangeMethod(null));
}
```

#### 使用CharMatcher.forPredicate()

或者，我们可以使用CharMatcher.forPredicate()来指示给定的字符是否为数字。所以，让我们在实践中看到它：

```java
static boolean checkUsingCharMatcherForPredicateMethod(String str) {
    return CharMatcher.forPredicate(Character::isDigit)
      .matches(str.charAt(0));
}
```

简而言之，我们在给定字符串的第一个字符上应用了谓词Character::isDigit。

现在，让我们使用一个测试用例来确认一切正常工作：

```java
@Test
void givenString_whenUsingCharMatcherForPredicateMethod_thenSuccess() {
    assertTrue(FirstCharDigit.checkUsingCharMatcherForPredicateMethod("100"));
    assertFalse(FirstCharDigit.checkUsingCharMatcherForPredicateMethod("abdo"));
    assertFalse(FirstCharDigit.checkUsingCharMatcherForPredicateMethod(""));
    assertFalse(FirstCharDigit.checkUsingCharMatcherForPredicateMethod(null));
}
```

### 结论

在这篇短文中，我们学习了多种检查给定字符串的第一个字符是否为数字的方法。

我们查看了一些使用JDK方法的方法。然后我们讨论了如何使用Guava实现相同的目标。

一如既往，示例的完整源代码可在GitHub上找到。