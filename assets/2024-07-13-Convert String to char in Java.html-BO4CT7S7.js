import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-CE5go3V-.js";const p={},e=t(`<hr><h1 id="java中将字符串转换为字符的教程" tabindex="-1"><a class="header-anchor" href="#java中将字符串转换为字符的教程"><span>Java中将字符串转换为字符的教程</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>字符串是Java中常见的数据类型，而字符（char）是Java的基本数据类型。</p><p>在本教程中，我们将探讨如何在Java中将字符串对象转换为字符。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>我们知道，字符（char）只能包含一个单一的字符。然而，字符串对象可以包含多个字符。</p><p>因此，我们的教程将涵盖两种情况：</p><ul><li>源字符串是单个字符。</li><li>源字符串是多个字符。</li></ul><p>对于第一种情况，我们可以很容易地将单个字符的字符串转换为字符。例如，假设这是我们的输入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token class-name">STRING_b</span> <span class="token operator">=</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>转换后，我们期望得到字符 &#39;b&#39;。</p><p>对于第二种情况，如果源字符串是多字符字符串，我们仍然想要得到一个单一的字符作为结果，我们必须分析需求以选择所需的字符，比如第一个、最后一个或第n个字符。</p><p>在本教程中，我们将提供一个更一般的解决方案。我们将把源字符串转换为一个字符数组，该数组包含字符串中的每个字符。这样，我们可以根据需求选择任何元素。</p><p>我们将使用 &quot;STRING_Baeldung&quot; 作为输入示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token class-name">STRING_Baeldung</span> <span class="token operator">=</span> <span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们看看它们是如何工作的。</p><h2 id="_3-单个字符的字符串" tabindex="-1"><a class="header-anchor" href="#_3-单个字符的字符串"><span>3. 单个字符的字符串</span></a></h2><p>Java的字符串类提供了charAt()方法，用于从输入字符串中获取第n个字符（从0开始）作为字符。因此，我们可以直接调用getChar(0)方法将单个字符的字符串转换为字符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token char">&#39;b&#39;</span><span class="token punctuation">,</span> <span class="token class-name">STRING_b</span><span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，我们应该注意，如果输入是一个空字符串，charAt()方法调用会抛出StringIndexOutOfBoundsException：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">StringIndexOutOfBoundsException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因此，在调用charAt()方法之前，我们应该检查输入字符串是否为空或为null。</p><h2 id="_4-多个字符的字符串" tabindex="-1"><a class="header-anchor" href="#_4-多个字符的字符串"><span>4. 多个字符的字符串</span></a></h2><p>我们已经学会了使用charAt(0)将单个字符的字符串转换为字符。如果输入是一个多字符的字符串，并且我们知道我们想要转换为字符的确切字符，我们仍然可以使用charAt()方法。例如，我们可以从输入字符串 &quot;Baeldung&quot; 中获取第四个字符（&#39;l&#39;）：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token char">&#39;l&#39;</span><span class="token punctuation">,</span> <span class="token class-name">STRING_Baeldung</span><span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外，我们可以使用String.toCharArray()获取一个包含所有字符的字符数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token char">&#39;B&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;e&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;l&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;d&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;u&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;n&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;g&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token class-name">STRING_Baeldung</span><span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>值得一提的是，toCharArray()方法也适用于空字符串输入。它返回一个空的字符数组作为结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>除了toCharArray()，String.getChars()可以从给定的字符串中提取连续的字符到字符数组。该方法接收四个参数：</p><ul><li>srcBegin - 字符串中要取的第一个字符的索引（包括）</li><li>srcEnd - 字符串中要复制的最后一个字符的索引（不包括）</li><li>dst - 目标数组，这是我们的结果</li><li>dstBegin - 目标数组中的起始偏移量。我们将通过一个示例进行讨论。</li></ul><p>首先，让我们从字符串 &quot;Baeldung&quot; 中提取 &quot;aeld&quot; 并将其填充到一个预定义的字符数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> aeld <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token class-name">STRING_Baeldung</span><span class="token punctuation">.</span><span class="token function">getChars</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> aeld<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token char">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;e&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;l&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;d&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> aeld<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的测试所示，调用getChars()时，我们应该首先有一个字符数组来保存结果。</p><p>在示例中，我们在调用getChars()时传递0作为dstBegin。这是因为我们希望转换结果从数组aeld的第一个元素开始。</p><p>当然，有时，我们希望结果覆盖数组的中间部分。然后我们可以将dstBegin设置为期望的值。</p><p>接下来，让我们再看一个示例，将 &quot;aeld&quot; 转换为字符并从第二个（索引=1）元素开始覆盖目标数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> anotherArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token char">&#39;#&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;#&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;#&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;#&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;#&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;#&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name">STRING_Baeldung</span><span class="token punctuation">.</span><span class="token function">getChars</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> anotherArray<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token char">&#39;#&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;e&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;l&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;d&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;#&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> anotherArray<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，我们传递dstBegin=1到方法并得到预期的结果。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何在Java中将字符串转换为字符。</p><p>和往常一样，文章中使用的代码可以在GitHub上找到。</p>`,43),c=[e];function o(l,u){return s(),n("div",null,c)}const d=a(p,[["render",o],["__file","2024-07-13-Convert String to char in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Convert%20String%20to%20char%20in%20Java.html","title":"Java中将字符串转换为字符的教程","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","String"],"tag":["Java","String","char"],"head":[["meta",{"name":"keywords","content":"Java, String, char, 转换"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Convert%20String%20to%20char%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将字符串转换为字符的教程"}],["meta",{"property":"og:description","content":"Java中将字符串转换为字符的教程 1. 概述 字符串是Java中常见的数据类型，而字符（char）是Java的基本数据类型。 在本教程中，我们将探讨如何在Java中将字符串对象转换为字符。 2. 问题介绍 我们知道，字符（char）只能包含一个单一的字符。然而，字符串对象可以包含多个字符。 因此，我们的教程将涵盖两种情况： 源字符串是单个字符。 源字..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T09:39:42.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"String"}],["meta",{"property":"article:tag","content":"char"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T09:39:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将字符串转换为字符的教程\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T09:39:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将字符串转换为字符的教程 1. 概述 字符串是Java中常见的数据类型，而字符（char）是Java的基本数据类型。 在本教程中，我们将探讨如何在Java中将字符串对象转换为字符。 2. 问题介绍 我们知道，字符（char）只能包含一个单一的字符。然而，字符串对象可以包含多个字符。 因此，我们的教程将涵盖两种情况： 源字符串是单个字符。 源字..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 单个字符的字符串","slug":"_3-单个字符的字符串","link":"#_3-单个字符的字符串","children":[]},{"level":2,"title":"4. 多个字符的字符串","slug":"_4-多个字符的字符串","link":"#_4-多个字符的字符串","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720863582000,"updatedTime":1720863582000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.66,"words":1098},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Convert String to char in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中将字符串转换为字符的教程</h1>\\n<h2>1. 概述</h2>\\n<p>字符串是Java中常见的数据类型，而字符（char）是Java的基本数据类型。</p>\\n<p>在本教程中，我们将探讨如何在Java中将字符串对象转换为字符。</p>\\n<h2>2. 问题介绍</h2>\\n<p>我们知道，字符（char）只能包含一个单一的字符。然而，字符串对象可以包含多个字符。</p>\\n<p>因此，我们的教程将涵盖两种情况：</p>\\n<ul>\\n<li>源字符串是单个字符。</li>\\n<li>源字符串是多个字符。</li>\\n</ul>\\n<p>对于第一种情况，我们可以很容易地将单个字符的字符串转换为字符。例如，假设这是我们的输入：</p>","autoDesc":true}');export{d as comp,k as data};
