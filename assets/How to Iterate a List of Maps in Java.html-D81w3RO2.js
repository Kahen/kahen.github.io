import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BX3-P94R.js";const p={},e=t('<h1 id="java中迭代列表映射的方法-baeldung" tabindex="-1"><a class="header-anchor" href="#java中迭代列表映射的方法-baeldung"><span>Java中迭代列表映射的方法 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在Java编程中，处理集合是一个基本任务。列表（List）和映射（Map）是两种常用的集合类型，有时我们可能需要处理一个列表的映射。无论是处理数据、操作配置还是涉及复杂数据结构的任何其他任务，高效地迭代列表映射都是至关重要的。</p><p>在本教程中，我们将探讨在Java中迭代列表映射的各种技术。</p><h2 id="_2-理解列表映射" tabindex="-1"><a class="header-anchor" href="#_2-理解列表映射"><span>2. 理解列表映射</span></a></h2><p>在我们探索迭代技术之前，让我们先理解列表映射的概念。</p><p>列表映射由多个映射对象组成，每个映射都能够保存键值对，其中每个映射中的键是唯一的。<strong>这种结构提供了显著的灵活性，并在表示表格数据、配置或任何需要键到值映射的数据中找到常见应用。</strong></p><p>让我们考虑一个列表映射的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>`<span class="token operator">&lt;</span><span class="token class-name">Map</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>``````<span class="token operator">&gt;</span> listOfMaps <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Map</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>````` map1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmap1<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Jack&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmap1<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nlistOfMaps<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>map1<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">Map</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>````` map2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmap2<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Jones&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmap2<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nlistOfMaps<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>map2<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用传统循环迭代列表映射" tabindex="-1"><a class="header-anchor" href="#_3-使用传统循环迭代列表映射"><span>3. 使用传统循环迭代列表映射</span></a></h2><p>通过传统循环迭代列表映射的最直接方法是使用for循环：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Map</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>````` map <span class="token operator">:</span> listOfMaps<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>````` entry <span class="token operator">:</span> map<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">String</span> key <span class="token operator">=</span> entry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Object</span> value <span class="token operator">=</span> entry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;%s: %s\\n&quot;</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种方法中，我们首先遍历列表，获取每个映射。然后，对于每个映射，我们使用entrySet()迭代它的条目，允许我们访问每个条目的键和值。</p><p>这是输出结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>name: Jack\nage: 30\nname: Jones\nage: 25\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-使用map-keyset-和map-get-进行迭代" tabindex="-1"><a class="header-anchor" href="#_3-1-使用map-keyset-和map-get-进行迭代"><span>3.1 使用Map.keySet()和Map.get()进行迭代</span></a></h3><p>或者，我们可以使用映射接口的keySet()方法来检索一个包含映射中所有键的集合。然后我们可以迭代这个集合，对于每个键，使用get()方法获取相应的值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Map</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>````` map <span class="token operator">:</span> listOfMaps<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> key <span class="token operator">:</span> map<span class="token punctuation">.</span><span class="token function">keySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Object</span> value <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;%s: %s\\n&quot;</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用java-stream进行迭代" tabindex="-1"><a class="header-anchor" href="#_4-使用java-stream进行迭代"><span>4. 使用Java Stream进行迭代</span></a></h2><p>Java 8引入了流（streams），为处理集合提供了一种更函数式的方法。我们可以利用流来迭代列表映射：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>listOfMaps<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>map <span class="token operator">-&gt;</span> map<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>entry <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n      <span class="token class-name">String</span> key <span class="token operator">=</span> entry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token class-name">Object</span> value <span class="token operator">=</span> entry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;%s: %s\\n&quot;</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用flatMap()操作将每个映射转换为其条目的流。然后，我们迭代每个条目并相应地处理它。</p><h2 id="_5-使用foreach-循环与lambda表达式进行迭代" tabindex="-1"><a class="header-anchor" href="#_5-使用foreach-循环与lambda表达式进行迭代"><span>5. 使用forEach()循环与Lambda表达式进行迭代</span></a></h2><p>我们可以使用forEach()循环结合Lambda表达式来迭代列表映射：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>listOfMaps<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>map <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n    map<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;%s: %s\\n&quot;</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们看到了在Java中迭代列表映射可以采用多种方式。通过掌握讨论的技术，我们将更好地处理复杂数据结构。无论我们喜欢传统的循环还是流，选择正确的方法取决于我们项目的具体要求和编码风格偏好。</p><p>所有这些示例的源代码都可以在GitHub上找到。</p><p>文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p>',29),c=[e];function o(l,i){return s(),a("div",null,c)}const r=n(p,[["render",o],["__file","How to Iterate a List of Maps in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/How%20to%20Iterate%20a%20List%20of%20Maps%20in%20Java.html","title":"Java中迭代列表映射的方法 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-16T00:00:00.000Z","category":["Java"],"tag":["集合","迭代"],"description":"Java中迭代列表映射的方法 | Baeldung 1. 引言 在Java编程中，处理集合是一个基本任务。列表（List）和映射（Map）是两种常用的集合类型，有时我们可能需要处理一个列表的映射。无论是处理数据、操作配置还是涉及复杂数据结构的任何其他任务，高效地迭代列表映射都是至关重要的。 在本教程中，我们将探讨在Java中迭代列表映射的各种技术。 2...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/How%20to%20Iterate%20a%20List%20of%20Maps%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中迭代列表映射的方法 | Baeldung"}],["meta",{"property":"og:description","content":"Java中迭代列表映射的方法 | Baeldung 1. 引言 在Java编程中，处理集合是一个基本任务。列表（List）和映射（Map）是两种常用的集合类型，有时我们可能需要处理一个列表的映射。无论是处理数据、操作配置还是涉及复杂数据结构的任何其他任务，高效地迭代列表映射都是至关重要的。 在本教程中，我们将探讨在Java中迭代列表映射的各种技术。 2..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"集合"}],["meta",{"property":"article:tag","content":"迭代"}],["meta",{"property":"article:published_time","content":"2024-06-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中迭代列表映射的方法 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 理解列表映射","slug":"_2-理解列表映射","link":"#_2-理解列表映射","children":[]},{"level":2,"title":"3. 使用传统循环迭代列表映射","slug":"_3-使用传统循环迭代列表映射","link":"#_3-使用传统循环迭代列表映射","children":[{"level":3,"title":"3.1 使用Map.keySet()和Map.get()进行迭代","slug":"_3-1-使用map-keyset-和map-get-进行迭代","link":"#_3-1-使用map-keyset-和map-get-进行迭代","children":[]}]},{"level":2,"title":"4. 使用Java Stream进行迭代","slug":"_4-使用java-stream进行迭代","link":"#_4-使用java-stream进行迭代","children":[]},{"level":2,"title":"5. 使用forEach()循环与Lambda表达式进行迭代","slug":"_5-使用foreach-循环与lambda表达式进行迭代","link":"#_5-使用foreach-循环与lambda表达式进行迭代","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.76,"words":827},"filePathRelative":"posts/baeldung/Archive/How to Iterate a List of Maps in Java.md","localizedDate":"2024年6月16日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在Java编程中，处理集合是一个基本任务。列表（List）和映射（Map）是两种常用的集合类型，有时我们可能需要处理一个列表的映射。无论是处理数据、操作配置还是涉及复杂数据结构的任何其他任务，高效地迭代列表映射都是至关重要的。</p>\\n<p>在本教程中，我们将探讨在Java中迭代列表映射的各种技术。</p>\\n<h2>2. 理解列表映射</h2>\\n<p>在我们探索迭代技术之前，让我们先理解列表映射的概念。</p>\\n<p>列表映射由多个映射对象组成，每个映射都能够保存键值对，其中每个映射中的键是唯一的。<strong>这种结构提供了显著的灵活性，并在表示表格数据、配置或任何需要键到值映射的数据中找到常见应用。</strong></p>","autoDesc":true}');export{r as comp,d as data};
