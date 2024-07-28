import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-D4B8YWfq.js";const t={},p=e(`<hr><h1 id="java-scanner-类接收字符输入" tabindex="-1"><a class="header-anchor" href="#java-scanner-类接收字符输入"><span>Java Scanner 类接收字符输入</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将看到如何使用 <em>Scanner</em> 类接收字符输入。</p><h2 id="_2-扫描字符" tabindex="-1"><a class="header-anchor" href="#_2-扫描字符"><span>2. 扫描字符</span></a></h2><p><strong>Java <em>Scanner</em> 没有提供类似于 <em>nextInt()</em>, <em>nextLine()</em> 等的方法来接收字符输入。</strong></p><p>我们可以使用几种方法使用 <em>Scanner</em> 接收字符输入。</p><p>让我们首先创建一个输入字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;abc\\n&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;mno\\n&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;xyz\\n&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用-next" tabindex="-1"><a class="header-anchor" href="#_3-使用-next"><span>3. 使用 <em>next()</em></span></a></h2><p>让我们看看如何使用 <em>Scanner</em> 的 <em>next()</em> 方法和 <em>String</em> 类的 <em>charAt()</em> 方法来接收一个字符作为输入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenInputSource_whenScanCharUsingNext_thenOneCharIsRead</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span> c <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token char">&#39;a&#39;</span><span class="token punctuation">,</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Java Scanner 的 <em>next()</em> 方法返回一个字符串对象。</strong> 我们在这里使用 <em>String</em> 类的 <em>charAt()</em> 方法来从字符串对象中获取字符。</p><h2 id="_4-使用-findinline" tabindex="-1"><a class="header-anchor" href="#_4-使用-findinline"><span>4. 使用 <em>findInLine()</em></span></a></h2><p>这个方法接收一个字符串模式作为输入，我们将传递 “.”（点）来匹配只有一个字符。然而，这将返回一个字符串形式的单个字符，所以我们将使用 <em>charAt()</em> 方法来获取字符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenInputSource_whenScanCharUsingFindInLine_thenOneCharIsRead</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span> c <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">findInLine</span><span class="token punctuation">(</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token char">&#39;a&#39;</span><span class="token punctuation">,</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用-usedelimiter" tabindex="-1"><a class="header-anchor" href="#_5-使用-usedelimiter"><span>5. 使用 <em>useDelimiter()</em></span></a></h2><p>这个方法也只扫描一个字符，但作为一个字符串对象，类似于 <em>findInLine()</em> API。我们可以类似地使用 <em>charAt()</em> 方法来获取字符值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenInputSource_whenScanCharUsingUseDelimiter_thenOneCharIsRead</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span> c <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">useDelimiter</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token char">&#39;a&#39;</span><span class="token punctuation">,</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本教程中，我们学习了如何使用 Java <em>Scanner</em> 接收字符输入。</p><p>如常，示例的完整源代码可在 GitHub 上找到。</p>`,22),c=[p];function o(i,l){return s(),a("div",null,c)}const d=n(t,[["render",o],["__file","2024-07-14-Java Scanner Taking a Character Input.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-14/2024-07-14-Java%20Scanner%20Taking%20a%20Character%20Input.html","title":"Java Scanner 类接收字符输入","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Tutorial"],"tag":["Scanner","Character Input"],"head":[["meta",{"name":"keywords","content":"Java, Scanner, Character Input, Tutorial"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-14/2024-07-14-Java%20Scanner%20Taking%20a%20Character%20Input.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java Scanner 类接收字符输入"}],["meta",{"property":"og:description","content":"Java Scanner 类接收字符输入 1. 概述 在本教程中，我们将看到如何使用 Scanner 类接收字符输入。 2. 扫描字符 Java Scanner 没有提供类似于 nextInt(), nextLine() 等的方法来接收字符输入。 我们可以使用几种方法使用 Scanner 接收字符输入。 让我们首先创建一个输入字符串： 3. 使用 ne..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-14T08:05:00.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Scanner"}],["meta",{"property":"article:tag","content":"Character Input"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-14T08:05:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java Scanner 类接收字符输入\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-14T08:05:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java Scanner 类接收字符输入 1. 概述 在本教程中，我们将看到如何使用 Scanner 类接收字符输入。 2. 扫描字符 Java Scanner 没有提供类似于 nextInt(), nextLine() 等的方法来接收字符输入。 我们可以使用几种方法使用 Scanner 接收字符输入。 让我们首先创建一个输入字符串： 3. 使用 ne..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 扫描字符","slug":"_2-扫描字符","link":"#_2-扫描字符","children":[]},{"level":2,"title":"3. 使用 next()","slug":"_3-使用-next","link":"#_3-使用-next","children":[]},{"level":2,"title":"4. 使用 findInLine()","slug":"_4-使用-findinline","link":"#_4-使用-findinline","children":[]},{"level":2,"title":"5. 使用 useDelimiter()","slug":"_5-使用-usedelimiter","link":"#_5-使用-usedelimiter","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720944300000,"updatedTime":1720944300000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.45,"words":434},"filePathRelative":"posts/baeldung/2024-07-14/2024-07-14-Java Scanner Taking a Character Input.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java Scanner 类接收字符输入</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将看到如何使用 <em>Scanner</em> 类接收字符输入。</p>\\n<h2>2. 扫描字符</h2>\\n<p><strong>Java <em>Scanner</em> 没有提供类似于 <em>nextInt()</em>, <em>nextLine()</em> 等的方法来接收字符输入。</strong></p>\\n<p>我们可以使用几种方法使用 <em>Scanner</em> 接收字符输入。</p>\\n<p>让我们首先创建一个输入字符串：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span> input <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">StringBuilder</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">append</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"abc\\\\n\\"</span><span class=\\"token punctuation\\">)</span>\\n  <span class=\\"token punctuation\\">.</span><span class=\\"token function\\">append</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"mno\\\\n\\"</span><span class=\\"token punctuation\\">)</span>\\n  <span class=\\"token punctuation\\">.</span><span class=\\"token function\\">append</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"xyz\\\\n\\"</span><span class=\\"token punctuation\\">)</span>\\n  <span class=\\"token punctuation\\">.</span><span class=\\"token function\\">toString</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
