import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CXN34Kw1.js";const e={},p=t('<h1 id="使用spring-boot连接到nosql数据库" tabindex="-1"><a class="header-anchor" href="#使用spring-boot连接到nosql数据库"><span>使用Spring Boot连接到NoSQL数据库</span></a></h1><p>在本教程中，我们将学习如何使用Spring Boot连接到NoSQL数据库。我们的文章重点是使用DataStax Astra DB，这是一个由Apache Cassandra驱动的DBaaS（数据库即服务），允许我们使用云原生服务开发和部署数据驱动的应用程序。</p><p>首先，我们将从设置和配置我们的应用程序与Astra DB开始。然后，我们将学习如何构建一个简单的Spring Boot应用程序。</p><h3 id="_2-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-依赖项"><span>2. 依赖项</span></a></h3><p>让我们从向我们的_pom.xml_添加依赖项开始。当然，我们需要_spring-boot-starter-data-cassandra_依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.springframework.boot```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```spring-boot-starter-data-cassandra```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```2.6.3```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将添加_spring-boot-starter-web_依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.springframework.boot```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```spring-boot-starter-web```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```2.6.3```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们将使用Datastax的_astra-spring-boot-starter_：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```com.datastax.astra```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```astra-spring-boot-starter```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```0.3.0```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们已经配置了所有必要的依赖项，我们可以开始编写我们的Spring Boot应用程序。</p><h3 id="_3-数据库设置" tabindex="-1"><a class="header-anchor" href="#_3-数据库设置"><span>3. 数据库设置</span></a></h3><p>在我们开始定义我们的应用程序之前，<strong>重要的是要快速重申DataStax Astra是由Apache Cassandra驱动的基于云的数据库产品</strong>。这为我们提供了一个完全托管、完全管理的Cassandra数据库，我们可以用来存储我们的数据。然而，正如我们将看到的，我们设置和连接数据库的方式有一些特殊性。</p><p>为了让我们能够与数据库交互，我们需要在主机平台上设置我们的Astra数据库。然后，我们需要下载我们的Secure Connect Bundle，其中包含SSL证书和数据库的连接详细信息，允许我们安全地连接。</p><p>为了本教程的目的，我们假设我们已经完成了这两个任务。</p><h3 id="_4-应用程序配置" tabindex="-1"><a class="header-anchor" href="#_4-应用程序配置"><span>4. 应用程序配置</span></a></h3><p>接下来，我们将为我们的应用程序配置一个简单的_main_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AstraDbSpringApplication</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">AstraDbSpringApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，这是一个普通的Spring Boot应用程序。现在让我们开始填充我们的_application.properties_文件：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">astra.api.application-token</span><span class="token punctuation">=</span><span class="token value attr-value">`&lt;token&gt;`</span>\n<span class="token key attr-name">astra.api.database-id</span><span class="token punctuation">=</span><span class="token value attr-value">`&lt;your_db_id&gt;`</span>\n<span class="token key attr-name">astra.api.database-region</span><span class="token punctuation">=</span><span class="token value attr-value">europe-west1</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这些是我们的Cassandra凭据，可以直接从Astra仪表板获取</strong>。</p><p>为了使用标准_CqlSession_进行CQL操作，我们将添加另外几个属性，包括我们下载的secure connect bundle的位置：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">astra.cql.enabled</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>\n<span class="token key attr-name">astra.cql.downloadScb.path</span><span class="token punctuation">=</span><span class="token value attr-value">~/.astra/secure-connect-shopping-list.zip</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们将添加一些标准的Spring Data属性，用于与Cassandra一起工作：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">spring.data.cassandra.keyspace</span><span class="token punctuation">=</span><span class="token value attr-value">shopping_list</span>\n<span class="token key attr-name">spring.data.cassandra.schema-action</span><span class="token punctuation">=</span><span class="token value attr-value">CREATE_IF_NOT_EXISTS</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们指定了数据库的keyspace，并告诉Spring Data如果表不存在则创建它们。</p><h3 id="_5-测试我们的连接" tabindex="-1"><a class="header-anchor" href="#_5-测试我们的连接"><span>5. 测试我们的连接</span></a></h3><p>现在我们已经准备好了所有的部分来测试我们的数据库连接。让我们继续定义一个简单的REST Controller：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AstraDbApiController</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@Autowired</span>\n    <span class="token keyword">private</span> <span class="token class-name">AstraClient</span> astraClient<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/ping&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">ping</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> astraClient<span class="token punctuation">.</span><span class="token function">apiDevopsOrganizations</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">organizationId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，我们使用_AstraClient_类创建了一个简单的ping端点，它将返回我们数据库的组织ID。<strong>这是一个包装类，是Astra SDK的一部分，我们可以使用它与各种Astra API进行交互</strong>。</p><p>最重要的是，这只是一个简单的测试，以确保我们可以建立连接。让我们继续使用Maven运行我们的应用程序：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>mvn clean <span class="token function">install</span> spring-boot:run\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们应该在控制台看到与我们的Astra数据库建立的连接：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>...\n13:08:00.656 [main] INFO  c.d.stargate.sdk.StargateClient - + CqlSession   :[ENABLED]\n13:08:00.656 [main] INFO  c.d.stargate.sdk.StargateClient - + API Cql      :[ENABLED]\n13:08:00.657 [main] INFO  c.d.stargate.sdk.rest.ApiDataClient - + API Data     :[ENABLED]\n13:08:00.657 [main] INFO  c.d.s.sdk.doc.ApiDocumentClient - + API Document :[ENABLED]\n13:08:00.658 [main] INFO  c.d.s.sdk.gql.ApiGraphQLClient - + API GraphQL  :[ENABLED]\n13:08:00.658 [main] INFO  com.datastax.astra.sdk.AstraClient\n  - [AstraClient] has been initialized.\n13:08:01.515 [main] INFO  o.b.s.a.AstraDbSpringApplication\n  - Started AstraDbSpringApplication in 7.653 seconds (JVM running for 8.097)\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，如果我们在浏览器中访问我们的端点或使用_curl_访问它，我们应该得到一个有效的响应：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> http://localhost:8080/ping<span class="token punctuation">;</span> <span class="token builtin class-name">echo</span>\nd23bf54d-1bc2-4ab7-9bd9-2c628aa54e85\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>太好了！现在我们已经建立了数据库连接，并实现了一个使用Spring Boot的简单应用程序，让我们看看我们如何存储和检索数据。</p><h3 id="_6-使用spring-data" tabindex="-1"><a class="header-anchor" href="#_6-使用spring-data"><span>6. 使用Spring Data</span></a></h3><p>我们可以选择几种风格作为我们的Cassandra数据库访问的基础。在本教程中，我们选择使用Spring Data，它支持Cassandra。</p><p>Spring Data的存储库抽象的主要目标是显著减少实现数据访问层所需的样板代码量，这将有助于保持我们的示例非常简单。</p><p>对于我们的数据模型，<strong>我们将定义一个实体来表示一个简单的购物清单</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Table</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ShoppingList</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@PrimaryKey</span>\n    <span class="token annotation punctuation">@CassandraType</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token class-name">Name</span><span class="token punctuation">.</span><span class="token constant">UUID</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">UUID</span> uid <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token keyword">boolean</span> completed <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Column</span>\n    <span class="token keyword">private</span> <span class="token class-name">List</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>` items <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// 标准Getters和Setters</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们在我们的bean中使用了几个标准注解来将我们的实体映射到Cassandra数据表，并定义了一个名为_uid_的主键列。</p><p>现在让我们创建_ShoppingListRepository_在我们的应用程序中使用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span>\n<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ShoppingListRepository</span> <span class="token keyword">extends</span> <span class="token class-name">CassandraRepository</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ShoppingList</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>` <span class="token punctuation">{</span>\n\n    <span class="token class-name">ShoppingList</span> <span class="token function">findByTitleAllIgnoreCase</span><span class="token punctuation">(</span><span class="token class-name">String</span> title<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这遵循了标准的Spring Data存储库抽象。除了在_CassandraRepository_接口中包含的继承方法，如_findAll_，<strong>我们还添加了一个额外的方法_findByTitleAllIgnoreCase_，我们可以使用它来根据标题查找购物清单</strong>。</p><p>实际上，使用Astra Spring Boot Starter的一个真正好处是它为我们创建了_CqlSession_ bean，使用之前定义的属性。</p><h3 id="_7-整合所有内容" tabindex="-1"><a class="header-anchor" href="#_7-整合所有内容"><span>7. 整合所有内容</span></a></h3><p>现在我们的数据访问存储库已经就位，让我们定义一个简单的服务和控制器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ShoppingListService</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@Autowired</span>\n    <span class="token keyword">private</span> <span class="token class-name">ShoppingListRepository</span> shoppingListRepository<span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ShoppingList</span><span class="token punctuation">&gt;</span></span>`` <span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> shoppingListRepository<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span><span class="token class-name">CassandraPageRequest</span><span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">ShoppingList</span> <span class="token function">findByTitle</span><span class="token punctuation">(</span><span class="token class-name">String</span> title<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> shoppingListRepository<span class="token punctuation">.</span><span class="token function">findByTitleAllIgnoreCase</span><span class="token punctuation">(</span>title<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@PostConstruct</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">insert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">ShoppingList</span> groceries <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ShoppingList</span><span class="token punctuation">(</span><span class="token string">&quot;Groceries&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        groceries<span class="token punctuation">.</span><span class="token function">setItems</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;Bread&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Milk, Apples&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token class-name">ShoppingList</span> pharmacy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ShoppingList</span><span class="token punctuation">(</span><span class="token string">&quot;Pharmacy&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        pharmacy<span class="token punctuation">.</span><span class="token function">setCompleted</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        pharmacy<span class="token punctuation">.</span><span class="token function">setItems</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;Nappies&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Suncream, Aspirin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        shoppingListRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>groceries<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        shoppingListRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>pharmacy<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于我们的测试应用程序的目的，<strong>我们添加了一个_@PostContruct_注解来将一些测试数据插入我们的数据库</strong>。</p><p>作为谜题的最后一部分，我们将添加一个简单的控制器，带有一个端点来检索我们的购物清单：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>\n<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/shopping&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ShoppingListController</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@Autowired</span>\n    <span class="token keyword">private</span> <span class="token class-name">ShoppingListService</span> shoppingListService<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/list&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ShoppingList</span><span class="token punctuation">&gt;</span></span>`` <span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> shoppingListService<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在当我们运行我们的应用程序并访问http://localhost:8080/shopping/list - 我们将看到一个包含我们不同购物清单对象的JSON响应：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">[</span>\n  <span class="token punctuation">{</span>\n    <span class="token property">&quot;uid&quot;</span><span class="token operator">:</span> <span class="token string">&quot;363dba2e-17ff3-4d01-a44f-a805f74fc43d&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Groceries&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;completed&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;items&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token string">&quot;Bread&quot;</span><span class="token punctuation">,</span>\n      <span class="token string">&quot;Milk, Apples&quot;</span>\n    <span class="token punctuation">]</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    <span class="token property">&quot;uid&quot;</span><span class="token operator">:</span> <span class="token string">&quot;9c0f407e-5fc1-41ad-8e46-b3c115de9474&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Pharmacy&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;completed&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;items&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token string">&quot;Nappies&quot;</span><span class="token punctuation">,</span>\n      <span class="token string">&quot;Suncream, Aspirin&quot;</span>\n    <span class="token punctuation">]</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">]</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这证实了我们的应用程序正在正常工作。太棒了！</p><h3 id="_8-使用cassandra模板工作" tabindex="-1"><a class="header-anchor" href="#_8-使用cassandra模板工作"><span>8. 使用Cassandra模板工作</span></a></h3><p>另一方面，也可以直接使用Cassandra模板，这是经典的Spring CQL方法，可能仍然是最受欢迎的方法。</p><p>简单来说，我们可以很容易地扩展我们的_AstraDbApiController_来检索我们的数据中心：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>\n<span class="token keyword">private</span> <span class="token class-name">CassandraTemplate</span> cassandraTemplate<span class="token punctuation">;</span>\n\n<span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/datacenter&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">datacenter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> cassandraTemplate\n        <span class="token punctuation">.</span><span class="token function">getCqlOperations</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">queryForObject</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT data_center FROM system.local&quot;</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将仍然利用我们定义的所有配置属性。<strong>正如我们所看到的，两种访问方法之间的切换是完全透明的</strong>。</p><h3 id="_9-结论" tabindex="-1"><a class="header-anchor" href="#_9-结论"><span>9. 结论</span></a></h3><p>在本文中，我们学习了如何设置和连接到托管的Cassandra Astra数据库。接下来，我们构建了一个简单的购物清单应用程序来使用Spring Data存储和检索数据。最后，我们还讨论了如何使用较低级别的访问方法Cassandra Template。</p><p>一如既往，文章的全部源代码可以在GitHub上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/66d236ad2fbffe8cfd463ebd2b4a43c0?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/whiteleaf.svg" alt="img" loading="lazy"></p><p>OK</p>',66),o=[p];function i(c,l){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","2024-07-21-Connecting to a NoSQL Database with Spring Boot.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-Connecting%20to%20a%20NoSQL%20Database%20with%20Spring%20Boot.html","title":"使用Spring Boot连接到NoSQL数据库","lang":"zh-CN","frontmatter":{"date":"2024-07-21T00:00:00.000Z","category":["Spring Boot","NoSQL"],"tag":["Spring Boot","NoSQL","Cassandra","DataStax"],"head":[["meta",{"name":"keywords","content":"Spring Boot, NoSQL, Cassandra, DataStax, Astra DB"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-Connecting%20to%20a%20NoSQL%20Database%20with%20Spring%20Boot.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Spring Boot连接到NoSQL数据库"}],["meta",{"property":"og:description","content":"使用Spring Boot连接到NoSQL数据库 在本教程中，我们将学习如何使用Spring Boot连接到NoSQL数据库。我们的文章重点是使用DataStax Astra DB，这是一个由Apache Cassandra驱动的DBaaS（数据库即服务），允许我们使用云原生服务开发和部署数据驱动的应用程序。 首先，我们将从设置和配置我们的应用程序与A..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T16:14:52.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"NoSQL"}],["meta",{"property":"article:tag","content":"Cassandra"}],["meta",{"property":"article:tag","content":"DataStax"}],["meta",{"property":"article:published_time","content":"2024-07-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T16:14:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Spring Boot连接到NoSQL数据库\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/66d236ad2fbffe8cfd463ebd2b4a43c0?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/whiteleaf.svg\\"],\\"datePublished\\":\\"2024-07-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T16:14:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Spring Boot连接到NoSQL数据库 在本教程中，我们将学习如何使用Spring Boot连接到NoSQL数据库。我们的文章重点是使用DataStax Astra DB，这是一个由Apache Cassandra驱动的DBaaS（数据库即服务），允许我们使用云原生服务开发和部署数据驱动的应用程序。 首先，我们将从设置和配置我们的应用程序与A..."},"headers":[{"level":3,"title":"2. 依赖项","slug":"_2-依赖项","link":"#_2-依赖项","children":[]},{"level":3,"title":"3. 数据库设置","slug":"_3-数据库设置","link":"#_3-数据库设置","children":[]},{"level":3,"title":"4. 应用程序配置","slug":"_4-应用程序配置","link":"#_4-应用程序配置","children":[]},{"level":3,"title":"5. 测试我们的连接","slug":"_5-测试我们的连接","link":"#_5-测试我们的连接","children":[]},{"level":3,"title":"6. 使用Spring Data","slug":"_6-使用spring-data","link":"#_6-使用spring-data","children":[]},{"level":3,"title":"7. 整合所有内容","slug":"_7-整合所有内容","link":"#_7-整合所有内容","children":[]},{"level":3,"title":"8. 使用Cassandra模板工作","slug":"_8-使用cassandra模板工作","link":"#_8-使用cassandra模板工作","children":[]},{"level":3,"title":"9. 结论","slug":"_9-结论","link":"#_9-结论","children":[]}],"git":{"createdTime":1721578492000,"updatedTime":1721578492000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.61,"words":1982},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-Connecting to a NoSQL Database with Spring Boot.md","localizedDate":"2024年7月21日","excerpt":"\\n<p>在本教程中，我们将学习如何使用Spring Boot连接到NoSQL数据库。我们的文章重点是使用DataStax Astra DB，这是一个由Apache Cassandra驱动的DBaaS（数据库即服务），允许我们使用云原生服务开发和部署数据驱动的应用程序。</p>\\n<p>首先，我们将从设置和配置我们的应用程序与Astra DB开始。然后，我们将学习如何构建一个简单的Spring Boot应用程序。</p>\\n<h3>2. 依赖项</h3>\\n<p>让我们从向我们的_pom.xml_添加依赖项开始。当然，我们需要_spring-boot-starter-data-cassandra_依赖项：</p>","autoDesc":true}');export{d as comp,k as data};
