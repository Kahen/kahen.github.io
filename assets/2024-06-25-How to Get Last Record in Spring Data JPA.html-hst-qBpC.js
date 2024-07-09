import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DRFG6C5y.js";const e={},p=t(`<h1 id="如何在spring-data-jpa中获取最后一条记录" tabindex="-1"><a class="header-anchor" href="#如何在spring-data-jpa中获取最后一条记录"><span>如何在Spring Data JPA中获取最后一条记录</span></a></h1><p>在这个简短的教程中，我们将探索在Spring Data JPA中获取最后一条记录的不同方法。首先，我们将看看如何使用派生查询方法来实现。然后，我们将探索如何使用<code>@Query</code>注解来达到同样的目的。</p><h2 id="_2-设置" tabindex="-1"><a class="header-anchor" href="#_2-设置"><span>2. 设置</span></a></h2><p>**首先，让我们创建并初始化我们想要查询的表。**让我们从创建一个<code>Post</code>实体类开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Post</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">LocalDate</span> publicationDate<span class="token punctuation">;</span>

    <span class="token comment">// 标准的getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，<code>@Entity</code>表示注解的类代表数据库中的一个表。同样，<code>@Id</code>注解定义了主键。</p><p>为了保持简单，我们将使用H2作为我们的内存数据库。首先，让我们添加一个基本的SQL脚本来创建映射到<code>Post</code>类的<code>post</code>表：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> post<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> post<span class="token punctuation">(</span>
    id <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>
    title <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    publication_date <span class="token keyword">DATE</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们用数据填充表：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> post <span class="token punctuation">(</span>id<span class="token punctuation">,</span> title<span class="token punctuation">,</span> publication_date<span class="token punctuation">)</span> <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&#39;Facebook post&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;2020-11-10&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> post <span class="token punctuation">(</span>id<span class="token punctuation">,</span> title<span class="token punctuation">,</span> publication_date<span class="token punctuation">)</span> <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;Instagram post&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;2020-12-24&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> post <span class="token punctuation">(</span>id<span class="token punctuation">,</span> title<span class="token punctuation">,</span> publication_date<span class="token punctuation">)</span> <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">&#39;Twitter post&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;2023-01-10&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> post <span class="token punctuation">(</span>id<span class="token punctuation">,</span> title<span class="token punctuation">,</span> publication_date<span class="token punctuation">)</span> <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">&#39;tiktok post&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;2023-03-18&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> post <span class="token punctuation">(</span>id<span class="token punctuation">,</span> title<span class="token punctuation">,</span> publication_date<span class="token punctuation">)</span> <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token string">&#39;Pinterest post&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;2023-09-09&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，这里的最后一条记录是<code>id</code>为5的记录。因此，为了实现我们获取最后一条记录的目标，我们将根据<code>publication_date</code>反转记录的顺序。然后，我们将使用Spring Data JPA方法来获取排序结果中的第一个记录。这样，我们就可以得到表中的最后一条记录。</p><h2 id="_3-使用派生查询方法" tabindex="-1"><a class="header-anchor" href="#_3-使用派生查询方法"><span>3. 使用派生查询方法</span></a></h2><p>Spring Data JPA因其派生查询方法而受到赞誉。<strong>这个特性提供了一种方便的方式来从方法名称生成查询，而无需手动编写SQL语句。</strong></p><p>Spring Data JPA没有提供任何直接的方法来获取最后一条记录。另一方面，它提供了从一组记录的开始检索数据的简单方法。</p><p>例如，我们可以使用<code>findFirst</code>前缀来创建一个派生查询，以获取第一条记录。那么，让我们看看它的实际应用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PostRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Post</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` <span class="token punctuation">{</span>

    <span class="token class-name">Post</span> <span class="token function">findFirstByOrderByPublicationDateDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法名称<code>findFirstByOrderByPublicationDateDesc()</code>的每个部分都有其意义。<strong>动词“find”告诉Spring Data JPA生成一个选择查询，而“First”表示它应该从结果集中检索第一条记录。</strong></p><p>此外，“OrderByPublicationDateDesc”表示我们希望按<code>publicationDate</code>属性的逆序对记录进行排序。</p><p>在这里，Spring Data JPA智能地评估方法名称。它首先按发布日期的降序对帖子进行排序。这样，它将最后一条记录放在结果的开头。</p><p>然后，它解释“findFirst”以返回排序记录的第一个元素。结果，我们得到了表中的最后一条记录。</p><p>现在，让我们添加一个测试用例来确认一切按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenPosts_whenUsingFindFirstDerivedQuery_thenReturnLastPost</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Post</span> post <span class="token operator">=</span> postRepository<span class="token punctuation">.</span><span class="token function">findFirstByOrderByPublicationDateDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>post<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> post<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到我们的测试成功通过。</p><p>同样，**我们可以使用<code>findTop</code>关键字来实现相同的结果。**我们可以无问题地交替使用<code>findFirst</code>或<code>findTop</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Post</span> <span class="token function">findTopByOrderByPublicationDateDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，让我们为<code>findTopByOrderByPublicationDateDesc()</code>方法创建另一个测试用例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenPosts_whenUsingFindTopDerivedQuery_thenReturnLastPost</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Post</span> post <span class="token operator">=</span> postRepository<span class="token punctuation">.</span><span class="token function">findTopByOrderByPublicationDateDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>post<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> post<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，测试用例成功通过。</p><h2 id="_4-使用-query注解" tabindex="-1"><a class="header-anchor" href="#_4-使用-query注解"><span>4. 使用<code>@Query</code>注解</span></a></h2><p>**另一种解决方案是使用<code>@Query</code>注解将方法绑定到检索最后一条记录的查询上。**默认情况下，<code>@Query</code>接受JPQL查询。所以，让我们在我们的<code>PostRepository</code>中添加另一个名为<code>findLastPost()</code>的方法，并使用<code>@Query</code>来指定获取最后一条帖子的查询：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Query</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT p FROM Post p ORDER BY p.publicationDate DESC LIMIT 1&quot;</span><span class="token punctuation">)</span>
