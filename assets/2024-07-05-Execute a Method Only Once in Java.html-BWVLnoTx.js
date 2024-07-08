import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-C_fPDS1x.js";const t={},i=e(`<h1 id="java中仅执行一次方法" tabindex="-1"><a class="header-anchor" href="#java中仅执行一次方法"><span>Java中仅执行一次方法</span></a></h1><p>在本教程中，我们将探讨仅执行一次方法的不同方法。这在几种场景中都非常有用。例如，初始化单例实例的方法或执行一次性设置操作的方法。</p><p>我们将探索各种技术以确保方法只被调用一次。这些技术包括使用布尔变量和<code>synchronized</code>关键字、<code>AtomicBoolean</code>以及静态初始化块。此外，某些单元测试框架如JUnit和TestNG提供了注释，可以帮助仅执行一次方法。</p><h2 id="_2-使用布尔值与synchronized" tabindex="-1"><a class="header-anchor" href="#_2-使用布尔值与synchronized"><span>2. 使用布尔值与Synchronized</span></a></h2><p>我们的第一种方法是结合使用布尔标志和<code>synchronized</code>关键字。让我们看看如何实现它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">SynchronizedInitializer</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token keyword">volatile</span> <span class="token keyword">boolean</span> isInitialized <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> callCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isInitialized<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">initializationLogic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            isInitialized <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">initializationLogic</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        callCount<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个实现中，我们最初将<code>isInitialized</code>标志设置为<code>false</code>。当第一次调用<code>initialize()</code>方法时，它检查标志是否为<code>false</code>。如果是，执行一次性初始化逻辑，并将标志设置为<code>true</code>。后续对<code>initialize()</code>方法的调用将看到标志已经是<code>true</code>，并且不会执行初始化逻辑。</p><p>同步确保一次只有一个线程可以执行initialize方法。这防止了多个线程同时执行初始化逻辑，可能引起竞态条件。我们需要<code>volatile</code>关键字以确保每个线程都读取更新后的布尔值。</p><p>我们可以通过以下测试来验证我们只执行了一次初始化：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">givenSynchronizedInitializer_whenRepeatedlyCallingInitialize_thenCallCountIsOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">SynchronizedInitializer</span> synchronizedInitializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SynchronizedInitializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> synchronizedInitializer<span class="token punctuation">.</span>callCount<span class="token punctuation">)</span><span class="token punctuation">;</span>

    synchronizedInitializer<span class="token punctuation">.</span><span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    synchronizedInitializer<span class="token punctuation">.</span><span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    synchronizedInitializer<span class="token punctuation">.</span><span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> synchronizedInitializer<span class="token punctuation">.</span>callCount<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们创建一个<code>SynchronizedInitializer</code>的实例，并断言<code>callCount</code>变量是<code>0</code>。调用<code>initialize()</code>方法几次后，<code>callCount</code>增加到<code>1</code>。</p><h2 id="_3-使用atomicboolean" tabindex="-1"><a class="header-anchor" href="#_3-使用atomicboolean"><span>3. 使用AtomicBoolean</span></a></h2><p>执行方法的另一种方法是使用<code>AtomicBoolean</code>类型的原子变量。让我们看一个实现示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">AtomicBooleanInitializer</span> <span class="token punctuation">{</span>
    <span class="token class-name">AtomicBoolean</span> isInitialized <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicBoolean</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> callCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">void</span> <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>isInitialized<span class="token punctuation">.</span><span class="token function">compareAndSet</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">initializationLogic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">initializationLogic</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        callCount<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个实现中，使用<code>AtomicBoolean</code>构造函数将<code>isInitialized</code>变量最初设置为<code>false</code>。当我们第一次调用<code>initialize()</code>方法时，我们调用<code>compareAndSet()</code>方法，预期值为<code>false</code>，新值为<code>true</code>。如果<code>isInitialized</code>的当前值为<code>false</code>，该方法将将其设置为<code>true</code>并返回<code>true</code>。后续对<code>initialize()</code>方法的调用将看到<code>isInitialized</code>变量已经是<code>true</code>，并且不会执行初始化逻辑。</p><p>使用<code>AtomicBoolean</code>确保<code>compareAndSet()</code>方法是原子操作，这意味着一次只有一个线程可以修改<code>isInitialized</code>的值。这防止了竞态条件，并确保<code>initialize()</code>方法是线程安全的。</p><p>我们可以通过以下测试来验证我们只执行了<code>AtomicBooleanInitializer</code>的<code>initializationLogic()</code>方法一次：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">givenAtomicBooleanInitializer_whenRepeatedlyCallingInitialize_thenCallCountIsOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">AtomicBooleanInitializer</span> atomicBooleanInitializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicBooleanInitializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> atomicBooleanInitializer<span class="token punctuation">.</span>callCount<span class="token punctuation">)</span><span class="token punctuation">;</span>

    atomicBooleanInitializer<span class="token punctuation">.</span><span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    atomicBooleanInitializer<span class="token punctuation">.</span><span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    atomicBooleanInitializer<span class="token punctuation">.</span><span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> atomicBooleanInitializer<span class="token punctuation">.</span>callCount<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个测试与我们之前看到的非常相似。</p><h2 id="_4-使用静态初始化" tabindex="-1"><a class="header-anchor" href="#_4-使用静态初始化"><span>4. 使用静态初始化</span></a></h2><p>静态初始化是另一种仅执行一次方法的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">StaticInitializer</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token constant">CALL_COUNT</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        <span class="token function">initializationLogic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">initializationLogic</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token constant">CALL_COUNT</span><span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>静态初始化块仅在类加载期间执行一次。它不需要额外的锁定。</p><p>我们可以通过以下测试来验证我们只调用了<code>StaticInitializer</code>的初始化方法一次：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">whenLoadingStaticInitializer_thenCallCountIsOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token class-name">StaticInitializer</span><span class="token punctuation">.</span><span class="token constant">CALL_COUNT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为静态初始化块已经在类加载期间被调用，<code>CALL_COUNT</code>变量已经设置为<code>1</code>。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">whenInitializingStaticInitializer_thenCallCountStaysOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StaticInitializer</span> staticInitializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StaticInitializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token class-name">StaticInitializer</span><span class="token punctuation">.</span><span class="token constant">CALL_COUNT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建<code>StaticInitializer</code>的新实例时，<code>CALL_COUNT</code>仍然是<code>1</code>。我们不能再调用静态初始化块。</p><h2 id="_5-使用单元测试框架" tabindex="-1"><a class="header-anchor" href="#_5-使用单元测试框架"><span>5. 使用单元测试框架</span></a></h2><p>JUnit和TestNG提供了注释，以仅运行一次设置方法。在JUnit中，使用<code>@BeforeAll</code>注释，而在TestNG或旧版本的JUnit中，我们可以使用<code>@BeforeClass</code>注释来仅执行一次方法。</p><p>这里是一个JUnit设置方法的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@BeforeAll</span>
