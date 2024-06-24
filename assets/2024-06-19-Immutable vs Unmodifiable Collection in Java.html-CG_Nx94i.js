import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-DTROHq0C.js";const e={},p=t('<h1 id="java中的不可变与不可修改集合" tabindex="-1"><a class="header-anchor" href="#java中的不可变与不可修改集合"><span>Java中的不可变与不可修改集合</span></a></h1><p>在本教程中，我们将探讨Java中除了常见的_Collection_类之外的两种集合类型。众所周知，我们有三个核心集合类：<em>Map</em>、<em>List_和_Set</em>。它们有对应的<strong>不可修改</strong>和<strong>不可变版本</strong>。</p><p>在我们的示例中，我们涵盖了Java中的_Map_系列集合。_Collections.unmodifiableMap()<em>和_Map.of()<em>方法适用于_Map</em>，而_Collections.unmodifiableList()</em>、<em>Collections.unmodifiableSet()</em>、_List.of()_和_Set.of()_是_List_和_Set_集合类的相应实用方法。相同的概念也适用于_List_和_Set_集合类。</p><h3 id="不可修改集合" tabindex="-1"><a class="header-anchor" href="#不可修改集合"><span>不可修改集合</span></a></h3><p>不可修改集合是一个可变集合的包装器，它通过包装器引用阻止修改。我们可以通过使用实用方法来获得不可修改的引用，例如Java_Map_集合中的_unmodifiableMap()_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` modifiableMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmodifiableMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;name1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Michael&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmodifiableMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;name2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Harry&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，_modifiableMap_是对映射集合的引用。我们在映射中放入了两对键值对。接下来，我们使用_Collections.unmodifiableMap()<em>实用方法获得_unmodifiableMap</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` unmodifiableMap <span class="token operator">=</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">unmodifiableMap</span><span class="token punctuation">(</span>modifiableMap<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们获得了对底层集合的新引用_unmodifiableMap_。这个不可修改的引用特别之处在于我们不能用它来添加或删除映射中的条目。但这并不影响底层集合或其他引用变量_modifiableMap_。我们仍然可以使用初始_modifiableMap_引用向集合中添加更多的键值对：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>modifiableMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;name3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Micky&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>集合的更改也会通过新引用变量_unmodifiableMap_反映出来：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span>modifiableMap<span class="token punctuation">,</span> unmodifiableMap<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>unmodifiableMap<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span><span class="token string">&quot;name3&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们尝试使用_unmodifiableMap_引用变量放入一个条目。预计操作将被禁止，并将抛出异常：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">UnsupportedOperationException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> unmodifiableMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;name3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Micky&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>两个引用_modifiableMap_和_unModifiableMap_指向内存中的同一个映射，但它们的行为不同。一个可以自由地操作映射，而另一个不能执行任何通过添加或删除项目来修改集合的操作。</p><h3 id="不可变集合" tabindex="-1"><a class="header-anchor" href="#不可变集合"><span>不可变集合</span></a></h3><p><strong>不可变集合在其生命周期内保持不可变，没有任何可修改的引用指向它们</strong>。不可变集合解决了我们能够使用其他引用修改不可修改集合的问题。要在Java中创建_Immutable_集合，我们有实用方法_Map.of()<em>或_List.of()</em>。我们创建的任何新引用也将始终是不可变的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenImmutableMap_WhenPutNewEntry_ThenThrowsUnsupportedOperationException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Map</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` immutableMap <span class="token operator">=</span> <span class="token class-name">Map</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;name1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Michael&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;name2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Harry&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">UnsupportedOperationException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> immutableMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;name3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Micky&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们尝试向_immutableMap_放入一个条目时，我们会立即遇到_UnsupportedOperationException_异常。_Map.copyOf()_返回的引用指向底层映射，该映射也是不可变的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenImmutableMap_WhenUsecopyOf_ThenExceptionOnPut</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Map</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` immutableMap <span class="token operator">=</span> <span class="token class-name">Map</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;name1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Michael&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;name2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Harry&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Map</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` copyOfImmutableMap <span class="token operator">=</span> <span class="token class-name">Map</span><span class="token punctuation">.</span><span class="token function">copyOf</span><span class="token punctuation">(</span>immutableMap<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">UnsupportedOperationException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> copyOfImmutableMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;name3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Micky&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，如果我们想确保没有任何其他引用可以修改我们的集合，我们必须在Java中使用_Immutable_集合。</p><h3 id="不可变和不可修改集合的考虑" tabindex="-1"><a class="header-anchor" href="#不可变和不可修改集合的考虑"><span>不可变和不可修改集合的考虑</span></a></h3><h4 id="_4-1-线程安全" tabindex="-1"><a class="header-anchor" href="#_4-1-线程安全"><span>4.1. 线程安全</span></a></h4><p>不可变类原则上是线程安全的，因为多个线程可以同时访问它们而不必担心更改底层集合。使用不可变集合可以防止多个线程覆盖状态，从而实现线程安全的设计。线程安全意味着在使用并发环境中不需要显式的同步。这也简化了并发编程，消除了对任何锁等的需求。</p><h4 id="_4-2-性能" tabindex="-1"><a class="header-anchor" href="#_4-2-性能"><span>4.2. 性能</span></a></h4><p>不可修改或不可变集合的性能与相应的可变集合相比较差。要更新，我们不能进行就地更新。相反，我们必须创建对象的新副本。这增加了开销，导致性能不佳。此外，由于创建了新实例，它们可能比可变对应物具有更高的内存使用率。然而，在频繁读取和不频繁写入的场景中，不可变集合表现出色。</p><h4 id="_4-3-可变对象" tabindex="-1"><a class="header-anchor" href="#_4-3-可变对象"><span>4.3. 可变对象</span></a></h4><p>我们必须确保添加到不可变集合中的可变对象被防御性复制，以防止外部修改。在多线程环境中，将需要集合及其包含的可变对象的线程安全性。</p><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>在本文中，我们仔细检查了_Map_、_List_和_Set_等集合类的_Immutable_和_Unmodifiable_版本。当我们需要通过特定引用保持集合不变但仍然希望原始集合是可变的时，不可修改集合是合适的。另一方面，当我们想要确保无论如何都不修改集合时，不可变集合是理想的选择。我们还讨论了一些常见的用例。如常，本文的源代码可以在GitHub上找到。</p><p>评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。翻译已经完成，以下是翻译的剩余部分：</p><h3 id="不可变和不可修改集合的考虑-1" tabindex="-1"><a class="header-anchor" href="#不可变和不可修改集合的考虑-1"><span>不可变和不可修改集合的考虑</span></a></h3><h4 id="_4-1-线程安全-1" tabindex="-1"><a class="header-anchor" href="#_4-1-线程安全-1"><span>4.1. 线程安全</span></a></h4><p>不可变类从原则上来说是线程安全的，因为多个线程可以同时访问它们而不用担心底层集合被修改。使用不可变集合可以防止多个线程覆盖状态，实现线程安全的设计。线程安全意味着在并发环境中使用时不需要显式的同步。这也简化了并发编程，消除了对锁等的需求。</p><h4 id="_4-2-性能-1" tabindex="-1"><a class="header-anchor" href="#_4-2-性能-1"><span>4.2. 性能</span></a></h4><p>与相应的可变集合相比，不可修改不可变集合的性能较差。要更新时，我们不能进行就地更新。相反，我们必须创建对象的新副本。这增加了开销，导致性能不佳。此外，由于创建了新实例，它们可能比可变对应物具有更高的内存使用率。然而，在频繁读取和不频繁写入的场景中，不可变集合表现出色。</p><h4 id="_4-3-可变对象-1" tabindex="-1"><a class="header-anchor" href="#_4-3-可变对象-1"><span>4.3. 可变对象</span></a></h4><p>我们必须确保添加到不可变集合中的可变对象被防御性复制，以防止外部修改。在多线程环境中，需要集合及其包含的可变对象都是线程安全的。</p><h3 id="结论-1" tabindex="-1"><a class="header-anchor" href="#结论-1"><span>结论</span></a></h3><p>在本文中，我们详细检查了Map、List和Set等集合类的不可变和不可修改版本。不可修改集合适用于我们需要通过特定引用保持集合不变，但仍然希望原始集合是可变的情况。另一方面，不可变集合是在我们想要确保无论如何都不修改集合时的理想选择。我们还讨论了一些常见用例。如常，本文的源代码可以在GitHub上找到。</p><p>评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。</p><p>OK</p>',42),o=[p];function c(i,l){return s(),n("div",null,o)}const d=a(e,[["render",c],["__file","2024-06-19-Immutable vs Unmodifiable Collection in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-19-Immutable%20vs%20Unmodifiable%20Collection%20in%20Java.html","title":"Java中的不可变与不可修改集合","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Java","Collections"],"tag":["Immutable","Unmodifiable"],"head":[["meta",{"name":"keywords","content":"Java, Collections, Immutable, Unmodifiable"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-19-Immutable%20vs%20Unmodifiable%20Collection%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的不可变与不可修改集合"}],["meta",{"property":"og:description","content":"Java中的不可变与不可修改集合 在本教程中，我们将探讨Java中除了常见的_Collection_类之外的两种集合类型。众所周知，我们有三个核心集合类：Map、List_和_Set。它们有对应的不可修改和不可变版本。 在我们的示例中，我们涵盖了Java中的_Map_系列集合。_Collections.unmodifiableMap()和_Map.of..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Immutable"}],["meta",{"property":"article:tag","content":"Unmodifiable"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的不可变与不可修改集合\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的不可变与不可修改集合 在本教程中，我们将探讨Java中除了常见的_Collection_类之外的两种集合类型。众所周知，我们有三个核心集合类：Map、List_和_Set。它们有对应的不可修改和不可变版本。 在我们的示例中，我们涵盖了Java中的_Map_系列集合。_Collections.unmodifiableMap()和_Map.of..."},"headers":[{"level":3,"title":"不可修改集合","slug":"不可修改集合","link":"#不可修改集合","children":[]},{"level":3,"title":"不可变集合","slug":"不可变集合","link":"#不可变集合","children":[]},{"level":3,"title":"不可变和不可修改集合的考虑","slug":"不可变和不可修改集合的考虑","link":"#不可变和不可修改集合的考虑","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]},{"level":3,"title":"不可变和不可修改集合的考虑","slug":"不可变和不可修改集合的考虑-1","link":"#不可变和不可修改集合的考虑-1","children":[]},{"level":3,"title":"结论","slug":"结论-1","link":"#结论-1","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":5.78,"words":1735},"filePathRelative":"posts/baeldung/Archive/2024-06-19-Immutable vs Unmodifiable Collection in Java.md","localizedDate":"2024年6月20日","excerpt":"\\n<p>在本教程中，我们将探讨Java中除了常见的_Collection_类之外的两种集合类型。众所周知，我们有三个核心集合类：<em>Map</em>、<em>List_和_Set</em>。它们有对应的<strong>不可修改</strong>和<strong>不可变版本</strong>。</p>\\n<p>在我们的示例中，我们涵盖了Java中的_Map_系列集合。_Collections.unmodifiableMap()<em>和_Map.of()<em>方法适用于_Map</em>，而_Collections.unmodifiableList()</em>、<em>Collections.unmodifiableSet()</em>、_List.of()_和_Set.of()_是_List_和_Set_集合类的相应实用方法。相同的概念也适用于_List_和_Set_集合类。</p>","autoDesc":true}');export{d as comp,m as data};
