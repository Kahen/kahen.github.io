import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-LwwahXlT.js";const e={},p=t('<h1 id="在java-arraylist中替换特定索引处的元素" tabindex="-1"><a class="header-anchor" href="#在java-arraylist中替换特定索引处的元素"><span>在Java ArrayList中替换特定索引处的元素</span></a></h1><p>通过本教程，我们将探讨如何在Java的_ArrayList_中替换特定索引处的元素。</p><h2 id="_2-常见做法" tabindex="-1"><a class="header-anchor" href="#_2-常见做法"><span><strong>2. 常见做法</strong></span></a></h2><p>要替换一个现有元素，首先需要找到该元素在_ArrayList_中的确切位置。这个位置就是我们所说的索引。然后，我们可以将旧元素替换为新元素。</p><p>在Java _ArrayList_中替换元素的最常用方法是使用_set(int index, Object element)_方法。_set()_方法接受两个参数：现有项目的索引和新项目。</p><p>_ArrayList_的索引是基于0的。因此，要替换第一个元素，必须将0作为参数传递给索引。</p><p>如果提供的索引超出范围，将发生_IndexOutOfBoundsException_。</p><h2 id="_3-实现" tabindex="-1"><a class="header-anchor" href="#_3-实现"><span><strong>3. 实现</strong></span></a></h2><p>让我们通过一个例子来看看如何在Java _ArrayList_中替换特定索引处的元素。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`` <span class="token constant">EXPECTED</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`` aList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\naList<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertThat</span><span class="token punctuation">(</span>aList<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们创建一个包含五个元素的_ArrayList_。然后，我们将第三个元素的值7替换为3，索引为2。最后，我们可以看到索引2处的值7已从列表中移除，并更新为新值3。同时，请注意列表的大小不会受到影响。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span><strong>4. 结论</strong></span></a></h2><p>在这篇简短的文章中，我们学习了如何在Java <em>ArrayList_中替换特定索引处的元素。此外，您可以使用此方法与任何其他_List_类型，如_LinkedList</em>。只要确保您使用的_List_不是不可变的。</p><p>如往常一样，本文的完整源代码可以在GitHub上找到。</p>',14),c=[p];function o(i,r){return s(),n("div",null,c)}const _=a(e,[["render",o],["__file","2024-07-16-Replace Element at a Specific Index in a Java ArrayList.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-Replace%20Element%20at%20a%20Specific%20Index%20in%20a%20Java%20ArrayList.html","title":"在Java ArrayList中替换特定索引处的元素","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","ArrayList"],"tag":["Java","ArrayList","replace"],"head":[["meta",{"name":"keywords","content":"Java, ArrayList, replace element"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-Replace%20Element%20at%20a%20Specific%20Index%20in%20a%20Java%20ArrayList.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java ArrayList中替换特定索引处的元素"}],["meta",{"property":"og:description","content":"在Java ArrayList中替换特定索引处的元素 通过本教程，我们将探讨如何在Java的_ArrayList_中替换特定索引处的元素。 2. 常见做法 要替换一个现有元素，首先需要找到该元素在_ArrayList_中的确切位置。这个位置就是我们所说的索引。然后，我们可以将旧元素替换为新元素。 在Java _ArrayList_中替换元素的最常用方法..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T12:26:06.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"ArrayList"}],["meta",{"property":"article:tag","content":"replace"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T12:26:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java ArrayList中替换特定索引处的元素\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T12:26:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java ArrayList中替换特定索引处的元素 通过本教程，我们将探讨如何在Java的_ArrayList_中替换特定索引处的元素。 2. 常见做法 要替换一个现有元素，首先需要找到该元素在_ArrayList_中的确切位置。这个位置就是我们所说的索引。然后，我们可以将旧元素替换为新元素。 在Java _ArrayList_中替换元素的最常用方法..."},"headers":[{"level":2,"title":"2. 常见做法","slug":"_2-常见做法","link":"#_2-常见做法","children":[]},{"level":2,"title":"3. 实现","slug":"_3-实现","link":"#_3-实现","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721132766000,"updatedTime":1721132766000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.48,"words":445},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-Replace Element at a Specific Index in a Java ArrayList.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>通过本教程，我们将探讨如何在Java的_ArrayList_中替换特定索引处的元素。</p>\\n<h2><strong>2. 常见做法</strong></h2>\\n<p>要替换一个现有元素，首先需要找到该元素在_ArrayList_中的确切位置。这个位置就是我们所说的索引。然后，我们可以将旧元素替换为新元素。</p>\\n<p>在Java _ArrayList_中替换元素的最常用方法是使用_set(int index, Object element)_方法。_set()_方法接受两个参数：现有项目的索引和新项目。</p>\\n<p>_ArrayList_的索引是基于0的。因此，要替换第一个元素，必须将0作为参数传递给索引。</p>","autoDesc":true}');export{_ as comp,d as data};
