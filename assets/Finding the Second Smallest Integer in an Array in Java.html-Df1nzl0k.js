import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DRCKM-lz.js";const p={},e=t(`<h1 id="在java中找到数组中的第二小整数" tabindex="-1"><a class="header-anchor" href="#在java中找到数组中的第二小整数"><span>在Java中找到数组中的第二小整数</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将探索使用Java在数组中找到第二小元素的不同方法。</p><h2 id="_2-问题陈述" tabindex="-1"><a class="header-anchor" href="#_2-问题陈述"><span>2. 问题陈述</span></a></h2><p>给定一个整数数组，任务是在数组中找到第二小的元素。<strong>这个值代表数组中存在的第二低的整数，假设至少有两个不同的元素。</strong></p><p>数组中无法找到第二小元素有两种情况：</p><ul><li>如果输入数组为空（长度为0）或只包含一个元素，那么就无法识别出第二小的元素。</li><li>如果数组中的所有元素都相同，那么就不存在不同的第二小元素。</li></ul><p>在这些情况下，我们将返回 <em>-1</em> 以表示在给定的数组中没有找到第二小的数字。</p><p>让我们看看下面的例子：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>输入: [4, 2, 8, 1, 3] 输出: 2
输入: [1, 1, 1] 输出: -1
输入: [1] 输出: -1
输入: [] 输出: -1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用数组排序" tabindex="-1"><a class="header-anchor" href="#_3-使用数组排序"><span>3. 使用数组排序</span></a></h2><p>一个直接的方法是将数组按升序排序，然后返回第二个元素，它将是数组中的第二小整数。以下是通过排序数组来找到数组中第二小整数的代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>

