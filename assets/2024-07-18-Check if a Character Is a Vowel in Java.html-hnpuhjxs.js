import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CtR6X2Br.js";const e={},p=t(`<hr><h1 id="在java中检查字符是否为元音" tabindex="-1"><a class="header-anchor" href="#在java中检查字符是否为元音"><span>在Java中检查字符是否为元音</span></a></h1><ol><li><p>概述 当处理来自字符串的字符时，我们可能希望根据它们是否属于特定组来对它们进行分类。例如，英文字母表中的字符要么是元音，要么是辅音。 在本教程中，我们将探讨几种检查字符是否为元音的方法。我们可以轻松地将这些方法扩展到其他字符组。</p></li><li><p>使用_indexOf_方法检查元音 正如我们所知，所有的元音字母，我们可以将它们（包括大小写）添加到一个字符串中：</p></li></ol><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token constant">VOWELS</span> <span class="token operator">=</span> <span class="token string">&quot;aeiouAEIOU&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>我们可以使用字符串类中的_indexOf_方法来查看字符是否存在</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> <span class="token function">isInVowelsString</span><span class="token punctuation">(</span><span class="token keyword">char</span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token constant">VOWELS</span><span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果字符存在，则索引不会是-1。如果是-1，则字符不在元音字母集中。让我们测试一下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token function">isInVowelsString</span><span class="token punctuation">(</span><span class="token char">&#39;e&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token function">isInVowelsString</span><span class="token punctuation">(</span><span class="token char">&#39;z&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isFalse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用的是Java中的字符。如果我们的字符是一个单字符字符串对象，我们可以使用不同的实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> <span class="token function">isInVowelsString</span><span class="token punctuation">(</span><span class="token class-name">String</span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token constant">VOWELS</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它将通过相同的测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token function">isInVowelsString</span><span class="token punctuation">(</span><span class="token string">&quot;e&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token function">isInVowelsString</span><span class="token punctuation">(</span><span class="token string">&quot;z&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isFalse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，这种方法有一些实现开销。然而，我们必须遍历元音字符串中的10个可能的元音字母，以确定某物是否在该组中。</p><ol start="3"><li>使用_switch_检查元音 我们可以使用_switch_语句，每个元音字母是一个单独的_case_：</li></ol><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> <span class="token function">isVowelBySwitch</span><span class="token punctuation">(</span><span class="token keyword">char</span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token char">&#39;a&#39;</span><span class="token operator">:</span>
        <span class="token keyword">case</span> <span class="token char">&#39;e&#39;</span><span class="token operator">:</span>
        <span class="token keyword">case</span> <span class="token char">&#39;i&#39;</span><span class="token operator">:</span>
        <span class="token keyword">case</span> <span class="token char">&#39;o&#39;</span><span class="token operator">:</span>
        <span class="token keyword">case</span> <span class="token char">&#39;u&#39;</span><span class="token operator">:</span>
        <span class="token keyword">case</span> <span class="token char">&#39;A&#39;</span><span class="token operator">:</span>
        <span class="token keyword">case</span> <span class="token char">&#39;E&#39;</span><span class="token operator">:</span>
        <span class="token keyword">case</span> <span class="token char">&#39;I&#39;</span><span class="token operator">:</span>
        <span class="token keyword">case</span> <span class="token char">&#39;O&#39;</span><span class="token operator">:</span>
        <span class="token keyword">case</span> <span class="token char">&#39;U&#39;</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们也可以测试这个：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token function">isVowelBySwitch</span><span class="token punctuation">(</span><span class="token char">&#39;e&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token function">isVowelBySwitch</span><span class="token punctuation">(</span><span class="token char">&#39;z&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isFalse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>由于Java支持在_switch_语句中使用字符串，我们也可以使用单字符字符串来实现这个。</p><ol start="4"><li>使用正则表达式检查元音 虽然我们可以实现我们自己的字符串匹配算法，但<strong>Java正则表达式引擎允许我们强大地匹配字符串</strong>。 让我们构建一个正则表达式来识别元音：</li></ol><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Pattern</span> <span class="token constant">VOWELS_PATTERN</span> <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;[aeiou]&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token constant">CASE_INSENSITIVE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em>[ ]</em> 用于表示字符类。我们只将元音字母以小写形式放入这个类中，因为我们可以用不区分大小写的方式匹配它们。 让我们实现我们的匹配算法，用于单字符字符串对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> <span class="token function">isVowelByRegex</span><span class="token punctuation">(</span><span class="token class-name">String</span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token constant">VOWELS_PATTERN</span><span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们测试一下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token function">isVowelByRegex</span><span class="token punctuation">(</span><span class="token string">&quot;e&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token function">isVowelByRegex</span><span class="token punctuation">(</span><span class="token string">&quot;E&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，正则表达式是不区分大小写的。 我们应该注意到，这需要输入是一个字符串，而不是字符。尽管<strong>我们可以使用字符类的_toString_方法将字符转换为字符串</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token function">isVowelByRegex</span><span class="token punctuation">(</span><span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token char">&#39;e&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用正则表达式使处理这个问题的一般情况变得简单。我们可以指定任何字符组使用字符类，包括字符范围。</p><ol start="5"><li>我们应该使用哪种解决方案？ 基于字符串的解决方案可能是最容易理解的，并且表现相当不错，因为它只需要为它分类的每个字符检查最多10个选项。 然而，我们通常会期望_switch_语句比字符串查找执行得更快。 正则表达式解决方案应该表现非常好，因为正则表达式在_Pattern_的_compile_方法期间进行了优化。然而，正则表达式可能更复杂，实施起来可能不值得用于像检测元音这样简单的事情。同样，如果我们正在处理字符值，那么正则表达式需要一些转换，而其他方法则不需要。</li></ol><p>然而，<strong>使用正则表达式允许我们实现复杂的表达式来分类字符</strong>。</p><ol start="6"><li>结论 在本文中，我们已经看到了几种不同的方式来识别字符是否为元音。我们看到了如何使用包含所有元音字母的字符串以及如何实现_switch_语句。 最后，我们看到了如何使用正则表达式来解决这个问题以及更一般的情况。 如往常一样，本教程的完整代码可以在GitHub上找到。</li></ol>`,30),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-18-Check if a Character Is a Vowel in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Check%20if%20a%20Character%20Is%20a%20Vowel%20in%20Java.html","title":"在Java中检查字符是否为元音","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java"],"tag":["Character","Vowel"],"head":[["meta",{"name":"keywords","content":"Java, Character, Vowel"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Check%20if%20a%20Character%20Is%20a%20Vowel%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中检查字符是否为元音"}],["meta",{"property":"og:description","content":"在Java中检查字符是否为元音 概述 当处理来自字符串的字符时，我们可能希望根据它们是否属于特定组来对它们进行分类。例如，英文字母表中的字符要么是元音，要么是辅音。 在本教程中，我们将探讨几种检查字符是否为元音的方法。我们可以轻松地将这些方法扩展到其他字符组。 使用_indexOf_方法检查元音 正如我们所知，所有的元音字母，我们可以将它们（包括大小写..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T14:32:34.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Character"}],["meta",{"property":"article:tag","content":"Vowel"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T14:32:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中检查字符是否为元音\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T14:32:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中检查字符是否为元音 概述 当处理来自字符串的字符时，我们可能希望根据它们是否属于特定组来对它们进行分类。例如，英文字母表中的字符要么是元音，要么是辅音。 在本教程中，我们将探讨几种检查字符是否为元音的方法。我们可以轻松地将这些方法扩展到其他字符组。 使用_indexOf_方法检查元音 正如我们所知，所有的元音字母，我们可以将它们（包括大小写..."},"headers":[],"git":{"createdTime":1721313154000,"updatedTime":1721313154000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.72,"words":1115},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Check if a Character Is a Vowel in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>在Java中检查字符是否为元音</h1>\\n<ol>\\n<li>\\n<p>概述\\n当处理来自字符串的字符时，我们可能希望根据它们是否属于特定组来对它们进行分类。例如，英文字母表中的字符要么是元音，要么是辅音。\\n在本教程中，我们将探讨几种检查字符是否为元音的方法。我们可以轻松地将这些方法扩展到其他字符组。</p>\\n</li>\\n<li>\\n<p>使用_indexOf_方法检查元音\\n正如我们所知，所有的元音字母，我们可以将它们（包括大小写）添加到一个字符串中：</p>\\n</li>\\n</ol>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span> <span class=\\"token constant\\">VOWELS</span> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"aeiouAEIOU\\"</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
