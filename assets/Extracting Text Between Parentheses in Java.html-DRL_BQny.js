import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-D1jsmMBg.js";const p={},e=t(`<h1 id="java中提取括号内文本的方法-baeldung" tabindex="-1"><a class="header-anchor" href="#java中提取括号内文本的方法-baeldung"><span>Java中提取括号内文本的方法 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在Java编程中，有许多场景需要我们提取括号内包含的文本。理解如何检索括号之间的文本是一项重要技能。</p><p>在本教程中，我们将探索实现这一目标的不同方法，重点关注正则表达式和一些流行的外部库。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>当我们的输入只包含一对括号时，我们可以使用两个replaceAll()方法调用来提取它们之间的内容：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> myString <span class="token operator">=</span> <span class="token string">&quot;a b c (d e f) x y z&quot;</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> result <span class="token operator">=</span> myString<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;.*[(]&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;[)].*&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;d e f&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上述示例所示，第一个replaceAll()方法移除直到‘(‘字符之前的所有内容。第二个replaceAll()方法从‘)’到字符串的末尾移除所有内容。因此，剩下的就是‘(‘和‘)’之间的文本。</p><p>然而，如果输入包含多个“(…)”对，这种方法将不起作用。例如，假设我们有另一个输入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">INPUT</span> <span class="token operator">=</span> <span class="token string">&quot;a (b c) d (e f) x (y z)&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在INPUT中有三对括号。因此，我们期望在以下字符串列表中看到提取的值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">List</span>\\<span class="token operator">&lt;</span><span class="token class-name">String</span>\\<span class="token operator">&gt;</span> <span class="token constant">EXPECTED</span> <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;b c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;e f&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;y z&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们看看如何从输入字符串中提取这些字符串值。</p><p>为了简单起见，我们将利用单元测试断言来验证每种方法是否按预期工作。</p><h2 id="_3-贪婪与非贪婪正则表达式模式" tabindex="-1"><a class="header-anchor" href="#_3-贪婪与非贪婪正则表达式模式"><span>3. 贪婪与非贪婪正则表达式模式</span></a></h2><p>正则表达式（regex）提供了一种强大灵活的模式匹配和文本提取方法。因此，我们可以使用正则表达式来匹配括号之间的文本。</p><p>有些人可能会想出以下模式来提取“(‘和’)”之间的文本：“[(\\](.\\*)\\[)\\]”。这个模式相当直接：</p><ul><li>[(\\] 和 [)\\] 匹配字面的‘(‘和’)’</li><li>(.\\*) 是一个捕获组，匹配‘(‘和’)’之间的任何内容</li></ul><p>接下来，让我们检查这个模式是否正确解决了问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> myRegex <span class="token operator">=</span> <span class="token string">&quot;[(](.*)[)]&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">Matcher</span> myMatcher <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span>myRegex<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">List</span>\\<span class="token operator">&lt;</span><span class="token class-name">String</span>\\<span class="token operator">&gt;</span> myResult <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span>\\<span class="token operator">&lt;</span>\\<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>myMatcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    myResult<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>myMatcher<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;b c) d (e f) x (y z&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> myResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上测试所示，使用这个模式，我们在结果列表中只有一个字符串元素：“b c) d (e f) x (y z”。这是因为‘\\<em>’量词应用了贪婪匹配。换句话说，“[(\\](.\\</em>)\\[)\\]”匹配输入中的第一个‘(‘，然后匹配到最后一个‘)’字符，<strong>即使内容包含其他“(…)”对也是如此</strong>。</p><p>这不是我们期望的。为了解决这个问题，我们需要非贪婪匹配，这意味着模式必须匹配每一对“(…)”。</p><p><strong>要使‘\\<em>’量词非贪婪，我们可以在它后面添加一个问号‘?’：“[(\\](\\</em>?)\\[)\\]”。</strong></p><p>接下来，让我们测试这个模式是否可以提取预期的字符串元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> regex <span class="token operator">=</span> <span class="token string">&quot;[(](.*?)[)]&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">List</span>\\<span class="token operator">&lt;</span><span class="token class-name">String</span>\\<span class="token operator">&gt;</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span>\\<span class="token operator">&lt;</span>\\<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span>regex<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，非贪婪正则表达式模式“[(\\](.\\*?)\\[)\\]”完成了任务。</p><h2 id="_4-使用否定字符类" tabindex="-1"><a class="header-anchor" href="#_4-使用否定字符类"><span>4. 使用否定字符类</span></a></h2><p>除了使用非贪婪量词（\\*?），<strong>我们还可以使用正则表达式的否定字符类来解决问题</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> regex <span class="token operator">=</span> <span class="token string">&quot;[(]([^)]*)&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">List</span>\\<span class="token operator">&lt;</span><span class="token class-name">String</span>\\<span class="token operator">&gt;</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span>\\<span class="token operator">&lt;</span>\\<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span>regex<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如代码所示，我们提取括号之间文本的正则表达式模式是“[(\\](\\[^)\\]\\*)\\”。让我们分解它以理解它的工作原理：</p><ul><li>[(\\] – 匹配字面的‘(‘字符</li><li>[^)\\]\\* – 匹配任何不是‘)’的字符；<strong>由于它跟随[(\\]，它只匹配括号内的字符。</strong></li><li>(\\[^)\\]\\*) – 我们创建<strong>一个捕获组来提取括号之间的文本</strong>，不包括任何开括号或闭括号。</li></ul><p>或者，我们可以将“[(\\]”字符类替换为正向查找断言“(?\\u003c=\\[(\\])”。**查找断言允许我们仅当指定模式在它们之前时匹配一组字符。**在这个例子中，(?\\u003c=\\[(\\]) 断言当前位置的直接前驱是一个开括号‘(‘：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> regex <span class="token operator">=</span> <span class="token string">&quot;(?\\u003c=[(])[^)]*&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">List</span>\\<span class="token operator">&lt;</span><span class="token class-name">String</span>\\<span class="token operator">&gt;</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span>\\<span class="token operator">&lt;</span>\\<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span>regex<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，<strong>由于查找断言是一个零宽度断言，‘(‘字符不会被捕获</strong>。因此，我们不需要创建一个捕获组来提取预期的文本。</p><h2 id="_5-使用apache-commons-lang-3中的stringutils" tabindex="-1"><a class="header-anchor" href="#_5-使用apache-commons-lang-3中的stringutils"><span>5. 使用Apache Commons Lang 3中的StringUtils</span></a></h2><p>Apache Commons Lang 3是一个广泛使用的库。它的StringUtils类提供了丰富的方便的方法来操作字符串值。</p><p><strong>如果我们的输入中只有一对括号，StringUtils.substringBetween()方法允许我们直接提取它们之间的字符串</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> myString <span class="token operator">=</span> <span class="token string">&quot;a b c (d e f) x y z&quot;</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">substringBetween</span><span class="token punctuation">(</span>myString<span class="token punctuation">,</span> <span class="token string">&quot;(&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;d e f&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>当输入有多个括号对时，StringUtils.substringsBetween()返回括号对内的文本数组</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> results <span class="token operator">=</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">substringsBetween</span><span class="token punctuation">(</span><span class="token constant">INPUT</span><span class="token punctuation">,</span> <span class="token string">&quot;(&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> results<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们的项目中已经使用了Apache Commons Lang 3库，这两种方法都是完成这项任务的好选择。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了在Java中提取括号内文本的不同方法。通过理解和应用这些技术，我们可以有效地解析和处理Java应用程序中的文本。</p><p>和往常一样，示例的完整源代码可以在GitHub上找到。</p>`,44),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","Extracting Text Between Parentheses in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Extracting%20Text%20Between%20Parentheses%20in%20Java.html","title":"Java中提取括号内文本的方法 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-13T00:00:00.000Z","category":["Java","正则表达式"],"tag":["Java","字符串处理","正则表达式"],"description":"Java中提取括号内文本的方法 | Baeldung 1. 概述 在Java编程中，有许多场景需要我们提取括号内包含的文本。理解如何检索括号之间的文本是一项重要技能。 在本教程中，我们将探索实现这一目标的不同方法，重点关注正则表达式和一些流行的外部库。 2. 问题介绍 当我们的输入只包含一对括号时，我们可以使用两个replaceAll()方法调用来提取...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Extracting%20Text%20Between%20Parentheses%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中提取括号内文本的方法 | Baeldung"}],["meta",{"property":"og:description","content":"Java中提取括号内文本的方法 | Baeldung 1. 概述 在Java编程中，有许多场景需要我们提取括号内包含的文本。理解如何检索括号之间的文本是一项重要技能。 在本教程中，我们将探索实现这一目标的不同方法，重点关注正则表达式和一些流行的外部库。 2. 问题介绍 当我们的输入只包含一对括号时，我们可以使用两个replaceAll()方法调用来提取..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"字符串处理"}],["meta",{"property":"article:tag","content":"正则表达式"}],["meta",{"property":"article:published_time","content":"2024-06-13T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中提取括号内文本的方法 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-13T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 贪婪与非贪婪正则表达式模式","slug":"_3-贪婪与非贪婪正则表达式模式","link":"#_3-贪婪与非贪婪正则表达式模式","children":[]},{"level":2,"title":"4. 使用否定字符类","slug":"_4-使用否定字符类","link":"#_4-使用否定字符类","children":[]},{"level":2,"title":"5. 使用Apache Commons Lang 3中的StringUtils","slug":"_5-使用apache-commons-lang-3中的stringutils","link":"#_5-使用apache-commons-lang-3中的stringutils","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.43,"words":1328},"filePathRelative":"posts/baeldung/Archive/Extracting Text Between Parentheses in Java.md","localizedDate":"2024年6月13日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在Java编程中，有许多场景需要我们提取括号内包含的文本。理解如何检索括号之间的文本是一项重要技能。</p>\\n<p>在本教程中，我们将探索实现这一目标的不同方法，重点关注正则表达式和一些流行的外部库。</p>\\n<h2>2. 问题介绍</h2>\\n<p>当我们的输入只包含一对括号时，我们可以使用两个replaceAll()方法调用来提取它们之间的内容：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span> myString <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"a b c (d e f) x y z\\"</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token class-name\\">String</span> result <span class=\\"token operator\\">=</span> myString<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">replaceAll</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\".*[(]\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"\\"</span><span class=\\"token punctuation\\">)</span>\\n  <span class=\\"token punctuation\\">.</span><span class=\\"token function\\">replaceAll</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"[)].*\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"d e f\\"</span><span class=\\"token punctuation\\">,</span> result<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
