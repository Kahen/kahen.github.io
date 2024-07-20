import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-DfO5Xg_k.js";const t={},p=e(`<hr><h1 id="java-中的-volatile-与原子变量" tabindex="-1"><a class="header-anchor" href="#java-中的-volatile-与原子变量"><span>Java 中的 volatile 与原子变量</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p><strong>在本教程中，我们将学习 <em>volatile</em> 关键字和原子类之间的区别以及它们解决的问题。</strong> 首先，需要了解 Java 如何处理线程之间的通信以及可能出现的意外问题。</p><p>线程安全是一个关键主题，它提供了对多线程应用程序内部工作的洞察。我们还将讨论竞态条件，但不会深入这个话题。</p><h2 id="_2-并发问题" tabindex="-1"><a class="header-anchor" href="#_2-并发问题"><span>2. 并发问题</span></a></h2><p>让我们通过一个简单的例子来了解原子类和 <em>volatile</em> 关键字间的区别。假设我们正在尝试创建一个在多线程环境中工作的计数器。</p><p>理论上，任何应用程序线程都可以增加这个计数器的值。让我们以一种天真的方法开始实现它，并检查会出现什么问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UnsafeCounter</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> counter<span class="token punctuation">;</span>

    <span class="token keyword">int</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> counter<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">void</span> <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        counter<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个完全工作的计数器，但不幸的是，它只适用于单线程应用程序。<strong>这种方法在多线程环境中会遭受可见性和同步问题。</strong> 在大型应用程序中，这可能会增加跟踪错误和甚至破坏用户数据的难度。</p><h2 id="_3-可见性问题" tabindex="-1"><a class="header-anchor" href="#_3-可见性问题"><span>3. 可见性问题</span></a></h2><p>在多线程应用程序中工作时，可见性问题是一个问题之一。可见性问题与 Java 内存模型密切相关。</p><p>在多线程应用程序中，每个线程都有自己的共享资源的缓存版本，并根据事件或计划从主内存中更新值。</p><p><strong>线程缓存和主内存的值可能不同。</strong> 因此，即使一个线程在主内存中更新了值，这些更改也不会立即对其他线程可见。这就是所谓的可见性问题。</p><p><strong><em>volatile</em> 关键字通过绕过本地线程的缓存来帮助我们解决这个问题。</strong> 因此，<em>volatile</em> 变量对所有线程都是可见的，所有这些线程都会看到相同的值。因此，当一个线程更新值时，所有线程都会看到新值。我们可以将其视为低级别的观察者模式，并可以重写之前的实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UnsafeVolatileCounter</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token keyword">int</span> counter<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> counter<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        counter<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述示例改进了计数器并解决了可见性问题。然而，我们仍然有一个同步问题，我们的计数器在多线程环境中不会正确工作。</p><h2 id="_4-同步问题" tabindex="-1"><a class="header-anchor" href="#_4-同步问题"><span>4. 同步问题</span></a></h2><p><strong>尽管 <em>volatile</em> 关键字帮助我们解决了可见性问题，但我们仍然面临另一个问题。</strong> 在我们的增加示例中，我们对变量 <em>count</em> 执行了两个操作。首先，我们读取这个变量，然后为其分配一个新值。** 这意味着增加操作不是原子的。**</p><p><strong>我们在这里面临的是一个竞态条件。</strong> 每个线程应该首先读取值，增加它，然后将其写回。当多个线程开始处理值，并在另一个线程写入之前读取它时，问题就会发生。</p><p>这样，一个线程可能会覆盖另一个线程写入的结果。<em>synchronized</em> 关键字可以解决这个问题。然而，这种方法可能会创建瓶颈，并且不是解决这个问题的最优雅的方法。</p><h2 id="_5-原子值" tabindex="-1"><a class="header-anchor" href="#_5-原子值"><span>5. 原子值</span></a></h2><p>原子值提供了一种更好、更直观的方式来处理这个问题。它们的接口允许我们在没有同步问题的情况下与值进行交互和更新。</p><p><strong>在内部，原子类确保在这种情况下，增加将是一个原子操作。</strong> 因此，我们可以使用它来创建一个线程安全的实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SafeAtomicCounter</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">AtomicInteger</span> counter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicInteger</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> counter<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        counter<span class="token punctuation">.</span><span class="token function">incrementAndGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们最终的实现是线程安全的，并且可以在多线程应用程序中使用。</strong> 它与我们的第一个示例没有显著不同，只有通过使用原子类，我们才能解决多线程代码中的可见性和同步问题。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p><strong>在本文中，我们了解到在多线程环境中工作时，我们必须非常小心。</strong> 错误和问题可能很难追踪，可能在调试时不会出现。这就是为什么了解 Java 如何处理这些情况至关重要。</p><p><strong><em>volatile</em> 关键字可以帮助解决可见性问题，并解决本质上是原子操作的问题。</strong> 设置一个标志是 <em>volatile</em> 关键字可能有帮助的一个例子。</p><p>原子变量有助于处理像增加-减少这样的非原子操作，或者任何需要在分配新值之前读取值的操作。<strong>原子值是一种简单方便的方法，可以解决我们代码中的同步问题。</strong> 如往常一样，示例的源代码可以在 GitHub 上找到。</p>`,30),o=[p];function l(i,c){return s(),a("div",null,o)}const d=n(t,[["render",l],["__file","2024-07-16-Volatile vs. Atomic Variables in Java.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-Volatile%20vs.%20Atomic%20Variables%20in%20Java.html","title":"Java 中的 volatile 与原子变量","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Concurrency"],"tag":["volatile","atomic"],"head":[["meta",{"name":"keywords","content":"Java, volatile, atomic, multithreading, concurrency"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-Volatile%20vs.%20Atomic%20Variables%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 中的 volatile 与原子变量"}],["meta",{"property":"og:description","content":"Java 中的 volatile 与原子变量 1. 概述 在本教程中，我们将学习 volatile 关键字和原子类之间的区别以及它们解决的问题。 首先，需要了解 Java 如何处理线程之间的通信以及可能出现的意外问题。 线程安全是一个关键主题，它提供了对多线程应用程序内部工作的洞察。我们还将讨论竞态条件，但不会深入这个话题。 2. 并发问题 让我们通过..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T17:06:24.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"volatile"}],["meta",{"property":"article:tag","content":"atomic"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T17:06:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 中的 volatile 与原子变量\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T17:06:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 中的 volatile 与原子变量 1. 概述 在本教程中，我们将学习 volatile 关键字和原子类之间的区别以及它们解决的问题。 首先，需要了解 Java 如何处理线程之间的通信以及可能出现的意外问题。 线程安全是一个关键主题，它提供了对多线程应用程序内部工作的洞察。我们还将讨论竞态条件，但不会深入这个话题。 2. 并发问题 让我们通过..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 并发问题","slug":"_2-并发问题","link":"#_2-并发问题","children":[]},{"level":2,"title":"3. 可见性问题","slug":"_3-可见性问题","link":"#_3-可见性问题","children":[]},{"level":2,"title":"4. 同步问题","slug":"_4-同步问题","link":"#_4-同步问题","children":[]},{"level":2,"title":"5. 原子值","slug":"_5-原子值","link":"#_5-原子值","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721149584000,"updatedTime":1721149584000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.27,"words":1282},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-Volatile vs. Atomic Variables in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java 中的 volatile 与原子变量</h1>\\n<h2>1. 概述</h2>\\n<p><strong>在本教程中，我们将学习 <em>volatile</em> 关键字和原子类之间的区别以及它们解决的问题。</strong> 首先，需要了解 Java 如何处理线程之间的通信以及可能出现的意外问题。</p>\\n<p>线程安全是一个关键主题，它提供了对多线程应用程序内部工作的洞察。我们还将讨论竞态条件，但不会深入这个话题。</p>\\n<h2>2. 并发问题</h2>\\n<p>让我们通过一个简单的例子来了解原子类和 <em>volatile</em> 关键字间的区别。假设我们正在尝试创建一个在多线程环境中工作的计数器。</p>","autoDesc":true}');export{d as comp,v as data};
