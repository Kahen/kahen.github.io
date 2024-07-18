import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as i,a as n}from"./app-CE5go3V-.js";const a={},l=n('<hr><h1 id="使用gatling对rest端点进行负载测试" tabindex="-1"><a class="header-anchor" href="#使用gatling对rest端点进行负载测试"><span>使用Gatling对REST端点进行负载测试</span></a></h1><p>在本文中，我们将探讨如何使用Gatling对任何REST端点进行性能测试，特别关注负载测试。我们将从各种类型的性能测试及其关键性能指标（KPIs）的快速介绍开始。</p><p>接下来，我们将简要介绍Gatling术语。我们将使用Maven Gatling插件和依赖项设置一个示例。我们将探索使用Gatling Java DSL执行我们的负载测试，模拟一个场景。</p><p>最后，我们将运行模拟并查看生成的报告。</p><h3 id="_2-性能测试类型" tabindex="-1"><a class="header-anchor" href="#_2-性能测试类型"><span>2. 性能测试类型</span></a></h3><p>性能测试涉及测量各种指标，以了解系统在不同级别的流量和吞吐量下的表现。其他类型的性能测试包括负载测试、压力测试、浸泡测试、尖峰测试和可扩展性测试。接下来，让我们快速看看每种性能测试策略的目的。</p><p><strong>负载测试涉及在一段时间内对系统进行重载并发虚拟用户的测试。</strong> 另一方面，压力测试涉及逐步增加系统上的负载以找到其临界点。浸泡测试旨在通过系统长时间持续稳定的流量来识别瓶颈。顾名思义，尖峰测试包括测试系统在请求数量迅速增加到压力水平后不久又减少的表现。最后，可扩展性测试涉及测试系统在用户请求数量增加或减少时的表现。</p><p>在进行性能测试时，我们可以收集几个关键性能指标（KPIs）来衡量系统性能。<strong>这些包括事务响应时间、吞吐量</strong>（一段时间内处理的交易数量）以及错误（例如超时）。压力测试还可以帮助识别内存泄漏、减速、安全漏洞和数据损坏。</p><p>在本文中，我们将专注于使用Gatling进行负载测试。</p><h3 id="_3-关键术语" tabindex="-1"><a class="header-anchor" href="#_3-关键术语"><span>3. 关键术语</span></a></h3><p>让我们从Gatling框架的一些基本术语开始。</p><ul><li>场景：场景是虚拟用户采取的一系列步骤，以复制常见用户行为，例如登录或购买。</li><li>喂养者（Feeders）：喂养者是允许从外部源（如CSV或JSON文件）输入数据到虚拟用户行为的机制。</li><li>模拟：模拟确定在特定时间框架内运行场景的虚拟用户数量</li><li>会话：每个虚拟用户都由一个会话支持，该会话跟踪场景期间交换的消息。</li><li>记录器：Gatling的UI提供了一个记录器工具，用于生成场景和模拟</li></ul><h3 id="_4-示例设置" tabindex="-1"><a class="header-anchor" href="#_4-示例设置"><span>4. 示例设置</span></a></h3><p>让我们关注一个_员工管理_微服务的一小部分，包括一个RestController，其中包含必须进行负载测试的POST和GET端点。</p><p>在我们开始实现我们的简单解决方案之前，让我们添加所需的Gatling依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependency&gt;``\n    ```&lt;groupId&gt;```io.gatling```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```gatling-app```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```3.7.2```&lt;/version&gt;```\n``&lt;/dependency&gt;``\n\n``&lt;dependency&gt;``\n    ```&lt;groupId&gt;```io.gatling.highcharts```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```gatling-charts-highcharts```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```3.7.2```&lt;/version&gt;```\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们添加maven插件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;plugin&gt;`\n    ```&lt;groupId&gt;```io.gatling```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```gatling-maven-plugin```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```4.2.9```&lt;/version&gt;```\n    `&lt;configuration&gt;`\n        `&lt;simulationClass&gt;`org.baeldung.EmployeeRegistrationSimulation`&lt;/simulationClass&gt;`\n    `&lt;/configuration&gt;`\n`&lt;/plugin&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>如pom.xml文件中的信息所示，我们已通过插件配置显式设置模拟类为_EmployeeRegistrationSimulation_。</strong> 这意味着插件将使用指定的类作为运行模拟的基础。</p><p>接下来，让我们定义我们想要使用Gatling进行负载测试的RestController的POST和GET端点：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE })\npublic ResponseEntity`&lt;Void&gt;` addEmployee(@RequestBody EmployeeCreationRequest request, UriComponentsBuilder uriComponentsBuilder) {\n    URI location = uriComponentsBuilder.path(&quot;/api/employees/{id}&quot;)\n      .buildAndExpand(&quot;99&quot;)\n      .toUri();\n    return ResponseEntity.created(location)\n      .build();\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们添加GET端点：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@GetMapping(&quot;/{id}&quot;)\npublic Employee getEmployeeWithId(@PathVariable(&quot;id&quot;) Long id) {\n    List`&lt;Employee&gt;` allEmployees = createEmployees();\n    return allEmployees.get(ThreadLocalRandom.current()\n      .nextInt(0, allEmployees.size()));\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们扩展_Simulation_类及其组件和API，这些API使我们能够进行负载测试。</p><h3 id="_5-模拟步骤" tabindex="-1"><a class="header-anchor" href="#_5-模拟步骤"><span>5. 模拟步骤</span></a></h3><p>模拟代表一个负载测试，捕获诸如多个用户群体可能的操作方式、它们将执行的场景以及新虚拟用户如何被注入等多个方面。<strong>在Gatling框架中，_Simulation_类是启动负载测试过程的主要组件。</strong> Gatling Java API包括可变的抽象类_Simulation_。我们可以扩展_Simulation_类以满足我们的特定要求，以创建自定义模拟：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Public class EmployeeRegistrationSimulation extends Simulation {\n\n    private static final HttpProtocolBuilder HTTP_PROTOCOL_BUILDER = setupProtocolForSimulation();\n\n    private static final Iterator```&lt;Map``&lt;String, Object&gt;`````&gt; FEED_DATA = setupTestFeedData();\n\n    private static final ScenarioBuilder POST_SCENARIO_BUILDER = buildPostScenario();\n\n    // ...\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>本质上，我们需要定义以下内容：</p><ul><li>HTTP协议配置</li><li>头部信息</li><li>喂养者</li><li>HTTP请求</li><li>场景</li><li>负载注入模式</li></ul><p>现在，让我们看看使用Gatling提供的DSL如何定义这些个别步骤。我们将从协议配置开始。</p><h3 id="_5-1-http协议配置" tabindex="-1"><a class="header-anchor" href="#_5-1-http协议配置"><span>5.1. HTTP协议配置</span></a></h3><p>Gatling是一个技术中立的负载测试工具，支持各种协议，包括HTTP、HTTPS和WebSockets。本节将重点介绍为我们的负载测试场景配置HTTP协议。</p><p><strong>要在_EmployeeRegistrationSimulation_类中设置HTTP协议细节，我们将使用_HTTPDsl_类型，它是Gatling HTTP DSL的入口点。然后，我们将使用_HTTPProtocolBuilder_ DSL定义_HTTP_协议配置：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private static HttpProtocolBuilder setupProtocolForSimulation() {\n    return HttpDsl.http.baseUrl(&quot;http://localhost:8080&quot;)\n      .acceptHeader(&quot;application/json&quot;)\n      .maxConnectionsPerHost(10)\n      .userAgentHeader(&quot;Gatling/Performance Test&quot;);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Gatling中配置HTTP协议涉及使用_HTTPDsl_类使用_HTTPProtocolBuilder_ DSL定义HTTP协议配置。关键配置设置包括baseUrl、_acceptHeader、maxConnectionsPerHost和userAgentHeader。这些设置有助于确保我们的负载测试准确地模拟现实世界的场景。</p><h3 id="_5-2-喂养者定义" tabindex="-1"><a class="header-anchor" href="#_5-2-喂养者定义"><span>5.2. 喂养者定义</span></a></h3><p><strong>喂养者是一个方便的API，允许测试人员将来自外部来源的数据注入到虚拟用户会话中。</strong> Gatling支持各种喂养者，如CSV、JSON、基于文件和基于数组/列表的喂养者。</p><p>接下来，让我们创建一个将返回测试用例的测试数据的方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private static Iterator```&lt;Map``&lt;String, Object&gt;`````&gt; feedData() {\n    Faker faker = new Faker();\n    Iterator```&lt;Map``&lt;String, Object&gt;`````&gt; iterator;\n    iterator = Stream.generate(() -&gt; {\n          Map``&lt;String, Object&gt;`` stringObjectMap = new HashMap&lt;&gt;();\n          stringObjectMap.put(&quot;empName&quot;, faker.name()\n            .fullName());\n          return stringObjectMap;\n      })\n      .iterator();\n    return iterator;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们将创建一个返回_Iterator```&lt;Map``&lt;String, Object&gt;`````&gt;_的方法来检索我们的测试用例的测试数据。然后，方法_feedData()_使用_Faker_库生成测试数据，创建一个HashMap来存储数据，并返回数据的迭代器。</p><p><strong>喂养者本质上是由_feed_方法创建的_Iterator```&lt;Map<code>&lt;String, Object&gt;`````&gt;_组件的类型别名。_feed_方法轮询_Map</code>&lt;String, Object&gt;``_记录，并将它们的内容注入到模拟场景中。</strong></p><p>Gatling还提供了内置的喂养者策略，如_queue()、random()、shuffle()和circular()_。此外，根据被测试的系统，我们可以将数据加载机制配置为_eager()<em>或_batch()</em>。</p><h3 id="_5-3-场景定义" tabindex="-1"><a class="header-anchor" href="#_5-3-场景定义"><span>5.3. 场景定义</span></a></h3><p><strong>在Gatling中，场景代表虚拟用户将遵循的典型用户行为。</strong> 它是基于_Employee_控制器中定义的资源的工作流程。在这种情况下，我们将创建一个场景，模拟使用简单工作流程创建员工：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private static ScenarioBuilder buildPostScenario() {\n    return CoreDsl.scenario(&quot;Load Test Creating Employee&quot;)\n      .feed(FEED_DATA)\n      .exec(http(&quot;create-employee-request&quot;).post(&quot;/api/employees&quot;)\n        .header(&quot;Content-Type,&quot; &quot;application/json&quot;)\n        .body(StringBody(&quot;{\\&quot;empName\\&quot;: \\&quot;${empName}\\&quot;}&quot;))\n        .check(status().is(201))\n        .check(header(&quot;Location&quot;).saveAs(&quot;location&quot;)))\n      .exec(http(&quot;get-employee-request&quot;).get(session -&gt; session.getString(&quot;location&quot;))\n        .check(status().is(200)));\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Gatling API提供了_scenario(String name)_方法，它返回_ScenarioBuilder_类的实例。_ScenarioBuilder_封装了场景的细节，包括测试数据的来源和HTTP请求的细节，如请求体、头部和预期的HTTP状态码。</p>',47),s=[l];function r(d,o){return i(),t("div",null,s)}const p=e(a,[["render",r],["__file","2024-07-08-Load Testing Rest Endpoint Using Gatling.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Load%20Testing%20Rest%20Endpoint%20Using%20Gatling.html","title":"使用Gatling对REST端点进行负载测试","lang":"zh-CN","frontmatter":{"date":"2023-03-01T00:00:00.000Z","category":["Gatling","Load Testing"],"tag":["Gatling","Load Testing","REST Endpoint","Performance Testing"],"head":[["meta",{"name":"keywords","content":"Gatling, Load Testing, REST Endpoint, Performance Testing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Load%20Testing%20Rest%20Endpoint%20Using%20Gatling.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Gatling对REST端点进行负载测试"}],["meta",{"property":"og:description","content":"使用Gatling对REST端点进行负载测试 在本文中，我们将探讨如何使用Gatling对任何REST端点进行性能测试，特别关注负载测试。我们将从各种类型的性能测试及其关键性能指标（KPIs）的快速介绍开始。 接下来，我们将简要介绍Gatling术语。我们将使用Maven Gatling插件和依赖项设置一个示例。我们将探索使用Gatling Java ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T05:41:36.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Gatling"}],["meta",{"property":"article:tag","content":"Load Testing"}],["meta",{"property":"article:tag","content":"REST Endpoint"}],["meta",{"property":"article:tag","content":"Performance Testing"}],["meta",{"property":"article:published_time","content":"2023-03-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T05:41:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Gatling对REST端点进行负载测试\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-03-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T05:41:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Gatling对REST端点进行负载测试 在本文中，我们将探讨如何使用Gatling对任何REST端点进行性能测试，特别关注负载测试。我们将从各种类型的性能测试及其关键性能指标（KPIs）的快速介绍开始。 接下来，我们将简要介绍Gatling术语。我们将使用Maven Gatling插件和依赖项设置一个示例。我们将探索使用Gatling Java ..."},"headers":[{"level":3,"title":"2. 性能测试类型","slug":"_2-性能测试类型","link":"#_2-性能测试类型","children":[]},{"level":3,"title":"3. 关键术语","slug":"_3-关键术语","link":"#_3-关键术语","children":[]},{"level":3,"title":"4. 示例设置","slug":"_4-示例设置","link":"#_4-示例设置","children":[]},{"level":3,"title":"5. 模拟步骤","slug":"_5-模拟步骤","link":"#_5-模拟步骤","children":[]},{"level":3,"title":"5.1. HTTP协议配置","slug":"_5-1-http协议配置","link":"#_5-1-http协议配置","children":[]},{"level":3,"title":"5.2. 喂养者定义","slug":"_5-2-喂养者定义","link":"#_5-2-喂养者定义","children":[]},{"level":3,"title":"5.3. 场景定义","slug":"_5-3-场景定义","link":"#_5-3-场景定义","children":[]}],"git":{"createdTime":1720417296000,"updatedTime":1720417296000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.22,"words":1867},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Load Testing Rest Endpoint Using Gatling.md","localizedDate":"2023年3月1日","excerpt":"<hr>\\n<h1>使用Gatling对REST端点进行负载测试</h1>\\n<p>在本文中，我们将探讨如何使用Gatling对任何REST端点进行性能测试，特别关注负载测试。我们将从各种类型的性能测试及其关键性能指标（KPIs）的快速介绍开始。</p>\\n<p>接下来，我们将简要介绍Gatling术语。我们将使用Maven Gatling插件和依赖项设置一个示例。我们将探索使用Gatling Java DSL执行我们的负载测试，模拟一个场景。</p>\\n<p>最后，我们将运行模拟并查看生成的报告。</p>\\n<h3>2. 性能测试类型</h3>\\n<p>性能测试涉及测量各种指标，以了解系统在不同级别的流量和吞吐量下的表现。其他类型的性能测试包括负载测试、压力测试、浸泡测试、尖峰测试和可扩展性测试。接下来，让我们快速看看每种性能测试策略的目的。</p>","autoDesc":true}');export{p as comp,g as data};
