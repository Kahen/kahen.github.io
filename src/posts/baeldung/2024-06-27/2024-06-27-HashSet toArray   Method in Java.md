---
date: 2024-06-27
category:
  - Java
  - Collections
tag:
  - HashSet
  - toArray
head:
  - - meta
    - name: keywords
      content: Java, HashSet, toArray, Baeldung
---
# Java中HashSet的toArray()方法 | Baeldung

## 1. 引言

_HashSet_ 是我们可以在Java _Collections_ 中使用的一种常见数据结构。

**在本教程中，我们将深入探讨_HashSet_类的_toArray()_方法，展示如何将_HashSet_转换为数组。**

## 2. 将_HashSet_转换为_数组_

让我们看一组示例，说明如何应用_toArray()_方法将_HashSet_转换为数组。

### 2.1. _HashSet_转换为_字符串数组_

在以下方法中，我们试图将字符串的_HashSet_转换为字符串数组：

```
@Test
public void givenStringHashSet_whenConvertedToArray_thenArrayContainsStringElements() {
    HashSet`<String>` stringSet = new HashSet<>();
    stringSet.add("Apple");
    stringSet.add("Banana");
    stringSet.add("Cherry");

    // 将字符串HashSet转换为字符串数组
    String[] stringArray = stringSet.toArray(new String[0]);

    // 测试数组的长度是否正确
    assertEquals(3, stringArray.length);

    for (String str : stringArray) {
        assertTrue(stringSet.contains(str));
    }
}
```

这里，初始化了一个名为_stringSet_的_HashSet_，包含三个_String_元素：（"Apple"、"Banana"和"Cherry"）。具体来说，测试方法确保结果数组的长度为3，与_HashSet_中的元素数量相匹配。

**然后，它遍历_stringArray_并检查每个元素是否包含在原始_stringSet_中，断言数组确实包含_String_元素，确认_HashSet_成功转换为字符串数组。**

### 2.2. _HashSet_转换为_整数数组_

此外，我们可以使用_ toArray()_方法将_整数HashSet_转换为整数数组，如下所示：

```
@Test
public void givenIntegerHashSet_whenConvertedToArray_thenArrayContainsIntegerElements() {
    HashSet`<Integer>` integerSet = new HashSet<>();
    integerSet.add(5);
    integerSet.add(10);
    integerSet.add(15);

    // 将整数HashSet转换为整数数组
    Integer[] integerArray = integerSet.toArray(new Integer[0]);

    // 测试数组的长度是否正确
    assertEquals(3, integerArray.length);

    for (Integer num : integerArray) {
        assertTrue(integerSet.contains(num));
    }

    assertTrue(integerSet.contains(5));
    assertTrue(integerSet.contains(10));
    assertTrue(integerSet.contains(15));
}
```

这里，我们创建了一个名为_integerSet_的_HashSet_，包含三个整数元素：(5、10和15)。测试方法负责验证这个整数_HashSet_转换为整数数组，称为_integerArray_。

**此外，它确认结果数组的长度=3，对应于原始_HashSet_中的元素数量。随后，方法遍历_integerArray_，确保每个元素都包含在原始_integerSet_中。**

## 3. 结论

总之，使用_HashSet_类的_toArray()_方法将_HashSet_转换为数组是很容易的。这在处理基于数组的数据结构或我们Java应用程序中的其他组件时也可能很有用。

如常，本文的完整代码示例可以在GitHub上找到。