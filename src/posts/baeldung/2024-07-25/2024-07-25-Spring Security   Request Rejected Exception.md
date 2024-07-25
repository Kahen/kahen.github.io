---
date: 2024-07-26
category:
  - Spring Security
  - Web Security
tag:
  - Request Rejected Exception
  - Path Traversal
head:
  - - meta
    - name: keywords
      content: Spring Security, Path Traversal, Request Rejected Exception, Web Security
---
# Spring Security – 请求被拒绝异常 | Baeldung

## **1. 引言**

Spring Framework 的 5.0 至 5.0.4 版本，以及 4.3 至 4.3.14 和其他旧版本，在 Windows 系统上存在目录或路径遍历安全漏洞。

错误配置静态资源可能会允许恶意用户访问服务器的文件系统。例如，在 Windows 上使用 file: 协议提供静态资源会提供对文件系统的非法访问。

Spring Framework 承认了这个漏洞，并在后续版本中进行了修复。

因此，这个修复保护应用程序免受路径遍历攻击。然而，由于这个修复，一些早期的 URL 现在会抛出 _org.springframework.security.web.firewall.RequestRejectedException_ 异常。

最后，在本教程中，让我们了解在路径遍历攻击背景下的 _org.springframework.security.web.firewall.RequestRejectedException_ 和 _StrictHttpFirewall_。

## **2. 路径遍历漏洞**

路径遍历或目录遍历漏洞允许非法访问 web 文档根目录之外的访问。例如，通过操作 URL 可以提供对文档根目录之外文件的未授权访问。

尽管大多数最新和流行的 web 服务器可以抵消这些攻击，但攻击者仍然可以使用特殊字符如 “./”，“../” 的 URL 编码来绕过 web 服务器安全并获得非法访问。

此外，OWASP 讨论了路径遍历漏洞以及解决它们的方法。

## **3. Spring Framework 漏洞**

现在，让我们在了解如何修复它之前尝试复制这个漏洞。

首先，让我们克隆 Spring Framework MVC 示例。然后，让我们修改 _pom.xml_ 并将现有的 Spring Framework 版本替换为易受攻击的版本。

克隆仓库：
```
git clone git@github.com:spring-projects/spring-mvc-showcase.git
```

在克隆的目录中，编辑 _pom.xml_ 以包括 _5.0.0.RELEASE_ 作为 Spring Framework 版本：
```
`<org.springframework-version>`5.0.0.RELEASE`</org.springframework-version>`
```

接下来，编辑 web 配置类 _WebMvcConfig_ 并修改 _addResourceHandlers_ 方法，以使用 _file:_ 将资源映射到本地文件目录：
```
@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry
      .addResourceHandler("/resources/**")
      .addResourceLocations("file:./src/", "/resources/");
}
```

之后，构建工件并运行我们的 web 应用程序：
```
mvn jetty:run
```

现在，当服务器启动时，调用 URL：
```
curl 'http://localhost:8080/spring-mvc-showcase/resources/%255c%255c%252e%252e%255c/%252e%252e%255c/%252e%252e%255c/%252e%252e%255c/%252e%252e%255c/windows/system.ini'
```

_%252e%252e%255c_ 是 ..\\ 的双重编码形式，而 _%255c%255c_ 是 \\\\ 的双重编码形式。

**危险地，响应将是 Windows 系统文件 _system.ini_ 的内容。**

## **4. Spring Security _HttpFirewall_ 接口**

Servlet 规范没有精确定义 _servletPath_ 和 _pathInfo_ 之间的区别。因此，在 Servlet 容器中对这些值的转换存在不一致性。

例如，在 _Tomcat 9_ 上，对于 URL _http://localhost:8080/api/v1/users/1_，URI _/1_ 应该是一个路径变量。

另一方面，以下命令返回 _/api/v1/users/1_：
```
request.getServletPath()
```

然而，下面的命令返回 _null_：
```
request.getPathInfo()
```

无法区分 URI 中的路径变量可能导致潜在的攻击，如路径遍历 / 目录遍历攻击。例如，用户可以通过在 URL 中包含 _\_、_/../、._.\_ 来利用服务器上的系统文件。不幸的是，只有一些 Servlet 容器会规范化这些 URL。

Spring Security 来救援。Spring Security 在容器之间保持一致的行为，并使用 _HttpFirewall_ 接口规范化这些恶意 URL。这个接口有两种实现：

### 4.1. _DefaultHttpFirewall_

**首先，不要被实现类的名称混淆。换句话说，这不是默认的 _HttpFirewall_ 实现。**

防火墙尝试清理或规范化 URL，并在容器中标准化 _servletPath_ 和 _pathInfo_。此外，我们可以通过显式声明一个 _@Bean_ 来覆盖默认的 _HttpFirewall_ 行为：
```
@Bean
public HttpFirewall getHttpFirewall() {
    return new DefaultHttpFirewall();
}
```

然而，_StrictHttpFirewall_ 提供了一个更加健壮和安全的实现，并且是推荐的实现。

### 4.2. _StrictHttpFirewall_

**_StrictHttpFirewall_ 是 _HttpFirewall_ 的默认和更严格的实现。**与 _DefaultHttpFirewall_ 不同，_StrictHttpFirewall_ 拒绝任何未规范化的 URL，提供更严格的保护。此外，这个实现保护应用程序免受其他几种攻击，如跨站追踪 (XST) 和 HTTP 动词篡改。

此外，这个实现是可定制的，并且具有合理的默认设置。换句话说，我们可以禁用（不推荐）一些功能，例如允许分号作为 URI 的一部分：
```
@Bean
public HttpFirewall getHttpFirewall() {
    StrictHttpFirewall strictHttpFirewall = new StrictHttpFirewall();
    strictHttpFirewall.setAllowSemicolon(true);
    return strictHttpFirewall;
}
```

简而言之，_StrictHttpFirewall_ 以 _org.springframework.security.web.firewall.RequestRejectedException_ 拒绝可疑请求。

**最后，让我们使用 Spring REST 和 Spring Security 开发一个具有用户 CRUD 操作的用户管理应用程序**，并看到 _StrictHttpFirewall_ 在行动中。

## **5. 依赖项**

让我们声明 Spring Security 和 Spring Web 的依赖项：
```
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-security``</artifactId>``
    ``<version>``3.1.5``</version>``
``</dependency>``
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-web``</artifactId>``
    ``<version>``3.1.5``</version>``
``</dependency>``
```

## **6. Spring Security 配置**

接下来，让我们通过创建一个配置类来使用基本认证保护我们的应用程序，该类创建了一个 _SecurityFilterChain_ bean：

```
@Configuration
public class HttpFirewallConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry ->
                    authorizationManagerRequestMatcherRegistry.requestMatchers("/error").permitAll().anyRequest().authenticated())
            .httpBasic(Customizer.withDefaults());
        return http.build();
    }
}
```

默认情况下，Spring Security 提供了一个每次重启都会更改的默认密码。因此，让我们在 _application.properties_ 中创建一个默认的用户名和密码：

```
spring.security.user.name=user
spring.security.user.password=password
```

从此以后，我们将使用这些凭据访问我们的安全 REST API。

## **7. 构建安全 REST API**

现在，让我们构建我们的用户管理 REST API：

```
@PostMapping
public ResponseEntity``<Response>`` createUser(@RequestBody User user) {
    userService.saveUser(user);
    Response response = new Response()
      .withTimestamp(System.currentTimeMillis())
      .withCode(HttpStatus.CREATED.value())
      .withMessage("User created successfully");
    URI location = URI.create("/users/" + user.getId());
    return ResponseEntity.created(location).body(response);
}

@DeleteMapping("/{userId}")
public ResponseEntity``<Response>`` deleteUser(@PathVariable("userId") String userId) {
    userService.deleteUser(userId);
    return ResponseEntity.ok(new Response(200,
      "The user has been deleted successfully", System.currentTimeMillis()));
}
```

现在，让我们构建并运行应用程序：

```
mvn spring-boot:run
```

## **8. 测试 API**

现在，让我们从使用 cURL 创建一个 _User_ 开始：

```
curl -i --user user:password -d @request.json -H "Content-Type: application/json"
     -H "Accept: application/json" http://localhost:8080/api/v1/users
```

这里是一个 _request.json_：

```
{
    "id":"1",
    "username":"navuluri",
    "email":"bhaskara.navuluri@mail.com"
}
```

相应的响应是：

```
HTTP/1.1 201
Location: /users/1
Content-Type: application/json
{
  "code":201,
  "message":"User created successfully",
  "timestamp":1632808055618
}
```

现在，让我们配置我们的 _StrictHttpFirewall_ 拒绝所有请求的 HTTP 方法：

```
@Bean
public HttpFirewall configureFirewall() {
    StrictHttpFirewall strictHttpFirewall = new StrictHttpFirewall();
    strictHttpFirewall
      .setAllowedHttpMethods(Collections.emptyList());
    return strictHttpFirewall;
}
```

接下来，再次调用 API。由于我们配置 _StrictHttpFirewall_ 来限制所有 HTTP 方法，这次我们会得到一个错误。

在日志中，我们有这个异常：

```
org.springframework.security.web.firewall.RequestRejectedException:
The request was rejected because the HTTP method "POST" was not included
within the list of allowed HTTP methods []
```

**自 _Spring Security v6.1.5_ 起，我们可以使用 _RequestRejectedHandler_ 来自定义当出现 _RequestRejectedException_ 时的 _HTTP 状态_：**

```
@Bean
public RequestRejectedHandler requestRejectedHandler() {
   return new HttpStatusRequestRejectedHandler();
}
```

请注意，默认情况下使用 _HttpStatusRequestRejectedHandler_ 的 HTTP 状态码是 _400_。然而，我们可以通过在 _HttpStatusRequestRejectedHandler_ 类的构造函数中传递一个状态码来自定义这个状态码。

现在，让我们重新配置 _StrictHttpFirewall_ 以允许 URL 中的 _\_ 和 HTTP GET_、_POST_、_DELETE_ 以及 _OPTIONS_ 方法：

```
strictHttpFirewall.setAllowBackSlash(true);
strictHttpFirewall.setAllowedHttpMethods(Arrays.asList("GET","POST","DELETE", "OPTIONS"));
```

接下来，调用 API：

```
curl -i --user user:password -d @request.json -H "Content-Type: application/json"
     -H "Accept: application/json" http://localhost:8080/api\v1/users
```

然后我们得到响应：

```
{
  "code":201,
  "message":"User created successfully",
  "timestamp":1632812660569
}
```

最后，通过删除 _@Bean_ 声明，让我们恢复到 _StrictHttpFirewall_ 的原始严格功能。

接下来，让我们尝试使用可疑的 URL 调用我们的 API：

```
curl -i --user user:password -d @request.json -H "Content-Type: application/json"
      -H "Accept: application/json" http://localhost:8080/api/v1//users
```

```
curl -i --user user:password -d @request.json -H "Content-Type: application/json"
      -H "Accept: application/json" http://localhost:8080/api/v1\users
```

立刻，上述所有请求都因错误日志而失败：

```
org.springframework.security.web.firewall.RequestRejectedException:
The request was rejected because the URL contained a potentially malicious String "//"
```

## **9. 结论**

**本文解释了 Spring Security 对可能引起路径遍历/目录遍历攻击的恶意 URL 的保护。**

_DefaultHttpFirewall_ 尝试规范化恶意 URL。然而，_StrictHttpFirewall_ 以 _RequestRejectedException_ 拒绝请求。除了路径遍历攻击之外，《StrictHttpFirewall》还保护我们免受其他几种攻击。因此，强烈建议使用 _StrictHttpFirewall_ 及其默认配置。

像往常一样，完整的源代码可以在 Github 上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)![img](https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-security-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-security-lightbox-icn-1.0.0-1.png)

OK