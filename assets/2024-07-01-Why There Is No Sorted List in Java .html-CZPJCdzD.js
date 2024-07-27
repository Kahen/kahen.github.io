import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CBerKIce.js";const e={},p=t('<h1 id="java中为什么没有内置的排序列表" tabindex="-1"><a class="header-anchor" href="#java中为什么没有内置的排序列表"><span>Java中为什么没有内置的排序列表？</span></a></h1><p>Java提供了一个丰富的集合框架，其中包括多种接口和类，以满足不同的数据结构需求。然而，它并没有提供内置的排序列表实现。在本文中，我们将探讨这种缺失背后的原因，比较插入时排序和按需排序的概念。我们还将讨论插入时排序如何可能破坏_List_接口的契约，并探索实现排序行为的替代方法。</p><h2 id="_2-插入时排序与按需排序" tabindex="-1"><a class="header-anchor" href="#_2-插入时排序与按需排序"><span>2. 插入时排序与按需排序</span></a></h2><p>要理解为什么Java中没有排序列表，我们首先需要区分插入时排序和按需排序。</p><h3 id="_2-1-插入时排序" tabindex="-1"><a class="header-anchor" href="#_2-1-插入时排序"><span>2.1. 插入时排序</span></a></h3><p><strong>插入时排序涉及在插入时立即重新排列元素，确保每次添加后都保持排序顺序。</strong> 一些数据结构就是这样表现的。通常，它们的实现基于树结构，最著名的是_TreeSet_和_TreeMap_。</p><p>插入时排序实现的主要优点是，从这种结构中读取数据的效率。写入数据的成本更高，因为我们需要在结构中找到正确的位置，有时甚至需要重新排列现有数据。</p><p>这种成本可能比每次读取时对整个未排序集合进行排序的成本要小得多。然而，具有多个排序条件的插入时排序要复杂得多，涉及到跟踪多个索引树结构，使得保存更加复杂和昂贵。</p><h3 id="_2-2-按需排序" tabindex="-1"><a class="header-anchor" href="#_2-2-按需排序"><span>2.2. 按需排序</span></a></h3><p>另一方面，<strong>按需排序将排序操作推迟到用户明确请求时才执行。</strong> 排序读取成本较高，因为我们必须每次都对整个集合进行排序。</p><p>优点是，保存数据非常便宜，底层数据结构可以更简单——例如，支持_ArrayList_的数组。此外，我们可以每次根据不同的条件进行排序，甚至可以选择不进行排序。</p><h2 id="_3-插入时排序如何破坏-list-契约" tabindex="-1"><a class="header-anchor" href="#_3-插入时排序如何破坏-list-契约"><span>3. 插入时排序如何破坏_List_契约</span></a></h2><p>插入时排序将破坏_List_接口的契约。<strong>_List_接口的契约规定，元素应该保持它们被插入的顺序，允许有重复项。</strong> 插入时排序将通过重新排列元素来违反这一契约。这种顺序对于许多依赖元素顺序的列表操作和算法非常重要。</p><p>每次插入时对列表进行排序，我们将改变元素的顺序，并可能破坏_List_接口中定义的其他方法的预期行为。</p><h2 id="_4-实现插入时排序" tabindex="-1"><a class="header-anchor" href="#_4-实现插入时排序"><span>4. 实现插入时排序</span></a></h2><p>在大多数情况下，我们不应该实现我们自己的数据结构来实现插入时排序。已经有集合很好地做到了这一点，尽管它们基于树数据结构，而不是线性列表。</p><h3 id="_4-1-使用自然顺序的-treeset" tabindex="-1"><a class="header-anchor" href="#_4-1-使用自然顺序的-treeset"><span>4.1. 使用自然顺序的_TreeSet_</span></a></h3><p>如果我们对自然顺序感到满意并想忽略重复项，我们可以创建一个默认构造函数的_TreeSet_实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">TreeSet</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```` sortedSet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nsortedSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nsortedSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nsortedSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nsortedSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>sortedSet<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出: [1, 2, 5, 8]</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-使用自定义顺序的-treeset" tabindex="-1"><a class="header-anchor" href="#_4-2-使用自定义顺序的-treeset"><span>4.2. 使用自定义顺序的_TreeSet_</span></a></h3><p>我们还可以使用自定义_Comparator_来实现自定义顺序。假设我们有一组字符串，我们想根据它们的最后一个字母对它们进行排序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Comparator</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` customComparator <span class="token operator">=</span> <span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">comparing</span><span class="token punctuation">(</span>str <span class="token operator">-&gt;</span> str<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>str<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">TreeSet</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` sortedSet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>customComparator<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nsortedSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Canada&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nsortedSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Germany&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nsortedSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Japan&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nsortedSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Sweden&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nsortedSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;India&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>sortedSet<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出: [India, Canada, Sweden, Japan, Germany]</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-实现按需排序" tabindex="-1"><a class="header-anchor" href="#_5-实现按需排序"><span>5. 实现按需排序</span></a></h2><p>如果我们想使用_List_接口，我们可以按需实现排序。我们可以通过两种方式做到这一点：就地排序或创建一个新的排序列表。</p><h3 id="_5-1-就地排序" tabindex="-1"><a class="header-anchor" href="#_5-1-就地排序"><span>5.1. 就地排序</span></a></h3><p>要就地对列表进行排序，我们将使用_Collections_类的_sort_方法。它将改变我们的列表，改变元素的顺序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```` numbers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nnumbers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nnumbers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nnumbers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nnumbers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;排序前: &quot;</span> <span class="token operator">+</span> numbers<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出: 排序前: [5, 2, 8, 1]</span>\n\n<span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>numbers<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;排序后: &quot;</span> <span class="token operator">+</span> numbers<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出: 排序后: [1, 2, 5, 8]</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就地排序<strong>通常更快，更节省内存，但按定义，它需要在一个可变集合上工作</strong>，这并不总是可取或可能的。</p><h3 id="_5-2-不改变原始集合的排序" tabindex="-1"><a class="header-anchor" href="#_5-2-不改变原始集合的排序"><span>5.2. 不改变原始集合的排序</span></a></h3><p>我们也可以在不改变原始集合的情况下对列表进行排序。为此，我们将<strong>从列表创建一个流，对其进行排序，然后将其收集到一个新的列表中</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```` sortedList <span class="token operator">=</span> numbers<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">sorted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;排序后: &quot;</span> <span class="token operator">+</span> sortedList<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出: 排序后: [1, 2, 5, 8]</span>\n<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;原始列表: &quot;</span> <span class="token operator">+</span> numbers<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出: 原始列表: [5, 2, 8, 1]</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还可以使用前几段的知识，并且<strong>不是将流中的元素收集到一个新的列表中，而是将其收集到一个_TreeSet_中</strong>。这样，我们就不需要显式地对其进行排序——_TreeSet_的实现会为我们做这件事：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">TreeSet</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```` sortedSet <span class="token operator">=</span> numbers<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toCollection</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">TreeSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;排序后: &quot;</span> <span class="token operator">+</span> sortedSet<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出: 排序后: [1, 2, 5, 8]</span>\n<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;原始列表: &quot;</span> <span class="token operator">+</span> numbers<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出: 原始列表: [5, 2, 8, 1]</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-总结" tabindex="-1"><a class="header-anchor" href="#_6-总结"><span>6. 总结</span></a></h2><p>在本文中，我们了解到Java集合框架中缺少内置排序列表实现是一个经过深思熟虑的决定，它维护了_List_接口的契约。然后，我们探讨了如果我们想要实现插入时排序，可以使用哪些数据结构。</p><p>最后，我们还学习了如果决定使用_List_接口，如何按需进行排序。</p>',37),o=[p];function c(l,i){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-01-Why There Is No Sorted List in Java .html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-Why%20There%20Is%20No%20Sorted%20List%20in%20Java%20.html","title":"Java中为什么没有内置的排序列表？","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Collection Framework"],"tag":["Java","Sorted List","List Interface"],"head":[["meta",{"name":"keywords","content":"Java, Collection Framework, Sorted List, List Interface"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-Why%20There%20Is%20No%20Sorted%20List%20in%20Java%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中为什么没有内置的排序列表？"}],["meta",{"property":"og:description","content":"Java中为什么没有内置的排序列表？ Java提供了一个丰富的集合框架，其中包括多种接口和类，以满足不同的数据结构需求。然而，它并没有提供内置的排序列表实现。在本文中，我们将探讨这种缺失背后的原因，比较插入时排序和按需排序的概念。我们还将讨论插入时排序如何可能破坏_List_接口的契约，并探索实现排序行为的替代方法。 2. 插入时排序与按需排序 要理解..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T22:54:11.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Sorted List"}],["meta",{"property":"article:tag","content":"List Interface"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T22:54:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中为什么没有内置的排序列表？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T22:54:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中为什么没有内置的排序列表？ Java提供了一个丰富的集合框架，其中包括多种接口和类，以满足不同的数据结构需求。然而，它并没有提供内置的排序列表实现。在本文中，我们将探讨这种缺失背后的原因，比较插入时排序和按需排序的概念。我们还将讨论插入时排序如何可能破坏_List_接口的契约，并探索实现排序行为的替代方法。 2. 插入时排序与按需排序 要理解..."},"headers":[{"level":2,"title":"2. 插入时排序与按需排序","slug":"_2-插入时排序与按需排序","link":"#_2-插入时排序与按需排序","children":[{"level":3,"title":"2.1. 插入时排序","slug":"_2-1-插入时排序","link":"#_2-1-插入时排序","children":[]},{"level":3,"title":"2.2. 按需排序","slug":"_2-2-按需排序","link":"#_2-2-按需排序","children":[]}]},{"level":2,"title":"3. 插入时排序如何破坏_List_契约","slug":"_3-插入时排序如何破坏-list-契约","link":"#_3-插入时排序如何破坏-list-契约","children":[]},{"level":2,"title":"4. 实现插入时排序","slug":"_4-实现插入时排序","link":"#_4-实现插入时排序","children":[{"level":3,"title":"4.1. 使用自然顺序的_TreeSet_","slug":"_4-1-使用自然顺序的-treeset","link":"#_4-1-使用自然顺序的-treeset","children":[]},{"level":3,"title":"4.2. 使用自定义顺序的_TreeSet_","slug":"_4-2-使用自定义顺序的-treeset","link":"#_4-2-使用自定义顺序的-treeset","children":[]}]},{"level":2,"title":"5. 实现按需排序","slug":"_5-实现按需排序","link":"#_5-实现按需排序","children":[{"level":3,"title":"5.1. 就地排序","slug":"_5-1-就地排序","link":"#_5-1-就地排序","children":[]},{"level":3,"title":"5.2. 不改变原始集合的排序","slug":"_5-2-不改变原始集合的排序","link":"#_5-2-不改变原始集合的排序","children":[]}]},{"level":2,"title":"6. 总结","slug":"_6-总结","link":"#_6-总结","children":[]}],"git":{"createdTime":1719874451000,"updatedTime":1719874451000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.77,"words":1430},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-Why There Is No Sorted List in Java .md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Java提供了一个丰富的集合框架，其中包括多种接口和类，以满足不同的数据结构需求。然而，它并没有提供内置的排序列表实现。在本文中，我们将探讨这种缺失背后的原因，比较插入时排序和按需排序的概念。我们还将讨论插入时排序如何可能破坏_List_接口的契约，并探索实现排序行为的替代方法。</p>\\n<h2>2. 插入时排序与按需排序</h2>\\n<p>要理解为什么Java中没有排序列表，我们首先需要区分插入时排序和按需排序。</p>\\n<h3>2.1. 插入时排序</h3>\\n<p><strong>插入时排序涉及在插入时立即重新排列元素，确保每次添加后都保持排序顺序。</strong> 一些数据结构就是这样表现的。通常，它们的实现基于树结构，最著名的是_TreeSet_和_TreeMap_。</p>","autoDesc":true}');export{k as comp,d as data};
