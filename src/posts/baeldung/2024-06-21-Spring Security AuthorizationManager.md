---
date: 2024-06-21
category:
  - Spring Security
  - Authorization
tag:
  - Spring Security
  - AuthorizationManager
head:
  - - meta
    - name: keywords
      content: Spring Security, Authorization, AuthorizationManager, 认证, 授权, 安全性
---
# Spring Security 授权管理器

如果你正在开发Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程：

**>> 学习 Spring**
**安全**

## 1. 引言

Spring Security是Spring框架的一个扩展，它使我们能够轻松地将常见的安全实践集成到我们的应用程序中。这包括用户认证和授权、API保护等。

在本教程中，我们将查看Spring Security内部的许多部分之一：_AuthorizationManager_。我们将看到它如何适应更大的Spring Security生态系统，以及它如何帮助保护我们的应用程序的各种用例。

**Spring _AuthorizationManager_是一个接口，允许我们检查经过身份验证的实体是否有权访问受保护的资源。**_AuthorizationManager_实例由Spring Security用于对基于请求的、基于方法的和基于消息的组件做出最终的访问控制决定。

作为背景，Spring Security有一些关键概念，在我们查看_AuthorizationManager_的具体角色之前，了解这些概念很有帮助：

- 实体：任何可以向系统发出请求的实体。例如，这可以是人类用户或远程Web服务。
- 认证：验证实体是他们所说的人的过程。这可以通过用户名/密码、令牌或许多其他方法来完成。
- 授权：验证实体有权访问资源的过程
- 资源：系统提供访问的任何信息——例如，URL或文档
- 权限：通常被称为角色，这是一个逻辑名称，代表实体拥有的权限。一个实体可能有零个或多个被授予的权限。

有了这些概念，我们可以更深入地了解_AuthorizationManager_接口。

### 2.1. 如何使用_AuthorizationManager_

_AuthorizationManager_是一个简单的接口，只包含两个方法：

```
AuthorizationDecision check(Supplier```<Authentication>``` authentication, T object);

void verify(Supplier```<Authentication>``` authentication, T object);
```

两种方法看起来相似，因为它们接受相同的参数：

- _authentication_：一个_Supplier_，提供代表发出请求的实体的_Authentication_对象。
- _object_：被请求的安全对象（将根据请求的性质而变化）

然而，每个方法都有不同的目的。第一个方法返回一个_AuthorizationDecision_，这是一个简单的包装器，包装了一个布尔值，指示实体是否可以访问安全对象。

第二个方法不返回任何内容。**相反，它只是执行授权检查，并在实体未被授权访问安全对象时抛出一个_AccessDeniedException_。**

### 2.2. Spring Security的旧版本

值得注意的是，_AuthorizationManager_接口是在Spring Security 5.0中引入的。在此接口之前，授权的主要方法是通过_AccessDecisionManager_接口。**虽然_AccessDecisionManager_接口仍然存在于Spring Security的最新版本中，但它已被弃用，应该避免使用，而应该使用**_AuthorizationManager_。

## 3. _AuthorizationManager_的实现

Spring提供了几种_AuthorizationManager_接口的实现。在接下来的部分中，我们将看看其中的几个。

### 3.1. _AuthenticatedAuthorizationManager_

我们将看到的第一个实现是_AuthenticatedAuthorizationManager_。简单来说，**这个类仅基于实体是否经过身份验证来返回积极的授权决定**。此外，它支持三种级别的认证：

- 匿名：实体未经过身份验证
- 记住我：实体已通过身份验证并使用记住的凭据
- 完全认证：实体已通过身份验证且不使用记住的凭据

请注意，这是Spring Boot为基于Web的应用程序创建的默认_AuthorizationManager_。默认情况下，所有端点都将允许访问，无论角色或权限如何，只要它来自经过身份验证的实体。

### 3.2. _AuthoritiesAuthorizationManager_

这个实现的工作原理与前一个类似，**除了它可以基于多个权限做出决定**。这更适合于复杂应用程序，其中资源可能需要多个权限才能访问。

考虑一个使用不同角色来管理发布过程的博客系统。创建和保存文章的资源可能对_Author_和_Editor_角色都是可访问的。然而，发布资源仅对_Editor_角色可用。

### 3.3. _AuthorityAuthorizationManager_

这个实现相当直接。**它所有的授权决定都是基于实体是否具有特定角色**。

这个实现适用于简单的应用程序，其中每个资源都需要单一角色或权限。例如，它可以很好地保护一组特定的URL，只允许具有_Administrator_角色的实体访问。

