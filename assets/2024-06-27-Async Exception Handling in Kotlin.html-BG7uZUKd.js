import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-YddbDb53.js";const e={},p=t(`<h1 id="kotlin协程中的异步异常处理" tabindex="-1"><a class="header-anchor" href="#kotlin协程中的异步异常处理"><span>Kotlin协程中的异步异常处理</span></a></h1><p>异常处理是编写健壮可靠软件的关键方面。在异步编程中，由于可能在不同线程或协程中出现的错误，管理异常变得更加关键。</p><p>在本教程中，我们将探讨如何在Kotlin协程中处理异常，特别关注在异步代码中捕获异常的各种方法。</p><h3 id="_2-理解异常" tabindex="-1"><a class="header-anchor" href="#_2-理解异常"><span>2. 理解异常</span></a></h3><p>在深入探讨Kotlin协程中的异常处理之前，让我们简要回顾一下异常。<strong>异常是在程序执行期间发生的异常事件，它打断了应用程序的正常流程</strong>。这些事件可能包括错误，例如除以零、访问数组越界或与网络相关的问题。</p><h3 id="_3-在协程中处理异常" tabindex="-1"><a class="header-anchor" href="#_3-在协程中处理异常"><span>3. 在协程中处理异常</span></a></h3><p>让我们也简要回顾一下协程。协程是异步编程的强大工具，它允许开发人员以顺序和更易读的方式编写异步代码。它们提供了一种执行非阻塞操作的方式，而无需回调代码的复杂性。</p><p>在异步编程中，任务通常在不同的线程或协程中并发运行。<strong>如果异常没有得到适当处理，它可以传播到调用栈中，可能导致整个程序崩溃</strong>。有效管理异常对我们维护异步代码的稳定性和可靠性至关重要。</p><p>现在，让我们探索几种在Kotlin协程中处理异常的不同方法。</p><p>异常通过协程层次结构传播。如果协程内部发生异常，它会传播到父协程或协程作用域。要在协程中捕获和处理异常，我们使用协程代码内的_try-catch_块：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> runBlocking <span class="token punctuation">{</span>
    launch <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">val</span> result <span class="token operator">=</span> <span class="token number">10</span> <span class="token operator">/</span> <span class="token number">0</span>
            <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Result: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">result</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token operator">:</span> ArithmeticException<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Caught an ArithmeticException: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">e</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，协程尝试执行除以零的操作，这触发了一个_ArithmeticException_。_try-catch_块捕获了这个特定的异常，并且catch块打印了一条消息，详细说明了捕获的异常。</p><p>因此，输出将是：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>Caught an ArithmeticException<span class="token operator">:</span> java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>ArithmeticException<span class="token operator">:</span> <span class="token operator">/</span> <span class="token keyword">by</span> zero
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-使用-coroutineexceptionhandler" tabindex="-1"><a class="header-anchor" href="#_4-使用-coroutineexceptionhandler"><span>4. 使用_CoroutineExceptionHandler_</span></a></h3><p>或者，_CoroutineExceptionHandler_接口允许我们为特定作用域内的所有协程定义全局异常处理器。当我们想要一个集中的位置来处理异常时，这非常有用。</p><p>我们的接下来的几个例子将使用一个自定义异常：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">CustomException</span><span class="token punctuation">(</span>message<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">Exception</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们创建一个可重用的_CoroutineExceptionHandler_并将其附加到我们的协程：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> runBlocking <span class="token punctuation">{</span>
    <span class="token keyword">val</span> exceptionHandler <span class="token operator">=</span> CoroutineExceptionHandler <span class="token punctuation">{</span> _<span class="token punctuation">,</span> exception <span class="token operator">-&gt;</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Caught global exception: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">exception<span class="token punctuation">.</span>message</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">val</span> job <span class="token operator">=</span> GlobalScope<span class="token punctuation">.</span><span class="token function">launch</span><span class="token punctuation">(</span>exceptionHandler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>
        <span class="token keyword">throw</span> <span class="token function">CustomException</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;An exception occurred!&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    job<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用_CoroutineExceptionHandler_定义了一个全局异常处理器，并将其附加到在_GlobalScope_中启动的协程。处理器在协程内捕获异常，同时提供了<strong>可重用的异常处理逻辑供其他协程使用</strong>。</p><p>输出将是：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>Caught global exception<span class="token operator">:</span> An exception occurred<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-使用-coroutinescope-包装异步调用" tabindex="-1"><a class="header-anchor" href="#_5-使用-coroutinescope-包装异步调用"><span>5. 使用_coroutineScope()_包装异步调用</span></a></h3><p>现在我们已经探讨了在协程中处理异常的方法，让我们看看在同时运行多个协程时处理异常的一些策略。</p><p>_coroutineScope()_函数是一个协程构建器，它确保所有子协程完成，除非其中一个失败，这将取消整个作用域：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> runBlocking <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        coroutineScope <span class="token punctuation">{</span>
            launch <span class="token punctuation">{</span>
                <span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>
                <span class="token keyword">throw</span> <span class="token function">CustomException</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;An exception occurred!&quot;</span></span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            launch <span class="token punctuation">{</span>
                <span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span>
                <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;This coroutine completes successfully.&quot;</span></span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token operator">:</span> CustomException<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Caught exception: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">e<span class="token punctuation">.</span>message</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，_coroutineScope()_函数为两个子协程创建了一个作用域。<strong>如果其中一个协程失败，整个作用域将被取消，并且异常在周围的_try-catch_块中被捕获</strong>。</p><p>由于成功的协程有更短的延迟，输出将是：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>Caught exception<span class="token operator">:</span> An exception occurred<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_6-使用-supervisorscope-包装异步调用" tabindex="-1"><a class="header-anchor" href="#_6-使用-supervisorscope-包装异步调用"><span>6. 使用_supervisorScope()_包装异步调用</span></a></h3><p>最后，_supervisorScope()_是另一个类似于_coroutineScope()_的协程构建器，但它在处理失败时有所不同。而_coroutineScope()_在第一次失败时取消所有子协程**，_supervisorScope()_允许剩余的协程即使其中一个失败也能继续运行**：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">main</span><span class="token punctuation">(</span>args<span class="token operator">:</span> Array<span class="token punctuation">)</span> <span class="token operator">=</span> runBlocking <span class="token punctuation">{</span>
    <span class="token keyword">val</span> exceptionHandler <span class="token operator">=</span> CoroutineExceptionHandler <span class="token punctuation">{</span> _<span class="token punctuation">,</span> exception <span class="token operator">-&gt;</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Caught an exception: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">exception<span class="token punctuation">.</span>message</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    supervisorScope <span class="token punctuation">{</span>
        <span class="token keyword">val</span> job1 <span class="token operator">=</span> <span class="token function">launch</span><span class="token punctuation">(</span>exceptionHandler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>
            <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;This coroutine completes successfully.&quot;</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">val</span> job2 <span class="token operator">=</span> <span class="token function">launch</span><span class="token punctuation">(</span>exceptionHandler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token function">Exception</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;An exception occurred!&quot;</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token function">listOf</span><span class="token punctuation">(</span>job1<span class="token punctuation">,</span> job2<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">joinAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，我们定义了一个_CoroutineExceptionHandler_来处理协程内出现的异常。然后我们使用_supervisorScope()_为子协程建立一个作用域。这种机制防止了一个子协程的失败影响到其他协程或监管协程。我们的一个协程故意抛出一个异常，而另一个协程在执行过程中没有遇到任何问题。</p><p>输出将是：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>Caught an exception<span class="token operator">:</span> An exception occurred<span class="token operator">!</span>
This coroutine completes successfully<span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>为了同步监管协程的执行与其子协程，我们在_job_上调用_join()_。<strong>这确保了监管协程等待所有子协程完成执行</strong>。如果任何子协程中发生异常，_CoroutineExceptionHandler()_会捕获它，允许我们打印一个适当的消息，指示异常的性质。</p><h3 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h3><p>在本教程中，我们强调了理解异常及其如何打断应用程序的正常流程的重要性。在异步编程中，挑战在于有效处理可能在不同线程或协程中发生的异常。我们讨论了异常如何通过协程层次结构传播，并演示了在协程内使用_try-catch_块来捕获和处理特定异常。</p><p>此外，我们探讨了_CoroutineExceptionHandler_接口，它提供了一种集中处理作用域内多个协程的异常的机制。这种方法允许可重用的异常处理逻辑，并促进了更清晰的代码组织。此外，我们检查了如_coroutineScope()_和_supervisorScope()_这样的协程构建器，用于管理协程组。这些构建器提供了不同的异常处理策略，_coroutineScope()_在第一次失败时取消所有子协程，而_supervisorScope()_允许剩余的协程继续独立执行。</p><p>如常，本文的示例可以在GitHub上找到。</p>`,41),o=[p];function i(c,l){return a(),s("div",null,o)}const d=n(e,[["render",i],["__file","2024-06-27-Async Exception Handling in Kotlin.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-27/2024-06-27-Async%20Exception%20Handling%20in%20Kotlin.html","title":"Kotlin协程中的异步异常处理","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Coroutine"],"tag":["Exception Handling","Asynchronous Programming"],"head":[["meta",{"name":"keywords","content":"Kotlin, Coroutine, Exception Handling, Asynchronous Programming"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-27/2024-06-27-Async%20Exception%20Handling%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin协程中的异步异常处理"}],["meta",{"property":"og:description","content":"Kotlin协程中的异步异常处理 异常处理是编写健壮可靠软件的关键方面。在异步编程中，由于可能在不同线程或协程中出现的错误，管理异常变得更加关键。 在本教程中，我们将探讨如何在Kotlin协程中处理异常，特别关注在异步代码中捕获异常的各种方法。 2. 理解异常 在深入探讨Kotlin协程中的异常处理之前，让我们简要回顾一下异常。异常是在程序执行期间发生..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-27T18:51:54.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Exception Handling"}],["meta",{"property":"article:tag","content":"Asynchronous Programming"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T18:51:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin协程中的异步异常处理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-27T18:51:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin协程中的异步异常处理 异常处理是编写健壮可靠软件的关键方面。在异步编程中，由于可能在不同线程或协程中出现的错误，管理异常变得更加关键。 在本教程中，我们将探讨如何在Kotlin协程中处理异常，特别关注在异步代码中捕获异常的各种方法。 2. 理解异常 在深入探讨Kotlin协程中的异常处理之前，让我们简要回顾一下异常。异常是在程序执行期间发生..."},"headers":[{"level":3,"title":"2. 理解异常","slug":"_2-理解异常","link":"#_2-理解异常","children":[]},{"level":3,"title":"3. 在协程中处理异常","slug":"_3-在协程中处理异常","link":"#_3-在协程中处理异常","children":[]},{"level":3,"title":"4. 使用_CoroutineExceptionHandler_","slug":"_4-使用-coroutineexceptionhandler","link":"#_4-使用-coroutineexceptionhandler","children":[]},{"level":3,"title":"5. 使用_coroutineScope()_包装异步调用","slug":"_5-使用-coroutinescope-包装异步调用","link":"#_5-使用-coroutinescope-包装异步调用","children":[]},{"level":3,"title":"6. 使用_supervisorScope()_包装异步调用","slug":"_6-使用-supervisorscope-包装异步调用","link":"#_6-使用-supervisorscope-包装异步调用","children":[]},{"level":3,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719514314000,"updatedTime":1719514314000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.23,"words":1568},"filePathRelative":"posts/baeldung/2024-06-27/2024-06-27-Async Exception Handling in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>异常处理是编写健壮可靠软件的关键方面。在异步编程中，由于可能在不同线程或协程中出现的错误，管理异常变得更加关键。</p>\\n<p>在本教程中，我们将探讨如何在Kotlin协程中处理异常，特别关注在异步代码中捕获异常的各种方法。</p>\\n<h3>2. 理解异常</h3>\\n<p>在深入探讨Kotlin协程中的异常处理之前，让我们简要回顾一下异常。<strong>异常是在程序执行期间发生的异常事件，它打断了应用程序的正常流程</strong>。这些事件可能包括错误，例如除以零、访问数组越界或与网络相关的问题。</p>\\n<h3>3. 在协程中处理异常</h3>\\n<p>让我们也简要回顾一下协程。协程是异步编程的强大工具，它允许开发人员以顺序和更易读的方式编写异步代码。它们提供了一种执行非阻塞操作的方式，而无需回调代码的复杂性。</p>","autoDesc":true}');export{d as comp,k as data};
