---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - if statement
  - switch statement
  - functional programming
head:
  - - meta
    - name: keywords
      content: Java, if statement, switch, functional programming, code readability
------
# Java中if语句中多个“或”条件的格式化

在编写if语句时，我们可能需要使用逻辑运算符如AND或OR来设置多个条件。这可能不是一个好的设计，会影响代码的可读性和认知复杂性。

在本教程中，我们将看到在if语句中格式化多个值条件的替代方法。

## 2. 我们可以避免if语句吗？
假设我们有一个电子商务平台，并为特定月份出生的人设置折扣。让我们看看以下代码片段：

```java
if (month == 10 || month == 11) {
    // doSomething()
} else if (month == 4 || month == 5) {
    // doSomething2()
} else {
    // doSomething3()
}
```

这可能导致一些难以阅读的代码。即使我们有良好的测试覆盖率，代码也可能难以维护，因为它迫使我们，例如，把不同的条件放在一起以执行特定的操作。

### 2.1. 使用干净的代码
我们可以应用模式来替换许多if语句。例如，我们可以将if的多个条件逻辑移动到一个类或枚举中。在运行时，我们将根据客户端输入在接口之间切换。同样，我们可以看看策略模式。

这并不严格与格式化有关，通常会导致重新思考逻辑。尽管如此，这是我们可以考虑到的，以改进我们的设计。

### 2.2. 改进方法语法
**然而，只要代码易于阅读且易于维护，使用if / else逻辑并没有什么问题。** 例如，让我们考虑以下代码片段：

```java
if (month == 8 || month == 9) {
    return doSomething();
} else {
    return doSomethingElse();
}
```

作为第一步，我们可以避免使用else部分：

```java
if (month == 8 || month == 9) {
    return doSomething();
}

return doSomethingElse();
```

还可以通过使用java.time包中的枚举来改进一些其他代码：

```java
if (month == OCTOBER || month == NOVEMBER || month == DECEMBER) {
    return doSomething();
}
// ...
```

这些都是简单但有效的代码改进。因此，在应用复杂模式之前，我们首先应该看看是否可以提高代码的可读性。

我们还将看到如何使用函数式编程。在Java中，这从版本8开始应用，使用lambda表达式语法。

## 3. 测试传说
按照电子商务折扣示例，我们将创建测试并检查折扣月份中的值。例如，从10月到12月。否则我们断言为假。我们将设置随机月份，这些月份要么在允许的月份内，要么不在：

```java
Month monthIn() {
    return Month.of(rand.ints(10, 13)
      .findFirst
      .orElse(10));
}

Month monthNotIn() {
    return Month.of(rand.ints(1, 10)
      .findFirst
      .orElse(1));
}
```

可能有多个if条件，尽管，为了简单起见，我们将假设只有一个if / else语句。

## 4. 使用Switch
**使用if逻辑的替代方法是switch命令。** 让我们看看我们如何在示例中使用它：

```java
boolean switchMonth(Month month) {
    switch (month) {
        case OCTOBER:
        case NOVEMBER:
        case DECEMBER:
            return true;
        default:
            return false;
    }
}
```

注意它将向下移动并检查所有有效月份（如果需要）。此外，我们可以使用Java 12中的新switch语法来改进这一点：

```java
return switch (month) {
    case OCTOBER, NOVEMBER, DECEMBER -> true;
    default -> false;
};
```

最后，我们可以进行一些测试以验证值是否在范围内或不在范围内：

```java
assertTrue(switchMonth(monthIn()));
assertFalse(switchMonth(monthNotIn()));
```

## 5. 使用集合
**我们可以使用集合来分组满足if条件的内容，并检查一个值是否属于它：**

```java
Set```````<Month>``````` months = Set.of(OCTOBER, NOVEMBER, DECEMBER);
```

让我们添加一些逻辑来查看集合是否包含特定值：

```java
boolean contains(Month month) {
    if (months.contains(month)) {
        return true;
    }
    return false;
}
```

同样，我们可以添加一些单元测试：

```java
assertTrue(contains(monthIn()));
assertFalse(contains(monthNotIn()));
```

## 6. 使用函数式编程
**我们可以使用函数式编程将if / else逻辑转换为函数。** 采用这种方法，我们将有可预测的方法使用我们的语法。

### 6.1. 简单的谓词
让我们仍然使用contains()方法。然而，这次我们使用Predicate将其作为lambda表达式：

```java
Predicate```````<Month>``````` collectionPredicate = this::contains;
```

我们现在确定Predicate是不可变的，没有中间变量。其结果是可预测的，并且在我们需要时可以在其他上下文中重复使用。

让我们使用test()方法来检查它：

```java
assertTrue(collectionPredicate.test(monthIn()));
assertFalse(collectionPredicate.test(monthNotIn()));
```

### 6.2. 谓词链
我们可以在or条件中添加多个Predicate来添加我们的逻辑：

```java
Predicate```````<Month>``````` orPredicate() {
    Predicate```````<Month>``````` predicate = x -> x == OCTOBER;
    Predicate```````<Month>``````` predicate1 = x -> x == NOVEMBER;
    Predicate```````<Month>``````` predicate2 = x -> x == DECEMBER;

    return predicate.or(predicate1).or(predicate2);
}
```

然后我们可以将其插入if中：

```java
boolean predicateWithIf(Month month) {
    if (orPredicate().test(month)) {
        return true;
    }
    return false;
}
```

让我们检查一下这是否有效：

```java
assertTrue(predicateWithIf(monthIn()));
assertFalse(predicateWithIf(monthNotIn()));
```

### 6.3. 流中的谓词
同样，我们可以使用Predicate在Stream过滤器中。同样，在过滤器中的lambda表达式将替换并增强if逻辑。if最终将消失。这是函数式编程的优势，同时仍然保持良好的性能和可读性。

让我们在解析输入月份列表时测试这一点：

```java
List```````<Month>``````` monthList = List.of(monthIn(), monthIn(), monthNotIn());

monthList.stream()
  .filter(this::contains)
  .forEach(m -> assertThat(m, is(in(months))));
```

我们也可以使用predicateWithIf()代替contains()。Lambda没有限制，如果它支持方法签名。例如，它可以是一个静态方法。

## 7. 结论
在本教程中，我们学习了如何提高if语句中多个条件的可读性。我们看到了如何使用switch代替它。此外，我们还看到了如何使用集合来检查它是否包含一个值。最后，我们看到了如何采用使用lambda表达式的函数式方法。Predicate和Stream更少出错，并将提高代码的可读性和可维护性。

一如既往，本文中呈现的代码可在GitHub上找到。