<span class="token class-name">Post</span> <span class="token function">findLastPost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>简而言之，我们选择了按发布日期逆序排序的帖子。然后，我们使用<code>LIMIT 1</code>仅检索一个帖子。返回的帖子表示最后一条记录。</p><p>像往常一样，让我们添加一个测试用例来测试我们的新方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenPosts_whenUsingQueryAnnotation_thenReturnLastPost</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Post</span> post <span class="token operator">=</span> postRepository<span class="token punctuation">.</span><span class="token function">findLastPost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>post<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> post<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>毫不意外，最后一条记录是<code>id</code>为5的帖子。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这个教程中，我们探索了使用Spring Data JPA检索特定表中最后一条记录的不同方式。首先，我们看到了如何使用派生查询方法来实现它。然后，我们在<code>@Query</code>注解中编写了一个JPQL查询，获得了相同的结果。</p><p>一如既往，本文的完整代码可以在GitHub上找到。</p>`,38),o=[p];function c(i,l){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","2024-06-25-How to Get Last Record in Spring Data JPA.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-25/2024-06-25-How%20to%20Get%20Last%20Record%20in%20Spring%20Data%20JPA.html","title":"如何在Spring Data JPA中获取最后一条记录","lang":"zh-CN","frontmatter":{"date":"2024-06-26T00:00:00.000Z","category":["Spring Data JPA","JPA"],"tag":["Spring","JPA","Hibernate"],"head":[["meta",{"name":"keywords","content":"Spring Data JPA, JPA, Hibernate, 最后一条记录, 查询"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-25/2024-06-25-How%20to%20Get%20Last%20Record%20in%20Spring%20Data%20JPA.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Spring Data JPA中获取最后一条记录"}],["meta",{"property":"og:description","content":"如何在Spring Data JPA中获取最后一条记录 在这个简短的教程中，我们将探索在Spring Data JPA中获取最后一条记录的不同方法。首先，我们将看看如何使用派生查询方法来实现。然后，我们将探索如何使用@Query注解来达到同样的目的。 2. 设置 **首先，让我们创建并初始化我们想要查询的表。**让我们从创建一个Post实体类开始： 这..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-25T17:51:04.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring"}],["meta",{"property":"article:tag","content":"JPA"}],["meta",{"property":"article:tag","content":"Hibernate"}],["meta",{"property":"article:published_time","content":"2024-06-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-25T17:51:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Spring Data JPA中获取最后一条记录\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-25T17:51:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Spring Data JPA中获取最后一条记录 在这个简短的教程中，我们将探索在Spring Data JPA中获取最后一条记录的不同方法。首先，我们将看看如何使用派生查询方法来实现。然后，我们将探索如何使用@Query注解来达到同样的目的。 2. 设置 **首先，让我们创建并初始化我们想要查询的表。**让我们从创建一个Post实体类开始： 这..."},"headers":[{"level":2,"title":"2. 设置","slug":"_2-设置","link":"#_2-设置","children":[]},{"level":2,"title":"3. 使用派生查询方法","slug":"_3-使用派生查询方法","link":"#_3-使用派生查询方法","children":[]},{"level":2,"title":"4. 使用@Query注解","slug":"_4-使用-query注解","link":"#_4-使用-query注解","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719337864000,"updatedTime":1719337864000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4,"words":1200},"filePathRelative":"posts/baeldung/2024-06-25/2024-06-25-How to Get Last Record in Spring Data JPA.md","localizedDate":"2024年6月26日","excerpt":"\\n<p>在这个简短的教程中，我们将探索在Spring Data JPA中获取最后一条记录的不同方法。首先，我们将看看如何使用派生查询方法来实现。然后，我们将探索如何使用<code>@Query</code>注解来达到同样的目的。</p>\\n<h2>2. 设置</h2>\\n<p>**首先，让我们创建并初始化我们想要查询的表。**让我们从创建一个<code>Post</code>实体类开始：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Entity</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Post</span> <span class=\\"token punctuation\\">{</span>\\n\\n    <span class=\\"token annotation punctuation\\">@Id</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">Long</span> id<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> title<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">LocalDate</span> publicationDate<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">// 标准的getter和setter</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,k as data};
