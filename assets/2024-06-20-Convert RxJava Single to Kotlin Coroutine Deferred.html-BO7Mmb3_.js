import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-FPWt52u1.js";const e={},o=t('<h1 id="将-rxjava-的-single-转换为-kotlin-协程的-deferred" tabindex="-1"><a class="header-anchor" href="#将-rxjava-的-single-转换为-kotlin-协程的-deferred"><span>将 RxJava 的 Single 转换为 Kotlin 协程的 Deferred</span></a></h1><ol><li>概述</li></ol><p>在 RxJava 中的 <strong>Single</strong> 和 Kotlin 协程中的 <strong>Deferred</strong> 是执行异步操作的机制。它们允许我们在不阻塞主线程的情况下执行耗时任务。</p><p>我们可能已经在项目中使用了 <strong>Single</strong>，但希望迁移到 <strong>Deferred</strong> 作为替代解决方案。转换是实现这一目标的一种方式，而无需进行完整的重写。</p><p>在本文中，我们将尝试以多种方式将 <strong>Single</strong> 转换为 <strong>Deferred</strong>。</p><ol start="2"><li>比较 Single 和 Deferred</li></ol><p><strong>Single</strong> 是 RxJava 提供的抽象之一，它表示一个只会生成一个项目或一个错误的 <strong>Observable</strong>。</p><p>当我们只想从操作中接收一个结果，例如 API 调用或从数据库中读取数据时，我们可以使用 <strong>Single</strong>。</p><p><strong>Deferred</strong> 是 Kotlin 协程中使用的数据类型，用于表示将来可用的结果。</p><p>同时，我们还可以使用 <strong>Deferred</strong> 来处理可能需要很长时间的操作，例如网络或 API 调用，这些操作的结果将在延迟一段时间后提供。</p><p>从概念上讲，<strong>Deferred</strong> 和 <strong>Single</strong> 具有相似的目的——即表示可能需要长时间运行的操作的单一结果：</p><table><thead><tr><th>特性</th><th><strong>Single</strong> (RxJava)</th><th><strong>Deferred</strong> (Kotlin 协程)</th></tr></thead><tbody><tr><td>目的</td><td>表示一个包含一个项目或错误的 <strong>Observable</strong></td><td>表示将来可用的结果</td></tr><tr><td>使用案例</td><td>从操作中接收一个结果</td><td>处理可能需要长时间运行的操作</td></tr><tr><td>结果处理</td><td>一个项目或错误</td><td>结果在时间延迟后可用</td></tr><tr><td>错误处理</td><td>通过 <strong>onError()_</strong> 处理错误</td><td>使用 <strong>try/catch</strong> 或 <strong>await()</strong> 捕获错误</td></tr><tr><td>获取结果</td><td><strong>subscribe(), blockingGet()</strong></td><td><strong>await()</strong></td></tr></tbody></table><p>上表简要概述了 <strong>Single</strong> 和 <strong>Deferred</strong> 之间的比较。</p><p>为了演示目的，我们有以下形式的数据列表：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">data</span> <span class="token keyword">class</span> <span class="token function">Product</span><span class="token punctuation">(</span><span class="token keyword">val</span> id<span class="token operator">:</span> Int<span class="token punctuation">,</span> <span class="token keyword">val</span> name<span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">val</span> price<span class="token operator">:</span> Double<span class="token punctuation">)</span>\n\n<span class="token keyword">private</span> <span class="token keyword">val</span> allProducts <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span>\n  <span class="token function">Product</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Samsung&quot;</span></span><span class="token punctuation">,</span> <span class="token number">1200.0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token function">Product</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Oppo&quot;</span></span><span class="token punctuation">,</span> <span class="token number">800.0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token function">Product</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Nokia&quot;</span></span><span class="token punctuation">,</span> <span class="token number">450.0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token function">Product</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Lenovo&quot;</span></span><span class="token punctuation">,</span> <span class="token number">550.0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token function">Product</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;ASUS&quot;</span></span><span class="token punctuation">,</span> <span class="token number">400.0</span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们创建一个函数，该函数产生一个经过价格过滤和排序的 <strong>Single`&lt;List&lt;Product&gt;``&gt;</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">getFilteredProducts</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Single`\\<span class="token operator">&lt;</span>List\\<span class="token operator">&lt;</span>Product\\<span class="token operator">&gt;</span>``<span class="token operator">&gt;</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> Single<span class="token punctuation">.</span><span class="token function">just</span><span class="token punctuation">(</span>\n      allProducts\n    <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> products <span class="token operator">-&gt;</span>\n      products<span class="token punctuation">.</span><span class="token function">sortedBy</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span>price <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">filter</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span>price <span class="token operator">&gt;</span> <span class="token number">500</span> <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">subscribeOn</span><span class="token punctuation">(</span>Schedulers<span class="token punctuation">.</span><span class="token function">io</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们还准备一个稍后可以使用的函数，以验证结果是否符合我们的期望：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">private</span> <span class="token keyword">suspend</span> <span class="token keyword">fun</span> ````````\\<span class="token operator">&lt;</span>T\\<span class="token operator">&gt;</span>```````` Deferred````````\\<span class="token operator">&lt;</span>T\\<span class="token operator">&gt;</span>````````<span class="token punctuation">.</span><span class="token function">assertOver500AndSorted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> List\\<span class="token operator">&lt;</span><span class="token operator">*</span>\\<span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span>\n      <span class="token function">Product</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Lenovo&quot;</span></span><span class="token punctuation">,</span> <span class="token number">550.0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token function">Product</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Oppo&quot;</span></span><span class="token punctuation">,</span> <span class="token number">800.0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token function">Product</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Samsung&quot;</span></span><span class="token punctuation">,</span> <span class="token number">1200.0</span><span class="token punctuation">)</span>\n    <span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个函数将验证结果确实是一个代表过滤过的 <strong>List&lt;Product&gt;</strong> 的 <strong>Deferred</strong> 对象：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>deferred<span class="token punctuation">.</span><span class="token function">assertOver500AndSorted</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，我们将以几种不同的方式从 <strong>Single</strong> 转换为 <strong>Deferred</strong>。让我们开始实验！</p><h3 id="_3-1-使用-async-和-blockingget" tabindex="-1"><a class="header-anchor" href="#_3-1-使用-async-和-blockingget"><span>3.1. 使用 async() 和 blockingGet()</span></a></h3><p><strong>async</strong> 函数用于异步启动协程的执行。当我们使用 <strong>async</strong> 函数时，将启动一个协程来执行给定任务，并返回表示任务结果的 <strong>Deferred</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> futureResult<span class="token operator">:</span> Deferred````````\\<span class="token operator">&lt;</span>T\\<span class="token operator">&gt;</span>```````` <span class="token operator">=</span> async <span class="token punctuation">{</span> <span class="token comment">/* 执行某些操作 */</span> <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这种情况下，我们使用 RxJava 的 <strong>blockingGet()</strong> 方法，该方法以阻塞的方式等待当前 <strong>Single</strong> 发出一个成功值（返回）或一个异常（传播）。</p><p>因此，我们可以使用这种方法将 <strong>Single</strong> 转换为 <strong>Deferred</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> deferred <span class="token operator">=</span> async <span class="token punctuation">{</span> <span class="token function">getFilteredProducts</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">blockingGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>getFilteredProducts().blockingGet()</strong> 在协程内被调用，并将阻塞协程直到 <strong>getFilteredProducts()</strong> 完成。</p><h3 id="_3-2-使用-completabledeferred" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-completabledeferred"><span>3.2. 使用 CompletableDeferred</span></a></h3><p><strong>CompletableDeferred</strong> 是 <strong>Deferred</strong> 的一个实例，允许我们在稍后手动设置结果。我们可以使用 <strong>complete()</strong> 或 <strong>completeExceptionally()</strong> 方法完成 <strong>CompletableDeferred</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">fun</span> <span class="token function">complete</span><span class="token punctuation">(</span>value<span class="token operator">:</span> T<span class="token punctuation">)</span><span class="token operator">:</span> kotlin<span class="token punctuation">.</span>Boolean\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们还可以使用 <strong>completeExceptionally()</strong> 方法来处理应该返回一个带有异常的失败值的操作：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">fun</span> <span class="token function">completeExceptionally</span><span class="token punctuation">(</span>exception<span class="token operator">:</span> kotlin<span class="token punctuation">.</span>Throwable<span class="token punctuation">)</span><span class="token operator">:</span> kotlin<span class="token punctuation">.</span>Boolean\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因此，我们将使用 <strong>complete()</strong> 函数将 <strong>Single</strong> 的 <strong>subscribe()</strong> 操作的结果发送出去，然后存储在 <strong>CompletableDeferred</strong> 中：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> deferred <span class="token operator">=</span> CompletableDeferred````````\\<span class="token operator">&lt;</span>T\\<span class="token operator">&gt;</span>````````<span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token function">getFilteredProducts</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span>deferred<span class="token operator">::</span>complete<span class="token punctuation">,</span> deferred<span class="token operator">::</span>completeExceptionally<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>getFilteredProducts().subscribe(…)</strong> 订阅了由 <strong>getFilteredProducts()</strong> 返回的 observable，并有两个回调。</p><p><strong>deferred::complete</strong> 在 observable 发出一个值时被调用，使用该值完成 <strong>CompletableDeferred</strong>。同时，<strong>deferred::completeExceptionally</strong> 在 observable 发出一个错误时被调用，使用该异常完成 <strong>CompletableDeferred</strong>。</p><h3 id="_3-3-使用-suspendcoroutine-或-suspendcancellablecoroutine" tabindex="-1"><a class="header-anchor" href="#_3-3-使用-suspendcoroutine-或-suspendcancellablecoroutine"><span>3.3. 使用 suspendCoroutine 或 suspendCancellableCoroutine</span></a></h3><p><strong>suspendCoroutine</strong> 是 Kotlin 协程中的一个函数，用于挂起协程的执行并等待 lambda 的结果：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">suspend</span> <span class="token keyword">inline</span> <span class="token keyword">fun</span> ````````\\<span class="token operator">&lt;</span>T\\<span class="token operator">&gt;</span>```````` <span class="token function">suspendCoroutine</span><span class="token punctuation">(</span>\n  <span class="token keyword">crossinline</span> block<span class="token operator">:</span> <span class="token punctuation">(</span>Continuation````````\\<span class="token operator">&lt;</span>T\\<span class="token operator">&gt;</span>````````<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> kotlin<span class="token punctuation">.</span>Unit\n<span class="token punctuation">)</span><span class="token operator">:</span> T\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而 <strong>suspendCancellableCoroutine</strong> 就像 <strong>suspendCoroutine</strong>，但增加了在等待时取消协程的能力。这使用 <strong>continuation.cancel()</strong> 来取消例程：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">public</span> <span class="token keyword">suspend</span> <span class="token keyword">inline</span> <span class="token keyword">fun</span> ````````\\<span class="token operator">&lt;</span>T\\<span class="token operator">&gt;</span>```````` <span class="token function">suspendCancellableCoroutine</span><span class="token punctuation">(</span>\n  <span class="token keyword">crossinline</span> block<span class="token operator">:</span> <span class="token punctuation">(</span>CancellableContinuation````````\\<span class="token operator">&lt;</span>T\\<span class="token operator">&gt;</span>````````<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> kotlin<span class="token punctuation">.</span>Unit\n<span class="token punctuation">)</span><span class="token operator">:</span> T\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们使用 <strong>suspendCoroutine</strong> 创建 <strong>Deferred</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> deferred <span class="token operator">=</span> async <span class="token punctuation">{</span>\n  suspendCoroutine <span class="token punctuation">{</span> continuation <span class="token operator">-&gt;</span>\n    <span class="token function">getFilteredProducts</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span>continuation<span class="token operator">::</span>resume<span class="token punctuation">,</span> continuation<span class="token operator">::</span>resumeWithException<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当 <strong>getFilteredProducts()</strong> 发出一个值时，<strong>continuation::resume</strong> 将被调用，使用该值恢复协程。</p><p>但是，如果 <strong>getFilteredProducts()</strong> 发出一个错误，<strong>continuation::resumeWithException</strong> 将被调用，使用该异常恢复协程。</p><h3 id="_3-4-使用-kotlinx-coroutines-rx3" tabindex="-1"><a class="header-anchor" href="#_3-4-使用-kotlinx-coroutines-rx3"><span>3.4. 使用 Kotlinx Coroutines Rx3</span></a></h3><p>Kotlinx Coroutines Rx3 是 Kotlin 协程生态系统的一部分，它提供了 Kotlin 协程和 RxJava 3 之间的强大集成。在我们有 RxJava 和协程操作的组合时，Kotlin Coroutines Rx3 允许我们同时使用它们。</p><p>但是，由于这还不是默认 Kotlin 协程的一部分，我们必须首先将其声明为依赖项：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>\\<span class="token operator">&lt;</span>dependency\\<span class="token operator">&gt;</span>\n    \\<span class="token operator">&lt;</span>groupId\\<span class="token operator">&gt;</span>org<span class="token punctuation">.</span>jetbrains<span class="token punctuation">.</span>kotlinx\\<span class="token operator">&lt;</span><span class="token operator">/</span>groupId\\<span class="token operator">&gt;</span>\n    \\<span class="token operator">&lt;</span>artifactId\\<span class="token operator">&gt;</span>kotlinx<span class="token operator">-</span>coroutines<span class="token operator">-</span>rx3\\<span class="token operator">&lt;</span><span class="token operator">/</span>artifactId\\<span class="token operator">&gt;</span>\n    \\<span class="token operator">&lt;</span>version\\<span class="token operator">&gt;</span><span class="token number">1.8</span><span class="token punctuation">.</span><span class="token number">0</span>\\<span class="token operator">&lt;</span><span class="token operator">/</span>version\\<span class="token operator">&gt;</span>\n\\<span class="token operator">&lt;</span><span class="token operator">/</span>dependency\\<span class="token operator">&gt;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种集成允许我们在 Kotlin 核心例程中使用 RxJava 3 操作符和 flows，以及在 RxJava 3 数据类型（如 Completable、Single 或 Observable）与 Kotlin 核心数据类型（如 Deferred 或 Flow）之间进行转换。</p><p>Kotlinx Coroutines Rx3 有一个 <strong>await()</strong> 函数，用于等待 Single 值响应的完成，而不会阻塞线程。如果响应中出现错误，它将返回结果值或抛出异常：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">suspend</span> <span class="token keyword">fun</span> \\<span class="token operator">&lt;</span>T\\<span class="token operator">&gt;</span> SingleSource\\<span class="token operator">&lt;</span>T &amp; Any\\<span class="token operator">&gt;</span><span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> T\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因此，我们使用 <strong>Single.await()</strong> 创建 <strong>Deferred</strong> 并用 <strong>async</strong> 包装它。</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> deferred <span class="token operator">=</span> async <span class="token punctuation">{</span> <span class="token function">getFilteredProducts</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以在 <strong>Single</strong> 协程上调用 <strong>await()</strong>。如果成功，<strong>await()</strong> 将返回从 <strong>Single</strong> 发出的价值。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们讨论了将 <strong>Single</strong> 转换为 <strong>Deferred</strong> 的多种方式。</p><p>我们可以使用 <strong>async() 和 blockingGet()</strong> 进行简单转换。</p><p>如果我们需要解析或重定向异常，那么我们可以使用方法 <strong>CompletableDeferred</strong>。</p><p><strong>suspendCoroutine</strong> 函数是我们需要一个可挂起的函数而不是回调风格函数的选项。另一个选项是使用</p>',62),p=[o];function l(r,c){return a(),s("div",null,p)}const d=n(e,[["render",l],["__file","2024-06-20-Convert RxJava Single to Kotlin Coroutine Deferred.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Convert%20RxJava%20Single%20to%20Kotlin%20Coroutine%20Deferred.html","title":"将 RxJava 的 Single 转换为 Kotlin 协程的 Deferred","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Kotlin","RxJava"],"tag":["Kotlin Coroutine","RxJava Single","Deferred"],"head":[["meta",{"name":"keywords","content":"Kotlin, RxJava, Coroutine, Single, Deferred"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Convert%20RxJava%20Single%20to%20Kotlin%20Coroutine%20Deferred.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"将 RxJava 的 Single 转换为 Kotlin 协程的 Deferred"}],["meta",{"property":"og:description","content":"将 RxJava 的 Single 转换为 Kotlin 协程的 Deferred 概述 在 RxJava 中的 Single 和 Kotlin 协程中的 Deferred 是执行异步操作的机制。它们允许我们在不阻塞主线程的情况下执行耗时任务。 我们可能已经在项目中使用了 Single，但希望迁移到 Deferred 作为替代解决方案。转换是实现这一目..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin Coroutine"}],["meta",{"property":"article:tag","content":"RxJava Single"}],["meta",{"property":"article:tag","content":"Deferred"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"将 RxJava 的 Single 转换为 Kotlin 协程的 Deferred\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"将 RxJava 的 Single 转换为 Kotlin 协程的 Deferred 概述 在 RxJava 中的 Single 和 Kotlin 协程中的 Deferred 是执行异步操作的机制。它们允许我们在不阻塞主线程的情况下执行耗时任务。 我们可能已经在项目中使用了 Single，但希望迁移到 Deferred 作为替代解决方案。转换是实现这一目..."},"headers":[{"level":3,"title":"3.1. 使用 async() 和 blockingGet()","slug":"_3-1-使用-async-和-blockingget","link":"#_3-1-使用-async-和-blockingget","children":[]},{"level":3,"title":"3.2. 使用 CompletableDeferred","slug":"_3-2-使用-completabledeferred","link":"#_3-2-使用-completabledeferred","children":[]},{"level":3,"title":"3.3. 使用 suspendCoroutine 或 suspendCancellableCoroutine","slug":"_3-3-使用-suspendcoroutine-或-suspendcancellablecoroutine","link":"#_3-3-使用-suspendcoroutine-或-suspendcancellablecoroutine","children":[]},{"level":3,"title":"3.4. 使用 Kotlinx Coroutines Rx3","slug":"_3-4-使用-kotlinx-coroutines-rx3","link":"#_3-4-使用-kotlinx-coroutines-rx3","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":5.17,"words":1552},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Convert RxJava Single to Kotlin Coroutine Deferred.md","localizedDate":"2024年6月20日","excerpt":"\\n<ol>\\n<li>概述</li>\\n</ol>\\n<p>在 RxJava 中的 <strong>Single</strong> 和 Kotlin 协程中的 <strong>Deferred</strong> 是执行异步操作的机制。它们允许我们在不阻塞主线程的情况下执行耗时任务。</p>\\n<p>我们可能已经在项目中使用了 <strong>Single</strong>，但希望迁移到 <strong>Deferred</strong> 作为替代解决方案。转换是实现这一目标的一种方式，而无需进行完整的重写。</p>\\n<p>在本文中，我们将尝试以多种方式将 <strong>Single</strong> 转换为 <strong>Deferred</strong>。</p>","autoDesc":true}');export{d as comp,k as data};
