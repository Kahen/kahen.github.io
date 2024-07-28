import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-D4B8YWfq.js";const p={},o=t(`<hr><h1 id="java中以自然语言方式连接列表" tabindex="-1"><a class="header-anchor" href="#java中以自然语言方式连接列表"><span>Java中以自然语言方式连接列表</span></a></h1><p>当处理字符串集合时，使用特定分隔符连接这些字符串是一项常见任务。幸运的是，我们有多种解决方案可供选择，包括使用_String.join()<em>和_Collectors.joining()</em>。</p><p>在这个快速教程中，我们将探索一个有趣的字符串连接问题：以更接近自然语言的方式连接字符串。</p><h3 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h3><p>让我们通过一个例子来理解问题。假设我们有一个字符串列表_{“A”，“B”，“C”，“D”}_。如果我们想用逗号作为分隔符将它们连接起来，结果将是“<em>A, B, C, D</em>”。到目前为止，一切顺利。</p><p>然而，如果我们希望连接的结果遵循英语语法，<strong>预期的输出应该是“A, B, C and D”或“A, B, C, and D”</strong>。我们稍后将看到为什么有两种变体。但至少我们明白结果不是我们可以直接从_String.join()_或_Collectors.joining()_方法调用中获得的。</p><p>在上面的例子中，“_C”和“and”之间的逗号被称为牛津逗号或哈佛逗号。关于哪种风格更精确的讨论很多。但这并不是我们的重点。我们的目标是创建一个支持两种场景的方法。</p><p>所以，<strong>给定一个包含三个或更多字符串元素的列表，例如_{“A”，“B”，“C”，… “X”，“Y”}_，我们可能会根据要求得到两种不同的结果：</strong></p><ul><li>使用牛津逗号——<strong>“A, B, C, … X and Y”</strong></li><li>不使用牛津逗号——<strong>“A, B, C, … X, and Y”</strong></li></ul><p>此外，我们只讨论了至少有三个元素的列表的情况。如果列表包含少于三个元素，结果可能会有所不同：</p><ul><li>对于空列表，返回空字符串，所以，<em><strong>{}</strong></em> 变成 <em><strong>“”</strong></em></li><li>对于包含单个元素的列表，返回该元素。例如，<em><strong>{“A”}</strong></em> 变成 <em><strong>“A”</strong></em></li><li>当处理包含两个字符串元素的列表时，使用“and”这个词将它们连接起来，不使用逗号。例如，<em><strong>{“A”, “B”}</strong></em> 变成 <em><strong>“A and B”</strong></em></li></ul><p>接下来，让我们创建一个以自然语言方式连接字符串列表的方法。为了简单起见，我们假设**输入列表不是null，并且不包含null或空字符串元素。**在实践中，如果列表包含空或null字符串，我们可以先过滤掉这些元素。</p><h3 id="_3-创建-joinitemsasnaturallanguage-方法" tabindex="-1"><a class="header-anchor" href="#_3-创建-joinitemsasnaturallanguage-方法"><span>3. 创建 <em>joinItemsAsNaturalLanguage()</em> 方法</span></a></h3><p>首先，让我们看看方法的实现，然后了解它的工作原理：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">joinItemsAsNaturalLanguage</span><span class="token punctuation">(</span><span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` list<span class="token punctuation">,</span> <span class="token keyword">boolean</span> oxfordComma<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>list<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&quot; and &quot;</span><span class="token punctuation">,</span> list<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 列表至少有三个元素</span>
    <span class="token keyword">int</span> lastIdx <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>

    <span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&quot;, &quot;</span><span class="token punctuation">,</span> list<span class="token punctuation">.</span><span class="token function">subList</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> lastIdx<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>oxfordComma <span class="token operator">?</span> <span class="token string">&quot;, and &quot;</span> <span class="token operator">:</span> <span class="token string">&quot; and &quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>list<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>lastIdx<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们快速浏览一下代码。首先，我们使用_String.join(&quot; and &quot;, list)_处理列表包含少于三个元素的情况。</p><p>然后，如果列表包含三个或更多字符串，<strong>我们使用“, ”作为分隔符来连接输入列表的一个子列表中的元素</strong>，这排除了最后一个字符串。最后，我们根据_oxfordComma_选项，将连接的结果与最后一个元素和“and”连接起来。</p><p>值得注意的是，**我们不应该采取首先用逗号连接所有元素，然后替换最后一个逗号为“and”的方法。**这是因为最后一个元素也可能包含逗号。</p><p>让我们测试一下不使用牛津逗号的解决方案：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token function">joinItemsAsNaturalLanguage</span><span class="token punctuation">(</span><span class="token function">emptyList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token function">joinItemsAsNaturalLanguage</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;A and B&quot;</span><span class="token punctuation">,</span> <span class="token function">joinItemsAsNaturalLanguage</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;A, B, C, D and I have a comma (,)&quot;</span><span class="token punctuation">,</span> <span class="token function">joinItemsAsNaturalLanguage</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;D&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;I have a comma (,)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们测试使用牛津逗号的情况：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token function">joinItemsAsNaturalLanguage</span><span class="token punctuation">(</span><span class="token function">emptyList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token function">joinItemsAsNaturalLanguage</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;A and B&quot;</span><span class="token punctuation">,</span> <span class="token function">joinItemsAsNaturalLanguage</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;A, B, C, D, and I have a comma (,)&quot;</span><span class="token punctuation">,</span> <span class="token function">joinItemsAsNaturalLanguage</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;D&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;I have a comma (,)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h3><p>在本文中，我们讨论了以自然语言方式连接字符串列表的问题。我们还学习了如何创建一个方法来解决这个问题。</p><p>如常，示例的完整源代码可在GitHub上找到。</p>`,26),e=[o];function c(u,i){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","2024-06-29-Joining a List String  in Java With Commas and  and .html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-Joining%20a%20List%20String%20%20in%20Java%20With%20Commas%20and%20%20and%20.html","title":"Java中以自然语言方式连接列表","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","String Manipulation"],"tag":["Java","String Concatenation","Natural Language"],"head":[["meta",{"name":"keywords","content":"Java, String Concatenation, Natural Language, Oxford Comma"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-Joining%20a%20List%20String%20%20in%20Java%20With%20Commas%20and%20%20and%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中以自然语言方式连接列表"}],["meta",{"property":"og:description","content":"Java中以自然语言方式连接列表 当处理字符串集合时，使用特定分隔符连接这些字符串是一项常见任务。幸运的是，我们有多种解决方案可供选择，包括使用_String.join()和_Collectors.joining()。 在这个快速教程中，我们将探索一个有趣的字符串连接问题：以更接近自然语言的方式连接字符串。 2. 问题介绍 让我们通过一个例子来理解问题..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T03:52:37.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"String Concatenation"}],["meta",{"property":"article:tag","content":"Natural Language"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T03:52:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中以自然语言方式连接列表\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T03:52:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中以自然语言方式连接列表 当处理字符串集合时，使用特定分隔符连接这些字符串是一项常见任务。幸运的是，我们有多种解决方案可供选择，包括使用_String.join()和_Collectors.joining()。 在这个快速教程中，我们将探索一个有趣的字符串连接问题：以更接近自然语言的方式连接字符串。 2. 问题介绍 让我们通过一个例子来理解问题..."},"headers":[{"level":3,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":3,"title":"3. 创建 joinItemsAsNaturalLanguage() 方法","slug":"_3-创建-joinitemsasnaturallanguage-方法","link":"#_3-创建-joinitemsasnaturallanguage-方法","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719633157000,"updatedTime":1719633157000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.63,"words":1090},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-Joining a List String  in Java With Commas and  and .md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中以自然语言方式连接列表</h1>\\n<p>当处理字符串集合时，使用特定分隔符连接这些字符串是一项常见任务。幸运的是，我们有多种解决方案可供选择，包括使用_String.join()<em>和_Collectors.joining()</em>。</p>\\n<p>在这个快速教程中，我们将探索一个有趣的字符串连接问题：以更接近自然语言的方式连接字符串。</p>\\n<h3>2. 问题介绍</h3>\\n<p>让我们通过一个例子来理解问题。假设我们有一个字符串列表_{“A”，“B”，“C”，“D”}_。如果我们想用逗号作为分隔符将它们连接起来，结果将是“<em>A, B, C, D</em>”。到目前为止，一切顺利。</p>","autoDesc":true}');export{k as comp,d as data};
