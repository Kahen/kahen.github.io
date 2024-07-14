---
date: 2022-04-01
category:
  - Java
  - String Concatenation
tag:
  - Java
  - String
  - Concatenation
head:
  - - meta
    - name: keywords
      content: Java, String Concatenation, StringBuilder, String, Java 8
------
# Java中的字符串拼接

在Java中，字符串拼接是最常用的操作之一。本教程将介绍一些字符串拼接的方法，重点描述如何使用_concat()_和“_+_”运算符方法。最后，我们将讨论如何根据需要选择正确的方法。

### 2.1 使用“_+_”运算符

在Java中，使用“_+_”运算符是最常见的字符串拼接方法之一。

“_+_”运算符在字符串拼接方面比其他方法提供了更多的灵活性。首先，它不会因空值而抛出任何异常。其次，它将空值转换为其字符串表示形式。我们还可以使用它来连接两个以上的字符串。

让我们看一个代码示例：

```java
@Test
void whenUsingPlusOperatorANull_thenAssertEquals() {
    String stringOne = "Hello ";
    String stringTwo = null;
    assertEquals("Hello null", stringOne + stringTwo);
}
```

编译器内部将“_+_”运算符转换为_StringBuilder_（或_StringBuffer_）类及其_append()_方法。

由于“_+_”运算符会静默地将参数转换为_String_（使用对象的_toString()_方法），我们避免了_NullPointerException_。然而，我们需要考虑最终的字符串结果是否在我们带有字符串体内的“null”时仍然有效。

### 2.2 使用_concat()_方法

String类的_concat()_方法将指定的字符串附加到当前字符串的末尾，并返回新的组合字符串。考虑到String类是不可变的，原始的_String_不会被改变。

让我们测试这种行为：

```java
@Test
void whenUsingConcat_thenAssertEquals() {
    String stringOne = "Hello";
    String stringTwo = " World";
    assertEquals("Hello World", stringOne.concat(stringTwo));
}
```

在前面的例子中，_stringOne_变量是基础字符串。使用_concat()_方法，_stringTwo_被附加到_stringOne_的末尾。_concat()_操作是不可变的，所以我们需要一个显式赋值。下一个示例说明了这种情况：

```java
@Test
void whenUsingConcatWithOutAssignment_thenAssertNotEquals() {
    String stringOne = "Hello";
    String stringTwo = " World";
    stringOne.concat(stringTwo);
    assertNotEquals("Hello World", stringOne); // 我们只得到Hello
}
```

另外，要得到我们的最终连接字符串，我们需要将_concat()_结果赋值给一个变量：

```java
stringOne = stringOne.concat(stringTwo);
assertEquals("Hello World", stringOne);
```

_concat()_的另一个有用特性是当我们需要连接多个_String_对象时，这个方法允许这样做。此外，我们还可以附加空格和特殊字符：

```java
@Test
void whenUsingConcatToMultipleStringConcatenation_thenAssertEquals() {
    String stringOne = "Hello";
    String stringTwo = "World";
    String stringThree = ", in Jav";
    stringOne = stringOne.concat(" ").concat(stringTwo).concat(stringThree).concat("@");
    assertEquals("Hello World, in Jav@", stringOne);
}
```

关于空值呢？当前字符串和要附加的字符串都不能是空值。否则，_concat()_方法会抛出一个_NullPointerException_：

```java
@Test
void whenUsingConcatAppendANull_thenAssertEquals() {
    String stringOne = "Hello";
    String stringTwo = null;
    assertThrows(NullPointerException.class, () -> stringOne.concat(stringTwo));
}
```

### 2.3 StringBuilder类

首先，我们有_StringBuilder_类。这个类提供了_append()_方法来执行拼接操作。下一个示例向我们展示了它的工作原理：

```java
@Test
void whenUsingStringBuilder_thenAssertEquals() {
    StringBuilder builderOne = new StringBuilder("Hello");
    StringBuilder builderTwo = new StringBuilder(" World");
    StringBuilder builder = builderOne.append(builderTwo);
    assertEquals("Hello World", builder.toString());
}
```

另一方面，类似的拼接方法是_StringBuffer_类。与非同步的_StringBuilder_（即，不是线程安全的）相反，_StringBuffer_是同步的（即，线程安全的）。然而，它的性能比_StringBuilder_差。它也有一个像_StringBuilder_一样的_append()_方法。

### 2.4 String format()方法

使用String类的_format()_方法的另一种进行字符串拼接的方式。使用像_%s_这样的格式说明符，我们可以通过它们的字符串值或对象来连接多个字符串：

```java
@Test
void whenUsingStringFormat_thenAssertEquals() {
    String stringOne = "Hello";
    String stringTwo = " World";
    assertEquals("Hello World", String.format("%s%s", stringOne, stringTwo));
}
```

### 2.5 Java 8及以上版本中的拼接方法

Java 8及以上版本中，String类的_join()_方法可以执行字符串拼接。在这种情况下，该方法的第一个参数是将要连接的字符串之间的分隔符：

```java
@Test
void whenUsingStringJoin_thenAssertEquals() {
    String stringOne = "Hello";
    String stringTwo = " World";
    assertEquals("Hello World", String.join("", stringOne, stringTwo));
}
```

从Java 8开始，添加了_StringJoiner_类。这个类使用分隔符、前缀和后缀连接_String_。以下代码片段是其使用的一个示例：

```java
@Test
void whenUsingStringJoiner_thenAssertEquals() {
    StringJoiner joiner = new StringJoiner(", ");
    joiner.add("Hello");
    joiner.add("World");
    assertEquals("Hello, World", joiner.toString());
}
```

随着Java 8中Stream API的添加，我们可以找到Collectors。Collectors类有_joining()_方法。这个方法类似于String类的_join()_方法。它用于集合。以下示例代码片段向我们展示了它的工作原理：

```java
@Test
void whenUsingCollectors_thenAssertEquals() {
    List`<String>` words = Arrays.asList("Hello", "World");
    String collect = words.stream().collect(Collectors.joining(", "));
    assertEquals("Hello, World", collect);
}
```

## 3. 选择一种方法

最后，如果我们需要在_concat()_方法和“_+_”运算符之间进行选择，我们需要考虑一些方面。

首先，_concat()_方法只接受字符串。与此同时，“_+_”运算符接受任何类型并将其转换为字符串。另一方面，_concat()_方法在空值上会抛出_NullPointerExeption_，而“_+_”运算符则不会。

此外，它们之间存在性能差异。_concat()_方法的性能优于“_+_”运算符。后者总是创建一个新字符串，不管字符串的长度如何。此外，我们需要考虑到，当要附加的字符串长度大于0时，_concat()_方法才会创建一个新字符串。否则，它返回同一个对象。

## 4. 结论

在本文中，我们提供了Java字符串拼接的快速概述。此外，我们详细讨论了使用_concat()_和“_+_”运算符执行字符串拼接。最后，我们进行了_concat()_方法和“_+_”运算符之间的比较分析，以确定在不同情境下如何选择它们。

如常，本文中使用的所有代码片段都可以在GitHub上找到。