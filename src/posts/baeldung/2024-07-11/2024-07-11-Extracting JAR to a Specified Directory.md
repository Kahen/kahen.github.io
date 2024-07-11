---
date: 2024-07-11
category:
  - Java
  - Linux
tag:
  - JAR
  - Bash
  - unzip
head:
  - - meta
    - name: keywords
      content: JAR文件, 解压, Linux, Bash, unzip
---
# 提取JAR文件到指定目录

通常，当我们在Java项目中需要JAR文件时，我们会将它们作为外部库放在类路径中而不解压缩。然而，有时我们可能需要将它们解压到文件系统中。

在本教程中，我们将探讨如何在命令行中将JAR文件解压到指定目录。**我们将以Linux和Bash为例来介绍每种方法**。

### 2. 问题介绍

我们将以Guava的JAR文件为例，在本教程中。在编写本文时，最新版本是guava-31.1-jre.jar。

Java提供了_jar_命令来创建、更新、查看和解压JAR文件。接下来，让我们使用_jar_命令解压Guava的JAR文件：

```shell
$ tree /tmp/test/jarTest
/tmp/test/jarTest
└── guava-31.1-jre.jar

0 directories, 1 file

$ pwd
/tmp/test/jarTest

$ jar xf guava-31.1-jre.jar

$ tree /tmp/test/jarTest
/tmp/test/jarTest
├── com
│   └── google
│       ├── common
│       │   ├── annotations
│       │   │   ├── Beta.class
...
27 directories, 2027 files
```

如上输出所示，**我们可以使用_jar xf_解压JAR文件**，并且_jar_命令默认将其解压到当前目录。

然而，**_jar_命令不支持将文件解压到指定目录**。

接下来，让我们看看实际操作中如何实现这一点。

我们已经知道_jar_命令默认将给定的JAR文件解压到当前工作目录。

因此，解决这个问题的一个想法产生了：如果我们想要将JAR文件解压到指定的目标目录，**我们可以首先进入目标目录，然后启动_jar_命令**。

接下来，让我们确定这个想法是否如预期那样工作。

### 3.1. 测试这个想法

首先，让我们创建一个新的目录_/tmp/test/newTarget_：

```shell
$ mkdir /tmp/test/newTarget

$ tree /tmp/test/newTarget
/tmp/test/newTarget
0 directories, 0 files
```

接下来，让我们进入目标目录，然后解压Guava的JAR文件：

```shell
$ cd /tmp/test/newTarget && jar xf /tmp/test/jarTest/guava-31.1-jre.jar
$ tree /tmp/test/newTarget
/tmp/test/newTarget
├── com
│   └── google
│       ├── common
│       │   ├── annotations
│       │   │   ├── Beta.class
...
```

如上例所示，这个想法是有效的。我们已经将Guava的JAR文件解压到我们期望的目录。

然而，如果我们重新审视我们执行的命令，我们意识到有一些不便之处：

- 如果是一个新的目标目录，我们必须手动先创建它。
- 由于_cd_命令更改了我们的当前工作目录，我们必须使用JAR文件的绝对路径。
- 执行命令后，我们会留在目标目录而不是我们开始的地方。

接下来，让我们看看如何改进我们的解决方案。

### 3.2. 创建_xJarTo()_函数

我们可以创建一个shell函数来自动创建目录并适应JAR文件的路径。让我们首先看看这个函数，然后理解它的工作原理：

```bash
#!/bin/bash

xJarTo() {
    the_pwd=$(pwd)
    the_jar=$1
    the_dir=$2

    if [[ "$the_jar" =~ ^[^/].* ]]; then
        the_jar="${the_pwd}/$the_jar"
    fi
    echo "Extracting $the_jar to $the_dir ..."
    mkdir -p "$the_dir"
    cd "$the_dir" && jar xf "$the_jar"
    cd "$the_pwd"
}

```

该函数首将用户的当前工作目录（_pwd_）存储在_the_pwd_变量中。

然后，它检查JAR文件的路径：

- 如果它以“_/_”开头 - 绝对路径，所以我们直接使用用户输入
- 否则 - 相对路径。我们需要将用户的当前工作目录添加到前面以构建要使用的绝对路径

因此，该函数适应了绝对和相对JAR路径。

接下来，在进入目标目录之前，我们执行_mkdir -p_命令。**_p_选项告诉_mkdir_命令如果在给定路径中缺少目录，则创建它们**。

然后，我们使用_cd_进入目标目录，并使用准备好的JAR文件路径执行_jar xf_命令。

最后，我们导航回用户的当前工作目录。

### 3.3. 测试函数

现在我们已经了解了_xJarTo()_函数的工作原理，让我们_source_这个函数并测试它是否按预期工作。

首先，让我们测试目标目录是新的，JAR文件是绝对路径的场景：

```shell
$ pwd
/tmp/test

$ xJarTo /tmp/test/jarTest/guava-31.1-jre.jar /tmp/a_new_dir
Extracting /tmp/test/jarTest/guava-31.1-jre.jar to /tmp/a_new_dir ...

$ tree /tmp/a_new_dir
/tmp/a_new_dir
├── com
│   └── google
│       ├── common
│       │   ├── annotations
│       │   │   ├── Beta.class
...
$ pwd
/tmp/test
```

如上输出所示，该函数按预期工作。新目录已即时创建，提取的内容位于_/tmp/a_new_dir_下。此外，在调用函数后，我们仍然在_/tmp/test_下。

接下来，让我们测试相对JAR路径的场景：

```shell
$ pwd
/tmp/test/jarTest

$ xJarTo guava-31.1-jre.jar /tmp/another_new_dir
Extracting /tmp/test/jarTest/guava-31.1-jre.jar to /tmp/another_new_dir ...

$ tree /tmp/another_new_dir
/tmp/another_new_dir
├── com
│   └── google
│       ├── common
│       │   ├── annotations
│       │   │   ├── Beta.class
...

$ pwd
/tmp/test/jarTest
```

这次，由于我在_/tmp/test/jarTest_下，我们直接将_guava-31.1-jre.jar_传递给函数。结果表明，该函数也能完成工作。

## 4. 使用其他解压缩命令

JAR文件使用ZIP压缩。因此，**所有解压缩工具都可以解压JAR文件**。如果一个解压缩工具支持解压到指定目录，它就解决了这个问题。

这种方法要求我们的系统上至少有一个解压缩工具可用。否则，我们需要安装它。值得一提的是，**在系统上安装软件包通常需要_root_或_sudo_权限**。

接下来，让我们以_unzip_为例，展示在流行的_yum_和_apt_包管理器上安装的命令：

```shell
# apt
sudo apt install unzip

# yum
sudo yum install unzip
```

**_unzip_命令支持-d选项，将ZIP归档解压到不同的目录**：

```shell
$ unzip guava-31.1-jre.jar -d /tmp/unzip_new_dir
$ tree /tmp/unzip_new_dir
/tmp/unzip_new_dir
├── com
│   └── google
│       ├── common
│       │   ├── annotations
│       │   │   ├── Beta.class
...
```

正如我们所看到的，_unzip -d_将JAR文件解压到指定的目录。

## 5. 结论

在本文中，我们学习了将JAR文件解压到指定目录的两种方法。

为了实现这一点，我们可以创建一个shell函数来包装标准的JAR命令。或者，如果我们的系统上有其他可用的解压缩工具，如_unzip_，我们可以使用它们的相应选项将JAR内容解压到所需的目录。