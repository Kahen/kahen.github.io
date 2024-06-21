---
date: 2024-06-17
category:
  - Java
  - Programming
tag:
  - Java 22
  - JEP
---
# Java 22 简介

在本教程中，我们将深入探讨最新的 Java 版本，Java 22，它现在已经普遍可用。

## 2. Java 语言更新

让我们来谈谈作为这个版本一部分的 Java 语言的所有新变化。

### 2.1. 未命名变量和模式 - JEP 456

我们经常在代码中定义临时变量或模式变量，这些变量在代码中保持未使用。这往往是由于语言限制，移除它们是被禁止的或会引入副作用。异常、switch 模式和 Lambda 表达式是我们在某个作用域内定义变量或模式，但我们从未真正使用它们的例子：

```java
try {
    int number = someNumber / 0;
} catch (ArithmeticException exception) {
    System.err.println("除以零");
}

switch (obj) {
    case Integer i -> System.out.println("是整数");
    case Float f -> System.out.println("是浮点数");
    case String s -> System.out.println("是字符串");
    default -> System.out.println("默认");
}

try (Connection connection = DriverManager.getConnection(url, user, pwd)) {
    LOGGER.info(STR.""
      + "数据库连接成功"
      + "URL = {url}"
      + "usr = {user}"
      + "pwd = {pwd}");
} catch (SQLException e) {}
```

**在这些场景中，未命名变量(_) 是完美的，它们使变量的意图明确无误。它们不能在代码中传递或使用或赋值。** 让我们重写前面的例子：

```java
try {
    int number = someNumber / 0;
} catch (ArithmeticException _) {
    System.err.println("除以零");
}

switch (obj) {
    case Integer _ -> System.out.println("是整数");
    case Float _ -> System.out.println("是浮点数");
    case String _ -> System.out.println("是字符串");
    default -> System.out.println("默认");
}

try (Connection _ = DriverManager.getConnection(url, user, pwd)) {
    LOGGER.info(STR.""
      + "数据库连接成功"
      + "URL = {url}"
      + "usr = {user}"
      + "pwd = {pwd}");
} catch (SQLException e) {
    LOGGER.warning("异常");
}
```

### 2.2. 在 _super()_ 之前的语句 - JEP 447

长期以来，Java 不允许我们在子类构造函数中调用 _super()_ 之前放置任何语句。假设我们有一个 _Shape_ 类系统和两个类，《Square_ 和 _Circle_，它们都扩展自 _Shape_ 类。在子类构造函数中，第一条语句是调用 _super()_：

```java
public class Square extends Shape {
    int sides;
    int length;

    Square(int sides, int length) {
        super(sides, length);
        // 一些其他代码
    }
}
```

**这在我们希望在调用 _super()_ 之前执行某些验证时很不方便。通过这个版本，这个问题得到了解决**：