result <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，这种方法有一个限制。<strong>如果数组包含重复元素（例如，<em>{5, 2, 9, 1, 7, 1}</em>），在排序后直接访问第二个元素可能不会得到第二小的不同元素。</strong></p><p>为了解决重复问题，我们可以修改排序方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">usingArraySort</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> smallest <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!=</span> smallest<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种修改后的方法在排序后迭代排序数组。**它一直在跟踪到目前为止遇到的最小元素。**如果它遇到一个不同的元素（与当前最小值不同），它将用该元素更新结果并跳出循环。这确保它找到了第二小的不同元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token function">usingArraySort</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token function">usingArraySort</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token function">usingArraySort</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token function">usingArraySort</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对数组进行排序是初学者熟悉的概念，逻辑也很直接。**然而，<em>Arrays.sort()</em> 在平均和最坏情况下通常具有 <em>O(n log n)</em> 的时间复杂度，其中 <em>n</em> 是数组中的元素数量。**这可能对大型数组来说是低效的。</p><h2 id="_4-使用单次遍历" tabindex="-1"><a class="header-anchor" href="#_4-使用单次遍历"><span>4. 使用单次遍历</span></a></h2><p>这种方法通过只遍历数组一次来高效地找到数组中的第二小元素。<strong>它避免了排序的开销，并利用条件语句来更新可能的最小和第二小元素的候选项。</strong></p><p>以下是这种方法的代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">usingSinglePassThrough</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> smallest <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> secondSmallest <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>num <span class="token operator">&lt;</span> smallest<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            secondSmallest <span class="token operator">=</span> smallest<span class="token punctuation">;</span>
            smallest <span class="token operator">=</span> num<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>num <span class="token operator">&lt;</span> secondSmallest <span class="token operator">&amp;&amp;</span> num <span class="token operator">!=</span> smallest<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            secondSmallest <span class="token operator">=</span> num<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>secondSmallest <span class="token operator">==</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> secondSmallest<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><em>smallest</em>: 初始化为 <em>Integer.MAX_VALUE</em> 以跟踪到目前为止遇到的当前最小元素</li><li><em>secondSmallest</em>: 初始化为 <em>Integer.MAX_VALUE</em>，它可能持有第二小的元素</li></ul><p>代码使用 <em>for</em>-each 循环迭代数组。**如果当前元素 <em>num</em> 小于 <em>smallest</em>，它就成为新的 <em>smallest</em>，而之前的 <em>smallest</em> 被分配给 <em>secondSmallest</em>。**这确保我们同时跟踪最小和潜在的第二小元素。</p><p>**如果 <em>num</em> 小于当前的 <em>secondSmallest</em> 但不等于 <em>smallest</em>（避免考虑同一个元素两次），它就成为新的 <em>secondSmallest</em>。**循环结束后，如果 <em>secondSmallest</em> 仍然是 <em>Integer.MAX_VALUE</em>，这意味着所有元素都相同，没有找到比初始 <em>smallest</em> 更小的元素。</p><p>在这种情况下，返回 <em>-1</em>。否则，存储在 <em>secondSmallest</em> 中的最终值作为第二小的元素返回：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token function">usingSinglePassThrough</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token function">usingSinglePassThrough</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token function">usingSinglePassThrough</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token function">usingSinglePassThrough</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在最坏的情况下，循环对数组中的所有元素执行。**因此，这种方法的时间复杂度是 <em>O(n)</em>，这表示元素数量和执行时间之间的线性关系。**总的来说，这种方法避免了对整个数组进行排序，使其潜在地更快，特别是对于较大的数组。</p><h2 id="_5-使用最小堆" tabindex="-1"><a class="header-anchor" href="#_5-使用最小堆"><span>5. 使用最小堆</span></a></h2><p>这种方法利用最小堆数据结构来高效地找到数组中的第二小元素。**最小堆是一个优先队列，其中最小值的元素始终位于根节点。**通过策略性地操作堆大小，我们可以确保它包含最小和潜在的第二小元素。</p><p>以下是实现这种方法的代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">usingMinHeap</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` minHeap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>minHeap<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">||</span> num <span class="token operator">!=</span> minHeap<span class="token punctuation">.</span><span class="token function">peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            minHeap<span class="token punctuation">.</span><span class="token function">offer</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 如果minHeap大小小于2，则所有元素都相同</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>minHeap<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    minHeap<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 移除最小元素</span>
    <span class="token keyword">return</span> minHeap<span class="token punctuation">.</span><span class="token function">peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 第二小的元素在堆的根节点</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们首先检查数组长度是否小于 <em>2</em>。如果是，我们返回 <em>-1</em>，因为没有第二小的元素。接下来，我们创建一个 <em>PriorityQueue</em> 对象 <em>minHeap</em>。<strong>默认情况下，<em>PriorityQueue</em> 实现了最小堆，所以最小值的元素位于根节点。</strong></p><p>我们迭代数组，使用 <em>offer()</em> 将每个元素添加到 <em>minHeap</em>。在每次迭代中，我们考虑两个条件：</p><ul><li>如果堆为空，任何元素都可以添加，因为还没有更小的元素。</li><li>如果当前元素与堆中的最小元素不同，它可以被添加。这确保了具有与最小值相同值的重复元素不会被多次添加。</li></ul><p>处理完整个数组后，我们检查 <em>minHeap</em> 的大小是否小于2。**这表明所有元素都相同。**在这种情况下，我们返回 <em>-1</em>，因为没有第二小的元素。</p><p><strong>否则，我们使用 <em>poll()</em> 从最小堆中移除最小元素，并使用 <em>peek()</em> 从最小堆的根节点返回第二小的元素。</strong></p><p>让我们使用测试用例验证我们的解决方案：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token function">usingMinHeap</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token function">usingMinHeap</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token function">usingMinHeap</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token function">usingMinHeap</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法可能比排序对大型数组更有效率。然而，对于非常小的数组，创建和维护最小堆的开销可能与更简单的方法相比效率较低。</p><p><strong>最小堆方法可以被认为具有平均和最坏情况下的时间复杂度 <em>O(n)</em>，这比排序算法更有效率。</strong></p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了几种在数组中找到第二小数字的方法。对整个数组进行排序可能适用于较小的数据集，因为它是一个熟悉的概念。然而，对于较大的数据集，单次遍历或最小堆是更好的解决方案。</p><p>正如往常一样，示例的源代码可在GitHub上获取。</p><p>评论在文章发布后30天内开放。对于超过此日期的任何问题，请使用网站上的联系表单。</p>`,46),o=[e];function c(l,u){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","Finding the Second Smallest Integer in an Array in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Finding%20the%20Second%20Smallest%20Integer%20in%20an%20Array%20in%20Java.html","title":"在Java中找到数组中的第二小整数","lang":"zh-CN","frontmatter":{"date":"2024-06-15T00:00:00.000Z","category":["Java","Algorithm"],"tag":["Array","Second Smallest"],"description":"在Java中找到数组中的第二小整数 1. 引言 在本教程中，我们将探索使用Java在数组中找到第二小元素的不同方法。 2. 问题陈述 给定一个整数数组，任务是在数组中找到第二小的元素。这个值代表数组中存在的第二低的整数，假设至少有两个不同的元素。 数组中无法找到第二小元素有两种情况： 如果输入数组为空（长度为0）或只包含一个元素，那么就无法识别出第二小...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Finding%20the%20Second%20Smallest%20Integer%20in%20an%20Array%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中找到数组中的第二小整数"}],["meta",{"property":"og:description","content":"在Java中找到数组中的第二小整数 1. 引言 在本教程中，我们将探索使用Java在数组中找到第二小元素的不同方法。 2. 问题陈述 给定一个整数数组，任务是在数组中找到第二小的元素。这个值代表数组中存在的第二低的整数，假设至少有两个不同的元素。 数组中无法找到第二小元素有两种情况： 如果输入数组为空（长度为0）或只包含一个元素，那么就无法识别出第二小..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Array"}],["meta",{"property":"article:tag","content":"Second Smallest"}],["meta",{"property":"article:published_time","content":"2024-06-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中找到数组中的第二小整数\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-15T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 问题陈述","slug":"_2-问题陈述","link":"#_2-问题陈述","children":[]},{"level":2,"title":"3. 使用数组排序","slug":"_3-使用数组排序","link":"#_3-使用数组排序","children":[]},{"level":2,"title":"4. 使用单次遍历","slug":"_4-使用单次遍历","link":"#_4-使用单次遍历","children":[]},{"level":2,"title":"5. 使用最小堆","slug":"_5-使用最小堆","link":"#_5-使用最小堆","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":6.06,"words":1818},"filePathRelative":"posts/baeldung/Archive/Finding the Second Smallest Integer in an Array in Java.md","localizedDate":"2024年6月15日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将探索使用Java在数组中找到第二小元素的不同方法。</p>\\n<h2>2. 问题陈述</h2>\\n<p>给定一个整数数组，任务是在数组中找到第二小的元素。<strong>这个值代表数组中存在的第二低的整数，假设至少有两个不同的元素。</strong></p>\\n<p>数组中无法找到第二小元素有两种情况：</p>\\n<ul>\\n<li>如果输入数组为空（长度为0）或只包含一个元素，那么就无法识别出第二小的元素。</li>\\n<li>如果数组中的所有元素都相同，那么就不存在不同的第二小元素。</li>\\n</ul>\\n<p>在这些情况下，我们将返回 <em>-1</em> 以表示在给定的数组中没有找到第二小的数字。</p>","autoDesc":true}');export{r as comp,d as data};
