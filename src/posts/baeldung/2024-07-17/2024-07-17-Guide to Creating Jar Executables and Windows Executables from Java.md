---
date: 2022-04-01
category:
  - Java
  - Windows Executables
tag:
  - jar
  - jpackage
  - Java Applications
head:
  - - meta
    - name: keywords
      content: Java, JAR, Executable, Windows, jpackage, jlink
------
# 从Java创建Jar可执行文件和Windows可执行文件的指南

在本教程中，我们将首先学习如何将Java程序打包成一个可执行的Java ARchive (JAR) 文件。然后，我们将看到如何使用该可执行JAR生成一个受Microsoft Windows支持的可执行文件。

我们将使用Java附带的_jar_命令行工具来创建JAR文件。然后，我们将学习使用Java 16及更高版本中可用的_jpackage_工具，作为_jdk.jpackage_，来生成可执行文件。

JAR文件是一个包含编译后的Java类文件和其他资源的容器。它基于流行的ZIP文件格式。

可执行JAR文件也是一个JAR文件，但其中包含一个主类。主类在我们将很快讨论的清单文件中引用。

为了运行以JAR格式交付的应用程序，我们必须拥有Java Runtime Environment (JRE)。

与JAR文件不同，特定平台的可执行文件可以在其构建的平台上本地运行。例如，该平台可以是Microsoft Windows、Linux或Apple macOS。

为了获得良好的最终用户体验，最好为客户提供特定平台的可执行文件。

### 2.1. _jar_命令的基础
创建JAR文件的一般语法是：

```shell
jar cf jar-file input-file(s)
```

让我们了解一些在创建新归档时可以使用的选项：

- _c_ 指定我们想要创建一个JAR文件
- _f_ 指定我们希望输出到一个文件
- _m_ 用于从现有清单文件中包含清单信息
- _jar-file_ 是我们想要的最终JAR文件的名称。JAR文件通常具有_.jar_扩展名，但这不是必须的。
- _input-file(s)_ 是我们想要包含在我们JAR文件中的文件名列表，这些文件名由空格分隔。这里也可以使用通配符_*_。

一旦我们创建了JAR文件，我们通常会检查其内容。要查看JAR文件包含的内容，我们使用以下语法：

```shell
jar tf jar-file
```

这里，_t_ 表示我们想要列出JAR文件的内容。_f_ 选项表示我们想要检查的JAR文件在命令行中指定。

### 2.2. _jpackage_命令
_jpackage_命令行工具帮助我们为模块化和非模块化Java应用程序生成可安装的包。

它使用_jlink_命令为我们的应用程序生成Java运行时映像。结果，我们得到了一个特定平台的自包含应用程序包。

由于应用程序包是为目标平台构建的，因此该系统必须包含以下内容：

- 应用程序本身
- JDK
- 打包工具所需的软件。**对于Windows，_jpackage_需要WiX 3.0或更高版本**。

这是_jpackage_命令的常用形式：

```shell
jpackage --input . --main-jar MyAppn.jar
```

## 3. 创建可执行文件

现在，让我们经历创建一个可执行JAR文件的过程。准备好之后，我们将致力于生成Windows可执行文件。

### 3.1. 创建可执行JAR文件
创建可执行JAR相对简单。我们首先需要一个至少有一个具有_main()_方法的类的Java项目。我们为示例创建了一个名为_MySampleGUIAppn_的Java类。

第二步是创建一个清单文件。让我们将我们的清单文件创建为_MySampleGUIAppn.mf_：

```makefile
Manifest-Version: 1.0
Main-Class: MySampleGUIAppn
```

我们必须确保在此清单文件的末尾有一个新行，以便它能够正确工作。

一旦清单文件准备好，我们将创建一个可执行JAR：

```shell
jar cmf MySampleGUIAppn.mf MySampleGUIAppn.jar MySampleGUIAppn.class MySampleGUIAppn.java
```

让我们查看我们创建的JAR的内容：

```shell
jar tf MySampleGUIAppn.jar
```

这是一个示例输出：

```shell
META-INF/
META-INF/MANIFEST.MF
MySampleGUIAppn.class
MySampleGUIAppn.java
```

接下来，我们可以通过命令行或在GUI中运行我们的JAR可执行文件。

让我们在命令行上运行它：

```shell
java -jar MySampleGUIAppn.jar
```

在GUI中，我们可以简单地双击相关的JAR文件。这应该会像任何其他应用程序一样正常启动它。

### 3.2. 创建Windows可执行文件
现在我们的可执行JAR已经准备好并可以使用了，让我们为我们的示例项目生成一个Windows可执行文件：

```shell
jpackage --input . --main-jar MySampleGUIAppn.jar
```

这个命令需要一段时间才能完成。完成后，它会在当前工作文件夹中生成一个_exe_文件。可执行文件的文件名将与清单文件中提到的版本号连接起来。我们将能够像启动任何其他Windows应用程序一样启动它。

这里有一些我们可以与_jpackage_命令一起使用的特定于Windows的选项：

- _–type_：指定_msi_而不是默认的_exe_格式
- _–win-console_：以控制台窗口启动我们的应用程序
- _–win-shortcut_：在Windows开始菜单中创建快捷方式文件
- _–win-dir-chooser_：让用户指定自定义目录以安装可执行文件
- _–win-menu –win-menu-group_：让用户在开始菜单中指定自定义目录

## 4. 结论

在本文中，我们学习了有关JAR文件和可执行JAR文件的一些基础知识。我们还看到了如何将Java程序转换为JAR可执行文件，然后转换为受Microsoft Windows支持的可执行文件。

如往常一样，示例的源代码可以在GitHub上找到。