---
date: 2024-06-26
category:
  - Java
  - 编程
tag:
  - for循环
  - 迭代器
  - Java
head:
  - - meta
    - name: keywords
      content: Java, for循环, 迭代器, 编程技巧
---
# Java中检测for循环的最后一次迭代

## 1. 概述

for-each循环是一个在迭代List时优雅且简单的工具。有时，我们需要根据当前迭代是否是最后一次来执行特定操作或做出决策。

在本教程中，我们将讨论这种情况，并探索在for循环中确定当前迭代是否是最后一次的不同方法。

## 2. 问题介绍

首先，让我们创建一个电影标题的List作为我们的输入示例：

```java
List``<String>`` MOVIES = List.of(
  "Titanic",
  "The Deer Hunter",
  "Lord of the Rings",
  "One Flew Over the Cuckoo's Nest",
  "No Country For Old Men"
);
```

如果我们仅仅想要在典型的for-each循环之后获得最后一个元素，这并不难。我们可以在每次迭代中简单地将同一个变量重新赋值为元素。当我们遍历完整个列表后，变量将持有最后一个元素：

```java
String myLastMovie = "";
for (String movie : MOVIES) {
    // 做一些与电影相关的工作
    myLastMovie = movie;
}
assertEquals("No Country For Old Men", myLastMovie);
```

然而，有时我们只需要在最后一次迭代中执行一些特定的操作。因此，在循环过程中，我们必须识别for-each循环中的最后一次迭代。

与具有索引变量的传统for循环不同，for-each循环隐藏了当前迭代的信息。因此，缺少明确的循环索引使得确定最后一次迭代成为一个挑战。

接下来，让我们看看如何解决这个问题。

## 3. 使用IntStream

我们知道，使用传统的for循环解决问题并不难，因为我们知道当前迭代的索引：

```java
int size = MOVIES.size();
String myLastMovie = null;
for (int i = 0; i `< size; i++) {
    String movie = MOVIES.get(i);
    // ... 做一些与电影相关的工作
    if (i == size - 1) {
        myLastMovie = movie;
    }
}
assertEquals("No Country For Old Men", myLastMovie);
```

我们可以遵循相同的思路，**创建一个包含列表元素所有索引的IntStream**。然后，我们可以使用forEach()方法遍历索引，并像在传统for循环中一样检查当前是否是最后一次迭代：

```java
int size = MOVIES.size();
Map<Integer, String>` myLastMovie = new HashMap<>();
IntStream.range(0, size)
  .forEach(idx -> {
      String movie = MOVIES.get(idx);
      // ... 做一些与电影相关的工作
      if (idx == size - 1) {
          myLastMovie.put(idx, movie);
      }
  });
assertEquals(1, myLastMovie.size());
assertTrue(myLastMovie.containsKey(size - 1));
assertTrue(myLastMovie.containsValue("No Country For Old Men"));
```

正如我们在测试中看到的，我们使用了IntStream.range(0, list.size())方法来初始化列表的索引流。值得注意的是，我们使用了一个Map对象来存储最后一个索引和值，以供后续验证。这是因为**在lambdas中使用的局部变量必须是final或实际上的final**。

## 4. 使用外部计数器

另外，我们可以**维护一个外部计数器变量来跟踪迭代次数**。通过将计数器与集合的大小进行比较，我们可以确定最后一次迭代：

```java
int size = MOVIES.size();
String myLastMovie = null;
int cnt = 0;
for (String movie : MOVIES) {
    // ... 做一些与电影相关的工作
    if (++cnt == size) {
        myLastMovie = movie;
    }
}
assertEquals("No Country For Old Men", myLastMovie);
```

与IntStream解决方案相比，这种方法更直接。

## 5. 使用Iterator循环

尽管我们已经在IntStream和计数器方法中解决了问题，但这两种解决方案都需要引入新变量并执行额外的比较来检测最后一次迭代。

接下来，让我们看看在使用Iterator遍历列表时如何确定最后一次迭代。

Iterator提供了**hasNext()方法，允许我们方便地检查当前迭代是否是最后一次**。因此，我们不需要为此目的引入额外的变量：

```java
String movie;
String myLastMovie = null;
for (Iterator``<String>`` it = MOVIES.iterator(); it.hasNext(); ) {
    movie = it.next();
    // ... 做一些与电影相关的工作
    if (!it.hasNext()) { // 最后一个元素
        myLastMovie = movie;
    }
}
assertEquals("No Country For Old Men", myLastMovie);
```

正如我们所看到的，**使用Iterator是解决这个问题的最佳选择**。

## 6. 结论

在本文中，我们探讨了三种在for-each循环中遍历List时识别最后一次迭代的方法。

凭借其内置的hasNext()检查，Iterator方法可以是解决这个特定挑战的最佳解决方案。

如常，示例的完整源代码可在GitHub上找到。