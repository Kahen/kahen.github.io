---
date: 2022-01-18
category:
  - Java
  - Project Panama
tag:
  - Java
  - JNI
  - Foreign Function
  - Memory API
head:
  - - meta
    - name: keywords
      content: Java, Project Panama, Foreign Function, Memory API, JExtract
---
# Java Project Panama 指南

在本教程中，我们将深入了解 Project Panama 的组件。首先，我们将探索外部函数和内存 API。然后，我们将看到 JExtract 工具如何促进其使用。

## 2. 什么是 Project Panama？
Project Panama 的目标是简化 Java 与外部（非 Java）API 之间的交互，即用 C、C++ 等编写的本地代码。

到目前为止，使用 Java 原生接口（JNI）是从 Java 调用外部函数的解决方案。但 JNI 存在一些缺点，Project Panama 通过以下方式解决了这些问题：
- 消除了编写 Java 中间本地代码包装器的需要
- 用更具有未来性的内存 API 替代了 ByteBuffer API
- 引入了一种平台无关、安全且内存高效的从 Java 调用本地代码的方法

为了实现其目标，Panama 包括一组 API 和工具：
- 外部函数和内存 API：适用于分配和访问堆外内存，并直接从 Java 代码调用外部函数
- 向量 API：使高级开发人员能够在 Java 中表达复杂的数据并行算法
- JExtract：一个工具，用于从一组本地头文件中自动派生 Java 绑定

## 3. 先决条件
要使用外部函数和内存 API，让我们下载 Project Panama 早期访问构建。在本文撰写时，我们使用了 _Build 19-panama+1-13 (2022/1/18)_。接下来，根据使用的系统设置 _JAVA_HOME_。

由于外部函数和内存 API 是预览 API，我们必须通过添加 _–enable-preview_ 标志来启用预览功能，即通过在 _java_ 和 _javac_ 中添加标志来编译和运行我们的代码。

## 4. 外部函数和内存 API
外部函数和内存 API 帮助 Java 程序与 Java 运行时之外的代码和数据互操作。

它通过高效地调用外部函数（即 JVM 之外的代码）和安全地访问外部内存（即 JVM 未管理的内存）来实现这一点。

它结合了两个早期孵化的 API：外部内存访问 API 和外部链接器 API。

API 提供了一组类和接口来执行这些操作：
- 使用 _MemorySegment_、_MemoryAddress_ 和 _SegmentAllocator_ 分配外部内存
- 通过 _Arena_（从 JDK20 开始，MemorySession 被拆分为 Arena 和 SegmentScope）控制外部内存的分配和释放
- 使用 _MemoryLayout_ 操作结构化外部内存
- 通过 VarHandles 访问结构化外部内存
- 感谢 _Linker_、_FunctionDescriptor_ 和 _SymbolLookup_ 调用外部函数

### 4.1. 外部内存分配
首先，让我们探索内存分配。在这里，主要的抽象是 _MemorySegment_。它模拟了位于堆外或堆内的一个连续内存区域。_MemoryAddress_ 是段内的偏移量。简单来说，内存段由内存地址组成，一个内存段可以包含其他内存段。

此外，内存段绑定到它们封装的 _Arena_ 并在不再需要时被释放。_Arena_ 管理段的生命周期，并确保它们在被多个线程访问时被正确释放。

让我们在内存段中创建四个连续偏移的 _bytes_，然后设置一个值为 _6_ 的浮点数：

```java
try (Arena memorySession = Arena.ofConfined()) {
    int byteSize = 5;
    int index = 3;
    float value = 6;
    try(Arena arena = Arena.ofAuto()) {
        MemorySegment segment = arena.allocate(byteSize);
        segment.setAtIndex(JAVA_FLOAT, index, value);
        float result = segment.getAtIndex(JAVA_FLOAT, index);
        System.out.println("Float value is:" + result);
    }
}
```

在上面的代码中，一个 _confined_ 内存会话限制了创建会话的线程的访问，而一个 _shared_ 内存会话允许任何线程访问。

此外，《JAVA_FLOAT ValueLayout_ 指定了解引用操作的属性：类型映射的正确性和要解引用的字节数。

_SegmentAllocator_ 抽象定义了有用的操作来分配和初始化内存段。当我们的代码管理大量的堆外段时，它可能非常有用：

```java
String[] greetingStrings = { "hello", "world", "panama", "baeldung" };
try(Arena arena = Arena.ofAuto()) {
    MemorySegment offHeapSegment = arena.allocateArray(ValueLayout.ADDRESS, greetingStrings.length);
    for (int i = 0; i `< greetingStrings.length; i++) {
        // 在堆外分配一个字符串，然后存储指向它的指针
        MemorySegment cString = arena.allocateUtf8String(greetingStrings[i]);
        offHeapSegment.setAtIndex(ValueLayout.ADDRESS, i, cString);
    }
}
```

### 4.2. 外部内存操作
接下来，我们深入使用内存布局进行内存操作。一个 _MemoryLayout_ 描述了一个段的内容。它对于操作本地代码的高级数据结构（如 _struct_、指针和指向 _struct_ 的指针）非常有用。

让我们使用 _GroupLayout_ 在堆外分配一个表示具有 _x_ 和 _y_ 坐标的 C _struct_：

```java
GroupLayout pointLayout = structLayout(
    JAVA_DOUBLE.withName("x"),
    JAVA_DOUBLE.withName("y")
);

