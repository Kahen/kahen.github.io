import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-D4B8YWfq.js";const e={},o=t('<hr><h1 id="在kotlin中反转数组并迭代" tabindex="-1"><a class="header-anchor" href="#在kotlin中反转数组并迭代"><span>在Kotlin中反转数组并迭代</span></a></h1><p>数组是存储和操作元素集合的基本数据结构。按自然顺序遍历数组是一项常见任务。然而，在某些情况下，需要按相反的顺序迭代它。</p><p>在本教程中，我们将探讨在Kotlin中按相反顺序迭代数组的各种方法。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>Kotlin通过提供简洁的语法和内置函数简化了数组操作。数组可以轻松初始化、操作，当然也可以遍历。例如，我们可以编写一个_for_循环来遍历其元素，或者使用_forEach{ … }_函数按自然顺序遍历数组。</p><p>然而，当涉及到按相反顺序迭代数组时，我们可能会想知道是否有专门的函数或是否需要一个变通方法。</p><p>在本教程中，我们将看到不同的解决方案。</p><p>例如，假设我们有一个包含六个元素的字符串数组：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> array <span class="token operator">=</span> <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;d&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;e&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;f&quot;</span></span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们反转地迭代这个数组，期望的访问元素的顺序是_“f” -&gt; “e” -&gt; “d” -&gt; … -&gt; “a”_。</p><p>因此，让我们将元素存储在预期的顺序中，以便我们可以验证我们的反转迭代解决方案是否按预期工作：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> reversedList <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;f&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;e&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;d&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们看看如何反转迭代_array_。</p><h2 id="_3-调用数组的-reversed-函数" tabindex="-1"><a class="header-anchor" href="#_3-调用数组的-reversed-函数"><span>3. 调用数组的_reversed()_函数</span></a></h2><p>Kotlin提供了_Array.reversed()_扩展函数。<strong>这个函数返回一个新数组，其中元素按相反顺序排列</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">public</span> <span class="token keyword">fun</span> ``<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>`` Array`<span class="token operator">&lt;</span><span class="token keyword">out</span> T<span class="token operator">&gt;</span>`<span class="token punctuation">.</span><span class="token function">reversed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> List``<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>`` <span class="token punctuation">{</span> <span class="token operator">..</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>例如，我们可以使用_for_循环来迭代_array.reversed()_的结果：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> resultList <span class="token operator">=</span> mutableListOf```<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>```<span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span>element <span class="token keyword">in</span> array<span class="token punctuation">.</span><span class="token function">reversed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    resultList <span class="token operator">+=</span> element\n<span class="token punctuation">}</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span>reversedList<span class="token punctuation">,</span> resultList<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如测试所示，我们首先创建了一个空的_Mutablelist_。在迭代反转数组时，我们将每个元素添加到可变列表中。</p><p>然后，结果_listResult_等于预期的_reversedList_。因此，我们按相反顺序遍历了原始数组。</p><h2 id="_4-应用数组索引范围的-reversed" tabindex="-1"><a class="header-anchor" href="#_4-应用数组索引范围的-reversed"><span>4. 应用数组索引范围的_reversed()_</span></a></h2><p>_reversed()_函数是一个直接的解决方案。然而，在某些情况下，更倾向于直接索引。</p><p><strong>Kotlin的数组提供_indices_属性，包含数组的索引在自然顺序中的_IntRange_。</strong> 进一步地，<strong>_IntRange_也有_reversed()_扩展函数</strong>。</p><p>因此，我们可以迭代_array.indices.reversed()_，它提供了一个反转的索引范围，然后使用索引访问数组元素：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> resultList <span class="token operator">=</span> mutableListOf```<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>```<span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n<span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token keyword">in</span> array<span class="token punctuation">.</span>indices<span class="token punctuation">.</span><span class="token function">reversed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    resultList <span class="token operator">+=</span> array<span class="token punctuation">[</span>i<span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n\n<span class="token function">assertEquals</span><span class="token punctuation">(</span>reversedList<span class="token punctuation">,</span> resultList<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用-downto-函数" tabindex="-1"><a class="header-anchor" href="#_5-使用-downto-函数"><span>5. 使用_downTo()_函数</span></a></h2><p>在Kotlin中，我们可以使用_downTo()_函数创建一个“反转范围”。从技术上讲，<strong>_Int.downTo()<em>返回一个_IntProgression_而不是_IntRange</em></strong>。</p><p><strong>_IntProgression_是</strong> _<strong>IntRange</strong>的超类型。<strong>_IntRange_和_IntProgression_之间的差异在于</strong>_IntRange_的固定步长为1**：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token function">IntRange</span><span class="token punctuation">(</span>start<span class="token operator">:</span> Int<span class="token punctuation">,</span> endInclusive<span class="token operator">:</span> Int<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">IntProgression</span><span class="token punctuation">(</span>start<span class="token punctuation">,</span> endInclusive<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">..</span><span class="token punctuation">.</span><span class="token punctuation">{</span>\n    <span class="token keyword">override</span> <span class="token keyword">val</span> start<span class="token operator">:</span> Int <span class="token keyword">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> first\n    <span class="token keyword">override</span> <span class="token keyword">val</span> endInclusive<span class="token operator">:</span> Int <span class="token keyword">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> last\n    <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一方面，<strong>_IntProgression_允许我们指定步长值</strong>。例如，<strong>_downTo()_函数自动将步长设置为-1</strong>，因此整数按相反顺序排列：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">public</span> <span class="token keyword">infix</span> <span class="token keyword">fun</span> Int<span class="token punctuation">.</span><span class="token function">downTo</span><span class="token punctuation">(</span><span class="token keyword">to</span><span class="token operator">:</span> Int<span class="token punctuation">)</span><span class="token operator">:</span> IntProgression <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> IntProgression<span class="token punctuation">.</span><span class="token function">fromClosedRange</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token keyword">to</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，<strong>使用_array.lastIndex_结合_downTo()_是另一种在Kotlin中按相反顺序迭代数组的有效方法</strong>。这种方法直接操作索引以实现预期的结果：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> resultList <span class="token operator">=</span> mutableListOf```<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>```<span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token keyword">in</span> <span class="token punctuation">(</span>array<span class="token punctuation">.</span>lastIndex downTo <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    resultList <span class="token operator">+=</span> array<span class="token punctuation">[</span>i<span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span>reversedList<span class="token punctuation">,</span> resultList<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，“ <em>array.lastIndex downTo 0</em>”在上述代码中实际上是函数调用“ _array.lastIndex.downTo(0)”。<strong>由于_Int.downTo()_是一个_infix_扩展函数，我们可以以更易读的形式编写函数调用</strong>。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了在Kotlin中按相反顺序迭代数组的不同方法。</p><p>如果我们不关心数组的索引，_array.reversed()_是最直接的解决方案。否则，可以选择两种方法直接按相反顺序索引元素：_array.indices.reversed()<em>和_array.lastIndex downTo 0</em>。</p><p>一如既往，示例的完整源代码可以在GitHub上找到。</p>',39),p=[o];function l(r,i){return a(),s("div",null,p)}const d=n(e,[["render",l],["__file","2024-07-24-Iterate Through an Array in Reverse Order in Kotlin.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-24/2024-07-24-Iterate%20Through%20an%20Array%20in%20Reverse%20Order%20in%20Kotlin.html","title":"在Kotlin中反转数组并迭代","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Programming"],"tag":["Kotlin","Array","Reverse Iteration"],"head":[["meta",{"name":"keywords","content":"Kotlin, Array, Reverse Iteration"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-24/2024-07-24-Iterate%20Through%20an%20Array%20in%20Reverse%20Order%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Kotlin中反转数组并迭代"}],["meta",{"property":"og:description","content":"在Kotlin中反转数组并迭代 数组是存储和操作元素集合的基本数据结构。按自然顺序遍历数组是一项常见任务。然而，在某些情况下，需要按相反的顺序迭代它。 在本教程中，我们将探讨在Kotlin中按相反顺序迭代数组的各种方法。 2. 问题介绍 Kotlin通过提供简洁的语法和内置函数简化了数组操作。数组可以轻松初始化、操作，当然也可以遍历。例如，我们可以编写..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-24T07:50:05.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"Array"}],["meta",{"property":"article:tag","content":"Reverse Iteration"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-24T07:50:05.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Kotlin中反转数组并迭代\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-24T07:50:05.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Kotlin中反转数组并迭代 数组是存储和操作元素集合的基本数据结构。按自然顺序遍历数组是一项常见任务。然而，在某些情况下，需要按相反的顺序迭代它。 在本教程中，我们将探讨在Kotlin中按相反顺序迭代数组的各种方法。 2. 问题介绍 Kotlin通过提供简洁的语法和内置函数简化了数组操作。数组可以轻松初始化、操作，当然也可以遍历。例如，我们可以编写..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 调用数组的_reversed()_函数","slug":"_3-调用数组的-reversed-函数","link":"#_3-调用数组的-reversed-函数","children":[]},{"level":2,"title":"4. 应用数组索引范围的_reversed()_","slug":"_4-应用数组索引范围的-reversed","link":"#_4-应用数组索引范围的-reversed","children":[]},{"level":2,"title":"5. 使用_downTo()_函数","slug":"_5-使用-downto-函数","link":"#_5-使用-downto-函数","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721807405000,"updatedTime":1721807405000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.44,"words":1032},"filePathRelative":"posts/baeldung/2024-07-24/2024-07-24-Iterate Through an Array in Reverse Order in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"<hr>\\n<h1>在Kotlin中反转数组并迭代</h1>\\n<p>数组是存储和操作元素集合的基本数据结构。按自然顺序遍历数组是一项常见任务。然而，在某些情况下，需要按相反的顺序迭代它。</p>\\n<p>在本教程中，我们将探讨在Kotlin中按相反顺序迭代数组的各种方法。</p>\\n<h2>2. 问题介绍</h2>\\n<p>Kotlin通过提供简洁的语法和内置函数简化了数组操作。数组可以轻松初始化、操作，当然也可以遍历。例如，我们可以编写一个_for_循环来遍历其元素，或者使用_forEach{ … }_函数按自然顺序遍历数组。</p>\\n<p>然而，当涉及到按相反顺序迭代数组时，我们可能会想知道是否有专门的函数或是否需要一个变通方法。</p>","autoDesc":true}');export{d as comp,k as data};
