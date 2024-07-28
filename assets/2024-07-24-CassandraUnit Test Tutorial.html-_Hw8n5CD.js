import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-D4B8YWfq.js";const e={},p=t('<h1 id="cassandra单元测试教程" tabindex="-1"><a class="header-anchor" href="#cassandra单元测试教程"><span>Cassandra单元测试教程</span></a></h1><p>Apache Cassandra是一个功能强大的开源NoSQL分布式数据库。在之前的教程中，我们探讨了如何使用Cassandra和Java进行基本操作。</p><p>在本教程中，<strong>我们将在前一个教程的基础上，学习如何使用CassandraUnit编写可靠、自包含的单元测试。</strong></p><p>首先，我们将从设置和配置最新版本的CassandraUnit开始。然后，我们将探索几个示例，展示我们如何编写不依赖于外部数据库服务器运行的单元测试。</p><p>而且，如果您在生产环境中运行Cassandra，您肯定可以减少运行和维护自己的服务器的复杂性，转而使用Astra数据库，这是一个基于Apache Cassandra构建的<strong>云数据库</strong>。</p><h2 id="_2-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-依赖项"><span><strong>2. 依赖项</strong></span></a></h2><p>当然，我们需要将标准的Datastax Java驱动程序添加到我们的_pom.xml_中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```com.datastax.oss```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```java-driver-core```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```4.13.0```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了使用嵌入式数据库服务器测试我们的代码，我们还应该将_cassandra-unit_依赖项添加到我们的_pom.xml_中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.cassandraunit```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```cassandra-unit```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```4.3.1.0```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>``test``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>``\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们已经配置了所有必要的依赖项，我们可以开始编写我们的单元测试了。</p><h2 id="_3-入门" tabindex="-1"><a class="header-anchor" href="#_3-入门"><span><strong>3. 入门</strong></span></a></h2><p>在本教程中，我们的测试重点将是一个简单的人员表，我们通过一个简单的CQL脚本进行控制：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> person<span class="token punctuation">(</span>\n    id <span class="token keyword">varchar</span><span class="token punctuation">,</span>\n    name <span class="token keyword">varchar</span><span class="token punctuation">,</span>\n    <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> person<span class="token punctuation">(</span>id<span class="token punctuation">,</span> name<span class="token punctuation">)</span> <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token string">&#39;1234&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;Eugen&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> person<span class="token punctuation">(</span>id<span class="token punctuation">,</span> name<span class="token punctuation">)</span> <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token string">&#39;5678&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;Michael&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们将看到的，CassandraUnit提供了几种变体来帮助我们编写测试，但它们的核心是几个我们将不断重复的简单概念：</p><ul><li>首先，我们将启动一个嵌入式Cassandra服务器，该服务器在我们的JVM内运行在内存中。</li><li>然后我们将人员数据集加载到运行中的嵌入式实例中。</li><li>最后，我们将发起一个简单的查询，以验证我们的数据是否已正确加载。</li></ul><p><strong>在本节结束时，快速说一下测试。通常，在编写干净的单元或集成测试时，我们不应该依赖于我们可能无法控制或可能突然停止工作的外部服务</strong>。这可能对我们的测试结果产生不利影响。</p><p>同样，如果我们依赖于外部服务，在这种情况下是一个运行中的Cassandra数据库，我们能无法以我们想要的方式设置它、控制它并从我们的测试中拆除它。</p><h2 id="_4-使用原生方法进行测试" tabindex="-1"><a class="header-anchor" href="#_4-使用原生方法进行测试"><span><strong>4. 使用原生方法进行测试</strong></span></a></h2><p>让我们首先看看如何使用CassandraUnit附带的原生API。首先，我们将定义我们的单元测试和测试设置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NativeEmbeddedCassandraUnitTest</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">CqlSession</span> session<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Before</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n        <span class="token class-name">EmbeddedCassandraServerHelper</span><span class="token punctuation">.</span><span class="token function">startEmbeddedCassandra</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        session <span class="token operator">=</span> <span class="token class-name">EmbeddedCassandraServerHelper</span><span class="token punctuation">.</span><span class="token function">getSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">new</span> <span class="token class-name">CQLDataLoader</span><span class="token punctuation">(</span>session<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ClassPathCQLDataSet</span><span class="token punctuation">(</span><span class="token string">&quot;people.cql&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;people&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们浏览一下我们测试设置的关键部分。<strong>首先，我们通过调用_startEmbeddedCassandra()_方法开始启动嵌入式Cassandra服务器。</strong></p><p>这将使用固定端口9142启动我们的数据库服务器：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>11:13:36.754 [pool-2-thread-1] INFO  o.apache.cassandra.transport.Server\n  - Starting listening for CQL clients on localhost/127.0.0.1:9142 (unencrypted)...\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们希望使用一个随机可用的端口，我们可以使用提供的Cassandra YAML配置文件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">EmbeddedCassandraServerHelper</span>\n  <span class="token punctuation">.</span><span class="token function">startEmbeddedCassandra</span><span class="token punctuation">(</span><span class="token class-name">EmbeddedCassandraServerHelper</span><span class="token punctuation">.</span><span class="token constant">CASSANDRA_RNDPORT_YML_FILE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，我们也可以在启动服务器时传递我们自己的YAML配置文件。当然，这个文件需要在我们的类路径中。</p><p>接下来，我们可以将_people.cql_数据集加载到我们的数据库中。<strong>为此，我们使用_ClassPathCQLDataSet_类，它需要数据集位置和可选的keyspace名称。</strong></p><p>现在我们已经加载了一些数据，并且我们的嵌入式服务器正在运行，我们可以继续编写一个简单的单元测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenEmbeddedCassandraInstance_whenStarted_thenQuerySuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ResultSet</span> result <span class="token operator">=</span> session<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token string">&quot;select * from person WHERE id=1234&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">is</span><span class="token punctuation">(</span><span class="token string">&quot;Eugen&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，执行一个简单的查询确认了我们的测试正在正确工作。太棒了！<strong>我们现在有了一种使用内存中的Cassandra数据库编写自包含、独立的单元测试的方法。</strong></p><p>最后，当我们拆除测试时，我们将清理我们的嵌入式实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@After</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">tearDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n    <span class="token class-name">EmbeddedCassandraServerHelper</span><span class="token punctuation">.</span><span class="token function">cleanEmbeddedCassandra</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行此操作将删除除_system_ keyspace之外的所有现有keyspace。</p><h2 id="_5-使用cassandraunit抽象junit测试用例进行测试" tabindex="-1"><a class="header-anchor" href="#_5-使用cassandraunit抽象junit测试用例进行测试"><span><strong>5. 使用CassandraUnit抽象JUnit测试用例进行测试</strong></span></a></h2><p>为了帮助简化我们在上一节中看到的例子，CassandraUnit提供了一个抽象测试用例类_AbstractCassandraUnit4CQLTestCase,_它负责我们之前看到的设置和拆除：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AbstractTestCaseWithEmbeddedCassandraUnitTest</span>\n  <span class="token keyword">extends</span> <span class="token class-name">AbstractCassandraUnit4CQLTestCase</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">CQLDataSet</span> <span class="token function">getDataSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ClassPathCQLDataSet</span><span class="token punctuation">(</span><span class="token string">&quot;people.cql&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;people&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Test</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenEmbeddedCassandraInstance_whenStarted_thenQuerySuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n        <span class="token class-name">ResultSet</span> result <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token string">&quot;select * from person WHERE id=1234&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">is</span><span class="token punctuation">(</span><span class="token string">&quot;Eugen&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这一次，通过扩展_AbstractCassandraUnit4CQLTestCase_类，我们所要做的就是覆盖_getDataSet()<em>方法，它返回我们想要加载的_CQLDataSet</em>。</p><p>另一个微妙的区别是，我们的测试需要调用_getSession()_来访问Cassandra Java驱动程序。</p><h2 id="_6-使用cassandracqlunit-junit规则进行测试" tabindex="-1"><a class="header-anchor" href="#_6-使用cassandracqlunit-junit规则进行测试"><span><strong>6. 使用CassandraCQLUnit JUnit规则进行测试</strong></span></a></h2><p>如果我们不想强制我们的测试扩展_AbstractCassandraUnit4CQLTestCase,_那么幸运的是，CassandraUnit还提供了一个标准的JUnit规则：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JUnitRuleWithEmbeddedCassandraUnitTest</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@Rule</span>\n    <span class="token keyword">public</span> <span class="token class-name">CassandraCQLUnit</span> cassandra <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CassandraCQLUnit</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ClassPathCQLDataSet</span><span class="token punctuation">(</span><span class="token string">&quot;people.cql&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;people&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Test</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenEmbeddedCassandraInstance_whenStarted_thenQuerySuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n        <span class="token class-name">ResultSet</span> result <span class="token operator">=</span> cassandra<span class="token punctuation">.</span>session<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token string">&quot;select * from person WHERE id=5678&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">is</span><span class="token punctuation">(</span><span class="token string">&quot;Michael&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们所要做的就是在我们的测试中声明一个_CassandraCQLUnit_字段，它是标准的JUnit_@Rule_。这个规则将准备和管理我们的Cassandra服务器的生命周期。</strong></p><h2 id="_7-与spring一起工作" tabindex="-1"><a class="header-anchor" href="#_7-与spring一起工作"><span><strong>7. 与Spring一起工作</strong></span></a></h2><p>通常我们可能会在项目中将Cassandra与Spring集成。幸运的是，CassandraUnit还提供了与Spring TestContext Framework一起工作的支持。</p><p>为了利用这种支持，我们需要将_cassandra-unit-spring_ Maven依赖项添加到我们的项目中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.cassandraunit```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```cassandra-unit-spring```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```4.3.1.0```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>``test``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>``\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以从我们的测试中使用一些注释和类。让我们继续编写一个使用最基本的Spring配置的测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RunWith</span><span class="token punctuation">(</span><span class="token class-name">SpringJUnit4ClassRunner</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>\n<span class="token annotation punctuation">@TestExecutionListeners</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token class-name">CassandraUnitTestExecutionListener</span><span class="token punctuation">.</span><span class="token keyword">class</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token annotation punctuation">@CassandraDataSet</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;people.cql&quot;</span><span class="token punctuation">,</span> keyspace <span class="token operator">=</span> <span class="token string">&quot;people&quot;</span><span class="token punctuation">)</span>\n<span class="token annotation punctuation">@EmbeddedCassandra</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SpringWithEmbeddedCassandraUnitTest</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@Test</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenEmbeddedCassandraInstance_whenStarted_thenQuerySuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n        <span class="token class-name">CqlSession</span> session <span class="token operator">=</span> <span class="token class-name">EmbeddedCassandraServerHelper</span><span class="token punctuation">.</span><span class="token function">getSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token class-name">ResultSet</span> result <span class="token operator">=</span> session<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token string">&quot;select * from person WHERE id=1234&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">is</span><span class="token punctuation">(</span><span class="token string">&quot;Eugen&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们浏览一下我们测试的关键部分。首先，我们通过装饰我们的测试类来使用两个相当标准的Spring相关注释：</p><ul><li><em>@RunWith(SpringJUnit4ClassRunner.class)<em>注释将确保我们的测试嵌入Spring的_TestContextManager</em>，让我们可以访问Spring_ApplicationContext</em>。</li><li>我们还指定了一个自定义_TestExecutionListener,_叫做_CassandraUnitTestExecutionListener,_它负责启动和停止我们的服务器并查找其他CassandraUnit注释。</li></ul><p><strong>这里是关键部分；我们使用_@EmbeddedCassandra_注释将嵌入式Cassandra服务器的实例注入到我们的测试中</strong>。此外，还有几个属性可供我们使用，以进一步配置嵌入式数据库服务器：</p><ul><li><em>configuration</em> – 一个不同的Cassandra配置file</li><li><em>clusterName</em> – 集群的名称</li><li><em>host</em> – 我们集群的主机</li><li><em>port</em> – 我们集群使用的端口</li></ul><p>我们在这里保持简单，通过从声明中省略这些属性选择了默认值。</p><p>对于难题的最后一部分，我们使用_@CassandraDataSet_注释加载我们之前看到的相同的CQL数据集。与之前一样，我们可以发送一个查询来验证我们的数据库内容是否正确。</p><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span><strong>8. 结论</strong></span></a></h2><p>在本文中，我们学习了几种可以使用CassandraUnit编写独立单元测试的方法，这些测试使用Apache Cassandra的嵌入式实例。我们还讨论了如何从单元测试中使用Spring。</p><p>如往常一样，本文的完整源代码可在GitHub上获得。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/66d236ad2fbffe8cfd463ebd2b4a43c0?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/whiteleaf.svg" alt="img" loading="lazy"></p><p>OK</p>',60),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-24-CassandraUnit Test Tutorial.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-24/2024-07-24-CassandraUnit%20Test%20Tutorial.html","title":"Cassandra单元测试教程","lang":"zh-CN","frontmatter":{"date":"2024-07-24T00:00:00.000Z","category":["Java","Cassandra"],"tag":["CassandraUnit","Unit Test"],"head":[["meta",{"name":"keywords","content":"Java, Cassandra, Unit Test, CassandraUnit, Baeldung"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-24/2024-07-24-CassandraUnit%20Test%20Tutorial.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Cassandra单元测试教程"}],["meta",{"property":"og:description","content":"Cassandra单元测试教程 Apache Cassandra是一个功能强大的开源NoSQL分布式数据库。在之前的教程中，我们探讨了如何使用Cassandra和Java进行基本操作。 在本教程中，我们将在前一个教程的基础上，学习如何使用CassandraUnit编写可靠、自包含的单元测试。 首先，我们将从设置和配置最新版本的CassandraUnit..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-24T02:20:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"CassandraUnit"}],["meta",{"property":"article:tag","content":"Unit Test"}],["meta",{"property":"article:published_time","content":"2024-07-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-24T02:20:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Cassandra单元测试教程\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/66d236ad2fbffe8cfd463ebd2b4a43c0?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/whiteleaf.svg\\"],\\"datePublished\\":\\"2024-07-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-24T02:20:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Cassandra单元测试教程 Apache Cassandra是一个功能强大的开源NoSQL分布式数据库。在之前的教程中，我们探讨了如何使用Cassandra和Java进行基本操作。 在本教程中，我们将在前一个教程的基础上，学习如何使用CassandraUnit编写可靠、自包含的单元测试。 首先，我们将从设置和配置最新版本的CassandraUnit..."},"headers":[{"level":2,"title":"2. 依赖项","slug":"_2-依赖项","link":"#_2-依赖项","children":[]},{"level":2,"title":"3. 入门","slug":"_3-入门","link":"#_3-入门","children":[]},{"level":2,"title":"4. 使用原生方法进行测试","slug":"_4-使用原生方法进行测试","link":"#_4-使用原生方法进行测试","children":[]},{"level":2,"title":"5. 使用CassandraUnit抽象JUnit测试用例进行测试","slug":"_5-使用cassandraunit抽象junit测试用例进行测试","link":"#_5-使用cassandraunit抽象junit测试用例进行测试","children":[]},{"level":2,"title":"6. 使用CassandraCQLUnit JUnit规则进行测试","slug":"_6-使用cassandracqlunit-junit规则进行测试","link":"#_6-使用cassandracqlunit-junit规则进行测试","children":[]},{"level":2,"title":"7. 与Spring一起工作","slug":"_7-与spring一起工作","link":"#_7-与spring一起工作","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1721787638000,"updatedTime":1721787638000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.73,"words":2019},"filePathRelative":"posts/baeldung/2024-07-24/2024-07-24-CassandraUnit Test Tutorial.md","localizedDate":"2024年7月24日","excerpt":"\\n<p>Apache Cassandra是一个功能强大的开源NoSQL分布式数据库。在之前的教程中，我们探讨了如何使用Cassandra和Java进行基本操作。</p>\\n<p>在本教程中，<strong>我们将在前一个教程的基础上，学习如何使用CassandraUnit编写可靠、自包含的单元测试。</strong></p>\\n<p>首先，我们将从设置和配置最新版本的CassandraUnit开始。然后，我们将探索几个示例，展示我们如何编写不依赖于外部数据库服务器运行的单元测试。</p>\\n<p>而且，如果您在生产环境中运行Cassandra，您肯定可以减少运行和维护自己的服务器的复杂性，转而使用Astra数据库，这是一个基于Apache Cassandra构建的<strong>云数据库</strong>。</p>","autoDesc":true}');export{d as comp,k as data};
