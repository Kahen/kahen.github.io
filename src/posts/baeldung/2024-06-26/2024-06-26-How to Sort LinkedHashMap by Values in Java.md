---
date: 2024-06-27
category:
  - Java
  - Tutorial
tag:
  - LinkedHashMap
  - Sorting
head:
  - - meta
    - name: keywords
      content: Java, Sorting, LinkedHashMap, Tutorial
---
# 如何在Java中按值对LinkedHashMap进行排序 | Baeldung

## 1. 概述

映射（Map）是我们在需要管理键值对关联时常用的数据类型。LinkedHashMap是一个受欢迎的选择，主要是因为它保留了元素的插入顺序。然而，在许多现实世界的场景中，我们经常需要根据值而不是键来对LinkedHashMap中的元素进行排序。

在本教程中，我们将探讨如何在Java中按值对LinkedHashMap进行排序。

## 2. 按值排序

LinkedHashMap的默认行为是保持元素的插入顺序。这在我们需要跟踪元素添加到映射的顺序时非常有用。然而，按值排序是一个不同的需求。我们可能希望根据与键关联的值来安排条目，无论是升序还是降序。

接下来，让我们看一个例子。假设我们有一个名为MY_MAP的LinkedHashMap：

```java
static LinkedHashMap````````<String, Integer>```````` MY_MAP = new LinkedHashMap<>();
static {
    MY_MAP.put("key a", 4);
    MY_MAP.put("key b", 1);
    MY_MAP.put("key c", 3);
    MY_MAP.put("key d", 2);
    MY_MAP.put("key e", 5);
}
```

正如上面的例子所示，我们使用静态块初始化了MY_MAP。映射中的值是整数。我们的目标是按值对映射进行排序，并得到一个新的LinkedHashMap，它等同于EXPECTED_MY_MAP：

```java
static LinkedHashMap````````<String, Integer>```````` EXPECTED_MY_MAP = new LinkedHashMap<>();
static{
    EXPECTED_MY_MAP.put("key b", 1);
    EXPECTED_MY_MAP.put("key d", 2);
    EXPECTED_MY_MAP.put("key c", 3);
    EXPECTED_MY_MAP.put("key a", 4);
    EXPECTED_MY_MAP.put("key e", 5);
}
```

接下来，我们将看到几种解决问题的方法。我们将使用单元测试断言来验证每种解决方案。

## 3. 使用Collections.sort()方法

首先，让我们看看如果我们的Java版本早于Java 8，如何解决这个问题。

LinkedHashMap的entrySet()提供了对所有条目的访问，同时保持它们的原始顺序。

我们还可以利用Collections.sort()方法，它允许我们根据给定的Comparator对对象集合进行排序。

让我们先看看解决方案：

```java
List<Map.Entry````````<String, Integer>````````> entryList = new ArrayList<>(MY_MAP.entrySet());

Collections.sort(entryList, new Comparator<Map.Entry````````<String, Integer>````````>() {
    @Override
    public int compare(Map.Entry````````<String, Integer>```````` o1, Map.Entry````````<String, Integer>```````` o2) {
        return o1.getValue().compareTo(o2.getValue());
    }
});

LinkedHashMap````````<String, Integer>```````` result = new LinkedHashMap<>();
for (Map.Entry````````<String, Integer>```````` e : entryList) {
    result.put(e.getKey(), e.getValue());
}

assertEquals(EXPECTED_MY_MAP, result);
```

让我们快速浏览一下代码，以了解它的工作原理。

首先，我们将entrySet()的结果包装在一个List中。然后，我们创建了一个匿名Comparator，根据它们的值对条目进行排序，并将其传递给Collections.sort()方法。最后，我们创建了一个新的LinkedHashMap对象，并将排序后的条目放入其中。

## 4. 使用forEachOrdered()

Stream API是Java 8带给我们的一个重大新特性。它允许我们方便地操作集合。因此，如果我们使用的Java版本是8或更高版本，我们可以**使用Stream API从原始映射中填充一个空的LinkedHashMap，其中包含排序后的条目**：

