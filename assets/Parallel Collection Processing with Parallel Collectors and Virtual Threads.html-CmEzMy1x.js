import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as l}from"./app-DaaLD5Fo.js";const i={},n=l(`<h1 id="java虚拟线程和并行收集器的并行集合处理" tabindex="-1"><a class="header-anchor" href="#java虚拟线程和并行收集器的并行集合处理"><span>Java虚拟线程和并行收集器的并行集合处理</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在之前的文章中，我们介绍了并行收集器，这是一个小型的零依赖库，它使得自定义线程池中的Stream API能够进行并行处理。</p><p>Project Loom是引入轻量级虚拟线程（之前称为Fibers）到JVM的有组织努力的代号，最终在JDK21中完成。</p><p>让我们看看如何利用这个技术在并行收集器中。</p><h2 id="_2-maven依赖" tabindex="-1"><a class="header-anchor" href="#_2-maven依赖"><span>2. Maven依赖</span></a></h2><p>如果我们想开始使用这个库，我们需要在Maven的_pom.xml_文件中添加一个单一条目：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`com.pivovarit\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`parallel-collectors\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`3.0.0\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者在Gradle的构建文件中的单行：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>compile &#39;com.pivovarit:parallel-collectors:3.0.0&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最新版本可以在Maven Central找到。</p><h3 id="_3-1-操作系统线程并行性" tabindex="-1"><a class="header-anchor" href="#_3-1-操作系统线程并行性"><span>3.1. 操作系统线程并行性</span></a></h3><p>让我们看看为什么使用虚拟线程的并行处理是一个大问题。</p><p>我们将从一个简单的示例开始。我们需要一个要并行化的操作，这将是一个人工延迟的_String_连接：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private static String fetchById(int id) {
    try {
        Thread.sleep(1000);
    } catch (InterruptedException e) {
        // 无耻地忽略
    }
    return &quot;user-&quot; + id;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还将使用自定义代码来测量执行时间：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private static \`\`&lt;T&gt;\`\` T timed(Supplier\`\`&lt;T&gt;\`\` supplier) {
    var before = Instant.now();
    T result = supplier.get();
    var after = Instant.now();
    log.info(&quot;Execution time: {} ms&quot;, Duration.between(before, after).toMillis());
    return result;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们创建一个简单的并行_Stream_处理示例，我们将创建_n_个元素，然后在_n_个线程上并行处理它们，每个线程的并行度为_n_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void processInParallelOnOSThreads() {
    int parallelProcesses = 5_000;
    var e = Executors.newFixedThreadPool(parallelProcesses);

    var result = timed(() -&gt; Stream.iterate(0, i -&gt; i + 1).limit(parallelProcesses)
      .collect(ParallelCollectors.parallel(i -&gt; fetchById(i), toList(), e, parallelProcesses))
      .join());

    log.info(&quot;&quot;, result);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们运行它时，我们可以观察到它显然完成了任务，因为我们不需要等待5000秒才能得到结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Execution time: 1321 ms
[user-0, user-1, user-2, ...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>但是让我们看看如果我们尝试将并行处理的元素数量增加到_20_000_会发生什么：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[2.795s][warning][os,thread] Failed to start thread &quot;Unknown thread&quot; - pthread_create failed (...)
[2.795s][warning][os,thread] Failed to start the native thread for java.lang.Thread &quot;pool-1-thread-16111&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>基于操作系统线程的方法不具有可扩展性，因为线程的创建成本很高，我们很快就达到了资源限制。</strong></p><p>让我们看看如果我们切换到虚拟线程会发生什么。</p><h3 id="_3-2-虚拟线程并行性" tabindex="-1"><a class="header-anchor" href="#_3-2-虚拟线程并行性"><span>3.2. 虚拟线程并行性</span></a></h3><p>在Java 21之前，很难为线程池配置提出合理的默认值。幸运的是，虚拟线程不需要任何配置——我们可以创建尽可能多的线程，并且它们在内部使用共享的ForkJoinPool实例进行调度，使它们非常适合运行阻塞操作！</p><p>如果我们运行的是Parallel Collectors 3.x，我们可以轻松地利用虚拟线程：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void processInParallelOnVirtualThreads() {
    int parallelProcesses = 5_000;

    var result = timed(() -&gt; Stream.iterate(0, i -&gt; i + 1).limit(parallelProcesses)
      .collect(ParallelCollectors.parallel(i -&gt; fetchById(i), toList()))
      .join());
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，<strong>这就像省略_executor_和_parallelism_参数一样简单</strong>，因为虚拟线程是默认的执行工具。</p><p>如果我们尝试运行它，我们可以看到它实际上<strong>比原始示例完成得更快</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Execution time: 1101 ms
[user-0, user-1, user-2, ...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这是因为我们创建了5000个虚拟线程，它们使用一组非常有限的操作系统线程进行调度。</p><p>让我们尝试将并行度增加到_20_000_，这在传统的_Executor_中是不可能的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Execution time: 1219 ms
[user-0, user-1, user-2, ...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这不仅成功执行了，而且比操作系统线程上小四倍的工作完成得更快！</p><p>让我们将并行度增加到100_000，看看会发生什么：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Execution time: 1587 ms
[user-0, user-1, user-2, ...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>运行得很好，尽管观察到了显著的开销。</p><p>如果我们将并行级别增加到1_000_000呢？</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Execution time: 6416 ms
[user-0, user-1, user-2, ...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>2_000_000？</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Execution time: 12906 ms
[user-0, user-1, user-2, ...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>5_000_000？</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Execution time: 25952 ms
[user-0, user-1, user-2, ...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，**我们可以轻松地扩展到以前用操作系统线程无法实现的高并行级别。**这，以及在较小的并行工作负载上的性能改进，是利用虚拟线程进行阻塞操作并行处理的主要好处。</p><h3 id="_3-3-虚拟线程和旧版本的并行收集器" tabindex="-1"><a class="header-anchor" href="#_3-3-虚拟线程和旧版本的并行收集器"><span>3.3. 虚拟线程和旧版本的并行收集器</span></a></h3><p>利用虚拟线程的最简单方法是升级到可能的最新版本的库，但如果这不可能，我们也可以在JDK21上运行2.x.y版本时实现这一点。</p><p>诀窍是手动提供_Executors.newVirtualThreadPerTaskExecutor()_作为执行器，并提供_Integer.MAX_VALUE_作为最大并行级别：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void processInParallelOnVirtualThreadsParallelCollectors2() {
    int parallelProcesses = 100_000;

    var result = timed(() -&gt; Stream.iterate(0, i -&gt; i + 1).limit(parallelProcesses)
      .collect(ParallelCollectors.parallel(
        i -&gt; fetchById(i), toList(),
        Executors.newVirtualThreadPerTaskExecutor(), Integer.MAX_VALUE))
      .join());

    log.info(&quot;&quot;, result);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇文章中，我们有机会看到如何轻松地利用虚拟线程与并行收集器库，事实证明，它比传统的基于操作系统线程的解决方案更好地扩展。我们的测试机器在大约~16000个线程时达到了资源限制，而扩展到数百万虚拟线程却很容易。</p><p>如常，代码示例可以在GitHub上找到。</p><p>文章发布后30天内开放评论。对于超过此日期的任何问题，请使用网站上的联系表单。</p><p>OK</p>`,55),r=[n];function s(d,c){return a(),t("div",null,r)}const v=e(i,[["render",s],["__file","Parallel Collection Processing with Parallel Collectors and Virtual Threads.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/Archive/Parallel%20Collection%20Processing%20with%20Parallel%20Collectors%20and%20Virtual%20Threads.html","title":"Java虚拟线程和并行收集器的并行集合处理","lang":"zh-CN","frontmatter":{"date":"2024-06-19T00:00:00.000Z","category":["Java","Concurrency"],"tag":["Virtual Threads","Parallel Collectors"],"head":[["meta",{"name":"keywords","content":"Java, Virtual Threads, Parallel Collectors, Project Loom, JDK21, Stream API, concurrency, performance"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Parallel%20Collection%20Processing%20with%20Parallel%20Collectors%20and%20Virtual%20Threads.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java虚拟线程和并行收集器的并行集合处理"}],["meta",{"property":"og:description","content":"Java虚拟线程和并行收集器的并行集合处理 1. 引言 在之前的文章中，我们介绍了并行收集器，这是一个小型的零依赖库，它使得自定义线程池中的Stream API能够进行并行处理。 Project Loom是引入轻量级虚拟线程（之前称为Fibers）到JVM的有组织努力的代号，最终在JDK21中完成。 让我们看看如何利用这个技术在并行收集器中。 2. M..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Virtual Threads"}],["meta",{"property":"article:tag","content":"Parallel Collectors"}],["meta",{"property":"article:published_time","content":"2024-06-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java虚拟线程和并行收集器的并行集合处理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java虚拟线程和并行收集器的并行集合处理 1. 引言 在之前的文章中，我们介绍了并行收集器，这是一个小型的零依赖库，它使得自定义线程池中的Stream API能够进行并行处理。 Project Loom是引入轻量级虚拟线程（之前称为Fibers）到JVM的有组织努力的代号，最终在JDK21中完成。 让我们看看如何利用这个技术在并行收集器中。 2. M..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. Maven依赖","slug":"_2-maven依赖","link":"#_2-maven依赖","children":[{"level":3,"title":"3.1. 操作系统线程并行性","slug":"_3-1-操作系统线程并行性","link":"#_3-1-操作系统线程并行性","children":[]},{"level":3,"title":"3.2. 虚拟线程并行性","slug":"_3-2-虚拟线程并行性","link":"#_3-2-虚拟线程并行性","children":[]},{"level":3,"title":"3.3. 虚拟线程和旧版本的并行收集器","slug":"_3-3-虚拟线程和旧版本的并行收集器","link":"#_3-3-虚拟线程和旧版本的并行收集器","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.6,"words":1380},"filePathRelative":"posts/baeldung/Archive/Parallel Collection Processing with Parallel Collectors and Virtual Threads.md","localizedDate":"2024年6月19日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在之前的文章中，我们介绍了并行收集器，这是一个小型的零依赖库，它使得自定义线程池中的Stream API能够进行并行处理。</p>\\n<p>Project Loom是引入轻量级虚拟线程（之前称为Fibers）到JVM的有组织努力的代号，最终在JDK21中完成。</p>\\n<p>让我们看看如何利用这个技术在并行收集器中。</p>\\n<h2>2. Maven依赖</h2>\\n<p>如果我们想开始使用这个库，我们需要在Maven的_pom.xml_文件中添加一个单一条目：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>`&lt;dependency&gt;`\\n    `&lt;groupId&gt;`com.pivovarit`&lt;/groupId&gt;`\\n    `&lt;artifactId&gt;`parallel-collectors`&lt;/artifactId&gt;`\\n    `&lt;version&gt;`3.0.0`&lt;/version&gt;`\\n`&lt;/dependency&gt;`\\n</code></pre></div>","autoDesc":true}');export{v as comp,p as data};
