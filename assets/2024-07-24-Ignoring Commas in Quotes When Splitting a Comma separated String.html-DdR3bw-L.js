import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-D4B8YWfq.js";const p={},e=t(`<h1 id="忽略引号中的逗号在分割逗号分隔字符串时的处理方法-baeldung" tabindex="-1"><a class="header-anchor" href="#忽略引号中的逗号在分割逗号分隔字符串时的处理方法-baeldung"><span>忽略引号中的逗号在分割逗号分隔字符串时的处理方法 | Baeldung</span></a></h1><p>当处理包含逗号分隔值的文本时，可能需要忽略出现在引号子字符串中的逗号。</p><p>在本教程中，我们将探索在分割逗号分隔的字符串时忽略引号内逗号的不同方法。</p><h2 id="问题陈述" tabindex="-1"><a class="header-anchor" href="#问题陈述"><span>问题陈述</span></a></h2><p>假设我们需要分割以下逗号分隔的输入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token string">&quot;baeldung,tutorial,splitting,text,\\&quot;ignoring this comma,\\&quot;&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>分割此输入并打印结果后，我们期望得到以下输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>baeldung
tutorial
splitting
text
&quot;ignoring this comma,&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>换句话说，我们不能将所有逗号字符视为分隔符。我们必须忽略出现在引号子字符串中的逗号。</p><h2 id="实现一个简单解析器" tabindex="-1"><a class="header-anchor" href="#实现一个简单解析器"><span>实现一个简单解析器</span></a></h2><p>让我们创建一个简单的解析算法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` tokens <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> startPosition <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">boolean</span> isInQuotes <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> currentPosition <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> currentPosition <span class="token operator">&lt;</span> input<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> currentPosition<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>input<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>currentPosition<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token char">&#39;&quot;&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        isInQuotes <span class="token operator">=</span> <span class="token operator">!</span>isInQuotes<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>input<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>currentPosition<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token char">&#39;,&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>isInQuotes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        tokens<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>input<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>startPosition<span class="token punctuation">,</span> currentPosition<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        startPosition <span class="token operator">=</span> currentPosition <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token class-name">String</span> lastToken <span class="token operator">=</span> input<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>startPosition<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>lastToken<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;,&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    tokens<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    tokens<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>lastToken<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们首先定义一个名为_tokens_的_List_，它负责存储所有逗号分隔的值。</p><p>接下来，我们遍历输入_String_中的字符。</p><p><strong>在每次循环迭代中，我们需要检查当前字符是否是双引号</strong>。当发现双引号时，我们使用_isInQuotes_标志来表示所有在双引号后的逗号应该被忽略。当找到成对的双引号时，_isInQuotes_标志将被设置为false。</p><p><strong>当_isInQuotes_为_false_时，并且我们发现一个逗号字符，我们将向_tokens_列表添加一个新的token</strong>。这个新token将包含从_startPosition_到逗号字符前最后一个位置的字符。</p><p>然后，新的_startPosition_将是逗号字符后的位置。</p><p>最后，在循环结束后，我们仍然有从_startPosition_到最后一个位置的最后一个token。因此，我们使用_substring()_方法来获取它。如果这个最后一个token只是一个逗号，这意味着最后一个token应该是一个空字符串。否则，我们将最后一个token添加到_tokens_列表。</p><p><strong>现在，让我们测试解析代码：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token string">&quot;baeldung,tutorial,splitting,text,\\&quot;ignoring this comma,\\&quot;&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> matcher <span class="token operator">=</span> <span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;tutorial&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;splitting&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\\&quot;ignoring this comma,\\&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token function">splitWithParser</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">,</span> matcher<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们已经在一个叫做_splitWithParser_的静态方法中实现了我们的解析代码。然后，在测试中，我们定义了一个简单的测试_input_，其中包含一个由双引号包围的逗号。接下来，我们使用hamcrest测试框架为预期输出创建一个_contains_ <em>matcher</em>。最后，我们使用_assertThat_测试方法来检查我们的解析器是否返回了预期的输出。</p><p>在实际情况下，我们应该创建更多的单元测试来验证我们的算法与其他可能的输入的行为。</p><h2 id="应用正则表达式" tabindex="-1"><a class="header-anchor" href="#应用正则表达式"><span>应用正则表达式</span></a></h2><p><strong>实现一个解析器是一种有效的方法。然而，得到的算法相对较大且复杂。</strong> 因此，作为一种替代方案，我们可以使用正则表达式。</p><p>接下来，我们将讨论两种依赖于正则表达式的可能实现。然而，它们应该谨慎使用，因为与前面的方法相比，它们的处理时间较高。因此，<strong>在处理大量输入数据时，使用正则表达式可能代价过高。</strong></p><h3 id="_4-1-string-split-方法" tabindex="-1"><a class="header-anchor" href="#_4-1-string-split-方法"><span>4.1. <em>String split()</em> 方法</span></a></h3><p>在这种正则表达式选项中，我们将使用_String_类的_split()<em>方法。**这个方法根据给定的正则表达式匹配来分割_String</em>：**</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> tokens <span class="token operator">=</span> input<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;,(?=(?:[^\\&quot;]*\\&quot;[^\\&quot;]*\\&quot;)*[^\\&quot;]*$)&quot;</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>乍一看，正则表达式可能看起来非常复杂。然而，它的功能相对简单。</p><p>简而言之，<strong>使用正向先行断言，告诉它只在没有双引号或有偶数个双引号在它前面时，围绕逗号进行分割。</strong></p><p>_split()_方法的最后一个参数是限制。当我们提供一个负的限制时，模式将被应用尽可能多次，得到的token数组可以有任意长度。</p><h3 id="_4-2-guava的-splitter-类" tabindex="-1"><a class="header-anchor" href="#_4-2-guava的-splitter-类"><span>4.2. Guava的_Splitter_类</span></a></h3><p>另一种基于正则表达式的替代方案是使用Guava库中的_Splitter_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Pattern</span> pattern <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;,(?=(?:[^\\&quot;]*\\&quot;[^\\&quot;]*\\&quot;)*[^\\&quot;]*$)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Splitter</span> splitter <span class="token operator">=</span> <span class="token class-name">Splitter</span><span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span>pattern<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` tokens <span class="token operator">=</span> splitter<span class="token punctuation">.</span><span class="token function">splitToList</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们根据之前的相同正则表达式模式创建了一个_splitter_对象。创建_splitter_后，我们使用_splitToList()<em>方法，该方法在分割输入_String_后返回一个token的_List</em>。</p><h2 id="使用csv库" tabindex="-1"><a class="header-anchor" href="#使用csv库"><span>使用CSV库</span></a></h2><p>尽管所呈现的替代方案很有趣，<strong>可能需要使用CSV解析库</strong>，如OpenCSV。</p><p><strong>使用CSV库的优点是所需的工作量更少，因为我们不需要编写解析器或复杂的正则表达式。</strong> 结果，我们的代码最终更少出错，更易于维护。</p><p>此外，<strong>当不确定我们的输入形状时，使用CSV库可能是最佳方法。</strong> 例如，输入可能有转义的引号，这不会被前面的方法正确处理。</p><p>要使用OpenCSV，我们需要将其作为依赖项包含。在Maven项目中，我们包含opencsv依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`com.opencsv\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`opencsv\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`5.8\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们可以按如下方式使用OpenCSV：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CSVParser</span> parser <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CSVParserBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">withSeparator</span><span class="token punctuation">(</span><span class="token char">&#39;,&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">CSVReader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CSVReaderBuilder</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">StringReader</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">withCSVParser</span><span class="token punctuation">(</span>parser<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">List</span>\`<span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>\` lines <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
lines <span class="token operator">=</span> reader<span class="token punctuation">.</span><span class="token function">readAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
reader<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用_CSVParserBuilder_类，我们首先创建一个带有逗号分隔符的解析器。然后，我们使用_CSVReaderBuilder_创建一个基于我们的逗号基础解析器的CSV读取器。</p><p>在我们的示例中，我们向_CSVReaderBuilder_构造函数提供了一个_StringReader_作为参数。然而，如果需要，我们可以使用不同的读取器（例如，文件读取器）。</p><p>最后，我们调用_reader_对象的_readAll()<em>方法来获取一个_String_数组的_List</em>。由于OpenCSV旨在处理多行输入，因此_lines_列表中的每个位置对应于输入中的一行。因此，对于每一行，我们都有一个包含相应逗号分隔值的_String_数组。</p><p><strong>与前面的方法不同，使用OpenCSV时，生成的输出中会删除双引号。</strong></p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们探讨了在分割逗号分隔的字符串时忽略引号中逗号的多种替代方案。除了学习如何实现我们自己的解析器，我们还探索了使用正则表达式和OpenCSV库。</p><p>如往常一样，本教程中使用的代码示例可在GitHub上找到。</p>`,50),o=[e];function c(i,l){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-24-Ignoring Commas in Quotes When Splitting a Comma separated String.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-24/2024-07-24-Ignoring%20Commas%20in%20Quotes%20When%20Splitting%20a%20Comma%20separated%20String.html","title":"忽略引号中的逗号在分割逗号分隔字符串时的处理方法 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-07-24T00:00:00.000Z","category":["Java","编程"],"tag":["字符串处理","CSV解析"],"head":[["meta",{"name":"keywords","content":"Java, 字符串分割, 正则表达式, CSV库, Baeldung教程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-24/2024-07-24-Ignoring%20Commas%20in%20Quotes%20When%20Splitting%20a%20Comma%20separated%20String.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"忽略引号中的逗号在分割逗号分隔字符串时的处理方法 | Baeldung"}],["meta",{"property":"og:description","content":"忽略引号中的逗号在分割逗号分隔字符串时的处理方法 | Baeldung 当处理包含逗号分隔值的文本时，可能需要忽略出现在引号子字符串中的逗号。 在本教程中，我们将探索在分割逗号分隔的字符串时忽略引号内逗号的不同方法。 问题陈述 假设我们需要分割以下逗号分隔的输入： 分割此输入并打印结果后，我们期望得到以下输出： 换句话说，我们不能将所有逗号字符视为分隔..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-24T09:50:48.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"字符串处理"}],["meta",{"property":"article:tag","content":"CSV解析"}],["meta",{"property":"article:published_time","content":"2024-07-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-24T09:50:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"忽略引号中的逗号在分割逗号分隔字符串时的处理方法 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-24T09:50:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"忽略引号中的逗号在分割逗号分隔字符串时的处理方法 | Baeldung 当处理包含逗号分隔值的文本时，可能需要忽略出现在引号子字符串中的逗号。 在本教程中，我们将探索在分割逗号分隔的字符串时忽略引号内逗号的不同方法。 问题陈述 假设我们需要分割以下逗号分隔的输入： 分割此输入并打印结果后，我们期望得到以下输出： 换句话说，我们不能将所有逗号字符视为分隔..."},"headers":[{"level":2,"title":"问题陈述","slug":"问题陈述","link":"#问题陈述","children":[]},{"level":2,"title":"实现一个简单解析器","slug":"实现一个简单解析器","link":"#实现一个简单解析器","children":[]},{"level":2,"title":"应用正则表达式","slug":"应用正则表达式","link":"#应用正则表达式","children":[{"level":3,"title":"4.1. String split() 方法","slug":"_4-1-string-split-方法","link":"#_4-1-string-split-方法","children":[]},{"level":3,"title":"4.2. Guava的_Splitter_类","slug":"_4-2-guava的-splitter-类","link":"#_4-2-guava的-splitter-类","children":[]}]},{"level":2,"title":"使用CSV库","slug":"使用csv库","link":"#使用csv库","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1721814648000,"updatedTime":1721814648000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.61,"words":1684},"filePathRelative":"posts/baeldung/2024-07-24/2024-07-24-Ignoring Commas in Quotes When Splitting a Comma separated String.md","localizedDate":"2024年7月24日","excerpt":"\\n<p>当处理包含逗号分隔值的文本时，可能需要忽略出现在引号子字符串中的逗号。</p>\\n<p>在本教程中，我们将探索在分割逗号分隔的字符串时忽略引号内逗号的不同方法。</p>\\n<h2>问题陈述</h2>\\n<p>假设我们需要分割以下逗号分隔的输入：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span> input <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"baeldung,tutorial,splitting,text,\\\\\\"ignoring this comma,\\\\\\"\\"</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
