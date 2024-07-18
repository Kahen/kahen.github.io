---
date: 2022-11-01
category:
  - Kotlin
  - Programming
tag:
  - Kotlin
  - Reflection
  - Inner Class
  - Private Methods
head:
  - - meta
    - name: keywords
      content: Kotlin, Reflection, Inner Class, Private Methods
------
# 从类外部调用类的私有方法 | Baeldung 关于 Kotlin## 1. 引言

在 Kotlin 中，私有方法通常无法从类外部访问。这是封装和数据隐藏的有用特性，但有时我们可能需要从类外部调用私有方法。

在本教程中，我们将探讨从类外部调用类的私有方法的各种方法。

## 2. 使用公共方法

根据定义，私有方法只能在声明它们的类内部访问。

从类外部调用类的私有方法的一个简单方法是创建一个调用私有方法的公共方法：

```kotlin
class MyPublicClass {
    private fun privateMethod(): String {
        return "这是一个私有方法"
    }

    fun callPrivateMethod(): String {
        return privateMethod()
    }
}
```

在上面的代码中，我们创建了一个公共方法 `callPrivateMethod()`，它简单地调用 `privateMethod()`。我们可以从类外部访问公共方法，因此通过这种方式，**我们可以间接调用私有方法**：

```kotlin
@Test
fun `使用公共方法调用私有方法`() {
    val obj = MyPublicClass()

    assertEquals("这是一个私有方法", obj.callPrivateMethod())
}
```

**但如果我们想直接从类外部调用我们的私有方法，我们需要采取其他选项。**

## 3. 使用反射

我们将要探索的第二种方法涉及使用反射。**反射是一个功能，它允许我们检查和修改程序的运行时行为**。

为了更好地理解这种方法，让我们考虑自定义类 `MyClass`：

```kotlin
class MyClass {
    private fun privateMethod(): String {
        return "这是一个私有方法"
    }
}
```

这是一个包含名为 `privateMethod()` 的私有方法的简单类。

现在，让我们看看如何使用反射从 `MyClass` 类中访问这个私有方法：

```kotlin
@Test
fun testPrivateFunctionUsingReflection() {
    val obj = MyClass()
    val privateMethod = MyClass::class.java.getDeclaredMethod("privateMethod")
    privateMethod.isAccessible = true
    val output = privateMethod.invoke(obj)

    assertEquals("这是一个私有方法", output)
}
```

在上面的代码中，我们创建了 `MyClass` 的一个实例，并使用反射访问私有方法 `privateMethod()`。

**首先，我们使用 `getDeclaredMethod()` 方法获取方法的引用，然后我们将其 `isAccessible` 属性设置为使其可访问**。最后，我们通过调用 `invoke()` 调用私有方法，并断言它返回正确的字符串。

## 4. 使用内部类

从类外部调用私有方法的另一种有趣的方法是使用嵌套或内部类。内部类是定义在另一个类内的类。

让我们考虑包含内部类的 `MyClassWithInnerClass` 类：

```kotlin
class MyClassWithInnerClass {
    private fun privateMethod(): String {
        return "这是一个私有方法"
    }

    inner class MyInnerClass {
        fun callPrivateMethod(): String {
            return privateMethod()
        }
    }
}
```

在这段代码片段中，我们定义了 `MyClassWithInnerClass`，其中包含一个返回字符串的私有方法 `privateMethod()`。**接下来，我们定义了一个内部类 `MyInnerClass`，它有一个公共方法 `callPrivateMethod()`，其唯一的任务是调用 `privateMethod()` 方法**。

让我们测试这种方法：

```kotlin
@Test
fun `使用内部类调用私有方法`() {
    val obj = MyClassWithInnerClass()
    val innerObj = obj.MyInnerClass()
    val output = innerObj.callPrivateMethod()

    assertEquals("这是一个私有方法", output)
}
```

在这个例子中，我们创建了 `MyClassWithInnerClass` 的一个实例和一个 `MyInnerClass` 的实例。然后我们调用公共方法 `callPrivateMethod()` 来访问 `MyClassWithInnerClass` 的私有方法。最后，我们断言私有方法返回的字符串符合我们的预期。

注意，内部类之所以能够按所示工作，是因为 **_MyInnerClass_ 从技术上是 _MyClassWithInnerClass_ 的成员**，因此它被允许调用其父类的私有方法。

## 5. 结论

在本文中，我们探讨了从类外部访问类的私有方法的各种方式。我们展示了每种方法的不同场景。同样重要的是，我们应该根据项目需求决定使用哪种方法，因为有些方法可能对特定项目更方便。

如往常一样，代码样本和相关的测试用例可以在 GitHub 上找到。