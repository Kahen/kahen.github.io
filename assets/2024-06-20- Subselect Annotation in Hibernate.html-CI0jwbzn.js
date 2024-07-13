import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-DkA39C0B.js";const t={},i=e(`<h1 id="hibernate中的-subselect注解" tabindex="-1"><a class="header-anchor" href="#hibernate中的-subselect注解"><span>Hibernate中的@Subselect注解</span></a></h1><p>在本教程中，我们将回顾Hibernate中的@Subselect注解，如何使用它以及它的好处。我们还将看到Hibernate对使用@Subselect注解的实体的限制及其后果。</p><h2 id="subselect注解概述" tabindex="-1"><a class="header-anchor" href="#subselect注解概述"><span>@Subselect注解概述</span></a></h2><p>@Subselect允许我们将一个不可变的实体映射到SQL查询上。让我们从实体到SQL查询映射的含义开始解释。</p><h3 id="_2-1-映射到sql查询" tabindex="-1"><a class="header-anchor" href="#_2-1-映射到sql查询"><span>2.1. 映射到SQL查询</span></a></h3><p>通常，我们在Hibernate中创建实体时，会使用@Entity注解。这个注解表明这是一个实体，应该由持久化上下文管理。我们也可以提供@Table注解，以指示Hibernate应该将这个实体映射到哪个具体的表。默认情况下，每当我们在Hibernate中创建一个实体时，它都假定实体直接映射到一个特定的表。在大多数情况下，这正是我们想要的，但并不总是这样。</p><p>有时，我们的实体并不是直接映射到数据库中的某个特定表，而是SQL查询执行的结果。例如，我们可能有一个Client实体，其中每个实例都是SQL查询（或视图）执行结果集ResultSet中的一行：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>SELECT
  u.id        as id,
  u.firstname as name,
  u.lastname  as lastname,
  r.name      as role
FROM users AS u
INNER JOIN roles AS r
ON r.id = u.role_id
WHERE u.type = &#39;CLIENT&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重要的是，数据库中可能根本没有专用的clients表。这就是将实体映射到SQL查询的含义——我们从一个子查询SQL查询中获取实体，而不是从表中获取。这个查询可以从任何表中选择并执行任何逻辑——Hibernate不关心。</p><h3 id="_2-2-不可变性" tabindex="-1"><a class="header-anchor" href="#_2-2-不可变性"><span>2.2. 不可变性</span></a></h3><p>因此，我们可能有一个没有映射到特定表的实体。作为直接后果，不清楚如何执行任何INSERT/UPDATE语句。简单地说，没有clients表（如上例所示），我们可以插入记录。</p><p>确实，Hibernate对我们执行的SQL一无所知。因此，Hibernate无法对这样的实体执行任何写操作——它变成了只读的。这里的棘手之处在于，我们仍然可以要求Hibernate插入这个实体，但它会失败，因为在ANSI SQL中至少不可能向子查询发出INSERT。</p><h2 id="使用示例" tabindex="-1"><a class="header-anchor" href="#使用示例"><span>使用示例</span></a></h2><p>现在，一旦我们理解了@Subselect注解的作用，让我们尝试实际使用它。这里，我们有一个简单的RuntimeConfiguration：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@Entity</span>
<span class="token annotation punctuation">@Immutable</span>
<span class="token annotation punctuation">@Subselect</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token triple-quoted-string string">&quot;&quot;&quot;
    SELECT
      ss.id,
      ss.key,
      ss.value,
      ss.created_at
    FROM system_settings AS ss
    INNER JOIN (
      SELECT
        ss2.key as k2,
        MAX(ss2.created_at) as ca2
      FROM system_settings ss2
      GROUP BY ss2.key
    ) AS t ON t.k2 = ss.key AND t.ca2 = ss.created_at
    WHERE ss.type = &#39;SYSTEM&#39; AND ss.active IS TRUE
