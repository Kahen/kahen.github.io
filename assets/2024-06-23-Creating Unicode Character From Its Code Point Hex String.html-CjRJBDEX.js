import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BOJj4F50.js";const e={},p=t(`<h1 id="从十六进制编码点字符串创建unicode字符-baeldung" tabindex="-1"><a class="header-anchor" href="#从十六进制编码点字符串创建unicode字符-baeldung"><span>从十六进制编码点字符串创建Unicode字符 | Baeldung</span></a></h1><p>Java对Unicode的支持使其能够轻松处理来自不同语言和脚本的字符。</p><p>在本教程中，我们将探索并学习如何在Java中从它们的编码点获取Unicode字符。</p><h3 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h3><p>Java的Unicode支持使我们能够快速构建国际化应用程序。让我们看几个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">U_CHECK</span> <span class="token operator">=</span> <span class="token string">&quot;✅&quot;</span><span class="token punctuation">;</span> <span class="token comment">// U+2705</span>
<span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">U_STRONG</span> <span class="token operator">=</span> <span class="token string">&quot;强&quot;</span><span class="token punctuation">;</span> <span class="token comment">// U+5F3A</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，复选标记“✅”和“强”（中文中的“Strong”）都是Unicode字符。</p><p>我们知道，如果我们的字符串遵循一个转义的‘u’和一个十六进制数字的模式，Unicode字符就可以在Java中正确表示，例如：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> check <span class="token operator">=</span> <span class="token string">&quot;\\u2705&quot;</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">U_CHECK</span><span class="token punctuation">,</span> check<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> strong <span class="token operator">=</span> <span class="token string">&quot;\\u5F3A&quot;</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">U_STRONG</span><span class="token punctuation">,</span> strong<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在某些场景中，我们得到的是“\\u”后的十六进制数字，需要获取相应的Unicode字符。例如，当我们收到数字“2705”的字符串格式时，应该产生复选标记“✅”。</p><p>我们首先想到的可能是将“\\u”和数字连接起来。然而，这并不能完成工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> check <span class="token operator">=</span> <span class="token string">&quot;\\u&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;2705&quot;</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;\\u2705&quot;</span><span class="token punctuation">,</span> check<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> strong <span class="token operator">=</span> <span class="token string">&quot;\\u&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;5F3A&quot;</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;\\u5F3A&quot;</span><span class="token punctuation">,</span> strong<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如测试所示，将“\\u”和一个数字如“2705”连接起来，会产生字面字符串“\\u2705”，而不是复选标记“✅”。</p><p>接下来，让我们探索如何将给定的数字转换为Unicode字符串。</p><h3 id="_3-理解-u-后的十六进制数字" tabindex="-1"><a class="header-anchor" href="#_3-理解-u-后的十六进制数字"><span>3. 理解“\\u”后的十六进制数字</span></a></h3><p><strong>Unicode为每个字符分配了一个唯一的编码点</strong>，提供了一种在不同语言和脚本中通用的文本表示方式。编码点是一个数值，它在Unicode标准中唯一标识一个字符。</p><p>要在Java中创建一个Unicode字符，我们需要理解所需字符的编码点。一旦我们有了编码点，我们可以使用Java的_char_数据类型和转义序列‘\\u’来表示Unicode字符。</p><p>在“\\uxxxx”表示法中，“xxxx”是字符的编码点在十六进制表示中的值。例如，‘A’的十六进制ASCII码是41（十进制：65）。因此，如果我们使用Unicode表示法“\\u0041”，我们可以得到字符串“A”：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\\u0041&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>那么接下来，让我们看看如何从“\\u”后的十六进制数字获取所需的Unicode字符。</p><h3 id="_4-使用-character-tochars-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用-character-tochars-方法"><span>4. 使用_Character.toChars()_方法</span></a></h3><p>现在我们理解了“\\u”后的十六进制数字的含义。当我们收到“2705”时，它是字符编码点的十六进制表示。</p><p>如果我们得到编码点整数，<strong>_Character.toChars(int codePoint)<em>方法可以给我们一个字符数组，该数组包含编码点的Unicode表示</em></strong>。最后，我们可以调用_String.valueOf()_来获取目标字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Given</span> <span class="token string">&quot;2705&quot;</span>
 <span class="token operator">|</span>_ <span class="token class-name">Hex</span><span class="token punctuation">(</span>codePoint<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">0x2705</span>
     <span class="token operator">|</span>_ codePoint <span class="token operator">=</span> <span class="token number">9989</span> <span class="token punctuation">(</span>decimal<span class="token punctuation">)</span>
         <span class="token operator">|</span>_ <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> chars <span class="token operator">=</span> <span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">toChars</span><span class="token punctuation">(</span><span class="token number">9989</span><span class="token punctuation">)</span>
            <span class="token operator">|</span>_ <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>chars<span class="token punctuation">)</span>
               <span class="token operator">|</span>_<span class="token string">&quot;✅&quot;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，要获取我们的目标字符，我们必须首先找到编码点。</p><p><strong>编码点整数可以通过使用_Integer.parseInt()_方法解析提供的字符串的十六进制（基数-16）来获得</strong>。</p><p>那么接下来，让我们将所有内容整合在一起：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> codePoint <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">&quot;2705&quot;</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Decimal int: 9989</span>
