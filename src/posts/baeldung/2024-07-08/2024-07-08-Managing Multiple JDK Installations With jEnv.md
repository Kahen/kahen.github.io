---
date: 2024-07-09
category:
  - Software Development
  - Java
tag:
  - jEnv
  - JDK
  - Java Development
head:
  - - meta
    - name: keywords
      content: jEnv, JDK, Java Development, Software Development Kit
---
# 使用jEnv管理多个JDK安装

1. 引言

随着Java每次新版本的发布，我们可能需要在环境中管理多个并行版本的软件开发工具包（SDK）。因此，设置和管理_JAVA\_HOME_路径变量有时可能非常麻烦。

在本教程中，我们将看到jEnv如何帮助管理多个不同版本的JDK安装。

2. jEnv是什么？

jEnv是一个命令行工具，帮助我们管理多个JDK安装。它基本上在我们的shell中设置_JAVA\_HOME_，可以全局设置，也可以仅针对当前工作目录或每个shell设置。

它让我们能够快速切换不同的Java版本。这在处理使用不同Java版本的多个应用程序时特别有用。

值得注意的是，**jEnv并不为我们安装Java JDK。相反，它只是帮助我们方便地管理多个JDK安装。**

接下来，让我们深入了解jEnv的安装并查看其最常见的命令。

3. 安装jEnv

jEnv支持Linux和MacOS操作系统。此外，它支持Bash和Zsh shell。让我们从终端开始安装它：

在MacOS上，我们可以简单地使用Homebrew安装jEnv：

```
$ brew install jenv
```

在Linux上，我们可以从源代码安装jEnv：

```
$ git clone https://github.com/jenv/jenv.git ~/.jenv
```

接下来，让我们根据使用的shell添加已安装的_jenv_命令到路径。

为Bash shell添加PATH条目：

```
$ echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.bash_profile
$ echo 'eval "$(jenv init -)"' >> ~/.bash_profile
```

为Zsh shell添加PATH条目：

```
$ echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.zshrc
$ echo 'eval "$(jenv init -)"' >> ~/.zshrc
```

最后，为了验证jEnv的安装，我们使用_jenv doctor_命令。在MacOS上，命令将显示以下内容：

```
$ jenv doctor
[OK] 没有设置JAVA_HOME
[ERROR] 路径中的Java二进制文件不在jenv shims中。
[ERROR] 请检查您的路径，或尝试使用/path/to/java/home不是有效的java安装路径。
    PATH : /opt/homebrew/Cellar/jenv/0.5.4/libexec/libexec:/Users/jenv/.jenv/shims:/Users/user/.jenv/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
[OK] jEnv已正确加载
```

这表明_jenv_已正确安装并加载，但Java尚未安装。

接下来，让我们看看如何安装和管理多个JDK版本。

让我们从设置一个JDK版本开始。我们可以使用像brew、yum或apt这样的可用包管理器安装JDK。或者，我们也可以下载JDK并将其放在某个文件夹中。

jEnv的好处是我们不需要通过包管理器安装JDK。我们可以简单地下载一个JDK并将其放在某个文件夹中。

4.1. 向jEnv添加JDK

首先，要使用新的JDK与jEnv，我们需要告诉jEnv在哪里找到它。为此，我们使用_jenv add_命令并指定JDK的路径：

```
$ jenv add /Library/Java/JavaVirtualMachines/openjdk-8.jdk/Contents/Home/
openjdk8-1.8.0.332 added
1.8.0.332 added
1.8 added
```

这将向jEnv添加JDK 8。每个版本都以三个不同的名称可用。让我们再次运行_jenv doctor_以确认JDK设置：

```
$ jenv doctor
[OK] 没有设置JAVA_HOME
[OK] 路径中的Java二进制文件是jenv shims
[OK] jEnv已正确加载
```

我们可以看到jEnv现在识别了配置的JDK。

接下来，让我们使用_jenv versions_命令列出所有可用的JDK：

