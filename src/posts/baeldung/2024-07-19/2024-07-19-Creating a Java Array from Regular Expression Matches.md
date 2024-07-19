---
date: 2024-07-19
category:
  - Java
  - Regular Expressions
tag:
  - Java
  - Regex
  - Array
head:
  - - meta
    - name: keywords
      content: Java, Regular Expressions, Array
------
# Java中使用正则表达式匹配并创建数组

## 1. 概述

在本教程中，我们将学习如何从正则表达式（regex）输出中创建一个数组。

## 2. 引言

以我们的示例为例，我们将解析一个长字符串。我们将找到包含10位数字的电话号码的模式。然后，我们将生成的输出作为数组。

Oracle为其正则表达式实现提供了_java.util.regex_包。我们将使用此包中可用的类进行我们的演示。一旦我们找到匹配项，我们将使用该输出并创建一个数组。

数组是固定大小的变量。在使用它们之前，我们必须声明它们的大小。如果数组没有正确实现，也可能会浪费内存。因此，我们首先从_List_开始，然后动态地将_List_转换为数组。

## 3. 实现

让我们逐步通过代码来实现这个解决方案。首先，让我们创建一个_ArrayList_来存储匹配项：

```java
List``<String>`` matchesList = new ArrayList``<String>``();
```

我们将按照以下方式存储一个嵌入电话号码的长字符串：

```java
String stringToSearch =
  "7801111111blahblah  780222222 mumbojumbo7803333333 thisnthat 7804444444";
```

我们使用_Pattern_类的静态工厂方法_compile()_。它返回一个等效的_regex_对象：

```java
Pattern p1 = Pattern.compile("780{1}\\d{7}");
```

一旦我们有了_Pattern_对象，我们就使用_matcher()_方法创建一个_Matcher_对象：

```java
Matcher m1 = p1.matcher(stringToSearch);
```

在这里，我们可以使用_Matcher_类的_find()_方法，如果找到匹配项，它将返回一个_boolean_：

```java
while (m1.find()) {
    matchesList.add(m1.group());
}
```

我们刚刚使用的_group()_方法在_Matcher_类中。它产生一个代表匹配模式的_String_。

要将_matchesList_转换为数组，我们找到我们匹配的项目数量。然后我们在使用它创建一个新数组来存储结果时使用它：

```java
int sizeOfNewArray = matchesList.size();
String newArrayOfMatches[] = new String[sizeOfNewArray];
matchesList.toArray(newArrayOfMatches);
```

现在让我们看看我们的代码如何通过一些示例工作。如果我们传递一个包含四个匹配模式的_String_，我们的代码将产生一个新的_String_数组，包含这四个匹配项：

```java
RegexMatches rm = new RegexMatches();
String actual[] = rm.regexMatch("7801111211fsdafasdfa  7802222222  sadfsadfsda7803333333 sadfdasfasd 7804444444");

assertArrayEquals(new String[] {"7801111211", "7802222222", "7803333333", "7804444444"}, actual, "success");
```

如果我们传递一个没有匹配项的_String_，我们将得到一个空的_String_数组：

```java
String actual[] = rm.regexMatch("78011111fsdafasdfa  780222222  sadfsadfsda78033333 sadfdasfasd 7804444");

assertArrayEquals(new String[] {}, actual, "success");
```

## 4. 结论

在本教程中，我们学习了如何在Java中的文本字符串中查找模式。我们还找到了一种将输出列表在数组中的方法。

源代码可在GitHub上获取。