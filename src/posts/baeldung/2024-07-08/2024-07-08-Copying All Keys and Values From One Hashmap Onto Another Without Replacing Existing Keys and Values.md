---
date: 2024-07-09
category:
  - Java
  - HashMap
tag:
  - Java
  - HashMap
  - 复制
  - 合并
head:
  - - meta
    - name: keywords
      content: Java, HashMap, 复制, 合并, 不替换现有键值对
---
# 将一个HashMap中的所有键和值复制到另一个HashMap中，不替换目标HashMap中的现有键和值

在本教程中，我们将探讨如何在不替换目标HashMap中的键和值的情况下，将一个HashMap复制到另一个HashMap中的方法。Java中的HashMap是Map接口的哈希表实现，是一种支持存储键值对的数据结构。

## 问题陈述
考虑我们有两个HashMap，sourceMap和targetMap，它们包含国家及其首都城市作为键和值。我们希望将sourceMap的内容复制到targetMap中，以便我们只有一个包含所有国家及其首都城市的地图。复制应遵循以下规则：
- 我们应该保留targetMap的原始内容
- 如果出现键的冲突，例如两个映射中都存在的城市，我们应该保留targetMap中的条目

让我们以以下输入为例：
```
Map```````````````````````<String, String>``````````````````````` sourceMap = new HashMap<>();
sourceMap.put("India", "Delhi");
sourceMap.put("United States", "Washington D.C.");
sourceMap.put("United Kingdom", "London D.C.");

Map```````````````````````<String, String>``````````````````````` targetMap = new HashMap<>();
targetMap.put("Zimbabwe", "Harare");
targetMap.put("Norway", "Oslo");
targetMap.put("United Kingdom", "London");
```

修改后的targetMap保留其值并添加了sourceMap的所有值：
```
"India", "Delhi"
"United States", "Washington D.C."
"United Kingdom", "London"
"Zimbabwe", "Harare"
"Norway", "Oslo"
```

## 通过HashMaps迭代
解决我们问题的简单方法之一是遍历sourceMap的每个条目（键值对）并与targetMap进行比较。当我们发现只存在于sourceMap中的条目时，我们将其添加到targetMap中。结果的targetMap包含它自己和sourceMap的所有键值。

我们可以通过循环遍历sourceMap的entrySet()并检查targetMap中键的存在性，而不是循环遍历两个映射的entrySets()：
```
Map```````````````````````<String, String>``````````````````````` copyByIteration(Map```````````````````````<String, String>``````````````````````` sourceMap, Map```````````````````````<String, String>``````````````````````` targetMap) {
    for (Map.Entry```````````````````````<String, String>``````````````````````` entry : sourceMap.entrySet()) {
        if (!targetMap.containsKey(entry.getKey())) {
            targetMap.put(entry.getKey(), entry.getValue());
        }
    }
    return targetMap;
}
```

## 使用Map的putIfAbsent()
我们可以重构上述代码，使用Java 8中添加的putIfAbsent()方法。顾名思义，该方法仅在指定条目中的键在targetMap中不存在时，将sourceMap的条目复制到targetMap：
```
Map```````````````````````<String, String>``````````````````````` copyUsingPutIfAbsent(Map```````````````````````<String, String>``````````````````````` sourceMap, Map```````````````````````<String, String>``````````````````````` targetMap) {
    for (Map.Entry```````````````````````<String, String>``````````````````````` entry : sourceMap.entrySet()) {
        targetMap.putIfAbsent(entry.getKey(), entry.getValue());
    }
    return targetMap;
}
```

不使用循环的替代方法是利用Java 8中添加的forEach结构。我们提供一个操作，在我们的情况下，是调用targetMap的putIfAbsent()方法，它对给定HashMap的每个条目执行，直到所有元素都被处理或引发异常：
```
Map```````````````````````<String, String>``````````````````````` copyUsingPutIfAbsentForEach(Map```````````````````````<String, String>``````````````````````` sourceMap, Map```````````````````````<String, String>``````````````````````` targetMap) {
    sourceMap.forEach(targetMap::putIfAbsent);
    return targetMap;
}
```

## 使用Map的putAll()
Map接口提供了一个putAll()方法，我们可以使用它来实现我们期望的结果。该方法将输入映射的所有键和值复制到当前映射中。**我们应该注意，如果源和目标哈希映射之间的键发生冲突，源映射中的条目将替换targetMap的条目**。

我们可以通过从sourceMap中显式删除公共键来解决这个问题：
```
Map```````````````````````<String, String>``````````````````````` copyUsingPutAll(Map```````````````````````<String, String>``````````````````````` sourceMap, Map```````````````````````<String, String>``````````````````````` targetMap) {
    sourceMap.keySet().removeAll(targetMap.keySet());
    targetMap.putAll(sourceMap);
    return targetMap;
}
```

## 使用Maps的merge()
Java 8在Maps接口中引入了一个merge()方法。**它接受一个键、一个值和一个重新映射函数作为方法参数**。

假设我们在输入中指定的键在当前映射中尚未与值关联（或与null关联）。在这种情况下，该方法将其与提供的非null值关联。

**如果键在两个映射中都存在，则将关联的值替换为给定重新映射函数的结果。**如果重新映射函数的结果是null，则它将删除键值对。

我们可以使用merge()方法来复制sourceMap到targetMap的条目：
```
Map```````````````````````<String, String>``````````````````````` copyUsingMapMerge(Map```````````````````````<String, String>``````````````````````` sourceMap, Map```````````````````````<String, String>``````````````````````` targetMap) {
    sourceMap.forEach((key, value) -> targetMap.merge(key, value, (oldVal, newVal) -> oldVal));
    return targetMap;
}
```

我们的重新映射函数确保在发生冲突时保留targetMap中的值。

## 使用Guava的Maps.difference()
Guava库在其Maps类中使用了一个difference()方法。要使用Guava库，我们应该在我们的pom.xml中添加相应的依赖项：
```
`<dependency>`
    `<groupId>`com.google.guava`</groupId>`
    `<artifactId>`guava`</artifactId>`
    `<version>`31.0.1-jre`</version>`
`</dependency>`
```

**difference()方法以两个映射作为输入，并计算这两个映射之间的差异。提供的映射的键应该遵守equals()和hashCode()的约定。**

要解决我们的问题，我们首先评估映射之间的差异。一旦我们知道只存在于sourceMap中的条目（左侧的映射），我们就将它们放入我们的targetMap：
```
Map```````````````````````<String, String>``````````````````````` copyUsingGuavaMapDifference(Map```````````````````````<String, String>``````````````````````` sourceMap, Map```````````````````````<String, String>``````````````````````` targetMap) {
    MapDifference```````````````````````<String, String>``````````````````````` differenceMap = Maps.difference(sourceMap, targetMap);
    targetMap.putAll(differenceMap.entriesOnlyOnLeft());
    return targetMap;
}
```

## 结论
在本文中，我们探讨了在复制一个HashMap中的条目到另一个HashMap时，如何保留目标HashMap的现有条目。我们实现了基于迭代的方法，并使用不同的Java库函数解决了问题。我们还探讨了如何使用Guava库来解决问题。

像往常一样，所有代码示例都可以在GitHub上找到。