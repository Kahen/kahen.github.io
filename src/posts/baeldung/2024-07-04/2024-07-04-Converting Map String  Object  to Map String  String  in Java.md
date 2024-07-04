---
date: 2022-04-01
category:
  - Java
  - Collections
tag:
  - Java
  - Map
  - Conversion
head:
  - - meta
    - name: keywords
      content: Java, Map, Conversion, Collections
---
# Java中将Map`````````<String, Object>`````````转换为Map``````````````````<String, String>``````````````````

我们经常在Java中使用诸如Map这样的集合来存储键值对。

在这个快速教程中，我们将探讨如何将`Map`````````<String, Object>``````````转换为`Map``````````````````<String, String>```````````````````。

## 2. 问题介绍

首先，让我们创建一个`Map`````````<String, Object>``````````：

```java
static final Map`````````<String, Object>````````` MAP1 = Maps.newHashMap();

static {
    MAP1.put("K01", "GNU Linux");
    MAP1.put("K02", "Mac OS");
    MAP1.put("K03", "MS Windows");
}
```

所以，如果我们将其转换为`Map``````````````````<String, String>```````````````````，结果应该如下所示：

```java
static final Map``````````````````<String, String>`````````````````` EXPECTED_MAP1 = Maps.newHashMap();

static {
    EXPECTED_MAP1.put("K01", "GNU Linux");
    EXPECTED_MAP1.put("K02", "Mac OS");
    EXPECTED_MAP1.put("K03", "MS Windows");
}
```

使用`HashMap(Map`<? extends K, ? extends V>` m)`构造函数可能是完成转换的第一个想法。让我们尝试一下：

```java
Map``````````````````<String, String>`````````````````` result = new HashMap``````````````````<String, String>``````````````````(MAP1);
```

不幸的是，上面的代码**无法编译**：

```java
no suitable constructor found for HashMap(java.util.Map`<java.lang.String,java.lang.Object>`)
```

在这个教程中，我们将讨论解决这个问题的不同方法。

正如我们所看到的，尽管`MAP1`的类型是`Map`````````<String, Object>``````````，所有条目的值都是字符串。由于值的类型参数是`Object`，**我们的输入映射可能包含值不是字符串的条目**：

```java
static final Map`````````<String, Object>````````` MAP2 = Maps.newHashMap();

static {
    MAP2.put("K01", "GNU Linux");
    MAP2.put("K02", "Mac OS");
    MAP2.put("K03", BigDecimal.ONE); // 值不是字符串
}
```

我们也将涵盖这种转换场景。

为了简单起见，我们将使用`MAP1`和`MAP2`作为输入，并使用单元测试断言来验证每种解决方案是否按预期工作。

## 3. 强制转换为Map（不安全）

泛型是编译时的特性。**在运行时，所有类型参数都被擦除，所有映射都具有相同的类型`Map`<Object, Object>``**。因此，我们可以将`MAP1`强制转换为原始的`Map`并将其赋值给`Map``````````````````<String, String>```````````````````变量：

```java
Map``````````````````<String, String>`````````````````` result = (Map) MAP1;
assertEquals(EXPECTED_MAP1, result);
```

这个技巧有效，尽管**在编译时有一个“Unchecked Conversion”警告**。

然而，这并不安全。例如，**如果某个条目的值不是字符串，这种方法会隐藏问题**：

```java
Map``````````````````<String, String>`````````````````` result2 = (Map) MAP2;
assertFalse(result2.get("K03") instanceof String);
```

正如上面的测试所示，尽管`result2`的类型是`Map``````````````````<String, String>```````````````````，映射中的一个值不是字符串。这可能导致后续流程中出现意外问题。

接下来，让我们看看如何实现安全转换。

## 4. 创建checkAndTransform()方法

我们可以构建一个`checkAndTransform()`方法来进行安全转换：

```java
Map``````````````````<String, String>`````````````````` checkAndTransform(Map`````````<String, Object>````````` inputMap) {
    Map``````````````````<String, String>`````````````````` result = new HashMap<>();
    for (Map.Entry`````````<String, Object>````````` entry : inputMap.entrySet()) {
        try {
            result.put(entry.getKey(), (String) entry.getValue());
        } catch (ClassCastException e) {
            throw e; // 或者所需的错误处理
        }
    }
    return result;
}
```

如上述方法所示，**我们遍历输入映射中的条目，将每个条目的值强制转换为`String`，并将键值对放入新的`Map``````````````````<String, String>```````````````````**。

让我们用我们的`MAP1`测试它：

```java
Map``````````````````<String, String>`````````````````` result = checkAndTransform(MAP1);
assertEquals(EXPECTED_MAP1, result);
```

此外，一旦输入映射包含一些无法强制转换为`String`的值，就会抛出`ClassCastException`。让我们将`MAP2`传递给该方法进行测试：

```java
assertThrows(ClassCastException.class, () -> checkAndTransform(MAP2));
```

为了简单，在`catch`块中，我们**抛出**异常。根据要求，我们可以在捕获`ClassCastException`之后采用适当的错误处理过程。

## 5. 将所有值转换为字符串

有时，我们不想在映射包含无法强制转换为`String`的值时捕获任何异常。**相反，对于那些“非字符串”值，我们希望使用对象的`String`表示作为值**。例如，我们想将`MAP2`转换为此映射：

```java
static final Map``````````````````<String, String>`````````````````` EXPECTED_MAP2_STRING_VALUES = Maps.newHashMap();

static {
    EXPECTED_MAP2_STRING_VALUES.put("K01", "GNU Linux");
    EXPECTED_MAP2_STRING_VALUES.put("K02", "Mac OS");
    EXPECTED_MAP2_STRING_VALUES.put("K03", "1"); // BigDecimal.ONE的字符串表示
}
```

让我们使用Stream API来实现它：

```java
Map``````````````````<String, String>`````````````````` result = MAP1.entrySet()
  .stream()
  .collect(toMap(Map.Entry::getKey, e -> String.valueOf(e.getValue())));

assertEquals(EXPECTED_MAP1, result);

Map``````````````````<String, String>`````````````````` result2 = MAP2.entrySet()
  .stream()
  .collect(toMap(Map.Entry::getKey, e -> String.valueOf(e.getValue())));

assertEquals(EXPECTED_MAP2_STRING_VALUES, result2);
```

值得一提的是，**我们使用了`String.valueOf()`而不是`e.toString()`来避免潜在的`NullPointerException`**。

## 6. 结论

在本文中，我们学习了将`Map`````````<String, Object>``````````转换为`Map``````````````````<String, String>```````````````````的不同方法。

我们还讨论了输入映射包含非字符串值的场景。

像往常一样，这里呈现的所有代码片段都可以在GitHub上找到。