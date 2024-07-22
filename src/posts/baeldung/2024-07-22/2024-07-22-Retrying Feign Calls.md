---
date: 2022-04-01
category:
  - Java
  - Spring
tag:
  - Feign
  - Retry
head:
  - - meta
    - name: keywords
      content: Feign, Retry, REST, ErrorDecoder
------
# 重试 Feign 调用

调用外部服务通过 REST 端点是一个常见的活动，通过像 Feign 这样的库使得这个过程变得非常简单。然而，在这些调用过程中可能会发生很多问题。许多问题都是随机的或暂时的。

在本教程中，我们将学习如何重试失败的调用并使 REST 客户端更具弹性。

## 2. Feign 客户端设置

首先，让我们创建一个简单的 Feign 客户端构建器，我们稍后将通过重试功能对其进行增强。我们将使用 _OkHttpClient_ 作为 HTTP 客户端。此外，我们将使用 _GsonEncoder_ 和 _GsonDecoder_ 对请求和响应进行编码和解码。最后，我们需要指定目标的 URI 和响应类型：

```java
public class ResilientFeignClientBuilder {
    public static ````````<T>```````` T createClient(Class````````<T>```````` type, String uri) {
        return Feign.builder()
          .client(new OkHttpClient())
          .encoder(new GsonEncoder())
          .decoder(new GsonDecoder())
          .target(type, uri);
    }
}
```

另外，如果我们使用 Spring，我们可以让它自动注入可用的 Feign 客户端。

## 3. Feign _Retryer_

幸运的是，Feign 内置了重试功能，只需要进行配置即可。**我们可以通过向客户端构建器提供 _Retryer_ 接口的实现来实现这一点。**

它最重要的方法 _continueOrPropagate_ 接受 _RetryableException_ 作为参数并返回空。在执行时，它要么抛出异常，要么成功退出（通常在休眠后）。**如果它没有抛出异常，Feign 将继续重试调用。** 如果抛出异常，它将被传播，并将有效地以错误结束调用。

### 3.1. 简单实现

让我们编写一个非常简单的 Retryer 实现，它将在等待一秒钟后始终重试调用：

```java
public class NaiveRetryer implements feign.Retryer {
    @Override
    public void continueOrPropagate(RetryableException e) {
        try {
            Thread.sleep(1000L);
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw e;
        }
    }
}

```

因为 _Retryer_ 实现了 _Cloneable_ 接口，我们还需要重写 _clone_ 方法。

```java
@Override
public Retryer clone() {
    return new NaiveRetryer();
}

```

最后，我们需要将我们的实现添加到客户端构建器中：

```java
public static ````````<T>```````` T createClient(Class````````<T>```````` type, String uri) {
    return Feign.builder()
      // ...
      .retryer(new NaiveRetryer())
      // ...
}
```

另外，如果我们使用 Spring，我们可以将 _NaiveRetryer_ 注解为 _@Component_ 注解或在配置类中定义一个 bean，并让 Spring 完成其余的工作：

```java
@Bean
public Retryer retryer() {
    return new NaiveRetryer();
}
```

### 3.2. 默认实现

Feign 提供了一个合理的 _Retryer_ 接口的默认实现。**它只会重试给定次数，将从某个时间间隔开始，然后每次重试都会增加这个间隔，直到提供的最大值。** 让我们定义一个开始间隔为 100 毫秒，最大间隔为 3 秒，最大尝试次数为 5 的实现：

```java
public static ````````<T>```````` T createClient(Class````````<T>```````` type, String uri) {
    return Feign.builder()
// ...
      .retryer(new Retryer.Default(100L, TimeUnit.SECONDS.toMillis(3L), 5))
// ...
}
```

### 3.3. 不重试

如果我们不希望 Feign 重试任何调用，我们可以向客户端构建器提供 _Retryer.NEVER_RETRY_ 实现。它将简单地每次都传播异常。

## 4. 创建可重试异常

在前一节中，我们学会了如何控制我们重试调用的频率。现在让我们看看如何控制我们何时想要重试调用以及何时只想抛出异常。

### 4.1. _ErrorDecoder_ 和 _RetryableException_

当我们收到错误响应时，Feign 会将其传递给 _ErrorDecoder_ 接口的一个实例，该实例决定如何处理它。最重要的是，解码器可以将异常映射到 _RetryableException_ 的一个实例，从而使 _Retryer_ 可以重试调用。**默认的 _ErrorDecoder_ 实现仅在响应包含“Retry-After”头时才创建 _RetryableExeception_ 实例。** 最常见的是，在 503 服务不可用响应中找到它。

这是一个很好的默认行为，但有时我们需要更灵活。例如，我们可能正在与一个偶尔随机响应 500 内部服务器错误的外部服务通信，我们无法修复它。我们能做的是重试调用，因为我们知道下次它可能会工作。为了实现这一点，我们需要编写一个自定义的 _ErrorDecoder_ 实现。

### 4.2. 创建自定义错误解码器

在我们的自定义解码器中，我们只需要实现一个方法：_decode_。它接受两个参数，一个 _String_ 方法键和一个 _Response_ 对象。它返回一个异常，应该是 _RetryableException_ 的一个实例或其他异常，这取决于实现。

我们的 _decode_ 方法将简单地检查响应的状态码是否大于或等于 500。如果是这样，它将创建 _RetryableException_。如果不是，它将返回使用 _FeignException_ 类的 _errorStatus_ 工厂函数创建的基本 _FeignException_：

```java
public class Custom5xxErrorDecoder implements ErrorDecoder {
    @Override
    public Exception decode(String methodKey, Response response) {
        FeignException exception = feign.FeignException.errorStatus(methodKey, response);
        int status = response.status();
        if (status >= 500) {
            return new RetryableException(
              response.status(),
              exception.getMessage(),
              response.request().httpMethod(),
              exception,
              50L, // 重试间隔
              response.request());
        }
        return exception;
    }
}
```

注意，在这种情况下，我们创建并返回异常，而不是抛出它。

最后，我们需要将我们的解码器插入到客户端构建器中：

```java
public static ````````<T>```````` T createClient(Class````````<T>```````` type, String uri) {
    return Feign.builder()
      // ...
      .errorDecoder(new Custom5xxErrorDecoder())
      // ...
}
```

## 5. 总结

在本文中，我们学习了如何控制 Feign 库的重试逻辑。我们研究了 _Retryer_ 接口以及如何使用它来操作重试时间和重试次数。然后我们创建了我们的 _ErrorDecoder_ 来控制哪些响应需要重试。

如常，所有代码示例都可以在 GitHub 上找到。