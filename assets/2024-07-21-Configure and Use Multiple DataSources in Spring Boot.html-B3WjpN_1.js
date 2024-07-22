import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BMOUrRO4.js";const e={},p=t(`<hr><h1 id="spring-boot中配置和使用多个数据源" tabindex="-1"><a class="header-anchor" href="#spring-boot中配置和使用多个数据源"><span>Spring Boot中配置和使用多个数据源</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Spring Boot应用程序的典型场景是将数据存储在单个关系型数据库中。但有时我们需要访问多个数据库。</p><p>在本教程中，我们将学习如何在Spring Boot中配置和使用多个数据源。</p><p>要了解如何处理单个数据源，请查看我们对Spring Data JPA的介绍。</p><h2 id="_2-默认行为" tabindex="-1"><a class="header-anchor" href="#_2-默认行为"><span>2. 默认行为</span></a></h2><p>让我们回顾一下在Spring Boot中声明数据源在_application.yml_中的样子：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">url</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
    <span class="token key atrule">username</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
    <span class="token key atrule">driverClassname</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在内部，Spring将这些设置映射到_org.springframework.boot.autoconfigure.jdbc.DataSourceProperties_的一个实例。</p><p>让我们看看实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">&quot;spring.datasource&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DataSourceProperties</span> <span class="token keyword">implements</span> <span class="token class-name">BeanClassLoaderAware</span><span class="token punctuation">,</span> <span class="token class-name">InitializingBean</span> <span class="token punctuation">{</span>

    <span class="token comment">// ...</span>

    <span class="token doc-comment comment">/**
     * JDBC驱动程序的完全限定名称。默认情况下根据URL自动检测。
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> driverClassName<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 数据库的JDBC URL。
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> url<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 数据库的登录用户名。
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 数据库的登录密码。
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span>

    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该指出_@ConfigurationProperties_注解，它自动将配置属性映射到Java对象。</p><h2 id="_3-扩展默认设置" tabindex="-1"><a class="header-anchor" href="#_3-扩展默认设置"><span>3. 扩展默认设置</span></a></h2><p>因此，要使用多个数据源，我们需要在Spring的应用程序上下文中声明具有不同映射的多个bean。</p><p>我们可以通过使用配置类来实现这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TodoDatasourceConfiguration</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span><span class="token string">&quot;spring.datasource.todos&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSourceProperties</span> <span class="token function">todosDataSourceProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DataSourceProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TopicDatasourceConfiguration</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span><span class="token string">&quot;spring.datasource.topics&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSourceProperties</span> <span class="token function">topicsDataSourceProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DataSourceProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>数据源的配置必须如下所示：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">todos</span><span class="token punctuation">:</span>
      <span class="token key atrule">url</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
      <span class="token key atrule">username</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
      <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
      <span class="token key atrule">driverClassName</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
    <span class="token key atrule">topics</span><span class="token punctuation">:</span>
      <span class="token key atrule">url</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
      <span class="token key atrule">username</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
      <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
      <span class="token key atrule">driverClassName</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们可以使用_DataSourceProperties_对象来创建数据源：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">DataSource</span> <span class="token function">todosDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">todosDataSourceProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">initializeDataSourceBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">DataSource</span> <span class="token function">topicsDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">topicsDataSourceProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">initializeDataSourceBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-spring-data-jdbc" tabindex="-1"><a class="header-anchor" href="#_4-spring-data-jdbc"><span>4. Spring Data JDBC</span></a></h2><p>当使用Spring Data JDBC时，我们还需要为每个_DataSource_配置一个_JdbcTemplate_实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">JdbcTemplate</span> <span class="token function">todosJdbcTemplate</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">&quot;todosDataSource&quot;</span><span class="token punctuation">)</span> <span class="token class-name">DataSource</span> dataSource<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">JdbcTemplate</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">JdbcTemplate</span> <span class="token function">topicsJdbcTemplate</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">&quot;topicsDataSource&quot;</span><span class="token punctuation">)</span> <span class="token class-name">DataSource</span> dataSource<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">JdbcTemplate</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们也可以通过指定_@Qualifier_来使用它们：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">&quot;topicsJdbcTemplate&quot;</span><span class="token punctuation">)</span>
<span class="token class-name">JdbcTemplate</span> jdbcTemplate<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-spring-data-jpa" tabindex="-1"><a class="header-anchor" href="#_5-spring-data-jpa"><span>5. Spring Data JPA</span></a></h2><p>当使用Spring Data JPA时，我们希望使用如下所示的存储库，其中_Todo_是实体：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">TodoRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Todo</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>\` <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因此，我们需要为每个数据源声明_EntityManager_工厂：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@EnableTransactionManagement</span>
<span class="token annotation punctuation">@EnableJpaRepositories</span><span class="token punctuation">(</span>
  basePackageClasses <span class="token operator">=</span> <span class="token class-name">Todo</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>
  entityManagerFactoryRef <span class="token operator">=</span> <span class="token string">&quot;todosEntityManagerFactory&quot;</span><span class="token punctuation">,</span>
  transactionManagerRef <span class="token operator">=</span> <span class="token string">&quot;todosTransactionManager&quot;</span>
<span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TodoJpaConfiguration</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">LocalContainerEntityManagerFactoryBean</span> <span class="token function">todosEntityManagerFactory</span><span class="token punctuation">(</span>
      <span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">&quot;todosDataSource&quot;</span><span class="token punctuation">)</span> <span class="token class-name">DataSource</span> dataSource<span class="token punctuation">,</span>
      <span class="token class-name">EntityManagerFactoryBuilder</span> builder<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> builder
          <span class="token punctuation">.</span><span class="token function">dataSource</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">packages</span><span class="token punctuation">(</span><span class="token class-name">Todo</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">PlatformTransactionManager</span> <span class="token function">todosTransactionManager</span><span class="token punctuation">(</span>
      <span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">&quot;todosEntityManagerFactory&quot;</span><span class="token punctuation">)</span> <span class="token class-name">LocalContainerEntityManagerFactoryBean</span> todosEntityManagerFactory<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">JpaTransactionManager</span><span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">requireNonNull</span><span class="token punctuation">(</span>todosEntityManagerFactory<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>让我们看看一些我们应该意识到的限制。</strong></p><p>我们需要分割包，以允许每个数据源使用一个_@EnableJpaRepositories_。</p><p>不幸的是，要获取_EntityManagerFactoryBuilder_注入，我们需要将其中一个数据源声明为_@Primary_。</p><p>这是因为_EntityManagerFactoryBuilder_在_org.springframework.boot.autoconfigure.orm.jpa.JpaBaseConfiguration_中声明，这个类需要注入一个单一的数据源。通常，框架的某些部分可能不会预期配置了多个数据源。</p><h2 id="_6-配置hikari连接池" tabindex="-1"><a class="header-anchor" href="#_6-配置hikari连接池"><span>6. 配置Hikari连接池</span></a></h2><p>如果我们想要配置Hikari，我们只需要在数据源定义中添加一个_@ConfigurationProperties_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span><span class="token string">&quot;spring.datasource.todos.hikari&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">DataSource</span> <span class="token function">todosDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">todosDataSourceProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">initializeDataSourceBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们可以将以下行插入到_application.properties_文件中：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">spring.datasource.todos.hikari.connectionTimeout</span><span class="token punctuation">=</span><span class="token value attr-value">30000</span>
<span class="token key attr-name">spring.datasource.todos.hikari.idleTimeout</span><span class="token punctuation">=</span><span class="token value attr-value">600000</span>
<span class="token key attr-name">spring.datasource.todos.hikari.maxLifetime</span><span class="token punctuation">=</span><span class="token value attr-value">1800000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们学习了如何在Spring Boot中配置多个数据源。</p><p>我们看到需要一些配置，并且当偏离标准时可能会有陷阱，但最终这是可能的。</p><p>像往常一样，所有的代码都可以在GitHub上找到。</p>`,44),o=[p];function i(c,l){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","2024-07-21-Configure and Use Multiple DataSources in Spring Boot.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-Configure%20and%20Use%20Multiple%20DataSources%20in%20Spring%20Boot.html","title":"Spring Boot中配置和使用多个数据源","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Boot","数据源"],"tag":["Spring Boot","多数据源","数据库配置"],"head":[["meta",{"name":"keywords","content":"Spring Boot, 多数据源, 数据库配置"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-Configure%20and%20Use%20Multiple%20DataSources%20in%20Spring%20Boot.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Boot中配置和使用多个数据源"}],["meta",{"property":"og:description","content":"Spring Boot中配置和使用多个数据源 1. 概述 Spring Boot应用程序的典型场景是将数据存储在单个关系型数据库中。但有时我们需要访问多个数据库。 在本教程中，我们将学习如何在Spring Boot中配置和使用多个数据源。 要了解如何处理单个数据源，请查看我们对Spring Data JPA的介绍。 2. 默认行为 让我们回顾一下在Sp..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T21:39:42.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"多数据源"}],["meta",{"property":"article:tag","content":"数据库配置"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T21:39:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Boot中配置和使用多个数据源\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T21:39:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Boot中配置和使用多个数据源 1. 概述 Spring Boot应用程序的典型场景是将数据存储在单个关系型数据库中。但有时我们需要访问多个数据库。 在本教程中，我们将学习如何在Spring Boot中配置和使用多个数据源。 要了解如何处理单个数据源，请查看我们对Spring Data JPA的介绍。 2. 默认行为 让我们回顾一下在Sp..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 默认行为","slug":"_2-默认行为","link":"#_2-默认行为","children":[]},{"level":2,"title":"3. 扩展默认设置","slug":"_3-扩展默认设置","link":"#_3-扩展默认设置","children":[]},{"level":2,"title":"4. Spring Data JDBC","slug":"_4-spring-data-jdbc","link":"#_4-spring-data-jdbc","children":[]},{"level":2,"title":"5. Spring Data JPA","slug":"_5-spring-data-jpa","link":"#_5-spring-data-jpa","children":[]},{"level":2,"title":"6. 配置Hikari连接池","slug":"_6-配置hikari连接池","link":"#_6-配置hikari连接池","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1721597982000,"updatedTime":1721597982000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.98,"words":895},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-Configure and Use Multiple DataSources in Spring Boot.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Spring Boot中配置和使用多个数据源</h1>\\n<h2>1. 概述</h2>\\n<p>Spring Boot应用程序的典型场景是将数据存储在单个关系型数据库中。但有时我们需要访问多个数据库。</p>\\n<p>在本教程中，我们将学习如何在Spring Boot中配置和使用多个数据源。</p>\\n<p>要了解如何处理单个数据源，请查看我们对Spring Data JPA的介绍。</p>\\n<h2>2. 默认行为</h2>\\n<p>让我们回顾一下在Spring Boot中声明数据源在_application.yml_中的样子：</p>\\n<div class=\\"language-yaml\\" data-ext=\\"yml\\" data-title=\\"yml\\"><pre class=\\"language-yaml\\"><code><span class=\\"token key atrule\\">spring</span><span class=\\"token punctuation\\">:</span>\\n  <span class=\\"token key atrule\\">datasource</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token key atrule\\">url</span><span class=\\"token punctuation\\">:</span> <span class=\\"token punctuation\\">...</span>\\n    <span class=\\"token key atrule\\">username</span><span class=\\"token punctuation\\">:</span> <span class=\\"token punctuation\\">...</span>\\n    <span class=\\"token key atrule\\">password</span><span class=\\"token punctuation\\">:</span> <span class=\\"token punctuation\\">...</span>\\n    <span class=\\"token key atrule\\">driverClassname</span><span class=\\"token punctuation\\">:</span> <span class=\\"token punctuation\\">...</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
