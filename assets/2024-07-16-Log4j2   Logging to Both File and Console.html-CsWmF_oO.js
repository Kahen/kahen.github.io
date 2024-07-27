import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-CBerKIce.js";const e={},p=t('<hr><h1 id="使用apache-log4j2库同时记录日志到文件和控制台" tabindex="-1"><a class="header-anchor" href="#使用apache-log4j2库同时记录日志到文件和控制台"><span>使用Apache Log4j2库同时记录日志到文件和控制台</span></a></h1><p>在本教程中，我们将探讨如何使用Apache Log4j2库将消息记录到文件和控制台。这在非生产环境中非常有用，我们可能希望在控制台中看到调试消息，并且我们可能希望将更高级别的日志持久化到文件中，以便后续分析。</p><h3 id="_2-1-log4j2依赖" tabindex="-1"><a class="header-anchor" href="#_2-1-log4j2依赖"><span>2.1. Log4j2依赖</span></a></h3><p>让我们将log4j2依赖项添加到我们的项目中。我们需要Apache Log4J Core和Apache Log4J API依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>`\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.apache.logging.log4j``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``log4j-core``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``2.19.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.apache.logging.log4j``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``log4j-api``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``2.19.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-应用程序类" tabindex="-1"><a class="header-anchor" href="#_2-2-应用程序类"><span>2.2. 应用程序类</span></a></h3><p>现在让我们使用log4j2库为我们的应用程序添加一些日志记录：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Log4j2ConsoleAndFile</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> logger <span class="token operator">=</span> <span class="token class-name">LogManager</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">Log4j2ConsoleAndFile</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        logger<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-控制台日志记录" tabindex="-1"><a class="header-anchor" href="#_3-1-控制台日志记录"><span>3.1. 控制台日志记录</span></a></h3><p>要记录到任何目的地，我们首先需要定义一个记录到控制台的appender。让我们看看如何配置：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">appender.console.type</span> <span class="token punctuation">=</span> <span class="token value attr-value">Console</span>\n<span class="token key attr-name">appender.console.name</span> <span class="token punctuation">=</span> <span class="token value attr-value">STDOUT</span>\n<span class="token key attr-name">appender.console.layout.type</span> <span class="token punctuation">=</span> <span class="token value attr-value">PatternLayout</span>\n<span class="token key attr-name">appender.console.layout.pattern</span> <span class="token punctuation">=</span> <span class="token value attr-value">[%-5level] %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %c{1} - %msg%n</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-文件日志记录" tabindex="-1"><a class="header-anchor" href="#_3-2-文件日志记录"><span>3.2. 文件日志记录</span></a></h3><p>类似地，我们可以配置记录器记录到文件。这对于持久化日志非常有用。让我们定义一个文件appender：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">appender.file.type</span> <span class="token punctuation">=</span> <span class="token value attr-value">File</span>\n<span class="token key attr-name">appender.file.name</span> <span class="token punctuation">=</span> <span class="token value attr-value">LOGFILE</span>\n<span class="token key attr-name">appender.file.fileName</span><span class="token punctuation">=</span><span class="token value attr-value">logs/log4j.log</span>\n<span class="token key attr-name">appender.file.layout.type</span><span class="token punctuation">=</span><span class="token value attr-value">PatternLayout</span>\n<span class="token key attr-name">appender.file.layout.pattern</span><span class="token punctuation">=</span><span class="token value attr-value">[%-5level] %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %c{1} - %msg%n</span>\n<span class="token key attr-name">appender.file.filter.threshold.type</span> <span class="token punctuation">=</span> <span class="token value attr-value">ThresholdFilter</span>\n<span class="token key attr-name">appender.file.filter.threshold.level</span> <span class="token punctuation">=</span> <span class="token value attr-value">info</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-测试" tabindex="-1"><a class="header-anchor" href="#_4-测试"><span>4. 测试</span></a></h2><p>现在让我们运行应用程序并检查控制台中的输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>12:43:47,891 INFO  Application:8 - Hello World!\n12:43:47,892 DEBUG Application:9 - Hello World!\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如预期的那样，我们可以看到控制台中的两个日志消息。如果我们检查路径_logs/log4j.log_中的日志文件，我们只能看到_info_级别的日志消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>12:43:47,891 INFO  Application:8 - Hello World!\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何将消息记录到控制台和文件。我们创建了一个Java项目，使用属性文件配置了Log4j2，并测试了消息是否打印到控制台和文件。如常，完整的源代码可在GitHub上找到。</p>',22),o=[p];function l(c,i){return s(),n("div",null,o)}const d=a(e,[["render",l],["__file","2024-07-16-Log4j2   Logging to Both File and Console.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-Log4j2%20%20%20Logging%20to%20Both%20File%20and%20Console.html","title":"使用Apache Log4j2库同时记录日志到文件和控制台","lang":"zh-CN","frontmatter":{"date":"2024-07-16T00:00:00.000Z","category":["Java","Log4j2"],"tag":["日志","文件","控制台"],"head":[["meta",{"name":"keywords","content":"Log4j2, 日志记录, 文件, 控制台, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-Log4j2%20%20%20Logging%20to%20Both%20File%20and%20Console.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Apache Log4j2库同时记录日志到文件和控制台"}],["meta",{"property":"og:description","content":"使用Apache Log4j2库同时记录日志到文件和控制台 在本教程中，我们将探讨如何使用Apache Log4j2库将消息记录到文件和控制台。这在非生产环境中非常有用，我们可能希望在控制台中看到调试消息，并且我们可能希望将更高级别的日志持久化到文件中，以便后续分析。 2.1. Log4j2依赖 让我们将log4j2依赖项添加到我们的项目中。我们需要A..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T06:06:01.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"日志"}],["meta",{"property":"article:tag","content":"文件"}],["meta",{"property":"article:tag","content":"控制台"}],["meta",{"property":"article:published_time","content":"2024-07-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T06:06:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Apache Log4j2库同时记录日志到文件和控制台\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T06:06:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Apache Log4j2库同时记录日志到文件和控制台 在本教程中，我们将探讨如何使用Apache Log4j2库将消息记录到文件和控制台。这在非生产环境中非常有用，我们可能希望在控制台中看到调试消息，并且我们可能希望将更高级别的日志持久化到文件中，以便后续分析。 2.1. Log4j2依赖 让我们将log4j2依赖项添加到我们的项目中。我们需要A..."},"headers":[{"level":3,"title":"2.1. Log4j2依赖","slug":"_2-1-log4j2依赖","link":"#_2-1-log4j2依赖","children":[]},{"level":3,"title":"2.2. 应用程序类","slug":"_2-2-应用程序类","link":"#_2-2-应用程序类","children":[]},{"level":3,"title":"3.1. 控制台日志记录","slug":"_3-1-控制台日志记录","link":"#_3-1-控制台日志记录","children":[]},{"level":3,"title":"3.2. 文件日志记录","slug":"_3-2-文件日志记录","link":"#_3-2-文件日志记录","children":[]},{"level":2,"title":"4. 测试","slug":"_4-测试","link":"#_4-测试","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721109961000,"updatedTime":1721109961000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.9,"words":571},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-Log4j2   Logging to Both File and Console.md","localizedDate":"2024年7月16日","excerpt":"<hr>\\n<h1>使用Apache Log4j2库同时记录日志到文件和控制台</h1>\\n<p>在本教程中，我们将探讨如何使用Apache Log4j2库将消息记录到文件和控制台。这在非生产环境中非常有用，我们可能希望在控制台中看到调试消息，并且我们可能希望将更高级别的日志持久化到文件中，以便后续分析。</p>\\n<h3>2.1. Log4j2依赖</h3>\\n<p>让我们将log4j2依赖项添加到我们的项目中。我们需要Apache Log4J Core和Apache Log4J API依赖项：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependencies</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n        ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>``org.apache.logging.log4j``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n        ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>``log4j-core``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n        ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>``2.19.0``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n        ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>``org.apache.logging.log4j``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n        ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>``log4j-api``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n        ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>``2.19.0``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependencies</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n</code></pre></div>","autoDesc":true}');export{d as comp,g as data};
