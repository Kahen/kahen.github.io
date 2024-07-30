import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CbPcg273.js";const p={},e=t('<h1 id="java中跳过首次迭代的方法" tabindex="-1"><a class="header-anchor" href="#java中跳过首次迭代的方法"><span>Java中跳过首次迭代的方法</span></a></h1><p>迭代是编程的基石，它使开发者能够遍历并轻松地操作数据结构。然而，在某些情况下，我们可能需要在遍历这些集合的同时跳过第一个元素。在本教程中，我们将探索使用循环和Stream API跳过第一个元素的各种方法。</p><h3 id="_2-1-for循环" tabindex="-1"><a class="header-anchor" href="#_2-1-for循环"><span>2.1. For循环</span></a></h3><p>跳过第一个元素的最简单方式是使用for循环，并将计数器变量从1而不是0开始。这种方法最适合支持索引访问的集合，如ArrayList和简单数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">skippingFirstElementInListWithForLoop</span><span class="token punctuation">(</span><span class="token class-name">List</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```` stringList<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> stringList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">process</span><span class="token punctuation">(</span>stringList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-while循环" tabindex="-1"><a class="header-anchor" href="#_2-2-while循环"><span>2.2. While循环</span></a></h3><p>另一种方式是使用while循环以及Iterator。我们可以手动推进迭代器以跳过第一个元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">skippingFirstElementInListWithWhileLoop</span><span class="token punctuation">(</span><span class="token class-name">List</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```` stringList<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Iterator</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```` iterator <span class="token operator">=</span> stringList<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">while</span> <span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">process</span><span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-stream-api" tabindex="-1"><a class="header-anchor" href="#_2-3-stream-api"><span>2.3. Stream API</span></a></h3><p>Java 8引入了Stream API，它提供了一种更声明性的方式来操作集合。为了跳过第一个元素，我们可以使用skip()方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">skippingFirstElementInListWithStreamSkip</span><span class="token punctuation">(</span><span class="token class-name">List</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```` stringList<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    stringList<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">skip</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token operator">::</span><span class="token function">process</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-使用sublist" tabindex="-1"><a class="header-anchor" href="#_2-4-使用sublist"><span>2.4. 使用subList()</span></a></h3><p>在列表中跳过第一个元素的另一种方式是使用subList()方法。此方法返回列表指定fromIndex（含）和toIndex（不含）之间的部分视图。当我们将其与for-each循环配对时，我们可以轻松地跳过第一个元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">skippingFirstElementInListWithSubList</span><span class="token punctuation">(</span><span class="token class-name">List</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```` stringList<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> element <span class="token operator">:</span> stringList<span class="token punctuation">.</span><span class="token function">subList</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> stringList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">process</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-其他方法" tabindex="-1"><a class="header-anchor" href="#_2-5-其他方法"><span>2.5. 其他方法</span></a></h3><p>尽管只有少数基本方法可以迭代集合，我们可以组合和修改它们以获得更多变化。由于这些变化没有实质性的不同，我们在这里列出它们以展示可能的方法并激发实验。</p><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3. 结论</span></a></h2><p>虽然Java提供了不同的方式在迭代集合时跳过第一个元素，但选择正确方法的主要标准是代码的清晰度。因此，我们应该选择两种简单且最明确的方法是简单的for循环或stream.skip()。其他方法更复杂，包含更多的移动部件，如果可能的话应该避免使用。</p><p>如往常一样，本文的示例可以在GitHub上找到。</p>',19),o=[e];function i(c,l){return s(),a("div",null,o)}const k=n(p,[["render",i],["__file","2024-06-29-Skipping the First Iteration in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-Skipping%20the%20First%20Iteration%20in%20Java.html","title":"Java中跳过首次迭代的方法","lang":"zh-CN","frontmatter":{"date":"2023-09-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Java","Loop","Stream API"],"head":[["meta",{"name":"keywords","content":"Java, Loop, Skip, First Element, Stream API"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-Skipping%20the%20First%20Iteration%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中跳过首次迭代的方法"}],["meta",{"property":"og:description","content":"Java中跳过首次迭代的方法 迭代是编程的基石，它使开发者能够遍历并轻松地操作数据结构。然而，在某些情况下，我们可能需要在遍历这些集合的同时跳过第一个元素。在本教程中，我们将探索使用循环和Stream API跳过第一个元素的各种方法。 2.1. For循环 跳过第一个元素的最简单方式是使用for循环，并将计数器变量从1而不是0开始。这种方法最适合支持索..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T18:52:08.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Loop"}],["meta",{"property":"article:tag","content":"Stream API"}],["meta",{"property":"article:published_time","content":"2023-09-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T18:52:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中跳过首次迭代的方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-09-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T18:52:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中跳过首次迭代的方法 迭代是编程的基石，它使开发者能够遍历并轻松地操作数据结构。然而，在某些情况下，我们可能需要在遍历这些集合的同时跳过第一个元素。在本教程中，我们将探索使用循环和Stream API跳过第一个元素的各种方法。 2.1. For循环 跳过第一个元素的最简单方式是使用for循环，并将计数器变量从1而不是0开始。这种方法最适合支持索..."},"headers":[{"level":3,"title":"2.1. For循环","slug":"_2-1-for循环","link":"#_2-1-for循环","children":[]},{"level":3,"title":"2.2. While循环","slug":"_2-2-while循环","link":"#_2-2-while循环","children":[]},{"level":3,"title":"2.3. Stream API","slug":"_2-3-stream-api","link":"#_2-3-stream-api","children":[]},{"level":3,"title":"2.4. 使用subList()","slug":"_2-4-使用sublist","link":"#_2-4-使用sublist","children":[]},{"level":3,"title":"2.5. 其他方法","slug":"_2-5-其他方法","link":"#_2-5-其他方法","children":[]},{"level":2,"title":"3. 结论","slug":"_3-结论","link":"#_3-结论","children":[]}],"git":{"createdTime":1719687128000,"updatedTime":1719687128000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.99,"words":596},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-Skipping the First Iteration in Java.md","localizedDate":"2023年9月1日","excerpt":"\\n<p>迭代是编程的基石，它使开发者能够遍历并轻松地操作数据结构。然而，在某些情况下，我们可能需要在遍历这些集合的同时跳过第一个元素。在本教程中，我们将探索使用循环和Stream API跳过第一个元素的各种方法。</p>\\n<h3>2.1. For循环</h3>\\n<p>跳过第一个元素的最简单方式是使用for循环，并将计数器变量从1而不是0开始。这种方法最适合支持索引访问的集合，如ArrayList和简单数组：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">void</span> <span class=\\"token function\\">skippingFirstElementInListWithForLoop</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">List</span>````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>```` stringList<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;</span> stringList<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">size</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token function\\">process</span><span class=\\"token punctuation\\">(</span>stringList<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">get</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
