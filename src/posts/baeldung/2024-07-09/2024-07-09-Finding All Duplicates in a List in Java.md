---
date: 2022-04-01
category:
  - Java
  - Collections
tag:
  - Java
  - List
  - Duplicates
head:
  - - meta
    - name: keywords
      content: Java, List, Duplicates, Find, Collections, Set, Map, Stream
---
# 在Java中查找列表中的所有重复项

## 1. 引言

在本文中，我们将学习在Java中查找列表中的重复项的不同方法。

给定一个包含重复元素的整数列表，我们将找出其中的重复元素。例如，给定输入列表\[1, 2, 3, 3, 4, 4, 5\]，输出列表将是\[3, 4\]。

## 2. 使用Collections查找重复项

在这一部分，我们将讨论使用Collections提取列表中存在的重复元素的两种方法。

### 2.1. 使用Set的contains()方法

Java中的Set不包含重复项。Set的contains()方法只有在元素已经存在于其中时才返回true。

我们将在contains()返回false时将元素添加到Set中。否则，我们将元素添加到输出列表中。因此，输出列表包含重复元素：

```java
List````````````````````````````````<Integer>```````````````````````````````` listDuplicateUsingSet(List````````````````````````````````<Integer>```````````````````````````````` list) {
    List````````````````````````````````<Integer>```````````````````````````````` duplicates = new ArrayList<>();
    Set````````````````````````````````<Integer>```````````````````````````````` set = new HashSet<>();
    for (Integer i : list) {
        if (set.contains(i)) {
            duplicates.add(i);
        } else {
            set.add(i);
        }
    }
    return duplicates;
}
```

让我们编写一个测试来检查列表duplicates是否只包含重复元素：

```java
@Test
void givenList_whenUsingSet_thenReturnDuplicateElements() {
    List````````````````````````````````<Integer>```````````````````````````````` list = Arrays.asList(1, 2, 3, 3, 4, 4, 5);
    List````````````````````````````````<Integer>```````````````````````````````` duplicates = listDuplicate.listDuplicateUsingSet(list);
    Assert.assertEquals(duplicates.size(), 2);
    Assert.assertEquals(duplicates.contains(3), true);
    Assert.assertEquals(duplicates.contains(4), true);
    Assert.assertEquals(duplicates.contains(1), false);
}
```

在这里我们看到输出列表只包含两个元素3和4。

**这种方法需要O(n)时间来处理列表中的n个元素，并且需要额外的空间大小为n的集合。**

### 2.2. 使用Map并存储元素的频率

我们可以使用Map来存储每个元素的频率，然后只有当元素的频率不是1时才将它们添加到输出列表中：

```java
List````````````````````````````````<Integer>```````````````````````````````` listDuplicateUsingMap(List````````````````````````````````<Integer>```````````````````````````````` list) {
    List````````````````````````````````<Integer>```````````````````````````````` duplicates = new ArrayList<>();
    Map`<Integer, Integer>` frequencyMap = new HashMap<>();
    for (Integer number : list) {
        frequencyMap.put(number, frequencyMap.getOrDefault(number, 0) + 1);
    }
    for (int number : frequencyMap.keySet()) {
        if (frequencyMap.get(number) != 1) {
            duplicates.add(number);
        }
    }
    return duplicates;
}
```

让我们编写一个测试来检查列表duplicates是否只包含重复元素：

```java
@Test
void givenList_whenUsingFrequencyMap_thenReturnDuplicateElements() {
    List````````````````````````````````<Integer>```````````````````````````````` list = Arrays.asList(1, 2, 3, 3, 4, 4, 5);
    List````````````````````````````````<Integer>```````````````````````````````` duplicates = listDuplicate.listDuplicateUsingMap(list);
    Assert.assertEquals(duplicates.size(), 2);
    Assert.assertEquals(duplicates.contains(3), true);
    Assert.assertEquals(duplicates.contains(4), true);
    Assert.assertEquals(duplicates.contains(1), false);
}
```

在这里我们看到输出列表只包含两个元素，3和4。

**这种方法需要O(n)时间来处理列表中的n个元素，并且需要额外的空间大小为n的映射表。**

## 3. 在Java 8中使用Streams

在这一部分，我们将讨论使用Streams提取列表中存在的重复元素的三种方法。

### 3.1. 使用filter()和Set.add()方法

