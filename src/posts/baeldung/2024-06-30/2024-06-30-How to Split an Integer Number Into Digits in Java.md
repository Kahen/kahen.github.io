---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Java
  - Integer
  - Digits
head:
  - - meta
    - name: keywords
      content: Java, Integer, Digits, Split
---
# 如何在Java中将整数拆分成单个数字 | Baeldung

## 1. 概述

在Java中处理整数时，有时我们需要将它们拆分成单独的数字以进行各种计算或数据操作任务。

在本教程中，我们将探索使用Java将整数拆分成其构成数字的各种方法。

## 2. 问题介绍

像往常一样，让我们通过一个例子来理解问题。假设我们有一个整数：

```
int THE_NUMBER = 1230456;
```

我们的目标是按顺序将数字拆分成：

```
1, 2, 3, 0, 4, 5, 6
```

为简单起见，**本教程将主要集中在正十进制整数上**。然而，根据具体需求，我们可能希望以_Integer_、_char_或_String_的形式获取每个数字。

接下来，让我们探索各种方法来适应这些不同的返回类型。

## 3. 拆分成_Integer_列表

首先，让我们将给定的整数拆分成_Integer_的列表。也就是说，我们的目标是得到这个列表：

```
List`````<Integer>````` EXPECTED_INT_LIST = Lists.newArrayList(1, 2, 3, 0, 4, 5, 6);
```

最直接的方法之一是**使用循环反复将数字除以10，每次迭代提取余数，直到数字变为零**：

```
      1230456 / 10 = 123045 余数：6
  |-> 123045 / 10 = 12304 余数：5
  |-> 12304 / 10 = 1230 余数：4
  |-> 1230 / 10 = 123 余数：0
  |-> 123 / 10 = 12 余数：3
  |-> 12 / 10 = 1 余数：2
  |-> 1 / 10 = 0 余数：1
```

然而，正如上面的例子所示，**这种方法生成的数字顺序是相反的**。为了解决这个问题，**我们可以使用_LinkedList_作为一个栈**并在每一步中将余数_push()_到栈上：

```
int number = THE_NUMBER;
LinkedList`````<Integer>````` result = new LinkedList<>();
while (number > 0) {
    result.push(number % 10);
    number /= 10;
}
assertEquals(EXPECTED_INT_LIST, result);
```

同样，**我们可以使用递归来实现相同的想法**：

```
void collectDigits(int num, List`````<Integer>````` digitList) {
    if (num / 10 > 0) {
        collectDigits(num / 10, digitList);
    }
    digitList.add(num % 10);
}
```

然后，我们可以调用_collectDigits()_方法来获取结果：

```
List`````<Integer>````` result = new ArrayList<>();
collectDigits(THE_NUMBER, result);
assertEquals(EXPECTED_INT_LIST, result);
```

**如果我们的Java版本是Java 9或更高版本，我们可以使用_String.chars()_和_IntStream_来获取数字列表**：

```
String numStr = String.valueOf(THE_NUMBER);
List`````<Integer>````` result = numStr.chars().map(Character::getNumericValue).boxed().collect(Collectors.toList());
assertEquals(EXPECTED_INT_LIST, result);
```

正如上面的代码所示，我们首先将整数转换为字符串。然后，**_numStr.chars()_方法将数字字符串拆分为一个_IntStream_的字符**。接下来，**_Character_的_getNumericValue()_从_IntStream_中的字符获取数字作为_int_**。最后，我们将_int_装箱为_Integer_并收集结果列表。

## 4. 拆分成_char_数组

有时，我们希望将给定的整数拆分成_char[]_数组：

```
char[] EXPECTED_CHAR_ARRAY = new char[] { '1', '2', '3', '0', '4', '5', '6' };
```

这项任务很直接，因为**标准_String_类提供了_toCharArray()_来将字符串拆分为_char[]_**。我们需要做的只是简单地将整数转换为_String_并调用_toCharArray()_方法：

```
String numStr = String.valueOf(THE_NUMBER);
char[] result = numStr.toCharArray();
assertArrayEquals(EXPECTED_CHAR_ARRAY, result);
```

当然，如果需要，我们可以快速将数组转换为列表。

## 5. 拆分成_String_数组或_String_列表

最后，让我们看看如何将整数拆分成_String[]_数组或_String_列表：

```
String[] EXPECTED_STR_ARRAY = new String[] { "1", "2", "3", "0", "4", "5", "6" };
List`<String>` EXPECTED_STR_LIST = Lists.newArrayList("1", "2", "3", "0", "4", "5", "6");
```

由于我们称此操作为“split”，强大的_split()_方法可以帮助我们解决问题：

```
String numStr = String.valueOf(THE_NUMBER);
String[] result = numStr.split("(?<=.)");
assertArrayEquals(EXPECTED_STR_ARRAY, result);
```

正如我们所看到的，代码看起来相当紧凑。关键是我们在_split()_函数中使用的正则表达式模式。**_(?<=.)_是一个正向后发表达式**。例如，_“(?<=X)a”_匹配每个在‘_X_’字符后的‘_a_’。然而，我们只有_(?<=.)_在我们的模式中。**这使得模式匹配零宽度**。所以，_split()_将**任何字符后的零宽度“字符”作为分隔符**。如果我们用‘#’字符替换数字字符串中的零宽度“字符”，可能更容易理解：_“1#2#3#0#4#5#6#”_。

此外，**_split()_默认丢弃尾随的空元素**。因此，它产生了所需的结果。

## 6. 结论

在本文中，我们探索了将整数拆分成数字的多种方法。此外，我们还看到了如何通过示例以不同的类型，如_Integer_、_char_和_String_，获取数字。

像往常一样，示例的完整源代码可在GitHub上找到。