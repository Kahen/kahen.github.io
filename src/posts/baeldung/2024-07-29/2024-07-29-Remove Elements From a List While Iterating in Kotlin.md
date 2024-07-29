---
date: 2022-11-01
category:
  - Kotlin
  - Programming
tag:
  - Kotlin
  - List
  - Iterator
  - removeAll
head:
  - - meta
    - name: keywords
      content: Kotlin, List, remove elements, iteration
---
# Kotlin中在迭代列表时移除元素

如果你有几年的Kotlin语言和服务器端开发经验，并且有兴趣与社区分享这些经验，请查看我们的**贡献指南**。

## 1. 概述

在本教程中，我们将探讨如何在迭代过程中从列表中移除元素。Kotlin提供了多种灵活的方法，在迭代期间高效地从列表中移除元素。我们将探索适用于不同场景的不同技术。

## 2. 使用迭代器移除元素

首先，我们应该提到，只有当列表是可变的时，才可能从列表中移除元素。对于不可变的列表，当我们尝试从中移除元素时，编译器会抛出错误。不可变列表没有暴露修改的方法。

第一种经典方法是使用迭代器。它允许在向前迭代期间安全地移除元素：

```kotlin
@Test
fun `使用迭代器移除元素时它有效`() {
    val numbers = mutableListOf(1, 2, 3, 4, 5)
    val iterator = numbers.iterator()

    while (iterator.hasNext()) {
        val element = iterator.next()
        if (element % 2 == 0) {
            iterator.remove()
        }
    }
    Assertions.assertThat(numbers).containsExactlyElementsOf(mutableListOf(1, 3, 5))
}
```

在这个例子以及接下来的例子中，我们将使用一个可变的数字列表作为输入。我们创建了一个迭代器，它公开了一个_remove_方法。该方法移除迭代器当前指向的元素。因此，我们可以安全地向前迭代并移除元素。

此外，在测试结束时，我们检查列表是否只包含奇数。正如预期的那样，我们从初始列表中移除了数字2和4。

## 3. 使用removeAll()函数移除元素

现在，让我们看看removeAll()函数。它简化了迭代时移除元素的过程。此外，它提供了一种简洁易读的方式来根据指定的条件移除元素。

让我们通过一个示例来展示：

```kotlin
@Test
fun `使用removeAll函数移除元素时它有效`() {
    val numbers = mutableListOf(1, 2, 3, 4, 5)
    numbers.removeAll { it % 2 == 0 }
    Assertions.assertThat(numbers).containsExactlyElementsOf(mutableListOf(1, 3, 5))
}
```

得益于removeAll函数，我们只需要提供应该从列表中移除的元素的条件。列表中只剩下奇数。此外，removeAll函数在从集合中移除任何元素时返回_true_。否则，它返回_false_。

## 4. 迭代元素并移除

最后，我们将展示如何在迭代列表时移除元素。直接迭代在移除逻辑依赖于索引或涉及更复杂的检查时提供了灵活性。

最重要的是，我们必须反向迭代。这保证了在迭代期间元素的索引不会改变。

让我们看一个例子：

```kotlin
@Test
fun `迭代时移除元素时它有效`() {
    val numbers = mutableListOf(1, 2, 3, 4, 5)
    for (element in numbers.reversed()) {
        if (element % 2 == 0) {
            numbers.remove(element)
        }
    }
    Assertions.assertThat(numbers).containsExactlyElementsOf(mutableListOf(1, 3, 5))
}
```

在上面，我们使用reversed函数改变了迭代时元素的顺序。它返回一个只读列表。我们使用该列表中的元素来检查条件。与前面的示例一样，我们得到了一个只包含奇数的结果列表。

## 5. 结论

在本文中，我们展示了如何在迭代列表时从列表中移除元素。我们使用了迭代器、removeAll函数，并反向迭代列表。

如常，示例的源代码可以在GitHub上找到。