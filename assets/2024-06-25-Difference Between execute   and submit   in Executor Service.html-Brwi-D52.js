import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as e,a as s}from"./app-FPWt52u1.js";const t={},c=s(`<h1 id="java中executorservice的submit-和execute-方法的区别" tabindex="-1"><a class="header-anchor" href="#java中executorservice的submit-和execute-方法的区别"><span>Java中ExecutorService的submit()和execute()方法的区别</span></a></h1><p>多线程和并行处理是现代应用开发中的关键概念。在Java中，_Executor_框架提供了一种有效管理和控制并发任务执行的方式。_ExecutorService_接口是这个框架的核心，它提供了两种常用的方法来提交需要执行的任务：_submit()<em>和_execute()</em>。</p><p>在本文中，我们将探讨这两种方法之间的主要区别。我们将通过一个简单的示例来使用_submit()<em>和_execute()</em>，模拟一个计算数组中数字总和的任务，使用线程池。</p><h2 id="_2-使用-executorservice-submit" tabindex="-1"><a class="header-anchor" href="#_2-使用-executorservice-submit"><span>2. 使用_ExecutorService.submit( )_</span></a></h2><p>让我们首先从_submit()_方法开始，它广泛用于_ExecutorService_接口。它允许我们提交任务以供执行，并返回一个表示计算结果的_Future_对象。</p><p>这个_Future_允许我们获取计算结果，处理任务执行期间发生的异常，并监控任务的状态。我们可以在_Future_中调用_get()_来检索结果或异常。</p><p>首先，我们初始化_ExecutorService_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ExecutorService</span> executorService <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里，我们使用大小为2的固定线程池初始化_ExecutorService_。这创建了一个使用固定数量的线程从共享的无界队列中操作的线程池。在我们的案例中，任何时候，最多有两个线程将被激活来处理任务。如果有更多任务发送，而所有现有任务都在处理中，它们将被保存在队列中，直到处理线程空闲。</p><p>接下来，我们使用_Callable_创建一个任务：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Callable</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\` task <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> numbers <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> numbers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        sum <span class="token operator">+=</span> num<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> sum<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重要的是，这里，_Callable_对象表示返回结果并可能抛出异常的任务。在这种情况下，它表示另一个线程可以执行并返回结果或可能抛出异常的任务。这个_Callable_计算数组中整数的总和并返回结果。</p><p>现在我们已经将任务定义为_Callable_，让我们将这个任务提交给_ExecutorService_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Future</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\` result <span class="token operator">=</span> executorService<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>简单来说，_submit()_方法接受_Callable_任务，并将其提交给_ExecutorService_执行。它返回一个_Future<code>&lt;Integer&gt;</code>_对象，表示计算的未来结果。总的来说，_executorService.submit()_是使用_ExecutorService_异步执行_Callable_任务的一种方式，允许任务的并发执行，并通过返回的_Future_获取它们的结果。</p><p>最后，让我们检查结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> sum <span class="token operator">=</span> result<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;使用submit计算的总和:&quot;</span> <span class="token operator">+</span> sum<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> <span class="token operator">|</span> <span class="token class-name">ExecutionException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，_get()_检索任务执行的结果。在这种情况下，它获取任务计算的总和并打印它。<strong>但重要的是要注意，_get()_方法是一个阻塞调用，如果结果尚不可用，它会等待，可能会导致线程暂停，直到结果准备好</strong>。如果计算在运行时遇到问题，它也可能抛出_InterruptedException或ExecutionException_等异常。</p><p>最后，让我们关闭_ExecutorService_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>executorService<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这在任务完成执行后关闭_ExecutorService_并释放服务使用的任何资源。</p><h2 id="_3-使用-executorservice-execute" tabindex="-1"><a class="header-anchor" href="#_3-使用-executorservice-execute"><span>3. 使用_ExecutorService.execute( )_</span></a></h2><p>_execute()_方法是一个更简单的方法，定义在_Executor_接口中，它是_ExecutorService_的父接口。<strong>它用于提交任务以供执行，但不返回一个</strong> <em><strong>Future</strong></em> **。**这意味着我们不能通过_Future_对象直接获取任务的结果或处理异常。</p><p>它适用于我们不需要等待任务结果，也不期望任何异常的场景。这些任务是为了它们的副作用而执行的。</p><p>像以前一样，我们将创建一个大小为2的固定线程池的_ExecutorService_。然而，我们将创建一个_Runnable_任务：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Runnable</span> task <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> numbers <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> numbers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        sum <span class="token operator">+=</span> num<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;使用execute计算的总和: &quot;</span> <span class="token operator">+</span> sum<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重要的是，任务不返回任何结果；它只是计算总和并在任务内部打印它。我们现在将_Runnable_任务提交给_ExecutorService_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>executorService<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>这仍然是一个异步操作，表示来自线程池的线程之一将执行任务。</strong></p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们查看了_ExecutorService_接口中_submit()_和_execute()_的显著特点和用途。总结来说，这两种方法都提供了一种提交任务以供并发执行的方式，但它们在处理任务结果和异常方面有所不同。</p><p>选择_submit()_和_execute()<em>取决于具体要求。**如果我们需要获取任务的结果或处理异常，我们应该使用_submit()</em>。另一方面，如果我们有一个不返回结果的任务，我们想要发射它并忘记它，_execute()_是正确的选择**。</p><p>此外，如果我们正在处理更复杂的用例并且需要灵活性来管理任务并检索结果或异常，_submit()_是更好的选择。</p><p>像往常一样，本文的完整代码可以在GitHub上找到。</p>`,34),p=[c];function o(u,i){return e(),a("div",null,p)}const d=n(t,[["render",o],["__file","2024-06-25-Difference Between execute   and submit   in Executor Service.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-06-25/2024-06-25-Difference%20Between%20execute%20%20%20and%20submit%20%20%20in%20Executor%20Service.html","title":"Java中ExecutorService的submit()和execute()方法的区别","lang":"zh-CN","frontmatter":{"date":"2024-06-25T00:00:00.000Z","category":["Java","Concurrency"],"tag":["ExecutorService","submit()","execute()"],"head":[["meta",{"name":"keywords","content":"Java, ExecutorService, submit(), execute(), 多线程, 并发"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-25/2024-06-25-Difference%20Between%20execute%20%20%20and%20submit%20%20%20in%20Executor%20Service.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中ExecutorService的submit()和execute()方法的区别"}],["meta",{"property":"og:description","content":"Java中ExecutorService的submit()和execute()方法的区别 多线程和并行处理是现代应用开发中的关键概念。在Java中，_Executor_框架提供了一种有效管理和控制并发任务执行的方式。_ExecutorService_接口是这个框架的核心，它提供了两种常用的方法来提交需要执行的任务：_submit()和_execute(..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-25T12:46:52.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"ExecutorService"}],["meta",{"property":"article:tag","content":"submit()"}],["meta",{"property":"article:tag","content":"execute()"}],["meta",{"property":"article:published_time","content":"2024-06-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-25T12:46:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中ExecutorService的submit()和execute()方法的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-25T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-25T12:46:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中ExecutorService的submit()和execute()方法的区别 多线程和并行处理是现代应用开发中的关键概念。在Java中，_Executor_框架提供了一种有效管理和控制并发任务执行的方式。_ExecutorService_接口是这个框架的核心，它提供了两种常用的方法来提交需要执行的任务：_submit()和_execute(..."},"headers":[{"level":2,"title":"2. 使用_ExecutorService.submit( )_","slug":"_2-使用-executorservice-submit","link":"#_2-使用-executorservice-submit","children":[]},{"level":2,"title":"3. 使用_ExecutorService.execute( )_","slug":"_3-使用-executorservice-execute","link":"#_3-使用-executorservice-execute","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719319612000,"updatedTime":1719319612000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.3,"words":1290},"filePathRelative":"posts/baeldung/2024-06-25/2024-06-25-Difference Between execute   and submit   in Executor Service.md","localizedDate":"2024年6月25日","excerpt":"\\n<p>多线程和并行处理是现代应用开发中的关键概念。在Java中，_Executor_框架提供了一种有效管理和控制并发任务执行的方式。_ExecutorService_接口是这个框架的核心，它提供了两种常用的方法来提交需要执行的任务：_submit()<em>和_execute()</em>。</p>\\n<p>在本文中，我们将探讨这两种方法之间的主要区别。我们将通过一个简单的示例来使用_submit()<em>和_execute()</em>，模拟一个计算数组中数字总和的任务，使用线程池。</p>\\n<h2>2. 使用_ExecutorService.submit( )_</h2>\\n<p>让我们首先从_submit()_方法开始，它广泛用于_ExecutorService_接口。它允许我们提交任务以供执行，并返回一个表示计算结果的_Future_对象。</p>","autoDesc":true}');export{d as comp,m as data};
