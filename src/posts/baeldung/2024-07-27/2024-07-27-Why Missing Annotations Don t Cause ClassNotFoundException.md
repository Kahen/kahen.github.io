---
date: 2022-04-01
category:
  - Java
  - Annotations
tag:
  - Java
  - Annotation
  - ClassNotFoundException
head:
  - - meta
    - name: keywords
      content: Java, Annotation, ClassNotFoundException, Runtime, Reflection
------
# 为什么缺少注解不会导致ClassNotFoundException

在本教程中，我们将熟悉Java编程语言中一个看似奇怪的特性：缺少注解不会导致运行时异常。

然后，我们将深入探讨这种行为背后的规则和原因，以及这些规则的例外情况。

## 2. 快速回顾

让我们从一个熟悉的Java示例开始。有一个类_A_，然后是依赖于_A_的类_B_：

```java
public class A {
}

public class B {
    public static void main(String[] args) {
        System.out.println(new A());
    }
}
```

现在，如果我们编译这些类并运行编译后的_B_，它会在控制台为我们打印一条消息：

```shell
>> javac A.java
>> javac B.java
>> java B
A@d716361
```

然而，如果我们删除编译后的_A_的.class文件并重新运行类_B_，我们将看到一个由_ClassNotFoundException_引起的_NoClassDefFoundError_：

```shell
>> rm A.class
>> java B
Exception in thread "main" java.lang.NoClassDefFoundError: A
        at B.main(B.java:3)
Caused by: java.lang.ClassNotFoundException: A
        at java.base/jdk.internal.loader.BuiltinClassLoader.loadClass(BuiltinClassLoader.java:606)
        at java.base/jdk.internal.loader.ClassLoaders$AppClassLoader.loadClass(ClassLoaders.java:168)
        at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:522)
        ... 1 more
```

**这是因为类加载器在运行时找不到类文件，即使它在编译期间存在**。这是许多Java开发人员期望的正常行为。

现在，让我们看看在相同情况下注解会发生什么。为此，我们将改变_A_类，使其成为一个注解：

```java
@Retention(RetentionPolicy.RUNTIME)
public @interface A {
}
```

如上所示，Java将在运行时保留注解信息。之后，是时候用_A_注解类_B_了：

```java
@A
public class B {
    public static void main(String[] args) {
        System.out.println("It worked!");
    }
}
```

接下来，让我们编译并运行这些类：

```shell
>> javac A.java
>> javac B.java
>> java B
It worked!
```

所以，我们看到_B_成功地在控制台上打印了它的信息，这是有道理的，因为一切都是编译和连接得很好。

现在，让我们删除_A_的类文件：

```shell
>> rm A.class
>> java B
It worked!
```

如上所示，**即使注解类文件丢失，注解类仍然可以无异常地运行**。

### 3.1. 带有类标记的注解

为了使事情更有趣，让我们引入另一个带有_Class```<?>```_属性的注解：

```java
@Retention(RetentionPolicy.RUNTIME)
public @interface C {
    Class```<?>``` value();
}
```

如上所示，这个注解有一个名为_value_的属性，返回类型为_Class```<?>```_。作为该属性的参数，让我们添加另一个空类_D_：

```java
public class D {
}
```

现在，我们将用这个新注解注解_B_类：

```java
@A
@C(D.class)
public class B {
    public static void main(String[] args) {
        System.out.println("It worked!");
    }
}
```

当所有类文件都存在时，一切应该正常工作。然而，当我们只删除_D_类文件而不动其他文件时会发生什么？让我们找出答案：

```shell
>> rm D.class
>> java B
It worked!
```

如上所示，尽管_D_在运行时不存在，一切仍然正常工作！因此，除了注解之外，**属性中引用的类标记也不需要在运行时存在**。

### 3.2. Java语言规范

所以，我们看到一些具有运行时保留的注解在运行时丢失，但注解类仍然可以完美运行。尽管这听起来可能出乎意料，但这种行为实际上完全符合Java语言规范，§9.6.4.2：

> 注解可能只存在于源代码中，或者它们可能存在于类或接口的二进制形式中。存在于二进制形式中的注解**可能或可能不在Java SE平台的反射库中在运行时可用**。

此外，JLS §13.5.7条目还指出：

> 添加或删除注解对Java编程语言中程序的二进制表示的正确链接没有影响。

**底线是，运行时不会因缺少注解而抛出异常，因为JLS允许它**。

### 3.3. 访问丢失的注解

让我们以一种方式改变_B_类，使其通过反射检索_A_信息：

```java
@A
public class B {
    public static void main(String[] args) {
        System.out.println(A.class.getSimpleName());
    }
}
```

如果我们编译并运行它们，一切都会很好：

```shell
>> javac A.java
>> javac B.java
>> java B
A
```

现在，如果我们删除_A_类文件并运行_B_，我们将看到相同的_NoClassDefFoundError_由_ClassNotFoundException_引起：

```shell
Exception in thread "main" java.lang.NoClassDefFoundError: A
        at B.main(B.java:5)
Caused by: java.lang.ClassNotFoundException: A
        at java.base/jdk.internal.loader.BuiltinClassLoader.loadClass(BuiltinClassLoader.java:606)
        at java.base/jdk.internal.loader.ClassLoaders$AppClassLoader.loadClass(ClassLoaders.java:168)
        at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:522)
        ... 1 more
```

根据JLS，注解不需在运行时可用。然而，**当其他代码读取该注解并对其进行操作时（就像我们所做的），注解必须在运行时存在**。否则，我们将看到一个_ClassNotFoundException_。

## 结论

在本文中，我们看到了即使注解是类二进制表示的一部分，它们在运行时也可能缺席。

像往常一样，所有示例都可以在GitHub上找到。