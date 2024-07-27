import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CBerKIce.js";const p={},e=t(`<hr><h1 id="通过jdbc连接到特定模式" tabindex="-1"><a class="header-anchor" href="#通过jdbc连接到特定模式"><span>通过JDBC连接到特定模式</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本文中，我们将涵盖数据库模式的基础知识，为什么我们需要它们，以及它们是如何有用的。之后，我们将专注于使用PostgreSQL数据库的JDBC中设置模式的实际示例。</p><h2 id="_2-数据库模式是什么" tabindex="-1"><a class="header-anchor" href="#_2-数据库模式是什么"><span>2. 数据库模式是什么</span></a></h2><p>一般来说，数据库模式是一组规则，它规范了数据库。它是数据库的额外抽象层。有两种模式：</p><ol><li>逻辑数据库模式定义了适用于数据库中存储数据的规则。</li><li>物理数据库模式定义了数据在存储系统上如何物理存储的规则。</li></ol><p>在PostgreSQL中，模式指的是第一种。<strong>模式是一个逻辑命名空间，包含数据库对象，如表、视图、索引等。</strong> 每个模式属于一个数据库，每个数据库至少有一个模式。如果没有特别指定，PostgreSQL中的默认模式是public。我们创建的每个数据库对象，如果没有指定模式，都属于public模式。</p><p>PostgreSQL中的模式允许我们将表和视图组织成组，使它们更易于管理。这样，我们可以在更细粒度的级别上设置数据库对象的权限。此外，模式允许多个用户同时使用相同的数据库而不互相干扰。</p><h2 id="_3-如何在postgresql中使用模式" tabindex="-1"><a class="header-anchor" href="#_3-如何在postgresql中使用模式"><span>3. 如何在PostgreSQL中使用模式</span></a></h2><p>要访问数据库模式的对象，我们必须在要使用的对象名称之前指定模式的名称。例如，要查询模式store中的product表，我们需要使用表的限定名称：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> store<span class="token punctuation">.</span>product<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>建议避免硬编码模式名称，以防止将具体模式与我们的应用程序耦合。这意味着我们直接使用数据库对象名称，并让数据库系统确定使用哪个模式。PostgreSQL通过遵循搜索路径来确定要搜索的表的位置。</p><h3 id="_3-1-postgresql-search-path" tabindex="-1"><a class="header-anchor" href="#_3-1-postgresql-search-path"><span>3.1. PostgreSQL <em>search_path</em></span></a></h3><p><strong>搜索路径是定义数据库系统搜索给定数据库对象的有序模式列表。</strong> 如果对象存在于任何（或多个）模式中，我们得到第一个发现的实例。否则，我们得到一个错误。搜索路径中的第一个模式也称为当前模式。要预览搜索路径上的模式，我们可以使用以下查询：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">SHOW</span> search_path<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>默认的PostgreSQL配置将返回$user和public模式。我们已经提到了public模式，$user模式是以当前用户命名的模式，它可能不存在。在这种情况下，数据库会忽略该模式。</p><p>要将store模式添加到搜索路径，我们可以执行以下查询：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">SET</span> search_path <span class="token keyword">TO</span> store<span class="token punctuation">,</span><span class="token keyword">public</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在此之后，我们可以在不指定模式的情况下查询product表。我们也可以从搜索路径中删除public模式。</p><p>如上所述设置搜索路径是角色级别的配置。我们可以通过更改postgresql.conf文件并重新加载数据库实例来更改整个数据库的搜索路径。</p><h3 id="_3-2-jdbc-url" tabindex="-1"><a class="header-anchor" href="#_3-2-jdbc-url"><span>3.2. JDBC URL</span></a></h3><p>我们可以使用JDBC URL在连接设置期间指定各种参数。通常的参数包括数据库类型、地址、端口、数据库名称等。<strong>自Postgres版本9.4以来，增加了使用URL指定当前模式的支持。</strong></p><p>在我们将这个概念付诸实践之前，让我们设置一个测试环境。为此，我们将使用testcontainers库并创建以下测试设置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ClassRule</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">PostgresqlTestContainer</span> container <span class="token operator">=</span> <span class="token class-name">PostgresqlTestContainer</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@BeforeClass</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">Properties</span> properties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    properties<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;user&quot;</span><span class="token punctuation">,</span> container<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    properties<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;password&quot;</span><span class="token punctuation">,</span> container<span class="token punctuation">.</span><span class="token function">getPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token class-name">DriverManager</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span>container<span class="token punctuation">.</span><span class="token function">getJdbcUrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> properties<span class="token punctuation">)</span><span class="token punctuation">;</span>
    connection<span class="token punctuation">.</span><span class="token function">createStatement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token string">&quot;CREATE SCHEMA store&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    connection<span class="token punctuation">.</span><span class="token function">createStatement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token string">&quot;CREATE TABLE store.product(id SERIAL PRIMARY KEY, name VARCHAR(20))&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    connection<span class="token punctuation">.</span><span class="token function">createStatement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token string">&quot;INSERT INTO store.product VALUES(1, &#39;test product&#39;)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用@ClassRule，我们创建了一个PostgreSQL数据库容器的实例。接下来，在setup方法中，创建与该数据库的连接并创建所需的对象。</p><p>现在数据库设置好了，让我们使用JDBC URL连接到store模式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">settingUpSchemaUsingJdbcURL</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">Properties</span> properties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    properties<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;user&quot;</span><span class="token punctuation">,</span> container<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    properties<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;password&quot;</span><span class="token punctuation">,</span> container<span class="token punctuation">.</span><span class="token function">getPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token class-name">DriverManager</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span>container<span class="token punctuation">.</span><span class="token function">getJdbcUrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token string">&quot;&amp;&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;currentSchema=store&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> properties<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">ResultSet</span> resultSet <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">createStatement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">executeQuery</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT * FROM product&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    resultSet<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>resultSet<span class="token punctuation">.</span><span class="token function">getInt</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">equalTo</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>resultSet<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">equalTo</span><span class="token punctuation">(</span><span class="token string">&quot;test product&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>要更改默认模式，我们需要指定_currentSchema_参数。</strong> 如果我们输入一个不存在的模式，在选择查询期间会抛出PSQLException，表示数据库对象缺失。</p><h3 id="_3-3-pgsimpledatasource" tabindex="-1"><a class="header-anchor" href="#_3-3-pgsimpledatasource"><span>3.3. <em>PGSimpleDataSource</em></span></a></h3><p>要连接到数据库，<strong>我们可以使用来自PostgreSQL驱动程序库的_javax.sql.DataSource_实现，名为_PGSimpleDataSource_。</strong> 这个具体实现支持设置模式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">settingUpSchemaUsingPGSimpleDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> port <span class="token operator">=</span> <span class="token comment">//extracting port from container.getJdbcUrl()</span>
    <span class="token class-name">PGSimpleDataSource</span> ds <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PGSimpleDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    ds<span class="token punctuation">.</span><span class="token function">setServerNames</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span>container<span class="token punctuation">.</span><span class="token function">getHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    ds<span class="token punctuation">.</span><span class="token function">setPortNumbers</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span>port<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    ds<span class="token punctuation">.</span><span class="token function">setUser</span><span class="token punctuation">(</span>container<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    ds<span class="token punctuation">.</span><span class="token function">setPassword</span><span class="token punctuation">(</span>container<span class="token punctuation">.</span><span class="token function">getPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    ds<span class="token punctuation">.</span><span class="token function">setDatabaseName</span><span class="token punctuation">(</span><span class="token string">&quot;test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    ds<span class="token punctuation">.</span><span class="token function">setCurrentSchema</span><span class="token punctuation">(</span><span class="token string">&quot;store&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">ResultSet</span> resultSet <span class="token operator">=</span> ds<span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">createStatement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">executeQuery</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT * FROM product&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    resultSet<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>resultSet<span class="token punctuation">.</span><span class="token function">getInt</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">equalTo</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>resultSet<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">equalTo</span><span class="token punctuation">(</span><span class="token string">&quot;test product&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在使用_PGSimpleDataSource_时，如果未设置模式，驱动程序将使用public模式作为默认模式。</p><h3 id="_3-4-javax-persistence包中的-table-注解" tabindex="-1"><a class="header-anchor" href="#_3-4-javax-persistence包中的-table-注解"><span>3.4. javax.persistence包中的_Table_注解_</span></a></h3><p>如果我们的项目中使用JPA，<strong>我们可以使用_Table_注解在实体级别上指定模式。</strong> 这个注解可以包含模式的值或默认为空字符串。让我们将product表映射到Product实体：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;product&quot;</span><span class="token punctuation">,</span> schema <span class="token operator">=</span> <span class="token string">&quot;store&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Product</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token comment">// getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了验证这种行为，我们设置_EntityManager_实例来查询product表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">settingUpSchemaUsingTableAnnotation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">Map</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` props <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    props<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;hibernate.connection.url&quot;</span><span class="token punctuation">,</span> container<span class="token punctuation">.</span><span class="token function">getJdbcUrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    props<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;hibernate.connection.user&quot;</span><span class="token punctuation">,</span> container<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    props<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;hibernate.connection.password&quot;</span><span class="token punctuation">,</span> container<span class="token punctuation">.</span><span class="token function">getPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">EntityManagerFactory</span> emf <span class="token operator">=</span> <span class="token class-name">Persistence</span><span class="token punctuation">.</span><span class="token function">createEntityManagerFactory</span><span class="token punctuation">(</span><span class="token string">&quot;postgresql_schema_unit&quot;</span><span class="token punctuation">,</span> props<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">EntityManager</span> entityManager <span class="token operator">=</span> emf<span class="token punctuation">.</span><span class="token function">createEntityManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Product</span> product <span class="token operator">=</span> entityManager<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token class-name">Product</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>product<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">equalTo</span><span class="token punctuation">(</span><span class="token string">&quot;test product&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在第3节中提到的，最好避免将模式与代码耦合，出于各种原因。因此，这个功能经常被忽视，但当访问多个模式时，它可以是有利的。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本教程中，首先，我们涵盖了数据库模式的基本理论。之后，我们描述了使用不同方法和技术设置数据库模式的多种方式。像往常一样，所有的代码示例都可以在GitHub上找到。</p>`,41),o=[e];function c(u,i){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-26-Connecting to a Specific Schema in JDBC.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-26/2024-07-26-Connecting%20to%20a%20Specific%20Schema%20in%20JDBC.html","title":"通过JDBC连接到特定模式","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["JDBC","PostgreSQL"],"tag":["Database Schema","PostgreSQL","JDBC"],"head":[["meta",{"name":"keywords","content":"JDBC, PostgreSQL, Database Schema"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-26/2024-07-26-Connecting%20to%20a%20Specific%20Schema%20in%20JDBC.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"通过JDBC连接到特定模式"}],["meta",{"property":"og:description","content":"通过JDBC连接到特定模式 1. 引言 在本文中，我们将涵盖数据库模式的基础知识，为什么我们需要它们，以及它们是如何有用的。之后，我们将专注于使用PostgreSQL数据库的JDBC中设置模式的实际示例。 2. 数据库模式是什么 一般来说，数据库模式是一组规则，它规范了数据库。它是数据库的额外抽象层。有两种模式： 逻辑数据库模式定义了适用于数据库中存储..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-26T10:57:10.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Database Schema"}],["meta",{"property":"article:tag","content":"PostgreSQL"}],["meta",{"property":"article:tag","content":"JDBC"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-26T10:57:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"通过JDBC连接到特定模式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-26T10:57:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"通过JDBC连接到特定模式 1. 引言 在本文中，我们将涵盖数据库模式的基础知识，为什么我们需要它们，以及它们是如何有用的。之后，我们将专注于使用PostgreSQL数据库的JDBC中设置模式的实际示例。 2. 数据库模式是什么 一般来说，数据库模式是一组规则，它规范了数据库。它是数据库的额外抽象层。有两种模式： 逻辑数据库模式定义了适用于数据库中存储..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 数据库模式是什么","slug":"_2-数据库模式是什么","link":"#_2-数据库模式是什么","children":[]},{"level":2,"title":"3. 如何在PostgreSQL中使用模式","slug":"_3-如何在postgresql中使用模式","link":"#_3-如何在postgresql中使用模式","children":[{"level":3,"title":"3.1. PostgreSQL search_path","slug":"_3-1-postgresql-search-path","link":"#_3-1-postgresql-search-path","children":[]},{"level":3,"title":"3.2. JDBC URL","slug":"_3-2-jdbc-url","link":"#_3-2-jdbc-url","children":[]},{"level":3,"title":"3.3. PGSimpleDataSource","slug":"_3-3-pgsimpledatasource","link":"#_3-3-pgsimpledatasource","children":[]},{"level":3,"title":"3.4. javax.persistence包中的_Table_注解_","slug":"_3-4-javax-persistence包中的-table-注解","link":"#_3-4-javax-persistence包中的-table-注解","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721991430000,"updatedTime":1721991430000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.16,"words":1547},"filePathRelative":"posts/baeldung/2024-07-26/2024-07-26-Connecting to a Specific Schema in JDBC.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>通过JDBC连接到特定模式</h1>\\n<h2>1. 引言</h2>\\n<p>在本文中，我们将涵盖数据库模式的基础知识，为什么我们需要它们，以及它们是如何有用的。之后，我们将专注于使用PostgreSQL数据库的JDBC中设置模式的实际示例。</p>\\n<h2>2. 数据库模式是什么</h2>\\n<p>一般来说，数据库模式是一组规则，它规范了数据库。它是数据库的额外抽象层。有两种模式：</p>\\n<ol>\\n<li>逻辑数据库模式定义了适用于数据库中存储数据的规则。</li>\\n<li>物理数据库模式定义了数据在存储系统上如何物理存储的规则。</li>\\n</ol>\\n<p>在PostgreSQL中，模式指的是第一种。<strong>模式是一个逻辑命名空间，包含数据库对象，如表、视图、索引等。</strong> 每个模式属于一个数据库，每个数据库至少有一个模式。如果没有特别指定，PostgreSQL中的默认模式是public。我们创建的每个数据库对象，如果没有指定模式，都属于public模式。</p>","autoDesc":true}');export{k as comp,d as data};
