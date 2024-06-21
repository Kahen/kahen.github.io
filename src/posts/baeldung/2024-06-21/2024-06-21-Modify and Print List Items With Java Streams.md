---
date: 2024-06-21
category:
  - Java
  - 编程
tag:
  - Java
  - 流
  - 列表
  - 打印
head:
  - - meta
    - name: keywords
      content: Java, 流, 列表, 修改, 打印

---
# 使用Java流修改和打印列表项

## 1. 概述

在使用Java时，操作列表是一项基本技能。

在这个快速教程中，我们将探索不同的方法来修改或转换列表，然后打印其元素。

## 2. 修改和打印列表

打印列表中的元素对我们来说不是挑战。例如，我们可以在`forEach()`方法中调用打印操作：

```java
List``````<String>`````` theList = Lists.newArrayList("Kai", "Liam", "Eric", "Kevin");
theList.forEach(element -> log.info(element));
```

在上面的代码中，我们使用SLF4J记录器在给定列表中输出元素。执行代码后，我们可以看到控制台中打印出了四个名字：

```
Kai
Liam
Eric
Kevin
```

如果我们打算在打印之前修改列表中的元素，我们可以利用`List.replaceAll()`方法。

接下来，让我们将`theList`中的每个`String`元素转换为大写，并在测试方法中打印修改后的值：

```java
List``````<String>`````` theList = Lists.newArrayList("Kai", "Liam", "Eric", "Kevin");
theList.replaceAll(element -> element.toUpperCase());
theList.forEach(element -> log.info(element));
assertEquals(List.of("KAI", "LIAM", "ERIC", "KEVIN"), theList);
```

如我们所见，我们在`replaceAll()`方法中使用了一个lambda表达式来执行大小写转换。运行测试后，我们可以看到控制台中打印出了大写值：

```
KAI
LIAM
ERIC
KEVIN
```

值得注意的是，`replaceAll()`方法要求列表对象是可变的列表，例如上述代码中使用的`ArrayList`。如果列表是不可变的，比如由`Collection.singletonList()`和`List.of()`返回的列表对象，该方法会抛出`UnsupportedOperationException`。

因此，在实际场景中，通常更倾向于将原始列表转换为一个新的列表，而不是直接修改它。接下来，让我们探索如何转换列表并有效地无缝输出其元素。

## 3. 使用流API转换和打印列表

Java 8中引入的流API极大地改变了我们处理对象集合的方式。流提供了一种声明性和函数式的方式来处理数据，提供了一种简洁而富有表现力的方式来对集合执行操作。

例如，我们可以将列表作为源，使用`map()`方法在流中转换元素，并使用`forEachOrdered()`这样打印元素：

```java
theList.stream()
  .map(...) // 转换逻辑
  .forEachOrdered(...) // 打印元素
```

代码非常直接。然而，重要的是要注意`Stream.forEachOrdered()`是一个终端操作。这个终端操作本质上标志着流管道的结束。因此，流对象在调用这个方法后变得不可访问。这个限制意味着后续的流操作，比如收集转换后的元素，不再可行。

因此，我们希望通过不同的方法实现我们的目标，这样我们可以在流上继续执行操作。

一个简单的想法是在`map()`中包含打印方法调用：

```java
List``````<String>`````` theList = List.of("Kai", "Liam", "Eric", "Kevin");
List``````<String>`````` newList = theList.stream()
  .map(element -> {
      String newElement = element.toUpperCase();
      log.info(newElement);
      return newElement;
  })
  .collect(Collectors.toList());
assertEquals(List.of("KAI", "LIAM", "ERIC", "KEVIN"), newList);
```

这样，打印流不会终止流管道，我们仍然可以在之后执行`Collector`操作。当然，转换后的元素会在控制台中打印出来：

```
KAI
LIAM
ERIC
KEVIN
```

然而，这种方法的一个缺点是它不必要地将无关的逻辑添加到`map()`方法中。接下来，让我们通过使用`peek()`方法来改进它：

```java
List``````<String>`````` theList = List.of("Kai", "Liam", "Eric", "Kevin");
List``````<String>`````` newList = theList.stream()
  .map(element -> element.toUpperCase())
  .peek(element -> log.info(element))
  .collect(Collectors.toList());
assertEquals(List.of("KAI", "LIAM", "ERIC", "KEVIN"), newList);
```

与`forEachOrdered()`不同，`peek()`是一个中间操作。它对流中的每个元素执行提供的操作并返回流。因此，我们可以在调用`peek()`之后向流管道添加进一步的操作，比如上述代码中的`collect()`。

`peek()`方法接受一个`Consumer`实例作为参数。在我们的示例中，我们将一个lambda表达式作为`Consumer`传递给`peek()`。

当我们运行这个测试时，它通过了，并且预期的输出被打印到控制台：

```
KAI
LIAM
ERIC
KEVIN
```

## 4. 结论

在本文中，我们首先演示了如何使用`replaceAll()` + `forEach()`方法来修改和打印列表。然后，我们探索了如何使用流API来转换和打印流中的元素。

如常，示例的完整源代码可以在GitHub上找到。
OK