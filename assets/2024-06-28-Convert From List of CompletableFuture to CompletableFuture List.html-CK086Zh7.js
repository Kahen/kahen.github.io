import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CXN34Kw1.js";const e={},p=t('<h1 id="如何将completablefuture列表转换为completablefuture的列表" tabindex="-1"><a class="header-anchor" href="#如何将completablefuture列表转换为completablefuture的列表"><span>如何将CompletableFuture列表转换为CompletableFuture的列表</span></a></h1><p>在本教程中，我们将学习如何将<code>List``&lt;CompletableFuture&lt;T&gt;``&gt;</code>对象转换为<code>CompletableFuture``&lt;List&lt;T&gt;``&gt;</code>。</p><p>这种转换在许多情况下都非常有用。<strong>一个典型的例子是我们不得不对远程服务进行多次调用，这通常是一个异步操作，并将结果聚合到一个单独的<code>List</code>中</strong>。此外，我们最终等待一个单一的<code>CompletableFuture</code>对象，它在所有操作完成后提供结果列表，或者如果一个或多个操作失败则抛出异常。</p><p>我们首先看一个简单的方式来进行转换，然后看看一个更简单、更安全的方法。</p><h3 id="_2-1-实现" tabindex="-1"><a class="header-anchor" href="#_2-1-实现"><span>2.1. 实现</span></a></h3><p>首先，让我们创建一个模拟异步操作的<code>Application</code>类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Application</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ScheduledExecutorService</span> asyncOperationEmulation<span class="token punctuation">;</span>\n\n    <span class="token class-name">Application</span> <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        asyncOperationEmulation <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newScheduledThreadPool</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token class-name">CompletableFuture</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` <span class="token function">asyncOperation</span><span class="token punctuation">(</span><span class="token class-name">String</span> operationId<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">CompletableFuture</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` cf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CompletableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        asyncOperationEmulation<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            cf<span class="token punctuation">.</span><span class="token function">complete</span><span class="token punctuation">(</span>operationId<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> cf<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们创建了一个<code>Application</code>类来托管我们的测试代码和<code>asyncOperation()</code>方法，该方法简单地休眠100毫秒。我们使用一个10个线程的<code>Executor</code>来异步分发所有内容。</p><p>为了收集我们所有的操作结果，在这种情况下，是简单的<code>operationId</code>字符串，我们将使用<code>asyncOperation()</code>方法生成的<code>CompletableFuture</code>进行链式调用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">startNaive</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">List</span><span class="token operator">&lt;</span><span class="token class-name">CompletableFuture</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````<span class="token operator">&gt;</span> futures <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">String</span> operationId <span class="token operator">=</span> <span class="token string">&quot;Naive-Operation-&quot;</span> <span class="token operator">+</span> i<span class="token punctuation">;</span>\n        futures<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token function">asyncOperation</span><span class="token punctuation">(</span>operationId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token class-name">CompletableFuture</span><span class="token operator">&lt;</span><span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````<span class="token operator">&gt;</span> aggregate <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">completedFuture</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">CompletableFuture</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` future <span class="token operator">:</span> futures<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        aggregate <span class="token operator">=</span> aggregate<span class="token punctuation">.</span><span class="token function">thenCompose</span><span class="token punctuation">(</span>list <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n            list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>future<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">return</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">completedFuture</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">final</span> <span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` results <span class="token operator">=</span> aggregate<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Finished &quot;</span> <span class="token operator">+</span> results<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们首先使用静态的<code>completedFuture()</code>方法创建一个<code>CompletableFuture</code>，并提供一个空的<code>List</code>作为完成结果。使用<code>thenCompose()</code>我们创建一个<code>Runnable</code>，一旦前一个<code>future</code>完成就执行，在这个例子中是立即执行的。<strong><code>thenCompose()</code>方法返回一个新的<code>CompletableFuture</code>，它在第一个和第二个<code>future</code>都完成后解析</strong>。我们将<code>aggregate</code>引用替换为这个新的<code>future</code>对象。这允许我们在迭代<code>futures</code>列表的循环中继续链式调用这些调用。</p><p>在<code>Runnable</code>内部，我们等待<code>future</code>完成，并将结果添加到<code>list</code>中。然后我们返回一个包含该<code>list</code>的完成的<code>future</code>和结果。这将使<code>list</code>沿着<code>thenCompose()</code>链进一步传递，让我们逐个添加<code>future</code>的结果。</p><p>一旦所有<code>future</code>都被链式调用，我们调用<code>aggregate</code> <code>CompletableFuture</code>上的<code>join()</code>。这是特别为了示例，以便我们可以检索结果，并阻止主Java线程在<code>aggregate</code>完成之前退出。在真正的异步场景中，我们可能会在<code>thenAccept()</code>或<code>whenComplete()</code>调用中添加我们的回调逻辑。</p><p>需要注意的一点是我们在最后添加了一个<code>close()</code>调用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    asyncOperationEmulation<span class="token punctuation">.</span><span class="token function">shutdownNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>当应用程序退出时，关闭所有<code>Executors</code>是强制性的，否则Java进程将挂起</strong>。</p><h3 id="_2-2-实现问题" tabindex="-1"><a class="header-anchor" href="#_2-2-实现问题"><span>2.2. 实现问题</span></a></h3><p>简单的实现有一些问题。<strong>不仅<code>future</code>链式调用引入了不必要的复杂性，而且还创建了大量的不需要的对象</strong>，例如由<code>thenCompose()</code>生成的所有新的<code>CompletableFuture</code>。</p><p>另一个潜在的问题出现在我们执行大量操作时。如果一个操作失败，并且取决于Java实现如何解析<code>CompletableFuture</code>链，如果解析是递归进行的，我们可能会得到一个<code>StackOverflowError</code>。</p><p>为了测试异常场景，我们可以通过改变<code>asyncOperation()</code>方法来引入一个操作的错误：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompletableFuture</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` <span class="token function">asyncOperation</span><span class="token punctuation">(</span><span class="token class-name">String</span> operationId<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">CompletableFuture</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` cf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CompletableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    asyncOperationEmulation<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>operationId<span class="token punctuation">.</span><span class="token function">endsWith</span><span class="token punctuation">(</span><span class="token string">&quot;567&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            cf<span class="token punctuation">.</span><span class="token function">completeExceptionally</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Exception</span><span class="token punctuation">(</span><span class="token string">&quot;Error on operation &quot;</span> <span class="token operator">+</span> operationId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">return</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        cf<span class="token punctuation">.</span><span class="token function">complete</span><span class="token punctuation">(</span>operationId<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> cf<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，第567个操作的<code>future</code>将异常完成，这将使<code>aggregate.join()</code>调用也抛出运行时异常。</p><h3 id="_3-1-使用completablefuture-allof" tabindex="-1"><a class="header-anchor" href="#_3-1-使用completablefuture-allof"><span>3.1. 使用<code>CompletableFuture.allOf()</code></span></a></h3><p>一种不同的更好的方法是使用<code>CompletableFuture</code> API的<code>allOf()</code>方法。<strong>这个方法接受一个<code>CompletableFuture</code>对象数组，并创建一个新的<code>CompletableFuture</code>，当所有提供的<code>future</code>本身解析时，它就会解析</strong>。</p><p>此外，如果其中一个<code>future</code>失败，那么聚合的<code>future</code>也会失败。<strong>新<code>future</code>不包含结果列表</strong>。要获得它们，我们必须检查相应的<code>CompletableFuture</code>对象。</p><h3 id="_3-2-使用allof-的优点" tabindex="-1"><a class="header-anchor" href="#_3-2-使用allof-的优点"><span>3.2. 使用<code>allOf()</code>的优点</span></a></h3><p>基于<code>allOf()</code>的实现是处理多个异步操作的更简单、更清晰的方式，而不是<code>future</code>链式调用。聚合的<code>CompletableFuture</code>为整个操作提供了原子性，并在所有<code>future</code>成功时完成，或者当任何一个失败时失败。<strong>这保护我们免受潜在的部分处理结果的影响。</strong></p><p>**此外，它让我们以非阻塞的方式等待所有<code>future</code>完成。**注意，在示例代码中，我们为<code>listFuture</code>对象调用了<code>join()</code>，但在现实场景中，我们只依赖回调。</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们学习了如何将<code>List``&lt;CompletableFuture&lt;T&gt;``&gt;</code>转换为<code>CompletableFuture``&lt;List&lt;T&gt;``&gt;</code>。我们了解了这种转换的用途，并看到了两种实现方式，一种是简单的实现，一种是使用正确的Java API。我们讨论了前者的潜在问题以及后者如何避免它们。</p><p>如往常一样，本文的源代码可在GitHub上获得。</p>',31),o=[p];function c(l,u){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-28-Convert From List of CompletableFuture to CompletableFuture List.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-Convert%20From%20List%20of%20CompletableFuture%20to%20CompletableFuture%20List.html","title":"如何将CompletableFuture列表转换为CompletableFuture的列表","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","CompletableFuture"],"tag":["CompletableFuture","Java","异步编程"],"head":[["meta",{"name":"keywords","content":"Java, CompletableFuture, 异步编程, 转换"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-Convert%20From%20List%20of%20CompletableFuture%20to%20CompletableFuture%20List.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何将CompletableFuture列表转换为CompletableFuture的列表"}],["meta",{"property":"og:description","content":"如何将CompletableFuture列表转换为CompletableFuture的列表 在本教程中，我们将学习如何将List``<CompletableFuture<T>``>对象转换为CompletableFuture``<List<T>``>。 这种转换在许多情况下都非常有用。一个典型的例子是我们不得不对远程服务进行多次调用，这通常是一个异步操..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T11:52:42.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"CompletableFuture"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"异步编程"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T11:52:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何将CompletableFuture列表转换为CompletableFuture的列表\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T11:52:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何将CompletableFuture列表转换为CompletableFuture的列表 在本教程中，我们将学习如何将List``<CompletableFuture<T>``>对象转换为CompletableFuture``<List<T>``>。 这种转换在许多情况下都非常有用。一个典型的例子是我们不得不对远程服务进行多次调用，这通常是一个异步操..."},"headers":[{"level":3,"title":"2.1. 实现","slug":"_2-1-实现","link":"#_2-1-实现","children":[]},{"level":3,"title":"2.2. 实现问题","slug":"_2-2-实现问题","link":"#_2-2-实现问题","children":[]},{"level":3,"title":"3.1. 使用CompletableFuture.allOf()","slug":"_3-1-使用completablefuture-allof","link":"#_3-1-使用completablefuture-allof","children":[]},{"level":3,"title":"3.2. 使用allOf()的优点","slug":"_3-2-使用allof-的优点","link":"#_3-2-使用allof-的优点","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1719575562000,"updatedTime":1719575562000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.39,"words":1318},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-Convert From List of CompletableFuture to CompletableFuture List.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将学习如何将<code>List``&lt;CompletableFuture&lt;T&gt;``&gt;</code>对象转换为<code>CompletableFuture``&lt;List&lt;T&gt;``&gt;</code>。</p>\\n<p>这种转换在许多情况下都非常有用。<strong>一个典型的例子是我们不得不对远程服务进行多次调用，这通常是一个异步操作，并将结果聚合到一个单独的<code>List</code>中</strong>。此外，我们最终等待一个单一的<code>CompletableFuture</code>对象，它在所有操作完成后提供结果列表，或者如果一个或多个操作失败则抛出异常。</p>","autoDesc":true}');export{d as comp,k as data};
