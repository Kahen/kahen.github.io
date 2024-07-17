import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-yRPSFQJx.js";const e={},p=t(`<h1 id="java中比较字符的方法" tabindex="-1"><a class="header-anchor" href="#java中比较字符的方法"><span>Java中比较字符的方法</span></a></h1><p>在这篇简短的教程中，我们将探讨在Java中比较字符的不同方式。</p><p>我们将首先讨论如何比较原始字符。然后，我们将查看比较_Character_对象的不同方法。</p><h2 id="_1-原始字符比较" tabindex="-1"><a class="header-anchor" href="#_1-原始字符比较"><span>1. 原始字符比较</span></a></h2><p>首先，让我们开始强调如何比较原始字符。</p><h3 id="_1-1-使用关系运算符" tabindex="-1"><a class="header-anchor" href="#_1-1-使用关系运算符"><span>1.1 使用关系运算符</span></a></h3><p>通常，比较字符的最简单方式是使用关系运算符。</p><p>简而言之，Java中字符的比较取决于它们的ASCII码顺序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token char">&#39;a&#39;</span> <span class="token operator">==</span> <span class="token char">&#39;A&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token char">&#39;a&#39;</span> \`<span class="token operator">&lt;</span> <span class="token char">&#39;v&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token char">&#39;F&#39;</span> <span class="token operator">&gt;</span>\` <span class="token char">&#39;D&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-使用character-compare-方法" tabindex="-1"><a class="header-anchor" href="#_1-2-使用character-compare-方法"><span>1.2 使用Character.compare()方法</span></a></h3><p>同样，另一种解决方案是使用Character类的compare()方法。</p><p>简单来说，Character类将原始类型char的值包装在一个对象中。compare()方法接受两个char参数并进行数值比较：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span><span class="token char">&#39;C&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;C&#39;</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span><span class="token char">&#39;f&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;A&#39;</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span><span class="token char">&#39;Y&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;z&#39;</span><span class="token punctuation">)</span> \`<span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，compare(char a, char b)方法返回一个int值。它表示a和b的ASCII码之间的差异。</p><p>如果两个char值相同，则返回值等于零；如果a &lt; b，则小于零；否则大于零。</p><h2 id="_2-比较character对象" tabindex="-1"><a class="header-anchor" href="#_2-比较character对象"><span>2. 比较Character对象</span></a></h2><p>现在我们知道了如何比较原始字符，让我们看看如何比较Character对象。</p><h3 id="_2-1-使用character-compareto-方法" tabindex="-1"><a class="header-anchor" href="#_2-1-使用character-compareto-方法"><span>2.1 使用Character.compareTo()方法</span></a></h3><p>Character类提供了compareTo()方法来数值比较两个字符对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Character</span> chK <span class="token operator">=</span> <span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token char">&#39;K&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>chK<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>chK<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Character</span> chG <span class="token operator">=</span> <span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token char">&#39;G&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>chK<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>chG<span class="token punctuation">)</span> <span class="token operator">&gt;</span>\` <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Character</span> chH <span class="token operator">=</span> <span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token char">&#39;H&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>chG<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>chH<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用valueOf()方法创建Character对象，因为构造函数自Java 9起已弃用。</p><h3 id="_2-2-使用object-equals-方法" tabindex="-1"><a class="header-anchor" href="#_2-2-使用object-equals-方法"><span>2.2 使用Object.equals()方法</span></a></h3><p>此外，比较对象的常见解决方案之一是使用equals()方法。如果两个对象相等，它返回true，否则返回false。</p><p>那么，让我们看看如何使用它来比较字符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Character</span> chL <span class="token operator">=</span> <span class="token char">&#39;L&#39;</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>chL<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>chL<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Character</span> chV <span class="token operator">=</span> <span class="token char">&#39;V&#39;</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span>chL<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>chV<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-使用objects-equals-方法" tabindex="-1"><a class="header-anchor" href="#_2-3-使用objects-equals-方法"><span>2.3 使用Objects.equals()方法</span></a></h3><p>Objects类由操作对象的实用方法组成。它通过equals()方法提供了另一种比较字符对象的方式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Character</span> chA <span class="token operator">=</span> <span class="token char">&#39;A&#39;</span><span class="token punctuation">;</span>
<span class="token class-name">Character</span> chB <span class="token operator">=</span> <span class="token char">&#39;B&#39;</span><span class="token punctuation">;</span>

