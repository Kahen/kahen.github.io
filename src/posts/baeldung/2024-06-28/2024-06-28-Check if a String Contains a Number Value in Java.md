---
date: 2024-06-28
category:
  - Java
  - String Manipulation
tag:
  - Java
  - String
  - Number Detection
head:
  - - meta
    - name: keywords
      content: Java, String, Number Detection, Regular Expressions, Apache Commons Lang, Guava, Stream API
---
# 在Java中检查字符串是否包含数字值

在这篇简短的文章中，我们将重点介绍如何在Java中检查一个字符串是否包含数字。

首先，我们将考虑使用JDK的解决方案。然后，我们将展示如何使用如Guava和Apache Commons Lang等外部库来实现相同的目标。

### 2. 问题介绍

我们的主要目标是检查一个字符串是否包含数字。因此，基本思想是创建方法，如果给定的字符串包含数字则返回true，否则返回false。

请注意，我们**假设我们的字符串非空且非null**，以避免重复编写空和null检查的样板代码。

### 3. 使用String类

String类带有一组方便的方法，我们可以使用它们来检查特定字符串是否包含数字。

让我们更仔细地看看这些方法中的每一个。

#### 3.1. String#matches方法

matches()方法通常用于将字符串与正则表达式进行测试。顾名思义，它只是检查字符串是否与给定的正则表达式匹配。

**简而言之，我们所要做的就是定义正确的正则表达式，表示“包含一个数字”**：

```java
static boolean checkUsingMatchesMethod(String input) {
    return input.matches(".*\\d.*");
}

```

通常，我们使用“.*\\d.*”作为正则表达式，表示字符串至少包含一个数字。**或者，我们可将“\\d”替换为“[0-9]”，因为它们描述的是同一件事（数字/数字）**。

现在，让我们创建一个测试用例来单元测试我们的方法：

```java
public class StrContainsNumberUtilsUnitTest {

    private static final String INPUT_WITH_NUMBERS = "We hope 2024 will be great";
    private static final String INPUT_WITHOUT_NUMBERS = "Hello world";

    @Test
    public void givenInputString_whenUsingMatchesMethod_ThenCheck() {
        assertTrue(StrContainsNumberUtils.checkUsingMatchesMethod(INPUT_WITH_NUMBERS));
        assertFalse(StrContainsNumberUtils.checkUsingMatchesMethod(INPUT_WITHOUT_NUMBERS));
        assertFalse(StrContainsNumberUtils.checkUsingMatchesMethod(""));
        assertFalse(StrContainsNumberUtils.checkUsingMatchesMethod(null));
    }

}
```

#### 3.2. String#replaceAll方法

我们还可以使用replaceAll()方法来解决我们的核心问题。**它返回一个字符串，将所有匹配指定正则表达式的字符替换掉**。

这里的基本思想是使用匹配数字的正则表达式来替换特定字符串中的所有数字：

```java
static boolean checkUsingReplaceAllMethod(String input) {
    String result = input.replaceAll("\\d", "");
    return result.length() != input.length(); 
}
```

在这里，我们用空格替换了所有的数字。**因此，如果返回的字符串长度与原始字符串不同，那么输入就包含数字**。

请注意，matches()方法提供了一种更简洁、更直接的方式来解决我们的核心问题，与replaceAll()相比。

现在，让我们添加一个测试用例来确认一切按预期工作：

```java
@Test
public void givenInputString_whenUsingReplaceAllMethod_ThenCheck() {
    assertTrue(StrContainsNumberUtils.checkUsingReplaceAllMethod(INPUT_WITH_NUMBERS));
    assertFalse(StrContainsNumberUtils.checkUsingReplaceAllMethod(INPUT_WITHOUT_NUMBERS));
    assertFalse(StrContainsNumberUtils.checkUsingReplaceAllMethod(""));
    assertFalse(StrContainsNumberUtils.checkUsingReplaceAllMethod(null));
}
```

### 4. 使用Pattern类

同样，我们可以使用Pattern类来实现相同的目标。**这个类提供了一种方便的方式来编译一个正则表达式，并将其与给定的字符串匹配**。

所以，让我们重用我们在前面的例子中已经定义的相同正则表达式：

```java
static boolean checkUsingPatternClass(String input) {
    return Pattern.compile(".*\\d.*")
      .matcher(input)
      .matches();
}
```

简而言之，compile()方法让我们可以从“.*\\d.*”正则表达式创建一个模式。matcher()方法创建了一个Matcher对象，可以将我们的输入与编译的“包含一个数字”正则表达式匹配。

**正如名字所示，matches()方法负责检查我们的输入是否包含一个数字**。

最后，让我们再添加一个测试用例来为我们的方法：

```java
@Test
public void givenInputString_whenUsingPatternClass_ThenCheck() {
    assertTrue(StrContainsNumberUtils.checkUsingPatternClass(INPUT_WITH_NUMBERS));
    assertFalse(StrContainsNumberUtils.checkUsingPatternClass(INPUT_WITHOUT_NUMBERS));
    assertFalse(StrContainsNumberUtils.checkUsingPatternClass(""));
    assertFalse(StrContainsNumberUtils.checkUsingPatternClass(null));
}
```

