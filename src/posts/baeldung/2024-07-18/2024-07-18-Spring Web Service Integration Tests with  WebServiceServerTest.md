---
date: 2024-07-18
category:
  - Spring Boot
  - Web Services
tag:
  - Spring Web Services
  - Integration Testing
head:
  - - meta
    - name: keywords
      content: Spring Web Service Integration Tests, @WebServiceServerTest, Spring Boot, Web Services Testing
------
# Spring Web Service 集成测试与 @WebServiceServerTest

## 1. 引言

在本文中，我们将看到如何为使用 Spring Boot 构建的 SOAP Web 服务编写集成测试。

我们已经知道如何为应用程序类编写单元测试，并且我们已经在我们的 Spring Boot 测试教程中涵盖了一般的测试概念。因此，这里我们将专注于**仅使用 _@WebServiceServerTest_ 进行 Web 服务层的集成测试**。

## 2. 测试 Spring Web 服务

在 Spring Web 服务中，端点是服务器端服务实现的关键概念。专门的 _@Endpoint_ 注解将被注释的类标记为 Web 服务端点。重要的是，这些**端点负责接收 XML 请求消息，调用所需的业务逻辑，并返回结果作为响应消息**。

### 2.1. Spring Web 服务测试支持

为了测试这些端点，我们可以通过传入所需的参数或模拟对象轻松创建单元测试。然而，主要的缺点是这实际上并不测试通过线路发送的 XML 消息的内容。替代方法是**创建集成测试以验证消息的 XML 内容**。

Spring Web Services 2.0 引入了对这些端点的集成测试支持。**提供此支持的核心类是 _MockWebServiceClient_**。它提供了一个流畅的 API，用于将 XML 消息发送到 Spring 应用程序上下文中配置的适当端点。此外，我们可以设置响应期望，验证响应 XML，并对我们的端点进行全面的集成测试。

然而，这需要启动整个应用程序上下文，这会减慢测试执行。这通常是不可取的，特别是如果我们希望为特定的 Web 服务端点创建快速和隔离的测试。

### 2.2. Spring Boot _@WebServiceServerTest_

Spring Boot 2.6 通过 _@WebServiceServerTest_ 注解扩展了 Web 服务测试支持。

我们可以使用它来进行**仅关注 Web 服务层的测试，而不是加载整个应用程序上下文**。换句话说，我们可以创建一个测试切片，其中只包含所需的 _@Endpoint_ beans，并且我们可以使用 _@MockBean_ 模拟任何依赖项。

这非常类似于 Spring Boot 已经提供的便捷测试切片注解，如 _@WebMvcTest_, _@DataJpaTest_ 等。

## 3. 设置示例项目

### 3.1. 依赖项

正如我们已经详细涵盖了 Spring Boot Web 服务项目，这里我们只包括我们项目所需的额外测试范围的 spring-ws-test 依赖项：

```
`<dependency>`
    `<groupId>`org.springframework.ws`</groupId>`
    `<artifactId>`spring-ws-test`</artifactId>`
    `<version>`4.0.10`</version>`
    `<scope>`test`</scope>`
`</dependency>`
```

### 3.2. 示例 Web 服务

接下来，让我们创建一个简单的服务，用于返回指定产品 ID 的一些产品数据：

```java
@Endpoint
public class ProductEndpoint {

    @Autowired
    private ProductRepository productRepository;

    @ResponsePayload
    public GetProductResponse getProduct(@RequestPayload GetProductRequest request) {
        GetProductResponse response = new GetProductResponse();
        response.setProduct(productRepository.findProduct(request.getId()));
        return response;
    }
}
```

在这里，我们用 _@Endpoint_ 注解了 _ProductEndpoint_ 组件，这将其注册为处理适当的 XML 请求。

_getProduct_ 方法接收请求对象，并从存储库获取产品数据，然后返回响应。存储库的细节在这里不重要。在我们的案例中，我们可以使用一个简单的内存实现来保持应用程序的简单性，并专注于我们的测试策略。

## 4. 端点测试

最后，我们可以创建一个测试切片，并验证 Web 服务层中我们的 XML 消息的正确处理：

```java
@WebServiceServerTest
class ProductEndpointIntegrationTest {

    @Autowired
    private MockWebServiceClient client;

    @MockBean
    private ProductRepository productRepository;

    @Test
    void givenXmlRequest_whenServiceInvoked_thenValidResponse() throws IOException {
        Product product = createProduct();
        when(productRepository.findProduct("1")).thenReturn(product);

        StringSource request = new StringSource(
            "`<bd:getProductRequest xmlns:bd='http://baeldung.com/spring-boot-web-service'>`" +
            "``<bd:id>``1``</bd:id>``" +
            "`</bd:getProductRequest>`"
        );

        StringSource expectedResponse = new StringSource(
            "`<bd:getProductResponse xmlns:bd='http://baeldung.com/spring-boot-web-service'>`" +
            "`<bd:product>`" +
            "``<bd:id>``1``</bd:id>``" +
            "`<bd:name>`Product 1`</bd:name>`" +
            "`</bd:product>`" +
            "`</bd:getProductResponse>`"
        );

        client.sendRequest(withPayload(request))
          .andExpect(noFault())
          .andExpect(validPayload(new ClassPathResource("webservice/products.xsd")))
          .andExpect(payload(expectedResponse))
          .andExpect(xpath("/bd:getProductResponse/bd:product[1]/bd:name", NAMESPACE_MAPPING)
            .evaluatesTo("Product 1"));
    }
}
```

在这里，我们只配置了应用程序中带有 _@Endpoint_ 注解的 beans 用于我们的集成测试。换句话说，**这个测试切片创建了一个减少的应用程序上下文**。这有助于我们构建有针对性的和快速的集成测试，而不需要反复加载整个应用程序上下文所带来的性能损失。

重要的是，**这个注解还配置了一个 _MockWebServiceClient_ 以及其他相关的自动配置**。因此，我们可以将此客户端连接到我们的测试中，并使用它发送 _getProductRequest_ XML 请求，然后是各种流畅的期望。

期望验证响应 XML 符合给定的 XSD 模式，并且与预期的 XML 响应匹配。我们还可以使用 XPath 表达式来评估和比较响应 XML 中的各种值。

### 4.1. 端点协作者

在我们的示例中，我们使用了 _@MockBean_ 来模拟 _ProductEndpoint_ 中所需的存储库。如果没有这个模拟，应用程序上下文无法启动，因为完全自动配置被禁用。换句话说，**测试框架在测试执行之前不会配置任何 _@Component_, _@Service,_ 或 _@Repository_ beans**。

然而，如果我们确实需要实际的协作者而不是模拟对象，那么我们可以声明这些使用 _@Import_。Spring 将查找这些类，然后将它们连接到端点，如所需的。

### 4.2. 加载整个上下文

正如之前提到的，_@WebServiceServerTest_ 不会加载整个应用程序上下文。如果我们确实需要为测试加载整个应用程序上下文，那么我们应该考虑使用 _@SpringBootTest_ 结合 _@AutoConfigureMockWebServiceClient._ 然后我们可以使用这个客户端以类似的方式发送请求并验证响应，如之前所示。

## 5. 结论

在本文中，我们查看了 Spring Boot 中引入的 _@WebServiceServerTest_ 注解。

最初，我们讨论了 Web 服务应用程序中的 Spring Boot 测试支持。随后，我们看到了如何使用此注解为 Web 服务层创建测试切片，这有助于构建快速和专注的集成测试。

像往常一样，完整的源代码可以在 GitHub 上找到。