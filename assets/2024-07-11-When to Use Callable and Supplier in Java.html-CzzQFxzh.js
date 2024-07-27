import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-CBerKIce.js";const t={},p=e('<h1 id="java中何时使用callable和supplier" tabindex="-1"><a class="header-anchor" href="#java中何时使用callable和supplier"><span>Java中何时使用Callable和Supplier</span></a></h1><p>在本教程中，我们将讨论Callable和Supplier这两个函数式接口，它们在结构上相似但在使用上有所不同。</p><p>Callable和Supplier都返回一个类型化的值，并且不接受任何参数。执行上下文是区分它们的标准。</p><p>在本教程中，我们将重点关注异步任务的上下文。</p><h2 id="_2-模型" tabindex="-1"><a class="header-anchor" href="#_2-模型"><span>2. 模型</span></a></h2><p>在我们开始之前，让我们定义一个类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> surname<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">LocalDate</span> birthDate<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">Integer</span> age<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">Boolean</span> canDriveACar <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// 标准的构造函数、getter和setter</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Callable是在Java版本5中引入的接口，并在版本8中发展为函数式接口。</p><p><strong>它的SAM（单一抽象方法）是call()方法，它返回一个泛型值并可能抛出异常：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">V</span> <span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>它被设计为封装应该由另一个线程执行的任务，例如Runnable接口。这是因为Callable实例可以通过ExecutorService执行。</p><p>那么让我们定义一个实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AgeCalculatorCallable</span> <span class="token keyword">implements</span> <span class="token class-name">Callable</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`````` <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">LocalDate</span> birthDate<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">Integer</span> <span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token class-name">Period</span><span class="token punctuation">.</span><span class="token function">between</span><span class="token punctuation">(</span>birthDate<span class="token punctuation">,</span> <span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getYears</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment">// 标准的构造函数、getter和setter</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当call()方法返回一个值时，主线程检索它以执行其逻辑。为此，我们可以使用Future，这是一个跟踪并在另一个线程执行的任务完成后获取值的对象。</p><h3 id="_3-1-单一任务" tabindex="-1"><a class="header-anchor" href="#_3-1-单一任务"><span>3.1. 单一任务</span></a></h3><p>让我们定义一个只执行一个异步任务的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ExecutorService</span> executorService <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newCachedThreadPool</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Future</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`````` ageFuture <span class="token operator">=</span> executorService<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">AgeCalculatorCallable</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getBirthDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        user<span class="token punctuation">.</span><span class="token function">setAge</span><span class="token punctuation">(</span>ageFuture<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ExecutionException</span> <span class="token operator">|</span> <span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getCause</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> user<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以通过lambda表达式重写submit()的内部块：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Future</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`````` ageFuture <span class="token operator">=</span> executorService<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span>\n  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Period</span><span class="token punctuation">.</span><span class="token function">between</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getBirthDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getYears</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们尝试通过调用get()方法访问返回值时，我们必须处理两个检查异常：</p><ul><li>InterruptedException：在线程睡眠、活跃或占用时发生中断时抛出</li><li>ExecutionException：当任务因抛出异常而中止时抛出。换句话说，它是一个包装异常，中止任务的真实异常是原因（可以使用getCause()方法进行检查）。</li></ul><h3 id="_3-2-任务链" tabindex="-1"><a class="header-anchor" href="#_3-2-任务链"><span>3.2. 任务链</span></a></h3><p>执行属于链的任务取决于之前任务的状态。如果其中一个失败，当前任务无法执行。</p><p>那么让我们定义一个新的Callable：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CarDriverValidatorCallable</span> <span class="token keyword">implements</span> <span class="token class-name">Callable</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Boolean</span><span class="token punctuation">&gt;</span></span>``` <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Integer</span> age<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">Boolean</span> <span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> age <span class="token operator">&gt;</span> <span class="token number">18</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token comment">// 标准的构造函数、getter和setter</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们定义一个任务链，其中第二个任务的输入参数是前一个任务的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ExecutorService</span> executorService <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newCachedThreadPool</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Future</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`````` ageFuture <span class="token operator">=</span> executorService<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">AgeCalculatorCallable</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getBirthDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Integer</span> age <span class="token operator">=</span> ageFuture<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Future</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Boolean</span><span class="token punctuation">&gt;</span></span>``` canDriveACarFuture <span class="token operator">=</span> executorService<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">CarDriverValidatorCallable</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Boolean</span> canDriveACar <span class="token operator">=</span> canDriveACarFuture<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        user<span class="token punctuation">.</span><span class="token function">setAge</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        user<span class="token punctuation">.</span><span class="token function">setCanDriveACar</span><span class="token punctuation">(</span>canDriveACar<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ExecutionException</span> <span class="token operator">|</span> <span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getCause</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> user<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在任务链中使用Callable和Future存在一些问题：</p><ul><li>链中的每个任务都遵循“submit-get”模式。在长链中，这会产生冗长的代码。</li><li>当链对任务失败宽容时，我们应该创建一个专门的try/catch块。</li><li>当调用get()方法时，它将等待Callable返回值。因此，链的总执行时间等于所有任务执行时间的总和。但如果下一个任务仅依赖于正确执行的一个先前任务，链过程将显著减慢。</li></ul><h2 id="_4-supplier" tabindex="-1"><a class="header-anchor" href="#_4-supplier"><span>4. Supplier</span></a></h2><p>Supplier是一个函数式接口，其SAM（单一抽象方法）是get()。</p><p><strong>它不接受任何参数，返回一个值，并且只抛出未检查的异常：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">T</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个接口最常见的用例之一是延迟执行一些代码。</p><p>Optional类有一些方法接受Supplier作为参数，例如Optional.or()，Optional.orElseGet()。</p><p>因此，Supplier仅在Optional为空时执行。</p><p>我们还可以在异步计算上下文中使用它，特别是在CompletableFuture API中。</p><p>一些方法接受Supplier作为参数，例如supplyAsync()方法。</p><h3 id="_4-1-单一任务" tabindex="-1"><a class="header-anchor" href="#_4-1-单一任务"><span>4.1. 单一任务</span></a></h3><p>让我们定义一个只执行一个异步任务的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ExecutorService</span> executorService <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newCachedThreadPool</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">CompletableFuture</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`````` ageFut <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span>\n        <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Period</span><span class="token punctuation">.</span><span class="token function">between</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getBirthDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getYears</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> executorService<span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">exceptionally</span><span class="token punctuation">(</span>throwable <span class="token operator">-&gt;</span> <span class="token punctuation">{</span><span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>throwable<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    user<span class="token punctuation">.</span><span class="token function">setAge</span><span class="token punctuation">(</span>ageFut<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> user<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，lambda表达式定义了Supplier，但我们也可以定义一个实现类。多亏了CompletableFuture，我们定义了一个异步操作的模板，使其更易于理解和修改。</p><p>join()方法提供了Supplier的返回值。</p><h3 id="_4-2-任务链" tabindex="-1"><a class="header-anchor" href="#_4-2-任务链"><span>4.2. 任务链</span></a></h3><p>我们也可以在Supplier接口和CompletableFuture的支持下开发任务链：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ExecutorService</span> executorService <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newCachedThreadPool</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">CompletableFuture</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>`````` ageFut <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span>\n        <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Period</span><span class="token punctuation">.</span><span class="token function">between</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getBirthDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getYears</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> executorService<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">CompletableFuture</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Boolean</span><span class="token punctuation">&gt;</span></span>``` canDriveACarFut <span class="token operator">=</span> ageFut<span class="token punctuation">.</span><span class="token function">thenComposeAsync</span><span class="token punctuation">(</span>\n        age <span class="token operator">-&gt;</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> age <span class="token operator">&gt;</span> <span class="token number">18</span><span class="token punctuation">,</span> executorService<span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">exceptionally</span><span class="token punctuation">(</span><span class="token punctuation">(</span>ex<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    user<span class="token punctuation">.</span><span class="token function">setAge</span><span class="token punctuation">(</span>ageFut<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    user<span class="token punctuation">.</span><span class="token function">setCanDriveACar</span><span class="token punctuation">(</span>canDriveACarFut<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> user<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用CompletableFuture-Supplier方法定义异步任务链可能解决了之前使用Future-Callable方法引入的一些问题：</p><ul><li>链中的每个任务都是隔离的。因此，如果任务执行失败，我们可以通过exceptionally()块处理它。</li><li>join()方法不需要在编译时处理检查异常。</li><li>我们可以设计一个异步任务模板，改进每个任务的状态处理。</li></ul><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们讨论了Callable和Supplier接口之间的区别，重点关注了异步任务的上下文。</p><p><strong>在接口设计层面的主要区别是Callable抛出的检查异常。</strong></p><p>Callable并不是为了函数式上下文而设计的。它是随着时间的推移逐渐适应的，函数式编程和检查异常并不兼容。</p><p>因此，任何函数式API（如CompletableFuture API）总是接受Supplier而不是Callable。</p><p>如常，示例的完整源代码可以在GitHub上找到。</p>',54),c=[p];function l(o,u){return s(),a("div",null,c)}const k=n(t,[["render",l],["__file","2024-07-11-When to Use Callable and Supplier in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-When%20to%20Use%20Callable%20and%20Supplier%20in%20Java.html","title":"Java中何时使用Callable和Supplier","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Concurrency"],"tag":["Callable","Supplier"],"head":[["meta",{"name":"keywords","content":"Java Callable, Java Supplier, 异步任务, 函数式接口"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-When%20to%20Use%20Callable%20and%20Supplier%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中何时使用Callable和Supplier"}],["meta",{"property":"og:description","content":"Java中何时使用Callable和Supplier 在本教程中，我们将讨论Callable和Supplier这两个函数式接口，它们在结构上相似但在使用上有所不同。 Callable和Supplier都返回一个类型化的值，并且不接受任何参数。执行上下文是区分它们的标准。 在本教程中，我们将重点关注异步任务的上下文。 2. 模型 在我们开始之前，让我们定..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T06:46:21.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Callable"}],["meta",{"property":"article:tag","content":"Supplier"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T06:46:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中何时使用Callable和Supplier\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T06:46:21.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中何时使用Callable和Supplier 在本教程中，我们将讨论Callable和Supplier这两个函数式接口，它们在结构上相似但在使用上有所不同。 Callable和Supplier都返回一个类型化的值，并且不接受任何参数。执行上下文是区分它们的标准。 在本教程中，我们将重点关注异步任务的上下文。 2. 模型 在我们开始之前，让我们定..."},"headers":[{"level":2,"title":"2. 模型","slug":"_2-模型","link":"#_2-模型","children":[{"level":3,"title":"3.1. 单一任务","slug":"_3-1-单一任务","link":"#_3-1-单一任务","children":[]},{"level":3,"title":"3.2. 任务链","slug":"_3-2-任务链","link":"#_3-2-任务链","children":[]}]},{"level":2,"title":"4. Supplier","slug":"_4-supplier","link":"#_4-supplier","children":[{"level":3,"title":"4.1. 单一任务","slug":"_4-1-单一任务","link":"#_4-1-单一任务","children":[]},{"level":3,"title":"4.2. 任务链","slug":"_4-2-任务链","link":"#_4-2-任务链","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720680381000,"updatedTime":1720680381000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.7,"words":1411},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-When to Use Callable and Supplier in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将讨论Callable和Supplier这两个函数式接口，它们在结构上相似但在使用上有所不同。</p>\\n<p>Callable和Supplier都返回一个类型化的值，并且不接受任何参数。执行上下文是区分它们的标准。</p>\\n<p>在本教程中，我们将重点关注异步任务的上下文。</p>\\n<h2>2. 模型</h2>\\n<p>在我们开始之前，让我们定义一个类：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">User</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> name<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> surname<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">LocalDate</span> birthDate<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">Integer</span> age<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">Boolean</span> canDriveACar <span class=\\"token operator\\">=</span> <span class=\\"token boolean\\">false</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">// 标准的构造函数、getter和setter</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
