---
date: 2022-04-01
category:
  - Java
  - 字符串操作
tag:
  - Java
  - 字符串截断
head:
  - - meta
    - name: keywords
      content: Java, 字符串截断, JDK, Apache Commons, Guava, 正则表达式
------
# 如何在Java中截断字符串

在本教程中，我们将学习在Java中将字符串截断到所需字符数的多种方法。

我们将从探索使用JDK本身的方法开始。然后，我们将看看如何使用一些流行的第三方库来实现这一点。

### 2.1 使用String的substring()方法

String类带有一个方便的方法叫做substring。顾名思义，substring()返回给定字符串在指定索引之间的部分。

让我们看看它的实际应用：

```java
static String usingSubstringMethod(String text, int length) {
    if (text.length() `<= length) {
        return text;
    } else {
        return text.substring(0, length);
    }
}
```

在上面的例子中，如果指定的length大于text的长度，我们返回text本身。这是因为向substring()传递一个大于字符串中字符数的length会导致IndexOutOfBoundsException。

否则，我们返回从索引零开始到索引length之前的子字符串。

让我们使用一个测试用例来确认这一点：

```java
static final String TEXT = "Welcome to baeldung.com";

@Test
public void givenStringAndLength_whenUsingSubstringMethod_thenTrim() {
    assertEquals(TrimStringOnLength.usingSubstringMethod(TEXT, 10), "Welcome to");
}
```

正如我们所看到的，起始索引是包含的，结束索引是排除的。因此，索引length处的字符将不包括在返回的子字符串中。

### 2.2 使用String的split()方法

另一种截断字符串的方法是使用split()方法，该方法使用正则表达式将字符串分割成片段。

这里我们将使用一个名为正向后视的正则表达式特性，以匹配从字符串开头开始的指定数量的字符：

```java
static String usingSplitMethod(String text, int length) {
    String[] results = text.split("(?<=\\G.{" + length + "})");
    return results[0];
}
```

results的第一个元素将是我们截断的字符串，或者是原始的字符串，如果length比text长。

让我们测试我们的方法：

```java
@Test
public void givenStringAndLength_whenUsingSplitMethod_thenTrim() {
    assertEquals(TrimStringOnLength.usingSplitMethod(TEXT, 13), "Welcome to ba");
}
```

### 2.3 使用Pattern类

类似地，我们可以使用Pattern类来编译一个正表达式，该表达式匹配字符串开头到指定数量的字符。

例如，让我们使用{1," + length + " }。这个正则表达式至少匹配一个，最多匹配length个字符：

```java
static String usingPattern(String text, int length) {
    Optional`<String>`` result = Pattern.compile(".{1," + length + "}")
      .matcher(text)
      .results()
      .map(MatchResult::group)
      .findFirst();

    return result.isPresent() ? result.get() : EMPTY;
}
```

正如上面看到的，将我们的正则表达式编译成Pattern后，我们可以使用Pattern的matcher()方法根据该正则表达式解释我们的字符串。然后我们能够分组结果并返回第一个，这是我们截断的字符串。

现在让我们添加一个测试用例来验证我们的代码按预期工作：

```java
@Test
public void givenStringAndLength_whenUsingPattern_thenTrim() {
    assertEquals(TrimStringOnLength.usingPattern(TEXT, 19), "Welcome to baeldung");
}
```

### 2.4 使用CharSequence的codePoints()方法

Java 9提供了一个codePoints()方法，将字符串转换为代码点值的流。

让我们看看如何使用这种方法结合流API来截断字符串：

```java
static String usingCodePointsMethod(String text, int length) {
    return text.codePoints()
      .limit(length)
      .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
      .toString();
}
```

在这里，我们使用limit()方法将流限制为给定的长度。然后我们使用StringBuilder来构建我们截断的字符串。

接下来，让我们验证我们的方法是否有效：

```java
@Test
public void givenStringAndLength_whenUsingCodePointsMethod_thenTrim() {
    assertEquals(TrimStringOnLength.usingCodePointsMethod(TEXT, 6), "Welcom");
}
```

### 3. Apache Commons库

Apache Commons Lang库包括一个StringUtils类用于操作字符串。

首先，让我们将Apache Commons依赖项添加到我们的pom.xml中：

```xml
``<dependency>``
    ``<groupId>``org.apache.commons``</groupId>``
    ``<artifactId>``commons-lang3``</artifactId>``
    ``<version>``3.14.0``</version>``
``</dependency>``
```

### 3.1 使用StringUtils的left()方法

StringUtils有一个有用的静态方法叫做left()。StringUtils.left()以null安全的方式返回字符串的最左边指定数量的字符：

```java
static String usingLeftMethod(String text, int length) {
    return StringUtils.left(text, length);
}
```

### 3.2 使用StringUtils的truncate()方法

或者，我们可以使用StringUtils.truncate()来实现相同的目标：

```java
public static String usingTruncateMethod(String text, int length) {
    return StringUtils.truncate(text, length);
}
```

### 4. Guava库

除了使用Java核心方法和Apache Commons库来截断字符串，我们还可以使用Guava。让我们首先将Guava依赖项添加到我们的pom.xml文件中：

```xml
``<dependency>``
    ``<groupId>``com.google.guava``</groupId>``
    ``<artifactId>``guava``</artifactId>``
    ``<version>``31.0.1-jre``</version>``
``</dependency>``
```

现在我们可以使用Guava的Splitter类来截断我们的字符串：

```java
static String usingSplitter(String text, int length) {
    Iterable`<String>` parts = Splitter.fixedLength(length)
      .split(text);

    return parts.iterator()
      .next();
}
```

我们使用Splitter.fixedLength()将我们的字符串分割成给定长度的多个片段。然后，我们返回结果的第一个元素。

### 5. 结论

在本文中，我们学习了在Java中将字符串截断到特定数量字符的多种方法。

我们查看了一些使用JDK的方法。然后我们使用了几个第三方库来截断字符串。

正如往常一样，本文中使用的代码可以在GitHub上找到。