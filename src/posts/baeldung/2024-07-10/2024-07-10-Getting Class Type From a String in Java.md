---
date: {2024-07-11}
category:
  - Java
  - 反射
tag:
  - Class
  - forName
  - newInstance
head:
  - - meta
    - name: keywords
      content: Java反射,Class对象,forName方法,newInstance方法
------
# 在Java中从字符串获取类类型

## 1. 概述

`Class`类在Java反射中扮演着重要的角色，它是所有反射操作的起点。

在这个快速教程中，我们将探讨如何从一个字符串中的类名获取`Class`对象。

## 2. 问题介绍

首先，让我们创建一个简单的类作为示例：

```java
package com.baeldung.getclassfromstr;

public class MyNiceClass {
    public String greeting(){
        return "Hi there, I wish you all the best!";
    }
}
```

如上面的代码所示，**`MyNiceClass`类是创建在`com.baeldung.getclassfromstr`包中的**。此外，该类只有一个方法`greeting()`，它返回一个`String`。

我们的目标是从`MyNiceClass`类的名称获取其`Class`对象。进一步，我们想从`Class`对象创建一个`MyNiceClass`的实例，以验证`Class`对象是否是我们所追求的。

为了简单起见，我们将使用单元测试断言来验证我们的解决方案是否按预期工作。

接下来，让我们看看它是如何工作的。

## 3. 使用`forName()`方法获取`Class`对象

`Class`类提供了`forName()`方法来从类名字符串获取`Class`对象。接下来，让我们看看如何调用这个方法来获取`MyNiceClass`的`Class`对象：

```java
Class cls = Class.forName("com.baeldung.getclassfromstr.MyNiceClass");
assertNotNull(cls);
```

接下来，让我们从`Class`对象`cls`创建一个`MyNiceClass`实例。如果我们的Java版本早于9，我们可以使用`cls.newInstance()`方法。然而，**这个方法自Java 9以来已经被弃用**。对于较新的Java版本，我们可以使用`cls.getDeclaredConstructor().newInstance()`来从`Class`对象获取一个新实例：

```java
MyNiceClass myNiceObject = (MyNiceClass) cls.getDeclaredConstructor().newInstance();
assertNotNull(myNiceObject);
assertEquals("Hi there, I wish you all the best!", myNiceObject.greeting());
```

当我们运行测试时，测试通过。因此，我们已经从类名获取了所需的`Class`对象。

值得一提的是，**要获取`Class`对象，我们必须向`forName()`方法传递一个完全限定的类名，而不是一个简单的名字**。例如，我们应该向`forName()`方法传递字符串`"com.baeldung.getclassfromstr.MyNiceClass"`。否则，`forName()`方法会抛出`ClassNotFoundException`：

```java
assertThrows(ClassNotFoundException.class, () -> Class.forName("MyNiceClass"));
```

## 4. 关于异常处理的一些话

我们已经看到了如何从类名获取`MyNiceClass`的`Class`对象。为了简单起见，在测试中我们省略了异常处理。现在，让我们看看在使用`Class.forName()`和`cls.getDeclaredConstructor().newInstance()`方法时我们应该处理哪些异常。

首先，`Class.forName()`会抛出`ClassNotFoundException`。我们提到了当我们传递`MyNiceClass`的简单名称时。**`ClassNotFoundException`是一个检查异常**。因此，在调用`Class.forName()`方法时，我们必须处理它。

接下来，让我们看看`cls.getDeclaredConstructor()`和`newInstance()`。**`getDeclaredConstructor()`方法会抛出**`NoSuchMethodException`。同时，**`newInstance()`会抛出`InstantiationException, IllegalAccessException, IllegalArgumentException, 和 InvocationTargetException`**。这五个异常都是检查异常。因此，如果我们使用这两种方法，我们需要处理它们。

值得一提的是，我们在本节讨论的所有异常都是`ReflectiveOperationException`的子类型。也就是说，**如果我们不想单独处理这些异常，我们可以处理`ReflectiveOperationException`**，例如：

```java
void someNiceMethod() throws ReflectiveOperationException {
    Class cls = Class.forName("com.baeldung.getclassfromstr.MyNiceClass");
    MyNiceClass myNiceObject = (MyNiceClass) cls.getDeclaredConstructor().newInstance();
    // ...
}
```

或者，我们可以使用`try-catch`块：

```java
try {
    Class cls = Class.forName("com.baeldung.getclassfromstr.MyNiceClass");
    MyNiceClass myNiceObject = (MyNiceClass) cls.getDeclaredConstructor().newInstance();
    // ...
} catch (ReflectiveOperationException exception) {
    // 处理异常
}
```

## 5. 结论

在这篇短文中，我们学习了如何使用`Class.forName()`方法从给定的类名字符串获取`Class`对象。我们应该注意，我们应该向`Class.forName()`方法传递完全限定的名称。

一如既往，本文使用的所有代码示例都可以在GitHub上找到。