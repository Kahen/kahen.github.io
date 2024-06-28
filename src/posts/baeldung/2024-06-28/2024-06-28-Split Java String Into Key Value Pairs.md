---
date: 2022-04-01
category:
  - Java
  - String Manipulation
tag:
  - Java
  - String Split
  - Key-Value Pairs
head:
  - - meta
    - name: keywords
      content: Java, String, Split, Key-Value Pairs, CSV, StringTokenizer, Regular Expressions, Java Streams
---
# Java中将字符串分割成键值对

在处理像CSV（逗号分隔值）或自定义分隔数据这样的格式时，经常需要在Java中将字符串分割成键值对。本教程将通过代码示例和解释，探讨如何将Java文本分割成键值对。

## 1. 引言

## 2. 使用_StringTokenizer_

_StringTokenizer_类我们能够根据提供的分隔符将字符串分解为标记，这是一种将字符串分割成键值对的方法。

让我们以一个例子为例：

```java
@Test
public void givenStringData_whenUsingTokenizer_thenTokenizeAndValidate() {
    String data = "name=John age=30 city=NewYork";
    StringTokenizer tokenizer = new StringTokenizer(data);

    // 创建一个存储键值对的映射
    Map```<String, String>``` keyValueMap = new HashMap<>();

    while (tokenizer.hasMoreTokens()) {
        String token = tokenizer.nextToken();
        String[] keyValue = token.split("=");

        if (keyValue.length == 2) {
            String key = keyValue[0];
            String value = keyValue[1];

            // 将键值对存储在映射中
            keyValueMap.put(key, value);
        }
    }

    // 使用断言来验证映射中的键值对
    assertEquals("John", keyValueMap.get("name"));
    assertEquals("30", keyValueMap.get("age"));
    assertEquals("NewYork", keyValueMap.get("city"));
}
```

在这个例子中，创建一个_StringTokenizer_对象时指定了输入字符串数据和默认分隔符（空格）。然后，通过迭代标记，我们使用等号符号(=)作为分隔符将每个标记分割成键值对。

## 3. 使用正则表达式

使用_Pattern_和_Matcher_类的正则表达式是将字符串分割成键值对的另一种方法。幸运的是，这种方法在处理各种分隔符和模式时提供了额外的灵活性。

让我们以一个例子为例：

```java
@Test
public void givenDataWithPattern_whenUsingMatcher_thenPerformPatternMatching() {
    String data = "name=John,age=30;city=NewYork";
    Pattern pattern = Pattern.compile("\\b(\\w+)=(\\w+)\\b");
    Matcher matcher = pattern.matcher(data);

    // 创建一个存储键值对的映射
    Map```<String, String>``` keyValueMap = new HashMap<>();

    while (matcher.find()) {
        String key = matcher.group(1);
        String value = matcher.group(2);

        // 将键值对存储在映射中
        keyValueMap.put(key, value);
    }

    // 使用断言来验证映射中的键值对
    assertEquals("John", keyValueMap.get("name"));
    assertEquals("30", keyValueMap.get("age"));
    assertEquals("NewYork", keyValueMap.get("city"));
}
```

在这个例子中，我们使用_Pattern_类生成一个正则表达式模式`\b(\w+)=(\w+)\b`，用于定位和提取文本中的键值对。此外，它识别了一个由字母、数字或下划线组成的键后面跟着等号'='的模式，捕获了相关的值，该值同样由字母、数字或下划线组成。

注意，_\b_标记确保找到完整的键值对，这使得这个正则表达式对于解析给定字符串中的结构化数据在“key=value”格式中非常有用。

然后，使用输入字符串，我们使用_Matcher_定位和提取这些对。

## 4. 使用Java Streams

如果我们使用Java 8或更高版本，我们可以使用Java Streams清晰地将文本分割成键值对。

让我们以一个例子为例：

```java
@Test
public void givenStringData_whenUsingJavaMap_thenSplitAndValidate() {
    String data = "name=John age=30 city=NewYork";
    Map```<String, String>``` keyValueMap = Arrays.stream(data.split(" "))
      .map(kv -> kv.split("="))
      .filter(kvArray -> kvArray.length == 2)
      .collect(Collectors.toMap(kv -> kv[0], kv -> kv[1]));

    assertEquals("John", keyValueMap.get("name"));
    assertEquals("30", keyValueMap.get("age"));
    assertEquals("NewYork", keyValueMap.get("city"));
}
```

在这个例子中，我们使用空格作为分隔符将输入字符串分割成一个键值对数组。然后，我们使用_map_过程进一步使用等号符号(=)分割每一对。最后，我们移除任何不包含正好两个元素的配对，并将剩余的配对编译成一个带有相关键和值的_Map_。

## 5. 结论

Java Streams、_StringTokenizer_和正则表达式只是将Java字符串分割成键值对的一些技术。

我们的需求和我们正在处理的数据格式的复杂性将决定我们选择的解决方案。通过了解这些策略，我们可以有效地提取和处理Java程序中以键值对形式存储的数据。

如往常一样，本文的完整代码示例可以在GitHub上找到。