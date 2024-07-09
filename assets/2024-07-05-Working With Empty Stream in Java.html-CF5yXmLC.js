import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-_uhw5edP.js";const e={},p=t('<h1 id="java中处理空流的指南" tabindex="-1"><a class="header-anchor" href="#java中处理空流的指南"><span>Java中处理空流的指南</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在这篇简短的教程中，我们将快速了解Java流（Stream）中的中间操作和终端操作，创建空流（Empty Stream）的一些方法，以及如何检查流是否为空。</p><h2 id="_2-流和流操作" tabindex="-1"><a class="header-anchor" href="#_2-流和流操作"><span>2. 流和流操作</span></a></h2><p>流（Stream）API是Java 8的一个主要特性。流是我们可以迭代并执行操作的元素序列。</p><p><strong>流操作特别分为两种类型——中间操作和终端操作。</strong> 中间操作和终端操作可以连接在一起形成流管道。</p><p>顾名思义，终端操作出现在流管道的末端，并返回一个结果，如<code>distinct()</code>或创建一个副作用，如<code>forEach()</code>。</p><p>另一方面，中间操作，如<code>sorted()</code>，将流转换为另一个流。因此，我们可以链接多个中间操作。</p><p><strong>任何终端或中间操作实际上都不会改变流的源，而是产生一个结果。</strong> 另外，中间操作以延迟方式执行；只有在启动终端操作后才执行计算。</p><p>让我们看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Stream</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`````` numbers <span class="token operator">=</span> <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">int</span> sumOfEvenNumbers <span class="token operator">=</span> numbers\n  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>number <span class="token operator">-&gt;</span> number <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token operator">::</span><span class="token function">sum</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span>sumOfEvenNumbers<span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个整数流。我们使用了中间操作<code>filter()</code>来创建另一个偶数流。最后，我们使用了终端操作<code>reduce()</code>来获取所有偶数的总和。</p><h2 id="_3-在java中创建空流" tabindex="-1"><a class="header-anchor" href="#_3-在java中创建空流"><span>3. 在Java中创建空流</span></a></h2><p>有时，我们可能需要将流作为参数传递给方法或从方法返回。<strong>空流对于处理<code>NullPointerException</code>很有用。</strong> 此外，一些流操作，如<code>findFirst()</code>、<code>findAny()</code>、<code>min()</code>和<code>max()</code>，会检查流是否为空，并相应地返回结果。</p><p>有多种创建流的方法。因此，也有多种创建空流的方法。</p><p>首先，<strong>我们可以使用类<code>Stream</code>的<code>empty()</code>方法</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Stream</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``` emptyStream <span class="token operator">=</span> <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>empty()</code>方法返回一个空的顺序流（sequential Stream）的<code>String</code>类型。</p><p><strong>我们还可以使用<code>of()</code>方法创建任何类型的空流</strong>。<code>of()</code>方法返回一个包含作为参数传递给它的元素的顺序有序流。如果我们不传递任何参数，它将返回一个空流：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Stream</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``` emptyStr <span class="token operator">=</span> <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同样，我们可以使用<code>IntStream</code>来创建原始类型的流：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">IntStream</span> intStream <span class="token operator">=</span> <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>Arrays</code>类有一个<code>stream()</code>方法，它接受一个数组作为参数，并返回与参数类型相同的流。我们可以通过传递一个空数组作为参数来创建一个空流：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">IntStream</span> emptyIntStream <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，我们可以使用<code>Collection</code>（例如<code>List</code>或<code>Set</code>）的<code>stream()</code>方法来创建一个空流。一个空集合将创建一个空流：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Stream</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`````` emptyIntStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``````<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-检查空流" tabindex="-1"><a class="header-anchor" href="#_4-检查空流"><span>4. 检查空流</span></a></h2><p><strong>我们可以通过简单地使用一个短路终端操作，如<code>findFirst()</code>或<code>findAny()</code>来检查空流</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Stream</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``` emptyStream <span class="token operator">=</span> <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>emptyStream<span class="token punctuation">.</span><span class="token function">findAny</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，<code>findFirst()</code>如果流为空，则返回一个空的<code>Optional</code>。然后我们检查<code>Optional</code>中是否存在值。由于流是空的，<code>Optional</code>中没有值，它返回<code>false</code>。</p><p>然而，<strong>我们必须记住，我们只能对流操作一次。如果我们重复使用流，我们可能会遇到一个<code>IllegalStateException</code></strong>，它说：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">IllegalStateException</span><span class="token operator">:</span> stream has already been operated upon or closed<span class="token punctuation">.</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因此，<strong>我们只允许对消耗流的单个操作。</strong> 如果我们想重复使用流，我们必须处理这个<code>IllegalStateException</code>。</p><p>为了解决这个问题，我们可以在每次需要检查其空状态时，使用<code>Supplier</code>函数接口创建一个新的流：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Supplier</span><span class="token operator">&lt;</span><span class="token class-name">Stream</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``````<span class="token operator">&gt;</span> streamSupplier <span class="token operator">=</span> <span class="token class-name">Stream</span><span class="token operator">::</span><span class="token function">of</span><span class="token punctuation">;</span>\n\n<span class="token class-name">Optional</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`````` result1 <span class="token operator">=</span> streamSupplier<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">findAny</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>result1<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Optional</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`````` result2 <span class="token operator">=</span> streamSupplier<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>result2<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们首先定义了一个空流。然后我们创建了一个类型为<code>Stream``````&lt;Integer&gt;```````的</code>streamSupplier<code>对象。每次调用</code>get()`方法都会返回一个新的空流对象，我们可以安全地在其上执行另一个流操作。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇快速文章中，我们看到了在Java中创建空流的一些方法。我们还探讨了如何检查流是否为空，以及如何在避免抛出当流已经关闭或操作过著名<code>IllegalStateException</code>的同时，多次重用流。</p><p>一如既往，伴随文章的源代码可以在GitHub上找到。</p><p>OK</p>',40),o=[p];function c(l,i){return s(),n("div",null,o)}const d=a(e,[["render",c],["__file","2024-07-05-Working With Empty Stream in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Working%20With%20Empty%20Stream%20in%20Java.html","title":"Java中处理空流的指南","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Stream API"],"tag":["Java 8","Stream","Empty Stream"],"head":[["meta",{"name":"keywords","content":"Java Stream API, Empty Stream, Java 8"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Working%20With%20Empty%20Stream%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中处理空流的指南"}],["meta",{"property":"og:description","content":"Java中处理空流的指南 1. 概述 在这篇简短的教程中，我们将快速了解Java流（Stream）中的中间操作和终端操作，创建空流（Empty Stream）的一些方法，以及如何检查流是否为空。 2. 流和流操作 流（Stream）API是Java 8的一个主要特性。流是我们可以迭代并执行操作的元素序列。 流操作特别分为两种类型——中间操作和终端操作。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T14:36:37.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:tag","content":"Stream"}],["meta",{"property":"article:tag","content":"Empty Stream"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T14:36:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中处理空流的指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T14:36:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中处理空流的指南 1. 概述 在这篇简短的教程中，我们将快速了解Java流（Stream）中的中间操作和终端操作，创建空流（Empty Stream）的一些方法，以及如何检查流是否为空。 2. 流和流操作 流（Stream）API是Java 8的一个主要特性。流是我们可以迭代并执行操作的元素序列。 流操作特别分为两种类型——中间操作和终端操作。..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 流和流操作","slug":"_2-流和流操作","link":"#_2-流和流操作","children":[]},{"level":2,"title":"3. 在Java中创建空流","slug":"_3-在java中创建空流","link":"#_3-在java中创建空流","children":[]},{"level":2,"title":"4. 检查空流","slug":"_4-检查空流","link":"#_4-检查空流","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720190197000,"updatedTime":1720190197000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.67,"words":1102},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Working With Empty Stream in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在这篇简短的教程中，我们将快速了解Java流（Stream）中的中间操作和终端操作，创建空流（Empty Stream）的一些方法，以及如何检查流是否为空。</p>\\n<h2>2. 流和流操作</h2>\\n<p>流（Stream）API是Java 8的一个主要特性。流是我们可以迭代并执行操作的元素序列。</p>\\n<p><strong>流操作特别分为两种类型——中间操作和终端操作。</strong> 中间操作和终端操作可以连接在一起形成流管道。</p>\\n<p>顾名思义，终端操作出现在流管道的末端，并返回一个结果，如<code>distinct()</code>或创建一个副作用，如<code>forEach()</code>。</p>","autoDesc":true}');export{d as comp,k as data};
