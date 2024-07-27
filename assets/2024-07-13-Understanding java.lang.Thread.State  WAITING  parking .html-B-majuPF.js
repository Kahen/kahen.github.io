import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-CBerKIce.js";const e={},p=t(`<hr><h1 id="理解java-lang-thread-state-waiting-parking-baeldung" tabindex="-1"><a class="header-anchor" href="#理解java-lang-thread-state-waiting-parking-baeldung"><span>理解java.lang.Thread.State: WAITING (parking) | Baeldung</span></a></h1><p>在这篇文章中，我们将讨论Java线程状态——特别是_Thread.State.WAITING_。我们将探讨线程进入此状态的方法以及它们之间的区别。最后，我们将更仔细地研究_LockSupport_类，它提供了几个用于同步的静态实用方法。</p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><h2 id="_2-进入-thread-state-waiting" tabindex="-1"><a class="header-anchor" href="#_2-进入-thread-state-waiting"><span>2. 进入_Thread.State.WAITING_</span></a></h2><p>Java提供了多种方式将线程置于_WAITING_状态。</p><h3 id="_2-1-object-wait" tabindex="-1"><a class="header-anchor" href="#_2-1-object-wait"><span>2.1. <em>Object.wait()</em></span></a></h3><p>将线程置于_WAITING_状态的最标准方式之一是通过_wait()_方法。当一个线程拥有对象的监视器时，我们可以使用_notify()_方法唤醒它，直到另一个线程完成一些工作。在执行暂停时，线程处于_WAITING (on object monitor)_状态，这也在程序的线程转储中报告：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token string">&quot;WAITING-THREAD&quot;</span> #<span class="token number">11</span> prio<span class="token operator">=</span><span class="token number">5</span> os_prio<span class="token operator">=</span><span class="token number">0</span> tid<span class="token operator">=</span><span class="token number">0x000000001d6ff800</span> nid<span class="token operator">=</span><span class="token number">0x544</span> in <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token number">0x000000001de4f000</span><span class="token punctuation">]</span>
   <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>Thread<span class="token punctuation">.</span>State</span><span class="token operator">:</span> <span class="token constant">WAITING</span> <span class="token punctuation">(</span>on object monitor<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-thread-join" tabindex="-1"><a class="header-anchor" href="#_2-2-thread-join"><span>2.2 <em>Thread.join()</em></span></a></h3><p>我们可以通过_join()<em>调用来暂停线程的执行。当我们的主线程需要等待工作线程完成后，我们可以从主线程调用工作线程实例上的_join()</em>。执行将被暂停，主线程将进入_WAITING_状态，从_jstack_报告为_WAITING (on object monitor)_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token string">&quot;MAIN-THREAD&quot;</span> #<span class="token number">12</span> prio<span class="token operator">=</span><span class="token number">5</span> os_prio<span class="token operator">=</span><span class="token number">0</span> tid<span class="token operator">=</span><span class="token number">0x000000001da4f000</span> nid<span class="token operator">=</span><span class="token number">0x25f4</span> in <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token number">0x000000001e28e000</span><span class="token punctuation">]</span>
   <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>Thread<span class="token punctuation">.</span>State</span><span class="token operator">:</span> <span class="token constant">WAITING</span> <span class="token punctuation">(</span>on object monitor<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-locksupport-park" tabindex="-1"><a class="header-anchor" href="#_2-3-locksupport-park"><span>2.3 <em>LockSupport.park()</em></span></a></h3><p>最后，我们还可以使用_LockSupport_类的_park()_静态方法将线程设置为_WAITING_状态。调用_park()_将停止当前线程的执行并将其置于_WAITING_状态——更具体地说，是_WAITING (parking)_状态，正如_jstack_报告所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token string">&quot;PARKED-THREAD&quot;</span> #<span class="token number">11</span> prio<span class="token operator">=</span><span class="token number">5</span> os_prio<span class="token operator">=</span><span class="token number">0</span> tid<span class="token operator">=</span><span class="token number">0x000000001e226800</span> nid<span class="token operator">=</span><span class="token number">0x43cc</span> waiting on condition <span class="token punctuation">[</span><span class="token number">0x000000001e95f000</span><span class="token punctuation">]</span>
   <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>Thread<span class="token punctuation">.</span>State</span><span class="token operator">:</span> <span class="token constant">WAITING</span> <span class="token punctuation">(</span>parking<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>由于我们想要更好地理解线程的停车和取消停车，让我们更仔细地看看这是如何工作的。</p><h2 id="_3-停车和取消停车线程" tabindex="-1"><a class="header-anchor" href="#_3-停车和取消停车线程"><span>3. 停车和取消停车线程</span></a></h2><p>正如我们之前看到的，我们可以使用_LockSupport_类提供的设施来停车和取消停车线程。这个类是_Unsafe_类的包装器，它的大部分方法立即委托给它。然而，由于_Unsafe_被认为是Java内部API，不应该使用，_LockSupport_是我们可以获得停车工具的官方方式。</p><h3 id="_3-1-如何使用-locksupport" tabindex="-1"><a class="header-anchor" href="#_3-1-如何使用-locksupport"><span>3.1 如何使用_LockSupport_</span></a></h3><p>使用_LockSupport_很简单。如果我们想要停止一个线程的执行，我们调用_park()_方法。我们不需要提供线程对象本身的引用——代码停止调用它的线程。</p><p>让我们看一个简单的停车示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Application</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span> t <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> acc <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;=</span> <span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                acc <span class="token operator">+=</span> i<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Work finished&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">LockSupport</span><span class="token punctuation">.</span><span class="token function">park</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>acc<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        t<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;PARK-THREAD&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        t<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们创建了一个最小的控制台应用程序，它从1到100累加数字并打印出来。如果我们运行它，我们会看到它打印出_Work finished_但不是结果。这当然是因为我们在前面调用了_park()_。</p><p><strong>要让_PARK-THREAD_完成，我们必须取消停车它</strong>。为此，我们必须使用不同的线程。我们可以使用_main_线程（运行_main()_方法的线程）或创建一个新的。</p><p>为了简单起见，让我们使用_main_线程：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>t<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;PARK-THREAD&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
t<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">LockSupport</span><span class="token punctuation">.</span><span class="token function">unpark</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在_main_线程中添加了一秒的睡眠，以让_PARK-THREAD_完成累加并自行停车。之后，我们通过调用_unpark(Thread)_来取消停车它。正如预期的那样，在取消停车期间，我们必须提供我们想要启动的线程对象的引用。</p><p>有了我们的更改，程序现在正确地终止并打印结果，<em>5050</em>。</p><h3 id="_3-2-取消停车许可证" tabindex="-1"><a class="header-anchor" href="#_3-2-取消停车许可证"><span>3.2. 取消停车许可证</span></a></h3><p>停车API的内部工作原理是通过使用许可证。实际上，这就像一个单许可证_Semaphore_。停车许可证用于内部管理线程的状态，<strong>_park()_方法消耗它，而_unpark()_使其可用。</strong></p><p>**由于我们每个线程只能有一个许可证可用，多次调用_unpark()_方法没有效果。**一个单独的_park()_调用将禁用线程。</p><p>然而，有趣的是，停车的线程等待许可证变得可用以再次启用自己。**如果调用_park()_时许可证已经可用，那么线程从未被禁用。**许可证被消耗，_park()_调用立即返回，线程继续执行。</p><p>我们可以通过删除前一个代码片段中的调用_sleep()_来看到这个效果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">//Thread.sleep(1000);</span>
<span class="token class-name">LockSupport</span><span class="token punctuation">.</span><span class="token function">unpark</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们再次运行我们的程序，我们会看到_PARK-THREAD_执行没有延迟。这是因为我们立即调用_unpark()_，这使得许可证对_park()_可用。</p><h3 id="_3-3-park重载" tabindex="-1"><a class="header-anchor" href="#_3-3-park重载"><span>3.3. Park重载</span></a></h3><p>_LockSupport_类包含_park(Object blocker)_重载方法。_blocker_参数是负责线程停车的同步对象。我们提供的_object_不影响停车过程，但它在线程转储中被报告，这可能有助于我们诊断并发问题。</p><p>让我们更改我们的代码，包含一个同步器对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Object</span> syncObj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">LockSupport</span><span class="token punctuation">.</span><span class="token function">park</span><span class="token punctuation">(</span>syncObj<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们删除对_unpark()_的调用并再次运行应用程序，它将挂起。如果我们使用_jstack_查看_PARK-THREAD_正在做什么，我们将得到：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token string">&quot;PARK-THREAD&quot;</span> #<span class="token number">11</span> prio<span class="token operator">=</span><span class="token number">5</span> os_prio<span class="token operator">=</span><span class="token number">0</span> tid<span class="token operator">=</span><span class="token number">0x000000001e401000</span> nid<span class="token operator">=</span><span class="token number">0xfb0</span> waiting on condition <span class="token punctuation">[</span><span class="token number">0x000000001eb4f000</span><span class="token punctuation">]</span>
   <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>Thread<span class="token punctuation">.</span>State</span><span class="token operator">:</span> <span class="token constant">WAITING</span> <span class="token punctuation">(</span>parking<span class="token punctuation">)</span>
        at <span class="token class-name"><span class="token namespace">sun<span class="token punctuation">.</span>misc<span class="token punctuation">.</span></span>Unsafe</span><span class="token punctuation">.</span><span class="token function">park</span><span class="token punctuation">(</span><span class="token class-name">Native</span> <span class="token class-name">Method</span><span class="token punctuation">)</span>
        <span class="token operator">-</span> parking <span class="token keyword">to</span> <span class="token namespace">wait</span> <span class="token keyword">for</span>  <span class="token generics"><span class="token punctuation">&lt;</span>0x000000076b4a8690<span class="token punctuation">&gt;</span></span>\` <span class="token punctuation">(</span>a <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>Object</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，最后一行包含了_PARK-THREAD_正在等待的对象。<strong>这对调试很有帮助，这就是为什么我们应该优先选择_park(Object)_重载。</strong></p><p>由于这两个API为我们提供了类似的功能，我们应该选择哪一个？通常，_LockSupport_类及其设施被认为是低级API。此外，API可能会被误用，导致难以察觉的死锁。<strong>在大多数情况下，我们应该使用_Thread_类的_wait()<em>和_join()</em>。</strong></p><p>使用停车的好处是我们不需要进入_synchronized_块来禁用线程。这很重要，因为_synchronized_块在代码中建立了happens-before关系，这迫使所有变量刷新，如果不需要，可能会降低性能。然而，这种优化很少发挥作用。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇文章中，我们探讨了_LockSupport_类及其停车API。我们研究了如何使用它来禁用线程，并解释了它的内部工作原理。最后，我们将其与更常见的_wait()/join()_ API进行了比较，并展示了它们的差异。</p><p>一如既往，代码示例可以在GitHub上找到。</p>`,47),o=[p];function c(l,i){return s(),n("div",null,o)}const k=a(e,[["render",c],["__file","2024-07-13-Understanding java.lang.Thread.State  WAITING  parking .html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Understanding%20java.lang.Thread.State%20%20WAITING%20%20parking%20.html","title":"理解java.lang.Thread.State: WAITING (parking) | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Concurrency"],"tag":["Java","Thread","LockSupport"],"head":[["meta",{"name":"keywords","content":"Java, Thread, LockSupport, WAITING"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Understanding%20java.lang.Thread.State%20%20WAITING%20%20parking%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"理解java.lang.Thread.State: WAITING (parking) | Baeldung"}],["meta",{"property":"og:description","content":"理解java.lang.Thread.State: WAITING (parking) | Baeldung 在这篇文章中，我们将讨论Java线程状态——特别是_Thread.State.WAITING_。我们将探讨线程进入此状态的方法以及它们之间的区别。最后，我们将更仔细地研究_LockSupport_类，它提供了几个用于同步的静态实用方法。 1. ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T12:57:00.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Thread"}],["meta",{"property":"article:tag","content":"LockSupport"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T12:57:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"理解java.lang.Thread.State: WAITING (parking) | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T12:57:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"理解java.lang.Thread.State: WAITING (parking) | Baeldung 在这篇文章中，我们将讨论Java线程状态——特别是_Thread.State.WAITING_。我们将探讨线程进入此状态的方法以及它们之间的区别。最后，我们将更仔细地研究_LockSupport_类，它提供了几个用于同步的静态实用方法。 1. ..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 进入_Thread.State.WAITING_","slug":"_2-进入-thread-state-waiting","link":"#_2-进入-thread-state-waiting","children":[{"level":3,"title":"2.1. Object.wait()","slug":"_2-1-object-wait","link":"#_2-1-object-wait","children":[]},{"level":3,"title":"2.2 Thread.join()","slug":"_2-2-thread-join","link":"#_2-2-thread-join","children":[]},{"level":3,"title":"2.3 LockSupport.park()","slug":"_2-3-locksupport-park","link":"#_2-3-locksupport-park","children":[]}]},{"level":2,"title":"3. 停车和取消停车线程","slug":"_3-停车和取消停车线程","link":"#_3-停车和取消停车线程","children":[{"level":3,"title":"3.1 如何使用_LockSupport_","slug":"_3-1-如何使用-locksupport","link":"#_3-1-如何使用-locksupport","children":[]},{"level":3,"title":"3.2. 取消停车许可证","slug":"_3-2-取消停车许可证","link":"#_3-2-取消停车许可证","children":[]},{"level":3,"title":"3.3. Park重载","slug":"_3-3-park重载","link":"#_3-3-park重载","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720875420000,"updatedTime":1720875420000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.53,"words":1659},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Understanding java.lang.Thread.State  WAITING  parking .md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>理解java.lang.Thread.State: WAITING (parking) | Baeldung</h1>\\n<p>在这篇文章中，我们将讨论Java线程状态——特别是_Thread.State.WAITING_。我们将探讨线程进入此状态的方法以及它们之间的区别。最后，我们将更仔细地研究_LockSupport_类，它提供了几个用于同步的静态实用方法。</p>\\n<h2>1. 概述</h2>\\n<h2>2. 进入_Thread.State.WAITING_</h2>\\n<p>Java提供了多种方式将线程置于_WAITING_状态。</p>\\n<h3>2.1. <em>Object.wait()</em></h3>","autoDesc":true}');export{k as comp,d as data};
