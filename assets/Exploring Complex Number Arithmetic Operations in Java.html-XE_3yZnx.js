import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CjsmXT2F.js";const e={},p=t(`<h1 id="探索java中的复数算术运算" tabindex="-1"><a class="header-anchor" href="#探索java中的复数算术运算"><span>探索Java中的复数算术运算</span></a></h1><p>在这个教程中，我们将检查复数的算术运算。具体来说，我们将探讨如何在Java中对两个复数进行加法、减法、乘法和除法。</p><h2 id="_2-什么是复数" tabindex="-1"><a class="header-anchor" href="#_2-什么是复数"><span>2. 什么是复数？</span></a></h2><p>复数使用实部和虚部的组合来表示。它们通常表示为a+bi，其中a和b是实数，i代表虚数单位，相当于-1的平方根。在正式的数学符号中，a是复数的实部，而bi项是虚部。尽管复数最初可能让新手感到困惑，但它们在各种实际应用中发挥着关键作用，例如物理学和数学，包括量子力学、信号处理和经济学等领域。</p><p>像实数一样，我们可以执行加法、减法、乘法和除法等算术运算。对复数进行算术运算由于实部和虚部的组合而引入了复杂性。然而，每种运算都有特定的公式，这些公式简化了运算并确保了准确的结果。</p><h2 id="_3-设置" tabindex="-1"><a class="header-anchor" href="#_3-设置"><span>3. 设置</span></a></h2><p>我们可以在实现复数的算术运算之前设置所需的基础代码。让我们从定义一个表示复数的类开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">record</span> <span class="token class-name">ComplexNumber</span><span class="token punctuation">(</span><span class="token keyword">double</span> real<span class="token punctuation">,</span> <span class="token keyword">double</span> imaginary<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ComplexNumber</span> <span class="token function">fromString</span><span class="token punctuation">(</span><span class="token class-name">String</span> complexNumberStr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...（代码省略）...</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> real <span class="token operator">+</span> <span class="token string">&quot;+&quot;</span> <span class="token operator">+</span> imaginary <span class="token operator">+</span> <span class="token string">&quot;i&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述类定义了复数的实部和虚部。我们使用_record_关键字来定义这个类以表示复数。此外，我们定义了_toString()<em>方法以返回复数的典型格式_a+bi</em>。</p><p>另外，我们重写了_fromString()_方法，将复数的字符串表示解析为_ComplexNumber_记录。我们使用正则表达式组从字符串中提取实部和虚部。</p><p>在后续部分中，我们可以通过添加执行各种算术运算的方法来增强这个记录。</p><h2 id="_4-两个复数的加法" tabindex="-1"><a class="header-anchor" href="#_4-两个复数的加法"><span>4. 两个复数的加法</span></a></h2><p>现在基本设置已经准备好，让我们实现两个复数相加的方法。<strong>复数加法涉及分别添加两个数的实部和虚部以获得结果数</strong>。为了更清晰的理解，让我们建立加法公式。让我们看看两个复数相加的公式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">ComplexNumber</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">ComplexNumber</span> that<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ComplexNumber</span><span class="token punctuation">(</span>real <span class="token operator">+</span> that<span class="token punctuation">.</span>real<span class="token punctuation">,</span> imaginary <span class="token operator">+</span> that<span class="token punctuation">.</span>imaginary<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以从记录中直接访问实部和虚部，并在方法中与给定的复数结合。</p><h2 id="_5-两个复数的减法" tabindex="-1"><a class="header-anchor" href="#_5-两个复数的减法"><span>5. 两个复数的减法</span></a></h2><p><strong>两个复数的减法涉及分别减去它们的实部和虚部</strong>。当减去复数_a+bi_和_c+di_时，我们分别减去实部（<em>a_和_c</em>）和虚部（<em>b_和_d</em>），得到的新复数的实部是原始实部的差，虚部是原始虚部的差。这是减法操作的公式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">ComplexNumber</span> <span class="token function">subtract</span><span class="token punctuation">(</span><span class="token class-name">ComplexNumber</span> that<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ComplexNumber</span><span class="token punctuation">(</span>real <span class="token operator">-</span> that<span class="token punctuation">.</span>real<span class="token punctuation">,</span> imaginary <span class="token operator">-</span> that<span class="token punctuation">.</span>imaginary<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这实现了减法，使用公式_(a-c)+(b-d)i_。</p><h2 id="_6-两个复数的乘法" tabindex="-1"><a class="header-anchor" href="#_6-两个复数的乘法"><span>6. 两个复数的乘法</span></a></h2><p>与加法和减法不同，两个复数的乘法并不那么简单。让我们看看乘法的公式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">ComplexNumber</span> <span class="token function">multiply</span><span class="token punctuation">(</span><span class="token class-name">ComplexNumber</span> that<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span> newReal <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>real <span class="token operator">*</span> that<span class="token punctuation">.</span>real <span class="token operator">-</span> <span class="token keyword">this</span><span class="token punctuation">.</span>imaginary <span class="token operator">*</span> that<span class="token punctuation">.</span>imaginary<span class="token punctuation">;</span>
    <span class="token keyword">double</span> newImaginary <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>real <span class="token operator">*</span> that<span class="token punctuation">.</span>imaginary <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>imaginary <span class="token operator">*</span> that<span class="token punctuation">.</span>real<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ComplexNumber</span><span class="token punctuation">(</span>newReal<span class="token punctuation">,</span> newImaginary<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述方法实现了复数乘法的算法。</p><h2 id="_7-两个复数的除法" tabindex="-1"><a class="header-anchor" href="#_7-两个复数的除法"><span>7. 两个复数的除法</span></a></h2><p><strong>两个复数的除法比乘法更复杂</strong>。它涉及一个更复杂的公式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">ComplexNumber</span> <span class="token function">divide</span><span class="token punctuation">(</span><span class="token class-name">ComplexNumber</span> that<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>that<span class="token punctuation">.</span>real <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> that<span class="token punctuation">.</span>imaginary <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ArithmeticException</span><span class="token punctuation">(</span><span class="token string">&quot;Division by 0 is not allowed!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">double</span> c2d2 <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span>that<span class="token punctuation">.</span>real<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span>that<span class="token punctuation">.</span>imaginary<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> newReal <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>real <span class="token operator">*</span> that<span class="token punctuation">.</span>real <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>imaginary <span class="token operator">*</span> that<span class="token punctuation">.</span>imaginary<span class="token punctuation">)</span> <span class="token operator">/</span> c2d2<span class="token punctuation">;</span>
    <span class="token keyword">double</span> newImaginary <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>imaginary <span class="token operator">*</span> that<span class="token punctuation">.</span>real <span class="token operator">-</span> <span class="token keyword">this</span><span class="token punctuation">.</span>real <span class="token operator">*</span> that<span class="token punctuation">.</span>imaginary<span class="token punctuation">)</span> <span class="token operator">/</span> c2d2<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ComplexNumber</span><span class="token punctuation">(</span>newReal<span class="token punctuation">,</span> newImaginary<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述方法有效地除以两个复数。它包含错误处理以防止除以零，并在这种情况下提供清晰的错误消息。</p><h2 id="_8-测试实现" tabindex="-1"><a class="header-anchor" href="#_8-测试实现"><span>8. 测试实现</span></a></h2><p>现在我们已经实现了两个复数的算术运算，让我们为每种方法编写测试用例。<strong>复数可以有各种形式，包括只有实部的、只有虚部的或两者都有的</strong>。为了确保实现的健壮性，我们必须在所有这些场景中彻底测试我们的实现。为了全面的覆盖，我们可以利用JUnit的参数化测试来测试不同的输入。</p><p>为了在本文中保持简洁，我们将重点关注一个测试用例，演示复数的除法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Dividing {0} and {1}&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@CsvSource</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token string">&quot;3+2i, 1+7i, 0.34-0.38i&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;2, 4, 0.5&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;2, 4i, 0-0.5i&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;1+1i, 1+1i, 1&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;3 + 2i, 1 + 7i, 0.34-0.38i&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;0+5i, 3+0i, 0+1.6666666666666667i&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;0+0i, -2+0i, 0+0i&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;-3+2i, 1-7i, -0.34-0.38i&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;2+4i, 1, 2+4i&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenTwoComplexNumbers_divideThemAndGetResult</span><span class="token punctuation">(</span><span class="token class-name">String</span> complexStr1<span class="token punctuation">,</span> <span class="token class-name">String</span> complexStr2<span class="token punctuation">,</span> <span class="token class-name">String</span> expectedStr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...（代码省略）...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的实现中，我们使用_@CsvSource_创建了一个全面的测试套件，涵盖了许多复数除法。实现了一个自定义实用方法_isSame()_，以有效地比较测试结果。类似地，我们可以使用相同的测试参数为其他算术运算实现测试。</p><p>我们还可以编写一个单独的测试来验证除以零的场景：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAComplexNumberAsZero_handleDivideByZeroScenario</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...（代码省略）...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个实部和虚部都为零的复数，然后尝试除以它。使用_assertThrows()_，测试确保抛出了带有预期错误消息的异常。</p><h2 id="_9-结论" tabindex="-1"><a class="header-anchor" href="#_9-结论"><span>9. 结论</span></a></h2><p>在本文中，我们实现了Java中两个复数的算术运算。我们探讨了复数的加法、减法、乘法和除法，通过广泛的测试覆盖实现了健壮的功能。这包括使用参数化测试确保代码在各种输入值上正确运行。</p><p>如往常一样，本文中使用的示例代码可在GitHub上找到。</p><p>文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,39),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","Exploring Complex Number Arithmetic Operations in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/Exploring%20Complex%20Number%20Arithmetic%20Operations%20in%20Java.html","title":"探索Java中的复数算术运算","lang":"zh-CN","frontmatter":{"date":"2024-06-19T00:00:00.000Z","category":["Java","数学"],"tag":["复数","运算"],"head":[["meta",{"name":"keywords","content":"Java, 复数运算, 数学, 编程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Exploring%20Complex%20Number%20Arithmetic%20Operations%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"探索Java中的复数算术运算"}],["meta",{"property":"og:description","content":"探索Java中的复数算术运算 在这个教程中，我们将检查复数的算术运算。具体来说，我们将探讨如何在Java中对两个复数进行加法、减法、乘法和除法。 2. 什么是复数？ 复数使用实部和虚部的组合来表示。它们通常表示为a+bi，其中a和b是实数，i代表虚数单位，相当于-1的平方根。在正式的数学符号中，a是复数的实部，而bi项是虚部。尽管复数最初可能让新手感到..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"复数"}],["meta",{"property":"article:tag","content":"运算"}],["meta",{"property":"article:published_time","content":"2024-06-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"探索Java中的复数算术运算\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"探索Java中的复数算术运算 在这个教程中，我们将检查复数的算术运算。具体来说，我们将探讨如何在Java中对两个复数进行加法、减法、乘法和除法。 2. 什么是复数？ 复数使用实部和虚部的组合来表示。它们通常表示为a+bi，其中a和b是实数，i代表虚数单位，相当于-1的平方根。在正式的数学符号中，a是复数的实部，而bi项是虚部。尽管复数最初可能让新手感到..."},"headers":[{"level":2,"title":"2. 什么是复数？","slug":"_2-什么是复数","link":"#_2-什么是复数","children":[]},{"level":2,"title":"3. 设置","slug":"_3-设置","link":"#_3-设置","children":[]},{"level":2,"title":"4. 两个复数的加法","slug":"_4-两个复数的加法","link":"#_4-两个复数的加法","children":[]},{"level":2,"title":"5. 两个复数的减法","slug":"_5-两个复数的减法","link":"#_5-两个复数的减法","children":[]},{"level":2,"title":"6. 两个复数的乘法","slug":"_6-两个复数的乘法","link":"#_6-两个复数的乘法","children":[]},{"level":2,"title":"7. 两个复数的除法","slug":"_7-两个复数的除法","link":"#_7-两个复数的除法","children":[]},{"level":2,"title":"8. 测试实现","slug":"_8-测试实现","link":"#_8-测试实现","children":[]},{"level":2,"title":"9. 结论","slug":"_9-结论","link":"#_9-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.97,"words":1491},"filePathRelative":"posts/baeldung/Archive/Exploring Complex Number Arithmetic Operations in Java.md","localizedDate":"2024年6月19日","excerpt":"\\n<p>在这个教程中，我们将检查复数的算术运算。具体来说，我们将探讨如何在Java中对两个复数进行加法、减法、乘法和除法。</p>\\n<h2>2. 什么是复数？</h2>\\n<p>复数使用实部和虚部的组合来表示。它们通常表示为a+bi，其中a和b是实数，i代表虚数单位，相当于-1的平方根。在正式的数学符号中，a是复数的实部，而bi项是虚部。尽管复数最初可能让新手感到困惑，但它们在各种实际应用中发挥着关键作用，例如物理学和数学，包括量子力学、信号处理和经济学等领域。</p>\\n<p>像实数一样，我们可以执行加法、减法、乘法和除法等算术运算。对复数进行算术运算由于实部和虚部的组合而引入了复杂性。然而，每种运算都有特定的公式，这些公式简化了运算并确保了准确的结果。</p>","autoDesc":true}');export{d as comp,k as data};
