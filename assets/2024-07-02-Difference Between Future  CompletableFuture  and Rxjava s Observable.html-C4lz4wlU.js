import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-YddbDb53.js";const t={},p=e('<h1 id="java-中的-future、completablefuture-和-rxjava-的-observable-之间的区别" tabindex="-1"><a class="header-anchor" href="#java-中的-future、completablefuture-和-rxjava-的-observable-之间的区别"><span>Java 中的 Future、CompletableFuture 和 RxJava 的 Observable 之间的区别</span></a></h1><p>在 Java 中，我们有几种方式可以异步运行任务。Java 本身内置了 <code>Future</code> 和 <code>CompletableFuture</code>。我们还可以使用 RxJava 库，它提供了 <code>Observable</code> 类。在本文中，我们将探讨这三种方式的区别以及每种方式的优缺点和潜在用例。</p><p><code>Future</code> 接口首次出现在 Java 5 中，并且功能非常有限。一个 <code>Future</code> 的实例是一个异步进程将产生的结果的占位符，可能尚未可用。提供了一小系列方法来帮助这个过程。我们可以取消一个任务或从已完成的任务中获取结果，还可以检查任务是否已被取消或完成。</p><p>让我们通过创建一个示例异步任务来实际演示。我们将有一个对象和一个 <code>Callable</code>，它的行为就像是从数据库中检索该对象。我们的对象可以非常简单：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">TestObject</span> <span class="token punctuation">{</span>\n    <span class="token keyword">int</span> dataPointOne<span class="token punctuation">;</span>\n    <span class="token keyword">int</span> dataPointTwo<span class="token punctuation">;</span>\n    <span class="token class-name">TestObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        dataPointOne <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token comment">// 标准 getter 和 setter</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用构造函数时，我们返回一个设置了其中一个数据点的 <code>TestObject</code> 实例。现在我们可以创建第二个类实现 <code>Callable</code> 接口来为我们创建该对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">ObjectCallable</span> <span class="token keyword">implements</span> <span class="token class-name">Callable</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TestObject</span><span class="token punctuation">&gt;</span></span>````` <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token class-name">TestObject</span> <span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">TestObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了这两个对象的设置，我们可以编写一个测试来使用 <code>Future</code> 获取 <code>TestObject</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">whenRetrievingObjectWithBasicFuture_thenExpectOnlySingleDataPointSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ExecutionException</span><span class="token punctuation">,</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ExecutorService</span> exec <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newSingleThreadExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Future</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TestObject</span><span class="token punctuation">&gt;</span></span>````` future <span class="token operator">=</span> exec<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ObjectCallable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">TestObject</span> retrievedObject <span class="token operator">=</span> future<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> retrievedObject<span class="token punctuation">.</span><span class="token function">getDataPointOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> retrievedObject<span class="token punctuation">.</span><span class="token function">getDataPointTwo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个 <code>ExecutorService</code>，我们可以向其中提交任务。接下来，我们提交了我们的 <code>ObjectCallable</code> 类，并得到了一个 <code>Future</code> 作为返回。最后，我们可以调用 <code>Future</code> 上的 <code>get()</code> 来获取结果。从断言中我们可以看到，我们得到了一个只填充了一个数据点的对象。</p><h2 id="_3-completablefuture" tabindex="-1"><a class="header-anchor" href="#_3-completablefuture"><span>3. <code>CompletableFuture</code></span></a></h2><p><code>CompletableFuture</code> 是 <code>Future</code> 接口的一个实现，它在 Java 8 中发布。它扩展了 <code>Future</code> 的基本功能，让我们可以对我们的异步操作结果有更多的控制。增加的一个最重要的功能是可以选择将函数调用链到初始任务的结果上。让我们通过重复上一节中的任务来实际演示这一点。但这次，我们希望在检索后填充对象。让我们创建一个具有填充方法的对象，以填充 <code>TestObject</code> 中的第二个数据点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">ObjectHydrator</span> <span class="token punctuation">{</span>\n    <span class="token class-name">TestObject</span> <span class="token function">hydrateTestObject</span><span class="token punctuation">(</span><span class="token class-name">TestObject</span> testObject<span class="token punctuation">)</span><span class="token punctuation">{</span>\n        testObject<span class="token punctuation">.</span><span class="token function">setDataPointTwo</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> testObject<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还需要从 <code>Supplier</code> 的实现中检索我们的初始 TestObject：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">ObjectSupplier</span> <span class="token keyword">implements</span> <span class="token class-name">Supplier</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TestObject</span><span class="token punctuation">&gt;</span></span>````` <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token class-name">TestObject</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">TestObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了这两个类，让我们将它们投入使用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenACompletableFuture_whenHydratingObjectAfterRetrieval_thenExpectBothDataPointsSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ExecutionException</span><span class="token punctuation">,</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ExecutorService</span> exec <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newSingleThreadExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">ObjectHydrator</span> objectHydrator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectHydrator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">CompletableFuture</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TestObject</span><span class="token punctuation">&gt;</span></span>````` future <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ObjectSupplier</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> exec<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">thenApply</span><span class="token punctuation">(</span>objectHydrator<span class="token operator">::</span><span class="token function">hydrateTestObject</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">TestObject</span> retrievedObject <span class="token operator">=</span> future<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> retrievedObject<span class="token punctuation">.</span><span class="token function">getDataPointOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> retrievedObject<span class="token punctuation">.</span><span class="token function">getDataPointTwo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这次我们从断言中看到，由于能够链式调用填充方法，我们的两个数据点都已设置。</p><h2 id="_4-rxjava-的-observable" tabindex="-1"><a class="header-anchor" href="#_4-rxjava-的-observable"><span>4. RxJava 的 <code>Observable</code></span></a></h2><p>RxJava 是一个库，它允许我们按照响应式编程范式构建事件驱动和异步程序。</p><p>要在项目中使用 RxJava，我们需要将其导入到我们的 pom.xml 中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`io.reactivex.rxjava3`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`rxjava`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`3.1.6`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最新版本可在 Maven 仓库中找到。</p><p>这个库可以做很多事情，但今天，我们将专注于 <code>Observable</code> 类。一个 <code>Observable</code> 向 <code>Observer</code> 提供数据，无论是按需还是数据可用时。要像我们使用 <code>Future</code> 和 <code>CompletableFuture</code> 那样异步运行任务，我们可以创建一个 <code>Observable</code>，当请求时，它将从异步源产生数据：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenAnObservable_whenRequestingData_thenItIsRetrieved</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ObjectHydrator</span> objectHydrator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectHydrator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Observable</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TestObject</span><span class="token punctuation">&gt;</span></span>````` observable <span class="token operator">=</span> <span class="token class-name">Observable</span><span class="token punctuation">.</span><span class="token function">fromCallable</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ObjectCallable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>objectHydrator<span class="token operator">::</span><span class="token function">hydrateTestObject</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    observable<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token operator">::</span><span class="token function">println</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们从我们的 <code>ObjectCallable</code> 类创建了一个 <code>Observable</code>，并使用 <code>map()</code> 应用了我们的填充器。然后我们订阅了 <code>Observable</code> 并提供了一个处理结果的方法。在我们的例子中，我们只是简单地将结果记录了出来。这与我们的 <code>CompletableFuture</code> 实现具有完全相同的最终结果。<code>subscribe()</code> 方法的作用与 <code>CompletableFutures</code> 的 <code>get()</code> 相同。</p><p>虽然我们显然可以使用 RxJava 达到与 <code>CompletableFuture</code> 相同的目的，但我们还注意到它是一个提供大量其他功能的广泛库。一个例子是，我们可以以完全不同的方式执行相同的任务。我们可以创建一个 <code>Observable</code>，它将等待数据到达，然后数据可以从其他地方推送给它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenAnObservable_whenPushedData_thenItIsReceived</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">PublishSubject</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`` source <span class="token operator">=</span> <span class="token class-name">PublishSubject</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Observable</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`` observable <span class="token operator">=</span> source<span class="token punctuation">.</span><span class="token function">observeOn</span><span class="token punctuation">(</span><span class="token class-name">Schedulers</span><span class="token punctuation">.</span><span class="token function">computation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    observable<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token operator">::</span><span class="token function">println</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>throwable<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Error&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Done&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    source<span class="token punctuation">.</span><span class="token function">onNext</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    source<span class="token punctuation">.</span><span class="token function">onNext</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    source<span class="token punctuation">.</span><span class="token function">onNext</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    source<span class="token punctuation">.</span><span class="token function">onComplete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当运行这个测试时，它产生了以下输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>1\n2\n3\nDone\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以我们能够订阅一个尚未产生任何内容的数据源，并且简单地等待。一旦数据准备好，我们使用 <code>onNext()</code> 将其推送到源上，并通过我们的订阅得到通知。这是 RxJava 允许的响应式编程风格的一个例子。我们对事件和新数据做出反应，这些数据是由外部源推送给我们的，而不是我们自己请求的。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们看到了早期 Java 中的 <code>Future</code> 接口允许我们以有限但有用的方式异步执行任务并稍后获取结果。接下来，我们探讨了较新的实现 <code>CompletableFuture</code> 带来的优势。这使我们能够串联方法调用，并提供对整个过程的更大控制。</p><p>最后，我们看到我们可以用 RxJava 完成相同的工作，但我们也注意到它是一个广泛的库，允许我们做更多的事情。我们简要地看了如何使用 RxJava 异步推送任务到 <code>Observer</code>，同时无限期地订阅数据流。</p><p>如往常一样，示例的完整代码可以在 GitHub 上找到。</p>',35),c=[p];function o(l,u){return s(),a("div",null,c)}const d=n(t,[["render",o],["__file","2024-07-02-Difference Between Future  CompletableFuture  and Rxjava s Observable.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-Difference%20Between%20Future%20%20CompletableFuture%20%20and%20Rxjava%20s%20Observable.html","title":"Java 中的 Future、CompletableFuture 和 RxJava 的 Observable 之间的区别","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","RxJava"],"tag":["Future","CompletableFuture","Observable"],"head":[["meta",{"name":"keywords","content":"Java, CompletableFuture, Future, RxJava, Observable, 异步编程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-Difference%20Between%20Future%20%20CompletableFuture%20%20and%20Rxjava%20s%20Observable.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 中的 Future、CompletableFuture 和 RxJava 的 Observable 之间的区别"}],["meta",{"property":"og:description","content":"Java 中的 Future、CompletableFuture 和 RxJava 的 Observable 之间的区别 在 Java 中，我们有几种方式可以异步运行任务。Java 本身内置了 Future 和 CompletableFuture。我们还可以使用 RxJava 库，它提供了 Observable 类。在本文中，我们将探讨这三种方式的区别..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T11:28:33.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Future"}],["meta",{"property":"article:tag","content":"CompletableFuture"}],["meta",{"property":"article:tag","content":"Observable"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T11:28:33.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 中的 Future、CompletableFuture 和 RxJava 的 Observable 之间的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T11:28:33.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 中的 Future、CompletableFuture 和 RxJava 的 Observable 之间的区别 在 Java 中，我们有几种方式可以异步运行任务。Java 本身内置了 Future 和 CompletableFuture。我们还可以使用 RxJava 库，它提供了 Observable 类。在本文中，我们将探讨这三种方式的区别..."},"headers":[{"level":2,"title":"3. CompletableFuture","slug":"_3-completablefuture","link":"#_3-completablefuture","children":[]},{"level":2,"title":"4. RxJava 的 Observable","slug":"_4-rxjava-的-observable","link":"#_4-rxjava-的-observable","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719919713000,"updatedTime":1719919713000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.02,"words":1505},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-Difference Between Future  CompletableFuture  and Rxjava s Observable.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在 Java 中，我们有几种方式可以异步运行任务。Java 本身内置了 <code>Future</code> 和 <code>CompletableFuture</code>。我们还可以使用 RxJava 库，它提供了 <code>Observable</code> 类。在本文中，我们将探讨这三种方式的区别以及每种方式的优缺点和潜在用例。</p>\\n<p><code>Future</code> 接口首次出现在 Java 5 中，并且功能非常有限。一个 <code>Future</code> 的实例是一个异步进程将产生的结果的占位符，可能尚未可用。提供了一小系列方法来帮助这个过程。我们可以取消一个任务或从已完成的任务中获取结果，还可以检查任务是否已被取消或完成。</p>","autoDesc":true}');export{d as comp,k as data};
