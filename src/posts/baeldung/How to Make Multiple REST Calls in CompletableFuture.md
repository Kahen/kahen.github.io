---
date: 2024-06-15
category:
  - Java
  - Spring Boot
tag:
  - CompletableFuture
  - REST API
  - 并行处理
---
# 如何在CompletableFuture中进行多个REST调用 | Baeldung

现在，新版的《REST With Spring - "REST With Spring Boot"》终于发布了，当前价格将在6月22日之前有效，之后将永久上涨50美元。

**>获取访问权限**

**现在**

## 1. 引言

在创建软件功能时，日常活动之一是从不同来源检索数据并在响应中聚合。在微服务中，这些来源通常是外部REST API。

在本教程中，我们将使用Java的CompletableFuture高效地从多个外部REST API并行检索数据。

## 2. 为什么在REST调用中使用并行性

让我们想象一个场景，我们需要更新对象中的各个字段，每个字段的值都来自一个外部REST调用。

一个选择是按顺序调用每个API来更新每个字段。

然而，等待一个REST调用完成后再开始另一个会增加我们的服务响应时间。例如，如果我们调用两个每个都需要5秒的API，总时间至少为10秒，因为第二个调用需要等待第一个完成。

相反，我们可以并行调用所有API，这样总时间将是最慢的REST调用的时间。例如，一个调用需要7秒，另一个需要5秒。在这种情况下，我们将等待7秒，因为我们已经并行处理了所有事情，并且必须等待所有结果完成。

**因此，并行性是减少我们的服务响应时间，使它们更具可扩展性并改善用户体验的极好选择。**

## 3. 使用CompletableFuture进行并行处理

Java中的CompletableFuture类是一个方便的工具，用于组合和运行不同的并行任务以及处理单个任务错误。

在接下来的部分中，我们将使用它来为输入列表中的每个对象组合并运行三个REST调用。

### 3.1. 创建演示应用程序

首先定义我们的目标POJO以进行更新：

```java
public class Purchase {
    String orderDescription;
    String paymentDescription;
    String buyerName;
    String orderId;
    String paymentId;
    String userId;

    // 全参构造函数，getter和setter
}
```

Purchase类有三个字段需要更新，每个字段都由不同的REST调用通过ID查询。

首先创建一个类，定义RestTemplate bean和REST调用的域URL：

```java
@Component
public class PurchaseRestCallsAsyncExecutor {
    RestTemplate restTemplate;
    static final String BASE_URL = "https://internal-api.com";

    // 全参构造函数
}
```

现在，让我们定义/orders API调用：

```java
public String getOrderDescription(String orderId) {
    ResponseEntity```<String>``` result = restTemplate.getForEntity(String.format("%s/orders/%s", BASE_URL, orderId),
        String.class);

    return result.getBody();
}
```

然后，让我们定义/payments API调用：

```java
public String getPaymentDescription(String paymentId) {
    ResponseEntity```<String>``` result = restTemplate.getForEntity(String.format("%s/payments/%s", BASE_URL, paymentId),
        String.class);

    return result.getBody();
}
```

最后，我们定义/users API调用：

```java
public String getUserName(String userId) {
    ResponseEntity```<String>``` result = restTemplate.getForEntity(String.format("%s/users/%s", BASE_URL, userId),
        String.class);

    return result.getBody();
}
```

所有三种方法都使用getForEntity()方法进行REST调用，并将结果包装在ResponseEntity对象中。

然后，我们调用getBody()从REST调用中获取响应体。

### 3.2. 使用CompletableFuture进行多个REST调用

现在，让我们创建一个方法来构建并运行一组三个CompletableFuture：

```java
public void updatePurchase(Purchase purchase) {
    CompletableFuture.allOf(
      CompletableFuture.supplyAsync(() -> getOrderDescription(purchase.getOrderId()))
        .thenAccept(purchase::setOrderDescription),
      CompletableFuture.supplyAsync(() -> getPaymentDescription(purchase.getPaymentId()))
        .thenAccept(purchase::setPaymentDescription),
      CompletableFuture.supplyAsync(() -> getUserName(purchase.getUserId()))
        .thenAccept(purchase::setBuyerName)
    ).join();
}
```

我们使用allOf()方法构建我们的CompletableFuture的步骤。每个参数都是一个并行任务，形式是另一个用REST调用及其结果构建的CompletableFuture。

为了构建每个并行任务，我们首先使用supplyAsync()方法提供Supplier，我们将从中检索我们的数据。然后，我们使用thenAccept()来消费supplyAsync()的结果，并将其设置在Purchase类中的相应字段上。

