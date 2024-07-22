---
date: 2022-11-01
category:
  - Kotlin
tag:
  - Data Objects
  - Kotlin
head:
  - - meta
    - name: keywords
      content: Kotlin, Data Objects, Data Classes, Singleton
------
# Kotlin中的数据对象 | Baeldung关于Kotlin

## **1. 引言**

在使用Kotlin时，我们可以访问许多旨在提高我们生产力的特性。其中一项特性是数据类（Data Classes），它会自动生成如_equals()_、_hashCode()_、_toString()_和_copy()_等基本实用函数。然而，当我们在Kotlin中使用对象与封闭层次结构一起工作时，我们会遇到不一致性。我们通常需要编写额外的样板代码来处理这种不一致性。

**为了改善这种情况，在1.9版本中，Kotlin引入了一个名为数据对象的新特性。**让我们深入探讨数据对象是什么以及如何使用它们。

## **2. 什么是数据对象？**

数据对象是解决Kotlin中数据类和常规对象之间不一致性的解决方案。与常规对象不同，**数据对象继承了数据类的便利特性，例如默认实现的_equals()_、_hashCode()_和_toString()_方法。**这些实用方法大大减少了大量样板代码。让我们看一个例子：

```kotlin
class DataObjectsExample {
    data class MyDataClass(val name: String)
    object MyRegularObject
    data object MyDataObject

    fun printObjects() {
        println(MyDataClass("Jon")) // 输出：MyDataClass(name=Jon)
        println(MyRegularObject) // 输出：DataObjects$MyRegularObject@1b6d3586
        println(MyDataObject) // 输出：MyDataObject
    }
}
```

**正如我们所看到的，_MyDataClass_自动生成了_toString()_函数实现，并返回对象的字符串表示。这消除了手动编写这些函数的需要。**

接下来，让我们观察在Kotlin中打印常规对象的结果。我们可以看到字符串表示由类名和对象的哈希组成。这与数据类对象更干净的字符串表示不一致。

在上面的代码片段中，我们声明_MyDataObject_为一个_数据对象_而不是一个常规_对象_。这意味着_MyDataObject_将获得一个可读的_toString()_函数实现，而无需手动覆盖它。这有助于与_数据类_实现保持对称。

## **3. 数据对象和数据类之间的区别**

正如我们所了解的，当我们将一个类标记为_数据类_或将一个对象标记为_数据对象_时，我们将获得一些自动生成的实用函数。然而，有一些微妙的区别。

### **3.1. 数据对象中没有_copy()_函数**

**数据类和数据对象之间的主要区别之一是某些特定函数不会为数据对象自动生成。**其中一个函数是_copy()_函数。数据对象中缺少_copy()_函数的原因在于语言设计决策，使数据对象作为单例。

单例设计模式限制一个类只能有一个实例。根据这一设计理念，允许为这个单一实例创建副本将是一个矛盾，因为它本质上意味着创建另一个实例。

### **3.2. 数据对象中没有_componentN()_函数**

当使用数据类时，我们还可以访问自动生成的_componentN()_函数。我们可以使用这些函数来映射_数据类_的属性，帮助我们解构这些属性。

然而，当我们处理数据对象时，Kotlin不会生成这些_componentN()_函数。**主要原因是数据对象通常不像数据类那样拥有属性**，使得_componentN()_函数变得不必要。

### **3.3. 不允许为_equals()_和_hashCode()_提供自定义实现**

当我们定义一个_数据对象_时，我们基本上是在操作一个单例。这意味着对象只有一个实例。

因此，Kotlin不允许为数据对象覆盖_equals()_和_hashCode()_实用函数，这通常是为了提供区分多个实例的自定义实现。

## **4. 结论**

在Kotlin中引入数据对象是一个重要的步骤，旨在减少与常规对象一起工作时的不一致性。**通过这个特性，我们在创建_数据对象_时可以访问到基本的实用函数，如_toString()_、_equals()_和_hashCode()_。**这类似于我们在创建_数据类_时获得这些便捷的自动生成的实用函数。此外，这在我们处理像_封闭类_和_封闭接口_实现这样的封闭层次结构时特别有用。

如常，代码示例可以在GitHub上找到。