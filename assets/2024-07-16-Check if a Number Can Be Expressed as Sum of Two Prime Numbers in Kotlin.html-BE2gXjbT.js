import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-8nJ1rqSf.js";const t={},p=e(`<h1 id="kotlin中检查一个数是否可以表示为两个质数之和" tabindex="-1"><a class="header-anchor" href="#kotlin中检查一个数是否可以表示为两个质数之和"><span>Kotlin中检查一个数是否可以表示为两个质数之和</span></a></h1><p>质数展现出了有趣的数学属性，并在数学领域如密码学、金融算法等方面具有相关性。</p><p>在本教程中，<strong>我们将学习如何在Kotlin中检查一个数是否可以表示为两个质数的和</strong>。</p><h2 id="_2-理解场景" tabindex="-1"><a class="header-anchor" href="#_2-理解场景"><span>2. 理解场景</span></a></h2><p>让我们首先看看一些可以表示为两个质数之和的数字：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> sumOfTwoPrimes <span class="token operator">=</span> <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token number">28</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在_sumOfTwoPrimes_数组中，数字_10_、<em>13</em>、<em>25_和_28_可以分别表示为_3</em> + <em>7</em>、<em>2</em> + <em>11</em>、<em>2</em> + <em>23_和_11</em> + <em>17</em>。每个都是两个质数的和。</p><p>现在，我们再来看看_notSumOfTwoPrimes_数组，其中数字不能被定义为两个质数的和：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> notSumOfTwoPrimes <span class="token operator">=</span> <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">27</span><span class="token punctuation">,</span> <span class="token number">51</span><span class="token punctuation">,</span> <span class="token number">57</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在下一节中，<strong>我们将使用这两个数组来验证每个解决方案</strong>。</p><h2 id="_3-使用蛮力方法" tabindex="-1"><a class="header-anchor" href="#_3-使用蛮力方法"><span>3. 使用蛮力方法</span></a></h2><p>在这一部分，我们将学习使用蛮力方法来解决我们的问题。</p><h3 id="_3-1-算法" tabindex="-1"><a class="header-anchor" href="#_3-1-算法"><span>3.1. 算法</span></a></h3><p>让我们首先编写_checkPrimeUsingBruteForce()_函数来评估给定的数字是否是质数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">checkPrimeUsingBruteForce</span><span class="token punctuation">(</span>number<span class="token operator">:</span> Int<span class="token punctuation">)</span><span class="token operator">:</span> Boolean <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>number <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token keyword">in</span> <span class="token number">2</span> until number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>number <span class="token operator">%</span> i <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种方法中，<strong>我们检查数字是否能够被范围_[2, number)_中的任何数字整除</strong>。</p><p>现在，让我们编写使用蛮力算法来检查一个数（<em>n</em>）是否可以表示为两个质数的和的函数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">canBeExpressedAsSumOfTwoPrimesUsingBruteForceApproach</span><span class="token punctuation">(</span>n<span class="token operator">:</span> Int<span class="token punctuation">)</span><span class="token operator">:</span> Boolean <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token keyword">in</span> <span class="token number">2</span><span class="token operator">..</span>n <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">checkPrimeUsingBruteForce</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">checkPrimeUsingBruteForce</span><span class="token punctuation">(</span>n <span class="token operator">-</span> i<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们把_n_表示为和（<em>i</em>）+（n – i），其中_i_在范围_[2, n/2]<em>中。**如果_i_和_n-i_都是质数，那么我们返回_true</em>**。</p><h3 id="_3-2-验证" tabindex="-1"><a class="header-anchor" href="#_3-2-验证"><span>3.2. 验证</span></a></h3><p>首先，我们可以<strong>检查_sumOfTwoPrimes_数组中的所有正例</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">for</span> <span class="token punctuation">(</span>n <span class="token keyword">in</span> sumOfTwoPrimes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> result <span class="token operator">=</span> <span class="token function">canBeExpressedAsSumOfTwoPrimesUsingBruteForceApproach</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>太好了！看起来我们做对了。</p><p>接下来，我们可以检查_notSumOfTwoPrimes_数组中的负例：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">for</span> <span class="token punctuation">(</span>n <span class="token keyword">in</span> notSumOfTwoPrimes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> result <span class="token operator">=</span> <span class="token function">canBeExpressedAsSumOfTwoPrimesUsingBruteForceApproach</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的方法看起来是正确的。</p><h2 id="_4-使用埃拉托斯特尼筛法" tabindex="-1"><a class="header-anchor" href="#_4-使用埃拉托斯特尼筛法"><span>4. 使用埃拉托斯特尼筛法</span></a></h2><p>在这一部分，我们将<strong>使用古老的算法，埃拉托斯特尼筛法，来找出一个限制内的质数</strong>。进一步地，我们将使用它来检查一个数是否可以表示为两个质数的和。</p><h3 id="_4-1-算法" tabindex="-1"><a class="header-anchor" href="#_4-1-算法"><span>4.1. 算法</span></a></h3><p>让我们首先编写_sieveOfEratosthenes()<em>函数，它接受一个整数_n_作为输入，并返回一个_BooleanArray</em>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">sieveOfEratosthenes</span><span class="token punctuation">(</span>n<span class="token operator">:</span> Int<span class="token punctuation">)</span><span class="token operator">:</span> BooleanArray <span class="token punctuation">{</span>
    <span class="token keyword">val</span> primes <span class="token operator">=</span> <span class="token function">BooleanArray</span><span class="token punctuation">(</span>n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
    primes<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">false</span>
    primes<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>p <span class="token keyword">in</span> <span class="token number">2</span><span class="token operator">..</span>n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>primes<span class="token punctuation">[</span>p<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token keyword">in</span> p <span class="token operator">*</span> p<span class="token operator">..</span>n step p<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                primes<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">false</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> primes
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用一个_BooleanArray_，<em>primes</em>，来标记一个数字是否是质数。进一步地，<strong>在_for_循环中，我们标记一个质数_p_的所有倍数，在范围_[2,n]_中为非质数</strong>。最后，我们返回_primes_。</p><p>现在，让我们编写使用_sieveOfEratosthenes()_函数来检查我们是否可以将_n_表示为两个质数的和的函数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">canBeExpressedAsSumOfTwoPrimesUsingSieveOfEratosthenes</span><span class="token punctuation">(</span>n<span class="token operator">:</span> Int<span class="token punctuation">)</span><span class="token operator">:</span> Boolean <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span>
    <span class="token keyword">val</span> primes <span class="token operator">=</span> <span class="token function">sieveOfEratosthenes</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token keyword">in</span> <span class="token number">2</span> until n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>primes<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> primes<span class="token punctuation">[</span>n <span class="token operator">-</span> i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于_n &lt; 2_，我们立即返回_false_。对于更高的数字，我们预先计算_primes_数组中的质数。因此，我们可以<strong>有效地确定如果_primes[i]<em>对于任何i在范围</em>[2,n)_中为真</strong>。当_i_和_n-i_都是质数时，我们返回_true_。</p><h3 id="_4-2-验证" tabindex="-1"><a class="header-anchor" href="#_4-2-验证"><span>4.2. 验证</span></a></h3><p>让我们<strong>验证_sumOfTwoPrimes_数组中定义的所有数字的解决方案</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">for</span> <span class="token punctuation">(</span>n <span class="token keyword">in</span> sumOfTwoPrimes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> result <span class="token operator">=</span> <span class="token function">canBeExpressedAsSumOfTwoPrimesUsingSieveOfEratosthenes</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>太好了！它给出了正确的结果。</p><p>现在，让我们也检查它是否正确地为_notSumOfTwoPrimes_数组中定义的所有数字工作：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">for</span> <span class="token punctuation">(</span>n <span class="token keyword">in</span> notSumOfTwoPrimes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> result <span class="token operator">=</span> <span class="token function">canBeExpressedAsSumOfTwoPrimesUsingSieveOfEratosthenes</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>太好了！正如预期的，我们的函数为这种情况返回_false_。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，<strong>我们探索了多种方法来检查一个数是否可以表示为两个质数的和</strong>。具体来说，我们学习了蛮力方法和埃拉托斯特尼筛法来解决这个用例。</p><p>正如往常一样，本文的代码可以在GitHub上找到。</p>`,45),o=[p];function i(l,c){return a(),s("div",null,o)}const k=n(t,[["render",i],["__file","2024-07-16-Check if a Number Can Be Expressed as Sum of Two Prime Numbers in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-Check%20if%20a%20Number%20Can%20Be%20Expressed%20as%20Sum%20of%20Two%20Prime%20Numbers%20in%20Kotlin.html","title":"Kotlin中检查一个数是否可以表示为两个质数之和","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Algorithm"],"tag":["Prime Numbers","Sum","Check","Kotlin"],"head":[["meta",{"name":"keywords","content":"Kotlin, Prime Numbers, Sum, Check, Algorithm"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-Check%20if%20a%20Number%20Can%20Be%20Expressed%20as%20Sum%20of%20Two%20Prime%20Numbers%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中检查一个数是否可以表示为两个质数之和"}],["meta",{"property":"og:description","content":"Kotlin中检查一个数是否可以表示为两个质数之和 质数展现出了有趣的数学属性，并在数学领域如密码学、金融算法等方面具有相关性。 在本教程中，我们将学习如何在Kotlin中检查一个数是否可以表示为两个质数的和。 2. 理解场景 让我们首先看看一些可以表示为两个质数之和的数字： 在_sumOfTwoPrimes_数组中，数字_10_、13、25_和_28..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T03:10:39.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Prime Numbers"}],["meta",{"property":"article:tag","content":"Sum"}],["meta",{"property":"article:tag","content":"Check"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T03:10:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中检查一个数是否可以表示为两个质数之和\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T03:10:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中检查一个数是否可以表示为两个质数之和 质数展现出了有趣的数学属性，并在数学领域如密码学、金融算法等方面具有相关性。 在本教程中，我们将学习如何在Kotlin中检查一个数是否可以表示为两个质数的和。 2. 理解场景 让我们首先看看一些可以表示为两个质数之和的数字： 在_sumOfTwoPrimes_数组中，数字_10_、13、25_和_28..."},"headers":[{"level":2,"title":"2. 理解场景","slug":"_2-理解场景","link":"#_2-理解场景","children":[]},{"level":2,"title":"3. 使用蛮力方法","slug":"_3-使用蛮力方法","link":"#_3-使用蛮力方法","children":[{"level":3,"title":"3.1. 算法","slug":"_3-1-算法","link":"#_3-1-算法","children":[]},{"level":3,"title":"3.2. 验证","slug":"_3-2-验证","link":"#_3-2-验证","children":[]}]},{"level":2,"title":"4. 使用埃拉托斯特尼筛法","slug":"_4-使用埃拉托斯特尼筛法","link":"#_4-使用埃拉托斯特尼筛法","children":[{"level":3,"title":"4.1. 算法","slug":"_4-1-算法","link":"#_4-1-算法","children":[]},{"level":3,"title":"4.2. 验证","slug":"_4-2-验证","link":"#_4-2-验证","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721099439000,"updatedTime":1721099439000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.58,"words":1075},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-Check if a Number Can Be Expressed as Sum of Two Prime Numbers in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>质数展现出了有趣的数学属性，并在数学领域如密码学、金融算法等方面具有相关性。</p>\\n<p>在本教程中，<strong>我们将学习如何在Kotlin中检查一个数是否可以表示为两个质数的和</strong>。</p>\\n<h2>2. 理解场景</h2>\\n<p>让我们首先看看一些可以表示为两个质数之和的数字：</p>\\n<div class=\\"language-kotlin\\" data-ext=\\"kt\\" data-title=\\"kt\\"><pre class=\\"language-kotlin\\"><code><span class=\\"token keyword\\">val</span> sumOfTwoPrimes <span class=\\"token operator\\">=</span> <span class=\\"token function\\">arrayOf</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">10</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">13</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">25</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">28</span><span class=\\"token punctuation\\">)</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
