import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DzJ3ruqA.js";const e={},p=t(`<h1 id="countdownlatch与semaphore的对比" tabindex="-1"><a class="header-anchor" href="#countdownlatch与semaphore的对比"><span>CountDownLatch与Semaphore的对比</span></a></h1><p>在Java多线程编程中，线程间的有效协调对于确保适当的同步和防止数据损坏至关重要。两种常用的线程协调机制是_CountDownLatch_和_Semaphore_。在本教程中，我们将探讨_CountDownLatch_和_Semaphore_之间的区别，并讨论何时使用它们。</p><h3 id="_2-1-countdownlatch" tabindex="-1"><a class="header-anchor" href="#_2-1-countdownlatch"><span>2.1. <em>CountDownLatch</em></span></a></h3><p>**_CountDownLatch_允许一个或多个线程在指定的任务集完成之前优雅地暂停。**它通过将计数器递减，直到它达到零，这表明所有先决任务都已完成。</p><h3 id="_2-2-semaphore" tabindex="-1"><a class="header-anchor" href="#_2-2-semaphore"><span>2.2. <em>Semaphore</em></span></a></h3><p>**_Semaphore_是一个同步工具，通过使用许可证来控制对共享资源的访问。**与_CountDownLatch_不同，_Semaphore_的许可证可以在应用程序中多次释放和获取，允许更细粒度地控制并发管理。</p><h3 id="_3-1-计数机制" tabindex="-1"><a class="header-anchor" href="#_3-1-计数机制"><span>3.1. 计数机制</span></a></h3><p>_CountDownLatch_通过从一个初始计数开始操作，随着任务的完成而递减计数。<strong>当计数达到零时，等待的线程被释放。</strong> _Semaphore_维护一组许可证，每个许可证代表访问共享资源的权限。<strong>线程获取许可证以访问资源，并在完成时释放它们。</strong></p><h3 id="_3-2-可重置性" tabindex="-1"><a class="header-anchor" href="#_3-2-可重置性"><span>3.2. 可重置性</span></a></h3><p>**_Semaphore_许可证可以多次释放和获取，允许动态资源管理。**例如，如果我们的应用程序突然需要更多的数据库连接，我们可以释放额外的许可证来动态增加可用连接的数量。</p><p>而在_CountDownLatch_中，一旦计数达到零，它就不能被重置或用于另一个同步事件。它被设计为一次性使用案例。</p><h3 id="_3-3-动态许可证计数" tabindex="-1"><a class="header-anchor" href="#_3-3-动态许可证计数"><span>3.3. 动态许可证计数</span></a></h3><p>_Semaphore_许可证可以在运行时使用_acquire()_和_release()_方法动态调整。<strong>这允许对允许同时访问共享资源的线程数量进行动态更改。</strong> 另一方面，一旦_CountDownLatch_初始化了一个计数，它在运行时就保持不变，不能更改。</p><h3 id="_3-4-公平性" tabindex="-1"><a class="header-anchor" href="#_3-4-公平性"><span>3.4. 公平性</span></a></h3><p>_Semaphore_支持公平性概念，确保等待获取许可证的线程按照它们到达的顺序服务（先进先出）。这有助于防止在高竞争场景中发生线程饥饿。</p><p>**与此相反，_CountDownLatch_没有公平性概念。**它通常用于一次性同步事件，其中线程执行的特定顺序不太关键。</p><h3 id="_3-5-使用案例" tabindex="-1"><a class="header-anchor" href="#_3-5-使用案例"><span>3.5. 使用案例</span></a></h3><p>_CountDownLatch_通常用于协调多个线程的启动、等待并行操作完成或在继续主任务之前同步系统的初始化等场景。例如，在并发数据处理应用程序中，_CountDownLatch_可以确保在开始数据分析之前完成所有数据加载任务。</p><p>另一方面，_Semaphore_适用于管理对共享资源的访问、实现资源池、控制对代码关键部分的访问或限制并发数据库连接的数量。例如，在数据库连接池系统中，_Semaphore_可以限制并发数据库连接的数量，以防止数据库服务器过载。</p><h3 id="_3-6-性能" tabindex="-1"><a class="header-anchor" href="#_3-6-性能"><span>3.6. 性能</span></a></h3><p>由于_CountDownLatch_主要涉及递减计数器，因此在处理和资源利用方面引入的开销很小。**此外，_Semaphore_在管理许可证时引入开销，特别是当频繁获取和释放许可证时。**每次调用_acquire()_和_release()_都会涉及额外的处理来管理许可证计数，这可能会影响性能，尤其是在高并发场景中。</p><h3 id="_3-7-总结" tabindex="-1"><a class="header-anchor" href="#_3-7-总结"><span>3.7. 总结</span></a></h3><p>下表总结了_CountDownLatch_和_Semaphore_在各个方面的关键差异：</p><table><thead><tr><th>特性</th><th><em>CountDownLatch</em></th><th><em>Semaphore</em></th></tr></thead><tbody><tr><td>目的</td><td>同步线程直到一组任务完成</td><td>控制对共享资源的访问</td></tr><tr><td>计数机制</td><td>递减计数器</td><td>管理许可证（令牌）</td></tr><tr><td>可重置性</td><td>不可重置（一次性同步）</td><td>可重置（许可证可以多次释放和获取）</td></tr><tr><td>动态许可证计数</td><td>否</td><td>是（可以在运行时调整许可证）</td></tr><tr><td>公平性</td><td>没有特定的公平性保证</td><td>提供公平性（先进先出顺序）</td></tr><tr><td>性能</td><td>低开销（最小处理）</td><td>由于许可证管理而略高开销</td></tr></tbody></table><h2 id="_4-实现中的比较" tabindex="-1"><a class="header-anchor" href="#_4-实现中的比较"><span>4. 实现中的比较</span></a></h2><p>在这一部分，我们将突出_CountDownLatch_和_Semaphore_在语法和功能上的差异。</p><h3 id="_4-1-countdownlatch-实现" tabindex="-1"><a class="header-anchor" href="#_4-1-countdownlatch-实现"><span>4.1. _CountDownLatch_实现</span></a></h3><p>首先，我们创建一个_CountDownLatch_，其初始计数于要完成的任务数。每个工作线程模拟一个任务，并在任务完成后使用_countDown()_方法递减锁存计数。主线程使用_await()_方法等待所有任务完成：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> numberOfTasks <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token class-name">CountDownLatch</span> latch <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CountDownLatch</span><span class="token punctuation">(</span>numberOfTasks<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;=</span> numberOfTasks<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span>\` <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Task completed by Thread &quot;</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        latch<span class="token punctuation">.</span><span class="token function">countDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

