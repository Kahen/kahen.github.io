---
date: 2022-04-01
category:
  - Spring Cloud
  - Feign
tag:
  - form-url-encoded
  - POST
  - API
head:
  - - meta
    - name: keywords
      content: Spring Cloud, Feign, form-url-encoded, POST, API
---
# 使用Spring Cloud Feign发送表单编码数据的POST请求

在本教程中，我们将学习如何使用Feign客户端在请求正文中使用表单编码数据进行POST API请求。

## 2. 发送表单编码数据的方式
我们可以通过两种不同的方式来发送POST表单编码数据。我们首先需要创建一个自定义编码器并为我们的Feign客户端配置它：

```java
class FormFeignEncoderConfig {
    @Bean
    public Encoder encoder(ObjectFactory`<HttpMessageConverters>` converters) {
        return new SpringFormEncoder(new SpringEncoder(converters));
    }
}
```

我们将在Feign客户端配置中使用这个自定义类：

```java
@FeignClient(name = "form-client", url = "http://localhost:8085/api",
  configuration = FormFeignEncoderConfig.class)
public interface FormClient {
    // 请求方法
}
```

Feign和bean配置现在已经完成。现在让我们看看请求方法。

### 2.1. 使用POJO
我们将创建一个Java POJO类，其中包含所有表单参数作为成员：

```java
public class FormData {
    int id;
    String name;
    // 构造函数，getter和setter
}
```

我们将这个对象作为POST请求的请求正文传递。

```java
@PostMapping(value = "/form", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
void postFormData(@RequestBody FormData data);
```

让我们验证我们的代码；请求正文应该有_id_和_name_作为表单编码数据：

```java
@Test
public void givenFormData_whenPostFormDataCalled_thenReturnSuccess() {
    FormData formData = new FormData(1, "baeldung");
    stubFor(WireMock.post(urlEqualTo("/api/form"))
      .willReturn(aResponse().withStatus(HttpStatus.OK.value())));

    formClient.postFormData(formData);
    wireMockServer.verify(postRequestedFor(urlPathEqualTo("/api/form"))
      .withHeader("Content-Type", equalTo("application/x-www-form-urlencoded; charset=UTF-8"))
      .withRequestBody(equalTo("name=baeldung&id=1")));
}
```

### 2.2. 使用Map
我们还可以使用_Map_代替POJO类在POST请求正文中发送表单编码数据。

```java
@PostMapping(value = "/form/map", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
void postFormMapData(Map`<String, ?>` data);
```

**注意Map的值应该是‘?’。**

让我们验证我们的代码：

```java
@Test
public void givenFormMap_whenPostFormMapDataCalled_thenReturnSuccess() {
    Map`<String, String>` mapData = new HashMap<>();
    mapData.put("name", "baeldung");
    mapData.put("id", "1");
    stubFor(WireMock.post(urlEqualTo("/api/form/map"))
      .willReturn(aResponse().withStatus(HttpStatus.OK.value())));

    formClient.postFormMapData(mapData);
    wireMockServer.verify(postRequestedFor(urlPathEqualTo("/api/form/map"))
      .withHeader("Content-Type", equalTo("application/x-www-form-urlencoded; charset=UTF-8"))
      .withRequestBody(equalTo("name=baeldung&id=1")));
}
```

## 3. 结论
在本文中，我们看到了如何在请求正文中使用表单编码数据进行POST API请求。

如常，示例的完整源代码可在GitHub上找到。