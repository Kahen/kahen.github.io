import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-CtR6X2Br.js";const t={},c=e(`<h1 id="线程转储中的-锁定可拥有同步器-是什么" tabindex="-1"><a class="header-anchor" href="#线程转储中的-锁定可拥有同步器-是什么"><span>线程转储中的“锁定可拥有同步器”是什么？</span></a></h1><p>在本教程中，我们将探讨线程的锁定可拥有同步器的含义。我们将编写一个使用_Lock_进行同步的简单程序，并查看在线程转储中它看起来如何。</p><p>每个线程可能有一个同步器对象列表。该列表中的条目表示线程已获取锁的可拥有同步器。</p><p>_AbstractOwnableSynchronizer_类的实例可以用作同步器。它最常见的子类是_Sync_类，这是如_ReentrantReadWriteLock_等_Lock_接口实现的字段。</p><p>当我们调用_ReentrantReadWriteLock.lock()_方法时，内部代码将此委托给_Sync.lock()_方法。<strong>一旦我们获取了锁，Lock对象就会被添加到线程的锁定可拥有同步器列表中</strong>。</p><p>我们可以在典型的线程转储中查看这个列表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&quot;Thread-0&quot; #1 prio=5 os_prio=0 tid=0x000002411a452800 nid=0x1c18 waiting on condition [0x00000051a2bff000]
   java.lang.Thread.State: TIMED_WAITING (sleeping)
        at java.lang.Thread.sleep(Native Method)
        at com.baeldung.ownablesynchronizers.Application.main(Application.java:25)

   Locked ownable synchronizers:
        - \`\`\`&lt;0x000000076e185e68&gt;\`\`\` (a java.util.concurrent.locks.ReentrantReadWriteLock$FairSync)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据我们用来生成它的工具，我们可能需要提供特定的选项。例如，使用jstack，我们运行以下命令：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>jstack -l \`&lt;pid&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用_-l_选项，我们告诉jstack打印有关锁的额外信息。</p><h3 id="_3-锁定可拥有同步器如何帮助我们" tabindex="-1"><a class="header-anchor" href="#_3-锁定可拥有同步器如何帮助我们"><span>3. 锁定可拥有同步器如何帮助我们</span></a></h3><p>可拥有同步器列表帮助我们识别可能的应用程序死锁。例如，我们可以看到在线程转储中，如果一个名为_Thread-1_的不同线程正在等待获取同一个_Lock_对象上的锁：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&quot;Thread-1&quot; #12 prio=5 os_prio=0 tid=0x00000241374d7000 nid=0x4da4 waiting on condition [0x00000051a42fe000]
   java.lang.Thread.State: WAITING (parking)
        at sun.misc.Unsafe.park(Native Method)
        - parking to wait for \`\`\`&lt;0x000000076e185e68&gt;\`\`\` (a java.util.concurrent.locks.ReentrantReadWriteLock$FairSync)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>Thread-1_线程处于_WAITING_状态。具体来说，它正在等待获取对象id为</em><code>&lt;0x000000076e185e68&gt;</code>_上的锁。然而，同一个对象在线程_Thread-0_的锁定可拥有同步器列表中。<strong>我们现在知道，除非线程_Thread-0_释放它自己的锁，否则线程_Thread-1_无法继续</strong>。</p><p>如果同时发生了相反的情况，即_Thread-1_获取了_Thread-0_正在等待的锁，我们就创建了一个死锁。</p><h3 id="_4-死锁诊断示例" tabindex="-1"><a class="header-anchor" href="#_4-死锁诊断示例"><span>4. 死锁诊断示例</span></a></h3><p>让我们看一下一些简单的代码，它说明了上述所有内容。我们将使用两个线程和两个_ReentrantLock_对象创建一个死锁场景：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Application</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">ReentrantLock</span> firstLock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ReentrantLock</span> secondLock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span> first <span class="token operator">=</span> <span class="token function">createThread</span><span class="token punctuation">(</span><span class="token string">&quot;Thread-0&quot;</span><span class="token punctuation">,</span> firstLock<span class="token punctuation">,</span> secondLock<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span> second <span class="token operator">=</span> <span class="token function">createThread</span><span class="token punctuation">(</span><span class="token string">&quot;Thread-1&quot;</span><span class="token punctuation">,</span> secondLock<span class="token punctuation">,</span> firstLock<span class="token punctuation">)</span><span class="token punctuation">;</span>

        first<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        second<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        first<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        second<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的_main()_方法创建了两个_ReentrantLock_对象。第一个线程，<em>Thread-0</em>，使用_firstLock_作为其主锁，_secondLock_作为其辅助锁。</p><p>我们将为_Thread-1_做相反的事情。具体来说，我们的目标是通过让每个线程获取其主锁并在尝试获取其辅助锁时挂起来，来生成一个死锁。</p><p>_createThread()_方法为我们的每个线程生成它们各自的锁：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Thread</span> <span class="token function">createThread</span><span class="token punctuation">(</span><span class="token class-name">String</span> threadName<span class="token punctuation">,</span> <span class="token class-name">ReentrantLock</span> primaryLock<span class="token punctuation">,</span> <span class="token class-name">ReentrantLock</span> secondaryLock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        primaryLock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token class-name">Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>secondaryLock<span class="token punctuation">.</span><span class="token function">isLocked</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        secondaryLock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>threadName <span class="token operator">+</span> <span class="token string">&quot;: Finished&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        primaryLock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        secondaryLock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了确保每个线程在其他线程尝试之前锁定了它的_primaryLock_，我们使用_synchronized_块内的_isLocked()_来等待它。</p><p>运行此代码将挂起，永远不会打印完成的控制台输出。如果我们运行jstack，我们将看到以下内容：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&quot;Thread-0&quot; #12 prio=5 os_prio=0 tid=0x0000027e1e31e800 nid=0x7d0 waiting on condition [0x000000a29acfe000]
   java.lang.Thread.State: WAITING (parking)
        at sun.misc.Unsafe.park(Native Method)
        - parking to wait for \`\`&lt;0x000000076e182558&gt;\`\`

   Locked ownable synchronizers:
        - \`\`&lt;0x000000076e182528&gt;\`\`

&quot;Thread-1&quot; #13 prio=5 os_prio=0 tid=0x0000027e1e3ba000 nid=0x650 waiting on condition [0x000000a29adfe000]
   java.lang.Thread.State: WAITING (parking)
        at sun.misc.Unsafe.park(Native Method)
        - parking to wait for \`\`&lt;0x000000076e182528&gt;\`\`

   Locked ownable synchronizers:
        - \`\`&lt;0x000000076e182558&gt;\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到_Thread-0_正在等待_0x000000076e182558_，而_Thread-1_正在等待_0x000000076e182528_。同时，我们可以在它们各自的线程的锁定可拥有同步器中找到这些句柄。<strong>基本上，这意味着我们可以看到我们的线程正在等待哪些锁以及哪个线程拥有这些锁</strong>。这有助于我们排除并发问题，包括死锁。</p><p>需要注意的重要一点是，如果我们使用的是_ReentrantLock_而不是_ReentrantReadWriteLock.ReadLock_作为同步器，我们就不会在线程转储中获得相同的信息。<strong>只有在同步器列表中显示_ReentrantReadWriteLock.WriteLock_</strong>。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们讨论了线程转储中出现的锁定可拥有同步器列表的含义，如何使用它来排除并发问题，并看到了一个示例场景。</p><p>如往常一样，本文的源代码可在GitHub上找到。</p>`,30),p=[c];function o(i,l){return s(),a("div",null,p)}const d=n(t,[["render",o],["__file","2024-07-15-What Is  Locked Ownable Synchronizers  in Thread Dump .html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-15/2024-07-15-What%20Is%20%20Locked%20Ownable%20Synchronizers%20%20in%20Thread%20Dump%20.html","title":"线程转储中的“锁定可拥有同步器”是什么？","lang":"zh-CN","frontmatter":{"date":"2023-04-01T00:00:00.000Z","category":["Concurrency","Java"],"tag":["Thread Dump","Deadlock"],"head":[["meta",{"name":"keywords","content":"Java, Thread Dump, Lock, Deadlock, Synchronizer"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-15/2024-07-15-What%20Is%20%20Locked%20Ownable%20Synchronizers%20%20in%20Thread%20Dump%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"线程转储中的“锁定可拥有同步器”是什么？"}],["meta",{"property":"og:description","content":"线程转储中的“锁定可拥有同步器”是什么？ 在本教程中，我们将探讨线程的锁定可拥有同步器的含义。我们将编写一个使用_Lock_进行同步的简单程序，并查看在线程转储中它看起来如何。 每个线程可能有一个同步器对象列表。该列表中的条目表示线程已获取锁的可拥有同步器。 _AbstractOwnableSynchronizer_类的实例可以用作同步器。它最常见的子..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-15T16:06:26.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Thread Dump"}],["meta",{"property":"article:tag","content":"Deadlock"}],["meta",{"property":"article:published_time","content":"2023-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-15T16:06:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"线程转储中的“锁定可拥有同步器”是什么？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-15T16:06:26.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"线程转储中的“锁定可拥有同步器”是什么？ 在本教程中，我们将探讨线程的锁定可拥有同步器的含义。我们将编写一个使用_Lock_进行同步的简单程序，并查看在线程转储中它看起来如何。 每个线程可能有一个同步器对象列表。该列表中的条目表示线程已获取锁的可拥有同步器。 _AbstractOwnableSynchronizer_类的实例可以用作同步器。它最常见的子..."},"headers":[{"level":3,"title":"3. 锁定可拥有同步器如何帮助我们","slug":"_3-锁定可拥有同步器如何帮助我们","link":"#_3-锁定可拥有同步器如何帮助我们","children":[]},{"level":3,"title":"4. 死锁诊断示例","slug":"_4-死锁诊断示例","link":"#_4-死锁诊断示例","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721059586000,"updatedTime":1721059586000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.9,"words":1169},"filePathRelative":"posts/baeldung/2024-07-15/2024-07-15-What Is  Locked Ownable Synchronizers  in Thread Dump .md","localizedDate":"2023年4月1日","excerpt":"\\n<p>在本教程中，我们将探讨线程的锁定可拥有同步器的含义。我们将编写一个使用_Lock_进行同步的简单程序，并查看在线程转储中它看起来如何。</p>\\n<p>每个线程可能有一个同步器对象列表。该列表中的条目表示线程已获取锁的可拥有同步器。</p>\\n<p>_AbstractOwnableSynchronizer_类的实例可以用作同步器。它最常见的子类是_Sync_类，这是如_ReentrantReadWriteLock_等_Lock_接口实现的字段。</p>\\n<p>当我们调用_ReentrantReadWriteLock.lock()_方法时，内部代码将此委托给_Sync.lock()_方法。<strong>一旦我们获取了锁，Lock对象就会被添加到线程的锁定可拥有同步器列表中</strong>。</p>","autoDesc":true}');export{d as comp,k as data};
