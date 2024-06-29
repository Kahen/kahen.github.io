---
date: 2022-04-01
category:
  - Java
  - Collection
tag:
  - putIfAbsent
  - computeIfAbsent
head:
  - - meta
    - name: keywords
      content: Java, Map, putIfAbsent, computeIfAbsent
---
# Java中Map的putIfAbsent()与computeIfAbsent()的区别 | Baeldung

## 1. 概述

_Map_是一种常用的数据结构，包含键值对关联。Java提供了多种方法来操作映射条目。自Java 8以来，一些新成员加入了_Map_家族。

_putIfAbsent()_和_computeIfAbsent()_是其中的两个。我们经常使用这两种方法来添加条目。尽管它们乍一看可能很相似，但它们具有不同的行为和用例。

在本教程中，我们将讨论这两种方法之间的区别。

## 2. 引言

在深入讨论这两种方法的区别之前，让我们建立一些共同基础。

_putIfAbsent()_和_computeIfAbsent()_都是Java中_Map_接口提供的方法，它们共享一个共同目标：**如果键不存在，则向映射中添加一个键值对。**当我们要防止覆盖现有条目时，这种行为特别有用。

值得注意的是，“**不存在**”涵盖了两种情况：

- 键在映射中不存在
- 键存在，但关联的值是_null_

然而，这两种方法的行为并不相同。

在本教程中，我们不会讨论这两种方法的一般用法。相反，我们将只关注它们的区别，并从三个角度来查看它们的差异。

此外，我们将使用单元测试断言来演示这些差异。那么接下来，让我们快速设置我们的测试示例。

## 3. 准备

由于我们将调用_putIfAbsent()_和_computeIfAbsent()_来向映射中插入条目，让我们首先为所有测试创建一个_HashMap_实例：

```java
private static final Map`<String, String>` MY_MAP = new HashMap<>();

@BeforeEach
void resetTheMap() {
    MY_MAP.clear();
    MY_MAP.put("Key A", "value A");
    MY_MAP.put("Key B", "value B");
    MY_MAP.put("Key C", "value C");
    MY_MAP.put("Key Null", null);
}
```

正如我们所看到的，**我们还创建了带有_@BeforeEach_注解的_resetTheMap()_方法。此方法确保MY_MAP对于每个测试都包含相同的键值对。**

如果我们查看_computeIfAbsent()_的签名，我们可以看到该方法接受_mappingFunction_函数来计算新值：

```java
default V computeIfAbsent(K key, Function`<? super K, ? extends V>` mappingFunction) { ... }
```

因此，让我们创建_Magic_类来提供一些函数：

```java
private Magic magic = new Magic();
```

_Magic_类非常简单。它只提供两个方法：**_nullFunc()_总是返回_null_，而_strFunc()_返回一个非空字符串。**

```java
class Magic {
    public String nullFunc() {
        return null;
    }

    public String strFunc(String input) {
        return input + ": A nice string";
    }
}
```

为了公平起见，在测试中，所有在_putIfAbsent()_和_computeIfAbsent()_中使用的新的映射值都来自_magic_的方法。

## 4. 当键不存在时的返回值

这两种方法的共同部分是“_IfAbsent_”。我们已经讨论了“不存在”的定义。第一个区别是这两种方法在“不存在”的情况下的返回值。

让我们首先看看_putIfAbsent()_方法：

```java
// 不存在：放置新键 -> null
String putResult = MY_MAP.putIfAbsent("new key1", magic.nullFunc());
assertNull(putResult);

// 不存在：放置新键 -> 非空
putResult = MY_MAP.putIfAbsent("new key2", magic.strFunc("new key2"));
assertNull(putResult);

// 不存在：现有键 -> 空（原始）
putResult = MY_MAP.putIfAbsent("Key Null", magic.strFunc("Key Null"));
assertNull(putResult);
```

从上述测试中，我们可以看到**当不存在时，_putIfAbsent()_方法总是返回_null_，无论新值是否为空。**

接下来，让我们执行相同的测试与_computeIfAbsent()_并看看它返回什么：

```java
// 不存在：计算新键 -> 空
String computeResult = MY_MAP.computeIfAbsent("new key1", k -> magic.nullFunc());
assertNull(computeResult);

// 不存在：计算新键 -> 非空
computeResult = MY_MAP.computeIfAbsent("new key2", k -> magic.strFunc(k));
assertEquals("new key2: A nice string", computeResult);

// 不存在：现有键 -> 空（原始）
computeResult = MY_MAP.computeIfAbsent("Key Null", k -> magic.strFunc(k));
assertEquals("Key Null: A nice string", computeResult);
```

