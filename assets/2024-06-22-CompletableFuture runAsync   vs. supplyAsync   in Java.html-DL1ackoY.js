import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BDZ-trJf.js";const e={},p=t(`<h1 id="java中completablefuture的runasync-与supplyasync-对比-baeldung" tabindex="-1"><a class="header-anchor" href="#java中completablefuture的runasync-与supplyasync-对比-baeldung"><span>Java中CompletableFuture的runAsync()与supplyAsync()对比 | Baeldung</span></a></h1><p>Java的_CompletableFuture_框架提供了强大的异步编程能力，方便了任务的并发执行。</p><p>在本教程中，我们将深入探讨_CompletableFuture_提供的两个基本方法——runAsync()和supplyAsync()。我们将探索它们的区别、使用场景以及何时选择其中一个。</p><h3 id="_2-completablefuture-runasync-和-supplyasync-的理解" tabindex="-1"><a class="header-anchor" href="#_2-completablefuture-runasync-和-supplyasync-的理解"><span>2. CompletableFuture, runAsync() 和 supplyAsync() 的理解</span></a></h3><p>CompletableFuture是Java中一个强大的框架，它支持异步编程，允许任务并发执行而不会阻塞主线程。runAsync()和supplyAsync()是由CompletableFuture类提供的方法。</p><p>在我们深入比较之前，先了解一下runAsync()和supplyAsync()各自的功能。这两种方法都启动了异步任务，允许我们并发执行代码而不会阻塞主线程。</p><p><strong>runAsync()</strong> 是一个用于异步执行不产生结果的任务的方法。它适用于我们想要异步执行代码而不等待结果的“发射后忘记”任务。例如，记录日志、发送通知或触发后台任务。</p><p>另一方面，<strong>supplyAsync()</strong> 是一个用于异步执行产生结果的任务的方法。它非常适合需要结果进行进一步处理的任务。例如，从数据库获取数据、进行API调用或异步执行计算。</p><h3 id="_3-输入和返回" tabindex="-1"><a class="header-anchor" href="#_3-输入和返回"><span>3. 输入和返回</span></a></h3><p>runAsync()和supplyAsync()之间的主要区别在于它们接受的输入以及它们产生的返回类型。</p><h4 id="_3-1-runasync" tabindex="-1"><a class="header-anchor" href="#_3-1-runasync"><span>3.1. runAsync()</span></a></h4><p>当异步任务不产生任何结果时，使用runAsync()方法。它接受一个Runnable函数式接口并异步启动任务。<strong>它返回CompletableFuture<code>&lt;Void&gt;</code>，并且适用于那些重点在于任务完成而不是获取特定结果的场景。</strong></p><p>这是一个展示其用法的代码片段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompletableFuture</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` future <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">runAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 执行不产生结果的任务</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Task executed asynchronously&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，runAsync()方法被用来异步执行一个不产生结果的任务。提供的lambda表达式封装了要执行的任务。完成后，它会打印：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Task</span> completed successfully
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_3-2-supplyasync" tabindex="-1"><a class="header-anchor" href="#_3-2-supplyasync"><span>3.2. supplyAsync()</span></a></h4><p>另一方面，当异步任务产生结果时，使用supplyAsync()。它接受一个Supplier函数式接口并异步启动任务。<strong>随后，它返回CompletableFuture<code>&lt;T&gt;</code>，其中T是由任务产生的结果类型。</strong></p><p>让我们通过一个例子来说明：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompletableFuture</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` future <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 执行结果生成任务</span>
    <span class="token keyword">return</span> <span class="token string">&quot;Result of the asynchronous computation&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 稍后获取结果</span>
<span class="token class-name">String</span> result <span class="token operator">=</span> future<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Result: &quot;</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，supplyAsync()被用来异步执行一个结果生成任务。supplyAsync()内的lambda表达式代表了异步计算结果的任务。完成后，它打印出获得的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Result</span><span class="token operator">:</span> <span class="token class-name">Result</span> of the asynchronous computation
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-异常处理" tabindex="-1"><a class="header-anchor" href="#_4-异常处理"><span>4. 异常处理</span></a></h3><p>在这一部分，我们将讨论这两种方法如何处理异常。</p><h4 id="_4-1-runasync" tabindex="-1"><a class="header-anchor" href="#_4-1-runasync"><span>4.1. runAsync()</span></a></h4><p>使用runAsync()时，异常处理是直接的。<strong>该方法没有为异步任务内处理异常提供显式机制。</strong> 因此，在执行任务期间抛出的任何异常都会在调用CompletableFuture上的get()方法时传播到调用线程。这意味着我们必须在调用get()之后手动处理异常。</p><p>这是一个演示runAsync()异常处理的代码片段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompletableFuture</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` future <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">runAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">&quot;Exception occurred in asynchronous task&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">try</span> <span class="token punctuation">{</span>
    future<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 异常将在这里抛出</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ExecutionException</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Throwable</span> cause <span class="token operator">=</span> ex<span class="token punctuation">.</span><span class="token function">getCause</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Exception caught: &quot;</span> <span class="token operator">+</span> cause<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后打印出异常消息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Exception</span> caught<span class="token operator">:</span> <span class="token class-name">Exception</span> occurred in asynchronous task
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_4-2-supplyasync" tabindex="-1"><a class="header-anchor" href="#_4-2-supplyasync"><span>4.2. supplyAsync()</span></a></h4><p>相比之下，supplyAsync()提供了一种更方便的异常处理方式。<strong>它通过exceptionally()方法提供了异常处理机制。</strong> 这个方法允许我们指定一个函数，如果原始的异步任务异常完成，该函数将被调用。我们可以使用这个函数来处理异常并返回一个默认值或执行任何必要的清理操作。</p><p>让我们看一个示例，演示supplyAsync()的异常处理如何工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompletableFuture</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` future <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">&quot;Exception occurred in asynchronous task&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">exceptionally</span><span class="token punctuation">(</span>ex <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 异常处理逻辑</span>
    <span class="token keyword">return</span> <span class="token string">&quot;Default value&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> result <span class="token operator">=</span> future<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 获取结果或默认值</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Result: &quot;</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，如果在执行异步任务期间发生异常，exceptionally()方法将被调用。这允许我们优雅地处理异常，并在需要时提供回退值。</p><p>而不是抛出异常，它打印：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Task</span> completed <span class="token keyword">with</span> <span class="token namespace">result</span><span class="token operator">:</span> <span class="token class-name">Default</span> value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-执行行为" tabindex="-1"><a class="header-anchor" href="#_5-执行行为"><span>5. 执行行为</span></a></h3><p>在这一部分，我们将探讨CompletableFuture的runAsync()和supplyAsync()方法的执行行为。</p><h4 id="_5-1-runasync" tabindex="-1"><a class="header-anchor" href="#_5-1-runasync"><span>5.1. runAsync()</span></a></h4><p>使用runAsync()时，任务会立即在公共线程池中启动。它的行为类似于调用new Thread(runnable).start()。<strong>这意味着任务在调用时立即开始执行，没有任何延迟或调度考虑。</strong></p><h4 id="_5-2-supplyasync" tabindex="-1"><a class="header-anchor" href="#_5-2-supplyasync"><span>5.2. supplyAsync()</span></a></h4><p>另一方面，supplyAsync()在公共线程池中安排任务，如果其他任务排队，可能会延迟其执行。<strong>这种调度方法在资源管理方面可能是有利的，因为它有助于防止突然的线程创建爆发。</strong> 通过排队任务并根据线程的可用性安排它们的执行，supplyAsync()确保了高效的资源利用。</p><h3 id="_6-链式操作" tabindex="-1"><a class="header-anchor" href="#_6-链式操作"><span>6. 链式操作</span></a></h3><p>在这一部分，我们将探讨CompletableFuture的runAsync()和supplyAsync()方法如何支持链式操作，突出它们的差异。</p><h4 id="_6-1-runasync" tabindex="-1"><a class="header-anchor" href="#_6-1-runasync"><span>6.1. runAsync()</span></a></h4><p>runAsync()方法不能直接与thenApply()或thenAccept()等方法链式使用，因为它不产生结果。<strong>然而，我们可以使用thenRun()在runAsync()任务完成后执行另一个任务。</strong> 这个方法允许我们在不依赖初始任务结果的情况下，链式执行顺序执行的其他任务。</p><p>下面是一个使用runAsync()和thenRun()展示链式操作的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompletableFuture</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` future <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">runAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Task executed asynchronously&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

future<span class="token punctuation">.</span><span class="token function">thenRun</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 在runAsync()完成后执行另一个任务</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Another task executed after runAsync() completes&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们首先使用runAsync()异步执行一个任务。然后，我们使用thenRun()来指定在初始任务完成后要执行的另一个任务。这允许我们顺序地链式多个任务，结果如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Task</span> executed asynchronously
<span class="token class-name">Another</span> task executed after <span class="token function">runAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span> completes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6-2-supplyasync" tabindex="-1"><a class="header-anchor" href="#_6-2-supplyasync"><span>6.2. supplyAsync()</span></a></h4><p>相比之下，supplyAsync()由于其返回值允许链式操作。由于supplyAsync()产生结果，我们可以使用thenApply()来转换结果，使用thenAccept()来消费结果，或使用thenCompose()来链式进一步的异步操作。这种灵活性使我们能够通过链式多个任务来构建复杂的异步工作流。</p><p>这里有一个使用supplyAsync()和thenApply()的链式操作示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompletableFuture</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` future <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;Result of the asynchronous computation&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

