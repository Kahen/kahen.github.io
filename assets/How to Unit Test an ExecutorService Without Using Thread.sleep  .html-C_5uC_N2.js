import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-BE7FzggC.js";const t={},p=e(`<h1 id="如何在不使用thread-sleep-的情况下单元测试executorservice-baeldung" tabindex="-1"><a class="header-anchor" href="#如何在不使用thread-sleep-的情况下单元测试executorservice-baeldung"><span>如何在不使用Thread.sleep()的情况下单元测试ExecutorService | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>一个_ExecutorService_对象在后台运行任务。单元测试在另一个线程上运行的任务是具有挑战性的。<strong>父线程必须等待任务结束才能断言其结果</strong>。</p><p>此外，解决这个问题的一个方法是使用_Thread.sleep()_方法。这个方法会阻塞父线程一段时间。然而，如果任务超出了_sleep()_上设置的时间，单元测试会在任务完成之前结束并失败。</p><p>在本教程中，我们将学习如何在不使用_Thread.sleep()_方法的情况下单元测试一个_ExecutorService_实例。</p><h2 id="_2-创建一个-runnable-对象" tabindex="-1"><a class="header-anchor" href="#_2-创建一个-runnable-对象"><span>2. 创建一个_Runnable_对象</span></a></h2><p>在进行测试之前，让我们创建一个实现_Runnable_接口的类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyRunnable</span> <span class="token keyword">implements</span> <span class="token class-name">Runnable</span> <span class="token punctuation">{</span>
    <span class="token class-name">Long</span> result<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Long</span> <span class="token function">getResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setResult</span><span class="token punctuation">(</span><span class="token class-name">Long</span> result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        result <span class="token operator">=</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">Long</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Long</span> result <span class="token operator">=</span> <span class="token number">0L</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            result <span class="token operator">+=</span> i<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_MyRunnable_类执行一个需要很长时间的计算。计算出的总和然后设置到_result_成员字段。所以，这将是我们提交给执行器的任务。</p><h2 id="_3-问题" tabindex="-1"><a class="header-anchor" href="#_3-问题"><span>3. 问题</span></a></h2><p>通常，<strong>一个_ExecutorService_对象在后台线程中运行任务</strong>。任务实现了_Callable_或_Runnable_接口。</p><p><strong>如果父线程不等待，它会在任务完成之前终止</strong>。所以，测试总是失败。</p><p>让我们创建一个单元测试来验证问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ExecutorService</span> executorService <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newSingleThreadExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">MyRunnable</span> r <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyRunnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
executorService<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertNull</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">getResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试中，我们首先创建了一个单线程的ExecutorService实例。然后，我们创建并提交了一个任务。最后，我们断言_result_字段的值。</p><p>在运行时，断言在任务结束之前运行。所以，_getResult()<em>返回_null</em>。</p><h2 id="_4-使用-future-类" tabindex="-1"><a class="header-anchor" href="#_4-使用-future-类"><span>4. 使用_Future_类</span></a></h2><p><strong>_Future_类表示后台任务的结果</strong>。此外，<strong>它可以阻塞父线程直到任务完成</strong>。</p><p>让我们修改我们的测试以使用由_submit()_方法返回的_Future_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span>\` future <span class="token operator">=</span> executorService<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">;</span>
future<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2305843005992468481L</span><span class="token punctuation">,</span> r<span class="token punctuation">.</span><span class="token function">getResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，<strong>_Future_实例的_get()_方法会阻塞，直到任务结束</strong>。</p><p>此外，当任务是_Callable_的实例时，_get()_可能会返回一个值。<strong>如果任务是_Runnable_的实例，_get()<em>总是返回_null</em></strong>。</p><p>现在运行测试比之前要长。这是一个迹象，表明父线程正在等待任务完成。最后，测试成功了。</p><h2 id="_5-关闭和等待" tabindex="-1"><a class="header-anchor" href="#_5-关闭和等待"><span>5. 关闭和等待</span></a></h2><p><strong>另一个选择是使用_ExecutorService_类的_shutdown()_和_awaitTermination()_方法</strong>。</p><p><strong>_shutdown()_方法关闭执行器</strong>。执行器不接受任何新任务。现有的任务不会被杀死。但它不等待它们结束。</p><p>另一方面，我们可以使用**_awaitTermination()_方法阻塞，直到所有提交的任务结束**。此外，我们应该在方法上设置一个阻塞超时。超时过去意味着阻塞结束。</p><p>让我们修改之前的测试以使用这两种方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>executorService<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
executorService<span class="token punctuation">.</span><span class="token function">awaitTermination</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2305843005992468481L</span><span class="token punctuation">,</span> r<span class="token punctuation">.</span><span class="token function">getResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，我们在提交任务后关闭了执行器。接下来，我们调用_awaitTermination()_来阻塞线程，直到任务完成。</p><p>我们还设置了一个最大超时时间_10000_秒。因此，如果任务运行时间超过_10000_秒，方法将解除阻塞，即使任务还没有结束。换句话说，如果我们设置了一个很小的超时值，_awaitTermination()_会像_Thread.sleep()_一样过早地解除阻塞。</p><p>实际上，当我们运行它时，测试是成功的。</p><h2 id="_6-使用-threadpoolexecutor" tabindex="-1"><a class="header-anchor" href="#_6-使用-threadpoolexecutor"><span>6. 使用_ThreadPoolExecutor_</span></a></h2><p>另一个选择是<strong>创建一个_ExecutorService_对象，它接受一个定义好数量的工作并阻塞直到它们完成</strong>。</p><p>一个简单的方法是扩展_ThreadPoolExecutor_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyThreadPoolExecutor</span> <span class="token keyword">extends</span> <span class="token class-name">ThreadPoolExecutor</span> <span class="token punctuation">{</span>
    <span class="token class-name">CountDownLatch</span> doneSignal <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">MyThreadPoolExecutor</span><span class="token punctuation">(</span><span class="token keyword">int</span> corePoolSize<span class="token punctuation">,</span> <span class="token keyword">int</span> maximumPoolSize<span class="token punctuation">,</span> <span class="token keyword">long</span> keepAliveTime<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">,</span> <span class="token class-name">BlockingQueue</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">&gt;</span></span>\`\` workQueue<span class="token punctuation">,</span>
        <span class="token keyword">int</span> jobsNumberToWaitFor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>corePoolSize<span class="token punctuation">,</span> maximumPoolSize<span class="token punctuation">,</span> keepAliveTime<span class="token punctuation">,</span> unit<span class="token punctuation">,</span> workQueue<span class="token punctuation">)</span><span class="token punctuation">;</span>
        doneSignal <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CountDownLatch</span><span class="token punctuation">(</span>jobsNumberToWaitFor<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">afterExecute</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> r<span class="token punctuation">,</span> <span class="token class-name">Throwable</span> t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">afterExecute</span><span class="token punctuation">(</span>r<span class="token punctuation">,</span> t<span class="token punctuation">)</span><span class="token punctuation">;</span>
        doneSignal<span class="token punctuation">.</span><span class="token function">countDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">waitDone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        doneSignal<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们创建了扩展_ThreadPoolExecutor_的_MyThreadPoolExecutor_类。在其构造函数中，我们添加了_jobsNumberToWaitFor_参数，我们计划提交的工作数量。</p><p>此外，该类使用_doneSignal_字段，一个_CountDownLatch_类的实例。_doneSignal_字段在构造函数中初始化为要等待的工作数量。接下来，我们重写了_afterExecute()_方法，将_doneSignal_减一。_afterExecute()_方法在工作结束时被调用。</p><p>最后，我们有_waitDone()_方法，它使用_doneSignal_来阻塞，直到所有工作结束。</p><p>此外，我们可以用单元测试来测试上述实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingThreadPoolExecutor_thenTestSucceeds</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token class-name">MyThreadPoolExecutor</span> threadPoolExecutor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyThreadPoolExecutor</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">10L</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">LinkedBlockingQueue</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">&gt;</span></span>\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MyRunnable</span><span class="token punctuation">&gt;</span></span>\`\` runnables <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MyRunnable</span><span class="token punctuation">&gt;</span></span>\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">20</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">MyRunnable</span> r <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyRunnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        runnables<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">;</span>
        threadPoolExecutor<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    threadPoolExecutor<span class="token punctuation">.</span><span class="token function">waitDone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">20</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2305843005992468481L</span><span class="token punctuation">,</span> runnables<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个单元测试中，我们向执行器提交了_20_个工作。紧接着，我们调用了_waitDone()_方法，该方法会阻塞，直到_20_个工作完成。最后，我们断言每个工作的结果。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p><strong>在本文中，我们学习了如何在不使用_Thread.sleep()_方法的情况下单元测试一个_ExecutorService_实例</strong>。也就是说，我们看了三种方法：</p><ul><li>获取一个_Future_对象并调用_get()_方法</li><li>关闭执行器并等待运行中的任务完成</li><li>创建自定义的_ExecutorService_</li></ul><p>如常，我们示例的完整源代码可以在GitHub上找到。</p><p>评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,47),o=[p];function c(l,u){return a(),s("div",null,o)}const k=n(t,[["render",c],["__file","How to Unit Test an ExecutorService Without Using Thread.sleep  .html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/How%20to%20Unit%20Test%20an%20ExecutorService%20Without%20Using%20Thread.sleep%20%20.html","title":"如何在不使用Thread.sleep()的情况下单元测试ExecutorService | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-17T00:00:00.000Z","category":["Java","Concurrency"],"tag":["ExecutorService","Unit Testing"],"description":"如何在不使用Thread.sleep()的情况下单元测试ExecutorService | Baeldung 1. 概述 一个_ExecutorService_对象在后台运行任务。单元测试在另一个线程上运行的任务是具有挑战性的。父线程必须等待任务结束才能断言其结果。 此外，解决这个问题的一个方法是使用_Thread.sleep()_方法。这个方法会阻塞...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/How%20to%20Unit%20Test%20an%20ExecutorService%20Without%20Using%20Thread.sleep%20%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在不使用Thread.sleep()的情况下单元测试ExecutorService | Baeldung"}],["meta",{"property":"og:description","content":"如何在不使用Thread.sleep()的情况下单元测试ExecutorService | Baeldung 1. 概述 一个_ExecutorService_对象在后台运行任务。单元测试在另一个线程上运行的任务是具有挑战性的。父线程必须等待任务结束才能断言其结果。 此外，解决这个问题的一个方法是使用_Thread.sleep()_方法。这个方法会阻塞..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"ExecutorService"}],["meta",{"property":"article:tag","content":"Unit Testing"}],["meta",{"property":"article:published_time","content":"2024-06-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在不使用Thread.sleep()的情况下单元测试ExecutorService | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-17T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 创建一个_Runnable_对象","slug":"_2-创建一个-runnable-对象","link":"#_2-创建一个-runnable-对象","children":[]},{"level":2,"title":"3. 问题","slug":"_3-问题","link":"#_3-问题","children":[]},{"level":2,"title":"4. 使用_Future_类","slug":"_4-使用-future-类","link":"#_4-使用-future-类","children":[]},{"level":2,"title":"5. 关闭和等待","slug":"_5-关闭和等待","link":"#_5-关闭和等待","children":[]},{"level":2,"title":"6. 使用_ThreadPoolExecutor_","slug":"_6-使用-threadpoolexecutor","link":"#_6-使用-threadpoolexecutor","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.65,"words":1396},"filePathRelative":"posts/baeldung/Archive/How to Unit Test an ExecutorService Without Using Thread.sleep  .md","localizedDate":"2024年6月17日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>一个_ExecutorService_对象在后台运行任务。单元测试在另一个线程上运行的任务是具有挑战性的。<strong>父线程必须等待任务结束才能断言其结果</strong>。</p>\\n<p>此外，解决这个问题的一个方法是使用_Thread.sleep()_方法。这个方法会阻塞父线程一段时间。然而，如果任务超出了_sleep()_上设置的时间，单元测试会在任务完成之前结束并失败。</p>\\n<p>在本教程中，我们将学习如何在不使用_Thread.sleep()_方法的情况下单元测试一个_ExecutorService_实例。</p>\\n<h2>2. 创建一个_Runnable_对象</h2>","autoDesc":true}');export{k as comp,d as data};
