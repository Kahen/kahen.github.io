---
date: 2024-07-11
category:
  - Spring
  - RestTemplate
tag:
  - URI编码
  - RestTemplate
head:
  - - meta
    - name: keywords
      content: Spring RestTemplate URI编码
------
# Spring的RestTemplate中的URI变量编码

在本教程中，我们将学习如何在Spring的RestTemplate上对URI变量进行编码。

我们面临的一个常见编码问题就是当我们有一个包含加号（+）的URI变量时。例如，如果我们有一个值为_http://localhost:8080/api/v1/plus+sign_的URI变量，加号将被编码为一个空格，这可能导致服务器响应意外。

让我们看看几种解决这个问题的方法。

### 2.1. Spring Web依赖性
首先，让我们将Spring Web Starter依赖性添加到我们的_pom.xml_中：

```xml
`<dependency>`
    `<groupId>`org.springframework.boot`</groupId>`
    `<artifactId>`spring-boot-starter-web`</artifactId>`
`</dependency>`
```

或者，我们可以使用Spring Initializr生成项目并添加依赖性。

### 2.2. RestTemplate Bean
接下来，我们将创建一个RestTemplate Bean：

```java
@Configuration
public class RestTemplateConfig {
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

## 3. API调用
让我们创建一个服务类，调用公共API _http://httpbin.org/get_。

该API返回一个JSON响应，其中包含请求参数。例如，如果我们在浏览器中调用URL _https://httpbin.org/get?parameter=springboot_，我们会得到这样的响应：

```json
{
  "args": {
    "parameter": "springboot"
  },
  "headers": {},
  "origin": "",
  "url": ""
}
```

这里，_args_对象包含请求参数。其他值为了简洁起见省略了。

### 3.1. 服务类
让我们创建一个服务类，调用API并返回_parameter_键的值：

```java
@Service
public class HttpBinService {
    private final RestTemplate restTemplate;

    public HttpBinService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String get(String parameter) {
        String url = "http://httpbin.org/get?parameter={parameter}";
        ResponseEntity`<Map>` response = restTemplate.getForEntity(url, Map.class, parameter);
        Map``<String, String>`` args = (Map``<String, String>``) response.getBody().get("args");
        return args.get("parameter");
    }
}
```

_get()_方法调用指定的URL，将响应解析为_Map_，并检索_args_对象中_field_参数的值。

### 3.2. 测试
让我们用两个参数——_springboot_和_spring+boot_——测试我们的服务类，并检查响应是否符合预期：

```java
@SpringBootTest
class HttpBinServiceTest {
    @Autowired
    private HttpBinService httpBinService;

    @Test
    void givenWithoutPlusSign_whenGet_thenSameValueReturned() throws JsonProcessingException {
        String parameterWithoutPlusSign = "springboot";
        String responseWithoutPlusSign = httpBinService.get(parameterWithoutPlusSign);
        assertEquals(parameterWithoutPlusSign, responseWithoutPlusSign);
    }

    @Test
    void givenWithPlusSign_whenGet_thenSameValueReturned() throws JsonProcessingException {
        String parameterWithPlusSign = "spring+boot";
        String responseWithPlusSign = httpBinService.get(parameterWithPlusSign);
        assertEquals(parameterWithPlusSign, responseWithPlusSign);
    }
}
```

如果我们运行测试，我们将看到第二个测试失败。响应是_spring boot_而不是_spring+boot_。

## 4. 使用RestTemplate的Interceptors
我们可以使用拦截器对URI变量进行编码。

让我们创建一个实现_ClientHttpRequestInterceptor_接口的类：

```java
public class UriEncodingInterceptor implements ClientHttpRequestInterceptor {
    @Override
    public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) throws IOException {
        HttpRequest encodedRequest = new HttpRequestWrapper(request) {
            @Override
            public URI getURI() {
                URI uri = super.getURI();
                String escapedQuery = uri.getRawQuery().replace("+", "%2B");
                return UriComponentsBuilder.fromUri(uri)
                  .replaceQuery(escapedQuery)
                  .build(true).toUri();
            }
        };
        return execution.execute(encodedRequest, body);
    }
}
```

我们已经实现了_intercept()_方法。这个方法将在RestTemplate发出每个请求之前执行。

让我们分解代码：

- 我们创建了一个新的_HttpRequest_对象，它包装了原始请求。
- 对于这个包装器，我们重写了_getURI()_方法以对URI变量进行编码。在这种情况下，我们在查询字符串中将加号替换为_%2B_。
- 使用_UriComponentsBuilder_，我们创建了一个新的_URI_并将查询字符串替换为编码后的查询字符串。
- 我们从_intercept()_方法返回编码后的请求，这将替换原始请求。

### 4.1. 添加拦截器
接下来，我们需要将拦截器添加到RestTemplate Bean中：

```java
@Configuration
public class RestTemplateConfig {
    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setInterceptors(Collections.singletonList(new UriEncodingInterceptor()));
        return restTemplate;
    }
}
```

如果我们再次运行测试，我们将看到它通过了。

**拦截器提供了改变我们想要的请求任何部分的灵活性。**它们对于添加额外的头或对请求中的字段进行更改等复杂场景可能很有帮助。

对于像我们的例子这样的简单任务，我们还可以使用_DefaultUriBuilderFactory_来改变编码。让我们看看如何做到这一点。

## 5. 使用_DefaultUriBuilderFactory_
另一种对URI变量进行编码的方法是通过改变RestTemplate内部使用的_DefaultUriBuilderFactory_对象。

默认情况下，URI构建器首先对整个URL进行编码，然后单独对值进行编码。我们将**创建一个新的_DefaultUriBuilderFactory_对象，并将编码模式设置为_VALUES_ONLY._这限制了仅对值进行编码。**

**然后，我们可以使用_setUriTemplateHandler()_方法将新的_DefaultUriBuilderFactory_对象设置为我们的RestTemplate Bean。**

让我们使用这个来创建一个新的RestTemplate Bean：

```java
@Configuration
public class RestTemplateConfig {
    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        DefaultUriBuilderFactory defaultUriBuilderFactory = new DefaultUriBuilderFactory();
        defaultUriBuilderFactory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.VALUES_ONLY);
        restTemplate.setUriTemplateHandler(defaultUriBuilderFactory);
        return restTemplate;
    }
}
```

这是对URI变量进行编码的另一种选择。同样，如果我们再次运行测试，我们将看到它通过了。

## 6. 结论
在本文中，我们看到了如何在RestTemplate请求中对URI变量进行编码。我们看到了两种方法——使用拦截器和改变_DefaultUriBuilderFactory_对象。

正如往常一样，本文中使用的所有代码示例都可以在GitHub上找到。