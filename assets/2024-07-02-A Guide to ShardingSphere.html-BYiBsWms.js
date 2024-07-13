import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-BDZ-trJf.js";const t={},p=e(`<h1 id="apache-shardingsphere-使用指南" tabindex="-1"><a class="header-anchor" href="#apache-shardingsphere-使用指南"><span>Apache ShardingSphere 使用指南</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Apache ShardingSphere 是一个开源项目，由一套集成的数据加工工具组成。它提供了分布式数据库解决方案、事务管理、治理等一套功能。</p><p>本教程将提供这个生态系统的快速概览以及入门指南。</p><h2 id="_2-shardingsphere-是什么" tabindex="-1"><a class="header-anchor" href="#_2-shardingsphere-是什么"><span>2. ShardingSphere 是什么？</span></a></h2><p><strong>Apache ShardingSphere，最初被称为 Sharding-JDBC，是为了解决 Java 应用程序的数据分片问题而创建的。</strong> 然而，现在它已经扩展为包括代理、边车以及处理分片之外的更多工具的一套工具。</p><p>在考虑使用 ShardingSphere 时，了解这样一个项目为我们的解决方案带来哪些优势非常重要。以下是一些关键点：</p><ul><li>性能：鉴于项目的成熟度，驱动程序在效率和性能方面接近原生 JDBC</li><li>兼容性：驱动程序可以连接到任何实现 JDBC 规范的数据库；除此之外，代理可以被任何使用 MySQL 和 PostgreSQL 的应用程序使用</li><li>零业务侵入：无业务影响的故障转移</li><li>低运维和维护成本：快速学习曲线，并且对当前堆栈的干预保持最小</li><li>安全性和稳定性：在确保两者的同时增加额外的能力</li><li>弹性扩展：仅扩展</li><li>开放生态系统：提供出色的灵活性</li></ul><h2 id="_3-使用案例" tabindex="-1"><a class="header-anchor" href="#_3-使用案例"><span>3. 使用案例</span></a></h2><p>现在让我们更深入地了解这些功能，并简要描述每个使用案例在 ShardingSphere 的背景下。</p><h3 id="_3-1-分片" tabindex="-1"><a class="header-anchor" href="#_3-1-分片"><span>3.1. 分片</span></a></h3><p><strong>分片是将数据库拆分成称为分片的较小部分，分布在多个服务器上的做法。</strong> ShardingSphere 简化了这一过程，允许开发人员更有效地分发他们的数据，提高了应用程序的性能和可扩展性。</p><h3 id="_3-2-分布式事务" tabindex="-1"><a class="header-anchor" href="#_3-2-分布式事务"><span>3.2. 分布式事务</span></a></h3><p>在分布式系统中，事务可能需要在多个数据库上修改数据。<strong>ShardingSphere 提供了一种管理这些分布式事务的机制，确保所有涉及的数据库中的数据一致性。</strong></p><h3 id="_3-3-读写分离" tabindex="-1"><a class="header-anchor" href="#_3-3-读写分离"><span>3.3. 读写分离</span></a></h3><p>这是一种通过将读写操作指向不同的数据库来优化数据库访问的方法。<strong>ShardingSphere 可以自动将读操作路由到副本数据库，将写操作路由到主数据库，从而平衡负载并提高系统的整体性能。</strong></p><h3 id="_3-4-数据库网关" tabindex="-1"><a class="header-anchor" href="#_3-4-数据库网关"><span>3.4. 数据库网关</span></a></h3><p>ShardingSphere 充当数据库网关，将多个数据库的复杂性抽象为应用程序的统一数据接口。<strong>这允许开发人员像与单个实体交互一样与各种数据库交互，简化了数据库管理。</strong></p><h3 id="_3-5-流量治理" tabindex="-1"><a class="header-anchor" href="#_3-5-流量治理"><span>3.5. 流量治理</span></a></h3><p>ShardingSphere 允许对系统中的数据流量进行细粒度控制。<strong>它提供了数据分片、读写分离等功能，可以有效地在各种资源之间分配流量负载。</strong></p><h3 id="_3-6-数据迁移" tabindex="-1"><a class="header-anchor" href="#_3-6-数据迁移"><span>3.6. 数据迁移</span></a></h3><p>ShardingSphere 提供了在分片或数据库之间迁移数据的支持。<strong>它帮助在通过添加或删除数据库节点来扩展系统时平滑地重新分配数据。</strong></p><h3 id="_3-7-加密" tabindex="-1"><a class="header-anchor" href="#_3-7-加密"><span>3.7. 加密</span></a></h3><p><strong>ShardingSphere 支持在将数据保存到数据库之前自动加密数据，提供了额外的安全层。</strong> 这在处理敏感数据时特别有用，例如用户密码或个人可识别信息。</p><h3 id="_3-8-数据掩码" tabindex="-1"><a class="header-anchor" href="#_3-8-数据掩码"><span>3.8. 数据掩码</span></a></h3><p>数据掩码是使用修改后的内容（字符或其他数据）隐藏原始数据的过程。ShardingSphere 支持数据掩码，这在非生产环境中确保数据隐私至关重要。</p><h3 id="_3-9-影子" tabindex="-1"><a class="header-anchor" href="#_3-9-影子"><span>3.9. 影子</span></a></h3><p><strong>ShardingSphere 中的 Shadow 功能允许您测试数据库更新、新的 SQL 语句和索引的影响，而不影响实际的生产环境。</strong> 这是通过将某些流量并行路由到实际数据库的影子数据库来完成的。</p><h3 id="_3-10-可观察性" tabindex="-1"><a class="header-anchor" href="#_3-10-可观察性"><span>3.10. 可观察性</span></a></h3><p><strong>ShardingSphere 提供了一种监控分片数据库健康和性能的机制。</strong> 它支持查询跟踪、延迟跟踪、流量洞察等指标，使开发人员能够实时观察和诊断问题。</p><h2 id="_4-入门" tabindex="-1"><a class="header-anchor" href="#_4-入门"><span>4. 入门</span></a></h2><p>为了介绍这项技术并开始熟悉它，让我们以使用 Maven 的 Spring Boot 应用程序为例。</p><p>正如所提到的，项目中有多种功能可用。因此，为了保持简单，我们现在只使用分片功能。这样做让我们知道如何配置并集成解决方案到我们的示例应用程序中。</p><h3 id="_4-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_4-1-依赖项"><span>4.1. 依赖项</span></a></h3><p><strong>第一步是将最新项目依赖项添加到我们的 <em>pom.xml</em> 文件中：</strong></p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.apache.shardingsphere\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`shardingsphere-jdbc-core\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`5.4.0\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这使我们能够开始配置我们的数据源以使用 ShardingSphere。</p><h3 id="_4-2-数据源配置" tabindex="-1"><a class="header-anchor" href="#_4-2-数据源配置"><span>4.2. 数据源配置</span></a></h3><p>现在我们已经拥有了所需的依赖项，我们必须配置我们的数据源以使用 ShardingSphere JDBC 驱动程序。<strong>在这里，我们必须定义我们想要使用的功能，在本例中，是分片功能。</strong></p><p>我们的 <em>Order</em> 表的数据将根据 <em>order_id</em> 字段的模数分布在两个 MySQL 实例上。<strong>为此，我们将创建一个 <em>sharding.yml</em> 文件来保存必要的配置，并将其放在我们的资源文件夹中：</strong></p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">dataSources</span><span class="token punctuation">:</span>
  <span class="token key atrule">ds0</span><span class="token punctuation">:</span>
    <span class="token key atrule">dataSourceClassName</span><span class="token punctuation">:</span> com.zaxxer.hikari.HikariDataSource
    <span class="token key atrule">driverClassName</span><span class="token punctuation">:</span> com.mysql.jdbc.Driver
    <span class="token key atrule">jdbcUrl</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>13306/ds0<span class="token punctuation">?</span>serverTimezone=UTC<span class="token important">&amp;useSSL=false&amp;useUnicode=true&amp;characterEncoding=UTF-</span><span class="token number">8</span>
    <span class="token key atrule">username</span><span class="token punctuation">:</span> test
    <span class="token key atrule">password</span><span class="token punctuation">:</span> test
  <span class="token key atrule">ds1</span><span class="token punctuation">:</span>
    <span class="token key atrule">dataSourceClassName</span><span class="token punctuation">:</span> com.zaxxer.hikari.HikariDataSource
    <span class="token key atrule">driverClassName</span><span class="token punctuation">:</span> com.mysql.jdbc.Driver
    <span class="token key atrule">jdbcUrl</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>13307/ds1<span class="token punctuation">?</span>serverTimezone=UTC<span class="token important">&amp;useSSL=false&amp;useUnicode=true&amp;characterEncoding=UTF-</span><span class="token number">8</span>
    <span class="token key atrule">username</span><span class="token punctuation">:</span> test
    <span class="token key atrule">password</span><span class="token punctuation">:</span> test
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token tag">!SHARDING</span>
    <span class="token key atrule">tables</span><span class="token punctuation">:</span>
      <span class="token key atrule">order</span><span class="token punctuation">:</span>
        <span class="token key atrule">actualDataNodes</span><span class="token punctuation">:</span> ds$<span class="token punctuation">{</span>0..1<span class="token punctuation">}</span>.order
    <span class="token key atrule">defaultDatabaseStrategy</span><span class="token punctuation">:</span>
      <span class="token key atrule">standard</span><span class="token punctuation">:</span>
        <span class="token key atrule">shardingColumn</span><span class="token punctuation">:</span> order_id
        <span class="token key atrule">shardingAlgorithmName</span><span class="token punctuation">:</span> database_inline
    <span class="token key atrule">defaultTableStrategy</span><span class="token punctuation">:</span>
      <span class="token key atrule">none</span><span class="token punctuation">:</span>
    <span class="token key atrule">shardingAlgorithms</span><span class="token punctuation">:</span>
      <span class="token key atrule">database_inline</span><span class="token punctuation">:</span>
        <span class="token key atrule">type</span><span class="token punctuation">:</span> INLINE
        <span class="token key atrule">props</span><span class="token punctuation">:</span>
          <span class="token key atrule">algorithm-expression</span><span class="token punctuation">:</span> ds$<span class="token punctuation">{</span>order_id % 2<span class="token punctuation">}</span>
