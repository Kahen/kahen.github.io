import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-C_fPDS1x.js";const e={},p=t(`<h1 id="completablefuture与mono-baeldung" tabindex="-1"><a class="header-anchor" href="#completablefuture与mono-baeldung"><span>CompletableFuture与Mono | Baeldung</span></a></h1><p>在这篇快速教程中，我们将学习Java中CompletableFuture和来自Project Reactor的Mono之间的差异。我们将重点讨论它们如何处理异步任务以及为完成这些任务而发生的执行过程。</p><p>让我们先从CompletableFuture开始了解。</p><h3 id="_2-completablefuture的理解" tabindex="-1"><a class="header-anchor" href="#_2-completablefuture的理解"><span>2. CompletableFuture的理解</span></a></h3><p>CompletableFuture是在Java 8中引入的，它建立在之前的Future类之上，并提供了一种异步运行代码的方式。简而言之，它改善了异步编程并简化了线程的工作。</p><p>此外，我们可以使用thenApply()、thenAccept()和thenCompose()等方法创建一系列计算，以协调我们的异步任务。</p><p>虽然CompletableFuture是异步的，意味着主线程在等待当前操作完成时会继续执行其他任务，但它并不是完全非阻塞的。一个长时间运行的操作可能会阻塞执行它的线程：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompletableFuture</span> completableFuture <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span>\\<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">interrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token string">&quot;Finished completableFuture&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面，我们使用Thread类的sleep()方法模拟一个长时间操作。如果未定义，supplyAsnc()将使用ForkJoinPool并分配一个线程来运行匿名lambda函数，这个线程会被sleep()方法阻塞。</p><p>此外，如果在CompletableFuture实例完成操作之前调用get()方法，会阻塞主线程：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
    completableFuture<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 这会阻塞主线程</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> <span class="token operator">|</span> <span class="token class-name">ExecutionException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了避免这种情况，我们可以使用CompletableFuture中的completeExceptionally()或complete()方法手动处理CompletableFuture的完成。例如，假设我们有一个函数，我们希望它在不阻塞主线程的情况下运行，然后，我们希望在它失败或成功完成时处理这个将来：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">myAsyncCall</span><span class="token punctuation">(</span><span class="token class-name">String</span> param<span class="token punctuation">,</span> <span class="token class-name">BiConsumer</span>\\<span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Throwable</span>\\<span class="token operator">&gt;</span> callback<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span>\\<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            callback<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token string">&quot;Response from API with param: &quot;</span> <span class="token operator">+</span> param<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            callback<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们使用这个函数创建一个CompletableFuture：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">CompletableFuture</span>\\<span class="token operator">&lt;</span><span class="token class-name">String</span>\\<span class="token operator">&gt;</span> <span class="token function">nonBlockingApiCall</span><span class="token punctuation">(</span><span class="token class-name">String</span> param<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">CompletableFuture</span>\\<span class="token operator">&lt;</span><span class="token class-name">String</span>\\<span class="token operator">&gt;</span> completableFuture <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CompletableFuture</span>\\<span class="token operator">&lt;</span>\\<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">myAsyncCall</span><span class="token punctuation">(</span>param<span class="token punctuation">,</span> <span class="token punctuation">(</span>result<span class="token punctuation">,</span> error<span class="token punctuation">)</span> <span class="token operator">-</span>\\<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>error <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            completableFuture<span class="token punctuation">.</span><span class="token function">completeExceptionally</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            completableFuture<span class="token punctuation">.</span><span class="token function">complete</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> completableFuture<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将看到一种替代的、更反应式的方式来处理相同的操作。</p><h3 id="_3-completablefuture与mono的比较" tabindex="-1"><a class="header-anchor" href="#_3-completablefuture与mono的比较"><span>3. CompletableFuture与Mono的比较</span></a></h3><p>&gt; 来自Project Reactor的Mono类使用反应式原则。与CompletableFuture不同，<strong>Mono旨在以更少的开销支持并发</strong>。</p><p>此外，与CompletableFuture的急切执行相比，Mono是懒惰的，这意味着我们的应用程序不会消耗资源，除非我们订阅了Mono：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Mono</span>\\<span class="token operator">&lt;</span><span class="token class-name">String</span>\\<span class="token operator">&gt;</span> reactiveMono <span class="token operator">=</span> <span class="token class-name">Mono</span><span class="token punctuation">.</span><span class="token function">fromCallable</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span>\\<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 模拟一些计算</span>
    <span class="token keyword">return</span> <span class="token string">&quot;Reactive Data&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">subscribeOn</span><span class="token punctuation">(</span><span class="token class-name">Schedulers</span><span class="token punctuation">.</span><span class="token function">boundedElastic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

reactiveMono<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token operator">::</span><span class="token function">println</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面，我们使用fromCallable()方法创建一个Mono对象，并提供阻塞操作作为供应商。然后，我们使用subscribeOn()方法将操作委托给一个单独的线程。</p><p><strong>Schedulers.boundedElastic()类似于缓存线程池，但对线程的最大数量有限制</strong>。这确保了主线程保持非阻塞。唯一强制阻塞主线程的方法是强制调用block()方法。此方法等待Mono实例的完成，无论成功与否。</p><p>然后，我们使用subscribe()来订阅Mono对象的结果，使用方法引用将println()订阅到：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>reactiveMono<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token operator">::</span><span class="token function">println</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Mono类非常灵活，并提供了一组操作符来描述性地转换和组合其他Mono对象。它还支持背压，以防止应用程序消耗所有资源。</p><h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h3><p>在这篇快速文章中，我们比较了CompletableFuture与Project Reactor中的Mono类。首先，我们描述了CompletableFuture如何运行异步任务。然后，我们展示了如果配置不正确，它可能会阻塞它正在工作的线程以及主线程。最后，我们展示了如何使用Mono以反应式的方式运行异步操作。</p><p>如常，我们可以在GitHub上找到完整的代码。</p>`,28),o=[p];function c(l,u){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","CompletableFuture vs. Mono.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/CompletableFuture%20vs.%20Mono.html","title":"CompletableFuture与Mono | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-13T00:00:00.000Z","category":["Java"],"tag":["CompletableFuture","Mono","异步编程"],"description":"CompletableFuture与Mono | Baeldung 在这篇快速教程中，我们将学习Java中CompletableFuture和来自Project Reactor的Mono之间的差异。我们将重点讨论它们如何处理异步任务以及为完成这些任务而发生的执行过程。 让我们先从CompletableFuture开始了解。 2. Completable...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/CompletableFuture%20vs.%20Mono.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"CompletableFuture与Mono | Baeldung"}],["meta",{"property":"og:description","content":"CompletableFuture与Mono | Baeldung 在这篇快速教程中，我们将学习Java中CompletableFuture和来自Project Reactor的Mono之间的差异。我们将重点讨论它们如何处理异步任务以及为完成这些任务而发生的执行过程。 让我们先从CompletableFuture开始了解。 2. Completable..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"CompletableFuture"}],["meta",{"property":"article:tag","content":"Mono"}],["meta",{"property":"article:tag","content":"异步编程"}],["meta",{"property":"article:published_time","content":"2024-06-13T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"CompletableFuture与Mono | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-13T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":3,"title":"2. CompletableFuture的理解","slug":"_2-completablefuture的理解","link":"#_2-completablefuture的理解","children":[]},{"level":3,"title":"3. CompletableFuture与Mono的比较","slug":"_3-completablefuture与mono的比较","link":"#_3-completablefuture与mono的比较","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.19,"words":956},"filePathRelative":"posts/baeldung/Archive/CompletableFuture vs. Mono.md","localizedDate":"2024年6月13日","excerpt":"\\n<p>在这篇快速教程中，我们将学习Java中CompletableFuture和来自Project Reactor的Mono之间的差异。我们将重点讨论它们如何处理异步任务以及为完成这些任务而发生的执行过程。</p>\\n<p>让我们先从CompletableFuture开始了解。</p>\\n<h3>2. CompletableFuture的理解</h3>\\n<p>CompletableFuture是在Java 8中引入的，它建立在之前的Future类之上，并提供了一种异步运行代码的方式。简而言之，它改善了异步编程并简化了线程的工作。</p>\\n<p>此外，我们可以使用thenApply()、thenAccept()和thenCompose()等方法创建一系列计算，以协调我们的异步任务。</p>","autoDesc":true}');export{k as comp,d as data};
