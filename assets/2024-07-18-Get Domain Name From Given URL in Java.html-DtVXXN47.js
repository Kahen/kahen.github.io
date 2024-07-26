import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-8nJ1rqSf.js";const e={},p=t(`<h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在这篇简短的文章中，我们将探讨在Java中从给定URL获取域名的不同方法。</p><h2 id="_2-什么是域名" tabindex="-1"><a class="header-anchor" href="#_2-什么是域名"><span>2. 什么是域名？</span></a></h2><p>简单来说，域名是一个指向IP地址的字符串。它是统一资源定位器（URL）的一部分。使用域名，用户可以通过客户端软件访问特定网站。</p><p>域名通常由两到三个部分组成，每个部分由点分隔。</p><p>从末尾开始，域名可能包括：</p><ul><li>顶级域名（例如，bealdung.com中的_com_），</li><li>二级域名（例如，google.co.uk中的_co_或baeldung.com中的_baeldung_），</li><li>三级域名（例如，google.co.uk中的_google_）</li></ul><p>域名需要遵循域名系统（DNS）指定的规则和程序。</p><h2 id="_3-使用uri类" tabindex="-1"><a class="header-anchor" href="#_3-使用uri类"><span>3. 使用URI类</span></a></h2><p>让我们看看如何使用_java.net.URI_类从URL中提取域名。_URI_类提供了_getHost()_方法，该方法返回URL的主机组件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">URI</span> uri <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URI</span><span class="token punctuation">(</span><span class="token string">&quot;https://www.baeldung.com/domain&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> host <span class="token operator">=</span> uri<span class="token punctuation">.</span><span class="token function">getHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;www.baeldung.com&quot;</span><span class="token punctuation">,</span> host<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>主机包含子域名以及第三级、第二级和顶级域名。</strong></p><p>此外，为了获取域名，我们需要从给定的主机中移除子域名：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> domainName <span class="token operator">=</span> host<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">&quot;www.&quot;</span><span class="token punctuation">)</span> <span class="token operator">?</span> host<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token operator">:</span> host<span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung.com&quot;</span><span class="token punctuation">,</span> domainName<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，在某些情况下，我们无法使用_URI_类获取域名。例如，如果我们不知道子域名的确切值，我们将无法从URL中提取子域名。</p><h2 id="_4-使用guava库中的-internetdomainname-类" tabindex="-1"><a class="header-anchor" href="#_4-使用guava库中的-internetdomainname-类"><span>4. 使用Guava库中的_InternetDomainName_类</span></a></h2><p>现在我们将看到如何使用_Guava_库和_InternetDomainName_类获取域名。</p><p>_InternetDomainName_类提供了_topPrivateDomain()_方法，该方法返回给定域名中位于公共后缀下一级的部分。<strong>换句话说，该方法将返回顶级、二级和三级域名。</strong></p><p>首先，我们需要从给定的URL值中提取主机。我们可以使用_URI_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> urlString <span class="token operator">=</span> <span class="token string">&quot;https://www.baeldung.com/java-tutorial&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">URI</span> uri <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URI</span><span class="token punctuation">(</span>urlString<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> host <span class="token operator">=</span> uri<span class="token punctuation">.</span><span class="token function">getHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们使用_InternetDomainName_类及其_topPrivateDomain()_方法获取域名：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">InternetDomainName</span> internetDomainName <span class="token operator">=</span> <span class="token class-name">InternetDomainName</span><span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>host<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">topPrivateDomain</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> domainName <span class="token operator">=</span> internetDomainName<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung.com&quot;</span><span class="token punctuation">,</span> domainName<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与_URI_类相比，_InternetDomainName_将从返回值中省略子域名。</p><p>最后，我们也可以从给定的URL中移除顶级域名：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> publicSuffix <span class="token operator">=</span> internetDomainName<span class="token punctuation">.</span><span class="token function">publicSuffix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> name <span class="token operator">=</span> domainName<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> domainName<span class="token punctuation">.</span><span class="token function">lastIndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;.&quot;</span> <span class="token operator">+</span> publicSuffix<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，让我们创建一个测试来检查功能：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">,</span> domainNameClient<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token string">&quot;jira.baeldung.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;google&quot;</span><span class="token punctuation">,</span> domainNameClient<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token string">&quot;www.google.co.uk&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到，结果中既移除了子域名也移除了顶级域名。</p><h2 id="_5-使用正则表达式" tabindex="-1"><a class="header-anchor" href="#_5-使用正则表达式"><span>5. 使用正则表达式</span></a></h2><p>使用正则表达式获取域名可能是具有挑战性的。例如，如果我们不知道确切的子域名值，我们无法确定应该从给定URL中提取哪个词（如果有）。</p><p>另一方面，如果我们知道子域名值，我们可以使用正则表达式从URL中移除它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> url <span class="token operator">=</span> <span class="token string">&quot;https://www.baeldung.com/domain&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> domainName <span class="token operator">=</span>  url<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;http(s)?://|www\\\\.|/.*&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung.com&quot;</span><span class="token punctuation">,</span> domainName<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在这篇文章中，我们探讨了如何从给定的URL中提取域名。像往常一样，示例的源代码可以在GitHub上找到。</p><p>OK</p>`,35),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-18-Get Domain Name From Given URL in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Get%20Domain%20Name%20From%20Given%20URL%20in%20Java.html","title":"","lang":"zh-CN","frontmatter":{"description":"1. 概述 在这篇简短的文章中，我们将探讨在Java中从给定URL获取域名的不同方法。 2. 什么是域名？ 简单来说，域名是一个指向IP地址的字符串。它是统一资源定位器（URL）的一部分。使用域名，用户可以通过客户端软件访问特定网站。 域名通常由两到三个部分组成，每个部分由点分隔。 从末尾开始，域名可能包括： 顶级域名（例如，bealdung.com中...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Get%20Domain%20Name%20From%20Given%20URL%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:description","content":"1. 概述 在这篇简短的文章中，我们将探讨在Java中从给定URL获取域名的不同方法。 2. 什么是域名？ 简单来说，域名是一个指向IP地址的字符串。它是统一资源定位器（URL）的一部分。使用域名，用户可以通过客户端软件访问特定网站。 域名通常由两到三个部分组成，每个部分由点分隔。 从末尾开始，域名可能包括： 顶级域名（例如，bealdung.com中..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T15:09:37.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:modified_time","content":"2024-07-18T15:09:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-07-18T15:09:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 什么是域名？","slug":"_2-什么是域名","link":"#_2-什么是域名","children":[]},{"level":2,"title":"3. 使用URI类","slug":"_3-使用uri类","link":"#_3-使用uri类","children":[]},{"level":2,"title":"4. 使用Guava库中的_InternetDomainName_类","slug":"_4-使用guava库中的-internetdomainname-类","link":"#_4-使用guava库中的-internetdomainname-类","children":[]},{"level":2,"title":"5. 使用正则表达式","slug":"_5-使用正则表达式","link":"#_5-使用正则表达式","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721315377000,"updatedTime":1721315377000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.48,"words":743},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Get Domain Name From Given URL in Java.md","localizedDate":"2024年7月18日","excerpt":"<h2>1. 概述</h2>\\n<p>在这篇简短的文章中，我们将探讨在Java中从给定URL获取域名的不同方法。</p>\\n<h2>2. 什么是域名？</h2>\\n<p>简单来说，域名是一个指向IP地址的字符串。它是统一资源定位器（URL）的一部分。使用域名，用户可以通过客户端软件访问特定网站。</p>\\n<p>域名通常由两到三个部分组成，每个部分由点分隔。</p>\\n<p>从末尾开始，域名可能包括：</p>\\n<ul>\\n<li>顶级域名（例如，bealdung.com中的_com_），</li>\\n<li>二级域名（例如，google.co.uk中的_co_或baeldung.com中的_baeldung_），</li>\\n<li>三级域名（例如，google.co.uk中的_google_）</li>\\n</ul>","autoDesc":true}');export{d as comp,m as data};
