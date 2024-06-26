import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CTxWUlow.js";const p={},e=t(`<h1 id="java中计算百分位数" tabindex="-1"><a class="header-anchor" href="#java中计算百分位数"><span>Java中计算百分位数</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在Java中分析数据时，计算百位数是理解数值数据集的统计分布和特征的基本任务。</p><p>在本教程中，我们将逐步介绍Java中计算百分位数的过程，并提供代码示例和解释。</p><h2 id="_2-理解百分位数" tabindex="-1"><a class="header-anchor" href="#_2-理解百分位数"><span>2. 理解百分位数</span></a></h2><p>在讨论实现细节之前，我们首先了解百分位数是什么以及它们在数据分析中的常见用法。</p><p><strong>百分位数是统计学中用来表示低于某个给定百分比的观察值的值</strong>。例如，第50百分位数（也称为中位数）表示有50%的数据点低于此值。</p><p>值得注意的是，<strong>百分位数以与输入数据集相同的单位表示，而不是以百分比</strong>。例如，如果数据集指的是月薪，相应的百分位数将以美元、欧元或其他货币表示。</p><p>接下来，让我们看几个具体的例子：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>输入：一个未排序的1-100的数字数据集
-&gt; 排序后的数据集：[1, 2, ... 49, (50), 51, 52, ... 100]
-&gt; 第50百分位数：50