```
$ jenv versions
* system (set by /Users/user/.jenv/version)
  1.8
  1.8.0.332
  openjdk64-1.8.0.332
```

这列出了所有注册到jEnv的JDK。在我们的例子中，我们配置了JDK 8到jEnv。

为了演示使用多JDK，让我们再安装一个JDK版本——11，并用jEnv配置它：

```
$ jenv add /Library/Java/JavaVirtualMachines/openjdk-11.jdk/Contents/Home/
openjdk64-11.0.15 added
11.0.15 added
11.0 added
11 added
```

现在运行_jenv versions_命令将列出两个配置的JDK版本：

```
$ jenv versions
* system (set by /Users/avinb/.jenv/version)
  1.8
  1.8.0.332
  11
  11.0
  11.0.15
  openjdk64-11.0.15
  openjdk64-1.8.0.332
```

显然，我们现在有两个JDK版本配置在jEnv上。

4.2. 使用jEnv管理JDK版本

jEnv支持三种类型的JDK配置：

- 全局 – 我们在计算机上任何地方输入_java_命令时将使用的JDK。
- 本地 – 仅针对特定文件夹配置的JDK。在文件夹中输入java命令将使用本地JDK版本而不是全局JDK版本。
- Shell – 仅用于当前shell实例的JDK。

首先，让我们检查全局JDK的版本：

```
$ jenv global
system
```

此命令输出“_system”_，表示系统安装的JDK将用作全局JDK。让我们将全局JDK版本设置为JDK 11：

现在检查全局版本将显示JDK 11：

```
$ jenv global
11
```

接下来，让我们看看如何设置本地JDK版本。

例如，假设我们在_~/baeldung-project_目录中有一个使用JDK 8的示例项目。让我们_cd_进入此目录并检查此项目的本地JDK版本：

```
$ jenv local
jenv: no local version configured for this directory
```

此错误消息表明我们尚未为此目录设置任何本地JDK版本。在没有本地JDK版本的情况下运行_jenv version_命令将显示全局JDK版本。让我们为此目录设置本地JDK版本：

```
$ jenv local 1.8
```

此命令为_~/baeldung-project_目录设置了本地JDK。设置本地JDK基本上会在当前目录中创建一个名为_.java-version_的文件。该文件包含我们设置的本地JDK版本“_1.8″_。

再次在此目录中运行jenv version命令现在将输出JDK 8。让我们检查此目录中设置的本地JDK版本：

```
$ jenv local
1.8
```

最后，要为特定的shell实例设置JDK版本，我们使用_jenv shell_命令：

```
$ jenv shell 1.8
```

这将为当前shell实例设置JDK版本，并覆盖已经设置的任何本地和全局JDK版本。

4.3. 配置jEnv与Maven和Gradle

众所周知，像Maven和Gradle这样的工具使用系统JDK运行。它不使用jEnv配置的JDK。为了确保jEnv能够正确地与Maven和Gradle一起工作，我们必须启用它们各自的插件。

对于Maven，我们将启用jEnv的_maven_插件：

```
$ jenv enable-plugin maven
```

同样，对于Gradle，我们将启用jEnv的_gradle_插件：

```
$ jenv enable-plugin gradle
```

现在运行Maven和Gradle命令将使用jEnv特定的JDK版本，而不是系统JDK。

注意，有时jEnv可能无法选择正确的JDK版本，我们可能会遇到错误。对于这种情况，我们可能需要启用jEnv的_export_插件：

```
$ jenv enable-plugin export
```

换句话说，这个插件将确保_JAVA\_HOME_变量被正确设置。

另外，SDKMAN是管理JDKs等工具的另一种替代工具。

5. 结论

在本文中，我们首先了解了jEnv是什么以及如何安装它。

然后，我们看到了jEnv如何帮助我们方便地配置和管理不同的JDK安装。接下来，我们看到了如何快速使用全局、本地和特定于shell的JDK版本。这将特别有助于我们处理使用不同JDK版本的多个不同项目。

最后，我们看到了如何配置jEnv以与构建工具如Maven和Gradle一起工作。