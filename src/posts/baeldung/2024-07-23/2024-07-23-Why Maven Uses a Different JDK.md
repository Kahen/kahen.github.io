---
date: 2022-06-01
category:
  - Java
  - Maven
tag:
  - JDK
  - Maven配置
head:
  - - meta
    - name: keywords
      content: Maven, JDK, Java版本, Maven配置
---

# Maven为何使用不同的JDK版本 | Baeldung

在本教程中，我们将解释为什么Maven可能会使用与系统中默认设置不同的Java版本。此外，我们将展示Maven的配置文件位于何处，然后解释如何在Maven中配置Java版本。

## 2. Maven配置

首先，让我们看一下系统配置的一个可能情况，其中Maven使用的Java版本与系统中默认设置的不同。Maven配置返回：

```shell
$ mvn -v
Apache Maven 3.3.9 (bb52d8502b132ec0a5a3f4c09453c07478323dc5; 2015-11-10T17:41:47+01:00)
Maven home: C:\Users\test\apps\maven\3.3.9
Java version: 11.0.10, vendor: Oracle Corporation
Java home: C:\my\java\jdk-11.0.10
Default locale: pl_PL, platform encoding: Cp1250
OS name: "windows 10", version: "10.0", arch: "amd64", family: "dos"
```

如我们所见，它返回了Maven版本、Java版本和操作系统信息。Maven工具使用的是JDK版本11.0.10。

现在让我们看一下系统中设置的Java版本：

```shell
$ java -version
java version "13.0.2" 2020-01-14
Java(TM) SE Runtime Environment (build 13.0.2+8)
Java HotSpot(TM) 64-Bit Server VM (build 13.0.2+8, mixed mode, sharing)
```

默认的JDK设置为13.0.2。在接下来的部分中，我们将解释为什么它与Maven使用的版本不匹配。

## 3. 全局设置_JAVA_HOME_

让我们来看一下默认设置。首先，《JAVA_HOME变量是Maven配置的必须项》。此外，当它没有设置时，_mvn_命令会返回一个错误消息：

```shell
$ mvn
Error: JAVA_HOME not found in your environment.
Please set the JAVA_HOME variable in your environment to match the
location of your Java installation.
```

在Linux上，我们使用_export_命令设置系统变量。Windows有专门的系统变量设置用于此目的。当它被全局设置时，Maven使用系统中默认的Java版本。

## 4. Maven配置文件

现在让我们快速看一下在哪里可以找到Maven配置文件。有几个地方可以提供配置：

- _.mavenrc/mavenrc_pre.cmd_ – 用户定义的脚本，位于用户的主目录
- _settings.xml_ – 文件位于_~/.m2_目录，包含跨项目的配置
- _.mv_ – 项目内的配置目录

此外，我们可以使用_MAVEN_OPTS_环境变量来设置JVM启动参数。

## 5. 仅为Maven设置_JAVA_HOME_

我们看到Java版本与Maven使用的版本不同。换句话说，《Maven覆盖了_JAVA_HOME_变量提供的默认配置》。

它可以在_mvn_命令开始时执行的用户定义脚本中设置。在Windows中，我们在_%HOME%\mavenrc_pre.bat_或_%HOME%\mavenrc_pre.cmd_文件中设置它。Maven支持‘.bat’和‘.cmd’文件。在文件中，我们简单地设置_JAVA_HOME_变量：

```shell
set JAVA_HOME="C:\my\java\jdk-11.0.10"
```

另一方面，**Linux有_$HOME/.mavenrc_文件用于相同的目的**。在这里，我们几乎以相同的方式设置变量：

```shell
JAVA_HOME=C:/my/java/jdk-11.0.10
```

通过这种设置，即使系统中默认的是JDK 13，Maven也使用JDK 11。

**我们可以使用_MAVEN_SKIP_RC_标志跳过用户定义脚本的执行**。

此外，我们可以直接在Maven的可执行文件中设置变量。然而，这种方法不推荐，因为如果我们升级到更高版本的Maven，它将不会自动应用。

## 6. 结论

在这篇短文中，我们解释了Maven如何使用与默认不同的Java版本。然后，我们展示了Maven的配置文件位于何处。最后，我们解释了如何为Maven设置Java版本。