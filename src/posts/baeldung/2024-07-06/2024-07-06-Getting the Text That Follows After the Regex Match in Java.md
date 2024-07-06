---
date: 2022-04-01
category:
  - Java
  - Regex
tag:
  - Java
  - Regex
  - Text Extraction
head:
  - - meta
    - name: keywords
      content: Java, Regex, Text Extraction, Baeldung
---
# 在Java中使用正则表达式获取匹配后的文本

---

当在Java中处理文本数据时，通常需要使用正则表达式（也称为Regex）来提取特定的信息片段。然而，仅仅匹配正则表达式模式并不总是足够的。有时，我们可能需要提取正则表达式匹配后的文本。

在本教程中，我们将探讨如何在Java中实现这一点。

## 2. 问题介绍

首先，让我们通过一个例子快速理解问题。假设我们有一个字符串变量`INPUT1`：

```java
static String INPUT1 = "Some text, targetValue=Regex is cool";
```

以`INPUT1`作为输入，我们的目标是获取“targetValue=”后的文本，即“Regex is cool”。

因此，在这个例子中，**如果我们写一个正则表达式模式来匹配“targetValue=”，我们必须提取匹配后的所有内容**。然而，问题可能有变体。让我们看看另一个输入变量：

```java
static String INPUT2 = "Some text. targetValue=Java is cool. some other text";
```

如上例`INPUT2`所示，输入文本中仍然有“targetValue=”，但这次我们不想获取匹配后的所有内容。相反，我们想从匹配后的文本中提取“Java is cool”。换句话说，**我们需要提取匹配到第一个句号之前的所有文本**。实际上，句号字符可能是各种模式。

接下来，我们将探索解决这个问题的不同方法。当然，我们将涵盖`INPUT1`和`INPUT2`的情况。

我们将使用单元测试断言来验证解决方案是否可以提取预期的结果。同样，为了简单起见，我们将跳过输入验证部分，例如检查输入字符串是否包含正则表达式模式。

现在，让我们看看它们是如何工作的。

## 3. 使用`split()`方法

标准的`split()`方法允许我们通过分隔符将一个字符串分割成多个字符串作为一个数组。此外，分隔符可以是正则表达式模式。

因此，要解决`INPUT1`问题，**我们可以简单地使用“targetValue=”作为模式来分割输入字符串。然后，结果数组中的第二个元素将是结果**：

```java
"Some text, targetValue=Regex is cool" --split by "targetValue="--> [ "Some text, ", "Regex is cool" ]
```

现在，让我们实现这个想法并检查它是否有效：

```java
String result1 = INPUT1.split("targetValue=")[1];
assertEquals("Regex is cool", result1);
```

如果我们运行测试，它将通过。因此，“split和take”解决了`INPUT1`问题。

在上面的测试中，我们直接访问数组元素而没有先检查长度。这是因为我们假设输入是有效的，正如我们之前提到的。然而，如果我们在实际项目中工作，**在访问数组元素之前检查长度**是一个好的实践，以避免`ArrayIndexOutOfBoundsException`。

接下来，让我们看看`INPUT2`的情况。一个可能的想法是使用“targetValue=”或字面点作为`split()`方法的正则表达式模式。然后，我们仍然可以从数组结果中获取第二个元素。

然而，这个想法对我们的`INPUT2`不起作用，因为输入在“targetValue=”之前有另一个点：`INPUT2 = "Some text. targetValue=..."`。

如果我们调用“targetValue=”模式1和“.”字符模式2，在现实世界中，**我们不能预测在文本中`pattern1`之前存在多少`pattern2`匹配**。因此，简单的“split和take”方法在这里不起作用。

然而，**我们可以两次分割输入来获取目标值**：

```java
"Some text. targetValue=Java is cool. some other text"
Split by "targetValue=" --->
[ "Some text. ", "Java is cool. some other text" ]
Take the second element and split by "." --->
[ "Java is cool", " some other text" ]

The first element is the result
```

所以接下来，让我们在测试中应用这个方法：

```java
String afterFirstSplit = INPUT2.split("targetValue=")[1];
assertEquals("Java is cool. some other text", afterFirstSplit);
String result2 = afterFirstSplit.split("[.]")[0];
assertEquals("Java is cool", result2);
```

值得一提的是，句号字符在正则表达式中有特殊含义（匹配任何字符）。因此，在第二个`split()`调用中，`afterFirstSplit.split("[.]")[0]`，**我们必须将句号字符放在字符类中或转义它（"\\\\."）**。否则，每个字符都将成为`split()`方法的分隔符，我们将得到一个空数组：

```java
// if we use the dot as the regex for splitting, the result array is empty
String[] splitByDot = INPUT2.split("targetValue=")[1].split(".");
assertEquals(0, splitByDot.length);
```

## 4. 使用`replaceAll()`方法

像`split()`方法一样，`replaceAll()`方法也支持正则表达式模式。我们可以使用`replaceAll()`将我们不需要的文本替换为空字符串以获得预期的结果。

