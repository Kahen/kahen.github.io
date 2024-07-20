import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DfO5Xg_k.js";const p={},e=t(`<h1 id="使用spring-rest-docs记录rest-api查询参数" tabindex="-1"><a class="header-anchor" href="#使用spring-rest-docs记录rest-api查询参数"><span>使用Spring REST Docs记录REST API查询参数</span></a></h1><p>现在，新版本的《REST With Spring - &quot;REST With Spring Boot&quot;》终于发布了，当前价格将在本周五之前有效，之后将永久上涨50美元。</p><p><strong>&gt;获取访问权限</strong></p><p><strong>现在</strong></p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>文档对于我们打算与世界分享的任何代码都是至关重要的，特别是当这段代码相对复杂时。良好的API文档不仅吸引开发者使用它，还展示了产品的质量。一个文档编写草率的公司可能也有一个编写草率的API。</p><p>然而，开发者喜欢为机器编写代码，而不是为人编写文本。</p><p>在本教程中，我们将探讨如何结合编写文档和编写API使用Spring REST Docs。我们将以查询参数文档为例。</p><h2 id="_2-api" tabindex="-1"><a class="header-anchor" href="#_2-api"><span>2. API</span></a></h2><p>让我们考虑一个简单的API，它只有一个端点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/books&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BookController</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">BookService</span> service<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">BookController</span><span class="token punctuation">(</span><span class="token class-name">BookService</span> service<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>service <span class="token operator">=</span> service<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">getBooks</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;page&quot;</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> page<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> service<span class="token punctuation">.</span><span class="token function">getBooks</span><span class="token punctuation">(</span>page<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个端点返回我们网站上可用的书籍集合。但由于书籍的数量庞大，我们不能一次性返回所有书籍。<strong>客户端提供我们目录的页码，我们只发送这一页的信息。</strong></p><p>我们决定使这个参数成为必需的。在这种情况下，这是一个默认设置。这样，我们提高了服务的性能，并且不允许客户端一次性请求太多数据。</p><p>然而，我们必须提供关于我们决定的信息，并解释客户端应该遵循的规则。<strong>在这种情况下，如果参数不存在，客户端将收到错误消息。</strong></p><h2 id="_3-文档" tabindex="-1"><a class="header-anchor" href="#_3-文档"><span>3. 文档</span></a></h2><p>编写文档的通常方法是编写文档，这意味着开发人员必须两次编写相同的事情。首先在代码中，然后在文本中，解释如何与系统交互。<strong>然而，这是浪费的，我们不能假设所有开发人员都遵循这一点。</strong></p><p>文档是一个相当正式的文件，旨在追求清晰而不是启发性的见解、巧妙的措辞或创新的情节。**那么，我们为什么不从代码生成文档呢？**这样，我们就不会两次编写相同的事情，所有的更改都会反映在文档中。</p><p>Spring REST Docs正是这样做的。**然而，它是从测试而不是代码生成文档的，因为它没有提供太多上下文，而是从测试中生成的。**这样，我们可以表达相当复杂的情况和示例。另一个好处是，如果我们的测试失败，文档就不会生成。</p><h2 id="_4-带文档的测试" tabindex="-1"><a class="header-anchor" href="#_4-带文档的测试"><span>4. 带文档的测试</span></a></h2><p>**Spring REST Docs支持REST测试的主要测试框架。**我们将考虑MockMvc、WebTestClient和REST-assured的示例。然而，主要的想法和结构对所有这些都是一样的。</p><p>此外，我们将使用JUnit 5作为我们测试用例的基础，但可以设置Spring REST Docs与JUnit 4一起使用。</p><p>所有下面的测试方法都需要一个额外的扩展：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ExtendWith</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">RestDocumentationExtension</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">SpringExtension</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这些是用于文档生成的特殊类。</p><h3 id="_4-1-webtestclient" tabindex="-1"><a class="header-anchor" href="#_4-1-webtestclient"><span>4.1. WebTestClient</span></a></h3><p>让我们从WebTestClient开始，这是一种更现代的REST测试方法。正如之前提到的，我们需要用额外的扩展扩展测试类。<strong>此外，我们需要配置它：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@BeforeEach</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setUp</span><span class="token punctuation">(</span><span class="token class-name">ApplicationContext</span> webApplicationContext<span class="token punctuation">,</span> <span class="token class-name">RestDocumentationContextProvider</span> restDocumentation<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>webTestClient <span class="token operator">=</span> <span class="token class-name">WebTestClient</span><span class="token punctuation">.</span><span class="token function">bindToApplicationContext</span><span class="token punctuation">(</span>webApplicationContext<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">configureClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token function">documentationConfiguration</span><span class="token punctuation">(</span>restDocumentation<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，我们可以编写一个测试，它不仅会检查我们的API，还会提供有关请求的信息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token annotation punctuation">@WithMockUser</span>
<span class="token keyword">void</span> <span class="token function">givenEndpoint_whenSendGetRequest_thenSuccessfulResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    webTestClient<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span><span class="token string">&quot;/books?page=2&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">exchange</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">expectStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isOk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">expectBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">consumeWith</span><span class="token punctuation">(</span><span class="token function">document</span><span class="token punctuation">(</span><span class="token string">&quot;books&quot;</span><span class="token punctuation">,</span>
        <span class="token function">requestParameters</span><span class="token punctuation">(</span><span class="token function">parameterWithName</span><span class="token punctuation">(</span><span class="token string">&quot;page&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">description</span><span class="token punctuation">(</span><span class="token string">&quot;要检索的页面&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-webmvctest和mockmvc" tabindex="-1"><a class="header-anchor" href="#_4-2-webmvctest和mockmvc"><span>4.2. WebMvcTest和MockMvc</span></a></h3><p>一般来说，这种方法与前一个非常相似。它也需要正确的设置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@BeforeEach</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setUp</span><span class="token punctuation">(</span><span class="token class-name">WebApplicationContext</span> webApplicationContext<span class="token punctuation">,</span> <span class="token class-name">RestDocumentationContextProvider</span> restDocumentation<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>mockMvc <span class="token operator">=</span> <span class="token function">webAppContextSetup</span><span class="token punctuation">(</span>webApplicationContext<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token function">documentationConfiguration</span><span class="token punctuation">(</span>restDocumentation<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">alwaysDo</span><span class="token punctuation">(</span><span class="token function">document</span><span class="token punctuation">(</span><span class="token string">&quot;{method-name}&quot;</span><span class="token punctuation">,</span> <span class="token function">preprocessRequest</span><span class="token punctuation">(</span><span class="token function">prettyPrint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">preprocessResponse</span><span class="token punctuation">(</span><span class="token function">prettyPrint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试方法看起来相同，除了我们使用MockMvc及其API：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenEndpoint_whenSendGetRequest_thenSuccessfulResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    mockMvc<span class="token punctuation">.</span><span class="token function">perform</span><span class="token punctuation">(</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;/books?page=2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isOk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">andDo</span><span class="token punctuation">(</span><span class="token function">document</span><span class="token punctuation">(</span><span class="token string">&quot;books&quot;</span><span class="token punctuation">,</span>
        <span class="token function">requestParameters</span><span class="token punctuation">(</span><span class="token function">parameterWithName</span><span class="token punctuation">(</span><span class="token string">&quot;page&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">description</span><span class="token punctuation">(</span><span class="token string">&quot;要检索的页面&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-rest-assured" tabindex="-1"><a class="header-anchor" href="#_4-3-rest-assured"><span>4.3. REST-assured</span></a></h3><p>最后，让我们检查一下REST-assured的例子。因为我们需要一个运行中的服务器，所以我们不应该使用@WebMvcTest或@AutoconfigureMockMvc。在这里，我们使用@AutoconfigureWebMvc，并且还要提供正确的端口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@BeforeEach</span>
<span class="token keyword">void</span> <span class="token function">setUp</span><span class="token punctuation">(</span><span class="token class-name">RestDocumentationContextProvider</span> restDocumentation<span class="token punctuation">,</span> <span class="token annotation punctuation">@LocalServerPort</span> <span class="token keyword">int</span> port<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>spec <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RequestSpecBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">addFilter</span><span class="token punctuation">(</span><span class="token function">documentationConfiguration</span><span class="token punctuation">(</span>restDocumentation<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">setPort</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，测试看起来通常是相同的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token annotation punctuation">@WithMockUser</span>
<span class="token keyword">void</span> <span class="token function">givenEndpoint_whenSendGetRequest_thenSuccessfulResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">RestAssured</span><span class="token punctuation">.</span><span class="token function">given</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>spec<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token function">document</span><span class="token punctuation">(</span><span class="token string">&quot;users&quot;</span><span class="token punctuation">,</span> <span class="token function">requestParameters</span><span class="token punctuation">(</span>
        <span class="token function">parameterWithName</span><span class="token punctuation">(</span><span class="token string">&quot;page&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">description</span><span class="token punctuation">(</span><span class="token string">&quot;要检索的页面&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">when</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;/books?page=2&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">statusCode</span><span class="token punctuation">(</span><span class="token function">is</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-生成的文档" tabindex="-1"><a class="header-anchor" href="#_5-生成的文档"><span>5. 生成的文档</span></a></h2><p>然而，到目前为止，我们还没有生成的文档。要得到结果，我们需要经过额外的步骤。</p><h3 id="_5-1-生成的片段" tabindex="-1"><a class="header-anchor" href="#_5-1-生成的片段"><span>5.1. 生成的片段</span></a></h3><p>我们可以在运行测试后的目标文件夹中找到生成的片段。然而，我们可以配置输出目录以定义存储片段的不同位置。一般来说，它们看起来像这样：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>source,bash<span class="token punctuation">]</span>
----
$ <span class="token function">curl</span> <span class="token string">&#39;http://localhost:8080/books?page=2&#39;</span> <span class="token parameter variable">-i</span> <span class="token parameter variable">-X</span> GET
----
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时，我们可以看到关于我们参数的信息，存储在一个.adoc文件中。</p><div class="language-adoc line-numbers-mode" data-ext="adoc" data-title="adoc"><pre class="language-adoc"><code><span class="token table"><span class="token punctuation">|===</span>
<span class="token punctuation">|</span>参数<span class="token punctuation">|</span>描述

<span class="token punctuation">|</span><span class="token inline"><span class="token punctuation">\`</span><span class="token punctuation">+</span>page+<span class="token punctuation">\`</span></span>
<span class="token punctuation">|</span>要检索的页面

<span class="token punctuation">|===</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-文档生成" tabindex="-1"><a class="header-anchor" href="#_5-2-文档生成"><span>5.2. 文档生成</span></a></h3><p>下一步是为AsciiDoctor提供配置，以创建更易读的HTML文档。AsciiDoc是一种简单而强大的标记语言。我们可以用它来实现各种目的，比如生成HTML和PDFs或写书。</p><p>因此，由于我们想要生成HTML文档，我们需要概述我们的HTML模板：</p><div class="language-adoc line-numbers-mode" data-ext="adoc" data-title="adoc"><pre class="language-adoc"><code><span class="token title important"><span class="token punctuation">=</span> 使用Spring REST Docs的书籍</span>

您应该如何与我们的书店交互：

<span class="token title important"><span class="token punctuation">.</span>request</span>
<span class="token macro"><span class="token function">include</span><span class="token punctuation">::</span>{snippets}/books/http-request.adoc<span class="token attributes"><span class="token punctuation">[</span><span class="token punctuation">]</span></span></span>

<span class="token title important"><span class="token punctuation">.</span>request-parameters</span>
<span class="token macro"><span class="token function">include</span><span class="token punctuation">::</span>{snippets}/books/request-parameters.adoc<span class="token attributes"><span class="token punctuation">[</span><span class="token punctuation">]</span></span></span>

<span class="token title important"><span class="token punctuation">.</span>response</span>
<span class="token macro"><span class="token function">include</span><span class="token punctuation">::</span>{snippets}/books/http-response.adoc<span class="token attributes"><span class="token punctuation">[</span><span class="token punctuation">]</span></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的例子中，我们使用了简单的格式，但可以创建一个更复杂的自定义格式，这将是吸引人的和提供信息的。AsciiDoc的灵活性在这方面帮助了我们。</p><h3 id="_5-3-生成的html" tabindex="-1"><a class="header-anchor" href="#_5-3-生成的html"><span>5.3. 生成的HTML</span></a></h3><p>在正确设置和配置之后，当我们可以将生成目标附加到Maven阶段时：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>executions</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>execution</span><span class="token punctuation">&gt;</span></span>\`
        \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>\`generate-docs\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>\`
        \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>phase</span><span class="token punctuation">&gt;</span></span>\`package\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>phase</span><span class="token punctuation">&gt;</span></span>\`
        \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goals</span><span class="token punctuation">&gt;</span></span>\`
            \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>\`process-asciidoc\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>\`
        \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goals</span><span class="token punctuation">&gt;</span></span>\`
        \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>\`
            \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>backend</span><span class="token punctuation">&gt;</span></span>\`html\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>backend</span><span class="token punctuation">&gt;</span></span>\`
            \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>doctype</span><span class="token punctuation">&gt;</span></span>\`book\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>doctype</span><span class="token punctuation">&gt;</span></span>\`
            \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>attributes</span><span class="token punctuation">&gt;</span></span>\`
                \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>snippets</span><span class="token punctuation">&gt;</span></span>\`\${snippetsDirectory}\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>snippets</span><span class="token punctuation">&gt;</span></span>\`
            \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>attributes</span><span class="token punctuation">&gt;</span></span>\`
            \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sourceDirectory</span><span class="token punctuation">&gt;</span></span>\`src/docs/asciidocs\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>sourceDirectory</span><span class="token punctuation">&gt;</span></span>\`
            \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>outputDirectory</span><span class="token punctuation">&gt;</span></span>\`target/generated-docs\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>outputDirectory</span><span class="token punctuation">&gt;</span></span>\`
        \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>execution</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>executions</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以运行所需的_mvn_命令并触发生成。我们在前一节中定义的模板呈现了以下HTML：</p><h2 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h2><p>我们可以将此过程附加到我们的流水线中，并始终拥有相关且正确的文档。另一个好处是，这个过程减少了手动工作，这是浪费和容易出错的。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>文档是软件的重要组成部分。开发者承认这一点，但只有少数人始终如一地编写或维护它。Spring REST Docs允许我们基于代码而不是我们对API应该如何做的理解，以最小的努力生成良好的文档。</p><p>像往常一样，本教程的所有代码都可以在GitHub上找到。</p>`,60),o=[e];function c(i,l){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","2024-06-21-Document Query Parameters with Spring REST Docs.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-21/2024-06-21-Document%20Query%20Parameters%20with%20Spring%20REST%20Docs.html","title":"使用Spring REST Docs记录REST API查询参数","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Spring","REST Docs"],"tag":["API文档","Spring Boot"],"head":[["meta",{"name":"keywords","content":"Spring REST Docs, API文档, Spring Boot, 测试"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-21/2024-06-21-Document%20Query%20Parameters%20with%20Spring%20REST%20Docs.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Spring REST Docs记录REST API查询参数"}],["meta",{"property":"og:description","content":"使用Spring REST Docs记录REST API查询参数 现在，新版本的《REST With Spring - \\"REST With Spring Boot\\"》终于发布了，当前价格将在本周五之前有效，之后将永久上涨50美元。 >获取访问权限 现在 1. 概述 文档对于我们打算与世界分享的任何代码都是至关重要的，特别是当这段代码相对复杂时。良好的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T12:59:21.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"API文档"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T12:59:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Spring REST Docs记录REST API查询参数\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T12:59:21.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Spring REST Docs记录REST API查询参数 现在，新版本的《REST With Spring - \\"REST With Spring Boot\\"》终于发布了，当前价格将在本周五之前有效，之后将永久上涨50美元。 >获取访问权限 现在 1. 概述 文档对于我们打算与世界分享的任何代码都是至关重要的，特别是当这段代码相对复杂时。良好的..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. API","slug":"_2-api","link":"#_2-api","children":[]},{"level":2,"title":"3. 文档","slug":"_3-文档","link":"#_3-文档","children":[]},{"level":2,"title":"4. 带文档的测试","slug":"_4-带文档的测试","link":"#_4-带文档的测试","children":[{"level":3,"title":"4.1. WebTestClient","slug":"_4-1-webtestclient","link":"#_4-1-webtestclient","children":[]},{"level":3,"title":"4.2. WebMvcTest和MockMvc","slug":"_4-2-webmvctest和mockmvc","link":"#_4-2-webmvctest和mockmvc","children":[]},{"level":3,"title":"4.3. REST-assured","slug":"_4-3-rest-assured","link":"#_4-3-rest-assured","children":[]}]},{"level":2,"title":"5. 生成的文档","slug":"_5-生成的文档","link":"#_5-生成的文档","children":[{"level":3,"title":"5.1. 生成的片段","slug":"_5-1-生成的片段","link":"#_5-1-生成的片段","children":[]},{"level":3,"title":"5.2. 文档生成","slug":"_5-2-文档生成","link":"#_5-2-文档生成","children":[]},{"level":3,"title":"5.3. 生成的HTML","slug":"_5-3-生成的html","link":"#_5-3-生成的html","children":[]}]},{"level":2,"title":"","slug":"","link":"#","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718974761000,"updatedTime":1718974761000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6,"words":1800},"filePathRelative":"posts/baeldung/2024-06-21/2024-06-21-Document Query Parameters with Spring REST Docs.md","localizedDate":"2024年6月21日","excerpt":"\\n<p>现在，新版本的《REST With Spring - \\"REST With Spring Boot\\"》终于发布了，当前价格将在本周五之前有效，之后将永久上涨50美元。</p>\\n<p><strong>&gt;获取访问权限</strong></p>\\n<p><strong>现在</strong></p>\\n<h2>1. 概述</h2>\\n<p>文档对于我们打算与世界分享的任何代码都是至关重要的，特别是当这段代码相对复杂时。良好的API文档不仅吸引开发者使用它，还展示了产品的质量。一个文档编写草率的公司可能也有一个编写草率的API。</p>\\n<p>然而，开发者喜欢为机器编写代码，而不是为人编写文本。</p>","autoDesc":true}');export{r as comp,d as data};
