import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as e,a as t}from"./app-8nJ1rqSf.js";const s={},p=t(`<hr><h1 id="java-scanner-skip-方法示例-baeldung" tabindex="-1"><a class="header-anchor" href="#java-scanner-skip-方法示例-baeldung"><span>Java Scanner.skip 方法示例 | Baeldung---</span></a></h1><p>date: 2022-04-01 category:</p><ul><li>Java</li><li>Scanner tag:</li><li>skip</li><li>Pattern</li><li>String head:</li><li><ul><li>meta</li><li>name: keywords content: Java Scanner skip method, Java Scanner skip tutorial, Java Scanner skip examples</li></ul></li></ul><hr><h1 id="java-scanner-skip-方法示例-baeldung-1" tabindex="-1"><a class="header-anchor" href="#java-scanner-skip-方法示例-baeldung-1"><span>Java Scanner.skip 方法示例 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span><strong>1. 概述</strong></span></a></h2><p><em>java.util.Scanner</em> 类有许多方法，我们可以用来验证输入。其中之一是 <em>skip()</em> 方法。</p><p>在本教程中，我们将学习 <em>skip()</em> 方法的用途以及如何使用它。</p><p><em>skip()</em> 方法属于 Java <em>Scanner</em> 类。它用于跳过与方法参数中指定的模式匹配的输入，忽略分隔符。</p><h3 id="_2-1-语法" tabindex="-1"><a class="header-anchor" href="#_2-1-语法"><span>2.1. 语法</span></a></h3><p><em>skip()</em> 方法<strong>有两个重载的方法签名</strong>：</p><ul><li><em>skip(Pattern pattern)</em> – 以参数形式接收 <em>Scanner</em> 应跳过的模式</li><li><em>skip(String pattern)</em> – 以参数形式接收一个 <em>String</em>，指定要跳过的模式</li></ul><h3 id="_2-2-返回值" tabindex="-1"><a class="header-anchor" href="#_2-2-返回值"><span>2.2. 返回值</span></a></h3><p><em>skip()</em> 返回一个满足方法参数中指定模式的 <em>Scanner</em> 对象。<strong>它也可能抛出两种类型的异常</strong>：如果扫描器已关闭，则抛出 <em>IllegalStateException</em>；如果未找到与指定模式匹配的内容，则抛出 <em>NoSuchElementException</em>。</p><p>请注意，通过使用一个不可能匹配任何内容的模式，可以跳过某些内容而不冒 <em>NoSuchElementException</em> 的风险——例如，<em>skip</em>(“\\[ \\\\t\\]\\*”)。</p><h2 id="_3-示例" tabindex="-1"><a class="header-anchor" href="#_3-示例"><span><strong>3. 示例</strong></span></a></h2><p>正如我们前面提到的，<em>skip</em> 方法有两个重载形式。首先，让我们看看如何使用 <em>skip</em> 方法与 <em>Pattern</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">&quot;Java scanner skip tutorial&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
sc<span class="token punctuation">.</span><span class="token function">skip</span><span class="token punctuation">(</span><span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;.ava&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用 <em>skip(Pattern)</em> 方法跳过符合“.ava”模式的文本。</p><p>同样，<em>skip(String)</em> 方法将跳过由给定 <em>String</em> 构造的模式匹配的文本。在我们的示例中，我们跳过字符串“Java”：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">&quot;Java scanner skip tutorial&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
sc<span class="token punctuation">.</span><span class="token function">skip</span><span class="token punctuation">(</span><span class="token string">&quot;Java&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简而言之，<strong>无论使用模式还是字符串，两种方法的结果都是相同的</strong>。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span><strong>4. 结论</strong></span></a></h2><p>在这篇简短的文章中，我们检查了如何使用 <em>java.util.Scanner</em> 类的 <em>skip()</em> 方法，使用 <em>String</em> 或 <em>Pattern</em> 参数。</p><p>一如既往，讨论期间使用的代码在 GitHub 上可用。</p><p>OK</p>`,27),i=[p];function r(l,c){return e(),n("div",null,i)}const d=a(s,[["render",r],["__file","2024-07-19-Java Scanner.skip Method with Examples.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Java%20Scanner.skip%20Method%20with%20Examples.html","title":"Java Scanner.skip 方法示例 | Baeldung---","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Scanner"],"tag":["skip","Pattern","String"],"head":[["meta",{"name":"keywords","content":"Java Scanner skip method, Java Scanner skip tutorial, Java Scanner skip examples"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Java%20Scanner.skip%20Method%20with%20Examples.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java Scanner.skip 方法示例 | Baeldung---"}],["meta",{"property":"og:description","content":"Java Scanner.skip 方法示例 | Baeldung--- date: 2022-04-01 category: Java Scanner tag: skip Pattern String head: meta name: keywords content: Java Scanner skip method, Java Scanner s..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T09:34:31.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"skip"}],["meta",{"property":"article:tag","content":"Pattern"}],["meta",{"property":"article:tag","content":"String"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T09:34:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java Scanner.skip 方法示例 | Baeldung---\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T09:34:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java Scanner.skip 方法示例 | Baeldung--- date: 2022-04-01 category: Java Scanner tag: skip Pattern String head: meta name: keywords content: Java Scanner skip method, Java Scanner s..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[{"level":3,"title":"2.1. 语法","slug":"_2-1-语法","link":"#_2-1-语法","children":[]},{"level":3,"title":"2.2. 返回值","slug":"_2-2-返回值","link":"#_2-2-返回值","children":[]}]},{"level":2,"title":"3. 示例","slug":"_3-示例","link":"#_3-示例","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721381671000,"updatedTime":1721381671000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.78,"words":533},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Java Scanner.skip Method with Examples.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java Scanner.skip 方法示例 | Baeldung---</h1>\\n<p>date: 2022-04-01\\ncategory:</p>\\n<ul>\\n<li>Java</li>\\n<li>Scanner\\ntag:</li>\\n<li>skip</li>\\n<li>Pattern</li>\\n<li>String\\nhead:</li>\\n<li>\\n<ul>\\n<li>meta</li>\\n<li>name: keywords\\ncontent: Java Scanner skip method, Java Scanner skip tutorial, Java Scanner skip examples</li>\\n</ul>\\n</li>\\n</ul>","autoDesc":true}');export{d as comp,u as data};
