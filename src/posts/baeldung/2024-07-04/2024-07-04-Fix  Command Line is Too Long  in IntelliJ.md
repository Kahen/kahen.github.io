---
date: 2023-05-01
category:
  - IntelliJ IDEA
  - Java
tag:
  - Spring Boot
  - Command Line
head:
  - - meta
    - name: keywords
      content: IntelliJ IDEA, Command Line is Too Long, Java, Spring Boot
---

# 解决IntelliJ IDEA中“命令行太长”的问题

在本教程中，我们将看到如何在IntelliJ IDEA中运行Spring Boot应用程序的Java主类时，解决“命令行太长”的错误。

## 2. 根本原因
当你启动程序时，可能会遇到“命令行太长”的错误。当类路径太长或包含许多虚拟机参数时，就会发生此错误。大多数操作系统对命令行的字符数有限制。

在下一节中，我们将看到解决此错误的可能方法。

## 3. 在IntelliJ中设置默认的命令行缩短
要解决这个问题，我们需要将“缩短命令行”选项更改为“类路径文件”，而不是默认设置的“无 - java [options] className [args]”。

首先，我们需要打开IntelliJ IDEA，然后点击“运行 -> 编辑配置”：

![img](https://www.baeldung.com/wp-content/uploads/2023/05/1_1-4-1024x576.png)

其次，我们将点击“编辑配置模板”：

![img](https://www.baeldung.com/wp-content/uploads/2023/05/1_2-2-1024x662.png)

接下来，我们需要选择一个模板，然后点击“修改选项”：

![img](https://www.baeldung.com/wp-content/uploads/2023/05/1_3-1-1024x662.png)

一个新的菜单出现，我们可以选择“缩短命令行”选项：

![img](https://www.baeldung.com/wp-content/uploads/2023/05/1_4-1-1024x658.png)

然后我们可以从“缩短命令行”中选择以下选项（取决于你使用的IntelliJ版本）：

- JAR Manifest：IDE通过一个临时的类路径.jar传递长类路径（这可能对某些框架不起作用）。
- 类路径文件：IDE将长类路径写入一个文本文件（这可能对某些框架不起作用，例如：JMock）。

**注意：** 在IntelliJ的较新版本中，你可能会发现“类路径文件”被“@argfile (Java 9+)”替换。

根据错误，我们可以选择这些选项之一，因为其中一个选项可能不适用于你的错误情况。

![img](https://www.baeldung.com/wp-content/uploads/2023/05/1_5-1-1024x661.png)

最后，我们需要应用更改，然后我们可以运行我们的应用程序。

## 4. 结论
在这个快速教程中，我们解释了这个错误的根本原因，以及如何通过在IDE配置中设置默认的“缩短命令行”来解决IntelliJ IDEA中的“命令行太长”错误。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)