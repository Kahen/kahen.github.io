---
date: 2024-06-27
category:
  - Spring Boot
  - Web开发
tag:
  - Spring Boot
  - 请求修改
  - AOP
  - 过滤器
  - 拦截器
head:
  - - meta
    - name: keywords
      content: Spring Boot, 修改请求, AOP, 过滤器, 拦截器
---
# 在Spring Boot中修改到达控制器之前的请求体

无论你是刚开始学习还是拥有多年经验，**Spring Boot** 显然是构建Web应用程序的极佳选择。

Jmix基于这个功能强大且成熟的Boot堆栈构建，允许开发人员构建并交付**全栈Web** **应用程序**，而无需编写前端代码。非常灵活，从简单的Web GUI CRUD应用程序到复杂的企业解决方案。

具体来说，**Jmix平台**包括一个框架，该框架建立在**Spring Boot, JPA和Vaadin**之上，并配备了Jmix Studio，**一个IntelliJ IDEA插件**，配备了一套开发者生产力工具。

该平台配备了相互连接的**开箱即用** **插件**，用于报告生成、BPM、地图、从数据库即时生成Web应用程序等：

**>> 成为一个高效的全栈开发人员与Jmix**

既然新版的 _REST With Spring -_ **“REST With Spring Boot”** 终于发布了，当前价格将在本周五之前有效，之后将永久增加50美元。

**>> 立即获取访问权限**

## 1. 概述
在本教程中，我们将学习如何在Spring Boot应用程序中，在HTTP请求到达控制器之前对其进行修改。Web应用程序和RESTful Web服务经常使用这种技术来解决常见的问题，比如在实际控制器处理之前转换或丰富传入的HTTP请求。这促进了松散耦合，并显著减少了开发工作量。

## 2. 使用过滤器修改请求
通常，应用程序需要执行一些通用操作，如身份验证、记录日志、转义HTML字符等。**过滤器是处理任何Servlet容器中运行的应用程序的通用问题的绝佳选择**。让我们看看过滤器是如何工作的：

在Spring Boot应用程序中，可以注册过滤器以按特定顺序调用：

- **修改请求**
- **记录请求**
- **检查请求是否经过身份验证或包含恶意脚本**
- **决定是拒绝请求还是将其转发到下一个过滤器或控制器**

假设我们想要从HTTP请求体中转义所有HTML字符以防止XSS攻击。让我们首先定义过滤器：

```
@Component
@Order(1)
public class EscapeHtmlFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
      throws IOException, ServletException {
        filterChain.doFilter(new HtmlEscapeRequestWrapper((HttpServletRequest) servletRequest), servletResponse);
    }
}
```

在`@Order`注解中的值_1_表示所有HTTP请求首先通过过滤器_EscapeHtmlFilter_。我们还可以通过在Spring Boot配置类中定义的_FilterRegistrationBean_来注册过滤器。通过这种方式，我们还可以为过滤器定义URL模式。

`doFilter()`方法将原始_ServletRequest_包装在一个自定义包装器_EscapeHtmlRequestWrapper_中：

```
public class EscapeHtmlRequestWrapper extends HttpServletRequestWrapper {
    private String body = null;
    public HtmlEscapeRequestWrapper(HttpServletRequest request) throws IOException {
        super(request);
        this.body = this.escapeHtml(request);
    }

    @Override
    public ServletInputStream getInputStream() throws IOException {
        final ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(body.getBytes());
        ServletInputStream servletInputStream = new ServletInputStream() {
            @Override
            public int read() throws IOException {
                return byteArrayInputStream.read();
            }
        //Other implemented methods...
        };
        return servletInputStream;
    }

    @Override
    public BufferedReader getReader() {
        return new BufferedReader(new InputStreamReader(this.getInputStream()));
    }
}
```

**包装器是必需的，因为我们不能修改原始的HTTP请求。如果没有这个，servlet容器会拒绝请求**。

在自定义包装器中，我们重写了`getInputStream()`方法以返回一个新的_ServletInputStream_。基本上，我们给它分配了使用`escapeHtml()`方法转义HTML字符后的修改请求体。

