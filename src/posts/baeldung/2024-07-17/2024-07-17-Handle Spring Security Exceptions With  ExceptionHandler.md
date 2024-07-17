---
date: 2022-04-01
category:
  - Spring Security
  - Exception Handling
tag:
  - Spring Security
  - ExceptionHandler
  - AuthenticationException
  - AccessDeniedException
head:
  - - meta
    - name: keywords
      content: Spring Security, Exception Handling, AuthenticationException, AccessDeniedException
------
# 使用 @ExceptionHandler 处理 Spring Security 异常

如果你正在处理 Spring Security（特别是 OAuth）的实现，一定要看看《学习 Spring 安全》课程：

**>** **学习 Spring 安全**

## 1. 概述

在本教程中，我们将学习如何使用 _@ExceptionHandler_ 和 _@ControllerAdvice_ 全局处理 Spring 安全异常。控制器建议是一个拦截器，允许我们在应用程序中使用相同的异常处理。

Spring 安全核心异常如 _AuthenticationException_ 和 _AccessDeniedException_ 是运行时异常。由于这些异常是由 _DispatcherServlet_ 背后的认证过滤器抛出的，并且在调用控制器方法之前，_ControllerAdvice_ 无法捕获这些异常。

我们可以通过添加自定义过滤器并构建响应体来直接处理 Spring 安全异常。要通过 _@ExceptionHandler_ 和 _@ControllerAdvice_ 在全局级别处理这些异常，我们需要自定义实现 _AuthenticationEntryPoint_。**_AuthenticationEntryPoint_ 用于发送一个 HTTP 响应，请求客户端提供凭据**。虽然有多个内置的安全性入口点实现，但我们需要编写一个自定义实现以发送自定义响应消息。

首先，让我们看看如何在不使用 _@ExceptionHandler_ 的情况下全局处理安全异常。

## 3. 没有 _@ExceptionHandler_

Spring 安全异常从 _AuthenticationEntryPoint_ 开始。让我们编写一个实现 _AuthenticationEntryPoint_ 并重写 _commence()_ 方法：

```
@Component("customAuthenticationEntryPoint")
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
      throws IOException, ServletException {

        RestError re = new RestError(HttpStatus.UNAUTHORIZED.toString(), "认证失败");
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        OutputStream responseStream = response.getOutputStream();
        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(responseStream, re);
        responseStream.flush();
    }
}
```

在这里，我们使用 _ObjectMapper_ 作为响应体的消息转换器。

### 3.2. 配置 _SecurityConfig_

接下来，让我们配置 _SecurityConfig_ 以拦截认证路径。这里我们将配置 ‘/login’ 为上述实现的路径。此外，我们将配置用户名为 ‘admin’ 的用户，角色为 ‘ADMIN’：

```
@Configuration
@EnableWebSecurity
public class CustomSecurityConfig {

    @Autowired
    @Qualifier("customAuthenticationEntryPoint")
    AuthenticationEntryPoint authEntryPoint;

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails admin = User.withUsername("admin")
            .password("password")
            .roles("ADMIN")
            .build();
        InMemoryUserDetailsManager userDetailsManager = new InMemoryUserDetailsManager();
        userDetailsManager.createUser(admin);
        return userDetailsManager;
    }

   @Bean
   public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
      http.authorizeHttpRequests(auth -> auth
            .requestMatchers("/login")
            .authenticated()
            .anyRequest()
            .hasRole("ADMIN"))
            .httpBasic(basic -> basic.authenticationEntryPoint(authEntryPoint))
            .exceptionHandling(Customizer.withDefaults());
      return http.build();
 }
```

### 3.3. 配置 Rest 控制器

现在，让我们编写一个监听此端点 ‘/login’ 的 rest 控制器：

```
@PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity``<RestResponse>`` login() {
    return ResponseEntity.ok(new RestResponse("成功"));
}
```

### 3.4. 测试

最后，让我们使用模拟测试来测试这个端点。

首先，让我们编写一个成功认证的测试用例：

```
@Test
@WithMockUser(username = "admin", roles = { "ADMIN" })
public void whenUserAccessLogin_shouldSucceed() throws Exception {
    mvc.perform(formLogin("/login").user("username", "admin")
      .password("password", "password")
      .acceptMediaType(MediaType.APPLICATION_JSON))
      .andExpect(status().isOk());
}
```

接下来，让我们看看认证失败的场景：

