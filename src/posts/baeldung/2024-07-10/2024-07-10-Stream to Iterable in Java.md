---
date: 2023-04-06
category:
  - Java
  - Programming
tag:
  - Java 8
  - Streams
  - Iterable
head:
  - - meta
    - name: keywords
      content: Java, Stream, Iterable, for-each loop, Collection
---
# Java Stream转换为Iterable

## 1. 引言

Java Streams API是在Java 8中引入的，它为处理元素序列提供了功能。Streams API支持在流水线上对一个对象集合进行操作链式调用，以产生所需的结果。

在本教程中，我们将探讨将Stream用作Iterable的不同方式。

## 2. Iterable和Iterator

自Java 1.5以来，Iterable``````````<T>``````````接口就已可用。实现此接口的类允许类的实例成为for-each循环语句的目标。实现类不存储任何关于其迭代状态的信息，并且应该产生其自身的有效Iterator。

**Collection接口扩展了Iterable接口，所有具体的Collection实现，如ArrayList或HashSet，通过实现Iterable的iterator()方法来产生迭代器。**

自Java 1.2以来，Iterator``````````<T>``````````接口也是Java Collections框架的一部分。实现Iterator``````````<T>``````````的类必须提供遍历集合的实现，例如移动到下一个元素、检查是否还有更多元素或从集合中删除当前元素的能力：

```java
public interface Iterator`<E>` {
    boolean hasNext();
    E next();
    void remove();
}
```

## 3. 问题陈述

现在我们已经了解了Iterator和Iterable接口的基础知识以及它们的作用，让我们理解问题陈述。

实现Collection接口的类本质上实现了Iterable``````````<T>``````````接口。另一方面，Streams略有不同。值得注意的是，**BaseStream``````````<T>``````````，Stream``````````<T>``````````扩展的接口，有一个iterator()方法，但没有实现Iterable接口。**

有了这个限制，就带来了不能在Stream上使用增强的for-each循环的挑战。

我们将在以下部分探讨一些克服这个问题的方法，并最终触及为什么Stream与Collection不同，没有扩展Iterable接口的想法。

## 4. 使用Stream的iterator()转换Stream为Iterable

Stream接口的iterator()方法返回流元素的迭代器。它是一个终端流操作：

```java
Iterator``````````<T>`````````` iterator();
```

然而，我们仍然不能在增强的for-each循环中使用生成的迭代器：

```java
private void streamIterator(List`````<String>````` listOfStrings) {
    Stream`````<String>````` stringStream = listOfStrings.stream();
    // 这不能编译
    for (String eachString : stringStream.iterator()) {
        doSomethingOnString(eachString);
    }
}
```

正如我们之前看到的，“for-each循环”适用于Iterable而不是Iterator。为了解决这个问题，我们将迭代器强制转换为Iterable实例，然后应用我们所需的for-each循环。**Iterable``````````<T>``````````是一个函数式接口，这使我们能够使用lambda编写代码：**

```java
for (String eachString : (Iterable`````<String>`````) () -> stringStream.iterator()) {
    doSomethingOnString(eachString);
}
```

**我们可以使用方法引用方法进行一些重构：**

```java
for (String eachString : (Iterable`````<String>`````) stringStream::iterator) {
    doSomethingOnString(eachString.toLowerCase());
}
```

也可以使用一个临时变量iterableStream来保存Iterable，然后将其用于for-each循环：

```java
Iterable`````<String>````` iterableStream = () -> stringStream.iterator();
for (String eachString : iterableStream) {
    doSomethingOnString(eachString, sentence);
}
```

## 5. 通过转换为Collection在for-each循环中使用Stream

我们上面讨论了Collection接口如何扩展Iterable接口。因此，我们可以将给定的Stream转换为集合，并使用结果作为Iterable：

```java
for(String eachString : stringStream.collect(Collectors.toList())) {
    doSomethingOnString(eachString);
}
```

## 6. Stream为什么不实现Iterable

我们看到如何将Stream用作Iterable。像List和Set这样的集合是存储数据的数据结构，并且打算在它们的生命周期内多次使用。这些对象被传递到不同的方法中，多次更改，最重要的是，它们被多次迭代。

**另一方面，Streams是一次性数据结构，因此不打算使用for-each循环进行迭代。** Streams根本不预期被反复迭代，并且在流已经关闭并操作时抛出IllegalStateException。因此，尽管Stream提供了iterator()方法，但它没有扩展Iterable。

## 7. 结论

在本文中，我们探讨了将Stream用作Iterable的不同方式。

我们简要讨论了Iterable和Iterator之间的区别，以及为什么Stream``````````<T>``````````没有实现Iterable``````````<T>``````````接口。

像往常一样，所有代码示例都可以在GitHub上找到。