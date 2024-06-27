import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DRCKM-lz.js";const p={},e=t('<h1 id="使用mockmvc获取json内容为对象-baeldung" tabindex="-1"><a class="header-anchor" href="#使用mockmvc获取json内容为对象-baeldung"><span>使用MockMVC获取JSON内容为对象 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在测试我们的REST端点时，有时我们希望获取响应并将其转换为对象，以便进一步检查和验证。众所周知，一种方法是使用如RestAssured等库在不将响应转换为对象的情况下验证响应。</p><p>在本教程中，我们将探索使用MockMVC和Spring Boot获取JSON内容为对象的几种方法。</p><h2 id="_2-示例设置" tabindex="-1"><a class="header-anchor" href="#_2-示例设置"><span>2. 示例设置</span></a></h2><p>在我们深入研究之前，让我们创建一个我们将用于测试的简单REST端点。</p><p>让我们从依赖设置开始。我们将在_pom.xml_中添加_spring-boot-starter-web_依赖，以便我们可以创建REST端点：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependency&gt;``\n   ``&lt;groupId&gt;``org.springframework.boot``&lt;/groupId&gt;``\n   ``&lt;artifactId&gt;``spring-boot-starter-web``&lt;/artifactId&gt;``\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们定义_Article_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Article</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>\n\n    <span class="token comment">// 标准getter和setter</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进一步，让我们创建_ArticleController_，其中包含两个端点，一个返回单个文章，另一个返回文章列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>\n<span class="token annotation punctuation">@RequestMapping</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ArticleController</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/article&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">Article</span> <span class="token function">getArticle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">,</span> <span class="token string">&quot;Learn Spring Boot&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/articles&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>````` <span class="token function">getArticles</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">,</span> <span class="token string">&quot;Guide to JUnit&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span><span class="token number">2L</span><span class="token punctuation">,</span> <span class="token string">&quot;Working with Hibernate&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-测试类" tabindex="-1"><a class="header-anchor" href="#_3-测试类"><span>3. 测试类</span></a></h2><p>为了测试我们的控制器，我们将使用_@WebMvcTest_注解装饰我们的测试类。当我们使用此注解时，<strong>Spring Boot自动配置MockMvc并仅针对web层启动上下文</strong>。</p><p>此外，我们将指定仅实例化_ArticleController_控制器的上下文，这在具有多个控制器的应用程序中非常有用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@WebMvcTest</span><span class="token punctuation">(</span><span class="token class-name">ArticleController</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>\n<span class="token keyword">class</span> <span class="token class-name">ArticleControllerUnitTest</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Autowired</span>\n    <span class="token keyword">private</span> <span class="token class-name">MockMvc</span> mockMvc<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还可以使用_@AutoConfigureMockMvc_注解配置MockMVC。然而，这种方法要求Spring Boot运行整个应用程序上下文，这将使我们的测试运行变慢。</p><p>现在我们已经设置好了，让我们探索如何使用MockMvc执行请求并将响应作为对象获取。</p><h2 id="_4-使用jackson" tabindex="-1"><a class="header-anchor" href="#_4-使用jackson"><span>4. 使用Jackson</span></a></h2><p>将JSON内容转换为对象的一种方法是使用Jackson库。</p><h3 id="_4-1-获取单个对象" tabindex="-1"><a class="header-anchor" href="#_4-1-获取单个对象"><span>4.1. 获取单个对象</span></a></h3><p>让我创建一个测试来验证HTTP GET _/article_端点是否按预期工作。</p><p>由于我们想要将响应转换为对象，让我们首先调用_mockMvc_上的_andReturn()_方法以检索结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">MvcResult</span> result <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>mockMvc<span class="token punctuation">.</span><span class="token function">perform</span><span class="token punctuation">(</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;/article&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isOk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">andReturn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>_andReturn()_方法返回_MvcResult_对象，它允许我们执行不支持的工具的额外验证。</strong></p><p>此外，我们可以调用_getContentAsString()<em>方法以检索响应作为_String</em>。不幸的是，MockMvc没有定义我们可以用来将响应转换为特定对象类型的方法是。我们需要自己指定逻辑。</p><p><strong>我们将使用Jackson的_ObjectMapper_将JSON内容转换为所需的类型。</strong></p><p>让我们调用_readValue()_方法并传递响应以_String_格式以及我们想要将响应转换为的类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> json <span class="token operator">=</span> result<span class="token punctuation">.</span><span class="token function">getResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getContentAsString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Article</span> article <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> <span class="token class-name">Article</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertNotNull</span><span class="token punctuation">(</span>article<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">,</span> article<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Learn Spring Boot&quot;</span><span class="token punctuation">,</span> article<span class="token punctuation">.</span><span class="token function">getTitle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-获取对象集合" tabindex="-1"><a class="header-anchor" href="#_4-2-获取对象集合"><span>4.2. 获取对象集合</span></a></h3><p>让我们看看当端点返回集合时如何获取响应。</p><p>在前一节中，当我们想要获取单个对象时，我们指定了类型为_Article.class_。然而，这在集合等泛型类型中是不可能的。我们不能指定类型为_List<code>&lt;Article&gt;</code>.class_。</p><p><strong>我们可以使用Jackson的_TypeReference_泛型类来反序列化集合：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">whenGetArticle_thenReturnListUsingJacksonTypeReference</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n    <span class="token class-name">MvcResult</span> result <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>mockMvc<span class="token punctuation">.</span><span class="token function">perform</span><span class="token punctuation">(</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;/articles&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isOk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">andReturn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">String</span> json <span class="token operator">=</span> result<span class="token punctuation">.</span><span class="token function">getResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getContentAsString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>````` articles <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">TypeReference</span><span class="token operator">&lt;</span><span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>`````<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>articles<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> articles<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于类型擦除，泛型类型信息在运行时不可用。要克服这个限制，_TypeReference_在编译时捕获我们想要将JSON转换为的类型。</p><p>此外，<strong>我们可以通过指定_CollectionType_实现相同的功能：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> json <span class="token operator">=</span> result<span class="token punctuation">.</span><span class="token function">getResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getContentAsString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">CollectionType</span> collectionType <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">getTypeFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">constructCollectionType</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">Article</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>````` articles <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> collectionType<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertNotNull</span><span class="token punctuation">(</span>articles<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> articles<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用gson" tabindex="-1"><a class="header-anchor" href="#_5-使用gson"><span>5. 使用Gson</span></a></h2><p>现在，让我们看看如何使用Gson库将JSON内容转换为对象。</p><p>首先，让我们在_pom.xml_中添加所需的依赖：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependency&gt;``\n    ``&lt;groupId&gt;``com.google.code.gson``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``gson``&lt;/artifactId&gt;``\n    `&lt;version&gt;`2.10.1`&lt;/version&gt;`\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-1-获取单个对象" tabindex="-1"><a class="header-anchor" href="#_5-1-获取单个对象"><span>5.1. 获取单个对象</span></a></h3><p>我们可以通过在_Gson_实例上调用_fromJson()_方法，传递内容和所需的类型，将JSON转换为对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">whenGetArticle_thenReturnArticleObjectUsingGson</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n    <span class="token class-name">MvcResult</span> result <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>mockMvc<span class="token punctuation">.</span><span class="token function">perform</span><span class="token punctuation">(</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;/article&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isOk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">andReturn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">String</span> json <span class="token operator">=</span> result<span class="token punctuation">.</span><span class="token function">getResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getContentAsString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Article</span> article <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Gson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fromJson</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> <span class="token class-name">Article</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>article<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">,</span> article<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Learn Spring Boot&quot;</span><span class="token punctuation">,</span> article<span class="token punctuation">.</span><span class="token function">getTitle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-获取对象集合" tabindex="-1"><a class="header-anchor" href="#_5-2-获取对象集合"><span>5.2. 获取对象集合</span></a></h3><p>最后，让我们看看如何使用Gson处理集合。</p><p><strong>要使用Gson反序列化集合，我们可以指定_TypeToken_：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">whenGetArticle_thenReturnArticleListUsingGson</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n    <span class="token class-name">MvcResult</span> result <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>mockMvc<span class="token punctuation">.</span><span class="token function">perform</span><span class="token punctuation">(</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;/articles&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isOk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">andReturn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">String</span> json <span class="token operator">=</span> result<span class="token punctuation">.</span><span class="token function">getResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getContentAsString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">TypeToken</span><span class="token operator">&lt;</span><span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>`````<span class="token operator">&gt;</span> typeToken <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TypeToken</span><span class="token operator">&lt;</span><span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>`````<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>````` articles <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Gson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fromJson</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> typeToken<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>articles<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> articles<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们为_Article_元素的列表定义了_TypeToken_。然后，在_fromJson()_方法中，我们调用_getType()_返回_Type_对象。<strong>Gson使用反射来确定我们想要将JSON转换为哪种类型的对象。</strong></p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了在MockMVC工具中工作时获取JSON内容为对象的几种方法。</p><p>总之，我们可以使用Jackson的_ObjectMapper_将_String_响应转换为所需的类型。当处理集合时，我们需要指定_TypeReference_或_CollectionType_。同样，我们可以使用Gson库来反序列化对象。</p><p>如常，所有源代码都在GitHub上可用。</p><p>文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p>',54),c=[e];function o(l,i){return a(),s("div",null,c)}const r=n(p,[["render",o],["__file","Get JSON Content as Object Using MockMVC.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Get%20JSON%20Content%20as%20Object%20Using%20MockMVC.html","title":"使用MockMVC获取JSON内容为对象 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-17T00:00:00.000Z","category":["Spring","Spring Boot"],"tag":["MockMVC","JSON"],"description":"使用MockMVC获取JSON内容为对象 | Baeldung 1. 概述 在测试我们的REST端点时，有时我们希望获取响应并将其转换为对象，以便进一步检查和验证。众所周知，一种方法是使用如RestAssured等库在不将响应转换为对象的情况下验证响应。 在本教程中，我们将探索使用MockMVC和Spring Boot获取JSON内容为对象的几种方法。...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Get%20JSON%20Content%20as%20Object%20Using%20MockMVC.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用MockMVC获取JSON内容为对象 | Baeldung"}],["meta",{"property":"og:description","content":"使用MockMVC获取JSON内容为对象 | Baeldung 1. 概述 在测试我们的REST端点时，有时我们希望获取响应并将其转换为对象，以便进一步检查和验证。众所周知，一种方法是使用如RestAssured等库在不将响应转换为对象的情况下验证响应。 在本教程中，我们将探索使用MockMVC和Spring Boot获取JSON内容为对象的几种方法。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"MockMVC"}],["meta",{"property":"article:tag","content":"JSON"}],["meta",{"property":"article:published_time","content":"2024-06-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用MockMVC获取JSON内容为对象 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-17T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 示例设置","slug":"_2-示例设置","link":"#_2-示例设置","children":[]},{"level":2,"title":"3. 测试类","slug":"_3-测试类","link":"#_3-测试类","children":[]},{"level":2,"title":"4. 使用Jackson","slug":"_4-使用jackson","link":"#_4-使用jackson","children":[{"level":3,"title":"4.1. 获取单个对象","slug":"_4-1-获取单个对象","link":"#_4-1-获取单个对象","children":[]},{"level":3,"title":"4.2. 获取对象集合","slug":"_4-2-获取对象集合","link":"#_4-2-获取对象集合","children":[]}]},{"level":2,"title":"5. 使用Gson","slug":"_5-使用gson","link":"#_5-使用gson","children":[{"level":3,"title":"5.1. 获取单个对象","slug":"_5-1-获取单个对象","link":"#_5-1-获取单个对象","children":[]},{"level":3,"title":"5.2. 获取对象集合","slug":"_5-2-获取对象集合","link":"#_5-2-获取对象集合","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.56,"words":1367},"filePathRelative":"posts/baeldung/Archive/Get JSON Content as Object Using MockMVC.md","localizedDate":"2024年6月17日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在测试我们的REST端点时，有时我们希望获取响应并将其转换为对象，以便进一步检查和验证。众所周知，一种方法是使用如RestAssured等库在不将响应转换为对象的情况下验证响应。</p>\\n<p>在本教程中，我们将探索使用MockMVC和Spring Boot获取JSON内容为对象的几种方法。</p>\\n<h2>2. 示例设置</h2>\\n<p>在我们深入研究之前，让我们创建一个我们将用于测试的简单REST端点。</p>\\n<p>让我们从依赖设置开始。我们将在_pom.xml_中添加_spring-boot-starter-web_依赖，以便我们可以创建REST端点：</p>","autoDesc":true}');export{r as comp,d as data};
