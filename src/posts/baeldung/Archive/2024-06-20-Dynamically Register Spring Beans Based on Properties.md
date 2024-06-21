---
date: 2024-06-21
category:
  - Spring
  - Java
tag:
  - Spring Beans
  - Dynamic Registration
head:
  - - meta
    - name: keywords
      content: Spring, Beans, Dynamic Registration, Properties

---
# 基于属性动态注册Spring Bean

## 1. 概述

在本教程中，我们将探讨如何根据自定义属性动态注册Bean。我们将探索_BeanDefinitionRegistryPostProcessor_接口以及我们如何使用它来向应用程序上下文中添加Bean。

## 2. 代码设置

让我们先创建一个简单的Spring Boot应用程序。

首先，我们将定义一个我们想要动态注册的Bean。然后，**我们将提供一个属性来决定如何注册Bean**。最后，我们将定义一个配置类，根据我们的自定义属性来注册Bean。

### 2.1. 依赖项

让我们首先添加Maven依赖项：

```xml
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter``</artifactId>``
    ``<version>``3.2.3``</version>``
``</dependency>``
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-test``</artifactId>``
    ``<version>``3.2.3``</version>``
    `<scope>`test`</scope>`
``</dependency>``
```

我们需要添加_spring-boot-starter_和_spring-boot-starter-test_依赖项。

### 2.2. Bean类

接下来，我们定义一个我们想要根据自定义应用程序属性注册的API客户端：

```java
public class ApiClient {
    private String name;
    private String url;
    private String key;
    // 标准getter, setter和构造函数

    public String getConnectionProperties() {
        return "Connecting to " + name + " at " + url;
    }
}
```

假设我们想使用这个Bean连接到不同的API，根据我们提供的属性。我们不想为每个API创建类定义。相反，我们想要定义属性并为每个API动态注册Bean。

**我们不应该用_@Component_或_@Service_注解_ApiClient_类，因为我们不想使用组件扫描来注册它作为Bean。**

### 2.3. 属性

让我们添加一个属性，决定Bean应该为哪些API注册。我们将在_application.yml_文件中定义这个属性：

```yaml
api:
  clients:
    - name: example
      url: https://api.example.com
      key: 12345
    - name: anotherexample
      url: https://api.anotherexample.com
      key: 67890
```

在这里，我们定义了两个客户端及其各自的属性。我们将在注册Bean时使用这些属性。

## 3. 动态注册Bean

Spring提供了一种使用_BeanDefinitionRegistryPostProcessor_接口动态注册Bean的方式。**这个接口允许我们在注解的Bean定义注册后添加或修改Bean定义。**由于它发生在Bean实例化之前，因此在应用程序上下文完全初始化之前，Bean就已经注册了。

### 3.1. _BeanDefinitionRegistryPostProcessor_

让我们定义一个配置类，将根据自定义属性**注册_ApiClient_ Bean**：

```java
public class ApiClientConfiguration implements BeanDefinitionRegistryPostProcessor {
    private static final String API_CLIENT_BEAN_NAME = "apiClient_";
    List`<ApiClient>` clients;

    public ApiClientConfiguration(Environment environment) {
        Binder binder = Binder.get(environment);
        List`<HashMap>` properties = binder.bind("api.clients", Bindable.listOf(HashMap.class)).get();
        clients = properties.stream().map(client -> new ApiClient(
                String.valueOf(client.get("name")),
                String.valueOf(client.get("url")),
                String.valueOf(client.get("key"))
        )).toList();
    }

    @Override
    public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry) throws BeansException {
        clients.forEach(client -> {
            BeanDefinitionBuilder builder = BeanDefinitionBuilder.genericBeanDefinition(ApiClient.class);
            builder.addPropertyValue("name", client.getName());
            builder.addPropertyValue("url", client.getUrl());
            builder.addPropertyValue("key", client.getKey()); // 注意这里应该是getKey()，原文中可能是个笔误
            registry.registerBeanDefinition(API_CLIENT_BEAN_NAME + client.getName(), builder.getBeanDefinition());
        });
    }

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
    }
}
```

**在这里，我们实现了_BeanDefinitionRegistryPostProcessor_接口。我们重写了_postProcessBeanDefinitionRegistry_方法，该方法负责根据我们的自定义属性注册Bean。**

首先，我们定义了一个常量_API_CLIENT_BEAN_NAME_，它将用作Bean名称的前缀。在构造函数中，我们使用_Binder_ API从_Environment_对象中读取属性。然后，我们使用属性创建_ApiClient_对象。

在实现_postProcessBeanDefinitionRegistry()_方法时，我们遍历属性，并使用_BeanDefinitionRegistry_对象注册_ApiClient_ Bean。

我们使用_BeanDefinitionBuilder_创建Bean。它要求我们定义Bean类。然后，它允许我们使用字段名称逐个设置Bean属性。

**请注意，我们为每个Bean注册了一个唯一名称 - API_CLIENT_BEAN_NAME + client.getName()。这将帮助我们想要从上下文中读取我们选择的Bean时。**

### 3.2. 主应用程序类

最后，我们需要定义主应用程序类，并用_@SpringBootApplication_注解它：

```java
@SpringBootApplication
public class RegistryPostProcessorApplication {
    public static void main(String[] args) {
        SpringApplication.run(RegistryPostProcessorApplication.class, args);
    }

    @Bean
    public ApiClientConfiguration apiClientConfiguration(ConfigurableEnvironment environment) {
        return new ApiClientConfiguration(environment);
    }
}
```

在这里，我们定义了_ApiClientConfiguration_ Bean，并将_ConfigurableEnvironment_对象传递给构造函数。这将帮助我们在_ApiClientConfiguration_类中读取属性。

## 4. 测试

现在Bean已经注册了，**让我们测试一下它们是否具有正确的属性来连接到API。**为此，我们将编写一个简单的测试类：

```java
@SpringBootTest
class ApiClientConfigurationTest {
    @Autowired
    private ApplicationContext context;

    @Test
    void givenBeansRegistered_whenConnect_thenConnected() {
        ApiClient exampleClient = (ApiClient) context.getBean("apiClient_example");
        Assertions.assertEquals("Connecting to example at https://api.example.com", exampleClient.getConnectionProperties());

        ApiClient anotherExampleClient = (ApiClient) context.getBean("apiClient_anotherexample");
        Assertions.assertEquals("Connecting to anotherexample at https://api.anotherexample.com", anotherExampleClient.getConnectionProperties());
    }
}
```

在这里，我们使用_@SpringBootTest_注解来加载应用程序上下文。然后，我们使用_ApplicationContext_对象使用_getBean()_方法从上下文中获取Bean。_getBean()_方法接受唯一的Bean名称作为参数，并从上下文中返回Bean。

测试检查Bean是否正确注册并设置了正确的连接属性。

## 5. 结论

在本教程中，我们探讨了如何使用_BeanDefinitionRegistryPostProcessor_接口根据自定义属性动态注册Spring Bean。我们还编写了一个简单的测试用例，展示了如何从上下文中检索Bean并使用它们。

如常，示例代码可在GitHub上找到。
OK
