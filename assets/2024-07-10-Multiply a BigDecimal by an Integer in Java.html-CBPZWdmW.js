import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-bN4DcMMr.js";const t={},p=e(`<hr><h1 id="java中bigdecimal与integer的乘法操作" tabindex="-1"><a class="header-anchor" href="#java中bigdecimal与integer的乘法操作"><span>Java中BigDecimal与Integer的乘法操作</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在Java编程中，_Integer_和_BigDecimal_是我们日常使用中非常常见的两种数字类型。</p><p>在这个快速教程中，我们将探讨如何将_BigDecimal_数字与_Integer_数字相乘。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>一个例子可以快速解释问题。假设我们有一个_BigDecimal_数字和一个整数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">BigDecimal</span> <span class="token constant">BIG</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token string">&quot;42.42&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">INT</span> <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们想要计算_42.42 x 10_的结果，作为另一个_BigDecimal_数字：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">BigDecimal</span> <span class="token constant">EXPECTED</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token string">&quot;424.2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em>BigDecimal_提供了一组数学计算方法，如_add()</em>, <em>divide()</em>, <em>subtract()</em>, _multiply()_等。这些方法允许我们方便地执行标准的算术计算。然而，我们应该注意，这些方法只能在两个_BigDecimal_对象之间进行数学运算。换句话说，它们只接受_BigDecimal_类型的参数。</p><p>因此，我们不能直接将_BigDecimal_与_Integer_相乘。</p><p>接下来，让我们看看如何执行计算。为了简单起见，我们将使用单元测试断言来验证解决方案是否产生了预期的结果。</p><h2 id="_3-将-integer-转换为-bigdecimal-实例" tabindex="-1"><a class="header-anchor" href="#_3-将-integer-转换为-bigdecimal-实例"><span>3. 将_Integer_转换为_BigDecimal_实例</span></a></h2><p>现在我们知道_BigDecimal.multiply()_只接受_BigDecimal_数字作为参数。所以，如果我们能将_Integer_对象转换为_BigDecimal_对象，我们就可以执行乘法计算。</p><p><strong>_BigDecimal_类有一个_valueOf()_方法，它允许我们从_Integer_获取一个_BigDecimal_数字：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">BigDecimal</span> result <span class="token operator">=</span> <span class="token constant">BIG</span><span class="token punctuation">.</span><span class="token function">multiply</span><span class="token punctuation">(</span><span class="token class-name">BigDecimal</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token constant">INT</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token constant">EXPECTED</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，测试就会通过。所以我们得到了预期的结果。</p><p>值得一提的是，除了使用_BigDecimal.valueOf(INT)_方法，我们还可以使用构造函数从_Integer_获取_BigDecimal_数字：<em>new BigDecimal(INT)</em>。</p><p>然而，<strong>使用_valueOf()_方法是首选</strong>。这是因为_BigDecimal_类有预定义的十一个常用实例：从零到十：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token constant">ZERO_THROUGH_TEN</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span>
  <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token class-name">BigInteger</span><span class="token punctuation">.</span><span class="token constant">ZERO</span><span class="token punctuation">,</span> <span class="token number">0L</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token class-name">BigInteger</span><span class="token punctuation">.</span><span class="token constant">ONE</span><span class="token punctuation">,</span> <span class="token number">1L</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token class-name">BigInteger</span><span class="token punctuation">.</span><span class="token constant">TWO</span><span class="token punctuation">,</span> <span class="token number">2L</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token class-name">BigInteger</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token number">3L</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">3L</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
  <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token class-name">BigInteger</span><span class="token punctuation">.</span><span class="token constant">TEN</span><span class="token punctuation">,</span> <span class="token number">10L</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>_valueOf()_方法会检查给定的整数是否在“零到十”范围内，并尝试重用预定义的实例。</strong> 另一方面，调用构造函数总是创建一个新的_BigDecimal_实例。</p><h2 id="_4-关于断言的说明" tabindex="-1"><a class="header-anchor" href="#_4-关于断言的说明"><span>4. 关于断言的说明</span></a></h2><p>我们已经编写了一个测试，它验证了我们的解决方案是有效的。然而，好奇的眼睛可能会看到断言看起来有点尴尬：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token constant">EXPECTED</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们中的一些人可能想要简化它，以提高可读性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，如果我们用上面的断言运行测试，测试就会失败：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>opentest4j<span class="token punctuation">.</span></span>AssertionFailedError</span><span class="token operator">:</span>
