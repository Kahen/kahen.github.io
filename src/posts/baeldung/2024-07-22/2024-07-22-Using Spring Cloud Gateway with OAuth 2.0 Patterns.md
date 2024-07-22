---
date: 2022-01-16
category:
  - Spring Cloud Gateway
  - OAuth 2.0
tag:
  - Spring Cloud Gateway
  - OAuth 2.0
head:
  - - meta
    - name: keywords
      content: Spring Cloud Gateway, OAuth 2.0, API Gateway, Security
------
# 使用 Spring Cloud Gateway 实现 OAuth 2.0 模式

## 1. 引言

Spring Cloud Gateway 是一个库，允许我们基于 Spring Boot 快速创建轻量级的 API 网关，我们之前的文章中已经介绍过。

**这次，我们将展示如何在其上快速实现 OAuth 2.0 模式。**

## 2. OAuth 2.0 快速回顾

OAuth 2.0 标准是一个在互联网上广泛使用的标准，作为安全机制，允许用户和应用程序安全地访问资源。

尽管详细描述这个标准超出了本文的范围，但让我们从几个关键术语开始快速回顾：

- **资源**：只能由授权客户端检索的任何类型的信息
- **客户端**：消耗资源的应用程序，通常通过 REST API
- **资源服务器**：负责向授权客户端提供资源的服务
- **资源所有者**：拥有资源的实体（人类或应用程序），最终负责授予客户端访问权限
- **令牌**：客户端获取并作为请求的一部分发送给资源服务器以进行身份验证的信息片段
- **身份提供者 (IdP)**：验证用户凭据并向客户端发放访问令牌
- **认证流程**：客户端必须经历的一系列步骤以获取有效令牌

要全面了解该标准，一个好的起点是 Auth0 关于此主题的文档。

Spring Cloud Gateway 主要用于以下角色之一：

- **OAuth 客户端**
- **OAuth 资源服务器**

让我们更详细地讨论每种情况。

### 3.1. Spring Cloud Gateway 作为 OAuth 2.0 客户端

**在这种情况下，任何未经身份验证的传入请求都将启动授权码流程**。一旦网关获取到令牌，它就会在向后端服务发送请求时使用它：

