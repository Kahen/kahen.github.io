---
date: 2022-04-01
category:
  - Java
  - HashMap
tag:
  - Java
  - HashMap
  - Multiple Values
head:
  - - meta
    - name: keywords
      content: Java, HashMap, Multiple Values, Data Structure
---
# Java中HashMap实现同一个键对应多个值

在Java编程中广泛使用的HashMap数据结构存储键值对，提供基于关联键的快速值访问。然而，在某些情况下，我们可能遇到需要将多个值与单个键关联的场景。

在本教程中，我们将探讨如何实现一个允许同一个键关联多个值的HashMap。

## 2. 概览
大多数编程语言中的标准HashMap实现只允许每个键关联一个值。当我们遇到需要在同一个键下存储多个值的情况时，我们可以考虑采用不同的方法来解决这一挑战。

一种常见的解决方案是使用像ArrayList、LinkedList或HashSet这样的数据结构来存储每个键的多个值。

## 3. 设计支持多个值的HashMap
让我们开始设计我们的自定义HashMap类，允许同一个键关联多个值。我们将把它命名为MultiValueHashMap。

### 3.1. 类结构
首先，让我们看看我们的MultiValueHashMap类的基本结构：

```java
public class MultiValueHashMap`<K, V>` {
    private final HashMap`<K, ArrayList`<V>``> map = new HashMap<>();
    
    // 方法
    // ...
}
```

在上面的类结构中，我们使用一个私有HashMap来存储键和它们关联的ArrayList值。此外，请注意键类型(K)和值类型(V)是泛型的，使这个类适用于各种数据类型。

### 3.2. 为键添加值
现在，让我们实现一个方法来为特定键添加值：

```java
public void put(K key, V value) {
    map.computeIfAbsent(key, k -> new ArrayList<>()).add(value);
}
```

put方法在给定键下向map添加一个值。如果键不存在，它创建一个新的条目，附带一个空列表，然后将值添加到该列表中。这使得在map中存储和管理与同一个键关联的多个值变得容易。

### 3.3. 检索键的值
接下来，让我们实现一个方法来检索与给定键关联的所有值：

```java
public List`<V>` get(K key) {
    return map.getOrDefault(key, new ArrayList<>());
}
```

get方法返回与指定键关联的ArrayList，或者如果键不存在，则返回一个空的ArrayList。

### 3.4. 移除键值对
为了完成我们的实现，我们将添加一个方法来移除特定的键值对：

```java
public void remove(K key, V value) {
    map.computeIfPresent(key, (k, v) -> {
        v.remove(value);
        return v;
    });
}
```

remove方法接受一个键和值作为输入，并从map中与该键关联的列表中移除该值，如果它存在的话。这是管理在map中存储在特定键下的列表中特定值的移除的一种直接方法。

## 4. JUnit测试示例
为了确保我们的MultiValueHashMap按预期工作，我们应该编写全面的JUnit测试用例。让我们看一些测试示例：

```java
@Test
public void given_MultiValueHashMap_whenPuttingAndGettingSingleValue_thenValueIsRetrieved() {
    MultiValueHashMap`<String, Integer>` map = new MultiValueHashMap<>();
    map.put("key1", 10);
    assertEquals(List.of(10), map.get("key1"));
}

@Test
public void given_MultiValueHashMap_whenPuttingAndGettingMultipleValues_thenAllValuesAreRetrieved() {
    MultiValueHashMap`<String, String>` map = new MultiValueHashMap<>();
    map.put("key2", "value1");
    map.put("key2", "value2");
    map.put("key2", "value3");

    assertEquals(List.of("value1", "value2", "value3"), map.get("key2"));
}

@Test
public void given_MultiValueHashMap_whenGettingNonExistentKey_thenEmptyListIsReturned() {
    MultiValueHashMap`<String, Double>` map = new MultiValueHashMap<>();
    assertTrue(map.get("nonexistent").isEmpty());
}

@Test
public void given_MultiValueHashMap_whenRemovingValue_thenValueIsSuccessfullyRemoved() {
    MultiValueHashMap``<Integer, String>`` map = new MultiValueHashMap<>();
    map.put(1, "one");
    map.put(1, "uno");
    map.put(1, "eins");

    map.remove(1, "uno");
    assertEquals(List.of("one", "eins"), map.get(1));
}

@Test
public void testRemoveNonExistentValue() {
    MultiValueHashMap``<Integer, String>`` map = new MultiValueHashMap<>();
    map.put(1, "one");
    map.remove(1, "nonexistent");
    assertEquals(List.of("one"), map.get(1));
}
```

在上面的JUnit测试示例中，我们验证了MultiValueHashMap类在各种场景下的功能，例如为同一个键添加单个和多个值，检索存在和不存在的键的值，以及移除键值对。

## 5. 结论
在本文中，我们探讨了实现支持同一个键关联多个值的HashMap的概念。此外，我们设计了MultiValueHashMap类，并用JUnit测试示例展示了其用法。

通过使用这种自定义实现，开发者可以高效地管理需要为单个键提供多个值的场景，使他们的代码更加多样化和强大。

如常，本文的完整代码示例可以在GitHub上找到。