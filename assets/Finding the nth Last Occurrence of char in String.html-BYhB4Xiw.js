import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DYn08KT6.js";const p={},e=t(`<h1 id="在java中查找字符串中字符的第n个最后一次出现" tabindex="-1"><a class="header-anchor" href="#在java中查找字符串中字符的第n个最后一次出现"><span>在Java中查找字符串中字符的第n个最后一次出现</span></a></h1><p>在各种文本处理任务中，我们经常需要在给定的字符串中找到特定字符的第n个最后一次出现。此外，这一操作在解析日志、分析文本数据或从字符串中提取相关信息等任务中特别有用。</p><p>在本教程中，我们将探索使用Java在字符串中查找字符的第n个最后一次出现的多种技术。</p><h2 id="_2-使用传统循环" tabindex="-1"><a class="header-anchor" href="#_2-使用传统循环"><span>2. 使用传统循环</span></a></h2><p>找到字符串中字符的第n个最后一次出现的一个传统方法是通过迭代循环。在这种方法中，我们从字符串的末尾开始迭代，直到达到所需位置，计算目标字符的出现次数。</p><p>让我们看看这如何实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">&quot;Welcome to Baeldung&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">char</span> target <span class="token operator">=</span> <span class="token char">&#39;e&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> n <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> expectedIndex <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenStringAndCharAndN_whenFindingNthLastOccurrence_thenCorrectIndexReturned</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>str<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">==</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            count<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">==</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                index <span class="token operator">=</span> i<span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedIndex<span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试方法中，我们系统地逆序迭代字符串_str_中的字符。因此，我们创建了变量_count_来跟踪出现次数，_index_来存储所需出现的位置，并仔细管理搜索过程。</p><p>此外，每个字符都被检查以确定它是否与_target_字符匹配，相应地增加_count_变量，直到达到所需的第n次出现。</p><p>最后，我们验证获得的_index_是否准确地对应于_expectedIndex_，确保我们的实现的正确性。</p><h2 id="_3-使用java-流和intstream" tabindex="-1"><a class="header-anchor" href="#_3-使用java-流和intstream"><span>3. 使用Java 流和IntStream</span></a></h2><p>另一种方法是使用Java流和IntStream类来操作字符串中的字符索引。这里是一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenStringAndCharAndN_whenFindingNthLastOccurrenceUsingStreams_thenCorrectIndexReturned</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">OptionalInt</span> result <span class="token operator">=</span> <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> str<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>i <span class="token operator">-&gt;</span> str<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span> <span class="token operator">-</span> i<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>i <span class="token operator">-&gt;</span> str<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">==</span> target<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">skip</span><span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> index <span class="token operator">=</span> result<span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedIndex<span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试方法中，我们采用了一种函数式编程方法，利用_IntStream.range()_方法生成一个整数索引流，代表输入字符串的字符。然后，我们将每个索引映射到字符串末尾的位置，方便逆序遍历。</p><p>随后，我们应用一个过滤操作，只保留那些对应字符与目标字符匹配的索引。通过使用_skip(n-1)_方法，我们绕过最初的出现次数，然后使用_findFirst()_来定位第n个最后一次出现的索引，封装在_OptionalInt_中。</p><p>在获得_result_之后，我们从_OptionalInt_中提取索引，并验证其准确性与_expectedIndex_。</p><p><strong>这种函数式编程方法不仅提供了一个更富有表现力和简洁的解决方案，而且符合强调不可变性和函数组合的现代编程范式。</strong></p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们探索了使用Java在字符串中找到字符的第n个最后一次出现的几种方法。我们涵盖了传统的循环技术和利用Java流的函数式编程方法。</p><p>和往常一样，本文的完整代码示例可以在GitHub上找到。</p><p>评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,21),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","Finding the nth Last Occurrence of char in String.html.vue"]]),d=JSON.parse(`{"path":"/posts/baeldung/Archive/Finding%20the%20nth%20Last%20Occurrence%20of%20char%20in%20String.html","title":"在Java中查找字符串中字符的第n个最后一次出现","lang":"zh-CN","frontmatter":{"date":"2024-06-18T00:00:00.000Z","category":["Java","编程"],"tag":["文本处理","Java 流"],"description":"在Java中查找字符串中字符的第n个最后一次出现 在各种文本处理任务中，我们经常需要在给定的字符串中找到特定字符的第n个最后一次出现。此外，这一操作在解析日志、分析文本数据或从字符串中提取相关信息等任务中特别有用。 在本教程中，我们将探索使用Java在字符串中查找字符的第n个最后一次出现的多种技术。 2. 使用传统循环 找到字符串中字符的第n个最后一次...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Finding%20the%20nth%20Last%20Occurrence%20of%20char%20in%20String.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中查找字符串中字符的第n个最后一次出现"}],["meta",{"property":"og:description","content":"在Java中查找字符串中字符的第n个最后一次出现 在各种文本处理任务中，我们经常需要在给定的字符串中找到特定字符的第n个最后一次出现。此外，这一操作在解析日志、分析文本数据或从字符串中提取相关信息等任务中特别有用。 在本教程中，我们将探索使用Java在字符串中查找字符的第n个最后一次出现的多种技术。 2. 使用传统循环 找到字符串中字符的第n个最后一次..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"文本处理"}],["meta",{"property":"article:tag","content":"Java 流"}],["meta",{"property":"article:published_time","content":"2024-06-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中查找字符串中字符的第n个最后一次出现\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-18T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"2. 使用传统循环","slug":"_2-使用传统循环","link":"#_2-使用传统循环","children":[]},{"level":2,"title":"3. 使用Java 流和IntStream","slug":"_3-使用java-流和intstream","link":"#_3-使用java-流和intstream","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.79,"words":836},"filePathRelative":"posts/baeldung/Archive/Finding the nth Last Occurrence of char in String.md","localizedDate":"2024年6月18日","excerpt":"\\n<p>在各种文本处理任务中，我们经常需要在给定的字符串中找到特定字符的第n个最后一次出现。此外，这一操作在解析日志、分析文本数据或从字符串中提取相关信息等任务中特别有用。</p>\\n<p>在本教程中，我们将探索使用Java在字符串中查找字符的第n个最后一次出现的多种技术。</p>\\n<h2>2. 使用传统循环</h2>\\n<p>找到字符串中字符的第n个最后一次出现的一个传统方法是通过迭代循环。在这种方法中，我们从字符串的末尾开始迭代，直到达到所需位置，计算目标字符的出现次数。</p>\\n<p>让我们看看这如何实现：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span> str <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"Welcome to Baeldung\\"</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">char</span> target <span class=\\"token operator\\">=</span> <span class=\\"token char\\">'e'</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">int</span> n <span class=\\"token operator\\">=</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">int</span> expectedIndex <span class=\\"token operator\\">=</span> <span class=\\"token number\\">6</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenStringAndCharAndN_whenFindingNthLastOccurrence_thenCorrectIndexReturned</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">int</span> count <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">int</span> index <span class=\\"token operator\\">=</span> <span class=\\"token operator\\">-</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> i <span class=\\"token operator\\">=</span> str<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">length</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">-</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&gt;=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">--</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>str<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">charAt</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">==</span> target<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            count<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">;</span>\\n            <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>count <span class=\\"token operator\\">==</span> n<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n                index <span class=\\"token operator\\">=</span> i<span class=\\"token punctuation\\">;</span>\\n                <span class=\\"token keyword\\">break</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span>expectedIndex<span class=\\"token punctuation\\">,</span> index<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}`);export{k as comp,d as data};
