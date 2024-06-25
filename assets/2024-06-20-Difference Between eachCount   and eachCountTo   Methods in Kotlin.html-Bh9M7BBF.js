import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-hBlfnCEU.js";const e={},p=t(`<h1 id="kotlin中eachcount-和eachcountto-方法的区别" tabindex="-1"><a class="header-anchor" href="#kotlin中eachcount-和eachcountto-方法的区别"><span>Kotlin中eachCount()和eachCountTo()方法的区别</span></a></h1><p>Kotlin拥有一个丰富、高效且简洁的集合库。标准库提供了多种有用的方法来轻松处理集合内容。</p><p>在本教程中，我们将查看这两种方法：eachCount()和eachCountTo()，它们帮助执行聚合操作。</p><p><strong>eachCount()方法使我们能够计算元素的出现次数</strong>。此外，它在任何Grouping数据结构中都可用，其中keyOf()函数适用于获取键。它生成一个Map，包含每个组中元素的计数。</p><p>让我们看一个示例代码来实际演示这一点：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> flights <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;EK060&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;EK531&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;LH7&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;LH1030&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;DL47&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;AI120&quot;</span></span><span class="token punctuation">)</span>
<span class="token keyword">val</span> flightCount <span class="token operator">=</span> flights<span class="token punctuation">.</span><span class="token function">groupingBy</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span><span class="token function">take</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">eachCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">val</span> expectedMap <span class="token operator">=</span> <span class="token function">mapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;EK&quot;</span></span> <span class="token keyword">to</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;LH&quot;</span></span> <span class="token keyword">to</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;DL&quot;</span></span> <span class="token keyword">to</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;AI&quot;</span></span> <span class="token keyword">to</span> <span class="token number">1</span><span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedMap<span class="token punctuation">,</span> flightCount<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，我们从一个航班号列表开始。此外，我们想要获取每个航空公司的航班数量。为了实现这一点，我们使用列表上的groupingBy()函数创建一个Grouping实例，并提取航班代码的前两个字母。随后，我们调用eachCount()方法，它创建一个映射，显示每个航空公司的航班数量。</p><p>我们也可以使用groupBy()和mapValues()函数实现相同的功能：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> flights <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;EK060&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;EK531&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;LH7&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;LH1030&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;DL47&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;AI120&quot;</span></span><span class="token punctuation">)</span>
<span class="token keyword">val</span> flightCount <span class="token operator">=</span> flights<span class="token punctuation">.</span><span class="token function">groupBy</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span><span class="token function">take</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">mapValues</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span>value<span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token keyword">val</span> expectedMap <span class="token operator">=</span> <span class="token function">mapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;EK&quot;</span></span> <span class="token keyword">to</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;LH&quot;</span></span> <span class="token keyword">to</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;DL&quot;</span></span> <span class="token keyword">to</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;AI&quot;</span></span> <span class="token keyword">to</span> <span class="token number">1</span><span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedMap<span class="token punctuation">,</span> flightCount<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，这种方法更加冗长，而eachCount()方法则更具可读性。</p><p>这在从集合数据创建频率映射时非常有用。</p><h3 id="eachcountto" tabindex="-1"><a class="header-anchor" href="#eachcountto"><span>eachCountTo()</span></a></h3><p>eachCountTo()函数与eachCount()函数非常相似。当eachCount()生成一个包含集合中元素计数的新不可变映射时，eachCountTo()的用途略有不同。它需要一个可变映射作为参数，并将输入集合的计数与传递的参数结合起来。本质上，<strong>eachCountTo()更新目标可变映射上的计数</strong>，这在我们需要连续累积计数的情况下是一个很好的选择。</p><p>让我们使用eachCountTo()修改之前的例子：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> flights <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;EK060&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;EK531&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;LH7&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;LH1030&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;DL47&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;AI120&quot;</span></span><span class="token punctuation">)</span>
<span class="token keyword">val</span> flightCount <span class="token operator">=</span> flights<span class="token punctuation">.</span><span class="token function">groupingBy</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span><span class="token function">take</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">eachCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toMutableMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">val</span> expectedMap <span class="token operator">=</span> <span class="token function">mutableMapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;EK&quot;</span></span> <span class="token keyword">to</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;LH&quot;</span></span> <span class="token keyword">to</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;DL&quot;</span></span> <span class="token keyword">to</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;AI&quot;</span></span> <span class="token keyword">to</span> <span class="token number">1</span><span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedMap<span class="token punctuation">,</span> flightCount<span class="token punctuation">)</span>

