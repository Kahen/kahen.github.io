---
date: 2021-06-01
category:
  - Cassandra
  - Astra
  - REST & GraphQL
tag:
  - DataStax Astra
  - Apache Cassandra
  - Stargate
head:
  - - meta
    - name: keywords
      content: Cassandra, Astra, REST, GraphQL, Dashboard
------
# 使用Cassandra、Astra、REST和GraphQL构建仪表板 - 记录状态更新

## **1. 引言**

在我们之前的文章中，我们探讨了使用DataStax Astra（一个由Apache Cassandra提供支持的DBaaS，使用Stargate提供额外的API来使用它）来构建一个仪表板，用于查看复仇者联盟当前的状态。

![img](https://www.baeldung.com/wp-content/uploads/2021/06/cassandra-avengers-status-dashboard-1.png)

使用Cassandra和Stargate构建的复仇者状态仪表板

**在本文中，我们将扩展此功能以存储离散事件，而不是汇总摘要。这将允许我们在用户界面中查看这些事件。** 我们将允许用户单击单个卡片并获得一个表格，显示导致当前状态的事件。与摘要不同，这些事件将每个代表一个复仇者和一个离散的时间点。每次收到新事件时，它将被添加到表格中，与所有其他事件一起。

我们之所以选择Cassandra，是因为它提供了一种非常高效的方式来存储时间序列数据，我们写入的频率远高于读取的频率。这里的目标是一个可以频繁更新的系统——例如，每30秒更新一次——并允许用户轻松查看最近记录的事件。

## **2. 构建数据库模式**

与我们在之前文章中使用的文档API不同，这将使用REST和GraphQL API构建。**这些API在Cassandra表之上工作，并且这些API可以完全相互协作以及与CQL API协作。**

为了使用这些，我们需要已经定义了我们要存储数据的表的模式。我们使用的表旨在使用特定的模式——按发生的顺序查找给定复仇者的事件。

这个模式看起来如下：

```
CREATE TABLE events (
    avenger text,
    timestamp timestamp,
    latitude decimal,
    longitude decimal,
    status decimal,
    PRIMARY KEY (avenger, timestamp)
) WITH CLUSTERING ORDER BY (timestamp DESC);
```

数据看起来类似于这样：

| avenger | timestamp | latitude | longitude | status |
| --- | --- | --- | --- | --- |
| falcon | 2021-05-16 09:00:30.000000+0000 | 40.715255 | -73.975353 | 0.999954 |
| hawkeye | 2021-05-16 09:00:30.000000+0000 | 40.714602 | -73.975238 | 0.99986 |
| hawkeye | 2021-05-16 09:01:00.000000+0000 | 40.713572 | -73.975289 | 0.999804 |

这定义了我们的表具有多行分区，分区键为“avenger”，聚簇键为“timestamp”。分区键由Cassandra用于确定数据存储在哪个节点上。聚簇键用于确定数据在分区内的存储顺序。

通过指示“avenger”是我们的分区键，它将确保所有相同复仇者的数据都保持在一起。通过指示“timestamp”是我们的聚簇键，它将以最有效的顺序存储此分区内的数据。鉴于我们对这些数据的核心查询是选择单个复仇者的所有事件——我们的分区键——按事件的时间戳——我们的聚簇键——Cassandra可以让我们非常高效地访问这些数据。

此外，应用程序的设计使用方式意味着我们几乎在持续的基础上写入事件数据。例如，我们可能每30秒从每个复仇者那里获得一个新事件。以这种方式构建我们的表使其非常高效地将新事件插入到正确的分区的正确位置。

为了方便起见，我们为预填充数据库的脚本还将创建并填充此模式。

## **3. 使用Astra、REST和GraphQL API构建客户端层**

**我们将使用REST和GraphQL API与Astra进行交互**，用于不同的目的。REST API将用于将新事件插入表中。GraphQL API将用于再次检索它们。

为了最好地做到这一点，我们需要一个可以与Astra进行交互的客户端层。这些相当于我们在之前文章中为其他两个API构建的_DocumentClient_类。

### **3.1. REST客户端**

首先，我们的REST客户端。**我们将使用它来插入新的完整记录**，因此只需要一个方法来接收要插入的数据：

```
@Repository
public class RestClient {
  @Value("https://${ASTRA_DB_ID}-${ASTRA_DB_REGION}.apps.astra.datastax.com/api/rest/v2/keyspaces/${ASTRA_DB_KEYSPACE}")
  private String baseUrl;

  @Value("${ASTRA_DB_APPLICATION_TOKEN}")
  private String token;

  private RestTemplate restTemplate;

  public RestClient() {
    this.restTemplate = new RestTemplate();
    this.restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
  }

  public ```<T>``` void createRecord(String table, T record) {
    var uri = UriComponentsBuilder.fromHttpUrl(baseUrl)
      .pathSegment(table)
      .build()
      .toUri();
    var request = RequestEntity.post(uri)
      .header("X-Cassandra-Token", token)
      .body(record);
    restTemplate.exchange(request, Map.class);
  }
}
```

### **3.2. GraphQL客户端**

然后，我们的GraphQL客户端。**这次我们接受一个完整的GraphQL查询并返回它获取的数据**：

```
@Repository
public class GraphqlClient {
  @Value("https://${ASTRA_DB_ID}-${ASTRA_DB_REGION}.apps.astra.datastax.com/api/graphql/${ASTRA_DB_KEYSPACE}")
  private String baseUrl;

  @Value("${ASTRA_DB_APPLICATION_TOKEN}")
  private String token;

  private RestTemplate restTemplate;

  public GraphqlClient() {
    this.restTemplate = new RestTemplate();
    this.restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
  }

  public ```<T>``` T query(String query, Class```<T>``` cls) {
    var request = RequestEntity.post(baseUrl)
      .header("X-Cassandra-Token", token)
      .body(Map.of("query", query));
    var response = restTemplate.exchange(request, cls);

    return response.getBody();
  }
}
```

与之前一样，我们的_baseUrl_和_token_字段是从我们的属性中配置的，定义了如何与Astra通信。这些客户端类每个都知道如何构建与数据库交互所需的完整URL。我们可以使用它们来发出正确的HTTP请求以执行所需的操作。

**这就是与Astra交互所需的全部内容，因为这些API通过简单地在HTTP上交换JSON文档来工作。**

## **4. 记录单个事件**

为了显示事件，我们需要能够记录它们。这将建立在之前更新_status_表的功能之上，并额外将新记录插入_events_表。

### **4.1. 插入事件**

首先，我们需要这个表中数据的表示。这将被表示为一个Java记录：

```
public record Event(String avenger,
  String timestamp,
  Double latitude,
  Double longitude,
  Double status) {}
```

**这直接对应于我们之前定义的模式。** Jackson将在我们实际进行API调用时将此转换为REST API的正确JSON。

接下来，我们需要我们的服务层来实际记录这些。这将从外部获取适当的详细信息，用时间戳增强它们，并调用我们的REST客户端来创建新记录：

```
@Service
public class EventsService {
  @Autowired
  private RestClient restClient;

  public void createEvent(String avenger, Double latitude, Double longitude, Double status) {
    var event = new Event(avenger, Instant.now().toString(), latitude, longitude, status);

    restClient.createRecord("events", event);
  }
}
```

### **4.2. 更新API**

最后，我们需要一个控制器来接收事件。**这是扩展我们在之前文章中编写的_UpdateController_，将其连接到新的_EventsService_，并从我们的_update_方法中调用它**。

```
@RestController
public class UpdateController {
  ......

  @Autowired
  private EventsService eventsService;

  @PostMapping("/update/{avenger}")
  public void update(@PathVariable String avenger, @RequestBody UpdateBody body) throws Exception {
    eventsService.createEvent(avenger, body.lat(), body.lng(), body.status());
    statusesService.updateStatus(avenger, lookupLocation(body.lat(), body.lng()), getStatus(body.status()));
  }
  ......
}
```

此时，对我们API的调用以记录复仇者的状态将同时更新状态文档并插入新记录到events表中。这将允许我们记录发生的每个更新事件。

**这意味着每次我们收到更新复仇者状态的调用时，我们都会向这个表中添加一条新记录。** 实际上，我们需要通过修剪或添加额外的分区来支持存储的数据规模，但这超出了本文的范围。

## **5. 通过GraphQL API向用户显示事件**

一旦我们在表中有了事件，下一步就是让用户可以使用它们。**我们将使用GraphQL API来实现这一点，每次为给定的复仇者检索一页事件，始终按时间戳降序排列，以便最新的事件首先出现**。

使用GraphQL，我们还可以仅检索我们实际感兴趣的字段子集，而不是全部。如果我们正在获取大量记录，这可以有助于保持有效载荷大小并因此提高性能。

### **5.1. 检索事件**

**首先我们需要一个表示我们正在检索的数据的表示。** 这是存储在表中的实际数据的一个子集。因此，我们将需要一个不同的类来表示它：

```
public record EventSummary(String timestamp,
  Double latitude,
  Double longitude,
  Double status) {}
```

我们还需要一个类来表示GraphQL响应的列表。这将包括一个事件摘要列表和用于游标的下一页状态：

```
public record Events(List`<EventSummary>` values, String pageState) {}
```

现在我们可以在事件服务中创建一个新的方法来实际执行搜索。

```
public class EventsService {
  ......

  @Autowired
  private GraphqlClient graphqlClient;

  public Events getEvents(String avenger, String offset) {
    var query = "query {"
      + "  events(filter:{avenger:{eq:\"%s\"}}, orderBy:[timestamp_DESC], options:{pageSize:5, pageState:%s}) {"
      + "    pageState "
      + "    values {"
      + "      timestamp "
      + "      latitude "
      + "      longitude "
      + "      status"
      + "    }"
      + "  }"
      + "}";

    var fullQuery = String.format(query, avenger, offset == null ? "null" : "\"" + offset + "\"");

    return graphqlClient.query(fullQuery, EventsGraphqlResponse.class).data().events();
  }

  private static record EventsResponse(Events events) {}
  private static record EventsGraphqlResponse(EventsResponse data) {}
}
```

这里我们有几个内部类，它们仅仅是为了表示GraphQL API返回的JSON结构到我们感兴趣的部分——这些完全是GraphQL API的产物。

然后我们有一个方法来构建我们想要的详细信息的GraphQL查询，按_avenger_字段过滤，并按_timestamp_字段降序排序。我们将实际的复仇者ID和要使用的页面状态代入其中，然后传递给我们的GraphQL客户端以获取实际数据。

### **5.2. 在UI中显示事件**

**现在我们可以从数据库中获取事件，然后我们可以将其连接到我们的UI。**

首先，我们将更新我们在之前文章中编写的_StatusesController_，以支持UI端点来获取事件：

```
public class StatusesController {
  ......

  @Autowired
  private EventsService eventsService;

  @GetMapping("/avenger/{avenger}")
  public Object getAvengerStatus(@PathVariable String avenger, @RequestParam(required = false) String page) {
    var result = new ModelAndView("dashboard");
    result.addObject("avenger", avenger);
    result.addObject("statuses", statusesService.getStatuses());
    result.addObject("events", eventsService.getEvents(avenger, page));

    return result;
  }
}
```

然后我们需要更新我们的模板以渲染事件表。我们将在_dashboard.html_文件中添加一个新的表格，只有在从控制器接收到的模型中存在_events_对象时才会渲染：

```
......
`<div th:if="${events}">`
  `<div class="row">`
    `<table class="table">`
      `<thead>`
        `<tr>`
          ````<th scope="col">````时间戳````</th>````
          ````<th scope="col">````纬度````</th>````
          ````<th scope="col">````经度````</th>````
          ````<th scope="col">````状态````</th>````
        ``</tr>``
      `</thead>`
      `<tbody>`
        `<tr th:each="data, iterstat : ${events.values}">`
          `<th scope="row" th:text="${data.timestamp}">`
          ````</td>````
          `<td th:text="${data.latitude}">`
          ````</td>````
          `<td th:text="${data.longitude}">`
          ````</td>````
          `<td th:text="${(data.status * 100) + '%'}">`
          ````</td>````
        ``</tr>``
      `</tbody>`
    `</table>`
  ````</div>````

  `<div class="row" th:if="${events.pageState}">`
    `<div class="col position-relative">`
      `<a th:href="@{/avenger/{id}(id = ${avenger}, page = ${events.pageState})}"
        class="position-absolute top-50 start-50 translate-middle">`下一页``</a>``
    ````</div>````
  ````</div>````
````</div>````
......
```

这包括底部的一个链接，用于转到下一页，它从我们的事件数据中传递页面状态和我们正在查看的复仇者的ID。

最后，我们需要更新状态卡片，以便我们可以链接到此条目的事件表。这只是一个超链接，围绕每个卡片的标题，在_status.html_中渲染：

```
......
`<a th:href="@{/avenger/{id}(id = ${data.avenger})}">`
  `<h5 class="card-title" th:text="${data.name}">``</h5>`
``</a>``
......
```

**现在我们可以启动应用程序，并从卡片中点击查看导致此状态的最新事件：**

![img](https://www.baeldung.com/wp-content/uploads/2021/06/cassandra-avengers-status-dashboard-events.png)

使用GraphQL扩展状态更新的复仇者状态仪表板

## **6. 总结**

**在这里，我们已经看到了Astra REST和GraphQL API如何用于处理基于行的数据，以及它们如何协同工作**。我们也开始看到Cassandra和这些API对于处理大量数据集的能力。

本文的所有代码都可以在GitHub上找到。

OK