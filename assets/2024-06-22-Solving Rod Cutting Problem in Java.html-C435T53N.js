import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as p}from"./app-C-OIrTa1.js";const t={},e=p(`<h1 id="java中解决切割杆问题" tabindex="-1"><a class="header-anchor" href="#java中解决切割杆问题"><span>Java中解决切割杆问题</span></a></h1><p>切割杆问题是一个经典的优化问题，它涉及到找到切割杆成段的最佳方式以最大化总收入。</p><p>在本教程中，我们将理解切割杆问题，并探索在Java中解决它的各种方法。</p><h3 id="_2-理解问题" tabindex="-1"><a class="header-anchor" href="#_2-理解问题"><span>2. 理解问题</span></a></h3><p>想象我们有一根长度为_n_的杆。我们可以将这根杆切割成不同长度的段，并将这些切割后的段出售。此外，我们拥有不同长度切割杆的价格表。我们的目标是最大化总收入。</p><p>例如，考虑一根长度为_n_=4的杆，价格_Pi_ = [1,5,8,9]。_Pi_数组表示长度为_i_的杆段的价格。这意味着：</p><p>P1 = 1 表示长度为1的杆段的价格是1单位。</p><p>P2 = 5 表示长度为2的杆段的价格是5单位。</p><p>类似地，P3 = 8 表示长度为3的杆段的价格是8单位，</p><p>P4 = 9 表示长度为4的杆段的价格是9单位。</p><p>我们可以对杆进行各种切割，每次切割都会根据杆段的价格产生一定的收入。以下是长度为4的杆的可能切割方式：</p><ul><li>切割成4段1米长的段 [1,1,1,1]，产生的收入 = 1+1+1+1 = $4</li><li>切割成2段2米长的段 [2,2]，产生的收入 = 5+5 = $10</li><li>切割成1段4米长的段，产生的收入 = $9</li><li>切割成3段1米长和2米长的段 [1,1,2]，产生的收入 = 1+1+5 = $7</li><li>切割成3段1米长和2米长的段 [1,2,1]，产生的收入 = 1+5+1 = $7</li><li>切割成3段1米长和2米长的段 [2,1,1]，产生的收入 = 5+1+1 = $7</li></ul><p>在这里，我们可以看到，通过将我们的杆切割成2段2米长的段，我们可以得到总价为$10。其他任何组合都会给出更低的价格，所以我们可以看到这是最优解。</p><h3 id="_3-递归解决方案" tabindex="-1"><a class="header-anchor" href="#_3-递归解决方案"><span>3. 递归解决方案</span></a></h3><p>递归解决方案涉及将问题分解为子问题并递归地解决它们。用于计算长度为_n_的杆的最大收入的递归关系是_Rn = max1&lt;=i&lt;=n(Pi+Rn-i)_。</p><p>在上面的关系中，_Rn_表示长度为_n_的杆的最大收入，_Pi_是长度为_i_的杆段的价格。让我们实现递归解决方案：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">usingRecursion</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> prices<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">int</span> maxRevenue <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MIN_VALUE</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        maxRevenue <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>maxRevenue<span class="token punctuation">,</span> prices<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token function">usingRecursion</span><span class="token punctuation">(</span>prices<span class="token punctuation">,</span> n <span class="token operator">-</span> i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> maxRevenue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的示例中，我们检查基本情况，以确定杆的长度是否等于或小于0，从而得出收入为0。我们系统地使用递归探索所有可能的切割方式，以计算每次切割的最大收入。结果是所有切割中实现的最高收入。</p><p>现在，让我们测试这种方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenARod_whenUsingRecursion_thenFindMaxRevenue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> prices <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> rodLength <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> maxRevenue <span class="token operator">=</span> <span class="token class-name">RodCuttingProblem</span><span class="token punctuation">.</span><span class="token function">usingRecursion</span><span class="token punctuation">(</span>prices<span class="token punctuation">,</span> rodLength<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> maxRevenue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>递归方法有效且相对容易理解。然而，它的指数时间复杂度O(2<sup>n)使得它对于更大的实例来说不切实际，因为递归调用将迅速增加。所以，如果我们有一根4米长的杆，这种方法将需要2</sup>4 = 16次迭代。</p><p>这种解决方案没有直接在一个单独的数据结构如数组或映射中存储状态。然而，它利用了语言提供的调用栈来跟踪函数调用及其各自的参数和局部变量。</p><p>这种方法缺乏记忆化，导致在递归探索过程中多次解决了相同的子问题。这种效率低下在现实场景中成为重大问题，特别是对于相当长的杆。递归解决方案还可能导致堆栈溢出错误，如果递归深度过大。</p><h3 id="_4-记忆化递归解决方案" tabindex="-1"><a class="header-anchor" href="#_4-记忆化递归解决方案"><span>4. 记忆化递归解决方案</span></a></h3><p>我们可以通过使用记忆化来改进我们的递归解决方案。在这种方法中，我们将使用记忆化表来存储和重用先前解决的子问题的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">usingMemoizedRecursion</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> prices<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> memo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span>memo<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token function">memoizedHelper</span><span class="token punctuation">(</span>prices<span class="token punctuation">,</span> n<span class="token punctuation">,</span> memo<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">memoizedHelper</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> prices<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> memo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>memo<span class="token punctuation">[</span>n<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> memo<span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">int</span> maxRevenue <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MIN_VALUE</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        maxRevenue <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>maxRevenue<span class="token punctuation">,</span> prices<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token function">memoizedHelper</span><span class="token punctuation">(</span>prices<span class="token punctuation">,</span> n <span class="token operator">-</span> i<span class="token punctuation">,</span> memo<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    memo<span class="token punctuation">[</span>n<span class="token punctuation">]</span> <span class="token operator">=</span> maxRevenue<span class="token punctuation">;</span>
    <span class="token keyword">return</span> maxRevenue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个想法是通过检查一个子问题是否已经被解决来避免冗余计算，然后再解决它。我们的记忆化表以数组的形式出现，其中每个索引对应于杆的长度，相关的值保存了该特定长度的最大收入。</p><p>现在，让我们测试这种方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenARod_whenUsingMemoizedRecursion_thenFindMaxRevenue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> prices <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> rodLength <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> maxRevenue <span class="token operator">=</span> <span class="token class-name">RodCuttingProblem</span><span class="token punctuation">.</span><span class="token function">usingMemoizedRecursion</span><span class="token punctuation">(</span>prices<span class="token punctuation">,</span> rodLength<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> maxRevenue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过记忆化避免冗余计算，与简单的递归解决方案相，时间复杂度显著降低。现在，时间复杂度由解决的独特子问题的数量决定，对于切割杆问题，通常由于两个嵌套循环而为O(n^2)。</p><p>这意味着对于一根10米长的杆，我们将有100的时间复杂度，与之前的1024相比，因为我们由于修剪节点而做了更少的工作。然而，这是以空间复杂度为代价的。算法必须为每种杆长存储一个值，使其具有O(n)的空间复杂度。</p><h3 id="_5-动态规划解决方案" tabindex="-1"><a class="header-anchor" href="#_5-动态规划解决方案"><span>5. 动态规划解决方案</span></a></h3><p>解决这个问题的另一种方法是通过动态规划。动态规划通过将问题分解为更小的子问题来解决，这与分而治之算法解决技术非常相似。然而，主要的区别在于动态规划只解决一次子问题。</p><h4 id="_5-1-迭代-自底向上-方法" tabindex="-1"><a class="header-anchor" href="#_5-1-迭代-自底向上-方法"><span>5.1. 迭代（自底向上）方法</span></a></h4><p>在这种方法中，避免递归并使用迭代过程消除了与递归解决方案相关的函数调用开销，有助于提高性能：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">usingDynamicProgramming</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> prices<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> dp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> maxRevenue <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MIN_VALUE</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> j <span class="token operator">&lt;=</span> i<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            maxRevenue <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>maxRevenue<span class="token punctuation">,</span> prices<span class="token punctuation">[</span>j <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+</span> dp<span class="token punctuation">[</span>i <span class="token operator">-</span> j<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> maxRevenue<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> dp<span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们也测试这种方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenARod_whenUsingDynamicProgramming_thenFindMaxRevenue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> prices <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> rodLength <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> maxRevenue <span class="token operator">=</span> <span class="token class-name">RodCuttingProblem</span><span class="token punctuation">.</span><span class="token function">usingDynamicProgramming</span><span class="token punctuation">(</span>prices<span class="token punctuation">,</span> rodLength<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> maxRevenue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的动态规划表由_dp_数组表示，它存储了每个子问题的最优解，其中索引_i_对应于杆的长度，_dp[i]_保存了最大收入。_dp_数组中的最后一个条目，_dp[n],_包含了原始问题的最大收入，即长度为_n_的杆。</p><p>这种方法也是内存高效的，因为它不需要额外的记忆化表。</p><h4 id="_5-2-无界背包解决方案" tabindex="-1"><a class="header-anchor" href="#_5-2-无界背包解决方案"><span>5.2. 无界背包解决方案</span></a></h4><p>无界背包方法是用于解决优化问题的动态规划技术，其中一项可以无限次选择。这意味着如果相同的切割长度被选择并包含在杆中多次，有助于最大化收入，可以选择相同的切割长度。让我们看看实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">usingUnboundedKnapsack</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> prices<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> dp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> prices<span class="token punctuation">.</span>length<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>j <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">&lt;=</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> dp<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token punctuation">(</span>j<span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">+</span> prices<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> dp<span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类似于迭代（自底向上）方法，这个算法计算每个杆长的最大收入。让我们测试这种方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenARod_whenUsingGreedy_thenFindMaxRevenue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> prices <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> rodLength <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> maxRevenue <span class="token operator">=</span> <span class="token class-name">RodCuttingProblem</span><span class="token punctuation">.</span><span class="token function">usingUnboundedKnapsack</span><span class="token punctuation">(</span>prices<span class="token punctuation">,</span> rodLength<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> maxRevenue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法的缺点是可能增加的空间复杂度。</p><h3 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h3><p>在本教程中，我们理解了切割杆问题，并讨论了解决它的各种方法。</p><p><strong>递归方法提供了简单性，但遭受指数级时间复杂度的困扰。记忆化方法通过重用解决方案解决了这个问题，并引入了轻微的空间复杂度。迭代方法进一步提高了效率，消除了递归开销。</strong></p><p>选择这些方法取决于特定的问题特征，涉及时间、空间和实现复杂度之间的权衡。</p><p>和往常一样，示例中使用的代码可以在GitHub上找到。 OK</p>`,51),o=[e];function c(i,l){return a(),s("div",null,o)}const r=n(t,[["render",c],["__file","2024-06-22-Solving Rod Cutting Problem in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-Solving%20Rod%20Cutting%20Problem%20in%20Java.html","title":"Java中解决切割杆问题","lang":"zh-CN","frontmatter":{"date":"2024-06-22T00:00:00.000Z","category":["Java","算法"],"tag":["动态规划","递归"],"head":[["meta",{"name":"keywords","content":"Java, 算法, 动态规划, 递归, 切割问题"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-Solving%20Rod%20Cutting%20Problem%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中解决切割杆问题"}],["meta",{"property":"og:description","content":"Java中解决切割杆问题 切割杆问题是一个经典的优化问题，它涉及到找到切割杆成段的最佳方式以最大化总收入。 在本教程中，我们将理解切割杆问题，并探索在Java中解决它的各种方法。 2. 理解问题 想象我们有一根长度为_n_的杆。我们可以将这根杆切割成不同长度的段，并将这些切割后的段出售。此外，我们拥有不同长度切割杆的价格表。我们的目标是最大化总收入。 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T07:27:08.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"动态规划"}],["meta",{"property":"article:tag","content":"递归"}],["meta",{"property":"article:published_time","content":"2024-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T07:27:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中解决切割杆问题\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T07:27:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中解决切割杆问题 切割杆问题是一个经典的优化问题，它涉及到找到切割杆成段的最佳方式以最大化总收入。 在本教程中，我们将理解切割杆问题，并探索在Java中解决它的各种方法。 2. 理解问题 想象我们有一根长度为_n_的杆。我们可以将这根杆切割成不同长度的段，并将这些切割后的段出售。此外，我们拥有不同长度切割杆的价格表。我们的目标是最大化总收入。 ..."},"headers":[{"level":3,"title":"2. 理解问题","slug":"_2-理解问题","link":"#_2-理解问题","children":[]},{"level":3,"title":"3. 递归解决方案","slug":"_3-递归解决方案","link":"#_3-递归解决方案","children":[]},{"level":3,"title":"4. 记忆化递归解决方案","slug":"_4-记忆化递归解决方案","link":"#_4-记忆化递归解决方案","children":[]},{"level":3,"title":"5. 动态规划解决方案","slug":"_5-动态规划解决方案","link":"#_5-动态规划解决方案","children":[]},{"level":3,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719041228000,"updatedTime":1719041228000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.09,"words":2128},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-Solving Rod Cutting Problem in Java.md","localizedDate":"2024年6月22日","excerpt":"\\n<p>切割杆问题是一个经典的优化问题，它涉及到找到切割杆成段的最佳方式以最大化总收入。</p>\\n<p>在本教程中，我们将理解切割杆问题，并探索在Java中解决它的各种方法。</p>\\n<h3>2. 理解问题</h3>\\n<p>想象我们有一根长度为_n_的杆。我们可以将这根杆切割成不同长度的段，并将这些切割后的段出售。此外，我们拥有不同长度切割杆的价格表。我们的目标是最大化总收入。</p>\\n<p>例如，考虑一根长度为_n_=4的杆，价格_Pi_ = [1,5,8,9]。_Pi_数组表示长度为_i_的杆段的价格。这意味着：</p>\\n<p>P1 = 1 表示长度为1的杆段的价格是1单位。</p>\\n<p>P2 = 5 表示长度为2的杆段的价格是5单位。</p>","autoDesc":true}');export{r as comp,d as data};
