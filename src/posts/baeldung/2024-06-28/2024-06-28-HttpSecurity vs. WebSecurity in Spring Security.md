---
date: 2022-04-01
category:
  - Spring Security
  - OAuth
tag:
  - HttpSecurity
  - WebSecurity
head:
  - - meta
    - name: keywords
      content: Spring Security, HttpSecurity, WebSecurity, Security, Java
---
# Spring Security中的HttpSecurity与WebSecurity | Baeldung

如果你正在处理Spring Security（尤其是OAuth）的实现，一定要看看《学习Spring Security》课程。

## 1. 概览
Spring Security框架提供了_WebSecurity_和_HttpSecurity_类，以提供对API和资源的全局和资源特定的访问限制机制。_WebSecurity_类有助于在全局级别配置安全性，而_HttpSecurity_提供了为特定资源配置安全性的方法。

在本教程中，我们将详细查看_HttpSecurity_和_WebSecurity_的关键用途。我们还将看到这两个类之间的区别。

_HttpSecurity_类有助于为特定的HTTP请求配置安全性。
它还允许使用_requestMatcher()_方法将安全配置限制为特定的HTTP端点。
此外，它提供了灵活性，以配置特定HTTP请求的授权。我们可以使用_hasRole()_方法创建基于角色的认证。

