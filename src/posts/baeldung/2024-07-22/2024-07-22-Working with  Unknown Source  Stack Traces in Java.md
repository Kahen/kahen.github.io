---
date: 2022-04-01
category:
  - Java
  - Debugging
tag:
  - Java
  - Stack Trace
  - Debugging
head:
  - - meta
    - name: keywords
      content: Java, Debugging, Stack Trace
------
# Java中处理未知来源堆栈跟踪

在这篇短文中，我们将探讨为什么我们的Java异常堆栈跟踪中可能会出现未知来源，以及如何修复它。

## 2. 类调试信息

Java类文件包含可选的调试信息以便于调试。我们可以在编译时选择是否以及添加哪些调试信息到类文件中。这将决定在运行时可用的调试信息。

让我们查看Java编译器的帮助文档，看看可用的各种选项：

```
javac -help

用法：javac `<选项>` `<源文件>`
其中可能的选项包括：
  -g                         生成所有调试信息
  -g:none                    不生成调试信息
  -g:{lines,vars,source}     只生成部分调试信息
```

Java编译器的默认行为是向类文件中添加行和源信息，这等同于`-g:lines,source`。

### 2.1. 使用调试选项编译

让我们看看当我们使用上述选项编译Java类时会发生什么。我们有一个`Main`类，它故意生成一个`StringIndexOutOfBoundsException`。

根据使用的编译机制，我们需要相应地指定编译选项。这里，我们将使用Maven及其编译器插件来自定义编译选项：

```xml
``<plugin>``
    ``<groupId>``org.apache.maven.plugins``</groupId>``
    ``<artifactId>``maven-compiler-plugin``</artifactId>``
    ``<version>``3.12.1``</version>``
    ``<configuration>``
        ``<compilerArgs>``
            ``<arg>``-g:none``</arg>``
        ``</compilerArgs>``
    ``</configuration>``
``</plugin>``
```

我们将`-g`设置为`none`，这意味着我们的编译类将不生成调试信息。运行我们的有缺陷的`Main`类生成的堆栈跟踪显示未知来源，而不是异常发生的位置的行号。

```java
Exception in thread "main" java.lang.StringIndexOutOfBoundsException: begin 0, end 10, length 5
  at java.base/java.lang.String.checkBoundsBeginEnd(String.java:3751)
  at java.base/java.lang.String.substring(String.java:1907)
  at com.baeldung.unknownsourcestacktrace.Main.getShortenedName(Unknown Source)
  at com.baeldung.unknownsourcestacktrace.Main.getGreetingMessage(Unknown Source)
  at com.baeldung.unknownsourcestacktrace.Main.main(Unknown Source)
```

让我们看看生成的类文件包含什么。我们将使用Java类文件反汇编器`javap`来做这件事：

```shell
javap -l -p Main.class

public class com.baeldung.unknownsourcestacktrace.Main {
    private static final org.slf4j.Logger logger;
    private static final int SHORT_NAME_LIMIT;
    public com.baeldung.unknownsourcestacktrace.Main();
    public static void main(java.lang.String[]);
    private static java.lang.String getGreetingMessage(java.lang.String);
    private static java.lang.String getShortenedName(java.lang.String);
    static {};
}
```

在这里，我们可能很难知道我们应该期待哪些调试信息，所以让我们改变编译选项，看看会发生什么。

### 2.3. 修复

现在让我们将编译选项更改为`-g:lines,vars,source`，这将把`LineNumberTable`、`LocalVariableTable`和`Source`信息放入我们的类文件中。这等同于只使用`-g`，它将所有调试信息放入：

```xml
``<plugin>``
    ``<groupId>``org.apache.maven.plugins``</groupId>``
    ``<artifactId>``maven-compiler-plugin``</artifactId>``
    ``<version>``3.12.1``</version>``
    ``<configuration>``
        ``<compilerArgs>``
            ``<arg>``-g``</arg>``
        ``</compilerArgs>``
    ``</configuration>``
``</plugin>``
```

再次运行我们的`Main`类，现在产生的堆栈跟踪显示了我们的行号信息：

```java
Exception in thread "main" java.lang.StringIndexOutOfBoundsException: begin 0, end 10, length 5
  at java.base/java.lang.String.checkBoundsBeginEnd(String.java:3751)
  at java.base/java.lang.String.substring(String.java:1907)
  at com.baeldung.unknownsourcestacktrace.Main.getShortenedName(Main.java:23)
  at com.baeldung.unknownsourcestacktrace.Main.getGreetingMessage(Main.java:19)
  at com.baeldung.unknownsourcestacktrace.Main.main(Main.java:15)
```

太好了，我们在堆栈跟踪中看到了行号信息。让我们看看我们的类文件有什么变化：

```java
javap -l -p Main

Compiled from "Main.java"
public class com.baeldung.unknownsourcestacktrace.Main {
  private static final org.slf4j.Logger logger;

  private static final int SHORT_NAME_LIMIT;

  public com.baeldung.unknownsourcestacktrace.Main();
    LineNumberTable:
      line 7: 0
    LocalVariableTable:
      Start  Length  Slot  Name   Signature
          0       5     0  this   Lcom/baeldung/unknownsourcestacktrace/Main;

  public static void main(java.lang.String[]);
    LineNumberTable:
      line 12: 0
      line 13: 8
      line 15: 14
      line 16: 29
    LocalVariableTable:
      Start  Length  Slot  Name   Signature
          0      30     0  args   [Ljava/lang/String;
          8      22     1  user   Lcom/baeldung/unknownsourcestacktrace/dto/User;

  private static java.lang.String getGreetingMessage(java.lang.String);
    LineNumberTable:
      line 19: 0
    LocalVariableTable:
      Start  Length  Slot  Name   Signature
          0      28     0  name   Ljava/lang/String;

  private static java.lang.String getShortenedName(java.lang.String);
    LineNumberTable:
      line 23: 0
    LocalVariableTable:
      Start  Length  Slot  Name   Signature
          0       8     0  name   Ljava/lang/String;

  static {};
    LineNumberTable:
      line 8: 0
}
```

我们的类文件现在包含三个关键信息：

1. **Source**，顶部标题指示`.class`文件生成自哪个`.java`文件。在堆栈跟踪的上下文中，它提供了异常发生的类名。
2. **LineNumberTable**将JVM实际运行的代码中的行号映射到我们源代码文件中的行号。在堆栈跟踪的上下文中，它提供了异常发生的行号。我们还需要这个来使用调试器中的断点。
3. **LocalVariableTable**包含获取局部变量值的详细信息。调试器可能使用它来读取局部变量的值。在堆栈跟踪的上下文中，这并不重要。

## 3. 结论

我们现在熟悉了Java编译器生成的调试信息。如何操作它们，`-g`编译器选项。我们看到了如何使用Maven编译器插件来做到这一点。

所以，如果我们在堆栈跟踪中发现未知来源，我们可以调查我们的类文件以检查是否可用调试信息。然后，我们可以根据我们的构建工具选择正确的编译选项来解决这个问题。

如往常一样，完整的代码和Maven配置可以在GitHub上找到。