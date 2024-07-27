---
date: 2022-11-01
category:
  - Kotlin
  - Utility Classes
tag:
  - Kotlin
  - Utility Classes
head:
  - - meta
    - name: keywords
      content: Kotlin Utility Classes, Kotlin 工具类, Kotlin 实用类
---
# Kotlin中的实用类

实用类，简称工具类，是通常包含静态方法和常量的类。实用类在封装应用程序的核心功能中扮演着关键角色。这些类不打算被实例化，其主要目的是提供一组可重用的功能性。

在本教程中，我们将学习Kotlin中的实用类是什么，探索它们的重要性，提供代码示例，编写相应的测试，并展示实际用例。

## 2. 为什么实用类很重要？

实用类在软件开发中扮演着至关重要的角色。首先，它们遵循单一责任原则，专注于一组特定的实用功能。这确保了每个实用类都有一个明确定义的目的，有助于整体代码库的清晰度和可维护性。

此外，实用类通常具有静态方法和常量，消除了实例化的需求，这促进了效率。通过在专用类中封装实用功能，我们促进了项目中的关注点分离。这种隔离有助于维护一个干净和模块化的代码结构，使我们更容易管理和增强应用程序逻辑。

## 3. 创建实用类

接下来，我们将学习如何在Kotlin中创建实用类并测试它们。

在Kotlin中，`object`关键字确保我们在运行时只有一个实用类的实例。这个Kotlin特性确保了单例模式，意味着有一个单一的、全局可访问的实例对象，其中放置了任何实用函数。我们将在声明我们的实用类时使用`object`关键字，而不是`class`关键字。

让我们从一个简单的实用类开始，该类计算给定数字的平方：

```kotlin
object MathUtils {
    fun square(number: Int): Int {
        return number * number
    }
}
```

现在，让我们测试我们的`MathUtils`类：

```kotlin
@Test
fun `Should Calculate Square`() {
    assertEquals(25, MathUtils.square(5))
    assertEquals(36, MathUtils.square(6))
}
```

我们可以无需任何额外步骤直接从我们的实用类访问`square()`函数。

### 3.1. 带扩展函数的实用类

同样，Kotlin中的实用类经常包含扩展函数，这是一个功能，允许开发人员在不直接修改其源代码的情况下为现有类增加新功能。

现在，让我们创建一个包含扩展函数的实用类：

```kotlin
object ExtensionUtil {
    fun String.isPalindrome(): Boolean {
        val cleanString = this.replace("\\s".toRegex(), "").toLowerCase()
        return cleanString == cleanString.reversed()
    }
}
```

在这段代码中，`isPalindrome()`函数是`String`类的扩展函数。该函数返回一个`Boolean`值，指示字符串是否是回文。

让我们看看我们的`ExtensionUtil`类的测试：

```kotlin
@Test
fun `Should Check If Palindrome`() {
    assertTrue("radar".isPalindrome())
    assertTrue("A man a plan a canal Panama".isPalindrome())
}
```

我们可以再次直接使用这个函数，唯一的区别是我们必须从`String`实例调用它。

这些扩展函数的可重用性至关重要，因为它允许这些函数在代码的各个部分被访问，体现了DRY（不要重复自己）原则。一旦在实用类中定义，这些扩展函数可以在使用相关类型的任何地方使用，促进了代码实现的效率和一致性。

此外，实用类通过为扩展函数提供控制环境来**促进封装**。这种封装还简化了与特定类型相关的功能的管理和更新。与Kotlin强调的表达性和简洁的代码相一致，这种封装设计确保扩展逻辑分组，**提高项目中代码的可读性和可维护性**。

## 4. Java互操作性和`@JvmStatic`

当我们使用Kotlin并希望我们的代码与Java互操作时，我们可能会遇到需要在实用类中使用`@JvmStatic`注解的场景。**这个注解特别适用于定义我们打算从Java代码调用的Kotlin对象或伴生对象中的方法。**

这里有一个示例来说明`@JvmStatic`的使用：

```kotlin
object Utils {
    @JvmStatic
    fun foo(): Boolean {
        return false
    }
}
```

具体来说，我们来看看如果我们的实用函数没有`@JvmStatic`注解，我们如何从Java调用它：

```java
Utils.INSTANCE.foo();
```

值得注意的是，Kotlin编译器生成了一个名为`INSTANCE`的静态属性来持有单例实用对象。因此，**没有`@JvmStatic`注解，我们不能直接从`Utils`类访问`foo()`函数——我们必须通过实例。**

最后，让我们像使用`@JvmStatic`注解一样从Java调用我们的实用函数：

```java
Utils.foo();
```

**`@JvmStatic`注解在Java字节码中生成了一个适当的静态方法。**这意味着我们可以从`Utils`直接调用`foo()`，无需首先引用实例属性。

如果我们打算同时在Kotlin和Java中使用我们的实用类，那么`@JvmStatic`注解简化了与Java的互操作，并让代码表现得更像典型的Java静态方法。

## 5. 结论

Kotlin中的实用类为封装可重用功能提供了强大的机制，促进了代码组织，并提高了可维护性。通过探索各种示例并编写相应的测试，我们展示了Kotlin开发中实用类的多样性和重要性。

像往常一样，这些示例的完整实现可以在GitHub上找到。