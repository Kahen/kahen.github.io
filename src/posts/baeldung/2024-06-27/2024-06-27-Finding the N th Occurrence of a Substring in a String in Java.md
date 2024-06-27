---
date: 2022-04-01
category:
  - Java
  - String Manipulation
tag:
  - indexOf()
  - substring
  - regex
head:
  - - meta
    - name: keywords
      content: Java, String, indexOf, substring, regex
---
# 在Java中查找字符串中子字符串的第n次出现

定位字符串中的子字符串是我们在使用Java时的常见操作。通常，我们可以使用_indexOf()_方法找到子字符串的索引。

在本教程中，我们将探索解决一个有趣且实用问题的不同方法：在较长的字符串中找到子字符串的第n次出现。

### 问题介绍
标准的_indexOf()_方法可以给我们子字符串在字符串中的索引。例如，我们可以找到子字符串_“a”_在“_This is a word._”中的索引（_8_）：

```java
int firstIdx = "This is a word.".indexOf("a");
assertEquals(8, firstIdx);
```

然而，**_indexOf(substring)_方法总是返回子字符串第一次出现的索引。** 因此，当我们想要知道子字符串的第n次出现索引时，这种方法有时就不太方便。让我们来看一个例子：

```java
final static String INPUT = "a word, a word, a word, a word";
// "a"的索引："0       8       16      24 "
```

如上例所示，_INPUT_包含四个“_a_”。我们可以通过直接调用_indexOf("a")_获得第一个“a”的索引（_0_）。然而，我们可能需要解决方案来获取“a”的其他出现索引，比如8、16和24。

接下来，让我们看看如何解决这个问题。

为了简单起见，我们将使用单元测试断言来验证每种方法是否返回预期的结果。

在我们解决“查找第n次出现”的问题之前，让我们首先找到子字符串“a”的第二次出现索引。然后，我们将“查找第二次出现”的解决方案扩展到“第n次出现”的解决方案。

我们知道_indexOf("a")_返回“a”第一次出现的索引。此外，我们可以将_fromIndex int_参数传递给_indexOf()_方法。**_fromIndex_参数指示我们开始搜索的字符索引。**

因此，一个直接的想法是两次调用_indexOf()_来获取第二次出现的索引：

- 通过调用_indexOf(substring)_并保存结果到一个变量，比如说_firstIdx_
- 通过调用_indexOf(substring, firstIdx + substring.length())_来获取第二次出现的索引

接下来，让我们实现这种方法并用我们的_INPUT_字符串进行测试：

```java
int firstIdx = INPUT.indexOf("a");
int secondIdx = INPUT.indexOf("a", firstIdx + "a".length());
assertEquals(8, secondIdx);
```

现在，有些人可能意识到**我们可以调用indexOf() n次，并使用相应的_fromIdx_参数来获取第n次出现的索引。** 例如，我们可以在上述测试中添加另一个_indexOf()_调用以获取第三次出现的索引：_thirdIdx = INPUT.indexOf("a", secondIdx + "a".length());_。

接下来，让我们将“查找第二次出现”的解决方案扩展到“查找第n次出现”。

### 查找子字符串的第n次出现
通常，我们会使用递归或循环来实现重复操作。

#### 4.1. 递归方法
那么，让我们首先实现递归解决方案：

```java
int nthIndexOf(String input, String substring, int nth) {
    if (nth == 1) {
        return input.indexOf(substring);
    } else {
        return input.indexOf(substring, nthIndexOf(input, substring, nth - 1) + substring.length());
    }
}
```

实现非常简单。**_nth_变量作为一个计数器。我们在每次递归步骤中减少它的值。**

接下来，让我们用我们的例子数据测试这个方法：

```java
int result1 = nthIndexOf(INPUT, "a", 1);
assertEquals(0, result1);

int result2 = nthIndexOf(INPUT, "a", 2);
assertEquals(8, result2);

int result3 = nthIndexOf(INPUT, "a", 3);
assertEquals(16, result3);

int result4 = nthIndexOf(INPUT, "a", 4);
assertEquals(24, result4);

int result5 = nthIndexOf(INPUT, "a", 5);
assertEquals(-1, result5);
```

如果我们运行测试，测试会通过。同样，如我们所见，当总出现次数小于_nth_值时，该方法返回_-1_。

#### 4.2. 迭代方法
类似地，我们可以在迭代方法中实现相同的想法：

```java
static int nthIndexOf2(String input, String substring, int nth) {
    int index = -1;
    while (nth > 0) {
        index = input.indexOf(substring, index + substring.length());
        if (index == -1) {
            return -1;
        }
        nth--;
    }
    return index;
}
```

使用相同输入的测试也通过了：

```java
int result1 = nthIndexOf2(INPUT, "a", 1);
assertEquals(0, result1);

int result2 = nthIndexOf2(INPUT, "a", 2);
assertEquals(8, result2);

int result3 = nthIndexOf2(INPUT, "a", 3);
assertEquals(16, result3);

int result4 = nthIndexOf2(INPUT, "a", 4);
assertEquals(24, result4);

int result5 = nthIndexOf2(INPUT, "a", 5);
assertEquals(-1, result5);
```

### 5. 基于正则表达式的解决方案
我们已经看到了如何使用_indexOf()_方法解决问题。另外，我们可以使用Java的正则表达式API来解决问题。

**_Matcher.find()_允许我们在输入字符串中找到下一个匹配的出现。** 因此，我们可以调用_Matcher.find()_ n次来获取第n次匹配。同样，**我们可以使用_Matcher.start()_获取每个匹配的起始索引：**

```java
int nthOccurrenceIndex(String input, String regexPattern, int nth) {
    Matcher matcher = Pattern.compile(regexPattern).matcher(INPUT);
    for (int i = 0; i < nth; i++) {
        if (!matcher.find()) {
            return -1;
        }
    }
    return matcher.start();
}
```

接下来，让我们创建一个测试来验证基于正则表达式的解决方案是否正确执行：

```java
int result1 = nthOccurrenceIndex(INPUT, "a", 1);
assertEquals(0, result1);

int result2 = nthOccurrenceIndex(INPUT, "a", 2);
assertEquals(8, result2);

int result3 = nthOccurrenceIndex(INPUT, "a", 3);
assertEquals(16, result3);

int result4 = nthOccurrenceIndex(INPUT, "a", 4);
assertEquals(24, result4);

int result5 = nthOccurrenceIndex(INPUT, "a", 5);
assertEquals(-1, result5);
```

值得注意的是，这种解决方案允许我们匹配输入中符合模式的动态子字符串。然而，另一方面，基于_indexOf()_的方法只适用于固定子字符串。

## 6. 结论
在本文中，我们学习了在字符串中定位子字符串的第n次出现的各种方法：

- 基于_indexOf()_方法的递归解决方案
- 基于_indexOf()_方法的迭代解决方案
- 基于正则表达式的解决方案

如往常一样，示例的完整源代码可在GitHub上找到。