### 5. 使用Character#isDigit方法

检查字符串是否包含数字的另一种方法是使用Character.isDigit()方法，该方法确定特定字符是否是数字。

我们可以遍历字符串并调用isDigit()来检查当前字符是否表示数字：

```java
static boolean checkUsingIsDigitMethod(String input) {  
   for (char c : input.toCharArray()) {
      if (Character.isDigit(c)) {
         return true;
      }
   }
   
   return false;
}
```

现在，我们将创建一个新的测试用例：

```java
@Test
public void givenInputString_whenUsingIsDigitMethod_ThenCheck() {
    assertTrue(StrContainsNumberUtils.checkUsingIsDigitMethod(INPUT_WITH_NUMBERS));
    assertFalse(StrContainsNumberUtils.checkUsingIsDigitMethod(INPUT_WITHOUT_NUMBERS));
    assertFalse(StrContainsNumberUtils.checkUsingIsDigitMethod(""));
    assertFalse(StrContainsNumberUtils.checkUsingIsDigitMethod(null));
}
```

### 6. 使用Stream API

Stream API提供了一种方便的方式来检查给定字符串是否包含数字。Java 8在String类中引入了一个新的方法chars()。此方法返回一个IntStream，包含给定字符串中字符的代码值。

让我们看看它在实际中的应用：

```java
static boolean checkUsingStreamApi(String input) {
    return input.chars()
      .anyMatch(Character::isDigit);
}
```

**如上所示，我们使用anyMatch()方法来检查是否有任何字符表示数字**。

一如既往，让我们添加另一个测试用例来确认我们的新方法：

```java
@Test
public void givenInputString_whenUsingStreamApi_ThenCheck() {
    assertTrue(StrContainsNumberUtils.checkUsingStreamApi(INPUT_WITH_NUMBERS));
    assertFalse(StrContainsNumberUtils.checkUsingStreamApi(INPUT_WITHOUT_NUMBERS));
    assertFalse(StrContainsNumberUtils.checkUsingStreamApi(""));
    assertFalse(StrContainsNumberUtils.checkUsingStreamApi(null));
}
```

### 7. 使用Apache Commons Lang

此外，我们可以使用Apache Commons Lang库来解决关键问题。但是，我们首先需要将它的依赖项添加到我们的pom.xml中：

```xml
``<dependency>``
    ``<groupId>``org.apache.commons``</groupId>``
    ``<artifactId>``commons-lang3``</artifactId>``
    ``<version>``3.14.0``</version>``
``</dependency>``
```

**这个库提供了StringUtils类，以一种null安全的方式实现字符串操作**。该类带有getDigits()方法，它从特定字符串中提取数字。

让我们看看它在实践中如何使用：

```java
static boolean checkUsingApacheCommonsLang(String input) {
    String result = StringUtils.getDigits(input);
    return result != null && !result.isEmpty();
}
```

如上所示，getDigits()返回一个只包含数字的新字符串。**所以，我们所要做的就是检查我们返回的字符串是否不为空，以确保我们的输入包含数字**。

按照通常的方式，让我们创建一个测试用例：

```java
@Test
public void givenInputString_whenUsingApacheCommonsLang_ThenCheck() {
    assertTrue(StrContainsNumberUtils.checkUsingApacheCommonsLang(INPUT_WITH_NUMBERS));
    assertFalse(StrContainsNumberUtils.checkUsingApacheCommonsLang(INPUT_WITHOUT_NUMBERS));
    assertFalse(StrContainsNumberUtils.checkUsingApacheCommonsLang(""));
    assertFalse(StrContainsNumberUtils.checkUsingApacheCommonsLang(null));
}
```

### 8. 使用Guava

如果我们想要检查给定字符串是否包含数字，Guava库是另一个可以考虑的选项。让我们从将它的依赖项添加到我们的pom.xml开始：

```xml
``<dependency>``
    ``<groupId>``com.google.guava``</groupId>``
    ``<artifactId>``guava``</artifactId>``
    ``<version>``31.0.1-jre``</version>``
``</dependency>``
```

接下来，让我们看看使用Guava库的快速示例：

```java
static boolean checkUsingGuava(String input) {
    String result = CharMatcher.forPredicate(Character::isDigit)
      .retainFrom(input);
    return !result.isEmpty();
}
```

Guava提供了CharMatcher()类来操作字符。**在这里，我们使用forPredicate()方法来过滤只有数字，并使用retainfrom()方法返回它们**。

最后，我们将为我们的方法添加一个新的测试用例：

```java
@Test
public void givenInputString_whenUsingGuava_ThenCheck() {
    assertTrue(StrContainsNumberUtils.checkUsingGuava(INPUT_WITH_NUMBERS));
    assertFalse(StrContainsNumberUtils.checkUsingGuava(INPUT_WITHOUT_NUMBERS));
    assertFalse(StrContainsNumberUtils.checkUsingGuava(""));
    assertFalse(StrContainsNumberUtils.checkUsingGuava(null));
}
```

###