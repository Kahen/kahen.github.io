---
date: 2022-04-01
category:
  - Java
  - Tutorials
tag:
  - null
  - Java
head:
  - - meta
    - name: keywords
      content: Java null type, null reference, NullPointerException
---
# Java中的null类型是什么？

在Java的世界里，_null_类型无处不在，很难在使用这门语言时不遇到它。在大多数情况下，直观地理解它代表虚无或缺乏某物就足以有效编程。然而，有时我们想要深入挖掘并彻底理解这个话题。

在本教程中，我们将看看_null_类型在底层是如何工作的，以及它与其他类型的关系。

在我们回答关于_null_类型的具体问题之前，我们需要定义什么是类型。这不是一个容易的任务，因为有很多竞争性的定义。对我们来说最有用的定义是值空间的定义。在那个定义中，**类型由它可以持有的可能值的集合来定义**。

假设我们想声明一个_boolean_变量：

```java
boolean valid;
```

我们所做的是声明一个名为“valid”的变量，它将持有两种可能的值之一：_true_或_false_。可能的值集合只有两个元素。如果我们想声明一个_int_变量，可能的值集合会大得多，但仍然清晰定义：从-2^31到2^31-1的每一个可能的数字。

### 3. _null_是什么类型？

_null_是一个特殊的类型，只有一个可能的值。换句话说，可能的值集合只有一个元素。这一特性本身就使得_null_类型非常奇特。通常，变量的整个目的是它们可以假设不同的值。只有一个_null_引用，所以一个_null_类型的变量只能持有那个特定的引用。它除了表明变量存在之外，不会带来任何信息。

有一个特性使得_null_类型可以按照我们使用它的方式使用。**_null_引用可以转换为任何其他引用类型。**这意味着我们可以将其视为一个特殊的字面量，可以是任何非原始型。在实践中，_null_引用扩展了这些类型的有效可能值集合。

这就是为什么我们可以将完全相同的_null_引用分配给完全不同的引用类型变量的原因：

```java
Integer age = null;
List`<String>` names = null;
```

这也解释了为什么我们不能将_null_值分配给原始类型变量，比如_boolean_：

```java
Boolean validReference = null // 这是可以的
boolean validPrimitive = null // 这是不可以的
```

这是因为_null_引用可以转换为引用类型，但不能转换为原始类型。一个_boolean_变量的可能值集合将始终有两个元素。

### 4. _null_作为方法参数

让我们看看两个简单方法，它们都接受一个参数，但类型不同：

```java
void printMe(Integer number) {
  System.out.println(number);
}

void printMe(String string) {
  System.out.println(string);
}
```

由于Java的多态性，我们可以这样调用这些方法：

```java
printMe(6);
printMe("Hello");
```

编译器将理解我们引用的是哪个方法。但是，以下语句将导致编译器错误：

```java
printMe(null); // 不能编译
```

**为什么？因为_null_可以转换为_String_和_Integer——编译器不知道选择哪个方法。**

### 5. _NullPointerException_

正如我们已经看到的，即使_null_在技术上是一个不同的、单独的类型，我们仍然可以将_null_引用分配给引用类型的变量。**如果我们尝试使用该变量的某些属性，就好像它不是_null_一样，我们将得到一个运行时异常——_NullPointerException_。**这是因为_null_引用不是我们引用它的类型，并且没有我们期望它拥有的属性：

```java
String name = null;
name.toLowerCase(); // 将在运行时引起异常
```

在Java 14之前，_NullPointerExceptions_很短，只是简单地说明代码中出现错误的行。如果该行很复杂并且有一系列的调用，那么这些信息就没有那么有用了。然而，从Java 14开始，我们可以依赖所谓的有用的_NullPointerExceptions_。

### 6. 结论

在本文中，我们仔细研究了_null_类型是如何工作的。首先，我们定义了类型，然后我们发现_null_类型是如何适应这个定义的。最后，我们学习了如何将_null_引用转换为任何其他引用类型，使其成为我们所知道和使用的工具。