Set.add()将指定的元素添加到这个集合中，如果它尚未存在。如果这个集合已经包含该元素，则调用不会改变集合并返回false。

在这里，我们将使用一个Set并将列表转换为流。流被添加到Set中，重复的元素被过滤并收集到List中：

```java
List````````````````````````````````<Integer>```````````````````````````````` listDuplicateUsingFilterAndSetAdd(List````````````````````````````````<Integer>```````````````````````````````` list) {
    Set````````````````````````````````<Integer>```````````````````````````````` elements = new HashSet````````````````````````````````<Integer>````````````````````````````````();
    return list.stream()
      .filter(n -> !elements.add(n))
      .collect(Collectors.toList());
}
```

让我们编写一个测试来检查列表duplicates是否只包含重复元素：

```java
@Test
void givenList_whenUsingFilterAndSetAdd_thenReturnDuplicateElements() {
    List````````````````````````````````<Integer>```````````````````````````````` list = Arrays.asList(1, 2, 3, 3, 4, 4, 5);
    List````````````````````````````````<Integer>```````````````````````````````` duplicates = listDuplicate.listDuplicateUsingFilterAndSetAdd(list);
    Assert.assertEquals(duplicates.size(), 2);
    Assert.assertEquals(duplicates.contains(3), true);
    Assert.assertEquals(duplicates.contains(4), true);
    Assert.assertEquals(duplicates.contains(1), false);
}
```

在这里我们看到输出元素只包含两个元素，3和4，正如预期。

**使用filter()与Set.add()是查找重复元素的最快算法，具有O(n)时间复杂度和额外空间大小为n的集合。**

### 3.2. 使用Collections.frequency()

Collections.frequency()返回指定集合中等于特定值的元素数量。在这里我们将列表转换为流，并仅过滤出返回值大于一的元素。

我们将这些元素收集到Set中以避免重复，最后将Set转换为List：

```java
List````````````````````````````````<Integer>```````````````````````````````` listDuplicateUsingCollectionsFrequency(List````````````````````````````````<Integer>```````````````````````````````` list) {
    List````````````````````````````````<Integer>```````````````````````````````` duplicates = new ArrayList<>();
    Set````````````````````````````````<Integer>```````````````````````````````` set = list.stream()
      .filter(i -> Collections.frequency(list, i) > 1)
      .collect(Collectors.toSet());
    duplicates.addAll(set);
    return duplicates;
}
```

让我们编写一个测试来检查重复项是否只包含重复元素：

```java
@Test
void givenList_whenUsingCollectionsFrequency_thenReturnDuplicateElements() {
    List````````````````````````````````<Integer>```````````````````````````````` list = Arrays.asList(1, 2, 3, 3, 4, 4, 5);
    List````````````````````````````````<Integer>```````````````````````````````` duplicates = listDuplicate.listDuplicateUsingCollectionsFrequency(list);
    Assert.assertEquals(duplicates.size(), 2);
    Assert.assertEquals(duplicates.contains(3), true);
    Assert.assertEquals(duplicates.contains(4), true);
    Assert.assertEquals(duplicates.contains(1), false);
}
```

正如预期，输出列表只包含两个元素，3和4。

**使用Collections.frequency()是最慢的方法，因为它将每个元素与列表进行比较——Collections.frequency(list, i)其复杂度为O(n)。因此，总体复杂度为O(n*n)。它还需要额外的空间大小为n的集合。**

### 3.3. 使用Map和Collectors.groupingBy()

Collectors.groupingBy()返回一个实现输入元素的级联“分组”操作的收集器。

它根据分类函数对元素进行分组，然后使用指定的下游收集器对与给定键关联的值执行缩减操作。分类函数将元素映射到某种键类型K。下游收集器对输入元素进行操作，并产生类型为D的结果。结果收集器产生一个Map`<K, D>`。

在这里我们将使用Function.identity()作为分类函数，Collectors.counting()作为下游收集器。

Function.identity()返回一个始终返回其输入参数的函数。Collectors.counting()返回一个接受元素并计算输入元素数量的收集器。如果没有元素存在，则结果为零。因此我们将使用Collectors.groupingBy()得到一个元素及其频率的映射。

然后我们将这个映射的EntrySet转换为流，过滤出只有值大于1的元素，并收集它们到一个Set中以避免重复。然后将Set转换为List：

