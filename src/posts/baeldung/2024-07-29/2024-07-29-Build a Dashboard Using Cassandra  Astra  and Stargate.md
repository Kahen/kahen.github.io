---
date: 2021-05-01
category:
  - Cassandra
  - Astra
tag:
  - DataStax
  - Stargate
head:
  - - meta
    - name: keywords
      content: Cassandra, Astra, Stargate, Dashboard, Java, Spring Boot
  - - meta
    - name: description
      content: 构建一个使用Cassandra, Astra和Stargate的仪表板。
------
# 使用Cassandra, Astra和Stargate构建仪表板

在本文中，我们将构建“托尼·斯塔克的复仇者状态仪表板”，复仇者联盟用来监控团队成员状态的仪表板。

**这将使用DataStax Astra构建，这是一个由Apache Cassandra提供支持的DBaaS，使用Stargate提供额外的API来使用它。** 在此基础上，我们将使用Spring Boot应用程序来呈现仪表板并显示正在发生的情况。

我们将使用Java 16构建此项目，因此在继续之前，请确保已经安装并准备好使用。

## 2. 什么是Astra？

DataStax Astra是一个由Apache Cassandra提供支持的数据库即服务产品。**这为我们提供了一个完全托管、完全管理的Cassandra数据库，我们可以用它来存储数据，包括Cassandra提供的所有可扩展性、高可用性和性能。**

除此之外，Astra还整合了Stargate数据平台，该平台通过不同的API暴露相同的底层数据。这使我们可以使用REST和GraphQL API访问传统的Cassandra表——这两种API都是100%兼容的，并且与传统的CQL API兼容。这些可以使我们的数据访问非常灵活，只需要一个标准的HTTP客户端——例如Spring的_RestTemplate_。

它还提供了一个JSON文档API，允许更灵活的数据访问。有了这个API，就不需要模式，并且每个记录都可以是不同的形状，如果需要的话。此外，记录可以尽可能复杂，支持JSON的全部功能来表示数据。

但这确实带来了成本——文档API与其他API不互换，因此重要的是事先决定如何建模数据以及使用哪些API来访问它。

## 3. 我们的应用程序数据模型

**我们正在围绕Cassandra上的Astra系统构建我们的系统。这将直接影响我们建模数据的方式。**

Cassandra旨在允许大量数据具有非常高的吞吐量，并且以表格形式存储记录。Astra增加了一些替代API——REST和GraphQL——以及使用文档API表示文档以及简单的表格数据的能力。

这仍然是由Cassandra支持的，它以不同的方式进行模式设计。在现代系统中，空间不再是限制。数据复制变得不再是问题，消除了跨集合或数据分区的连接的需求。这意味着我们可以在我们的集合中为我们的需求非规范化我们的数据。

**因此，我们的数据模型将围绕两个集合——_events_和_statuses_构建。** _events_集合是曾经发生过的每个状态事件的记录——这可能变得非常大，这是Cassandra的理想选择。这将在下一篇文章中更详细地介绍。

这个集合中的记录如下所示：

| avenger | falcon |
| --- | --- |
| timestamp | 2021-04-02T14:23:12Z |
| latitude | 40.714558 |
| longitude | -73.975029 |
| status | 0.72 |

这为我们提供了一个单独的事件更新，提供了确切的时间戳和更新的位置以及复仇者状态的百分比值。

_statuses_集合包含一个包含仪表板数据的单个文档，这是对输入到_events_集合中的数据的非规范化、汇总视图。这个文档看起来类似于这样：

```
{
    "falcon": {
{        "realName": "Sam Wilson"}
{        "location": "New York"}
{        "status": "INJURED"}
{        "name": "Falcon"}
    },
    "wanda": {
{        "realName": "Wanda Maximoff"}
{        "location": "New York"}
{        "status": "HEALTHY"}
    }
}
```

在这里，我们有一些不经常改变的通用数据——_name_和_realName_字段——我们还有一些从这个复仇者的最新事件生成的汇总数据——_location_是从_latitude_和_longitude_值派生出来的，_status_是对事件中_status_字段的一般总结。

本文重点介绍_statuses_集合，并使用文档API访问它。我们的下一篇文章将展示如何使用基于行的数据的_events_集合。

