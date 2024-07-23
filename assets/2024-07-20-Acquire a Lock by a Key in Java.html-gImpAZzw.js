import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-LwwahXlT.js";const p={},t=e(`<h1 id="java中通过键获取锁" tabindex="-1"><a class="header-anchor" href="#java中通过键获取锁"><span>Java中通过键获取锁</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本文中，我们将看到如何针对特定键获取锁，以防止对该键的并发操作，同时不影响其他键的操作。</p><p>通常，我们将实现两个方法并了解如何操作它们：</p><ul><li><code>void lock(String key)</code></li><li><code>void unlock(String key)</code></li></ul><p>为了教程的简单性，我们总是假设我们的键是_字符串_。您可以将它们替换为您需要的对象类型，唯一的条件是正确定义了<code>equals</code>和<code>hashCode</code>方法，因为我们将它们用作<code>HashMap</code>的键。</p><h2 id="_2-一个简单的互斥锁" tabindex="-1"><a class="header-anchor" href="#_2-一个简单的互斥锁"><span>2. 一个简单的互斥锁</span></a></h2><p>首先，我们假设我们想要阻止任何请求的操作，如果相应的键已经被使用。在这里，我们将定义一个<code>boolean tryLock(String key)</code>方法，而不是我们之前想象的<code>lock</code>方法。</p><p>具体来说，我们的目标是维护一个<code>Set</code>，我们将用任何时刻正在使用的键填充它。因此，当对键请求一个新操作时，我们只需要拒绝它，如果我们发现键已经被另一个线程使用。</p><p>我们面临的问题是没有线程安全的<code>Set</code>实现。因此，我们将使用一个由<code>ConcurrentHashMap</code>支持的<code>Set</code>。使用<code>ConcurrentHashMap</code>保证了我们在多线程环境中的数据一致性。</p><p>让我们看看这在实践中是如何工作的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SimpleExclusiveLockByKey</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Set</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` usedKeys <span class="token operator">=</span> <span class="token class-name">ConcurrentHashMap</span><span class="token punctuation">.</span><span class="token function">newKeySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">tryLock</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> usedKeys<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">unlock</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        usedKeys<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下是我们将如何使用这个类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> key <span class="token operator">=</span> <span class="token string">&quot;key&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">SimpleExclusiveLockByKey</span> lockByKey <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleExclusiveLockByKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
    lockByKey<span class="token punctuation">.</span><span class="token function">tryLock</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 插入需要在键锁可用时才执行的代码</span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span> <span class="token comment">// 至关重要</span>
    lockByKey<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**让我们强调<code>finally</code>块的存在：在其中调用<code>unlock</code>方法至关重要。**这样，即使我们的代码在<code>try</code>括号内抛出了<code>Exception</code>，我们也会解锁键。</p><h2 id="_3-通过键获取和释放锁" tabindex="-1"><a class="header-anchor" href="#_3-通过键获取和释放锁"><span>3. 通过键获取和释放锁</span></a></h2><p>现在，让我们进一步探讨问题，假设我们不仅仅想拒绝对相同键的并发操作，而是想让新进来的操作等待当前对键的操作完成。</p><p>应用程序流程将是：</p><ul><li>第一个线程请求对键的锁定：它获取了键的锁</li><li>第二个线程请求对同一键的锁定：线程2被告知等待</li><li>第一个线程释放了键的锁</li><li>第二个线程获取了键的锁并可以执行其操作</li></ul><h3 id="_3-1-定义一个带有线程计数器的锁" tabindex="-1"><a class="header-anchor" href="#_3-1-定义一个带有线程计数器的锁"><span>3.1. 定义一个带有线程计数器的锁</span></a></h3><p>在这种情况下，使用<code>Lock</code>听起来很自然。简而言之，<code>Lock</code>是一个用于线程同步的对象，它允许阻塞线程直到它可以被获取。<code>Lock</code>是一个接口——我们将使用<code>ReentrantLock</code>，这是它的基本实现。</p><p>让我们首先用一个内部类包装我们的<code>Lock</code>。这个类将能够跟踪当前等待锁定键的线程数量。它将公开两个方法，一个用于增加线程计数器，另一个用于减少它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">LockWrapper</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Lock</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">AtomicInteger</span> numberOfThreadsInQueue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicInteger</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">LockWrapper</span> <span class="token function">addThreadInQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        numberOfThreadsInQueue<span class="token punctuation">.</span><span class="token function">incrementAndGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token function">removeThreadFromQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> numberOfThreadsInQueue<span class="token punctuation">.</span><span class="token function">decrementAndGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-让锁处理排队的线程" tabindex="-1"><a class="header-anchor" href="#_3-2-让锁处理排队的线程"><span>3.2. 让锁处理排队的线程</span></a></h3><p>此外，我们将继续使用<code>ConcurrentHashMap</code>。但与我们之前所做的不同，我们将不仅仅提取<code>Map</code>的键，我们将使用<code>LockWrapper</code>对象作为值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ConcurrentHashMap</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">LockWrapper</span><span class="token punctuation">&gt;</span></span>\`\`\`\` locks <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentHashMap</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">LockWrapper</span><span class="token punctuation">&gt;</span></span>\`\`\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当一个线程想要获取对键的锁定时，我们需要查看是否已经存在这个键的<code>LockWrapper</code>：</p><ul><li>如果没有，我们将为给定的键实例化一个新的<code>LockWrapper</code>，计数器设置为1</li><li>如果有，我们将返回现有的<code>LockWrapper</code>并增加其关联的计数器</li></ul><p>让我们看看这是如何完成的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">lock</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">LockWrapper</span> lockWrapper <span class="token operator">=</span> locks<span class="token punctuation">.</span><span class="token function">compute</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token punctuation">(</span>k<span class="token punctuation">,</span> v<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> v <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token keyword">new</span> <span class="token class-name">LockWrapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> v<span class="token punctuation">.</span><span class="token function">addThreadInQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    lockWrapper<span class="token punctuation">.</span>lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码由于使用了<code>HashMap</code>的<code>compute</code>方法而非常简洁。让我们详细介绍这个方法的工作原理：</p><ul><li><code>compute</code>方法应用于对象<code>locks</code>，<code>key</code>作为其第一个参数：检索<code>locks</code>中与<code>key</code>对应的初始值</li><li>作为<code>compute</code>第二个参数给出的<code>BiFunction</code>应用于<code>key</code>和初始值：结果给出了一个新的值</li><li>新值替换了<code>locks</code>中<code>key</code>的初始值</li></ul><h3 id="_3-3-解锁并可选地移除映射条目" tabindex="-1"><a class="header-anchor" href="#_3-3-解锁并可选地移除映射条目"><span>3.3. 解锁并可选地移除映射条目</span></a></h3><p>此外，当一个线程释放锁时，我们将减少与<code>LockWrapper</code>关联的线程数量。如果计数降到零，那么我们将从<code>ConcurrentHashMap</code>中移除键：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">unlock</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">LockWrapper</span> lockWrapper <span class="token operator">=</span> locks<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    lockWrapper<span class="token punctuation">.</span>lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>lockWrapper<span class="token punctuation">.</span><span class="token function">removeThreadFromQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 注意：我们传入特定的值以移除，以处理另一个线程可能正好在移除前排队的情况</span>
        locks<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> lockWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-总结" tabindex="-1"><a class="header-anchor" href="#_3-4-总结"><span>3.4. 总结</span></a></h3><p>总而言之，让我们看看我们整个类最终的样子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LockByKey</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">LockWrapper</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Lock</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">AtomicInteger</span> numberOfThreadsInQueue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicInteger</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token class-name">LockWrapper</span> <span class="token function">addThreadInQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            numberOfThreadsInQueue<span class="token punctuation">.</span><span class="token function">incrementAndGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token function">removeThreadFromQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> numberOfThreadsInQueue<span class="token punctuation">.</span><span class="token function">decrementAndGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ConcurrentHashMap</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">LockWrapper</span><span class="token punctuation">&gt;</span></span>\`\`\`\` locks <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentHashMap</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">LockWrapper</span><span class="token punctuation">&gt;</span></span>\`\`\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">lock</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">LockWrapper</span> lockWrapper <span class="token operator">=</span> locks<span class="token punctuation">.</span><span class="token function">compute</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token punctuation">(</span>k<span class="token punctuation">,</span> v<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> v <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token keyword">new</span> <span class="token class-name">LockWrapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> v<span class="token punctuation">.</span><span class="token function">addThreadInQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        lockWrapper<span class="token punctuation">.</span>lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">unlock</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">LockWrapper</span> lockWrapper <span class="token operator">=</span> locks<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        lockWrapper<span class="token punctuation">.</span>lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>lockWrapper<span class="token punctuation">.</span><span class="token function">removeThreadFromQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            locks<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> lockWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用方式与我们之前类似：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> key <span class="token operator">=</span> <span class="token string">&quot;key&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">LockByKey</span> lockByKey <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LockByKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
    lockByKey<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 在这里插入你的代码</span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span> <span class="token comment">// 至关重要</span>
    lockByKey<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-允许同时进行多个操作" tabindex="-1"><a class="header-anchor" href="#_4-允许同时进行多个操作"><span>4. 允许同时进行多个操作</span></a></h2><p>最后但同样重要的是，让我们考虑另一种情况：不是只允许一个线程对给定键同时执行一个操作，而是我们想要将对同一键同时执行操作的线程数量限制为某个整数<code>n</code>。为了简单起见，我们将设置<code>n</code>=2。</p><p>让我们详细描述我们的用例：</p><ul><li>第一个线程想要获取键的锁定：它将被允许这样做</li><li>第二个线程想要获取相同的锁：它也将被允许</li><li>第三个线程请求相同的锁：它将不得不排队，直到前两个线程之一释放其锁</li></ul><p>Semaphores为此而生。一个<code>Semaphore</code>是一个用来限制同时访问资源的线程数量的对象。</p><p>全局功能和代码看起来与我们使用锁时非常相似：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SimultaneousEntriesLockByKey</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">ALLOWED_THREADS</span> <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ConcurrentHashMap</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Semaphore</span><span class="token punctuation">&gt;</span></span>\`\` semaphores <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentHashMap</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Semaphore</span><span class="token punctuation">&gt;</span></span>\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">lock</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Semaphore</span> semaphore <span class="token operator">=</span> semaphores<span class="token punctuation">.</span><span class="token function">compute</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token punctuation">(</span>k<span class="token punctuation">,</span> v<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> v <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token keyword">new</span> <span class="token class-name">Semaphore</span><span class="token punctuation">(</span><span class="token constant">ALLOWED_THREADS</span><span class="token punctuation">)</span> <span class="token operator">:</span> v<span class="token punctuation">)</span><span class="token punctuation">;</span>
        semaphore<span class="token punctuation">.</span><span class="token function">acquireUninterruptibly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">unlock</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Semaphore</span> semaphore <span class="token operator">=</span> semaphores<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        semaphore<span class="token punctuation">.</span><span class="token function">release</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>semaphore<span class="token punctuation">.</span><span class="token function">availablePermits</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token constant">ALLOWED_THREADS</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            semaphores<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> semaphore<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用方式是相同的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> key <span class="token operator">=</span> <span class="token string">&quot;key&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">SimultaneousEntriesLockByKey</span> lockByKey <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimultaneousEntriesLockByKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
    lockByKey<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 在这里插入你的代码</span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span> <span class="token comment">// 至关重要</span>
    lockByKey<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们已经看到了如何对键设置锁，以完全阻止并发操作或将并发操作的数量限制为一个（使用锁）或更多（使用信号量）。</p><p>一如既往，代码可以在GitHub上找到。</p>`,52),c=[t];function o(l,i){return a(),s("div",null,c)}const r=n(p,[["render",o],["__file","2024-07-20-Acquire a Lock by a Key in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-Acquire%20a%20Lock%20by%20a%20Key%20in%20Java.html","title":"Java中通过键获取锁","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java Concurrency","Locks"],"tag":["Java","Lock","Concurrency"],"head":[["meta",{"name":"keywords","content":"Java, Lock, Concurrency, ReentrantLock, Semaphore, ConcurrentHashMap"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-Acquire%20a%20Lock%20by%20a%20Key%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中通过键获取锁"}],["meta",{"property":"og:description","content":"Java中通过键获取锁 1. 概述 在本文中，我们将看到如何针对特定键获取锁，以防止对该键的并发操作，同时不影响其他键的操作。 通常，我们将实现两个方法并了解如何操作它们： void lock(String key) void unlock(String key) 为了教程的简单性，我们总是假设我们的键是_字符串_。您可以将它们替换为您需要的对象类型，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T23:13:22.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Lock"}],["meta",{"property":"article:tag","content":"Concurrency"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T23:13:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中通过键获取锁\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T23:13:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中通过键获取锁 1. 概述 在本文中，我们将看到如何针对特定键获取锁，以防止对该键的并发操作，同时不影响其他键的操作。 通常，我们将实现两个方法并了解如何操作它们： void lock(String key) void unlock(String key) 为了教程的简单性，我们总是假设我们的键是_字符串_。您可以将它们替换为您需要的对象类型，..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 一个简单的互斥锁","slug":"_2-一个简单的互斥锁","link":"#_2-一个简单的互斥锁","children":[]},{"level":2,"title":"3. 通过键获取和释放锁","slug":"_3-通过键获取和释放锁","link":"#_3-通过键获取和释放锁","children":[{"level":3,"title":"3.1. 定义一个带有线程计数器的锁","slug":"_3-1-定义一个带有线程计数器的锁","link":"#_3-1-定义一个带有线程计数器的锁","children":[]},{"level":3,"title":"3.2. 让锁处理排队的线程","slug":"_3-2-让锁处理排队的线程","link":"#_3-2-让锁处理排队的线程","children":[]},{"level":3,"title":"3.3. 解锁并可选地移除映射条目","slug":"_3-3-解锁并可选地移除映射条目","link":"#_3-3-解锁并可选地移除映射条目","children":[]},{"level":3,"title":"3.4. 总结","slug":"_3-4-总结","link":"#_3-4-总结","children":[]}]},{"level":2,"title":"4. 允许同时进行多个操作","slug":"_4-允许同时进行多个操作","link":"#_4-允许同时进行多个操作","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721517202000,"updatedTime":1721517202000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.76,"words":1727},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-Acquire a Lock by a Key in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本文中，我们将看到如何针对特定键获取锁，以防止对该键的并发操作，同时不影响其他键的操作。</p>\\n<p>通常，我们将实现两个方法并了解如何操作它们：</p>\\n<ul>\\n<li><code>void lock(String key)</code></li>\\n<li><code>void unlock(String key)</code></li>\\n</ul>\\n<p>为了教程的简单性，我们总是假设我们的键是_字符串_。您可以将它们替换为您需要的对象类型，唯一的条件是正确定义了<code>equals</code>和<code>hashCode</code>方法，因为我们将它们用作<code>HashMap</code>的键。</p>","autoDesc":true}');export{r as comp,d as data};
