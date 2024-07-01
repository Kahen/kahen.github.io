---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - List to Array
  - Java 8
  - Guava
head:
  - - meta
    - name: keywords
      content: Java, List, Array, Convert, Tutorial
------
# Java中将List``````````<Long>``````````对象转换为Long[]数组

列表和数组是Java中存储对象的两种常见方式。在我们需要存储和操作数据的项目中，列表和数组都允许在我们的程序执行过程中存储数据。

本教程解释了如何在Java中将List``````````<Long>``````````对象转换为Long[]数组。

### 2. 使用List.toArray()方法
List接口提供了toArray()方法，该方法返回一个包含所有列表元素的数组对象。

让我们看看如何使用toArray()方法将List``````````<Long>``````````对象转换为Java中的Long[]数组：

```java
List``````````<Long>`````````` list = Arrays.asList(1L, 2L, 3L, 4L, 5L);
Long[] array = new Long[list.size()];
array = list.toArray(array);
```

在上面的例子中，我们创建了一个新的Long值数组，其大小与我们要转换的列表相同。我们还可以通过传递一个空数组，并将内存分配委托给JVM：

```java
List``````````<Long>`````````` list = Arrays.asList(1L, 2L, 3L, 4L, 5L);
Long[] array = new Long[0];
array = list.toArray(array);
```

### 3. 使用Guava库
Guava库提供了Longs.toArray()方法，该方法将Long值的集合转换为相同顺序的Long数组。

让我们展示如何使用Guava的Longs.toArray()方法将List``````````<Long>``````````对象转换为Long[]数组：

```java
List``````````<Long>`````````` list = Arrays.asList(1L, 2L, 3L, 4L, 5L);
long[] array = Longs.toArray(list);
```

我们应该意识到，如果传递的集合或其任何元素为null，Guava的Longs.toArray()方法将抛出NullPointerException。

### 4. 使用Stream.mapToLong()方法
Java 8允许使用Stream API将List转换为数组。首先，我们必须使用List.stream()方法将所需的列表转换为流。其次，我们将应用Stream.mapToLong()方法以返回LongStream。最后，我们将使用Stream.toArray()方法返回包含来自流的Long元素的数组。

现在让我们看看如何在两种不同方式中实现mapToLong()方法。

首先，让我们使用lambda表达式：

```java
List``````````<Long>`````````` list = Arrays.asList(1L, 2L, 3L, 4L, 5L);
long[] array = list.stream().mapToLong(l -> l).toArray();
```

其次，让我们使用方法引用：

```java
List``````````<Long>`````````` list = Arrays.asList(1L, 2L, 3L, 4L, 5L);
long[] array = list.stream().mapToLong(Long::longValue).toArray();
```

### 5. 结论
在本文中，我们学习了如何使用三种方法将Java中的List``````````<Long>``````````对象转换为Long[]数组。第一种方法使用了List.toArray()方法。第二种，我们使用了Guava的Longs.toArray()方法。最后，我们通过mapToLong()方法使用了Java 8 Stream API。

如往常一样，代码示例可在GitHub上找到。