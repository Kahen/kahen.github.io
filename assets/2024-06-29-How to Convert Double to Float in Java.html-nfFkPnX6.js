import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-BX3-P94R.js";const t={},o=e(`<h1 id="java中double与float的转换" tabindex="-1"><a class="header-anchor" href="#java中double与float的转换"><span>Java中Double与Float的转换</span></a></h1><p>_双精度浮点数_和_单精度浮点数_是Java中表示小数的两种数据类型。它们在处理小数时各有不同。</p><p>在本教程中，我们将讨论_double_和_float_，并学习如何将它们相互转换。</p><h3 id="_2-java中的double和float是什么" tabindex="-1"><a class="header-anchor" href="#_2-java中的double和float是什么"><span>2. Java中的Double和Float是什么</span></a></h3><p><strong>_float_是32位单精度浮点类型，可以存储大约7位小数。</strong> 这种数据类型在需要节省内存时具有优势。然而，不建议使用_float_来处理货币或高精度数据计算。</p><p>声明原始数据类型的_float_变量时，我们可以使用_float_关键字：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">float</span> vatRate <span class="token operator">=</span> <span class="token number">14.432511f</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>对于包装类，我们应该使用_Float_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Float</span> localTaxRate <span class="token operator">=</span> <span class="token number">20.12434f</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>由于我们处理的是_float_，变量的末尾应该有“f”后缀。否则，编译器会将其视为_double_并报错。</p><p><strong>另一方面，_double_是64位双精度浮点类型。</strong> 这种数据类型可以存储比_float_更多的小数位数，大约17位小数。由于其更高的精度，它是十进制计算的常见选择。和_float_一样，_double_也不推荐用于货币计算。</p><p>以下是如何使用_double_关键字声明_double_的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">double</span> shootingAverage <span class="token operator">=</span> <span class="token number">56.00000000000001</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过_Double_包装类声明_double_的另一种方式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Double</span> assistAverage <span class="token operator">=</span> <span class="token number">81.123000000045</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在决定使用_double_还是_float_数据类型时，需要考虑应用程序的技术需求和业务需求。</p><h3 id="_3-double和float之间的转换" tabindex="-1"><a class="header-anchor" href="#_3-double和float之间的转换"><span>3. Double和Float之间的转换</span></a></h3><p>在_Double_和_Float_之间进行转换是一个常见的技术需求。然而，在转换时我们应该小心，因为我们可能会丢失一些小数精度。随后，这可能导致我们的应用程序出现意外的行为。</p><h4 id="_3-1-将double转换为float" tabindex="-1"><a class="header-anchor" href="#_3-1-将double转换为float"><span>3.1. 将Double转换为Float</span></a></h4><p>让我们通过类型转换演示如何转换变量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">double</span> interestRatesYearly <span class="token operator">=</span> <span class="token number">13.333333333333333</span><span class="token punctuation">;</span>
<span class="token keyword">float</span> interest <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">)</span> interestRatesYearly<span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>interest<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//13.333333</span>
<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">13.333333f</span><span class="token punctuation">,</span> interest<span class="token punctuation">,</span> <span class="token number">0.000001f</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于我们执行了从_double_到_float_的类型转换，我们的新_float_值与其原始值相比丢失了一些小数位。</p><p>为了使用assertEquals()测试这种转换，我们使用了一个delta参数，值为0.000001，这对于转换后的13.333333值来说是足够的。</p><p>将_double_转换为_float_的另一种方法是通过包装类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Double</span> monthlyRates <span class="token operator">=</span> <span class="token number">2.111111111111111</span><span class="token punctuation">;</span>
<span class="token keyword">float</span> rates <span class="token operator">=</span> monthlyRates<span class="token punctuation">.</span><span class="token function">floatValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>rates<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//2.1111112</span>
<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2.1111111f</span><span class="token punctuation">,</span> rates<span class="token punctuation">,</span> <span class="token number">0.0000001f</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中，_monthlyRates_对象调用了一个名为_floatValue()<em>的方法，该方法返回了一个_float</em>。</p><p>与我们的第一个转换示例类似，我们为我们的delta使用了0.0000001的值。</p><h4 id="_3-2-将float转换为double" tabindex="-1"><a class="header-anchor" href="#_3-2-将float转换为double"><span>3.2. 将Float转换为Double</span></a></h4><p>接下来，让我们展示如何将_float_转换为_double_数据类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">float</span> gradeAverage <span class="token operator">=</span><span class="token number">2.05f</span><span class="token punctuation">;</span>
<span class="token keyword">double</span> average <span class="token operator">=</span> gradeAverage<span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>average<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//2.049999952316284</span>
<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2.05</span><span class="token punctuation">,</span> average<span class="token punctuation">,</span> <span class="token number">0.01</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们注意到转换为_double_的结果与我们预期的不同。问题在于浮点数的二进制表示。</p><p>将_float_转换为_double_的另一种方式是通过使用_Double_类通过_doubleValue()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Float</span> monthlyRates <span class="token operator">=</span> <span class="token number">2.1111111f</span><span class="token punctuation">;</span>
<span class="token class-name">Double</span> rates <span class="token operator">=</span> monthlyRates<span class="token punctuation">.</span><span class="token function">doubleValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>rates<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//2.1111111640930176</span>
<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2.11111111</span><span class="token punctuation">,</span> rates<span class="token punctuation">,</span> <span class="token number">0.0000001</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>像我们前一节的测试一样，我们在assertEquals()中使用了delta参数，用于本节的单元测试。</p><h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h3><p>在本文中，我们讨论了_float_和_double_数据类型。每种数据类型都有其特点和自己的精度大小。_double_数据类型比_float_有更多的小数位。然而，_float_数据类型在内存使用方面有自己的优势，而_double_在精度方面有其优势。</p><p>文章中使用的有代码示例都可以在GitHub上找到。</p>`,37),l=[o];function p(c,u){return s(),n("div",null,l)}const d=a(t,[["render",p],["__file","2024-06-29-How to Convert Double to Float in Java.html.vue"]]),_=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-How%20to%20Convert%20Double%20to%20Float%20in%20Java.html","title":"Java中Double与Float的转换","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["double","float","conversion"],"head":[["meta",{"name":"keywords","content":"Java, double to float, conversion, programming"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-How%20to%20Convert%20Double%20to%20Float%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中Double与Float的转换"}],["meta",{"property":"og:description","content":"Java中Double与Float的转换 _双精度浮点数_和_单精度浮点数_是Java中表示小数的两种数据类型。它们在处理小数时各有不同。 在本教程中，我们将讨论_double_和_float_，并学习如何将它们相互转换。 2. Java中的Double和Float是什么 _float_是32位单精度浮点类型，可以存储大约7位小数。 这种数据类型在需要..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T08:33:19.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"double"}],["meta",{"property":"article:tag","content":"float"}],["meta",{"property":"article:tag","content":"conversion"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T08:33:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中Double与Float的转换\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T08:33:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中Double与Float的转换 _双精度浮点数_和_单精度浮点数_是Java中表示小数的两种数据类型。它们在处理小数时各有不同。 在本教程中，我们将讨论_double_和_float_，并学习如何将它们相互转换。 2. Java中的Double和Float是什么 _float_是32位单精度浮点类型，可以存储大约7位小数。 这种数据类型在需要..."},"headers":[{"level":3,"title":"2. Java中的Double和Float是什么","slug":"_2-java中的double和float是什么","link":"#_2-java中的double和float是什么","children":[]},{"level":3,"title":"3. Double和Float之间的转换","slug":"_3-double和float之间的转换","link":"#_3-double和float之间的转换","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719649999000,"updatedTime":1719649999000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.07,"words":920},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-How to Convert Double to Float in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>_双精度浮点数_和_单精度浮点数_是Java中表示小数的两种数据类型。它们在处理小数时各有不同。</p>\\n<p>在本教程中，我们将讨论_double_和_float_，并学习如何将它们相互转换。</p>\\n<h3>2. Java中的Double和Float是什么</h3>\\n<p><strong>_float_是32位单精度浮点类型，可以存储大约7位小数。</strong> 这种数据类型在需要节省内存时具有优势。然而，不建议使用_float_来处理货币或高精度数据计算。</p>\\n<p>声明原始数据类型的_float_变量时，我们可以使用_float_关键字：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">float</span> vatRate <span class=\\"token operator\\">=</span> <span class=\\"token number\\">14.432511f</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,_ as data};
