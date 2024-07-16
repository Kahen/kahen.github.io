---
date: 2022-08-01
category:
  - Java
  - 编程
tag:
  - Java 8
  - 性能
  - 可读性
head:
  - - meta
    - name: keywords
      content: Java 8, Streams, 性能, 可读性
---
# Java 8 流：多重过滤器与复杂条件的比较

在本教程中，我们将比较不同的Java流过滤方式。首先，我们将看到哪种解决方案可以带来更易读的代码。然后，我们将从性能的角度比较这些解决方案。

## 2. 可读性

让我们从可读性的角度开始比较这两种解决方案。在本节的代码示例中，我们将使用`Student`类：

```java
public class Student {
    private String name;
    private int year;
    private List`<Integer>` marks;
    private Profile profile;

    // 构造函数、getter和setter
}
```

我们的目标是基于以下三个规则过滤`Students`的流：

- `profile`必须是`Profile.PHYSICS`
- `marks`的计数应该大于3
- 平均`mark`应该大于50

### 2.1. 多重过滤器

流API允许链式调用多个过滤器。我们可以利用这一点来满足上述复杂的过滤条件。如果我们想要否定条件，我们也可以使用方法`not`的`Predicate`。

这种方法将导致代码清晰易懂：

```java
@Test
public void whenUsingMultipleFilters_dataShouldBeFiltered() {
    List```<Student>``` filteredStream = students.stream()
      .filter(s -> s.getMarksAverage() > 50)
      .filter(s -> s.getMarks().size() > 3)
      .filter(not(s -> s.getProfile() == Student.Profile.PHYSICS))
      .collect(Collectors.toList());

    assertThat(filteredStream).containsExactly(mathStudent);
}
```

### 2.2. 单一过滤器与复杂条件

另一种选择是使用一个带有更复杂条件的单一过滤器。

不幸的是，生成的代码将更难阅读：

```java
@Test
public void whenUsingSingleComplexFilter_dataShouldBeFiltered() {
    List```<Student>``` filteredStream = students.stream()
      .filter(s -> s.getMarksAverage() > 50
        && s.getMarks().size() > 3
        && s.getProfile() != Student.Profile.PHYSICS)
      .collect(Collectors.toList());

    assertThat(filteredStream).containsExactly(mathStudent);
}
```

尽管，我们可以通过将几个条件提取到一个单独的方法中来改善它：

```java
public boolean isEligibleForScholarship() {
    return getMarksAverage() > 50
      && marks.size() > 3
      && profile != Profile.PHYSICS;
}
```

结果，我们将隐藏复杂条件，并给过滤条件赋予更多含义：

```java
@Test
public void whenUsingSingleComplexFilterExtracted_dataShouldBeFiltered() {
    List```<Student>``` filteredStream = students.stream()
        .filter(Student::isEligibleForScholarship)
        .collect(Collectors.toList());

    assertThat(filteredStream).containsExactly(mathStudent);
}
```

**这将是一个好解决方案，特别是当我们可以将过滤逻辑封装在我们的模型内部时。**

## 3. 性能

我们已经看到使用多个过滤器可以提高我们代码的可读性。另一方面，这将意味着创建多个对象，并可能导致性能损失。为了证明这一点，我们将过滤不同大小的流并对它们的元素执行多次检查。

之后，我们将计算总处理时间（以毫秒为单位），并比较这两种解决方案。此外，我们的测试中还将包括并行流和简单的旧`for`循环：

**![img](https://www.baeldung.com/wp-content/uploads/2022/08/stream-filer-size-comparisson.jpg)**

**正如我们所见，使用复杂条件将带来性能提升。**

尽管，对于小样本大小，差异可能不明显。

## 4. 条件的顺序

无论我们是使用单个还是多个过滤器，如果检查没有以最佳顺序执行，过滤可能会导致性能下降。

### 4.1. 过滤出许多元素的条件

假设我们有一个包含100个整数的流，我们想要找到小于20的偶数。

如果我们首先检查数字的奇偶性，我们将总共进行150次检查。这是因为第一个条件每次都会被评估，而第二个条件只会在偶数上被评估。

```java
@Test
public void givenWrongFilterOrder_whenUsingMultipleFilters_shouldEvaluateManyConditions() {
    long filteredStreamSize = IntStream.range(0, 100).boxed()
      .filter(this::isEvenNumber)
      .filter(this::isSmallerThanTwenty)
      .count();

    assertThat(filteredStreamSize).isEqualTo(10);
    assertThat(numberOfOperations).hasValue(150);
}
```

另一方面，如果我们颠倒过滤器的顺序，我们只需要总共120次检查就可以正确过滤流。**因此，应该首先评估过滤掉大多数元素的条件。**

### 4.2. 慢或重的条件

有些条件可能潜在地很慢，比如如果其中一个过滤器需要执行一些重逻辑，或者通过网络进行外部调用。为了更好的性能，我们将尽可能少地评估这些条件。基本上，我们将尝试**只有在满足所有其他条件时才评估它们。**

## 5. 结论

在本文中，我们分析了不同的Java流过滤方式。首先，我们从可读性的角度比较了这两种方法。我们发现使用多个过滤器提供了更易于理解的过滤条件。

接下来，我们从性能的角度比较了解决方案。我们了解到，使用复杂条件，因此创建更少的对象，将带来更好的整体性能。

如常，源代码可在GitHub上找到。