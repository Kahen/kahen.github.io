import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CBerKIce.js";const e={},p=t(`<h1 id="kotlin中wait-、sleep-和delay-的比较" tabindex="-1"><a class="header-anchor" href="#kotlin中wait-、sleep-和delay-的比较"><span>Kotlin中wait()、sleep()和delay()的比较</span></a></h1><p>多线程和并发是现代软件开发中的关键概念，它们使程序能够同时高效地处理多个任务。在Kotlin中，开发者有多种工具来控制线程或协程的定时和执行。</p><p>在本教程中，我们将探索并比较三种常用的引入延迟的方法：wait()、sleep()和delay()。</p><p>在深入了解特定的延迟方法之前，理解线程和协程的基本概念至关重要。</p><p>线程是进程内最小的执行单元。在Java和Kotlin中，Thread类提供了一种创建和管理线程的方式。然而，直接使用线程可能会出错且复杂。</p><p>另一方面，协程是Kotlin引入的轻量级替代方案，以简化异步编程。它们提供了一种以顺序和更易读的方式编写异步代码的方法。</p><p>现在，让我们深入了解每种方法的细节。</p><p>wait()方法是Java和Kotlin中Object类的一部分，用于线程同步。值得注意的是，wait()不是Kotlin语言的直接成员，而是可以通过Java互操作性访问。</p><p>在Kotlin中，重要的是要注意wait()和notify()方法并不直接在Any类型的实例上可访问。因此，要使用wait()和notify()，我们需要使我们的锁是Object类型：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> lock <span class="token operator">=</span> <span class="token function">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">fun</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">runBlocking</span><span class="token punctuation">(</span>Dispatchers<span class="token punctuation">.</span>Default<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">launch</span><span class="token punctuation">(</span>Dispatchers<span class="token punctuation">.</span>IO<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">testWaitThread1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token function">launch</span><span class="token punctuation">(</span>Dispatchers<span class="token punctuation">.</span>IO<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">testWaitThread2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">fun</span> <span class="token function">testWaitThread1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token function">synchronized</span><span class="token punctuation">(</span>lock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    lock<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;首先打印&quot;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">fun</span> <span class="token function">testWaitThread2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token function">synchronized</span><span class="token punctuation">(</span>lock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;其次打印&quot;</span></span><span class="token punctuation">)</span>
    lock<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们的第一个协程testWaitThread1()在打印“首先打印”之前等待一个信号。我们的第二个协程testWaitThread2()打印“其次打印”，并通过在我们的共享对象lock上调用notify()来向等待的线程发出信号，继续执行。</p><p>使用synchronized()、wait()和notify()确保了两个线程之间的正确协调和同步。当代码运行时，我们会发现它首先打印“其次打印”，然后是“首先打印”，这是由于这种锁定。</p><p>sleep()方法是Thread类的静态方法，它使线程暂停指定的时间量。与wait()不同，它不涉及同步或线程间通信：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">sleepMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;线程1正在休眠...&quot;</span></span><span class="token punctuation">)</span>
    Thread<span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span> <span class="token comment">// 休眠2秒</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;线程1醒了!&quot;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，主线程在继续执行之前休眠两秒钟。虽然sleep()很简单，但重要的是要注意它<strong>暂停了整个线程</strong>。</p><p>delay()方法是Kotlin协程框架的一部分，它在协程执行中引入延迟。<strong>协程是与传统线程相比更现代、更灵活的并发方法</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">delayMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> runBlocking <span class="token punctuation">{</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;协程1正在延迟...&quot;</span></span><span class="token punctuation">)</span>
    <span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span> <span class="token comment">// 延迟2秒</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;协程1恢复了!&quot;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，runBlocking()协程构建器创建了一个协程，delay()引入了两秒的非阻塞延迟。与线程不同，协程不会阻塞底层线程，使它们更适合异步和响应式应用程序。</p><p>现在我们已经探索了wait()、sleep()和delay()，让我们讨论何时使用每种方法。</p><h3 id="_6-1-wait" tabindex="-1"><a class="header-anchor" href="#_6-1-wait"><span>6.1. wait()</span></a></h3><p>当我们处理线程同步和线程间通信时，建议使用wait()方法。这种方法让一个线程等待另一个线程的条件或通知，然后继续。</p><h3 id="_6-2-sleep" tabindex="-1"><a class="header-anchor" href="#_6-2-sleep"><span>6.2 sleep()</span></a></h3><p>sleep()方法在不需要任何同步或线程间通信的情况下引入线程执行的延迟。它适用于线程内简单的与时间相关的任务。</p><h3 id="_6-3-delay" tabindex="-1"><a class="header-anchor" href="#_6-3-delay"><span>6.3 delay()</span></a></h3><p>我们通常在处理协程时使用delay()方法进行非阻塞延迟。这种方法是在现代Kotlin应用程序中进行异步编程的首选，确保了响应性而不阻塞线程。</p><p>理解wait()、sleep()和delay()之间的区别对于在Kotlin中进行有效的多线程和基于协程的编程至关重要。这些方法之间的选择取决于我们应用程序的具体要求，协程和delay()是更现代、更灵活的异步编程选项。</p><p>随着Kotlin的不断发展，协程可能会变得更加集成到语言的并发模型中。</p><p>这些示例的完整实现可以在GitHub上找到。</p>`,28),i=[p];function l(o,c){return s(),a("div",null,i)}const d=n(e,[["render",l],["__file","2024-07-22-Comparing wait    sleep    and delay   in Kotlin.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-22/2024-07-22-Comparing%20wait%20%20%20%20sleep%20%20%20%20and%20delay%20%20%20in%20Kotlin.html","title":"Kotlin中wait()、sleep()和delay()的比较","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Multithreading"],"tag":["wait()","sleep()","delay()","Coroutines"],"head":[["meta",{"name":"keywords","content":"Kotlin, wait(), sleep(), delay(), Coroutines, Multithreading"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-22/2024-07-22-Comparing%20wait%20%20%20%20sleep%20%20%20%20and%20delay%20%20%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中wait()、sleep()和delay()的比较"}],["meta",{"property":"og:description","content":"Kotlin中wait()、sleep()和delay()的比较 多线程和并发是现代软件开发中的关键概念，它们使程序能够同时高效地处理多个任务。在Kotlin中，开发者有多种工具来控制线程或协程的定时和执行。 在本教程中，我们将探索并比较三种常用的引入延迟的方法：wait()、sleep()和delay()。 在深入了解特定的延迟方法之前，理解线程和协..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T04:13:27.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"wait()"}],["meta",{"property":"article:tag","content":"sleep()"}],["meta",{"property":"article:tag","content":"delay()"}],["meta",{"property":"article:tag","content":"Coroutines"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-22T04:13:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中wait()、sleep()和delay()的比较\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-22T04:13:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中wait()、sleep()和delay()的比较 多线程和并发是现代软件开发中的关键概念，它们使程序能够同时高效地处理多个任务。在Kotlin中，开发者有多种工具来控制线程或协程的定时和执行。 在本教程中，我们将探索并比较三种常用的引入延迟的方法：wait()、sleep()和delay()。 在深入了解特定的延迟方法之前，理解线程和协..."},"headers":[{"level":3,"title":"6.1. wait()","slug":"_6-1-wait","link":"#_6-1-wait","children":[]},{"level":3,"title":"6.2 sleep()","slug":"_6-2-sleep","link":"#_6-2-sleep","children":[]},{"level":3,"title":"6.3 delay()","slug":"_6-3-delay","link":"#_6-3-delay","children":[]}],"git":{"createdTime":1721621607000,"updatedTime":1721621607000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.63,"words":1088},"filePathRelative":"posts/baeldung/2024-07-22/2024-07-22-Comparing wait    sleep    and delay   in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>多线程和并发是现代软件开发中的关键概念，它们使程序能够同时高效地处理多个任务。在Kotlin中，开发者有多种工具来控制线程或协程的定时和执行。</p>\\n<p>在本教程中，我们将探索并比较三种常用的引入延迟的方法：wait()、sleep()和delay()。</p>\\n<p>在深入了解特定的延迟方法之前，理解线程和协程的基本概念至关重要。</p>\\n<p>线程是进程内最小的执行单元。在Java和Kotlin中，Thread类提供了一种创建和管理线程的方式。然而，直接使用线程可能会出错且复杂。</p>\\n<p>另一方面，协程是Kotlin引入的轻量级替代方案，以简化异步编程。它们提供了一种以顺序和更易读的方式编写异步代码的方法。</p>","autoDesc":true}');export{d as comp,k as data};
