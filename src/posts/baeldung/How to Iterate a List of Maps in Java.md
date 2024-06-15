---
date: 2024-06-16
category:
  - Java
tag:
  - 集合
  - 迭代
---
# Java中迭代列表映射的方法 | Baeldung

## 1. 引言

在Java编程中，处理集合是一个基本任务。列表（List）和映射（Map）是两种常用的集合类型，有时我们可能需要处理一个列表的映射。无论是处理数据、操作配置还是涉及复杂数据结构的任何其他任务，高效地迭代列表映射都是至关重要的。

在本教程中，我们将探讨在Java中迭代列表映射的各种技术。

## 2. 理解列表映射

在我们探索迭代技术之前，让我们先理解列表映射的概念。

列表映射由多个映射对象组成，每个映射都能够保存键值对，其中每个映射中的键是唯一的。**这种结构提供了显著的灵活性，并在表示表格数据、配置或任何需要键到值映射的数据中找到常见应用。**

让我们考虑一个列表映射的例子：

```java
List`<Map`````<String, Object>``````> listOfMaps = new ArrayList<>();
Map`````<String, Object>````` map1 = new HashMap<>();
map1.put("name", "Jack");
map1.put("age", 30);
listOfMaps.add(map1);

Map`````<String, Object>````` map2 = new HashMap<>();
map2.put("name", "Jones");
map2.put("age", 25);
listOfMaps.add(map2);
```

## 3. 使用传统循环迭代列表映射

通过传统循环迭代列表映射的最直接方法是使用for循环：

```java
for (Map`````<String, Object>````` map : listOfMaps) {
    for (Map.Entry`````<String, Object>````` entry : map.entrySet()) {
        String key = entry.getKey();
        Object value = entry.getValue();
        System.out.format("%s: %s\n", key, value);
    }
}
```

在这种方法中，我们首先遍历列表，获取每个映射。然后，对于每个映射，我们使用entrySet()迭代它的条目，允许我们访问每个条目的键和值。

这是输出结果：

```
name: Jack
age: 30
name: Jones
age: 25
```

### 3.1 使用Map.keySet()和Map.get()进行迭代

或者，我们可以使用映射接口的keySet()方法来检索一个包含映射中所有键的集合。然后我们可以迭代这个集合，对于每个键，使用get()方法获取相应的值：

```java
for (Map`````<String, Object>````` map : listOfMaps) {
    for (String key : map.keySet()) {
        Object value = map.get(key);
        System.out.format("%s: %s\n", key, value);
    }
}
```

## 4. 使用Java Stream进行迭代

Java 8引入了流（streams），为处理集合提供了一种更函数式的方法。我们可以利用流来迭代列表映射：

```java
listOfMaps.stream()
  .flatMap(map -> map.entrySet().stream())
  .forEach(entry -> {
      String key = entry.getKey();
      Object value = entry.getValue();
      System.out.format("%s: %s\n", key, value);
  });
```

在这里，我们使用flatMap()操作将每个映射转换为其条目的流。然后，我们迭代每个条目并相应地处理它。

## 5. 使用forEach()循环与Lambda表达式进行迭代

我们可以使用forEach()循环结合Lambda表达式来迭代列表映射：

```java
listOfMaps.forEach(map -> {
    map.forEach((key, value) -> {
        System.out.println("%s: %s\n", key, value);
    });
});
```

## 6. 结论

在本文中，我们看到了在Java中迭代列表映射可以采用多种方式。通过掌握讨论的技术，我们将更好地处理复杂数据结构。无论我们喜欢传统的循环还是流，选择正确的方法取决于我们项目的具体要求和编码风格偏好。

所有这些示例的源代码都可以在GitHub上找到。

文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。