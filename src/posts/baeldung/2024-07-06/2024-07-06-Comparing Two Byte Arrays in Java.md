---
date: {2024-07-06}
category:
  - Java
  - Programming
tag:
  - byte arrays
  - array comparison
  - Java
head:
  - - meta
    - name: keywords
      content: Java, byte arrays, array comparison, programming
---
# Java中比较两个字节数组

在Java中，如果我们不正确地比较两个字节数组，可能会得到一个意想不到的结果。

所以，在这个快速教程中，我们将学习以值比较两个数组的正确方式。

### 2. 问题介绍

一个例子可以快速解释问题。假设我们有这样一个字符串：

```java
final static String INPUT = "I am a magic string.";
```

现在，我们通过`String.getBytes()`方法从上面的字符串中获取两个字节数组：

```java
final static byte[] ARRAY1 = INPUT.getBytes();
final static byte[] ARRAY2 = INPUT.getBytes();
```

显然，如果我们比较`ARRAY1`和`ARRAY2`，**我们期望这两个数组在值上是相等的**，因为它们是从同一个输入字符串创建的。

接下来，让我们看看我们可能会犯的常见错误，并找出正确的比较方法。

为了简化，我们将使用单元测试断言来验证每种比较方法是否返回预期的结果。

### 3. `==`运算符和`equals()`方法不是好的选择

在Java中，`==`被称为“等于”运算符。首先，让我们尝试使用`==`运算符比较两个数组：

```java
assertFalse(ARRAY1 == ARRAY2);
```

我们运行上述简单测试时，测试通过。也就是说，即使两个数组中的元素在值上相同，`ARRAY1 == ARRAY2`也返回`false`——这不是我们期望的结果。这是因为**`==`运算符比较的是两个数组的内存地址而不是它们的内容**。这意味着两个数组可以有相同的内容，但它们是不同的对象。所以，即使两个数组等价，`==`运算符也会返回`false`。

我们可能已经了解了Java中`==`运算符和`equals()`方法之间的区别：`==`进行引用等值检查，但`equals()`方法执行值等值检查。

由于我们的目标是比较两个数组的值，让我们创建另一个简单的测试，使用`equals()`方法比较`ARRAY1`和`ARRAY2`：

```java
assertFalse(ARRAY1.equals(ARRAY2));
```

如果我们运行这个测试，它也会通过。这意味着**`equals()`方法也没有给我们预期的结果**。接下来，让我们找出为什么`equals()`不能正确工作。

当我们调用`ARRAY1.equals(ARRAY2)`时，实际上是调用了`Object`类的`equals()`方法。让我们看看`Object`类的`equals()`方法的实现：

```java
public boolean equals(Object obj) {
    return (this == obj);
}
```

正如我们所看到的，`Object`的`equals()`方法内部使用`==`运算符比较两个对象。**当我们比较数组时，`==`和`equals()`是一样的。因此，它们都执行引用等值检查**。

### 4. 使用`Arrays.equals()`方法

现在，我们了解到`==`运算符和`equals()`方法都不是检查两个数组值等值的正确方式。但是，在Java编程中，比较两个数组的值是一个相当常见的操作。因此，Java标准库提供了`Arrays.equals()`方法来完成这项工作：

```java
assertTrue(Arrays.equals(ARRAY1, ARRAY2));
```

如果我们运行这个测试，它会通过。所以，**`Arrays.equals()`返回了我们比较两个字节数组的预期结果**。

此外，`Arrays.equals()`适用于其他类型的数组。**我们应该使用`Arrays.equals()`方法来检查所有数组类型的值等值**。

最后，让我们再看一个比较两个`String`数组的值的例子：

```java
String[] strArray1 = new String[] { "Java", "is", "great" };
String[] strArray2 = new String[] { "Java", "is", "great" };

assertFalse(strArray1 == strArray2);
assertFalse(strArray1.equals(strArray2));
assertTrue(Arrays.equals(strArray1, strArray2));
```

在上面的代码中，`strArray1`和`strArray2`的内容是相同的。测试结果表明`==`和`equals()`报告`false`，但使用`Arrays.equals()`方法给出了预期的结果。

### 5. 结论

在本文中，我们讨论了比较两个数组内容时常见的陷阱。我们还探讨了比较两个字节数组值的正确方式。

`==`运算符和`equals()`方法对数组执行引用等值检查。如果我们需要比较两个数组的值，使用`Arrays.equals(array1, array2)`方法是正确的方法。

像往常一样，这里展示的所有代码片段都可以在GitHub上找到。