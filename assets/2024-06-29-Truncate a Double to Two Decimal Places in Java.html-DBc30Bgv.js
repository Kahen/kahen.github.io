import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CM1q4_9A.js";const e={},p=t(`<h1 id="java中将double截断为两位小数的方法-baeldung" tabindex="-1"><a class="header-anchor" href="#java中将double截断为两位小数的方法-baeldung"><span>Java中将double截断为两位小数的方法 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将探讨Java中将_double_截断为两位小数的多种选项。我们将看到将结果保留为_String_的方法，以及返回_Numbers_的选项。</p><h2 id="_2-使用-math-floor-和-math-ceil-进行四舍五入" tabindex="-1"><a class="header-anchor" href="#_2-使用-math-floor-和-math-ceil-进行四舍五入"><span>2. 使用_Math.floor()_和_Math.ceil()_进行四舍五入</span></a></h2><p>我们将首先检查使用_Math_类来去除多余的小数位的方法。要将正数截断为两位小数，我们首先将_double_乘以100，将我们想要保留的所有数字移动到小数点前面。接下来，我们使用_Math.floor()_向下取整，去除小数点后的数字。最后，我们除以100来撤销之前的乘法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenADouble_whenUsingMath_truncateToTwoDecimalPlaces</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">double</span> positive <span class="token operator">=</span> <span class="token number">1.55555555</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> truncated <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>positive <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">100</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;1.55&quot;</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>truncated<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">double</span> negative <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1.55555555</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> negativeTruncated <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">ceil</span><span class="token punctuation">(</span>negative <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">100</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;-1.55&quot;</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>negativeTruncated<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于负数，过程几乎相同，但我们使用_Math.ceil()_而不是_Math.floor()_来向上取整。如果我们愿意，我们可以添加额外的代码来检测_double_是负数还是正数，并自动使用正确的方法。</p><p>对于去除更多或更少的小数位，我们将在乘法和除法的数字中添加或删除零。例如，要保持三位小数，我们将乘以和除以1000。如果我们想要保持_double_作为_double_而不是转换为_String_，这种方法很有用。</p><h2 id="_3-使用-string-format" tabindex="-1"><a class="header-anchor" href="#_3-使用-string-format"><span>3. 使用_String.format()_</span></a></h2><p>让我们继续探讨那些为显示目的而设计的方法。这些方法将返回一个_String_，但如果需要，我们总是可以将结果转换回_double_。_String.format()<em>方法接受两个参数。首先，我们想要应用的格式，其次，由格式引用的参数。要截断到两位小数，我们将使用格式_String</em> &quot;%.2f&quot;：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenADouble_whenUsingStringFormat_truncateToTwoDecimalPlaces</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span> positive <span class="token operator">=</span> <span class="token number">1.55555555</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> truncated <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;%.2f&quot;</span><span class="token punctuation">,</span> positive<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;1.56&quot;</span><span class="token punctuation">,</span> truncated<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">double</span> negative <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1.55555555</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> negativeTruncated <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;%.2f&quot;</span><span class="token punctuation">,</span> negative<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;-1.56&quot;</span><span class="token punctuation">,</span> negativeTruncated<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们格式_String_末尾的&#39;f&#39;指示格式化器产生十进制格式，&#39;.2&#39;意味着我们想要小数点后两位数字。我们可以调整这个来截断所需的小数位数。我们可以看到，在测试中，结果实际上已经向上取整而不是截断，所以根据我们的需求，这可能不适合。</p><h2 id="_4-使用-numberformat" tabindex="-1"><a class="header-anchor" href="#_4-使用-numberformat"><span>4. 使用_NumberFormat_</span></a></h2><p>_NumberFormat_是一个抽象类，设计用来让我们格式化任何数字。因为它是一个抽象类，我们需要先使用_getNumberInstance()_来接收一个我们可以使用的对象。注意，这将使用我们的默认区域设置，除非我们指示它做其他事情。我们可以接着使用_setMaximumFractionDigits()_来说我们想要多少小数位。最后，因为我们想要截断而不是四舍五入，我们使用_setRoundingMode()_并用参数_RoundingMode.DOWN_调用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenADouble_whenUsingNumberFormat_truncateToTwoDecimalPlaces</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">NumberFormat</span> nf <span class="token operator">=</span> <span class="token class-name">NumberFormat</span><span class="token punctuation">.</span><span class="token function">getNumberInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    nf<span class="token punctuation">.</span><span class="token function">setMaximumFractionDigits</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    nf<span class="token punctuation">.</span><span class="token function">setRoundingMode</span><span class="token punctuation">(</span><span class="token class-name">RoundingMode</span><span class="token punctuation">.</span><span class="token constant">DOWN</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">double</span> value <span class="token operator">=</span> <span class="token number">1.55555555</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> truncated <span class="token operator">=</span> nf<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;1.55&quot;</span><span class="token punctuation">,</span> truncated<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">double</span> negativeValue <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1.55555555</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> negativeTruncated <span class="token operator">=</span> nf<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>negativeValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;-1.55&quot;</span><span class="token punctuation">,</span> negativeTruncated<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用NumberFormat设置后，只需使用_double_调用_format()_即可。在上面的测试中，我们可以看到它对正数和负数都表现得很好。</p><h2 id="_5-使用-decimalformat" tabindex="-1"><a class="header-anchor" href="#_5-使用-decimalformat"><span>5. 使用_DecimalFormat_</span></a></h2><p>_DecimalFormat_是_NumberFormat_的一个子类，专门用于小数。<strong>它是一个具体类，所以我们可以直接创建它的实例，将我们想要的模式传递给构造函数。</strong> 我们将在这里传递“#.##。”，小数点后的井号数量表示要保留多少位：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenADouble_whenUsingDecimalFormat_truncateToTwoDecimalPlaces</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">DecimalFormat</span> df <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DecimalFormat</span><span class="token punctuation">(</span><span class="token string">&quot;#.##&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    df<span class="token punctuation">.</span><span class="token function">setRoundingMode</span><span class="token punctuation">(</span><span class="token class-name">RoundingMode</span><span class="token punctuation">.</span><span class="token constant">DOWN</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">double</span> value <span class="token operator">=</span> <span class="token number">1.55555555</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> truncated <span class="token operator">=</span> df<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;1.55&quot;</span><span class="token punctuation">,</span> truncated<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">double</span> negativeValue <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1.55555555</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> negativeTruncated <span class="token operator">=</span> df<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>negativeValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;-1.55&quot;</span><span class="token punctuation">,</span> negativeTruncated<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与之前的_NumberFormat_一样，我们指定了使用_RoundingMode.DOWN_。我们再次看到，这个解决方案很好地处理了正数和负数，这使它很有用。</p><h2 id="_6-使用-bigdecimal-获得最佳精度" tabindex="-1"><a class="header-anchor" href="#_6-使用-bigdecimal-获得最佳精度"><span>6. 使用_BigDecimal_获得最佳精度</span></a></h2><p>Java的_BigDecimal_类最适合直接截断小数位，同时保持结果为我们可以工作的数字。如果可能使用这个而不是_double_，这可能是最佳选项。我们可以通过将_double_值传递到构造函数中，并直接告诉它保留两位小数同时向下取整来创建一个_BigInteger_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenADouble_whenUsingBigDecimal_truncateToTwoDecimalPlaces</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">BigDecimal</span> positive <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token number">2.555555</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setScale</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token class-name">RoundingMode</span><span class="token punctuation">.</span><span class="token constant">DOWN</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">BigDecimal</span> negative <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">2.555555</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setScale</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token class-name">RoundingMode</span><span class="token punctuation">.</span><span class="token constant">DOWN</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;2.55&quot;</span><span class="token punctuation">,</span> positive<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;-2.55&quot;</span><span class="token punctuation">,</span> negative<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了这个测试的目的，我们把结果转换为_String_，以清楚地显示结果是什么。然而，如果我们想要的话，我们可以继续使用截断的输出进行进一步的计算。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>我们探讨了Java中截断_double_的五种不同方式。我们看到_String.format()<em>、<em>NumberFormat_和_DecimalFormat_适用于我们创建显示目的的场合，因为它们输出_String</em> s。当然，我们总是可以使用_Double.parseDouble()<em>将我们的_String</em> s转换回_doubles</em>。或者，我们可以使用_Math_类或_BigDecimal_来保持我们的截断值为数字，以供进一步计算。</p><p>和往常一样，示例的完整代码可以在GitHub上找到。</p>`,27),o=[p];function c(l,u){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-29-Truncate a Double to Two Decimal Places in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-Truncate%20a%20Double%20to%20Two%20Decimal%20Places%20in%20Java.html","title":"Java中将double截断为两位小数的方法 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Java","Double","Rounding"],"head":[["meta",{"name":"keywords","content":"Java, Double, Rounding, Truncate"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-Truncate%20a%20Double%20to%20Two%20Decimal%20Places%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将double截断为两位小数的方法 | Baeldung"}],["meta",{"property":"og:description","content":"Java中将double截断为两位小数的方法 | Baeldung 1. 概述 在本教程中，我们将探讨Java中将_double_截断为两位小数的多种选项。我们将看到将结果保留为_String_的方法，以及返回_Numbers_的选项。 2. 使用_Math.floor()_和_Math.ceil()_进行四舍五入 我们将首先检查使用_Math_类来去..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T07:28:42.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Double"}],["meta",{"property":"article:tag","content":"Rounding"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T07:28:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将double截断为两位小数的方法 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T07:28:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将double截断为两位小数的方法 | Baeldung 1. 概述 在本教程中，我们将探讨Java中将_double_截断为两位小数的多种选项。我们将看到将结果保留为_String_的方法，以及返回_Numbers_的选项。 2. 使用_Math.floor()_和_Math.ceil()_进行四舍五入 我们将首先检查使用_Math_类来去..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用_Math.floor()_和_Math.ceil()_进行四舍五入","slug":"_2-使用-math-floor-和-math-ceil-进行四舍五入","link":"#_2-使用-math-floor-和-math-ceil-进行四舍五入","children":[]},{"level":2,"title":"3. 使用_String.format()_","slug":"_3-使用-string-format","link":"#_3-使用-string-format","children":[]},{"level":2,"title":"4. 使用_NumberFormat_","slug":"_4-使用-numberformat","link":"#_4-使用-numberformat","children":[]},{"level":2,"title":"5. 使用_DecimalFormat_","slug":"_5-使用-decimalformat","link":"#_5-使用-decimalformat","children":[]},{"level":2,"title":"6. 使用_BigDecimal_获得最佳精度","slug":"_6-使用-bigdecimal-获得最佳精度","link":"#_6-使用-bigdecimal-获得最佳精度","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719646122000,"updatedTime":1719646122000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.25,"words":1274},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-Truncate a Double to Two Decimal Places in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将探讨Java中将_double_截断为两位小数的多种选项。我们将看到将结果保留为_String_的方法，以及返回_Numbers_的选项。</p>\\n<h2>2. 使用_Math.floor()_和_Math.ceil()_进行四舍五入</h2>\\n<p>我们将首先检查使用_Math_类来去除多余的小数位的方法。要将正数截断为两位小数，我们首先将_double_乘以100，将我们想要保留的所有数字移动到小数点前面。接下来，我们使用_Math.floor()_向下取整，去除小数点后的数字。最后，我们除以100来撤销之前的乘法：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenADouble_whenUsingMath_truncateToTwoDecimalPlaces</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">double</span> positive <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1.55555555</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">double</span> truncated <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Math</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">floor</span><span class=\\"token punctuation\\">(</span>positive <span class=\\"token operator\\">*</span> <span class=\\"token number\\">100</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">/</span> <span class=\\"token number\\">100</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"1.55\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">valueOf</span><span class=\\"token punctuation\\">(</span>truncated<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">double</span> negative <span class=\\"token operator\\">=</span> <span class=\\"token operator\\">-</span><span class=\\"token number\\">1.55555555</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">double</span> negativeTruncated <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Math</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">ceil</span><span class=\\"token punctuation\\">(</span>negative <span class=\\"token operator\\">*</span> <span class=\\"token number\\">100</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">/</span> <span class=\\"token number\\">100</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"-1.55\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">valueOf</span><span class=\\"token punctuation\\">(</span>negativeTruncated<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
