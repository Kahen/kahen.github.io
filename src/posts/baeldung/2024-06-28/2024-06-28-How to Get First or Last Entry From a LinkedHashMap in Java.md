---
date: 2022-04-01
category:
  - Java Collections
  - LinkedHashMap
tag:
  - Java
  - LinkedHashMap
  - Entry
head:
  - - meta
    - name: keywords
      content: Java, LinkedHashMap, Java Collections, Entry, First, Last, Key-Value Pair
------
# 如何在Java中从LinkedHashMap获取首或尾条目

在Java中，_LinkedHashMap_ 是一个强大的工具，用于维护键值对的同时保持插入顺序。一个常见的需求是访问 _LinkedHashMap_ 中的第一个或最后一个条目。

在本教程中，我们将探讨实现这一点的各种方法。

## 2. 准备一个 _LinkedHashMap_ 示例

在深入实现访问 _LinkedHashMap_ 中第一个和最后一个条目的方法之前，让我们简要回顾一下 _LinkedHashMap_ 的特性。

首先，_LinkedHashMap_ 是Java Collections Framework的一部分，并且扩展了 _HashMap_ 类。此外，与常规的 _HashMap_ 不同，**_LinkedHashMap_ 保持元素的插入顺序。**

根据我们使用的构造函数，这个顺序可以是插入顺序或访问顺序。简单来说，插入顺序意味着元素根据它们被添加到 _LinkedHashMap_ 的时间来排序，而访问顺序意味着元素根据访问频率排序，最近访问的元素出现在最后。

在本教程中，我们将以插入顺序的 _LinkedHashMap_ 为例，演示如何获取第一个和最后一个条目。但是，这些解决方案也适用于访问顺序的 _LinkedHashMap_。

接下来，让我们准备一个 _LinkedHashMap_ 对象示例：

```java
static final LinkedHashMap````````````<String, String>```````````` THE_MAP = new LinkedHashMap<>();
static {
    THE_MAP.put("key one", "a1 b1 c1");
    THE_MAP.put("key two", "a2 b2 c2");
    THE_MAP.put("key three", "a3 b3 c3");
    THE_MAP.put("key four", "a4 b4 c4");
}
```

如上例所示，我们使用静态块来初始化 _THE_MAP_ 对象。

为了简单起见，在本教程中，我们假设 _LinkedHashMap_ 对象不为空或null。此外，我们将利用单元测试断言来验证每种方法是否产生了预期的结果。

## 3. 遍历映射条目

我们知道 _Map_ 的 _entrySet()_ 方法返回由映射支持的所有条目集合。此外，**对于 _LinkedHashMap_，返回的集合中的条目遵循映射对象中的条目顺序。**

因此，我们可以通过迭代 _entrySet()_ 的结果来轻松访问 _LinkedHashMap_ 中的任何条目。例如，**_linkedHashMap.entrySet().iterator().next()_ 返回映射中的第一个元素：**

```java
Entry````````````<String, String>```````````` firstEntry = THE_MAP.entrySet().iterator().next();
assertEquals("key one", firstEntry.getKey());
assertEquals("a1 b1 c1", firstEntry.getValue());
```

然而，获取最后一个条目并不像我们检索第一个条目那样简单。**我们必须迭代到集合中的最后一个元素才能获取最后一个映射条目：**

```java
Entry````````````<String, String>```````````` lastEntry = null;
Iterator<Entry````````````<String, String>````````````> it = THE_MAP.entrySet().iterator();
while (it.hasNext()) {
    lastEntry = it.next();
}

assertNotNull(lastEntry);
assertEquals("key four", lastEntry.getKey());
assertEquals("a4 b4 c4", lastEntry.getValue());
```

在这个例子中，我们使用 _Iterator_ 对象遍历 _LinkedHashMap_ 并不断更新 _lastEntry_ 变量，直到我们到达最后一个条目。

我们的例子显示这种方法对于插入顺序的 _LinkedHashMaps_ 是有效的。一些人可能会问，这种方法是否也适用于访问顺序的 _LinkedHashMap_，因为在访问顺序的 _LinkedHashMap_ 中访问条目可能会改变它们的顺序。

因此，值得注意的是，迭代映射的视图不会影响支持映射的迭代顺序。这是因为**只有对映射的显式访问操作才会影响顺序，例如 _map.get(key)_。**所以，这种方法也适用于访问顺序的 _LinkedHashMap_。

## 4. 将映射条目转换为数组

我们知道数组对于随机访问非常高效。所以，如果我们能够将 _LinkedHashMap_ 条目转换为数组，我们就可以高效地访问数组的第一个和最后一个元素。

我们已经了解到，我们可以通过调用 _entrySet()_ 获取所有映射条目集合。因此，Java _Collection_ 的 _toArray()_ 方法帮助我们从集合中获得数组：

```java
Entry````````````<String, String>````````````[] theArray = new Entry[THE_MAP.size()];
THE_MAP.entrySet().toArray(theArray);
```

然后，访问数组中的第一个和最后一个元素对我们来说不是挑战：

```java
Entry````````````<String, String>```````````` firstEntry = theArray[0];
assertEquals("key one", firstEntry.getKey());
assertEquals("a1 b1 c1", firstEntry.getValue());

Entry````````````<String, String>```````````` lastEntry = theArray[THE_MAP.size() - 1];
assertEquals("key four", lastEntry.getKey());
assertEquals("a4 b4 c4", lastEntry.getValue());
```

