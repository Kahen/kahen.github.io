---
date: 2022-01-20
category:
  - Hibernate Validator
  - Annotation Processor
tag:
  - Java
  - Bean Validation
head:
  - - meta
    - name: keywords
      content: Hibernate Validator, Annotation Processor, Java, Bean Validation
---
# Hibernate Validator注解处理器深度解析

在本文中，我们将深入探讨Hibernate Validator注解处理器。首先，我们将安装并配置它，然后通过三个常见的约束问题来探索它的行为。示例代码可以在GitHub上找到。

请注意，此工具的版本7仅与jakarta.validation约束兼容。此外，处理器还提供了如何在主要Java IDE中设置它的指导。

以下是文章的翻译内容，包括概述、配置、常见约束问题和结论部分，以及示例代码和错误信息的翻译。由于篇幅限制，这里只提供部分翻译的示例：

## 1. 概述

很容易误用Bean验证约束。例如，我们可能会不小心在一个String属性上使用@Future约束。这类错误可能导致运行时出现不可预测的错误。

幸运的是，Hibernate Validator注解处理器可以在编译时检测这些问题。得益于它抛出的错误，我们可以更早地捕捉到这些错误。

在本教程中，我们将探讨如何配置处理器，并查看它可以为我们找到的一些常见问题。

## 2. 配置

### 2.1. 安装

让我们从将注解处理器依赖项添加到我们的pom.xml开始：

```xml
`<plugin>`
    ```<groupId>```org.apache.maven.plugins```</groupId>```
    ```<artifactId>```maven-compiler-plugin```</artifactId>```
    ```<version>```3.6.1```</version>```
    `<configuration>`
        `<source>`1.8`</source>`
        `<target>`1.8`</target>`
        ```<compilerArgs>```
            ```````<arg>```````-Averbose=true```````</arg>```````
            ```````<arg>```````-AmethodConstraintsSupported=true```````</arg>```````
            ```````<arg>```````-AdiagnosticKind=ERROR```````</arg>```````
        ```</compilerArgs>```
        `<annotationProcessorPaths>`
            `<path>`
                ```<groupId>```org.hibernate.validator```</groupId>```
                ```<artifactId>```hibernate-validator-annotation-processor```</artifactId>```
                ```<version>```6.2.0.Final```</version>```
            `</path>`
        `</annotationProcessorPaths>`
    `</configuration>`
`</plugin>`
```

我们应该注意，这个工具的版本7仅与jakarta.validation约束兼容：

```xml
`<dependency>`
    ```<groupId>```jakarta.validation```</groupId>```
    ```<artifactId>```jakarta.validation-api```</artifactId>```
    ```<version>```3.0.1```</version>```
`</dependency>`
```

处理器还提供了如何在主要Java IDE中设置它的指导。

### 2.2. 编译器选项

让我们设置我们的处理器编译器选项：

```xml
```<compilerArgs>```
    ```````<arg>```````-Averbose=true```````</arg>```````
    ```````<arg>```````-AmethodConstraintsSupported=true```````</arg>```````
    ```````<arg>```````-AdiagnosticKind=ERROR```````</arg>```````
```</compilerArgs>```
```

首先，diagnosticKind选项针对日志级别。为了在编译时捕捉问题，最好保持默认的ERROR值。所有允许的值都在Diagnostic.Kind枚举中引用。

接下来，如果我们想要将注解验证限制为仅getter，我们应该将methodConstraintsSupported选项设置为false。

在这里，我们将verbose设置为true以获得更多的输出，但如果我们不想要大量的日志输出，我们可以将其设置为false。

## 3. 常见约束问题

注解处理器带有一组预定义的错误来检查。让我们通过使用一个简单的Message类作为示例，更仔细地查看其中的三个：

```java
public class Message {
    // 构造函数省略
}
```

### 3.1. 只有Getter可以被注解

首先，这个问题在处理器的默认选项下不应该存在。顾名思义，当我们在非getter方法上注解时，就会出现这个问题。我们需要将methodConstraintsSupported选项设置为true以允许这样做。

让我们向我们的Message类添加三个注解方法：

```java
@Min(3)
public boolean broadcast() {
    return true;
}

@NotNull
public void archive() {
}

@AssertTrue
public boolean delete() {
    return false;
}
```

接下来，我们在配置中将methodConstraintsSupported选项设置为false：

```xml
```<compilerArgs>```
    ```````<arg>```````AmethodConstraintsSupported=false```````</arg>```````
```</compilerArgs>```
```

最后，这三种方法将导致处理器检测到我们的问题：

[编译错误信息]

### 3.2. 只有非Void方法可以被注解

这个问题说明我们不应该用约束验证来装饰void方法。我们可以通过在我们的Message类中注解一个archive方法来看到它的作用：

```java
@NotNull
public void archive() {
}
```

这将导致处理器引发错误：

[编译错误信息]

### 3.3. 注解不支持的类型

这最后一个问题是最常见的。当注解目标数据类型与目标属性不匹配时，就会发生这种情况。让我们通过在我们的Message类中添加一个错误注解的String属性来看看它是如何工作的：

```java
@Past
private String createdAt;
```

由于@Past注解，将会出现错误。实际上，只有日期类型才能使用此约束：

[编译错误信息]

如果我们将错误的注解应用于具有不支持返回类型的方法是，我们会得到类似的错误：

```java
@Min(3)
public boolean broadcast() {
    return true;
}
```

处理器错误消息与之前的相同：

[编译错误信息]

## 4. 结论

在本文中，我们尝试了Hibernate Validator注解处理器。

首先，我们安装了它并配置了它的选项。然后，我们通过三个常见的约束问题探索了它的行为。

如往常一样，示例代码可以在GitHub上找到。