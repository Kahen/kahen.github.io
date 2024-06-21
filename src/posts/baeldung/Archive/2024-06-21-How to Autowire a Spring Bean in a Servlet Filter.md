---
date: 2024-06-21
category:
  - Spring
  - Java
tag:
  - Spring Framework
  - Servlet Filter
head:
  - - meta
    - name: keywords
      content: Spring, Java, Dependency Injection, Servlet Filter, Autowire
---
# 如何在Servlet过滤器中自动装配Spring Bean

## 1. 引言

Servlet过滤器提供了一种强大的机制，用于拦截和操作传入的请求。然而，在这些过滤器中访问Spring管理的Bean可能会带来挑战。

在本教程中，我们将探讨在Servlet过滤器中无缝获取Spring Bean的各种方法，这在基于Spring的Web应用程序中是一个常见的需求。

## 2. 理解@Autowired在Servlet过滤器中的限制

虽然Spring的依赖注入机制@Autowired是将依赖注入Spring管理组件的便捷方式，但它与Servlet过滤器并不完全兼容。这是因为Servlet过滤器是由Servlet容器初始化的，通常在Spring的ApplicationContext完全加载和初始化之前。

因此，当容器实例化一个Servlet过滤器时，Spring上下文可能还没有可用，导致在使用@Autowired注解时依赖项为空或未初始化。让我们探索在Servlet过滤器中访问Spring Bean的替代方法。

## 3. 设置

让我们创建一个通用的LoggingService，它将被自动装配到我们的过滤器中：

```java
@Service
public class LoggingService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    public void log(String message, String url){
        logger.info("Logging Request {} for URI : {}", message, url);
    }
}
```

然后我们将创建我们的过滤器，它将拦截传入的HTTP请求，使用LoggingService依赖来记录HTTP方法和URI详细信息：

```java
@Component
public class LoggingFilter implements Filter {
    @Autowired
    LoggingService loggingService;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
        throws IOException, ServletException {
        HttpServletRequest httpServletRequest=(HttpServletRequest)servletRequest;
        loggingService.log(httpServletRequest.getMethod(),httpServletRequest.getRequestURI());
        filterChain.doFilter(servletRequest,servletResponse);
    }
}
```

让我们设置一个RestController，它返回用户列表：

```java
@RestController
public class UserController {
    @GetMapping("/users")
    public List`<User>` getUsers(){
        return Arrays.asList(new User("1","John","john@email.com"),
          new User("2","Smith","smith@email.com"));
    }
}
```

