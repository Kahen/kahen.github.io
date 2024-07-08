---
date: 2024-07-08
category:
  - Spring Cloud
  - Feign Client
tag:
  - Spring Cloud
  - Feign Client
  - Configuration
head:
  - - meta
    - name: keywords
      content: Spring Cloud, Feign Client, Configuration, URL
---

# 配置Spring Cloud FeignClient的URL

在本文中，我们将探讨如何为Feign客户端接口提供目标URL。

## 2. 概览

为了快速开始，我们将使用JSONPlaceholder网站提供的_Albums, Posts_和_Todos_对象的模拟响应。

让我们看看_Album_类：

```java
public class Album {
    private Integer id;
    private Integer userId;
    private String title;

    // 标准getter和setter
}
```

以及_Post_类：

```java
public class Post {
    private Integer id;
    private Integer userId;
    private String title;
    private String body;

    // 标准getter和setter
}
```

最后是_Todo_类：

```java
public class Todo {
    private Integer id;
    private Integer userId;
    private String title;
    private Boolean completed;

    // 标准getter和setter
}
```

## 3. 在注解中添加基础URL

**我们可以在客户端接口上的_@FeignClient_注解的_url_属性中设置基础URL**。然后，我们将使用相关的HTTP动词注解方法，并添加所需的端点：

```java
@FeignClient(name = "albumClient", url = "https://jsonplaceholder.typicode.com/albums/")
public interface AlbumClient {

    @GetMapping(value = "/{id}")
    Album getAlbumById(@PathVariable(value = "id") Integer id);
}
```

让我们添加一个REST控制器来测试我们的客户端：

```java
@RestController
public class ConfigureFeignUrlController {

    private final AlbumClient albumClient;
    // 标准构造函数

    @GetMapping(value = "albums/{id}")
    public Album getAlbumById(@PathVariable(value = "id") Integer id) {
        return albumClient.getAlbumById(id);
    }

    // 其他控制器方法
}
```

当应用程序生命周期内的目标URL是静态的时候，这个选项很有用。

## 4. 使用配置属性

或者，**对于Spring Cloud 2022.0.1或更高版本，我们可以使用_application.properties_来为Feign客户端接口提供URL**。属性_spring.cloud.openfeign.client.config.``<interface-name>``.url_用于此目的。这里的_``<interface-name>``_是我们在_@FeignClient_注解中提供的_name_属性的值：

```java
@FeignClient(name = "postClient")
public interface PostClient {

    @GetMapping(value = "/{id}")
    Post getPostById(@PathVariable(value = "id") Integer id);
}
```

我们将在application.properties中添加基础URL：

```properties
spring.cloud.openfeign.client.config.postClient.url=https://jsonplaceholder.typicode.com/posts/
```

**对于低于2022.0.1版本的Spring Cloud，我们可以将_@FeignClient_的_url_属性设置为从_application.properties_读取值**：

```java
@FeignClient(name = "postClient", url = "${spring.cloud.openfeign.client.config.postClient.url}")
```

接下来，让我们将此客户端注入到我们之前创建的控制器中：

```java
@RestController
public class FeignClientController {
    private final PostClient postClient;

    // 其他属性和标准构造函数

    @GetMapping(value = "posts/{id}")
    public Post getPostById(@PathVariable(value = "id") Integer id) {
        return postClient.getPostById(id);
    }

    // 其他控制器方法
}
```

如果目标URL根据应用程序的环境而变化，这个选项可能很有用。例如，我们可能在开发环境中使用模拟服务器，在生产环境中使用实际服务器。

## 5. 使用_RequestLine_

Spring Cloud提供了一个特性，我们可以在运行时覆盖目标URL或直接提供URL。这是通过**使用_@RequestLine_注解并手动使用Feign Builder API创建Feign客户端以注册客户端**来实现的：

```java
@FeignClient(name = "todoClient")
public interface TodoClient {

    @RequestLine(value = "GET")
    Todo getTodoById(URI uri);
}
```

