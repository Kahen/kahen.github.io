---
date: 2024-06-25
category:
  - Reactive APIs
  - Micronaut
  - MongoDB
tag:
  - Micronaut
  - MongoDB
  - Reactive Programming
  - REST API
head:
  - - meta
    - name: keywords
      content: Micronaut, MongoDB, Reactive APIs, REST API
------
# 使用Micronaut和MongoDB创建响应式API

在本教程中，我们将探讨如何使用Micronaut和MongoDB创建响应式REST API。

Micronaut是一个用于在Java虚拟机(JVM)上构建微服务和无服务器应用程序的框架。

我们将看看如何使用Micronaut创建实体、仓库、服务和控制器。

## 2. 项目设置

对于我们的代码示例，我们将创建一个CRUD应用程序，用于存储和检索MongoDB数据库中的书籍。首先，让我们使用Micronaut Launch创建一个Maven项目，设置依赖项并配置数据库。

### 2.1. 初始化项目

让我们首先使用Micronaut Launch创建一个新项目。我们将选择以下设置：

- 应用程序类型：Micronaut应用程序
- Java版本：17
- 构建工具：Maven
- 语言：Java
- 测试框架：JUnit

**此外，我们需要提供Micronaut版本、基础包和项目名称。**为了包括MongoDB和响应式支持，我们将添加以下功能：

- _reactor_ – 启用响应式支持。
- _mongo-reactive_ – 启用MongoDB响应式流支持。
- _data-mongodb-reactive_ – 启用响应式MongoDB仓库。

选择上述功能后，我们可以生成并下载项目。然后，我们可以将项目导入到我们的IDE中。

### 2.2. MongoDB设置

有多种设置MongoDB数据库的方法。例如，我们可以本地安装MongoDB，使用MongoDB Atlas等云服务，或使用Docker容器。

之后，我们需要在已生成的_application.properties_文件中配置连接详细信息：

```
mongodb.uri=mongodb://${MONGO_HOST:localhost}:${MONGO_PORT:27017}/someDb
```

在这里，我们为数据库添加了默认主机和端口分别为_localhost_和_27017_。

## 3. 实体

现在我们的项目已经设置好了，让我们看看如何创建实体。我们将创建一个映射到数据库集合的_Book_实体：

```
@Serdeable
@MappedEntity
public class Book {
    @Id
    @Generated
    @Nullable
    private ObjectId id;
    private String title;
    private Author author;
    private int year;
}
```

**_@Serdeable_注解表示该类可以被序列化和反序列化。**由于我们将在请求和响应中传递此实体，因此需要使其可序列化。这与实现_Serializable_接口相同。

**要将类映射到数据库集合，我们使用_@MappedEntity_注解。**在写入或读取数据库时，Micronaut使用此类将数据库文档转换为Java对象，反之亦然。这与Spring Data MongoDB中的_@Document_注解相似。

我们用_@Id_注解_id字段，以表示它是实体的主键。此外，我们用_@Generated_注解表示数据库生成该值。**_@Nullable_注解用于表示该字段可以为_null_，因为当实体创建时_id_字段将是_null_。**

类似地，让我们创建一个_Author_实体：

```
@Serdeable
public class Author {
    private String firstName;
    private String lastName;
}
```

我们不需要用_@MappedEntity_注解这个类，因为它将被嵌入到_Book_实体中。

## 4. 仓库

接下来，让我们创建一个仓库来存储和检索MongoDB数据库中的书籍。Micronaut提供了几个预定义的接口来创建仓库。

我们将使用_ReactorCrudRepository_接口来创建一个响应式仓库。**这个接口扩展了_CrudRepository_接口，并增加了对响应式流的支持。**

此外，我们将用_@MongoRepository_注解仓库，以表示它是一个MongoDB仓库。这也指示Micronaut为这个类创建一个bean：

```
@MongoRepository
public interface BookRepository extends ReactorCrudRepository`<Book, ObjectId>` {
    @MongoFindQuery("{year: {$gt: :year}}")
    Flux```<Book>``` findByYearGreaterThan(int year);
}
```

我们扩展了_ReactorCrudRepository_接口，并提供了_Book_实体和ID类型作为泛型参数。

**Micronaut在编译时生成接口的实现。它包含保存、检索和从数据库中删除书籍的方法。**我们添加了一个自定义方法来查找在给定年份之后出版的书籍。**_@MongoFindQuery_注解用于指定自定义查询。**

在我们的查询中，我们使用_:year_占位符来表示该值将在运行时提供。_$gt_运算符类似于SQL中的_>_运算符。

## 5. 服务

服务用于封装业务逻辑，通常注入到控制器中。此外，它们可能包括其他功能，如验证、错误处理和日志记录。

我们将使用_BookRepository_创建一个_BookService_来存储和检索书籍：

