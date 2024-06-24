import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-BE7FzggC.js";const e={},p=t(`<h1 id="在java中仅移除字符串尾部的空格或空白字符" tabindex="-1"><a class="header-anchor" href="#在java中仅移除字符串尾部的空格或空白字符"><span>在Java中仅移除字符串尾部的空格或空白字符</span></a></h1><p>字符串操作是Java编程中的一项常见任务。有时，尾部的空白字符可能会导致不一致性，增加存储大小，甚至引起意外的bug。</p><p>在这个快速教程中，我们将探索有效的技术来从给定的字符串中仅移除尾部的空格或空白字符。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>首先，我们创建一个输入字符串作为示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token constant">INPUT</span> <span class="token operator">=</span> <span class="token string">&quot;  a b c d e \\t  &quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当我们谈论移除尾部的空白字符时，trim()方法可能是首先想到的。然而，<strong>trim()方法移除的是首尾的空白字符</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token constant">INPUT</span><span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;a b c d e&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们必须保留原始输入中的首尾空白字符。因此，<strong>trim()方法并没有解决我们的问题</strong>。</p><p>根据需求，我们可能需要消除所有的尾部空白或仅尾部的空格字符。重要的是要认识到<strong>空白包括空格和其他字符，如TAB（‘\\t’）</strong>。</p><p>例如，考虑以INPUT为例，移除其尾部的空白将得到“ a b c d e”。相反，如果我们打算仅从INPUT中移除尾部的空格字符，我们会期望得到“ a b c d e\\t”。如我们所见，TAB字符保持不变。</p><p>在这个教程中，我们将涵盖这两种场景，并提供不同的解决方案来移除尾部的空格或空白。</p><p>接下来，让我们深入编码。</p><h2 id="_3-使用正则表达式和replaceall-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用正则表达式和replaceall-方法"><span>3. 使用正则表达式和replaceAll()方法</span></a></h2><p>正则表达式在Java中是一个强大的字符串操作工具。通过构建一个正则表达式模式来匹配尾部的空格或空白，我们可以有效地使用replaceAll()方法来解决问题。</p><p>例如，由于<strong>模式“+$”匹配尾部连续的空格字符</strong>，我们可以将这个正则表达式模式传递给replaceAll()来移除尾部的空格：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> result1 <span class="token operator">=</span> <span class="token constant">INPUT</span><span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot; +$&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;  a b c d e \\t&quot;</span><span class="token punctuation">,</span> result1<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，TAB字符及其前面的空格保持不变。</p><p>同样，<strong>“\\s+$”是一个模式，它移除所有尾部的空白</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> result2 <span class="token operator">=</span> <span class="token constant">INPUT</span><span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\s+$&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;  a b c d e&quot;</span><span class="token punctuation">,</span> result2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用striptrailing-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用striptrailing-方法"><span>4. 使用stripTrailing()方法</span></a></h2><p>在Java 11中，stripTrailing()方法作为String类的新增功能被引入。顾名思义，<strong>stripTrailing()允许我们方便地移除尾部的空白</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token constant">INPUT</span><span class="token punctuation">.</span><span class="token function">stripTrailing</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;  a b c d e&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用apache-commons-lang-3的stripend" tabindex="-1"><a class="header-anchor" href="#_5-使用apache-commons-lang-3的stripend"><span>5. 使用Apache Commons Lang 3的stripEnd()</span></a></h2><p>Apache Commons Lang 3是一个广泛使用的库。它的StringUtils类提供了一套丰富的字符串操作实用工具。例如，<strong>stripEnd()方法从输入字符串中移除指定的尾部字符</strong>。因此，我们可以使用它来移除尾部的空格：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">stripEnd</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">,</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;  a b c d e \\t&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>值得一提的是，<strong>由于stripEnd()只接受一个预定义的字符串作为stripChars参数，我们不能使用这个方法来移除尾部的空白字符</strong>。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了移除尾部空格或空白的不同方法。这些解决方案包括Java标准库和外部库Apache Commons Lang 3。</p><p>如往常一样，示例的完整源代码可在GitHub上找到。</p>`,30),o=[p];function i(c,l){return s(),n("div",null,o)}const d=a(e,[["render",i],["__file","2024-06-21-Remove Only Trailing Spaces or Whitespace From a String in Java.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-06-21/2024-06-21-Remove%20Only%20Trailing%20Spaces%20or%20Whitespace%20From%20a%20String%20in%20Java.html","title":"在Java中仅移除字符串尾部的空格或空白字符","lang":"zh-CN","frontmatter":{"date":"2024-06-22T00:00:00.000Z","category":["Java","String Manipulation"],"tag":["trailing spaces","whitespace","regex","stripTrailing"],"head":[["meta",{"name":"keywords","content":"Java, String, trailing spaces, whitespace, regex, stripTrailing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-21/2024-06-21-Remove%20Only%20Trailing%20Spaces%20or%20Whitespace%20From%20a%20String%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中仅移除字符串尾部的空格或空白字符"}],["meta",{"property":"og:description","content":"在Java中仅移除字符串尾部的空格或空白字符 字符串操作是Java编程中的一项常见任务。有时，尾部的空白字符可能会导致不一致性，增加存储大小，甚至引起意外的bug。 在这个快速教程中，我们将探索有效的技术来从给定的字符串中仅移除尾部的空格或空白字符。 2. 问题介绍 首先，我们创建一个输入字符串作为示例： 当我们谈论移除尾部的空白字符时，trim()方..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T19:23:41.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"trailing spaces"}],["meta",{"property":"article:tag","content":"whitespace"}],["meta",{"property":"article:tag","content":"regex"}],["meta",{"property":"article:tag","content":"stripTrailing"}],["meta",{"property":"article:published_time","content":"2024-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T19:23:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中仅移除字符串尾部的空格或空白字符\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T19:23:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中仅移除字符串尾部的空格或空白字符 字符串操作是Java编程中的一项常见任务。有时，尾部的空白字符可能会导致不一致性，增加存储大小，甚至引起意外的bug。 在这个快速教程中，我们将探索有效的技术来从给定的字符串中仅移除尾部的空格或空白字符。 2. 问题介绍 首先，我们创建一个输入字符串作为示例： 当我们谈论移除尾部的空白字符时，trim()方..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用正则表达式和replaceAll()方法","slug":"_3-使用正则表达式和replaceall-方法","link":"#_3-使用正则表达式和replaceall-方法","children":[]},{"level":2,"title":"4. 使用stripTrailing()方法","slug":"_4-使用striptrailing-方法","link":"#_4-使用striptrailing-方法","children":[]},{"level":2,"title":"5. 使用Apache Commons Lang 3的stripEnd()","slug":"_5-使用apache-commons-lang-3的stripend","link":"#_5-使用apache-commons-lang-3的stripend","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718997821000,"updatedTime":1718997821000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.86,"words":858},"filePathRelative":"posts/baeldung/2024-06-21/2024-06-21-Remove Only Trailing Spaces or Whitespace From a String in Java.md","localizedDate":"2024年6月22日","excerpt":"\\n<p>字符串操作是Java编程中的一项常见任务。有时，尾部的空白字符可能会导致不一致性，增加存储大小，甚至引起意外的bug。</p>\\n<p>在这个快速教程中，我们将探索有效的技术来从给定的字符串中仅移除尾部的空格或空白字符。</p>\\n<h2>2. 问题介绍</h2>\\n<p>首先，我们创建一个输入字符串作为示例：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">final</span> <span class=\\"token keyword\\">static</span> <span class=\\"token class-name\\">String</span> <span class=\\"token constant\\">INPUT</span> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"  a b c d e \\\\t  \\"</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,g as data};
