---
date: 2024-06-19
category:
  - Java
  - Programming
tag:
  - Java
  - Algorithm
  - Phone Number Conversion
head:
  - - meta
    - name: keywords
      content: Java, Programming, Algorithm, Phone Number Conversion
---

# Java中将用文字表达的电话号码转换为数字

## 1. 概述

我们可能需要处理以文本形式表达的电话号码。也许我们通过语音转文字接口接收到了一个电话号码。

在本教程中，我们将研究一个算法，该算法处理一系列表达数字序列的单词，并将它们转换为一串数字。

## 2. 问题陈述介绍

让我们更深入地看看输入的格式。我们将得到一个用单词表达的电话号码，例如“five six eight”。然而，口语数字通常包括乘数，例如“double two”。

因此，我们期望我们的算法能够转换：

``` 
输入："triple five two three six eight"
预期输出："5552368"
```

## 3. 使用_switch_语句实现算法

算法将输入分割成单词，并处理每个单词以构建输出。我们可以使用_switch_语句对单词进行分类。

### 3.1. 将字符串分割成单词数组

首先，我们需要使用_String.__split()_方法，使用空格作为分隔符，将_phoneNumberInWords_字符串分割成一个单词数组：

``` 
String[] words = phoneNumberInWords.split(" ");
```

然后，我们可以使用_for-each_循环遍历_words_数组：

``` 
for (String word : words) {
    // 语句
}
```

### 3.2. 处理乘数

在_for-each_循环的每次迭代中，我们将检查当前单词是否表示一个乘数：

``` 
Integer multiplier = getWordAsMultiplier(word);
if (multiplier != null) {
    if (currentMultiplier != null) {
        throw new IllegalArgumentException("不能有连续的乘数，在：" + word);
    }
    currentMultiplier = multiplier;
}
```

我们通过将当前单词作为参数调用_getWordAsMultiplier()_方法。此方法将当前单词映射到其对应的数字表示，并返回它。

如果返回值不是_null_，表示当前单词确实是一个乘数，我们检查是否已经有设置的乘数。如果有，我们抛出一个_IllegalArgumentException_，因为**不允许连续的乘数**。否则，我们设置当前乘数。

为了识别一个单词是否是乘数，我们在_getWordAsMultiplier()_内部使用_switch_语句：

``` 
public static Integer getWordAsMultiplier(String word) {
    switch (word) {
        case "double":
            return 2;
        case "triple":
            return 3;
        case "quadruple":
            return 4;
        default:
            return null;
    }
}
```

如果当前单词不是乘数，那么这个方法将返回_null_。

### 3.3. 处理非乘数单词

如果当前单词不是乘数单词，我们调用_getWordAsDigit()_方法：

``` 
public static String getWordAsDigit(String word) {
    switch (word) {
        case "zero":
            return "0";
        case "one":
            return "1";
        ...
        ...
        ...
        case "nine":
            return "9";
        default:
            throw new IllegalArgumentException("无效的单词：" + word);
    }
}
```

这将在我们检查乘数单词的_if_语句的_else_中被调用。由于一个单词必须是乘数或数字，如果用一个非数字的单词调用它，这个函数该抛出异常。在这里，我们使用了_IllegalArgumentException_。

### 3.4. 组装数字

让我们使用getWordAsDigit()方法。在处理乘数的代码中，我们已经捕获了数字的任何重复，所以现在我们要找到当前的数字，并根据当前的乘数将其添加到输出中。

我们将使用一个名为_output_的_StringBuilder_对象来存储我们的结果。

我们使用_append()_方法来组装输出。**然而，_String.repeat()_方法跟踪乘数。我们根据当前乘数重复当前单词的数字表示**：

``` 
if (multiplier != null) {
    // 乘数处理
} else {
    output.append(getWordAsDigit(word)
      .repeat(currentMultiplier != null ? currentMultiplier : 1));
    currentMultiplier = null;
}
```

我们使用_StringBuilder.append()_来添加下一组数字到输出。

如果当前乘数不是_null_，我们使用它来提供下一个数字的副本，使用_String.repeat()_，默认在没有乘数时重复1次。

在循环结束时，_output_对象包含了我们的电话号码：

``` 
return output.toString();
```

### 3.5. 测试解决方案

让我们看看当给出正确的电话号码、无效的单词或连续的乘数时会发生什么：

``` 
assertEquals("5248888",
  UseSwitchToConvertPhoneNumberInWordToNumber
    .convertPhoneNumberInWordToNumber("five two four quadruple eight"));

assertThrows(IllegalArgumentException.class, () -> {
    UseSwitchToConvertPhoneNumberInWordToNumber
      .convertPhoneNumberInWordToNumber("five eight invalid two four null eight");
});

assertThrows(IllegalArgumentException.class, () -> {
    UseSwitchToConvertPhoneNumberInWordToNumber
      .convertPhoneNumberInWordToNumber("five eight three double triple");
});
```

## 4. 使用_Map_代替_switch_

我们的算法运行良好，但_switch_语句可能有点冗长。我们可以用_Map_对象来替换它们。

_Map.of()_方法创建了一个包含提供的关键值对的不可变_Map_。**在这一部分，我们将使用_Map.of()_方法来映射乘数（"double" 到 2）和数字（"two" 到 "2"）。**

### 4.1. 映射数字和乘数

让我们初始化_Map_来创建个别数字的映射：

``` 
private static Map`<String, Integer>` multipliers
  = Map.of("double", 2, "triple", 3, "quadruple", 4);
```

接下来，我们初始化另一个_Map_来映射数字：

``` 
private static Map`<String, String>` digits
  = Map.of("zero", "0", "one", "1", "two", "2", "three", "3",
    "four", "4", "five", "5", "six", "6", "seven", "7", "eight", "8", "nine", "9");
```

我们将它们初始化为不可变的，因为如果_Map_在运行时可以改变，算法将停止工作。

### 4.2. 检查乘数

和以前一样，在循环内，我们想要找到一个乘数或null。我们可以使用_multipliers_上的_get()_方法：

``` 
Integer multiplier = multipliers.get(word);
```

### 4.3. 检查数字

为了复制异常，当一个单词不是数字时，我们需要在对_digits_的_get()_之后的_if_语句：

``` 
String digit = digits.get(word);

if (digit == null) {
    throw new IllegalArgumentException("无效的单词：" + word);
}
```

### 4.4. 测试解决方案

我们可以对这种解决方案运行相同的测试，例如：

``` 
assertEquals("5248888",
  UseHashMapToConvertPhoneNumberInWordsToNumber
    .convertPhoneNumberInWordToNumber("five two four quadruple eight"));
```

## 5. 结论

在本文中，我们研究了一个处理电话号码的算法。

我们使用_switch_语句实现了基本算法。然后，我们使用Java _Map_优化了实现。

和往常一样，示例代码在GitHub上。

发布帖子后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。