---
date: 2024-06-22
category:
  - OpenJDK
  - Windows
tag:
  - Java
  - JDK
  - 安装
head:
  - - meta
    - name: keywords
      content: OpenJDK, Windows, Java, JDK, 安装, 教程
---
# 在Windows上安装OpenJDK

Java在现代软件开发中扮演着关键角色，为许多应用程序和系统提供支持。为了在我们的机器上利用Java的力量，我们需要安装Java开发工具包（JDK）。虽然Oracle JDK是一个流行的选择，但OpenJDK提供了一个具有相似功能的开源替代品。

在本文中，我们将探讨在Windows环境中安装OpenJDK的各种方法，以满足不同的偏好和需求。

## 2. 手动安装

这种方法涉及直接从官方网站或受信任的存储库（如AdoptOpenJDK）下载OpenJDK发行版。

下载后，将归档的内容解压到我们机器上的首选位置。配置环境变量，如_PATH_和_JAVA_HOME_，指向OpenJDK安装的目录至关重要。让我们通过访问控制面板并导航到_系统设置_来继续操作：

选择_高级_系统设置将弹出一个对话框：

现在，让我们通过点击环境变量来查看系统和用户变量。在这里，我们将修改_PATH_变量，并包含_JAVA_HOME_变量。_JAVA_HOME_变量应该指示OpenJDK的安装目录，而_PATH_变量应该指向JDK的bin目录。

在我们的例子中，_JAVA_HOME_将是_C:\Program Files\Java\jdk-21.0.2_，而_PATH_将是_C:\Program Files\Java\jdk-21.0.2\bin_。

最后，我们可以通过在命令提示符中运行以下命令来确认安装成功：

```
> java -version
```

运行上述命令后，命令提示符将显示类似的输出：

## 3. Chocolatey包管理器

Chocolatey是Windows的一个流行包管理器，它简化了软件包的安装和管理。它提供了一个命令行界面（CLI），允许用户轻松搜索、安装和卸载软件包，类似于Ubuntu上的apt或macOS上的Homebrew。

在我们继续之前，我们需要首先在我们的机器上安装Chocolatey。让我们打开一个提升的命令并运行以下命令：

```
> Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

一旦Chocolatey安装完成，我们可以使用它来安装OpenJDK。运行以下命令将安装Java：

```
> choco install openjdk
```

## 4. Scoop包管理器

与Chocolatey类似，Scoop是另一个专门为Windows设计的包管理器。Scoop面向个人用户而非系统范围的安装。它在用户的主目录中安装包，这不需要管理员权限。

要开始使用Scoop，我们首先必须安装它：

```
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

现在，要使用Scoop安装OpenJDK，我们需要以管理员身份打开PowerShell并执行以下命令：

```
> scoop bucket add java
> scoop install openjdk
```

## 5. 使用第三方安装程序

一些第三方工具和实用程序为Windows上的OpenJDK提供了简化的安装程序。例如，SDKMAN!和WinGet等工具提供了一个易于使用的界面，用于管理软件安装，包括OpenJDK。

如果我们更倾向于具有附加功能和自定义选项的更流畅的安装过程，我们可以探索这些选项。

## 6. 结论

在本文中，我们探讨了在Windows机器上安装OpenJDK的不同方式。我们可以选择手动安装，使用Chocolatey或Scoop等包管理器，或第三方安装程序，每种方法在简单性、定制性和自动化方面都提供了其优势。

我们可以选择最符合我们偏好和工作流程的方法。