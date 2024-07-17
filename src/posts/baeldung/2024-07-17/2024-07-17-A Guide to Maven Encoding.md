---
date: 2022-04-01
category:
  - Maven
  - 编码
tag:
  - Maven
  - 编码
head:
  - - meta
    - name: keywords
      content: Maven编码设置, Maven插件编码, Maven命令行编码
------
# Maven编码指南

## 1. 概述

在本教程中，我们将学习如何在Maven中设置字符编码。
我们将展示如何为一些常见的Maven插件设置编码。
此外，我们将看到如何在项目级别以及通过命令行设置编码。

## 2. 编码是什么，我们为什么要关心？

世界上有许多不同的语言，使用不同的字符。
一个称为Unicode的字符映射系统拥有超过10万个字符、符号甚至表情符号（emoji）。
为了不使用大量的内存，**我们使用一个称为编码的映射系统，将字符在位和字节之间以及屏幕上的可读字符之间进行转换。**
现在有许多编码系统。**要读取文件，我们必须知道使用的是哪种编码系统。**

### 2.1. 如果我们在Maven中不声明编码会发生什么？

Maven认为编码足够重要，以至于如果我们不声明编码，它会记录一个警告。
事实上，这个警告占据了Apache Maven网站上常见问题页面的首位。
为了看到这个警告，让我们向我们的构建中添加几个插件。
首先，让我们添加_maven-resources-plugin_，它将复制资源到输出目录：
```xml
``<plugin>``
    ```<groupId>```org.apache.maven.plugins```</groupId>```
    ```<artifactId>```maven-resources-plugin```</artifactId>```
    ``<version>``3.2.0``</version>``
```</plugin>```
```
我们还需要编译我们的代码文件，所以让我们添加_maven-compiler-plugin_：
```xml
``<plugin>``
    ```<groupId>```org.apache.maven.plugins```</groupId>```
    ```<artifactId>```maven-compiler-plugin```</artifactId>```
```</plugin>```
```
由于我们正在一个多模块项目中工作，那么父POM可能已经为我们设置了编码。为了演示目的，让我们通过覆盖它来清除编码属性（别担心，我们稍后会回到这个问题）：
```xml
```<properties>```
    ```<project.build.sourceEncoding>``````</project.build.sourceEncoding>```
```</properties>```
```
让我们使用标准的Maven命令运行插件：
```shell
mvn clean install
```
像这样取消设置我们的编码可能会破坏构建！我们将在日志中看到以下警告：
```
[INFO] --- maven-resources-plugin:3.2.0:resources (default-resources) @ maven-properties ---
  [WARNING] Using platform encoding (Cp1252 actually) to copy filtered resources, i.e. build is platform dependent!
```
警告指出，**如果没有指定编码系统，Maven将使用平台默认值。**
通常在Windows上，默认值是Windows-1252（也称为CP-1252或Cp1252）。
这个默认值可能会根据本地环境而改变。我们将在下面看到如何从我们的构建中移除这种平台依赖性。

### 2.2. 如果我们在Maven中声明了错误的编码会发生什么？

Maven是一个构建工具，需要能够读取源文件。
为了读取源文件，**Maven必须被设置为使用源文件编码的相同编码。**
Maven还会产生通常分发到另一台计算机的文件。因此，使用预期的编码写入输出文件是很重要的。**不在预期编码中的输出文件可能无法在不同的系统上读取。**
为了展示这一点，让我们添加一个使用非ASCII字符的简单Java类：
```java
public class NonAsciiString {

    public static String getNonAsciiString() {

        String nonAsciiŞŧř = "ÜÝÞßàæç";
        return nonAsciiŞŧř;
    }
}
```
在我们的POM中，让我们将我们的构建设置为使用ASCII编码：
```xml
```<properties>```
    ```<project.build.sourceEncoding>```US-ASCII```</project.build.sourceEncoding>```
```</properties>```
```
运行这个使用_mvn clean install_，我们会看到许多构建错误的形式：
```
[ERROR] /Baeldung/tutorials/maven-modules/maven-properties/src/main/java/com/baeldung/maven/properties/NonAsciiString.java:[15,31] unmappable character (0xC3) for encoding US-ASCII
```
我们看到这个是因为我们的文件包含非ASCII字符，所以它们不能通过ASCII编码读取。
在可能的情况下，保持事情简单并避免使用非ASCII字符是一个好主意。
在下一节中，我们将看到将Maven设置为使用UTF-8编码以避免任何问题也是一个好主意。

## 3. 我们如何在Maven配置中设置编码？

首先，让我们看看我们如何在插件级别设置编码。
然后我们将看到我们可以设置项目范围的属性。这意味着我们不需要在每个插件中声明编码。

### 3.1. 我们如何在Maven插件中设置_encoding_参数？

**大多数插件都带有_encoding_参数**，这使得这个过程非常简单。
我们需要在_maven-resources-plugin_和_maven-compiler-plugin_中设置编码。我们可以简单地将_encoding_参数添加到我们的每个Maven插件中：
```xml
``<configuration>``
    ``<encoding>``UTF-8``</encoding>``
``</configuration>``
```
让我们使用_mvn clean install_运行这段代码并查看日志：
```
[INFO] --- maven-resources-plugin:3.2.0:resources (default-resources) @ maven-properties ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
```
我们可以看到插件现在正在使用UTF-8，我们已经解决了上面的警告。

