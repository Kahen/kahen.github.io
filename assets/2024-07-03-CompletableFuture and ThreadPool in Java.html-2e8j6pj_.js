import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BmeLisJw.js";const e={},p=t('<h1 id="java-中的-completablefuture-和线程池-baeldung" tabindex="-1"><a class="header-anchor" href="#java-中的-completablefuture-和线程池-baeldung"><span>Java 中的 CompletableFuture 和线程池 | Baeldung</span></a></h1><p>Java 8 的并发 API 引入了 <em>CompletableFuture</em>，这是一个简化异步和非阻塞编程的有价值工具。</p><p>在本文中，我们将讨论 Java 的 <em>CompletableFuture</em> 以及它所使用的线程池。我们将探索其异步和非异步方法之间的区别，并学习如何最大限度地利用 <em>CompletableFuture</em> API 的潜力。</p><h2 id="_2-非异步方法" tabindex="-1"><a class="header-anchor" href="#_2-非异步方法"><span>2. 非异步方法</span></a></h2><p><em>CompletableFuture</em> 提供了一个包含50多种方法的广泛API。这些方法中的许多都有两个变体：非异步和异步。让我们从非异步对应方法开始，并深入探讨使用 <em>thenApply()</em> 方法的实践示例：</p><p>当使用 <em>thenApply()</em> 时，我们传递一个函数作为参数，该函数以 <em>CompletableFuture</em> 的前一个值作为输入，执行一个操作，并返回一个新的值。因此，会创建一个新的 <em>CompletableFuture</em> 来封装结果值。为了说明这个概念，让我们考虑一个简单的示例，将 <em>String</em> 值转换为表示其大小的 <em>Integer</em>。此外，我们还将打印负责执行此操作的线程的名称：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">whenUsingNonAsync_thenMainThreadIsUsed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n    <span class="token class-name">CompletableFuture</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` name <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">CompletableFuture</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````` nameLength <span class="token operator">=</span> name<span class="token punctuation">.</span><span class="token function">thenApply</span><span class="token punctuation">(</span>value <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        <span class="token function">printCurrentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 将打印 &quot;main&quot;</span>\n        <span class="token keyword">return</span> value<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>nameLength<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printCurrentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>作为参数传递给 <em>thenApply()</em> 的函数将由直接与 <em>CompletableFuture</em> 的 API 交互的线程执行，在本例中为主线程。然而，如果我们提取与 <em>CompletableFuture</em> 的交互，并从不同的线程调用它，我们应该注意到变化：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">whenUsingNonAsync_thenUsesCallersThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Runnable</span> test <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        <span class="token class-name">CompletableFuture</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` name <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token class-name">CompletableFuture</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````` nameLength <span class="token operator">=</span> name<span class="token punctuation">.</span><span class="token function">thenApply</span><span class="token punctuation">(</span>value <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n            <span class="token function">printCurrentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 将打印 &quot;test-thread&quot;</span>\n            <span class="token keyword">return</span> value<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">try</span> <span class="token punctuation">{</span>\n            <span class="token function">assertThat</span><span class="token punctuation">(</span>nameLength<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token function">fail</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>test<span class="token punctuation">,</span> <span class="token string">&quot;test-thread&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">100l</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-异步方法" tabindex="-1"><a class="header-anchor" href="#_3-异步方法"><span>3. 异步方法</span></a></h2><p>API 中的大多数方法都有一个异步对应方法。我们可以使用这些异步变体来确保中间操作在单独的线程池上执行。让我们改变前面的代码示例，从 <em>thenApply()</em> 切换到 <em>thenApplyAsync()</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">whenUsingAsync_thenUsesCommonPool</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n    <span class="token class-name">CompletableFuture</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` name <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">CompletableFuture</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````` nameLength <span class="token operator">=</span> name<span class="token punctuation">.</span><span class="token function">thenApplyAsync</span><span class="token punctuation">(</span>value <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        <span class="token function">printCurrentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 将打印 &quot;ForkJoinPool.commonPool-worker-1&quot;</span>\n        <span class="token keyword">return</span> value<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>nameLength<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据官方文档，如果我们使用异步方法而不显式提供 <em>Executor</em>，函数将使用 <em>ForkJoinPool.commonPool()</em> 执行。因此，如果我们运行代码片段，我们应该期望看到一个常见的 <em>ForkJoinPool</em> 工作线程：在本例中为 &quot;ForkJoinPool.commonPool-worker-1&quot;。</p><h2 id="_4-使用自定义执行器的异步方法" tabindex="-1"><a class="header-anchor" href="#_4-使用自定义执行器的异步方法"><span>4. 使用自定义执行器的异步方法</span></a></h2><p><strong>我们可以注意到所有异步方法都重载了，提供了一个替代方案，它接受要执行的代码以及 <em>Executor</em>。我们可以使用这个来为异步操作使用一个显式的线程池。</strong> 让我们进一步更新我们的测试，并为 <em>thenApplyAsync()</em> 方法提供一个自定义的线程池：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">whenUsingAsync_thenUsesCustomExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Executor</span> testExecutor <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">CompletableFuture</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` name <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">CompletableFuture</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````` nameLength <span class="token operator">=</span> name<span class="token punctuation">.</span><span class="token function">thenApplyAsync</span><span class="token punctuation">(</span>value <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        <span class="token function">printCurrentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 将打印 &quot;pool-2-thread-1&quot;</span>\n        <span class="token keyword">return</span> value<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span> testExecutor<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>nameLength<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如预期的那样，当使用重载方法时，CompletableFuture 将不再使用公共的 <em>ForkJoinPool</em>。</p><h2 id="_5-扩展-completablefuture" tabindex="-1"><a class="header-anchor" href="#_5-扩展-completablefuture"><span>5. 扩展 CompletableFuture</span></a></h2><p><strong>最后，我们可以扩展 CompletableFuture 并覆盖 defaultExecutor()，封装一个自定义线程池。因此，我们将能够使用异步方法而不指定 Executor，函数将由我们的线程池而不是公共 ForkJoinPool 调用。</strong></p><p>让我们创建一个 CustomCompletableFuture 来扩展 CompletableFuture。让我们使用 newSingleThreadExecutor 并创建一个线程，该线程在控制台测试时可以轻松识别。此外，我们将覆盖 defaultExecutor() 方法，使 CompletableFuture 能够无缝地使用我们的自定义线程池：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomCompletableFuture</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>`` <span class="token keyword">extends</span> <span class="token class-name">CompletableFuture</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>`` <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Executor</span> executor <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newSingleThreadExecutor</span><span class="token punctuation">(</span>\n        runnable <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>runnable<span class="token punctuation">,</span> <span class="token string">&quot;Custom-Single-Thread&quot;</span><span class="token punctuation">)</span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">Executor</span> <span class="token function">defaultExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> executor<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，让我们添加一个静态工厂方法，该方法遵循 CompletableFuture 模式。这将使我们能够轻松创建并完成 CustomCompletableFuture 对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> ````<span class="token generics"><span class="token punctuation">&lt;</span>TYPE<span class="token punctuation">&gt;</span></span>```` <span class="token class-name">CustomCompletableFuture</span>````<span class="token generics"><span class="token punctuation">&lt;</span>TYPE<span class="token punctuation">&gt;</span></span>```` <span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token class-name">Supplier</span>````<span class="token generics"><span class="token punctuation">&lt;</span>TYPE<span class="token punctuation">&gt;</span></span>```` supplier<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">CustomCompletableFuture</span>````<span class="token generics"><span class="token punctuation">&lt;</span>TYPE<span class="token punctuation">&gt;</span></span>```` future <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CustomCompletableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    executor<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        <span class="token keyword">try</span> <span class="token punctuation">{</span>\n            future<span class="token punctuation">.</span><span class="token function">complete</span><span class="token punctuation">(</span>supplier<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            future<span class="token punctuation">.</span><span class="token function">completeExceptionally</span><span class="token punctuation">(</span>ex<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> future<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们创建一个 CustomCompletableFuture 的实例，并在 thenSupplyAsync() 中对 String 值执行相同的转换。尽管这次我们没有指定 Executor，但我们仍然期望函数由我们专用的线程 &quot;Custom-Single-Thread&quot; 调用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">whenOverridingDefaultThreadPool_thenUsesCustomExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n    <span class="token class-name">CompletableFuture</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` name <span class="token operator">=</span> <span class="token class-name">CustomCompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">CompletableFuture</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````` nameLength <span class="token operator">=</span> name<span class="token punctuation">.</span><span class="token function">thenApplyAsync</span><span class="token punctuation">(</span>value <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        <span class="token function">printCurrentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 将打印 &quot;Custom-Single-Thread&quot;</span>\n        <span class="token keyword">return</span> value<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>nameLength<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们了解到 CompletableFuture 的 API 中的大多数方法都允许异步和非异步执行。通过调用非异步变体，调用 CompletableFuture 的 API 的线程也将执行所有中间操作和转换。另一方面，异步对应方法将使用不同的线程池，默认的是公共 ForkJoinPool。</p><p>之后，我们讨论了执行的进一步定制，为每个异步步骤使用自定义 Executors。最后，我们学会了如何创建自定义 CompletableFuture 对象并覆盖 defaultExecutor() 方法。这使我们能够使用异步方法而不必每次都指定自定义 Executor。</p><p>如往常一样，我们可以在 GitHub 上找到工作的代码示例。</p>',29),o=[p];function c(l,u){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-03-CompletableFuture and ThreadPool in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-CompletableFuture%20and%20ThreadPool%20in%20Java.html","title":"Java 中的 CompletableFuture 和线程池 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2023-07-31T00:00:00.000Z","category":["Java","CompletableFuture"],"tag":["Java 8","线程池"],"head":[["meta",{"name":"keywords","content":"CompletableFuture, 线程池, Java 8, 异步编程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-CompletableFuture%20and%20ThreadPool%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 中的 CompletableFuture 和线程池 | Baeldung"}],["meta",{"property":"og:description","content":"Java 中的 CompletableFuture 和线程池 | Baeldung Java 8 的并发 API 引入了 CompletableFuture，这是一个简化异步和非阻塞编程的有价值工具。 在本文中，我们将讨论 Java 的 CompletableFuture 以及它所使用的线程池。我们将探索其异步和非异步方法之间的区别，并学习如何最大限度..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T13:34:41.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:tag","content":"线程池"}],["meta",{"property":"article:published_time","content":"2023-07-31T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T13:34:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 中的 CompletableFuture 和线程池 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-07-31T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T13:34:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 中的 CompletableFuture 和线程池 | Baeldung Java 8 的并发 API 引入了 CompletableFuture，这是一个简化异步和非阻塞编程的有价值工具。 在本文中，我们将讨论 Java 的 CompletableFuture 以及它所使用的线程池。我们将探索其异步和非异步方法之间的区别，并学习如何最大限度..."},"headers":[{"level":2,"title":"2. 非异步方法","slug":"_2-非异步方法","link":"#_2-非异步方法","children":[]},{"level":2,"title":"3. 异步方法","slug":"_3-异步方法","link":"#_3-异步方法","children":[]},{"level":2,"title":"4. 使用自定义执行器的异步方法","slug":"_4-使用自定义执行器的异步方法","link":"#_4-使用自定义执行器的异步方法","children":[]},{"level":2,"title":"5. 扩展 CompletableFuture","slug":"_5-扩展-completablefuture","link":"#_5-扩展-completablefuture","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720013681000,"updatedTime":1720013681000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.33,"words":1299},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-CompletableFuture and ThreadPool in Java.md","localizedDate":"2023年7月31日","excerpt":"\\n<p>Java 8 的并发 API 引入了 <em>CompletableFuture</em>，这是一个简化异步和非阻塞编程的有价值工具。</p>\\n<p>在本文中，我们将讨论 Java 的 <em>CompletableFuture</em> 以及它所使用的线程池。我们将探索其异步和非异步方法之间的区别，并学习如何最大限度地利用 <em>CompletableFuture</em> API 的潜力。</p>\\n<h2>2. 非异步方法</h2>\\n<p><em>CompletableFuture</em> 提供了一个包含50多种方法的广泛API。这些方法中的许多都有两个变体：非异步和异步。让我们从非异步对应方法开始，并深入探讨使用 <em>thenApply()</em> 方法的实践示例：</p>","autoDesc":true}');export{k as comp,d as data};
