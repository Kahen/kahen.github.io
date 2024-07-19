import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-D5kFWV-m.js";const e={},p=t(`<hr><h1 id="在-kotlin-中一行打印所有字符串数组元素" tabindex="-1"><a class="header-anchor" href="#在-kotlin-中一行打印所有字符串数组元素"><span>在 Kotlin 中一行打印所有字符串数组元素</span></a></h1><p>在 Kotlin 中，处理数组是一项常见任务，将所有元素打印在一行上是一个简单但必不可少的操作。</p><p>在本教程中，我们将探索实现这一目标的有效方法，强调 Kotlin 代码的可读性和简洁性。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>我们知道我们可以直接使用 <code>println()</code> 函数来打印一个列表，输出列表元素在一行中，例如：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;A&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;B&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;C&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;D&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;E&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;F&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// 输出: [A, B, C, D, E, F]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，如果我们将 <code>println()</code> 函数应用于一个数组，Kotlin 不会打印数组的元素。相反，<strong>输出中会出现数组类型和对象的 <em>hashcode</em></strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> myArray <span class="token operator">=</span> <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;A&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;B&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;C&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;D&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;E&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;F&quot;</span></span><span class="token punctuation">)</span>
<span class="token function">println</span><span class="token punctuation">(</span>myArray<span class="token punctuation">)</span>
<span class="token comment">// 输出: [Ljava.lang.String;@fdefd3f</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过迭代数组元素并在每个元素上调用 <code>println()</code> 允许我们将所有元素打印在输出中。然而，缺点是<strong>输出会将每个元素显示在单独的一行上</strong>。例如，如果我们在 <code>forEach</code> 中调用 <code>println()</code>，我们会得到以下输出：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>myArray<span class="token punctuation">.</span><span class="token function">forEach</span> <span class="token punctuation">{</span> <span class="token function">println</span><span class="token punctuation">(</span>it<span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token comment">/* 输出:
A
B
C
D
E
F
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在本教程中，我们将探索各种方法<strong>将所有数组元素打印在一行上，以逗号分隔的格式</strong>。</p><p>有时，元素值可能包含逗号。因此，我们将使用以下数组作为另一个输入示例，以展示如何在输出中正确分隔元素：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> arrayWithComma <span class="token operator">=</span> <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;A&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;B, C&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;D, E&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;F&quot;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>像往常一样，我们将使用单元测试来验证每种方法是否产生预期的输出。</p><p>接下来，让我们做一些准备工作来验证 <code>println()</code> 的输出。</p><h2 id="_3-使用单元测试验证输出" tabindex="-1"><a class="header-anchor" href="#_3-使用单元测试验证输出"><span>3. 使用单元测试验证输出</span></a></h2><p>验证 <code>println()</code> 的输出不像检查变量值那样容易。但这对我们来说也不是挑战。让我们首先看看 Kotlin 的 <code>println()</code> 函数的实现：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token label symbol">@kotlin</span><span class="token punctuation">.</span>internal<span class="token punctuation">.</span>InlineOnly
<span class="token keyword">public</span> <span class="token keyword">actual</span> <span class="token keyword">inline</span> <span class="token keyword">fun</span> <span class="token function">println</span><span class="token punctuation">(</span>message<span class="token operator">:</span> Any<span class="token operator">?</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    System<span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如代码所示，<code>println()</code> 内部调用了 Java 的 <code>System.out.println()</code>。因此，我们可以借鉴单元测试 Java 的 <code>System.out.println()</code> 的方法。基本思想是<strong>用我们自己的 <em>ByteArrayOutputStream</em> 替换标准输出流，这样我们就可以捕获并验证输出</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> stdOut <span class="token operator">=</span> System<span class="token punctuation">.</span>out
<span class="token keyword">val</span> myOutput <span class="token operator">=</span> <span class="token function">ByteArrayOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token annotation builtin">@BeforeEach</span>
<span class="token keyword">fun</span> <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    System<span class="token punctuation">.</span><span class="token function">setOut</span><span class="token punctuation">(</span><span class="token function">PrintStream</span><span class="token punctuation">(</span>myOutput<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token annotation builtin">@AfterEach</span>
<span class="token keyword">fun</span> <span class="token function">restore</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    System<span class="token punctuation">.</span><span class="token function">setOut</span><span class="token punctuation">(</span>stdOut<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们创建一个简单的测试来看看这种方法是否有效：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> newLine <span class="token operator">=</span> System<span class="token punctuation">.</span><span class="token function">lineSeparator</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Hello, world&quot;</span></span><span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Hello, world</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">newLine</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span> myOutput<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

myOutput<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kotlin rocks&quot;</span></span><span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kotlin rocks</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">newLine</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span> myOutput<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的示例所示，<strong>我们可以 <em>reset()</em> 我们的输出流来检查由新的 <em>println()</em> 调用产生的输出</strong>。</p><p>接下来，让我们将数组的元素打印在一行上。</p><h2 id="_4-将字符串数组转换为列表" tabindex="-1"><a class="header-anchor" href="#_4-将字符串数组转换为列表"><span>4. 将字符串数组转换为列表</span></a></h2><p>我们已经看到 <code>println()</code> 可以打印一行字符串列表。因此，<strong>我们可以将我们的数组转换为列表，并将列表传递给 <em>println()</em></strong>。这可能是最直接的解决方案：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">println</span><span class="token punctuation">(</span>myArray<span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;[A, B, C, D, E, F]</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">newLine</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span> myOutput<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们看看我们的 <code>arrayWithComma</code> 变量。这个数组包含 “ <em>B, C</em>” 和 “ <em>D, E</em>” 两个元素。如果我们使用这种方法，我们无法在输出中区分元素：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>myOutput<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token function">println</span><span class="token punctuation">(</span>arrayWithComma<span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// 我们无法自定义输出格式</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;[A, B, C, D, E, F]</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">newLine</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span> myOutput<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，<strong>由于我们在输出元素时无法自定义格式，如果某些元素包含逗号，输出可能会令人困惑</strong>。</p><h2 id="_5-在-foreach-中使用-print" tabindex="-1"><a class="header-anchor" href="#_5-在-foreach-中使用-print"><span>5. 在 forEach 中使用 <em>print()</em></span></a></h2><p><code>println()</code> 函数总是在输出的末尾添加一个换行字符。然而，** <em>print()</em> 函数不会**。</p><p>因此，<strong>我们可以使用 <em>print()</em> 在 <em>forEach</em> 函数中输出每个元素</strong>。当然，我们需要检查元素是否是最后一个，以决定是否添加分隔符或结尾的换行字符：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>myArray<span class="token punctuation">.</span><span class="token function">forEachIndexed</span> <span class="token punctuation">{</span> idx<span class="token punctuation">,</span> e <span class="token operator">-&gt;</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token keyword">if</span> <span class="token punctuation">(</span>idx <span class="token operator">==</span> myArray<span class="token punctuation">.</span>lastIndex<span class="token punctuation">)</span> <span class="token string-literal singleline"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">e</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">newLine</span></span><span class="token string">&quot;</span></span> <span class="token keyword">else</span> <span class="token string-literal singleline"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">e</span></span><span class="token string">, &quot;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;A, B, C, D, E, F</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">newLine</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span> myOutput<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们以 <em>arrayWithComma</em> 作为输入，看看如何在输出中清晰地打印每个元素：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>myOutput<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

arrayWithComma<span class="token punctuation">.</span><span class="token function">forEachIndexed</span> <span class="token punctuation">{</span> idx<span class="token punctuation">,</span> e <span class="token operator">-&gt;</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token keyword">if</span> <span class="token punctuation">(</span>idx <span class="token operator">==</span> arrayWithComma<span class="token punctuation">.</span>lastIndex<span class="token punctuation">)</span> <span class="token string-literal multiline"><span class="token string">&quot;&quot;&quot;&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">e</span></span><span class="token string">&quot;&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">newLine</span></span><span class="token string">&quot;&quot;&quot;</span></span> <span class="token keyword">else</span> <span class="token string-literal multiline"><span class="token string">&quot;&quot;&quot;&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">e</span></span><span class="token string">&quot;, &quot;&quot;&quot;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal multiline"><span class="token string">&quot;&quot;&quot;&quot;A&quot;, &quot;B, C&quot;, &quot;D, E&quot;, &quot;F&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">newLine</span></span><span class="token string">&quot;&quot;&quot;</span></span><span class="token punctuation">,</span> myOutput<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的测试所示，<strong>我们在输出中将每个元素用引号括起来，以清晰地展示数组元素</strong>。</p><p>值得一提的是，<strong>我们使用了 Kotlin 的原始字符串来避免转义</strong>。</p><h2 id="_6-使用-jointostring-函数" tabindex="-1"><a class="header-anchor" href="#_6-使用-jointostring-函数"><span>6. 使用 <em>joinToString()</em> 函数</span></a></h2><p>另外，我们可以利用 <em>Array</em> 的 <em>joinToString()</em> 扩展函数来<strong>首先将所有元素连接为一个逗号分隔的字符串，然后将字符串传递给 <em>println()</em></strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">println</span><span class="token punctuation">(</span>myArray<span class="token punctuation">.</span><span class="token function">joinToString</span> <span class="token punctuation">{</span> it <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;A, B, C, D, E, F</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">newLine</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span> myOutput<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如 <strong>我们在 <em>joinToString()</em> 的 lambda 表达式中完全控制元素的输出格式</strong>，输出中引用每个元素是一个简单的任务：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>myOutput<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token function">println</span><span class="token punctuation">(</span>arrayWithComma<span class="token punctuation">.</span><span class="token function">joinToString</span> <span class="token punctuation">{</span> <span class="token string-literal multiline"><span class="token string">&quot;&quot;&quot;&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">it</span></span><span class="token string">&quot;&quot;&quot;</span></span>&quot; <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal multiline"><span class="token string">&quot;&quot;&quot;&quot;A&quot;, &quot;B, C&quot;, &quot;D, E&quot;, &quot;F&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">newLine</span></span><span class="token string">&quot;&quot;&quot;</span></span><span class="token punctuation">,</span> myOutput<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们探讨了在 Kotlin 中将所有字符串数组元素打印在一行上的不同方法。此外，我们还讨论了如何通过示例对 <em>println()</em> 的输出进行单元测试。</p><p>一如既往，示例的完整源代码可在 GitHub 上获取。</p>`,47),o=[p];function i(l,c){return a(),s("div",null,o)}const k=n(e,[["render",i],["__file","2024-07-18-Printing All Elements of a String Array in a Single Line in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Printing%20All%20Elements%20of%20a%20String%20Array%20in%20a%20Single%20Line%20in%20Kotlin.html","title":"在 Kotlin 中一行打印所有字符串数组元素","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin"],"tag":["Kotlin","Arrays","Printing"],"head":[["meta",{"name":"keywords","content":"Kotlin, Arrays, Printing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Printing%20All%20Elements%20of%20a%20String%20Array%20in%20a%20Single%20Line%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在 Kotlin 中一行打印所有字符串数组元素"}],["meta",{"property":"og:description","content":"在 Kotlin 中一行打印所有字符串数组元素 在 Kotlin 中，处理数组是一项常见任务，将所有元素打印在一行上是一个简单但必不可少的操作。 在本教程中，我们将探索实现这一目标的有效方法，强调 Kotlin 代码的可读性和简洁性。 2. 问题介绍 我们知道我们可以直接使用 println() 函数来打印一个列表，输出列表元素在一行中，例如： 然而，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T17:31:42.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"Arrays"}],["meta",{"property":"article:tag","content":"Printing"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T17:31:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在 Kotlin 中一行打印所有字符串数组元素\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T17:31:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在 Kotlin 中一行打印所有字符串数组元素 在 Kotlin 中，处理数组是一项常见任务，将所有元素打印在一行上是一个简单但必不可少的操作。 在本教程中，我们将探索实现这一目标的有效方法，强调 Kotlin 代码的可读性和简洁性。 2. 问题介绍 我们知道我们可以直接使用 println() 函数来打印一个列表，输出列表元素在一行中，例如： 然而，..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用单元测试验证输出","slug":"_3-使用单元测试验证输出","link":"#_3-使用单元测试验证输出","children":[]},{"level":2,"title":"4. 将字符串数组转换为列表","slug":"_4-将字符串数组转换为列表","link":"#_4-将字符串数组转换为列表","children":[]},{"level":2,"title":"5. 在 forEach 中使用 print()","slug":"_5-在-foreach-中使用-print","link":"#_5-在-foreach-中使用-print","children":[]},{"level":2,"title":"6. 使用 joinToString() 函数","slug":"_6-使用-jointostring-函数","link":"#_6-使用-jointostring-函数","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1721323902000,"updatedTime":1721323902000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.41,"words":1322},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Printing All Elements of a String Array in a Single Line in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"<hr>\\n<h1>在 Kotlin 中一行打印所有字符串数组元素</h1>\\n<p>在 Kotlin 中，处理数组是一项常见任务，将所有元素打印在一行上是一个简单但必不可少的操作。</p>\\n<p>在本教程中，我们将探索实现这一目标的有效方法，强调 Kotlin 代码的可读性和简洁性。</p>\\n<h2>2. 问题介绍</h2>\\n<p>我们知道我们可以直接使用 <code>println()</code> 函数来打印一个列表，输出列表元素在一行中，例如：</p>\\n<div class=\\"language-kotlin\\" data-ext=\\"kt\\" data-title=\\"kt\\"><pre class=\\"language-kotlin\\"><code><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span><span class=\\"token function\\">listOf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"A\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"B\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"C\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"D\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"E\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"F\\"</span></span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token comment\\">// 输出: [A, B, C, D, E, F]</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
