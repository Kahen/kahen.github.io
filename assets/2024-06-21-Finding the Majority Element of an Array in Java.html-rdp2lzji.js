import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-B3tK_ksD.js";const p={},e=t(`<h1 id="在java中寻找数组的主要元素" tabindex="-1"><a class="header-anchor" href="#在java中寻找数组的主要元素"><span>在Java中寻找数组的主要元素</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将探讨在数组中寻找主要元素的不同方法。对于每种方法，我们将提供它们各自的代码实现以及时间和空间复杂度的分析。</p><h2 id="_2-问题陈述" tabindex="-1"><a class="header-anchor" href="#_2-问题陈述"><span>2. 问题陈述</span></a></h2><p>让我们理解在数组中寻找主要元素的问题。我们有一个整数数组，我们的目标是确定其中是否存在一个主要元素。</p><p>**主要元素出现的次数超过数组长度的一半，即出现次数超过_n/2_，其中_n_代表数组的长度。**这意味着识别出在出现频率方面支配数组的元素。</p><p>在深入每种方法之前，我们将使用提供的样本数据作为输入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-使用-for-循环" tabindex="-1"><a class="header-anchor" href="#_3-使用-for-循环"><span>3. 使用_for_循环</span></a></h2><p>寻找主要元素的一个直接方法是通过_for_循环遍历数组。**这种方法涉及使用_for_循环遍历数组并维护每个元素的出现次数。**然后我们将检查是否有任何元素满足主要条件，即它在数组的一半以上的槽位中出现。</p><h3 id="_3-1-实现" tabindex="-1"><a class="header-anchor" href="#_3-1-实现"><span>3.1. 实现</span></a></h3><p>在这种实现中，我们使用_for_循环遍历数组。对于数组中的每个元素，我们初始化一个计数变量来跟踪其出现次数。随后，我们再次遍历数组来计算当前元素的出现次数。</p><p>当我们遍历数组时，如果我们遇到一个计数大于_n/2_的主要元素，我们可以立即返回该元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> majorityThreshold <span class="token operator">=</span> nums<span class="token punctuation">.</span>length <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token class-name">Integer</span> majorityElement <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            count<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">&gt;</span>\` majorityThreshold<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        majorityElement <span class="token operator">=</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> majorityElement<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-复杂度分析" tabindex="-1"><a class="header-anchor" href="#_3-2-复杂度分析"><span>3.2. 复杂度分析</span></a></h3><p><em>for_循环方法的时间复杂度是_O(n^2)</em>。**这种二次时间复杂度是由于实现中使用的嵌套循环，其中数组中的每个元素都与每个其他元素进行比较。**另一方面，空间复杂度是_O(1)_。</p><p>虽然这种方法实现简单且空间开销小，但由于其二次时间复杂度，它对于大型数组来说并不是最有效的。</p><h2 id="_4-使用排序方法" tabindex="-1"><a class="header-anchor" href="#_4-使用排序方法"><span>4. 使用排序方法</span></a></h2><p>**这种方法利用排序算法有效地识别数组中的主要元素。**策略涉及将数组按升序排序，这使我们能够识别元素的连续出现。</p><p>鉴于主要元素出现的次数超过数组的一半大小，在排序后，它将占据中间索引（如果数组长度为奇数）或与中间元素相邻（如果数组长度为偶数）。<strong>因此，通过检查排序后数组的中间元素，我们可以确定其中一个是否符合主要元素的条件。</strong></p><h3 id="_4-1-实现" tabindex="-1"><a class="header-anchor" href="#_4-1-实现"><span>4.1. 实现</span></a></h3><p>首先，我们使用_Arrays.sort()_按升序对数组进行排序。**这一步至关重要，因为它使我们更容易识别元素的连续出现。**接下来，我们遍历排序后的数组并跟踪中间元素的出现次数。在循环中，我们还检查计数是否大于数组大小的一半。</p><p>如果是，这意味着当前元素出现的次数超过一半，它被识别为主要元素。然后代码返回这个元素。让我们用代码片段演示这个概念：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> majorityThreshold <span class="token operator">=</span> nums<span class="token punctuation">.</span>length <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token class-name">Integer</span> majorityElement <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> nums<span class="token punctuation">[</span>majorityThreshold<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        count<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">&gt;</span>\` majorityThreshold<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        majorityElement <span class="token operator">=</span> nums<span class="token punctuation">[</span>majorityThreshold<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> majorityElement<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-复杂度分析" tabindex="-1"><a class="header-anchor" href="#_4-2-复杂度分析"><span>4.2. 复杂度分析</span></a></h3><p>**这种方法的时间复杂度通常是_O(n log n)<em>，由于排序，空间复杂度是_O(1)</em>，因为它使用常量额外空间。**这种方法与_for_循环方法相比稍微更有效，但由于排序操作的时间，它可能不是非常大的数组的最优化解决方案。</p><h2 id="_5-使用-hashmap" tabindex="-1"><a class="header-anchor" href="#_5-使用-hashmap"><span>5. 使用_HashMap_</span></a></h2><p><strong>这种方法使用_HashMap_来存储数组中每个元素的频率。</strong></p><h3 id="_5-1-实现" tabindex="-1"><a class="header-anchor" href="#_5-1-实现"><span>5.1. 实现</span></a></h3><p>在这种方法中，我们遍历数组，在_HashMap_中递增我们遇到的每个元素的计数。最后，我们遍历_HashMap_并检查是否有任何元素的计数大于数组大小的一半。如果找到主要元素，我们返回它；否则，我们返回-1以表示数组中不存在主要元素。</p><p>以下是示例实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\` frequencyMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Integer</span> majorityElement <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    frequencyMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>num<span class="token punctuation">,</span> frequencyMap<span class="token punctuation">.</span><span class="token function">getOrDefault</span><span class="token punctuation">(</span>num<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> majorityThreshold <span class="token operator">=</span> nums<span class="token punctuation">.</span>length <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\` entry <span class="token operator">:</span> frequencyMap<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>entry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> majorityThreshold<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        majorityElement <span class="token operator">=</span> entry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> majorityElement<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-复杂度分析" tabindex="-1"><a class="header-anchor" href="#_5-2-复杂度分析"><span>5.2. 复杂度分析</span></a></h3><p>**总体而言，使用_HashMap_是一种更有效的方法，特别是对于较大的数据集，由于其线性时间复杂度。**它的时间复杂度是_O(n)_，因为需要遍历数组一次和遍历_HashMap_一次。</p><p>**然而，这种方法需要额外的空间来存储_HashMap_，这在内存受限的环境中可能是一个问题。**在最坏的情况下，空间复杂度将是_O(n)_，因为_HashMap_可能会存储数组中的所有唯一元素。</p><h2 id="_6-使用boyer-moore投票算法" tabindex="-1"><a class="header-anchor" href="#_6-使用boyer-moore投票算法"><span>6. 使用Boyer-Moore投票算法</span></a></h2><p>这个算法通常用于使用固定数量的内存和线性时间复杂度来寻找序列中的主要元素。</p><h3 id="_6-1-实现" tabindex="-1"><a class="header-anchor" href="#_6-1-实现"><span>6.1. 实现</span></a></h3><p>**在初始化步骤中，我们创建两个变量：候选元素和计数。**候选元素设置为数组的第一个元素，计数设置为1。</p><p>接下来，在迭代步骤中，我们循环遍历数组的其余元素。对于每个后续元素，如果当前元素与候选元素相同，我们增加计数。这表明这个元素也可能成为主要元素。否则，我们减少计数。这抵消了候选之前的投票。</p><p>**如果计数达到0，候选元素将被重置为当前元素，计数被重新设置为1。**这是因为如果之前的元素相互抵消，当前元素可能是主要元素的新竞争者。</p><p>遍历完整个数组后，我们通过再次遍历数组并计算候选元素的出现次数来验证。如果候选出现次数超过n/2次，我们将其作为主要元素返回。否则，我们返回-1。</p><p>让我们继续实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> majorityThreshold <span class="token operator">=</span> nums<span class="token punctuation">.</span>length <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> candidate <span class="token operator">=</span> nums<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> majorityElement <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        candidate <span class="token operator">=</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        count <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>candidate <span class="token operator">==</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        count<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        count<span class="token operator">--</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>num <span class="token operator">==</span> candidate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        count<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