输入：[-1, 200, 30, 42, -5, 7, 8, 92]
-&gt; 排序后的数据集：[-2, -1, 7, (8), 30, 42, 92, 200]
-&gt; 第50百分位数：8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>百分位数通常用于理解数据分布，识别异常值和比较不同的数据集。它们在处理大型数据集或简洁地总结数据集特征时特别有用。</p><p>接下来，让我们看看如何在Java中计算百分位数。</p><h2 id="_3-从《集合》计算百分位数" tabindex="-1"><a class="header-anchor" href="#_3-从《集合》计算百分位数"><span>3. 从《集合》计算百分位数</span></a></h2><p>既然我们了解了百分位数是什么，让我们总结一下实现百分位数计算的逐步指南：</p><ul><li>将给定的数据集按升序排序</li><li>计算所需百分位数的等级为 <em>(百分位数 / 100) * 数据集大小</em></li><li><strong>将等级取上限值，因为等级可能是一个小数</strong></li><li>最终结果是排序后的数据集中索引 <em>上限(rank) – 1</em> 的元素</li></ul><p>接下来，让我们创建一个通用方法来实现上述逻辑：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> \`<span class="token operator">&lt;</span><span class="token class-name">T</span> <span class="token keyword">extends</span> <span class="token class-name">Comparable</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\`\`\`<span class="token operator">&gt;</span> <span class="token class-name">T</span> <span class="token function">getPercentile</span><span class="token punctuation">(</span><span class="token class-name">Collection</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\`\` input<span class="token punctuation">,</span> <span class="token keyword">double</span> percentile<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>input <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> input<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;输入的数据集不能为null或为空。&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>percentile \`<span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> percentile <span class="token operator">&gt;</span>\` <span class="token number">100</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;百分位数必须在0到100之间，包括0和100。&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\`\` sortedList <span class="token operator">=</span> input<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">sorted</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">int</span> rank <span class="token operator">=</span> percentile <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">ceil</span><span class="token punctuation">(</span>percentile <span class="token operator">/</span> <span class="token number">100.0</span> <span class="token operator">*</span> input<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> sortedList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>rank <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，上面的实现相当直接。然而，值得一提的是：</p><ul><li>需要证 <em>百分位数</em> 参数 ( <em>0 \`&lt;= 百分位数 &lt;= 100</em> )</li><li>我们使用Stream API对输入的数据集进行排序，并<strong>将排序结果收集到一个新的列表中，以避免修改原始数据集</strong></li></ul><p>接下来，让我们测试我们的 <em>getPercentile()</em> 方法。</p><h2 id="_4-测试-getpercentile-方法" tabindex="-1"><a class="header-anchor" href="#_4-测试-getpercentile-方法"><span>4. 测试 <em>getPercentile()</em> 方法</span></a></h2><p>首先，如果百分位数超出有效范围，该方法应该抛出 <em>IllegalArgumentException</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span>\` <span class="token function">getPercentile</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">getPercentile</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">101</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们<strong>使用 <em>assertThrows()</em> 方法来验证是否引发了预期的异常</strong>。</p><p>接下来，让我们以1-100的列表作为输入，验证该方法是否能产生预期的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\` list100 <span class="token operator">=</span> <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">rangeClosed</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">boxed</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">shuffle</span><span class="token punctuation">(</span>list100<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token function">getPercentile</span><span class="token punctuation">(</span>list100<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token function">getPercentile</span><span class="token punctuation">(</span>list100<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">,</span> <span class="token function">getPercentile</span><span class="token punctuation">(</span>list100<span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token function">getPercentile</span><span class="token punctuation">(</span>list100<span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">76</span><span class="token punctuation">,</span> <span class="token function">getPercentile</span><span class="token punctuation">(</span>list100<span class="token punctuation">,</span> <span class="token number">75.3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token function">getPercentile</span><span class="token punctuation">(</span>list100<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们通过 <em>IntStream</em> 准备了输入列表。此外，我们使用 <em>shuffle()</em> 方法来<strong>随机排序100个数字</strong>。</p><p>此外，让我们用另一个数据集输入测试我们的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\` list8 <span class="token operator">=</span> <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">92</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">boxed</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token function">getPercentile</span><span class="token punctuation">(</span>list8<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token function">getPercentile</span><span class="token punctuation">(</span>list8<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token function">getPercentile</span><span class="token punctuation">(</span>list8<span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token function">getPercentile</span><span class="token punctuation">(</span>list8<span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">92</span><span class="token punctuation">,</span> <span class="token function">getPercentile</span><span class="token punctuation">(</span>list8<span class="token punctuation">,</span> <span class="token number">75.3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token function">getPercentile</span><span class="token punctuation">(</span>list8<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-从数组计算百分位数" tabindex="-1"><a class="header-anchor" href="#_5-从数组计算百分位数"><span>5. 从数组计算百分位数</span></a></h2><p>有时，给定的数据集输入是一个数组而不是《集合》。在这种情况下，我们可以<strong>先将输入数组转换为《列表》</strong>，然后使用我们的 <em>getPercentile()</em> 方法来计算所需的百分位数。</p><p>接下来，让我们演示如何通过使用一个 <em>long</em> 数组作为输入来实现这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">long</span><span class="token punctuation">[</span><span class="token punctuation">]</span> theArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">long</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">92</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">//将long[]数组转换为List\`\`\`&lt;Long&gt;\`\`\`</span>
<span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>\`\`\` list8 <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>theArray<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">boxed</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token function">getPercentile</span><span class="token punctuation">(</span>list8<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token function">getPercentile</span><span class="token punctuation">(</span>list8<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token function">getPercentile</span><span class="token punctuation">(</span>list8<span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token function">getPercentile</span><span class="token punctuation">(</span>list8<span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">92</span><span class="token punctuation">,</span> <span class="token function">getPercentile</span><span class="token punctuation">(</span>list8<span class="token punctuation">,</span> <span class="token number">75.3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token function">getPercentile</span><span class="token punctuation">(</span>list8<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如代码所示，**由于我们的输入是原始类型数组（long[]），我们使用了 Arrays.stream() 将其转换为 List<code>&lt;Long&gt;</code>。**然后，我们可以将转换后的 <em>List</em> 传递给 <em>getPercentile()</em> 以获得预期的结果。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们首先讨论了百分位数的基本原理。然后，我们探讨了如何在Java中为数据集计算百分位数。</p><p>如往常一样，示例的完整源代码可在GitHub上获得。 OK</p>`,37),c=[e];function o(l,u){return a(),s("div",null,c)}const r=n(p,[["render",o],["__file","2024-06-21-Calculate Percentiles in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-21-Calculate%20Percentiles%20in%20Java.html","title":"Java中计算百分位数","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Java","数据分析"],"tag":["百分位数","数据集","统计分布"],"head":[["meta",{"name":"keywords","content":"Java, 百分位数计算, 数据分析, 统计分布"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-21-Calculate%20Percentiles%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中计算百分位数"}],["meta",{"property":"og:description","content":"Java中计算百分位数 1. 概述 在Java中分析数据时，计算百位数是理解数值数据集的统计分布和特征的基本任务。 在本教程中，我们将逐步介绍Java中计算百分位数的过程，并提供代码示例和解释。 2. 理解百分位数 在讨论实现细节之前，我们首先了解百分位数是什么以及它们在数据分析中的常见用法。 百分位数是统计学中用来表示低于某个给定百分比的观察值的值。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"百分位数"}],["meta",{"property":"article:tag","content":"数据集"}],["meta",{"property":"article:tag","content":"统计分布"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中计算百分位数\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中计算百分位数 1. 概述 在Java中分析数据时，计算百位数是理解数值数据集的统计分布和特征的基本任务。 在本教程中，我们将逐步介绍Java中计算百分位数的过程，并提供代码示例和解释。 2. 理解百分位数 在讨论实现细节之前，我们首先了解百分位数是什么以及它们在数据分析中的常见用法。 百分位数是统计学中用来表示低于某个给定百分比的观察值的值。..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 理解百分位数","slug":"_2-理解百分位数","link":"#_2-理解百分位数","children":[]},{"level":2,"title":"3. 从《集合》计算百分位数","slug":"_3-从《集合》计算百分位数","link":"#_3-从《集合》计算百分位数","children":[]},{"level":2,"title":"4. 测试 getPercentile() 方法","slug":"_4-测试-getpercentile-方法","link":"#_4-测试-getpercentile-方法","children":[]},{"level":2,"title":"5. 从数组计算百分位数","slug":"_5-从数组计算百分位数","link":"#_5-从数组计算百分位数","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.31,"words":1292},"filePathRelative":"posts/baeldung/Archive/2024-06-21-Calculate Percentiles in Java.md","localizedDate":"2024年6月21日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在Java中分析数据时，计算百位数是理解数值数据集的统计分布和特征的基本任务。</p>\\n<p>在本教程中，我们将逐步介绍Java中计算百分位数的过程，并提供代码示例和解释。</p>\\n<h2>2. 理解百分位数</h2>\\n<p>在讨论实现细节之前，我们首先了解百分位数是什么以及它们在数据分析中的常见用法。</p>\\n<p><strong>百分位数是统计学中用来表示低于某个给定百分比的观察值的值</strong>。例如，第50百分位数（也称为中位数）表示有50%的数据点低于此值。</p>\\n<p>值得注意的是，<strong>百分位数以与输入数据集相同的单位表示，而不是以百分比</strong>。例如，如果数据集指的是月薪，相应的百分位数将以美元、欧元或其他货币表示。</p>","autoDesc":true}');export{r as comp,d as data};
