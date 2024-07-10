---
date: 2022-04-01
category:
  - Java
  - CommandLine
tag:
  - Java
  - CommandLine
  - Arguments
head:
  - - meta
    - name: keywords
      content: Java, CommandLine, Arguments, Null Check
------
# Java中检查命令行参数是否为空

命令行参数是在运行时为命令行程序提供额外信息和指令的强大且有用的工具。在Java中，它们可以通过自动创建的`args`数组访问，该数组包含`String`对象，当程序被调用时带有命令行参数。然而，检查命令行参数是否为空非常重要，以便妥善处理未提供参数或参数无效或意外的情况。

在本教程中，我们将讨论如何检查命令行参数是否缺失。

### 2. 访问命令行参数

要在程序中访问和使用命令行参数，我们可以简单地引用`args`数组的元素：

```java
public class CommandLineWithoutErrorHandling {

    public static void main(String[] args) {
        System.out.println(args[0]);
    }
}
```

这个程序简单地将第一个命令行参数打印到控制台：

```shell
java CommandLineWithoutErrorHandling.java arg1 arg2 arg3
```

此命令行的输出是`arg1`。

此外，我们可以以类似的方式访问和使用其他命令行参数。例如，要访问第二个命令行参数，我们可以使用`args[1]`，依此类推。

然而，如果`args`数组为空，尝试访问其元素将导致`ArrayIndexOutOfBoundsException`：

```java
@Test(expected = NullPointerException.class)
public void givenNullCommandLineArgument_whenPassedToMainFunction_thenExpectNullPointerException {

    CommandLineWithoutErrorHandling.main(null);
}
```

重要的是要注意，**我们应该始终检查`args`数组的长度，以确保它非空，然后再尝试访问其元素**：

```java
public static void main(String[] args) {

    if (args.length > 0) {
        System.out.println(args[0]);
    } else {
        System.out.println("没有提供命令行参数。");
    }
}
```

因此，如果提供了第一个命令行参数，此程序将输出它；如果`args`数组为空，则输出一条消息，说明没有提供命令行参数。

要检查命令行参数是否缺失，我们可以使用以下方法之一。

首先，我们可以**检查`args`数组是否为`null`**：

```java
if (args == null) {
    // 没有提供命令行参数
} else {
    // 提供了命令行参数
}
```

其次，我们可以**检查`args`数组的长度**，以确定是否提供了任何命令行参数。如果长度为零，则意味着没有提供参数：

```java
if (args.length == 0) {
    // 没有提供命令行参数
} else {
    // 提供了命令行参数
}
```

最后，我们可以**检查是否提供了任何命令行参数，无论它们是否为`null`或没有提供**：

```java
if (args.length > 0) {
    // 提供了命令行参数
} else {
    // 没有提供命令行参数
}
```

每种方法都允许我们确定程序是否提供了命令行参数。

### 4. 结论

在本文中，我们查看了在Java程序中检查命令行参数是否缺失的不同方法。

我们讨论了每种方法的利弊和考虑因素，并强调了检查空参数的重要性，以便处理未提供所需参数或接收到无效参数的情况。这对于确定程序的正确行为并确保其平稳运行至关重要。

本教程的完整源代码可在GitHub上获得。