majorityElement <span class="token operator">=</span> count <span class="token operator">&gt;</span>\` majorityThreshold <span class="token operator">?</span> candidate <span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> majorityElement<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里是迭代步骤的分解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>初始阶段<span class="token operator">:</span> <span class="token punctuation">[</span>候选元素 <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> 计数 <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
迭代 <span class="token number">1</span><span class="token operator">:</span> <span class="token punctuation">[</span>候选元素 <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> 计数 <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> 元素 <span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token comment">// &quot;3&quot; != 候选，计数--</span>
迭代 <span class="token number">2</span><span class="token operator">:</span> <span class="token punctuation">[</span>候选元素 <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> 计数 <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> 元素 <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token comment">// &quot;2&quot; == 候选，计数++</span>
迭代 <span class="token number">3</span><span class="token operator">:</span> <span class="token punctuation">[</span>候选元素 <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> 计数 <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> 元素 <span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token comment">// &quot;4&quot; != 候选，计数--</span>
迭代 <span class="token number">4</span><span class="token operator">:</span> <span class="token punctuation">[</span>候选元素 <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> 计数 <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> 元素 <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token comment">// &quot;2&quot; == 候选，计数++</span>
迭代 <span class="token number">5</span><span class="token operator">:</span> <span class="token punctuation">[</span>候选元素 <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> 计数 <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> 元素 <span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token comment">// &quot;5&quot; != 候选，计数--</span>
迭代 <span class="token number">6</span><span class="token operator">:</span> <span class="token punctuation">[</span>候选元素 <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> 计数 <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> 元素 <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token comment">// &quot;2&quot; == 候选，计数++</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-复杂度分析" tabindex="-1"><a class="header-anchor" href="#_6-2-复杂度分析"><span>6.2. 复杂度分析</span></a></h3><p><strong>这个算法具有_O(n)_的时间复杂度和_O(1)_的空间复杂度，使其成为在数组中寻找主要元素的高效解决方案。</strong></p><h2 id="_7-总结" tabindex="-1"><a class="header-anchor" href="#_7-总结"><span>7. 总结</span></a></h2><p>这个表格总结了每种方法的时间和空间复杂度以及它们的优点。它提供了每种方法的权衡和好处的快速概览。</p><table><thead><tr><th>方法</th><th>时间复杂度</th><th>空间复杂度</th><th>优点 &amp; 缺点</th></tr></thead><tbody><tr><td>For循环</td><td>_O(n^2抱歉，由于篇幅限制，我无法一次性翻译完整篇文章。以下是剩余部分的翻译：</td><td></td><td></td></tr></tbody></table><p>)_ | <em>O(1)</em> | – 实现简单直观<code>&lt;br&gt;</code>– 需要的额外空间最小<code>&lt;br&gt;</code>– 由于嵌套循环，对于大型数组效率低下 | | 排序 | <em>O(n log n)</em> | <em>O(1)</em> 或 <em>O(n)</em> | – 实现简单<code>&lt;br&gt;</code>– 如果使用就地排序则没有额外的空间开销<code>&lt;br&gt;</code>– 由于排序操作引入了额外的时间复杂度 | | HashMap_ | <em>O(n)</em> | <em>O(n)</em> | – 处理和空间使用都具有线性时间复杂度<code>&lt;br&gt;</code>– 高效处理大型数组<code>&lt;br&gt;</code>– 需要额外的空间用于HashMap存储 | | Boyer-Moore投票 | <em>O(n)</em> | <em>O(1)</em> | – 最优的时间和空间复杂度<code>&lt;br&gt;</code>– 对于大型数组高效 |</p><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在本文中，我们探讨了在数组中寻找主要元素的各种方法。</p><p>_for_循环方法提供了简单的实现，但由于其嵌套循环，对于大型数组效率不高。_HashMap_方法提供了线性时间复杂度，并且高效处理大型数组，但它需要额外的空间用于HashMap存储。</p><p>最后，Boyer-Moore投票算法提供了最优的时间和空间复杂度，对于大型数组是高效的。</p><p>如常，示例的源代码可在GitHub上找到。</p><p>OK</p>`,58),o=[e];function c(l,u){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-06-21-Finding the Majority Element of an Array in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-21-Finding%20the%20Majority%20Element%20of%20an%20Array%20in%20Java.html","title":"在Java中寻找数组的主要元素","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Java","Algorithms"],"tag":["Array","Majority Element"],"head":[["meta",{"name":"keywords","content":"Java, Algorithm, Majority Element, Array"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-21-Finding%20the%20Majority%20Element%20of%20an%20Array%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中寻找数组的主要元素"}],["meta",{"property":"og:description","content":"在Java中寻找数组的主要元素 1. 引言 在本教程中，我们将探讨在数组中寻找主要元素的不同方法。对于每种方法，我们将提供它们各自的代码实现以及时间和空间复杂度的分析。 2. 问题陈述 让我们理解在数组中寻找主要元素的问题。我们有一个整数数组，我们的目标是确定其中是否存在一个主要元素。 **主要元素出现的次数超过数组长度的一半，即出现次数超过_n/2_..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Array"}],["meta",{"property":"article:tag","content":"Majority Element"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中寻找数组的主要元素\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中寻找数组的主要元素 1. 引言 在本教程中，我们将探讨在数组中寻找主要元素的不同方法。对于每种方法，我们将提供它们各自的代码实现以及时间和空间复杂度的分析。 2. 问题陈述 让我们理解在数组中寻找主要元素的问题。我们有一个整数数组，我们的目标是确定其中是否存在一个主要元素。 **主要元素出现的次数超过数组长度的一半，即出现次数超过_n/2_..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 问题陈述","slug":"_2-问题陈述","link":"#_2-问题陈述","children":[]},{"level":2,"title":"3. 使用_for_循环","slug":"_3-使用-for-循环","link":"#_3-使用-for-循环","children":[{"level":3,"title":"3.1. 实现","slug":"_3-1-实现","link":"#_3-1-实现","children":[]},{"level":3,"title":"3.2. 复杂度分析","slug":"_3-2-复杂度分析","link":"#_3-2-复杂度分析","children":[]}]},{"level":2,"title":"4. 使用排序方法","slug":"_4-使用排序方法","link":"#_4-使用排序方法","children":[{"level":3,"title":"4.1. 实现","slug":"_4-1-实现","link":"#_4-1-实现","children":[]},{"level":3,"title":"4.2. 复杂度分析","slug":"_4-2-复杂度分析","link":"#_4-2-复杂度分析","children":[]}]},{"level":2,"title":"5. 使用_HashMap_","slug":"_5-使用-hashmap","link":"#_5-使用-hashmap","children":[{"level":3,"title":"5.1. 实现","slug":"_5-1-实现","link":"#_5-1-实现","children":[]},{"level":3,"title":"5.2. 复杂度分析","slug":"_5-2-复杂度分析","link":"#_5-2-复杂度分析","children":[]}]},{"level":2,"title":"6. 使用Boyer-Moore投票算法","slug":"_6-使用boyer-moore投票算法","link":"#_6-使用boyer-moore投票算法","children":[{"level":3,"title":"6.1. 实现","slug":"_6-1-实现","link":"#_6-1-实现","children":[]},{"level":3,"title":"6.2. 复杂度分析","slug":"_6-2-复杂度分析","link":"#_6-2-复杂度分析","children":[]}]},{"level":2,"title":"7. 总结","slug":"_7-总结","link":"#_7-总结","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":7.68,"words":2305},"filePathRelative":"posts/baeldung/Archive/2024-06-21-Finding the Majority Element of an Array in Java.md","localizedDate":"2024年6月21日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将探讨在数组中寻找主要元素的不同方法。对于每种方法，我们将提供它们各自的代码实现以及时间和空间复杂度的分析。</p>\\n<h2>2. 问题陈述</h2>\\n<p>让我们理解在数组中寻找主要元素的问题。我们有一个整数数组，我们的目标是确定其中是否存在一个主要元素。</p>\\n<p>**主要元素出现的次数超过数组长度的一半，即出现次数超过_n/2_，其中_n_代表数组的长度。**这意味着识别出在出现频率方面支配数组的元素。</p>\\n<p>在深入每种方法之前，我们将使用提供的样本数据作为输入：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">int</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> nums <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span><span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">4</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">5</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
