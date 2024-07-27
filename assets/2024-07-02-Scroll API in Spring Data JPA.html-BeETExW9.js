import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CJGTm_7y.js";const p={},e=t('<h1 id="spring-data-jpa-中的滚动api" tabindex="-1"><a class="header-anchor" href="#spring-data-jpa-中的滚动api"><span>Spring Data JPA 中的滚动API</span></a></h1><p>Spring Data Commons 是 Spring Data 项目的一部分，包含了用于管理持久层的接口和实现。滚动API是 Spring Data Commons 提供的一个功能，用于处理从数据库读取的大型结果集。</p><p>在本教程中，我们将通过一个示例来探索滚动API。</p><h2 id="_2-依赖" tabindex="-1"><a class="header-anchor" href="#_2-依赖"><span>2. 依赖</span></a></h2><p>滚动API支持是在 Spring Boot 3.1 版本中添加的。Spring Data Commons 已经包含在 Spring Data JPA 中。因此，添加 Spring Data JPA 3.1 版本就足以获得滚动API的功能：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`org.springframework.data`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`spring-data-jpa`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`3.1.0`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以在 Maven Central 仓库中找到最新的库版本。</p><h2 id="_3-实体类" tabindex="-1"><a class="header-anchor" href="#_3-实体类"><span>3. 实体类</span></a></h2><p>为了示例，我们将使用 <em>BookReview</em> 实体，它包含了不同用户对不同书籍的评论评级：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>\n<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>name<span class="token operator">=</span><span class="token string">&quot;BOOK_REVIEWS&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BookReview</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Id</span>\n    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy<span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">SEQUENCE</span><span class="token punctuation">,</span> generator <span class="token operator">=</span> <span class="token string">&quot;book_reviews_reviews_id_seq&quot;</span><span class="token punctuation">)</span>\n    <span class="token annotation punctuation">@SequenceGenerator</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;book_reviews_reviews_id_seq&quot;</span><span class="token punctuation">,</span> sequenceName <span class="token operator">=</span> <span class="token string">&quot;book_reviews_reviews_id_seq&quot;</span><span class="token punctuation">,</span> allocationSize <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">Long</span> reviewsId<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> userId<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> isbn<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> bookRating<span class="token punctuation">;</span>\n\n    <span class="token comment">// getters and setters</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>滚动API提供了按块迭代大型结果的功能。</strong> <strong>它提供了稳定的排序、滚动类型和结果限制。</strong></p><p>我们可以使用属性名称定义简单的排序表达式，并通过查询派生定义静态结果限制，使用 <em>Top</em> 或 <em>First</em>。</p><h3 id="_4-1-使用偏移量过滤进行滚动" tabindex="-1"><a class="header-anchor" href="#_4-1-使用偏移量过滤进行滚动"><span>4.1. 使用偏移量过滤进行滚动</span></a></h3><p>在以下示例中，我们使用查询派生来找到按评级参数的前五本书，并使用 <em>OffsetScrollPosition</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BookRepository</span> <span class="token keyword">extends</span> <span class="token class-name">Repository</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BookReview</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>` <span class="token punctuation">{</span>\n    <span class="token class-name">Window</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BookReview</span><span class="token punctuation">&gt;</span></span>```````````` <span class="token function">findFirst5ByBookRating</span><span class="token punctuation">(</span><span class="token class-name">String</span> bookRating<span class="token punctuation">,</span> <span class="token class-name">OffsetScrollPosition</span> position<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Window</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BookReview</span><span class="token punctuation">&gt;</span></span>```````````` <span class="token function">findFirst10ByBookRating</span><span class="token punctuation">(</span><span class="token class-name">String</span> bookRating<span class="token punctuation">,</span> <span class="token class-name">OffsetScrollPosition</span> position<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Window</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BookReview</span><span class="token punctuation">&gt;</span></span>```````````` <span class="token function">findFirst3ByBookRating</span><span class="token punctuation">(</span><span class="token class-name">String</span> bookRating<span class="token punctuation">,</span> <span class="token class-name">KeysetScrollPosition</span> position<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于我们已经定义了我们的仓库方法，我们可以在逻辑类中使用它们来获取前五本书，并持续迭代直到我们到达最后一个结果。</p><p>在迭代过程中，我们需要检查下一个窗口的存在，通过查询它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">List</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BookReview</span><span class="token punctuation">&gt;</span></span>```````````` <span class="token function">getBooksUsingOffset</span><span class="token punctuation">(</span><span class="token class-name">String</span> rating<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">OffsetScrollPosition</span> offset <span class="token operator">=</span> <span class="token class-name">ScrollPosition</span><span class="token punctuation">.</span><span class="token function">offset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Window</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BookReview</span><span class="token punctuation">&gt;</span></span>```````````` bookReviews <span class="token operator">=</span> bookRepository<span class="token punctuation">.</span><span class="token function">findFirst5ByBookRating</span><span class="token punctuation">(</span>rating<span class="token punctuation">,</span> offset<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">List</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BookReview</span><span class="token punctuation">&gt;</span></span>```````````` bookReviewsResult <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">do</span> <span class="token punctuation">{</span>\n        bookReviews<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>bookReviewsResult<span class="token operator">::</span><span class="token function">add</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        bookReviews <span class="token operator">=</span> bookRepository<span class="token punctuation">.</span><span class="token function">findFirst5ByBookRating</span><span class="token punctuation">(</span>rating<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token class-name">OffsetScrollPosition</span><span class="token punctuation">)</span> bookReviews<span class="token punctuation">.</span><span class="token function">positionAt</span><span class="token punctuation">(</span>bookReviews<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>bookReviews<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> bookReviews<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> bookReviewsResult<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们可以通过使用 <em>WindowIterator</em> 来简化我们的逻辑</strong>，它提供了滚动浏览大型结果的实用工具，无需检查下一个窗口和 <em>ScrollPosition</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">List</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BookReview</span><span class="token punctuation">&gt;</span></span>```````````` <span class="token function">getBooksUsingOffSetFilteringAndWindowIterator</span><span class="token punctuation">(</span><span class="token class-name">String</span> rating<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">WindowIterator</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BookReview</span><span class="token punctuation">&gt;</span></span>```````````` bookReviews <span class="token operator">=</span> <span class="token class-name">WindowIterator</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>position <span class="token operator">-&gt;</span>\n        bookRepository<span class="token punctuation">.</span><span class="token function">findFirst5ByBookRating</span><span class="token punctuation">(</span><span class="token string">&quot;3.5&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token class-name">OffsetScrollPosition</span><span class="token punctuation">)</span> position<span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">startingAt</span><span class="token punctuation">(</span><span class="token class-name">ScrollPosition</span><span class="token punctuation">.</span><span class="token function">offset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">List</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BookReview</span><span class="token punctuation">&gt;</span></span>```````````` bookReviewsResult <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    bookReviews<span class="token punctuation">.</span><span class="token function">forEachRemaining</span><span class="token punctuation">(</span>bookReviewsResult<span class="token operator">::</span><span class="token function">add</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> bookReviewsResult<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>偏移滚动类似于分页，通过从大型结果中跳过一定数量的记录来返回预期的结果。</strong> 虽然我们只看到了请求结果的一部分，但服务器需要构建完整的结果，这会导致额外的负载。</p><p>我们可以使用键集过滤来避免这种行为。</p><h3 id="_4-2-使用键集过滤进行滚动" tabindex="-1"><a class="header-anchor" href="#_4-2-使用键集过滤进行滚动"><span>4.2. 使用键集过滤进行滚动</span></a></h3><p>键集过滤帮助使用数据库的内置能力检索结果的子集，目的是<strong>减少单个查询的计算和IO需求</strong>。</p><p>数据库只需要从给定的键集位置构建较小的结果，而不需要实现大型完整结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">List</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BookReview</span><span class="token punctuation">&gt;</span></span>```````````` <span class="token function">getBooksUsingKeySetFiltering</span><span class="token punctuation">(</span><span class="token class-name">String</span> rating<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">WindowIterator</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BookReview</span><span class="token punctuation">&gt;</span></span>```````````` bookReviews <span class="token operator">=</span> <span class="token class-name">WindowIterator</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>position <span class="token operator">-&gt;</span>\n        bookRepository<span class="token punctuation">.</span><span class="token function">findFirst5ByBookRating</span><span class="token punctuation">(</span>rating<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token class-name">KeysetScrollPosition</span><span class="token punctuation">)</span> position<span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">startingAt</span><span class="token punctuation">(</span><span class="token class-name">ScrollPosition</span><span class="token punctuation">.</span><span class="token function">keyset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">List</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BookReview</span><span class="token punctuation">&gt;</span></span>```````````` bookReviewsResult <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    bookReviews<span class="token punctuation">.</span><span class="token function">forEachRemaining</span><span class="token punctuation">(</span>bookReviewsResult<span class="token operator">::</span><span class="token function">add</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> bookReviewsResult<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探索了 Spring Data Commons 库提供的滚动API。滚动API支持基于偏移位置和过滤条件读取大型结果的小部分。</p><p><strong>滚动API支持使用偏移和键集进行过滤。</strong> 虽然基于偏移的过滤需要在数据库中实现整个结果，但键集通过构建较小的结果来帮助减少数据库上的计算和IO负载。</p><p>如常，示例代码可在 GitHub 上找到。</p>',30),o=[e];function c(i,l){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-02-Scroll API in Spring Data JPA.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-Scroll%20API%20in%20Spring%20Data%20JPA.html","title":"Spring Data JPA 中的滚动API","lang":"zh-CN","frontmatter":{"date":"2024-07-02T00:00:00.000Z","category":["Spring Data JPA","Scroll API"],"tag":["Spring Data","JPA","Scroll API"],"head":[["meta",{"name":"keywords","content":"Spring Data JPA, Scroll API, Spring Data Commons, 数据库查询, 大数据量处理"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-Scroll%20API%20in%20Spring%20Data%20JPA.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Data JPA 中的滚动API"}],["meta",{"property":"og:description","content":"Spring Data JPA 中的滚动API Spring Data Commons 是 Spring Data 项目的一部分，包含了用于管理持久层的接口和实现。滚动API是 Spring Data Commons 提供的一个功能，用于处理从数据库读取的大型结果集。 在本教程中，我们将通过一个示例来探索滚动API。 2. 依赖 滚动API支持是在 S..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T09:32:07.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Data"}],["meta",{"property":"article:tag","content":"JPA"}],["meta",{"property":"article:tag","content":"Scroll API"}],["meta",{"property":"article:published_time","content":"2024-07-02T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T09:32:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Data JPA 中的滚动API\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-02T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T09:32:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Data JPA 中的滚动API Spring Data Commons 是 Spring Data 项目的一部分，包含了用于管理持久层的接口和实现。滚动API是 Spring Data Commons 提供的一个功能，用于处理从数据库读取的大型结果集。 在本教程中，我们将通过一个示例来探索滚动API。 2. 依赖 滚动API支持是在 S..."},"headers":[{"level":2,"title":"2. 依赖","slug":"_2-依赖","link":"#_2-依赖","children":[]},{"level":2,"title":"3. 实体类","slug":"_3-实体类","link":"#_3-实体类","children":[{"level":3,"title":"4.1. 使用偏移量过滤进行滚动","slug":"_4-1-使用偏移量过滤进行滚动","link":"#_4-1-使用偏移量过滤进行滚动","children":[]},{"level":3,"title":"4.2. 使用键集过滤进行滚动","slug":"_4-2-使用键集过滤进行滚动","link":"#_4-2-使用键集过滤进行滚动","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719912727000,"updatedTime":1719912727000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.13,"words":940},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-Scroll API in Spring Data JPA.md","localizedDate":"2024年7月2日","excerpt":"\\n<p>Spring Data Commons 是 Spring Data 项目的一部分，包含了用于管理持久层的接口和实现。滚动API是 Spring Data Commons 提供的一个功能，用于处理从数据库读取的大型结果集。</p>\\n<p>在本教程中，我们将通过一个示例来探索滚动API。</p>\\n<h2>2. 依赖</h2>\\n<p>滚动API支持是在 Spring Boot 3.1 版本中添加的。Spring Data Commons 已经包含在 Spring Data JPA 中。因此，添加 Spring Data JPA 3.1 版本就足以获得滚动API的功能：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`org.springframework.data`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`spring-data-jpa`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`3.1.0`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
