import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-B5SPsEv6.js";const e={},p=t(`<h1 id="java中检测for循环的最后一次迭代" tabindex="-1"><a class="header-anchor" href="#java中检测for循环的最后一次迭代"><span>Java中检测for循环的最后一次迭代</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>for-each循环是一个在迭代List时优雅且简单的工具。有时，我们需要根据当前迭代是否是最后一次来执行特定操作或做出决策。</p><p>在本教程中，我们将讨论这种情况，并探索在for循环中确定当前迭代是否是最后一次的不同方法。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>首先，让我们创建一个电影标题的List作为我们的输入示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token constant">MOVIES</span> <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>
  <span class="token string">&quot;Titanic&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;The Deer Hunter&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;Lord of the Rings&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;One Flew Over the Cuckoo&#39;s Nest&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;No Country For Old Men&quot;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们仅仅想要在典型的for-each循环之后获得最后一个元素，这并不难。我们可以在每次迭代中简单地将同一个变量重新赋值为元素。当我们遍历完整个列表后，变量将持有最后一个元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> myLastMovie <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> movie <span class="token operator">:</span> <span class="token constant">MOVIES</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 做一些与电影相关的工作</span>
    myLastMovie <span class="token operator">=</span> movie<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;No Country For Old Men&quot;</span><span class="token punctuation">,</span> myLastMovie<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，有时我们只需要在最后一次迭代中执行一些特定的操作。因此，在循环过程中，我们必须识别for-each循环中的最后一次迭代。</p><p>与具有索引变量的传统for循环不同，for-each循环隐藏了当前迭代的信息。因此，缺少明确的循环索引使得确定最后一次迭代成为一个挑战。</p><p>接下来，让我们看看如何解决这个问题。</p><h2 id="_3-使用intstream" tabindex="-1"><a class="header-anchor" href="#_3-使用intstream"><span>3. 使用IntStream</span></a></h2><p>我们知道，使用传统的for循环解决问题并不难，因为我们知道当前迭代的索引：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> size <span class="token operator">=</span> <span class="token constant">MOVIES</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> myLastMovie <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> size<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> movie <span class="token operator">=</span> <span class="token constant">MOVIES</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// ... 做一些与电影相关的工作</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">==</span> size <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        myLastMovie <span class="token operator">=</span> movie<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;No Country For Old Men&quot;</span><span class="token punctuation">,</span> myLastMovie<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以遵循相同的思路，<strong>创建一个包含列表元素所有索引的IntStream</strong>。然后，我们可以使用forEach()方法遍历索引，并像在传统for循环中一样检查当前是否是最后一次迭代：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> size <span class="token operator">=</span> <span class="token constant">MOVIES</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` myLastMovie <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> size<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>idx <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
      <span class="token class-name">String</span> movie <span class="token operator">=</span> <span class="token constant">MOVIES</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>idx<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// ... 做一些与电影相关的工作</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>idx <span class="token operator">==</span> size <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          myLastMovie<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>idx<span class="token punctuation">,</span> movie<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> myLastMovie<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>myLastMovie<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>size <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>myLastMovie<span class="token punctuation">.</span><span class="token function">containsValue</span><span class="token punctuation">(</span><span class="token string">&quot;No Country For Old Men&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在测试中看到的，我们使用了IntStream.range(0, list.size())方法来初始化列表的索引流。值得注意的是，我们使用了一个Map对象来存储最后一个索引和值，以供后续验证。这是因为<strong>在lambdas中使用的局部变量必须是final或实际上的final</strong>。</p><h2 id="_4-使用外部计数器" tabindex="-1"><a class="header-anchor" href="#_4-使用外部计数器"><span>4. 使用外部计数器</span></a></h2><p>另外，我们可以<strong>维护一个外部计数器变量来跟踪迭代次数</strong>。通过将计数器与集合的大小进行比较，我们可以确定最后一次迭代：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> size <span class="token operator">=</span> <span class="token constant">MOVIES</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> myLastMovie <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> cnt <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> movie <span class="token operator">:</span> <span class="token constant">MOVIES</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ... 做一些与电影相关的工作</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">++</span>cnt <span class="token operator">==</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        myLastMovie <span class="token operator">=</span> movie<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;No Country For Old Men&quot;</span><span class="token punctuation">,</span> myLastMovie<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与IntStream解决方案相比，这种方法更直接。</p><h2 id="_5-使用iterator循环" tabindex="-1"><a class="header-anchor" href="#_5-使用iterator循环"><span>5. 使用Iterator循环</span></a></h2><p>尽管我们已经在IntStream和计数器方法中解决了问题，但这两种解决方案都需要引入新变量并执行额外的比较来检测最后一次迭代。</p><p>接下来，让我们看看在使用Iterator遍历列表时如何确定最后一次迭代。</p><p>Iterator提供了<strong>hasNext()方法，允许我们方便地检查当前迭代是否是最后一次</strong>。因此，我们不需要为此目的引入额外的变量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> movie<span class="token punctuation">;</span>
