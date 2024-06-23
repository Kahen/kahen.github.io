import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DFCp-P9j.js";const e={},p=t(`<h1 id="jpa-hibernate-中清除管理实体的指南" tabindex="-1"><a class="header-anchor" href="#jpa-hibernate-中清除管理实体的指南"><span>JPA/Hibernate 中清除管理实体的指南</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将回顾JPA中实体是如何被管理的，然后探讨一个场景，即由于外部变化，持久化上下文可能不会返回最新数据。</p><h2 id="_2-持久化上下文" tabindex="-1"><a class="header-anchor" href="#_2-持久化上下文"><span>2. 持久化上下文</span></a></h2><p>每个_EntityManager_都与一个持久化上下文相关联，该上下文在内存中存储管理实体。每当我们通过_EntityManager_对实体执行任何数据操作时，该实体就会由持久化上下文管理。</p><p>当我们再次检索实体时，JPA会从持久化上下文中返回管理实体，而不是从数据库中获取。这种缓存机制有助于提高性能，避免了从数据库中重复获取相同的数据。</p><p><strong>持久化上下文在JPA中也被称为一级（L1）缓存。</strong></p><h2 id="_3-场景设置" tabindex="-1"><a class="header-anchor" href="#_3-场景设置"><span>3. 场景设置</span></a></h2><p>首先，我们创建一个简单的实体类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;person&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">AUTO</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token comment">// 构造函数，getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将创建一个_Person_实体并将其持久化到数据库：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">EntityTransaction</span> transaction <span class="token operator">=</span> entityManager<span class="token punctuation">.</span><span class="token function">getTransaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
transaction<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Person</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
person<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;David Jones&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
entityManager<span class="token punctuation">.</span><span class="token function">persist</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>

