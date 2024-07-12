---
date: 2022-04-01
category:
  - Spring Security
  - Method Security
tag:
  - Spring
  - Security
  - Method Security
head:
  - - meta
    - name: keywords
      content: Spring Security, Method Security, Annotation, EnableMethodSecurity, EnableGlobalMethodSecurity
---
# Spring @EnableMethodSecurity 注解 | Baeldung

如果您正在使用Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程。

**>> 学习Spring**
**安全**

## 1. 概述

使用Spring Security，我们可以为应用程序的方法配置身份验证和授权，例如我们的端点。例如，如果用户在我们的域上有身份验证，我们可以通过对现有方法应用限制来分析他使用应用程序的情况。

使用@EnableGlobalMethodSecurity注解一直是一种标准做法，直到5.6版本，@EnableMethodSecurity引入了一种更灵活的方法安全配置方式。

在本教程中，我们将看到@EnableMethodSecurity如何取代@EnableGlobalMethodSecurity注解。我们还将看到它们之间的区别以及一些代码示例。

## 2. @EnableMethodSecurity与@EnableGlobalMethodSecurity
让我们看看使用@EnableMethodSecurity和@EnableGlobalMethodSecurity时方法授权是如何工作的。

### 2.1. @EnableMethodSecurity
使用@EnableMethodSecurity，我们可以看到Spring Security打算将授权类型转向基于bean的配置。

我们不再有全局配置，而是现在每种类型都有一个。让我们以Jsr250MethodSecurityConfiguration为例：

[代码省略]

### 2.2. @EnableGlobalMethodSecurity
@EnableGlobalMethodSecurity是我们创建安全层并获得方法授权时需要与@EnableWebSecurity一起使用的函数接口。

让我们创建一个示例配置类：

[代码省略]

所有方法安全实现都使用一个MethodInterceptor，在需要授权时触发。在这种情况下，GlobalMethodSecurityConfiguration类是启用全局方法安全的基配置。

[代码省略]

## 3. @EnableMethodSecurity功能
与之前的遗留实现相比，@EnableMethodSecurity带来了一些小的和大的改进。

### 3.1. 小改进
所有授权类型仍然受到支持。例如，它仍然符合JSR-250。但是，我们不再需要在注解中添加prePostEnabled，因为它现在默认为true：

[代码省略]

如果我们想要禁用它，我们需要将prePostEnabled设置为false。

### 3.2. 大改进
GlobalMethodSecurityConfiguration类不再使用。Spring Security用分段配置和AuthorizationManager替换了它，这意味着我们可以在不扩展任何基配置类的情况下定义我们的授权bean。

值得注意的是，AuthorizationManager接口是通用的，可以适应任何对象，尽管标准安全适用于MethodInvocation：

[代码省略]

总的来说，这为我们提供了使用委派的细粒度授权。因此，在实践中，我们为每种类型都有一个AuthorizationManager。当然，我们也可以构建我们自己的。

此外，这也意味着@EnableMethodSecurity不允许像遗留实现中的@AspectJ注解与AspectJ方法拦截器：

[代码省略]

然而，我们仍然拥有完整的AOP支持。例如，让我们看看我们之前讨论过的Jsr250MethodSecurityConfiguration中使用的拦截器：

[代码省略]

所以让我们看看如何创建一个自定义的授权管理器。

假设我们有端点，我们想要应用一个策略。我们只想在用户有访问该策略的权限时授权用户。否则，我们将阻止用户。

作为第一步，我们通过向访问受限策略的字段添加定义我们的用户：

[代码省略]

现在，让我们看看我们的认证层，以定义我们系统中的用户。为此，我们将创建一个自定义UserDetailService。我们将使用内存映射来存储用户：

[代码省略]

一旦用户存在于我们的系统中，我们想要通过检查他是否有权访问某些受限策略来限制他可以访问的信息。

为了演示，我们创建了一个Java注解@Policy，用于在方法上应用，并定义了一个策略枚举：

[代码省略]

让我们创建我们想要应用此策略的服务：

[代码省略]

我们不能使用内置的授权管理器，例如Jsr250AuthorizationManager。它不会知道何时以及如何拦截服务策略检查。所以，让我们定义我们的自定义管理器：

[代码省略]

当服务方法被触发时，我们再次检查用户是否有认证。然后，如果策略是开放的，我们授予访问权限。在限制的情况下，我们检查用户是否有权访问受限策略。

为此，我们需要定义一个MethodInterceptor，它将就位，例如在执行之前，但也可以是之后。所以让我们把它和我们的安全配置类包装在一起：

[代码省略]

我们正在使用AuthorizationManagerBeforeMethodInterceptor。它匹配我们的策略服务模式，并使用自定义授权管理器。

此外，我们还需要让我们的AuthenticationManager了解自定义UserDetailsService。然后，当Spring Security拦截服务方法时，我们可以访问我们的自定义用户并检查用户的策略访问权限。

## 5. 测试
让我们定义一个REST控制器：

[代码省略]

我们将使用Spring Boot Test与我们的应用程序一起模拟方法安全：

[代码省略]

所有响应都应该被授权，除了用户调用他没有访问受限策略的服务的那个响应。

## 6. 结论
在本文中，我们看到了@EnableMethodSecurity的主要功能以及它如何取代@EnableGlobalMethodSecurity。

我们还通过实现流程了解了这些注解之间的区别。然后，我们讨论了@EnableMethodSecurity如何提供更灵活的基于bean的配置。最后，我们了解了如何创建自定义授权管理器和MVC测试。

如往常一样，我们可以在GitHub上找到工作的代码示例。