---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Java
  - Range
  - Interval
head:
  - - meta
    - name: keywords
      content: Java, Range, Interval, Integer, Check
---
# 如何使用Java检查整数是否存在于给定范围内

在本教程中，我们将探讨一些检查整数是否存在于给定范围内的方法。我们将使用运算符以及几个工具类来实现这一点。

## 2. 范围类型

在我们使用这些方法之前，我们需要清楚我们所谈论的是什么类型范围。在本教程中，我们将专注于这四种有界范围类型：

- **封闭范围** – **包括其下限和上限**
- **开放范围** – **不包括其下限和上限**
- **左开右闭范围** – **包括其上限并排除其下限**
- **左闭右开范围** – **包括其下限并排除其上限**

例如，假设我们想知道整数20是否出现在这两个范围内：_R1 = [10, 20)_，一个左闭右开范围，和 _R2 = (10, 20]_，一个左开右闭范围。由于 _R1_ 不包含其上限，整数20仅存在于 _R2_ 中。

## 3. 使用 _`<_ 和 _<=_ 运算符

我们的目标是确定一个数字是否在给定的下限和上限之间。我们将首先使用基本的Java运算符来检查这一点。

让我们定义一个类，用于检查所有四种类型范围：

```java
public class IntRangeOperators {

    public static boolean isInClosedRange(Integer number, Integer lowerBound, Integer upperBound) {
        return (lowerBound <= number && number <= upperBound);
    }

    public static boolean isInOpenRange(Integer number, Integer lowerBound, Integer upperBound) {
        return (lowerBound < number && number < upperBound);
    }

    public static boolean isInOpenClosedRange(Integer number, Integer lowerBound, Integer upperBound) {
        return (lowerBound < number && number <= upperBound);
    }

    public static boolean isInClosedOpenRange(Integer number, Integer lowerBound, Integer upperBound) {
        return (lowerBound <= number && number < upperBound);
    }
}
```

在这里，**通过改变运算符以包含或排除界限，我们可以调整区间为开放、封闭或半开放。**

让我们测试我们的 _static_ _isInOpenClosedRange()_ 方法。我们将指定左开右闭范围 _(10,20]_ 通过传入10作为下限和20作为上限：

```java
assertTrue(IntRangeClassic.isInOpenClosedRange(20, 10, 20));

assertFalse(IntRangeClassic.isInOpenClosedRange(10, 10, 20));
```

在第一次测试中，我们成功验证了整数20存在于 _(10,20]_ 范围内，该范围包括其上限。然后我们确认整数10不存在于同一范围内，该范围排除了其下限。

## 4. 使用范围类

作为使用Java运算符的替代方案，我们还可以使用表示范围的实用工具类。使用预定义类的主要用途是 **范围类提供了一些或全部上述范围类型的即用型实现。**

此外，**我们可以配置一个范围对象，用我们定义的界限，并在其他方法或类中重用该对象。** 通过一次定义范围，如果我们需要在整个代码库中对同一范围进行多次检查，我们的代码就不太可能出错。

另一方面，我们将要查看的两个范围类在外部库中，我们必须在项目中导入它们之后才能使用它们。

### 4.1. 使用 _java.time.temporal.ValueRange_

不需要导入外部库的范围类是 _java.time.temporal.ValueRange_，在JDK 1.8中引入：

```java
public class IntRangeValueRange {

    public boolean isInClosedRange(Integer number, Integer lowerBound, Integer upperBound) {
        final ValueRange range = ValueRange.of(lowerBound, upperBound);
        return range.isValidIntValue(number);
    }

    public boolean isInOpenRange(Integer number, Integer lowerBound, Integer upperBound) {
        final ValueRange range = ValueRange.of(lowerBound + 1, upperBound - 1);
        return range.isValidIntValue(number);
    }

    public boolean isInOpenClosedRange(Integer number, Integer lowerBound, Integer upperBound) {
        final ValueRange range = ValueRange.of(lowerBound + 1, upperBound);
        return range.isValidIntValue(number);
    }

    public boolean isInClosedOpenRange(Integer number, Integer lowerBound, Integer upperBound) {
        final ValueRange range = ValueRange.of(lowerBound, upperBound - 1);
        return range.isValidIntValue(number);
    }
}

```

如上所示，我们通过将 _lowerBound_ 和 _upperBound_ 传递给 _static_ _of()_ 方法来创建 _ValueRange_ 对象。然后我们使用每个对象的 _isValidIntValue()_ 方法检查 _number_ 是否存在于每个范围内。

