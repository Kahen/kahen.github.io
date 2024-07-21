---
date: 2022-04-01
category:
  - Spring Security
  - OAuth
tag:
  - Spring Security
  - URL配置
  - 安全配置
head:
  - - meta
    - name: keywords
      content: Spring Security, URL配置, 安全配置
------
# Spring Security – 不同URL的配置

如果你正在实施Spring Security（特别是OAuth），一定要看看《学习Spring Security》课程：

**>> 学习Spring**
**安全**

## 1. 概述

在本教程中，我们将探讨如何配置Spring Security以使用不同的安全配置来处理不同的URL模式。

当应用程序需要对某些操作进行更高级别的安全保护，而其他操作则允许所有用户访问时，这将非常有用。

## 2. 设置

让我们开始设置应用程序。

我们需要Web和Security依赖项来创建此服务。让我们首先向`pom.xml`文件中添加以下依赖项：

```xml
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-web``</artifactId>``
``</dependency>``
```

```xml
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-security``</artifactId>``
``</dependency>``
```

## 3. 创建API

我们将创建一个具有两个API的RESTful Web服务：一个产品API和一个客户API。为此，我们将设置两个控制器。

### 3.1. 产品API

让我们创建_ProductController_。它包含一个方法，_getProducts_，返回产品列表：

```java
@RestController("/products")
public class ProductController {

    @GetMapping
    public List`<Product>` getProducts() {
        return new ArrayList<>(Arrays.asList(
          new Product("产品 1", "描述 1", 1.0),
          new Product("产品 2", "描述 2", 2.0)
        ));
    }
}
```

### 3.2. 客户API

类似地，让我们定义_CustomerController_：

```java
@RestController("/customers")
public class CustomerController {

    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable("id") String id) {
        return new Customer("客户 1", "地址 1", "电话 1");
    }
}
```

在典型的Web应用程序中，包括访客用户在内的所有用户都可以获取产品列表。

然而，通过他们的ID获取客户的详细信息似乎只有管理员才能做到。因此，我们将以一种方式定义我们的安全配置，使其能够实现这一点。

## 4. 设置安全配置

当我们将Spring Security添加到项目中时，它将默认禁用对所有API的访问。因此，我们需要配置Spring Security以允许访问API。

让我们创建_SecurityConfiguration_类：

```java
@Configuration
public class SecurityConfiguration {

     @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests(request -> request.requestMatchers(new AntPathRequestMatcher("/products/**"))
                .permitAll())
            .authorizeHttpRequests(request -> request.requestMatchers(new AntPathRequestMatcher("/customers/**"))
                .hasRole("ADMIN")
                .anyRequest()
                .authenticated())
            .httpBasic(Customizer.withDefaults())
            .build();
    }
}
```

在这里，我们创建了一个_SecurityFilterChain_ bean来配置应用程序的安全。

此外，为了准备基本认证，我们需要为我们的应用程序配置用户。

我们将阅读代码的每一部分以更好地理解它。

### 4.1. 允许对产品API的请求

- _authorizeRequests():_ 此方法告诉Spring在授权请求时使用以下规则。
- _antMatchers(“/products/**”):_ 这指定了安全配置适用的URL模式。我们将其与_permitAll()_操作链接。如果请求的路径包含“/products”，则允许其进入控制器。
- 我们可以使用_and()_方法向我们的配置中添加更多规则。

这标志着一条规则链的结束。随后的其他规则也将应用于请求。因此，我们需要确保我们的规则不会相互冲突。一个好的做法是在顶部定义通用规则，在底部定义更具体的规则。

### 4.2. 仅允许管理员访问客户API

现在让我们看看配置的第二部分：

- 要开始新规则，我们可以再次使用_authorizeRequests()_方法。
- _antMatchers(“/customers/**”).hasRole(“ADMIN”):_ 如果URL的路径包含“/customers”，我们将检查发出请求的用户是否具有管理员角色。

如果用户未经过身份验证，这将导致“401 未授权”错误。如果用户没有正确的角色，这将导致“403 禁止”错误。

### 4.3. 默认规则

我们已经添加了匹配特定请求的匹配项。现在我们需要为其余请求定义一些默认行为。

_anyRequest().authenticated()_ – **_anyRequest()_定义了一个规则链，用于任何未匹配前一个规则的请求**。在我们的情况下，只要这些请求经过身份验证，就会通过。

请注意，**配置中只能有一个默认规则，并且它需要在最后**。如果我们在添加默认规则后尝试添加一个规则，我们会得到一个错误——“在anyRequest之后不能配置antMatchers”。

## 5. 测试

让我们使用cURL测试两个API。

### 5.1. 测试产品API

```shell
$ curl -i http://localhost:8080/products
[
  {
    "name": "产品 1",
    "description": "描述 1",
    "price": 1.0
  },
  {
    "name": "产品 2",
    "description": "描述 2",
    "price": 2.0
  }
]
```

我们按预期获得了两个产品作为响应。

### 5.2. 测试客户API

```shell
$ curl -i http://localhost:8080/customers/1
```

响应体为空。

**如果我们检查头部，我们会看到“401 未授权”状态。这是因为只有经过身份验证且具有管理员角色的用户才能访问客户API。**

现在让我们在请求中添加认证信息后再次尝试：

```shell
$ curl -u admin:password -i http://localhost:8080/customers/1
{
  "name": "客户 1",
  "address": "地址 1",
  "phone": "电话 1"
}
```

太好了！我们现在可以访问客户API了。

## 6. 结论

在本教程中，我们学习了如何在Spring Boot应用程序中设置Spring Security。我们还涵盖了使用_antMatchers()_方法配置特定于URL模式的访问。