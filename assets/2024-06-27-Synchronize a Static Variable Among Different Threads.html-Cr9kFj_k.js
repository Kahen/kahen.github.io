import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-yRPSFQJx.js";const t={},p=e(`<h1 id="在不同线程中同步静态变量" tabindex="-1"><a class="header-anchor" href="#在不同线程中同步静态变量"><span>在不同线程中同步静态变量</span></a></h1><p>在Java中，需要同步访问静态变量的情况并不少见。在这个简短的教程中，我们将探讨几种在不同线程之间同步访问静态变量的方法。</p><h2 id="_2-关于静态变量" tabindex="-1"><a class="header-anchor" href="#_2-关于静态变量"><span>2. 关于静态变量</span></a></h2><p>作为快速回顾，<strong>静态变量属于类而不是类的实例</strong>。这意味着类的所有实例都具有变量的相同状态。</p><p>例如，考虑一个带有静态变量的_Employee_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token keyword">int</span> count<span class="token punctuation">;</span>
    <span class="token keyword">int</span> id<span class="token punctuation">;</span>
    <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token class-name">String</span> title<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，_count_变量是静态的，表示曾经在公司工作过的员工总数。无论我们创建多少_Employee_实例，它们都将共享_count_的相同值。</p><p>然后，我们可以在构造函数中添加代码以确保每次有新员工时跟踪计数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> title<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    count <span class="token operator">=</span> count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然这种方法很直接，但在我们想要读取_count_变量时<strong>可能存在问题</strong>。这在多线程环境中尤其如此，特别是当有多个_Employee_类的实例时。</p><p>下面，我们将看到不同的方式来同步对_count_变量的访问。</p><h2 id="_3-使用-synchronized-关键字同步静态变量" tabindex="-1"><a class="header-anchor" href="#_3-使用-synchronized-关键字同步静态变量"><span>3. 使用_synchronized_关键字同步静态变量</span></a></h2><p>我们可以通过使用Java的_synchronized_关键字来同步我们的静态变量。我们有几种方式可以使用这个关键字来访问我们的静态变量。</p><p>首先，我们可以创建一个使用_synchronized_关键字作为修饰符的静态方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> title<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">incrementCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">incrementCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    count <span class="token operator">=</span> count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">synchronized</span> <span class="token keyword">int</span> <span class="token function">getCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> count<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在这种情况下，_synchronized_关键字锁定在类对象上，因为变量是静态的</strong>。这意味着无论我们创建多少_Employee_实例，只要它们使用这两个静态方法，一次只能有一个访问变量。</p><p>其次，我们可以使用_synchronized_块来显式地同步在类对象上：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">incrementCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">synchronized</span><span class="token punctuation">(</span><span class="token class-name">Employee</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        count <span class="token operator">=</span> count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">synchronized</span><span class="token punctuation">(</span><span class="token class-name">Employee</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> count<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，<strong>这在功能上等同于第一个示例</strong>，但代码更加明确。</p><p>最后，我们还可以使用一个特定的对象实例的_synchronized_块，而不是类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Object</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> title<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">incrementCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">incrementCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">synchronized</span><span class="token punctuation">(</span>lock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        count <span class="token operator">=</span> count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">synchronized</span><span class="token punctuation">(</span>lock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> count<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法有时更受欢迎的原因是锁定是我们类的私有。在第一个示例中，<strong>可能存在我们无法控制的其他代码也锁定我们的类</strong>。使用私有锁定，我们可以完全控制它的使用方式。</p><p>Java _synchronized_关键字只是同步访问静态变量的一种方式。下面，我们将看看Java API，它们也可以提供对静态变量的同步。</p><h2 id="_4-同步静态变量的java-api" tabindex="-1"><a class="header-anchor" href="#_4-同步静态变量的java-api"><span>4. 同步静态变量的Java API</span></a></h2><p>Java编程语言提供了几种API，可以帮助进行同步。让我们看看其中的两个。</p><h3 id="_4-1-原子包装器" tabindex="-1"><a class="header-anchor" href="#_4-1-原子包装器"><span>4.1. 原子包装器</span></a></h3><p>在Java 1.5中引入的_AtomicInteger_类是同步访问我们静态变量的替代方式。<strong>这个类提供了原子的读写操作，确保所有线程对底层值的一致视图</strong>。</p><p>例如，我们可以使用_AtomicInteger_类型而不是_int_重写我们的_Employee_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">static</span> <span class="token class-name">AtomicInteger</span> count <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicInteger</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> title<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        count<span class="token punctuation">.</span><span class="token function">incrementAndGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        count<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了_AtomicInteger_之外，<strong>Java还为_long_和_boolean_以及引用类型提供了原子包装器</strong>。所有这些包装器类都是同步访问静态数据的极好工具。</p><h3 id="_4-2-可重入锁" tabindex="-1"><a class="header-anchor" href="#_4-2-可重入锁"><span>4.2. 可重入锁</span></a></h3><p>同样在Java 1.5中引入的_ReentrantLock_类是我们可以用于同步访问静态数据的另一种机制。<strong>它提供了与我们之前使用的_synchronized_关键字相同的基本行为和语义，但具有额外的功能</strong>。</p><p>让我们看看我们的_Employee_类如何使用_ReentrantLock_而不是_int_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">ReentrantLock</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> title<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            count <span class="token operator">=</span> count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 设置字段</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> count<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于这种方法有几点需要注意。首先，它比其他方法更冗长。<strong>每次访问共享变量时，我们必须确保在访问之前正确锁定并在访问后解锁</strong>。如果我们在访问共享静态变量的每个地方都忘记执行这个序列，这可能导致程序员错误。</p><p>此外，类的文档建议使用_try_/ _finally_块来正确锁定和解锁。这增加了额外的代码行和冗余，以及更多可能的程序员错误，如果我们在所有情况下都忘记这样做。</p><p>尽管如此，_ReentrantLock_类提供了_synchronized_关键字之外的额外行为。除其他外，<strong>它允许我们设置公平性标志并查询锁的状态，以获得等待它的线程数量的详细视图</strong>。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了几种不同的方式来同步不同实例和线程对静态变量的访问。我们首先看了Java _synchronized_关键字，并看到了如何将其作为方法修饰符和静态代码块使用的例子。</p><p>然后，我们看了Java并发API的两个特性：<em>AtomicInteger_和_ReentrantLock</em>。<strong>这两个API都提供了同步访问共享数据的方法，并提供了_synchronized_关键字之外的一些额外好处</strong>。</p><p>所有上述示例都可以在GitHub上找到。</p>`,41),o=[p];function c(i,l){return a(),s("div",null,o)}const d=n(t,[["render",c],["__file","2024-06-27-Synchronize a Static Variable Among Different Threads.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-27/2024-06-27-Synchronize%20a%20Static%20Variable%20Among%20Different%20Threads.html","title":"在不同线程中同步静态变量","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Java","Concurrency"],"tag":["Java","Synchronization","Thread"],"head":[["meta",{"name":"keywords","content":"Java, Synchronization, Static Variable, Thread, Concurrency"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-27/2024-06-27-Synchronize%20a%20Static%20Variable%20Among%20Different%20Threads.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在不同线程中同步静态变量"}],["meta",{"property":"og:description","content":"在不同线程中同步静态变量 在Java中，需要同步访问静态变量的情况并不少见。在这个简短的教程中，我们将探讨几种在不同线程之间同步访问静态变量的方法。 2. 关于静态变量 作为快速回顾，静态变量属于类而不是类的实例。这意味着类的所有实例都具有变量的相同状态。 例如，考虑一个带有静态变量的_Employee_类： 在这种情况下，_count_变量是静态的，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-27T11:25:01.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Synchronization"}],["meta",{"property":"article:tag","content":"Thread"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T11:25:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在不同线程中同步静态变量\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-27T11:25:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在不同线程中同步静态变量 在Java中，需要同步访问静态变量的情况并不少见。在这个简短的教程中，我们将探讨几种在不同线程之间同步访问静态变量的方法。 2. 关于静态变量 作为快速回顾，静态变量属于类而不是类的实例。这意味着类的所有实例都具有变量的相同状态。 例如，考虑一个带有静态变量的_Employee_类： 在这种情况下，_count_变量是静态的，..."},"headers":[{"level":2,"title":"2. 关于静态变量","slug":"_2-关于静态变量","link":"#_2-关于静态变量","children":[]},{"level":2,"title":"3. 使用_synchronized_关键字同步静态变量","slug":"_3-使用-synchronized-关键字同步静态变量","link":"#_3-使用-synchronized-关键字同步静态变量","children":[]},{"level":2,"title":"4. 同步静态变量的Java API","slug":"_4-同步静态变量的java-api","link":"#_4-同步静态变量的java-api","children":[{"level":3,"title":"4.1. 原子包装器","slug":"_4-1-原子包装器","link":"#_4-1-原子包装器","children":[]},{"level":3,"title":"4.2. 可重入锁","slug":"_4-2-可重入锁","link":"#_4-2-可重入锁","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719487501000,"updatedTime":1719487501000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.78,"words":1435},"filePathRelative":"posts/baeldung/2024-06-27/2024-06-27-Synchronize a Static Variable Among Different Threads.md","localizedDate":"2024年6月27日","excerpt":"\\n<p>在Java中，需要同步访问静态变量的情况并不少见。在这个简短的教程中，我们将探讨几种在不同线程之间同步访问静态变量的方法。</p>\\n<h2>2. 关于静态变量</h2>\\n<p>作为快速回顾，<strong>静态变量属于类而不是类的实例</strong>。这意味着类的所有实例都具有变量的相同状态。</p>\\n<p>例如，考虑一个带有静态变量的_Employee_类：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Employee</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">int</span> count<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">int</span> id<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">String</span> name<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">String</span> title<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
