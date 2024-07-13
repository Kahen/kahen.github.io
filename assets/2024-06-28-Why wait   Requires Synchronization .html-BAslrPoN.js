import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BDZ-trJf.js";const e={},p=t(`<h1 id="为什么wait-需要同步-baeldung" tabindex="-1"><a class="header-anchor" href="#为什么wait-需要同步-baeldung"><span>为什么wait()需要同步？ | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在Java中，我们有一个wait()/notify() API。这个API是线程间同步的一种方式。为了使用这个API的方法，当前线程必须拥有被调用者的监视器。</p><p>在本教程中，我们将探讨为什么这个要求是有意义的。</p><h2 id="_2-wait-的工作原理" tabindex="-1"><a class="header-anchor" href="#_2-wait-的工作原理"><span>2. wait()的工作原理</span></a></h2><p>首先，我们需要简要讨论一下Java中wait()的工作原理。根据JLS，Java中每个对象都有一个监视器。基本上，这意味着我们可以对我们喜欢的任何对象进行同步。这可能不是一个很好的决定，但这就是我们现在所拥有的。</p><p>有了这个，当我们调用wait()时，我们隐式地做了两件事。首先，我们将当前线程放入JVM内部等待集，用于这个对象监视器。第二，一旦线程进入等待集，我们（或者说JVM）释放了这个对象的同步锁。在这里，我们需要澄清——这个词this指的是我们调用wait()方法的对象。</p><p>然后，当前线程就在这个集中等待，直到另一个线程调用notify()/notifyAll()来通知这个对象。</p><h2 id="_3-为什么需要监视器所有权" tabindex="-1"><a class="header-anchor" href="#_3-为什么需要监视器所有权"><span>3. 为什么需要监视器所有权？</span></a></h2><p>在前一节中，我们看到JVM做的第二件事是释放这个对象的同步锁。为了释放它，我们显然需要先拥有它。这样做的原因相对简单：<strong>wait()上的同步是一个要求，以避免丢失唤醒问题</strong>。这个问题本质上代表了一种条件，即我们有一个等待线程错过了notify信号。这主要是由于线程之间的竞态条件。让我们用一个例子来模拟这个问题。</p><p>假设我们有以下Java代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token keyword">boolean</span> jobIsDone<span class="token punctuation">;</span>

