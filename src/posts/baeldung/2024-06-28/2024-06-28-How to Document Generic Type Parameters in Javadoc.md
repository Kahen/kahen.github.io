---
date: 2023-11-01
category:
  - Java
tag:
  - JavaDoc
  - Generics
head:
  - - meta
    - name: keywords
      content: JavaDoc, Generics, Java
---
# 如何在Javadoc中记录泛型类型参数

泛型在Java中提供了灵活性，它允许在定义类、构造器、接口或方法时将类型作为参数。@param 标签是编写Java文档时记录泛型类型参数的标准标签。

在本教程中，我们将探讨使用@param 标签记录Java中泛型类型参数的最佳实践。

## @param 标签

@param 标签是记录公共方法、构造器、类等的参数和泛型类型参数的标准标签。

一个良好的Javadoc注释必须正确描述方法参数，以便易于理解。以下是基本语法：

```java
/**
 * @param [参数名称] [参数描述]
 */
```

语法以@param 标签开始，后面是方法或构造器签名中的参数名称的占位符。最后，我们有一个占位符来描述参数的目的。

对于泛型类型，语法有轻微的变化：

```java
/**
 * @param [`<参数类型>`] [参数类型描述]
 */
```

参数类型必须放在尖括号内。然后，我们描述类型参数。

## 使用带泛型类型的@param 标签

让我们看一个使用带泛型类型参数的@param 的示例代码：

```java
/**
 *
 * @param ```````<T>``````` 第一个值的类型。
 * @param `````<S>````` 第二个值的类型。
 */
class Pair`<T, S>` {
    public T first;
    public S second;
    Pair(T a, S b) {
        first = a;
        second = b;
    }
}
```

在这里，我们创建了一个名为_Pair_的新泛型类，并为类定义了两种类型。接下来，我们使用带有类型参数的@param 标签，然后描述它。

**值得注意的是，当记录泛型类时，类型参数必须放在尖括号内。**

这是生成的Javadoc：

![img](https://www.baeldung.com/wp-content/uploads/2023/11/javadoc_comment_for_generic_type_parameter.png)

此外，让我们编写Javadoc注释来描述构造器参数：

```java
/**
 * 用指定的值构造一个新的Pair对象。
 *
 * @param a 第一个值。
 * @param b 第二个值。
 */
Pair(T a, S b) {
    first = a;
    second = b;
}
```

在上面的代码中，我们使用@param 标签描述构造器参数。与泛型类型参数不同，参数名称不在尖括号内。这在编写Javadoc注释时区分了类型参数和普通参数。

## 可能的错误

在为泛型类型生成Javadoc时可能会出现错误。**首先，忘记在Javadoc注释的开头添加@param 标签会生成未知标签错误**：

```java
/**
 * ```````<T>``````` 第一个值的类型。
 * @param `````<S>````` 第二个值的类型。
 */
```

上述Javadoc注释由于第一句缺少@param 标签而生成错误消息：

```java
error: unknown tag: T * ```````<T>``````` The type of the first value in the pair
```

**接下来，当我们在描述中引入相同或另一种类型的参数时，可能会发生错误**：

```java
/**
 * @param ```````<T>``````` Pair`````<T,S>`````中第一个值的类型。
 * @param `````<S>````` Pair`````<T,S>`````中第二个值的类型。
 */
```

在这里，我们在描述中指定了泛型类名。然而，Javadoc生成器将描述中的标签视为HTML标签。它还期望一个闭合标签。

这是错误消息：

```java
error: malformed HTML * @param ```````<T>``````` The type of the first value in the Pair`````<T,S>`````
```

让我们通过转义尖括号来解决这个错误：

```java
/**
 * @param ```````<T>``````` Pair&lt;T,S&gt;中第一个值的类型。
 * @param `````<S>````` Pair&lt;T,S&gt;中第二个值的类型。
 */
```

在这里，尖括号“`<”和“>`”分别被转义为“&lt;”和“&gt;”，以避免HTML解析错误。

或者，我们可以通过在描述中使用@code 标签来解决这个错误：

```java
/**
 * @param ```````<T>``````` {@code Pair`````<T,S>`````}中第一个值的类型。
 * @param `````<S>````` {@code Pair`````<T,S>`````}中第二个值的类型。
 */
```

使用@code 标签看起来更干净，更适合这个用例。

## 结论

在本文中，我们学习了如何使用@param 标签记录泛型类型参数。此外，我们还看到了可能遇到的错误以及如何解决它们。

如常，示例的完整源代码可在GitHub上找到。