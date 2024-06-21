---
date: 2024-06-22
category:
  - Java
  - String Manipulation
tag:
  - Java
  - String
  - substring
  - Apache Commons Lang
  - Guava
head:
  - - meta
    - name: keywords
      content: Java, String, substring, subSequence, chars, Apache Commons Lang, StringUtils, left, Ascii, truncate
---
# Java中获取字符串前n个字符的不同方法

在这篇简短的教程中，我们将探讨在Java中获取字符串前n个字符的不同方法。

首先，我们将学习如何使用Java核心开发工具包（JDK）的方法和类来实现这一目标。然后，我们将看到如何使用如Apache Commons Lang和Guava等外部库来达到相同的结果。

### 使用Java核心开发工具包（JDK）

JDK提供了几种我们可以用于获取给定字符串的前n个字符的方法。让我们仔细看看每个选项。

#### 2.1 使用String#substring方法

String类的substring()方法提供了一个简单的解决方案来回答我们的中心问题。顾名思义，这个方法返回给定字符串的一个子集作为一个新的字符串。

让我们看看它在实际中的应用：

```java
@Test
void givenString_whenUsingSubstringMethod_thenGetFirstChars() {
    String givenInput = "Hello Baeldung Readers";

    assertEquals("He", givenInput.substring(0, 2));
}
```

这个方法接受两个参数，beginIndex和endIndex。beginIndex表示第一个字符的索引，endIndex代表最后一个索引，该索引是排除在外的。

也就是说，返回的子字符串从指定的endIndex开始，并扩展到索引endIndex - 1的字符。

#### 2.2 使用String#subSequence方法

另一种解决方案是使用subSequence()方法。它返回一个CharSequence对象，该对象包含指定字符串的一部分。

**调用subSequence(start, end)的行为与调用substring(start, end)方法完全相同。** 让我们看看它在实际中的应用：

```java
@Test
void givenString_whenUsingSubSequenceMethod_thenGetFirstChars() {
    String givenInput = "Welcome";

    assertEquals("Wel", givenInput.subSequence(0, 3));
}
```

同样，该方法返回字符串“Welcome”中的前三个字符“Wel”。我们应该记住，如果beginIndex或endIndex是负数，或者endIndex大于字符串长度，或者当beginIndex大于endIndex时，这个方法会抛出IndexOutOfBoundsException。

#### 2.3 使用String#chars方法

String类提供了chars()作为检索前n个字符的另一种选项。**这个方法是在Java 9中引入的，用于将给定字符串作为Stream进行操作。**

让我们通过另一个测试用例来说明chars()方法的使用：

```java
@Test
void givenString_whenUsingStreamApi_thenGetFirstChars() {
    String givenInput = "The world is beautiful";
    String result = givenInput.chars()
      .limit(3)
      .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
      .toString();

    assertEquals("The", result);
}
```

简而言之，chars()返回一个IntStream，包含字符串输入的char值。此外，我们使用limit(3)方法检索前三个值。然后，我们使用collect()与StringBuilder构建从返回值生成的字符串。

### 使用Apache Commons Lang

另外，我们可以使用Apache Commons Lang库来解决我们的挑战。它提供了一组实用类，如StringUtils，我们可以使用它们来执行字符串操作。

首先，让我们将它的依赖项添加到pom.xml文件中：

```xml
``<dependency>``
    ``<groupId>``org.apache.commons``</groupId>``
    ``<artifactId>``commons-lang3``</artifactId>``
    ``<version>``3.14.0``</version>``
``</dependency>``
```

#### 3.1 使用StringUtils#substring方法

通常，StringUtils提供了它自己的substring()方法版本。这个方法的特点是它与String#substring相比是null安全的：

```java
@Test
void givenString_whenUsingStringUtilsSubstringMethod_thenGetFirstChars() {
    String givenInput = "Baeldung";

    assertEquals("Baeld", StringUtils.substring(givenInput, 0, 5));
}
```

如上所示，返回的子字符串“Baeld”从位置零的字符开始，并在位置5之前结束。

#### 3.2 使用StringUtils#left方法

同样，我们可以使用left()方法来实现相同的结果。这个方法返回给定字符串的左n个字符。

让我们通过一个实际的例子来说明如何使用StringUtils#left：

```java
@Test
void givenString_whenUsingStringUtilsLeftMethod_thenGetFirstChars() {
    String givenInput = "kindness always wins";

    assertEquals("kind", StringUtils.left(givenInput, 4));
}
```

这个方法的好处是它是null安全的，如果指定的字符串输入为null，它会返回null。

### 使用Guava

另一种解决方案是使用Guava。像往常一样，在开始使用这个库之前，我们需要将其依赖项添加到pom.xml中：

```xml
``<dependency>``
    ``<groupId>``com.google.guava``</groupId>``
    ``<artifactId>``guava``</artifactId>``
    ``<version>``33.0.0-jre``</version>``
``</dependency>``
```

**Guava提供了Ascii#truncate方法，我们可以将其用作获取字符串前几个字符的替代方法：**

```java
@Test
void givenString_whenUsingGuavaTruncateMethod_thenGetFirstChars() {
    String givenInput = "Tamassint";

    assertEquals("Tama", Ascii.truncate(givenInput, 4, ""));
}
```

简而言之，这个方法将给定的字符串截断到指定的最大长度4，在我们的例子中。

### 结论

在这篇简短的文章中，我们探索了在Java中获取给定字符串的前n个字符的各种方法。

沿途，我们看到了如何使用JDK方法和类。然后，我们学习了如何使用如Apache Commons Lang和Guava等外部库来实现相同的目标。

一如既往，本文中使用的代码可以在GitHub上找到。