我们应该注意到 **_ValueRange_ 仅支持封闭范围检查开箱即用**。因此，**我们必须通过增加 _lowerBound_ 来验证左开范围，并通过对 _upperBound_ 减一来验证右开范围**，正如我们上面所做的。

### 4.2. 使用Apache Commons

让我们继续使用我们可以从第三方库中使用的某些范围类。首先，我们将添加Apache Commons依赖项到我们的项目中：

```xml
`<dependency>``
    ``<groupId>``org.apache.commons``</groupId>``
    ``<artifactId>``commons-lang3``</artifactId>``
    ``<version>``3.12.0``</version>``
``</dependency>``
```

在这里，我们使用Apache Commons _Range_ 类实现与之前相同的行为：

```java
public class IntRangeApacheCommons {

    public boolean isInClosedRange(Integer number, Integer lowerBound, Integer upperBound) {
        final Range````````<Integer>```````` range = Range.between(lowerBound, upperBound);
        return range.contains(number);
    }

    public boolean isInOpenRange(Integer number, Integer lowerBound, Integer upperBound) {
        final Range````````<Integer>```````` range = Range.between(lowerBound + 1, upperBound - 1);
        return range.contains(number);
    }

    public boolean isInOpenClosedRange(Integer number, Integer lowerBound, Integer upperBound) {
        final Range````````<Integer>```````` range = Range.between(lowerBound + 1, upperBound);
        return range.contains(number);
    }

    public boolean isInClosedOpenRange(Integer number, Integer lowerBound, Integer upperBound) {
        final Range````````<Integer>```````` range = Range.between(lowerBound, upperBound - 1);
        return range.contains(number);
    }
}
```

与 _ValueRange_ 的 _of()_ 方法一样，我们传递 _lowerBound_ 和 _upperBound_ 到 _Range_ 的 _static between()_ 方法来创建 _Range_ 对象。然后我们使用 _contains()_ 方法检查 _number_ 是否存在于每个对象的范围内。

**Apache Commons _Range_ 类也仅支持封闭间隔**，但我们再次调整了 _lowerBound_ 和 _upperBound_，正如我们对 _ValueRange_ 所做的。

此外，作为一个泛型类，_Range_ 不仅可以用于 _Integer_，还可以用于任何实现了 _Comparable_ 的其他类型。

### 4.3. 使用Google Guava

最后，让我们添加Google Guava依赖项到我们的项目中：

```xml
`<dependency>`
    ``<groupId>``com.google.guava``</groupId>``
    ``<artifactId>``guava``</artifactId>``
    ``<version>``33.0.0-jre``</version>``
``</dependency>``
```

我们可以使用Guava的 _Range_ 类来重新实现与之前相同的行为：

```java
public class IntRangeGoogleGuava {

    public boolean isInClosedRange(Integer number, Integer lowerBound, Integer upperBound) {
        final Range````````<Integer>```````` range = Range.closed(lowerBound, upperBound);
        return range.contains(number);
    }

    public boolean isInOpenRange(Integer number, Integer lowerBound, Integer upperBound) {
        final Range````````<Integer>```````` range = Range.open(lowerBound, upperBound);
        return range.contains(number);
    }

    public boolean isInOpenClosedRange(Integer number, Integer lowerBound, Integer upperBound) {
        final Range````````<Integer>```````` range = Range.openClosed(lowerBound, upperBound);
        return range.contains(number);
    }

    public boolean isInClosedOpenRange(Integer number, Integer lowerBound, Integer upperBound) {
        final Range````````<Integer>```````` range = Range.closedOpen(lowerBound, upperBound);
        return range.contains(number);
    }
}
```

如上所示，Guava的 _Range_ 类有四种不同的方法来创建我们之前讨论的每种范围类型。也就是说，与其他我们迄今为止看到的范围类不同，**Guava的 _Range_ 类本地支持开放和半开放范围**。例如，要指定一个不包含其上限的半开区间，我们将 _lowerBound_ 和 _upperBound_ 传递给 _static_ _closedOpen()_ 方法。对于不包含其下限的半开区间，我们使用了 _openClosed()_。然后我们使用 _contains()_ 方法检查 _number_ 是否存在于每个范围内。

## 5. 结论

在本文中，我们学习了如何使用基本运算符和范围类来检查一个整数是否落在给定的范围内。我们还探讨了各种方法的优缺点。

如常，这些示例的源代码可在GitHub上找到。