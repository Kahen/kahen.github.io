---
date: 2022-04-01
category:
  - Java
  - Exception Handling
tag:
  - Java
  - ArrayIndexOutOfBoundsException
head:
  - - meta
    - name: keywords
      content: Java, ArrayIndexOutOfBoundsException, Exception Handling
---
# Java中的ArrayIndexOutOfBoundsException

在本教程中，我们将讨论Java中的_ArrayIndexOutOfBoundsException_。我们将理解它为何发生以及如何避免它。

## 何时会发生_ArrayIndexOutOfBoundsException_？
正如我们所知，在Java中，数组是一个静态数据结构，我们在创建时定义其大小。

我们使用索引来访问数组的元素。数组的索引从零开始，且永远不能大于或等于数组的大小。

简而言之，**经验法则是0 `<= index < (数组大小)**。

**当我们使用无效的索引访问数组或由数组支持的_Collection_时，就会发生_ArrayIndexOutOfBoundsException_**。这意味着索引要么小于零，要么大于或等于数组的大小。

此外，边界检查发生在运行时。因此，_ArrayIndexOutOfBoundsException_是一个运行时异常。因此，我们在访问数组的边界元素时需要格外小心。

让我们了解一些导致_ArrayIndexOutOfBoundsException_的常见操作。

### 2.1. 访问数组
在访问数组时可能发生的最常见错误是忘记了上下限。

数组的下界始终是0，而上界是其长度减一。

**超出这些界限访问数组元素将抛出_ArrayIndexOutOfBoundsException_**：

```java
int[] numbers = new int[] {1, 2, 3, 4, 5};
int lastNumber = numbers[5];
```

在这里，数组的大小是5，这意味着索引将从0到4的范围。

在这种情况下，访问第5个索引会导致一个_ArrayIndexOutOfBoundsException_：

```java
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5
    at ...
```

同样，如果我们将小于零的值作为索引传递给_numbers_，我们会得到类似的结果。

### 2.2. 访问由_Arrays.asList()_返回的_List_
静态方法_Arrays.asList()_返回一个固定大小的列表，由指定的数组支持。此外，它作为数组基础和集合基础API之间的桥梁。

这个返回的_List_有基于索引访问其元素的方法。同样，像数组一样，索引从零开始，范围到其大小减一。

**如果我们尝试访问由_Arrays.asList()_返回的_List_的元素超出这个范围，我们将得到一个_ArrayIndexOutOfBoundsException_**：

```java
List<Integer>` numbersList = Arrays.asList(1, 2, 3, 4, 5);
int lastNumber = numbersList.get(5);
```

同样，我们再次尝试获取_List_的最后一个元素。最后一个元素的位置是5，但其索引是4（大小 - 1）。因此，我们得到如下的_ArrayIndexOutOfBoundsException_：

```java
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5
    at java.base/java.util.Arrays$ArrayList.get(Arrays.java:4351)
    at  ...
```

同样，如果我们传递一个负索引，比如-1，我们会得到类似的结果。

### 2.3. 循环中的迭代
**有时，在for循环中迭代数组时，我们可能会放置一个错误的终止表达式。**

不是在数组长度减一的地方终止索引，我们可能会迭代到其长度：

```java
int sum = 0;
for (int i = 0; i `<= numbers.length; i++) {
    sum += numbers[i];
}
```

在上面的终止表达式中，循环变量_i_被比较为小于或等于现有数组_numbers_的长度。因此，在最后一次迭代中，_i_的值将变为5。

由于索引5超出了_numbers_的范围，它将再次导致_ArrayIndexOutOfBoundsException_：

```java
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5
    at com.baeldung.concatenate.IndexOutOfBoundExceptionExamples.main(IndexOutOfBoundExceptionExamples.java:22)
```

## 如何避免_ArrayIndexOutOfBoundsException_？
现在让我们了解一些避免_ArrayIndexOutOfBoundsException_的方法。

### 3.1. 记住起始索引
**我们必须始终记住Java中的数组索引从0开始**。因此，第一个元素总是在索引0处，而最后一个元素在数组长度减一的索引处。

记住这个规则将帮助我们大多数时候避免_ArrayIndexOutOfBoundsException_。

### 3.2. 在循环中正确使用运算符
**如果循环变量初始化为1，可能会导致_ArrayIndexOutOfBoundsException_**。

**同样，在循环的终止表达式中错误使用运算符<, <=, >`或>=是发生此异常的常见原因**。

我们应该正确确定这些运算符在循环中的使用。

### 3.3. 使用增强的_for_循环
如果我们的应用程序运行在Java 1.5或更高版本，我们应该使用增强的_for_循环语句，它专门开发用于迭代集合和数组。此外，它使我们的循环更加简洁易读。

**此外，使用增强的_for_循环有助于我们完全避免_ArrayIndexOutOfBoundsException_，因为它不涉及索引变量**：

```java
for (int number : numbers) {
    sum += number;
}
```

在这里，我们不必担心索引。增强的_for_循环在每次迭代中拾取一个元素并将其分配给循环变量_number_。因此，它完全避免了_ArrayIndexOutOfBoundsException_。

## _IndexOutOfBoundsException_与_ArrayIndexOutOfBoundsException_
_IndexOutOfBoundsException_发生在我们尝试访问某种类型（_String_, 数组, _List_等）的索引超出其范围时。它是_ArrayIndexOutOfBoundsException_和_StringIndexOutOfBoundsException_的超类。

与_ArrayIndexOutOfBoundsException_类似，当我们尝试使用超出其长度的索引访问_String_中的字符时，会抛出_StringIndexOutOfBoundsException_。

## 结论
在本文中，我们探讨了_ArrayIndexOutOfBoundsException_，一些它发生的例子，以及一些常见的避免技术。

如往常一样，所有这些示例的源代码都可以在GitHub上找到。抱歉，上文翻译中缺少了一部分内容，我将继续翻译剩余部分。

## 4. _IndexOutOfBoundsException_与_ArrayIndexOutOfBoundsException_
_IndexOutOfBoundsException_ 发生在我们尝试访问某种类型（如 _String_、数组、_List_ 等）的索引超出其范围时。它是 _ArrayIndexOutOfBoundsException_ 和 _StringIndexOutOfBoundsException_ 的超类。

与 _ArrayIndexOutOfBoundsException_ 类似，_StringIndexOutOfBoundsException_ 会在我们尝试使用超出字符串长度的索引来访问 _String_ 中的字符时抛出。

## 结论
在本文中，我们探讨了 _ArrayIndexOutOfBoundsException_，一些它发生的例子，以及一些常见的避免技术。

如往常一样，所有这些示例的源代码都可以在 GitHub 上找到。

---

OK