import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BEVMBw2k.js";const p={},e=t('<h1 id="java中打印字符串的不同字符-baeldung" tabindex="-1"><a class="header-anchor" href="#java中打印字符串的不同字符-baeldung"><span>Java中打印字符串的不同字符 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在Java编程中，从字符串中打印不同的字符是一个基本任务，通常在文本处理和分析中需要。</p><p><strong>在本教程中，我们将探索处理和加工唯一字符的各种方法。</strong></p><h2 id="_2-使用-set-集合" tabindex="-1"><a class="header-anchor" href="#_2-使用-set-集合"><span>2. 使用_Set_集合</span></a></h2><p>从字符串中打印不同字符的一种有效方法是通过使用Java中的_Set_集合。_Set_自动处理重复项，允许我们高效地收集唯一字符。以下是实现此方法的方式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> inputString <span class="token operator">=</span> <span class="token string">&quot;BBaaeelldduunngg&quot;</span><span class="token punctuation">;</span>\n\n<span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenString_whenUsingSet_thenFindDistinctCharacters</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Set</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">&gt;</span></span>`````` distinctChars <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">char</span> ch <span class="token operator">:</span> inputString<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        distinctChars<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Set</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token char">&#39;B&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;e&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;l&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;d&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;u&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;n&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;g&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> distinctChars<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种方法中，我们首先遍历名为_inputString_的输入字符串中的每个字符。它将每个字符添加到名为_distinctChars_的_HashSet_中，由于_Set_的特性，它自动消除了重复项。</p><p>最后，我们使用_assertEquals()_方法验证收集到的不同字符是否与预期的唯一字符集匹配。</p><h2 id="_3-使用java-streams" tabindex="-1"><a class="header-anchor" href="#_3-使用java-streams"><span>3. 使用Java <em>Streams</em></span></a></h2><p>另一种获取不同字符的方法是利用Java <em>Streams</em>。Streams提供了一种简洁且功能性的方式来处理集合，包括提取不同的元素。以下是一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenString_whenUsingStreams_thenFindDistinctCharacters</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Set</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">&gt;</span></span>`````` distinctChars <span class="token operator">=</span> inputString<span class="token punctuation">.</span><span class="token function">chars</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">mapToObj</span><span class="token punctuation">(</span>c <span class="token operator">-&gt;</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> c<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Set</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token char">&#39;B&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;e&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;l&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;d&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;u&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;n&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;g&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> distinctChars<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用_inputString.chars()<em>方法将输入字符串_inputString_转换为字符值的_IntStream</em>。然后，我们使用_mapToObj(c -&gt; (char) c)_将每个字符值映射回其对应的char值。</p><p>此外，我们使用_Collectors.toSet()_终端操作将这些字符收集到一个_Set<code>&lt;Character&gt;</code>_中，由于_Set_的特性，它自动确保消除了重复项。</p><h2 id="_4-使用-linkedhashmap" tabindex="-1"><a class="header-anchor" href="#_4-使用-linkedhashmap"><span>4. 使用 <em>LinkedHashMap</em></span></a></h2><p>我们可以使用_LinkedHashMap_作为一种有效的方式来在字符串中维护唯一的字符。以下是一个示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenString_whenUsingLinkedHashMap_thenFindDistinctCharacters</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Map</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`` charCount <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">char</span> ch <span class="token operator">:</span> inputString<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        charCount<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>ch<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;[B, a, e, l, d, u, n, g]&quot;</span><span class="token punctuation">,</span> charCount<span class="token punctuation">.</span><span class="token function">keySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种方法中，我们遍历每个字符，并使用_charCount.put(ch, 1)_方法将其添加到_LinkedHashMap_中。此外，每个字符关联的值1在这个用例中并不重要；它只是一个占位符来填充映射。</p><p><strong>值得注意的是，_LinkedHashMap_保持插入的顺序，因此当我们遍历字符串时，字符按照它们首次出现的顺序被添加。</strong></p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>总之，在Java中打印字符串的不同字符可以使用各种方法，包括_Set_集合、Java <em>Streams_和_LinkedHashMap</em>。每种方法都提供了独特的优势，这取决于我们应用程序的具体需求。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p><p>评论在文章发布后30天内开放。对于超过此日期的任何问题，请使用网站上的联系表单。--- date: 2024-06-17 category:</p><ul><li>Java</li><li>编程 tag:</li><li>Java编程</li><li>字符串处理</li></ul><hr><h1 id="java中打印字符串的不同字符-baeldung-1" tabindex="-1"><a class="header-anchor" href="#java中打印字符串的不同字符-baeldung-1"><span>Java中打印字符串的不同字符 | Baeldung</span></a></h1><h2 id="_1-引言-1" tabindex="-1"><a class="header-anchor" href="#_1-引言-1"><span>1. 引言</span></a></h2><p>在Java编程中，打印字符串中的不同字符是一项基本任务，这在文本处理和分析中经常需要。</p><p><strong>在本教程中，我们将探索处理和加工唯一字符的多种方法。</strong></p><h2 id="_2-使用集合" tabindex="-1"><a class="header-anchor" href="#_2-使用集合"><span>2. 使用集合</span></a></h2><p>使用Java中的集合来打印字符串中的不同字符是一种有效的方法。集合自动处理重复项，让我们能够高效地收集唯一字符。以下是实现此方法的示例代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> inputString <span class="token operator">=</span> <span class="token string">&quot;BBaaeelldduunngg&quot;</span><span class="token punctuation">;</span>\n\n<span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenString_whenUsingSet_thenFindDistinctCharacters</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Set</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">&gt;</span></span>`````` distinctChars <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">char</span> ch <span class="token operator">:</span> inputString<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        distinctChars<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Set</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token char">&#39;B&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;e&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;l&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;d&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;u&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;n&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;g&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> distinctChars<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种方法中，我们首先遍历名为_inputString_的输入字符串中的每个字符。它将每个字符添加到名为_distinctChars_的_HashSet_中，由于集合的特性，它自动消除了重复项。</p><p>最后，我们使用_assertEquals()_方法来验证收集到的不同字符是否与预期的唯一字符集匹配。</p><h2 id="_3-使用java-流" tabindex="-1"><a class="header-anchor" href="#_3-使用java-流"><span>3. 使用Java 流</span></a></h2><p>利用Java 流的另一种获取不同字符的方法。流提供了一种简洁且函数式的方式来处理集合，包括提取不同的元素。以下是示例代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenString_whenUsingStreams_thenFindDistinctCharacters</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Set</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">&gt;</span></span>`````` distinctChars <span class="token operator">=</span> inputString<span class="token punctuation">.</span><span class="token function">chars</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">mapToObj</span><span class="token punctuation">(</span>c <span class="token operator">-&gt;</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> c<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Set</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token char">&#39;B&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;e&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;l&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;d&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;u&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;n&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;g&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> distinctChars<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用_inputString.chars()<em>方法将输入字符串_inputString_转换为字符值的_IntStream</em>。然后，我们使用_mapToObj(c -&gt; (char) c)_将每个字符值映射回其对应的字符。</p><p>此外，我们使用_Collectors.toSet()_终端操作来收集这些字符到一个_Set<code>&lt;Character&gt;</code>_中，由于集合的特性，它自动确保了重复项的消除。</p><h2 id="_4-使用linkedhashmap" tabindex="-1"><a class="header-anchor" href="#_4-使用linkedhashmap"><span>4. 使用LinkedHashMap</span></a></h2><p>我们还可以使用LinkedHashMap作为一种有效的方式来在字符串中维护唯一字符。以下是这种方法的示例代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenString_whenUsingLinkedHashMap_thenFindDistinctCharacters</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Map</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`` charCount <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">char</span> ch <span class="token operator">:</span> inputString<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        charCount<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>ch<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;[B, a, e, l, d, u, n, g]&quot;</span><span class="token punctuation">,</span> charCount<span class="token punctuation">.</span><span class="token function">keySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种方法中，我们遍历每个字符，并使用_charCount.put(ch, 1)_方法将其添加到_LinkedHashMap_中。此外，与每个字符关联的值1在这个用例中并不重要；它只是一个占位符。</p><p><strong>值得注意的是，LinkedHashMap维护插入的顺序，因此当我们遍历字符串时，字符将按照它们首次出现的顺序被添加。</strong></p><h2 id="_5-结论-1" tabindex="-1"><a class="header-anchor" href="#_5-结论-1"><span>5. 结论</span></a></h2><p>总之，在Java中打印字符串的不同字符可以通过使用集合、Java流和LinkedHashMap等多种方法来实现。每种方法都有其独特的优势，这取决于我们应用程序的具体需求。</p><p>文章的完整代码示例可以在GitHub上找到。</p><p>文章发布后30天内开放评论。对于超过此日期的任何问题，请使用网站上的联系表单。</p><p>OK</p>',49),c=[e];function o(i,l){return s(),a("div",null,c)}const r=n(p,[["render",o],["__file","Print Distinct Characters of a String in Java.html.vue"]]),d=JSON.parse(`{"path":"/posts/baeldung/Archive/Print%20Distinct%20Characters%20of%20a%20String%20in%20Java.html","title":"Java中打印字符串的不同字符 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-17T00:00:00.000Z","category":["Java","编程"],"tag":["Java编程","字符串处理"],"description":"Java中打印字符串的不同字符 | Baeldung 1. 引言 在Java编程中，从字符串中打印不同的字符是一个基本任务，通常在文本处理和分析中需要。 在本教程中，我们将探索处理和加工唯一字符的各种方法。 2. 使用_Set_集合 从字符串中打印不同字符的一种有效方法是通过使用Java中的_Set_集合。_Set_自动处理重复项，允许我们高效地收集唯...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Print%20Distinct%20Characters%20of%20a%20String%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中打印字符串的不同字符 | Baeldung"}],["meta",{"property":"og:description","content":"Java中打印字符串的不同字符 | Baeldung 1. 引言 在Java编程中，从字符串中打印不同的字符是一个基本任务，通常在文本处理和分析中需要。 在本教程中，我们将探索处理和加工唯一字符的各种方法。 2. 使用_Set_集合 从字符串中打印不同字符的一种有效方法是通过使用Java中的_Set_集合。_Set_自动处理重复项，允许我们高效地收集唯..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java编程"}],["meta",{"property":"article:tag","content":"字符串处理"}],["meta",{"property":"article:published_time","content":"2024-06-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中打印字符串的不同字符 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-17T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用_Set_集合","slug":"_2-使用-set-集合","link":"#_2-使用-set-集合","children":[]},{"level":2,"title":"3. 使用Java Streams","slug":"_3-使用java-streams","link":"#_3-使用java-streams","children":[]},{"level":2,"title":"4. 使用 LinkedHashMap","slug":"_4-使用-linkedhashmap","link":"#_4-使用-linkedhashmap","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]},{"level":2,"title":"1. 引言","slug":"_1-引言-1","link":"#_1-引言-1","children":[]},{"level":2,"title":"2. 使用集合","slug":"_2-使用集合","link":"#_2-使用集合","children":[]},{"level":2,"title":"3. 使用Java 流","slug":"_3-使用java-流","link":"#_3-使用java-流","children":[]},{"level":2,"title":"4. 使用LinkedHashMap","slug":"_4-使用linkedhashmap","link":"#_4-使用linkedhashmap","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论-1","link":"#_5-结论-1","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":5.03,"words":1509},"filePathRelative":"posts/baeldung/Archive/Print Distinct Characters of a String in Java.md","localizedDate":"2024年6月17日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在Java编程中，从字符串中打印不同的字符是一个基本任务，通常在文本处理和分析中需要。</p>\\n<p><strong>在本教程中，我们将探索处理和加工唯一字符的各种方法。</strong></p>\\n<h2>2. 使用_Set_集合</h2>\\n<p>从字符串中打印不同字符的一种有效方法是通过使用Java中的_Set_集合。_Set_自动处理重复项，允许我们高效地收集唯一字符。以下是实现此方法的方式：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span> inputString <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"BBaaeelldduunngg\\"</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenString_whenUsingSet_thenFindDistinctCharacters</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">Set</span>\`\`\`\`\`\`<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">Character</span><span class=\\"token punctuation\\">&gt;</span></span>\`\`\`\`\`\` distinctChars <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">HashSet</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">char</span> ch <span class=\\"token operator\\">:</span> inputString<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">toCharArray</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        distinctChars<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">add</span><span class=\\"token punctuation\\">(</span>ch<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">Set</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">of</span><span class=\\"token punctuation\\">(</span><span class=\\"token char\\">'B'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token char\\">'a'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token char\\">'e'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token char\\">'l'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token char\\">'d'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token char\\">'u'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token char\\">'n'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token char\\">'g'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span> distinctChars<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}`);export{r as comp,d as data};
