---
date: 2024-06-13
category:
  - Software Development
tag:
  - Static Code Analysis
  - Infer
---
# 使用Infer进行静态代码分析

在软件开发领域，确保代码质量非常重要，尤其是对于复杂和庞大的代码库。像Infer这样的静态代码分析工具为我们提供了在潜在问题成为严重问题之前检测代码库中的技术。

在本教程中，我们将探讨代码分析的基础知识，探索Infer的功能，并提供将其纳入我们开发工作流程的实用见解。

静态分析是一种不执行程序而自动检查源代码的调试方法。这个过程有助于识别潜在的缺陷、安全漏洞和可维护性问题。通常由第三方工具进行，如众所周知的SonarQube，当自动化时，静态代码分析是直接的。

通常，它发生在早期的开发阶段。一旦代码编写完成，就应该运行静态代码分析器来检查代码。它将根据标准或自定义预定义规则检查代码。一旦代码通过静态代码分析器运行，分析器将确定代码是否符合设定规则。

在基本的企业环境中，它通常是持续集成（CI）流程的一部分。每次提交时，都会触发一个作业来构建应用程序、运行测试和分析代码，确保在部署之前符合合规性、安全性和安全性。

# Infer

Infer是一个用于Java、C、C++和Objective-C的静态代码分析工具，用OCaml编写。它最初由Facebook开发，并在2015年开源。从那时起，它在Facebook之外也获得了流行，被其他大公司采用。

对于Java和Android代码，它检查诸如空指针异常、资源泄漏和并发竞争条件等问题。在C、C++和Objective-C中，它检测诸如空指针问题、内存泄漏、编码约定违规和对不可用API的调用等问题。

为了有效处理大型代码库，Infer利用了分离逻辑和双归约等技术。分离逻辑允许它独立分析代码存储的一小部分，避免了一次性处理整个内存空间的需要。双归约是一种逻辑推理方法，帮助Infer发现代码不同部分的属性，允许它在后续分析中只关注修改的部分。

通过结合这些方法，这个工具可以在很短的时间内发现由数百万行代码构建的应用程序修改中的复杂问题。

### 3.1 Infer阶段

无论输入语言是什么，Infer都在两个主要阶段运行：捕获阶段和分析阶段。

在捕获阶段，Infer捕获编译命令，将文件翻译为分析的内部中间语言。这种翻译类似于编译，因此Infer从编译过程中获取信息以执行自己的翻译。这也是我们使用编译命令调用Infer的原因，例如：

```
infer run -- javac File.java
```

因此，文件像往常一样被编译，Infer还将它们翻译为第二阶段的分析。Infer将中间文件存储在默认在调用infer命令的文件夹中创建的结果目录_infer-out/by_中。

我们也可以只调用捕获阶段，使用_capture_子命令：

```
infer capture -- javac File.java
```

在分析阶段，_infer-out/_中的文件由Infer单独分析。每个函数和方法都被单独分析。如果Infer在分析某个方法或函数时遇到错误，它会停止对该特定实体的分析，但继续其他分析。因此，典型的工作流程包括运行Infer分析代码，解决识别出的错误，并重新运行Infer以发现额外的问题或确认修复。

检测到的错误在标准输出和名为_infer-out/report.txt_的文件中报告。Infer过滤并突出显示最有可能是真实的错误。

我们可以使用_analyze_子命令只调用分析阶段：

```
infer analyze
```

### 3.2 Infer全局和差异工作流程

默认情况下，如果存在，Infer将删除之前的_infer-out/_目录。这导致全局工作流程，每次都分析整个项目。

通过向Infer传递_–reactive_或_-r_可以防止其删除_infer-out/_目录，导致差异工作流程。例如，移动应用程序使用增量构建系统，代码随着一系列代码更改而发展。对于这些更改，只分析项目中的当前更改，而不是每次都分析整个项目是有意义的。因此，我们可以利用Infer的反应模式，切换到差异工作流程。

