---
date: 2024-07-16
category:
  - Java
  - 编程
tag:
  - 字符串
  - 排列
head:
  - - meta
    - name: keywords
      content: Java, 字符串排列, 第三方库
------
# Java中字符串的排列

排列是集合中元素的重新排列。换句话说，它是集合顺序的所有可能的变化。
在本教程中，我们将学习如何使用第三方库轻松地在Java中创建排列。更具体地说，我们将使用字符串的排列。
有时，我们需要检查字符串值的所有可能的排列，通常是为了令人困惑的在线编程练习，较少用于日常工作任务。例如，字符串“abc”将有六种不同的字符排列方式：“abc”，“acb”，“cab”，“bac”，“bca”，“cba”。

有几个明确定义的算法可以帮助我们为特定的字符串值创建所有可能的排列。例如，最著名的是Heap算法。然而，它非常复杂且不易直观理解。递归方法更是雪上加霜。

### 3. 优雅的解决方案
实现生成排列的算法将需要编写自定义逻辑。在实现中很容易出错，并且很难测试它是否长时间正确工作。此外，没有必要重写已经写好的东西。
另外，在使用字符串值时，如果不谨慎，可能会通过创建太多实例淹没字符串池。

目前提供此功能的库有：
- Apache Commons
- Guava
- CombinatoricsLib

让我们尝试使用这些库查找字符串值的所有排列。**我们将关注这些库是否允许延迟遍历排列以及它们如何处理输入值中的重复项。**

在下面的示例中，我们将使用_Helper.toCharacterList_方法。此方法封装了将字符串转换为字符列表的复杂性：
```
static List`````````<Character>````````` toCharacterList(final String string) {
    return string.chars().mapToObj(s -> ((char) s)).collect(Collectors.toList());
}
```

我们还将使用一个辅助方法将字符列表转换为字符串：
```
static String toString(Collection`````````<Character>````````` collection) {
    return collection.stream().map(s -> s.toString()).collect(Collectors.joining());
}
```

### 4. Apache Commons
首先，让我们向项目中添加Maven依赖项_commons-collections4_：

```
```<dependency>```
    ```<groupId>```org.apache.commons```</groupId>```
    ```<artifactId>```commons-collections4```</artifactId>```
    ```<version>```4.5.0-M2```</version>```
```</dependency>```
```

总的来说，Apache提供了一个简单的API。**_CollectionUtils_ 会立即创建排列，所以我们在处理长字符串值时应小心**：

```
public List```````<String>``````` eagerPermutationWithRepetitions(final String string) {
    final List`````````<Character>````````` characters = Helper.toCharacterList(string);
    return CollectionUtils.permutations(characters)
        .stream()
        .map(Helper::toString)
        .collect(Collectors.toList());
}
```

**同时，要使用延迟方法，我们应该使用_PermutationIterator_**：

```
public List```````<String>``````` lazyPermutationWithoutRepetitions(final String string) {
    final List`````````<Character>````````` characters = Helper.toCharacterList(string);
    final PermutationIterator`````````<Character>````````` permutationIterator = new PermutationIterator<>(characters);
    final List```````<String>``````` result = new ArrayList<>();
    while (permutationIterator.hasNext()) {
        result.add(Helper.toString(permutationIterator.next()));
    }
    return result;
}
```

**这个库不处理重复项，所以字符串“aaaaaa”将产生720个排列，这通常不是我们想要的。** 同时，_PermutationIterator_ 没有获取排列数量的方法。在这种情况下，我们应该根据输入大小单独计算它们。

### 5. Guava
首先，让我们向项目中添加Guava库的Maven依赖项：

```
```<dependency>```
    ```<groupId>```com.google.guava```</groupId>```
    ```<artifactId>```guava```</artifactId>```
    ```<version>```33.0.0-jre```</version>```
```</dependency>```
```

Guava允许使用_Collections2_创建排列。API使用起来很直接：

```
public List```````<String>``````` permutationWithRepetitions(final String string) {
    final List`````````<Character>````````` characters = Helper.toCharacterList(string);
    return Collections2.permutations(characters).stream()
        .map(Helper::toString)
        .collect(Collectors.toList());
}
```

_Collections2.permutations_的结果是一个_PermutationCollection_，它允许轻松访问排列。**所有排列都是延迟创建的。**

**此外，这个类提供了一个API，用于创建不重复的排列**：

```
public List```````<String>``````` permutationWithoutRepetitions(final String string) {
    final List`````````<Character>````````` characters = Helper.toCharacterList(string);
    return Collections2.orderedPermutations(characters).stream()
        .map(Helper::toString)
        .collect(Collectors.toList());
}
```

然而，这些方法的问题是它们被标记为_@Beta_注解，这并不能保证这个API在未来版本中不会改变。

### 6. CombinatoricsLib
要在项目中使用它，让我们添加_combinatoricslib3_ Maven依赖项：

```
```<dependency>```
    ```<groupId>```com.github.dpaukov```</groupId>```
    ```<artifactId>```combinatoricslib3```</artifactId>```
    ```<version>```3.3.3```</version>```
```</dependency>```
```

虽然这是一个小型库，但它提供了许多组合工具，包括排列。API本身非常直观，并利用了Java流。让我们从特定的字符串或字符列表创建排列：

```
public List```````<String>``````` permutationWithoutRepetitions(final String string) {
    List`````````<Character>````````` chars = Helper.toCharacterList(string);
    return Generator.permutation(chars)
      .simple()
      .stream()
      .map(Helper::toString)
      .collect(Collectors.toList());
}
```

上面的代码创建了一个生成器，将为字符串提供排列。排列将被延迟检索。因此，我们只创建了一个生成器并计算了预期的排列数量。

同时，使用这个库，我们可以确定处理重复项的策略。如果我们使用字符串“aaaaaa”作为示例，我们将只得到一个而不是720个相同的排列。

```
public List```````<String>``````` permutationWithRepetitions(final String string) {
    List`````````<Character>````````` chars = Helper.toCharacterList(string);
    return Generator.permutation(chars)
      .simple(TreatDuplicatesAs.IDENTICAL)
      .stream()
      .map(Helper::toString)
      .collect(Collectors.toList());
}
```

_TreatDuplicatesAs_允许我们定义我们希望如何处理重复项。

### 7. 结论
有很多方法可以处理组合学，特别是排列。所有这些库都可以在这方面提供很大的帮助。值得尝试它们所有的并决定哪一个适合你的需求。尽管有时人们被敦促编写他们所有的代码，但这并不明智，因为已经存在并提供良好功能的东西没有必要浪费时间。

像往常一样，示例的源代码可以在GitHub上找到。