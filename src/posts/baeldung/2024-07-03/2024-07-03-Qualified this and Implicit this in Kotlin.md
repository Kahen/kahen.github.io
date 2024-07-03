---
date: 2022-11-01
category:
  - Kotlin
  - this 关键字
tag:
  - Kotlin
  - this
head:
  - - meta
    - name: keywords
      content: Kotlin, this 关键字, 显式 this, 隐式 this
---
# Kotlin 中的显式 this 和隐式 this

在 Kotlin 中，我们已经知道关键字 _this_ 指的是我们正在操作的当前对象。

在本文中，我们将讨论与 _this_ 使用相关的两个概念，即隐式 _this_ 和显式 _this_。

## 2. 接收者

this 的接收者是使用 _this_ 时的上下文对象。当我们在 Kotlin 中的函数或方法中使用 _this_ 时，我们指的是对象本身或接收动作的对象：

```kotlin
class Outer {
    fun checkThis() {
        val b = this
        // 其他代码...
    }
}
```

在这个上下文中，this 将引用 Outer 类的一个实例。

如果我们使用像 IntelliJ IDEA 这样的 IDE，那么我们可以通过快速导航到符号声明来轻松找到 this 的接收者。

### 3.1. 访问当前类实例

隐式 this 的最简单用例是我们访问当前实例：

```kotlin
class Outer {
    val a = this
    // ...
    fun checkThis() {
        val b = this
        // ...
        fun checkThisToo(){
            val c = this
        }
    }
}
```

我们使用 this 来引用 Outer 类本身的实例。我们还可以看到，嵌套函数不会影响隐式 this 的接收者。

### 3.2. 访问当前类的成员对象

让我们也看看使用 this 来访问类成员：

```kotlin
class Outer {
    fun printLine() = "成员函数"
    val x = 0
    // ...
    fun checkThis() {
        // ...
        assertEquals(0, this.x)
        assertEquals(0, x)
        // ...
        assertEquals("成员函数", this.printLine())
        assertEquals("成员函数", printLine())
    }
}
```

当我们在 this 上调用成员对象或函数时，我们可以跳过 this 部分。

但是，如果我们有一个同名的非成员对象或函数，请谨慎使用 this，因为在某些情况下，它可能会被调用代替：

```kotlin
val x = 5
fun printLine() = "顶级函数"
// ...
class Outer {
    fun printLine() = "成员函数"
    val x = 0
    // ...
    fun checkThis() {
        // ...
        assertEquals(0, this.x)
        assertEquals(5, x)
        // ...
        assertEquals("成员函数", this.printLine())
        assertEquals("顶级函数", printLine())
    }
}
```

### 3.3. 在扩展函数内部

扩展函数将影响其中包含的 this 的行为。

在 Kotlin 中的扩展函数中的 this 接收者指的是扩展的接收者对象：

```kotlin
class Outer {
    inner class Inner {
        fun Int.foo() {
            // ...
            val y = this
            assertEquals(42, this)
            // ...
            val funLit = fun String.() {
                // ...
                assertEquals("test.funLit()", this)
            }
            // ...
            val increase = fun(x: Int): Int {
                return this + x
            }
        }
    }
}
```

### 3.4. 在 Lambda 表达式内部

如果 lambda 表达式中使用了 this，则接收者是当前上下文，可能是：

- **类**：如果 lambda 在类内定义，隐式 this 引用该类的实例。
- **对象**：如果 lambda 在对象内定义，隐式 this 引用该对象。
- **扩展函数**：如果 lambda 在扩展函数内定义，隐式 this 引用函数的作用域。

```kotlin
class Outer {
    inner class Inner {
        // ...
        fun checkInner() {
            val funInnerLambda = { _: String ->
                val r = this
                assertEquals(Inner::class.java.name, r::class.java.name)
            }
            // ...
            funInnerLambda("test inner lambda")

            val someNumber = 10
            someNumber.run {
                val numberLambda = { _: String ->
                    assertEquals(someNumber, this)
                }
                numberLambda("numberLambda")
            }

            val someObject = object {
                val name = "John"
                val age = 30
            }

            someObject.run {
                // ...
                assertEquals(someObject, this)
                // ...
                val someLambda = { _: String ->
                    assertEquals(someObject, this)
                    assertEquals(30, this.age)
                    assertEquals("John", this.name)
                }

                someLambda("someLambda")
            }
        }
    }
}
```

在 _checkInner()_ 函数内的 lambda 表达式中的第一个 this 将指向 Inner 类的实例。

下面，在 someNumber 对象的 lambda 中的 this 引用 someNumber。同样，在 someObject 对象的 lambda 中的 this 引用 someObject。

同时，在 foo() 扩展函数的 lambda 表达式中的 this 将引用被扩展的 Int 对象。

## 4. 显式 this

在 Kotlin 中，显式 this 指的是使用关键字 _“this@”_ 来标记上下文 _“this”_ 的限定。

通过使用显式 this，我们可以明确指出我们想要访问类本身的属性或方法，而不是来自可能有相同名称的局部变量或其他类。

### 4.1. 访问特定类

通过使用 _this@ClassName_，我们明确指出我们想要访问特定 _ClassName_ 类的上下文：

```kotlin
class Outer {
    inner class Inner {
        fun Int.foo() {
            // ...
            assertEquals(Inner::class.java.name, this@Inner::class.java.name)
            assertEquals(Outer::class.java.name, this@Outer::class.java.name)
            // ...
        }
    }
}
```

### 4.2. 访问特定类的成员

通过使用 _this@Outer_，我们可以在内部类中明确引用外部类的上下文来访问其成员：

```kotlin
class Outer {
    fun foo() : Int = 30
    val x = 0
    // ...
    inner class Inner {
        val x = 1
        // ...
        fun Int.foo() {
            // ...
            assertEquals(1, this@Inner.x)
            assertEquals(0, this@Outer.x)
            assertEquals(30, this@Outer.foo())
            // ...
        }
    }
}
```

### 4.3. 访问特定的扩展函数

我们也可以访问特定的扩展函数与显式 this：

```kotlin
class Outer {
    // ...
    inner class Inner {
        // ...
        fun Int.foo() {
            // ...
            fun Int.bar() {
                // ...
                assertEquals(32, this)
                assertEquals(42, this@foo)
                // ...
                fun Int.baz(){
                    // ...
                    assertEquals(20, this)
                    assertEquals(42, this@foo)
                }
                20.baz()
            }
            32.bar()
        }
    }
}
```

由于扩展函数会影响 this，为了访问特定的上下文，我们必须使用显式 this。

## 6. 结论

在本文中，我们学习了 this 关键字在各种案例中的行为方式。我们还了解了显式 this 的使用。

当对 this 的含义毫无疑问，并且它清楚地指向当前函数或类实例的所有者时，**使用隐式 this**。

同时，**使用显式 this 来避免与参数或其他名为 this 的变量的歧义**，或者明确访问特定的类实例，特别是内部类或 lambda 表达式。

如常，代码示例可以在 GitHub 上找到。