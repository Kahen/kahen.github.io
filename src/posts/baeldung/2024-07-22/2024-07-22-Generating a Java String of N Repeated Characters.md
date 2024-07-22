---
date: 2022-04-01
category:
  - Java
  - String Manipulation
tag:
  - Java String
  - Repeated Characters
head:
  - - meta
    - name: keywords
      content: Java, String, Repeated Characters, String Manipulation
---
# 生成包含N个重复字符的Java字符串

在本教程中，我们将熟悉生成包含N个重复字符的**字符串**的不同选项。这在我们需要添加填充空白、生成ASCII艺术等时非常有用。

这个问题在JDK11中很容易解决，但如果我们使用的是早期版本，那么还有许多其他解决方案可用。我们将从最常见的方法开始，并添加一些来自第三方库的方法。

### 示例

让我们定义所有解决方案中将使用的常量，以验证生成的字符串：

```java
private static final String EXPECTED_STRING = "aaaaaaa";
private static final int N = 7;
```

所以，`EXPECTED_STRING` 常量表示我们需要在解决方案中生成的字符串。`N` 常量用于定义字符重复的次数。

现在，让我们检查生成N个字符`a`的字符串的选项。

### JDK11的`String.repeat`函数

Java有一个`repeat`函数来构建源字符串的副本：

```java
String newString = "a".repeat(N);
assertEquals(EXPECTED_STRING, newString);
```

这允许我们重复单个字符或多字符字符串：

```java
String newString = "-->".repeat(5);
assertEquals("-->-->-->-->-->", newString);
```

这个算法背后使用循环来非常高效地填充字符数组。

如果我们没有JDK11，那么我们必须自己创建一个算法，或者使用来自第三方库的算法。这些最好的解决方案不太可能比JDK11内置解决方案更快或更容易使用。

### 构建`String`的常见方法

#### 4.1 使用`StringBuilder`和`for`循环

让我们从`StringBuilder`类开始。我们将通过`for`循环N次来追加重复的字符：

```java
StringBuilder builder = new StringBuilder(N);
for (int i = 0; i `< N; i++) {
    builder.append("a");
}
String newString = builder.toString();
assertEquals(EXPECTED_STRING, newString);
```

这种方法可以得到我们想要的字符串。这可能是**最容易理解的方法**，但不一定是**运行时最快的**。

#### 4.2 使用`char`数组和`for`循环

我们可以填充一个固定大小的`char`数组，并将其转换为字符串：

```java
char[] charArray = new char[N];
for (int i = 0; i < N; i++) {
    charArray[i] = 'a';
}
String newString = new String(charArray);
assertEquals(EXPECTED_STRING, newString);
```

这应该更快，因为**它不需要一个动态大小的结构来存储我们构建字符串时的字符**，Java可以高效地将`char`数组转换为`String`。

#### 4.3 `Arrays.fill`方法

而不是使用循环，我们可以使用库函数来填充我们的数组：

```java
char charToAppend = 'a';
char[] charArray = new char[N];
Arrays.fill(charArray, charToAppend);
String newString = new String(charArray);
assertEquals(EXPECTED_STRING, newString);
```

**这更短，并且与之前的解决方案在运行时一样高效。**

### 使用`repeat`方法生成字符串

#### 5.1 Apache的`repeat`方法

这个解决方案需要为Apache Commons库添加一个新的依赖项：

```xml
`<dependency>``
    ``<groupId>``org.apache.commons``</groupId>``
    ``<artifactId>``commons-lang3``</artifactId>``
    ``<version>``3.13.0``</version>``
``</dependency>``
```

添加这个依赖项后，我们可以使用`StringUtils`类的`repeat`方法。**它接受一个字符用于重复和字符应该重复的次数作为参数**：

```java
char charToAppend = 'a';
String newString = StringUtils.repeat(charToAppend, N);
assertEquals(EXPECTED_STRING, newString);
```

#### 5.2 Guava的`repeat`方法

与前一种方法类似，这个解决方案需要为Guava库添加一个新的依赖项：

```xml
`<dependency>`
    ``<groupId>``com.google.guava``</groupId>``
    ``<artifactId>``guava``</artifactId>``
    ``<version>``32.1.3-jre``</version>``
``</dependency>``
```

除了它来自不同的库之外，这个解决方案与Apache Commons的解决方案是相同的：

```java
String charToAppend = "a";
String newString = Strings.repeat(charToAppend, N);
assertEquals(EXPECTED_STRING, newString);
```

### 使用`nCopies`方法生成字符串

如果我们将目标字符串视为重复子字符串的集合，那么我们可以使用列表工具来构建列表，然后将结果列表转换为我们最终的`String`。为此，我们可以使用`java.util`包中的`Collections`类的`nCopies`方法：

```java
public ``<T>`` List``<T>`` nCopies(int n, T o);
```

**虽然使用固定字符数组的解决方案比我们使用子字符串列表的解决方案更有效，但构建字符模式的重复而不是单个字符的重复可能很有帮助。**

#### 6.1 `String` `join`和`nCopies`方法

让我们使用`nCopies`方法创建一个单字符字符串的列表，并使用`String.join`将其转换为我们的结果：

```java
String charToAppend = "a";
String newString = String.join("", Collections.nCopies(N, charToAppend));
assertEquals(EXPECTED_STRING, newString);
```

`String.join`方法需要一个分隔符，我们在这里使用空字符串。

#### 6.2 Guava `Joiner`和`nCopies`方法

Guava提供了一个替代字符串连接器，我们也可以使用：

```java
String charToAppend = "a";
String newString = Joiner.on("").join(Collections.nCopies(N, charToAppend));
assertEquals(EXPECTED_STRING, newString);
```

### 使用Stream的`generate`方法生成字符串

创建子字符串列表的缺点是我们在构建最终字符串之前创建了一个潜在的大临时列表对象。

然而，自Java 8以来，我们可以使用`Stream` API的`generate`方法。**结合`limit`方法（用于定义长度）和`collect`方法，我们可以生成N个重复字符的字符串**：

```java
String charToAppend = "a";
String newString = Stream.generate(() -> charToAppend)
  .limit(N)
  .collect(Collectors.joining());
assertEquals(EXPECTED_STRING, newString);
```

### 使用Apache的`RandomStringUtils`

**Apache Commons库中的`RandomStringUtils`类使用`random`方法可以生成N个重复字符的字符串**。我们必须定义一个字符和重复次数：

```java
String charToAppend = "a";
String newString = RandomStringUtils.random(N, charToAppend);
assertEquals(EXPECTED_STRING, newString);
```

### 结论

在本文中，我们看到了生成N个重复字符字符串的各种解决方案。其中最简单的是`String.repeat`，从JDK 11开始可用。

对于Java的早期版本，还有许多其他可能的选项可用。最佳选择将取决于我们在运行时效率、编码便利性和库可用性方面的要求。

如往常一样，这些示例的代码可以在GitHub上找到。