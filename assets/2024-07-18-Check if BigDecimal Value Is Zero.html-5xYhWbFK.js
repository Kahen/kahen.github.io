import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-CE5go3V-.js";const t={},p=e(`<hr><h1 id="检查bigdecimal值是否为零" tabindex="-1"><a class="header-anchor" href="#检查bigdecimal值是否为零"><span>检查BigDecimal值是否为零</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>当我们在Java中进行小数计算时，可能会考虑使用_BigDecimal_类。</p><p>在这个简短的教程中，我们将探讨如何检查一个_BigDecimal_对象的值是否为零。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>问题其实相当直接。假设我们有一个非空的_BigDecimal_对象。我们想知道它的值是否等于零。</p><p>敏锐的眼睛可能已经意识到了“<em>它的值是否等于零</em>”的要求隐含了解决方案：使用_equals()_方法。此外，_BigDecimal_类提供了一个方便的_ZERO_常量对象来表示零值。</p><p>确实，这个问题听起来很简单。我们可以简单地检查_BigDecimal.ZERO.equals(givenBdNumber)<em>来决定_if the givenBdNumber object has the value zero</em>（如果给定的BdNumber对象的值是否为零）。然而，<strong>如果我们不知道_BigDecimal_的比较细节，我们可能会陷入一个常见的陷阱</strong>。</p><p>接下来，让我们更仔细地看看它，并解决正确的方法。</p><h2 id="_3-bigdecimal-比较的常见陷阱-使用-equals-方法" tabindex="-1"><a class="header-anchor" href="#_3-bigdecimal-比较的常见陷阱-使用-equals-方法"><span>3. _BigDecimal_比较的常见陷阱：使用_equals_方法</span></a></h2><p>首先，让我们创建一个值为零的_BigDecimal_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">BigDecimal</span> <span class="token constant">BD1</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token string">&quot;0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们使用_equals_方法检查_BD1_的值是否为零。为了简单起见，让我们在单元测试方法中这样做：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token class-name">BigDecimal</span><span class="token punctuation">.</span><span class="token constant">ZERO</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token constant">BD1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们运行测试，它会通过。到目前为止，一切都很好。我们可能会认为这是解决方案。接下来，让我们创建另一个_BigDecimal_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">BigDecimal</span> <span class="token constant">BD2</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token string">&quot;0.0000&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>显然，_BD2_对象的值是零，尽管我们通过一个有四位小数的字符串构建了它。众所周知，0.0000在值上与0相同。</p><p>现在，让我们再次使用_equals_方法测试BD2：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token class-name">BigDecimal</span><span class="token punctuation">.</span><span class="token constant">ZERO</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token constant">BD2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这次，如果我们运行该方法，<strong>令人惊讶的是，测试将失败</strong>。</p><p>这是因为一个_BigDecimal_对象具有值和小数位属性。此外，<strong>_equals_方法仅在两个_BigDecimal_对象在值和小数位上都相等时才认为它们相等</strong>。也就是说，如果我们使用_equals_比较，<em>BigDecimal</em> 42与42.0不相等。</p><p>另一方面，_BigDecimal.ZERO_常量具有零值和小数位也为零。因此，当我们检查“<em>0 equals 0.0000</em>”时，<em>equals_方法返回_false</em>。</p><p>因此，我们需要找到一种方法，只比较两个_BigDecimal_对象的值，而忽略它们的小数位。</p><p>接下来，让我们看看几种解决这个问题的方法。</p><h2 id="_4-使用-compareto-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用-compareto-方法"><span>4. 使用_compareTo_方法</span></a></h2><p>_BigDecimal_类实现了_Comparable_接口。因此，我们可以使用_compareTo_方法来比较两个_BigDecimal_对象的值。</p><p>此外，_compareTo_方法的Javadoc明确指出：</p><blockquote><p>两个在值上相等但在小数位上不同（如2.0和2.00）的_BigDecimal_对象，通过这种方法被认为是相等的。</p></blockquote><p>因此，**我们可以检查_BigDecimal.ZERO.compareTo(givenBdNumber) == 0_**来决定给定的BdNumber是否为零。</p><p>接下来，让我们测试这种方法是否可以正确地判断两个_BigDecimal_对象_BD1_和_BD2_是否为零：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token class-name">BigDecimal</span><span class="token punctuation">.</span><span class="token constant">ZERO</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span><span class="token constant">BD1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isSameAs</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token class-name">BigDecimal</span><span class="token punctuation">.</span><span class="token constant">ZERO</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span><span class="token constant">BD2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isSameAs</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们运行测试时，它通过了。因此，我们使用_compareTo_方法解决了问题。</p><h2 id="_5-使用-signum-方法" tabindex="-1"><a class="header-anchor" href="#_5-使用-signum-方法"><span>5. 使用_signum_方法</span></a></h2><p><strong>_BigDecimal_类提供了_signum_方法，以判断给定的_BigDecimal_对象的值是负数（-1）、零（0）还是正数（1）</strong>。_signum_方法将忽略小数位属性。</p><p>因此，我们可以通过检查_(givenBdNumber.signum() == 0)_来解决这个问题。</p><p>再次，让我们编写一个测试来验证这种方法是否适用于两个示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token constant">BD1</span><span class="token punctuation">.</span><span class="token function">signum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isSameAs</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token constant">BD2</span><span class="token punctuation">.</span><span class="token function">signum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isSameAs</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行上述测试，它将通过。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在这篇简短的文章中，我们讨论了两种正确的方法来检查一个_BigDecimal_对象的值是否为零：_compareTo_方法或_signum_方法。</p><p>像往常一样，这篇文章的完整代码可以在GitHub上找到。</p>`,42),c=[p];function i(o,l){return s(),n("div",null,c)}const m=a(t,[["render",i],["__file","2024-07-18-Check if BigDecimal Value Is Zero.html.vue"]]),_=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Check%20if%20BigDecimal%20Value%20Is%20Zero.html","title":"检查BigDecimal值是否为零","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","BigDecimal"],"tag":["BigDecimal","Java","Zero"],"head":[["meta",{"name":"keywords","content":"BigDecimal, Java, Zero"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Check%20if%20BigDecimal%20Value%20Is%20Zero.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"检查BigDecimal值是否为零"}],["meta",{"property":"og:description","content":"检查BigDecimal值是否为零 1. 概述 当我们在Java中进行小数计算时，可能会考虑使用_BigDecimal_类。 在这个简短的教程中，我们将探讨如何检查一个_BigDecimal_对象的值是否为零。 2. 问题介绍 问题其实相当直接。假设我们有一个非空的_BigDecimal_对象。我们想知道它的值是否等于零。 敏锐的眼睛可能已经意识到了“..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T04:31:21.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"BigDecimal"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Zero"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T04:31:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"检查BigDecimal值是否为零\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T04:31:21.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"检查BigDecimal值是否为零 1. 概述 当我们在Java中进行小数计算时，可能会考虑使用_BigDecimal_类。 在这个简短的教程中，我们将探讨如何检查一个_BigDecimal_对象的值是否为零。 2. 问题介绍 问题其实相当直接。假设我们有一个非空的_BigDecimal_对象。我们想知道它的值是否等于零。 敏锐的眼睛可能已经意识到了“..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. _BigDecimal_比较的常见陷阱：使用_equals_方法","slug":"_3-bigdecimal-比较的常见陷阱-使用-equals-方法","link":"#_3-bigdecimal-比较的常见陷阱-使用-equals-方法","children":[]},{"level":2,"title":"4. 使用_compareTo_方法","slug":"_4-使用-compareto-方法","link":"#_4-使用-compareto-方法","children":[]},{"level":2,"title":"5. 使用_signum_方法","slug":"_5-使用-signum-方法","link":"#_5-使用-signum-方法","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721277081000,"updatedTime":1721277081000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.37,"words":1010},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Check if BigDecimal Value Is Zero.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>检查BigDecimal值是否为零</h1>\\n<h2>1. 概述</h2>\\n<p>当我们在Java中进行小数计算时，可能会考虑使用_BigDecimal_类。</p>\\n<p>在这个简短的教程中，我们将探讨如何检查一个_BigDecimal_对象的值是否为零。</p>\\n<h2>2. 问题介绍</h2>\\n<p>问题其实相当直接。假设我们有一个非空的_BigDecimal_对象。我们想知道它的值是否等于零。</p>\\n<p>敏锐的眼睛可能已经意识到了“<em>它的值是否等于零</em>”的要求隐含了解决方案：使用_equals()_方法。此外，_BigDecimal_类提供了一个方便的_ZERO_常量对象来表示零值。</p>","autoDesc":true}');export{m as comp,_ as data};
