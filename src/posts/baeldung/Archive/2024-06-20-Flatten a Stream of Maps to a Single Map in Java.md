---
date: 2024-06-21
category:
  - Java
  - Stream API
tag:
  - Java 8
  - Stream
  - Map
head:
  - - meta
    - name: keywords
      content: Java, Stream API, Map, Flatten, Java 8
---

# Java中将Map流展平为单个Map

自Java 8推出以来，使用数据流已成为常态。这些流经常包含像Map这样的复杂结构，在进一步处理时可能会带来挑战。

在本教程中，我们将探讨如何将Map流展平为单个Map。

## 2. 问题介绍

在深入解决方案之前，让我们先澄清一下“展平Map流”的含义。本质上，我们想要将流中的Map转换为包含流中每个Map的所有键值对的单个Map。

像往常一样，一个例子可以帮助我们快速理解问题。假设我们有三个Map，存储了玩家名字和分数之间的关联：

```java
Map``````````````````<String, Integer>`````````````````` playerMap1 = new HashMap``````````````````<String, Integer>``````````````````() {{
    put("Kai", 92);
    put("Liam", 100);
}};
Map``````````````````<String, Integer>`````````````````` playerMap2 = new HashMap``````````````````<String, Integer>``````````````````() {{
    put("Eric", 42);
    put("Kevin", 77);
}};
Map``````````````````<String, Integer>`````````````````` playerMap3 = new HashMap``````````````````<String, Integer>``````````````````() {{
    put("Saajan", 35);
}};
```

我们的输入是一个包含这些Map的流。为了简单起见，我们将在本教程中使用_Stream.of(playerMap1, playerMap2, …)_来构建输入流。然而，值得注意的是**流不一定有定义好的顺序**。

现在，我们的目标是将包含上述三个Map的流合并为一个名字-分数Map：

```java
Map``````````````````<String, Integer>`````````````````` expectedMap = new HashMap``````````````````<String, Integer>``````````````````() {{
    put("Saajan", 35);
    put("Liam", 100);
    put("Kai", 92);
    put("Eric", 42);
    put("Kevin", 77);
}};
```

值得一提的是，**由于我们正在使用HashMap对象，最终结果中的条目顺序不能保证**。

此外，**流中的Map可能包含重复的键和null值**。稍后，我们将扩展示例以涵盖本教程中的这些场景。

接下来，让我们深入代码。

## 3. 使用flatMap()和Collectors.toMap()

合并Map的一种方法是使用flatMap()方法和toMap()收集器：

```java
Map``````````````````<String, Integer>`````````````````` mergedMap = Stream.of(playerMap1, playerMap2, playerMap3)
  .flatMap(map -> map.entrySet()
    .stream())
  .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

assertEquals(expectedMap, mergedMap);
```

在上面的代码中，**flatMap()方法将流中的每个Map展平为其条目的流**。然后，我们使用toMap()收集器将流的元素收集到一个单一的Map中。

toMap()收集器需要两个函数作为参数：一个用于提取键（Map.Entry::getKey），一个用于提取值（Map.Entry::getValue）。在这里，我们使用方法引用来表示这两个函数。这些函数应用于流中的每个条目，以构建结果Map。

## 4. 处理重复的键

我们已经学会了如何使用toMap()收集器将HashMap流合并为一个单一的Map。然而，**如果Map流包含重复的键，这种方法将会失败**。例如，如果我们向流中添加一个带有重复键“Kai”的新Map，它会抛出IllegalStateException：

```java
Map``````````````````<String, Integer>`````````````````` playerMap4 = new HashMap``````````````````<String, Integer>``````````````````() {{
    put("Kai", 76);
}};

assertThrows(IllegalStateException.class, () -> Stream.of(playerMap1, playerMap2, playerMap3, playerMap4)
  .flatMap(map -> map.entrySet()
    .stream())
  .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue)), "Duplicate key Kai (attempted merging values 92 and 76)");
```

为了解决重复键的问题，**我们可以将一个合并函数作为第三个参数传递给toMap()方法来处理与重复键关联的值**。

我们对重复键场景的合并需求可能不同。在我们的示例中，我们希望**一旦发生重复的名称，就选择更高的分数**。因此，我们的目标是得到这样的Map作为结果：

```java
Map``````````````````<String, Integer>`````````````````` expectedMap = new HashMap``````````````````<String, Integer>``````````````````() {{
    put("Saajan", 35);
    put("Liam", 100);
    put("Kai", 92); // <- 最大值92和76
    put("Eric", 42);
    put("Kevin", 77);
}};
```

接下来，让我们看看如何实现它：

```java
Map``````````````````<String, Integer>`````````````````` mergedMap = Stream.of(playerMap1, playerMap2, playerMap3, playerMap4)
  .flatMap(map -> map.entrySet()
    .stream())
  .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, Integer::max));

assertEquals(expectedMap, mergedMap);
```

正如代码所示，**我们使用了方法引用Integer::max作为toMap()中的合并函数**。这确保了当出现重复键时，最终Map中的结果值将是与这些键关联的两个值中较大的一个。

## 5. 处理null值

我们已经看到Collectors.toMap()方便地将条目收集到一个单一的Map中。然而，**Collectors.toMap()方法不能处理Map的值为null**。我们的解决方案如果任何Map条目的值为null，就会抛出NullPointerException。

让我们添加一个新的Map来验证这一点：

