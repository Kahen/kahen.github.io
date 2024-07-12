---
date: 2022-11-12
category:
  - Spring Boot
  - Actuator
tag:
  - Endpoints
  - Dynamic Configuration
head:
  - - meta
    - name: keywords
      content: Spring Boot, Actuator, Endpoints, Dynamic Configuration
------
# 在Spring Boot中动态启用和禁用端点

端点在Spring Boot应用程序中是与应用程序交互的机制。在计划外的维护窗口期间，我们可能想要临时限制应用程序与外部的交互。

在本教程中，**我们将学习如何在Spring Boot应用程序中在运行时启用和禁用端点**，使用一些流行的库，如Spring Cloud、Spring Actuator和Apache的Commons Configuration。### 2. 设置

在这一部分，让我们关注设置Spring Boot项目的关键方面。

#### 2.1. Maven依赖

首先，我们需要让我们的Spring Boot应用程序**暴露_/refresh_端点**，所以让我们在项目的_pom.xml_文件中添加_spring-boot-starter-actuator_依赖：

```xml
````<dependency>````
    ````<groupId>````org.springframework.boot````</groupId>````
    ````<artifactId>````spring-boot-starter-actuator````</artifactId>````
    ````<version>````3.1.5````</version>````
````</dependency>````
```

接下来，由于我们稍后需要_@RefreshScope_注解来重新加载环境中的属性源，让我们添加_spring-cloud-starter_依赖：

```xml
````<dependency>````
    ````<groupId>````org.springframework.cloud````</groupId>````
    ````<artifactId>````spring-cloud-starter````</artifactId>````
    ````<version>````3.1.5````</version>````
````</dependency>````
```

进一步，我们还必须**在项目_pom.xml_文件的依赖管理部分添加Spring Cloud的BOM**，以便Maven使用兼容版本的_spring-cloud-starter_：

```xml
`<dependencyManagement>`
    `<dependencies>`
        ````<dependency>````
            ````<groupId>````org.springframework.cloud````</groupId>````
            ````<artifactId>````spring-cloud-dependencies````</artifactId>````
            ````<version>````2021.0.5````</version>````
            `<type>`pom`</type>`
            `<scope>`import`</scope>`
        ````</dependency>````
    `</dependencies>`
`</dependencyManagement>`
```

最后，由于我们需要在运行时重新加载文件的能力，让我们也添加_commons-configuration_依赖：

```xml
````<dependency>````
    ````<groupId>````commons-configuration````</groupId>````
    ````<artifactId>````commons-configuration````</artifactId>````
    ````<version>````1.10````</version>````
````</dependency>````
```

#### 2.2. 配置

首先，让我们在_application.properties_文件中添加配置以**在应用程序中启用_/refresh_端点**：

```properties
management.server.port=8081
management.endpoints.web.exposure.include=refresh
```

接下来，让我们定义一个我们可以用于重新加载属性的附加源：

```properties
dynamic.endpoint.config.location=file:extra.properties
```

此外，让我们在_application.properties_文件中定义_spring.properties.refreshDelay_属性：

```properties
spring.properties.refreshDelay=1
```

最后，让我们在_extra.properties_文件中添加两个属性：

```properties
endpoint.foo=false
endpoint.regex=.*
```

在后续部分中，我们将理解这些附加属性的核心重要性。

#### 2.3. API端点

首先，让我们定义一个在_/foo_路径上可用的示例**_GET_ API**：

```java
@GetMapping("/foo")
public String fooHandler() {
    return "foo";
}
```

接下来，让我们分别在_/bar1_和_/bar2_路径上定义两个更多的**_GET_ API**：

```java
@GetMapping("/bar1")
public String bar1Handler() {
    return "bar1";
}

@GetMapping("/bar2")
public String bar2Handler() {
    return "bar2";
}
```

在接下来的部分中，我们将学习如何切换单个端点，例如_/foo_。此外，我们还将看到如何切换一组端点，即通过简单的正则表达式标识的_/bar1_和_/bar2_。

#### 2.4. 配置_DynamicEndpointFilter_

要在运行时切换一组端点，我们可以使用_Filter_。通过使用_endpoint.regex_模式匹配请求的端点，我们可以在成功时允许它，或者在不匹配时发送_503_ HTTP响应状态。

所以，让我们**通过扩展_OncePerRequestFilter_来定义_DynamicEndpointFilter_类**：

```java
public class DynamicEndpointFilter extends OncePerRequestFilter {
    private Environment environment;

    // ...
}
```

进一步，我们需要通过覆盖_doFilterInternal()_方法来添加模式匹配的逻辑：

```java
@Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
  FilterChain filterChain) throws ServletException, IOException {
    String path = request.getRequestURI();
    String regex = this.environment.getProperty("endpoint.regex");
    Pattern pattern = Pattern.compile(regex);
    Matcher matcher = pattern.matcher(path);
    boolean matches = matcher.matches();

    if (!matches) {
        response.sendError(HttpStatus.SERVICE_UNAVAILABLE.value(), "Service is unavailable");
    } else {
        filterChain.doFilter(request,response);
    }
}
```

