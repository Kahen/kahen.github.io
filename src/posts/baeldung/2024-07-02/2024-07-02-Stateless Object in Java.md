---
date: 2022-04-01
category:
  - Java
tag:
  - Stateless Object
  - Java
head:
  - - meta
    - name: keywords
      content: Java, Stateless Object, Strategy Pattern, Singleton Pattern
------
# Java中的无状态对象

在本教程中，我们将讨论如何在Java中实现无状态对象。**无状态对象是没有实例字段的类实例**。

在Java中，我们所有的代码都必须放在一个类中。在编写算法时，我们可能只需要在类中提供静态方法来实现这一点。

然而，有时我们可能希望将我们的算法绑定到一个无状态对象上。

当我们考虑Java中的对象时，我们通常想到的是包含字段状态的对象，以及操作该状态以提供行为的方法。

除此之外，我们可以创建具有不可修改字段的对象。这些对象在创建时定义了它们的状态，然后是不可变的，因为它们的状态不会改变。在并发操作中，不可变对象与无状态对象一样受益。

最后，我们有**完全没有字段或只有编译时常量字段的对象**。这些对象是无状态的。

让我们看看为什么我们可能想要使用一个无状态对象。

以我们的示例为例，让我们采用一个没有状态的排序算法。让我们选择冒泡排序作为我们的实现：

```java
public void sort(int[] array) {
    int n = array.length;
    for (int i = 0; i `< n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (array[j] >` array[j + 1]) {
                int swap = array[j];
                array[j] = array[j + 1];
                array[j + 1] = swap;
            }
        }
    }
}
```

### 3.1 多种无状态排序实现

我们现在想要增加使用其他排序算法进行排序的可能性，所以我们考虑了快速排序算法，它也是无状态的：

```java
public void sort(int[] array) {
    quickSort(array, 0, array.length - 1);
}

private void quickSort(int[] array, int begin, int end) {
    if (begin < end) {
        int pi = partition(array, begin, end);
        quickSort(array, begin, pi - 1);
        quickSort(array, pi + 1, end);
    }
}

private int partition(int[] array, int low, int high) {
    int pivot = array[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            int swap = array[i];
            array[i] = array[j];
            array[j] = swap;
        }
    }
    int swap = array[i + 1];
    array[i + 1] = array[high];
    array[high] = swap;
    return i + 1;
}
```

### 3.2 选择实现

假设决定使用哪种算法是在运行时做出的。

我们需要一种方法在运行时选择正确的排序算法。为此，我们使用一种称为策略设计模式的设计模式。

在我们的案例中实现策略模式，我们将创建一个名为_SortingStrategy_的接口，其中包含_sort()_方法的签名：

```java
public interface SortingStrategy {
    public void sort(int[] array);
}
```

我们现在可以将我们的每个排序策略实现为实现此接口的无状态对象。这允许我们在消费代码中使用传递给它的任何排序对象，同时切换到我们喜欢的任何实现：

```java
public class BubbleSort implements SortingStrategy {

    @Override
    public void sort(int[] array) {
        // 冒泡排序实现
    }
}

public class QuickSort implements SortingStrategy {

    @Override
    public void sort(int[] array) {
        // 快速排序实现
    }
    // 其他有用方法
}
```

这里我们的类没有字段，因此没有状态。然而，由于有一个对象，它可以满足我们为所有排序算法定义的公共接口——_SortingStrategy_。

### 3.3 单例无状态实现

我们想要引入一种方法，为用户提供所选的排序策略。由于类是无状态的，我们不需要它们的任何实例多于一个。因此，我们可以使用单例设计模式来实现这一点。

我们可以通过使用Java _enum_来实现策略实例的这种模式。

让我们从_class_类型切换到_enum_并添加一个常量——_INSTANCE_。这个常量实际上是特定排序算法的单个无状态实例。由于_enum_可以实现Java _interface_，这是提供策略对象单例的简洁方式：

```java
public enum BubbleSort implements SortingStrategy {

    INSTANCE;

    @Override
    public void sort(int[] array) {
        // 冒泡排序实现
    }
}

public enum QuickSort implements SortingStrategy {

    INSTANCE;

    @Override
    public void sort(int[] array) {
        // 快速排序实现
    }
    // 其他有用方法
}
```

### 3.4 测试排序策略

最后，我们编写测试以确保两种排序策略都能工作，并且可以轻松维护：

```java
@Test
void givenArray_whenBubbleSorting_thenSorted() {
    int[] arrayToSort = {17, 6, 11, 41, 5, 3, 4, -9};
    int[] sortedArray = {-9, 3, 4, 5, 6, 11, 17, 41};

    SortingStrategy sortingStrategy = BubbleSort.INSTANCE;
    sortingStrategy.sort(arrayToSort);
    assertArrayEquals(sortedArray, arrayToSort);
}

@Test
void givenArray_whenQuickSortSorting_thenSorted() {
    int[] arrayToSort = {17, 6, 11, 41, 5, 3, 4, -9};
    int[] sortedArray = {-9, 3, 4, 5, 6, 11, 17, 41};

    SortingStrategy sortingStrategy = QuickSort.INSTANCE;
    sortingStrategy.sort(arrayToSort);
    assertArrayEquals(sortedArray, arrayToSort);
}
```

## 4. 结论

在本文中，我们探讨了Java语言中的无状态对象。

我们看到了无状态对象对于保持不需要状态的算法非常有用，我们还研究了如何实现策略模式。

像往常一样，代码片段可以在GitHub上找到。