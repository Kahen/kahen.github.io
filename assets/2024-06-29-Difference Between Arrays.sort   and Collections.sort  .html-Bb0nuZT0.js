import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as n,a as t}from"./app-on0L14Tx.js";const e={},o=t(`<h1 id="java-中-arrays-sort-与-collections-sort-的区别" tabindex="-1"><a class="header-anchor" href="#java-中-arrays-sort-与-collections-sort-的区别"><span>Java 中 Arrays.sort() 与 Collections.sort() 的区别</span></a></h1><p>排序是计算机科学中的一项基本操作，对于各种应用中的数据组织和操作至关重要。在本教程中，我们将比较 Java 中常用的两种排序方法：Arrays.sort() 和 Collections.sort()。尽管这两种方法的主要功能是排序数据，但每种方法都有其自身的特征、注意事项和最佳使用场景。</p><h3 id="_2-1-arrays-sort" tabindex="-1"><a class="header-anchor" href="#_2-1-arrays-sort"><span>2.1. Arrays.sort()</span></a></h3><p><strong>Arrays.sort() 方法是 Java 中用于排序数组的实用函数。</strong> 它允许对原始数据类型的数组和对象数组进行排序。无论是处理数值数据还是按字母顺序排列的字符串，Arrays.sort() 都可以将元素按升序排列。此外，我们可以通过自定义比较器来修改对象数组的行为。这个方法是 java.util.Arrays 类的一部分，该类提供了一整套用于数组操作的实用工具。</p><h3 id="_2-2-collections-sort" tabindex="-1"><a class="header-anchor" href="#_2-2-collections-sort"><span>2.2. Collections.sort()</span></a></h3><p><strong>另一方面，Collections.sort() 旨在对 Java 集合框架中的 List 接口实例进行排序。</strong> 与仅限于数组的 Arrays.sort() 不同，Collections.sort() 可以对更动态的数据结构进行排序，如 ArrayList、LinkedList 以及其他实现 List 接口的类。Collections.sort() 是 java.util.Collections 类的成员，这是一个充满静态方法用于操作集合的实用类。</p><h2 id="稳定性" tabindex="-1"><a class="header-anchor" href="#稳定性"><span>稳定性</span></a></h2><p>假设我们有一组任务：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>tasks <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
tasks<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Task</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;2023-09-01&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// ... 省略其他任务添加代码 ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们希望首先按优先级对它们进行排序，然后按到期日期排序。我们将使用两种不同的方法对它们进行排序。在第一种情况下，我们将使用 Collections 提供的稳定算法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Task</span><span class="token punctuation">&gt;</span></span>\`\` tasks <span class="token operator">=</span> <span class="token class-name">Tasks</span><span class="token punctuation">.</span>supplier<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>tasks<span class="token punctuation">,</span> <span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">comparingInt</span><span class="token punctuation">(</span><span class="token class-name">Task</span><span class="token operator">::</span><span class="token function">getPriority</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// ... 省略其他代码 ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还将使用非稳定算法对任务进行排序。因为 Java 不提供使用非稳定算法对引用类型列表进行排序的选项，我们有一个简单的快速排序实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Task</span><span class="token punctuation">&gt;</span></span>\`\` tasks <span class="token operator">=</span> <span class="token class-name">Tasks</span><span class="token punctuation">.</span>supplier<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">quickSort</span><span class="token punctuation">(</span>tasks<span class="token punctuation">,</span> <span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">comparingInt</span><span class="token punctuation">(</span><span class="token class-name">Task</span><span class="token operator">::</span><span class="token function">getPriority</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// ... 省略其他代码 ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码基本相同。唯一的区别是使用的算法。排序发生在两个步骤中。第一步按优先级对任务进行排序，第二步按到期日期排序。</p><p>结果的差异是微妙的，但可能会显著影响代码的功能并引入难以调试的错误。稳定版本产生的输出如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">After</span> sorting by due date<span class="token operator">:</span>
<span class="token class-name">Task</span><span class="token operator">:</span> #<span class="token number">9</span>  <span class="token operator">|</span> <span class="token class-name">Priority</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token operator">|</span> <span class="token class-name">Due</span> <span class="token class-name">Date</span><span class="token operator">:</span> <span class="token number">2023</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">28</span>
<span class="token comment">// ... 省略其他任务输出 ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>任务按日期排序，当日期相同时，先前的按优先级排序将被保留。而非稳定版本给出这样的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">After</span> sorting by due date<span class="token operator">:</span>
<span class="token class-name">Task</span><span class="token operator">:</span> #<span class="token number">9</span>  <span class="token operator">|</span> <span class="token class-name">Priority</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token operator">|</span> <span class="token class-name">Due</span> <span class="token class-name">Date</span><span class="token operator">:</span> <span class="token number">2023</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">28</span>
<span class="token comment">// ... 省略其他任务输出，注意任务 #2 和 #12 的优先级颠倒了 ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是因为非稳定算法在处理相等但可区分的项目时会产生非确定性行为。</p><p><strong>由于原始类型没有身份或额外参数，我们可以使用非稳定算法对它们进行排序。</strong> 它们唯一拥有的就是值，这就是为什么我们不关心用于原始类型的算法的稳定性。如上例所示，稳定性特性对于排序对象至关重要。</p><p>这就是为什么 Arrays.sort() 对原始类型使用相同的非稳定算法实现，如快速排序或双轴快速排序。<strong>当处理引用类型的集合时，Arrays.sort() 和 Collections.sort() 都使用相同的实现，通常是归并排序或 TimSort。</strong></p><h2 id="复杂性" tabindex="-1"><a class="header-anchor" href="#复杂性"><span>复杂性</span></a></h2><p>让我们通过一个简单的示例来比较归并排序和快速排序，以展示这些算法之间的区别，最终是 Collections.sort() 和 Arrays.sort() 之间的区别。<strong>我们将使用这两种算法的简单实现。</strong> 这是部分因为 Java 没有直接提供这些算法，所以我们可以选择它们，部分是因为当前的算法有太多的调整和改进。因此，很难为它们开发类似的测试用例。</p><p>我们将运行以下测试来比较吞吐量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// ... 省略测试代码 ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运行这些测试后，我们得到了两个工件：一个是性能指标，另一个是垃圾收集日志。</p><h3 id="_4-1-时间复杂度" tabindex="-1"><a class="header-anchor" href="#_4-1-时间复杂度"><span>4.1. 时间复杂度</span></a></h3><p>让我们回顾一下上述测试的性能指标：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Benchmark</span>                                    <span class="token class-name">Mode</span>  <span class="token class-name">Cnt</span>     <span class="token class-name">Score</span>     <span class="token class-name">Error</span>  <span class="token class-name">Units</span>
<span class="token class-name">PerformanceBenchmark</span><span class="token punctuation">.</span>mergeSortRandomNumber  thrpt    <span class="token number">4</span>  <span class="token number">1489.983</span> ± <span class="token number">401.330</span>  ops<span class="token operator">/</span>s
<span class="token class-name">PerformanceBenchmark</span><span class="token punctuation">.</span>quickSortRandomNumber  thrpt    <span class="token number">4</span>  <span class="token number">2757.273</span> ±  <span class="token number">29.606</span>  ops<span class="token operator">/</span>s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>首先，使用快速排序对随机数进行排序通常比归并排序快近两倍。</strong> 快速排序是原地进行的，减少了影响性能的空间复杂度，我们将在下一节中讨论。</p><p>我们还可以看到快速排序在某些情况下可能会迅速退化：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Benchmark</span>                                    <span class="token class-name">Mode</span>  <span class="token class-name">Cnt</span>     <span class="token class-name">Score</span>     <span class="token class-name">Error</span>  <span class="token class-name">Units</span>
<span class="token class-name">PerformanceBenchmark</span><span class="token punctuation">.</span>mergeSortSameNumber    thrpt    <span class="token number">4</span>  <span class="token number">5295.502</span> ±  <span class="token number">98.624</span>  ops<span class="token operator">/</span>s
<span class="token class-name">PerformanceBenchmark</span><span class="token punctuation">.</span>quickSortSameNumber    thrpt    <span class="token number">4</span>   <span class="token number">118.211</span> ±   <span class="token number">0.117</span>  ops<span class="token operator">/</span>s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如，当所有数字都相同时，归并排序表现得更好，速度非常快。<strong>尽管我们使用的是快速排序和归并排序的简单实现，但它们的行为通常与更优化和更复杂的对应物相似。</strong></p><p>请记住，算法的性能和其时间复杂度可能不相关，因为我们应该考虑许多其他因素：空间复杂度、隐藏的常数因子、优化、自适应性等。</p><p><strong>快速排序和双轴快速排序的上限比归并排序或 TimSort 高。</strong> 然而，由于一系列改进和检查，性能问题变得可以忽略不计，总的来说，可以忽略。<strong>因此，我们可以假设归并排序、TimSort、快速排序和双轴快速排序具有相同的时间复杂度。</strong></p><p>例如，DualPivotQuicksort.sort() 方法考虑了许多参数，如并行化、数组大小、预排序运行，甚至是递归深度。根据原始类型和数组的大小，Java 可以使用不同的算法，如插入排序或计数排序。这就是为什么很难比较高度优化的算法；它们通常会产生类似的结果。</p><h3 id="_4-2-空间复杂度" tabindex="-1"><a class="header-anchor" href="#_4-2-空间复杂度"><span>4.2. 空间复杂度</span></a></h3><p><strong>正如前面提到的，虽然快速排序和双轴快速排序是非稳定的，但它们以使用较少的空间作为权衡。</strong> 根据实现，它们可能有最多 O(log*n) 的空间复杂度。这是一个可能对性能产生重大影响的不错特性。在我们的例子中，让我们专注于对随机数进行排序。</p><p>虽然这些算法的时间复杂度被认为大致相同，但我们在性能上有显著的差异：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Benchmark</span>                                    <span class="token class-name">Mode</span>  <span class="token class-name">Cnt</span>     <span class="token class-name">Score</span>     <span class="token class-name">Error</span>  <span class="token class-name">Units</span>
<span class="token class-name">PerformanceBenchmark</span><span class="token punctuation">.</span>mergeSortRandomNumber  thrpt    <span class="token number">4</span>  <span class="token number">1489.983</span> ± <span class="token number">401.330</span>  ops<span class="token operator">/</span>s
<span class="token class-name">PerformanceBenchmark</span><span class="token punctuation">.</span>quickSortRandomNumber  thrpt    <span class="token number">4</span>  <span class="token number">2757.273</span> ±  <span class="token number">29.606</span>  ops<span class="token operator">/</span>s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了调查这种差异，我们可以查看垃圾收集日志。我们将使用 IBM 垃圾收集和内存可视化器：</p><table><thead><tr><th>变体</th><th>mergeSort</th><th>quickSort</th></tr></thead><tbody><tr><td>强制收集次数</td><td>0</td><td>0</td></tr><tr><td>完整收集</td><td>0</td><td>0</td></tr><tr><td>GC 模式</td><td>G1</td><td>G1</td></tr><tr><td>平均垃圾收集暂停时间 (ms)</td><td>0.33</td><td>0.47</td></tr><tr><td>由于分配失败触发的收集次数</td><td>26848</td><td>588</td></tr><tr><td>在垃圾收集暂停中花费的时间比例 (%)</td><td>0.72</td><td>0.02</td></tr><tr><td>在全局停止垃圾收集暂停中花费的时间比例 (%)</td><td>0.72</td><td>0.02</td></tr><tr><td>在未暂停中花费的时间比例 (%)</td><td>99.28</td><td>99.98</td></tr><tr><td>年轻收集 - 平均垃圾收集暂停时间 (ms)</td><td>0.33</td><td>0.47</td></tr><tr><td>年轻收集 - 收集间隔平均时间 (ms)</td><td>46.6</td><td>2124</td></tr></tbody></table><p>如我们所见，MergeSort 的垃圾收集事件数量显著更高（26848 对比 588），这是可以理解的，因为该算法使用更多的空间。</p><h3 id="_4-3-优化" tabindex="-1"><a class="header-anchor" href="#_4-3-优化"><span>4.3. 优化</span></a></h3><p>由于归并排序和 TimSort 需要更多的空间，使用非稳定算法对原始类型进行排序是优化步骤，假设快速排序和双轴快速排序退化到 O(n^2) 是可以忽略不计的。技术上，可以使用非稳定排序算法对引用类型的集合进行排序并获得性能提升。<strong>如果稳定性不重要或相等的对象不可区分，这是可以做到的。</strong></p><p>我们可以使用的一个改进是将包装类转换为原始类型，进行排序，然后再转换回来。让我们考虑以下测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// ... 省略测试代码 ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用 Arrays.sort() 的事实显著提高了我们的性能 <em>Collection.sort()</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Benchmark</span>                                       <span class="token class-name">Mode</span>  <span class="token class-name">Cnt</span>     <span class="token class-name">Score</span>     <span class="token class-name">Error</span>  <span class="token class-name">Units</span>
<span class="token class-name">ObjectOverheadBenchmark</span><span class="token punctuation">.</span>sortingObjectArrayth rpt    <span class="token number">4</span>   <span class="token number">982.849</span> ±  <span class="token number">19.201</span>  ops<span class="token operator">/</span>s
<span class="token class-name">ObjectOverheadBenchmark</span><span class="token punctuation">.</span>sortingObjects         thrpt    <span class="token number">4</span>   <span class="token number">976.778</span> ±  <span class="token number">10.580</span>  ops<span class="token operator">/</span>s
<span class="token class-name">ObjectOverheadBenchmark</span><span class="token punctuation">.</span>sortingPrimitiveArray  thrpt    <span class="token number">4</span>  <span class="token number">1998.818</span> ± <span class="token number">373.654</span>  ops<span class="token operator">/</span>s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对 <code>int[]</code> 进行排序的性能提升了超过 100%。</p><h2 id="实现细节的-arrays-sort-和-collections-sort" tabindex="-1"><a class="header-anchor" href="#实现细节的-arrays-sort-和-collections-sort"><span>实现细节的 Arrays.sort() 和 Collections.sort()</span></a></h2><p><strong>请注意，前几节中使用的算法和测试并不反映库实现的性能，因为它们有更复杂的过程，允许它们优化特定情况。</strong> 测试仅用于提供有关这两种算法简单实现的内部工作方式的更多直观信息。</p><p>没有它们的底层算法，实际上不可能比较 Collections.sort() 和 Arrays.sort()。</p><p><strong>底层算法是这些两种方法的复杂性和性能的关键部分。</strong> 因为 Collections.sort() 是以稳定性为考虑实现的，它们使用归并排序或 TimSort。同时，对原始类型的排序不需要这个属性，可以使用快速排序或双轴快速排序。</p><p>为了更好地理解这些方法，我们直接查看了它们使用的排序算法。</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>排序是计算机科学的基石操作之一，它使许多应用程序能够高效地进行数据操作。通过了解算法之间的差异，我们可以在编码和优化性能及功能时做出更明智的决策，以满足特定要求。</p><p>因此，尽管本文旨在突出 Collections.sort() 和 Arrays.sort() 之间的区别。它也是了解不同排序算法之间差异的一个很好的指南。如常，算法实现的代码可以在 GitHub 上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/cb3ee72a94d923d6529e5b811c1d0b7d?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>`,60),p=[o];function r(l,c){return n(),a("div",null,p)}const u=s(e,[["render",r],["__file","2024-06-29-Difference Between Arrays.sort   and Collections.sort  .html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-Difference%20Between%20Arrays.sort%20%20%20and%20Collections.sort%20%20.html","title":"Java 中 Arrays.sort() 与 Collections.sort() 的区别","lang":"zh-CN","frontmatter":{"date":"2024-06-30T00:00:00.000Z","category":["Java","算法"],"tag":["Arrays.sort","Collections.sort"],"head":[["meta",{"name":"keywords","content":"Java, Arrays.sort, Collections.sort, 排序算法, 性能比较"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-Difference%20Between%20Arrays.sort%20%20%20and%20Collections.sort%20%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 中 Arrays.sort() 与 Collections.sort() 的区别"}],["meta",{"property":"og:description","content":"Java 中 Arrays.sort() 与 Collections.sort() 的区别 排序是计算机科学中的一项基本操作，对于各种应用中的数据组织和操作至关重要。在本教程中，我们将比较 Java 中常用的两种排序方法：Arrays.sort() 和 Collections.sort()。尽管这两种方法的主要功能是排序数据，但每种方法都有其自身的特征..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T20:53:44.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Arrays.sort"}],["meta",{"property":"article:tag","content":"Collections.sort"}],["meta",{"property":"article:published_time","content":"2024-06-30T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T20:53:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 中 Arrays.sort() 与 Collections.sort() 的区别\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/cb3ee72a94d923d6529e5b811c1d0b7d?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2024-06-30T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T20:53:44.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 中 Arrays.sort() 与 Collections.sort() 的区别 排序是计算机科学中的一项基本操作，对于各种应用中的数据组织和操作至关重要。在本教程中，我们将比较 Java 中常用的两种排序方法：Arrays.sort() 和 Collections.sort()。尽管这两种方法的主要功能是排序数据，但每种方法都有其自身的特征..."},"headers":[{"level":3,"title":"2.1. Arrays.sort()","slug":"_2-1-arrays-sort","link":"#_2-1-arrays-sort","children":[]},{"level":3,"title":"2.2. Collections.sort()","slug":"_2-2-collections-sort","link":"#_2-2-collections-sort","children":[]},{"level":2,"title":"稳定性","slug":"稳定性","link":"#稳定性","children":[]},{"level":2,"title":"复杂性","slug":"复杂性","link":"#复杂性","children":[{"level":3,"title":"4.1. 时间复杂度","slug":"_4-1-时间复杂度","link":"#_4-1-时间复杂度","children":[]},{"level":3,"title":"4.2. 空间复杂度","slug":"_4-2-空间复杂度","link":"#_4-2-空间复杂度","children":[]},{"level":3,"title":"4.3. 优化","slug":"_4-3-优化","link":"#_4-3-优化","children":[]}]},{"level":2,"title":"实现细节的 Arrays.sort() 和 Collections.sort()","slug":"实现细节的-arrays-sort-和-collections-sort","link":"#实现细节的-arrays-sort-和-collections-sort","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1719694424000,"updatedTime":1719694424000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":8.56,"words":2569},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-Difference Between Arrays.sort   and Collections.sort  .md","localizedDate":"2024年6月30日","excerpt":"\\n<p>排序是计算机科学中的一项基本操作，对于各种应用中的数据组织和操作至关重要。在本教程中，我们将比较 Java 中常用的两种排序方法：Arrays.sort() 和 Collections.sort()。尽管这两种方法的主要功能是排序数据，但每种方法都有其自身的特征、注意事项和最佳使用场景。</p>\\n<h3>2.1. Arrays.sort()</h3>\\n<p><strong>Arrays.sort() 方法是 Java 中用于排序数组的实用函数。</strong> 它允许对原始数据类型的数组和对象数组进行排序。无论是处理数值数据还是按字母顺序排列的字符串，Arrays.sort() 都可以将元素按升序排列。此外，我们可以通过自定义比较器来修改对象数组的行为。这个方法是 java.util.Arrays 类的一部分，该类提供了一整套用于数组操作的实用工具。</p>","autoDesc":true}');export{u as comp,m as data};
