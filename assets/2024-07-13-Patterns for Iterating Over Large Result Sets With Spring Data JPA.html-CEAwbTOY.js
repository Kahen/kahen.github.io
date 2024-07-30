import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CbPcg273.js";const e={},p=t('<h1 id="使用spring-data-jpa迭代大型结果集的模式" tabindex="-1"><a class="header-anchor" href="#使用spring-data-jpa迭代大型结果集的模式"><span>使用Spring Data JPA迭代大型结果集的模式</span></a></h1><p>在本教程中，我们将<strong>探索使用Spring Data JPA检索大型数据集的各种方式</strong>。</p><p>首先，我们将使用分页查询，并看到_Slice_和_Page_之间的区别。之后，我们将学习如何从数据库流式传输和处理数据，而不需要收集它。</p><h2 id="_2-分页查询" tabindex="-1"><a class="header-anchor" href="#_2-分页查询"><span>2. 分页查询</span></a></h2><p>对于这种情况的常见方法是使用分页查询。为此，<strong>我们需要定义一个批量大小并执行多个查询</strong>。结果，我们将能够以较小的批量处理所有实体，避免在内存中加载大量数据。</p><p>对于本文中的代码示例，我们将使用_Student_实体作为数据模型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@Id</span>\n    <span class="token annotation punctuation">@GeneratedValue</span>\n    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> lastName<span class="token punctuation">;</span>\n\n    <span class="token comment">// 构造函数，getter和setter</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们添加一个按_firstName_查询所有学生的方法。使用Spring Data JPA，我们只需要在_JpaRepository_中添加一个接收_Pageable_作为参数并返回_Slice_的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span>\n<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">StudentRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>`` <span class="token punctuation">{</span>\n    <span class="token class-name">Slice</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">&gt;</span></span>```````` <span class="token function">findAllByFirstName</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">,</span> <span class="token class-name">Pageable</span> page<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们可以注意到返回类型是_Slice<code>&lt;Student&gt;</code>_。_Slice_对象允许我们处理第一批_Student_实体。</strong> _slice_对象公开了一个_hasNext()_方法，允许我们检查我们正在处理的批次是否是结果集的最后一个。</p><p>此外，我们可以通过方法_nextPageable()_从一个切片移动到下一个切片。这个方法返回了请求下一个切片所需的_Pageable_对象。因此，我们可以使用while循环内的两种方法组合，逐片检索所有数据：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">processStudentsByFirstName</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Slice</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">&gt;</span></span>```````` slice <span class="token operator">=</span> repository<span class="token punctuation">.</span><span class="token function">findAllByFirstName</span><span class="token punctuation">(</span>firstName<span class="token punctuation">,</span> <span class="token class-name">PageRequest</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token constant">BATCH_SIZE</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">&gt;</span></span>```````` studentsInBatch <span class="token operator">=</span> slice<span class="token punctuation">.</span><span class="token function">getContent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    studentsInBatch<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>emailService<span class="token operator">::</span><span class="token function">sendEmailToStudent</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">while</span><span class="token punctuation">(</span>slice<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        slice <span class="token operator">=</span> repository<span class="token punctuation">.</span><span class="token function">findAllByFirstName</span><span class="token punctuation">(</span>firstName<span class="token punctuation">,</span> slice<span class="token punctuation">.</span><span class="token function">nextPageable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        slice<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>emailService<span class="token operator">::</span><span class="token function">sendEmailToStudent</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们使用小批量大小进行简短的测试，并跟踪SQL语句。我们期望执行多个查询：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token punctuation">[</span>main<span class="token punctuation">]</span> DEBUG org<span class="token punctuation">.</span>hibernate<span class="token punctuation">.</span><span class="token keyword">SQL</span> <span class="token operator">-</span> <span class="token keyword">select</span> student0_<span class="token punctuation">.</span>id <span class="token keyword">as</span> id1_0_<span class="token punctuation">,</span> student0_<span class="token punctuation">.</span>first_name <span class="token keyword">as</span> first_na2_0_<span class="token punctuation">,</span> student0_<span class="token punctuation">.</span>last_name <span class="token keyword">as</span> last_nam3_0_ <span class="token keyword">from</span> student student0_ <span class="token keyword">where</span> student0_<span class="token punctuation">.</span>first_name<span class="token operator">=</span>? <span class="token keyword">limit</span> ?\n<span class="token punctuation">[</span>main<span class="token punctuation">]</span> DEBUG org<span class="token punctuation">.</span>hibernate<span class="token punctuation">.</span><span class="token keyword">SQL</span> <span class="token operator">-</span> <span class="token keyword">select</span> student0_<span class="token punctuation">.</span>id <span class="token keyword">as</span> id1_0_<span class="token punctuation">,</span> student0_<span class="token punctuation">.</span>first_name <span class="token keyword">as</span> first_na2_0_<span class="token punctuation">,</span> student0_<span class="token punctuation">.</span>last_name <span class="token keyword">as</span> last_nam3_0_ <span class="token keyword">from</span> student student0_ <span class="token keyword">where</span> student0_<span class="token punctuation">.</span>first_name<span class="token operator">=</span>? <span class="token keyword">limit</span> ? <span class="token keyword">offset</span> ?\n<span class="token punctuation">[</span>main<span class="token punctuation">]</span> DEBUG org<span class="token punctuation">.</span>hibernate<span class="token punctuation">.</span><span class="token keyword">SQL</span> <span class="token operator">-</span> <span class="token keyword">select</span> student0_<span class="token punctuation">.</span>id <span class="token keyword">as</span> id1_0_<span class="token punctuation">,</span> student0_<span class="token punctuation">.</span>first_name <span class="token keyword">as</span> first_na2_0_<span class="token punctuation">,</span> student0_<span class="token punctuation">.</span>last_name <span class="token keyword">as</span> last_nam3_0_ <span class="token keyword">from</span> student student0_ <span class="token keyword">where</span> student0_<span class="token punctuation">.</span>first_name<span class="token operator">=</span>? <span class="token keyword">limit</span> ? <span class="token keyword">offset</span> ?\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>作为_Slice_ <code>&lt; &gt;</code>的替代品，我们还可以使用_Page_ <code>&lt; &gt;</code>作为查询的返回类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span>\n<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">StudentRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>`` <span class="token punctuation">{</span>\n    <span class="token class-name">Slice</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">&gt;</span></span>```````` <span class="token function">findAllByFirstName</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">,</span> <span class="token class-name">Pageable</span> page<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Page</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">&gt;</span></span>```````` <span class="token function">findAllByLastName</span><span class="token punctuation">(</span><span class="token class-name">String</span> lastName<span class="token punctuation">,</span> <span class="token class-name">Pageable</span> page<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>_Page_接口扩展了_Slice,_并添加了另外两个方法：_getTotalPages()<em>和_getTotalElements()</em>。</strong></p><p>_Page_通常用作通过网络请求分页数据时的返回类型。这样，调用者将确切知道还剩下多少行以及需要多少额外的请求。</p><p>另一方面，使用_Page_ s作为返回类型会导致额外的查询来计数符合标准的行：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token punctuation">[</span>main<span class="token punctuation">]</span> DEBUG org<span class="token punctuation">.</span>hibernate<span class="token punctuation">.</span><span class="token keyword">SQL</span> <span class="token operator">-</span> <span class="token keyword">select</span> student0_<span class="token punctuation">.</span>id <span class="token keyword">as</span> id1_0_<span class="token punctuation">,</span> student0_<span class="token punctuation">.</span>first_name <span class="token keyword">as</span> first_na2_0_<span class="token punctuation">,</span> student0_<span class="token punctuation">.</span>last_name <span class="token keyword">as</span> last_nam3_0_ <span class="token keyword">from</span> student student0_ <span class="token keyword">where</span> student0_<span class="token punctuation">.</span>last_name<span class="token operator">=</span>? <span class="token keyword">limit</span> ?\n<span class="token punctuation">[</span>main<span class="token punctuation">]</span> DEBUG org<span class="token punctuation">.</span>hibernate<span class="token punctuation">.</span><span class="token keyword">SQL</span> <span class="token operator">-</span> <span class="token keyword">select</span> <span class="token function">count</span><span class="token punctuation">(</span>student0_<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token keyword">as</span> col_0_0_ <span class="token keyword">from</span> student student0_ <span class="token keyword">where</span> student0_<span class="token punctuation">.</span>last_name<span class="token operator">=</span>?\n<span class="token punctuation">[</span>main<span class="token punctuation">]</span> DEBUG org<span class="token punctuation">.</span>hibernate<span class="token punctuation">.</span><span class="token keyword">SQL</span> <span class="token operator">-</span> <span class="token keyword">select</span> student0_<span class="token punctuation">.</span>id <span class="token keyword">as</span> id1_0_<span class="token punctuation">,</span> student0_<span class="token punctuation">.</span>first_name <span class="token keyword">as</span> first_na2_0_<span class="token punctuation">,</span> student0_<span class="token punctuation">.</span>last_name <span class="token keyword">as</span> last_nam3_0_ <span class="token keyword">from</span> student student0_ <span class="token keyword">where</span> student0_<span class="token punctuation">.</span>last_name<span class="token operator">=</span>? <span class="token keyword">limit</span> ? <span class="token keyword">offset</span> ?\n<span class="token punctuation">[</span>main<span class="token punctuation">]</span> DEBUG org<span class="token punctuation">.</span>hibernate<span class="token punctuation">.</span><span class="token keyword">SQL</span> <span class="token operator">-</span> <span class="token keyword">select</span> <span class="token function">count</span><span class="token punctuation">(</span>student0_<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token keyword">as</span> col_0_0_ <span class="token keyword">from</span> student student0_ <span class="token keyword">where</span> student0_<span class="token punctuation">.</span>last_name<span class="token operator">=</span>?\n<span class="token punctuation">[</span>main<span class="token punctuation">]</span> DEBUG org<span class="token punctuation">.</span>hibernate<span class="token punctuation">.</span><span class="token keyword">SQL</span> <span class="token operator">-</span> <span class="token keyword">select</span> student0_<span class="token punctuation">.</span>id <span class="token keyword">as</span> id1_0_<span class="token punctuation">,</span> student0_<span class="token punctuation">.</span>first_name <span class="token keyword">as</span> first_na2_0_<span class="token punctuation">,</span> student0_<span class="token punctuation">.</span>last_name <span class="token keyword">as</span> last_nam3_0_ <span class="token keyword">from</span> student student0_ <span class="token keyword">where</span> student0_<span class="token punctuation">.</span>last_name<span class="token operator">=</span>? <span class="token keyword">limit</span> ? <span class="token keyword">offset</span> ?\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>因此，我们只有在需要知道实体总数时才应该使用Page <code>&lt; &gt;</code>作为返回类型。</strong></p><h2 id="_3-从数据库流式传输" tabindex="-1"><a class="header-anchor" href="#_3-从数据库流式传输"><span>3. 从数据库流式传输</span></a></h2><p>Spring Data JPA还允许我们从结果集流式传输数据：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Stream</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">&gt;</span></span>```````` <span class="token function">findAllByFirstName</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>结果，我们将逐个处理实体，而不需要同时将它们全部加载到内存中。</strong> 然而，我们需要手动关闭由Spring Data JPA创建的流，使用try-with-resource块。此外，我们必须将查询包装在只读事务中。</p><p>最后，即使我们逐行处理，我们也必须确保持久性上下文没有保留对所有实体的引用。我们可以通过在消费流之前手动分离实体来实现这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">EntityManager</span> entityManager<span class="token punctuation">;</span>\n\n<span class="token annotation punctuation">@Transactional</span><span class="token punctuation">(</span>readOnly <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">processStudentsByFirstNameUsingStreams</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Stream</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">&gt;</span></span>```````` students <span class="token operator">=</span> repository<span class="token punctuation">.</span><span class="token function">findAllByFirstName</span><span class="token punctuation">(</span>firstName<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        students<span class="token punctuation">.</span><span class="token function">peek</span><span class="token punctuation">(</span>entityManager<span class="token operator">::</span><span class="token function">detach</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>emailService<span class="token operator">::</span><span class="token function">sendEmailToStudent</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们探讨了处理大型数据集的各种方式。最初，我们通过多个分页查询实现了这一点。我们了解到，当调用者需要知道元素总数时，应使用_Page <code>&lt; &gt;</code><em>作为返回类型，否则使用_Slice <code>&lt; &gt;</code></em>。之后，我们学习了如何从数据库流式传输行并逐个处理它们。</p><p>如往常一样，代码示例可以在GitHub上找到。</p>',30),o=[p];function c(l,i){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-13-Patterns for Iterating Over Large Result Sets With Spring Data JPA.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Patterns%20for%20Iterating%20Over%20Large%20Result%20Sets%20With%20Spring%20Data%20JPA.html","title":"使用Spring Data JPA迭代大型结果集的模式","lang":"zh-CN","frontmatter":{"date":"2024-07-14T00:00:00.000Z","category":["Spring Data JPA","数据库操作"],"tag":["分页查询","大数据集处理","流式处理"],"head":[["meta",{"name":"keywords","content":"Spring Data JPA, 大数据集, 分页, 流式处理, 数据库操作"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Patterns%20for%20Iterating%20Over%20Large%20Result%20Sets%20With%20Spring%20Data%20JPA.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Spring Data JPA迭代大型结果集的模式"}],["meta",{"property":"og:description","content":"使用Spring Data JPA迭代大型结果集的模式 在本教程中，我们将探索使用Spring Data JPA检索大型数据集的各种方式。 首先，我们将使用分页查询，并看到_Slice_和_Page_之间的区别。之后，我们将学习如何从数据库流式传输和处理数据，而不需要收集它。 2. 分页查询 对于这种情况的常见方法是使用分页查询。为此，我们需要定义一个..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T23:39:57.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"分页查询"}],["meta",{"property":"article:tag","content":"大数据集处理"}],["meta",{"property":"article:tag","content":"流式处理"}],["meta",{"property":"article:published_time","content":"2024-07-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T23:39:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Spring Data JPA迭代大型结果集的模式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-14T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T23:39:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Spring Data JPA迭代大型结果集的模式 在本教程中，我们将探索使用Spring Data JPA检索大型数据集的各种方式。 首先，我们将使用分页查询，并看到_Slice_和_Page_之间的区别。之后，我们将学习如何从数据库流式传输和处理数据，而不需要收集它。 2. 分页查询 对于这种情况的常见方法是使用分页查询。为此，我们需要定义一个..."},"headers":[{"level":2,"title":"2. 分页查询","slug":"_2-分页查询","link":"#_2-分页查询","children":[]},{"level":2,"title":"3. 从数据库流式传输","slug":"_3-从数据库流式传输","link":"#_3-从数据库流式传输","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720913997000,"updatedTime":1720913997000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.87,"words":1162},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Patterns for Iterating Over Large Result Sets With Spring Data JPA.md","localizedDate":"2024年7月14日","excerpt":"\\n<p>在本教程中，我们将<strong>探索使用Spring Data JPA检索大型数据集的各种方式</strong>。</p>\\n<p>首先，我们将使用分页查询，并看到_Slice_和_Page_之间的区别。之后，我们将学习如何从数据库流式传输和处理数据，而不需要收集它。</p>\\n<h2>2. 分页查询</h2>\\n<p>对于这种情况的常见方法是使用分页查询。为此，<strong>我们需要定义一个批量大小并执行多个查询</strong>。结果，我们将能够以较小的批量处理所有实体，避免在内存中加载大量数据。</p>\\n<p>对于本文中的代码示例，我们将使用_Student_实体作为数据模型：</p>","autoDesc":true}');export{k as comp,d as data};
