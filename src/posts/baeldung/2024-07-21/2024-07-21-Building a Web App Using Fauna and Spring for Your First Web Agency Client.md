---
date: 2022-03-18
category:
  - Spring
  - FaunaDB
tag:
  - Spring
  - FaunaDB
  - Java
head:
  - - meta
    - name: keywords
      content: FaunaDB, Spring, Java, Web Application
------
# 1. 引言

在本文中，我们将使用 Spring 和 Java 17 构建一个由 Fauna 数据库服务驱动的博客服务的后端。

# 2. 项目设置

在我们开始构建服务之前，我们需要执行一些初始设置步骤——具体来说，我们需要创建一个 Fauna 数据库和一个空白的 Spring 应用程序。

### 2.1. 创建 Fauna 数据库

**在开始之前，我们需要一个 Fauna 数据库来使用。** 如果我们还没有一个，我们需要在 Fauna 创建一个新账户。

完成这些后，我们可以创建一个新的数据库。给这个数据库起一个名字和一个地区，并选择不包括演示数据，因为我们想构建我们自己的模式：

![img](https://www.baeldung.com/wp-content/uploads/2022/03/Screenshot-2022-01-17-at-07.39.16.png)

接下来，**我们需要创建一个安全密钥来从我们的应用程序访问这个数据库。** 我们可以从数据库的安全选项卡中完成这个操作：

![img](https://www.baeldung.com/wp-content/uploads/2022/03/Screenshot-2022-01-17-at-07.42.27-1024x531.png)

在这里，我们需要选择一个“服务器”角色，并可选地给密钥命名。这意味着该密钥可以访问这个数据库，但只能访问这个数据库。另外，我们有一个“管理员”选项，可以用来访问我们账户中的任何数据库：

![img](https://www.baeldung.com/wp-content/uploads/2022/03/Screenshot-2022-01-17-at-07.45.21-1024x730.png)

完成这些后，**我们需要记下我们的秘密。** 这是访问服务所必需的，但出于安全原因，一旦我们离开这个页面，就不能再获取它了。

### 2.2. 创建 Spring 应用程序

**一旦我们有了数据库，我们就可以创建我们的应用程序。** 由于这将是一个 Spring webapp，我们最好从 Spring Initializr 启动这个项目。

我们希望选择使用最新发布的 Spring 和最新 LTS 版本的 Java 创建 Maven 项目的选项——在撰写本文时，这些分别是 Spring 2.6.2 和 Java 17。我们还希望选择 Spring Web 和 Spring Security 作为我们服务的依赖项：

![img](https://www.baeldung.com/wp-content/uploads/2022/03/Screenshot-2022-01-17-at-07.57.39-1024x597.png)

完成这些后，我们可以点击“生成”按钮下载我们的启动项目。

接下来，我们需要将 Fauna 驱动程序添加到我们的项目中。这是通过向生成的 _pom.xml_ 文件添加对它们的依赖来完成的：

```xml
`<dependency>`
    `<groupId>`com.faunadb`</groupId>`
    `<artifactId>`faunadb-java`</artifactId>`
    `<version>`4.2.0`</version>`
    `<scope>`compile`</scope>`
`</dependency>`
```

此时，我们应该能够执行 _mvn install_ 并成功下载我们需要的所有内容。

### 2.3. 配置 Fauna 客户端

**一旦我们有了 Spring webapp 可以使用，我们需要一个 Fauna 客户端来使用数据库。**

首先，我们需要进行一些配置。为此，我们将向我们的 _application.properties_ 文件添加两个属性，提供我们数据库的正确值：

```properties
fauna.region=us
fauna.secret=`<Secret>`
```

然后，我们将想要一个新的 Spring 配置类来构建 Fauna 客户端：

```java
@Configuration
class FaunaConfiguration {
    @Value("https://db.${fauna.region}.fauna.com/")
    private String faunaUrl;

    @Value("${fauna.secret}")
    private String faunaSecret;

    @Bean
    FaunaClient getFaunaClient() throws MalformedURLException {
        return FaunaClient.builder()
          .withEndpoint(faunaUrl)
          .withSecret(faunaSecret)
          .build();
    }
}
```

这使得 _FaunaClient_ 的一个实例对 Spring 上下文可用，其他 bean 可以使用。

# 3. 添加用户支持

**在为我们的 API 添加帖子支持之前，我们需要支持将撰写它们的用户。** 为此，我们将使用 Spring Security 并将其连接到表示用户记录的 Fauna 集合。

### 3.1. 创建用户集合

**首先，我们想要创建集合。** 这是通过导航到数据库的集合屏幕，使用“新建集合”按钮，并填写表单来完成的。在这种情况下，我们想要创建一个“users”集合，并使用默认设置：

![img](https://www.baeldung.com/wp-content/uploads/2022/03/Screenshot-2022-01-18-at-08.16.36-1024x625.png)

接下来，我们将添加一个用户记录。为此，我们按下集合中的“新建文档”按钮，并提供以下 JSON：

```json
{
  "username": "baeldung",
  "password": "Pa55word",
  "name": "Baeldung"
}
```

**请注意，我们在这里以明文形式存储密码。请记住，这是一种非常糟糕的做法，只是为了本教程的方便而这样做。**

最后，我们需要一个索引。每当我们想要通过除引用之外的任何字段访问记录时，我们需要创建一个索引，让我们能够这样做。在这里，我们想要通过用户名访问记录。这是通过按下“新建索引”按钮并填写表单来完成的：

![img](https://www.baeldung.com/wp-content/uploads/2022/03/Screenshot-2022-01-18-at-09.01.13-1024x985.png)

现在，我们将能够使用“users_by_username”索引编写 FQL 查询来查找我们的用户。例如：

```java
Map(
  Paginate(Match(Index("users_by_username"), "baeldung")),
  Lambda("user", Get(Var("user")))
)
```

上述将返回我们之前创建的记录。

### 3.2. 与 Fauna 进行身份验证

**现在我们在 Fauna 中有了用户集合，我们可以配置 Spring Security 以对此进行身份验证。**

为了实现这一点，我们首先需要一个 _UserDetailsService_ 来查找 Fauna 中的用户：

```java
public class FaunaUserDetailsService implements UserDetailsService {
    private final FaunaClient faunaClient;

    // 标准构造函数

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            Value user = faunaClient.query(Map(
              Paginate(Match(Index("users_by_username"), Value(username))),
              Lambda(Value("user"), Get(Var("user"))))
            ).get();

            Value userData = user.at("data").at(0).orNull();
            if (userData == null) {
                throw new UsernameNotFoundException("用户未找到");
            }

            return User.withDefaultPasswordEncoder()
              .username(userData.at("data", "username").to(String.class).orNull())
              .password(userData.at("data", "password").to(String.class).orNull())
              .roles("USER")
              .build();
        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
```

接下来，我们需要一些 Spring 配置来设置它。这是将上述 _UserDetailsService_ 连接起来的标准的 Spring Security 配置：

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfiguration {

    @Autowired
    private FaunaClient faunaClient;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(CsrfConfigurer::disable)
            .authorizeHttpRequests(requests -> requests.requestMatchers("/**")
                .permitAll())
            .httpBasic(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new FaunaUserDetailsService(faunaClient);
    }
}
```

此时，我们可以添加标准的 _@PreAuthorize_ 注解到我们的代码中，并根据我们的身份验证详情是否存在于 Fauna 中的“users”集合来接受或拒绝请求。

# 4. 添加列出帖子的支持

**如果我们的博客服务不支持帖子的概念，它就不会出色。** 这些是已经编写并可以由其他人阅读的实际博客帖子。

### 4.1. 创建帖子集合

**像以前一样，我们首先需要一个集合来存储帖子。** 这与之前相同，只是称为“posts”而不是“users”。我们将有四个字段：

- title – 帖子的标题。
- content – 帖子的内容。
- created – 帖子撰写的时间戳。
- authorRef – 帖子作者的“users”记录的引用。

我们还将需要两个索引。第一个是“posts_by_author”，它将允许我们搜索具有特定作者的“posts”记录：

第二个索引将是“posts_sort_by_created继续翻译：

_desc”。这将允许我们按创建日期排序结果，以便首先返回最近创建的帖子。我们需要以不同方式创建此索引，因为它依赖于 Web UI 中不可用的功能 - 表明索引存储的值是相反的顺序。

为此，我们需要在 Fauna Shell 中执行一段 FQL：

```java
CreateIndex({
  name: "posts_sort_by_created_desc",
  source: Collection("posts"),
  terms: [{ field: ["ref"] }],
  values: [
    { field: ["data", "created"], reverse: true },
    { field: ["ref"] }
  ]
})
```

**Web UI 所做的一切都可以在这种方式中完成，这允许我们更精确地控制要执行的操作。**

然后，我们可以在 Fauna Shell 中创建一个帖子，以获取一些起始数据：

```java
Create(
  Collection("posts"),
  {
    data: {
      title: "My First Post",
      contents: "This is my first post",
      created: Now(),
      authorRef: Select("ref", Get(Match(Index("users_by_username"), "baeldung")))
    }
  }
)
```

在这里，我们需要确保“authorRef”的值是我们之前创建的“users”记录中的正确值。我们通过查询“users_by_username”索引来获取 ref，通过查找我们的用户名来实现。

### 4.2. 帖子服务

**现在 Fauna 中有了对帖子的支持，我们可以在应用程序中构建一个服务层来处理它。**

首先，我们需要一些 Java 记录来表示我们正在获取的数据。这将包括一个 _Author_ 和一个 _Post_ 记录类：

```java
public record Author(String username, String name) {}

public record Post(String id, String title, String content, Author author, Instant created, Long version) {}
```

现在，我们可以开始我们的 Posts 服务。这将是一个 Spring 组件，它包装 _FaunaClient_ 并使用它来访问数据存储：

```java
@Component
public class PostsService {
    @Autowired
    private FaunaClient faunaClient;
}
```

### 4.3. 获取所有帖子

**在 _PostsService_ 中，我们现在可以实现一个方法来获取所有帖子。** 在这一点上，我们不打算担心适当的分页，而只是使用默认值 - 这意味着结果集中的前 64 个文档。

为了实现这一点，我们将向我们的 _PostsService_ 类添加以下方法：

```java
List```<Post>``` getAllPosts() throws Exception {
    var postsResult = faunaClient.query(Map(
      Paginate(
        Join(
          Documents(Collection("posts")),
          Index("posts_sort_by_created_desc")
        )
      ),
      Lambda(
        Arr(Value("extra"), Value("ref")),
        Obj(
          "post", Get(Var("ref")),
          "author", Get(Select(Arr(Value("data")), Value("authorRef")), Get(Var("ref"))))
        )
      )
    )).get();

    var posts = postsResult.at("data").asCollectionOf(Value.class).get();
    return posts.stream().map(this::parsePost).collect(Collectors.toList());
}
```

**这执行了一个查询，以检索“posts”集合中的每个文档，并根据“posts_sort_by_created_desc”索引进行排序。** 然后应用一个 Lambda 来构建响应，由每个条目的两个文档组成 - 本身的帖子和帖子的作者。

现在，我们需要能够将此响应转换回我们的 _Post_ 对象：

```java
private Post parsePost(Value entry) {
    var author = entry.at("author");
    var post = entry.at("post");

    return new Post(
      post.at("ref").to(Value.RefV.class).get().getId(),
      post.at("data", "title").to(String.class).get(),
      post.at("data", "contents").to(String.class).get(),
      new Author(
        author.at("data", "username").to(String.class).get(),
        author.at("data", "name").to(String.class).get()
      ),
      post.at("data", "created").to(Instant.class).get(),
      post.at("ts").to(Long.class).get()
    );
}
```

这将从我们的查询中获取单个结果，提取其所有值，并构建我们更丰富的对象。

请注意，“ts”字段是记录最后更新时间的时间戳，但它不是 Fauna 的 _Timestamp_ 类型。相反，它是一个表示自 UNIX 纪元以来的微秒数的 _Long_。在这种情况下，我们将其视为一个不透明的版本标识符，而不是解析为时间戳。

我们还想检索特定作者撰写的所有帖子，而不仅仅是曾经写过的每个帖子。**这是通过使用我们的“posts_by_author”索引而不是匹配每个文档来实现的。**

我们还将链接到“users_by_username”索引，以便按用户名而不是用户记录的 ref 进行查询。

为此，我们将向 _PostsService_ 类添加一个新方法：

```java
List```<Post>``` getAuthorPosts(String author) throws Exception {
    var postsResult = faunaClient.query(Map(
      Paginate(
        Join(
          Match(Index("posts_by_author"), Select(Value("ref"), Get(Match(Index("users_by_username"), Value(author))))),
          Index("posts_sort_by_created_desc")
        )
      ),
      Lambda(
        Arr(Value("extra"), Value("ref")),
        Obj(
          "post", Get(Var("ref")),
          "author", Get(Select(Arr(Value("data")), Value("authorRef")), Get(Var("ref"))))
        )
      )
    )).get();

    var posts = postsResult.at("data").asCollectionOf(Value.class).get();
    return posts.stream().map(this::parsePost).collect(Collectors.toList());
}
```

### 4.5. 帖子控制器

**现在我们能够为我们的服务编写帖子控制器，它将允许 HTTP 请求来检索帖子。** 这将在“/posts” URL 上监听，并将返回所有帖子，或者根据是否提供了“author”参数，返回单个作者的帖子：

```java
@RestController
@RequestMapping("/posts")
public class PostsController {
    @Autowired
    private PostsService postsService;

    @GetMapping
    public List```<Post>``` listPosts(@RequestParam(value = "author", required = false) String author)
        throws Exception {
        return author == null
          ? postsService.getAllPosts()
          : postsService.getAuthorPosts(author);
    }
}
```

在这一点上，我们可以启动应用程序，并向 _/posts_ 或 _/posts?author=baeldung_ 发送请求，并获得结果：

```json
[
    {
        "author": {
            "name": "Baeldung",
            "username": "baeldung"
        },
        "content": "Introduction to FaunaDB with Spring",
        "created": "2022-01-25T07:36:24.563534Z",
        "id": "321742264960286786",
        "title": "Introduction to FaunaDB with Spring",
        "version": 1643096184600000
    },
    {
        "author": {
            "name": "Baeldung",
            "username": "baeldung"
        },
        "content": "This is my second post",
        "created": "2022-01-25T07:34:38.303614Z",
        "id": "321742153548038210",
        "title": "My Second Post",
        "version": 1643096078350000
    },
    {
        "author": {
            "name": "Baeldung",
            "username": "baeldung"
        },
        "content": "This is my first post",
        "created": "2022-01-25T07:34:29.873590Z",
        "id": "321742144715882562",
        "title": "My First Post",
        "version": 1643096069920000
    }
]
```

# 5. 创建和更新帖子

到目前为止，我们有一个完全只读的服务，可以让我们获取最新的帖子。**然而，为了更有帮助，我们也想创建和更新帖子。**

### 5.1. 创建新帖子

首先，我们将支持创建新帖子。为此，我们将向我们的 _PostsService_ 添加一个新方法：

```java
public void createPost(String author, String title, String contents) throws Exception {
    faunaClient.query(
      Create(Collection("posts"),
        Obj(
          "data", Obj(
            "title", Value(title),
            "contents", Value(contents),
            "created", Now(),
            "authorRef", Select(Value("ref"), Get(Match(Index("users_by_username"), Value(author))))
          )
        )
      )
    ).get();
}
```

如果这看起来很熟悉，那是因为它与我们之前在 Fauna shell 中创建新帖子时的 Java 等价物。

接下来，我们可以向 _