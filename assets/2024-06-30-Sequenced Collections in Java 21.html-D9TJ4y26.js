import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a}from"./app-CZdUP17Q.js";const i={},d=a('<h1 id="java-21-中的序列化集合" tabindex="-1"><a class="header-anchor" href="#java-21-中的序列化集合"><span>Java 21 中的序列化集合</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p><strong>Java 21</strong> 预计将在 2023 年 9 月发布，作为 Java 17 之后的下一个长期支持版本。在新特性中，我们可以发现对 Java 的集合框架进行了更新，称为 <strong>序列化集合</strong>。</p><p>序列化集合提案是一个引人注目的增强功能，承诺重新定义开发人员与集合的交互方式。这个特性在现有的层级结构中注入了新的接口，提供了一种无缝的机制，使用内置的默认方法访问集合的第一个和最后一个元素。此外，它还提供了支持获取集合的反向视图。</p><p>在本文中，我们将探讨这个新增强功能、它的潜在风险以及它带来的优点。</p><h2 id="_2-动机" tabindex="-1"><a class="header-anchor" href="#_2-动机"><span>2. 动机</span></a></h2><p>集合具有明确访问顺序的通用超类型缺失一直是问题和抱怨的反复来源。此外，<strong>缺乏统一的方法来访问首尾元素以及以相反顺序迭代</strong> 一直是 Java 集合框架的一个持续限制。</p><p>我们可以以列表（List）和双端队列（Deque）为例：它们都定义了访问顺序，但它们的公共超类型，集合（Collection），并没有。类似地，集合（Set）不定义访问顺序，但有些子类型，如有序集合（SortedSet）和链接哈希集合（LinkedHashSet），却定义了。因此，对访问顺序的支持分散在类型层级中，与访问顺序相关的操作要么不一致要么缺失。</p><p>为了说明不一致性，让我们比较不同集合类型访问首尾元素的方式：</p><table><thead><tr><th></th><th>访问第一个元素</th><th>访问最后一个元素</th></tr></thead><tbody><tr><td><strong>列表</strong></td><td>list.get(0)</td><td>list.get(list.size() – 1)</td></tr><tr><td><strong>双端队列</strong></td><td>deque.getFirst()</td><td>deque.getLast()</td></tr><tr><td><strong>有序集合</strong></td><td>sortedSet.first()</td><td>sortedSet.last()</td></tr><tr><td><strong>链接哈希集合</strong></td><td>linkedHashSet.iterator().next()</td><td>// 缺失</td></tr></tbody></table><p>尝试获取集合的反向视图时也会出现同样的情况。当从第一个元素到最后一个元素迭代集合的元素时，遵循了一个清晰和一致的模式，但以相反的方向这样做则面临挑战。</p><p>例如，处理可导航集合（NavigableSet）时，我们可以使用 descendingSet() 方法。对于双端队列，descendingIterator() 方法很有用。类似地，当处理列表时，listIterator() 方法效果良好。然而，对于链接哈希集合来说并非如此，因为它不支持反向迭代。</p><p><strong>所有这些差异导致了代码库的碎片化和复杂性，使得在 API 中表达某些有用的概念变得具有挑战性。</strong></p><h2 id="_3-新的-java-集合层级结构" tabindex="-1"><a class="header-anchor" href="#_3-新的-java-集合层级结构"><span>3. 新的 Java 集合层级结构</span></a></h2><p>这个新特性为序列化集合、序列化集合和序列化映射引入了三个新的接口，它们被添加到现有的集合层级结构中：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/09/new-hierarchy-diagram.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>这张图片是 <strong>JEP 431: Sequenced Collections</strong> 的官方文档的一部分（来源）。</p><h3 id="_3-1-sequencedcollection" tabindex="-1"><a class="header-anchor" href="#_3-1-sequencedcollection"><span>3.1. <em>SequencedCollection</em></span></a></h3><p>序列化集合是一个集合，其元素具有明确的访问顺序。新的 SequencedCollection 接口提供了在集合两端添加、检索或删除元素的方法，以及获取集合的反向有序视图的方法。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>interface SequencedCollection```````&lt;E&gt;``````` extends Collection```````&lt;E&gt;``````` {\n    // 新方法\n    SequencedCollection```````&lt;E&gt;``````` reversed();\n\n    // 从 Deque 升级的方法\n    void addFirst(E);\n    void addLast(E);\n\n    E getFirst();\n    E getLast();\n\n    E removeFirst();\n    E removeLast();\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了 reversed() 方法外，所有方法都是默认方法，提供了默认实现，并从 Deque 升级而来。reversed() 方法提供了原始集合的反向顺序视图。此外，对原始集合的任何修改都会在反向视图中可见。</p><p>add*() 和 remove*() 方法是可选的，在默认实现中抛出 UnsupportedOperationException，主要用于支持不可修改的集合和已经定义了排序顺序的集合的情况。get*() 和 remove*() 方法如果集合为空，则抛出 NoSuchElementException。</p><h3 id="_3-2-sequencedset" tabindex="-1"><a class="header-anchor" href="#_3-2-sequencedset"><span>3.2. <em>SequencedSet</em></span></a></h3><p>序列化集合可以定义为一个特殊的集合，它作为 SequencedCollection 运行，确保没有重复元素。SequencedSet 接口扩展了 SequencedCollection 并覆盖了它的 reversed() 方法。唯一的区别是 SequencedSet.reversed() 的返回类型是 SequencedSet。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>interface SequencedSet```````&lt;E&gt;``````` extends Set```````&lt;E&gt;```````, SequencedCollection```````&lt;E&gt;``````` {\n    // 协变覆盖\n    SequencedSet```````&lt;E&gt;``````` reversed();\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-sequencedmap" tabindex="-1"><a class="header-anchor" href="#_3-3-sequencedmap"><span>3.3. <em>SequencedMap</em></span></a></h3><p>序列化映射是一个映射，其条目具有明确的访问顺序。SequencedMap 不扩展 SequencedCollection 并提供自己的方法来操作集合两端的元素。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>interface SequencedMap```````&lt;K, V&gt;``````` extends Map```````&lt;K, V&gt;``````` {\n    // 新方法\n    SequencedMap```````&lt;K, V&gt;``````` reversed();\n    SequencedSet`&lt;K&gt;` sequencedKeySet();\n    SequencedCollection`&lt;V&gt;` sequencedValues();\n    SequencedSet&lt;Entry```````&lt;K, V&gt;```````&gt; sequencedEntrySet();\n\n    V putFirst(K, V);\n    V putLast(K, V);\n\n    // 从 NavigableMap 升级的方法\n    Entry```````&lt;K, V&gt;``````` firstEntry();\n    Entry```````&lt;K, V&gt;``````` lastEntry();\n    Entry```````&lt;K, V&gt;``````` pollFirstEntry();\n    Entry```````&lt;K, V&gt;``````` pollLastEntry();\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与 SequencedCollection 类似，put*() 方法对于不可修改的映射或已经定义了排序顺序的映射会抛出 UnsupportedOperationException。此外，在空映射上调用从 NavigableMap 升级的任一方法会导致抛出 NoSuchElementException。</p><h2 id="_4-风险" tabindex="-1"><a class="header-anchor" href="#_4-风险"><span>4. 风险</span></a></h2><p>新接口的引入不应该影响仅使用集合实现的代码。然而，如果在我们的代码库中定义了自定义集合类型，可能会出现几种冲突：</p><ul><li><strong>方法命名</strong>：新引入的方法可能会与现有类中的方法冲突。例如，如果我们有一个自定义的 List 接口实现，它已经定义了一个 getFirst() 方法，但返回类型与 SequencedCollection 中定义的 getFirst() 不同，那么在升级到 Java 21 时，它将创建源代码不兼容。</li><li><strong>协变覆盖</strong>：List 和 Deque 都提供了 reversed() 方法的协变覆盖，一个返回 List，另一个返回 Deque。因此，任何同时实现这两个接口的自定义集合在升级到 Java 21 时都会导致编译时错误，因为编译器无法选择一个而不是另一个。</li></ul><p>JDK-8266572 报告包含了不兼容性风险的完整分析。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>总之，<strong>序列化集合</strong> 标志着 Java 集合向前迈出了重要的一步。通过解决长期以来对具有明确访问顺序的统一处理方式的需求，Java 使开发人员能够更高效、更直观地工作。新接口建立了更清晰的结构和一致的行为，从而产生了更强大、更易读的代码。</p><p>如常，源代码可在 GitHub 上获取。</p>',36),l=[d];function s(r,c){return n(),t("div",null,l)}const u=e(i,[["render",s],["__file","2024-06-30-Sequenced Collections in Java 21.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-Sequenced%20Collections%20in%20Java%2021.html","title":"Java 21 中的序列化集合","lang":"zh-CN","frontmatter":{"date":"2023-09-01T00:00:00.000Z","category":["Java","编程"],"tag":["Java 21","序列化集合"],"head":[["meta",{"name":"keywords","content":"Java 21, 序列化集合, 集合框架, 编程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-Sequenced%20Collections%20in%20Java%2021.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 21 中的序列化集合"}],["meta",{"property":"og:description","content":"Java 21 中的序列化集合 1. 概述 Java 21 预计将在 2023 年 9 月发布，作为 Java 17 之后的下一个长期支持版本。在新特性中，我们可以发现对 Java 的集合框架进行了更新，称为 序列化集合。 序列化集合提案是一个引人注目的增强功能，承诺重新定义开发人员与集合的交互方式。这个特性在现有的层级结构中注入了新的接口，提供了一种..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/09/new-hierarchy-diagram.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T10:53:22.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 21"}],["meta",{"property":"article:tag","content":"序列化集合"}],["meta",{"property":"article:published_time","content":"2023-09-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T10:53:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 21 中的序列化集合\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/09/new-hierarchy-diagram.png\\"],\\"datePublished\\":\\"2023-09-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T10:53:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 21 中的序列化集合 1. 概述 Java 21 预计将在 2023 年 9 月发布，作为 Java 17 之后的下一个长期支持版本。在新特性中，我们可以发现对 Java 的集合框架进行了更新，称为 序列化集合。 序列化集合提案是一个引人注目的增强功能，承诺重新定义开发人员与集合的交互方式。这个特性在现有的层级结构中注入了新的接口，提供了一种..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 动机","slug":"_2-动机","link":"#_2-动机","children":[]},{"level":2,"title":"3. 新的 Java 集合层级结构","slug":"_3-新的-java-集合层级结构","link":"#_3-新的-java-集合层级结构","children":[{"level":3,"title":"3.1. SequencedCollection","slug":"_3-1-sequencedcollection","link":"#_3-1-sequencedcollection","children":[]},{"level":3,"title":"3.2. SequencedSet","slug":"_3-2-sequencedset","link":"#_3-2-sequencedset","children":[]},{"level":3,"title":"3.3. SequencedMap","slug":"_3-3-sequencedmap","link":"#_3-3-sequencedmap","children":[]}]},{"level":2,"title":"4. 风险","slug":"_4-风险","link":"#_4-风险","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719744802000,"updatedTime":1719744802000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.33,"words":1600},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-Sequenced Collections in Java 21.md","localizedDate":"2023年9月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p><strong>Java 21</strong> 预计将在 2023 年 9 月发布，作为 Java 17 之后的下一个长期支持版本。在新特性中，我们可以发现对 Java 的集合框架进行了更新，称为 <strong>序列化集合</strong>。</p>\\n<p>序列化集合提案是一个引人注目的增强功能，承诺重新定义开发人员与集合的交互方式。这个特性在现有的层级结构中注入了新的接口，提供了一种无缝的机制，使用内置的默认方法访问集合的第一个和最后一个元素。此外，它还提供了支持获取集合的反向视图。</p>\\n<p>在本文中，我们将探讨这个新增强功能、它的潜在风险以及它带来的优点。</p>","autoDesc":true}');export{u as comp,v as data};
