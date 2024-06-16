---
date: 2024-06-16
category:
  - Java
  - LinkedHashMap
tag:
  - Java
  - LinkedHashMap
  - 编程技巧
---
# 使用其键在LinkedHashMap中获取键/值的位置 | Baeldung

## 1. 引言

_LinkedHashMap_ 类提供了一种方便的方式来保持键值对的插入顺序，同时还提供了 _HashMap_ 的功能。

**在本教程中，我们将探讨几种在 _LinkedHashMap_ 中检索位置（索引）的方法。**

## 2. _LinkedHashMap_ 概览

_LinkedHashMap_ 是一个 Java 类，它扩展了 _HashMap_ 并维护了一个插入顺序的条目链表。这意味着 _LinkedHashMap_ 中元素的顺序是可预测的，并反映了键的插入顺序。

要使用 _LinkedHashMap_，我们可以创建一个实例并用键值对填充它。以下代码片段演示了如何创建一个 _LinkedHashMap_：

```
LinkedHashMap``<String, Integer>`` linkedHashMap = new LinkedHashMap<>();
{
    linkedHashMap.put("apple", 10);
    linkedHashMap.put("orange", 20);
    linkedHashMap.put("banana", 15);
}
```

在这里，我们创建了一个名为 _linkedHashMap_ 的 _LinkedHashMap_ 并用一些键值对填充它。

## 3. 通过迭代条目集的方法

我们可以通过迭代 _LinkedHashMap_ 的 _Entry_ 集来找到特定键的位置（索引）。以下测试方法说明了这种方法：

```
@Test
void givenLinkedHashMap_whenIteratingThroughEntrySet_thenRetrievePositionByKey() {
    int position = 0;
    for (Map.Entry``<String, Integer>`` entry : linkedHashMap.entrySet()) {
        if (entry.getKey().equals("orange")) {
            assertEquals(1, position);
            return;
        }
        position++;
    }
    fail("键未找到");
}
```

在这个测试方法中，我们首先使用特定的键/值对初始化一个名为 _linkedHashMap_ 的 _LinkedHashMap_。然后，我们使用循环迭代这个 _LinkedHashMap_ 的条目集。在每次迭代中，我们使用 _entry.getKey().equals()_ 将当前条目的键与目标键 _orange_ 进行比较。

**当找到匹配项时，我们断言当前位置（_position_）对应于 _LinkedHashMap_ 中键（_orange_）的预期索引 _1_ 并成功退出方法。**

迭代完条目集后，如果未找到键或位置不正确，测试将失败。

## 4. 使用 Java 流

解决这个问题的另一种方法是使用 Java 流。这是这种方法的实现：

```
@Test
void givenLinkedHashMap_whenUsingJavaStreams_thenRetrievePositionByValue() {
    Optional``<String>`` key = linkedHashMap.keySet().stream()
      .filter(integer -> Objects.equals(integer, "orange"))
      .findFirst();

    assertTrue(key.isPresent());
    key.ifPresent(s -> assertEquals(1, new LinkedList<>(linkedHashMap.keySet()).indexOf(s)));
}
```

在这个测试方法中，我们使用 _linkedHashMap.keySet()_ 方法返回 _LinkedHashMap_ 中包含的键的集合。然后，我们通过在这个集合上调用 _stream()_ 方法来创建键的流。

之后，我们使用 _filter()_ 方法根据给定的谓词缩小流元素的范围。**在这种情况下，它试图找到值为 _orange_ 的键。过滤后，我们调用 _findFirst()_ 方法以获取第一个匹配过滤谓词的元素。**

_Optional``<String>``_ key 表示 _findFirst()_ 的结果，它可能包含或不包含值，这取决于是否找到了匹配的键。因此，我们使用 _assertTrue(key.isPresent())_ 方法。

## 5. 结论

在本文中，我们探讨了在 Java 中获取 _LinkedHashMap_ 中键值位置的不同方法。

如常，本文的完整代码示例可以在 GitHub 上找到。

评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。