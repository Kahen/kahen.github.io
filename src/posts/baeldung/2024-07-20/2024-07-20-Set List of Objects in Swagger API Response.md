---
date: 2022-03-01
category:
  - Java
  - Spring Boot
tag:
  - Swagger
  - API
head:
  - - meta
    - name: keywords
      content: Swagger, API, Spring Boot, Java
------
# 使用Swagger设置API响应中的对象列表

在本教程中，我们将学习如何修改Swagger API响应。首先，我们将从OpenAPI规范和Swagger API响应的一些解释开始。然后，我们将使用Spring Boot实现一个简单的例子，使用OpenApi 3.0来记录Spring REST API。之后，我们将使用Swagger的注解来设置响应体，以提供对象列表。

### 2.1. 使用Swagger UI设置Spring Boot项目
首先，我们将创建一个_ProductService_类，其中保存了产品列表。接下来，在_ProductController_中，我们定义REST API，让用户获取创建的产品列表。

首先，让我们定义_Product_类：
```
public class Product {
    String code;
    String name;

    // 标准getter和setter
}
```

然后，我们实现_ProductService_类：
```
@Service
public class ProductService {
    List````<Product>```` productsList = new ArrayList<>();
    
    public List````<Product>```` getProductsList() {
        return productsList;
    }
}
```

最后，我们将有一个_Controller_类来定义REST API：
```
@RestController
public class ProductController {
    final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public List````<Product>```` getProductsList(){
        return productService.getProductsList();
    }
}
```

### 2.2. 修改Swagger API响应
有几种Swagger注解可用于记录REST API。**使用_@ApiResponses_，我们可以定义一个@ApiResponse数组，以定义REST API的预期响应。**

现在，让我们使用@ApiResponses将_getProductList_方法的响应内容设置为_Product_对象列表：
```
@ApiResponses(
  value = {
    @ApiResponse(
      content = {
        @Content(
          mediaType = "application/json",
          array = @ArraySchema(schema = @Schema(implementation = Product.class)))
      })  
  })  
@GetMapping("/products")
public List````<Product>```` getProductsList() {
    return productService.getProductsList();
}
```

在这个例子中，我们将响应体的媒体类型设置为_application/json_。此外，我们使用_content_关键字修改了响应体。还使用_array_关键字，我们将响应设置为_Product_对象的数组：

![img](https://www.baeldung.com/wp-content/uploads/2022/03/List-of-Products.png)

## 3. 结论
在本教程中，我们快速查看了OpenAPI规范和Swagger API响应。Swagger为我们提供了各种注解，如_@ApiResponses_，包括不同的关键字。因此，我们可以轻松地使用它们来修改请求和响应，以满足我们应用程序的要求。在我们的实现中，我们使用了_@ApiResponses_来修改Swagger响应体的内容。

如常，代码可以在GitHub上找到。
![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/custom_avatars/david-martinez-150x150.png)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2022/03/List-of-Products.png)