---
date: 2022-04-01
category:
  - Java
  - 性能比较
tag:
  - Java
  - 字符串连接
  - 性能
head:
  - - meta
    - name: keywords
      content: Java, 字符串连接, 性能比较, JMH, StringBuffer, StringBuilder, String.format(), 流API
---
# Java中不同字符串连接方法的性能比较

在Java中，字符串连接是文本操作中常见的操作。然而，你选择连接字符串的方式可能会对你的应用程序性能产生重大影响。**理解不同的连接方法及其性能特性对于编写高效和优化的代码至关重要。**

在本教程中，**我们将深入探讨Java中的不同字符串连接方法。我们将使用JHM工具对这些方法的执行时间进行基准测试和比较。**

## 2. 基准测试

我们将采用JMH（Java Microbenchmark Harness）进行我们的基准测试。**JMH提供了一个框架，用于测量小代码片段的性能，使开发人员能够分析和比较不同的实现。**

在我们继续之前，让我们设置我们的环境来运行基准测试。Core和Annotation Processors都可以在Maven Central中找到。

```xml
``<dependency>``
    ``<groupId>``org.openjdk.jmh``</groupId>``
    ``<artifactId>``jmh-core``</artifactId>``
    ``<version>``1.37``</version>``
``</dependency>``
``<dependency>``
    ``<groupId>``org.openjdk.jmh``</groupId>``
    ``<artifactId>``jmh-generator-annprocess``</artifactId>``
    ``<version>``1.37``</version>``
``</dependency>``
```

## 3. 不可变字符串连接

不可变字符串连接涉及为每次连接操作创建一个新的不可变_String_实例。每次发生连接时，都会生成一个新的字符串对象。**这种方法简单直接，但由于创建了多个对象，可能在内存效率上较低。**

现在，让我们快速看看各种不可变方法：

### 3.1. 使用加法(+)运算符

这是最简单的方式，可能也是我们最熟悉的方式。它可以使用加法+运算符连接字符串字面量、变量或两者的组合：

```java
String str1 = "String";
String str2 = "Concat";
String result = str1 + str2;
```

### 3.2. 使用_concat()_方法

_concat()_方法由_String_类提供，可用于连接两个字符串：

```java
String str1 = "String";
String str2 = "Concat";
String result = str1.concat(str2);
```

### 3.3. 使用_String.join()_方法

_String.join()_是Java 8及以上版本中的一个新静态方法。它允许使用指定的分隔符连接多个字符串：

```java
String str1 = "String";
String str2 = "Concat";
String result = String.join("", str1, str2);
```

### 3.4. 使用_String.format()_方法

_String.format()_用于使用占位符和格式说明符格式化字符串。它允许你通过用实际值替换占位符来创建格式化的字符串：

```java
String str1 = "String";
String str2 = "Concat";
String result = String.format("%s%s", str1, str2);
```

### 3.5. 使用Java _Stream_ API

最后，我们来看看Java _Stream_ API，它也从Java 8开始可用。它提供了一种表达方式，用于对对象集合执行操作，并允许我们使用_Collectors.joining()_连接字符串：

```java
List`<String>` strList = List.of("String", "Concat");
String result = strList.stream().collect(Collectors.joining());
```

## 4. 可变字符串连接

现在让我们转向可变类别。这指的是使用可变字符序列连接字符串的过程，其中底层对象可以被修改以追加或插入字符。**可变连接是高效的，不需要为每个操作创建新对象。**

让我们看看可用的可变方法：

### 4.1. 使用_StringBuffer_

_StringBuffer_提供了一个可变字符序列。它允许动态操作字符串而不需要创建新对象。值得一提的是，**它被设计为线程安全的**，这意味着它可以被多个线程同时安全访问和修改：

```java
StringBuffer buffer = new StringBuffer();
buffer.append("String");
buffer.append("Concat");
String result = buffer.toString();
```

### 4.2. 使用_StringBuilder_

_StringBuilder_与_StringBuffer_具有相同的目的。它们之间的唯一区别是**_StringBuilder_不是线程安全的**，而_StringBuffer_是。**它非常适合单线程场景，其中线程安全性不是问题：**

```java
StringBuilder builder = new StringBuilder();
builder.append("String");
builder.append("Concat");
String result = builder.toString();
```

### 4.3. 使用_StringJoiner_

