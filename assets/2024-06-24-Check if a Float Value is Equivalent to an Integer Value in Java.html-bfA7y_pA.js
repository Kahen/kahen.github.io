import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BBuWtJOD.js";const e={},o=t(`<h1 id="java中检查浮点数是否等同于整数值" tabindex="-1"><a class="header-anchor" href="#java中检查浮点数是否等同于整数值"><span>Java中检查浮点数是否等同于整数值</span></a></h1><p>浮点数通常使用Java的<code>float</code>或<code>double</code>数据类型来表示。然而，由于精度的限制，它们使用二进制表示这些值，当它们直接与整数值比较时，结果可能是出乎意料的。</p><p><strong>在本教程中，我们将讨论在Java中检查<code>float</code>值是否等同于<code>integer</code>值的各种方法。</strong></p><h2 id="_2-使用类型转换" tabindex="-1"><a class="header-anchor" href="#_2-使用类型转换"><span>2. 使用类型转换</span></a></h2><p>一种简单的方法是使用类型转换将浮点值转换为整数，然后进行比较。</p><p>以下是示例代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">float</span> floatValue <span class="token operator">=</span> <span class="token number">10.0f</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenFloatAndIntValues_whenCastingToInt_thenCheckIfFloatValueIsEquivalentToIntegerValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> intValue <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> floatValue<span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>floatValue<span class="token punctuation">,</span> intValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个片段中，我们将<code>floatValue</code>初始化为<code>10.0f</code>。然后，我们使用类型转换将其转换为整数，并最后检查<code>floatValue</code>是否等同于转换后的整数值<code>intValue</code>。</p><h2 id="_3-与容差比较" tabindex="-1"><a class="header-anchor" href="#_3-与容差比较"><span>3. 与容差比较</span></a></h2><p>由于浮点精度限制，使用容差比较浮点和整数值通常更合适。<strong>这允许由于二进制特性而产生的变异。</strong></p><p>让我们看看以下代码片段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenFloatAndIntValues_whenUsingTolerance_thenCheckIfFloatValueIsEquivalentToIntegerValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> intValue <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token keyword">float</span> tolerance <span class="token operator">=</span> <span class="token number">0.0001f</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>floatValue <span class="token operator">-</span> intValue<span class="token punctuation">)</span> <span class="token operator">&lt;=</span> tolerance<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们用<code>0.0001f</code>初始化一个浮点变量（容差）。然后，我们检查<code>floatValue</code>和<code>intValue</code>变量之间的差的绝对值是否小于或等于我们设置的<code>tolerance</code>值。</p><h2 id="_4-使用float-compare" tabindex="-1"><a class="header-anchor" href="#_4-使用float-compare"><span>4. 使用<code>Float.compare()</code></span></a></h2><p>Java提供了<code>Float.compare()</code>方法用于精确的浮点比较。<strong>这个方法将<code>NaN</code>值和负零视为可靠的比较机制。</strong></p><p>以下是示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenFloatAndIntValues_whenUsingFloatCompare_thenCheckIfFloatValueIsEquivalentToIntegerValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> intValue <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Float</span><span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span>floatValue<span class="token punctuation">,</span> intValue<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们使用<code>Float.compare()</code>方法来检查它们是否匹配。<strong><code>Float.compare()</code>方法如果两个变量相等则返回0，如果第一个变量小于第二个变量则返回负数，否则返回正数。</strong></p><h2 id="_5-使用math-round" tabindex="-1"><a class="header-anchor" href="#_5-使用math-round"><span>5. 使用<code>Math.round()</code></span></a></h2><p>另一种方法是使用<code>Math.round()</code>方法。这个内置的数学方法返回与参数最接近的长整型值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenFloatAndIntValues_wheUsingRound_thenCheckIfFloatValueIsEquivalentToIntegerValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> intValue <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>intValue<span class="token punctuation">,</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">round</span><span class="token punctuation">(</span>floatValue<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们直接使用<code>Math.round()</code>方法对浮点值进行四舍五入，然后检查四舍五入后的值是否等同于整数值。</p><h2 id="_6-使用scanner" tabindex="-1"><a class="header-anchor" href="#_6-使用scanner"><span>6. 使用<code>Scanner</code></span></a></h2><p>我们可以使用<code>Scanner</code>类来动态检测用户输入的类型，无论是整数还是浮点数。<strong>这种方法支持交互性贡献，从而使程序更加灵活：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenFloatAndIntValues_whenUsingScanner_thenCheckIfFloatValueIsEquivalentToIntegerValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token string">&quot;10.0&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ByteArrayInputStream</span><span class="token punctuation">(</span>input<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">float</span> actualFloatValue<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>sc<span class="token punctuation">.</span><span class="token function">hasNextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> intValue <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        actualFloatValue <span class="token operator">=</span> intValue<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>sc<span class="token punctuation">.</span><span class="token function">hasNextFloat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        actualFloatValue <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextFloat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        actualFloatValue <span class="token operator">=</span> <span class="token class-name">Float<span class="token punctuation">.</span>NaN</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    sc<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>floatValue<span class="token punctuation">,</span> actualFloatValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们将用户输入模拟为字符串。然后使用<code>Scanner</code>动态检测输入是整数还是浮点数，并将结果与原始浮点值进行比较。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>总之，我们对在Java中验证浮点值是否等于整数值的方法有了一个很好的概览。</p><p>如常，相应的源代码可以在GitHub上找到。</p>`,29),p=[o];function c(l,i){return s(),a("div",null,p)}const d=n(e,[["render",c],["__file","2024-06-24-Check if a Float Value is Equivalent to an Integer Value in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-Check%20if%20a%20Float%20Value%20is%20Equivalent%20to%20an%20Integer%20Value%20in%20Java.html","title":"Java中检查浮点数是否等同于整数值","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Java","编程"],"tag":["float","integer","比较"],"head":[["meta",{"name":"keywords","content":"Java, float, integer, 比较, 精度"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-Check%20if%20a%20Float%20Value%20is%20Equivalent%20to%20an%20Integer%20Value%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中检查浮点数是否等同于整数值"}],["meta",{"property":"og:description","content":"Java中检查浮点数是否等同于整数值 浮点数通常使用Java的float或double数据类型来表示。然而，由于精度的限制，它们使用二进制表示这些值，当它们直接与整数值比较时，结果可能是出乎意料的。 在本教程中，我们将讨论在Java中检查float值是否等同于integer值的各种方法。 2. 使用类型转换 一种简单的方法是使用类型转换将浮点值转换为整..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T09:30:35.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"float"}],["meta",{"property":"article:tag","content":"integer"}],["meta",{"property":"article:tag","content":"比较"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-24T09:30:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中检查浮点数是否等同于整数值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-24T09:30:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中检查浮点数是否等同于整数值 浮点数通常使用Java的float或double数据类型来表示。然而，由于精度的限制，它们使用二进制表示这些值，当它们直接与整数值比较时，结果可能是出乎意料的。 在本教程中，我们将讨论在Java中检查float值是否等同于integer值的各种方法。 2. 使用类型转换 一种简单的方法是使用类型转换将浮点值转换为整..."},"headers":[{"level":2,"title":"2. 使用类型转换","slug":"_2-使用类型转换","link":"#_2-使用类型转换","children":[]},{"level":2,"title":"3. 与容差比较","slug":"_3-与容差比较","link":"#_3-与容差比较","children":[]},{"level":2,"title":"4. 使用Float.compare()","slug":"_4-使用float-compare","link":"#_4-使用float-compare","children":[]},{"level":2,"title":"5. 使用Math.round()","slug":"_5-使用math-round","link":"#_5-使用math-round","children":[]},{"level":2,"title":"6. 使用Scanner","slug":"_6-使用scanner","link":"#_6-使用scanner","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719221435000,"updatedTime":1719221435000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.54,"words":763},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-Check if a Float Value is Equivalent to an Integer Value in Java.md","localizedDate":"2024年6月24日","excerpt":"\\n<p>浮点数通常使用Java的<code>float</code>或<code>double</code>数据类型来表示。然而，由于精度的限制，它们使用二进制表示这些值，当它们直接与整数值比较时，结果可能是出乎意料的。</p>\\n<p><strong>在本教程中，我们将讨论在Java中检查<code>float</code>值是否等同于<code>integer</code>值的各种方法。</strong></p>\\n<h2>2. 使用类型转换</h2>\\n<p>一种简单的方法是使用类型转换将浮点值转换为整数，然后进行比较。</p>\\n<p>以下是示例代码：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">float</span> floatValue <span class=\\"token operator\\">=</span> <span class=\\"token number\\">10.0f</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenFloatAndIntValues_whenCastingToInt_thenCheckIfFloatValueIsEquivalentToIntegerValue</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">int</span> intValue <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span><span class=\\"token punctuation\\">)</span> floatValue<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span>floatValue<span class=\\"token punctuation\\">,</span> intValue<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
