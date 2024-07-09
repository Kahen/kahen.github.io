---
date: 2022-04-01
category:
  - Java
  - ArrayList
tag:
  - Java
  - ArrayList
  - 初始化
head:
  - - meta
    - name: keywords
      content: Java, ArrayList, 初始化, 零值, 空值
---
# Java中使用零值或空值初始化ArrayList的方法

## 1. 概述

在本教程中，我们将探索使用Java ArrayList初始化所有值为null或零的不同方法。我们也可以按照我们的喜好进行初始化，并将列表初始化为不同的数值或对象。

## 2. 使用for循环

当考虑使用所需值或对象初始化ArrayList的问题时，我们首先想到的解决方案是使用简单的for循环。理所当然，这是一个直接可行的解决方案：

```java
ArrayList```````<Integer>``````` arrayList = new ArrayList<>();
for (int i = 0; i < 10; i++) {
    arrayList.add(null);
    // arrayList.add(0);
}
```

我们声明一个空的ArrayList，并使用add()方法进行循环。

## 3. 使用ArrayList构造器方法

另一种可能不太为人所知的方法是使用ArrayList类的构造器之一。这需要一个集合作为参数，并构造一个新的ArrayList，其中包含指定列表中元素的顺序，这些元素是集合的迭代器返回的。**为了向我们的构造器提供所需的列表，我们将使用Collections类的nCopies()函数。** 这个函数接受项目和所需副本数作为参数。我们还可以编写一个单元测试来检查我们的构造器是否正确工作：

```java
@Test
public void whenInitializingListWithNCopies_thenListIsCorrectlyPopulated() {
    // when
    ArrayList```````<Integer>``````` list = new ArrayList<>(Collections.nCopies(10, 0));

    // then
    Assertions.assertEquals(10, list.size());
    Assertions.assertTrue(list.stream().allMatch(elem -> elem == 0));
}
```

我们将检查列表是否具有所需数量的元素，以及是所有元素都等于我们要求的值。检查列表元素是否全部相同的方法有多种。在我们的示例中，我们使用Java Stream API的allMatch()函数。

## 4. 使用Java Stream API

在上一个示例中，我们使用Java Stream API来确定我们是否正确初始化了列表。但是，Java Stream能够做更多。我们可以使用静态函数generate()根据供应商生成无限数量的元素：

```java
@Test
public void whenInitializingListWithStream_thenListIsCorrectlyPopulated() {

    // when
    ArrayList```````<Integer>``````` listWithZeros = Stream.generate(() -> 0)
      .limit(10).collect(Collectors.toCollection(ArrayList::new));

    ArrayList`<Object>` listWithNulls = Stream.generate(() -> null)
      .limit(10).collect(Collectors.toCollection(ArrayList::new));

    // then
    Assertions.assertEquals(10, listWithZeros.size());
    Assertions.assertTrue(listWithZeros.stream().allMatch(elem -> elem == 0));

    Assertions.assertEquals(10, listWithNulls.size());
    Assertions.assertTrue(listWithNulls.stream().allMatch(Objects::isNull));
}
```

limit()函数接受一个数字作为参数。这表示应该限制流的元素数量，该方法返回一个新的Stream，由原始流中挑选出的对象组成。

## 5. 使用IntStream

**我们可以使用IntStream类使用所需的数值初始化列表。** 这是一个从BaseStream派生的类，像Stream接口一样。这意味着这个类能够做Stream类能做的大部分事情。这个类让我们创建一个原始数字的流。然后我们使用boxed()函数将原始类型包装成对象。之后，我们可以轻松地收集所有生成的数字：

```java
@Test
public void whenInitializingListWithIntStream_thenListIsCorrectlyPopulated() {
    // when
    ArrayList```````<Integer>``````` list = IntStream.of(new int[10])
      .boxed()
      .collect(Collectors.toCollection(ArrayList::new));

    // then
    Assertions.assertEquals(10, list.size());
    Assertions.assertTrue(list.stream().allMatch(elem -> elem == 0));
}
```

我们还应该考虑这种方法只适用于插入原始数字。因此，我们不能使用这种方法来初始化列表为null值。

## 6. 使用Arrays.asList

Arrays.asList()是java.util.Arrays类的一个方法。使用这个方法，我们可以将数组转换为集合。因此，对于这种方法，我们应该初始化一个数组。因为我们的数组在初始化时只包含null值，我们使用fill()方法用我们所需的值0填充它，在我们的例子中。这个方法像nCopies()一样，用给定的参数值填充我们的数组。在用零填充数组之后，我们最终可以使用toList()函数将其转换为列表：

```java
@Test
public void whenInitializingListWithAsList_thenListIsCorrectlyPopulated() {
    // when
    Integer[] integers = new Integer[10];
    Arrays.fill(integers, 0);
    List```````<Integer>``````` integerList = Arrays.asList(integers);

    // then
    Assertions.assertEquals(10, integerList.size());
    Assertions.assertTrue(integerList.stream().allMatch(elem -> elem == 0));
}
```

在这个例子中，我们应该考虑我们得到的是一个List而不是一个ArrayList。如果我们尝试向列表中添加一个新元素，我们将得到一个UnsupportedOperationException。这个问题可以通过使用前一节中介绍的方法轻松解决。我们需要将List转换为ArrayList。我们可以通过更改integerList声明来做到这一点：

```java
List```````<Integer>``````` integerList = new ArrayList<>(Arrays.asList(integers));
```

此外，我们可以通过删除fill()方法调用来使这种方法向我们的列表添加null值。正如前面所说的，数组默认初始化为null值。

## 7. 使用Vector类

像ArrayList类一样，Java Vector类表示一个可增长的对象数组。此外，Vector是一个实现List接口的Java遗留类。所以我们可以很容易地将其转换为列表。然而，尽管这两个实体之间有很多相似之处，它们是不同的，并且有不同的用例。一个相当大的区别是Vector类的所有方法都是同步的。

Vector在我们问题中的优势是它可以初始化任意数量的元素。除此之外，它的所有元素默认都是null：

```java
@Test
public void whenInitializingListWithVector_thenListIsCorrectlyPopulated() {
    // when
    List```````<Integer>``````` integerList = new Vector```````<Integer>```````() {{setSize(10);}};
    
    // then
    Assertions.assertEquals(10, integerList.size());
    Assertions.assertTrue(integerList.stream().allMatch(elem -> elem == null));
}
```

我们使用setSize()函数初始化Vector所需的元素数量。之后，Vector将用null值填充自己。我们必须考虑这种方法只帮助我们如果我们想在我们的列表中插入null值。

我们还可以通过使用ArrayList类的构造器像前面的示例一样或使用addAll()方法将我们新初始化的空ArrayList中的所有元素添加进来，将列表转换为ArrayList。

## 8. 结论

在这个快速教程中，我们探索了所有需要用null或0值初始化ArrayList的替代方案。特别是，我们通过使用流、数组、向量或示例循环进行了示例。像往常一样，你可以在GitHub上找到所有的代码样本。