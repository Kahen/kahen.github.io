import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-bN4DcMMr.js";const e={},o=t('<hr><h1 id="检查列表是否包含字符串元素时忽略大小写-baeldung" tabindex="-1"><a class="header-anchor" href="#检查列表是否包含字符串元素时忽略大小写-baeldung"><span>检查列表是否包含字符串元素时忽略大小写 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在Java中，列表是一种非常常用的数据结构。有时，我们希望在不区分大小写的情况下检查一个字符串是否是列表中的元素。</p><p>在这个快速教程中，我们将探索Java中解决这个常见问题的各种方法和策略。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>列表提供了方便的<code>contains()</code>方法来检查给定的值是否存在于列表中。在背后，<code>List.contains()</code>通过<code>equals()</code>方法将给定的对象与列表中的每个元素进行比较。</p><p>因此，如果列表是<code>List```&lt;String&gt;````，</code>contains()`方法仅在区分大小写的情况下比较字符串。例如，我们有一个电影标题列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``` <span class="token constant">THE_LIST</span> <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Game of Thrones&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Forrest Gump&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;American Beauty&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Pretty Woman&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Catch Me If You Can&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当我们使用<code>contains()</code>方法检查它是否包含“catch me if you can”时，它返回<code>false</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token constant">THE_LIST</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;catch me if you can&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，在许多情况下，我们希望<code>contains()</code>方法支持忽略大小写的检查。不幸的是，标准的<code>contains()</code>并没有提供这个选项。接下来，让我们看看如何实现我们的目标。</p><p>为了简单起见，我们将使用单元测试断言来验证每种方法是否按预期工作。</p><h2 id="_3-使用循环" tabindex="-1"><a class="header-anchor" href="#_3-使用循环"><span>3. 使用循环</span></a></h2><p>我们知道<code>String</code>类提供了<code>equalsIgnoreCase()</code>方法，该方法进行不区分大小写的等值检查。因此，解决我们问题的第一个想法是<strong>遍历列表并使用<code>equalsIgnoreCase()</code>方法检查每个元素和给定值：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> <span class="token function">ignoreCaseContainsForLoop</span><span class="token punctuation">(</span><span class="token class-name">List</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``` list<span class="token punctuation">,</span> <span class="token class-name">String</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> e <span class="token operator">:</span> list<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>value<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，我们使用<code>for</code>循环来检查列表中的每个元素。一旦<code>equalsIgnoreCase()</code>方法在某个元素上报告为<code>true</code>，<strong>我们立即返回<code>true</code>并停止进一步检查</strong>。否则，如果在列表中的所有元素中都没有找到匹配项，该方法返回<code>false</code>。</p><p>我们可以创建一个测试来验证<code>ignoreCaseContainsForLoop()</code>方法是否按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">ignoreCaseContainsForLoop</span><span class="token punctuation">(</span><span class="token constant">THE_LIST</span><span class="token punctuation">,</span> <span class="token string">&quot;CATCH me if you CAN&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">ignoreCaseContainsForLoop</span><span class="token punctuation">(</span><span class="token constant">THE_LIST</span><span class="token punctuation">,</span> <span class="token string">&quot;game of thrones&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token function">ignoreCaseContainsForLoop</span><span class="token punctuation">(</span><span class="token constant">THE_LIST</span><span class="token punctuation">,</span> <span class="token string">&quot;The Godfather&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用stream-api" tabindex="-1"><a class="header-anchor" href="#_4-使用stream-api"><span>4. 使用Stream API</span></a></h2><p>从Java 8开始引入了Stream API。Stream API为高效和有效地处理集合提供了强大的机制。</p><p>接下来，让我们使用Stream API来解决我们的问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token constant">THE_LIST</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">anyMatch</span><span class="token punctuation">(</span>e <span class="token operator">-&gt;</span> e<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span><span class="token string">&quot;CATCH me if you CAN&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如上所示，我们使用Stream API的<code>anyMatch()</code>方法来确定是否有元素符合我们的条件。<strong>我们使用lambda表达式将我们的条件传达给<code>anyMatch()</code>。</strong></p><p>另外，<strong>我们可以选择使用方法引用将谓词传递给<code>anyMatch()</code>方法：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token constant">THE_LIST</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">anyMatch</span><span class="token punctuation">(</span><span class="token string">&quot;game of thrones&quot;</span><span class="token operator">::</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token constant">THE_LIST</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">anyMatch</span><span class="token punctuation">(</span><span class="token string">&quot;The Godfather&quot;</span><span class="token operator">::</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了两种执行不区分大小写的检查以确定字符串列表是否包含特定字符串的方法。</p><p>首先，我们通过创建一个传统的基于循环的方法来解决问题。接下来，我们利用了Stream API的<code>anyMatch()</code>方法来实现相同的目标。</p><p>如常，示例的完整源代码可以在GitHub上找到。</p>',30),p=[o];function c(i,l){return s(),a("div",null,p)}const d=n(e,[["render",c],["__file","2024-06-29-Check if a List Contains a String Element While Ignoring Case.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-Check%20if%20a%20List%20Contains%20a%20String%20Element%20While%20Ignoring%20Case.html","title":"检查列表是否包含字符串元素时忽略大小写 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java"],"tag":["Java List","Case-Insensitive Search"],"head":[["meta",{"name":"keywords","content":"Java List, Case-Insensitive Search, String Element, Search Method"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-Check%20if%20a%20List%20Contains%20a%20String%20Element%20While%20Ignoring%20Case.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"检查列表是否包含字符串元素时忽略大小写 | Baeldung"}],["meta",{"property":"og:description","content":"检查列表是否包含字符串元素时忽略大小写 | Baeldung 1. 概述 在Java中，列表是一种非常常用的数据结构。有时，我们希望在不区分大小写的情况下检查一个字符串是否是列表中的元素。 在这个快速教程中，我们将探索Java中解决这个常见问题的各种方法和策略。 2. 问题介绍 列表提供了方便的contains()方法来检查给定的值是否存在于列表中。在..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T22:32:33.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java List"}],["meta",{"property":"article:tag","content":"Case-Insensitive Search"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T22:32:33.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"检查列表是否包含字符串元素时忽略大小写 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T22:32:33.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"检查列表是否包含字符串元素时忽略大小写 | Baeldung 1. 概述 在Java中，列表是一种非常常用的数据结构。有时，我们希望在不区分大小写的情况下检查一个字符串是否是列表中的元素。 在这个快速教程中，我们将探索Java中解决这个常见问题的各种方法和策略。 2. 问题介绍 列表提供了方便的contains()方法来检查给定的值是否存在于列表中。在..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用循环","slug":"_3-使用循环","link":"#_3-使用循环","children":[]},{"level":2,"title":"4. 使用Stream API","slug":"_4-使用stream-api","link":"#_4-使用stream-api","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719700353000,"updatedTime":1719700353000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.8,"words":840},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-Check if a List Contains a String Element While Ignoring Case.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>检查列表是否包含字符串元素时忽略大小写 | Baeldung</h1>\\n<h2>1. 概述</h2>\\n<p>在Java中，列表是一种非常常用的数据结构。有时，我们希望在不区分大小写的情况下检查一个字符串是否是列表中的元素。</p>\\n<p>在这个快速教程中，我们将探索Java中解决这个常见问题的各种方法和策略。</p>\\n<h2>2. 问题介绍</h2>\\n<p>列表提供了方便的<code>contains()</code>方法来检查给定的值是否存在于列表中。在背后，<code>List.contains()</code>通过<code>equals()</code>方法将给定的对象与列表中的每个元素进行比较。</p>","autoDesc":true}');export{d as comp,k as data};
