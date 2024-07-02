---
date: 2022-04-01
category:
  - Java
  - Collections
tag:
  - Iterator
  - ListIterator
head:
  - - meta
    - name: keywords
      content: Java, Iterator, ListIterator, Collections, Java Collections Framework, bidirectional traversal
---
# Java中迭代器和列表迭代器的区别

当我们使用集合时，经常需要迭代它们的元素。Java为此提供了两个基本接口：迭代器（Iterator）和列表迭代器（ListIterator）。尽管它们的目的相似，但两者之间存在重要的差异，我们必须理解这些差异。

在本教程中，我们将探讨Java中迭代器和列表迭代器的区别。

## 迭代器接口
标准的集合接口扩展了可迭代接口（Iterable）。进一步地，可迭代接口定义了iterator()方法来返回一个迭代器实例：

```java
public interface Iterable``<T>`` {
    Iterator``<T>`` iterator();
    ...
}
```

因此，迭代器是Java集合框架的基本组成部分，并且可用于所有集合实现，例如列表（List）和集合（Set）。它允许我们顺序访问集合中的元素，而无需了解其底层结构。

它提供了三个主要方法：hasNext()、next()和remove()：

```java
public interface Iterator```<E>``` {

    boolean hasNext();
    E next();
    default void remove() { throw new UnsupportedOperationException("remove"); }
    ...
}
```

使用hasNext()和next()方法，我们可以检查是否还有更多的元素并移动到这些元素。

然而，remove()方法从集合中删除了由next()方法返回的最后一个元素。进一步地，如我们所见，remove()方法是默认方法，因此它是可选的。它的实现取决于底层集合。

让我们创建一个单元测试来覆盖迭代器三个主要方法的基本使用：

```java
List``````````<String>`````````` inputList = Lists.newArrayList("1", "2", "3", "4", "5");
Iterator``````````<String>`````````` it = inputList.iterator();
while (it.hasNext()) {
    String e = it.next();
    if ("3".equals(e) || "5".equals(e)) {
        it.remove();
    }
}

assertEquals(Lists.newArrayList("1", "2", "4"), inputList);
```

值得注意的是，我们只能使用迭代器以向前方向遍历集合。

## 列表迭代器接口
列表迭代器是迭代器的子类型。因此，迭代器提供的所有特性在列表迭代器中也都可用：

```java
public interface ListIterator```<E>``` extends Iterator```<E>``` {

    boolean hasNext();
    E next();
    void remove();

    boolean hasPrevious();
    E previous();
    int nextIndex();
    int previousIndex();
    void set(E e);
    void add(E e);
}
```

顾名思义，列表迭代器明确用于列表。除了迭代器接口的三个方法（hasNext()、next()和remove()）之外，列表迭代器接口还有一组新的方法，如previous()、set()、add()等。

接下来，我们将更仔细地查看这些新方法，并理解迭代器和列表迭代器之间的区别。

为了简单起见，我们将使用ArrayList作为示例来理解列表迭代器的使用方法。

### 3.1. 正向和反向迭代元素
列表迭代器允许我们以正向和反向遍历列表。在我们了解如何做到这一点之前，让我们先了解列表迭代器的光标位置。

简单来说，列表迭代器的光标并不直接指向一个元素。给定一个有n个元素的列表，列表迭代器有以下n+1个可能的光标位置（^）：

```plaintext
元素:            元素_0    元素_1    元素_2    元素_3  ... 元素_(n-1)
光标位置:  ^            ^            ^            ^           ^    ...            ^
```

列表迭代器的previous()和next()方法返回当前光标位置之前的元素和之后的元素。因此，我们应该注意到，交替调用next()和previous()会重复返回同一个元素。理解这一特性对于使用列表迭代器实现双向遍历至关重要。

让我们通过一个例子来看这种行为：

```java
List``````````<String>`````````` inputList = Lists.newArrayList("1", "2", "3", "4", "5");
ListIterator``````````<String>`````````` lit = inputList.listIterator(); // ^ 1 2 3 4 5
lit.next(); // 1 ^ 2 3 4 5
lit.next(); // 1 2 ^ 3 4 5

for (int i = 1; i `<= 100; i++) {
    assertEquals("2", lit.previous());
    assertEquals("2", lit.next());
}
```

正如上面的代码所示，在调用next()方法两次后，光标位于“2”和“3”之间。然后，我们重复了100次previous()和next()调用。也就是说，它执行了next() ->` previous() -> next() -> previous() -> … 100次。正如我们之前注意到的，每次交替调用next()和previous()时，我们都会得到同一个元素。在这种情况下，它是“2”。我们用上面的两个断言来验证这一点。

