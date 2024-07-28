import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-D4B8YWfq.js";const p={},e=t('<hr><h1 id="为apache-httpclient启用日志记录" tabindex="-1"><a class="header-anchor" href="#为apache-httpclient启用日志记录"><span>为Apache HttpClient启用日志记录</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将展示如何在Apache的HttpClient中<strong>启用日志记录</strong>。此外，我们将解释库内部的日志实现方式。之后，我们将展示如何启用不同级别的日志记录。</p><h2 id="_2-日志实现" tabindex="-1"><a class="header-anchor" href="#_2-日志实现"><span>2. 日志实现</span></a></h2><p>HttpClient库提供了高效、最新和功能丰富的HTTP协议客户端实现。</p><p><strong>确实作为一个库，HttpClient不强制实现日志记录</strong>。为此，4.5版本使用Commons Logging提供日志记录。类似地，最新版本5.1使用由SLF4J提供的日志门面。两个版本都使用层次结构模式将记录器与它们的配置相匹配。</p><p>得益于此，可以为单个类或与相同功能相关的所有类设置记录器。</p><h2 id="_3-日志类型" tabindex="-1"><a class="header-anchor" href="#_3-日志类型"><span>3. 日志类型</span></a></h2><p>让我们看看库定义的日志级别。我们可以区分3种类型的日志：</p><ul><li>上下文日志记录 - 记录HttpClient的所有内部操作信息。它也包含线路和头部日志。</li><li>线路日志记录 - 仅记录传输到服务器和从服务器传输的数据</li><li>头部日志记录 - 仅记录HTTP头部</li></ul><p>在4.5版本中，相应的包是**<em>org.apache.http.impl.client_和_org.apache.http.wire, org.apache.http.headers.</em>**</p><p>相应地，在5.1版本中是包**<em>org.apache.hc.client5.http</em>, <em>org.apache.hc.client5.http.wire_和_org.apache.hc.client5.http.headers.</em>**</p><h2 id="_4-log4j配置" tabindex="-1"><a class="header-anchor" href="#_4-log4j配置"><span>4. Log4j配置</span></a></h2><p>让我们看看如何在两个版本中启用日志记录。我们的目标是在两个版本中实现同样的灵活性。<strong>在4.1版本中，我们将日志重定向到SLF4j。因此，可以使用不同的日志框架。</strong></p><h3 id="_4-1-版本4-5配置" tabindex="-1"><a class="header-anchor" href="#_4-1-版本4-5配置"><span>4.1. 版本4.5配置</span></a></h3><p>让我们添加httpclient依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````org.apache.httpcomponents`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````httpclient`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````4.5.8````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusions</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusion</span><span class="token punctuation">&gt;</span></span>`\n            `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````commons-logging`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````\n            `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````commons-logging`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusion</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusions</span><span class="token punctuation">&gt;</span></span>`\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将使用jcl-over-slf4j将日志重定向到SLF4J。因此我们排除了_commons-logging_。然后让我们添加一个依赖项到JCL和SLF4J之间的桥接：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````org.slf4j`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````jcl-over-slf4j`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````1.7.32````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为SLF4J只是一个门面，我们需要一个绑定。在我们的示例中，我们将使用logback：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````ch.qos.logback`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````logback-classic`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````1.2.6````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们创建_ApacheHttpClientUnitTest_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApacheHttpClientUnitTest</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> logger <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">DUMMY_URL</span> <span class="token operator">=</span> <span class="token string">&quot;https://postman-echo.com/get&quot;</span><span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Test</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUseApacheHttpClient_thenCorrect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n        <span class="token class-name">HttpGet</span> request <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HttpGet</span><span class="token punctuation">(</span><span class="token constant">DUMMY_URL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">CloseableHttpClient</span> client <span class="token operator">=</span> <span class="token class-name">HttpClients</span><span class="token punctuation">.</span><span class="token function">createDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n             <span class="token class-name">CloseableHttpResponse</span> response <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token class-name">HttpEntity</span> entity <span class="token operator">=</span> response<span class="token punctuation">.</span><span class="token function">getEntity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            logger<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&quot;Response -&gt; {}&quot;</span><span class="token punctuation">,</span> <span class="token class-name">EntityUtils</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>entity<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该测试获取一个虚拟网页并将内容打印到日志中。</p><p>现在让我们使用_logback.xml_文件定义一个记录器配置：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span> <span class="token attr-name">debug</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>false<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>``\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appender</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>stdout<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ch.qos.logback.core.ConsoleAppender<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>encoder</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pattern</span><span class="token punctuation">&gt;</span></span>`%date [%level] %logger - %msg %n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pattern</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>encoder</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>appender</span><span class="token punctuation">&gt;</span></span>`\n\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>logger</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>com.baeldung.httpclient.readresponsebodystring<span class="token punctuation">&quot;</span></span> <span class="token attr-name">level</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>debug<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>logger</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>org.apache.http<span class="token punctuation">&quot;</span></span> <span class="token attr-name">level</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>debug<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>`\n\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>root</span> <span class="token attr-name">level</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>WARN<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appender-ref</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>stdout<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>root</span><span class="token punctuation">&gt;</span></span>`\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行我们的测试后，所有HttpClient的日志都可以在控制台中找到：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>...\n2021-06-19 22:24:45,378 [DEBUG] org.apache.http.impl.execchain.MainClientExec - Executing request GET /get HTTP/1.1\n2021-06-19 22:24:45,378 [DEBUG] org.apache.http.impl.execchain.MainClientExec - Target auth state: UNCHALLENGED\n2021-06-19 22:24:45,379 [DEBUG] org.apache.http.impl.execchain.MainClientExec - Proxy auth state: UNCHALLENGED\n2021-06-19 22:24:45,382 [DEBUG] org.apache.http.headers - http-outgoing-0 &gt;&gt; GET /get HTTP/1.1\n...\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-版本5-1配置" tabindex="-1"><a class="header-anchor" href="#_4-2-版本5-1配置"><span>4.2. 版本5.1配置</span></a></h3><p>现在让我们看看更高版本的配置。<strong>它包含重新设计的日志记录。因此，它不使用Commons Logging，而是使用SLF4J。</strong> 因此，记录器门面的绑定是唯一的附加依赖项。因此我们将使用_logback-classic_，就像第一个示例一样。</p><p>让我们添加httpclient5依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`````org.apache.httpcomponents.client5`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`````\n    `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````httpclient5`````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````5.1````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们添加一个类似于前面示例的测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApacheHttpClient5UnitTest</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> logger <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">DUMMY_URL</span> <span class="token operator">=</span> <span class="token string">&quot;https://postman-echo.com/get&quot;</span><span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Test</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUseApacheHttpClient_thenCorrect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">ParseException</span> <span class="token punctuation">{</span>\n        <span class="token class-name">HttpGet</span> request <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HttpGet</span><span class="token punctuation">(</span><span class="token constant">DUMMY_URL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">CloseableHttpClient</span> client <span class="token operator">=</span> <span class="token class-name">HttpClients</span><span class="token punctuation">.</span><span class="token function">createDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n             <span class="token class-name">CloseableHttpResponse</span> response <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token class-name">HttpEntity</span> entity <span class="token operator">=</span> response<span class="token punctuation">.</span><span class="token function">getEntity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            logger<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&quot;Response -&gt; {}&quot;</span><span class="token punctuation">,</span> <span class="token class-name">EntityUtils</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>entity<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们需要在_logback.xml_文件中添加一个记录器：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span> <span class="token attr-name">debug</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>false<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>``\n    ...\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>logger</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>org.apache.hc.client5.http<span class="token punctuation">&quot;</span></span> <span class="token attr-name">level</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>debug<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>`\n    ...\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们运行测试类_ApacheHttpClient5UnitTest_并检查输出。它与旧版本类似：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>...\n2021-06-19 22:27:16,944 [DEBUG] org.apache.hc.client5.http.impl.classic.InternalHttpClient - ep-0000000000 endpoint connected\n2021-06-19 22:27:16,944 [DEBUG] org.apache.hc.client5.http.impl.classic.MainClientExec - ex-0000000001 executing GET /get HTTP/1.1\n2021-06-19 22:27:16,944 [DEBUG] org.apache.hc.client5.http.impl.classic.InternalHttpClient - ep-0000000000 start execution ex-0000000001\n2021-06-19 22:27:16,944 [DEBUG] org.apache.hc.client5.http.impl.io.PoolingHttpClientConnectionManager - ep-0000000000 executing exchange ex-0000000001 over http-outgoing-0\n2021-06-19 22:27:16,960 [DEBUG] org.apache.hc.client5.http.headers - http-outgoing-0 &gt;&gt; GET /get HTTP/1.1\n...\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>这就结束了关于如何为Apache的HttpClient配置日志记录的简短教程。首先，我们解释了库中的日志实现方式。其次，我们在两个版本中配置了日志记录并执行了简单的测试用例来显示输出。</p><p>一如既往，示例的源代码可以在GitHub上找到。</p>',42),c=[e];function l(o,i){return s(),a("div",null,c)}const r=n(p,[["render",l],["__file","2024-07-28-Enabling Logging for Apache HttpClient.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-28/2024-07-28-Enabling%20Logging%20for%20Apache%20HttpClient.html","title":"为Apache HttpClient启用日志记录","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["HttpClient","Logging"],"tag":["Apache","HttpClient","Logging"],"head":[["meta",{"name":"keywords","content":"Apache HttpClient, Logging, Enable Logging"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-28/2024-07-28-Enabling%20Logging%20for%20Apache%20HttpClient.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"为Apache HttpClient启用日志记录"}],["meta",{"property":"og:description","content":"为Apache HttpClient启用日志记录 1. 概述 在本教程中，我们将展示如何在Apache的HttpClient中启用日志记录。此外，我们将解释库内部的日志实现方式。之后，我们将展示如何启用不同级别的日志记录。 2. 日志实现 HttpClient库提供了高效、最新和功能丰富的HTTP协议客户端实现。 确实作为一个库，HttpClient不..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-28T10:01:36.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Apache"}],["meta",{"property":"article:tag","content":"HttpClient"}],["meta",{"property":"article:tag","content":"Logging"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-28T10:01:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"为Apache HttpClient启用日志记录\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-28T10:01:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"为Apache HttpClient启用日志记录 1. 概述 在本教程中，我们将展示如何在Apache的HttpClient中启用日志记录。此外，我们将解释库内部的日志实现方式。之后，我们将展示如何启用不同级别的日志记录。 2. 日志实现 HttpClient库提供了高效、最新和功能丰富的HTTP协议客户端实现。 确实作为一个库，HttpClient不..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 日志实现","slug":"_2-日志实现","link":"#_2-日志实现","children":[]},{"level":2,"title":"3. 日志类型","slug":"_3-日志类型","link":"#_3-日志类型","children":[]},{"level":2,"title":"4. Log4j配置","slug":"_4-log4j配置","link":"#_4-log4j配置","children":[{"level":3,"title":"4.1. 版本4.5配置","slug":"_4-1-版本4-5配置","link":"#_4-1-版本4-5配置","children":[]},{"level":3,"title":"4.2. 版本5.1配置","slug":"_4-2-版本5-1配置","link":"#_4-2-版本5-1配置","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1722160896000,"updatedTime":1722160896000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.89,"words":1168},"filePathRelative":"posts/baeldung/2024-07-28/2024-07-28-Enabling Logging for Apache HttpClient.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>为Apache HttpClient启用日志记录</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将展示如何在Apache的HttpClient中<strong>启用日志记录</strong>。此外，我们将解释库内部的日志实现方式。之后，我们将展示如何启用不同级别的日志记录。</p>\\n<h2>2. 日志实现</h2>\\n<p>HttpClient库提供了高效、最新和功能丰富的HTTP协议客户端实现。</p>\\n<p><strong>确实作为一个库，HttpClient不强制实现日志记录</strong>。为此，4.5版本使用Commons Logging提供日志记录。类似地，最新版本5.1使用由SLF4J提供的日志门面。两个版本都使用层次结构模式将记录器与它们的配置相匹配。</p>","autoDesc":true}');export{r as comp,d as data};
