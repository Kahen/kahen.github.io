import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BOJj4F50.js";const e={},p=t(`<h1 id="java中并行化for循环" tabindex="-1"><a class="header-anchor" href="#java中并行化for循环"><span>Java中并行化for循环</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>有时，我们可能需要在for循环中处理大量的元素。顺序执行可能需要很长时间，并且使系统利用率不足。</p><p>在本教程中，我们将学习在Java中并行化for循环的不同方法，以提高应用程序在这种情况下的性能。</p><h2 id="_2-顺序处理" tabindex="-1"><a class="header-anchor" href="#_2-顺序处理"><span>2. 顺序处理</span></a></h2><p>让我们首先看看如何使用for循环顺序处理元素并测量处理元素所需的时间。</p><h3 id="_2-1-使用for循环进行顺序处理" tabindex="-1"><a class="header-anchor" href="#_2-1-使用for循环进行顺序处理"><span>2.1. 使用for循环进行顺序处理</span></a></h3><p>首先，我们将创建一个运行100次的for循环，并在每次迭代中执行一个重量级操作。</p><p>重量级操作的常见示例包括数据库调用、网络调用或CPU密集型操作。为了模拟重量级操作所需的时间，让我们在每次迭代中调用Thread.sleep()方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Processor</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">processSerially</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们在每次迭代中调用Thread.sleep()方法。这会导致执行暂停10毫秒。当我们运行processSerially()方法时，顺序处理元素需要大量的时间。</p><p>我们将在接下来的部分中通过并行化for循环来优化这个方法。最后，我们将比较顺序处理和并行处理所需的时间。</p><h2 id="_3-使用executorservice进行并行处理" tabindex="-1"><a class="header-anchor" href="#_3-使用executorservice进行并行处理"><span>3. 使用ExecutorService进行并行处理</span></a></h2><p>ExecutorService是一个接口，表示异步执行机制。它允许我们提交任务以供执行，并提供管理它们的方法。</p><p>让我们看看如何使用ExecutorService接口来并行化for循环：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">processParallelyWithExecutorService</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token class-name">ExecutorService</span> executorService <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span><span class="token operator">&lt;</span><span class="token class-name">CompletableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">&gt;</span></span>\`<span class="token operator">&gt;</span> futures <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">CompletableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">&gt;</span></span>\` future <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">runAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> executorService<span class="token punctuation">)</span><span class="token punctuation">;</span>
        futures<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>future<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">allOf</span><span class="token punctuation">(</span>futures<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    executorService<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中需要注意以下几点：</p><ul><li>我们使用newFixedThreadPool()方法创建了一个10个线程的线程池。</li><li>接下来，我们使用CompletableFuture.runAsync()方法将任务提交到线程池。runAsync()方法确保它提供的任务在单独的线程中异步运行。</li><li>该方法接受一个Callable或Runnable对象作为参数。在这种情况下，我们使用lambda表达式创建了一个Runnable对象。</li><li>runAsync()方法返回一个CompletableFuture对象。我们将其添加到CompletableFuture对象列表中，以便稍后使用executorService实例中的线程池执行。</li><li>接下来，我们使用CompletableFuture.allOf()方法组合CompletableFuture对象，并在它们上调用join()操作。当执行join()时，进程等待所有CompletableFuture任务并行完成。</li><li>最后，我们使用shutdown()方法关闭执行服务。这个方法释放了线程池中的所有线程。</li></ul><h2 id="_4-使用streams进行并行处理" tabindex="-1"><a class="header-anchor" href="#_4-使用streams进行并行处理"><span>4. 使用Streams进行并行处理</span></a></h2><p>Java 8引入了Stream API，它支持并行处理。让我们探索如何使用Stream API的parallel()方法来并行化for循环。</p><h3 id="_4-1-使用并行流" tabindex="-1"><a class="header-anchor" href="#_4-1-使用并行流"><span>4.1. 使用并行流</span></a></h3><p>让我们看看如何使用Stream API的parallel()方法来并行化for循环：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">processParallelyWithStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">parallel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>i <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们使用IntStream.range()方法创建了一个整数流。接下来，我们调用parallel()方法来并行化流。</p><p>最后，我们调用forEach()方法来处理流中的元素。对于每个元素，我们调用Thread.sleep()方法来模拟一个重量级操作。</p><h3 id="_4-2-使用streamsupport" tabindex="-1"><a class="header-anchor" href="#_4-2-使用streamsupport"><span>4.2. 使用StreamSupport</span></a></h3><p>另一种并行化for循环的方法是使用StreamSupport类。让我们看看同样的代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">processParallelyWithStreamSupport</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Iterable</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\` iterable <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Stream</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\` stream <span class="token operator">=</span> <span class="token class-name">StreamSupport</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>iterable<span class="token punctuation">.</span><span class="token function">spliterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    stream<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>i <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>StreamSupport类提供了一个stream()方法，它接受一个Iterable对象作为参数。此外，它还接受一个布尔参数，以指示流是否应该是并行的。</p><p>在这里，我们使用IntStream.range()方法创建了一个Iterable对象。接下来，我们调用stream()方法来创建一个整数流。最后，我们调用forEach()方法来处理流中的元素。</p><p>parallel()方法和StreamSupport类的工作方式类似。它们在内部创建线程来处理流中的元素。创建的线程数量取决于系统中可用的核心数量。</p><h2 id="_5-性能比较" tabindex="-1"><a class="header-anchor" href="#_5-性能比较"><span>5. 性能比较</span></a></h2><p>现在我们已经看到了并行化for循环的不同方法，让我们比较每种方法的性能。为此，我们将使用Java Microbenchmark Harness (JMH)。首先，我们需要将JMH依赖项添加到我们的项目中。</p><p>接下来，让我们将@BenchmarkMode注解添加到我们的方法中，并启用它们以用于平均时间的基准测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Benchmark</span>
