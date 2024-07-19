---
date: 2022-04-01
category:
  - Spring Security
  - OAuth
tag:
  - Spring Security
  - OPA
  - Authorization
  - Policy
head:
  - - meta
    - name: keywords
      content: Spring Security, OPA, Authorization, Policy
------
# 如何将Spring Security的授权决策外包给OPA

如果你正在处理Spring Security（特别是OAuth）的实现，一定要看看《学习Spring安全》课程：
**>> 学习Spring**
**安全**

## 1. 引言
在本教程中，我们将展示如何将Spring Security的授权决策外包给OPA——开放策略代理。

## 2. 前言：外包授权的理由
**跨应用程序的常见需求是能够基于策略做出某些决策**。当这个策略足够简单且不太可能改变时，我们可以直接在代码中实现这个策略，这是最常见的情况。

然而，还有其他情况我们需要更多的灵活性。访问控制决策是典型的：随着应用程序复杂性的增加，授予对某个功能的访问权限可能不仅取决于你是谁，还取决于请求的其他上下文方面。这些方面可能包括IP地址、一天中的时间、登录认证方法（例如：“记住我”，一次性密码），等等。

此外，将上下文信息与用户身份结合的规则应该易于更改，最好在不停机的情况下进行更改。这种需求自然导致了一种架构，其中有一个专门的服务处理策略评估请求。

![img](https://www.baeldung.com/wp-content/uploads/2022/05/bael-5584-spring-opa-Page-1.png)

这里，这种灵活性的权衡是增加了复杂性和对外部服务调用的性能惩罚。另一方面，我们可以完全发展甚至替换授权服务，而不影响应用程序。此外，我们可以与多个应用程序共享此服务，从而允许跨应用程序的一致授权模型。

## 3. OPA是什么？
**开放策略代理，简称OPA，是一个用Go实现的开源策略评估引擎**。Styra最初开发了这个项目，但现在它是一个CNCF毕业项目。以下是这个工具的一些典型用途：
- Envoy授权过滤器
- Kubernetes准入控制器
- Terraform计划评估

安装OPA非常简单：请参阅他们的官方文档以获取最新版本。此外，我们可以通过将其放在操作系统的PATH变量中使其可用。我们可以使用一个简单的命令验证它是否正确安装：
```
$ opa version
版本：0.39.0
构建提交：cc965f6
构建时间戳：2022-03-31T12:34:56Z
构建主机名：5aba1d393f31
Go版本：go1.18
平台：windows/amd64
WebAssembly：可用
```

OPA评估用REGO编写的策略，REGO是一种声明性语言，优化了在复杂对象结构上运行查询。客户端应用程序然后根据特定用例使用这些查询的结果。在我们的情况下，对象结构是一个授权请求，我们将使用策略查询结果以授予对某个功能的访问权限。

**重要的是要注意，OPA的策略是通用的，并不以任何方式表达授权决策**。实际上，我们可以使用它在其他传统上由规则引擎如Drools等主导的场景中。

## 4. 编写策略
这是一个用REGO编写的简单授权策略的样子：

```
package baeldung.auth.account

# 默认不授权
default authorized = false

authorized = true {
    count(deny) == 0
    count(allow) > 0
}

# 允许访问 /public
allow["public"] {
    regex.match("^/public/.*",input.uri)
}

# 账户API需要经过身份验证的用户
deny["account_api_authenticated"] {
    regex.match("^/account/.*",input.uri)
    regex.match("ANONYMOUS",input.principal)
}

# 授权访问账户
allow["account_api_authorized"] {
    regex.match("^/account/.+",input.uri)
    parts := split(input.uri,"/")
    account := parts[2]
    role := concat(":",[ "ROLE_account", "read", account] )
    role == input.authorities[i]
}
```

首先要注意的是包声明。OPA策略使用包来组织规则，它们在评估传入请求时也起着关键作用，稍后我们将展示。我们可以跨多个目录组织策略文件。

接下来，我们定义实际的策略规则：
- 一个 _default_ 规则，以确保我们总是得到 _authorized_ 变量的值
- 主要聚合规则，我们可以将其读作“当没有规则拒绝访问且至少有一个规则允许访问时，_authorized_ 是 _true_”
- 允许和拒绝规则，每个规则都表达一个条件，如果匹配，则将一个条目添加到 _allow_ 或 _deny_ 数组中

完整描述OPA的策略语言超出了本文的范围，但规则本身并不难读。在查看它们时需要注意几件事：
- 形式为 _a := b_ 或 _a=b_ 的语句是简单的赋值（它们不一样）
- 形式为 _a = b { … 条件 }_ 或 _a { …条件 }_ 的语句意味着“如果 _条件_ 为真，则将 _b_ 赋值给 _a_”
- 策略文档中出现的顺序是不相关的

除此之外，OPA还带有一个丰富的内置函数库，优化了查询深层嵌套的数据结构，以及更熟悉的功能，如字符串操作、集合等。

## 5. 评估策略
让我们使用上一节中定义的策略来评估一个授权请求。在我们的情况下，我们将使用包含一些来自传入请求的部分的JSON结构构建这个授权请求：

```
{
    "input": {
        "principal": "user1",
        "authorities": ["ROLE_account:read:0001"],
        "uri": "/account/0001",
        "headers": {
            "WebTestClient-Request-Id": "1",
            "Accept": "application/json"
        }
    }
}

```

注意我们已经将请求属性包装在一个单独的 _input_ 对象中。这个对象在策略评估期间成为 _input_ 变量，我们可以使用类似JavaScript的语法访问其属性。

为了测试我们的策略是否按预期工作，让我们在服务器模式下本地运行OPA并手动提交一些测试请求：

```
$ opa run  -w -s src/test/rego
```

选项 _-s_ 启用服务器模式，而 _-w_ 启用自动规则文件重新加载。 _src/test/rego_ 是包含我们示例代码策略文件的文件夹。一旦运行，OPA将在本地端口8181上监听API请求。如果需要，我们可以使用 _-a_ 选项更改默认端口。

现在，我们可以使用 _curl_ 或其他工具发送请求：

```
$ curl --location --request POST 'http://localhost:8181/v1/data/baeldung/auth/account' \
--header 'Content-Type: application/json' \
--data-raw '{
    "input": {
        "principal": "user1",
        "authorities": [],
        "uri": "/account/0001",
        "headers": {
            "WebTestClient-Request-Id": "1",
            "Accept": "application/json"
        }
    }
}'
```

**注意 /v1/data 前缀后的路径部分：它对应策略的包名，点号被替换为正斜杠**。

响应将是一个包含通过输入数据评估策略产生的所有结果的JSON对象：

```
{
  "result": {
    "allow": [],
    "authorized": false,
    "deny": []
  }
}

```

_result_ 属性是一个对象，包含策略引擎产生的结果。我们可以看到，在这种情况下，_authorized_ 属性是 _false_。我们还可以看到 _allow_ 和 _deny_ 是空数组。**这意味着没有特定的规则匹配输入。因此，主要的授权规则也没有匹配**。

现在我们已经看到了OPA的工作原理，我们可以继续将其集成到Spring授权框架中。**在这里，我们将专注于其响应式Web变体，但一般思路也适用于常规的MVC应用程序**。

首先，我们需要实现一个使用OPA作为后端的 _ReactiveAuthorizationManager_ bean：

```
@Bean
public ReactiveAuthorizationManager`<AuthorizationContext>` opaAuthManager(WebClient opaWebClient) {
    return (auth, context) -> {
        return opaWebClient.post()
          .accept(MediaType.APPLICATION_JSON)
          .contentType(MediaType.APPLICATION_JSON)
          .body(toAuthorizationPayload(auth,context), Map.class)
          .exchangeToMono(this::toDecision);
    };
}
```

这里，注入的 _WebClient_ 来自另一个bean，我们从 _@ConfigurationPropreties_ 类中预先初始化其属性。

处理管道将从当前 _Authentication_ 和 _AuthorizationContext_ 收集信息并构建授权请求负载的任务委托给 _toAuthorizationRequest_ 方法。同样，_toAuthorizationDecision_ 接受授权响应并将其映射到 _AuthorizationDecision_。

现在，我们使用这个bean来构建 _SecurityWebFilterChain_：

```
@Bean
public SecurityWebFilterChain accountAuthorization(ServerHttpSecurity http, @Qualifier("opaWebClient") WebClient opaWebClient) {
    return http.httpBasic(Customizer.withDefaults())
      .authorizeExchange(exchanges -> exchanges```
      .pathMatchers("/account/*")
        .access(opaAuthManager(opaWebClient)))
      .build();
}

