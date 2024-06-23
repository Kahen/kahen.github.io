import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DcMfr-lX.js";const e={},p=t(`<h1 id="如何检查完美数" tabindex="-1"><a class="header-anchor" href="#如何检查完美数"><span>如何检查完美数</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p><strong>完美数是一种特殊的正整数，它具有一个独特的属性，即它等于其所有真因子（不包括它本身）的和。</strong></p><p>完美数在整数领域中的稀有性是其最引人入胜的特点之一。事实上，在历史上，只确定了少数几个完美数。人类已知的前四个完美数是6、28、496和8128。</p><p>在本文中，我们将深入探讨完美数的概念，并探索各种方法来检查给定的数字是否属于这一有趣的类别。</p><h2 id="_2-理解完美数" tabindex="-1"><a class="header-anchor" href="#_2-理解完美数"><span>2. 理解完美数</span></a></h2><p>让我们通过前几个例子来理解完美数的概念。例如，数字6有真因子1、2和3。将这些因子相加得到1 + 2 + 3 = 6，使6成为一个完美数。同样，数字28有真因子1、2、4、7和14，它们的和等于1 + 2 + 4 + 7 + 14 = 28。因此，28是另一个完美数。</p><p>我们可以使用不同的方法来确定一个给定的数字是否完美。让我们探索三种常见的方法。</p><h2 id="_3-暴力方法" tabindex="-1"><a class="header-anchor" href="#_3-暴力方法"><span>3. 暴力方法</span></a></h2><p>检查完美数的一种方法是通过迭代数字的所有可能的因子并将它们相加。如果总和等于数字本身，我们就得到了一个完美数。**这种方法可以使用一个循环来实现，该循环从1遍历到n/2，其中n是给定的数字。**对于每个找到的因子，我们累积总和。最后，我们将总和与原始数字进行比较以确定完美性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isPerfectBruteForce</span><span class="token punctuation">(</span><span class="token keyword">int</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;=</span> number <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>number <span class="token operator">%</span> i <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            sum <span class="token operator">+=</span> i<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> sum <span class="token operator">==</span> number<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>迭代到n/2的选择是基于这样的观察：一个数字n的最大可能的真因子（不包括n本身）是n/2。大于n/2的因子会导致商小于2，这不被考虑为真因子。这种方法确保我们有效地覆盖了所有必要的因子。</p><p>暴力方法从1到n/2迭代所有可能的因子并计算总和。输入数字的时间复杂度是线性的。</p><h2 id="_4-基于流的方法" tabindex="-1"><a class="header-anchor" href="#_4-基于流的方法"><span>4. 基于流的方法</span></a></h2><p>我们还可以使用Java Streams来检查完美数。**在这种方法中，我们从2到正在测试的数字的平方根（向下取整）生成一个因子的流，过滤出能被数字整除的因子，然后通过添加每个因子及其相应的配对（number/test）来计算总和。**最后，我们将总和与原始数字进行比较以确定完美性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isPerfectStream</span><span class="token punctuation">(</span><span class="token keyword">int</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">rangeClosed</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">sqrt</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>test <span class="token operator">-&gt;</span>\` number <span class="token operator">%</span> test <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>s<span class="token punctuation">,</span> test<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> s <span class="token operator">+</span> test <span class="token operator">+</span> <span class="token punctuation">(</span>number <span class="token operator">/</span> test<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> sum <span class="token operator">==</span> number<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在寻找数字的因子时，我们可以在到达数字的平方根时停止迭代。这是因为因子总是成对出现。例如，如果a是数字的因子，那么b = number/a也是因子。如果a小于或等于数字的平方根，那么b将大于或等于数字的平方根。因此，通过找到到平方根的因子，我们已经覆盖了所有可能的因子。</p><p>基于流的方法使用Java Streams过滤并有效求和到数字的平方根的因子。通过仅迭代到平方根，我们可以减少寻找因子所需的工作量并提高效率。这种优化方法与之前的尝试相比显著减少了执行时间，成为检查完美数的更有效解决方案。</p><h2 id="_5-欧几里得-欧拉定理" tabindex="-1"><a class="header-anchor" href="#_5-欧几里得-欧拉定理"><span>5. 欧几里得-欧拉定理</span></a></h2><p>基于欧几里得-欧拉定理的更有效方法允许我们在不迭代所有可能的因子的情况下识别完美数。根据该定理，如果2^(p-1) * (2^p – 1)是一个质数，那么(2^p – 1) * 2^(p-1)就是一个完美数。这里，p必须是一个质数。通过利用该定理，我们可以专注于根据公式计算完美数。这种方法允许我们在不需要迭代所有可能的因子或明确找到质数的情况下高效地识别完美数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isPerfectEuclidEuler</span><span class="token punctuation">(</span><span class="token keyword">int</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> p <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> perfectNumber <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> p <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> p<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>perfectNumber <span class="token operator">&lt;=</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>perfectNumber <span class="token operator">==</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        p<span class="token operator">++</span><span class="token punctuation">;</span>
        perfectNumber <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> p <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> p<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>欧几里得-欧拉定理方法利用质数并根据定理计算完美数。欧几里得-欧拉方法的时间复杂度优于暴力和基于流的方法，因为它只需要检查到log n的数字。</p><p>尽管时间复杂度优于暴力和基于流的方法，但我们提供的欧几里得-欧拉方法的执行时间可能不符合预期。**这种次优性能的一个原因是使用了Math.pow()，它以其慢速而闻名。**考虑到我们只计算2的幂，我们可以通过使用二进制位移操作而不是Math.pow()来提高效率：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isPerfectEuclidEulerUsingShift</span><span class="token punctuation">(</span><span class="token keyword">int</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> p <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> perfectNumber <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">&lt;&lt;</span> <span class="token punctuation">(</span>p <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">&lt;&lt;</span> p<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>perfectNumber <span class="token operator">&lt;=</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>perfectNumber <span class="token operator">==</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        p<span class="token operator">++</span><span class="token punctuation">;</span>
        perfectNumber <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">&lt;&lt;</span> <span class="token punctuation">(</span>p <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">&lt;&lt;</span> p<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过用二进制位移操作(2 &lt;&lt; p)替换Math.pow()计算2的幂，我们可以进行更快和更有效的计算。这种优化显著提高了欧几里得-欧拉方法的性能。</p><h2 id="_6-分析和比较" tabindex="-1"><a class="header-anchor" href="#_6-分析和比较"><span>6. 分析和比较</span></a></h2><p>让我们分析并比较我们提供的三种不同的检查完美数的方法。</p><p>暴力方法虽然简单，但迭代了所有可能的因子并将总和与原始数字进行比较。它适用于较小的数字，但随着输入大小的增加，效率逐渐降低。该方法的时间复杂度与输入数字成线性关系，导致较大数字的执行时间变慢。</p><p>基于流的方法通过使用Java Streams过滤和有效求和因子，提供了更简洁和表达性的实现。通过将迭代限制在数字的平方根，它减少了不必要的计算和迭代，提高了效率并减少了执行时间。基于流的方法在简单性和效率之间取得了平衡。</p><p>**欧几里得-欧拉定理方法在三种方法中提供了最高效的方法。**利用定理的公式直接计算完美数，无需检查所有可能的因子。这种方法显著减少了计算工作量，并实现了显著的效率。它特别适用于大数字，因为它避免了迭代众多的因子。</p><p>为了比较这些方法的性能，我们使用JMH（Java程序的常见微基准测试工具）进行了基准测试。基准测试是使用已知的完美数33550336进行的。基准测试的结果是：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Benchmark                                               Mode  Cnt         Score         Error  Units
PerfectNumberBenchmark.bruteForceBenchmark             thrpt    5        55.070 ±       2.674  ops/s
PerfectNumberBenchmark.streamBenchmark                 thrpt    5     96114.246 ±    3666.451  ops/s
PerfectNumberBenchmark.euclidEulerBenchmark            thrpt    5    144639.676 ±    3409.540  ops/s
PerfectNumberBenchmark.euclidEulerUsingShiftBenchmark  thrpt    5  99191865.954 ± 5924410.475  ops/s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>“Cnt”列表示每个基准模式执行的迭代次数。“Score”列表示每个基准的吞吐量或每秒完成的操作数。它指示一秒钟内特定操作或算法执行了多少次。“Error”列表示与基准结果相关的统计误差。它提供了测量值的变异性或不确定性的估计。较小的误差表示结果更一致和可靠。</p><p>欧几里得-欧拉方法作为最高效的方法脱颖而出，其次是基于流的方法。暴力方法虽然简单，但效率较低，更适合较小的数字。在处理较大的数字时，推荐使用欧几里得-欧拉或基于流的方法以获得最佳性能。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们探索了完美数的迷人概念，并检查了各种方法来确定给定的数字是否属于这一类别。</p><p>如常，源代码可在GitHub上获得。</p><p>文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,38),o=[p];function c(l,i){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-19-How to Check Number Perfection.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-19-How%20to%20Check%20Number%20Perfection.html","title":"如何检查完美数","lang":"zh-CN","frontmatter":{"date":"2024-06-19T00:00:00.000Z","category":["Java","算法"],"tag":["完美数","算法"],"head":[["meta",{"name":"keywords","content":"Java, 算法, 完美数, 程序设计"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-19-How%20to%20Check%20Number%20Perfection.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何检查完美数"}],["meta",{"property":"og:description","content":"如何检查完美数 1. 引言 完美数是一种特殊的正整数，它具有一个独特的属性，即它等于其所有真因子（不包括它本身）的和。 完美数在整数领域中的稀有性是其最引人入胜的特点之一。事实上，在历史上，只确定了少数几个完美数。人类已知的前四个完美数是6、28、496和8128。 在本文中，我们将深入探讨完美数的概念，并探索各种方法来检查给定的数字是否属于这一有趣的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"完美数"}],["meta",{"property":"article:tag","content":"算法"}],["meta",{"property":"article:published_time","content":"2024-06-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何检查完美数\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何检查完美数 1. 引言 完美数是一种特殊的正整数，它具有一个独特的属性，即它等于其所有真因子（不包括它本身）的和。 完美数在整数领域中的稀有性是其最引人入胜的特点之一。事实上，在历史上，只确定了少数几个完美数。人类已知的前四个完美数是6、28、496和8128。 在本文中，我们将深入探讨完美数的概念，并探索各种方法来检查给定的数字是否属于这一有趣的..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 理解完美数","slug":"_2-理解完美数","link":"#_2-理解完美数","children":[]},{"level":2,"title":"3. 暴力方法","slug":"_3-暴力方法","link":"#_3-暴力方法","children":[]},{"level":2,"title":"4. 基于流的方法","slug":"_4-基于流的方法","link":"#_4-基于流的方法","children":[]},{"level":2,"title":"5. 欧几里得-欧拉定理","slug":"_5-欧几里得-欧拉定理","link":"#_5-欧几里得-欧拉定理","children":[]},{"level":2,"title":"6. 分析和比较","slug":"_6-分析和比较","link":"#_6-分析和比较","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":6.92,"words":2076},"filePathRelative":"posts/baeldung/Archive/2024-06-19-How to Check Number Perfection.md","localizedDate":"2024年6月19日","excerpt":"\\n<h2>1. 引言</h2>\\n<p><strong>完美数是一种特殊的正整数，它具有一个独特的属性，即它等于其所有真因子（不包括它本身）的和。</strong></p>\\n<p>完美数在整数领域中的稀有性是其最引人入胜的特点之一。事实上，在历史上，只确定了少数几个完美数。人类已知的前四个完美数是6、28、496和8128。</p>\\n<p>在本文中，我们将深入探讨完美数的概念，并探索各种方法来检查给定的数字是否属于这一有趣的类别。</p>\\n<h2>2. 理解完美数</h2>\\n<p>让我们通过前几个例子来理解完美数的概念。例如，数字6有真因子1、2和3。将这些因子相加得到1 + 2 + 3 = 6，使6成为一个完美数。同样，数字28有真因子1、2、4、7和14，它们的和等于1 + 2 + 4 + 7 + 14 = 28。因此，28是另一个完美数。</p>","autoDesc":true}');export{k as comp,d as data};
