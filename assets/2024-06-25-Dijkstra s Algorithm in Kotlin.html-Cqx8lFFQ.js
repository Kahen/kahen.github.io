import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-C2EXT5sr.js";const p={},o=t('<hr><h1 id="kotlin中实现迪杰斯特拉算法" tabindex="-1"><a class="header-anchor" href="#kotlin中实现迪杰斯特拉算法"><span>Kotlin中实现迪杰斯特拉算法</span></a></h1><p>在本教程中，我们将学习如何在Kotlin中实现迪杰斯特拉算法。它是一种在加权图中找出从起始节点到所有其他节点的最短路径的解决方案。与适用于无权图的广度优先搜索（BFS）不同，迪杰斯特拉算法在有加权边的环境中表现出色，根据累积权重或距离优化路径。本文深入探讨了在Kotlin中实现迪杰斯特拉算法，展示了该语言简洁的语法和强大的功能。</p><h3 id="_2-理解迪杰斯特拉算法" tabindex="-1"><a class="header-anchor" href="#_2-理解迪杰斯特拉算法"><span>2. 理解迪杰斯特拉算法</span></a></h3><p>迪杰斯特拉算法擅长在有加权边的图中找到从起始节点到所有其他节点的最短路径。它将起始节点的距离初始化为零，其他节点的距离初始化为无穷大，迭代更新距离，并按距离的升序处理节点。</p><p>迪杰斯特拉算法在包含正权重的有向和无向图中表现最佳。它不适用于包含负边权重的图，因为这些可能导致路径长度计算的不一致，可能引起无限循环。此外，算法在包含环或断开的段的图中可能不会按预期执行，需要额外的检查或修改以处理这些复杂性。</p><h3 id="_3-在kotlin中实现迪杰斯特拉算法" tabindex="-1"><a class="header-anchor" href="#_3-在kotlin中实现迪杰斯特拉算法"><span>3. 在Kotlin中实现迪杰斯特拉算法</span></a></h3><p>迪杰斯特拉算法从将起始节点的距离设置为零，其他所有节点的距离设置为无穷大开始。它迭代地选择未访问的、从起始节点出发已知距离最小的节点，更新其相邻节点的距离，并重复此过程，直到所有节点都被访问。这种对下一个最近节点的优先级与BFS逐层探索相邻节点形成鲜明对比，需要一个优先队列来有效管理节点处理。</p><h4 id="_3-1-定义图" tabindex="-1"><a class="header-anchor" href="#_3-1-定义图"><span>3.1. 定义图</span></a></h4><p>要实现迪杰斯特拉算法，我们首先需要一个有加权边的图。我们在Kotlin中使用邻接表来表示这个图，其中每个节点与一个列表相关联。列表中的每个对包含一个连接的节点和它们之间边的权重。下面是这样一个图的视觉表示：</p><p>基于这种结构，我们可以在Kotlin中这样定义我们的图：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> graph <span class="token operator">=</span> mapOf``<span class="token operator">&lt;</span>Int<span class="token punctuation">,</span> List<span class="token operator">&lt;</span>Pair````<span class="token operator">&lt;</span>Int<span class="token punctuation">,</span> Int<span class="token operator">&gt;</span>``````<span class="token operator">&gt;</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>\n    <span class="token number">1</span> <span class="token keyword">to</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token function">Pair</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">Pair</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token number">2</span> <span class="token keyword">to</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token function">Pair</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token number">3</span> <span class="token keyword">to</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token function">Pair</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token number">4</span> <span class="token keyword">to</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token function">Pair</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">Pair</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token number">5</span> <span class="token keyword">to</span> <span class="token function">emptyList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token number">6</span> <span class="token keyword">to</span> <span class="token function">emptyList</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个邻接表允许我们高效地存储和访问图的连接和权重。这是我们实现迪杰斯特拉算法的基础。</p><h4 id="_3-2-算法" tabindex="-1"><a class="header-anchor" href="#_3-2-算法"><span>3.2. 算法</span></a></h4><p>有了我们的图结构，我们深入到算法中。一个优先队列和一个距离映射是关键，存储发现的最短距离和控制节点处理顺序：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">dijkstra</span><span class="token punctuation">(</span>graph<span class="token operator">:</span> Map``<span class="token operator">&lt;</span>Int<span class="token punctuation">,</span> List<span class="token operator">&lt;</span>Pair````<span class="token operator">&lt;</span>Int<span class="token punctuation">,</span> Int<span class="token operator">&gt;</span>``````<span class="token operator">&gt;</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> start<span class="token operator">:</span> Int<span class="token punctuation">)</span><span class="token operator">:</span> Map````<span class="token operator">&lt;</span>Int<span class="token punctuation">,</span> Int<span class="token operator">&gt;</span>```` <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> distances <span class="token operator">=</span> mutableMapOf````<span class="token operator">&lt;</span>Int<span class="token punctuation">,</span> Int<span class="token operator">&gt;</span>````<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withDefault</span> <span class="token punctuation">{</span> Int<span class="token punctuation">.</span>MAX_VALUE <span class="token punctuation">}</span>\n    <span class="token keyword">val</span> priorityQueue <span class="token operator">=</span> PriorityQueue<span class="token operator">&lt;</span>Pair````<span class="token operator">&lt;</span>Int<span class="token punctuation">,</span> Int<span class="token operator">&gt;</span>````<span class="token operator">&gt;</span><span class="token punctuation">(</span>compareBy <span class="token punctuation">{</span> it<span class="token punctuation">.</span>second <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">apply</span> <span class="token punctuation">{</span> <span class="token function">add</span><span class="token punctuation">(</span>start <span class="token keyword">to</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>\n\n    distances<span class="token punctuation">[</span>start<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span>\n\n    <span class="token keyword">while</span> <span class="token punctuation">(</span>priorityQueue<span class="token punctuation">.</span><span class="token function">isNotEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">val</span> <span class="token punctuation">(</span>node<span class="token punctuation">,</span> currentDist<span class="token punctuation">)</span> <span class="token operator">=</span> priorityQueue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        graph<span class="token punctuation">[</span>node<span class="token punctuation">]</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">forEach</span> <span class="token punctuation">{</span> <span class="token punctuation">(</span>adjacent<span class="token punctuation">,</span> weight<span class="token punctuation">)</span> <span class="token operator">-&gt;</span>\n            <span class="token keyword">val</span> totalDist <span class="token operator">=</span> currentDist <span class="token operator">+</span> weight\n            <span class="token keyword">if</span> <span class="token punctuation">(</span>totalDist <span class="token operator">&lt;</span> distances<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span>adjacent<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                distances<span class="token punctuation">[</span>adjacent<span class="token punctuation">]</span> <span class="token operator">=</span> totalDist\n                priorityQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>adjacent <span class="token keyword">to</span> totalDist<span class="token punctuation">)</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> distances\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个实现中，distances映射存储从起始节点到每个其他节点的最短路径，初始化默认值为_Int.MAX_VALUE_。一个优先_queue_按它们的距离对节点进行排序，确保它首先处理最近的节点。当算法处理节点时，如果它发现一条更短的路径，它会更新每个节点的邻居的距离映射，不断细化路径，直到它确立到所有节点的最短距离。</p><h4 id="_3-3-处理环" tabindex="-1"><a class="header-anchor" href="#_3-3-处理环"><span>3.3. 处理环</span></a></h4><p>在Kotlin中实现迪杰斯特拉算法时，我们必须特别考虑处理包含环的图。图中的环可能会使最短路径的计算复杂化，因为它们允许以可能更低的累积权重重新访问节点。确保我们的实现有效地管理这些场景以保持算法的准确性并防止执行期间的无限循环至关重要。处理Dijkstra中的环时有以下三个主要步骤：</p><ul><li>检测环：在算法执行期间，我们应该检查一个节点是否已经被访问过，并且如果再次访问它是否会提供一条更短的路径。如果一个节点被重新访问并且没有发现更短的路径，它就不应该再次被添加到优先队列中。</li><li>更新距离：如果检测到环并且重新访问节点导致了一条更短的路径，应该更新到这个节点的距离，并且应该使用新距离重新将节点入队。这确保算法始终考虑到达每个节点的最短路径，即使那条路径涉及穿越一个环。</li><li>防止无限循环：为了防止算法陷入无限循环，我们可以维护一个集合，跟踪每个节点以及它被添加到队列时的距离。在将节点重新添加到队列之前，检查它是否存在于集合中，并且具有更高的距离。如果没有，重新入队节点是安全的；否则，跳过添加它以防止冗余操作。</li></ul><p>让我们调整我们的算法并创建_dijkstraWithLoops()_：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">dijkstraWithLoops</span><span class="token punctuation">(</span>graph<span class="token operator">:</span> Map``<span class="token operator">&lt;</span>Int<span class="token punctuation">,</span> List<span class="token operator">&lt;</span>Pair````<span class="token operator">&lt;</span>Int<span class="token punctuation">,</span> Int<span class="token operator">&gt;</span>``````<span class="token operator">&gt;</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> start<span class="token operator">:</span> Int<span class="token punctuation">)</span><span class="token operator">:</span> Map````<span class="token operator">&lt;</span>Int<span class="token punctuation">,</span> Int<span class="token operator">&gt;</span>```` <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> distances <span class="token operator">=</span> mutableMapOf````<span class="token operator">&lt;</span>Int<span class="token punctuation">,</span> Int<span class="token operator">&gt;</span>````<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withDefault</span> <span class="token punctuation">{</span> Int<span class="token punctuation">.</span>MAX_VALUE <span class="token punctuation">}</span>\n    <span class="token keyword">val</span> priorityQueue <span class="token operator">=</span> PriorityQueue<span class="token operator">&lt;</span>Pair````<span class="token operator">&lt;</span>Int<span class="token punctuation">,</span> Int<span class="token operator">&gt;</span>````<span class="token operator">&gt;</span><span class="token punctuation">(</span>compareBy <span class="token punctuation">{</span> it<span class="token punctuation">.</span>second <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token keyword">val</span> visited <span class="token operator">=</span> mutableSetOf<span class="token operator">&lt;</span>Pair````<span class="token operator">&lt;</span>Int<span class="token punctuation">,</span> Int<span class="token operator">&gt;</span>````<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n    priorityQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>start <span class="token keyword">to</span> <span class="token number">0</span><span class="token punctuation">)</span>\n    distances<span class="token punctuation">[</span>start<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span>\n\n    <span class="token keyword">while</span> <span class="token punctuation">(</span>priorityQueue<span class="token punctuation">.</span><span class="token function">isNotEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">val</span> <span class="token punctuation">(</span>node<span class="token punctuation">,</span> currentDist<span class="token punctuation">)</span> <span class="token operator">=</span> priorityQueue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>visited<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>node <span class="token keyword">to</span> currentDist<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            graph<span class="token punctuation">[</span>node<span class="token punctuation">]</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">forEach</span> <span class="token punctuation">{</span> <span class="token punctuation">(</span>adjacent<span class="token punctuation">,</span> weight<span class="token punctuation">)</span> <span class="token operator">-&gt;</span>\n                <span class="token keyword">val</span> totalDist <span class="token operator">=</span> currentDist <span class="token operator">+</span> weight\n                <span class="token keyword">if</span> <span class="token punctuation">(</span>totalDist <span class="token operator">&lt;</span> distances<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span>adjacent<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                    distances<span class="token punctuation">[</span>adjacent<span class="token punctuation">]</span> <span class="token operator">=</span> totalDist\n                    priorityQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>adjacent <span class="token keyword">to</span> totalDist<span class="token punctuation">)</span>\n                <span class="token punctuation">}</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> distances\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-测试" tabindex="-1"><a class="header-anchor" href="#_4-测试"><span>4. 测试</span></a></h2><p>为了验证我们迪杰斯特拉算法的实现，我们创建了一个反映我们图结构的测试场景：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>\n<span class="token keyword">fun</span> <span class="token function">`Should calculate shortest path when using Dijkstra algorithm`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> graph <span class="token operator">=</span> <span class="token function">mapOf</span><span class="token punctuation">(</span>\n        <span class="token number">1</span> <span class="token keyword">to</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token function">Pair</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">Pair</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token number">2</span> <span class="token keyword">to</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token function">Pair</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token number">3</span> <span class="token keyword">to</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token function">Pair</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token number">4</span> <span class="token keyword">to</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token function">Pair</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">Pair</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token number">5</span> <span class="token keyword">to</span> <span class="token function">emptyList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token number">6</span> <span class="token keyword">to</span> <span class="token function">emptyList</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">)</span>\n\n    <span class="token keyword">val</span> shortestPaths <span class="token operator">=</span> <span class="token function">dijkstra</span><span class="token punctuation">(</span>graph<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">37</span><span class="token punctuation">,</span> shortestPaths<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试中，我们断言从节点_1_到节点_6_的最短路径是_37_，展示了算法计算最小距离的能力。通过单元测试，我们确保了迪杰斯特拉算法在Kotlin中的实现的可靠性和效率。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>Kotlin中的迪杰斯特拉算法为在加权图中找到最短路径提供了一种强大而有效的方法。通过利用Kotlin的特性，我们可以清晰而精确地实现这个经典算法，从而开发出复杂的应用程序。如常，本文中使用的代码可以在GitHub上找到。</p>',28),e=[o];function c(l,i){return a(),s("div",null,e)}const k=n(p,[["render",c],["__file","2024-06-25-Dijkstra s Algorithm in Kotlin.html.vue"]]),d=JSON.parse(`{"path":"/posts/baeldung/2024-06-25/2024-06-25-Dijkstra%20s%20Algorithm%20in%20Kotlin.html","title":"Kotlin中实现迪杰斯特拉算法","lang":"zh-CN","frontmatter":{"date":"2024-06-25T00:00:00.000Z","category":["Kotlin","Algorithms"],"tag":["Dijkstra’s Algorithm","Graphs"],"head":[["meta",{"name":"keywords","content":"Kotlin, Dijkstra's Algorithm, Graphs, Shortest Path"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-25/2024-06-25-Dijkstra%20s%20Algorithm%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中实现迪杰斯特拉算法"}],["meta",{"property":"og:description","content":"Kotlin中实现迪杰斯特拉算法 在本教程中，我们将学习如何在Kotlin中实现迪杰斯特拉算法。它是一种在加权图中找出从起始节点到所有其他节点的最短路径的解决方案。与适用于无权图的广度优先搜索（BFS）不同，迪杰斯特拉算法在有加权边的环境中表现出色，根据累积权重或距离优化路径。本文深入探讨了在Kotlin中实现迪杰斯特拉算法，展示了该语言简洁的语法和强..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-25T02:43:05.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Dijkstra’s Algorithm"}],["meta",{"property":"article:tag","content":"Graphs"}],["meta",{"property":"article:published_time","content":"2024-06-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-25T02:43:05.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中实现迪杰斯特拉算法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-25T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-25T02:43:05.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中实现迪杰斯特拉算法 在本教程中，我们将学习如何在Kotlin中实现迪杰斯特拉算法。它是一种在加权图中找出从起始节点到所有其他节点的最短路径的解决方案。与适用于无权图的广度优先搜索（BFS）不同，迪杰斯特拉算法在有加权边的环境中表现出色，根据累积权重或距离优化路径。本文深入探讨了在Kotlin中实现迪杰斯特拉算法，展示了该语言简洁的语法和强..."},"headers":[{"level":3,"title":"2. 理解迪杰斯特拉算法","slug":"_2-理解迪杰斯特拉算法","link":"#_2-理解迪杰斯特拉算法","children":[]},{"level":3,"title":"3. 在Kotlin中实现迪杰斯特拉算法","slug":"_3-在kotlin中实现迪杰斯特拉算法","link":"#_3-在kotlin中实现迪杰斯特拉算法","children":[]},{"level":2,"title":"4. 测试","slug":"_4-测试","link":"#_4-测试","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719283385000,"updatedTime":1719283385000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.78,"words":1733},"filePathRelative":"posts/baeldung/2024-06-25/2024-06-25-Dijkstra s Algorithm in Kotlin.md","localizedDate":"2024年6月25日","excerpt":"<hr>\\n<h1>Kotlin中实现迪杰斯特拉算法</h1>\\n<p>在本教程中，我们将学习如何在Kotlin中实现迪杰斯特拉算法。它是一种在加权图中找出从起始节点到所有其他节点的最短路径的解决方案。与适用于无权图的广度优先搜索（BFS）不同，迪杰斯特拉算法在有加权边的环境中表现出色，根据累积权重或距离优化路径。本文深入探讨了在Kotlin中实现迪杰斯特拉算法，展示了该语言简洁的语法和强大的功能。</p>\\n<h3>2. 理解迪杰斯特拉算法</h3>\\n<p>迪杰斯特拉算法擅长在有加权边的图中找到从起始节点到所有其他节点的最短路径。它将起始节点的距离初始化为零，其他节点的距离初始化为无穷大，迭代更新距离，并按距离的升序处理节点。</p>","autoDesc":true}`);export{k as comp,d as data};
