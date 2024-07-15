---
date: 2024-07-15
category:
  - Java
  - Spring Cloud
tag:
  - Feign
  - Exception Handling
head:
  - - meta
    - name: keywords
      content: Feign, 异常处理, 微服务
---
# Feign 客户端异常处理

在本教程中，我们将演示如何在 Feign 中处理异常。Feign 是微服务开发者的强大工具，它支持 **_ErrorDecoder_ 和 _FallbackFactory_ 用于异常处理**。

## **2. Maven 依赖**

首先，让我们通过包含 _spring-cloud-starter-openfeign_ 创建一个 Spring Boot 项目。**_spring-cloud-starter-openfeign_ 包含了它内部的 _feign-core_ 依赖**：

```xml
``<dependency>``
    ``<groupId>``org.springframework.cloud``</groupId>``
    ``<artifactId>``spring-cloud-starter-openfeign``</artifactId>``
    ``<version>``3.1.3``</version>``
``</dependency>``
```

或者我们可以将 _feign-core_ 依赖添加到我们的 _pom.xml_ 文件中：

```xml
``<dependency>``
    ``<groupId>``io.github.openfeign``</groupId>``
    ``<artifactId>``feign-core``</artifactId>``
    ``<version>``11.9.1``</version>``
``</dependency>``
```

## **3. 使用 _ErrorDecoder_ 处理异常**

我们可以通过配置 _ErrorDecoder_ 来 **处理异常**，它还允许我们在需要时自定义消息。当发生错误时，Feign 客户端会抑制原始消息。为了检索它，我们可以编写自定义的 _ErrorDecoder_。让我们覆盖默认的 _ErrorDecoder_ 实现：

```java
public class RetreiveMessageErrorDecoder implements ErrorDecoder {
    private final ErrorDecoder errorDecoder = new Default();
    @Override
    public Exception decode(String methodKey, Response response) {
        ExceptionMessage message = null;
        try (InputStream bodyIs = response.body().asInputStream()) {
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

在上面的编码器中，我们覆盖了默认行为以获得对异常的更多控制。

## **4. 使用 _Fallback_ 处理异常**

我们还可以通过配置 _fallback_ 来处理异常。让我们首先创建一个客户端并配置 _fallback_：

```java
@FeignClient(name = "file", url = "http://localhost:8081",
  configuration = FeignSupportConfig.class, fallback = FileUploadClientWithFallbackImpl.class)
public interface FileUploadClientWithFallBack {
    @PostMapping(value = "/upload-error", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    String fileUpload(@RequestPart(value = "file") MultipartFile file);
}
```

现在，让我们创建 _FileUploadClientWithFallbackImpl_ 根据我们的要求处理异常：

```java
@Component
public class FileUploadClientWithFallbackImpl implements FileUploadClientWithFallBack {
    @Override
    public String fileUpload(MultipartFile file) {
        try {
            throw new NotFoundException("hi, something wrong");
        } catch (Exception ex) {
            if (ex instanceof BadRequestException) {
                return "Bad Request!!!";
            }
            if (ex instanceof NotFoundException) {
                return "Not Found!!!";
            }
            if (ex instanceof Exception) {
                return "Exception!!!";
            }
            return "Successfully Uploaded file!!!";
        }
    }
}
```

现在让我们创建一个简单的测试来验证 _fallback_ 选项：

```java
@Test(expected = NotFoundException.class)
public void whenFileUploadClientFallback_thenFileUploadError() throws IOException {
    ClassLoader classloader = Thread.currentThread().getContextClassLoader();
    File file = new File(classloader.getResource(FILE_NAME).getFile());
    Assert.assertTrue(file.exists());
    FileInputStream input = new FileInputStream(file);
    MultipartFile multipartFile = new MockMultipartFile("file", file.getName(), "text/plain",
      IOUtils.toByteArray(input));
    uploadService.uploadFileWithFallback(multipartFile);
}
```

## **5. 使用 _FallbackFactory_ 处理异常**

我们还可以通过配置 _FallbackFactory_ 来处理异常。让我们首先创建一个客户端并配置 _FallbackFactory_：

```java
@FeignClient(name = "file", url = "http://localhost:8081",
  configuration = FeignSupportConfig.class, fallbackFactory = FileUploadClientFallbackFactory.class)
public interface FileUploadClient {
    @PostMapping(value = "/upload-file", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    String fileUpload(@RequestPart(value = "file") MultipartFile file);
}
```

现在，让我们创建 _FileUploadClientFallbackFactory_ 根据我们的要求处理异常：

```java
@Component
public class FileUploadClientFallbackFactory implements FallbackFactory`<FileUploadClient>` {
    @Override
    public FileUploadClient create(Throwable cause) {
        return new FileUploadClient() {
            @Override
            public String fileUpload(MultipartFile file) {
                if (cause instanceof BadRequestException) {
                    return "Bad Request!!!";
                }
                if (cause instanceof NotFoundException) {
                    return "Not Found!!!";
                }
                if (cause instanceof Exception) {
                    return "Exception!!!";
                }
                return "Successfully Uploaded file!!!";
            }
        };
    }
}
```

现在让我们创建一个简单的测试来验证 _FallbackFactory_ 选项：

```java
@Test(expected = NotFoundException.class)
public void whenFileUploadClientFallbackFactory_thenFileUploadError() throws IOException {
    ClassLoader classloader = Thread.currentThread().getContextClassLoader();
    File file = new File(classloader.getResource(FILE_NAME).getFile());
    Assert.assertTrue(file.exists());
    FileInputStream input = new FileInputStream(file);
    MultipartFile multipartFile = new MockMultipartFile("file", file.getName(), "text/plain",
      IOUtils.toByteArray(input));
    uploadService.uploadFileWithFallbackFactory(multipartFile);
}
```

## **6. 结论**

在本文中，我们展示了如何在 Feign 中处理异常。

如往常一样，本教程中使用的所有代码示例都可以在 GitHub 上找到。