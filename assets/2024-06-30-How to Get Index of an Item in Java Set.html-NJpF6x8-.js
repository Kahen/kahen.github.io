import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-yRPSFQJx.js";const e={},p=t('<hr><h1 id="如何在java集合中获取元素的索引" tabindex="-1"><a class="header-anchor" href="#如何在java集合中获取元素的索引"><span>如何在Java集合中获取元素的索引</span></a></h1><p>在本教程中，我们将探讨如何在Java的_Set_中获取一个项目的索引。Java中的_Set_不允许有重复元素，一些重要的_Set_接口实现包括_HashSet_、<em>TreeSet_和_LinkedHashSet</em>。</p><h2 id="_2-java中的有序、无序和排序集合" tabindex="-1"><a class="header-anchor" href="#_2-java中的有序、无序和排序集合"><span>2. Java中的有序、无序和排序集合</span></a></h2><p>在我们查看问题陈述之前，让我们先看看Java中不同类型的集合之间的区别：</p><ul><li>有序集合</li><li>无序集合</li><li>排序集合</li></ul><p>有序集合维护其元素的插入顺序。元素按照它们被插入的顺序存储，并且可以通过它们的位置来访问。<strong>这些集合通常提供一个_get(index)_接口来检索特定索引处的元素。</strong> 实现_List_接口的类，如_ArrayList_、_LinkedList_等，是有序集合的例子。</p><p>另一方面，Java中的无序集合不保证任何特定的遍历顺序。<strong>元素存储的顺序取决于支持它的底层数据结构。无序集合中的元素通常通过它们的值而不是索引来访问。</strong> _HashSet_和_HashMap_是无序集合的一些例子。</p><p><strong>排序集合是一种特殊的集合类型，遍历集合将按照元素的自然顺序或根据指定的_Comparator_来产生元素。</strong> _TreeSets_和_TreeMaps_是排序集合的例子。</p><h2 id="_3-为什么-set-不提供-indexof" tabindex="-1"><a class="header-anchor" href="#_3-为什么-set-不提供-indexof"><span>3. 为什么_Set_不提供_indexOf()_</span></a></h2><p>Java中的_Set_是无序集合。它们具有以下重要特征：</p><ul><li>保证其元素的唯一性</li><li>可以高效地确认元素的存在，时间复杂度为常数</li></ul><p>_Set_有不同的变体。<em>HashSet_基于基于哈希的机存储其元素（内部使用_HashMap</em>），而_TreeSet_将使用默认或自定义比较器来存储和排序其元素。</p><p><strong>_Set_还需要在保证唯一性方面高效，这意味着存储元素的效率比保持它们的顺序更重要。与_List_不同，直接获取_Set_中项目的索引并不简单。</strong></p><h2 id="_4-问题陈述" tabindex="-1"><a class="header-anchor" href="#_4-问题陈述"><span>4. 问题陈述</span></a></h2><p>我们在这里要解决的问题是找到一个给定_Set_中元素的索引。<strong>该元素的索引应该始终相同，并且在每次查询时不应改变。</strong> 如果集合中缺少该元素，我们应该返回-1。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>示例 <span class="token number">1</span><span class="token operator">:</span>\n输入集合 <span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span>\n查询：<span class="token function">getIndexOf</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>\n输出：<span class="token number">0</span>\n查询：<span class="token function">getIndexOf</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>\n输出：<span class="token number">4</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>示例 <span class="token number">2</span><span class="token operator">:</span>\n输入集合 <span class="token punctuation">[</span><span class="token string">&quot;Java&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Scala&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Python&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Ruby&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Go&quot;</span><span class="token punctuation">]</span>\n查询：<span class="token function">getIndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;Scala&quot;</span><span class="token punctuation">)</span>\n输出：<span class="token number">1</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-编写获取索引的工具方法" tabindex="-1"><a class="header-anchor" href="#_5-编写获取索引的工具方法"><span>5. 编写获取索引的工具方法</span></a></h2><h3 id="_5-1-使用迭代器" tabindex="-1"><a class="header-anchor" href="#_5-1-使用迭代器"><span>5.1. 使用迭代器</span></a></h3><p>_Iterator<code>&lt;E&gt;</code><em>是一个对象，允许我们一次遍历集合中的一个元素，例如_List</em>、<em>Set_或_Map</em>。这是一种有序的方法来遍历元素，可以用来解决我们的问题。</p><p>我们首先从_Set_获取一个迭代器实例，并使用它来迭代直到我们找到我们正在寻找的元素。我们还跟踪步骤，并在到达我们想要的元素时中断，索引如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getIndexUsingIterator</span><span class="token punctuation">(</span><span class="token class-name">Set</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span>`````` set<span class="token punctuation">,</span> <span class="token class-name">E</span> element<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Iterator</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span>`````` iterator <span class="token operator">=</span> set<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n    <span class="token keyword">while</span> <span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>element<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> index<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        index<span class="token operator">++</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-使用-for-each-循环" tabindex="-1"><a class="header-anchor" href="#_5-2-使用-for-each-循环"><span>5.2. 使用_For-Each_循环</span></a></h3><p>我们也可以同样使用_for-each_循环来遍历提供的集合：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getIndexUsingForEach</span><span class="token punctuation">(</span><span class="token class-name">Set</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span>`````` set<span class="token punctuation">,</span> <span class="token class-name">E</span> element<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">E</span> current <span class="token operator">:</span> set<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>element<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>current<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> index<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        index<span class="token operator">++</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们结合使用这些工具方法和我们使用的_Set_对象。这些方法每次调用时都以_O(n)_，或线性时间运行，其中_n_是集合的大小。它不需要任何额外的空间。</strong></p><p>我们这里的实现将始终返回相同的索引，无论我们调用_getIndexUsingIterator()_或_getIndexUsingForEach()_方法多少次。这验证了解决方案的正确性。</p><p>然而，如果需要将此方法的索引输出与元素的插入顺序匹配，我们需要更深入地研究。</p><h3 id="_5-3-在不同类型的集合上应用实现" tabindex="-1"><a class="header-anchor" href="#_5-3-在不同类型的集合上应用实现"><span>5.3. 在不同类型的集合上应用实现</span></a></h3><p>请注意，使用迭代器遍历得到的索引可能与插入顺序不匹配，特别是如果我们使用_HashSet_作为源：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Set</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```` set <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nset<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nset<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// 添加更多元素</span>\n<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> integerIndexOfElementsInSet<span class="token punctuation">.</span><span class="token function">getIndexUsingIterator</span><span class="token punctuation">(</span>set<span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管我们将100作为第一个元素插入，但我们从我们的实现中得到的索引是2。<strong>迭代器将按其在_HashSet_中存储的顺序遍历元素，而不是插入的顺序。</strong></p><p>要解决这个问题，我们可以将我们的_HashSet_替换为_LinkedHashSet_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Set</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```` set <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nset<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nset<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// 添加更多元素</span>\n<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> integerIndexOfElementsInSet<span class="token punctuation">.</span><span class="token function">getIndexUsingIterator</span><span class="token punctuation">(</span>set<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>_LinkedHashSet_由_LinkedList_支持，它存储元素并因此维护元素的顺序。</strong></p><p>同样，当我们使用_TreeSet_时，我们从我们的实现中得到的索引基于_Set_中元素的自然排序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Set</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```` set <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nset<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nset<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nset<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// 添加更多元素</span>\n<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> integerIndexOfElementsInSet<span class="token punctuation">.</span><span class="token function">getIndexUsingIterator</span><span class="token punctuation">(</span>set<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> integerIndexOfElementsInSet<span class="token punctuation">.</span><span class="token function">getIndexUsingIterator</span><span class="token punctuation">(</span>set<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这一部分中，我们探讨了如何在_Set_中找到元素的索引，以及如何使用_LinkedHashSet_正确地基于插入顺序找到索引。</p><h2 id="_6-编写自定义-linkedhashset-实现" tabindex="-1"><a class="header-anchor" href="#_6-编写自定义-linkedhashset-实现"><span>6. 编写自定义_LinkedHashSet_实现</span></a></h2><p>我们也可以编写一个自定义的_LinkedHashSet_类在Java中来补充其功能以获取元素的索引。尽管仅为了添加一个实用方法而创建一个子类是高度不必要的，但这仍然是一个选项：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">InsertionIndexAwareSet</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span>`````` <span class="token keyword">extends</span> <span class="token class-name">LinkedHashSet</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span>`````` <span class="token punctuation">{</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getIndexOf</span><span class="token punctuation">(</span><span class="token class-name">E</span> element<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">E</span> current <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span>current<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token keyword">return</span> index<span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n            index<span class="token operator">++</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们可以创建我们的自定义类的实例，并调用_getIndexOf()_方法来获取索引：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenIndexAwareSetWithStrings_whenIndexOfElement_thenGivesIndex</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">InsertionIndexAwareSet</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>` set <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">InsertionIndexAwareSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Go&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Java&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Scala&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Python&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> set<span class="token punctuation">.</span><span class="token function">getIndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;Go&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> set<span class="token punctuation">.</span><span class="token function">getIndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;Scala&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> set<span class="token punctuation">.</span><span class="token function">getIndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;C++&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-使用-apache-commons-collections" tabindex="-1"><a class="header-anchor" href="#_7-使用-apache-commons-collections"><span>7. 使用_Apache Commons Collections_</span></a></h2><p>最后，让我们也看看如何使用_Apache Commons Collections_库来解决我们的问题。_Apache Commons Collections_库提供了一组广泛的实用方法，帮助我们处理和扩展Java Collections API的功能。</p><p>首先，我们需要添加Maven依赖项以在我们的代码中使用：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`org.apache.commons`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`commons-collections4`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`4.4`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将在这里使用_ListOrderedSet_类。_ListOrderedSet_实现了_Set_接口，并使用装饰器模式提供额外的好处，即保留元素的插入顺序。如果我们向集合中添加重复的元素，元素保持在其原始位置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenListOrderedSet_whenIndexOfElement_thenGivesIndex</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ListOrderedSet</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```` set <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListOrderedSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> set<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> set<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在本文中，我们探讨了在_Set_中找到元素索引的不同方法。我们首先探讨了为什么在_Set_中找到元素的索引是困难的，以及如何创建我们的_LinkedHashSet_版本来实现结果。我们最后探讨了如何使用Apache库来实现相同的结果。</p><p>像往常一样，本教程中展示的所有代码示例都可以在GitHub上找到。</p>',53),o=[p];function c(l,i){return a(),s("div",null,o)}const r=n(e,[["render",c],["__file","2024-06-30-How to Get Index of an Item in Java Set.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-How%20to%20Get%20Index%20of%20an%20Item%20in%20Java%20Set.html","title":"如何在Java集合中获取元素的索引","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Collections"],"tag":["Java","Set","Index"],"head":[["meta",{"name":"keywords","content":"Java, Set, Index, find index in set, Java Set element index"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-How%20to%20Get%20Index%20of%20an%20Item%20in%20Java%20Set.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Java集合中获取元素的索引"}],["meta",{"property":"og:description","content":"如何在Java集合中获取元素的索引 在本教程中，我们将探讨如何在Java的_Set_中获取一个项目的索引。Java中的_Set_不允许有重复元素，一些重要的_Set_接口实现包括_HashSet_、TreeSet_和_LinkedHashSet。 2. Java中的有序、无序和排序集合 在我们查看问题陈述之前，让我们先看看Java中不同类型的集合之间的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T12:47:05.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Set"}],["meta",{"property":"article:tag","content":"Index"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T12:47:05.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Java集合中获取元素的索引\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T12:47:05.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Java集合中获取元素的索引 在本教程中，我们将探讨如何在Java的_Set_中获取一个项目的索引。Java中的_Set_不允许有重复元素，一些重要的_Set_接口实现包括_HashSet_、TreeSet_和_LinkedHashSet。 2. Java中的有序、无序和排序集合 在我们查看问题陈述之前，让我们先看看Java中不同类型的集合之间的..."},"headers":[{"level":2,"title":"2. Java中的有序、无序和排序集合","slug":"_2-java中的有序、无序和排序集合","link":"#_2-java中的有序、无序和排序集合","children":[]},{"level":2,"title":"3. 为什么_Set_不提供_indexOf()_","slug":"_3-为什么-set-不提供-indexof","link":"#_3-为什么-set-不提供-indexof","children":[]},{"level":2,"title":"4. 问题陈述","slug":"_4-问题陈述","link":"#_4-问题陈述","children":[]},{"level":2,"title":"5. 编写获取索引的工具方法","slug":"_5-编写获取索引的工具方法","link":"#_5-编写获取索引的工具方法","children":[{"level":3,"title":"5.1. 使用迭代器","slug":"_5-1-使用迭代器","link":"#_5-1-使用迭代器","children":[]},{"level":3,"title":"5.2. 使用_For-Each_循环","slug":"_5-2-使用-for-each-循环","link":"#_5-2-使用-for-each-循环","children":[]},{"level":3,"title":"5.3. 在不同类型的集合上应用实现","slug":"_5-3-在不同类型的集合上应用实现","link":"#_5-3-在不同类型的集合上应用实现","children":[]}]},{"level":2,"title":"6. 编写自定义_LinkedHashSet_实现","slug":"_6-编写自定义-linkedhashset-实现","link":"#_6-编写自定义-linkedhashset-实现","children":[]},{"level":2,"title":"7. 使用_Apache Commons Collections_","slug":"_7-使用-apache-commons-collections","link":"#_7-使用-apache-commons-collections","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1719751625000,"updatedTime":1719751625000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.91,"words":1772},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-How to Get Index of an Item in Java Set.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>如何在Java集合中获取元素的索引</h1>\\n<p>在本教程中，我们将探讨如何在Java的_Set_中获取一个项目的索引。Java中的_Set_不允许有重复元素，一些重要的_Set_接口实现包括_HashSet_、<em>TreeSet_和_LinkedHashSet</em>。</p>\\n<h2>2. Java中的有序、无序和排序集合</h2>\\n<p>在我们查看问题陈述之前，让我们先看看Java中不同类型的集合之间的区别：</p>\\n<ul>\\n<li>有序集合</li>\\n<li>无序集合</li>\\n<li>排序集合</li>\\n</ul>\\n<p>有序集合维护其元素的插入顺序。元素按照它们被插入的顺序存储，并且可以通过它们的位置来访问。<strong>这些集合通常提供一个_get(index)_接口来检索特定索引处的元素。</strong> 实现_List_接口的类，如_ArrayList_、_LinkedList_等，是有序集合的例子。</p>","autoDesc":true}');export{r as comp,d as data};