```java
LinkedHashMap````````<String, Integer>```````` result = new LinkedHashMap<>();
MY_MAP.entrySet()
  .stream()
  .sorted(Map.Entry.comparingByValue())
  .forEachOrdered(entry -> result.put(entry.getKey(), entry.getValue()));

assertEquals(EXPECTED_MY_MAP, result);
```

正如我们所看到的，使用Stream API，解决方案更加流畅和紧凑。

值得注意的是，Map.Entry支持comparingByValue()方法。顾名思义，它返回一个比较条目的Comparator，根据它们的值进行比较。

由于我们示例中的Entry.value是Integer，它是Comparable，我们可以直接调用comparingByValue()。

## 5. 使用collect()

一种更简洁的替代方法涉及利用collect()方法，一次性创建映射并累积排序后的条目：

```java
LinkedHashMap````````<String, Integer>```````` result = MY_MAP.entrySet()
  .stream()
  .sorted(Map.Entry.comparingByValue())
  .collect(LinkedHashMap::new, (map, entry) -> map.put(entry.getKey(), entry.getValue()), Map::putAll);

assertEquals(EXPECTED_MY_MAP, result);
```

collect()方法是这种方法的关键。它接受三个参数：

- Supplier (LinkedHashMap::new) – 提供一个新的容器（LinkedHashMap）来累积结果
- Accumulator ((map, entry) -> map.put(entry.getKey(), entry.getValue())) – 这个函数应用于流中的每个元素，并将每个条目添加到累积的LinkedHashMap中
- Combiner (Map::putAll) – 在并行处理中，它组合由多个累加器更新的容器。在这种情况下，它是不相关的，因为流是顺序处理的。

因此，**collect()将排序后的条目累积到一个新的LinkedHashMap中。**

## 6. 当值不是Comparable时

我们已经看到了如何按值对MY_MAP进行排序。由于Integer值是Comparable，当我们使用Stream API时，我们可以简单地调用sorted(Map.Entry.comparingByValue())。

但是，**如果值不是Comparable，我们需要向comparingByValue()传递一个Comparator**：

```java
class Player {
    private String name;
    private Integer score = 0;

    public Player(String name, Integer score) {
        this.name = name;
        this.score = score;
    }

    // ... hashcode, equals, getters methods are omitted ...
}
```

正如代码所示，Player类没有实现**Comparable**。现在，让我们初始化一个LinkedHashMap````<String, Player>````：

```java
static LinkedHashMap````<String, Player>```` PLAYERS = new LinkedHashMap<>();
static {
    PLAYERS.put("player a", new Player("Eric", 9));
    PLAYERS.put("player b", new Player("Kai", 7));
    PLAYERS.put("player c", new Player("Amanda", 20));
    PLAYERS.put("player d", new Player("Kevin", 4));
}
```

假设我们想按玩家的分数对PLAYERS进行排序，并得到一个新的LinkedHashMap：

```java
static LinkedHashMap````<String, Player>```` EXPECTED_PLAYERS = new LinkedHashMap<>();
static {
    EXPECTED_PLAYERS.put("player d", new Player("Kevin", 4));
    EXPECTED_PLAYERS.put("player b", new Player("Kai", 7));
    EXPECTED_PLAYERS.put("player a", new Player("Eric", 9));
    EXPECTED_PLAYERS.put("player c", new Player("Amanda", 20));
}
```

那么，接下来让我们看看如何实现这一点：

```java
LinkedHashMap````<String, Player>```` result = PLAYERS.entrySet()
  .stream()
  .sorted(Map.Entry.comparingByValue(Comparator.comparing(Player::getScore)))
  .collect(LinkedHashMap::new, (map, entry) -> map.put(entry.getKey(), entry.getValue()), Map::putAll);

assertEquals(EXPECTED_PLAYERS, result);
```

在这种情况下，我们利用Comparator.comparing(Player::getScore)在comparingByValue()方法中。

这种结构通过实例方法引用生成一个Comparator，专门比较Player对象的score字段。

## 7. 结论

在本教程中，我们探讨了不同的方式来对LinkedHashMap按值进行排序。我们还解决了在值没有实现Comparable接口的情况下的排序实现。

如常，示例的完整源代码可在GitHub上找到。