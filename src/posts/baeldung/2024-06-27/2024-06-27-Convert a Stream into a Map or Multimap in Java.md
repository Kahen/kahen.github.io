---
date: 2024-06-28
category:
  - Java
  - 编程
tag:
  - Java 8
  - Streams
  - Map
  - Multimap
head:
  - - meta
    - name: keywords
      content: Java, Stream, Map, Multimap, 数据转换, Baeldung
---

# Java中将Stream转换为Map或Multimap

## 1. 引言

在Java 8发布之后，Streams成为了Java不可或缺的一部分。它们是处理数据的强大而优雅的手段。因此，有时我们可能需要将流中的元素转换为Map或Multimap。

**在本教程中，我们将深入探讨使用不同的方法和库将Java中的流转换为Map或Multimap的方式。**

## 2. 将Stream转换为Map

### 2.1. 使用Collectors.toMap()

要将流转换为Map，我们可以利用Collectors.toMap()函数。这种收集器指定了键值映射函数，相应地映射流中的每个项目。下面是一个基本示例：

```java
@Test
public void givenStringStream_whenConvertingToMapWithMerge_thenExpectedMapIsGenerated() {
    Stream````<String>```` stringStream = Stream.of("one", "two", "three", "two");

    Map``````<String, String>`````` mergedMap = stringStream.collect(
      Collectors.toMap(s -> s, s -> s, (s1, s2) -> s1 + ", " + s2)
    );

    // 定义预期的Map
    Map``````<String, String>`````` expectedMap = Map.of(
      "one", "one",
      "two", "two, two",
      "three", "three"
    );

    assertEquals(expectedMap, mergedMap);
}
```

上述测试方法首先创建了一个字符串流stringStream，然后使用Collectors.toMap()将其放入Map中。**这个函数将每个字符串作为其键和值，用逗号分隔，以合并同一键的多个条目。**

### 2.2. 使用Stream.reduce()

我们还可以使用Stream.reduce()操作符。**这种方法可以帮助我们使用一个标识和累积函数将流中的值构建成Map。**

```java
@Test
public void givenStringStream_whenConvertingToMapWithStreamReduce_thenExpectedMapIsGenerated() {
    Stream````<String>```` stringStream = Stream.of("one", "two", "three", "two");

    Map``````<String, String>`````` resultMap = stringStream.reduce(
      new HashMap<>(),
      (map, element) -> {
        map.put(element, element);
        return map;
      },
      (map1, map2) -> {
        map1.putAll(map2);
        return map1;
      }
    );

    Map``````<String, String>`````` expectedMap = new HashMap<>();
    expectedMap.put("one", "one");
    expectedMap.put("two", "two");
    expectedMap.put("three", "three");

    assertEquals(expectedMap, resultMap);
}
```

请注意，Stream.reduce()操作符遇到同一键的重复值时，它的累积方式与前一节不同。它不是用最后遇到的值覆盖现有值，而是通过为该键创建一个值列表来聚合它们。

这就是为什么“two”在结果映射中映射到包含两个“two”值的列表，而在2.1节中，它们是用逗号连接的。

## 3. 将Stream转换为Multimap

### 3.1. 使用Guava的Multimap

Google的Guava库中有一个Multimap接口，它将特定的键映射到多个值。首先，我们需要在项目中将其作为依赖项包含进来：

```xml
`<dependency>`
    `<groupId>`com.google.guava`</groupId>`
    `<artifactId>`guava`</artifactId>`
    `<version>`32.1.3-jre`</version>`
`</dependency>`
```

然后，我们使用它将流转换为ListMultimap，如下所示：

```java
@Test
public void givenStringStream_whenConvertingToMultimap_thenExpectedMultimapIsGenerated() {
    Stream````<String>```` stringStream = Stream.of("one", "two", "three", "two");

    ListMultimap``````<String, String>`````` multimap = stringStream.collect(
            ArrayListMultimap::create,
            (map, element) -> map.put(element, element),
            ArrayListMultimap::putAll
    );

    ListMultimap``````<String, String>`````` expectedMultimap = ArrayListMultimap.create();
    expectedMultimap.put("one", "one");
    expectedMultimap.put("two", "two");
    expectedMultimap.put("two", "two");
    expectedMultimap.put("three", "three");

    assertEquals(expectedMultimap, multimap);
}
```

在面的代码中，我们使用ArrayListMultimap::create方法来收集stringStream元素。此外，(map, element) -> map.put(element, element)迭代流元素，将每个元素放入multimap中。这确保了multimap中的键和值都是相同的，保留了重复条目。第三个函数ArrayListMultimap::putAll，如果需要，将多个multimap结果合并为一个。

### 3.2. 使用Stream.reduce()

将流转换为Multimap的另一种方法是在流上应用reduce操作。**这使我们能够通过一个标识值以及一个累积函数来完成转换任务：**

```java
@Test
public void givenStringStream_whenConvertingToMultimapWithStreamReduce_thenExpectedMultimapIsGenerated() {
    Stream````<String>```` stringStream = Stream.of("one", "two", "three", "two");

    Map<String, List````<String>````> multimap = stringStream.reduce(
      new HashMap<>(),
      (map, element) -> {
          map.computeIfAbsent(element, k -> new ArrayList<>()).add(element);
          return map;
      },
      (map1, map2) -> {
          map2.forEach((key, value) -> map1.merge(key, value, (list1, list2) -> {
              list1.addAll(list2);
              return list1;
          }));
          return map1;
      }
    );

    Map<String, List````<String>````> expectedMultimap = new HashMap<>();
    expectedMultimap.put("one", Collections.singletonList("one"));
    expectedMultimap.put("two", Arrays.asList("two", "two"));
    expectedMultimap.put("three", Collections.singletonList("three"));

    assertEquals(multimap, expectedMultimap);
}
```

在这里，通过reduce操作，测试方法将stringStream的元素累积到multimap中，其中每个唯一的字符串都映射到其出现次数的列表中。**我们还使用lambda表达式来处理映射和值的合并，然后通过断言确保转换的正确性。**

## 4. 结论

总结来说，Java流提供了高效的数据处理能力，本教程涵盖了使用Collectors.toMap()、Stream.reduce()和Guava的Multimap将流转换为Map和Multimap的方法。这些方法使我们能够有效地处理Java中的数据，为项目需求提供选择正确方法的灵活性。

如常，本文的完整代码示例可以在GitHub上找到。

OK