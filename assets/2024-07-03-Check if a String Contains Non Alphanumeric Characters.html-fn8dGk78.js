import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-B0JIQbDY.js";const e={},p=t(`<h1 id="如何检查字符串是否包含非字母数字字符" tabindex="-1"><a class="header-anchor" href="#如何检查字符串是否包含非字母数字字符"><span>如何检查字符串是否包含非字母数字字符</span></a></h1><p>在本教程中，我们将学习如何检查字符串是否包含非字母数字字符。这个功能在许多场景中都至关重要，例如在查找密码强度、拒绝应用程序中输入的特别字符等。当我们想要限制其使用到一种语言脚本时，这个需求变得更加有趣，我们在这里也尝试解决这个问题。</p><h2 id="_2-使用正则表达式" tabindex="-1"><a class="header-anchor" href="#_2-使用正则表达式"><span>2. 使用正则表达式</span></a></h2><p>我们认为使用正则表达式是实现此需求最灵活的方式。让我们考虑一个简单的用例，其中<strong>应用程序必须只接受英文数字和字母字符</strong>。为了实现这一点，我们使用正则表达式 <em>[^a-zA-Z0-9]</em> 来识别一个非字母数字字符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NonAlphaNumRegexChecker</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Pattern</span> <span class="token constant">PATTERN_NON_ALPHNUM_USASCII</span> <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;[^a-zA-Z0-9]+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isAlphanumeric</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> <span class="token constant">PATTERN_NON_ALPHNUM_USASCII</span><span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是，如果应用程序想要接受其他语言的字母，那么我们必须调整正则表达式，以便它也覆盖Unicode字母字符和数字。有关更多详细信息，请查看Javadocs中的“Unicode Support”部分。在这里，我们使用正则表达式的二元属性类，<em>IsAlphabetic</em> 和 <em>IsDigit</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NonAlphaNumRegexChecker</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Pattern</span> <span class="token constant">PATTERN_NON_ALPHNUM_ANYLANG</span> <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;[^\\\\p{IsAlphabetic}\\\\p{IsDigit}]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">containsNonAlphanumeric</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> <span class="token constant">PATTERN_NON_ALPHNUM_ANYLANG</span><span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>让我们考虑另一个用例，应用程序只接受来自特定Unicode脚本的字符，如西里尔文、格鲁吉亚文或希腊文</strong>。为了实现这种情况，正则表达式支持Unicode脚本类，如_IsCyrillic_、<em>IsGreek</em>、<em>IsGeorgian</em> 等。让我们看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NonAlphaNumRegexChecker</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">containsNonAlphanumeric</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">,</span> <span class="token class-name">String</span> script<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> regexScriptClass <span class="token operator">=</span> <span class="token string">&quot;\\\\p{&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;Is&quot;</span> <span class="token operator">+</span> script <span class="token operator">+</span> <span class="token string">&quot;}&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name">Pattern</span> pattern <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;[^&quot;</span> <span class="token operator">+</span> regexScriptClass <span class="token operator">+</span> <span class="token string">&quot;\\\\p{IsDigit}]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> pattern<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于上述方法将语言脚本作为参数，因此每次必须编译模式。这可能是一个性能瓶颈，因此我们可以在map中缓存所有在枚举 <em>Character.UnicodeScript</em> 中提到的脚本的编译好的_Pattern_ 对象，并使用键 <em>script</em> 检索它。</p><h2 id="_3-使用-character-类的-isletterordigit-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用-character-类的-isletterordigit-方法"><span>3. 使用 <em>Character</em> 类的 <em>isLetterOrDigit()</em> 方法</span></a></h2><p>现在，让我们看看 <em>Character</em> 类，它可以帮助实现上一节讨论的所有用例。<strong>第一个解决方案通过使用方法 <em>isLetterOrDigit()</em> 检查任何语言编写的字符串中的非字母数字字符</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NonAlphaNumericChecker</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isNonAlphanumericAnyLangScript</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> str<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">char</span> c <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">isLetterOrDigit</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是，如果我们只想允许特定语言脚本，那么我们必须稍微调整一下。在这里，<strong>我们认为一个字符是非字母数字的，当它既不是该语言的字母也不是数字时</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NonAlphaNumericChecker</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isNonAlphanumericInLangScript</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">,</span> <span class="token class-name">String</span> script<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> str<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">char</span> c <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token class-name">Character<span class="token punctuation">.</span>UnicodeScript</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span>
                <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">isDigit</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用-apache-commons-lang-库的-stringutils-类" tabindex="-1"><a class="header-anchor" href="#_4-使用-apache-commons-lang-库的-stringutils-类"><span>4. 使用 Apache Commons Lang 库的 <em>StringUtils</em> 类</span></a></h2><p>到目前为止，这是使用的所有技术中最不灵活的。<strong><em>StringUtils</em> 中的 <em>isAlphanumeric()</em> 方法支持所有的Unicode字母或数字，但没有支持识别字符串中使用的语言脚本</strong>。让我们看看它在实践中如何工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isNonAlphanumericAnyLangScriptV2</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">!</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isAlphanumeric</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们讨论了一些必须检查字符串中是否存在非字母数字字符的用例。我们得出结论，正则表达式技术是所有可用选项中最灵活的。这里使用的代码片段以及相关的JUnit测试用例可以在GitHub上找到。</p>`,20),c=[p];function o(l,i){return s(),a("div",null,c)}const k=n(e,[["render",o],["__file","2024-07-03-Check if a String Contains Non Alphanumeric Characters.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-Check%20if%20a%20String%20Contains%20Non%20Alphanumeric%20Characters.html","title":"如何检查字符串是否包含非字母数字字符","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Regex"],"tag":["String","Non-Alphanumeric","Special Characters"],"head":[["meta",{"name":"keywords","content":"Java, Regex, Special Characters, Non-Alphanumeric, String"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-Check%20if%20a%20String%20Contains%20Non%20Alphanumeric%20Characters.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何检查字符串是否包含非字母数字字符"}],["meta",{"property":"og:description","content":"如何检查字符串是否包含非字母数字字符 在本教程中，我们将学习如何检查字符串是否包含非字母数字字符。这个功能在许多场景中都至关重要，例如在查找密码强度、拒绝应用程序中输入的特别字符等。当我们想要限制其使用到一种语言脚本时，这个需求变得更加有趣，我们在这里也尝试解决这个问题。 2. 使用正则表达式 我们认为使用正则表达式是实现此需求最灵活的方式。让我们考虑..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T08:36:43.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"String"}],["meta",{"property":"article:tag","content":"Non-Alphanumeric"}],["meta",{"property":"article:tag","content":"Special Characters"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T08:36:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何检查字符串是否包含非字母数字字符\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T08:36:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何检查字符串是否包含非字母数字字符 在本教程中，我们将学习如何检查字符串是否包含非字母数字字符。这个功能在许多场景中都至关重要，例如在查找密码强度、拒绝应用程序中输入的特别字符等。当我们想要限制其使用到一种语言脚本时，这个需求变得更加有趣，我们在这里也尝试解决这个问题。 2. 使用正则表达式 我们认为使用正则表达式是实现此需求最灵活的方式。让我们考虑..."},"headers":[{"level":2,"title":"2. 使用正则表达式","slug":"_2-使用正则表达式","link":"#_2-使用正则表达式","children":[]},{"level":2,"title":"3. 使用 Character 类的 isLetterOrDigit() 方法","slug":"_3-使用-character-类的-isletterordigit-方法","link":"#_3-使用-character-类的-isletterordigit-方法","children":[]},{"level":2,"title":"4. 使用 Apache Commons Lang 库的 StringUtils 类","slug":"_4-使用-apache-commons-lang-库的-stringutils-类","link":"#_4-使用-apache-commons-lang-库的-stringutils-类","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719995803000,"updatedTime":1719995803000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.13,"words":938},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-Check if a String Contains Non Alphanumeric Characters.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将学习如何检查字符串是否包含非字母数字字符。这个功能在许多场景中都至关重要，例如在查找密码强度、拒绝应用程序中输入的特别字符等。当我们想要限制其使用到一种语言脚本时，这个需求变得更加有趣，我们在这里也尝试解决这个问题。</p>\\n<h2>2. 使用正则表达式</h2>\\n<p>我们认为使用正则表达式是实现此需求最灵活的方式。让我们考虑一个简单的用例，其中<strong>应用程序必须只接受英文数字和字母字符</strong>。为了实现这一点，我们使用正则表达式 <em>[^a-zA-Z0-9]</em> 来识别一个非字母数字字符：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">NonAlphaNumRegexChecker</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">Pattern</span> <span class=\\"token constant\\">PATTERN_NON_ALPHNUM_USASCII</span> <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Pattern</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">compile</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"[^a-zA-Z0-9]+\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">boolean</span> <span class=\\"token function\\">isAlphanumeric</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span> str<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token class-name\\">Matcher</span> matcher <span class=\\"token operator\\">=</span> <span class=\\"token constant\\">PATTERN_NON_ALPHNUM_USASCII</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">matcher</span><span class=\\"token punctuation\\">(</span>str<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">return</span> matcher<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">find</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
