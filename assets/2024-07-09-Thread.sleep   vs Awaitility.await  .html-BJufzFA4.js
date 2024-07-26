import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DpYLEM_u.js";const p={},e=t(`<h1 id="java中的thread-sleep-与awaitility-await-比较" tabindex="-1"><a class="header-anchor" href="#java中的thread-sleep-与awaitility-await-比较"><span>Java中的Thread.sleep()与Awaitility.await()比较</span></a></h1><p>在本教程中，我们将比较Java中处理异步操作的两种方式。首先，我们将看看Thread的sleep()方法是如何工作的。然后，我们将尝试使用Awaitility库提供的功能来实现相同的功能。在这个过程中，我们将看到这些解决方案的比较，以及哪一种更适合我们的用例。</p><h2 id="_2-使用场景" tabindex="-1"><a class="header-anchor" href="#_2-使用场景"><span>2. 使用场景</span></a></h2><p>sleep()和await()方法在我们需要等待异步操作完成时特别有用。例如，我们的应用程序可能会向消息代理或队列发送消息。在这种情况下，我们不知道消息何时在另一端被接收。另一个用例可以是调用API端点并等待特定结果。例如，我们向服务发送请求，它启动了一个长时间运行的任务，我们等待它完成。</p><p>在我们的示例应用程序中，我们将创建一个简单的服务来跟踪我们的请求状态。我们将检查在给定时间后请求是否处于所需状态。</p><h2 id="_3-应用程序设置" tabindex="-1"><a class="header-anchor" href="#_3-应用程序设置"><span>3. 应用程序设置</span></a></h2><p>让我们创建一个处理请求的异步服务。我们还需要一种方法来获取这些请求的状态，以便之后能够验证它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RequestProcessor</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Map</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` requestStatuses <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">processRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> requestId <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        requestStatuses<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>requestId<span class="token punctuation">,</span> <span class="token string">&quot;PROCESSING&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">ScheduledExecutorService</span> executorService <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newSingleThreadScheduledExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        executorService<span class="token punctuation">.</span><span class="token function">schedule</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            requestStatuses<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>requestId<span class="token punctuation">,</span> <span class="token string">&quot;DONE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token function">getRandomNumberBetween</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> requestId<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getStatus</span><span class="token punctuation">(</span><span class="token class-name">String</span> requestId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> requestStatuses<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>requestId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token function">getRandomNumberBetween</span><span class="token punctuation">(</span><span class="token keyword">int</span> min<span class="token punctuation">,</span> <span class="token keyword">int</span> max<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Random</span> random <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> random<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span>max <span class="token operator">-</span> min<span class="token punctuation">)</span> <span class="token operator">+</span> min<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此服务使用Java的ScheduledExecutorService来延迟一个命令，将请求状态更改为“DONE”。它在半秒到两秒之间等待一个随机的时间。</p><h2 id="_4-纯java" tabindex="-1"><a class="header-anchor" href="#_4-纯java"><span>4. 纯Java</span></a></h2><p>首先，让我们使用纯Java方法并暂停线程的执行。</p><p>**在这种情况下，我们可以设置我们想要等待的时间（以毫秒为单位）。**让我们创建我们的测试类和第一个单元测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@DisplayName</span><span class="token punctuation">(</span><span class="token string">&quot;请求处理器&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RequestProcessorUnitTest</span> <span class="token punctuation">{</span>
    <span class="token class-name">RequestProcessor</span> requestProcessor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RequestProcessor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token annotation punctuation">@DisplayName</span><span class="token punctuation">(</span><span class="token string">&quot;使用Thread.sleep等待完成&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">void</span> <span class="token function">whenWaitingWithThreadSleep_thenStatusIsDone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> requestId <span class="token operator">=</span> requestProcessor<span class="token punctuation">.</span><span class="token function">processRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">2010</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;DONE&quot;</span><span class="token punctuation">,</span> requestProcessor<span class="token punctuation">.</span><span class="token function">getStatus</span><span class="token punctuation">(</span>requestId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试案例中，我们调用RequestProcessor的processRequest()方法来启动一个请求。然后，我们必须等待才能通过请求ID获取状态。我们正在等待状态变化，因为我们期望它已经完成。</p><p>**当我们使用Thread.sleep()时，我们必须确保在检查结果之前等待足够的时间。**在我们的案例中，我们知道我们的请求最多在两秒内被处理。<strong>然而，在现实生活中，确定正确的等待时间更加困难。</strong></p><p><strong>我们还可以使用Awaitility，这是一个提供易于阅读的API来测试这类代码的库。</strong></p><p>首先，我们向pom.xml添加awaitility依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.awaitility\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`awaitility\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`4.2.0\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>\`test\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以创建利用新功能的测试用例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token annotation punctuation">@DisplayName</span><span class="token punctuation">(</span><span class="token string">&quot;使用Awaitility等待完成&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">whenWaitingWithAwaitility_thenStatusIsDone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> requestId <span class="token operator">=</span> requestProcessor<span class="token punctuation">.</span><span class="token function">processRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Awaitility</span><span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">until</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> requestProcessor<span class="token punctuation">.</span><span class="token function">getStatus</span><span class="token punctuation">(</span>requestId<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">not</span><span class="token punctuation">(</span><span class="token function">equalTo</span><span class="token punctuation">(</span><span class="token string">&quot;PROCESSING&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;DONE&quot;</span><span class="token punctuation">,</span> requestProcessor<span class="token punctuation">.</span><span class="token function">getStatus</span><span class="token punctuation">(</span>requestId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个测试用例的开始与前一个相同。**但是，我们不是固定地睡眠两秒钟，我们有一个条件语句。**在这种情况下，我们一直等待直到请求不再处于“PROCESSING”状态。之后，我们使用相同的断言来确保状态具有预期的值。</p><p>我们也可以提供额外的选项。例如，我们可以配置我们希望等待最多两秒钟加上一个额外的轮询时间，以确保进程已完成，并且Awaitility轮询已经获得了更新的“DONE”值。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Awaitility</span><span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">atMost</span><span class="token punctuation">(</span><span class="token number">2101</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">until</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> requestProcessor<span class="token punctuation">.</span><span class="token function">getStatus</span><span class="token punctuation">(</span>requestId<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">not</span><span class="token punctuation">(</span><span class="token function">equalTo</span><span class="token punctuation">(</span><span class="token string">&quot;PROCESSING&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**Awaitility在后台使用轮询来检查给定的语句是真还是假。**我们可以增加或减少轮询间隔，但默认值是100毫秒。换句话说，Awaitility每100毫秒检查一次条件。下面，让我们添加一个500毫秒的轮询延迟：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Awaitility</span><span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">atMost</span><span class="token punctuation">(</span><span class="token number">2501</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">pollDelay</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">until</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> requestProcessor<span class="token punctuation">.</span><span class="token function">getStatus</span><span class="token punctuation">(</span>requestId<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">not</span><span class="token punctuation">(</span><span class="token function">equalTo</span><span class="token punctuation">(</span><span class="token string">&quot;PROCESSING&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-比较" tabindex="-1"><a class="header-anchor" href="#_6-比较"><span>6. 比较</span></a></h2><p>正如我们所看到的，这两种方法在我们的用例中都可以很好地工作。但是，我们应该意识到一些优点和缺点。</p><p>**使用sleep()来暂停线程非常简单，但我们在发送它进入睡眠状态后没有太多的控制权。**我们正在等待的操作可能立即完成，我们仍然必须等待整个预定义的持续时间。</p><p>**另一方面，Awaitility让我们有了更细粒度的配置。**一旦条件满足，线程就恢复执行，这可以提高性能。</p><p>**sleep()方法是Java默认提供的，而Awaitility是一个需要添加到我们项目中的库。**在选择解决方案时我们必须考虑这一点。<strong>使用内置方法更明显，但我们可以使用领域特定语言编写更易读的代码。</strong></p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们讨论了Java中处理异步操作的两种不同方法。我们专注于测试，但这些示例也可以在代码的其他部分使用。</p><p>**首先，我们使用了Java内置的解决方案，使用sleep()方法来暂停线程的执行。**它很容易使用，但我们必须提前提供睡眠持续时间。</p><p>**然后，我们将其与Awaitility库进行了比较，该库提供了一种领域特定语言来处理这种情况。**它产生了更易读的代码，但我们必须学习如何使用它。</p><p>如往常一样，这些示例的源代码可以在GitHub上找到。</p>`,35),o=[e];function c(i,l){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-09-Thread.sleep   vs Awaitility.await  .html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Thread.sleep%20%20%20vs%20Awaitility.await%20%20.html","title":"Java中的Thread.sleep()与Awaitility.await()比较","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Asynchronous Operations"],"tag":["Thread.sleep()","Awaitility.await()"],"head":[["meta",{"name":"keywords","content":"Java, Asynchronous Operations, Testing, Awaitility, Thread.sleep()"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Thread.sleep%20%20%20vs%20Awaitility.await%20%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的Thread.sleep()与Awaitility.await()比较"}],["meta",{"property":"og:description","content":"Java中的Thread.sleep()与Awaitility.await()比较 在本教程中，我们将比较Java中处理异步操作的两种方式。首先，我们将看看Thread的sleep()方法是如何工作的。然后，我们将尝试使用Awaitility库提供的功能来实现相同的功能。在这个过程中，我们将看到这些解决方案的比较，以及哪一种更适合我们的用例。 2. 使..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T06:51:58.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Thread.sleep()"}],["meta",{"property":"article:tag","content":"Awaitility.await()"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T06:51:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的Thread.sleep()与Awaitility.await()比较\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T06:51:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的Thread.sleep()与Awaitility.await()比较 在本教程中，我们将比较Java中处理异步操作的两种方式。首先，我们将看看Thread的sleep()方法是如何工作的。然后，我们将尝试使用Awaitility库提供的功能来实现相同的功能。在这个过程中，我们将看到这些解决方案的比较，以及哪一种更适合我们的用例。 2. 使..."},"headers":[{"level":2,"title":"2. 使用场景","slug":"_2-使用场景","link":"#_2-使用场景","children":[]},{"level":2,"title":"3. 应用程序设置","slug":"_3-应用程序设置","link":"#_3-应用程序设置","children":[]},{"level":2,"title":"4. 纯Java","slug":"_4-纯java","link":"#_4-纯java","children":[]},{"level":2,"title":"6. 比较","slug":"_6-比较","link":"#_6-比较","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720507918000,"updatedTime":1720507918000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.83,"words":1448},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Thread.sleep   vs Awaitility.await  .md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将比较Java中处理异步操作的两种方式。首先，我们将看看Thread的sleep()方法是如何工作的。然后，我们将尝试使用Awaitility库提供的功能来实现相同的功能。在这个过程中，我们将看到这些解决方案的比较，以及哪一种更适合我们的用例。</p>\\n<h2>2. 使用场景</h2>\\n<p>sleep()和await()方法在我们需要等待异步操作完成时特别有用。例如，我们的应用程序可能会向消息代理或队列发送消息。在这种情况下，我们不知道消息何时在另一端被接收。另一个用例可以是调用API端点并等待特定结果。例如，我们向服务发送请求，它启动了一个长时间运行的任务，我们等待它完成。</p>","autoDesc":true}');export{k as comp,d as data};
