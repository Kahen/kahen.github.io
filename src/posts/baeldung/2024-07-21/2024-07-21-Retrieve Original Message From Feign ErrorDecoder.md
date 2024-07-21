---
date: 2022-04-01
category:
  - Spring Cloud
  - Feign
tag:
  - Feign
  - ErrorDecoder
  - Exception Handling
head:
  - - meta
    - name: keywords
      content: Feign, ErrorDecoder, Exception Handling
------
# 使用Feign ErrorDecoder检索原始消息

## **1. 概述**

RESTful服务可能因多种原因失败。在本教程中，我们将探讨如何在集成REST服务抛出错误时从Feign客户端检索原始消息。

## **2. Feign客户端**

Feign是一个可插拔且声明式的Web服务客户端，它使编写Web服务客户端变得更容易。除了Feign注解外，它还支持JAX-RS，并且支持**编码器和解码器以提供更多定制**。

## **3. 从_ErrorDecoder_检索消息**

当出现错误时，**Feign客户端会抑制原始消息，要检索它，我们需要编写自定义的**_ErrorDecoder_。如果没有这种定制，我们将得到以下错误：
```
feign.FeignException$NotFound: [404] during [POST] to [http://localhost:8080/upload-error-1] [UploadClient#fileUploadError(MultipartFile)]: [{"timestamp":"2022-02-18T13:25:22.083+00:00","status":404,"error":"Not Found","path":"/upload-error-1"}]
	at feign.FeignException.clientErrorStatus(FeignException.java:219) ~[feign-core-11.7.jar:na]
	at feign.FeignException.errorStatus(FeignException.java:194) ~[feign-core-11.7.jar:na]

```

为了处理这个错误，我们将创建一个简单的_ExceptionMessage_ Java bean来表示错误消息：
```
public class ExceptionMessage {
    private String timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
    // 标准getter和setter
}
```

让我们通过在我们的自定义实现中提取它来检索原始消息：
```
public class RetreiveMessageErrorDecoder implements ErrorDecoder {
    private ErrorDecoder errorDecoder = new Default();

    @Override
    public Exception decode(String methodKey, Response response) {
        ExceptionMessage message = null;
        try (InputStream bodyIs = response.body()
            .asInputStream()) {
            ObjectMapper mapper = new ObjectMapper();
            message = mapper.readValue(bodyIs, ExceptionMessage.class);
        } catch (IOException e) {
            return new Exception(e.getMessage());
        }
        switch (response.status()) {
        case 400:
            return new BadRequestException(message.getMessage() != null ? message.getMessage() : "Bad Request");
        case 404:
            return new NotFoundException(message.getMessage() != null ? message.getMessage() : "Not found");
        default:
            return errorDecoder.decode(methodKey, response);
        }
    }
}
```

在我们的实现中，我们根据可能的错误添加了逻辑，因此我们可以定制它们以满足我们的需求。在我们的switch块的默认情况下，我们使用了_ErrorDecoder_的_Default_实现。

_Default_实现在状态不在2xx范围内时解码HTTP响应。当_可抛出_是_可重试异常_的子类型时，它应该是_RetryableException_的子类型，并且我们应该尽可能地引发应用程序特定的异常。

为了配置我们的自定义_ErrorDecoder_，我们将我们的实现作为Feign配置中的bean添加：
```
@Bean
public ErrorDecoder errorDecoder() {
    return new RetreiveMessageErrorDecoder();
}
```

现在，让我们看看带有原始消息的异常：
```
com.baeldung.cloud.openfeign.exception.NotFoundException: Page Not found
	at com.baeldung.cloud.openfeign.fileupload.config.RetreiveMessageErrorDecoder.decode(RetreiveMessageErrorDecoder.java:30) ~[classes/:na]
	at feign.AsyncResponseHandler.handleResponse(AsyncResponseHandler.java:96) ~[feign-core-11.7.jar:na]

```

## **4. 结论**

在本文中，我们展示了如何自定义_ErrorDecoder_，以便我们可以捕获Feign错误以获取原始消息。

像往常一样，本教程中使用的所有代码示例都可以在GitHub上找到。头文件中的category和tag需要根据实际页面内容进行翻译和填充。由于提供的文本中没有具体的category和tag信息，我将根据文章的内容和上下文进行合理的推断和翻译。

---
date: 2022-04-01
category:
  - Spring Cloud
  - Feign
tag:
  - Feign客户端
  - ErrorDecoder
  - 异常处理
head:
  - - meta
    - name: keywords
      content: Feign客户端, ErrorDecoder, 异常处理
------
# 使用Feign ErrorDecoder检索原始消息

## **1. 概述**

RESTful服务可能因多种原因失败。在本教程中，我们将探讨如何在集成REST服务抛出错误时从Feign客户端检索原始消息。

## **2. Feign客户端**

Feign是一个可插拔且声明式的Web服务客户端，它使编写Web服务客户端变得更容易。除了Feign注解外，它还支持JAX-RS，并且支持编码器和解码器以提供更多定制。

## **3. 从_ErrorDecoder_检索消息**

当出现错误时，Feign客户端会抑制原始消息，要检索它，我们需要编写自定义的ErrorDecoder。如果没有这种定制，我们将得到以下错误：

```
feign.FeignException$NotFound: [404] during [POST] to [http://localhost:8080/upload-error-1] [UploadClient#fileUploadError(MultipartFile)]: [{...}]
```

为了处理这个错误，我们将创建一个简单的ExceptionMessage Java bean来表示错误消息：

```java
public class ExceptionMessage {
    private String timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
    // 标准getter和setter
}
```

让我们通过在我们的自定义实现中提取它来检索原始消息：

```java
public class RetrieveMessageErrorDecoder implements ErrorDecoder {
    private ErrorDecoder defaultErrorDecoder = new Default();

    @Override
    public Exception decode(String methodKey, Response response) {
        ExceptionMessage message = null;
        try (InputStream bodyIs = response.body().asInputStream()) {
            ObjectMapper mapper = new ObjectMapper();
            message = mapper.readValue(bodyIs, ExceptionMessage.class);
        } catch (IOException e) {
            return new RuntimeException(e.getMessage());
        }
        switch (response.status()) {
            case 400:
                return new BadRequestException(message.getMessage() != null ? message.getMessage() : "Bad Request");
            case 404:
                return new NotFoundException(message.getMessage() != null ? message.getMessage() : "Not Found");
            default:
                return defaultErrorDecoder.decode(methodKey, response);
        }
    }
}
```

在我们的实现中，我们根据可能的错误添加了逻辑，因此我们可以定制它们以满足我们的需求。在我们的switch块的默认情况下，我们使用了ErrorDecoder的Default实现。

Default实现在状态不在2xx范围内时解码HTTP响应。当可抛出是RetryableException的子类型时，它应该是RetryableException的子类型，并且我们应该尽可能地引发应用程序特定的异常。

为了配置我们的自定义ErrorDecoder，我们将我们的实现作为Feign配置中的bean添加：

```java
@Bean
public ErrorDecoder errorDecoder() {
    return new RetrieveMessageErrorDecoder();
}
```

现在，让我们看看带有原始消息的异常：

```
com.baeldung.cloud.openfeign.exception.NotFoundException: Page Not Found
    at ...
```

## **4. 结论**

在本文中，我们展示了如何自定义ErrorDecoder，以便我们可以捕获Feign错误以获取原始消息。

像往常一样，本教程中使用的所有代码示例都可以在GitHub上找到。

OK