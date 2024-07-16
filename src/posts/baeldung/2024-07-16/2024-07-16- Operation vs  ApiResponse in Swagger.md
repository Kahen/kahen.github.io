---
date: 2022-04-01
category:
  - Swagger
  - REST API
tag:
  - Operation
  - ApiResponse
head:
  - - meta
    - name: keywords
      content: Swagger, REST API, Operation, ApiResponse
---
# Swagger中的@Operation与@ApiResponse的区别

在本教程中，我们将讨论Swagger的@Operation和@ApiResponse注解之间的主要区别。

创建REST API时，同样重要的是创建其适当的规范。此外，这样的规范应该是可读的、易于理解的，并提供所有必要的信息。更重要的是，文档应该描述对API所做的每一个更改。手动创建REST API文档既耗时又费时。幸运的是，像Swagger这样的工具可以帮助我们完成这个过程。

Swagger是围绕OpenAPI规范构建的一套开源工具集。它可以帮助我们设计、构建、文档化和使用REST API。

Swagger规范是REST API文档化的标准。使用Swagger规范，我们可以描述我们的整个API，例如公开的端点、操作、参数、认证方法等。

Swagger提供了各种注解，可以帮助我们文档化REST API。此外，它提供了@Operation和@ApiResponse注解来文档化我们REST API的响应。在本教程的其余部分，我们将使用下面的控制器类，并看看如何使用这些注解：

```java
@RestController
@RequestMapping("/customers")
class CustomerController {

   private final CustomerService customerService;

   public CustomerController(CustomerService customerService) {
       this.customerService = customerService;
   }

   @GetMapping("/{id}")
   public ResponseEntity`````<CustomerResponse>````` getCustomer(@PathVariable("id") Long id) {
       return ResponseEntity.ok(customerService.getById(id));
   }
}
```

@Operation注解用于描述单个操作。操作是路径和HTTP方法的唯一组合。

此外，使用@Operation，我们可以描述成功的REST API调用的结果。换句话说，我们可以使用这个注解来指定通用的返回类型。

让我们将注解添加到我们的方法中：

```java
@Operation(summary = "通过ID获取客户",
           description = "客户必须存在")
@GetMapping("/{id}")
public ResponseEntity`````<CustomerResponse>````` getCustomer(@PathVariable("id") Long id) {
    return ResponseEntity.ok(customerService.getById(id));
}
```

接下来，我们将介绍@Operation中最常用的一些属性。

### 3.1. summary属性

必需的summary属性包含操作的摘要字段。简单来说，它提供了操作的简短描述。然而，我们应该保持这个参数不超过120个字符。

以下是我们在@Operation注解中定义摘要属性的方式：

```java
@Operation(summary= "通过ID获取客户")
```

### 3.2. description属性

使用description，我们可以提供有关操作的更多细节。例如，我们可以放置一段描述端点限制的文本：

```java
@Operation(summary= "通过ID获取客户", description= "客户必须存在")
```

### 3.3. hidden属性

hidden属性表示此操作是否被隐藏。

### 4. @ApiResponse

使用HTTP状态码返回错误是一种常见做法。我们可以使用@ApiResponse注解来描述操作的具体可能响应。

**虽然@Operation注解描述了操作和通用返回类型，但@ApiResponse注解描述了其余可能的返回代码。**

此外，注解可以应用于方法级别以及类级别。此外，如果方法级别上已经定义了具有相同代码的@ApiResponse注解，则只会解析类级别的注解。换句话说，方法注解优先于类注解。

**我们应该在@ApiResponses注解中使用@ApiResponse注解，无论我们有一个或多个响应。**如果我们直接使用这个注解，它将不会被Swagger解析。

让我们在方法上定义@ApiResponses和@ApiResponse注解：

```java
@ApiResponses(value = {
        @ApiResponse(responseCode = 400, description = "提供的ID无效"),
        @ApiResponse(responseCode = 404, description = "客户未找到")})
@GetMapping("/{id}")
public ResponseEntity`````<CustomerResponse>````` getCustomer(@PathVariable("id") Long id) {
    return ResponseEntity.ok(customerService.getById(id));
}
```

我们可以使用注解来指定成功响应：

```java
@Operation(summary = "通过ID获取客户", description = "客户必须存在")
@ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Ok", content =
          { @Content(mediaType = "application/json", schema =
            @Schema(implementation = CustomerResponse.class)) }),
        @ApiResponse(responseCode = "400", description = "提供的ID无效"),
        @ApiResponse(responseCode = "404", description = "客户未找到"),
        @ApiResponse(responseCode = "500", description = "内部服务器错误", content =
          { @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class)) }) })
@GetMapping("/{id}")
public ResponseEntity`````<CustomerResponse>````` getCustomer(@PathVariable("id") Long id) {
    return ResponseEntity.ok(customerService.getById(id));
}
```

现在，让我们介绍@ApiResponse中使用的一些属性。

### 4.1. responseCode和description属性

responseCode和description属性都是@ApiResponse注解中必需的参数。重要的是要提到我们不能定义具有相同代码属性的多个@ApiResponse。

消息属性通常包含与响应一起的可读消息：

```java
@ApiResponse(responseCode = 400, message = "提供的ID无效")
```

### 4.2. content属性

有时，端点使用不同的响应类型。例如，我们可以为成功响应使用一种类型，为错误响应使用另一种类型。我们可以使用可选的content属性通过将响应类作为模式来描述它们。

首先，我们定义一个类，该类将在内部服务器错误的情况下返回：

```java
class ErrorResponse {

    private String error;
    private String message;

    // getters and setters
}
```

其次，我们为内部服务器错误添加一个新的@ApiResponse：

```java
@Operation(summary = "通过ID获取客户", description = "客户必须存在")
@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "提供的ID无效"),
        @ApiResponse(responseCode = "404", description = "客户未找到"),
        @ApiResponse(responseCode = "500", description = "内部服务器错误",
          content = { @Content(mediaType = "application/json",
          schema = @Schema(implementation = ErrorResponse.class)) }) })
@GetMapping("/{id}")
public ResponseEntity`````<CustomerResponse>````` getCustomer(@PathVariable("id") Long id) {
    return ResponseEntity.ok(customerService.getById(id));
}
```

### 5. @Operation和@ApiResponse之间的差异

总之，下表显示了@Operation和@ApiResponse注解之间的主要差异：

| @Operation | @ApiResponse |
| --- | --- |
| 用于描述操作 | 用于描述操作的可能响应 |
| 用于成功响应 | 用于成功和错误响应 |
| 只能在方法级别定义 | 可以在方法或类级别定义 |
| 可以直接使用 | 只能在@ApiResponses注解中使用 |

### 6. 结论

在本文中，我们学习了@Operation和@ApiResponse注解之间的差异。

如常，示例的源代码可在GitHub上获得。