```java
public class Square extends Shape {
    int sides;
    int length;

    Square(int sides, int length) {
        if (sides != 4 && length `<= 0) {
            throw new IllegalArgumentException("无法形成正方形");
        }
        super(sides, length);
    }
}
```

我们应该注意，我们在 _super()_ 之前放置的语句不能访问实例变量或执行方法。我们可以使用它来执行验证。此外，我们可以使用它在调用基类构造函数之前转换派生类接收到的值。

**这是一个预览 Java 特性。**

# 3. 字符串模板 - JEP 459

Java 22 引入了 Java 流行的 _String_ 模板功能的第二个预览。字符串模板允许将文字文本与表达式和模板处理器一起嵌入，以产生专业结果。它们也是比其他 _String_ 组合技术更安全、更高效的替代方案。

随着这个版本的发布，字符串模板继续处于预览状态，自第一次预览以来 API 有小幅更新。一个新变化是 **引入了模板表达式的类型，使用相应模板处理器中 _process()_ 方法的返回类型。**

# 4. 隐式声明的类和实例主方法 - JEP 463

**Java 最终支持编写程序而无需定义显式的类或主方法及其标准模板。** 这是我们通常定义类的示例：

```java
class MyClass {
    public static void main(String[] args) {
    }
}
```

开发人员现在可以简单地创建一个带有 _main()_ 方法定义的新文件，并开始编码，如下所示：

```java
void main() {
    System.out.println("这是一个隐式声明的类，没有任何结构");

    int x = 165;
    int y = 100;

    System.out.println(y + x);
}
```

**我们可以使用文件名来编译它。未命名类位于未命名包中，该包位于未命名模块中。**

# 5. 库

Java 22 还带来了新库并更新了一些现有库。

### 5.1. 外部函数和内存 API - JEP 454

Java 22 在几个孵化版本后，作为 _Loom_ 项目的一部分，最终确定了 _Foreign Function and Memory API_。**这个 API 允许开发人员调用外部函数，即 JVM 生态系统之外的函数，并访问对 JVM 来说是外部的内存。**

它允许我们访问其他运行时和语言的库，这是 JNI (Java Native Interface) 所做的，但具有更高的效率、性能提升和安全性。这个 JEP 为 JVM 运行的所有平台上调用本地库带来了更广泛的支持。**此外，该 API 更广泛、更易读，并提供了在多种内存类型（如堆和临时内存）上操作无限大小的结构化和非结构化数据的方法。**

**我们将使用新的外部函数和内存 API 来调用 C 的 _strlen()_ 函数，以计算字符串的长度：**

```java
public long getLengthUsingNativeMethod(String string) throws Throwable {
    SymbolLookup stdlib = Linker.nativeLinker().defaultLookup();
    MethodHandle strlen = 
      Linker.nativeLinker()
        .downcallHandle(
          stdlib.find("strlen").orElseThrow(),
          of(ValueLayout.JAVA_LONG, ValueLayout.ADDRESS));
  
    try (Arena offHeap = Arena.ofConfined()) {
        MemorySegment str = offHeap.allocateFrom(string);
  
        long len = (long) strlen.invoke(str);
        System.out.println("使用 strlen 函数查找字符串长度：" + len);
        return len;
    }
}
```

### 5.2. 类文件 API - JEP 457

**类文件 API 标准化了读取、解析和转换 Java .class 文件的过程。此外，它旨在最终弃用 JDK 内部副本的第三方 ASM 库。**

类文件 API 提供了几个强大的 API，以选择性地转换和修改类中的元素和方法。例如，让我们看看如何利用 API 从类文件中删除以 _test_ 开头的方法：

```java
ClassFile cf = ClassFile.of();
ClassModel classModel = cf.parse(PATH);
byte[] newBytes = cf.build(classModel.thisClass()
  .asSymbol(), classBuilder ->` {
    for (ClassElement ce : classModel) {
        if (!(ce instanceof MethodModel mm && mm.methodName()
          .stringValue()
          .startsWith(PREFIX))) {
            classBuilder.with(ce);
        }
    }
});
```

这段代码解析源类文件的字节，并通过仅获取满足我们给定条件的方法（由 _MethodModel_ 类型表示）来转换它们。结果的类文件省略了原始类中的 _test_something() 方法，可以进行验证。

### 5.3. 流收集器 - JEP 461

JEP 461 通过 _Stream::gather(Gatherer)_ 为 Streams API 带来了自定义中间操作的支持。开发人员长期以来一直希望支持额外的操作，因为内置的流中间操作有限。**有了这个增强功能，Java 允许我们创建自定义中间操作。**

**我们可以通过在流上链式调用 _gather()_ 方法，并提供一个 _Gatherer_，即 _java.util.stream.Gatherer_ 接口的实例来实现这一点。**

让我们使用流收集器以滑动窗口的方式将列表中的元素分组为每组 3 个：

```java
public List`<List`<String>``> gatherIntoWindows(List`<String>` countries) {
    List`<List`<String>``> windows = countries
      .stream()
      .gather(Gatherers.windowSliding(3))
      .toList();
    return windows;
}

// 输入列表：List.of("India", "Poland", "UK", "Australia", "USA", "Netherlands")
// 输出：[[India, Poland, UK], [Poland, UK, Australia], [UK, Australia, USA], [Australia, USA, Netherlands]]
```

作为这个预览特性的一部分，有五个内置收集器：

- _fold_
- _mapConcurrent_
- _scan_
- _windowFixed_
- _windowSliding_

**这个API 还使开发人员能够定义自定义的 _Gatherer_。

### 5.4. 结构化并发 - JEP 462

**结构化并发 API，在 Java 19 中作为孵化特性引入，在 Java 21 中作为预览特性引入，并在 Java 22 中没有任何新变化地回归。**

这个 API 的目标是为 Java 并发任务引入结构和协调。结构化并发 API 旨在通过引入一种旨在减少并发编程常见陷阱和缺点的编码风格模式，来改进并发程序的开发。

**这个 API 简化了错误传播，减少了取消延迟，并提高了可靠性和可观察性。**

### 5.5. 作用域值 - JEP 464

Java 21 将作用域值 API 作为预览特性与结构化并发一起引入。**这个 API 在 Java 22 中进入第二个预览，没有任何变化。**

**作用域值使在线程内部和跨线程存储和共享不可变数据成为可能。作用域值引入了一种新类型，_ScopedValue<>_。** 我们一次写入值，它们在其生命周期中保持不变。

Web 请求和服务器代码通常使用 _ScopedValues_。它们被定义为公共静态字段，并允许数据对象在不作为显式参数定义的情况下跨方法传递。

在以下示例中，让我们看看如何验证用户并将其上下文作为 _ScopedValue_ 在多个实例中存储：

```java
private void serve(Request request) {
    User loggedInUser = authenticateUser(request);
    if (loggedInUser) {
        ScopedValue.where(LOGGED_IN_USER, loggedInUser)
          .run(() -> processRequest(request));
    }
}

// 在另一个类中

private void processRequest(Request request) {
    System.out.println("处理请求" + ScopedValueExample.LOGGED_IN_USER.get());
}

```

**来自不同用户的多次登录尝试将用户信息的作用域限定为其独特的线程：**

```java
处理请求 :: 用户 :: 46
处理请求 :: 用户 :: 23
```

### 5.6. 向量 API（第七个孵化版） - JEP 460

**Java 16 引入了向量 API，Java 22 带来了它的第七个孵化版。这个更新提供了性能改进和小的更新。以前，向量访问仅限于由字节数组支持的堆 _MemorySegments_。** 它们现在被更新为由原始元素类型的数组支持。

这个更新是低级别的，不会以任何方式影响 API 的使用。

Java 22 还更新了 Java 构建文件的工具。

### 6.1. 多文件源程序 - JEP 458

Java 11 引入了使用 _javac_ 命令显式编译的情况下执行单个 Java 文件的功能。这非常高效且快速。缺点是当有依赖的 Java 源文件时，我们无法利用它的优势。

**从 Java 22 开始，我们终于可以运行多文件 Java 程序了：**

```java
public class MainApp {
    public static void main(String[] args) {
        System.out.println("Hello");
        MultiFileExample mm = new MultiFileExample();
        mm.ping(args[0]);
    }
}

public class MultiFileExample {
    public void ping(String s) {
        System.out.println("来自第二个文件的 Ping " + s);
    }
}

```

我们可以直接运行 MainApp，而无需显式运行 _javac_：

```shell
$ java --source 22 --enable-preview MainApp.java "Test"

Hello
来自第二个文件的 Ping Test
```

需要注意以下几点：

- **当类分散在多个源文件中时，编译顺序没有保证**
- **由主程序引用的 _.java_ 文件中的类将被编译**
- 不允许源文件中有重复的类，否则将出错
- 我们可以传递 _–class-path_ 选项来使用预编译的程序或库

# 7. 性能

Java 这次迭代的性能更新是对 G1 垃圾收集器机制的增强。

### 7.1. G1 垃圾收集器的区域固定 - JEP 423

固定是通知 JVM 底层垃圾收集器不要从内存中移除特定对象的过程。不支持此功能的垃圾收集器通常会暂停 **垃圾收集，直到 JVM 被指示关键对象已释放。**

这主要是在 JNI 关键区域看到的一个问题。垃圾收集器中缺少固定功能会影响其延迟、性能和 JVM 中的总体内存消耗。

**有了 Java 22，G1 垃圾收集器终于支持区域固定。这消除了 Java 线程在使用 JNI 时需要暂停 G1 GC 的需要。**

# 8. 结论

Java 22 带来了大量的更新、增强功能和新的预览特性到 Java。

如常，所有代码示例都可以在 GitHub 上找到。

OK