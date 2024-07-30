import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-CbPcg273.js";const p={},e=t(`<h1 id="java中分割字符串并保留分隔符" tabindex="-1"><a class="header-anchor" href="#java中分割字符串并保留分隔符"><span>Java中分割字符串并保留分隔符</span></a></h1><p>程序员经常遇到涉及字符串分割的算法。在一种特殊场景中，可能需要基于单个或多个不同的分隔符来分割字符串，并且<strong>还要在分割操作中返回分隔符</strong>。</p><p>让我们详细讨论这个_字符串_分割问题的不同可用解决方案。</p><h2 id="_2-基础" tabindex="-1"><a class="header-anchor" href="#_2-基础"><span>2. 基础</span></a></h2><p>Java世界提供了相当多的库（例如_java.lang.String_、Guava和Apache Commons等）来简化简单和相当复杂的字符串分割情况。此外，功能丰富的正则表达式在围绕匹配特定模式的分割问题上提供了额外的灵活性。</p><h2 id="_3-断言查找" tabindex="-1"><a class="header-anchor" href="#_3-断言查找"><span>3. 断言查找</span></a></h2><p>在正则表达式中，断言查找表明<strong>通过向前查找（lookahead）或向后查找（lookbehind）另一个模式，在源字符串的当前位置可能匹配</strong>。让我们通过一个例子更好地理解这一点。</p><p>一个向前查找的断言_Java(?=Baeldung)_<strong>只有在&quot;Java&quot;后面跟着&quot;Baeldung&quot;时才匹配&quot;Java&quot;</strong>。</p><p>同样，一个否定的向后查找断言_(?\`&lt;!#)\\d+_只有在它不是由&#39;#&#39;前缀时才匹配一个数字。</p><p>让我们使用这样的断言正则表达式并设计一个解决方案。</p><p>在本文中解释的所有示例中，我们将使用两个简单的_字符串_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> text <span class="token operator">=</span> <span class="token string">&quot;Hello@World@This@Is@A@Java@Program&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> textMixed <span class="token operator">=</span> <span class="token string">&quot;@HelloWorld@This:Is@A#Java#Program&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用-string-split" tabindex="-1"><a class="header-anchor" href="#_4-使用-string-split"><span>4. 使用_String.split()_</span></a></h2><p>让我们首先使用核心Java库的_String_类的_split()_方法。</p><p>此外，我们将评估适当的向前查找断言、向后查找断言以及它们的组合，以按我们希望的方式分割字符串。</p><h3 id="_4-1-正向查找" tabindex="-1"><a class="header-anchor" href="#_4-1-正向查找"><span>4.1. 正向查找</span></a></h3><p>首先，让我们使用向前查找断言_&quot;((?=@))&quot;<em>并围绕其匹配分割字符串_text</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> splits <span class="token operator">=</span> text<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;((?=@))&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>向前查找的正则表达式通过&quot;@&quot;符号的前向匹配来分割字符串。结果数组的内容是：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">[</span><span class="token class-name">Hello</span><span class="token punctuation">,</span> <span class="token annotation punctuation">@World</span><span class="token punctuation">,</span> <span class="token annotation punctuation">@This</span><span class="token punctuation">,</span> <span class="token annotation punctuation">@Is</span><span class="token punctuation">,</span> <span class="token annotation punctuation">@A</span><span class="token punctuation">,</span> <span class="token annotation punctuation">@Java</span><span class="token punctuation">,</span> <span class="token annotation punctuation">@Program</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用这个正则表达式不会在_splits_数组中单独返回分隔符。让我们尝试另一种方法。</p><h3 id="_4-2-正向后查找" tabindex="-1"><a class="header-anchor" href="#_4-2-正向后查找"><span>4.2. 正向后查找</span></a></h3><p>我们也可以使用方法正向后查找断言_&quot;((?&lt;=@))&quot;<em>来分割字符串_text</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> splits <span class="token operator">=</span> text<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;((?&lt;=@))&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，结果输出仍然不会包含数组中作为单独元素的分隔符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">[</span><span class="token class-name">Hello</span>@<span class="token punctuation">,</span> <span class="token class-name">World</span>@<span class="token punctuation">,</span> <span class="token class-name">This</span>@<span class="token punctuation">,</span> <span class="token class-name">Is</span>@<span class="token punctuation">,</span> <span class="token class-name">A</span>@<span class="token punctuation">,</span> <span class="token class-name">Java</span>@<span class="token punctuation">,</span> <span class="token class-name">Program</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-3-正向查找或正向后查找" tabindex="-1"><a class="header-anchor" href="#_4-3-正向查找或正向后查找"><span>4.3. 正向查找或正向后查找</span></a></h3><p>我们可以使用上述两种查找的组合，并使用逻辑或来看到它的作用。</p><p>**结果正则表达式_&quot;((?=@)|(?&lt;=@))&quot;_肯定会给我们想要的结果。**下面的代码片段演示了这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> splits <span class="token operator">=</span> text<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;((?=@)|(?&lt;=@))&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述正则表达式分割字符串，结果数组包含分隔符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">[</span><span class="token class-name">Hello</span><span class="token punctuation">,</span> @<span class="token punctuation">,</span> <span class="token class-name">World</span><span class="token punctuation">,</span> @<span class="token punctuation">,</span> <span class="token class-name">This</span><span class="token punctuation">,</span> @<span class="token punctuation">,</span> <span class="token class-name">Is</span><span class="token punctuation">,</span> @<span class="token punctuation">,</span> <span class="token class-name">A</span><span class="token punctuation">,</span> @<span class="token punctuation">,</span> <span class="token class-name">Java</span><span class="token punctuation">,</span> @<span class="token punctuation">,</span> <span class="token class-name">Program</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在我们已经理解了所需的查找断言正则表达式，我们可以根据输入字符串中存在的不同类型的分隔符来修改它。</p><p>让我们尝试使用适当的正则表达式分割之前定义的_textMixed_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> splitsMixed <span class="token operator">=</span> textMixed<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;((?=:|#|@)|(?&lt;=:|#|@))&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行上述代码行后，看到以下结果并不奇怪：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">[</span>@<span class="token punctuation">,</span> <span class="token class-name">HelloWorld</span><span class="token punctuation">,</span> @<span class="token punctuation">,</span> <span class="token class-name">This</span><span class="token punctuation">,</span> <span class="token operator">:</span><span class="token punctuation">,</span> <span class="token class-name">Is</span><span class="token punctuation">,</span> @<span class="token punctuation">,</span> <span class="token class-name">A</span><span class="token punctuation">,</span> #<span class="token punctuation">,</span> <span class="token class-name">Java</span><span class="token punctuation">,</span> #<span class="token punctuation">,</span> <span class="token class-name">Program</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-使用guava-splitter" tabindex="-1"><a class="header-anchor" href="#_5-使用guava-splitter"><span>5. 使用Guava <em>Splitter</em></span></a></h2><p>考虑到现在我们已经清楚了上述部分讨论的正则表达式断言，让我们深入了解Google提供的Java库。</p><p>Guava的_Splitter_类提供了_on()_和_onPattern()_方法，使用正则表达式模式作为分隔符来分割字符串。</p><p>首先，让我们在包含单个分隔符&quot;@&quot;的字符串_text_上看看它们的实际效果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` splits <span class="token operator">=</span> <span class="token class-name">Splitter</span><span class="token punctuation">.</span><span class="token function">onPattern</span><span class="token punctuation">(</span>&quot;<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">?</span><span class="token operator">=</span>@<span class="token punctuation">)</span><span class="token operator">|</span><span class="token punctuation">(</span><span class="token operator">?</span>\`<span class="token operator">&lt;=</span>@<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">splitToList</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` splits2 <span class="token operator">=</span> <span class="token class-name">Splitter</span><span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;((?=@)|(?\`&lt;=@)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">splitToList</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>执行上述代码行的结果与_split_方法生成的结果非常相似，只是我们现在有_List_而不是数组。</p><p>同样，我们也可以使用这些方法来分割包含多个不同分隔符的字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` splitsMixed <span class="token operator">=</span> <span class="token class-name">Splitter</span><span class="token punctuation">.</span><span class="token function">onPattern</span><span class="token punctuation">(</span>&quot;<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">?</span><span class="token operator">=</span><span class="token operator">:</span><span class="token operator">|</span>#<span class="token operator">|</span>@<span class="token punctuation">)</span><span class="token operator">|</span><span class="token punctuation">(</span><span class="token operator">?</span>\`<span class="token operator">&lt;=</span><span class="token operator">:</span><span class="token operator">|</span>#<span class="token operator">|</span>@<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">splitToList</span><span class="token punctuation">(</span>textMixed<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` splitsMixed2 <span class="token operator">=</span> <span class="token class-name">Splitter</span><span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;((?=:|#|@)|(?&lt;=:|#|@)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">splitToList</span><span class="token punctuation">(</span>textMixed<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，上述两种方法之间的差异非常显著。</p><p>_on()_方法接受一个_java.util.regex.Pattern_参数，而_onPattern()<em>方法只接受分隔符正则表达式作为_String</em>。</p><h2 id="_6-使用apache-commons-stringutils" tabindex="-1"><a class="header-anchor" href="#_6-使用apache-commons-stringutils"><span>6. 使用Apache Commons <em>StringUtils</em></span></a></h2><p>我们也可以利用Apache Commons Lang项目的_StringUtils_方法_splitByCharacterType_。</p><p>非常重要的一点是，这个方法<strong>通过按_java.lang.Character.getType(char)_返回的字符类型来分割输入字符串。在这里，我们不能选择或提取我们选择的分隔符。</strong></p><p>此外，当源字符串在整个过程中具有恒定的大小写时（要么全部大写要么全部小写），它提供最佳结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> splits <span class="token operator">=</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">splitByCharacterType</span><span class="token punctuation">(</span><span class="token string">&quot;pg@no;10@hello;world@this;is@a#10words;Java#Program&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述字符串中看到的不同类型的字符包括大写字母、小写字母、数字和特殊字符（@ ; # ）。</p><p>因此，预期的结果数组_splits_看起来像：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">[</span>pg<span class="token punctuation">,</span> @<span class="token punctuation">,</span> no<span class="token punctuation">,</span> <span class="token punctuation">;</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> @<span class="token punctuation">,</span> hello<span class="token punctuation">,</span> <span class="token punctuation">;</span><span class="token punctuation">,</span> world<span class="token punctuation">,</span> @<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token punctuation">;</span><span class="token punctuation">,</span> is<span class="token punctuation">,</span> @<span class="token punctuation">,</span> a<span class="token punctuation">,</span> #<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> words<span class="token punctuation">,</span> <span class="token punctuation">;</span><span class="token punctuation">,</span> <span class="token class-name">J</span><span class="token punctuation">,</span> ava<span class="token punctuation">,</span> #<span class="token punctuation">,</span> <span class="token class-name">P</span><span class="token punctuation">,</span> rogram<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们看到了如何以一种方式分割字符串，使得分隔符也在结果数组中可用。</p><p>首先，我们讨论了查找断言并使用它们获得所需的结果。后来，我们使用了Guava库提供的方法来实现类似的结果。</p><p>最后，我们以Apache Commons Lang库结束，它提供了一个更用户友好的方法来解决一个相关的问题——分割字符串，同时也返回分隔符。</p><p>正如往常一样，本文中使用的代码可以在GitHub上找到。</p>`,60),o=[e];function c(l,i){return s(),n("div",null,o)}const k=a(p,[["render",c],["__file","2024-07-29-Split a String in Java and Keep the Delimiters.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-29/2024-07-29-Split%20a%20String%20in%20Java%20and%20Keep%20the%20Delimiters.html","title":"Java中分割字符串并保留分隔符","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","字符串操作"],"tag":["Java","字符串分割","正则表达式"],"head":[["meta",{"name":"keywords","content":"Java, 字符串分割, 正则表达式, 保持分隔符"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-29/2024-07-29-Split%20a%20String%20in%20Java%20and%20Keep%20the%20Delimiters.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中分割字符串并保留分隔符"}],["meta",{"property":"og:description","content":"Java中分割字符串并保留分隔符 程序员经常遇到涉及字符串分割的算法。在一种特殊场景中，可能需要基于单个或多个不同的分隔符来分割字符串，并且还要在分割操作中返回分隔符。 让我们详细讨论这个_字符串_分割问题的不同可用解决方案。 2. 基础 Java世界提供了相当多的库（例如_java.lang.String_、Guava和Apache Commons等..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-29T23:27:48.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"字符串分割"}],["meta",{"property":"article:tag","content":"正则表达式"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-29T23:27:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中分割字符串并保留分隔符\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-29T23:27:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中分割字符串并保留分隔符 程序员经常遇到涉及字符串分割的算法。在一种特殊场景中，可能需要基于单个或多个不同的分隔符来分割字符串，并且还要在分割操作中返回分隔符。 让我们详细讨论这个_字符串_分割问题的不同可用解决方案。 2. 基础 Java世界提供了相当多的库（例如_java.lang.String_、Guava和Apache Commons等..."},"headers":[{"level":2,"title":"2. 基础","slug":"_2-基础","link":"#_2-基础","children":[]},{"level":2,"title":"3. 断言查找","slug":"_3-断言查找","link":"#_3-断言查找","children":[]},{"level":2,"title":"4. 使用_String.split()_","slug":"_4-使用-string-split","link":"#_4-使用-string-split","children":[{"level":3,"title":"4.1. 正向查找","slug":"_4-1-正向查找","link":"#_4-1-正向查找","children":[]},{"level":3,"title":"4.2. 正向后查找","slug":"_4-2-正向后查找","link":"#_4-2-正向后查找","children":[]},{"level":3,"title":"4.3. 正向查找或正向后查找","slug":"_4-3-正向查找或正向后查找","link":"#_4-3-正向查找或正向后查找","children":[]}]},{"level":2,"title":"5. 使用Guava Splitter","slug":"_5-使用guava-splitter","link":"#_5-使用guava-splitter","children":[]},{"level":2,"title":"6. 使用Apache Commons StringUtils","slug":"_6-使用apache-commons-stringutils","link":"#_6-使用apache-commons-stringutils","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1722295668000,"updatedTime":1722295668000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.96,"words":1488},"filePathRelative":"posts/baeldung/2024-07-29/2024-07-29-Split a String in Java and Keep the Delimiters.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>程序员经常遇到涉及字符串分割的算法。在一种特殊场景中，可能需要基于单个或多个不同的分隔符来分割字符串，并且<strong>还要在分割操作中返回分隔符</strong>。</p>\\n<p>让我们详细讨论这个_字符串_分割问题的不同可用解决方案。</p>\\n<h2>2. 基础</h2>\\n<p>Java世界提供了相当多的库（例如_java.lang.String_、Guava和Apache Commons等）来简化简单和相当复杂的字符串分割情况。此外，功能丰富的正则表达式在围绕匹配特定模式的分割问题上提供了额外的灵活性。</p>\\n<h2>3. 断言查找</h2>\\n<p>在正则表达式中，断言查找表明<strong>通过向前查找（lookahead）或向后查找（lookbehind）另一个模式，在源字符串的当前位置可能匹配</strong>。让我们通过一个例子更好地理解这一点。</p>","autoDesc":true}');export{k as comp,d as data};