<span class="token key atrule">props</span><span class="token punctuation">:</span>
  <span class="token key atrule">sql-show</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们需要配置 JPA 以使用这些设置。</p><h3 id="_4-3-jpa-配置" tabindex="-1"><a class="header-anchor" href="#_4-3-jpa-配置"><span>4.3. JPA 配置</span></a></h3><p>现在，我们需要将我们的 JPA/Spring Data 设置连接到我们的 ShardingSphere 数据源。<strong>现在让我们调整我们的 <em>application.yml</em> 以使用刚刚提到的配置：</strong></p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> org.apache.shardingsphere.driver.ShardingSphereDriver
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>shardingsphere<span class="token punctuation">:</span>classpath<span class="token punctuation">:</span>sharding.yml
  <span class="token key atrule">jpa</span><span class="token punctuation">:</span>
    <span class="token key atrule">properties</span><span class="token punctuation">:</span>
      <span class="token key atrule">hibernate</span><span class="token punctuation">:</span>
        <span class="token key atrule">dialect</span><span class="token punctuation">:</span> org.hibernate.dialect.MySQL8Dialect
        <span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于其余部分，我们的应用程序应该遵循默认的 Spring Data JPA 模式，通过定义我们的实体和仓库。例如，在本例中，我们可以考虑以下类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;order&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Order</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;order_id&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> orderId<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;customer_id&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> customerId<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;total_price&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">BigDecimal</span> totalPrice<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Enumerated</span><span class="token punctuation">(</span><span class="token class-name">EnumType</span><span class="token punctuation">.</span><span class="token constant">STRING</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;order_status&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Status</span> orderStatus<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;order_date&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">LocalDate</span> orderDate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;delivery_address&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> deliveryAddress<span class="token punctuation">;</span>

    <span class="token comment">// ... getter and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是我们的 <em>Order</em> 类的映射，接下来我们也可以看到它相应的仓库：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">OrderRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>\` <span class="token punctuation">{</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正如我们所观察到的，标准的 Spring JPA。此时不需要其他代码更改。</p><h2 id="_5-连接点" tabindex="-1"><a class="header-anchor" href="#_5-连接点"><span>5. 连接点</span></a></h2><p>通过最小的更改，ShardingSphere 使我们能够对我们的表应用分片策略。然而，应用程序中不需要进行重大更改。实际上，只需要在持久层进行配置更改即可。</p><p><strong>得益于 ShardingSphere 与 JDBC 驱动程序的出色集成，我们的应用程序可以利用高级功能，而几乎不需要代码更改。</strong></p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们迈出了使用 ShardingSphere 的第一步。ShardingSphere 是一个强大的工具，用于管理和操作分布式系统中的数据库，它提供了广泛的高级功能，但抽象了相当多的复杂性。</p><p>像往常一样，本文中使用的所有代码示例都可以在 GitHub 上找到。</p>`,56),l=[p];function i(c,o){return s(),a("div",null,l)}const u=n(t,[["render",i],["__file","2024-07-02-A Guide to ShardingSphere.html.vue"]]),h=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-A%20Guide%20to%20ShardingSphere.html","title":"Apache ShardingSphere 使用指南","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Database"],"tag":["ShardingSphere","Database Sharding"],"head":[["meta",{"name":"keywords","content":"Java, Database, ShardingSphere, Database Sharding"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-A%20Guide%20to%20ShardingSphere.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Apache ShardingSphere 使用指南"}],["meta",{"property":"og:description","content":"Apache ShardingSphere 使用指南 1. 概述 Apache ShardingSphere 是一个开源项目，由一套集成的数据加工工具组成。它提供了分布式数据库解决方案、事务管理、治理等一套功能。 本教程将提供这个生态系统的快速概览以及入门指南。 2. ShardingSphere 是什么？ Apache ShardingSphere，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T15:31:43.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"ShardingSphere"}],["meta",{"property":"article:tag","content":"Database Sharding"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T15:31:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Apache ShardingSphere 使用指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T15:31:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Apache ShardingSphere 使用指南 1. 概述 Apache ShardingSphere 是一个开源项目，由一套集成的数据加工工具组成。它提供了分布式数据库解决方案、事务管理、治理等一套功能。 本教程将提供这个生态系统的快速概览以及入门指南。 2. ShardingSphere 是什么？ Apache ShardingSphere，..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. ShardingSphere 是什么？","slug":"_2-shardingsphere-是什么","link":"#_2-shardingsphere-是什么","children":[]},{"level":2,"title":"3. 使用案例","slug":"_3-使用案例","link":"#_3-使用案例","children":[{"level":3,"title":"3.1. 分片","slug":"_3-1-分片","link":"#_3-1-分片","children":[]},{"level":3,"title":"3.2. 分布式事务","slug":"_3-2-分布式事务","link":"#_3-2-分布式事务","children":[]},{"level":3,"title":"3.3. 读写分离","slug":"_3-3-读写分离","link":"#_3-3-读写分离","children":[]},{"level":3,"title":"3.4. 数据库网关","slug":"_3-4-数据库网关","link":"#_3-4-数据库网关","children":[]},{"level":3,"title":"3.5. 流量治理","slug":"_3-5-流量治理","link":"#_3-5-流量治理","children":[]},{"level":3,"title":"3.6. 数据迁移","slug":"_3-6-数据迁移","link":"#_3-6-数据迁移","children":[]},{"level":3,"title":"3.7. 加密","slug":"_3-7-加密","link":"#_3-7-加密","children":[]},{"level":3,"title":"3.8. 数据掩码","slug":"_3-8-数据掩码","link":"#_3-8-数据掩码","children":[]},{"level":3,"title":"3.9. 影子","slug":"_3-9-影子","link":"#_3-9-影子","children":[]},{"level":3,"title":"3.10. 可观察性","slug":"_3-10-可观察性","link":"#_3-10-可观察性","children":[]}]},{"level":2,"title":"4. 入门","slug":"_4-入门","link":"#_4-入门","children":[{"level":3,"title":"4.1. 依赖项","slug":"_4-1-依赖项","link":"#_4-1-依赖项","children":[]},{"level":3,"title":"4.2. 数据源配置","slug":"_4-2-数据源配置","link":"#_4-2-数据源配置","children":[]},{"level":3,"title":"4.3. JPA 配置","slug":"_4-3-jpa-配置","link":"#_4-3-jpa-配置","children":[]}]},{"level":2,"title":"5. 连接点","slug":"_5-连接点","link":"#_5-连接点","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719934303000,"updatedTime":1719934303000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.21,"words":1864},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-A Guide to ShardingSphere.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>Apache ShardingSphere 是一个开源项目，由一套集成的数据加工工具组成。它提供了分布式数据库解决方案、事务管理、治理等一套功能。</p>\\n<p>本教程将提供这个生态系统的快速概览以及入门指南。</p>\\n<h2>2. ShardingSphere 是什么？</h2>\\n<p><strong>Apache ShardingSphere，最初被称为 Sharding-JDBC，是为了解决 Java 应用程序的数据分片问题而创建的。</strong> 然而，现在它已经扩展为包括代理、边车以及处理分片之外的更多工具的一套工具。</p>\\n<p>在考虑使用 ShardingSphere 时，了解这样一个项目为我们的解决方案带来哪些优势非常重要。以下是一些关键点：</p>","autoDesc":true}');export{u as comp,h as data};
