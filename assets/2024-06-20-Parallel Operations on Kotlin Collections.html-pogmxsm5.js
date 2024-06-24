import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-By-_aiNB.js";const e={},p=t(`<hr><h1 id="kotlin集合的并行操作" tabindex="-1"><a class="header-anchor" href="#kotlin集合的并行操作"><span>Kotlin集合的并行操作</span></a></h1><p>使用Kotlin集合的并行操作允许我们同时处理集合中的元素，利用多核处理器来提高性能。这对于计算密集型任务，如过滤、映射和数据缩减，非常有用。</p><p>在本文中，我们将讨论一些在Kotlin集合上执行并行操作的方法。</p><p>为了解释并行操作的工作原理，我们将使用以下集合：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">data</span> <span class="token keyword">class</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token keyword">val</span> name<span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">val</span> age<span class="token operator">:</span> Int<span class="token punctuation">,</span> <span class="token keyword">var</span> isAdult<span class="token operator">:</span> Boolean<span class="token operator">?</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>

<span class="token keyword">private</span> <span class="token keyword">val</span> people <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span>
  <span class="token function">Person</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Martin&quot;</span></span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function">Person</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Ahmad&quot;</span></span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function">Person</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Alina&quot;</span></span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function">Person</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Alice&quot;</span></span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function">Person</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Bob&quot;</span></span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function">Person</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Charlie&quot;</span></span><span class="token punctuation">,</span> <span class="token number">40</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的示例中，我们将为18岁及以上的人分配成年状态(<code>isAdult = true</code>)，对于18岁以下的人分配<code>isAdult = false</code>。</p><p>为了使并行操作更清晰，我们还将显示系统时间和线程名称（默认使用SLF4J记录器）：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">private</span> <span class="token keyword">fun</span> Person<span class="token punctuation">.</span><span class="token function">setAdult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>isAdult <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">&gt;=</span> <span class="token number">18</span>
    logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们期望的输出是一个年龄超过15岁的人集合，并按年龄排序：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">private</span> <span class="token keyword">fun</span> List\`\`<span class="token operator">&lt;</span>Person<span class="token operator">&gt;</span>\`\`<span class="token punctuation">.</span><span class="token function">assertOver15AndSortedByAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span>
      <span class="token function">Person</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Bob&quot;</span></span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token function">Person</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Alice&quot;</span></span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token function">Person</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Charlie&quot;</span></span><span class="token punctuation">,</span> <span class="token number">40</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token function">Person</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Ahmad&quot;</span></span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将使用这个扩展函数<code>List\`\`&lt;Person&gt;\`\`.assertOver15AndSortedByAge()</code>来确保我们的每个解决方案都按预期工作。</p><h3 id="_2-1-使用协程" tabindex="-1"><a class="header-anchor" href="#_2-1-使用协程"><span>2.1. 使用协程</span></a></h3><p>协程可以依赖于并行操作，因为它们是非阻塞的、轻量级的、灵活的，并允许我们同时运行多个任务：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> filteredPeople <span class="token operator">=</span> people
  <span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> person <span class="token operator">-&gt;</span>
      async <span class="token punctuation">{</span>
          person<span class="token punctuation">.</span><span class="token function">setAdult</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          person
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token punctuation">.</span><span class="token function">awaitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">filter</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span>age <span class="token operator">&gt;</span> <span class="token number">15</span> <span class="token punctuation">}</span>
  <span class="token punctuation">.</span><span class="token function">sortedBy</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span>age <span class="token punctuation">}</span>