<span class="token keyword">private</span> <span class="token class-name">Object</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">ensureCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>jobIsDone<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            lock<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// ...</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">complete</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    jobIsDone <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    lock<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>快速说明一下——这段代码在运行时会因IllegalMonitorStateException而失败。这是因为，在两种方法中，我们在调用wait()/notify()之前都没有请求锁对象监视器。因此，这段代码纯粹是为了演示和学习目的。</p><p>另外，假设我们有两个线程。所以线程B正在做有用的工作。一旦完成，线程B需要调用complete()方法来发出完成信号。我们还有另一个线程A，正在等待由B执行的工作完成。线程A通过调用ensureCondition()方法来检查条件。由于Linux内核级别的伪唤醒问题，条件检查发生在循环中，但这是另一个话题。</p><h2 id="_4-丢失唤醒问题" tabindex="-1"><a class="header-anchor" href="#_4-丢失唤醒问题"><span>4. 丢失唤醒问题</span></a></h2><p>让我们一步一步地分解我们的例子。假设线程A调用了ensureCondition()并进入了while循环。它检查了一个条件，条件似乎是false，所以它进入了try块。因为我们在多线程环境中操作，另一个线程B可以同时进入complete()方法。因此，B可以在A调用wait()之前将volatile标志jobIsDone设置为true并调用notify()。</p><p>在这种情况下，如果线程B永远不会再次进入complete()，线程A将永远等待，因此，与它相关的所有资源也将永远存在。这不仅会导致死锁（如果线程A恰好持有另一个锁），还会导致内存泄漏，因为从线程A堆栈帧可达的对象将保持活动状态。这是因为线程A被认为是活动的，它可以恢复执行。因此，GC不允许垃圾收集A堆栈中分配的对象。</p><h2 id="_5-解决方案" tabindex="-1"><a class="header-anchor" href="#_5-解决方案"><span>5. 解决方案</span></a></h2><p>为了避免这种情况，我们需要同步。<strong>因此，调用者在执行之前必须拥有被调用者的监视器</strong>。让我们重写我们的代码，考虑到同步问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token keyword">boolean</span> jobIsDone<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Object</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">ensureCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>lock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>jobIsDone<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                lock<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// ...</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">complete</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>lock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        jobIsDone <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        lock<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们只添加了一个synchronized块，在调用wait()/notify() API之前，我们尝试获取锁对象监视器。现在，如果B在A调用wait()之前执行complete()方法，我们可以避免丢失唤醒。这是因为complete()方法只有在A没有获取锁对象监视器的情况下才能由B执行。因此，A不能在complete()方法执行时检查条件。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们讨论了为什么Java wait()方法需要同步。为了防止丢失唤醒异常，我们需要拥有被调用者的监视器的所有权。如果我们不这样做，JVM将采取快速失败的方法，并抛出IllegalMonitorStateException。</p><p>像往常一样，这些例子的源代码可以在GitHub上找到。</p>`,24),o=[p];function i(c,l){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","2024-06-28-Why wait   Requires Synchronization .html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-Why%20wait%20%20%20Requires%20Synchronization%20.html","title":"为什么wait()需要同步？ | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Concurrency"],"tag":["wait()","notify()","synchronization"],"head":[["meta",{"name":"keywords","content":"Java, wait(), notify(), synchronization, thread communication"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-Why%20wait%20%20%20Requires%20Synchronization%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"为什么wait()需要同步？ | Baeldung"}],["meta",{"property":"og:description","content":"为什么wait()需要同步？ | Baeldung 1. 引言 在Java中，我们有一个wait()/notify() API。这个API是线程间同步的一种方式。为了使用这个API的方法，当前线程必须拥有被调用者的监视器。 在本教程中，我们将探讨为什么这个要求是有意义的。 2. wait()的工作原理 首先，我们需要简要讨论一下Java中wait()的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T19:52:10.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"wait()"}],["meta",{"property":"article:tag","content":"notify()"}],["meta",{"property":"article:tag","content":"synchronization"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T19:52:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"为什么wait()需要同步？ | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T19:52:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"为什么wait()需要同步？ | Baeldung 1. 引言 在Java中，我们有一个wait()/notify() API。这个API是线程间同步的一种方式。为了使用这个API的方法，当前线程必须拥有被调用者的监视器。 在本教程中，我们将探讨为什么这个要求是有意义的。 2. wait()的工作原理 首先，我们需要简要讨论一下Java中wait()的..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. wait()的工作原理","slug":"_2-wait-的工作原理","link":"#_2-wait-的工作原理","children":[]},{"level":2,"title":"3. 为什么需要监视器所有权？","slug":"_3-为什么需要监视器所有权","link":"#_3-为什么需要监视器所有权","children":[]},{"level":2,"title":"4. 丢失唤醒问题","slug":"_4-丢失唤醒问题","link":"#_4-丢失唤醒问题","children":[]},{"level":2,"title":"5. 解决方案","slug":"_5-解决方案","link":"#_5-解决方案","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719604330000,"updatedTime":1719604330000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.12,"words":1235},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-Why wait   Requires Synchronization .md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在Java中，我们有一个wait()/notify() API。这个API是线程间同步的一种方式。为了使用这个API的方法，当前线程必须拥有被调用者的监视器。</p>\\n<p>在本教程中，我们将探讨为什么这个要求是有意义的。</p>\\n<h2>2. wait()的工作原理</h2>\\n<p>首先，我们需要简要讨论一下Java中wait()的工作原理。根据JLS，Java中每个对象都有一个监视器。基本上，这意味着我们可以对我们喜欢的任何对象进行同步。这可能不是一个很好的决定，但这就是我们现在所拥有的。</p>\\n<p>有了这个，当我们调用wait()时，我们隐式地做了两件事。首先，我们将当前线程放入JVM内部等待集，用于这个对象监视器。第二，一旦线程进入等待集，我们（或者说JVM）释放了这个对象的同步锁。在这里，我们需要澄清——这个词this指的是我们调用wait()方法的对象。</p>","autoDesc":true}');export{d as comp,k as data};