接下来，让我们看看如何使用列表迭代器在两个方向上访问列表元素：

```java
List``````````<String>`````````` inputList = Lists.newArrayList("1", "2", "3", "4", "5");
ListIterator``````````<String>`````````` lit = inputList.listIterator(); // ^ 1 2 3 4 5

assertFalse(lit.hasPrevious()); // lit在列表的开头
assertEquals(-1, lit.previousIndex());

// 正向
assertEquals("1", lit.next()); // next()之后：1 ^ 2 3 4 5
assertEquals("2", lit.next()); // next()之后：1 2 ^ 3 4 5
assertEquals("3", lit.next()); // next()之后：1 2 3 ^ 4 5

// 反向
assertTrue(lit.hasPrevious());
assertEquals(2, lit.previousIndex());
assertEquals("3", lit.previous()); // previous()之后：1 2 ^ 3 4 5

assertTrue(lit.hasPrevious());
assertEquals(1, lit.previousIndex());
assertEquals("2", lit.previous()); // previous()之后：1 ^ 2 3 4 5

assertTrue(lit.hasPrevious());
assertEquals(0, lit.previousIndex());
assertEquals("1", lit.previous()); // previous()之后：^ 1 2 3 4 5
```

正如上面的例子所示，我们首先使用next()调用正向访问了列表中的前三个元素。然后，我们使用previous()调用以反向获得了这些元素。

我们还在上面的代码中使用了previousIndex()。列表迭代器的previousIndex()返回下一个调用previous()方法将返回的元素的索引。同样，nextIndex()告诉调用next()方法将返回的元素的索引。

### 3.2. set()方法
列表迭代器提供了set()方法来设置元素的值。迭代器接口不支持这个特性。然而，我们应该注意到列表迭代器的set()方法设置的是最后一个next()或previous()调用返回的元素：

```java
List``````````<String>`````````` inputList = Lists.newArrayList("1", "2", "3", "4", "5");
ListIterator``````````<String>`````````` lit = inputList.listIterator(1); // ^ 1 2 3 4 5
lit.next(); // 1 ^ 2 3 4 5
assertEquals("3", lit.next()); // 1 2 ^ 3 4 5

lit.set("X");
assertEquals(Lists.newArrayList("1", "2", "X", "4", "5"), inputList);

assertEquals("X", lit.previous()); // 1 2 ^ X 4 5

assertEquals("2", lit.previous()); // 1 ^ 2 X 4 5
lit.set("Y");
assertEquals(Lists.newArrayList("1", "Y", "X", "4", "5"), inputList);
```

正如上面的测试所示，当我们调用set()时，最后一个next()或previous()调用返回的元素被新值替换。

### 3.3. add()方法
列表迭代器允许我们在当前光标位置添加()元素，遵循这个规则：

```
Element_x (New)   ^     Element_Y
           |
           ^
           |____ add(New)
```

调用add(NEW)在当前光标位置之前插入一个元素，这样后续的next()调用不会受到影响，而后续的previous()将返回新元素。

一个例子可以清楚地说明这一点：

```java
List``````````<String>`````````` inputList = Lists.newArrayList("1", "2", "3", "4", "5");
ListIterator``````````<String>`````````` lit = inputList.listIterator(); // ^ 1 2 3 4 5
lit.next(); // 1 ^ 2 3 4 5
lit.next(); // 1 2 ^ 3 4 5
lit.next(); // 1 2 3 ^ 4 5

lit.add("X"); // 1 2 3 X ^ 4 5
assertEquals("4", lit.next)— 1 2 3 X 4 ^ 5; next() 不受影响

lit.previous(); // 1 2 3 X ^ 4 5
lit.previous(); // 1 2 3 ^ X 4 5
lit.previous(); // 1 2 ^ 3 X 4 5
lit.add("Y");   // 1 2 Y ^ 3 X 4 5

assertEquals("Y", lit.previous()); // previous() 总是返回新元素

assertEquals(Lists.newArrayList("1", "2", "Y", "3", "X", "4", "5"), inputList);
```

## 结论
在本文中，我们讨论了迭代器和列表迭代器的用法。现在，让我们总结一下它们之间的主要区别：

- 迭代器是一个通用接口，用于遍历任何集合，而列表迭代器是特定于列表的并提供双向迭代。
- 迭代器仅支持使用next()进行正向迭代。另一方面，列表迭代器支持使用next()和previous()进行正向和反向迭代。
- 列表迭代器包括add()和set()等附加方法来插入或替换列表元素，而迭代器接口没有这些特性。

如常，示例的完整源代码可以在GitHub上找到。

OK