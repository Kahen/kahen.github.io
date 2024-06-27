---
date: 2022-04-01
category:
  - Java
  - StringBuilder
tag:
  - Java
  - StringBuilder
  - Comparison
head:
  - - meta
    - name: keywords
      content: Java, StringBuilder, 对比
------
# Java中比较StringBuilder对象

在Java中，StringBuilder类允许我们创建一个可变的字符序列对象。这使得我们可以轻松地更新对象，而不需要每次都从头开始构建，这在使用标准String类时是必需的。本教程将介绍如何在Java 11发布前后比较两个StringBuilder对象。

### 1. Java 11之前

在Java 11之前，StringBuilder并没有内置的比较方法。因此，我们需要编写自己的比较方法。首先检查两个被比较对象的长度是否相同。如果不同，我们可以立即判断它们不匹配。

一旦我们知道它们长度相同，我们可以利用StringBuilder实现了CharSequence这一事实来访问charAt()方法，并逐个比较每个字符。让我们将这两个步骤合并成一个我们可以使用的单一方法：

```java
boolean compare(StringBuilder one, StringBuilder two) {
    if (one.length() != two.length()){
        return false;
    }
    for (int i = 0; i < one.length(); i++) {
        if (one.charAt(i) != two.charAt(i)) {
            return false;
        }
    }
    return true;
}
```

现在我们可以使用这个方法进行一些测试。让我们看看它是否能确认两个StringBuilder是否相同：

```java
@Test
void whenUsingJavaEight_givenTwoIdenticalStringBuilders_thenCorrectlyMatch() {
    StringBuilder one = new StringBuilder("Hello");
    StringBuilder two = new StringBuilder("Hello");
    boolean result = StringBuilderCompare.compare(one, two);
    assertEquals(true, result);
}
```

为了完成检查，现在让我们看看它能否检测到两个不同的StringBuilder：

```java
@Test
public void whenUsingJavaEight_givenTwoDifferentStringBuilders_thenCorrectlyIdentifyDifference() {
    StringBuilder one = new StringBuilder("Hello");
    StringBuilder two = new StringBuilder("World");
    boolean result = StringBuilderCompare.compare(one, two);
    assertEquals(false, result);
}
```

第二个测试中的示例具有相同的长度，因此我们将使用charAt()进行比较。

### 3. Java 11之后

随着Java 11的发布，StringBuilder现在实现了Comparable接口。这使我们可以使用compareTo()方法，该方法返回一个整数。如果匹配，则返回值为零；如果StringBuilder不同，则返回非零值。让我们用两个具有相同值的StringBuilder来看它在实际中如何工作：

```java
@Test
void whenUsingJavaEleven_givenTwoIdenticalStringBuilders_thenCorrectlyMatch(){
    StringBuilder one = new StringBuilder("Hello");
    StringBuilder two = new StringBuilder("Hello");
    assertEquals(0, one.compareTo(two));
}
```

接下来，让我们尝试两个不同的值：

```java
@Test
void whenUsingJavaEleven_givenTwoDifferentStringBuilders_thenCorrectlyIdentifyDifference(){
    StringBuilder one = new StringBuilder("Hello");
    StringBuilder two = new StringBuilder("World");
    assertNotSame(0, one.compareTo(two));
}
```

这比Java 11之前要容易得多。返回的整数告诉我们比较的两个是否按字典顺序不同。我们还能够知道差异是正数还是负数，这在某些应用中可能很有用。

### 4. 结论

在本文中，我们探讨了两种比较StringBuilder对象的方法。我们看到了，如果我们使用的Java版本早于11，我们将需要编写自己的比较方法。然而，从Java 11开始，我们提供了方便的compareTo()方法，它实现了相同的结果。

如常，示例的完整代码可以在GitHub上找到。