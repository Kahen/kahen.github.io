---
date: 2024-07-05
category:
  - Spring Boot
  - WebFlux
tag:
  - 异常处理
  - Spring Framework
head:
  - - meta
    - name: keywords
      content: Spring Boot, WebFlux, 自定义异常, RFC7807, ProblemDetail, 异常响应格式
---

# Spring Boot 3 中自定义 WebFlux 异常

## 1. 引言

在本教程中，我们将探索 Spring 框架中的不同错误响应格式。我们还将了解如何使用自定义属性引发和处理 RFC7807 的 _ProblemDetail_，以及如何在 Spring WebFlux 中引发自定义异常。

## 2. Spring Boot 3 中的异常响应格式

让我们了解 Spring Framework 3 默认支持的各种错误响应格式。

默认情况下，Spring Framework 提供了 _DefaultErrorAttributes_ 类，该类实现了 _ErrorAttributes_ 接口，用于在未处理错误发生时生成错误响应。在默认错误的情况下，系统会生成我们可以更仔细检查的 JSON 响应结构：

```
{
    "timestamp": "2023-04-01T00:00:00.000+00:00",
    "status": 500,
    "error": "Internal Server Error",
    "path": "/api/example"
}
```

虽然这个错误响应包含了一些关键属性，但在调查问题时可能并不十分有用。幸运的是，我们可以通过在我们的 Spring WebFlux 应用程序中创建 _ErrorAttributes_ 接口的自定义实现来修改这种默认行为。

**从 Spring Framework 6 开始，支持 _ProblemDetail_ 表示 RFC7807 规范。_ProblemDetail_ 包括一些定义错误细节的标准属性，还有一个用于自定义的扩展详情选项**。支持的属性如下：

- _type_（字符串）- 标识问题类型的 URI 引用
- _title_（字符串）- 问题类型的简短摘要
- _status_（数字）- HTTP 状态码
- _detail_（字符串）- 应该包含异常的详细信息。
- _instance_（字符串）- 用于标识问题特定原因的 URI 引用。例如，它可以引用导致问题发生的属性。

除了上述标准属性外，《ProblemDetail》还包含一个 _Map`<String, Object>`_，用于添加自定义参数，以提供有关问题的更详细信息。

让我们看一下带有自定义对象 _errors_ 的示例错误响应结构：

```
{
  "type": "https://example.com/probs/email-invalid",
  "title": "Invalid email address",
  "detail": "The email address 'john.doe' is invalid.",
  "status": 400,
  "timestamp": "2023-04-07T12:34:56.789Z",
  "errors": [
    {
      "code": "123",
      "message": "Error message",
      "reference": "https//error/details#123"
    }
  ]
}
```

Spring Framework 还提供了一个名为 _ErrorResponseException_ 的基础实现。这个异常封装了一个 _ProblemDetail_ 对象，它生成了有关发生错误的附加信息。我们可以扩展这个异常来自定义和添加属性。

## 3. 如何实现 RFC 7807 的 _ProblemDetail_ 异常

尽管 Spring 6+ / Spring Boot 3+ 应用程序默认支持 _ProblemDetail_ 异常，但我们需要通过以下方式之一启用它。

### 3.1. 通过属性文件启用 _ProblemDetail_ 异常

可以通过添加属性来启用 _ProblemDetail_ 异常：

```
spring:
  mvc:
    problemdetails:
      enabled: true
```

### 3.2. 通过添加异常处理器启用 _ProblemDetail_ 异常

也可以通过扩展 _ResponseEntityExceptionHandler_ 并添加自定义异常处理器（即使没有任何覆盖）来启用 _ProblemDetail_ 异常：

```
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    //...
}
```

我们将在本文中使用这种方法，因为我们需要添加自定义异常处理器。

### 3.3. 实现 _ProblemDetail_ 异常

让我们通过考虑一个简单的应用程序来检查如何使用自定义属性引发和处理 _ProblemDetail_ 异常，该应用程序提供了一些用于创建和检索 _User_ 信息的端点。

我们的控制器有一个 _GET /v1/users/{userId}_ 端点，根据提供的 _userId_ 检索用户信息。如果找不到任何记录，代码将抛出一个名为 _UserNotFoundException_ 的简单自定义异常：

```
@GetMapping("/v1/users/{userId}")
public Mono`<ResponseEntity<User>`> getUserById(@PathVariable Long userId) {
    return Mono.fromCallable(() -> {
        User user = userMap.get(userId);
        if (user == null) {
            throw new UserNotFoundException("User not found with ID: " + userId);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    });
}
```

