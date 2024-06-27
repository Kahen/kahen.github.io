import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-Cm-NmyMl.js";const p={},e=t(`<h1 id="寻找具有相同数字的下一个更高数字-baeldung" tabindex="-1"><a class="header-anchor" href="#寻找具有相同数字的下一个更高数字-baeldung"><span>寻找具有相同数字的下一个更高数字 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将学习如何在Java中找到与原始数字具有相同数字集的下一个更高数字。这个问题可以通过使用排列、排序和双指针方法的概念来解决。</p><h2 id="_2-问题陈述" tabindex="-1"><a class="header-anchor" href="#_2-问题陈述"><span>2. 问题陈述</span></a></h2><p>给定一个正整数，我们需要找到使用完全相同的数字集的下一个更高数字。例如，如果输入是123，我们的目标是重新排列其数字以形成具有相同数字的下一个更高数字。在这种情况下，下一个更高数字将是132。</p><p>如果输入是654或444，那么我们返回-1以表示无法找到下一个更高数字。</p><h2 id="_3-使用排列" tabindex="-1"><a class="header-anchor" href="#_3-使用排列"><span>3. 使用排列</span></a></h2><p>在这种方法中，我们将利用排列来找到与输入数字相同的数字集的下一个更大数字。<strong>我们将生成输入数字数字的所有可能排列，并将它们添加到_TreeSet_中以确保唯一性和排序。</strong></p><h3 id="_3-1-实现" tabindex="-1"><a class="header-anchor" href="#_3-1-实现"><span>3.1. 实现</span></a></h3><p><strong>首先，我们实现一个方法_findPermutations()_来生成输入数字_num_的数字的所有排列，并将它们添加到_TreeSet_中：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">findPermutations</span><span class="token punctuation">(</span><span class="token keyword">int</span> num<span class="token punctuation">,</span> <span class="token keyword">int</span> index<span class="token punctuation">,</span> <span class="token class-name">StringBuilder</span> sb<span class="token punctuation">,</span> <span class="token class-name">Set</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` hs<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">==</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        hs<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>sb<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法首先检查当前_index_是否等于输入数字的长度。如果是，这意味着已经完全生成了一个排列，然后我们将排列添加到_TreeSet_并返回以结束递归。</p><p><strong>否则，我们从当前_index_开始迭代数字的数字以生成所有排列：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> index<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">char</span> temp <span class="token operator">=</span> sb<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
    sb<span class="token punctuation">.</span><span class="token function">setCharAt</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> sb<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    sb<span class="token punctuation">.</span><span class="token function">setCharAt</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> temp<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在每次迭代中，我们将当前索引_index_处的字符与迭代索引_i_处的字符交换。<strong>这种交换操作有效地创建了不同的数字组合。</strong></p><p>交换后，该方法递归调用自身，使用更新后的_index_和修改后的_StringBuilder_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">findPermutations</span><span class="token punctuation">(</span>num<span class="token punctuation">,</span> index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> sb<span class="token punctuation">,</span> hs<span class="token punctuation">)</span><span class="token punctuation">;</span>