<span class="token annotation punctuation">@BenchmarkMode</span><span class="token punctuation">(</span><span class="token class-name">Mode<span class="token punctuation">.</span>AverageTime</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">processSerially</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类似地，我们也对所有并行处理方法执行相同的操作。</p><p>要运行基准测试，让我们创建一个main()方法并设置JMH：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Benchmark</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>openjdk<span class="token punctuation">.</span>jmh<span class="token punctuation">.</span></span>Main</span><span class="token punctuation">.</span><span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;com.baeldung.concurrent.parallel.Processor&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从我们的main()方法中，我们调用JMH的main()方法，并将Processor类的路径作为参数传递。这告诉JMH在Processor类的基准测试方法上运行。</p><p>当我们运行main()方法时，我们看到了以下结果：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/07/benchmarking-results.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>正如我们从上述结果中看到的，使用并行处理元素所需的时间远少于顺序处理所需的时间。</p><p>值得注意的是，<strong>处理元素所需的时间可能因系统而异</strong>。这取决于系统中可用的核心数量。</p><p>另外，<strong>每次运行中每种并行方法所需的时间可能会有所不同，这些数字并不是这些方法之间的确切比较</strong>。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了在Java中并行化for循环的不同方法。我们探索了如何使用ExecutorService接口、Stream API和StreamSupport实用工具来并行化for循环。最后，我们使用JMH比较了每种方法的性能。</p><p>如往常一样，示例代码可在GitHub上找到。</p>`,47),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-03-Parallelize for Loop in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-Parallelize%20for%20Loop%20in%20Java.html","title":"Java中并行化for循环","lang":"zh-CN","frontmatter":{"date":"2023-07-31T00:00:00.000Z","category":["Java","Concurrency"],"tag":["for loop","parallelism","Java 8"],"head":[["meta",{"name":"keywords","content":"Java, for loop, parallel processing, ExecutorService, Stream API, StreamSupport, performance, benchmarking"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-Parallelize%20for%20Loop%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中并行化for循环"}],["meta",{"property":"og:description","content":"Java中并行化for循环 1. 概述 有时，我们可能需要在for循环中处理大量的元素。顺序执行可能需要很长时间，并且使系统利用率不足。 在本教程中，我们将学习在Java中并行化for循环的不同方法，以提高应用程序在这种情况下的性能。 2. 顺序处理 让我们首先看看如何使用for循环顺序处理元素并测量处理元素所需的时间。 2.1. 使用for循环进行顺..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/07/benchmarking-results.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T14:35:34.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"for loop"}],["meta",{"property":"article:tag","content":"parallelism"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:published_time","content":"2023-07-31T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T14:35:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中并行化for循环\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/07/benchmarking-results.png\\"],\\"datePublished\\":\\"2023-07-31T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T14:35:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中并行化for循环 1. 概述 有时，我们可能需要在for循环中处理大量的元素。顺序执行可能需要很长时间，并且使系统利用率不足。 在本教程中，我们将学习在Java中并行化for循环的不同方法，以提高应用程序在这种情况下的性能。 2. 顺序处理 让我们首先看看如何使用for循环顺序处理元素并测量处理元素所需的时间。 2.1. 使用for循环进行顺..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 顺序处理","slug":"_2-顺序处理","link":"#_2-顺序处理","children":[{"level":3,"title":"2.1. 使用for循环进行顺序处理","slug":"_2-1-使用for循环进行顺序处理","link":"#_2-1-使用for循环进行顺序处理","children":[]}]},{"level":2,"title":"3. 使用ExecutorService进行并行处理","slug":"_3-使用executorservice进行并行处理","link":"#_3-使用executorservice进行并行处理","children":[]},{"level":2,"title":"4. 使用Streams进行并行处理","slug":"_4-使用streams进行并行处理","link":"#_4-使用streams进行并行处理","children":[{"level":3,"title":"4.1. 使用并行流","slug":"_4-1-使用并行流","link":"#_4-1-使用并行流","children":[]},{"level":3,"title":"4.2. 使用StreamSupport","slug":"_4-2-使用streamsupport","link":"#_4-2-使用streamsupport","children":[]}]},{"level":2,"title":"5. 性能比较","slug":"_5-性能比较","link":"#_5-性能比较","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720017334000,"updatedTime":1720017334000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.15,"words":1544},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-Parallelize for Loop in Java.md","localizedDate":"2023年7月31日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>有时，我们可能需要在for循环中处理大量的元素。顺序执行可能需要很长时间，并且使系统利用率不足。</p>\\n<p>在本教程中，我们将学习在Java中并行化for循环的不同方法，以提高应用程序在这种情况下的性能。</p>\\n<h2>2. 顺序处理</h2>\\n<p>让我们首先看看如何使用for循环顺序处理元素并测量处理元素所需的时间。</p>\\n<h3>2.1. 使用for循环进行顺序处理</h3>\\n<p>首先，我们将创建一个运行100次的for循环，并在每次迭代中执行一个重量级操作。</p>\\n<p>重量级操作的常见示例包括数据库调用、网络调用或CPU密集型操作。为了模拟重量级操作所需的时间，让我们在每次迭代中调用Thread.sleep()方法：</p>","autoDesc":true}');export{k as comp,d as data};
