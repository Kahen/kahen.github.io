---
date: 2024-06-16
category:
  - Java
  - Programming
tag:
  - Java 8
  - Optional
  - Functional Programming
---
# 仅当所有Optional变量都可用时执行操作 | Baeldung

介绍

空引用和空值多年来一直困扰着程序员。空引用的发明者Tony Hoare曾称他的发明是一个“价值十亿美元的错误”。特别是Java，一直在与空值和可怕的_NullPointerException_作斗争。

Java 8引入了_Optional_类来解决这一挑战，并确保正确处理空和空结果。在本教程中，我们将探讨仅当所有_Optional_变量都包含值时才执行操作，否则忽略该操作。

假设

本教程演示了使用三个_Optional_变量，但这些概念可以很容易地扩展到处理更多变量。此外，让我们声明这些变量，我们将在本文中使用它们：

```java
var name = Optional.of("Jean-Luc Picard");
var designation = Optional.of("Captain");
var ship = Optional.of("USS Enterprise D");
```

在这种情况下，为了简化，我们定义了_Optional`<String>`_。尽管如此，文章中讨论的原则同样适用于其他引用类型。

使用_isPresent()_

_Optional_提供了一个有用的方法_isPresent()_，用于确定是否包含值。如果存在值则返回true，如果_Optional_为空则返回false。让我们看看实现：

```java
var action = false;
if (name.isPresent() && designation.isPresent() && ship.isPresent()) {
    action = true;
}
Assertions.assertTrue(action);
```

在这个例子中，我们使用_Optional.of()_创建了_Optional_实例。随后，我们在每个实例上使用_isPresent()_，并且仅当所有值都存在时才采取行动。**虽然这种方法非常简单易读，但在处理多个变量时会变得繁琐。**

使用_flatMap()_和_map()

Java 8将函数式编程概念引入了语言。有了像_flatMap()_和_map()_这样的方法，我们现在可以在容器类型中执行操作，例如_Optional_。利用_flatMap()_和_map()_，我们可以有效地检查并在所有值都存在时执行操作。

让我们看看使用这种方法的实现：

```java
var action = name.flatMap(n -> designation.flatMap(d -> ship.map(s -> true)));
Assertions.assertEquals(action, Optional.of(true));
```

在上面的例子中，我们使用_flatMap()_和_map()_链接了各种_Optional_实例。**这些函数设计为短路；如果在链中的任何步骤中不存在值，则操作立即终止，并返回空结果。**

我们可以通过引入另一个测试用例来验证这种行为：

```java
var name = Optional.of("Jean-Luc Picard");
var designation = Optional.of("Captain");
var ship = Optional.empty();
var action = name.flatMap(n -> designation.flatMap(d -> ship.map(s -> true)));
Assertions.assertTrue(action.isEmpty());
```

在这里，我们可以看到_action_变量为空，因为ship没有值。

虽然这种方法很强大，但当需要链接许多值时，它往往会变得更加冗长。

使用_ifPresent()_

或者，**当我们不需要返回值，并且仅在所有值都存在时才执行操作时，我们可以利用_ifPresent()_和lambda表达式**。让我们看看示例代码：

```java
name.ifPresent(n -> designation.ifPresent(d -> ship.ifPresent(s -> System.out.println("Perform action instead!"))));
```

在这种情况下，我们使用_ifPresent()_链接每个_Optional_实例，并仅当所有值都存在时执行操作。

使用_Stream.of()_

Java Streams提供了另一种确保仅在所有值都存在时才执行操作的方法。我们可以使用_Stream.of()_创建一个_Optional_值的流，并使用_allMatch()_方法检查流中的每个元素是否包含值。

让我们看看实现：

```java
var status = false;
var allPresent = Stream.of(name, designation, ship).allMatch(Optional::isPresent);
if (allPresent) {
    // 如果所有值都存在，则执行操作
    status = true;
}
Assertions.assertTrue(status);
```

在这个例子中，**我们使用_allMatch()_和_Optional.isPresent()_来验证流中的所有元素是否存在**。

这提供了一种简洁的方式来执行所需的验证。与其他方法不同，添加更多的可选值不会降低可读性。这使得_Streams_成为处理越来越多的可选值的高可扩展解决方案。

结论

在本教程中，我们探讨了仅当所有可选值都可用时执行操作的不同方法。我们首先检查了简单的_if…else_条件，然后探索了利用函数式编程概念和Streams API的替代技术。最终，最合适的方法取决于手头具体情况的具体背景。

正如往常一样，本文中使用的示例代码可在GitHub上获得。

文章发布后的30天内开放评论。对于超过此日期的任何问题，请使用网站上的联系表单。