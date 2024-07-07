import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-C3EhKTFl.js";const t={},p=e('<hr><h1 id="从链表中移除最后一个节点" tabindex="-1"><a class="header-anchor" href="#从链表中移除最后一个节点"><span>从链表中移除最后一个节点</span></a></h1><p>数据结构是任何编程语言的重要组成部分。Java在_Collection<code>&lt;T&gt;</code>_接口下提供了大多数数据结构。映射（Maps）也被认为是Java集合的一部分，但它们不实现这个接口。</p><p>在本教程中，我们将集中讨论链表数据结构。特别是，我们将讨论如何在单向链表中移除最后一个元素。</p><h3 id="单向链表与双向链表" tabindex="-1"><a class="header-anchor" href="#单向链表与双向链表"><span>单向链表与双向链表</span></a></h3><p>首先，我们定义一下单向链表和双向链表之间的区别。幸运的是，它们的名字非常具有描述性。双向链表中的每个节点都有指向下一个和前一个节点的引用，除了显而易见的头和尾：</p><p>单向链表有一个更简单的结构，只包含关于下一个节点的信息：</p><p>根据这些差异，我们在这些数据结构之间有一个权衡。单向链表消耗的空间更少，因为每个节点只包含一个额外的引用。同时，双向链表更方便于逆序遍历节点。<strong>这不仅可能在我们遍历列表时造成问题，也可能在搜索、插入和删除操作中造成问题。</strong></p><h3 id="从双向链表中移除最后一个元素" tabindex="-1"><a class="header-anchor" href="#从双向链表中移除最后一个元素"><span>从双向链表中移除最后一个元素</span></a></h3><p>因为双向链表包含有关其前一个邻居的信息，所以操作本身是微不足道的。我们将以Java标准_LinkedList<code>&lt;T&gt;</code>.<em>为例。让我们先检查_LinkedList.Node<code>&lt;E&gt;</code></em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Node</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span>```````` <span class="token punctuation">{</span>\n    <span class="token class-name">E</span> item<span class="token punctuation">;</span>\n    <span class="token class-name">LinkedList<span class="token punctuation">.</span>Node</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span>```````` next<span class="token punctuation">;</span>\n    <span class="token class-name">LinkedList<span class="token punctuation">.</span>Node</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span>```````` prev<span class="token punctuation">;</span>\n\n    <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token class-name">LinkedList<span class="token punctuation">.</span>Node</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span>```````` prev<span class="token punctuation">,</span> <span class="token class-name">E</span> element<span class="token punctuation">,</span> <span class="token class-name">LinkedList<span class="token punctuation">.</span>Node</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span>```````` next<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>item <span class="token operator">=</span> element<span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>next <span class="token operator">=</span> next<span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>prev <span class="token operator">=</span> prev<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它相当简单，但正如我们所看到的，有两个引用：<em>next_和_prev</em>。它们显著简化了我们的工作：</p><p>整个过程只需要几行代码，并且可以在常数时间内完成：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">E</span> <span class="token function">unlinkLast</span><span class="token punctuation">(</span><span class="token class-name">Node</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span>```````` l<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// assert l == last &amp;&amp; l != null;</span>\n    <span class="token class-name">E</span> element <span class="token operator">=</span> l<span class="token punctuation">.</span>item<span class="token punctuation">;</span>\n    <span class="token class-name">Node</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span>```````` prev <span class="token operator">=</span> l<span class="token punctuation">.</span>prev<span class="token punctuation">;</span>\n    l<span class="token punctuation">.</span>item <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n    l<span class="token punctuation">.</span>prev <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// help GC</span>\n    last <span class="token operator">=</span> prev<span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>prev <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        first <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        prev<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    size<span class="token operator">--</span><span class="token punctuation">;</span>\n    modCount<span class="token operator">++</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> element<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="从单向链表中移除最后一个元素" tabindex="-1"><a class="header-anchor" href="#从单向链表中移除最后一个元素"><span>从单向链表中移除最后一个元素</span></a></h3><p>从单向链表中移除最后一个元素的主要挑战是我们必须更新倒数第二个节点。然而，我们的节点没有向后的引用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Node</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>````  <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">T</span> element<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">Node</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>```` next<span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token class-name">T</span> element<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>element <span class="token operator">=</span> element<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，我们必须从开头一直遍历，以确定倒数第二个节点：</p><p>链表 单向链表 倒数第二个</p><p>代码也会比双向链表更复杂一些：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">removeLast</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        tail <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n        head <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Node</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">S</span><span class="token punctuation">&gt;</span></span>````` secondToLast <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n        <span class="token class-name">Node</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">S</span><span class="token punctuation">&gt;</span></span>````` last <span class="token operator">=</span> head<span class="token punctuation">;</span>\n        <span class="token keyword">while</span> <span class="token punctuation">(</span>last<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            secondToLast <span class="token operator">=</span> last<span class="token punctuation">;</span>\n            last <span class="token operator">=</span> last<span class="token punctuation">.</span>next<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        secondToLast<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    size<span class="token operator">--</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于我们必须遍历整个列表，操作需要线性时间，如果我们计划将我们的列表用作队列，这不是好事。<strong>一种优化策略是将_secondToLast_节点与_head_和_tail_一起存储：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SinglyLinkedList</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">S</span><span class="token punctuation">&gt;</span></span>````` <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">int</span> size<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">Node</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">S</span><span class="token punctuation">&gt;</span></span>````` head <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">Node</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">S</span><span class="token punctuation">&gt;</span></span>````` tail <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// 其他方法</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这不会为我们提供简单的迭代，但至少改善了_removeLast()_方法，使其类似于我们为双向链表看到的那一个。</p><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>不可能将数据结构分为好和坏。它们只是工具。<strong>因此，每个任务都需要一个特定的数据结构来实现其目标。</strong></p><p>单链表在移除最后一个元素时有一些性能问题，并且在其他操作上也不灵活，但同时，它们消耗的内存更少。双向链表没有限制，但我们为此付出的代价是更多的内存。</p><p>理解数据结构的底层实现至关重要，它允许我们为我们的需求选择最佳工具。像往常一样，本教程的所有代码都可以在GitHub上找到。</p>',28),o=[p];function c(l,i){return a(),s("div",null,o)}const r=n(t,[["render",c],["__file","2024-06-24-Removing the Last Node in a Linked List.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-Removing%20the%20Last%20Node%20in%20a%20Linked%20List.html","title":"从链表中移除最后一个节点","lang":"zh-CN","frontmatter":{"category":["数据结构","Java"],"tag":["链表","删除操作"],"head":[["meta",{"name":"keywords","content":"Java, 链表, 删除最后一个节点, 单向链表, 双向链表"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-Removing%20the%20Last%20Node%20in%20a%20Linked%20List.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"从链表中移除最后一个节点"}],["meta",{"property":"og:description","content":"从链表中移除最后一个节点 数据结构是任何编程语言的重要组成部分。Java在_Collection<T>_接口下提供了大多数数据结构。映射（Maps）也被认为是Java集合的一部分，但它们不实现这个接口。 在本教程中，我们将集中讨论链表数据结构。特别是，我们将讨论如何在单向链表中移除最后一个元素。 单向链表与双向链表 首先，我们定义一下单向链表和双向链表..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T20:27:07.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"链表"}],["meta",{"property":"article:tag","content":"删除操作"}],["meta",{"property":"article:modified_time","content":"2024-06-24T20:27:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"从链表中移除最后一个节点\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-06-24T20:27:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"从链表中移除最后一个节点 数据结构是任何编程语言的重要组成部分。Java在_Collection<T>_接口下提供了大多数数据结构。映射（Maps）也被认为是Java集合的一部分，但它们不实现这个接口。 在本教程中，我们将集中讨论链表数据结构。特别是，我们将讨论如何在单向链表中移除最后一个元素。 单向链表与双向链表 首先，我们定义一下单向链表和双向链表..."},"headers":[{"level":3,"title":"单向链表与双向链表","slug":"单向链表与双向链表","link":"#单向链表与双向链表","children":[]},{"level":3,"title":"从双向链表中移除最后一个元素","slug":"从双向链表中移除最后一个元素","link":"#从双向链表中移除最后一个元素","children":[]},{"level":3,"title":"从单向链表中移除最后一个元素","slug":"从单向链表中移除最后一个元素","link":"#从单向链表中移除最后一个元素","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1719260827000,"updatedTime":1719260827000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.36,"words":1008},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-Removing the Last Node in a Linked List.md","localizedDate":"2024年6月24日","excerpt":"<hr>\\n<h1>从链表中移除最后一个节点</h1>\\n<p>数据结构是任何编程语言的重要组成部分。Java在_Collection<code>&lt;T&gt;</code>_接口下提供了大多数数据结构。映射（Maps）也被认为是Java集合的一部分，但它们不实现这个接口。</p>\\n<p>在本教程中，我们将集中讨论链表数据结构。特别是，我们将讨论如何在单向链表中移除最后一个元素。</p>\\n<h3>单向链表与双向链表</h3>\\n<p>首先，我们定义一下单向链表和双向链表之间的区别。幸运的是，它们的名字非常具有描述性。双向链表中的每个节点都有指向下一个和前一个节点的引用，除了显而易见的头和尾：</p>","autoDesc":true}');export{r as comp,k as data};
