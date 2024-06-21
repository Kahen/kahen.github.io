---
date: 2024-06-16
category:
  - Java
tag:
  - 队列
  - 列表
---
# Java中将队列转换为列表
在本教程中，我们将学习如何在Java中将队列对象转换为列表。

我们将解释几种流行的方法及其实现方式，并在每个部分结束时提供一个测试用例来测试相应的实现。

在这一部分，我们将使用标准Java类和方法介绍不同的将队列转换为列表的方法。我们假设所有示例中的队列都不为null。

### 2.1 使用ArrayList构造器
ArrayList构造器提供了将队列转换为ArrayList的最简单和最常见的方法。

**基本思想是将队列作为参数传递给ArrayList构造器**：

```java
List`````<String>````` list = new ArrayList<>(queue);
```

构造器`new ArrayList<>(queue)`有效地将队列中的所有元素插入到新的ArrayList中。

### 2.2 使用addAll()方法
addAll()方法是另一个值得考虑的选项，如果我们想要将队列转换为列表。

顾名思义，**此方法允许将指定集合中的所有元素添加到列表中**。

现在，让我们看看逻辑：

```java
List`````<String>````` list = new ArrayList<>();
list.addAll(queue);
```

我们创建一个新的名为list的列表，并使用addAll()方法使用队列的元素填充它。然后该方法返回结果列表。

### 2.3 使用LinkedList构造器
LinkedList构造器提供了将队列转换为LinkedList的最常见和最简单的方法。

类似于上面使用ArrayList构造器的例子，**我们只需将队列作为参数传递给LinkedList构造器**：

```java
LinkedList`````<String>````` list = new LinkedList<>(queue);
```

构造器`new LinkedList<>(queue)`有效地将队列元素转换为新的LinkedList。

### 2.4 使用Stream API
Java 8带来了许多新功能，帮助我们增强代码。在这些特性中，我们发现了Stream API。

让我们说明如何使用stream API将队列转换为列表：

```java
List`````<String>````` list = queue.stream().collect(Collectors.toList());
```

**我们使用collect(Collectors.toList())操作将队列转换为列表，该操作将流中的元素收集到一个新列表中并返回它。**这种方法利用了流的简洁和函数式编程风格来执行转换。

### 2.5 使用Guava
Guava是由Google开发的流行的开源库，它提供了一系列实用类和方法，以简化Java中的常见编程任务。

让我们使用Guava将队列转换为列表：

```java
List`````<String>````` list = Lists.newArrayList(queue);
```

**Guava的实用方法Lists.newArrayList(queue)简化了从队列元素创建新列表的过程。**

## 3 结论
在本文中，我们看到了Java中将队列转换为列表的多种方式。无论我们喜欢LinkedList的简单性、ArrayList的多功能性、Java 8流的优雅性，还是Guava的强大功能，了解这些技术使我们能够在Java项目中无缝处理数据。我们可以试验这些方法，找到最适合我们需求和编码风格的方法。

所有这些示例的源代码都可以在GitHub上找到。

文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。