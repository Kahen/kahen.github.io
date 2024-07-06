---
date: 2022-04-01
category:
  - Java
  - 环境变量
tag:
  - JAVA_HOME
  - PATH
head:
  - - meta
    - name: keywords
      content: JAVA_HOME, PATH, 环境变量, Java, 教程
---

# JAVA_HOME 与 PATH 环境变量的区别

在本教程中，我们将探讨使用 _JAVA_HOME_ 和 _PATH_ 环境变量之间的主要区别。尽管大多数Java程序需要这两个变量才能成功编译和运行，但每个变量都服务于不同的目的。让我们逐一了解它们。

## 2. _JAVA_HOME_ 环境变量

**_JAVA_HOME_ 环境变量指向 JDK 安装目录**。随后，其他依赖Java的程序可以使用这个变量来访问 JDK/JRE 路径。

通常，Apache Tomcat 和其他 Java EE 应用程序服务器，以及 Maven 或 Gradle 等构建工具，使用 _JAVA_HOME_ 作为命名约定来定位 Java。

在大多数情况下，**_JAVA_HOME_ 设置为指向 JDK 路径而不是 JRE**。这对于需要访问编译器、调试器、文档生成器等的现代开发工具非常有用。

以下是我们通过命令行设置 _JAVA_HOME_ 变量的方法：

```
set JAVA_HOME=C:\Program Files\Java\jdk-17
```

另外，我们还可以通过系统设置来设置这个变量。Windows 用户可以在 "系统属性 -> 高级 -> 环境变量" 下找到此设置。

## 3. _PATH_ 环境变量

**操作系统使用 _PATH_ 环境变量来查找要运行的本地可执行程序**。

在 Windows 中，可执行程序以 _.exe_ 扩展名结尾。一旦我们将可执行程序的目录指向 _PATH_，我们就可以在命令行中调用它而无需指定其完整路径。

**为了运行 Java 程序，我们需要在 _PATH_ 变量中列出 JDK 安装目录以及 _bin_ 目录**。_bin_ 目录包含 Java 可执行文件。

我们可以通过命令行设置 _PATH_ 环境变量：

```
set PATH=C:\Program Files\Java\jdk-17\bin
```

如前一节所见，我们也可以通过系统设置来实现相同的效果。通常，_PATH_ 变量包含指向不同目录的多个路径。因此，此设置不仅限于 Java。

## 4. 同时使用 _JAVA_HOME_ 和 _PATH_

现代程序足够智能，可以选取 _JAVA_HOME_ 或 _PATH_ 变量中的一个来成功运行。然而，像 Eclipse 这样的一些程序需要 _PATH_ 变量才能启动。

**作为最佳实践，始终推荐设置 _JAVA_HOME_ 和 _PATH_ 环境变量**。这样，我们可以消除使用旧程序和新程序之间的兼容性问题。

另外，为了避免重复 JDK 安装路径两次，我们可以在声明中重用其中一个变量：

```
set PATH=%JAVA_HOME%\bin;%PATH%
```

因此，此设置还消除了在 JDK 安装目录发生变化时更改所有受影响的环境变量的风险。

## 5. 常见问题

某些程序依赖于特定的变量来启动。例如，如果未设置 _JAVA_HOME_，则依赖此变量的程序可能无法定位 JDK。

随后，像 Tomcat、Maven 和 Gradle 这样的程序可能无法正常执行。同样的问题也适用于依赖 _PATH_ 变量的程序。

具体来说，当我们尝试从命令行运行 Java 程序时，操作系统会查看 _PATH_ 变量以定位并运行 JVM。如果 _PATH_ 变量中没有 JDK，则命令以错误结束：

```
C:\Users\palan>java HelloWorld
'java' 不是内部或外部命令，也不是可运行的程序或批处理文件。
```

另一个常见问题是在 _PATH_ 变量中有不同版本的 JDK。在这种情况下，**操作系统会考虑 _PATH_ 变量中 JDK 的第一个出现用于执行**。然而，最好从 _PATH_ 变量中移除多个版本，以避免后期的混淆。

## 6. 结论

在本文中，我们探讨了使用 _JAVA_HOME_ 和 _PATH_ 环境变量之间的差异。

总之，**_JAVA_HOME_ 环境变量主要由面向开发工具的程序使用**。另一方面，**面向用户的应用程序需要 _PATH_ 环境变量来知道 JVM 的位置**。