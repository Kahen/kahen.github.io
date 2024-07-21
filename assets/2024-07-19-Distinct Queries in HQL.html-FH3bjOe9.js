import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as t,a as e}from"./app-CXN34Kw1.js";const a={},i=e(`<hr><h1 id="hql中的不同查询" tabindex="-1"><a class="header-anchor" href="#hql中的不同查询"><span>HQL中的不同查询</span></a></h1><p>在这篇文章中，我们将讨论HQL中的不同查询以及如何在不必要时避免在SQL查询中添加_distinct_关键字。</p><h2 id="_2-理解问题" tabindex="-1"><a class="header-anchor" href="#_2-理解问题"><span>2. 理解问题</span></a></h2><p>首先，让我们看看我们的数据模型并确定我们想要实现什么。</p><p>我们将使用具有一对多关系的_Post_和_Comment_实体对象。我们想要检索一个帖子列表以及它们所有相关的评论。</p><p>让我们先尝试以下HQL查询：</p><div class="language-hql line-numbers-mode" data-ext="hql" data-title="hql"><pre class="language-hql"><code>String hql = &quot;SELECT p FROM Post p LEFT JOIN FETCH p.comments&quot;;
List\`\`&lt;Post&gt;\`\` posts = session.createQuery(hql, Post.class).getResultList();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这将生成以下SQL查询：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">select</span>
     p1_0<span class="token punctuation">.</span>id<span class="token punctuation">,</span>c1_0<span class="token punctuation">.</span>Post_id<span class="token punctuation">,</span>c1_1<span class="token punctuation">.</span>id<span class="token punctuation">,</span>c1_1<span class="token punctuation">.</span><span class="token keyword">text</span><span class="token punctuation">,</span>p1_0<span class="token punctuation">.</span>title
<span class="token keyword">from</span>
     Post p1_0
<span class="token keyword">left</span> <span class="token keyword">join</span> <span class="token punctuation">(</span>Post_Comment c1_0 <span class="token keyword">join</span> <span class="token keyword">Comment</span> c1_1 <span class="token keyword">on</span> c1_1<span class="token punctuation">.</span>id<span class="token operator">=</span>c1_0<span class="token punctuation">.</span>comments_id<span class="token punctuation">)</span> <span class="token keyword">on</span> p1_0<span class="token punctuation">.</span>id<span class="token operator">=</span>c1_0<span class="token punctuation">.</span>Post_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>结果将包含重复项。</strong> **一个_Post_将根据其关联的_Comments_数量显示多次——**一个有三个_Comments_的_Post_将在结果列表中显示三次。</p><h2 id="_3-在hql查询中使用-distinct" tabindex="-1"><a class="header-anchor" href="#_3-在hql查询中使用-distinct"><span>3. 在HQL查询中使用_distinct_</span></a></h2><p>我们需要在HQL查询中使用_distinct_关键字来消除重复项：</p><div class="language-hql line-numbers-mode" data-ext="hql" data-title="hql"><pre class="language-hql"><code>String hql = &quot;SELECT DISTINCT p FROM Post p LEFT JOIN FETCH p.comments&quot;;
List\`\`&lt;Post&gt;\`\` posts = session.createQuery(hql, Post.class).getResultList();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们得到了正确的结果：不再有重复的_Post_对象。让我们看看Hibernate生成的SQL语句：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">select</span>
     <span class="token keyword">distinct</span> p1_0<span class="token punctuation">.</span>id<span class="token punctuation">,</span>c1_0<span class="token punctuation">.</span>Post_id<span class="token punctuation">,</span>c1_1<span class="token punctuation">.</span>id<span class="token punctuation">,</span>c1_1<span class="token punctuation">.</span><span class="token keyword">text</span><span class="token punctuation">,</span>p1_0<span class="token punctuation">.</span>title
<span class="token keyword">from</span>
     Post p1_0
<span class="token keyword">left</span> <span class="token keyword">join</span>
     <span class="token punctuation">(</span>Post_Comment c1_0 <span class="token keyword">join</span> <span class="token keyword">Comment</span> c1_1 <span class="token keyword">on</span> c1_1<span class="token punctuation">.</span>id<span class="token operator">=</span>c1_0<span class="token punctuation">.</span>comments_id<span class="token punctuation">)</span> <span class="token keyword">on</span> p1_0<span class="token punctuation">.</span>id<span class="token operator">=</span>c1_0<span class="token punctuation">.</span>Post_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以注意到_distinct_关键字不仅被Hibernate使用，也被包含在SQL查询中。<strong>我们应该避免这样做，因为它是不必要的，并且会导致性能问题。</strong></p><h2 id="_4-使用-queryhint-为-distinct-关键字" tabindex="-1"><a class="header-anchor" href="#_4-使用-queryhint-为-distinct-关键字"><span>4. 使用_QueryHint_为_distinct_关键字</span></a></h2><p><strong>从Hibernate 6开始，distinct总是传递给SQL查询，并且已经移除了QueryHints#HINT_PASS_DISTINCT_THROUGH标志。</strong></p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇文章中，我们发现SQL查询中_distinct_关键字的存在可能是不必要的，并且会影响性能。之后，我们学习了如何使用_PASS_DISTINCT_THROUGH_查询提示来避免这种行为。</p><p>如常，源代码可在GitHub上获得。</p>`,22),o=[i];function p(c,l){return t(),s("div",null,o)}const u=n(a,[["render",p],["__file","2024-07-19-Distinct Queries in HQL.html.vue"]]),_=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Distinct%20Queries%20in%20HQL.html","title":"HQL中的不同查询","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","HQL"],"tag":["HQL","DISTINCT"],"head":[["meta",{"name":"keywords","content":"HQL, DISTINCT, SQL, Hibernate, 查询优化"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Distinct%20Queries%20in%20HQL.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"HQL中的不同查询"}],["meta",{"property":"og:description","content":"HQL中的不同查询 在这篇文章中，我们将讨论HQL中的不同查询以及如何在不必要时避免在SQL查询中添加_distinct_关键字。 2. 理解问题 首先，让我们看看我们的数据模型并确定我们想要实现什么。 我们将使用具有一对多关系的_Post_和_Comment_实体对象。我们想要检索一个帖子列表以及它们所有相关的评论。 让我们先尝试以下HQL查询： 这..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T23:35:11.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"HQL"}],["meta",{"property":"article:tag","content":"DISTINCT"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T23:35:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"HQL中的不同查询\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T23:35:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"HQL中的不同查询 在这篇文章中，我们将讨论HQL中的不同查询以及如何在不必要时避免在SQL查询中添加_distinct_关键字。 2. 理解问题 首先，让我们看看我们的数据模型并确定我们想要实现什么。 我们将使用具有一对多关系的_Post_和_Comment_实体对象。我们想要检索一个帖子列表以及它们所有相关的评论。 让我们先尝试以下HQL查询： 这..."},"headers":[{"level":2,"title":"2. 理解问题","slug":"_2-理解问题","link":"#_2-理解问题","children":[]},{"level":2,"title":"3. 在HQL查询中使用_distinct_","slug":"_3-在hql查询中使用-distinct","link":"#_3-在hql查询中使用-distinct","children":[]},{"level":2,"title":"4. 使用_QueryHint_为_distinct_关键字","slug":"_4-使用-queryhint-为-distinct-关键字","link":"#_4-使用-queryhint-为-distinct-关键字","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721432111000,"updatedTime":1721432111000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.71,"words":514},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Distinct Queries in HQL.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>HQL中的不同查询</h1>\\n<p>在这篇文章中，我们将讨论HQL中的不同查询以及如何在不必要时避免在SQL查询中添加_distinct_关键字。</p>\\n<h2>2. 理解问题</h2>\\n<p>首先，让我们看看我们的数据模型并确定我们想要实现什么。</p>\\n<p>我们将使用具有一对多关系的_Post_和_Comment_实体对象。我们想要检索一个帖子列表以及它们所有相关的评论。</p>\\n<p>让我们先尝试以下HQL查询：</p>\\n<div class=\\"language-hql\\" data-ext=\\"hql\\" data-title=\\"hql\\"><pre class=\\"language-hql\\"><code>String hql = \\"SELECT p FROM Post p LEFT JOIN FETCH p.comments\\";\\nList``&lt;Post&gt;`` posts = session.createQuery(hql, Post.class).getResultList();\\n</code></pre></div>","autoDesc":true}');export{u as comp,_ as data};
