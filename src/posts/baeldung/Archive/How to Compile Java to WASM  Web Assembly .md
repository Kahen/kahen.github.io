---
date: 2023-09-01
category:
  - Web Development
tag:
  - WebAssembly
  - Java
---
# 如何将Java编译为WASM（Web Assembly） | Baeldung

## 1. 概述

在快节奏的Web开发世界中，WASM（WebAssembly）的引入为开发者带来了新的可能性。它允许他们在Web平台上利用编译语言的速度和适应性。

在本教程中，我们将探讨将Java编译为WebAssembly的过程，并研究可用的工具和方法。

## 2. WASM（WebAssembly）是什么

WebAssembly是一种低级的二进制指令格式，可以在现代Web浏览器中运行。它允许开发者在Web浏览器中以接近原生速度运行用C、C++等语言编写的代码。WebAssembly旨在与JavaScript一起运行，允许两者协同工作。

WebAssembly不打算手写。相反，它被设计为源语言如C、C++和Rust的有效编译目标。我们可以将WebAssembly模块导入Web（或Node.js）应用程序，从而通过JavaScript使用其功能。

我们需要一个专门的编译器将源代码转换为WASM格式，以使用原生语言与WebAssembly。要在浏览器中执行该格式，我们必须使用JavaScript加载和初始化二进制文件。下图展示了从原生代码到WASM文件的路径：

JS作为WASM、HTML和CSS之间的中心接口，因为WASM目前缺乏对网页文档对象模型（DOM）的直接访问。WASM提供导入和导出以与JS交互。导出包括编译为WASM的源代码中的函数，JS可以访问并像JS函数一样执行。导入允许JS函数在WASM中被引用。

Java，作为最受欢迎的编程语言之一，也通过各种工具和框架进入了这个生态系统。现在，我们将看看将Java代码转换为WebAssembly的不同突出工具：

### 3.1. TeaVM

TeaVM是一个Java字节码的即时编译器（AOT），它生成JavaScript和在浏览器中运行的WebAssembly。源代码不需要是Java，因此TeaVM支持任何JVM语言，包括Kotlin和Scala。TeaVM生成更小的JavaScript，使其在浏览器中表现更好。

TeaVM优化器可以消除死代码并生成非常小的JavaScript。它重构方法的原始结构，生成几乎与我们手动编写的JavaScript相似的代码。它还支持线程并且非常快。

### 3.2. JWebAssembly

JWebAssembly专门将Java字节码编译为WebAssembly代码。它可以编译任何编译为Java字节码的语言，如Groovy、Kotlin和Scala。JWebAssembly利用LLVM工具链生成优化的WebAssembly输出。

它还支持诸如本地方法、异常处理和垃圾回收等功能。JWebAssembly优化器在转译后微调各个方法的WebAssembly输出。它确保在最终确定输出之前达到最佳性能。

### 3.3. CheerpJ

CheerpJ是一个基于WebAssembly的浏览器JVM。它可以在不需要Java安装的情况下从浏览器执行Java应用程序。

CheerpJ可以运行任何Java应用程序、小程序和库在现代浏览器上。CheerpJ支持100%的Java 8 SE运行时，以及原生反射和动态类创建。它还支持文件访问、网络、剪贴板、音频和打印。它还与Java Swing、Oracle Forms、EBS和其他第三方框架兼容。

## 4. 结论

在本文中，我们了解了WASM，并概述了用于将Java代码转换为WebAssembly的工具。

TeaVM非常适合编写针对浏览器的新Java应用程序，而JWebAssembly具有有限的运行时，适合从头开始编写新应用程序。CheerpJ不需要对应用程序的源代码进行任何更改；它旨在将现有的Java应用程序转换为HTML5。

选择Java作为WASM工具的选择取决于项目需求、性能考虑和开发者偏好。通过了解每个工具的功能和权衡，我们可以决定适当的框架。