我们需要在我们的控制器中手动创建这个Feign客户端：

```java
@RestController
@Import(FeignClientsConfiguration.class)
public class FeignClientController {

    private final TodoClient todoClient;

    // 其他变量

    public FeignClientController(Decoder decoder, Encoder encoder) {
        this.todoClient = Feign.builder().encoder(encoder).decoder(decoder).target(Target.EmptyTarget.create(TodoClient.class));
        // 其他初始化
    }

    @GetMapping(value = "todo/{id}")
    public Todo getTodoById(@PathVariable(value = "id") Integer id) {
        return todoClient.getTodoById(URI.create("https://jsonplaceholder.typicode.com/todos/" + id));
    }

    // 其他控制器方法
}
```

这里，我们首先通过_FeignClientsConfiguration.class_导入了默认的Feign客户端配置。_Feign.Builder_用于为API接口自定义这些属性。我们可以配置属性，如_encoder_, _decoder_, _connectTimeout_, _readTimeout_, 认证等。

_target_属性定义了这些属性将应用于哪个接口。这个接口有两种实现：_EmptyTarget_，我们这里使用了，以及_HardCodedTarget_。_EmptyTarget_类在编译时不需要URL，而_HardCodedTarget_需要。

值得注意的是，作为参数提供的URI将覆盖在_@FeignClient_注解中提供的URL和配置属性中的URL。同样，_@FeignClient_注解中提供的URL将覆盖配置属性中提供的URL。

## 6. 使用_RequestInterceptor_

另外一种在运行时提供目标URL的方式是向_Feign.Builder_提供一个自定义的_RequestInterceptor_。这里，我们将覆盖_RestTemplate_的_target_属性，以更新URL为通过_requestInterceptor_提供给_Feign.Builder_的URL：

```java
public class DynamicUrlInterceptor implements RequestInterceptor {
    private final Supplier`<String>` urlSupplier;
    // 标准构造函数

    @Override
    public void apply(RequestTemplate template) {
        String url = urlSupplier.get();
        if (url != null) {
            template.target(url);
        }
    }
}
```

让我们在_AlbumClient.java_中添加另一个方法：

```java
@GetMapping(value = "/{id}")
Album getAlbumByIdAndDynamicUrl(@PathVariable(name = "id") Integer id);
```

我们将不在构造函数中使用Builder，而是在_ConfigureFeignUrlController_的方法中使用它来创建_AlbumClient_的实例：

```java
@RestController
@Import(FeignClientsConfiguration.class)
public class ConfigureFeignUrlController {

    private final ObjectFactory`<HttpMessageConverters>` messageConverters;
    private final ObjectProvider`<HttpMessageConverterCustomizer>` customizers;

    // 其他变量，标准构造函数和其他API

    @GetMapping(value = "/dynamicAlbums/{id}")
    public Album getAlbumByIdAndDynamicUrl(@PathVariable(value = "id") Integer id) {
        AlbumClient client = Feign.builder()
          .requestInterceptor(new DynamicUrlInterceptor(() -> "https://jsonplaceholder.typicode.com/albums/"))
          .contract(new SpringMvcContract())
          .encoder(new SpringEncoder(messageConverters))
          .decoder(new SpringDecoder(messageConverters, customizers))
          .target(Target.EmptyTarget.create(AlbumClient.class));

        return client.getAlbumByIdAndDynamicUrl(id);
    }
}
```

这里，我们添加了上面创建的_DynamicUrlInterceptor_，它接受一个URL来覆盖_AlbumClient_的默认URL。我们还配置了客户端使用_SpringMvcContract, SpringEncoder_和_SpringDecoder_。

最后两个选项将在我们需要为我们的应用程序提供webhook支持时非常有用，因为每个客户端的目标URL将有所不同。

## 7. 结论

在本文中，我们看到了如何以不同的方式为Feign客户端接口配置目标URL。像往常一样，完整的实现可以在GitHub上找到。