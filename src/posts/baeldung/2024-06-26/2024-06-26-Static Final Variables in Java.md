---
date: 2024-06-26
category:
  - Java
  - 编程
tag:
  - static
  - final
  - 常量
head:
  - - meta
    - name: keywords
      content: Java, static final, 常量, 编程
---
# Java中的静态最终变量

简单来说，静态最终变量，也称为常量，是Java中创建一个在初始化后不会改变的类变量的关键特性。然而，在静态最终对象引用的情况下，对象的状态可能会改变。

在本教程中，我们将学习如何声明和初始化常量变量。我们还将讨论它们的用途。

静态关键字将变量与类本身关联，而不是类的实例。

此外，最终关键字使变量不可变。其值在初始化后不能改变。

两个关键字的组合有助于创建常量。它们通常使用大写字母和下划线来分隔单词。

### 2.1. 初始化静态最终变量

以下是如何声明静态最终字段并赋值的示例：

```java
class Bike {
    public static final int TIRE = 2;
}
```

在这里，我们创建了一个名为Bike的类，一个名为TIRE的类常量，并将其初始化为2。

或者，我们可以通过静态初始化块来初始化变量：

```java
public static final int PEDAL;
static {
    PEDAL = 5;
}
```

这将无误编译：

```java
@Test
void givenPedalConstantSetByStaticBlock_whenGetPedal_thenReturnFive() {
    assertEquals(5, Bike.PEDAL);
}
```

常量变量的一些关键规则：

- 我们必须在声明时或在静态初始化块中初始化
- 我们不能在初始化后重新分配它

尝试在初始化范围之外初始化它将导致异常。

**此外，我们不能通过构造函数来初始化它，因为构造函数是在我们创建类的实例时调用的。静态变量属于类本身，而不是个别实例。**

### 2.2. 静态最终对象

我们也可以创建静态最终对象引用：

```java
public static final HashMap`<String, Integer>` PART = new HashMap<>();
```

由于PART引用是常量，它不能被重新分配：

```java
PART = new HashMap<>();
```

上述代码会抛出异常，因为我们为不可变变量分配了一个新的引用。

然而，我们可以修改对象的状态：

```java
@Test
void givenPartConstantObject_whenObjectStateChanged_thenCorrect() {
    Bike.PART.put("seat", 1);
    assertEquals(1, Bike.PART.get("seat"));
    Bike.PART.put("seat", 5);
    assertEquals(5, Bike.PART.get("seat"));
}
```

在这里，我们可以改变seat的值，尽管最初设置为1。尽管PART是一个常量引用，我们仍然可以改变其内容。只有引用本身是不可变的。

**值得注意的是，最终关键字只使原始类型、String和其他不可变类型成为常量。在对象的情况下，它只使引用常量，但对象的状态可以被改变。**

## 3. 常量为什么有用

使用静态最终变量有几个优点。**它提供了更好的性能，因为在编译时内联其值，而不是在运行时查找值。**

此外，将可重用的值声明为常量可以避免重复字面量。常量可以在代码的任何地方重用，这取决于访问修饰符。具有私有访问修饰符的常量只能在类内部使用。

此外，原始类型或String类型的静态最终变量是线程安全的。当在多个线程之间共享时，其值保持不变。

最后，给常量值赋予语义名称可以增加代码的可读性。它还使代码自文档化。例如，java.math包提供了PI这样的常量：

```java
@Test
void givenMathClass_whenAccessingPiConstant_thenVerifyPiValueIsCorrect() {
    assertEquals(3.141592653589793, Math.PI);
}
```

Math.PI以可重用的方式封装了数学常数值。

## 4. 结论

在本文中，我们学习了如何声明和初始化常量变量。我们也强调了一些使用情况。

最终静态变量定义了一个类级常量。然而，静态最终对象仍然可能是可变的，即使引用不能改变。

如常，示例的完整源代码可以在GitHub上找到。