---
date: 2022-04-01
category:
  - Spring WebFlux
  - Reactive Programming
tag:
  - Mono
  - doOnNext
  - doOnSuccess
head:
  - - meta
    - name: keywords
      content: Spring 5, WebFlux, doOnNext, doOnSuccess, Reactive Programming
---
# Spring 5 WebFlux 中的 Mono 的 doOnNext() 和 doOnSuccess() 比较

在这篇简短的教程中，我们将探索 Spring 5 WebFlux 中的 Mono 对象的各种监听器。我们将比较 doOnNext() 和 doOnSuccess() 方法，并发现尽管它们相似，但对于空的 Mono，它们的行为是不同的。

**Mono 的 doOnNext() 允许我们附加一个监听器，当数据被发出时会被触发。** 在本文的代码示例中，我们将使用 PaymentService 类。在这种情况下，我们只有在 paymentMono 发出数据时，使用 doOnNext() 调用 processPayment 方法：

```java
@Test
void givenAPaymentMono_whenCallingServiceOnNext_thenCallServiceWithPayment() {
    Payment paymentOf100 = new Payment(100);
    Mono````<Payment>```` paymentMono = Mono.just(paymentOf100);

    paymentMono.doOnNext(paymentService::processPayment)
        .block();

    verify(paymentService).processPayment(paymentOf100);
}
```

**然而，一个空的 Mono 不会发出任何数据，doOnNext 也不会被触发。** 因此，如果我们使用 Mono.empty() 重复测试，processPayment 方法就不应该被调用了：

```java
@Test
void givenAnEmptyMono_whenCallingServiceOnNext_thenDoNotCallService() {
    Mono````<Payment>```` emptyMono = Mono.empty();

    emptyMono.doOnNext(paymentService::processPayment)
        .block();

    verify(paymentService, never()).processPayment(any());
}
```

### doOnSuccess

**我们可以使用 doOnSuccess 来附加一个监听器，当 Mono 成功完成时会被触发。** 让我们再次重复测试，但这次使用 doOnSuccess：

```java
@Test
void givenAPaymentMono_whenCallingServiceOnSuccess_thenCallServiceWithPayment() {
    Payment paymentOf100 = new Payment(100);
    Mono````<Payment>```` paymentMono = Mono.just(paymentOf100);

    paymentMono.doOnSuccess(paymentService::processPayment)
        .block();

    verify(paymentService).processPayment(paymentOf100);
}
```

**虽然，我们应该注意到即使没有发出数据，Mono 也被认为是成功完成的。** 因此，对于一个空的 Mono，上述代码将使用 null Payment 调用 processPayment 方法：

```java
Test
void givenAnEmptyMono_whenCallingServiceOnSuccess_thenCallServiceWithNull() {
    Mono````<Payment>```` emptyMono = Mono.empty();

    emptyMono.doOnSuccess(paymentService::processPayment)
        .block();

    verify(paymentService).processPayment(null);
}
```

### 结论

在这篇简短的文章中，我们学习了 Mono 的 doOnNext 和 doOnSuccess 监听器之间的区别。我们看到，如果我们想要对接收到的数据做出反应，可以使用 doOnNext。另一方面，如果我们希望在 Mono 成功完成时调用方法，无论是否发出数据，都应使用 doOnSuccess。

如常，本文的代码可以在 GitHub 上找到。