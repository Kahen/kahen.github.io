import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-DzJ3ruqA.js";const t={},p=e(`<h1 id="java中单线程与单线程执行器服务的比较" tabindex="-1"><a class="header-anchor" href="#java中单线程与单线程执行器服务的比较"><span>Java中单线程与单线程执行器服务的比较</span></a></h1><p>线程和执行器框架是Java中用于并行执行代码的两种机制。这提高了应用程序的性能。执行器框架提供了不同类型的线程池。其中一种池只包含一个工作线程。</p><p>在本教程中，<strong>我们将学习线程和具有单个工作线程的执行器服务之间的区别。</strong></p><p>线程是一个轻量级进程，具有独立的执行路径。它用于并行执行任务。因此，可以同时运行多个线程而互不干扰。</p><p>一个_Thread_对象执行_Runnable_任务。</p><p>让我们看看如何创建线程。<strong>我们可以通过</strong>扩展_Thread类_或实现_Runnable_接口来创建线程。**</p><p>让我们通过扩展_Thread_类来创建一个线程：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomThread</span> <span class="token keyword">extends</span> <span class="token class-name">Thread</span> <span class="token punctuation">{</span>
    <span class="token comment">// 重写run()方法以提供自定义实现</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">CustomThread</span> t1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CustomThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        t1<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，_CustomThread_类扩展了_Thread_类。在_main()_方法中，我们创建了_CustomThread_类的实例，然后调用了它的_start()_方法。这开始了线程的执行。</p><p>现在让我们看看通过实现_Runnable_接口来创建线程的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestClass</span> <span class="token keyword">implements</span> <span class="token class-name">Runnable</span> <span class="token punctuation">{</span>
    <span class="token comment">// 实现Runnable接口的run()方法</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">TestClass</span> testClassRef <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TestClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span> t1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>testClassRef<span class="token punctuation">)</span><span class="token punctuation">;</span>
        t1<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，_TestClass_实现了_Runnable_接口。我们将_TestClass_对象的引用传递到_Thread_类的构造函数中。然后，我们调用_start()_方法。这反过来调用由_TestClass_实现的_run()_方法。</p><h3 id="_3-执行器框架" tabindex="-1"><a class="header-anchor" href="#_3-执行器框架"><span>3. 执行器框架</span></a></h3><p>现在我们将学习执行器框架。它在JDK 1.5中引入。**它是一个多线程框架，维护了一个工作线程池并管理它们。**任务提交到队列中，然后由这些工作线程执行。</p><p><strong>它消除了在代码中显式创建线程的开销。相反，它重用了池中的线程来异步执行任务。</strong></p><p>让我们现在看看执行器框架维护的不同种类的线程池。</p><h4 id="_3-1-固定线程池" tabindex="-1"><a class="header-anchor" href="#_3-1-固定线程池"><span>3.1. 固定线程池</span></a></h4><p>**这个池包含一个固定数量的线程。**我们在创建池时指定线程数量。如果发生异常并且一个线程被终止，将创建一个新的线程。</p><p>让我们看看如何创建一个固定线程池：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ExecutorService</span> executorService <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在上面的代码片段中，我们创建了一个有五个工作线程的固定线程池。</p><h4 id="_3-2-缓存线程池" tabindex="-1"><a class="header-anchor" href="#_3-2-缓存线程池"><span>3.2. 缓存线程池</span></a></h4><p>**这个线程池在需要时创建新线程。**如果没有线程可用于执行提交的任务，那么将创建一个新线程。</p><p>这是我们如何创建一个缓存线程池：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ExecutorService</span> executorService <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newCachedThreadPool</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在缓存线程池中，我们不指定池大小。这是因为它在没有可用线程执行提交的任务时创建新线程。当已有创建的线程可用时，它也会重用它们。</p><h4 id="_3-3-定时线程池" tabindex="-1"><a class="header-anchor" href="#_3-3-定时线程池"><span>3.3. 定时线程池</span></a></h4><p><strong>这个线程池在给定的延迟后或定期运行任务。</strong></p><p>这是我们如何创建一个定时线程池：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ScheduledExecutorService</span> executorService <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newScheduledThreadPool</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在上面的代码片段中，整数参数是核心池大小。它表示即使线程处于空闲状态，也要保留在池中的线程数量。</p><h4 id="_3-4-单线程池" tabindex="-1"><a class="header-anchor" href="#_3-4-单线程池"><span>3.4. 单线程池</span></a></h4><p><strong>这个池只包含一个线程。它按顺序执行提交的任务。如果发生异常并且线程被终止，将创建一个新的线程。</strong></p><p>下面的代码片段显示了如何创建一个单线程池：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ExecutorService</span> executorService <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newSingleThreadExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，_Executors_类的静态方法_newSingleThreadExecutor()<em>创建了一个包含单个工作线程的_ExecutorService</em>。</p><h2 id="_4-线程与单线程执行器服务" tabindex="-1"><a class="header-anchor" href="#_4-线程与单线程执行器服务"><span>4. 线程与单线程执行器服务</span></a></h2><p>我们可能会想知道，如果单线程池_ExecutorService_只包含一个线程，那么它与显式创建线程并使用它来执行任务有何不同。</p><p>现在让我们探索线程和只有一个工作线程的执行器服务之间的区别，以及何时使用哪一个。</p><h3 id="_4-1-任务处理" tabindex="-1"><a class="header-anchor" href="#_4-1-任务处理"><span>4.1. 任务处理</span></a></h3><p>**线程只能处理_Runnable_任务，而单线程执行器服务可以执行_Runnable_和_Callable_任务。**因此，我们也可以运行可以返回一些值的任务。</p><p>_ExecutorService_接口中的_submit()_方法接受一个_Callable_任务或_Runnable_任务，并返回一个_Future_对象。这个对象表示异步任务的结果。</p><p>另外，一个线程只能处理一个任务然后退出。但是，单线程执行器服务可以处理一系列任务，并将它们按顺序执行。</p><h3 id="_4-2-线程创建开销" tabindex="-1"><a class="header-anchor" href="#_4-2-线程创建开销"><span>4.2. 线程创建开销</span></a></h3><p>创建线程涉及到开销。例如，JVM需要分配内存。当在代码中反复创建线程时，它会影响性能。但是在单线程执行器服务的情况下，同一个工作线程被重用。因此，<strong>它防止了创建多个线程的开销。</strong></p><h3 id="_4-3-内存消耗" tabindex="-1"><a class="header-anchor" href="#_4-3-内存消耗"><span>4.3. 内存消耗</span></a></h3><p>线程对象占用大量的内存。因此，如果我们为每个异步任务创建线程，可能会导致_OutOfMemoryError_。但是在单线程执行器服务中，同一个工作线程被重用，这导致内存消耗较少。</p><h3 id="_4-4-资源释放" tabindex="-1"><a class="header-anchor" href="#_4-4-资源释放"><span>4.4. 资源释放</span></a></h3><p>一个线程在其执行完成后释放资源。但是在执行器服务的情况下，我们需要关闭服务，否则JVM将无法关闭。<strong>像_shutdown()_和_shutdownNow()_这样的方法可以关闭执行器服务。</strong></p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了线程、执行器框架以及不同类型的线程池。我们还看到了线程和单线程执行器服务之间的区别。</p><p>我们了解到，如果有重复的工作或者有很多异步任务，那么执行器服务是更好的选择。</p><p>像往常一样，示例的源代码可以在GitHub上找到。</p>`,53),c=[p];function o(l,r){return s(),n("div",null,c)}const d=a(t,[["render",o],["__file","2024-07-12-Thread vs. Single Thread Executor Service.html.vue"]]),h=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-Thread%20vs.%20Single%20Thread%20Executor%20Service.html","title":"Java中单线程与单线程执行器服务的比较","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Concurrency"],"tag":["Thread","ExecutorService"],"head":[["meta",{"name":"keywords","content":"Java, Thread, ExecutorService, Single Thread Executor Service"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-Thread%20vs.%20Single%20Thread%20Executor%20Service.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中单线程与单线程执行器服务的比较"}],["meta",{"property":"og:description","content":"Java中单线程与单线程执行器服务的比较 线程和执行器框架是Java中用于并行执行代码的两种机制。这提高了应用程序的性能。执行器框架提供了不同类型的线程池。其中一种池只包含一个工作线程。 在本教程中，我们将学习线程和具有单个工作线程的执行器服务之间的区别。 线程是一个轻量级进程，具有独立的执行路径。它用于并行执行任务。因此，可以同时运行多个线程而互不干..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T14:43:30.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Thread"}],["meta",{"property":"article:tag","content":"ExecutorService"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T14:43:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中单线程与单线程执行器服务的比较\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T14:43:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中单线程与单线程执行器服务的比较 线程和执行器框架是Java中用于并行执行代码的两种机制。这提高了应用程序的性能。执行器框架提供了不同类型的线程池。其中一种池只包含一个工作线程。 在本教程中，我们将学习线程和具有单个工作线程的执行器服务之间的区别。 线程是一个轻量级进程，具有独立的执行路径。它用于并行执行任务。因此，可以同时运行多个线程而互不干..."},"headers":[{"level":3,"title":"3. 执行器框架","slug":"_3-执行器框架","link":"#_3-执行器框架","children":[]},{"level":2,"title":"4. 线程与单线程执行器服务","slug":"_4-线程与单线程执行器服务","link":"#_4-线程与单线程执行器服务","children":[{"level":3,"title":"4.1. 任务处理","slug":"_4-1-任务处理","link":"#_4-1-任务处理","children":[]},{"level":3,"title":"4.2. 线程创建开销","slug":"_4-2-线程创建开销","link":"#_4-2-线程创建开销","children":[]},{"level":3,"title":"4.3. 内存消耗","slug":"_4-3-内存消耗","link":"#_4-3-内存消耗","children":[]},{"level":3,"title":"4.4. 资源释放","slug":"_4-4-资源释放","link":"#_4-4-资源释放","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720795410000,"updatedTime":1720795410000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.12,"words":1536},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-Thread vs. Single Thread Executor Service.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>线程和执行器框架是Java中用于并行执行代码的两种机制。这提高了应用程序的性能。执行器框架提供了不同类型的线程池。其中一种池只包含一个工作线程。</p>\\n<p>在本教程中，<strong>我们将学习线程和具有单个工作线程的执行器服务之间的区别。</strong></p>\\n<p>线程是一个轻量级进程，具有独立的执行路径。它用于并行执行任务。因此，可以同时运行多个线程而互不干扰。</p>\\n<p>一个_Thread_对象执行_Runnable_任务。</p>\\n<p>让我们看看如何创建线程。<strong>我们可以通过</strong>扩展_Thread类_或实现_Runnable_接口来创建线程。**</p>","autoDesc":true}');export{d as comp,h as data};
