---
date: 2022-01-01
category:
  - Java
  - Constructor
tag:
  - Java
  - Constructor
head:
  - - meta
    - name: keywords
      content: Java, Constructor, Specification, Baeldung
---

# Java中的构造器规范 | Baeldung

## 1. 概述

在本教程中，我们将学习Java如何处理构造器，并从Java语言规范中回顾一些与之相关的规则。

## 2. 构造器声明

在Java中，每个类都必须有一个构造器。它的结构看起来类似于一个方法，但它有不同的目的。

让我们看看构造器的规范：

```java
`<构造器修饰符>` `<构造器声明器>` [抛出子句] `<构造器体>`
```

让我们分别看看每个部分。

### 2.1. 构造器修饰符

构造器声明以访问修饰符开始：它们可以是_public_、_private_、_protected_或包访问，基于其他访问修饰符。

**为了防止编译错误，构造器声明不能有多个_private_、_protected_或_public_访问修饰符。**

与方法不同，构造器不能是_abstract_、_static_、_final_、_native_或_synchronized_：

- 没有必要声明构造器为_final_，因为它们不是类成员，它们不继承。
- 抽象是不必要的，因为我们必须实现构造器。
- 静态构造器不是必需的，因为每个构造器都是用对象调用的。
- 正在构造的对象不应该被_synchronized_，因为这样会在对象正在构造时锁定对象，这通常不会在所有构造器完成工作之前提供给其他线程。
- Java中没有_native_构造器，因为这是一种语言设计决定，旨在确保在对象创建期间始终调用超类构造器。

### 2.2. 构造器声明器

让我们检查构造器声明器的语法：

```java
构造器名称（参数列表）
```

构造器声明器中的构造器名称必须与包含构造器声明的类的名称匹配，否则会发生编译时错误。

### 2.3. 抛出子句

方法和构造器的_throws_子句的结构和行为都是相同的。

### 2.4. 构造器体

构造器体的语法是：

```java
构造器体：{ [显式构造器调用] [块语句] }
```

我们可以显式地调用同一类中的另一个构造器，或者调用直接超类的构造器，作为构造器体中的第一个命令。不允许直接或间接调用同一个构造器。

## 3. 显式构造器调用

我们可以将构造器的调用分为两种类型：

- 替代构造器调用以关键字_this_开头。它们用于调用同一类的替代构造器。
- 超类构造器调用以关键字_super_开头。

让我们看一个例子，展示如何使用_this_和_super_关键字调用另一个构造器：

```java
class Person {
    String name;

    public Person() {
        this("Arash");   //显式构造器调用
    }

    public Person(String name){
        this.name = name;
    }
}
```

这里，_Employee_的第一个构造器调用其超类_Person_的构造器，并传递id：

```java
class Person {
    int id;
    public Person(int id) {
        this.id = id;
    }
}

class Employee extends Person {
    String name;
    public Employee(int id) {
        super(id);
    }
    public Employee(int id, String name) {
        super(id);
        this.name = name;
    }
}
```

## 4. 构造器调用规则

### 4.1. _this_或_super_必须是构造器中的第一个语句

每当我们调用一个构造器时，它必须调用其基类的构造器。此外，你可以在类中调用另一个构造器。**Java通过使构造器中的第一个调用是_this_或_super_来强制执行这个规则。**

让我们看一个例子：

```java
class Person {
    Person() {
        //
    }
}

class Employee extends Person {
    Employee() {
        //
    }
}
```

这是一个构造器编译的例子：

```java
.class Employee
.super Person
; 一个不接受参数的构造器
.method ```````<init>```````()V
aload_0
invokespecial Person/```````<init>```````()V
return
.end method
```

构造器编译类似于编译任何其他方法，只是生成的方法名称为_```````<init>```````_。验证_```````<init>```````_方法的一个要求是，调用超类构造器（或当前类中的另一个构造器）必须是方法中的第一步。

正如我们上面看到的，_Person_类必须调用其超类构造器，依此类推，直到_java.lang.Object_。

**当类必须调用其超类构造器时，它确保它们永远不会在适当的初始化之前被使用。JVM的安全性取决于此，因为一些方法在类被初始化之前不会工作。**

### 4.2. 不要在构造器中同时使用_this_和_super_

想象一下，如果我们可以在构造器体中同时使用_this_和_super_。

让我们通过一个例子看看会发生什么：

```java
class Person {
    String name;
    public Person() {
        this("Arash");
    }

    public Person(String name) {
        this.name = name;
    }
}

class Employee extends Person {
    int id;
    public Employee() {
        super();
    }

    public Employee(String name) {
        super(name);
    }

    public Employee(int id) {
        this();
        super("John"); // 语法错误
        this.id = id;
    }

    public static void main(String[] args) {
        new Employee(100);
    }
}
```

我们不能执行上述代码，因为**会出现编译时错误**。Java编译器当然有其逻辑解释。

让我们看看构造器调用序列：

![img](https://www.baeldung.com/wp-content/uploads/2022/01/uu-2.png)

**Java编译器不允许编译此程序，因为初始化不明确。**

### 4.3. 递归构造器调用

如果构造器调用自身，编译器会抛出错误。例如，在以下Java代码中，编译器会抛出错误，因为我们试图在构造器内调用同一个构造器：

```java
public class RecursiveConstructorInvocation {
    public RecursiveConstructorInvocation() {
        this();
    }
}
```

尽管Java编译器有此限制，我们可以通过稍微更改代码来编译程序，但我们会以这种方式遇到堆栈溢出：

```java
public class RecursiveConstructorInvocation {
    public RecursiveConstructorInvocation() {
        RecursiveConstructorInvocation rci = new RecursiveConstructorInvocation();
    }

    public static void main(String[] args) {
        new RecursiveConstructorInvocation();
    }
}
```

**我们创建了一个_RecursiveConstructorInvocation_对象，该对象通过调用构造器进行初始化。然后构造器创建了另一个_RecursiveConstructorInvocation_对象，该对象再次通过调用构造器进行初始化，直到堆栈溢出。**

现在，让我们看看输出：

```java
Exception in thread "main" java.lang.StackOverflowError
    at org.example.RecursiveConstructorInvocation.```````<init>```````(RecursiveConstructorInvocation.java:29)
    at org.example.RecursiveConstructorInvocation.```````<init>```````(RecursiveConstructorInvocation.java:29)
    at org.example.RecursiveConstructorInvocation.```````<init>```````(RecursiveConstructorInvocation.java:29)
//...
```

## 5. 结论

在本教程中，我们讨论了Java中构造器的规范，并回顾了一些规则，以便理解类和超类中构造器的调用。

如常，代码示例可以在GitHub上找到。