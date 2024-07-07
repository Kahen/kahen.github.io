import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-B0JIQbDY.js";const e={},p=t('<hr><h1 id="在spring中设置异步重试机制" tabindex="-1"><a class="header-anchor" href="#在spring中设置异步重试机制"><span>在Spring中设置异步重试机制</span></a></h1><hr><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>有时，我们需要代码执行是异步的，以提高应用程序的性能和响应能力。此外，我们可能希望在遇到任何异常时自动重新调用代码，因为我们预计会遇到像网络故障这样的偶尔失败。</p><p>在本教程中，我们将学习如何在Spring应用程序中实现异步执行与自动重试。</p><p>我们将探索Spring对异步(<em>async</em>)和重试(<em>retry</em>)操作的支持。</p><h2 id="_2-spring-boot中的示例应用程序" tabindex="-1"><a class="header-anchor" href="#_2-spring-boot中的示例应用程序"><span>2. Spring Boot中的示例应用程序</span></a></h2><p>让我们想象我们需要构建一个简单的微服务，该服务调用下游服务来处理一些数据。</p><h3 id="_2-1-maven依赖项" tabindex="-1"><a class="header-anchor" href="#_2-1-maven依赖项"><span>2.1. Maven依赖项</span></a></h3><p>首先，我们需要包含_spring-boot-starter-web_ maven依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.springframework.boot``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``spring-boot-starter-web``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-实现spring服务" tabindex="-1"><a class="header-anchor" href="#_2-2-实现spring服务"><span>2.2. 实现Spring服务</span></a></h3><p>现在，我们将实现_EventService_类的调用另一个服务的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">processEvents</span><span class="token punctuation">(</span><span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` events<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    downstreamService<span class="token punctuation">.</span><span class="token function">publishEvents</span><span class="token punctuation">(</span>events<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token string">&quot;Completed&quot;</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，让我们定义_DownstreamService_接口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">DownstreamService</span> <span class="token punctuation">{</span>\n    <span class="token keyword">boolean</span> <span class="token function">publishEvents</span><span class="token punctuation">(</span><span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` events<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-实现带有重试的异步执行" tabindex="-1"><a class="header-anchor" href="#_3-实现带有重试的异步执行"><span>3. 实现带有重试的异步执行</span></a></h2><p>要实现带有重试的异步执行，我们将使用Spring的实现。</p><p>我们需要使用_async_和_retry_支持来配置应用程序。</p><h3 id="_3-1-添加-retry-maven依赖项" tabindex="-1"><a class="header-anchor" href="#_3-1-添加-retry-maven依赖项"><span>3.1. 添加_Retry_ Maven依赖项</span></a></h3><p>让我们将_spring-retry_添加到maven依赖项中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.springframework.retry``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``spring-retry``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`2.0.4`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-enableasync-和-enableretry-配置" tabindex="-1"><a class="header-anchor" href="#_3-2-enableasync-和-enableretry-配置"><span>3.2. <em>@EnableAsync</em> 和 <em>@EnableRetry</em> 配置</span></a></h3><p>接下来<strong>我们需要包括_@EnableAsync_和_@EnableRetry_</strong> <strong>注解</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>\n<span class="token annotation punctuation">@ComponentScan</span><span class="token punctuation">(</span><span class="token string">&quot;com.baeldung.asyncwithretry&quot;</span><span class="token punctuation">)</span>\n<span class="token annotation punctuation">@EnableRetry</span>\n<span class="token annotation punctuation">@EnableAsync</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AsyncConfig</span> <span class="token punctuation">{</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-包含-async-和-retryable-注解" tabindex="-1"><a class="header-anchor" href="#_3-3-包含-async-和-retryable-注解"><span>3.3. 包含_@Async_ 和 <em>@Retryable</em> 注解</span></a></h3><p>为了异步执行方法，我们需要使用_@Async_注解。类似地，我们将使用_@Retryable注解_来重试执行。</p><p>让我们在上述_EventService_方法中配置上述注解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Async</span>\n<span class="token annotation punctuation">@Retryable</span><span class="token punctuation">(</span>retryFor <span class="token operator">=</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> maxAttempts <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">,</span> backoff <span class="token operator">=</span> <span class="token annotation punctuation">@Backoff</span><span class="token punctuation">(</span>delay <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token class-name">Future</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` <span class="token function">processEvents</span><span class="token punctuation">(</span><span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` events<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Processing asynchronously with Thread {}&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    downstreamService<span class="token punctuation">.</span><span class="token function">publishEvents</span><span class="token punctuation">(</span>events<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">CompletableFuture</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` future <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CompletableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    future<span class="token punctuation">.</span><span class="token function">complete</span><span class="token punctuation">(</span><span class="token string">&quot;Completed&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Completed async method with Thread {}&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> future<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们正在重试方法以防出现_RuntimeException_，并将结果作为_Future_对象返回。</p><p>我们应该注意，<strong>我们应该使用_Future_来包装任何异步方法的响应</strong>。</p><p>我们应该注意，_@Async_注解<strong>仅在公共方法上工作</strong>，并且不应在同一类中自调用。自调用方法将绕过Spring代理调用，并在同一线程中运行。</p><h2 id="_4-对-async-和-retryable-的实现测试" tabindex="-1"><a class="header-anchor" href="#_4-对-async-和-retryable-的实现测试"><span>4. 对_@Async_和_@Retryable_的实现测试</span></a></h2><p>让我们测试_EventService_方法，并验证其异步和重试行为的几个测试用例。</p><p>首先，我们将实现一个测试用例，当_DownstreamService_调用没有错误时：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenAsyncMethodHasNoRuntimeException_whenAsyncMethodIscalled_thenReturnSuccess_WithoutAnyRetry</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n    <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Testing for async with retry execution with thread &quot;</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">when</span><span class="token punctuation">(</span>downstreamService<span class="token punctuation">.</span><span class="token function">publishEvents</span><span class="token punctuation">(</span><span class="token function">anyList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Future</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` resultFuture <span class="token operator">=</span> eventService<span class="token punctuation">.</span><span class="token function">processEvents</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;test1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>resultFuture<span class="token punctuation">.</span><span class="token function">isDone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>resultFuture<span class="token punctuation">.</span><span class="token function">isCancelled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token function">assertTrue</span><span class="token punctuation">(</span>resultFuture<span class="token punctuation">.</span><span class="token function">isDone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Completed&quot;</span><span class="token punctuation">,</span> resultFuture<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">verify</span><span class="token punctuation">(</span>downstreamService<span class="token punctuation">,</span> <span class="token function">times</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">publishEvents</span><span class="token punctuation">(</span><span class="token function">anyList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述测试中，我们正在等待_Future_完成，然后断言结果。</p><p>然后，让我们运行上述测试并验证测试日志：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>18:59:24.064 [main] INFO com.baeldung.asyncwithretry.EventServiceIntegrationTest - Testing for async with retry execution with thread main\n18:59:24.078 [SimpleAsyncTaskExecutor-1] INFO com.baeldung.asyncwithretry.EventService - Processing asynchronously with Thread SimpleAsyncTaskExecutor-1\n18:59:24.080 [SimpleAsyncTaskExecutor-1] INFO com.baeldung.asyncwithretry.EventService - Completed async method with Thread SimpleAsyncTaskExecutor-1\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上述日志中，我们确认服务方法在单独的线程中运行。</p><p>接下来，我们将实现另一个测试用例，其中_DownstreamService_方法抛出_RuntimeException_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenAsyncMethodHasRuntimeException_whenAsyncMethodIsCalled_thenReturnFailure_With_MultipleRetries</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>\n    <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Testing for async with retry execution with thread &quot;</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">when</span><span class="token punctuation">(</span>downstreamService<span class="token punctuation">.</span><span class="token function">publishEvents</span><span class="token punctuation">(</span><span class="token function">anyList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenThrow</span><span class="token punctuation">(</span><span class="token class-name">RuntimeException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Future</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` resultFuture <span class="token operator">=</span> eventService<span class="token punctuation">.</span><span class="token function">processEvents</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;test1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>resultFuture<span class="token punctuation">.</span><span class="token function">isDone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>resultFuture<span class="token punctuation">.</span><span class="token function">isCancelled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token function">assertTrue</span><span class="token punctuation">(</span>resultFuture<span class="token punctuation">.</span><span class="token function">isDone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">ExecutionException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> resultFuture<span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">verify</span><span class="token punctuation">(</span>downstreamService<span class="token punctuation">,</span> <span class="token function">times</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">publishEvents</span><span class="token punctuation">(</span><span class="token function">anyList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们通过输出日志来验证上述测试用例：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>19:01:32.307 [main] INFO com.baeldung.asyncwithretry.EventServiceIntegrationTest - Testing for async with retry execution with thread main\n19:01:32.318 [SimpleAsyncTaskExecutor-1] INFO com.baeldung.asyncwithretry.EventService - Processing asynchronously with Thread SimpleAsyncTaskExecutor-1\n19:01:32.425 [SimpleAsyncTaskExecutor-1] INFO com.baeldung.asyncwithretry.EventService - Processing asynchronously with Thread SimpleAsyncTaskExecutor-1\n.....\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上述日志中，我们确认服务方法异步重试了四次。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何在Spring中实现带有重试机制的异步方法。</p><p>我们在示例应用程序中实现了这一点，并尝试了一些测试，以查看它如何处理不同的用例。我们看到了异步代码如何在自己的线程上运行，并可以自动重试。</p><p>如常，示例代码可以在GitHub上找到。</p>',50),c=[p];function o(i,l){return a(),s("div",null,c)}const k=n(e,[["render",o],["__file","2024-06-26-Setup Asynchronous Retry Mechanism in Spring.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-Setup%20Asynchronous%20Retry%20Mechanism%20in%20Spring.html","title":"在Spring中设置异步重试机制","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Spring","Asynchronous Programming"],"tag":["Spring Boot","Async","Retry"],"head":[["meta",{"name":"keywords","content":"Spring, Asynchronous, Retry, Spring Boot, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-Setup%20Asynchronous%20Retry%20Mechanism%20in%20Spring.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Spring中设置异步重试机制"}],["meta",{"property":"og:description","content":"在Spring中设置异步重试机制 1. 概述 有时，我们需要代码执行是异步的，以提高应用程序的性能和响应能力。此外，我们可能希望在遇到任何异常时自动重新调用代码，因为我们预计会遇到像网络故障这样的偶尔失败。 在本教程中，我们将学习如何在Spring应用程序中实现异步执行与自动重试。 我们将探索Spring对异步(async)和重试(retry)操作的支..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T22:31:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"Async"}],["meta",{"property":"article:tag","content":"Retry"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T22:31:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Spring中设置异步重试机制\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T22:31:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Spring中设置异步重试机制 1. 概述 有时，我们需要代码执行是异步的，以提高应用程序的性能和响应能力。此外，我们可能希望在遇到任何异常时自动重新调用代码，因为我们预计会遇到像网络故障这样的偶尔失败。 在本教程中，我们将学习如何在Spring应用程序中实现异步执行与自动重试。 我们将探索Spring对异步(async)和重试(retry)操作的支..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Spring Boot中的示例应用程序","slug":"_2-spring-boot中的示例应用程序","link":"#_2-spring-boot中的示例应用程序","children":[{"level":3,"title":"2.1. Maven依赖项","slug":"_2-1-maven依赖项","link":"#_2-1-maven依赖项","children":[]},{"level":3,"title":"2.2. 实现Spring服务","slug":"_2-2-实现spring服务","link":"#_2-2-实现spring服务","children":[]}]},{"level":2,"title":"3. 实现带有重试的异步执行","slug":"_3-实现带有重试的异步执行","link":"#_3-实现带有重试的异步执行","children":[{"level":3,"title":"3.1. 添加_Retry_ Maven依赖项","slug":"_3-1-添加-retry-maven依赖项","link":"#_3-1-添加-retry-maven依赖项","children":[]},{"level":3,"title":"3.2. @EnableAsync 和 @EnableRetry 配置","slug":"_3-2-enableasync-和-enableretry-配置","link":"#_3-2-enableasync-和-enableretry-配置","children":[]},{"level":3,"title":"3.3. 包含_@Async_ 和 @Retryable 注解","slug":"_3-3-包含-async-和-retryable-注解","link":"#_3-3-包含-async-和-retryable-注解","children":[]}]},{"level":2,"title":"4. 对_@Async_和_@Retryable_的实现测试","slug":"_4-对-async-和-retryable-的实现测试","link":"#_4-对-async-和-retryable-的实现测试","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719441116000,"updatedTime":1719441116000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.62,"words":1086},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-Setup Asynchronous Retry Mechanism in Spring.md","localizedDate":"2024年6月27日","excerpt":"<hr>\\n<h1>在Spring中设置异步重试机制</h1>\\n<hr>\\n<h2>1. 概述</h2>\\n<p>有时，我们需要代码执行是异步的，以提高应用程序的性能和响应能力。此外，我们可能希望在遇到任何异常时自动重新调用代码，因为我们预计会遇到像网络故障这样的偶尔失败。</p>\\n<p>在本教程中，我们将学习如何在Spring应用程序中实现异步执行与自动重试。</p>\\n<p>我们将探索Spring对异步(<em>async</em>)和重试(<em>retry</em>)操作的支持。</p>\\n<h2>2. Spring Boot中的示例应用程序</h2>\\n<p>让我们想象我们需要构建一个简单的微服务，该服务调用下游服务来处理一些数据。</p>","autoDesc":true}');export{k as comp,d as data};
