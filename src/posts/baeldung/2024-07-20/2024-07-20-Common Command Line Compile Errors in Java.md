---
date: 2022-04-01
category:
  - Java
  - Command Line
tag:
  - Java
  - Compile Errors
head:
  - - meta
    - name: keywords
      content: Java, Command Line, Compile Errors
------
# Java命令行编译常见错误

## 1. 概述

在命令行编译Java程序时，任何预期的命令行选项或参数不匹配都会导致错误。

在本教程中，我们将首先调查“如果显式请求注解处理，则只接受类名”错误。然后，我们将查看一些其他常见的编译错误。

## 2. 错误示例

假设我们有以下类_DemoClass_：

```java
package com.baeldung;

public class DemoClass {
    // 字段和方法
}
```

现在，让们尝试使用_javac_命令编译_DemoClass_：

```shell
javac DemoClass
```

上述命令将返回一个错误：

```
error: Class names, 'DemoClass', are only accepted if annotation processing is explicitly requested
1 error
```

错误似乎与注解处理有关，这有点难以理解，因为_DemoClass_没有任何与注解处理相关的代码。实际的错误原因是**_DemoClass_不是注解处理源文件**。

注解处理源文件是一种在编译时生成额外源代码的**便捷技术**。与标准Java源文件不同，编译这些源文件时不需要提供_.java_文件扩展名。

## 3. 解决问题

让我们再次使用正确的文件名扩展名_.java_编译_DemoClass_：

```shell
javac DemoClass.java
```

正如预期的那样，我们将源文件编译成_DemoClass.class_文件。

## 4. 额外的技巧和窍门

虽然我们知道正确的编译方式时很容易修复，但在编译或运行应用程序时，我们仍可能遇到类似的困难。

### 4.1. 使用错误的文件扩展名

现在让我们尝试使用以下命令编译源文件，其中有一个拼写错误——“_.JAVA”_全部大写：

```shell
javac DemoClass.JAVA
```

这样做将产生我们之前看到的相同错误消息：

```
error: Class names, 'DemoClass.JAVA', are only accepted if annotation processing is explicitly requested
1 error
```

### 4.2. 主类错误

假设我们有一个带有_main_方法的_DemoApplication_类：

```java
public class DemoApplication {
    public static void main(String[] args) {
        System.out.println("This is a DemoApplication");
    }
}
```

现在让我们使用_java_命令执行应用程序：

```shell
java DemoApplication.class
```

结果是_ClassNotFoundException_：

```
Error: Could not find or load main class DemoApplication.Class
Caused by: java.lang.ClassNotFoundException: DemoApplication.Class
```

现在让我们尝试不带任何文件扩展名运行应用程序——甚至不包括_.class_或_.java_：

```shell
java DemoApplication
```

我们应该在控制台上看到输出：

```
This is a DemoApplication
```

## 5. 结论

在本文中，我们学习了不正确使用或省略_.java_文件扩展名在命令行编译类时会导致错误。此外，我们还看到了一些与不正确使用命令行参数相关的其他错误，这些错误涉及编译和运行独立应用程序。