```

我们只将我们自定义的 _AuthorizationManager_ 应用于 _/account_ API。这种方法的原因是我们可以轻松地扩展这种逻辑，以支持多个策略文档，从而使它们更易于维护。例如，我们可以有一个配置，使用请求URI选择适当的规则包，并使用此信息构建授权请求。

在我们的情况下，_account_ API本身只是一个简单的控制器/服务对，返回一个填充了假余额的 _Account_ 对象。

## 7. 测试

最后但同样重要的是，让我们构建一个集成测试来将所有内容整合在一起。首先，让我们确保“快乐路径”工作。这意味着经过身份验证的用户能够访问他们的账户：

```
@Test
@WithMockUser(username = "user1", roles = { "account:read:0001" })
void testGivenValidUser_thenSuccess() {
    rest.get()
     .uri("/account/0001")
      .accept(MediaType.APPLICATION_JSON)
      .exchange()
      .expectStatus()
      .is2xxSuccessful();
}

```

其次，我们还必须验证经过身份验证的用户只能访问他们的账户：

```
@Test
@WithMockUser(username = "user1", roles = { "account:read:0002" })
void testGivenValidUser_thenUnauthorized() {
    rest.get()
     .uri("/account/0001")
      .accept(MediaType.APPLICATION_JSON)
      .exchange()
      .expectStatus()
      .isForbidden();
}

```

最后，让我们也测试一下经过身份验证的用户没有权限的情况：

```
@Test
@WithMockUser(username = "user1", roles = {})
void testGivenNoAuthorities_thenForbidden() {
    rest.get()
      .uri("/account/0001")
      .accept(MediaType.APPLICATION_JSON)
      .exchange()
      .expectStatus()
      .isForbidden();
}

```

我们可以从IDE或命令行运行这些测试。**请注意，在任何情况下，我们都必须首先启动指向包含我们授权策略文件的文件夹的OPA服务器**。

## 8. 结论

在本文中，我们已经展示了如何使用OPA来外包基于Spring Security的应用程序的授权决策。像往常一样，完整的代码可以在GitHub上找到。
OK