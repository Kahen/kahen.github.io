import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CbPcg273.js";const e={},p=t(`<h1 id="kotlin中在迭代列表时移除元素" tabindex="-1"><a class="header-anchor" href="#kotlin中在迭代列表时移除元素"><span>Kotlin中在迭代列表时移除元素</span></a></h1><p>如果你有几年的Kotlin语言和服务器端开发经验，并且有兴趣与社区分享这些经验，请查看我们的<strong>贡献指南</strong>。</p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将探讨如何在迭代过程中从列表中移除元素。Kotlin提供了多种灵活的方法，在迭代期间高效地从列表中移除元素。我们将探索适用于不同场景的不同技术。</p><h2 id="_2-使用迭代器移除元素" tabindex="-1"><a class="header-anchor" href="#_2-使用迭代器移除元素"><span>2. 使用迭代器移除元素</span></a></h2><p>首先，我们应该提到，只有当列表是可变的时，才可能从列表中移除元素。对于不可变的列表，当我们尝试从中移除元素时，编译器会抛出错误。不可变列表没有暴露修改的方法。</p><p>第一种经典方法是使用迭代器。它允许在向前迭代期间安全地移除元素：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`使用迭代器移除元素时它有效\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> numbers <span class="token operator">=</span> <span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> iterator <span class="token operator">=</span> numbers<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">val</span> element <span class="token operator">=</span> iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>element <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            iterator<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    Assertions<span class="token punctuation">.</span><span class="token function">assertThat</span><span class="token punctuation">(</span>numbers<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactlyElementsOf</span><span class="token punctuation">(</span><span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子以及接下来的例子中，我们将使用一个可变的数字列表作为输入。我们创建了一个迭代器，它公开了一个_remove_方法。该方法移除迭代器当前指向的元素。因此，我们可以安全地向前迭代并移除元素。</p><p>此外，在测试结束时，我们检查列表是否只包含奇数。正如预期的那样，我们从初始列表中移除了数字2和4。</p><h2 id="_3-使用removeall-函数移除元素" tabindex="-1"><a class="header-anchor" href="#_3-使用removeall-函数移除元素"><span>3. 使用removeAll()函数移除元素</span></a></h2><p>现在，让我们看看removeAll()函数。它简化了迭代时移除元素的过程。此外，它提供了一种简洁易读的方式来根据指定的条件移除元素。</p><p>让我们通过一个示例来展示：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`使用removeAll函数移除元素时它有效\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> numbers <span class="token operator">=</span> <span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
    numbers<span class="token punctuation">.</span><span class="token function">removeAll</span> <span class="token punctuation">{</span> it <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">}</span>
    Assertions<span class="token punctuation">.</span><span class="token function">assertThat</span><span class="token punctuation">(</span>numbers<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactlyElementsOf</span><span class="token punctuation">(</span><span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>得益于removeAll函数，我们只需要提供应该从列表中移除的元素的条件。列表中只剩下奇数。此外，removeAll函数在从集合中移除任何元素时返回_true_。否则，它返回_false_。</p><h2 id="_4-迭代元素并移除" tabindex="-1"><a class="header-anchor" href="#_4-迭代元素并移除"><span>4. 迭代元素并移除</span></a></h2><p>最后，我们将展示如何在迭代列表时移除元素。直接迭代在移除逻辑依赖于索引或涉及更复杂的检查时提供了灵活性。</p><p>最重要的是，我们必须反向迭代。这保证了在迭代期间元素的索引不会改变。</p><p>让我们看一个例子：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`迭代时移除元素时它有效\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> numbers <span class="token operator">=</span> <span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>element <span class="token keyword">in</span> numbers<span class="token punctuation">.</span><span class="token function">reversed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>element <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            numbers<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    Assertions<span class="token punctuation">.</span><span class="token function">assertThat</span><span class="token punctuation">(</span>numbers<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactlyElementsOf</span><span class="token punctuation">(</span><span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面，我们使用reversed函数改变了迭代时元素的顺序。它返回一个只读列表。我们使用该列表中的元素来检查条件。与前面的示例一样，我们得到了一个只包含奇数的结果列表。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们展示了如何在迭代列表时从列表中移除元素。我们使用了迭代器、removeAll函数，并反向迭代列表。</p><p>如常，示例的源代码可以在GitHub上找到。</p>`,24),o=[p];function l(c,i){return a(),s("div",null,o)}const k=n(e,[["render",l],["__file","2024-07-29-Remove Elements From a List While Iterating in Kotlin.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-29/2024-07-29-Remove%20Elements%20From%20a%20List%20While%20Iterating%20in%20Kotlin.html","title":"Kotlin中在迭代列表时移除元素","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Programming"],"tag":["Kotlin","List","Iterator","removeAll"],"head":[["meta",{"name":"keywords","content":"Kotlin, List, remove elements, iteration"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-29/2024-07-29-Remove%20Elements%20From%20a%20List%20While%20Iterating%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中在迭代列表时移除元素"}],["meta",{"property":"og:description","content":"Kotlin中在迭代列表时移除元素 如果你有几年的Kotlin语言和服务器端开发经验，并且有兴趣与社区分享这些经验，请查看我们的贡献指南。 1. 概述 在本教程中，我们将探讨如何在迭代过程中从列表中移除元素。Kotlin提供了多种灵活的方法，在迭代期间高效地从列表中移除元素。我们将探索适用于不同场景的不同技术。 2. 使用迭代器移除元素 首先，我们应该..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-29T10:07:59.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"List"}],["meta",{"property":"article:tag","content":"Iterator"}],["meta",{"property":"article:tag","content":"removeAll"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-29T10:07:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中在迭代列表时移除元素\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-29T10:07:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中在迭代列表时移除元素 如果你有几年的Kotlin语言和服务器端开发经验，并且有兴趣与社区分享这些经验，请查看我们的贡献指南。 1. 概述 在本教程中，我们将探讨如何在迭代过程中从列表中移除元素。Kotlin提供了多种灵活的方法，在迭代期间高效地从列表中移除元素。我们将探索适用于不同场景的不同技术。 2. 使用迭代器移除元素 首先，我们应该..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用迭代器移除元素","slug":"_2-使用迭代器移除元素","link":"#_2-使用迭代器移除元素","children":[]},{"level":2,"title":"3. 使用removeAll()函数移除元素","slug":"_3-使用removeall-函数移除元素","link":"#_3-使用removeall-函数移除元素","children":[]},{"level":2,"title":"4. 迭代元素并移除","slug":"_4-迭代元素并移除","link":"#_4-迭代元素并移除","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1722247679000,"updatedTime":1722247679000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.9,"words":869},"filePathRelative":"posts/baeldung/2024-07-29/2024-07-29-Remove Elements From a List While Iterating in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>如果你有几年的Kotlin语言和服务器端开发经验，并且有兴趣与社区分享这些经验，请查看我们的<strong>贡献指南</strong>。</p>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将探讨如何在迭代过程中从列表中移除元素。Kotlin提供了多种灵活的方法，在迭代期间高效地从列表中移除元素。我们将探索适用于不同场景的不同技术。</p>\\n<h2>2. 使用迭代器移除元素</h2>\\n<p>首先，我们应该提到，只有当列表是可变的时，才可能从列表中移除元素。对于不可变的列表，当我们尝试从中移除元素时，编译器会抛出错误。不可变列表没有暴露修改的方法。</p>\\n<p>第一种经典方法是使用迭代器。它允许在向前迭代期间安全地移除元素：</p>","autoDesc":true}');export{k as comp,m as data};
