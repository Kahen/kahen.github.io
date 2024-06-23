import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-j3liftxp.js";const p={},e=t('<h1 id="arraylist中addall-方法处理空值-baeldung-概述" tabindex="-1"><a class="header-anchor" href="#arraylist中addall-方法处理空值-baeldung-概述"><span>ArrayList中addAll()方法处理空值 | Baeldung### 概述</span></a></h1><p>熟练使用集合API是Java开发者最关键的技能之一。本教程将重点介绍_ArrayList_及其_addAll()_方法。</p><p>尽管_addAll()_是向目标_ArrayList_添加一系列元素的最便捷方式，但它在处理空值时表现不佳。</p><h3 id="空值和addall" tabindex="-1"><a class="header-anchor" href="#空值和addall"><span>空值和addAll()</span></a></h3><p>正如前面所述，addAll()方法在处理空值时表现不佳。如果我们传递一个空引用，它将抛出_NullPointerException_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>\n<span class="token annotation punctuation">@NullSource</span>\n<span class="token keyword">void</span> <span class="token function">givenNull_whenAddAll_thenAddThrowsNPE</span><span class="token punctuation">(</span><span class="token class-name">List</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````````` list<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ArrayList</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````````` strings <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertThatExceptionOfType</span><span class="token punctuation">(</span><span class="token class-name">NullPointerException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">isThrownBy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> strings<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然这种异常是明确的，但直到运行时我们才可能发现问题，这并不是很好。</p><h3 id="简单检查" tabindex="-1"><a class="header-anchor" href="#简单检查"><span>简单检查</span></a></h3><p>我们可以确保不向addAll()方法传递空值的最基本方式是使用一个简单的if语句进行检查：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>\n<span class="token annotation punctuation">@NullSource</span>\n<span class="token keyword">void</span> <span class="token function">givenNull_whenAddAllWithCheck_thenNoNPE</span><span class="token punctuation">(</span><span class="token class-name">List</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````````` list<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ArrayList</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````````` strings <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertThatNoException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isThrownBy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>list <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            strings<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一种完全有效的方法来处理这种情况。然而，它可能被视为过于冗长和命令式。让我们尝试使这段代码更直接。</p><h3 id="自定义检查方法" tabindex="-1"><a class="header-anchor" href="#自定义检查方法"><span>自定义检查方法</span></a></h3><p>让我们对前面的解决方案进行重构。我们需要做的就是将空值检查逻辑提取到一个单独的方法中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">addIfNonNull</span><span class="token punctuation">(</span><span class="token class-name">List</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````````` list<span class="token punctuation">,</span> <span class="token class-name">ArrayList</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````````` strings<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>list <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        strings<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>客户端代码看起来会更好，因为我们将实现逻辑移开了：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>\n<span class="token annotation punctuation">@NullSource</span>\n<span class="token keyword">void</span> <span class="token function">givenNull_whenAddAllWithExternalizedCheck_thenNoNPE</span><span class="token punctuation">(</span><span class="token class-name">List</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````````` list<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ArrayList</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````````` strings <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertThatNoException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isThrownBy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        <span class="token function">addIfNonNull</span><span class="token punctuation">(</span>list<span class="token punctuation">,</span> strings<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，在这种情况下，我们正在将列表传递给一个方法并在内部进行修改。<strong>这是这种情况下的权衡：代码更易读，但不清楚我们是如何修改_List_的。</strong></p><h3 id="默认为空" tabindex="-1"><a class="header-anchor" href="#默认为空"><span>默认为空</span></a></h3><p>另一种方法是透明地将空值转换为一个空的_List_。我们将使用Apache Commons库中的_CollectionUtils_。然而，由于逻辑很简单，我们也可以自己实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>\n<span class="token annotation punctuation">@NullSource</span>\n<span class="token keyword">void</span> <span class="token function">givenNull_whenAddAllWithCollectionCheck_thenNoNPE</span><span class="token punctuation">(</span><span class="token class-name">List</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````````` list<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ArrayList</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````````` strings <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertThatNoException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isThrownBy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        strings<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span><span class="token class-name">CollectionUtils</span><span class="token punctuation">.</span><span class="token function">emptyIfNull</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这可能是一种更好的方法，特别是如果我们在其他地方使用这个列表。**同时，使用这种转换的最佳方式是尽早应用它，防止在我们的应用程序中传递空值。**例如，Kotlin中的可空类型旨在解决这个问题。</p><h3 id="optional" tabindex="-1"><a class="header-anchor" href="#optional"><span>Optional</span></a></h3><p>虽然Kotlin有可空类型，但Java使用_Optional_来处理这个问题。这只是一个包装类，它通知用户对象可能不存在。然而，它包含了一个处理空值的很好的API：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>\n<span class="token annotation punctuation">@NullSource</span>\n<span class="token keyword">void</span> <span class="token function">givenNull_whenAddAllWithOptional_thenNoNPE</span><span class="token punctuation">(</span><span class="token class-name">List</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````````` list<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ArrayList</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````````` strings <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertThatNoException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isThrownBy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ifPresent</span><span class="token punctuation">(</span>strings<span class="token operator">::</span><span class="token function">addAll</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一种实现空值检查的简单解决方案。它不需要任何第三方库，逻辑易于阅读和理解。</p><h3 id="流" tabindex="-1"><a class="header-anchor" href="#流"><span>流</span></a></h3><p>如果我们正在处理一个可空_Lists_的集合，我们可以使用_filter()_方法来忽略空值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>\n<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;listProvider&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">void</span> <span class="token function">givenCollectionOfNullableLists_whenFilter_thenNoNPE</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token operator">&lt;</span><span class="token class-name">List</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````````<span class="token operator">&gt;</span> listOfLists<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ArrayList</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````````` strings <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertThatNoException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isThrownBy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        listOfLists<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token operator">::</span><span class="token function">nonNull</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>strings<span class="token operator">::</span><span class="token function">addAll</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>API与_Optional_使用的类似，相对容易理解。</p><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>在应用程序中跟踪空值可能具有挑战性。然而，考虑到我们可能会得到_NullPointerException_的情况至关重要，以确保应用程序的健壮性。</p><p>我们可以使用各种技术来解决这些问题，从简单的if语句和_Optionals_到第三方API解决方案。**然而，我们应该记住尽早考虑它们。**最好的方法是首先不允许空值。</p><p>如常，本教程的所有代码都可以在GitHub上找到。</p><p>文章发布后30天内开放评论。对于超过此日期的任何问题，请使用网站上的联系表单。</p><p>OK</p>',35),o=[e];function l(c,i){return a(),s("div",null,o)}const k=n(p,[["render",l],["__file","Handling Nulls in ArrayList.addAll  .html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Handling%20Nulls%20in%20ArrayList.addAll%20%20.html","title":"ArrayList中addAll()方法处理空值 | Baeldung### 概述","lang":"zh-CN","frontmatter":{"date":"2024-06-17T00:00:00.000Z","category":["Java","Collections"],"tag":["ArrayList","Null Handling"],"description":"ArrayList中addAll()方法处理空值 | Baeldung### 概述 熟练使用集合API是Java开发者最关键的技能之一。本教程将重点介绍_ArrayList_及其_addAll()_方法。 尽管_addAll()_是向目标_ArrayList_添加一系列元素的最便捷方式，但它在处理空值时表现不佳。 空值和addAll() 正如前面所述，...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Handling%20Nulls%20in%20ArrayList.addAll%20%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"ArrayList中addAll()方法处理空值 | Baeldung### 概述"}],["meta",{"property":"og:description","content":"ArrayList中addAll()方法处理空值 | Baeldung### 概述 熟练使用集合API是Java开发者最关键的技能之一。本教程将重点介绍_ArrayList_及其_addAll()_方法。 尽管_addAll()_是向目标_ArrayList_添加一系列元素的最便捷方式，但它在处理空值时表现不佳。 空值和addAll() 正如前面所述，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"ArrayList"}],["meta",{"property":"article:tag","content":"Null Handling"}],["meta",{"property":"article:published_time","content":"2024-06-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ArrayList中addAll()方法处理空值 | Baeldung### 概述\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-17T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":3,"title":"空值和addAll()","slug":"空值和addall","link":"#空值和addall","children":[]},{"level":3,"title":"简单检查","slug":"简单检查","link":"#简单检查","children":[]},{"level":3,"title":"自定义检查方法","slug":"自定义检查方法","link":"#自定义检查方法","children":[]},{"level":3,"title":"默认为空","slug":"默认为空","link":"#默认为空","children":[]},{"level":3,"title":"Optional","slug":"optional","link":"#optional","children":[]},{"level":3,"title":"流","slug":"流","link":"#流","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.17,"words":951},"filePathRelative":"posts/baeldung/Archive/Handling Nulls in ArrayList.addAll  .md","localizedDate":"2024年6月17日","excerpt":"\\n<p>熟练使用集合API是Java开发者最关键的技能之一。本教程将重点介绍_ArrayList_及其_addAll()_方法。</p>\\n<p>尽管_addAll()_是向目标_ArrayList_添加一系列元素的最便捷方式，但它在处理空值时表现不佳。</p>\\n<h3>空值和addAll()</h3>\\n<p>正如前面所述，addAll()方法在处理空值时表现不佳。如果我们传递一个空引用，它将抛出_NullPointerException_：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@ParameterizedTest</span>\\n<span class=\\"token annotation punctuation\\">@NullSource</span>\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenNull_whenAddAll_thenAddThrowsNPE</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">List</span>`````````````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>````````````` list<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">ArrayList</span>`````````````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>````````````` strings <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ArrayList</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">assertThatExceptionOfType</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">NullPointerException</span><span class=\\"token punctuation\\">.</span><span class=\\"token keyword\\">class</span><span class=\\"token punctuation\\">)</span>\\n      <span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isThrownBy</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">-&gt;</span> strings<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">addAll</span><span class=\\"token punctuation\\">(</span>list<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