### 3.2. 我们如何在Maven构建中设置项目范围的_encoding_参数？

记住为每个声明的插件设置编码是非常麻烦的。
幸运的是，大多数Maven插件使用相同的全局Maven属性作为其_encoding_参数的默认值。
正如我们之前看到的，让我们从我们的插件中移除_encoding_参数，而是设置：
```xml
```<properties>```
    ```<project.build.sourceEncoding>```UTF-8```</project.build.sourceEncoding>```
```</properties>```

```
运行我们的构建会产生我们之前看到的相同的UTF-8日志行。
在多模块项目中，我们通常会在父POM中设置此属性。
**此属性将被任何设置的插件特定属性覆盖。**
重要的是要记住，插件不一定要使用这个属性。例如，早期版本（<2.2）的_maven-war-plugin_会忽略这个属性。

### 3.3. 我们如何为报告插件设置项目范围的_encoding_参数？

令人惊讶的是，**我们必须设置两个属性以确保我们为所有情况设置了项目范围的编码。**
为了说明这一点，我们将使用_properties-maven-plugin_：
```xml
``<plugin>``
    ```<groupId>```org.codehaus.mojo```</groupId>```
    ```<artifactId>```properties-maven-plugin```</artifactId>```
    ``<version>``1.1.0``</version>``
```</plugin>```
```
让我们还设置一个新的系统范围属性为空：
```xml
``<project.reporting.outputEncoding>````</project.reporting.outputEncoding>``
```
如果我们现在运行_mvn clean install_，我们的构建将失败，并记录：
```
[ERROR] Failed to execute goal org.apache.maven.plugins:maven-pmd-plugin:3.13.0:pmd (pmd) on project maven-properties: Execution pmd of goal
  org.apache.maven.plugins:maven-pmd-plugin:3.13.0:pmd failed: org.apache.maven.reporting.MavenReportException: : UnsupportedEncodingException ->
```
尽管我们设置了_project.build.sourceEncoding_，但这个插件也使用了一个不同的属性。为了理解为什么会这样，我们必须理解Maven构建配置和Maven报告配置之间的区别。
**插件可以用于构建过程或报告过程，这使用不同的属性键。**
这意味着仅仅设置_project.build.sourceEncoding_是不够的。我们还需要为报告过程添加以下属性：
```xml
``<project.reporting.outputEncoding>``UTF-8``</project.reporting.outputEncoding>``
```
**建议在项目范围级别设置这两个属性。**

### 3.4. 我们如何在命令行上设置Maven编码？

**我们可以通过命令行参数设置属性，而不需要在POM文件中添加任何配置。**我们可能会这样做，因为我们没有写入权限到pom.xml文件。
让我们运行以下命令来指定构建应该使用的编码：
```shell
mvn clean install -Dproject.build.sourceEncoding=UTF-8 -Dproject.reporting.outputEncoding=UTF-8
```
**命令行参数覆盖任何现有的配置。**
因此，即使我们删除了pom.xml文件中设置的任何编码属性，这也允许我们成功运行构建。

## 4. 在同一个Maven项目中使用多种类型的编码

**在项目中使用单一类型的编码是一个好主意。**
然而，我们可能被迫在同一个构建中处理多种类型的编码。例如，我们的资源文件可能有不同的编码系统，这可能超出了我们的控制范围。
我们能这样做吗？这取决于情况。
我们看到我们可以在插件的基础上设置_encoding_参数。因此，如果我们的代码需要使用CP-1252，但希望以UTF-8输出测试结果，那么我们可以这样做。
我们甚至可以在同一个插件中使用多种类型的编码，通过使用不同的执行来实现。
特别是，我们之前看到的_maven-resources-plugin_，它内置了额外的功能。
我们之前看到了_encoding_参数。该插件还提供了一个_propertiesEncoding_参数，允许属性文件与其他资源有不同的编码：
```xml
``<configuration>``
    ``<encoding>``UTF-8``</encoding>``
    `<propertiesEncoding>`ISO-8859-1``</configuration>``

当使用_mvn clean install_运行构建时，这将产生：
```
[INFO] --- maven-resources-plugin:3.2.0:resources (default-resources) @ maven-properties ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] Using 'ISO-8859-1' encoding to copy filtered properties files.
```
参考maven.apache.org的技术文档总是值得的，当调查插件如何使用编码时。

## 5. 结论

在本文中，我们看到了声明编码有助于**确保代码在任何环境中以相同的方式构建。**
我们看到了我们可以在插件级别设置编码参数。
然后，我们了解到**我们可以在项目级别设置两个属性**。它们是_project.build.sourceEncoding_和_project.reporting.outputEncoding_。
我们还看到了**可以通过命令行传递编码**。这允许我们在不编辑Maven POM文件的情况下设置编码类型。
最后，我们探讨了如何在同一个项目中使用多种类型的编码。
一如既往，示例项目可在GitHub上获取。
OK