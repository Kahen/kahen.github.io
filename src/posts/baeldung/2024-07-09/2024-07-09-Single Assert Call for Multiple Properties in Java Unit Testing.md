---
date: 2022-04-01
category:
  - Java
  - Unit Testing
tag:
  - JUnit
  - AssertJ
head:
  - - meta
    - name: keywords
      content: Java, Testing, JUnit, AssertJ, Single Assert, Multiple Properties
---
# Java单元测试中单个断言调用多个属性

## 1. 概述

作为程序员，我们经常编写测试以确保我们的代码按预期工作。在测试中的一个标准做法是使用断言。

当我们想要验证一个对象的多个属性时，我们可以编写一堆断言来完成这项工作。

然而，在本教程中，我们将探讨如何在单个断言调用中验证多个属性。

## 2. 问题介绍

在许多情况下，我们需要检查一个对象的多个属性。传统上，这意味着为每个属性编写单独的断言语句，这可能会使代码冗长且难以阅读。

然而，更好的方法是使用单个断言调用来验证多个属性。接下来，让我们看看如何做到这一点。

为了更直观的演示，首先，让我们以一个简单的POJO类为例：

```java
class Product {
    private Long id;
    private String name;
    private String description;
    private boolean onSale;
    private BigDecimal price;
    private int stockQuantity;

    // 省略所有属性的构造函数

    // 省略getter和setter
}
```

_Product_类有六个属性。假设我们已经实现了一个程序来生成一个_Product_实例。通常，我们将生成的_Product_实例与预期对象进行比较，以断言程序是否正常工作，例如`assertEquals(EXPECTED_PRODUCT, myProgram.createProduct())`。

然而，在我们的程序中，_id_和_description_是不可预测的。换句话说，**如果我们能够验证其余四个字段（_name, onSale, price, 和 stockQuantity_）持有预期值，我们就认为程序正确地完成了工作。**

接下来，让我们创建一个_Product_对象作为预期结果：

```java
Product EXPECTED = new Product(42L, "LG Monitor", "32 inches, 4K Resolution, Ideal for programmers", true, new BigDecimal("429.99"), 77);
```

为了简单起见，我们不会真正实现一个创建_Product_对象的方法。相反，让我们简单地创建一个_Product_实例来保存所需的值，因为我们的重点是如何在单个语句中断言这四个属性：

```java
Product TO_BE_TESTED = new Product(-1L, "LG Monitor", "dummy value: whatever", true, new BigDecimal("429.99"), 77);
```

接下来，让我们看看如何组织断言。

## 3. 使用JUnit5的_assertAll()

JUnit是最流行的单元测试框架之一。最新版本，JUnit 5，带来了许多新特性。例如，_assertAll()_就是其中之一。

**JUnit 5的_assertAll()_方法接受一系列断言，并且它们将在单个调用中全部执行。** 进一步来说，如果任何断言失败，测试将失败，并且所有失败都将被报告。

接下来，让我们将属性断言分组到一个单独的_assertAll()_调用中：

```java
assertAll("Verify Product properties",
  () -> assertEquals(EXPECTED.getName(), TO_BE_TESTED.getName()),
  () -> assertEquals(EXPECTED.isOnSale(), TO_BE_TESTED.isOnSale()),
  () -> assertEquals(EXPECTED.getStockQuantity(), TO_BE_TESTED.getStockQuantity()),
  () -> assertEquals(EXPECTED.getPrice(), TO_BE_TESTED.getPrice()));
```

正如我们所看到的，_assertAll()_方法将四个断言分组在一个调用中。值得一提的是，_price_字段的类型是_BigDecimal_。**我们使用_assertEquals()_来验证_BigDecimal_对象的值和比例。**

我们实现了我们的目标。然而，如果我们仔细查看代码，即使在_assertAll()_体内，我们仍然有四个断言，尽管它们是以lambda表达式格式存在的。因此，代码仍然有点冗长。

接下来，让我们看看其他方法，如何在一个调用中断言这四个属性。

## 4. 使用AssertJ的_extracting()_和_containsExactly()