```
@Singleton
public class BookService {
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public ObjectId save(Book book) {
        Book savedBook = bookRepository.save(book).block();
        return null != savedBook ? savedBook.getId() : null;
    }

    public Book findById(String id) {
        return bookRepository.findById(new ObjectId(id)).block();
    }

    public ObjectId update(Book book) {
        Book updatedBook = bookRepository.update(book).block();
        return null != updatedBook ? updatedBook.getId() : null;
    }

    public Long deleteById(String id) {
        return bookRepository.deleteById(new ObjectId(id)).block();
    }

    public Flux```<Book>``` findByYearGreaterThan(int year) {
        return bookRepository.findByYearGreaterThan(year);
    }
}
```

在这里，我们使用构造函数注入将_BookRepository_注入到构造函数中。**_@Singleton_注解表示只会创建服务的一个实例。**这类似于Spring Boot中的_@Component_注解。

接下来，我们有_save()_、_findById()_、_update()_和_deleteById()_方法来保存、查找、更新和从数据库中删除书籍。**_block()_方法阻塞执行，直到结果可用。**

最后，我们有一个_findByYearGreaterThan()_方法来查找在给定年份之后出版的书籍。

## 6. 控制器

控制器用于处理传入的请求并返回响应。在Micronaut中，我们可以使用注解来创建控制器，并根据不同的路径和HTTP方法配置路由。

### 6.1. 控制器

我们将创建一个_BookController_来处理与书籍相关的请求：

```
@Controller("/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @Post
    public String createBook(@Body Book book) {
        @Nullable ObjectId bookId = bookService.save(book);
        if (null == bookId) {
            return "Book not created";
        } else {
            return "Book created with id: " + bookId.getId();
        }
    }

    @Put
    public String updateBook(@Body Book book) {
        @Nullable ObjectId bookId = bookService.update(book);
        if (null == bookId) {
            return "Book not updated";
        } else {
            return "Book updated with id: " + bookId.getId();
        }
    }
}
```

我们用_@Controller_注解类来表示它是一个控制器。我们还指定了控制器的基本路径为_/books_。

让我们看看控制器的一些重要部分：

- 首先，我们将_BookService_注入到构造函数中。
- 然后，我们有一个_createBook()_方法来创建一本新书。_@Post_注解表示该方法处理POST请求。
- **由于我们想要将传入的请求体转换为_Book_对象，我们使用了_@Body_注解。**
- **当书籍成功保存时，将返回一个_ObjectId_。**我们使用了_@Nullable_注解来表示如果书籍没有保存，则该值可以为null。
- 类似地，我们有一个_updateBook()_方法来更新现有的书籍。我们使用_@Put_注解，因为该方法处理PUT请求。
- 方法返回一个字符串响应，指示书籍是否成功创建或更新。

### 6.2. 路径变量

我们可以使用路径变量从路径中提取值。为了演示这一点，让我们添加按ID查找和删除书籍的方法：

```
@Delete("/{id}")
public String deleteBook(String id) {
    Long bookId = bookService.deleteById(id);
    if (0 == bookId) {
        return "Book not deleted";
    } else {
        return "Book deleted with id: " + bookId;
    }
}

@Get("/{id}")
public Book findById(@PathVariable("id") String identifier) {
    return bookService.findById(identifier);
}
```

**路径变量在路径中用花括号表示。**在这个例子中，_{id}_是一个路径变量，它将从路径中提取并传递给方法。

默认情况下，路径变量的name应该与方法参数的名称匹配。这是_deleteBook()_方法的情况。如果它不匹配，**我们可以使用_@PathVariable_注解来为路径变量指定不同的名称。**这是_findById()_方法的情况。

### 6.3. 查询参数

我们可以使用查询参数从查询字符串中提取值。让我们添加一个方法来查找在给定年份之后出版的书籍：

```
@Get("/published-after")
public Flux```<Book>``` findByYearGreaterThan(@QueryValue("year") int year) {
    return bookService.findByYearGreaterThan(year);
}
```

**_@QueryValue_表示值将作为查询参数提供。此外，我们需要指定查询参数的名称作为注解的值。**

当我们向这个方法发出请求时，我们将在URL中附加一个_year_参数并提供它的值。

## 7. 测试

我们可以使用_curl_或像_Postman_这样的应用程序来测试应用程序。让我们使用_curl_来测试应用程序。

### 7.1. 创建一本书

让我们使用POST请求创建一本书：

```
curl --request POST \
  --url http://localhost:8080/books \
  --header 'Content-Type: application/json' \
  --data '{
    "title": "1984",
    "year": 1949,
    "author": {
        "firstName": "George",
        "lastName": "Orwel"
    }
  }'
```

首先，我们使用_-request POST_选项来表示请求是POST请求。然后我们使用_-header_选项提供标题。在这里，我们设置内容类型为_application/json_。最后，我们使用_-data_选项来指定请求体。

这是一个示例响应：

```
Book created with id: 650e86a7f0f1884234c80e3f
```

### 7.2. 查找一本书

接下来，让我们查找我们刚刚创建的那本书：

```
curl --request GET \
  --url http://localhost:8080/books/650e86a7f0f1884234c80e3f
```

这将返回ID为_650e86a7f0f1884234c80e3f_的书籍。

### 7.3. 更新一本书