transaction<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-不清除管理实体" tabindex="-1"><a class="header-anchor" href="#_4-不清除管理实体"><span>4. 不清除管理实体</span></a></h2><p>我们的示例数据已经准备好了。让我们使用SQL更新查询来遮蔽_Person_的_name_字段。我们从_EntityManager_获取一个JDBC连接并执行更新查询：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Session</span> session <span class="token operator">=</span> entityManager<span class="token punctuation">.</span><span class="token function">unwrap</span><span class="token punctuation">(</span><span class="token class-name">Session</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
session<span class="token punctuation">.</span><span class="token function">doWork</span><span class="token punctuation">(</span>connection <span class="token operator">-</span>\\<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">PreparedStatement</span> pStmt <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">prepareStatement</span><span class="token punctuation">(</span><span class="token string">&quot;UPDATE person SET name=? WHERE id=?&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        pStmt<span class="token punctuation">.</span><span class="token function">setString</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;*****&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        pStmt<span class="token punctuation">.</span><span class="token function">setLong</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        pStmt<span class="token punctuation">.</span><span class="token function">executeUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以通过_EntityManager_再次检索相同的实体：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Person</span> updatedPerson <span class="token operator">=</span> entityManager<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>直观地，我们可能会认为检索到的_Person_实体的名称已经被更新查询遮蔽了。然而，当我们验证实体的名称时，名称仍然是“<em>David Jones</em>”：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span>updatedPerson<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isNotEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;*****&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这种情况发生的原因是JPA从持久化上下文中检索管理实体，而自JDBC数据更新以来，持久化上下文并没有相应地更新。<strong>当数据变更发生在_EntityManager_之外时，它并不知情，也无法更新相应的管理实体。</strong></p><h2 id="_5-清除管理实体" tabindex="-1"><a class="header-anchor" href="#_5-清除管理实体"><span>5. 清除管理实体</span></a></h2><p><strong>因此，每当我们在不使用_EntityManager_的情况下对数据库数据进行任何更改时，我们必须强制JPA从持久化上下文中清除所有管理实体，以便可以再次从数据库中获取实体。</strong></p><p>为此，我们调用_EntityManager_的_clear()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>entityManager<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个操作将所有管理实体从持久化上下文中分离出来，确保JPA不再跟踪这些实体。</p><p>随后，我们可以再次使用_EntityManager_检索相同的实体。如果我们在持久化单元配置中启用了_hibernate.show_sql_选项，我们将在控制台日志中看到以下SQL被执行：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code>Hibernate:
    <span class="token keyword">select</span>
        p1_0<span class="token punctuation">.</span>id<span class="token punctuation">,</span>
        p1_0<span class="token punctuation">.</span>name
    <span class="token keyword">from</span>
        person p1_0
    <span class="token keyword">where</span>
        p1_0<span class="token punctuation">.</span>id<span class="token operator">=</span>?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个SQL语句表明_EntityManager_执行了一个选择查询，从数据库中检索最新数据。我们可以期待这次_Person_实体的名称已经被遮蔽了：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span>updatedPerson<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;*****&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了JPA中持久化上下文的作用。如果我们在不涉及_EntityManager_的情况下执行数据变更，持久化上下文不会重新加载实体。我们需要调用_EntityManager_的_clear()_方法来移除所有管理实体，并允许再次从数据库中重新加载实体。</p><p>如常，示例的完整源代码可以在GitHub上找到。</p>`,32),o=[p];function i(c,l){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","Clear Managed Entities in JPA Hibernate.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/Clear%20Managed%20Entities%20in%20JPA%20Hibernate.html","title":"JPA/Hibernate 中清除管理实体的指南","lang":"zh-CN","frontmatter":{"date":"2023-10-10T00:00:00.000Z","category":["JPA","Hibernate"],"tag":["JPA","Hibernate","持久化上下文","清除管理实体"],"description":"JPA/Hibernate 中清除管理实体的指南 1. 概述 在本教程中，我们将回顾JPA中实体是如何被管理的，然后探讨一个场景，即由于外部变化，持久化上下文可能不会返回最新数据。 2. 持久化上下文 每个_EntityManager_都与一个持久化上下文相关联，该上下文在内存中存储管理实体。每当我们通过_EntityManager_对实体执行任何数据...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Clear%20Managed%20Entities%20in%20JPA%20Hibernate.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"JPA/Hibernate 中清除管理实体的指南"}],["meta",{"property":"og:description","content":"JPA/Hibernate 中清除管理实体的指南 1. 概述 在本教程中，我们将回顾JPA中实体是如何被管理的，然后探讨一个场景，即由于外部变化，持久化上下文可能不会返回最新数据。 2. 持久化上下文 每个_EntityManager_都与一个持久化上下文相关联，该上下文在内存中存储管理实体。每当我们通过_EntityManager_对实体执行任何数据..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JPA"}],["meta",{"property":"article:tag","content":"Hibernate"}],["meta",{"property":"article:tag","content":"持久化上下文"}],["meta",{"property":"article:tag","content":"清除管理实体"}],["meta",{"property":"article:published_time","content":"2023-10-10T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JPA/Hibernate 中清除管理实体的指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-10-10T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 持久化上下文","slug":"_2-持久化上下文","link":"#_2-持久化上下文","children":[]},{"level":2,"title":"3. 场景设置","slug":"_3-场景设置","link":"#_3-场景设置","children":[]},{"level":2,"title":"4. 不清除管理实体","slug":"_4-不清除管理实体","link":"#_4-不清除管理实体","children":[]},{"level":2,"title":"5. 清除管理实体","slug":"_5-清除管理实体","link":"#_5-清除管理实体","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.03,"words":908},"filePathRelative":"posts/baeldung/Archive/Clear Managed Entities in JPA Hibernate.md","localizedDate":"2023年10月10日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将回顾JPA中实体是如何被管理的，然后探讨一个场景，即由于外部变化，持久化上下文可能不会返回最新数据。</p>\\n<h2>2. 持久化上下文</h2>\\n<p>每个_EntityManager_都与一个持久化上下文相关联，该上下文在内存中存储管理实体。每当我们通过_EntityManager_对实体执行任何数据操作时，该实体就会由持久化上下文管理。</p>\\n<p>当我们再次检索实体时，JPA会从持久化上下文中返回管理实体，而不是从数据库中获取。这种缓存机制有助于提高性能，避免了从数据库中重复获取相同的数据。</p>\\n<p><strong>持久化上下文在JPA中也被称为一级（L1）缓存。</strong></p>","autoDesc":true}');export{d as comp,k as data};
