import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BUAgDejY.js";const e={},p=t(`<h1 id="kotlin中迭代列表并动态添加项" tabindex="-1"><a class="header-anchor" href="#kotlin中迭代列表并动态添加项"><span>Kotlin中迭代列表并动态添加项</span></a></h1><p>当我们使用Kotlin工作时，处理集合是一个常见且基本的任务。作为基本的集合类型，列表经常要求我们迭代其元素并在迭代过程中动态添加新项。</p><p>在本文中，我们将介绍在Kotlin中迭代列表的同时高效添加项的过程。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>像往常一样，我们通过一个例子来理解问题。假设我们有一个字符串列表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[&quot;ab&quot;, &quot;a&quot;, &quot;cd&quot;, &quot;c&quot;, &quot;xyz&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，我们想要遍历这个元素列表。<strong>一旦字符串元素的长度大于1，我们就在它后面添加一个元素“\`&lt;- 一个长的”</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[&quot;ab&quot;, &quot;&lt;- 一个长的&quot;, &quot;a&quot;, &quot;cd&quot;, &quot;&lt;- 一个长的&quot;, &quot;c&quot;, &quot;xyz&quot;, &quot;&lt;- 一个长的&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者，根据需求，<strong>我们可能需要在这些“长元素”之前添加一个字符串元素“一个长的 -&gt;\`”</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[&quot;一个长的 -&gt;&quot;, &quot;ab&quot;, &quot;a&quot;, &quot;一个长的 -&gt;&quot;, &quot;cd&quot;, &quot;c&quot;, &quot;一个长的 -&gt;&quot;, &quot;xyz&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外，<strong>Kotlin提供了只读列表和可变列表</strong>。通过考虑不同的插入位置案例以及列表的类型，我们会遇到几种不同的情况。</p><p>在本教程中，我们将讨论所有这些场景，并探索不同的解决方案来解决问题。</p><h2 id="_3-当列表是只读时" tabindex="-1"><a class="header-anchor" href="#_3-当列表是只读时"><span>3. 当列表是只读时</span></a></h2><p>假设给定的列表是一个Kotlin只读列表：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> myList <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;ab&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;cd&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;xyz&quot;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>由于列表是只读的，我们实际上不能向其中添加元素。因此，<strong>我们将创建一个可变列表，将所需的元素添加到正确的位置，然后将其作为只读列表返回</strong>。</p><p>接下来，让我们看看如何实现它。</p><h3 id="_3-1-使用-foreach-函数" tabindex="-1"><a class="header-anchor" href="#_3-1-使用-foreach-函数"><span>3.1. 使用 forEach() 函数</span></a></h3><p>一种直接的方法是创建一个空的可变列表，然后使用 forEach() 函数迭代给定的列表。<strong>在迭代过程中，我们将元素添加到预先初始化的可变列表中</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">byForEach</span><span class="token punctuation">(</span>list<span class="token operator">:</span> List\`\`\`\`<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>\`\`\`\`<span class="token punctuation">)</span><span class="token operator">:</span> List\`\`\`\`<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>\`\`\`\` <span class="token punctuation">{</span>
    <span class="token keyword">val</span> result <span class="token operator">=</span> mutableListOf\`\`\`\`<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>\`\`\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span>
    list<span class="token punctuation">.</span><span class="token function">forEach</span> <span class="token punctuation">{</span>
        result <span class="token operator">+=</span> it
        <span class="token keyword">if</span> <span class="token punctuation">(</span>it<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            result <span class="token operator">+=</span> <span class="token string-literal singleline"><span class="token string">&quot;&lt;- 一个长的&quot;</span></span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> result<span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们用我们的示例输入测试 byForEach() 函数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span>
    <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;ab&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;&lt;- 一个长的&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;cd&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;&lt;- 一个长的&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;xyz&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;&lt;- 一个长的&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">byForEach</span><span class="token punctuation">(</span>myList<span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们运行测试时，它通过了。</p><h3 id="_3-2-使用-buildlist-函数" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-buildlist-函数"><span>3.2. 使用 buildList() 函数</span></a></h3><p>我们可以使用Kotlin的 buildList() 函数来节省可变列表声明：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">byBuildList</span><span class="token punctuation">(</span>list<span class="token operator">:</span> List\`\`\`\`<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>\`\`\`\`<span class="token punctuation">)</span> <span class="token operator">=</span>
    buildList <span class="token punctuation">{</span>
        list<span class="token punctuation">.</span><span class="token function">forEach</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span> <span class="token operator">+=</span> it
            <span class="token keyword">if</span> <span class="token punctuation">(</span>it<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span> <span class="token operator">+=</span> <span class="token string-literal singleline"><span class="token string">&quot;&lt;- 一个长的&quot;</span></span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，<strong>buildList() 函数通过填充一个可变列表来构建一个新的只读列表，以适应指定的操作</strong>，例如本例中使用的 add() 或 +=（plusAssign）运算符。</p><p>如果我们使用相同的输入测试 buildList() 解决方案，它会产生预期的结果：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span>
    <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;ab&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;&lt;- 一个长的&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;cd&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;&lt;- 一个长的&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;xyz&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;&lt;- 一个长的&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">byBuildList</span><span class="token punctuation">(</span>myList<span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-在目标元素前添加元素" tabindex="-1"><a class="header-anchor" href="#_3-3-在目标元素前添加元素"><span>3.3. 在目标元素前添加元素</span></a></h3><p>到目前为止，我们的方法涉及遍历元素列表并在检测到“长元素”后添加一个新元素。如果需求转变为在每个“长元素”前添加新元素，<strong>我们可以很容易地通过交换 if 块和 result += it 或 this += it 语句来调整当前解决方案</strong>。</p><p>由于对 forEach() 和 buildList() 方法的调整非常相似，让我们使用 buildList() 作为示例来展示修改后的代码：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">addBeforeByBuildList</span><span class="token punctuation">(</span>list<span class="token operator">:</span> List\`\`\`\`<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>\`\`\`\`<span class="token punctuation">)</span> <span class="token operator">=</span>
    buildList <span class="token punctuation">{</span>
        list<span class="token punctuation">.</span><span class="token function">forEach</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>it<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span> <span class="token operator">+=</span> <span class="token string-literal singleline"><span class="token string">&quot;一个长的 -&gt;&quot;</span></span>
            <span class="token punctuation">}</span>
            <span class="token keyword">this</span> <span class="token operator">+=</span> it
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，如果我们测试这个函数，我们会得到预期的结果：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span>
    <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;一个长的 -&gt;&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;ab&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;一个长的 -&gt;&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;cd&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;一个长的 -&gt;&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;xyz&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">addBeforeByBuildList</span><span class="token punctuation">(</span>myList<span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-当列表是可变时" tabindex="-1"><a class="header-anchor" href="#_4-当列表是可变时"><span>4. 当列表是可变时</span></a></h2><p>当处理可变列表时，使用 forEach() 或 buildList() 方法是不必要的。这是因为<strong>我们可以在迭代过程中无缝地向原始可变列表添加新元素，消除了创建新列表和复制所有元素的需要</strong>。</p><p>接下来，让我们看看如何做到这一点。</p><h3 id="_4-1-使用-listiterator" tabindex="-1"><a class="header-anchor" href="#_4-1-使用-listiterator"><span>4.1. 使用 ListIterator</span></a></h3><p><strong>ListIterator 允许我们在迭代时修改列表</strong>，例如添加或删除元素。那么，让我们使用 ListIterator 来解决问题：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">byListIterator</span><span class="token punctuation">(</span>list<span class="token operator">:</span> MutableList\`\`\`\`<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>\`\`\`\`<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> it <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">listIterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>e <span class="token keyword">in</span> it<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            it<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;&lt;- 一个长的&quot;</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示的代码，<strong>我们使用 ListIterator 与 for 循环来填充可变列表中的元素</strong>。此外，当我们检测到一个“长元素”时，我们<strong>使用 ListIterator.add() 插入一个新元素</strong>。</p><p>我们可以编写一个测试来验证它是否按预期工作：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> myMutableList <span class="token operator">=</span> <span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;ab&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;cd&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;xyz&quot;</span></span><span class="token punctuation">)</span>
<span class="token function">byListIterator</span><span class="token punctuation">(</span>myMutableList<span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>
    <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;ab&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;&lt;- 一个长的&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;cd&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;&lt;- 一个长的&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;xyz&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;&lt;- 一个长的&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    myMutableList
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-在每个-长元素-前添加元素" tabindex="-1"><a class="header-anchor" href="#_4-2-在每个-长元素-前添加元素"><span>4.2. 在每个“长元素”前添加元素</span></a></h3><p>我们已经看到 ListIterator 允许我们在迭代过程中添加元素。此外，使用 ListIterator，<strong>我们可以在正向和反向两个方向上迭代列表</strong>。如果我们需要在当前条目前插入一个元素，这非常有用：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">addBeforeByListIterator</span><span class="token punctuation">(</span>list<span class="token operator">:</span> MutableList\`\`\`\`<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>\`\`\`\`<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> it <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">listIterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>e <span class="token keyword">in</span> it<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            it<span class="token punctuation">.</span><span class="token function">previous</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            it<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;一个长的 -&gt;&quot;</span></span><span class="token punctuation">)</span>
            it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 addBeforeByListIterator() 函数中，识别出“长元素”后，<strong>我们的程序包括使用 ListIterator.previous() 向后移动一步</strong>，然后使用 add() 添加指针元素。随后，<strong>我们调用 ListIterator.next() 返回到当前位置</strong>。</p><p>最后，让我们测试一下它是否解决了问题：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> myMutableList <span class="token operator">=</span> <span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;ab&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;cd&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;xyz&quot;</span></span><span class="token punctuation">)</span>
<span class="token function">addBeforeByListIterator</span><span class="token punctuation">(</span>myMutableList<span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>
    <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;一个长的 -&gt;&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;ab&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;a&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;一个长的 -&gt;&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;cd&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;一个长的 -&gt;&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;xyz&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    myMutableList
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们探讨了在迭代列表的同时添加元素的各种方法。此外，我们还查看了只读和可变列表的场景。</p><p>如常，示例的完整源代码可在GitHub上找到。</p>`,53),l=[p];function i(o,c){return a(),s("div",null,l)}const k=n(e,[["render",i],["__file","2024-07-20-Iterate Through a List and Add Items in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-Iterate%20Through%20a%20List%20and%20Add%20Items%20in%20Kotlin.html","title":"Kotlin中迭代列表并动态添加项","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","编程"],"tag":["Kotlin","列表","迭代","动态添加"],"head":[["meta",{"name":"keywords","content":"Kotlin, 列表迭代, 动态添加元素"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-Iterate%20Through%20a%20List%20and%20Add%20Items%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中迭代列表并动态添加项"}],["meta",{"property":"og:description","content":"Kotlin中迭代列表并动态添加项 当我们使用Kotlin工作时，处理集合是一个常见且基本的任务。作为基本的集合类型，列表经常要求我们迭代其元素并在迭代过程中动态添加新项。 在本文中，我们将介绍在Kotlin中迭代列表的同时高效添加项的过程。 2. 问题介绍 像往常一样，我们通过一个例子来理解问题。假设我们有一个字符串列表： 现在，我们想要遍历这个元素..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T17:39:03.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"列表"}],["meta",{"property":"article:tag","content":"迭代"}],["meta",{"property":"article:tag","content":"动态添加"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T17:39:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中迭代列表并动态添加项\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T17:39:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中迭代列表并动态添加项 当我们使用Kotlin工作时，处理集合是一个常见且基本的任务。作为基本的集合类型，列表经常要求我们迭代其元素并在迭代过程中动态添加新项。 在本文中，我们将介绍在Kotlin中迭代列表的同时高效添加项的过程。 2. 问题介绍 像往常一样，我们通过一个例子来理解问题。假设我们有一个字符串列表： 现在，我们想要遍历这个元素..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 当列表是只读时","slug":"_3-当列表是只读时","link":"#_3-当列表是只读时","children":[{"level":3,"title":"3.1. 使用 forEach() 函数","slug":"_3-1-使用-foreach-函数","link":"#_3-1-使用-foreach-函数","children":[]},{"level":3,"title":"3.2. 使用 buildList() 函数","slug":"_3-2-使用-buildlist-函数","link":"#_3-2-使用-buildlist-函数","children":[]},{"level":3,"title":"3.3. 在目标元素前添加元素","slug":"_3-3-在目标元素前添加元素","link":"#_3-3-在目标元素前添加元素","children":[]}]},{"level":2,"title":"4. 当列表是可变时","slug":"_4-当列表是可变时","link":"#_4-当列表是可变时","children":[{"level":3,"title":"4.1. 使用 ListIterator","slug":"_4-1-使用-listiterator","link":"#_4-1-使用-listiterator","children":[]},{"level":3,"title":"4.2. 在每个“长元素”前添加元素","slug":"_4-2-在每个-长元素-前添加元素","link":"#_4-2-在每个-长元素-前添加元素","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721497143000,"updatedTime":1721497143000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.9,"words":1469},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-Iterate Through a List and Add Items in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>当我们使用Kotlin工作时，处理集合是一个常见且基本的任务。作为基本的集合类型，列表经常要求我们迭代其元素并在迭代过程中动态添加新项。</p>\\n<p>在本文中，我们将介绍在Kotlin中迭代列表的同时高效添加项的过程。</p>\\n<h2>2. 问题介绍</h2>\\n<p>像往常一样，我们通过一个例子来理解问题。假设我们有一个字符串列表：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>[\\"ab\\", \\"a\\", \\"cd\\", \\"c\\", \\"xyz\\"]\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
