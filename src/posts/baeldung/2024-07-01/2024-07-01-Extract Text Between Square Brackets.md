---
date: 2022-04-01
category:
  - Java
  - 正则表达式
tag:
  - 文本处理
  - 正则表达式
head:
  - - meta
    - name: keywords
      content: Java, 正则表达式, 文本处理, 提取方括号内文本
---
# Java中提取方括号内的内容

提取特定模式内的内容是文本处理中常见的需求。有时，处理使用方括号来封装有价值信息的数据时，提取方括号内的文字可能对我们来说是一个挑战。

在本教程中，我们将探讨提取方括号内容的技术和方法。

## 2. 问题介绍

首先，为了简化问题，让我们对问题提出两个先决条件：

- **没有嵌套的方括号对** - 例如，像“..[value1 [value2]]..”这样的模式不会作为我们的输入。
- **方括号总是正确配对** - 例如，“..[value1 …”是无效的输入。

在讨论被方括号包围的输入数据时，我们会遇到两种可能的情况：
- 输入包含单个方括号对，如“..[value]...”。
- 输入包含多个方括号对，由“..[value1]...[value2]...[value3]…”示例说明。

接下来，我们将首先关注解决单个对场景，然后我们将调整解决方案以适应涉及多对方括号对的情况。在本教程中，**我们将主要使用Java正则表达式（regex）来解决这些挑战。**

## 3. 输入包含单个方括号对

假设我们有以下文本输入：

```java
String INPUT1 = "some text [THE IMPORTANT MESSAGE] something else";
```

如我们所见，输入只包含一对方括号，我们的目标是获取它们之间的文本：

```java
String EXPECTED1 = "THE IMPORTANT MESSAGE";
```

接下来，让我们看看如何实现这一点。

### 3.1. 直接使用\[.*\]的思想

直接解决这个问题的方法是提取'\['和'\]'字符之间的内容。因此，我们可能会想到正则表达式模式“\[.*\]”。

然而，我们不能直接在代码中使用这个模式，因为**正则表达式使用'\['和'\]'用于字符类定义。**例如，“[0-9]”类匹配任何数字字符。我们必须转义它们以**匹配字面的'\['或'\]'。**

此外，我们的任务是提取而不是匹配。因此，我们可以将目标匹配放在一个捕获组中，这样以后引用和提取就更容易了：

```java
String result = null;
String rePattern = "\\[(.*)\\]";
Pattern p = Pattern.compile(rePattern);
Matcher m = p.matcher(INPUT1);
if (m.find()) {
    result = m.group(1);
}
assertThat(result).isEqualTo(EXPECTED1);
```

敏锐的眼睛可能会注意到我们只在上述代码中转义了开括号'\['。这是因为，对于括号和花括号，**如果一个闭合括号或花括号没有在其对应的开括号之前，正则表达式引擎将其解释为字面量。**在我们的示例中，我们转义了'\\["，所以'\]'没有被任何开括号'\['前导。因此，'\]'将被视为字面的'\]'字符。

### 3.2. 使用NOR字符类

我们已经通过提取'\['和'\]'之间的“一切”解决了问题。这里的“一切”由不是'\]'的字符组成。

正则表达式支持NOR类。例如，“[^0-9]”匹配任何非数字字符。因此，我们可以通过使用正则表达式NOR类来优雅地解决这个问题，结果是模式“\[([^]]*)\]”：

```java
String result = null;
String rePattern = "\\[([^]]*)\\]";
Pattern p = Pattern.compile(rePattern);
Matcher m = p.matcher(INPUT1);
if (m.find()) {
    result = m.group(1);
}
assertThat(result).isEqualTo(EXPECTED1);
```

### 3.3. 使用split()方法

Java提供了强大的String.split()方法来将输入字符串拆分成片段。split()支持正则表达式作为分隔符。接下来，让我们看看我们的问题是否可以通过split()方法解决。

考虑“prefix[value]suffix”的场景。如果我们将'\['或'\]'指定为分隔符，split()将产生一个数组：{“prefix”，“value”，“suffix”}。下一步相对简单。我们可以简单地从数组中取出中间元素作为结果：

```java
String[] strArray = INPUT1.split("\\[\\]");
String result = strArray.length == 3 ? strArray[1] : null;
assertThat(result).isEqualTo(EXPECTED1);
```

