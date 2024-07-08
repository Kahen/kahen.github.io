---
date: 2023-03-01
category:
  - Gatling
  - Load Testing
tag:
  - Gatling
  - Load Testing
  - REST Endpoint
  - Performance Testing
head:
  - - meta
    - name: keywords
      content: Gatling, Load Testing, REST Endpoint, Performance Testing
------
# 使用Gatling对REST端点进行负载测试

在本文中，我们将探讨如何使用Gatling对任何REST端点进行性能测试，特别关注负载测试。我们将从各种类型的性能测试及其关键性能指标（KPIs）的快速介绍开始。

接下来，我们将简要介绍Gatling术语。我们将使用Maven Gatling插件和依赖项设置一个示例。我们将探索使用Gatling Java DSL执行我们的负载测试，模拟一个场景。

最后，我们将运行模拟并查看生成的报告。

### 2. 性能测试类型

性能测试涉及测量各种指标，以了解系统在不同级别的流量和吞吐量下的表现。其他类型的性能测试包括负载测试、压力测试、浸泡测试、尖峰测试和可扩展性测试。接下来，让我们快速看看每种性能测试策略的目的。

**负载测试涉及在一段时间内对系统进行重载并发虚拟用户的测试。** 另一方面，压力测试涉及逐步增加系统上的负载以找到其临界点。浸泡测试旨在通过系统长时间持续稳定的流量来识别瓶颈。顾名思义，尖峰测试包括测试系统在请求数量迅速增加到压力水平后不久又减少的表现。最后，可扩展性测试涉及测试系统在用户请求数量增加或减少时的表现。

在进行性能测试时，我们可以收集几个关键性能指标（KPIs）来衡量系统性能。**这些包括事务响应时间、吞吐量**（一段时间内处理的交易数量）以及错误（例如超时）。压力测试还可以帮助识别内存泄漏、减速、安全漏洞和数据损坏。

在本文中，我们将专注于使用Gatling进行负载测试。

### 3. 关键术语

让我们从Gatling框架的一些基本术语开始。

- 场景：场景是虚拟用户采取的一系列步骤，以复制常见用户行为，例如登录或购买。
- 喂养者（Feeders）：喂养者是允许从外部源（如CSV或JSON文件）输入数据到虚拟用户行为的机制。
- 模拟：模拟确定在特定时间框架内运行场景的虚拟用户数量
- 会话：每个虚拟用户都由一个会话支持，该会话跟踪场景期间交换的消息。
- 记录器：Gatling的UI提供了一个记录器工具，用于生成场景和模拟

### 4. 示例设置

让我们关注一个_员工管理_微服务的一小部分，包括一个RestController，其中包含必须进行负载测试的POST和GET端点。

在我们开始实现我们的简单解决方案之前，让我们添加所需的Gatling依赖项：

```
``<dependency>``
    ```<groupId>```io.gatling```</groupId>```
    ```<artifactId>```gatling-app```</artifactId>```
    ```<version>```3.7.2```</version>```
``</dependency>``

``<dependency>``
    ```<groupId>```io.gatling.highcharts```</groupId>```
    ```<artifactId>```gatling-charts-highcharts```</artifactId>```
    ```<version>```3.7.2```</version>```
``</dependency>``
```

接下来，让我们添加maven插件：

```
`<plugin>`
    ```<groupId>```io.gatling```</groupId>```
    ```<artifactId>```gatling-maven-plugin```</artifactId>```
    ```<version>```4.2.9```</version>```
    `<configuration>`
        `<simulationClass>`org.baeldung.EmployeeRegistrationSimulation`</simulationClass>`
    `</configuration>`
`</plugin>`
```

**如pom.xml文件中的信息所示，我们已通过插件配置显式设置模拟类为_EmployeeRegistrationSimulation_。** 这意味着插件将使用指定的类作为运行模拟的基础。

接下来，让我们定义我们想要使用Gatling进行负载测试的RestController的POST和GET端点：

```
@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE })
public ResponseEntity`<Void>` addEmployee(@RequestBody EmployeeCreationRequest request, UriComponentsBuilder uriComponentsBuilder) {
    URI location = uriComponentsBuilder.path("/api/employees/{id}")
      .buildAndExpand("99")
      .toUri();
    return ResponseEntity.created(location)
      .build();
}
```

接下来，让我们添加GET端点：

```
@GetMapping("/{id}")
public Employee getEmployeeWithId(@PathVariable("id") Long id) {
    List`<Employee>` allEmployees = createEmployees();
    return allEmployees.get(ThreadLocalRandom.current()
      .nextInt(0, allEmployees.size()));
}
```

接下来，让我们扩展_Simulation_类及其组件和API，这些API使我们能够进行负载测试。

