---
date: 2022-04-01
category:
  - Java
  - 编程
tag:
  - Class.forName()
  - newInstance()
head:
  - - meta
    - name: keywords
      content: Java,动态类加载,反射,newInstance,Class对象
---

# Java中Class.forName()与Class.forName().newInstance()的区别

在Java中，动态加载类是指在运行时而不是编译时将类加载到Java虚拟机中。这种方法在某些情况下非常有用，例如我们不知道编译时的类名，或者类加载基于用户输入或系统属性。

有几种在Java中动态加载类的方法，包括_Class.forName()_方法、_ClassLoader API_和依赖注入框架。

在本文中，我们将考虑_Class.forName()_和_Class.forName().newInstance()_方法，这些方法在Java应用程序中常用，并且对开发人员来说理解它们至关重要。

## 2. _Class.forName()_方法

_Class.forName()_方法接受类的完全限定名作为参数，并**返回与加载的类关联的_Class_对象**。在执行过程中，它尝试定位、加载和链接类或接口。它通常用于我们想要获取类的信息，例如字段和方法。然而，我们需要注意的是，**类没有被初始化，调用它的方法是不可能的**。

让我们编写一个使用_Class.forName()_方法的快速测试：

```java
@Test
public void whenUseClassForNameCreatedInstanceOfClassClass() throws... {
   Class instance = Class.forName("com.baeldung.loadclass.MyClassForLoad");
   assertInstanceOf(Class.class, instance, "instance should be of Class.class");
}
```

同样重要的是要记住，**动态加载方法不会验证请求类的可访问性**，这可能导致与加载、链接或初始化相关的潜在异常。正确处理它们对于避免意外行为和潜在崩溃至关重要：

- _LinkageError –_ 如果链接失败
- _ExceptionInInitializerError –_ 如果初始化失败
- _ClassNotFoundException –_ 如果找不到类

## 3. _Class.forName().newInstance()_方法

当我们想要创建一个类的实例时，_Class.forName().newInstance()_方法就派上用场了。这个方法也接受类的完全限定名作为参数，并**返回这个_Class_对象表示的类的一个新的实例**。它就像使用空参数列表调用_MyClassForLoad_的新运算符一样。

让我们看看在单元测试中使用_Class.forName().newInstance()_方法的示例：

```java
@Test
public void whenUseClassForNameWithNewInstanceCreatedInstanceOfTargetClass throws... () {
   Object instance = Class.forName("com.baeldung.loadclass.MyClassForLoad").newInstance();
   assertInstanceOf(MyClassForLoad.class, instance, "instance should be of MyClassForLoad.class");
}
```

请记住，_Class.forName().newInstance()_可能会抛出几种异常：

- _IllegalAccessException –_ 如果类或其无参构造函数不可访问
- _InstantiationException –_ 如果这个类表示一抽象类、接口、数组类、原始类型或_void_
- _ExceptionInInitializerError –_ 如果由这个方法触发的初始化失败
- _SecurityException –_ 当调用代码没有足够的权限访问指定的类时

然而，重要的是要注意，**_newInstance()_自Java 9起已被弃用**，因为它传播了无参构造函数抛出的任何异常，包括检查异常。这个方法有效地绕过了编译器执行的编译时异常检查。因此，它可能导致意外的错误或漏洞，以及不那么健壮和可维护的代码库。

**建议调用_getDeclaredConstructor().newInstance()_** **构造**以避免这个问题：

```java
Object instance = Class.forName("com.baeldung.loadclass.MyClassForLoad").getDeclaredConstructor().newInstance();
```

## 4. 结论

开发人员必须对Java中动态类加载的工作原理有深入的理解。它提供了许多好处，可以帮助提高Java应用程序的性能、可维护性和可扩展性。

在本文中，我们了解到_Class.forName()_和_Class.forName().newInstance()_是Java中的两个关键方法，允许我们在运行时加载类。这些方法之间的区别在于它们的作用和返回的内容。

**_Class.forName()_动态加载类并返回_Class_对象，而_Class.forName().newInstance()_加载类并创建加载类的实例。**

理解这些方法及其差异至关重要，因为它们经常在现实世界的场景中使用：

- 插件开发
- 像Spring或Guice这样的依赖注入框架
- 根据使用的数据库加载JDBC驱动程序
- 根据输入参数加载类

最后，通过了解_Class.forName()_和_Class.forName().newInstance()_之间的区别，开发人员可以做出明智的决策，如何在他们的Java项目中动态加载类，从而实现更有效和高效的代码。

完整的源代码可在GitHub上找到。

OK