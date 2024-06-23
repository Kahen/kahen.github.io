---
date: 2024-01-20
category:
  - Spring
  - WebFlux
tag:
  - Spring WebClient
  - JSON
  - Custom Deserialization
head:
  - - meta
    - name: keywords
      content: Spring WebClient, JSON, Custom Deserialization, Tutorial
---
# 使用Spring WebClient自定义JSON反序列化

在本文中，我们将探讨自定义反序列化的需求以及如何使用Spring WebClient实现它。

## 2. 为什么我们需要自定义反序列化？

Spring WebFlux模块中的Spring WebClient通过_Encoder_和_Decoder_组件处理序列化和反序列化。_Encoder_和_Decoder_作为接口存在，代表读取和写入内容的合同。默认情况下，spring-core模块提供了_byte_[]、_ByteBuffer_、_DataBuffer_、_Resource_和_String_编码器和解码器实现。

Jackson是一个库，使用_ObjectMapper_提供辅助实用程序，将Java对象序列化为JSON，并将JSON字符串反序列化为Java对象。_ObjectMapper_包含可以打开/关闭的内置配置，使用反序列化特性。

**当Jackson库提供的默认行为不能满足我们的特定需求时，自定义反序列化过程变得必要。** 为了在序列化/反序列化期间修改行为，ObjectMapper提供了我们可以设置的一系列配置。因此，我们必须将此自定义_ObjectMapper_注册到Spring WebClient中，以便在序列化和反序列化中使用。

## 3. 如何自定义Object Mappers？

**自定义_ObjectMapper_可以与_WebClient_在全局应用程序级别链接，也可以与特定请求关联。**

让我们探索一个提供客户订单详情的_GET_端点的简单API。在本文中，我们将考虑一些订单响应中的属性，这些属性需要为我们应用程序的特定功能进行自定义反序列化。

让我们看看_OrderResponse_模型：

```json
{
  "orderId": "a1b2c3d4-e5f6-4a5b-8c9d-0123456789ab",
  "address": [
    "123 Main St",
    "Apt 456",
    "Cityville"
  ],
  "orderNotes": [
    "Special request: Handle with care",
    "Gift wrapping required"
  ],
  "orderDateTime": "2024-01-20T12:34:56"
}
```

上述客户响应的一些反序列化规则将是：

- 如果客户订单响应包含未知属性，我们应使反序列化失败。我们将在_ObjectMapper_中将_FAIL_ON_UNKNOWN_PROPERTIES_属性设置为_true_。
- 我们还将为反序列化目的向映射器添加_JavaTimeModule_，因为_OrderDateTime_是一个_LocalDateTime_对象。

## 4. 使用全局配置自定义反序列化

要使用全局配置进行反序列化，我们需要注册自定义_ObjectMapper_ bean：

```java
@Bean
public ObjectMapper objectMapper() {
    return new ObjectMapper()
      .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, true)
      .registerModule(new JavaTimeModule());
}
```

**一旦注册了这个_ObjectMapper_ bean，它将自动与_CodecCustomizer_关联以自定义应用程序_WebClient_相关的编码器和解码器。** 因此，它确保应用程序级别的任何请求或响应都相应地进行序列化和反序列化。

让我们定义一个带有调用外部服务以检索订单详情的_GET_端点的控制器：

```java
@GetMapping(value = "v1/order/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
public Mono``<OrderResponse>`` searchOrderV1(@PathVariable(value = "id") int id) {
    return externalServiceV1.findById(id)
      .bodyToMono(OrderResponse.class);
}
```

检索订单详情的外部服务将使用_WebClient.Builder_：

```java
public ExternalServiceV1(WebClient.Builder webclientBuilder) {
    this.webclientBuilder = webclientBuilder;
}

public WebClient.ResponseSpec findById(int id) {
    return webclientBuilder.baseUrl("http://localhost:8090/")
      .build()
      .get()
      .uri("external/order/" + id)
      .retrieve();
}
```

Spring reactive自动使用自定义_ObjectMapper_解析检索到的JSON响应。

让我们添加一个简单的测试，使用_MockWebServer_模拟外部服务响应，并包含额外的属性，这应该会导致请求失败：

```java
@Test
void givenMockedExternalResponse_whenSearchByIdV1_thenOrderResponseShouldFailBecauseOfUnknownProperty() {

    mockExternalService.enqueue(new MockResponse().addHeader("Content-Type", "application/json; charset=utf-8")
      .setBody("""
        {
          "orderId": "a1b2c3d4-e5f6-4a5b-8c9d-0123456789ab",
          "orderDateTime": "2024-01-20T12:34:56",
          "address": [
            "123 Main St",
            "Apt 456",
            "Cityville"
          ],
          "orderNotes": [
            "Special request: Handle with care",
            "Gift wrapping required"
          ],
          "customerName": "John Doe",
          "totalAmount": 99.99,
          "paymentMethod": "Credit Card"
        }
        """)
      .setResponseCode(HttpStatus.OK.value()));

    webTestClient.get()
      .uri("v1/order/1")
      .exchange()
      .expectStatus()
      .is5xxServerError();
}
```

