---
date: 2024-07-05
category:
  - Java
  - Scanner
tag:
  - next()
  - nextLine()
head:
  - - meta
    - name: keywords
      content: Java, Scanner, next(), nextLine(), 区别
------
# Java Scanner 类的 next() 和 nextLine() 方法有什么区别？

在这篇简短的教程中，我们将强调 Scanner 类的 next() 和 nextLine() 方法之间的区别。尽管这两种方法乍一看可能非常相似，但它们实际上有很大的不同。

## 1. 概述

Scanner 类带有一组方法，这些方法通过将输入分解为多个标记来简化解析输入的过程。它通常用于从控制台和文件等不同来源读取输入数据。

## 2. next() 方法

通常，Scanner 通过使用分隔符模式将输入分解为标记，其默认值是任何空格。

换句话说，正如名称所示，next() 只从输入中读取下一个标记，直到遇到分隔符。

### 2.1. 使用默认分隔符

如前所述，Scanner 类使用空格作为默认分隔符。

例如，如果我们输入 "Hello world"，next() 将只读取值 "Hello"。剩下的单词 "world" 将可用于下一次调用 next() 方法。

让我们用一个测试用例来示例 next() 的使用：

```java
@Test
void givenInput_whenUsingNextMethod_thenReturnToken() {
    String input = "Hello world";
    try (Scanner scanner = new Scanner(input)) {
        assertEquals("Hello", scanner.next());
        assertEquals("world", scanner.next());
    }
}
```

在这里，Scanner 使用空格字符来解析输入。

因此，next() 方法的第一个调用只读取了值 "Hello"。进一步地，第二个调用读取了值 "world"。

多个空格也被视为一个单一的空格，结果相同：

```java
@Test
void givenInput_whenUsingNextMethodWithMultipleWhiteSpaces_thenReturnToken() {
    String input = "Hello        world";
    try (Scanner scanner = new Scanner(input)) {
        assertEquals("Hello", scanner.next());
        assertEquals("world", scanner.next());
    }
}
```

包括制表符和换行符在内的多个空格也会产生相同的结果：

```java
@Test
void givenInput_whenUsingNextMethodWithTabAndNewLine_thenReturnToken() {
    String input = "Hello    \t\n world";
    try (Scanner scanner = new Scanner(input)) {
        assertEquals("Hello", scanner.next());
        assertEquals("world", scanner.next());
    }
}
```

请注意，空格包括多个字符，不仅仅是空格，例如制表符(\t)、回车符(\n)等。

### 2.2. 使用自定义分隔符

Scanner 类提供了一种方便的方法，通过 useDelimiter() 方法来覆盖默认分隔符。

让我们看看使用自定义分隔符时 next() 方法的行为。

例如，我们将使用 "：" 字符作为我们的分隔符：

```java
@Test
void givenInput_whenUsingNextMethodWithCustomDelimiter_thenReturnToken() {
    String input = "Hello :world";
    try (Scanner scanner = new Scanner(input)) {
        scanner.useDelimiter(":");
        assertEquals("Hello ", scanner.next());
        assertEquals("world", scanner.next());
    }
}
```

如上所示，next() 读取 "Hello"，这次后面跟着空格字符。原因是 Scanner 使用 "：" 而不是空格来将输入分解为标记。

## 3. nextLine() 方法

另一方面，nextLine() 消耗输入的整行，包括空格字符，直到它到达换行字符 "\n"。

换句话说，我们可以使用这种方法来读取包含默认分隔符的输入，例如空格。它在接收到 "\n" 或按下回车键后停止读取。

让我们在实践中看看：

```java
@Test
void givenInput_whenUsingNextLineMethod_thenReturnEntireLine() {
    String input = "Hello world\nWelcome to baeldung.com";
    try (Scanner scanner = new Scanner(input)) {
        assertEquals("Hello world", scanner.nextLine());
        assertEquals("Welcome to baeldung.com", scanner.nextLine());
    }
}
```

正如我们所看到的，第一次 scanner.nextLine() 读取了整个值 "Hello world"，第二次消耗了其余的输入。

与 next() 不同，它将光标放在同一行，nextLine() 在读取输入后将光标指向下一行。

这里需要注意的一个重要点是，与 next() 不同，定义自定义分隔符不会改变 nextLine() 的行为。

让我们用一个测试用例来确认这一点：

```java
@Test
void givenInput_whenUsingNextLineWithCustomDelimiter_thenIgnoreDelimiter() {
    String input = "Hello:world\nWelcome:to baeldung.com";
    try (Scanner scanner = new Scanner(input)) {
        scanner.useDelimiter(":");
        assertEquals("Hello:world", scanner.nextLine());
        assertEquals("Welcome:to baeldung.com", scanner.nextLine());
    }
}
```

不出所料，nextLine() 方法忽略了我们的自定义分隔符，并继续读取输入，直到找到 "\n" 字符。

接下来，我们将展示其他分隔符将被视为新行并返回相同的结果：

**回车符（"\r"）和回车换行符（"\r\n"）也被视为 nextLine() 的新行分隔符：**

```java
@Test
void givenInput_whenUsingNextLineMethodWithCR_thenReturnEntireLine() {
    String input = "Hello world\rWelcome to baeldung.com";
    try (Scanner scanner = new Scanner(input)) {
        assertEquals("Hello world", scanner.nextLine());
        assertEquals("Welcome to baeldung.com", scanner.nextLine());
    }
}
```

同样，与回车换行符 **：**

```java
@Test
void givenInput_whenUsingNextLineMethodWithCRLF_thenReturnEntireLine() {
    String input = "Hello world\r\nWelcome to baeldung.com";
    try (Scanner scanner = new Scanner(input)) {
        assertEquals("Hello world", scanner.nextLine());
        assertEquals("Welcome to baeldung.com", scanner.nextLine());
    }
}
```

## 4. 差异

简而言之，以下是比较 next() 和 nextLine() 方法时需要记住的一些关键点：

- nextLine() 返回到换行符的整个文本。next() 根据给定的分隔符（默认为空格）读取标记化文本
- nextLine() 在读取输入后将扫描器位置放在下一行。然而，next() 保持光标在同一行

## 5. 其他标记化字符串的方法

如果你想将 Scanner 类用作标记化机制，你可以使用一些替代方法，如 String.split()。根据你的需求，你可以使用 split 方法的一些变体。

这里有两种 split 方法，具有不同的参数：

- split(String regex, int limit) – 它将根据提供的正则表达式拆分字符串。第一个参数是正则表达式，第二个是模式将被应用于提供的字符串的次数
- split(String regex): 它将根据提供的正则表达式拆分字符串。模式将无限期地应用，直到到达字符串的末尾。

## 6. 结论

在本文中，我们详细解释了 Scanner.next() 和 Scanner.nextLine() 方法之间的区别。

如往常一样，示例的完整源代码可在 GitHub 上获得。