VarHandle xvarHandle = pointLayout.varHandle(PathElement.groupElement("x"));
VarHandle yvarHandle = pointLayout.varHandle(PathElement.groupElement("y"));

try (Arena memorySession = Arena.ofConfined()) {
    MemorySegment pointSegment = memorySession.allocate(pointLayout);
    xvarHandle.set(pointSegment, 3d);
    yvarHandle.set(pointSegment, 4d);
    System.out.println(pointSegment.toString());
}
```

值得注意的是，由于使用了不同的 _VarHandle_ 来初始化每个点坐标，因此不需要进行偏移计算。

我们还可以使用 _SequenceLayout_ 构建数据数组。以下是如何获取五个点的列表：

```java
SequenceLayout ptsLayout = sequenceLayout(5, pointLayout);
```

### 4.3. 从 Java 调用本地函数
外部函数 API 允许 Java 开发人员使用任何本地库，而无需依赖第三方包装器。它严重依赖于 Method Handles，并提供了三个主要类：_Linker_、_FunctionDescriptor_ 和 _SymbolLookup_。

让我们考虑通过调用 C _printf()_ 函数打印一个 “ _Hello world_” 消息：

```c
#include <stdio.h>`
int main() {
    printf("Hello World from Project Panama Baeldung Article");
    return 0;
}
```

首先，我们在标准库的类加载器中查找该函数：

```java
Linker nativeLinker = Linker.nativeLinker();
SymbolLookup stdlibLookup = nativeLinker.defaultLookup();
SymbolLookup loaderLookup = SymbolLookup.loaderLookup();
```

_Linker_ 是 JVM 和 C/C++ 本地代码（也称为 C ABI）两个二进制接口之间的桥梁。

接下来，我们需要描述函数原型：

```java
FunctionDescriptor printfDescriptor = FunctionDescriptor.of(JAVA_INT, ADDRESS);
```

值布局 _JAVA_INT_ 和 _ADDRESS_ 分别对应于 C _printf()_ 函数的返回类型和输入：

```c
int printf(const char * __restrict, ...)
```

接下来，我们获取方法句柄：

```java
String symbolName = "printf";
String greeting = "Hello World from Project Panama Baeldung Article";
MethodHandle methodHandle = loaderLookup.lookup(symbolName)
  .or(() -> stdlibLookup.lookup(symbolName))
  .map(symbolSegment -> nativeLinker.downcallHandle(symbolSegment, printfDescriptor))
  .orElse(null);
```

_Linker_ 接口支持 downcalls（从 Java 代码到本地代码的调用）和 upcalls（从本地代码回 Java 代码的调用）。最后，我们调用本地函数：

```java
try (Arena memorySession = Arena.ofConfined()) {
    MemorySegment greetingSegment = memorySession.allocateUtf8String(greeting);
    methodHandle.invoke(greetingSegment);
}
```

有了 JExtract，我们不需要直接使用大多数外部函数 & 内存 API 抽象。让我们重新创建上面打印我们的 “ _Hello World”_ 示例。

首先，我们需要从标准库头文件生成 Java 类：

```
jextract --source --output src/main -t foreign.c -I c:\mingw\include c:\mingw\include\stdio.h
```

更新到目标操作系统中的 _stdio_ 路径。接下来，我们可以简单地从 Java _import_ 本地 _printf()_ 函数：

```java
import static foreign.c.stdio_h.printf;

public class Greetings {

    public static void main(String[] args) {
        String greeting = "Hello World from Project Panama Baeldung Article, using JExtract!";

        try (Arena memorySession = Arena.ofConfined()) {
            MemorySegment greetingSegment = memorySession.allocateUtf8String(greeting);
            // 在取消注释之前生成JExtract bindings before uncommenting
// printf(greetingSegment);
        }
    }
}

Running the code prints the greeting to the console:

```java
java --enable-preview --source 21 .\src\main\java\com\baeldung\java\panama\jextract\Greetings.java
```

## 6. 结论

在本文中，我们学习了 Project Panama 的关键特性。

首先，我们探索了使用外部函数和内存 API 进行本地内存管理。然后我们使用 _MethodHandles_ 调用外部函数。最后，我们使用了 JExtract 工具来隐藏外部函数和内存 API 的复杂性。

Project Panama 还有更多值得探索的地方，特别是从本地代码调用 Java，调用第三方库以及向量 API。

像往常一样，示例代码可以在 GitHub 上找到。

OK