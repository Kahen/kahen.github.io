import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-D5kFWV-m.js";const p={},e=t(`<hr><h1 id="kotlin中统计列表中值的出现次数" tabindex="-1"><a class="header-anchor" href="#kotlin中统计列表中值的出现次数"><span>Kotlin中统计列表中值的出现次数</span></a></h1><p>在Kotlin中，_List_是一个具有特定顺序的元素集合。有时，我们可能需要找出列表中某个特定元素出现的次数。这在识别重复项或统计特定列表元素的频率等情况下非常有用。</p><p>在本教程中，我们将探讨在Kotlin中完成这项任务的几种方法。</p><h2 id="_2-使用-for-循环" tabindex="-1"><a class="header-anchor" href="#_2-使用-for-循环"><span>2. 使用_for()_循环</span></a></h2><p>使用传统的_for()_循环来找出列表中某个特定值出现的次数是一种直接的方法。我们遍历列表中的元素，并跟踪值在列表中的出现次数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">findRepeatedValuesUsingForLoop</span><span class="token punctuation">(</span>value<span class="token operator">:</span> Int<span class="token punctuation">,</span> list<span class="token operator">:</span> List\`\`\`\`<span class="token operator">&lt;</span>Int<span class="token operator">&gt;</span>\`\`\`\`<span class="token punctuation">)</span><span class="token operator">:</span> Int <span class="token punctuation">{</span>
    <span class="token keyword">var</span> count <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token keyword">in</span> <span class="token number">0</span> until list<span class="token punctuation">.</span>size <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>list<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            count<span class="token operator">++</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> count
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的方法接受两个参数：我们要检查的值和值的列表。它返回该值在列表中出现的次数。</p><p>首先，我们用零初始化一个计数器。然后，我们遍历列表元素，并在每次出现该值时递增计数器。最后，我们返回其计数作为结果。</p><p>现在，让我们确保这个方法按预期运行：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`使用for循环在列表中查找重复元素\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> list <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token function">findRepeatedValuesUsingForLoop</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> list<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token function">findRepeatedValuesUsingForLoop</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> list<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token function">findRepeatedValuesUsingForLoop</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> list<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">findRepeatedValuesUsingForLoop</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">,</span> list<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个测试正确地找到了几个元素的出现次数，并且当元素不在列表中时也能正确识别。</p><h2 id="_3-使用-count-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用-count-方法"><span>3. 使用_count()_方法</span></a></h2><p>另外，我们可以使用Kotlin中的_count()_方法来达到相同的结果。这个方法接受一个lambda函数作为参数，并返回列表中满足lambda表达式指定条件的元素数量：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`使用count方法在列表中查找重复元素\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> list <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> list<span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">{</span>it <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> list<span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">{</span>it <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> list<span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">{</span>it <span class="token operator">==</span> <span class="token number">4</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> list<span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">{</span>it <span class="token operator">==</span> <span class="token number">9</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在每个断言中，我们首先调用列表上的_count()_方法。然后，我们传入一个lambda函数，检查每个元素是否等于我们正在寻找的值。结果，该方法返回列表中与谓词匹配的元素数量。</p><h2 id="_4-使用-hashmap" tabindex="-1"><a class="header-anchor" href="#_4-使用-hashmap"><span>4. 使用_HashMap_</span></a></h2><p>我们可以探索另一种可行的方法，涉及使用_HashMap_。更准确地说，我们将使用列表中的值作为键，出现次数作为值来构建_HashMap_：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">findRepeatedValuesUsingHashMap</span><span class="token punctuation">(</span>value<span class="token operator">:</span> Int<span class="token punctuation">,</span> list<span class="token operator">:</span> List\`\`\`\`<span class="token operator">&lt;</span>Int<span class="token operator">&gt;</span>\`\`\`\`<span class="token punctuation">)</span><span class="token operator">:</span> Int <span class="token punctuation">{</span>
    <span class="token keyword">val</span> map <span class="token operator">=</span> HashMap\`\`<span class="token operator">&lt;</span>Int<span class="token punctuation">,</span> Int<span class="token operator">&gt;</span>\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>element <span class="token keyword">in</span> list<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        map<span class="token punctuation">[</span>element<span class="token punctuation">]</span> <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">getOrDefault</span><span class="token punctuation">(</span>element<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>list<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token number">0</span> <span class="token keyword">else</span> map<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们首先创建一个空的_HashMap_。然后，当我们遍历列表的元素时，我们更新映射中的计数。为了实现这一点，我们使用_getOrDefault(_)方法，它返回一个元素的当前计数，如果它不在映射中则返回零。</p><p>一旦我们将所有元素分组到频率映射中，我们就从映射中返回我们想要计数的值的出现次数。如果该值不存在，则返回零。</p><p>像往常一样，我们测试我们的方法的正确性：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`使用hashmap在列表中查找重复元素\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> list <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token function">findRepeatedValuesUsingHashMap</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> list<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token function">findRepeatedValuesUsingHashMap</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> list<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token function">findRepeatedValuesUsingHashMap</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> list<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">findRepeatedValuesUsingHashMap</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">,</span> list<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了在列表中查找重复元素的几种方法。第一种方法更简单，因为它不需要内置方法或数据结构。然而，_HashMap_和_count()_方法分别利用了数据结构和内置方法。尽管如此，我们鼓励开发人员采用任何符合他们需求的方法。</p><p>正如往常一样，本文中使用的代码可在GitHub上找到。--- date: 2022-11-01 category:</p><ul><li>Kotlin</li><li>Programming tag:</li><li>Kotlin</li><li>List</li><li>Count Occurrences head:</li><li><ul><li>meta</li><li>name: keywords content: Kotlin, List, Count Occurrences, Tutorial</li></ul></li></ul><hr><h1 id="kotlin中统计列表中值的出现次数-1" tabindex="-1"><a class="header-anchor" href="#kotlin中统计列表中值的出现次数-1"><span>Kotlin中统计列表中值的出现次数</span></a></h1><p>在Kotlin中，_List_是一个具有特定顺序的元素集合。有时，我们可能需要找出列表中某个特定元素出现的次数。这在识别重复项或统计特定列表元素的频率等情况下非常有用。</p><p>在本教程中，我们将探讨在Kotlin中完成这项任务的几种方法。</p><h2 id="_2-使用-for-循环-1" tabindex="-1"><a class="header-anchor" href="#_2-使用-for-循环-1"><span>2. 使用_for()_循环</span></a></h2><p>使用传统的_for()_循环来找出列表中某个特定值出现的次数是一种直接的方法。我们遍历列表中的元素，并跟踪值在列表中的出现次数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">findRepeatedValuesUsingForLoop</span><span class="token punctuation">(</span>value<span class="token operator">:</span> Int<span class="token punctuation">,</span> list<span class="token operator">:</span> List\`\`\`\`<span class="token operator">&lt;</span>Int<span class="token operator">&gt;</span>\`\`\`\`<span class="token punctuation">)</span><span class="token operator">:</span> Int <span class="token punctuation">{</span>
    <span class="token keyword">var</span> count <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token keyword">in</span> <span class="token number">0</span> until list<span class="token punctuation">.</span>size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>list<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            count<span class="token operator">++</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> count
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的方法接受两个参数：我们要检查的值和值的列表。它返回该值在列表中出现的次数。</p><p>首先，我们用零初始化一个计数器。然后，我们遍历列表元素，并在每次出现该值时递增计数器。最后，我们返回其计数作为结果。</p><p>现在，让我们确保这个方法按预期运行：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`使用for循环在列表中查找重复元素\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> list <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token function">findRepeatedValuesUsingForLoop</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> list<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token function">findRepeatedValuesUsingForLoop</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> list<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token function">findRepeatedValuesUsingForLoop</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> list<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">findRepeatedValuesUsingForLoop</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">,</span> list<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个测试正确地找到了几个元素的出现次数，并且当元素不在列表中时也能正确识别</p><h2 id="_3-使用-count-方法-1" tabindex="-1"><a class="header-anchor" href="#_3-使用-count-方法-1"><span>3. 使用_count()_方法</span></a></h2><p>另外，我们可以使用Kotlin中的_count()_方法来达到相同的结果。这个方法接受一个lambda函数作为参数，并返回列表中满足lambda表达式指定条件的元素数量：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`使用count方法在列表中查找重复元素\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> list <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> list<span class="token punctuation">.</span><span class="token function">count</span> <span class="token punctuation">{</span> it <span class="token operator">==</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> list<span class="token punctuation">.</span><span class="token function">count</span> <span class="token punctuation">{</span> it <span class="token operator">==</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> list<span class="token punctuation">.</span><span class="token function">count</span> <span class="token punctuation">{</span> it <span class="token operator">==</span> <span class="token number">4</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> list<span class="token punctuation">.</span><span class="token function">count</span> <span class="token punctuation">{</span> it <span class="token operator">==</span> <span class="token number">9</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在每个断言中，我们首先调用列表上的_count()_方法。然后，我们传入一个lambda函数，检查每个元素是否等于我们正在寻找的值。结果，该方法返回列表中与谓词匹配的元素数量。</p><h2 id="_4-使用-hashmap-1" tabindex="-1"><a class="header-anchor" href="#_4-使用-hashmap-1"><span>4. 使用_HashMap_</span></a></h2><p>我们可以探索另一种可行的方法，涉及使用_HashMap_。更准确地说，我们将使用列表中的值作为键，出现次数作为值来构建_HashMap_：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">findRepeatedValuesUsingHashMap</span><span class="token punctuation">(</span>value<span class="token operator">:</span> Int<span class="token punctuation">,</span> list<span class="token operator">:</span> List\`\`\`\`<span class="token operator">&lt;</span>Int<span class="token operator">&gt;</span>\`\`\`\`<span class="token punctuation">)</span><span class="token operator">:</span> Int <span class="token punctuation">{</span>
    <span class="token keyword">val</span> map <span class="token operator">=</span> HashMap\`\`<span class="token operator">&lt;</span>Int<span class="token punctuation">,</span> Int<span class="token operator">&gt;</span>\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>element <span class="token keyword">in</span> list<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        map<span class="token punctuation">[</span>element<span class="token punctuation">]</span> <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">getOrDefault</span><span class="token punctuation">(</span>element<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>list<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token number">0</span> <span class="token keyword">else</span> map<span class="token punctuation">[</span>value<span class="token punctuation">]</span><span class="token operator">!!</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们首先创建一个空的_HashMap_。然后，当我们遍历列表的元素时，我们更新映射中的计数。为了实现这一点，我们使用_getOrDefault(_)方法，它返回一个元素的当前计数，如果它不在映射中则返回零。</p><p>一旦我们将所有元素分组到频率映射中，我们就从映射中返回我们想要计数的值的出现次数。如果该值不存在，我们返回零。</p><p>像往常一样，我们测试我们的方法的正确性：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`使用hashmap在列表中查找重复元素\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> list <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token function">findRepeatedValuesUsingHashMap</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> list<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token function">findRepeatedValuesUsingHashMap</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> list<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token function">findRepeatedValuesUsingHashMap</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> list<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">findRepeatedValuesUsingHashMap</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">,</span> list<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论-1" tabindex="-1"><a class="header-anchor" href="#_5-结论-1"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了在列表中查找重复元素的几种方法。第一种方法更简单，因为它不需要内置方法或数据结构。然而，_HashMap_和_count()_方法分别利用了数据结构和内置方法。尽管如此，我们鼓励开发人员采用任何符合他们需求的方法。</p><p>正如往常一样，本文中使用的代码可在GitHub上找到。</p><p>OK</p>`,54),o=[e];function c(l,u){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-13-Counting Occurrences of a Value in a List in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Counting%20Occurrences%20of%20a%20Value%20in%20a%20List%20in%20Kotlin.html","title":"Kotlin中统计列表中值的出现次数","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Programming"],"tag":["Kotlin","List","Count Occurrences"],"head":[["meta",{"name":"keywords","content":"Kotlin, List, Count Occurrences, Tutorial"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Counting%20Occurrences%20of%20a%20Value%20in%20a%20List%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中统计列表中值的出现次数"}],["meta",{"property":"og:description","content":"Kotlin中统计列表中值的出现次数 在Kotlin中，_List_是一个具有特定顺序的元素集合。有时，我们可能需要找出列表中某个特定元素出现的次数。这在识别重复项或统计特定列表元素的频率等情况下非常有用。 在本教程中，我们将探讨在Kotlin中完成这项任务的几种方法。 2. 使用_for()_循环 使用传统的_for()_循环来找出列表中某个特定值出..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T16:45:32.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"List"}],["meta",{"property":"article:tag","content":"Count Occurrences"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T16:45:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中统计列表中值的出现次数\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T16:45:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中统计列表中值的出现次数 在Kotlin中，_List_是一个具有特定顺序的元素集合。有时，我们可能需要找出列表中某个特定元素出现的次数。这在识别重复项或统计特定列表元素的频率等情况下非常有用。 在本教程中，我们将探讨在Kotlin中完成这项任务的几种方法。 2. 使用_for()_循环 使用传统的_for()_循环来找出列表中某个特定值出..."},"headers":[{"level":2,"title":"2. 使用_for()_循环","slug":"_2-使用-for-循环","link":"#_2-使用-for-循环","children":[]},{"level":2,"title":"3. 使用_count()_方法","slug":"_3-使用-count-方法","link":"#_3-使用-count-方法","children":[]},{"level":2,"title":"4. 使用_HashMap_","slug":"_4-使用-hashmap","link":"#_4-使用-hashmap","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]},{"level":2,"title":"2. 使用_for()_循环","slug":"_2-使用-for-循环-1","link":"#_2-使用-for-循环-1","children":[]},{"level":2,"title":"3. 使用_count()_方法","slug":"_3-使用-count-方法-1","link":"#_3-使用-count-方法-1","children":[]},{"level":2,"title":"4. 使用_HashMap_","slug":"_4-使用-hashmap-1","link":"#_4-使用-hashmap-1","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论-1","link":"#_5-结论-1","children":[]}],"git":{"createdTime":1720889132000,"updatedTime":1720889132000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.55,"words":1965},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Counting Occurrences of a Value in a List in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"<hr>\\n<h1>Kotlin中统计列表中值的出现次数</h1>\\n<p>在Kotlin中，_List_是一个具有特定顺序的元素集合。有时，我们可能需要找出列表中某个特定元素出现的次数。这在识别重复项或统计特定列表元素的频率等情况下非常有用。</p>\\n<p>在本教程中，我们将探讨在Kotlin中完成这项任务的几种方法。</p>\\n<h2>2. 使用_for()_循环</h2>\\n<p>使用传统的_for()_循环来找出列表中某个特定值出现的次数是一种直接的方法。我们遍历列表中的元素，并跟踪值在列表中的出现次数：</p>\\n<div class=\\"language-kotlin\\" data-ext=\\"kt\\" data-title=\\"kt\\"><pre class=\\"language-kotlin\\"><code><span class=\\"token keyword\\">fun</span> <span class=\\"token function\\">findRepeatedValuesUsingForLoop</span><span class=\\"token punctuation\\">(</span>value<span class=\\"token operator\\">:</span> Int<span class=\\"token punctuation\\">,</span> list<span class=\\"token operator\\">:</span> List````<span class=\\"token operator\\">&lt;</span>Int<span class=\\"token operator\\">&gt;</span>````<span class=\\"token punctuation\\">)</span><span class=\\"token operator\\">:</span> Int <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">var</span> count <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span>\\n    <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token keyword\\">in</span> <span class=\\"token number\\">0</span> until list<span class=\\"token punctuation\\">.</span>size <span class=\\"token operator\\">-</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>list<span class=\\"token punctuation\\">[</span>i<span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">==</span> value<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            count<span class=\\"token operator\\">++</span>\\n        <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token keyword\\">return</span> count\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
