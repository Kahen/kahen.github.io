---
date: 2022-04-01
category:
  - Java
  - String
tag:
  - split
  - whitespace
head:
  - - meta
    - name: keywords
      content: Java, String, split, whitespace
---
# Java中按空白字符分割字符串的指南

在Java中，一个_String_可以被视为多个子字符串的连接。此外，使用空白字符作为分隔符来构建和存储一系列子字符串到一个单独的字符串中是很常见的做法。

在本教程中，我们将**学习如何通过空白字符，例如空格、制表符或换行符，来分割一个_String_**。

## 2. _String_ 示例

首先，我们需要构建一些_String_示例，这些示例可以作为按空白字符分割的输入。所以，让我们首先**定义一些空白字符作为_String_常量**，以便我们可以方便地重复使用它们：

```
String SPACE = " ";
String TAB = "\t";
String NEW_LINE = "\n";
```

接下来，让我们使用这些作为分隔符来定义包含不同水果名称的_String_示例：

```
String FRUITS_TAB_SEPARATED = "Apple" + TAB + "Banana" + TAB + "Mango" + TAB + "Orange";
String FRUITS_SPACE_SEPARATED = "Apple" + SPACE + "Banana" + SPACE + "Mango" + SPACE + "Orange";
String FRUITS_NEWLINE_SEPARATED = "Apple" + NEW_LINE + "Banana" + NEW_LINE + "Mango" + NEW_LINE + "Orange";
```

最后，我们还将**编写_verifySplit()_方法，我们将重用此方法来验证通过空白字符分割这些字符串的预期结果**：

```
private void verifySplit(String[] fruitArray) {
    assertEquals(4, fruitArray.length);
    assertEquals("Apple", fruitArray[0]);
    assertEquals("Banana", fruitArray[1]);
    assertEquals("Mango", fruitArray[2]);
    assertEquals("Orange", fruitArray[3]);
}
```

现在我们已经构建了输入字符串，我们准备探索不同的策略来分割这些字符串并验证分割。

## 3. 使用分隔符正则表达式分割

**_String_类的_split()_方法是分割字符串的事实标准**。它接受一个分隔符正则表达式，并产生分割到一个_String_数组中：

```
String[] split(String regex);
```

首先，让我们通过一个单独的空格字符来分割_FRUITS_SPACE_SEPARATED_字符串：

```
@Test
public void givenSpaceSeparatedString_whenSplitUsingSpace_shouldGetExpectedResult() {
    String fruits = FRUITS_SPACE_SEPARATED;
    String[] fruitArray = fruits.split(SPACE);
    verifySplit(fruitArray);
}
```

同样，我们可以使用_TAB_和_NEW_LINE_分别作为分隔符正则表达式来分割_FRUITS_TAB_SEPARATED_和_FRUITS_NEWLINE_SEPARATED_。

接下来，让我们尝试使用一个更通用的正则表达式来表示空格、制表符和换行符，并**使用相同的正则表达式分割所有的字符串样本**：

```
@Test
public void givenWhiteSpaceSeparatedString_whenSplitUsingWhiteSpaceRegex_shouldGetExpectedResult() {
    String whitespaceRegex = SPACE + "|" + TAB + "|" + NEW_LINE;
    String[] allSamples = new String[] { FRUITS_SPACE_SEPARATED, FRUITS_TAB_SEPARATED, FRUITS_NEWLINE_SEPARATED };
    for (String fruits : allSamples) {
        String[] fruitArray = fruits.split(whitespaceRegex);
        verifySplit(fruitArray);
    }
}
```

到目前为止，看起来我们已经做对了！

最后，让我们**简化我们的方法，使用空白字符的元字符( _\\s_ )**，它本身代表所有类型的空白字符：

```
@Test
public void givenNewlineSeparatedString_whenSplitUsingWhiteSpaceMetaChar_shouldGetExpectedResult() {
    String whitespaceMetaChar = "\\s";
    String[] allSamples = new String[] { FRUITS_SPACE_SEPARATED, FRUITS_TAB_SEPARATED, FRUITS_NEWLINE_SEPARATED };
    for (String fruits : allSamples) {
        String[] fruitArray = fruits.split(whitespaceMetaChar);
        verifySplit(fruitArray);
    }
}
```

我们应该注意到，使用_\\s_元字符比创建我们自己的空白正则表达式更方便和可靠。此外，如果我们的输入字符串可以有多个空白字符作为分隔符，那么我们可以不改变其余代码而使用_\\s+_而不是_\\s_。

## 4. 使用_StringTokenizer_分割

**按空白字符分割字符串是如此常见的用例，以至于许多Java库都提供了一个接口来实现这一点，而不需要显式指定分隔符**。在本节中，让我们学习如何使用_StringTokenizer_来解决这个用例：

```
@Test
public void givenSpaceSeparatedString_whenSplitUsingStringTokenizer_shouldGetExpectedResult() {
    String fruits = FRUITS_SPACE_SEPARATED;
    StringTokenizer tokenizer = new StringTokenizer(fruits);
    String[] fruitArray = new String[tokenizer.countTokens()];
    int index = 0;
    while (tokenizer.hasMoreTokens()) {
        fruitArray[index++] = tokenizer.nextToken();
    }
    verifySplit(fruitArray);
}
```

我们可以看到我们没有提供任何分隔符，因为_StringTokenizer_默认使用空白分隔符。此外，**代码遵循迭代器设计模式，其中_hasMoreTokens()_方法决定了循环终止条件，_nextToken()_给出了下一个分割**。

此外，我们应该注意到我们使用了_countTokens()_方法来预先确定分割的数量。然而，如果我们想按顺序一次消费结果分割，这并不是必须的。通常，**当我们想要在输入字符串很长时立即获取下一个分割而不需要等待整个分割过程完成时，我们应该使用这种方法**。

## 5. 使用Apache Commons分割

**_org.apache.commons.lang3_包中的_StringUtils_类提供了一个_split()_实用方法来分割一个_String_**。像_StringTokenizer_类一样，它使用空白作为默认的字符串分割分隔符：

```
public static String[] split(String str);
```

让我们首先在项目的_pom.xml_文件中添加_commons-lang3_依赖项：

```
`<dependency>`
    `<groupId>`org.apache.commons`</groupId>`
    `<artifactId>`commons-lang3`</artifactId>`
`</dependency>`
```

接下来，让我们通过分割_String_样本来看到这一点：

```
@Test
public void givenWhiteSpaceSeparatedString_whenSplitUsingStringUtils_shouldGetExpectedResult() {
    String[] allSamples = new String[] { FRUITS_SPACE_SEPARATED, FRUITS_TAB_SEPARATED, FRUITS_NEWLINE_SEPARATED };
    for (String fruits : allSamples) {
        String[] fruitArray = StringUtils.split(fruits);
        verifySplit(fruitArray);
    }
}
```

**使用_StringUtils_类的_split()_实用方法的一个优点是调用者不需要显式执行空值检查**。这是因为_split()_方法优雅地处理了这一点。让我们继续并看到这一点：

```
@Test
public void givenNullString_whenSplitUsingStringUtils_shouldReturnNull() {
    String fruits = null;
    String[] fruitArray = StringUtils.split(fruits);
    assertNull(fruitArray);
}
```

正如预期的那样，该方法对_null_输入返回_null_值。

## 6. 结论

在本教程中，**我们学习了多种按空白字符分割字符串的方法**。此外，我们还注意到了与某些策略相关的一些优点和推荐的最佳实践。

一如既往，教程的完整源代码可在GitHub上获得。