<span class="token class-name">Expected</span> <span class="token operator">:</span><span class="token number">424.2</span>
<span class="token class-name">Actual</span>   <span class="token operator">:</span><span class="token number">424.20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是因为**_BigDecimal_的_equals()<em>方法不仅比较两个_BigDecimal_数字的值，它还检查两个_BigDecimal_数字的_小数位数</em>：**</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token keyword">instanceof</span> <span class="token class-name">BigDecimal</span> xDec<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">==</span> <span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>scale <span class="token operator">!=</span> xDec<span class="token punctuation">.</span>scale<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的情况下，我们只对_BigDecimal_数字的值感兴趣。因此，我们需要调用_compareTo()_方法。</p><p>或者，我们可以使用AssertJ的_isEqualByComparingTo()_方法使代码更易于阅读：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualByComparingTo</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇文章中，我们习了如何将_BigDecimal_与_Integer_相乘。由于_BigDecimal.multiply()_只接受一个_BigDecimal_对象作为参数，我们需要在调用_multiply()_方法之前将_Integer_对象转换为_BigDecimal_实例。</p><p>像往常一样，文章中展示的所有代码片段都可以在GitHub上找到。翻译已经完成，以下是剩余部分的翻译：</p><h3 id="_5-结论-1" tabindex="-1"><a class="header-anchor" href="#_5-结论-1"><span>5. 结论</span></a></h3><p>在这篇文章中，我们学习了如何在Java中将BigDecimal与Integer相乘。由于BigDecimal.multiply()方法只接受BigDecimal对象作为参数，我们需要在调用multiply()方法之前将Integer对象转换为BigDecimal实例。</p><p>文章中展示的所有代码片段都可以在GitHub上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>`,42),c=[p];function l(o,i){return s(),n("div",null,c)}const d=a(t,[["render",l],["__file","2024-07-10-Multiply a BigDecimal by an Integer in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Multiply%20a%20BigDecimal%20by%20an%20Integer%20in%20Java.html","title":"Java中BigDecimal与Integer的乘法操作","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","BigDecimal"],"tag":["BigDecimal","Integer","Java"],"head":[["meta",{"name":"keywords","content":"Java, BigDecimal, Integer, 乘法"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Multiply%20a%20BigDecimal%20by%20an%20Integer%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中BigDecimal与Integer的乘法操作"}],["meta",{"property":"og:description","content":"Java中BigDecimal与Integer的乘法操作 1. 概述 在Java编程中，_Integer_和_BigDecimal_是我们日常使用中非常常见的两种数字类型。 在这个快速教程中，我们将探讨如何将_BigDecimal_数字与_Integer_数字相乘。 2. 问题介绍 一个例子可以快速解释问题。假设我们有一个_BigDecimal_数字和..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T07:01:20.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"BigDecimal"}],["meta",{"property":"article:tag","content":"Integer"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T07:01:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中BigDecimal与Integer的乘法操作\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T07:01:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中BigDecimal与Integer的乘法操作 1. 概述 在Java编程中，_Integer_和_BigDecimal_是我们日常使用中非常常见的两种数字类型。 在这个快速教程中，我们将探讨如何将_BigDecimal_数字与_Integer_数字相乘。 2. 问题介绍 一个例子可以快速解释问题。假设我们有一个_BigDecimal_数字和..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 将_Integer_转换为_BigDecimal_实例","slug":"_3-将-integer-转换为-bigdecimal-实例","link":"#_3-将-integer-转换为-bigdecimal-实例","children":[]},{"level":2,"title":"4. 关于断言的说明","slug":"_4-关于断言的说明","link":"#_4-关于断言的说明","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[{"level":3,"title":"5. 结论","slug":"_5-结论-1","link":"#_5-结论-1","children":[]}]}],"git":{"createdTime":1720594880000,"updatedTime":1720594880000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.44,"words":1033},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Multiply a BigDecimal by an Integer in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中BigDecimal与Integer的乘法操作</h1>\\n<h2>1. 概述</h2>\\n<p>在Java编程中，_Integer_和_BigDecimal_是我们日常使用中非常常见的两种数字类型。</p>\\n<p>在这个快速教程中，我们将探讨如何将_BigDecimal_数字与_Integer_数字相乘。</p>\\n<h2>2. 问题介绍</h2>\\n<p>一个例子可以快速解释问题。假设我们有一个_BigDecimal_数字和一个整数：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">BigDecimal</span> <span class=\\"token constant\\">BIG</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">BigDecimal</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"42.42\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">final</span> <span class=\\"token keyword\\">int</span> <span class=\\"token constant\\">INT</span> <span class=\\"token operator\\">=</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,m as data};
