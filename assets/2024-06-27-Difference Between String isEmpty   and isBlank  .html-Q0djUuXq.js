import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-LwwahXlT.js";const p={},e=t(`<h1 id="java中string的isempty-与isblank-的区别" tabindex="-1"><a class="header-anchor" href="#java中string的isempty-与isblank-的区别"><span>Java中String的isEmpty()与isBlank()的区别</span></a></h1><ol><li>引言</li></ol><p>在Java中使用_Strings_有时会令人困惑，因为我们有多种方法来完成相似的事情。</p><p>本文将探讨如何使用isEmpty()和isBlank()方法来验证空白和空的_Strings_。尽管这两种方法相似，但它们并不相同。</p><ol start="2"><li>看看String.isEmpty()</li></ol><p>让我们从isEmpty()这个String操作开始。简单来说，isEmpty()方法如果String为空，则返回true；否则返回false。</p><p>内部地，isEmpty()依赖于表示String对象文本的字节数组的长度。<strong>此外，isEmpty()方法计算文本是否为空时会计算任何类型的字符</strong>。因此，空格、制表符、新行或任何可以表示为一个字节的字符都被视为有效字符。</p><p>让我们通过一个简单的测试来说明这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenString_whenCallIsEmpty_thenReturnCorrectValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token string">&quot;Example text&quot;</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token string">&quot;  &quot;</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token string">&quot;\\t\\n\\r\\f&quot;</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>众所周知，第一行测试的String包含字符，所以isEmpty()返回false。</p><p>另一方面，第二个String不包含任何字符，因此isEmpty()返回true。</p><p>最后，对于只有空白字符的String和第3和第4行的转义字符，isEmpty()返回false。</p><ol start="3"><li>查看Java 11的String.isBlank()</li></ol><p><strong>isBlank()方法在Java 11中引入，与isEmpty()相同，区别在于它还会对只包含空白字符的String返回true</strong>。</p><p>Java中认为的五个空白字符是_\\s_（空格）和_\\t, \\n, \\r, 和 \\f_转义序列。</p><p>在幕后，isBlank()方法搜索第一个非空白字符的索引。如果没有非空白字符，那个索引将等于数组的长度。最后，它将该索引与字节数组的长度进行比较，以输出正确的答案。</p><p>让我们通过一个单元测试来检查这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenString_whenCallStringIsBlank_thenReturnCorrectValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token string">&quot;Example text&quot;</span><span class="token punctuation">.</span><span class="token function">isBlank</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isBlank</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token string">&quot;  &quot;</span><span class="token punctuation">.</span><span class="token function">isBlank</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token string">&quot;\\t\\n\\r\\f &quot;</span><span class="token punctuation">.</span><span class="token function">isBlank</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，“Example text”被认为是非空白的，因为它至少包含一个非空白字符。</p><p>此外，第二个String不包含任何字符，所以它是空白的。</p><p>第三行的String只有空白字符，所以isBlank()返回true。</p><p>最后一行的String包含所有被认为是空白的转义序列字符。因此，在这种情况下，isBlank()也返回true。</p><ol start="4"><li>比较isBlank()与isEmpty()</li></ol><p>总结来说，isEmpty()仅在String不包含任何字符时返回true。相比之下，isBlank()在String不包含任何字符且其所有字符都是空白字符时返回true。</p><p>让我们用一个表格来可视化前几节描述的情况中isEmpty()和isBlank()的所有返回值。</p><p>| 方法 | 没有字符 | \\t | \\n | \\r | \\f | 空格(\\s) | 其他任何 | | --- | --- | --- | --- | --- | --- | --- | --- | --- | | isEmpty() | true | false | false | false | false | false | false | | isBlank() | true | true | true | true | true | true | false |</p><p>上述表格总结了如果String不包含任何字符，两种方法都返回true。</p><p>此外，转义序列_\\t_, <em>\\n</em>, <em>\\r</em>, <em>\\f_和</em>\\s_被认为是空白字符，所以只有isBlank()返回true。相比之下，isEmpty()对它们都返回true。</p><p>最后，对于表中未显示的任何其他字符，两种方法都返回false。</p><p>在Java 11之前，开发人员通常使用_String.trim()_和_String.isEmpty()_的组合来验证文本是否只包含空白字符。然而，正如我们在本教程中看到的，在Java 11或更高版本中使用的应用，我们可以简化为只使用String.isBlank()。</p><ol start="5"><li>结论</li></ol><p>在本教程中，我们看到了isBlank()与isEmpty()之间的区别。<strong>关键的区别在于isBlank()对于像一些转义序列这样的空白字符返回true</strong>。<strong>另一方面，isEmpty()仅在String不包含任何字符时返回true</strong>。</p><p>如常，你可以在GitHub上找到源代码。 OK</p>`,33),i=[e];function o(l,c){return a(),s("div",null,i)}const k=n(p,[["render",o],["__file","2024-06-27-Difference Between String isEmpty   and isBlank  .html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-06-27/2024-06-27-Difference%20Between%20String%20isEmpty%20%20%20and%20isBlank%20%20.html","title":"Java中String的isEmpty()与isBlank()的区别","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Java","编程"],"tag":["String","isEmpty","isBlank"],"head":[["meta",{"name":"keywords","content":"Java, String, isEmpty, isBlank, 空白字符, 空字符串"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-27/2024-06-27-Difference%20Between%20String%20isEmpty%20%20%20and%20isBlank%20%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中String的isEmpty()与isBlank()的区别"}],["meta",{"property":"og:description","content":"Java中String的isEmpty()与isBlank()的区别 引言 在Java中使用_Strings_有时会令人困惑，因为我们有多种方法来完成相似的事情。 本文将探讨如何使用isEmpty()和isBlank()方法来验证空白和空的_Strings_。尽管这两种方法相似，但它们并不相同。 看看String.isEmpty() 让我们从isEmp..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-27T04:34:45.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"String"}],["meta",{"property":"article:tag","content":"isEmpty"}],["meta",{"property":"article:tag","content":"isBlank"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T04:34:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中String的isEmpty()与isBlank()的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-27T04:34:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中String的isEmpty()与isBlank()的区别 引言 在Java中使用_Strings_有时会令人困惑，因为我们有多种方法来完成相似的事情。 本文将探讨如何使用isEmpty()和isBlank()方法来验证空白和空的_Strings_。尽管这两种方法相似，但它们并不相同。 看看String.isEmpty() 让我们从isEmp..."},"headers":[],"git":{"createdTime":1719462885000,"updatedTime":1719462885000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.24,"words":973},"filePathRelative":"posts/baeldung/2024-06-27/2024-06-27-Difference Between String isEmpty   and isBlank  .md","localizedDate":"2024年6月27日","excerpt":"\\n<ol>\\n<li>引言</li>\\n</ol>\\n<p>在Java中使用_Strings_有时会令人困惑，因为我们有多种方法来完成相似的事情。</p>\\n<p>本文将探讨如何使用isEmpty()和isBlank()方法来验证空白和空的_Strings_。尽管这两种方法相似，但它们并不相同。</p>\\n<ol start=\\"2\\">\\n<li>看看String.isEmpty()</li>\\n</ol>\\n<p>让我们从isEmpty()这个String操作开始。简单来说，isEmpty()方法如果String为空，则返回true；否则返回false。</p>\\n<p>内部地，isEmpty()依赖于表示String对象文本的字节数组的长度。<strong>此外，isEmpty()方法计算文本是否为空时会计算任何类型的字符</strong>。因此，空格、制表符、新行或任何可以表示为一个字节的字符都被视为有效字符。</p>","autoDesc":true}');export{k as comp,m as data};