<span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> checkChar <span class="token operator">=</span> <span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">toChars</span><span class="token punctuation">(</span>codePoint<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> check <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>checkChar<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">U_CHECK</span><span class="token punctuation">,</span> check<span class="token punctuation">)</span><span class="token punctuation">;</span>

codePoint <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">&quot;5F3A&quot;</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Decimal int: 24378</span>
<span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> strongChar <span class="token operator">=</span> <span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">toChars</span><span class="token punctuation">(</span>codePoint<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> strong <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>strongChar<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">U_STRONG</span><span class="token punctuation">,</span> strong<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，<strong>如果我们使用Java 11或更高版本，我们可以直接使用_Character.toString()_方法从编码点整数获取字符串</strong>，例如：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// For Java 11 and later versions:</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">U_STRONG</span><span class="token punctuation">,</span> <span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>codePoint<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，我们可以将上面的实现包装在一个方法中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">stringFromCodePointHex</span><span class="token punctuation">(</span><span class="token class-name">String</span> codePointHex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> codePoint <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>codePointHex<span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// For Java 11 and later versions: return Character.toString(codePoint)</span>
    <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> chars <span class="token operator">=</span> <span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">toChars</span><span class="token punctuation">(</span>codePoint<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>chars<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们测试该方法以确保它产生预期的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token function">stringFromCodePointHex</span><span class="token punctuation">(</span><span class="token string">&quot;0041&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">U_CHECK</span><span class="token punctuation">,</span> <span class="token function">stringFromCodePointHex</span><span class="token punctuation">(</span><span class="token string">&quot;2705&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">U_STRONG</span><span class="token punctuation">,</span> <span class="token function">stringFromCodePointHex</span><span class="token punctuation">(</span><span class="token string">&quot;5F3A&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们首先学习了“\\uxxxx”表示法中“xxxx”的重要性，然后探讨了如何从给定的编码点的十六进制表示中获取目标Unicode字符串。</p><p>如往常一样，示例的完整源代码可在GitHub上找到。</p>`,37),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-23-Creating Unicode Character From Its Code Point Hex String.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-Creating%20Unicode%20Character%20From%20Its%20Code%20Point%20Hex%20String.html","title":"从十六进制编码点字符串创建Unicode字符 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["Java","Unicode"],"tag":["Unicode","Java"],"head":[["meta",{"name":"keywords","content":"Java, Unicode, 编码点, 字符串"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-Creating%20Unicode%20Character%20From%20Its%20Code%20Point%20Hex%20String.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"从十六进制编码点字符串创建Unicode字符 | Baeldung"}],["meta",{"property":"og:description","content":"从十六进制编码点字符串创建Unicode字符 | Baeldung Java对Unicode的支持使其能够轻松处理来自不同语言和脚本的字符。 在本教程中，我们将探索并学习如何在Java中从它们的编码点获取Unicode字符。 2. 问题介绍 Java的Unicode支持使我们能够快速构建国际化应用程序。让我们看几个例子： 在上面的例子中，复选标记“✅”..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T10:33:27.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Unicode"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T10:33:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"从十六进制编码点字符串创建Unicode字符 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T10:33:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"从十六进制编码点字符串创建Unicode字符 | Baeldung Java对Unicode的支持使其能够轻松处理来自不同语言和脚本的字符。 在本教程中，我们将探索并学习如何在Java中从它们的编码点获取Unicode字符。 2. 问题介绍 Java的Unicode支持使我们能够快速构建国际化应用程序。让我们看几个例子： 在上面的例子中，复选标记“✅”..."},"headers":[{"level":3,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":3,"title":"3. 理解“\\\\u”后的十六进制数字","slug":"_3-理解-u-后的十六进制数字","link":"#_3-理解-u-后的十六进制数字","children":[]},{"level":3,"title":"4. 使用_Character.toChars()_方法","slug":"_4-使用-character-tochars-方法","link":"#_4-使用-character-tochars-方法","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719138807000,"updatedTime":1719138807000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.58,"words":1074},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-Creating Unicode Character From Its Code Point Hex String.md","localizedDate":"2024年6月23日","excerpt":"\\n<p>Java对Unicode的支持使其能够轻松处理来自不同语言和脚本的字符。</p>\\n<p>在本教程中，我们将探索并学习如何在Java中从它们的编码点获取Unicode字符。</p>\\n<h3>2. 问题介绍</h3>\\n<p>Java的Unicode支持使我们能够快速构建国际化应用程序。让我们看几个例子：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">String</span> <span class=\\"token constant\\">U_CHECK</span> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"✅\\"</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// U+2705</span>\\n<span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">String</span> <span class=\\"token constant\\">U_STRONG</span> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"强\\"</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// U+5F3A</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
