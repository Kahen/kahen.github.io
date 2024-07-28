import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-D4B8YWfq.js";const t={},p=e('<hr><h1 id="如何从java-set中获取第一个元素" tabindex="-1"><a class="header-anchor" href="#如何从java-set中获取第一个元素"><span>如何从Java Set中获取第一个元素</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p><em>Set</em> 是一个不允许重复项的集合。Java 提供了 <em>Set</em> 接口以及几个该接口的实现供我们使用。本教程将探讨如何从 <em>Set</em> 中获取第一个元素。Java <em>Set</em> 按定义是无序的，但有些实现确实保持了顺序，例如 <em>LinkedHashSet</em>，我们将在这里重点讨论。</p><h2 id="_2-使用-iterator" tabindex="-1"><a class="header-anchor" href="#_2-使用-iterator"><span>2. 使用 <em>Iterator</em></span></a></h2><p><strong>我们可以使用 <em>Iterator</em> 来检索 <em>Set</em> 中的第一个元素。</strong> <em>Set</em> 接口允许我们使用 <em>iterator()</em> 方法为所有实现获取 <em>Iterator</em>。然后我们可以调用 <em>Iterator</em> 上的 <em>next()</em> 来获取第一个项目：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenASet_whenUsingIterator_thenRetrieveAnItem</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Set</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``` set <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Iterator</span> iterator <span class="token operator">=</span> set<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">int</span> retrieved <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">assertEquals</span><span class="token punctuation">(</span>retrieved<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们这里实例化了一个填充了五个 <em>Integer</em> 的 <em>LinkedHashSet</em>。我们最后的断言显示我们已成功从 <em>Set</em> 中检索到第一个元素。</p><p>如果我们的 <em>Set</em> 是空的，或者我们的 <em>Iterator</em> 中没有更多元素，<em>next()</em> 将抛出 <em>NoSuchElementException</em>。我们在这里通过使用 <em>Iterators</em> 的 <em>hasNext()</em> 方法来防止这种情况，尝试获取下一个项目之前。如果我们的使用情况仅仅是获取第一个且仅有第一个项目，我们可以在不使用 <em>Iterator</em> 之前检查 <em>Set</em> 是否为空。</p><h2 id="_3-使用-streams" tabindex="-1"><a class="header-anchor" href="#_3-使用-streams"><span>3. 使用 <em>Streams</em></span></a></h2><p>从 <em>Set</em> 中获取第一个项目的第二个选项是使用 <em>Streams</em>。我们可以使用 <em>stream()</em> 方法将 <em>Set</em> 转换为 <em>Stream</em>。然后，我们可以使用 Streams 的 <em>findFirst()</em> 方法，它将返回一个 <em>Optional</em>。最后，我们在 <em>Optional</em> 上调用 <em>get()</em> 来检索我们的项目：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenASet_whenUsingStreams_thenRetrieveAnItem</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Set</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``` set <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Optional</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``` optional <span class="token operator">=</span> set<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>optional<span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">int</span> retrieved <span class="token operator">=</span> optional<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">assertEquals</span><span class="token punctuation">(</span>retrieved<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码和我们之前看到的一样，如果 <em>Set</em> 中没有项目，我们在调用 <em>Optional</em> 上的 <em>get()</em> 时会得到 <em>NoSuchElementException</em>。为了防止这种情况，我们在尝试检索值之前使用了 <em>Optional</em> 上的 <em>ifPresent()</em>。</p><p><strong>使用 <em>Streams</em> 像这样为我们打开了更多对从 <em>Set</em> 中检索的项目进行后处理的选项。</strong> 例如，我们可以立即将 <em>ifPresent()</em> 链接到 <em>findFirst()</em> 并传递一个 <em>Consumer</em> 来处理项目。我们也可以使用 <em>Streams</em> 的 <em>sorted()</em> 方法重新定义顺序，因此第一个项目将是什么。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们看到了两种从 <em>Set</em> 中获取第一个项目的方法，特别是 <em>LinkedHashSet</em> 实现，因为它是有序的。使用 <em>Iterator</em> 提供了一种简单的方式来检索第一个项目，如果需要，我们可以循环遍历所有目。使用 <em>Streams</em> 提供了相同的功能，但为我们提供了更多直接使用检索到的项目并允许我们控制查看项目顺序的选项。</p><p>如常，示例的完整代码可在 GitHub 上找到。</p>',17),o=[p];function c(i,l){return s(),a("div",null,o)}const u=n(t,[["render",c],["__file","2024-07-02-How to Get First Item From a Java Set.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-How%20to%20Get%20First%20Item%20From%20a%20Java%20Set.html","title":"如何从Java Set中获取第一个元素","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Collections"],"tag":["Set","Java","LinkedHashSet"],"head":[["meta",{"name":"keywords","content":"Java, Set, LinkedHashSet, first item"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-How%20to%20Get%20First%20Item%20From%20a%20Java%20Set.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何从Java Set中获取第一个元素"}],["meta",{"property":"og:description","content":"如何从Java Set中获取第一个元素 1. 概述 Set 是一个不允许重复项的集合。Java 提供了 Set 接口以及几个该接口的实现供我们使用。本教程将探讨如何从 Set 中获取第一个元素。Java Set 按定义是无序的，但有些实现确实保持了顺序，例如 LinkedHashSet，我们将在这里重点讨论。 2. 使用 Iterator 我们可以使用..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T06:53:55.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Set"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"LinkedHashSet"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T06:53:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何从Java Set中获取第一个元素\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T06:53:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何从Java Set中获取第一个元素 1. 概述 Set 是一个不允许重复项的集合。Java 提供了 Set 接口以及几个该接口的实现供我们使用。本教程将探讨如何从 Set 中获取第一个元素。Java Set 按定义是无序的，但有些实现确实保持了顺序，例如 LinkedHashSet，我们将在这里重点讨论。 2. 使用 Iterator 我们可以使用..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用 Iterator","slug":"_2-使用-iterator","link":"#_2-使用-iterator","children":[]},{"level":2,"title":"3. 使用 Streams","slug":"_3-使用-streams","link":"#_3-使用-streams","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719903235000,"updatedTime":1719903235000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.53,"words":758},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-How to Get First Item From a Java Set.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>如何从Java Set中获取第一个元素</h1>\\n<h2>1. 概述</h2>\\n<p><em>Set</em> 是一个不允许重复项的集合。Java 提供了 <em>Set</em> 接口以及几个该接口的实现供我们使用。本教程将探讨如何从 <em>Set</em> 中获取第一个元素。Java <em>Set</em> 按定义是无序的，但有些实现确实保持了顺序，例如 <em>LinkedHashSet</em>，我们将在这里重点讨论。</p>\\n<h2>2. 使用 <em>Iterator</em></h2>\\n<p><strong>我们可以使用 <em>Iterator</em> 来检索 <em>Set</em> 中的第一个元素。</strong> <em>Set</em> 接口允许我们使用 <em>iterator()</em> 方法为所有实现获取 <em>Iterator</em>。然后我们可以调用 <em>Iterator</em> 上的 <em>next()</em> 来获取第一个项目：</p>","autoDesc":true}');export{u as comp,k as data};