```java
Map``````````````````<String, Integer>`````````````````` playerMap5 = new HashMap``````````````````<String, Integer>``````````````````() {{
    put("Kai", null);
    put("Jerry", null);
}};

assertThrows(NullPointerException.class, () -> Stream.of(playerMap1, playerMap2, playerMap3, playerMap4, playerMap5)
  .flatMap(map -> map.entrySet()
    .stream())
  .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, Integer::max)));
```

现在，**输入流中的Map包含重复的键和null值**。这次，**我们仍然希望为重复的玩家名称获得更高的分数**。此外，**我们将null视为最低分数**。然后，我们的预期结果看起来像这样：

```java
Map``````````````````<String, Integer>`````````````````` expectedMap = new HashMap``````````````````<String, Integer>``````````````````() {{
    put("Saajan", 35);
    put("Liam", 100);
    put("Kai", 92); // <- 92, 76和null中的最大值
    put("Eric", 42);
    put("Kevin", 77);
    put("Jerry", null);
}};
```

由于**Integer.max()不能处理null值**，让我们创建一个null安全的获取两个可空Integer对象中较大值的方法：

```java
private Integer maxInteger(Integer int1, Integer int2) {
    if (int1 == null) {
        return int2;
    }
    if (int2 == null) {
        return int1;
    }
    return max(int1, int2);
}
```

接下来，让我们解决这个问题。

### 5.1. 使用flatMap()和forEach()

解决这个问题的一个直接方法是**首先初始化一个空Map，然后在forEach()中将所需的键值对放入其中**：

```java
Map``````````````````<String, Integer>`````````````````` mergedMap = new HashMap<>();
Stream.of(playerMap1, playerMap2, playerMap3, playerMap4, playerMap5)
  .flatMap(map -> map.entrySet()
    .stream())
  .forEach(entry -> {
      String k = entry.getKey();
      Integer v = entry.getValue();
      if (mergedMap.containsKey(k)) {
          mergedMap.put(k, maxInteger(mergedMap.get(k), v));
      } else {
          mergedMap.put(k, v);
      }
  });
assertEquals(expectedMap, mergedMap);
```

### 5.2. 使用groupingBy()、mapping()和reducing()

flatMap + forEach()解决方案很直接。然而，这不是一种函数式方法，需要我们编写一些样板合并逻辑。

或者，**我们可以结合groupingBy()、mapping()和reducing()收集器来以函数式方式解决这个问题**：

```java
Map``````````````````<String, Integer>`````````````````` mergedMap = Stream.of(playerMap1, playerMap2, playerMap3, playerMap4, playerMap5)
  .flatMap(map -> map.entrySet()
    .stream())
  .collect(groupingBy(Map.Entry::getKey, mapping(Map.Entry::getValue, reducing(null, this::maxInteger))));

assertEquals(expectedMap, mergedMap);
```

正如上面的代码所示，我们在collect()方法中结合了三个收集器。接下来，让我们快速了解它们是如何协同工作的：

- **groupingBy(Map.Entry::getKey, mapping(…)) –** 按它们的键对Map条目进行分组，以**获得键 -> 条目结构，这些条目进入mapping()**
- **mapping(Map.Entry::getValue, reducing(…))** – 下游收集器，**使用Map.Entry::getValue将每个条目映射到Integer**，并将**Integer值传递给另一个下游收集器reducing()**
- **reducing(null, this::maxInteger)** – 下游收集器，通过执行maxInteger函数对重复键的Integer值应用减少逻辑，该函数返回两个整数值中的最大值

## 6. 将Java中的Map列表转换为单个Map

在Java中，有多种方法可以将Map列表转换为单个Map，每种方法都适合不同的偏好和编码风格。让我们探索两种方法：一种使用for循环，另一种使用Java Streams。

**虽然这些方法有效地合并了Map，但重要的是要注意它们会覆盖具有重复键的条目。** 在需要保留重复键的现有值的情况下，应该考虑这种行为。

### 6.1. 使用简单的For循环

一个常见的方法是使用简单的for循环遍历列表中的每个Map。在每次迭代中，我们将使用putAll()方法将当前Map中的所有键值映射插入到结果的单个Map中。

下面是一个示例，展示了如何实现这种方法：

```java
public static ``````<K, V>`````` Map``````<K, V>`````` mergeMapsUsingLoop(List<Map``````<K, V>``````> listOfMaps) {
    Map``````<K, V>`````` result = new HashMap<>();
    for (Map``````<K, V>`````` map : listOfMaps) {
        result.putAll(map);
    }
    return result;
}
```

这种方法提供了对迭代和Map操作的直接控制，提高了其清晰度和易理解性。

### 6.2. 使用Java Streams

随着Java 8的引入及其对Streams的支持，一种更富有表现力的解决方案变得可用。使用Streams，我们可以无缝地将Map列表转换为单个Map。这个过程涉及对列表进行流处理，展平每个Map的条目，然后使用Collectors.toMap()方法将它们收集到一个单一的Map中。

下面演示了如何实现这种基于流的解决方案：

```java
public static ``````<K, V>`````` Map``````<K, V>`````` mergeMapsUsingStream(List<Map``````<K, V>``````> listOfMaps) {
    return listOfMaps.stream()
      .flatMap(map -> map.entrySet().stream())
      .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (v1, v2) -> v2));
}
```

利用函数式编程范式，这种基于流的方法提供了一种优雅而高效的解决方案，同时确保了可读性和可维护性。

## 7. 结论

在本文中，我们深入探讨了如何在Java中合并Map流，并展示了几种处理不同场景的方法，包括合并包含重复键的Map以及优雅地处理null值。

正如本文中的例子在GitHub上可用一样。

OK