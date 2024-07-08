import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-C_fPDS1x.js";const e={},p=t(`<h1 id="kotlin中计算百分比-baeldung关于kotlin" tabindex="-1"><a class="header-anchor" href="#kotlin中计算百分比-baeldung关于kotlin"><span>Kotlin中计算百分比 | Baeldung关于Kotlin</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在Kotlin中，执行算术运算是直接的。然而，当涉及到计算百分比时，开发者可能会因为整数除法的特性而遇到意外的结果。</p><p>本教程探讨了在Kotlin中正确计算百分比，确保无论是使用整数还是浮点数都能得到准确的结果。</p><h2 id="_2-理解kotlin中的整数除法" tabindex="-1"><a class="header-anchor" href="#_2-理解kotlin中的整数除法"><span>2. 理解Kotlin中的整数除法</span></a></h2><p>Kotlin和许多编程语言一样，区分了整数和浮点数除法。<strong>当两个整数相除时，结果会被截断以产生另一个整数</strong>。这种行为在计算百分比时可能会导致不准确的结果：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> count <span class="token operator">=</span> <span class="token number">5</span>
<span class="token keyword">val</span> totalCount <span class="token operator">=</span> <span class="token number">10</span>
<span class="token keyword">var</span> result <span class="token operator">=</span> count <span class="token operator">/</span> totalCount
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，<code>count</code>除以<code>totalCount</code>的结果是零而不是<code>0.5</code>，导致意外的算术计算。</p><p>为了得到预期的小数结果，<strong>在执行除法之前，必须将一个或两个操作数转换为浮点类型</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">var</span> accurateResult <span class="token operator">=</span> count<span class="token punctuation">.</span><span class="token function">toDouble</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">/</span> totalCount
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这种转换确保除法操作产生浮点结果，保留预期的准确性。</p><h2 id="_3-准确计算百分比" tabindex="-1"><a class="header-anchor" href="#_3-准确计算百分比"><span>3. 准确计算百分比</span></a></h2><p>要在Kotlin中准确计算百分比，关键是解决整数除法带来的挑战。Kotlin强大的类型系统允许在数值类型之间无缝转换，确保操作产生预期的结果。计算百分比的公式涉及将部分除以整体并乘以100。</p><p>现在，我们将深入探讨确保精确计算百分比的细微差别，展示Kotlin在处理此类任务时的精确性和清晰度。</p><h3 id="_3-1-转换为浮点数以获得一致的结果" tabindex="-1"><a class="header-anchor" href="#_3-1-转换为浮点数以获得一致的结果"><span>3.1. 转换为浮点数以获得一致的结果</span></a></h3><p>为了一致性并避免整数除法的怪癖，建议将参与除法的所有数字转换为浮点类型：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">var</span> percentage <span class="token operator">=</span> <span class="token punctuation">(</span>count<span class="token punctuation">.</span><span class="token function">toDouble</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">/</span> totalCount<span class="token punctuation">.</span><span class="token function">toDouble</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">100.0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们通过一个简单的测试来确保这个逻辑是正确的：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`should return accurate division result\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> count <span class="token operator">=</span> <span class="token number">5</span>
    <span class="token keyword">val</span> totalCount <span class="token operator">=</span> <span class="token number">10</span>
    <span class="token keyword">val</span> expected <span class="token operator">=</span> <span class="token number">50.0</span>
    <span class="token keyword">val</span> result <span class="token operator">=</span> <span class="token punctuation">(</span>count<span class="token punctuation">.</span><span class="token function">toDouble</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">/</span> totalCount<span class="token punctuation">.</span><span class="token function">toDouble</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">100.0</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> result<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这确保我们的百分比计算基于准确的除法结果。</p><h3 id="_3-2-扩展函数用于百分比计算" tabindex="-1"><a class="header-anchor" href="#_3-2-扩展函数用于百分比计算"><span>3.2. 扩展函数用于百分比计算</span></a></h3><p>我们还可以在_Number_类上创建一个扩展函数，允许我们的函数接受任何数值类型，提供灵活性并增强可用性：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> Number<span class="token punctuation">.</span><span class="token function">divideToPercent</span><span class="token punctuation">(</span>divideTo<span class="token operator">:</span> Number<span class="token punctuation">)</span><span class="token operator">:</span> Double <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>divideTo<span class="token punctuation">.</span><span class="token function">toDouble</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0.0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">0.0</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">toDouble</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">/</span> divideTo<span class="token punctuation">.</span><span class="token function">toDouble</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">100.0</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>将结果转换为_Int_或_Long_会截断小数部分，所以我们返回一个_Double_代替</strong>。</p><p>为了验证我们的扩展函数_divideToPercent()_的正确性，我们可以编写一个JUnit测试：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`when dividing 10 by 20, should return 50\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> result <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">.</span><span class="token function">divideToPercent</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">50.0</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个测试检查_divideToPercent()_函数在10除以20时是否正确计算出50%。</p><h3 id="_3-3-使用infix函数提高可读性" tabindex="-1"><a class="header-anchor" href="#_3-3-使用infix函数提高可读性"><span>3.3. 使用Infix函数提高可读性</span></a></h3><p>Kotlin中的Infix函数提供了一种调用单参数函数的方式，而不需要括号。我们可以为计算百分比定义一个Infix函数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">infix</span> <span class="token keyword">fun</span> Number<span class="token punctuation">.</span><span class="token function">percentOf</span><span class="token punctuation">(</span>value<span class="token operator">:</span> Number<span class="token punctuation">)</span><span class="token operator">:</span> Double <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">toDouble</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0.0</span><span class="token punctuation">)</span> <span class="token number">0.0</span>
    <span class="token keyword">else</span> <span class="token punctuation">(</span>value<span class="token punctuation">.</span><span class="token function">toDouble</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">toDouble</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>随后，我们可以测试我们的Infix函数以确保其功能：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`when using infix function, 10 percentOf 200 should return 20\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> result <span class="token operator">=</span> <span class="token number">10</span> percentOf <span class="token number">200</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">20.0</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个测试验证_percentOf()_准确地计算出200的10%为20%。</p><h3 id="_3-4-利用-bigdecimal-进行精确计算" tabindex="-1"><a class="header-anchor" href="#_3-4-利用-bigdecimal-进行精确计算"><span>3.4. 利用_BigDecimal_进行精确计算</span></a></h3><p>此外，得益于Kotlin的Java互操作性，我们可以使用_BigDecimal_进行需要高精度的计算：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> BigDecimal<span class="token punctuation">.</span><span class="token function">percentOf</span><span class="token punctuation">(</span>total<span class="token operator">:</span> BigDecimal<span class="token punctuation">)</span><span class="token operator">:</span> BigDecimal <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>total <span class="token operator">==</span> BigDecimal<span class="token punctuation">.</span>ZERO<span class="token punctuation">)</span> BigDecimal<span class="token punctuation">.</span>ZERO
    <span class="token keyword">else</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">divide</span><span class="token punctuation">(</span>total<span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> BigDecimal<span class="token punctuation">.</span>ROUND_HALF_UP<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token function">BigDecimal</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>BigDecimal_确保我们的百分比计算精确，这在财务应用中特别有用。在这个例子中，我们将精度保留到小数点后五位，并遵循自然的数学舍入规则_ROUND_HALF_UP</em>。</p><p>让我们也编写一个单元测试来验证这种方法：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`calculate percentage using BigDecimal for high precision\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> part <span class="token operator">=</span> <span class="token function">BigDecimal</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;25&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> whole <span class="token operator">=</span> <span class="token function">BigDecimal</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;200&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> expectedPercentage <span class="token operator">=</span> <span class="token function">BigDecimal</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;12.50&quot;</span></span><span class="token punctuation">)</span>

    <span class="token keyword">val</span> resultPercentage <span class="token operator">=</span> part<span class="token punctuation">.</span><span class="token function">percentOf</span><span class="token punctuation">(</span>whole<span class="token punctuation">)</span>

    assertTrue <span class="token punctuation">{</span> resultPercentage<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>expectedPercentage<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-格式化百分比输出" tabindex="-1"><a class="header-anchor" href="#_4-格式化百分比输出"><span>4. 格式化百分比输出</span></a></h2><p>最后，在计算出百分比后，将输出格式化为百分比可以提高可读性。让我们定义一个格式化函数，然后使用我们的百分比函数之一并打印结果：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> Number<span class="token punctuation">.</span><span class="token function">formatPercent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression"><span class="token keyword">this</span></span></span><span class="token string">%&quot;</span></span>

<span class="token keyword">val</span> percentage<span class="token operator">:</span> Double <span class="token operator">=</span> <span class="token number">10</span> percentOf <span class="token number">200</span>
<span class="token function">println</span><span class="token punctuation">(</span>percentage<span class="token punctuation">.</span><span class="token function">formatPercent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个简单的扩展函数将百分比符号附加到我们的_percentage_上，并将打印“50.0%”，清楚地表明该值表示一个百分比。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在Kotlin中计算百分比，如果不正确处理，由于整数除法可能会导致不准确。我们可以通过将操作数转换为浮点数来确保精确计算。Kotlin提供了许多创建易于阅读的方式来处理这种计算。最后，我们讨论了如何格式化百分比以帮助在显示结果时传达意图。</p><p>正如往常一样，本文中使用的代码可以在GitHub上找到。翻译已经完成，以下是文章的结尾部分：</p><h2 id="_6-代码示例" tabindex="-1"><a class="header-anchor" href="#_6-代码示例"><span>6. 代码示例</span></a></h2><p>文章中提供的代码示例可以在GitHub上找到，以下是链接：</p><p><a href="https://github.com/baeldung/kotlin-percentage-computation" target="_blank" rel="noopener noreferrer">Baeldung Kotlin Percentage Computation on GitHub</a></p><h2 id="_7-总结" tabindex="-1"><a class="header-anchor" href="#_7-总结"><span>7. 总结</span></a></h2><p>通过上述方法，我们可以确保在Kotlin中进行百分比计算时的准确性和可读性。整数除法的问题可以通过将操作数转换为浮点数来解决，而Kotlin的类型系统和扩展函数、Infix函数以及<code>BigDecimal</code>的使用，为我们提供了灵活且精确的计算方式。最后，通过格式化输出，我们可以更清晰地表达计算结果。</p><p>OK</p>`,52),o=[p];function l(i,c){return s(),a("div",null,o)}const d=n(e,[["render",l],["__file","2024-07-05-Calculate Percentage in Kotlin.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Calculate%20Percentage%20in%20Kotlin.html","title":"Kotlin中计算百分比 | Baeldung关于Kotlin","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","编程"],"tag":["Kotlin","百分比计算"],"head":[["meta",{"name":"keywords","content":"Kotlin, 百分比计算, 编程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Calculate%20Percentage%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中计算百分比 | Baeldung关于Kotlin"}],["meta",{"property":"og:description","content":"Kotlin中计算百分比 | Baeldung关于Kotlin 1. 引言 在Kotlin中，执行算术运算是直接的。然而，当涉及到计算百分比时，开发者可能会因为整数除法的特性而遇到意外的结果。 本教程探讨了在Kotlin中正确计算百分比，确保无论是使用整数还是浮点数都能得到准确的结果。 2. 理解Kotlin中的整数除法 Kotlin和许多编程语言一样..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T06:56:59.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"百分比计算"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T06:56:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中计算百分比 | Baeldung关于Kotlin\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T06:56:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中计算百分比 | Baeldung关于Kotlin 1. 引言 在Kotlin中，执行算术运算是直接的。然而，当涉及到计算百分比时，开发者可能会因为整数除法的特性而遇到意外的结果。 本教程探讨了在Kotlin中正确计算百分比，确保无论是使用整数还是浮点数都能得到准确的结果。 2. 理解Kotlin中的整数除法 Kotlin和许多编程语言一样..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 理解Kotlin中的整数除法","slug":"_2-理解kotlin中的整数除法","link":"#_2-理解kotlin中的整数除法","children":[]},{"level":2,"title":"3. 准确计算百分比","slug":"_3-准确计算百分比","link":"#_3-准确计算百分比","children":[{"level":3,"title":"3.1. 转换为浮点数以获得一致的结果","slug":"_3-1-转换为浮点数以获得一致的结果","link":"#_3-1-转换为浮点数以获得一致的结果","children":[]},{"level":3,"title":"3.2. 扩展函数用于百分比计算","slug":"_3-2-扩展函数用于百分比计算","link":"#_3-2-扩展函数用于百分比计算","children":[]},{"level":3,"title":"3.3. 使用Infix函数提高可读性","slug":"_3-3-使用infix函数提高可读性","link":"#_3-3-使用infix函数提高可读性","children":[]},{"level":3,"title":"3.4. 利用_BigDecimal_进行精确计算","slug":"_3-4-利用-bigdecimal-进行精确计算","link":"#_3-4-利用-bigdecimal-进行精确计算","children":[]}]},{"level":2,"title":"4. 格式化百分比输出","slug":"_4-格式化百分比输出","link":"#_4-格式化百分比输出","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]},{"level":2,"title":"6. 代码示例","slug":"_6-代码示例","link":"#_6-代码示例","children":[]},{"level":2,"title":"7. 总结","slug":"_7-总结","link":"#_7-总结","children":[]}],"git":{"createdTime":1720162619000,"updatedTime":1720162619000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.82,"words":1445},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Calculate Percentage in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在Kotlin中，执行算术运算是直接的。然而，当涉及到计算百分比时，开发者可能会因为整数除法的特性而遇到意外的结果。</p>\\n<p>本教程探讨了在Kotlin中正确计算百分比，确保无论是使用整数还是浮点数都能得到准确的结果。</p>\\n<h2>2. 理解Kotlin中的整数除法</h2>\\n<p>Kotlin和许多编程语言一样，区分了整数和浮点数除法。<strong>当两个整数相除时，结果会被截断以产生另一个整数</strong>。这种行为在计算百分比时可能会导致不准确的结果：</p>\\n<div class=\\"language-kotlin\\" data-ext=\\"kt\\" data-title=\\"kt\\"><pre class=\\"language-kotlin\\"><code><span class=\\"token keyword\\">val</span> count <span class=\\"token operator\\">=</span> <span class=\\"token number\\">5</span>\\n<span class=\\"token keyword\\">val</span> totalCount <span class=\\"token operator\\">=</span> <span class=\\"token number\\">10</span>\\n<span class=\\"token keyword\\">var</span> result <span class=\\"token operator\\">=</span> count <span class=\\"token operator\\">/</span> totalCount\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
