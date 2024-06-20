---
date: 2024-06-20
category:
  - Kotlin
  - Programming
tag:
  - ConcurrentModificationException
  - Exception Handling
head:
  - - meta
    - name: keywords
      content: Kotlin, ConcurrentModificationException, Exception Handling
---
# Kotlin中避免ConcurrentModificationException

在本教程中，我们将解决Kotlin中的一个常见问题：_ConcurrentModificationException_。这通常发生在我们尝试在迭代集合的同时修改它，这是并发编程中的一个常见陷阱。

这种异常可能会令人沮丧，特别是当我们不确定是什么导致了它或如何修复它时。让我们探讨这种异常的根本原因，以及最重要的是，一些避免在代码中出现它的策略。

**_ConcurrentModificationException_通常在尝试在迭代过程中修改集合时抛出**：

```kotlin
val numbers = mutableListOf(1, 2, 3, 4, 5)

assertThrows`<ConcurrentModificationException>` {
    for (item in numbers) {
        if (item == 3) {
            numbers.remove(item)
        }
    }
}
```

在这里，我们尝试在遍历列表的同时从中移除一个项目。这种同时进行的操作激活了Kotlin的安全机制，以防止数据不一致和竞态条件，导致_ConcurrentModificationException_。

简单来说，当在Kotlin中迭代集合时修改它，就会抛出_ConcurrentModificationException_。**尽管多线程可能会增加这种异常的可能性，但它也可以在单个线程中发生**。

在并发编程中，“并发”意味着两个或更多的进程同时发生，但它们不一定来自不同的线程。正如我们在上面的示例中看到的，如果我们尝试在单个线程中迭代集合的同时修改它，我们可能会遇到这种异常。

现在我们已经理解了_ConcurrentModificationException_的原因，让我们探索一些避免在代码中出现它的策略。

### 使用_Iterator_

避免_ConcurrentModificationException_的一个策略是在迭代时使用_Iterator_提供的函数。**_Iterator_允许我们在迭代过程中通过_remove()_函数安全地移除元素**：

```kotlin
val numbers = mutableListOf(1, 2, 3, 4, 5)
val iterator = numbers.iterator()
while (iterator.hasNext()) {
    val number = iterator.next()
    if (number == 3) {
        iterator.remove()
    }
}
```

在上面的代码中，我们使用_Iterator_的_remove()_函数而不是_List_的_remove()_函数。这样，我们可以防止_ConcurrentModificationException_。

### 使用_removeAll()_

我们还可以使用Kotlin标准库中的_removeAll()_函数来避免_ConcurrentModificationException_。

类似于Java的_removeIf()_函数，_removeAll()_函数使用函数式编程概念，使用给定的谓词过滤底层集合：

```kotlin
val numbers = mutableListOf(1, 2, 3, 4, 5)
numbers.removeAll { number -> number == 3 }
```

在上面的示例中，**_removeAll()_函数在内部迭代集合，并移除满足给定条件的每个元素**。这通常比手动迭代和修改集合更安全、更简洁，如果处理不当，可能会导致_ConcurrentModificationException_。

### 修改副本

**我们还可以采取另一种方法，即修改原始集合的副本**。在这里，我们复制集合，在副本上执行任何修改，然后替换原始集合：

```kotlin
var numbers = mutableListOf(1, 2, 3, 4, 5)
val copyNumbers = numbers.toMutableList()
for (number in numbers) {
    if (number == 3) {
        copyNumbers.remove(number)
    }
}
numbers = copyNumbers
```

正如我们在示例中看到的，我们通过不在原始列表上进行更改成功避免了异常。**然而，这种方法可能相对资源密集**。在内存占用很重要的情况下，我们应该优先选择本文中强调的其他解决方案。

### 使用_CopyOnWriteArrayList_

最后，我们可以使用_CopyOnWriteArrayList_来避免_ConcurrentModificationException_。**_CopyOnWriteArrayList_是_ArrayList_的线程安全变体**。**它在执行修改操作（如_add()_、_set()_或_remove()_）时会在内部创建底层列表的副本**。由于这种机制，它可以在被迭代时安全地处理修改：

```kotlin
val list = CopyOnWriteArrayList(listOf(1, 2, 3, 4, 5))

for (item in list) {
    if (item == 3) {
        list.remove(item)
    }
}

```

在这个示例中，尽管我们在迭代列表的同时修改了它，但没有发生_ConcurrentModificationException_。然而，我们必须记住，**_CopyOnWriteArrayList_会带来内存成本**，因为它在每次变异时都会创建底层数组的新副本。因此，我们应该在主要提供读取操作且写操作较少的集合中使用它。

### 结论

在本文中，我们学习了如何通过各种策略有效地管理Kotlin中的_ConcurrentModificationExceptions_。使用_Iterator_进行迭代期间的安全移除、使用_removeAll()_进行清晰的函数式风格修改、在集合副本上进行修改，或选择_CopyOnWriteArrayList_是我们可用的一些解决方案。每种方法都在安全性和性能考虑之间取得了平衡，使我们能够有效地解决Kotlin中的并发问题。

如常，代码示例可以在GitHub上找到。