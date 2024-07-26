import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-DpYLEM_u.js";const t={},o=e(`<hr><h1 id="在springfox-swagger-ui中移除basicerrorcontroller" tabindex="-1"><a class="header-anchor" href="#在springfox-swagger-ui中移除basicerrorcontroller"><span>在SpringFox Swagger-UI中移除BasicErrorController</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将学习多种方法来配置Spring Boot应用程序中的Swagger，以隐藏由_BasicErrorController_暴露的路径。</p><h2 id="_2-目标项目" tabindex="-1"><a class="header-anchor" href="#_2-目标项目"><span>2. 目标项目</span></a></h2><p>本文不会涵盖使用Spring Boot和Swagger-UI开始的基本配置。我们可以使用已经配置好的项目，或者按照“使用Spring REST API设置Swagger 2”的指南来创建基本配置。</p><h2 id="_3-问题" tabindex="-1"><a class="header-anchor" href="#_3-问题"><span>3. 问题</span></a></h2><p><strong>如果我们的代码包含一个_BasicErrorController_，Swagger默认会将其所有端点也包含在生成的文档中。</strong> 我们需要提供自定义配置来移除不需要的控制器。</p><p>例如，假设我们想提供标准_RestController_的API文档：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;good-path&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RegularRestController</span> <span class="token punctuation">{</span>

   <span class="token annotation punctuation">@ApiOperation</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;此方法用于获取作者名称。&quot;</span><span class="token punctuation">)</span>
   <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;getAuthor&quot;</span><span class="token punctuation">)</span>
   <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getAuthor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token string">&quot;姓名 姓氏&quot;</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>

   <span class="token comment">// 其他类似方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再假设我们的代码中包含一个扩展了_BasicErrorController_的类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;my-error-controller&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyErrorController</span> <span class="token keyword">extends</span> <span class="token class-name">BasicErrorController</span> <span class="token punctuation">{</span>
    <span class="token comment">// 基本构造函数</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到_my-error-controller_被包含在生成的文档中： <img src="https://www.baeldung.com/wp-content/uploads/2022/02/swagger.png" alt="img" loading="lazy"></p><h2 id="_4-解决方案" tabindex="-1"><a class="header-anchor" href="#_4-解决方案"><span>4. 解决方案</span></a></h2><p>在本节中，我们将探讨四种不同的方法来从Swagger文档中排除资源。</p><h3 id="_4-1-使用-basepackage-排除" tabindex="-1"><a class="header-anchor" href="#_4-1-使用-basepackage-排除"><span>4.1. 使用_basePackage()_排除</span></a></h3><p><strong>通过指定我们想要记录的控制器的基础包，我们可以排除我们不需要的资源。</strong> 这仅在错误控制器包与标准控制器包不同时有效。使用Spring Boot，我们只需要提供一个_Docket_ Bean：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SwaggerConfiguration</span> <span class="token punctuation">{</span>

   <span class="token annotation punctuation">@Bean</span>
   <span class="token keyword">public</span> <span class="token class-name">Docket</span> <span class="token function">api</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Docket</span><span class="token punctuation">(</span><span class="token class-name">DocumentationType</span><span class="token punctuation">.</span><span class="token constant">SWAGGER_2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">apiInfo</span><span class="token punctuation">(</span><span class="token function">apiInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">apis</span><span class="token punctuation">(</span><span class="token class-name">RequestHandlerSelectors</span><span class="token punctuation">.</span><span class="token function">basePackage</span><span class="token punctuation">(</span><span class="token string">&quot;com.baeldung.swaggerconf.controller&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过此自定义配置，Swagger将仅在指定的包内检查REST Controller方法。因此，例如，如果我们的_BasicErrorController_定义在包“<em>com.baeldung.swaggerconf.error</em>”中，它将不被考虑。</p><h3 id="_4-2-使用注解排除" tabindex="-1"><a class="header-anchor" href="#_4-2-使用注解排除"><span>4.2. 使用注解排除</span></a></h3><p><strong>另外，我们也可以指示Swagger只生成带有特定Java注解的类的文档。</strong> 在此示例中，我们将设置为_RestController.class：_</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">Docket</span> <span class="token function">api</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Docket</span><span class="token punctuation">(</span><span class="token class-name">DocumentationType</span><span class="token punctuation">.</span><span class="token constant">SWAGGER_2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">apiInfo</span><span class="token punctuation">(</span><span class="token function">apiInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
     <span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
     <span class="token punctuation">.</span><span class="token function">apis</span><span class="token punctuation">(</span><span class="token class-name">RequestHandlerSelectors</span><span class="token punctuation">.</span><span class="token function">withClassAnnotation</span><span class="token punctuation">(</span><span class="token class-name">RestController</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
     <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，<em>BasicErrorController_将被排除在Swagger文档之外，因为它没有被</em>@RestController_注解装饰。相反，我们想要记录的_RegularRestController_则带有此注解。</p><h3 id="_4-3-使用路径上的正则表达式排除" tabindex="-1"><a class="header-anchor" href="#_4-3-使用路径上的正则表达式排除"><span>4.3. 使用路径上的正则表达式排除</span></a></h3><p>另一种方法是<strong>在自定义路径上指定正则表达式。</strong> 在这种情况下，只有映射到“/_good-path”_前缀的资源才会被记录：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">Docket</span> <span class="token function">api</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Docket</span><span class="token punctuation">(</span><span class="token class-name">DocumentationType</span><span class="token punctuation">.</span><span class="token constant">SWAGGER_2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">apiInfo</span><span class="token punctuation">(</span><span class="token function">apiInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
     <span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
     <span class="token punctuation">.</span><span class="token function">paths</span><span class="token punctuation">(</span><span class="token function">regex</span><span class="token punctuation">(</span><span class="token string">&quot;/good-path/.*&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
     <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-使用-apiignore-排除" tabindex="-1"><a class="header-anchor" href="#_4-4-使用-apiignore-排除"><span>4.4. 使用_@ApiIgnore_排除</span></a></h3><p><strong>最后，我们可以使用注解_@ApiIgnore_来排除特定类从Swagger。</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;my-error-controller&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ApiIgnore</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyErrorController</span> <span class="token keyword">extends</span> <span class="token class-name">BasicErrorController</span> <span class="token punctuation">{</span>
   <span class="token comment">// 基本构造函数</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们展示了四种不同的方法来配置Spring Boot应用程序中的Swagger，以隐藏_BasicErrorController_资源。</p><p>如常，完整代码可在GitHub上获取。</p>`,32),p=[o];function c(l,i){return s(),a("div",null,p)}const d=n(t,[["render",c],["__file","2024-07-22-Remove Basic Error Controller In SpringFox Swagger UI.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-22/2024-07-22-Remove%20Basic%20Error%20Controller%20In%20SpringFox%20Swagger%20UI.html","title":"在SpringFox Swagger-UI中移除BasicErrorController","lang":"zh-CN","frontmatter":{"date":"2022-02-01T00:00:00.000Z","category":["Spring Boot","Swagger"],"tag":["SpringFox","Swagger-UI","BasicErrorController"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Swagger, SpringFox, Swagger-UI, BasicErrorController"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-22/2024-07-22-Remove%20Basic%20Error%20Controller%20In%20SpringFox%20Swagger%20UI.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在SpringFox Swagger-UI中移除BasicErrorController"}],["meta",{"property":"og:description","content":"在SpringFox Swagger-UI中移除BasicErrorController 1. 概述 在本教程中，我们将学习多种方法来配置Spring Boot应用程序中的Swagger，以隐藏由_BasicErrorController_暴露的路径。 2. 目标项目 本文不会涵盖使用Spring Boot和Swagger-UI开始的基本配置。我们可以..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/02/swagger.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T04:39:59.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"SpringFox"}],["meta",{"property":"article:tag","content":"Swagger-UI"}],["meta",{"property":"article:tag","content":"BasicErrorController"}],["meta",{"property":"article:published_time","content":"2022-02-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-22T04:39:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在SpringFox Swagger-UI中移除BasicErrorController\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/02/swagger.png\\"],\\"datePublished\\":\\"2022-02-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-22T04:39:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在SpringFox Swagger-UI中移除BasicErrorController 1. 概述 在本教程中，我们将学习多种方法来配置Spring Boot应用程序中的Swagger，以隐藏由_BasicErrorController_暴露的路径。 2. 目标项目 本文不会涵盖使用Spring Boot和Swagger-UI开始的基本配置。我们可以..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 目标项目","slug":"_2-目标项目","link":"#_2-目标项目","children":[]},{"level":2,"title":"3. 问题","slug":"_3-问题","link":"#_3-问题","children":[]},{"level":2,"title":"4. 解决方案","slug":"_4-解决方案","link":"#_4-解决方案","children":[{"level":3,"title":"4.1. 使用_basePackage()_排除","slug":"_4-1-使用-basepackage-排除","link":"#_4-1-使用-basepackage-排除","children":[]},{"level":3,"title":"4.2. 使用注解排除","slug":"_4-2-使用注解排除","link":"#_4-2-使用注解排除","children":[]},{"level":3,"title":"4.3. 使用路径上的正则表达式排除","slug":"_4-3-使用路径上的正则表达式排除","link":"#_4-3-使用路径上的正则表达式排除","children":[]},{"level":3,"title":"4.4. 使用_@ApiIgnore_排除","slug":"_4-4-使用-apiignore-排除","link":"#_4-4-使用-apiignore-排除","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721623199000,"updatedTime":1721623199000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.49,"words":748},"filePathRelative":"posts/baeldung/2024-07-22/2024-07-22-Remove Basic Error Controller In SpringFox Swagger UI.md","localizedDate":"2022年2月1日","excerpt":"<hr>\\n<h1>在SpringFox Swagger-UI中移除BasicErrorController</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将学习多种方法来配置Spring Boot应用程序中的Swagger，以隐藏由_BasicErrorController_暴露的路径。</p>\\n<h2>2. 目标项目</h2>\\n<p>本文不会涵盖使用Spring Boot和Swagger-UI开始的基本配置。我们可以使用已经配置好的项目，或者按照“使用Spring REST API设置Swagger 2”的指南来创建基本配置。</p>\\n<h2>3. 问题</h2>\\n<p><strong>如果我们的代码包含一个_BasicErrorController_，Swagger默认会将其所有端点也包含在生成的文档中。</strong> 我们需要提供自定义配置来移除不需要的控制器。</p>","autoDesc":true}');export{d as comp,k as data};
