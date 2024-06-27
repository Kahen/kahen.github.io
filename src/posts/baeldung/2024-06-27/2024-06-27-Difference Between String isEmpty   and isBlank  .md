---
date: 2024-06-27
category:
  - Java
  - 编程
tag:
  - String
  - isEmpty
  - isBlank
head:
  - - meta
    - name: keywords
      content: Java, String, isEmpty, isBlank, 空白字符, 空字符串
---

# Java中String的isEmpty()与isBlank()的区别

1. 引言

在Java中使用_Strings_有时会令人困惑，因为我们有多种方法来完成相似的事情。

本文将探讨如何使用isEmpty()和isBlank()方法来验证空白和空的_Strings_。尽管这两种方法相似，但它们并不相同。

2. 看看String.isEmpty()

让我们从isEmpty()这个String操作开始。简单来说，isEmpty()方法如果String为空，则返回true；否则返回false。

内部地，isEmpty()依赖于表示String对象文本的字节数组的长度。**此外，isEmpty()方法计算文本是否为空时会计算任何类型的字符**。因此，空格、制表符、新行或任何可以表示为一个字节的字符都被视为有效字符。

让我们通过一个简单的测试来说明这一点：

```java
@Test
public void givenString_whenCallIsEmpty_thenReturnCorrectValues() {
    assertFalse("Example text".isEmpty());
    assertTrue("").isEmpty();
    assertFalse("  ".isEmpty());
    assertFalse("\t\n\r\f".isEmpty());
}
```

众所周知，第一行测试的String包含字符，所以isEmpty()返回false。

另一方面，第二个String不包含任何字符，因此isEmpty()返回true。

最后，对于只有空白字符的String和第3和第4行的转义字符，isEmpty()返回false。

3. 查看Java 11的String.isBlank()

**isBlank()方法在Java 11中引入，与isEmpty()相同，区别在于它还会对只包含空白字符的String返回true**。

Java中认为的五个空白字符是_\s_（空格）和_\t, \n, \r, 和 \f_转义序列。

在幕后，isBlank()方法搜索第一个非空白字符的索引。如果没有非空白字符，那个索引将等于数组的长度。最后，它将该索引与字节数组的长度进行比较，以输出正确的答案。

让我们通过一个单元测试来检查这一点：

```java
@Test
public void givenString_whenCallStringIsBlank_thenReturnCorrectValues() {
    assertFalse("Example text".isBlank());
    assertTrue("").isBlank();
    assertTrue("  ".isBlank());
    assertTrue("\t\n\r\f ".isBlank());
}
```

值得注意的是，“Example text”被认为是非空白的，因为它至少包含一个非空白字符。

此外，第二个String不包含任何字符，所以它是空白的。

第三行的String只有空白字符，所以isBlank()返回true。

最后一行的String包含所有被认为是空白的转义序列字符。因此，在这种情况下，isBlank()也返回true。

4. 比较isBlank()与isEmpty()

总结来说，isEmpty()仅在String不包含任何字符时返回true。相比之下，isBlank()在String不包含任何字符且其所有字符都是空白字符时返回true。

让我们用一个表格来可视化前几节描述的情况中isEmpty()和isBlank()的所有返回值。

| 方法 | 没有字符 | \t | \n | \r | \f | 空格(\s) | 其他任何 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| isEmpty() | true | false | false | false | false | false | false |
| isBlank() | true | true | true | true | true | true | false |

上述表格总结了如果String不包含任何字符，两种方法都返回true。

此外，转义序列_\t_, _\n_, _\r_, _\f_和_\s_被认为是空白字符，所以只有isBlank()返回true。相比之下，isEmpty()对它们都返回true。

最后，对于表中未显示的任何其他字符，两种方法都返回false。

在Java 11之前，开发人员通常使用_String.trim()_和_String.isEmpty()_的组合来验证文本是否只包含空白字符。然而，正如我们在本教程中看到的，在Java 11或更高版本中使用的应用，我们可以简化为只使用String.isBlank()。

5. 结论

在本教程中，我们看到了isBlank()与isEmpty()之间的区别。**关键的区别在于isBlank()对于像一些转义序列这样的空白字符返回true**。**另一方面，isEmpty()仅在String不包含任何字符时返回true**。

如常，你可以在GitHub上找到源代码。
OK