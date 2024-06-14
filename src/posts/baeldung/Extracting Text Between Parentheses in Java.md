---
date: 2024-06-13
category:
  - Java
  - 正则表达式
tag:
  - Java
  - 字符串处理
  - 正则表达式
---
# Java中提取括号内文本的方法 | Baeldung

## 1. 概述

在Java编程中，有许多场景需要我们提取括号内包含的文本。理解如何检索括号之间的文本是一项重要技能。

在本教程中，我们将探索实现这一目标的不同方法，重点关注正则表达式和一些流行的外部库。

## 2. 问题介绍

当我们的输入只包含一对括号时，我们可以使用两个replaceAll()方法调用来提取它们之间的内容：

```java
String myString = "a b c (d e f) x y z";

String result = myString.replaceAll(".*[(]", "")
  .replaceAll("[)].*", "");
assertEquals("d e f", result);
```

如上述示例所示，第一个replaceAll()方法移除直到‘(‘字符之前的所有内容。第二个replaceAll()方法从‘)’到字符串的末尾移除所有内容。因此，剩下的就是‘(‘和‘)’之间的文本。

然而，如果输入包含多个“(…)”对，这种方法将不起作用。例如，假设我们有另一个输入：

```java
static final String INPUT = "a (b c) d (e f) x (y z)";
```

在INPUT中有三对括号。因此，我们期望在以下字符串列表中看到提取的值：

```java
static final List\<String\> EXPECTED = List.of("b c", "e f", "y z");
```

接下来，让我们看看如何从输入字符串中提取这些字符串值。

为了简单起见，我们将利用单元测试断言来验证每种方法是否按预期工作。

## 3. 贪婪与非贪婪正则表达式模式

正则表达式（regex）提供了一种强大灵活的模式匹配和文本提取方法。因此，我们可以使用正则表达式来匹配括号之间的文本。

有些人可能会想出以下模式来提取“(‘和’)”之间的文本：“\[(\\](.\\*)\\[)\\]”。这个模式相当直接：

- \[(\\] 和 \[)\\] 匹配字面的‘(‘和’)’
- (.\\*) 是一个捕获组，匹配‘(‘和’)’之间的任何内容

接下来，让我们检查这个模式是否正确解决了问题：

```java
String myRegex = "[(](.*)[)]";
Matcher myMatcher = Pattern.compile(myRegex)
  .matcher(INPUT);
List\<String\> myResult = new ArrayList\<\>();
while (myMatcher.find()) {
    myResult.add(myMatcher.group(1));
}
assertEquals(List.of("b c) d (e f) x (y z"), myResult);
```

如上测试所示，使用这个模式，我们在结果列表中只有一个字符串元素：“b c) d (e f) x (y z”。这是因为‘\\*’量词应用了贪婪匹配。换句话说，“\[(\\](.\\*)\\[)\\]”匹配输入中的第一个‘(‘，然后匹配到最后一个‘)’字符，**即使内容包含其他“(…)”对也是如此**。

这不是我们期望的。为了解决这个问题，我们需要非贪婪匹配，这意味着模式必须匹配每一对“(…)”。

**要使‘\\*’量词非贪婪，我们可以在它后面添加一个问号‘?’：“\[(\\](\\*?)\\[)\\]”。**

接下来，让我们测试这个模式是否可以提取预期的字符串元素：

```java
String regex = "[(](.*?)[)]";
List\<String\> result = new ArrayList\<\>();
Matcher matcher = Pattern.compile(regex)
  .matcher(INPUT);
while (matcher.find()) {
    result.add(matcher.group(1));
}
assertEquals(EXPECTED, result);
```

正如我们所看到的，非贪婪正则表达式模式“\[(\\](.\\*?)\\[)\\]”完成了任务。

## 4. 使用否定字符类

除了使用非贪婪量词（\\*?），**我们还可以使用正则表达式的否定字符类来解决问题**：

```java
String regex = "[(]([^)]*)";
List\<String\> result = new ArrayList\<\>();
Matcher matcher = Pattern.compile(regex)
  .matcher(INPUT);
while (matcher.find()) {
    result.add(matcher.group(1));
}
assertEquals(EXPECTED, result);
```

正如代码所示，我们提取括号之间文本的正则表达式模式是“\[(\\](\\[^)\\]\\*)\”。让我们分解它以理解它的工作原理：

- \[(\\] – 匹配字面的‘(‘字符
- \[^)\\]\\* – 匹配任何不是‘)’的字符；**由于它跟随\[(\\]，它只匹配括号内的字符。**
- (\\[^)\\]\\*) – 我们创建**一个捕获组来提取括号之间的文本**，不包括任何开括号或闭括号。

或者，我们可以将“\[(\\]”字符类替换为正向查找断言“(?\u003c=\\[(\\])”。**查找断言允许我们仅当指定模式在它们之前时匹配一组字符。**在这个例子中，(?\u003c=\\[(\\]) 断言当前位置的直接前驱是一个开括号‘(‘：

```java
String regex = "(?\u003c=[(])[^)]*";
List\<String\> result = new ArrayList\<\>();
Matcher matcher = Pattern.compile(regex)
    .matcher(INPUT);
while (matcher.find()) {
    result.add(matcher.group());
}
assertEquals(EXPECTED, result);
```

值得注意的是，**由于查找断言是一个零宽度断言，‘(‘字符不会被捕获**。因此，我们不需要创建一个捕获组来提取预期的文本。

## 5. 使用Apache Commons Lang 3中的StringUtils

Apache Commons Lang 3是一个广泛使用的库。它的StringUtils类提供了丰富的方便的方法来操作字符串值。

**如果我们的输入中只有一对括号，StringUtils.substringBetween()方法允许我们直接提取它们之间的字符串**：

```java
String myString = "a b c (d e f) x y z";

String result = StringUtils.substringBetween(myString, "(", ")");
assertEquals("d e f", result);
```

**当输入有多个括号对时，StringUtils.substringsBetween()返回括号对内的文本数组**：

```java
String[] results = StringUtils.substringsBetween(INPUT, "(", ")");
assertArrayEquals(EXPECTED.toArray(), results);
```

如果我们的项目中已经使用了Apache Commons Lang 3库，这两种方法都是完成这项任务的好选择。

## 6. 结论

在本文中，我们探讨了在Java中提取括号内文本的不同方法。通过理解和应用这些技术，我们可以有效地解析和处理Java应用程序中的文本。

和往常一样，示例的完整源代码可以在GitHub上找到。
