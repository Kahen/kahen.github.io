---
date: 2022-04-01
category:
  - Spring Boot
  - GraphQL
tag:
  - GraphQL
  - SPQR
  - Spring Boot
head:
  - - meta
    - name: keywords
      content: GraphQL, Spring Boot, SPQR, web API, 教程
------
# 使用GraphQL SPQR和Spring Boot入门

GraphQL是一种用于Web API的查询和操作语言。SPQR是一个起源于使GraphQL工作更加无缝的库之一。

在本教程中，我们将学习GraphQL SPQR的基础知识，并在简单的Spring Boot项目中看到它的实际应用。

## 2. 什么是GraphQL SPQR？

GraphQL是由Facebook创建的著名查询语言。它的核心是模式——在这些文件中我们定义自定义类型和函数。

在传统方法中，如果我们想在我们的项目中添加GraphQL，我们需要遵循两个步骤。首先，我们需要向项目中添加GraphQL模式文件。其次，我们需要编写相应的Java POJO，代表模式中的每种类型。**这意味着我们将在两个地方维护相同的信息：在模式文件和Java类中。** 这种方法容易出错，需要更多的项目维护工作。

GraphQL模式发布者和查询解析器，简称**SPQR**，应运而生，以减少上述问题——它简单地从注解的Java类生成GraphQL模式。

## 3. 在Spring Boot中引入GraphQL SPQR

要看到SPQR在行动，我们将设置一个简单的服务。我们将使用GraphQL Spring Boot Starter和GraphQL SPQR。

### 3.1. 设置

让我们从向我们的POM添加SPQR和Spring Boot的依赖开始：

```xml
````<dependency>````
    ````<groupId>````org.springframework.boot````</groupId>````
    ````<artifactId>````spring-boot-starter-web````</artifactId>````
````</dependency>````
````<dependency>````
    ````<groupId>````org.springframework.boot````</groupId>````
    ````<artifactId>````spring-boot-starter-test````</artifactId>````
    ``<scope>``test``</scope>``
````</dependency>````
````<dependency>````
    ````<groupId>````org.springframework.boot````</groupId>````
    ````<artifactId>````spring-boot-starter-webflux````</artifactId>````
    ``<scope>``test``</scope>``
````</dependency>````
````<dependency>````
    ````<groupId>````io.leangen.graphql````</groupId>````
    ````<artifactId>````spqr````</artifactId>````
    `<version>`0.12.4`</version>`
````</dependency>````
```

### 3.2. 编写模型_Book_类

现在我们已经添加了必要的依赖，让我们创建一个简单的_Book_类：

```java
public class Book {
    private Integer id;
    private String author;
    private String title;
}
```

如上所示，它不包含任何SPQR注解。**如我们不拥有源代码但希望从这个库中受益，这可能非常有用。**

### 3.3. 编写BookService

为了管理书籍集合，让我们创建一个_IBookService_接口：

```java
public interface IBookService {
    Book getBookWithTitle(String title);

    List``````<Book>`````` getAllBooks();

    Book addBook(Book book);

    Book updateBook(Book book);

    boolean deleteBook(Book book);
}
```

然后，我们将为我们的接口提供实现：

```java
@Service
public class BookService implements IBookService {

    private static final Set``````<Book>`````` BOOKS_DATA = initializeData();

    @Override
    public Book getBookWithTitle(String title) {
        return BOOKS_DATA.stream()
                .filter(book -> book.getTitle().equals(title))
                .findFirst()
                .orElse(null);
    }

    @Override
    public List``````<Book>`````` getAllBooks() {
        return new ArrayList<>(BOOKS_DATA);
    }

    @Override
    public Book addBook(Book book) {
        BOOKS_DATA.add(book);
        return book;
    }

    @Override
    public Book updateBook(Book book) {
        BOOKS_DATA.removeIf(b -> Objects.equals(b.getId(), book.getId()));
        BOOKS_DATA.add(book);
        return book;
    }

    @Override
    public boolean deleteBook(Book book) {
        return BOOKS_DATA.remove(book);
    }

    private static Set``````<Book>`````` initializeData() {
        Book book = new Book(1, "J. R. R. Tolkien", "The Lord of the Rings");
        Set``````<Book>`````` books = new HashSet<>();
        books.add(book);
        return books;
    }
}
```

### 3.4. 使用graphql-spqr公开服务

