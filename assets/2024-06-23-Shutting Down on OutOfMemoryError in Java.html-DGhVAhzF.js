import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CRCKpUBE.js";const e={},p=t(`<h1 id="在java中遇到outofmemoryerror时的关闭操作" tabindex="-1"><a class="header-anchor" href="#在java中遇到outofmemoryerror时的关闭操作"><span>在Java中遇到OutOfMemoryError时的关闭操作</span></a></h1><p>维护应用程序的一致性状态比保持其运行更为重要，这在大多数情况下都是正确的。</p><p>在本教程中，我们将学习如何在出现_OutOfMemoryError_时显式停止应用程序。在某些情况下，如果没有正确的处理，我们可能会继续使用应用程序处于不正确的状态。</p><p>_OutOfMemoryError_是应用程序外部的错误，并且在大多数情况下是无法恢复的。错误的名字暗示应用程序没有足够的RAM，这并不完全正确。<strong>更准确地说，应用程序无法分配请求的内存量。</strong></p><p>在单线程应用程序中，情况相当简单。**如果我们遵循指南并且不捕获_OutOfMemoryError_，应用程序将终止。**这是处理此错误的预期方式。</p><p>可能有一些特定情况，捕获_OutOfMemoryError_是合理的。此外，我们可能还有一些更特定的情况，之后继续进行可能是合理的。<strong>然而，在大多数情况下，_OutOfMemoryError_意味着应该停止应用程序。</strong></p><p>多线程是大多数现代应用程序的一个组成部分。**线程遵循一个关于异常的拉斯维加斯规则：线程中发生的异常留在线程中。**这不是总是正确的，但我们可以将其视为一种普遍行为。</p><p>**因此，即使线程中最严重的错误也不会传播到主应用程序，除非我们显式地处理它们。**让我们考虑以下内存泄漏的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Runnable</span> <span class="token constant">MEMORY_LEAK</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span>\`<span class="token operator">&lt;</span><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>\` list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token function">tenMegabytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">tenMegabytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">1024</span> <span class="token operator">*</span> <span class="token number">1014</span> <span class="token operator">*</span> <span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们在单独的线程中运行此代码，应用程序不会失败：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenMemoryLeakCode_whenRunInsideThread_thenMainAppDoestFail</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Thread</span> memoryLeakThread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token constant">MEMORY_LEAK</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    memoryLeakThread<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    memoryLeakThread<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是因为导致_OutOfMemoryError_的所有数据都与线程相关联。当线程死亡时，_List_失去了垃圾回收的根，并且可以被收集。<strong>因此，最初导致_OutOfMemoryError_的数据随着线程的死亡而被移除。</strong></p><p>如果我们多次运行此代码，应用程序不会失败：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenMemoryLeakCode_whenRunSeveralTimesInsideThread_thenMainAppDoestFail</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span> memoryLeakThread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token constant">MEMORY_LEAK</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        memoryLeakThread<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        memoryLeakThread<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时，垃圾收集日志显示了以下情况：</p><p>**在每次循环中，我们耗尽了6 GB的可用RAM，杀死线程，运行垃圾收集，移除数据，并继续。**我们得到了这种堆过山车，它没有做任何合理的工作，但应用程序不会失败。</p><p>同时，我们可以看到日志中的错误。在某些情况下，忽略_OutOfMemoryError_是合理的。我们不想因为一个错误或用户利用而杀死整个Web服务器。</p><p>此外，实际应用程序中的行为可能会有所不同。线程之间可能存在互连和额外的共享资源。因此，任何线程都可能抛出_OutOfMemoryError_。这是一种异步异常；它们不绑定到特定的行。<strong>然而，如果_OutOfMemoryError_没有发生在主应用程序线程中，应用程序仍然会运行。</strong></p><p>在某些应用程序中，线程产生关键工作，应该可靠地执行。最好是停止一切，查看并解决问题。</p><p>想象一下，我们正在处理一个包含历史银行数据的大型XML文件。我们将数据块加载到内存中，进行计算，并将结果写入磁盘。<strong>示例可能更加复杂，但主要思想是，有时我们严重依赖线程中的事务性和正确性。</strong></p><p>幸运的是，JVM将_OutOfMemoryError_视为一个特殊情况，我们可以使用以下参数在应用程序中退出或崩溃JVM：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token operator">-</span><span class="token constant">XX</span><span class="token operator">:</span><span class="token operator">+</span><span class="token class-name">ExitOnOutOfMemoryError</span>
<span class="token operator">-</span><span class="token constant">XX</span><span class="token operator">:</span><span class="token operator">+</span><span class="token class-name">CrashOnOutOfMemoryError</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们使用这些参数中的任何一个运行我们的示例，应用程序将被停止。这将允许我们调查问题并检查发生了什么。</p><p><strong>这些选项之间的差异在于_-XX:+CrashOnOutOfMemoryError_会产生崩溃转储：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#</span>
<span class="token comment"># A fatal error has been detected by the Java Runtime Environment:</span>
<span class="token comment">#</span>
<span class="token comment"># Internal Error (debug.cpp:368), pid=69477, tid=39939</span>
<span class="token comment"># fatal error: OutOfMemory encountered: Java heap space</span>
<span class="token comment">#</span>
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它包含我们可以用来分析的信息。为了使这个过程更容易，我们也可以使堆转储在_OutOfMemoryError_时自动进行。</p><p>我们还可以为多线程应用程序制作线程转储。它没有专门的参数。然而，我们可以使用脚本，并使用_OutOfMemoryError_触发它。</p><p><strong>如果我们想以类似的方式处理其他异常，我们必须使用_Futures_确保线程按预期完成它们的工作。将异常包装成_OutOfMemoryError_以避免实现正确的线程间通信是一个可怕的想法：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenBadExample_whenUseItInProductionCode_thenQuestionedByEmployerAndProbablyFired</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Thread</span> npeThread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span>\` <span class="token punctuation">{</span>
        <span class="token class-name">String</span> nullString <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            nullString<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">NullPointerException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">OutOfMemoryError</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    npeThread<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    npeThread<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们讨论了_OutOfMemoryError_通常会将应用程序置于不正确的状态。尽管在某些情况下我们可以从中恢复，但我们应该考虑总体上杀死并重新启动应用程序。</p><p>虽然单线程应用程序不需要对_OutOfMemoryError_进行任何额外处理。<strong>多线程代码需要额外的分析和配置，以确保应用程序将退出或崩溃。</strong></p><p>像往常一样，所有代码都可以在GitHub上找到。</p>`,33),o=[p];function c(r,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-23-Shutting Down on OutOfMemoryError in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-Shutting%20Down%20on%20OutOfMemoryError%20in%20Java.html","title":"在Java中遇到OutOfMemoryError时的关闭操作","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["Java","内存管理"],"tag":["OutOfMemoryError","多线程"],"head":[["meta",{"name":"keywords","content":"Java, OutOfMemoryError, 内存管理, 多线程, JVM"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-Shutting%20Down%20on%20OutOfMemoryError%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中遇到OutOfMemoryError时的关闭操作"}],["meta",{"property":"og:description","content":"在Java中遇到OutOfMemoryError时的关闭操作 维护应用程序的一致性状态比保持其运行更为重要，这在大多数情况下都是正确的。 在本教程中，我们将学习如何在出现_OutOfMemoryError_时显式停止应用程序。在某些情况下，如果没有正确的处理，我们可能会继续使用应用程序处于不正确的状态。 _OutOfMemoryError_是应用程序外..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T04:32:21.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"OutOfMemoryError"}],["meta",{"property":"article:tag","content":"多线程"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T04:32:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中遇到OutOfMemoryError时的关闭操作\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T04:32:21.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中遇到OutOfMemoryError时的关闭操作 维护应用程序的一致性状态比保持其运行更为重要，这在大多数情况下都是正确的。 在本教程中，我们将学习如何在出现_OutOfMemoryError_时显式停止应用程序。在某些情况下，如果没有正确的处理，我们可能会继续使用应用程序处于不正确的状态。 _OutOfMemoryError_是应用程序外..."},"headers":[{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1719117141000,"updatedTime":1719117141000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.66,"words":1398},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-Shutting Down on OutOfMemoryError in Java.md","localizedDate":"2024年6月23日","excerpt":"\\n<p>维护应用程序的一致性状态比保持其运行更为重要，这在大多数情况下都是正确的。</p>\\n<p>在本教程中，我们将学习如何在出现_OutOfMemoryError_时显式停止应用程序。在某些情况下，如果没有正确的处理，我们可能会继续使用应用程序处于不正确的状态。</p>\\n<p>_OutOfMemoryError_是应用程序外部的错误，并且在大多数情况下是无法恢复的。错误的名字暗示应用程序没有足够的RAM，这并不完全正确。<strong>更准确地说，应用程序无法分配请求的内存量。</strong></p>\\n<p>在单线程应用程序中，情况相当简单。**如果我们遵循指南并且不捕获_OutOfMemoryError_，应用程序将终止。**这是处理此错误的预期方式。</p>","autoDesc":true}');export{d as comp,k as data};
