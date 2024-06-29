---
date: 2022-04-01
category:
  - Java
tag:
  - Java List
  - Case-Insensitive Search
head:
  - - meta
    - name: keywords
      content: Java List, Case-Insensitive Search, String Element, Search Method
------
# 检查列表是否包含字符串元素时忽略大小写 | Baeldung

## 1. 概述

在Java中，列表是一种非常常用的数据结构。有时，我们希望在不区分大小写的情况下检查一个字符串是否是列表中的元素。

在这个快速教程中，我们将探索Java中解决这个常见问题的各种方法和策略。

## 2. 问题介绍

列表提供了方便的`contains()`方法来检查给定的值是否存在于列表中。在背后，`List.contains()`通过`equals()`方法将给定的对象与列表中的每个元素进行比较。

因此，如果列表是`List```<String>````，`contains()`方法仅在区分大小写的情况下比较字符串。例如，我们有一个电影标题列表：

```java
List```<String>``` THE_LIST = List.of("Game of Thrones", "Forrest Gump", "American Beauty", "Pretty Woman", "Catch Me If You Can");
```

当我们使用`contains()`方法检查它是否包含“catch me if you can”时，它返回`false`：

```java
assertFalse(THE_LIST.contains("catch me if you can"));
```

然而，在许多情况下，我们希望`contains()`方法支持忽略大小写的检查。不幸的是，标准的`contains()`并没有提供这个选项。接下来，让我们看看如何实现我们的目标。

为了简单起见，我们将使用单元测试断言来验证每种方法是否按预期工作。

## 3. 使用循环

我们知道`String`类提供了`equalsIgnoreCase()`方法，该方法进行不区分大小写的等值检查。因此，解决我们问题的第一个想法是**遍历列表并使用`equalsIgnoreCase()`方法检查每个元素和给定值：**

```java
boolean ignoreCaseContainsForLoop(List```<String>``` list, String value) {
    for (String e : list) {
        if (value.equalsIgnoreCase(e)) {
            return true;
        }
    }
    return false;
}
```

如上所示，我们使用`for`循环来检查列表中的每个元素。一旦`equalsIgnoreCase()`方法在某个元素上报告为`true`，**我们立即返回`true`并停止进一步检查**。否则，如果在列表中的所有元素中都没有找到匹配项，该方法返回`false`。

我们可以创建一个测试来验证`ignoreCaseContainsForLoop()`方法是否按预期工作：

```java
assertTrue(ignoreCaseContainsForLoop(THE_LIST, "CATCH me if you CAN"));
assertTrue(ignoreCaseContainsForLoop(THE_LIST, "game of thrones"));
assertFalse(ignoreCaseContainsForLoop(THE_LIST, "The Godfather"));
```

## 4. 使用Stream API

从Java 8开始引入了Stream API。Stream API为高效和有效地处理集合提供了强大的机制。

接下来，让我们使用Stream API来解决我们的问题：

```java
assertTrue(THE_LIST.stream().anyMatch(e -> e.equalsIgnoreCase("CATCH me if you CAN")));
```

如上所示，我们使用Stream API的`anyMatch()`方法来确定是否有元素符合我们的条件。**我们使用lambda表达式将我们的条件传达给`anyMatch()`。**

另外，**我们可以选择使用方法引用将谓词传递给`anyMatch()`方法：**

```java
assertTrue(THE_LIST.stream().anyMatch("game of thrones"::equalsIgnoreCase));
assertFalse(THE_LIST.stream().anyMatch("The Godfather"::equalsIgnoreCase));
```

## 5. 结论

在本文中，我们探讨了两种执行不区分大小写的检查以确定字符串列表是否包含特定字符串的方法。

首先，我们通过创建一个传统的基于循环的方法来解决问题。接下来，我们利用了Stream API的`anyMatch()`方法来实现相同的目标。

如常，示例的完整源代码可以在GitHub上找到。