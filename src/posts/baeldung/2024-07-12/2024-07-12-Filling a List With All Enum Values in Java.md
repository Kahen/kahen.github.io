---
date: 2022-04-01
category:
  - Java
  - Enums
tag:
  - Java
  - Enum
  - List
head:
  - - meta
    - name: keywords
      content: Java, Enum, List, Enum values, Arrays, EnumSet
------
# 在Java中将所有枚举值填充到列表

Java在1.5版本中引入了枚举（enum）。将常量定义为枚举可以使代码更易读，并允许编译时检查。

在这个快速教程中，让我们探讨如何获取一个包含枚举类型所有实例的列表。

### 2. 问题介绍

像往常一样，我们通过一个例子来理解问题。

首先，我们创建一个名为`MagicNumber`的枚举类型：

```java
enum MagicNumber {
    ONE, TWO, THREE, FOUR, FIVE
}
```

然后，我们的目标是获取一个填充了所有`MagicNumber`枚举实例的列表：

```java
List`````<MagicNumber>````` EXPECTED_LIST = Arrays.asList(ONE, TWO, THREE, FOUR, FIVE);
```

这里，我们使用`Arrays.asList()`方法从数组初始化列表。

接下来，我们将探索几种不同的方法来获得预期的结果。最后，为了简单起见，我们将使用单元测试断言来验证每种方法是否给出了期望的结果。

那么，接下来让我们看看它们是如何工作的。

### 3. 使用`EnumType.values()`方法

当我们准备`EXPECTED_LIST`时，我们从数组中初始化它。因此，如果我们能够以数组的形式获取枚举的所有实例，我们就可以构建列表并解决问题。

**每个枚举类型都提供了标准的`values()`方法来返回所有实例的数组**。所以接下来，让我们从`MagicNumber.values()`构建一个列表：

```java
List`````<MagicNumber>````` result = Arrays.asList(MagicNumber.values());
assertEquals(EXPECTED_LIST, result);
```

如果我们运行测试，它会通过。所以，我们已经得到了预期的列表。

### 4. 使用`EnumType.class.getEnumConstants()`方法

我们已经看到了使用枚举类型的`values()`来获取所有枚举实例的数组，这是一种标准且直接的方法。然而，我们需要确切知道枚举类型的名称，并在代码中硬编码，例如`MagicNumber.values()`。换句话说，这样我们就不能构建一个适用于所有枚举类型的工具方法。

自Java 1.5以来，**类对象提供了`getEnumConstants()`方法来从枚举类对象中获取所有枚举实例**。因此，我们可以让`getEnumConstants()`提供枚举实例：

```java
List`````<MagicNumber>````` result = Arrays.asList(MagicNumber.class.getEnumConstants());
assertEquals(EXPECTED_LIST, result);
```

正如上述测试所示，我们使用`MagicNumber.class.getEnumConstants()`来提供枚举实例数组。此外，它很容易构建一个适用于所有枚举类型的工具方法：

```java
static ```<T>``` List```<T>``` enumValuesInList(Class```<T>``` enumCls) {
    T[] arr = enumCls.getEnumConstants();
    return arr == null ? Collections.emptyList() : Arrays.asList(arr);
}
```

值得一提的是，**如果类对象不是枚举类型，`getEnumConstants()`方法返回`null`**。正如我们所看到的，我们在这种情况下返回一个空的列表。

接下来，让我们创建一个测试来验证`enumValuesInList()`：

```java
List`````<MagicNumber>````` result1 = enumValuesInList(MagicNumber.class);
assertEquals(EXPECTED_LIST, result1);

List`<Integer>` result2 = enumValuesInList(Integer.class);
assertTrue(result2.isEmpty());
```

如果我们运行测试，它会通过。正如我们所看到的，如果类对象不是枚举类型，我们有一个空的列表。

### 5. 使用`EnumSet.allOf()`方法

自1.5版本以来，Java引入了一种特殊的`Set`来与枚举类一起工作：`EnumSet`。进一步地，**`EnumSet`有`allOf()`方法来加载给定枚举类型的所有实例**。

因此，我们可以使用`ArrayList()`构造函数和填充的`EnumSet`来构建一个`List`对象。接下来，让我们通过一个测试来看看它是如何工作的：

```java
List`````<MagicNumber>````` result = new ArrayList<>(EnumSet.allOf(MagicNumber.class));
assertEquals(EXPECTED_LIST, result);
```

值得一提的是，**调用`allOf()`方法会按照自然顺序存储枚举的实例**。

### 6. 结论

在这篇文章中，我们学习了三种获取包含所有枚举实例的`List`对象的方法。

像往常一样，这里展示的所有代码片段都可以在GitHub上找到。