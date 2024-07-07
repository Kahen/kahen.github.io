---
date: 2023-03-01
category:
  - Kotlin
  - Companion Object
tag:
  - Kotlin
  - Companion Object
  - Static Methods
head:
  - - meta
    - name: keywords
      content: Kotlin, Companion Object, Static Methods
---
# Kotlin中在伴生对象之外访问方法 | Baeldung关于Kotlin

## 1. 引言

在Kotlin中，伴生对象是我们在类内部创建的特殊对象，我们用它来定义静态方法和属性。尽管如此，有时我们可能希望从伴生对象内部访问在伴生对象之外声明的方法或属性。

在本教程中，我们将探索在伴生对象内部访问外部方法的各种方法。

## 2. 使用外部类的引用

要从伴生对象访问外部的方法，我们可以在伴生对象内定义一个对外部类的引用，并使用它来调用所需的方法：

```
class OuterClass {
    companion object {
        val outerClass: OuterClass = OuterClass()
        fun companionMethod(): String {
            return outerClass.outerClassMethod()
        }
    }

    fun outerClassMethod(): String {
        return "这是伴生对象之外的一个方法"
    }
}
```

**在此代码中，我们通过类实例化在伴生对象内定义了对_OuterClass_的引用**。然后我们使用它在_companionMethod()_内部调用_outerClassMethod()_。

让我们验证我们的方法是否正确：

```
@Test
fun `使用外部类引用调用外部方法`() {
    val result = OuterClass.companionMethod()

    assertEquals("这是伴生对象之外的一个方法", result)
}
```

在这里，我们简单地在_OuterClass_上静态调用_companionMethod()_。最后，我们断言_companionMethod()_方法返回了正确的字符串。

## 3. 将外部类引用作为参数传递

我们还可以选择将外部类的实例作为参数传递给我们伴生对象的方法，以访问伴生对象之外的方法。为了更好的设计目的，让我们使用外部类实现的接口。这个接口声明了我们在伴生对象中寻求调用的方法：

```
interface OuterClassInterface {
    fun outerClassMethod(): String
}

class OuterClassWithInterface : OuterClassInterface {
    companion object {
        fun companionMethod(outerClassInterface: OuterClassInterface): String {
            return outerClassInterface.outerClassMethod()
        }
    }

    override fun outerClassMethod(): String {
        return "这是伴生对象之外的一个方法"
    }
}
```

**在此代码中，我们定义了接口_OuterClassInterface_，它声明了_outerClassMethod()_。**接下来，我们在_OuterClassWithInterface_类中实现这个接口，并使用它从_inside_companionMethod()_内部访问该方法。

现在，我们也来测试一下：

```
@Test
fun `使用接口调用外部方法`() {
    val myClass = OuterClassWithInterface()
    val result = OuterClassWithInterface.companionMethod(myClass)

    assertEquals("这是伴生对象之外的一个方法", result)
}
```

在这个测试中，我们创建了_OuterClassWithInterface_类的实例，并将其实例作为参数传递给_companionMethod()_方法。随后，这个方法使用接口调用_outerClassMethod()_方法。

请注意，这种方法与前一种方法不同。**在这种方法中，我们不在伴生对象内部创建外部类的实例**。相反，我们将外部类的引用作为参数传递给伴生对象的方法。

## 4. 使用对象声明或单例类

我们还可以通过使用对象来访问在其他对象上声明的方法。**对象是单例，可以在代码的任何地方访问，无需首先实例化**。因此，通过使用对象，我们可以从我们的伴生对象静态调用该对象中的任何方法：

```
class ClassWithObject {
    companion object {
        fun companionMethod(): String {
            return ObjectClass.outerClassMethod()
        }
    }

    object ObjectClass {
        fun outerClassMethod(): String {
            return "这是伴生对象之外的一个方法"
        }
    }
}
```

**在此代码中，我们的_ClassWithObject_类有一个伴生对象和一个对象_ObjectClass_。**我们的_ObjectClass_定义了一个_outerClassMethod()_方法，我们在伴生对象内部静态访问并调用这个方法。

当然，我们也需要测试这段代码：

```
@Test
fun `使用对象声明调用外部方法`() {
    val result = ClassWithObject.companionMethod()

    assertEquals("这是伴生对象之外的一个方法", result)
}
```

我们可以看到我们只需在_ClassWithObject_类上调用_companionMethod()_。这反过来又从我们的_ObjectClass_对象调用_outerClassMethod()_方法，并返回所需的字符串。

## 5. 使用函数引用

最后，我们可以使用函数引用在伴生对象内访问外部方法。**简而言之，我们将所需方法的引用作为参数传递到伴生对象的方法中**：

```
class ClassWithFunctionReference {
    companion object {
        fun companionMethod(outerClassMethod: () -> String): String {
            return outerClassMethod()
        }
    }

    fun outerClassMethod(): String {
        return "这是伴生对象之外的一个方法"
    }
}
```

在这个例子中，我们的_companionMethod()_方法以_outerClassMethod()_方法的函数引用作为参数。接下来，我们在_companionMethod()_方法内部调用这个函数引用。

**这种方法灵活在于我们可以将任何具有相同签名的函数引用传递给我们伴生对象的方法**。

现在让我们测试这段代码的正确性：

```
@Test
fun `使用函数引用调用外部方法`() {
    val myClass = ClassWithFunctionReference()
    val result = ClassWithFunctionReference.companionMethod(myClass::outerClassMethod)

    assertEquals("这是伴生对象之外的一个方法", result)
}
```

在这个测试中，我们创建了一个_ClassWithFunctionReference_类的实例。接下来，**我们使用这个实例使用双冒号(::)操作符获取对_outerClassMethod()_的引用**。然后我们将这个引用传递给_companionMethod()_方法。最后，我们断言这个伴生方法返回了正确的字符串。

## 6. 结论

在本文中，我们探讨了我们可以从伴生对象内部访问在伴生对象之外声明的方法的多种方式。有些方法在某些场景下可能比其他方法更方便。

例如，通过将函数引用作为参数传递，我们可以重用相同的方法实现与不同的函数。这可以通过消除编写和维护多个类似方法的需要来节省时间和精力。如常，我们应该选择最能满足我们项目需求的方法。

本文中使用的代码可以在GitHub上找到。