import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-aCH2KGQK.js";const t={},p=e(`<h1 id="寻找列表中第一个不重复的元素" tabindex="-1"><a class="header-anchor" href="#寻找列表中第一个不重复的元素"><span>寻找列表中第一个不重复的元素</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将探讨在列表中找到第一个不重复元素的问题。我们首先理解问题陈述，然后实现几种方法来达到期望的结果。</p><h2 id="_2-问题陈述" tabindex="-1"><a class="header-anchor" href="#_2-问题陈述"><span>2. 问题陈述</span></a></h2><p>给定一个元素列表，任务是找到列表中不重复的第一个元素。换句话说，**我们需要识别列表中只出现一次的第一个元素。**如果没有不重复的元素，我们则返回一个适当的指示，例如，<em>null</em>。</p><h2 id="_3-使用-for-循环" tabindex="-1"><a class="header-anchor" href="#_3-使用-for-循环"><span>3. 使用 <em>for</em> 循环</span></a></h2><p>这种方法使用嵌套的 <em>for</em> 循环来遍历列表并检查重复元素。它很直接但效率较低。</p><h3 id="_3-1-实现" tabindex="-1"><a class="header-anchor" href="#_3-1-实现"><span>3.1. 实现</span></a></h3><p>首先，我们遍历输入列表中的每个元素。对于每个元素，我们通过再次遍历列表来检查它是否只出现一次。如果发现元素重复，我们将标志 <em>isRepeating</em> 设置为 <em>true</em>。如果发现元素不重复，方法返回该元素。</p><p>以下是上述思想的实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Integer</span> <span class="token function">findFirstNonRepeating</span><span class="token punctuation">(</span><span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\` list<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> list<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> current <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">boolean</span> isRepeating <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> list<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">!=</span> j <span class="token operator">&amp;&amp;</span> current <span class="token operator">==</span> list<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                isRepeating <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isRepeating<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> current<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们通过一个示例列表来演示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在第一次迭代中，内循环扫描整个列表以查找元素 <em>1</em> 的任何其他出现。它在索引 <em>4</em> 处找到了元素 <em>1</em> 的另一个出现。由于元素 <em>1</em> 在列表中的其他地方再次出现，它被认为是重复的。对元素 <em>2</em> 的处理过程重复。在第三次迭代中，它没有在列表中找到元素 <em>3</em> 的任何其他出现。因此，它被识别为第一个不重复的元素，方法返回 <em>3</em>。</p><h3 id="_3-2-复杂度分析" tabindex="-1"><a class="header-anchor" href="#_3-2-复杂度分析"><span>3.2. 复杂度分析</span></a></h3><p>设 n 为输入列表的大小。外循环遍历列表一次，产生 O(n) 次迭代。内循环还为每次外循环迭代遍历列表一次，导致每次外循环迭代产生 O(n) 次迭代。因此，总体时间复杂度是 O(n^2)。该方法使用与输入列表大小无关的常量额外空间。因此，空间复杂度是 O(1)。</p><p><strong>这种方法提供了一个直接的解决方案来找到列表中的第一个不重复元素。但是，它具有 O(n^2) 的时间复杂度，使其对大型列表来说效率低下。</strong></p><h2 id="_4-使用-indexof-和-lastindexof" tabindex="-1"><a class="header-anchor" href="#_4-使用-indexof-和-lastindexof"><span>4. 使用 <em>indexOf()</em> 和 <em>lastIndexOf()</em></span></a></h2><p><em>indexOf()</em> 方法检索元素第一次出现的索引，而 <em>lastIndexOf()</em> 返回元素最后一次出现的索引。通过比较列表中每个元素的这些索引，我们可以识别只出现一次的元素。</p><h3 id="_4-1-实现" tabindex="-1"><a class="header-anchor" href="#_4-1-实现"><span>4.1. 实现</span></a></h3><p>在迭代过程中，我们检查每个元素的第一次出现索引是否不等于其最后一次出现索引。如果它们不相等，这意味着元素在列表中出现了多次。如果发现一个元素的第一次和最后一次出现索引相同，方法将返回该元素作为第一个不重复的元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Integer</span> <span class="token function">findFirstNonRepeatedElement</span><span class="token punctuation">(</span><span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\` list<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> list<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>list<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>list<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">==</span> list<span class="token punctuation">.</span><span class="token function">lastIndexOf</span><span class="token punctuation">(</span>list<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> list<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们通过提供的示例列表来演示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在最初的迭代中，both <em>indexOf(1)</em> and <em>lastIndexOf(1)</em> return <em>0</em> and <em>4</em>. They aren’t equal. This indicates that element <em>1</em> is a repeating element. This process is repeated for subsequent element <em>2</em>. However, when examining element <em>3</em>, both <em>indexOf(3)</em> and <em>lastIndexOf(3)</em> return <em>2</em>. This equality implies that element <em>3</em> is the first non-repeating element. Therefore, the method returns <em>3</em> as the result.</p><h3 id="_4-2-复杂度分析" tabindex="-1"><a class="header-anchor" href="#_4-2-复杂度分析"><span>4.2. 复杂度分析</span></a></h3><p>设 n 为输入列表的大小。该方法遍历列表一次。**对于每个元素，它调用 <em>indexOf()</em> 和 <em>lastIndexOf()</em>，这可能会遍历列表以找到索引。**因此，总体时间复杂度是 O(n^2)。这种方法使用常量量的额外空间。因此，空间复杂度是 O(1)。</p><p>虽然这种方法提供了一个简洁的解决方案，但由于其二次时间复杂度 (O(n^2))，它是低效的。<strong>对于大型列表，特别是重复调用 <em>indexOf()</em> 和 <em>lastIndexOf()</em>，这种方法可能比其他方法显著慢。</strong></p><h2 id="_5-使用-hashmap" tabindex="-1"><a class="header-anchor" href="#_5-使用-hashmap"><span>5. 使用 <em>HashMap</em></span></a></h2><p>另一种方法是使用 <em>HashMap</em> 来计算每个元素的出现次数，然后找到第一个不重复的元素。这种方法比简单的 <em>for</em> 循环方法更有效。</p><h3 id="_5-1-实现" tabindex="-1"><a class="header-anchor" href="#_5-1-实现"><span>5.1. 实现</span></a></h3><p>**在这种方法中，我们遍历输入列表以计算每个元素的出现次数，并将它们存储在 <em>HashMap</em> 中。**计数完成后，我们再次遍历列表并检查每个元素的计数是否等于 <em>1</em>。如果任何元素的计数等于 <em>1</em>，它就作为第一个不重复的元素返回。如果在遍历整个列表后没有找到不重复的元素，它返回 <em>-1</em>。</p><p>以下是上述思想的实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Integer</span> <span class="token function">findFirstNonRepeating</span><span class="token punctuation">(</span><span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\` list<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Map</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` counts <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> list<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        counts<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>num<span class="token punctuation">,</span> counts<span class="token punctuation">.</span><span class="token function">getOrDefault</span><span class="token punctuation">(</span>num<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> list<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>counts<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> num<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们通过提供的示例列表来演示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>第一次迭代后的 <em>counts</em> 将是：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">{</span><span class="token number">1</span><span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当遍历列表时，<em>1</em> 和 <em>2</em> 的计数大于 <em>1</em>，所以它们不是不重复的。元素 <em>3</em> 的计数为 <em>1</em>，所以它是第一个不重复的元素。</p><h3 id="_5-2-复杂度分析" tabindex="-1"><a class="header-anchor" href="#_5-2-复杂度分析"><span>5.2. 复杂度分析</span></a></h3><p>设 n 为输入列表的大小。在列表中计算每个元素的出现次数需要 O(n) 时间。再次遍历列表以找到第一个不重复的元素也需要 O(n) 时间。因此，<strong>总体时间复杂度是 O(n)</strong>。这种方法使用的额外空间与输入列表中唯一元素的数量成比例。<strong>在最坏的情况下，如果所有元素都是唯一的，空间复杂度是 O(n)。</strong></p><p>**这种方法为在广泛的输入数据中找到列表中的第一个不重复元素提供了一个有效的解决方案。**它利用 <em>HashMap</em> 来跟踪元素的出现次数，与传统的 <em>for</em> 循环方法相比，显著提高了性能。</p><h2 id="_6-使用数组作为频率计数器" tabindex="-1"><a class="header-anchor" href="#_6-使用数组作为频率计数器"><span>6. 使用数组作为频率计数器</span></a></h2><p>这种方法使用数组作为频率计数器来计算每个元素的出现次数并找到第一个不重复的元素。</p><h3 id="_6-1-实现" tabindex="-1"><a class="header-anchor" href="#_6-1-实现"><span>6.1. 实现</span></a></h3><p>首先，我们初始化一个大小为 <em>maxElement + 1</em> 的数组 <em>frequency</em>，其中 <em>maxElement</em> 是列表中的最大元素。我们遍历列表，对于每个元素 <em>num</em>，增加 <em>frequency[num]</em>。这一步确保 <em>frequency[i]</em> 存储了元素 <em>i</em> 的出现次数。</p><p>接下来，我们再次遍历列表。对于每个元素 <em>num</em>，我们检查 <em>frequency[num]</em> 是否等于 <em>1</em>。如果 <em>frequency[num]</em> 等于 <em>1</em>，我们返回 <em>num</em>，因为它是第一个不重复的元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Integer</span> <span class="token function">findFirstNonRepeating</span><span class="token punctuation">(</span><span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\` list<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> maxElement <span class="token operator">=</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> frequency <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>maxElement <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> list<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        frequency<span class="token punctuation">[</span>num<span class="token punctuation">]</span><span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> list<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>frequency<span class="token punctuation">[</span>num<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> num<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们通过提供的示例列表来演示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们初始化频率数组，将所有元素设置为零：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span>
我们遍历列表：

