---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Java
  - String Array
  - int Array
head:
  - - meta
    - name: keywords
      content: Java, String Array, int Array, Conversion, Tutorial
------
# Java中将字符串数组转换为整数数组

## 1. 概述

在本快速教程中，我们将探讨如何在Java中将字符串数组转换为整数数组。

## 2. 问题介绍

首先，让我们看一个字符串数组的例子：

```java
String[] stringArray = new String[] { "1", "2", "3", "4", "5", "6", "42" };
```

我们创建了一个包含七个字符串的`stringArray`。现在，我们需要将`stringArray`转换为一个整数数组：

```java
int[] expected = new int[] { 1, 2, 3, 4, 5, 6, 42 };
```

如上例所示，需求相当直接。然而，在现实世界中，字符串数组可能来自不同的来源，例如用户输入或另一个系统。因此，输入数组可能包含一些不是有效数字格式的值，例如：

```java
String[] stringArrayWithInvalidNum = new String[] { "1", "2", "hello", "4", "world", "6", "42" };
```

元素`"hello"`和`"world"`不是有效的数字，尽管其他的是。通常，在实际项目中检测到这些类型的值时，我们会遵循特殊的错误处理规则——例如，中止数组转换，采用特定的整数作为回退，等等。

在本教程中，**我们将使用Java的最小整数作为无效字符串元素的回退**：

```java
int[] expectedWithInvalidInput = new int[] { 1, 2, Integer.MIN_VALUE, 4, Integer.MIN_VALUE, 6, 42 };
```

接下来，让我们从具有所有有效元素的字符串数组开始，然后扩展解决方案以包含错误处理逻辑。

为了简单起见，我们将使用单元测试断言来验证我们的解决方案是否按预期工作。

## 3. 使用Stream API

首先，让我们使用Stream API转换具有所有有效元素的字符串数组：

```java
int[] result = Arrays.stream(stringArray).mapToInt(Integer::parseInt).toArray();
assertArrayEquals(expected, result);
```

如我们所见，`Arrays.stream()`方法将输入的字符串数组转换为`Stream`。然后，**`mapToInt()`中间操作将我们的流转换为`IntStream`对象**。

我们使用`Integer.parseInt()`将字符串转换为整数。最后，`toArray()`将`IntStream`对象转换回数组。

那么，接下来，让我们看看无效数字格式元素的场景。

**假设输入字符串的格式不是有效的数字，在这种情况下，`Integer.parseInt()`方法会抛出** `NumberFormatException`。

因此，我们需要将`mapToInt()`方法中的`Integer::parseInt`方法引用替换为lambda表达式，并在lambda表达式中处理`NumberFormatException`异常：

```java
int[] result = Arrays.stream(stringArrayWithInvalidNum).mapToInt(s -> {
    try {
        return Integer.parseInt(s);
    } catch (NumberFormatException ex) {
        // logging ...
        return Integer.MIN_VALUE;
    }
}).toArray();

assertArrayEquals(expectedWithInvalidInput, result);
```

然后，如果我们运行测试，它会通过。

如上述代码所示，我们只改变了`mapToInt()`方法中的实现。

值得一提的是，**Java Stream API在Java 8及更高版本中可用**。

## 4. 在循环中实现转换

我们已经了解了Stream API如何解决这个问题。然而，如果我们使用的是较旧的Java版本，我们需要以不同的方式解决问题。

现在我们知道`Integer.parseInt()`完成了主要的转换工作，**我们可以循环遍历数组中的元素，并在每个字符串元素上调用`Integer.parseInt()`方法**：

```java
int[] result = new int[stringArray.length];
for (int i = 0; i < stringArray.length; i++) {
    result[i] = Integer.parseInt(stringArray[i]);
}

assertArrayEquals(expected, result);
```

如上述实现所示，我们首先创建一个与输入字符串数组长度相同的整数数组。然后，在_for_循环中执行转换并填充结果数组。

接下来，让我们扩展实现以添加错误处理逻辑。类似于Stream API方法，只需**将转换行包装在_try-catch_块中就可以解决问题**：

```java
int[] result = new int[stringArrayWithInvalidNum.length];
for (int i = 0; i < stringArrayWithInvalidNum.length; i++) {
    try {
        result[i] = Integer.parseInt(stringArrayWithInvalidNum[i]);
    } catch (NumberFormatException exception) {
        // logging ...
        result[i] = Integer.MIN_VALUE;
    }
}

assertArrayEquals(expectedWithInvalidInput, result);
```

如果我们运行测试，它会通过。

## 5. 结论

在本文中，我们通过示例学习了两种将字符串数组转换为整数数组的方法。此外，我们还讨论了当字符串数组包含无效数字格式时的转换处理。

如果我们的Java版本是8或更高版本，Stream API将是解决问题的最直接解决方案。否则，我们可以循环遍历字符串数组并将每个字符串元素转换为整数。

像往常一样，本文中呈现的所有代码片段都在GitHub上可用。