future<span class="token punctuation">.</span><span class="token function">thenApply</span><span class="token punctuation">(</span>result <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 转换结果</span>
    <span class="token keyword">return</span> result<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenAccept</span><span class="token punctuation">(</span>transformedResult <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 消费转换后的结果</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Transformed Result: &quot;</span> <span class="token operator">+</span> transformedResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们首先使用supplyAsync()异步执行一个任务，该任务产生结果。然后，我们使用thenApply()来转换结果，使用thenAccept()来消费转换后的结果。这演示了使用supplyAsync()的多个操作的链式，允许更复杂的异步工作流。</p><p>输出示例如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Transformed</span> <span class="token class-name">Result</span><span class="token operator">:</span> <span class="token constant">RESULT</span> <span class="token constant">OF</span> <span class="token constant">THE</span> <span class="token constant">ASYNCHRONOUS</span> <span class="token constant">COMPUTATION</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_7-性能" tabindex="-1"><a class="header-anchor" href="#_7-性能"><span>7. 性能</span></a></h3><p>虽然runAsync()和supplyAsync()都异步执行任务，但它们的性能特性可能会根据任务的性质和底层执行环境而有所不同。</p><h4 id="_7-1-runasync" tabindex="-1"><a class="header-anchor" href="#_7-1-runasync"><span>7.1. runAsync()</span></a></h4><p>由于runAsync()不产生任何结果，它可能与supplyAsync()相比具有稍微更好的性能。<strong>这是因为它避免了创建Supplier对象的开销。</strong> 在某些情况下，缺少结果处理逻辑可以导致更快的任务执行。</p><h4 id="_7-2-supplyasync" tabindex="-1"><a class="header-anchor" href="#_7-2-supplyasync"><span>7.2. supplyAsync()</span></a></h4><p>影响supplyAsync()性能的因素包括任务的复杂性、资源的可用性和底层执行环境的效率。</p><p>在涉及复杂计算或资源密集型操作的任务场景中，使用supplyAsync()的性能影响可能更为明显。然而，处理结果和任务之间的依赖能力可能会超过任何潜在的性能开销。</p><h3 id="_8-使用场景" tabindex="-1"><a class="header-anchor" href="#_8-使用场景"><span>8. 使用场景</span></a></h3><p>在这一部分，我们将探讨这两种方法的具体使用场景。</p><h4 id="_8-1-runasync" tabindex="-1"><a class="header-anchor" href="#_8-1-runasync"><span>8.1. runAsync()</span></a></h4><p>runAsync()方法特别适用于重点在于任务完成而不是获得特定结果的场景。**runAsync()通常用于执行不需要返回结果的后台任务或操作的场景。例如，使用runAsync()可以高效地运行定期清理例程、记录事件或触发通知。</p><h4 id="_8-2-supplyasync" tabindex="-1"><a class="header-anchor" href="#_8-2-supplyasync"><span>8.2. supplyAsync()</span></a></h4><p>与runAsync()相比，supplyAsync()方法特别适用于任务完成时涉及产生稍后可能在应用程序流程中使用的值的情况。supplyAsync()的一个典型用例是从外部源获取数据，例如数据库、API或远程服务器。</p><p><strong>此外，supplyAsync()适合执行生成结果值的计算任务，例如执行复杂计算或处理输入数据。</strong></p><h3 id="_9-总结" tabindex="-1"><a class="header-anchor" href="#_9-总结"><span>9. 总结</span></a></h3><p>以下是比较runAsync()和supplyAsync()关键差异的摘要表：</p><table><thead><tr><th>特性</th><th>runAsync()</th><th>supplyAsync()</th></tr></thead><tbody><tr><td>输入</td><td>接受一个Runnable，代表一个不产生结果的任务</td><td>接受一个Supplier<code>&lt;T&gt;</code>，代表一个产生结果的任务</td></tr><tr><td>返回类型</td><td>CompletableFuture<code>&lt;Void&gt;</code></td><td>CompletableFuture<code>&lt;T&gt;</code>（T是结果类型）</td></tr><tr><td>使用场景</td><td>不需要结果的“发射后忘记”任务</td><td>需要结果进行进一步处理的任务</td></tr><tr><td>异常处理</td><td>没有内置机制；异常传播给调用者</td><td>提供exceptionally()用于优雅的异常处理</td></tr><tr><td>执行行为</td><td>立即启动任务</td><td>安排任务可能延迟执行</td></tr><tr><td>链式操作</td><td>支持thenRun()用于后续任务</td><td>支持thenApply()等方法进行任务链式</td></tr><tr><td>性能</td><td>可能具有稍微更好的性能</td><td>性能受任务复杂性和资源影响</td></tr><tr><td>使用场景</td><td>后台任务、定期例程、通知</td><td>数据获取、计算任务、结果依赖任务</td></tr></tbody></table><h3 id="_10-结论" tabindex="-1"><a class="header-anchor" href="#_10-结论"><span>10. 结论</span></a></h3><p>在本文中，我们探讨了runAsync()和supplyAsync()方法。我们讨论了它们的功能、差异、异常处理机制、执行行为、链式操作、性能考虑和特定使用场景。</p><p>当需要结果时，supplyAsync()是首选，而当重点仅在于任务完成而不需要特定结果时，runAsync()是合适的。</p><p>如常，示例的源代码可在GitHub上找到。</p><p>OK</p>`,80),c=[p];function l(u,o){return a(),s("div",null,c)}const d=n(e,[["render",l],["__file","2024-06-22-CompletableFuture runAsync   vs. supplyAsync   in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-CompletableFuture%20runAsync%20%20%20vs.%20supplyAsync%20%20%20in%20Java.html","title":"Java中CompletableFuture的runAsync()与supplyAsync()对比 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-22T00:00:00.000Z","category":["Java","CompletableFuture"],"tag":["CompletableFuture","runAsync","supplyAsync"],"head":[["meta",{"name":"keywords","content":"Java, CompletableFuture, runAsync, supplyAsync, 异步编程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-CompletableFuture%20runAsync%20%20%20vs.%20supplyAsync%20%20%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中CompletableFuture的runAsync()与supplyAsync()对比 | Baeldung"}],["meta",{"property":"og:description","content":"Java中CompletableFuture的runAsync()与supplyAsync()对比 | Baeldung Java的_CompletableFuture_框架提供了强大的异步编程能力，方便了任务的并发执行。 在本教程中，我们将深入探讨_CompletableFuture_提供的两个基本方法——runAsync()和supplyAsync..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T06:35:10.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"CompletableFuture"}],["meta",{"property":"article:tag","content":"runAsync"}],["meta",{"property":"article:tag","content":"supplyAsync"}],["meta",{"property":"article:published_time","content":"2024-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T06:35:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中CompletableFuture的runAsync()与supplyAsync()对比 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T06:35:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中CompletableFuture的runAsync()与supplyAsync()对比 | Baeldung Java的_CompletableFuture_框架提供了强大的异步编程能力，方便了任务的并发执行。 在本教程中，我们将深入探讨_CompletableFuture_提供的两个基本方法——runAsync()和supplyAsync..."},"headers":[{"level":3,"title":"2. CompletableFuture, runAsync() 和 supplyAsync() 的理解","slug":"_2-completablefuture-runasync-和-supplyasync-的理解","link":"#_2-completablefuture-runasync-和-supplyasync-的理解","children":[]},{"level":3,"title":"3. 输入和返回","slug":"_3-输入和返回","link":"#_3-输入和返回","children":[]},{"level":3,"title":"4. 异常处理","slug":"_4-异常处理","link":"#_4-异常处理","children":[]},{"level":3,"title":"5. 执行行为","slug":"_5-执行行为","link":"#_5-执行行为","children":[]},{"level":3,"title":"6. 链式操作","slug":"_6-链式操作","link":"#_6-链式操作","children":[]},{"level":3,"title":"7. 性能","slug":"_7-性能","link":"#_7-性能","children":[]},{"level":3,"title":"8. 使用场景","slug":"_8-使用场景","link":"#_8-使用场景","children":[]},{"level":3,"title":"9. 总结","slug":"_9-总结","link":"#_9-总结","children":[]},{"level":3,"title":"10. 结论","slug":"_10-结论","link":"#_10-结论","children":[]}],"git":{"createdTime":1719038110000,"updatedTime":1719038110000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":8.51,"words":2554},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-CompletableFuture runAsync   vs. supplyAsync   in Java.md","localizedDate":"2024年6月22日","excerpt":"\\n<p>Java的_CompletableFuture_框架提供了强大的异步编程能力，方便了任务的并发执行。</p>\\n<p>在本教程中，我们将深入探讨_CompletableFuture_提供的两个基本方法——runAsync()和supplyAsync()。我们将探索它们的区别、使用场景以及何时选择其中一个。</p>\\n<h3>2. CompletableFuture, runAsync() 和 supplyAsync() 的理解</h3>\\n<p>CompletableFuture是Java中一个强大的框架，它支持异步编程，允许任务并发执行而不会阻塞主线程。runAsync()和supplyAsync()是由CompletableFuture类提供的方法。</p>","autoDesc":true}');export{d as comp,k as data};
