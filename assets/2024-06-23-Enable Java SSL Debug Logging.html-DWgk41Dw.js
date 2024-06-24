import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-Bp5G1SUF.js";const t={},p=e(`<h1 id="启用java-ssl调试日志" tabindex="-1"><a class="header-anchor" href="#启用java-ssl调试日志"><span>启用Java SSL调试日志</span></a></h1><p>Java安全套接字层（SSL）调试对于开发者和管理员来说至关重要，它有助于诊断和解决应用程序中与建立安全连接相关的问题。启用SSL调试可以提供关于握手过程、密码套件协商以及其他安全相关活动的洞察。</p><p>在本教程中，我们将通过一系列实践示例探索启用Java SSL调试的各种方法。</p><p>SSL/TLS协议是保护互联网上数据传输的基础。</p><p>在应用程序中使用这些协议时，我们可以使用SSL调试来增强我们系统中SSL保护通信的安全性和效率。它可以帮助我们的方式包括：</p><ul><li>识别异常，如证书不匹配和连接失败</li><li>监控恶意活动</li><li>确保我们使用适当的加密算法实现</li><li>优化性能</li></ul><p>输出片段可能如下所示：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>%% 初始化：[Session-1, SSL_RSA_WITH_AES_256_CBC_SHA]
密码套件：SSL_RSA_WITH_AES_256_CBC_SHA
ServerKeyExchange：EC Diffie-Hellman 服务器参数：[...]
*** ServerHelloDone
证书链长度：1
*** 证书链
[...]
应用程序数据：&quot;Hello, World!&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，输出从会话初始化开始，然后是所选密码套件的详细信息、密钥交换参数和握手的完成。它还包括有关证书链和安全传输的应用程序数据的信息。</p><h2 id="_3-使用命令行选项" tabindex="-1"><a class="header-anchor" href="#_3-使用命令行选项"><span><strong>3. 使用命令行选项</strong></span></a></h2><p>通过命令行选项启用SSL调试是一种直接的方法。<strong>Java允许我们通过_javax.net.debug_系统属性进行配置</strong>。这个属性接受各种调试选项，允许用户自定义调试输出的详细程度：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-Djavax.net.debug</span><span class="token operator">=</span>ssl <span class="token parameter variable">-jar</span> MyApp.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>此命令激活了所有SSL相关活动的调试</strong>。对于更详细的调试，一些其他有用的选项包括：</p><ul><li><em>handshake</em> 用于SSL握手期间的详细信息</li><li><em>keygen</em> 用于密钥生成的详细信息</li><li><em>record</em> 用于记录层处理的信息</li></ul><p>官方文档中提供了完整的选项列表。</p><p>让我们使用_handshake_选项生成与握手过程相关的SSL日志：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-Djavax.net.debug</span><span class="token operator">=</span>ssl:handshake <span class="token parameter variable">-jar</span> MyApp.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行上述命令后，输出将包含握手的详细信息。这在排除客户端和服务器之间建立SSL/TLS连接的初始阶段的问题时非常有用。以下是日志片段：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Allow unsafe renegotiation: false
Allow legacy hello messages: true
Is initial handshake: true
Is secure renegotiation: false
...
main, READ: TLSv1.2 Handshake, length = 232
...
*** ClientHello, TLSv1.2
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出包括有关协商过程、使用的协议版本（在本例中为TLSv1.2）以及客户端和服务器之间交换的初始握手消息的详细信息。</p><h2 id="_4-使用系统属性" tabindex="-1"><a class="header-anchor" href="#_4-使用系统属性"><span><strong>4. 使用系统属性</strong></span></a></h2><p>在某些情况下，我们可能希望在运行时动态启用SSL调试日志。我们可以通过以编程方式更改_javax.net.debug_系统属性的值来实现这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">enableSSLDebugUsingSystemProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;javax.net.debug&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ssl&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们尝试发起一个虚拟的HTTPS请求以检索日志：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">makeHttpsRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> url <span class="token operator">=</span> <span class="token string">&quot;https://github.com/eugenp/tutorials&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">URL</span> httpsUrl <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">HttpsURLConnection</span> connection <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">HttpsURLConnection</span><span class="token punctuation">)</span> httpsUrl<span class="token punctuation">.</span><span class="token function">openConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">BufferedReader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span>connection<span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> line<span class="token punctuation">;</span>
        logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Response from &quot;</span> <span class="token operator">+</span> url <span class="token operator">+</span> <span class="token string">&quot;:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>line <span class="token operator">=</span> reader<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法允许我们根据应用程序中的特定事件或条件开启或关闭日志记录：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenSSLDebuggingEnabled_whenUsingSystemProperties_thenEnableSSLDebugLogging</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ByteArrayOutputStream</span> outContent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setErr</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PrintStream</span><span class="token punctuation">(</span>outContent<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">SSLDebugLogger</span><span class="token punctuation">.</span><span class="token function">enableSSLDebugUsingSystemProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;ssl&quot;</span><span class="token punctuation">,</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;javax.net.debug&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">SSLDebugLogger</span><span class="token punctuation">.</span><span class="token function">makeHttpsRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>outContent<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;javax.net.ssl|DEBUG|&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    outContent<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">clearProperty</span><span class="token punctuation">(</span><span class="token string">&quot;javax.net.debug&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNull</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;javax.net.debug&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">SSLDebugLogger</span><span class="token punctuation">.</span><span class="token function">makeHttpsRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>outContent<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用系统属性启用SSL调试提供了一个快速设置，不需要任何配置文件，并允许即时调试。</p><h2 id="_5-使用日志配置文件" tabindex="-1"><a class="header-anchor" href="#_5-使用日志配置文件"><span><strong>5. 使用日志配置文件</strong></span></a></h2><p>我们还可以通过创建_logging.properties_文件并将其放置在类路径中来配置Java日志记录以捕获SSL调试信息。</p><p>让我们向_logging.properties_文件添加以下行以启用日志记录：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">java.util.logging.ConsoleHandler.level</span><span class="token punctuation">=</span><span class="token value attr-value">ALL</span>
<span class="token key attr-name">java.net.ssl.handlers</span><span class="token punctuation">=</span><span class="token value attr-value">java.util.logging.ConsoleHandler</span>
<span class="token key attr-name">javax.net.ssl.level</span><span class="token punctuation">=</span><span class="token value attr-value">ALL</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些属性告诉控制台处理器捕获所有级别的消息。</p><p>让我们用一个单元测试来测试新的行为：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenSSLDebuggingEnabled_whenUsingConfigurationFile_thenEnableSSLDebugLogging</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">InputStream</span> configFile <span class="token operator">=</span> <span class="token class-name">SSLDebugLoggerUnitTest</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span><span class="token string">&quot;logging.properties&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">LogManager</span><span class="token punctuation">.</span><span class="token function">getLogManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">readConfiguration</span><span class="token punctuation">(</span>configFile<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Logger</span> sslLogger <span class="token operator">=</span> <span class="token class-name">Logger</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token string">&quot;javax.net.ssl&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ConsoleHandler</span> consoleHandler <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">ConsoleHandler</span><span class="token punctuation">)</span> sslLogger<span class="token punctuation">.</span><span class="token function">getHandlers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token class-name">Level</span> consoleHandlerLevel <span class="token operator">=</span> consoleHandler<span class="token punctuation">.</span><span class="token function">getLevel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Level</span><span class="token punctuation">.</span><span class="token constant">ALL</span><span class="token punctuation">,</span> consoleHandlerLevel<span class="token punctuation">,</span> <span class="token string">&quot;SSL ConsoleHandler level should be ALL&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法提供了对SSL调试设置的细粒度控制，但任何更改通常需要重新启动应用程序。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们看到了在Java中启用SSL调试日志的各种方法，这些方法可以用来深入了解握手过程、证书验证和安全通信的其他方面。这有助于预防和解决与安全相关的问题。</p><p>如常，完整的源代码可在GitHub上获得。</p>`,39),o=[p];function l(c,i){return s(),a("div",null,o)}const d=n(t,[["render",l],["__file","2024-06-23-Enable Java SSL Debug Logging.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-Enable%20Java%20SSL%20Debug%20Logging.html","title":"启用Java SSL调试日志","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Java","SSL"],"tag":["SSL Debug","Java Secure Socket Layer"],"head":[["meta",{"name":"keywords","content":"Java, SSL, Debug, Secure Socket Layer, 调试, 日志"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-Enable%20Java%20SSL%20Debug%20Logging.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"启用Java SSL调试日志"}],["meta",{"property":"og:description","content":"启用Java SSL调试日志 Java安全套接字层（SSL）调试对于开发者和管理员来说至关重要，它有助于诊断和解决应用程序中与建立安全连接相关的问题。启用SSL调试可以提供关于握手过程、密码套件协商以及其他安全相关活动的洞察。 在本教程中，我们将通过一系列实践示例探索启用Java SSL调试的各种方法。 SSL/TLS协议是保护互联网上数据传输的基础。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T21:49:47.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"SSL Debug"}],["meta",{"property":"article:tag","content":"Java Secure Socket Layer"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T21:49:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"启用Java SSL调试日志\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T21:49:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"启用Java SSL调试日志 Java安全套接字层（SSL）调试对于开发者和管理员来说至关重要，它有助于诊断和解决应用程序中与建立安全连接相关的问题。启用SSL调试可以提供关于握手过程、密码套件协商以及其他安全相关活动的洞察。 在本教程中，我们将通过一系列实践示例探索启用Java SSL调试的各种方法。 SSL/TLS协议是保护互联网上数据传输的基础。..."},"headers":[{"level":2,"title":"3. 使用命令行选项","slug":"_3-使用命令行选项","link":"#_3-使用命令行选项","children":[]},{"level":2,"title":"4. 使用系统属性","slug":"_4-使用系统属性","link":"#_4-使用系统属性","children":[]},{"level":2,"title":"5. 使用日志配置文件","slug":"_5-使用日志配置文件","link":"#_5-使用日志配置文件","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719179387000,"updatedTime":1719179387000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.99,"words":1198},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-Enable Java SSL Debug Logging.md","localizedDate":"2024年6月24日","excerpt":"\\n<p>Java安全套接字层（SSL）调试对于开发者和管理员来说至关重要，它有助于诊断和解决应用程序中与建立安全连接相关的问题。启用SSL调试可以提供关于握手过程、密码套件协商以及其他安全相关活动的洞察。</p>\\n<p>在本教程中，我们将通过一系列实践示例探索启用Java SSL调试的各种方法。</p>\\n<p>SSL/TLS协议是保护互联网上数据传输的基础。</p>\\n<p>在应用程序中使用这些协议时，我们可以使用SSL调试来增强我们系统中SSL保护通信的安全性和效率。它可以帮助我们的方式包括：</p>\\n<ul>\\n<li>识别异常，如证书不匹配和连接失败</li>\\n<li>监控恶意活动</li>\\n<li>确保我们使用适当的加密算法实现</li>\\n<li>优化性能</li>\\n</ul>","autoDesc":true}');export{d as comp,k as data};
