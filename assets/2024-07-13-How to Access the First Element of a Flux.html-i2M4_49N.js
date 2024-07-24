import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-B6f8H54y.js";const e={},p=t('<h1 id="如何访问flux的第一个元素" tabindex="-1"><a class="header-anchor" href="#如何访问flux的第一个元素"><span>如何访问Flux的第一个元素</span></a></h1><p>在本教程中，我们将探索使用Spring 5 WebFlux访问Flux的第一个元素的多种方法。</p><p>首先，我们将使用API的非阻塞方法，如next()和take()。之后，我们将看到如何使用elementAt()方法，我们需要指定索引来实现相同的目标。</p><p>最后，我们将学习API的阻塞方法，并使用blockFirst()来访问flux的第一个元素。</p><h2 id="_2-测试设置" tabindex="-1"><a class="header-anchor" href="#_2-测试设置"><span>2. 测试设置</span></a></h2><p>在本文的代码示例中，我们将使用Payment类，该类只有一个字段，即支付金额：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Payment</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> amount<span class="token punctuation">;</span>\n    <span class="token comment">// 构造函数和getter</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在测试中，我们将使用名为fluxOfThreePayments的测试帮助方法构建一个支付的flux：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">Flux</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">&gt;</span></span>``````````` <span class="token function">fluxOfThreePayments</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token class-name">Flux</span><span class="token punctuation">.</span><span class="token function">just</span><span class="token punctuation">(</span>paymentOf100<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Payment</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Payment</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，我们将使用Spring Reactor的StepVerifier来测试结果。</p><h2 id="_3-next" tabindex="-1"><a class="header-anchor" href="#_3-next"><span>3. next()</span></a></h2><p>首先，让我们尝试next()方法。这个方法将返回flux的第一个元素，包装在反应式Mono类型中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenAPaymentFlux_whenUsingNext_thenGetTheFirstPaymentAsMono</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Mono</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">&gt;</span></span>``````````` firstPayment <span class="token operator">=</span> <span class="token function">fluxOfThreePayments</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">StepVerifier</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>firstPayment<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">expectNext</span><span class="token punctuation">(</span>paymentOf100<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">verifyComplete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一方面，如果我们在一个空的flux上调用next()，结果将是一个空的Mono。因此，阻塞它将返回null：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenAEmptyFlux_whenUsingNext_thenGetAnEmptyMono</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Flux</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">&gt;</span></span>``````````` emptyFlux <span class="token operator">=</span> <span class="token class-name">Flux</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Mono</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">&gt;</span></span>``````````` firstPayment <span class="token operator">=</span> emptyFlux<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">StepVerifier</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>firstPayment<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">verifyComplete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-take" tabindex="-1"><a class="header-anchor" href="#_4-take"><span>4. take()</span></a></h2><p>反应式flux的take()方法等同于Java 8 Streams中的limit()。换句话说，我们可以使用take(1)将flux限制为恰好一个元素，然后以阻塞或非阻塞的方式使用它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenAPaymentFlux_whenUsingTake_thenGetTheFirstPaymentAsFlux</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Flux</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">&gt;</span></span>``````````` firstPaymentFlux <span class="token operator">=</span> <span class="token function">fluxOfThreePayments</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">take</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">StepVerifier</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>firstPaymentFlux<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">expectNext</span><span class="token punctuation">(</span>paymentOf100<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">verifyComplete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类似地，对于一个空的flux，take(1)将返回一个空的flux：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenAEmptyFlux_whenUsingNext_thenGetAnEmptyFlux</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Flux</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">&gt;</span></span>``````````` emptyFlux <span class="token operator">=</span> <span class="token class-name">Flux</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Flux</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">&gt;</span></span>``````````` firstPaymentFlux <span class="token operator">=</span> emptyFlux<span class="token punctuation">.</span><span class="token function">take</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">StepVerifier</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>firstPaymentFlux<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">verifyComplete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-elementat" tabindex="-1"><a class="header-anchor" href="#_5-elementat"><span>5. elementAt()</span></a></h2><p>Flux API还提供了elementAt()方法。我们可以使用elementAt(0)以非阻塞方式获取flux的第一个元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenAPaymentFlux_whenUsingElementAt_thenGetTheFirstPaymentAsMono</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Mono</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">&gt;</span></span>``````````` firstPayment <span class="token operator">=</span> <span class="token function">fluxOfThreePayments</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">elementAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">StepVerifier</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>firstPayment<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">expectNext</span><span class="token punctuation">(</span>paymentOf100<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">verifyComplete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，如果作为参数传递的索引大于flux发出的元素数量，将发出错误：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenAEmptyFlux_whenUsingElementAt_thenGetAnEmptyMono</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Flux</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">&gt;</span></span>``````````` emptyFlux <span class="token operator">=</span> <span class="token class-name">Flux</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Mono</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">&gt;</span></span>``````````` firstPayment <span class="token operator">=</span> emptyFlux<span class="token punctuation">.</span><span class="token function">elementAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">StepVerifier</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>firstPayment<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">expectError</span><span class="token punctuation">(</span><span class="token class-name">IndexOutOfBoundsException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-blockfirst" tabindex="-1"><a class="header-anchor" href="#_6-blockfirst"><span>6. blockFirst()</span></a></h2><p>另外，我们也可以使用方法blockFirst()。尽管如此，正如名称所示，这是一种阻塞方法。因此，如果我们使用blockFirst()，我们将离开反应式世界，我们将失去它所有的好处：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenAPaymentFlux_whenUsingBlockFirst_thenGetTheFirstPayment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Payment</span> firstPayment <span class="token operator">=</span> <span class="token function">fluxOfThreePayments</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">blockFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>firstPayment<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>paymentOf100<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-tostream" tabindex="-1"><a class="header-anchor" href="#_7-tostream"><span>7. toStream()</span></a></h2><p>最后，我们可以将flux转换为Java 8流，然后访问第一个元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenAPaymentFlux_whenUsingToStream_thenGetTheFirstPaymentAsOptional</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Optional</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">&gt;</span></span>``````````` firstPayment <span class="token operator">=</span> <span class="token function">fluxOfThreePayments</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>firstPayment<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>paymentOf100<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是，如果我们这样做，我们将无法继续使用反应式管道。</p><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在本文中，我们讨论了Java反应式流的API。我们看到了访问Flux的第一个元素的多种方法，并了解到如果我们想使用反应式管道，我们应该坚持使用非阻塞解决方案。</p><p>如往常一样，本文的代码可以在GitHub上找到。</p>',35),c=[p];function o(l,i){return s(),a("div",null,c)}const r=n(e,[["render",o],["__file","2024-07-13-How to Access the First Element of a Flux.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-How%20to%20Access%20the%20First%20Element%20of%20a%20Flux.html","title":"如何访问Flux的第一个元素","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","WebFlux"],"tag":["Spring","Reactive Programming"],"head":[["meta",{"name":"keywords","content":"Java, Spring WebFlux, Reactive Programming, Flux"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-How%20to%20Access%20the%20First%20Element%20of%20a%20Flux.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何访问Flux的第一个元素"}],["meta",{"property":"og:description","content":"如何访问Flux的第一个元素 在本教程中，我们将探索使用Spring 5 WebFlux访问Flux的第一个元素的多种方法。 首先，我们将使用API的非阻塞方法，如next()和take()。之后，我们将看到如何使用elementAt()方法，我们需要指定索引来实现相同的目标。 最后，我们将学习API的阻塞方法，并使用blockFirst()来访问fl..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T07:04:05.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring"}],["meta",{"property":"article:tag","content":"Reactive Programming"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T07:04:05.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何访问Flux的第一个元素\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T07:04:05.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何访问Flux的第一个元素 在本教程中，我们将探索使用Spring 5 WebFlux访问Flux的第一个元素的多种方法。 首先，我们将使用API的非阻塞方法，如next()和take()。之后，我们将看到如何使用elementAt()方法，我们需要指定索引来实现相同的目标。 最后，我们将学习API的阻塞方法，并使用blockFirst()来访问fl..."},"headers":[{"level":2,"title":"2. 测试设置","slug":"_2-测试设置","link":"#_2-测试设置","children":[]},{"level":2,"title":"3. next()","slug":"_3-next","link":"#_3-next","children":[]},{"level":2,"title":"4. take()","slug":"_4-take","link":"#_4-take","children":[]},{"level":2,"title":"5. elementAt()","slug":"_5-elementat","link":"#_5-elementat","children":[]},{"level":2,"title":"6. blockFirst()","slug":"_6-blockfirst","link":"#_6-blockfirst","children":[]},{"level":2,"title":"7. toStream()","slug":"_7-tostream","link":"#_7-tostream","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1720854245000,"updatedTime":1720854245000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.56,"words":768},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-How to Access the First Element of a Flux.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将探索使用Spring 5 WebFlux访问Flux的第一个元素的多种方法。</p>\\n<p>首先，我们将使用API的非阻塞方法，如next()和take()。之后，我们将看到如何使用elementAt()方法，我们需要指定索引来实现相同的目标。</p>\\n<p>最后，我们将学习API的阻塞方法，并使用blockFirst()来访问flux的第一个元素。</p>\\n<h2>2. 测试设置</h2>\\n<p>在本文的代码示例中，我们将使用Payment类，该类只有一个字段，即支付金额：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Payment</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">final</span> <span class=\\"token keyword\\">int</span> amount<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token comment\\">// 构造函数和getter</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