## 5. 使用Stream API

自Java 8以来引入的Stream API提供了一系列的便捷方法，允许我们轻松处理集合。

接下来，让我们看看如何使用Java _Stream_ 从 _LinkedHashMap_ 中获取第一个条目：

```java
Entry````````````<String, String>```````````` firstEntry = THE_MAP.entrySet().stream().findFirst().get();
assertEquals("key one", firstEntry.getKey());
assertEquals("a1 b1 c1", firstEntry.getValue());
```

正如我们所看到的，**我们在 _entrySet()_ 结果上调用了 _stream()_ 方法以获取映射条目的流对象。**然后，_findFirst()_ 给我们提供了流中的第一个元素。值得注意的是，_findFirst()_ 方法返回一个 _Optional_ 对象。由于我们知道映射不会为空，我们直接调用 _get()_ 方法从 _Optional_ 对象中检索映射条目。

有多种方法可以从流实例中获取最后一个元素。例如，我们可以使用 _skip()_ 函数来解决问题：

```java
Entry````````````<String, String>```````````` lastEntry = THE_MAP.entrySet().stream().skip(THE_MAP.size() - 1).findFirst().get();

assertNotNull(lastEntry);
assertEquals("key four", lastEntry.getKey());
assertEquals("a4 b4 c4", lastEntry.getValue());
```

_skip()_ 方法接受一个 _int_ 参数。顾名思义，**_skip(n)_ 返回一个流，丢弃原始流中的前 _n_ 个元素。**因此，我们传递 _THE_MAP.size() – 1_ 到 _skip()_ 方法以 **获得只包含最后一个元素的流，即 _THE_MAP_ 的最后一个条目。**

## 6. 使用反射API

直到Java 21，_LinkedHashMap_ 的实现维护了一个双向链表来保存键值条目。此外，**_head_ 和 _tail_ 变量引用了映射的第一个和最后一个条目：**

```java
/**
 * 双向链表的头部（最老的）。
 */
transient LinkedHashMap.Entry``<K,V>`` head;

/**
 * 双向链表的尾部（最新的）。
 */
transient LinkedHashMap.Entry``<K,V>`` tail;
```

因此，我们可以简单地读取这两个变量以获取所需的条目。然而，_head_ 和 _tail_ 并不是公共变量。所以，我们不能直接在 _java.util_ 包之外访问它们。

幸运的是，我们有一个强大的工具：Java反射API，它允许我们在运行时读取或写入类的属性。例如，我们可以使用反射来读取 _head_ 和 _tail_ 字段以获取映射的第一个和最后一个条目：

```java
Field head = THE_MAP.getClass().getDeclaredField("head");
head.setAccessible(true);
Entry````````````<String, String>```````````` firstEntry = (Entry````````````<String, String>````````````) head.get(THE_MAP);
assertEquals("key one", firstEntry.getKey());
assertEquals("a1 b1 c1", firstEntry.getValue());

Field tail = THE_MAP.getClass().getDeclaredField("tail");
tail.setAccessible(true);
Entry````````````<String, String>```````````` lastEntry = (Entry````````````<String, String>````````````) tail.get(THE_MAP);
assertEquals("key four", lastEntry.getKey());
assertEquals("a4 b4 c4", lastEntry.getValue());
```

我们应该注意，当我们在Java版本9或更高版本上运行上述测试时，测试会因以下错误消息而失败：

```java
java.lang.reflect.InaccessibleObjectException: Unable to make field transient java.util.LinkedHashMap$Entry
java.util.LinkedHashMap.head accessible: module java.base does not "opens java.util" to unnamed module ...
```

这是因为，**自版本9以来，Java引入了模块系统，合理地限制了反射API。**

为了解决反射非法访问问题，我们可以将“ _–add-opens java.base/java.util=ALL-UNNAMED_”添加到Java命令行中。**由于我们使用Apache Maven作为构建工具，我们可以将此选项添加到surefire-plugin配置中，以确保使用反射的测试在使用“ _mvn test_”时顺利运行：**

```xml
`<build>`
    `<plugins>`
        `<plugin>`
            `<groupId>`org.apache.maven.plugins`</groupId>`
            `<artifactId>`maven-surefire-plugin`</artifactId>`
            `<configuration>`
                `<argLine>`
                    --add-opens java.base/java.util=ALL-UNNAMED
                `</argLine>`
            `</configuration>`
        `</plugin>`
    `</plugins>`
`</build>`
```

另外，重要的是要记住这种方法依赖于 _LinkedHashMap_ 实现中存在“ _head_”和“ _tail_”字段。在Java未来版本中，如果这些字段被移除或重命名，这种解决方案可能不再有效。

## 7. 结论

在本文中，我们首先简要了解了 _LinkedHashMap_ 的关键特性。然后，我们深入实际示例，展示了从 _LinkedHashMap_ 中检索首和尾键值对的各种方法。

如往常一样，示例的完整源代码可在GitHub上获得。

[Baeldung Logo](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)[Gravatar Logo](https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&r=g)[Eric Martin](https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg)[Announcement Icon](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)[Baeldung REST API](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)[Baeldung REST API Icon](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK