import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-DfO5Xg_k.js";const t={},p=e(`<h1 id="java中返回两个整数的绝对差值" tabindex="-1"><a class="header-anchor" href="#java中返回两个整数的绝对差值"><span>Java中返回两个整数的绝对差值</span></a></h1><p>在本教程中，我们将探讨如何获取两个给定整数之间的绝对差值。</p><h2 id="_2-使用-math-abs-方法" tabindex="-1"><a class="header-anchor" href="#_2-使用-math-abs-方法"><span>2. 使用 <em>Math.abs()</em> 方法</span></a></h2><p>问题相当直接。让我们通过一些例子快速理解：</p><ul><li><em>num1=3, num2=4</em>: <em>absDiff=1</em></li><li><em>num1=3, num2=-4</em>: <em>absDiff=7</em></li><li><em>num1=-3, num2=-4</em>: <em>absDiff=1</em></li></ul><p>从上述例子中可以看出，<strong>给定两个整数，<em>num1</em> 和 <em>num2，</em> 结果是 <em>(num1 – num2)</em> 的绝对值。</strong> 进一步地，Java标准库提供了 <em>Math.abs()</em> 方法来返回绝对值。因此，我们可以很容易地将计算转换为Java代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">absDiff</span><span class="token punctuation">(</span><span class="token keyword">int</span> num1<span class="token punctuation">,</span> <span class="token keyword">int</span> num2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> result <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>num1 <span class="token operator">-</span> num2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;绝对差值: &quot;</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，<em>absDiff()</em> 方法返回结果。同时，它也打印了结果。</p><p>为了简单起见，让我们使用单元测试断言来验证方法是否按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> diff1 <span class="token operator">=</span> <span class="token function">absDiff</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">,</span> diff1<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> diff2 <span class="token operator">=</span> <span class="token function">absDiff</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> diff2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们运行测试时，测试通过。所以，我们已经解决了问题。然而，实现中隐藏了一个潜在问题。接下来，让我们找出问题所在。</p><h2 id="_3-溢出-下溢问题" tabindex="-1"><a class="header-anchor" href="#_3-溢出-下溢问题"><span>3. 溢出/下溢问题</span></a></h2><p>我们知道Java的_int_是一个有符号的32位整数。换句话说，<strong>Java整数的范围是 <em>-2147483648</em> 到 <em>2147483647</em></strong>。</p><p>现在，让我们重新审视我们的实现。我们有计算：<em>num1 – num2</em>。因此，结果可能超过_Integer.MAX_VALUE_，例如，当我们将_Integer.MAX_VALUE_ 和 <em>-200</em> 传递给 <em>absDiff()</em> 方法时。接下来，让我们用这两个整数调用方法，看看会发生什么。</p><p>首先，让我们手动计算一下，看看预期结果是什么：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Result</span> <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span> <span class="token operator">-</span> <span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">200</span><span class="token punctuation">)</span>
       <span class="token operator">=</span> <span class="token number">2147483647</span> <span class="token operator">+</span> <span class="token number">200</span>
      <span class="token operator">=</span> <span class="token number">2147483847</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，如果我们调用我们的_absDiff()_ 方法，没有异常发生，我们看到的输出是：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>绝对差值<span class="token operator">:</span> <span class="token number">2147483449</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>显然，结果不正确。这是因为<strong>发生了整数溢出</strong>。当然，计算结果可能小于_Integer.MIN_VALUE_，例如，<em>absDiff(Integer.MIN_VALUE, 200)</em>。在这种情况下，我们称之为下溢。</p><p>接下来，让我们看看如何解决溢出/下溢问题。</p><h2 id="_4-使用不同的数据类型" tabindex="-1"><a class="header-anchor" href="#_4-使用不同的数据类型"><span>4. 使用不同的数据类型</span></a></h2><p>在Java中，有些数字类型的范围比_int_大，比如_long_或_BigInteger_。为了避免溢出/下溢陷阱，我们可以<strong>在执行计算之前将_int_参数转换为这些类型之一</strong>。让我们以_long_为例，并在一个新的方法中实现逻辑：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">long</span> <span class="token function">absDiffAsLong</span><span class="token punctuation">(</span><span class="token keyword">int</span> num1<span class="token punctuation">,</span> <span class="token keyword">int</span> num2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">long</span><span class="token punctuation">)</span> num1 <span class="token operator">-</span> num2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们测试一下当我们传递_Integer.MAX_VALUE_ 和 <em>-200</em> 时，它是否给出了预期的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">long</span> diff <span class="token operator">=</span> <span class="token function">absDiffAsLong</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span> <span class="token operator">+</span> <span class="token number">200L</span><span class="token punctuation">,</span> diff<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，它会通过。因此，这种方法解决了溢出/下溢问题。但值得一提的是，返回类型是_long_而不是_int_。</p><p>如果调用者期望结果是_long_，这是可以的。否则，如果需要_int_，我们必须将_long_值转换为_int_。这是不方便的。此外，如果我们不正确地进行_long_到_int_的转换，溢出/下溢也可能发生。</p><p>接下来，让我们看看我们是否可以保持结果为_int_并避免溢出/下溢问题。</p><h2 id="_5-在溢出-下溢发生时抛出异常" tabindex="-1"><a class="header-anchor" href="#_5-在溢出-下溢发生时抛出异常"><span>5. 在溢出/下溢发生时抛出异常</span></a></h2><p>假设我们的程序需要绝对差值结果为_int_。那么方法的理想行为应该是<strong>返回一个_int_并在溢出/下溢发生时抛出异常</strong>。</p><p>然而，正如我们之前看到的，<strong>Java在常规 <em>(num1 – num2)</em> 计算期间不抛出异常</strong>。这使得当我们发现程序没有产生预期结果时，很难找到真正的原因。</p><p>自从Java 8以来，Java的Math引入了新的_*exact()<em>方法。这些方法在溢出/下溢发生时抛出_ArithmeticException</em>。所以接下来，让我们用_subtractExact()<em>替换我们方法中的</em>(num1 – num2)_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">absDiff2</span><span class="token punctuation">(</span><span class="token keyword">int</span> num1<span class="token punctuation">,</span> <span class="token keyword">int</span> num2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">subtractExact</span><span class="token punctuation">(</span>num1<span class="token punctuation">,</span> num2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，以下测试显示_absDiff2()_按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> diff1 <span class="token operator">=</span> <span class="token function">absDiff2</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">,</span> diff1<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> diff2 <span class="token operator">=</span> <span class="token function">absDiff2</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> diff2<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//溢出 -&gt; 异常</span>
<span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">ArithmeticException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">absDiff2</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了计算两个整数之间的绝对差值。此外，我们讨论了溢出/下溢问题。</p><p>如往常一样，本文中展示的所有代码片段都可以在GitHub上找到。</p>`,38),o=[p];function c(l,i){return s(),a("div",null,o)}const m=n(t,[["render",c],["__file","2024-07-09-Return Absolute Difference of Two Integers in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Return%20Absolute%20Difference%20of%20Two%20Integers%20in%20Java.html","title":"Java中返回两个整数的绝对差值","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Math"],"tag":["Absolute Difference","Integer","Overflow","Underflow"],"head":[["meta",{"name":"keywords","content":"Java, Math, Absolute Difference, Integer, Overflow, Underflow"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Return%20Absolute%20Difference%20of%20Two%20Integers%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中返回两个整数的绝对差值"}],["meta",{"property":"og:description","content":"Java中返回两个整数的绝对差值 在本教程中，我们将探讨如何获取两个给定整数之间的绝对差值。 2. 使用 Math.abs() 方法 问题相当直接。让我们通过一些例子快速理解： num1=3, num2=4: absDiff=1 num1=3, num2=-4: absDiff=7 num1=-3, num2=-4: absDiff=1 从上述例子中可..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T22:41:22.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Absolute Difference"}],["meta",{"property":"article:tag","content":"Integer"}],["meta",{"property":"article:tag","content":"Overflow"}],["meta",{"property":"article:tag","content":"Underflow"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T22:41:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中返回两个整数的绝对差值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T22:41:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中返回两个整数的绝对差值 在本教程中，我们将探讨如何获取两个给定整数之间的绝对差值。 2. 使用 Math.abs() 方法 问题相当直接。让我们通过一些例子快速理解： num1=3, num2=4: absDiff=1 num1=3, num2=-4: absDiff=7 num1=-3, num2=-4: absDiff=1 从上述例子中可..."},"headers":[{"level":2,"title":"2. 使用 Math.abs() 方法","slug":"_2-使用-math-abs-方法","link":"#_2-使用-math-abs-方法","children":[]},{"level":2,"title":"3. 溢出/下溢问题","slug":"_3-溢出-下溢问题","link":"#_3-溢出-下溢问题","children":[]},{"level":2,"title":"4. 使用不同的数据类型","slug":"_4-使用不同的数据类型","link":"#_4-使用不同的数据类型","children":[]},{"level":2,"title":"5. 在溢出/下溢发生时抛出异常","slug":"_5-在溢出-下溢发生时抛出异常","link":"#_5-在溢出-下溢发生时抛出异常","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720564882000,"updatedTime":1720564882000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.78,"words":1135},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Return Absolute Difference of Two Integers in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将探讨如何获取两个给定整数之间的绝对差值。</p>\\n<h2>2. 使用 <em>Math.abs()</em> 方法</h2>\\n<p>问题相当直接。让我们通过一些例子快速理解：</p>\\n<ul>\\n<li><em>num1=3, num2=4</em>: <em>absDiff=1</em></li>\\n<li><em>num1=3, num2=-4</em>: <em>absDiff=7</em></li>\\n<li><em>num1=-3, num2=-4</em>: <em>absDiff=1</em></li>\\n</ul>\\n<p>从上述例子中可以看出，<strong>给定两个整数，<em>num1</em> 和 <em>num2，</em> 结果是 <em>(num1 – num2)</em> 的绝对值。</strong> 进一步地，Java标准库提供了 <em>Math.abs()</em> 方法来返回绝对值。因此，我们可以很容易地将计算转换为Java代码：</p>","autoDesc":true}');export{m as comp,d as data};
