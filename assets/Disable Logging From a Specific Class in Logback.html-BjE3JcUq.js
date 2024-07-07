import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-B0JIQbDY.js";const e={},p=t('<h1 id="在logback中禁用特定类的日志记录" tabindex="-1"><a class="header-anchor" href="#在logback中禁用特定类的日志记录"><span>在Logback中禁用特定类的日志记录</span></a></h1><p>日志记录是任何应用程序的关键组成部分，它提供了对应用程序行为和健康状况的洞察。然而，过度的日志记录可能会使输出变得杂乱无章，特别是当详细的日志来自特定类时，可能会掩盖有用信息。</p><p>在本教程中，我们将探讨如何在Logback中禁用特定类的日志记录。</p><p>在Logback中禁用特定类的日志记录在多种场景下都很有用：</p><ul><li>减少日志量：减少日志量可以帮助我们专注于相关信息，并降低存储/处理成本。</li><li>安全性：一些类可能会无意中记录敏感信息；使它们静音可以降低这种风险。</li><li>性能：过度的日志记录可能会影响性能；禁用详细记录器可以帮助保持应用程序的最佳性能。</li></ul><h2 id="_3-理解logback配置" tabindex="-1"><a class="header-anchor" href="#_3-理解logback配置"><span>3. 理解Logback配置</span></a></h2><p>首先，Logback配置是通过一个XML文件管理的，通常命名为_logback.xml_。该文件定义了记录器、附加器及其格式，允许开发人员控制记录什么以及在哪里记录。</p><p>一个典型的配置包括一个或多个附加器和一个根记录器。附加器定义了输出目的地，如控制台或文件。</p><p>这是一个简单的例子：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appender</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>console<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ch.qos.logback.core.ConsoleAppender<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>``\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>encoder</span><span class="token punctuation">&gt;</span></span>``\n            ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pattern</span><span class="token punctuation">&gt;</span></span>``%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg %n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pattern</span><span class="token punctuation">&gt;</span></span>``\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>encoder</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>appender</span><span class="token punctuation">&gt;</span></span>``\n\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>root</span> <span class="token attr-name">level</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>INFO<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>``\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appender-ref</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>console<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>root</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个配置将_INFO_级别（及更高）的日志定向到控制台，格式化为日期、线程名称、日志级别和日志消息。</p><h2 id="_4-禁用特定类的日志记录" tabindex="-1"><a class="header-anchor" href="#_4-禁用特定类的日志记录"><span>4. 禁用特定类的日志记录</span></a></h2><p>要在Logback中禁用特定类的日志记录，我们可以为该类<strong>定义一个记录器，并将级别设置为_OFF_</strong>。这将使该类的所有日志调用都保持沉默。</p><h3 id="_4-1-我们的-verboseclass" tabindex="-1"><a class="header-anchor" href="#_4-1-我们的-verboseclass"><span>4.1. 我们的_VerboseClass_</span></a></h3><p>让我们创建一个示例_VerboseClass_来说明本教程：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">VerboseClass</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> logger <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">VerboseClass</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Processing data in VerboseClass...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">VerboseClass</span> instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VerboseClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        instance<span class="token punctuation">.</span><span class="token function">process</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Main method completed in VerboseClass&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们可以运行它以查看日志输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>17:49:53.901 [main] INFO  c.b.l.disableclass.VerboseClass - Processing data in VerboseClass...\n17:49:53.902 [main] INFO  c.b.l.disableclass.VerboseClass - Main method completed in VerboseClass\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-禁用-verboseclass-的日志记录" tabindex="-1"><a class="header-anchor" href="#_4-2-禁用-verboseclass-的日志记录"><span>4.2. 禁用_VerboseClass_的日志记录</span></a></h3><p>要禁用其日志，添加一个记录器条目到_logback.xml_：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>logger</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>com.baeldung.logback.disableclass.VerboseClass<span class="token punctuation">&quot;</span></span> <span class="token attr-name">level</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>OFF<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这是添加了这个记录器后的_logback.xml_的样子：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appender</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>console<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ch.qos.logback.core.ConsoleAppender<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>``\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>encoder</span><span class="token punctuation">&gt;</span></span>``\n            ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pattern</span><span class="token punctuation">&gt;</span></span>``%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg %n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pattern</span><span class="token punctuation">&gt;</span></span>``\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>encoder</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>appender</span><span class="token punctuation">&gt;</span></span>``\n\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>logger</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>com.baeldung.logback.disableclass.VerboseClass<span class="token punctuation">&quot;</span></span> <span class="token attr-name">level</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>OFF<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>``\n\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>root</span> <span class="token attr-name">level</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>INFO<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>``\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appender-ref</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>console<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>root</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了这个配置，_VerboseClass_将不再输出日志，而其他类将继续以_INFO_级别或更高级别记录日志。</p><p>最后，我们可以再次运行这个类，并看到没有日志显示。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>总结来说，在Logback中禁用特定类的日志记录是一个强大的功能，有助于管理应用程序日志中的信噪比。将详细或非必要的类的日志级别设置为_OFF_确保日志保持清晰和有意义。这也影响了应用程序的整体性能和安全性。</p><p>本文的示例代码可以在GitHub上找到。</p>',28),o=[p];function l(c,i){return s(),n("div",null,o)}const k=a(e,[["render",l],["__file","Disable Logging From a Specific Class in Logback.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Disable%20Logging%20From%20a%20Specific%20Class%20in%20Logback.html","title":"在Logback中禁用特定类的日志记录","lang":"zh-CN","frontmatter":{"date":"2024-06-15T00:00:00.000Z","category":["Logback","Logging"],"tag":["Logback","Logging","Configuration"],"description":"在Logback中禁用特定类的日志记录 日志记录是任何应用程序的关键组成部分，它提供了对应用程序行为和健康状况的洞察。然而，过度的日志记录可能会使输出变得杂乱无章，特别是当详细的日志来自特定类时，可能会掩盖有用信息。 在本教程中，我们将探讨如何在Logback中禁用特定类的日志记录。 在Logback中禁用特定类的日志记录在多种场景下都很有用： 减少日...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Disable%20Logging%20From%20a%20Specific%20Class%20in%20Logback.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Logback中禁用特定类的日志记录"}],["meta",{"property":"og:description","content":"在Logback中禁用特定类的日志记录 日志记录是任何应用程序的关键组成部分，它提供了对应用程序行为和健康状况的洞察。然而，过度的日志记录可能会使输出变得杂乱无章，特别是当详细的日志来自特定类时，可能会掩盖有用信息。 在本教程中，我们将探讨如何在Logback中禁用特定类的日志记录。 在Logback中禁用特定类的日志记录在多种场景下都很有用： 减少日..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Logback"}],["meta",{"property":"article:tag","content":"Logging"}],["meta",{"property":"article:tag","content":"Configuration"}],["meta",{"property":"article:published_time","content":"2024-06-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Logback中禁用特定类的日志记录\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-15T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"3. 理解Logback配置","slug":"_3-理解logback配置","link":"#_3-理解logback配置","children":[]},{"level":2,"title":"4. 禁用特定类的日志记录","slug":"_4-禁用特定类的日志记录","link":"#_4-禁用特定类的日志记录","children":[{"level":3,"title":"4.1. 我们的_VerboseClass_","slug":"_4-1-我们的-verboseclass","link":"#_4-1-我们的-verboseclass","children":[]},{"level":3,"title":"4.2. 禁用_VerboseClass_的日志记录","slug":"_4-2-禁用-verboseclass-的日志记录","link":"#_4-2-禁用-verboseclass-的日志记录","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.83,"words":848},"filePathRelative":"posts/baeldung/Archive/Disable Logging From a Specific Class in Logback.md","localizedDate":"2024年6月15日","excerpt":"\\n<p>日志记录是任何应用程序的关键组成部分，它提供了对应用程序行为和健康状况的洞察。然而，过度的日志记录可能会使输出变得杂乱无章，特别是当详细的日志来自特定类时，可能会掩盖有用信息。</p>\\n<p>在本教程中，我们将探讨如何在Logback中禁用特定类的日志记录。</p>\\n<p>在Logback中禁用特定类的日志记录在多种场景下都很有用：</p>\\n<ul>\\n<li>减少日志量：减少日志量可以帮助我们专注于相关信息，并降低存储/处理成本。</li>\\n<li>安全性：一些类可能会无意中记录敏感信息；使它们静音可以降低这种风险。</li>\\n<li>性能：过度的日志记录可能会影响性能；禁用详细记录器可以帮助保持应用程序的最佳性能。</li>\\n</ul>","autoDesc":true}');export{k as comp,d as data};
