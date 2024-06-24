---
date: 2024-06-24
category:
  - Kotlin
  - Java
tag:
  - Extension Functions
  - Private Fields
head:
  - - meta
    - name: keywords
      content: Kotlin, Java, Extension Functions, Private Fields
---
# 通过 Kotlin 扩展函数访问私有 Java 字段

---

当使用 Kotlin 时，我们有时需要从 Kotlin 扩展函数中访问私有的 Java 字段。

在本教程中，我们将探讨如何从 Kotlin 扩展函数访问私有属性。我们还将看到这所涉及的挑战，以及我们有哪些变通方法来解决这个问题。

在深入之前，我们需要简要回顾一下 Kotlin 的扩展函数 API 以及 Kotlin 如何实现它们。

### 2.1 扩展函数 – API

**扩展函数允许我们给定类或接口添加功能，而无需修改原始实现**。当我们处理外部依赖项中的类时，这些功能特别有用。例如，在 Java 中，如果我们想给 `String` 添加一个 `containsIgnoreCase()` 方法，我们不能直接做到：

```java
public class StringWrapper {
    private final String source;

    public StringWrapper(String source) {
        this.source = source;
    }

    public boolean containsIgnoreCase(String other) {
        if (source == null) {
            return false;
        }

        return source.toLowerCase().contains(other.toLowerCase());
    }

    public String getSource() {
        return source;
    }
}
```

在这里，我们利用了装饰器设计模式。换句话说，我们在不破坏原始接口的情况下为 `String` 添加了功能。我们需要使用这样的模式，因为在 Java 中没有办法修改 `String` 类。然而，在 Kotlin 中，扩展函数可以简洁地完成这项工作：

```kotlin
fun String?.containsIgnoreCase(target: String) : Boolean {
    if (this == null) {
        return false
    }

    return this.lowercase().contains(target.lowercase())
}
```

现在，我们可以直接在任何 `String` 实例上调用 `containsIgnoreCase()`。然而，它带来了一些我们将在接下来讨论的缺点。

### 2.2 扩展函数 – 实现细节

要了解如何从扩展函数访问私有字段，让我们探索 Kotlin 如何实现扩展函数。我们都知道 Kotlin 生成的字节码与 Java 相同。然而，我们通常不能动态地向预编译类添加方法。严格来说，有一些方法可以在 Java 中使用字节码插桩来实现这一点，但这种技术要复杂得多，并不是解决这个问题的自然方式。

那么问题是：Kotlin 如何实现扩展函数？**Kotlin 通过创建一个新的静态函数来实现扩展函数，该函数接受一个调用目标对象作为参数，以及所有声明的参数**。例如，在我们的例子中，反编译的 Java 方法看起来像这样：

```java
/**
 * @param thisString - 它是 'this' 对象，即在原始源代码中调用函数的对象
 * @param target - 这是在源代码中传递给原始函数的参数
 */
public static final boolean containsIgnoreCase(@Nullable String thisString, @NotNull String target) {
    // 这里是实现
}
```

在所有调用 `containsIgnoreCase()` 的地方，编译器将所有调用重定向到这个静态函数。因此，Kotlin 通过生成静态实用函数并将所有适当的调用委托给该函数来实现扩展函数。

## 3. 隐含的限制

这种实现很棒，但带来了一个问题：如果扩展函数编译成一个静态函数，接受目标对象作为参数，我们如何访问私有成员呢？的确，由于扩展函数在字节码中不是扩展对象的函数，它**不能使用目标对象的私有字段或方法。它们对扩展函数是不可见的**。因此，在这方面，扩展函数与对象的其他函数不同。

因此，我们需要问**如何从外部访问类的私有成员**。

通常，我们使用反射来从外部访问私有成员。例如，如果我们想访问 `String` 的私有值成员，那么以下将有效：

```kotlin
fun String?.containsIgnoreCase(target: String) : Boolean {
    if (this == null) {
        return false
    }

    val loadedClass = String::class
    val valueField = loadedClass.java.getDeclaredField("value")
    valueField?.isAccessible = true
    val actualValue = valueField?.get(this) as? ByteArray

    println(actualValue?.contentToString())

    return this.lowercase().contains(target.lowercase())
}
```

这是从扩展函数访问私有字段的唯一方法。具体来说，它更像是一种变通方法，而不是真正的解决方案，因为私有成员通常不能从类外部访问。**因此，最好避免在扩展函数中访问私有成员**。

## 4. 结论

在本文中，我们探讨了 Kotlin 如何实现扩展函数，以及它所隐含的限制。我们还回顾了从扩展函数访问原始对象的私有成员的变通方法。**Java 反射 API 帮助我们解决了这个问题。然而，这是一种变通方法，通常应该避免在类外部访问私有成员**。

如往常一样，本文的源代码可在 GitHub 上找到。