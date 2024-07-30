import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as s}from"./app-CbPcg273.js";const e={},i=s(`<h1 id="在特定位置向arraylist中插入对象" tabindex="-1"><a class="header-anchor" href="#在特定位置向arraylist中插入对象"><span>在特定位置向ArrayList中插入对象</span></a></h1><p>在本教程中，我们将学习如何在特定位置向ArrayList中插入一个对象。</p><h2 id="_2-示例" tabindex="-1"><a class="header-anchor" href="#_2-示例"><span>2. 示例</span></a></h2><p>如果我们想在ArrayList中的特定位置添加一个元素，我们可以使用通过List<code>&lt;E&gt;</code>接口实现提供的<code>add(int index, E element)</code>方法。这个方法允许我们在特定索引处添加一个元素。</p><p>如果索引超出范围（索引<code>&lt;0或索引&gt;</code>size()），它还可能抛出一个<code>IndexOutOfBoundsException</code>。这意味着如果我们的ArrayList中只有4个元素，我们不能使用它在位置4添加项目，因为我们从0开始计数。在这里，我们必须使用标准的<code>add(E e)</code>方法。</p><p>首先，我们将创建一个新的ArrayList并添加四个元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` integers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
integers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
integers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
integers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
integers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>integers<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将产生以下结果：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/11/img_637528671724b.svg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>现在，如果我们在索引1处添加另一个元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>integers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>integers<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>ArrayList内部首先会移动从给定索引开始的对象：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/11/img_637528683cc07.svg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>这是因为ArrayList是一个可增长的数组，如果需要，它会自巋调整容量：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/11/img_63752869916a0.svg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>然后在给定索引处添加新项目：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/11/img_6375286ad6a38.svg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在特定索引处添加将导致ArrayList的平均操作性能为O(n/2)。例如，LinkedList的平均复杂度为O(n/4)，如果索引为0，则为O(1)。因此，如果我们严重依赖在特定位置添加元素，我们需要更仔细地看看LinkedList。</p><p>我们还可以看到元素的顺序不再正确。当我们手动在特定位置添加项目时，这通常是我们想要实现的。否则，我们可以使用<code>integers.sort(Integer::compareTo)</code>再次对ArrayList进行排序，或者实现我们自己的Comparator。</p><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3. 结论</span></a></h2><p>在本文中，我们讨论了<code>add(int index, E element)</code>方法，以便我们可以在ArrayList<code>&lt;E&gt;</code>中的特定位置添加新元素。我们必须注意保持ArrayList的索引界限内，并确保我们允许正确的对象。</p><p>文中提到的所有代码片段都可以在GitHub上找到。</p>`,22),p=[i];function o(c,r){return t(),a("div",null,p)}const u=n(e,[["render",o],["__file","2024-07-12-Inserting an Object in an ArrayList at a Specific Position.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-Inserting%20an%20Object%20in%20an%20ArrayList%20at%20a%20Specific%20Position.html","title":"在特定位置向ArrayList中插入对象","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Java","Collections"],"tag":["ArrayList","Java Collections"],"head":[["meta",{"name":"keywords","content":"Java, ArrayList, Insert, Object, Specific Position"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-Inserting%20an%20Object%20in%20an%20ArrayList%20at%20a%20Specific%20Position.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在特定位置向ArrayList中插入对象"}],["meta",{"property":"og:description","content":"在特定位置向ArrayList中插入对象 在本教程中，我们将学习如何在特定位置向ArrayList中插入一个对象。 2. 示例 如果我们想在ArrayList中的特定位置添加一个元素，我们可以使用通过List<E>接口实现提供的add(int index, E element)方法。这个方法允许我们在特定索引处添加一个元素。 如果索引超出范围（索引<0..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/11/img_637528671724b.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T13:44:06.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"ArrayList"}],["meta",{"property":"article:tag","content":"Java Collections"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T13:44:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在特定位置向ArrayList中插入对象\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/11/img_637528671724b.svg\\",\\"https://www.baeldung.com/wp-content/uploads/2022/11/img_637528683cc07.svg\\",\\"https://www.baeldung.com/wp-content/uploads/2022/11/img_63752869916a0.svg\\",\\"https://www.baeldung.com/wp-content/uploads/2022/11/img_6375286ad6a38.svg\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T13:44:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在特定位置向ArrayList中插入对象 在本教程中，我们将学习如何在特定位置向ArrayList中插入一个对象。 2. 示例 如果我们想在ArrayList中的特定位置添加一个元素，我们可以使用通过List<E>接口实现提供的add(int index, E element)方法。这个方法允许我们在特定索引处添加一个元素。 如果索引超出范围（索引<0..."},"headers":[{"level":2,"title":"2. 示例","slug":"_2-示例","link":"#_2-示例","children":[]},{"level":2,"title":"3. 结论","slug":"_3-结论","link":"#_3-结论","children":[]}],"git":{"createdTime":1720791846000,"updatedTime":1720791846000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.93,"words":579},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-Inserting an Object in an ArrayList at a Specific Position.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>在本教程中，我们将学习如何在特定位置向ArrayList中插入一个对象。</p>\\n<h2>2. 示例</h2>\\n<p>如果我们想在ArrayList中的特定位置添加一个元素，我们可以使用通过List<code>&lt;E&gt;</code>接口实现提供的<code>add(int index, E element)</code>方法。这个方法允许我们在特定索引处添加一个元素。</p>\\n<p>如果索引超出范围（索引<code>&lt;0或索引&gt;</code>size()），它还可能抛出一个<code>IndexOutOfBoundsException</code>。这意味着如果我们的ArrayList中只有4个元素，我们不能使用它在位置4添加项目，因为我们从0开始计数。在这里，我们必须使用标准的<code>add(E e)</code>方法。</p>","autoDesc":true}');export{u as comp,g as data};
