---
date: 2022-04-01
category:
  - Java
  - String
tag:
  - Java
  - String
  - StringBuilder
  - StringBuffer
  - 引用传递
head:
  - - meta
    - name: keywords
      content: Java, String, 引用传递, StringBuilder, StringBuffer
---
# Java中通过引用传递字符串

1. 概述

有时，我们可能希望在Java中的方法内传递并修改一个字符串。例如，当我们想要将另一个字符串附加到输入的字符串上。然而，输入变量在方法内部有其作用域。此外，字符串是不可变的。因此，如果我们不理解Java的内存管理，找到解决方案就不清楚了。

在本教程中，我们将理解输入字符串是如何传递给方法的。我们将看到如何使用StringBuilder以及如何通过创建新对象来保持不变性。

2. 按值传递还是按引用传递

作为面向对象的语言，Java可以定义原始类型和对象。它们可以存储在栈或堆内存中。此外，它们可以通过值或引用传递给方法。

### 2.1 原始类型和对象

**原始类型在栈内存中分配。当传递给方法时，我们得到原始类型值的一个副本。**

**对象是类模板的实例。它们存储在堆内存中。** 然而，在方法内部，程序可以访问它们，因为它有一个指向堆内存地址的引用。**与原始类型类似，当传递对象给方法时，我们得到对象引用（我们可以将其视为指针）的一个副本。**

尽管传递原始类型或对象之间存在差异，但在两种情况下，变量或对象在方法内部都有其作用域。在两种情况下，发生的都是按共享调用，我们不能直接更新原始值或引用。**因此，参数总是被复制。**

### 2.2 字符串不变性

字符串是Java中的一个类，而不是原始类型。因此，给定其运行时实例，我们在传递它给方法时会得到一个引用。

此外，它是不可变的。**因此，即使我们想在方法内操作字符串，我们也不能修改它，除非我们创建一个新的。**

3. 使用案例

在深入问题一般解决方案之前，让我们定义一个主要的使用案例。

假设我们想在方法内追加一个输入字符串。让我们测试方法执行前后会发生什么：

```java
@Test
void givenAString_whenPassedToVoidMethod_thenStringIsNotModified() {
    String s = "hello";
    concatStringWithNoReturn(s);
    assertEquals("hello", s);
}

void concatStringWithNoReturn(String input) {
    input += " world";
    assertEquals("hello world", input);
}
```

**字符串在concatStringWithNoReturn()方法内得到了一个新的值。然而，我们在方法的作用域之外仍然有原始值。**

自然地，一个逻辑解决方案是让一个方法返回一个新的字符串：

```java
@Test
void givenAString_whenPassedToMethodAndReturnNewString_thenStringIsModified() {
    String s = "hello";
    assertEquals("hello world", concatString(s));
}

String concatStringWithReturn(String input) {
    return input + " world";
}
```

值得注意的是，我们避免了副作用，同时安全地返回了一个新的实例。

4. 使用StringBuilder或StringBuffer

**尽管字符串连接是一个选项，但使用StringBuilder（或线程安全的StringBuffer版本）是更好的实践。**

### 4.1 StringBuilder

```java
@Test
void givenAString_whenPassStringBuilderToVoidMethod_thenConcatNewStringOk() {
    StringBuilder builder = new StringBuilder("hello");
    concatWithStringBuilder(builder);

    assertEquals("hello world", builder.toString());
}

void concatWithStringBuilder(StringBuilder input) {
    input.append(" world");
}
```

我们附加到构建器的字符串是暂时存储在一个字符数组中的。因此，与字符串连接相比，这种方法的主要好处是性能方面的。因此，我们不会每次都创建一个新的字符串。相反，我们等到我们有了想要的序列，然后，在那一刻，制作所需的字符串。

### 4.2 StringBuffer

我们还有线程安全的版本，StringBuffer。让我们也看看这个在行动中：

```java
@Test
void givenAString_whenPassStringBufferToVoidMethod_thenConcatNewStringOk() {
    StringBuffer builder = new StringBuffer("hello");
    concatWithStringBuffer(builder);

    assertEquals("hello world", builder.toString());
}

void concatWithStringBuffer(StringBuffer input) {
    input.append(" world");
}
```

如果我们需要同步，这是我们想要的类。自然，这可能会减慢进程，所以让我们首先了解它是否值得。

5. 使用对象属性

如果一个字符串是一个对象属性怎么办？

让我们定义一个我们可以用于测试的简单类：

```java
public class Dummy {

    String dummyString;
    // getter和setter
}
```

### 5.1 使用setter修改字符串状态

起初，我们可能会考虑简单地使用setter来修改对象的字符串状态：

```java
@Test
void givenObjectWithStringField_whenSetDifferentValue_thenObjectIsModified() {
    Dummy dummy = new Dummy();
    assertNull(dummy.getDummyString());
    modifyStringValueInInputObject(dummy, "hello world");
    assertEquals("hello world", dummy.getDummyString());
}

void modifyStringValueInInputObject(Dummy dummy, String dummyString) {
    dummy.setDummyString(dummyString);
}
```

值得注意的是，我们将更新堆内存中原始对象的一个副本（仍然指向实际值）。

然而，这不是一个好的实践。它隐藏了字符串的变化。此外，如果多个线程试图修改对象，我们可能会有同步问题。

**总的来说，只要可能，我们应该寻求不变性，并使方法返回一个新对象。**

### 5.2 创建一个新对象

当应用一些业务逻辑时，使方法返回新对象是一个好习惯。此外，我们还可以使用我们之前看到的StringBuilder模式来设置属性。让我们将这个包装在一个测试用例中：

```java
@Test
void givenObjectWithStringField_whenSetDifferentValueWithStringBuilder_thenSetStringInNewObject() {
    assertEquals("hello world", getDummy("hello", "world").getDummyString());
}

Dummy getDummy(String hello, String world) {
    StringBuilder builder = new StringBuilder();

    builder.append(hello)
      .append(" ")
      .append(world);

    Dummy dummy = new Dummy();
    dummy.setDummyString(builder.toString());

    return dummy;
}
```

尽管这是一个简化的例子，我们可以看到代码更具可读性。此外，我们避免了副作用并保持了不变性。**任何方法的输入信息都是我们用来构建一个明确定义的新对象实例的东西。**

6. 结论

在这篇文章中，我们看到了如何在保持不变性和避免副作用的同时改变方法的输入字符串。我们看到了如何使用StringBuilder并应用这种模式来创建新对象。

正如文章中所展示的代码，它在GitHub上也是可用的。