\`\`\`java
<span class="token class-name">Increment</span> frequency<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token keyword">to</span> <span class="token number">2.</span>
<span class="token class-name">Increment</span> frequency<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token keyword">to</span> <span class="token number">2.</span>
<span class="token class-name">Increment</span> frequency<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token keyword">to</span> <span class="token number">1.</span>
<span class="token class-name">Increment</span> frequency<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span> <span class="token keyword">to</span> <span class="token number">2.</span>
<span class="token class-name">Increment</span> frequency<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span> <span class="token keyword">to</span> <span class="token number">1.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们再次遍历列表，对于 <em>frequency[1]</em> 和 <em>frequency[2]</em> 的值是 <em>2</em>，所以它不是非重复的。对于 <em>frequency[3]</em>，值等于 <em>1</em>，所以方法返回 <em>3</em>。</p><h3 id="_6-2-复杂度分析" tabindex="-1"><a class="header-anchor" href="#_6-2-复杂度分析"><span>6.2. 复杂度分析</span></a></h3><p>设 n 为输入列表的大小。我们两次遍历列表，但每次迭代都提供了 O(n) 的时间复杂度。这种方法比 <em>HashMap</em> 方法更节省内存，其空间复杂度为 O(maxElement)。</p><p>这种方法在列表中的元素范围较小时特别有效，因为它避免了哈希的开销并提供了更直接的实现。<strong>然而，如果输入列表包含负数或零，则频率数组必须覆盖所有可能的元素范围，如果适用的话，包括负数。</strong></p><h2 id="_7-总结" tabindex="-1"><a class="header-anchor" href="#_7-总结"><span>7. 总结</span></a></h2><p>以下是不同实现的比较表：</p><table><thead><tr><th>方法</th><th>时间复杂度</th><th>空间复杂度</th><th>效率</th><th>适合大型列表</th></tr></thead><tbody><tr><td>使用 <em>for</em> 循环</td><td>O(n^2)</td><td>O(1)</td><td>低</td><td>否</td></tr><tr><td>使用 <em>indexOf()</em></td><td>O(n^2)</td><td>O(1)</td><td>低</td><td>否</td></tr><tr><td>使用 <em>HashMap</em></td><td>O(n)</td><td>O(n)</td><td>高</td><td>是</td></tr><tr><td>使用数组计数器</td><td>O(n)</td><td>O(maxElement)</td><td>高</td><td>否</td></tr></tbody></table><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在本文中，我们学习了几种在列表中找到第一个非重复元素的方法，每种方法都有其优势和考虑因素。虽然每种方法都提供了其优势和考虑因素，但 HashMap 方法因其在识别第一个非重复元素方面的效率而脱颖而出。通过利用 HashMaps，我们可以实现最佳性能。</p><p>如往常一样，示例的源代码可在 GitHub 上找到。</p><p>OK</p>`,63),o=[p];function c(l,i){return a(),s("div",null,o)}const d=n(t,[["render",c],["__file","2024-06-22-Find the First Non repeating Element of a List.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-Find%20the%20First%20Non%20repeating%20Element%20of%20a%20List.html","title":"寻找列表中第一个不重复的元素","lang":"zh-CN","frontmatter":{"date":"2024-06-22T00:00:00.000Z","category":["Java","算法"],"tag":["非重复元素","列表处理"],"head":[["meta",{"name":"keywords","content":"Java, 非重复元素, 算法, 列表处理"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-Find%20the%20First%20Non%20repeating%20Element%20of%20a%20List.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"寻找列表中第一个不重复的元素"}],["meta",{"property":"og:description","content":"寻找列表中第一个不重复的元素 1. 引言 在本教程中，我们将探讨在列表中找到第一个不重复元素的问题。我们首先理解问题陈述，然后实现几种方法来达到期望的结果。 2. 问题陈述 给定一个元素列表，任务是找到列表中不重复的第一个元素。换句话说，**我们需要识别列表中只出现一次的第一个元素。**如果没有不重复的元素，我们则返回一个适当的指示，例如，null。 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T13:30:59.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"非重复元素"}],["meta",{"property":"article:tag","content":"列表处理"}],["meta",{"property":"article:published_time","content":"2024-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T13:30:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"寻找列表中第一个不重复的元素\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T13:30:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"寻找列表中第一个不重复的元素 1. 引言 在本教程中，我们将探讨在列表中找到第一个不重复元素的问题。我们首先理解问题陈述，然后实现几种方法来达到期望的结果。 2. 问题陈述 给定一个元素列表，任务是找到列表中不重复的第一个元素。换句话说，**我们需要识别列表中只出现一次的第一个元素。**如果没有不重复的元素，我们则返回一个适当的指示，例如，null。 ..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 问题陈述","slug":"_2-问题陈述","link":"#_2-问题陈述","children":[]},{"level":2,"title":"3. 使用 for 循环","slug":"_3-使用-for-循环","link":"#_3-使用-for-循环","children":[{"level":3,"title":"3.1. 实现","slug":"_3-1-实现","link":"#_3-1-实现","children":[]},{"level":3,"title":"3.2. 复杂度分析","slug":"_3-2-复杂度分析","link":"#_3-2-复杂度分析","children":[]}]},{"level":2,"title":"4. 使用 indexOf() 和 lastIndexOf()","slug":"_4-使用-indexof-和-lastindexof","link":"#_4-使用-indexof-和-lastindexof","children":[{"level":3,"title":"4.1. 实现","slug":"_4-1-实现","link":"#_4-1-实现","children":[]},{"level":3,"title":"4.2. 复杂度分析","slug":"_4-2-复杂度分析","link":"#_4-2-复杂度分析","children":[]}]},{"level":2,"title":"5. 使用 HashMap","slug":"_5-使用-hashmap","link":"#_5-使用-hashmap","children":[{"level":3,"title":"5.1. 实现","slug":"_5-1-实现","link":"#_5-1-实现","children":[]},{"level":3,"title":"5.2. 复杂度分析","slug":"_5-2-复杂度分析","link":"#_5-2-复杂度分析","children":[]}]},{"level":2,"title":"6. 使用数组作为频率计数器","slug":"_6-使用数组作为频率计数器","link":"#_6-使用数组作为频率计数器","children":[{"level":3,"title":"6.1. 实现","slug":"_6-1-实现","link":"#_6-1-实现","children":[]},{"level":3,"title":"6.2. 复杂度分析","slug":"_6-2-复杂度分析","link":"#_6-2-复杂度分析","children":[]}]},{"level":2,"title":"7. 总结","slug":"_7-总结","link":"#_7-总结","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1719063059000,"updatedTime":1719063059000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.76,"words":2327},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-Find the First Non repeating Element of a List.md","localizedDate":"2024年6月22日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将探讨在列表中找到第一个不重复元素的问题。我们首先理解问题陈述，然后实现几种方法来达到期望的结果。</p>\\n<h2>2. 问题陈述</h2>\\n<p>给定一个元素列表，任务是找到列表中不重复的第一个元素。换句话说，**我们需要识别列表中只出现一次的第一个元素。**如果没有不重复的元素，我们则返回一个适当的指示，例如，<em>null</em>。</p>\\n<h2>3. 使用 <em>for</em> 循环</h2>\\n<p>这种方法使用嵌套的 <em>for</em> 循环来遍历列表并检查重复元素。它很直接但效率较低。</p>\\n<h3>3.1. 实现</h3>","autoDesc":true}');export{d as comp,k as data};
