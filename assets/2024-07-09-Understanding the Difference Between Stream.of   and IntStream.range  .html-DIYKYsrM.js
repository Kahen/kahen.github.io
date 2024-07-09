import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DRFG6C5y.js";const e={},p=t('<h1 id="java-8-中-stream-of-与-intstream-range-的区别解析" tabindex="-1"><a class="header-anchor" href="#java-8-中-stream-of-与-intstream-range-的区别解析"><span>Java 8 中 Stream.of() 与 IntStream.range() 的区别解析</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Java 8 中引入的 Stream API 是一项重大新特性。</p><p>在本教程中，我们将讨论一个有趣的话题：Stream.of() 和 IntStream.range() 之间的区别。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>我们可以使用 Stream.of() 方法初始化一个 Stream 对象，例如 Stream.of(1, 2, 3, 4, 5)。或者，如果我们想要初始化一个整数 Stream，IntStream 是一个更直接使用的类型，例如 IntStream.range(1, 6)。然而，通过这两种方法创建的整数 Stream 的行为可能会有所不同。</p><p>像往常一样，我们将通过一个例子来理解问题。首先，让我们以不同的方式创建两个 Stream：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Stream</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````` normalStream <span class="token operator">=</span> <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">IntStream</span> intStreamByRange <span class="token operator">=</span> <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将对上述两个 Stream 执行相同的操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token constant">STREAM</span><span class="token punctuation">.</span><span class="token function">peek</span><span class="token punctuation">(</span>添加到结果列表<span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">sorted</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将对每个 Stream 调用三种方法：</p><ul><li>首先 - 调用 peek() 方法将处理过的元素收集到结果列表</li><li>然后 - 对元素进行排序</li><li>最后 - 从 Stream 中取出第一个元素</li></ul><p>由于两个 Stream 包含相同的整数值，我们会认为执行后，两个结果列表也应该包含相同的整数。那么接下来，让我们编写一个测试来检查它是否产生了我们期望的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````` normalStreamPeekResult <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````` intStreamPeekResult <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// 首先是常规 Stream</span>\nnormalStream<span class="token punctuation">.</span><span class="token function">peek</span><span class="token punctuation">(</span>normalStreamPeekResult<span class="token operator">::</span><span class="token function">add</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">sorted</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">,</span> normalStreamPeekResult<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// 然后是 IntStream</span>\nintStreamByRange<span class="token punctuation">.</span><span class="token function">peek</span><span class="token punctuation">(</span>intStreamPeekResult<span class="token operator">::</span><span class="token function">add</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">sorted</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> intStreamPeekResult<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行后，结果表明由 normalStream.peek() 填充的结果列表包含了所有整数值。然而，由 intStreamByRange.peek() 填充的列表仅有一个元素。</p><p>接下来，让我们找出为什么会这样。</p><h2 id="_3-streams-是懒加载的" tabindex="-1"><a class="header-anchor" href="#_3-streams-是懒加载的"><span>3. Streams 是懒加载的</span></a></h2><p>在我们解释两个 Stream 在早期测试中为何产生了不同的结果列表之前，让我们理解 Java Streams 是按设计懒加载的。</p><p>“懒加载”意味着 Stream 只有在被告知要产生结果时才执行所需的操作。换句话说，**Stream 上的中间操作直到执行终端操作时才执行。**这种懒加载行为可以是一个优势，因为它允许更高效的处理并防止不必要的计算。</p><p>为了快速理解这种懒加载行为，让我们暂时去掉先前测试中的 sort() 方法调用，并重新运行它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````` normalStreamPeekResult <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````` intStreamPeekResult <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// 首先是常规 Stream</span>\nnormalStream<span class="token punctuation">.</span><span class="token function">peek</span><span class="token punctuation">(</span>normalStreamPeekResult<span class="token operator">::</span><span class="token function">add</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> normalStreamPeekResult<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// 然后是 IntStream</span>\nintStreamByRange<span class="token punctuation">.</span><span class="token function">peek</span><span class="token punctuation">(</span>intStreamPeekResult<span class="token operator">::</span><span class="token function">add</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> intStreamPeekResult<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这次两个 Stream 都只填充了相应结果列表中的第一个元素。这是因为 <strong>findFirst() 方法是终端操作，它只需要一个元素——第一个。</strong></p><p>现在我们理解了 Stream 是懒加载的，接下来，让我们找出当 sorted() 方法加入时，两个结果列表为何不同。</p><h2 id="_4-调用-sorted-可能会使-stream-变为-急切-模式" tabindex="-1"><a class="header-anchor" href="#_4-调用-sorted-可能会使-stream-变为-急切-模式"><span>4. 调用 sorted() 可能会使 Stream 变为“急切”模式</span></a></h2><p>首先，让我们看看由 Stream.of() 初始化的 Stream。终端操作 findFirst() 只需要 Stream 中的第一个整数。但 <strong>这是在 sorted() 操作之后的第一个。</strong></p><p>我们知道我们必须遍历所有整数才能对它们进行排序。因此，调用 sorted() 使 Stream 变为“急切”模式。所以，<strong>peek() 方法会被调用在每个元素上。</strong></p><p>另一方面，<strong>IntStream.range() 返回一个顺序排序的 IntStream</strong>。也就是说，IntStream 对象的输入已经是排序过的。此外，**当它对已经排序过的输入进行排序时，Java 应用优化使得 sorted() 操作成为无操作。**因此，结果列表中仍然只有一个元素。</p><p>接下来，让我们看一个基于 TreeSet 的 Stream 的另一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` peekResult <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">TreeSet</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` treeSet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;CCC&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;BBB&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;AAA&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;DDD&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;KKK&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\ntreeSet<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">peek</span><span class="token punctuation">(</span>peekResult<span class="token operator">::</span><span class="token function">add</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">sorted</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;AAA&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> peekResult<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们知道 TreeSet 是一个排序集合。因此，我们看到 peekResult 列表只包含一个字符串，尽管我们调用了 sorted()。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们以 Stream.of() 和 IntStream.range() 为例，理解了调用 sorted() 可能会使 Stream 从“懒加载”变为“急切”模式。</p><p>像往常一样，文章中展示的所有代码片段都可以在 GitHub 上找到。</p>',33),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-09-Understanding the Difference Between Stream.of   and IntStream.range  .html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Understanding%20the%20Difference%20Between%20Stream.of%20%20%20and%20IntStream.range%20%20.html","title":"Java 8 中 Stream.of() 与 IntStream.range() 的区别解析","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Stream API"],"tag":["Stream.of()","IntStream.range()"],"head":[["meta",{"name":"keywords","content":"Java, Stream API, Stream.of(), IntStream.range(), 懒加载, 急切模式"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Understanding%20the%20Difference%20Between%20Stream.of%20%20%20and%20IntStream.range%20%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 8 中 Stream.of() 与 IntStream.range() 的区别解析"}],["meta",{"property":"og:description","content":"Java 8 中 Stream.of() 与 IntStream.range() 的区别解析 1. 概述 Java 8 中引入的 Stream API 是一项重大新特性。 在本教程中，我们将讨论一个有趣的话题：Stream.of() 和 IntStream.range() 之间的区别。 2. 问题介绍 我们可以使用 Stream.of() 方法初始化一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T17:40:28.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Stream.of()"}],["meta",{"property":"article:tag","content":"IntStream.range()"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T17:40:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 8 中 Stream.of() 与 IntStream.range() 的区别解析\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T17:40:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 8 中 Stream.of() 与 IntStream.range() 的区别解析 1. 概述 Java 8 中引入的 Stream API 是一项重大新特性。 在本教程中，我们将讨论一个有趣的话题：Stream.of() 和 IntStream.range() 之间的区别。 2. 问题介绍 我们可以使用 Stream.of() 方法初始化一..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. Streams 是懒加载的","slug":"_3-streams-是懒加载的","link":"#_3-streams-是懒加载的","children":[]},{"level":2,"title":"4. 调用 sorted() 可能会使 Stream 变为“急切”模式","slug":"_4-调用-sorted-可能会使-stream-变为-急切-模式","link":"#_4-调用-sorted-可能会使-stream-变为-急切-模式","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720546828000,"updatedTime":1720546828000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.66,"words":1099},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Understanding the Difference Between Stream.of   and IntStream.range  .md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>Java 8 中引入的 Stream API 是一项重大新特性。</p>\\n<p>在本教程中，我们将讨论一个有趣的话题：Stream.of() 和 IntStream.range() 之间的区别。</p>\\n<h2>2. 问题介绍</h2>\\n<p>我们可以使用 Stream.of() 方法初始化一个 Stream 对象，例如 Stream.of(1, 2, 3, 4, 5)。或者，如果我们想要初始化一个整数 Stream，IntStream 是一个更直接使用的类型，例如 IntStream.range(1, 6)。然而，通过这两种方法创建的整数 Stream 的行为可能会有所不同。</p>","autoDesc":true}');export{k as comp,m as data};
