---
date: 2024-06-21
category:
  - Java
  - Collections
tag:
  - Immutable List
  - Java
head:
  - - meta
    - name: keywords
      content: Java, Immutable List, Collections
---

# 在Java中向不可变列表添加一个元素 | Baeldung

在Java中，不可变对象确保了线程安全并防止了意外的修改，从而促进了健壮和可靠的代码。然而，有时我们希望向不可变列表添加元素。

在这个快速教程中，我们将探讨如何在Java中实现这一点。

## 2. 问题介绍

不可变列表不允许我们向其添加元素。但在某些情况下，我们希望将额外的元素合并到不可变列表中，同时不损害其不可变性。换句话说，**我们希望有一个包含给定不可变列表所有元素和新元素的不可变列表。**

接下来，让我们创建一个方法来实现这一点。为了简单起见，我们将使用单元测试断言来验证我们的解决方案是否产生了预期的结果。

## 3. 利用可变列表

解决这个问题的一个想法是**利用一个可变列表**，比如_ArrayList_。接下来，让我们详细阐述这个想法：

- 创建一个_ArrayList_来保存原始不可变列表中的所有元素
- 向_ArrayList_添加新元素
- 使_ArrayList_不可变

现在，让我们在方法中实现逻辑：

```java
static ````````<T>```````` List````````<T>```````` appendAnElement(List````````<T>```````` immutableList, T element) {
    List````````<T>```````` tmpList = new ArrayList<>(immutableList);
    tmpList.add(element);
    return Collections.unmodifiableList(tmpList);
}
```

正如代码所示，**_appendAnElement()_是一个泛型方法。** 它首先创建了_ArrayList tmpList_，包含给定_immutableList_的元素。然后，它向_tmpList_添加_element_。最后，返回_Collections.unmodifiableList(tmpList)_作为结果。正如方法名称所示，**_Collections.unmodifiableList()_返回指定列表的不可修改视图。**

接下来，让我们测试这个方法。由于**AssertJ可以快速检查集合是否不可变**，我们将使用这个库来验证我们的_appendAnElement()_方法是否按预期工作：

```java
List````````<String>```````` myList = List.of("A", "B", "C", "D", "E");
List````````<String>```````` expected = List.of("A", "B", "C", "D", "E", "F");
List````````<String>```````` result = appendAnElement(myList, "F");
assertThat(result).isEqualTo(expected)
  .isUnmodifiable();
```

由于**_List.of()_方法返回一个不可变列表**，我们使用这个方法来构建我们的输入_myList_。

如果运行测试，测试将通过。因此，问题解决了。然而，这个方法只能向列表添加一个元素。

接下来，让我们稍微扩展这个方法以支持多个元素的添加。

## 4. 添加多个元素

**_可变参数_（variable-length arguments）允许一个方法接受任意数量的相同类型的参数。** 因此，我们可以使用这种技术让我们的方法支持多个元素的添加：

```java
@SafeVarargs
static ````````<T>```````` List````````<T>```````` appendElements(List````````<T>```````` immutableList, T... elements) {
    List````````<T>```````` tmpList = new ArrayList<>(immutableList);
    tmpList.addAll(Arrays.asList(elements));
    return Collections.unmodifiableList(tmpList);
}
```

正如我们在上述代码中看到的，**我们使用_@SafeVarargs_注解方法，以确保我们的参数化_可变参数_类型是安全的**，并且不会导致堆污染。

使用这个方法，我们可以方便地向不可变列表添加一个或多个元素：

```java
List````````<String>```````` myList = List.of("A", "B", "C", "D", "E");

List````````<String>```````` expected1 = List.of("A", "B", "C", "D", "E", "F");
List````````<String>```````` result1 = appendElements(myList, "F");
assertThat(result1).isEqualTo(expected1)
  .isUnmodifiable();

List````````<String>```````` expected2 = List.of("A", "B", "C", "D", "E", "F", "G", "H", "I");
List````````<String>```````` result2 = appendElements(myList, "F", "G", "H", "I");
assertThat(result2).isEqualTo(expected2)
  .isUnmodifiable();
```

## 5. 结论

在本文中，我们探讨了如何在Java中向不可变列表添加元素，并演示了如何使用_可变参数_使方法接受相同类型的可变数量的参数。

如往常一样，示例的完整源代码可在GitHub上找到。翻译已经完成，以下是翻译的最后部分：

## 5. 结论

在这篇文章中，我们探索了如何在Java中向不可变列表添加元素，并展示了如何使用可变参数来使一个方法接受相同类型的可变数量的参数。

如往常一样，示例的完整源代码可以在GitHub上找到。

OK