import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DI0Ohe7a.js";const p={},e=t(`<h1 id="java-completablefuture中的异常处理" tabindex="-1"><a class="header-anchor" href="#java-completablefuture中的异常处理"><span>Java CompletableFuture中的异常处理</span></a></h1><p>Java 8引入了一种基于_Future_的新抽象概念来执行异步任务——<em>CompletableFuture_类。它基本上是用来克服旧版_Future</em> API的问题。</p><p>在本教程中，我们将探讨在使用_CompletableFuture_时处理异常的方法。</p><h2 id="completablefuture回顾" tabindex="-1"><a class="header-anchor" href="#completablefuture回顾"><span>CompletableFuture回顾</span></a></h2><p>首先，我们可能需要简要回顾一下_CompletableFuture_是什么。_CompletableFuture_是一种_Future_实现，允许我们运行并最重要的是，链式调用异步操作。一般来说，异步操作完成有三种可能的结果——正常完成、异常完成或从外部取消。_CompletableFuture_有各种API方法来处理所有这些可能的结果。</p><p>就像_CompletableFuture_中的许多其他方法一样，这些方法有非异步、异步以及使用特定_Executor_的异步变体。那么，让我们不再拖延，逐一看看如何在_CompletableFuture_中处理异常。</p><h2 id="handle" tabindex="-1"><a class="header-anchor" href="#handle"><span>handle()</span></a></h2><p>首先，我们有一个handle()方法。通过使用此方法，<strong>我们可以访问并转换_CompletionStage_的整个结果，无论结果如何</strong>。也就是说，handle()方法接受一个_BiFunction_函数式接口。因此，这个接口有两个输入。在handle()方法的情况下，参数将是上一个_CompletionStage_的结果和发生的_Exception_。</p><p>重要的是，<strong>这两个参数都是可选的，意味着它们可以是_null_</strong>。这在某种意义上是显而易见的，因为上一个_CompletionStage_正常完成。然后_Exception_应该是_null_，因为没有发生任何异常，同样对于_CompletionStage_结果值的可空性也是如此。</p><p>让我们现在看看handle()方法使用的一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;parametersSource_handle&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">whenCompletableFutureIsScheduled_thenHandleStageIsAlwaysInvoked</span><span class="token punctuation">(</span><span class="token keyword">int</span> radius<span class="token punctuation">,</span> <span class="token keyword">long</span> expected<span class="token punctuation">)</span>
  <span class="token keyword">throws</span> <span class="token class-name">ExecutionException</span><span class="token punctuation">,</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token keyword">long</span> actual <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span>
      <span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>radius \`<span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;Supplied with non-positive radius &#39;%d&#39;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">return</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">round</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span>radius<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token constant">PI</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">handle</span><span class="token punctuation">(</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> ex<span class="token punctuation">)</span> <span class="token operator">-&gt;</span>\` <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>ex <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">return</span> result<span class="token punctuation">;</span>
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
              <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1L</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertThat</span><span class="token punctuation">(</span>actual<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token class-name">Stream</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Arguments</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token function">parameterSource_handle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token class-name">Arguments</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Arguments</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里需要注意的是，handle()方法返回一个新的_CompletionStage_，它将始终执行，不管上一个_CompletionStage_的结果如何。因此，handle()将上一个阶段的源值转换为某个输出值。因此，我们将通过_get()_方法获得的值是handle()方法返回的值。</p><h2 id="exceptionally" tabindex="-1"><a class="header-anchor" href="#exceptionally"><span>exceptionally()</span></a></h2><p>handle()方法并不总是方便的，特别是如果我们只想在出现异常时处理异常。幸运的是，我们有一个替代方案——exceptionally()。</p><p>此方法允许我们在<strong>仅当上一个_CompletionStage_以_Exception_结束时执行回调</strong>。如果没有抛出异常，那么回调将被省略，执行链将继续传递到下一个回调（如果有的话）与上一个的值。</p><p>为了理解，让我们看一个具体的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;parametersSource_exceptionally&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">whenCompletableFutureIsScheduled_thenExceptionallyExecutedOnlyOnFailure</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">,</span> <span class="token keyword">int</span> c<span class="token punctuation">,</span> <span class="token keyword">long</span> expected<span class="token punctuation">)</span>
  <span class="token keyword">throws</span> <span class="token class-name">ExecutionException</span><span class="token punctuation">,</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token keyword">long</span> actual <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span>
      <span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>a \`<span class="token operator">&lt;=</span> <span class="token number">0</span> <span class="token operator">||</span> b <span class="token operator">&lt;=</span> <span class="token number">0</span> <span class="token operator">||</span> c <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;Supplied with incorrect edge length [%s]&quot;</span><span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">return</span> a <span class="token operator">*</span> b <span class="token operator">*</span> c<span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">exceptionally</span><span class="token punctuation">(</span><span class="token punctuation">(</span>ex<span class="token punctuation">)</span> <span class="token operator">-&gt;</span>\` <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertThat</span><span class="token punctuation">(</span>actual<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token class-name">Stream</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Arguments</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token function">parametersSource_exceptionally</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>
      <span class="token class-name">Arguments</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token class-name">Arguments</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以在这里，它的工作方式与handle()相同，但我们的回调参数是一个_Exception_实例。这个参数永远不会是_null_，所以我们的代码现在更简单一些。</p><p>需要注意的重要事项是，exceptionally()方法的回调仅在上一个阶段以_Exception_完成时执行。这基本上意味着如果在执行链中某个地方发生了_Exception_，并且已经有一个handle()方法捕获了它——那么exceptionally()回调将不会在之后执行：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;parametersSource_exceptionally&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">givenCompletableFutureIsScheduled_whenHandleIsAlreadyPresent_thenExceptionallyIsNotExecuted</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">,</span> <span class="token keyword">int</span> c<span class="token punctuation">,</span> <span class="token keyword">long</span> expected<span class="token punctuation">)</span>
  <span class="token keyword">throws</span> <span class="token class-name">ExecutionException</span><span class="token punctuation">,</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token keyword">long</span> actual <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span>
      <span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>a \`<span class="token operator">&lt;=</span> <span class="token number">0</span> <span class="token operator">||</span> b <span class="token operator">&lt;=</span> <span class="token number">0</span> <span class="token operator">||</span> c <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;Supplied with incorrect edge length [%s]&quot;</span><span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">return</span> a <span class="token operator">*</span> b <span class="token operator">*</span> c<span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">handle</span><span class="token punctuation">(</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> throwable<span class="token punctuation">)</span> <span class="token operator">-&gt;</span>\` <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>throwable <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">return</span> result<span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">exceptionally</span><span class="token punctuation">(</span><span class="token punctuation">(</span>ex<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
          <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertThat</span><span class="token punctuation">(</span>actual<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，exceptionally()没有被调用，因为handle()方法已经捕获了任何_Exception_。因此，除非在handle()方法内部发生_Exception_，否则这里的exceptionally()方法永远不会被执行。</p><h2 id="whencomplete" tabindex="-1"><a class="header-anchor" href="#whencomplete"><span>whenComplete()</span></a></h2><p>我们还拥有一个whenComplete()方法。它接受一个_BiConsumer_，有两个参数：上一个阶段的结果和如果有的话的异常。然而，这个方法与上述方法有显著的不同。</p><p>不同之处在于whenComplete()不会转换前一阶段的任何异常结果。因此，即使whenComplete()的回调总是运行，如果有来自前一阶段的异常，它将传播到更远的地方：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;parametersSource_whenComplete&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">whenCompletableFutureIsScheduled_thenWhenCompletedExecutedAlways</span><span class="token punctuation">(</span><span class="token class-name">Double</span> a<span class="token punctuation">,</span> <span class="token keyword">long</span> expected<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">CountDownLatch</span> countDownLatch <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CountDownLatch</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">long</span> actual <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span>
          <span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
              <span class="token keyword">if</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token function">isNaN</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;Supplied value is NaN&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
              <span class="token keyword">return</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">round</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">whenComplete</span><span class="token punctuation">(</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> exception<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> countDownLatch<span class="token punctuation">.</span><span class="token function">countDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertThat</span><span class="token punctuation">(</span>countDownLatch<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token number">20L</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span></span>TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertThat</span><span class="token punctuation">(</span>actual<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertThat</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isSameAs</span><span class="token punctuation">(</span><span class="token class-name">ExecutionException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertThat</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getCause</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isSameAs</span><span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token class-name">Stream</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Arguments</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token function">parametersSource_whenComplete</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>
      <span class="token class-name">Arguments</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2d</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token class-name">Arguments</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token class-name">Double<span class="token punctuation">.</span>NaN</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，whenCompleted()内的回调在两次测试调用中都运行了。然而，在第二次调用中，我们以_ExecutionException_完成，其原因是我们的_IllegalArgumentException_。所以，我们可以看到，来自回调的异常传播到了调用者。我们将在下一节中讨论为什么会发生这种情况。</p><h2 id="未处理的异常" tabindex="-1"><a class="header-anchor" href="#未处理的异常"><span>未处理的异常</span></a></h2><p>最后，我们需要稍微谈谈未处理的异常。**一般来说，如果一个异常没有被捕获，那么_CompletableFuture_将带有一个异常完成，这个异常不会传播到调用者。**在我们上面的例子中，我们从_get()<em>方法调用中得到了_ExecutionException</em>。这是因为我们尝试在_CompletableFuture_以_Exception_结束时访问结果。</p><p>因此，我们需要在_get()_调用之前检查_CompletableFuture_的结果。有几种方法可以做到这一点。第一种方法，也是可能对大家最熟悉的方法，是通过_isCompletedExceptionally()/isCancelled()/isDone()_方法。这些方法在_CompletableFutre_以异常完成、从外部取消或成功完成时返回一个布尔值。</p><p>然而，值得一提的是，还有一个_state()<em>方法，它返回一个_State_枚举实例。这个实例代表_CompletableFuture_的状态，如_RUNNING</em>, _SUCCESS_等。所以，这是另一种访问_CompletableFuture_结果的方法。</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们探讨了在_CompletableFuture_阶段发生异常的处理方式。</p><p>如往常一样，本文的源代码可在GitHub上获得。</p>`,33),o=[e];function c(l,u){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","2024-06-27-Working with Exceptions in Java CompletableFuture.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-27/2024-06-27-Working%20with%20Exceptions%20in%20Java%20CompletableFuture.html","title":"Java CompletableFuture中的异常处理","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Java","CompletableFuture"],"tag":["Java","CompletableFuture","异常处理"],"head":[["meta",{"name":"keywords","content":"Java CompletableFuture 异常处理"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-27/2024-06-27-Working%20with%20Exceptions%20in%20Java%20CompletableFuture.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java CompletableFuture中的异常处理"}],["meta",{"property":"og:description","content":"Java CompletableFuture中的异常处理 Java 8引入了一种基于_Future_的新抽象概念来执行异步任务——CompletableFuture_类。它基本上是用来克服旧版_Future API的问题。 在本教程中，我们将探讨在使用_CompletableFuture_时处理异常的方法。 CompletableFuture回顾 首先..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-27T06:52:36.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"CompletableFuture"}],["meta",{"property":"article:tag","content":"异常处理"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T06:52:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java CompletableFuture中的异常处理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-27T06:52:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java CompletableFuture中的异常处理 Java 8引入了一种基于_Future_的新抽象概念来执行异步任务——CompletableFuture_类。它基本上是用来克服旧版_Future API的问题。 在本教程中，我们将探讨在使用_CompletableFuture_时处理异常的方法。 CompletableFuture回顾 首先..."},"headers":[{"level":2,"title":"CompletableFuture回顾","slug":"completablefuture回顾","link":"#completablefuture回顾","children":[]},{"level":2,"title":"handle()","slug":"handle","link":"#handle","children":[]},{"level":2,"title":"exceptionally()","slug":"exceptionally","link":"#exceptionally","children":[]},{"level":2,"title":"whenComplete()","slug":"whencomplete","link":"#whencomplete","children":[]},{"level":2,"title":"未处理的异常","slug":"未处理的异常","link":"#未处理的异常","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1719471156000,"updatedTime":1719471156000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.26,"words":1578},"filePathRelative":"posts/baeldung/2024-06-27/2024-06-27-Working with Exceptions in Java CompletableFuture.md","localizedDate":"2024年6月27日","excerpt":"\\n<p>Java 8引入了一种基于_Future_的新抽象概念来执行异步任务——<em>CompletableFuture_类。它基本上是用来克服旧版_Future</em> API的问题。</p>\\n<p>在本教程中，我们将探讨在使用_CompletableFuture_时处理异常的方法。</p>\\n<h2>CompletableFuture回顾</h2>\\n<p>首先，我们可能需要简要回顾一下_CompletableFuture_是什么。_CompletableFuture_是一种_Future_实现，允许我们运行并最重要的是，链式调用异步操作。一般来说，异步操作完成有三种可能的结果——正常完成、异常完成或从外部取消。_CompletableFuture_有各种API方法来处理所有这些可能的结果。</p>","autoDesc":true}');export{r as comp,d as data};
