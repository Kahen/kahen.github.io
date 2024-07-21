import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-CtR6X2Br.js";const t={},p=e('<h1 id="在thymeleaf中访问会话属性" tabindex="-1"><a class="header-anchor" href="#在thymeleaf中访问会话属性"><span>在Thymeleaf中访问会话属性</span></a></h1><p>在这篇短文中，我们将学习如何使用Thymeleaf库在服务器端访问HTTP会话。为此，我们将构建一个带有表单的网页，用于发送名称分析请求，一个显示结果的部分，以及一个面板，显示在会话期间发起的所有请求。</p><p>为了简化，示例将使用Spring + Thymeleaf，因此我们将使用Thymeleaf Spring标准方言。</p><p>会话信息位于servlet上下文中，我们可以在模板级别或Spring Boot控制器内部访问这些信息。现在，我们将检查两种访问会话信息的方法。</p><h3 id="_2-1-在thymeleaf模板中访问会话属性" tabindex="-1"><a class="header-anchor" href="#_2-1-在thymeleaf模板中访问会话属性"><span>2.1. 在Thymeleaf模板中访问会话属性</span></a></h3><p>在Thymeleaf中，我们有两个始终可用的基础对象：<em>ctx_和_locale</em>，它们以前缀‘#’表示。#ctx基础对象提供了访问包含HTTP会话信息的servlet上下文的权限。因此，在模板中，我们可以使用以下表达式访问会话：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#ctx.session\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们想要以更简短的方式访问会话，我们可以使用变量_session_，所以之前的命令等价于：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>session\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们看看我们可以和不能对会话实例在模板中做什么。首先，我们可以获取会话中存在的属性数量：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>${#ctx.session.size()}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同样，我们可以检查会话是否为空：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>${#ctx.session.isEmpty()}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们不能使用模板中的_containsKey_方法检查会话中是否注册了属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>${#ctx.session.containsKey(&#39;lastAnalysis&#39;)}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个方法总是返回_true_，因此，我们应该检查会话属性是否为null：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>${#ctx.session.lastAnalysis}==null\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，我们可以访问会话属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>${#ctx.session.foo}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-2-在spring-boot控制器中访问会话属性" tabindex="-1"><a class="header-anchor" href="#_2-2-在spring-boot控制器中访问会话属性"><span>2.2. 在Spring Boot控制器中访问会话属性</span></a></h3><p>在控制器内部，Thymeleaf的_IWebSession_接口定义了我们必须访问会话信息的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IWebSession</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">containsAttribute</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getAttributeCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">public</span> <span class="token class-name">Set</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>` <span class="token function">getAllAttributeNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">public</span> <span class="token class-name">Map</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>` <span class="token function">getAttributeMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">getAttributeValue</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setAttributeValue</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span><span class="token class-name">Object</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">removeAttribute</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的示例中，我们将看到如何获取_IWebSession_接口的实例，并使用它来移除、获取和设置属性，所以我们不会使用接口中的所有方法，但这应该足以展示如何使用它。</p><p>从最后开始，_IServletWebExchange_将提供_IWebSession_实例。我们使用在_NameAnalysisController_控制器请求中接收到的_HttpServletRequest_和_HttpServletResponse_构建_IServletWebExchange_实例，使用_webApp_属性。</p><p>让我们看看_getIWebSession_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">IWebSession</span> <span class="token function">getIWebSession</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">IServletWebExchange</span> exchange <span class="token operator">=</span> webApp<span class="token punctuation">.</span><span class="token function">buildExchange</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> exchange <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> exchange<span class="token punctuation">.</span><span class="token function">getSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们看看_webApp_属性的类型以及它的实例化方式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">JakartaServletWebApplication</span> webApp<span class="token punctuation">;</span>\n\n<span class="token annotation punctuation">@Autowired</span>\n<span class="token keyword">public</span> <span class="token class-name">NameAnalysisController</span><span class="token punctuation">(</span><span class="token class-name">NameAnalysisService</span> nameAnalysisService<span class="token punctuation">,</span> <span class="token class-name">SessionNameRequestFactory</span> sessionNameRequestFactory<span class="token punctuation">,</span> <span class="token class-name">ServletContext</span> servletContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>webApp <span class="token operator">=</span> <span class="token class-name">JakartaServletWebApplication</span><span class="token punctuation">.</span><span class="token function">buildApplication</span><span class="token punctuation">(</span>servletContext<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们可以看到_webApp_属性是一个使用注入的_ServletContext_实例构建的_JakartaServletWebApplication_实例。此时，我们已经准备好访问会话信息。</p><h3 id="_3-项目设置" tabindex="-1"><a class="header-anchor" href="#_3-项目设置"><span>3. 项目设置</span></a></h3><p>让我们回顾一下我们的项目设置。这是一个Maven项目，有两个依赖项。第一个是_spring-boot-starter-web_，它将导入使用Spring Boot进行Web项目所需的一切：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.springframework.boot``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``spring-boot-starter-web``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二个是_spring-boot-starter-thymeleaf_，它将导入一切以启用与Spring Boot一起使用的Thymeleaf：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.springframework.boot``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``spring-boot-starter-thymeleaf``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`${spring.boot.starter.thymeleaf}`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-thymeleaf引擎配置" tabindex="-1"><a class="header-anchor" href="#_3-1-thymeleaf引擎配置"><span>3.1. Thymeleaf引擎配置</span></a></h3><p>_spring-boot-starter-thymeleaf_依赖项将为我们配置一切，但在我们的示例中，让我们对_SpringResourceTemplateResolver_进行一些调整，以设置模板模式、模板前缀和模板后缀：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>\n<span class="token keyword">public</span> <span class="token class-name">SpringWebConfig</span><span class="token punctuation">(</span><span class="token class-name">SpringResourceTemplateResolver</span> templateResolver<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    templateResolver<span class="token punctuation">.</span><span class="token function">setPrefix</span><span class="token punctuation">(</span><span class="token string">&quot;/WEB-INF/templates/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    templateResolver<span class="token punctuation">.</span><span class="token function">setSuffix</span><span class="token punctuation">(</span><span class="token string">&quot;.html&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    templateResolver<span class="token punctuation">.</span><span class="token function">setTemplateMode</span><span class="token punctuation">(</span><span class="token class-name">TemplateMode</span><span class="token punctuation">.</span><span class="token constant">HTML</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了这些更改，解析器将通过添加前缀_/WEB-INF/templates/<em>和后缀</em>.html_来转换请求。因此，对_URL_的以下请求：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>http://localhost:8080/name-analysis.html\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将转换为以下模板路径：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>WEB-INF/templates/name-analysis.html\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-运行示例" tabindex="-1"><a class="header-anchor" href="#_4-运行示例"><span>4. 运行示例</span></a></h3><p>要检查一切都在运行并进行中，让我们在项目的根目录下的命令行执行以下Maven命令：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>mvn spring-boot:run\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该命令将启动一个Tomcat服务器并将应用程序嵌入其中。服务器监听端口8080并在根上下文中发布示例应用程序。因此，访问基本页面的URL是：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>http://localhost:8080\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个请求将显示：<img src="https://www.baeldung.com/wp-content/uploads/2023/07/name-analysis-base-1.png" alt="img" loading="lazy"></p><p>在这里，我们可以看到示例的三个不同部分。我们将从_Analyze name_面板开始。它没有访问任何会话信息。它使用公开的_nameRequest_模型属性。</p><p>我们继续使用_Name analyzed_面板，它使用来自会话的_lastRequest_属性显示名称分析请求的结果。最后，最后的面板，_Requests History_面板，也将访问存储在会话的_requests_属性中的信息。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在这篇文章中，我们看到了如何配置一个Maven项目来使用Spring + Thymeleaf。除此之外，我们重点介绍了如何从Thymeleaf模板和Spring Boot服务器端访问HTTP会话信息。要更深入地了解Thymeleaf从头开始的工作原理，请阅读在Spring中使用Thymeleaf的介绍。</p><p>像往常一样，这个示例的完整代码可以在GitHub上找到。</p>',52),l=[p];function i(o,c){return s(),a("div",null,l)}const d=n(t,[["render",i],["__file","2024-07-03-Accessing Session Attributes in Thymeleaf.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-Accessing%20Session%20Attributes%20in%20Thymeleaf.html","title":"在Thymeleaf中访问会话属性","lang":"zh-CN","frontmatter":{"date":"2023-07-31T00:00:00.000Z","category":["Spring","Thymeleaf"],"tag":["HTTP Session","Thymeleaf"],"head":[["meta",{"name":"keywords","content":"Thymeleaf, Spring, HTTP Session, Web Development"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-Accessing%20Session%20Attributes%20in%20Thymeleaf.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Thymeleaf中访问会话属性"}],["meta",{"property":"og:description","content":"在Thymeleaf中访问会话属性 在这篇短文中，我们将学习如何使用Thymeleaf库在服务器端访问HTTP会话。为此，我们将构建一个带有表单的网页，用于发送名称分析请求，一个显示结果的部分，以及一个面板，显示在会话期间发起的所有请求。 为了简化，示例将使用Spring + Thymeleaf，因此我们将使用Thymeleaf Spring标准方言。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/07/name-analysis-base-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T06:55:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"HTTP Session"}],["meta",{"property":"article:tag","content":"Thymeleaf"}],["meta",{"property":"article:published_time","content":"2023-07-31T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T06:55:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Thymeleaf中访问会话属性\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/07/name-analysis-base-1.png\\"],\\"datePublished\\":\\"2023-07-31T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T06:55:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Thymeleaf中访问会话属性 在这篇短文中，我们将学习如何使用Thymeleaf库在服务器端访问HTTP会话。为此，我们将构建一个带有表单的网页，用于发送名称分析请求，一个显示结果的部分，以及一个面板，显示在会话期间发起的所有请求。 为了简化，示例将使用Spring + Thymeleaf，因此我们将使用Thymeleaf Spring标准方言。..."},"headers":[{"level":3,"title":"2.1. 在Thymeleaf模板中访问会话属性","slug":"_2-1-在thymeleaf模板中访问会话属性","link":"#_2-1-在thymeleaf模板中访问会话属性","children":[]},{"level":3,"title":"2.2. 在Spring Boot控制器中访问会话属性","slug":"_2-2-在spring-boot控制器中访问会话属性","link":"#_2-2-在spring-boot控制器中访问会话属性","children":[]},{"level":3,"title":"3. 项目设置","slug":"_3-项目设置","link":"#_3-项目设置","children":[]},{"level":3,"title":"3.1. Thymeleaf引擎配置","slug":"_3-1-thymeleaf引擎配置","link":"#_3-1-thymeleaf引擎配置","children":[]},{"level":3,"title":"4. 运行示例","slug":"_4-运行示例","link":"#_4-运行示例","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719989738000,"updatedTime":1719989738000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.35,"words":1306},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-Accessing Session Attributes in Thymeleaf.md","localizedDate":"2023年7月31日","excerpt":"\\n<p>在这篇短文中，我们将学习如何使用Thymeleaf库在服务器端访问HTTP会话。为此，我们将构建一个带有表单的网页，用于发送名称分析请求，一个显示结果的部分，以及一个面板，显示在会话期间发起的所有请求。</p>\\n<p>为了简化，示例将使用Spring + Thymeleaf，因此我们将使用Thymeleaf Spring标准方言。</p>\\n<p>会话信息位于servlet上下文中，我们可以在模板级别或Spring Boot控制器内部访问这些信息。现在，我们将检查两种访问会话信息的方法。</p>\\n<h3>2.1. 在Thymeleaf模板中访问会话属性</h3>\\n<p>在Thymeleaf中，我们有两个始终可用的基础对象：<em>ctx_和_locale</em>，它们以前缀‘#’表示。#ctx基础对象提供了访问包含HTTP会话信息的servlet上下文的权限。因此，在模板中，我们可以使用以下表达式访问会话：</p>","autoDesc":true}');export{d as comp,m as data};
