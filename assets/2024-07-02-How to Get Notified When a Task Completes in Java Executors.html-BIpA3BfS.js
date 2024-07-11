import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-uizvaz9h.js";const t={},p=e(`<h1 id="如何在java中使用executors接收任务完成通知" tabindex="-1"><a class="header-anchor" href="#如何在java中使用executors接收任务完成通知"><span>如何在Java中使用Executors接收任务完成通知</span></a></h1><p>Java提供了多种选项来异步运行任务，例如使用Executors。通常我们想知道任务何时完成，例如，为了提醒用户或开始下一个任务。在本教程中，我们将探讨根据我们最初运行任务的方式，接收任务完成通知的不同选项。</p><h2 id="_2-设置" tabindex="-1"><a class="header-anchor" href="#_2-设置"><span>2. 设置</span></a></h2><p>首先，让我们定义我们想要运行的任务和一个回调接口，当我们的任务完成时，我们希望通过该接口收到通知。</p><p><strong>对于我们的任务，我们将实现_Runnable_。_Runnable_是一个接口，当我们想要某些东西在线程中运行时可以使用。</strong> 我们必须重写_run()_方法，并将我们的业务逻辑放在里面。对于我们的示例，我们只会在控制台打印，以便我们知道它已经运行：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Task</span> <span class="token keyword">implements</span> <span class="token class-name">Runnable</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;任务进行中&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 业务逻辑在这里</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后让我们创建我们的_Callback_接口，我们将有一个单一的方法，它接受一个_String_参数。这是一个简单的例子，但我们可以根据需要拥有任何东西，使我们的提醒尽可能有用。使用_接口_允许我们以更通用的方式实现我们的解决方案。这意味着我们可以根据不同的用例传递不同的_CallbackInterface_实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">interface</span> <span class="token class-name">CallbackInterface</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">taskDone</span><span class="token punctuation">(</span><span class="token class-name">String</span> details<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们实现该接口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Callback</span> <span class="token keyword">implements</span> <span class="token class-name">CallbackInterface</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">taskDone</span><span class="token punctuation">(</span><span class="token class-name">String</span> details<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;任务完成: &quot;</span> <span class="token operator">+</span> details<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 警报/通知在这里</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将使用这些选项来运行我们的任务。这将清楚地表明我们正在完成相同的任务，并且每次都会从相同的回调在最后收到一个提醒。</p><h2 id="_3-runnable-实现" tabindex="-1"><a class="header-anchor" href="#_3-runnable-实现"><span>3. <em>Runnable</em> 实现</span></a></h2><p><strong>我们将看到的第一个例子是_Runnable_接口的简单实现。</strong> 我们可以通过构造函数提供我们的任务和回调，然后在重写的_run()_方法中调用它们：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">RunnableImpl</span> <span class="token keyword">implements</span> <span class="token class-name">Runnable</span> <span class="token punctuation">{</span>
    <span class="token class-name">Runnable</span> task<span class="token punctuation">;</span>
    <span class="token class-name">CallbackInterface</span> callback<span class="token punctuation">;</span>
    <span class="token class-name">String</span> taskDoneMessage<span class="token punctuation">;</span>

    <span class="token class-name">RunnableImpl</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> task<span class="token punctuation">,</span> <span class="token class-name">CallbackInterface</span> callback<span class="token punctuation">,</span> <span class="token class-name">String</span> taskDoneMessage<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>task <span class="token operator">=</span> task<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>callback <span class="token operator">=</span> callback<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>taskDoneMessage <span class="token operator">=</span> taskDoneMessage<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        task<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        callback<span class="token punctuation">.</span><span class="token function">taskDone</span><span class="token punctuation">(</span>taskDoneMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们这里的设置运行了我们提供的的任务，然后在任务完成后调用了我们的回调方法。我们可以看到这在测试中的运行情况：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenImplementingRunnable_thenReceiveNotificationOfCompletedTask</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Task</span> task <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Task</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Callback</span> callback <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">RunnableImpl</span> runnableImpl <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RunnableImpl</span><span class="token punctuation">(</span>task<span class="token punctuation">,</span> callback<span class="token punctuation">,</span> <span class="token string">&quot;准备进行下一个任务&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    runnableImpl<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们检查这个测试的日志，我们会看到我们期望的两条消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>任务进行中
任务完成 准备进行下一个任务
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，在真正的应用程序中，我们会拥有业务逻辑和真实的提醒。</p><h2 id="_4-使用-completablefuture" tabindex="-1"><a class="header-anchor" href="#_4-使用-completablefuture"><span>4. 使用 <em>CompletableFuture</em></span></a></h2><p><strong>也许最简单的异步运行任务并在完成后收到提醒的选项是使用_CompletableFuture_类。</strong></p><p>_CompletableFuture_是在Java 8中引入的，是_Future_接口的一个实现。它允许我们按顺序执行多个任务，每个任务在前一个_Future_完成后运行。这对我们来说很棒，因为我们可以运行我们的任务，并指示_CompletableFuture_在完成后运行我们的回调方法。</p><p>将这个计划付诸行动，我们首先可以使用_CompletableFuture_的_runAsync()_方法。这个方法接受一个_Runnable_并为我们运行它，返回一个_CompletableFuture_实例。然后我们可以链式调用_thenAccept()_方法，将我们的_Callback.taskDone()_方法作为参数，这将在我们的任务完成后被调用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingCompletableFuture_thenReceiveNotificationOfCompletedTask</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Task</span> task <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Task</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Callback</span> callback <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">runAsync</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">thenAccept</span><span class="token punctuation">(</span>result <span class="token operator">-&gt;</span> callback<span class="token punctuation">.</span><span class="token function">taskDone</span><span class="token punctuation">(</span><span class="token string">&quot;完成细节: &quot;</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行这个将按预期产生任务的输出，然后是我们的_Callback_实现。我们的任务没有返回任何东西，所以_result_是_null_，但根据我们的用例，我们可以不同地处理它。</p><h2 id="_5-扩展-threadpoolexecutor" tabindex="-1"><a class="header-anchor" href="#_5-扩展-threadpoolexecutor"><span>5. 扩展 <em>ThreadPoolExecutor</em></span></a></h2><p>对于一些用例，我们可能需要使用_ThreadPoolExecutor_，例如，如果我们要一次性提交许多任务。_ThreadPoolExecutor_允许我们使用我们在实例化时指定的线程数量来执行我们需要的任何任务。</p><p><strong>我们可以扩展_ThreadPoolExecutor_类并覆盖_afterExecute()_方法，以便在每个任务后调用我们的_Callback_实现：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">AlertingThreadPoolExecutor</span> <span class="token keyword">extends</span> <span class="token class-name">ThreadPoolExecutor</span> <span class="token punctuation">{</span>
    <span class="token class-name">CallbackInterface</span> callback<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">AlertingThreadPoolExecutor</span><span class="token punctuation">(</span><span class="token class-name">CallbackInterface</span> callback<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">ArrayBlockingQueue</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">&gt;</span></span>\`<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>callback <span class="token operator">=</span> callback<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">afterExecute</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> r<span class="token punctuation">,</span> <span class="token class-name">Throwable</span> t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">afterExecute</span><span class="token punctuation">(</span>r<span class="token punctuation">,</span> t<span class="token punctuation">)</span><span class="token punctuation">;</span>
        callback<span class="token punctuation">.</span><span class="token function">taskDone</span><span class="token punctuation">(</span><span class="token string">&quot;可执行任务的详细信息在这里&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的构造函数中，我们使用硬编码的值调用了超类构造函数，为我们提供了一个线程来使用。我们还设置了空闲线程的存活时间为_60_秒，并给出了一个可以容纳_10_个任务的队列。我们可以针对特定的应用程序进行微调，但对于一个简单的示例，这就是我们所需要的。运行时，正如预期的那样，给出了以下输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>任务进行中
任务完成 可执行任务的详细信息在这里
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-扩展-futuretask" tabindex="-1"><a class="header-anchor" href="#_6-扩展-futuretask"><span>6. 扩展 <em>FutureTask</em></span></a></h2><p>我们的最后一个选择是扩展_FutureTask_类。<strong><em>FutureTask_是_Future_接口的另一个实现。它还实现了_Runnable</em>，这意味着我们可以将它的实例提交给_ExecutorService_。</strong> 这个类提供了一个我们可以重写的方法_called_，它将在提供的_Runnable_完成后被调用。</p><p>考虑到这一点，我们在这里需要做的全部就是扩展_FutureTask_，重写_called_方法，并通过构造函数传递我们的_Callback_实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">AlertingFutureTask</span> <span class="token keyword">extends</span> <span class="token class-name">FutureTask</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token punctuation">{</span>
    <span class="token class-name">CallbackInterface</span> callback<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">AlertingFutureTask</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> runnable<span class="token punctuation">,</span> <span class="token class-name">Callback</span> callback<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>runnable<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>callback <span class="token operator">=</span> callback<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        callback<span class="token punctuation">.</span><span class="token function">taskDone</span><span class="token punctuation">(</span><span class="token string">&quot;警报警报&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以通过创建它的一个实例和一个_ExecutorService_的实例来使用这个_FutureTask_的扩展。然后我们将我们的_FutureTask_提交给_ExecutorService_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingFutureTask_thenReceiveNotificationOfCompletedTask</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">Task</span> task <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Task</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Callback</span> callback <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">FutureTask</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` future <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AlertingFutureTask</span><span class="token punctuation">(</span>task<span class="token punctuation">,</span> callback<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ExecutorService</span> executor <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newSingleThreadExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    executor<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span>future<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那个测试的输出正如预期的那样——任务首先记录，然后是我们的回调实现记录：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>任务进行中
任务完成: 任务详情在这里
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们探讨了四种异步运行相同任务，然后接收指示其完成的提醒的方式。其中三种选项涉及扩展或实现现有的Java类或接口。这些是_Runnable_接口和_ThreadPoolExecutor_和_FutureTask_类。每种选项都为我们提供了高度的控制和大量选项，以获得我们想要的提醒行为。</p><p>最后一个选项是使用_CompletableFuture_，这更加简洁。我们不需要单独的类，我们可以在一两行中完成所有操作。对于简单的用例或者当我们的所有内容都很好地包装在我们的_Callback_和_Task_类中时，这种方法做得很好。</p><p>如往常一样，示例的完整代码可以在GitHub上找到。</p>`,43),c=[p];function l(o,u){return s(),a("div",null,c)}const k=n(t,[["render",l],["__file","2024-07-02-How to Get Notified When a Task Completes in Java Executors.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-How%20to%20Get%20Notified%20When%20a%20Task%20Completes%20in%20Java%20Executors.html","title":"如何在Java中使用Executors接收任务完成通知","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Concurrency"],"tag":["Executors","Task Notification"],"head":[["meta",{"name":"keywords","content":"Java, Executors, Task Completion Notification, Asynchronous Task"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-How%20to%20Get%20Notified%20When%20a%20Task%20Completes%20in%20Java%20Executors.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Java中使用Executors接收任务完成通知"}],["meta",{"property":"og:description","content":"如何在Java中使用Executors接收任务完成通知 Java提供了多种选项来异步运行任务，例如使用Executors。通常我们想知道任务何时完成，例如，为了提醒用户或开始下一个任务。在本教程中，我们将探讨根据我们最初运行任务的方式，接收任务完成通知的不同选项。 2. 设置 首先，让我们定义我们想要运行的任务和一个回调接口，当我们的任务完成时，我们希..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T23:33:16.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Executors"}],["meta",{"property":"article:tag","content":"Task Notification"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T23:33:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Java中使用Executors接收任务完成通知\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T23:33:16.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Java中使用Executors接收任务完成通知 Java提供了多种选项来异步运行任务，例如使用Executors。通常我们想知道任务何时完成，例如，为了提醒用户或开始下一个任务。在本教程中，我们将探讨根据我们最初运行任务的方式，接收任务完成通知的不同选项。 2. 设置 首先，让我们定义我们想要运行的任务和一个回调接口，当我们的任务完成时，我们希..."},"headers":[{"level":2,"title":"2. 设置","slug":"_2-设置","link":"#_2-设置","children":[]},{"level":2,"title":"3. Runnable 实现","slug":"_3-runnable-实现","link":"#_3-runnable-实现","children":[]},{"level":2,"title":"4. 使用 CompletableFuture","slug":"_4-使用-completablefuture","link":"#_4-使用-completablefuture","children":[]},{"level":2,"title":"5. 扩展 ThreadPoolExecutor","slug":"_5-扩展-threadpoolexecutor","link":"#_5-扩展-threadpoolexecutor","children":[]},{"level":2,"title":"6. 扩展 FutureTask","slug":"_6-扩展-futuretask","link":"#_6-扩展-futuretask","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719963196000,"updatedTime":1719963196000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.96,"words":1787},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-How to Get Notified When a Task Completes in Java Executors.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Java提供了多种选项来异步运行任务，例如使用Executors。通常我们想知道任务何时完成，例如，为了提醒用户或开始下一个任务。在本教程中，我们将探讨根据我们最初运行任务的方式，接收任务完成通知的不同选项。</p>\\n<h2>2. 设置</h2>\\n<p>首先，让我们定义我们想要运行的任务和一个回调接口，当我们的任务完成时，我们希望通过该接口收到通知。</p>\\n<p><strong>对于我们的任务，我们将实现_Runnable_。_Runnable_是一个接口，当我们想要某些东西在线程中运行时可以使用。</strong> 我们必须重写_run()_方法，并将我们的业务逻辑放在里面。对于我们的示例，我们只会在控制台打印，以便我们知道它已经运行：</p>","autoDesc":true}');export{k as comp,d as data};
