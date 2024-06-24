import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DgBtAgUy.js";const e={},p=t(`<h1 id="java中重置listiterator到列表的第一个元素" tabindex="-1"><a class="header-anchor" href="#java中重置listiterator到列表的第一个元素"><span>Java中重置ListIterator到列表的第一个元素</span></a></h1><p>当我们使用Java进行编程时，高效地遍历集合是一个常见的需求。在处理列表时，_ListIterator_接口提供了一个强大的工具，用于双向遍历。然而，在某些情况下，将_ListIterator_重置到列表的第一个元素变得必要。</p><p>在本教程中，我们将探讨在Java中将_ListIterator_重置到列表开头的各种方法。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>像往常一样，我们通过一个例子来理解问题。</p><p>假设我们有一个字符串列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token constant">MY_LIST</span> <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;D&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;E&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;F&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;G&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，我们可以通过<code>MY_LIST.listIterator()</code>获得一个_ListIterator_，并调用_ListIterator_的<code>next()</code>方法来遍历列表。</p><p>有时，我们可能想要通过<strong>让_ListIterator_再次指向列表中第一个元素之前的位置</strong>来重置_ListIterator_对象，就像它刚创建时一样。</p><p>接下来，我们将查看解决这个问题的不同方法。此外，我们将利用单元测试断言来验证每种解决方案是否给出了预期的结果。</p><h2 id="_3-创建新的-listiterator" tabindex="-1"><a class="header-anchor" href="#_3-创建新的-listiterator"><span>3. 创建新的_ListIterator_</span></a></h2><p>我们知道，<strong>当我们创建一个新的_ListIterator_对象时，它指向目标列表的开头</strong>。因此，重置一个_ListIterator_实例的最简单方法就是重新赋值给一个新的_ListIterator_。</p><p>让我们创建一个测试并验证这个想法是否如预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ListIterator</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` lit <span class="token operator">=</span> <span class="token constant">MY_LIST</span><span class="token punctuation">.</span><span class="token function">listIterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
lit<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
lit<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
lit<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
lit<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

lit <span class="token operator">=</span> <span class="token constant">MY_LIST</span><span class="token punctuation">.</span><span class="token function">listIterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertFalse</span><span class="token punctuation">(</span>lit<span class="token punctuation">.</span><span class="token function">hasPrevious</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> lit<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的测试所示，在我们创建了_ListIterator_ <code>lit</code> 之后，我们调用了四次 <code>lit.next()</code> 方法。当我们想要重置 <code>lit</code> 时，我们创建了一个新的_ListIterator_实例并重新赋值给 <code>lit</code>。</p><p>然后，我们通过两个断言来验证 <code>lit</code> 是否成功重置：</p><ul><li><code>lit.hasPrevious()</code> 返回 <code>false</code></li><li><code>lit.next()</code> 应该是 <code>MY_LIST</code> 中的第一个元素（&quot;A&quot;）</li></ul><p>如果我们运行这个测试，它会通过。因此，创建一个新的_ListIterator_解决了我们的问题。</p><h2 id="_4-反向迭代到列表的开头" tabindex="-1"><a class="header-anchor" href="#_4-反向迭代到列表的开头"><span>4. 反向迭代到列表的开头</span></a></h2><p>创建一个新的_ListIterator_可以快速导航到列表的开头。然而，我们将拥有一个新的_ListIterator_对象。</p><p>有时，我们想要保留原始的_ListIterator_对象，并将它的指针移回目标列表的开头。如果是这种情况，我们可以利用_ListIterator_的双向迭代特性来<strong>反向迭代到列表的开头</strong>。</p><p>接下来，让我们创建一个测试来看看如何实现这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ListIterator</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` lit <span class="token operator">=</span> <span class="token constant">MY_LIST</span><span class="token punctuation">.</span><span class="token function">listIterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
lit<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
lit<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
lit<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
lit<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">while</span> <span class="token punctuation">(</span>lit<span class="token punctuation">.</span><span class="token function">hasPrevious</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    lit<span class="token punctuation">.</span><span class="token function">previous</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">assertFalse</span><span class="token punctuation">(</span>lit<span class="token punctuation">.</span><span class="token function">hasPrevious</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> lit<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，我们通过一个<code>while</code>循环来应用反向迭代。</p><p>如果我们运行测试，它会通过。所以，它做到了。</p><p>值得注意的是，由于这种方法是从当前位置反向迭代到列表的开头，<strong>如果列表中的元素数量很大，这可能会很慢</strong>。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了两种将_ListIterator_重置到列表开头的方法。</p><p>如果需要保留原始的_ListIterator_实例，我们可以反向迭代到列表的头部。否则，创建一个新的_ListIterator_将是最直接的解决方案。</p><p>像往常一样，示例的完整源代码可以在GitHub上找到。</p>`,30),o=[p];function c(i,l){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-23-Reset ListIterator to First Element of the List in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-Reset%20ListIterator%20to%20First%20Element%20of%20the%20List%20in%20Java.html","title":"Java中重置ListIterator到列表的第一个元素","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Java","ListIterator"],"tag":["Java","ListIterator","编程"],"head":[["meta",{"name":"keywords","content":"Java, ListIterator, 编程技巧"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-Reset%20ListIterator%20to%20First%20Element%20of%20the%20List%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中重置ListIterator到列表的第一个元素"}],["meta",{"property":"og:description","content":"Java中重置ListIterator到列表的第一个元素 当我们使用Java进行编程时，高效地遍历集合是一个常见的需求。在处理列表时，_ListIterator_接口提供了一个强大的工具，用于双向遍历。然而，在某些情况下，将_ListIterator_重置到列表的第一个元素变得必要。 在本教程中，我们将探讨在Java中将_ListIterator_重置..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T21:27:18.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"ListIterator"}],["meta",{"property":"article:tag","content":"编程"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T21:27:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中重置ListIterator到列表的第一个元素\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T21:27:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中重置ListIterator到列表的第一个元素 当我们使用Java进行编程时，高效地遍历集合是一个常见的需求。在处理列表时，_ListIterator_接口提供了一个强大的工具，用于双向遍历。然而，在某些情况下，将_ListIterator_重置到列表的第一个元素变得必要。 在本教程中，我们将探讨在Java中将_ListIterator_重置..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 创建新的_ListIterator_","slug":"_3-创建新的-listiterator","link":"#_3-创建新的-listiterator","children":[]},{"level":2,"title":"4. 反向迭代到列表的开头","slug":"_4-反向迭代到列表的开头","link":"#_4-反向迭代到列表的开头","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719178038000,"updatedTime":1719178038000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.85,"words":856},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-Reset ListIterator to First Element of the List in Java.md","localizedDate":"2024年6月24日","excerpt":"\\n<p>当我们使用Java进行编程时，高效地遍历集合是一个常见的需求。在处理列表时，_ListIterator_接口提供了一个强大的工具，用于双向遍历。然而，在某些情况下，将_ListIterator_重置到列表的第一个元素变得必要。</p>\\n<p>在本教程中，我们将探讨在Java中将_ListIterator_重置到列表开头的各种方法。</p>\\n<h2>2. 问题介绍</h2>\\n<p>像往常一样，我们通过一个例子来理解问题。</p>\\n<p>假设我们有一个字符串列表：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">List</span>```<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>``` <span class=\\"token constant\\">MY_LIST</span> <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">List</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">of</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"A\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"B\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"C\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"D\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"E\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"F\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"G\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
