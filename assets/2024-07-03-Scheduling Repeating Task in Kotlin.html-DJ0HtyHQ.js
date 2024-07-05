import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-B_xdonR7.js";const t={},l=e(`<h1 id="kotlin中调度重复任务" tabindex="-1"><a class="header-anchor" href="#kotlin中调度重复任务"><span>Kotlin中调度重复任务</span></a></h1><p>调度重复任务是编程中的常见需求。我们可能在数据更新、传感器监控和发送通知等应用程序中看到过它。</p><p>在本教程中，我们将讨论在Kotlin中执行任务的重复和在特定间隔中执行的方法。</p><h2 id="_2-使用-timer-schedule" tabindex="-1"><a class="header-anchor" href="#_2-使用-timer-schedule"><span>2. 使用 <em>Timer.schedule()</em></span></a></h2><p><em>Timer</em> 是 Java 中的一个类，在 <em>java.util</em> 包中，我们可以使用它来安排任务在一定时间后重复或仅执行一次：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> timer <span class="token operator">=</span> <span class="token function">Timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>每个 <em>Timer</em> 对象在后台线程中顺序执行其任务。任务应该尽快完成，以避免延迟后续任务。如果一个任务耗时太长，可能会导致延迟，并在任务完成后迅速连续执行任务。</p><p>要创建一个计划，我们只需调用 <em>schedule()</em> 方法：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>timer<span class="token punctuation">.</span><span class="token function">schedule</span><span class="token punctuation">(</span><span class="token keyword">object</span> <span class="token operator">:</span> <span class="token function">TimerTask</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Timer ticked!&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，Kotlin 简化为 <em>kotlin.concurrent.Timer.kt</em>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>timer<span class="token punctuation">.</span><span class="token function">schedule</span><span class="token punctuation">(</span><span class="token number">0L</span><span class="token punctuation">,</span> <span class="token number">1000L</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Timer ticked!&quot;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>任务将继续运行，直到我们通过调用 <em>cancel()</em> 来停止它：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>timer<span class="token punctuation">.</span><span class="token function">cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-使用-scheduledexecutorservice" tabindex="-1"><a class="header-anchor" href="#_3-使用-scheduledexecutorservice"><span>3. 使用 <em>ScheduledExecutorService</em></span></a></h2><p><em>ScheduledExecutorService</em> 是 <em>java.util.concurrent</em> API 的一部分，它允许我们<strong>在特定时间安排和执行任务，或在特定间隔重复执行</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> scheduler <span class="token operator">=</span> Executors<span class="token punctuation">.</span><span class="token function">newScheduledThreadPool</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>它使用内部线程池来执行计划任务。这使得它比使用 <em>Timer</em> 和 <em>TimerTask</em> 更高效，后者只使用一个线程。</p><p>让我们看看它在实际中的应用：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>scheduler<span class="token punctuation">.</span><span class="token function">scheduleAtFixedRate</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Complex task completed!&quot;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> TimeUnit<span class="token punctuation">.</span>SECONDS<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个任务将一直运行，直到我们调用 <em>shutdown()</em> 来停止它：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>scheduler<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>它是一个多才多艺的 <em>Timer</em> 替代品，因为它允许多个服务线程，接受各种时间单位，并且不需要子类化 <em>TimerTask</em>。</p><h2 id="_4-使用协程" tabindex="-1"><a class="header-anchor" href="#_4-使用协程"><span>4. 使用协程</span></a></h2><p>我们还可以使用协程，它们被设计为平滑地处理异步进程。</p><p>协程也适合调度重复任务，因为它们是非阻塞的、轻量级的、灵活的，并且它们允许错误处理，而不会中断整个程序的执行。</p><h3 id="_4-1-使用-repeat-和-delay" tabindex="-1"><a class="header-anchor" href="#_4-1-使用-repeat-和-delay"><span>4.1. 使用 <em>repeat()</em> 和 <em>delay()</em></span></a></h3><p><em>repeat()</em> 函数是 Kotlin 的内置扩展函数，用于重复指定的代码块指定的次数。</p><p>与此同时，<em>delay()</em> 是 Kotlin 协程中的一个函数，用于在不阻塞线程的情况下延迟协程的执行一定时间。</p><p>让我们看一个使用这两个函数重复任务的示例：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">var</span> count <span class="token operator">=</span> <span class="token number">0</span>
<span class="token function">repeat</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    count<span class="token operator">++</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Timer ticked! </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">count</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
    <span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">.</span>milliseconds<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> count<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用 <em>repeat(10)</em> 来运行任务10次。每次执行任务时，我们增加 <em>count</em> 值并打印一条消息。</p><p>然后，我们使用 <em>delay(1000.milliseconds)</em> 在再次执行任务之前延迟执行一秒钟。</p><h3 id="_4-2-使用-withtimeout" tabindex="-1"><a class="header-anchor" href="#_4-2-使用-withtimeout"><span>4.2. 使用 <em>withTimeout()</em></span></a></h3><p><em>withTimeout()</em> 是 Kotlin 协程中的一个函数，我们用它来设置完成代码块的最大时间限制。</p><p>如果超时发生，它会停止执行协程代码块并抛出 <em>TimeoutCancellationException</em>。因此，我们需要用 <em>try-catch</em> 包装它或在单元测试中使用 <em>assertThrows</em>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">var</span> count <span class="token operator">=</span> <span class="token number">0</span>
