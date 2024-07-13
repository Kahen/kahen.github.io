import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BDZ-trJf.js";const e={},p=t(`<h1 id="axon框架持久化查询模型" tabindex="-1"><a class="header-anchor" href="#axon框架持久化查询模型"><span>Axon框架持久化查询模型</span></a></h1><p>Axon框架帮助我们构建事件驱动的微服务系统。在Axon框架的指南中，我们通过一个简单的Axon Spring Boot应用程序来了解Axon，其中包括构建了一个示例_订单_模型，供我们更新和查询。在Axon框架中分发查询时，我们添加了所有支持的查询。</p><p>本文将<strong>研究Axon框架的查询模型持久化</strong>。我们将涵盖使用MongoDB存储投影，以及测试的挑战以及如何保持流与查询模型同步。</p><h3 id="_2-1-令牌存储" tabindex="-1"><a class="header-anchor" href="#_2-1-令牌存储"><span>2.1. 令牌存储</span></a></h3><p>构建查询模型时，Axon使用_TokenStore_来跟踪。理想情况下，令牌存储与查询模型存储在同一数据库中以确保一致性。使用持久的令牌存储还将确保我们可以运行多个实例，其中每个实例只需要处理部分事件。分割为多个实例可以使用段，其中实例可以申请处理所有或部分段。如果我们使用JPA或JDBC进行持久化，使用_JpaTokenStore_或JdbcTokenStore。这两种令牌存储实现都在Axon框架中可用，无需扩展。</p><h3 id="_3-1-令牌存储" tabindex="-1"><a class="header-anchor" href="#_3-1-令牌存储"><span>3.1. 令牌存储</span></a></h3><p>有了依赖关系，我们可以<strong>配置Axon使用_MongoTokenStore_</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">TokenStore</span> <span class="token function">getTokenStore</span><span class="token punctuation">(</span><span class="token class-name">MongoClient</span> client<span class="token punctuation">,</span> <span class="token class-name">Serializer</span> serializer<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">MongoTokenStore</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">mongoTemplate</span><span class="token punctuation">(</span>
        <span class="token class-name">DefaultMongoTemplate</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">mongoDatabase</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">serializer</span><span class="token punctuation">(</span>serializer<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-事件处理类" tabindex="-1"><a class="header-anchor" href="#_3-2-事件处理类"><span>3.2. 事件处理类</span></a></h3><p>当_mongo_配置文件处于活动状态时，使用_MongoOrdersEventHandler_，以及令牌存储配置。这共同<strong>构成了事件处理类</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@ProcessingGroup</span><span class="token punctuation">(</span><span class="token string">&quot;orders&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Profile</span><span class="token punctuation">(</span><span class="token string">&quot;mongo&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MongoOrdersEventHandler</span> <span class="token keyword">implements</span> <span class="token class-name">OrdersEventHandler</span> <span class="token punctuation">{</span>
    <span class="token comment">// 更新和查询投影的所有方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时，我们在_InMemoryOrdersEventHandler_中添加了<code>@Profile(&quot;!mongo&quot;)</code>，以确保两者不会同时处于活动状态。Spring配置文件是有条件地启用组件的极好方式。</p><p>我们将在构造函数中使用依赖注入来获取_MongoClient_和_QueryUpdateEmitter_。我们使用_MongoClient_来创建MongoCollection和索引。我们注入_QueryUpdateEmitter_以启用订阅查询：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">MongoOrdersEventHandler</span><span class="token punctuation">(</span><span class="token class-name">MongoClient</span> client<span class="token punctuation">,</span> <span class="token class-name">QueryUpdateEmitter</span> emitter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    orders <span class="token operator">=</span> client
      <span class="token punctuation">.</span><span class="token function">getDatabase</span><span class="token punctuation">(</span><span class="token constant">AXON_FRAMEWORK_DATABASE_NAME</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">getCollection</span><span class="token punctuation">(</span><span class="token constant">ORDER_COLLECTION_NAME</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    orders<span class="token punctuation">.</span><span class="token function">createIndex</span><span class="token punctuation">(</span><span class="token class-name">Indexes</span><span class="token punctuation">.</span><span class="token function">ascending</span><span class="token punctuation">(</span><span class="token constant">ORDER_ID_PROPERTY_NAME</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token keyword">new</span> <span class="token class-name">IndexOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">unique</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>emitter <span class="token operator">=</span> emitter<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，我们将订单ID设置为唯一。这样，我们可以确保不会有两份具有相同订单ID的文档。</p><p><em>MongoOrdersEventHandler_使用_orders</em> mongo集合来处理查询。我们需要使用_documentToOrder()_方法将Mongo文档映射到订单：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@QueryHandler</span>
<span class="token keyword">public</span> <span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token function">handle</span><span class="token punctuation">(</span><span class="token class-name">FindAllOrderedProductsQuery</span> query<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">&gt;</span></span>\`\`\` orderList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    orders
      <span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>d <span class="token operator">-&gt;</span> orderList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token function">documentToOrder</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> orderList<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-复杂查询" tabindex="-1"><a class="header-anchor" href="#_3-3-复杂查询"><span>3.3. 复杂查询</span></a></h3><p>为了能够处理_TotalProductsShippedQuery_，我们添加了一个**<em>shippedProductFilter</em>，该过滤器筛选出已发货并具有产品的订单**：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">Bson</span> <span class="token function">shippedProductFilter</span><span class="token punctuation">(</span><span class="token class-name">String</span> productId<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">and</span><span class="token punctuation">(</span>
      <span class="token function">eq</span><span class="token punctuation">(</span><span class="token constant">ORDER_STATUS_PROPERTY_NAME</span><span class="token punctuation">,</span> <span class="token class-name">OrderStatus</span><span class="token punctuation">.</span><span class="token constant">SHIPPED</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token function">exists</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token constant">PRODUCTS_PROPERTY_NAME</span> <span class="token operator">+</span> <span class="token string">&quot;.%s&quot;</span><span class="token punctuation">,</span> productId<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，该过滤器在查询处理中使用，提取并添加产品的计数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@QueryHandler</span>
<span class="token keyword">public</span> <span class="token class-name">Integer</span> <span class="token function">handle</span><span class="token punctuation">(</span><span class="token class-name">TotalProductsShippedQuery</span> query<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">AtomicInteger</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicInteger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    orders
      <span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token function">shippedProductFilter</span><span class="token punctuation">(</span>query<span class="token punctuation">.</span><span class="token function">getProductId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>d <span class="token operator">-&gt;</span> d<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">PRODUCTS_PROPERTY_NAME</span><span class="token punctuation">,</span> <span class="token class-name">Document</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>d <span class="token operator">-&gt;</span> d<span class="token punctuation">.</span><span class="token function">getInteger</span><span class="token punctuation">(</span>query<span class="token punctuation">.</span><span class="token function">getProductId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>result<span class="token operator">::</span><span class="token function">addAndGet</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> result<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此查询将获取所有已发货的产品，并检索这些文档中的所有产品。然后，它将计算查询的特定产品并返回总数。</p><h3 id="_4-测试持久化查询模型" tabindex="-1"><a class="header-anchor" href="#_4-测试持久化查询模型"><span>4. 测试持久化查询模型</span></a></h3><p>使用持久化模型进行测试可能会使事情变得更加困难，因为我们<strong>希望每个测试都有隔离的环境</strong>。</p><h3 id="_4-1-单元测试" tabindex="-1"><a class="header-anchor" href="#_4-1-单元测试"><span>4.1. 单元测试</span></a></h3><p>对于_MongoOrdersEventHandler_，<strong>我们需要确保在每次测试后都删除集合，以便我们不会保留之前测试的状态</strong>。我们通过实现_getHandler()_方法来实现这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">protected</span> <span class="token class-name">OrdersEventHandler</span> <span class="token function">getHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    mongoClient<span class="token punctuation">.</span><span class="token function">getDatabase</span><span class="token punctuation">(</span><span class="token string">&quot;axonframework&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">drop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MongoOrdersEventHandler</span><span class="token punctuation">(</span>mongoClient<span class="token punctuation">,</span> emitter<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用_@BeforeEach_注解的方法，我们可以确保每个测试都是从新开始的。在这种情况下，我们使用嵌入式Mongo进行测试。另一个选择是使用测试容器。在这方面，测试查询模型与其他需要数据库的应用程序测试没有区别。</p><h3 id="_4-2-集成测试" tabindex="-1"><a class="header-anchor" href="#_4-2-集成测试"><span>4.2. 集成测试</span></a></h3><p>对于集成测试，我们使用类似的方法。然而，由于集成测试使用_OrdersEventHandler_接口，<strong>我们依赖于实现的_reset()_方法</strong>。</p><p>_reset()_方法的实现是：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">reset</span><span class="token punctuation">(</span><span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">&gt;</span></span>\`\`\` orderList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    orders<span class="token punctuation">.</span><span class="token function">deleteMany</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Document</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    orderList<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>o <span class="token operator">-&gt;</span> orders<span class="token punctuation">.</span><span class="token function">insertOne</span><span class="token punctuation">(</span><span class="token function">orderToDocument</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_reset()_方法确保只有列表中的订单是集合的一部分。该方法在_OrderQueryServiceIntegrationTest_中的每个测试之前执行：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@BeforeEach</span>
<span class="token keyword">void</span> <span class="token function">setUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    orderId <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Order</span> order <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Order</span><span class="token punctuation">(</span>orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    handler<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singletonList</span><span class="token punctuation">(</span>order<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至于测试查询，我们至少需要一个订单。通过已经存储一个订单，可以使测试本身变得更容易。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们展示了如何持久化查询模型。我们学习了如何使用MongoDB查询和测试模型。</p><p>如常，本文中使用的全部代码可以在GitHub上找到。</p>`,39),o=[p];function c(l,i){return a(),s("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-12-Persisting the Query Model.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-Persisting%20the%20Query%20Model.html","title":"Axon框架持久化查询模型","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Axon","Spring Boot"],"tag":["Axon Framework","MongoDB"],"head":[["meta",{"name":"keywords","content":"Axon Framework, MongoDB, Event Sourcing, Query Model"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-Persisting%20the%20Query%20Model.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Axon框架持久化查询模型"}],["meta",{"property":"og:description","content":"Axon框架持久化查询模型 Axon框架帮助我们构建事件驱动的微服务系统。在Axon框架的指南中，我们通过一个简单的Axon Spring Boot应用程序来了解Axon，其中包括构建了一个示例_订单_模型，供我们更新和查询。在Axon框架中分发查询时，我们添加了所有支持的查询。 本文将研究Axon框架的查询模型持久化。我们将涵盖使用MongoDB存储..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T02:55:54.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Axon Framework"}],["meta",{"property":"article:tag","content":"MongoDB"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T02:55:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Axon框架持久化查询模型\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T02:55:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Axon框架持久化查询模型 Axon框架帮助我们构建事件驱动的微服务系统。在Axon框架的指南中，我们通过一个简单的Axon Spring Boot应用程序来了解Axon，其中包括构建了一个示例_订单_模型，供我们更新和查询。在Axon框架中分发查询时，我们添加了所有支持的查询。 本文将研究Axon框架的查询模型持久化。我们将涵盖使用MongoDB存储..."},"headers":[{"level":3,"title":"2.1. 令牌存储","slug":"_2-1-令牌存储","link":"#_2-1-令牌存储","children":[]},{"level":3,"title":"3.1. 令牌存储","slug":"_3-1-令牌存储","link":"#_3-1-令牌存储","children":[]},{"level":3,"title":"3.2. 事件处理类","slug":"_3-2-事件处理类","link":"#_3-2-事件处理类","children":[]},{"level":3,"title":"3.3. 复杂查询","slug":"_3-3-复杂查询","link":"#_3-3-复杂查询","children":[]},{"level":3,"title":"4. 测试持久化查询模型","slug":"_4-测试持久化查询模型","link":"#_4-测试持久化查询模型","children":[]},{"level":3,"title":"4.1. 单元测试","slug":"_4-1-单元测试","link":"#_4-1-单元测试","children":[]},{"level":3,"title":"4.2. 集成测试","slug":"_4-2-集成测试","link":"#_4-2-集成测试","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720752954000,"updatedTime":1720752954000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.04,"words":1211},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-Persisting the Query Model.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Axon框架帮助我们构建事件驱动的微服务系统。在Axon框架的指南中，我们通过一个简单的Axon Spring Boot应用程序来了解Axon，其中包括构建了一个示例_订单_模型，供我们更新和查询。在Axon框架中分发查询时，我们添加了所有支持的查询。</p>\\n<p>本文将<strong>研究Axon框架的查询模型持久化</strong>。我们将涵盖使用MongoDB存储投影，以及测试的挑战以及如何保持流与查询模型同步。</p>\\n<h3>2.1. 令牌存储</h3>\\n<p>构建查询模型时，Axon使用_TokenStore_来跟踪。理想情况下，令牌存储与查询模型存储在同一数据库中以确保一致性。使用持久的令牌存储还将确保我们可以运行多个实例，其中每个实例只需要处理部分事件。分割为多个实例可以使用段，其中实例可以申请处理所有或部分段。如果我们使用JPA或JDBC进行持久化，使用_JpaTokenStore_或JdbcTokenStore。这两种令牌存储实现都在Axon框架中可用，无需扩展。</p>","autoDesc":true}');export{d as comp,k as data};
