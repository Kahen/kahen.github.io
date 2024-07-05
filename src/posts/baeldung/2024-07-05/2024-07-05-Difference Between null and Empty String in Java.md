---
date: 2022-04-01
category:
  - Java
  - String
tag:
  - null
  - 空字符串
head:
  - - meta
    - name: keywords
      content: Java, String, null, 空字符串
---
# Java中null和空字符串的区别

在本教程中，我们将探讨Java中null和空字符串的区别。这是两个不同的概念，但有时在使用字符串时可能没有按预期使用。

**null是Java中的一个保留关键字，表示没有任何值。**此外，将null值分配给对象引用意味着它不指向内存中的任何对象或值。

默认情况下，Java将引用变量初始化为null值，并将原始类型初始化为基于其类型的默认值。因此，**我们不能** **将null分配给原始类型。**

如果我们将null分配给一个String对象，它将被初始化但未实例化，因此不包含任何值或引用。

### 3. Java中的空字符串

**空字符串是一个有效的String对象，没有字符，**因此，所有String操作都可以在这个对象上使用。

让我们通过一些测试来看看这两者之间的区别：

```java
String nullString = null;
String emptyString = "";
assertTrue(emptyString.equals(""));
assertThrows(NullPointerException.class, () -> nullString.length());
```

在上面的测试用例中，我们定义了两个String对象，一个为空，一个为null。然后我们尝试使用String类中可用的方法。

测试用例成功执行，从而验证了空字符串可以使用String类的方法，但null字符串则不能。

让我们检查另一种场景，我们检查两者的等同性：

```java
String nullString = null;
String emptyString = "";
assertFalse(emptyString.equals(nullString));
assertFalse(emptyString == nullString);
```

在这个测试场景中，我们使用equals()和==比较这两个String对象是否相等。执行测试用例后，成功验证了null和空字符串并不相同。

### 4. 结论

在本文中，我们学习了Java中null和空字符串的区别。首先，我们定义了这两个概念，然后看到了它们在不同场景下的表现。

本质上，null表示没有任何值，而空字符串表示一个有效的String。空字符串有一些值，其长度为零。

像往常一样，所有示例的源代码都可以在GitHub上找到。