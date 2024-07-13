---
date: 2022-04-01
category:
  - Java
  - Arrays
tag:
  - Java
  - Arrays
  - Subarray
head:
  - - meta
    - name: keywords
      content: Java, Arrays, Subarray, Slicing
---
# Java中数组切片

## 1. 概述

我们知道Java的_List_有一个_subList()_方法，它允许我们切分源_List_对象。然而，在数组方面并没有标准的_subArray()_方法。

在本教程中，让我们探索如何在Java中获取给定数组的子数组。

## 2. 问题介绍

像往常一样，让我们通过一个例子来理解问题。假设我们有一个字符串数组：

```java
String[] LANGUAGES = new String[] { "Python", "Java", "Kotlin", "Scala", "Ruby", "Go", "Rust" };
```

如我们所见，_LANGUAGES_数组保存了一些编程语言名称。另外，由于应用程序是用"Java"、"Kotlin"或"Scala"编写的，并且可以在Java虚拟机上运行，假设我们想要一个包含这三个元素的子数组。换句话说，**我们想要从_LANGUAGES_数组中获取从第二个到第四个元素（索引_1_, _2_, _3_）：**

```java
String[] JVM_LANGUAGES = new String[] { "Java", "Kotlin", "Scala" };
```

在本教程中，我们将讨论解决这个问题的不同方法。此外，为了简单起见，我们将使用单元测试断言来验证每种解决方案是否按预期工作。

接下来，让我们看看它们是如何工作的。

## 3. 使用Stream API

Java 8带给我们的一个重要新特性是Stream API。因此，如果我们使用的Java版本是8或更高版本，我们可以使用Stream API来切分给定的数组。

**首先，我们可以使用_Arrays.stream()_方法将数组转换为_Stream_对象。** 我们应该注意到，我们应该使用带有三个参数的_Arrays.stream()_方法：

- _数组_ - 在这个例子中，它是_LANGUAGES_
- _startInclusive_ - 从上面的数组中提取的起始索引，包括在内
- _endExclusive_ - 结束索引，顾名思义，不包括

因此，要解决我们的问题，我们可以将_LANGUAGES_, _1_和_4_传递给_Arrays.stream()_方法。

接下来，让我们创建一个测试来看看它是否可以获得我们想要的子数组：

```java
String[] result = Arrays.stream(LANGUAGES, 1, 4).toArray(String[]::new);
assertArrayEquals(JVM_LANGUAGES, result);
```

正如上面的代码所示，将数组转换为_Stream_之后，我们可以调用_toArray()_方法将其转换回数组。

如果我们运行测试，它会通过。因此，它完成了工作。

## 4. 使用_Arrays.copyOfRange()_方法

我们已经学会了使用Stream API来解决问题。然而，**Stream API仅在Java 8及更高版本中可用**。

如果我们的Java版本是6或更高版本，我们可以使用_Arrays.copyOfRange()_方法来解决问题。这个方法的参数与_Arrays.stream()_方法相似 - 数组，from-index（包括）和to-index（不包括）。

所以接下来，让我们创建一个测试来看看_Arrays.copyOfRange()_是否可以解决问题：

```java
String[] result = Arrays.copyOfRange(LANGUAGES, 1, 4);
assertArrayEquals(JVM_LANGUAGES, result);
```

如果我们运行测试，它会通过。所以它也解决了我们的问题。

## 5. 使用_System.arraycopy()_方法

_Arrays.copyOfRange()_方法通过将给定数组的一部分复制到一个新数组来解决问题。

当我们想要从数组中复制一部分时，除了_Arrays.copyOfRange()_方法，我们还可以使用_System.arraycopy()_方法。所以接下来，让我们使用这个方法来解决问题。

我们已经看到_Arrays.copyOfRange()_返回结果子数组。然而，**_System.arraycopy()_方法的返回类型是_void_**。因此，我们必须创建一个新的数组对象并将其传递给_arraycopy()_方法。该方法在数组中填充复制的元素：

```java
String[] result = new String[3];
System.arraycopy(LANGUAGES, 1, result, 0, 3);
assertArrayEquals(JVM_LANGUAGES, result);
```

如果我们运行测试，它会通过。

正如上面的代码所示，_arraycopy()_方法有五个参数。让我们了解它们的含义：

- 源数组 - _LANGUAGE_
- 源数组中要复制的from索引 - _1_
- 用于保存复制结果的目标数组 - _result_
- 在目标数组中存储复制结果的起始索引 - _0_
- 我们想要从源数组中复制的元素数量 - _3_

值得一提的是，**如果结果数组已经包含数据，_arraycopy()_方法可能会覆盖数据**：

```java
String[] result2 = new String[] { "value one", "value two", "value three", "value four", "value five", "value six", "value seven" };
System.arraycopy(LANGUAGES, 1, result2, 2, 3);
assertArrayEquals(new String[] { "value one", "value two", "Java", "Kotlin", "Scala", "value six", "value seven" }, result2);
```

这次，_result2_数组包含七个元素。进一步地，当我们调用_arraycopy()_方法时，我们告诉它从_result2_的索引2开始填充复制的数据。正如我们所看到的，复制的三个元素已经覆盖了_result2_中的原始元素。

我们还应该注意到_System.arraycopy()_是一个本地方法，而_Arrays.copyOfRange()_方法在内部调用_System.arraycopy()_。

## 6. 使用Apache Commons Lang3库中的_ArrayUtils_

Apache Commons Lang3是一个相当广泛使用的库。它的_ArrayUtils_提供了许多方便的方法，以便我们可以更容易地使用数组。

最后，让我们使用_ArrayUtils_类来解决问题。

在我们开始使用_ArrayUtils_之前，让我们将依赖项添加到我们的Maven配置中：

```xml
`<dependency>`
    `<groupId>`org.apache.commons`</groupId>`
    `<artifactId>`commons-lang3`</artifactId>`
    `<version>`3.14.0`</version>`
`</dependency>`
```

当然，我们总是可以在Maven中央仓库中找到最新版本。

_ArrayUtils_类有一个_subarray()_方法，它允许我们快速获取子数组：

```java
String[] result = ArrayUtils.subarray(LANGUAGES, 1, 4);
assertArrayEquals(JVM_LANGUAGES, result);
```

正如我们所看到的，使用_subarray()_方法解决问题非常简单。

## 7. 结论

在本文中，我们学习了从给定数组中获取子数组的不同方法。

像往常一样，这里展示的所有代码片段都可以在GitHub上找到。