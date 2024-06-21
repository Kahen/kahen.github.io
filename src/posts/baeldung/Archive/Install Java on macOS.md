---
date: 2024-01-16
category:
  - Java
  - macOS
tag:
  - Java安装
  - macOS
head:
  - - meta
    - name: keywords
      content: Java, macOS, 安装, Oracle JDK, OpenJDK, DMG, Homebrew
------
# 在macOS上安装Java

Java是由Oracle拥有的一种编程语言，最初由Sun Microsystems在1995年开发。在企业中，Web开发以及开发高度可扩展的解决方案时，Java仍然是首选的开发语言。

Oracle提供了两种Java版本：Oracle JDK和OpenJDK。Oracle JDK是商业产品，而OpenJDK是开源替代品。

在这个简短的教程中，我们将讨论在macOS上安装Java的方法。以我们的例子，我们将通过DMG包安装Oracle JDK，并通过Homebrew包管理器安装OpenJDK。

## 2. 通过DMG包手动安装

第一种安装Java的方法是使用DMG包（磁盘映像文件）。DMG包充当虚拟光盘，包含压缩的软件安装文件和其他数据，如可启动映像。

通过DMG包安装Java涉及一些手动步骤：打开.dmg包并按照屏幕上的指示完成安装过程。

首先，访问Oracle的官方网站并下载dmg包。默认情况下，页面会跳转到Linux下载标签，因此我们需要**选择macOS标签**并选择正确的dmg安装程序。

有**两种类型的dmg安装程序可用：一种适用于最新的Mac机器，如M1和M2的ARM芯片，另一种适用于带有Intel芯片的旧款“x64”Mac**。

以我们的例子，我们将安装x64安装程序，尽管使用ARM安装程序的步骤基本相同：

下载完成后，双击DMG文件启动安装程序：

进一步，当介绍标签打开时，点击_继续_：

点击_继续_在选择目的地：

现在，点击_安装_开始安装过程：

这将需要几分钟，所以让它运行：

现在，安装完成后，_摘要_标签将打开。点击_关闭_按钮：

我们已经通过DMG包成功在Mac上安装了Java。

最后，我们需要运行以下命令来检查安装的Java版本：

```
% java -version
java version "17.0.10" 2024-01-16 LTS
Java(TM) SE Runtime Environment (build 17.0.10+11-LTS-240)
Java HotSpot(TM) 64-Bit Server VM (build 17.0.10+11-LTS-240, mixed mode, sharing)
```

在macOS上，**Java的默认位置是_/Library/Java/JavaVirtualMachines/jdk``<version>``.jdk/Contents/Home/_**，其中_``<version>``_是我们安装的JDK的版本号。

此外，我们可以检查已安装的JDK版本列表，以及它们对应的版本号和安装路径：

```
% /usr/libexec/java_home -V
Matching Java Virtual Machines (3):
    17.0.10 (x86_64) "Oracle Corporation" - "Java SE 17.0.10" /Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
    11.0.12 (x86_64) "Oracle Corporation" - "Java SE 11.0.12" /Library/Java/JavaVirtualMachines/jdk-11.0.12.jdk/Contents/Home
    1.8.0_401 (x86_64) "Oracle Corporation" - "Java SE 8" /Library/Java/JavaVirtualMachines/jdk-1.8.jdk/Contents/Home
/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
```

## 3. 使用Homebrew包管理器

另一种安装Java的方法是通过命令行。为此，我们可以使用Homebrew，这是macOS的流行包管理器。

让我们看看使用Homebrew安装OpenJDK的步骤。

在我们开始之前，首先，让我们确保Homebrew已安装并更新：

```
% brew update
```

让我们搜索Homebrew公式中的OpenJDK：

```
% brew search openjdk
==> Formulae
openjdk ✔ openjdk@11 openjdk@17 ✔ openjdk@8 openj9 openjph openvdb

==> Casks
adoptopenjdk
```

我们可以看到这些OpenJDK公式的详细信息（最新版本）或任何特定版本，如openjdk@17：

```
% brew info openjdk
或
% brew info openjdk@17
```

接下来，我们可以安装最新版本的Java或特定LTS版本。让我们安装最新版本：

```
% brew install openjdk
```

如果我们想要任何特定版本，例如OpenJDK 17，我们需要运行以下命令：

```
% brew install openjdk@17
```

**OpenJDK安装在_/usr/local/opt_但不链接到像_/usr/local/bin_或_/Library/Java/JavaVirtualMachines/_这样的地方。因此，我们需要手动创建一个符号链接**：

```
% sudo ln -sfn /usr/local/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk
```

最后，让我们看看如何检查安装的Java版本：

```
% java -version
```

## 4. 结论

在本文中，我们探讨了在macOS机器上安装Java的不同方法。我们可以通过DMG安装或像Homebrew这样的包管理器。此外，一旦Java安装完成，我们可以运行一个Hello World Java程序并探索Java语言。

评论在文章发布后的30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。