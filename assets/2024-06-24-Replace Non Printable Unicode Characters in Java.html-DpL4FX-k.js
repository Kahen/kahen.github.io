import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DlW52zYa.js";const e={},p=t(`<h1 id="java中替换非打印unicode字符" tabindex="-1"><a class="header-anchor" href="#java中替换非打印unicode字符"><span>Java中替换非打印Unicode字符</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>非打印Unicode字符包括控制字符、样式标记和其他在文本中可见但并非用于显示的不可见符号。此外，这些字符可能会在文本处理、显示和保存时引起问题。因此，根据需要找到替换或消除这些字符的方法非常重要。</p><h3 id="在本教程中-我们将探讨不同的替换方法。" tabindex="-1"><a class="header-anchor" href="#在本教程中-我们将探讨不同的替换方法。"><span>在本教程中，我们将探讨不同的替换方法。</span></a></h3><h2 id="_2-使用正则表达式" tabindex="-1"><a class="header-anchor" href="#_2-使用正则表达式"><span>2. 使用正则表达式</span></a></h2><p>Java的_String_类有强大的文本处理功能，正则表达式提供了一种简短的方式来匹配和替换字符串中的模式。我们可以使用简单的模式来查找和更改非打印的Unicode字母，如下所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenTextWithNonPrintableChars_whenUsingRegularExpression_thenGetSanitizedText</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> originalText <span class="token operator">=</span> <span class="token string">&quot;\\n\\nWelcome \\n\\n\\nto Baeldung!\\n\\t&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> expected <span class="token operator">=</span> <span class="token string">&quot;Welcome to Baeldung!&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> regex <span class="token operator">=</span> <span class="token string">&quot;[\\\\p{C}]&quot;</span><span class="token punctuation">;</span>
    
    <span class="token class-name">Pattern</span> pattern <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span>regex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> pattern<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>originalText<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> sanitizedText <span class="token operator">=</span> matcher<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> sanitizedText<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试方法中，正则表达式_\\p{C}_代表任何控制字符（非打印Unicode字符）在给定的_originalText_中。<strong>此外，我们使用_Pattern.compile(regex)_方法将正则表达式编译成模式，然后通过将_originalText_作为参数调用这个模式来创建一个_Matcher_对象。</strong></p><p>然后，我们调用_Matcher.replaceAll()_方法将所有匹配到的控制字符实例替换为空字符串，从而从源文本中消除它们。最后，我们使用_assertEquals()_方法将_sanitizedText_与_expected_字符串进行比较。</p><h2 id="_3-自定义实现" tabindex="-1"><a class="header-anchor" href="#_3-自定义实现"><span>3. 自定义实现</span></a></h2><p>我们可以采用另一种方法来遍历我们的文本中的字符，并根据它们的数值删除特殊的Unicode字符。让我们来看一个简单的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenTextWithNonPrintableChars_whenCustomImplementation_thenGetSanitizedText</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> originalText <span class="token operator">=</span> <span class="token string">&quot;\\n\\nWelcome \\n\\n\\nto Baeldung!\\n\\t&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> expected <span class="token operator">=</span> <span class="token string">&quot;Welcome to Baeldung!&quot;</span><span class="token punctuation">;</span>
    
    <span class="token class-name">StringBuilder</span> strBuilder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    originalText<span class="token punctuation">.</span><span class="token function">codePoints</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;=</span> <span class="token number">32</span> <span class="token operator">&amp;&amp;</span> i <span class="token operator">!=</span> <span class="token number">127</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            strBuilder<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">toChars</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> strBuilder<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用_originalText.codePoints()_和一个_forEach_循环来遍历原始文本的Unicode代码。<strong>然后，我们设置条件来消除值小于32和等于127的字符，分别代表非打印和控制字符。</strong></p><p>然后我们使用_strBuilder.append(Character.toChars(i))_方法将字符追加到_StringBuilder_对象中。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>总之，本教程深入探讨了书面文本中非打印Unicode字符带来的挑战。探索包括了两种不同的方法，利用Java的String类中的正则表达式和实现自定义解决方案。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p>`,17),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-24-Replace Non Printable Unicode Characters in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-Replace%20Non%20Printable%20Unicode%20Characters%20in%20Java.html","title":"Java中替换非打印Unicode字符","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Java","Unicode"],"tag":["非打印字符","正则表达式","文本处理"],"head":[["meta",{"name":"keywords","content":"Java, Unicode, 非打印字符, 正则表达式, 文本处理"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-Replace%20Non%20Printable%20Unicode%20Characters%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中替换非打印Unicode字符"}],["meta",{"property":"og:description","content":"Java中替换非打印Unicode字符 1. 引言 非打印Unicode字符包括控制字符、样式标记和其他在文本中可见但并非用于显示的不可见符号。此外，这些字符可能会在文本处理、显示和保存时引起问题。因此，根据需要找到替换或消除这些字符的方法非常重要。 在本教程中，我们将探讨不同的替换方法。 2. 使用正则表达式 Java的_String_类有强大的文本..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T15:28:39.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"非打印字符"}],["meta",{"property":"article:tag","content":"正则表达式"}],["meta",{"property":"article:tag","content":"文本处理"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-24T15:28:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中替换非打印Unicode字符\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-24T15:28:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中替换非打印Unicode字符 1. 引言 非打印Unicode字符包括控制字符、样式标记和其他在文本中可见但并非用于显示的不可见符号。此外，这些字符可能会在文本处理、显示和保存时引起问题。因此，根据需要找到替换或消除这些字符的方法非常重要。 在本教程中，我们将探讨不同的替换方法。 2. 使用正则表达式 Java的_String_类有强大的文本..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[{"level":3,"title":"在本教程中，我们将探讨不同的替换方法。","slug":"在本教程中-我们将探讨不同的替换方法。","link":"#在本教程中-我们将探讨不同的替换方法。","children":[]}]},{"level":2,"title":"2. 使用正则表达式","slug":"_2-使用正则表达式","link":"#_2-使用正则表达式","children":[]},{"level":2,"title":"3. 自定义实现","slug":"_3-自定义实现","link":"#_3-自定义实现","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719242919000,"updatedTime":1719242919000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.26,"words":679},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-Replace Non Printable Unicode Characters in Java.md","localizedDate":"2024年6月24日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>非打印Unicode字符包括控制字符、样式标记和其他在文本中可见但并非用于显示的不可见符号。此外，这些字符可能会在文本处理、显示和保存时引起问题。因此，根据需要找到替换或消除这些字符的方法非常重要。</p>\\n<h3>在本教程中，我们将探讨不同的替换方法。</h3>\\n<h2>2. 使用正则表达式</h2>\\n<p>Java的_String_类有强大的文本处理功能，正则表达式提供了一种简短的方式来匹配和替换字符串中的模式。我们可以使用简单的模式来查找和更改非打印的Unicode字母，如下所示：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenTextWithNonPrintableChars_whenUsingRegularExpression_thenGetSanitizedText</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">String</span> originalText <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"\\\\n\\\\nWelcome \\\\n\\\\n\\\\nto Baeldung!\\\\n\\\\t\\"</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">String</span> expected <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"Welcome to Baeldung!\\"</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">String</span> regex <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"[\\\\\\\\p{C}]\\"</span><span class=\\"token punctuation\\">;</span>\\n    \\n    <span class=\\"token class-name\\">Pattern</span> pattern <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Pattern</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">compile</span><span class=\\"token punctuation\\">(</span>regex<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">Matcher</span> matcher <span class=\\"token operator\\">=</span> pattern<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">matcher</span><span class=\\"token punctuation\\">(</span>originalText<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">String</span> sanitizedText <span class=\\"token operator\\">=</span> matcher<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">replaceAll</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    \\n    <span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span>expected<span class=\\"token punctuation\\">,</span> sanitizedText<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
