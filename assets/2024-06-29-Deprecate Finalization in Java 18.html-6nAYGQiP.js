import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-C3EhKTFl.js";const t={},p=e(`<h1 id="java-18-中废弃-finalization-的讨论" tabindex="-1"><a class="header-anchor" href="#java-18-中废弃-finalization-的讨论"><span>Java 18 中废弃 Finalization 的讨论</span></a></h1><p>在这篇教程中，我们将讨论 Java 尝试通过 Java 18 版本中的 JEP 421 废弃 <code>Object</code> 最终化的原因。我们还将讨论最终化的潜在替代品和更好的替代方案。</p><h3 id="_2-1-资源泄漏" tabindex="-1"><a class="header-anchor" href="#_2-1-资源泄漏"><span>2.1. 资源泄漏</span></a></h3><p>JVM 配备了垃圾收集（GC）机制，用于回收应用程序不再使用的对象的内存，或者没有更多引用指向该对象。然而，一些对象引用使用并代表其他底层资源，如操作系统级别的资源、本地内存块和打开的文件描述符。这些对象在关闭时应调用 <code>close()</code> 方法，以将底层资源释放回操作系统。</p><p>如果 GC 在对象有机会调用 <code>close()</code> 之前过早地清理了对象，操作系统就会认为该对象仍在使用中。这就是资源泄漏。</p><p>一个非常常见的例子是，当我们尝试读取文件并将代码包装在 try-catch 块中以处理异常时。我们将资源的优雅关闭包装在传统的 finally 块中。这不是一个完全可靠的解决方案，因为即使在 finally 块中也可能发生异常，导致资源泄漏：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">copyFileOperation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        fis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token string">&quot;input.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 对文件执行操作</span>

        fis<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>fis <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            fis<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-对象的-finalize-方法" tabindex="-1"><a class="header-anchor" href="#_2-2-对象的-finalize-方法"><span>2.2. 对象的 <code>finalize()</code> 方法</span></a></h3><p>Java 引入了最终化的概念来处理资源泄漏问题。<code>finalize()</code> 方法，也称为终结器，是 <code>Object</code> 类中的一个受保护的 void 方法，其目的是释放对象使用的任何资源。我们在类中重写该方法以执行资源关闭，以帮助 GC：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyFinalizableResourceClass</span> <span class="token punctuation">{</span>
    <span class="token class-name">FileInputStream</span> fis <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">MyFinalizableResourceClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>fis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token string">&quot;file.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getByteLength</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>fis<span class="token punctuation">.</span><span class="token function">readAllBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">finalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>
        fis<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当对象符合垃圾收集的条件时，如果对象被重写了 <code>finalize()</code> 方法，垃圾收集器将调用对象的 <code>finalize()</code> 方法。尽管在类中拥有 <code>finalize()</code> 方法来执行所有资源清理工作看起来是处理资源泄漏的好方法，但自 Java 9 以来，最终化本身已经被声明为废弃。最终化本身有几个根本性的缺陷。</p><h2 id="_3-最终化的缺陷" tabindex="-1"><a class="header-anchor" href="#_3-最终化的缺陷"><span>3. 最终化的缺陷</span></a></h2><h3 id="_3-1-不可预测的执行" tabindex="-1"><a class="header-anchor" href="#_3-1-不可预测的执行"><span>3.1. 不可预测的执行</span></a></h3><p>即使对象符合垃圾收集的条件，也没有保证对象的 <code>finalize()</code> 一定会被调用。同样，GC 在对象符合垃圾收集条件后调用对象的终结器可能会有不可预测的延迟。</p><p>终结器由 GC 计划运行，然而，垃圾收集是基于包括系统当前内存需求在内的参数进行的。如果因为有足够的空闲内存而暂停 GC，许多对象将在堆上等待它们的终结器被调用。这可能导致资源短缺。</p><h3 id="_3-2-无约束的终结器代码" tabindex="-1"><a class="header-anchor" href="#_3-2-无约束的终结器代码"><span>3.2. 无约束的终结器代码</span></a></h3><p>尽管 <code>finalize()</code> 方法的意图已经定义，但代码仍然是开发者可以采取的任何行动。这种缺乏控制可能会破坏终结器的目的。这也引入了对应用程序的安全威胁。恶意代码可以坐在终结器中，导致意外错误或以各种方式导致应用程序行为异常。</p><p>如果我们完全省略终结器，子类仍然可以为自己定义 <code>finalize()</code> 并访问格式不正确或反序列化的对象。子类也可能选择覆盖父类的终结器并注入恶意代码。</p><h3 id="_3-3-性能开销" tabindex="-1"><a class="header-anchor" href="#_3-3-性能开销"><span>3.3. 性能开销</span></a></h3><p>类中重写的 <code>finalize()</code> 增加了性能惩罚，因为 GC 需要跟踪所有具有终结器的类。GC 还需要在此类对象的生命周期中执行额外的步骤，特别是在对象创建和最终化期间。</p><p>有一些以吞吐量为导向的垃圾收集器，通过最小化垃圾收集的总体暂停时间来表现最佳。对于这样的垃圾收集器来说，终结器是一个劣势，因为它增加了暂停时间。</p><p>此外，<code>finalize()</code> 方法始终是启用的，即使不需要，GC 也会调用终结器。即使资源关闭的需求已经被处理，<code>finalize()</code> 操作也不能取消。</p><p>这导致了性能惩罚，因为它无论如何都会被调用，不管是否需要。</p><h3 id="_3-4-没有线程保证" tabindex="-1"><a class="header-anchor" href="#_3-4-没有线程保证"><span>3.4. 没有线程保证</span></a></h3><p>JVM 没有保证哪个线程将调用对象的终结器，也没有保证顺序。可能有未指定数量的终结器线程。如果应用程序线程比终结器线程更频繁地为对象分配资源，可能会导致资源短缺。</p><h3 id="_3-5-确保终结器代码的正确性" tabindex="-1"><a class="header-anchor" href="#_3-5-确保终结器代码的正确性"><span>3.5. 确保终结器代码的正确性</span></a></h3><p>通常很难编写正确的 <code>finalize()</code> 实现。由于终结器实现不当，也很容易编写破坏应用程序的代码。对象的 <code>finalize()</code> 方法必须记得使用 <code>super.finalize()</code> 调用其父类的 <code>finalize()</code>，而 JVM 本身并不提供。</p><p>由于终结器在未指定数量的线程上运行，可能会导致多线程环境中常见的问题，如死锁和其他线程问题。此外，当有多个类具有终结器时，会导致系统中的耦合增加。这些对象的终结化可能会产生相互依赖，一些对象可能会在堆中停留更长时间，等待依赖对象被终结化。</p><h2 id="_4-try-with-resources-作为替代技术" tabindex="-1"><a class="header-anchor" href="#_4-try-with-resources-作为替代技术"><span>4. <code>try-with-resources</code> 作为替代技术</span></a></h2><p>我们可以通过使用 Java 7 引入的 <code>try-with-resources</code> 构造来保证资源的 <code>close()</code> 方法被调用。这个框架是对 <code>try-catch-finally</code> 构造的改进，因为它确保所有异常都被正确处理，从而消除了对最终化的需求：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">readFileOperationWithTryWith</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">FileOutputStream</span> fis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span><span class="token string">&quot;input.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 执行操作</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以在 try-with 块中放入任意数量的资源初始化。让我们重写我们的类，不使用终结器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyCloseableResourceClass</span> <span class="token keyword">implements</span> <span class="token class-name">AutoCloseable</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">FileInputStream</span> fis<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">MyCloseableResourceClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>fis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token string">&quot;file.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getByteLength</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>fis<span class="token punctuation">.</span><span class="token function">readAllBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>fis<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的唯一区别是 <code>AutoCloseable</code> 接口和重写的 <code>close()</code> 方法。现在我们可以安全地在 try-with 块中使用我们的资源对象，而不必担心资源泄漏：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenCloseableResource_whenUsingTryWith_thenShouldClose</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">{</span>
    <span class="token keyword">int</span> length <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">MyCloseableResourceClass</span> mcr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyCloseableResourceClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        length <span class="token operator">=</span> mcr<span class="token punctuation">.</span><span class="token function">getByteLength</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-java-中的-cleaner-api" tabindex="-1"><a class="header-anchor" href="#_5-java-中的-cleaner-api"><span>5. Java 中的 Cleaner API</span></a></h2><h3 id="_5-1-使用-cleaner-api-创建资源类" tabindex="-1"><a class="header-anchor" href="#_5-1-使用-cleaner-api-创建资源类"><span>5.1. 使用 Cleaner API 创建资源类</span></a></h3><p>Java 9 引入了 Cleaner API 的概念，用于释放长寿命资源。Cleaners 实现了 <code>Cleanable</code> 接口，并允许我们定义并注册针对对象的清理操作。</p><p>实现我们资源类的 Cleaner 需要三个步骤：</p><ol><li>获取 Cleaner 实例</li><li>注册清理操作</li><li>执行清理</li></ol><p>我们定义的资源类将使用 Cleaner API 在使用后帮助我们清理资源：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyCleanerResourceClass</span> <span class="token keyword">implements</span> <span class="token class-name">AutoCloseable</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Resource</span> resource<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要获取 Cleaner 实例，我们调用 Cleaner 类上的静态 <code>create()</code> 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Cleaner</span> cleaner <span class="token operator">=</span> <span class="token class-name">Cleaner</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Cleaner<span class="token punctuation">.</span>Cleanable</span> cleanable<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还创建了一个 Cleanable 实例，它将帮助我们针对我的对象注册清理操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">MyCleanerResourceClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    resource <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Resource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>cleanable <span class="token operator">=</span> cleaner<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">CleaningState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Cleaner 的 <code>register()</code> 方法接受两个参数，它应该监控的用于清理的对象，以及用于清理的操作。我们这里传递了一个类型为 <code>java.lang.Runnable</code> 的 lambda 作为清理操作，它在 CleaningState 类中定义：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">CleaningState</span> <span class="token keyword">implements</span> <span class="token class-name">Runnable</span> <span class="token punctuation">{</span>
    <span class="token class-name">CleaningState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 构造函数</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 一些清理操作</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Cleanup done&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们也重写了 <code>close()</code> 方法，因为我们实现了 AutoCloseable 接口。在 <code>close()</code> 方法中，我们在 cleanable 上调用 <code>clean()</code> 方法，并执行第三个也是最后一步。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 执行关闭所有底层资源的操作</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>cleanable<span class="token punctuation">.</span><span class="token function">clean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-测试-cleaner-实现" tabindex="-1"><a class="header-anchor" href="#_5-2-测试-cleaner-实现"><span>5.2. 测试 Cleaner 实现</span></a></h3><p>现在我们已经为我们的资源类实现了 Cleaner API，让我们通过编写一个小测试来验证它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenMyCleanerResource_whenUsingCleanerAPI_thenShouldClean</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertDoesNotThrow</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">MyCleanerResourceClass</span> myCleanerResourceClass <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyCleanerResourceClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            myCleanerResourceClass<span class="token punctuation">.</span><span class="token function">useResource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 注意，我们将资源类包装在 try-with 块中。运行测试时，我们可以在控制台看到两个语句：</span>
\`\`\`java
<span class="token class-name">Using</span> the resource
<span class="token class-name">Cleanup</span> done
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-cleaner-api-的优势" tabindex="-1"><a class="header-anchor" href="#_5-3-cleaner-api-的优势"><span>5.3. Cleaner API 的优势</span></a></h3><p>当对象符合清理条件时，Cleaner API 会自动清理资源。Cleaner API 试图解决上述提到的最终化大部分缺点。在 <code>finalize()</code> 中，我们可以编写代码使对象复活，使其不适合收集。Cleaner API 中不存在这个问题，因为 <code>CleaningState</code> 对象无法访问原始对象。</p><p>此外，Cleaner API 需要在对象创建完成后正确注册清理操作。因此，清理操作不能处理未正确初始化的对象。而且，这种清理操作是可取消的，与最终化不同。</p><p>最后，清理操作在单独的线程上运行，因此不干扰，并且清理操作抛出的异常会被 JVM 自动忽略。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们讨论了 Java 决定废弃最终化的原因。我们查看了最终化的问题，并探索了两种帮助资源清理的替代解决方案。</p><p>如常，本教程的源代码可以在 GitHub 上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/0f08492941896785c081f90c7a231caa?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>`,62),c=[p];function l(o,i){return s(),a("div",null,c)}const r=n(t,[["render",l],["__file","2024-06-29-Deprecate Finalization in Java 18.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-Deprecate%20Finalization%20in%20Java%2018.html","title":"Java 18 中废弃 Finalization 的讨论","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java"],"tag":["Java 18","Finalization"],"head":[["meta",{"name":"keywords","content":"Java 18 Finalization, JEP 421, Resource Leaks, Cleaner API"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-Deprecate%20Finalization%20in%20Java%2018.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 18 中废弃 Finalization 的讨论"}],["meta",{"property":"og:description","content":"Java 18 中废弃 Finalization 的讨论 在这篇教程中，我们将讨论 Java 尝试通过 Java 18 版本中的 JEP 421 废弃 Object 最终化的原因。我们还将讨论最终化的潜在替代品和更好的替代方案。 2.1. 资源泄漏 JVM 配备了垃圾收集（GC）机制，用于回收应用程序不再使用的对象的内存，或者没有更多引用指向该对象。然..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T07:53:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 18"}],["meta",{"property":"article:tag","content":"Finalization"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T07:53:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 18 中废弃 Finalization 的讨论\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/0f08492941896785c081f90c7a231caa?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T07:53:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 18 中废弃 Finalization 的讨论 在这篇教程中，我们将讨论 Java 尝试通过 Java 18 版本中的 JEP 421 废弃 Object 最终化的原因。我们还将讨论最终化的潜在替代品和更好的替代方案。 2.1. 资源泄漏 JVM 配备了垃圾收集（GC）机制，用于回收应用程序不再使用的对象的内存，或者没有更多引用指向该对象。然..."},"headers":[{"level":3,"title":"2.1. 资源泄漏","slug":"_2-1-资源泄漏","link":"#_2-1-资源泄漏","children":[]},{"level":3,"title":"2.2. 对象的 finalize() 方法","slug":"_2-2-对象的-finalize-方法","link":"#_2-2-对象的-finalize-方法","children":[]},{"level":2,"title":"3. 最终化的缺陷","slug":"_3-最终化的缺陷","link":"#_3-最终化的缺陷","children":[{"level":3,"title":"3.1. 不可预测的执行","slug":"_3-1-不可预测的执行","link":"#_3-1-不可预测的执行","children":[]},{"level":3,"title":"3.2. 无约束的终结器代码","slug":"_3-2-无约束的终结器代码","link":"#_3-2-无约束的终结器代码","children":[]},{"level":3,"title":"3.3. 性能开销","slug":"_3-3-性能开销","link":"#_3-3-性能开销","children":[]},{"level":3,"title":"3.4. 没有线程保证","slug":"_3-4-没有线程保证","link":"#_3-4-没有线程保证","children":[]},{"level":3,"title":"3.5. 确保终结器代码的正确性","slug":"_3-5-确保终结器代码的正确性","link":"#_3-5-确保终结器代码的正确性","children":[]}]},{"level":2,"title":"4. try-with-resources 作为替代技术","slug":"_4-try-with-resources-作为替代技术","link":"#_4-try-with-resources-作为替代技术","children":[]},{"level":2,"title":"5. Java 中的 Cleaner API","slug":"_5-java-中的-cleaner-api","link":"#_5-java-中的-cleaner-api","children":[{"level":3,"title":"5.1. 使用 Cleaner API 创建资源类","slug":"_5-1-使用-cleaner-api-创建资源类","link":"#_5-1-使用-cleaner-api-创建资源类","children":[]},{"level":3,"title":"5.2. 测试 Cleaner 实现","slug":"_5-2-测试-cleaner-实现","link":"#_5-2-测试-cleaner-实现","children":[]},{"level":3,"title":"5.3. Cleaner API 的优势","slug":"_5-3-cleaner-api-的优势","link":"#_5-3-cleaner-api-的优势","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719647618000,"updatedTime":1719647618000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.89,"words":2366},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-Deprecate Finalization in Java 18.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这篇教程中，我们将讨论 Java 尝试通过 Java 18 版本中的 JEP 421 废弃 <code>Object</code> 最终化的原因。我们还将讨论最终化的潜在替代品和更好的替代方案。</p>\\n<h3>2.1. 资源泄漏</h3>\\n<p>JVM 配备了垃圾收集（GC）机制，用于回收应用程序不再使用的对象的内存，或者没有更多引用指向该对象。然而，一些对象引用使用并代表其他底层资源，如操作系统级别的资源、本地内存块和打开的文件描述符。这些对象在关闭时应调用 <code>close()</code> 方法，以将底层资源释放回操作系统。</p>\\n<p>如果 GC 在对象有机会调用 <code>close()</code> 之前过早地清理了对象，操作系统就会认为该对象仍在使用中。这就是资源泄漏。</p>","autoDesc":true}');export{r as comp,k as data};