在allOf()的末尾，我们只是构建了到目前为止的任务。没有采取任何行动。

最后，我们在末尾调用join()以并行运行所有任务并收集它们的结果。**由于join()是一个线程阻塞操作，我们只在最后调用它，而不是在每个任务步骤调用。这是为了通过减少线程阻塞来优化应用程序性能。**

由于我们没有为supplyAsync()方法提供一个自定义的ExecutorService，所有任务都在同一个执行器中运行。默认情况下，Java使用ForkJoinPool.commonPool()。

通常，指定一个自定义的ExecutorService到supplyAsync()是一个好习惯，这样我们就有更多的控制权。

### 3.3. 对列表中的每个元素执行多个REST调用

要在我们的集合上应用updatePurchase()方法，我们可以简单地在forEach()循环中调用它：

```java
public void updatePurchases(List`<Purchase>` purchases) {
    purchases.forEach(this::updatePurchase);
}
```

我们的updatePurchases()方法接收一个Purchase列表，并应用先前创建的updatePurchase()方法到每个元素。

每个对updatePurchases()的调用都运行了我们CompletableFuture中定义的三个并行任务。因此，每个购买都有自己的CompletableFuture对象来运行三个并行REST调用。

## 4. 处理错误

在分布式系统中，服务不可用或网络故障是很常见的。这些故障可能发生在我们作为API客户端不知道的外部REST API中。例如，如果应用程序关闭，通过线路发送的请求永远不会完成。

### 4.1. 使用handle()优雅地处理错误

在REST调用执行期间可能会发生异常。例如，如果API服务关闭或我们输入了无效参数，我们会得到错误。

因此，我们可以使用handle()方法单独处理每个REST调用异常：

```java
public ``<U>`` CompletableFuture``<U>`` handle(BiFunction`<? super T, Throwable, ? extends U>` fn)
```

方法参数是一个BiFunction，包含来自上一个任务的结果和异常作为参数。

为了说明，让我们将handle()步骤添加到我们的CompletableFuture的一个步骤中：

```java
public void updatePurchaseHandlingExceptions(Purchase purchase) {
    CompletableFuture.allOf(
        CompletableFuture.supplyAsync(() -> getPaymentDescription(purchase.getPaymentId()))
          .thenAccept(purchase::setPaymentDescription)
          .handle((result, exception) -> {
              if (exception != null) {
                  // 处理异常
                  return null;
              }
              return result;
          })
    ).join();
}
```

在示例中，handle()从由thenAccept()调用的setOrderDescription()获取Void类型。

然后，它在exception中存储thenAccept()动作中抛出的任何错误。因此，我们使用它来检查错误并在if语句中适当地处理它。

最后，如果未抛出异常，handle()返回作为参数传递的值。否则，它返回null。

### 4.2. 处理REST调用超时

当我们使用CompletableFuture时，我们可以指定一个任务超时，类似于我们在REST调用中定义的超时。因此，如果任务在指定的时间内未完成，Java将使用TimeoutException完成任务执行。

要做到这一点，让我们修改我们的CompletableFuture的一个任务来处理超时：

```java
public void updatePurchaseHandlingExceptions(Purchase purchase) {
    CompletableFuture.allOf(
        CompletableFuture.supplyAsync(() -> getOrderDescription(purchase.getOrderId()))
          .thenAccept(purchase::setOrderDescription)
          .orTimeout(5, TimeUnit.SECONDS)
          .handle((result, exception) -> {
              if (exception instanceof TimeoutException) {
                  // 处理异常
                  return null;
              }
              return result;
          })
    ).join();
}
```

我们已经添加了orTimeout()行到我们的CompletableFuture构建器，以在5秒内未完成时突然停止任务执行。

我们还添加了一个if语句在handle()方法中，单独处理TimeoutException。

**向CompletableFuture添加超时保证任务总是完成。这很重要，可以避免线程无限期地挂起，等待可能永远不会完成的操作的结果。** 因此，它减少了长时间处于RUNNING状态的线程数量，并提高了应用程序的健康状况。

## 5. 结论

在分布式系统中工作的一个常见任务是向不同的API进行REST调用，以构建适当的响应。

在本文中，我们已经看到如何使用CompletableFuture为集合中的每个对象构建一组并行REST调用任务。

我们还看到了如何使用handle()方法优雅地处理超时和一般异常。

如常，源代码可在GitHub上获得。