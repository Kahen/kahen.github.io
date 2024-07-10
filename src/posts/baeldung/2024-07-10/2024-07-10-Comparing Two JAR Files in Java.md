---
date: 2022-12-01
category:
  - Java
  - Tools
tag:
  - JAR Comparison
  - Java Tools
head:
  - - meta
    - name: keywords
      content: Java, JAR, Comparison, Tools
---
# Java中比较两个JAR文件

JAR文件是分发Java应用程序的基本构件。有时，我们可能需要检查JAR文件以查看可能的变更，并找出向后兼容性。

在本教程中，我们将探索不同的工具来比较JAR文件。

## 2. 示例JAR文件

在本教程中，我们将比较mallet JAR文件。**Mallet是一个Java机器学习库**。**它的用途包括聚类、自然语言处理**等。我们将比较2.0.7版本和2.0.8版本。我们将使用不同的工具来比较这两个JAR文件并记录变更。

## 3. 使用Jarcomp

**Jarcomp是一个免费的跨平台工具，用于比较JAR和ZIP文件**。它通过引用大小变化来显示两个文件之间的变化。

我们将使用它来比较我们的示例JAR文件。首先，让我们创建一个新目录并将我们的示例JAR文件复制到其中。

然后让我们获取jarcomp可执行JAR并将其放置在我们创建的目录中。最后，让我们打开我们的终端并更改到我们的目录。

接下来，我们将使用我们的示例JAR文件运行_Jarcomp_可执行JAR：

```
$ java -jar jarcomp_02.jar mallet-2.0.7.jar mallet-2.0.8.jar
```

我们的工具生成了一份报告，显示了我们示例JAR文件中的变更：

![img](https://www.baeldung.com/wp-content/uploads/2022/12/2_jarcomp.png)

报告显示了我们二进制文件中的变更。此外，它总结了示例JAR文件中的文件数量。它还指示了示例JAR文件的总大小。

## 4. 使用PkgDiff

**PkgDiff意为包变更分析器**。它可视化ZIP、JAR、TAR.GZ、DEB等软件包中的变更。**该工具帮助软件维护者跟踪变更**。**并确保新旧版本之间的兼容性**。

支持的平台包括FreeBSD、Mac OS X和GNU/Linux。

我们将使用这个工具来比较我们的示例JAR文件。

### 4.1. 安装

首先，我们将在我们的机器上下载这个工具。然后，我们将解压缩下载的tar.gz：

```
$ tar -xvf pkgdiff-1.7.2.tar.gz
```

接下来，让我们更改到解压缩的文件：

```
$ cd pkgdiff-1.7.2
```

最后，让我们使用makefile安装这个工具：

```
$ sudo make install
```

我们的工具现在可以使用了。

### 4.2. 使用方法

让我们使用这个工具来可视化我们示例JAR文件中的变更。首先，让我们更改到包含我们示例JAR文件的目录。

然后让我们使用_pkgdiff_命令来比较示例JAR文件：

```
$ pkgdiff mallet-2.0.7.jar mallet-2.0.8.jar
```

我们的工具生成了一份HTML格式的报告，显示了二进制和源文件之间的差异：

![img](https://www.baeldung.com/wp-content/uploads/2022/12/2_pkgdiff.png)

报告显示了我们二进制文件中的变更。它显示了类文件的百分比变化。此外，它总结了二进制文件。它显示了添加和删除的文件数量。最后，它指出了目录的总数和新增加的内容。

## 5. 使用JAPICC

**Java API兼容性检查器（JAPICC）是一个评估Java库之间相似性的工具**。它显示二进制和源代码级别的变更。该工具检查可能危及向后兼容性的修改。它检查删除的方法和类字段，引入的方法等。它通过比较两个二进制文件来完成这些检查。

这个工具为二进制和源代码兼容性检查生成了HTML报告。它支持Java和Scala。

### 5.1. 安装

首先，我们将在我们的机器上下载这个工具。然后，我们将解压缩下载的zip：

```
$ unzip japi-compliance-checker-2.4.zip
```

解压缩zip文件后，我们将更改到目录：

```
$ cd japi-compliance-checker-2.4
```

最后，我们将使用makefile在我们的系统上安装它：

```
$ sudo make install
```

我们的工具现在可以使用了。

### 5.2. 使用方法

我们将使用我们安装的工具来比较我们的示例JAR文件。首先，我们将创建一个新目录并将我们的JAR文件移动到其中。然后我们将打开我们的终端并更改到我们的新目录。最后，我们将运行_japi-compliance_命令来比较两个JAR文件：

```
$ japi-compliance-checker mallet-2.0.7.jar mallet-2.0.8.jar
```

这在我们的目录中生成了一份报告。报告包含了JAR文件在二进制和源代码级别的差异。

![img](https://www.baeldung.com/wp-content/uploads/2022/12/2_binary-compatibility-1.png)

我们的报告显示了99.8%的兼容性，并在最新版本中添加了方法。它指出了源文件中方法和类的总数。它还比较了各个二进制和源文件，并给出了百分比变化。

## 6. 使用IntelliJ IDEA

**IntelliJ IDEA是JetBrains的集成开发环境**。**该IDE内置了一个比较JAR文件的工具**。我们将使用IDE来比较我们的示例JAR文件。首先，让我们启动IDE并打开包含我们示例JAR文件的文件夹。

接下来，让我们选择两个示例JAR文件。最后，让我们按CTRL + D来比较这两个JAR文件。

我们将获得一份关于我们JAR文件变更的全面报告：

![img](https://www.baeldung.com/wp-content/uploads/2022/12/2_intellij.png)

生成的报告非常清晰。它显示了二进制文件、其内容以及变更的内容。这个特性简单易用，功能强大。我们不需要安装任何东西就可以使用它。

结果还比较了源文件。它显示了类，并指出了源文件中的变更。此外，它显示了类及其内容。并在源文件中明确显示了添加的代码。

## 7. 结论

在本教程中，我们检查了不同的工具来比较两个JAR文件。IntelliJ IDEA看起来简单，易于开始使用。它提供了全面的报告，并可视化了类文件中的变更。

其他工具也完成了工作。PkgDiff和JAPICC生成了报告，显示了二进制文件和源文件中的变更。