例如，要解决`INPUT1`问题，我们可以将直到`“targetValue=”`（包括）的所有内容替换为空字符串：

```java
String result1 = INPUT1.replaceAll(".*targetValue=", "");
assertEquals("Regex is cool", result1);
```

类似于`split()`解决方案，**我们可以两次调用`replaceAll()`方法来解决`INPUT2`问题**：

```java
String afterFirstReplace = INPUT2.replaceAll(".*targetValue=", "");
assertEquals("Java is cool. some other text", afterFirstReplace);
String result2 = afterFirstReplace.replaceAll("[.].*", "");
assertEquals("Java is cool", result2);
```

## 5. 使用捕获组

Java正则表达式API允许我们在模式中定义捕获组。正则表达式引擎将为捕获组附加索引号码，以便我们可以使用这些索引来引用这些组。

接下来，让我们看看如何使用捕获组解决`INPUT1`问题：

```java
Pattern p1 = Pattern.compile("targetValue=(.*)");
Matcher m1 = p1.matcher(INPUT1);
assertTrue(m1.find());
String result1 = m1.group(1);
assertEquals("Regex is cool", result1);
```

正如我们在上面的测试中看到的，我们创建了正则表达式模式“targetValue=(.*)”。因此，“targetValue=”之后的所有内容都在一个捕获组中。进一步地说，由于这是模式中的第一个组，它有索引号1。因此，**在调用`Pattern.matcher()`之后，我们可以通过调用`matcher.group(1)`来获取组中的文本**。

对于`INPUT2`案例，我们不会将“targetValue=”之后的所有内容都放入组中。相反，我们可以使组包含直到第一个句号的所有内容，使用非字符类“[^.]*”。接下来，让我们看看它在实践中的表现：

```java
Pattern p2 = Pattern.compile("targetValue=([^.]*)");
Matcher m2 = p2.matcher(INPUT2);
assertTrue(m2.find());
String result2 = m2.group(1);
assertEquals("Java is cool", result2);
```

或者，我们可以使用非贪婪量词‘*?’来实现相同的目标：

```java
Pattern p3 = Pattern.compile("targetValue=(.*?)[.]");
Matcher m3 = p3.matcher(INPUT2);
assertTrue(m3.find());
String result3 = m3.group(1);
assertEquals("Java is cool", result3);
```

当我们处理`INPUT2`案例时，`split()`和`replaceAll()`方法需要两个步骤来完成工作。正如我们所看到的，**使用正则表达式的捕获组，我们可以一次性解决`INPUT2`问题**。

## 6. 使用零宽断言

Java正则表达式API支持零宽断言。当我们想要基于周围字符匹配一个模式，而实际上不包括这些字符在匹配中时，零宽断言非常有用。

接下来，让我们探索如何使用零宽断言解决`INPUT1`案例：

```java
Pattern p1 = Pattern.compile("(?<=targetValue=).*");
Matcher m1 = p1.matcher(INPUT1);
assertTrue(m1.find());
String result1 = m1.group();
assertEquals("Regex is cool", result1);
```

正如上面的代码所示，**我们使用了正则表达式模式中的正向后发断言：“(?<=targetValue=).*”**。它匹配出现在字符串“targetValue=”之后的任何字符。

类似地，我们可以将“.”更改为非字符类“[^.]”来解决`INPUT2`案例：

```java
Pattern p2 = Pattern.compile("(?<=targetValue=)[^.]*");
Matcher m2 = p2.matcher(INPUT2);
assertTrue(m2.find());
String result2 = m2.group();
assertEquals("Java is cool", result2);
```

或者，**我们可以使用**正向后发断言和正向先行断言来提取我们需要的文本**：

```java
Pattern p3 = Pattern.compile("(?<=targetValue=).*(?=[.])");
Matcher m3 = p3.matcher(INPUT2);
assertTrue(m3.find());
String result3 = m3.group();
assertEquals("Java is cool", result3);
```

在上面的代码中：

- `(?<=targetValue=)` 是我们在解决`INPUT1`问题时看到的正向后发断言。
- `(?=[.])` 是正向先行断言。

因此，`"(?<=targetValue=).*(?=[.])"` 匹配“targetValue=”和句号字符之间的任何字符，这正是我们追求的结果。

## 7. 结论

在本文中，**我们探讨了提取正则表达式匹配后文本的两种变体问题**。一种返回匹配正则表达式之后的所有内容，另一种返回在一个正则表达式匹配之后但在第二个不同的正则表达式匹配之前的所有内容。

此外，我们通过示例学习了解决这两种场景的四种不同方法。

像往常一样，这里展示的所有代码片段都可以在GitHub上找到。

[Baeldung Logo](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)[Gravatar Image](https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&r=g)[Eric Martin Image](https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg)[Announcement Icon](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)[REST API Post Footer Image](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)[Spring Boot Logo](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK