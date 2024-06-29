---
date: 2024-06-30
category:
  - Java
  - 编程
tag:
  - Java 21
  - 未命名类
  - 实例主方法
head:
  - - meta
    - name: keywords
      content: Java 21, 未命名类, 实例主方法
---

# Java 21 中的未命名类和实例主方法 | Baeldung

Java 21 已经发布，其新特性之一是未命名类和实例主方法的引入，这使得 Java 语言对于初学者来说更加易于接近。这些新特性的引入是使 Java 成为更友好的编程语言的重要步骤。

在本教程中，我们将探索这些新特性，并理解它们如何为学生平滑学习曲线。

## 2. 编写基本的 Java 程序

传统上，对于初学者来说，编写他们的第一个 Java 程序比在其他编程语言中要复杂一些。一个基本的 Java 程序需要声明一个 _public_ 类。这个类包含一个作为程序入口点的 _public static void main(String[] args)_ 方法。

所有这些只是为了在控制台中打印出 "Hello world"：

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

Java 21 极大地简化了我们编写简单程序的方式：

```java
void main() {
    System.out.println("Hello, World!");
}
```

我们将更详细地讨论如何使用新特性实现这种语法简化。

实例 _main()_ 方法的引入允许开发者使用更动态的方法来初始化他们的应用程序。

### 3.1. 理解实例主方法

这改变了 Java 程序声明其入口点的方式。实际上，Java 早期需要在 _public_ 类中存在一个带有 _String[]_ 参数的 _static main()_ 方法，正如我们在前一节中看到的那样。

这个新协议更加宽松。它允许使用具有不同访问级别的 _main()_ 方法：_public_、_protected_ 或默认（包）。

**此外，它不要求方法必须是 _static_ 或具有 _String[]_ 参数：**

```java
class HelloWorld {
    void main() {
        System.out.println("Hello, World!");
    }
}
```

### 3.2. 选择启动协议

改进后的启动协议会自动选择我们程序的起始点，同时考虑可用性和访问级别。

**实例 _main()_ 方法应该总是具有非 _private_ 访问级别**。此外，启动协议遵循特定的顺序来决定使用哪个方法：

1. 在启动的类中声明的 _static void main(String[] args)_ 方法
2. 在启动的类中声明的 _static void main()_ 方法
3. 在启动的类或从超类继承的 _void main(String[] args)_ 实例方法
4. _void main()_ 实例方法

**当一个类声明了一个实例 _main()_ 方法并继承了一个标准的 _static_ _main()_ 方法时，系统将调用实例 _main()_ 方法**。在这种情况下，JVM 在运行时会发出警告。

例如，假设我们有一个名为 _HelloWorldSuper_ 的超类，它实现了一个长期存在的 _main()_ 方法：

```java
public class HelloWorldSuper {
    public static void main(String[] args) {
        System.out.println("Hello from the superclass");
    }
}
```

这个超类被 _HelloWorldChild_ 类扩展：

```java
public class HelloWorldChild extends HelloWorldSuper {
    void main() {
        System.out.println("Hello, World!");
    }
}
```

让我们使用 _—source 21_ 和 _-enable-preview_ 标志编译超类并运行子类：

```shell
javac --source 21 --enable-preview HelloWorldSuper.java
java --source 21 --enable-preview HelloWorldChild
```

我们将在控制台中得到以下输出：

```shell
WARNING: "void HelloWorldChild.main()" chosen over "public static void HelloWorldSuper.main(java.lang.String[])"
Hello, World!
```

我们可以看到 JVM 警告我们程序中有两个可能的入口点。

## 4. 未命名类

未命名类是一个重要的特性，旨在简化初学者的学习曲线。**它允许方法、字段和类在没有显式类声明的情况下存在。**

通常，在 Java 中，每个类都存在于一个包中，每个包都在一个模块中。然而，未命名类存在于未命名的包和模块中。它们是 _final_ 的，只能扩展 _Object_ 类而不实现任何接口。

考虑到所有这些，我们可以在代码中不显式声明类来声明 _main()_ 方法：

```java
void main() {
    System.out.println("Hello, World!");
}
```

使用这两个新特性，我们成功地将程序变成了一个非常简单的程序，任何开始在 Java 中编程的人都更容易理解。

未命名类几乎与显式声明的类完全相同。其他方法或变量被解释为未命名类的成员，所以我们可以将它们添加到我们的类中：

```java
private String getMessage() {
    return "Hello, World!";
}
void main() {
    System.out.println(getMessage());
}
```

尽管它们简单灵活，但未命名类有固有的限制。

**直接构造或按名称引用是不可能的，它们也不定义任何可从其他类访问的 API**。这种不可访问性也会导致 Javadoc 工具在为这些类生成 API 文档时出现问题。然而，未来的 Java 版本可能会调整和增强这些行为。

## 5. 结论

在本文中，我们了解到 Java 21 通过引入未命名类和实例 main() 方法，在增强用户体验方面取得了显著进步，特别是对于那些刚开始编程之旅的人。

通过简化编程的结构方面，这些特性允许新手更快地专注于逻辑思维和问题解决。

如往常一样，源代码可在 GitHub 上获得。