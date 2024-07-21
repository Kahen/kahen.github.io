import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CXN34Kw1.js";const p={},e=t('<h1 id="使用spring-data-jpa规范连接表" tabindex="-1"><a class="header-anchor" href="#使用spring-data-jpa规范连接表"><span>使用Spring Data JPA规范连接表</span></a></h1><p>在本简短教程中，我们将讨论Spring Data JPA规范的一个高级特性，它允许我们在创建查询时连接表。</p><p>让我们首先简要回顾一下JPA规范及其用法。</p><p><strong>Spring Data JPA引入了_Specification_接口，允许我们使用可重用的组件创建动态查询。</strong></p><p>在本文的代码示例中，我们将使用_Author_和_Book_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Author</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@Id</span>\n    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">String</span> lastName<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@OneToMany</span><span class="token punctuation">(</span>cascade <span class="token operator">=</span> <span class="token class-name">CascadeType</span><span class="token punctuation">.</span><span class="token constant">ALL</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">List</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">&gt;</span></span>` books<span class="token punctuation">;</span>\n\n    <span class="token comment">// getters and setters</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了为_Author_实体创建动态查询，我们可以使用_Specification_接口的实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AuthorSpecifications</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Specification</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Author</span><span class="token punctuation">&gt;</span></span>```````` <span class="token function">hasFirstNameLike</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token punctuation">(</span>root<span class="token punctuation">,</span> query<span class="token punctuation">,</span> criteriaBuilder<span class="token punctuation">)</span> <span class="token operator">-&gt;</span>\n            criteriaBuilder<span class="token punctuation">.</span><span class="token function">like</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``<span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;firstName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;%&quot;</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token string">&quot;%&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Specification</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Author</span><span class="token punctuation">&gt;</span></span>```````` <span class="token function">hasLastName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token punctuation">(</span>root<span class="token punctuation">,</span> query<span class="token punctuation">,</span> cb<span class="token punctuation">)</span> <span class="token operator">-&gt;</span>\n            cb<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``<span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;lastName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们需要_AuthorRepository_扩展_JpaSpecificationExecutor_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span>\n<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">AuthorsRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Author</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>`<span class="token punctuation">,</span> <span class="token class-name">JpaSpecificationExecutor</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Author</span><span class="token punctuation">&gt;</span></span>```````` <span class="token punctuation">{</span> <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，我们现在可以连接这两个规范，并使用它们创建查询：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenSearchingByLastNameAndFirstNameLike_thenOneAuthorIsReturned</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\n    <span class="token class-name">Specification</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Author</span><span class="token punctuation">&gt;</span></span>```````` specification <span class="token operator">=</span> <span class="token function">hasLastName</span><span class="token punctuation">(</span><span class="token string">&quot;Martin&quot;</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token function">hasFirstNameLike</span><span class="token punctuation">(</span><span class="token string">&quot;Robert&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Author</span><span class="token punctuation">&gt;</span></span>```````` authors <span class="token operator">=</span> repository<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span>specification<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>authors<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasSize</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用jpa规范连接表" tabindex="-1"><a class="header-anchor" href="#_3-使用jpa规范连接表"><span>3. 使用JPA规范连接表</span></a></h2><p>我们可以从数据模型中观察到_Author_实体与_Book_实体共享一对多关系：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@Id</span>\n    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>\n\n    <span class="token comment">// getters and setters</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Criteria Query API允许我们在创建_Specification_时连接这两个表。因此，我们将能够在查询中包含_Book_实体的字段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Specification</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Author</span><span class="token punctuation">&gt;</span></span>```````` <span class="token function">hasBookWithTitle</span><span class="token punctuation">(</span><span class="token class-name">String</span> bookTitle<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>root<span class="token punctuation">,</span> query<span class="token punctuation">,</span> criteriaBuilder<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Join</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">,</span> <span class="token class-name">Author</span><span class="token punctuation">&gt;</span></span>` authorsBook <span class="token operator">=</span> root<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&quot;books&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> criteriaBuilder<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span>authorsBook<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;title&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> bookTitle<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们将这个新的Specification与之前创建的Specification结合起来：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenSearchingByBookTitleAndAuthorName_thenOneAuthorIsReturned</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\n    <span class="token class-name">Specification</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Author</span><span class="token punctuation">&gt;</span></span>```````` specification <span class="token operator">=</span> <span class="token function">hasLastName</span><span class="token punctuation">(</span><span class="token string">&quot;Martin&quot;</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token function">hasBookWithTitle</span><span class="token punctuation">(</span><span class="token string">&quot;Clean Code&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Author</span><span class="token punctuation">&gt;</span></span>```````` authors <span class="token operator">=</span> repository<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span>specification<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>authors<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasSize</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们看看生成的SQL并查看_JOIN_子句：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">select</span>\n  author0_<span class="token punctuation">.</span>id <span class="token keyword">as</span> id1_1_<span class="token punctuation">,</span>\n  author0_<span class="token punctuation">.</span>first_name <span class="token keyword">as</span> first_na2_1_<span class="token punctuation">,</span>\n  author0_<span class="token punctuation">.</span>last_name <span class="token keyword">as</span> last_nam3_1_\n<span class="token keyword">from</span>\n  author author0_\n  <span class="token keyword">inner</span> <span class="token keyword">join</span> author_books books1_ <span class="token keyword">on</span> author0_<span class="token punctuation">.</span>id <span class="token operator">=</span> books1_<span class="token punctuation">.</span>author_id\n  <span class="token keyword">inner</span> <span class="token keyword">join</span> book book2_ <span class="token keyword">on</span> books1_<span class="token punctuation">.</span>books_id <span class="token operator">=</span> book2_<span class="token punctuation">.</span>id\n<span class="token keyword">where</span>\n  author0_<span class="token punctuation">.</span>last_name <span class="token operator">=</span> ?\n  <span class="token operator">and</span> book2_<span class="token punctuation">.</span>title <span class="token operator">=</span> ?\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们学习了如何使用JPA规范根据其关联实体之一查询表。</p><p>Spring Data JPA的规范提供了一种流畅、动态和可重用的方式来创建查询。</p><p>如常，源代码可在GitHub上获得。</p>',25),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-18-Joining Tables With Spring Data JPA Specifications.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Joining%20Tables%20With%20Spring%20Data%20JPA%20Specifications.html","title":"使用Spring Data JPA规范连接表","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["spring","jpa"],"tag":["spring data jpa","jpa specifications"],"head":[["meta",{"name":"keywords","content":"spring data jpa, jpa specifications, table join"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Joining%20Tables%20With%20Spring%20Data%20JPA%20Specifications.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Spring Data JPA规范连接表"}],["meta",{"property":"og:description","content":"使用Spring Data JPA规范连接表 在本简短教程中，我们将讨论Spring Data JPA规范的一个高级特性，它允许我们在创建查询时连接表。 让我们首先简要回顾一下JPA规范及其用法。 Spring Data JPA引入了_Specification_接口，允许我们使用可重用的组件创建动态查询。 在本文的代码示例中，我们将使用_Author..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T19:15:08.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"spring data jpa"}],["meta",{"property":"article:tag","content":"jpa specifications"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T19:15:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Spring Data JPA规范连接表\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T19:15:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Spring Data JPA规范连接表 在本简短教程中，我们将讨论Spring Data JPA规范的一个高级特性，它允许我们在创建查询时连接表。 让我们首先简要回顾一下JPA规范及其用法。 Spring Data JPA引入了_Specification_接口，允许我们使用可重用的组件创建动态查询。 在本文的代码示例中，我们将使用_Author..."},"headers":[{"level":2,"title":"3. 使用JPA规范连接表","slug":"_3-使用jpa规范连接表","link":"#_3-使用jpa规范连接表","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721330108000,"updatedTime":1721330108000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.91,"words":572},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Joining Tables With Spring Data JPA Specifications.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本简短教程中，我们将讨论Spring Data JPA规范的一个高级特性，它允许我们在创建查询时连接表。</p>\\n<p>让我们首先简要回顾一下JPA规范及其用法。</p>\\n<p><strong>Spring Data JPA引入了_Specification_接口，允许我们使用可重用的组件创建动态查询。</strong></p>\\n<p>在本文的代码示例中，我们将使用_Author_和_Book_类：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Entity</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Author</span> <span class=\\"token punctuation\\">{</span>\\n\\n    <span class=\\"token annotation punctuation\\">@Id</span>\\n    <span class=\\"token annotation punctuation\\">@GeneratedValue</span><span class=\\"token punctuation\\">(</span>strategy <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">GenerationType</span><span class=\\"token punctuation\\">.</span><span class=\\"token constant\\">IDENTITY</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">Long</span> id<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> firstName<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> lastName<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token annotation punctuation\\">@OneToMany</span><span class=\\"token punctuation\\">(</span>cascade <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">CascadeType</span><span class=\\"token punctuation\\">.</span><span class=\\"token constant\\">ALL</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">List</span>`<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">Book</span><span class=\\"token punctuation\\">&gt;</span></span>` books<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">// getters and setters</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
