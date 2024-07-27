import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CJGTm_7y.js";const p={},e=t(`<h1 id="java中数组与列表的性能比较" tabindex="-1"><a class="header-anchor" href="#java中数组与列表的性能比较"><span>Java中数组与列表的性能比较</span></a></h1><p>在Java编程语言中，数组和列表是两种主要的数据结构，用于存储一系列元素。数组和列表都有各自的优缺点，选择适当的数据结构取决于我们用例的具体要求。</p><p>在本教程中，我们将检查Java中数组和列表的性能差异，并提供测试示例，使用Java Microbenchmark Harness (JMH)来比较它们的效率。</p><h2 id="_2-创建新对象的性能" tabindex="-1"><a class="header-anchor" href="#_2-创建新对象的性能"><span>2. 创建新对象的性能</span></a></h2><p>让我们通过一个简单的Java示例比较创建数组和ArrayList的性能：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Benchmark</span>
<span class="token keyword">public</span> <span class="token class-name">Integer</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">arrayCreation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Integer</span><span class="token punctuation">[</span><span class="token number">256</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Benchmark</span>
<span class="token keyword">public</span> <span class="token class-name">ArrayList</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">arrayListCreation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下表显示了创建数组和ArrayList所需的时间（以纳秒为单位）：</p><table><thead><tr><th>基准测试</th><th>模式</th><th>计数</th><th>时间</th><th>误差</th><th>单位</th></tr></thead><tbody><tr><td>数组 – 创建</td><td>avgt</td><td>5</td><td>202.909</td><td>2.135</td><td>ns/op</td></tr><tr><td>列表 – 创建</td><td>avgt</td><td>5</td><td>231.565</td><td>103.332</td><td>ns/op</td></tr></tbody></table><p>结果表明，创建数组的平均时间（202.909 ns/op）比创建ArrayList的平均时间（231.565 ns/op）要快得多。</p><h2 id="_3-添加项目的性能" tabindex="-1"><a class="header-anchor" href="#_3-添加项目的性能"><span>3. 添加项目的性能</span></a></h2><p>让我们比较在数组和ArrayList中添加项目的性能：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Benchmark</span>
<span class="token keyword">public</span> <span class="token class-name">Integer</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">arrayItemsSetting</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">256</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        array<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> array<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Benchmark</span>
<span class="token keyword">public</span> <span class="token class-name">ArrayList</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">arrayListItemsSetting</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">256</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> list<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下表显示了在数组和ArrayList中设置项目值所需的时间（以纳秒为单位）：</p><table><thead><tr><th>基准测试</th><th>模式</th><th>计数</th><th>时间</th><th>误差</th><th>单位</th></tr></thead><tbody><tr><td>数组 – 添加</td><td>avgt</td><td>5</td><td>2587.040</td><td>671.391</td><td>ns/op</td></tr><tr><td>列表 – 添加</td><td>avgt</td><td>5</td><td>2269.738</td><td>906.403</td><td>ns/op</td></tr></tbody></table><p>基准测试结果表明，设置数组中项目的平均时间（2587.040 ns/op）比创建ArrayList的平均时间（2269.738 ns/op）要慢。</p><h2 id="_4-获取项目的性能" tabindex="-1"><a class="header-anchor" href="#_4-获取项目的性能"><span>4. 获取项目的性能</span></a></h2><p>让我们比较从数组和ArrayList中获取项目值的性能：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Benchmark</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">arrayItemsRetrieval</span><span class="token punctuation">(</span><span class="token class-name">Blackhole</span> blackhole<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">256</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> item <span class="token operator">=</span> array<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        blackhole<span class="token punctuation">.</span><span class="token function">consume</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Benchmark</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">arrayListItemsRetrieval</span><span class="token punctuation">(</span><span class="token class-name">Blackhole</span> blackhole<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">256</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> item <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        blackhole<span class="token punctuation">.</span><span class="token function">consume</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下表显示了从数组和ArrayList中检索项目所需的时间（以纳秒为单位）：</p><table><thead><tr><th>基准测试</th><th>模式</th><th>计数</th><th>时间</th><th>误差</th><th>单位</th></tr></thead><tbody><tr><td>数组 – 获取</td><td>avgt</td><td>5</td><td>163.559</td><td>13.503</td><td>ns/op</td></tr><tr><td>列表 – 获取</td><td>avgt</td><td>5</td><td>261.106</td><td>5.371</td><td>ns/op</td></tr></tbody></table><p>数组具有更快的项目检索时间（163.559 ns/op）。相比之下，ArrayList的项目检索时间更长（261.106 ns/op），这是由于在后备数组上执行了额外的检查。</p><p>请注意，此基准测试是在Open JDK 17.0.2上运行的。</p><h2 id="_5-克隆的性能" tabindex="-1"><a class="header-anchor" href="#_5-克隆的性能"><span>5. 克隆的性能</span></a></h2><p>让我们比较克隆/复制数组和ArrayList的性能：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Benchmark</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">arrayCloning</span><span class="token punctuation">(</span><span class="token class-name">Blackhole</span> blackhole<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Integer</span><span class="token punctuation">[</span><span class="token punctuation">]</span> newArray <span class="token operator">=</span> array<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    blackhole<span class="token punctuation">.</span><span class="token function">consume</span><span class="token punctuation">(</span>newArray<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Benchmark</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">arrayListCloning</span><span class="token punctuation">(</span><span class="token class-name">Blackhole</span> blackhole<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ArrayList</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` newList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
    blackhole<span class="token punctuation">.</span><span class="token function">consume</span><span class="token punctuation">(</span>newList<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下表显示了克隆/复制数组和ArrayList所需的时间（以纳秒为单位）：</p><table><thead><tr><th>基准测试</th><th>模式</th><th>计数</th><th>时间</th><th>误差</th><th>单位</th></tr></thead><tbody><tr><td>数组 – 克隆</td><td>avgt</td><td>5</td><td>204.608</td><td>5.270</td><td>ns/op</td></tr><tr><td>列表 – 克隆</td><td>avgt</td><td>5</td><td>232.177</td><td>80.040</td><td>ns/op</td></tr></tbody></table><p>数组克隆比ArrayList快得多，因为数组创建是一个更简单的操作，涉及分配一个连续的内存块。相比之下，ArrayList的创建涉及额外的开销，例如初始化内部数据结构和动态调整列表大小。</p><p>让我们记住，实际性能可能会因各种因素而异，例如集合的大小、代码执行的硬件以及使用的Java版本。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>总之，本文比较了Java中数组和列表的性能。然而，重要的是要注意，实际性能可能会因集合大小和硬件而异。</p><p>完整的示例代码可在GitHub上找到。抱歉，由于原文内容较长，我将分两部分完成翻译。以下是第二部分的翻译：</p><h2 id="_6-结论-1" tabindex="-1"><a class="header-anchor" href="#_6-结论-1"><span>6. 结论</span></a></h2><p>总之，本文比较了Java中数组和列表的性能。然而，重要的是要注意，实际性能可能会因集合的大小和硬件而异。</p><p>完整的示例代码可在GitHub上找到。</p><p>请注意，实际性能可能会因各种因素而异，例如集合的大小、代码执行的硬件以及使用的Java版本。</p><p>文章的类别和标签可能需要根据网页的实际内容进行调整，因为从提供的文本中无法直接获取这些信息。如果需要进一步的翻译或有其他问题，请随时告知。</p><p>OK</p>`,38),o=[e];function c(l,i){return s(),a("div",null,o)}const d=n(p,[["render",c],["__file","2024-07-05-Array vs. List Performance in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Array%20vs.%20List%20Performance%20in%20Java.html","title":"Java中数组与列表的性能比较","lang":"zh-CN","frontmatter":{"date":"2024-07-05T00:00:00.000Z","category":["Java","性能"],"tag":["数组","列表"],"head":[["meta",{"name":"keywords","content":"Java, 数组, 列表, 性能比较"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Array%20vs.%20List%20Performance%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中数组与列表的性能比较"}],["meta",{"property":"og:description","content":"Java中数组与列表的性能比较 在Java编程语言中，数组和列表是两种主要的数据结构，用于存储一系列元素。数组和列表都有各自的优缺点，选择适当的数据结构取决于我们用例的具体要求。 在本教程中，我们将检查Java中数组和列表的性能差异，并提供测试示例，使用Java Microbenchmark Harness (JMH)来比较它们的效率。 2. 创建新对..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T05:36:20.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"数组"}],["meta",{"property":"article:tag","content":"列表"}],["meta",{"property":"article:published_time","content":"2024-07-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T05:36:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中数组与列表的性能比较\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-05T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T05:36:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中数组与列表的性能比较 在Java编程语言中，数组和列表是两种主要的数据结构，用于存储一系列元素。数组和列表都有各自的优缺点，选择适当的数据结构取决于我们用例的具体要求。 在本教程中，我们将检查Java中数组和列表的性能差异，并提供测试示例，使用Java Microbenchmark Harness (JMH)来比较它们的效率。 2. 创建新对..."},"headers":[{"level":2,"title":"2. 创建新对象的性能","slug":"_2-创建新对象的性能","link":"#_2-创建新对象的性能","children":[]},{"level":2,"title":"3. 添加项目的性能","slug":"_3-添加项目的性能","link":"#_3-添加项目的性能","children":[]},{"level":2,"title":"4. 获取项目的性能","slug":"_4-获取项目的性能","link":"#_4-获取项目的性能","children":[]},{"level":2,"title":"5. 克隆的性能","slug":"_5-克隆的性能","link":"#_5-克隆的性能","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论-1","link":"#_6-结论-1","children":[]}],"git":{"createdTime":1720157780000,"updatedTime":1720157780000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.66,"words":1097},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Array vs. List Performance in Java.md","localizedDate":"2024年7月5日","excerpt":"\\n<p>在Java编程语言中，数组和列表是两种主要的数据结构，用于存储一系列元素。数组和列表都有各自的优缺点，选择适当的数据结构取决于我们用例的具体要求。</p>\\n<p>在本教程中，我们将检查Java中数组和列表的性能差异，并提供测试示例，使用Java Microbenchmark Harness (JMH)来比较它们的效率。</p>\\n<h2>2. 创建新对象的性能</h2>\\n<p>让我们通过一个简单的Java示例比较创建数组和ArrayList的性能：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Benchmark</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">Integer</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> <span class=\\"token function\\">arrayCreation</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Integer</span><span class=\\"token punctuation\\">[</span><span class=\\"token number\\">256</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token annotation punctuation\\">@Benchmark</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">ArrayList</span>`<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">Integer</span><span class=\\"token punctuation\\">&gt;</span></span>` <span class=\\"token function\\">arrayListCreation</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ArrayList</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">256</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
