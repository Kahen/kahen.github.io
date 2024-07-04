---
date: 2022-04-01
category:
  - Java
  - Collections
tag:
  - ArrayList
  - Set
  - Stream API
head:
  - - meta
    - name: keywords
      content: Java, ArrayList, unique values, Set, Stream API
---
# 从Java ArrayList中获取唯一值的方法

我们了解到，在Java中，ArrayList可以包含重复的值。
在本快速教程中，我们将探讨几种从Java ArrayList中获取唯一值的技术。

## 2. 问题介绍
有时，我们需要从ArrayList中提取唯一值——例如，为了增强数据分析、提高效率或简化进一步处理。
假设我们有一个列表，携带一些操作系统名称：
```java
List```<String>``` MY_LIST = Arrays.asList(new String[]{
  "Microsoft Windows",
  "Mac OS",
  "GNU Linux",
  "Free BSD",
  "GNU Linux",
  "Mac OS"});
```
在上面的代码中，我们从数组初始化了MY_LIST ArrayList。我们的目标是**从MY_LIST中获取唯一的操作系统名称列表**。
我们将讨论解决这个问题的两种不同方法。为了简单起见，我们将使用单元测试和AssertJ断言来验证每种方法是否产生预期的结果。
接下来，让我们看看它们是如何工作的。

## 3. 使用Set消除重复元素
Set和List接口之间的一个重要区别是，**Set不能持有重复元素**。因此，要获取MY_LIST的唯一元素，我们可以**首先将MY_LIST转换为Set，然后将Set转换回List**。
让我们创建一个测试来看看这是如何工作的：
```java
List```<String>``` result = new ArrayList<>(new HashSet<>(MY_LIST));
assertThat(result).containsExactlyInAnyOrder("Free BSD", "Microsoft Windows", "Mac OS", "GNU Linux");
```
敏锐的眼睛可能已经注意到我们使用了AssertJ的containsExactlyInAnyOrder()方法进行验证。这是因为我们将MY_LIST转换为HashSet，而**HashSet不维护插入顺序**。

**当需要保留插入顺序时，我们可以转而将列表转换为LinkedHashSet**：
```java
result = new ArrayList<>(new LinkedHashSet<>(MY_LIST));
assertThat(result).containsExactly("Microsoft Windows", "Mac OS", "GNU Linux", "Free BSD");
```
正如我们所看到的，这次我们使用了containsExactly()方法来验证结果。它不仅检查元素值，还检查它们的顺序。

## 4. 使用Stream API
Stream API是Java 8的一个重大新特性。它允许我们处理一组元素。
要从流中删除重复项，我们可以简单地调用distinct()方法：
```java
List```<String>``` result = MY_LIST.stream()
  .distinct()
  .collect(toList());
assertThat(result).containsExactly("Microsoft Windows", "Mac OS", "GNU Linux", "Free BSD");
```
当我们运行测试时，测试通过。

值得一提的是，**Collectors.toList()总是保留流的原始顺序**，除非我们将流转换为无序模式，例如，通过调用unordered()或使用Collectors.toSet()将其转换为HashSet。因此，我们使用containsExactly()方法来验证结果列表。

## 5. 结论
从列表中获取唯一值是Java开发中的一个常见需求。在本文中，我们深入探讨了解决这个问题的两种方法：
- 将List转换为Set，然后将Set转换回List
- 使用Stream API的distinct()功能
通过全面的例子，我们展示了如何有效地从列表中提取不同的元素。
此外，我们还讨论了保持结果列表中元素顺序的方法，使其与原始输入列表对齐。
像往常一样，这里展示的所有代码片段都可以在GitHub上找到。