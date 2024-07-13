import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DkA39C0B.js";const p={},e=t(`<hr><h1 id="kotlin中的广度优先搜索算法" tabindex="-1"><a class="header-anchor" href="#kotlin中的广度优先搜索算法"><span>Kotlin中的广度优先搜索算法</span></a></h1><p>广度优先搜索（BFS）是一种基本的算法，用于遍历或搜索树状或图状数据结构。它从选定的节点开始（在树结构中通常是根节点），然后探索当前深度的所有邻居节点，再移动到下一层深度的节点。BFS特别适用于在未加权图中找到最短路径。</p><p>在本教程中，我们将探索在Kotlin中实现BFS算法。</p><h3 id="_3-1-定义图" tabindex="-1"><a class="header-anchor" href="#_3-1-定义图"><span>3.1. 定义图</span></a></h3><p>首先，我们需要定义一个图。我们将使用邻接表，因为它是Kotlin中表示图的一种常见且有效的方式。此外，为了提供具体示例，我们将初始化我们的图，添加一些节点和边，以说明BFS在实践中的工作原理：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> graph <span class="token operator">=</span> mutableMapOf\`\`<span class="token operator">&lt;</span>Int<span class="token punctuation">,</span> List\`\`\`<span class="token operator">&lt;</span>Int<span class="token operator">&gt;</span>\`\`\`\`\`<span class="token operator">&gt;</span><span class="token punctuation">(</span>
    <span class="token number">1</span> <span class="token keyword">to</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token number">2</span> <span class="token keyword">to</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token number">3</span> <span class="token keyword">to</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token number">4</span> <span class="token keyword">to</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token number">5</span> <span class="token keyword">to</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token number">6</span> <span class="token keyword">to</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token number">7</span> <span class="token keyword">to</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token number">8</span> <span class="token keyword">to</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们考虑我们即将遍历的图的结构的可视化表示：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>      1
   /  |  \\
  2   3   4
 / \\     / \\
