---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Random Numbers
  - Java 8
head:
  - - meta
    - name: keywords
      content: Java, Random Numbers, Unique, Duplicates
---
# 在Java中创建没有重复的随机数

## 1. 引言

在本快速教程中，我们将学习如何使用Java核心类生成没有重复的随机数。**首先，我们将从头开始实现几种解决方案，然后利用Java 8+的特性来实现更可扩展的方法。**

## 2. 小范围内的随机数

如果我们所需的数字范围较小，我们可以一直向列表中添加连续的数字，直到达到大小_n_。**然后，我们调用_Collections.shuffle()_，它具有线性时间复杂度。之后，我们将得到一个随机排序的唯一数字列表。**让我们创建一个实用工具类来生成和使用这些数字：

```java
public class UniqueRng implements Iterator````<Integer>```` {
    private List````<Integer>```` numbers = new ArrayList<>();

    public UniqueRng(int n) {
        for (int i = 1; i <= n; i++) {
            numbers.add(i);
        }

        Collections.shuffle(numbers);
    }
}
```

构造对象后，我们将获得从一到_size_的数字的随机顺序。**注意我们正在实现_Iterator_，所以我们每次调用_next()_时都会得到一个随机数字。**另外，我们可以使用_hasNext()_来检查是否还有剩余的数字。那么，让我们重写它们：

```java
@Override
public Integer next() {
    if (!hasNext()) {
        throw new NoSuchElementException();
    }
    return numbers.remove(0);
}

@Override
public boolean hasNext() {
    return !numbers.isEmpty();
}
```

因此，_remove()_返回列表中第一个被移除的项目。**同样，如果我们没有打乱我们的集合，我们可以传递给它一个随机索引。**但是，在构造时打乱有一个优势，那就是我们可以提前知道整个序列。

### 2.1. 实际应用

要使用它，我们只需选择我们想要的数字数量并消耗它们：

```java
UniqueRng rng = new UniqueRng(5);
while (rng.hasNext()) {
    System.out.print(rng.next() + " ");
}
```

这可能会产生如下输出：

```java
4 1 2 5 3
```

## 3. 大范围内的随机数

如果我们想要一个更广泛的数字范围，只使用其中的几个，我们需要一个不同的策略。首先，我们不能依赖于向_ArrayList_添加随机数字，因为这可能会产生重复项。**所以，我们将使用_Set_，因为它保证项目是唯一的。**然后，我们将使用_LinkedHashSet_实现，因为它保持插入顺序。

**这次，我们将在循环中向我们的集合添加元素，直到达到_size_。同时，我们将使用_Random_从零到_max_生成随机整数：**

```java
public class BigUniqueRng implements Iterator````<Integer>```` {
    private Random random = new Random();
    private Set````<Integer>```` generated = new LinkedHashSet<>();

    public BigUniqueRng(int size, int max) {
        while (generated.size() < size) {
            Integer next = random.nextInt(max);
            generated.add(next);
        }
    }
}
```

注意我们不需要检查一个数字是否已经存在于我们的集合中，因为_add()_会这样做。**现在，由于我们不能通过索引移除项目，我们需要_Iterator_的帮助来实现_next()_：**

```java
public Integer next() {
    Iterator````<Integer>```` iterator = generated.iterator();
    Integer next = iterator.next();
    iterator.remove();
    return next;
}
```

## 4. 利用Java 8+特性

虽然自定义实现更加可重用，但我们可以使用仅使用_Stream_的解决方案。**从Java 8开始，_Random_有一个_ints()_方法，它返回一个_IntStream_。我们可以流式处理它，并强加之前的要求，如范围和限制。**让我们结合这些特性并将结果_收集_到一个_Set_中：

```java
Set````<Integer>```` set = new Random().ints(-5, 15)
  .distinct()
  .limit(5)
  .boxed()
  .collect(Collectors.toSet());
```

遍历的集合可能会产生如下输出：

```java
-5 13 9 -4 14
```

使用_ints()_，从负整数开始的范围甚至更简单。**但是，我们必须小心不要最终得到一个无限流，这将发生在我们没有调用_limit()_的情况下，例如。**

## 5. 结论

在本文中，我们编写了几种解决方案，在两种场景下生成没有重复的随机数。首先，我们使这些类可迭代，以便我们可以轻松地消耗它们。然后，我们使用流创建了一个更自然的解决方案。

如常，源代码可在GitHub上找到。