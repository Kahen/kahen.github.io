import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CXN34Kw1.js";const e={},p=t(`<h1 id="java-中-future-和-promise-的区别" tabindex="-1"><a class="header-anchor" href="#java-中-future-和-promise-的区别"><span>Java 中 Future 和 Promise 的区别</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Future 和 Promise 是用于处理异步任务的工具，它们允许在不等待每一步完成的情况下执行操作。尽管它们的目的相同，但它们之间存在关键差异。在本教程中，我们将探讨 Future 和 Promise 之间的差异，仔细研究它们的关键特性、用例和独特特点。</p><h2 id="_2-理解-future" tabindex="-1"><a class="header-anchor" href="#_2-理解-future"><span>2. 理解 Future</span></a></h2><p>Future 充当一个容器，等待正在进行的操作的结果。开发者通常使用 Future 来检查计算的状态，在结果准备好时检索结果，或者优雅地等待操作结束。Future 经常与 Executor 框架集成，提供了一种简单高效的处理异步任务的方法。</p><h3 id="_2-1-关键特性" tabindex="-1"><a class="header-anchor" href="#_2-1-关键特性"><span>2.1. 关键特性</span></a></h3><p>现在，让我们探索一些 Future 的关键特性：</p><ul><li><strong>采用阻塞设计，这可能导致等待直到异步计算完成。</strong></li><li>与正在进行的计算的直接交互受到限制，保持了一种简单直接的方法。</li></ul><h3 id="_2-2-使用场景" tabindex="-1"><a class="header-anchor" href="#_2-2-使用场景"><span>2.2. 使用场景</span></a></h3><p><strong>Future 在异步操作的结果在过程开始后就已经确定，并且不能在过程中修改的场景中表现出色。</strong></p><p>考虑从数据库中获取用户个人资料信息或从远程服务器下载文件。一旦启动，这些操作就有固定的结果，例如检索到的数据或下载的文件，并且不能在中途修改。</p><h3 id="_2-3-使用-future" tabindex="-1"><a class="header-anchor" href="#_2-3-使用-future"><span>2.3. 使用 Future</span></a></h3><p>要使用 Future，我们可以在 java.util.concurrent 包中找到它们。让我们看一个演示如何使用 Future 处理异步任务的代码片段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ExecutorService</span> executorService <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newSingleThreadExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Future</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` futureResult <span class="token operator">=</span> executorService<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token string">&quot;Future Result&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>futureResult<span class="token punctuation">.</span><span class="token function">isDone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Future task is still in progress...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">String</span> resultFromFuture <span class="token operator">=</span> futureResult<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Future Result: &quot;</span> <span class="token operator">+</span> resultFromFuture<span class="token punctuation">)</span><span class="token punctuation">;</span>

executorService<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们运行代码时，我们会得到以下输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Future task is still in progress...
Future task is still in progress...
Future task is still in progress...
Future task is still in progress...
Future Result: Future Result
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在代码中，futureResult.get() 方法是一个阻塞调用。这意味着当程序到达这行时，<strong>它将等待提交给 ExecutorService 的异步任务完成后才继续前进</strong>。</p><h2 id="_3-理解-promise" tabindex="-1"><a class="header-anchor" href="#_3-理解-promise"><span>3. 理解 Promise</span></a></h2><p>相反，Promise 的概念在 Java 中不是本地的，但在其他编程语言中是一种多功能的抽象。**Promise 充当一个代理，代表一个可能在 Promise 创建时未知的值。**与 Future 不同，Promise 通常提供一种更互动的方法，允许开发者即使在启动后也能影响异步计算。</p><h3 id="_3-1-关键特性" tabindex="-1"><a class="header-anchor" href="#_3-1-关键特性"><span>3.1. 关键特性</span></a></h3><p>现在，让我们探索一些 Promise 的关键特性：</p><ul><li>封装了一个可变状态，即使在异步操作开始后也允许修改，提供了处理动态场景的灵活性</li><li>使用回调机制，允许开发者附加在异步操作完成、失败或进度时执行的回调</li></ul><h3 id="_3-2-使用场景" tabindex="-1"><a class="header-anchor" href="#_3-2-使用场景"><span>3.2. 使用场景</span></a></h3><p>**Promise 非常适合需要动态和交互式控制异步操作的场景。**此外，Promise 提供了在启动后修改正在进行的计算的灵活性。一个很好的例子是在金融应用中实时数据流，其中显示内容需要适应实时市场变化。</p><p>此外，当处理需要基于中间结果进行条件分支或修改的异步任务时，Promise 也很有用。一个可能的使用场景是，我们需要处理多个异步 API 调用，其中后续操作取决于前一个调用的结果。</p><h3 id="_3-3-使用-promise" tabindex="-1"><a class="header-anchor" href="#_3-3-使用-promise"><span>3.3. 使用 Promise</span></a></h3><p>Java 可能没有严格遵循 JavaScript 中 Promise 规范的专用 Promise 类。**然而，我们可以使用 java.util.concurrent.CompletableFuture 来实现类似 Promise 的功能。**CompletableFuture 提供了一种灵活的方式来处理异步任务，与 Promise 共享一些特性。需要注意的是，它们并不相同。</p><p>让我们探索如何使用 CompletableFuture 在 Java 中实现类似 Promise 的行为：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ExecutorService</span> executorService <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newSingleThreadExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">CompletableFuture</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` completableFutureResult <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token string">&quot;CompletableFuture Result&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> executorService<span class="token punctuation">)</span><span class="token punctuation">;</span>