### 3.3 分析项目

我们可以使用诸如_javac_和_clang_之类的编译器来分Infer文件。此外，我们可以使用_gcc_，尽管Infer将在内部使用_clang_。此外，我们可以使用Infer与各种构建系统集成。

Java的一个流行的构建系统是Maven，我们可以以以下方式与Infer一起使用：

```
infer run -- mvn <maven target>
```

我们还可以使用Infer与Gradle一起使用：

```
infer run -- gradle <gradle task>
```

### 3.4 推荐用于CI的流程

Infer建议在持续集成（CI）中使用差异工作流程。因此，流程将是确定修改的文件并以反应模式运行分析。此外，如果我们想运行多个分析器，将捕获阶段分开更有效率，以便所有分析器都可以使用结果。

# 4.运行Infer

我们有多种使用Infer的选项：二进制发布版、从源代码构建Infer或Docker镜像。开始使用Infer页面解释了我们如何获取和运行Infer。

现在，我们可以创建一些虚拟的Java代码片段并分析它们。注意，我们将只涵盖Infer可以识别的一些问题类型，Infer可以检测到的所有问题类型的完整列表可以在此处找到。

### 4.1 空指针解引用

```java
public class NullPointerDereference {
    public static void main(String[] args) {
        NullPointerDereference.nullPointerDereference();
    }

    private static void nullPointerDereference() {
        String str = null;
        int length = str.length();
    }
}
```

如果我们对这段代码使用Infer，我们将得到以下输出：

```
Analyzed 1 file

Found 1 issue

./NullPointerDereference.java:11: error: NULL_DEREFERENCE
  object str last assigned on line 10 could be null and is dereferenced at line 11
   9.       private static void nullPointerDereference() {
  10.           String str = null;
  11. >         int length = str.length();
  12.       }
  13.   }

Summary of the reports

  NULL_DEREFERENCE: 1
```

### 4.2 资源泄漏

```java
public class ResourceLeak {
    public static void main(String[] args) throws IOException {
        ResourceLeak.resourceLeak();
    }

    private static void resourceLeak() throws IOException {
        FileOutputStream stream;
        try {
            File file = new File("randomName.txt");
            stream = new FileOutputStream(file);
        } catch (IOException e) {
            return;
        }
        stream.write(0);
    }
}
```

现在，通过运行Infer，我们可以看到检测到了资源泄漏：

```
Analyzed 1 file

Found 1 issue

./ResourceLeak.java:21: error: RESOURCE_LEAK
   resource of type java.io.FileOutputStream acquired to stream by call to FileOutputStream(...) at line 17 is not released after line 21
  19.               return;
  20.           }
  21. >         stream.write(0);
  22.       }
  23.   }

Summary of the reports

  RESOURCE_LEAK: 1
```

### 4.3 除以零

```java
public class DivideByZero {
    public static void main(String[] args) {
        DivideByZero.divideByZero();
    }

    private static void divideByZero() {
        int dividend = 5;
        int divisor = 0;
        int result = dividend / divisor;
    }
}
```

以下是我们的代码显示的输出：

```
Analyzed 1 file

Found 1 issue

./DivideByZero.java:9: error: DIVIDE_BY_ZERO
  The denominator for division is zero, which triggers an Arithmetic exception.
  6. private static void divideByZero() {
  7.     int dividend = 5;
  8.     int divisor = 0;
  9. >    int result = dividend / divisor;
  10. }

Summary of the reports

  DIVIDE_BY_ZERO: 1
```

# 结论

正如我们在本教程中发现的那样，静态代码分析工具对软件开发过程至关重要。Infer就是这样一种工具，它以其在各种编程语言中检测广泛问题的能力而脱颖而出。**通过利用Infer进行静态代码分析，我们可以主动解决错误和漏洞，从而实现更可靠和安全的软件应用程序。**

如常，源代码可在GitHub上获得。