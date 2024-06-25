import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CUBmiNft.js";const p={},e=t(`<h1 id="reactor库中flux-map-与flux-doonnext-的比较-baeldung概述" tabindex="-1"><a class="header-anchor" href="#reactor库中flux-map-与flux-doonnext-的比较-baeldung概述"><span>Reactor库中Flux.map()与Flux.doOnNext()的比较 | Baeldung概述</span></a></h1><p>在Reactor库中，Flux.map()和Flux.doOnNext()操作符在处理流数据元素时扮演着不同的角色。</p><p>Flux.map()操作符有助于转换Flux发出的每个元素。Flux.doOnNext()操作符是一个生命周期钩子，允许我们在每个元素发出时执行副作用操作。</p><p>在本教程中，我们将深入探讨这些操作符的详细信息，探索它们的内部实现和实际用例。此外，我们还将看到如何一起使用这两个操作符。</p><p>Maven依赖</p><p>要使用Flux发布者和其他响应式操作符，让我们将reactor-core依赖项添加到pom.xml中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId\\</span><span class="token punctuation">&gt;</span></span>io.projectreactor\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId\\</span><span class="token punctuation">&gt;</span></span>reactor-core\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version\\</span><span class="token punctuation">&gt;</span></span>3.6.5\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version\\</span><span class="token punctuation">&gt;</span></span>
\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency\\</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此依赖项提供了Flux、Mono等核心类。</p><p>同样，让我们添加reactor-test依赖项以帮助我们的单元测试：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId\\</span><span class="token punctuation">&gt;</span></span>io.projectreactor\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId\\</span><span class="token punctuation">&gt;</span></span>reactor-test\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version\\</span><span class="token punctuation">&gt;</span></span>3.6.5\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope\\</span><span class="token punctuation">&gt;</span></span>test\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope\\</span><span class="token punctuation">&gt;</span></span>
\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency\\</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述依赖项提供了StepVerifier等类，允许我们创建测试场景并断言响应式管道的预期行为。</p><p>理解Flux.map()操作符</p><p>Flux.map()操作符类似于Java内置的Stream.map()，但它在响应式流上操作。</p><h3 id="_3-1-马赛克图" tabindex="-1"><a class="header-anchor" href="#_3-1-马赛克图"><span>3.1. 马赛克图</span></a></h3><p>让我们通过马赛克图了解Flux.map()操作符的内部：</p><p>在上面的图中，我们有一个Flux发布者，它发出一个没有错误的数据流。它还显示了map()操作符对发出数据的影响。操作符将数据从圆形转换为正方形并返回转换后的数据。<strong>订阅后，将发出转换后的数据，而不是原始数据</strong>。</p><h3 id="_3-2-方法定义" tabindex="-1"><a class="header-anchor" href="#_3-2-方法定义"><span>3.2. 方法定义</span></a></h3><p>Flux.map()操作符接受一个Function作为参数，并返回一个包含转换元素的新Flux。</p><p>这是方法签名：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">final</span> \\<span class="token operator">&lt;</span><span class="token class-name">V</span>\\<span class="token operator">&gt;</span> <span class="token class-name">Flux</span>\\<span class="token operator">&lt;</span><span class="token class-name">V</span>\\<span class="token operator">&gt;</span> <span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">Function</span>\\<span class="token operator">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">T</span><span class="token punctuation">,</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">V</span>\\<span class="token operator">&gt;</span> mapper<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这种情况下，输入是来自Flux发布者的数据流。<strong>映射器函数将同步应用于Flux发出的每个元素</strong>。输出是一个包含基于提供的映射器函数转换的元素的新Flux。</p><h3 id="_3-3-示例代码" tabindex="-1"><a class="header-anchor" href="#_3-3-示例代码"><span>3.3. 示例代码</span></a></h3><p>让我们通过将每个值乘以10来将一些数据转换为新序列：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Flux</span>\\<span class="token operator">&lt;</span><span class="token class-name">Integer</span>\\<span class="token operator">&gt;</span> numbersFlux <span class="token operator">=</span> <span class="token class-name">Flux</span><span class="token punctuation">.</span><span class="token function">just</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">51</span><span class="token punctuation">,</span> <span class="token number">52</span><span class="token punctuation">,</span> <span class="token number">53</span><span class="token punctuation">,</span> <span class="token number">54</span><span class="token punctuation">,</span> <span class="token number">55</span><span class="token punctuation">,</span> <span class="token number">56</span><span class="token punctuation">,</span> <span class="token number">57</span><span class="token punctuation">,</span> <span class="token number">58</span><span class="token punctuation">,</span> <span class="token number">59</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>i <span class="token operator">-</span>\\<span class="token operator">&gt;</span> i <span class="token operator">*</span> <span class="token number">10</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">onErrorResume</span><span class="token punctuation">(</span><span class="token class-name">Flux</span><span class="token operator">::</span><span class="token function">error</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，让我们断言发出的新数据序列等于预期的数字：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">StepVerifier</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>numbersFlux<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">expectNext</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">,</span> <span class="token number">510</span><span class="token punctuation">,</span> <span class="token number">520</span><span class="token punctuation">,</span> <span class="token number">530</span><span class="token punctuation">,</span> <span class="token number">540</span><span class="token punctuation">,</span> <span class="token number">550</span><span class="token punctuation">,</span> <span class="token number">560</span><span class="token punctuation">,</span> <span class="token number">570</span><span class="token punctuation">,</span> <span class="token number">580</span><span class="token punctuation">,</span> <span class="token number">590</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">verifyComplete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>map()操作符按照马赛克图和函数定义所描述的方式对数据进行操作，产生了每个值乘以10的新输出。</p><p>理解doOnNext()操作符</p><p>Flux.doOnNext()操作符是一个生命周期钩子，有助于窥视发出的数据流。它类似于Stream.peek()。<strong>它提供了一种在发出的每个元素上执行副作用的方法，而不会改变原始数据流</strong>。</p><h3 id="_4-1-马赛克图" tabindex="-1"><a class="header-anchor" href="#_4-1-马赛克图"><span>4.1. 马赛克图</span></a></h3><p>让我们通过马赛克图了解Flux.doOnNext()方法的内部：</p><p>在上面的图中，显示了Flux发出的数据流和doOnNext()操作符对数据的操作。</p><h3 id="_4-2-方法定义" tabindex="-1"><a class="header-anchor" href="#_4-2-方法定义"><span>4.2. 方法定义</span></a></h3><p>让我们看看doOnNext()操作符的方法定义：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token class-name">Flux</span>\\<span class="token operator">&lt;</span><span class="token class-name">T</span>\\<span class="token operator">&gt;</span> <span class="token function">doOnNext</span><span class="token punctuation">(</span><span class="token class-name">Consumer</span>\\<span class="token operator">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">T</span>\\<span class="token operator">&gt;</span> onNext<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该方法接受一个Consumer&lt;T&gt;作为参数。<strong>Consumer是一个功能接口，代表一个副作用操作</strong>。它消耗输入但不产生任何输出，使其适合执行副作用操作。</p><h3 id="_4-3-示例代码" tabindex="-1"><a class="header-anchor" href="#_4-3-示例代码"><span>4.3. 示例代码</span></a></h3><p>让我们将doOnNext()操作符应用于在订阅时将数据流中的项目记录到控制台：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Flux</span>\\<span class="token operator">&lt;</span><span class="token class-name">Integer</span>\\<span class="token operator">&gt;</span> numberFlux <span class="token operator">=</span> <span class="token class-name">Flux</span><span class="token punctuation">.</span><span class="token function">just</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">doOnNext</span><span class="token punctuation">(</span>number <span class="token operator">-</span>\\<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
      <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">onErrorResume</span><span class="token punctuation">(</span><span class="token class-name">Flux</span><span class="token operator">::</span><span class="token function">error</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，doOnNext()操作符在Flux发出的每个数字时将其记录到控制台，而不会修改实际的数字。</p><p>同时使用两个操作符</p><p>由于Flux.map()和Flux.doOnNext()服务于不同的目的，<strong>它们可以结合在响应式管道中以实现数据转换和副作用</strong>。</p><p>让我们通过记录项目到控制台并转换原始数据为新数据来窥视发出的数据流中的项目：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Flux</span>\\<span class="token operator">&lt;</span><span class="token class-name">Integer</span>\\<span class="token operator">&gt;</span> numbersFlux <span class="token operator">=</span> <span class="token class-name">Flux</span><span class="token punctuation">.</span><span class="token function">just</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">doOnNext</span><span class="token punctuation">(</span>number <span class="token operator">-</span>\\<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
      <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Number: &quot;</span> <span class="token operator">+</span> number<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>i <span class="token operator">-</span>\\<span class="token operator">&gt;</span> i <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">doOnNext</span><span class="token punctuation">(</span>number <span class="token operator">-</span>\\<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
      <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Transformed Number: &quot;</span> <span class="token operator">+</span> number<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">onErrorResume</span><span class="token punctuation">(</span><span class="token class-name">Flux</span><span class="token operator">::</span><span class="token function">error</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们首先使用doOnNext()操作符记录Flux发出的每个原始数字。接下来，我们应用map()操作符将每个数字乘以5进行转换。然后，我们使用另一个doOnNext()操作符记录转换后的数字。</p><p>最后，让我们断言发出的数据是预期的数据：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">StepVerifier</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>numbersFlux<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">expectNext</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">55</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">65</span><span class="token punctuation">,</span> <span class="token number">70</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">verifyComplete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种结合使用有助于我们在转换数据流的同时，通过记录提供原始和转换元素的可见性。</p><p>主要区别</p><p>我们知道，这两个操作符作用于发出的数据。然而，Flux.map()操作符是一个转换操作符，通过将提供的函数应用于每个元素来改变原始发出的数据流。<strong>这个操作符在我们想要对流中的元素执行计算、数据转换或操作的情况下非常有用</strong>。</p><p>另一方面，Flux.doOnNext()操作符是一个生命周期钩子，允许我们检查并对每个发出的元素执行操作。它不能修改数据。<strong>这个操作符在记录、调试等情况下非常有用</strong>。</p><p>结论</p><p>在本文中，我们深入探讨了Project Reactor库中Flux.map()和Flux.doOnNext()操作符的细节。我们通过检查马赛克图、类型定义和实际示例来研究它们的内部工作方式。</p><p>这两个操作符服务于不同的用例，可以一起使用来构建强大且健壮的响应式系统。</p><p>如常，示例的完整源代码可在GitHub上获得。</p><p>OK</p>`,56),o=[e];function c(l,u){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","Comparison Between Flux.map() and Flux.doOnNext().html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Comparison%20Between%20Flux.map()%20and%20Flux.doOnNext().html","title":"Reactor库中Flux.map()与Flux.doOnNext()的比较 | Baeldung概述","lang":"zh-CN","frontmatter":{"date":"2024-06-14T00:00:00.000Z","category":["Java","Reactive Programming"],"tag":["Reactor","Flux","map","doOnNext"],"description":"Reactor库中Flux.map()与Flux.doOnNext()的比较 | Baeldung概述 在Reactor库中，Flux.map()和Flux.doOnNext()操作符在处理流数据元素时扮演着不同的角色。 Flux.map()操作符有助于转换Flux发出的每个元素。Flux.doOnNext()操作符是一个生命周期钩子，允许我们在每个元...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Comparison%20Between%20Flux.map()%20and%20Flux.doOnNext().html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Reactor库中Flux.map()与Flux.doOnNext()的比较 | Baeldung概述"}],["meta",{"property":"og:description","content":"Reactor库中Flux.map()与Flux.doOnNext()的比较 | Baeldung概述 在Reactor库中，Flux.map()和Flux.doOnNext()操作符在处理流数据元素时扮演着不同的角色。 Flux.map()操作符有助于转换Flux发出的每个元素。Flux.doOnNext()操作符是一个生命周期钩子，允许我们在每个元..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Reactor"}],["meta",{"property":"article:tag","content":"Flux"}],["meta",{"property":"article:tag","content":"map"}],["meta",{"property":"article:tag","content":"doOnNext"}],["meta",{"property":"article:published_time","content":"2024-06-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Reactor库中Flux.map()与Flux.doOnNext()的比较 | Baeldung概述\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-14T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":3,"title":"3.1. 马赛克图","slug":"_3-1-马赛克图","link":"#_3-1-马赛克图","children":[]},{"level":3,"title":"3.2. 方法定义","slug":"_3-2-方法定义","link":"#_3-2-方法定义","children":[]},{"level":3,"title":"3.3. 示例代码","slug":"_3-3-示例代码","link":"#_3-3-示例代码","children":[]},{"level":3,"title":"4.1. 马赛克图","slug":"_4-1-马赛克图","link":"#_4-1-马赛克图","children":[]},{"level":3,"title":"4.2. 方法定义","slug":"_4-2-方法定义","link":"#_4-2-方法定义","children":[]},{"level":3,"title":"4.3. 示例代码","slug":"_4-3-示例代码","link":"#_4-3-示例代码","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.92,"words":1476},"filePathRelative":"posts/baeldung/Archive/Comparison Between Flux.map() and Flux.doOnNext().md","localizedDate":"2024年6月14日","excerpt":"\\n<p>在Reactor库中，Flux.map()和Flux.doOnNext()操作符在处理流数据元素时扮演着不同的角色。</p>\\n<p>Flux.map()操作符有助于转换Flux发出的每个元素。Flux.doOnNext()操作符是一个生命周期钩子，允许我们在每个元素发出时执行副作用操作。</p>\\n<p>在本教程中，我们将深入探讨这些操作符的详细信息，探索它们的内部实现和实际用例。此外，我们还将看到如何一起使用这两个操作符。</p>\\n<p>Maven依赖</p>\\n<p>要使用Flux发布者和其他响应式操作符，让我们将reactor-core依赖项添加到pom.xml中：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>\\\\<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency\\\\</span><span class=\\"token punctuation\\">&gt;</span></span>\\n    \\\\<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId\\\\</span><span class=\\"token punctuation\\">&gt;</span></span>io.projectreactor\\\\<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId\\\\</span><span class=\\"token punctuation\\">&gt;</span></span>\\n    \\\\<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId\\\\</span><span class=\\"token punctuation\\">&gt;</span></span>reactor-core\\\\<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId\\\\</span><span class=\\"token punctuation\\">&gt;</span></span>\\n    \\\\<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version\\\\</span><span class=\\"token punctuation\\">&gt;</span></span>3.6.5\\\\<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version\\\\</span><span class=\\"token punctuation\\">&gt;</span></span>\\n\\\\<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency\\\\</span><span class=\\"token punctuation\\">&gt;</span></span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