让我们定义一个_UserController_类：

```
@RestController
@RequestMapping("/")
public class UserController {
    @PostMapping(value = "save")
    public ResponseEntity``<String>`` saveUser(@RequestBody String user) {
        logger.info("save user info into database");
        ResponseEntity``<String>`` responseEntity = new ResponseEntity<>(user, HttpStatus.CREATED);
        return responseEntity;
    }
}
```

对于这个演示，控制器在/save端点返回它接收到的请求体_user_。

让我们看看过滤器是否有效：

```
@Test
void givenFilter_whenEscapeHtmlFilter_thenEscapeHtml() throws Exception {

    Map`````<String, String>````` requestBody = Map.of(
      "name", "James Cameron",
      "email", "```<script>```alert()```</script>```james@gmail.com"
    );

    Map`````<String, String>````` expectedResponseBody = Map.of(
      "name", "James Cameron",
      "email", "&``<sc>``ript>al``<er>``t()``</sc>``ript>;james@gmail.com"
    );

    ObjectMapper objectMapper = new ObjectMapper();

    mockMvc.perform(MockMvcRequestBuilders.post(URI.create("/save"))
      .contentType(MediaType.APPLICATION_JSON)
      .content(objectMapper.writeValueAsString(requestBody)))
      .andExpect(MockMvcResultMatchers.status().isCreated())
      .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(expectedResponseBody)));
}
```

好吧，过滤器在到达UserController类中定义的/save URL之前成功地转义了HTML字符。

## 3. 使用Spring AOP
Spring框架中的_RequestBodyAdvice_接口和_@RestControllerAdvice_注解帮助将全局建议应用于Spring应用程序中的所有REST控制器。让我们使用它们在HTTP请求到达控制器之前从请求中转义HTML字符：

```
@RestControllerAdvice
public class EscapeHtmlAspect implements RequestBodyAdvice {
    @Override
    public HttpInputMessage beforeBodyRead(HttpInputMessage inputMessage,
      MethodParameter parameter, Type targetType, Class````<? extends HttpMessageConverter<?>````> converterType) throws IOException {
        InputStream inputStream = inputMessage.getBody();
        return new HttpInputMessage() {
            @Override
            public InputStream getBody() throws IOException {
                return new ByteArrayInputStream(escapeHtml(inputStream).getBytes(StandardCharsets.UTF_8));
            }

            @Override
            public HttpHeaders getHeaders() {
                return inputMessage.getHeaders();
            }
        };
    }

    @Override
    public boolean supports(MethodParameter methodParameter,
      Type targetType, Class````<? extends HttpMessageConverter<?>````> converterType) {
        return true;
    }

    @Override
    public Object afterBodyRead(Object body, HttpInputMessage inputMessage,
      MethodParameter parameter, Type targetType, Class````<? extends HttpMessageConverter<?>````> converterType) {
        return body;
    }

    @Override
    public Object handleEmptyBody(Object body, HttpInputMessage inputMessage,
      MethodParameter parameter, Type targetType, Class````<? extends HttpMessageConverter<?>````> converterType) {
        return body;
    }
}
```

**beforeBodyRead()_方法在HTTP请求到达控制器之前被调用**。因此我们在其中转义了HTML字符。**support()_方法返回_true_，这意味着它将建议应用于所有的REST控制器**。

让我们看看它是否有效：

```
@Test
void givenAspect_whenEscapeHtmlAspect_thenEscapeHtml() throws Exception {

    Map`````<String, String>````` requestBody = Map.of(
      "name", "James Cameron",
      "email", "```<script>```alert()```</script>```james@gmail.com"
    );

    Map`````<String, String>````` expectedResponseBody = Map.of(
      "name", "James Cameron",
      "email", "&``<sc>``ript>al``<er>``t()``</sc>``ript>;james@gmail.com"
    );

    ObjectMapper objectMapper = new ObjectMapper();

    mockMvc.perform(MockMvcRequestBuilders.post(URI.create("/save"))
      .contentType(MediaType.APPLICATION_JSON)
      .content(objectMapper.writeValueAsString(requestBody)))
      .andExpect(MockMvcResultMatchers.status().isCreated())
      .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(expectedResponseBody)));
}
```

