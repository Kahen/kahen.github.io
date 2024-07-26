import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-C4eFoh0f.js";const e={},p=t(`<h1 id="使用swagger设置示例和描述" tabindex="-1"><a class="header-anchor" href="#使用swagger设置示例和描述"><span>使用Swagger设置示例和描述</span></a></h1><p>在本教程中，我们将展示如何使用Swagger注解使我们的文档更加描述性。首先，我们将学习如何为API的不同部分添加描述，比如方法、参数和错误代码。然后我们将看到如何添加请求/响应示例。</p><h2 id="_2-项目设置" tabindex="-1"><a class="header-anchor" href="#_2-项目设置"><span>2. 项目设置</span></a></h2><p>我们将创建一个简单的产品API，提供创建和获取产品的方法。</p><p>从头开始创建REST API，我们可以按照Spring Docs的这个教程使用Spring Boot创建RESTful web服务。</p><p>接下来将是为项目设置依赖项和配置。我们可以按照本文的步骤为Spring REST API设置Swagger 2。</p><h2 id="_3-创建api" tabindex="-1"><a class="header-anchor" href="#_3-创建api"><span>3. 创建API</span></a></h2><p>让我们创建我们的产品API并检查生成的文档。</p><h3 id="_3-1-模型" tabindex="-1"><a class="header-anchor" href="#_3-1-模型"><span>3.1. 模型</span></a></h3><p>让我们定义我们的_Product_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Product</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">long</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> price<span class="token punctuation">;</span>

    <span class="token comment">// 构造函数和getter/setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-控制器" tabindex="-1"><a class="header-anchor" href="#_3-2-控制器"><span>3.2. 控制器</span></a></h3><p>让我们定义两个API方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@Tag</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;产品API&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProductController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/products&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">createProduct</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">Product</span> product<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建逻辑</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">CREATED</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/products/{id}&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Product</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">getProduct</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 检索逻辑</span>
        <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;产品1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;$21.99&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们运行项目时，库将读取所有公开的路径并创建相应的文档。</p><p>让我们在默认URL <em>http://localhost:8080/swagger-ui/index.html</em> 查看文档：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/02/Screenshot-2022-01-29-at-1.59.47-PM.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们可以进一步扩展控制器方法以查看它们各自的文档。接下来，我们将详细查看它们。</p><h2 id="_4-使我们的文档更具描述性" tabindex="-1"><a class="header-anchor" href="#_4-使我们的文档更具描述性"><span>4. 使我们的文档更具描述性</span></a></h2><p>现在让我们通过向方法的不同部分添加描述来使我们的文档更具描述性。</p><h3 id="_4-1-向方法和参数添加描述" tabindex="-1"><a class="header-anchor" href="#_4-1-向方法和参数添加描述"><span>4.1. 向方法和参数添加描述</span></a></h3><p>让我们看看几种使方法具有描述性的方法。我们将向方法、参数和响应代码添加描述。让我们从_getProduct()_方法开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Operation</span><span class="token punctuation">(</span>summary <span class="token operator">=</span> <span class="token string">&quot;通过ID获取产品&quot;</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">&quot;根据ID返回产品&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ApiResponses</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@ApiResponse</span><span class="token punctuation">(</span>responseCode <span class="token operator">=</span> <span class="token string">&quot;200&quot;</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">&quot;成功检索&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token annotation punctuation">@ApiResponse</span><span class="token punctuation">(</span>responseCode <span class="token operator">=</span> <span class="token string">&quot;404&quot;</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">&quot;未找到 - 产品不存在&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/products/{id}&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Product</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">getProduct</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span> <span class="token annotation punctuation">@Parameter</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">&quot;产品ID&quot;</span><span class="token punctuation">,</span> example <span class="token operator">=</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 检索逻辑</span>
    <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;产品1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;$21.99&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em><strong>@Operation</strong></em> **定义了API方法的属性。**我们使用_value_属性为操作添加了名称，并使用_notes_属性添加了描述。</p><p><strong>@</strong> <em><strong>ApiResponses</strong></em> <strong>用于覆盖伴随响应代码的默认消息</strong>。对于我们想要更改的每个响应消息，我们需要添加一个_@ApiResponse_对象。</p><p>例如，假设产品未找到，我们的API在这种情况下返回HTTP 404状态。如果我们不添加自定义消息，原始消息“未找到”可能很难理解。调用者可能会将其解释为URL错误。然而，添加一个描述“产品未找到”使其更清晰。</p><p><em><strong>@Parameter</strong></em> **定义了方法参数的属性。**它可以与路径、查询、头和表单参数一起使用。我们为“id”参数添加了名称、值（描述）和示例。如果我们不添加自定义，库只会拾取参数的名称和类型，正如我们在第一张图片中看到的。</p><p>让我们看看这如何改变文档：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/02/Screenshot-2022-01-29-at-4.08.45-PM.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在这里我们可以看到名称“获取产品ID”以及API路径_/products/{id}_。我们还可以看到就在它下面的描述。此外，在参数部分，我们对字段_id_有描述和示例。最后，在响应部分，我们可以看到200和404代码的错误描述是如何改变的。</p><h3 id="_4-2-向模型添加描述和示例" tabindex="-1"><a class="header-anchor" href="#_4-2-向模型添加描述和示例"><span>4.2. 向模型添加描述和示例</span></a></h3><p>我们可以在_createProduct()_方法中进行类似的改进。由于该方法接受一个_Product_对象，因此在_Product_类本身中提供描述和示例更有意义。</p><p>让我们对_Product_类进行一些更改以实现这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Schema</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;产品ID&quot;</span><span class="token punctuation">,</span> example <span class="token operator">=</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> required <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>
