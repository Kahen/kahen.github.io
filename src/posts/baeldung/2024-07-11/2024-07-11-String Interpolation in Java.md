---
date: 2022-04-01
category:
  - Java
  - String Interpolation
tag:
  - Java
  - String
  - Interpolation
head:
  - - meta
    - name: keywords
      content: Java, String Interpolation, Format, StringBuilder, MessageFormat, Apache Commons
---
# Java中字符串插值

在本教程中，我们将讨论Java中**字符串插值**的主题。我们将看几个不同的例子，然后详细了解。**字符串插值是一种直接且精确的方法，可以将变量值注入到字符串中**。它允许用户直接在处理过的字符串文字中嵌入变量引用。与Scala等语言相比，Java缺乏对**字符串插值**的原生支持。

然而，有一些方法可以在Java中实现这种行为。在接下来的部分中，我们将解释这些方法中的每一种。

## 3. 加号运算符

首先，我们有“+”运算符。我们可以使用“+”运算符来连接我们的变量和字符串值。变量被替换为其值，因此我们实现了插值或字符串的连接：

```java
@Test
public void givenTwoString_thenInterpolateWithPlusSign() {
    String EXPECTED_STRING = "使用一些Java示例的Java中的字符串插值。";
    String first = "插值";
    String second = "Java";
    String result = "String " + first + " in " + second + " with some " + second + " examples.";
    assertEquals(EXPECTED_STRING, result);
}
```

正如我们在前面的例子中看到的，使用这个运算符，结果字符串包含了变量的值与其他字符串值。由于它可以调整以适应特定的需求，这种字符串连接方法是最简单和最有价值的。使用运算符时，我们不需要将文本放在引号内。

## 4. format()函数

另一种方法是使用String类的format()方法。与“+”运算符不同，在这种情况下我们需要使用占位符来获得字符串插值中的预期结果：

```java
@Test
public void givenTwoString_thenInterpolateWithFormat() {
    String EXPECTED_STRING = "使用一些Java示例的Java中的字符串插值。";
    String first = "插值";
    String second = "Java";
    String result = String.format("String %s in %s with some %s examples.", first, second, second);
    assertEquals(EXPECTED_STRING, result);
}
```

此外，如果我们想避免在format调用中重复变量，我们可以引用特定参数：

```java
@Test
public void givenTwoString_thenInterpolateWithFormatStringReference() {
    String EXPECTED_STRING = "使用一些Java示例的Java中的字符串插值。";
    String first = "插值";
    String second = "Java";
    String result = String.format("String %1$s in %2$s with some %2$s examples.", first, second);
    assertEquals(EXPECTED_STRING, result);
}
```

现在我们减少了不必要的变量重复，而是使用了参数列表中的参数索引。

## 5. StringBuilder类

我们接下来的方法是StringBuilder类。我们实例化一个StringBuilder对象，然后调用append()函数来构建字符串。在这个过程中，我们的变量被添加到结果字符串中：

```java
@Test
public void givenTwoString_thenInterpolateWithStringBuilder() {
    String EXPECTED_STRING = "使用一些Java示例的Java中的字符串插值。";
    String first = "插值";
    String second = "Java";
    StringBuilder builder = new StringBuilder();
    builder.append("String ")
      .append(first)
      .append(" in ")
      .append(second)
      .append(" with some ")
      .append(second)
      .append(" examples.");
    String result = builder.toString();
    assertEquals(EXPECTED_STRING, result);
}
```

正如上面的代码示例所示，我们可以通过链式调用append函数来插值字符串，该函数接受参数作为变量（在这种情况下，是两个字符串）。

## 6. MessageFormat类

使用MessageFormat类是获得Java中字符串插值的一个较少为人知的方法。有了MessageFormat，我们可以创建连接的消息，而不必担心底层语言。这是创建面向用户的消息的标准方法。它接受一个对象集合，格式化其中包含的字符串，并将它们插入到模式中的适当位置。

MessageFormat的format方法几乎与String的format方法相同，只是占位符的写法不同。在这个函数中，索引如{0}、{1}、{2}等代表占位符：

```java
@Test
public void givenTwoString_thenInterpolateWithMessageFormat() {
    String EXPECTED_STRING = "使用一些Java示例的Java中的字符串插值。";
    String first = "插值";
    String second = "Java";
    String result = MessageFormat.format("String {0} in {1} with some {1} examples.", first, second);
    assertEquals(EXPECTED_STRING, result);
}
```

关于性能，StringBuilder只向动态缓冲区追加文本；然而，MessageFormat在追加数据之前解析给定的格式。因此，StringBuilder在效率方面优于MessageFormat。

## 7. Apache Commons

最后，我们有来自Apache Commons的StringSubstitutor。在这个类的上下文中，值被替换为包含在String中的变量。这个类接受一段文本并替换所有的变量。变量的默认定义是${variableName}。构造函数和设置方法可以用来改变前缀和后缀。**变量值的解析通常涉及使用一个映射**。然而，我们可以通过使用系统属性或提供专门的变量解析器来解析它们：

```java
@Test
public void givenTwoString_thenInterpolateWithStringSubstitutor() {
    String EXPECTED_STRING = "使用一些Java示例的Java中的字符串插值。";
    String baseString = "String ${first} in ${second} with some ${second} examples.";
    String first = "插值";
    String second = "Java";
    Map`<String, String>` parameters = new HashMap<>();
    parameters.put("first", first);
    parameters.put("second", second);
    StringSubstitutor substitutor = new StringSubstitutor(parameters);
    String result = substitutor.replace(baseString);
    assertEquals(EXPECTED_STRING, result);
}
```

从我们的代码示例中，我们可以看到我们创建了一个Map。键名与我们要在String中替换的变量名称相同。然后我们将每个键的相应值放入Map中。接下来，我们将它作为构造函数参数传递给StringSubstitutor类。最后，实例化的对象调用replace()函数。这个函数接收带有占位符的文本作为参数。结果，我们得到了一个插值后的文本。就这么简单。

## 8. 结论

在本文中，我们简要描述了什么是字符串插值。然后我们学习了如何在Java语言中使用原生Java运算符、String类的format()方法来实现这一点。最后，我们探索了较少为人知的选项，如MessageFormat和来自Apache Commons的StringSubstitutor。

像往常一样，代码可以在GitHub上找到。