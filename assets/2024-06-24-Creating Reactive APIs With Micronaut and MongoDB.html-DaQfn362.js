import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as n,a as t}from"./app-aK88YxT7.js";const a={},l=t(`<hr><h1 id="使用micronaut和mongodb创建响应式api" tabindex="-1"><a class="header-anchor" href="#使用micronaut和mongodb创建响应式api"><span>使用Micronaut和MongoDB创建响应式API</span></a></h1><p>在本教程中，我们将探讨如何使用Micronaut和MongoDB创建响应式REST API。</p><p>Micronaut是一个用于在Java虚拟机(JVM)上构建微服务和无服务器应用程序的框架。</p><p>我们将看看如何使用Micronaut创建实体、仓库、服务和控制器。</p><h2 id="_2-项目设置" tabindex="-1"><a class="header-anchor" href="#_2-项目设置"><span>2. 项目设置</span></a></h2><p>对于我们的代码示例，我们将创建一个CRUD应用程序，用于存储和检索MongoDB数据库中的书籍。首先，让我们使用Micronaut Launch创建一个Maven项目，设置依赖项并配置数据库。</p><h3 id="_2-1-初始化项目" tabindex="-1"><a class="header-anchor" href="#_2-1-初始化项目"><span>2.1. 初始化项目</span></a></h3><p>让我们首先使用Micronaut Launch创建一个新项目。我们将选择以下设置：</p><ul><li>应用程序类型：Micronaut应用程序</li><li>Java版本：17</li><li>构建工具：Maven</li><li>语言：Java</li><li>测试框架：JUnit</li></ul><p>**此外，我们需要提供Micronaut版本、基础包和项目名称。**为了包括MongoDB和响应式支持，我们将添加以下功能：</p><ul><li><em>reactor</em> – 启用响应式支持。</li><li><em>mongo-reactive</em> – 启用MongoDB响应式流支持。</li><li><em>data-mongodb-reactive</em> – 启用响应式MongoDB仓库。</li></ul><p>选择上述功能后，我们可以生成并下载项目。然后，我们可以将项目导入到我们的IDE中。</p><h3 id="_2-2-mongodb设置" tabindex="-1"><a class="header-anchor" href="#_2-2-mongodb设置"><span>2.2. MongoDB设置</span></a></h3><p>有多种设置MongoDB数据库的方法。例如，我们可以本地安装MongoDB，使用MongoDB Atlas等云服务，或使用Docker容器。</p><p>之后，我们需要在已生成的_application.properties_文件中配置连接详细信息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>mongodb.uri=mongodb://\${MONGO_HOST:localhost}:\${MONGO_PORT:27017}/someDb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，我们为数据库添加了默认主机和端口分别为_localhost_和_27017_。</p><h2 id="_3-实体" tabindex="-1"><a class="header-anchor" href="#_3-实体"><span>3. 实体</span></a></h2><p>现在我们的项目已经设置好了，让我们看看如何创建实体。我们将创建一个映射到数据库集合的_Book_实体：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Serdeable
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**_@Serdeable_注解表示该类可以被序列化和反序列化。**由于我们将在请求和响应中传递此实体，因此需要使其可序列化。这与实现_Serializable_接口相同。</p><p>**要将类映射到数据库集合，我们使用_@MappedEntity_注解。**在写入或读取数据库时，Micronaut使用此类将数据库文档转换为Java对象，反之亦然。这与Spring Data MongoDB中的_@Document_注解相似。</p><p>我们用_@Id_注解_id字段，以表示它是实体的主键。此外，我们用_@Generated_注解表示数据库生成该值。<strong><em>@Nullable_注解用于表示该字段可以为_null</em>，因为当实体创建时_id_字段将是_null_。</strong></p><p>类似地，让我们创建一个_Author_实体：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Serdeable
public class Author {
    private String firstName;
    private String lastName;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们不需要用_@MappedEntity_注解这个类，因为它将被嵌入到_Book_实体中。</p><h2 id="_4-仓库" tabindex="-1"><a class="header-anchor" href="#_4-仓库"><span>4. 仓库</span></a></h2><p>接下来，让我们创建一个仓库来存储和检索MongoDB数据库中的书籍。Micronaut提供了几个预定义的接口来创建仓库。</p><p>我们将使用_ReactorCrudRepository_接口来创建一个响应式仓库。<strong>这个接口扩展了_CrudRepository_接口，并增加了对响应式流的支持。</strong></p><p>此外，我们将用_@MongoRepository_注解仓库，以表示它是一个MongoDB仓库。这也指示Micronaut为这个类创建一个bean：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@MongoRepository
public interface BookRepository extends ReactorCrudRepository\`&lt;Book, ObjectId&gt;\` {
    @MongoFindQuery(&quot;{year: {$gt: :year}}&quot;)
    Flux\`\`\`&lt;Book&gt;\`\`\` findByYearGreaterThan(int year);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们扩展了_ReactorCrudRepository_接口，并提供了_Book_实体和ID类型作为泛型参数。</p><p><strong>Micronaut在编译时生成接口的实现。它包含保存、检索和从数据库中删除书籍的方法。<strong>我们添加了一个自定义方法来查找在给定年份之后出版的书籍。</strong>_@MongoFindQuery_注解用于指定自定义查询。</strong></p><p>在我们的查询中，我们使用_:year_占位符来表示该值将在运行时提供。<em>$gt_运算符类似于SQL中的</em>&gt;_运算符。</p><h2 id="_5-服务" tabindex="-1"><a class="header-anchor" href="#_5-服务"><span>5. 服务</span></a></h2><p>服务用于封装业务逻辑，通常注入到控制器中。此外，它们可能包括其他功能，如验证、错误处理和日志记录。</p><p>我们将使用_BookRepository_创建一个_BookService_来存储和检索书籍：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Singleton
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

    public Flux\`\`\`&lt;Book&gt;\`\`\` findByYearGreaterThan(int year) {
        return bookRepository.findByYearGreaterThan(year);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用构造函数注入将_BookRepository_注入到构造函数中。**<em>@Singleton_注解表示只会创建服务的一个实例。**这类似于Spring Boot中的</em>@Component_注解。</p><p>接下来，我们有_save()_、<em>findById()</em>、_update()_和_deleteById()_方法来保存、查找、更新和从数据库中删除书籍。<strong>_block()_方法阻塞执行，直到结果可用。</strong></p><p>最后，我们有一个_findByYearGreaterThan()_方法来查找在给定年份之后出版的书籍。</p><h2 id="_6-控制器" tabindex="-1"><a class="header-anchor" href="#_6-控制器"><span>6. 控制器</span></a></h2><p>控制器用于处理传入的请求并返回响应。在Micronaut中，我们可以使用注解来创建控制器，并根据不同的路径和HTTP方法配置路由。</p><h3 id="_6-1-控制器" tabindex="-1"><a class="header-anchor" href="#_6-1-控制器"><span>6.1. 控制器</span></a></h3><p>我们将创建一个_BookController_来处理与书籍相关的请求：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Controller(&quot;/books&quot;)
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @Post
    public String createBook(@Body Book book) {
        @Nullable ObjectId bookId = bookService.save(book);
        if (null == bookId) {
            return &quot;Book not created&quot;;
        } else {
            return &quot;Book created with id: &quot; + bookId.getId();
        }
    }

    @Put
    public String updateBook(@Body Book book) {
        @Nullable ObjectId bookId = bookService.update(book);
        if (null == bookId) {
            return &quot;Book not updated&quot;;
        } else {
            return &quot;Book updated with id: &quot; + bookId.getId();
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们用_@Controller_注解类来表示它是一个控制器。我们还指定了控制器的基本路径为_/books_。</p><p>让我们看看控制器的一些重要部分：</p><ul><li>首先，我们将_BookService_注入到构造函数中。</li><li>然后，我们有一个_createBook()<em>方法来创建一本新书。</em>@Post_注解表示该方法处理POST请求。</li><li><strong>由于我们想要将传入的请求体转换为_Book_对象，我们使用了_@Body_注解。</strong></li><li>**当书籍成功保存时，将返回一个_ObjectId_。**我们使用了_@Nullable_注解来表示如果书籍没有保存，则该值可以为null。</li><li>类似地，我们有一个_updateBook()<em>方法来更新现有的书籍。我们使用</em>@Put_注解，因为该方法处理PUT请求。</li><li>方法返回一个字符串响应，指示书籍是否成功创建或更新。</li></ul><h3 id="_6-2-路径变量" tabindex="-1"><a class="header-anchor" href="#_6-2-路径变量"><span>6.2. 路径变量</span></a></h3><p>我们可以使用路径变量从路径中提取值。为了演示这一点，让我们添加按ID查找和删除书籍的方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Delete(&quot;/{id}&quot;)
public String deleteBook(String id) {
    Long bookId = bookService.deleteById(id);
    if (0 == bookId) {
        return &quot;Book not deleted&quot;;
    } else {
        return &quot;Book deleted with id: &quot; + bookId;
    }
}

@Get(&quot;/{id}&quot;)
public Book findById(@PathVariable(&quot;id&quot;) String identifier) {
    return bookService.findById(identifier);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**路径变量在路径中用花括号表示。**在这个例子中，_{id}_是一个路径变量，它将从路径中提取并传递给方法。</p><p>默认情况下，路径变量的name应该与方法参数的名称匹配。这是_deleteBook()<em>方法的情况。如果它不匹配，**我们可以使用</em>@PathVariable_注解来为路径变量指定不同的名称。**这是_findById()_方法的情况。</p><h3 id="_6-3-查询参数" tabindex="-1"><a class="header-anchor" href="#_6-3-查询参数"><span>6.3. 查询参数</span></a></h3><p>我们可以使用查询参数从查询字符串中提取值。让我们添加一个方法来查找在给定年份之后出版的书籍：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Get(&quot;/published-after&quot;)
public Flux\`\`\`&lt;Book&gt;\`\`\` findByYearGreaterThan(@QueryValue(&quot;year&quot;) int year) {
    return bookService.findByYearGreaterThan(year);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>_@QueryValue_表示值将作为查询参数提供。此外，我们需要指定查询参数的名称作为注解的值。</strong></p><p>当我们向这个方法发出请求时，我们将在URL中附加一个_year_参数并提供它的值。</p><h2 id="_7-测试" tabindex="-1"><a class="header-anchor" href="#_7-测试"><span>7. 测试</span></a></h2><p>我们可以使用_curl_或像_Postman_这样的应用程序来测试应用程序。让我们使用_curl_来测试应用程序。</p><h3 id="_7-1-创建一本书" tabindex="-1"><a class="header-anchor" href="#_7-1-创建一本书"><span>7.1. 创建一本书</span></a></h3><p>让我们使用POST请求创建一本书：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>curl --request POST \\
  --url http://localhost:8080/books \\
  --header &#39;Content-Type: application/json&#39; \\
  --data &#39;{
    &quot;title&quot;: &quot;1984&quot;,
    &quot;year&quot;: 1949,
    &quot;author&quot;: {
        &quot;firstName&quot;: &quot;George&quot;,
        &quot;lastName&quot;: &quot;Orwel&quot;
    }
  }&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们使用_-request POST_选项来表示请求是POST请求。然后我们使用_-header_选项提供标题。在这里，我们设置内容类型为_application/json_。最后，我们使用_-data_选项来指定请求体。</p><p>这是一个示例响应：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Book created with id: 650e86a7f0f1884234c80e3f
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_7-2-查找一本书" tabindex="-1"><a class="header-anchor" href="#_7-2-查找一本书"><span>7.2. 查找一本书</span></a></h3><p>接下来，让我们查找我们刚刚创建的那本书：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>curl --request GET \\
  --url http://localhost:8080/books/650e86a7f0f1884234c80e3f
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这将返回ID为_650e86a7f0f1884234c80e3f_的书籍。</p><h3 id="_7-3-更新一本书" tabindex="-1"><a class="header-anchor" href="#_7-3-更新一本书"><span>7.3. 更新一本书</span></a></h3><p>接下来，让我们更新这本书。作者的姓氏有一个拼写错误。所以让我们纠正它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>curl --request PUT \\
  --url http://localhost:8080/books \\
  --header &#39;Content-Type: application/json&#39; \\
  --data &#39;{
  &quot;id&quot;: {
    &quot;$oid&quot;: &quot;650e86a7f0f1884234c80e3f&quot;
  },
  &quot;title&quot;: &quot;1984&quot;,
  &quot;author&quot;: {
    &quot;firstName&quot;: &quot;George&quot;,
    &quot;lastName&quot;: &quot;Orwell&quot;
  },
  &quot;year&quot;: 1949
}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们再次查找这本书，我们将看到作者的姓氏现在是_Orwell_。</p><h3 id="_7-4-自定义查询" tabindex="-1"><a class="header-anchor" href="#_7-4-自定义查询"><span>7.4. 自定义查询</span></a></h3><p>接下来，让我们查找所有1940年之后出版的书籍：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>curl --request GET \\
  --url &#39;http://localhost:8080/books/published-after?year=1940&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们执行这个命令时，它调用我们的API并返回一个JSON数组，其中包含所有1940年之后出版的书籍的列表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[
    {
        &quot;id&quot;: {
            &quot;$oid&quot;: &quot;650e86a7f0f1884234c80e3f&quot;
        },
        &quot;title&quot;: &quot;1984&quot;,
        &quot;author&quot;: {
            &quot;firstName&quot;: &quot;George&quot;,
            &quot;lastName&quot;: &quot;Orwell&quot;
        },
        &quot;year&quot;: 1949
    }
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类似地，如果我们尝试查找所有1950年之后出版的书籍，我们将得到一个空数组：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>curl --request GET \\
  --url &#39;http://localhost:8080/books/published-after?year=1950&#39;
[]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-错误处理" tabindex="-1"><a class="header-anchor" href="#_8-错误处理"><span>8. 错误处理</span></a></h2><p>接下来，让我们看看如何在应用程序中处理错误。我们将看看两种常见的场景：</p><ul><li>在尝试获取、更新或删除书籍时找不到书籍。</li><li>在创建或更新书籍时提供了错误的输入。</li></ul><h3 id="_8-1-bean验证" tabindex="-1"><a class="header-anchor" href="#_8-1-bean验证"><span>8.1. Bean验证</span></a></h3><p>首先，让我们看看如何处理错误的输入。为此，我们可以使用Java的Bean验证API。</p><p>让我们向_Book_类添加一些约束：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class Book {
    @NotBlank
    private String title;
    @NotNull
    private Author author;
    // ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>@NotBlank_注解表示标题不能为空。同样，我们使用</em>@NotNull_注解来表示作者不能为null。</p><p><strong>然后，为了在我们的控制器中启用输入验证，我们需要使用_@Valid_注解：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Post
public String createBook(@Valid @Body Book book) {
    // ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当输入无效时，控制器返回一个400 _Bad Request_响应，其中包含错误的详细信息的JSON正文：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;_links&quot;: {
        &quot;self&quot;: [
            {
                &quot;href&quot;: &quot;/books&quot;,
                &quot;templated&quot;: false
            }
        ]
    },
    &quot;_embedded&quot;: {
        &quot;errors&quot;: [
            {
                &quot;message&quot;: &quot;book.author: must not be null&quot;
            },
            {
                &quot;message&quot;: &quot;book.title: must not be blank&quot;
            }
        ]
    },
    &quot;message&quot;: &quot;Bad Request&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-2-自定义错误处理程序" tabindex="-1"><a class="header-anchor" href="#_8-2-自定义错误处理程序"><span>8.2. 自定义错误处理程序</span></a></h3><p>在上面的例子中，我们可以看到Micronaut默认如何处理错误。然而，如果我们想要改变这种行为，我们可以创建一个自定义错误处理程序。</p><p>由于验证错误是_ConstraintViolation_类的实例，让我们创建一个自定义错误处理方法来处理_ConstraintViolationException_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Error(exception = ConstraintViolationException.class)
public MutableHttpResponse\`\`&lt;String&gt;\`\` onSavedFailed(ConstraintViolationException ex) {
    return HttpResponse.badRequest(ex.getConstraintViolations().stream()
      .map(cv -&gt; cv.getPropertyPath() + &quot; &quot; + cv.getMessage())
      .toList().toString());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>任何控制器抛出_ConstraintViolationException_时，Micronaut都会调用这个方法。然后它返回一个400 Bad Request响应，其中包含错误的详细信息的JSON正文：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[
    &quot;createBook.book.author must not be null&quot;,
    &quot;createBook.book.title must not be blank&quot;
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-3-自定义异常" tabindex="-1"><a class="header-anchor" href="#_8-3-自定义异常"><span>8.3. 自定义异常</span></a></h3><p>接下来，让我们看看如何处理找不到书籍的情况。在这种情况下，我们可以创建一个自定义异常：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class BookNotFoundException extends RuntimeException {
    public BookNotFoundException(long id) {
        super(&quot;Book with id &quot; + id + &quot; not found&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们可以从控制器中抛出这个异常：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Get(&quot;/{id}&quot;)
public Book findById(@PathVariable(&quot;id&quot;) String identifier) throws BookNotFoundException {
    Book book = bookService.findById(identifier);
    if (null == book) {
        throw new BookNotFoundException(identifier);
    } else {
        return book;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当找不到书籍时，控制器抛出_BookNotFoundException_。</p><p>最后，我们可以创建一个自定义错误处理方法来处理_BookNotFoundException_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Error(exception = BookNotFoundException.class)
public MutableHttpResponse\`\`&lt;String&gt;\`\` onBookNotFound(BookNotFoundException ex) {
    return HttpResponse.notFound(ex.getMessage());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当提供了一个不存在的书籍ID时，控制器返回一个404 Not Found响应，其中包含错误的详细信息的JSON正文：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Book with id 650e86a7f0f1884234c80e3f not found
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_9-结论" tabindex="-1"><a class="header-anchor" href="#_9-结论"><span>9. 结论</span></a></h2><p>在本文中，我们探讨了如何使用Micronaut和MongoDB创建REST API。首先，我们了解了如何创建MongoDB仓库、一个简单的控制器以及如何使用路径变量和查询参数。然后，我们使用_curl_测试了应用程序。最后，我们了解了如何在控制器中处理错误。</p><p>应用程序的完整源代码可在GitHub上获取。 OK</p>`,114),d=[l];function s(o,r){return n(),i("div",null,d)}const v=e(a,[["render",s],["__file","2024-06-24-Creating Reactive APIs With Micronaut and MongoDB.html.vue"]]),b=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-Creating%20Reactive%20APIs%20With%20Micronaut%20and%20MongoDB.html","title":"使用Micronaut和MongoDB创建响应式API","lang":"zh-CN","frontmatter":{"date":"2024-06-25T00:00:00.000Z","category":["Reactive APIs","Micronaut","MongoDB"],"tag":["Micronaut","MongoDB","Reactive Programming","REST API"],"head":[["meta",{"name":"keywords","content":"Micronaut, MongoDB, Reactive APIs, REST API"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-Creating%20Reactive%20APIs%20With%20Micronaut%20and%20MongoDB.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Micronaut和MongoDB创建响应式API"}],["meta",{"property":"og:description","content":"使用Micronaut和MongoDB创建响应式API 在本教程中，我们将探讨如何使用Micronaut和MongoDB创建响应式REST API。 Micronaut是一个用于在Java虚拟机(JVM)上构建微服务和无服务器应用程序的框架。 我们将看看如何使用Micronaut创建实体、仓库、服务和控制器。 2. 项目设置 对于我们的代码示例，我们将..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T22:52:31.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Micronaut"}],["meta",{"property":"article:tag","content":"MongoDB"}],["meta",{"property":"article:tag","content":"Reactive Programming"}],["meta",{"property":"article:tag","content":"REST API"}],["meta",{"property":"article:published_time","content":"2024-06-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-24T22:52:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Micronaut和MongoDB创建响应式API\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-25T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-24T22:52:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Micronaut和MongoDB创建响应式API 在本教程中，我们将探讨如何使用Micronaut和MongoDB创建响应式REST API。 Micronaut是一个用于在Java虚拟机(JVM)上构建微服务和无服务器应用程序的框架。 我们将看看如何使用Micronaut创建实体、仓库、服务和控制器。 2. 项目设置 对于我们的代码示例，我们将..."},"headers":[{"level":2,"title":"2. 项目设置","slug":"_2-项目设置","link":"#_2-项目设置","children":[{"level":3,"title":"2.1. 初始化项目","slug":"_2-1-初始化项目","link":"#_2-1-初始化项目","children":[]},{"level":3,"title":"2.2. MongoDB设置","slug":"_2-2-mongodb设置","link":"#_2-2-mongodb设置","children":[]}]},{"level":2,"title":"3. 实体","slug":"_3-实体","link":"#_3-实体","children":[]},{"level":2,"title":"4. 仓库","slug":"_4-仓库","link":"#_4-仓库","children":[]},{"level":2,"title":"5. 服务","slug":"_5-服务","link":"#_5-服务","children":[]},{"level":2,"title":"6. 控制器","slug":"_6-控制器","link":"#_6-控制器","children":[{"level":3,"title":"6.1. 控制器","slug":"_6-1-控制器","link":"#_6-1-控制器","children":[]},{"level":3,"title":"6.2. 路径变量","slug":"_6-2-路径变量","link":"#_6-2-路径变量","children":[]},{"level":3,"title":"6.3. 查询参数","slug":"_6-3-查询参数","link":"#_6-3-查询参数","children":[]}]},{"level":2,"title":"7. 测试","slug":"_7-测试","link":"#_7-测试","children":[{"level":3,"title":"7.1. 创建一本书","slug":"_7-1-创建一本书","link":"#_7-1-创建一本书","children":[]},{"level":3,"title":"7.2. 查找一本书","slug":"_7-2-查找一本书","link":"#_7-2-查找一本书","children":[]},{"level":3,"title":"7.3. 更新一本书","slug":"_7-3-更新一本书","link":"#_7-3-更新一本书","children":[]},{"level":3,"title":"7.4. 自定义查询","slug":"_7-4-自定义查询","link":"#_7-4-自定义查询","children":[]}]},{"level":2,"title":"8. 错误处理","slug":"_8-错误处理","link":"#_8-错误处理","children":[{"level":3,"title":"8.1. Bean验证","slug":"_8-1-bean验证","link":"#_8-1-bean验证","children":[]},{"level":3,"title":"8.2. 自定义错误处理程序","slug":"_8-2-自定义错误处理程序","link":"#_8-2-自定义错误处理程序","children":[]},{"level":3,"title":"8.3. 自定义异常","slug":"_8-3-自定义异常","link":"#_8-3-自定义异常","children":[]}]},{"level":2,"title":"9. 结论","slug":"_9-结论","link":"#_9-结论","children":[]}],"git":{"createdTime":1719269551000,"updatedTime":1719269551000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":10.38,"words":3113},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-Creating Reactive APIs With Micronaut and MongoDB.md","localizedDate":"2024年6月25日","excerpt":"<hr>\\n<h1>使用Micronaut和MongoDB创建响应式API</h1>\\n<p>在本教程中，我们将探讨如何使用Micronaut和MongoDB创建响应式REST API。</p>\\n<p>Micronaut是一个用于在Java虚拟机(JVM)上构建微服务和无服务器应用程序的框架。</p>\\n<p>我们将看看如何使用Micronaut创建实体、仓库、服务和控制器。</p>\\n<h2>2. 项目设置</h2>\\n<p>对于我们的代码示例，我们将创建一个CRUD应用程序，用于存储和检索MongoDB数据库中的书籍。首先，让我们使用Micronaut Launch创建一个Maven项目，设置依赖项并配置数据库。</p>","autoDesc":true}');export{v as comp,b as data};
