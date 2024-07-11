---
date: 2024-07-12
category:
  - Java
  - 编程
tag:
  - Java 9
  - Map.of()
  - Map.ofEntries()
head:
  - - meta
    - name: keywords
      content: Java, Map.of(), Map.ofEntries(), 编程, 教程
---

# Java 9 中 Map.of() 和 Map.ofEntries() 的区别

Java 9 引入了 _Map.of()_ 方法，使得创建不可变映射变得更加容易，以及 _Map.ofEntries()_ 方法，它具有稍微不同的功能。

在本教程中，我们将更仔细地查看这两种用于不可变映射的静态工厂方法，并解释哪一个适合哪一种用途。

_Map.of()_ 方法**接受指定数量的键值对作为参数**，并返回包含每对键值对的不可变映射。参数中的对的顺序对应于它们添加到映射中的顺序。如果我们尝试添加一个带有重复键的键值对，它将抛出一个 _IllegalArgumentException_。如果我们尝试添加一个 _null_ 键或值，它将抛出一个 _NullPointerException_。

实现为重载的 _static_ 工厂方法，第一个让我们创建一个空映射：
```java
static ``````````<K, V>`````````` Map``````````<K, V>`````````` of() {
    return (Map``<K,V>``) ImmutableCollections.EMPTY_MAP;
}
```
让我们看看用法：
```java
Map````<Long, String>```` map = Map.of();
```

接口 _Map``````````<K, V>``````````_ 中还有一个方法，它接受一个键和一个值：
```java
static ``````````<K, V>`````````` Map``````````<K, V>`````````` of(K k1, V v1) {
    return new ImmutableCollections.Map1<>(k1, v1);
}
```
让我们调用它：
```java
Map````<Long, String>```` map = Map.of(1L, "value1");
```

这些工厂方法还有九个重载版本，接受最多十个键和十个值，正如我们在 OpenJDK 17 中看到的：
```java
static ``````````<K, V>`````````` Map``````````<K, V>`````````` of(K k1, V v1, K k2, V v2, K k3, V v3, K k4, V v4, K k5, V v5, K k6, V v6, K k7, V v7, K k8, V v8, K k9, V v9, K k10, V v10) {
    return new ImmutableCollections.MapN<>(k1, v1, k2, v2, k3, v3, k4, v4, k5, v5, k6, v6, k7, v7, k8, v8, k9, v9, k10, v10);
}
```

尽管这些方法非常有用，但创建更多的方法将会变得非常混乱。此外，我们不能使用 _Map.of()_ 方法从现有的键和值创建映射，因为此方法仅接受未定义的键值对作为参数。这就是 _Map.ofEntries()_ 方法的用武之地。

### 3. _Map.ofEntries()_

_Map.ofEntries()_ 方法**接受任意数量的 _Map.Entry``````````<K, V>``````````_ 对象作为参数**，并且也返回一个不可变映射。同样，参数中的对的顺序与它们添加到映射中的顺序相同。如果我们尝试添加一个带有重复键的键值对，它会抛出一个 _IllegalArgumentException_。

让我们看看 OpenJDK 17 中的静态工厂方法实现：
```java
static ``````````<K, V>`````````` Map``````````<K, V>`````````` ofEntries(Entry`<? extends K, ? extends V>`... entries) {
    if (entries.length == 0) { // 隐式检查entries数组是否为空
        var map = (Map``<K,V>``) ImmutableCollections.EMPTY_MAP;
        return map;
    } else if (entries.length == 1) {
        // 隐式检查数组槽位是否为空
        return new ImmutableCollections.Map1<>(entries[0].getKey(), entries[0].getValue());
    } else {
        Object[] kva = new Object[entries.length << 1];
        int a = 0;
        for (Entry`<? extends K, ? extends V>` entry : entries) {
            // 隐式检查每个数组槽位是否为空
            kva[a++] = entry.getKey();
            kva[a++] = entry.getValue();
        }
        return new ImmutableCollections.MapN<>(kva);
    }
}
```

可变参数实现允许我们传递可变数量的条目。

例如，我们可以创建一个空映射：
```java
Map````<Long, String>```` map = Map.ofEntries();
```

或者我们可以创建并填充一个映射：
```java
Map````<Long, String>```` longUserMap = Map.ofEntries(Map.entry(1L, "User A"), Map.entry(2L, "User B"));
```

_Map.ofEntries()_ 方法的一个巨大优势是，我们还可以使用它**从现有的键和值创建映射**。这在 _Map.of()_ 方法中是不可能的，因为它只接受未定义的键值对作为参数。

### 4. 结论

_Map.of()_ 方法只适合最多有10个元素的映射。这是因为它被实现为11个不同的重载方法，接受从零到十个名称-值对作为参数。**另一方面，_Map.ofEntries()_ 方法可以用于任何大小的映射**，因为它利用了可变参数的特性。

完整的示例可以在 GitHub 上找到。