![img](https://www.baeldung.com/wp-content/uploads/2022/01/oauth2_authorization_flow.png)

这种模式的一个典型例子是社交网络聚合应用程序：对于每个支持的网络，网关将充当 OAuth 2.0 客户端。

结果，前端——通常是一个使用 Angular、React 或类似 UI 框架构建的 SPA 应用程序——可以无缝地代表最终用户访问这些网络上的数据。**更重要的是：它可以做到这一点，而无需让用户向聚合器透露他们的凭据**。

### 3.2. Spring Cloud Gateway 作为 OAuth 2.0 资源服务器

**在这里，网关充当看门人，强制执行每个请求在发送到后端服务之前都必须有一个有效的访问令牌**。此外，它还可以检查令牌是否具有访问给定资源的适当权限，基于相关的范围：

![img](https://www.baeldung.com/wp-content/uploads/2022/01/spring_gateway_resource_server.png)

需要注意的是，这种权限检查主要在粗粒度级别上操作。细粒度访问控制（例如，对象/字段级权限）通常在后端使用领域逻辑实现。

在这种模式中需要考虑的一件事是后端服务如何对任何转发的请求进行身份验证和授权。有两种主要情况：

- **令牌传播**：API 网关将接收到的令牌原样转发到后端
- **令牌替换**：API 网关在发送请求之前用另一个令牌替换传入的令牌

**在本教程中，我们将只涵盖令牌传播案例，因为它是最常见的场景**。第二种情况也是可能的，但需要额外的设置和编码，这会让我们从我们想要展示的主要点上分心。

## 4. 示例项目概述

为了展示如何使用我们迄今为止描述的 OAuth 模式使用 Spring Gateway，让我们构建一个示例项目，该项目公开了一个单一端点：_/quotes/{symbol}_。**访问此端点需要由配置的身份提供者发放的有效访问令牌**。

在我们的例子中，我们将使用嵌入式 Keycloak 身份提供者。唯一需要更改的是添加一个新的客户端应用程序和一些用于测试的用户。

为了让事情更有趣，我们的后端服务将根据与请求相关联的用户返回不同的报价。拥有 gold 角色的用户将获得较低的价格，而其他人则获得常规价格（毕竟生活是不公平的；^））。

我们将通过 Spring Cloud Gateway 来前置此服务，并通过更改几行配置，能够将其角色从 OAuth 客户端切换到资源服务器。

## 5. 项目设置

### 5.1. Keycloak IdP

我们将在本教程中使用的嵌入式 Keycloak 只是一个常规的 SpringBoot 应用程序，我们可以从 GitHub 克隆并使用 Maven 构建：

```
$ git clone https://github.com/Baeldung/spring-security-oauth
$ cd oauth-rest/oauth-authorization/server
$ mvn install
```

注意：此项目目前针对 Java 13+，但也可以与 Java 11 一起构建和运行。我们只需要在 Maven 命令中添加 _-Djava.version=11_。

接下来，我们将替换 _src/main/resources/baeldung-domain.json_ 为此版本。修改后的版本具有原始版本中可用的相同配置，另外还增加了一个客户端应用程序（_quotes-client_），两个用户组（_golden__ 和 _silver_customers_）以及两个角色（_gold_ 和 _silver_）。

我们现在可以使用 _spring-boot:run_ Maven 插件启动服务器：

```
$ mvn spring-boot:run
... many, many log messages omitted
2022-01-16 10:23:20.318
  INFO 8108 --- [           main] c.baeldung.auth.AuthorizationServerApp   : Started AuthorizationServerApp in 23.815 seconds (JVM running for 24.488)
2022-01-16 10:23:20.334
  INFO 8108 --- [           main] c.baeldung.auth.AuthorizationServerApp   : Embedded Keycloak started: http://localhost:8083/auth to use keycloak
```

一旦服务器启动，我们可以通过将浏览器指向 _http://localhost:8083/auth/admin/master/console/#/realms/baeldung_ 来访问它。一旦我们使用管理员凭据（_bael-admin/pass_）登录，我们将获得领域管理屏幕：

![img](https://www.baeldung.com/wp-content/uploads/2022/01/keycloak-baeldung-realm.png)

要完成 IdP 设置，让我们添加几个用户。第一个将是 Maxwell Smart，他是 _golden_customer_ 组的成员。第二个将是 John Snow，我们不会将他添加到任何组。

**使用提供的配置，_golden_customers_ 组的成员将自动承担 _gold_ 角色。**

### 5.2. 后端服务

报价后端需要常规的 Spring Boot Reactive MVC 依赖项，加上资源服务器启动器依赖项：

```
`<dependency>`
    `<groupId>`org.springframework.boot`</groupId>`
    `<artifactId>`spring-boot-starter-oauth2-resource-server`</artifactId>`
`</dependency>`
```

注意，我们故意省略了依赖项的版本。这是使用 SpringBoot 的父 POM 或依赖管理部分中相应的 BOM 时推荐的做法。

在主应用程序类中，我们必须使用 _@EnableWebFluxSecurity_ 启用 Web Flux 安全性：

```
@SpringBootApplication
@EnableWebFluxSecurity
public class QuotesApplication {
    public static void main(String[] args) {
        SpringApplication.run(QuotesApplication.class);
    }
}
```

端点实现使用提供的 _BearerAuthenticationToken_ 来检查当前用户是否具有 _gold_ 角色：

```
@RestController
public class QuoteApi {
    private static final GrantedAuthority GOLD_CUSTOMER = new SimpleGrantedAuthority("gold");

    @GetMapping("/quotes/{symbol}")
    public Mono`<Quote>` getQuote(@PathVariable("symbol") String symbol,
      BearerTokenAuthentication auth ) {

        Quote q = new Quote();
        q.setSymbol(symbol);
        if ( auth.getAuthorities().contains(GOLD_CUSTOMER)) {
            q.setPrice(10.0);
        }
        else {
            q.setPrice(12.0);
        }
        return Mono.just(q);
    }
}
```

现在，Spring 如何获取用户角色呢？毕竟，这不是像 _scopes_ 或 _email_ 这样的标准声明。**实际上，这里没有魔法：我们必须提供一个自定义的 _ReactiveOpaqueTokenIntrospection_，从 Keycloak 返回的自定义字段中提取这些角色**。这个 bean 在线可用，基本上与 Spring 文档中显示的内容相同，只是有一些针对我们自定义字段的微小更改。

我们还必须提供访问我们身份提供者所需的配置属性：

```
spring.security.oauth2.resourceserver.opaquetoken.introspection-uri=http://localhost:8083/auth/realms/baeldung/protocol/openid-connect/token/introspect
spring.security.oauth2.resourceserver.opaquetoken.client-id=quotes-client
spring.security.oauth2.resourceserver.opaquetoken.client-secret=`<CLIENT SECRET>`
```

最后，要运行我们的应用程序，我们可以将其导入 IDE 或从 Maven 运行。项目的 POM 包含一个为此目的的配置文件：

```
$ mv