以下是使用_HttpSecurity_类的示例代码，以限制对“/admin/**”的访问：

```
@Bean
SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.authorizeHttpRequests((authorize) -> authorize.requestMatchers("/admin/**")
      .authenticated()
      .anyRequest()
      .permitAll())
      .formLogin(withDefaults());
    return http.build();
}
```

在上面的代码中，我们使用_HttpSecurity_类来限制对“/admin/**”端点的访问。任何对该端点的请求都需要在授予访问权限之前进行身份验证。

此外，《HttpSecurity》类提供了一种方法，用于为受限端点配置授权。让我们修改我们的示例代码，以允许只有管理员角色的用户访问“/admin/**”端点：

```
// ...
http.authorizeHttpRequests((authorize) -> authorize.requestMatchers("/admin/**").hasRole("ADMIN")
// ...
```

在这里，我们通过允许只有“ADMIN”角色的用户访问端点，为请求提供了更多的安全层。

此外，《HttpSecurity》类还有助于在Spring Security中配置CORS和CSRF保护。

## 3. _WebSecurity_
_WebSecurity_类有助于在Spring应用程序中全局配置安全性。我们可以通过暴露_WebSecurityCustomizer_ bean来自定义_WebSecurity_。

与_HttpSecurity_类不同，后者有助于为特定的URL模式或单个资源配置安全规则，《WebSecurity_配置适用于所有请求和资源。

此外，它提供了调试Spring Security过滤器的方法，忽略某些请求和资源的安全检查，或为Spring应用程序配置防火墙。

### 3.1. _ignoring()_ 方法
此外，《WebSecurity_类提供了一个名为_ignoring()_的方法。_ignoring()_方法有助于Spring Security忽略一个_RequestMatcher_的实例。建议只为静态资源注册请求。

以下是使用_ignoring()_方法在Spring应用程序中忽略静态资源的示例：

```
@Bean
WebSecurityCustomizer ignoringCustomizer() {
    return (web) -> web.ignoring().requestMatchers("/resources/**", "/static/**");
}
```

在这里，我们使用_ignoring()_方法绕过静态资源的安全检查。

值得注意的是，Spring建议_ignoring()_方法不应用于动态请求，而只应用于静态资源，因为它绕过了Spring Security过滤器链。这对于CSS、图像等静态资源是推荐的。

然而，动态请求需要通过身份验证和授权来提供不同的访问规则，因为它们携带敏感数据。此外，如果我们完全忽略动态端点，我们将失去完全的安全控制。这可能会使应用程序面临各种攻击，如CSRF攻击或SQL注入。

### 3.2. _debug()_ 方法
此外，《debug()_方法启用了Spring Security内部的日志记录，以帮助调试配置或请求失败。这在诊断安全规则时可能很有帮助，无需使用调试器。

让我们看看使用_debug()_方法调试安全的示例代码：

```
@Bean
WebSecurityCustomizer debugSecurity() {
    return (web) -> web.debug(true);
}
```

在这里，我们在_WebSecurity_实例上调用_debug()_并将其设置为_true_。这在全球范围内启用了所有安全过滤器的调试日志记录。

### 3.3. _httpFirewall()_ 方法
此外，《WebSecurity_类提供了_httpFirewall()_方法，用于为Spring应用程序配置防火墙。它有助于设置规则，以在全局级别允许某些操作。

让我们使用_httpFirewall()_方法来确定我们的应用程序应该允许哪些HTTP方法：

```
@Bean
HttpFirewall allowHttpMethod() {
    List``<String>`` allowedMethods = new ArrayList``<String>``();
    allowedMethods.add("GET");
    allowedMethods.add("POST");
    StrictHttpFirewall firewall = new StrictHttpFirewall();
    firewall.setAllowedHttpMethods(allowedMethods);
    return firewall;
}

@Bean
WebSecurityCustomizer fireWall() {
    return (web) -> web.httpFirewall(allowHttpMethod());
}
```

在上面的代码中，我们暴露了_HttpFirewall_ bean来配置HTTP方法的防火墙。默认情况下，允许DELETE、GET、HEAD、OPTIONS、PATCH、POST和PUT方法。然而，在我们的示例中，我们将应用程序配置为只使用GET和POST方法。

我们创建了一个_StrictHttpFirewall_对象，并在其上调用_setAllowedHttpMethods()_方法。该方法接受一个允许的HTTP方法列表作为参数。

最后，我们通过将_allowHttpMethod()_方法传递给_httpFirewall()_方法，暴露了一个_WebSecurityCustomizer_ bean，以全局配置防火墙。任何不是GET或POST的请求都将因为防火墙而返回HTTP错误。

## 4. 关键差异
_HttpSecurity_和_WebSecurity_配置不是相互冲突的，而是可以一起工作，以提供全局和资源特定的安全规则。

然而，如果在两者中都配置了相似的安全规则，_WebSecurity_配置具有最高的优先级：

```
@Bean
WebSecurityCustomizer ignoringCustomizer() {
    return (web) -> web.ignoring().antMatchers("/admin/**");
}

// ...
http.authorizeHttpRequests((authorize) -> authorize.antMatchers("/admin/**").hasRole("ADMIN")
// ...
```

在这里，我们在_WebSecurity_配置中全局忽略了“/admin/**”路径，但也在_HttpSecurity_中为“/admin/**”路径配置了访问规则。

在这种情况下，WebSecurity _ignoring()_配置将覆盖_HttpSecurity_对“/admin/**”的授权。

此外，在_SecurityFilterChain_中，_WebSecurity_配置是在构建过滤器链时首先执行的。接下来评估_HttpSecurity_规则。

以下是显示_HttpSecurity_和_WebSecurity_类关键差异的表格：

| 特性 | WebSecurity | HttpSecurity |
| --- | --- | --- |
| 范围 | 全局默认安全规则 | 资源特定的安全规则 |
| 示例 | 防火墙配置，路径忽略，调试模式 | URL规则，授权，CORS，CSRF |
| 配置方法 | 按资源条件配置 | 全局可重用的安全配置 |

## 5. 结论
在本文中，我们学习了_HttpSecurity_和_WebSecurity_的关键用法和示例代码。我们还看到了_HttpSecurity_如何允许为特定资源配置安全规则，而_WebSecurity_设置全局默认规则。

将它们一起使用提供了在全局和资源特定级别保护Spring应用程序的灵活性。

如常，示例的完整代码可在GitHub上找到。