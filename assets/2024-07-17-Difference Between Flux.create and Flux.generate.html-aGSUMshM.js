import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-BUAgDejY.js";const t={},p=e('<hr><h1 id="flux-create-和-flux-generate-的区别" tabindex="-1"><a class="header-anchor" href="#flux-create-和-flux-generate-的区别"><span>Flux.create 和 Flux.generate 的区别</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Project Reactor 提供了一个完全非阻塞的编程基础，适用于 JVM。它提供了响应式流规范的实现，并提供了可组合的异步 API，如 Flux。Flux 是一个响应式流发布者，可以发出 0 到 N 个元素，然后成功完成或出现错误。根据我们的需求，可以通过多种不同的方式创建它。</p><h2 id="_2-理解-flux" tabindex="-1"><a class="header-anchor" href="#_2-理解-flux"><span>2. 理解 Flux</span></a></h2><p><strong>Flux 是一个响应式流发布者，可以发出 0 到 N 个元素</strong>。它有几个操作符，用于生成、协调和转换 Flux 序列。Flux 可以成功完成或出现错误完成。</p><p>Flux API 提供了几个静态工厂方法来创建源或从几种回调类型生成。它还提供了实例方法和操作符来构建一个异步处理管道。这个管道生成了一个异步序列。</p><p>在接下来的部分，让我们看看 Flux <em>generate()</em> 和 <em>create()</em> 方法的一些用法。</p><h2 id="_3-maven-依赖" tabindex="-1"><a class="header-anchor" href="#_3-maven-依赖"><span>3. <strong>Maven 依赖</strong></span></a></h2><p>我们需要 <em>reactor-core</em> 和 <em>reactor-test</em> Maven 依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``io.projectreactor``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``reactor-core``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``3.6.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``io.projectreactor``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``reactor-test``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``3.6.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>`test`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>`\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Flux API 的 <em>generate()</em> 方法提供了一种简单直接的程序化方法来创建 Flux。<em>generate()</em> 方法接受一个生成器函数来产生一系列项目。</p><p><em>generate()</em> 方法有三个变体：</p><ul><li><em>generate(Consumer<code>&lt;SynchronousSink&lt;T&gt;</code>&gt; generator)</em></li><li><em>generate(Callable<code>&lt;S&gt;</code> stateSupplier, BiFunction<code>&lt;S, SynchronousSink&lt;T&gt;</code>, S&gt; generator)</em></li><li><em>generate(Callable<code>&lt;S&gt;</code> stateSupplier, BiFunction<code>&lt;S, SynchronousSink&lt;T&gt;</code>, S&gt; generator, Consumer<code>&lt;? super S&gt;</code> stateConsumer)</em></li></ul><p><strong>generate 方法按需计算并发出值</strong>。在计算可能不会被下游使用的元素成本过高的情况下，建议使用它。如果发出的事件受到应用程序状态的影响，也可以使用它。</p><h3 id="_4-1-示例" tabindex="-1"><a class="header-anchor" href="#_4-1-示例"><span>4.1. 示例</span></a></h3><p>在这个示例中，我们使用 <em>generate(Callable<code>&lt;S&gt;</code> stateSupplier, BiFunction<code>&lt;S, SynchronousSink&lt;T&gt;</code>, S&gt; generator)</em> 生成一个 <em>Flux</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CharacterGenerator</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">Flux</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">&gt;</span></span>`````` <span class="token function">generateCharacters</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\n        <span class="token keyword">return</span> <span class="token class-name">Flux</span><span class="token punctuation">.</span><span class="token function">generate</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token number">97</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>state<span class="token punctuation">,</span> sink<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n            <span class="token keyword">char</span> value <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> state<span class="token punctuation">.</span><span class="token function">intValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            sink<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">==</span> <span class="token char">&#39;z&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                sink<span class="token punctuation">.</span><span class="token function">complete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n            <span class="token keyword">return</span> state <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <em>generate()</em> 方法中，我们提供了两个函数作为参数：</p><ul><li>第一个是一个 <em>Callable</em> 函数。这个函数定义了生成器的初始状态，值为 97</li><li>第二个是一个 <em>BiFunction</em>。这是一个生成器函数，它使用一个 <em>SynchronousSink</em>。这个 SynchronousSink 每次调用 sink 的 <em>next</em> 方法时返回一个项目</li></ul><p>根据其名称，一个 <em>SynchronousSink</em> 实例同步工作。然而，<strong>我们不能在每次生成器调用中多次调用 SynchronousSink 对象的 <em>next</em> 方法</strong>。</p><p>让我们使用 <em>StepVerifier</em> 验证生成的序列：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenGeneratingCharacters_thenCharactersAreProduced</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">CharacterGenerator</span> characterGenerator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CharacterGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Flux</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">&gt;</span></span>`````` characterFlux <span class="token operator">=</span> characterGenerator<span class="token punctuation">.</span><span class="token function">generateCharacters</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">take</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">StepVerifier</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>characterFlux<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">expectNext</span><span class="token punctuation">(</span><span class="token char">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;b&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;c&#39;</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">expectComplete</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">verify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，订阅者只请求三个项目。因此，生成的序列通过发出三个字符——a、b 和 c 来结束。<em>expectNext()</em> 期望我们从 Flux 中得到的元素。<em>expectComplete()</em> 表示从 Flux 发出的元素完成。</p><h2 id="_5-flux-create" tabindex="-1"><a class="header-anchor" href="#_5-flux-create"><span>5. Flux Create</span></a></h2><p><strong>当我们想要计算多个（0 到无穷大）不受应用程序状态影响的值时，使用 Flux 的 <em>create()</em> 方法</strong>。这是因为 Flux <em>create()</em> 方法的底层方法会持续计算元素。此外，下游系统决定它需要多少元素。因此，如果下游系统跟不上，已经发出的元素要么被缓冲，要么被移除。</p><p>默认情况下，发出的元素被缓冲，直到下游系统请求更多的元素。</p><h3 id="_5-1-示例" tabindex="-1"><a class="header-anchor" href="#_5-1-示例"><span>5.1. 示例</span></a></h3><p>让我们现在演示 <em>create()</em> 方法的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CharacterCreator</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token class-name">Consumer</span><span class="token operator">&lt;</span><span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">&gt;</span></span>``````<span class="token operator">&gt;</span> consumer<span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">Flux</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">&gt;</span></span>`````` <span class="token function">createCharacterSequence</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token class-name">Flux</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>sink <span class="token operator">-&gt;</span> <span class="token class-name">CharacterCreator</span><span class="token punctuation">.</span><span class="token keyword">this</span><span class="token punctuation">.</span>consumer <span class="token operator">=</span> items <span class="token operator">-&gt;</span> items<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>sink<span class="token operator">::</span><span class="token function">next</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以注意到 <em>create</em> 操作符要求我们提供一个 <em>FluxSink</em> 而不是 <em>generate</em>() 中使用的 <em>SynchronousSink</em>。在这种情况下，我们将为列表中的每个项目调用 <em>next()</em>，逐个发出每个项目。</p><p>现在让我们使用两个字符序列：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenCreatingCharactersWithMultipleThreads_thenSequenceIsProducedAsynchronously</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>\n    <span class="token class-name">CharacterGenerator</span> characterGenerator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CharacterGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">&gt;</span></span>`````` sequence1 <span class="token operator">=</span> characterGenerator<span class="token punctuation">.</span><span class="token function">generateCharacters</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">take</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collectList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">block</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">&gt;</span></span>`````` sequence2 <span class="token operator">=</span> characterGenerator<span class="token punctuation">.</span><span class="token function">generateCharacters</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">take</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collectList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">block</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在上面的代码片段中创建了两个序列——<em>sequence1</em> 和 <em>sequence2</em>。这些序列作为字符项目的源。注意我们使用 <em>CharacterGenerator</em> 实例来获取字符序列。</p><p>现在让我们定义一个 <em>characterCreator</em> 实例和两个线程实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CharacterCreator</span> characterCreator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CharacterCreator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Thread</span> producerThread1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> characterCreator<span class="token punctuation">.</span>consumer<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span>sequence1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Thread</span> producerThread2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> characterCreator<span class="token punctuation">.</span>consumer<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span>sequence2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们现在创建了两个线程实例，它们将向发布者提供元素。当调用 accept 操作符时，字符元素开始流入序列源。接下来，我们 <em>subscribe</em> 到新的合并序列：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">&gt;</span></span>`````` consolidated <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ncharacterCreator<span class="token punctuation">.</span><span class="token function">createCharacterSequence</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span>consolidated<span class="token operator">::</span><span class="token function">add</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注意 <em>createCharacterSequence</em> 返回一个 Flux，我们订阅了它，并在 <em>consolidated</em> 列表中消费元素。接下来，让我们触发整个过程，看到项目在两个不同的线程上移动：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>producerThread1<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nproducerThread2<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nproducerThread1<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nproducerThread2<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们验证操作的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span>consolidated<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactlyInAnyOrder</span><span class="token punctuation">(</span><span class="token char">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;b&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;c&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;b&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接收到的序列中的前三个字符来自 <em>sequence1</em>。最后两个字符来自 <em>sequence2</em>。由于这是一个异步操作，这些序列中的元素顺序不能保证。</p><h2 id="_6-flux-create-与-flux-generate" tabindex="-1"><a class="header-anchor" href="#_6-flux-create-与-flux-generate"><span>6. Flux Create 与 Flux Generate</span></a></h2><p>以下是 create 和 generate 操作之间的一些区别：</p><table><thead><tr><th>Flux Create</th><th>Flux Generate</th></tr></thead><tbody><tr><td>此方法接受一个 <em>Consumer<code>&lt;FluxSink&gt;</code></em> 实例</td><td>此方法接受一个 <em>Consumer<code>&lt;SynchronousSink&gt;</code></em> 实例</td></tr><tr><td>Create 方法只调用一次消费者</td><td>Generate 方法根据下游应用程序的需要多次调用消费者方法</td></tr><tr><td>消费者可以立即发出 0..N 个元素</td><td>只能发出一个元素</td></tr><tr><td>发布者不了解下游状态。因此 create 接受一个额外的 Overflow 策略参数用于流量控制</td><td>发布者根据下游应用程序的需要生成元素</td></tr><tr><td><em>FluxSink</em> 允许我们在需要时使用多个线程发出元素</td><td>对于多个线程没有用，因为它一次只能发出一个元素</td></tr></tbody></table><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们讨论了 Flux API 的 create 和 generate 方法之间的区别。</p><p>首先，我们介绍了响应式编程的概念，并讨论了 Flux API。然后，我们讨论了 Flux API 的 create 和 generate 方法。最后，我们提供了 Flux API 的 create 和 generate 方法之间的差异列表。</p><p>本教程的源代码可在 GitHub 上获取。</p>',50),c=[p];function o(l,u){return s(),a("div",null,c)}const k=n(t,[["render",o],["__file","2024-07-17-Difference Between Flux.create and Flux.generate.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-Difference%20Between%20Flux.create%20and%20Flux.generate.html","title":"Flux.create 和 Flux.generate 的区别","lang":"zh-CN","frontmatter":{"date":"2024-07-18T00:00:00.000Z","category":["Java","Reactive Programming"],"tag":["Project Reactor","Flux"],"head":[["meta",{"name":"keywords","content":"Java, Reactive Programming, Project Reactor, Flux"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-Difference%20Between%20Flux.create%20and%20Flux.generate.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Flux.create 和 Flux.generate 的区别"}],["meta",{"property":"og:description","content":"Flux.create 和 Flux.generate 的区别 1. 引言 Project Reactor 提供了一个完全非阻塞的编程基础，适用于 JVM。它提供了响应式流规范的实现，并提供了可组合的异步 API，如 Flux。Flux 是一个响应式流发布者，可以发出 0 到 N 个元素，然后成功完成或出现错误。根据我们的需求，可以通过多种不同的方式创..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T17:30:29.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Project Reactor"}],["meta",{"property":"article:tag","content":"Flux"}],["meta",{"property":"article:published_time","content":"2024-07-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T17:30:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Flux.create 和 Flux.generate 的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-18T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T17:30:29.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Flux.create 和 Flux.generate 的区别 1. 引言 Project Reactor 提供了一个完全非阻塞的编程基础，适用于 JVM。它提供了响应式流规范的实现，并提供了可组合的异步 API，如 Flux。Flux 是一个响应式流发布者，可以发出 0 到 N 个元素，然后成功完成或出现错误。根据我们的需求，可以通过多种不同的方式创..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 理解 Flux","slug":"_2-理解-flux","link":"#_2-理解-flux","children":[]},{"level":2,"title":"3. Maven 依赖","slug":"_3-maven-依赖","link":"#_3-maven-依赖","children":[{"level":3,"title":"4.1. 示例","slug":"_4-1-示例","link":"#_4-1-示例","children":[]}]},{"level":2,"title":"5. Flux Create","slug":"_5-flux-create","link":"#_5-flux-create","children":[{"level":3,"title":"5.1. 示例","slug":"_5-1-示例","link":"#_5-1-示例","children":[]}]},{"level":2,"title":"6. Flux Create 与 Flux Generate","slug":"_6-flux-create-与-flux-generate","link":"#_6-flux-create-与-flux-generate","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1721237429000,"updatedTime":1721237429000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.3,"words":1589},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-Difference Between Flux.create and Flux.generate.md","localizedDate":"2024年7月18日","excerpt":"<hr>\\n<h1>Flux.create 和 Flux.generate 的区别</h1>\\n<h2>1. 引言</h2>\\n<p>Project Reactor 提供了一个完全非阻塞的编程基础，适用于 JVM。它提供了响应式流规范的实现，并提供了可组合的异步 API，如 Flux。Flux 是一个响应式流发布者，可以发出 0 到 N 个元素，然后成功完成或出现错误。根据我们的需求，可以通过多种不同的方式创建它。</p>\\n<h2>2. 理解 Flux</h2>\\n<p><strong>Flux 是一个响应式流发布者，可以发出 0 到 N 个元素</strong>。它有几个操作符，用于生成、协调和转换 Flux 序列。Flux 可以成功完成或出现错误完成。</p>","autoDesc":true}');export{k as comp,d as data};
