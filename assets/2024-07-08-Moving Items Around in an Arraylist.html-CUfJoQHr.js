import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BkL9UgS7.js";const p={},e=t('<h1 id="java-arraylist中移动元素的方法" tabindex="-1"><a class="header-anchor" href="#java-arraylist中移动元素的方法"><span>Java ArrayList中移动元素的方法</span></a></h1><ol><li>概述</li></ol><p>Java为我们提供了多种在_ArrayList_中重新排列元素的方法。在本教程中，我们将探讨其中的三种。</p><ol start="2"><li>移动一个元素</li></ol><p>最手动的方法，也是给我们最大控制权的方法，是直接将一个元素移动到新的位置。我们可以通过首先使用_ArrayList.remove()_来实现这一点，它返回被移除的元素。然后，我们可以选择性地使用_ArrayList.add()_将该元素重新插入到我们选择的位置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenAList_whenManuallyReordering_thenOneItemMovesPosition</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ArrayList</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` arrayList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;three&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;four&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;five&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">String</span> removed <span class="token operator">=</span> arrayList<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    arrayList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> removed<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">ArrayList</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` expectedResult <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;four&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;three&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;five&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedResult<span class="token punctuation">,</span> arrayList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在底层，_ArrayList_使用数组。这意味着移除和插入元素需要通过移动其他所有元素来实现，这有很大的开销。因此，如果可能的话，我们应该避免这种方法，并使用下面两种方法之一，它们都保持了_ArrayList_的原始长度。</p><ol start="3"><li>交换两个元素</li></ol><p>我们可以使用_Collections.swap()_来交换_ArrayList_中两个元素的位置。_swap()<em>方法接受三个参数，首先是要调整的_ArrayList</em>，然后是两个要交换的元素的位置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAList_whenUsingSwap_thenItemsSwapPositions</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ArrayList</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` arrayList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;three&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;four&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;five&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">swap</span><span class="token punctuation">(</span>arrayList<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">ArrayList</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` expectedResult <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;four&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;three&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;five&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedResult<span class="token punctuation">,</span> arrayList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们已经交换了位置1和3的元素，并确认列表看起来符合我们的预期。</p><ol start="4"><li>旋转整个列表</li></ol><p>最后，我们也可以对列表应用旋转，通过给定的距离来移动所有元素。距离没有限制。因此，如果我们愿意，我们可以多次循环所有元素。正距离将根据我们的观点将元素向右或向下旋转：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenAList_whenUsingRotateWithPositiveDistance_thenItemsMoveToTheRight</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ArrayList</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` arrayList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;three&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;four&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;five&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">rotate</span><span class="token punctuation">(</span>arrayList<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">ArrayList</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` expectedResult <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;four&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;five&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;three&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedResult<span class="token punctuation">,</span> arrayList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，所有元素都向右移动了两个位置，一旦到达末尾就重新回到起点。或者，如果需要，我们也可以向左旋转，使用负距离：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenAList_whenUsingRotateWithNegativeDistance_thenItemsMoveToTheLeft</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ArrayList</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` arrayList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;three&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;four&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;five&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">rotate</span><span class="token punctuation">(</span>arrayList<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">ArrayList</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` expectedResult <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;three&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;four&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;five&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedResult<span class="token punctuation">,</span> arrayList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li>结论</li></ol><p>在本文中，我们了解了Java为我们提供的重新排序_ArrayList_的三种选项。如果可能的话，我们应该使用_swap()_或_rotate()_以提高性能。如果我们需要更多的控制，或者只有一个元素在移动，那么我们知道如何使用_remove()_和_add()_手动将一个元素移动到我们需要的任何位置。</p><p>如往常一样，示例的完整代码可以在GitHub上找到。</p><p>OK</p>',20),o=[e];function c(i,l){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-08-Moving Items Around in an Arraylist.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Moving%20Items%20Around%20in%20an%20Arraylist.html","title":"Java ArrayList中移动元素的方法","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","ArrayList"],"tag":["Java","Collections","ArrayList","旋转","交换"],"head":[["meta",{"name":"keywords","content":"Java, ArrayList, Collections, 旋转, 交换"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Moving%20Items%20Around%20in%20an%20Arraylist.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java ArrayList中移动元素的方法"}],["meta",{"property":"og:description","content":"Java ArrayList中移动元素的方法 概述 Java为我们提供了多种在_ArrayList_中重新排列元素的方法。在本教程中，我们将探讨其中的三种。 移动一个元素 最手动的方法，也是给我们最大控制权的方法，是直接将一个元素移动到新的位置。我们可以通过首先使用_ArrayList.remove()_来实现这一点，它返回被移除的元素。然后，我们可以..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T12:55:28.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Collections"}],["meta",{"property":"article:tag","content":"ArrayList"}],["meta",{"property":"article:tag","content":"旋转"}],["meta",{"property":"article:tag","content":"交换"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T12:55:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java ArrayList中移动元素的方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T12:55:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java ArrayList中移动元素的方法 概述 Java为我们提供了多种在_ArrayList_中重新排列元素的方法。在本教程中，我们将探讨其中的三种。 移动一个元素 最手动的方法，也是给我们最大控制权的方法，是直接将一个元素移动到新的位置。我们可以通过首先使用_ArrayList.remove()_来实现这一点，它返回被移除的元素。然后，我们可以..."},"headers":[],"git":{"createdTime":1720443328000,"updatedTime":1720443328000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.47,"words":741},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Moving Items Around in an Arraylist.md","localizedDate":"2022年4月1日","excerpt":"\\n<ol>\\n<li>概述</li>\\n</ol>\\n<p>Java为我们提供了多种在_ArrayList_中重新排列元素的方法。在本教程中，我们将探讨其中的三种。</p>\\n<ol start=\\"2\\">\\n<li>移动一个元素</li>\\n</ol>\\n<p>最手动的方法，也是给我们最大控制权的方法，是直接将一个元素移动到新的位置。我们可以通过首先使用_ArrayList.remove()_来实现这一点，它返回被移除的元素。然后，我们可以选择性地使用_ArrayList.add()_将该元素重新插入到我们选择的位置：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenAList_whenManuallyReordering_thenOneItemMovesPosition</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">ArrayList</span>````````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>```````` arrayList <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ArrayList</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">Arrays</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">asList</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"one\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"two\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"three\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"four\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"five\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token class-name\\">String</span> removed <span class=\\"token operator\\">=</span> arrayList<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">remove</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">3</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    arrayList<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">add</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> removed<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token class-name\\">ArrayList</span>````````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>```````` expectedResult <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ArrayList</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">Arrays</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">asList</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"one\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"two\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"four\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"three\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"five\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span>expectedResult<span class=\\"token punctuation\\">,</span> arrayList<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
