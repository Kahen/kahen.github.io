---
date: 2024-06-28
category:
  - Java
  - String Manipulation
tag:
  - Capitalize
  - Java
  - JDK
  - Apache Commons
head:
  - - meta
    - name: keywords
      content: Java, String, Capitalize, Apache Commons, StringUtils, WordUtils
---

# 在Java中将字符串中每个单词的首字母大写

在这篇简短的教程中，我们将展示如何在Java中将特定字符串中每个单词的第一个字符大写。

首先，我们将解释如何使用JDK内置解决方案来实现这一点。然后，我们将演示如何使用如Apache Commons等外部库来达到相同的结果。

### 2. 问题介绍

这里的主要目标是将给定字符串中每个单词的首字母转换为大写。例如，假设我们有一个输入字符串：

```java
String input = "Hi my name is azhrioun";
```

因此，我们期望的输出是每个单词都以大写字符开始：

```java
String output = "Hi My Name Is Azhrioun";
```

**解决问题的基本思想是将输入字符串分割成几个单词**。然后，我们可以使用不同的方法和类来将每个返回的单词的第一个字符大写。

那么，让我们仔细看看每种方法。

### 3. 使用 _Character#toUpperCase_

_toUpperCase()_ 提供了实现我们目标的最简单方式。**正如其名，这个方法将给定的字符转换为大写**。

所以在这里，我们将使用它来转换我们字符串中每个单词的第一个字符：

```java
static String usingCharacterToUpperCaseMethod(String input) {
    if (input == null || input.isEmpty()) {
        return null;
    }

    return Arrays.stream(input.split("\\s+"))
      .map(word -> Character.toUpperCase(word.charAt(0)) + word.substring(1))
      .collect(Collectors.joining(" "));
}
```

正如我们所看到的，我们首先检查我们的字符串是否为_null_或为空，以避免潜在的_NullPointerExcepiton_。**然后，我们使用_split()_方法将我们的输入字符串分成多个单词**。

此外，我们使用_charAt(0)_来获取每个单词的第一个字符。**然后，我们对返回的字符应用_toUpperCase()_**。之后，我们使用_+_运算符和_substring(1)_将大写字符与单词的其余部分连接起来。

最后，我们使用_Collectors#joining_将每个大写单词再次连接成单个字符串。

现在，让我们为我们的方法添加一个测试用例：

```java
@Test
void givenString_whenUsingCharacterToUpperCaseMethod_thenCapitalizeFirstCharacter() {
    String input = "hello baeldung visitors";

    assertEquals("Hello Baeldung Visitors", CapitalizeFirstCharacterEachWordUtils.usingCharacterToUpperCaseMethod(input));
}
```

### 4. 使用 _String#toUpperCase_

_String_ 类提供了自己的_toUpperCase()_方法版本。所以，让我们使用_String#toUpperCase_重写前面的示例：

```java
static String usingStringToUpperCaseMethod(String input) {
    return Arrays.stream(input.split("\\s+"))
      .map(word -> word.substring(0, 1).toUpperCase() + word.substring(1))
      .collect(Collectors.joining(" "));
}
```

**如上所示，我们使用_substring(0, 1)_将每个单词的第一个字符提取为_String_。然后，我调用_toUpperCase()_方法将其转换为大写**。随后，我们使用了与之前相同的机制来连接和连接返回的单词。

让我们为这种方法编写测试：

```java
@Test
void givenString_whenUsingSubstringMethod_thenCapitalizeFirstCharacter() {
    String input = "Hi, my name is azhrioun";

    assertEquals("Hi, My Name Is Azhrioun", CapitalizeFirstCharacterEachWordUtils.usingStringToUpperCaseMethod(input));
}
```

请注意，与_String#toUpperCase_不同，_Character#toUpperCase_是一个静态方法。另一个关键区别是_String#toUpperCase_产生一个新的_String_，而_Character#toUpperCase_返回一个新的_char_原始类型。

### 5. 使用 Apache Commons Lang3 中的 _StringUtils_

另外，我们可以使用Apache Commons Lang3库来解决我们的中心问题。首先，我们需要将它的依赖项添加到我们的_pom.xml_：

```xml
``<dependency>``
    ``<groupId>``org.apache.commons``</groupId>``
    ``<artifactId>``commons-lang3``</artifactId>``
    ``<version>``3.14.0``</version>``
``</dependency>``
```

这个库提供了_StringUtils_类以null安全的方式操作和处理字符串。

那么，让我们看看如何使用这个工具类来大写特定字符串的每个单词：

```java
static String usingStringUtilsClass(String input) {
    return Arrays.stream(input.split("\\s+"))
      .map(StringUtils::capitalize)
      .collect(Collectors.joining(" "));
}
```

**在这里，我们使用了_capitalize()_方法，顾名思义，它将第一个字符转换为大写。给定字符串的其余字符不变**。

最后，让我们使用一个新的测试用例来确认我们的方法：

```java
@Test
void givenString_whenUsingStringUtilsClass_thenCapitalizeFirstCharacter() {
    String input = "life is short the world is wide";

    assertEquals("Life Is Short The World Is Wide", CapitalizeFirstCharacterEachWordUtils.usingStringUtilsClass(input));
}
```

### 6. 使用 Apache Commons Text 中的 _WordUtils_

另一种解决方案是使用Apache Commons Text库。话不多说，让我们将它的依赖项添加到_pom.xml_文件：

```xml
``<dependency>``
    ``<groupId>``org.apache.commons``</groupId>``
    ``<artifactId>``commons-text``</artifactId>``
    ``<version>``1.10.0``</version>``
``</dependency>``
```

通常，这个库带有一组用于字符串操作的现成的类和方法。在这些类中，我们找到了_WordUtils_。

_WordUtils#capitalizeFully_方法为我们的问题提供了最简洁和直接的方法。**这个方法将所有由空格分隔的单词转换为大写单词**。

请注意，这个方法优雅地处理_null_输入。所以，我们不需要检查我们的输入字符串是否为_null_或不是。

现在，让我们添加另一个测试用例以确保一切按预期工作：

```java
@Test
void givenString_whenUsingWordUtilsClass_thenCapitalizeFirstCharacter() {
    String input = "smile sunshine is good for your teeth";

    assertEquals("Smile Sunshine Is Good For Your Teeth", WordUtils.capitalizeFully(input));
}
```

### 7. 结论

在这篇短文中，我们探讨了在Java中将给定字符串中每个单词的首字母大写的不同方法。

首先，我们解释了如何使用JDK来实现这一点。然后，我们展示了如何使用第三方库来回答我们的中心问题。

正如往常一样，本文中使用的代码可以在GitHub上找到。