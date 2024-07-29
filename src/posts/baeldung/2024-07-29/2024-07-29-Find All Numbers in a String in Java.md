---
date: 2024-07-29
category:
  - Java
  - 编程
tag:
  - Java
  - 正则表达式
  - 字符串处理
head:
  - - meta
    - name: keywords
      content: Java, 正则表达式, 字符串处理, 数字识别
---
# 在Java中查找字符串中的所有数字 | Baeldung

## 1. 概述

有时我们需要在字符串中查找数字或完整的数字。我们可以使用正则表达式或某些库函数来实现。

在本文中，我们将**使用正则表达式来查找和提取字符串中的数字**。我们还将介绍一些计数数字的方法。

## 2. 计数数字
让我们先从计数字符串中找到的数字开始。

### 2.1. 使用正则表达式
我们可以使用Java正则表达式来计算一个数字的匹配次数。

在正则表达式中，**“_\[d]_”表示“任何单个数字”**。让我们使用这个表达式来计数字符串中的数字：

```java
int countDigits(String stringToSearch) {
    Pattern digitRegex = Pattern.compile("\\d");
    Matcher countEmailMatcher = digitRegex.matcher(stringToSearch);

    int count = 0;
    while (countEmailMatcher.find()) {
        count++;
    }

    return count;
}
```

一旦我们为正则表达式定义了一个_Matcher_，我们就可以在一个循环中使用它来_find_并计算所有匹配项。让我们测试它：

```java
int count = countDigits("64x6xxxxx453xxxxx9xx038x68xxxxxx95786xxx7986");

assertThat(count, equalTo(21));
```

### 2.2. 使用Google Guava的_CharMatcher_
要使用Guava，我们首先需要添加Maven依赖项：

```xml
`<dependency>`
    `<groupId>`com.google.guava`</groupId>`
    `<artifactId>`guava`</artifactId>`
    `<version>`31.0.1-jre`</version>`
`</dependency>`
```

Guava提供了_CharMatcher.inRange_方法来计数数字：

```java
int count = CharMatcher.inRange('0', '9')
  .countIn("64x6xxxxx453xxxxx9xx038x68xxxxxx95786xxx7986");

assertThat(count, equalTo(21));
```

## 3. 查找数字
计数数字需要能够捕捉到有效数字表达式所有数字的模式。

### 3.1. 查找整数
为了构建一个表达式来识别整数，我们必须考虑到它们可以是正数或负数，并且由一个或多个数字组成。我们还注意到，负整数前面有一个减号。

因此，我们可以通过扩展我们的正则表达式到“_-?\d+_”来找到整数。这个模式的意思是“一个可选的减号，后面跟着一个或多个数字”。

让我们创建一个示例方法，使用这个正则表达式在字符串中查找整数：

```java
List``````<String>`````` findIntegers(String stringToSearch) {
    Pattern integerPattern = Pattern.compile("-?\\d+");
    Matcher matcher = integerPattern.matcher(stringToSearch);

    List``````<String>`````` integerList = new ArrayList<>();
    while (matcher.find()) {
        integerList.add(matcher.group());
    }

    return integerList;
}
```

一旦我们创建了一个正则表达式的_Matcher_，我们就在一个循环中使用它来_find_字符串中的所有整数。我们在每个匹配项上调用_group_来获取所有整数。

让我们测试_findIntegers_：

```java
List``````<String>`````` integersFound =
  findIntegers("646xxxx4-53xxx34xxxxxxxxx-35x45x9xx3868xxxxxx-95786xxx79-86");

assertThat(integersFound)
  .containsExactly("646", "4", "-53", "34", "-35", "45", "9", "3868", "-95786", "79", "-86");
```

### 3.2. 查找小数
要创建一个正则表达式来查找小数，我们需要考虑书写它们时使用的字符模式。

如果一个小数是负数，它以一个减号开始。这是由一个或多个数字和一个可选的小数部分跟随的。这个小数部分以一个小数点开始，后面是另一个一个或多个数字的序列。

我们可以使用正则表达式_“-?\d+(\.\d+)?”_来定义这个：

```java
List``````<String>`````` findDecimalNums(String stringToSearch) {
    Pattern decimalNumPattern = Pattern.compile("-?\\d+(\\.\\d+)?");
    Matcher matcher = decimalNumPattern.matcher(stringToSearch);

    List``````<String>`````` decimalNumList = new ArrayList<>();
    while (matcher.find()) {
        decimalNumList.add(matcher.group());
    }

    return decimalNumList;
}
```

现在我们将测试_findDecimalNums_：

```java
List``````<String>`````` decimalNumsFound =
  findDecimalNums("x7854.455xxxxxxxxxxxx-3x-553.00x53xxxxxxxxx3456xxxxxxxx3567.4xxxxx");

assertThat(decimalNumsFound)
  .containsExactly("7854.455", "-3", "-553.00", "53", "3456", "3567.4");
```

## 4. 将找到的字符串转换为数值
我们可能还希望将找到的数字转换为它们的Java类型。

让我们使用_Stream_映射将我们的整数转换为_Long_：

```java
LongStream integerValuesFound = findIntegers("x7854x455xxxxxxxxxxxxx-3xxxxx34x56")
  .stream()
  .mapToLong(Long::valueOf);

assertThat(integerValuesFound)
  .containsExactly(7854L, 455L, -3L, 34L, 56L);
```

接下来，我们将以相同的方式将小数转换为_Double_：

```java
DoubleStream decimalNumValuesFound = findDecimalNums("x7854.455xxxxxxxxxxxxx-3xxxxx34.56")
  .stream()
  .mapToDouble(Double::valueOf);

assertThat(decimalNumValuesFound)
  .containsExactly(7854.455, -3.0, 34.56);
```

## 5. 查找其他类型的数字
数字可以以其他格式表示，我们可以通过调整我们的正则表达式来检测它们。

### 5.1. 科学记数法
让我们找到使用科学记数法格式化的一些数字：

```java
String strToSearch = "xx1.25E-3xxx2e109xxx-70.96E+105xxxx-8.7312E-102xx919.3822e+31xxx";

Matcher matcher = Pattern.compile("-?\\d+(\\.\\d+)?[eE][+-]?\\d+")
  .matcher(strToSearch);

// 循环遍历matcher

assertThat(sciNotationNums)
  .containsExactly("1.25E-3", "2e109", "-70.96E+105", "-8.7312E-102", "919.3822e+31");
```

### 5.2. 十六进制
现在我们将在字符串中找到十六进制数字：

```java
String strToSearch = "xaF851Bxxx-3f6Cxx-2Ad9eExx70ae19xxx";

Matcher matcher = Pattern.compile("-?[0-9a-fA-F]+")
  .matcher(strToSearch);

// 循环遍历matcher

assertThat(hexNums)
  .containsExactly("aF851B", "-3f6C", "-2Ad9eE", "70ae19");
```

## 6. 结论
在本文中，我们首先讨论了如何使用正则表达式和Google Guava的_CharMatcher_类来计数字符串中的数字。

然后，我们探索了使用正则表达式来查找整数和小数。

最后，我们涵盖了以其他格式（如科学记数法和十六进制）查找数字。

如往常一样，本教程的源代码可以在GitHub上找到。