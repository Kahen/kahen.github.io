import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-bN4DcMMr.js";const e={},p=t('<hr><h1 id="spring-data-cassandra中使用in子句查询的实现" tabindex="-1"><a class="header-anchor" href="#spring-data-cassandra中使用in子句查询的实现"><span>Spring Data Cassandra中使用IN子句查询的实现</span></a></h1><p>在本教程中，我们将学习如何使用Spring Data Cassandra实现使用IN子句查询多个记录的方法。我们将使用IN子句来指定一列的多个值。我们还将测试时遇到一个意外的错误，并理解其根本原因并解决问题。</p><h3 id="_2-1-理解in运算符的使用" tabindex="-1"><a class="header-anchor" href="#_2-1-理解in运算符的使用"><span>2.1. 理解IN运算符的使用</span></a></h3><p>在我们构建应用程序之前，让我们先了解这个运算符的使用。IN条件只允许在分区键的最后一列使用<strong>如果我们查询所有前面的键列的等值</strong>。同样，我们可以在任何聚簇键列中使用它，遵循相同的规则。</p><h3 id="_2-2-maven依赖" tabindex="-1"><a class="header-anchor" href="#_2-2-maven依赖"><span>2.2. Maven依赖</span></a></h3><p>我们将添加spring-boot-starter-data-cassandra依赖：</p><h3 id="_2-3-实现spring-data-repository" tabindex="-1"><a class="header-anchor" href="#_2-3-实现spring-data-repository"><span>2.3. 实现Spring Data Repository</span></a></h3><p>让我们通过扩展CassandraRepository接口来实现查询。首先，我们将实现上述product表的一些属性。</p><h3 id="_3-实现productrepository的测试" tabindex="-1"><a class="header-anchor" href="#_3-实现productrepository的测试"><span>3. 实现ProductRepository的测试</span></a></h3><p>现在，让我们使用Cassandra容器实例来实现ProductRepository的测试案例。</p><h3 id="_3-4-错误的根源" tabindex="-1"><a class="header-anchor" href="#_3-4-错误的根源"><span>3.4. 错误的根源</span></a></h3><p>上述日志表明测试因内部CodecNotFoundException异常而失败。CodecNotFoundException异常表明查询参数类型未找到所需的操作。</p><h3 id="_4-修正查询" tabindex="-1"><a class="header-anchor" href="#_4-修正查询"><span>4. 修正查询</span></a></h3><p>为了修正错误，我们将在ProductRepository接口中添加一个有效的查询参数类型。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们学习了如何在Cassandra中使用Spring Data Cassandra实现IN查询子句。我们还遇到了测试中的一个意外错误，并理解了根本原因。我们看到了如何使用有效的方法参数中的集合类型来解决问题。继续翻译：</p><h3 id="_2-2-maven依赖性" tabindex="-1"><a class="header-anchor" href="#_2-2-maven依赖性"><span>2.2. Maven依赖性</span></a></h3><p>我们将添加<code>spring-boot-starter-data-cassandra</code>依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.springframework.boot```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```spring-boot-starter-data-cassandra```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```3.1.5```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-实现spring-data-repository-1" tabindex="-1"><a class="header-anchor" href="#_2-3-实现spring-data-repository-1"><span>2.3. 实现Spring Data Repository</span></a></h3><p>通过扩展<code>CassandraRepository</code>接口来实现查询。首先，我们将实现上述<code>product</code>表的一些属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Table</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Product</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@PrimaryKeyColumn</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;product_id&quot;</span><span class="token punctuation">,</span> ordinal <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> type <span class="token operator">=</span> <span class="token class-name">PrimaryKeyType</span><span class="token punctuation">.</span><span class="token constant">PARTITIONED</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">UUID</span> productId<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@PrimaryKeyColumn</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;product_name&quot;</span><span class="token punctuation">,</span> ordinal <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> type <span class="token operator">=</span> <span class="token class-name">PrimaryKeyType</span><span class="token punctuation">.</span><span class="token constant">CLUSTERED</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> productName<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span><span class="token string">&quot;description&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> description<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span><span class="token string">&quot;price&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token keyword">double</span> price<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的<code>Product</code>类中，我们将<code>productId</code>注解为主分区键，<code>productName</code>作为聚簇键。这两个列共同构成了主键。</p><p>现在，假设我们尝试找到所有匹配单个<code>productId</code>和多个<code>productName</code>的产品。 我们将实现<code>ProductRepository</code>接口，使用<code>IN</code>查询：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span>\n<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ProductRepository</span> <span class="token keyword">extends</span> <span class="token class-name">CassandraRepository</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Product</span><span class="token punctuation">,</span> UUID<span class="token punctuation">&gt;</span></span>` <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Query</span><span class="token punctuation">(</span><span class="token string">&quot;select * from product where product_id = :productId and product_name in :productNames&quot;</span><span class="token punctuation">)</span>\n    <span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Product</span><span class="token punctuation">&gt;</span></span>`` <span class="token function">findByProductIdAndNames</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">&quot;productId&quot;</span><span class="token punctuation">)</span> <span class="token class-name">UUID</span> productId<span class="token punctuation">,</span> <span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">&quot;productNames&quot;</span><span class="token punctuation">)</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> productNames<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的查询中，我们将<code>productId</code>作为<code>UUID</code>传递，并将<code>productNames</code>作为数组类型，以获取匹配的产品。 Cassandra不允许在没有包含所有主键的情况下对非主键列进行查询。这是由于在多个节点上执行此类查询时性能的不可预测性。</p><p>或者，我们可以使用<code>ALLOW FILTERING</code>选项在任何列上使用<code>IN</code>或任何其他条件：</p><div class="language-cql line-numbers-mode" data-ext="cql" data-title="cql"><pre class="language-cql"><code>cqlsh:mykeyspace&gt; select * from product where product_name in (&#39;banana&#39;, &#39;apple&#39;) and price=6.05 ALLOW FILTERING;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>ALLOW FILTERING</code>选项可能会对性能产生潜在影响，我们应该谨慎使用。</p><h3 id="_3-1-设置测试容器" tabindex="-1"><a class="header-anchor" href="#_3-1-设置测试容器"><span>3.1. 设置测试容器</span></a></h3><p>为了进行实验，我们需要一个测试容器来运行Cassandra。我们将使用<code>testcontainers</code>库设置容器。</p><p>我们应该注意到<code>testcontainers</code>库需要一个运行中的Docker环境才能正常工作。</p><p>让我们添加<code>testcontainers</code>和<code>testcontainers-cassandra</code>依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.testcontainers```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```testcontainers```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```1.19.0```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>``test``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>``\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.testcontainers```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```cassandra```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```1.19.0```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>``test``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>``\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-启动测试容器" tabindex="-1"><a class="header-anchor" href="#_3-2-启动测试容器"><span>3.2. 启动测试容器</span></a></h3><p>首先，我们将使用<code>@Testcontainers</code>注解设置测试类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Testcontainers</span>\n<span class="token annotation punctuation">@SpringBootTest</span>\n<span class="token keyword">class</span> <span class="token class-name">ProductRepositoryIntegrationTest</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将定义Cassandra容器对象，并在指定端口上公开它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Container</span>\n<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">CassandraContainer</span> cassandra <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CassandraContainer</span><span class="token punctuation">(</span><span class="token string">&quot;cassandra:3.11.2&quot;</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">withExposedPorts</span><span class="token punctuation">(</span><span class="token number">9042</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们配置一些与连接相关的属性，并创建<code>Keyspace</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@BeforeAll</span>\n<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">setupCassandraConnectionProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;spring.cassandra.keyspace-name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;mykeyspace&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;spring.cassandra.contact-points&quot;</span><span class="token punctuation">,</span> cassandra<span class="token punctuation">.</span><span class="token function">getHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;spring.cassandra.port&quot;</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>cassandra<span class="token punctuation">.</span><span class="token function">getMappedPort</span><span class="token punctuation">(</span><span class="token number">9042</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">createKeyspace</span><span class="token punctuation">(</span>cassandra<span class="token punctuation">.</span><span class="token function">getCluster</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">createKeyspace</span><span class="token punctuation">(</span><span class="token class-name">Cluster</span> cluster<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Session</span> session <span class="token operator">=</span> cluster<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n       session<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token string">&quot;CREATE KEYSPACE IF NOT EXISTS &quot;</span> <span class="token operator">+</span> <span class="token constant">KEYSPACE_NAME</span> <span class="token operator">+</span> <span class="token string">&quot; WITH replication = &quot;</span> <span class="token operator">+</span>\n         <span class="token string">&quot;{&#39;class&#39;:&#39;SimpleStrategy&#39;,&#39;replication_factor&#39;:&#39;1&#39;};&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-实施集成测试" tabindex="-1"><a class="header-anchor" href="#_3-3-实施集成测试"><span>3.3. 实施集成测试</span></a></h3><p>为了测试，我们将使用上述<code>ProductRepository</code>查询检索一些现有产品。</p><p>现在，让我们完成测试并验证检索功能：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">UUID</span> productId1 <span class="token operator">=</span> <span class="token class-name">UUIDs</span><span class="token punctuation">.</span><span class="token function">timeBased</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Product</span> product1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span>productId1<span class="token punctuation">,</span> <span class="token string">&quot;Apple&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Apple v1&quot;</span><span class="token punctuation">,</span> <span class="token number">12.5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Product</span> product2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span>productId1<span class="token punctuation">,</span> <span class="token string">&quot;Apple v2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Apple v2&quot;</span><span class="token punctuation">,</span> <span class="token number">15.5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">UUID</span> productId2 <span class="token operator">=</span> <span class="token class-name">UUIDs</span><span class="token punctuation">.</span><span class="token function">timeBased</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Product</span> product3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span>productId2<span class="token punctuation">,</span> <span class="token string">&quot;Banana&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Banana v1&quot;</span><span class="token punctuation">,</span> <span class="token number">5.5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Product</span> product4 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span>productId2<span class="token punctuation">,</span> <span class="token string">&quot;Banana v2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Banana v2&quot;</span><span class="token punctuation">,</span> <span class="token number">15.5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nproductRepository<span class="token punctuation">.</span><span class="token function">saveAll</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>product1<span class="token punctuation">,</span> product2<span class="token punctuation">,</span> product3<span class="token punctuation">,</span> product4<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Product</span><span class="token punctuation">&gt;</span></span>`` existingProducts <span class="token operator">=</span> productRepository<span class="token punctuation">.</span><span class="token function">findByProductIdAndNames</span><span class="token punctuation">(</span>productId1<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token string">&quot;Apple&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Apple v2&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> existingProducts<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>existingProducts<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>product1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>existingProducts<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>product2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>预计上述测试应该通过。相反，我们将从<code>ProductRepository</code>收到一个意外的错误：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>com.datastax.oss.driver.api.core.type.codec.CodecNotFoundException: Codec not found for requested operation: [List(TEXT, not frozen] &lt;- [Ljava.lang.String;\n    at com.datastax.oss.driver.internal.core.type.codec.registry.CachingCodecRegistry.createCodec(CachingCodecRegistry.java:609)\n    at com.datastax.oss.driver.internal.core.type.codec.registry.DefaultCodecRegistry$1.load(DefaultCodecRegistry.java:95)\n    at com.datastax.oss.driver.internal.core.type.codec.registry.DefaultCodecRegistry$1.load(DefaultCodecRegistry.java:92)\n    at com.datastax.oss.driver.shaded.guava.common.cache.LocalCache$LoadingValueReference.loadFuture(LocalCache.java:3527)\n    ....\n    at com.datastax.oss.driver.internal.core.data.ValuesHelper.encodePreparedValues(ValuesHelper.java:112)\n    at com.datastax.oss.driver.internal.core.cql.DefaultPreparedStatement.boundStatementBuilder(DefaultPreparedStatement.java:187)\n    at org.springframework.data.cassandra.core.PreparedStatementDelegate.bind(PreparedStatementDelegate.java:59)\n    at org.springframework.data.cassandra.core.CassandraTemplate$PreparedStatementHandler.bindValues(CassandraTemplate.java:1117)\n    at org.springframework.data.cassandra.core.cql.CqlTemplate.query(CqlTemplate.java:541)\n    at org.springframework.data.cassandra.core.cql.CqlTemplate.query(CqlTemplate.java:571)...\n    at com.sun.proxy.$Proxy90.findByProductIdAndNames(Unknown Source)\n    at org.baeldung.inquery.ProductRepositoryIntegrationTest$ProductRepositoryLiveTest.givenExistingProducts_whenFindByProductIdAndNames_thenProductsIsFetched(ProductRepositoryNestedLiveTest.java:113)\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们详细调查错误。</p><p>OK</p>',50),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-30-Query With IN Clause in Spring Data Cassandra.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-Query%20With%20IN%20Clause%20in%20Spring%20Data%20Cassandra.html","title":"Spring Data Cassandra中使用IN子句查询的实现","lang":"zh-CN","frontmatter":{"date":"2024-04-23T00:00:00.000Z","category":["Spring Data Cassandra","Query IN Clause"],"tag":["Spring Data Cassandra","IN Clause","Query Optimization"],"head":[["meta",{"name":"keywords","content":"Spring Data Cassandra, IN Clause, Query Optimization"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-Query%20With%20IN%20Clause%20in%20Spring%20Data%20Cassandra.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Data Cassandra中使用IN子句查询的实现"}],["meta",{"property":"og:description","content":"Spring Data Cassandra中使用IN子句查询的实现 在本教程中，我们将学习如何使用Spring Data Cassandra实现使用IN子句查询多个记录的方法。我们将使用IN子句来指定一列的多个值。我们还将测试时遇到一个意外的错误，并理解其根本原因并解决问题。 2.1. 理解IN运算符的使用 在我们构建应用程序之前，让我们先了解这个运算..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T13:56:02.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Data Cassandra"}],["meta",{"property":"article:tag","content":"IN Clause"}],["meta",{"property":"article:tag","content":"Query Optimization"}],["meta",{"property":"article:published_time","content":"2024-04-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T13:56:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Data Cassandra中使用IN子句查询的实现\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-04-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T13:56:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Data Cassandra中使用IN子句查询的实现 在本教程中，我们将学习如何使用Spring Data Cassandra实现使用IN子句查询多个记录的方法。我们将使用IN子句来指定一列的多个值。我们还将测试时遇到一个意外的错误，并理解其根本原因并解决问题。 2.1. 理解IN运算符的使用 在我们构建应用程序之前，让我们先了解这个运算..."},"headers":[{"level":3,"title":"2.1. 理解IN运算符的使用","slug":"_2-1-理解in运算符的使用","link":"#_2-1-理解in运算符的使用","children":[]},{"level":3,"title":"2.2. Maven依赖","slug":"_2-2-maven依赖","link":"#_2-2-maven依赖","children":[]},{"level":3,"title":"2.3. 实现Spring Data Repository","slug":"_2-3-实现spring-data-repository","link":"#_2-3-实现spring-data-repository","children":[]},{"level":3,"title":"3. 实现ProductRepository的测试","slug":"_3-实现productrepository的测试","link":"#_3-实现productrepository的测试","children":[]},{"level":3,"title":"3.4. 错误的根源","slug":"_3-4-错误的根源","link":"#_3-4-错误的根源","children":[]},{"level":3,"title":"4. 修正查询","slug":"_4-修正查询","link":"#_4-修正查询","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]},{"level":3,"title":"2.2. Maven依赖性","slug":"_2-2-maven依赖性","link":"#_2-2-maven依赖性","children":[]},{"level":3,"title":"2.3. 实现Spring Data Repository","slug":"_2-3-实现spring-data-repository-1","link":"#_2-3-实现spring-data-repository-1","children":[]},{"level":3,"title":"3.1. 设置测试容器","slug":"_3-1-设置测试容器","link":"#_3-1-设置测试容器","children":[]},{"level":3,"title":"3.2. 启动测试容器","slug":"_3-2-启动测试容器","link":"#_3-2-启动测试容器","children":[]},{"level":3,"title":"3.3. 实施集成测试","slug":"_3-3-实施集成测试","link":"#_3-3-实施集成测试","children":[]}],"git":{"createdTime":1719755762000,"updatedTime":1719755762000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.22,"words":1266},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-Query With IN Clause in Spring Data Cassandra.md","localizedDate":"2024年4月23日","excerpt":"<hr>\\n<h1>Spring Data Cassandra中使用IN子句查询的实现</h1>\\n<p>在本教程中，我们将学习如何使用Spring Data Cassandra实现使用IN子句查询多个记录的方法。我们将使用IN子句来指定一列的多个值。我们还将测试时遇到一个意外的错误，并理解其根本原因并解决问题。</p>\\n<h3>2.1. 理解IN运算符的使用</h3>\\n<p>在我们构建应用程序之前，让我们先了解这个运算符的使用。IN条件只允许在分区键的最后一列使用<strong>如果我们查询所有前面的键列的等值</strong>。同样，我们可以在任何聚簇键列中使用它，遵循相同的规则。</p>\\n<h3>2.2. Maven依赖</h3>","autoDesc":true}');export{d as comp,k as data};
