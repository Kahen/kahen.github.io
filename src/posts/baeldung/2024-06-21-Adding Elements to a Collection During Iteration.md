---
date: 2024-06-21
category:
  - Java
  - Collections
tag:
  - List
  - ListIterator
  - Java 8
head:
  - - meta
    - name: keywords
      content: Java, Collections, List, ListIterator, Java 8
---
# 在迭代期间向集合添加元素

迭代一个列表是Java中的常见操作，但在迭代过程中向其中添加元素需要仔细考虑，以避免异常并确保代码的正确性。

在这个教程中，我们将讨论在迭代期间向集合添加元素的几种方法。

## 2. 使用 ListIterator 类
一种常见的方法是使用 ListIterator，它为列表提供了双向遍历和修改能力。

### 2.1. 字符串场景
考虑以下示例，我们在遇到 Python 后将 JavaScript 添加到编程语言列表中：

```java
List```<String>``` programmingLanguages = new ArrayList<>(Arrays.asList("Java", "Python", "C++"));

@Test
public void givenList_whenAddElementWithListIterator_thenModifiedList() {
    ListIterator```<String>``` listIterator = programmingLanguages.listIterator();
    while (listIterator.hasNext()) {
        String language = listIterator.next();
        if (language.equals("Python")) {
            listIterator.add("JavaScript");
        }
    }
    assertIterableEquals(Arrays.asList("Java", "Python", "JavaScript", "C++"), programmingLanguages);
}
```

在提供的代码中，我们初始化了一个名为 programmingLanguages 的列表，其中包含字符串（Java、Python 和 C++）。此外，我们使用 listIterator.next() 方法遍历列表的元素。

**当我们遇到 Python 元素时，我们使用 listIterator.add("JavaScript") 动态地在其后立即插入字符串 JavaScript。**

最后，测试断言修改后的列表与预期结果匹配，确保成功地在 Python 后添加了 JavaScript。

### 2.2. 数字场景
让我们将 ListIterator 方法应用于一个整数列表，遇到数字 2 时将其值加倍：

```java
List````<Integer>```` numbers = new ArrayList<>(Arrays.asList(1, 2, 3));

@Test
public void givenNumericalList_whenMultiplyElementWithListIterator_thenModifiedList() {
    ListIterator````<Integer>```` listIterator = numbers.listIterator();
    while (listIterator.hasNext()) {
        int num = listIterator.next();
        if (num == 2) {
            listIterator.add(num * 10);
        }
    }
    assertIterableEquals(Arrays.asList(1, 2, 20, 3), numbers);
}
```

在这个数字场景中，我们使用 ListIterator 遍历一个整数列表。当遇到数字 2 时，其值乘以 10 并动态地添加到列表中。

## 3. 使用增强型 for 循环与副本
另一种策略涉及创建原始列表的副本，并在修改原始列表的同时遍历它。

### 3.1. 字符串场景
考虑以下示例，我们将原始列表中每个单词的大写版本添加到列表本身：

```java
@Test
public void givenStringList_whenAddElementWithEnhancedForLoopAndCopy_thenModifiedList() {
    List```<String>``` copyOfWords = new ArrayList<>(programmingLanguages);
    for (String word : copyOfWords) {
        programmingLanguages.add(word.toUpperCase());
    }
    assertIterableEquals(Arrays.asList("Java", "Python", "C++", "JAVA", "PYTHON", "C++"), programmingLanguages);
}
```

在增强型 for 循环中，我们遍历 copyOfWords 列表的每个元素，将相应的值转换为大写，并将其添加到原始列表 programmingLanguages 中。

**值得注意的是，这种插入过程确保原始列表在保持顺序完整性的同时扩展为现有单词的大写版本。换句话说，programmingLanguages 列表将包含原始元素，后跟新添加的大写版本。**

### 3.2. 数字场景
现在，让我们将增强型 for 循环方法应用于一个整数列表，将每个数字乘以 2：

```java
List````<Integer>```` numbers = new ArrayList<>(Arrays.asList(1, 2, 3));

@Test
public void givenList_whenAddElementWithEnhancedForLoopAndCopy_thenModifiedList() {
    List````<Integer>```` copyOfNumbers = new ArrayList<>(numbers);
    for (int num : copyOfNumbers) {
        numbers.add(num * 2);
    }
    assertIterableEquals(Arrays.asList(1, 2, 3, 2, 4, 6), numbers);
}
```

在这里，我们迭代，将每个元素乘以 2，然后将其添加到原始列表中。与字符串方法一样，

## 4. 使用 Java 8 Stream 方法
Java 8 Streams 提供了一种在迭代期间向列表添加元素的简洁方式。

### 4.1. 字符串场景
考虑以下示例，我们使用 Java 8 Streams 将字符串 JavaScript 添加到 programmingLanguages 列表中：

```java
@Test
public void givenStringList_whenConvertToUpperCaseWithJava8Stream_thenModifiedList() {
    programmingLanguages = programmingLanguages.stream().map(String::toUpperCase).collect(Collectors.toList());
    assertIterableEquals(Arrays.asList("JAVA", "PYTHON", "C++"), programmingLanguages);
}
```

在这段代码片段中，我们使用 map 操作将列表中的每个字符串元素转换为其大写等价物，使用 toUpperCase 方法。然后，我们使用 Collectors.toList() 将转换后的元素收集到一个新列表中。

**然而，需要注意的是，尽管转换操作看起来直接在原地更改了列表中的相应原始元素，但它实际上是用一个新的列表替换了原始列表。这种替换确保了列表内容的完整性，尽管它有效地从内存中移除了原始列表。**

因此，虽然转换是无缝执行的，但重要的是要考虑其影响，特别是如果原始列表引用在代码的其他部分仍然需要。

### 4.2. 数字场景
让我们将 Java 8 Stream 方法应用于一个整数列表，将每个数字乘以 3：

```java
@Test
public void givenNumericalList_whenMultiplyByThreeWithJava8Stream_thenModifiedList() {
    numbers = numbers.stream().map(num -> num * 3).collect(Collectors.toList());
    assertIterableEquals(Arrays.asList(3, 6, 9), numbers);
}
```

在这个测试方法中，我们使用 map 操作，列表中的每个数字元素都经过转换，乘以 3。此外，通过 Collectors.toList() 将结果流收集到一个新列表中。

## 5. 结论
总之，我们探索了多种方法，包括 ListIterator、增强型 for 循环与副本，以及 Java 8 Streams，用于在 Java 中迭代期间向列表添加元素。

如常，相应的源代码可以在 GitHub 上找到。