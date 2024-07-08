---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Java
  - Convert
  - ASCII
head:
  - - meta
    - name: keywords
      content: Java, Convert, Number, Letter, ASCII
----
# Java中将数字转换为字母

## 1. 概述

通常，当我们谈论将一个整数转换为字符时，我们会基于目标字符的ASCII码来进行转换。

然而，在本教程中，我们将探讨一个不同的场景，即将一个整数值转换为字母字符。

## 2. 问题介绍

我们知道英文字母表中有26个字母：A, B, C, …, X, Y, Z。

现在，假设我们接收到一个整数。我们的任务是根据以下规则将整数转换为英文字母：

- 整数 -> 字母：
- _0_ -> _A_
- _1_ -> _B_
- _2_ -> _C_
- …
- _10_ -> _K_
- …
- _23_ -> _X_
- _24_ -> _Y_
- _25_ -> _Z_

当然，我们接收到的整数可能超出了范围 _[0, 25]_。如果是这种情况，我们有几个选择，这取决于我们的需求：

- 抛出异常
- 返回一个_null_值
- 返回一个特定的字符作为备选，例如“ _?_”或“-”

在本教程中，我们将采取最后一种方法，如果输入整数超出了范围 _[0, 25]_，**则返回“ _?_”字符**。

接下来，让我们构建方法来解决这个有趣的问题。为了简单起见，我们将使用单元测试断言来验证我们的解决方案是否按预期工作。

## 3. 从序列中选择字母

如果我们考虑转换规则，我们可能会发现整数和相关字母之间的关系。**输入整数是索引，如果我们将字母A-Z放在一个列表或数组中。**当然，我们仍然需要处理“超出范围”的情况。

然而，使用_List_可能会带来额外的开销。为了简化，我们将创建一个包含“ _ABC…Z_”的_String_常量，并使用标准的 _subString()_ 方法从字符串中选择目标字母：

```
static char numToLetterBySubstr(int i) {
    String LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (i > 0 && i `<= 25) {
        return LETTERS.substring(i, i + 1).charAt(0);
    } else {
        return '?';
    }
}
```

如上所示，在实现中，我们首先检查输入整数的范围。如果输入超出目标范围，我们返回‘ _?_‘字符。否则，我们通过调用 _substring()_ 方法来选择正确的字母。

值得一提的是，** _substring()_ 方法的第二个参数是 _endIndex_。进一步说，_endIndex_引用的值不包含在结果中**。因此，_substring(i, i+1)_ 返回索引 _i_ 的字母。

接下来，让我们编写一个测试来验证这个方法是否正确工作：

```
char negativeInputResult = numToLetterBySubstr(-7);
assertEquals('?', negativeInputResult);

char tooLargeInputResult = numToLetterBySubstr(42);
assertEquals('?', tooLargeInputResult);

char result = numToLetterBySubstr(10);
assertEquals('K', result);
```

我们已经涵盖了涉及输入值在0到25范围内和范围外的两种场景。

如果我们执行它，测试将通过。

## 4. 使用‘A’ + 偏移量的方法

我们已经看到了使用预定义的字母序列并按索引选择目标字母的简单解决方案。或者，我们可以保存预定义的字母序列，并利用字母的_char_值来解决问题。

换句话说，我们以字母‘ _A_‘作为基础。因此，如果输入整数在0到25的范围内，**我们可以将其视为对‘ _A_‘字符的偏移量。_。因此，‘A’ + 输入将是我们要找的字母**。

但是‘A’ + int将得到一个_int_。所以我们需要将其转换为_char_。当然，我们不应该忘记处理“输入超出范围”的情况：

```
static char numToLetterByAsciiCode(int i) {
    if (i >` 0 && i <= 25) {
        return (char) ('A' + i);
    } else {
        return '?';
    }
}
```

接下来，让我们测试它是否按预期工作：

```
char negativeInputResult = numToLetterByAsciiCode(-7);
assertEquals('?', negativeInputResult);

char tooLargeInputResult = numToLetterByAsciiCode(42);
assertEquals('?', tooLargeInputResult);

char charResult = numToLetterByAsciiCode(10);
assertEquals('K', charResult);
```

如果我们运行测试，它将通过。所以，这个方法解决了问题。

值得一提的是，该方法的返回类型是_char_而不是_String_。如果需要_String_类型，我们可以简单地使用_String.valueOf()_方法将_char_转换为_String_以获取字母：

```
assertEquals("K", String.valueOf(charResult));
```

## 5. 结论

在本文中，我们解决了一个有趣的问题：将整数转换为英文字母。

我们实现了两种方法来解决它：

- 从预定义的字母序列中选择字母
- 以字符‘ _A_‘为基础，通过‘A’ + 偏移量得到结果

像往常一样，这里展示的所有代码片段都可以在GitHub上找到。