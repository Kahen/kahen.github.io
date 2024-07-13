---
date: 2024-07-13
category:
  - Java
  - Logging
tag:
  - ANSI
  - Color
  - Console
head:
  - - meta
    - name: keywords
      content: Java, Logging, ANSI, Color, Console
----
# 如何在控制台中以彩色记录日志

添加一些颜色可以使日志记录更容易阅读。

在本文中，我们将看到如何为我们的日志添加颜色，适用于Visual Studio Code终端、Linux和Windows命令提示符等控制台。

在我们开始之前，让我们注意，遗憾的是，Eclipse IDE控制台中的颜色设置非常有限。Eclipse IDE内的控制台不支持由Java代码确定的颜色，因此**本文中介绍的解决方案在Eclipse IDE控制台中将不起作用。**

### 如何使用ANSI代码为日志着色

**实现彩色日志记录的最简单方式是使用ANSI转义序列，**通常称为ANSI代码。

ANSI代码是一些特殊的字节序列，一些终端将其解释为命令。

让我们用一个ANSI代码记录出来：

```java
System.out.println("Here's some text");
System.out.println("\033[31m" + "and now the text is red");
```

在输出中，我们看到ANSI代码没有被打印出来，字体的颜色变为了红色：

```
Here's some text
and now the text is red
```

**让我们注意，我们需要确保我们在记录完毕后重置字体颜色。**

幸运的是，这很容易。我们可以简单地打印`\033[31m`，这是ANSI重置命令。

重置命令将把控制台重置为其默认颜色。注意，这不一定是黑色，它可能是白色，或者是控制台配置的任何其他颜色。例如：

```java
System.out.println("Here's some text");
System.out.println("\033[31m" + "and now the text is red" + "\033[0m");
System.out.println("and now back to the default");
```

给出的输出是：

```
Here's some text
and now the text is red
and now back to the default
```

大多数日志库会遵循ANSI代码，这允许我们构建一些彩色的记录器。

例如，我们可以快速构建一个使用不同颜色表示不同日志级别的记录器。

```java
public class ColorLogger {

    private static final Logger LOGGER = LoggerFactory.getLogger(ColorLogger.class);

    public void logDebug(String logging) {
        LOGGER.debug("\033[34m" + logging + "\033[0m");
    }
    public void logInfo(String logging) {
        LOGGER.info("\033[32m" + logging + "\033[0m");
    }

    public void logError(String logging) {
        LOGGER.error("\033[31m" + logging + "\033[0m");
    }
}
```

让我们使用这个在控制台打印一些颜色：

```java
ColorLogger colorLogger = new ColorLogger();
colorLogger.logDebug("Some debug logging");
colorLogger.logInfo("Some info logging");
colorLogger.logError("Some error logging");
```

```plaintext
[main] DEBUG com.baeldung.color.ColorLogger - Some debug logging
[main] INFO com.baeldung.color.ColorLogger - Some info logging
[main] ERROR com.baeldung.color.ColorLogger - Some error logging
```

我们可以看到，每个日志级别都有不同的颜色，使我们的日志更加易于阅读。

最后，ANSI代码不仅可以用于控制字体颜色——我们可以控制背景颜色和字体粗细以及样式。示例项目中有一些这些ANSI代码的选择。

### 如何在Windows命令提示符中为日志着色

不幸的是，一些终端不支持ANSI代码。一个典型的例子是Windows命令提示符，上述方法将不起作用。因此，我们需要一个更复杂的解决方案。

然而，而不是试图自己实现它，我们可以利用一个已建立的库叫做JANSI到我们的pom.xml：

```xml
`<dependency>`
    `<groupId>`org.fusesource.jansi`</groupId>`
    `<artifactId>`jansi`</artifactId>`
    `<version>`2.4.0`</version>`
`</dependency>`
```

现在要记录颜色，我们可以简单地调用JANSI提供的ANSI API：

```java
private static void logColorUsingJANSI() {
    AnsiConsole.systemInstall();

    System.out.println(ansi()
        .fgRed()
        .a("Some red text")
        .fgBlue()
        .a(" and some blue text")
        .reset());

    AnsiConsole.systemUninstall();
}
```

这产生了文本：

```
Some red text and some blue text
```

让我们注意，**我们必须首先安装_AnsiConsole_，一旦我们完成就卸载它。**

和ANSI代码一样，JANSI也提供了大量的记录格式。

JANSI通过检测正在使用的终端并调用所需的适当平台特定API来实现此功能。这意味着，当JANSI检测到Windows命令提示符时，它不是使用不起作用的ANSI代码，而是调用使用Java本地接口（JNI）方法的库。

此外，JANSI不仅仅适用于Windows命令提示符——它能够覆盖大多数终端（尽管由于Eclipse中对彩色文本的设置有限，Eclipse IDE控制台不是其中之一）。

最后，JANSI还将确保在环境不需要它们时剥离不需要的ANSI代码，帮助我们保持日志的清洁和整洁。

总的来说，JANSI为我们提供了一种强大且方便的方式来记录大多数环境和终端的颜色。

### 结论

在本文中，我们学习了如何使用ANSI代码来控制控制台字体的颜色，并看到了如何使用颜色区分日志级别的示例。

最后，我们发现并非所有控制台都支持ANSI代码，并强调了一个这样的库，JANSI，它提供了更复杂的支持。

如往常一样，示例项目可在GitHub上找到。