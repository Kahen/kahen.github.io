---
date: 2022-11-01
category:
  - Kotlin
  - Programming
tag:
  - Kotlin
  - Class
  - Function
  - Reflection
head:
  - - meta
    - name: keywords
      content: Kotlin, Class, Function, Reflection, KClass, reified
---

# 在Kotlin中将类传递给函数

在Kotlin中，类是语言的基本构建块，我们使用它们来定义对象及其行为。虽然通常传递各种数据类型的参数，但有时我们需要将类作为参数传递给函数。

将类传递给函数允许我们将其用作函数中的参数，从而可以对其进行操作。本教程将探讨在Kotlin中将类引用传递给函数的方法。

## 2. 使用类引用

在Kotlin中，每个类都与一个类引用相关联。Kotlin中有两类类引用。_KClass_是Kotlin类引用：

```
MyClass::class
```

还有我们从Java熟悉的传统_Class_引用：

```
MyClass::class.java
```

### 2.1. _Class_与_KClass_的区别

如上所述，类引用有两种表示形式：_Class_和_KClass_。**主要区别在于_KClass_提供了额外的Kotlin特定特性，如类型参数和可空类型**。更重要的是，_KClass_提供了一种统一的方式来处理用_Kotlin_、_Java_和其他_JVM_语言编写的类，而_Class_主要用于_Java_互操作目的。

### 2.2. 使用_Class_参数访问

首先，我们定义一个可以作为参数传递给函数的类：

```kotlin
class ParameterClass {
    fun parameterClassMethod(): String {
        return "这是我们类上调用的方法"
    }
}
```

这是一个只有一种返回_String_的方法的简单类。

我们现在可以定义一个接受这个类作为参数的函数，使用类引用：

```kotlin
fun ```<T : ParameterClass>``` functionAcceptingClassReference(clazz: Class```<T>```): String {
    val instance = clazz.newInstance()
    return instance.parameterClassMethod()
}
```

该方法接受一个名为_clazz_的单一参数，类型为_T_的类引用，必须是_ParameterClass_的子类。

**我们使用_Class_的_newInstance()_方法创建类引用的实例**。这将创建一个新的_ParameterClass_实例。

最后，我们调用_ParameterClass_实例上的_paramterClassMethod()_并将方法调用的结果作为_String_返回。

现在让我们测试这个方法以确保它正常工作：

```kotlin
@Test
fun `使用类引用将类作为函数参数传递`() {
    val result = functionAcceptingClassReference(ParameterClass::class.java)
    assertEquals("这是我们类上调用的方法", result)
}
```

在这个单元测试中，我们将_ParameterClass_的_Class_引用作为参数传递给我们的方法。最后，我们断言这个方法返回了我们_ParameterClass_的预期字符串，以证明我们使用了类型引用。

### 2.3. 使用_KClass_参数访问

或者，我们可以将_KClass_参数传递给我们的函数，而不是_Class_参数：

```kotlin
fun ```<T : ParameterClass>``` functionAcceptingKClassReference(clazz: KClass```<T>```): String {
    val instance = clazz.createInstance()
    return instance.paramterClassMethod()
}
```

这个辅助方法接受一个_KClass_参数。**这个参数必须是扩展了_ParameterClass_的_KClass_引用**。

与之前的方法不同，_KClass_提供了_createInstance()_来创建_ParameterClass_的实例。最后，我们使用这个实例调用_parameterClassMethod()_：

```kotlin
@Test
fun `使用kclass引用将类作为函数参数传递`() {
    val result = functionAcceptingKClassReference(ParameterClass::class)
    assertEquals("这是我们类上调用的方法", result)
}
```

最后，我们断言我们的辅助方法返回了我们_ParameterClass_方法的正确字符串。

## 3. 使用_reified_类型参数

另外，我们可以使用_reified_类型参数将类传递给函数。**它允许我们在运行时访问泛型类型参数的类**。

_reified_关键字允许我们在不将其作为参数传递的情况下访问泛型类型参数。更重要的是，我们可以轻松地使用类型参数获取类的_Class_或_KClass_对象：

```kotlin
inline fun `<reified T : ParameterClass>` functionAcceptingClassNameUsingReifiedParameters(): String {
    val instance = T::class.java.newInstance()
    return instance.parameterClassMethod()
}
```

**类似地，这个方法从类引用创建了_ParameterClass_类的实例**。然后我们返回来自_parameterClassMethod()_方法的字符串：

```kotlin
@Test
fun `使用reified参数将类作为函数参数传递`() {
    val result = functionAcceptingClassNameUsingReifiedParameters``<ParameterClass>``()
    assertEquals("这是我们类上调用的方法", result)
}
```

在这个单元测试中，由于_reified_类型参数，我们作为参数传递了_ParameterClass_类型。最后，我们断言_functionAcceptingClassNameUsingReifiedParameters()_方法返回了正确的字符串。

## 4. 使用Java反射

最后，我们可以使用Java的反射将类传递给函数。**这是通过将完全限定的类名作为_String_传递，然后使用反射创建类的实例来完成的**：

```kotlin
fun ```<T : ParameterClass>``` functionAcceptingClassNameUsingReflection(className: String): String {
    val clazz = Class.forName(className) as Class```<T>```
    val instance = clazz.newInstance()

    return instance.parameterClassMethod()
}
```

这个方法首先通过调用_Class.forName(className)_方法获得对应于_className_参数的_Class_对象的引用。_as_关键字将_Class_对象转换为泛型类型_T_的_Class_。

**接下来，我们创建类的实例**。

最后，我们在_ParameterClass_的实例上调用_parameterClassMethod()_方法：

```kotlin
@Test
fun `使用反射将类作为函数参数传递`() {
    val result = functionAcceptingClassNameUsingReflection``<ParameterClass>``("com.baeldung.classParameterToFunction.ParameterClass")

    assertEquals("这是我们类上调用的方法", result)
}
```

我们以_String_的形式提供完全限定的类名给这个方法。然后这个方法将访问_ParameterClass_类的_parameterClassMethod()_方法并返回所需的字符串。

## 5. 结论

在本文中，我们讨论了在Kotlin中将类传递给函数的不同方式。我们涵盖了_Class_引用、反射和_reified_类型参数方法。我们应该评估哪种方法最适合我们的项目需求。

如常，本文中使用的全部源代码可以在GitHub上找到。

OK