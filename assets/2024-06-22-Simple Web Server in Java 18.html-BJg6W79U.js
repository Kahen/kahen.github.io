import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-ConjvFaO.js";const t={},p=e(`<h1 id="java-18中的简单web服务器教程" tabindex="-1"><a class="header-anchor" href="#java-18中的简单web服务器教程"><span>Java 18中的简单Web服务器教程</span></a></h1><p>从Java 18开始，我们可以使用JEP 408中引入的简单Web服务器。我们可以通过命令行工具和API访问其功能。</p><p>简单Web服务器提供了一个基础的Web服务器，用于服务静态文件。它被描述为对测试、原型设计和教育非常有用。服务器故意设置得非常简单，并且不打算与Apache Tomcat或Jetty等更完全功能的选项竞争或取代。</p><p>引入该工具的目标之一是让开发人员尽可能少地设置障碍，快速开始Web开发。</p><p>在本教程中，我们将了解简单Web服务器及其工作原理。</p><p>启动服务器最简单和最直接的方法是使用提供的命令行工具。</p><h3 id="_2-1-启动" tabindex="-1"><a class="header-anchor" href="#_2-1-启动"><span>2.1. 启动</span></a></h3><p>我们在这里需要的命令是_jwebserver_。<strong>单独使用命令_jwebserver_就足以启动服务器。</strong></p><p>如果一切正常，我们会看到这个响应：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ jwebserver
默认绑定到回环地址。使用<span class="token string">&quot;-b 0.0.0.0&quot;</span>或<span class="token string">&quot;-b ::&quot;</span>绑定到所有接口。
在127.0.0.1端口8000上服务/usr及其子目录
URL http://127.0.0.1:8000/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>默认情况下，我们运行命令时所在的目录是被服务的目录，如上面示例中的/usr。但是，我们可以使用_d_标志更改目录：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ jwebserver <span class="token parameter variable">-d</span> /opt
默认绑定到回环地址。使用<span class="token string">&quot;-b 0.0.0.0&quot;</span>或<span class="token string">&quot;-b ::&quot;</span>绑定到所有接口。
在127.0.0.1端口8000上服务/opt及其子目录
URL http://127.0.0.1:8000/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，这里我们必须提供绝对路径。</p><p>我们还可以<strong>使用_p_和_b_标志更改端口和地址</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ jwebserver <span class="token parameter variable">-b</span> <span class="token number">0.0</span>.0.0 <span class="token parameter variable">-p</span> <span class="token number">3003</span>
在0.0.0.0（所有接口）端口3003上服务/及其子目录
URL http://192.168.1.1:3003/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行上述配置将使我们的当前目录对网络上的任何人在输出中给定的IP地址上可见。如果我们试图传输文件，这可能很有用，但我们应该确保我们愿意首先分享它们。</p><h3 id="_2-2-get请求" tabindex="-1"><a class="header-anchor" href="#_2-2-get请求"><span>2.2. GET请求</span></a></h3><p><strong>我们可以使用浏览器访问正确的地址和端口来访问Web服务器。</strong> 到达那里后，我们将看到从我们启动服务器的目录开始的文件和子目录列表：</p><p>然后，如果我们访问这些文件中的任何一个，我们将在浏览器中看到它们，并且在终端中也会看到新的一行：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1 - - <span class="token punctuation">[</span>09/Feb/2024:12:06:26 +0000<span class="token punctuation">]</span> <span class="token string">&quot;GET /file.txt HTTP/1.1&quot;</span> <span class="token number">200</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>类似地，当进入一个新的子目录时，我们将看到GET请求记录我们正在访问的目录：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1 - - <span class="token punctuation">[</span>09/Feb/2024:12:06:52 +0000<span class="token punctuation">]</span> <span class="token string">&quot;GET /subdirectory/ HTTP/1.1&quot;</span> <span class="token number">200</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-api" tabindex="-1"><a class="header-anchor" href="#_3-api"><span>3. API</span></a></h2><p>使用简单Web服务器的第二种选项是API。通过使用它，我们可以获得更多的控制并自定义请求的处理方式。</p><h3 id="_3-1-定义服务器" tabindex="-1"><a class="header-anchor" href="#_3-1-定义服务器"><span>3.1. 定义服务器</span></a></h3><p>首先，让我们使用API重新创建我们的命令行Web服务器。</p><p><strong>为此我们将使用类</strong> <em><strong>SimpleFileServer.</strong></em> <strong>我们可以使用这个类做三件事 - 创建一个_HttpServer_，创建一个_HttpHandler_，以及创建一个_HttpFilter_。</strong></p><p>首先，我们只是使用_createFileServer()_创建并启动一个服务器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">InetSocketAddress</span> address <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">InetSocketAddress</span><span class="token punctuation">(</span><span class="token number">8080</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Path</span> path <span class="token operator">=</span> <span class="token class-name">Path</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">HttpServer</span> server <span class="token operator">=</span> <span class="token class-name">SimpleFileServer</span><span class="token punctuation">.</span><span class="token function">createFileServer</span><span class="token punctuation">(</span>address<span class="token punctuation">,</span> path<span class="token punctuation">,</span> <span class="token class-name">SimpleFileServer<span class="token punctuation">.</span>OutputLevel</span><span class="token punctuation">.</span><span class="token constant">VERBOSE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    server<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们指定了一个地址，使用_InetSocketAddress_类。我们也可以在这里更改其余的地址，而不仅仅是端口。</p><p>然后，我们设置了一个_Path_对象，指向我们想要服务的目录。</p><p>接下来，我们将这些作为参数传递给_createFileServer()_，以及日志级别，就像之前一样，我们可以配置这些以满足我们的需求。由此产生的Web服务器与使用命令行工具创建的服务器相同，并且可以通过我们的浏览器在_127.0.0.1:8080_上访问。</p><h3 id="_3-2-处理器" tabindex="-1"><a class="header-anchor" href="#_3-2-处理器"><span>3.2. 处理器</span></a></h3><p>显然，创建上面的服务器并没有提供比命令行工具更多的优势。<strong>要开始获得一些控制，我们需要引入一个_HttpHandler_。</strong></p><p>让我们看看如何向我们的服务器添加自定义处理器。我们可以使用_SimpleFileServer_的另一个方法，_createFileHandler()_来创建处理器。假设我们已经有了一个像之前创建的那样的服务器，我们可以将我们的新处理器附加到它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HttpHandler</span> handler <span class="token operator">=</span> <span class="token class-name">SimpleFileServer</span><span class="token punctuation">.</span><span class="token function">createFileHandler</span><span class="token punctuation">(</span><span class="token class-name">Path</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;/Users&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
server<span class="token punctuation">.</span><span class="token function">createContext</span><span class="token punctuation">(</span><span class="token string">&quot;/test&quot;</span><span class="token punctuation">,</span> handler<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这导致所有流量到_127.0.0.1:8080/test_都通过我们的新处理器。</p><p>我们可以使用处理器做更多的事情。例如，让我们设置一个服务器，模拟在不同端点上允许和拒绝访问。我们可以使用_HttpHandlers.of()_方法来为两者创建响应：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HttpHandler</span> allowedResponse <span class="token operator">=</span> <span class="token class-name">HttpHandlers</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token class-name">Headers</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Allow&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;GET&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;Welcome&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">HttpHandler</span> deniedResponse <span class="token operator">=</span> <span class="token class-name">HttpHandlers</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">401</span><span class="token punctuation">,</span> <span class="token class-name">Headers</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Deny&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;GET&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;Denied&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们需要定义一个_Predicate_来决定何时返回每个响应：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Predicate</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Request</span><span class="token punctuation">&gt;</span></span>\` findAllowedPath <span class="token operator">=</span> r <span class="token operator">-&gt;</span> r<span class="token punctuation">.</span><span class="token function">getRequestURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;/test/allowed&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这只在我们尝试访问URL_/test/allowed_时返回_true_。所有其他端点都失败。</p><p>现在我们可以使用_HttpHandlers.handleOrElse()_，它接受我们的_Predicate_和两个选项。如果_Predicate_通过，则执行第一个，否则执行第二个：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HttpHandler</span> handler <span class="token operator">=</span> <span class="token class-name">HttpHandlers</span><span class="token punctuation">.</span><span class="token function">handleOrElse</span><span class="token punctuation">(</span>findAllowedPath<span class="token punctuation">,</span> allowedResponse<span class="token punctuation">,</span> deniedResponse<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，我们可以像以前一样使用新的_HttpHandler_设置我们的_HttpServer_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HttpServer</span> server <span class="token operator">=</span> <span class="token class-name">SimpleFileServer</span><span class="token punctuation">.</span><span class="token function">createFileServer</span><span class="token punctuation">(</span>address<span class="token punctuation">,</span> path<span class="token punctuation">,</span> <span class="token class-name">SimpleFileServer<span class="token punctuation">.</span>OutputLevel</span><span class="token punctuation">.</span><span class="token constant">VERBOSE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
server<span class="token punctuation">.</span><span class="token function">createContext</span><span class="token punctuation">(</span><span class="token string">&quot;/test&quot;</span><span class="token punctuation">,</span> handler<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>结果是，导航到_http://127.0.0.1:8080/test/allowed_会显示文本‘<em>Welcome</em>’和_200_响应。导航到任何其他路径会显示‘<em>Denied</em>’和_401_响应。我们可以根据需要使用此方法设置测试环境。然而，潜在的复杂性相当低。</p><h3 id="_3-3-过滤器" tabindex="-1"><a class="header-anchor" href="#_3-3-过滤器"><span>3.3. 过滤器</span></a></h3><p><em>SimpleFileServer_类的最后一部分是创建一个_Filter_的能力。这个_Filter_的作用是处理日志消息。通过定义我们自己的_Filter</em>，我们可以将我们的消息重定向到我们选择的_OutputStream_。</p><p><strong>应用_Filter_时，服务器的创建方式不同。</strong> 首先，我们使用_createOutputFilter()<em>创建_Filter</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Filter</span> filter <span class="token operator">=</span> <span class="token class-name">SimpleFileServer</span><span class="token punctuation">.</span><span class="token function">createOutputFilter</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">,</span> <span class="token class-name">SimpleFileServer<span class="token punctuation">.</span>OutputLevel</span><span class="token punctuation">.</span><span class="token constant">INFO</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们在这里使用了_System.out_作为一个简单的_OutputStream_示例，但我们可以使用任何我们想要的记录器或其他东西。</p><p>接下来，我们将使用_HttpServer_类的_create()<em>方法，使用我们刚刚制作的_filter</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HttpServer</span> server <span class="token operator">=</span> <span class="token class-name">HttpServer</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InetSocketAddress</span><span class="token punctuation">(</span><span class="token number">8080</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token string">&quot;/test&quot;</span><span class="token punctuation">,</span> handler<span class="token punctuation">,</span> filter<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里有几个参数，让我们一一了解。首先，地址以_InetSocketAddress_的形式，像以前一样。其次，一个整数指定套接字回退。这是一次允许的最大TCP连接排队数。第三，我们有上下文。在这里，我们指定我们想要处理打击_127.0.0.1:8080/test_的流量。第四个参数是一个_HttpHandler_，类似于我们之前创建的。最后是我们的_Filter_作为第五个参数。</p><p>这提供了与我们之前使用处理器时相同的功能。<strong>然而，我们现在对日志输出有了完全的控制。</strong></p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们已经看到我们可以快速启动Java 18的简单Web服务器，并且它提供了一些有用的功能。</p><p>首先，我们看到通过使用命令行工具_jwebserver_，我们可以在瞬间启动一个服务器。这个服务器提供了对我们运行它的位置上的文件和子目录的读取访问。</p><p>接着，我们查看了API和可用的新类，如_SimpleFileServer_。使用这个API，我们可以以编程方式实现与命令行工具相同的结果，我们还可以使用_HttpHandler_和_Filter_扩展我们的控制。</p><p>如常，示例的完整代码可在GitHub上找到。</p>`,61),l=[p];function o(c,i){return s(),n("div",null,l)}const d=a(t,[["render",o],["__file","2024-06-22-Simple Web Server in Java 18.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-Simple%20Web%20Server%20in%20Java%2018.html","title":"Java 18中的简单Web服务器教程","lang":"zh-CN","frontmatter":{"date":"2024-02-09T00:00:00.000Z","category":["Java","Web Server"],"tag":["Java 18","Simple Web Server"],"head":[["meta",{"name":"keywords","content":"Java 18, Simple Web Server, JEP 408, jwebserver, API, HttpServer, HttpHandler, HttpFilter"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-Simple%20Web%20Server%20in%20Java%2018.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 18中的简单Web服务器教程"}],["meta",{"property":"og:description","content":"Java 18中的简单Web服务器教程 从Java 18开始，我们可以使用JEP 408中引入的简单Web服务器。我们可以通过命令行工具和API访问其功能。 简单Web服务器提供了一个基础的Web服务器，用于服务静态文件。它被描述为对测试、原型设计和教育非常有用。服务器故意设置得非常简单，并且不打算与Apache Tomcat或Jetty等更完全功能的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T01:46:35.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 18"}],["meta",{"property":"article:tag","content":"Simple Web Server"}],["meta",{"property":"article:published_time","content":"2024-02-09T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T01:46:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 18中的简单Web服务器教程\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-02-09T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T01:46:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 18中的简单Web服务器教程 从Java 18开始，我们可以使用JEP 408中引入的简单Web服务器。我们可以通过命令行工具和API访问其功能。 简单Web服务器提供了一个基础的Web服务器，用于服务静态文件。它被描述为对测试、原型设计和教育非常有用。服务器故意设置得非常简单，并且不打算与Apache Tomcat或Jetty等更完全功能的..."},"headers":[{"level":3,"title":"2.1. 启动","slug":"_2-1-启动","link":"#_2-1-启动","children":[]},{"level":3,"title":"2.2. GET请求","slug":"_2-2-get请求","link":"#_2-2-get请求","children":[]},{"level":2,"title":"3. API","slug":"_3-api","link":"#_3-api","children":[{"level":3,"title":"3.1. 定义服务器","slug":"_3-1-定义服务器","link":"#_3-1-定义服务器","children":[]},{"level":3,"title":"3.2. 处理器","slug":"_3-2-处理器","link":"#_3-2-处理器","children":[]},{"level":3,"title":"3.3. 过滤器","slug":"_3-3-过滤器","link":"#_3-3-过滤器","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719020795000,"updatedTime":1719020795000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.55,"words":1964},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-Simple Web Server in Java 18.md","localizedDate":"2024年2月9日","excerpt":"\\n<p>从Java 18开始，我们可以使用JEP 408中引入的简单Web服务器。我们可以通过命令行工具和API访问其功能。</p>\\n<p>简单Web服务器提供了一个基础的Web服务器，用于服务静态文件。它被描述为对测试、原型设计和教育非常有用。服务器故意设置得非常简单，并且不打算与Apache Tomcat或Jetty等更完全功能的选项竞争或取代。</p>\\n<p>引入该工具的目标之一是让开发人员尽可能少地设置障碍，快速开始Web开发。</p>\\n<p>在本教程中，我们将了解简单Web服务器及其工作原理。</p>\\n<p>启动服务器最简单和最直接的方法是使用提供的命令行工具。</p>\\n<h3>2.1. 启动</h3>","autoDesc":true}');export{d as comp,k as data};