completableFutureResult<span class="token punctuation">.</span><span class="token function">thenAccept</span><span class="token punctuation">(</span>result <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Promise Result: &quot;</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">exceptionally</span><span class="token punctuation">(</span>throwable <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>err<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Error occurred: &quot;</span> <span class="token operator">+</span> throwable<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Doing other tasks...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

executorService<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们运行代码时，我们会看到以下输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Doing other tasks...
Promise Result: CompletableFuture Result
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们创建了一个名为 completableFutureResult 的 CompletableFuture。supplyAsync() 方法用于启动异步计算。提供的 lambda 函数表示异步任务。</p><p>接下来，我们使用 thenAccept() 和 exceptionally() 将回调附加到 CompletableFuture。thenAccept() 回调处理异步任务的成功完成，类似于 Promise 的解析，而 exceptionally() 处理在任务期间可能发生的任何异常，类似于 Promise 的拒绝。</p><h2 id="_4-关键差异" tabindex="-1"><a class="header-anchor" href="#_4-关键差异"><span>4. 关键差异</span></a></h2><h3 id="_4-1-控制流" tabindex="-1"><a class="header-anchor" href="#_4-1-控制流"><span>4.1. 控制流</span></a></h3><p>一旦 Future 的值被设置，控制流就会顺流而下，不受后续事件或更改的影响。与此同时，Promise（或 CompletableFuture）提供了 thenCompose() 和 whenComplete() 等方法，用于基于最终结果或异常的条件执行。</p><p>让我们创建一个使用 CompletableFuture 的分支控制流的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompletableFuture</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\` firstTask <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">thenApplyAsync</span><span class="token punctuation">(</span>result <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> result <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">whenComplete</span><span class="token punctuation">(</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> ex<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ex <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 在这里处理错误</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在代码中，我们使用 thenApplyAsync() 方法来演示异步任务的链式。</p><h3 id="_4-2-错误处理" tabindex="-1"><a class="header-anchor" href="#_4-2-错误处理"><span>4.2. 错误处理</span></a></h3><p>Future 和 Promise 都提供了处理错误和异常的机制。Future 依赖于在计算期间抛出的异常：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ExecutorService</span> executorService <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newSingleThreadExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Future</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` futureWithError <span class="token operator">=</span> executorService<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">&quot;An error occurred&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> result <span class="token operator">=</span> futureWithError<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> <span class="token operator">|</span> <span class="token class-name">ExecutionException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    executorService<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 CompletableFuture 中，exceptionally() 方法用于处理在异步计算期间发生的任何异常。如果发生异常，它将打印错误消息并提供回退值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompletableFuture</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` promiseWithError <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CompletableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
promiseWithError<span class="token punctuation">.</span><span class="token function">completeExceptionally</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">&quot;An error occurred&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

promiseWithError<span class="token punctuation">.</span><span class="token function">exceptionally</span><span class="token punctuation">(</span>throwable <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;Fallback value&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-读写访问" tabindex="-1"><a class="header-anchor" href="#_4-3-读写访问"><span>4.3. 读写访问</span></a></h3><p>Future 提供了一个只读视图，允许我们在计算完成后检索结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Future</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\` future <span class="token operator">=</span> executor<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 不能在完成后修改 future.get()</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>相比之下，CompletableFuture 不仅允许我们读取结果，而且在异步操作开始后甚至可以主动动态设置值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ExecutorService</span> executorService <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newSingleThreadExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">CompletableFuture</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\` totalPromise <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token number">100</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> executorService<span class="token punctuation">)</span><span class="token punctuation">;</span>

totalPromise<span class="token punctuation">.</span><span class="token function">thenAccept</span><span class="token punctuation">(</span>value <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Total $&quot;</span> <span class="token operator">+</span> value <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
totalPromise<span class="token punctuation">.</span><span class="token function">complete</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最初，我们设置异步任务返回 100 作为结果。然而，我们在它自然完成之前介入，并显式地用值 10 完成任务。这种灵活性突出了 CompletableFuture 的可写特性，允许我们在异步执行期间动态更新结果。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了 Future 和 Promise 之间的区别。虽然两者都用于处理异步任务，但它们在功能上有很大的不同。</p><p>如往常一样，示例的源代码可在 GitHub 上获取。</p>`,53),o=[p];function c(u,l){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-24-Difference Between a Future and a Promise in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-Difference%20Between%20a%20Future%20and%20a%20Promise%20in%20Java.html","title":"Java 中 Future 和 Promise 的区别","lang":"zh-CN","frontmatter":{"date":"2024-06-25T00:00:00.000Z","category":["Java","编程"],"tag":["Future","Promise"],"head":[["meta",{"name":"keywords","content":"Java, Future, Promise, 异步任务, 比较"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-Difference%20Between%20a%20Future%20and%20a%20Promise%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 中 Future 和 Promise 的区别"}],["meta",{"property":"og:description","content":"Java 中 Future 和 Promise 的区别 1. 引言 Future 和 Promise 是用于处理异步任务的工具，它们允许在不等待每一步完成的情况下执行操作。尽管它们的目的相同，但它们之间存在关键差异。在本教程中，我们将探讨 Future 和 Promise 之间的差异，仔细研究它们的关键特性、用例和独特特点。 2. 理解 Future ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T17:29:18.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Future"}],["meta",{"property":"article:tag","content":"Promise"}],["meta",{"property":"article:published_time","content":"2024-06-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-24T17:29:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 中 Future 和 Promise 的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-25T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-24T17:29:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 中 Future 和 Promise 的区别 1. 引言 Future 和 Promise 是用于处理异步任务的工具，它们允许在不等待每一步完成的情况下执行操作。尽管它们的目的相同，但它们之间存在关键差异。在本教程中，我们将探讨 Future 和 Promise 之间的差异，仔细研究它们的关键特性、用例和独特特点。 2. 理解 Future ..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 理解 Future","slug":"_2-理解-future","link":"#_2-理解-future","children":[{"level":3,"title":"2.1. 关键特性","slug":"_2-1-关键特性","link":"#_2-1-关键特性","children":[]},{"level":3,"title":"2.2. 使用场景","slug":"_2-2-使用场景","link":"#_2-2-使用场景","children":[]},{"level":3,"title":"2.3. 使用 Future","slug":"_2-3-使用-future","link":"#_2-3-使用-future","children":[]}]},{"level":2,"title":"3. 理解 Promise","slug":"_3-理解-promise","link":"#_3-理解-promise","children":[{"level":3,"title":"3.1. 关键特性","slug":"_3-1-关键特性","link":"#_3-1-关键特性","children":[]},{"level":3,"title":"3.2. 使用场景","slug":"_3-2-使用场景","link":"#_3-2-使用场景","children":[]},{"level":3,"title":"3.3. 使用 Promise","slug":"_3-3-使用-promise","link":"#_3-3-使用-promise","children":[]}]},{"level":2,"title":"4. 关键差异","slug":"_4-关键差异","link":"#_4-关键差异","children":[{"level":3,"title":"4.1. 控制流","slug":"_4-1-控制流","link":"#_4-1-控制流","children":[]},{"level":3,"title":"4.2. 错误处理","slug":"_4-2-错误处理","link":"#_4-2-错误处理","children":[]},{"level":3,"title":"4.3. 读写访问","slug":"_4-3-读写访问","link":"#_4-3-读写访问","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719250158000,"updatedTime":1719250158000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.55,"words":1664},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-Difference Between a Future and a Promise in Java.md","localizedDate":"2024年6月25日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>Future 和 Promise 是用于处理异步任务的工具，它们允许在不等待每一步完成的情况下执行操作。尽管它们的目的相同，但它们之间存在关键差异。在本教程中，我们将探讨 Future 和 Promise 之间的差异，仔细研究它们的关键特性、用例和独特特点。</p>\\n<h2>2. 理解 Future</h2>\\n<p>Future 充当一个容器，等待正在进行的操作的结果。开发者通常使用 Future 来检查计算的状态，在结果准备好时检索结果，或者优雅地等待操作结束。Future 经常与 Executor 框架集成，提供了一种简单高效的处理异步任务的方法。</p>","autoDesc":true}');export{k as comp,d as data};