请注意，这个实现将其决策委托给_AuthoritiesAuthorizationManager_的一个实例。这也是Spring在我们自定义_SecurityFilterChain_时调用_hasRole()_或_hasAuthorities()_时使用的实现。

### 3.4. _RequestMatcherDelegatingAuthorizationManager_

这个实现实际上并不做出授权决定。相反，**它根据URL模式委托给另一个实现**，通常是上述管理器类之一。

例如，如果我们有一些对任何人都可用的公共URL，我们可以将这些URL委托给一个总是返回积极授权的无操作实现。然后，我们可以将安全请求委托给一个处理角色检查的_AuthoritiesAuthorizationManager_。

事实上，**这正是我们在向_SecurityFilterChain_添加新的请求匹配器时Spring所做的事情**。每次我们配置一个新的请求匹配器并指定一个或多个所需的角色或权限时，Spring只是创建了这个类的一个新实例以及一个适当的委托。

### 3.5. _ObservationAuthorizationManager_

我们将看到的最后一个实现是_ObservationAuthorizationManager_。这个类只是一个包装器，它包装了另一个实现，并增加了记录与授权决定相关的指标的能力。Spring将在应用程序中有有效的_ObservationRegistry_时自动使用这个实现。

### 3.6. 其他实现

值得一提的是，Spring Security中还存在其他一些实现。它们大多数与用于保护方法的各种Spring Security注释有关：

- _SecuredAuthorizationManager -> @Secured_
- _PreAuthorizeAuthorizationManager -> @PreAuthorize_
- _PostAuthorizeAuthorizationManager -> @PostAuthorize_

**基本上，我们可以使用任何Spring Security注释来保护资源，都有一个相应的_AuthorityManager_实现。**

### 3.7. 使用多个_AuthorizationManagers_

在实践中，我们很少只使用一个_AuthorizationManager_实例。让我们来看一个示例_SecurityFilterChain_ bean：

```
@Bean
SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.authorizeHttpRequests((authorize) ->
            authorize.requestMatchers("/posts/publish/**").hasRole("EDITOR")
            .requestMatchers("/posts/create/**").hasAnyRole("EDITOR", "AUTHOR")
            .anyRequest().permitAll());
    return http.build();
}
```

这个示例使用了五个不同的_AuthorizationManager_实例：

- _hasRole()_调用创建了一个_AuthorityAuthorizationManager_实例，该实例又委托给一个新的_AuthoritiesAuthorizationManager_实例。
- _hasAnyRole()_调用也创建了一个_AuthorityAuthorizationManager_实例，该实例又委托给一个新的_AuthoritiesAuthorizationManager_实例。
- _permitAll()_调用使用了Spring Security提供的静态无操作_AuthorizationManager_，它总是提供积极的授权决定。

附加的请求匹配器及其自己的角色，以及任何基于方法的注释，都会创建额外的_AuthorizationManager_实例。

## 4. 使用自定义_AuthorizationManager_

上述提供的实现对于许多应用程序来说已经足够了。然而，正如Spring中的许多接口一样，完全可以创建自定义_AuthorizationManager_以满足我们的任何需求。

让我们定义一个自定义_AuthorizationManager_：

```
AuthorizationManager``<RequestAuthorizationContext>`` customAuthManager() {
    return new AuthorizationManager``<RequestAuthorizationContext>``() {
        @Override
        public AuthorizationDecision check(Supplier```<Authentication>``` authentication, RequestAuthorizationContext object) {
            // 做出授权决定
        }
    };
}
```

然后，我们将这个实例传递给自定义的_SecurityFilterChain_：

```
SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.authorizeHttpRequests((authorize) ->
            authorize.requestMatchers("/custom/**").access(customAuthManager())
    return http.build();
}
```

在这种情况下，我们使用_RequestAuthorizationContext_做出授权决定。这个类提供了对底层HTTP请求的访问，这意味着我们可以根据诸如cookies、headers等做出决定。我们还可以委托给第三方服务、数据库或缓存等，以做出我们想要的任何类型的授权决定。

## 5. 结论

在本文中，我们仔细研究了Spring Security如何处理授权。我们看到了通用的_AuthorizationManager_接口以及它的两个方法如何做出授权决定。

我们还看到了这种实现的各种版本，以及它们如何在Spring Security框架的各个地方使用。

最后，我们创建了一个简单的自定义实现，可以用于在我们的应用程序中做出我们需要的任何类型的授权决定。

如常，本文的代码示例可在GitHub上找到。