<span class="token class-name">String</span> myLastMovie <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Iterator</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` it <span class="token operator">=</span> <span class="token constant">MOVIES</span><span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> it<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    movie <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// ... 做一些与电影相关的工作</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>it<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 最后一个元素</span>
        myLastMovie <span class="token operator">=</span> movie<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;No Country For Old Men&quot;</span><span class="token punctuation">,</span> myLastMovie<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，<strong>使用Iterator是解决这个问题的最佳选择</strong>。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了三种在for-each循环中遍历List时识别最后一次迭代的方法。</p><p>凭借其内置的hasNext()检查，Iterator方法可以是解决这个特定挑战的最佳解决方案。</p><p>如常，示例的完整源代码可在GitHub上找到。</p>`,32),o=[p];function c(i,l){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-25-Detect the Last Iteration in for Loops in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-25/2024-06-25-Detect%20the%20Last%20Iteration%20in%20for%20Loops%20in%20Java.html","title":"Java中检测for循环的最后一次迭代","lang":"zh-CN","frontmatter":{"date":"2024-06-26T00:00:00.000Z","category":["Java","编程"],"tag":["for循环","迭代器","Java"],"head":[["meta",{"name":"keywords","content":"Java, for循环, 迭代器, 编程技巧"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-25/2024-06-25-Detect%20the%20Last%20Iteration%20in%20for%20Loops%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中检测for循环的最后一次迭代"}],["meta",{"property":"og:description","content":"Java中检测for循环的最后一次迭代 1. 概述 for-each循环是一个在迭代List时优雅且简单的工具。有时，我们需要根据当前迭代是否是最后一次来执行特定操作或做出决策。 在本教程中，我们将讨论这种情况，并探索在for循环中确定当前迭代是否是最后一次的不同方法。 2. 问题介绍 首先，让我们创建一个电影标题的List作为我们的输入示例： 如果我..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-25T21:51:00.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"for循环"}],["meta",{"property":"article:tag","content":"迭代器"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2024-06-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-25T21:51:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中检测for循环的最后一次迭代\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-25T21:51:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中检测for循环的最后一次迭代 1. 概述 for-each循环是一个在迭代List时优雅且简单的工具。有时，我们需要根据当前迭代是否是最后一次来执行特定操作或做出决策。 在本教程中，我们将讨论这种情况，并探索在for循环中确定当前迭代是否是最后一次的不同方法。 2. 问题介绍 首先，让我们创建一个电影标题的List作为我们的输入示例： 如果我..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用IntStream","slug":"_3-使用intstream","link":"#_3-使用intstream","children":[]},{"level":2,"title":"4. 使用外部计数器","slug":"_4-使用外部计数器","link":"#_4-使用外部计数器","children":[]},{"level":2,"title":"5. 使用Iterator循环","slug":"_5-使用iterator循环","link":"#_5-使用iterator循环","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719352260000,"updatedTime":1719352260000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.68,"words":1105},"filePathRelative":"posts/baeldung/2024-06-25/2024-06-25-Detect the Last Iteration in for Loops in Java.md","localizedDate":"2024年6月26日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>for-each循环是一个在迭代List时优雅且简单的工具。有时，我们需要根据当前迭代是否是最后一次来执行特定操作或做出决策。</p>\\n<p>在本教程中，我们将讨论这种情况，并探索在for循环中确定当前迭代是否是最后一次的不同方法。</p>\\n<h2>2. 问题介绍</h2>\\n<p>首先，让我们创建一个电影标题的List作为我们的输入示例：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">List</span>``<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>`` <span class=\\"token constant\\">MOVIES</span> <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">List</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">of</span><span class=\\"token punctuation\\">(</span>\\n  <span class=\\"token string\\">\\"Titanic\\"</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token string\\">\\"The Deer Hunter\\"</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token string\\">\\"Lord of the Rings\\"</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token string\\">\\"One Flew Over the Cuckoo\'s Nest\\"</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token string\\">\\"No Country For Old Men\\"</span>\\n<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
