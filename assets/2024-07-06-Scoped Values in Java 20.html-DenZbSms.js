import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CJGTm_7y.js";const p={},e=t('<h1 id="java-20中的范围值-baeldung" tabindex="-1"><a class="header-anchor" href="#java-20中的范围值-baeldung"><span>Java 20中的范围值 | Baeldung</span></a></h1><p>范围值使开发人员能够在线程内部和跨线程存储和共享不可变数据。这个新API是在Java 20中作为孵化器预览特性引入的，由JEP 439提出。</p><p>在本教程中，我们将首先将范围值与线程局部变量进行比较，后者是一个旧的API，具有类似的目的。然后，我们将看看如何应用范围值在线程之间共享数据，重新绑定值，以及在子线程中继承它们。接下来，我们将看看如何在经典Web框架中应用范围值。</p><p>最后，我们将看看如何在Java 20中启用这个孵化器特性以进行实验。</p><h2 id="_2-动机" tabindex="-1"><a class="header-anchor" href="#_2-动机"><span>2. 动机</span></a></h2><p>复杂的Java应用程序通常包含需要在它们之间共享数据的几个模块和组件。当这些组件在多个线程中运行时，开发人员需要一种在它们之间共享不可变数据的方式。</p><p>然而，<strong>不同的线程可能需要不同的数据，并且不应该能够访问或覆盖其他线程拥有的数据</strong>。</p><h3 id="_2-1-线程局部变量" tabindex="-1"><a class="header-anchor" href="#_2-1-线程局部变量"><span>2.1. 线程局部变量</span></a></h3><p>自Java 1.2以来，我们可以利用线程局部变量在组件之间共享数据，而无需使用方法参数。线程局部变量实际上是一种特殊类型的变量_ThreadLocal_。</p><p>尽管它们看起来像普通变量，但<strong>线程局部变量有多个实例，每个线程一个</strong>。将使用的特定实例取决于哪个线程调用getter或setter方法来读取或写入其值。</p><p>线程局部变量通常被声明为公共静态字段，以便许多组件可以轻松访问。</p><h3 id="_2-2-缺点" tabindex="-1"><a class="header-anchor" href="#_2-2-缺点"><span>2.2. 缺点</span></a></h3><p>尽管线程局部变量自1998年以来就已可用，但<strong>API包含三个主要的设计缺陷</strong>。</p><p>首先，每个线程局部变量都是可变的，并且允许任何代码随时调用setter方法。因此，数据可以在组件之间以任何方向流动，使得很难理解哪个组件更新了共享状态以及更新的顺序。</p><p>其次，当我们使用_set_方法写入线程的实例时，数据将保留整个线程的生命周期，或者直到线程调用_remove_方法。如果开发人员忘记调用_remove_方法，数据将在内存中保留比必要的时间更长。</p><p>最后，父线程的线程局部变量可以被子线程继承。当我们创建一个继承线程局部变量的子线程时，新线程将需要为所有父线程局部变量分配额外的存储空间。</p><h3 id="_2-3-虚拟线程" tabindex="-1"><a class="header-anchor" href="#_2-3-虚拟线程"><span>2.3. 虚拟线程</span></a></h3><p>线程局部变量的缺点在Java 19中引入虚拟线程后变得更加紧迫。</p><p>虚拟线程是由JDK而不是操作系统管理的轻量级线程。因此，许多虚拟线程共享相同的操作系统线程，允许开发人员使用大量的虚拟线程。</p><p>由于虚拟线程是_Thread_的实例，它们可能会使用线程局部变量。然而，如果<strong>百万个虚拟线程有可变的线程局部变量，内存占用可能会很大</strong>。</p><p>因此，Java 20引入了范围值API作为解决方案，以维护不可变和可继承的每个线程数据，支持数百万虚拟线程。</p><p>范围值使<strong>在组件之间安全高效地共享不可变数据</strong>成为可能，而无需使用方法参数。它们是与虚拟线程和结构化并发一起开发的，作为Loom项目的一部分。</p><h3 id="_3-1-在线程之间共享数据" tabindex="-1"><a class="header-anchor" href="#_3-1-在线程之间共享数据"><span>3.1. 在线程之间共享数据</span></a></h3><p>与线程局部变量类似，范围值使用多个实例，每个线程一个。它们通常也被声明为公共静态字段，可以被许多组件轻松访问：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">static</span> <span class="token class-name">ScopedValue</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>``` <span class="token constant">LOGGED_IN_USER</span> <span class="token operator">=</span> <span class="token class-name">ScopedValue</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>另一方面，<strong>范围值只写一次，然后是不可变的</strong>。范围值仅在线程执行的有限期间内可用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ScopedValue</span><span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token constant">LOGGED_IN_USER</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span>\n  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> service<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_where_方法需要一个范围值和一个对象，它应该绑定到该对象。当调用_run_方法时，范围值被绑定，创建了一个当前线程独有的实例，然后执行lambda表达式。</p><p>在_run_方法的生命周期内，任何方法，无论是直接还是间接从表达式调用，都有能力读取范围值。然而，当_run_方法完成后，绑定被销毁。</p><p>范围变量的有限生命周期和不可变性有助于简化对线程行为的推理。不可变性有助于确保更好的性能，并且数据只在一个方向上传输：从调用者到被调用者。</p><h3 id="_3-2-继承范围值" tabindex="-1"><a class="header-anchor" href="#_3-2-继承范围值"><span>3.2. 继承范围值</span></a></h3><p>范围值是<strong>自动被子线程继承的，这些子线程是使用_StructuredTaskScope_创建的</strong>。子线程可以使用在父线程中为范围值建立的绑定：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token keyword">var</span> scope <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StructuredTaskScope<span class="token punctuation">.</span>ShutdownOnFailure</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Future</span>`<span class="token operator">&lt;</span><span class="token class-name">Optional</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Data</span><span class="token punctuation">&gt;</span></span>````````<span class="token operator">&gt;</span> internalData <span class="token operator">=</span> scope<span class="token punctuation">.</span><span class="token function">fork</span><span class="token punctuation">(</span>\n      <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> internalService<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Future</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>` externalData <span class="token operator">=</span> scope<span class="token punctuation">.</span><span class="token function">fork</span><span class="token punctuation">(</span>externalService<span class="token operator">::</span><span class="token function">getData</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        scope<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        scope<span class="token punctuation">.</span><span class="token function">throwIfFailed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token class-name">Optional</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Data</span><span class="token punctuation">&gt;</span></span>``````` data <span class="token operator">=</span> internalData<span class="token punctuation">.</span><span class="token function">resultNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token comment">// 在响应中返回数据并设置适当的HTTP状态</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> <span class="token operator">|</span> <span class="token class-name">ExecutionException</span> <span class="token operator">|</span> <span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        response<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们仍然可以从通过_fork_方法创建的子线程中运行的服务访问范围值。然而，与线程局部变量不同，没有从父线程到子线程的范围值复制。</p><h3 id="_3-3-重新绑定范围值" tabindex="-1"><a class="header-anchor" href="#_3-3-重新绑定范围值"><span>3.3. 重新绑定范围值</span></a></h3><p>由于范围值是不可变的，它们不支持用于更改存储值的_set_方法。然而，我们可以<strong>在有限代码段的调用中重新绑定范围值</strong>。</p><p>例如，我们可以使用_where_方法通过将范围值设置为_null_来隐藏在_run_中调用的方法的范围值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ScopedValue</span><span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token class-name">Server</span><span class="token punctuation">.</span><span class="token constant">LOGGED_IN_USER</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span>service<span class="token operator">::</span><span class="token function">extractData</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，一旦该代码段终止，原始值将再次可用。我们应该注意到_run_方法的返回类型是void。如果我们的服务返回一个值，我们可以利用_call_方法来启用返回值的处理。</p><h2 id="_4-web示例" tabindex="-1"><a class="header-anchor" href="#_4-web示例"><span>4. Web示例</span></a></h2><p>现在让我们看看如何在经典Web框架用例中应用范围值，以共享登录用户的数据。</p><h3 id="_4-1-经典web框架" tabindex="-1"><a class="header-anchor" href="#_4-1-经典web框架"><span>4.1. 经典Web框架</span></a></h3><p>Web服务器在传入请求上对用户进行身份验证，并<strong>使登录用户的数据可用于处理请求的代码</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">serve</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span><span class="token punctuation">,</span> <span class="token class-name">ExecutionException</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Optional</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>``` user <span class="token operator">=</span> <span class="token function">authenticateUser</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Future</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span>` future <span class="token operator">=</span> executor<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span>\n          controller<span class="token punctuation">.</span><span class="token function">processRequest</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">,</span> user<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token punctuation">)</span><span class="token punctuation">;</span>\n        future<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        response<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token number">401</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>处理请求的控制器通过方法参数接收登录用户的数据：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">processRequest</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span> <span class="token class-name">User</span> loggedInUser<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Optional</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Data</span><span class="token punctuation">&gt;</span></span>``````` data <span class="token operator">=</span> service<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> loggedInUser<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">// 在响应中返回数据并设置适当的HTTP状态</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>服务也从控制器接收登录用户的数据，但它不使用它。相反，它只是将信息传递给仓库：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Optional</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Data</span><span class="token punctuation">&gt;</span></span>``````` <span class="token function">getData</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">User</span> loggedInUser<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> id <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token string">&quot;data_id&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> repository<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> loggedInUser<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在仓库中，我们最终使用登录用户的数据来检查用户是否具有足够的权限：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Optional</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Data</span><span class="token punctuation">&gt;</span></span>``````` <span class="token function">getData</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">,</span> <span class="token class-name">User</span> loggedInUser<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> loggedInUser<span class="token punctuation">.</span><span class="token function">isAdmin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token operator">?</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Data</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> <span class="token string">&quot;Title 1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Description 1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token operator">:</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在一个更复杂的Web应用程序中，请求处理可以扩展到大量的方法。即使登录用户的数据只在少数方法中需要，我们可能需要通过所有方法传递它。</p><p>使用方法参数传递信息将使我们的代码变得嘈杂，我们很快就会超过每方法推荐三个参数的限制。</p><h3 id="_4-2-应用作用域值" tabindex="-1"><a class="header-anchor" href="#_4-2-应用作用域值"><span>4.2. 应用作用域值</span></a></h3><p>一种替代方法是将登录用户的数据存储在一个可以从任何方法访问的<strong>作用域值</strong>中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">serve</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Optional</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>``` user <span class="token operator">=</span> <span class="token function">authenticateUser</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">ScopedValue</span><span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token constant">LOGGED_IN_USER</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n                <span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> controller<span class="token punctuation">.</span><span class="token function">processRequest</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        response<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token number">401</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们现在可以从所有方法中移除_loggedInUser_参数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">processRequest</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Optional</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Data</span><span class="token punctuation">&gt;</span></span>``````` data <span class="token operator">=</span> internalService<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">// 在响应中返回数据并设置适当的HTTP状态</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的服务不需要关心将登录用户的数据传递给仓库：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Optional</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Data</span><span class="token punctuation">&gt;</span></span>``````` <span class="token function">getData</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> id <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token string">&quot;data_id&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> repository<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>相反，仓库可以通过调用作用域值的_get_方法来检索登录用户的数据：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Optional</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Data</span><span class="token punctuation">&gt;</span></span>``````` <span class="token function">getData</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">User</span> loggedInUser <span class="token operator">=</span> <span class="token class-name">Server</span><span class="token punctuation">.</span><span class="token constant">LOGGED_IN_USER</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> loggedInUser<span class="token punctuation">.</span><span class="token function">isAdmin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token operator">?</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Data</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> <span class="token string">&quot;Title 1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Description 1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token operator">:</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，应用作用域变量确保了我们的代码更具可读性和可维护性。</p>',62),c=[e];function o(l,u){return a(),s("div",null,c)}const k=n(p,[["render",o],["__file","2024-07-06-Scoped Values in Java 20.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Scoped%20Values%20in%20Java%2020.html","title":"Java 20中的范围值 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-07-06T00:00:00.000Z","category":["Java","编程"],"tag":["Java 20","Scoped Values"],"head":[["meta",{"name":"keywords","content":"Java 20, Scoped Values, 线程安全, 线程局部变量, Java新特性"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Scoped%20Values%20in%20Java%2020.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 20中的范围值 | Baeldung"}],["meta",{"property":"og:description","content":"Java 20中的范围值 | Baeldung 范围值使开发人员能够在线程内部和跨线程存储和共享不可变数据。这个新API是在Java 20中作为孵化器预览特性引入的，由JEP 439提出。 在本教程中，我们将首先将范围值与线程局部变量进行比较，后者是一个旧的API，具有类似的目的。然后，我们将看看如何应用范围值在线程之间共享数据，重新绑定值，以及在子线..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T08:38:50.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 20"}],["meta",{"property":"article:tag","content":"Scoped Values"}],["meta",{"property":"article:published_time","content":"2024-07-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T08:38:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 20中的范围值 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T08:38:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 20中的范围值 | Baeldung 范围值使开发人员能够在线程内部和跨线程存储和共享不可变数据。这个新API是在Java 20中作为孵化器预览特性引入的，由JEP 439提出。 在本教程中，我们将首先将范围值与线程局部变量进行比较，后者是一个旧的API，具有类似的目的。然后，我们将看看如何应用范围值在线程之间共享数据，重新绑定值，以及在子线..."},"headers":[{"level":2,"title":"2. 动机","slug":"_2-动机","link":"#_2-动机","children":[{"level":3,"title":"2.1. 线程局部变量","slug":"_2-1-线程局部变量","link":"#_2-1-线程局部变量","children":[]},{"level":3,"title":"2.2. 缺点","slug":"_2-2-缺点","link":"#_2-2-缺点","children":[]},{"level":3,"title":"2.3. 虚拟线程","slug":"_2-3-虚拟线程","link":"#_2-3-虚拟线程","children":[]},{"level":3,"title":"3.1. 在线程之间共享数据","slug":"_3-1-在线程之间共享数据","link":"#_3-1-在线程之间共享数据","children":[]},{"level":3,"title":"3.2. 继承范围值","slug":"_3-2-继承范围值","link":"#_3-2-继承范围值","children":[]},{"level":3,"title":"3.3. 重新绑定范围值","slug":"_3-3-重新绑定范围值","link":"#_3-3-重新绑定范围值","children":[]}]},{"level":2,"title":"4. Web示例","slug":"_4-web示例","link":"#_4-web示例","children":[{"level":3,"title":"4.1. 经典Web框架","slug":"_4-1-经典web框架","link":"#_4-1-经典web框架","children":[]},{"level":3,"title":"4.2. 应用作用域值","slug":"_4-2-应用作用域值","link":"#_4-2-应用作用域值","children":[]}]}],"git":{"createdTime":1720255130000,"updatedTime":1720255130000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.31,"words":2194},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Scoped Values in Java 20.md","localizedDate":"2024年7月6日","excerpt":"\\n<p>范围值使开发人员能够在线程内部和跨线程存储和共享不可变数据。这个新API是在Java 20中作为孵化器预览特性引入的，由JEP 439提出。</p>\\n<p>在本教程中，我们将首先将范围值与线程局部变量进行比较，后者是一个旧的API，具有类似的目的。然后，我们将看看如何应用范围值在线程之间共享数据，重新绑定值，以及在子线程中继承它们。接下来，我们将看看如何在经典Web框架中应用范围值。</p>\\n<p>最后，我们将看看如何在Java 20中启用这个孵化器特性以进行实验。</p>\\n<h2>2. 动机</h2>\\n<p>复杂的Java应用程序通常包含需要在它们之间共享数据的几个模块和组件。当这些组件在多个线程中运行时，开发人员需要一种在它们之间共享不可变数据的方式。</p>","autoDesc":true}');export{k as comp,d as data};
