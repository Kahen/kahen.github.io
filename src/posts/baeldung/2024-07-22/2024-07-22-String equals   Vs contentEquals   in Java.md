---
date: 2022-04-01
category:
  - Java
  - String
tag:
  - equals
  - contentEquals
head:
  - - meta
    - name: keywords
      content: Java, String, equals, contentEquals
---
# Java中String类的equals()与contentEquals()方法的比较

## 1. 引言

Java中String类的equals()和contentEquals()方法用于执行字符串比较。然而，这两种方法在功能上存在特定的差异。

在本教程中，我们将通过实际示例快速查看这两种方法之间的区别。

## 2. equals()方法

equals()方法是Java String类的公共方法。它覆盖了Object类中的原始equals()方法。该方法的签名如下：

```java
public boolean equals(Object anObject)
```

该方法通过检查两个不同的String对象中的各个字符来进行比较。**然而，该方法不仅检查内容，还检查对象是否是String的实例。** 因此，只有在满足以下所有条件时，该方法才返回true：

- 参数对象不是null
- 它是一个String对象
- 字符序列完全相同

## 3. contentEquals()方法

与equals()方法类似，contentEquals()方法也用于比较String的内容。**然而，与equals()方法不同，contentEquals()接受任何CharSequence接口的实现作为参数。** 这意味着可以比较String、StringBuffer、StringBuilder、CharBuffer或Segment。

该方法的签名如下：

```java
public boolean contentEquals(StringBuffer sb)
public boolean contentEquals(CharSequence cs)
```

**因此，contentEquals()方法只关心字符串的内容。** 如果参数是String对象，则调用equals()方法进行比较。另一方面，如果提供了一个通用的字符序列，则该方法比较相似位置上的各个字符。

如果给定参数中的字符序列与原始String匹配，则该方法返回true。与equals()方法不同，如果将null参数传递给contentEquals()方法，它将抛出NullPointerException。

## 4. 示例

让我们通过编写简单的测试用例来查看这两种方法的实际应用。为了简化，让我们在我们的代码中使用单词“Baeldung”。

首先，我们将两个相同的String对象进行比较。在这种情况下，两种方法都将返回true值：

```java
String actualString = "baeldung";
String identicalString = "baeldung";

assertTrue(actualString.equals(identicalString));
assertTrue(actualString.contentEquals(identicalString));
```

接下来，我们使用两个具有相同内容的不同CharSequence实现。对于第一个实现，我们将使用String实例化CharSequence。在这种情况下，由于内容和类型都相同，两种方法都应该返回true：

```java
CharSequence identicalStringInstance = "baeldung";

assertTrue(actualString.equals(identicalStringInstance));
assertTrue(actualString.contentEquals(identicalStringInstance));
```

对于下一个示例，我们将使用StringBuffer实现。**由于contentEquals()方法只检查内容，它应该返回true。** 然而，equals()方法应该返回false：

```java
CharSequence identicalStringBufferInstance = new StringBuffer("baeldung");

assertFalse(actualString.equals(identicalStringBufferInstance));
assertTrue(actualString.contentEquals(identicalStringBufferInstance));
```

## 5. 结论

在本文中，我们快速查看了String类的两种方法。equals()方法仅比较String实例，而contentEquals()方法可以比较任何CharSequence的实现。

总之，当我们只关心对象的内容时，我们应该使用contentEquals()。另一方面，有时检查对象的类型可能很重要。在这种情况下，我们应该使用equals()方法，它提供了更严格的检查条件。

如往常一样，代码片段可在GitHub上找到。---
date: 2022-04-01
category:
  - Java
  - String
tag:
  - equals
  - contentEquals
head:
  - - meta
    - name: keywords
      content: Java, String, equals, contentEquals
---
# Java中String类的equals()与contentEquals()方法的比较

## 1. 引言

Java中String类的equals()和contentEquals()方法用于执行字符串比较。然而，这两种方法在功能上存在特定的差异。

在本教程中，我们将通过实际示例快速查看这两种方法之间的区别。

## 2. equals()方法

equals()方法是Java String类的公共方法。它覆盖了Object类中的原始equals()方法。该方法的签名如下：

```java
public boolean equals(Object anObject)
```

该方法通过检查两个不同的String象中的各个字符来进行比较。然而，该方法不仅检查内容，还检查对象是否是String的实例。因此，只有在满足以下所有条件时，该方法才返回true：

- 参数对象不是null
- 它是一个String对象
- 字符序列完全相同

## 3. contentEquals()方法

与equals()方法类似，contentEquals()方法也用于比较String的内容。然而，与equals()方法不同，contentEquals()接受任何CharSequence口的实现作为参数。这意味着可以比较String、StringBuffer、StringBuilder、CharBuffer或Segment。

该方法的签名如下：

```java
public boolean contentEquals(StringBuffer sb)
public boolean contentEquals(CharSequence cs)
```

因此，contentEquals()方法只关心字符串的内容。如果参数是String对象，则调用equals()方法进行比较。另一方面，如果提供了一个通用的字符序列，则该方法比较相似位置上的各个字符。

如果给定参数中的字符序列与原始String匹配，则该方法返回true。与equals()方法不同，如果将null参数传递给contentEquals()方法，它将抛出NullPointerException。

## 4. 示例

让我们通过编写简单的测试用例来查看这两种方法的实际应用。为了简化，让我们在我们的代码中使用单词“Baeldung”。

首先，我们将两个相同的String对象进行比较。在这种情况下，两种方法都将返回true值：

```java
String actualString = "baeldung";
String identicalString = "baeldung";

assertTrue(actualString.equals(identicalString));
assertTrue(actualString.contentEquals(identicalString));
```

接下来，我们使用两个具有相同内容的不同CharSequence实现。对于第一个实现，我们将使用String实例化CharSequence。在这种情况下，由于内容和类型都相同，两种方法都应该返回true：

```java
CharSequence identicalStringInstance = "baeldung";

assertTrue(actualString.equals(identicalStringInstance));
assertTrue(actualString.contentEquals(identicalStringInstance));
```

对于下一个示例，我们将使用StringBuffer实现。由于contentEquals()方法只检查内容，它应该返回true。然而，equals()方法应该返回false：

```java
CharSequence identicalStringBufferInstance = new StringBuffer("baeldung");

assertFalse(actualString.equals(identicalStringBufferInstance));
assertTrue(actualString.contentEquals(identicalStringBufferInstance));
```

## 5. 结论

在本文中，我们快速查看了String类的两种方法。equals()方法仅比较String实例，而contentEquals()方法可以比较任何CharSequence的实现。

总之，当我们只关心对象的内容时，我们应该使用contentEquals()。另一方面，有时检查对象的类型可能很重要。在这种情况下，我们应该使用equals()方法，它提供了更严格的检查条件。

如往常一样，代码片段可在GitHub上找到。

OK