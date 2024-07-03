---
date: 2023-06-20
category:
  - Maven
  - Build
tag:
  - Maven
  - Build
  - Resume
head:
  - - meta
    - name: keywords
      content: Maven, Build, Resume, 构建, 恢复, Maven构建
---
# 从失败点开始恢复Maven构建

在这个教程中，我们将学习如何在Maven构建失败后恢复它。我们将看到如何跳过已经成功构建的模块。因此，我们将直接跳到问题出现的地方。

## 示例设置

让我们构建一个多模块Maven项目。我们称父模块为_resume-from_，两个子模块为_lib_和_business_。为了演示，我们将_lib_项目留空。然而，_business_项目包含一个单独的_src/main/java/Main.java_文件，其中包含一个_Hello World_。现在让我们在_business_模块中添加_lib_的依赖：

```xml
`<dependency>`
    `<groupId>`com.baeldung`</groupId>`
    `<artifactId>`lib`</artifactId>`
    `<version>`1.0-SNAPSHOT`</version>`
`</dependency>`
```

到目前为止，项目的内容是正确的，所以我们可以成功构建它：

```shell
$ mvn clean install
[...] 
[INFO] Reactor Summary for resume-from 1.0-SNAPSHOT:
[INFO]
[INFO] resume-from ........................................ SUCCESS [  1.749 s]
[INFO] lib ................................................ SUCCESS [  2.021 s]
[INFO] business ........................................... SUCCESS [  0.991 s]
[INFO] ------------------------------------------------------------------------ 
[INFO] BUILD SUCCESS
[...] 
```

## 运行_install_阶段时

现在让我们从_Main.java_文件中删除分号。这破坏了_business_子模块的构建：

```shell
$ mvn clean install
[...] 
[INFO] Reactor Summary for resume-from 1.0-SNAPSHOT:
[INFO]
[INFO] resume-from ........................................ SUCCESS [  1.186 s]
[INFO] lib ................................................ SUCCESS [  0.984 s]
[INFO] business ........................................... FAILURE [  0.334 s]
[INFO] ------------------------------------------------------------------------ 
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------ 
[INFO] Total time:  2.809 s
[INFO] Finished at: 2023-06-20T16:15:13+02:00
[INFO] ------------------------------------------------------------------------ 
[ERROR] Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin:3.8.1:compile (default-compile) on project business: Compilation failure
[ERROR] [...]/resume-from/business/src/main/java/Main.java:[4,43] ';' expected
[...]
[ERROR] After correcting the problems, you can resume the build with the command
[ERROR]   mvn ``<args>`` -rf :business
```

由于_lib_子模块已成功构建，修复问题后跳过它的构建将是很好的。正如Maven的错误消息所说，我们可以使用_rf_选项从给定模块恢复反应器。让我们修复_Main.java_文件并尝试这个：

```shell
$ mvn clean install -rf :business
[INFO] Scanning for projects...
[INFO]
[INFO] -----------------------``< com.baeldung:business >``------------------------ 
[INFO] Building business 1.0-SNAPSHOT
[INFO] --------------------------------[ jar ]--------------------------------- 
[...] 
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------ 
[INFO] Total time:  1.318 s
[INFO] Finished at: 2023-06-20T17:21:07+02:00
[INFO] ------------------------------------------------------------------------ 
```

正如预期的那样，这次只构建了_business_子模块。实际上，_rf_是_resume-from_的简写，所以我们也可以等价地写：

```shell
$ mvn clean install --resume-from :business
```

## 不运行_install_

现在让我们假设我们没有运行Maven _install_，而是在早期阶段停止了构建。为了展示这一点，我们可以回到_Main.java_文件损坏的情况。让我们也清理我们的本地仓库并运行_package_阶段：

```shell
$ mvn clean package
[...] 
[INFO] Reactor Summary for resume-from 1.0-SNAPSHOT:
[INFO]
[INFO] resume-from ........................................ SUCCESS [  0.108 s]
[INFO] lib ................................................ SUCCESS [  0.709 s]
[INFO] business ........................................... FAILURE [  0.316 s]
[INFO] ------------------------------------------------------------------------ 
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------ 
[INFO] Total time: 1.216 s
[INFO] Finished at: 2023-06-20T17:49:59+02:00
[INFO] ------------------------------------------------------------------------ 
[ERROR] Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin:3.1:compile (default-compile) on project business: Compilation failure
[ERROR] [...]/resume-from/business/src/main/java/Main.java:[4,43] ';' expected
[...]
[ERROR] After correcting the problems, you can resume the build with the command
[ERROR] mvn ``<args>`` -rf :business
```

毫不意外，我们得到了相同的编译错误。错误消息给了我们同样的提示，在修复问题后使用_rf_选项。因此，让我们修复问题并运行这个命令：

```shell
$ mvn clean package -rf :business
[INFO] Scanning for projects...
[INFO]
[INFO] -----------------------``< com.baeldung:business >``------------------------
[INFO] Building business 1.0-SNAPSHOT
[INFO] --------------------------------[ jar ]--------------------------------- 
[WARNING] The POM for com.baeldung:lib:jar:1.0-SNAPSHOT is missing, no dependency information available
[INFO] ------------------------------------------------------------------------ 
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------ 
[INFO] Total time:  0.187 s
[INFO] Finished at: 2023-06-20T17:56:34+02:00
[INFO] ------------------------------------------------------------------------ 
[ERROR] Failed to execute goal on project business: Could not resolve dependencies for project com.baeldung:business:jar:1.0-SNAPSHOT: Could not find artifact com.baeldung:lib:jar:1.0-SNAPSHOT -> [Help 1]
```

因为我们没有运行_install_阶段，_lib_子模块在第一次构建期间没有安装在我们的本地仓库中。因此，当尝试恢复构建时，Maven找不到_lib_工件。理论上，我们可以通过在命令行中添加_also-make_选项来解决这个问题。有了_also-make_，Maven应该构建所有_business_依赖的项目。然而，Maven 3中有一个bug，当与_resume-from_一起使用时，_also-make_被忽略了。

这个bug将在Maven 4中得到修复，目前Maven 4仍在开发中。与此同时，我们不能在这种情况下从特定模块恢复反应器。**不幸的是，我们需要重新进行整个构建：**

```shell
$ mvn clean package
[...] 
[INFO] Reactor Summary for resume-from 1.0-SNAPSHOT:
[INFO]
[INFO] resume-from ........................................ SUCCESS [  0.109 s]
[INFO] lib ................................................ SUCCESS [  0.660 s]
[INFO] business ........................................... SUCCESS [  0.436 s]
[INFO] ------------------------------------------------------------------------ 
[INFO] BUILD SUCCESS
[...] 
```

## 结论

在本文中，我们看到了如何在Maven构建失败后跳过部分构建。当我们将子模块安装到本地仓库时，我们可以使用_rf_选项。另一方面，不安装它们将导致需要重新进行整个构建，因为Maven的一个bug。

如往常一样，代码可在GitHub上获取。