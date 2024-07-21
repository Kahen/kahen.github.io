---
date: 2024-07-21
category:
  - Java
  - 编程技巧
tag:
  - Java
  - 集合
  - 逆向映射
head:
  - - meta
    - name: keywords
      content: Java, 逆向映射, 集合, 编程技巧
---

# 如何在Java中反转Map

在这篇文章中，我们将快速了解如何在Java中反转一个Map。我们的目标是为给定的Map```````<K, V>```````类型创建一个新的Map`````````<V, K>`````````实例。此外，我们还将看到如何处理源Map中存在重复值的情况。

## 2. 定义问题

让我们考虑我们有一个包含几个键值对的Map：

```java
Map`<String, Integer>` map = new HashMap<>();
map.put("first", 1);
map.put("second", 2);
```

原始Map将存储如下项目：

```
{first=1, second=2}
```

相反，我们希望将键反转为值，反之亦然，到一个新的Map对象中。结果将是：

```
{1=first, 2=second}
```

## 3. 使用传统的for循环

首先，让我们看看如何使用for循环反转Map：

```java
public static `````````<V, K>````````` Map`````````<V, K>````````` invertMapUsingForLoop(Map```````<K, V>``````` map) {
    Map`````````<V, K>````````` inversedMap = new HashMap<>();
    for (Entry```````<K, V>``````` entry : map.entrySet()) {
        inversedMap.put(entry.getValue(), entry.getKey());
    }
    return inversedMap;
}
```

在这里，我们遍历Map对象的entrySet()。之后，我们将原始的值作为新的键，原始的键作为新的值添加到inversedMap对象中。换句话说，我们通过替换键和值来复制Map的内容。此外，这种方法适用于Java 8之前的版本，尽管我们应该注意到这种方法**只有在源Map的值是唯一的时才有效**。

## 4. 使用Stream API反转Map

Java 8提供了Stream API的便捷方法，以更函数式的风格反转Map。让我们看看其中的一些。

### 4.1. Collectors.toMap()

如果我们的源Map中没有任何重复的值，我们可以使用Collectors.toMap()：

```java
public static `````````<V, K>````````` Map`````````<V, K>````````` invertMapUsingStreams(Map```````<K, V>``````` map) {
    Map`````````<V, K>````````` inversedMap = map.entrySet()
        .stream()
        .collect(Collectors.toMap(Entry::getValue, Entry::getKey));
    return inversedMap;
}
```

首先，将entrySet()转换为对象流。随后，我们使用Collectors.toMap()将键和值收集到inversedMap对象中。

让我们考虑源Map包含重复值的情况。在这种情况下，我们可以使用一个映射函数来应用自定义规则到输入元素：

```java
public static ```````<K, V>``````` Map`````````<V, K>````````` invertMapUsingMapper(Map```````<K, V>``````` sourceMap) {
    return sourceMap.entrySet()
        .stream().collect(
            Collectors.toMap(Entry::getValue, Entry::getKey, (oldValue, newValue) -> oldValue)
        );
}
```

在这个方法中，Collectors.toMap()的最后一个参数是一个映射函数。使用这个，我们可以自定义在有重复项的情况下应该添加哪个键。在上面的例子中，如果Map包含重复的值，我们保留第一个值作为键。然而，如果值重复，我们可以只保留一个键。

### 4.2. Collectors.groupingBy()

有时，即使源Map包含重复的值，我们也可能需要所有的键。或者，Collectors.groupingBy()提供了更好的控制来处理重复的值。

例如，让我们考虑我们有以下键值对：

```java
{first=1, second=2, two=2}
```

在这里，值“2”对于不同的键重复了两次。在这些情况下，我们可以使用groupingBy()方法来实现对值对象的级联“分组”操作：

```java
private static `````````<V, K>````````` Map``<V, List<K>``> invertMapUsingGroupingBy(Map```````<K, V>``````` map) {
    Map``<V, List<K>``> inversedMap = map.entrySet()
        .stream()
        .collect(Collectors.groupingBy(Map.Entry::getValue, Collectors.mapping(Map.Entry::getKey, Collectors.toList())));
    return inversedMap;
}
```

稍微解释一下，Collectors.mapping()函数使用指定的收集器对与给定键相关联的值执行归约操作。groupingBy()收集器将重复的值收集到一个List中，**结果是一个MultiMap**。现在的输出将是：

```
{1=[first], 2=[two, second]}
```

## 5. 结论

在这篇文章中，我们快速回顾了几种内置的反转HashMap的方法，并给出了示例。同时，我们也看到了在反转Map对象时如何处理重复的值。

与此同时，一些外部库在Map接口之上提供了额外的功能。我们之前演示了如何使用Google Guava BiMap和Apache BidiMap来反转Map。

像往常一样，这些示例的代码可以在GitHub上找到。