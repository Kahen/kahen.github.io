import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-C2EXT5sr.js";const p={},e=t(`<hr><h1 id="从字符串中移除另一个字符串中存在的字符" tabindex="-1"><a class="header-anchor" href="#从字符串中移除另一个字符串中存在的字符"><span>从字符串中移除另一个字符串中存在的字符</span></a></h1><p>当我们使用Java时，经常会遇到需要精确度和元素间协作的任务。基于另一个字符串中的存在来移除字符串中的字符就是这样一个问题。</p><p>在本教程中，我们将探索实现此任务的各种技术。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>像往常一样，一个例子可以帮助我们快速理解问题。假设我们有两个字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token constant">STRING</span> <span class="token operator">=</span> <span class="token string">&quot;a b c d e f g h i j&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> <span class="token constant">OTHER</span> <span class="token operator">=</span> <span class="token string">&quot;bdfhj&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的目标是<strong>从_STRING_字符串中移除存在于_OTHER_字符串中的字符</strong>。因此，我们期望得到以下字符串作为结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token string">&quot;a  c  e  g  i &quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在本教程中，我们将学习解决这个问题的各种方法。我们还将对这些解决方案进行单元测试，以验证它们是否产生预期的结果。</p><h2 id="_3-使用嵌套循环" tabindex="-1"><a class="header-anchor" href="#_3-使用嵌套循环"><span>3. 使用嵌套循环</span></a></h2><p>我们知道，可以使用标准的_toCharArray()_方法将字符串轻松地分割成_char_数组。因此，一种直接且经典的方法是首先将两个字符串转换为两个_char_数组。然后，<strong>对于_STRING_中的每个字符，我们通过检查它是否在_OTHER_中来决定是否要移除它</strong>。</p><p>我们可以使用嵌套的for循环来实现这个逻辑：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">nestedLoopApproach</span><span class="token punctuation">(</span><span class="token class-name">String</span> theString<span class="token punctuation">,</span> <span class="token class-name">String</span> other<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">char</span> c <span class="token operator">:</span> theString<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">boolean</span> found <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">char</span> o <span class="token operator">:</span> other<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>c <span class="token operator">==</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                found <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>found<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> sb<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，由于Java字符串是不可变对象，我们使用_StringBuilder_而不是&#39;+&#39;运算符来连接字符串，以获得更好的性能。</p><p>接下来，让我们创建一个测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token function">nestedLoopApproach</span><span class="token punctuation">(</span><span class="token constant">STRING</span><span class="token punctuation">,</span> <span class="token constant">OTHER</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;a  c  e  g  i &quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，测试就会通过，所以这个方法是有效的。</p><p>由于对于_STRING_中的每个字符，我们都要检查一遍_OTHER_字符串，<strong>这个解决方案的时间复杂度是O(n^2)</strong>。</p><h2 id="_4-用-indexof-方法替换内层循环" tabindex="-1"><a class="header-anchor" href="#_4-用-indexof-方法替换内层循环"><span>4. 用_indexOf()_方法替换内层循环</span></a></h2><p>在嵌套循环解决方案中，我们创建了_boolean_标志_found_来存储当前字符是否在_OTHER_字符串中找到，然后通过检查_found_标志来决定我们是否需要保留或丢弃这个字符。</p><p>Java提供了_String.indexOf()<em>方法，允许我们在字符串中定位给定的字符。此外，**如果字符串不包含给定的字符，该方法返回</em>-1_**。</p><p>所以，如果我们使用_String.indexOf()_方法，就不需要内层循环和_found_标志了：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">loopAndIndexOfApproach</span><span class="token punctuation">(</span><span class="token class-name">String</span> theString<span class="token punctuation">,</span> <span class="token class-name">String</span> other<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">char</span> c <span class="token operator">:</span> theString<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>other<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> sb<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，这种方法的代码比嵌套循环更容易理解，并且它也通过了测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token function">loopAndIndexOfApproach</span><span class="token punctuation">(</span><span class="token constant">STRING</span><span class="token punctuation">,</span> <span class="token constant">OTHER</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;a  c  e  g  i &quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管这个实现紧凑且易于阅读，<strong>由于_String.indexOf()_方法内部通过循环搜索字符串中的字符，其时间复杂度仍然是O(n^2)</strong>。</p><p>接下来，让我们看看是否可以找到一个时间复杂度更低的解决方案。</p><h2 id="_5-使用-hashset" tabindex="-1"><a class="header-anchor" href="#_5-使用-hashset"><span>5. 使用_HashSet_</span></a></h2><p>_HashSet_是一个常用的集合数据结构。它在内部_HashMap_中存储元素。</p><p><strong>由于哈希函数的时间复杂度是O(1)，_HashSet_的_contains()_方法是O(1)操作</strong>。</p><p>因此，我们可以先在_HashSet_中存储_OTHER_字符串中的所有字符，然后检查_STRING_中的每个字符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">hashSetApproach</span><span class="token punctuation">(</span><span class="token class-name">String</span> theString<span class="token punctuation">,</span> <span class="token class-name">String</span> other<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Set</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">&gt;</span></span>\` set <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>other<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">char</span> c <span class="token operator">:</span> other<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">char</span> i <span class="token operator">:</span> theString<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>set<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">continue</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> sb<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码所示，实现相当直接。现在，让我们深入了解其性能。</p><p>最初，我们遍历一个字符串来填充_Set_对象，使其成为O(n)操作。随后，对于另一个字符串中的每个字符，我们使用_set.contains()_方法。这导致n次O(1)，成为另一个O(n)复杂度。因此，<strong>整个解决方案包括两个O(n)操作</strong>。</p><p>然而，<strong>由于两个因素是一个常数，解决方案的整体时间复杂度仍然是O(n)</strong>。与之前的O(n^2)解决方案相比，这是一个显著的改进，表现出更快的执行速度。</p><p>最后，如果我们测试_hashSetApproach()_方法，它给出了预期的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token function">hashSetApproach</span><span class="token punctuation">(</span><span class="token constant">STRING</span><span class="token punctuation">,</span> <span class="token constant">OTHER</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;a  c  e  g  i &quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了基于另一个字符串中的存在来从字符串中移除字符的三种不同方法。</p><p>此外，我们进行了性能分析，特别关注时间复杂度。结果揭示了嵌套循环和使用_indexOf()_的循环具有相同的时间复杂度，而使用_HashSet_的解决方案是最高效的。</p><p>如往常一样，示例的完整源代码可在GitHub上获得。</p>`,42),o=[e];function c(i,l){return s(),a("div",null,o)}const d=n(p,[["render",c],["__file","2024-06-24-Remove Characters From a String That Are in the Other String.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-Remove%20Characters%20From%20a%20String%20That%20Are%20in%20the%20Other%20String.html","title":"从字符串中移除另一个字符串中存在的字符","lang":"zh-CN","frontmatter":{"category":["Java","字符串操作"],"tag":["Java","字符串","性能分析"],"head":[["meta",{"name":"keywords","content":"Java, 字符串, 性能分析"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-Remove%20Characters%20From%20a%20String%20That%20Are%20in%20the%20Other%20String.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"从字符串中移除另一个字符串中存在的字符"}],["meta",{"property":"og:description","content":"从字符串中移除另一个字符串中存在的字符 当我们使用Java时，经常会遇到需要精确度和元素间协作的任务。基于另一个字符串中的存在来移除字符串中的字符就是这样一个问题。 在本教程中，我们将探索实现此任务的各种技术。 2. 问题介绍 像往常一样，一个例子可以帮助我们快速理解问题。假设我们有两个字符串： 我们的目标是从_STRING_字符串中移除存在于_OTH..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T21:25:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"字符串"}],["meta",{"property":"article:tag","content":"性能分析"}],["meta",{"property":"article:modified_time","content":"2024-06-24T21:25:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"从字符串中移除另一个字符串中存在的字符\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-06-24T21:25:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"从字符串中移除另一个字符串中存在的字符 当我们使用Java时，经常会遇到需要精确度和元素间协作的任务。基于另一个字符串中的存在来移除字符串中的字符就是这样一个问题。 在本教程中，我们将探索实现此任务的各种技术。 2. 问题介绍 像往常一样，一个例子可以帮助我们快速理解问题。假设我们有两个字符串： 我们的目标是从_STRING_字符串中移除存在于_OTH..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用嵌套循环","slug":"_3-使用嵌套循环","link":"#_3-使用嵌套循环","children":[]},{"level":2,"title":"4. 用_indexOf()_方法替换内层循环","slug":"_4-用-indexof-方法替换内层循环","link":"#_4-用-indexof-方法替换内层循环","children":[]},{"level":2,"title":"5. 使用_HashSet_","slug":"_5-使用-hashset","link":"#_5-使用-hashset","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719264356000,"updatedTime":1719264356000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.32,"words":1297},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-Remove Characters From a String That Are in the Other String.md","localizedDate":"2024年6月24日","excerpt":"<hr>\\n<h1>从字符串中移除另一个字符串中存在的字符</h1>\\n<p>当我们使用Java时，经常会遇到需要精确度和元素间协作的任务。基于另一个字符串中的存在来移除字符串中的字符就是这样一个问题。</p>\\n<p>在本教程中，我们将探索实现此任务的各种技术。</p>\\n<h2>2. 问题介绍</h2>\\n<p>像往常一样，一个例子可以帮助我们快速理解问题。假设我们有两个字符串：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span> <span class=\\"token constant\\">STRING</span> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"a b c d e f g h i j\\"</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token class-name\\">String</span> <span class=\\"token constant\\">OTHER</span> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"bdfhj\\"</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