### 5. 模拟步骤

模拟代表一个负载测试，捕获诸如多个用户群体可能的操作方式、它们将执行的场景以及新虚拟用户如何被注入等多个方面。**在Gatling框架中，_Simulation_类是启动负载测试过程的主要组件。** Gatling Java API包括可变的抽象类_Simulation_。我们可以扩展_Simulation_类以满足我们的特定要求，以创建自定义模拟：

```
Public class EmployeeRegistrationSimulation extends Simulation {

    private static final HttpProtocolBuilder HTTP_PROTOCOL_BUILDER = setupProtocolForSimulation();

    private static final Iterator```<Map``<String, Object>`````> FEED_DATA = setupTestFeedData();

    private static final ScenarioBuilder POST_SCENARIO_BUILDER = buildPostScenario();

    // ...
}
```

本质上，我们需要定义以下内容：

- HTTP协议配置
- 头部信息
- 喂养者
- HTTP请求
- 场景
- 负载注入模式

现在，让我们看看使用Gatling提供的DSL如何定义这些个别步骤。我们将从协议配置开始。

### 5.1. HTTP协议配置

Gatling是一个技术中立的负载测试工具，支持各种协议，包括HTTP、HTTPS和WebSockets。本节将重点介绍为我们的负载测试场景配置HTTP协议。

**要在_EmployeeRegistrationSimulation_类中设置HTTP协议细节，我们将使用_HTTPDsl_类型，它是Gatling HTTP DSL的入口点。然后，我们将使用_HTTPProtocolBuilder_ DSL定义_HTTP_协议配置：**

```
private static HttpProtocolBuilder setupProtocolForSimulation() {
    return HttpDsl.http.baseUrl("http://localhost:8080")
      .acceptHeader("application/json")
      .maxConnectionsPerHost(10)
      .userAgentHeader("Gatling/Performance Test");
}
```

在Gatling中配置HTTP协议涉及使用_HTTPDsl_类使用_HTTPProtocolBuilder_ DSL定义HTTP协议配置。关键配置设置包括baseUrl、_acceptHeader、maxConnectionsPerHost和userAgentHeader。这些设置有助于确保我们的负载测试准确地模拟现实世界的场景。

### 5.2. 喂养者定义

**喂养者是一个方便的API，允许测试人员将来自外部来源的数据注入到虚拟用户会话中。** Gatling支持各种喂养者，如CSV、JSON、基于文件和基于数组/列表的喂养者。

接下来，让我们创建一个将返回测试用例的测试数据的方法：

```
private static Iterator```<Map``<String, Object>`````> feedData() {
    Faker faker = new Faker();
    Iterator```<Map``<String, Object>`````> iterator;
    iterator = Stream.generate(() -> {
          Map``<String, Object>`` stringObjectMap = new HashMap<>();
          stringObjectMap.put("empName", faker.name()
            .fullName());
          return stringObjectMap;
      })
      .iterator();
    return iterator;
}
```

这里，我们将创建一个返回_Iterator```<Map``<String, Object>`````>_的方法来检索我们的测试用例的测试数据。然后，方法_feedData()_使用_Faker_库生成测试数据，创建一个HashMap来存储数据，并返回数据的迭代器。

**喂养者本质上是由_feed_方法创建的_Iterator```<Map``<String, Object>`````>_组件的类型别名。_feed_方法轮询_Map``<String, Object>``_记录，并将它们的内容注入到模拟场景中。**

Gatling还提供了内置的喂养者策略，如_queue()、random()、shuffle()和circular()_。此外，根据被测试的系统，我们可以将数据加载机制配置为_eager()_或_batch()_。

### 5.3. 场景定义

**在Gatling中，场景代表虚拟用户将遵循的典型用户行为。** 它是基于_Employee_控制器中定义的资源的工作流程。在这种情况下，我们将创建一个场景，模拟使用简单工作流程创建员工：

```
private static ScenarioBuilder buildPostScenario() {
    return CoreDsl.scenario("Load Test Creating Employee")
      .feed(FEED_DATA)
      .exec(http("create-employee-request").post("/api/employees")
        .header("Content-Type," "application/json")
        .body(StringBody("{\"empName\": \"${empName}\"}"))
        .check(status().is(201))
        .check(header("Location").saveAs("location")))
      .exec(http("get-employee-request").get(session -> session.getString("location"))
        .check(status().is(200)));
}
```

Gatling API提供了_scenario(String name)_方法，它返回_ScenarioBuilder_类的实例。_ScenarioBuilder_封装了场景的细节，包括测试数据的来源和HTTP请求的细节，如请求体、头部和预期的HTTP状态码。

