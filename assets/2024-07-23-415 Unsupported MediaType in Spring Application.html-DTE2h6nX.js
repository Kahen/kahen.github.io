import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-CbPcg273.js";const t={},p=e('<h1 id="spring-应用程序中的415-unsupported-mediatype问题解析" tabindex="-1"><a class="header-anchor" href="#spring-应用程序中的415-unsupported-mediatype问题解析"><span>Spring 应用程序中的415 Unsupported MediaType问题解析</span></a></h1><p>在本教程中，我们将展示Spring应用程序中POST请求的HTTP响应码415 UnsupportedMediaType的原因和解决方法。</p><h2 id="_2-背景" tabindex="-1"><a class="header-anchor" href="#_2-背景"><span>2. 背景</span></a></h2><p>我们的一位老业务客户要求我们为他们的产品设计并开发一个新的桌面应用程序。该应用程序的目的是管理用户。我们以前从未在这个产品上工作过。</p><p>由于时间紧迫，我们决定使用他们之前编写的现有后端API集。<strong>我们面临的挑战是这些API的文档并不十分详尽。</strong> 结果，我们只知道可用的API端点及其方法。因此，我们决定不接触服务——相反，我们将开始开发将使用此服务API的应用程序。</p><h2 id="_3-api请求" tabindex="-1"><a class="header-anchor" href="#_3-api请求"><span>3. API请求</span></a></h2><p>我们的应用程序已经开始使用这些API。让我们调用API以获取所有用户：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-X</span> GET https://baeldung.service.com/user\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>太好了！API已成功响应。之后，让我们请求一个单独的用户：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-X</span> GET https://baeldung.service.com/user/<span class="token punctuation">{</span>user-id<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们检查响应：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>\n    <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Jason&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token number">23</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;14th Street&quot;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这似乎也在正常工作。根据响应，我们可以推断出用户具有以下参数：<em>id</em>, <em>name</em>, <em>age</em>, 和 <em>address</em>。</p><p>现在，让我们尝试添加一个新用户：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token parameter variable">-d</span> <span class="token string">&#39;{&quot;name&quot;:&quot;Abdullah&quot;, &quot;age&quot;:28, &quot;address&quot;:&quot;Apartment 2201&quot;}&#39;</span> https://baeldung.service.com/user/\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>结果，<strong>我们收到了一个带有HTTP状态415的错误响应</strong>：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>\n    <span class="token property">&quot;timestamp&quot;</span><span class="token operator">:</span> <span class="token string">&quot;yyyy-MM-ddThh:mm:ss.SSS+00:00&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;status&quot;</span><span class="token operator">:</span> <span class="token number">415</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;error&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Unsupported Media Type&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/user/&quot;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在我们弄清楚“我们为什么会收到这个错误？”之前，我们需要看看“这是什么错误？”。</strong></p><p>根据RFC 7231标题HTTP/1.1语义和内容第6.5.13节的规定：</p><blockquote><p>415（Unsupported Media Type）状态码表示原始服务器因负载格式不受此方法支持而拒绝服务请求的目标资源。</p></blockquote><p><strong>正如规范所建议的，我们选择的媒体类型不受API支持。</strong> 我们选择JSON作为媒体类型的原因是GET请求的响应。响应数据格式是JSON。因此，<strong>我们假设POST请求也会接受JSON。</strong> 然而，这个假设被证明是错误的。</p><p>为了找出API支持哪种格式，我们决定深入研究服务器端后端代码，并找到了API定义：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> consumes <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;application/xml&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">void</span> <span class="token class-name">AddUser</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">User</span> user<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这很清楚地解释了API只支持XML格式。有人可能会在这里问，Spring中的“<em>consumes</em>”元素的目的是什么？</p><p>根据Spring框架文档，&quot;<em>consumes</em>&quot;元素的目的是：</p><blockquote><p>通过可以由映射处理程序消费的媒体类型来缩小主映射。由一个或多个媒体类型组成，其中之一必须与请求的Content-Type头部匹配</p></blockquote><h2 id="_5-解决方案" tabindex="-1"><a class="header-anchor" href="#_5-解决方案"><span>5. 解决方案</span></a></h2><p>我们面前有两个选项来解决这个问题。第一个选项是根据服务器期望的格式更改请求有效负载。第二个选项是更新API请求，使其开始支持JSON格式。</p><h3 id="_5-1-更改请求的有效负载为xml" tabindex="-1"><a class="header-anchor" href="#_5-1-更改请求的有效负载为xml"><span>5.1. 更改请求的有效负载为XML</span></a></h3><p>第一个选项是<strong>以XML格式而不是JSON格式发送请求</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token parameter variable">-d</span> <span class="token string">&#39;``&lt;user&gt;````&lt;name&gt;``Abdullah``&lt;/name&gt;````&lt;age&gt;``28``&lt;/age&gt;````&lt;address&gt;``Apartment 2201``&lt;/address&gt;````&lt;/user&gt;``&#39;</span> https://baeldung.service.com/user/\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>不幸的是，我们以相同的错误响应了上述请求。如果我们记得，我们曾问过“API中的&#39;<em>consumes</em>&#39;元素的目的是什么”。这指引我们<strong>我们的一个头部（“<em>Content-Type</em>”）缺失了</strong>。这次让我们发送请求，这次带有缺失的头部：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token parameter variable">-H</span> <span class="token string">&quot;Content-Type: application/xml&quot;</span> <span class="token parameter variable">-d</span> <span class="token string">&#39;``&lt;user&gt;````&lt;name&gt;``Abdullah``&lt;/name&gt;````&lt;age&gt;``28``&lt;/age&gt;````&lt;address&gt;``Apartment 2201``&lt;/address&gt;````&lt;/user&gt;``&#39;</span> https://baeldung.service.com/user/\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这次，我们收到了成功的响应。<strong>然而，我们可能会遇到客户端应用程序无法以支持的格式发送请求的情况</strong>。在这种情况下，我们必须对服务器进行更改，以使事情相对灵活。</p><h3 id="_5-2-在服务器上更新api" tabindex="-1"><a class="header-anchor" href="#_5-2-在服务器上更新api"><span>5.2. 在服务器上更新API</span></a></h3><p>假设我们的客户决定允许我们更改后端服务。如上所述的第二个选项是更新API请求以开始接受JSON格式。<strong>我们如何更新API请求有三种进一步的选项</strong>。让我们逐一探索每一个。</p><p><strong>第一个也是最业余的选项是在API上用JSON格式替换XML格式</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> consumes <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;application/json&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">void</span> <span class="token class-name">AddUser</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">User</span> user<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们再次以JSON格式从客户端应用程序发送请求：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token parameter variable">-H</span> <span class="token string">&quot;Content-Type: application/json&quot;</span> <span class="token parameter variable">-d</span> <span class="token string">&#39;{&quot;name&quot;:&quot;Abdullah&quot;, &quot;age&quot;:28, &quot;address&quot;:&quot;Apartment 2201&quot;}&#39;</span> https://baeldung.service.com/user/\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>响应将是成功的。<strong>然而，我们将面临一种情况，即所有现有的客户端，他们以XML格式发送请求，现在将开始收到415 Unsupported Media Type错误</strong>。</p><p><strong>第二个也是相对容易的选项是允许请求有效负载中的每种格式</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> consumes <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;*/*&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">void</span> <span class="token class-name">AddUser</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">User</span> user\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>以JSON格式请求，响应将是成功的。但这里的问题在于<strong>它太灵活了</strong>。我们不希望允许广泛的格式。<strong>这将导致整个代码库（客户端和服务器端）的不一致行为</strong>。</p><p><strong>第三个也是推荐的选项是添加客户端应用程序当前正在使用的那些特定格式</strong>。由于API已经支持XML格式，我们将保留它，因为有现有的客户端应用程序向API发送XML。为了使API也支持我们的应用程序格式，我们将进行简单的API代码更改：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> consumes <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;application/xml&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;application/json&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">void</span> <span class="token class-name">AddUser</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">User</span> user\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>以JSON格式发送我们的请求，响应将是成功的。这是这种特定场景中推荐的方法是。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们了解到必须从客户端应用程序请求中发送“<em>Content-Type</em>”头部以避免415 Unsupported Media Type错误。此外，RFC清楚地解释了客户端应用程序的“<em>Content-Type</em>”头部和服务器端应用程序必须同步，以避免在发送POST请求时出现这种错误。</p><p>本文的所有代码都可以在GitHub上找到。</p>',50),o=[p];function i(r,l){return s(),n("div",null,o)}const d=a(t,[["render",i],["__file","2024-07-23-415 Unsupported MediaType in Spring Application.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-23/2024-07-23-415%20Unsupported%20MediaType%20in%20Spring%20Application.html","title":"Spring 应用程序中的415 Unsupported MediaType问题解析","lang":"zh-CN","frontmatter":{"date":"2024-07-24T00:00:00.000Z","category":["Spring","Error Handling"],"tag":["415 Unsupported Media Type","Spring Application"],"head":[["meta",{"name":"keywords","content":"Spring, 415 Unsupported Media Type, Error Handling, Spring Application"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-23/2024-07-23-415%20Unsupported%20MediaType%20in%20Spring%20Application.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring 应用程序中的415 Unsupported MediaType问题解析"}],["meta",{"property":"og:description","content":"Spring 应用程序中的415 Unsupported MediaType问题解析 在本教程中，我们将展示Spring应用程序中POST请求的HTTP响应码415 UnsupportedMediaType的原因和解决方法。 2. 背景 我们的一位老业务客户要求我们为他们的产品设计并开发一个新的桌面应用程序。该应用程序的目的是管理用户。我们以前从未在这..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T21:48:26.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"415 Unsupported Media Type"}],["meta",{"property":"article:tag","content":"Spring Application"}],["meta",{"property":"article:published_time","content":"2024-07-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T21:48:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring 应用程序中的415 Unsupported MediaType问题解析\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-23T21:48:26.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring 应用程序中的415 Unsupported MediaType问题解析 在本教程中，我们将展示Spring应用程序中POST请求的HTTP响应码415 UnsupportedMediaType的原因和解决方法。 2. 背景 我们的一位老业务客户要求我们为他们的产品设计并开发一个新的桌面应用程序。该应用程序的目的是管理用户。我们以前从未在这..."},"headers":[{"level":2,"title":"2. 背景","slug":"_2-背景","link":"#_2-背景","children":[]},{"level":2,"title":"3. API请求","slug":"_3-api请求","link":"#_3-api请求","children":[]},{"level":2,"title":"5. 解决方案","slug":"_5-解决方案","link":"#_5-解决方案","children":[{"level":3,"title":"5.1. 更改请求的有效负载为XML","slug":"_5-1-更改请求的有效负载为xml","link":"#_5-1-更改请求的有效负载为xml","children":[]},{"level":3,"title":"5.2. 在服务器上更新API","slug":"_5-2-在服务器上更新api","link":"#_5-2-在服务器上更新api","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721771306000,"updatedTime":1721771306000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.23,"words":1569},"filePathRelative":"posts/baeldung/2024-07-23/2024-07-23-415 Unsupported MediaType in Spring Application.md","localizedDate":"2024年7月24日","excerpt":"\\n<p>在本教程中，我们将展示Spring应用程序中POST请求的HTTP响应码415 UnsupportedMediaType的原因和解决方法。</p>\\n<h2>2. 背景</h2>\\n<p>我们的一位老业务客户要求我们为他们的产品设计并开发一个新的桌面应用程序。该应用程序的目的是管理用户。我们以前从未在这个产品上工作过。</p>\\n<p>由于时间紧迫，我们决定使用他们之前编写的现有后端API集。<strong>我们面临的挑战是这些API的文档并不十分详尽。</strong> 结果，我们只知道可用的API端点及其方法。因此，我们决定不接触服务——相反，我们将开始开发将使用此服务API的应用程序。</p>","autoDesc":true}');export{d as comp,g as data};
