---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Java
  - Value-Based Classes
  - Project Valhalla
head:
  - - meta
    - name: keywords
      content: Java, Value-Based Classes, Project Valhalla, Immutable
------
# Java中基于值的类

在本教程中，我们将讨论Project Valhalla为Java生态系统带来的一个非常有趣的特性——基于值的类。基于值的类是在Java 8中引入的，并在后续版本中经历了重大的重构和增强。

### 2.1. Project Valhalla
Project Valhalla是由OpenJDK的一个实验性项目，旨在为Java添加新特性和能力。该计划的主要目标是添加对值类型、泛型专业化以及在保持完全向后兼容性的同时的性能改进的改进支持。

基于值的类是由Project Valhalla引入的一个特性，它将原始的、不可变值引入到Java语言中，而没有传统面向对象类带来的额外开销。

### 2.2. 原始类型和值类型
在我们给出基于值的类的正式定义之前，让我们先看看Java中的两个重要语义——原始类型和值类型。

**Java中的原始数据类型，或称为原始类型，是表示单个值的简单数据类型，并且不是对象。Java提供了八种这样的原始数据类型：_byte_、_short_、_int_、_long_、_float_、_double_、_char_和_boolean_。虽然这些是简单类型，但Java为我们提供了每种原始类型的包装类，以便我们以面向对象的方式与它们交互。**

还重要的是要记住，Java会自动执行装箱和拆箱操作，以高效地在对象和原始类型之间进行转换：

```java
List``<Integer>`` list = new ArrayList<>();
list.add(1); // 这是自动装箱
```

**原始类型驻留在栈内存中，而我们在代码中使用的对象驻留在堆内存中。**

Project Valhalla在Java生态系统中引入了一种新类型，它介于对象和原始类型之间，被称为值类型。值类型**是不可变类型，并且没有任何身份。**这些值类型也不支持继承。

值类型不是通过它们的引用来寻址，而是通过它们的值，就像原始类型一样。

### 2.3. 基于值的类
基于值的类是被设计为在Java中表现得像并封装值类型的类。JVM可以自由地在值类型和它的基于值的类之间切换，就像自动装箱和拆箱一样。因此，基于值的类也是没有身份的。

# 3. 基于值的类的特性
基于值的类代表简单的不可变值。一个基于值的类有几个特性，可以归类为一些通用主题。

### 3.1. 不可变性
基于值的类旨在代表不可变数据，类似于_int_等原始类型，并具有以下特性：

- 一个基于值的类始终是_final_
- 它只包含_final_字段
- 该类可以扩展_Object_类或不声明实例字段的抽象类层次结构

### 3.2. 对象创建
让我们了解如何创建基于值的类的新对象：

- 该类不声明任何可访问的构造函数
- 如果有可访问的构造函数，它们应该被标记为弃用以供移除
- 该类应该只通过工厂方法进行实例化。从工厂接收到的实例可能是新实例，也可能不是，调用代码不应该对其身份做出任何假设

### 3.3. 身份和_equals()_、_hashCode()_、_toString()_方法
基于值的类没有身份。由于它们仍然是Java中的类，我们需要理解从_Object_类继承的方法是如何发生的：

- _equals()_、_hashCode()_和_toString()_的实现完全基于其实例成员的值，而不是它们的身份，也不是任何其他实例的状态
- 我们仅根据对象的_equals()_检查认为两个对象相等，而不是基于引用相等性，即==
- 我们可以互换使用两个相等的对象，它们在任何计算或方法调用中应该产生相同的结果

### 3.4. 一些额外的注意事项
在使用基于值的类时，我们应该考虑一些额外的限制：

- 两个基于_equals()_方法相等的对象，在JVM中可能是不同的对象，也可能是相同的
- 我们不能确保监视器的独占所有权，使得实例不适合同步

# 4. 基于值的类的示例
### 4.1. JDK中的基于值的类
JDK中有几个类遵循基于值的类规范。

当它首次引入时，_java.util.Optional_和DateTime API（_java.time.LocalDateTime_）是基于值的类。从Java 16及更高版本开始，Java已经将所有原始类型的包装类定义为基于值的，例如_Integer_和_Long_。

这些类有来自_jdk.internal_包的_@ValueBased_注解：

```java
@jdk.internal.ValueBased
public final class Integer extends Number implements Comparable``<Integer>``, Constable, ConstantDesc {
    // JDK中的Integer类
}
```

### 4.2. 自定义基于值的类
让我们创建一个遵循上面定义的基于值的类规范的自定义类。以我们的示例来说，我们采用一个_Point_类，它标识3D空间中的一个点。该类有3个整型字段_x_、_y_和_z_。

我们可以认为_Point_定义是一个很好的基于值的类候选，因为空间中的一个特定点是唯一的，只能通过它的值来引用。它是恒定的且明确的，就像值为302的整数一样。

