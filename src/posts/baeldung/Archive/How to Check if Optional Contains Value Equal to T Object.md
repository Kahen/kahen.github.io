---
date: 2024-06-15
category:
  - Java
  - Optional
tag:
  - Java 8
  - Optional
  - equals
  - get
  - map
---
# 如何检查Optional是否包含等于T对象的值 | Baeldung

## 1. 概述

_Optional_ 是Java 8引入的一个类，属于_java.util_包。它作为一个容器，可能包含也可能不包含一个非空值。_Optional_可以帮助我们更有效地处理_null_值，并避免代码中的_NullPointerException_。

当我们使用_Optional_时，一个常见的任务是检查它是否包含一个等于特定对象的值。在本教程中，我们将探讨执行此检查的各种技术。

## 2. 问题的介绍

首先，让我们澄清等值检查的要求。假设我们有两个对象；一个是类型为_T_的非空_valueOfT_对象，另一个是一个类型为_Optional`<T>`_的_opt_实例。

**如果_opt_为空，它不包含任何值**。也就是说，**里面的值不能与任何目标对象相等，所以检查将总是返回_false_。**相反，如果_opt_存在，我们需要验证_opt_携带的值是否等于_valueOfT_。

简单来说，**我们将执行一个“_opt_存在并且等于_valueOfT_”的检查。**

在本教程中，我们将探索完成此任务的各种方法。为了保持简单，我们将使用_String_作为_T_的示例来演示每种方法。让我们创建两个_String_常量：

```
static final String A_B_C = "a b c";
static final String X_Y_Z = "x y z";
```

我们将在单元测试中使用这些_String_值来展示不同方法的结果。

接下来，让我们深入代码并检查如何实现检查。

## 3. 使用_Optional._ _equals()_

_Optional_类重写了_equals()_方法。**如果两个_Optional_对象都存在，并且它们持有的值相等，该方法返回_true_。**因此，我们可以首先从_valueOfT_创建一个_Optional_实例，然后使用给定的_opt_对象使用_Optional.equals()_进行检查：

```
opt.isPresent() && opt.equals(Optional.of(valueOfT));
```

接下来，让我们检查这种方法是否按预期工作。

首先，让我们看看_opt_的缺失情况：

```
Optional```<String>``` opt = Optional.empty();
assertFalse(opt.isPresent() && opt.equals(Optional.of(A_B_C)));
```

正如我们提到的，**如果_opt_为空，无论_valueOfT_的值是什么，整个检查应该返回_false_。**

接下来，让我们看看当_opt_存在时这种方法是否产生预期的结果：

```
opt = Optional.of(X_Y_Z);
assertFalse(opt.isPresent() && opt.equals(Optional.of(A_B_C)));

opt = Optional.of(A_B_C);
assertTrue(opt.isPresent() && opt.equals(Optional.of(A_B_C)));
```

正如我们所看到的，**这种方法解决了问题，但它创建了一个中间_Optional_对象**。

## 4. 使用_Optional.get()_

检查_opt_中包含的值是否等于_valueOfT_的一个直接方法是**首先使用_Optional.get()_检索_opt_中的值，然后验证它与_valueOfT_的等值性**：

```
opt.isPresent() && opt.get().equals(valueOfT);
```

接下来，让我们按照这种模式使用相同的输入来验证它是否产生正确的结果：

```
Optional```<String>``` opt = Optional.empty();
assertFalse(opt.isPresent() && opt.get().equals(A_B_C));

opt = Optional.of(X_Y_Z);
assertFalse(opt.isPresent() && opt.get().equals(A_B_C));

opt = Optional.of(A_B_C);
assertTrue(opt.isPresent() && opt.get().equals(A_B_C));
```

正如代码所示，**这个解决方案没有创建额外的对象**。

## 5. 使用_Optional.map()_和_Optional.orElse()_

我们期望在“_opt_存在并且等于_valueOfT_”检查后获得一个_boolean_值。因此，我们可以将这个问题视为**将_Optional_对象转换为_boolean_，遵循一定的规则**。

_Optional_类提供了_map()_来将存在的_Optional_转换为携带不同值的另一个_Optional_。

此外，_orElse()_方法如果_Optional_存在，则返回_Optional_实例包装的值。否则，**如果_Optional_为空，_orElse()_返回我们指定的值**。

所以，我们可以结合这两种方法来执行等值检查，并从给定的_Optional_中获得一个_boolean_：

```
opt.map(v -> v.equals(valueOfT)).orElse(false);
```

接下来，让我们看看它是否适用于我们的输入：

```
Optional```<String>``` opt = Optional.empty();
assertFalse(opt.map(A_B_C::equals).orElse(false));

opt = Optional.of(X_Y_Z);
assertFalse(opt.map(A_B_C::equals).orElse(false));

opt = Optional.of(A_B_C);
assertTrue(opt.map(A_B_C::equals).orElse(false));
```

这个解决方案也产生了一个由_Optional_对象_map()_创建的中间对象。然而，它是一个功能性和流畅的方法。

## 6. 结论

在本文中，我们探讨了三种检查_Optional_是否包含等于特定对象值的方法。这些方法允许我们对_Optional_实例执行空安全值比较操作，确保代码的健壮性和无错误。

如常，示例的完整源代码可在GitHub上获得。