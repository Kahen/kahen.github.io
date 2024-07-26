import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-DpYLEM_u.js";const e={},p=t(`<h1 id="使用spring-data-cassandra记录查询" tabindex="-1"><a class="header-anchor" href="#使用spring-data-cassandra记录查询"><span>使用Spring Data Cassandra记录查询</span></a></h1><p>Apache Cassandra是一个<strong>可扩展的分布式NoSQL数据库</strong>。Cassandra在节点之间传输数据，并提供持续的可用性，没有单点故障。实际上，Cassandra能够以异常的性能处理大量数据。</p><p>当开发使用数据库的应用程序时，能够记录和调试执行的查询是非常重要的。在本教程中，我们将探讨在使用Apache Cassandra与Spring Boot时如何记录查询和语句。</p><p>在我们的示例中，我们将使用Spring Data仓库抽象和_Testcontainers_库。我们将看到如何通过Spring配置配置Cassandra查询记录。此外，我们将探索Datastax请求记录器。我们可以为更高级的记录配置这个内置组件。</p><h2 id="_2-设置测试环境" tabindex="-1"><a class="header-anchor" href="#_2-设置测试环境"><span>2. 设置测试环境</span></a></h2><p>为了演示查询记录，我们需要设置一个测试环境。首先，我们将使用Spring Data为Apache Cassandra设置测试数据。接下来，我们将使用_Testcontainers_库来运行Cassandra数据库容器进行集成测试。</p><h3 id="_2-1-cassandra仓库" tabindex="-1"><a class="header-anchor" href="#_2-1-cassandra仓库"><span>2.1. Cassandra仓库</span></a></h3><p>Spring Data使我们能够基于常见的Spring接口创建Cassandra仓库。首先，让我们通过定义一个简单的DAO类开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Table</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@PrimaryKey</span>
    <span class="token keyword">private</span> <span class="token class-name">UUID</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> lastName<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token class-name">UUID</span> id<span class="token punctuation">,</span> <span class="token class-name">String</span> firstName<span class="token punctuation">,</span> <span class="token class-name">String</span> lastName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>firstName <span class="token operator">=</span> firstName<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>lastName <span class="token operator">=</span> lastName<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// getters, setters, equals 和 hash code</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们将通过扩展_CassandraRepository_接口为我们的DAO定义一个Spring Data仓库：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PersonRepository</span> <span class="token keyword">extends</span> <span class="token class-name">CassandraRepository</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">,</span> UUID<span class="token punctuation">&gt;</span></span>\` <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们将在_application.properties_文件中添加两个属性：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">spring.data.cassandra.schema-action</span><span class="token punctuation">=</span><span class="token value attr-value">create_if_not_exists</span>
<span class="token key attr-name">spring.data.cassandra.local-datacenter</span><span class="token punctuation">=</span><span class="token value attr-value">datacenter1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>结果，Spring Data将自动为我们创建注释的表。</p><p>我们应该注意到，对于生产系统，不建议使用_create_if_not_exists_选项。</p><p>作为替代方案，可以通过从标准根类路径加载_schema.sql_脚本来创建表。</p><h3 id="_2-2-cassandra容器" tabindex="-1"><a class="header-anchor" href="#_2-2-cassandra容器"><span>2.2. Cassandra容器</span></a></h3><p>作为下一步，让我们配置并暴露一个Cassandra容器在特定端口上：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Container</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">CassandraContainer</span> cassandra <span class="token operator">=</span>
  <span class="token punctuation">(</span><span class="token class-name">CassandraContainer</span><span class="token punctuation">)</span> <span class="token keyword">new</span> <span class="token class-name">CassandraContainer</span><span class="token punctuation">(</span><span class="token string">&quot;cassandra:3.11.2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withExposedPorts</span><span class="token punctuation">(</span><span class="token number">9042</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在将容器用于集成测试之前，我们需要覆盖Spring Data所需的测试属性，以建立与它的连接：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">TestPropertyValues</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>
  <span class="token string">&quot;spring.data.cassandra.keyspace-name=&quot;</span> <span class="token operator">+</span> <span class="token constant">KEYSPACE_NAME</span><span class="token punctuation">,</span>
  <span class="token string">&quot;spring.data.cassandra.contact-points=&quot;</span> <span class="token operator">+</span> cassandra<span class="token punctuation">.</span><span class="token function">getContainerIpAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token string">&quot;spring.data.cassandra.port=&quot;</span> <span class="token operator">+</span> cassandra<span class="token punctuation">.</span><span class="token function">getMappedPort</span><span class="token punctuation">(</span><span class="token number">9042</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">applyTo</span><span class="token punctuation">(</span>configurableApplicationContext<span class="token punctuation">.</span><span class="token function">getEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">createKeyspace</span><span class="token punctuation">(</span>cassandra<span class="token punctuation">.</span><span class="token function">getCluster</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，在创建任何对象/表之前，我们需要<strong>创建一个Cassandra keyspace</strong>。一个keyspace类似于RDBMS中的数据库。</p><h3 id="_2-3-集成测试" tabindex="-1"><a class="header-anchor" href="#_2-3-集成测试"><span>2.3. 集成测试</span></a></h3><p>现在，我们已经准备好开始编写我们的集成测试。</p><p>我们对<strong>记录选择、插入和删除查询</strong>感兴趣。因此，我们将编写一些触发这些不同类型的查询的测试。</p><p>首先，我们将编写一个测试来保存和更新一个人的记录。我们期望这个测试执行两个插入和一个选择数据库查询：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenExistingPersonRecord_whenUpdatingIt_thenRecordIsUpdated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">UUID</span> personId <span class="token operator">=</span> <span class="token class-name">UUIDs</span><span class="token punctuation">.</span><span class="token function">timeBased</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Person</span> existingPerson <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span>personId<span class="token punctuation">,</span> <span class="token string">&quot;Luka&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Modric&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    personRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>existingPerson<span class="token punctuation">)</span><span class="token punctuation">;</span>
    existingPerson<span class="token punctuation">.</span><span class="token function">setFirstName</span><span class="token punctuation">(</span><span class="token string">&quot;Marko&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    personRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>existingPerson<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">&gt;</span></span>\`\` savedPersons <span class="token operator">=</span> personRepository<span class="token punctuation">.</span><span class="token function">findAllById</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>personId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>savedPersons<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getFirstName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Marko&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们将编写一个测试来保存和删除现有的人员记录。我们期望这个测试执行一个插入、删除和选择数据库查询：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenExistingPersonRecord_whenDeletingIt_thenRecordIsDeleted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">UUID</span> personId <span class="token operator">=</span> <span class="token class-name">UUIDs</span><span class="token punctuation">.</span><span class="token function">timeBased</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Person</span> existingPerson <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span>personId<span class="token punctuation">,</span> <span class="token string">&quot;Luka&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Modric&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    personRepository<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>existingPerson<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">&gt;</span></span>\`\` savedPersons <span class="token operator">=</span> personRepository<span class="token punctuation">.</span><span class="token function">findAllById</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>personId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>savedPersons<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下，我们不会在控制台中观察到任何数据库查询被记录。</p><p>使用Spring Data for Apache Cassandra版本2.0或更高版本，可以在_application.properties_中为_CqlTemplate_类设置日志级别：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">logging.level.org.springframework.data.cassandra.core.cql.CqlTemplate</span><span class="token punctuation">=</span><span class="token value attr-value">DEBUG</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因此，通过将日志级别设置为DEBUG，我们启用了所有执行的查询和准备语句的记录：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>2021-09-25 12:41:58.679 DEBUG 17856 --- [           main] o.s.data.cassandra.core.cql.CqlTemplate:
  Executing CQL statement [CREATE TABLE IF NOT EXISTS person
  (birthdate date, firstname text, id uuid, lastname text, lastpurchaseddate timestamp, lastvisiteddate timestamp, PRIMARY KEY (id))];

2021-09-25 12:42:01.204 DEBUG 17856 --- [           main] o.s.data.cassandra.core.cql.CqlTemplate:
  Preparing statement [INSERT INTO person (birthdate,firstname,id,lastname,lastpurchaseddate,lastvisiteddate)
  VALUES (?,?,?,?,?,)] using org.springframework.data.cassandra.core.CassandraTemplate$PreparedStatementHandler@4d16975b

2021-09-25 12:42:01.253 DEBUG 17856 --- [           main] o.s.data.cassandra.core.cql.CqlTemplate:
  Executing prepared statement [INSERT INTO person (birthdate,firstname,id,lastname,lastpurchaseddate,lastvisiteddate) VALUES (?,?,?,?,?,)]

2021-09-25 12:42:01.279 DEBUG 17856 --- [           main] o.s.data.cassandra.core.cql.CqlTemplate:
  Preparing statement [INSERT INTO person (birthdate,firstname,id,lastname,lastpurchaseddate,lastvisiteddate)
  VALUES (?,?,?,?,?,)] using org.springframework.data.cassandra.core.CassandraTemplate$PreparedStatementHandler@539dd2d0

2021-09-25 12:42:01.290 DEBUG 17856 --- [           main] o.s.data.cassandra.core.cql.CqlTemplate:
  Executing prepared statement [INSERT INTO person (birthdate,firstname,id,lastname,lastpurchaseddate,lastvisiteddate) VALUES (?,?,?,?,?,)]

2021-09-25 12:42:01.351 DEBUG 17856 --- [           main] o.s.data.cassandra.core.cql.CqlTemplate:
  Preparing statement [SELECT * FROM person WHERE id IN (371bb4a0-1ded-11ec-8cad-934f1aec79e6)]
  using org.springframework.data.cassandra.core.CassandraTemplate$PreparedStatementHandler@3e61cffd

2021-09-25 12:42:01.370 DEBUG 17856 --- [           main] o.s.data.cassandra.core.cql.CqlTemplate:
  Executing prepared statement [SELECT * FROM person WHERE id IN (371bb4a0-1ded-11ec-8cad-934f1aec79e6)]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不幸的是，使用这个解决方案，我们不会看到在语句中使用的绑定值的输出。</p><h2 id="_4-datastax请求跟踪器" tabindex="-1"><a class="header-anchor" href="#_4-datastax请求跟踪器"><span>4. Datastax请求跟踪器</span></a></h2><p>DataStax请求跟踪器是一个会话范围的<strong>组件，它会被通知每一个Cassandra请求的结果</strong>。</p><p>DataStax Java驱动程序为Apache Cassandra提供了一个可选的请求跟踪器实现，用于记录所有请求。</p><h3 id="_4-1-noop请求跟踪器" tabindex="-1"><a class="header-anchor" href="#_4-1-noop请求跟踪器"><span>4.1. Noop请求跟踪器</span></a></h3><p>默认的请求跟踪器实现称为_NoopRequestTracker_。因此，它什么也不做：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;datastax-java-driver.advanced.request-tracker.class&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;NoopRequestTracker&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>要设置一个不同的跟踪器，我们应该在Cassandra配置中指定一个实现_RequestTracker_的类，或者通过系统属性。</p><h3 id="_4-2-请求记录器" tabindex="-1"><a class="header-anchor" href="#_4-2-请求记录器"><span>4.2. 请求记录器</span></a></h3><p>_RequestLogger_是一个<strong>内置的_RequestTracker_实现，它记录每一个请求</strong>。</p><p>我们可以通过设置特定的DataStax Java驱动程序系统属性来启用它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;datastax-java-driver.advanced.request-tracker.class&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;RequestLogger&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;datastax-java-driver.advanced.request-tracker.logs.success.enabled&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;true&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;datastax-java-driver.advanced.request-tracker.logs.slow.enabled&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;true&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;datastax-java-driver.advanced.request-tracker.logs.error.enabled&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;true&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们启用了所有成功、慢和失败请求的记录。</p><p>现在，当我们运行我们的测试时，我们将在日志中观察到所有执行的数据库查询：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>2021-09-25 13:06:31.799  INFO 11172 --- [        s0-io-4] c.d.o.d.i.core.tracker.RequestLogger:
  [s0|90232530][Node(endPoint=localhost/[0:0:0:0:0:0:0:1]:49281, hostId=c50413d5-03b6-4037-9c46-29f0c0da595a, hashCode=68c305fe)]
  Success (6 ms) [6 values] INSERT INTO person (birthdate,firstname,id,lastname,lastpurchaseddate,lastvisiteddate)
  VALUES (?,?,?,?,?,) [birthdate=NULL, firstname=&#39;Luka&#39;, id=a3ad6890-1df0-11ec-a295-7d319da1858a, lastname=&#39;Modric&#39;, lastpurchaseddate=NULL, lastvisiteddate=NULL]

2021-09-25 13:06:31.811  INFO 11172 --- [        s0-io-4] c.d.o.d.i.core.tracker.RequestLogger:
  [s0|778232359][Node(endPoint=localhost/[0:0:0:0:0:0:0:1]:49281, hostId=c50413d5-03b6-4037-9c46-29f0c0da595a, hashCode=68c305fe)]
  Success (4 ms) [6 values] INSERT INTO person (birthdate,firstname,id,lastname,lastpurchaseddate,lastvisiteddate)
  VALUES (?,?,?,?,?,) [birthdate=NULL, firstname=&#39;Marko&#39;, id=a3ad6890-1df0-11ec-a295-7d319da1858a, lastname=&#39;Modric&#39;, lastpurchaseddate=NULL, lastvisiteddate=NULL]

2021-09-25 13:06:31.847  INFO 11172 --- [        s0-io-4] c.d.o.d.i.core.tracker.RequestLogger:
  [s0|1947131919][Node(endPoint=localhost/[0:0:0:0:0:0:0:1]:49281, hostId=c50413d5-03b6-4037-9c46-29f0c0da595a, hashCode=68c305fe)]
  Success (5 ms) [0 values] SELECT * FROM person WHERE id IN (a3ad6890-1df0-11ec-a295-7d319da1858a)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将看到所有的请求都被记录在类别_com.datastax.oss.driver.internal.core.tracker.RequestLogger_下。</p><p>此外，<strong>所有在语句中使用的绑定值也会默认被记录</strong>。</p><h3 id="_4-3-绑定值" tabindex="-1"><a class="header-anchor" href="#_4-3-绑定值"><span>4.3. 绑定值</span></a></h3><p>内置的**_RequestLogger_是一个非常可定制的组件**。我们可以使用以下系统属性配置绑定值的输出：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;datastax-java-driver.advanced.request-tracker.logs.show-values&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;true&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;datastax-java-driver.advanced.request-tracker.logs.max-value-length&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;100&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;datastax-java-driver.advanced.request-tracker.logs.max-values&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;100&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果值的格式化表示比_max-value-length_属性定义的值长，将会被截断。</p><p>使用_max-values_属性，我们可以定义要记录的绑定值的最大数量。</p><h3 id="_4-4-其他选项" tabindex="-1"><a class="header-anchor" href="#_4-4-其他选项"><span>4.4. 其他选项</span></a></h3><p>在我们的第一个例子中，我们启用了慢请求的记录。我们可以使用_threshold_属性来将成功的请求分类为慢：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;datastax-java-driver.advanced.request-tracker.logs.slow.threshold &quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1 second&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>默认情况下，失败请求的堆栈跟踪会被记录。如果我们禁用它们，我们只会在日志中看到异常的字符串表示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;datastax-java-driver.advanced.request-tracker.logs.show-stack-trace&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;true&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>成功和慢请求使用INFO日志级别。另一方面，失败请求使用ERROR级别。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了<strong>在使用Apache Cassandra与Spring Boot时记录查询和语句</strong>。</p><p>在示例中，我们涵盖了为Apache Cassandra配置Spring Data的日志级别。我们看到了Spring Data会记录查询，但不会记录绑定值。最后，我们探索了Datastax请求跟踪器。它是一个非常可定制的组件，我们可以使用它来记录Cassandra查询及其绑定值。</p><p>一如既往，源代码可以在GitHub上找到。</p>`,66),o=[p];function i(c,l){return s(),n("div",null,o)}const u=a(e,[["render",i],["__file","2024-07-24-Logging Queries with Spring Data Cassandra.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-24/2024-07-24-Logging%20Queries%20with%20Spring%20Data%20Cassandra.html","title":"使用Spring Data Cassandra记录查询","lang":"zh-CN","frontmatter":{"date":"2024-07-25T00:00:00.000Z","category":["Spring Data Cassandra","Logging Queries"],"tag":["Spring Boot","Apache Cassandra","NoSQL"],"head":[["meta",{"name":"keywords","content":"Spring Data Cassandra, Logging Queries, Spring Boot, Apache Cassandra, NoSQL"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-24/2024-07-24-Logging%20Queries%20with%20Spring%20Data%20Cassandra.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Spring Data Cassandra记录查询"}],["meta",{"property":"og:description","content":"使用Spring Data Cassandra记录查询 Apache Cassandra是一个可扩展的分布式NoSQL数据库。Cassandra在节点之间传输数据，并提供持续的可用性，没有单点故障。实际上，Cassandra能够以异常的性能处理大量数据。 当开发使用数据库的应用程序时，能够记录和调试执行的查询是非常重要的。在本教程中，我们将探讨在使用A..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-24T16:52:43.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"Apache Cassandra"}],["meta",{"property":"article:tag","content":"NoSQL"}],["meta",{"property":"article:published_time","content":"2024-07-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-24T16:52:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Spring Data Cassandra记录查询\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-25T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-24T16:52:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Spring Data Cassandra记录查询 Apache Cassandra是一个可扩展的分布式NoSQL数据库。Cassandra在节点之间传输数据，并提供持续的可用性，没有单点故障。实际上，Cassandra能够以异常的性能处理大量数据。 当开发使用数据库的应用程序时，能够记录和调试执行的查询是非常重要的。在本教程中，我们将探讨在使用A..."},"headers":[{"level":2,"title":"2. 设置测试环境","slug":"_2-设置测试环境","link":"#_2-设置测试环境","children":[{"level":3,"title":"2.1. Cassandra仓库","slug":"_2-1-cassandra仓库","link":"#_2-1-cassandra仓库","children":[]},{"level":3,"title":"2.2. Cassandra容器","slug":"_2-2-cassandra容器","link":"#_2-2-cassandra容器","children":[]},{"level":3,"title":"2.3. 集成测试","slug":"_2-3-集成测试","link":"#_2-3-集成测试","children":[]}]},{"level":2,"title":"4. Datastax请求跟踪器","slug":"_4-datastax请求跟踪器","link":"#_4-datastax请求跟踪器","children":[{"level":3,"title":"4.1. Noop请求跟踪器","slug":"_4-1-noop请求跟踪器","link":"#_4-1-noop请求跟踪器","children":[]},{"level":3,"title":"4.2. 请求记录器","slug":"_4-2-请求记录器","link":"#_4-2-请求记录器","children":[]},{"level":3,"title":"4.3. 绑定值","slug":"_4-3-绑定值","link":"#_4-3-绑定值","children":[]},{"level":3,"title":"4.4. 其他选项","slug":"_4-4-其他选项","link":"#_4-4-其他选项","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721839963000,"updatedTime":1721839963000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.7,"words":2010},"filePathRelative":"posts/baeldung/2024-07-24/2024-07-24-Logging Queries with Spring Data Cassandra.md","localizedDate":"2024年7月25日","excerpt":"\\n<p>Apache Cassandra是一个<strong>可扩展的分布式NoSQL数据库</strong>。Cassandra在节点之间传输数据，并提供持续的可用性，没有单点故障。实际上，Cassandra能够以异常的性能处理大量数据。</p>\\n<p>当开发使用数据库的应用程序时，能够记录和调试执行的查询是非常重要的。在本教程中，我们将探讨在使用Apache Cassandra与Spring Boot时如何记录查询和语句。</p>\\n<p>在我们的示例中，我们将使用Spring Data仓库抽象和_Testcontainers_库。我们将看到如何通过Spring配置配置Cassandra查询记录。此外，我们将探索Datastax请求记录器。我们可以为更高级的记录配置这个内置组件。</p>","autoDesc":true}');export{u as comp,k as data};
