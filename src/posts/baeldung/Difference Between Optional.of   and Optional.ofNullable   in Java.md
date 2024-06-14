---
date: 2024-06-15
category:
  - Java
  - Optional
tag:
  - Java
  - Optional.of()
  - Optional.ofNullable()
---
# Java中Optional.of()与Optional.ofNullable()的区别 | Baeldung

## 1. 概述

在Java中，一个引用可能指向内存中的一个对象，也可能不指向任何对象，换句话说，一个引用可以是_null_。因此，这可能导致抛出一个_NullPointerException_。

为了解决这个问题，Java 8引入了_Optional_类。**将一个引用包装在_Optional_中可以让我们更好地表达一个值是否存在的可能性。** 此外，我们可以利用_Optional_类上的多种工具方法，如_isPresent()_，以避免运行时抛出_NullPointerException_。

我们可以使用静态工厂方法_Optional.of()_和_Optional.ofNullable()_来为给定的引用获取一个_Optional_。但是，我们应该使用哪一个呢？在本教程中，我们将探讨这些方法之间的区别，并了解何时使用哪一个。

## 2. _Optional.of()_方法

**当我们确定我们有一个非_null_引用时，我们应该使用_Optional.of()_静态工厂方法。**

假设我们有一个本地_String_变量，我们想从中获取一个_Optional_：

```java
@Test
void givenNonNullReference_whenUsingOptionalOf_thenObtainOptional() {
    String s = "no null here";
    assertThat(Optional.of(s))
      .isNotEmpty()
      .hasValue("no null here");
}
```

从我们的断言中，我们可以看到我们的optional不为空。换句话说，返回一个_Optional_是否有值的工具方法_isPresent()_将返回_true_。

**然而，当我们在_null_引用上使用这个方法时，我们将遇到一个_NullPointerException_。**

```java
@Test
void givenNullReference_whenUsingOptionalOf_thenNullPointerExceptionThrown() {
    String s = null;
    assertThatThrownBy(() -> Optional.of(s))
      .isInstanceOf(NullPointerException.class);
}
```

## 3. _Optional.ofNullable()_方法

我们应该在可能有或可能没有_null_引用时使用_Optional.ofNullable()_静态工厂方法。**因此，我们不会在引用为_null_时遇到_NullPointerException_。** **相反，我们将获得一个空的_Optional_**：

```java
@Test
void givenNullReference_whenUsingOptionalOfNullable_thenObtainOptional() {
    String s = null;
    assertThat(Optional.ofNullable(s)).isEmpty();
}
```

我们自然会问，为什么我们不总是使用_Optional.ofNullable()_而不是_Optional.of()_。

使用_Optional.of()_允许我们通过抛出异常立即停止代码的执行。这发生在我们之前发现的，当我们为一个_null_引用获取_Optional_时。**换句话说，使用_Optional.of()_方法允许我们遵循尽早失败的原则。**

顺便说一下，我们可能会遇到开发者使用这些静态工厂方法作为使用函数式编程的入口点。这是通过使用_Optional_类上使用函数对象作为方法参数的方法实现的，如_map()_。

## 4. 结论

在这篇文章中，我们学习了静态工厂方法_Optional.of()_和_Optional.ofNullable()_之间的主要区别，以及何时使用它们最合适。

我们看到如何利用_Optional_类帮助避免抛出_NullPointerException_。

最后，我们触及了尽早失败的原则，以及遵循这一原则如何影响使用哪个静态工厂方法。

如往常一样，本文中使用的代码示例可在GitHub上找到。