```java
List````````````````````````````````<Integer>```````````````````````````````` listDuplicateUsingMapAndCollectorsGroupingBy(List````````````````````````````````<Integer>```````````````````````````````` list) {
    List````````````````````````````````<Integer>```````````````````````````````` duplicates = new ArrayList<>();
    Set````````````````````````````````<Integer>```````````````````````````````` set = list.stream()
      .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()))
      .entrySet()
      .stream()
      .filter(m -> m.getValue() > 1)
      .map(Map.Entry::getKey)
      .collect(Collectors.toSet());
    duplicates.addAll(set);
    return duplicates;
}
```

让我们编写一个测试来检查列表duplicates是否只包含重复元素：

```java
@Test
void givenList_whenUsingMapAndCollectorsGroupingBy_thenReturnDuplicateElements() {
    List````````````````````````````````<Integer>```````````````````````````````` list = Arrays.asList(1, 2, 3, 3, 4, 4, 5);
    List````````````````````````````````<Integer>```````````````````````````````` duplicates = listDuplicate.listDuplicateUsingCollectionsFrequency(list);
    Assert.assertEquals(duplicates.size(), 2);
    Assert.assertEquals(duplicates.contains(3), true);
    Assert.assertEquals(duplicates.contains(4), true);
    Assert.assertEquals(duplicates.contains(1), false);
}
```

在这里我们看到输出元素只包含两个元素3和4。

**Collectors.groupingBy()需要O(n)时间。对结果EntrySet执行filter()操作，但由于映射查找时间是O(1)，复杂度仍然保持为O(n)。它还需要额外的空间大小为n的集合。**

## 4. 在Java中查找在Java中查找数组中的重复值是一项常见任务，通常采用不同的技术方法。一种直接的方法是遍历数组并比较每个元素与其他每个元素，以识别重复项。**然而，这种方法对于大型数组可能是低效的，因为它的时间复杂度为O(n^2)。**

**或者，使用HashSet或HashMap提供了一个更有效的选择，具有更好的时间复杂度O(n)。** 遍历数组并利用这些数据结构进行重复项检测，可以显著提高可扩展性和性能，特别是对于更大的数据集。

### 4.1. 使用for循环进行重复项检测

让我们创建一个方法，使用for循环在数组中查找重复值：

```java
public static Set````````````````````````````````<Integer>```````````````````````````````` findDuplicateInArray(int[] array) {
    Set````````````````````````````````<Integer>```````````````````````````````` duplicates = new HashSet<>();
    Set````````````````````````````````<Integer>```````````````````````````````` seen = new HashSet<>();
    for (int val : array) {
        if (!seen.add(val)) {
            duplicates.add(val);
        }
    }
    return duplicates;
}
```

上述方法接受一个通用数组T[]作为输入，并返回一个Set，其中包含使用For循环在数组中的所有重复值。它遍历数组中的每个元素，将其添加到名为“seen”的HashSet中。如果一个值由于其存在而不能被添加到“seen”集合中，它随后被添加到重复项的结果集合中。

### 4.2. 使用Streams和Collectors进行重复项检测

让我们创建一个方法，使用Java流和收集器在数组中查找重复值，以实现高效的重复项检测：

```java
public static ```<T>``` Set```<T>``` findDuplicateInArrayWithStream(T[] array) {
    Set```<T>``` seen = new HashSet<>();
    return Arrays.stream(array)
      .filter(val -> !seen.add(val))
      .collect(Collectors.toSet());
}
```

上述方法接受一个通用数组T[]作为输入，并返回一个Set，其中包含使用流在数组中的所有重复值。它使用Java流将数组转换为元素流，过滤流以仅保留那些没有成功添加到seen集合中的元素（从而识别重复项），并将过滤后的元素收集到一个集合中，自动消除重复项。**这种实现提供了一种更简洁和现代的方法来查找数组中的重复项。**

## 5. 结论

在本文中，我们学习了从Java列表中提取重复元素的不同方法。

我们讨论了使用Set和Map的方法，以及它们对应的使用Stream的方法。使用Stream的代码更加声明式，并且不需要外部迭代器就能清晰地传达代码的意图。

如常，本文的完整代码示例可以在GitHub上找到。

[给Kimi加油](kimi://action?name=cheer-on-kimi)

OK