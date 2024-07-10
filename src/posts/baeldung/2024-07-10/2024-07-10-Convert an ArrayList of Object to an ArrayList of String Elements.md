---
date: 2023-04-06
category:
  - Java
tag:
  - ArrayList
  - String
  - Collections
  - Streams
  - Guava
head:
  - - meta
    - name: keywords
      content: Java, ArrayList, String, Collections, Streams, Guava, 转换, 集合, 列表
---

# 将ArrayList`````<Object>`````转换为ArrayList```````````<String>```````````的不同方法

## 1. 引言

在本文中，我们将探讨不同方式，将给定的ArrayList`````<Object>`````转换为ArrayList```````````<String>```````````。

## 2. 问题陈述

让我们在这里理解问题陈述。假设我们有一个ArrayList`````<Object>`````，其中的对象可以是任何类型，从自动装箱的基本类型如Integer、Float或Boolean，到非基本的引用类型如String、ArrayList、HashMap，甚至是自定义定义的类。**我们必须编写代码将上述列表转换为ArrayList```````````<String>```````````**。让我们看一些例子：

```java
Example 1: [1, 2, 3, 4, 5]
Output 1: ["1", "2", "3", "4", "5"]

Example 2: ["Hello", 4.9837, -19837338737, true]
Output 2: ["Hello", "4.9837", "-19837338737", "true"]

Example 3: [new Node(1,4), new Double(7699.05), new User("John Doe")]
Output 3: ["Node (x=1, y=4)", "7699.05", "User (full name=John Doe)"]
```

我们可以在输入列表中提供各种不同的对象，包括自定义定义的类如User和Node，如下所示。**假设这些类有一个重写的toString()方法**。如果没有定义该方法，将调用Object类的toString()，它将生成如下输出：

```java
Node@f6d9f0, User@u8g0f9
```

上述示例包含自定义定义的类User和Node的实例：

```java
public class User {
    private final String fullName;

    // getters and setters

    @Override
    public String toString() {
        return "User (" + "full name='" + fullName + "')";
    }
}

public class Node {
    private final int x;
    private final int y;

    // getters and setters

    @Override
    public String toString() {
        return "Node (" + "x=" + x + ", y=" + y + ")";
    }
}
```

最后，假设在剩余部分中，变量inputList和expectedStringList包含对我们期望的输入和输出列表的引用：

```java
List`````<Object>````` inputList = List.of(
                        1,
                        true,
                        "hello",
                        Double.valueOf(273773.98),
                        new Node(2, 4),
                        new User("John Doe")
                    );
```

```java
List```````````<String>``````````` expectedStringList = List.of(
                        "1",
                        "true",
                        "hello",
                        Double.toString(273773.98),
                        new Node(2, 4).toString(),
                        new User("John Doe").toString()
                    );
```

## 3. 使用Java Collections For-Each循环进行转换

让我们尝试使用Java Collections来解决我们的问题。我们的想法是遍历列表的元素，并将每个元素转换为String。完成后，我们就有了一个String对象的列表。在以下代码中，我们使用for-each循环遍历给定的列表，并显式地通过调用它的toString()将每个对象转换为String：

```java
List```````````<String>``````````` outputList = new ArrayList<>(inputList.size());
for(Object obj : inputList){
    outputList.add(obj.toString());
}
Assert.assertEquals(expectedStringList, outputList);
```

这个解决方案适用于输入列表中的所有对象组合，并且在Java 5以上的所有Java版本上都有效。**然而，上述解决方案对输入中的null对象并不免疫，并且在遇到null时会抛出NullPointerException**。一个简单的增强是使用Java 7中引入的Objects实用类的toString()方法，它是null安全的：

```java
List```````````<String>``````````` outputList = new ArrayList<>(inputList.size());
for(Object obj : inputList){
    outputList.add(Objects.toString(obj, null));
}
Assert.assertEquals(expectedStringList, outputList);
```

