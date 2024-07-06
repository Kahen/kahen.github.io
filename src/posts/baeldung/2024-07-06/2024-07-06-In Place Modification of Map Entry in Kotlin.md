---
date: 2022-11-01
category:
  - Kotlin
  - Programming
tag:
  - Map
  - MutableMap
  - Kotlin
head:
  - - meta
    - name: keywords
      content: Kotlin, Map, MutableMap, put, replace, compute, computeIfPresent
---
# 在Kotlin中就地修改Map条目的方法

作为开发者，我们知道Map是一种重要的数据结构，我们可以用它来完成许多编程任务。一个典型的例子可能包括就地修改Map条目。

在本教程中，我们将探索在Kotlin中就地更改或修改Map条目的各种方法。

### 使用_MutableMap_接口
就地修改Map条目的最简单方法是使用_MutableMap_接口。这个接口扩展了_Map_接口，并提供了额外的方法来修改Map。

#### 2.1. 使用_put()_方法
**要修改Map条目，我们可以使用_put()_方法，该方法替换与指定键关联的值**：

```kotlin
@Test
fun `使用put方法修改可变Map条目`() {
    val map = mutableMapOf("key1" to "value1", "key2" to "value2")
    map.put("key1", "new value")

    assertEquals("new value", map["key1"])
}
```

在这段代码中，我们使用_mutableMapOf()_方法构建一个包含两个条目的Map。接下来，我们使用_put()_方法修改与_key1_关联的值。**实际上，我们经常使用这种方法向Map添加条目，但是，当我们使用这个方法与现有键一起使用时，相应的值将被覆盖**。最后，使用断言，我们可以确认_key1_与更新后的值相关联。

#### 2.2. 使用括号运算符
Kotlin提供了括号运算符，这是_set()_方法的运算符重载。我们可以使用这种方法添加和修改Map条目。具体来说，我们可以使用它就地修改Map条目：

```kotlin
@Test
fun `使用括号运算符修改可变Map条目`() {
    val map = mutableMapOf("key1" to "value1", "key2" to "value2")
    map["key1"] = "new value"

    assertEquals("new value", map["key1"])
}
```

在上面的代码中，我们使用_括号_运算符修改与_key1_键关联的值。

这种技术是前面方法的简化版本，使用括号运算符代替_put()_方法。

### 使用_replace()_方法
此外，我们可以利用_replace()_方法替换Map中与键关联的值。这个方法接受两个参数：键和新值。如果键在Map中存在，值将被覆盖。**如果键不存在，这个方法将没有效果**：

```kotlin
@Test
fun `使用replace方法修改可变Map条目`() {
    val map = mutableMapOf("key1" to "value1", "key2" to "value2")
    map.replace("key1", "new value")

    assertEquals("new value", map["key1"])
}
```

在上面的单元测试中，我们使用_replace()_方法修改与_key1_键关联的值。最后，我们使用_assertEquals()_方法确保与_key1_键关联的值已正确更新。

### 使用_compute()_方法
另一种更新_Map_中的值的方法是使用_compute()_方法。**_compute()_方法也接受两个参数：键和一个lambda函数**。原则上，这会根据lambda函数更新与键关联的值：

```kotlin
@Test
fun `使用compute方法修改可变Map条目`() {
    val map = mutableMapOf("key1" to "value1", "key2" to "value2")
    map.compute("key1") { _, _ -> "new value" }

    assertEquals("new value", map["key1"])
}
```

在上面的代码中，我们使用_key1_键和lambda表达式调用_compute()_方法。lambda函数接受两个参数——键和与键关联的当前值。我们不使用lambda参数，所以我们用下划线替换它们，表示它们是未使用的。如果键不在Map中，lambda函数将接收_null_作为当前值。

lambda函数返回字符串“new value”，这是应该与_key1_键关联的新值。**然后_compute()_方法使用lambda函数返回的新值更新与_key1_键关联的值**。

值得一提的是，_compute()_方法用lambda函数返回的新值替换与键关联的当前值，无论键是否在Map中。

### 4.1. 使用_computeIfPresent()_方法
或者，我们可以使用_computeIfPresent()_方法在_Map_中更新值。这个方法也接受键作为参数和一个**lambda函数来有条件地更新值**：

```kotlin
@Test
fun `使用computeIfPresent方法修改可变Map条目`() {
    val map = mutableMapOf("key1" to "value1", "key2" to "value2")
    map.computeIfPresent("key1") { key, value ->
        if (value == "value1") "new value"
        else value
    }

    assertEquals("new value", map["key1"])
}
```

我们希望更新与_key1_键关联的值，所以我们使用_computeIfPresent()_方法并提供键作为参数。此外，如果与键关联的值是_“value1”_，lambda函数将更新值为“new value”。否则，lambda将返回现有值。

_computeIfPresent()_方法仅在键已经在Map中时更新值。**如果键不在Map中，lambda函数不会被调用，方法也没有效果**。

## 结论
在本文中，我们探索了在Kotlin中执行Map条目就地修改的多种方法。我们使用了_put()_、_replace()_、_compute()_和_computeIfPresent()_方法以及赋值运算符技术，根据我们的需求修改Map条目。

正如往常一样，本文中使用的代码可以在GitHub上找到。