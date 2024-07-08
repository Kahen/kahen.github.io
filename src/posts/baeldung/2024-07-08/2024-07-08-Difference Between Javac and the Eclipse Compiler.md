---
date: 2022-04-01
category:
  - Java
  - 编程
tag:
  - javac
  - Eclipse
head:
  - - meta
    - name: keywords
      content: Java编译器, javac, Eclipse编译器, 编译器比较
---
# Javac和Eclipse编译器的区别

1. 概述

众所周知，使用Java编程的一个关键步骤是将源代码编译成字节码。Java虚拟机（JVM）帮助执行Java字节码。Java编译器帮助将源代码翻译成字节码。

在本文中，我们将探讨Java中的两种流行的编译器以及它们之间的主要区别。

2. javac是什么？

javac是一个Java程序，它接受Java源代码并生成JVM执行的字节码。它是官方的Java编译器。默认情况下，Java开发工具包（JDK）包含javac。

主要来说，它是一个命令行工具。它可以处理类和Java源文件中的注释。编译器支持多种命令行选项以自定义编译过程。它是一个独立的工具，我们也可以在集成开发环境（IDE）中使用它。

让我们看看javac的一个简单用例：

```shell
$ javac Hello.java
```

该示例假设我们有一个名为_Hello.java_的源代码。然后，我们调用javac命令，该命令将源代码编译成字节码。它生成一个带有_.class_扩展名的字节码。

最后，我们可以使用java命令运行字节码：

```shell
$ java Hello
```

3. Eclipse编译器是什么？

Eclipse集成开发环境（IDE）包含了Eclipse Java编译器（ECJ）。与javac不同，Eclipse实现了自己的编译器。它帮助将Java源代码编译成JVM可以执行的字节码。

简单来说，我们可以通过Eclipse IDE中的设置轻松自定义编译器。有了Eclipse编译器，我们可以在Eclipse IDE中编写、编译和运行Java代码，而无需安装Java SDK。

两个编译器都可以有效地将源代码编译成字节码。但这两个工具在某些方面有所不同。首先，javac编译器是一个独立的命令行工具，可以从终端执行。然而，与javac不同，Eclipse编译器与Eclipse IDE集成。

Eclipse编译器可以执行增量编译。这使它能够编译自上次编译以来已更改的代码部分。此外，Eclipse编译器可以执行即时代码分析。这个过程提供了改进代码质量的建议。它还提供了比javac更全面的报错消息和警告。

此外，javac支持选项，允许程序员自定义编译过程。另一方面，Eclipse IDE提供了通过设置自定义Eclipse编译器的选项。

最后，即使代码有错误，也可以使用Eclipse编译器运行。如果源代码中有错误，它会发出警告。然后询问程序员是否应该继续编译过程，尽管有错误。如果我们在测试时只对代码的某个部分感兴趣，这可能会很有用。

5. 结论

在本文中，我们回顾了两种流行的Java编译器及其使用模式。此外，我们还查看了javac和Eclipse编译器之间的区别。

我们确定javac是一个独立的命令行工具，而Eclipse编译器是内置于Eclipse IDE中的，并具有许多高级功能。