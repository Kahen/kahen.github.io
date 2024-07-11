import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as e,a as t}from"./app-uizvaz9h.js";const s={},l=t(`<h1 id="kotlin中while表达式中的变量赋值-baeldung关于kotlin" tabindex="-1"><a class="header-anchor" href="#kotlin中while表达式中的变量赋值-baeldung关于kotlin"><span>Kotlin中while表达式中的变量赋值 | Baeldung关于Kotlin</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在Kotlin中，就像在许多其他编程语言中一样，循环是允许代码块重复执行的基本控制结构。while循环特别适用于在某个条件保持为真的情况下执行代码。然而，Kotlin在while循环条件内的变量赋值方面与某些语言不同。与Java等语言不同，在Java中while循环条件内的赋值是常见做法，Kotlin限制了这种行为。</p><p>本教程探讨了这一设计选择背后的原理，讨论了它对Kotlin开发人员的影响，并展示了以Kotlin友好的方式实现类似功能的替代方法。</p><h2 id="_2-理解限制" tabindex="-1"><a class="header-anchor" href="#_2-理解限制"><span>2. 理解限制</span></a></h2><p>Kotlin对while循环表达式中赋值的限制是基于语言对清晰度和安全性的强调。Kotlin旨在减少常见编程错误的可能性，例如意外使用赋值(=)而不是等值检查(==)。这种错误可能导致难以追踪和修复的隐蔽错误。</p><p>让我们考虑以下Java代码片段，由于while条件中的赋值，它容易出错：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> value<span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> sentinelValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 处理value</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们打算比较value和sentinelValue，但不小心使用了单个=而不是==，代码将编译并运行，可能导致意外的行为。<strong>Kotlin通过禁止在预期返回值的表达式中进行赋值，包括while循环条件，引导开发人员采用更安全的编码实践。</strong></p><h2 id="_3-kotlin中的替代模式" tabindex="-1"><a class="header-anchor" href="#_3-kotlin中的替代模式"><span>3. Kotlin中的替代模式</span></a></h2><p>为了在Kotlin中实现类似于while循环条件中的赋值功能，我们有几种替代方案。这些替代方案符合Kotlin的语言设计原则，并增强了代码的可读性和可维护性。</p><h3 id="_3-1-在循环外进行简单变量赋值" tabindex="-1"><a class="header-anchor" href="#_3-1-在循环外进行简单变量赋值"><span>3.1. 在循环外进行简单变量赋值</span></a></h3><p>首先，我们可以在循环外初始化一个变量，并根据条件在循环内重新赋值：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">var</span> value<span class="token operator">:</span> Int <span class="token operator">=</span> <span class="token number">0</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>value <span class="token operator">!=</span> sentinelValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 做一些事情...</span>
    value<span class="token operator">++</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这种模式使赋值明确，并将赋值与循环的继续条件分开，符合Kotlin对明确性的强调。</strong></p><h3 id="_3-2-使用带有break语句的while循环" tabindex="-1"><a class="header-anchor" href="#_3-2-使用带有break语句的while循环"><span>3.2. 使用带有break语句的while循环</span></a></h3><p>有时，我们需要继续执行直到满足某个条件。Kotlin鼓励在循环内明确赋值，并在必要时使用break语句退出循环：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> value <span class="token operator">=</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">==</span> sentinelValue<span class="token punctuation">)</span> <span class="token keyword">break</span>
    <span class="token comment">// 处理value</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法强调了将赋值与循环的继续条件分开的明确性。</p><h3 id="_3-3-使用do-while进行初始化和条件判断" tabindex="-1"><a class="header-anchor" href="#_3-3-使用do-while进行初始化和条件判断"><span>3.3. 使用do-while进行初始化和条件判断</span></a></h3><p>do-while循环提供了另一种选择，<strong>确保在评估退出条件之前至少执行一次循环体：</strong></p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">do</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> value <span class="token operator">=</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">==</span> sentinelValue<span class="token punctuation">)</span> <span class="token keyword">break</span>
    <span class="token comment">// 处理value</span>
<span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当需要在循环执行内进行初始化时，这种模式提供了清晰的结构，用于处理此类情况。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>虽然Kotlin对while循环表达式中的赋值的限制可能最初看起来有限制性，但它反映了语言的整体设计哲学，即优先考虑安全性和清晰度。开发人员可以通过理解这一限制的原理并采用Kotlin的习惯用法来编写更健壮和可读的代码。本文介绍的替代方案，如使用带有break语句的while循环或选择do-while循环，展示了Kotlin的灵活性和有效的循环控制的强大功能。</p><p>如常，本文中使用的代码可以在GitHub上找到。我已经完成了翻译，以下是翻译的剩余部分：</p><hr><h1 id="kotlin中while表达式中的变量赋值-baeldung关于kotlin-1" tabindex="-1"><a class="header-anchor" href="#kotlin中while表达式中的变量赋值-baeldung关于kotlin-1"><span>Kotlin中while表达式中的变量赋值 | Baeldung关于Kotlin</span></a></h1><h2 id="_4-结论-1" tabindex="-1"><a class="header-anchor" href="#_4-结论-1"><span>4. 结论</span></a></h2><p>尽管Kotlin在while循环表达式中对赋值的限制可能最初看起来有些限制性，但这实际上反映了该语言的设计哲学，即优先考虑安全性和清晰性。通过理解这一限制背后的原因，并采用Kotlin的惯用模式，开发者可以编写出更加健壮和易于阅读的代码。本文介绍的替代方案，比如使用带有break语句的while循环或者选择do-while循环，展示了Kotlin的灵活性和强大的循环控制特性。</p><p>文章中使用的代码可以在GitHub上找到。</p><p><img src="https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/sites/5/2022/11/kotlin_sublogo.png" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/e6eb6cf88484314104912372deb68199?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/whiteleaf.svg" alt="img" loading="lazy"></p><hr><p>OK</p>`,34),i=[l];function o(p,c){return e(),a("div",null,i)}const u=n(s,[["render",o],["__file","2024-07-04-Assignment in While Expression in Kotlin.html.vue"]]),h=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Assignment%20in%20While%20Expression%20in%20Kotlin.html","title":"Kotlin中while表达式中的变量赋值 | Baeldung关于Kotlin","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin"],"tag":["Kotlin","Programming"],"head":[["meta",{"name":"keywords","content":"Kotlin, while loop, variable assignment"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Assignment%20in%20While%20Expression%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中while表达式中的变量赋值 | Baeldung关于Kotlin"}],["meta",{"property":"og:description","content":"Kotlin中while表达式中的变量赋值 | Baeldung关于Kotlin 1. 引言 在Kotlin中，就像在许多其他编程语言中一样，循环是允许代码块重复执行的基本控制结构。while循环特别适用于在某个条件保持为真的情况下执行代码。然而，Kotlin在while循环条件内的变量赋值方面与某些语言不同。与Java等语言不同，在Java中whil..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T14:34:58.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"Programming"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T14:34:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中while表达式中的变量赋值 | Baeldung关于Kotlin\\",\\"image\\":[\\"https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://www.baeldung.com/wp-content/uploads/sites/5/2022/11/kotlin_sublogo.png\\",\\"https://secure.gravatar.com/avatar/e6eb6cf88484314104912372deb68199?s=50&r=g\\",\\"https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/whiteleaf.svg\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T14:34:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中while表达式中的变量赋值 | Baeldung关于Kotlin 1. 引言 在Kotlin中，就像在许多其他编程语言中一样，循环是允许代码块重复执行的基本控制结构。while循环特别适用于在某个条件保持为真的情况下执行代码。然而，Kotlin在while循环条件内的变量赋值方面与某些语言不同。与Java等语言不同，在Java中whil..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 理解限制","slug":"_2-理解限制","link":"#_2-理解限制","children":[]},{"level":2,"title":"3. Kotlin中的替代模式","slug":"_3-kotlin中的替代模式","link":"#_3-kotlin中的替代模式","children":[{"level":3,"title":"3.1. 在循环外进行简单变量赋值","slug":"_3-1-在循环外进行简单变量赋值","link":"#_3-1-在循环外进行简单变量赋值","children":[]},{"level":3,"title":"3.2. 使用带有break语句的while循环","slug":"_3-2-使用带有break语句的while循环","link":"#_3-2-使用带有break语句的while循环","children":[]},{"level":3,"title":"3.3. 使用do-while进行初始化和条件判断","slug":"_3-3-使用do-while进行初始化和条件判断","link":"#_3-3-使用do-while进行初始化和条件判断","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论-1","link":"#_4-结论-1","children":[]}],"git":{"createdTime":1720103698000,"updatedTime":1720103698000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.82,"words":1147},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Assignment in While Expression in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在Kotlin中，就像在许多其他编程语言中一样，循环是允许代码块重复执行的基本控制结构。while循环特别适用于在某个条件保持为真的情况下执行代码。然而，Kotlin在while循环条件内的变量赋值方面与某些语言不同。与Java等语言不同，在Java中while循环条件内的赋值是常见做法，Kotlin限制了这种行为。</p>\\n<p>本教程探讨了这一设计选择背后的原理，讨论了它对Kotlin开发人员的影响，并展示了以Kotlin友好的方式实现类似功能的替代方法。</p>\\n<h2>2. 理解限制</h2>\\n<p>Kotlin对while循环表达式中赋值的限制是基于语言对清晰度和安全性的强调。Kotlin旨在减少常见编程错误的可能性，例如意外使用赋值(=)而不是等值检查(==)。这种错误可能导致难以追踪和修复的隐蔽错误。</p>","autoDesc":true}');export{u as comp,h as data};
