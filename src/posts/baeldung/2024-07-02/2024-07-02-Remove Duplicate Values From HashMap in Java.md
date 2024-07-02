---
date: 2022-04-01
category:
  - Java
  - HashMap
tag:
  - HashMap
  - Java
  - 去重
head:
  - - meta
    - name: keywords
      content: Java, HashMap, 去重
---
# Java中从HashMap中移除重复值

## 1. 概述

_HashMap_ 是Java编程中存储和管理键值对的强大工具。然而，有时我们的数据可能在值上包含重复项。

在本教程中，我们将探讨如何从_HashMap_中移除重复的值。

## 2. 问题介绍

**_HashMap_允许多个键具有相同的值**，这在某些场景下使得重复项不可避免。让我们看一个例子：

```java
Map`````````<String, String>````````` initDevMap() {
    Map`````````<String, String>````````` devMap = new HashMap<>();
    devMap.put("Tom", "Linux");
    devMap.put("Kent", "Linux");

    devMap.put("Bob", "MacOS");
    devMap.put("Eric", "MacOS");

    devMap.put("Peter", "Windows");
    devMap.put("Saajan", "Windows");
    devMap.put("Jan", "Windows");

    devMap.put("Kevin", "FreeBSD");
    return devMap;
}
```

在上面的例子中，`initDevMap()`方法初始化了一个新的_HashMap_，它包含了开发者名称和他们所使用的操作系统（OS）之间的关联。假设我们想要从映射中移除重复的操作系统名称。那么，**我们将得到一个只包含四个条目的映射。**

一个直接的方法可能是遍历映射，跟踪值，并在发现重复项时删除映射条目。此外，我们可能想要使用_Iterator_来遍历映射并移除条目，以避免_ConcurrentModificationException_。

然而，在本教程中，我们将学习一种不同的方法。此外，我们将涵盖两种去重场景：

- 只要结果只包含唯一值，我们不关心哪些条目被移除。
- 对于去重，我们应该遵循特定规则，如保留“A-Z排序”中的第一个/最后一个键，保留最长/最短名称等。

## 3. 两次反转映射

我们知道**_HashMap_不允许重复的键**。因此，**如果我们将输入映射从“_开发者 -> OS_”反转为“_OS -> 开发者_”，相同的操作系统名称将被移除。**然后，我们可以再次反转映射以获得最终结果。

接下来，让我们实现这个“两次反转”的想法，并检查它是否按预期工作：

```java
Map`````````<String, String>````````` devMap = initDevMap();
Map`````````<String, String>````````` tmpReverseMap = new HashMap<>();
Map`````````<String, String>````````` result = new HashMap<>();
for (String name : devMap.keySet()) {
    tmpReverseMap.put(devMap.get(name), name);
}
for (String os : tmpReverseMap.keySet()) {
    result.put(tmpReverseMap.get(os), os);
}
assertThat(result.values()).hasSize(4)
  .containsExactlyInAnyOrder("Windows", "MacOS", "Linux", "FreeBSD");
```

如我们所见，我们使用两个_for_循环来两次反转映射。然后，我们使用方便的assertj库来验证结果。

## 4. 使用Stream API

如果我们使用Java 8或更高版本，我们可以使用Stream API来实现“两次反转”的方法：

```java
Map`````````<String, String>````````` devMap = initDevMap();
Map`````````<String, String>````````` result = devMap.entrySet()
  .stream()
  .collect(toMap(Map.Entry::getValue, Map.Entry::getKey, (keyInMap, keyNew) -> keyInMap))
  .entrySet()
  .stream()
  .collect(toMap(Map.Entry::getValue, Map.Entry::getKey));
assertThat(result.values()).hasSize(4)
  .containsExactlyInAnyOrder("Windows", "MacOS", "Linux", "FreeBSD");
```

基于流的实现比两个_for_循环的实现更加流畅。值得注意的是，**我们使用了_Collector.toMap()_方法来进行反转操作**。第一次反转的目的是移除重复的值。由于我们有重复的值，在键值反转后，我们有键（操作系统名称）冲突。因此，**我们在合并函数中处理键冲突。**此外，由于我们在去重后不关心映射中哪个条目被保留，我们让合并函数返回已经在映射中的键。换句话说，**我们丢弃后来的重复值。**

## 5. 适应特定的去重需求

由于**_HashMap_不保证条目顺序，使用到目前为止的解决方案，我们不能决定去重后哪个条目被保留在映射中。**

然而，我们可以通过调整合并函数来满足不同的需求。接下来，让我们看一个例子。

假设我们有一个新的需求：如果多个开发者使用相同的操作系统，**具有最长名称的开发者应该保留在映射中。**所以预期的结果是：

```java
Map`````````<String, String>````````` expected = ImmutableMap.of(
  "Eric", "MacOS",
  "Kent", "Linux",
  "Saajan", "Windows",
  "Kevin", "FreeBSD");
```

接下来，让我们看看如何实现：

```java
Map`````````<String, String>````````` result = devMap.entrySet()
  .stream()
  .collect(toMap(Map.Entry::getValue, Map.Entry::getKey, (k1, k2) -> k1.length() > k2.length() ? k1 : k2))
  .entrySet()
  .stream()
  .collect(toMap(Map.Entry::getValue, Map.Entry::getKey));
assertThat(result).hasSize(4)
  .isEqualTo(expected);
```

如我们所见，我们采用了之前的基于流的实现，并且只修改了_toMap()_中的合并函数，以便在发生冲突时返回更长的键。

## 6. 结论

在本文中，我们学习了使用“两次反转”的方法来移除_HashMap_中的重复值。我们还看到了如何修改_toMap()_的合并函数以适应特定的去重需求。

一如既往，示例的完整源代码可以在GitHub上找到。