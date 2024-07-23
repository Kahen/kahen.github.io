import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-on0L14Tx.js";const e={},p=t(`<hr><h1 id="如何在-kotlin-中计算标准差-baeldung-关于-kotlin" tabindex="-1"><a class="header-anchor" href="#如何在-kotlin-中计算标准差-baeldung-关于-kotlin"><span>如何在 Kotlin 中计算标准差 | Baeldung 关于 Kotlin</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在编程中，计算标准差是一个关键的统计任务，当我们需要确定数据集中的变异量或离散程度时，它非常有用。</p><p>在 Kotlin 中，有几种方法可以计算表示为数组的一系列数字的标准差。在本教程中，我们将探讨这些方法中的几种。</p><h2 id="_2-标准差的定义和公式" tabindex="-1"><a class="header-anchor" href="#_2-标准差的定义和公式"><span>2. 标准差的定义和公式</span></a></h2><p>正如前面提到的，标准差是衡量数据集中变异量或离散程度的一种方法。<strong>我们可以通过找到所考虑数据的方差的平方根来计算标准差</strong>。方差是每个数据点与所考虑数据的平均值之间的差的平方的平均值。</p><p>数学上，方差的公式是： [ \\text{方差} = \\frac{\\sum (x - \\mu)^2}{N} ]</p><p>其中 ( \\Sigma ) 表示每个数据点 ( x ) 减去数据的平均值 ( \\mu ) 的平方的总和。 ( N ) 表示数据点的数量。</p><p>因此，知道如何计算方差后，我们通过取方差的平方根来数学上获得标准差： [ \\text{标准差} = \\sqrt{\\text{方差}} ]</p><h2 id="_3-使用-kotlin-的标准库" tabindex="-1"><a class="header-anchor" href="#_3-使用-kotlin-的标准库"><span>3. 使用 Kotlin 的标准库</span></a></h2><p>第一种方法需要使用 Kotlin 的数学包，该包包含在标准库中。这个包带有许多方法，可以完成不同的数学任务，包括标准差。</p><p>具体来说，我们可以使用 <em>sqrt()</em> 方法来计算平方根，使用 <em>pow()</em> 来处理指数，使用 <em>average()</em> 来计算数字列表的平均值：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">standardDeviationUsingMathPackage</span><span class="token punctuation">(</span>numbers<span class="token operator">:</span> DoubleArray<span class="token punctuation">)</span><span class="token operator">:</span> Double <span class="token punctuation">{</span>
    <span class="token keyword">val</span> mean <span class="token operator">=</span> numbers<span class="token punctuation">.</span><span class="token function">average</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> variance <span class="token operator">=</span> numbers<span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> <span class="token punctuation">(</span>it <span class="token operator">-</span> mean<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">average</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token function">sqrt</span><span class="token punctuation">(</span>variance<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述方法中，我们首先使用 <em>average()</em> 方法计算数据集的平均值。<strong>接下来，我们通过从数据集中的每个数字中减去平均值，平方结果，然后获取平方差的平均水平作为数据集的方差</strong>。最后，我们返回方差的平方根以获得标准差。</p><p>现在，为了确保我们的方法正确，进行单元测试是一个好主意：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`standard deviation using the math package\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> dataset1 <span class="token operator">=</span> <span class="token function">doubleArrayOf</span><span class="token punctuation">(</span><span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token number">2.0</span><span class="token punctuation">,</span> <span class="token number">3.0</span><span class="token punctuation">,</span> <span class="token number">4.0</span><span class="token punctuation">,</span> <span class="token number">5.0</span><span class="token punctuation">,</span> <span class="token number">6.0</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> dataset2 <span class="token operator">=</span> <span class="token function">doubleArrayOf</span><span class="token punctuation">(</span><span class="token number">11.0</span><span class="token punctuation">,</span> <span class="token number">14.0</span><span class="token punctuation">,</span> <span class="token number">19.0</span><span class="token punctuation">,</span> <span class="token number">23.0</span><span class="token punctuation">,</span> <span class="token number">28.0</span><span class="token punctuation">,</span> <span class="token number">30.0</span><span class="token punctuation">)</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1.707825127659933</span><span class="token punctuation">,</span> <span class="token function">standardDeviationUsingMathPackage</span><span class="token punctuation">(</span>dataset1<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">6.914156170897181</span><span class="token punctuation">,</span> <span class="token function">standardDeviationUsingMathPackage</span><span class="token punctuation">(</span>dataset2<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用-apache-commons-math-库" tabindex="-1"><a class="header-anchor" href="#_4-使用-apache-commons-math-库"><span>4. 使用 Apache Commons Math 库</span></a></h2><p>另一种实现目的方法是利用提供复杂统计方法的第三方库。Apache Commons Math 库是这方面的一个流行选择，并提供了几种计算标准差的方法。</p><h3 id="_4-1-maven-和-gradle-配置" tabindex="-1"><a class="header-anchor" href="#_4-1-maven-和-gradle-配置"><span>4.1. Maven 和 Gradle 配置</span></a></h3><p>要在我们的 Maven 项目中使用这个库，我们需要在项目的 <em>pom.xml</em> 文件中包含依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.apache.commons\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`commons-math3\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`3.6.1\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于 Gradle 项目，我们只需要在项目的 <em>build.gradle</em> 文件中添加以下行：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>implementation <span class="token string">&#39;org.apache.commons:commons-math3:3.6.1&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-2-实现" tabindex="-1"><a class="header-anchor" href="#_4-2-实现"><span>4.2. 实现</span></a></h3><p>现在，让我们使用这个库来计算数据集的标准差：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">calculateStandardDeviationUsingApacheCommonsMath</span><span class="token punctuation">(</span>dataset<span class="token operator">:</span> DoubleArray<span class="token punctuation">)</span><span class="token operator">:</span> Double <span class="token punctuation">{</span>
    <span class="token keyword">val</span> sd <span class="token operator">=</span> <span class="token function">StandardDeviation</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> sd<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span>dataset<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个方法中，我们使用 <em>false</em> 参数实例化 <em>StandardDeviation</em> 实例。<strong>此参数允许我们指定所考虑的数据是样本还是整个总体</strong>。</p><p>如果设置为 <em>true</em>，此库将将数据集视为样本，并在计算标准差时应用略有不同的公式。然而，如果我们将此参数设置为 <em>false</em>，则库将将整个总体视为数据，并使用除以 <em>n</em> 的公式计算标准差。</p><p>最后，我们在使用数据集作为参数的 <em>StandardDeviation</em> 实例上使用 <em>evaluate()</em> 方法。这将返回数据集的标准差。</p><p>为了确保我们的实现正确，我们应该测试我们的函数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`standard deviation using the apache commons math library\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> dataset1 <span class="token operator">=</span> <span class="token function">doubleArrayOf</span><span class="token punctuation">(</span><span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token number">2.0</span><span class="token punctuation">,</span> <span class="token number">3.0</span><span class="token punctuation">,</span> <span class="token number">4.0</span><span class="token punctuation">,</span> <span class="token number">5.0</span><span class="token punctuation">,</span> <span class="token number">6.0</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> dataset2 <span class="token operator">=</span> <span class="token function">doubleArrayOf</span><span class="token punctuation">(</span><span class="token number">11.0</span><span class="token punctuation">,</span> <span class="token number">14.0</span><span class="token punctuation">,</span> <span class="token number">19.0</span><span class="token punctuation">,</span> <span class="token number">23.0</span><span class="token punctuation">,</span> <span class="token number">28.0</span><span class="token punctuation">,</span> <span class="token number">30.0</span><span class="token punctuation">)</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1.707825127659933</span><span class="token punctuation">,</span> <span class="token function">calculateStandardDeviationUsingApacheCommonsMath</span><span class="token punctuation">(</span>dataset1<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">6.914156170897181</span><span class="token punctuation">,</span> <span class="token function">calculateStandardDeviationUsingApacheCommonsMath</span><span class="token punctuation">(</span>dataset2<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了计算数据集标准差的两种主要方法。第一种方法涉及使用 Kotlin 的数学包，该包包含在标准库中，并且可以立即在我们的 Kotlin 程序中使用。</p><p>相反，第二种方法涉及使用第三方库，Apache Commons Math 库。虽然这个库为我们提供了高级统计方法，但它需要我们首先为项目配置它，然后才能使用。</p><p>一如既往，与本文相关的代码示例和相关测试用例可以在 GitHub 上找到。</p>`,36),o=[p];function l(c,i){return s(),a("div",null,o)}const d=n(e,[["render",l],["__file","2024-07-21-How to Calculate Standard Deviation in Kotlin.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-How%20to%20Calculate%20Standard%20Deviation%20in%20Kotlin.html","title":"如何在 Kotlin 中计算标准差 | Baeldung 关于 Kotlin","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","编程"],"tag":["标准差","数学","统计学"],"head":[["meta",{"name":"keywords","content":"Kotlin, 标准差, 编程, 数学, 统计学"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-How%20to%20Calculate%20Standard%20Deviation%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在 Kotlin 中计算标准差 | Baeldung 关于 Kotlin"}],["meta",{"property":"og:description","content":"如何在 Kotlin 中计算标准差 | Baeldung 关于 Kotlin 1. 引言 在编程中，计算标准差是一个关键的统计任务，当我们需要确定数据集中的变异量或离散程度时，它非常有用。 在 Kotlin 中，有几种方法可以计算表示为数组的一系列数字的标准差。在本教程中，我们将探讨这些方法中的几种。 2. 标准差的定义和公式 正如前面提到的，标准差是..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T19:12:54.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"标准差"}],["meta",{"property":"article:tag","content":"数学"}],["meta",{"property":"article:tag","content":"统计学"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T19:12:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在 Kotlin 中计算标准差 | Baeldung 关于 Kotlin\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T19:12:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在 Kotlin 中计算标准差 | Baeldung 关于 Kotlin 1. 引言 在编程中，计算标准差是一个关键的统计任务，当我们需要确定数据集中的变异量或离散程度时，它非常有用。 在 Kotlin 中，有几种方法可以计算表示为数组的一系列数字的标准差。在本教程中，我们将探讨这些方法中的几种。 2. 标准差的定义和公式 正如前面提到的，标准差是..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 标准差的定义和公式","slug":"_2-标准差的定义和公式","link":"#_2-标准差的定义和公式","children":[]},{"level":2,"title":"3. 使用 Kotlin 的标准库","slug":"_3-使用-kotlin-的标准库","link":"#_3-使用-kotlin-的标准库","children":[]},{"level":2,"title":"4. 使用 Apache Commons Math 库","slug":"_4-使用-apache-commons-math-库","link":"#_4-使用-apache-commons-math-库","children":[{"level":3,"title":"4.1. Maven 和 Gradle 配置","slug":"_4-1-maven-和-gradle-配置","link":"#_4-1-maven-和-gradle-配置","children":[]},{"level":3,"title":"4.2. 实现","slug":"_4-2-实现","link":"#_4-2-实现","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721589174000,"updatedTime":1721589174000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.78,"words":1135},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-How to Calculate Standard Deviation in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"<hr>\\n<h1>如何在 Kotlin 中计算标准差 | Baeldung 关于 Kotlin</h1>\\n<h2>1. 引言</h2>\\n<p>在编程中，计算标准差是一个关键的统计任务，当我们需要确定数据集中的变异量或离散程度时，它非常有用。</p>\\n<p>在 Kotlin 中，有几种方法可以计算表示为数组的一系列数字的标准差。在本教程中，我们将探讨这些方法中的几种。</p>\\n<h2>2. 标准差的定义和公式</h2>\\n<p>正如前面提到的，标准差是衡量数据集中变异量或离散程度的一种方法。<strong>我们可以通过找到所考虑数据的方差的平方根来计算标准差</strong>。方差是每个数据点与所考虑数据的平均值之间的差的平方的平均值。</p>","autoDesc":true}');export{d as comp,k as data};
