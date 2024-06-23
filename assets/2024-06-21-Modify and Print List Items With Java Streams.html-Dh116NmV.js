import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-j3liftxp.js";const e={},p=t('<h1 id="使用java流修改和打印列表项" tabindex="-1"><a class="header-anchor" href="#使用java流修改和打印列表项"><span>使用Java流修改和打印列表项</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在使用Java时，操作列表是一项基本技能。</p><p>在这个快速教程中，我们将探索不同的方法来修改或转换列表，然后打印其元素。</p><h2 id="_2-修改和打印列表" tabindex="-1"><a class="header-anchor" href="#_2-修改和打印列表"><span>2. 修改和打印列表</span></a></h2><p>打印列表中的元素对我们来说不是挑战。例如，我们可以在<code>forEach()</code>方法中调用打印操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` theList <span class="token operator">=</span> <span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span><span class="token string">&quot;Kai&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Liam&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Eric&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Kevin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ntheList<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>element <span class="token operator">-&gt;</span> log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们使用SLF4J记录器在给定列表中输出元素。执行代码后，我们可以看到控制台中打印出了四个名字：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Kai\nLiam\nEric\nKevin\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们打算在打印之前修改列表中的元素，我们可以利用<code>List.replaceAll()</code>方法。</p><p>接下来，让我们将<code>theList</code>中的每个<code>String</code>元素转换为大写，并在测试方法中打印修改后的值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` theList <span class="token operator">=</span> <span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span><span class="token string">&quot;Kai&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Liam&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Eric&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Kevin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ntheList<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span>element <span class="token operator">-&gt;</span> element<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ntheList<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>element <span class="token operator">-&gt;</span> log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;KAI&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;LIAM&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ERIC&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;KEVIN&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> theList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，我们在<code>replaceAll()</code>方法中使用了一个lambda表达式来执行大小写转换。运行测试后，我们可以看到控制台中打印出了大写值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>KAI\nLIAM\nERIC\nKEVIN\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，<code>replaceAll()</code>方法要求列表对象是可变的列表，例如上述代码中使用的<code>ArrayList</code>。如果列表是不可变的，比如由<code>Collection.singletonList()</code>和<code>List.of()</code>返回的列表对象，该方法会抛出<code>UnsupportedOperationException</code>。</p><p>因此，在实际场景中，通常更倾向于将原始列表转换为一个新的列表，而不是直接修改它。接下来，让我们探索如何转换列表并有效地无缝输出其元素。</p><h2 id="_3-使用流api转换和打印列表" tabindex="-1"><a class="header-anchor" href="#_3-使用流api转换和打印列表"><span>3. 使用流API转换和打印列表</span></a></h2><p>Java 8中引入的流API极大地改变了我们处理对象集合的方式。流提供了一种声明性和函数式的方式来处理数据，提供了一种简洁而富有表现力的方式来对集合执行操作。</p><p>例如，我们可以将列表作为源，使用<code>map()</code>方法在流中转换元素，并使用<code>forEachOrdered()</code>这样打印元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>theList<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span> <span class="token comment">// 转换逻辑</span>\n  <span class="token punctuation">.</span><span class="token function">forEachOrdered</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span> <span class="token comment">// 打印元素</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码非常直接。然而，重要的是要注意<code>Stream.forEachOrdered()</code>是一个终端操作。这个终端操作本质上标志着流管道的结束。因此，流对象在调用这个方法后变得不可访问。这个限制意味着后续的流操作，比如收集转换后的元素，不再可行。</p><p>因此，我们希望通过不同的方法实现我们的目标，这样我们可以在流上继续执行操作。</p><p>一个简单的想法是在<code>map()</code>中包含打印方法调用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` theList <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Kai&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Liam&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Eric&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Kevin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` newList <span class="token operator">=</span> theList<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>element <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n      <span class="token class-name">String</span> newElement <span class="token operator">=</span> element<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>newElement<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token keyword">return</span> newElement<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;KAI&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;LIAM&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ERIC&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;KEVIN&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> newList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，打印流不会终止流管道，我们仍然可以在之后执行<code>Collector</code>操作。当然，转换后的元素会在控制台中打印出来：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>KAI\nLIAM\nERIC\nKEVIN\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，这种方法的一个缺点是它不必要地将无关的逻辑添加到<code>map()</code>方法中。接下来，让我们通过使用<code>peek()</code>方法来改进它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` theList <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Kai&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Liam&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Eric&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Kevin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` newList <span class="token operator">=</span> theList<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>element <span class="token operator">-&gt;</span> element<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">peek</span><span class="token punctuation">(</span>element <span class="token operator">-&gt;</span> log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;KAI&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;LIAM&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ERIC&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;KEVIN&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> newList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与<code>forEachOrdered()</code>不同，<code>peek()</code>是一个中间操作。它对流中的每个元素执行提供的操作并返回流。因此，我们可以在调用<code>peek()</code>之后向流管道添加进一步的操作，比如上述代码中的<code>collect()</code>。</p><p><code>peek()</code>方法接受一个<code>Consumer</code>实例作为参数。在我们的示例中，我们将一个lambda表达式作为<code>Consumer</code>传递给<code>peek()</code>。</p><p>当我们运行这个测试时，它通过了，并且预期的输出被打印到控制台：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>KAI\nLIAM\nERIC\nKEVIN\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们首先演示了如何使用<code>replaceAll()</code> + <code>forEach()</code>方法来修改和打印列表。然后，我们探索了如何使用流API来转换和打印流中的元素。</p><p>如常，示例的完整源代码可以在GitHub上找到。 OK</p>',35),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-21-Modify and Print List Items With Java Streams.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-21/2024-06-21-Modify%20and%20Print%20List%20Items%20With%20Java%20Streams.html","title":"使用Java流修改和打印列表项","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Java","编程"],"tag":["Java","流","列表","打印"],"head":[["meta",{"name":"keywords","content":"Java, 流, 列表, 修改, 打印"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-21/2024-06-21-Modify%20and%20Print%20List%20Items%20With%20Java%20Streams.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Java流修改和打印列表项"}],["meta",{"property":"og:description","content":"使用Java流修改和打印列表项 1. 概述 在使用Java时，操作列表是一项基本技能。 在这个快速教程中，我们将探索不同的方法来修改或转换列表，然后打印其元素。 2. 修改和打印列表 打印列表中的元素对我们来说不是挑战。例如，我们可以在forEach()方法中调用打印操作： 在上面的代码中，我们使用SLF4J记录器在给定列表中输出元素。执行代码后，我们..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T15:48:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"流"}],["meta",{"property":"article:tag","content":"列表"}],["meta",{"property":"article:tag","content":"打印"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T15:48:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Java流修改和打印列表项\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T15:48:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Java流修改和打印列表项 1. 概述 在使用Java时，操作列表是一项基本技能。 在这个快速教程中，我们将探索不同的方法来修改或转换列表，然后打印其元素。 2. 修改和打印列表 打印列表中的元素对我们来说不是挑战。例如，我们可以在forEach()方法中调用打印操作： 在上面的代码中，我们使用SLF4J记录器在给定列表中输出元素。执行代码后，我们..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 修改和打印列表","slug":"_2-修改和打印列表","link":"#_2-修改和打印列表","children":[]},{"level":2,"title":"3. 使用流API转换和打印列表","slug":"_3-使用流api转换和打印列表","link":"#_3-使用流api转换和打印列表","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718984936000,"updatedTime":1718984936000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.65,"words":1095},"filePathRelative":"posts/baeldung/2024-06-21/2024-06-21-Modify and Print List Items With Java Streams.md","localizedDate":"2024年6月21日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在使用Java时，操作列表是一项基本技能。</p>\\n<p>在这个快速教程中，我们将探索不同的方法来修改或转换列表，然后打印其元素。</p>\\n<h2>2. 修改和打印列表</h2>\\n<p>打印列表中的元素对我们来说不是挑战。例如，我们可以在<code>forEach()</code>方法中调用打印操作：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">List</span>``````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>`````` theList <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Lists</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">newArrayList</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Kai\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Liam\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Eric\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Kevin\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\ntheList<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">forEach</span><span class=\\"token punctuation\\">(</span>element <span class=\\"token operator\\">-&gt;</span> log<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">info</span><span class=\\"token punctuation\\">(</span>element<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
