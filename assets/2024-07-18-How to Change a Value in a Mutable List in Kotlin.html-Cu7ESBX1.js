import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-C6rqSDgP.js";const e={},l=t(`<hr><h1 id="如何在-kotlin-中更改可变列表中的值-baeldung-关于-kotlin" tabindex="-1"><a class="header-anchor" href="#如何在-kotlin-中更改可变列表中的值-baeldung-关于-kotlin"><span>如何在 Kotlin 中更改可变列表中的值 | Baeldung 关于 Kotlin</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在 Kotlin 中，最常见的数据结构之一是可变 <em>List</em>，它允许存储和操作数据。因此，我们经常会遇到需要更改可变列表中值的情况。</p><p>在本文中，我们将探讨在 Kotlin 中更改可变列表中值的各种方法。</p><h2 id="_2-使用-set-方法" tabindex="-1"><a class="header-anchor" href="#_2-使用-set-方法"><span>2. 使用 <em>set()</em> 方法</span></a></h2><p>更改可变列表中元素值的一种简单方法是使用 <em>set()</em> 方法。<strong>此方法接受两个参数，我们希望更改的元素的索引和我们希望分配给该元素的新值</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`使用 set 方法更改可变列表中的值\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> mutableList <span class="token operator">=</span> <span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;kotlin&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;java&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;android&quot;</span></span><span class="token punctuation">)</span>
    mutableList<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;swift&quot;</span></span><span class="token punctuation">)</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;kotlin&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;swift&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;android&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> mutableList<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述单元测试中，我们首先创建一个包含“kotlin”，“java”和“android”的字符串可变列表。然后我们使用 <em>set()</em> 方法将索引 1 处的元素值从“java”更改为“swift”。最后，我们断言可变列表现在包含预期的值，包括索引 1 处的新值“swift”。</p><h2 id="_3-使用索引访问运算符" tabindex="-1"><a class="header-anchor" href="#_3-使用索引访问运算符"><span>3. 使用索引访问运算符</span></a></h2><p>另一种有趣的方法是使用索引访问运算符。<strong>此运算符允许我们通过其索引访问可变列表中的元素，然后为其分配一个新值</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`使用索引访问运算符更改可变列表中的值\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> mutableList <span class="token operator">=</span> <span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;kotlin&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;java&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;android&quot;</span></span><span class="token punctuation">)</span>
    mutableList<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;swift&quot;</span></span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;kotlin&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;swift&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;android&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> mutableList<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段代码片段中，创建一个字符串可变列表后，我们使用索引访问运算符访问索引位置 1 的元素，该元素包含值“java”。然后我们将新值“swift”分配给此索引位置的元素。最后，我们使用 <em>assertEquals()</em> 方法验证可变列表是否包含预期的值。</p><h2 id="_4-使用-map-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用-map-方法"><span>4. 使用 <em>map()</em> 方法</span></a></h2><p><em>map()</em> 方法是我们可以用来更新列表中值的另一种方法。然而，此方法不会直接在列表上执行更改，而是<strong>返回一个包含列表所有元素的新列表，包括我们希望更新的新值</strong>。</p><p>它接受一个 lambda 函数作为参数，该函数对可变列表中的每个元素执行。lambda 函数接受一个参数——当前元素。<strong>在 lambda 函数中，我们可以检查当前元素是否是我们想要更改的一个，并返回它的新值</strong>。<em>map()</em> 方法返回一个带有更新值的新列表：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`使用 map 方法创建具有更新值的新列表\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> mutableList <span class="token operator">=</span> <span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;kotlin&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;java&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;android&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> updatedList <span class="token operator">=</span> mutableList<span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> element <span class="token operator">-&gt;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>element <span class="token operator">==</span> <span class="token string-literal singleline"><span class="token string">&quot;java&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token string-literal singleline"><span class="token string">&quot;swift&quot;</span></span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            element
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;kotlin&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;swift&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;android&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> updatedList<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们使用 <em>map()</em> 方法对一个字符串可变列表进行迭代，并为每个元素返回一个新值。在 lambda 函数中，我们检查当前元素是否是“java”，如果是，我们返回新值“swift”。否则，我们保留原始值。然后我们断言更新后的列表包含预期的值。</p><p>这种方法有一个主要缺点：<strong>它返回一个带有更新值的新列表，而不是就地更改值</strong>。这意味着使用 <em>map()</em> 方法创建新列表可能会消耗大量的内存。如果可变列表很大，它还可能影响性能。</p><h2 id="_5-使用-replaceall-方法" tabindex="-1"><a class="header-anchor" href="#_5-使用-replaceall-方法"><span>5. 使用 <em>replaceAll()</em> 方法</span></a></h2><p>Kotlin 还提供了一个 <em>replaceAll()</em> 方法，可以用来更新可变列表中的元素值。<strong>此方法允许我们用新值替换列表中所有特定值的出现</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`使用 replace 方法更改可变列表中的值\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> mutableList <span class="token operator">=</span> <span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;kotlin&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;java&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;android&quot;</span></span><span class="token punctuation">)</span>
    mutableList<span class="token punctuation">.</span><span class="token function">replaceAll</span> <span class="token punctuation">{</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>it <span class="token operator">==</span> <span class="token string-literal singleline"><span class="token string">&quot;java&quot;</span></span><span class="token punctuation">)</span> <span class="token string-literal singleline"><span class="token string">&quot;swift&quot;</span></span> <span class="token keyword">else</span> it <span class="token punctuation">}</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;kotlin&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;swift&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;android&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> mutableList<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个单元测试中，我们创建一个包含三个元素——“kotlin”，“java”和“android”的可变列表。然后我们使用 <em>replaceAll()</em> 方法将所有“java”的出现替换为“swift”。最后，我们断言我们的可变列表现在包含预期的值。</p><p><em>replaceAll()</em> 方法可以对可变列表进行全局更改。然而，有一个潜在的缺点：<strong>它将修改列表中所有指定值的出现</strong>。这甚至可能发生在那些出现是预期不同的情况下。如果我们不了解这种行为，可能会导致意外的结果。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了更改可变列表中值的各种方法。虽然有些方法更简单直接，如使用 <em>set()</em> 和索引访问运算符的方法，<em>map()</em> 和 <em>replaceAll()</em> 方法则有一些限制，我们必须在使用它们时牢记这些限制。</p><p>总的来说，这些方法都很容易使用，我们选择在程序中采用哪种方法取决于我们的需求。</p><p>如往常一样，源代码可以在 GitHub 上找到。</p>`,28),i=[l];function p(o,c){return a(),s("div",null,i)}const k=n(e,[["render",p],["__file","2024-07-18-How to Change a Value in a Mutable List in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-How%20to%20Change%20a%20Value%20in%20a%20Mutable%20List%20in%20Kotlin.html","title":"如何在 Kotlin 中更改可变列表中的值 | Baeldung 关于 Kotlin","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin"],"tag":["Kotlin","Mutable List","List Manipulation"],"head":[["meta",{"name":"keywords","content":"Kotlin, Mutable List, List Manipulation"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-How%20to%20Change%20a%20Value%20in%20a%20Mutable%20List%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在 Kotlin 中更改可变列表中的值 | Baeldung 关于 Kotlin"}],["meta",{"property":"og:description","content":"如何在 Kotlin 中更改可变列表中的值 | Baeldung 关于 Kotlin 1. 引言 在 Kotlin 中，最常见的数据结构之一是可变 List，它允许存储和操作数据。因此，我们经常会遇到需要更改可变列表中值的情况。 在本文中，我们将探讨在 Kotlin 中更改可变列表中值的各种方法。 2. 使用 set() 方法 更改可变列表中元素值的一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T06:32:35.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"Mutable List"}],["meta",{"property":"article:tag","content":"List Manipulation"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T06:32:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在 Kotlin 中更改可变列表中的值 | Baeldung 关于 Kotlin\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T06:32:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在 Kotlin 中更改可变列表中的值 | Baeldung 关于 Kotlin 1. 引言 在 Kotlin 中，最常见的数据结构之一是可变 List，它允许存储和操作数据。因此，我们经常会遇到需要更改可变列表中值的情况。 在本文中，我们将探讨在 Kotlin 中更改可变列表中值的各种方法。 2. 使用 set() 方法 更改可变列表中元素值的一..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用 set() 方法","slug":"_2-使用-set-方法","link":"#_2-使用-set-方法","children":[]},{"level":2,"title":"3. 使用索引访问运算符","slug":"_3-使用索引访问运算符","link":"#_3-使用索引访问运算符","children":[]},{"level":2,"title":"4. 使用 map() 方法","slug":"_4-使用-map-方法","link":"#_4-使用-map-方法","children":[]},{"level":2,"title":"5. 使用 replaceAll() 方法","slug":"_5-使用-replaceall-方法","link":"#_5-使用-replaceall-方法","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721284355000,"updatedTime":1721284355000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.14,"words":1242},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-How to Change a Value in a Mutable List in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"<hr>\\n<h1>如何在 Kotlin 中更改可变列表中的值 | Baeldung 关于 Kotlin</h1>\\n<h2>1. 引言</h2>\\n<p>在 Kotlin 中，最常见的数据结构之一是可变 <em>List</em>，它允许存储和操作数据。因此，我们经常会遇到需要更改可变列表中值的情况。</p>\\n<p>在本文中，我们将探讨在 Kotlin 中更改可变列表中值的各种方法。</p>\\n<h2>2. 使用 <em>set()</em> 方法</h2>\\n<p>更改可变列表中元素值的一种简单方法是使用 <em>set()</em> 方法。<strong>此方法接受两个参数，我们希望更改的元素的索引和我们希望分配给该元素的新值</strong>：</p>","autoDesc":true}');export{k as comp,d as data};
