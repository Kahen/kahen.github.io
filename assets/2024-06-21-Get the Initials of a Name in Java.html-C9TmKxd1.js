import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-Bp5G1SUF.js";const p={},e=t(`<h1 id="在java中获取姓名的首字母缩写" tabindex="-1"><a class="header-anchor" href="#在java中获取姓名的首字母缩写"><span>在Java中获取姓名的首字母缩写</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在处理姓名时，将它们缩短为使用每个单词的第一个字符组成的缩写字符串可能会很有帮助。在本教程中，们来看看在Java中实现这一功能的几种不同方法。</p><h2 id="_2-假设" tabindex="-1"><a class="header-anchor" href="#_2-假设"><span>2. 假设</span></a></h2><p><strong>在创建缩写时，我们只考虑以字母开头的单词。</strong> 任何其他单词都从过程中排除。此外，缩写可能最终是一个空字符串，没有有效的单词。此外，我们将整个字符串转换为大写。</p><h2 id="_3-使用循环" tabindex="-1"><a class="header-anchor" href="#_3-使用循环"><span>3. 使用循环</span></a></h2><p><strong>我们可以通过空格分割文本，并使用for循环来遍历每个单词。</strong> 随后，我们可以取每个有效单词的第一个字符并构建缩写：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">getInitialUsingLoop</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>name <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> name<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> parts <span class="token operator">=</span> name<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\s+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">StringBuilder</span> initials <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> part <span class="token operator">:</span> parts<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>part<span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span><span class="token string">&quot;[a-zA-Z].*&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            initials<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>part<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> initials<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们使用正则表达式检查一个单词是否以字母开头，然后提取第一个字符以形成缩写。</p><p>我们可以编写一个单元测试来使用JUnit检查不同的情况：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@CsvSource</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;John F Kennedy,JFK&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;,&#39;&#39;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;,&#39;&#39;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Not Correct   88text,NC&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;michael jackson,MJ&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;123,&#39;&#39;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;123 234A,&#39;&#39;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1test 2test, &#39;&#39;&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">getInitialFromName_usingLoop</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">,</span> <span class="token class-name">String</span> expected<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> initial <span class="token operator">=</span> <span class="token function">getInitialUsingLoop</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> initial<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述测试用例中，<strong>我们利用了JUnit的参数化测试特性来指定多个输入和预期输出组合。</strong> 结果，我们可以确保在不同条件下对功能进行全面覆盖和验证。</p><h2 id="_4-使用stringtokenizer" tabindex="-1"><a class="header-anchor" href="#_4-使用stringtokenizer"><span>4. 使用StringTokenizer</span></a></h2><p><strong>我们可以使用StringTokenizer将文本分割成单词。</strong> 让我们看看实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">getInitialUsingStringTokenizer</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>name <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> name<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">StringTokenizer</span> tokenizer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringTokenizer</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">StringBuilder</span> initials <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>tokenizer<span class="token punctuation">.</span><span class="token function">hasMoreTokens</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> part <span class="token operator">=</span> tokenizer<span class="token punctuation">.</span><span class="token function">nextToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>part<span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span><span class="token string">&quot;[a-zA-Z].*&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            initials<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>part<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> initials<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码与之前的实现类似，只是我们使用StringTokenizer而不是split()方法。然而，StringTokenizer是一个为了兼容性而保留的遗留类，因此我们应该考虑使用split()方法。</p><p>我们可以像之前一样使用相同的参数化测试来测试这个方法。</p><h2 id="_5-使用正则表达式" tabindex="-1"><a class="header-anchor" href="#_5-使用正则表达式"><span>5. 使用正则表达式</span></a></h2><p>实现这一功能的另一种方式是使用正则表达式。<strong>我们可以通过使用正则表达式捕获来获取每个有效单词的第一个字符：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">getInitialUsingRegex</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>name <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> name<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">Pattern</span> pattern <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\b[a-zA-Z]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> pattern<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">StringBuilder</span> initials <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        initials<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> initials<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，我们可以创建一个测试用例来验证实现。</p><h2 id="_6-使用stream-api" tabindex="-1"><a class="header-anchor" href="#_6-使用stream-api"><span>6. 使用Stream API</span></a></h2><p><strong>我们还可以使用基于函数编程的Stream API，该API自Java 8以来就可用。</strong> 现在，让我们深入了解实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">getInitialUsingStreamsAPI</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>name <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> name<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>name<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\s+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>part <span class="token operator">-&gt;</span> part<span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span><span class="token string">&quot;[a-zA-Z].*&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>part <span class="token operator">-&gt;</span> part<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">joining</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们结合了filter()、map()和collect()方法来实现目标。我们可以使用类似的参数化测试来验证此实现。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>本文讨论了在Java中提取姓名缩写的各种方法。这些方法也可以为任何文本生成首字母缩写，而不仅仅是姓名。此外，<strong>我们探索了传统的基于循环的方法、正则表达式和更函数编程的方法来实现相同的结果。</strong> 根据特定场景，开发人员可以选择最适合他们需求的方法。</p><p>如常，本教程中使用的示例代码可在GitHub上找到。</p>`,28),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-06-21-Get the Initials of a Name in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-21/2024-06-21-Get%20the%20Initials%20of%20a%20Name%20in%20Java.html","title":"在Java中获取姓名的首字母缩写","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Java","编程"],"tag":["缩写","姓名缩写"],"head":[["meta",{"name":"keywords","content":"Java, 缩写, 姓名缩写, 编程技巧"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-21/2024-06-21-Get%20the%20Initials%20of%20a%20Name%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中获取姓名的首字母缩写"}],["meta",{"property":"og:description","content":"在Java中获取姓名的首字母缩写 1. 引言 在处理姓名时，将它们缩短为使用每个单词的第一个字符组成的缩写字符串可能会很有帮助。在本教程中，们来看看在Java中实现这一功能的几种不同方法。 2. 假设 在创建缩写时，我们只考虑以字母开头的单词。 任何其他单词都从过程中排除。此外，缩写可能最终是一个空字符串，没有有效的单词。此外，我们将整个字符串转换为大..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T11:05:23.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"缩写"}],["meta",{"property":"article:tag","content":"姓名缩写"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T11:05:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中获取姓名的首字母缩写\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T11:05:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中获取姓名的首字母缩写 1. 引言 在处理姓名时，将它们缩短为使用每个单词的第一个字符组成的缩写字符串可能会很有帮助。在本教程中，们来看看在Java中实现这一功能的几种不同方法。 2. 假设 在创建缩写时，我们只考虑以字母开头的单词。 任何其他单词都从过程中排除。此外，缩写可能最终是一个空字符串，没有有效的单词。此外，我们将整个字符串转换为大..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 假设","slug":"_2-假设","link":"#_2-假设","children":[]},{"level":2,"title":"3. 使用循环","slug":"_3-使用循环","link":"#_3-使用循环","children":[]},{"level":2,"title":"4. 使用StringTokenizer","slug":"_4-使用stringtokenizer","link":"#_4-使用stringtokenizer","children":[]},{"level":2,"title":"5. 使用正则表达式","slug":"_5-使用正则表达式","link":"#_5-使用正则表达式","children":[]},{"level":2,"title":"6. 使用Stream API","slug":"_6-使用stream-api","link":"#_6-使用stream-api","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1718967923000,"updatedTime":1718967923000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.09,"words":926},"filePathRelative":"posts/baeldung/2024-06-21/2024-06-21-Get the Initials of a Name in Java.md","localizedDate":"2024年6月21日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在处理姓名时，将它们缩短为使用每个单词的第一个字符组成的缩写字符串可能会很有帮助。在本教程中，们来看看在Java中实现这一功能的几种不同方法。</p>\\n<h2>2. 假设</h2>\\n<p><strong>在创建缩写时，我们只考虑以字母开头的单词。</strong> 任何其他单词都从过程中排除。此外，缩写可能最终是一个空字符串，没有有效的单词。此外，我们将整个字符串转换为大写。</p>\\n<h2>3. 使用循环</h2>\\n<p><strong>我们可以通过空格分割文本，并使用for循环来遍历每个单词。</strong> 随后，我们可以取每个有效单词的第一个字符并构建缩写：</p>","autoDesc":true}');export{k as comp,d as data};
