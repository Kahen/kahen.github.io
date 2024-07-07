import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BA-MSwOu.js";const e={},p=t(`<h1 id="使用hibernate生成uuid作为主键" tabindex="-1"><a class="header-anchor" href="#使用hibernate生成uuid作为主键"><span>使用Hibernate生成UUID作为主键</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>UUID是数据库中相对常见的一种主键类型。它实际上是全局唯一的，这使得它成为分布式系统中ID类型的一个不错的选择。</p><p>在本教程中，我们将看看如何利用Hibernate和JPA为我们的实体生成UUID。</p><h2 id="_2-jpa-jakarta规范" tabindex="-1"><a class="header-anchor" href="#_2-jpa-jakarta规范"><span>2. JPA/Jakarta规范</span></a></h2><p>首先，我们来看看JPA提供了什么来解决这个问题。</p><p>自2022年发布的3.1.0版本以来，JPA规范为开发者提供了一个新的_GenerationType.UUID_，我们可以在_@GeneratedValue_注解中使用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">class</span> <span class="token class-name">Reservation</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">UUID</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">UUID</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> status<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> number<span class="token punctuation">;</span>

    <span class="token comment">// getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_GenerationType_指示持久性提供者应为我们的实体自动生成UUID。</p><p>特别是Hibernate，从6.2版本开始支持JPA 3.1.0。因此，至少使用Hibernate 6.2，这将有效：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenGeneratingUUIDUsingNewJPAGenerationType_thenHibernateGeneratedUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Reservation</span> reservation <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Reservation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    reservation<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token string">&quot;created&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    reservation<span class="token punctuation">.</span><span class="token function">setNumber</span><span class="token punctuation">(</span><span class="token string">&quot;12345&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">UUID</span> saved <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token constant">UUID</span><span class="token punctuation">)</span> session<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>reservation<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertThat</span><span class="token punctuation">(</span>saved<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isNotNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，根据RFC 4122，定义了四种类型/版本的UUID。JPA规范将UUID版本的选择留给了持久性提供者。因此，<strong>不同的持久性提供者可能会生成不同版本的UUID</strong>。</p><p>默认情况下，Hibernate生成第四版的UUID：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenGeneratingUUIDUsingNewJPAGenerationType_thenHibernateGeneratedUUIDOfVersion4</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Reservation</span> reservation <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Reservation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    reservation<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token string">&quot;new&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    reservation<span class="token punctuation">.</span><span class="token function">setNumber</span><span class="token punctuation">(</span><span class="token string">&quot;012&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">UUID</span> saved <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token constant">UUID</span><span class="token punctuation">)</span> session<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>reservation<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertThat</span><span class="token punctuation">(</span>saved<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isNotNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertThat</span><span class="token punctuation">(</span>saved<span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据RFC 4122，Hibernate能够创建第一版和第四版的UUID。我们将稍后看到如何生成基于时间的（第一版）UUID。</p><h2 id="_3-在hibernate-6-2之前" tabindex="-1"><a class="header-anchor" href="#_3-在hibernate-6-2之前"><span>3. 在Hibernate 6.2之前</span></a></h2><p>在一些项目中，可能无法从JPA规范2.x跳跃到JPA（或Jakarta）规范3.1.0。然而，如果我们有Hibernate版本4或5，我们仍然有能力生成UUID。为此，我们有两种方法。</p><p>首先，我们可以通过在_@GenericGenerator_注解中指定_org.hibernate.id.UUIDGenerator_类来实现这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">class</span> <span class="token class-name">Sale</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>generator <span class="token operator">=</span> <span class="token string">&quot;uuid-hibernate-generator&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@GenericGenerator</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;uuid-hibernate-generator&quot;</span><span class="token punctuation">,</span> strategy <span class="token operator">=</span> <span class="token string">&quot;org.hibernate.id.UUIDGenerator&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">UUID</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">boolean</span> completed<span class="token punctuation">;</span>

    <span class="token comment">// getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>行为将与Hibernate 6.2相同：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenGeneratingUUIDUsingGenericConverter_thenAlsoGetUUIDGeneratedVersion4</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Sale</span> sale <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sale</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    sale<span class="token punctuation">.</span><span class="token function">setCompleted</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">UUID</span> saved <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token constant">UUID</span><span class="token punctuation">)</span> session<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>sale<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertThat</span><span class="token punctuation">(</span>saved<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isNotNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertThat</span><span class="token punctuation">(</span>saved<span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，这种方法相当冗长，我们可以通过仅使用_org.hibernate.annotations.UuidGenerator_注解来获得相同的行为：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">class</span> <span class="token class-name">Sale</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@UuidGenerator</span>
    <span class="token keyword">private</span> <span class="token class-name">UUID</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">boolean</span> completed<span class="token punctuation">;</span>

    <span class="token comment">// getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，<strong>在指定_@UuidGenerator_时，我们可以选择生成的具体UUID版本</strong>。这由_style_参数定义。让我们看看这个参数可以取的值：</p><ul><li><em>RANDOM</em> – 基于随机数生成UUID（RFC中的第四版）</li><li><em>TIME</em> – 生成基于时间的UUID（RFC中的第一版）</li><li><em>AUTO</em> – 这是默认选项，与_RANDOM_相同</li></ul><p>让我们看看如何通过Hibernate控制生成的UUID版本：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">class</span> <span class="token class-name">WebSiteUser</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@UuidGenerator</span><span class="token punctuation">(</span>style <span class="token operator">=</span> <span class="token class-name">UuidGenerator<span class="token punctuation">.</span>Style</span><span class="token punctuation">.</span><span class="token constant">TIME</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">UUID</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">LocalDate</span> registrationDate<span class="token punctuation">;</span>

    <span class="token comment">// getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以检查，Hibernate将生成基于时间的（第一版）UUID：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenGeneratingTimeBasedUUID_thenUUIDGeneratedVersion1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">WebSiteUser</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WebSiteUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    user<span class="token punctuation">.</span><span class="token function">setRegistrationDate</span><span class="token punctuation">(</span><span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">UUID</span> saved <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token constant">UUID</span><span class="token punctuation">)</span> session<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertThat</span><span class="token punctuation">(</span>saved<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isNotNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertThat</span><span class="token punctuation">(</span>saved<span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-将-string-作为uuid" tabindex="-1"><a class="header-anchor" href="#_4-将-string-作为uuid"><span>4. 将_String_作为UUID</span></a></h2><p>此外，如果我们将Java ID类型设置为_String_，Hibernate也足够智能为我们生成UUID：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">class</span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@UuidGenerator</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，Hibernate可以处理_String_和_UUID_ Java类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenGeneratingUUIDAsString_thenUUIDGeneratedVersion1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Element</span> element <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Element</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    element<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> saved <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> session<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertThat</span><span class="token punctuation">(</span>saved<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isNotEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">fromString</span><span class="token punctuation">(</span>saved<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们应该注意，<strong>当我们将列类型设置为_java.util.UUID_时，Hibernate尝试将其映射到数据库中的相应UUID类型。这个类型可能因数据库而异</strong>。</p><p>因此，实际类型实际上取决于设置的Hibernate方言。例如，如果我们使用PostgreSQL，那么相应的类型将是PostgreSQL中的_UUID_。如果我们使用Microsoft SQL Server，那么相应的类型将是_UNIQUEIDENTIFIER_。然而，如果我们使用_String_作为Java ID类型，那么Hibernate将其映射到某些SQL文本类型，如_TEXT_或_VARCHAR_。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了使用Hibernate生成UUID的不同方式。</p><p>在Hibernate 6.2和Jakarta 3.1.0规范之前有几种选择。自Hibernate 6.2以来，我们可以使用新的JPA _GenerationType.UUID_来生成UUID，而不受持久性提供者的限制。</p><p>然而，JPA规范并没有指定生成的UUID版本。如果我们想指定一个具体的版本，我们需要使用Hibernate特定的类，我们仍然有两种选择——第一版或第四版。</p><p>如往常一样，本教程的源代码可在GitHub上获得。</p>`,41),o=[p];function c(i,l){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-06-Generate UUIDs as Primary Keys With Hibernate.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Generate%20UUIDs%20as%20Primary%20Keys%20With%20Hibernate.html","title":"使用Hibernate生成UUID作为主键","lang":"zh-CN","frontmatter":{"date":"2024-07-06T00:00:00.000Z","category":["Java","Hibernate"],"tag":["UUID","JPA"],"head":[["meta",{"name":"keywords","content":"Hibernate, UUID, 主键, JPA"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Generate%20UUIDs%20as%20Primary%20Keys%20With%20Hibernate.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Hibernate生成UUID作为主键"}],["meta",{"property":"og:description","content":"使用Hibernate生成UUID作为主键 1. 引言 UUID是数据库中相对常见的一种主键类型。它实际上是全局唯一的，这使得它成为分布式系统中ID类型的一个不错的选择。 在本教程中，我们将看看如何利用Hibernate和JPA为我们的实体生成UUID。 2. JPA/Jakarta规范 首先，我们来看看JPA提供了什么来解决这个问题。 自2022年发..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T05:36:42.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"UUID"}],["meta",{"property":"article:tag","content":"JPA"}],["meta",{"property":"article:published_time","content":"2024-07-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T05:36:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Hibernate生成UUID作为主键\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T05:36:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Hibernate生成UUID作为主键 1. 引言 UUID是数据库中相对常见的一种主键类型。它实际上是全局唯一的，这使得它成为分布式系统中ID类型的一个不错的选择。 在本教程中，我们将看看如何利用Hibernate和JPA为我们的实体生成UUID。 2. JPA/Jakarta规范 首先，我们来看看JPA提供了什么来解决这个问题。 自2022年发..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. JPA/Jakarta规范","slug":"_2-jpa-jakarta规范","link":"#_2-jpa-jakarta规范","children":[]},{"level":2,"title":"3. 在Hibernate 6.2之前","slug":"_3-在hibernate-6-2之前","link":"#_3-在hibernate-6-2之前","children":[]},{"level":2,"title":"4. 将_String_作为UUID","slug":"_4-将-string-作为uuid","link":"#_4-将-string-作为uuid","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720244202000,"updatedTime":1720244202000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.78,"words":1133},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Generate UUIDs as Primary Keys With Hibernate.md","localizedDate":"2024年7月6日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>UUID是数据库中相对常见的一种主键类型。它实际上是全局唯一的，这使得它成为分布式系统中ID类型的一个不错的选择。</p>\\n<p>在本教程中，我们将看看如何利用Hibernate和JPA为我们的实体生成UUID。</p>\\n<h2>2. JPA/Jakarta规范</h2>\\n<p>首先，我们来看看JPA提供了什么来解决这个问题。</p>\\n<p>自2022年发布的3.1.0版本以来，JPA规范为开发者提供了一个新的_GenerationType.UUID_，我们可以在_@GeneratedValue_注解中使用：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Entity</span>\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Reservation</span> <span class=\\"token punctuation\\">{</span>\\n\\n    <span class=\\"token annotation punctuation\\">@Id</span>\\n    <span class=\\"token annotation punctuation\\">@GeneratedValue</span><span class=\\"token punctuation\\">(</span>strategy <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">GenerationType</span><span class=\\"token punctuation\\">.</span><span class=\\"token constant\\">UUID</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">UUID</span> id<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> status<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> number<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">// getter和setter</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