<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;@BeforeAll - executes once before all test methods in this class&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了如何确保我们只执行一次方法的不同方法。我们在不同的场景中需要这样做，例如初始化数据库连接。</p><p>我们看到的方法利用了锁定、<code>AtomicBoolean</code>和静态初始化器。还可以使用单元测试框架仅运行一次方法。</p><p>如常，所有这些示例的实现都可以在GitHub上找到。</p>`,36),o=[i];function c(p,l){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","2024-07-05-Execute a Method Only Once in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Execute%20a%20Method%20Only%20Once%20in%20Java.html","title":"Java中仅执行一次方法","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Concurrency"],"tag":["Java","Singleton","Synchronized","AtomicBoolean","Static Initialization"],"head":[["meta",{"name":"keywords","content":"Java, Method Execution, Singleton, Synchronized, AtomicBoolean, Static Initialization"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Execute%20a%20Method%20Only%20Once%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中仅执行一次方法"}],["meta",{"property":"og:description","content":"Java中仅执行一次方法 在本教程中，我们将探讨仅执行一次方法的不同方法。这在几种场景中都非常有用。例如，初始化单例实例的方法或执行一次性设置操作的方法。 我们将探索各种技术以确保方法只被调用一次。这些技术包括使用布尔变量和synchronized关键字、AtomicBoolean以及静态初始化块。此外，某些单元测试框架如JUnit和TestNG提供了..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T13:06:06.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Singleton"}],["meta",{"property":"article:tag","content":"Synchronized"}],["meta",{"property":"article:tag","content":"AtomicBoolean"}],["meta",{"property":"article:tag","content":"Static Initialization"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T13:06:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中仅执行一次方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T13:06:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中仅执行一次方法 在本教程中，我们将探讨仅执行一次方法的不同方法。这在几种场景中都非常有用。例如，初始化单例实例的方法或执行一次性设置操作的方法。 我们将探索各种技术以确保方法只被调用一次。这些技术包括使用布尔变量和synchronized关键字、AtomicBoolean以及静态初始化块。此外，某些单元测试框架如JUnit和TestNG提供了..."},"headers":[{"level":2,"title":"2. 使用布尔值与Synchronized","slug":"_2-使用布尔值与synchronized","link":"#_2-使用布尔值与synchronized","children":[]},{"level":2,"title":"3. 使用AtomicBoolean","slug":"_3-使用atomicboolean","link":"#_3-使用atomicboolean","children":[]},{"level":2,"title":"4. 使用静态初始化","slug":"_4-使用静态初始化","link":"#_4-使用静态初始化","children":[]},{"level":2,"title":"5. 使用单元测试框架","slug":"_5-使用单元测试框架","link":"#_5-使用单元测试框架","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720184766000,"updatedTime":1720184766000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.68,"words":1103},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Execute a Method Only Once in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将探讨仅执行一次方法的不同方法。这在几种场景中都非常有用。例如，初始化单例实例的方法或执行一次性设置操作的方法。</p>\\n<p>我们将探索各种技术以确保方法只被调用一次。这些技术包括使用布尔变量和<code>synchronized</code>关键字、<code>AtomicBoolean</code>以及静态初始化块。此外，某些单元测试框架如JUnit和TestNG提供了注释，可以帮助仅执行一次方法。</p>\\n<h2>2. 使用布尔值与Synchronized</h2>\\n<p>我们的第一种方法是结合使用布尔标志和<code>synchronized</code>关键字。让我们看看如何实现它：</p>","autoDesc":true}');export{r as comp,k as data};