在上述代码中，我们确保在取出数组的第二个元素之前，split()的结果应该始终有三个元素。

当我们运行测试时，测试通过。然而，**如果输入以'\]'结尾，这个解决方案可能会失败：**

```java
String[] strArray = "[THE IMPORTANT MESSAGE]".split("\\[\\]");
assertThat(strArray).hasSize(2)
  .containsExactly("", "THE IMPORTANT MESSAGE");
```

正如上述测试所示，我们的输入这次没有“prefix”和“suffix”。默认情况下，**split()丢弃尾随的空字符串**。为了解决这个问题，我们可以**向split()传递一个负的limit，告诉split()保留空字符串元素：**

```java
strArray = "[THE IMPORTANT MESSAGE]".split("\\[\\]", -1);
assertThat(strArray).hasSize(3)
  .containsExactly("", "THE IMPORTANT MESSAGE", "");
```

因此，我们可以改变我们的解决方案以覆盖这个边缘情况：

```java
String[] strArray = INPUT1.split("\\[\\]", -1);
String result = strArray.length == 3 ? strArray[1] : null;
...
```

## 4. 输入包含多个方括号对

解决了单个“\[..\]”对的案例后，将解决方案扩展到处理多个“\[..\]”对的案例对我们来说不会是一个挑战。让我们以一个新的输入示例为例：

```java
final String INPUT2 = "[La La Land], [The last Emperor], and [Life of Pi] are all great movies.";
```

接下来，让我们从中提取三个电影标题：

```java
final List````<String>```` EXPECTED2 = Lists.newArrayList("La La Land", "The last Emperor", "Life of Pi");
```

### 4.1. 非贪婪版本的\[(.*)\]思想

模式“\[(.*)\]”有效地促进了从单个“\[..\]”对中提取所需内容。但这不会适用于包含多个“\[..\]”对的输入。这是因为**正则表达式默认进行贪婪匹配**。换句话说，如果我们用“\[(.*)\]”匹配INPUT2，捕获组将包含第一个'\['和最后一个'\]'之间的文本：“La La Land\], [The last Emperor], [Life of Pi”。

然而，**我们可以在'*'后添加一个'?'以确保正则表达式进行非贪婪匹配**。此外，由于我们将提取多个目标值，让我们将if (m.find())更改为while循环：

```java
List````<String>```` result = new ArrayList<>();
String rePattern = "\\[(.*?)\\]";
Pattern p = Pattern.compile(rePattern);
Matcher m = p.matcher(INPUT2);
while (m.find()) {
    result.add(m.group(1));
}
assertThat(result).isEqualTo(EXPECTED2);
```

### 4.2. 使用字符类

**NOR字符类解决方案也适用于包含多个“\[..\]”对的输入**。我们只需要将_if_语句更改为_while_循环：

```java
List````<String>```` result = new ArrayList<>();
String rePattern = "\\[([^]]*)\\]";
Pattern p = Pattern.compile(rePattern);
Matcher m = p.matcher(INPUT2);
while (m.find()) {
    result.add(m.group(1));
}
assertThat(result).isEqualTo(EXPECTED2);
```

### 4.3. 使用split()方法

对于包含多个“\[..\]”的输入，如果我们使用相同的正则表达式进行_split()_，**结果数组应该有多于三个的元素**。因此，我们不能简单地取出中间的（索引=1）：

```java
Input: "---[value1]---[value2]---[value3]---"
Array: "---", "value1",  "---", "value2", "---", "value3", "---"
Index:  [0]     [1]       [2]      [3]     [4]      [5]     [6]
```

然而，如果我们看看索引，我们会发现**所有奇数索引的元素都是我们的目标值**。因此，我们可以编写一个循环来从split()的结果中获取所需的元素：

```java
List````<String>```` result = new ArrayList<>();
String[] strArray = INPUT2.split("\\[\\]" -1);
for (int i = 1; i < strArray.length; i += 2) {
    result.add(strArray[i]);
}
assertThat(result).isEqualTo(EXPECTED2);
```

## 5. 结论

在本文中，我们学习了如何在Java中提取方括号之间的文本。我们学习了不同的与正则表达式相关的解决方法来应对挑战，有效地处理了两种问题场景。

如常，示例的完整源代码可在GitHub上获得。
---