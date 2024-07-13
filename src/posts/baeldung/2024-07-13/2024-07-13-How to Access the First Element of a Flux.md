---
date: 2022-04-01
category:
  - Java
  - WebFlux
tag:
  - Spring
  - Reactive Programming
head:
  - - meta
    - name: keywords
      content: Java, Spring WebFlux, Reactive Programming, Flux
---

# 如何访问Flux的第一个元素

在本教程中，我们将探索使用Spring 5 WebFlux访问Flux的第一个元素的多种方法。

首先，我们将使用API的非阻塞方法，如next()和take()。之后，我们将看到如何使用elementAt()方法，我们需要指定索引来实现相同的目标。

最后，我们将学习API的阻塞方法，并使用blockFirst()来访问flux的第一个元素。

## 2. 测试设置

在本文的代码示例中，我们将使用Payment类，该类只有一个字段，即支付金额：

```java
public class Payment {
    private final int amount;
    // 构造函数和getter
}
```

在测试中，我们将使用名为fluxOfThreePayments的测试帮助方法构建一个支付的flux：

```java
private Flux```````````<Payment>``````````` fluxOfThreePayments() {
    return Flux.just(paymentOf100, new Payment(200), new Payment(300));
}
```

之后，我们将使用Spring Reactor的StepVerifier来测试结果。

## 3. next()

首先，让我们尝试next()方法。这个方法将返回flux的第一个元素，包装在反应式Mono类型中：

```java
@Test
void givenAPaymentFlux_whenUsingNext_thenGetTheFirstPaymentAsMono() {
    Mono```````````<Payment>``````````` firstPayment = fluxOfThreePayments().next();

    StepVerifier.create(firstPayment)
      .expectNext(paymentOf100)
      .verifyComplete();
}
```

另一方面，如果我们在一个空的flux上调用next()，结果将是一个空的Mono。因此，阻塞它将返回null：

```java
@Test
void givenAEmptyFlux_whenUsingNext_thenGetAnEmptyMono() {
    Flux```````````<Payment>``````````` emptyFlux = Flux.empty();

    Mono```````````<Payment>``````````` firstPayment = emptyFlux.next();

    StepVerifier.create(firstPayment)
      .verifyComplete();
}
```

## 4. take()

反应式flux的take()方法等同于Java 8 Streams中的limit()。换句话说，我们可以使用take(1)将flux限制为恰好一个元素，然后以阻塞或非阻塞的方式使用它：

```java
@Test
void givenAPaymentFlux_whenUsingTake_thenGetTheFirstPaymentAsFlux() {
    Flux```````````<Payment>``````````` firstPaymentFlux = fluxOfThreePayments().take(1);

    StepVerifier.create(firstPaymentFlux)
      .expectNext(paymentOf100)
      .verifyComplete();
}
```

类似地，对于一个空的flux，take(1)将返回一个空的flux：

```java
@Test
void givenAEmptyFlux_whenUsingNext_thenGetAnEmptyFlux() {
    Flux```````````<Payment>``````````` emptyFlux = Flux.empty();

    Flux```````````<Payment>``````````` firstPaymentFlux = emptyFlux.take(1);

    StepVerifier.create(firstPaymentFlux)
      .verifyComplete();
}
```

## 5. elementAt()

Flux API还提供了elementAt()方法。我们可以使用elementAt(0)以非阻塞方式获取flux的第一个元素：

```java
@Test
void givenAPaymentFlux_whenUsingElementAt_thenGetTheFirstPaymentAsMono() {
    Mono```````````<Payment>``````````` firstPayment = fluxOfThreePayments().elementAt(0);

    StepVerifier.create(firstPayment)
      .expectNext(paymentOf100)
      .verifyComplete();
}
```

然而，如果作为参数传递的索引大于flux发出的元素数量，将发出错误：

```java
@Test
void givenAEmptyFlux_whenUsingElementAt_thenGetAnEmptyMono() {
    Flux```````````<Payment>``````````` emptyFlux = Flux.empty();

    Mono```````````<Payment>``````````` firstPayment = emptyFlux.elementAt(0);

    StepVerifier.create(firstPayment)
      .expectError(IndexOutOfBoundsException.class);
}
```

## 6. blockFirst()

另外，我们也可以使用方法blockFirst()。尽管如此，正如名称所示，这是一种阻塞方法。因此，如果我们使用blockFirst()，我们将离开反应式世界，我们将失去它所有的好处：

```java
@Test
void givenAPaymentFlux_whenUsingBlockFirst_thenGetTheFirstPayment() {
    Payment firstPayment = fluxOfThreePayments().blockFirst();

    assertThat(firstPayment).isEqualTo(paymentOf100);
}
```

## 7. toStream()

最后，我们可以将flux转换为Java 8流，然后访问第一个元素：

```java
@Test
void givenAPaymentFlux_whenUsingToStream_thenGetTheFirstPaymentAsOptional() {
    Optional```````````<Payment>``````````` firstPayment = fluxOfThreePayments().toStream()
      .findFirst();

    assertThat(firstPayment).contains(paymentOf100);
}
```

但是，如果我们这样做，我们将无法继续使用反应式管道。

## 8. 结论

在本文中，我们讨论了Java反应式流的API。我们看到了访问Flux的第一个元素的多种方法，并了解到如果我们想使用反应式管道，我们应该坚持使用非阻塞解决方案。

如往常一样，本文的代码可以在GitHub上找到。