AssertJ是一个强大的Java库，它提供了一个流畅且直观的API，用于在测试中编写断言。它提供了_extracting()_方法，允许我们**只从对象中提取我们所需的属性值。** 提取的值存储在一个列表中。然后，AssertJ提供了其他方法来验证列表。例如，**我们可以使用_containsExactly()_来验证实际组是否恰好包含按顺序给出的给定值，且没有其他内容。**

接下来，让我们组装_extracting()_和_containsExactly()_：

```java
assertThat(TO_BE_TESTED)
  .extracting("name", "onSale", "stockQuantity", "price")
  .containsExactly(EXPECTED.getName(), EXPECTED.isOnSale(), EXPECTED.getStockQuantity(), EXPECTED.getPrice());
```

正如我们所看到的，AssertJ的_extracting()_和_containsExactly()_允许我们编写更简洁和富有表现力的断言。

正如上面的代码所示，将属性名称作为字符串传递给_extracting()_方法非常简单。然而，由于名称是纯字符串，它们可能包含拼写错误。此外，如果我们重命名了属性，测试方法仍然可以编译而没有问题。我们直到运行测试时才会发现问题。此外，可能需要一些时间才能最终找到命名问题。

因此，AssertJ支持传递getter方法引用而不是属性名称到_extracting()_：

```java
assertThat(TO_BE_TESTED)
  .extracting(Product::getName, Product::isOnSale, Product::getStockQuantity, Product::getPrice)
  .containsExactly(EXPECTED.getName(), EXPECTED.isOnSale(), EXPECTED.getStockQuantity(), EXPECTED.getPrice());
```

## 5. 使用AssertJ的_returns()_和_from()

AssertJ提供了丰富的断言集合，以满足各种需求。我们已经学会了使用_extracting()_和_containsExactly()_在一个断言调用中验证多个属性。在我们的示例中，我们将检查四个属性。然而，在现实世界中，我们可能想要验证十个属性。随着待检查属性数量的增加，断言行变得难以阅读。此外，编写如此长的断言行容易出错。

接下来，让我们看看使用AssertJ的_returns()_和_from()_方法的替代方法。使用非常简单：_assertThat(ToBeTestedObject).returns(Expected, from(FunctionToGetTheValue))._

**所以，_returns()_方法验证被测试的对象从给定的函数_FunctionToGetTheValue_返回_Expected_值。**

接下来，让我们将这种方法应用于验证_Product_对象：

```java
assertThat(TO_BE_TESTED)
  .returns(EXPECTED.getName(), from(Product::getName))
  .returns(EXPECTED.isOnSale(), from(Product::isOnSale))
  .returns(EXPECTED.getStockQuantity(), from(Product::getStockQuantity))
  .returns(EXPECTED.getPrice(), from(Product::getPrice));
```

正如我们所看到的，代码流畅且易于阅读。进一步来说，即使我们需要验证许多属性，我们也不会迷失方向。

值得一提的是，AssertJ提供了_doesNotReturn()_方法来验证_from()_结果与预期值不匹配。此外，**我们可以在同一个断言中使用_doesNotReturn()_和_returns()_。**

最后，让我们编写一个一行断言，混合使用_returns()_和_doesNotReturn()_方法：

```java
assertThat(TO_BE_TESTED)
  .returns(EXPECTED.getName(), from(Product::getName))
  .returns(EXPECTED.isOnSale(), from(Product::isOnSale))
  .returns(EXPECTED.getStockQuantity(), from(Product::getStockQuantity))
  .returns(EXPECTED.getPrice(), from(Product::getPrice))
  .doesNotReturn(EXPECTED.getId(), from(Product::getId))
  .doesNotReturn(EXPECTED.getDescription(), from(Product::getDescription));
```

## 6. 结论

使用单个断言调用来测试多个属性提供了许多好处，例如提高可读性，减少错误，更好的可维护性等。

在本文中，我们通过示例学习了三种在单个断言调用中验证多个属性的方法：

- JUnit5 – _assertAll_()
- AssertJ – _extracting()_和_containsExactly_()
- AssertJ – _returns(), doesNotReturn(),_ 和 _from_

像往常一样，文章中呈现的所有代码片段都可以在GitHub上找到。