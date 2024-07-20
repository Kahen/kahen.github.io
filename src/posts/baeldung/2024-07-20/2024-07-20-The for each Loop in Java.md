---
date: 2022-04-01
category:
  - Java
  - 控制结构
tag:
  - for-each循环
  - Java 5
  - 增强for循环
head:
  - - meta
    - name: keywords
      content: Java for-each loop, Java 5, 增强for循环
------
# Java 中的 for-each 循环

在本教程中，我们将讨论 Java 中的 for-each 循环，包括其语法、工作原理和代码示例。最后，我们将理解它的优点和缺点。

## 2. 简单的 for 循环

**Java 中的简单 for 循环基本上有三个部分——初始化、布尔条件和步骤：**

```
for (initialization; boolean-condition; step) {
    statement;
}
```

它从循环变量的初始化开始，然后是一个布尔表达式。如果条件为 true，则执行循环中的语句并将循环变量递增/递减。否则，终止循环。

这种模式使其稍微复杂且难以阅读。此外，**如果我们没有正确编写条件，总有进入无限循环的机会。**

for-each 循环是在 Java 5 中引入的。**我们也称它为增强的 for 循环。**

它是一种特别的遍历技术，专门用于遍历数组或集合。值得注意的是，它也使用 for 关键字。然而，它不是使用循环计数器变量，而是分配一个与数组或集合类型相同的变量。

**for-each 的名称意味着数组或集合的每个元素都被遍历，一个接一个。**

### 3.1. 语法

for-each 循环由一个循环变量的声明组成，后跟一个冒号（:），然后是数组或集合的名称：

```
for (data_type var_name : array | collection) {
    // code
}
```

### 3.2. 工作原理

对于每次迭代，for-each 循环获取集合的每个元素并将其存储在循环变量中。**因此，它为数组或集合的每个元素执行循环体中编写的代码。**

最重要的是，遍历直到数组或集合的最后一个元素。

### 3.3. 示例

让我们看一个使用 for-each 循环遍历数组的示例：

```
int numbers[] = { 1, 2, 3, 4, 5 };

for (int number : numbers) {
    System.out.print(number + " ");
}
```

在这里，for-each 循环逐个遍历数组 numbers 的每个元素，直到结束。**因此，没有必要使用索引访问数组元素。**

现在，让我们看看一些使用 for-each 循环遍历各种集合的示例。

让我们从 List 开始：

```
String[] wordsArray = { "Java ", "is ", "great!" };
List``<String>`` wordsList = Arrays.asList(wordsArray);

for (String word : wordsList) {
    System.out.print(word + " ");
}
```

同样，我们可以遍历 Set 的所有元素：

```
Set``<String>`` wordsSet = new HashSet();
wordsSet.addAll(wordsList);

for (String word : wordsSet) {
    System.out.print(word + " ");
}
```

此外，我们还可以在 Map```<Integer, String>``` 中使用 for-each 循环：

```
Map```<Integer, String>``` map = new HashMap<>();
map.put(1, "Java");
map.put(2, "is");
map.put(3, "great!");

for (Entry```<Integer, String>``` entry : map.entrySet()) {
    System.out.println(
      "number: " + entry.getKey() +
      " - " +
      "Word: " + entry.getValue());
}
```

同样，我们可以使用 for-each 循环遍历 Java 中的各种其他数据结构。

**然而，如果数组或集合为 null，则会抛出 NullPointerException：**

```
int[] numbers = null;
for (int number : numbers) {
    System.out.print(number + " ");
}
```

上述代码抛出 NullPointerException：

```
Exception in thread "main" java.lang.NullPointerException
    at com.baeldung.core.controlstructures.loops.ForEachLoop.traverseArray(ForEachLoop.java:63)
    ..
```

**因此，我们必须在将数组或集合传递给 for-each 循环之前检查它是否为 null。**

如果数组或集合为空，则 for-each 循环根本不会执行。

### 3.4. 优缺点

for-each 循环是在 Java 5 中引入的重要特性之一。然而，它也有自己的优点和缺点。

for-each 循环的优点是：

- 它帮助我们避免编程错误。
- 它使代码更精确和易于阅读。
- 它更容易实现。
- 它避免了无限循环的机会。

**由于这些优点，我们更倾向于在处理数组或集合时使用 for-each 循环而不是 for 循环。**

for-each 循环的缺点是：

- 我们不能跳过元素，因为它会遍历每个元素。
- 不可能按相反的顺序遍历。
- 如果我们使用 for-each 循环，就不能修改数组。
- 不可能跟踪索引。
- 它比 for 循环有一些性能开销。

## 4. 结论

在本文中，我们探讨了 Java 中的 for-each 循环，包括其语法、工作原理和示例。最后，我们看到了它的优点和缺点。

如往常一样，这些示例的代码可以在 GitHub 上找到。