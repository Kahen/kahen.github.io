import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CJGTm_7y.js";const e={},p=t(`<hr><h1 id="使用事务进行只读操作" tabindex="-1"><a class="header-anchor" href="#使用事务进行只读操作"><span>使用事务进行只读操作</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本文中，我们将讨论只读事务。我们将讨论它们的目的以及如何使用它们，并检查与性能和优化相关的一些细微差别。<strong>为了简单起见，我们将重点关注MySQL的InnoDB引擎</strong>。但请记住，根据数据库/存储引擎的不同，一些信息可能会有所变化。</p><h2 id="_2-什么是事务" tabindex="-1"><a class="header-anchor" href="#_2-什么是事务"><span>2. 什么是事务？</span></a></h2><p><strong>事务是一个原子操作，由一个或多个语句组成</strong>。它是原子的，因为该操作中的所有语句要么全部成功（被提交），要么全部失败（被回滚），这意味着全有或全无。事务的原子性由ACID属性中的字母‘A’表示。</p><p><strong>另一个关键点是，所有语句在InnoDB引擎中都会变成事务，如果不是显式的，那么就是隐式的</strong>。当我们将并发性加入等式时，这个概念变得更加难以理解。然后，我们需要澄清另一个ACID属性，即隔离性‘I’。</p><p><strong>理解隔离级别属性对我们来说至关重要，这样我们才能理解性能与一致性保证之间的权衡</strong>。然而，在详细讨论隔离级别之前，请记住，由于InnoDB中的所有语句都是事务，它们可以被提交或回滚。如果没有指定事务，数据库会创建一个，并且根据_autocommit_属性，它可能会被提交或不被提交。</p><h3 id="_2-1-隔离级别" tabindex="-1"><a class="header-anchor" href="#_2-1-隔离级别"><span>2.1. 隔离级别</span></a></h3><p>对于本文，我们将假设MySQL的默认值——可重复读。它在同一事务内提供一致的读取，这意味着第一次读取将建立一个快照（时间点），所有后续读取将与彼此一致。我们可以查阅MySQL的官方文档以获取更多信息。当然，保持这样的快照有其后果，但保证了较高的一致性水平。</p><p>不同的数据库可能有不同的名称或隔离级别选项，但大多数可能都是相似的。</p><h2 id="_3-为什么以及在哪里使用事务" tabindex="-1"><a class="header-anchor" href="#_3-为什么以及在哪里使用事务"><span>3. 为什么以及在哪里使用事务？</span></a></h2><p>现在我们更好地理解了事务是什么以及它的不同属性，让我们来谈谈只读事务。正如前面所解释的，在InnoDB引擎中，所有语句都是事务，因此它们可能涉及诸如锁定和快照之类的事情。然而，我们可以看到<strong>与事务协调相关的一些开销，例如用事务ID标记行和其他内部结构，对于简单的查询来说可能并不是必需的</strong>。这就是只读事务发挥作用的地方。</p><p>我们可以使用语法_START TRANSACTION READ ONLY_明确定义一个只读事务。MySQL还尝试自动检测只读事务。但在声明时可以应用进一步的优化。<strong>读密集型应用程序可以利用这些优化，并在我们的数据库集群上节省资源利用</strong>。</p><h3 id="_3-1-应用程序与数据库" tabindex="-1"><a class="header-anchor" href="#_3-1-应用程序与数据库"><span>3.1. 应用程序与数据库</span></a></h3><p>我们需要知道，在应用程序中处理持久性层可能涉及许多抽象层。每个层都有不同的责任。然而，为了简化，让我们说最终，这些层影响我们的应用程序如何处理数据库或数据库如何处理数据操作。</p><p>当然，并非所有应用程序都有所有这些层，但这代表了一个很好的概括。假设我们有一个Spring应用程序，简而言之，这些层的目的是：</p><ul><li>DAO <strong>:</strong> 作为业务逻辑和持久性细节之间的桥梁</li><li>事务抽象：处理应用程序级别的事务复杂性（开始，提交，回滚）</li><li>JPA抽象：提供供应商之间的标准API的Java规范</li><li>ORM框架：JPA背后的实际实现（例如，Hibernate）</li><li>JDBC：负责实际与数据库通信</li></ul><p>主要收获是，这些因素中的许多可能会影响我们的事务行为。然而，让我们专注于直接影响这种行为的特定属性组。<strong>通常，客户端可以在全局或会话级别定义这些属性</strong>。所有属性的列表很长，因此我们只会讨论其中两个关键的。然而，我们应该已经熟悉它们了。</p><h3 id="_3-2-事务管理" tabindex="-1"><a class="header-anchor" href="#_3-2-事务管理"><span>3.2. 事务管理</span></a></h3><p><strong>JDBC驱动程序从应用程序端启动事务的方式是通过关闭_autocommit_属性</strong>。它相当于_BEGIN TRANSACTION_语句，从那一刻起，所有后续语句必须被提交或回滚才能完成事务。</p><p>在全局级别定义，此属性告诉数据库将所有传入的请求视为手动事务，并要求用户提交或回滚。然而，如果用户在会话级别覆盖此定义，这将不再有效。因此，许多驱动程序默认关闭此属性，以保证一致的行为并确保应用程序控制它。</p><p>接下来，<strong>我们可以使用_transaction_属性来定义是否允许写操作</strong>。但有一个警告：即使在只读事务中，也可以操作使用_TEMPORARY_关键字创建的表。此属性也具有全局和会话范围，尽管我们通常在应用程序中处理此和其他属性时，通常在会话级别处理。</p><p>使用连接池时，由于打开连接和重用它们的性质。处理事务和连接的框架或库必须确保在开始新事务之前会话处于干净状态。</p><p>因此，可能会执行一些语句以丢弃任何剩余的待处理更改，并正确设置会话。</p><p>我们已经看到，读密集型应用程序可以利用只读事务来优化并节省我们数据库集群中的资源。但是，许多开发人员也忘记了在设置之间切换也会导致数据库的往返，影响连接的吞吐量。</p><p>在MySQL中，我们可以在全局级别定义这些属性：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">SET</span> <span class="token keyword">GLOBAL</span> <span class="token keyword">TRANSACTION</span> <span class="token keyword">READ</span> <span class="token keyword">WRITE</span><span class="token punctuation">;</span>
<span class="token keyword">SET</span> autocommit <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token comment">/* transaction */</span>
<span class="token keyword">commit</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，我们可以在会话级别设置属性：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">SET</span> <span class="token keyword">SESSION</span> <span class="token keyword">TRANSACTION</span> <span class="token keyword">READ</span> ONLY<span class="token punctuation">;</span>
<span class="token keyword">SET</span> autocommit <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token comment">/* transaction */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-提示" tabindex="-1"><a class="header-anchor" href="#_3-3-提示"><span>3.3. 提示</span></a></h3><p><strong>在只执行一个查询的事务中，启用_autocommit_属性可能会为我们节省</strong> <strong>往返次数</strong>。如果这是我们应用程序中最常见的原因，使用默认启用_autocommit_的单独只读数据源将更加有效。</p><p>现在，如果事务有更多的查询，我们应该使用显式的只读事务。创建一个只读数据源也可以通过避免在写和只读事务之间切换来帮助节省往返次数。但是，<strong>如果我们有混合工作负载，管理一个新数据源的复杂性可能不值得</strong>。</p><p>处理具有多个语句的事务时，另一个重要点是要考虑由隔离级别确定的行为，因为它可以改变我们的事务结果，可能会影响性能。为了简单起见，我们的示例中只会考虑默认值（可重复读）。</p><h2 id="_4-实践应用" tabindex="-1"><a class="header-anchor" href="#_4-实践应用"><span>4. 实践应用</span></a></h2><p>现在，从应用程序端，我们将尝试理解如何处理这些属性以及哪些层可以访问这种行为。但是，再次强调，有很多不同的方法可以做到这一点，具体取决于框架，这可能会有所变化。因此，以JPA和Spring为例，我们可以很好地理解在其他情况下会是什么样子。</p><h3 id="_4-1-jpa" tabindex="-1"><a class="header-anchor" href="#_4-1-jpa"><span>4.1. JPA</span></a></h3><p>让我们看看如何在我们的应用程序中使用JPA/Hibernate有效地定义一个只读事务：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">EntityManagerFactory</span> entityManagerFactory <span class="token operator">=</span> <span class="token class-name">Persistence</span><span class="token punctuation">.</span><span class="token function">createEntityManagerFactory</span><span class="token punctuation">(</span><span class="token string">&quot;jpa-unit&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">EntityManager</span> entityManager <span class="token operator">=</span> entityManagerFactory<span class="token punctuation">.</span><span class="token function">createEntityManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
entityManager<span class="token punctuation">.</span><span class="token function">unwrap</span><span class="token punctuation">(</span><span class="token class-name">Session</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setDefaultReadOnly</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
entityManager<span class="token punctuation">.</span><span class="token function">getTransaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
entityManager<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token class-name">Book</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
entityManager<span class="token punctuation">.</span><span class="token function">getTransaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重要的是要注意<strong>在JPA中没有定义只读事务的标准方法</strong>。因此，我们需要获取实际的Hibernate会话来将其定义为只读。</p><h3 id="_4-2-jpa-spring" tabindex="-1"><a class="header-anchor" href="#_4-2-jpa-spring"><span>4.2. JPA+Spring</span></a></h3><p>当使用Spring事务管理系统时，事情变得更加简单，如下所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Transactional</span><span class="token punctuation">(</span>readOnly <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">Book</span> <span class="token function">getBookById</span><span class="token punctuation">(</span><span class="token keyword">long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> entityManagerFactory<span class="token punctuation">.</span><span class="token function">createEntityManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token class-name">Book</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这样做，<strong>Spring承担了打开、关闭和定义事务模式的责任</strong>。然而，有时这也是不必要的，因为在使用Spring Data JPA时，我们已经有这样的配置准备好了。</p><p>Spring JPA存储库基类将所有方法标记为只读事务。通过在类级别添加此注释，可以通过仅在方法级别添加_@Transactional_来改变方法的行为。</p><p>最后，也可以在配置数据源时定义只读连接并更改_autcommit_属性。正如我们所看到的，如果我们只需要读取，这可以进一步提高应用程序的性能。数据源保存这些配置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">DataSource</span> <span class="token function">readOnlyDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">HikariConfig</span> config <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HikariConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    config<span class="token punctuation">.</span><span class="token function">setJdbcUrl</span><span class="token punctuation">(</span><span class="token string">&quot;jdbc:mysql://localhost/baeldung?useUnicode=true&amp;characterEncoding=UTF-8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    config<span class="token punctuation">.</span><span class="token function">setUsername</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    config<span class="token punctuation">.</span><span class="token function">setPassword</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    config<span class="token punctuation">.</span><span class="token function">setReadOnly</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    config<span class="token punctuation">.</span><span class="token function">setAutoCommit</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">HikariDataSource</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，这只有在我们应用程序的主要特征是单一查询资源的情况下才有意义。另外，如果使用Spring Data JPA，需要禁用Spring创建的默认事务。因此，我们只需要将_enableDefaultTransactions_属性设置为_false_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@EnableJpaRepositories</span><span class="token punctuation">(</span>enableDefaultTransactions <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@EnableTransactionManagement</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Config</span> <span class="token punctuation">{</span>
    <span class="token comment">//Definition of data sources and other persistence related beans</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从这一刻起，我们完全控制并负责在必要时添加_@Transactional(readOnly=true)_。然而，这并不是大多数应用程序的情况，所以我们不应该改变这些配置，除非我们确信我们的应用程序会从中受益。</p><h3 id="_4-3-路由语句" tabindex="-1"><a class="header-anchor" href="#_4-3-路由语句"><span>4.3. 路由语句</span></a></h3><p><strong>在更现实的场景中，我们可能有两个数据源，一个用于写入，一个用于只读</strong>。然后，我们需要在组件级别定义使用哪个数据源。<strong>这种方法更有效地处理读连接，并防止使用不必要的命令来确保会话是干净的并且有适当的设置</strong>。</p><p>有多种方法可以实现这一结果，但首先，我们需要创建一个路由数据源类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RoutingDS</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractRoutingDataSource</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">RoutingDS</span><span class="token punctuation">(</span><span class="token class-name">DataSource</span> writer<span class="token punctuation">,</span> <span class="token class-name">DataSource</span> reader<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Map</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\` dataSources <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dataSources<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;writer&quot;</span><span class="token punctuation">,</span> writer<span class="token punctuation">)</span><span class="token punctuation">;</span>
        dataSources<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;reader&quot;</span><span class="token punctuation">,</span> reader<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">setTargetDataSources</span><span class="token punctuation">(</span>dataSources<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token class-name">Object</span> <span class="token function">determineCurrentLookupKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">ReadOnlyContext</span><span class="token punctuation">.</span><span class="token function">isReadOnly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token string">&quot;reader&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;writer&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还有更多关于路由数据源的知识。然而，总结起来，在我们的案例中，这个类将在应用程序请求时返回适当的数据源。为此，我们使用_ReadOnlyContent_类，它将在运行时保存数据源上下文：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ReadOnlyContext</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">ThreadLocal</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">AtomicInteger</span><span class="token punctuation">&gt;</span></span>\` <span class="token constant">READ_ONLY_LEVEL</span> <span class="token operator">=</span> <span class="token class-name">ThreadLocal</span><span class="token punctuation">.</span><span class="token function">withInitial</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">AtomicInteger</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 默认构造函数</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isReadOnly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token constant">READ_ONLY_LEVEL</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">enter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token constant">READ_ONLY_LEVEL</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">incrementAndGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">exit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token constant">READ_ONLY_LEVEL</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">decrementAndGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们需要定义这些数据源并将它们注册到Spring上下文中。为此，我们只需要使用之前创建的_RoutingDS_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">//之前提到的注释</span>
<span class="token keyword">public</span> <span class="token class-name">Config</span> <span class="token punctuation">{</span>

    <span class="token comment">//其他bean...</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSource</span> <span class="token function">routingDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RoutingDS</span><span class="token punctuation">(</span>
            <span class="token function">dataSource</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token function">dataSource</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">DataSource</span> <span class="token function">dataSource</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> readOnly<span class="token punctuation">,</span> <span class="token keyword">boolean</span> isAutoCommit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">HikariConfig</span> config <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HikariConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        config<span class="token punctuation">.</span><span class="token function">setJdbcUrl</span><span class="token punctuation">(</span><span class="token string">&quot;jdbc:mysql://localhost/baeldung?useUnicode=true&amp;characterEncoding=UTF-8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        config<span class="token punctuation">.</span><span class="token function">setUsername</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        config<span class="token punctuation">.</span><span class="token function">setPassword</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        config<span class="token punctuation">.</span><span class="token function">setReadOnly</span><span class="token punctuation">(</span>readOnly<span class="token punctuation">)</span><span class="token punctuation">;</span>
        config<span class="token punctuation">.</span><span class="token function">setAutoCommit</span><span class="token punctuation">(</span>isAutoCommit<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">HikariDataSource</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//其他bean...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>几乎完成了——现在，<strong>让我们创建一个注解来告诉Spring何时将组件包装在只读上下文中</strong>。为此，我们将使用_@ReaderDS_注解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Inherited</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">ReaderDS</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们使用AOP将组件执行包装在上下文中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Aspect</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ReadOnlyInterception</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Around</span><span class="token punctuation">(</span><span class="token string">&quot;@annotation(com.baeldung.readonlytransactions.mysql.spring.ReaderDS)&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">aroundMethod</span><span class="token punctuation">(</span><span class="token class-name">ProceedingJoinPoint</span> joinPoint<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">ReadOnlyContext</span><span class="token punctuation">.</span><span class="token function">enter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> joinPoint<span class="token punctuation">.</span><span class="token function">proceed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token class-name">ReadOnlyContext</span><span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通常，我们希望尽可能在最高级别的点添加注解。不过，为了简单起见，我们将在存储库层添加注解，并且组件中只有一个查询：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BookRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BookEntity</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>\` <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@ReaderDS</span>
    <span class="token annotation punctuation">@Query</span><span class="token punctuation">(</span><span class="token string">&quot;Select t from BookEntity t where t.id = ?1&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">BookEntity</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>正如我们所观察到的，这种设置允许我们通过利用整个只读事务并避免会话上下文切换，更有效地处理只读操作</strong>。因此，这可以显著提高我们应用程序的吞吐量和响应性。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了只读事务及其好处。我们还了解了MySQL InnoDB引擎如何处理它们以及如何配置影响我们应用程序事务的主要属性。此外，我们还讨论了通过使用专用资源（如专用数据源）进行额外改进的可能性。像往常一样，本文中使用的所有代码示例都可以在GitHub上找到。</p>`,67),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-18-Using Transactions for Read Only Operations.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Using%20Transactions%20for%20Read%20Only%20Operations.html","title":"使用事务进行只读操作","lang":"zh-CN","frontmatter":{"date":"2022-05-01T00:00:00.000Z","category":["Spring","Transactions"],"tag":["MySQL","InnoDB","Read-Only"],"head":[["meta",{"name":"keywords","content":"Spring, Transactions, MySQL, InnoDB, Read-Only"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Using%20Transactions%20for%20Read%20Only%20Operations.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用事务进行只读操作"}],["meta",{"property":"og:description","content":"使用事务进行只读操作 1. 概述 在本文中，我们将讨论只读事务。我们将讨论它们的目的以及如何使用它们，并检查与性能和优化相关的一些细微差别。为了简单起见，我们将重点关注MySQL的InnoDB引擎。但请记住，根据数据库/存储引擎的不同，一些信息可能会有所变化。 2. 什么是事务？ 事务是一个原子操作，由一个或多个语句组成。它是原子的，因为该操作中的所有..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T14:10:15.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"MySQL"}],["meta",{"property":"article:tag","content":"InnoDB"}],["meta",{"property":"article:tag","content":"Read-Only"}],["meta",{"property":"article:published_time","content":"2022-05-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T14:10:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用事务进行只读操作\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-05-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T14:10:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用事务进行只读操作 1. 概述 在本文中，我们将讨论只读事务。我们将讨论它们的目的以及如何使用它们，并检查与性能和优化相关的一些细微差别。为了简单起见，我们将重点关注MySQL的InnoDB引擎。但请记住，根据数据库/存储引擎的不同，一些信息可能会有所变化。 2. 什么是事务？ 事务是一个原子操作，由一个或多个语句组成。它是原子的，因为该操作中的所有..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 什么是事务？","slug":"_2-什么是事务","link":"#_2-什么是事务","children":[{"level":3,"title":"2.1. 隔离级别","slug":"_2-1-隔离级别","link":"#_2-1-隔离级别","children":[]}]},{"level":2,"title":"3. 为什么以及在哪里使用事务？","slug":"_3-为什么以及在哪里使用事务","link":"#_3-为什么以及在哪里使用事务","children":[{"level":3,"title":"3.1. 应用程序与数据库","slug":"_3-1-应用程序与数据库","link":"#_3-1-应用程序与数据库","children":[]},{"level":3,"title":"3.2. 事务管理","slug":"_3-2-事务管理","link":"#_3-2-事务管理","children":[]},{"level":3,"title":"3.3. 提示","slug":"_3-3-提示","link":"#_3-3-提示","children":[]}]},{"level":2,"title":"4. 实践应用","slug":"_4-实践应用","link":"#_4-实践应用","children":[{"level":3,"title":"4.1. JPA","slug":"_4-1-jpa","link":"#_4-1-jpa","children":[]},{"level":3,"title":"4.2. JPA+Spring","slug":"_4-2-jpa-spring","link":"#_4-2-jpa-spring","children":[]},{"level":3,"title":"4.3. 路由语句","slug":"_4-3-路由语句","link":"#_4-3-路由语句","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721311815000,"updatedTime":1721311815000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":10.5,"words":3151},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Using Transactions for Read Only Operations.md","localizedDate":"2022年5月1日","excerpt":"<hr>\\n<h1>使用事务进行只读操作</h1>\\n<h2>1. 概述</h2>\\n<p>在本文中，我们将讨论只读事务。我们将讨论它们的目的以及如何使用它们，并检查与性能和优化相关的一些细微差别。<strong>为了简单起见，我们将重点关注MySQL的InnoDB引擎</strong>。但请记住，根据数据库/存储引擎的不同，一些信息可能会有所变化。</p>\\n<h2>2. 什么是事务？</h2>\\n<p><strong>事务是一个原子操作，由一个或多个语句组成</strong>。它是原子的，因为该操作中的所有语句要么全部成功（被提交），要么全部失败（被回滚），这意味着全有或全无。事务的原子性由ACID属性中的字母‘A’表示。</p>","autoDesc":true}');export{d as comp,k as data};
