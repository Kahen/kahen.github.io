---
date: 2022-11-01
category:
  - Kotlin
  - 数据结构
tag:
  - Kotlin
  - 数组
  - Set
head:
  - - meta
    - name: keywords
      content: Kotlin, 数组, Set, 转换
---
# Kotlin中数组与Set的转换 | Baeldung关于Kotlin

## 1. 引言

作为软件开发人员，我们经常需要在不同的数据结构之间进行转换，以便在各种场景中高效地管理数据。Kotlin提供了多种方法来无缝地将一种数据结构转换为另一种，例如传统的循环和内置函数。

在本教程中，我们将探讨在Kotlin中将数组和_Set_之间进行转换的不同方式。

数组是一种用于有序元素集合的数据结构，而Set通过不允许重复元素来保证其唯一性。

在这一部分，让我们看看将数组转换为Set的多种方式。

### 2.1. 使用 _toSet()_

我们可以使用数组上的_toSet()_ 方法将其转换为Set。让我们看一个例子：

```kotlin
val arr = arrayOf(1, 5, 2, 4, 1)
val set = arr.toSet()
assertEquals(setOf(1, 5, 2, 4), set)
```

**_toSet()_ 方法内部使用_LinkedHashSet_，确保结果集中的元素顺序与输入数组的顺序相对应**。由于Set不允许重复元素，结果集可能包含的元素少于输入数组。

### 2.2. 使用 _setOf()_

Kotlin提供了_setOf()_ 函数，可以从vararg创建一个Set：

```kotlin
val arr = arrayOf(1, 5, 2, 4, 1)
val set = setOf(*arr)
assertEquals(setOf(1, 5, 2, 4), set)
```

在这里，**我们通过在数组上使用展开运算符来调用_setOf()_方法，将其转换为_vararg_**。此外，Set保留了与数组相同的元素顺序，由_LinkedHashSet_支持。

### 2.3. 使用 _LinkedHashSet_ 构造函数

我们可以使用_LinkedHashSet_构造函数从数组创建一个新的Set：

```kotlin
val arr = arrayOf(1, 5, 2, 4, 1)
val set = LinkedHashSet(arr.toList())
assertEquals(setOf(1, 5, 2, 4), set)
```

在这个实现中，我们将数组转换为列表，然后使用_LinkedHashSet_构造函数创建一个实例。然而，我们应该注意到，**这种实现比其他实现的性能要低，因为需要多次转换**。

如果我们不关心保持插入顺序，我们也可以使用_HashSet_。

### 2.4. 使用循环

将数组转换为Set的另一种方法是使用循环。我们可以使用简单的_for_循环遍历数组的元素，并将元素添加到Set中：

```kotlin
val arr = arrayOf(1, 5, 2, 4, 1)
val mutableSet = mutableSetOf``<Int>``()
for (i in arr) {
    mutableSet.add(i)
}
assertEquals(setOf(1, 5, 2, 4), mutableSet)
```

因为我们在循环中添加元素，所以我们选择了一个可变的Set。

**虽然有直接的方法可用，但这种方法可以在将元素添加到Set之前转换元素，这在某些场景中可能很有用**。

## 3. 将_Set_转换为数组

在这一部分，我们将探讨将Set转换为数组的多种方式。

### 3.1. 使用 _toTypedArray()_

我们可以使用_Set_上的_toTypedArray()_方法将其转换为数组。让我们看一个示例代码：

```kotlin
val set = setOf(1, 2, 3, 4)
val arr = set.toTypedArray()
Assertions.assertArrayEquals(arrayOf(1, 2, 3, 4), arr)
```

Kotlin根据_Set_的类型自动分配数组的类型。这在我们需要使用数组而不是集合时特别有用，提供了一种方便的转换方式。

### 3.2. 使用 _Array_ 构造函数

将_Set_转换为数组的另一种方法是使用_Array()_构造函数以及_Set_上的_elementAt()_方法：

```kotlin
val set = setOf(1, 2, 3, 4)
val arr = Array(set.size) { set.elementAt(it) }
Assertions.assertArrayEquals(arrayOf(1, 2, 3, 4), arr)
```

在这种情况下，我们创建了一个与Set大小相同的数组。**然后，我们使用一个lambda函数来初始化数组的每个元素，使其来自_Set_中的相应元素。**

### 3.3. 使用循环

我们还可以使用循环遍历Set的元素，并将它们添加到数组中：

```kotlin
val set = setOf(1, 2, 3, 4)
val arr = arrayOfNulls``<Int>``(set.size)
var index = 0
for (element in set) {
    arr[index++] = element
}
Assertions.assertArrayEquals(arrayOf(1, 2, 3, 4), arr)
```

首先，我们创建了一个与Set大小相同的数组，用_null_值初始化。然后，我们遍历Set的每个元素，并将其添加到数组的相应位置。

我们也可以创建一个非空数组，并用默认值初始化它：

```kotlin
val arr = Array(set.size) { 0 }
```

使用这种方法，我们可以消除对_null_值的需求，尽管**这可能会导致轻微的性能开销，尤其是在处理大型数组时**。

## 4. 结论

在本文中，我们讨论了将数组转换为Set以及反之的各种方式。此外，我们还考察了直接转换方法和基于循环的方法。因此，根据场景，我们可以选择最合适的方法。

如常，这里使用的示例代码可以在GitHub上找到。