_StringJoiner_是Java 8及以上版本中的一个新类。它的功能与_StringBuilder_相似，提供了一种使用分隔符连接多个字符串的方式。虽然它与_StringBuilder_相同，**_StringJoiner_不是线程安全的：**

```java
StringJoiner joiner = new StringJoiner("");
joiner.add("String");
joiner.add("Concat");
String result = joiner.toString();
```

## 5. 性能评估

在这一部分，我们将在不同场景下评估不同字符串连接方法的性能，包括循环迭代和批量处理。

### 5.1. 循环迭代

我们将在循环中评估字符串连接性能，其中字符串会重复连接。在这种情况下，我们将评估不同方法在不同迭代次数下的性能。

我们将使用不同的迭代次数（100、1000和10000）进行测试，以查看计算时间如何随着迭代次数的增加而扩展。让我们从不可变方法开始：

| 方法 | 迭代次数 |
| --- | --- |
| 加法(+)运算符 | 3.369 | 322.492 | 31274.622 |
| concat()方法 | 3.479 | 332.964 | 32526.987 |
| String.join()方法 | 4.809 | 331.807 | 31090.466 |
| String.format()方法 | 19.831 | 1368.867 | 121656.634 |
| 流API | 10.253 | 379.570 | 30803.985 |

现在，我们可以看到可变方法的性能：

| 方法 | 迭代次数 |
| --- | --- |
| StringBuffer | 1.326 | 13.080 | 128.746 |
| StringBuilder | 0.512 | 4.599 | 43.306 |
| StringJoiner | 0.569 | 5.873 | 59.713 |

从上面的数字中，我们可以观察到这些类别在计算时间随着迭代次数增加时的明显行为差异。

**在可变类别中，计算时间随着数据大小线性增加。而在不可变类别中，计算时间呈指数增长。连接操作增加十倍，计算时间增加一百倍。**

我们还可以观察到，可变类别中的大多数方法显示出相似的计算时间，除了_String.format()_。它明显比其他方法慢，需要花费几倍的时间。**这种显著的性能差异可以归因于_String.format()_执行的额外解析和替换操作。**

在不可变类别中，_StringBuilder_是最快的选项，因为它没有与_StringBuffer_相比的同步开销。另一方面，_StringJoiner_的性能略慢于_StringBuilder_，因为它每次连接时都需要追加分隔符。

### 5.2. 批量处理

让我们通过一些方法来处理在可变类别中一次性连接多于2个字符串的方法。下面的例子说明了单个_String.join()_与5个连接：

```java
String result = String.join("", str1, str2, str3, str4, str5);
```

我们将在这一部分访问这些方法的性能。与前一节类似，我们将在批量中运行不同数量的连接测试（100、1000和10000）：

| 方法 | 连接数量 |
| --- | --- |
| 加法(+)运算符 | 0.777 | 33.768 | StackOverflowError |
| String.join()方法 | 0.820 | 8.410 | 88.888 |
| String.format()方法 | 3.871 | 38.659 | 381.652 |
| 流API | 2.019 | 18.537 | 193.709 |

当我们批量连接字符串时，我们观察到计算时间线性增长。再次，_String.format()_再次排在最后，这是意料之中的，由于额外的解析开销。

## 6. 结论

在本文中，我们探讨了Java中的不同字符串连接方法，并使用JMH评估了它们的性能。

我们通过循环迭代的性能评估观察到可变和不可变类别之间的明显行为差异。可变类别中的计算时间随着数据大小线性增加，而不可变类别显示出指数增长。**由于规模模式，我们应该在循环中连接字符串时采用可变方法。**

在我们介绍的所有方法中，**_StringBuilder_是最快速的，而_String.format()_是最慢的**，这是由于它的额外解析和替换操作。

像往常一样，所有的源代码都可以在GitHub上找到。我已经完成了翻译，以下是翻译的最后部分：

## 6. 结论

在本文中，我们探讨了Java中的不同字符串连接方法，并使用JMH评估了它们的性能。

我们通过循环迭代的性能评估观察到可变和不可变类别之间的明显行为差异。可变类别中的计算时间随着数据大小线性增加，而不可变类别显示出指数增长。**由于规模模式，我们应该在循环中连接字符串时采用可变方法。**

在我们介绍的所有方法中，**_StringBuilder_是最快速的，而_String.format()_是最慢的**，这是由于它的额外解析和替换操作。

像往常一样，所有的源代码都可以在GitHub上找到。

OK