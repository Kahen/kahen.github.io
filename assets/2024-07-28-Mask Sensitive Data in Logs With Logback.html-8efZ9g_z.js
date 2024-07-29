import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BUAgDejY.js";const p={},e=t('<hr><h1 id="使用logback在日志中遮蔽敏感数据" tabindex="-1"><a class="header-anchor" href="#使用logback在日志中遮蔽敏感数据"><span>使用Logback在日志中遮蔽敏感数据</span></a></h1><p>在GDPR生效的新世界中，我们不仅要关注许多问题，还必须特别关注记录个人敏感数据的问题。在记录大量数据的同时，遮蔽用户敏感细节非常重要。</p><p>本文教程将展示如何使用Logback在日志中遮蔽敏感数据。虽然这种方法作为我们日志文件的最后防线，但它并不被视为问题的根本解决方案。</p><p>Logback是Java社区中最广泛使用的日志框架之一。它取代了其前身Log4j。Logback提供了更快的实现、更多的配置选项以及在归档旧日志文件时的更多灵活性。</p><p>敏感数据是任何旨在防止未经授权访问的信息。这可以包括从个人身份信息（PII），如社会安全号码，到银行信息、登录凭据、地址、电子邮件等。</p><p>我们将在记录应用程序日志时遮蔽属于用户的敏感数据。</p><h3 id="_3-1-patternlayout" tabindex="-1"><a class="header-anchor" href="#_3-1-patternlayout"><span>3.1. PatternLayout</span></a></h3><p>配置的想法是将每个需要的Logback appender扩展为自定义布局。在我们的案例中，我们将编写一个MaskingPatternLayout类作为PatternLayout的实现。每个遮蔽模式表示匹配一种类型的敏感数据的正则表达式。</p><p>让我们构建MaskingPatternLayout类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MaskingPatternLayout</span> <span class="token keyword">extends</span> <span class="token class-name">PatternLayout</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">Pattern</span> multilinePattern<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">List</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>` maskPatterns <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addMaskPattern</span><span class="token punctuation">(</span><span class="token class-name">String</span> maskPattern<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        maskPatterns<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>maskPattern<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        multilinePattern <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span>maskPatterns<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">joining</span><span class="token punctuation">(</span><span class="token string">&quot;|&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token constant">MULTILINE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">doLayout</span><span class="token punctuation">(</span><span class="token class-name">ILoggingEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token function">maskMessage</span><span class="token punctuation">(</span><span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">doLayout</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">maskMessage</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>multilinePattern <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> message<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> multilinePattern<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>sb<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">while</span> <span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">rangeClosed</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> matcher<span class="token punctuation">.</span><span class="token function">groupCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>group <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n                <span class="token keyword">if</span> <span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span>group<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                    <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">range</span><span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span>group<span class="token punctuation">)</span><span class="token punctuation">,</span> matcher<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span>group<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>i <span class="token operator">-&gt;</span> sb<span class="token punctuation">.</span><span class="token function">setCharAt</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> <span class="token char">&#39;*&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n                <span class="token punctuation">}</span>\n            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">return</span> sb<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>PatternLayout的实现.doLayout()负责在应用程序的每个日志消息中遮蔽匹配的数据，如果它匹配配置的模式之一。</p><p>maskPatterns列表来自logback.xml构建了一个多行模式。不幸的是，Logback引擎不支持构造函数注入。如果它以属性列表的形式出现，addMaskPattern将为每个配置条目调用。因此，我们必须每次向列表添加新的正则表达式时编译模式。</p><h3 id="_3-2-配置" tabindex="-1"><a class="header-anchor" href="#_3-2-配置"><span>3.2. 配置</span></a></h3><p>通常，我们可以使用正则表达式模式来遮蔽敏感用户详细信息。</p><p>例如，对于社会安全号码，我们可以使用如下正则表达式：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&quot;SSN&quot;\\s*:\\s*&quot;(.*)&quot;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>对于地址，我们可以使用：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&quot;address&quot;\\s*:\\s*&quot;(.*?)&quot;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外，对于IP地址数据模式（192.169.0.1），我们可以使用正则表达式：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>(\\d+\\.\\d+\\.\\d+\\.\\d+)\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，对于电子邮件，我们可以编写：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>([\\w.-]+@[\\w.-]+\\.\\w+)\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，我们将这些正则表达式模式添加到logback.xml文件中的maskPattern标签内：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appender</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>mask<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ch.qos.logback.core.ConsoleAppender<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>encoder</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ch.qos.logback.core.encoder.LayoutWrappingEncoder<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n           `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>layout</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>com.baeldung.logback.MaskingPatternLayout<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n               ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maskPattern</span><span class="token punctuation">&gt;</span></span>````&quot;SSN&quot;\\s*:\\s*&quot;(.*?)&quot;````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maskPattern</span><span class="token punctuation">&gt;</span></span>```` `<span class="token comment">&lt;!-- SSN JSON模式 --&gt;</span>`\n               ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maskPattern</span><span class="token punctuation">&gt;</span></span>````&quot;address&quot;\\s*:\\s*&quot;(.*?)&quot;````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maskPattern</span><span class="token punctuation">&gt;</span></span>```` `<span class="token comment">&lt;!-- 地址JSON模式 --&gt;</span>`\n               ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maskPattern</span><span class="token punctuation">&gt;</span></span>````(\\d+\\.\\d+\\.\\d+\\.\\d+)````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maskPattern</span><span class="token punctuation">&gt;</span></span>```` `<span class="token comment">&lt;!-- IP地址IPv4模式 --&gt;</span>`\n               ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maskPattern</span><span class="token punctuation">&gt;</span></span>````([\\w.-]+@[\\w.-]+\\.\\w+)````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maskPattern</span><span class="token punctuation">&gt;</span></span>```` `<span class="token comment">&lt;!-- 电子邮件模式 --&gt;</span>`\n               `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pattern</span><span class="token punctuation">&gt;</span></span>`%-5p [%d{ISO8601,UTC}] [%thread] %c: %m%n%rootException`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pattern</span><span class="token punctuation">&gt;</span></span>`\n           `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>layout</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>encoder</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>appender</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-执行" tabindex="-1"><a class="header-anchor" href="#_3-3-执行"><span>3.3. 执行</span></a></h3><p>现在，我们将为上述示例创建JSON，并使用logger.info()记录详细信息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>` user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nuser<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;user_id&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;87656&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nuser<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;SSN&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;786445563&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nuser<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;address&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;22 Street&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nuser<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;city&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Chicago&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nuser<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Country&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;U.S.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nuser<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;ip_address&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;192.168.1.1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nuser<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;email_id&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;spring-boot.3@baeldung.cs.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">JSONObject</span> userDetails <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nlogger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;User JSON: {}&quot;</span><span class="token punctuation">,</span> userDetails<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行后，我们可以看到输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>INFO  [2021-06-01 16:04:12,059] [main] com.baeldung.logback.MaskingPatternLayoutExample: User JSON:\n{&quot;email_id&quot;:&quot;*******************&quot;,&quot;address&quot;:&quot;*********&quot;,&quot;user_id&quot;:&quot;87656&quot;,&quot;city&quot;:&quot;Chicago&quot;,&quot;Country&quot;:&quot;U.S.&quot;, &quot;ip_address&quot;:&quot;**********&quot;,&quot;SSN&quot;:&quot;*********&quot;}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们可以看到日志中的用户JSON已经被遮蔽：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{\n    &quot;user_id&quot;:&quot;87656&quot;,\n    &quot;ssn&quot;:&quot;*********&quot;,\n    &quot;address&quot;:&quot;*********&quot;,\n    &quot;city&quot;:&quot;Chicago&quot;,\n    &quot;Country&quot;:&quot;U.S.&quot;,\n    &quot;ip_address&quot;:&quot;*********&quot;,\n    &quot;email_id&quot;:&quot;*****************&quot;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这种方法，我们只能为在logback.xml中定义了正则表达式的maskPattern的日志文件遮蔽数据。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本教程中，我们介绍了如何使用PatternLayout功能在Logback中遮蔽应用程序日志中的敏感数据，以及如何在logback.xml中添加正则表达式模式来遮蔽特定数据。</p><p>像往常一样，代码片段可以在GitHub上找到。</p>',36),o=[e];function c(u,l){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-28-Mask Sensitive Data in Logs With Logback.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-28/2024-07-28-Mask%20Sensitive%20Data%20in%20Logs%20With%20Logback.html","title":"使用Logback在日志中遮蔽敏感数据","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Logback","日志"],"tag":["日志","敏感数据","脱敏"],"head":[["meta",{"name":"日志脱敏","content":"使用Logback进行日志脱敏的教程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-28/2024-07-28-Mask%20Sensitive%20Data%20in%20Logs%20With%20Logback.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Logback在日志中遮蔽敏感数据"}],["meta",{"property":"og:description","content":"使用Logback在日志中遮蔽敏感数据 在GDPR生效的新世界中，我们不仅要关注许多问题，还必须特别关注记录个人敏感数据的问题。在记录大量数据的同时，遮蔽用户敏感细节非常重要。 本文教程将展示如何使用Logback在日志中遮蔽敏感数据。虽然这种方法作为我们日志文件的最后防线，但它并不被视为问题的根本解决方案。 Logback是Java社区中最广泛使用的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-29T00:03:01.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"日志"}],["meta",{"property":"article:tag","content":"敏感数据"}],["meta",{"property":"article:tag","content":"脱敏"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-29T00:03:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Logback在日志中遮蔽敏感数据\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-29T00:03:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Logback在日志中遮蔽敏感数据 在GDPR生效的新世界中，我们不仅要关注许多问题，还必须特别关注记录个人敏感数据的问题。在记录大量数据的同时，遮蔽用户敏感细节非常重要。 本文教程将展示如何使用Logback在日志中遮蔽敏感数据。虽然这种方法作为我们日志文件的最后防线，但它并不被视为问题的根本解决方案。 Logback是Java社区中最广泛使用的..."},"headers":[{"level":3,"title":"3.1. PatternLayout","slug":"_3-1-patternlayout","link":"#_3-1-patternlayout","children":[]},{"level":3,"title":"3.2. 配置","slug":"_3-2-配置","link":"#_3-2-配置","children":[]},{"level":3,"title":"3.3. 执行","slug":"_3-3-执行","link":"#_3-3-执行","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1722211381000,"updatedTime":1722211381000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.47,"words":1042},"filePathRelative":"posts/baeldung/2024-07-28/2024-07-28-Mask Sensitive Data in Logs With Logback.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>使用Logback在日志中遮蔽敏感数据</h1>\\n<p>在GDPR生效的新世界中，我们不仅要关注许多问题，还必须特别关注记录个人敏感数据的问题。在记录大量数据的同时，遮蔽用户敏感细节非常重要。</p>\\n<p>本文教程将展示如何使用Logback在日志中遮蔽敏感数据。虽然这种方法作为我们日志文件的最后防线，但它并不被视为问题的根本解决方案。</p>\\n<p>Logback是Java社区中最广泛使用的日志框架之一。它取代了其前身Log4j。Logback提供了更快的实现、更多的配置选项以及在归档旧日志文件时的更多灵活性。</p>\\n<p>敏感数据是任何旨在防止未经授权访问的信息。这可以包括从个人身份信息（PII），如社会安全号码，到银行信息、登录凭据、地址、电子邮件等。</p>","autoDesc":true}');export{r as comp,d as data};
