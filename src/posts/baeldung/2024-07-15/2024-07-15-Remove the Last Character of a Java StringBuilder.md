---
date: 2022-04-01
category:
  - Java
  - StringBuilder
tag:
  - Java
  - StringBuilder
  - 删除字符
head:
  - - meta
    - name: keywords
      content: Java, StringBuilder, 删除最后一个字符
---
# 删除Java StringBuilder中的最后一个字符

当我们想在Java中构建一个字符串时，我们通常会选择方便的_StringBuilder_来完成这项工作。

假设我们有一个包含一些字符串片段的_StringBuilder_序列，我们想要从中删除最后一个字符。在这个快速教程中，我们将探索三种实现方法。

## 2. 使用_StringBuilder_的_deleteCharAt()_方法

_StringBuilder_类有一个_deleteCharAt()_方法。它允许我们删除指定位置的字符。

**_deleteCharAt()_方法只有一个参数：我们想要删除的字符索引。**

因此，如果我们将最后一个字符的索引传递给该方法，我们就可以删除该字符。为了简单起见，我们将使用单元测试断言来验证它是否按预期工作。

接下来，让我们创建一个测试来检查它是否有效：

```java
StringBuilder sb = new StringBuilder("使用sb.deleteCharAt()方法！");
sb.deleteCharAt(sb.length() - 1);
assertEquals("使用sb.deleteCharAt()方法", sb.toString());

```

正如上面的测试所示，我们传递最后一个字符的索引（_sb.length() -1_）给_deleteCharAt()_方法，并期望结尾的感叹号（_!_）被删除。

如果我们运行测试，它会通过。因此，_deleteCharAt()_解决了问题。

## 3. 使用_StringBuilder_的_replace()_方法

_StringBuilder_的_replace()_方法允许我们在序列的子字符串中用给定的字符串替换字符。该方法接受三个参数：

- _start_ 索引 - 开始索引，包含
- _end_ 索引 - 结束索引，不包含
- _replacement_ - 用于替换的字符串

假设序列中最后一个字符的索引是_lastIdx._ **如果我们想删除最后一个字符，我们可以将_lastIdx_作为开始索引，_lastIdx+1_作为结束索引，并将空字符串_“”_作为替换传递给_replace()_**：

```java
StringBuilder sb = new StringBuilder("使用sb.replace()方法！");
int last = sb.length() - 1;
sb.replace(last, last + 1, "");
assertEquals("使用sb.replace()方法", sb.toString());

```

现在，如果我们运行上面的测试，它会通过。因此，_replace()_方法可以用来解决问题。

## 4. 使用_StringBuilder_的_substring()_方法

我们可以使用_StringBuilder_的_substring()_方法来获取给定的字符串的子序列。该方法需要两个参数，开始索引（包含）和结束索引（不包含）。

值得一提的是，_substring()_方法返回一个新的_String_对象。换句话说，**_substring()_方法不会修改_StringBuilder_对象**。

我们可以将0作为开始索引，将最后一个字符的索引作为_结束_索引传递给_substring()_方法，以获取一个没有最后一个字符的字符串：

```java
StringBuilder sb = new StringBuilder("使用sb.substring()方法！");
assertEquals("使用sb.substring()方法", sb.substring(0, sb.length() - 1));
// stringBuilder对象没有改变
assertEquals("使用sb.substring()方法！", sb.toString());

```

如果我们执行测试，它会通过。

正如我们在测试中看到的，即使由_substring()_返回的_String_没有最后一个字符（_!_），原始的_StringBuilder_并没有改变。

## 5. 结论

在这篇简短的文章中，我们学习了如何从_StringBuilder_序列中删除最后一个字符。

像往常一样，这里展示的所有代码片段都可以在GitHub上找到。