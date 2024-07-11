---
date: 2024-07-11
category:
  - Java
tag:
  - 编程
  - 转换
head:
  - - meta
    - name: keywords
      content: Java, List, Integer, String, 转换
---

# 将整数列表转换为字符串列表 | Baeldung

## 1. 概述

自Java 5版本以来，Java一直支持泛型。**Java泛型带给我们的一个好处是类型安全**。例如，当我们声明一个名为_myList_的_List_对象为_List````````<Integer>````````_时，我们不能将类型不是_Integer_的元素放入_myList_中。

然而，当我们使用泛型集合时，我们经常想要将_Collection``<TypeA>``_转换为_Collection``<TypeB>``_。

在本教程中，我们将以_List````````<Integer>````````_为例，探讨如何将_List````````<Integer>````````_转换为_List````````<String>````````_。

## 2. 准备一个_List````````<Integer>````````_对象作为示例

为了简单起见，我们将使用单元测试断言来验证我们的转换是否符合预期。因此，让我们首先初始化一个整数列表：

```java
List````````<Integer>```````` INTEGER_LIST = Arrays.asList(1, 2, 3, 4, 5, 6, 7);
```

如上所示，我们有七个整数在_INTEGER_LIST_对象中。现在，我们的目标是**将_INTEGER_LIST_中的每个整数元素转换为**_String_，例如，1转换为“1”，2转换为“2”，依此类推。最终结果应等于：

```java
List````````<String>```````` EXPECTED_LIST = Arrays.asList("1", "2", "3", "4", "5", "6", "7");
```

在本教程中，我们将讨论三种不同的方法来实现这一点：

- 使用Java 8的Stream API
- 使用Java _for_循环
- 使用Guava库

接下来，让我们看看它们是如何工作的。

## 3. 使用Java 8 Stream的map()方法

Java Stream API在Java 8及更高版本中可用。它提供了许多方便的接口，允许我们轻松地将_Collection_作为流来处理。

例如，**将_List``<TypeA>``_转换为_List``<TypeB>``_的一个典型方法是Stream的map()方法**：

```java
theList.stream().map( .. 转换逻辑 .. ).collect(Collectors.toList());
```

那么接下来，让我们看看如何使用_map()_方法将_List````````<Integer>````````_转换为_List````````<String>````````_：

```java
List````````<String>```````` result = INTEGER_LIST.stream().map(i -> i.toString()).collect(Collectors.toList());
assertEquals(EXPECTED_LIST, result);
```

如上所示的代码示例，我们向_map()_传递了一个lambda表达式，调用每个元素（_Integer_）的_toString()_方法将其转换为_String_。

如果我们运行它，测试将通过。所以，Stream的_map()_方法完成了工作。

## 4. 使用_for_循环

我们已经看到Stream的map()方法可以解决问题。然而，正如我们提到的，Stream API仅在Java 8及更高版本中可用。因此，如果我们使用的是旧版本的Java，我们需要用另一种方式解决问题。

例如，我们可以通过一个简单的_for_循环来进行转换：

```java
List````````<String>```````` result = new ArrayList<>();
for (Integer i : INTEGER_LIST) {
    result.add(i.toString());
}

assertEquals(EXPECTED_LIST, result);
```

上述代码显示，我们首先创建了一个新的_List````````<String>````````_对象，_result_。然后，我们在_for_循环中迭代_List````````<Integer>````````_列表中的元素，将每个_Integer_元素转换为_String_，并将其添加到_result_列表中。

如果我们运行它，测试将通过。

## 5. 使用Guava库

由于在处理集合时转换集合的类型是一个相当标准的操作，一些流行的外部库已经提供了实用方法来进行转换。

在这一部分，我们将使用Guava来展示如何解决问题。

首先，让我们在_pom.xml_中添Guava库依赖项：

```xml
`<dependency>`
    `<groupId>`com.google.guava`</groupId>`
    `<artifactId>`guava`</artifactId>`
    `<version>`31.1-jre`</version>`
`</dependency>`
```

当然，我们可以在Maven中央仓库中检查最新版本。

接下来，我们可以使用Guava的_Lists.transform()_方法来解决问题：

```java
List````````<String>```````` result = Lists.transform(INTEGER_LIST, Functions.toStringFunction());
assertEquals(EXPECTED_LIST, result);
```

**transform()方法对_INTEGER_LIST_中的每个元素应用_toStringFunction()_并返回转换后的列表。**

如果我们运行它，测试将通过。

## 6. 结论

在这篇短文中，我们学习了三种将_List````````<Integer>````````_转换为_List````````<String>````````_的方法。**如果我们的Java版本是8+，Stream API将是最直接的转换方法。** 否则，我们可以通过循环或转向外部库，如Guava，来进行转换。

源代码可在GitHub上找到。