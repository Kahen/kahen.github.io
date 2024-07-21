---
date: 2022-04-01
category:
  - Java
  - GraphQL
tag:
  - GraphQL
  - Java
  - Web服务
head:
  - - meta
    - name: keywords
      content: Java, GraphQL, Web服务, REST, HTTP客户端
------
# Java调用GraphQL服务

GraphQL是作为REST的一种替代，用于构建Web服务的相对**新概念**。最近，一些Java库已经出现，用于创建和调用GraphQL服务。

在本教程中，我们将查看GraphQL模式、查询和变更。我们将看到如何在纯Java中创建和模拟一个简单的GraphQL服务器。然后，我们将探讨如何使用众所周知的HTTP库调用GraphQL服务。

最后，我们还将探讨用于调用GraphQL服务的可用第三方库。

GraphQL是一种用于Web服务的查询语言，也是用于使用类型系统执行查询的服务器端运行时。

GraphQL服务器使用GraphQL模式指定API的功能。这允许GraphQL客户端精确指定从API检索哪些数据。这可能包括子资源和单个请求中的多个查询。

### 2.1. GraphQL模式

GraphQL服务器使用一组类型定义服务。这些类型**描述了您可以使用服务查询的数据集合**。

GraphQL服务可以用任何语言编写。但是，GraphQL模式需要使用称为GraphQL模式语言的DSL来定义。

在我们的示例GraphQL模式中，我们将定义两种类型（_Book_和_Author_）和一个单一的查询操作以获取所有书籍（_allBooks_）：

```
type Book {
    title: String!
    author: Author
}

type Author {
    name: String!
    surname: String!
}

type Query {
    allBooks: [Book]
}

schema {
    query: Query
}
```

_Query_类型是特殊的，因为它定义了GraphQL查询的入口点。

### 2.2. 查询和变更

通过**定义类型和字段，以及为不同字段提供函数**来创建GraphQL服务。

在最简单的形式中，GraphQL是关于请求对象上特定字段的。例如，我们可能查询以获取所有书名：

```
{
    "allBooks" {
        "title"
    }
}
```

尽管看起来相似，但这不是JSON。它是一种特殊的GraphQL查询格式，支持参数、别名、变量等。

GraphQL服务将以如下JSON格式的响应回应上述查询：

```
{
    "data": {
        "allBooks": [
            {
                "title": "Title 1"
            },
            {
                "title": "Title 2"
            }
        ]
    }
}
```

在本教程中，我们将专注于使用查询获取数据。然而，重要的是要提到GraphQL内部的另一个特殊概念——变异。

任何可能导致修改的操作都是使用变异类型发送的。

## 3. GraphQL服务器

让我们使用我们上面定义的模式，在Java中创建一个简单的GraphQL服务器。我们将使用**GraphQL Java库来实现我们的GraphQL服务器**。

我们将从定义我们的GraphQL查询开始，并实现我们示例GraphQL模式中指定的_allBooks_方法：

```
public class GraphQLQuery implements GraphQLQueryResolver {
    private BookRepository repository;

    public GraphQLQuery(BookRepository repository) {
        this.repository = repository;
    }

    public List`<Book>` allBooks() {
        return repository.getAllBooks();
    }
}
```

接下来，为了暴露我们的GraphQL端点，我们将创建一个web servlet：

```
@WebServlet(urlPatterns = "/graphql")
public class GraphQLEndpoint extends HttpServlet {
    private SimpleGraphQLHttpServlet graphQLServlet;

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp)
      throws ServletException, IOException {
        graphQLServlet.service(req, resp);
    }

    @Override
    public void init() {
        GraphQLSchema schema = SchemaParser.newParser()
          .resolvers(new GraphQLQuery(new BookRepository()))
          .file("schema.graphqls")
          .build()
          .makeExecutableSchema();
        graphQLServlet = SimpleGraphQLHttpServlet
          .newBuilder(schema)
          .build();
    }
}
```

在servlet _init_方法中，我们将解析位于资源文件夹中的GraphQL模式。最后，使用解析后的模式，我们可以创建一个_SimpleGraphQLHttpServlet_的实例。

我们将使用_maven-war-plugin_来打包我们的应用程序，并使用_jetty-maven-plugin_来运行它：

```
mvn jetty:run
```

现在我们准备好通过发送请求来运行和测试我们的GraphQL服务：

```
http://localhost:8080/graphql?query={allBooks{title}}
```

## 4. HTTP客户端

与REST服务一样，GraphQL服务通过HTTP协议公开。因此，我们可以**使用任何Java HTTP客户端来调用GraphQL服务**。

### 4.1. 发送请求

让我们尝试**向我们在前一节中创建的GraphQL服务发送请求**：

```
public static HttpResponse callGraphQLService(String url, String query)
  throws URISyntaxException, IOException {
    HttpClient client = HttpClientBuilder.create().build();
    HttpGet request = new HttpGet(url);
    URI uri = new URIBuilder(request.getURI())
      .addParameter("query", query)
      .build();
    request.setURI(uri);
    return client.execute(request);
}
```

