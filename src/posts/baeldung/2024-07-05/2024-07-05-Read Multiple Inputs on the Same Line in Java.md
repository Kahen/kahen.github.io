---
date: 2024-07-06
category:
  - Java
  - 编程
tag:
  - Scanner
  - 输入处理
head:
  - - meta
    - name: keywords
      content: Java, Scanner, 输入, 多行输入, 错误处理
---

# Java中在同一行读取多个输入

## 1. 引言

_Scanner_ 类是Java中用于从控制台读取输入的有用工具。我们通常使用 _next()_ 或 _nextLine()_ 方法来逐行读取每个输入。然而，有时我们可能想要在同一行读取多个输入。

**在本教程中，我们将探索实现这一点的不同方式，例如使用空格或自定义分隔符，甚至使用正则表达式。**

### 2.1. 使用空格作为分隔符

在同一行读取多个输入的一种方法是使用空格作为分隔符。以下是一个示例：

```java
Scanner scanner = new Scanner(System.in);
System.out.print("输入两个数字：");
int num1 = scanner.nextInt();
int num2 = scanner.nextInt();
System.out.println("您输入了 " + num1 + " 和 " + num2);
```

在这个例子中，我们使用 _nextInt()_ 方法从控制台读取两个整数。**由于我们在同一行上读取它们，我们使用空格作为分隔符来分隔这两个整数。**

### 2.2. 使用自定义分隔符

如果我们不想使用空格作为分隔符，我们可以通过调用 _setDelimiter()_ 方法在_Scanner_对象上使用自定义分隔符。以下是一个示例：

```java
Scanner scanner = new Scanner(System.in);
scanner.useDelimiter(";");
System.out.print("输入两个用分号分隔的数字：");
int num1 = scanner.nextInt();
int num2 = scanner.nextInt();
System.out.println("您输入了 " + num1 + " 和 " + num2);
```

在这个例子中，我们使用分号代替空格作为分隔符。**我们还调用 _setDelimiter()_ 方法将分隔符设置为分号。**

### 2.3. 使用正则表达式作为分隔符

除了使用空格或自定义分隔符外，我们还可以使用正则表达式作为分隔符来在同一行上读取多个输入。**正则表达式是可以灵活且强大地匹配字符串的模式。**

例如，如果我们想在同一行上读取由空格或逗号分隔的多个输入，我们可以使用以下代码：

```java
Scanner scanner = new Scanner(System.in);
scanner.useDelimiter("[\\s,]+");
System.out.print("输入两个用空格或逗号分隔的数字：");
int num1 = scanner.nextInt();
int num2 = scanner.nextInt();
System.out.println("您输入了 " + num1 + " 和 " + num2);
```

在这个例子中，我们使用正则表达式 \\[\\s,\\]+ 作为分隔符。这个正则表达式匹配一个或多个空格或逗号。

## 3. 错误处理

在同一行读取多个输入时，处理可能发生的错误非常重要。**例如，如果用户输入了无效的输入，比如输入了一个 _String_ 而不是 _Integer_，程序将抛出异常。**

为了处理这个错误，我们可以使用 _try-catch_ 块来优雅地捕获和处理异常。以下是一个示例：

```java
Scanner scanner = new Scanner(System.in);
scanner.useDelimiter(";");
System.out.print("输入两个用分号分隔的数字：");
try {
    int num1 = scanner.nextInt();
    int num2 = scanner.nextInt();
    System.out.println("您输入了 " + num1 + " 和 " + num2);
} catch (InputMismatchException e) {
    System.out.println("输入无效。请输入两个用分号分隔的整数。");
}
```

在这个例子中，我们使用 _try-catch_ 块来捕获可能抛出的 _InputMismatchException_，如果用户输入了无效的输入。如果捕获到这个异常，我们打印一个错误消息，并要求用户重新输入。

## 4. 结论

**在本文中，我们讨论了如何使用 _Scanner_ 类在同一行上读取多个输入。**

完整的示例代码可以在GitHub上找到。

OK