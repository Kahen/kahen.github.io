import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CM1q4_9A.js";const e={},p=t(`<h1 id="移除数字k位后找到可能的最大数字-baeldung" tabindex="-1"><a class="header-anchor" href="#移除数字k位后找到可能的最大数字-baeldung"><span>移除数字k位后找到可能的最大数字 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将看到不同的算法，允许我们<strong>在移除数字k位后找到可能的最大数字</strong>。</p><p>首先，我们将解释问题。然后，我们将看到两种不同的算法，它们适合我们的需求。最后，我们将讨论它们的复杂性。</p><h2 id="_2-问题解释" tabindex="-1"><a class="header-anchor" href="#_2-问题解释"><span>2. 问题解释</span></a></h2><p>首先，让我们解释算法的目标。我们想要在移除数字k位后找到可能的最大数字。</p><p>例如，考虑数字286281。我们必须移除的位数是2，所以可能的最大数字将是8681。假设我们考虑另一个k值，即2，预期的输出将是88。</p><h2 id="_3-使用算术" tabindex="-1"><a class="header-anchor" href="#_3-使用算术"><span>3. 使用算术</span></a></h2><p>在这一部分，我们将看到逻辑解释以及时间和空间复杂性。</p><h3 id="_3-1-逻辑" tabindex="-1"><a class="header-anchor" href="#_3-1-逻辑"><span>3.1. 逻辑</span></a></h3><p>让我们看看使用一些算术帮助实现我们目标的逻辑。我们将使用方法_findLargestNumberUsingArithmetic(num, k)_来实现我们的逻辑，该方法返回结果数字。</p><p>函数_findLargestNumberUsingArithmetic(n,k)_接受两个参数：（原始数字）和（要移除的位数）：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">findLargestNumberUsingArithmetic</span><span class="token punctuation">(</span><span class="token keyword">int</span> num<span class="token punctuation">,</span> <span class="token keyword">int</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//...</span>
    <span class="token keyword">return</span> num<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们有一个外层循环，迭代k次，代表要移除的位数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j \`<span class="token operator">&lt;</span> k<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于每次迭代，它进入一个内层循环，一次移除每一位数字。内层循环计算移除每一位数字后形成的数字，并将其与当前最大数字进行比较：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">while</span> <span class="token punctuation">(</span>num <span class="token operator">/</span> i <span class="token operator">&gt;</span>\` <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> temp <span class="token operator">=</span> <span class="token punctuation">(</span>num <span class="token operator">/</span> <span class="token punctuation">(</span>i <span class="token operator">*</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">*</span> i <span class="token operator">+</span> <span class="token punctuation">(</span>num <span class="token operator">%</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    i <span class="token operator">*=</span> <span class="token number">10</span><span class="token punctuation">;</span>

    result <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> temp<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
num <span class="token operator">=</span> result<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>移除数字后，如果找到了更大的数字，它将更新最大数字。</p><p>经过k次迭代后，它返回剩余的数字，代表在移除k位数字后可能的最大数字：</p><h3 id="_3-2-时间和空间复杂性" tabindex="-1"><a class="header-anchor" href="#_3-2-时间和空间复杂性"><span>3.2. 时间和空间复杂性</span></a></h3><p>代码在外层循环中迭代k次。在外层循环内，有一个while循环，它迭代_num_的位数。这个循环为每个_num_的数字执行，大约是 次，因为我们在每次迭代中都将_num_除以10。因此，内层循环的时间复杂性是_O(K*log_10N)_。</p><p>我们没有使用任何额外的空间，因此空间复杂性将是_O(1)_。</p><h2 id="_4-使用栈" tabindex="-1"><a class="header-anchor" href="#_4-使用栈"><span>4. 使用栈</span></a></h2><p>在这一部分，我们将看到一个更优化的方法来提高复杂性。</p><h3 id="_3-1-逻辑-1" tabindex="-1"><a class="header-anchor" href="#_3-1-逻辑-1"><span>3.1. 逻辑</span></a></h3><p>该方法涉及使用一个栈来跟踪数字的位数，同时确保结果数字是最大化的。</p><p>我们将使用方法_findLargestNumberUsingStack(num, k)_来实现我们的逻辑，该方法返回结果数字。</p><p>函数_findLargestNumberUsingStack(num,k)_接受两个参数：（原始数字）和（要移除的位数）。</p><p>首先将数字_num_转换为字符数组或字符串以遍历其数字：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> numStr <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> length <span class="token operator">=</span> numStr<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果移除的位数与输入数字的长度相同，我们必须返回0：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">==</span> length<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>否则，初始化一个空栈以存储数字：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Stack</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">&gt;</span></span>\` stack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，遍历数字_num_的每个数字并遵循以下步骤：</p><ul><li>当栈不为空，当前数字大于栈的顶部元素，并且剩余要移除的位数()大于0时，从栈中弹出元素</li><li>将当前数字推到栈上</li></ul><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">char</span> digit <span class="token operator">=</span> numStr<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>k <span class="token operator">&gt;</span>\` <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>stack<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> stack<span class="token punctuation">.</span><span class="token function">peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span> \`<span class="token operator">&lt;</span> digit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        k<span class="token operator">--</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>digit<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果有剩余的位数要移除()，从栈中弹出元素以满足条件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">while</span> <span class="token punctuation">(</span>k <span class="token operator">&gt;</span>\` <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    k<span class="token operator">--</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，从栈中剩余的数字构建最大数字并返回结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>stack<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">return</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-时间和空间复杂性" tabindex="-1"><a class="header-anchor" href="#_4-2-时间和空间复杂性"><span>4.2. 时间和空间复杂性</span></a></h3><p>该算法一次迭代每个数字，循环内执行恒定时间的操作。因此，时间复杂性将是_O(N)_。</p><p>所需的空间主要由用于存储数字的栈决定。因此，空间复杂性将是_O(N)_。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们检查了在移除数字k位后找到可能的最大数字的算法。我们已经看到了两种方法：算术和栈。我们还讨论了两种算法的时间和空间复杂性，使我们能够根据需要明智地选择其中之一。</p><p>像往常一样，本文中显示的完整代码示例可在GitHub上找到。</p>`,47),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-21-Find the Largest Number Possible After Removing k Digits of a Number.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-21-Find%20the%20Largest%20Number%20Possible%20After%20Removing%20k%20Digits%20of%20a%20Number.html","title":"移除数字k位后找到可能的最大数字 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Java","Algorithms"],"tag":["Largest Number","Remove Digits"],"head":[["meta",{"name":"keywords","content":"Java, Algorithms, Largest Number, Remove Digits"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-21-Find%20the%20Largest%20Number%20Possible%20After%20Removing%20k%20Digits%20of%20a%20Number.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"移除数字k位后找到可能的最大数字 | Baeldung"}],["meta",{"property":"og:description","content":"移除数字k位后找到可能的最大数字 | Baeldung 1. 概述 在本教程中，我们将看到不同的算法，允许我们在移除数字k位后找到可能的最大数字。 首先，我们将解释问题。然后，我们将看到两种不同的算法，它们适合我们的需求。最后，我们将讨论它们的复杂性。 2. 问题解释 首先，让我们解释算法的目标。我们想要在移除数字k位后找到可能的最大数字。 例如，考虑..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Largest Number"}],["meta",{"property":"article:tag","content":"Remove Digits"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"移除数字k位后找到可能的最大数字 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"移除数字k位后找到可能的最大数字 | Baeldung 1. 概述 在本教程中，我们将看到不同的算法，允许我们在移除数字k位后找到可能的最大数字。 首先，我们将解释问题。然后，我们将看到两种不同的算法，它们适合我们的需求。最后，我们将讨论它们的复杂性。 2. 问题解释 首先，让我们解释算法的目标。我们想要在移除数字k位后找到可能的最大数字。 例如，考虑..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题解释","slug":"_2-问题解释","link":"#_2-问题解释","children":[]},{"level":2,"title":"3. 使用算术","slug":"_3-使用算术","link":"#_3-使用算术","children":[{"level":3,"title":"3.1. 逻辑","slug":"_3-1-逻辑","link":"#_3-1-逻辑","children":[]},{"level":3,"title":"3.2. 时间和空间复杂性","slug":"_3-2-时间和空间复杂性","link":"#_3-2-时间和空间复杂性","children":[]}]},{"level":2,"title":"4. 使用栈","slug":"_4-使用栈","link":"#_4-使用栈","children":[{"level":3,"title":"3.1. 逻辑","slug":"_3-1-逻辑-1","link":"#_3-1-逻辑-1","children":[]},{"level":3,"title":"4.2. 时间和空间复杂性","slug":"_4-2-时间和空间复杂性","link":"#_4-2-时间和空间复杂性","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.77,"words":1132},"filePathRelative":"posts/baeldung/Archive/2024-06-21-Find the Largest Number Possible After Removing k Digits of a Number.md","localizedDate":"2024年6月21日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将看到不同的算法，允许我们<strong>在移除数字k位后找到可能的最大数字</strong>。</p>\\n<p>首先，我们将解释问题。然后，我们将看到两种不同的算法，它们适合我们的需求。最后，我们将讨论它们的复杂性。</p>\\n<h2>2. 问题解释</h2>\\n<p>首先，让我们解释算法的目标。我们想要在移除数字k位后找到可能的最大数字。</p>\\n<p>例如，考虑数字286281。我们必须移除的位数是2，所以可能的最大数字将是8681。假设我们考虑另一个k值，即2，预期的输出将是88。</p>\\n<h2>3. 使用算术</h2>\\n<p>在这一部分，我们将看到逻辑解释以及时间和空间复杂性。</p>","autoDesc":true}');export{d as comp,k as data};
