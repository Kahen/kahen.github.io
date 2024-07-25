---
date: 2022-04-01
category:
  - Java
  - Collections
tag:
  - Java Map
  - keySet
  - entrySet
  - values
head:
  - - meta
    - name: keywords
      content: Java Map, keySet, entrySet, values
---
# Java Map – keySet() 与 entrySet() 以及 values() 方法 | Baeldung

在本教程中，我们将讨论 Java 中 Map 接口的三种方法：keySet()、entrySet() 和 values()。这些方法分别用于检索 Map 中的键集合、键值映射集合和值集合。

### 2. Map 初始化

虽然我们可以在任何实现 Map 接口的类上使用这些方法，如 HashMap、TreeMap 和 LinkedHashMap，但这里我们将使用 HashMap。

让我们创建并初始化一个键类型为 String，值为 Integer 类型的 HashMap：

```java
Map`<String, Integer>` map = new HashMap<>();
map.put("one", 1);
map.put("two", 2);
```

### 3. keySet() 方法

**keySet() 方法返回 Map 中包含的键的 Set。**

让我们将 keySet() 方法应用于 Map 并将结果存储在一个名为 actualValues 的 Set 变量中：

```java
Set`<String>` actualValues = map.keySet();

```

现在，让我们确认返回的 Set 的大小为 2：

```java
assertEquals(2, actualValues.size());
```

此外，我们可以看到返回的 Set 包含 Map 的键：

```java
assertTrue(actualValues.contains("one"));
assertTrue(actualValues.contains("two"));
```

### 4. entrySet() 方法

**entrySet() 方法返回键值映射的集合。** 该方法不接受任何参数，返回类型为 Map.Entry 的 Set。

让我们将 entrySet() 方法应用于 Map：

```java
Set<Map.Entry`<String, Integer>`> actualValues = map.entrySet();
```

正如我们所看到的，actualValues 是 Map.Entry 对象的 Set。

Map.Entry 是一个静态接口，它同时持有键和值。内部，它有两种实现——AbstractMap.SimpleEntry 和 AbstractMap.SimpleImmutableEntry。

像以前一样，让我们确认返回的 Set 的大小为 2：

```java
assertEquals(2, actualValues.size());
```

此外，我们可以看到返回的 Set 包含 Map 的键值条目：

```java
assertTrue(actualValues.contains(new AbstractMap.SimpleEntry<>("one", 1)));
assertTrue(actualValues.contains(new AbstractMap.SimpleEntry<>("two", 2)));
```

在这里，我们选择了 Map.Entry 接口的 AbstractMap.SimpleEntry 实现来进行测试。

### 5. values() 方法

**values() 方法返回 Map 中包含的值的集合。** 该方法不接受任何参数，返回类型为 Collection。

让我们将 values() 方法应用于 Map 并将结果存储在一个名为 actualValues 的 Collection 变量中：

```java
Collection`<Integer>` actualValues = map.values();
```

现在，让我们验证返回的 Collection 的大小：

```java
assertEquals(2, actualValues.size());
```

此外，我们可以看到返回的集合包含 Map 的值：

```java
assertTrue(actualValues.contains(1));
assertTrue(actualValues.contains(2));
```

### 6. 结论

在本文中，我们讨论了 Map 接口的 keySet()、entrySet() 和 values() 方法。

像往常一样，完整的源代码可以在 GitHub 上找到。