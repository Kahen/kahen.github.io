---
date: 2022-04-01
category:
  - Java
  - ArrayList
tag:
  - Java
  - ArrayList
  - String Array
head:
  - - meta
    - name: keywords
      content: Java, ArrayList, String Array, Conversion
------
# Java中将字符串ArrayList转换为字符串数组

在Java中，数据操作经常涉及到将数据结构从一种形式转换为另一种形式。一个常见的任务是将字符串ArrayList转换为字符串数组。

在本教程中，我们将探讨如何使用Java内置的方法和技术无缝完成这种转换。

### 2. 问题介绍

一个示例可以帮助我们快速理解问题。假设我们有以下ArrayList，其中包含一些艺术家的名字：

```java
static final List``<String>`` INPUT_LIST = Lists.newArrayList("Michael Bolton", "Michael Jackson", "Guns and Roses", "Bryan Adams", "Air Supply");
```

现在，我们想要将这个ArrayList转换为一个包含相同艺术家名字的字符串数组，顺序相同：

```java
static final String[] EXPECTED_ARRAY = new String[] { "Michael Bolton", "Michael Jackson", "Guns and Roses", "Bryan Adams", "Air Supply" };
```

这看起来是一个简单的任务，因为Java标准库提供了Collection.toArray()方法来将集合转换为数组。toArray()方法返回一个Object[]数组。由于列表的类型是List``<String>``，所有元素都是字符串。所以我们可能认为将对象数组转换为String[]是安全的：

```java
String[] result = (String[]) INPUT_LIST.toArray();
```

如果我们运行这行代码，我们可以看到这样的输出：

```java
java.lang.ClassCastException: class [Ljava.lang.Object; cannot be cast to class [Ljava.lang.String;
```

正如我们所看到的，抛出了ClassCastException。这是因为Java的泛型类型只在编译时存在。也就是说，在运行时，toArray()方法返回的数组不知道其元素的具体类型。它们可能是String、Integer，甚至是由于Object类是所有其他类型的超类，所以可能由不同类型混合而成。因此，Java抛出ClassCastException并拒绝Object[]到String[]的转换。

接下来，让我们看看将字符串ArrayList转换为字符串数组的正确方法。为了简单起见，我们将使用单元测试断言来验证每种方法是否返回预期的结果。

### 3. 在循环中填充预先声明的字符串数组

解决我们问题的直接方法是遍历字符串ArrayList，取出每个元素，并填充一个预先声明的字符串数组。接下来，让我们实现它：

```java
String[] result = new String[INPUT_LIST.size()];
for (int i = 0; i `< INPUT_LIST.size(); i++) {
    result[i] = INPUT_LIST.get(i);
}
assertArrayEquals(EXPECTED_ARRAY, result);
```

在上面的实现中，我们首先声明了一个字符串数组，其长度与给定ArrayList的大小相同。然后，在for循环中填充数组。

### 4. 使用toArray(T[] a)方法

我们之前在使用Collection.toArray()方法时遇到了ClassCastException。Collection接口还定义了另一个带有参数T[] a的toArray()方法：

```java
<T>` T[] toArray(T[] a);
```

方法签名显示该方法返回T[]而不是Object[]。接下来，让我们看看如何使用它：

```java
String[] result = new String[INPUT_LIST.size()];
INPUT_LIST.toArray(result);
assertArrayEquals(EXPECTED_ARRAY, result);
```

正如上面的代码所示，我们创建了一个新的字符串数组，其大小足以容纳列表中的元素。因此，在将其传递给toArray()之后，数组被列表中的元素填充。

然而，如果我们传递给toArray()的字符串数组没有足够的空间来容纳列表中的元素，我们将从toArray()得到一个新的数组：

```java
String[] result2 = INPUT_LIST.toArray(new String[0]);
assertArrayEquals(EXPECTED_ARRAY, result2);
```

### 5. 使用Stream API

假设我们使用Java 8或更高版本。我们还可以使用Stream API来解决这个问题：

```java
String[] result = INPUT_LIST.stream()
  .toArray(String[]::new);
assertArrayEquals(EXPECTED_ARRAY, result);
```

Stream的toArray()方法接受一个生成器函数，该函数在所需的类型中分配返回的数组。在这种情况下，我们可以简单地取String[]的构造函数作为方法引用，并将其作为函数传递给toArray()。

### 6. Java 11+

最后，如果我们使用Java 11或更高版本，我们可以直接调用Collection.toArray(generatorFunc)来获取转换后的数组，而无需先将列表转换为Stream：

```java
String[] result = INPUT_LIST.toArray(String[]::new);
assertArrayEquals(EXPECTED_ARRAY, result);
```

### 7. 结论

在本文中，我们首先讨论了为什么(String[])myList.toArray()会抛出ClassCastException。然后，我们通过示例学习了将String ArrayList转换为String数组的不同方法。

如往常一样，示例的完整源代码可在GitHub上找到。