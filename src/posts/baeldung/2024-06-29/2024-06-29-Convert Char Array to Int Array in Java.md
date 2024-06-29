---
date: 2024-06-29
category:
  - Java
  - Programming
tag:
  - char array
  - int array
  - Java 7
  - Java 8
  - Stream API
head:
  - - meta
    - name: keywords
      content: Java, char to int, Character class, Stream API, parseInt
------
# Java中将字符数组转换为整数数组

在这篇简短的教程中，我们将探索在Java中将字符数组转换为整数数组的不同方法。

首先，我们将使用Java 7中的方法和类。然后，我们将看到如何使用Java 8的Stream API来实现相同的目标。

### 2.1 使用Character类的getNumericValue()方法

这个方法提供了一种直接且简洁的方式来返回给定字符的整数值。例如，字符‘6’将返回6。

让我们看看实际操作：

```java
int[] 使用GetNumericValue方法(char[] chars) {
    if (chars == null) {
        return null;
    }

    int[] ints = new int[chars.length];
    for (int i = 0; i `< chars.length; i++) {
        ints[i] = Character.getNumericValue(chars[i]);
    }

    return ints;
}
```

如我们所见，我们遍历了字符数组。然后，我们调用getNumericValue()来获取每个字符的整数值。

**一个重要的警告是，如果指定的字符没有任何整数值，则返回-1代替。**

请记住，我们可以将我们的传统循环以更函数式的方式重写：

```java
Arrays.setAll(ints, i ->` Character.getNumericValue(chars[i]));
```

现在，让我们添加一个测试用例：

```java
@Test
void 给定字符数组_when使用GetNumericValue方法_应返回整数数组() {
    int[] expected = { 2, 3, 4, 5 };
    char[] chars = { '2', '3', '4', '5' };
    int[] result = CharArrayToIntArrayUtils.使用GetNumericValue方法(chars);

    assertArrayEquals(expected, result);
}
```

### 2.2 使用Character类的digit()方法

通常，digit(char ch, int radix)是另一种我们可以用来解决我们中心问题的方法。这个方法根据指定的基数返回给定字符的数值。

现在，让我们举例说明如何使用digit()将字符数组转换为整数数组：

```java
int[] 使用Digit方法(char[] chars) {
    int[] ints = new int[chars.length];
    for (int i = 0; i `< chars.length; i++) {
        ints[i] = Character.digit(chars[i], 10);
    }

    return ints;
}
```

**简而言之，最常见的基数是10，它表示十进制系统（0-9）。例如，在基数10中，字符‘7’简单地等于7。**

最后，我们将创建另一个测试用例来确认我们的方法：

```java
@Test
void 给定字符数组_when使用Digit方法_应返回整数数组() {
    int[] expected = { 1, 2, 3, 6 };
    char[] chars = { '1', '2', '3', '6' };
    int[] result = CharArrayToIntArrayUtils.使用Digit方法(chars);

    assertArrayEquals(expected, result);
}
```

### 3. 使用Stream API

另外，我们可以使用Stream API来处理字符数组到整数数组的转换。让我们在实践中看看：

```java
int[] 使用StreamApi方法(char[] chars) {

    return new String(chars).chars()
      .map(c ->` c - 48)
      .toArray();
}
```

如上所示，我们从字符数组创建了一个String对象。然后，我们使用chars()和map()方法将每个字符转换为整数值。

**请注意，字符‘0’在ASCII中是48，‘1’是49，依此类推。因此，‘0’ - 48等于0，依此类推。这就是为什么减去48将字符‘0’..’9’转换为值0..9的原因。**

接下来，让我们添加另一个测试用例：

```java
@Test
void 给定字符数组_when使用StreamApi_应返回整数数组() {
    int[] expected = { 9, 8, 7, 6 };
    char[] chars = { '9', '8', '7', '6' };
    int[] result = CharArrayToIntArrayUtils.使用StreamApi方法(chars);

    assertArrayEquals(expected, result);
}
```

### 4. 使用Integer类的parseInt()方法

parseInt()是另一个在将字符转换为整数时需要考虑的极佳选项。这个方法让我们得到给定字符串的原始整数值：

```java
int[] 使用ParseInt方法(char[] chars) {

    int[] ints = new int[chars.length];
    for (int i = 0; i < chars.length; i++) {
        ints[i] = Integer.parseInt(String.valueOf(chars[i]));
    }

    return ints;
}
```

在这里，我们需要先将每个字符转换为字符串，然后返回整数值。

像往常一样，我们将创建一个测试用例来单元测试我们的方法：

```java
@Test
void 给定字符数组_when使用ParseInt方法_应返回整数数组() {
    int[] expected = { 9, 8, 7, 6 };
    char[] chars = { '9', '8', '7', '6' };
    int[] result = CharArrayToIntArrayUtils.使用ParseInt方法(chars);

    assertArrayEquals(expected, result);
}
```

### 5. 结论

在这篇简短的文章中，我们详细解释了如何在Java中将字符数组转换为整数数组。

一如既往，文章中使用的全部代码可以在GitHub上找到。