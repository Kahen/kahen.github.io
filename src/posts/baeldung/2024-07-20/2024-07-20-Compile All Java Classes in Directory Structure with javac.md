---
date: 2022-03-01
category:
  - Java
  - Development
tag:
  - javac
  - compile
  - directory
head:
  - - meta
    - name: keywords
      content: Java, javac, compile, directory, tutorial
---
# 使用javac命令编译目录结构中的所有Java类

在某些特殊情况下，我们可能没有安装第三方构建工具，例如Ant或Maven。然而，我们仍然需要编译一个包含许多包和类的项目。

在本教程中，我们将使用_javac_命令来完成这项任务，并探讨不同的场景。

## 2. 使用文件名

假设当前目录下有两个目录：_src_和_out_。_src_目录包含我们的Java源文件，而_out_目录将包含相应的编译后的类文件。

让我们从一个简单的场景开始。_src_目录包含一个名为_com/baeldung/MyClass.java_的Java源文件：

![img](https://www.baeldung.com/wp-content/uploads/2022/03/2_javac-compile-all-java-source-files-in-a-directory-structure-01.png)

然后，让我们使用_javac_将_MyClass.java_文件编译到_out_目录：

```shell
$ javac -d ./out/ ./src/com/baeldung/MyClass.java
```

在上面的命令中，-d选项指定了类文件的目标目录。同时，我们应该注意到_MyClass.java_文件的确切代码并不是那么重要，我们只需要确保它是一个语法正确的Java文件。

让我们稍微复杂一点，再添加三个Java文件——_YourClass.java_、_HerClass.java_和_HisClass.java_：

![img](https://www.baeldung.com/wp-content/uploads/2022/03/javac-compile-all-java-source-files-in-a-directory-structure-02.png)

要编译上述四个Java文件，我们可以在命令行中列出它们：

```shell
$ javac -d ./out/ \
./src/com/baeldung/MyClass.java \
./src/com/baeldung/YourClass.java \
./src/com/baeldung/HerClass.java \
./src/com/baeldung/HisClass.java
```

然后，让我们添加一个新的_Main.java_文件，它引用了其他四个Java文件，例如，通过调用方法或创建对象实例：

![img](https://www.baeldung.com/wp-content/uploads/2022/03/2_javac-compile-all-java-source-files-in-a-directory-structure-03.png)

在这种情况下，我们只需要编译_Main.java_文件：

```shell
$ javac -sourcepath ./src/ -d ./out/ ./src/com/baeldung/Main.java
```

执行上述命令后，其他四个类文件也将被编译。这是因为javac默认会搜索所需的类型并编译相应的源文件。如果我们不想编译所需的类型，我们可以添加_-implicit:none_选项。

-sourcepath选项告诉Java编译器在哪里找到输入的源文件。如果未指定-sourcepath选项，javac将使用用户类路径搜索类文件和源文件。因此，我们可以将-sourcepath选项替换为-classpath或-cp选项：

```shell
$ javac -cp ./src/ -d ./out/ ./src/com/baeldung/Main.java
```

然而，这种方法有其局限性：javac命令仅编译所需的类型，并省略其他源文件。例如，如果我们添加了一个新的_ItsClass.java_，而_Main.java_没有引用它，那么_ItsClass.java_将不会被编译：

![img](https://www.baeldung.com/wp-content/uploads/2022/03/2_javac-compile-all-java-source-files-in-a-directory-structure-04.png)

总结来说，有两种场景适合在javac命令行中列出文件名：当只有少数Java源文件时，以及当有一个启动类递归引用其他类时。

## 3. 使用通配符

javac命令还支持使用通配符（*）编译同一目录中的多个源文件。

例如，我们可以使用通配符编译上述源文件：

```shell
$ javac -d ./out/ ./src/com/baeldung/*.java
```

让我们进一步复杂化场景，添加四个子包（_spring_、_summer_、_autumn_和_winter_）和相应的类：

![img](https://www.baeldung.com/wp-content/uploads/2022/03/javac-compile-all-java-source-files-in-a-directory-structure-05.png)

现在，在命令行中，我们可以使用通配符列出每个包来编译它们：

```shell
$ javac -d ./out/ \
./src/com/baeldung/*.java \
./src/com/baeldung/spring/*.java \
./src/com/baeldung/summer/*.java \
./src/com/baeldung/autumn/*.java \
./src/com/baeldung/winter/*.java
```

当只有少数几个包时，无论源文件数量如何，使用这种通配符方法都是合适的。

## 4. 使用参数文件

当有多个包需要编译时，使用参数文件的javac命令就非常方便了。参数文件可以包含javac选项和源文件名。

要使用参数文件，我们需要在参数文件名前加上@符号：

```shell
$ javac -d ./out/ @sources.txt
```

但是我们如何生成这样的@sources.txt文件呢？这取决于我们使用的操作系统。在Linux或macOS中，我们可以使用_find_命令：

```shell
$ find ./src/ -type f -name "*.java" > sources.txt
```

在上面的命令行中，./src/是我们的搜索起始目录，-type f选项仅过滤常规文件，-name "*.java"选项匹配所有以.java扩展名结尾的文件名。

然而，在Windows中，我们可以使用_dir_命令：

```shell
> dir src /b /s *.java > sources.txt
```

在上面的命令行中，src文件夹是我们的搜索路径，/b开关显示目录和文件名而不附加其他信息，/s选项列出指定目录及其所有子目录中的所有文件。

这种方法的缺点是，每当我们添加一个新的或删除一个现有的Java源文件时，我们需要重新生成sources.txt文件。

## 5. 其他方法

除了上述常见的方法外，还存在其他依赖于操作系统的方法，例如使用_globstar_或管道。

### 5.1. 使用Globstar

Bash 4.0版本增加了一个名为_globstar_的新globbing选项，它将双通配符（**）视为不同。启用此选项后，Bash将遍历多级目录；否则，Bash只会搜索单级目录。

然而，此选项默认是禁用的。我们可以使用_shopt_（sh + opt，shell选项）命令来检查Bash选项设置。如果我们不带任何参数执行_shopt_命令，它将输出一个长列表的选项及其状态（_on_或_off_）。

目前，我们只关心_globstar_选项：

```shell
$ shopt globstar
globstar        off
```

要启用它，我们使用带有-s选项的_shopt_命令：

```shell
$ shopt -s globstar
```

要禁用它，我们使用带有-u选项的_shopt_命令：

```shell
$ shopt -u globstar
```

启用此选项后，我们可以**使用双通配符调用javac**：

```shell
$ javac -d ./out/ ./src/**/*.java
```

### 5.2. 使用管道

从概念上讲，管道是两个进程之间的连接。我们可以利用这个管道机制将多个命令连接起来以产生我们期望的结果。

要编译我们的Java源文件，我们可以将_find_、_xargs_和_javac_命令结合起来：

```shell
$ find ./src/ -type f -name "*.java" | xargs javac -cp ./src/ -d ./out/
```

此外，_find_命令支持-exec动作：

```shell
$ find ./src/ -type f -name "*.java" -exec javac -cp ./src/ -d ./out/ '{}' ';'
```

上述命令行可能会运行得有点慢。这是因为javac命令将为每个匹配的文件运行。有关更多信息，我们可以使用_man find_命令来阅读-exec选项的文档。

**为了更快一些，我们可以将分号（;）换成加号（+）**。然后，javac命令将收集所有匹配的文件并只执行一次：

```shell
$ find ./src/ -type f -name "*.java" -exec javac -cp ./src/ -d ./out/ '{}' +
```

## 6. 结论

在本文中，我们首先查看了一些编译目录结构中所有Java源文件的常见方法，如使用文件名、通配符和参数文件。然后，我们查看了一些依赖于操作系统的方法，如使用_globstar_和管道。