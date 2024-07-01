import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BEmnZ9jQ.js";const p={},e=t('<hr><h1 id="java中collections-sort-的时间复杂度" tabindex="-1"><a class="header-anchor" href="#java中collections-sort-的时间复杂度"><span>Java中Collections.sort()的时间复杂度</span></a></h1><p>在本教程中，我们将利用Java微基准测试工具（JMH）探索_Collections.sort()_的时间复杂度，并提供示例来说明其效率。</p><h2 id="_2-时间复杂度" tabindex="-1"><a class="header-anchor" href="#_2-时间复杂度"><span>2. 时间复杂度</span></a></h2><p>理解算法的时间复杂度对于评估其效率至关重要。具体来说，<em>Collections.sort()<em>的时间复杂度在最佳情况下是_O(n)</em>，在最坏和平均情况下是_O(n log n)</em>，其中_n_是集合中元素的数量。</p><h3 id="_2-1-最佳情况时间复杂度" tabindex="-1"><a class="header-anchor" href="#_2-1-最佳情况时间复杂度"><span>2.1. 最佳情况时间复杂度</span></a></h3><p>在Java中，_Collections.sort()_使用TimSort算法进行排序。在以下示例中，TimSort算法首先确定运行长度，创建四个运行：</p><p>然后，对这些单独的运行执行插入排序。接着，以成对的方式合并这些运行，从运行#1和#2开始，然后是#3和#4，最后合并剩余的两个运行。这个合并过程最终生成一个完全排序的数组。</p><p>在近乎排序好的数组中，Timsort的时间复杂度为_O(n)_，它利用现有的顺序并有效地对数据进行排序。粗略估计，在这种情况下，Timsort可能执行大约20-25次比较和交换。</p><p>以下Java代码演示了使用_Collections.sort()_方法对已经排序好的数组进行排序的时间复杂度：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">bestCaseTimeComplexity</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Integer</span><span class="token punctuation">[</span><span class="token punctuation">]</span> sortedArray <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">19</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">19</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">24</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">,</span> <span class="token number">28</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">27</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````` list <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>sortedArray<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">long</span> startTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">long</span> endTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;O(n)执行时间: &quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>endTime <span class="token operator">-</span> startTime<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; 纳秒&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-平均和最坏情况时间复杂度" tabindex="-1"><a class="header-anchor" href="#_2-2-平均和最坏情况时间复杂度"><span>2.2. 平均和最坏情况时间复杂度</span></a></h3><p>在未排序数组的情况下，TimSort的平均和最坏情况时间复杂度为_O(n log n)_，因为它需要更多的比较和交换操作来对数组进行排序。</p><p>让我们看看以下图表：</p><p>Timsort将为这个特定的数组执行大约60-70次比较和交换。</p><p>运行以下代码将展示排序未排序列表的执行时间，展示_Collections.sort()_使用的排序算法在平均和最坏情况下的性能：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">worstAndAverageCasesTimeComplexity</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Integer</span><span class="token punctuation">[</span><span class="token punctuation">]</span> sortedArray <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">,</span> <span class="token number">24</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token number">26</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">,</span> <span class="token number">28</span><span class="token punctuation">,</span> <span class="token number">29</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">31</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token number">19</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">,</span> <span class="token number">34</span><span class="token punctuation">,</span> <span class="token number">27</span><span class="token punctuation">,</span> <span class="token number">35</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````` list <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>sortedArray<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">shuffle</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">long</span> startTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">long</span> endTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;O(n log n)执行时间: &quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>endTime <span class="token operator">-</span> startTime<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; 纳秒&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-jmh报告" tabindex="-1"><a class="header-anchor" href="#_3-jmh报告"><span>3. <strong>JMH报告</strong></span></a></h2><p>在这一部分，我们将使用JMH来评估_Collections.sort()_的效率和性能特征。</p><p>以下基准配置对于在不太有利的条件下评估排序算法的效率至关重要，为我们提供了关于其在平均和最坏情况下行为的宝贵见解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@State</span><span class="token punctuation">(</span><span class="token class-name">Scope<span class="token punctuation">.</span>Benchmark</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">AverageWorstCaseBenchmarkState</span> <span class="token punctuation">{</span>\n    <span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````` unsortedList<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Setup</span><span class="token punctuation">(</span><span class="token class-name">Level<span class="token punctuation">.</span>Trial</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        unsortedList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1000000</span><span class="token punctuation">;</span> i <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            unsortedList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n<span class="token annotation punctuation">@Benchmark</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">measureCollectionsSortAverageWorstCase</span><span class="token punctuation">(</span><span class="token class-name">AverageWorstCaseBenchmarkState</span> state<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````` unsortedList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>unsortedList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>unsortedList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，用@Benchmark注解的方法，名为measureCollectionsSortAverageWorstCase，采用benchmark状态的实例，并使用_Collections.sort()_方法来评估算法在排序严重未排序列表时的性能。</p><p>现在，让我们看看一个类似的基准测试，但是针对最佳情况，数组已经排序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@State</span><span class="token punctuation">(</span><span class="token class-name">Scope<span class="token punctuation">.</span>Benchmark</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">BestCaseBenchmarkState</span> <span class="token punctuation">{</span>\n    <span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````` sortedList<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Setup</span><span class="token punctuation">(</span><span class="token class-name">Level<span class="token punctuation">.</span>Trial</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        sortedList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">1000000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            sortedList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n<span class="token annotation punctuation">@Benchmark</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">measureCollectionsSortBestCase</span><span class="token punctuation">(</span><span class="token class-name">BestCaseBenchmarkState</span> state<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````` sortedList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>sortedList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>sortedList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>提供的代码片段引入了一个基准测试类BestCaseBenchmarkState，用@State(Scope.Benchmark)注解。此外，这个类中的@Setup(Level.Trial)方法初始化了一个从1到1,000,000的整数排序列表，创建了一个测试环境。</p><p>执行测试将给我们以下报告：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>Benchmark                                            Mode  Cnt   Score    Error   Units\nMain.measureCollectionsSortAverageWorstCase          avgt   5    36.810 ± 144.15 ms/op\nMain.measureCollectionsSortBestCase                  avgt   5     8.190 ± 7.229  ms/op\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>基准测试报告表明，在最佳情况下，_Collections.sort()_算法的平均执行时间显著降低，大约为每次操作8.19毫秒，与平均和最坏情况下相对较高的平均时间大约36.81毫秒每次操作相比，这证实了使用大O表示法显示的差异。</strong></p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>总之，使用Java微基准测试工具（JMH）对_Collections.sort()_算法的时间复杂度进行的检查证实了其在最佳情况下的_O(n)_时间复杂度和在平均及最坏情况下的_O(n log n)_时间复杂度。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p>',31),o=[e];function c(l,i){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-06-27-Time Complexity of Java Collections Sort in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-27/2024-06-27-Time%20Complexity%20of%20Java%20Collections%20Sort%20in%20Java.html","title":"Java中Collections.sort()的时间复杂度","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Java","算法"],"tag":["Java Collections","时间复杂度"],"head":[["meta",{"name":"keywords","content":"Java Collections Sort, 时间复杂度, TimSort, Java Microbenchmark Harness (JMH), 排序算法效率"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-27/2024-06-27-Time%20Complexity%20of%20Java%20Collections%20Sort%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中Collections.sort()的时间复杂度"}],["meta",{"property":"og:description","content":"Java中Collections.sort()的时间复杂度 在本教程中，我们将利用Java微基准测试工具（JMH）探索_Collections.sort()_的时间复杂度，并提供示例来说明其效率。 2. 时间复杂度 理解算法的时间复杂度对于评估其效率至关重要。具体来说，Collections.sort()的时间复杂度在最佳情况下是_O(n)，在最坏和平..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-27T05:34:57.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java Collections"}],["meta",{"property":"article:tag","content":"时间复杂度"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T05:34:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中Collections.sort()的时间复杂度\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-27T05:34:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中Collections.sort()的时间复杂度 在本教程中，我们将利用Java微基准测试工具（JMH）探索_Collections.sort()_的时间复杂度，并提供示例来说明其效率。 2. 时间复杂度 理解算法的时间复杂度对于评估其效率至关重要。具体来说，Collections.sort()的时间复杂度在最佳情况下是_O(n)，在最坏和平..."},"headers":[{"level":2,"title":"2. 时间复杂度","slug":"_2-时间复杂度","link":"#_2-时间复杂度","children":[{"level":3,"title":"2.1. 最佳情况时间复杂度","slug":"_2-1-最佳情况时间复杂度","link":"#_2-1-最佳情况时间复杂度","children":[]},{"level":3,"title":"2.2. 平均和最坏情况时间复杂度","slug":"_2-2-平均和最坏情况时间复杂度","link":"#_2-2-平均和最坏情况时间复杂度","children":[]}]},{"level":2,"title":"3. JMH报告","slug":"_3-jmh报告","link":"#_3-jmh报告","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719466497000,"updatedTime":1719466497000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.79,"words":1137},"filePathRelative":"posts/baeldung/2024-06-27/2024-06-27-Time Complexity of Java Collections Sort in Java.md","localizedDate":"2024年6月27日","excerpt":"<hr>\\n<h1>Java中Collections.sort()的时间复杂度</h1>\\n<p>在本教程中，我们将利用Java微基准测试工具（JMH）探索_Collections.sort()_的时间复杂度，并提供示例来说明其效率。</p>\\n<h2>2. 时间复杂度</h2>\\n<p>理解算法的时间复杂度对于评估其效率至关重要。具体来说，<em>Collections.sort()<em>的时间复杂度在最佳情况下是_O(n)</em>，在最坏和平均情况下是_O(n log n)</em>，其中_n_是集合中元素的数量。</p>\\n<h3>2.1. 最佳情况时间复杂度</h3>\\n<p>在Java中，_Collections.sort()_使用TimSort算法进行排序。在以下示例中，TimSort算法首先确定运行长度，创建四个运行：</p>","autoDesc":true}');export{k as comp,d as data};
