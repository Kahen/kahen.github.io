---
date: 2022-04-01
category:
  - Java
  - HashMap
tag:
  - Java
  - HashMap
  - Submap
head:
  - - meta
    - name: keywords
      content: Java, HashMap, Submap
------
# 从Java的HashMap中获取子映射

## 1. 概述

在我们之前的教程《Java HashMap指南》中，我们展示了如何在Java中使用_HashMap_。

在这个简短的教程中，我们将学习**如何根据一组键从**_**HashMap**_**中获取一个子映射**。

## 2. 使用Java 8 Stream

例如，假设我们有一个_HashMap_和一个键列表：

```java
Map```<Integer, String>``` map = new HashMap<>();
map.put(1, "A");
map.put(2, "B");
map.put(3, "C");
map.put(4, "D");
map.put(5, "E");

List`<Integer>` keyList = Arrays.asList(1, 2, 3);
```

我们可以使用Java 8流来根据_keyList_获取一个子映射：

```java
Map```<Integer, String>``` subMap = map.entrySet().stream()
  .filter(x -> keyList.contains(x.getKey()))
  .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

System.out.println(subMap);
```

输出将如下所示：

```
{1=A, 2=B, 3=C}
```

## 3. 使用_retainAll()_方法

我们可以获得映射的_keySet_并使用_retainAll()_方法来删除所有键不在_keyList_中的条目：

```java
map.keySet().retainAll(keyList);
```

**注意这个方法将编辑原始映射**。如果我们不想影响原始映射，我们可以首先使用_HashMap_的复制构造函数创建一个新的映射：

```java
Map```<Integer, String>``` newMap = new HashMap<>(map);
newMap.keySet().retainAll(keyList);

System.out.println(newMap);
```

输出与上述相同。

## 4. 结论

总之，我们学习了两种方法来**从**_**HashMap**_**中基于一组键获取一个子映射**。