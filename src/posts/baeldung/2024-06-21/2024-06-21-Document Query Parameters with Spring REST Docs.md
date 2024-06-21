---
date: 2024-06-21
category:
  - Spring
  - REST Docs
tag:
  - API文档
  - Spring Boot
head:
  - - meta
    - name: keywords
      content: Spring REST Docs, API文档, Spring Boot, 测试
---
# 使用Spring REST Docs记录REST API查询参数

现在，新版本的《REST With Spring - "REST With Spring Boot"》终于发布了，当前价格将在本周五之前有效，之后将永久上涨50美元。

**>获取访问权限**

**现在**

## 1. 概述

文档对于我们打算与世界分享的任何代码都是至关重要的，特别是当这段代码相对复杂时。良好的API文档不仅吸引开发者使用它，还展示了产品的质量。一个文档编写草率的公司可能也有一个编写草率的API。

然而，开发者喜欢为机器编写代码，而不是为人编写文本。

在本教程中，我们将探讨如何结合编写文档和编写API使用Spring REST Docs。我们将以查询参数文档为例。

## 2. API

让我们考虑一个简单的API，它只有一个端点：

```java
@RestController
@RequestMapping("/books")
public class BookController {
    private final BookService service;

    public BookController(BookService service) {
        this.service = service;
    }

    @GetMapping
    public List`<Book>` getBooks(@RequestParam(name = "page") Integer page) {
        return service.getBooks(page);
    }
}
```

这个端点返回我们网站上可用的书籍集合。但由于书籍的数量庞大，我们不能一次性返回所有书籍。**客户端提供我们目录的页码，我们只发送这一页的信息。**

我们决定使这个参数成为必需的。在这种情况下，这是一个默认设置。这样，我们提高了服务的性能，并且不允许客户端一次性请求太多数据。

然而，我们必须提供关于我们决定的信息，并解释客户端应该遵循的规则。**在这种情况下，如果参数不存在，客户端将收到错误消息。**

## 3. 文档

编写文档的通常方法是编写文档，这意味着开发人员必须两次编写相同的事情。首先在代码中，然后在文本中，解释如何与系统交互。**然而，这是浪费的，我们不能假设所有开发人员都遵循这一点。**

文档是一个相当正式的文件，旨在追求清晰而不是启发性的见解、巧妙的措辞或创新的情节。**那么，我们为什么不从代码生成文档呢？**这样，我们就不会两次编写相同的事情，所有的更改都会反映在文档中。

Spring REST Docs正是这样做的。**然而，它是从测试而不是代码生成文档的，因为它没有提供太多上下文，而是从测试中生成的。**这样，我们可以表达相当复杂的情况和示例。另一个好处是，如果我们的测试失败，文档就不会生成。

## 4. 带文档的测试

**Spring REST Docs支持REST测试的主要测试框架。**我们将考虑MockMvc、WebTestClient和REST-assured的示例。然而，主要的想法和结构对所有这些都是一样的。

此外，我们将使用JUnit 5作为我们测试用例的基础，但可以设置Spring REST Docs与JUnit 4一起使用。

所有下面的测试方法都需要一个额外的扩展：

```java
@ExtendWith({RestDocumentationExtension.class, SpringExtension.class})
```

这些是用于文档生成的特殊类。

### 4.1. WebTestClient

让我们从WebTestClient开始，这是一种更现代的REST测试方法。正如之前提到的，我们需要用额外的扩展扩展测试类。**此外，我们需要配置它：**

```java
@BeforeEach
public void setUp(ApplicationContext webApplicationContext, RestDocumentationContextProvider restDocumentation) {
    this.webTestClient = WebTestClient.bindToApplicationContext(webApplicationContext)
      .configureClient()
      .filter(documentationConfiguration(restDocumentation))
      .build();
}
```

之后，我们可以编写一个测试，它不仅会检查我们的API，还会提供有关请求的信息：

```java
@Test
@WithMockUser
void givenEndpoint_whenSendGetRequest_thenSuccessfulResponse() {
    webTestClient.get().uri("/books?page=2")
      .exchange().expectStatus().isOk().expectBody()
      .consumeWith(document("books",
        requestParameters(parameterWithName("page").description("要检索的页面"))));
}
```

### 4.2. WebMvcTest和MockMvc

一般来说，这种方法与前一个非常相似。它也需要正确的设置：

