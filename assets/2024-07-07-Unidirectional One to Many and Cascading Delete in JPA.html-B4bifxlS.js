import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-2zDpbLgD.js";const e={},p=t(`<h1 id="jpa中单向一对多关系及级联删除" tabindex="-1"><a class="header-anchor" href="#jpa中单向一对多关系及级联删除"><span>JPA中单向一对多关系及级联删除</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将探索JPA在执行单向一对多关系实体之间的级联删除功能。我们将简要解释在此背景下级联删除的含义。然后，我们将使用一个简单的例子来演示JPA如何实现所需的结果。最后，我们将在内存H2数据库上进行集成测试，以验证该过程是否正确工作。</p><h2 id="_2-单向一对多关系" tabindex="-1"><a class="header-anchor" href="#_2-单向一对多关系"><span>2. 单向一对多关系</span></a></h2><p>从本质上讲，在关系数据模型中，单向一对多关系是两种表之间的一种关系类型，其中一个表在另一个表中有多个相关记录。然而，第二个表并不直接与第一个表相关。这意味着关系只在一个方向上流动。</p><p>转到JPA，当一个实体对相关实体的集合有引用时，可以建立两个实体之间的单向一对多关系。然而，我们不能从相关实体回溯到第一个实体。通常，包含引用的实体称为父实体，被引用的实体称为子实体。</p><p>让我们考虑文章及其评论的例子。正如我们可以想象的，一篇文章可以有多个相关评论，但一个评论只能属于一篇文章。这里，<em>Article</em> 是父实体，<em>Comment</em> 是子实体。</p><p>现在，让我们设置代表_Article_和_Comment_的JPA实体：</p><p>我们希望_Article_能够引用其所有评论以及其他字段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Article</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">AUTO</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">long</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@OneToMany</span>
    <span class="token keyword">private</span> <span class="token class-name">Set</span>\`\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Comment</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\`\` comments <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//...setters and getters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们向_Article_实体添加了_Set<code>&lt;Comment&gt;</code><em>并用</em>@OneToMany_进行了注解。这向JPA表明了_Article_和_Comment_之间的单向一对多关系。JPA将自动生成支持这种关系所需的数据库架构。</p><p>接下来，让我们定义_Comment_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Comment</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">AUTO</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">long</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> description<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Date</span> date<span class="token punctuation">;</span>

    <span class="token comment">//...setters and getters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到_Comment_实体内部没有对_Article_的引用。因此，我们的例子代表了单向关系。</p><p><strong>在上面的例子中，如果我们决定删除_Article_，与其相关的任何_Comment_将被留下作为悬挂引用或孤立对象。</strong></p><p>为了解决这个问题，JPA提供了一些属性，可以用来传播删除并清理孤立对象。</p><p>让我们扩展我们在_Article_对象中已经建立的_Set<code>&lt;Comment&gt;</code><em>上的</em>@OneToMany_注解。这个注解也可以与几个选项一起使用，以自定义关系映射和行为。<strong>对于级联删除有用的选项是_cascade_</strong>。<strong>本上，_cascade_允许我们定义哪些操作（持久化，合并，删除）在父实体上应该被级联到相关子实体上</strong>。</p><p><strong>JPA还提供了一个设置所有操作的级联级别的选项。这被称为_CascadingType.All_</strong>。<strong>如果我们只想在删除父实体时级联删除子实体，那么我们可以使用方法_CascadingType.Remove_。</strong></p><p><strong>我们将与级联一起使用的第二个选项是_orphanRemoval_。</strong></p><p>让我们利用JPA提供的这两种选项，结合我们之前建立的_@OneToMany_注解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Article</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">AUTO</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">long</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@OneToMany</span><span class="token punctuation">(</span>cascade <span class="token operator">=</span> <span class="token class-name">CascadeType</span><span class="token punctuation">.</span><span class="token constant">ALL</span><span class="token punctuation">,</span> orphanRemoval <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Set</span>\`\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Comment</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\`\` comments <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

   <span class="token comment">//...setters and getters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>除了使用_CascadeType.All_或_CascadeType.remove_，设置_orphanRemoval_属性为true以确保正确删除孤立实体也是至关重要的。有了这个属性设置，JPA会自动从数据库中删除任何孤立实体</strong>。通过使用级联删除.All或级联删除.Remove与OrphanedRemoval=true；我们可以高效地管理数据，维护数据完整性，并促进自动删除过时的引用和数据库清理。</p><h2 id="_4-集成测试" tabindex="-1"><a class="header-anchor" href="#_4-集成测试"><span>4. 集成测试</span></a></h2><p>让我们使用内存H2数据库测试我们的级联删除，假设我们已经设置了服务和JPA存储库层。主要的，我们将测试当删除_Article_时，其相关的_Comments_是否自动被删除。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token annotation punctuation">@Transactional</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAnArticleAndItsComments_whenDeleteArticle_thenCommentsDeletedAutomatically</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token class-name">Set</span>\`\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Comment</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\`\` comments <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Article</span> article <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    article<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;introduction to Spring&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Comment</span> comment1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Comment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    comment1<span class="token punctuation">.</span><span class="token function">setDescription</span><span class="token punctuation">(</span><span class="token string">&quot;Explain types of Autowired&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    comment1<span class="token punctuation">.</span><span class="token function">setDate</span><span class="token punctuation">(</span><span class="token class-name">Date</span><span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Comment</span> comment2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Comment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    comment2<span class="token punctuation">.</span><span class="token function">setDescription</span><span class="token punctuation">(</span><span class="token string">&quot;Good article&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    comment2<span class="token punctuation">.</span><span class="token function">setDate</span><span class="token punctuation">(</span><span class="token class-name">Date</span><span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">minus</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token class-name">ChronoUnit</span><span class="token punctuation">.</span><span class="token constant">MINUTES</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    comments<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>comment1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    comments<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>comment2<span class="token punctuation">)</span><span class="token punctuation">;</span>

    article<span class="token punctuation">.</span><span class="token function">setComments</span><span class="token punctuation">(</span>comments<span class="token punctuation">)</span><span class="token punctuation">;</span>
    articleRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>article<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>\` articles <span class="token operator">=</span> articleRepository<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>articles<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Article</span> retrievedArticle <span class="token operator">=</span> articles<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">List</span>\`\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Comment</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\`\` fetchedComments <span class="token operator">=</span> commentRepository<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>fetchedComments<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    articleService<span class="token punctuation">.</span><span class="token function">deleteArticle</span><span class="token punctuation">(</span>retrievedArticle<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>articleRepository<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>commentRepository<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们可以看到级联删除在起作用。在我们使用_articleService.deleteArticle(retrievedArticle)<em>删除_Article_之后，然后使用_commentRepository.findAll()<em>检索评论，我们得到一个空列表，这意味着所有评论都已通过从_Article</em>（父）到_Comment</em>（子）的级联删除被删除。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们简要概述了级联删除，重点关注单向一对多关系。我们查看了JPA提供的_@OneToMany_注解中的_cascade_和_orphan removal_选项，以实现级联删除和数据库中的数据完整性。<strong>我们查看了_CascadeType.All_和_CascadeType.Remove_以实现当父实体被删除时相关子实体的级联删除</strong>。<strong>此外，我们还强调了使用_OrphanRemoval_选项的重要性，以确保数据库记录按要求被删除</strong>。</p><p>最后，我们设置了一个Spring Boot集成测试，以查看级联删除的实际效果。</p><p>如往常一样，文章的完整源代码可在GitHub上获得。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/ba372319eaeba50279f8ab63c58e438d?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>`,32),o=[p];function c(l,i){return a(),s("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-07-Unidirectional One to Many and Cascading Delete in JPA.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-Unidirectional%20One%20to%20Many%20and%20Cascading%20Delete%20in%20JPA.html","title":"JPA中单向一对多关系及级联删除","lang":"zh-CN","frontmatter":{"date":"2024-07-08T00:00:00.000Z","category":["Spring JPA","数据库"],"tag":["JPA","级联删除","单向一对多"],"head":[["meta",{"name":"keywords","content":"Spring JPA, 级联删除, 单向一对多关系, 数据库完整性"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-Unidirectional%20One%20to%20Many%20and%20Cascading%20Delete%20in%20JPA.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"JPA中单向一对多关系及级联删除"}],["meta",{"property":"og:description","content":"JPA中单向一对多关系及级联删除 1. 引言 在本教程中，我们将探索JPA在执行单向一对多关系实体之间的级联删除功能。我们将简要解释在此背景下级联删除的含义。然后，我们将使用一个简单的例子来演示JPA如何实现所需的结果。最后，我们将在内存H2数据库上进行集成测试，以验证该过程是否正确工作。 2. 单向一对多关系 从本质上讲，在关系数据模型中，单向一对多..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T16:59:14.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JPA"}],["meta",{"property":"article:tag","content":"级联删除"}],["meta",{"property":"article:tag","content":"单向一对多"}],["meta",{"property":"article:published_time","content":"2024-07-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T16:59:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JPA中单向一对多关系及级联删除\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/ba372319eaeba50279f8ab63c58e438d?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2024-07-08T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T16:59:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"JPA中单向一对多关系及级联删除 1. 引言 在本教程中，我们将探索JPA在执行单向一对多关系实体之间的级联删除功能。我们将简要解释在此背景下级联删除的含义。然后，我们将使用一个简单的例子来演示JPA如何实现所需的结果。最后，我们将在内存H2数据库上进行集成测试，以验证该过程是否正确工作。 2. 单向一对多关系 从本质上讲，在关系数据模型中，单向一对多..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 单向一对多关系","slug":"_2-单向一对多关系","link":"#_2-单向一对多关系","children":[]},{"level":2,"title":"4. 集成测试","slug":"_4-集成测试","link":"#_4-集成测试","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720371554000,"updatedTime":1720371554000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.81,"words":1443},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-Unidirectional One to Many and Cascading Delete in JPA.md","localizedDate":"2024年7月8日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将探索JPA在执行单向一对多关系实体之间的级联删除功能。我们将简要解释在此背景下级联删除的含义。然后，我们将使用一个简单的例子来演示JPA如何实现所需的结果。最后，我们将在内存H2数据库上进行集成测试，以验证该过程是否正确工作。</p>\\n<h2>2. 单向一对多关系</h2>\\n<p>从本质上讲，在关系数据模型中，单向一对多关系是两种表之间的一种关系类型，其中一个表在另一个表中有多个相关记录。然而，第二个表并不直接与第一个表相关。这意味着关系只在一个方向上流动。</p>\\n<p>转到JPA，当一个实体对相关实体的集合有引用时，可以建立两个实体之间的单向一对多关系。然而，我们不能从相关实体回溯到第一个实体。通常，包含引用的实体称为父实体，被引用的实体称为子实体。</p>","autoDesc":true}');export{d as comp,k as data};
