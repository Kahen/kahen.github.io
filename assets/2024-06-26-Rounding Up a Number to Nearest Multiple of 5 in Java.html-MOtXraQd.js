import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-C4eFoh0f.js";const t={},p=e(`<h1 id="java中将数字四舍五入到最近的5的倍数" tabindex="-1"><a class="header-anchor" href="#java中将数字四舍五入到最近的5的倍数"><span>Java中将数字四舍五入到最近的5的倍数</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在许多应用中，有时会需要将数值四舍五入到特定数字的最近倍数。</p><p><strong>在本教程中，我们将探讨如何在Java中将数字四舍五入到5的最近倍数。</strong></p><h2 id="_2-使用基本算术" tabindex="-1"><a class="header-anchor" href="#_2-使用基本算术"><span>2. 使用基本算术</span></a></h2><p>将数字四舍五入到5的最近倍数的一种方法是使用基本的算术运算。</p><p>假设我们有以下Java示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> originalNumber <span class="token operator">=</span> <span class="token number">18</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> expectedRoundedNumber <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> nearest <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这里，<em>originalNumber</em> 是我们想要四舍五入的起始值，<em>expectedRoundedNumber</em> 是四舍五入后预期的结果，而 <em>nearest</em> 表示我们希望将数字四舍五入到的倍数（在本例中为5）。</strong></p><p>让我们看看以下简单的方法来完成转换任务：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenNumber_whenUsingBasicMathOperations_thenRoundUpToNearestMultipleOf5</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> roundedNumber <span class="token operator">=</span> <span class="token punctuation">(</span>originalNumber <span class="token operator">%</span> nearest <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">?</span> originalNumber <span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>originalNumber <span class="token operator">/</span> nearest<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">*</span> nearest<span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedRoundedNumber<span class="token punctuation">,</span> roundedNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>此策略使用基本算术运算，检查原始数字是否能被期望的倍数整除；如果不能，它通过调整商数并乘以最近的倍数来进行四舍五入。</strong></p><h2 id="_3-使用-math-ceil" tabindex="-1"><a class="header-anchor" href="#_3-使用-math-ceil"><span>3. 使用 Math.ceil()</span></a></h2><p>另一种方法是使用Java中的Math.ceil()方法以及一些数学运算：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenNumber_whenUsingMathCeil_thenRoundUpToNearestMultipleOf5</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> roundedNumber <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">ceil</span><span class="token punctuation">(</span>originalNumber <span class="token operator">/</span> <span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>nearest<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">*</span> nearest<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedRoundedNumber<span class="token punctuation">,</span> roundedNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们通过获取大于或等于原始数字除以指定倍数结果的最小值来确保四舍五入过程。</p><h2 id="_4-使用-math-floor" tabindex="-1"><a class="header-anchor" href="#_4-使用-math-floor"><span>4. 使用 Math.floor()</span></a></h2><p>要将数字四舍五入到小于或等于参数的最大双精度浮点数，我们应该使用Math.floor()方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenNumber_whenUsingMathFloor_thenRoundUpToNearestMultipleOf5</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> roundedNumber <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">double</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>originalNumber <span class="token operator">+</span> nearest <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">/</span> nearest<span class="token punctuation">)</span> <span class="token operator">*</span> nearest<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedRoundedNumber<span class="token punctuation">,</span> roundedNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这意味着，这种方法加上最近的倍数的一半，然后执行向下取整，确保与最近的倍数对齐。</p><h2 id="_5-使用-math-round" tabindex="-1"><a class="header-anchor" href="#_5-使用-math-round"><span>5. 使用 Math.round()</span></a></h2><p>与上述方法相同，但这个方法如果参数是float则返回int值，如果参数是double则返回long值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenNumber_whenUsingMathRound_thenRoundUpToNearestMultipleOf5</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> roundedNumber <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">round</span><span class="token punctuation">(</span>originalNumber <span class="token operator">/</span> <span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>nearest<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">*</span> nearest<span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedRoundedNumber<span class="token punctuation">,</span> roundedNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Math.round()方法通过将原始数字除以期望的倍数得到的商四舍五入到最近的整数来实现四舍五入。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>总之，我们在本教程中探讨了多种在Java中将数字四舍五入到5的最近倍数的方法。根据我们的特定需求，我们可以选择最适合我们需要的方法。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p>`,27),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(t,[["render",c],["__file","2024-06-26-Rounding Up a Number to Nearest Multiple of 5 in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-Rounding%20Up%20a%20Number%20to%20Nearest%20Multiple%20of%205%20in%20Java.html","title":"Java中将数字四舍五入到最近的5的倍数","lang":"zh-CN","frontmatter":{"date":"2024-06-26T00:00:00.000Z","category":["Java","编程"],"tag":["编程技巧","数学运算"],"head":[["meta",{"name":"keywords","content":"Java, 数学运算, 取整技巧"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-Rounding%20Up%20a%20Number%20to%20Nearest%20Multiple%20of%205%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将数字四舍五入到最近的5的倍数"}],["meta",{"property":"og:description","content":"Java中将数字四舍五入到最近的5的倍数 1. 引言 在许多应用中，有时会需要将数值四舍五入到特定数字的最近倍数。 在本教程中，我们将探讨如何在Java中将数字四舍五入到5的最近倍数。 2. 使用基本算术 将数字四舍五入到5的最近倍数的一种方法是使用基本的算术运算。 假设我们有以下Java示例： 这里，originalNumber 是我们想要四舍五入的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T12:48:21.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"编程技巧"}],["meta",{"property":"article:tag","content":"数学运算"}],["meta",{"property":"article:published_time","content":"2024-06-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T12:48:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将数字四舍五入到最近的5的倍数\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T12:48:21.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将数字四舍五入到最近的5的倍数 1. 引言 在许多应用中，有时会需要将数值四舍五入到特定数字的最近倍数。 在本教程中，我们将探讨如何在Java中将数字四舍五入到5的最近倍数。 2. 使用基本算术 将数字四舍五入到5的最近倍数的一种方法是使用基本的算术运算。 假设我们有以下Java示例： 这里，originalNumber 是我们想要四舍五入的..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用基本算术","slug":"_2-使用基本算术","link":"#_2-使用基本算术","children":[]},{"level":2,"title":"3. 使用 Math.ceil()","slug":"_3-使用-math-ceil","link":"#_3-使用-math-ceil","children":[]},{"level":2,"title":"4. 使用 Math.floor()","slug":"_4-使用-math-floor","link":"#_4-使用-math-floor","children":[]},{"level":2,"title":"5. 使用 Math.round()","slug":"_5-使用-math-round","link":"#_5-使用-math-round","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719406101000,"updatedTime":1719406101000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.21,"words":662},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-Rounding Up a Number to Nearest Multiple of 5 in Java.md","localizedDate":"2024年6月26日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在许多应用中，有时会需要将数值四舍五入到特定数字的最近倍数。</p>\\n<p><strong>在本教程中，我们将探讨如何在Java中将数字四舍五入到5的最近倍数。</strong></p>\\n<h2>2. 使用基本算术</h2>\\n<p>将数字四舍五入到5的最近倍数的一种方法是使用基本的算术运算。</p>\\n<p>假设我们有以下Java示例：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">int</span> originalNumber <span class=\\"token operator\\">=</span> <span class=\\"token number\\">18</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">int</span> expectedRoundedNumber <span class=\\"token operator\\">=</span> <span class=\\"token number\\">20</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">int</span> nearest <span class=\\"token operator\\">=</span> <span class=\\"token number\\">5</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
