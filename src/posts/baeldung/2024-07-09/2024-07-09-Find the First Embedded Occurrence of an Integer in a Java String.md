---
date: 2024-07-09
category:
  - Java
  - String Manipulation
tag:
  - regex
  - java.util.regex
  - java.util.Scanner
  - String split
head:
  - - meta
    - name: keywords
      content: Java, String, Regular Expressions, Pattern, Matcher, Scanner, split
------
# 在Java字符串中查找第一个嵌入的整数

在本教程中，我们将探讨不同的方法来查找字符串中的第一个整数出现。例如，给定字符串 "ba31dung123"，我们只想找到第一个嵌入的整数，即 31。我们将看到如何使用正则表达式和纯Java来实现这一点。

## 2. 使用正则表达式的解决方案

正则表达式（regex）是一种强大的工具，可以根据特定模式匹配和操作字符串。它们提供了一种简洁的方式来指定字符串模式，我们可以使用它们来搜索特定的字符、单词或短语，替换文本以及根据特定规则验证字符串。

### 2.1. 使用 Matcher 和 Pattern 类

java.util.regex 包提供了两个主要的类用于正则表达式的模式匹配：

- Matcher：这个类提供了使用给定模式在字符串上执行各种匹配操作的方法。它是通过在 Pattern 实例上调用 matcher() 方法获得的。
- Pattern：这个类表示一个编译后的正则表达式，并提供各种方法在字符串上执行匹配操作。我们可以通过调用 Pattern 类的 compile() 方法从正则表达式创建一个模式。

我们可以利用它们来查找字符串中的第一个整数出现：

```java
@Test
void whenUsingPatternMatcher_findFirstInteger() {
    String str = "ba31dung123";
    Matcher matcher = Pattern.compile("\\d+").matcher(str);
    matcher.find();
    int i = Integer.valueOf(matcher.group());
    Assertions.assertEquals(31, i);
}
```

我们使用表达式 `\\d+` 来匹配一个或多个连续的数字。

### 2.2. 使用 Scanner

我们还可以使用 java.util.Scanner 类。这是一个解析输入数据的强大工具。首先，我们将使用它的 useDelimiter() 方法来删除所有非数字。之后，我们可以使用 nextInt() 方法逐个提取数字：

```java
@Test
void whenUsingScanner_findFirstInteger() {
    int i = new Scanner("ba31dung123").useDelimiter("\\D+").nextInt();
    Assertions.assertEquals(31, i);
}
```

正则表达式 `\\D+` 表示所有连续的非数字字符（与 `\\d+` 相反）。

### 2.3. 使用 split()

Java 中的 split() 方法是一个 String 类方法。它根据指定的分隔符将字符串分割成子字符串，并返回子字符串的数组。分隔符可以是一个正则表达式或一个普通字符串：

```java
@Test
void whenUsingSplit_findFirstInteger() {
    String str = "ba31dung123";
    List`<String>` tokens = Arrays.stream(str.split("\\D+")).filter(s -> s.length() > 0).collect(Collectors.toList());
    Assertions.assertEquals(31, Integer.parseInt(tokens.get(0)));
}
```

我们使用了与前面相同的正则表达式。然而，这个解决方案如果字符串以分隔符开头，例如我们的情况，可能会给我们一个空的数组元素。因此，为了避免这种情况，我们使用 Java Stream API 和 filter() 方法过滤了我们的列表。

## 3. 不使用正则表达式的解决方案

我们看到正则表达式是解决这个问题的好方法，但我们也可以不使用它们。

让我们创建一个方法，从字符串中提取第一个整数：

```java
static Integer findFirstInteger(String s) {
    int i = 0;
    while (i < s.length() && !Character.isDigit(s.charAt(i))) {
        i++;
    }
    int j = i;
    while (j < s.length() && Character.isDigit(s.charAt(j))) {
        j++;
    }
    return Integer.parseInt(s.substring(i, j));
}
```

我们首先通过迭代字符串直到找到第一个数字。然后使用 isDigit() 方法来识别一个数字字符。接下来，我们存储第一个数字的索引在变量 i 中。然后，我们再次迭代直到找到我们的数字的结束（等于第一个非数字字符）。然后我们可以返回从 i 到 j 的子字符串。

让我们测试我们的 findFirstInteger() 方法：

```java
@Test
void whenUsingCustomMethod_findFirstInteger() {
    String str = "ba31dung123";
    Integer i = FirstOccurrenceOfAnInteger.findFirstInteger(str);
    Assertions.assertEquals(31, i);
}
```

## 4. 结论

在这篇简短的文章中，我们探讨了从字符串中提取第一个嵌入整数的不同替代方案。我们看到正则表达式对于这个任务有多种应用，但我们也可以不使用它。

