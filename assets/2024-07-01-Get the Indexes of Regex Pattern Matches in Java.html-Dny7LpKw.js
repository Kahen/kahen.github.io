import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-uizvaz9h.js";const p={},e=t('<h1 id="在java中获取正则表达式模式匹配的索引" tabindex="-1"><a class="header-anchor" href="#在java中获取正则表达式模式匹配的索引"><span>在Java中获取正则表达式模式匹配的索引</span></a></h1><p>在Java编程中，处理字符串和模式是许多应用的基本需求。正则表达式，通常称为regex，为模式匹配和操作提供了一个强大的工具。</p><p>有时，我们不仅需要在字符串中识别匹配项，还需要精确定位这些匹配发生的位置。在本教程中，我们将探讨如何在Java中获取正则表达式模式匹配的索引。</p><p>让我们从一个_String_示例开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token constant">INPUT</span> <span class="token operator">=</span> <span class="token string">&quot;This line contains `````&lt;the first value&gt;`````, `````&lt;the second value&gt;`````, and ````&lt;the third value&gt;````.&quot;</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>假设我们想从上面的字符串中提取所有的_“<code>&lt;…&gt;</code>”_段，例如“ <em><code>&lt;the first value&gt;</code></em>”和“ <em><code>&lt;the second value&gt;</code></em>”。</p><p>为了匹配这些段，我们可以使用正则表达式的NOR字符类：<em>“<code>&lt;[^&gt;</code>]*&gt;”</em>。</p><p>在Java中，<strong>Regex API中的_Pattern_和_Matcher_类是处理模式匹配的重要工具</strong>。这些类提供了编译正则表达式并将它们应用于字符串进行各种操作的方法。</p><p>接下来，让我们使用_Pattern_和_Matcher_来提取所需的文本。为了简单起见，我们将使用AssertJ断言来验证我们是否获得了预期的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Pattern</span> pattern <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;```&lt;[^&gt;```]*&gt;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> pattern<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">while</span> <span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span><span class="token string">&quot;`````&lt;the first value&gt;`````&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;`````&lt;the second value&gt;`````&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;````&lt;the third value&gt;````&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码所示，我们从输入_String_中提取了所有的“ <em><code>&lt;…&gt;</code></em>”部分。然而，有时我们想知道匹配项在输入中的确切位置。换句话说，<strong>我们想要获得匹配项及其在输入字符串中的索引。</strong></p><p>接下来，让我们扩展这段代码以实现我们的目标。</p><p>我们已经使用_Matcher_类来提取匹配项。<strong>_Matcher_类提供了两个方法，_start()<em>和_end()</em>，它们允许我们获取每个匹配项的起始和结束索引。</strong></p><p>值得注意的是，**_Matcher.end()_方法返回匹配子序列之后的那个字符的索引。**一个示例可以清楚地展示这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Pattern</span> pattern <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;456&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> pattern<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span><span class="token string">&quot;0123456789&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n<span class="token keyword">int</span> startIdx <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>\n<span class="token keyword">int</span> endIdx <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>\n<span class="token keyword">if</span> <span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    result <span class="token operator">=</span> matcher<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    startIdx <span class="token operator">=</span> matcher<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    endIdx <span class="token operator">=</span> matcher<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;456&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>startIdx<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>endIdx<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// matcher.end() 返回7而不是6</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们知道了_start()_和_end()<em>返回的内容，让我们看看我们是否可以获取输入中的每个匹配</em>“<code>&lt;…&gt;</code>”_子序列的索引：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Pattern</span> pattern <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;```&lt;[^&gt;```]*&gt;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> pattern<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Map</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`` indexesOfMatches <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">while</span> <span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    indexesOfMatches<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> matcher<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span><span class="token string">&quot;`````&lt;the first value&gt;`````&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;`````&lt;the second value&gt;`````&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;````&lt;the third value&gt;````&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>indexesOfMatches<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>entry <span class="token operator">-&gt;</span> <span class="token constant">INPUT</span><span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> entry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span><span class="token string">&quot;`````&lt;the first value&gt;`````&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;`````&lt;the second value&gt;`````&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;````&lt;the third value&gt;````&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的测试所示，**我们将每个匹配项的_start()_和_end()_结果存储在一个_LinkedHashMap_中以保持插入顺序。**然后，我们通过这些索引对从原始输入中提取子字符串。<strong>如果我们获得了正确的索引，这些子字符串必须等于匹配项。</strong></p><p>如果我们运行这个测试，它会通过。</p><p>在正则表达式中，捕获组通过允许我们稍后引用它们或方便地提取子模式来发挥关键作用。</p><p>为了说明，<strong>假设我们的目标是提取被‘ <em><code>&lt;_‘和‘ _&gt;</code></em>‘包围的内容。在这种情况下，我们可以创建一个包含捕获组的模式：<em>“<code>&lt;([^&gt;</code>]*)&gt;”</em></strong>。结果，当使用_Matcher.group(1)_时，我们获得了文本“ <em>the first value</em>“，” <em>the second value</em>“等等。</p><p>当没有明确定义捕获组时，整个正则表达式假定默认组，索引为0。因此，调用_Matcher.group()<em>等同于调用_Matcher.group(0)</em>。</p><p>就像_Matcher.group()_函数的行为一样，<strong>_Matcher.start()_和_Matcher.end()_方法支持指定组索引作为参数</strong>。因此，这些方法提供了与相应组中匹配内容相对应的起始和结束索引：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Pattern</span> pattern <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;``&lt;([^&gt;``]*)&gt;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> pattern<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Map</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`` indexesOfMatches <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">while</span> <span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    indexesOfMatches<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> matcher<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span><span class="token string">&quot;the first value&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;the second value&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;the third value&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>indexesOfMatches<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>entry <span class="token operator">-&gt;</span> <span class="token constant">INPUT</span><span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> entry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span><span class="token string">&quot;the first value&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;the second value&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;the third value&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们探讨了在处理正则表达式时如何在原始输入中获取模式匹配的索引。我们讨论了涉及有和没有明确定义捕获组的模式的场景。</p><p>如常，示例的完整源代码可在GitHub上找到。</p>',27),o=[e];function c(u,l){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-01-Get the Indexes of Regex Pattern Matches in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-Get%20the%20Indexes%20of%20Regex%20Pattern%20Matches%20in%20Java.html","title":"在Java中获取正则表达式模式匹配的索引","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Regex"],"tag":["Java","Regex","Pattern","Matcher"],"head":[["meta",{"name":"keywords","content":"Java, Regex, Pattern, Matcher, 正则表达式, 索引"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-Get%20the%20Indexes%20of%20Regex%20Pattern%20Matches%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中获取正则表达式模式匹配的索引"}],["meta",{"property":"og:description","content":"在Java中获取正则表达式模式匹配的索引 在Java编程中，处理字符串和模式是许多应用的基本需求。正则表达式，通常称为regex，为模式匹配和操作提供了一个强大的工具。 有时，我们不仅需要在字符串中识别匹配项，还需要精确定位这些匹配发生的位置。在本教程中，我们将探讨如何在Java中获取正则表达式模式匹配的索引。 让我们从一个_String_示例开始： ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T09:53:41.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Regex"}],["meta",{"property":"article:tag","content":"Pattern"}],["meta",{"property":"article:tag","content":"Matcher"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T09:53:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中获取正则表达式模式匹配的索引\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T09:53:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中获取正则表达式模式匹配的索引 在Java编程中，处理字符串和模式是许多应用的基本需求。正则表达式，通常称为regex，为模式匹配和操作提供了一个强大的工具。 有时，我们不仅需要在字符串中识别匹配项，还需要精确定位这些匹配发生的位置。在本教程中，我们将探讨如何在Java中获取正则表达式模式匹配的索引。 让我们从一个_String_示例开始： ..."},"headers":[{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1719827621000,"updatedTime":1719827621000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.85,"words":1154},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-Get the Indexes of Regex Pattern Matches in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在Java编程中，处理字符串和模式是许多应用的基本需求。正则表达式，通常称为regex，为模式匹配和操作提供了一个强大的工具。</p>\\n<p>有时，我们不仅需要在字符串中识别匹配项，还需要精确定位这些匹配发生的位置。在本教程中，我们将探讨如何在Java中获取正则表达式模式匹配的索引。</p>\\n<p>让我们从一个_String_示例开始：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span> <span class=\\"token constant\\">INPUT</span> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"This line contains `````&lt;the first value&gt;`````, `````&lt;the second value&gt;`````, and ````&lt;the third value&gt;````.\\"</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
