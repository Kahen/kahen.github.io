import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-Cm-NmyMl.js";const e={},p=t('<h1 id="java-8-空列表上的-stream-操作-baeldung" tabindex="-1"><a class="header-anchor" href="#java-8-空列表上的-stream-操作-baeldung"><span>Java 8 空列表上的 Stream 操作 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Java 8 通过引入 Stream API，改变了我们处理集合和数据操作的方式，带来了范式的转变。Stream API 提供了一种简洁而富有表现力的方式来对数据执行操作，使开发者能够编写更易读、更健壮、更高效的代码。</p><p>在本教程中，我们将深入探讨 Stream 操作的有趣世界，重点关注空列表。虽然使用空列表工作可能看起来微不足道，但它揭示了 Stream API 的一些强大方面。</p><h2 id="_2-将空列表转换为-stream" tabindex="-1"><a class="header-anchor" href="#_2-将空列表转换为-stream"><span>2. 将空列表转换为 Stream</span></a></h2><p>我们可以很容易地使用 stream() 方法从空列表中获得 Stream：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` emptyList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Stream</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` emptyStream <span class="token operator">=</span> emptyList<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这使我们能够像对非空列表一样对空列表执行各种 Stream 操作。然而，<strong>我们必须注意，由于 Stream 的来源是空的，操作的结果可能是空的。</strong> 此外，探索在 Java 中使用空 Stream 可能更有趣。</p><h2 id="_3-空-stream-在处理-nullpointerexception-中的重要性" tabindex="-1"><a class="header-anchor" href="#_3-空-stream-在处理-nullpointerexception-中的重要性"><span>3. 空 Stream 在处理 NullPointerException 中的重要性</span></a></h2><p>使用空列表的 Stream 的一个显著优点是防止 NullPointerException。让我们考虑以下示例，其中 getList() 方法可能返回 null：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` nameList <span class="token operator">=</span> <span class="token function">getList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 假设 getList() 可能返回 null</span>\n\n<span class="token comment">// 非 Stream 方法</span>\n<span class="token keyword">if</span> <span class="token punctuation">(</span>nameList <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> str <span class="token operator">:</span> nameList<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Length of &quot;</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token string">&quot;: &quot;</span> <span class="token operator">+</span> name<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，非 Stream 方法中，我们必须在迭代列表之前检查 null，以避免 NullPointerException。</p><p>另一方面，<strong>使用 Optional 和 Stream，我们可以执行一系列操作，而无需特别处理 null 检查，也避免了 NullPointerException</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// 使用 Stream</span>\n<span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span>nameList<span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">ifPresent</span><span class="token punctuation">(</span>list <span class="token operator">-&gt;</span> list<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>name <span class="token operator">-&gt;</span> <span class="token string">&quot;Length of &quot;</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token string">&quot;: &quot;</span> <span class="token operator">+</span> name<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token operator">::</span><span class="token function">println</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用 Optional.ofNullable() 包装 nameList，如果 nameList 是 null，则防止 NullPointerException。然后我们使用 ifPresent() 方法仅在列表不是 null 时执行 Stream 操作。</p><p><strong>这确保了仅当列表非 null 时才应用 Stream 操作，防止任何潜在的 NullPointerException。</strong> 此外，<strong>代码更简洁，对空 Stream 的操作不会导致任何异常或错误。</strong></p><p>然而，如果 getList() 方法返回一个空列表而不是 null，那么使用空 Stream，map() 操作将没有东西可以操作。因此，它将产生一个新的空 Stream，留下 nothing 来在 forEach() 调用中打印。</p><p>总之，传统和 Stream 方法都旨在打印列表中名称的长度。<strong>然而，Stream 方法利用 Optional 和 Stream 操作，提供了一种更功能化和简洁的方式来处理潜在的 null 值和空列表。</strong> 这导致代码更安全、更有表现力。</p><h2 id="_4-将空列表的-stream-收集到另一个列表中" tabindex="-1"><a class="header-anchor" href="#_4-将空列表的-stream-收集到另一个列表中"><span>4. 将空列表的 Stream 收集到另一个列表中</span></a></h2><p>Stream 提供了一种清晰的方式来执行操作和收集结果。即使使用空列表，我们也可以有效地使用 Stream 操作和收集器。以下是一个通过 Stream 将元素从空列表收集到另一个列表的简单示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` emptyList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` collectedList <span class="token operator">=</span> emptyList<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>collectedList<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出: []</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，collect() 是一个终端操作，它对 Stream 的元素执行可变归约。</p><p>类似地，执行像 filter() 这样的中间操作，并将结果收集到任何集合中，将得到一个空的 Stream：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` emptyList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` collectedList <span class="token operator">=</span> emptyList<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> s<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这表明即使在空列表上，Stream 操作也可以无缝集成到收集结果中，没有任何问题。</strong></p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>总之，Java 8 在空列表上的 Stream 操作展示了 Stream API 的优雅和健壮性。轻松地将空列表转换为 Stream，更优雅地处理潜在的 NullPointerException，以及无缝执行如收集到另一个列表等操作，使 Stream 成为开发者的强大工具。</p><p>通过理解和利用这些特性，开发者可以编写更简洁、更有表现力的代码，充分利用 Stream API，即使是在处理空列表时也是如此。</p><p>如常，文章附带的源代码可在 GitHub 上找到。</p><p>OK</p>',30),o=[p];function c(l,i){return s(),a("div",null,o)}const m=n(e,[["render",c],["__file","2024-06-24-Java 8 Stream Operation on the Empty List.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-Java%208%20Stream%20Operation%20on%20the%20Empty%20List.html","title":"Java 8 空列表上的 Stream 操作 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-25T00:00:00.000Z","category":["Java","Stream API"],"tag":["Java 8","Stream操作"],"head":[["meta",{"name":"keywords","content":"Java 8, Stream API, 空列表, 数据流操作"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-Java%208%20Stream%20Operation%20on%20the%20Empty%20List.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 8 空列表上的 Stream 操作 | Baeldung"}],["meta",{"property":"og:description","content":"Java 8 空列表上的 Stream 操作 | Baeldung 1. 引言 Java 8 通过引入 Stream API，改变了我们处理集合和数据操作的方式，带来了范式的转变。Stream API 提供了一种简洁而富有表现力的方式来对数据执行操作，使开发者能够编写更易读、更健壮、更高效的代码。 在本教程中，我们将深入探讨 Stream 操作的有趣世..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T16:51:00.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:tag","content":"Stream操作"}],["meta",{"property":"article:published_time","content":"2024-06-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-24T16:51:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 8 空列表上的 Stream 操作 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-25T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-24T16:51:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 8 空列表上的 Stream 操作 | Baeldung 1. 引言 Java 8 通过引入 Stream API，改变了我们处理集合和数据操作的方式，带来了范式的转变。Stream API 提供了一种简洁而富有表现力的方式来对数据执行操作，使开发者能够编写更易读、更健壮、更高效的代码。 在本教程中，我们将深入探讨 Stream 操作的有趣世..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 将空列表转换为 Stream","slug":"_2-将空列表转换为-stream","link":"#_2-将空列表转换为-stream","children":[]},{"level":2,"title":"3. 空 Stream 在处理 NullPointerException 中的重要性","slug":"_3-空-stream-在处理-nullpointerexception-中的重要性","link":"#_3-空-stream-在处理-nullpointerexception-中的重要性","children":[]},{"level":2,"title":"4. 将空列表的 Stream 收集到另一个列表中","slug":"_4-将空列表的-stream-收集到另一个列表中","link":"#_4-将空列表的-stream-收集到另一个列表中","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719247860000,"updatedTime":1719247860000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.43,"words":1030},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-Java 8 Stream Operation on the Empty List.md","localizedDate":"2024年6月25日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>Java 8 通过引入 Stream API，改变了我们处理集合和数据操作的方式，带来了范式的转变。Stream API 提供了一种简洁而富有表现力的方式来对数据执行操作，使开发者能够编写更易读、更健壮、更高效的代码。</p>\\n<p>在本教程中，我们将深入探讨 Stream 操作的有趣世界，重点关注空列表。虽然使用空列表工作可能看起来微不足道，但它揭示了 Stream API 的一些强大方面。</p>\\n<h2>2. 将空列表转换为 Stream</h2>\\n<p>我们可以很容易地使用 stream() 方法从空列表中获得 Stream：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">List</span>```````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>``````` emptyList <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ArrayList</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token class-name\\">Stream</span>```````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>``````` emptyStream <span class=\\"token operator\\">=</span> emptyList<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">stream</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{m as comp,k as data};