```
@Test
public void whenUserAccessWithWrongCredentialsWithDelegatedEntryPoint_shouldFail() throws Exception {
    RestError re = new RestError(HttpStatus.UNAUTHORIZED.toString(), "认证失败");
    mvc.perform(formLogin("/login").user("username", "admin")
      .password("password", "wrong")
      .acceptMediaType(MediaType.APPLICATION_JSON))
      .andExpect(status().isUnauthorized())
      .andExpect(jsonPath("$.errorMessage", is(re.getErrorMessage())));
}
```

现在，让我们看看如何使用 _@ControllerAdvice_ 和 _@ExceptionHandler_ 达到同样的效果。

## 4. 使用 _@ExceptionHandler_

这种方法允许我们使用完全相同的异常处理技术，但在控制器建议中以更清晰、更好的方式使用带有 _@ExceptionHandler_ 注解的方法。

### 4.1. 配置 _AuthenticationEntryPoint_

类似于上述方法，我们将实现 _AuthenticationEntryPoint_，然后将异常处理器委托给 _HandlerExceptionResolver_：

```
@Component("delegatedAuthenticationEntryPoint")
public class DelegatedAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Autowired
    @Qualifier("handlerExceptionResolver")
    private HandlerExceptionResolver resolver;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
      throws IOException, ServletException {
        resolver.resolveException(request, response, null, authException);
    }
}
```

在这里，我们注入了 _DefaultHandlerExceptionResolver_ 并将处理器委托给这个解析器。现在这个安全异常可以通过带有异常处理方法的控制器建议来处理。

### 4.2. 配置 _ExceptionHandler_

现在，对于异常处理器的主要配置，我们将扩展 _ResponseEntityExceptionHandler_ 并使用 _@ControllerAdvice_ 注解这个类：

```
@ControllerAdvice
public class DefaultExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({ AuthenticationException.class })
    @ResponseBody
    public ResponseEntity`<RestError>` handleAuthenticationException(Exception ex) {

        RestError re = new RestError(HttpStatus.UNAUTHORIZED.toString(),
          "在控制器建议中认证失败");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(re);
    }
}
```

### 4.3. 配置 _SecurityConfig_

现在，让我们编写一个安全配置，用于这个委托认证入口点：

```
@Configuration
@EnableWebSecurity
public class DelegatedSecurityConfig {

    @Autowired
    @Qualifier("delegatedAuthenticationEntryPoint")
    AuthenticationEntryPoint authEntryPoint;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.requestMatchers()
            .antMatchers("/login-handler")
            .and()
            .authorizeRequests()
            .anyRequest()
            .hasRole("ADMIN")
            .and()
            .httpBasic()
            .and()
            .exceptionHandling()
            .authenticationEntryPoint(authEntryPoint);
        return http.build();
    }

    @Bean
    public InMemoryUserDetailsManager userDetailsService() {
        UserDetails admin = User.withUsername("admin")
            .password("password")
            .roles("ADMIN")
            .build();
        return new InMemoryUserDetailsManager(admin);
    }
}
```

对于 ‘/login-handler’ 端点，我们已经使用上述实现的 _DelegatedAuthenticationEntryPoint_ 配置了异常处理器。

### 4.4. 配置 Rest 控制器

让我们为 ‘/login-handler’ 端点配置 rest 控制器：

```
@PostMapping(value = "/login-handler", produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity``<RestResponse>`` loginWithExceptionHandler() {
    return ResponseEntity.ok(new RestResponse("成功"));
}
```

### 4.5. 测试

现在让我们测试这个端点：

```
@Test
@WithMockUser(username = "admin", roles = { "ADMIN" })
public void whenUserAccessLogin_shouldSucceed() throws Exception {
    mvc.perform(formLogin("/login-handler").user("username", "admin")
      .password("password", "password")
      .acceptMediaType(MediaType.APPLICATION_JSON))
      .andExpect(status().isOk());
}

@Test
public void whenUserAccessWithWrongCredentialsWithDelegatedEntryPoint_shouldFail() throws Exception {
    RestError re = new RestError(HttpStatus.UNAUTHORIZED.toString(), "在控制器建议中认证失败");
    mvc.perform(formLogin("/login-handler").user("username", "admin")
      .password("password", "wrong")
      .acceptMediaType(MediaType.APPLICATION_JSON))
      .andExpect(status().isUnauthorized())
      .andExpect(jsonPath("$.errorMessage", is(re.getErrorMessage())));
}
```

在成功测试中，我们使用预配置的用户名和密码测试了端点。在失败测试中，我们验证了响应的状态码和响应体中的错误消息。 

## 5. 结论

在本文中，**我们学习了如何使用 _@ExceptionHandler_ 全局处理 Spring 安全异常**。此外，我们创建了一个完全功能的示例，帮助我们理解所解释的概念。

本文的完整源代码可在 GitHub 上获取。