## 4. 使用Java Streams进行转换

我们也可以利用Java Streams API来解决我们的问题。我们首先通过应用stream()方法将inputList，我们的数据源，转换为流。**一旦我们有了元素的流，这些元素的类型是Object，我们需要一个中间操作，在我们的情况下是执行对象到字符串的转换，最后，是一个终端操作，即将结果收集到另一个String类型的列表中。**

在我们的情况下，中间操作是一个map()操作，它采用一个lambda表达式：

```java
(obj) -> Objects.toString(obj, null)
```

最后，我们的流需要一个终端操作来编译并返回所需的列表。在下面的小节中，我们将讨论我们可以使用的不同终端操作。

### 4.1. 使用Collectors.toList()作为终端操作

在这种方法中，我们使用Collectors.toList()将由中间操作生成的流收集到输出列表中：

```java
List```````````<String>``````````` outputList;
outputList = inputList
    .stream()
    .map((obj) -> Objects.toString(obj, null))
    .collect(Collectors.toList());
Assert.assertEquals(expectedStringList, outputList);
```

这种方法适用于Java 8及以上版本，因为Streams API是在Java 8中引入的。这里产生的输出列表是可变的，这意味着我们可以向其中添加元素。输出列表也可以包含null值。

### 4.2. 使用Collectors.toUnmodifableList()作为终端操作 - Java 10兼容方法

如果我们想要生成一个不可修改的String对象的输出列表，我们可以利用Java 10中引入的Collectors.toUnmodifableList()实现：

```java
List```````````<String>``````````` outputList;
outputList = inputList
    .stream()
    .filter(Objects::nonNull)
    .map((obj) -> Objects.toString(obj, null))
    .collect(Collectors.toUnmodifiableList());
Assert.assertEquals(expectedStringListWithoutNull, outputList);
```

这里的一个重要注意事项是列表不能包含null值，因此，如果inputList包含null，则此代码会产生NullPointerException。这就是为什么我们在应用操作之前添加了一个过滤器，以从流中选择非null元素。outputList是不可变的，如果稍后有尝试修改它，将会产生UnsupportedOperationException。

### 4.3. 使用toList()作为终端操作 - Java 16兼容方法

如果我们想直接从输入Stream创建一个不可修改的列表，但我们想允许结果列表中包含null值，我们可以使用在Java 16中引入的Stream接口的toList()方法：

```java
List```````````<String>``````````` outputList;
outputList = inputList
    .stream()
    .map((obj) -> Objects.toString(obj, null))
    .toList();
Assert.assertEquals(expectedStringList, outputList);
```

## 5. 使用Guava进行转换

我们可以使用Google Guava库将输入对象列表转换为新的String列表。

### 5.1. Maven配置

要使用Google Guava库，我们需要在pom.xml中包含相应的Maven依赖项：

```xml
`<dependency>`
    `<groupId>`com.google.guava`</groupId>`
    `<artifactId>`guava`</artifactId>`
    `<version>`33.0.0-jre`</version>`
    `<scope>`test`</scope>`
`</dependency>`
```

依赖项的最新版本可以从Maven Central获取。

### 5.2. 使用Lists.transform()

我们可以使用Google Guava Lists类的transform()方法。它接受inputList和上述lambda表达式，以生成String对象的outputList：

```java
List```````````<String>``````````` outputList;
outputList = Lists.transform(inputList, obj -> Objects.toString(obj, null));
Assert.assertEquals(expectedStringList, outputList);
```

使用这种方法，输出列表可以包含null值。

## 6. 结论

在本文中，我们探讨了几种不同的方法，将ArrayList`````<Object>`````元素转换为ArrayList```````````<String>```````````。我们从基于for-each循环的方法探索到基于Java Streams的方法。我们还查看了特定于不同Java版本的不同实现，以及一个来自Guava的实现。像往常一样，所有代码示例都可以在GitHub上找到。

OK