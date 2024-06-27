---
date: 2024-06-27
category:
  - Spring
  - Testing
tag:
  - Spring Boot
  - Integration Testing
head:
  - - meta
    - name: keywords
      content: Spring, Testing, Spring Boot, Integration Testing
---
# Spring集成测试中覆盖Spring Bean

## 1. 概述

我们可能希望在Spring集成测试中覆盖应用程序的某些Bean。通常，这可以通过为测试特别定义的Spring Bean来完成。然而，如果在Spring上下文中提供了具有相同名称的多个Bean，我们可能会遇到_BeanDefinitionOverrideException_。

本教程将展示如何在Spring Boot应用程序中模拟或存根集成测试Bean，同时避免_BeanDefinitionOverrideException_。

## 2. 测试中的Mock或Stub

在深入细节之前，我们应该对如何在测试中使用Mock或Stub充满信心。这是一种强大的技术，可以确保我们的应用程序不易受到错误的影响。

我们也可以将这种方法应用于Spring。然而，只有在使用Spring Boot时，才可以直接模拟集成测试Bean。

或者，我们可以使用测试配置来存根或模拟一个Bean。

## 3. Spring Boot应用程序示例

以一个简单的Spring Boot应用程序为例，包括一个控制器、一个服务和一个配置类：

```java
@RestController
public class Endpoint {

    private final Service service;

    public Endpoint(Service service) {
        this.service = service;
    }

    @GetMapping("/hello")
    public String helloWorldEndpoint() {
        return service.helloWorld();
    }
}
```

_/hello_端点将返回我们想要在测试期间替换的服务提供的字符串：

```java
public interface Service {
    String helloWorld();
}

public class ServiceImpl implements Service {

    public String helloWorld() {
        return "hello world";
    }
}
```

值得注意的是，我们将使用接口。因此，当需要时，我们将存根实现以获得不同的值。

我们还需要一个配置来加载_Service_ Bean：

```java
@Configuration
public class Config {

    @Bean
    public Service helloWorld() {
        return new ServiceImpl();
    }
}
```

最后，让我们添加_@SpringBootApplication_：

```java
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

## 4. 使用_@MockBean_覆盖

自Spring Boot 1.4.0版本以来，_@MockBean_已经可用。我们不需要任何测试配置。因此，在我们的测试类中添加_@SpringBootTest_注解就足够了：

```java
@SpringBootTest(classes = { Application.class, Endpoint.class })
@AutoConfigureMockMvc
class MockBeanIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private Service service;

    @Test
    void givenServiceMockBean_whenGetHelloEndpoint_thenMockOk() throws Exception {
        when(service.helloWorld()).thenReturn("hello mock bean");
        this.mockMvc.perform(get("/hello"))
          .andExpect(status().isOk())
          .andExpect(content().string(containsString("hello mock bean")));
    }
}
```

我们确信与主配置没有冲突。这是因为_@MockBean_将我们的应用程序中注入一个_Service_模拟。

最后，我们使用Mockito来伪造服务返回值：

```java
when(service.helloWorld()).thenReturn("hello mock bean");
```

## 5. 不使用_@MockBean_覆盖

让我们探索更多不使用_@MockBean_覆盖Bean的选项。我们将查看四种不同的方法：Spring profiles、条件属性、_@Primary_注解和Bean定义覆盖。然后我们可以存根或模拟Bean实现。

### 5.1. 使用_@Profile_

**定义profiles是Spring中众所周知的做法。** 首先，让我们使用_@Profile_创建一个配置：

```java
@Configuration
@Profile("prod")
public class ProfileConfig {

    @Bean
    public Service helloWorld() {
        return new ServiceImpl();
    }
}
```

然后，我们可以定义一个带有我们服务Bean的测试配置：

```java
@TestConfiguration
public class ProfileTestConfig {

    @Bean
    @Profile("stub")
    public Service helloWorld() {
        return new ProfileServiceStub();
    }
}
```

_ProfileServiceStub_服务将存根已经定义的_ServiceImpl_：

```java
public class ProfileServiceStub implements Service {

    public String helloWorld() {
        return "hello profile stub";
    }
}
```

我们可以创建一个测试类，包括主要和测试配置：

```java
@SpringBootTest(classes = { Application.class, ProfileConfig.class, Endpoint.class, ProfileTestConfig.class })
@AutoConfigureMockMvc
@ActiveProfiles("stub")
class ProfileIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void givenConfigurationWithProfile_whenTestProfileIsActive_thenStubOk() throws Exception {
        this.mockMvc.perform(get("/hello"))
          .andExpect(status().isOk())
          .andExpect(content().string(containsString("hello profile stub")));
    }
}
```

我们在_ProfileIntegrationTest_中激活_stub_ profile。因此，_prod_ profile不会加载。因此，测试配置将加载_Service_存根。

### 5.2. 使用_@ConditionalOnProperty_

**类似于profile，我们可以使用_@ConditionalOnProperty_注解在不同的Bean配置之间切换。**

因此，我们将在主配置中有一个_service.stub_属性：

```java
@Configuration
public class ConditionalConfig {

    @Bean
    @ConditionalOnProperty(name = "service.stub", havingValue = "false")
    public Service helloWorld() {
        return new ServiceImpl();
    }
}
```

在运行时，我们需要将这个条件设置为false，通常在我们的_application.properties_文件中：

```properties
service.stub=false
```

相反，在测试配置中，我们想要触发_Service_加载。因此，我们需要这个条件为true：

```java
@TestConfiguration
public class ConditionalTestConfig {