我们的 _UserNotFoundException_ 扩展了 _RunTimeException_：

```
public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String message) {
        super(message);
    }
}
```

由于我们有一个扩展了 _ResponseEntityExceptionHandler_ 的 _GlobalExceptionHandler_ 自定义处理器，《ProblemDetail》成为默认的异常格式。为了测试这一点，我们可以尝试使用不支持的 HTTP 方法（例如 POST）访问应用程序，以查看异常格式。

当抛出 _MethodNotAllowedException_ 时，《ResponseEntityExceptionHandler》将处理异常，并以 _ProblemDetail_ 格式生成响应：

```
curl --location --request POST 'localhost:8080/v1/users/1'
```

这将得到 _ProblemDetail_ 对象作为响应：

```
{
    "type": "about:blank",
    "title": "Method Not Allowed",
    "status": 405,
    "detail": "Supported methods: [GET]",
    "instance": "/users/1"
}
```

### 3.4. 在 Spring WebFlux 中使用自定义属性扩展 _ProblemDetail_ 异常

让我们通过为 _UserNotFoundException_ 提供一个异常处理器来扩展示例，该处理器向 _ProblemDetail_ 响应中添加了一个自定义对象。

_ProblemDetail_ 对象包含一个 _properties_ 属性，它接受一个 _String_ 作为键，值可以是任何 _Object_。

我们将添加一个名为 _ErrorDetails_ 的自定义对象。此对象包含错误代码和消息，以及一个带有有关解决此问题的附加详细信息和说明的错误引用 URL：

```
@JsonSerialize(using = ErrorDetailsSerializer.class)
public enum ErrorDetails {
    API_USER_NOT_FOUND(123, "User not found", "http://example.com/123");
    @Getter
    private Integer errorCode;
    @Getter
    private String errorMessage;
    @Getter
    private String referenceUrl;

    ErrorDetails(Integer errorCode, String errorMessage, String referenceUrl) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.referenceUrl = referenceUrl;
    }
}
```

为了覆盖 _UserNotException_ 的错误行为，我们需要在 _GlobalExceptionHandler_ 类中提供一个错误处理器。此处理器应设置 _ErrorDetails_ 对象的 _API_USER_NOT_FOUND_ 属性，以及 _ProblemDetail_ 对象提供的任何其他错误详情：

```
@ExceptionHandler(UserNotFoundException.class)
protected ProblemDetail handleNotFound(RuntimeException ex) {
    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
    problemDetail.setTitle("User not found");
    problemDetail.setType(URI.create("https://example.com/problems/user-not-found"));
    problemDetail.setProperty("errors", List.of(ErrorDetails.API_USER_NOT_FOUND));
    return problemDetail;
}
```

我们还需要一个 _ErrorDetailsSerializer_ 和 _ProblemDetailSerializer_ 来自定义响应格式。

_ErrorDetailsSerializer_ 负责使用错误代码、错误消息和引用详细信息格式化我们的自定义错误对象：

```
public class ErrorDetailsSerializer extends JsonSerializer`<ErrorDetails>` {
    @Override
    public void serialize(ErrorDetails value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeStartObject();
        gen.writeStringField("code", value.getErrorCode().toString());
        gen.writeStringField("message", value.getErrorMessage());
        gen.writeStringField("reference", value.getReferenceUrl());
        gen.writeEndObject();
    }
}
```

_ProblemDetailSerializer_ 负责格式化整体 _ProblemDetail_ 对象以及自定义对象（借助 _ErrorDetailsSerializer_）：

```
public class ProblemDetailsSerializer extends JsonSerializer`<ProblemDetail>` {

    @Override
    public void serialize(ProblemDetail value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeStartObject();
        gen.writeObjectField("type", value.getType());
        gen.writeObjectField("title", value.getTitle());
        gen.writeObjectField("status", value.getStatus());
        gen.writeObjectField("detail", value.getDetail());
        gen.writeObjectField("instance", value.getInstance());
        gen.writeObjectField("errors", value.getProperties().get("errors"));
        gen.writeEndObject();
    }
}
```

现在，当我们尝试使用无效的 _userId_ 访问端点时，我们应该收到带有我们自定义属性的错误消息：

```
$ curl --location 'localhost:8080/v1/users/1'
```

这将得到带有自定义属性的 _ProblemDetail_ 对象：

```
{
  "type": "https://example.com