```java
@BeforeEach
public void setUp(WebApplicationContext webApplicationContext, RestDocumentationContextProvider restDocumentation) {
    this.mockMvc = webAppContextSetup(webApplicationContext)
      .apply(documentationConfiguration(restDocumentation))
      .alwaysDo(document("{method-name}", preprocessRequest(prettyPrint()), preprocessResponse(prettyPrint())))
      .build();
}
```

测试方法看起来相同，除了我们使用MockMvc及其API：

```java
@Test
void givenEndpoint_whenSendGetRequest_thenSuccessfulResponse() throws Exception {
    mockMvc.perform(get("/books?page=2"))
      .andExpect(status().isOk())
      .andDo(document("books",
        requestParameters(parameterWithName("page").description("要检索的页面"))));
}
```

### 4.3. REST-assured

最后，让我们检查一下REST-assured的例子。因为我们需要一个运行中的服务器，所以我们不应该使用@WebMvcTest或@AutoconfigureMockMvc。在这里，我们使用@AutoconfigureWebMvc，并且还要提供正确的端口：

```java
@BeforeEach
void setUp(RestDocumentationContextProvider restDocumentation, @LocalServerPort int port) {
    this.spec = new RequestSpecBuilder()
      .addFilter(documentationConfiguration(restDocumentation))
      .setPort(port)
      .build();
}
```

然而，测试看起来通常是相同的：

```java
@Test
@WithMockUser
void givenEndpoint_whenSendGetRequest_thenSuccessfulResponse() {
    RestAssured.given(this.spec).filter(document("users", requestParameters(
        parameterWithName("page").description("要检索的页面"))))
      .when().get("/books?page=2")
      .then().assertThat().statusCode(is(200));
}
```

## 5. 生成的文档

然而，到目前为止，我们还没有生成的文档。要得到结果，我们需要经过额外的步骤。

### 5.1. 生成的片段

我们可以在运行测试后的目标文件夹中找到生成的片段。然而，我们可以配置输出目录以定义存储片段的不同位置。一般来说，它们看起来像这样：

```bash
[source,bash]
----
$ curl 'http://localhost:8080/books?page=2' -i -X GET
----
```

同时，我们可以看到关于我们参数的信息，存储在一个.adoc文件中。

```adoc
|===
|参数|描述

|`+page+`
|要检索的页面

|===
```

### 5.2. 文档生成

下一步是为AsciiDoctor提供配置，以创建更易读的HTML文档。AsciiDoc是一种简单而强大的标记语言。我们可以用它来实现各种目的，比如生成HTML和PDFs或写书。

因此，由于我们想要生成HTML文档，我们需要概述我们的HTML模板：

```adoc
= 使用Spring REST Docs的书籍

您应该如何与我们的书店交互：

.request
include::{snippets}/books/http-request.adoc[]

.request-parameters
include::{snippets}/books/request-parameters.adoc[]

.response
include::{snippets}/books/http-response.adoc[]
```

在我们的例子中，我们使用了简单的格式，但可以创建一个更复杂的自定义格式，这将是吸引人的和提供信息的。AsciiDoc的灵活性在这方面帮助了我们。

### 5.3. 生成的HTML

在正确设置和配置之后，当我们可以将生成目标附加到Maven阶段时：

```xml
`<executions>`
    `<execution>`
        `<id>`generate-docs`</id>`
        `<phase>`package`</phase>`
        `<goals>`
            `<goal>`process-asciidoc`</goal>`
        `</goals>`
        `<configuration>`
            `<backend>`html`</backend>`
            `<doctype>`book`</doctype>`
            `<attributes>`
                `<snippets>`${snippetsDirectory}`</snippets>`
            `</attributes>`
            `<sourceDirectory>`src/docs/asciidocs`</sourceDirectory>`
            `<outputDirectory>`target/generated-docs`</outputDirectory>`
        `</configuration>`
    `</execution>`
`</executions>`
```

我们可以运行所需的_mvn_命令并触发生成。我们在前一节中定义的模板呈现了以下HTML：

##

我们可以将此过程附加到我们的流水线中，并始终拥有相关且正确的文档。另一个好处是，这个过程减少了手动工作，这是浪费和容易出错的。

## 6. 结论

文档是软件的重要组成部分。开发者承认这一点，但只有少数人始终如一地编写或维护它。Spring REST Docs允许我们基于代码而不是我们对API应该如何做的理解，以最小的努力生成良好的文档。

像往常一样，本教程的所有代码都可以在GitHub上找到。