我们将通过将类定义为_final_，并将属性_x_、_y_和_z_定义为final来开始：

```java
public final class Point {
    private final int x;
    private final int y;
    private final int z;
```

```java
    // 不可访问的构造函数
    private Point(int x, int y, int z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    // ...
}
```

现在，让我们事先创建一个_origin(0, 0, 0)_实例，并在每次调用创建点时返回相同的实例，如果_x = 0_、_y = 0_和_z = 0_：

```java
private static Point ORIGIN = new Point(0, 0, 0);
```

我们现在需要以工厂方法的形式提供一种对象创建机制：

```java
public static Point valueOfPoint(int x, int y, int z) {
    // 如果是原点，则返回缓存的实例，或者是新实例
    if (isOrigin(x, y, z)) {
        return ORIGIN;
    }
    return new Point(x, y, z);
}

// 检查一个点是否是原点
private static boolean isOrigin(int x, int y, int z) {
    return x == 0 && y == 0 && z == 0;
}
```

工厂方法_valueOfPoint()_可以根据参数返回新实例或缓存的实例。**这迫使调用代码不对对象的状态做出任何假设或比较两个实例的引用。**

最后，我们应该基于实例字段的值定义_equals()_方法：

```java
@Override
public boolean equals(Object other) {
    if (other == null || getClass() != other.getClass()) {
        return false;
    }
    Point point = (Point) other;
    return x == point.x && y == point.y && z == point.z;
}

@Override
public int hashCode() {
    return Objects.hash(x, y, z);
}
```

我们现在有一个可以表现为基于值的类的_Point_类。我们可以在从_jdk.internal_包导入后将_@ValueBased_注解放到类上。然而，这在我们的案例中并不是必需的。

现在让我们测试两个表示同一空间点(1,2,3)的实例是否相等：

```java
@Test
public void givenValueBasedPoint_whenCompared_thenReturnEquals() {
    Point p1 = Point.valueOfPoint(1,2,3);
    Point p2 = Point.valueOfPoint(1,2,3);

    Assert.assertEquals(p1, p2);
}
```

此外，为了这个练习，让我们也看看当创建两个原点实例时，如果按引用比较，两个实例是否相同：

```java
@Test
public void givenValueBasedPoint_whenOrigin_thenReturnCachedInstance() {
    Point p1 = Point.valueOfPoint(0, 0, 0);
    Point p2 = Point.valueOfPoint(0, 0, 0);

    // 对于基于值的类，以下不应该被假设
    Assert.assertTrue(p1 == p2);
}
```

# 5. 基于值的类的优势
现在我们知道了基于值的类是什么以及如何定义一个，让我们理解为什么我们可能需要基于值的类。

作为Valhalla规范的一部分，基于值的类仍然处于实验阶段并持续发展。因此，这类类的好处可能会随着时间而变化。

截至目前，使用基于值的类最重要的好处是内存利用。由于它们没有基于引用的身份，基于值的类在内存效率上更高。**此外，JVM可以重用现有实例或根据需要创建新实例，从而减少内存占用**此外，JVM可以重用现有实例或根据需要创建新实例，从而减少内存占用。** 另外，它们不需要同步，这提高了整体性能，尤其是在多线程应用程序中。

## 6. 基于值的类与其他类型的不同
### 6.1. 不可变类
Java中的不可变类与基于值的类有很多共同之处。因此，理解它们之间的区别非常重要。

虽然基于值的类是新的并且是正在进行的实验特性的一部分，但不可变类一直是Java生态系统的核心和重要组成部分已经有很长时间了。**String类、枚举以及Java中的包装类，如Integer类，都是不可变类的例子。**

**不可变类不像基于值的类那样没有身份。** 具有相同状态的不可变类实例是不同的，我们可以根据引用等式来比较它们。**基于值的类的实例没有基于引用等式的概念：**

**不可变类可以自由地提供可访问的构造函数，并且可以具有多个属性和复杂的行为。** 然而，基于值的类代表简单值，并且不定义具有依赖属性的复杂行为。

**最后，我们应该注意到，根据定义，基于值的类是不可变的，但反之则不然。**

### 6.2. 记录
Java在Java 14中引入了记录的概念，作为传递不可变数据对象的简便方式。记录和基于值的类实现了不同的目的，即使它们在行为和语义上看起来相似。

**记录和基于值的类之间最明显的区别是记录具有公共构造函数，而基于值的类则没有。**

# 7. 结论
在本文中，我们讨论了Java中的基于值的类和值类型的概念。我们触及了基于值的类必须遵守的重要特性以及它们带来的好处。我们还讨论了基于值的类与Java中的类似概念，如不可变类和记录之间的差异。

如往常一样，本文中使用的所有代码片段都可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/0f08492941896785c081f90c7a231caa?s=50&r=g)![img](https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK