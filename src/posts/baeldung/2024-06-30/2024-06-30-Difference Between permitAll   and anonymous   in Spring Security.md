---
date: 2022-04-01
category:
  - Spring Security
tag:
  - permitAll()
  - anonymous()
head:
  - - meta
    - name: keywords
      content: Spring Security, permitAll(), anonymous(), security, web application
---
# Spring Security 中 permitAll() 和 anonymous() 的区别

如果你正在处理 Spring Security（特别是 OAuth）实现，一定要看看《Learn Spring Security》课程。

## 1. 概述

本教程我们将学习 Spring Security 框架中 HttpSecurity 类的 permitAll() 和 anonymous() 方法。Spring Security 框架有助于防止漏洞攻击，并启用 Web 应用程序的认证和授权。利用它，Web 应用程序可以控制对服务器资源的访问，例如 HTML 表单、CSS 文件、JS 文件、Web 服务端点等。它还有助于启用基于角色的访问控制（RBAC）来访问服务器资源。

## 2. 安全需求

在我们继续之前，让我们想象一个电子商务网站，有以下需求：

- 匿名用户和认证用户都可以查看网站上的产品
- 为匿名和认证用户请求创建审计条目
- 匿名用户可以访问用户注册表单，而认证用户则不可以
- 只有认证用户可以查看他们的购物车

## 3. 控制器和 WebSecurity 配置

首先，让我们定义我们的控制器类，它有电子商务网站的端点：

```java
@RestController
public class EcommerceController {
    @GetMapping("/private/showCart")
    public @ResponseBody String showCart() {
        return "Show Cart";
    }

    @GetMapping("/public/showProducts")
    public @ResponseBody String listProducts() {
        return "List Products";
    }

    @GetMapping("/public/registerUser")
    public @ResponseBody String registerUser() {
        return "Register User";
    }
}
```

## 4. HttpSecurity 中的 permitAll() 方法

基本上，在 EcommerceWebSecurityConfig 类中，我们使用 permitAll() 向所有人开放了 /public/showProducts 端点。现在，让我们看看它是否有效：

```java
@WithMockUser(username = "spring", password = "secret")
@Test
public void givenAuthenticatedUser_whenAccessToProductLinePage_thenAllowAccess() throws Exception {
    mockMvc.perform(MockMvcRequestBuilders.get("/public/showProducts"))
      .andExpect(MockMvcResultMatchers.status().isOk())
      .andExpect(MockMvcResultMatchers.content().string("List Products"));
}

@WithAnonymousUser
@Test
public void givenAnonymousUser_whenAccessToProductLinePage_thenAllowAccess() throws Exception {
    mockMvc.perform(MockMvcRequestBuilders.get("/public/showProducts"))
      .andExpect(MockMvcResultMatchers.status().isOk())
      .andExpect(MockMvcResultMatchers.content().string("List Products"));
}
```

正如预期的那样，匿名用户和认证用户都可以访问页面。

## 5. HttpSecurity 中的 anonymous() 方法

在我们开始实现电子商务网站的需求之前，理解 anonymous() 表达式背后的想法很重要。

### 5.1. 实现 AuditInterceptor

Spring Security 在 AnonymousAuthenticationFilter 中填充了匿名用户的 Authentication 对象。这有助于通过电子商务网站上的拦截器审计匿名和注册用户执行的操作。

### 5.2. 拒绝认证用户访问注册用户屏幕

在 EcommerceWebSecurityConfig 类中，通过 anonymous() 表达式，我们确保只有匿名用户可以访问 public/registerUser 端点。而认证用户则不能访问。

## 6. 结论

通过本教程中的示例，我们展示了 permitAll() 和 anonymous() 方法之间的区别。

anonymous() 用于我们有公共内容，应该只对匿名用户开放。相比之下，permitAll() 用于我们想要允许所有用户访问特定 URL，而不考虑他们的认证状态。

最后，示例可以在 GitHub 上找到。