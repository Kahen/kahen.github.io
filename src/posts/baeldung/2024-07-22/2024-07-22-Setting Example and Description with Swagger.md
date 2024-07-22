---
date: 2022-02-01
category:
  - Spring Boot
  - Swagger
tag:
  - API文档
  - 描述
  - 示例
head:
  - - meta
    - name: keywords
      content: Swagger, API文档, 示例, 描述
---
# 使用Swagger设置示例和描述

在本教程中，我们将展示如何使用Swagger注解使我们的文档更加描述性。首先，我们将学习如何为API的不同部分添加描述，比如方法、参数和错误代码。然后我们将看到如何添加请求/响应示例。

## 2. 项目设置

我们将创建一个简单的产品API，提供创建和获取产品的方法。

从头开始创建REST API，我们可以按照Spring Docs的这个教程使用Spring Boot创建RESTful web服务。

接下来将是为项目设置依赖项和配置。我们可以按照本文的步骤为Spring REST API设置Swagger 2。

## 3. 创建API

让我们创建我们的产品API并检查生成的文档。

### 3.1. 模型

让我们定义我们的_Product_类：

```java
public class Product implements Serializable {
    private long id;
    private String name;
    private String price;

    // 构造函数和getter/setters
}
```

### 3.2. 控制器

让我们定义两个API方法：

```java
@RestController
@Tag(name = "产品API")
public class ProductController {

    @PostMapping("/products")
    public ResponseEntity`<Void>` createProduct(@RequestBody Product product) {
        // 创建逻辑
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity``<Product>`` getProduct(@PathVariable Long id) {
        // 检索逻辑
        return ResponseEntity.ok(new Product(1, "产品1", "$21.99"));
    }
}
```

当我们运行项目时，库将读取所有公开的路径并创建相应的文档。

让我们在默认URL _http://localhost:8080/swagger-ui/index.html_ 查看文档：

![img](https://www.baeldung.com/wp-content/uploads/2022/02/Screenshot-2022-01-29-at-1.59.47-PM.png)

我们可以进一步扩展控制器方法以查看它们各自的文档。接下来，我们将详细查看它们。

## 4. 使我们的文档更具描述性

现在让我们通过向方法的不同部分添加描述来使我们的文档更具描述性。

### 4.1. 向方法和参数添加描述

让我们看看几种使方法具有描述性的方法。我们将向方法、参数和响应代码添加描述。让我们从_getProduct()_方法开始：

```java
@Operation(summary = "通过ID获取产品", description = "根据ID返回产品")
@ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "成功检索"),
        @ApiResponse(responseCode = "404", description = "未找到 - 产品不存在")
    })
@GetMapping("/products/{id}")
public ResponseEntity``<Product>`` getProduct(@PathVariable("id") @Parameter(name = "id", description = "产品ID", example = "1") Long id) {
    // 检索逻辑
    return ResponseEntity.ok(new Product(1, "产品1", "$21.99"));
}
```

_**@Operation**_ **定义了API方法的属性。**我们使用_value_属性为操作添加了名称，并使用_notes_属性添加了描述。

**@** _**ApiResponses**_ **用于覆盖伴随响应代码的默认消息**。对于我们想要更改的每个响应消息，我们需要添加一个_@ApiResponse_对象。

例如，假设产品未找到，我们的API在这种情况下返回HTTP 404状态。如果我们不添加自定义消息，原始消息“未找到”可能很难理解。调用者可能会将其解释为URL错误。然而，添加一个描述“产品未找到”使其更清晰。

_**@Parameter**_ **定义了方法参数的属性。**它可以与路径、查询、头和表单参数一起使用。我们为“id”参数添加了名称、值（描述）和示例。如果我们不添加自定义，库只会拾取参数的名称和类型，正如我们在第一张图片中看到的。

让我们看看这如何改变文档：

![img](https://www.baeldung.com/wp-content/uploads/2022/02/Screenshot-2022-01-29-at-4.08.45-PM.png)

在这里我们可以看到名称“获取产品ID”以及API路径_/products/{id}_。我们还可以看到就在它下面的描述。此外，在参数部分，我们对字段_id_有描述和示例。最后，在响应部分，我们可以看到200和404代码的错误描述是如何改变的。

### 4.2. 向模型添加描述和示例

我们可以在_createProduct()_方法中进行类似的改进。由于该方法接受一个_Product_对象，因此在_Product_类本身中提供描述和示例更有意义。

让我们对_Product_类进行一些更改以实现这一点：

```java
@Schema(name = "产品ID", example = "1", required = true)
private Long id;
@Schema(name = "产品名称", example = "产品1", required = false)
private String name;
@Schema(name = "产品价格", example = "$100.00", required = true)
private String price;
```

**@ _Schema_ 注解定义了字段的属性。**我们在每个字段上使用此注解来设置其_name_、_example_和_required_属性。

让我们重新启动应用程序，再次查看我们的_Product_模型文档：

![img](https://www.baeldung.com/wp-content/uploads/2022/02/Screenshot-2022-01-29-at-4.07.33-PM.png)

如果我们将这个与原始文档图片进行比较，我们将发现新图片包含示例、描述和红色星号(*)来识别必填参数。

**通过向模型添加示例，我们可以自动在每个使用模型作为输入或输出的方法中创建示例响应。**例如，从对应于_getProduct()_方法的图片中，我们可以看到响应包含与我们在模型中提供的相同值的示例。

在我们的文档中添加示例很重要，因为它使值格式更加精确。如果我们的模型包含日期、时间或价格等字段，就需要确切的值格式。事先定义格式可以使API提供者和API客户端的开发过程更加有效。

## 5. 结论

在本文中，我们探讨了提高我们API文档可读性的不同方式。我们学习了如何使用_@Parameter, @Operation, @ApiResponses, @ApiResponse, 和 @Schema_注解来记录方法、参数、错误消息和模型。

如常，这些示例的代码可以在GitHub上找到。