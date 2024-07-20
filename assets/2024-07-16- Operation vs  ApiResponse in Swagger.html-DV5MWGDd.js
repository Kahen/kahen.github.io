import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DfO5Xg_k.js";const p={},e=t(`<h1 id="swagger中的-operation与-apiresponse的区别" tabindex="-1"><a class="header-anchor" href="#swagger中的-operation与-apiresponse的区别"><span>Swagger中的@Operation与@ApiResponse的区别</span></a></h1><p>在本教程中，我们将讨论Swagger的@Operation和@ApiResponse注解之间的主要区别。</p><p>创建REST API时，同样重要的是创建其适当的规范。此外，这样的规范应该是可读的、易于理解的，并提供所有必要的信息。更重要的是，文档应该描述对API所做的每一个更改。手动创建REST API文档既耗时又费时。幸运的是，像Swagger这样的工具可以帮助我们完成这个过程。</p><p>Swagger是围绕OpenAPI规范构建的一套开源工具集。它可以帮助我们设计、构建、文档化和使用REST API。</p><p>Swagger规范是REST API文档化的标准。使用Swagger规范，我们可以描述我们的整个API，例如公开的端点、操作、参数、认证方法等。</p><p>Swagger提供了各种注解，可以帮助我们文档化REST API。此外，它提供了@Operation和@ApiResponse注解来文档化我们REST API的响应。在本教程的其余部分，我们将使用下面的控制器类，并看看如何使用这些注解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/customers&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">CustomerController</span> <span class="token punctuation">{</span>

   <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">CustomerService</span> customerService<span class="token punctuation">;</span>

   <span class="token keyword">public</span> <span class="token class-name">CustomerController</span><span class="token punctuation">(</span><span class="token class-name">CustomerService</span> customerService<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span>customerService <span class="token operator">=</span> customerService<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>

   <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/{id}&quot;</span><span class="token punctuation">)</span>
   <span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CustomerResponse</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` <span class="token function">getCustomer</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>customerService<span class="token punctuation">.</span><span class="token function">getById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>@Operation注解用于描述单个操作。操作是路径和HTTP方法的唯一组合。</p><p>此外，使用@Operation，我们可以描述成功的REST API调用的结果。换句话说，我们可以使用这个注解来指定通用的返回类型。</p><p>让我们将注解添加到我们的方法中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Operation</span><span class="token punctuation">(</span>summary <span class="token operator">=</span> <span class="token string">&quot;通过ID获取客户&quot;</span><span class="token punctuation">,</span>
           description <span class="token operator">=</span> <span class="token string">&quot;客户必须存在&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/{id}&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CustomerResponse</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` <span class="token function">getCustomer</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>customerService<span class="token punctuation">.</span><span class="token function">getById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将介绍@Operation中最常用的一些属性。</p><h3 id="_3-1-summary属性" tabindex="-1"><a class="header-anchor" href="#_3-1-summary属性"><span>3.1. summary属性</span></a></h3><p>必需的summary属性包含操作的摘要字段。简单来说，它提供了操作的简短描述。然而，我们应该保持这个参数不超过120个字符。</p><p>以下是我们在@Operation注解中定义摘要属性的方式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Operation</span><span class="token punctuation">(</span>summary<span class="token operator">=</span> <span class="token string">&quot;通过ID获取客户&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-2-description属性" tabindex="-1"><a class="header-anchor" href="#_3-2-description属性"><span>3.2. description属性</span></a></h3><p>使用description，我们可以提供有关操作的更多细节。例如，我们可以放置一段描述端点限制的文本：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Operation</span><span class="token punctuation">(</span>summary<span class="token operator">=</span> <span class="token string">&quot;通过ID获取客户&quot;</span><span class="token punctuation">,</span> description<span class="token operator">=</span> <span class="token string">&quot;客户必须存在&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-3-hidden属性" tabindex="-1"><a class="header-anchor" href="#_3-3-hidden属性"><span>3.3. hidden属性</span></a></h3><p>hidden属性表示此操作是否被隐藏。</p><h3 id="_4-apiresponse" tabindex="-1"><a class="header-anchor" href="#_4-apiresponse"><span>4. @ApiResponse</span></a></h3><p>使用HTTP状态码返回错误是一种常见做法。我们可以使用@ApiResponse注解来描述操作的具体可能响应。</p><p><strong>虽然@Operation注解描述了操作和通用返回类型，但@ApiResponse注解描述了其余可能的返回代码。</strong></p><p>此外，注解可以应用于方法级别以及类级别。此外，如果方法级别上已经定义了具有相同代码的@ApiResponse注解，则只会解析类级别的注解。换句话说，方法注解优先于类注解。</p><p>**我们应该在@ApiResponses注解中使用@ApiResponse注解，无论我们有一个或多个响应。**如果我们直接使用这个注解，它将不会被Swagger解析。</p><p>让我们在方法上定义@ApiResponses和@ApiResponse注解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ApiResponses</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@ApiResponse</span><span class="token punctuation">(</span>responseCode <span class="token operator">=</span> <span class="token number">400</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">&quot;提供的ID无效&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token annotation punctuation">@ApiResponse</span><span class="token punctuation">(</span>responseCode <span class="token operator">=</span> <span class="token number">404</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">&quot;客户未找到&quot;</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/{id}&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CustomerResponse</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` <span class="token function">getCustomer</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>customerService<span class="token punctuation">.</span><span class="token function">getById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以使用注解来指定成功响应：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Operation</span><span class="token punctuation">(</span>summary <span class="token operator">=</span> <span class="token string">&quot;通过ID获取客户&quot;</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">&quot;客户必须存在&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ApiResponses</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@ApiResponse</span><span class="token punctuation">(</span>responseCode <span class="token operator">=</span> <span class="token string">&quot;200&quot;</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">&quot;Ok&quot;</span><span class="token punctuation">,</span> content <span class="token operator">=</span>
          <span class="token punctuation">{</span> <span class="token annotation punctuation">@Content</span><span class="token punctuation">(</span>mediaType <span class="token operator">=</span> <span class="token string">&quot;application/json&quot;</span><span class="token punctuation">,</span> schema <span class="token operator">=</span>
            <span class="token annotation punctuation">@Schema</span><span class="token punctuation">(</span>implementation <span class="token operator">=</span> <span class="token class-name">CustomerResponse</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token annotation punctuation">@ApiResponse</span><span class="token punctuation">(</span>responseCode <span class="token operator">=</span> <span class="token string">&quot;400&quot;</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">&quot;提供的ID无效&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token annotation punctuation">@ApiResponse</span><span class="token punctuation">(</span>responseCode <span class="token operator">=</span> <span class="token string">&quot;404&quot;</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">&quot;客户未找到&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token annotation punctuation">@ApiResponse</span><span class="token punctuation">(</span>responseCode <span class="token operator">=</span> <span class="token string">&quot;500&quot;</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">&quot;内部服务器错误&quot;</span><span class="token punctuation">,</span> content <span class="token operator">=</span>
          <span class="token punctuation">{</span> <span class="token annotation punctuation">@Content</span><span class="token punctuation">(</span>mediaType <span class="token operator">=</span> <span class="token string">&quot;application/json&quot;</span><span class="token punctuation">,</span> schema <span class="token operator">=</span>
            <span class="token annotation punctuation">@Schema</span><span class="token punctuation">(</span>implementation <span class="token operator">=</span> <span class="token class-name">ErrorResponse</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/{id}&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CustomerResponse</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` <span class="token function">getCustomer</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>customerService<span class="token punctuation">.</span><span class="token function">getById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们介绍@ApiResponse中使用的一些属性。</p><h3 id="_4-1-responsecode和description属性" tabindex="-1"><a class="header-anchor" href="#_4-1-responsecode和description属性"><span>4.1. responseCode和description属性</span></a></h3><p>responseCode和description属性都是@ApiResponse注解中必需的参数。重要的是要提到我们不能定义具有相同代码属性的多个@ApiResponse。</p><p>消息属性通常包含与响应一起的可读消息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ApiResponse</span><span class="token punctuation">(</span>responseCode <span class="token operator">=</span> <span class="token number">400</span><span class="token punctuation">,</span> message <span class="token operator">=</span> <span class="token string">&quot;提供的ID无效&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-2-content属性" tabindex="-1"><a class="header-anchor" href="#_4-2-content属性"><span>4.2. content属性</span></a></h3><p>有时，端点使用不同的响应类型。例如，我们可以为成功响应使用一种类型，为错误响应使用另一种类型。我们可以使用可选的content属性通过将响应类作为模式来描述它们。</p><p>首先，我们定义一个类，该类将在内部服务器错误的情况下返回：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">ErrorResponse</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> error<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> message<span class="token punctuation">;</span>

    <span class="token comment">// getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其次，我们为内部服务器错误添加一个新的@ApiResponse：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Operation</span><span class="token punctuation">(</span>summary <span class="token operator">=</span> <span class="token string">&quot;通过ID获取客户&quot;</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">&quot;客户必须存在&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ApiResponses</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@ApiResponse</span><span class="token punctuation">(</span>responseCode <span class="token operator">=</span> <span class="token string">&quot;400&quot;</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">&quot;提供的ID无效&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token annotation punctuation">@ApiResponse</span><span class="token punctuation">(</span>responseCode <span class="token operator">=</span> <span class="token string">&quot;404&quot;</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">&quot;客户未找到&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token annotation punctuation">@ApiResponse</span><span class="token punctuation">(</span>responseCode <span class="token operator">=</span> <span class="token string">&quot;500&quot;</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">&quot;内部服务器错误&quot;</span><span class="token punctuation">,</span>
          content <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token annotation punctuation">@Content</span><span class="token punctuation">(</span>mediaType <span class="token operator">=</span> <span class="token string">&quot;application/json&quot;</span><span class="token punctuation">,</span>
          schema <span class="token operator">=</span> <span class="token annotation punctuation">@Schema</span><span class="token punctuation">(</span>implementation <span class="token operator">=</span> <span class="token class-name">ErrorResponse</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/{id}&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CustomerResponse</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` <span class="token function">getCustomer</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>customerService<span class="token punctuation">.</span><span class="token function">getById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-operation和-apiresponse之间的差异" tabindex="-1"><a class="header-anchor" href="#_5-operation和-apiresponse之间的差异"><span>5. @Operation和@ApiResponse之间的差异</span></a></h3><p>总之，下表显示了@Operation和@ApiResponse注解之间的主要差异：</p><table><thead><tr><th>@Operation</th><th>@ApiResponse</th></tr></thead><tbody><tr><td>用于描述操作</td><td>用于描述操作的可能响应</td></tr><tr><td>用于成功响应</td><td>用于成功和错误响应</td></tr><tr><td>只能在方法级别定义</td><td>可以在方法或类级别定义</td></tr><tr><td>可以直接使用</td><td>只能在@ApiResponses注解中使用</td></tr></tbody></table><h3 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h3><p>在本文中，我们学习了@Operation和@ApiResponse注解之间的差异。</p><p>如常，示例的源代码可在GitHub上获得。</p>`,47),o=[e];function c(i,l){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-16- Operation vs  ApiResponse in Swagger.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-%20Operation%20vs%20%20ApiResponse%20in%20Swagger.html","title":"Swagger中的@Operation与@ApiResponse的区别","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Swagger","REST API"],"tag":["Operation","ApiResponse"],"head":[["meta",{"name":"keywords","content":"Swagger, REST API, Operation, ApiResponse"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-%20Operation%20vs%20%20ApiResponse%20in%20Swagger.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Swagger中的@Operation与@ApiResponse的区别"}],["meta",{"property":"og:description","content":"Swagger中的@Operation与@ApiResponse的区别 在本教程中，我们将讨论Swagger的@Operation和@ApiResponse注解之间的主要区别。 创建REST API时，同样重要的是创建其适当的规范。此外，这样的规范应该是可读的、易于理解的，并提供所有必要的信息。更重要的是，文档应该描述对API所做的每一个更改。手动创建..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T02:09:17.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Operation"}],["meta",{"property":"article:tag","content":"ApiResponse"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T02:09:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Swagger中的@Operation与@ApiResponse的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T02:09:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Swagger中的@Operation与@ApiResponse的区别 在本教程中，我们将讨论Swagger的@Operation和@ApiResponse注解之间的主要区别。 创建REST API时，同样重要的是创建其适当的规范。此外，这样的规范应该是可读的、易于理解的，并提供所有必要的信息。更重要的是，文档应该描述对API所做的每一个更改。手动创建..."},"headers":[{"level":3,"title":"3.1. summary属性","slug":"_3-1-summary属性","link":"#_3-1-summary属性","children":[]},{"level":3,"title":"3.2. description属性","slug":"_3-2-description属性","link":"#_3-2-description属性","children":[]},{"level":3,"title":"3.3. hidden属性","slug":"_3-3-hidden属性","link":"#_3-3-hidden属性","children":[]},{"level":3,"title":"4. @ApiResponse","slug":"_4-apiresponse","link":"#_4-apiresponse","children":[]},{"level":3,"title":"4.1. responseCode和description属性","slug":"_4-1-responsecode和description属性","link":"#_4-1-responsecode和description属性","children":[]},{"level":3,"title":"4.2. content属性","slug":"_4-2-content属性","link":"#_4-2-content属性","children":[]},{"level":3,"title":"5. @Operation和@ApiResponse之间的差异","slug":"_5-operation和-apiresponse之间的差异","link":"#_5-operation和-apiresponse之间的差异","children":[]},{"level":3,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721095757000,"updatedTime":1721095757000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.67,"words":1401},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16- Operation vs  ApiResponse in Swagger.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将讨论Swagger的@Operation和@ApiResponse注解之间的主要区别。</p>\\n<p>创建REST API时，同样重要的是创建其适当的规范。此外，这样的规范应该是可读的、易于理解的，并提供所有必要的信息。更重要的是，文档应该描述对API所做的每一个更改。手动创建REST API文档既耗时又费时。幸运的是，像Swagger这样的工具可以帮助我们完成这个过程。</p>\\n<p>Swagger是围绕OpenAPI规范构建的一套开源工具集。它可以帮助我们设计、构建、文档化和使用REST API。</p>\\n<p>Swagger规范是REST API文档化的标准。使用Swagger规范，我们可以描述我们的整个API，例如公开的端点、操作、参数、认证方法等。</p>","autoDesc":true}');export{k as comp,d as data};
