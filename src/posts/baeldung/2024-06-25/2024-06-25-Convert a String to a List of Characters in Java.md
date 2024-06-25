---
date: 2024-06-26
category:
  - Java
  - 编程
tag:
  - Java字符串
  - 字符串转字符列表
head:
  - - meta
    - name: keywords
      content: Java, 字符串, 字符列表, 转换
---
# Java中将字符串转换为字符列表的方法

## 1. 引言

Java提供了多种操作字符串的方法。

**在本教程中，我们将探索一个常见的需求，即将字符串转换为字符列表。**

## 2. 使用 toCharArray()

toCharArray() 是将字符串转换为字符数组的直接方式。

让我们看看以下代码示例：

```java
@Test
public void givenString_whenUsingToCharArray_thenConvertToCharList() {
    char[] charArray = inputString.toCharArray();

    List``````<Character>`````` charList = new ArrayList<>();
    for (char c : charArray) {
        charList.add(c);
    }

    assertEquals(inputString.length(), charList.size());
}
```

在这种方法中，我们使用 toCharArray() 方法将提供的 inputString 系统地转换为字符数组。**然后，我们遍历这个字符数组，系统地将一个名为 charList 的 List``````<Character>`````` 填充，以有效地表示原始字符串中的每个字符。**

为了验证这种转换的准确性，然后使用断言来确保原始 inputString 和结果 charList 长度的相等性。

## 3. 使用 Java 流

随着 Java 8 的推出，我们可以利用流以更简洁和功能性的方式实现转换。

让我们看看这个例子：

```java
@Test
public void givenString_whenUsingMapToObj_thenConvertToCharList() {
    List``````<Character>`````` charList = inputString.chars()
      .mapToObj(c -> (char) c)
      .toList();

    assertEquals(inputString.length(), charList.size());
}
```

在这里，我们对 inputString 使用 mapToObj() 操作来处理其 Unicode 码点。**具体来说，这允许我们将每个码点转换为其对应的字符。**然后，我们使用 toList() 方法将这些转换后的字符有效地收集到 charList 中。

## 4. 使用 Arrays.asList()

为了执行转换，我们可以使用 Arrays.asList() 方法与 split() 方法结合使用。以下是一个例子：

```java
@Test
public void givenString_whenUsingSplit_thenConvertToStringList() {
    String[] charArray = inputString.split("");

    List``<String>`` charList = Arrays.asList(charArray);

    assertEquals(inputString.length(), charList.size());
}
```

在这个测试方法中，我们首先使用 split() 方法将 inputString 分解为单独的字符串数组。随后，我们使用 asList() 方法将这个数组转换为 List``<String>``，其中每个字符都表示为一个单独的元素。

## 5. 使用 Guava 的 Lists.charactersOf()

Guava 是一个广泛使用的 Java 库，它提供了一个方便的方法来将字符串转换为字符列表。

让我们看看以下代码示例：

```java
@Test
public void givenString_whenUsingGuavaLists_thenConvertToCharList() {
    List``````<Character>`````` charList = Lists.charactersOf(inputString);

    assertEquals(inputString.length(), charList.size());
}
```

在这里，我们利用 Guava 的 charactersOf() 将给定的字符串转换为字符列表。这种方法简化了流程，提供了一种简洁和表达性强的方式来直接从字符串创建 List``````<Character>``````，增强了代码的可读性。

## 6. 使用 Java 9+ 的 codePoints()

在 Java 9 及更高版本中，可以使用 codePoints() 方法来处理 Unicode 字符。让我们看一个简单的例子：

```java
@Test
public void givenString_whenUsingCodePoints_thenConvertToCharList() {
    List``````<Character>`````` charList = inputString.codePoints()
      .mapToObj(c -> (char) c)
      .toList();

    assertEquals(inputString.length(), charList.size());
}
```

在上述代码片段中，我们使用 codePoints() 方法获取给定字符串中字符的 Unicode 码点。之后，我们使用 mapToObj 操作将每个码点转换为其对应的字符，从而得到 charList。

## 7. 结论

总之，在Java中将字符串转换为字符列表可以通过多种方法实现，每种方法都有其自身的优势。

根据我们的特定需求和我们使用的Java版本，选择最适合我们需求的方法。

如常，本文的完整代码示例可以在 GitHub 上找到。