---
date: 2024-07-10
category:
  - Spring Framework
  - Java
tag:
  - AOT
  - Spring 6
  - Performance Optimization
head:
  - - meta
    - name: keywords
      content: Spring 6, AOT, 性能优化, Java
---
# Spring 6中的提前优化

Spring 6带来了一项新特性，承诺可以优化应用程序的性能：提前编译（Ahead-of-Time，AOT）支持。

在本文中，我们将探讨Spring 6的AOT优化特性如何工作，它的优势以及如何使用它。

## 2. 提前编译
### 2.1. 即时编译器（JIT）
对于最常用的Java虚拟机（JVM），比如Oracle的HotSpot JVM和OpenJDK，当我们编译源代码（.java文件）时，生成的字节码存储在.class文件中。这样，**JVM使用即时编译器（JIT）将字节码转换为机器代码。**

此外，即时编译包括JVM对字节码的解释以及在运行时将频繁执行的代码动态编译为本地机器代码。

### 2.2. 提前编译器（AOT）
**提前编译（AOT）是一种技术，它在应用程序运行之前将字节码预编译为本地机器代码。**

Java虚拟机通常不支持此功能。然而，Oracle已经为HotSpot JVM在OpenJDK项目中发布了一个名为“GraalVM Native Image”的实验性AOT特性，允许提前编译。

预编译代码后，计算机的处理器可以直接执行它，消除了JVM解释字节码的需要，并提高了启动时间。

在本文中，我们不会详细查看AOT编译器。请参阅我们其他文章以获取提前编译（AOT）的概述。

## 3. Spring 6中的AOT
### 3.1. AOT优化
当我们构建Spring 6应用程序时，需要考虑三种不同的运行时选项：
- 在JRE上运行的传统Spring应用程序。
- 在编译的AOT阶段生成代码并在JRE上运行。
- 在编译的AOT阶段生成代码并在GraalVM本地映像中运行。

让我们考虑第二个选项，这是Spring 6的全新特性（第一个是传统构建，最后一个是本地映像）。

首先，我们需要设置环境，为AOT编译做好准备。

**通过AOT编译构建应用程序在性能和资源消耗方面有多个优势：**
- 死代码消除：AOT编译器可以消除在运行时从未执行过的代码。这可以通过减少需要执行的代码量来提高性能。
- 内联：内联是一种技术，AOT编译器用函数的实际代码替换函数调用。这可以通过减少函数调用的开销来提高性能。
- 常量传播：AOT编译器通过用编译时可以确定的常量值替换变量来优化性能。这消除了运行时计算的需要，并提高了性能。
- 跨过程优化：AOT编译器可以通过分析程序的调用图来跨多个函数优化代码。这可以通过减少函数调用的开销和识别公共子表达式来提高性能。
- Bean定义：Spring 6中的AOT编译器通过削减不必要的_BeanDefinition_实例来提高应用程序效率。

让我们使用命令构建具有AOT优化的应用程序：
```
mvn clean compile spring-boot:process-aot package
```

然后使用命令运行应用程序：
```
java -Dspring.aot.enabled=true -jar `<jar-name>`
```

我们可以通过设置构建插件来默认启用AOT编译：
```
``<plugin>``
     ``<groupId>``org.springframework.boot``</groupId>``
     ``<artifactId>``spring-boot-maven-plugin``</artifactId>``
     `<executions>`
	`<execution>`
	    `<id>`process-aot`</id>`
	    `<goals>`
		 `<goal>`process-aot`</goal>`
	    `</goals>`
	`</execution>`
     `</executions>`
``</plugin>``
```

### 3.2. AOT优化中的问题
当我们决定使用AOT编译构建我们的应用程序时，我们可能会遇到一些问题，例如：
- 反射：它允许代码在编译时未知的动态调用方法和访问字段。AOT编译器无法确定动态调用的类和方法。
- 属性文件：属性文件的内容可以在运行时更改。AOT编译器无法动态确定使用的属性文件。
- 代理：代理通过提供代理或占位符来控制对另一个对象的访问。由于代理可以用于动态重定向方法调用到其他对象，这可能使AOT编译器难以确定运行时将调用哪些类和方法。
- 序列化：序列化将对象的状态转换为字节流，之亦然。总体上，这可能使AOT编译器难以确定运行时将调用哪些类和方法。

为了确定哪些类在Spring应用程序中引起问题，我们可以运行一个代理，提供有关反射操作的信息。

让我们配置Maven插件以包括一个JVM参数来协助此操作。
```
``<plugin>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-maven-plugin``</artifactId>``
    `<configuration>`
        `<jvmArguments>`
            -agentlib:native-image-agent=config-output-dir=target/native-image
        `</jvmArguments>`
    `</configuration>`
    `<!- ... -->`
``</plugin>``
```

让我们使用命令运行它：
```
./mvnw -DskipTests clean package spring-boot:run
```

在`target/native-image/`中，我们将找到生成的文件，如_reflect-config.json_, _resource-config.json_等。

如果在此文件中定义了某些内容，那么是时候定义_运行时提示_以允许正确编译可执行文件了。

## 4. 结论
在本文中，我们介绍了Spring 6的新AOT优化特性。

如往常一样，示例的完整源代码可以在GitHub上找到。抱歉，由于原文内容较长，我将接着翻译剩余部分。

## 4. 结论
在本文中，我们介绍了Spring 6的新AOT优化特性。

正如往常一样，示例的完整源代码可以在GitHub上找到。

[给Kimi加油](kimi://action?name=cheer-on-kimi)

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)![img](https://secure.gravatar.com/avatar/74d85e58eea7ae3bd05956bff5cb1b49?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK