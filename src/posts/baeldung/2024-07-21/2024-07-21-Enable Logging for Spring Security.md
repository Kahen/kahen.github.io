---
date: 2022-04-01
category:
  - Spring Security
  - Logging
tag:
  - Spring Security
  - Logging
head:
  - - meta
    - name: keywords
      content: Spring Security, Logging, Spring Boot, OAuth
------
# 为Spring Security启用日志记录

如果您正在使用Spring Security（特别是OAuth）实现，一定要看看《Learn Spring Security》课程。

**>> 学习Spring**
**安全**

## 1. 概述

在使用Spring Security时，我们可能需要记录比默认级别更高的日志。例如，我们可能需要检查用户的角色或如何保护端点。或者我们也可能需要更多关于认证或授权的信息，例如，查看为什么用户无法访问某个端点。

在这个简短的教程中，我们将看到如何修改Spring Security的日志记录级别。

## 2. 配置Spring Security日志记录

**像任何Spring或Java应用程序一样，我们可以使用日志库并为Spring Security模块定义一个日志级别。**

通常，我们可以在配置文件中写入类似以下内容：

```
`<logger name="org.springframework.security" level="DEBUG" />`
```

**但是，如果我们正在运行一个Spring Boot应用程序**，**我们可以在_application.properties_文件中配置这一点：**

```
logging.level.org.springframework.security=DEBUG
```

同样，我们可以使用_yaml_语法：

```yaml
logging:
  level:
    org:
      springframework:
        security: DEBUG
```

这样，**我们可以查看有关认证或过滤器链的日志。**此外，我们甚至可以使用_trace_级别进行更深入的调试。

此外，**Spring Security提供了记录有关请求和应用过滤器的特定信息的可能性：**

```java
@EnableWebSecurity
public class SecurityConfig {

    @Value("${spring.websecurity.debug:false}")
    boolean webSecurityDebug;

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.debug(webSecurityDebug);
    }
    // ...
}
```

## 3. 日志样本

最后，为了测试我们的应用程序，让我们定义一个简单的控制器：

```java
@Controller
public class LoggingController {

    @GetMapping("/logging")
    public ResponseEntity`<String>` logging() {
        return new ResponseEntity<>("logging/baeldung", HttpStatus.OK);
    }

}
```

如果我们访问_/logging_端点，我们可以检查我们的日志：

```
2022-02-10 21:30:32.104 DEBUG 5489 --- [nio-8080-exec-1] o.s.s.w.a.i.FilterSecurityInterceptor    : Authorized filter invocation [GET /logging] with attributes [permitAll]
2022-02-10 21:30:32.105 DEBUG 5489 --- [nio-8080-exec-1] o.s.security.web.FilterChainProxy        : Secured GET /logging
2022-02-10 21:30:32.141 DEBUG 5489 --- [nio-8080-exec-1] w.c.HttpSessionSecurityContextRepository : Did not store anonymous SecurityContext
2022-02-10 21:30:32.146 DEBUG 5489 --- [nio-8080-exec-1] s.s.w.c.SecurityContextPersistenceFilter : Cleared SecurityContextHolder to complete request
```

```
接收到GET '/logging'的请求：

org.apache.catalina.connector.RequestFacade@78fe74c6

servletPath:/logging
pathInfo:null
headers:
host: localhost:8080
connection: keep-alive
sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Linux"
upgrade-insecure-requests: 1
user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36
accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
sec-fetch-site: none
sec-fetch-mode: navigate
sec-fetch-user: ?1
sec-fetch-dest: document
accept-encoding: gzip, deflate, br
accept-language: en,it;q=0.9,en-US;q=0.8
cookie: PGADMIN_LANGUAGE=en; NX-ANTI-CSRF-TOKEN=0.7130543323088452; _ga=GA1.1.1440105797.1623675414; NXSESSIONID=bec8cae2-30e2-4ad4-9333-cba1af5dc95c; JSESSIONID=1C7CD365F521609AD887B3D6C2BE26CC

安全过滤器链：[
  WebAsyncManagerIntegrationFilter
  SecurityContextPersistenceFilter
  HeaderWriterFilter
  CsrfFilter
  LogoutFilter
  RequestCacheAwareFilter
  SecurityContextHolderAwareRequestFilter
  AnonymousAuthenticationFilter
  SessionManagementFilter
  ExceptionTranslationFilter
  FilterSecurityInterceptor
]
```

## 4. 结论

在本文中，我们查看了几种为Spring Security启用不同日志级别的选项。

我们已经看到了如何为Spring Security模块使用_debug_级别。我们还看到了如何记录有关单个请求的特定信息。

像往常一样，这些示例的代码可以在GitHub上找到。