<span class="token keyword">val</span> moreFlights <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;EK061&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;AI435&quot;</span></span><span class="token punctuation">)</span>
moreFlights<span class="token punctuation">.</span><span class="token function">groupingBy</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span><span class="token function">take</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">eachCountTo</span><span class="token punctuation">(</span>flightCount<span class="token punctuation">)</span>
<span class="token keyword">val</span> expectedMapAfterMoreFlights <span class="token operator">=</span> <span class="token function">mutableMapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;EK&quot;</span></span> <span class="token keyword">to</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;LH&quot;</span></span> <span class="token keyword">to</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;DL&quot;</span></span> <span class="token keyword">to</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;AI&quot;</span></span> <span class="token keyword">to</span> <span class="token number">2</span><span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedMapAfterMoreFlights<span class="token punctuation">,</span> flightCount<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，示例的初始部分与之前的情况类似，除了转换为可变映射。随后，我们使用这个可变映射并将其作为参数传递给eachCountTo()，它有效地更新了映射内的计数。</p><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>在本文中，我们探讨了Kotlin标准库中的两个有用函数：eachCount()和eachCountTo()。这些函数简化了计数操作，提供了增强的可读性和效率。</p><p>如常，本教程中使用的示例代码可在GitHub上获得。</p><p>OK</p>`,20),o=[p];function l(c,i){return a(),s("div",null,o)}const r=n(e,[["render",l],["__file","2024-06-20-Difference Between eachCount   and eachCountTo   Methods in Kotlin.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Difference%20Between%20eachCount%20%20%20and%20eachCountTo%20%20%20Methods%20in%20Kotlin.html","title":"Kotlin中eachCount()和eachCountTo()方法的区别","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Kotlin","Programming"],"tag":["Kotlin","eachCount","eachCountTo"],"head":[["meta",{"name":"keywords","content":"Kotlin, eachCount, eachCountTo, collection, aggregation, tutorial"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Difference%20Between%20eachCount%20%20%20and%20eachCountTo%20%20%20Methods%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中eachCount()和eachCountTo()方法的区别"}],["meta",{"property":"og:description","content":"Kotlin中eachCount()和eachCountTo()方法的区别 Kotlin拥有一个丰富、高效且简洁的集合库。标准库提供了多种有用的方法来轻松处理集合内容。 在本教程中，我们将查看这两种方法：eachCount()和eachCountTo()，它们帮助执行聚合操作。 eachCount()方法使我们能够计算元素的出现次数。此外，它在任何Gr..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"eachCount"}],["meta",{"property":"article:tag","content":"eachCountTo"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中eachCount()和eachCountTo()方法的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中eachCount()和eachCountTo()方法的区别 Kotlin拥有一个丰富、高效且简洁的集合库。标准库提供了多种有用的方法来轻松处理集合内容。 在本教程中，我们将查看这两种方法：eachCount()和eachCountTo()，它们帮助执行聚合操作。 eachCount()方法使我们能够计算元素的出现次数。此外，它在任何Gr..."},"headers":[{"level":3,"title":"eachCountTo()","slug":"eachcountto","link":"#eachcountto","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.43,"words":730},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Difference Between eachCount   and eachCountTo   Methods in Kotlin.md","localizedDate":"2024年6月21日","excerpt":"\\n<p>Kotlin拥有一个丰富、高效且简洁的集合库。标准库提供了多种有用的方法来轻松处理集合内容。</p>\\n<p>在本教程中，我们将查看这两种方法：eachCount()和eachCountTo()，它们帮助执行聚合操作。</p>\\n<p><strong>eachCount()方法使我们能够计算元素的出现次数</strong>。此外，它在任何Grouping数据结构中都可用，其中keyOf()函数适用于获取键。它生成一个Map，包含每个组中元素的计数。</p>\\n<p>让我们看一个示例代码来实际演示这一点：</p>\\n<div class=\\"language-kotlin\\" data-ext=\\"kt\\" data-title=\\"kt\\"><pre class=\\"language-kotlin\\"><code><span class=\\"token keyword\\">val</span> flights <span class=\\"token operator\\">=</span> <span class=\\"token function\\">listOf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"EK060\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"EK531\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"LH7\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"LH1030\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"DL47\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"AI120\\"</span></span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token keyword\\">val</span> flightCount <span class=\\"token operator\\">=</span> flights<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">groupingBy</span> <span class=\\"token punctuation\\">{</span> it<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">take</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">2</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">eachCount</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token keyword\\">val</span> expectedMap <span class=\\"token operator\\">=</span> <span class=\\"token function\\">mapOf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"EK\\"</span></span> <span class=\\"token keyword\\">to</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"LH\\"</span></span> <span class=\\"token keyword\\">to</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"DL\\"</span></span> <span class=\\"token keyword\\">to</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"AI\\"</span></span> <span class=\\"token keyword\\">to</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span>expectedMap<span class=\\"token punctuation\\">,</span> flightCount<span class=\\"token punctuation\\">)</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,g as data};
