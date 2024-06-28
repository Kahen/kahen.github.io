---
date: 2022-04-01
category:
  - Java
tag:
  - CompletableFuture
  - 异步编程
head:
  - - meta
    - name: keywords
      content: CompletableFuture, 异步编程, 超时管理
---
# 如何管理CompletableFuture的超时

当我们构建依赖于其他服务的服务时，通常需要处理依赖服务响应过慢的情况。

如果我们使用CompletableFuture来异步管理对我们依赖项的调用，它的超时功能使我们能够为结果设置最大等待时间。如果预期的结果在指定时间内没有到达，我们可以采取行动，例如提供默认值，以防止我们的应用程序陷入漫长的过程。

在本文中，我们将讨论三种不同的CompletableFuture超时管理方式。

设想一个电子商务应用程序，它需要调用外部服务以获取特殊产品优惠。**我们可以使用带有超时设置的CompletableFuture来保持响应性。**如果服务未能及时响应，这可以抛出错误或提供默认值。

例如，在这种情况下，假设我们将向返回PRODUCT_OFFERS的API发出请求。让我们称之为fetchProductData()，我们可以将其包装在CompletableFuture中，以便我们可以处理超时：

```java
private CompletableFuture`<String>` fetchProductData() {
    return CompletableFuture.supplyAsync(() -> {
        try {
            URL url = new URL("http://localhost:8080/api/dummy");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            try (BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
                String inputLine;
                StringBuffer response = new StringBuffer();

                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }

                return response.toString();
            } finally {
                connection.disconnect();
            }
        } catch (IOException e) {
            return "";
        }
    });
}
```

要使用WireMock测试超时，我们可以通过遵循WireMock使用指南轻松配置模拟服务器以进行超时。让我们假设在典型的互联网连接上合理的网页加载时间是1000毫秒，因此我们设置DEFAULT_TIMEOUT为此值：

```java
private static final int DEFAULT_TIMEOUT = 1000; // 1 秒
```

然后，我们将创建一个wireMockServer，它给出PRODUCT_OFFERS的body响应，并设置5000毫秒或5秒的延迟，确保这个值超过DEFAULT_TIMEOUT以确保超时发生：

```java
stubFor(get(urlEqualTo("/api/dummy"))
  .willReturn(aResponse()
    .withFixedDelay(5000) // 必须大于 DEFAULT_TIMEOUT 才能发生超时
    .withBody(PRODUCT_OFFERS)));
```

### 3. 使用 completeOnTimeout()

completeOnTimeout()方法如果在指定时间内任务未完成，则解析CompletableFuture为默认值。

使用此方法，**我们可以设置默认值`<T>`，以便在超时发生时返回**。此方法返回调用此方法的CompletableFuture。

在这个例子中，让我们默认为DEFAULT_PRODUCT：

```java
CompletableFuture```<Integer>``` productDataFuture = fetchProductData();
productDataFuture.completeOnTimeout(DEFAULT_PRODUCT, DEFAULT_TIMEOUT, TimeUnit.MILLISECONDS);
assertEquals(DEFAULT_PRODUCT, productDataFuture.get());
```

如果我们的目标是即使在请求失败或超时期间也保持结果有意义，那么这种方法是适当的。

例如，在电子商务场景中，当展示产品促销时，如果检索特殊促销产品数据失败或超过超时，系统将显示默认产品。

### 4. 使用 orTimeout()

我们可以使用orTimeout()来增强CompletableFuture的超时处理行为，如果未来在特定时间内未完成。

此方法返回应用于此方法的相同CompletableFuture，并且在超时情况下**将抛出TimeoutException**。

然后，为了测试这个方法，我们应该使用assertThrows()来证明异常被引发：

```java
CompletableFuture```<Integer>``` productDataFuture = fetchProductData();
productDataFuture.orTimeout(DEFAULT_TIMEOUT, TimeUnit.MILLISECONDS);
assertThrows(ExecutionException.class, productDataFuture::get);
```

如果我们的优先级是响应性或耗时任务，我们希望在超时发生时提供快速行动，那么这是合适的方法。

然而，需要适当处理这些异常以获得良好的性能，因为这种方法明确抛出异常。

此外，这种方法适用于各种场景，例如管理网络连接、处理IO操作、处理实时数据和管理队列。

### 5. 使用 completeExceptionally()

CompletableFuture类的completeExceptionally()方法允许我们用特定异常异常地完成未来。对结果检索方法的后续调用，如get()和join()，将抛出指定的异常。

如果方法调用导致CompletableFuture过渡到完成状态，则此方法返回true。否则，它返回false。

在这里，我们将使用ScheduledExecutorService，它是Java中用于安排和管理特定时间或延迟执行任务的接口。它提供了在并发环境中安排重复任务、处理超时和管理错误的灵活性：

```java
ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);
//...
CompletableFuture```<Integer>``` productDataFuture = fetchProductData();
executorService.schedule(() -> productDataFuture.completeExceptionally(
  new TimeoutException("Timeout occurred")), DEFAULT_TIMEOUT, TimeUnit.MILLISECONDS);
assertThrows(ExecutionException.class, productDataFuture::get);
```

如果我们需要处理TimeoutException以及其他异常，或者我们想要使其自定义或特定，也许这是合适的方式。我们通常使用这种方法来处理失败的数据验证、致命错误，或者当任务没有默认值时。

### 6. 比较：completeOnTimeout() vs orTimeout() vs completeExceptionally()

通过所有这些方法，我们可以管理和控制CompletableFuture在不同场景下的行为，特别是当处理需要定时和处理超时或错误的异步操作时。

让我们比较completeOnTimeout()、orTimeout()和completeExceptionally()的优缺点：

| 方法 | 优点 | 缺点 |
| --- | --- | --- |
| completeOnTimeout() | 允许替换长时间运行任务的默认结果，如果任务运行时间过长```<br>```避免抛出异常的情况下很有用 | 没有明确标记超时发生 |
| orTimeout() | 当超时发生时明确生成TimeoutException```<br>```可以以特定方式处理超时 | 不提供替换默认结果的选项 |
| completeExceptionally() | 允许用自定义异常明确标记结果```<br>```在指示异步操作失败时很有用 | 比管理超时更通用 |

### 7. 结论

在本文中，我们探讨了CompletableFuture内部异步过程中超时的三种不同响应方式。

在选择我们的方法时，我们应该考虑我们管理长时间运行任务的需求。我们应该在默认值和使用特定异常指示异步操作超时之间做出决定。

如常，完整的源代码可在GitHub上获取。