assertThrows\`<span class="token operator">&lt;</span>TimeoutCancellationException<span class="token operator">&gt;</span>\` <span class="token punctuation">{</span>
    <span class="token function">withTimeout</span><span class="token punctuation">(</span><span class="token number">5000</span><span class="token punctuation">.</span>milliseconds<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            count<span class="token operator">++</span>
            <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Waiting for timeout&quot;</span></span><span class="token punctuation">)</span>
            <span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">.</span>milliseconds<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> count<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <em>withTimeout(5000.milliseconds)</em> 块内，我们运行一个循环，每秒增加 <em>count</em> 值。</p><p><em>TimeoutCancellationException</em> 总是在达到超时时抛出。</p><h2 id="_5-使用协程流" tabindex="-1"><a class="header-anchor" href="#_5-使用协程流"><span>5. 使用协程流</span></a></h2><p>协程流 — 通常称为 Kotlin Flow 或简称 Flow — 是构建在协程之上的额外库，用于异步处理流数据。</p><p>与 <em>Channel</em> 相比，<em>Flow</em> 是冷的，因为它<strong>本身不持有任何资源，并且在 <em>collect()</em> 开始之前不会执行任何操作</strong>。</p><p>因此，<em>Flow</em> 适用于处理重复任务的调度，<strong>特别是在需要定期重复操作的应用程序上下文中</strong>。</p><p>让我们创建一个简单的场景：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> flow <span class="token operator">=</span> flow <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">emit</span><span class="token punctuation">(</span>Unit<span class="token punctuation">)</span>
        <span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">.</span>milliseconds<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每次执行数据流时，此函数将发送一个计数器值，然后延迟一秒钟再发送下一个值。</p><p>这个过程将无限重复，并创建一个每秒间隔重复自身的数据流。</p><h3 id="_5-1-使用-collect" tabindex="-1"><a class="header-anchor" href="#_5-1-使用-collect"><span>5.1. 使用 <em>collect()</em></span></a></h3><p><em>collect()</em> 是 <em>Flow</em> 中用于消费 <em>Flow</em> 生产的数据流的操作之一。它将为 <em>Flow</em> 发送的每个数据元素执行其中定义的代码块。</p><p>因此，<em>collect</em> 允许我们对从数据流接收到的每个项目执行操作或操作：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">var</span> count <span class="token operator">=</span> <span class="token number">0</span>

flow<span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">{</span>
    count<span class="token operator">++</span>
    <span class="token function">println</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，<em>collect</em> 作为一个机制来收集或捕获从 <em>Flow</em> 接收到的值，并在接收到的每个值上执行相关操作。</p><p>代码的输出将是一个无限循环，每秒间隔顺序打印 <em>Long</em> 值：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>1
2
3
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-使用-take-和-collect" tabindex="-1"><a class="header-anchor" href="#_5-2-使用-take-和-collect"><span>5.2. 使用 <em>take()</em> 和 <em>collect()</em></span></a></h3><p><em>take()</em> 函数是 <em>Flow</em> 中的操作，用于从数据流中检索前几个元素。当我们只想检索 <em>Flow</em> 生成的数据流的一小部分时，这个函数很有用 — 例如，限制处理或显示的元素数量。</p><p>让我们调用 <em>take()</em> 并看看它的效果：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>flow<span class="token punctuation">.</span><span class="token function">take</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">{</span>
    count<span class="token operator">++</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Task executed </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">count</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>take(10)</em> 取 <em>flow</em> 的前10个元素。然后我们使用 <em>.collect()</em> 从 <em>Flow</em> 收集值。</p><p>每当收集到一个值时，就会执行其中的代码块。在这种情况下，每次发出一个值，我们就增加 <em>count</em> 并打印一条消息，指示任务已执行以及当前的 <em>count</em>。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本教程中，我们讨论了调度重复任务的方法。</p><p><em>Timer</em> 提供了一种简单的方法，适用于轻量级任务。然而，<em>ScheduledExecutorService</em> 提供了一种更高级的方法，适用于需要单独线程的计划任务。</p><p>此外，Kotlin 拥有协程，能够比传统的基于线程的方法更有效地处理线程。但是，在使用它们时，我们需要小心避免阻塞。</p><p>如果我们需要连续数据处理，那么 <em>Flow</em> 更适合这项工作，因为它允许响应式和非阻塞的任务调度。</p><p>像往常一样，所有的代码示例都可以在 GitHub 上找到。</p>`,65),i=[l];function p(o,c){return s(),a("div",null,i)}const d=n(t,[["render",p],["__file","2024-07-03-Scheduling Repeating Task in Kotlin.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-Scheduling%20Repeating%20Task%20in%20Kotlin.html","title":"Kotlin中调度重复任务","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Coroutines"],"tag":["Kotlin","Scheduling","Coroutines"],"head":[["meta",{"name":"keywords","content":"Kotlin, Scheduling, Coroutines, Timer, ScheduledExecutorService"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-Scheduling%20Repeating%20Task%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中调度重复任务"}],["meta",{"property":"og:description","content":"Kotlin中调度重复任务 调度重复任务是编程中的常见需求。我们可能在数据更新、传感器监控和发送通知等应用程序中看到过它。 在本教程中，我们将讨论在Kotlin中执行任务的重复和在特定间隔中执行的方法。 2. 使用 Timer.schedule() Timer 是 Java 中的一个类，在 java.util 包中，我们可以使用它来安排任务在一定时间后..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T05:55:05.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"Scheduling"}],["meta",{"property":"article:tag","content":"Coroutines"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T05:55:05.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中调度重复任务\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T05:55:05.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中调度重复任务 调度重复任务是编程中的常见需求。我们可能在数据更新、传感器监控和发送通知等应用程序中看到过它。 在本教程中，我们将讨论在Kotlin中执行任务的重复和在特定间隔中执行的方法。 2. 使用 Timer.schedule() Timer 是 Java 中的一个类，在 java.util 包中，我们可以使用它来安排任务在一定时间后..."},"headers":[{"level":2,"title":"2. 使用 Timer.schedule()","slug":"_2-使用-timer-schedule","link":"#_2-使用-timer-schedule","children":[]},{"level":2,"title":"3. 使用 ScheduledExecutorService","slug":"_3-使用-scheduledexecutorservice","link":"#_3-使用-scheduledexecutorservice","children":[]},{"level":2,"title":"4. 使用协程","slug":"_4-使用协程","link":"#_4-使用协程","children":[{"level":3,"title":"4.1. 使用 repeat() 和 delay()","slug":"_4-1-使用-repeat-和-delay","link":"#_4-1-使用-repeat-和-delay","children":[]},{"level":3,"title":"4.2. 使用 withTimeout()","slug":"_4-2-使用-withtimeout","link":"#_4-2-使用-withtimeout","children":[]}]},{"level":2,"title":"5. 使用协程流","slug":"_5-使用协程流","link":"#_5-使用协程流","children":[{"level":3,"title":"5.1. 使用 collect()","slug":"_5-1-使用-collect","link":"#_5-1-使用-collect","children":[]},{"level":3,"title":"5.2. 使用 take() 和 collect()","slug":"_5-2-使用-take-和-collect","link":"#_5-2-使用-take-和-collect","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719986105000,"updatedTime":1719986105000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.1,"words":1530},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-Scheduling Repeating Task in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>调度重复任务是编程中的常见需求。我们可能在数据更新、传感器监控和发送通知等应用程序中看到过它。</p>\\n<p>在本教程中，我们将讨论在Kotlin中执行任务的重复和在特定间隔中执行的方法。</p>\\n<h2>2. 使用 <em>Timer.schedule()</em></h2>\\n<p><em>Timer</em> 是 Java 中的一个类，在 <em>java.util</em> 包中，我们可以使用它来安排任务在一定时间后重复或仅执行一次：</p>\\n<div class=\\"language-kotlin\\" data-ext=\\"kt\\" data-title=\\"kt\\"><pre class=\\"language-kotlin\\"><code><span class=\\"token keyword\\">val</span> timer <span class=\\"token operator\\">=</span> <span class=\\"token function\\">Timer</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,m as data};
