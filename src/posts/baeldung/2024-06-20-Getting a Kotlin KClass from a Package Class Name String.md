---
date: 2024-06-20
category:
  - Kotlin
  - Programming
tag:
  - KClass
  - Reflection
head:
  - - meta
    - name: keywords
      content: Kotlin, KClass, Reflection, Dynamic Instantiation, Method Invocation
------
# 从包类名字符串获取 Kotlin KClass 的方法

在本教程中，我们将探讨在 Kotlin 中从包类名字符串获取 KClass 的不同方法。无论是动态实例化还是方法调用，将类名字符串转换为其对应的 KClass 对象的能力至关重要。KClass 对象在运行时表示 Kotlin 类，并且可以通过几种策略获得。

## 1. 引言

在 Kotlin 中工作时，有时需要从包类名字符串获取 KClass 实例。无论是为了动态实例化还是方法调用，将类名字符串转换为其对应的 KClass 对象的能力至关重要。KClass 对象在运行时表示 Kotlin 类，并且可以通过几种策略获得。

## 2. 使用 Class.forName() 方法

Java 的反射 API 通过 Class.forName() 方法提供了从类名字符串获取 KClass 的最直接方式。一旦我们有了类，我们可以使用 kotlin 属性来获取 KClass 实例：

```kotlin
fun getClassUsingForName(className: String): KClass```<*>```? {
    return Class.forName(className).kotlin
}
```

我们可以使用这个辅助方法通过类名获取任何类的 KClass 实例。**Class.forName() 方法根据提供的类名字符串在运行时动态加载类。**

让我们验证我们的 getClassUsingForName() 辅助方法的行为。我们提供给它一个类名，并断言我们获得了正确的 KClass：

```kotlin
@Test
fun `使用 forName 方法从包类名获取 KClass`() {
    val className = "com.baeldung.obtainKclassFromPackageClassName.ClassExample"

    val kClass = getClassUsingForName(className)

    assertEquals(ClassExample::class, kClass)
}
```

此外，如果找不到类，这种方法会抛出 ClassNotFoundException：

```kotlin
@Test
fun `使用 forName 方法从包类名获取 KClass 并且类不存在`() {
    val notClass = "com.baeldung.obtainKclassFromPackageClassName.NotAClass"

    val exception = assertThrows``<ClassNotFoundException>`` {
        getClassUsingForName(notClass)
    }

    assertEquals("com.baeldung.obtainKclassFromPackageClassName.NotAClass", exception.message)
}
```

## 3. 使用 ClassLoader.loadClass() 方法

另一种从包类名字符串获取 KClass 实例的方法是使用 ClassLoader.loadClass() 方法：

```kotlin
fun getClassFromLoader(className: String): KClass```<*>```? {
    ClassLoader.getSystemClassLoader().loadClass(className).kotlin
}
```

**通过使用系统类加载器的 loadClass() 方法，我们动态加载类，然后检索其 KClass 对象：**

```kotlin
@Test
fun `使用类加载器从包类名获取 KClass`() {
    val className = "com.baeldung.obtainKclassFromPackageClassName.ClassExample"

    val kClass = getClassFromLoader(className)

    assertEquals(ClassExample::class, kClass)
}
```

这验证了 getClassFromLoader() 函数通过完全限定名成功加载了 KClass。

同样，当我们使用不存在的类名时，我们的辅助方法会抛出 ClassNotFoundException：

```kotlin
@Test
fun `使用类加载器从包类名获取 KClass 并且类不存在`() {
    val notClass = "com.baeldung.obtainKclassFromPackageClassName.NotAClass"

    val exception = assertThrows``<ClassNotFoundException>`` {
        getClassFromLoader(notClass)
    }

    assertEquals("com.baeldung.obtainKclassFromPackageClassName.NotAClass", exception.message)
}
```

## 4. 使用 ClassGraph 库

最后，ClassGraph 库提供了另一种从类名字符串获取类信息的方法。**ClassGraph 提供了扫描类路径和访问类元数据的实用工具：**

```kotlin
fun getClassUsingClassGraph(className: String): KClass```<*>```? {
    val classInfo: ClassInfo? = ClassGraph()
        .addClassLoader(ClassLoader.getSystemClassLoader())
        .enableClassInfo()
        .scan()
        .getClassInfo(className)

    return classInfo?.loadClass()?.kotlin
}
```

**使用 ClassGraph 库，我们的辅助方法通过其名称加载类。** 具体来说，我们通过调用 getClassInfo() 方法来检查提供的类名是否存在。最后，我们将获得相应的 KClass：

```kotlin
@Test
fun `使用类路径从包类名获取 KClass`() {
    val className = "com.baeldung.obtainKclassFromPackageClassName.ClassExample"
    val kClass = getClassUsingClassGraph(className)

    assertEquals(ClassExample::class, kClass)
}
```

如果提供的类名不存在，我们将收到 null 而不是：

```kotlin
@Test
fun `使用类路径从包类名获取 KClass 并且类不存在`() {
    val notClass = "com.baeldung.obtainKclassFromPackageClassName.NotAClass"
    val kClass = getClassUsingClassGraph(notClass)

    assertNull(kClass)
}
```

## 5. 结论

在本文中，我们探讨了从包类名字符串获取 KClass 对象的不同方法。我们从 Java 核心策略开始，使用了传统的 Class.forName() 和 ClassLoader 方法。最后，我们查看了 ClassGraph 库，以防我们想要更高级的实用工具。每种方法都根据项目的要求和偏好提供了不同的优势。

通过掌握这些技术，我们可以从它们的完全限定包字符串动态访问 Kotlin 类进行动态实例化、方法调用或类路径扫描。

如往常一样，本文中使用的全部源代码可在 GitHub 上获取。