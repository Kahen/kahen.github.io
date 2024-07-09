import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-COaDJFIk.js";const t={},p=e(`<hr><h1 id="bigdecimal-zero-与-new-bigdecimal-0-baeldung" tabindex="-1"><a class="header-anchor" href="#bigdecimal-zero-与-new-bigdecimal-0-baeldung"><span>BigDecimal.ZERO 与 new BigDecimal(0) | Baeldung</span></a></h1><p>当我们使用 BigDecimal 处理数值零时，我们通常面临两种类似的方法：使用 BigDecimal.ZERO 或者创建一个新的 BigDecimal 对象 new BigDecimal(0)。本文将探讨这两种方法之间微妙但重要的差异，并讨论何时选择其中一种。</p><p>首先，让我们快速了解如何比较两个 BigDecimal 对象。BigDecimal 类实现了 Comparable 接口，提供了使用 equals() 方法或 compareTo() 方法比较两个 BigDecimal 的灵活性。但是，重要的是要认识到这两种方法在比较两个 BigDecimal 实例时进行的是不同的比较。</p><p>假设我们有两个 BigDecimal 对象 bd1 和 bd2。如果 bd1.compareTo(bd2) == 0，这只表明两个 BigDecimal 的数值相等。例如，BigDecimal 42.00 和 42.0000 在数值上是相等的，但它们的小数位数不同：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">BigDecimal</span> bd1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token string">&quot;42.00&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">BigDecimal</span> bd2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token string">&quot;42.0000&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> bd1<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>bd2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，需要注意的是，BigDecimal 中的 equals() 方法是根据数值和小数位数来评估相等性的。因此，使用 equals() 方法比较 BigDecimal 42.00 和 42.0000 会得出它们不相等的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">BigDecimal</span> bd1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token string">&quot;42.00&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">BigDecimal</span> bd2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token string">&quot;42.0000&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertNotEquals</span><span class="token punctuation">(</span>bd1<span class="token punctuation">,</span> bd2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们使用 equals() 方法比较 BigDecimal.ZERO 和 new BigDecimal(0)：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">BigDecimal</span> zero <span class="token operator">=</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">.</span><span class="token constant">ZERO</span><span class="token punctuation">;</span>
<span class="token class-name">BigDecimal</span> zero0 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>zero<span class="token punctuation">,</span> zero0<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上测试所示，BigDecimal.ZERO 和 new BigDecimal(0) 在数值和小数位数上都相等。因此，它们在数学上是相同的。实际上，这意味着在计算中使用它们时没有可感知的差异。</p><p>接下来，让我们看看这两个对象是如何实例化的。</p><h3 id="bigdecimal-zero-的内部工作原理" tabindex="-1"><a class="header-anchor" href="#bigdecimal-zero-的内部工作原理"><span>BigDecimal.ZERO 的内部工作原理</span></a></h3><p>BigDecimal.ZERO 是 BigDecimal 类中的一个常量字段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">BigDecimal</span> <span class="token constant">ZERO</span> <span class="token operator">=</span> <span class="token constant">ZERO_THROUGH_TEN</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如我们所见，它取自一个名为 ZERO_THROUGH_TEN 的数组的第一个元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token constant">ZERO_THROUGH_TEN</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token class-name">BigInteger</span><span class="token punctuation">.</span><span class="token constant">ZERO</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token class-name">BigInteger</span><span class="token punctuation">.</span><span class="token constant">ONE</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token class-name">BigInteger</span><span class="token punctuation">.</span><span class="token constant">TWO</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token class-name">BigInteger</span><span class="token punctuation">.</span><span class="token constant">TEN</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>BigDecimal 预先实例化了从 0 到 10 的十一个对象。因此，BigDecimal.ZERO 和数组中的其他实例已经准备好使用，无需额外的对象创建。</p><p>因此，每当我们使用 BigDecimal.ZERO 时，我们引用的是同一个对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">BigDecimal</span> z1 <span class="token operator">=</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">.</span><span class="token constant">ZERO</span><span class="token punctuation">;</span>
<span class="token class-name">BigDecimal</span> z2 <span class="token operator">=</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">.</span><span class="token constant">ZERO</span><span class="token punctuation">;</span>
<span class="token function">assertSame</span><span class="token punctuation">(</span>z1<span class="token punctuation">,</span> z2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="new-bigdecimal-0-的内部工作原理" tabindex="-1"><a class="header-anchor" href="#new-bigdecimal-0-的内部工作原理"><span>new BigDecimal(0) 的内部工作原理</span></a></h3><p>另一方面，new BigDecimal(0) 通过指定值 0 来创建一个新的 BigDecimal 对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token keyword">int</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>intCompact <span class="token operator">=</span> val<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>scale <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>intVal <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于它调用了构造函数，每次我们调用 new BigDecimal(0) 时，都会创建一个新的对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">BigDecimal</span> z1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">BigDecimal</span> z2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertNotSame</span><span class="token punctuation">(</span>z1<span class="token punctuation">,</span> z2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="我们应该采取哪种方法" tabindex="-1"><a class="header-anchor" href="#我们应该采取哪种方法"><span>我们应该采取哪种方法？</span></a></h3><p>BigDecimal.ZERO 和 new BigDecimal(0) 两种方法都创建了不可变的 BigDecimal 对象，确保了线程安全性和一致性。然而，如前所述，BigDecimal.ZERO 有额外的优势，即重用共享的常量对象。当 BigDecimal.ZERO 在代码库的多个部分中使用时，使用了相同的对象引用，避免了不必要的对象创建。</p><p>此外，选择 BigDecimal.ZERO 和 new BigDecimal(0) 之间的主要考虑因素之一是代码传达的清晰度和意图。BigDecimal.ZERO 因其可读性和简洁性而广受欢迎。它的自解释性使代码更具表现力，并与表示 0 的清晰意图保持一致。</p><p>因此，当我们的意图是拥有一个表示值 0 的 BigDecimal 对象时，选择 BigDecimal.ZERO 是明智的。</p><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>在本文中，我们首先学习了 BigDecimal.ZERO 和 new BigDecimal(0) 方法如何实例化 BigDecimal 实例。然后，我们从可读性和对象重用的角度讨论了我们应该采取哪种方法。</p><p>BigDecimal.ZERO 以其简洁的语法、清晰的意图和共享对象引用的潜力脱颖而出。因此，如果我们想要一个表示值 0 的 BigDecimal 对象，BigDecimal.ZERO 方法应该是我们的首选。</p><p>如常，示例的完整源代码可在 GitHub 上找到。</p>`,33),c=[p];function i(l,o){return s(),n("div",null,c)}const r=a(t,[["render",i],["__file","2024-06-25-BigDecimal.ZERO vs. new BigDecimal 0 .html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-25/2024-06-25-BigDecimal.ZERO%20vs.%20new%20BigDecimal%200%20.html","title":"BigDecimal.ZERO 与 new BigDecimal(0) | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-26T00:00:00.000Z","category":["Java","BigDecimal"],"tag":["Java","BigDecimal","ZERO","性能"],"head":[["meta",{"name":"keywords","content":"Java, BigDecimal, 性能优化"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-25/2024-06-25-BigDecimal.ZERO%20vs.%20new%20BigDecimal%200%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"BigDecimal.ZERO 与 new BigDecimal(0) | Baeldung"}],["meta",{"property":"og:description","content":"BigDecimal.ZERO 与 new BigDecimal(0) | Baeldung 当我们使用 BigDecimal 处理数值零时，我们通常面临两种类似的方法：使用 BigDecimal.ZERO 或者创建一个新的 BigDecimal 对象 new BigDecimal(0)。本文将探讨这两种方法之间微妙但重要的差异，并讨论何时选择其中一种..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-25T23:50:42.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"BigDecimal"}],["meta",{"property":"article:tag","content":"ZERO"}],["meta",{"property":"article:tag","content":"性能"}],["meta",{"property":"article:published_time","content":"2024-06-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-25T23:50:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"BigDecimal.ZERO 与 new BigDecimal(0) | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-25T23:50:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"BigDecimal.ZERO 与 new BigDecimal(0) | Baeldung 当我们使用 BigDecimal 处理数值零时，我们通常面临两种类似的方法：使用 BigDecimal.ZERO 或者创建一个新的 BigDecimal 对象 new BigDecimal(0)。本文将探讨这两种方法之间微妙但重要的差异，并讨论何时选择其中一种..."},"headers":[{"level":3,"title":"BigDecimal.ZERO 的内部工作原理","slug":"bigdecimal-zero-的内部工作原理","link":"#bigdecimal-zero-的内部工作原理","children":[]},{"level":3,"title":"new BigDecimal(0) 的内部工作原理","slug":"new-bigdecimal-0-的内部工作原理","link":"#new-bigdecimal-0-的内部工作原理","children":[]},{"level":3,"title":"我们应该采取哪种方法？","slug":"我们应该采取哪种方法","link":"#我们应该采取哪种方法","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1719359442000,"updatedTime":1719359442000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.36,"words":1009},"filePathRelative":"posts/baeldung/2024-06-25/2024-06-25-BigDecimal.ZERO vs. new BigDecimal 0 .md","localizedDate":"2024年6月26日","excerpt":"<hr>\\n<h1>BigDecimal.ZERO 与 new BigDecimal(0) | Baeldung</h1>\\n<p>当我们使用 BigDecimal 处理数值零时，我们通常面临两种类似的方法：使用 BigDecimal.ZERO 或者创建一个新的 BigDecimal 对象 new BigDecimal(0)。本文将探讨这两种方法之间微妙但重要的差异，并讨论何时选择其中一种。</p>\\n<p>首先，让我们快速了解如何比较两个 BigDecimal 对象。BigDecimal 类实现了 Comparable 接口，提供了使用 equals() 方法或 compareTo() 方法比较两个 BigDecimal 的灵活性。但是，重要的是要认识到这两种方法在比较两个 BigDecimal 实例时进行的是不同的比较。</p>","autoDesc":true}');export{r as comp,d as data};
