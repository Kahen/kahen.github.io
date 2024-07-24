---
date: 2022-04-01
category:
  - Java
  - Reflection API
tag:
  - Java Reflection
  - Static Method Invocation
head:
  - - meta
    - name: keywords
      content: Java Reflection API, Static Method Invocation
------
# 使用Java反射API调用静态方法

## 1. 概述

在本快速教程中，我们将讨论如何使用反射API在Java中调用静态方法。

我们将涵盖两种不同的情况：

- 静态方法是**公共的**。
- 静态方法是**私有的**。

## 2. 示例类

为了使演示和解释更简单，我们首先创建一个**GreetingAndBye**类作为示例：

```java
public class GreetingAndBye {

    public static String greeting(String name) {
        return String.format("Hey %s, nice to meet you!", name);
    }

    private static String goodBye(String name) {
        return String.format("Bye %s, see you next time.", name);
    }

}
```

**GreetingAndBye**类看起来很简单。它有两个静态方法，一个公共的和一个私有的。

这两个方法都接受一个**String**参数，并返回一个**String**作为结果。

现在，让我们使用Java反射API调用这两个静态方法。在本教程中，我们将把代码作为单元测试方法来处理。

## 3. 调用**公共**静态方法

首先，让我们看看如何调用**公共**静态方法：

```java
@Test
void invokePublicMethod() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
    Class``<GreetingAndBye>`` clazz = GreetingAndBye.class;
    Method method = clazz.getMethod("greeting", String.class);

    Object result = method.invoke(null, "Eric");

    Assertions.assertEquals("Hey Eric, nice to meet you!", result);
}
```

我们应该注意，当我们使用反射API时，需要处理所需的受检异常。

在上面的示例中，我们首先获取我们想要测试的类的实例，即**GreetingAndBye**。

有了类实例后，我们可以通过调用**getMethod**方法获取公共静态方法对象。

一旦我们有了**method**对象，我们可以通过调用**invoke**方法简单地调用它。

值得解释的是**invoke**方法的第一个参数。如果方法是实例方法，第一个参数是从哪个对象调用底层方法的。

然而，**当我们调用静态方法时，我们传递**null****作为第一个参数**，因为静态方法不需要实例就可以被调用。

最后，如果我们运行测试，它将通过。

## 3. 调用**私有**静态方法

调用**私有**静态方法与调用**公共**方法非常相似。让我们先看看代码：

```java
@Test
void invokePrivateMethod() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
    Class``<GreetingAndBye>`` clazz = GreetingAndBye.class;
    Method method = clazz.getDeclaredMethod("goodBye", String.class);
    method.setAccessible(true);

    Object result = method.invoke(null, "Eric");

    Assertions.assertEquals("Bye Eric, see you next time.", result);
}
```

正如我们在上面的代码中看到的，**当我们尝试获取**私有方法**的**Method**对象时，我们应该使用**getDeclaredMethod**而不是**getMethod**。

此外，**我们需要调用**method.setAccessible(true)**来调用**私有**方法**。这将要求JVM抑制对此方法的访问控制检查。

因此，它允许我们调用私有方法。否则，将引发**IllegalAccessException**异常。

如果我们执行测试，它将通过。

## 4. 结论

在这篇简短的文章中，我们讨论了如何使用Java反射API调用静态方法。

一如既往，完整的代码可以在GitHub上找到。