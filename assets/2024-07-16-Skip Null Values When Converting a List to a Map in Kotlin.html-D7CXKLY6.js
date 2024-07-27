import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CJGTm_7y.js";const p={},o=t('<h1 id="kotlin中在列表转换为映射时跳过空值" tabindex="-1"><a class="header-anchor" href="#kotlin中在列表转换为映射时跳过空值"><span>Kotlin中在列表转换为映射时跳过空值</span></a></h1><p>列表和映射是Kotlin中的核心数据结构，通常用于完成各种编程任务。经常将键值对列表转换为映射以提高我们数据的组织性。然而，有时键值对中可能包含不需要在最终映射中的空值。</p><p>在本教程中，我们将探讨在Kotlin中将一对列表转换为映射时跳过空值的多种方法。</p><h3 id="_2-使用for-循环" tabindex="-1"><a class="header-anchor" href="#_2-使用for-循环"><span>2. 使用for()循环</span></a></h3><p>在将一对列表转换为映射时跳过空值的一个简单方法是使用经典的for()循环。我们遍历列表的每个元素并检查值是否为空。如果值不为空，我们将这对添加到映射中：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>\n<span class="token keyword">fun</span> <span class="token function">`使用for循环跳过空值`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> pairs <span class="token operator">=</span> listOf````<span class="token operator">&lt;</span>Pair<span class="token operator">&lt;</span>String<span class="token punctuation">,</span> Int<span class="token operator">?</span><span class="token operator">&gt;</span>````<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token function">Pair</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">Pair</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">Pair</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token keyword">val</span> expected <span class="token operator">=</span> <span class="token function">mapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span> <span class="token keyword">to</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span> <span class="token keyword">to</span> <span class="token number">3</span><span class="token punctuation">)</span>\n    <span class="token keyword">val</span> map <span class="token operator">=</span> mutableMapOf``<span class="token operator">&lt;</span>String<span class="token punctuation">,</span> Int<span class="token operator">&gt;</span>``<span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span>pair <span class="token keyword">in</span> pairs<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>pair<span class="token punctuation">.</span>second <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            map<span class="token punctuation">[</span>pair<span class="token punctuation">.</span>first<span class="token punctuation">]</span> <span class="token operator">=</span> pair<span class="token punctuation">.</span>second<span class="token operator">!!</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> map<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们构建了一个包含空值的一对列表。接下来，我们创建了一个空的MutableMap，然后遍历列表的每个元素。如果这对的值不为空，我们将其添加到映射中。否则，我们跳过该对。最后，我们断言最终得到的映射包含正确的条目。</p><h3 id="_3-使用filter-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用filter-方法"><span>3. 使用filter()方法</span></a></h3><p>另一种方法是使用filter()方法。这个方法接受一个谓词lambda函数并过滤列表，保留与谓词匹配的元素：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>\n<span class="token keyword">fun</span> <span class="token function">`使用filter方法跳过空值`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> list <span class="token operator">=</span> listOf````<span class="token operator">&lt;</span>Pair<span class="token operator">&lt;</span>String<span class="token punctuation">,</span> Int<span class="token operator">?</span><span class="token operator">&gt;</span>````<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token function">Pair</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">Pair</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">Pair</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token keyword">val</span> filteredList <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">filter</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span>second <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token punctuation">}</span>\n    <span class="token keyword">val</span> map <span class="token operator">=</span> filteredList<span class="token punctuation">.</span><span class="token function">toMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n    <span class="token keyword">val</span> expected <span class="token operator">=</span> <span class="token function">mapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span> <span class="token keyword">to</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span> <span class="token keyword">to</span> <span class="token number">3</span><span class="token punctuation">)</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> map<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，我们创建了一个包含空值的一对列表。随后，我们向filter()方法提供谓词函数，该函数移除任何第二值为空的对。最后，我们使用toMap()方法在过滤后将列表转换为映射。</p><h3 id="_4-使用mapnotnull-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用mapnotnull-方法"><span>4. 使用mapNotNull()方法</span></a></h3><p>我们也可以利用mapNotNull()方法在将一对列表转换为映射时跳过空值。这个方法对列表的每个元素应用转换，并返回一个只包含非空值的新列表：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>\n<span class="token keyword">fun</span> <span class="token function">`使用mapNotNull方法跳过空值`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> pairs <span class="token operator">=</span> listOf````<span class="token operator">&lt;</span>Pair<span class="token operator">&lt;</span>String<span class="token punctuation">,</span> Int<span class="token operator">?</span><span class="token operator">&gt;</span>````<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token function">Pair</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">Pair</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">Pair</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token keyword">val</span> expected <span class="token operator">=</span> <span class="token function">mapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span> <span class="token keyword">to</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span> <span class="token keyword">to</span> <span class="token number">3</span><span class="token punctuation">)</span>\n    <span class="token keyword">val</span> result <span class="token operator">=</span> pairs<span class="token punctuation">.</span><span class="token function">mapNotNull</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span>second<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">let</span> <span class="token punctuation">{</span> value <span class="token operator">-&gt;</span> it<span class="token punctuation">.</span>first <span class="token keyword">to</span> value <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">toMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> result<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码片段中，我们调用mapNotNull()方法将一对列表转换为只包含非空值的新列表。</p><p>转换适用于列表的每个元素，并返回一个新的对，其中包含原始对的第一个元素和第二个元素的非空值，或者如果第二个元素为空，则返回null。</p><p>mapNotNull()方法跳过任何空元素，并且不将它们包含在结果列表中。这导致最终的toMap()映射中没有空元素。</p><h3 id="_5-使用fold-方法" tabindex="-1"><a class="header-anchor" href="#_5-使用fold-方法"><span>5. 使用fold()方法</span></a></h3><p>我们还可以使用fold()方法在将一对列表转换为映射时跳过空值。这个方法使用指定的操作将集合的元素组合成单个值。</p><p>这个方法对列表的每个元素运行累积lambda，以累积结果。在这种情况下，我们将在跳过空值的同时在映射中累积结果：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>\n<span class="token keyword">fun</span> <span class="token function">`使用fold方法跳过空值`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> pairs <span class="token operator">=</span> listOf````<span class="token operator">&lt;</span>Pair<span class="token operator">&lt;</span>String<span class="token punctuation">,</span> Int<span class="token operator">?</span><span class="token operator">&gt;</span>````<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token function">Pair</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">Pair</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">Pair</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token keyword">val</span> expected <span class="token operator">=</span> <span class="token function">mapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span> <span class="token keyword">to</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span> <span class="token keyword">to</span> <span class="token number">3</span><span class="token punctuation">)</span>\n    <span class="token keyword">val</span> map <span class="token operator">=</span> pairs<span class="token punctuation">.</span><span class="token function">fold</span><span class="token punctuation">(</span>mutableMapOf``<span class="token operator">&lt;</span>String<span class="token punctuation">,</span> Int<span class="token operator">&gt;</span>``<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> acc<span class="token punctuation">,</span> pair <span class="token operator">-&gt;</span>\n        acc<span class="token punctuation">.</span><span class="token function">apply</span> <span class="token punctuation">{</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span>pair<span class="token punctuation">.</span>second <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n                <span class="token function">put</span><span class="token punctuation">(</span>pair<span class="token punctuation">.</span>first<span class="token punctuation">,</span> pair<span class="token punctuation">.</span>second<span class="token operator">!!</span><span class="token punctuation">)</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> map<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试中，我们使用fold()方法对一对列表进行迭代，跳过空值。我们传递给fold()方法的lambda函数检查对的第二个值是否不为空。如果是这样，我们将对添加到一个可变的映射中。最后，我们总是返回作为中间累积lambda的结果的累加器映射。</p><h3 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h3><p>在本文中，我们探讨了在Kotlin中将一对列表转换为映射时跳过空值的多种方式。filterNotNull()方法从列表中过滤出空值，而mapNotNull()方法对列表的每个元素应用转换并返回一个只包含非空转换值的新列表。</p><p>此外，for()循环方法迭代一对列表并检查值是否为空。最后，fold()方法对列表的每个元素应用操作并累积结果。</p><p>如常，与本文相关的代码样本和测试用例可以在GitHub上找到。</p>',26),e=[o];function l(c,i){return a(),s("div",null,e)}const k=n(p,[["render",l],["__file","2024-07-16-Skip Null Values When Converting a List to a Map in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-Skip%20Null%20Values%20When%20Converting%20a%20List%20to%20a%20Map%20in%20Kotlin.html","title":"Kotlin中在列表转换为映射时跳过空值","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin"],"tag":["List","Map","Conversion"],"head":[["meta",{"name":"keywords","content":"Kotlin, List, Map, Conversion, Null Values"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-Skip%20Null%20Values%20When%20Converting%20a%20List%20to%20a%20Map%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中在列表转换为映射时跳过空值"}],["meta",{"property":"og:description","content":"Kotlin中在列表转换为映射时跳过空值 列表和映射是Kotlin中的核心数据结构，通常用于完成各种编程任务。经常将键值对列表转换为映射以提高我们数据的组织性。然而，有时键值对中可能包含不需要在最终映射中的空值。 在本教程中，我们将探讨在Kotlin中将一对列表转换为映射时跳过空值的多种方法。 2. 使用for()循环 在将一对列表转换为映射时跳过空值..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T14:06:50.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"List"}],["meta",{"property":"article:tag","content":"Map"}],["meta",{"property":"article:tag","content":"Conversion"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T14:06:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中在列表转换为映射时跳过空值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T14:06:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中在列表转换为映射时跳过空值 列表和映射是Kotlin中的核心数据结构，通常用于完成各种编程任务。经常将键值对列表转换为映射以提高我们数据的组织性。然而，有时键值对中可能包含不需要在最终映射中的空值。 在本教程中，我们将探讨在Kotlin中将一对列表转换为映射时跳过空值的多种方法。 2. 使用for()循环 在将一对列表转换为映射时跳过空值..."},"headers":[{"level":3,"title":"2. 使用for()循环","slug":"_2-使用for-循环","link":"#_2-使用for-循环","children":[]},{"level":3,"title":"3. 使用filter()方法","slug":"_3-使用filter-方法","link":"#_3-使用filter-方法","children":[]},{"level":3,"title":"4. 使用mapNotNull()方法","slug":"_4-使用mapnotnull-方法","link":"#_4-使用mapnotnull-方法","children":[]},{"level":3,"title":"5. 使用fold()方法","slug":"_5-使用fold-方法","link":"#_5-使用fold-方法","children":[]},{"level":3,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721138810000,"updatedTime":1721138810000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.89,"words":1166},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-Skip Null Values When Converting a List to a Map in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>列表和映射是Kotlin中的核心数据结构，通常用于完成各种编程任务。经常将键值对列表转换为映射以提高我们数据的组织性。然而，有时键值对中可能包含不需要在最终映射中的空值。</p>\\n<p>在本教程中，我们将探讨在Kotlin中将一对列表转换为映射时跳过空值的多种方法。</p>\\n<h3>2. 使用for()循环</h3>\\n<p>在将一对列表转换为映射时跳过空值的一个简单方法是使用经典的for()循环。我们遍历列表的每个元素并检查值是否为空。如果值不为空，我们将这对添加到映射中：</p>\\n<div class=\\"language-kotlin\\" data-ext=\\"kt\\" data-title=\\"kt\\"><pre class=\\"language-kotlin\\"><code><span class=\\"token annotation builtin\\">@Test</span>\\n<span class=\\"token keyword\\">fun</span> <span class=\\"token function\\">`使用for循环跳过空值`</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">val</span> pairs <span class=\\"token operator\\">=</span> listOf````<span class=\\"token operator\\">&lt;</span>Pair<span class=\\"token operator\\">&lt;</span>String<span class=\\"token punctuation\\">,</span> Int<span class=\\"token operator\\">?</span><span class=\\"token operator\\">&gt;</span>````<span class=\\"token operator\\">&gt;</span><span class=\\"token punctuation\\">(</span><span class=\\"token function\\">Pair</span><span class=\\"token punctuation\\">(</span><span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"a\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span> <span class=\\"token function\\">Pair</span><span class=\\"token punctuation\\">(</span><span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"b\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span> <span class=\\"token function\\">Pair</span><span class=\\"token punctuation\\">(</span><span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"c\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token keyword\\">val</span> expected <span class=\\"token operator\\">=</span> <span class=\\"token function\\">mapOf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"a\\"</span></span> <span class=\\"token keyword\\">to</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"c\\"</span></span> <span class=\\"token keyword\\">to</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token keyword\\">val</span> map <span class=\\"token operator\\">=</span> mutableMapOf``<span class=\\"token operator\\">&lt;</span>String<span class=\\"token punctuation\\">,</span> Int<span class=\\"token operator\\">&gt;</span>``<span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span>pair <span class=\\"token keyword\\">in</span> pairs<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>pair<span class=\\"token punctuation\\">.</span>second <span class=\\"token operator\\">!=</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            map<span class=\\"token punctuation\\">[</span>pair<span class=\\"token punctuation\\">.</span>first<span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">=</span> pair<span class=\\"token punctuation\\">.</span>second<span class=\\"token operator\\">!!</span>\\n        <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span>expected<span class=\\"token punctuation\\">,</span> map<span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
