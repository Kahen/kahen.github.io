---
date: 2024-06-21
category:
  - Java
  - 编程
tag:
  - 缩写
  - 姓名缩写
head:
  - - meta
    - name: keywords
      content: Java, 缩写, 姓名缩写, 编程技巧
---
# 在Java中获取姓名的首字母缩写

## 1. 引言

在处理姓名时，将它们缩短为使用每个单词的第一个字符组成的缩写字符串可能会很有帮助。在本教程中，们来看看在Java中实现这一功能的几种不同方法。

## 2. 假设

**在创建缩写时，我们只考虑以字母开头的单词。** 任何其他单词都从过程中排除。此外，缩写可能最终是一个空字符串，没有有效的单词。此外，我们将整个字符串转换为大写。

## 3. 使用循环

**我们可以通过空格分割文本，并使用for循环来遍历每个单词。** 随后，我们可以取每个有效单词的第一个字符并构建缩写：

```java
String getInitialUsingLoop(String name) {
    if (name == null || name.isEmpty()) {
        return "";
    }
    String[] parts = name.split("\\s+");
    StringBuilder initials = new StringBuilder();
    for (String part : parts) {
        if (part.matches("[a-zA-Z].*")) {
            initials.append(part.charAt(0));
        }
    }
    return initials.toString().toUpperCase();
}
```

在上述代码中，我们使用正则表达式检查一个单词是否以字母开头，然后提取第一个字符以形成缩写。

我们可以编写一个单元测试来使用JUnit检查不同的情况：

```java
@ParameterizedTest
@CsvSource({"John F Kennedy,JFK", ",''", ",''", "Not Correct   88text,NC", "michael jackson,MJ", "123,''", "123 234A,''", "1test 2test, ''"})
void getInitialFromName_usingLoop(String input, String expected) {
    String initial = getInitialUsingLoop(input);
    assertEquals(expected, initial);
}
```

在上述测试用例中，**我们利用了JUnit的参数化测试特性来指定多个输入和预期输出组合。** 结果，我们可以确保在不同条件下对功能进行全面覆盖和验证。

## 4. 使用StringTokenizer

**我们可以使用StringTokenizer将文本分割成单词。** 让我们看看实现：

```java
String getInitialUsingStringTokenizer(String name)
    if (name == null || name.isEmpty()) {
        return "";
    }
    StringTokenizer tokenizer = new StringTokenizer(name);
    StringBuilder initials = new StringBuilder();
    while (tokenizer.hasMoreTokens()) {
        String part = tokenizer.nextToken();
        if (part.matches("[a-zA-Z].*")) {
            initials.append(part.charAt(0));
        }
    }
    return initials.toString().toUpperCase();
}
```

这段代码与之前的实现类似，只是我们使用StringTokenizer而不是split()方法。然而，StringTokenizer是一个为了兼容性而保留的遗留类，因此我们应该考虑使用split()方法。

我们可以像之前一样使用相同的参数化测试来测试这个方法。

## 5. 使用正则表达式

实现这一功能的另一种方式是使用正则表达式。**我们可以通过使用正则表达式捕获来获取每个有效单词的第一个字符：**

```java
String getInitialUsingRegex(String name) {
    if (name == null || name.isEmpty()) {
        return "";
    }
    Pattern pattern = Pattern.compile("\\b[a-zA-Z]");
    Matcher matcher = pattern.matcher(name);
    StringBuilder initials = new StringBuilder();
    while (matcher.find()) {
        initials.append(matcher.group());
    }
    return initials.toString().toUpperCase();
}
```

同样，我们可以创建一个测试用例来验证实现。

## 6. 使用Stream API

**我们还可以使用基于函数编程的Stream API，该API自Java 8以来就可用。** 现在，让我们深入了解实现：

```java
String getInitialUsingStreamsAPI(String name) {
    if (name == null || name.isEmpty()) {
        return "";
    }
    return Arrays.stream(name.split("\\s+"))
      .filter(part -> part.matches("[a-zA-Z].*"))
      .map(part -> part.substring(0, 1))
      .collect(Collectors.joining())
      .toUpperCase();
}
```

在这种情况下，我们结合了filter()、map()和collect()方法来实现目标。我们可以使用类似的参数化测试来验证此实现。

## 7. 结论

本文讨论了在Java中提取姓名缩写的各种方法。这些方法也可以为任何文本生成首字母缩写，而不仅仅是姓名。此外，**我们探索了传统的基于循环的方法、正则表达式和更函数编程的方法来实现相同的结果。** 根据特定场景，开发人员可以选择最适合他们需求的方法。

如常，本教程中使用的示例代码可在GitHub上找到。