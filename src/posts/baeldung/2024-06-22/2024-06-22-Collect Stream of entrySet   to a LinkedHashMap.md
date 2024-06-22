---
date: 2024-06-22
category:
  - Java
  - Tutorial
tag:
  - LinkedHashMap
  - Stream
  - Java 8
head:
  - - meta
    - name: keywords
      content: Java,Java 8,LinkedHashMap,Stream,教程
---

# 将 entrySet() 流收集到 LinkedHashMap

在本教程中，我们将探讨将 Map.Entry 对象的流以不同方式收集到 LinkedHashMap 中。LinkedHashMap 与 HashMap 类似，但不同之处在于它保持插入顺序。

## 2. 理解问题

我们可以通过调用 entrySet() 方法后跟 stream() 方法来获取地图条目的流。这个流使我们能够处理每个条目。

处理是通过中间操作实现的，可以涉及使用 filter() 方法进行过滤或使用 map() 方法进行转换。**最终，我们必须通过适当的终端操作来决定如何处理我们的流。** 在我们的情况下，我们面临的挑战是将流收集到 LinkedHashMap 中。

假设我们有以下地图用于本教程：

```java
Map```<Integer, String>``` map = Map.of(1, "value 1", 2, "value 2");
```

我们将流式传输并收集地图条目到 LinkedHashMap，并旨在满足以下断言：

```java
assertThat(result)
  .isExactlyInstanceOf(LinkedHashMap.class)
  .containsOnly(entry(1, "value 1"), entry(2, "value 2"));
```

## 3. 使用 Collectors.toMap() 方法

我们可以使用 Collectors.toMap() 方法的重载版本将我们的流收集到我们选择的映射中：

```java
static `<T, K, U, M extends Map<K, U>`>
    Collector``<T, ?, M>`` toMap(Function``<? super T, ? extends K>`` keyMapper, Function`<? super T, ? extends U>` valueMapper,
        BinaryOperator`<U>` mergeFunction, Supplier``<M>`` mapFactory)
```

因此，我们使用此收集器作为我们流的终端 collect() 操作的一部分：

```java
map
  .entrySet()
  .stream()
  .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> {throw new RuntimeException();}, LinkedHashMap::new));
```

为了保留每个条目的键值对，我们使用方法引用 Map.Entry::getKey 和 Map.Entry::getValue 作为 keyMapper 和 valueMapper 函数。mergeFunction 允许我们处理具有相同键的条目之间的任何冲突。因此，我们抛出 RuntimeException，因为我们的用例中不应该有任何冲突。**最后，我们使用 LinkedHashMap 构造函数引用作为 mapFactory 来提供将收集条目的映射。**

我们应该注意到，可以使用其他 toMap() 重载方法来实现我们的目标。然而，这些方法的 mapFactory 参数不存在，因此流在内部被收集到 HashMap 中。因此，我们可以使用 LinkedHashMap 的构造函数将 HashMap 转换为我们所需的类型：

```java
new LinkedHashMap<>(map
  .entrySet()
  .stream()
  .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue)));
```

**然而，由于这创建了两个映射实例来实现我们的目标，首选初始方法。**

## 4. 使用 Collectors.groupingBy() 方法

我们可以使用 Collectors.groupingBy() 方法的重载版本来指定分组收集的映射：

```java
static `<T, K, D, A, M extends Map<K, D>`> Collector``<T, ?, M>``
    groupingBy(Function``<? super T, ? extends K>`` classifier, Supplier``<M>`` mapFactory,
        Collector`<? super T, A, D>` downstream)
```

假设我们有一个现有的城市到国家的条目映射：

```java
Map`<String, String>` cityToCountry = Map.of("Paris", "France", "Nice", "France", "Madrid", "Spain");
```

然而，我们想按国家分组城市。因此，我们使用 groupingBy() 与 collect() 方法：

```java
Map`<String, Set<String>`> countryToCities = cityToCountry
  .entrySet()
  .stream()
  .collect(Collectors.groupingBy(Map.Entry::getValue, LinkedHashMap::new, Collectors.mapping(Map.Entry::getKey, Collectors.toSet())));

assertThat(countryToCities)
  .isExactlyInstanceOf(LinkedHashMap.class)
  .containsOnly(entry("France", Set.of("Paris", "Nice")), entry("Spain", Set.of("Madrid")));
```

我们使用 Map.Entry::getValue 方法引用作为 classifier 函数按国家分组。**我们通过使用 LinkedHashMap::new 为 mapFactory 来说明收集分组的所需映射。** 最后，我们使用 Collectors.mapping() 方法作为下游收集器，从我们的条目中提取键，收集到每个集合中。

## 5. 使用 put() 方法

我们可以使用终端 forEach() 操作和 put() 方法将我们的流收集到现有的 LinkedHashMap 中：

```java
Map```<Integer, String>``` result = new LinkedHashMap<>();

map
  .entrySet()
  .stream()
  .forEach(entry -> result.put(entry.getKey(), entry.getValue()));
```

或者，我们可以完全避免流式传输，并使用 Set 对象可用的 forEach()：

```java
map
  .entrySet()
  .forEach(entry -> result.put(entry.getKey(), entry.getValue()));
```

为了进一步简化，我们可以直接在映射上使用 forEach()：

```java
map.forEach((k, v) -> result.put(k, v));
```

**然而，我们应该注意到，这些每个都引入了我们的函数编程的副作用操作，通过修改现有的映射。** 因此，使用更命令式的风格更合适：

```java
for (Map.Entry```<Integer, String>``` entry : map.entrySet()) {
    result.put(entry.getKey(), entry.getValue());
}
```

我们使用增强的 for 循环来迭代并将每个条目的键值添加到现有的 LinkedHashMap 中。

## 6. 使用 LinkedHashMap 的构造函数

如果我们想简单地将映射转换为 LinkedHashMap，不需要流式传输条目就可以做到这一点。**我们可以使用 LinkedHashMap 的构造函数直接转换映射：**

```java
new LinkedHashMap<>(map);
```

## 7. 结论

在本文中，我们探讨了将映射条目的流收集到 LinkedHashMap 的各种方式。我们探索了使用不同的终端操作和替代流式传输的方法来实现我们的目标。

正如本文中使用的代码示例可以在 GitHub 上找到。