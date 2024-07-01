---
date: 2022-04-01
category:
  - Java Collections
  - HashMap
tag:
  - Java
  - ArrayList
  - HashMap
head:
  - - meta
    - name: keywords
      content: Java, ArrayList, HashMap, Extract Keys, Extract Values
---
# 从HashMap获取键和值作为ArrayList的值

当我们在Java中操作数据结构时，一个常见的场景是从一个HashMap中提取键和值，并将它们组织成ArrayList。

在这个快速教程中，我们将探讨实现这一目标的各种实用方法。

## 2. 问题介绍

首先，让我们创建一个HashMap对象作为输入示例：

```java
static final HashMap``<String, String>`` DEV_MAP;
static {
    DEV_MAP = new HashMap<>();
    DEV_MAP.put("Kent", "Linux");
    DEV_MAP.put("Eric", "MacOS");
    DEV_MAP.put("Kevin", "Windows");
    DEV_MAP.put("Michal", "MacOS");
    DEV_MAP.put("Saajan", "Linux");
}
```

如上述代码所示，我们使用静态块初始化了一个HashMap。该映射包含一些开发人员和他们使用的主要操作系统。

当讨论从映射中提取键和值列表时，根据不同的具体要求，可能会出现不同的情况。

一种这样的情况**涉及原始映射中元素_keyList[i]_和_valueList[i]_之间的直接关联，给定索引_i_**。本质上，在原始映射的上下文中，键和值列表中相应索引的元素表现出相关性：

```
Map:
    k1 -> v1
    k2 -> v2
    k3 -> v3

索引    :  0,  1,  2
KeyList  : k1, k2, k3
ValueList: v1, v2, v3
```

第二种情况相对简单。在这里，我们的目标是从提供的映射中提取一个键列表和一个值列表，而不保留对初始键值对关联的关注。

本教程将涵盖这两种情况。此外，为了确保清晰和验证，我们将使用单元测试断言来验证每种方法结果的正确性。

## 3. 使用HashMap的keySet()和values()方法

首先，让我们解决更简单的情况：**在不关注元素之间的关联的情况下，从DEV_MAP中获取键和值列表**。

Map接口提供了两种方法，可以让我们快速解决问题：

- keySet() – 以Set的形式获取映射中的所有键
- values() – 返回所有值作为Collection

**我们可以将Set和Collection传递给ArrayList的构造函数，以获得预期的列表对象**，例如，获取键列表：

```java
List```````<String>``````` keyList = new ArrayList<>(DEV_MAP.keySet());
assertEquals(Lists.newArrayList("Kent", "Eric", "Kevin", "Michal", "Saajan"), keyList);
```

然而，运行测试很可能会失败。这是因为**HashMap不维护其条目的顺序**。换句话说，列表中元素的顺序无法预测。

接下来，让我们使用AssertJ的containsExactlyInAnyOrder()来检查元素并忽略它们的顺序：

```java
assertThat(keyList).containsExactlyInAnyOrder("Kent", "Eric", "Kevin", "Michal", "Saajan");
```

类似地，我们可以使用Map.values()获取值列表：

```java
List```````<String>``````` valueList = new ArrayList<>(DEV_MAP.values());
assertThat(valueList).containsExactlyInAnyOrder("Linux", "MacOS", "Windows", "MacOS", "Linux");
```

现在，让我们转向另一种情况：获取一个键列表和一个值列表，其中元素_keyList[i]_和_valueList[i]_在映射中保持相关性。

首先，让我们创建一个方法来验证这两个列表是否符合预期：

```java
void assertKeyAndValueList(List```````<String>``````` keyList, List```````<String>``````` valueList) {
    assertThat(keyList).containsExactlyInAnyOrder("Kent", "Eric", "Kevin", "Michal", "Saajan");
    assertThat(valueList).containsExactlyInAnyOrder("Linux", "MacOS", "Windows", "MacOS", "Linux");
    for (int i = 0; i < keyList.size(); i++) {
        assertThat(DEV_MAP).containsEntry(keyList.get(i), valueList.get(i));
    }
}
```

如上述方法所示，除了验证两个列表应该包含所需的元素外，我们还确保它们在DEV_MAP中的相应元素在相同索引处是关联的。

解决这个问题的一种方法是**遍历映射的条目，并使用每个条目的键和值填充两个预先初始化的列表**：

```java
List```````<String>``````` keyList = new ArrayList<>();
List```````<String>``````` valueList = new ArrayList<>();
for (Map.Entry``<String, String>`` entry : DEV_MAP.entrySet()) {
    keyList.add(entry.getKey());
    valueList.add(entry.getValue());
}

assertKeyAndValueList(keyList, valueList);
```

如果我们运行测试，测试将通过。因此，这种方法是有效的。

**如果我们使用Java 8或更高版本，我们可以用forEach()调用和lambda表达式替换_for_循环**，以提高代码的可读性：

```java
List```````<String>``````` keyList = new ArrayList<>();
List```````<String>``````` valueList = new ArrayList<>();
DEV_MAP.forEach((k, v) -> {
    keyList.add(k);
    valueList.add(v);
});

assertKeyAndValueList(keyList, valueList);
```

## **5. 结论**

在本文中，我们首先讨论了问题的两种情况：从HashMap中获取一个键列表和一个值列表。之后，我们探讨了如何在每种情况下解决这个问题。

如往常一样，示例的完整源代码可在GitHub上找到。