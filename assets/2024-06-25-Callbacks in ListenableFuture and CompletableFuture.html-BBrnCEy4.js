import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-CE5go3V-.js";const t={},p=e(`<hr><h1 id="java中listenablefuture和completablefuture的回调机制" tabindex="-1"><a class="header-anchor" href="#java中listenablefuture和completablefuture的回调机制"><span>Java中ListenableFuture和CompletableFuture的回调机制</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p><em>ListenableFuture</em> 和 <em>CompletableFuture</em> 都是基于 Java 的 <em>Future</em> 接口构建的。前者是 Google 的 Guava 库的一部分，而后者则是 Java 8 的一部分。</p><p>众所周知，<strong><em>Future</em> 接口不提供回调功能</strong>。<strong><em>ListenableFuture</em> 和 <em>CompletableFuture</em> 都填补了这一空白</strong>。在本教程中，我们将学习如何使用它们进行回调机制。</p><h2 id="_2-异步任务中的回调" tabindex="-1"><a class="header-anchor" href="#_2-异步任务中的回调"><span>2. 异步任务中的回调</span></a></h2><p>让我们定义一个用例，我们需要从远程服务器下载图像文件，并将图像文件的名称保存到数据库中。由于此任务包括网络操作并消耗时间，它是使用 Java 异步能力的完美案例。</p><p>我们可以创建一个函数，从远程服务器下载文件，并附加一个监听器，当下载完成后将数据推送到数据库。</p><p>让我们看看如何使用 <em>ListenableFuture</em> 和 <em>CompletableFuture</em> 来实现这项任务。</p><h2 id="_3-listenablefuture-中的回调" tabindex="-1"><a class="header-anchor" href="#_3-listenablefuture-中的回调"><span>3. ListenableFuture 中的回调</span></a></h2><p>让我们首先在 <em>pom.xml</em> 中添加 Google 的 Guava 库依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`com.google.guava\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`guava\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`32.1.3-jre\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们模仿一个从远程 Web 服务器下载文件的 <em>Future</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ExecutorService</span> executorService <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ListeningExecutorService</span> pool <span class="token operator">=</span> <span class="token class-name">MoreExecutors</span><span class="token punctuation">.</span><span class="token function">listeningDecorator</span><span class="token punctuation">(</span>executorService<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ListenableFuture</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` listenableFuture <span class="token operator">=</span> pool<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token function">downloadFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Callable</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` <span class="token function">downloadFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 通过添加睡眠调用来模拟文件下载</span>
    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token string">&quot;pic.jpg&quot;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码创建了一个 <em>ExecutorService</em>，它被包裹在 <em>MoreExecutors</em> 中以创建一个线程池。在 <em>ListenableFutureService</em> 的 submit 方法中，我们传递了一个下载文件并返回文件名称的 <em>Callable<code>&lt;String&gt;</code></em>，它返回一个 <em>ListenableFuture</em>。</p><p>要附加一个回调到 <em>ListenableFuture</em> 实例，Guava 在 <em>Future</em> 中提供了一个实用方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Futures</span><span class="token punctuation">.</span><span class="token function">addCallback</span><span class="token punctuation">(</span>
    listenableFuture<span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">FutureCallback</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">&gt;</span></span>\`<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onSuccess</span><span class="token punctuation">(</span><span class="token class-name">String</span> fileName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 将 fileName 推送到数据库的代码</span>
        <span class="token punctuation">}</span>

        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onFailure</span><span class="token punctuation">(</span><span class="token class-name">Throwable</span> throwable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 当出现错误时采取适当行动的代码</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    executorService<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个回调中，成功和异常场景都得到了处理。使用回调的方式非常自然。</p><p>我们还可以通过直接将其添加到 <em>ListenableFuture</em> 来<strong>添加一个监听器</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>listenableFuture<span class="token punctuation">.</span><span class="token function">addListener</span><span class="token punctuation">(</span>
    <span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 下载文件的逻辑</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    executorService
<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个回调没有访问 <em>Future</em> 的结果，因为它的输入是 <em>Runnable.</em> 这个回调方法无论 <em>Future</em> 成功完成还是失败都会执行。</p><p>在了解了 <em>ListenableFuture</em> 中的回调之后，下一节将探索 <em>CompletableFuture</em> 中实现相同功能的方法。</p><h2 id="_4-completablefuture-中的回调" tabindex="-1"><a class="header-anchor" href="#_4-completablefuture-中的回调"><span>4. CompletableFuture 中的回调</span></a></h2><p>在 <em>CompletableFuture</em> 中，有多种方法可以附加回调。最受欢迎的方法是使用链式方法，如 <em>thenApply()</em>、<em>thenAccept()</em>、<em>thenCompose()</em>、<em>exceptionally()</em> 等，这些方法正常或异常执行。</p><p>在这一部分，我们将学习 <em>whenComplete()</em> 方法。这个方法最好的地方在于，它可以被任何想要完成它的线程完成。使用上述文件下载示例，让我们看看如何使用 <em>whenComplete()</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompletableFuture</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` completableFuture <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CompletableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Runnable</span> runnable <span class="token operator">=</span> <span class="token function">downloadFile</span><span class="token punctuation">(</span>completableFuture<span class="token punctuation">)</span><span class="token punctuation">;</span>
completableFuture<span class="token punctuation">.</span><span class="token function">whenComplete</span><span class="token punctuation">(</span>
  <span class="token punctuation">(</span>res<span class="token punctuation">,</span> error<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>error <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 处理异常场景</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>res <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 将数据发送到数据库</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>runnable<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Runnable</span> <span class="token function">downloadFile</span><span class="token punctuation">(</span><span class="token class-name">CompletableFuture</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` completableFuture<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
          <span class="token comment">// 下载文件的逻辑；</span>
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;exception is {} &quot;</span> <span class="token operator">+</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      completableFuture<span class="token punctuation">.</span><span class="token function">complete</span><span class="token punctuation">(</span><span class="token string">&quot;pic.jpg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当文件下载完成时，<em>whenComplete()</em> 方法执行成功或失败条件。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了 <em>ListenableFuture</em> 和 <em>CompletableFuture</em> 中的回调机制。</p><p>我们看到，与 <em>CompletableFuture</em> 相比，<strong><em>ListenableFuture</em> 是一个更自然和流畅的回调 API。</strong></p><p>我们可以自由选择最适合我们用例的，因为 <strong><em>CompletableFuture</em> 是 Java 核心库的一部分，而 <em>ListenableFuture</em> 是非常流行的 Guava 库的一部分。</strong></p><p>本文中使用的所有代码示例都可以在 GitHub 上找到。</p>`,32),l=[p];function o(c,u){return s(),a("div",null,l)}const m=n(t,[["render",o],["__file","2024-06-25-Callbacks in ListenableFuture and CompletableFuture.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-25/2024-06-25-Callbacks%20in%20ListenableFuture%20and%20CompletableFuture.html","title":"Java中ListenableFuture和CompletableFuture的回调机制","lang":"zh-CN","frontmatter":{"date":"2024-06-26T00:00:00.000Z","category":["Java","Concurrency"],"tag":["ListenableFuture","CompletableFuture"],"head":[["meta",{"name":"keywords","content":"Java, Future, Callbacks, Concurrency"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-25/2024-06-25-Callbacks%20in%20ListenableFuture%20and%20CompletableFuture.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中ListenableFuture和CompletableFuture的回调机制"}],["meta",{"property":"og:description","content":"Java中ListenableFuture和CompletableFuture的回调机制 1. 概述 ListenableFuture 和 CompletableFuture 都是基于 Java 的 Future 接口构建的。前者是 Google 的 Guava 库的一部分，而后者则是 Java 8 的一部分。 众所周知，Future 接口不提供回调功..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-25T22:51:08.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"ListenableFuture"}],["meta",{"property":"article:tag","content":"CompletableFuture"}],["meta",{"property":"article:published_time","content":"2024-06-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-25T22:51:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中ListenableFuture和CompletableFuture的回调机制\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-25T22:51:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中ListenableFuture和CompletableFuture的回调机制 1. 概述 ListenableFuture 和 CompletableFuture 都是基于 Java 的 Future 接口构建的。前者是 Google 的 Guava 库的一部分，而后者则是 Java 8 的一部分。 众所周知，Future 接口不提供回调功..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 异步任务中的回调","slug":"_2-异步任务中的回调","link":"#_2-异步任务中的回调","children":[]},{"level":2,"title":"3. ListenableFuture 中的回调","slug":"_3-listenablefuture-中的回调","link":"#_3-listenablefuture-中的回调","children":[]},{"level":2,"title":"4. CompletableFuture 中的回调","slug":"_4-completablefuture-中的回调","link":"#_4-completablefuture-中的回调","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719355868000,"updatedTime":1719355868000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.12,"words":936},"filePathRelative":"posts/baeldung/2024-06-25/2024-06-25-Callbacks in ListenableFuture and CompletableFuture.md","localizedDate":"2024年6月26日","excerpt":"<hr>\\n<h1>Java中ListenableFuture和CompletableFuture的回调机制</h1>\\n<h2>1. 概述</h2>\\n<p><em>ListenableFuture</em> 和 <em>CompletableFuture</em> 都是基于 Java 的 <em>Future</em> 接口构建的。前者是 Google 的 Guava 库的一部分，而后者则是 Java 8 的一部分。</p>\\n<p>众所周知，<strong><em>Future</em> 接口不提供回调功能</strong>。<strong><em>ListenableFuture</em> 和 <em>CompletableFuture</em> 都填补了这一空白</strong>。在本教程中，我们将学习如何使用它们进行回调机制。</p>","autoDesc":true}');export{m as comp,d as data};