我们必须注意_initial value of the endpoint.regex property is “_.*_” that allows all the requests through this Filter._

## 3. 使用环境属性切换

在这一部分，我们将学习如何从_extra.properties_文件中热重载环境属性。

#### 3.1. 重新加载配置

为此，让我们首先使用_FileChangedReloadingStrategy_定义一个_PropertiesConfiguration_ bean：

```java
@Bean
@ConditionalOnProperty(name = "dynamic.endpoint.config.location", matchIfMissing = false)
public PropertiesConfiguration propertiesConfiguration(
  @Value("${dynamic.endpoint.config.location}") String path,
  @Value("${spring.properties.refreshDelay}") long refreshDelay) throws Exception {
    String filePath = path.substring("file:".length());
    PropertiesConfiguration configuration = new PropertiesConfiguration(
      new File(filePath).getCanonicalPath());
    FileChangedReloadingStrategy fileChangedReloadingStrategy = new FileChangedReloadingStrategy();
    fileChangedReloadingStrategy.setRefreshDelay(refreshDelay);
    configuration.setReloadingStrategy(fileChangedReloadingStrategy);
    return configuration;
}
```

我们必须注意_properties source is derived using the dynamic.endpoint.config.location property_ in the _application.properties_ file. Additionally, the reload happens with a time delay of _1_ second, as defined by the _spring.properties.refreshDelay_ property.

接下来，我们需要在运行时读取特定于端点的属性。所以，让我们定义具有属性getter的_EnvironmentConfigBean_：

```java
@Component
public class EnvironmentConfigBean {

    private final Environment environment;

    public EnvironmentConfigBean(@Autowired Environment environment) {
        this.environment = environment;
    }

    public String getEndpointRegex() {
        return environment.getProperty("endpoint.regex");
    }

    public boolean isFooEndpointEnabled() {
        return Boolean.parseBoolean(environment.getProperty("endpoint.foo"));
    }

    public Environment getEnvironment() {
        return environment;
    }
}
```

接下来，让我们**创建一个_FilterRegistrationBean_来注册_DynamicEndpointFilter_**：

```java
@Bean
@ConditionalOnBean(EnvironmentConfigBean.class)
public FilterRegistrationBean``<DynamicEndpointFilter>`` dynamicEndpointFilterFilterRegistrationBean(
  EnvironmentConfigBean environmentConfigBean) {
    FilterRegistrationBean``<DynamicEndpointFilter>`` registrationBean = new FilterRegistrationBean<>();
    registrationBean.setFilter(new DynamicEndpointFilter(environmentConfigBean.getEnvironment()));
    registrationBean.addUrlPatterns("*");
    return registrationBean;
}
```

#### 3.2. 验证

首先，让我们运行应用程序并访问_/bar1_或_/bar2_ API：

```shell
$ curl -iXGET http://localhost:9090/bar1
HTTP/1.1 200
Content-Type: text/plain;charset=ISO-8859-1
Content-Length: 4
Date: Sat, 12 Nov 2022 12:46:32 GMT

bar1
```

正如预期的那样，**我们得到了_200 OK_ HTTP响应，因为我们将_initial value of the endpoint.regex property_设置为允许所有端点**。

接下来，让我们通过更改_extra.properties_文件中的_endpoint.regex_属性来仅启用_/foo_端点：

```properties
endpoint.regex=.*/foo
```

继续进行，让我们看看我们是否能够访问_/bar1_ API端点：

```shell
$ curl -iXGET http://localhost:9090/bar1
HTTP/1.1 503
Content-Type: application/json
Transfer-Encoding: chunked
Date: Sat, 12 Nov 2022 12:56:12 GMT
Connection: close

{"timestamp":1668257772354,"status":503,"error":"Service Unavailable","message":"Service is unavailable","path":"/springbootapp/bar1"}
```

正如预期的那样，_DynamicEndpointFilter_禁用了此端点，并发送了带有HTTP _503_状态码的错误响应。

最后，我们也可以检查我们是否能够访问_/foo_ API端点：

```shell
$ curl -iXGET http://localhost:9090/foo
HTTP/1.1 200
Content-Type: text/plain;charset=ISO-8859-1
Content-Length: 3
Date: Sat, 12 Nov 2022 12:57:39 GMT

foo
```

太棒了！看起来我们做对了。

## 4. 使用Spring Cloud和Actuator切换

在这一部分，我们将学习使用_@RefreshScope_注解和actuator _/refresh_端点在运行时切换API端点的替代方法。

#### 4.1. 使用_@RefreshScope_配置端点

首先，我们需要**定义用于切换端点的配置bean，并用_@RefreshScope_注解**：

```java
@Component
@RefreshScope
public class EndpointRefreshConfigBean {

    private boolean foo;
    private String regex;

    public EndpointRefreshConfigBean(@Value("${endpoint.foo}") boolean foo,
      @Value("${endpoint.regex}") String regex) {
        this.foo = foo;
        this.regex = regex