filteredPeople<span class="token punctuation">.</span><span class="token function">assertOver15AndSortedByAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>people.map { person -&gt; … }</code>中，我们使用<code>async { … }</code>为每个<code>person</code>对象创建了一个新的协程。</p><p>这允许协程与其他协程和主线程并发执行。</p><p>我们可以通过查看日志输出来看到每个操作都在不同的协程线程上运行：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>13:03:44.484 [main @coroutine#1] INFO  - 使用协程
13:03:44.522 [main @coroutine#2] INFO  - Person(name=Martin, age=12, isAdult=false)
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>awaitAll()</code>确保在<code>map</code>步骤中创建的所有异步协程都已完成。这确保了<code>filteredPeople</code>列表包含了所有并行处理的结果。</p><h3 id="_2-2-使用kotlin-flow" tabindex="-1"><a class="header-anchor" href="#_2-2-使用kotlin-flow"><span>2.2. 使用Kotlin Flow</span></a></h3><p>协程流—通常称为Kotlin Flow或简称Flow—是建立在协程之上的额外库，用于异步处理流数据。</p><p>我们可以使用<code>flatMapMerge()</code>来并行处理<code>Flow</code>中的元素：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> filteredPeople <span class="token operator">=</span> people<span class="token punctuation">.</span><span class="token function">asFlow</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">flatMapMerge</span> <span class="token punctuation">{</span> person <span class="token operator">-&gt;</span>
      flow <span class="token punctuation">{</span>
          <span class="token function">emit</span><span class="token punctuation">(</span>
            async <span class="token punctuation">{</span>
                person<span class="token punctuation">.</span><span class="token function">setAdult</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                person
            <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token punctuation">.</span><span class="token function">filter</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span>age <span class="token operator">&gt;</span> <span class="token number">15</span> <span class="token punctuation">}</span>
  <span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">sortedBy</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span>age <span class="token punctuation">}</span>

filteredPeople<span class="token punctuation">.</span><span class="token function">assertOver15AndSortedByAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码使用<code>Flow</code>并发处理<code>people</code>数组中的每个<code>person</code>对象：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>13:03:44.706 [main @coroutine#8] INFO  - 使用Kotlin Flow
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>但我们必须注意<code>flatMapMerge()</code>是Kotlin协程中的一个实验性特性，尚未稳定或可能在未来版本中更改。因此，为了使用它，我们必须添加一个注释：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@OptIn</span><span class="token punctuation">(</span>ExperimentalCoroutinesApi<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>像往常一样，我们可以将注释添加到类或函数中。</p><h3 id="_2-3-使用rxjava或rxkotlin" tabindex="-1"><a class="header-anchor" href="#_2-3-使用rxjava或rxkotlin"><span>2.3. 使用RxJava或RxKotlin</span></a></h3><p>RxJava是一个基于Java的反应式编程库，是反应式扩展的实现。同时，RxKotlin是RxJava的Kotlin扩展：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> observable <span class="token operator">=</span> Observable<span class="token punctuation">.</span><span class="token function">fromIterable</span><span class="token punctuation">(</span>people<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>
      <span class="token punctuation">{</span>
          Observable<span class="token punctuation">.</span><span class="token function">just</span><span class="token punctuation">(</span>it<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">subscribeOn</span><span class="token punctuation">(</span>Schedulers<span class="token punctuation">.</span><span class="token function">computation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">doOnNext</span> <span class="token punctuation">{</span> person <span class="token operator">-&gt;</span> person<span class="token punctuation">.</span><span class="token function">setAdult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      people<span class="token punctuation">.</span>size <span class="token comment">// 使用maxConcurrency定义元素的数量</span>
  <span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">filter</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span>age <span class="token operator">&gt;</span> <span class="token number">15</span> <span class="token punctuation">}</span>
  <span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span><span class="token function">sortedBy</span> <span class="token punctuation">{</span> person <span class="token operator">-&gt;</span> person<span class="token punctuation">.</span>age <span class="token punctuation">}</span> <span class="token punctuation">}</span>
  <span class="token punctuation">.</span><span class="token function">blockingGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

observable<span class="token punctuation">.</span><span class="token function">assertOver15AndSortedByAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们将原始的<code>people</code>数组转换为<code>Observable</code>对象：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>Observable<span class="token punctuation">.</span><span class="token function">fromIterable</span><span class="token punctuation">(</span>people<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，RxKotlin提供了一个更简洁的扩展函数作为替代：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>people<span class="token punctuation">.</span><span class="token function">toObservable</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>flatMap()</code>对由<code>Observable</code>发出的每个<code>person</code>应用转换。在这种情况下，它创建了一个新的<code>Observable</code>，发出相同的<code>person</code>对象。</p><p>然后，为了控制并行操作，强烈建议在<code>flatMap()</code>中显式设置<code>maxConcurrency</code>参数。这允许我们定义最大并发内<code>Observable</code>的数量，确保可预测的资源利用。</p><p>让我们在日志输出中看到每个操作在不同的线程中运行：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>13:03:44.691 [main] INFO  - 使用RxKotlin
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到每个操作的线程名称都不同。这表明操作正在并行运行。</p><h3 id="_2-4-使用java-stream-api" tabindex="-1"><a class="header-anchor" href="#_2-4-使用java-stream-api"><span>2.4. 使用Java Stream API</span></a></h3><p>在Java 8中，Stream API引入了一种强大的机制，以声明性和函数式的方式处理数据集合。</p><p>我们可以使用<code>parallelStream()</code>，这是<code>Collection</code>类型（如<code>List</code>、<code>Set</code>等）的可用方法，它从<code>Collection</code>的元素创建一个并行<code>Stream</code>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> filteredPeople <span class="token operator">=</span> people<span class="token punctuation">.</span><span class="token function">parallelStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> person <span class="token operator">-&gt;</span>
      person<span class="token punctuation">.</span><span class="token function">setAdult</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      person
  <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">filter</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span>age <span class="token operator">&gt;</span> <span class="token number">15</span> <span class="token punctuation">}</span>
  <span class="token punctuation">.</span><span class="token function">sorted</span> <span class="token punctuation">{</span> p1<span class="token punctuation">,</span> p2 <span class="token operator">-&gt;</span> p1<span class="token punctuation">.</span>age<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>p2<span class="token punctuation">.</span>age<span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span>Collectors<span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

filteredPeople<span class="token punctuation">.</span><span class="token function">assertOver15AndSortedByAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们调用<code>parallelStream()</code>时，<code>Collection</code>的元素被划分为几个子<code>Stream</code>实例。</p><p>每个子<code>Stream</code>然后在单独的线程上并发处理：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>13:03:44.683 [main] INFO  - 使用Stream API
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，每个子<code>Stream</code>的结果被组合以产生<code>Stream</code>操作的最终结果。</p><h3 id="_2-5-使用-executorservice" tabindex="-1"><a class="header-anchor" href="#_2-5-使用-executorservice"><span>2.5. 使用_ExecutorService_</span></a></h3><p>现在我们将使用<code>ExecutorService</code>，这是Java中的一个接口，提供了一种异步执行任务（<code>Runnable</code>或<code>Callable</code>）的方式。</p><p>首先，我们必须创建一个线程池，其大小等于<code>people</code>元素的数量：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> executor <span class="token operator">=</span> Executors<span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span>people<span class="token punctuation">.</span>size<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后我们调用<code>map{}</code>对<code>people</code>中的每个元素（<code>person</code>）应用一个lambda表达式。我们使用lambda表达式创建一个新的<code>Callable</code>对象，并将其<code>submit()</code>到<code>executor</code>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> futures <span class="token operator">=</span> people
  <span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> person <span class="token operator">-&gt;</span>
      executor<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span>Callable <span class="token punctuation">{</span>
          person<span class="token punctuation">.</span><span class="token function">setAdult</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          person
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token punctuation">.</span><span class="token function">filter</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span>age <span class="token operator">&gt;</span> <span class="token number">15</span> <span class="token punctuation">}</span>
  <span class="token punctuation">.</span><span class="token function">sortedBy</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span>age <span class="token punctuation">}</span>

futures<span class="token punctuation">.</span><span class="token function">assertOver15AndSortedByAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以再次检查日志，以看到使用了多个并发线程：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>13:03:44.700 [main] INFO  - 使用ExecutorService
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们将通过调用<code>shutdown()</code>来停止线程池：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>executor<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这确保了<code>executor</code>释放了它持有的资源。</p><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3. 结论</span></a></h2><p>在本教程中，我们讨论了在Kotlin集合上执行并行操作的各种方法。</p><p>协程和Kotlin Flow以其富有表现力的Kotlin风格可以很好地完成这项工作。如果我们想使用第三方库，RxJava或RxKotlin也是成熟可靠的选择。另外，Java也有处理此问题的相关API，如<code>Stream</code>和<code>ExecutorService</code>。</p><p>如常，示例的源代码可在GitHub上获取。</p>`,64),o=[p];function l(c,i){return a(),s("div",null,o)}const d=n(e,[["render",l],["__file","2024-06-20-Parallel Operations on Kotlin Collections.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Parallel%20Operations%20on%20Kotlin%20Collections.html","title":"Kotlin集合的并行操作","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Kotlin","并行操作"],"tag":["Kotlin","并行流","协程"],"head":[["meta",{"name":"keywords","content":"Kotlin, 并行操作, 协程, 流, RxJava, Java Stream API, ExecutorService"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Parallel%20Operations%20on%20Kotlin%20Collections.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin集合的并行操作"}],["meta",{"property":"og:description","content":"Kotlin集合的并行操作 使用Kotlin集合的并行操作允许我们同时处理集合中的元素，利用多核处理器来提高性能。这对于计算密集型任务，如过滤、映射和数据缩减，非常有用。 在本文中，我们将讨论一些在Kotlin集合上执行并行操作的方法。 为了解释并行操作的工作原理，我们将使用以下集合： 在我们的示例中，我们将为18岁及以上的人分配成年状态(isAdul..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"并行流"}],["meta",{"property":"article:tag","content":"协程"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin集合的并行操作\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin集合的并行操作 使用Kotlin集合的并行操作允许我们同时处理集合中的元素，利用多核处理器来提高性能。这对于计算密集型任务，如过滤、映射和数据缩减，非常有用。 在本文中，我们将讨论一些在Kotlin集合上执行并行操作的方法。 为了解释并行操作的工作原理，我们将使用以下集合： 在我们的示例中，我们将为18岁及以上的人分配成年状态(isAdul..."},"headers":[{"level":3,"title":"2.1. 使用协程","slug":"_2-1-使用协程","link":"#_2-1-使用协程","children":[]},{"level":3,"title":"2.2. 使用Kotlin Flow","slug":"_2-2-使用kotlin-flow","link":"#_2-2-使用kotlin-flow","children":[]},{"level":3,"title":"2.3. 使用RxJava或RxKotlin","slug":"_2-3-使用rxjava或rxkotlin","link":"#_2-3-使用rxjava或rxkotlin","children":[]},{"level":3,"title":"2.4. 使用Java Stream API","slug":"_2-4-使用java-stream-api","link":"#_2-4-使用java-stream-api","children":[]},{"level":3,"title":"2.5. 使用_ExecutorService_","slug":"_2-5-使用-executorservice","link":"#_2-5-使用-executorservice","children":[]},{"level":2,"title":"3. 结论","slug":"_3-结论","link":"#_3-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.9,"words":1469},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Parallel Operations on Kotlin Collections.md","localizedDate":"2024年6月20日","excerpt":"<hr>\\n<h1>Kotlin集合的并行操作</h1>\\n<p>使用Kotlin集合的并行操作允许我们同时处理集合中的元素，利用多核处理器来提高性能。这对于计算密集型任务，如过滤、映射和数据缩减，非常有用。</p>\\n<p>在本文中，我们将讨论一些在Kotlin集合上执行并行操作的方法。</p>\\n<p>为了解释并行操作的工作原理，我们将使用以下集合：</p>\\n<div class=\\"language-kotlin\\" data-ext=\\"kt\\" data-title=\\"kt\\"><pre class=\\"language-kotlin\\"><code><span class=\\"token keyword\\">data</span> <span class=\\"token keyword\\">class</span> <span class=\\"token function\\">Person</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">val</span> name<span class=\\"token operator\\">:</span> String<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">val</span> age<span class=\\"token operator\\">:</span> Int<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">var</span> isAdult<span class=\\"token operator\\">:</span> Boolean<span class=\\"token operator\\">?</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">)</span>\\n\\n<span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">val</span> people <span class=\\"token operator\\">=</span> <span class=\\"token function\\">listOf</span><span class=\\"token punctuation\\">(</span>\\n  <span class=\\"token function\\">Person</span><span class=\\"token punctuation\\">(</span><span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"Martin\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">12</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token function\\">Person</span><span class=\\"token punctuation\\">(</span><span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"Ahmad\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">42</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token function\\">Person</span><span class=\\"token punctuation\\">(</span><span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"Alina\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">13</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token function\\">Person</span><span class=\\"token punctuation\\">(</span><span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"Alice\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">30</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token function\\">Person</span><span class=\\"token punctuation\\">(</span><span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"Bob\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">16</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token function\\">Person</span><span class=\\"token punctuation\\">(</span><span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"Charlie\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">40</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">)</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
