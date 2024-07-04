---
date: 2022-11-01
category:
  - Kotlin
tag:
  - Kotlin
  - Programming
head:
  - - meta
    - name: keywords
      content: Kotlin, while loop, variable assignment
---

# Kotlin中while表达式中的变量赋值 | Baeldung关于Kotlin

## 1. 引言

在Kotlin中，就像在许多其他编程语言中一样，循环是允许代码块重复执行的基本控制结构。while循环特别适用于在某个条件保持为真的情况下执行代码。然而，Kotlin在while循环条件内的变量赋值方面与某些语言不同。与Java等语言不同，在Java中while循环条件内的赋值是常见做法，Kotlin限制了这种行为。

本教程探讨了这一设计选择背后的原理，讨论了它对Kotlin开发人员的影响，并展示了以Kotlin友好的方式实现类似功能的替代方法。

## 2. 理解限制

Kotlin对while循环表达式中赋值的限制是基于语言对清晰度和安全性的强调。Kotlin旨在减少常见编程错误的可能性，例如意外使用赋值(=)而不是等值检查(==)。这种错误可能导致难以追踪和修复的隐蔽错误。

让我们考虑以下Java代码片段，由于while条件中的赋值，它容易出错：

```java
int value;
while ((value = getValue()) != sentinelValue) {
    // 处理value
}
```

如果我们打算比较value和sentinelValue，但不小心使用了单个=而不是==，代码将编译并运行，可能导致意外的行为。**Kotlin通过禁止在预期返回值的表达式中进行赋值，包括while循环条件，引导开发人员采用更安全的编码实践。**

## 3. Kotlin中的替代模式

为了在Kotlin中实现类似于while循环条件中的赋值功能，我们有几种替代方案。这些替代方案符合Kotlin的语言设计原则，并增强了代码的可读性和可维护性。

### 3.1. 在循环外进行简单变量赋值

首先，我们可以在循环外初始化一个变量，并根据条件在循环内重新赋值：

```kotlin
var value: Int = 0
while (value != sentinelValue) {
    // 做一些事情...
    value++
}
```

**这种模式使赋值明确，并将赋值与循环的继续条件分开，符合Kotlin对明确性的强调。**

### 3.2. 使用带有break语句的while循环

有时，我们需要继续执行直到满足某个条件。Kotlin鼓励在循环内明确赋值，并在必要时使用break语句退出循环：

```kotlin
while (true) {
    val value = getValue()
    if (value == sentinelValue) break
    // 处理value
}
```

这种方法强调了将赋值与循环的继续条件分开的明确性。

### 3.3. 使用do-while进行初始化和条件判断

do-while循环提供了另一种选择，**确保在评估退出条件之前至少执行一次循环体：**

```kotlin
do {
    val value = getValue()
    if (value == sentinelValue) break
    // 处理value
} while (true)
```

当需要在循环执行内进行初始化时，这种模式提供了清晰的结构，用于处理此类情况。

## 4. 结论

虽然Kotlin对while循环表达式中的赋值的限制可能最初看起来有限制性，但它反映了语言的整体设计哲学，即优先考虑安全性和清晰度。开发人员可以通过理解这一限制的原理并采用Kotlin的习惯用法来编写更健壮和可读的代码。本文介绍的替代方案，如使用带有break语句的while循环或选择do-while循环，展示了Kotlin的灵活性和有效的循环控制的强大功能。

如常，本文中使用的代码可以在GitHub上找到。我已经完成了翻译，以下是翻译的剩余部分：

---

# Kotlin中while表达式中的变量赋值 | Baeldung关于Kotlin

## 4. 结论

尽管Kotlin在while循环表达式中对赋值的限制可能最初看起来有些限制性，但这实际上反映了该语言的设计哲学，即优先考虑安全性和清晰性。通过理解这一限制背后的原因，并采用Kotlin的惯用模式，开发者可以编写出更加健壮和易于阅读的代码。本文介绍的替代方案，比如使用带有break语句的while循环或者选择do-while循环，展示了Kotlin的灵活性和强大的循环控制特性。

文章中使用的代码可以在GitHub上找到。

![img](https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg)![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://www.baeldung.com/wp-content/uploads/sites/5/2022/11/kotlin_sublogo.png)![img](https://secure.gravatar.com/avatar/e6eb6cf88484314104912372deb68199?s=50&r=g)![img](https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/whiteleaf.svg)

---

OK