---
date: 2024-06-27
category:
  - Java
  - 编程
tag:
  - Stream API
  - NoSuchElementException
head:
  - - meta
    - name: keywords
      content: Java, Stream API, NoSuchElementException, 异常处理
---
# 如何在使用Stream API时避免NoSuchElementException异常

在这篇简短的教程中，我们将解释在使用Stream API时如何避免NoSuchElementException异常。

首先，我们将解释异常的主要原因。然后，我们将通过实际示例展示如何重现并修复它。

## 2. 异常的原因
在深入细节之前，让我们先了解这个异常的含义。

**简而言之，NoSuchElementException是在请求的元素不存在时抛出的信号**。例如，尝试访问不可用或不存在的元素将导致此异常。

通常，在Stream API中使用时，调用空Optional实例上的get()法是最常见的原因之一。

## 3. 产生异常
现在我们知道了异常是什么，让我们深入了解如何在实践中重现它。

例如，让我们创建一个名字列表并使用Stream API进行过滤：

```java
@Test(expected = NoSuchElementException.class)
public void givenEmptyOptional_whenCallingGetMethod_thenThrowNoSuchElementException() {
    List````````<String>```````` names = List.of("William", "Amelia", "Albert", "Philip");
    Optional````````<String>```````` emptyOptional = names.stream()
      .filter(name -> name.equals("Emma"))
      .findFirst();

    emptyOptional.get();
}
```

如我们所见，我们使用filter()方法查找名字"Emma"。此外，我们使用findFirst()方法链接，以获取包含第一个找到的元素的Optional，或者如果过滤后的流为空，则获取一个空的Optional。

在这里，我们的列表不包含名字"Emma"，因此findFirst()返回一个空的Optional。**测试用例因NoSuchElementException异常而失败，因为我们正在尝试获取一个不存在的名字，而空的Optional不包含任何值**。

## 4. 避免异常
现在，让我们看看如何修复异常。最简单的方法是在调用get()方法之前检查我们的Optional实例中是否有值。

幸运的是，Stream API提供了isPresent()方法，专门用于此目的。让我们看看它的实际应用：

```java
@Test
public void givenEmptyOptional_whenUsingIsPresentMethod_thenReturnDefault() {
    List````````<String>```````` names = List.of("Tyler", "Amelia", "James", "Emma");
    Optional````````<String>```````` emptyOptional = names.stream()
      .filter(name -> name.equals("Lucas"))
      .findFirst();

    String name = "unknown";
    if (emptyOptional.isPresent()) {
        name = emptyOptional.get();
    }

    assertEquals("unknown", name);
}
```

**在这里，我们使用isPresent()确保在调用get()方法之前Optional实例中有值**。这样，我们避免了NoSuchElementException异常。

请注意，使用isPresent()的使用伴随着if-else语句的成本。那么，我们能做得更好吗？是的！

通常，最好的方法是使用orElse()方法。**简而言之，如果存在值，则此方法返回该值，否则返回给定的回退参数**：

```java
@Test
public void givenEmptyOptional_whenUsingOrElseMethod_thenReturnDefault() {
    List````````<String>```````` names = List.of("Nicholas", "Justin", "James");
    Optional````````<String>```````` emptyOptional = names.stream()
      .filter(name -> name.equals("Lucas"))
      .findFirst();

    String name = emptyOptional.orElse("unknown");

    assertEquals("unknown", name);
}
```

如上所示，这种方法提供了一种更便捷、更直接的方式来避免NoSuchElementException。

或者，我们可以使用orElseGet()方法来实现相同的结果：

```java
@Test
public void givenEmptyOptional_whenUsingOrElseGetMethod_thenReturnDefault() {
    List````````<String>```````` names = List.of("Thomas", "Catherine", "David", "Olivia");
    Optional````````<String>```````` emptyOptional = names.stream()
      .filter(name -> name.equals("Liam"))
      .findFirst();

    String name = emptyOptional.orElseGet(() -> "unknown");

    assertEquals("unknown", name);
}
```

与orElse()不同，orElseGet()接受一个供应商作为参数。**另一个关键区别是orElse()在所有情况下都执行，即使Optional实例有值。然而，orElseGet()仅在Optional值不存在时执行**。

请注意，我们关于orElse()和orElseGet()方法之间区别的文章很好地涵盖了这个话题。

## 5. 避免NoSuchElementException的最佳实践
简而言之，在使用Stream API避免NoSuchElementException异常时，有几个关键点需要注意：

- 在调用get()方法之前，始终检查返回的流/可选是否不为空。
- 尝试使用orElse()或orElseGet()定义回退值。
- 在调用流的任何终端操作之前使用过滤器。

## 6. 结论
在这篇短文中，我们探讨了在使用Stream API时避免NoSuchElementException异常的不同方法。

在此过程中，我们说明了如何重现异常以及如何使用实际示例来避免它。

如往常一样，示例的完整源代码可在GitHub上找到。