&quot;&quot;&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RuntimeConfiguration</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;key&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> key<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;value&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> value<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;created_at&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Instant</span> createdAt<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个实体代表我们应用程序的运行时参数。但是，为了返回属于我们应用程序的最新参数集合，我们需要在system_settings表上执行特定的SQL查询。正如我们所看到的，@Subselect注解的正文包含了那个SQL语句。现在，因为每个RuntimeConfiguration条目本质上是一个键值对，我们可能想要实现一个简单的查询——获取具有特定键的最新活动RuntimeConfiguration记录。</p><p>请注意，我们还用@Immutable标记了我们的实体。因此，Hibernate将禁用对我们实体的任何脏检查跟踪，以避免意外的UPDATE语句。</p><p>所以，如果我们想用特定的键获取RuntimeConfiguration，我们可以这样做：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenEntityMarkedWithSubselect_whenSelectingRuntimeConfigByKey_thenSelectedSuccessfully</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> key <span class="token operator">=</span> <span class="token string">&quot;config.enabled&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">CriteriaBuilder</span> criteriaBuilder <span class="token operator">=</span> entityManager<span class="token punctuation">.</span><span class="token function">getCriteriaBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">CriteriaQuery</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">RuntimeConfiguration</span><span class="token punctuation">&gt;</span></span>\` query <span class="token operator">=</span> criteriaBuilder<span class="token punctuation">.</span><span class="token function">createQuery</span><span class="token punctuation">(</span><span class="token class-name">RuntimeConfiguration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">var</span> root <span class="token operator">=</span> query<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token class-name">RuntimeConfiguration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">RuntimeConfiguration</span> configurationParameter <span class="token operator">=</span> entityManager
      <span class="token punctuation">.</span><span class="token function">createQuery</span><span class="token punctuation">(</span>query<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span>criteriaBuilder<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getSingleResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertThat</span><span class="token punctuation">(</span>configurationParameter<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;true&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用Hibernate Criteria API按键查询RuntimeConfiguration。现在，让我们检查Hibernate实际产生的查询，以满足我们的请求：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">select</span>
    rc1_0<span class="token punctuation">.</span>id<span class="token punctuation">,</span>
    rc1_0<span class="token punctuation">.</span>created_at<span class="token punctuation">,</span>
    rc1_0<span class="token punctuation">.</span><span class="token keyword">key</span><span class="token punctuation">,</span>
    rc1_0<span class="token punctuation">.</span><span class="token keyword">value</span>
<span class="token keyword">from</span>
    <span class="token punctuation">(</span> <span class="token keyword">SELECT</span>
        ss<span class="token punctuation">.</span>id<span class="token punctuation">,</span>
        ss<span class="token punctuation">.</span><span class="token keyword">key</span><span class="token punctuation">,</span>
        ss<span class="token punctuation">.</span><span class="token keyword">value</span><span class="token punctuation">,</span>
        ss<span class="token punctuation">.</span>created_at
    <span class="token keyword">FROM</span>
        system_settings <span class="token keyword">AS</span> ss
    <span class="token keyword">INNER</span> <span class="token keyword">JOIN</span>
        <span class="token punctuation">(</span>   <span class="token keyword">SELECT</span>
            ss2<span class="token punctuation">.</span><span class="token keyword">key</span> <span class="token keyword">as</span> k2<span class="token punctuation">,</span>     <span class="token function">MAX</span><span class="token punctuation">(</span>ss2<span class="token punctuation">.</span>created_at<span class="token punctuation">)</span> <span class="token keyword">as</span> ca2
        <span class="token keyword">FROM</span>
            system_settings ss2
        <span class="token keyword">GROUP</span> <span class="token keyword">BY</span>
            ss2<span class="token punctuation">.</span><span class="token keyword">key</span> <span class="token punctuation">)</span> <span class="token keyword">AS</span> t
            <span class="token keyword">ON</span> t<span class="token punctuation">.</span>k2 <span class="token operator">=</span> ss<span class="token punctuation">.</span><span class="token keyword">key</span>
            <span class="token operator">AND</span> t<span class="token punctuation">.</span>ca2 <span class="token operator">=</span> ss<span class="token punctuation">.</span>created_at
    <span class="token keyword">WHERE</span>
        ss<span class="token punctuation">.</span><span class="token keyword">type</span> <span class="token operator">=</span> <span class="token string">&#39;SYSTEM&#39;</span>
        <span class="token operator">AND</span> ss<span class="token punctuation">.</span>active <span class="token operator">IS</span> <span class="token boolean">TRUE</span>  <span class="token punctuation">)</span> rc1_0
<span class="token keyword">where</span>
    rc1_0<span class="token punctuation">.</span><span class="token keyword">key</span><span class="token operator">=</span>?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，Hibernate只是从@Subselect中提供的SQL语句中选择记录。现在，我们提供的每个过滤器都将应用于结果子选择记录集。</p><h2 id="替代方案" tabindex="-1"><a class="header-anchor" href="#替代方案"><span>替代方案</span></a></h2><p>有经验的Hibernate开发者可能会注意到，已经有几种方法可以实现类似的结果。其中之一是使用投影映射到DTO，另一个是视图映射。这两种方法都有它们的优缺点。让我们一一讨论。</p><h3 id="_4-1-投影映射" tabindex="-1"><a class="header-anchor" href="#_4-1-投影映射"><span>4.1. 投影映射</span></a></h3><p>让我们谈谈DTO投影。<strong>它允许将SQL查询映射到DTO投影中，这不是一个实体</strong>。与实体相比，DTO投影的处理速度也被认为是更快的。DTO投影也是不可变的，这意味着Hibernate不管理这样的实体，也不对它们应用任何脏检查。</p><p>尽管上述所有都是真的，但DTO投影本身也有限制。<strong>最重要的一个是DTO投影不支持关联</strong>。这是相当明显的，因为我们处理的是DTO投影，它不是一个被管理的实体。这使得DTO投影在Hibernate中很快，但也意味着持久化上下文不管理这些DTO。因此，我们不能在DTO上有任何OneToX或ManyToX字段。</p><p>然而，如果我们将实体映射到SQL语句，我们仍然在映射一个实体。它可能有管理的关联。所以，这个限制不适用于实体到查询的映射。</p><p>另一个重要且概念上的区别是@Subselect允许我们将实体表示为SQL查询。Hibernate将做注解名称所建议的事情。它只会使用我们提供的SQL查询来选择（所以我们的查询变成了子选择），然后应用额外的过滤器。假设我们需要获取实体X，我们需要执行一些过滤、分组等。然后，如果我们使用DTO投影，我们将不得不在每个JPQL或本地查询中始终编写过滤器、分组等。当使用@Subselect时，我们可以一次性指定这个查询并从中选择。</p><h3 id="_4-2-视图映射" tabindex="-1"><a class="header-anchor" href="#_4-2-视图映射"><span>4.2. 视图映射</span></a></h3><p>虽然这不是众所周知的，但Hibernate可以开箱即用地将我们的实体映射到SQL视图。这在实体到SQL查询映射方面非常相似。视图本身在数据库中几乎总是只读的。在不同的RDBMS中有一些例外，比如PostgreSQL中的简单视图，但这完全是供应商特定的。这意味着我们的实体也是不可变的，我们只会从底层视图中读取，我们不会更新/插入任何数据。</p><p>总的来说，@Subselect和实体到视图映射之间的区别非常小。前者使用我们在注解中提供的确切SQL语句，而后者使用现有的视图。两种方法都支持管理关联，所以选择这些选项之一完全取决于我们的要求。</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们讨论了如何使用@Subselect从子选择查询而不是特定表中选择实体。如果我们不想在获取实体时重复相同的SQL语句部分，这非常方便。但这意味着使用@Subselect的实体实际上是不可变的，我们不应该尝试从应用程序代码中持久化它们。有一些@Subselect的替代方案，例如Hibernate中的实体到视图映射，甚至是DTO投影的使用。它们都有各自的优缺点，因此为了做出选择，我们需要像往常一样，遵守要求和常识。</p><p>如往常一样，源代码可在GitHub上获得。</p>`,35),p=[i];function c(l,o){return a(),s("div",null,p)}const d=n(t,[["render",c],["__file","2024-06-20- Subselect Annotation in Hibernate.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-%20Subselect%20Annotation%20in%20Hibernate.html","title":"Hibernate中的@Subselect注解","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Hibernate","JPA"],"tag":["Subselect","Entity","SQL"],"head":[["meta",{"name":"keywords","content":"Hibernate, JPA, Subselect, Entity, SQL"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-%20Subselect%20Annotation%20in%20Hibernate.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Hibernate中的@Subselect注解"}],["meta",{"property":"og:description","content":"Hibernate中的@Subselect注解 在本教程中，我们将回顾Hibernate中的@Subselect注解，如何使用它以及它的好处。我们还将看到Hibernate对使用@Subselect注解的实体的限制及其后果。 @Subselect注解概述 @Subselect允许我们将一个不可变的实体映射到SQL查询上。让我们从实体到SQL查询映射的含..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Subselect"}],["meta",{"property":"article:tag","content":"Entity"}],["meta",{"property":"article:tag","content":"SQL"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Hibernate中的@Subselect注解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Hibernate中的@Subselect注解 在本教程中，我们将回顾Hibernate中的@Subselect注解，如何使用它以及它的好处。我们还将看到Hibernate对使用@Subselect注解的实体的限制及其后果。 @Subselect注解概述 @Subselect允许我们将一个不可变的实体映射到SQL查询上。让我们从实体到SQL查询映射的含..."},"headers":[{"level":2,"title":"@Subselect注解概述","slug":"subselect注解概述","link":"#subselect注解概述","children":[{"level":3,"title":"2.1. 映射到SQL查询","slug":"_2-1-映射到sql查询","link":"#_2-1-映射到sql查询","children":[]},{"level":3,"title":"2.2. 不可变性","slug":"_2-2-不可变性","link":"#_2-2-不可变性","children":[]}]},{"level":2,"title":"使用示例","slug":"使用示例","link":"#使用示例","children":[]},{"level":2,"title":"替代方案","slug":"替代方案","link":"#替代方案","children":[{"level":3,"title":"4.1. 投影映射","slug":"_4-1-投影映射","link":"#_4-1-投影映射","children":[]},{"level":3,"title":"4.2. 视图映射","slug":"_4-2-视图映射","link":"#_4-2-视图映射","children":[]}]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":6.5,"words":1949},"filePathRelative":"posts/baeldung/Archive/2024-06-20- Subselect Annotation in Hibernate.md","localizedDate":"2024年6月20日","excerpt":"\\n<p>在本教程中，我们将回顾Hibernate中的@Subselect注解，如何使用它以及它的好处。我们还将看到Hibernate对使用@Subselect注解的实体的限制及其后果。</p>\\n<h2>@Subselect注解概述</h2>\\n<p>@Subselect允许我们将一个不可变的实体映射到SQL查询上。让我们从实体到SQL查询映射的含义开始解释。</p>\\n<h3>2.1. 映射到SQL查询</h3>\\n<p>通常，我们在Hibernate中创建实体时，会使用@Entity注解。这个注解表明这是一个实体，应该由持久化上下文管理。我们也可以提供@Table注解，以指示Hibernate应该将这个实体映射到哪个具体的表。默认情况下，每当我们在Hibernate中创建一个实体时，它都假定实体直接映射到一个特定的表。在大多数情况下，这正是我们想要的，但并不总是这样。</p>","autoDesc":true}');export{d as comp,k as data};