像往常一样，示例的源代码可以在 GitHub 上找到。头文件中的日期和分类信息需要从网页的元数据中获取，但目前提供的网页内容并没有包含这些信息。因此，我将使用网页的最后更新日期作为文章日期，并假设分类和标签可能与Java字符串操作和正则表达式相关。

以下是翻译的完整内容：

---
date: 2024-07-09
category:
  - Java字符串操作
  - 正则表达式
tag:
  - Java
  - 正则表达式
  - java.util.regex
  - java.util.Scanner
  - String split
head:
  - - meta
    - name: keywords
      content: Java, 字符串, 正则表达式, Pattern, Matcher, Scanner, split
---

# 在Java字符串中查找第一个嵌入的整数

在本教程中，我们将探讨不同的方法来查找字符串中的第一个整数出现。例如，给定字符串 "ba31dung123"，我们只想找到第一个嵌入的整数，即 31。我们将看到如何使用正则表达式和纯Java来实现这一点。

## 解决方案与正则表达式

正则表达式（regex）是一种强大的工具，可以根据特定模式匹配和操作字符串。它们提供了一种简洁的方式来指定字符串模式，我们可以使用它们来搜索特定的字符、单词或短语，替换文本以及根据特定规则验证字符串。

### 使用 Matcher 和 Pattern 类

java.util.regex 包提供了两个主要的类用于正则表达式的模式匹配：

- Matcher: 这个类提供了使用给定模式在字符串上执行各种匹配操作的方法。它是通过在 Pattern 实例上调用 matcher() 方法获得的。
- Pattern: 这个类代表一个编译后的正则表达式，并提供各种方法在字符串上执行匹配操作。我们通过调用 Pattern 类的 compile() 方法从正则表达式创建一个模式。

我们可以利用它们来查找字符串中的第一个整数出现：

```java
@Test
void whenUsingPatternMatcher_findFirstInteger() {
    String str = "ba31dung123";
    Matcher matcher = Pattern.compile("\\d+").matcher(str);
    matcher.find();
    int i = Integer.valueOf(matcher.group());
    Assertions.assertEquals(31, i);
}
```

我们使用表达式 `\\d+` 来匹配一个或多个连续的数字。

### 使用 Scanner

我们还可以使用 java.util.Scanner 类。这是一个解析输入数据的强大工具。首先，我们将使用它的 useDelimiter() 方法来删除所有非数字。之后，我们可以使用 nextInt() 方法逐个提取数字：

```java
@Test
void whenUsingScanner_findFirstInteger() {
    int i = new Scanner("ba31dung123").useDelimiter("\\D+").nextInt();
    Assertions.assertEquals(31, i);
}
```

正则表达式 `\\D+` 表示所有连续的非数字字符（与 `\\d+` 相反）。

### 使用 split()

Java 中的 split() 方法是一个 String 类方法。它根据指定的分隔符将字符串分割成子字符串，并返回子字符串的数组。分隔符可以是一个正则表达式或一个普通字符串：

```java
@Test
void whenUsingSplit_findFirstInteger() {
    String str = "ba31dung123";
    List`<String>` tokens = Arrays.stream(str.split("\\D+")).filter(s -> s.length() > 0).collect(Collectors.toList());
    Assertions.assertEquals(31, Integer.parseInt(tokens.get(0)));
}
```

我们使用了与前面相同的正则表达式。但是，这个解决方案如果字符串以分隔符开头，例如我们的情况，可能会给我们一个空的数组元素。因此，为了避免这种情况，我们使用 Java Stream API 和 filter() 方法过滤了我们的列表。

## 解决方案不使用正则表达式

我们看到正则表达式是解决这个问题的好方法，但我们也可以不使用它们。

让我们创建一个方法，从字符串中提取第一个整数：

```java
static Integer findFirstInteger(String s) {
    int i = 0;
    while (i < s.length() && !Character.isDigit(s.charAt(i))) {
        i++;
    }
    int j = i;
    while (j < s.length() && Character.isDigit(s.charAt(j))) {
        j++;
    }
    return Integer.parseInt(s.substring(i, j));
}
```

我们首先通过迭代字符串直到找到第一个数字。然后使用 isDigit() 方法来识别一个数字字符。接下来，我们存储第一个数字的索引在变量 i 中。然后，我们再次迭代直到找到我们的数字的结束（等于第一个非数字字符）。然后我们可以返回从 i 到 j 的子字符串。

让我们测试我们的 findFirstInteger() 方法：

```java
@Test
void whenUsingCustomMethod_findFirstInteger() {
    String str = "ba31dung123";
    Integer i = FirstOccurrenceOfAnInteger.findFirstInteger(str);
    Assertions.assertEquals(31, i);
}
```

## 结论

在这篇简短的文章中，我们探讨了从字符串中提取第一个嵌入整数的不同替代方案。我们看到正则表达式对于这个任务有多种应用，但我们也可以不使用它。

像往常一样，示例的源代码可以在 GitHub 上找到。

OK