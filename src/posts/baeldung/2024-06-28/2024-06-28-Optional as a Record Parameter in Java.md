---
date: 2024-06-28
category:
  - Java
  - Optional
tag:
  - Java记录
  - Optional参数
head:
  - - meta
    - name: keywords
      content: Java记录, Optional参数, 数据透明度, 不变性
------
# Java记录和Optional参数的使用及其问题

## 1. 引言

在本教程中，我们将讨论将_Optional_作为记录参数使用的可能性以及为什么这是一个不良实践。

## 2. _Optional_的预期用途

在讨论_Optional_和记录之间的关系之前，让我们快速回顾一下Java中_Optional_的预期用途。

通常，在Java 8之前，我们使用_null_来表示对象的空状态。然而，将_null_作为返回值需要调用者在运行时进行_null_检查验证。如果调用者没有验证，可能会得到一个_NullPointerException_。有时获取异常被用来识别值的缺失。

_Optional_的主要目标是表示一个方法返回值，该返回值表示没有值。与使用_NullPointerException_来识别没有值相比，我们可以使用_Optional_作为返回值。因此，我们知道在编译时返回值是持有某些内容还是空的。

另外，正如Java文档中所述：
> Optional旨在为库方法返回类型提供一种**有限的机制**，其中明显需要表示“无结果”，并且使用_null_很可能会引起错误。

因此，还需要指出_Optional_不打算做什么。在这方面，我们可以强调_Optional_不打算用作任何类的实例字段。

## 3. Java记录的用例

让我们也看看一些关于记录的概念，以便更好地理解将_Optional_作为_记录_参数使用。

记录仅仅是一个数据持有者。当我们想要将数据从一个地方传输到另一个地方时，比如从数据库到我们的应用程序，它非常适合。

让我们解释一下JEP-395：
> 记录是作为**不可变数据的透明载体**的类。

记录的一个关键定义是它们是不可变的。因此，**一旦我们实例化一个记录，其所有数据在整个程序的其余部分中都保持不可修改**。这对于传输数据的对象来说很棒，因为不可变对象不太容易出错。

记录还自动定义了与字段名称相同的访问器方法。因此，通过定义它们，我们得到了与定义字段相同名称的getter。

JDK记录定义还建议记录持有的数据应该是透明的。因此，**如果我们调用访问器方法，我们应该得到有效的数据**。在这种情况下，有效数据意味着真正代表对象状态的值。让我们就此问题解释一下Project Amber：
> 数据类（记录）的API模拟了状态，整个状态，以及仅状态。

不可变性和透明度是维护记录不应该有_Optional_参数的重要定义。

现在我们已经更好地理解了这两个概念，我们将看到为什么我们必须避免将_Optional_作为记录参数使用。

首先，让我们定义一个记录示例：

```java
public record Product(String name, double price, String description) {
}
```

我们为产品定义了一个数据持有者，包括_name, price,_和_description._我们可以想象，数据持有者是由数据库查询或HTTP调用产生的。

现在，假设产品描述有时没有设置。在这种情况下，_description_是可空的。解决这个问题的一种方法是通过将_description_字段包装在一个_Optional_对象中：

```java
public record Product(String name, double price, Optional`<String>` description) {
}
```

尽管上面的代码可以正确编译，**我们破坏了_Product_记录的数据透明度。**

此外**，记录的不可变性使得处理_Optional_实例比处理一个_null_变量更难。**让我们通过一个简单的测试来看看实际操作：

```java
@Test
public void givenRecordCreationWithOptional_thenCreateItProperly() {
    var emptyDescriptionProduct = new Product("television", 1699.99, Optional.empty());
    Assertions.assertEquals("television", emptyDescriptionProduct.name());
    Assertions.assertEquals(1699.99, emptyDescriptionProduct.price());
    Assertions.assertNull(emptyDescriptionProduct.description().orElse(null));
}
```

我们用一些值创建了一个_Product_，并使用生成的getters来断言记录是否正确实例化。

在我们的产品中，我们定义了变量_name_、_price_和_description_。然而，由于_description_是一个_Optional_，我们在检索后不会立即得到一个值。我们需要做一些逻辑来打开它以获取值。换句话说，我们在调用访问器方法后没有得到正确的对象状态。因此，它破坏了Java记录的数据透明度的定义。

我们可能会想，在这种情况下，我们如何处理_null_？好吧，我们可以简单地让它们存在。一个_null_代表对象的空状态，这在这种情况下比一个空的_Optional_实例更有意义。在这些场景中，我们可以通过使用_@Nullable_注解或其他处理_null_的良好实践来通知_Product_类的使用者_description_是可空的。

由于记录字段是不可变的，_description_字段不能被改变。因此，要检索_description_值，我们有一些选项。一种是打开它或使用_orElse()_和_orElseGet()_返回默认值。另一种是盲目使用_get()_，如果没有值就会抛出_NoSuchElementException_。第三种是如果里面没有东西，就使用_orElseThrow()_抛出错误。

**在任何可能的处理方式中，_Optional_都没有意义，因为在任何情况下，我们都是返回_null_或抛出错误**。更简单地让_description_成为一个可空的_String_。

## 5. 结论

在本文中，我们看到了Java记录的定义，并理解了透明度和不可变性的重要性。

我们还研究了_Optional_类的预期用途。更重要的是，**我们讨论了_Optional_不适合用作记录参数**。

如常，你可以在GitHub上找到源代码。