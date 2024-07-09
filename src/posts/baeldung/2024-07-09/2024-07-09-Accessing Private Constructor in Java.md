---
date: 2022-04-01
category:
  - Java
  - 设计模式
tag:
  - 私有构造函数
  - 反射API
head:
  - - meta
    - name: keywords
      content: Java, 私有构造函数, 设计模式, 反射API
---

# Java中访问私有构造函数

## 1. 概述

在本教程中，我们将探讨为什么在Java中我们会使用类的私有构造函数以及如何使用它。

## 2. 为什么要使用私有构造函数？

在Java中，我们可以使用`private`访问修饰符声明一个构造函数。**如果一个构造函数被声明为私有，我们不能在类之外创建该类的实例。**

私有构造函数的使用场景是当我们想要限制一个类的对象实例化方式时。例如，我们可能只想通过一个工厂类来创建对象。或者另一种情况是我们只想拥有该类的一个对象实例。

私有构造函数最常用的情况是单例、建造者和工厂模式，这些是创建型设计模式。

现在，我们可以想象这些模式的任何组合，因为它们可以很好地融合在一起，实现一个健壮的代码库。

通常，为了调用私有构造函数，上述使用情况中有其他公共方法会在类内部调用私有构造函数。

另外，**我们可以使用Java反射API直接访问私有构造函数。**

Java反射API是一个高级特性，它允许程序检查和修改在JVM中运行的应用程序的运行时行为。因此，**使用这种方法并不推荐，因为它可能导致难以发现和修复bug。**

使用反射，我们可以看到任何类的方法和属性，并绕过访问修饰符进行修改或访问。

**使用反射最常见的情况是对具有私有方法的类进行单元测试。**要使用反射对私有构造函数或方法进行单元测试，我们需要执行以下步骤：

- 获取我们想要实例化的类的类对象
- 使用类对象，调用`getDeclaredConstructor()`方法获取`Constructor`对象
- 在`Constructor`对象上，调用`setAccessible()`方法使构造函数可访问
- `Constructor`对象可访问后，我们可以调用`newInstance()`方法，它将创建该类的一个新对象

让我们创建一个带有私有构造函数的类。然后我们将使用Java反射API实例化它，并确保私有构造函数被调用：

```
private PrivateConstructorClass() {
    System.out.println("Used the private constructor!");
}
```

让我们添加一个单元测试，使用私有构造函数实例化这个类：

```
@Test
public void whenConstructorIsPrivate_thenInstanceSuccess() throws Exception {
    Constructor`<PrivateConstructorClass>` pcc = PrivateConstructorClass.class.getDeclaredConstructor();
    pcc.setAccessible(true);
    PrivateConstructorClass privateConstructorInstance = pcc.newInstance();
    Assertions.assertTrue(privateConstructorInstance instanceof PrivateConstructorClass);
}
```

在控制台输出中，我们应该看到私有构造函数被调用，并且构造函数内的打印显示了消息。**尽管有私有访问修饰符，我们现在可以调用私有构造函数并实例化新对象。**

## 4. 结论

在本文中，我们看到了为什么我们会使用私有构造函数以及几种不同的使用方式。我们还了解到我们可以创建公共方法来访问私有构造函数，或者使用高级的Java反射API进行更高级的方法。

如常，这些示例的完整实现可以在GitHub上找到。

OK