---
date: 2022-04-01
category:
  - Java
  - Jersey
tag:
  - Exception Handling
  - REST API
head:
  - - meta
    - name: keywords
      content: Java, Jersey, REST API, Exception Handling
---
# Jersey中的异常处理

在本教程中，我们将看到使用Jersey处理异常的不同方式，Jersey是JAX-RS的一种实现。

JAX-RS为我们提供了许多处理异常的机制，我们可以选择和组合。处理REST异常是构建更好API的重要步骤。在我们的用例中，我们将构建一个购买股票的API，并看看每个步骤是如何相互影响的。

## 2. 场景设置

我们的最小设置包括创建一个仓库、几个bean和一些端点。它从我们的资源配置开始。在那里，我们将定义我们的起始URL和端点包：

```java
@ApplicationPath("/exception-handling/*")
public class ExceptionHandlingConfig extends ResourceConfig {
    public ExceptionHandlingConfig() {
        packages("com.baeldung.jersey.exceptionhandling.rest");
    }
}
```

### 2.1. Beans

我们只需要两个bean：_Stock_和_Wallet_，这样我们就可以保存_Stock_并购买它们。对于我们的_Stock_，我们只需要一个_price_属性来帮助验证。更重要的是，我们的_Wallet_类将具有验证方法来帮助构建我们的场景：

```java
public class Wallet {
    private String id;
    private Double balance = 0.0;

    // getters and setters

    public Double addBalance(Double amount) {
        return balance += amount;
    }

    public boolean hasFunds(Double amount) {
        return (balance - amount) >= 0;
    }
}
```

### 2.2. 端点

同样，我们的API将有两个端点这些将定义标准的保存和检索我们的bean的方法：

```java
@Path("/stocks")
public class StocksResource {
    // POST和GET方法
}
```

```java
@Path("/wallets")
public class WalletsResource {
    // POST和GET方法
}
```

例如，让我们看看_StocksResource_中的GET方法：

```java
@GET
@Path("/{ticker}")
@Produces(MediaType.APPLICATION_JSON)
public Response get(@PathParam("ticker") String id) {
    Optional``<Stock>`` stock = stocksRepository.findById(id);
    stock.orElseThrow(() -> new IllegalArgumentException("ticker"));

    return Response.ok(stock.get())
      .build();
}
```

在我们的GET方法中，我们抛出了第一个异常。**我们将在稍后处理它，这样我们就可以看到它的效果。**

## 3. 抛出异常时会发生什么？

当未处理的异常发生时，我们可能会暴露有关我们应用程序内部的敏感信息。如果我们尝试使用不存在的_Stock_来调用_StocksResource_中的GET方法，我们会得到一个类似的页面：

