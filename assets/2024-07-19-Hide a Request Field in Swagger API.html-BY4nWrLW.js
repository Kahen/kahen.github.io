import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-DfO5Xg_k.js";const t={},p=e(`<h1 id="在swagger-api中隐藏请求字段" tabindex="-1"><a class="header-anchor" href="#在swagger-api中隐藏请求字段"><span>在Swagger API中隐藏请求字段</span></a></h1><p>我们可以将Swagger UI用作一个平台，以方便的方式可视化和与API接口交互。它是一个强大的工具，可以以最少的配置生成API结构。</p><p>在本文中，我们将重点关注使用Swagger与Spring Boot REST API。具体来说，我们将探讨在Swagger UI中隐藏请求字段的不同方法。</p><h2 id="_2-引言" tabindex="-1"><a class="header-anchor" href="#_2-引言"><span>2. 引言</span></a></h2><p>为了简单起见，我们将创建一个基本的Spring Boot应用程序，并使用Swagger UI探索API。</p><p>让我们创建一个简单的_ArticleApplication_，使用Spring Boot。我们使用_ArticlesController_公开两个API。我们希望使用GET API接收与所有文章相关的详细信息。</p><p>另一方面，我们使用POST API添加新文章的详细信息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/articles&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ArticlesController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">ArticleService</span> articleService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">getAllArticles</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> articleService<span class="token punctuation">.</span><span class="token function">getAllArticles</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addArticle</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">Article</span> article<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        articleService<span class="token punctuation">.</span><span class="token function">addArticle</span><span class="token punctuation">(</span>article<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将使用_Article_类作为这些API的数据传输对象（DTO）。现在，让我们在_Article_类中添加一些字段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Article</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> numOfWords<span class="token punctuation">;</span>

    <span class="token comment">// 标准 getter 和 setter</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以在 http://localhost:9090/springbootapp/swagger-ui/index.html#/articles-controller 访问Swagger UI。让我们运行应用程序并查看上述两个API的默认行为：</p><p><img src="https://www.baeldung.com/wp-content/uploads/2022/04/2_BAEL-5329-Img1-e1648650028181.png" alt="img" loading="lazy"> <img src="https://www.baeldung.com/wp-content/uploads/2022/04/2_BAEL-5329-Img2-e1648650100457.png" alt="img" loading="lazy"></p><p>在POST API中，我们接受用户的所有详细信息 - 即_id_、<em>title_和_numOfWords</em>。在GET API中，我们以相同的字段返回响应。我们可以看到，默认情况下，Swagger为两个API显示了所有字段。</p><p>现在，假设我们想使用单独的后端逻辑来设置_id_字段。在这种情况下，我们不希望用户输入与_id_字段相关的信息。为了避免任何混淆，我们希望在Swagger UI中隐藏此字段。</p><p>我们想到的一个直接选项是创建一个单独的DTO并在其中隐藏所需的字段。如果我们想要为DTOs添加额外的逻辑，这种方法可能会有所帮助。如果我们的整体需求适合，我们可以选择使用此选项。</p><p>对于本文，让我们使用不同的注解来隐藏Swagger UI中的字段。</p><h2 id="_3-使用-jsonignore" tabindex="-1"><a class="header-anchor" href="#_3-使用-jsonignore"><span>3. 使用_@JsonIgnore_</span></a></h2><p>_@JsonIgnore_是标准的Jackson注解。我们可以使用它来<strong>指定在序列化和反序列化期间由Jackson忽略的字段</strong>。我们可以将注解添加到要忽略的字段上，<strong>它将隐藏指定字段的getter和setter</strong>。</p><p>让我们尝试一下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@JsonIgnore</span>