正如预期的那样，所有的HTML字符都被转义了。

我们还可以使用自定义AOP注解，这些注解可以用于控制器方法上，以更细粒度地应用建议。

## 4. 使用拦截器修改请求
Spring拦截器是一个可以拦截传入的HTTP请求并在控制器处理它们之前处理它们的类。拦截器用于各种目的，如身份验证、授权、记录日志和缓存。**此外，拦截器特定于Spring MVC框架，它们可以访问Spring _ApplicationContext_**。

让我们看看拦截器是如何工作的：

DispatcherServlet将HTTP请求转发到拦截器。进一步处理后，拦截器可以将请求转发到控制器或拒绝它。由于这个原因，**存在一个普遍的误解，即拦截器可以修改HTTP请求。然而，我们将演示这个观点是错误的**。

让我们考虑在前面部分讨论的从HTTP请求中转义HTML字符的示例。让我们看看是否可以使用Spring MVC拦截器来实现这一点：

```
public class EscapeHtmlRequestInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HtmlEscapeRequestWrapper htmlEscapeRequestWrapper = new HtmlEscapeRequestWrapper(request);
        return HandlerInterceptor.super.preHandle(htmlEscapeRequestWrapper, response, handler);
    }
}
```

所有拦截器都必须实现_HandleInterceptor_接口。**在拦截器中，_preHandle()_方法在请求转发到目标控制器之前被调用**。因此，我们已经将_HttpServletRequest_object包装在_EscapeHtmlRequestWrapper_中，并且负责转义HTML字符。

此外，我们还必须将拦截器注册到适当的URL模式：

```
@Configuration
@EnableWebMvc
public class WebMvcConfiguration implements WebMvcConfigurer {
    private static final Logger logger = LoggerFactory.getLogger(WebMvcConfiguration.class);
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        logger.info("addInterceptors() called");
        registry.addInterceptor(new HtmlEscapeRequestInterceptor()).addPathPatterns("/**");

        WebMvcConfigurer.super.addInterceptors(registry);
    }
}
```

正如我们所看到的，_WebMvcConfiguration_类实现了_WebMvcConfigurer_。在类中，我们重写了_addInterceptors()_方法。在方法中，我们使用_addPathPatterns()_方法为所有传入的HTTP请求注册了拦截器_EscapeHtmlRequestInterceptor_。

令人惊讶的是，_HtmlEscapeRequestInterceptor_未能转发修改后的请求体并调用处理器_/save_：

```
@Test
void givenInterceptor_whenEscapeHtmlInterceptor_thenEscapeHtml() throws Exception {
    Map`````<String, String>````` requestBody = Map.of(
      "name", "James Cameron",
      "email", "```<script>```alert()```</script>```james@gmail.com"
    );

    ObjectMapper objectMapper = new ObjectMapper();
    mockMvc.perform(MockMvcRequestBuilders.post(URI.create("/save"))
      .contentType(MediaType.APPLICATION_JSON)
      .content(objectMapper.writeValueAsString(requestBody)))
      .andExpect(MockMvcResultMatchers.status().is4xxClientError());
}
```

我们在HTTP请求体中推送了一些JavaScript字符。出乎意料地，请求以HTTP错误代码400失败了。因此，**尽管拦截器可以像过滤器一样起作用，但它们不适合修改HTTP请求。相反，当我们需要修改Spring应用程序上下文中的对象时，它们非常有用**。

## 5. 结论
在本文中，我们讨论了在Spring Boot应用程序中在HTTP请求到达控制器之前修改请求体的各种方式。根据普遍的看法，拦截器可以帮助完成这项工作，但我们发现它失败了。然而，我们看到了过滤器和AOP如何成功地在HTTP请求到达控制器之前修改请求体。

像往常一样，示例的源代码可以在GitHub上找到。
OK