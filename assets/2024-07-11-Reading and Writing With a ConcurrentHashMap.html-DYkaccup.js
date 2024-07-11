import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-uizvaz9h.js";const p={},e=t('<h1 id="concurrenthashmap的读写操作" tabindex="-1"><a class="header-anchor" href="#concurrenthashmap的读写操作"><span>ConcurrentHashMap的读写操作</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将学习如何使用ConcurrentHashMap类以线程安全的方式从哈希表数据结构中读写数据。</p><h2 id="_2-概览" tabindex="-1"><a class="header-anchor" href="#_2-概览"><span>2. 概览</span></a></h2><p>ConcurrentHashMap是ConcurrentMap接口的一种实现，并且是Java提供的线程安全集合之一。它由一个常规映射支持，并且与Hashtable的工作方式类似，我们将在后续部分介绍一些细微差别。</p><h3 id="_2-2-有用的方法" tabindex="-1"><a class="header-anchor" href="#_2-2-有用的方法"><span>2.2. 有用的方法</span></a></h3><p>ConcurrentHashMap API规范提供了实用的方法来操作集合。在本教程中，我们将主要看两个方法：</p><ul><li>get(K key): 检索给定键的元素。这是我们的读取方法。</li><li>computeIfPresent(K key, BiFunction<code>&lt;K, V, V&gt;</code> remappingFunction): 如果给定的键存在，则将remappingFunction应用于给定键的值。</li></ul><p>我们将在第3节中看到这些方法的实际应用。</p><h3 id="_2-2-为什么要使用concurrenthashmap" tabindex="-1"><a class="header-anchor" href="#_2-2-为什么要使用concurrenthashmap"><span>2.2. 为什么要使用ConcurrentHashMap</span></a></h3><p>ConcurrentHashMap和常规HashMap的主要区别在于，前者实现了读取操作的完全并发性和写入操作的高并发性。</p><p><strong>读取操作保证不会被阻塞或阻塞键。写入操作在映射Entry级别被阻塞并阻塞其他写入。</strong> 这两个概念在我们要实现高吞吐量和最终一致性的环境中非常重要。</p><p>HashTable和Collections.synchronizedMap集合也实现了读取和写入的并发性。而，它们效率较低，因为它们锁定了整个集合，而不是仅仅锁定线程正在写入的Entry。</p><p>另一方面，<strong>ConcurrentHashMap类在映射Entry级别上锁定。</strong> 因此，其他线程不会被阻止在其他映射键上写入。因此，在多线程环境中，为了实现高吞吐量，ConcurrentHashMap是比HashTable和synchronizedMap集合更好的选择。</p><h2 id="_3-线程安全操作" tabindex="-1"><a class="header-anchor" href="#_3-线程安全操作"><span>3. 线程安全操作</span></a></h2><p>ConcurrentHashMap实现了大多数代码需要被认为是线程安全的保证。这有助于避免Java中的一些常见并发陷阱。</p><p>为了说明ConcurrentHashMap在多线程环境中的工作方式，我们将使用一个Java测试，该测试检索并更新给定数字的频率。让我们首先定义测试的基本结构：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConcurrentHashMapUnitTest</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">Map</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>` frequencyMap<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@BeforeEach</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        frequencyMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        frequencyMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        frequencyMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        frequencyMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@AfterEach</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">teardown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        frequencyMap<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token keyword">int</span> timeout<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">try</span> <span class="token punctuation">{</span>\n            <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述类定义了数字的频率映射，一个setup方法来用初始值填充它，一个teardown方法来清除其内容，以及一个sleep助手方法来处理InterruptedException。</p><h3 id="_3-1-读取" tabindex="-1"><a class="header-anchor" href="#_3-1-读取"><span>3.1. 读取</span></a></h3><p>ConcurrentHashMap允许完全的读取并发，这意味着<strong>任意数量的线程可以同时读取同一个键</strong>。这也意味着读取不会阻塞，也不会被写入操作阻塞。因此，从映射中读取可能会得到“旧的”或不一致的值。</p><p>让我们看一个例子，其中一个线程正在写入一个键，第二个线程在写入完成之前读取，第三个线程在写入完成后读取：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenOneThreadIsWriting_whenAnotherThreadReads_thenGetCorrectValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ExecutorService</span> threadExecutor <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Runnable</span> writeAfter1Sec <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> frequencyMap<span class="token punctuation">.</span><span class="token function">computeIfPresent</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>k<span class="token punctuation">,</span> v<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> frequencyMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Callable</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`````` readNow <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> frequencyMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Callable</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`````` readAfter1001Ms <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1001</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> frequencyMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    threadExecutor<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span>writeAfter1Sec<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">List</span><span class="token operator">&lt;</span><span class="token class-name">Future</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``````<span class="token operator">&gt;</span> results <span class="token operator">=</span> threadExecutor<span class="token punctuation">.</span><span class="token function">invokeAll</span><span class="token punctuation">(</span><span class="token function">asList</span><span class="token punctuation">(</span>readNow<span class="token punctuation">,</span> readAfter1001Ms<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> results<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> results<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>threadExecutor<span class="token punctuation">.</span><span class="token function">awaitTermination</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        threadExecutor<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们更仔细地看看上述代码中发生了什么：</p><ol><li>我们首先定义了一个ExecutorService，一个写入线程和两个读取线程。写入操作需要一秒钟才能完成。因此，在那之前的所有读取应该得到旧的结果。在那之后（在这个例子中恰好一毫秒后）的任何读取都应该得到更新后的值。</li><li>然后，我们使用invokeAll调用所有读取线程，并将结果按顺序收集到列表中。因此，列表的零位置指的是第一次读取，位置一指的是第二次读取。</li><li>最后，我们使用assertEquals验证已完成任务的结果，并关闭ExecutorService。</li></ol><p>从这段代码中，我们得出结论，即使其他线程同时在同一个资源上写入，读取也不会被阻塞。如果我们将读取和写入想象为事务，<strong>ConcurrentHashMap实现了读取的最终一致性</strong>。这意味着我们不总是读取到一个一致的值（最新的），但是一旦映射停止接收写入，然后读取再次变得一致。有关最终一致性的更多详细信息，请查看有关事务的介绍。</p><p>提示：如果您还希望使读取被阻塞并被其他读取阻塞，请不要使用get()方法。相反，您可以实现一个恒等BiFunction，它在给定键上返回未修改的值，并将该函数传递给computeIfPresent方法。使用它，我们将牺牲读取速度以防止读取旧的或不一致的值的问题。</p><h3 id="_3-2-写入" tabindex="-1"><a class="header-anchor" href="#_3-2-写入"><span>3.2. 写入</span></a></h3><p>正如前面提到的，ConcurrentHashMap实现了部分写入并发性，它在同一个映射键上阻塞其他写入，并允许对不同键的写入。</p><p><strong>这对于在多线程环境中实现高吞吐量和写入一致性至关重要。</strong> 为了说明一致性，让我们定义一个测试，其中两个线程在同一资源上写入，并检查映射如何处理：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenOneThreadIsWriting_whenAnotherThreadWritesAtSameKey_thenWaitAndGetCorrectValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ExecutorService</span> threadExecutor <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Callable</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`````` writeAfter5Sec <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> frequencyMap<span class="token punctuation">.</span><span class="token function">computeIfPresent</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>k<span class="token punctuation">,</span> v<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> frequencyMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Callable</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`````` writeAfter1Sec <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> frequencyMap<span class="token punctuation">.</span><span class="token function">computeIfPresent</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>k<span class="token punctuation">,</span> v<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> frequencyMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">List</span><span class="token operator">&lt;</span><span class="token class-name">Future</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``````<span class="token operator">&gt;</span> results <span class="token operator">=</span> threadExecutor<span class="token punctuation">.</span><span class="token function">invokeAll</span><span class="token punctuation">(</span><span class="token function">asList</span><span class="token punctuation">(</span>writeAfter5Sec<span class="token punctuation">,</span> writeAfter1Sec<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> results<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> results<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>threadExecutor<span class="token punctuation">.</span><span class="token function">awaitTermination</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        threadExecutor<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述测试显示了两个写入线程被提交到ExecutorService。先来的线程需要五秒钟来写入，第二个线程需要一秒钟来写入。第一个线程获取锁并阻塞任何其他在映射键1上的写入活动。因此，第二个线程必须等待五秒钟，直到第一个线程释放锁。第一个写入完成后，第二个线程得到最新值并在一秒钟内更新它。</p><p>来自ExecutorService的结果列表按任务提交的顺序排列，所以第一个元素应该返回1，第二个应该返回2。</p><p>ConcurrentHashMap的另一个用例是在不同映射键上实现高写入吞吐量。让我们用另一个单元测试来说明这一点，该测试使用两个写入线程来更新映射中的不同键：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenOneThreadIsWriting_whenAnotherThreadWritesAtDifferentKey_thenNotWaitAndGetCorrectValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ExecutorService</span> threadExecutor <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Callable</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`````` writeAfter5Sec <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> frequencyMap<span class="token punctuation">.</span><span class="token function">computeIfPresent</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>k<span class="token punctuation">,</span> v<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> frequencyMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">AtomicLong</span> time <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicLong</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Callable</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`````` writeAfter1Sec <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> frequencyMap<span class="token punctuation">.</span><span class="token function">computeIfPresent</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>k<span class="token punctuation">,</span> v<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        time<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> time<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> frequencyMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    threadExecutor<span class="token punctuation">.</span><span class="token function">invokeAll</span><span class="token punctuation">(</span><span class="token function">asList</span><span class="token punctuation">(</span>writeAfter5Sec<span class="token punctuation">,</span> writeAfter1Sec<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>threadExecutor<span class="token punctuation">.</span><span class="token function">awaitTermination</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        threadExecutor<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该测试验证了第二个线程不需要等待第一个线程的完成，因为写入发生在不同的映射键上。因此，第二个写入应该只需要一秒钟就可以完成。<strong>在ConcurrentHashMap中，线程可以在不同的映射条目中同时工作，并且与其他线程安全结构相比，并发写入操作更快。</strong></p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2>',37),c=[e];function o(u,l){return a(),s("div",null,c)}const k=n(p,[["render",o],["__file","2024-07-11-Reading and Writing With a ConcurrentHashMap.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Reading%20and%20Writing%20With%20a%20ConcurrentHashMap.html","title":"ConcurrentHashMap的读写操作","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Concurrency"],"tag":["ConcurrentHashMap","Java","Thread-Safe"],"head":[["meta",{"name":"keywords","content":"Java, Concurrency, ConcurrentHashMap, Thread-Safe"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Reading%20and%20Writing%20With%20a%20ConcurrentHashMap.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"ConcurrentHashMap的读写操作"}],["meta",{"property":"og:description","content":"ConcurrentHashMap的读写操作 1. 引言 在本教程中，我们将学习如何使用ConcurrentHashMap类以线程安全的方式从哈希表数据结构中读写数据。 2. 概览 ConcurrentHashMap是ConcurrentMap接口的一种实现，并且是Java提供的线程安全集合之一。它由一个常规映射支持，并且与Hashtable的工作方式..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T06:02:33.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"ConcurrentHashMap"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Thread-Safe"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T06:02:33.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ConcurrentHashMap的读写操作\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T06:02:33.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"ConcurrentHashMap的读写操作 1. 引言 在本教程中，我们将学习如何使用ConcurrentHashMap类以线程安全的方式从哈希表数据结构中读写数据。 2. 概览 ConcurrentHashMap是ConcurrentMap接口的一种实现，并且是Java提供的线程安全集合之一。它由一个常规映射支持，并且与Hashtable的工作方式..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 概览","slug":"_2-概览","link":"#_2-概览","children":[{"level":3,"title":"2.2. 有用的方法","slug":"_2-2-有用的方法","link":"#_2-2-有用的方法","children":[]},{"level":3,"title":"2.2. 为什么要使用ConcurrentHashMap","slug":"_2-2-为什么要使用concurrenthashmap","link":"#_2-2-为什么要使用concurrenthashmap","children":[]}]},{"level":2,"title":"3. 线程安全操作","slug":"_3-线程安全操作","link":"#_3-线程安全操作","children":[{"level":3,"title":"3.1. 读取","slug":"_3-1-读取","link":"#_3-1-读取","children":[]},{"level":3,"title":"3.2. 写入","slug":"_3-2-写入","link":"#_3-2-写入","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720677753000,"updatedTime":1720677753000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.02,"words":1806},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Reading and Writing With a ConcurrentHashMap.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将学习如何使用ConcurrentHashMap类以线程安全的方式从哈希表数据结构中读写数据。</p>\\n<h2>2. 概览</h2>\\n<p>ConcurrentHashMap是ConcurrentMap接口的一种实现，并且是Java提供的线程安全集合之一。它由一个常规映射支持，并且与Hashtable的工作方式类似，我们将在后续部分介绍一些细微差别。</p>\\n<h3>2.2. 有用的方法</h3>\\n<p>ConcurrentHashMap API规范提供了实用的方法来操作集合。在本教程中，我们将主要看两个方法：</p>\\n<ul>\\n<li>get(K key): 检索给定键的元素。这是我们的读取方法。</li>\\n<li>computeIfPresent(K key, BiFunction<code>&lt;K, V, V&gt;</code> remappingFunction): 如果给定的键存在，则将remappingFunction应用于给定键的值。</li>\\n</ul>","autoDesc":true}');export{k as comp,d as data};
