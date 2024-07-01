---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - int to Long
  - data type conversion
head:
  - - meta
    - name: keywords
      content: Java, int to Long, data type conversion, autoboxing, Long.valueOf(), Long constructor
---
# Java中将int转换为Long的方法

数据类型转换是任何编程语言中的一个重要部分。在Java中，开发者经常需要将int转换为Long，反之亦然，正如我们文章中所展示的。虽然这个操作看起来很简单，但Java提供了几种具有独特特性和使用场景的方法。

在本教程中，我们将深入探讨这些方法，清晰地理解每种方法的工作原理以及何时使用它们。

### 2. 基础：理解int和Long
在我们探索转换方法之前，我们首先需要理解int和Long是什么。int和Long都是Java中用于存储数值的不同数据类型。

int数据类型是一个32位的有符号二进制补码整数，可以存储的最小值为-2^31，最大值为2^31-1。

相比之下，Long是一个64位的二进制补码整数，可以存储的值从-2^63到2^63-1。当int提供的范围包括不够用时，我们通常会使用Long。

### 3. 自动装箱：隐式转换
Java在其第五个版本中引入了一个名为自动装箱的特性，它允许在原始类型和它们对应的包装类之间自动转换。

让我们使用自动装箱将int直接转换为Long：
```java
int intTen = 10;
Long longTen = (long) intTen;
```
我们声明一个int变量intTen，并给它赋值为10。然后我们声明一个Long变量longTen，并将它的值设置为intTen。intTen前面的(long)是一个类型转换运算符，它告诉编译器在将其赋值给longTen之前将intTen转换为long。这个过程是自动的，因此称为自动装箱。

### 4. 使用Long.valueOf()：包装器类方法
Java中的Long类是一个包装类，它提供了几种处理long值的实用方法。其中之一是valueOf()方法，它可以接收一个int并返回一个Long对象。

这是一种直接而有效的方法将int转换为Long：
```java
int intTen = 10;
Long longTen = Long.valueOf(intTen);
```
我们使用Long类的valueOf()方法将int值转换为Long。valueOf()方法返回一个代表指定int值的Long实例。这个方法是Long类的一部分，它是Java中long数据类型的包装类。

让我们看看这如何应用于Integer类型的值：
```java
Integer integerTen = 10;
Long integerToLongTen = Long.valueOf(integerTen);
```

### 5. 使用new Long()构造函数：对象创建方法
另一种将int转换为Long的方法是使用Long构造函数。这种方法从一个int创建一个新的Long对象。然而，由于创建新对象的开销，这种方法效率较低：

```java
int intTen = 10;
Long longTen = new Long(intTen);
```
我们使用Long构造函数创建一个新的Long对象。Long构造函数接受一个int值，并创建一个新的Long对象，表示相同的数值。虽然这种方法简单直接，但由于对象创建开销，我们应该避免在性能关键的应用中使用它，因此静态工厂valueOf()通常是更好的选择。

如果我们有一个Integer类型的值要转换，结果也是相同的：
```java
Integer integerTen = 10;
Long integerToLongTen = new Long(integerTen);
```

### 6. 使用Long.parseLong()：字符串转换方法
我们通常使用Long.parseLong()方法将String转换为Long。然而，我们也可以通过先将int转换为String来使用它：

```java
int intTen = 10;
Long longTen = Long.parseLong(String.valueOf(intTen));
```
我们首先使用String.valueOf()方法将int转换为String。然后我们将这个String传递给Long.parseLong()方法，该方法将String解析为long值，并返回表示这个值的Long对象。这种方法有点绕弯子，但在特定场景下很有帮助，比如输入是String格式，比如用户输入或从文件中读取的数据。

### 7. 使用Integer类型的longValue()内部方法
当处理Integer类型时，我们可以使用它从Number类继承的longValue()内部方法，该方法在转换为long类型后返回此对象所表示的数值：

```java
Integer integerTen = 10;
Long integerLongValueTen = integerTen.longValue();
Long longValueOfTen = Long.valueOf(integerTen.longValue());
```
然而，如果更倾向于在转换之前对Integer值进行空值检查，我们可以使用以下方法：

```java
Long integerToValueOfLongNullCheck = Optional.ofNullable(integerTen)
    .map(Long::valueOf)
    .orElse(null);

Long integerToLongValueNullCheck = Optional.ofNullable(integerTen)
    .map(Integer::longValue)
    .orElse(null);
```

### 8. 额外考虑
当从int转换到Long时，需要注意的是，我们是从较小的数据类型转换到较大的数据类型。这意味着在转换过程中没有丢失数据的风险。

然而，反向操作（从Long到int）可能会导致数据丢失，如果Long值大于Integer.MAX_VALUE，即32位可以表示的最大正整数值，其结果为2^31-1（即2147483647）。

另外，尽管Long数据类型可以容纳更大的值，但它消耗更多的内存。Java中的int占用4字节的内存，而Long占用8字节。因此，在决定使用Long而不是int时，考虑内存影响是很重要的。

### 9. 深入理解底层机制
为了完全理解这些转换方法，了解底层机制是有益的。例如，自动装箱是Java编译器提供的语法糖。它自动插入必要的代码，以在原始类型和相应的包装类之间进行转换。这个特性简化了代码，使其更易于阅读。

另一方面，valueOf()方法和Long构造函数是Long类的一部分，Long类是long原始类型的包装类。Java中的包装类提供了一种将原始数据类型用作对象的方式。它们提供了几种实用方法，包括我们在示例中使用的转换方法。

值得注意的是，由于内部缓存从-128到127的值，valueOf()方法因其对象可重用性、提高的性能、最小化的垃圾收集、代码一致性、与自动装箱的一致性以及持续的适用性而受到青睐，特别是考虑到new Long()构造函数在最近Java版本中的弃用。

通常用于String到Long转换的parseLong()方法也可以处理int到Long的转换。然而，它需要先将int转换为String的额外步骤。这种方法有点绕弯子，但在处理以字符串格式输入的数字时很有用，例如用户输入或从文件中读取的数据。

### 10. 结论
我们可以以多种方式将Java中的int转换为Long，每种方法都有其优势和特定的使用场景。自动装箱是一种简单直接的方法，而Long.valueOf()和Long.parseLong()提供了更明确的转换。Long构造函数也可以使用，但由于对象创建开销，效率较低。

选择最适合我们需求和代码上下文的方法至关重要。

如常，本文的完整代码示例可以在GitHub上找到。