<span class="token annotation punctuation">@Schema</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;产品名称&quot;</span><span class="token punctuation">,</span> example <span class="token operator">=</span> <span class="token string">&quot;产品1&quot;</span><span class="token punctuation">,</span> required <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
<span class="token annotation punctuation">@Schema</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;产品价格&quot;</span><span class="token punctuation">,</span> example <span class="token operator">=</span> <span class="token string">&quot;$100.00&quot;</span><span class="token punctuation">,</span> required <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">String</span> price<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**@ <em>Schema</em> 注解定义了字段的属性。**我们在每个字段上使用此注解来设置其_name_、_example_和_required_属性。</p><p>让我们重新启动应用程序，再次查看我们的_Product_模型文档：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/02/Screenshot-2022-01-29-at-4.07.33-PM.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>如果我们将这个与原始文档图片进行比较，我们将发现新图片包含示例、描述和红色星号(*)来识别必填参数。</p><p>**通过向模型添加示例，我们可以自动在每个使用模型作为输入或输出的方法中创建示例响应。**例如，从对应于_getProduct()_方法的图片中，我们可以看到响应包含与我们在模型中提供的相同值的示例。</p><p>在我们的文档中添加示例很重要，因为它使值格式更加精确。如果我们的模型包含日期、时间或价格等字段，就需要确切的值格式。事先定义格式可以使API提供者和API客户端的开发过程更加有效。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了提高我们API文档可读性的不同方式。我们学习了如何使用_@Parameter, @Operation, @ApiResponses, @ApiResponse, 和 @Schema_注解来记录方法、参数、错误消息和模型。</p><p>如常，这些示例的代码可以在GitHub上找到。</p>`,43),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-22-Setting Example and Description with Swagger.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-22/2024-07-22-Setting%20Example%20and%20Description%20with%20Swagger.html","title":"使用Swagger设置示例和描述","lang":"zh-CN","frontmatter":{"date":"2022-02-01T00:00:00.000Z","category":["Spring Boot","Swagger"],"tag":["API文档","描述","示例"],"head":[["meta",{"name":"keywords","content":"Swagger, API文档, 示例, 描述"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-22/2024-07-22-Setting%20Example%20and%20Description%20with%20Swagger.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Swagger设置示例和描述"}],["meta",{"property":"og:description","content":"使用Swagger设置示例和描述 在本教程中，我们将展示如何使用Swagger注解使我们的文档更加描述性。首先，我们将学习如何为API的不同部分添加描述，比如方法、参数和错误代码。然后我们将看到如何添加请求/响应示例。 2. 项目设置 我们将创建一个简单的产品API，提供创建和获取产品的方法。 从头开始创建REST API，我们可以按照Spring D..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/02/Screenshot-2022-01-29-at-1.59.47-PM.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T00:40:44.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"API文档"}],["meta",{"property":"article:tag","content":"描述"}],["meta",{"property":"article:tag","content":"示例"}],["meta",{"property":"article:published_time","content":"2022-02-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-22T00:40:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Swagger设置示例和描述\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/02/Screenshot-2022-01-29-at-1.59.47-PM.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/02/Screenshot-2022-01-29-at-4.08.45-PM.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/02/Screenshot-2022-01-29-at-4.07.33-PM.png\\"],\\"datePublished\\":\\"2022-02-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-22T00:40:44.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Swagger设置示例和描述 在本教程中，我们将展示如何使用Swagger注解使我们的文档更加描述性。首先，我们将学习如何为API的不同部分添加描述，比如方法、参数和错误代码。然后我们将看到如何添加请求/响应示例。 2. 项目设置 我们将创建一个简单的产品API，提供创建和获取产品的方法。 从头开始创建REST API，我们可以按照Spring D..."},"headers":[{"level":2,"title":"2. 项目设置","slug":"_2-项目设置","link":"#_2-项目设置","children":[]},{"level":2,"title":"3. 创建API","slug":"_3-创建api","link":"#_3-创建api","children":[{"level":3,"title":"3.1. 模型","slug":"_3-1-模型","link":"#_3-1-模型","children":[]},{"level":3,"title":"3.2. 控制器","slug":"_3-2-控制器","link":"#_3-2-控制器","children":[]}]},{"level":2,"title":"4. 使我们的文档更具描述性","slug":"_4-使我们的文档更具描述性","link":"#_4-使我们的文档更具描述性","children":[{"level":3,"title":"4.1. 向方法和参数添加描述","slug":"_4-1-向方法和参数添加描述","link":"#_4-1-向方法和参数添加描述","children":[]},{"level":3,"title":"4.2. 向模型添加描述和示例","slug":"_4-2-向模型添加描述和示例","link":"#_4-2-向模型添加描述和示例","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721608844000,"updatedTime":1721608844000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.73,"words":1419},"filePathRelative":"posts/baeldung/2024-07-22/2024-07-22-Setting Example and Description with Swagger.md","localizedDate":"2022年2月1日","excerpt":"\\n<p>在本教程中，我们将展示如何使用Swagger注解使我们的文档更加描述性。首先，我们将学习如何为API的不同部分添加描述，比如方法、参数和错误代码。然后我们将看到如何添加请求/响应示例。</p>\\n<h2>2. 项目设置</h2>\\n<p>我们将创建一个简单的产品API，提供创建和获取产品的方法。</p>\\n<p>从头开始创建REST API，我们可以按照Spring Docs的这个教程使用Spring Boot创建RESTful web服务。</p>\\n<p>接下来将是为项目设置依赖项和配置。我们可以按照本文的步骤为Spring REST API设置Swagger 2。</p>\\n<h2>3. 创建API</h2>","autoDesc":true}');export{d as comp,k as data};