我们将设置测试以检查LoggingService是否成功自动装配到我们的过滤器中：

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class LoggingFilterTest {
    @Autowired
    private LoggingFilter loggingFilter;

    @Test
    public void givenFilter_whenAutowired_thenDependencyInjected() throws Exception {
        Assert.assertNotNull(loggingFilter);
        Assert.assertNotNull(getField(loggingFilter,"loggingService"));
    }

    private Object getField(Object target, String fieldName) throws NoSuchFieldException, IllegalAccessException {
        Field field = target.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        return field.get(target);
    }
}
```

然而，在这个阶段，LoggingService可能还没有注入到LoggingFilter中，因为Spring上下文还没有可用。我们将在以下部分探讨解决这个问题的各种选项。

## 4. 在Servlet过滤器中使用SpringBeanAutowiringSupport

Spring的SpringBeanAutowiringSupport类为依赖注入到非Spring管理的类如过滤器和Servlets提供了支持。通过使用这个类，Spring可以将依赖项，如LoggingService这样的Spring管理Bean，注入到LoggingFilter中。

init方法用于初始化Filter实例，我们将在LoggingFilter中覆盖这个方法以使用SpringBeanAutowiringSupport：

```java
@Override
public void init(FilterConfig filterConfig) throws ServletException {
    SpringBeanAutowiringSupport.processInjectionBasedOnServletContext(this,
      filterConfig.getServletContext());
}
```

processInjectionBasedOnServletContext方法使用与ServletContext关联的ApplicationContext来执行自动装配。它首先从ServletContext中检索ApplicationContext，然后使用它将依赖项自动装配到目标对象中。这个过程涉及检查目标对象的字段是否有@Autowired注解，然后解析并从ApplicationContext中注入相应的Bean。

这种机制允许非Spring管理的对象，如过滤器和servlets，从Spring的依赖注入功能中受益。

## 5. 在Servlet过滤器中使用WebApplicationContextUtils

WebApplicationContextUtils提供了一个实用方法，用于检索与ServletContext关联的ApplicationContext。ApplicationContext包含Spring容器管理的所有Bean。

让我们覆盖LoggingFilter类的init方法：

```java
@Override
public void init(FilterConfig filterConfig) throws ServletException {
    loggingService = WebApplicationContextUtils
      .getRequiredWebApplicationContext(filterConfig.getServletContext())
      .getBean(LoggingService.class);
}
```

我们从ApplicationContext中检索LoggingService的实例，并将其分配给过滤器的loggingService字段。这种方法在我们需要在非Spring管理的组件中访问Spring管理的Bean，如Servlet或Filter，并且不能使用基于注解或构造函数的注入时非常有用。

需要注意的是，这种方法紧密地将过滤器与Spring耦合，这在某些情况下可能不是理想的。

## 6. 在配置中使用FilterRegistrationBean

FilterRegistrationBean用于在servlet容器中以编程方式注册Servlet过滤器。它提供了一种在应用程序的配置类中动态配置过滤器注册的方法。

通过使用@Bean注解方法，LoggingService会自动注入到方法中，允许它被传递到LoggingFilter构造函数。让我们为我们的config类设置FilterRegistrationBean的方法：

```java
@Bean
public FilterRegistrationBean``<LoggingFilter>`` loggingFilterRegistration(LoggingService loggingService) {
    FilterRegistrationBean``<LoggingFilter>`` registrationBean = new FilterRegistrationBean<>();
    registrationBean.setFilter(new LoggingFilter(loggingService));
    registrationBean.addUrlPatterns("/*");
    return registrationBean;
}
```

然后我们将在LoggingFilter中包含一个构造函数以支持上述配置：

```java
public LoggingFilter(LoggingService loggingService) {
    this.loggingService = loggingService;
}
```

这种方法集中了过滤器及其依赖项的配置，使代码更加有序，更易于维护。

## 7. 在Servlet过滤器中使用DelegatingFilterProxy

DelegatingFilterProxy是一个Servlet过滤器，允许将控制权传递给可以访问Spring ApplicationContext的Filter类。

让我们配置DelegatingFilterProxy委托给一个名为“loggingFilter”的Spring管理Bean。FilterRegistrationBean由Spring在应用程序启动时用于向Servlet容器注册过滤器：

```java
@Bean
public FilterRegistrationBean``<DelegatingFilterProxy>`` loggingFilterRegistration() {
    FilterRegistrationBean``<DelegatingFilterProxy>`` registrationBean = new FilterRegistrationBean<>();
    registrationBean.setFilter(new DelegatingFilterProxy("loggingFilter"));
    registrationBean.addUrlPatterns("/*");
    return registrationBean;
}
```

让我们使用我们之前定义的过滤器相同的bean名称：

```java
@Component("loggingFilter")
public class LoggingFilter implements Filter {
    // 标准方法
}
```

这种方法允许我们使用Spring的依赖注入来管理loggingFilter Bean。

## 8. 比较Servlet过滤器中的依赖注入方法

DelegatingFilterProxy方法与SpringBeanAutowiringSupport和直接使用WebApplicationContextUtils在它将过滤器的执行委托给Spring管理的Bean方面有所不同，允许我们使用Spring的依赖注入。

DelegatingFilterProxy更符合典型的Spring应用程序架构，并允许更清晰的关注点分离。FilterRegistrationBean方法允许对过滤器的依赖注入有更多的控制，并集中了依赖项的配置。

相比之下，**SpringBeanAutowiringSupport和WebApplicationContextUtils是更底层的方法，可以在某些我们需要对过滤器的初始化过程有更多的控制或想要直接访问ApplicationContext的场景中非常有用**。然而，它们需要更多的手动设置，并且没有提供与Spring的依赖注入机制相同的集成水平。

## 9. 结论

在本文中，我们探讨了将Spring Bean自动装配到Servlet过滤器中的不同方法。每种方法都有其优点和局限性，选择方法取决于应用程序的具体要求和约束。总的来说，它们使Spring管理的Bean能够无缝集成到Servlet过滤器中，增强了应用程序的灵活性和可维护性。

如常，代码可在GitHub上获得。