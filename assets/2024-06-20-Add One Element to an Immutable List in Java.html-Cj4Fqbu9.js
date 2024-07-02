import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-B3tK_ksD.js";const p={},e=t('<h1 id="在java中向不可变列表添加一个元素-baeldung" tabindex="-1"><a class="header-anchor" href="#在java中向不可变列表添加一个元素-baeldung"><span>在Java中向不可变列表添加一个元素 | Baeldung</span></a></h1><p>在Java中，不可变对象确保了线程安全并防止了意外的修改，从而促进了健壮和可靠的代码。然而，有时我们希望向不可变列表添加元素。</p><p>在这个快速教程中，我们将探讨如何在Java中实现这一点。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>不可变列表不允许我们向其添加元素。但在某些情况下，我们希望将额外的元素合并到不可变列表中，同时不损害其不可变性。换句话说，<strong>我们希望有一个包含给定不可变列表所有元素和新元素的不可变列表。</strong></p><p>接下来，让我们创建一个方法来实现这一点。为了简单起见，我们将使用单元测试断言来验证我们的解决方案是否产生了预期的结果。</p><h2 id="_3-利用可变列表" tabindex="-1"><a class="header-anchor" href="#_3-利用可变列表"><span>3. 利用可变列表</span></a></h2><p>解决这个问题的一个想法是<strong>利用一个可变列表</strong>，比如_ArrayList_。接下来，让我们详细阐述这个想法：</p><ul><li>创建一个_ArrayList_来保存原始不可变列表中的所有元素</li><li>向_ArrayList_添加新元素</li><li>使_ArrayList_不可变</li></ul><p>现在，让我们在方法中实现逻辑：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> ````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>```````` <span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>```````` <span class="token function">appendAnElement</span><span class="token punctuation">(</span><span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>```````` immutableList<span class="token punctuation">,</span> <span class="token class-name">T</span> element<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>```````` tmpList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>immutableList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    tmpList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">unmodifiableList</span><span class="token punctuation">(</span>tmpList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如代码所示，<strong>_appendAnElement()_是一个泛型方法。</strong> 它首先创建了_ArrayList tmpList_，包含给定_immutableList_的元素。然后，它向_tmpList_添加_element_。最后，返回_Collections.unmodifiableList(tmpList)_作为结果。正如方法名称所示，<strong>_Collections.unmodifiableList()_返回指定列表的不可修改视图。</strong></p><p>接下来，让我们测试这个方法。由于<strong>AssertJ可以快速检查集合是否不可变</strong>，我们将使用这个库来验证我们的_appendAnElement()_方法是否按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` myList <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;D&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;E&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` expected <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;D&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;E&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;F&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` result <span class="token operator">=</span> <span class="token function">appendAnElement</span><span class="token punctuation">(</span>myList<span class="token punctuation">,</span> <span class="token string">&quot;F&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">isUnmodifiable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于**_List.of()<em>方法返回一个不可变列表**，我们使用这个方法来构建我们的输入_myList</em>。</p><p>如果运行测试，测试将通过。因此，问题解决了。然而，这个方法只能向列表添加一个元素。</p><p>接下来，让我们稍微扩展这个方法以支持多个元素的添加。</p><h2 id="_4-添加多个元素" tabindex="-1"><a class="header-anchor" href="#_4-添加多个元素"><span>4. 添加多个元素</span></a></h2><p><strong><em>可变参数</em>（variable-length arguments）允许一个方法接受任意数量的相同类型的参数。</strong> 因此，我们可以使用这种技术让我们的方法支持多个元素的添加：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SafeVarargs</span>\n<span class="token keyword">static</span> ````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>```````` <span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>```````` <span class="token function">appendElements</span><span class="token punctuation">(</span><span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>```````` immutableList<span class="token punctuation">,</span> <span class="token class-name">T</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> elements<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>```````` tmpList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>immutableList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    tmpList<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>elements<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">unmodifiableList</span><span class="token punctuation">(</span>tmpList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在上述代码中看到的，<strong>我们使用_@SafeVarargs_注解方法，以确保我们的参数化_可变参数_类型是安全的</strong>，并且不会导致堆污染。</p><p>使用这个方法，我们可以方便地向不可变列表添加一个或多个元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` myList <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;D&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;E&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` expected1 <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;D&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;E&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;F&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` result1 <span class="token operator">=</span> <span class="token function">appendElements</span><span class="token punctuation">(</span>myList<span class="token punctuation">,</span> <span class="token string">&quot;F&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>result1<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expected1<span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">isUnmodifiable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` expected2 <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;D&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;E&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;F&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;G&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;H&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;I&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````` result2 <span class="token operator">=</span> <span class="token function">appendElements</span><span class="token punctuation">(</span>myList<span class="token punctuation">,</span> <span class="token string">&quot;F&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;G&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;H&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;I&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>result2<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expected2<span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">isUnmodifiable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了如何在Java中向不可变列表添加元素，并演示了如何使用_可变参数_使方法接受相同类型的可变数量的参数。</p><p>如往常一样，示例的完整源代码可在GitHub上找到。翻译已经完成，以下是翻译的最后部分：</p><h2 id="_5-结论-1" tabindex="-1"><a class="header-anchor" href="#_5-结论-1"><span>5. 结论</span></a></h2><p>在这篇文章中，我们探索了如何在Java中向不可变列表添加元素，并展示了如何使用可变参数来使一个方法接受相同类型的可变数量的参数。</p><p>如往常一样，示例的完整源代码可以在GitHub上找到。</p><p>OK</p>',30),o=[e];function c(l,i){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","2024-06-20-Add One Element to an Immutable List in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Add%20One%20Element%20to%20an%20Immutable%20List%20in%20Java.html","title":"在Java中向不可变列表添加一个元素 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Java","Collections"],"tag":["Immutable List","Java"],"head":[["meta",{"name":"keywords","content":"Java, Immutable List, Collections"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Add%20One%20Element%20to%20an%20Immutable%20List%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中向不可变列表添加一个元素 | Baeldung"}],["meta",{"property":"og:description","content":"在Java中向不可变列表添加一个元素 | Baeldung 在Java中，不可变对象确保了线程安全并防止了意外的修改，从而促进了健壮和可靠的代码。然而，有时我们希望向不可变列表添加元素。 在这个快速教程中，我们将探讨如何在Java中实现这一点。 2. 问题介绍 不可变列表不允许我们向其添加元素。但在某些情况下，我们希望将额外的元素合并到不可变列表中，同..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Immutable List"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中向不可变列表添加一个元素 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中向不可变列表添加一个元素 | Baeldung 在Java中，不可变对象确保了线程安全并防止了意外的修改，从而促进了健壮和可靠的代码。然而，有时我们希望向不可变列表添加元素。 在这个快速教程中，我们将探讨如何在Java中实现这一点。 2. 问题介绍 不可变列表不允许我们向其添加元素。但在某些情况下，我们希望将额外的元素合并到不可变列表中，同..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 利用可变列表","slug":"_3-利用可变列表","link":"#_3-利用可变列表","children":[]},{"level":2,"title":"4. 添加多个元素","slug":"_4-添加多个元素","link":"#_4-添加多个元素","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论-1","link":"#_5-结论-1","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.4,"words":1020},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Add One Element to an Immutable List in Java.md","localizedDate":"2024年6月21日","excerpt":"\\n<p>在Java中，不可变对象确保了线程安全并防止了意外的修改，从而促进了健壮和可靠的代码。然而，有时我们希望向不可变列表添加元素。</p>\\n<p>在这个快速教程中，我们将探讨如何在Java中实现这一点。</p>\\n<h2>2. 问题介绍</h2>\\n<p>不可变列表不允许我们向其添加元素。但在某些情况下，我们希望将额外的元素合并到不可变列表中，同时不损害其不可变性。换句话说，<strong>我们希望有一个包含给定不可变列表所有元素和新元素的不可变列表。</strong></p>\\n<p>接下来，让我们创建一个方法来实现这一点。为了简单起见，我们将使用单元测试断言来验证我们的解决方案是否产生了预期的结果。</p>","autoDesc":true}');export{r as comp,d as data};