temp <span class="token operator">=</span> sb<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
sb<span class="token punctuation">.</span><span class="token function">setCharAt</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> sb<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
sb<span class="token punctuation">.</span><span class="token function">setCharAt</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> temp<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 递归后交换回原位</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>递归调用后，我们将字符交换回原始位置，以保持_sb_的完整性，以便后续迭代。</p><p>让我们将逻辑封装在方法中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">findNextHighestNumberUsingPermutation</span><span class="token punctuation">(</span><span class="token keyword">int</span> num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Set</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` hs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">findPermutations</span><span class="token punctuation">(</span>num<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> sb<span class="token punctuation">,</span> hs<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> n <span class="token operator">:</span> hs<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">&gt;</span> num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> n<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>一旦生成了所有排列，我们遍历_TreeSet_以找到大于输入数字的最小数字。</strong> 如果找到了这样的数字，它就是下一个更大的数字。否则，我们返回-1以表示不存在这样的数字。</p><h3 id="_3-2-测试" tabindex="-1"><a class="header-anchor" href="#_3-2-测试"><span>3.2. 测试</span></a></h3><p>让我们验证排列解决方案：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">536497</span><span class="token punctuation">,</span> <span class="token function">findNextHighestNumberUsingPermutation</span><span class="token punctuation">(</span><span class="token number">536479</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token function">findNextHighestNumberUsingPermutation</span><span class="token punctuation">(</span><span class="token number">987654</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-复杂度分析" tabindex="-1"><a class="header-anchor" href="#_3-3-复杂度分析"><span>3.3. 复杂度分析</span></a></h3><p><strong>这种实现的时间复杂度是O(n!)，在最坏的情况下，其中n是输入数字的位数。</strong> _findPermutations()_函数生成所有可能的数字排列n!，这在时间复杂度中占主导地位。</p><p>虽然_TreeSet_为插入和检索提供了对数复杂度(log n)，但它并没有显著影响整体时间复杂度。</p><p><strong>在最坏的情况下，如果所有排列都是唯一的（没有重复），_TreeSet_可能会持有所有n!个数字的排列。</strong> 这导致空间复杂度为O(n!)。</p><h2 id="_4-使用排序" tabindex="-1"><a class="header-anchor" href="#_4-使用排序"><span>4. 使用排序</span></a></h2><p>在这种方法中，我们将使用排序方法来确定与给定输入数字具有相同数字的下一个更大数字。</p><h3 id="_4-1-实现" tabindex="-1"><a class="header-anchor" href="#_4-1-实现"><span>4.1. 实现</span></a></h3><p>我们首先定义一个名为_findNextHighestNumberUsingSorting()_的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">findNextHighestNumberUsingSorting</span><span class="token punctuation">(</span><span class="token keyword">int</span> num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> numStr <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> numChars <span class="token operator">=</span> numStr<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> pivotIndex<span class="token punctuation">;</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在方法内部，我们将输入数字转换为字符串，然后转换为字符数组。</strong> 我们还初始化了一个变量_pivotIndex_来标识枢轴点。</p><p>接下来，我们从右到左迭代_numChars_数组，以确定最大的数字，它小于或等于其右侧的邻居：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span>pivotIndex <span class="token operator">=</span> numChars<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> pivotIndex <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">;</span> pivotIndex<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>numChars<span class="token punctuation">[</span>pivotIndex<span class="token punctuation">]</span> <span class="token operator">&gt;</span> numChars<span class="token punctuation">[</span>pivotIndex <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个数字成为识别数字降序中的断点的枢轴点。<strong>如果这个条件为真，这意味着我们已经找到了一个比它左边的邻居大的数字（潜在的枢轴）。</strong> 然后我们中断循环，因为我们不需要进一步搜索更大的降序数字。</p><p>如果没有找到这样的枢轴，这意味着数字已经在降序中，因此我们返回-1：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>pivotIndex <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在确定了枢轴之后，代码搜索枢轴右侧的最小数字，它仍然大于枢轴本身：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> pivot <span class="token operator">=</span> numChars<span class="token punctuation">[</span>pivotIndex <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> minIndex <span class="token operator">=</span> pivotIndex<span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> pivotIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> j \`<span class="token operator">&lt;</span> numChars<span class="token punctuation">.</span>length<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>numChars<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&gt;</span>\` pivot <span class="token operator">&amp;&amp;</span> numChars<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&lt;</span> numChars<span class="token punctuation">[</span>minIndex<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        minIndex <span class="token operator">=</span> j<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这个数字将与枢轴交换，以创建下一个更大的数字。</strong> 我们从枢轴后一个位置开始迭代数组，使用循环找到大于枢轴的最小数字。</p><p>一旦找到了大于枢轴的最小数字，我们将它与枢轴的位置交换：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">swap</span><span class="token punctuation">(</span>numChars<span class="token punctuation">,</span> pivotIndex <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> minIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>这个交换基本上将可以大于枢轴的最小数字带到了枢轴之前的位置。</strong></p><p>为了创建下一个字典序更大的数字，代码需要将枢轴右侧的数字按升序排序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>numChars<span class="token punctuation">,</span> pivotIndex<span class="token punctuation">,</span> numChars<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">return</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>numChars<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这将得到一个比原数字大的最小排列。</p><h3 id="_4-2-测试" tabindex="-1"><a class="header-anchor" href="#_4-2-测试"><span>4.2. 测试</span></a></h3><p>现在，让我们验证我们的排序实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">536497</span><span class="token punctuation">,</span> <span class="token function">findNextHighestNumberUsingSorting</span><span class="token punctuation">(</span><span class="token number">536479</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token function">findNextHighestNumberUsingSorting</span><span class="token punctuation">(</span><span class="token number">987654</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在第一个测试用例中，枢轴在索引4（数字7）处找到。接下来，为了找到大于枢轴（7）的最小数字，我们从pivotIndex + 1到末尾进行迭代。9大于枢轴（7），所以大于枢轴的最小数字在索引5（数字9）处找到。</p><p>现在，我们交换numChars[4]（7）和numChars[5]（9）。在我们交换和排序之后，numChars数组变为[5, 3, 6, 4, 9, 7]。</p><h3 id="_4-3-复杂度分析" tabindex="-1"><a class="header-anchor" href="#_4-3-复杂度分析"><span>4.3. 复杂度分析</span></a></h3><p><strong>这种实现的时间复杂度是O(n log n)，空间复杂度是O(n)。</strong> 这是因为排序数字的实现在O(n log n)时间内，并使用字符数组来存储数字。</p><h2 id="_5-使用双指针" tabindex="-1"><a class="header-anchor" href="#_5-使用双指针"><span>5. 使用双指针</span></a></h2><p>这种方法比排序更有效。它使用双指针来找到所需的数字并操纵它们以获得下一个更高的数字。</p><h3 id="_5-1-实现" tabindex="-1"><a class="header-anchor" href="#_5-1-实现"><span>5.1. 实现</span></a></h3><p>在我们开始主要逻辑之前，我们创建两个辅助方法来简化数组内字符的操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">swap</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> numChars<span class="token punctuation">,</span> <span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> j<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">char</span> temp <span class="token operator">=</span> numChars<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    numChars<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> numChars<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
    numChars<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">reverse</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> numChars<span class="token punctuation">,</span> <span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> j<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> j<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">swap</span><span class="token punctuation">(</span>numChars<span class="token punctuation">,</span> i<span class="token punctuation">,</span> j<span class="token punctuation">)</span><span class="token punctuation">;</span>
        i<span class="token operator">++</span><span class="token punctuation">;</span>
        j<span class="token operator">--</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们开始定义一个名为_findNextHighestNumberUsingTwoPointer()_的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">findNextHighestNumberUsingTwoPointer</span><span class="token punctuation">(</span><span class="token keyword">int</span> num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> numStr <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> numChars <span class="token operator">=</span> numStr<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> pivotIndex <span class="token operator">=</span> numChars<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> minIndex <span class="token operator">=</span> numChars<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在方法内部，我们将输入数字转换为字符数组并初始化两个变量：</p><ul><li><em>pivotIndex</em>：从数组右侧跟踪枢轴索引</li><li><em>minIndex</em>：找到大于枢轴的数字</li></ul><p>我们将_pivotIndex_初始化为倒数第二个数字，因为如果从最后一个数字（即numChars.length – 1）开始，它没有右的数字可以比较。**随后，我们使用一个_while_循环从右侧找到第一个_index <em>pivotIndex</em>，它的数字小于或等于</p>`,65),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","Finding the Next Higher Number With the Same Digits.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Finding%20the%20Next%20Higher%20Number%20With%20the%20Same%20Digits.html","title":"寻找具有相同数字的下一个更高数字 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-14T00:00:00.000Z","category":["Java"],"tag":["Algorithm","Number"],"description":"寻找具有相同数字的下一个更高数字 | Baeldung 1. 引言 在本教程中，我们将学习如何在Java中找到与原始数字具有相同数字集的下一个更高数字。这个问题可以通过使用排列、排序和双指针方法的概念来解决。 2. 问题陈述 给定一个正整数，我们需要找到使用完全相同的数字集的下一个更高数字。例如，如果输入是123，我们的目标是重新排列其数字以形成具有相...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Finding%20the%20Next%20Higher%20Number%20With%20the%20Same%20Digits.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"寻找具有相同数字的下一个更高数字 | Baeldung"}],["meta",{"property":"og:description","content":"寻找具有相同数字的下一个更高数字 | Baeldung 1. 引言 在本教程中，我们将学习如何在Java中找到与原始数字具有相同数字集的下一个更高数字。这个问题可以通过使用排列、排序和双指针方法的概念来解决。 2. 问题陈述 给定一个正整数，我们需要找到使用完全相同的数字集的下一个更高数字。例如，如果输入是123，我们的目标是重新排列其数字以形成具有相..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Algorithm"}],["meta",{"property":"article:tag","content":"Number"}],["meta",{"property":"article:published_time","content":"2024-06-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"寻找具有相同数字的下一个更高数字 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-14T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 问题陈述","slug":"_2-问题陈述","link":"#_2-问题陈述","children":[]},{"level":2,"title":"3. 使用排列","slug":"_3-使用排列","link":"#_3-使用排列","children":[{"level":3,"title":"3.1. 实现","slug":"_3-1-实现","link":"#_3-1-实现","children":[]},{"level":3,"title":"3.2. 测试","slug":"_3-2-测试","link":"#_3-2-测试","children":[]},{"level":3,"title":"3.3. 复杂度分析","slug":"_3-3-复杂度分析","link":"#_3-3-复杂度分析","children":[]}]},{"level":2,"title":"4. 使用排序","slug":"_4-使用排序","link":"#_4-使用排序","children":[{"level":3,"title":"4.1. 实现","slug":"_4-1-实现","link":"#_4-1-实现","children":[]},{"level":3,"title":"4.2. 测试","slug":"_4-2-测试","link":"#_4-2-测试","children":[]},{"level":3,"title":"4.3. 复杂度分析","slug":"_4-3-复杂度分析","link":"#_4-3-复杂度分析","children":[]}]},{"level":2,"title":"5. 使用双指针","slug":"_5-使用双指针","link":"#_5-使用双指针","children":[{"level":3,"title":"5.1. 实现","slug":"_5-1-实现","link":"#_5-1-实现","children":[]}]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":6.21,"words":1862},"filePathRelative":"posts/baeldung/Archive/Finding the Next Higher Number With the Same Digits.md","localizedDate":"2024年6月14日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将学习如何在Java中找到与原始数字具有相同数字集的下一个更高数字。这个问题可以通过使用排列、排序和双指针方法的概念来解决。</p>\\n<h2>2. 问题陈述</h2>\\n<p>给定一个正整数，我们需要找到使用完全相同的数字集的下一个更高数字。例如，如果输入是123，我们的目标是重新排列其数字以形成具有相同数字的下一个更高数字。在这种情况下，下一个更高数字将是132。</p>\\n<p>如果输入是654或444，那么我们返回-1以表示无法找到下一个更高数字。</p>\\n<h2>3. 使用排列</h2>\\n<p>在这种方法中，我们将利用排列来找到与输入数字相同的数字集的下一个更大数字。<strong>我们将生成输入数字数字的所有可能排列，并将它们添加到_TreeSet_中以确保唯一性和排序。</strong></p>","autoDesc":true}');export{k as comp,d as data};
