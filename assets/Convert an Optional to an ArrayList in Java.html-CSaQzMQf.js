import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BtbBZiJO.js";const p={},e=t('<h1 id="java中将optional转换为arraylist的方法-baeldung" tabindex="-1"><a class="header-anchor" href="#java中将optional转换为arraylist的方法-baeldung"><span>Java中将Optional转换为ArrayList的方法 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Java 8引入了_Optional_类来表示一个可能存在或不存在的值。**它帮助我们避免_NullPointerException_并编写更富有表现力和可读的代码。**在想要将可选值作为列表处理的场景中，将_Optional_转换为_ArrayList_可能很有用。在本教程中，我们将探索在Java中将_Optional_转换为_ArrayList_的不同方法。</p><h2 id="_2-使用-ifpresent" tabindex="-1"><a class="header-anchor" href="#_2-使用-ifpresent"><span>2. 使用_ifPresent()_</span></a></h2><p>这种方法利用了_Optional_类提供的_ifPresent()_方法来处理值的存在或缺失。<strong>它允许我们仅在_Optional_包含值时执行一段代码，消除了显式空值检查的需要，提高了代码的可读性。</strong></p><p>让我们看一个使用_ifPresent()_方法的代码片段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Optional</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````` optionalValue <span class="token operator">=</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">List</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````` arrayList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\noptionalValue<span class="token punctuation">.</span><span class="token function">ifPresent</span><span class="token punctuation">(</span>arrayList<span class="token operator">::</span><span class="token function">add</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>arrayList<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们首先创建一个名为_optionalValue_的_Optional_对象，包含值“Hello, World!”。<strong>这个值被封装在_Optional_中，表示其潜在的缺失。<strong>随后，我们对_optionalValue_使用_ifPresent()_方法。</strong>_ifPresent()_方法接受一个lambda表达式或方法引用作为参数，如果_Optional_包含值，则执行它。</strong></p><p>在这种情况下，方法引用_arrayList::add_会在值存在时将其添加到_ArrayList_中。</p><h2 id="_3-使用-orelse-或-orelseget" tabindex="-1"><a class="header-anchor" href="#_3-使用-orelse-或-orelseget"><span>3. 使用_orElse()<em>或_orElseGet()</em></span></a></h2><p>这种方法利用了_Optional_类提供的_orElse()_方法。它允许我们指定一个默认值，如果_Optional_为空则使用。<strong>这在我们有备选值或行为想要应用在_Optional_不包含值时特别有用。</strong></p><p>在这种情况下，我们正在创建一个空的_Optional_，所以当调用_orElse()_方法时，它将返回默认值“Hello World”：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Optional</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````` emptyOptional <span class="token operator">=</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">List</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````` arrayList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\narrayList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>emptyOptional<span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>arrayList<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在示例中，我们使用_empty()<em>方法创建了一个名为_emptyOptional_的空_Optional</em>。由于_emptyOptional_为空，调用_orElse()_将返回指定的默认值“Hello World”。然后，我们将这个默认值添加到_ArrayList_中。</p><p>请注意，当使用_orElse()_时，提供的默认值会被急切地评估。**这意味着无论_Optional_是否需要它，都会计算它。**即使_Optional_包含非空值，默认值仍然被创建，**而提供给_orElseGet()_的默认值是惰性评估的。**只有当_Optional_为空时才会调用它。</p><p>此外，对于性能关键的场景，通常更倾向于使用_orElseGet()_，因为它避免了在_Optional_已经包含值时进行不必要的计算：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Optional</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````` emptyOptional <span class="token operator">=</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">List</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````` arrayList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\narrayList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>emptyOptional<span class="token punctuation">.</span><span class="token function">orElseGet</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token string">&quot;Hello, World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>arrayList<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用java-streams" tabindex="-1"><a class="header-anchor" href="#_4-使用java-streams"><span>4. 使用Java Streams</span></a></h2><p>Java中的Stream表示可以被一系列操作处理的元素序列。我们可以利用Streams API条件性地创建_ArrayList_。</p><h3 id="_4-1-实现" tabindex="-1"><a class="header-anchor" href="#_4-1-实现"><span>4.1. 实现</span></a></h3><p>让我们看一个使用Java Streams将_Optional_对象转换为_ArrayList_的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Optional</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````` optionalValue <span class="token operator">=</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">List</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````` arrayList <span class="token operator">=</span> optionalValue\n  <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>arrayList<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们创建一个名为_optionalValue_的_Optional_对象，其值为“Hello, World!”。接下来，我们使用Java <em>Stream_将_Optional_转换为_ArrayList</em>。**我们调用_optionalValue_上的_stream()_方法以获得其元素的流。**然后，我们使用_collect()_方法和_Collectors.toList()<em>将流中的元素收集到一个_List_中，有效地将_Optional_转换为_ArrayList</em>。</p><p>如果_Optional_为空，即不包含值，那么结果的_ArrayList_也将是空的。<strong>在Java Streams中，如果流源为空，终端操作—本例中的_collect()_—将简单地返回一个空集合。</strong></p><h3 id="_4-2-流过滤" tabindex="-1"><a class="header-anchor" href="#_4-2-流过滤"><span>4.2. 流过滤</span></a></h3><p>**使用Java Stream API的一个优点是它允许我们有条件地处理元素并执行各种转换。**想象一下，我们只想在满足某些条件时将值添加到_ArrayList_中。Streams允许我们在收集元素到列表之前加入_filter()_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Optional</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````` optionalValue <span class="token operator">=</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">List</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````` arrayList <span class="token operator">=</span> optionalValue\n  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>e <span class="token operator">-&gt;</span> e<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">&quot;H&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>arrayList<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用_filter()<em>过滤包含_字符串_列表的_Optional</em>。这个方法只保留以字母“H”开头的元素。然后我们使用_collect(Collectors.toList())_方法将结果过滤后的元素收集到一个_ArrayList_中。</p><h3 id="_4-3-流展平" tabindex="-1"><a class="header-anchor" href="#_4-3-流展平"><span>4.3. 流展平</span></a></h3><p>**Java Streams在处理嵌套列表时提供了一个额外的优势。**考虑一个场景，一个_Optional_包含另一个_Optional_，后者又持有一个列表。我们可以使用Java Streams来展平嵌套的列表。</p><p>让我们写一个示例，演示如何在_Optional_中展平嵌套的列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Optional</span><span class="token operator">&lt;</span><span class="token class-name">List</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````````<span class="token operator">&gt;</span> optionalList <span class="token operator">=</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;Apple&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Banana&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Cherry&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">List</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````` arrayList <span class="token operator">=</span> optionalList\n  <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token operator">::</span><span class="token function">stream</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> arrayList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>arrayList<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;Apple&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们对_Optional&lt;List<code>&lt;String&gt;</code>&gt;<em>调用_stream()<em>将其转换为流。接下来，我们使用_flatMap(List::stream)</em>。这将_List::stream_方法引用应用于流中的每个元素。**通过应用_flatMap()</em>，我们实际上是在“展平”嵌套结构。**现在我们不是拥有一个包含列表的单一流，而是拥有一个包含内部列表中各个元素的流。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了将_Optional_转换为_ArrayList_的各种方法。如果我们需要根据_Optional_值的存在来执行特定操作，我们可以使用_isPresent()_方法。当我们有一个默认值要在_Optional_为空时使用时，我们可以使用_orElse()<em>或_orElseGet()</em>。<strong>最后，Java Streams是进行简洁转换的好选择，特别是如果我们需要在转换为列表之前进行过滤。</strong></p><p>如常，示例的源代码可在GitHub上找到。</p><p>文章发布后30天内开放评论。对于超过此日期的任何问题，请使用网站上的联系表单。翻译已结束。</p><p>OK</p>',38),o=[e];function l(c,i){return s(),a("div",null,o)}const k=n(p,[["render",l],["__file","Convert an Optional to an ArrayList in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Convert%20an%20Optional%20to%20an%20ArrayList%20in%20Java.html","title":"Java中将Optional转换为ArrayList的方法 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-16T00:00:00.000Z","category":["Java"],"tag":["Optional","ArrayList","Java 8","转换"],"description":"Java中将Optional转换为ArrayList的方法 | Baeldung 1. 引言 Java 8引入了_Optional_类来表示一个可能存在或不存在的值。**它帮助我们避免_NullPointerException_并编写更富有表现力和可读的代码。**在想要将可选值作为列表处理的场景中，将_Optional_转换为_ArrayList_可能...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Convert%20an%20Optional%20to%20an%20ArrayList%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将Optional转换为ArrayList的方法 | Baeldung"}],["meta",{"property":"og:description","content":"Java中将Optional转换为ArrayList的方法 | Baeldung 1. 引言 Java 8引入了_Optional_类来表示一个可能存在或不存在的值。**它帮助我们避免_NullPointerException_并编写更富有表现力和可读的代码。**在想要将可选值作为列表处理的场景中，将_Optional_转换为_ArrayList_可能..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Optional"}],["meta",{"property":"article:tag","content":"ArrayList"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:tag","content":"转换"}],["meta",{"property":"article:published_time","content":"2024-06-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将Optional转换为ArrayList的方法 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用_ifPresent()_","slug":"_2-使用-ifpresent","link":"#_2-使用-ifpresent","children":[]},{"level":2,"title":"3. 使用_orElse()或_orElseGet()","slug":"_3-使用-orelse-或-orelseget","link":"#_3-使用-orelse-或-orelseget","children":[]},{"level":2,"title":"4. 使用Java Streams","slug":"_4-使用java-streams","link":"#_4-使用java-streams","children":[{"level":3,"title":"4.1. 实现","slug":"_4-1-实现","link":"#_4-1-实现","children":[]},{"level":3,"title":"4.2. 流过滤","slug":"_4-2-流过滤","link":"#_4-2-流过滤","children":[]},{"level":3,"title":"4.3. 流展平","slug":"_4-3-流展平","link":"#_4-3-流展平","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.79,"words":1437},"filePathRelative":"posts/baeldung/Archive/Convert an Optional to an ArrayList in Java.md","localizedDate":"2024年6月16日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>Java 8引入了_Optional_类来表示一个可能存在或不存在的值。**它帮助我们避免_NullPointerException_并编写更富有表现力和可读的代码。**在想要将可选值作为列表处理的场景中，将_Optional_转换为_ArrayList_可能很有用。在本教程中，我们将探索在Java中将_Optional_转换为_ArrayList_的不同方法。</p>\\n<h2>2. 使用_ifPresent()_</h2>\\n<p>这种方法利用了_Optional_类提供的_ifPresent()_方法来处理值的存在或缺失。<strong>它允许我们仅在_Optional_包含值时执行一段代码，消除了显式空值检查的需要，提高了代码的可读性。</strong></p>","autoDesc":true}');export{k as comp,d as data};
