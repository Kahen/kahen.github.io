import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DNGMkCCj.js";const p={},e=t('<h1 id="completablefuture-中的-thenapply-和-thenapplyasync-之间的区别" tabindex="-1"><a class="header-anchor" href="#completablefuture-中的-thenapply-和-thenapplyasync-之间的区别"><span>CompletableFuture 中的 thenApply() 和 thenApplyAsync() 之间的区别</span></a></h1><p>在 CompletableFuture 框架中，thenApply() 和 thenApplyAsync() 是支持异步编程的关键方法。</p><p>在本教程中，我们将深入探讨 CompletableFuture 中 thenApply() 和 thenApplyAsync() 之间的差异。我们将探索它们的功能、使用案例，以及何时选择其中一个而不是另一个。</p><p>CompletableFuture 提供了 thenApply() 和 thenApplyAsync() 方法，用于对计算结果应用转换。这两种方法都允许在 CompletableFuture 的结果上执行操作链。</p><h3 id="thenapply" tabindex="-1"><a class="header-anchor" href="#thenapply"><span>thenApply()</span></a></h3><p>thenApply() 是一个用于在 CompletableFuture 完成时对其结果应用函数的方法。它接受一个 Function 函数式接口，将函数应用于结果，并返回一个新的带有转换结果的 CompletableFuture。</p><h3 id="thenapplyasync" tabindex="-1"><a class="header-anchor" href="#thenapplyasync"><span>thenApplyAsync()</span></a></h3><p>thenApplyAsync() 是一个异步执行提供函数的方法。它接受一个 Function 函数式接口和一个可选的 Executor，并返回一个新的带有异步转换结果的 CompletableFuture。</p><h3 id="执行线程" tabindex="-1"><a class="header-anchor" href="#执行线程"><span>执行线程</span></a></h3><p>thenApply() 和 thenApplyAsync() 之间的主要区别在于它们的执行行为。</p><h4 id="thenapply-1" tabindex="-1"><a class="header-anchor" href="#thenapply-1"><span>thenApply()</span></a></h4><p>默认情况下，thenApply() 方法使用完成当前 CompletableFuture 的同一线程执行转换函数。这意味着转换函数的执行可能在结果可用后立即发生。如果转换函数运行时间长或资源密集，这可能会潜在地阻塞线程。</p><p>然而，如果我们在尚未完成的 CompletableFuture 上调用 thenApply()，则它在来自执行器池的另一个线程中异步执行转换函数。</p><p>这里有一个示例代码片段来说明 thenApply()：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompletableFuture</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`````` future <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">CompletableFuture</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` thenApplyResultFuture <span class="token operator">=</span> future<span class="token punctuation">.</span><span class="token function">thenApply</span><span class="token punctuation">(</span>num <span class="token operator">-&gt;</span> <span class="token string">&quot;Result: &quot;</span> <span class="token operator">+</span> num<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">String</span> thenApplyResult <span class="token operator">=</span> thenApplyResultFuture<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Result: 5&quot;</span><span class="token punctuation">,</span> thenApplyResult<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，如果结果已经可用并且当前线程兼容，thenApply() 可能会同步执行函数。然而，重要的是要注意 CompletableFuture 根据各种因素（例如结果的可用性和线程上下文）智能决定是同步执行还是异步执行。</p><h4 id="thenapplyasync-1" tabindex="-1"><a class="header-anchor" href="#thenapplyasync-1"><span>thenApplyAsync()</span></a></h4><p>相比之下，thenApplyAsync() 通过使用来自执行器池的线程保证异步执行提供的函数，通常使用 ForkJoinPool.commonPool()。这确保了函数异步执行，并且可能在单独的线程中运行，防止了当前线程的任何阻塞。</p><p>这是我们如何使用 thenApplyAsync() 的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompletableFuture</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`````` future <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">CompletableFuture</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` thenApplyAsyncResultFuture <span class="token operator">=</span> future<span class="token punctuation">.</span><span class="token function">thenApplyAsync</span><span class="token punctuation">(</span>num <span class="token operator">-&gt;</span> <span class="token string">&quot;Result: &quot;</span> <span class="token operator">+</span> num<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">String</span> thenApplyAsyncResult <span class="token operator">=</span> thenApplyAsyncResultFuture<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Result: 5&quot;</span><span class="token punctuation">,</span> thenApplyAsyncResult<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，即使结果立即可用，thenApplyAsync() 总是在单独的线程上调度函数进行异步执行。</p><h3 id="控制线程" tabindex="-1"><a class="header-anchor" href="#控制线程"><span>控制线程</span></a></h3><p>虽然 thenApply() 和 thenApplyAsync() 都支持异步转换，但它们在支持指定自定义执行器和控制执行线程方面有所不同。</p><h4 id="thenapply-2" tabindex="-1"><a class="header-anchor" href="#thenapply-2"><span>thenApply()</span></a></h4><p>thenApply() 方法不直接支持指定自定义执行器来控制执行线程。它依赖于 CompletableFuture 的默认行为，可能会在完成上一个阶段的同一线程上执行转换函数，通常是来自公共池的线程。</p><h4 id="thenapplyasync-2" tabindex="-1"><a class="header-anchor" href="#thenapplyasync-2"><span>thenApplyAsync()</span></a></h4><p>相比之下，thenApplyAsync() 允许我们显式指定一个执行器来控制执行线程。通过提供自定义执行器，我们可以决定转换函数的执行位置，从而实现更精确的线程管理。</p><p>这是我们如何使用自定义执行器与 thenApplyAsync() 的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ExecutorService</span> customExecutor <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">CompletableFuture</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`````` future <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token number">5</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span> customExecutor<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">CompletableFuture</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` resultFuture <span class="token operator">=</span> future<span class="token punctuation">.</span><span class="token function">thenApplyAsync</span><span class="token punctuation">(</span>num <span class="token operator">-&gt;</span> <span class="token string">&quot;Result: &quot;</span> <span class="token operator">+</span> num<span class="token punctuation">,</span> customExecutor<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">String</span> result <span class="token operator">=</span> resultFuture<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Result: 5&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\ncustomExecutor<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，创建了一个固定线程池大小为 4 的自定义执行器。然后，thenApplyAsync() 方法使用这个自定义执行器，为转换函数的执行线程提供了控制。</p><h3 id="异常处理" tabindex="-1"><a class="header-anchor" href="#异常处理"><span>异常处理</span></a></h3><p>thenApply() 和 thenApplyAsync() 在异常处理上的关键区别在于异常何时以及如何变得可见。</p><h4 id="thenapply-3" tabindex="-1"><a class="header-anchor" href="#thenapply-3"><span>thenApply()</span></a></h4><p>如果提供给 thenApply() 的转换函数抛出异常，thenApply() 阶段会立即以异常完成 CompletableFuture。这种异常完成携带了抛出的异常在一个 CompletionException 中，包装了原始异常。</p><p>让我们用一个示例来说明：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompletableFuture</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`````` future <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">CompletableFuture</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` resultFuture <span class="token operator">=</span> future<span class="token punctuation">.</span><span class="token function">thenApply</span><span class="token punctuation">(</span>num <span class="token operator">-&gt;</span> <span class="token string">&quot;Result: &quot;</span> <span class="token operator">+</span> num <span class="token operator">/</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">CompletionException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> resultFuture<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们尝试将 5 除以 0，这导致抛出 ArithmeticException。这个 CompletionException 直接传播到下一个阶段或调用者，这意味着函数中的任何异常都立即可见以供处理。因此，如果我们尝试使用 get()、join() 或 thenAccept() 等方法访问结果，我们直接遇到 CompletionException：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompletableFuture</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`````` future <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">CompletableFuture</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` resultFuture <span class="token operator">=</span> future<span class="token punctuation">.</span><span class="token function">thenApply</span><span class="token punctuation">(</span>num <span class="token operator">-&gt;</span> <span class="token string">&quot;Result: &quot;</span> <span class="token operator">+</span> num <span class="token operator">/</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">try</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 使用 join() 访问结果</span>\n    <span class="token class-name">String</span> result <span class="token operator">=</span> resultFuture<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Result: 5&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">CompletionException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;java.lang.ArithmeticException: / by zero&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，传递给 thenApply() 的函数抛出了异常。阶段识别出问题并将原始异常包装在 CompletionException 中，允许我们在后续处理中处理它。</p><h4 id="thenapplyasync-3" tabindex="-1"><a class="header-anchor" href="#thenapplyasync-3"><span>thenApplyAsync()</span></a></h4><p>虽然转换函数异步运行，但其中的任何异常不会直接传播到返回的 CompletableFuture。当我们调用 get()、join() 或 thenAccept() 等方法时，异常不会立即可见。这些方法会阻塞，直到异步操作完成，如果不正确处理，可能会导致死锁。</p><p>要处理 thenApplyAsync() 中的异常，我们必须使用专用方法，如 handle()、exceptionally() 或 whenComplete()。这些方法允许我们在异常发生时拦截和处理它。</p><p>这是一个使用 handle 显式处理的代码片段示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompletableFuture</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`````` future <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">CompletableFuture</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` thenApplyAsyncResultFuture <span class="token operator">=</span> future<span class="token punctuation">.</span><span class="token function">thenApplyAsync</span><span class="token punctuation">(</span>num <span class="token operator">-&gt;</span> <span class="token string">&quot;Result: &quot;</span> <span class="token operator">+</span> num <span class="token operator">/</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">String</span> result <span class="token operator">=</span> thenApplyAsyncResultFuture<span class="token punctuation">.</span><span class="token function">handle</span><span class="token punctuation">(</span><span class="token punctuation">(</span>res<span class="token punctuation">,</span> error<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>error <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">// 适当处理错误，例如返回默认值</span>\n        <span class="token keyword">return</span> <span class="token string">&quot;Error occurred&quot;</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> res<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 现在 join() 不会抛出异常</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Error occurred&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，即使 thenApplyAsync() 中发生了异常，它在 resultFuture 中并不直接可见。join() 方法阻塞并最终解开 CompletionException，揭示原始的 ArithmeticException。</p><h3 id="使用案例" tabindex="-1"><a class="header-anchor" href="#使用案例"><span>使用案例</span></a></h3><p>在这一部分，我们将探讨 CompletableFuture 中 thenApply() 和 thenApplyAsync() 方法的常见使用案例。</p><h4 id="thenapply-4" tabindex="-1"><a class="header-anchor" href="#thenapply-4"><span>thenApply()</span></a></h4><p>thenApply() 方法特别适用于以下场景：</p><ul><li>顺序转换：**当需要顺序地将转换应用于 CompletableFuture 的结果时。**这可能涉及将数字结果转换为字符串或基于结果执行计算的任务。</li><li>轻量级操作：**它非常适合执行小而快速的转换，这些转换不会对调用线程造成显著阻塞。**示例包括将数字转换为字符串、基于结果执行计算或操作数据结构。</li></ul><h4 id="thenapplyasync-4" tabindex="-1"><a class="header-anchor" href="#thenapplyasync-4"><span>thenApplyAsync()</span></a></h4><p>另一方面，thenApplyAsync() 方法适用于以下情况：</p><ul><li>异步转换：**当需要异步应用转换时，可能利用多个线程进行并行执行。**例如，在 Web 应用程序中，用户上传图像进行编辑，使用 CompletableFuture 进行异步转换可以同时应用调整大小、过滤器和水印，从而提高处理效率和用户体验。</li><li>阻塞操作：**在转换函数涉及阻塞操作、I/O 操作或计算密集型任务的情况下，thenApplyAsync() 变得有利。**通过将这些计算卸载到单独的线程，有助于防止调用线程阻塞，从而确保更流畅的应用程序性能。</li></ul><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3><p>这里是一个比较 thenApply() 和 thenApplyAsync() 关键差异的总结表。</p><table><thead><tr><th>特性</th><th>thenApply()</th><th>thenApplyAsync()</th></tr></thead><tbody><tr><td>执行行为</td><td>前一阶段的同一线程或执行器池中的单独线程（如果在完成前调用）</td><td>来自执行器池的单独线程</td></tr><tr><td>自定义执行器支持</td><td>不支持</td><td>支持自定义执行器进行线程控制</td></tr><tr><td>异常处理</td><td>立即在 CompletionException 中传播异常</td><td>异常不直接可见，需要显式处理</td></tr><tr><td>性能</td><td>可能会阻塞调用线程</td><td>避免阻塞并提高性能</td></tr><tr><td>使用案例</td><td>顺序转换，轻量级操作</td><td>异步转换，阻塞操作</td></tr></tbody></table><h3 id="结论在本文中-我们探讨了-completablefuture-框架中-thenapply-和-thenapplyasync-方法的功能和差异。" tabindex="-1"><a class="header-anchor" href="#结论在本文中-我们探讨了-completablefuture-框架中-thenapply-和-thenapplyasync-方法的功能和差异。"><span>结论在本文中，我们探讨了 CompletableFuture 框架中 thenApply() 和 thenApplyAsync() 方法的功能和差异。</span></a></h3><p><strong>thenApply()</strong> 可能会潜在地阻塞线程，使其适合轻量级转换或同步执行可接受的场景。另一方面，<strong>thenApplyAsync()</strong> 保证异步执行，使其理想用于涉及潜在阻塞或计算密集型任务的操作，其中响应性至关重要。</p><p>如往常一样，示例的源代码可在 GitHub 上找到。</p><p>OK</p>',60),l=[e];function o(c,u){return a(),s("div",null,l)}const k=n(p,[["render",o],["__file","2024-06-22-Difference Between thenApply   and thenApplyAsync   in CompletableFuture.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-Difference%20Between%20thenApply%20%20%20and%20thenApplyAsync%20%20%20in%20CompletableFuture.html","title":"CompletableFuture 中的 thenApply() 和 thenApplyAsync() 之间的区别","lang":"zh-CN","frontmatter":{"date":"2024-06-22T00:00:00.000Z","category":["Java","CompletableFuture"],"tag":["thenApply","thenApplyAsync"],"head":[["meta",{"name":"keywords","content":"CompletableFuture, thenApply, thenApplyAsync, Java, 异步编程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-Difference%20Between%20thenApply%20%20%20and%20thenApplyAsync%20%20%20in%20CompletableFuture.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"CompletableFuture 中的 thenApply() 和 thenApplyAsync() 之间的区别"}],["meta",{"property":"og:description","content":"CompletableFuture 中的 thenApply() 和 thenApplyAsync() 之间的区别 在 CompletableFuture 框架中，thenApply() 和 thenApplyAsync() 是支持异步编程的关键方法。 在本教程中，我们将深入探讨 CompletableFuture 中 thenApply() 和 th..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T03:49:58.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"thenApply"}],["meta",{"property":"article:tag","content":"thenApplyAsync"}],["meta",{"property":"article:published_time","content":"2024-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T03:49:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"CompletableFuture 中的 thenApply() 和 thenApplyAsync() 之间的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T03:49:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"CompletableFuture 中的 thenApply() 和 thenApplyAsync() 之间的区别 在 CompletableFuture 框架中，thenApply() 和 thenApplyAsync() 是支持异步编程的关键方法。 在本教程中，我们将深入探讨 CompletableFuture 中 thenApply() 和 th..."},"headers":[{"level":3,"title":"thenApply()","slug":"thenapply","link":"#thenapply","children":[]},{"level":3,"title":"thenApplyAsync()","slug":"thenapplyasync","link":"#thenapplyasync","children":[]},{"level":3,"title":"执行线程","slug":"执行线程","link":"#执行线程","children":[]},{"level":3,"title":"控制线程","slug":"控制线程","link":"#控制线程","children":[]},{"level":3,"title":"异常处理","slug":"异常处理","link":"#异常处理","children":[]},{"level":3,"title":"使用案例","slug":"使用案例","link":"#使用案例","children":[]},{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":3,"title":"结论在本文中，我们探讨了 CompletableFuture 框架中 thenApply() 和 thenApplyAsync() 方法的功能和差异。","slug":"结论在本文中-我们探讨了-completablefuture-框架中-thenapply-和-thenapplyasync-方法的功能和差异。","link":"#结论在本文中-我们探讨了-completablefuture-框架中-thenapply-和-thenapplyasync-方法的功能和差异。","children":[]}],"git":{"createdTime":1719028198000,"updatedTime":1719028198000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.88,"words":2065},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-Difference Between thenApply   and thenApplyAsync   in CompletableFuture.md","localizedDate":"2024年6月22日","excerpt":"\\n<p>在 CompletableFuture 框架中，thenApply() 和 thenApplyAsync() 是支持异步编程的关键方法。</p>\\n<p>在本教程中，我们将深入探讨 CompletableFuture 中 thenApply() 和 thenApplyAsync() 之间的差异。我们将探索它们的功能、使用案例，以及何时选择其中一个而不是另一个。</p>\\n<p>CompletableFuture 提供了 thenApply() 和 thenApplyAsync() 方法，用于对计算结果应用转换。这两种方法都允许在 CompletableFuture 的结果上执行操作链。</p>","autoDesc":true}');export{k as comp,d as data};