    @Bean
    @ConditionalOnProperty(name="service.stub", havingValue="true")
    public Service helloWorld() {
        return new ConditionalStub();
    }
}
```

然后，让我们也添加我们的_Service_存根：

```java
public class ConditionalStub implements Service {

    public String helloWorld() {
        return "hello conditional stub";
    }
}
```

最后，让我们创建我们的测试类。我们将将_service.stub_条件设置为true并加载_Service_存根：

```java
@SpringBootTest(classes = {  Application.class, ConditionalConfig.class, Endpoint.class, ConditionalTestConfig.class },
  properties = "service.stub=true")
@AutoConfigureMockMvc
class ConditionIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void givenConditionalConfig_whenServiceStubIsTrue_thenStubOk() throws Exception {
        this.mockMvc.perform(get("/hello"))
          .andExpect(status().isOk())
          .andExpect(content().string(containsString("hello conditional stub")));
    }
}
```

### 5.3. 使用_@Primary_

**我们也可以使用方法_@Primary_注解。考虑到我们的主配置，我们可以在测试配置中定义一个主要服务，以便以更高的优先级加载**：

```java
@TestConfiguration
public class PrimaryTestConfig {

    @Primary
    @Bean("service.stub")
    public Service helloWorld() {
        return new PrimaryServiceStub();
    }
}
```

值得注意的是，Bean的名称需要不同。否则，我们仍然会遇到原始的异常。我们可以更改_@Bean_的名称属性或方法的名称。

再次，我们需要一个_Service_存根：

```java
public class PrimaryServiceStub implements Service {

    public String helloWorld() {
        return "hello primary stub";
    }
}
```

最后，让我们通过定义所有相关组件来创建我们的测试类：

```java
@SpringBootTest(classes = { Application.class, NoProfileConfig.class, Endpoint.class, PrimaryTestConfig.class })
@AutoConfigureMockMvc
class PrimaryIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void givenTestConfiguration_whenPrimaryBeanIsDefined_thenStubOk() throws Exception {
        this.mockMvc.perform(get("/hello"))
          .andExpect(status().isOk())
          .andExpect(content().string(containsString("hello primary stub")));
    }
}
```

### 5.4. 使用_spring.main.allow-bean-definition-overriding_属性

如果我们不能应用前面的任何选项怎么办？**Spring提供了_spring.main.allow-bean-definition-overriding_属性，以便我们可以直接覆盖主配置**。

让我们定义一个测试配置：

```java
@TestConfiguration
public class OverrideBeanDefinitionTestConfig {

    @Bean
    public Service helloWorld() {
        return new OverrideBeanDefinitionServiceStub();
    }
}
```

然后，我们需要我们的_Service_存根：

```java
public class OverrideBeanDefinitionServiceStub implements Service {

    public String helloWorld() {
        return "hello no profile stub";
    }
}
```

再次，让我们创建一个测试类。如果我们想要覆盖_Service_ Bean，我们需要将我们的属性设置为true：

```java
@SpringBootTest(classes = { Application.class, Config.class, Endpoint.class, OverribeBeanDefinitionTestConfig.class },
  properties = "spring.main.allow-bean-definition-overriding=true")
@AutoConfigureMockMvc
class OverrideBeanDefinitionIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void givenNoProfile_whenAllowBeanDefinitionOverriding_thenStubOk() throws Exception {
        this.mockMvc.perform(get("/hello"))
          .andExpect(status().isOk())
          .andExpect(content().string(containsString("hello no profile stub")));
    }
}
```

###### 5.5. 使用Mock代替Stub

到目前为止，在使用测试配置时，我们已经看到了存根的例子。然而，我们也可以模拟一个Bean。这将适用于我们之前看到的任何测试配置。然而，为了演示，我们将遵循profile示例。

**这次，不是存根，我们使用Mockito的_mock_方法返回一个_Service_**：

```java
@TestConfiguration
public class ProfileTestConfig {

    @Bean
    @Profile("mock")
    public Service helloWorldMock() {
        return mock(Service.class);
    }
}
```

同样，我们激活_mock_ profile的测试类：

```java
@SpringBootTest(classes = { Application.class, ProfileConfig.class, Endpoint.class, ProfileTestConfig.class })
@AutoConfigureMockMvc
@ActiveProfiles("mock")
class ProfileIntegrationMockTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Service service;

    @Test
    void givenConfigurationWithProfile_whenTestProfileIsActive_thenMockOk() throws Exception {
        when(service.helloWorld()).thenReturn("hello profile mock");
        this.mockMvc.perform(get("/hello"))
          .andExpect(status().isOk())
          .andExpect(content().string(containsString("hello profile mock")));
    }
}
```

值得注意的是，这与_@MockBean_的工作方式类似。然而，我们使用_@Autowired_注解将Bean注入测试类。与存根相比，这种方法更加灵活，将允许我们直接在测试用例中使用_when/then_语法。

## 6. 结论

在本教程中，我们学习了如何在Spring集成测试期间覆盖一个Bean。

我们看到了如何使用_@MockBean_。此外，我们使用_@Profile_或_@ConditionalOnProperty_创建了主配置，以便在测试期间在不同的Beans之间切换。我们还看到了如何使用_@Primary_给测试Bean更高的优先级。

最后，我们看到了使用_spring.main.allow-bean-definition-overriding_的简单解决方案，覆盖了主配置Bean。

如往常一样，本文中展示的代码可以在GitHub上找到。
--- 

OK