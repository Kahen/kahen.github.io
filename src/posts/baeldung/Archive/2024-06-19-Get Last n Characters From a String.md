---
date: 2024-06-20
category:
  - Java
  - String Manipulation
tag:
  - substring
  - StringUtils
  - Stream API
head:
  - - meta
    - name: keywords
      content: Java, String, substring, StringUtils, Stream API
---
# 从字符串获取最后n个字符的几种方法

在本教程中，我们将探讨几种不同的方法来从字符串中获取最后n个字符。

假设我们有以下字符串，其值表示一个日期：

```java
String s = "10-03-2024";
```

从这个字符串中，我们想要提取年份。换句话说，我们只想要最后四个字符，所以n是：

```java
int n = 4;
```

### 2. 使用substring()方法

我们可以使用substring()方法的一个重载版本，该方法从beginIndex（包括）开始获取字符，并在endIndex（不包括）结束：

```java
@Test
void givenString_whenUsingTwoArgSubstringMethod_thenObtainLastNCharacters() {
    int beginIndex = s.length() - n;
    String result = s.substring(beginIndex, s.length());

    assertThat(result).isEqualTo("2024");
}
```

由于我们想要最后n个字符，我们首先通过从字符串的长度中减去n来确定beginIndex。最后，我们将endIndex简单地设置为字符串的长度。

由于我们只对最后n个字符感兴趣，我们可以利用substring()方法的更方便的重载版本，它只将beginIndex作为方法参数：

```java
@Test
void givenString_whenUsingOneArgSubstringMethod_thenObtainLastNCharacters() {
    int beginIndex = s.length() - n;

    assertThat(s.substring(beginIndex)).isEqualTo("2024");
}
```

这个方法返回从beginIndex（包括）开始到字符串末尾的字符。

最后，值得一提的是String类的subSequence()方法，它在后台使用substring()。尽管它可以用来解决我们的用例，但从可读性的角度来看，使用substring()方法更为合适。

### 3. 使用Apache Commons Lang 3中的StringUtils.right()方法

要使用Apache Commons Lang 3，我们需要将其依赖项添加到我们的pom.xml中：

```xml
`<dependency>`
    `<groupId>`org.apache.commons`</groupId>`
    `<artifactId>`commons-lang3`</artifactId>`
    `<version>`3.14.0`</version>`
`</dependency>`
```

我们可以使用StringUtils.right()方法来获取最后n个字符：

```java
@Test
void givenString_whenUsingStringUtilsRight_thenObtainLastNCharacters() {
    assertThat(StringUtils.right(s, n)).isEqualTo("2024");
}
```

在这里，我们只需要提供要处理的字符串和我们想要从字符串末尾返回的字符数。因此，这将是我们的用例的首选解决方案，因为我们消除了计算索引的需要，从而产生了更易于维护和无错误的代码。

### 4. 使用Stream API

现在，让我们探讨一下函数式编程解决方案可能是什么样子。

我们的Stream源的一个选项可能是使用chars()方法。该方法返回一个IntStream，其原始int元素表示字符串中的字符：

```java
@Test
void givenString_whenUsingIntStreamAsStreamSource_thenObtainLastNCharacters() {
    String result = s.chars()
      .mapToObj(c -> (char) c)
      .skip(s.length() - n)
      .map(String::valueOf)
      .collect(Collectors.joining());

    assertThat(result).isEqualTo("2024");
}
```

在这里，我们使用mapToObj()中间操作将每个int元素转换为Character对象。现在我们有了Character流，我们可以使用skip()操作来仅保留某个索引之后的元素。

接下来，我们使用String::valueOf方法引用的map()操作。我们将每个Character元素转换为String，因为我们想使用Collectors.joining()静态方法的终端collect()操作。

另一种函数式方法最初使用toCharArray()方法：

```java
@Test
void givenString_whenUsingStreamOfCharactersAsSource_thenObtainLastNCharacters() {
    String result = Arrays.stream(ArrayUtils.toObject(s.toCharArray()))
      .skip(s.length() - n)
      .map(String::valueOf)
      .collect(Collectors.joining());

    assertThat(result).isEqualTo("2024");
}
```

这个方法返回一个char原始数组。我们可以使用Apache Commons Lang 3中的ArrayUtils.toObject()将我们的数组转换为Character元素数组。最后，我们使用静态方法Arrays.stream()获得一个Character流。从这里开始，我们的逻辑保持不变，以获取最后n个字符。

正如我们上面看到的，使用函数式编程方法实现我们的目标需要做很多工作。这突显了只有在适当的时候才应该使用函数式编程。

### 5. 结论

在本文中，我们探讨了从字符串中获取最后n个字符的几种不同方法。我们强调了命令式方法比函数式方法提供了更简洁和易读的解决方案。**我们应该注意，本文中探索的从字符串中提取年份的示例仅用于演示目的。** 更合适的方法是将字符串解析为LocalDate并使用getYear()方法。

如往常一样，本文中使用的代码示例可在GitHub上找到。

文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。