剩下的唯一事情是创建一个解析器，它将公开GraphQL的变更和查询。**为此，我们将使用两个重要的SPQR注解——_@GraphQLMutation_和_@GraphQLQuery_：**

```java
@Service
public class BookResolver {

    @Autowired
    IBookService bookService;

    @GraphQLQuery(name = "getBookWithTitle")
    public Book getBookWithTitle(@GraphQLArgument(name = "title") String title) {
        return bookService.getBookWithTitle(title);
    }

    @GraphQLQuery(name = "getAllBooks", description = "Get all books")
    public List``````<Book>`````` getAllBooks() {
        return bookService.getAllBooks();
    }

    @GraphQLMutation(name = "addBook")
    public Book addBook(@GraphQLArgument(name = "newBook") Book book) {
        return bookService.addBook(book);
    }

    @GraphQLMutation(name = "updateBook")
    public Book updateBook(@GraphQLArgument(name = "modifiedBook") Book book) {
        return bookService.updateBook(book);
    }

    @GraphQLMutation(name = "deleteBook")
    public void deleteBook(@GraphQLArgument(name = "book") Book book) {
        bookService.deleteBook(book);
    }
}
```

如果我们不想在每个方法中写_@GraphQLArgument_，并且对GraphQL参数命名为输入参数的名称感到满意，我们可以在编译代码时使用_-parameters_参数。

### 3.5. Rest Controller

最后，我们将定义一个Spring _@RestController._ **为了使用SPQR公开服务，我们将配置_GraphQLSchema_和_GraphQL_对象：**

```java
@RestController
public class GraphqlController {

    private final GraphQL graphQL;

    @Autowired
    public GraphqlController(BookResolver bookResolver) {
        GraphQLSchema schema = new GraphQLSchemaGenerator()
                .withBasePackages("com.baeldung")
                .withOperationsFromSingleton(bookResolver)
                .generate();
        this.graphQL = new GraphQL.Builder(schema)
                .build();
    }
```

重要的是要注意，**我们必须将我们的_BookResolver_注册为单例。**

我们与SPQR的旅程的最后一个任务是创建一个_/graphql_端点。它将作为我们服务的单一接触点，并将执行请求的查询和变更：

```java
@PostMapping(value = "/graphql")
public Map`<String, Object>` execute(@RequestBody Map`<String, String>` request, HttpServletRequest raw)
        throws GraphQLException {
    ExecutionResult result = graphQL.execute(request.get("query"));
    return result.getData();
}
```

### 3.6. 结果

我们可以通过检查_/graphql_端点来检查结果。例如，让我们通过执行以下cURL命令检索所有_Book_记录：

```bash
curl -g \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"query":"{getAllBooks {id author title }}"}' \
  http://localhost:8080/graphql
```

### 3.7. 测试

一旦我们完成了配置，我们可以测试我们的项目。我们将使用_@SpringBootTest_来测试我们的新端点并验证响应。让我们定义JUnit测试并自动装配所需的_WebTestClient_：

```java
@SpringBootTest(webEnvironment = RANDOM_PORT, classes = SpqrApp.class)
class SpqrAppIntegrationTest {

    private static final String GRAPHQL_PATH = "/graphql";

    @Autowired
    private WebTestClient webTestClient;

    @Test
    void whenGetAllBooks_thenValidResponseReturned() {
        String getAllBooksQuery = "{getAllBooks{ id title author }}";

        webTestClient.post()
                .uri(GRAPHQL_PATH)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(toJSON(getAllBooksQuery)), String.class)
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$.getAllBooks").isNotEmpty();
    }

    @Test
    void whenAddBook_thenValidResponseReturned() {
        String addBookMutation = "mutation { addBook(newBook: {id: 123, author: \"J. K. Rowling\", "
                + "title: \"Harry Potter and Philosopher's Stone\"}) { id author title } }";

        webTestClient.post()
                .uri(GRAPHQL_PATH)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(toJSON(addBookMutation)), String.class)
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$.addBook.id").isEqualTo("123")
                .jsonPath("$.addBook.title").isEqualTo("Harry Potter and Philosopher's Stone")
                .jsonPath("$.addBook.author").isEqualTo("J. K. Rowling");
    }

    private static String toJSON(String query) {
        try {
            return new JSONObject().put("query", query).toString();
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }

}
```

## 4. 使用GraphQL SPQR Spring Boot Starter

SPQR团队创建了一个Spring Boot启动器，使使用它变得更加容易。让我们来检查