正如测试所示，**当不存在时，_computeIfAbsent()_方法返回_mappingFunction_的返回值。**

## 5. 当新值是_null_时

我们知道_HashMap_允许空值。那么接下来，让我们尝试向_MY_MAP_插入一个_null_值，并看看这两种方法的行为。

首先，让我们看看_putIfAbsent()_：

```java
assertEquals(4, MY_MAP.size()); // 初始：4个条目
MY_MAP.putIfAbsent("new key", magic.nullFunc());
assertEquals(5, MY_MAP.size());
assertTrue(MY_MAP.containsKey("new key")); // 新条目已添加到映射中
assertNull(MY_MAP.get("new key"));
```

所以，**当键在目标映射中不存在时，_putIfAbsent()_将始终向映射中添加一个新的键值对，即使新值是_null_。**

现在轮到_computeIfAbsent()_了：

```java
assertEquals(4, MY_MAP.size()); // 初始：4个条目
MY_MAP.computeIfAbsent("new key", k -> magic.nullFunc());

assertEquals(4, MY_MAP.size());
assertFalse(MY_MAP.containsKey("new key")); // `<- 没有新条目添加到映射中
```

正如我们所看到的，**如果_mappingFunction_返回_null，computeIfAbsent()_拒绝将键值对添加到映射中。**

## 6. “_compute_”是懒惰的，“_put_”是急切的

我们已经讨论了这两种方法之间的两个区别。接下来，让我们看看当“_value_”部分由方法或函数提供时，这两种方法的行为是否相同。

像往常一样，让我们首先看看_putIfAbsent()_方法：

```java
Magic spyMagic = spy(magic);
// 键存在
MY_MAP.putIfAbsent("Key A", spyMagic.strFunc("Key A"));
verify(spyMagic, times(1)).strFunc(anyString());

// 键不存在
MY_MAP.putIfAbsent("new key", spyMagic.strFunc("new key"));
verify(spyMagic, times(2)).strFunc(anyString());
```

正如上面的测试所示，**我们使用Mockito _spy_对_magic_对象进行了测试**，以验证是否调用了_strFunc()_方法。测试结果显示，**无论键是否存在，_strFunc()_方法总是被调用。**

接下来，让我们看看_computeIfAbsent()_如何处理_mappingFunction_：

```java
Magic spyMagic = spy(magic);
// 键存在
MY_MAP.computeIfAbsent("Key A", k ->` spyMagic.strFunc(k));
verify(spyMagic, never()).strFunc(anyString()); // 函数没有被调用

// 键不存在
MY_MAP.computeIfAbsent("new key", k -> spyMagic.strFunc(k));
verify(spyMagic, times(1)).strFunc(anyString());
```

正如测试所示，**_computeIfAbsent()_正如其名，仅在“不存在”的情况下计算_mappingFunction_。**

另一个日常用例是当我们使用类似_Map`<String, List<String>`>_的东西时：

- _putIfAbsent(aKey, new ArrayList()) –_ 无论“aKey”是否存在，都会创建一个新的_ArrayList_对象
- _computeIfAbsent(aKey, k -> new ArrayList()) –_ 只有在“aKey”不存在时才会创建一个新的_ArrayList_实例

因此，**我们应该使用_putIfAbsent()_在键不存在时直接添加键值对，而不需要任何计算。**另一方面，**_computeIfAbsent()_可以在我们需要计算值并在键不存在时添加键值对时使用。**

## 7. 结论

在本文中，我们通过示例讨论了_putIfAbsent()_和_computeIfAbsent()_之间的区别。了解这种区别对于在我们的代码中做出正确的选择至关重要。

像往常一样，示例的完整源代码可在GitHub上找到。翻译已经结束，以下是文章的剩余部分：

## 7. 结论

在这篇文章中，我们通过示例讨论了_putIfAbsent()_和_computeIfAbsent()_之间的区别。了解这些差异对于在代码中做出正确的选择至关重要。

如往常一样，示例的完整源代码可以在GitHub上找到。

[Baeldung](https://www.baeldung.com) 的文章通常提供源代码和示例，以帮助读者更好地理解概念。如果你对Java中的Map操作有任何疑问，或者想要了解更多关于_putIfAbsent()_和_computeIfAbsent()_的使用场景，请访问他们的网站。

OK。