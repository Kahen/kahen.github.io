---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Java
  - List
  - Array
head:
  - - meta
    - name: keywords
      content: Java, List, Array, subList, Stream API
---
# 将列中的前n个元素转换为数组 | Baeldung

## 1. 概述

在Java编程中，无缝操作数据的能力是一项重要技能。我们可能会遇到需要从列表中提取特定数量的元素并将它们存储在数组中的场景。

在本教程中，我们将探讨从列表中检索前n个元素并将其转换为Java数组的步骤。

## 2. 问题介绍

像往常一样，我们通过示例来理解问题。假设我们有一个包含七个字符串的列表：

```java
List`<String>` INPUT_LIST = Lists.newArrayList("one", "two", "three", "four", "five", "six", "seven");
int n = 5;
```

现在，我们想要取出前n个元素（这里是5个）并将它们转换为字符串数组。当然，这五个元素应该保留在原始列表中的顺序：

```
"one", "two", "three", "four", "five"
```

在本教程中，我们将探索实现我们目标的不同方法。为了简单起见，我们假设给定的n不会大于列表的大小。此外，我们将使用单元测试断言来验证每种方法是否产生了预期的结果。

接下来，让我们深入代码。

## 3. 使用_for_循环

解决这个问题的一个直接想法是**首先创建一个长度为n的空数组，然后循环遍历列表中的前n个元素，并依次填充准备好的数组**。

接下来，让我们使用_for_循环来实现这个想法：

```java
String[] result = new String[n];
for (int i = 0; i < n; i++) {
    result[i] = INPUT_LIST.get(i);
}
assertArrayEquals(new String[] { "one", "two", "three", "four", "five" }, result);
```

上述代码非常容易理解。它完成了工作。

在我们的示例中，列表是一个_ArrayList_。顾名思义，_ArrayList_是由数组支持的。因此，**_ArrayList_的随机访问复杂度是O(1)**。换句话说，调用_ArrayList_的get(i)方法是高效的。

然而，并非所有_List_实现都提供O(1)的随机访问。例如，**_LinkedList_总是从第一个节点导航到所需的节点。因此，它的随机访问成本是O(n)**。

由于我们不是在解决_ArrayList_特定的问题，让我们稍微改进我们的代码。

由于我们需要从第一个元素迭代到第n个元素，**我们可以使用_Iterator_来获取每个元素，而不是调用_get()_方法来避免随机访问调用**：

```java
String[] result2 = new String[n];
Iterator`<String>` iterator = INPUT_LIST.iterator();
for (int i = 0; i < n && iterator.hasNext(); i++) {
    result2[i] = iterator.next();
}
assertArrayEquals(new String[] { "one", "two", "three", "four", "five" }, result2);
```

## 4. 使用_subList()_方法

我们已经看到了基于_for_循环的解决方案。解决这个问题的另一个想法是将其分为两部分：

- 获取前n个元素
- 将提取的元素转换为数组

**_List_接口提供了_subList()_方法，允许我们从列表对象中检索连续的元素**。因此，使用_INPUT_LIST.subList(0, n)_很容易完成第一部分。

我们可以在第二部分以多种方式将列表转换为数组。接下来，让我们看一些示例。

首先，让我们将一个准备好的数组传递给_List.toArray()_方法：

```java
String[] result = new String[n];
INPUT_LIST.subList(0, n)
  .toArray(result);
assertArrayEquals(new String[] { "one", "two", "three", "four", "five" }, result);
```

正如我们所看到的，如果传递给_toArray()_方法的数组参数有足够的空间容纳列表中的元素，也就是我们的情况中的子列表，**_toArray()_方法用列表元素填充数组**。

然而，**如果数组参数没有足够的空间容纳列表元素，_toArray()_会分配一个新的数组并携带列表的元素**：

```java
String[] result2 = INPUT_LIST.subList(0, n)
  .toArray(new String[0]);
assertArrayEquals(new String[] { "one", "two", "three", "four", "five" }, result2);
```

正如上述代码所示，我们没有用n长度分配数组。相反，当我们调用_toArray()_方法时，我们传递“_new String[0]_”作为参数。结果，_toArray()_创建并返回一个新的数组，由列表的元素填充。

**如果我们使用Java 11或更高版本，我们可以将生成器函数传递给_toArray()_方法**：

```java
// 仅适用于java 11+
String[] result3 = INPUT_LIST.subList(0, n)
  .toArray(String[]::new);
assertArrayEquals(new String[] { "one", "two", "three", "four", "five" }, result3);
```

正如我们所看到的，我们只需要为生成器函数创建一个新的数组实例，没有更多。因此，**我们使用了_String[]_构造函数的方法引用作为生成器函数**。

## 5. 使用Stream API

此外，我们可以使用Stream API来解决问题。**Stream API是Java 8带给我们的一个重要新特性。因此，它仅适用于Java 8或更高版本**：

```java
String[] result = INPUT_LIST.stream()
  .limit(n)
  .toArray(String[]::new);
assertArrayEquals(new String[] { "one", "two", "three", "four", "five" }, result);
```

在上面的例子中，**我们使用_limit(n)_方法使_Stream_只返回源列表，即INPUT_LIST中的前n个元素**。然后，我们调用_Stream_的_toArray()_方法将流对象转换为数组。**类似于Java 11的_List.toArray()_，_Stream.toArray()_接受一个生成器函数**。因此，我们再次传递了“_String[]::new_”到方法中，并得到了预期的数组。

## 6. 结论

在本文中，我们通过示例探索了从列表中提取前n个元素并将其转换为数组的不同方法。

如往常一样，示例的完整源代码可在GitHub上找到。