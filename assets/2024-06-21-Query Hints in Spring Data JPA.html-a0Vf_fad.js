import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-8nJ1rqSf.js";const t={},p=e('<h1 id="spring-data-jpa中的查询提示" tabindex="-1"><a class="header-anchor" href="#spring-data-jpa中的查询提示"><span>Spring Data JPA中的查询提示</span></a></h1><p>在本教程中，我们将探讨Spring Data JPA中查询提示的基础知识。这些提示有助于优化数据库查询，并通过影响优化器的决策过程来潜在地提高应用程序性能。我们还将讨论它们的功能以及如何有效地应用它们。</p><h2 id="_2-理解查询提示" tabindex="-1"><a class="header-anchor" href="#_2-理解查询提示"><span>2. 理解查询提示</span></a></h2><p>Spring Data JPA中的查询提示是一个强大的工具，可以帮助优化数据库查询并提高应用程序性能。与直接控制执行不同，它们影响优化器的决策过程。</p><p>在Spring Data JPA中，我们可以在<code>org.hibernate.annotations</code>包中找到这些提示，以及与Hibernate相关的各种注释和类，Hibernate是一种普遍的持久性提供者。<strong>值得注意的是，这些提示的解释和执行通常取决于底层的持久性提供者，如Hibernate或EclipseLink，使它们成为特定于供应商的。</strong></p><h2 id="_3-使用查询提示" tabindex="-1"><a class="header-anchor" href="#_3-使用查询提示"><span>3. 使用查询提示</span></a></h2><p>Spring Data JPA提供了多种方式来利用查询提示来优化数据库查询。让我们探索常见的方法。</p><h3 id="_3-1-注解基础配置" tabindex="-1"><a class="header-anchor" href="#_3-1-注解基础配置"><span>3.1. 注解基础配置</span></a></h3><p>Spring Data JPA提供了一种使用注解向JPA查询添加查询提示的简便方法。<strong><code>@QueryHints</code>注解允许指定一个JPA <code>@QueryHint</code>提示数组，用于应用到生成的SQL查询中。</strong></p><p>让我们考虑以下示例，我们设置JDBC获取大小提示以限制返回结果的大小：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span>\n<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">EmployeeRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>`` <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@QueryHints</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token annotation punctuation">@QueryHint</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;org.hibernate.fetchSize&quot;</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">&quot;50&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span>````` <span class="token function">findByGender</span><span class="token punctuation">(</span><span class="token class-name">String</span> gender<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们向<code>EmployeeRepository</code>接口的<code>findByGender()</code>方法添加了<code>@QueryHints</code>注解，以一次性控制获取的实体数量。此外，我们可以在仓库级别应用<code>@QueryHints</code>注解，以影响仓库中的所有查询：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span>\n<span class="token annotation punctuation">@QueryHints</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token annotation punctuation">@QueryHint</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;org.hibernate.fetchSize&quot;</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">&quot;50&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">EmployeeRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>`` <span class="token punctuation">{</span>\n    <span class="token comment">// 仓库方法...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个操作确保指定的查询提示适用于<code>EmployeeRepository</code>接口中的所有查询，从而促进了仓库查询的一致性。</p><h3 id="_3-2-程序性配置查询提示" tabindex="-1"><a class="header-anchor" href="#_3-2-程序性配置查询提示"><span>3.2. 程序性配置查询提示</span></a></h3><p>除了基于注解和动态方法，我们可以使用<code>EntityManager</code>对象程序性地配置查询提示。这种方法提供了对查询提示配置的细粒度控制。以下是一个程序性设置自定义SQL注释提示的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@PersistenceContext</span>\n<span class="token keyword">private</span> <span class="token class-name">EntityManager</span> entityManager<span class="token punctuation">;</span>\n\n<span class="token annotation punctuation">@Override</span>\n<span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span>````` <span class="token function">findRecentEmployees</span><span class="token punctuation">(</span><span class="token keyword">int</span> limit<span class="token punctuation">,</span> <span class="token keyword">boolean</span> readOnly<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Query</span> query <span class="token operator">=</span> entityManager<span class="token punctuation">.</span><span class="token function">createQuery</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT e FROM Employee e ORDER BY e.joinDate DESC&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Employee</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">setMaxResults</span><span class="token punctuation">(</span>limit<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">setHint</span><span class="token punctuation">(</span><span class="token string">&quot;org.hibernate.readOnly&quot;</span><span class="token punctuation">,</span> readOnly<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> query<span class="token punctuation">.</span><span class="token function">getResultList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们传递了一个布尔标志作为参数，以指示是否应该将提示设置为<code>true</code>或<code>false</code>。这种灵活性允许我们根据运行时条件适应查询行为。</p><h3 id="_3-3-在实体中定义命名查询" tabindex="-1"><a class="header-anchor" href="#_3-3-在实体中定义命名查询"><span>3.3. 在实体中定义命名查询</span></a></h3><p>**查询提示可以直接使用<code>@NamedQuery</code>注解在实体类中应用。**这允许我们定义一个命名查询以及特定的提示。例如，让我们考虑以下代码片段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>\n<span class="token annotation punctuation">@NamedQuery</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;selectEmployee&quot;</span><span class="token punctuation">,</span> query <span class="token operator">=</span> <span class="token string">&quot;SELECT e FROM Employee e&quot;</span><span class="token punctuation">,</span>\n  hints <span class="token operator">=</span> <span class="token annotation punctuation">@QueryHint</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;org.hibernate.fetchSize&quot;</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">&quot;50&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 实体属性和方法</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦在实体类中定义，带有关联提示的命名查询<code>selectEmployee</code>可以使用<code>EntityManager</code>的<code>createNamedQuery()</code>方法调用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span>````` employees <span class="token operator">=</span> em<span class="token punctuation">.</span><span class="token function">createNamedQuery</span><span class="token punctuation">(</span><span class="token string">&quot;selectEmployee&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResultList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-查询提示使用场景" tabindex="-1"><a class="header-anchor" href="#_4-查询提示使用场景"><span>4. 查询提示使用场景</span></a></h2><p>查询提示可以在多种场景中使用，以优化查询性能。以下是一些常见的用例。</p><h3 id="_4-1-超时管理" tabindex="-1"><a class="header-anchor" href="#_4-1-超时管理"><span>4.1. 超时管理</span></a></h3><p>在查询可能运行较长时间的场景中，实施有效的超时管理策略变得至关重要。**通过使用<code>javax.persistence.query.timeout</code>提示，我们可以为查询建立最大执行时间。**这种做法确保查询不会超过指定的时间阈值。</p><p>提示接受以毫秒为单位的值，如果查询超出限制，它将抛出<code>LockTimeoutException</code>。以下是一个示例，我们为检索活跃员工设置了5000毫秒的超时：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@QueryHints</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token annotation punctuation">@QueryHint</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;javax.persistence.query.timeout&quot;</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">&quot;5000&quot;</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span>````` <span class="token function">findActiveEmployees</span><span class="token punctuation">(</span><span class="token keyword">long</span> inactiveDaysThreshold<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-缓存查询结果" tabindex="-1"><a class="header-anchor" href="#_4-2-缓存查询结果"><span>4.2. 缓存查询结果</span></a></h3><p>**查询提示可以用来启用查询结果的缓存，使用<code>jakarta.persistence.cache.retrieveMode</code>提示。**当设置为_USE_时，JPA首先尝试从缓存中检索实体，然后再去数据库。另一方面，将其设置为_BYPASS_指示JPA忽略缓存，并直接从数据库中获取实体。</p><p>**此外，我们还可以使用<code>jakarta.persistence.cache.storeMode</code>来指定JPA应该如何处理在二级缓存中存储实体。**当设置为_USE_时，JPA将实体添加到缓存中并更新现有的实体。_BYPASS_模式指示Hibernate只更新缓存中的现有实体，而不添加新的实体。最后，_REFRESH_模式在检索之前刷新缓存中的实体，确保缓存的数据是最新的。</p><p>以下是一个示例，展示了这些提示的使用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@QueryHints</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@QueryHint</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;jakarta.persistence.cache.retrieveMode&quot;</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">&quot;USE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token annotation punctuation">@QueryHint</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;jakarta.persistence.cache.storeMode&quot;</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">&quot;USE&quot;</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span>````` <span class="token function">findEmployeesByName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，<code>retrieveMode</code>和<code>storeMode</code>都被配置为_USE_，表明Hibernate积极利用二级缓存来检索和存储实体。</p><h3 id="_4-3-优化查询执行计划" tabindex="-1"><a class="header-anchor" href="#_4-3-优化查询执行计划"><span>4.3. 优化查询执行计划</span></a></h3><p>**查询提示可以用来影响数据库优化器生成的执行计划。**例如，当数据保持不变时，我们可以使用<code>org.hibernate.readOnly</code>提示来表示查询是只读的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@QueryHints</span><span class="token punctuation">(</span><span class="token annotation punctuation">@QueryHint</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;org.hibernate.readOnly&quot;</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">&quot;true&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token class-name">User</span> <span class="token function">findByUsername</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>org.hibernate.comment</code>提示允许向查询中添加自定义SQL注释，有助于查询分析和调试。<strong>这个特性特别有用，当我们想在生成的SQL语句中提供上下文或注释时。</strong></p><p>以下是一个示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@QueryHints</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token annotation punctuation">@QueryHint</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;org.hibernate.comment&quot;</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">&quot;Retrieve employee older than specified age&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token class-name">List</span> <span class="token function">findByAgeGreaterThan</span><span class="token punctuation">(</span><span class="token keyword">int</span> age<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们了解了Spring Data JPA中查询提示的重要性以及它们对优化数据库查询以提高应用程序性能的显著影响。我们探索了包括基于注解的配置和直接JPQL操作在内的各种技术，以有效应用查询提示。</p><p>如常，示例的源代码可在GitHub上找到。</p>',44),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(t,[["render",c],["__file","2024-06-21-Query Hints in Spring Data JPA.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-21/2024-06-21-Query%20Hints%20in%20Spring%20Data%20JPA.html","title":"Spring Data JPA中的查询提示","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Spring Data JPA","Query Optimization"],"tag":["Query Hints","Performance"],"head":[["meta",{"name":"keywords","content":"Spring Data JPA, Query Hints, Optimization, Performance"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-21/2024-06-21-Query%20Hints%20in%20Spring%20Data%20JPA.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Data JPA中的查询提示"}],["meta",{"property":"og:description","content":"Spring Data JPA中的查询提示 在本教程中，我们将探讨Spring Data JPA中查询提示的基础知识。这些提示有助于优化数据库查询，并通过影响优化器的决策过程来潜在地提高应用程序性能。我们还将讨论它们的功能以及如何有效地应用它们。 2. 理解查询提示 Spring Data JPA中的查询提示是一个强大的工具，可以帮助优化数据库查询并提..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T14:49:03.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Query Hints"}],["meta",{"property":"article:tag","content":"Performance"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T14:49:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Data JPA中的查询提示\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T14:49:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Data JPA中的查询提示 在本教程中，我们将探讨Spring Data JPA中查询提示的基础知识。这些提示有助于优化数据库查询，并通过影响优化器的决策过程来潜在地提高应用程序性能。我们还将讨论它们的功能以及如何有效地应用它们。 2. 理解查询提示 Spring Data JPA中的查询提示是一个强大的工具，可以帮助优化数据库查询并提..."},"headers":[{"level":2,"title":"2. 理解查询提示","slug":"_2-理解查询提示","link":"#_2-理解查询提示","children":[]},{"level":2,"title":"3. 使用查询提示","slug":"_3-使用查询提示","link":"#_3-使用查询提示","children":[{"level":3,"title":"3.1. 注解基础配置","slug":"_3-1-注解基础配置","link":"#_3-1-注解基础配置","children":[]},{"level":3,"title":"3.2. 程序性配置查询提示","slug":"_3-2-程序性配置查询提示","link":"#_3-2-程序性配置查询提示","children":[]},{"level":3,"title":"3.3. 在实体中定义命名查询","slug":"_3-3-在实体中定义命名查询","link":"#_3-3-在实体中定义命名查询","children":[]}]},{"level":2,"title":"4. 查询提示使用场景","slug":"_4-查询提示使用场景","link":"#_4-查询提示使用场景","children":[{"level":3,"title":"4.1. 超时管理","slug":"_4-1-超时管理","link":"#_4-1-超时管理","children":[]},{"level":3,"title":"4.2. 缓存查询结果","slug":"_4-2-缓存查询结果","link":"#_4-2-缓存查询结果","children":[]},{"level":3,"title":"4.3. 优化查询执行计划","slug":"_4-3-优化查询执行计划","link":"#_4-3-优化查询执行计划","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718981343000,"updatedTime":1718981343000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.16,"words":1548},"filePathRelative":"posts/baeldung/2024-06-21/2024-06-21-Query Hints in Spring Data JPA.md","localizedDate":"2024年6月21日","excerpt":"\\n<p>在本教程中，我们将探讨Spring Data JPA中查询提示的基础知识。这些提示有助于优化数据库查询，并通过影响优化器的决策过程来潜在地提高应用程序性能。我们还将讨论它们的功能以及如何有效地应用它们。</p>\\n<h2>2. 理解查询提示</h2>\\n<p>Spring Data JPA中的查询提示是一个强大的工具，可以帮助优化数据库查询并提高应用程序性能。与直接控制执行不同，它们影响优化器的决策过程。</p>\\n<p>在Spring Data JPA中，我们可以在<code>org.hibernate.annotations</code>包中找到这些提示，以及与Hibernate相关的各种注释和类，Hibernate是一种普遍的持久性提供者。<strong>值得注意的是，这些提示的解释和执行通常取决于底层的持久性提供者，如Hibernate或EclipseLink，使它们成为特定于供应商的。</strong></p>","autoDesc":true}');export{d as comp,k as data};
