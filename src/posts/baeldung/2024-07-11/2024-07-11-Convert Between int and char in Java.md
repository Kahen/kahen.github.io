---
date: 2022-04-01
category:
  - Java
tag:
  - int
  - char
  - 转换
head:
  - - meta
    - name: keywords
      content: Java, int, char, 转换
---
# Java中int与char类型转换

在本教程中，我们将了解如何在Java中将int转换为char以及如何反向转换。我们将简要讨论字符的表示方式，以便更好地理解文章后面的代码。

Java内部将每个char存储为16位的Unicode编码值：

| 字符 | 2字节 | 十进制（基数10） | 十六进制（基数16） |
| --- | --- | --- | --- |
| A | 00000000 01000001 | 65 | 41 |
| a | 00000000 01100001 | 61 | 97 |
| 1 | 00000000 00110001 | 49 | 31 |
| Z | 00000000 01011010 | 90 | 5A |

我们可以通过将char值强制转换为int来轻松检查这一点：

```java
assertEquals(65, (int)'A');
```

ASCII码是Unicode编码的一个子集，主要表示英文字母。

### 将int转换为char

假设我们有一个值为7的int变量，我们想将其转换为其char对应物‘7’。我们有几种方法可以做到这一点。

**简单地将其强制转换为char是不行的，因为这会将其转换为以二进制表示为0111的字符，这在UTF-16中是U+0007或字符‘BELL’。**

#### 3.1. 通过‘0’进行偏移

UTF-16中的字符以连续顺序表示。所以我们可以简单地将‘0’字符偏移7位以获得‘7’字符：

```java
@Test
public void givenAnInt_whenAdding0_thenExpectedCharType() {
    int num = 7;

    char c = (char)('0' + num);

    assertEquals('7', c);
}
```

#### 3.2. 使用Character.forDigit()方法

加‘0’有效，但看起来有点hackish。幸运的是，我们有一种更干净的方法，即使用Character.forDigit()方法：

```java
@Test
public void givenAnInt_whenUsingForDigit_thenExpectedCharType() {
    int num = 7;

    char c = Character.forDigit(num , 10);

    assertEquals('7', c);
}
```

我们可以注意到forDigit()方法接受第二个参数，基数（radix），它表示我们想要转换的数字的基数表示。在我们的例子中，是10。

#### 3.3. 使用Integer.toString()方法

我们可以使用包装类Integer，它有一个toString()方法，将给定的int转换为其字符串表示。当然，这可以用于将多位数字转换为String。但是，我们也可以通过链接charAt()方法并选择第一个char来将其转换为单个数字的char：

```java
@Test
public void givenAnInt_whenUsingToString_thenExpectedCharType() {
    int num = 7;

    char c = Integer.toString(num).charAt(0);

    assertEquals('7', c);
}
```

### 将char转换为int

之前，我们看到了如何将int转换为char。让我们看看如何获得char的int值。正如我们所预期的，**将char强制转换为int是不行的，因为这会给我们字符的UTF-16编码的十进制表示：**

```java
@Test
public void givenAChar_whenCastingFromCharToInt_thenExpectedUnicodeRepresentation() {

    char c = '7';

    assertEquals(55, (int) c);
}
```

#### 4.1. 减去‘0’

如果我们通过加‘0’得到char，那么相反地通过减去‘0’的十进制值，我们应该得到int：

```java
@Test
public void givenAChar_whenSubtracting0_thenExpectedNumericType() {

    char c = '7';

    int n = c - '0';

    assertEquals(7, n);
}
```

这确实有效，但有更好的、更简单的方法可以做到这一点。

#### 4.2. 使用Character.getNumericValue()方法

Character类再次提供了另一个辅助方法getNumericValue()，它基本上做了它所说的：

```java
@Test
public void givenAChar_whenUsingGetNumericValue_thenExpectedNumericType() {

    char c = '7';

    int n = Character.getNumericValue(c);

    assertEquals(7, n);
}
```

#### 4.3. 使用Integer.parseInt()

我们可以使用Integer.parseInt()将String转换为数字表示。正如之前一样，虽然我们可以使用它将整个多位数转换为int表示，但我们也可以使用它来转换单个数字：

```java
@Test
public void givenAChar_whenUsingParseInt_thenExpectedNumericType() {

    char c = '7';

    int n = Integer.parseInt(String.valueOf(c));

    assertEquals(7, n);
}
```

确实，语法有点繁琐，主要是因为它涉及多次转换，但它按预期工作。

### 结论

在本文中，我们学习了Java中字符的内部表示方式，以及如何将int转换为char以及如何反向转换。

如往常一样，本文的完整代码示例可以在GitHub上找到。