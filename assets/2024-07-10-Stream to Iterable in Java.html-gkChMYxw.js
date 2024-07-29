import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-BUAgDejY.js";const e={},p=t('<h1 id="java-stream转换为iterable" tabindex="-1"><a class="header-anchor" href="#java-stream转换为iterable"><span>Java Stream转换为Iterable</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Java Streams API是在Java 8中引入的，它为处理元素序列提供了功能。Streams API支持在流水线上对一个对象集合进行操作链式调用，以产生所需的结果。</p><p>在本教程中，我们将探讨将Stream用作Iterable的不同方式。</p><h2 id="_2-iterable和iterator" tabindex="-1"><a class="header-anchor" href="#_2-iterable和iterator"><span>2. Iterable和Iterator</span></a></h2><p>自Java 1.5以来，Iterable<code>&lt;T&gt;</code>接口就已可用。实现此接口的类允许类的实例成为for-each循环语句的目标。实现类不存储任何关于其迭代状态的信息，并且应该产生其自身的有效Iterator。</p><p><strong>Collection接口扩展了Iterable接口，所有具体的Collection实现，如ArrayList或HashSet，通过实现Iterable的iterator()方法来产生迭代器。</strong></p><p>自Java 1.2以来，Iterator<code>&lt;T&gt;</code>接口也是Java Collections框架的一部分。实现Iterator<code>&lt;T&gt;</code>的类必须提供遍历集合的实现，例如移动到下一个元素、检查是否还有更多元素或从集合中删除当前元素的能力：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Iterator</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span>` <span class="token punctuation">{</span>\n    <span class="token keyword">boolean</span> <span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">E</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">void</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-问题陈述" tabindex="-1"><a class="header-anchor" href="#_3-问题陈述"><span>3. 问题陈述</span></a></h2><p>现在我们已经了解了Iterator和Iterable接口的基础知识以及它们的作用，让我们理解问题陈述。</p><p>实现Collection接口的类本质上实现了Iterable<code>&lt;T&gt;</code>接口。另一方面，Streams略有不同。值得注意的是，<strong>BaseStream<code>&lt;T&gt;</code>，Stream<code>&lt;T&gt;</code>扩展的接口，有一个iterator()方法，但没有实现Iterable接口。</strong></p><p>有了这个限制，就带来了不能在Stream上使用增强的for-each循环的挑战。</p><p>我们将在以下部分探讨一些克服这个问题的方法，并最终触及为什么Stream与Collection不同，没有扩展Iterable接口的想法。</p><h2 id="_4-使用stream的iterator-转换stream为iterable" tabindex="-1"><a class="header-anchor" href="#_4-使用stream的iterator-转换stream为iterable"><span>4. 使用Stream的iterator()转换Stream为Iterable</span></a></h2><p>Stream接口的iterator()方法返回流元素的迭代器。它是一个终端流操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Iterator</span>``````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>`````````` <span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，我们仍然不能在增强的for-each循环中使用生成的迭代器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">streamIterator</span><span class="token punctuation">(</span><span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` listOfStrings<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Stream</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` stringStream <span class="token operator">=</span> listOfStrings<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">// 这不能编译</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> eachString <span class="token operator">:</span> stringStream<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">doSomethingOnString</span><span class="token punctuation">(</span>eachString<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们之前看到的，“for-each循环”适用于Iterable而不是Iterator。为了解决这个问题，我们将迭代器强制转换为Iterable实例，然后应用我们所需的for-each循环。<strong>Iterable<code>&lt;T&gt;</code>是一个函数式接口，这使我们能够使用lambda编写代码：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> eachString <span class="token operator">:</span> <span class="token punctuation">(</span><span class="token class-name">Iterable</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> stringStream<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">doSomethingOnString</span><span class="token punctuation">(</span>eachString<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们可以使用方法引用方法进行一些重构：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> eachString <span class="token operator">:</span> <span class="token punctuation">(</span><span class="token class-name">Iterable</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````<span class="token punctuation">)</span> stringStream<span class="token operator">::</span><span class="token function">iterator</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">doSomethingOnString</span><span class="token punctuation">(</span>eachString<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以使用一个临时变量iterableStream来保存Iterable，然后将其用于for-each循环：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Iterable</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` iterableStream <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> stringStream<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> eachString <span class="token operator">:</span> iterableStream<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">doSomethingOnString</span><span class="token punctuation">(</span>eachString<span class="token punctuation">,</span> sentence<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-通过转换为collection在for-each循环中使用stream" tabindex="-1"><a class="header-anchor" href="#_5-通过转换为collection在for-each循环中使用stream"><span>5. 通过转换为Collection在for-each循环中使用Stream</span></a></h2><p>我们上面讨论了Collection接口如何扩展Iterable接口。因此，我们可以将给定的Stream转换为集合，并使用结果作为Iterable：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">String</span> eachString <span class="token operator">:</span> stringStream<span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">doSomethingOnString</span><span class="token punctuation">(</span>eachString<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-stream为什么不实现iterable" tabindex="-1"><a class="header-anchor" href="#_6-stream为什么不实现iterable"><span>6. Stream为什么不实现Iterable</span></a></h2><p>我们看到如何将Stream用作Iterable。像List和Set这样的集合是存储数据的数据结构，并且打算在它们的生命周期内多次使用。这些对象被传递到不同的方法中，多次更改，最重要的是，它们被多次迭代。</p><p><strong>另一方面，Streams是一次性数据结构，因此不打算使用for-each循环进行迭代。</strong> Streams根本不预期被反复迭代，并且在流已经关闭并操作时抛出IllegalStateException。因此，尽管Stream提供了iterator()方法，但它没有扩展Iterable。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们探讨了将Stream用作Iterable的不同方式。</p><p>我们简要讨论了Iterable和Iterator之间的区别，以及为什么Stream<code>&lt;T&gt;</code>没有实现Iterable<code>&lt;T&gt;</code>接口。</p><p>像往常一样，所有代码示例都可以在GitHub上找到。</p>',35),o=[p];function c(l,r){return s(),n("div",null,o)}const d=a(e,[["render",c],["__file","2024-07-10-Stream to Iterable in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Stream%20to%20Iterable%20in%20Java.html","title":"Java Stream转换为Iterable","lang":"zh-CN","frontmatter":{"date":"2023-04-06T00:00:00.000Z","category":["Java","Programming"],"tag":["Java 8","Streams","Iterable"],"head":[["meta",{"name":"keywords","content":"Java, Stream, Iterable, for-each loop, Collection"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Stream%20to%20Iterable%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java Stream转换为Iterable"}],["meta",{"property":"og:description","content":"Java Stream转换为Iterable 1. 引言 Java Streams API是在Java 8中引入的，它为处理元素序列提供了功能。Streams API支持在流水线上对一个对象集合进行操作链式调用，以产生所需的结果。 在本教程中，我们将探讨将Stream用作Iterable的不同方式。 2. Iterable和Iterator 自Java..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T01:52:30.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:tag","content":"Streams"}],["meta",{"property":"article:tag","content":"Iterable"}],["meta",{"property":"article:published_time","content":"2023-04-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T01:52:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java Stream转换为Iterable\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-04-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T01:52:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java Stream转换为Iterable 1. 引言 Java Streams API是在Java 8中引入的，它为处理元素序列提供了功能。Streams API支持在流水线上对一个对象集合进行操作链式调用，以产生所需的结果。 在本教程中，我们将探讨将Stream用作Iterable的不同方式。 2. Iterable和Iterator 自Java..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. Iterable和Iterator","slug":"_2-iterable和iterator","link":"#_2-iterable和iterator","children":[]},{"level":2,"title":"3. 问题陈述","slug":"_3-问题陈述","link":"#_3-问题陈述","children":[]},{"level":2,"title":"4. 使用Stream的iterator()转换Stream为Iterable","slug":"_4-使用stream的iterator-转换stream为iterable","link":"#_4-使用stream的iterator-转换stream为iterable","children":[]},{"level":2,"title":"5. 通过转换为Collection在for-each循环中使用Stream","slug":"_5-通过转换为collection在for-each循环中使用stream","link":"#_5-通过转换为collection在for-each循环中使用stream","children":[]},{"level":2,"title":"6. Stream为什么不实现Iterable","slug":"_6-stream为什么不实现iterable","link":"#_6-stream为什么不实现iterable","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720576350000,"updatedTime":1720576350000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.33,"words":1000},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Stream to Iterable in Java.md","localizedDate":"2023年4月6日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>Java Streams API是在Java 8中引入的，它为处理元素序列提供了功能。Streams API支持在流水线上对一个对象集合进行操作链式调用，以产生所需的结果。</p>\\n<p>在本教程中，我们将探讨将Stream用作Iterable的不同方式。</p>\\n<h2>2. Iterable和Iterator</h2>\\n<p>自Java 1.5以来，Iterable<code>&lt;T&gt;</code>接口就已可用。实现此接口的类允许类的实例成为for-each循环语句的目标。实现类不存储任何关于其迭代状态的信息，并且应该产生其自身的有效Iterator。</p>","autoDesc":true}');export{d as comp,m as data};
