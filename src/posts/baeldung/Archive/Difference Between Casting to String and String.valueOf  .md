---
date: 2024-06-18
category:
  - Java
  - Programming
tag:
  - Java String
  - String Conversion
head:
  - - meta
    - name: keywords
      content: Java, String, Cast, ValueOf, Conversion
---
# Java中字符串转换：类型转换与String.valueOf()方法的区别

在Java中操作字符串是一项基本任务。我们经常需要将其他数据类型转换为字符串。实现这一目标的两种常见方法是将对象类型转换为String和使用String.valueOf()方法。它们在表面上可能看起来相似，但两种方法之间的一些差异可能会影响我们代码的行为。

在这个快速教程中，让我们讨论它们之间的区别。

首先，让我们看一个例子。假设我们将一个字符串值分配给一个类型为Object的变量：

```java
Object obj = "Baeldung is awesome!";

```

如果我们想将obj转换为String，我们可以直接进行类型转换：

```java
String castResult = (String) obj;
assertEquals("Baeldung is awesome!", castResult);

```

或者，我们可以使用标准库提供的String.valueOf()方法：

```java
String valueOfResult = String.valueOf(obj);
assertEquals("Baeldung is awesome!", valueOfResult);
```

正如我们所看到的，两种方法都按预期工作。

尽管这两种方法乍一看可能看起来相似，但它们实际上有一些显著的差异。

接下来，让我们深入探讨它们。

### 当转换非字符串对象时

我们刚刚将一个字符串值分配给了一个Object变量。将String转换和String.valueOf()可以将obj转换为String实例。

接下来，让我们**将一些非字符串值分配给Object变量**，看看它们是否仍然按预期工作。

首先，让我们测试将非字符串对象直接转换为String：

```java
Object obj = 42;
assertThrows(ClassCastException.class, () -> {String castResult = (String) obj;});

Object obj2 = List.of("Baeldung", "is", "awesome");
assertThrows(ClassCastException.class, () -> {String castResult = (String) obj2;});

```

在上面的例子中，我们将一个整数值(42)分配给了obj，而obj2包含了一个String值的列表。正如演示的那样，当对象不是String类型时，直接转换为String会抛出ClassCastException。这是很容易理解的：**由于String是一个最终类，只有我们知道对象是String或null时，转换为String才是有效的。**

接下来，让我们看看String.valueOf()方法是否抛出相同的异常：

```java
String valueOfResult = String.valueOf(obj);
assertEquals("42", valueOfResult);

valueOfResult = String.valueOf(obj2);
assertEquals("[Baeldung, is, awesome]", valueOfResult);
```

正如我们所看到的，当我们将obj和obj2传递给String.valueOf()时，**它没有抛出任何异常**。相反，**它将非字符串对象转换为字符串值。**

接下来，让我们看看String.valueOf()的实现，以了解为什么会这样：

```java
public static String valueOf(Object obj) {
    return (obj == null) ? "null" : obj.toString();
}
```

实现确实很简单。**String.valueOf()方法调用输入obj的toString()方法。因此，无论obj是否是String类型，它总是返回一个字符串。**

此外，从String.valueOf()的实现中可以看出，该方法包含了空值检查。那么，接下来让我们看看直接转换和String.valueOf()如何处理null值。

### 处理null值

让我们首先尝试将一个null对象转换为String：

```java
Object obj = null;
String castResult = (String) obj;
assertNull(castResult);
```

正如示例所示，**我们通过将null值转换为String来获得一个null值。**

由于我们已经看到了String.valueOf()方法的实现，测试结果不会令人惊讶：

```java
String valueOfResult = String.valueOf(obj);
assertNotNull(valueOfResult);
assertEquals("null", valueOfResult);
```

与直接转换不同，**String.valueOf()永远不会返回null**。**如果我们传递一个null值给String.valueOf()，我们会得到字符串“null”。**

### 结论

将String转换和使用String.valueOf()都可以将非字符串数据类型转换为Java中的字符串值。在本文中，我们探讨了它们之间的区别。

接下来，让我们简要总结它们的主要区别：

- 类型灵活性 - String.valueOf()接受任何类型的输入，并在不引发异常的情况下返回它们的字符串表示。转换，另一方面，仅限于由String或其超类型引用的String值，例如CharSequence、Object等，当使用不当时会导致ClassCastException。
- null处理 - String.valueOf()优雅地处理null值，将它们转换为字符串“null”。将对象转换为String时，如果被转换的对象是null，则返回null。
- 可读性 - String.valueOf()在其目的上更明确，使代码更容易理解。然而，将对象转换为String可能不太清晰，并且可能被误解为尝试类型转换而不是转换为String。

因此，**String.valueOf()方法为将不同数据类型转换为字符串提供了更健壮的解决方案。**

如常，示例的完整源代码可在GitHub上找到。

发表文章后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。