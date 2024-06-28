---
date: 2022-04-01
category:
  - Java
  - Arrays
tag:
  - Java
  - Arrays
  - mismatch()
head:
  - - meta
    - name: keywords
      content: Java, Arrays, mismatch()
---
# Java 中 Arrays 类的 mismatch() 方法

## 1. 概述

在本教程中，我们将了解 Arrays 类的 mismatch() 方法的行为。这个方法有三个主要的重载版本，每种类型都可用。我们将以 int 数组为例进行说明。

## 2. 基础的 mismatch() 方法

### 2.1. 公共前缀的长度
mismatch() 方法接受两个数组，并返回数组中第一个不同项的索引。例如，{1, 2, 3, 4, 5} 和 {1, 2, 3, 5, 8} 在索引 3 处不同。

让我们使用 JUnit5 编写单元测试来验证方法的行为是否符合预期：

```java
@Test
void givenTwoArraysWithACommonPrefix_whenMismatch_thenIndexOfFirstMismatch() {
    int[] firstArray = {1, 2, 3, 4, 5};
    int[] secondArray = {1, 2, 3, 5, 8};
    assertEquals(3, Arrays.mismatch(firstArray, secondArray));
}
```

我们可以注意到，如果一个数组是另一个数组的前缀，结果将是最小数组的长度：

```java
@Test
void givenFirstArrayIsAPrefixOfTheSecond_whenMismatch_thenFirstArrayLength() {
    int[] firstArray = {1, 2, 3, 4, 5};
    int[] secondArray = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    assertEquals(firstArray.length, Arrays.mismatch(firstArray, secondArray));
}
```

如果两个数组的第一个元素不同，结果将是 0：

```java
@Test
void givenNoCommonPrefix_whenMismatch_thenZero() {
    int[] firstArray = {1, 2, 3, 4, 5};
    int[] secondArray = {9, 8, 7};
    assertEquals(0, Arrays.mismatch(firstArray, secondArray));
}
```

### 2.2. 边缘情况
当两个数组的元素完全相同时，方法返回 -1：

```java
@Test
void givenTwoEmptyArrays_whenMismatch_thenMinusOne() {
    assertEquals(-1, Arrays.mismatch(new int[] {}, new int[] {}));
}
```

让我们注意，两个空数组没有不匹配，所以在这种情况下结果也是 -1：

```java
@Test
void givenTwoEmptyArrays_whenMismatch_thenMinusOne() {
    assertEquals(-1, Arrays.mismatch(new int[] {}, new int[] {}));
}
```

### 2.3. 空数组或 null 数组
然而，如果恰好有一个数组是空的，mismatch() 返回空数组的长度，即 0：

```java
@Test
void givenExactlyOneAnEmptyArray_whenMismatch_thenZero() {
    int[] firstArray = {};
    int[] secondArray = {1, 2, 3};
    assertEquals(0, Arrays.mismatch(firstArray, secondArray));
}
```

最后但同样重要的是，如果任何一个数组是 null，mismatch() 会抛出 NullPointerException：

```java
@Test
void givenAtLeastANullArray_whenMismatch_thenThrowsNullPointerException() {
    int[] firstArray = null;
    int[] secondArray = {1, 2, 3, 4, 5};
    assertThrows(NullPointerException.class, () -> Arrays.mismatch(firstArray, secondArray));
}
```

最后，我们可以将 mismatch() 方法应用于 boolean、byte、char、short、int、long、float、double 和 Object 数组。

## 3. 子数组的 mismatch() 方法

我们现在将关注签名为 int mismatch(int[] a, int aFromIndex, int aToIndex, int[] b, int bFromIndex, int bToIndex) 的方法变体。这个方法变体从每个数组中提取子数组，然后检查不匹配项。

### 3.1. 子数组上的相似行为
让我们通过一个例子来看看它的行为：

```java
@Test
void givenTwoSubArraysWithACommonPrefix_whenMismatch_thenIndexOfFirstMismatch() {
    int[] firstArray = {1, 2, 3, 4, 5};
    int[] secondArray = {0, 1, 2, 3, 5, 8};
    assertEquals(3, Arrays.mismatch(firstArray, 0, 4, secondArray, 1, 6));
}
```

