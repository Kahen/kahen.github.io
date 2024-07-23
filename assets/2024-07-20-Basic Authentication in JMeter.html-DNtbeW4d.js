import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as n,a as t}from"./app-LwwahXlT.js";const s={},p=t(`<h1 id="apache-jmeter-中的基本认证配置" tabindex="-1"><a class="header-anchor" href="#apache-jmeter-中的基本认证配置"><span>Apache JMeter 中的基本认证配置</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>当我们使用 JMeter 进行性能测试时，可能会遇到通过 HTTP 基础认证协议保护的 Web 服务。</p><p>在本教程中，我们将看到如何在测试期间配置 Apache JMeter 以提供必要的凭据。</p><h2 id="_2-什么是基础认证" tabindex="-1"><a class="header-anchor" href="#_2-什么是基础认证"><span>2. 什么是基础认证？</span></a></h2><p>基础认证是我们可以用于保护 Web 资源的最简单访问控制方法。它由客户端发送的 HTTP 头组成：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Authorization: Basic \`&lt;credentials&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里，凭据是用户名和密码的 Base64 字符串编码，由单个冒号 “:” 分隔。</p><p>我们可以看到，当浏览器窗口而不是 HTML 表单要求凭据时，就会使用基础认证。我们可能会在浏览器中收到提示：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/04/basicAuthenticationChrome.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>因此，如果我们尝试对受保护的 Web 资源启动 JMeter 测试，响应代码将是 HTTP 401，这意味着“未授权”。我们还将收到一个“WWW-Authenticate”响应头，该头将描述服务器所需的认证类型。在这种情况下，将是“Basic”：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/04/http-401-response-code.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_3-在-jmeter-中实现基础认证的简单方法" tabindex="-1"><a class="header-anchor" href="#_3-在-jmeter-中实现基础认证的简单方法"><span>3. 在 JMeter 中实现基础认证的简单方法</span></a></h2><p>发送凭据的最简单方法是将它们直接添加到请求头。<strong>我们可以使用_HTTP头管理器_组件轻松实现这一点</strong>，该组件允许我们向 HTTP 请求组件发送的请求添加头。头管理器必须是 HTTP 请求组件的子组件：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/04/jmeter-header-manager.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在_HTTP头管理器_的配置选项卡中，我们只需要添加一个键/值条目，使用我们的认证详细信息和“Authorization”作为名称：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/04/http-header-manager-config.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们可以使用在线工具对我们的字符串进行编码并粘贴到头管理器中。我们应该小心地在我们的编码凭据前加上“basic”。</p><p>如果一切顺利，我们应该从服务器收到 200 响应代码。</p><h3 id="_3-2-使用-jsr223-preprocessor-编码凭据" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-jsr223-preprocessor-编码凭据"><span>3.2 使用 JSR223 PreProcessor 编码凭据</span></a></h3><p>如果我们希望 JMeter 为我们编码凭据，我们可以使用 <em>JSR223 PreProcessor</em> 组件。如果我们希望测试计划使用不同的凭据，我们将需要使用此组件。</p><p>我们所要做的就是在 <em>HTTP头管理器</em> 组件之前添加一个 <em>JSR223 PreProcessor</em>：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/04/jsr223-preprocessor.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>使用此组件，我们可以在运行时执行脚本。我们需要提供一个脚本来检索凭据并对其进行编码。让我们使用 Java：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>codec<span class="token punctuation">.</span>binary<span class="token punctuation">.</span></span><span class="token class-name">Base64</span></span><span class="token punctuation">;</span>

<span class="token class-name">String</span> username <span class="token operator">=</span> vars<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;username&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> password <span class="token operator">=</span> vars<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;password&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> credentials <span class="token operator">=</span> username <span class="token operator">+</span> <span class="token string">&quot;:&quot;</span> <span class="token operator">+</span> password<span class="token punctuation">;</span>
<span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> encodedUsernamePassword <span class="token operator">=</span> <span class="token class-name">Base64</span><span class="token punctuation">.</span><span class="token function">encodeBase64</span><span class="token punctuation">(</span>credentials<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
vars<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;base64Credentials&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>encodedUsernamePassword<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们现在应该在 <em>用户定义的变量</em> 组件中定义 <em>username</em> 和 <em>password</em> 变量：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/04/User-Defined-Variables.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>最后，在 <em>HTTP头管理器</em> 组件中，我们必须设置 <em>Authorization</em> 头以使用编码的凭据：</p><p>我们完成了！一切应该正常工作，我们可以在我们的用户定义变量中轻松更改凭据。</p><h2 id="_4-使用-http-授权管理器" tabindex="-1"><a class="header-anchor" href="#_4-使用-http-授权管理器"><span>4. 使用 HTTP 授权管理器</span></a></h2><p>JMeter 提供了 <em>HTTP 授权管理器</em> 组件，以简化对认证凭据的使用。<strong>使用此组件，我们可以为多个域和认证协议提供凭据。</strong> 此组件必须是 <em>Thread Group</em> 的子组件，并在 <em>HTTP 请求</em> 组件之前定义：</p><p>在组件的配置选项卡中，我们必须定义用于认证的用户名和密码：</p><p>如果我们在 <em>用户定义的变量</em> 组件中定义了 <em>username</em> 和 <em>password</em>，我们可以在此选项卡中使用变量。密码也可以。尽管它仍然被隐藏，我们可以在密码字段中键入 <em>“\${password}”</em>。</p><p>我们必须注意选择正确的 <em>Mechanism</em> 进行认证。在这里，我们将选择 <em>“BASIC”</em>。</p><p>就是这样！<em>HTTP请求</em> 组件将自动在请求中添加 <em>Authorization</em> 头，我们应该收到 HTTP 200 OK 响应代码。</p><h2 id="_5-在-http-授权管理器中使用多个凭据" tabindex="-1"><a class="header-anchor" href="#_5-在-http-授权管理器中使用多个凭据"><span>5. 在 HTTP 授权管理器中使用多个凭据</span></a></h2><p>有时，我们可能希望在测试期间使用多个凭据。<strong>例如，这可能有助于验证基于角色的访问限制。</strong></p><p>要配置此测试用例，我们应该创建一个 CSV 文件，我们将在其中存储凭据和其他对我们的测试计划有用的信息。此文件由 JMeter 的 <em>CSV 数据集配置</em> 组件读取。此组件应该是 <em>Thread Group</em> 的子组件，并将迭代每个 <em>Thread Group</em> 循环的 CSV 行：</p><p>然后，在此组件中，我们必须定义：</p><ul><li>作为 <em>用户定义的变量</em> 组件中的路径的文件位置</li><li>由 <em>CSV 数据集</em> 组件执行后设置的 <em>变量名称</em></li><li>组件是否应该忽略第一行 - 如果我们在 CSV 文件中有列名，这将很有帮助</li><li>CSV 文件中使用的 <em>分隔符</em></li></ul><p><strong>在 CSV 文件中定义多个凭据时，我们应该注意配置我们的 <em>Thread Group</em> 以执行多个循环。</strong></p><p>有了这些设置，我们应该能够看到我们的请求头中使用了不同的凭据。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们查看了 HTTP 资源的基本认证如何工作。</p><p>我们还学习了如何在 Apache JMeter 中设置测试计划以使用此协议进行认证。我们涵盖了硬编码凭据，使用 JSR223 PreProcessor，然后从 CSV 文件提供多个凭据。</p><p>像往常一样，这些示例的代码可以在 GitHub 上找到。</p>`,46),o=[p];function i(c,r){return n(),a("div",null,o)}const d=e(s,[["render",i],["__file","2024-07-20-Basic Authentication in JMeter.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-Basic%20Authentication%20in%20JMeter.html","title":"Apache JMeter 中的基本认证配置","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["JMeter","HTTP Basic Authentication"],"tag":["JMeter","Basic Authentication","HTTP"],"head":[["meta",{"name":"keywords","content":"JMeter, Basic Authentication, HTTP, 性能测试"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-Basic%20Authentication%20in%20JMeter.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Apache JMeter 中的基本认证配置"}],["meta",{"property":"og:description","content":"Apache JMeter 中的基本认证配置 1. 概述 当我们使用 JMeter 进行性能测试时，可能会遇到通过 HTTP 基础认证协议保护的 Web 服务。 在本教程中，我们将看到如何在测试期间配置 Apache JMeter 以提供必要的凭据。 2. 什么是基础认证？ 基础认证是我们可以用于保护 Web 资源的最简单访问控制方法。它由客户端发送的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/04/basicAuthenticationChrome.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T05:36:32.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JMeter"}],["meta",{"property":"article:tag","content":"Basic Authentication"}],["meta",{"property":"article:tag","content":"HTTP"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T05:36:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Apache JMeter 中的基本认证配置\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/04/basicAuthenticationChrome.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/http-401-response-code.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/jmeter-header-manager.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/http-header-manager-config.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/jsr223-preprocessor.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/User-Defined-Variables.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T05:36:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Apache JMeter 中的基本认证配置 1. 概述 当我们使用 JMeter 进行性能测试时，可能会遇到通过 HTTP 基础认证协议保护的 Web 服务。 在本教程中，我们将看到如何在测试期间配置 Apache JMeter 以提供必要的凭据。 2. 什么是基础认证？ 基础认证是我们可以用于保护 Web 资源的最简单访问控制方法。它由客户端发送的..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 什么是基础认证？","slug":"_2-什么是基础认证","link":"#_2-什么是基础认证","children":[]},{"level":2,"title":"3. 在 JMeter 中实现基础认证的简单方法","slug":"_3-在-jmeter-中实现基础认证的简单方法","link":"#_3-在-jmeter-中实现基础认证的简单方法","children":[{"level":3,"title":"3.2 使用 JSR223 PreProcessor 编码凭据","slug":"_3-2-使用-jsr223-preprocessor-编码凭据","link":"#_3-2-使用-jsr223-preprocessor-编码凭据","children":[]}]},{"level":2,"title":"4. 使用 HTTP 授权管理器","slug":"_4-使用-http-授权管理器","link":"#_4-使用-http-授权管理器","children":[]},{"level":2,"title":"5. 在 HTTP 授权管理器中使用多个凭据","slug":"_5-在-http-授权管理器中使用多个凭据","link":"#_5-在-http-授权管理器中使用多个凭据","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721453792000,"updatedTime":1721453792000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.69,"words":1407},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-Basic Authentication in JMeter.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>当我们使用 JMeter 进行性能测试时，可能会遇到通过 HTTP 基础认证协议保护的 Web 服务。</p>\\n<p>在本教程中，我们将看到如何在测试期间配置 Apache JMeter 以提供必要的凭据。</p>\\n<h2>2. 什么是基础认证？</h2>\\n<p>基础认证是我们可以用于保护 Web 资源的最简单访问控制方法。它由客户端发送的 HTTP 头组成：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>Authorization: Basic `&lt;credentials&gt;`\\n</code></pre></div>","autoDesc":true}');export{d as comp,m as data};
