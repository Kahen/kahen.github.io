---
date: 2022-04-01
category:
  - Spring Cloud Gateway
  - Rate Limiting
tag:
  - Spring Cloud Gateway
  - Rate Limiting
  - Client IP
head:
  - - meta
    - name: keywords
      content: Spring Cloud Gateway, Rate Limiting, Client IP
---
# Spring Cloud Gateway基于客户端IP的速率限制

## 1. 引言

在这个快速教程中，我们将看到如何基于客户端的实际IP地址限制Spring Cloud Gateway的传入请求速率。

简而言之，我们将在路由上设置_RequestRateLimiter_过滤器，然后**我们将配置网关使用IP地址限制不同客户端的请求**。

## 2. 路由配置

首先，我们需要配置Spring Cloud Gateway对特定路由进行速率限制。为此，我们将使用由_spring-boot-starter-data-redis-reactive_实现的经典令牌桶速率限制器。简而言之，**速率限制器创建一个桶，该桶具有与之关联的键，用于标识自身，并具有固定的初始令牌容量，这些令牌会随时间补充**。然后，对于每个请求，速率限制器检查其相关桶，并在可能的情况下减少一个令牌。否则，它将拒绝传入请求。

由于我们正在使用分布式系统，我们可能希望跟踪跨应用程序所有实例的所有传入请求。因此，拥有一个分布式缓存系统来存储桶的信息是方便的。在这种情况下，我们预先配置了一个Redis实例来模拟现实世界的应用。

接下来，我们将配置一个带有速率限制器的路由。我们将监听_/example_端点，并将请求转发到_http://example.org_：

```java
@Bean
public RouteLocator myRoutes(RouteLocatorBuilder builder) {
    return builder.routes()
        .route("requestratelimiter_route", p -> p
            .path("/example")
            .filters(f -> f.requestRateLimiter(r -> r.setRateLimiter(redisRateLimiter())))
            .uri("http://example.org"))
        .build();
}
```

在上面，我们通过使用_.setRateLimiter()_方法配置了带有_RequestRateLimiter_的路由。特别是，我们通过_redisRatelimiter()_方法定义了_RedisRateLimiter_ bean来管理我们的速率限制器的状态：

```java
@Bean
public RedisRateLimiter redisRateLimiter() {
    return new RedisRateLimiter(1, 1, 1);
}
```

作为示例，我们将速率限制配置为所有_replenishRate_、_burstCapacity_和_requestedToken_属性都设置为1。这使得多次调用_/example_端点并返回HTTP 429响应代码变得容易。

## 3. _KeyResolver_ Bean

为了正确工作，**速率限制器必须通过一个键来识别每个击中端点的客户端**。在底层，该键标识速率限制器将用于为每个请求消耗令牌的桶。因此，我们希望该键对于每个客户端都是唯一的。在这种情况下，我们将使用客户端的IP地址来监控他们的请求，并在他们发出太多请求时限制他们。

因此，我们之前配置的_RequestRateLimiter_将使用一个_KeyResolver_ bean，该bean允许可插拔的策略来派生用于限制请求的键。这意味着**我们可以配置如何从每个请求中提取键**。

## 4. _KeyResolver_中的客户端IP地址

目前，这个接口没有默认实现，所以我们必须定义一个，记住我们想要的是客户端的IP地址：

```java
@Component
public class SimpleClientAddressResolver implements KeyResolver {
    @Override
    public Mono``<String>`` resolve(ServerWebExchange exchange) {
        return Optional.ofNullable(exchange.getRequest().getRemoteAddress())
            .map(InetSocketAddress::getAddress)
            .map(InetAddress::getHostAddress)
            .map(Mono::just)
            .orElse(Mono.empty());
    }
}
```

我们使用_ServerWebExchange_对象来提取客户端的IP地址。如果我们无法获取IP地址，我们将返回_Mono.empty()_以向速率限制器发出信号，并默认拒绝请求。然而，我们可以通过将_.setDenyEmptyKey()_设置为_false_来配置速率限制器，在_KeyResolver_返回空键时允许请求。此外，我们还可以通过向_.setKeyResolver()_方法提供自定义_KeyResolver_实现，为每个不同的路由提供不同的_KeyResolver_：

```java
builder.routes()
    .route("ipaddress_route", p -> p
        .path("/example2")
        .filters(f -> f.requestRateLimiter(r -> r.setRateLimiter(redisRateLimiter())
            .setDenyEmptyKey(false)
            .setKeyResolver(new SimpleClientAddressResolver())))
        .uri("http://example.org"))
.build();
```

### 4.1. 通过代理时的原始IP地址

先前定义的实现适用于Spring Cloud Gateway直接监听客户端请求的情况。然而，如果我们在代理服务器后面部署应用程序，所有的主机地址都将是相同的。因此，速率限制器将看到所有请求都来自同一个客户端，并限制它可以处理的请求数量。

为了解决这个问题，**我们依赖_X-Forwarded-For_头来识别通过代理服务器连接的客户端的原始IP地址**。例如，让我们配置_KeyResolver_以便它可以读取原始IP地址：

```java
@Primary
@Component
public class ProxyClientAddressResolver implements KeyResolver {
    @Override
    public Mono``<String>`` resolve(ServerWebExchange exchange) {
        XForwardedRemoteAddressResolver resolver = XForwardedRemoteAddressResolver.maxTrustedIndex(1);
        InetSocketAddress inetSocketAddress = resolver.resolve(exchange);
        return Mono.just(inetSocketAddress.getAddress().getHostAddress());
    }
}
```

我们将值1传递给_maxTrustedIndex()_，假设我们只有一个代理服务器。否则，必须相应地设置该值。此外，我们用_@Primary_注解这个_KeyResolver_，以使其优先于先前的实现。

## 5. 结论

在本文中，我们配置了基于客户端IP地址的API速率限制器。首先，我们配置了一个带有令牌桶速率限制器的路由。然后，我们探讨了_KeyResolver_如何识别每个请求使用的桶。最后，我们探讨了在直接访问API或在代理后部署时，通过_KeyResolver_分配客户端IP地址的策略。

这些示例的实现可以在GitHub上找到。