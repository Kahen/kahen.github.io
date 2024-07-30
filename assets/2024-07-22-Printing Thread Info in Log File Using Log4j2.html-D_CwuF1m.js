import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CbPcg273.js";const e={},o=t(`<hr><h1 id="使用log4j2记录线程信息到日志文件" tabindex="-1"><a class="header-anchor" href="#使用log4j2记录线程信息到日志文件"><span>使用Log4j2记录线程信息到日志文件</span></a></h1><p>这篇文章将展示如何使用Log4j2库记录线程信息的概念和示例。</p><p>日志是提供系统发生错误或流程时上下文的强大工具。日志帮助我们捕获并持久化相关信息，以便随时分析。</p><p>线程允许我们的应用程序同时执行多项任务，以处理更多请求，使我们的工作更加高效。</p><p>许多Java应用程序使用日志和线程来控制这种情况。然而，由于日志通常集中在特定文件中，来自不同线程的日志会混乱，用户无法识别和理解事件的顺序。我们将使用Java最流行的日志框架之一Log4j2，展示有关我们线程的相关信息，以解决这个问题。</p><p>接下来，我们有一个示例，使用Log4j2中的一些参数来显示有关我们线程的信息：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>LOG_PATTERN<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\` %d{yyyy-MM-dd HH:mm:ss.SSS} --- thread_id=&quot;%tid&quot; thread_name=&quot;%tn&quot; thread_priority=&quot;%tp&quot; --- [%p] %m%n \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Property</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Log4j2在其模式中使用参数来引用数据。所有参数都以_%_开头。以下是一些线程参数的示例：</p><ul><li><strong><em>tid</em></strong>: 线程标识符是在创建线程时生成的正长数字。</li><li><strong><em>tn</em></strong>: 它是命名线程的字符序列。</li><li><strong><em>tp</em></strong>: 线程优先级是介于1到10之间的整数，数字越大表示优先级越高。</li></ul><p>首先，正如建议的，我们正在添加有关线程的id、名称和优先级的信息。因此，为了可视化它，我们需要创建一个简单的应用程序，创建新线程并记录一些信息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Log4j2ThreadInfo</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> logger <span class="token operator">=</span> <span class="token class-name">LogManager</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">Log4j2ThreadInfo</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>i <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token class-name">Runnable</span> runnable <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Logging info&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Thread</span> thread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>runnable<span class="token punctuation">)</span><span class="token punctuation">;</span>
            thread<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>换句话说，我们正在使用Java Streams的帮助，在0到5的范围内运行一个forEach，然后启动一个带有一些日志的新线程。结果，我们将得到：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>2022-01-14 23:44:56.893 --- thread_id=&quot;22&quot; thread_name=&quot;Thread-2&quot; thread_priority=&quot;5&quot; --- [INFO] Logging info
2022-01-14 23:44:56.893 --- thread_id=&quot;21&quot; thread_name=&quot;Thread-1&quot; thread_priority=&quot;5&quot; --- [INFO] Logging info
2022-01-14 23:44:56.893 --- thread_id=&quot;20&quot; thread_name=&quot;Thread-0&quot; thread_priority=&quot;5&quot; --- [INFO] Logging info
2022-01-14 23:44:56.893 --- thread_id=&quot;24&quot; thread_name=&quot;Thread-4&quot; thread_priority=&quot;5&quot; --- [INFO] Logging info
2022-01-14 23:44:56.893 --- thread_id=&quot;23&quot; thread_name=&quot;Thread-3&quot; thread_priority=&quot;5&quot; --- [INFO] Logging info
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>本文展示了一种简单的方法，使用Log4j2参数将线程信息添加到您的Java项目中。如果你想查看代码，它在GitHub上有提供。</p>`,15),p=[o];function i(c,l){return s(),a("div",null,p)}const d=n(e,[["render",i],["__file","2024-07-22-Printing Thread Info in Log File Using Log4j2.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-22/2024-07-22-Printing%20Thread%20Info%20in%20Log%20File%20Using%20Log4j2.html","title":"使用Log4j2记录线程信息到日志文件","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Logging"],"tag":["Log4j2","Thread Information"],"head":[["meta",{"name":"keywords","content":"Log4j2, Thread Information, Logging"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-22/2024-07-22-Printing%20Thread%20Info%20in%20Log%20File%20Using%20Log4j2.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Log4j2记录线程信息到日志文件"}],["meta",{"property":"og:description","content":"使用Log4j2记录线程信息到日志文件 这篇文章将展示如何使用Log4j2库记录线程信息的概念和示例。 日志是提供系统发生错误或流程时上下文的强大工具。日志帮助我们捕获并持久化相关信息，以便随时分析。 线程允许我们的应用程序同时执行多项任务，以处理更多请求，使我们的工作更加高效。 许多Java应用程序使用日志和线程来控制这种情况。然而，由于日志通常集中..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T03:18:43.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Log4j2"}],["meta",{"property":"article:tag","content":"Thread Information"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-22T03:18:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Log4j2记录线程信息到日志文件\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-22T03:18:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Log4j2记录线程信息到日志文件 这篇文章将展示如何使用Log4j2库记录线程信息的概念和示例。 日志是提供系统发生错误或流程时上下文的强大工具。日志帮助我们捕获并持久化相关信息，以便随时分析。 线程允许我们的应用程序同时执行多项任务，以处理更多请求，使我们的工作更加高效。 许多Java应用程序使用日志和线程来控制这种情况。然而，由于日志通常集中..."},"headers":[],"git":{"createdTime":1721618323000,"updatedTime":1721618323000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.21,"words":662},"filePathRelative":"posts/baeldung/2024-07-22/2024-07-22-Printing Thread Info in Log File Using Log4j2.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>使用Log4j2记录线程信息到日志文件</h1>\\n<p>这篇文章将展示如何使用Log4j2库记录线程信息的概念和示例。</p>\\n<p>日志是提供系统发生错误或流程时上下文的强大工具。日志帮助我们捕获并持久化相关信息，以便随时分析。</p>\\n<p>线程允许我们的应用程序同时执行多项任务，以处理更多请求，使我们的工作更加高效。</p>\\n<p>许多Java应用程序使用日志和线程来控制这种情况。然而，由于日志通常集中在特定文件中，来自不同线程的日志会混乱，用户无法识别和理解事件的顺序。我们将使用Java最流行的日志框架之一Log4j2，展示有关我们线程的相关信息，以解决这个问题。</p>","autoDesc":true}');export{d as comp,g as data};
