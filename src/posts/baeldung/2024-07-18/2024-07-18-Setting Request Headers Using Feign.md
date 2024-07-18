---
date: 2022-04-01
category:
  - Java
  - Spring
tag:
  - Feign
  - HTTP
  - REST
head:
  - - meta
    - name: keywords
      content: Java, Feign, HTTP, REST
------
# 使用Feign设置请求头

## 1. 概述

有时在使用Feign时，我们需要在HTTP调用中设置请求头。Feign允许我们通过声明性语法简单地构建HTTP客户端。

在这个简短的教程中，我们将看到如何使用注解配置请求头。我们还将看到如何通过使用拦截器包含常见的请求头。

## 2. 示例

在整个教程中，我们将使用一个暴露REST API端点的书店应用程序作为示例。

我们可以轻松地克隆项目并在本地运行：
```shell
$ mvn install spring-boot:run
```

让我们深入了解客户端实现。

让我们考虑一个场景，特定的API调用应始终包含一个静态头。在这种情况下，我们可能会将该请求头作为客户端的一部分进行配置。一个典型的例子是包含一个_Content-Type_头。

使用_@Header_注解，我们可以轻松配置一个静态请求头。我们可以静态或动态地定义此头的值。

让我们在_BookClient_中配置两个静态头，即_Accept-Language_和_Content-Type_：
```java
@Headers("Accept-Language: en-US")
public interface BookClient {

    @RequestLine("GET /{isbn}")
    BookResource findByIsbn(@Param("isbn") String isbn);

    @RequestLine("POST")
    @Headers("Content-Type: application/json")
    void create(Book book);
}
```

在上述代码中，由于_Accept-Language_头应用于_BookClient_，因此该头包含在所有API中。然而，_create_方法有额外的_Content-Type_头。

接下来，让我们看看如何使用Feign的_Builder_方法创建_BookClient_并传递_HEADERS_日志级别：
```java
Feign.builder()
  .encoder(new GsonEncoder())
  .decoder(new GsonDecoder())
  .logger(new Slf4jLogger(type))
  .logLevel(Logger.Level.HEADERS)
  .target(BookClient.class, "http://localhost:8081/api/books");
```

现在，让我们测试_create_方法：
```java
String isbn = UUID.randomUUID().toString();
Book book = new Book(isbn, "Me", "It's me!", null, null);

bookClient.create(book);

book = bookClient.findByIsbn(isbn).getBook();
```

然后，让我们在输出日志中验证头：
```shell
18:01:15.039 [main] DEBUG c.b.f.c.h.staticheader.BookClient - [BookClient#create] Accept-Language: en-US
18:01:15.039 [main] DEBUG c.b.f.c.h.staticheader.BookClient - [BookClient#create] Content-Type: application/json
18:01:15.096 [main] DEBUG c.b.f.c.h.staticheader.BookClient - [BookClient#findByIsbn] Accept-Language: en-US
```

我们应该注意，如果**客户端接口和API方法中的头名称相同**，它们不会相互覆盖。相反，请求将包含所有这些值。

使用_@Header_注解，我们还可以设置一个动态头值。为此，我们需要将值表示为占位符。

让我们将_x-requester-id_头包含到_BookClient_中，占位符为_requester_：
```java
@Headers("x-requester-id: {requester}")
public interface BookClient {

    @RequestLine("GET /{isbn}")
    BookResource findByIsbn(@Param("requester") String requester, @Param("isbn") String isbn);
}
```

在这里，我们使_x-requester-id_成为一个变量，该变量被传递到每个方法中。我们使用**_@Param_注解来匹配变量的名称**。它在运行时扩展以满足由_@Headers_注解指定的头。

现在，让我们用_x-requester-id_头调用_BookClient_ API：
```java
String requester = "test";
book = bookClient.findByIsbn(requester, isbn).getBook();
```

然后，让我们在输出日志中验证请求头：
```shell
18:04:27.515 [main] DEBUG c.b.f.c.h.s.parameterized.BookClient - [BookClient#findByIsbn] x-requester-id: test
```

让我们想象一个场景，头键和值都是动态的。在这种情况下，可能的键的范围事先未知。此外，同一客户端上的不同方法调用之间的头可能会有所不同。一个典型的例子是设置某些元数据头。

使用带有_@HeaderMap_注解的_Map_参数设置动态头：
```java
@RequestLine("POST")
void create(@HeaderMap Map``<String, Object>`` headers, Book book);
```

现在，让我们尝试使用头映射测试_create_方法：
```java
Map``<String, Object>`` headerMap = new HashMap<>();
headerMap.put("metadata-key1", "metadata-value1");
headerMap.put("metadata-key2", "metadata-value2");

bookClient.create(headerMap, book);
```

然后，让我们在输出日志中验证头：
```shell
18:05:03.202 [main] DEBUG c.b.f.c.h.dynamicheader.BookClient - [BookClient#create] metadata-key1: metadata-value1
18:05:03.202 [main] DEBUG c.b.f.c.h.dynamicheader.BookClient - [BookClient#create] metadata-key2: metadata-value2
```

## 5. 请求拦截器

拦截器可以执行各种隐式任务，如记录或为每个请求或响应进行身份验证。

Feign提供了一个_RequestInterceptor_接口。通过这个接口，我们可以添加请求头。

当知道应该在每个调用中包含头时，添加请求拦截器是有意义的。这种模式消除了调用代码实现非功能性需求（如身份验证或跟踪）的依赖。

让我们通过实现一个_AuthorisationService_来生成授权令牌来尝试这个：
```java
public class ApiAuthorisationService implements AuthorisationService {

    @Override
    public String getAuthToken() {
        return "Bearer " + UUID.randomUUID();
    }
}
```

现在，让们实现我们的自定义请求拦截器：
```java
public class AuthRequestInterceptor implements RequestInterceptor {

    private AuthorisationService authTokenService;

    public AuthRequestInterceptor(AuthorisationService authTokenService) {
        this.authTokenService = authTokenService;
    }

    @Override
    public void apply(RequestTemplate template) {
        template.header("Authorisation", authTokenService.getAuthToken());
    }
}
```

我们应该注意到**请求拦截器可以读取、删除或更改请求模板的任何部分**。

现在，让我们使用_builder_方法将_AuthInterceptor_添加到_BookClient_：
```java
Feign.builder()
  .requestInterceptor(new AuthInterceptor(new ApiAuthorisationService()))
  .encoder(new GsonEncoder())
  .decoder(new GsonDecoder())
  .logger(new Slf4jLogger(type))
  .logLevel(Logger.Level.HEADERS)
  .target(BookClient.class, "http://localhost:8081/api/books");

```

然后，让我们用_Authorisation_头测试_BookClient_ API：
```java
bookClient.findByIsbn("0151072558").getBook();
```

现在，让我们在输出日志中验证头：
```shell
18:06:06.135 [main] DEBUG c.b.f.c.h.staticheader.BookClient - [BookClient#findByIsbn] Authorisation: Bearer 629e0af7-513d-4385-a5ef-cb9b341cedb5
```

**多个请求拦截器也可以应用于Feign客户端**。尽管没有保证它们被应用的顺序。

## 6. 结论

在本文中，我们讨论了Feign客户端如何支持设置请求头。我们使用_@Headers_、_@HeaderMaps_注解和请求拦截器实现了这一点。

一如既往，本教程中展示的所有代码示例都可以在GitHub上找到。