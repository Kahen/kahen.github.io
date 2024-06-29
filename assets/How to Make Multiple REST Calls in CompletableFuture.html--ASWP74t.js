import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-O62yWemN.js";const e={},p=t(`<h1 id="如何在completablefuture中进行多个rest调用-baeldung" tabindex="-1"><a class="header-anchor" href="#如何在completablefuture中进行多个rest调用-baeldung"><span>如何在CompletableFuture中进行多个REST调用 | Baeldung</span></a></h1><p>现在，新版的《REST With Spring - &quot;REST With Spring Boot&quot;》终于发布了，当前价格将在6月22日之前有效，之后将永久上涨50美元。</p><p><strong>&gt;获取访问权限</strong></p><p><strong>现在</strong></p><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在创建软件功能时，日常活动之一是从不同来源检索数据并在响应中聚合。在微服务中，这些来源通常是外部REST API。</p><p>在本教程中，我们将使用Java的CompletableFuture高效地从多个外部REST API并行检索数据。</p><h2 id="_2-为什么在rest调用中使用并行性" tabindex="-1"><a class="header-anchor" href="#_2-为什么在rest调用中使用并行性"><span>2. 为什么在REST调用中使用并行性</span></a></h2><p>让我们想象一个场景，我们需要更新对象中的各个字段，每个字段的值都来自一个外部REST调用。</p><p>一个选择是按顺序调用每个API来更新每个字段。</p><p>然而，等待一个REST调用完成后再开始另一个会增加我们的服务响应时间。例如，如果我们调用两个每个都需要5秒的API，总时间至少为10秒，因为第二个调用需要等待第一个完成。</p><p>相反，我们可以并行调用所有API，这样总时间将是最慢的REST调用的时间。例如，一个调用需要7秒，另一个需要5秒。在这种情况下，我们将等待7秒，因为我们已经并行处理了所有事情，并且必须等待所有结果完成。</p><p><strong>因此，并行性是减少我们的服务响应时间，使它们更具可扩展性并改善用户体验的极好选择。</strong></p><h2 id="_3-使用completablefuture进行并行处理" tabindex="-1"><a class="header-anchor" href="#_3-使用completablefuture进行并行处理"><span>3. 使用CompletableFuture进行并行处理</span></a></h2><p>Java中的CompletableFuture类是一个方便的工具，用于组合和运行不同的并行任务以及处理单个任务错误。</p><p>在接下来的部分中，我们将使用它来为输入列表中的每个对象组合并运行三个REST调用。</p><h3 id="_3-1-创建演示应用程序" tabindex="-1"><a class="header-anchor" href="#_3-1-创建演示应用程序"><span>3.1. 创建演示应用程序</span></a></h3><p>首先定义我们的目标POJO以进行更新：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Purchase</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> orderDescription<span class="token punctuation">;</span>
    <span class="token class-name">String</span> paymentDescription<span class="token punctuation">;</span>
    <span class="token class-name">String</span> buyerName<span class="token punctuation">;</span>
    <span class="token class-name">String</span> orderId<span class="token punctuation">;</span>
    <span class="token class-name">String</span> paymentId<span class="token punctuation">;</span>
    <span class="token class-name">String</span> userId<span class="token punctuation">;</span>

    <span class="token comment">// 全参构造函数，getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Purchase类有三个字段需要更新，每个字段都由不同的REST调用通过ID查询。</p><p>首先创建一个类，定义RestTemplate bean和REST调用的域URL：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PurchaseRestCallsAsyncExecutor</span> <span class="token punctuation">{</span>
    <span class="token class-name">RestTemplate</span> restTemplate<span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">BASE_URL</span> <span class="token operator">=</span> <span class="token string">&quot;https://internal-api.com&quot;</span><span class="token punctuation">;</span>

    <span class="token comment">// 全参构造函数</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们定义/orders API调用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getOrderDescription</span><span class="token punctuation">(</span><span class="token class-name">String</span> orderId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ResponseEntity</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` result <span class="token operator">=</span> restTemplate<span class="token punctuation">.</span><span class="token function">getForEntity</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;%s/orders/%s&quot;</span><span class="token punctuation">,</span> <span class="token constant">BASE_URL</span><span class="token punctuation">,</span> orderId<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> result<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，让我们定义/payments API调用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getPaymentDescription</span><span class="token punctuation">(</span><span class="token class-name">String</span> paymentId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ResponseEntity</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` result <span class="token operator">=</span> restTemplate<span class="token punctuation">.</span><span class="token function">getForEntity</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;%s/payments/%s&quot;</span><span class="token punctuation">,</span> <span class="token constant">BASE_URL</span><span class="token punctuation">,</span> paymentId<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> result<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们定义/users API调用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getUserName</span><span class="token punctuation">(</span><span class="token class-name">String</span> userId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ResponseEntity</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` result <span class="token operator">=</span> restTemplate<span class="token punctuation">.</span><span class="token function">getForEntity</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;%s/users/%s&quot;</span><span class="token punctuation">,</span> <span class="token constant">BASE_URL</span><span class="token punctuation">,</span> userId<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> result<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所有三种方法都使用getForEntity()方法进行REST调用，并将结果包装在ResponseEntity对象中。</p><p>然后，我们调用getBody()从REST调用中获取响应体。</p><h3 id="_3-2-使用completablefuture进行多个rest调用" tabindex="-1"><a class="header-anchor" href="#_3-2-使用completablefuture进行多个rest调用"><span>3.2. 使用CompletableFuture进行多个REST调用</span></a></h3><p>现在，让我们创建一个方法来构建并运行一组三个CompletableFuture：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">updatePurchase</span><span class="token punctuation">(</span><span class="token class-name">Purchase</span> purchase<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">allOf</span><span class="token punctuation">(</span>
      <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">getOrderDescription</span><span class="token punctuation">(</span>purchase<span class="token punctuation">.</span><span class="token function">getOrderId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">thenAccept</span><span class="token punctuation">(</span>purchase<span class="token operator">::</span><span class="token function">setOrderDescription</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">getPaymentDescription</span><span class="token punctuation">(</span>purchase<span class="token punctuation">.</span><span class="token function">getPaymentId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">thenAccept</span><span class="token punctuation">(</span>purchase<span class="token operator">::</span><span class="token function">setPaymentDescription</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">getUserName</span><span class="token punctuation">(</span>purchase<span class="token punctuation">.</span><span class="token function">getUserId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">thenAccept</span><span class="token punctuation">(</span>purchase<span class="token operator">::</span><span class="token function">setBuyerName</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用allOf()方法构建我们的CompletableFuture的步骤。每个参数都是一个并行任务，形式是另一个用REST调用及其结果构建的CompletableFuture。</p><p>为了构建每个并行任务，我们首先使用supplyAsync()方法提供Supplier，我们将从中检索我们的数据。然后，我们使用thenAccept()来消费supplyAsync()的结果，并将其设置在Purchase类中的相应字段上。</p><p>在allOf()的末尾，我们只是构建了到目前为止的任务。没有采取任何行动。</p><p>最后，我们在末尾调用join()以并行运行所有任务并收集它们的结果。<strong>由于join()是一个线程阻塞操作，我们只在最后调用它，而不是在每个任务步骤调用。这是为了通过减少线程阻塞来优化应用程序性能。</strong></p><p>由于我们没有为supplyAsync()方法提供一个自定义的ExecutorService，所有任务都在同一个执行器中运行。默认情况下，Java使用ForkJoinPool.commonPool()。</p><p>通常，指定一个自定义的ExecutorService到supplyAsync()是一个好习惯，这样我们就有更多的控制权。</p><h3 id="_3-3-对列表中的每个元素执行多个rest调用" tabindex="-1"><a class="header-anchor" href="#_3-3-对列表中的每个元素执行多个rest调用"><span>3.3. 对列表中的每个元素执行多个REST调用</span></a></h3><p>要在我们的集合上应用updatePurchase()方法，我们可以简单地在forEach()循环中调用它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">updatePurchases</span><span class="token punctuation">(</span><span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Purchase</span><span class="token punctuation">&gt;</span></span>\` purchases<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    purchases<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token operator">::</span><span class="token function">updatePurchase</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的updatePurchases()方法接收一个Purchase列表，并应用先前创建的updatePurchase()方法到每个元素。</p><p>每个对updatePurchases()的调用都运行了我们CompletableFuture中定义的三个并行任务。因此，每个购买都有自己的CompletableFuture对象来运行三个并行REST调用。</p><h2 id="_4-处理错误" tabindex="-1"><a class="header-anchor" href="#_4-处理错误"><span>4. 处理错误</span></a></h2><p>在分布式系统中，服务不可用或网络故障是很常见的。这些故障可能发生在我们作为API客户端不知道的外部REST API中。例如，如果应用程序关闭，通过线路发送的请求永远不会完成。</p><h3 id="_4-1-使用handle-优雅地处理错误" tabindex="-1"><a class="header-anchor" href="#_4-1-使用handle-优雅地处理错误"><span>4.1. 使用handle()优雅地处理错误</span></a></h3><p>在REST调用执行期间可能会发生异常。例如，如果API服务关闭或我们输入了无效参数，我们会得到错误。</p><p>因此，我们可以使用handle()方法单独处理每个REST调用异常：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> \`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">U</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token class-name">CompletableFuture</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">U</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">handle</span><span class="token punctuation">(</span><span class="token class-name">BiFunction</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token class-name">Throwable</span><span class="token punctuation">,</span> <span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">U</span><span class="token punctuation">&gt;</span></span>\` fn<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>方法参数是一个BiFunction，包含来自上一个任务的结果和异常作为参数。</p><p>为了说明，让我们将handle()步骤添加到我们的CompletableFuture的一个步骤中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">updatePurchaseHandlingExceptions</span><span class="token punctuation">(</span><span class="token class-name">Purchase</span> purchase<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">allOf</span><span class="token punctuation">(</span>
        <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">getPaymentDescription</span><span class="token punctuation">(</span>purchase<span class="token punctuation">.</span><span class="token function">getPaymentId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">thenAccept</span><span class="token punctuation">(</span>purchase<span class="token operator">::</span><span class="token function">setPaymentDescription</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">handle</span><span class="token punctuation">(</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> exception<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
              <span class="token keyword">if</span> <span class="token punctuation">(</span>exception <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token comment">// 处理异常</span>
                  <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
              <span class="token keyword">return</span> result<span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在示例中，handle()从由thenAccept()调用的setOrderDescription()获取Void类型。</p><p>然后，它在exception中存储thenAccept()动作中抛出的任何错误。因此，我们使用它来检查错误并在if语句中适当地处理它。</p><p>最后，如果未抛出异常，handle()返回作为参数传递的值。否则，它返回null。</p><h3 id="_4-2-处理rest调用超时" tabindex="-1"><a class="header-anchor" href="#_4-2-处理rest调用超时"><span>4.2. 处理REST调用超时</span></a></h3><p>当我们使用CompletableFuture时，我们可以指定一个任务超时，类似于我们在REST调用中定义的超时。因此，如果任务在指定的时间内未完成，Java将使用TimeoutException完成任务执行。</p><p>要做到这一点，让我们修改我们的CompletableFuture的一个任务来处理超时：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">updatePurchaseHandlingExceptions</span><span class="token punctuation">(</span><span class="token class-name">Purchase</span> purchase<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">allOf</span><span class="token punctuation">(</span>
        <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">getOrderDescription</span><span class="token punctuation">(</span>purchase<span class="token punctuation">.</span><span class="token function">getOrderId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">thenAccept</span><span class="token punctuation">(</span>purchase<span class="token operator">::</span><span class="token function">setOrderDescription</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">orTimeout</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">handle</span><span class="token punctuation">(</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> exception<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
              <span class="token keyword">if</span> <span class="token punctuation">(</span>exception <span class="token keyword">instanceof</span> <span class="token class-name">TimeoutException</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token comment">// 处理异常</span>
                  <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
              <span class="token keyword">return</span> result<span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们已经添加了orTimeout()行到我们的CompletableFuture构建器，以在5秒内未完成时突然停止任务执行。</p><p>我们还添加了一个if语句在handle()方法中，单独处理TimeoutException。</p><p><strong>向CompletableFuture添加超时保证任务总是完成。这很重要，可以避免线程无限期地挂起，等待可能永远不会完成的操作的结果。</strong> 因此，它减少了长时间处于RUNNING状态的线程数量，并提高了应用程序的健康状况。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在分布式系统中工作的一个常见任务是向不同的API进行REST调用，以构建适当的响应。</p><p>在本文中，我们已经看到如何使用CompletableFuture为集合中的每个对象构建一组并行REST调用任务。</p><p>我们还看到了如何使用handle()方法优雅地处理超时和一般异常。</p><p>如常，源代码可在GitHub上获得。</p>`,68),c=[p];function o(l,u){return a(),s("div",null,c)}const k=n(e,[["render",o],["__file","How to Make Multiple REST Calls in CompletableFuture.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/How%20to%20Make%20Multiple%20REST%20Calls%20in%20CompletableFuture.html","title":"如何在CompletableFuture中进行多个REST调用 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-15T00:00:00.000Z","category":["Java","Spring Boot"],"tag":["CompletableFuture","REST API","并行处理"],"description":"如何在CompletableFuture中进行多个REST调用 | Baeldung 现在，新版的《REST With Spring - \\"REST With Spring Boot\\"》终于发布了，当前价格将在6月22日之前有效，之后将永久上涨50美元。 >获取访问权限 现在 1. 引言 在创建软件功能时，日常活动之一是从不同来源检索数据并在响应中聚合...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/How%20to%20Make%20Multiple%20REST%20Calls%20in%20CompletableFuture.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在CompletableFuture中进行多个REST调用 | Baeldung"}],["meta",{"property":"og:description","content":"如何在CompletableFuture中进行多个REST调用 | Baeldung 现在，新版的《REST With Spring - \\"REST With Spring Boot\\"》终于发布了，当前价格将在6月22日之前有效，之后将永久上涨50美元。 >获取访问权限 现在 1. 引言 在创建软件功能时，日常活动之一是从不同来源检索数据并在响应中聚合..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"CompletableFuture"}],["meta",{"property":"article:tag","content":"REST API"}],["meta",{"property":"article:tag","content":"并行处理"}],["meta",{"property":"article:published_time","content":"2024-06-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在CompletableFuture中进行多个REST调用 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-15T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 为什么在REST调用中使用并行性","slug":"_2-为什么在rest调用中使用并行性","link":"#_2-为什么在rest调用中使用并行性","children":[]},{"level":2,"title":"3. 使用CompletableFuture进行并行处理","slug":"_3-使用completablefuture进行并行处理","link":"#_3-使用completablefuture进行并行处理","children":[{"level":3,"title":"3.1. 创建演示应用程序","slug":"_3-1-创建演示应用程序","link":"#_3-1-创建演示应用程序","children":[]},{"level":3,"title":"3.2. 使用CompletableFuture进行多个REST调用","slug":"_3-2-使用completablefuture进行多个rest调用","link":"#_3-2-使用completablefuture进行多个rest调用","children":[]},{"level":3,"title":"3.3. 对列表中的每个元素执行多个REST调用","slug":"_3-3-对列表中的每个元素执行多个rest调用","link":"#_3-3-对列表中的每个元素执行多个rest调用","children":[]}]},{"level":2,"title":"4. 处理错误","slug":"_4-处理错误","link":"#_4-处理错误","children":[{"level":3,"title":"4.1. 使用handle()优雅地处理错误","slug":"_4-1-使用handle-优雅地处理错误","link":"#_4-1-使用handle-优雅地处理错误","children":[]},{"level":3,"title":"4.2. 处理REST调用超时","slug":"_4-2-处理rest调用超时","link":"#_4-2-处理rest调用超时","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":6.47,"words":1941},"filePathRelative":"posts/baeldung/Archive/How to Make Multiple REST Calls in CompletableFuture.md","localizedDate":"2024年6月15日","excerpt":"\\n<p>现在，新版的《REST With Spring - \\"REST With Spring Boot\\"》终于发布了，当前价格将在6月22日之前有效，之后将永久上涨50美元。</p>\\n<p><strong>&gt;获取访问权限</strong></p>\\n<p><strong>现在</strong></p>\\n<h2>1. 引言</h2>\\n<p>在创建软件功能时，日常活动之一是从不同来源检索数据并在响应中聚合。在微服务中，这些来源通常是外部REST API。</p>\\n<p>在本教程中，我们将使用Java的CompletableFuture高效地从多个外部REST API并行检索数据。</p>\\n<h2>2. 为什么在REST调用中使用并行性</h2>","autoDesc":true}');export{k as comp,d as data};
