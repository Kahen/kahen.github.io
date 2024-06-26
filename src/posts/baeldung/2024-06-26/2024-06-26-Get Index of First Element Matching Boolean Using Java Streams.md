---
date: 2024-06-26
category:
  - Java
  - Streams
tag:
  - Java 8
  - Stream API
head:
  - - meta
    - name: keywords
      content: Java, Streams, Index, First Match
---
# 使用Java Stream API获取布尔条件匹配的第一个元素的索引

## 1. 引言

在数据结构中查找元素的索引是开发者的常见任务。在本教程中，我们将使用Java Stream API和第三方库来查找列表中第一个匹配布尔条件的元素的索引。

## 2. 环境搭建

在本文中，我们将使用下面提到的User对象编写一些测试用例来实现我们的目标：

```java
public class User {
    private String userName;
    private Integer userId;

    // 构造函数和getter方法
}
```

此外，我们将创建一个User对象的ArrayList，用于有的测试用例。之后，我们将找到名字为"John"的第一个用户的索引：

```java
List`<User>` userList = List.of(new User(1, "David"), new User(2, "John"), new User(3, "Roger"), new User(4, "John"));

String searchName = "John";
```

## 3. 使用Java Stream API

Java Stream API是在Java 8中引入的最佳特性之一。它提供了许多方法来迭代、过滤、映射、匹配和收集数据。考虑到这一点，让我们使用这些方法从列表中找到一个索引。

### 3.1. 使用stream()和filter()

让我们编写一个使用Stream类基本功能的测试用例，以获得一个索引：

```java
@Test
public void whenUsingStream_thenFindFirstMatchingUserIndex() {
    AtomicInteger counter = new AtomicInteger(-1);
    int index = userList.stream()
      .filter(user -> {
          counter.getAndIncrement();
          return searchName.equals(user.getUserName());
      })
      .mapToInt(user -> counter.get())
      .findFirst()
      .orElse(-1);

    assertEquals(1, index);
}
```

在这里，我们可以从列表创建一个Stream并应用filter()方法。在filter()方法内部，我们增加AtomicInteger以跟踪元素的索引。最后，我们映射计数器的值并使用findFirst()方法获得第一个匹配元素的索引。

### 3.2. 使用IntStream

或者，我们可以使用IntStream类来迭代列表元素，并使用上述部分中提到的类似逻辑获得索引：

```java
@Test
public void whenUsingIntStream_thenFindFirstMatchingUserIndex() {
    int index = IntStream.range(0, userList.size())
      .filter(streamIndex -> searchName.equals(userList.get(streamIndex).getUserName()))
      .findFirst()
      .orElse(-1);
    assertEquals(1, index);
}
```

### 3.3. 使用Stream takeWhile()

takeWhile()方法返回在谓词保持true时的数据。然而，一旦谓词失败，它就停止迭代以收集迭代的数据：

```java
@Test
public void whenUsingTakeWhile_thenFindFirstMatchingUserIndex() {
    long predicateIndex = userList.stream()
      .takeWhile(user -> !user.getUserName().equals(searchName))
      .count();
    assertEquals(1, predicateIndex);
}
```

上面的示例显示takeWhile()方法收集元素直到找到一个名为"John"的User对象，然后停止迭代。之后，我们可以使用count()方法获得第一个匹配元素的索引。

让我们再考虑一个列表中没有匹配元素的情况。在这种情况下，迭代继续到最后一个元素，输出值是4，这是从输入列表中迭代的总元素数：

```java
@Test
public void whenUsingTakeWhile_thenFindIndexFromNoMatchingElement() {
    long predicateIndex = userList.stream()
      .takeWhile(user -> !user.getUserName().equals(searchName))
      .count();
    assertEquals(4, predicateIndex);
}
```

**takeWhile()方法是在Java 9中引入的。**

## 4. 使用第三方库

尽管Java Stream API足以实现我们的目标，但它仅从Java 1.8版本开始可用。如果应用程序使用的是较旧版本的Java，那么外部库就变得有用。

### 4.1. Google Guava中的Iterables

我们将在pom.xml中添加最新的Maven依赖项：

```xml
``<dependency>``
    ``<groupId>``com.google.guava``</groupId>``
    ``<artifactId>``guava``</artifactId>``
    ``<version>``33.0.0-jre``</version>``
``</dependency>``
```

Guava库中的Iterables类有一个名为indexOf()的方法，它返回指定可迭代对象中第一个匹配给定谓词的元素的索引：

```java
@Test
public void whenUsingGoogleGuava_thenFindFirstMatchingUserIndex() {
    int index = Iterables.indexOf(userList, user -> searchName.equals(user.getUserName()));
    assertEquals(1, index);
}
```

### 4.2. Apache Common Collections中的IterableUtils

同样，Apache Common Collections库中的IterableUtils类也提供了获取索引的功能。让我们在pom.xml中添加Maven依赖项：

```xml
``<dependency>``
    ``<groupId>``org.apache.commons``</groupId>``
    ``<artifactId>``commons-collections4``</artifactId>``
    ``<version>``4.4``</version>``
``</dependency>``
```

IterableUtils的indexOf()方法接受一个可迭代集合和一个谓词，然后返回第一个匹配元素的索引：

```java
@Test
public void whenUsingApacheCommons_thenFindFirstMatchingUserIndex() {
    int index = IterableUtils.indexOf(userList, user -> searchName.equals(user.getUserName()));
    assertEquals(1, index);
}
```

**两个库中的indexOf()方法如果在没有元素满足谓词条件的情况下返回-1。**

## 5. 结论

在本文中，我们学习了不同的方法来查找列表中第一个匹配布尔条件的元素的索引。我们使用了Java Stream API、Google Guava中的Iterables类和Apache Commons Collections中的IterableUtils类。

如常，参考代码可在GitHub上找到。