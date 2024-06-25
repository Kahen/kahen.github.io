---
date: 2024-06-26
category:
  - Java
  - BigDecimal
tag:
  - Java
  - BigDecimal
  - ZERO
  - 性能
head:
  - - meta
    - name: keywords
      content: Java, BigDecimal, 性能优化
------
# BigDecimal.ZERO 与 new BigDecimal(0) | Baeldung

当我们使用 BigDecimal 处理数值零时，我们通常面临两种类似的方法：使用 BigDecimal.ZERO 或者创建一个新的 BigDecimal 对象 new BigDecimal(0)。本文将探讨这两种方法之间微妙但重要的差异，并讨论何时选择其中一种。

首先，让我们快速了解如何比较两个 BigDecimal 对象。BigDecimal 类实现了 Comparable 接口，提供了使用 equals() 方法或 compareTo() 方法比较两个 BigDecimal 的灵活性。但是，重要的是要认识到这两种方法在比较两个 BigDecimal 实例时进行的是不同的比较。

假设我们有两个 BigDecimal 对象 bd1 和 bd2。如果 bd1.compareTo(bd2) == 0，这只表明两个 BigDecimal 的数值相等。例如，BigDecimal 42.00 和 42.0000 在数值上是相等的，但它们的小数位数不同：

```java
BigDecimal bd1 = new BigDecimal("42.00");
BigDecimal bd2 = new BigDecimal("42.0000");
assertEquals(0, bd1.compareTo(bd2));
```

然而，需要注意的是，BigDecimal 中的 equals() 方法是根据数值和小数位数来评估相等性的。因此，使用 equals() 方法比较 BigDecimal 42.00 和 42.0000 会得出它们不相等的结果：

```java
BigDecimal bd1 = new BigDecimal("42.00");
BigDecimal bd2 = new BigDecimal("42.0000");

assertNotEquals(bd1, bd2);
```

接下来，让我们使用 equals() 方法比较 BigDecimal.ZERO 和 new BigDecimal(0)：

```java
BigDecimal zero = BigDecimal.ZERO;
BigDecimal zero0 = new BigDecimal(0);
assertEquals(zero, zero0);
```

如上测试所示，BigDecimal.ZERO 和 new BigDecimal(0) 在数值和小数位数上都相等。因此，它们在数学上是相同的。实际上，这意味着在计算中使用它们时没有可感知的差异。

接下来，让我们看看这两个对象是如何实例化的。

### BigDecimal.ZERO 的内部工作原理

BigDecimal.ZERO 是 BigDecimal 类中的一个常量字段：

```java
public static final BigDecimal ZERO = ZERO_THROUGH_TEN[0];
```

如我们所见，它取自一个名为 ZERO_THROUGH_TEN 的数组的第一个元素：

```java
private static final BigDecimal[] ZERO_THROUGH_TEN = {
    new BigDecimal(BigInteger.ZERO, 0,  0, 1),
    new BigDecimal(BigInteger.ONE, 1,  0, 1),
    new BigDecimal(BigInteger.TWO, 2,  0, 1),
    ...
    new BigDecimal(BigInteger.TEN, 10, 0, 2),
};
```

BigDecimal 预先实例化了从 0 到 10 的十一个对象。因此，BigDecimal.ZERO 和数组中的其他实例已经准备好使用，无需额外的对象创建。

因此，每当我们使用 BigDecimal.ZERO 时，我们引用的是同一个对象：

```java
BigDecimal z1 = BigDecimal.ZERO;
BigDecimal z2 = BigDecimal.ZERO;
assertSame(z1, z2);
```

### new BigDecimal(0) 的内部工作原理

另一方面，new BigDecimal(0) 通过指定值 0 来创建一个新的 BigDecimal 对象：

```java
public BigDecimal(int val) {
    this.intCompact = val;
    this.scale = 0;
    this.intVal = null;
}
```

由于它调用了构造函数，每次我们调用 new BigDecimal(0) 时，都会创建一个新的对象：

```java
BigDecimal z1 = new BigDecimal(0);
BigDecimal z2 = new BigDecimal(0);
assertNotSame(z1, z2);
```

### 我们应该采取哪种方法？

BigDecimal.ZERO 和 new BigDecimal(0) 两种方法都创建了不可变的 BigDecimal 对象，确保了线程安全性和一致性。然而，如前所述，BigDecimal.ZERO 有额外的优势，即重用共享的常量对象。当 BigDecimal.ZERO 在代码库的多个部分中使用时，使用了相同的对象引用，避免了不必要的对象创建。

此外，选择 BigDecimal.ZERO 和 new BigDecimal(0) 之间的主要考虑因素之一是代码传达的清晰度和意图。BigDecimal.ZERO 因其可读性和简洁性而广受欢迎。它的自解释性使代码更具表现力，并与表示 0 的清晰意图保持一致。

因此，当我们的意图是拥有一个表示值 0 的 BigDecimal 对象时，选择 BigDecimal.ZERO 是明智的。

### 结论

在本文中，我们首先学习了 BigDecimal.ZERO 和 new BigDecimal(0) 方法如何实例化 BigDecimal 实例。然后，我们从可读性和对象重用的角度讨论了我们应该采取哪种方法。

BigDecimal.ZERO 以其简洁的语法、清晰的意图和共享对象引用的潜力脱颖而出。因此，如果我们想要一个表示值 0 的 BigDecimal 对象，BigDecimal.ZERO 方法应该是我们的首选。

如常，示例的完整源代码可在 GitHub 上找到。