latch<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;All tasks completed. Main thread proceeds.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所有任务完成后，锁存计数达到零，尝试调用_countDown()_将没有任何效果。此外，由于锁存计数已经是零，任何后续对_await()_的调用都会立即返回而不阻塞线程：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>latch<span class="token punctuation">.</span><span class="token function">countDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
latch<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 这行不会阻塞</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Latch is already at zero and cannot be reset.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们现在观察程序的执行并检查输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Task completed by Thread 11
Task completed by Thread 12
Task completed by Thread 13
All tasks completed. Main thread proceeds.
Latch is already at zero and cannot be reset.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-semaphore-实现" tabindex="-1"><a class="header-anchor" href="#_4-2-semaphore-实现"><span>4.2. _Semaphore_实现</span></a></h3><p>在这个例子中，我们创建了一个具有固定许可证数量_NUM_PERMITS_的_Semaphore_。每个工作线程通过使用_acquire()_方法获取许可证来模拟资源访问。需要注意的一点是，当线程调用_acquire()<em>方法以获取许可证时，它可能在等待许可证时被中断。因此，在_try</em>–_catch_块中捕获_InterruptedException_以优雅地处理此中断至关重要。</p><p>完成资源访问后，线程使用_release()_方法释放许可证：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> <span class="token constant">NUM_PERMITS</span> <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token class-name">Semaphore</span> semaphore <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Semaphore</span><span class="token punctuation">(</span><span class="token constant">NUM_PERMITS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span>\` <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            semaphore<span class="token punctuation">.</span><span class="token function">acquire</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Thread &quot;</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; accessing resource.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 模拟资源使用</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            semaphore<span class="token punctuation">.</span><span class="token function">release</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们通过释放额外的许可证来模拟重置_Semaphore_，将计数恢复到初始许可证值。这证明了_Semaphore_许可证可以在运行时动态调整或重置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    semaphore<span class="token punctuation">.</span><span class="token function">release</span><span class="token punctuation">(</span><span class="token constant">NUM_PERMITS</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 将Semaphore许可证重置为初始计数</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Semaphore permits reset to initial count.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下是运行程序后的输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Thread 11 accessing resource.
Thread 12 accessing resource.
Thread 13 accessing resource.
Thread 14 accessing resource.
Thread 15 accessing resource.
Semaphore permits reset to initial count.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了_CountDownLatch_和_Semaphore_的关键特性。_CountDownLatch_非常适合在允许线程继续之前需要完成一组固定任务的场景，使其适用于一次性同步事件。相比之下，_Semaphore_用于通过限制可以同时访问它们的线程数量来控制对共享资源的访问，为并发管理提供了更细粒度的控制。</p><p>如常，示例的源代码可在GitHub上找到。</p>`,44),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-22-CountDownLatch vs. Semaphore.html.vue"]]),h=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-CountDownLatch%20vs.%20Semaphore.html","title":"CountDownLatch与Semaphore的对比","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["Java","Concurrency"],"tag":["CountDownLatch","Semaphore"],"head":[["meta",{"name":"keywords","content":"Java, Multithreading, Synchronization, CountDownLatch, Semaphore"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-CountDownLatch%20vs.%20Semaphore.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"CountDownLatch与Semaphore的对比"}],["meta",{"property":"og:description","content":"CountDownLatch与Semaphore的对比 在Java多线程编程中，线程间的有效协调对于确保适当的同步和防止数据损坏至关重要。两种常用的线程协调机制是_CountDownLatch_和_Semaphore_。在本教程中，我们将探讨_CountDownLatch_和_Semaphore_之间的区别，并讨论何时使用它们。 2.1. CountD..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T23:49:46.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"CountDownLatch"}],["meta",{"property":"article:tag","content":"Semaphore"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T23:49:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"CountDownLatch与Semaphore的对比\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T23:49:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"CountDownLatch与Semaphore的对比 在Java多线程编程中，线程间的有效协调对于确保适当的同步和防止数据损坏至关重要。两种常用的线程协调机制是_CountDownLatch_和_Semaphore_。在本教程中，我们将探讨_CountDownLatch_和_Semaphore_之间的区别，并讨论何时使用它们。 2.1. CountD..."},"headers":[{"level":3,"title":"2.1. CountDownLatch","slug":"_2-1-countdownlatch","link":"#_2-1-countdownlatch","children":[]},{"level":3,"title":"2.2. Semaphore","slug":"_2-2-semaphore","link":"#_2-2-semaphore","children":[]},{"level":3,"title":"3.1. 计数机制","slug":"_3-1-计数机制","link":"#_3-1-计数机制","children":[]},{"level":3,"title":"3.2. 可重置性","slug":"_3-2-可重置性","link":"#_3-2-可重置性","children":[]},{"level":3,"title":"3.3. 动态许可证计数","slug":"_3-3-动态许可证计数","link":"#_3-3-动态许可证计数","children":[]},{"level":3,"title":"3.4. 公平性","slug":"_3-4-公平性","link":"#_3-4-公平性","children":[]},{"level":3,"title":"3.5. 使用案例","slug":"_3-5-使用案例","link":"#_3-5-使用案例","children":[]},{"level":3,"title":"3.6. 性能","slug":"_3-6-性能","link":"#_3-6-性能","children":[]},{"level":3,"title":"3.7. 总结","slug":"_3-7-总结","link":"#_3-7-总结","children":[]},{"level":2,"title":"4. 实现中的比较","slug":"_4-实现中的比较","link":"#_4-实现中的比较","children":[{"level":3,"title":"4.1. _CountDownLatch_实现","slug":"_4-1-countdownlatch-实现","link":"#_4-1-countdownlatch-实现","children":[]},{"level":3,"title":"4.2. _Semaphore_实现","slug":"_4-2-semaphore-实现","link":"#_4-2-semaphore-实现","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719100186000,"updatedTime":1719100186000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.78,"words":1735},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-CountDownLatch vs. Semaphore.md","localizedDate":"2024年6月23日","excerpt":"\\n<p>在Java多线程编程中，线程间的有效协调对于确保适当的同步和防止数据损坏至关重要。两种常用的线程协调机制是_CountDownLatch_和_Semaphore_。在本教程中，我们将探讨_CountDownLatch_和_Semaphore_之间的区别，并讨论何时使用它们。</p>\\n<h3>2.1. <em>CountDownLatch</em></h3>\\n<p>**_CountDownLatch_允许一个或多个线程在指定的任务集完成之前优雅地暂停。**它通过将计数器递减，直到它达到零，这表明所有先决任务都已完成。</p>\\n<h3>2.2. <em>Semaphore</em></h3>","autoDesc":true}');export{d as comp,h as data};
