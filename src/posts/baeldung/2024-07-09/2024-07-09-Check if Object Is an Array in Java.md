---
date: 2022-04-01
category:
  - Java
  - Arrays
tag:
  - Java
  - Arrays
head:
  - - meta
    - name: keywords
      content: Java, Array, Object, instanceof, Class.isArray()
------
# 如何在Java中检查对象是否为数组

在Java中，经常需要确定给定的对象是否为数组。这在几种不同的情况下都可能很有用，例如在以通用方式使用数组或在我们的代码中执行类型检查时。

在本教程中，我们将探讨如何实现这种判断。

## 2. 问题介绍

首先，让我们看看两个对象：

```java
final Object ARRAY_INT = new int[] { 1, 2, 3, 4, 5 };
final Object ARRAY_PERSON = new Person[] { new Person("Jackie Chan", "Hong Kong"), new Person("Tom Hanks", "United States") };
```

我们在_Object_类型中声明了两个对象。此外，两个对象都是数组。一个是原始数组（_int[]_），另一个是_Person_实例数组（_Person[]_）。好吧，《Person_是一个简单的POJO类，有两个属性：

```java
class Person {
    private String name;
    private String Location;

    public Person(String name, String location) {
        this.name = name;
        this.Location = location;
    }

    // getter方法省略
}
```

我们需要找到一种方法来确定这两个对象是数组。Java提供了简单直接的方法来检查一个对象是否是数组。在本教程中，我们将学习两种不同的方法：

- 使用_instanceof_运算符
- 使用_Class.isArray()_方法

为了简单起见，我们将使用单元测试断言来验证每种方法是否都能给我们预期的结果。

接下来，让我们看看它们是如何工作的。

## 3. 使用_instanceof_运算符

Java中的_instanceof_运算符用于确定给定对象的类型。它采用的形式是_obj instanceof type_，其中_obj_是正在检查的对象，_type_是正在检查的类型。

**由于我们通常想要检查对象是否是数组，我们可以使用_Object[]_作为类型**。例如，以这种方式检查_Person_数组按预期工作：

```java
assertTrue(ARRAY_PERSON instanceof Object[]);
```

然而，在Java中，我们有原始数组和对象数组。例如，我们的_ARRAY_INT_是一个原始数组。**如果我们使用相同的方法检查原始数组，它将失败**：

```java
assertFalse(ARRAY_INT instanceof Object[]);
```

_instanceof_运算符返回_true_，如果我们用类型_int[]_检查_ARRAY_INT_对象：

```java
assertTrue(ARRAY_INT instanceof int[]);
```

但我们不知道给定的对象是否是类型_Object[]_、_int[]_、_long[]_或_short[]_。所以，**给定一个类型为_Object_的实例_obj_，如果我们想使用_instanceof_方法来检查它是否是数组，我们需要涵盖对象数组和所有原始数组的情况**：

```java
obj instanceof Object[] || obj instanceof boolean[] ||
obj instanceof byte[] || obj instanceof short[] ||
obj instanceof char[] || obj instanceof int[] ||
obj instanceof long[] || obj instanceof float[] ||
obj instanceof double[]
```

检查逻辑有点长。然而，我们可以将这个检查放在一个方法中：

```java
boolean isArray(Object obj) {
    return obj instanceof Object[] || obj instanceof boolean[] ||
      obj instanceof byte[] || obj instanceof short[] ||
      obj instanceof char[] || obj instanceof int[] ||
      obj instanceof long[] || obj instanceof float[] ||
      obj instanceof double[];
}
```

然后，我们可以使用我们的_isArray()_方法来检查对象和原始数组：

```java
assertTrue(isArray(ARRAY_PERSON));
assertTrue(isArray(ARRAY_INT));
```

## 4. 使用_Class.isArray()_方法

我们已经学会了使用_instanceof_运算符来确定给定的对象是否是数组。这种方法可以完成工作。然而，实现看起来冗长，因为我们需要涵盖所有原始数组场景。所以接下来，让我们看看另一种更简洁的方法：使用_Class.isArray()_方法。

方法的名字告诉我们它实际上做了什么。_Class.isArray()_方法属于_java.lang.Class_类，如果指定的对象是数组，它返回_true_，否则返回_false_。此外，**_Class.isArray()_方法可以处理对象和所有原始数组**：

```java
assertTrue(ARRAY_INT.getClass().isArray());
assertTrue(ARRAY_PERSON.getClass().isArray());
```

此外，如果**我们需要知道数组元素的类型，我们可以使用_Class.getComponentType()_方法**：

```java
assertEquals(Person.class, ARRAY_PERSON.getClass().getComponentType());
assertEquals(int.class, ARRAY_INT.getClass().getComponentType());
```

一旦我们知道给定的对象是数组及其元素的类型，我们可以使用_Array.get()_方法检索所需的元素，并将其转换为具体类型：

```java
if (ARRAY_PERSON.getClass().isArray() && ARRAY_PERSON.getClass().getComponentType() == Person.class) {
    Person person = (Person) Array.get(ARRAY_PERSON, 1);
    assertEquals("Tom Hanks", person.getName());
}
if (ARRAY_INT.getClass().isArray() && ARRAY_INT.getClass().getComponentType() == int.class) {
    assertEquals(2, ((int) Array.get(ARRAY_INT, 1)));
}
```

## 5. 结论

在这篇文章中，我们学习了两种检查给定对象是否为数组的方法。

我们看到，如果我们使用_instanceof_运算符，我们必须涵盖对象数组和所有原始数组场景。另一方面，_Class.isArray()_方法更直接，它适用于对象和所有原始数组。

像往常一样，文章中展示的所有代码片段都可以在GitHub上找到。