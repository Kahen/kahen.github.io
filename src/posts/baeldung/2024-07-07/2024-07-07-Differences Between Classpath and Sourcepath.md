---
date: 2022-04-01
category:
  - Java
  - Tutorial
tag:
  - classpath
  - sourcepath
head:
  - - meta
    - name: keywords
      content: Java, classpath, sourcepath, compilation, execution
------
# Java中类路径（classpath）和源路径（sourcepath）的区别

在Java中，我们经常遇到源路径（sourcepath）和类路径（classpath）这两个术语。尽管这两个术语乍一看可能很相似，但它们在程序的编译和执行中具有不同的功能。尽管它们都有助于定位文件，但它们有一些明显的区别。

在本教程中，我们将探讨源路径和类路径的细微差别，并了解它们在使用上的区别。

源路径是由编译器用来定位需要编译Java程序的源代码文件的。**它指定了编译器在编译程序时应查找源文件的目录。**

如果源文件位于一个目录或多个目录中，它们在编译期间使用-sourcepath选项进行指定。

### 3. 通过命令行指定sourcepath

假设我们有一个具有以下目录结构的项目：

```
my-project/
|-- src/
|   |-- Main.java
|   |-- Utils.java
|-- test/
|   |-- TestMain.java
```

源文件位于_src_目录中，测试文件位于_test_目录中。要编译项目，我们需要使用-sourcepath选项指定源文件的位置：

```shell
$ javac -sourcepath ./src/ ./src/Main.java ./src/Utils.java
```

此命令告诉Java编译器在“_src_”目录中查找源文件。然而，我们仍然需要指定要编译的每个单独源文件相对于源目录的路径。这对编译器来说是必须的，以便知道源目录内每个源文件的确切位置。

### 4. 类路径（classpath）

类路径是由JVM（Java虚拟机）用来定位运行Java程序所需的编译类和其他资源的。**它指定了JVM在执行程序时应查找类文件的目录。**

在执行过程中，Java解释器使用类路径来定位运行程序所需的编译Java类文件。解释器读取类文件中的字节码并相应地执行程序。

如果编译后的类位于一个目录或多个目录中，它们在执行期间使用-classpath选项进行指定。

### 5. 通过命令行指定classpath

假设我们有一个具有下目录结构的项目：

```
my-project/
|-- src/
|   |-- Main.java
|   |-- Utils.java
```

这里，源文件位于_src_目录中。要编译并运行项目，我们需要指定classpath：

```shell
$ javac -classpath ./src/ ./src/Main.java ./src/Utils.java
```

此命令告诉编译器使用_src_目录中的任何外部依赖项。

代码编译后，我们可以使用相同的classpath运行程序：

```shell
$ java -classpath src Main
```

此命令告诉解释器使用位于_src_目录中编译后的_Main_类文件。

### 6. 在javac和java命令中使用classpath

javac命令使用-classpath选项来指定Java编译器所需的编译.class文件和外部库（例如JAR文件）的位置。

同样，java命令使用-classpath选项来指定Java程序在运行时需要访问的文件和外部库的位置。

### 7. 省略sourcepath并仅使用classpath

如果未指定-sourcepath选项，Java编译器将在用户类路径（使用-classpath选项指定）中以及当前工作目录中搜索源文件。

如果源文件位于已经包含在类路径中的目录中，可以省略-sourcepath选项。在这种情况下，编译器仍然能够找到并编译源文件。

### 8. 结论

在本文中，我们学习了sourcepath和classpath之间的一些关键区别。我们还了解了它们在命令行中的使用。

我们可以得出结论，sourcepath主要用于编译器，而classpath主要用于Java解释器。