5   6   7   8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这张图表帮助我们可视化从根节点“1”开始的BFS遍历。</p><h3 id="_3-2-bfs实现" tabindex="-1"><a class="header-anchor" href="#_3-2-bfs实现"><span>3.2. BFS实现</span></a></h3><p>让我们实现<code>bfs()</code>函数，并将其逐行与我们之前学习的理论联系起来：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">bfs</span><span class="token punctuation">(</span>graph<span class="token operator">:</span> Map\`\`<span class="token operator">&lt;</span>Int<span class="token punctuation">,</span> List\`\`\`<span class="token operator">&lt;</span>Int<span class="token operator">&gt;</span>\`\`\`\`\`<span class="token operator">&gt;</span><span class="token punctuation">,</span> start<span class="token operator">:</span> Int<span class="token punctuation">)</span><span class="token operator">:</span> Set\`\`\`<span class="token operator">&lt;</span>Int<span class="token operator">&gt;</span>\`\`\` <span class="token punctuation">{</span>
    <span class="token keyword">val</span> visited <span class="token operator">=</span> mutableSetOf\`\`\`<span class="token operator">&lt;</span>Int<span class="token operator">&gt;</span>\`\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> queue <span class="token operator">=</span> ArrayDeque\`\`\`<span class="token operator">&lt;</span>Int<span class="token operator">&gt;</span>\`\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span>
    queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>queue<span class="token punctuation">.</span><span class="token function">isNotEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">val</span> vertex <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">removeFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>vertex <span class="token operator">!</span><span class="token keyword">in</span> visited<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            visited<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>vertex<span class="token punctuation">)</span>
            graph<span class="token punctuation">[</span>vertex<span class="token punctuation">]</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">let</span> <span class="token punctuation">{</span> neighbors <span class="token operator">-&gt;</span> queue<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>neighbors<span class="token punctuation">.</span><span class="token function">filterNot</span> <span class="token punctuation">{</span> it <span class="token keyword">in</span> visited <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> visited
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码片段提供了BFS算法的实际实现，将我们讨论的理论概念转化为可操作的Kotlin代码。<strong>其核心是使用队列逐层探索节点，确保系统化的访问模式，符合BFS范式</strong>。</p><p>过程首先将起始节点标记为已访问，然后迭代地探索每个节点的邻居，以最宽泛的方式遍历图。这种方法保证了从起始点可达的所有节点都被访问，一次一层。</p><h3 id="_3-3-理解bfs实现" tabindex="-1"><a class="header-anchor" href="#_3-3-理解bfs实现"><span>3.3. 理解BFS实现</span></a></h3><p>在观察了BFS算法的运行之后，让我们深入到我们实现的具体细节：</p><ul><li>**初始化：**我们首先创建一个名为_visited_的可变集合，用于跟踪我们已访问过的节点。这很重要，以防止重新访问节点，这可能导致循环图中的无限循环。我们还创建了一个名为_queue_的队列来管理需要探索的节点。这个队列将确保我们按照发现的顺序探索节点，符合BFS策略。</li><li>**起始节点：**BFS算法通过将起始节点添加到队列来开始。这是我们进入图的入口点。</li><li>**遍历循环：**BFS实现的核心是一个循环，只要队列中还有待探索的节点，这个循环就会运行。在这个循环内部，我们从队列中移除下一个要探索的节点（vertex），并检查我们是否访问过它。如果没有，我们通过将其包含在_visited_集合中将其标记为已访问。</li><li>**探索邻居：**对于每个未访问的节点，我们从图中检索其邻居。然后我们过滤掉已经访问过的邻居，并将其余的添加到队列中。这一步确保了我们将最终探索从起始节点可达的每个节点，按照从近到远的顺序。</li><li>**完成：**一旦队列为空，表示没有更多的节点要探索，循环就会终止。此时，_visited_集合包含了在遍历过程中访问的所有节点，按照它们被访问的顺序。然后这个集合作为BFS实现的结果返回。</li></ul><h3 id="_4-测试我们的bfs实现" tabindex="-1"><a class="header-anchor" href="#_4-测试我们的bfs实现"><span>4. 测试我们的BFS实现</span></a></h3><p>最后，为了确保我们的BFS按预期工作，我们需要测试我们的实现。让我们通过编写一个JUnit测试来验证我们的代码是否正确。使用我们最初定义的图，我们将使用我们的BFS实现来遍历它，并断言我们访问节点的顺序：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`test BFS traversal order\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> graph <span class="token operator">=</span> <span class="token function">mapOf</span><span class="token punctuation">(</span>
        <span class="token number">1</span> <span class="token keyword">to</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token number">2</span> <span class="token keyword">to</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token number">6</span> <span class="token keyword">to</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token number">3</span> <span class="token keyword">to</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token number">4</span> <span class="token keyword">to</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token number">5</span> <span class="token keyword">to</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token number">7</span> <span class="token keyword">to</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token number">8</span> <span class="token keyword">to</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span>

    <span class="token keyword">val</span> traversalOrder <span class="token operator">=</span> <span class="token function">bfs</span><span class="token punctuation">(</span>graph<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>

    <span class="token keyword">val</span> levelOne <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span>traversalOrder<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>levelOne<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

    <span class="token keyword">val</span> levelTwo <span class="token operator">=</span> traversalOrder<span class="token punctuation">.</span><span class="token function">drop</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">take</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>levelTwo<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactlyInAnyOrder</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>

    <span class="token keyword">val</span> levelThree <span class="token operator">=</span> traversalOrder<span class="token punctuation">.</span><span class="token function">drop</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>levelThree<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactlyInAnyOrder</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个测试证明了我们的BFS实现正确地按正确的顺序从根节点遍历了图。在调用我们的<code>bfs()</code>函数以获取遍历顺序后，我们将<code>traversalOrder</code>列表切片以隔离图中的每个层级。最后，使用断言，我们检查每个层级的节点是否符合预期，强调算法的广度优先方法。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在Kotlin中实现BFS算法为有效探索图和树提供了一种很好的方式。通过利用Kotlin的简洁语法和强大的标准库，开发人员可以实施并应用BFS来解决学术和实际应用中的广泛问题。</p><p>如常，本文中使用的代码可以在GitHub上找到。</p>`,25),o=[e];function c(l,i){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-01-Breadth First Search Algorithm in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-Breadth%20First%20Search%20Algorithm%20in%20Kotlin.html","title":"Kotlin中的广度优先搜索算法","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Algorithms"],"tag":["BFS","Graphs","Kotlin"],"head":[["meta",{"name":"keywords","content":"Kotlin, BFS, Graphs, Algorithm, Breadth-First Search"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-Breadth%20First%20Search%20Algorithm%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中的广度优先搜索算法"}],["meta",{"property":"og:description","content":"Kotlin中的广度优先搜索算法 广度优先搜索（BFS）是一种基本的算法，用于遍历或搜索树状或图状数据结构。它从选定的节点开始（在树结构中通常是根节点），然后探索当前深度的所有邻居节点，再移动到下一层深度的节点。BFS特别适用于在未加权图中找到最短路径。 在本教程中，我们将探索在Kotlin中实现BFS算法。 3.1. 定义图 首先，我们需要定义一个图..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T20:53:45.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"BFS"}],["meta",{"property":"article:tag","content":"Graphs"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T20:53:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中的广度优先搜索算法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T20:53:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中的广度优先搜索算法 广度优先搜索（BFS）是一种基本的算法，用于遍历或搜索树状或图状数据结构。它从选定的节点开始（在树结构中通常是根节点），然后探索当前深度的所有邻居节点，再移动到下一层深度的节点。BFS特别适用于在未加权图中找到最短路径。 在本教程中，我们将探索在Kotlin中实现BFS算法。 3.1. 定义图 首先，我们需要定义一个图..."},"headers":[{"level":3,"title":"3.1. 定义图","slug":"_3-1-定义图","link":"#_3-1-定义图","children":[]},{"level":3,"title":"3.2. BFS实现","slug":"_3-2-bfs实现","link":"#_3-2-bfs实现","children":[]},{"level":3,"title":"3.3. 理解BFS实现","slug":"_3-3-理解bfs实现","link":"#_3-3-理解bfs实现","children":[]},{"level":3,"title":"4. 测试我们的BFS实现","slug":"_4-测试我们的bfs实现","link":"#_4-测试我们的bfs实现","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719867225000,"updatedTime":1719867225000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.41,"words":1322},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-Breadth First Search Algorithm in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"<hr>\\n<h1>Kotlin中的广度优先搜索算法</h1>\\n<p>广度优先搜索（BFS）是一种基本的算法，用于遍历或搜索树状或图状数据结构。它从选定的节点开始（在树结构中通常是根节点），然后探索当前深度的所有邻居节点，再移动到下一层深度的节点。BFS特别适用于在未加权图中找到最短路径。</p>\\n<p>在本教程中，我们将探索在Kotlin中实现BFS算法。</p>\\n<h3>3.1. 定义图</h3>\\n<p>首先，我们需要定义一个图。我们将使用邻接表，因为它是Kotlin中表示图的一种常见且有效的方式。此外，为了提供具体示例，我们将初始化我们的图，添加一些节点和边，以说明BFS在实践中的工作原理：</p>","autoDesc":true}');export{k as comp,d as data};
