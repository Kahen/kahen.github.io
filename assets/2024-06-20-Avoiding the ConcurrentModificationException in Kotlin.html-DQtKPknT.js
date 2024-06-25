import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CLTJixKm.js";const e={},o=t(`<h1 id="kotlin中避免concurrentmodificationexception" tabindex="-1"><a class="header-anchor" href="#kotlin中避免concurrentmodificationexception"><span>Kotlin中避免ConcurrentModificationException</span></a></h1><p>在本教程中，我们将解决Kotlin中的一个常见问题：<em>ConcurrentModificationException</em>。这通常发生在我们尝试在迭代集合的同时修改它，这是并发编程中的一个常见陷阱。</p><p>这种异常可能会令人沮丧，特别是当我们不确定是什么导致了它或如何修复它时。让我们探讨这种异常的根本原因，以及最重要的是，一些避免在代码中出现它的策略。</p><p><strong>_ConcurrentModificationException_通常在尝试在迭代过程中修改集合时抛出</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> numbers <span class="token operator">=</span> <span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>

assertThrows\`<span class="token operator">&lt;</span>ConcurrentModificationException<span class="token operator">&gt;</span>\` <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>item <span class="token keyword">in</span> numbers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>item <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            numbers<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们尝试在遍历列表的同时从中移除一个项目。这种同时进行的操作激活了Kotlin的安全机制，以防止数据不一致和竞态条件，导致_ConcurrentModificationException_。</p><p>简单来说，当在Kotlin中迭代集合时修改它，就会抛出_ConcurrentModificationException_。<strong>尽管多线程可能会增加这种异常的可能性，但它也可以在单个线程中发生</strong>。</p><p>在并发编程中，“并发”意味着两个或更多的进程同时发生，但它们不一定来自不同的线程。正如我们在上面的示例中看到的，如果我们尝试在单个线程中迭代集合的同时修改它，我们可能会遇到这种异常。</p><p>现在我们已经理解了_ConcurrentModificationException_的原因，让我们探索一些避免在代码中出现它的策略。</p><h3 id="使用-iterator" tabindex="-1"><a class="header-anchor" href="#使用-iterator"><span>使用_Iterator_</span></a></h3><p>避免_ConcurrentModificationException_的一个策略是在迭代时使用_Iterator_提供的函数。<strong>_Iterator_允许我们在迭代过程中通过_remove()_函数安全地移除元素</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> numbers <span class="token operator">=</span> <span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
<span class="token keyword">val</span> iterator <span class="token operator">=</span> numbers<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> number <span class="token operator">=</span> iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>number <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        iterator<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们使用_Iterator_的_remove()_函数而不是_List_的_remove()<em>函数。这样，我们可以防止_ConcurrentModificationException</em>。</p><h3 id="使用-removeall" tabindex="-1"><a class="header-anchor" href="#使用-removeall"><span>使用_removeAll()_</span></a></h3><p>我们还可以使用Kotlin标准库中的_removeAll()<em>函数来避免_ConcurrentModificationException</em>。</p><p>类似于Java的_removeIf()_函数，_removeAll()_函数使用函数式编程概念，使用给定的谓词过滤底层集合：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> numbers <span class="token operator">=</span> <span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
numbers<span class="token punctuation">.</span><span class="token function">removeAll</span> <span class="token punctuation">{</span> number <span class="token operator">-&gt;</span> number <span class="token operator">==</span> <span class="token number">3</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中，<strong>_removeAll()_函数在内部迭代集合，并移除满足给定条件的每个元素</strong>。这通常比手动迭代和修改集合更安全、更简洁，如果处理不当，可能会导致_ConcurrentModificationException_。</p><h3 id="修改副本" tabindex="-1"><a class="header-anchor" href="#修改副本"><span>修改副本</span></a></h3><p><strong>我们还可以采取另一种方法，即修改原始集合的副本</strong>。在这里，我们复制集合，在副本上执行任何修改，然后替换原始集合：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">var</span> numbers <span class="token operator">=</span> <span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
<span class="token keyword">val</span> copyNumbers <span class="token operator">=</span> numbers<span class="token punctuation">.</span><span class="token function">toMutableList</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span>number <span class="token keyword">in</span> numbers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>number <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        copyNumbers<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
numbers <span class="token operator">=</span> copyNumbers
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在示例中看到的，我们通过不在原始列表上进行更改成功避免了异常。<strong>然而，这种方法可能相对资源密集</strong>。在内存占用很重要的情况下，我们应该优先选择本文中强调的其他解决方案。</p><h3 id="使用-copyonwritearraylist" tabindex="-1"><a class="header-anchor" href="#使用-copyonwritearraylist"><span>使用_CopyOnWriteArrayList_</span></a></h3><p>最后，我们可以使用_CopyOnWriteArrayList_来避免_ConcurrentModificationException_。<strong>_CopyOnWriteArrayList_是_ArrayList_的线程安全变体</strong>。<strong>它在执行修改操作（如_add()_、_set()<em>或_remove()</em>）时会在内部创建底层列表的副本</strong>。由于这种机制，它可以在被迭代时安全地处理修改：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> list <span class="token operator">=</span> <span class="token function">CopyOnWriteArrayList</span><span class="token punctuation">(</span><span class="token function">listOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span>item <span class="token keyword">in</span> list<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>item <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        list<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，尽管我们在迭代列表的同时修改了它，但没有发生_ConcurrentModificationException_。然而，我们必须记住，<strong>_CopyOnWriteArrayList_会带来内存成本</strong>，因为它在每次变异时都会创建底层数组的新副本。因此，我们应该在主要提供读取操作且写操作较少的集合中使用它。</p><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>在本文中，我们学习了如何通过各种策略有效地管理Kotlin中的_ConcurrentModificationExceptions_。使用_Iterator_进行迭代期间的安全移除、使用_removeAll()_进行清晰的函数式风格修改、在集合副本上进行修改，或选择_CopyOnWriteArrayList_是我们可用的一些解决方案。每种方法都在安全性和性能考虑之间取得了平衡，使我们能够有效地解决Kotlin中的并发问题。</p><p>如常，代码示例可以在GitHub上找到。</p>`,29),p=[o];function i(c,l){return s(),a("div",null,p)}const k=n(e,[["render",i],["__file","2024-06-20-Avoiding the ConcurrentModificationException in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Avoiding%20the%20ConcurrentModificationException%20in%20Kotlin.html","title":"Kotlin中避免ConcurrentModificationException","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Kotlin","Programming"],"tag":["ConcurrentModificationException","Exception Handling"],"head":[["meta",{"name":"keywords","content":"Kotlin, ConcurrentModificationException, Exception Handling"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Avoiding%20the%20ConcurrentModificationException%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中避免ConcurrentModificationException"}],["meta",{"property":"og:description","content":"Kotlin中避免ConcurrentModificationException 在本教程中，我们将解决Kotlin中的一个常见问题：ConcurrentModificationException。这通常发生在我们尝试在迭代集合的同时修改它，这是并发编程中的一个常见陷阱。 这种异常可能会令人沮丧，特别是当我们不确定是什么导致了它或如何修复它时。让我们探..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"ConcurrentModificationException"}],["meta",{"property":"article:tag","content":"Exception Handling"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中避免ConcurrentModificationException\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中避免ConcurrentModificationException 在本教程中，我们将解决Kotlin中的一个常见问题：ConcurrentModificationException。这通常发生在我们尝试在迭代集合的同时修改它，这是并发编程中的一个常见陷阱。 这种异常可能会令人沮丧，特别是当我们不确定是什么导致了它或如何修复它时。让我们探..."},"headers":[{"level":3,"title":"使用_Iterator_","slug":"使用-iterator","link":"#使用-iterator","children":[]},{"level":3,"title":"使用_removeAll()_","slug":"使用-removeall","link":"#使用-removeall","children":[]},{"level":3,"title":"修改副本","slug":"修改副本","link":"#修改副本","children":[]},{"level":3,"title":"使用_CopyOnWriteArrayList_","slug":"使用-copyonwritearraylist","link":"#使用-copyonwritearraylist","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.77,"words":1131},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Avoiding the ConcurrentModificationException in Kotlin.md","localizedDate":"2024年6月20日","excerpt":"\\n<p>在本教程中，我们将解决Kotlin中的一个常见问题：<em>ConcurrentModificationException</em>。这通常发生在我们尝试在迭代集合的同时修改它，这是并发编程中的一个常见陷阱。</p>\\n<p>这种异常可能会令人沮丧，特别是当我们不确定是什么导致了它或如何修复它时。让我们探讨这种异常的根本原因，以及最重要的是，一些避免在代码中出现它的策略。</p>\\n<p><strong>_ConcurrentModificationException_通常在尝试在迭代过程中修改集合时抛出</strong>：</p>\\n<div class=\\"language-kotlin\\" data-ext=\\"kt\\" data-title=\\"kt\\"><pre class=\\"language-kotlin\\"><code><span class=\\"token keyword\\">val</span> numbers <span class=\\"token operator\\">=</span> <span class=\\"token function\\">mutableListOf</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">4</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">5</span><span class=\\"token punctuation\\">)</span>\\n\\nassertThrows`<span class=\\"token operator\\">&lt;</span>ConcurrentModificationException<span class=\\"token operator\\">&gt;</span>` <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span>item <span class=\\"token keyword\\">in</span> numbers<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>item <span class=\\"token operator\\">==</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            numbers<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">remove</span><span class=\\"token punctuation\\">(</span>item<span class=\\"token punctuation\\">)</span>\\n        <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