<span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们重新运行应用程序并检查Swagger UI：<img src="https://www.baeldung.com/wp-content/uploads/2022/04/BAEL-5329-Img4.png" alt="img" loading="lazy"> <img src="https://www.baeldung.com/wp-content/uploads/2022/04/BAEL-5329-Img-3.png" alt="img" loading="lazy"></p><p>我们可以看到_id_字段在API描述中没有显示。Swagger还提供了注解来实现类似的行为。</p><h2 id="_4-使用-schema" tabindex="-1"><a class="header-anchor" href="#_4-使用-schema"><span>4. 使用_@Schema_</span></a></h2><p><em>@Schema_注解可用于定义OpenAPI规范的一组元素的模式，和/或为模式定义其他属性。它适用于例如_parameters</em>、模式类（即“模型”）、这些模型的属性、请求和响应内容以及头部。我们<strong>可以使用注解的_hidden_属性在Swagger UI中隐藏模型对象定义中的字段</strong>。</p><p>让我们为_id_字段尝试一下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Schema</span><span class="token punctuation">(</span>hidden <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述情况下，我们发现_id_字段在GET和POST API中都被隐藏了。假设我们想允许用户在GET API响应中查看_id_详细信息。在这种情况下，我们需要寻找其他选项。</p><p>Swagger提供了<strong>替代属性_readOnly_</strong>，我们可以使用它来<strong>在更新操作期间隐藏指定字段，但在检索操作期间仍然显示它</strong>。然而，_readOnly_属性现在已弃用，并被**<em>accessMode</em>**属性取代：</p><p>让我们检查一下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Schema</span><span class="token punctuation">(</span>accessMode <span class="token operator">=</span> <span class="token class-name">AccessMode</span><span class="token punctuation">.</span><span class="token constant">READ_ONLY</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们现在检查更新后的Swagger UI：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/04/BAEL-5329-Img5.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们可以看到_id_字段现在在GET API中可见，但在POST API中仍然被隐藏 - 它支持_只读_操作。</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/09/Screenshot-2023-08-31-000305.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_5-使用-jsonproperty" tabindex="-1"><a class="header-anchor" href="#_5-使用-jsonproperty"><span>5. 使用_@JsonProperty_</span></a></h2><p>Jackson提供了_@JsonProperty_注解。我们可以使用它来添加与POJO字段的getter/setter相关的元数据，这些元数据可以在对象的序列化/反序列化期间使用。我们可以<strong>将注解的_access_属性设置为只允许对特定字段进行_读取_操作</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span>access <span class="token operator">=</span> <span class="token class-name">JsonProperty<span class="token punctuation">.</span>Access</span><span class="token punctuation">.</span><span class="token constant">READ_ONLY</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这种方式，我们能够隐藏POST API模型定义中的_id_字段，但仍然可以在GET API响应中显示它。</p><p>让我们探索另一种实现所需功能的途径。</p><h2 id="_6-使用-jsonview" tabindex="-1"><a class="header-anchor" href="#_6-使用-jsonview"><span>6. 使用_@JsonView_</span></a></h2><p>Jackson还提供了_@JsonView_注解，我们可以使用它来实现对类字段的视图限制，相同的限制也将适用于Swagger UI。</p><p>让我们创建一个_Views_类，并创建两个视图 - 公共和私有：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Views</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Public</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Private</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们创建一个新的_Author_类，我们将对其应用我们的限制：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Author</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@JsonView</span><span class="token punctuation">(</span><span class="token class-name">Views<span class="token punctuation">.</span>Private</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> id<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@JsonView</span><span class="token punctuation">(</span><span class="token class-name">Views<span class="token punctuation">.</span>Public</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@JsonView</span><span class="token punctuation">(</span><span class="token class-name">Views<span class="token punctuation">.</span>Public</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> email<span class="token punctuation">;</span>

    <span class="token comment">// 标准 getter 和 setter</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们用_@JsonView(Views.Public.class)_注释了字段 - <em>name_和_email</em>，以便只有在公共视图中包含这些字段。</p><p>接下来，让我们在我们的GET方法上应用公共视图，以便只有_name_和_email_在Swagger UI中可见：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@JsonView</span><span class="token punctuation">(</span><span class="token class-name">Views<span class="token punctuation">.</span>Public</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@GetMapping</span>
<span class="token keyword">public</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Author</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">getAllAuthors</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> authorService<span class="token punctuation">.</span><span class="token function">getAllAuthors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们现在检查Swagger UI：</p><p>正如我们所看到的，只有_email_和_name_字段在Swagger UI中可见。</p><p><strong>对于POST请求，我们也可以使用@JsonView，但它仅与_@RequestBody_结合使用，并且不支持_@ModelAttribute_。</strong></p><p>让我们检查一个带有POST请求的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@PostMapping</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addAuthor</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token annotation punctuation">@JsonView</span><span class="token punctuation">(</span><span class="token class-name">Views<span class="token punctuation">.</span>Public</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token class-name">Author</span> author<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  authorService<span class="token punctuation">.</span><span class="token function">addAuthor</span><span class="token punctuation">(</span>author<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们现在检查更新后的Swagger UI：</p><p>我们可以看到_id_字段没有在API描述中显示，只有_email_和_name_可供编辑。</p><p>让我们探索另一种实现所需功能的途径。</p><p>_@Hidden_也是Swagger的一个注解，它将给定的资源、类或bean类型标记为隐藏。</p><p>让我们尝试一下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Hidden</span>
<span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们检查这种情况下的Swagger UI规范：</p><p>我们成功地在GET和POST API请求数据定义中隐藏了_id_字段。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>我们已经探讨了修改Swagger UI中模型对象属性可见性的不同选项。讨论的注解还提供了其他几个功能，我们可以使用它们来更新Swagger规范。我们应该根据我们的需求使用适当的方法。</p><p>源代码可在GitHub上获得。</p>`,64),i=[p];function o(c,l){return s(),a("div",null,i)}const d=n(t,[["render",o],["__file","2024-07-19-Hide a Request Field in Swagger API.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Hide%20a%20Request%20Field%20in%20Swagger%20API.html","title":"在Swagger API中隐藏请求字段","lang":"zh-CN","frontmatter":{"date":"2023-09-01T00:00:00.000Z","category":["Spring Boot","Swagger"],"tag":["Spring","Swagger","REST API"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Swagger, REST API, API 文档, 字段隐藏"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Hide%20a%20Request%20Field%20in%20Swagger%20API.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Swagger API中隐藏请求字段"}],["meta",{"property":"og:description","content":"在Swagger API中隐藏请求字段 我们可以将Swagger UI用作一个平台，以方便的方式可视化和与API接口交互。它是一个强大的工具，可以以最少的配置生成API结构。 在本文中，我们将重点关注使用Swagger与Spring Boot REST API。具体来说，我们将探讨在Swagger UI中隐藏请求字段的不同方法。 2. 引言 为了简单起..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/04/2_BAEL-5329-Img1-e1648650028181.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T00:15:11.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring"}],["meta",{"property":"article:tag","content":"Swagger"}],["meta",{"property":"article:tag","content":"REST API"}],["meta",{"property":"article:published_time","content":"2023-09-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T00:15:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Swagger API中隐藏请求字段\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/04/2_BAEL-5329-Img1-e1648650028181.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/2_BAEL-5329-Img2-e1648650100457.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/BAEL-5329-Img4.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/BAEL-5329-Img-3.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/BAEL-5329-Img5.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/09/Screenshot-2023-08-31-000305.png\\"],\\"datePublished\\":\\"2023-09-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T00:15:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Swagger API中隐藏请求字段 我们可以将Swagger UI用作一个平台，以方便的方式可视化和与API接口交互。它是一个强大的工具，可以以最少的配置生成API结构。 在本文中，我们将重点关注使用Swagger与Spring Boot REST API。具体来说，我们将探讨在Swagger UI中隐藏请求字段的不同方法。 2. 引言 为了简单起..."},"headers":[{"level":2,"title":"2. 引言","slug":"_2-引言","link":"#_2-引言","children":[]},{"level":2,"title":"3. 使用_@JsonIgnore_","slug":"_3-使用-jsonignore","link":"#_3-使用-jsonignore","children":[]},{"level":2,"title":"4. 使用_@Schema_","slug":"_4-使用-schema","link":"#_4-使用-schema","children":[]},{"level":2,"title":"5. 使用_@JsonProperty_","slug":"_5-使用-jsonproperty","link":"#_5-使用-jsonproperty","children":[]},{"level":2,"title":"6. 使用_@JsonView_","slug":"_6-使用-jsonview","link":"#_6-使用-jsonview","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1721434511000,"updatedTime":1721434511000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.68,"words":1703},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Hide a Request Field in Swagger API.md","localizedDate":"2023年9月1日","excerpt":"\\n<p>我们可以将Swagger UI用作一个平台，以方便的方式可视化和与API接口交互。它是一个强大的工具，可以以最少的配置生成API结构。</p>\\n<p>在本文中，我们将重点关注使用Swagger与Spring Boot REST API。具体来说，我们将探讨在Swagger UI中隐藏请求字段的不同方法。</p>\\n<h2>2. 引言</h2>\\n<p>为了简单起见，我们将创建一个基本的Spring Boot应用程序，并使用Swagger UI探索API。</p>\\n<p>让我们创建一个简单的_ArticleApplication_，使用Spring Boot。我们使用_ArticlesController_公开两个API。我们希望使用GET API接收与所有文章相关的详细信息。</p>","autoDesc":true}');export{d as comp,g as data};