外部服务的响应包含额外的属性（_customerName_、_totalAmount_、_paymentMethod_），这导致测试失败。

## 5. 使用WebClient Exchange Strategies Config自定义反序列化

**在某些情况下，我们可能只想为特定请求配置一个_ObjectMapper_，那么我们需要将映射器与_ExchangeStrategies_注册。**

让我们假设上述示例中接收到的日期格式不同，并包括偏移量。

我们将添加一个_CustomDeserializer_，它将解析接收到的_OffsetDateTime_并将其转换为模型_LocalDateTime_在UTC_：

```java
public class CustomDeserializer extends LocalDateTimeDeserializer {
    @Override
    public LocalDateTime deserialize(JsonParser jsonParser, DeserializationContext ctxt) throws IOException {
      try {
        return OffsetDateTime.parse(jsonParser.getText())
        .atZoneSameInstant(ZoneOffset.UTC)
        .toLocalDateTime();
      } catch (Exception e) {
          return super.deserialize(jsonParser, ctxt);
      }
    }
}
```

在新的ExternalServiceV2实现中，让我们声明一个新的_ObjectMapper_，它与上述_CustomDeserializer_链接，并使用_ExchangeStrategies_注册一个新的_WebClient_：

```java
public WebClient.ResponseSpec findById(int id) {

    ObjectMapper objectMapper = new ObjectMapper().registerModule(new SimpleModule().addDeserializer(LocalDateTime.class, new CustomDeserializer()));

    WebClient webClient = WebClient.builder()
      .baseUrl("http://localhost:8090/")
      .exchangeStrategies(ExchangeStrategies.builder()
      .codecs(clientDefaultCodecsConfigurer -> {
        clientDefaultCodecsConfigurer.defaultCodecs()
        .jackson2JsonEncoder(new Jackson2JsonEncoder(objectMapper, MediaType.APPLICATION_JSON));
        clientDefaultCodecsConfigurer.defaultCodecs()
        .jackson2JsonDecoder(new Jackson2JsonDecoder(objectMapper, MediaType.APPLICATION_JSON));
      })
      .build())
    .build();

    return webClient.get().uri("external/order/" + id).retrieve();
}
```

我们已经将这个_ObjectMapper_专门链接到特定的API请求，它不会应用于应用程序中的任何其他请求。接下来，让我们添加一个_GET /v2_端点，它将使用上述findById实现以及特定的_ObjectMapper_调用外部服务：

```java
@GetMapping(value = "v2/order/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
public final Mono``<OrderResponse>`` searchOrderV2(@PathVariable(value = "id") int id) {
    return externalServiceV2.findById(id)
      .bodyToMono(OrderResponse.class);
}
```

最后，我们将添加一个快速测试，我们传递一个带有偏移的模拟_orderDateTime_，并验证它是否使用_CustomDeserializer_将其转换为UTC：

```java
@Test
void givenMockedExternalResponse_whenSearchByIdV2_thenOrderResponseShouldBeReceivedSuccessfully() {

    mockExternalService.enqueue(new MockResponse().addHeader("Content-Type", "application/json; charset=utf-8")
      .setBody("""
      {
        "orderId": "a1b2c3d4-e5f6-4a5b-8c9d-0123456789ab",
        "orderDateTime": "2024-01-20T14:34:56+01:00",
        "address": [
          "123 Main St",
          "Apt 456",
          "Cityville"
        ],
        "orderNotes": [
          "Special request: Handle with care",
          "Gift wrapping required"
        ]
      }
      """)
      .setResponseCode(HttpStatus.OK.value()));

    OrderResponse orderResponse = webTestClient.get()
      .uri("v2/order/1")
      .exchange()
      .expectStatus()
      .isOk()
      .expectBody(OrderResponse.class)
      .returnResult()
      .getResponseBody();
    assertEquals(UUID.fromString("a1b2c3d4-e5f6-4a5b-8c9d-0123456789ab"), orderResponse.getOrderId());
    assertEquals(LocalDateTime.of(2024, 1, 20, 13, 34, 56)```java
      ), orderResponse.getOrderDateTime());
    assertThat(orderResponse.getAddress()).hasSize(3);
    assertThat(orderResponse.getOrderNotes()).hasSize(2);
}
```

这个测试调用了`/v2`端点，它使用带有`CustomDeserializer`的特定`ObjectMapper`来解析从外部服务接收到的订单详情响应。

## 6. 结论

在本文中，我们探讨了自定义反序列化的需求以及不同的实现方式。我们首先看了为整个应用程序注册映射器，以及为特定请求注册映射器。我们还可以使用相同的配置来实现自定义序列化器。

如往常一样，示例的源代码可以在GitHub上找到。
--- 

OK