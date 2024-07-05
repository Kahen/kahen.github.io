import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BaAI5AMv.js";const e={},p=t(`<h1 id="java中文本居中输出的不同方法" tabindex="-1"><a class="header-anchor" href="#java中文本居中输出的不同方法"><span>Java中文本居中输出的不同方法</span></a></h1><p>在基于Java的文本应用程序中，经常需要对文本进行居中对齐。此外，在为Xbox开发应用程序、命令行工具或任何涉及改善文本视觉表现的应用程序时，居中文本可以提升用户体验。</p><p><strong>在本教程中，我们将深入探讨Java中文本输出居中对齐的不同方法。</strong></p><h2 id="_2-使用string格式化" tabindex="-1"><a class="header-anchor" href="#_2-使用string格式化"><span>2. 使用String格式化</span></a></h2><p>Java中居中文本的最快方式可以通过使用String类的format()方法提供。让我们看以下示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenTextAndTotalWidth_whenUsingStringFormat_thenTextIsCentered</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> text <span class="token operator">=</span> <span class="token string">&quot;Centered Text&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> totalWidth <span class="token operator">=</span> <span class="token number">15</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> padding <span class="token operator">=</span> <span class="token punctuation">(</span>totalWidth <span class="token operator">-</span> text<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> centeredText <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;%&quot;</span> <span class="token operator">+</span> padding <span class="token operator">+</span> <span class="token string">&quot;s%s%&quot;</span> <span class="token operator">+</span> padding <span class="token operator">+</span> <span class="token string">&quot;s&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> text<span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot; Centered Text &quot;</span><span class="token punctuation">,</span> centeredText<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试方法中，我们希望在总共20个字符的宽度内显示“Centered Text”。因此，我们计算出两边需要多少空格。然后，我们使用String.format()方法填充所需数量的字符串，这些字符串的长度等于空格数。</p><h2 id="_3-使用stringbuilder" tabindex="-1"><a class="header-anchor" href="#_3-使用stringbuilder"><span>3. 使用StringBuilder</span></a></h2><p>另一种居中构建文本的方式是通过StringBuilder。它允许更多的对齐调整，因此更加灵活。让我们看以下示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenTextAndTotalWidth_whenCenterUsingStringBuilder_thenTextIsCentered</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> text <span class="token operator">=</span> <span class="token string">&quot;Centered Text&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> width <span class="token operator">=</span> <span class="token number">15</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> padding <span class="token operator">=</span> <span class="token punctuation">(</span>width <span class="token operator">-</span> text<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token class-name">StringBuilder</span> centeredText <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> padding<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        centeredText<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    centeredText<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> padding<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        centeredText<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">String</span> centeredTextString <span class="token operator">=</span> centeredText<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot; Centered Text &quot;</span><span class="token punctuation">,</span> centeredTextString<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的测试方法中，我们创建了一个StringBuilder，用空格填充它来添加所需的填充空间，并追加我们的主要内容。然后，在打印居中文本之前再次填充以添加其余的填充空间。</p><h2 id="_4-使用stringutils" tabindex="-1"><a class="header-anchor" href="#_4-使用stringutils"><span>4. 使用StringUtils</span></a></h2><p>一个更简单的居中文本的方式是使用Apache Commons Lang中的StringUtils类的center()方法，它专门为这个目的而创建。让我们实践以下示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenTextAndTotalWidth_whenUsingStringUtilsCenterMethod_thenTextIsCentered</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> text <span class="token operator">=</span> <span class="token string">&quot;Centered Text&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> width <span class="token operator">=</span> <span class="token number">15</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> centeredText <span class="token operator">=</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">center</span><span class="token punctuation">(</span>text<span class="token punctuation">,</span> width<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot; Centered Text &quot;</span><span class="token punctuation">,</span> centeredText<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的测试方法中，我们使用StringUtils类的center()方法，它接受文本字符串及其总宽度。然后，它在指定的宽度内居中文本。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p><strong>总之，我们可以说Java中有多种居中文本输出的方法，如String格式化、StringBuilder和Apache Commons Lang库中的StringUtils。</strong></p><p>此外，这些方法增强了基于Java的文本应用程序的美观性，用户发现它们更容易交互。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p>`,19),o=[p];function c(i,l){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-28-How to Center Text Output in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-How%20to%20Center%20Text%20Output%20in%20Java.html","title":"Java中文本居中输出的不同方法","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Text Processing"],"tag":["String","StringBuilder","StringUtils"],"head":[["meta",{"name":"keywords","content":"Java, text centering, String.format, StringBuilder, StringUtils"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-How%20to%20Center%20Text%20Output%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中文本居中输出的不同方法"}],["meta",{"property":"og:description","content":"Java中文本居中输出的不同方法 在基于Java的文本应用程序中，经常需要对文本进行居中对齐。此外，在为Xbox开发应用程序、命令行工具或任何涉及改善文本视觉表现的应用程序时，居中文本可以提升用户体验。 在本教程中，我们将深入探讨Java中文本输出居中对齐的不同方法。 2. 使用String格式化 Java中居中文本的最快方式可以通过使用String类..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T19:24:19.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"String"}],["meta",{"property":"article:tag","content":"StringBuilder"}],["meta",{"property":"article:tag","content":"StringUtils"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T19:24:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中文本居中输出的不同方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T19:24:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中文本居中输出的不同方法 在基于Java的文本应用程序中，经常需要对文本进行居中对齐。此外，在为Xbox开发应用程序、命令行工具或任何涉及改善文本视觉表现的应用程序时，居中文本可以提升用户体验。 在本教程中，我们将深入探讨Java中文本输出居中对齐的不同方法。 2. 使用String格式化 Java中居中文本的最快方式可以通过使用String类..."},"headers":[{"level":2,"title":"2. 使用String格式化","slug":"_2-使用string格式化","link":"#_2-使用string格式化","children":[]},{"level":2,"title":"3. 使用StringBuilder","slug":"_3-使用stringbuilder","link":"#_3-使用stringbuilder","children":[]},{"level":2,"title":"4. 使用StringUtils","slug":"_4-使用stringutils","link":"#_4-使用stringutils","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719602659000,"updatedTime":1719602659000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.16,"words":647},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-How to Center Text Output in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在基于Java的文本应用程序中，经常需要对文本进行居中对齐。此外，在为Xbox开发应用程序、命令行工具或任何涉及改善文本视觉表现的应用程序时，居中文本可以提升用户体验。</p>\\n<p><strong>在本教程中，我们将深入探讨Java中文本输出居中对齐的不同方法。</strong></p>\\n<h2>2. 使用String格式化</h2>\\n<p>Java中居中文本的最快方式可以通过使用String类的format()方法提供。让我们看以下示例：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenTextAndTotalWidth_whenUsingStringFormat_thenTextIsCentered</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">String</span> text <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"Centered Text\\"</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">int</span> totalWidth <span class=\\"token operator\\">=</span> <span class=\\"token number\\">15</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">int</span> padding <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span>totalWidth <span class=\\"token operator\\">-</span> text<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">length</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">/</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">String</span> centeredText <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">format</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"%\\"</span> <span class=\\"token operator\\">+</span> padding <span class=\\"token operator\\">+</span> <span class=\\"token string\\">\\"s%s%\\"</span> <span class=\\"token operator\\">+</span> padding <span class=\\"token operator\\">+</span> <span class=\\"token string\\">\\"s\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"\\"</span><span class=\\"token punctuation\\">,</span> text<span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">Assert</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\" Centered Text \\"</span><span class=\\"token punctuation\\">,</span> centeredText<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
