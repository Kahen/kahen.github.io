import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-C-OIrTa1.js";const p={},e=t(`<h1 id="在二维数组中寻找最小和最大值-baeldung" tabindex="-1"><a class="header-anchor" href="#在二维数组中寻找最小和最大值-baeldung"><span>在二维数组中寻找最小和最大值 | Baeldung</span></a></h1><p>在本教程中，我们将讨论使用Java在二维数组中寻找最小和最大值的两种技术。二维数组是一种像网格一样的元素排列。它是一个数组的数组，其中每个内部数组代表网格中的一行。</p><p>我们首先将检查使用嵌套_for_循环的传统方法。接下来，我们将探索使用_Stream_ API来完成相同的任务。两种方法都有优缺点。最佳选择取决于我们的需求。</p><h2 id="_2-使用嵌套for循环识别极值" tabindex="-1"><a class="header-anchor" href="#_2-使用嵌套for循环识别极值"><span>2. 使用嵌套For循环识别极值</span></a></h2><p>我们将使用的第一个方法是嵌套_for_循环。这种技术提供了一种清晰直观的方法来迭代二维数组中的每个元素。<strong>我们通过迭代数组的每一行和列来实现这一点</strong>。当访问每个元素时，将其与我们迄今为止遇到的当前最小值和最大值进行比较：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenArrayWhenFindMinAndMaxUsingForLoopsThenCorrect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token keyword">int</span> min <span class="token operator">=</span> array<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> max <span class="token operator">=</span> array<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> row <span class="token operator">:</span> array<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> currentValue <span class="token operator">:</span> row<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>currentValue \`<span class="token operator">&lt;</span> min<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                min <span class="token operator">=</span> currentValue<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>currentValue <span class="token operator">&gt;</span>\` max<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                max <span class="token operator">=</span> currentValue<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> min<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">,</span> max<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>外部for循环遍历二维数组的每一行。然后，嵌套的for循环遍历当前行中的每个元素。我们检查当前元素是否小于当前最小值或大于当前最大值，必要时更新这些值。</p><p>尽管简单性使这成为一个可行的选择，但与大型数组的潜在低效率使得考虑替代方法变得值得。</p><h2 id="_3-使用-stream-识别极值" tabindex="-1"><a class="header-anchor" href="#_3-使用-stream-识别极值"><span>3. 使用_Stream_识别极值</span></a></h2><p>Java <em>Stream</em> API提供了一种简洁且声明性的方式来处理数据。<strong>我们可以使用_flatMapToInt()<em>方法将二维数组转换为单个元素的_Stream</em></strong>。这个方法将二维数组转换为统一的单个元素_Stream_，允许我们使用_summaryStatistics()_方法在一行代码中找到最小值和最大值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenArrayWhenFindMinAndMaxUsingStreamThenCorrect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token class-name">IntSummaryStatistics</span> stats <span class="token operator">=</span> <span class="token class-name">Arrays</span>
      <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>array<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">flatMapToInt</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token operator">::</span><span class="token function">stream</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">summaryStatistics</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> stats<span class="token punctuation">.</span><span class="token function">getMin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">,</span> stats<span class="token punctuation">.</span><span class="token function">getMax</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_flatMapToInt()<em>方法将二维数组的嵌套结构展平为单个元素的_Stream</em>。</p><p>从这个统一的所有元素_Stream_中，我们使用_summaryStatistics()_方法。<strong>这个方法终止_Stream_并生成内容的摘要</strong>。这个摘要包括最小值和最大值，还提供了_Stream_中元素的平均值、总和和计数。</p><p>虽然_summaryStatistics()_提供了一种方便的方式来找到最小值和最大值，<em>Stream</em> API还提供了专用的方法_min()<em>和_max()</em>，分别用于找到_Stream_中的最小和最大元素。当我们只需要最小值或最大值而不是其他统计数据时，这种方法是简洁的。</p><h3 id="_3-1-并行处理" tabindex="-1"><a class="header-anchor" href="#_3-1-并行处理"><span>3.1 并行处理</span></a></h3><p><strong>为了提高效率，我们可以使用_Stream_ API进行并行处理</strong>。这涉及到使用多个线程来分配计算工作负载，可能在大型数组中减少处理时间：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenArrayWhenFindMinAndMaxUsingParallelStreamThenCorrect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token class-name">IntSummaryStatistics</span> stats <span class="token operator">=</span> <span class="token class-name">Arrays</span>
      <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>array<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">parallel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">flatMapToInt</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token operator">::</span><span class="token function">stream</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">summaryStatistics</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> stats<span class="token punctuation">.</span><span class="token function">getMin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">,</span> stats<span class="token punctuation">.</span><span class="token function">getMax</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然_Stream_ API的语法对初学者来说可能不那么直观，但它在简洁性和性能方面的好处使其成为一个有价值的工具。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在这篇简短的文章中，我们探讨了在Java中识别二维数组中最小和最大值的两种有效方法。嵌套_for_循环提供了一种简单直观的方法，特别适合在清晰和简单性重要的情境中使用。另一方面，<em>Stream</em> API提供了一种简洁、表达性强且性能优越的方法，非常适合处理大型数组。</p><p>如常，代码可在GitHub上找到。</p>`,21),o=[e];function c(u,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","Finding Minimum and Maximum in a 2D Array.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/Archive/Finding%20Minimum%20and%20Maximum%20in%20a%202D%20Array.html","title":"在二维数组中寻找最小和最大值 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-14T00:00:00.000Z","category":["Java","编程"],"tag":["数组","算法"],"description":"在二维数组中寻找最小和最大值 | Baeldung 在本教程中，我们将讨论使用Java在二维数组中寻找最小和最大值的两种技术。二维数组是一种像网格一样的元素排列。它是一个数组的数组，其中每个内部数组代表网格中的一行。 我们首先将检查使用嵌套_for_循环的传统方法。接下来，我们将探索使用_Stream_ API来完成相同的任务。两种方法都有优缺点。最佳...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Finding%20Minimum%20and%20Maximum%20in%20a%202D%20Array.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在二维数组中寻找最小和最大值 | Baeldung"}],["meta",{"property":"og:description","content":"在二维数组中寻找最小和最大值 | Baeldung 在本教程中，我们将讨论使用Java在二维数组中寻找最小和最大值的两种技术。二维数组是一种像网格一样的元素排列。它是一个数组的数组，其中每个内部数组代表网格中的一行。 我们首先将检查使用嵌套_for_循环的传统方法。接下来，我们将探索使用_Stream_ API来完成相同的任务。两种方法都有优缺点。最佳..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"数组"}],["meta",{"property":"article:tag","content":"算法"}],["meta",{"property":"article:published_time","content":"2024-06-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在二维数组中寻找最小和最大值 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-14T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"2. 使用嵌套For循环识别极值","slug":"_2-使用嵌套for循环识别极值","link":"#_2-使用嵌套for循环识别极值","children":[]},{"level":2,"title":"3. 使用_Stream_识别极值","slug":"_3-使用-stream-识别极值","link":"#_3-使用-stream-识别极值","children":[{"level":3,"title":"3.1 并行处理","slug":"_3-1-并行处理","link":"#_3-1-并行处理","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.3,"words":990},"filePathRelative":"posts/baeldung/Archive/Finding Minimum and Maximum in a 2D Array.md","localizedDate":"2024年6月14日","excerpt":"\\n<p>在本教程中，我们将讨论使用Java在二维数组中寻找最小和最大值的两种技术。二维数组是一种像网格一样的元素排列。它是一个数组的数组，其中每个内部数组代表网格中的一行。</p>\\n<p>我们首先将检查使用嵌套_for_循环的传统方法。接下来，我们将探索使用_Stream_ API来完成相同的任务。两种方法都有优缺点。最佳选择取决于我们的需求。</p>\\n<h2>2. 使用嵌套For循环识别极值</h2>\\n<p>我们将使用的第一个方法是嵌套_for_循环。这种技术提供了一种清晰直观的方法来迭代二维数组中的每个元素。<strong>我们通过迭代数组的每一行和列来实现这一点</strong>。当访问每个元素时，将其与我们迄今为止遇到的当前最小值和最大值进行比较：</p>","autoDesc":true}');export{k as comp,m as data};
