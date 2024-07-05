import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-BaAI5AMv.js";const p={},e=t(`<h1 id="java中的钳制函数" tabindex="-1"><a class="header-anchor" href="#java中的钳制函数"><span>Java中的钳制函数</span></a></h1><ol><li>概述</li></ol><p><strong>钳制函数将值限制在一定范围内</strong>。它确保给定的值不会超出特定的下限和上限。</p><p>在本教程中，我们将通过示例探讨如何在Java中实现钳制函数。</p><ol start="2"><li>Java 21之前的钳制函数</li></ol><p><strong>在Java 21之前，Java没有内置的钳制值的函数</strong>。我们需要自己编写钳制函数。</p><p>钳制函数指定了一个值的范围。低于最小值的值将被设置为最小值。高于最大值的值将被设置为最大值。同时，范围内的值将返回它们自己。</p><h3 id="_2-1-使用方法重载" tabindex="-1"><a class="header-anchor" href="#_2-1-使用方法重载"><span>2.1 使用方法重载</span></a></h3><p><strong>我们可以使用方法重载来为不同的数据类型实现钳制函数</strong>。</p><p>让我们创建一个_Clamp_类，并添加一个返回整数的_clamp()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Clamp</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> <span class="token function">clamp</span><span class="token punctuation">(</span><span class="token keyword">int</span> value<span class="token punctuation">,</span> <span class="token keyword">int</span> min<span class="token punctuation">,</span> <span class="token keyword">int</span> max<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>min<span class="token punctuation">,</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>max<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个接受值、下限和上限作为参数的_clamp()_方法。此外，我们使用_Math_类来设置最小值和最大值。最后，如果值在设定的范围内，我们返回该值；如果值不在范围内，我们返回最小值或最大值。</p><p>让我们为_clamp()_方法编写一个单元测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenValueOutsideRange_whenClamp_thenReturnLowerValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Clamp</span> clampValue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Clamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">,</span> clampValue<span class="token punctuation">.</span><span class="token function">clamp</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">35</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个_Clamp_的实例，并在其上调用_clamp()<em>。值设置为_10</em>，最小值设置为_15_，最大值为_35_。由于值不在范围内，方法返回最小值。</p><p>这是一个测试范围内值的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> clampValue<span class="token punctuation">.</span><span class="token function">clamp</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">35</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>由于输入值在范围内，_clamp()_方法返回此值。</p><p>最后，让我们看看一个值高于最大值的测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">35</span><span class="token punctuation">,</span> clampValue<span class="token punctuation">.</span><span class="token function">clamp</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">35</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，输入值超出了最大边界。因此，_clamp()_方法返回最大值。</p><p>此外，让我们通过重载_clamp()_方法来实现_double_数据类型的钳制函数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">double</span> <span class="token function">clamp</span><span class="token punctuation">(</span><span class="token keyword">double</span> value<span class="token punctuation">,</span> <span class="token keyword">double</span> min<span class="token punctuation">,</span> <span class="token keyword">double</span> max<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>min<span class="token punctuation">,</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>max<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用_double_数据类型重载了_clamp()<em>。此外，该方法返回一个_double</em>。</p><h3 id="_2-2-使用泛型" tabindex="-1"><a class="header-anchor" href="#_2-2-使用泛型"><span>2.2 使用泛型</span></a></h3><p>此外，<strong>我们可以使用泛型使_clamp()_方法更加灵活，并适用于不同的数据类型</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> \`<span class="token operator">&lt;</span><span class="token class-name">T</span> <span class="token keyword">extends</span> <span class="token class-name">Comparable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\`<span class="token operator">&gt;</span> <span class="token class-name">T</span> <span class="token function">clamp</span><span class="token punctuation">(</span><span class="token class-name">T</span> value<span class="token punctuation">,</span> <span class="token class-name">T</span> min<span class="token punctuation">,</span> <span class="token class-name">T</span> max<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>value<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>min<span class="token punctuation">)</span> \`<span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> min<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>value<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>max<span class="token punctuation">)</span> <span class="token operator">&gt;</span>\` <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> max<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述方法接受三个泛型类型_T_的参数。<em>T_还实现了_Comparable_接口。<strong>然而，这种方法可能代价较高</strong>。如果最小值和最大值是原始类型，**Java将自动将它们装箱为等价的对象，因为原始类型不能实现_Comparable</em>**。</p><p>让我们为泛型方法编写一个单元测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenFloatValueWithinRange_whenClamp_thenReturnValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Clamp</span> clampValue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Clamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">16.2f</span><span class="token punctuation">,</span> clampValue<span class="token punctuation">.</span><span class="token function">clamp</span><span class="token punctuation">(</span><span class="token number">16.2f</span><span class="token punctuation">,</span> <span class="token number">15f</span><span class="token punctuation">,</span> <span class="token number">35.3f</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法接受_float_类型，但在计算值时，它将_float_装箱为_Float_，然后从_Float_拆箱返回值到_float_。因此，我们有两个装箱操作和一个拆箱操作。</p><p><strong>建议使用方法重载以避免装箱/拆箱操作</strong>。</p><ol start="3"><li>Java 21之后的钳制函数</li></ol><p>Java 21，目前仍处于实验阶段，在_Math_类中引入了_clamp()_方法。这种方法使我们能够轻松地钳制一个值，而无需编写自己的方法。</p><p>以下是使用Java 21中_clamp()_的一个示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenValueWithinRange_whenClamp_thenReturnValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">clamp</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">,</span> <span class="token number">98</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们调用_clamp()_方法并设置最小值和最大值。代码返回该值，因为它在最小值和最大值之间。</p><p>值得注意的是，_clamp()_方法支持不同的数据类型。因此，不需要为不同的数据类型显式实现。</p><ol start="4"><li>结论</li></ol><p>在本文中，我们学习了在Java中实现钳制函数的三种不同方法。我们看到了在Java 21将_clamp()_方法引入标准库之前如何编写_clamp()_方法。</p><p>如往常一样，示例的源代码可以在GitHub上找到。</p>`,41),o=[e];function c(l,u){return s(),n("div",null,o)}const k=a(p,[["render",c],["__file","2024-07-01-Clamp Function in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-Clamp%20Function%20in%20Java.html","title":"Java中的钳制函数","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["clamp function","Java 21","Math class"],"head":[["meta",{"name":"keywords","content":"Java, clamp function, Math class, Java 21, Programming"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-Clamp%20Function%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的钳制函数"}],["meta",{"property":"og:description","content":"Java中的钳制函数 概述 钳制函数将值限制在一定范围内。它确保给定的值不会超出特定的下限和上限。 在本教程中，我们将通过示例探讨如何在Java中实现钳制函数。 Java 21之前的钳制函数 在Java 21之前，Java没有内置的钳制值的函数。我们需要自己编写钳制函数。 钳制函数指定了一个值的范围。低于最小值的值将被设置为最小值。高于最大值的值将被设..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T05:33:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"clamp function"}],["meta",{"property":"article:tag","content":"Java 21"}],["meta",{"property":"article:tag","content":"Math class"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T05:33:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的钳制函数\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T05:33:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的钳制函数 概述 钳制函数将值限制在一定范围内。它确保给定的值不会超出特定的下限和上限。 在本教程中，我们将通过示例探讨如何在Java中实现钳制函数。 Java 21之前的钳制函数 在Java 21之前，Java没有内置的钳制值的函数。我们需要自己编写钳制函数。 钳制函数指定了一个值的范围。低于最小值的值将被设置为最小值。高于最大值的值将被设..."},"headers":[{"level":3,"title":"2.1 使用方法重载","slug":"_2-1-使用方法重载","link":"#_2-1-使用方法重载","children":[]},{"level":3,"title":"2.2 使用泛型","slug":"_2-2-使用泛型","link":"#_2-2-使用泛型","children":[]}],"git":{"createdTime":1719812018000,"updatedTime":1719812018000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.53,"words":1060},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-Clamp Function in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<ol>\\n<li>概述</li>\\n</ol>\\n<p><strong>钳制函数将值限制在一定范围内</strong>。它确保给定的值不会超出特定的下限和上限。</p>\\n<p>在本教程中，我们将通过示例探讨如何在Java中实现钳制函数。</p>\\n<ol start=\\"2\\">\\n<li>Java 21之前的钳制函数</li>\\n</ol>\\n<p><strong>在Java 21之前，Java没有内置的钳制值的函数</strong>。我们需要自己编写钳制函数。</p>\\n<p>钳制函数指定了一个值的范围。低于最小值的值将被设置为最小值。高于最大值的值将被设置为最大值。同时，范围内的值将返回它们自己。</p>","autoDesc":true}');export{k as comp,d as data};