<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>chA<span class="token punctuation">,</span> chA<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>chA<span class="token punctuation">,</span> chB<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>equals()方法如果字符对象彼此相等则返回true，否则返回false。</p><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3. 结论</span></a></h2><p>在这篇文章中，我们学习了在Java中比较原始和对象字符的多种方式。</p><p>如常，本文中使用的代码可以在GitHub上找到。</p>`,32),c=[p];function o(l,r){return s(),n("div",null,c)}const k=a(e,[["render",o],["__file","2024-07-15-Compare Characters in Java.html.vue"]]),h=JSON.parse(`{"path":"/posts/baeldung/2024-07-15/2024-07-15-Compare%20Characters%20in%20Java.html","title":"Java中比较字符的方法","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Java","Character Comparison"],"head":[["meta",{"name":"keywords","content":"Java, Character Comparison, Programming"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-15/2024-07-15-Compare%20Characters%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中比较字符的方法"}],["meta",{"property":"og:description","content":"Java中比较字符的方法 在这篇简短的教程中，我们将探讨在Java中比较字符的不同方式。 我们将首先讨论如何比较原始字符。然后，我们将查看比较_Character_对象的不同方法。 1. 原始字符比较 首先，让我们开始强调如何比较原始字符。 1.1 使用关系运算符 通常，比较字符的最简单方式是使用关系运算符。 简而言之，Java中字符的比较取决于它们的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-15T05:05:36.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Character Comparison"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-15T05:05:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中比较字符的方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-15T05:05:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中比较字符的方法 在这篇简短的教程中，我们将探讨在Java中比较字符的不同方式。 我们将首先讨论如何比较原始字符。然后，我们将查看比较_Character_对象的不同方法。 1. 原始字符比较 首先，让我们开始强调如何比较原始字符。 1.1 使用关系运算符 通常，比较字符的最简单方式是使用关系运算符。 简而言之，Java中字符的比较取决于它们的..."},"headers":[{"level":2,"title":"1. 原始字符比较","slug":"_1-原始字符比较","link":"#_1-原始字符比较","children":[{"level":3,"title":"1.1 使用关系运算符","slug":"_1-1-使用关系运算符","link":"#_1-1-使用关系运算符","children":[]},{"level":3,"title":"1.2 使用Character.compare()方法","slug":"_1-2-使用character-compare-方法","link":"#_1-2-使用character-compare-方法","children":[]}]},{"level":2,"title":"2. 比较Character对象","slug":"_2-比较character对象","link":"#_2-比较character对象","children":[{"level":3,"title":"2.1 使用Character.compareTo()方法","slug":"_2-1-使用character-compareto-方法","link":"#_2-1-使用character-compareto-方法","children":[]},{"level":3,"title":"2.2 使用Object.equals()方法","slug":"_2-2-使用object-equals-方法","link":"#_2-2-使用object-equals-方法","children":[]},{"level":3,"title":"2.3 使用Objects.equals()方法","slug":"_2-3-使用objects-equals-方法","link":"#_2-3-使用objects-equals-方法","children":[]}]},{"level":2,"title":"3. 结论","slug":"_3-结论","link":"#_3-结论","children":[]}],"git":{"createdTime":1721019936000,"updatedTime":1721019936000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.06,"words":619},"filePathRelative":"posts/baeldung/2024-07-15/2024-07-15-Compare Characters in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这篇简短的教程中，我们将探讨在Java中比较字符的不同方式。</p>\\n<p>我们将首先讨论如何比较原始字符。然后，我们将查看比较_Character_对象的不同方法。</p>\\n<h2>1. 原始字符比较</h2>\\n<p>首先，让我们开始强调如何比较原始字符。</p>\\n<h3>1.1 使用关系运算符</h3>\\n<p>通常，比较字符的最简单方式是使用关系运算符。</p>\\n<p>简而言之，Java中字符的比较取决于它们的ASCII码顺序：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token function\\">assertFalse</span><span class=\\"token punctuation\\">(</span><span class=\\"token char\\">'a'</span> <span class=\\"token operator\\">==</span> <span class=\\"token char\\">'A'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token function\\">assertTrue</span><span class=\\"token punctuation\\">(</span><span class=\\"token char\\">'a'</span> \`<span class=\\"token operator\\">&lt;</span> <span class=\\"token char\\">'v'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token function\\">assertTrue</span><span class=\\"token punctuation\\">(</span><span class=\\"token char\\">'F'</span> <span class=\\"token operator\\">&gt;</span>\` <span class=\\"token char\\">'D'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}`);export{k as comp,h as data};
