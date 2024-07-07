import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BA-MSwOu.js";const p={},e=t('<h1 id="生成基于时间的uuid" tabindex="-1"><a class="header-anchor" href="#生成基于时间的uuid"><span>生成基于时间的UUID</span></a></h1><p>在本文中，我们将学习关于UUID和基于时间的UUID。</p><p><strong>我们将看到基于时间的UUID的优势和劣势，以及何时选择它们。</strong></p><p>我们还将探索并比较一些库，这些库将帮助我们实现生成UUID的不同算法。</p><p><strong>UUID代表通用唯一标识符。</strong> 它是一个128位的标识符，每次生成时都预期是唯一的。</p><p>我们使用它们来唯一地识别某些事物，即使该事物没有固有的标识符。我们可以在各种环境中使用它们，例如计算机系统、数据库和分布式系统，这些地方我们需要唯一地识别对象。</p><p>两个UUID相同的可能性如此之小，以至于被认为是统计上不可能的，这使得它们成为在分布式系统中识别对象的可靠方式。</p><p>基于时间的UUID，也称为版本1的UUID，是使用当前时间和特定于生成UUID的计算机或网络的唯一标识符生成的。时间戳确保了UUID的唯一性，即使同时生成多个UUID也是如此。</p><p>我们将在下面实现的库中找到两个与时间相关的新版本（v6和v7）。</p><p>版本1提供了几个优势——时间排序的ID更适合作为表的主键，包含创建时间戳可以帮助分析和调试。它也有一些劣势——当从同一主机生成多个ID时，碰撞的可能性略高。稍后我们将看到这是否是一个问题。</p><p>此外，包含主机地址可能会带来一些安全漏洞，这就是为什么版本6的标准试图提高安全性。</p><h3 id="_3-基准测试" tabindex="-1"><a class="header-anchor" href="#_3-基准测试"><span>3. 基准测试</span></a></h3><p>为了使我们的比较更加直接，让我们编写一个基准程序来比较UUID碰撞的可能性和生成时间。我们首先初始化所有必要的变量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> threadCount <span class="token operator">=</span> <span class="token number">128</span><span class="token punctuation">;</span>\n<span class="token keyword">int</span> iterationCount <span class="token operator">=</span> <span class="token number">100_000</span><span class="token punctuation">;</span>\n<span class="token class-name">Map</span>`<span class="token generics"><span class="token punctuation">&lt;</span>UUID<span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>` uuidMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">AtomicLong</span> collisionCount <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicLong</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">long</span> startNanos <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">CountDownLatch</span> endLatch <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CountDownLatch</span><span class="token punctuation">(</span>threadCount<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将在128个线程上运行基准测试，每个线程100,000次迭代。此外，我们将使用ConcurrentHashMap存储所有生成的UUID。除此之外，我们将使用计数器来统计碰撞。为了检查速度性能，我们在执行开始时存储当前时间戳，并将其与最终的时间戳进行比较。最后，我们声明一个锁存器等待所有线程完成。</p><p>在初始化了我们测试所需的所有变量之后，我们将循环并启动每个线程：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">long</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i `<span class="token operator">&lt;</span> threadCount<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">long</span> threadId <span class="token operator">=</span> i<span class="token punctuation">;</span>\n    <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span>` <span class="token punctuation">{</span>\n        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">long</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j `<span class="token operator">&lt;</span> iterationCount<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token class-name">UUID</span> uuid <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token class-name">Long</span> existingUUID <span class="token operator">=</span> uuidMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>uuid<span class="token punctuation">,</span> <span class="token punctuation">(</span>threadId <span class="token operator">*</span> iterationCount<span class="token punctuation">)</span> <span class="token operator">+</span> j<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span>existingUUID <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                collisionCount<span class="token punctuation">.</span><span class="token function">incrementAndGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n        endLatch<span class="token punctuation">.</span><span class="token function">countDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于每一行执行，我们将再次集成并开始使用java.util.UUID类生成UUID。我们将所有ID及其相应的计数插入到映射中。UUID将是映射的键。</p><p>因此，如果我们尝试在映射中插入一个现有的UUID，put()方法将返回我们已经存在的键。当我们得到一个重复的UUID时，我们将增加碰撞计数。在迭代结束时，我们将减少倒计时。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>endLatch<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>threadCount <span class="token operator">*</span> iterationCount <span class="token operator">+</span> <span class="token string">&quot; UUIDs generated, &quot;</span> <span class="token operator">+</span> collisionCount <span class="token operator">+</span> <span class="token string">&quot; collisions in &quot;</span>\n        <span class="token operator">+</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">NANOSECONDS</span><span class="token punctuation">.</span><span class="token function">toMillis</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> startNanos<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;ms&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们将使用CountDownLatch类的await()方法等待所有线程完成。我们将打印我们的基准测试结果，包括生成的UUID数量、碰撞数量和执行时间。</p><p>现在，让我们对JDK内置的UUID生成器运行基准测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token number">12800000</span> <span class="token class-name">UUIDs</span> generated<span class="token punctuation">,</span> <span class="token number">0</span> collisions in <span class="token number">4622</span>ms\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以看到，所有ID都是在没有碰撞的情况下生成的。在接下来的部分中，我们将这与其他生成器进行比较。</p><h3 id="_4-uuid创建器" tabindex="-1"><a class="header-anchor" href="#_4-uuid创建器"><span>4. UUID创建器</span></a></h3><h4 id="_4-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_4-1-依赖项"><span>4.1. 依赖项</span></a></h4><p>Java UUID创建器库非常有价值和灵活，用于生成UUID。它提供了多种生成UUID的选项，其简单的API使其易于在广泛的应用程序中使用。我们可以将此库添加到我们的项目中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.github.f4b6a3``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``uuid-creator``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``5.2.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-2-使用方法" tabindex="-1"><a class="header-anchor" href="#_4-2-使用方法"><span>4.2. 使用方法</span></a></h4><p>这个库为我们提供了三种生成基于时间的UUID的方法：</p><ul><li><code>UuidCreator.getTimeBased()</code> – 基于时间的版本，使用RFC-4122中指定的公历纪元</li><li><code>UuidCreator.getTimeOrdered()</code> – 时间有序版本，使用公历纪元作为新的UUID格式提出</li><li><code>UuidCreator.getTimeOrderedEpoch()</code> – 时间有序版本，使用Unix纪元作为新的UUID格式提出</li></ul><p>我们可以在添加依赖项后直接在代码中使用它们：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;UUID Version 1: &quot;</span> <span class="token operator">+</span> <span class="token class-name">UuidCreator</span><span class="token punctuation">.</span><span class="token function">getTimeBased</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;UUID Version 6: &quot;</span> <span class="token operator">+</span> <span class="token class-name">UuidCreator</span><span class="token punctuation">.</span><span class="token function">getTimeOrdered</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;UUID Version 7: &quot;</span> <span class="token operator">+</span> <span class="token class-name">UuidCreator</span><span class="token punctuation">.</span><span class="token function">getTimeOrderedEpoch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到在输出中，所有三个都具有相同的经典UUID格式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token constant">UUID</span> <span class="token class-name">Version</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token number">0d</span>a151ed<span class="token operator">-</span>c82d<span class="token operator">-</span><span class="token number">11</span>ed<span class="token operator">-</span>a2f6<span class="token operator">-</span><span class="token number">6748247d</span><span class="token number">7506</span>\n<span class="token constant">UUID</span> <span class="token class-name">Version</span> <span class="token number">6</span><span class="token operator">:</span> <span class="token number">1</span>edc82d0<span class="token operator">-</span>da0e<span class="token operator">-</span><span class="token number">654</span>b<span class="token operator">-</span><span class="token number">9</span>a98<span class="token operator">-</span><span class="token number">79d</span><span class="token number">770</span>c05a84\n<span class="token constant">UUID</span> <span class="token class-name">Version</span> <span class="token number">7</span><span class="token operator">:</span> <span class="token number">01870603</span><span class="token operator">-</span>f211<span class="token operator">-</span><span class="token number">7</span>b9a<span class="token operator">-</span>a7ea<span class="token operator">-</span><span class="token number">4</span>a98f5320ff8\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>本文将重点介绍使用传统版本1 UUID的_getTimeBased()_方法。</strong> 它由三部分组成：时间戳、时钟序列和节点标识符。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>基于时间的<span class="token constant">UUID</span>结构\n\n <span class="token number">00000000</span><span class="token operator">-</span><span class="token number">0000</span><span class="token operator">-</span>v000<span class="token operator">-</span>m000<span class="token operator">-</span><span class="token number">000000000000</span>\n<span class="token operator">|</span><span class="token number">1</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span><span class="token operator">|</span><span class="token number">2</span><span class="token operator">--</span><span class="token operator">-</span><span class="token operator">|</span><span class="token number">3</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span><span class="token operator">|</span>\n<span class="token number">1</span><span class="token operator">:</span> 时间戳\n<span class="token number">2</span><span class="token operator">:</span> 时钟序列\n<span class="token number">3</span><span class="token operator">:</span> 节点标识符\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-3-基准测试" tabindex="-1"><a class="header-anchor" href="#_4-3-基准测试"><span>4.3. 基准测试</span></a></h4><p>在本节中，我们将使用UuidCreator.getTimeBased()方法运行前一部分的基准测试。之后，我们得到以下结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token number">12800000</span> <span class="token class-name">UUIDs</span> generated<span class="token punctuation">,</span> <span class="token number">0</span> collisions in <span class="token number">2595</span>ms\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以看到，这个算法也成功地在没有重复的情况下生成了所有的UUID。此外，它甚至比JDK的还要快。这只是一个基本的基准测试，尽管还有更详细的基准测试可用。</p><h3 id="_5-java-uuid生成器-jug" tabindex="-1"><a class="header-anchor" href="#_5-java-uuid生成器-jug"><span>5. Java UUID生成器（JUG）</span></a></h3><h4 id="_5-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_5-1-依赖项"><span>5.1. 依赖项</span></a></h4><p>Java UUID生成器（JUG）是一组用于处理UUID的Java类。它包括使用标准方法生成UUID、高效输出、排序等。它根据UUID规范（RFC-4122）生成UUID。</p><p>要使用这个库，我们应该添加Maven依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.fasterxml.uuid``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``java-uuid-generator``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``4.1.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-2-使用方法" tabindex="-1"><a class="header-anchor" href="#_5-2-使用方法"><span>5.2. 使用方法</span></a></h4><p>这个库还提供了三种创建基于时间的UUID的方法（经典的版本1和新版本6和7）。我们可以通过选择一种生成器，然后调用它的generate()方法来生成它们：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;UUID Version 1: &quot;</span> <span class="token operator">+</span> <span class="token class-name">Generators</span><span class="token punctuation">.</span><span class="token function">timeBasedGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">generate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;UUID Version 6: &quot;</span> <span class="token operator">+</span> <span class="token class-name">Generators</span><span class="token punctuation">.</span><span class="token function">timeBasedReorderedGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">generate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;UUID Version 7: &quot;</span> <span class="token operator">+</span> <span class="token class-name">Generators</span><span class="token punctuation">.</span><span class="token function">timeBasedEpochGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">generate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们可以在控制台检查UUID：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token constant">UUID</span> <span class="token class-name">Version</span> <span class="token number">1</span><span class="token operator">:</span> e6e3422c<span class="token operator">-</span>c82d<span class="token operator">-</span><span class="token number">11</span>ed<span class="token operator">-</span><span class="token number">8761</span><span class="token operator">-</span><span class="token number">3f</span>f799965458\n<span class="token constant">UUID</span> <span class="token class-name">Version</span> <span class="token number">6</span><span class="token operator">:</span> <span class="token number">1</span>edc82de<span class="token operator">-</span><span class="token number">6e34</span><span class="token operator">-</span><span class="token number">622d</span><span class="token operator">-</span><span class="token number">8761</span><span class="token operator">-</span>dffbc0ff00e8\n<span class="token constant">UUID</span> <span class="token class-name">Version</span> <span class="token number">7</span><span class="token operator">:</span> <span class="token number">01870609</span><span class="token operator">-</span><span class="token number">81e5</span><span class="token operator">-</span><span class="token number">793</span>b<span class="token operator">-</span><span class="token number">9e4f</span><span class="token operator">-</span><span class="token number">011</span>ee370187b\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-3-基准测试" tabindex="-1"><a class="header-anchor" href="#_5-3-基准测试"><span>5.3. 基准测试</span></a></h4><p>像前一节一样，我们将重点关注这个库提供的第一个UUID变体。我们也可以测试碰撞的可能性，通过将前一个示例中的UUID生成替换为以下内容：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">UUID</span> uuid <span class="token operator">=</span> <span class="token class-name">Generators</span><span class="token punctuation">.</span><span class="token function">timeBasedGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">generate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运行代码后，我们可以看到结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token number">12800000</span> <span class="token class-name">UUIDs</span> generated<span class="token punctuation">,</span> <span class="token number">0</span> collisions in <span class="token number">15795</span>ms\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>从这个结果中，我们可以看到我们也像前一个示例一样没有得到UUID的重复。但我们也看到了执行时间的差异。即使差异看起来很大，两个库都快速生成了许多ID。</p><p>这个库的文档告诉我们，生成速度不太可能成为瓶颈，基于包的稳定性和API选择更好。</p><h3 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h3><p>在本教程中，我们看到了基于time的UUID的结构、优势和劣势。我们使用两个最流行的UUID库在我们的代码中实现了它们，并在之后进行了比较。</p><p>我们看到选择UUID的类型或库可能取决于我们的需求。</p><p>正如往常一样，示例源代码可在GitHub上获得。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/247960f62f51e6d222ec2ed29e652eb9?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/6c3babf3d6ea5d49c2bc4e7957870d75?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>',64),o=[e];function c(l,i){return s(),a("div",null,o)}const d=n(p,[["render",c],["__file","2024-07-07-Generating Time Based UUIDs.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-Generating%20Time%20Based%20UUIDs.html","title":"生成基于时间的UUID","lang":"zh-CN","frontmatter":{"date":"2024-07-07T00:00:00.000Z","category":["Java","UUID"],"tag":["编程","技术"],"head":[["meta",{"name":"keywords","content":"Java, UUID, 时间基UUID, 唯一标识符, 分布式系统"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-Generating%20Time%20Based%20UUIDs.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"生成基于时间的UUID"}],["meta",{"property":"og:description","content":"生成基于时间的UUID 在本文中，我们将学习关于UUID和基于时间的UUID。 我们将看到基于时间的UUID的优势和劣势，以及何时选择它们。 我们还将探索并比较一些库，这些库将帮助我们实现生成UUID的不同算法。 UUID代表通用唯一标识符。 它是一个128位的标识符，每次生成时都预期是唯一的。 我们使用它们来唯一地识别某些事物，即使该事物没有固有的标..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T07:43:14.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"编程"}],["meta",{"property":"article:tag","content":"技术"}],["meta",{"property":"article:published_time","content":"2024-07-07T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T07:43:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"生成基于时间的UUID\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/247960f62f51e6d222ec2ed29e652eb9?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/6c3babf3d6ea5d49c2bc4e7957870d75?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2024-07-07T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T07:43:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"生成基于时间的UUID 在本文中，我们将学习关于UUID和基于时间的UUID。 我们将看到基于时间的UUID的优势和劣势，以及何时选择它们。 我们还将探索并比较一些库，这些库将帮助我们实现生成UUID的不同算法。 UUID代表通用唯一标识符。 它是一个128位的标识符，每次生成时都预期是唯一的。 我们使用它们来唯一地识别某些事物，即使该事物没有固有的标..."},"headers":[{"level":3,"title":"3. 基准测试","slug":"_3-基准测试","link":"#_3-基准测试","children":[]},{"level":3,"title":"4. UUID创建器","slug":"_4-uuid创建器","link":"#_4-uuid创建器","children":[]},{"level":3,"title":"5. Java UUID生成器（JUG）","slug":"_5-java-uuid生成器-jug","link":"#_5-java-uuid生成器-jug","children":[]},{"level":3,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720338194000,"updatedTime":1720338194000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.66,"words":1997},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-Generating Time Based UUIDs.md","localizedDate":"2024年7月7日","excerpt":"\\n<p>在本文中，我们将学习关于UUID和基于时间的UUID。</p>\\n<p><strong>我们将看到基于时间的UUID的优势和劣势，以及何时选择它们。</strong></p>\\n<p>我们还将探索并比较一些库，这些库将帮助我们实现生成UUID的不同算法。</p>\\n<p><strong>UUID代表通用唯一标识符。</strong> 它是一个128位的标识符，每次生成时都预期是唯一的。</p>\\n<p>我们使用它们来唯一地识别某些事物，即使该事物没有固有的标识符。我们可以在各种环境中使用它们，例如计算机系统、数据库和分布式系统，这些地方我们需要唯一地识别对象。</p>\\n<p>两个UUID相同的可能性如此之小，以至于被认为是统计上不可能的，这使得它们成为在分布式系统中识别对象的可靠方式。</p>","autoDesc":true}');export{d as comp,k as data};