接下来，让我们更新这本书。作者的姓氏有一个拼写错误。所以让我们纠正它：

```
curl --request PUT \
  --url http://localhost:8080/books \
  --header 'Content-Type: application/json' \
  --data '{
  "id": {
    "$oid": "650e86a7f0f1884234c80e3f"
  },
  "title": "1984",
  "author": {
    "firstName": "George",
    "lastName": "Orwell"
  },
  "year": 1949
}'
```

如果我们再次查找这本书，我们将看到作者的姓氏现在是_Orwell_。

### 7.4. 自定义查询

接下来，让我们查找所有1940年之后出版的书籍：

```
curl --request GET \
  --url 'http://localhost:8080/books/published-after?year=1940'
```

当我们执行这个命令时，它调用我们的API并返回一个JSON数组，其中包含所有1940年之后出版的书籍的列表：

```
[
    {
        "id": {
            "$oid": "650e86a7f0f1884234c80e3f"
        },
        "title": "1984",
        "author": {
            "firstName": "George",
            "lastName": "Orwell"
        },
        "year": 1949
    }
]
```

类似地，如果我们尝试查找所有1950年之后出版的书籍，我们将得到一个空数组：

```
curl --request GET \
  --url 'http://localhost:8080/books/published-after?year=1950'
[]
```

## 8. 错误处理

接下来，让我们看看如何在应用程序中处理错误。我们将看看两种常见的场景：

- 在尝试获取、更新或删除书籍时找不到书籍。
- 在创建或更新书籍时提供了错误的输入。

### 8.1. Bean验证

首先，让我们看看如何处理错误的输入。为此，我们可以使用Java的Bean验证API。

让我们向_Book_类添加一些约束：

```
public class Book {
    @NotBlank
    private String title;
    @NotNull
    private Author author;
    // ...
}
```

_@NotBlank_注解表示标题不能为空。同样，我们使用_@NotNull_注解来表示作者不能为null。

**然后，为了在我们的控制器中启用输入验证，我们需要使用_@Valid_注解：**

```
@Post
public String createBook(@Valid @Body Book book) {
    // ...
}
```

当输入无效时，控制器返回一个400 _Bad Request_响应，其中包含错误的详细信息的JSON正文：

```
{
    "_links": {
        "self": [
            {
                "href": "/books",
                "templated": false
            }
        ]
    },
    "_embedded": {
        "errors": [
            {
                "message": "book.author: must not be null"
            },
            {
                "message": "book.title: must not be blank"
            }
        ]
    },
    "message": "Bad Request"
}
```

### 8.2. 自定义错误处理程序

在上面的例子中，我们可以看到Micronaut默认如何处理错误。然而，如果我们想要改变这种行为，我们可以创建一个自定义错误处理程序。

由于验证错误是_ConstraintViolation_类的实例，让我们创建一个自定义错误处理方法来处理_ConstraintViolationException_：

```
@Error(exception = ConstraintViolationException.class)
public MutableHttpResponse``<String>`` onSavedFailed(ConstraintViolationException ex) {
    return HttpResponse.badRequest(ex.getConstraintViolations().stream()
      .map(cv -> cv.getPropertyPath() + " " + cv.getMessage())
      .toList().toString());
}
```

任何控制器抛出_ConstraintViolationException_时，Micronaut都会调用这个方法。然后它返回一个400 Bad Request响应，其中包含错误的详细信息的JSON正文：

```
[
    "createBook.book.author must not be null",
    "createBook.book.title must not be blank"
]
```

### 8.3. 自定义异常

接下来，让我们看看如何处理找不到书籍的情况。在这种情况下，我们可以创建一个自定义异常：

```
public class BookNotFoundException extends RuntimeException {
    public BookNotFoundException(long id) {
        super("Book with id " + id + " not found");
    }
}
```

然后，我们可以从控制器中抛出这个异常：

```
@Get("/{id}")
public Book findById(@PathVariable("id") String identifier) throws BookNotFoundException {
    Book book = bookService.findById(identifier);
    if (null == book) {
        throw new BookNotFoundException(identifier);
    } else {
        return book;
    }
}
```

当找不到书籍时，控制器抛出_BookNotFoundException_。

最后，我们可以创建一个自定义错误处理方法来处理_BookNotFoundException_：

```
@Error(exception = BookNotFoundException.class)
public MutableHttpResponse``<String>`` onBookNotFound(BookNotFoundException ex) {
    return HttpResponse.notFound(ex.getMessage());
}
```

当提供了一个不存在的书籍ID时，控制器返回一个404 Not Found响应，其中包含错误的详细信息的JSON正文：

```
Book with id 650e86a7f0f1884234c80e3f not found
```

## 9. 结论

在本文中，我们探讨了如何使用Micronaut和MongoDB创建REST API。首先，我们了解了如何创建MongoDB仓库、一个简单的控制器以及如何使用路径变量和查询参数。然后，我们使用_curl_测试了应用程序。最后，我们了解了如何在控制器中处理错误。

应用程序的完整源代码可在GitHub上获取。
OK