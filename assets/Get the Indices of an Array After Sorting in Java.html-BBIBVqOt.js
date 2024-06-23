import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-B5KuRspw.js";const e={},p=t(`<h1 id="java中数组排序后获取索引的方法-baeldung" tabindex="-1"><a class="header-anchor" href="#java中数组排序后获取索引的方法-baeldung"><span>Java中数组排序后获取索引的方法 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在Java中对数组进行排序是一项常见操作，但有时我们还需要知道排序后元素的原始索引。这些信息对于某些算法和应用至关重要。</p><p><strong>在本教程中，我们将展示在Java中实现这一点的不同方法。</strong></p><h2 id="_2-问题描述" tabindex="-1"><a class="header-anchor" href="#_2-问题描述"><span>2. 问题描述</span></a></h2><p>对数组进行排序是一项基本操作，但在某些场景中，我们不仅需要按顺序排列值；我们还需要保留这些值的原始位置。当我们想要知道排序后元素的顺序如何变化时，这一点尤其重要。让我们考虑以下数组：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int[] array = {40, 10, 20, 30};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这个数组排序之前，元素的索引（位置）是：</p><ul><li>索引0: 40</li><li>索引1: 10</li><li>索引2: 20</li><li>索引3: 30</li></ul><p>对这个数组进行排序后，我们得到了元素的新索引：</p><ul><li>索引0: 10（原始索引1）</li><li>索引1: 20（原始索引2）</li><li>索引2: 30（原始索引3）</li><li>索引3: 40（原始索引0）</li></ul><p><strong>我们的目标是在升序排序这个数组的同时，也跟踪索引如何根据排序后的值变化。</strong></p><h2 id="_3-使用带有索引的自定义比较器" tabindex="-1"><a class="header-anchor" href="#_3-使用带有索引的自定义比较器"><span>3. 使用带有索引的自定义比较器</span></a></h2><p>获取排序后索引的一种方法是使用一个自定义比较器，该比较器在维护数组元素的同时保留索引。此外，这种方法允许我们根据元素值对数组进行排序，同时跟踪它们的原始位置。</p><p>现在，让我们通过一些代码来演示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">40</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenArray_whenUsingCustomComparator_thenSortedIndicesMatchExpected</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Integer</span><span class="token punctuation">[</span><span class="token punctuation">]</span> indices <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Integer</span><span class="token punctuation">[</span>array<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> array<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        indices<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>indices<span class="token punctuation">,</span> <span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">comparingInt</span><span class="token punctuation">(</span>i <span class="token operator">-&gt;</span>\` array<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Integer</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">,</span> indices<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们初始化一个_indices_数组来保存原始数组_array_的索引。_indices_数组的每个元素代表_array_中相应元素的索引。</p><p><strong>通过使用自定义比较器与_Arrays.sort()_方法，我们指定_indices_数组应该根据_array_中的值进行排序。此外，_Comparator.comparingInt(i -&gt; array[i])_根据_indices_数组中索引处_array_的值来比较元素。</strong></p><p>排序后，我们使用_assertArrayEquals()<em>来验证排序后的_indices_数组是否符合预期的顺序</em>[1, 2, 3, 0]_。</p><h2 id="_4-使用java-8-stream-api" tabindex="-1"><a class="header-anchor" href="#_4-使用java-8-stream-api"><span>4. 使用Java 8 <em>Stream</em> API</span></a></h2><p>Java 8的一个重大新特性是引入了流功能——<em>java.util.stream</em>——它包含了处理元素序列的类。</p><p>以下是我们如何利用Java 8 <em>Stream</em> API来获取并根据原始数组中的值排序索引：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenArray_whenUsingStreamAPI_thenSortedIndicesMatchExpected</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\` indices <span class="token operator">=</span> <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> array<span class="token punctuation">.</span>length<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">boxed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">sorted</span><span class="token punctuation">(</span><span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">comparingInt</span><span class="token punctuation">(</span>i <span class="token operator">-&gt;</span> array<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertIterableEquals</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> indices<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用_IntStream.range()_方法生成从_0_到_array.length – 1_的整数索引流。然后，使用_boxed()<em>方法将此流转换为_Stream<code>&lt;Integer&gt;</code></em>。</p><p>接着，我们使用_sorted()_操作，使用由_Comparator.comparingInt(i -&gt; array[i])_定义的比较器。这里，流中的每个索引_i_映射到_array_中的相应值，比较器基于这些值。最后，我们使用_collect(Collectors.toList())_方法将排序后的_indices_收集到_List<code>&lt;Integer&gt;</code>_中。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>总之，我们探索了Java中在排序数组的同时保留原始元素索引的有效方法。这些信息对于需要维护元素位置关系的算法和应用至关重要。</p><p>像往常一样，相关的源代码可以在GitHub上找到。</p>`,28),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","Get the Indices of an Array After Sorting in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/Get%20the%20Indices%20of%20an%20Array%20After%20Sorting%20in%20Java.html","title":"Java中数组排序后获取索引的方法 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-14T00:00:00.000Z","category":["Java","编程"],"tag":["数组排序","索引"],"description":"Java中数组排序后获取索引的方法 | Baeldung 1. 引言 在Java中对数组进行排序是一项常见操作，但有时我们还需要知道排序后元素的原始索引。这些信息对于某些算法和应用至关重要。 在本教程中，我们将展示在Java中实现这一点的不同方法。 2. 问题描述 对数组进行排序是一项基本操作，但在某些场景中，我们不仅需要按顺序排列值；我们还需要保留这...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Get%20the%20Indices%20of%20an%20Array%20After%20Sorting%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中数组排序后获取索引的方法 | Baeldung"}],["meta",{"property":"og:description","content":"Java中数组排序后获取索引的方法 | Baeldung 1. 引言 在Java中对数组进行排序是一项常见操作，但有时我们还需要知道排序后元素的原始索引。这些信息对于某些算法和应用至关重要。 在本教程中，我们将展示在Java中实现这一点的不同方法。 2. 问题描述 对数组进行排序是一项基本操作，但在某些场景中，我们不仅需要按顺序排列值；我们还需要保留这..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"数组排序"}],["meta",{"property":"article:tag","content":"索引"}],["meta",{"property":"article:published_time","content":"2024-06-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中数组排序后获取索引的方法 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-14T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 问题描述","slug":"_2-问题描述","link":"#_2-问题描述","children":[]},{"level":2,"title":"3. 使用带有索引的自定义比较器","slug":"_3-使用带有索引的自定义比较器","link":"#_3-使用带有索引的自定义比较器","children":[]},{"level":2,"title":"4. 使用Java 8 Stream API","slug":"_4-使用java-8-stream-api","link":"#_4-使用java-8-stream-api","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.98,"words":893},"filePathRelative":"posts/baeldung/Archive/Get the Indices of an Array After Sorting in Java.md","localizedDate":"2024年6月14日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在Java中对数组进行排序是一项常见操作，但有时我们还需要知道排序后元素的原始索引。这些信息对于某些算法和应用至关重要。</p>\\n<p><strong>在本教程中，我们将展示在Java中实现这一点的不同方法。</strong></p>\\n<h2>2. 问题描述</h2>\\n<p>对数组进行排序是一项基本操作，但在某些场景中，我们不仅需要按顺序排列值；我们还需要保留这些值的原始位置。当我们想要知道排序后元素的顺序如何变化时，这一点尤其重要。让我们考虑以下数组：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>int[] array = {40, 10, 20, 30};\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