## 4. 如何设置DataStax Astra

在我们开始应用程序之前，我们需要一个存储我们数据的地方。我们将使用DataStax Astra提供的Cassandra。**为了开始，我们需要在Astra注册一个免费账户并创建一个新的数据库。** 这需要为数据库和其中的keyspace提供合理的名称：

![img](https://www.baeldung.com/wp-content/uploads/2021/05/db-setup.png)

（注意 – 屏幕截图在发布时是准确的，但自那以后可能已经改变）

**这将需要几分钟来设置。一旦完成，我们需要创建一个访问令牌。**

为了做到这一点，我们需要访问新创建的数据库的“设置”选项卡并生成一个令牌：

![img](https://www.baeldung.com/wp-content/uploads/2021/05/db-token.png)

完成所有这些后，我们还需要我们的数据库详细信息。这包括：

- 数据库ID
- 区域
- Keyspace

这些可以在“连接”选项卡上找到。

最后，我们需要一些数据。为了本文的目的，我们使用一些预填充的数据。这可以在这里的shell脚本中找到。

## 5. 如何设置Spring Boot

我们将使用Spring Initializr创建我们的新应用程序；**我们还将使用Java 16 - 允许我们使用记录。** 这反过来意味着我们需要Spring Boot 2.5 - 目前这意味着2.5.0-M3。

此外，我们需要Spring Web和Thymeleaf作为依赖项：

![img](https://www.baeldung.com/wp-content/uploads/2021/05/spring-initaliz-avengers.png)

一旦准备好，我们可以下载并解压到某个地方，然后我们就可以构建我们的应用程序了。

在继续之前，我们还需要配置我们的Cassandra凭据。这些都进入_src/main/resources/application.properties_，如从Astra仪表板中获取：

```
ASTRA_DB_ID=e26d52c6-fb2d-4951-b606-4ea11f7309ba
ASTRA_DB_REGION=us-east-1
ASTRA_DB_KEYSPACE=avengers
ASTRA_DB_APPLICATION_TOKEN=AstraCS:xxx-token-here
```

这些密钥以这种方式管理仅仅是为了本文的目的。在真正的应用程序中，它们应该被安全地管理，例如使用Vault。

## 6. 编写文档客户端

**为了与Astra交互，我们需要一个客户端，可以进行必要的API调用。** 这将直接在Astra公开的文档API方面工作，允许我们的应用程序以丰富的文档形式工作。在这里，我们需要能够通过ID获取单个记录，并对记录进行部分更新。

为了管理这一点，我们将编写一个_DocumentClient_ bean，封装所有这些：

```
@Repository
public class DocumentClient {
  @Value("https://${ASTRA_DB_ID}-${ASTRA_DB_REGION}.apps.astra.datastax.com/api/rest/v2/namespaces/${ASTRA_DB_KEYSPACE}")
  private String baseUrl;

  @Value("${ASTRA_DB_APPLICATION_TOKEN}")
  private String token;

  @Autowired
  private ObjectMapper objectMapper;

  private RestTemplate restTemplate;

  public DocumentClient() {
    this.restTemplate = new RestTemplate();
    this.restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
  }

  public ``<T>`` T getDocument(String collection, String id, Class``<T>`` cls) {
    var uri = UriComponentsBuilder.fromHttpUrl(baseUrl)
      .pathSegment("collections", collection, id)
      .build()
      .toUri();
    var request = RequestEntity.get(uri)
      .header("X-Cassandra-Token", token)
      .build();
    var response = restTemplate.exchange(request, cls);
    return response.getBody();
  }

  public void patchSubDocument(String collection, String id, String key, Map`<String, Object>` updates) {
    var updateUri = UriComponentsBuilder.fromHttpUrl(baseUrl)
      .pathSegment("collections", collection, id, key)
      .build()
      .toUri();
    var updateRequest = RequestEntity.patch(updateUri)
      .header("X-Cassandra-Token", token)
      .body(updates);
    restTemplate.exchange(updateRequest, Map.class);
  }
}
```

在这里，我们的_baseUrl_和_token_字段是根据我们前面定义的属性配置的。然后我们有一个_getDocument()_方法，可以调用Astra从所需的集合中获取指定的记录，以及一个_patchSubDocument()_方法，可以调用Astra修补集合中任何单个文档的部分。

**这就是从Astra与文档API交互所需的全部内容，因为它通过简单地在HTTP上交换JSON文档来工作。**

请注意，我们需要更改我们的_RestTemplate_使用的请求工厂。这是因为Spring使用的默认请求工厂不支持HTTP调用中的PATCH方法。

## 7. 通过文档API获取复仇者状态

**我们的第一个需求是能够检索我们团队成员的状态。这是我们之前提到的_statuses_集合中的文档。** 这将建立在我们之前编写的_DocumentClient_之上。

### 7.1. 从Astra检索状态

为了表示这些，我们需要如下记录：

```
public record Status(String avger, String name, String realName, String status, String location) {}
```

我们还需要一个记录来表示从Cassandra检索到的整个状态集合：

```
public record Statuses(Map`<String, Status>` data) {}
```

这个_Statuses_类表示将由文档API返回的完全相同的JSON，因此可以用于通过_RestTemplate_和Jackson接收数据。

然后我们需要一个服务层来从Cassandra检索状态并返回以供使用：

```
@Service
public class StatusesService {
  @Autowired
  private DocumentClient client;

  public List``<Status>`` getStatuses() {
    var collection = client.getDocument("statuses", "latest", Statuses.class);

    var result = new ArrayList``<Status>``();
    for (var entry : collection.data().entrySet()) {
      var status = entry.getValue();
      result.add(new Status(entry.getKey(), status.name(), status.realName(), status.status(), status.location()));
    }

    return result;
  }
}
```

**在这里，我们使用我们的客户端从“statuses”集合中获取记录，以我们的_Statuses_记录形式表示。** 检索后我们提取仅文档以返回给调用者。注意我们确实需要重新构建_Status_对象，以便也包含ID，因为这些实际上存储在Astra文档内的更高层次上。

### 7.2. 显示仪表板

**现在我们已经有一个服务层来检索数据，我们需要对它做一些事情。** 这意味需要一个控制器来处理来自浏览器的传入HTTP请求，然后渲染一个模板以显示实际的仪表板。

首先是控制器：

```
@Controller
public class StatusesController {
  @Autowired
  private StatusesService statusesService;

  @GetMapping("/")
  public ModelAndView getStatuses() {
    var result = new ModelAndView("dashboard");
    result.addObject("statuses", statusesService.getStatuses());

    return result;
  }
}
```

这从Astra检索状态并将它们传递给模板以进行渲染。

我们的主要“dashboard.html”模板如下：

```
`<!doctype html>`
`<html lang="en">`
`<head>`
  `<meta charset="utf-8" />`
  `<meta name="viewport" content="width=device-width, initial-scale=1" />`
  `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous" />`
  `<title>`Avengers Status Dashboard`</title>`
`</head>`
`<body>`
  `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">`
    `<div class="container-fluid">`
      `<a class="navbar-brand" href="#">`Avengers Status Dashboard`</a>`
    `````````</div>`````````
  `</nav>`

  `<div class="container-fluid mt-4">`
    `<div class="row row-cols-4 g-4">`
      `<div class="col" th:each="data, iterstat: ${statuses}">`
        `<th:block th:switch="${data.status}">`
          `<div class="card text-white bg-danger" th:case="DECEASED" th:insert="~{common/status}">``````````</div>`````````
          `<div class="card text-dark bg-warning" th:case="INJURED" th:insert="~{common/status}">``````````</div>`````````
          `<div class="card text-dark bg-warning" th:case="UNKNOWN" th:insert="~{common/status}">``````````</div>`````````
          `<div class="card text-white bg-secondary" th:case="RETIRED" th:insert="~{common/status}">``````````</div>`````````
          `<div class="card text-dark bg-light" th:case="*" th:insert="~{common/status}">``````````</div>`````````
        `</th:block>`
      `````````</div>`````````
    `````````</div>`````````
  `````````</div>`````````

  `<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf"
    crossorigin="anonymous">``</script>`
`</body>`
`</html>`
```

它使用另一个嵌套模板“common/status.html”来显示单个复仇者的状态：

```
`<div class="card-body">`
  `<h5 class="card-title" th:text="${data.name}">``</h5>`
  `<h6 class="card-subtitle">`<spa
```