让我们一步一步理解发生了什么：

- 首先，该方法计算原始第一个数组 {1, 2, 3, 4, 5} 索引 0 到 4 之间的子数组：结果是新的第一数组 {1, 2, 3, 4}
- 然后它计算原始第二个数组 {0, 1, 2, 3, 5, 8} 索引 1 到 6 之间的子数组：结果是数组 {1, 2, 3, 5, 8}
- 最后，它将基础的 mismatch() 方法应用于两个子数组：{1, 2, 3, 4} 和 {1, 2, 3, 5, 8}；它们都以 {1, 2, 3} 开始，但第四个元素不匹配

因此，在这种情况下，方法返回 4。此外，基础版本中列出的所有点对于这些变体也是有效的：

- 如果没有不匹配，方法返回 -1
- 如果任何数组为 null，方法抛出 NullPointerException
- 这个方法被重写为 boolean、byte、char、short、int、long、float、double 和 Object 数组

### 3.2. 额外的异常
除了标准行为外，子数组方法引入了新的 Exception。如果对于任何数组，“from” 索引大于 “to” 索引，mismatch() 抛出 IllegalArgumentException：

```java
@Test
void givenToIndexGreaterThanFromIndex_whenMismatch_thenThrowsIllegalArgumentException() {
    int[] firstArray = {2, 3, 4, 5, 4, 3, 2};
    int[] secondArray = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    assertThrows(IllegalArgumentException.class, () -> Arrays.mismatch(firstArray, 4, 2, secondArray, 0, 6));
}
```

此外，如果我们传递一个非法索引作为参数，方法将抛出 ArrayIndexOutOfBoundsException：

```java
@Test
void givenIllegalIndexes_whenMismatch_thenThrowsArrayIndexOutOfBoundsException() {
    int[] firstArray = {2, 3, 4, 5, 4, 3, 2};
    int[] secondArray = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    assertThrows(ArrayIndexOutOfBoundsException.class, () -> Arrays.mismatch(firstArray, -1, 2, secondArray, 0, 6));
}
```

总之，“from” 索引必须大于 0，而 “to” 索引必须大于 “from” 索引且小于数组的长度。

## 4. 带有 Comparator 的通用方法

方法的最后一个变体接受两种通用类型的数组，并根据 Comparator 计算第一个不匹配项。例如，让我们取两个 String 数组并使用 String 类中的 CASE_INSENSITIVE_ORDER Comparator：

```java
@Test
void givenTwoStringArraysAndAComparator_whenMismatch_thenIndexOfFirstMismatch() {
    String[] firstArray = {"one", "two", "three"};
    String[] secondArray = {"ONE", "TWO", "FOUR"};
    Comparator```<String>``` comparator = String.CASE_INSENSITIVE_ORDER;
    assertEquals(2, Arrays.mismatch(firstArray, secondArray, comparator));
}
```

所有前面部分关于边缘情况和 Exceptions 的点在此同样有效。此外，如果给定的 Comparator 为 null，也会抛出 NullPointerException：

```java
@Test
void givenAtLeastANullArrayOrNullComparator_whenMismatch_thenThrowsNullPointerException() {
    String[] firstArray = {"one"};
    String[] secondArray = {"one"};
    Comparator```<String>``` comparator = String.CASE_INSENSITIVE_ORDER;
    assertThrows(NullPointerException.class, () -> Arrays.mismatch(firstArray, secondArray, null));
}
```

最后，我们可以注意到还有一个重写的方法，它使用子数组的方式类似：

```java
@Test
void givenTwoStringSubarraysAndAComparator_whenMismatch_thenIndexOfFirstMismatch() {
    String[] firstArray = {"one", "two", "three", "four"};
    String[] secondArray = {"ZERO", "ONE", "TWO", "FOUR", "EIGHT", "SIXTEEN"};
    Comparator```<String>``` comparator = String.CASE_INSENSITIVE_ORDER;
    assertEquals(2, Arrays.mismatch(firstArray, 0, 4, secondArray, 1, 3, comparator));
}
```

## 5. 结论

在本文中，我们计算了两个数组之间的