import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-yRPSFQJx.js";const e={},p=t(`<h1 id="kotlin中合并两个map的指南" tabindex="-1"><a class="header-anchor" href="#kotlin中合并两个map的指南"><span>Kotlin中合并两个Map的指南</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>_映射_是在大多数Kotlin应用程序中常用的数据结构。<strong>通过合并两个映射，我们可以将两个映射中的键值对组合到一个单一的映射中</strong>。</p><p>在本教程中，我们将探索在Kotlin中合并两个映射的多种方法。此外，我们还将看到每种方法如何处理冲突元素的场景，其中默认行为是优先考虑来自第二个映射的元素。</p><h2 id="_2-使用加号-运算符" tabindex="-1"><a class="header-anchor" href="#_2-使用加号-运算符"><span>2. 使用加号(+)运算符</span></a></h2><p>首先，让我们初始化两个映射，<em>map1_和_map2</em>，它们之间有字符串和整数值的映射：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> map1 <span class="token operator">=</span> <span class="token function">mapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span> <span class="token keyword">to</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span> <span class="token keyword">to</span> <span class="token number">2</span><span class="token punctuation">)</span>
<span class="token keyword">val</span> map2 <span class="token operator">=</span> <span class="token function">mapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span> <span class="token keyword">to</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span> <span class="token keyword">to</span> <span class="token number">4</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们必须注意，_map1_和_map2_是不可变的，因为我们使用_mapOf()_来初始化它们。</p><p>接下来，让我们<strong>使用+运算符将map1和map2合并到一个新的映射，mergedMap</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> mergedMap <span class="token operator">=</span> map1 <span class="token operator">+</span> map2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，让我们通过合并操作验证我们是否得到了正确的结果：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token function">mapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span> <span class="token keyword">to</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span> <span class="token keyword">to</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span> <span class="token keyword">to</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span> mergedMap<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>太好了！我们得到了正确的结果。</p><h2 id="_3-使用加等于-运算符" tabindex="-1"><a class="header-anchor" href="#_3-使用加等于-运算符"><span>3. 使用加等于(+=)运算符</span></a></h2><p>在具有可变映射的场景中，我们可以使用现有的映射来保存合并两个映射后的结果。</p><p>首先，让我们定义一个可变的映射_map1_和一个不可变的映射_map2_：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> map1 <span class="token operator">=</span> <span class="token function">mutableMapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span> <span class="token keyword">to</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span> <span class="token keyword">to</span> <span class="token number">2</span><span class="token punctuation">)</span>
<span class="token keyword">val</span> map2 <span class="token operator">=</span> <span class="token function">mapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span> <span class="token keyword">to</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span> <span class="token keyword">to</span> <span class="token number">4</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>重要的是，我们使用_mutableMapOf()_来初始化可变映射。</p><p>现在，我们可以<strong>使用+=运算符将两个映射中的键值对合并到可变映射_map1_中</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>map1 <span class="token operator">+=</span> map2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这种情况下，我们通过使用现有的映射更有效地利用了存储。</p><p>像之前一样，我们应该验证_map1_中的合并结果：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token function">mapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span> <span class="token keyword">to</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span> <span class="token keyword">to</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span> <span class="token keyword">to</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span> map1<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>太棒了！我们这次也做对了。</p><h2 id="_4-使用-putall-函数" tabindex="-1"><a class="header-anchor" href="#_4-使用-putall-函数"><span>4. 使用_putAll()_函数</span></a></h2><p>另外，我们可以使用_putAll()_函数将_map2_中的所有键值对放入可变映射_map1_中：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>map1<span class="token punctuation">.</span><span class="token function">putAll</span><span class="token punctuation">(</span>map2<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>进一步，让我们验证合并后的映射_map1_的内容：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token function">mapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span> <span class="token keyword">to</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span> <span class="token keyword">to</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span> <span class="token keyword">to</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span> map1<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们得到了预期的结果。</p><h2 id="_5-使用-associatewith-函数" tabindex="-1"><a class="header-anchor" href="#_5-使用-associatewith-函数"><span>5. 使用_associateWith()_函数</span></a></h2><p>使用_putAll()_函数，我们得到了默认行为，即按原样合并键值对。然而，我们可以使用_associateWith()_函数定义合并的自定义行为。</p><p>首先，让我们定义两个不可变的映射_map1_和_map2_：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> map1 <span class="token operator">=</span> <span class="token function">mapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span> <span class="token keyword">to</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span> <span class="token keyword">to</span> <span class="token number">2</span><span class="token punctuation">)</span>
<span class="token keyword">val</span> map2 <span class="token operator">=</span> <span class="token function">mapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span> <span class="token keyword">to</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span> <span class="token keyword">to</span> <span class="token number">4</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们<strong>使用associateWith()函数将每个键映射为来自map1或map2的值</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> mergedMap <span class="token operator">=</span> <span class="token punctuation">(</span>map1<span class="token punctuation">.</span>keys <span class="token operator">+</span> map2<span class="token punctuation">.</span>keys<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">associateWith</span> <span class="token punctuation">{</span> key <span class="token operator">-&gt;</span>
  key <span class="token operator">-&gt;</span> map2<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">?:</span> map1<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token operator">!!</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们优先考虑_map2_，如果_key_在_map2_中不存在，则使用_map1_。进一步，<strong>我们使用!!运算符来声明，如果_key_在_map2_中缺失，则我们确信它在_map1_中存在</strong>。</p><p>最后，我们应该验证_mergedMap_是否包含正确的键值对：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token function">mapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span> <span class="token keyword">to</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span> <span class="token keyword">to</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span> <span class="token keyword">to</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span> mergedMap<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>看来我们这次也做得很好。</p><h2 id="_6-使用java-map-中的-merge" tabindex="-1"><a class="header-anchor" href="#_6-使用java-map-中的-merge"><span>6. 使用Java <em>Map</em> 中的 <em>merge()</em></span></a></h2><p>Kotlin与Java完全兼容。因此，我们可以直接调用Java类中的方法。</p><p>首先，让我们定义一个可变的映射_map1_和一个不可变的映射_map2_，并提供一些示例键值对：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> map1 <span class="token operator">=</span> <span class="token function">mutableMapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span> <span class="token keyword">to</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span> <span class="token keyword">to</span> <span class="token number">2</span><span class="token punctuation">)</span>
<span class="token keyword">val</span> map2 <span class="token operator">=</span> <span class="token function">mapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span> <span class="token keyword">to</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span> <span class="token keyword">to</span> <span class="token number">4</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们遍历不可变映射_map2_中的键值对，并使用_merge()_将它们合并到_map1_中：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>map2<span class="token punctuation">.</span><span class="token function">forEach</span> <span class="token punctuation">{</span> <span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token operator">-&gt;</span>
  map1<span class="token punctuation">.</span><span class="token function">merge</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span> oldVal<span class="token punctuation">,</span> newVal <span class="token operator">-&gt;</span> newVal <span class="token operator">*</span> oldVal <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意的是，<strong>oldVal和newVal分别对应来自map1和map2的值</strong>。此外，_merge()_方法比Map中的_put()_方法的优点是提供重映射函数的灵活性。在这种情况下，对于每个冲突的元素，我们将原始映射中的值相乘以获得合并映射的值。</p><p>最后，我们应通过检查_map1_中的键值对来验证我们的方法：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token function">mapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span> <span class="token keyword">to</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;b&quot;</span></span> <span class="token keyword">to</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span> <span class="token keyword">to</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span> map1<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正如预期的那样，所有来自_map2_和_map1_的键值对现在都在_map1_中。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本教程中，我们<strong>探索了在Kotlin中合并两个映射的不同方式</strong>。此外，我们学习了如何解决用例，使用如+和+=等运算符以及如putAll()和associateWith()等函数。</p><p>最后，我们还利用了Java Map接口中_merge()_方法的互操作性。</p><p>一如既往，本文的代码可在GitHub上找到。</p>`,54),o=[p];function l(i,c){return s(),a("div",null,o)}const k=n(e,[["render",l],["__file","2024-07-09-Guide to Merging Two Maps in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Guide%20to%20Merging%20Two%20Maps%20in%20Kotlin.html","title":"Kotlin中合并两个Map的指南","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Maps"],"tag":["Kotlin","Map Merging"],"head":[["meta",{"name":"keywords","content":"Kotlin, Map, Merging, Tutorial"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Guide%20to%20Merging%20Two%20Maps%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中合并两个Map的指南"}],["meta",{"property":"og:description","content":"Kotlin中合并两个Map的指南 1. 概述 _映射_是在大多数Kotlin应用程序中常用的数据结构。通过合并两个映射，我们可以将两个映射中的键值对组合到一个单一的映射中。 在本教程中，我们将探索在Kotlin中合并两个映射的多种方法。此外，我们还将看到每种方法如何处理冲突元素的场景，其中默认行为是优先考虑来自第二个映射的元素。 2. 使用加号(+)..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T11:34:37.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"Map Merging"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T11:34:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中合并两个Map的指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T11:34:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中合并两个Map的指南 1. 概述 _映射_是在大多数Kotlin应用程序中常用的数据结构。通过合并两个映射，我们可以将两个映射中的键值对组合到一个单一的映射中。 在本教程中，我们将探索在Kotlin中合并两个映射的多种方法。此外，我们还将看到每种方法如何处理冲突元素的场景，其中默认行为是优先考虑来自第二个映射的元素。 2. 使用加号(+)..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用加号(+)运算符","slug":"_2-使用加号-运算符","link":"#_2-使用加号-运算符","children":[]},{"level":2,"title":"3. 使用加等于(+=)运算符","slug":"_3-使用加等于-运算符","link":"#_3-使用加等于-运算符","children":[]},{"level":2,"title":"4. 使用_putAll()_函数","slug":"_4-使用-putall-函数","link":"#_4-使用-putall-函数","children":[]},{"level":2,"title":"5. 使用_associateWith()_函数","slug":"_5-使用-associatewith-函数","link":"#_5-使用-associatewith-函数","children":[]},{"level":2,"title":"6. 使用Java Map 中的 merge()","slug":"_6-使用java-map-中的-merge","link":"#_6-使用java-map-中的-merge","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720524877000,"updatedTime":1720524877000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.99,"words":1198},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Guide to Merging Two Maps in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>_映射_是在大多数Kotlin应用程序中常用的数据结构。<strong>通过合并两个映射，我们可以将两个映射中的键值对组合到一个单一的映射中</strong>。</p>\\n<p>在本教程中，我们将探索在Kotlin中合并两个映射的多种方法。此外，我们还将看到每种方法如何处理冲突元素的场景，其中默认行为是优先考虑来自第二个映射的元素。</p>\\n<h2>2. 使用加号(+)运算符</h2>\\n<p>首先，让我们初始化两个映射，<em>map1_和_map2</em>，它们之间有字符串和整数值的映射：</p>\\n<div class=\\"language-kotlin\\" data-ext=\\"kt\\" data-title=\\"kt\\"><pre class=\\"language-kotlin\\"><code><span class=\\"token keyword\\">val</span> map1 <span class=\\"token operator\\">=</span> <span class=\\"token function\\">mapOf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"a\\"</span></span> <span class=\\"token keyword\\">to</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"b\\"</span></span> <span class=\\"token keyword\\">to</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token keyword\\">val</span> map2 <span class=\\"token operator\\">=</span> <span class=\\"token function\\">mapOf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"b\\"</span></span> <span class=\\"token keyword\\">to</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"c\\"</span></span> <span class=\\"token keyword\\">to</span> <span class=\\"token number\\">4</span><span class=\\"token punctuation\\">)</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