![img](https://www.baeldung.com/wp-content/uploads/2022/04/baeldung-5157_default-exception-screen.png)

这个页面显示了应用程序服务器和版本，这可能有助于潜在的攻击者利用漏洞。此外，还有关于我们类名和行号的信息，这也可能有助于攻击者。**最重要的是，这些信息对API用户来说大部分是无用的，并且给人留下不好的印象。**

为了帮助控制异常响应，JAX-RS提供了_ExceptionMapper_和_WebApplicationException_类。让我们看看它们是如何工作的。

## 4. 使用_WebApplicationException_的自定义异常

使用_WebApplicationException_，我们可以创建自定义异常。**这种特殊的_RuntimeException_让我们可以定义响应状态和实体。**我们将通过创建一个设置消息和状态的_InvalidTradeException_来开始：

```java
public class InvalidTradeException extends WebApplicationException {
    public InvalidTradeException() {
        super("invalid trade operation", Response.Status.NOT_ACCEPTABLE);
    }
}
```

同样值得一提的是，JAX-RS为常见的HTTP状态代码定义了_WebApplicationException_的子类。这些包括有用的异常，如_NotAllowedException_、_BadRequestException_等。**但是，当我们想要更复杂的错误消息时，我们可以返回一个JSON响应。**

### 4.1. JSON异常

我们可以创建简单的Java类并将它们包含在我们的_Response_中。在我们的示例中，我们有一个_subject_属性，我们将使用它来包装上下文数据：

```java
public class RestErrorResponse {
    private Object subject;
    private String message;

    // getters and setters
}
```

由于这个异常不打算被操作，我们不会担心_subject_的类型。

### 4.2. 将一切付诸实践

让我们看看如何使用自定义异常，让我们定义一个购买_Stock_的方法：

```java
@POST
@Path("/{wallet}/buy/{ticker}")
@Produces(MediaType.APPLICATION_JSON)
public Response postBuyStock(
  @PathParam("wallet") String walletId, @PathParam("ticker") String id) {
    Optional``<Stock>`` stock = stocksRepository.findById(id);
    stock.orElseThrow(InvalidTradeException::new);

    Optional`<Wallet>` w = walletsRepository.findById(walletId);
    w.orElseThrow(InvalidTradeException::new);

    Wallet wallet = w.get();
    Double price = stock.get()
      .getPrice();

    if (!wallet.hasFunds(price)) {
        RestErrorResponse response = new RestErrorResponse();
        response.setSubject(wallet);
        response.setMessage("insufficient balance");
        throw new WebApplicationException(Response.status(Status.NOT_ACCEPTABLE)
          .entity(response)
          .build());
    }

    wallet.addBalance(-price);
    walletsRepository.save(wallet);

    return Response.ok(wallet)
      .build();
}
```

在这个方法中，我们使用了我们到目前为止创建的所有内容。**我们抛出一个_InvalidTradeException_用于不存在的股票或钱包。**如果资金不足，构建一个包含我们的_Wallet_的_RestErrorResponse_，并将其作为_WebApplicationException_抛出。

### 4.3. 使用案例示例

首先，让我们创建一个_Stock_：

```bash
$ curl 'http://localhost:8080/jersey/exception-handling/stocks' -H 'Content-Type: application/json' -d '{
    "id": "STOCK",
    "price": 51.57
}'

{"id": "STOCK", "price": 51.57}
```

然后是一个_Wallet_来购买它：

```bash
$ curl 'http://localhost:8080/jersey/exception-handling/wallets' -H 'Content-Type: application/json' -d '{
    "id": "WALLET",
    "balance": 100.0
}'

{"balance": 100.0, "id": "WALLET"}
```

之后，我们将使用我们的_Wallet_购买_Stock_：

```bash
$ curl -X POST 'http://localhost:8080/jersey/exception-handling/wallets/WALLET/buy/STOCK'

{"balance": 48.43, "id": "WALLET"}
```

我们将在响应中得到我们的更新余额。此外，如果我们再次尝试购买，我们将得到我们详细的_RestErrorResponse_：

```json
{
    "message": "insufficient balance",
    "subject": {
        "balance": 48.43,
        "id": "WALLET"
    }
}
```

## 5. 使用_ExceptionMapper_处理未处理的异常

需要澄清的是，抛出_WebApplicationException_并不足以摆脱默认错误页面。我们必须为我们的_Response_指定一个实体，对于_InvalidTradeException_来说并非如此。通常，尽管我们尽力处理所有场景，但未处理的异常仍然可能发生。因此，首先处理这些异常是一个好主意。**使用_ExceptionMapper_，我们为特定类型的异常定义捕获点，并在提交之前修改_Response_：**

```java
public class ServerExceptionMapper implements ExceptionMapper`<WebApplicationException>` {
    @Override
    public Response toResponse(WebApplicationException exception) {
        String message = exception.getMessage();
        Response response = exception.getResponse();
        Status status = response.getStatusInfo().toEnum();

        return Response.status(status)
          .entity(status + ": " + message)
          .type(MediaType.TEXT_PLAIN)
          .build();
    }
}
```

例如，我们只是将异常信息重新传递到我们的_Response_中，它将显示我们返回的确切内容。随后，我们可以通过在构建我们的_Response_之前检查状态代码来更进一步：

```java
switch (status) {
    case METHOD_NOT_ALLOWED:
        message = "HTTP METHOD NOT ALLOWED";
        break;
    case INTERNAL_SERVER_ERROR:
        message = "internal validation - " + exception;
        break;
    default:
        message = "[unhandled response code] " + exception;
}
```

### 5.1. 处理特定异常

如果有特定的_Exception_经常被抛出，我们也可以为它创建一个_ExceptionMapper_。**在我们的端点中，我们抛出一个_IllegalArgumentException_进行简单验证，所以让我们从它开始。**这次，用JSON响应：

```java
public class IllegalArgumentExceptionMapper
  implements ExceptionMapper``<IllegalArgumentException>`` {
    @Override
    public Response toResponse(IllegalArgumentException exception) {
        return Response.status(Response.Status.EXPECTATION_FAILED)
          .entity(build(exception.getMessage()))
          .type(MediaType```java
public class IllegalArgumentExceptionMapper
  implements ExceptionMapper``<IllegalArgumentException>`` {
    @Override
    public Response toResponse(IllegalArgumentException exception) {
        return Response.status(Response.Status.EXPECTATION_FAILED)
          .entity(build(exception.getMessage()))
          .type(MediaType.APPLICATION_JSON)
          .build();
    }

    private RestErrorResponse build(String message) {
        RestErrorResponse response = new RestErrorResponse();
        response.setMessage("an illegal argument was provided: " + message);
        return response;
    }
}
```

现在，每当我们的应用程序中发生未处理的_IllegalArgumentException_时，我们的_IllegalArgumentExceptionMapper_将处理它。

### 5.2. 配置

要激活我们的异常映射器，我们必须回到我们的Jersey资源配置并注册它们：

```java
public ExceptionHandlingConfig() {
    // packages ...
    register(IllegalArgumentExceptionMapper.class);
    register(ServerExceptionMapper.class);
}
```

这足以摆脱默认错误页面。**然后，根据抛出的内容，Jersey将在发生未处理的异常时使用我们的一个异常映射器。**例如，当尝试获取不存在的_Stock_时，将使用_IllegalArgumentExceptionMapper_：

```bash
$ curl 'http://localhost:8080/jersey/exception-handling/stocks/NONEXISTENT'

{"message": "an illegal argument was provided: ticker"}
```

同样，对于其他未处理的异常，将使用更广泛的_ServerExceptionMapper_。例如，当我们使用错误的HTTP方法时：

```bash
$ curl -X POST 'http://localhost:8080/jersey/exception-handling/stocks/STOCK'

Method Not Allowed: HTTP 405 Method Not Allowed
```

## 6. 结论

在本文中，我们看到了使用Jersey处理异常的多种方式。此外，为什么它很重要，以及如何配置它。之后，我们构建了一个简单的场景，我们可以应用它们。因此，我们现在拥有一个更友好和更安全的API。

如往常一样，源代码可在GitHub上获取。
OK