在我们的示例中，我们使用了Apache HttpClient。然而，任何Java HTTP客户端都可以使用。

### 4.2. 解析响应

接下来，让我们解析来自GraphQL服务的响应。**GraphQL服务发送JSON格式的响应**，与REST服务相同：

```
HttpResponse httpResponse = callGraphQLService(serviceUrl, "{allBooks{title}}");
String actualResponse = IOUtils.toString(httpResponse.getEntity().getContent(), StandardCharsets.UTF_8.name());
Response parsedResponse = objectMapper.readValue(actualResponse, Response.class);
assertThat(parsedResponse.getData().getAllBooks()).hasSize(2);
```

在我们的示例中，我们使用了来自流行的Jackson库的_ObjectMapper_。然而，我们可以使用任何Java库进行JSON序列化/反序列化。

### 4.3. 模拟响应

与通过HTTP公开的任何其他服务一样，**我们可以模拟GraphQL服务器响应以进行测试**。

我们可以利用MockServer库来存根外部GraphQL HTTP服务：

```
String requestQuery = "{allBooks{title}}";
String responseJson = "{\"data\":{\"allBooks\":[{\"title\":\"Title 1\"},{\"title\":\"Title 2\"}]}}";
new MockServerClient(SERVER_ADDRESS, serverPort)
    .when(
      request()
        .withPath(PATH)
        .withQueryStringParameter("query", requestQuery),
      exactly(1)
    )
    .respond(
      response()
        .withStatusCode(HttpStatusCode.OK_200.code())
        .withBody(responseJson)
    );
```

我们的示例模拟服务器将接受GraphQL查询作为参数，并在body中用JSON响应。

## 5. 外部库

最近出现了几个Java GraphQL库，它们允许更简单的GraphQL服务调用。

### 5.1. 美国运通_Nodes_

_Nodes_是美国运通设计的GraphQL客户端，旨在**根据标准模型定义构建查询**。要开始使用它，我们首先应该添加所需的依赖项：

```
``<dependency>``
    ```<groupId>```com.github.americanexpress.nodes```</groupId>```
    ```<artifactId>```nodes```</artifactId>```
    ```<version>```0.5.0```</version>```
``</dependency>``
```

该库目前托管在_JitPack_上，我们还应该将其添加到我们的Maven安装仓库：

```
`<repository>`
    `<id>`jitpack.io`</id>`
    `<url>`https://jitpack.io`</url>`
`</repository>`
```

一旦解决了依赖项，我们可以使用_GraphQLTemplate_来构建查询并调用我们的GraphQL服务：

```
public static GraphQLResponseEntity``<Data>`` callGraphQLService(String url, String query)
  throws IOException {
    GraphQLTemplate graphQLTemplate = new GraphQLTemplate();

    GraphQLRequestEntity requestEntity = GraphQLRequestEntity.Builder()
      .url(StringUtils.join(url, "?query=", query))
      .request(Data.class)
      .build();

    return graphQLTemplate.query(requestEntity, Data.class);
}
```

_Nodes_将使用我们指定的类解析来自GraphQL服务的响应：

```
GraphQLResponseEntity``<Data>`` responseEntity = callGraphQLService(serviceUrl, "{allBooks{title}}");
assertThat(responseEntity.getResponse().getAllBooks()).hasSize(2);
```

我们应该注意到_Nodes_仍然需要我们构建自己的DTO类来解析响应。

### 5.2. GraphQL Java Generator

_GraphQL Java Generator_库利用了**基于GraphQL模式生成Java代码的能力**。

这种方法类似于SOAP服务中使用的WSDL代码生成器。要开始使用它，我们首先应该添加所需的依赖项：

```
``<dependency>``
    ```<groupId>```com.graphql-java-generator```</groupId>```
    ```<artifactId>```graphql-java-runtime```</artifactId>```
    ```<version>```1.18```</version>```
``</dependency>``
```

接下来，我们可以配置_graphql-maven-plugin_来执行_generateClientCode_目标：

```
`<plugin>`
    ```<groupId>```com.graphql-java-generator```</groupId>```
    ```<artifactId>```graphql-maven-plugin```</artifactId>```
    ```<version>```1.18```</version>```
    `<executions>`
        `<execution>`
            `<goals>`
                `<goal>`generateClientCode`</goal>`
            `</goals>`
        `</execution>`
    `</executions>`
    `<configuration>`
        `<packageName>`com.baeldung.graphql.generated`</packageName>`
        `<copyRuntimeSources>`false`</copyRuntimeSources>`
        `<generateDeprecatedRequestResponse>`false`</generateDeprecatedRequestResponse>`
        `<separateUtilityClasses>`true`</separateUtilityClasses>`
    `</configuration>`
`</plugin>`
```

一旦我们运行M