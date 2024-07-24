import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-B6f8H54y.js";const t={},p=e('<h1 id="executorservice与completablefuture-java并发处理的两种方式" tabindex="-1"><a class="header-anchor" href="#executorservice与completablefuture-java并发处理的两种方式"><span>ExecutorService与CompletableFuture：Java并发处理的两种方式</span></a></h1><p>在本教程中，我们将探讨Java中处理需要并发运行的任务的两个重要类：<em>ExecutorService_和_CompletableFuture</em>。我们将学习它们的功能以及如何有效地使用它们，并理解它们之间的关键差异。</p><h2 id="_2-executorservice概述" tabindex="-1"><a class="header-anchor" href="#_2-executorservice概述"><span>2. ExecutorService概述</span></a></h2><p>_ExecutorService_是Java的_java.util.concurrent_包中的强大接口，它简化了需要并发运行的任务的管理。它抽象了线程创建、管理和调度的复杂性，让我们可以专注于需要完成的实际工作。</p><p>_ExecutorService_提供了如_submit()_和_execute()_等方法来提交我们想要并发运行的任务。然后，这些任务被排队并分配给线程池中的可用线程。如果任务返回结果，我们可以使用_Future_对象来检索它们。然而，使用_Future_上的_get()_等方法检索结果可能会阻塞调用线程，直到任务完成。</p><h2 id="_3-completablefuture概述" tabindex="-1"><a class="header-anchor" href="#_3-completablefuture概述"><span>3. CompletableFuture概述</span></a></h2><p>_CompletableFuture_是在Java 8中引入的。它专注于以更声明性的方式组合异步操作和处理它们的最终结果。一个_CompletableFuture_充当一个容器，保存异步操作的最终结果。它可能不会立即有结果，但它提供了定义结果可用时做什么的方法。</p><p>与_ExecutorService_不同，在检索结果时可能会阻塞线程，_CompletableFuture_以非阻塞方式操作。</p><h2 id="_4-焦点和责任" tabindex="-1"><a class="header-anchor" href="#_4-焦点和责任"><span>4. 焦点和责任</span></a></h2><p>虽然_ExecutorService_和_CompletableFuture_都处理Java中的异步编程，但它们服务于不同的目的。让我们探索它们各自的焦点和责任。</p><h3 id="_4-1-executorservice" tabindex="-1"><a class="header-anchor" href="#_4-1-executorservice"><span>4.1. ExecutorService</span></a></h3><p>_ExecutorService_专注于管理线程池和并发执行任务。它提供了创建具有不同配置的线程池的方法，例如固定大小、缓存和计划。</p><p>让我们看一个使用_ExecutorService_创建并维护恰好三个线程的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ExecutorService</span> executor <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Future</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```` future <span class="token operator">=</span> executor<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 任务执行逻辑</span>\n    <span class="token keyword">return</span> <span class="token number">42</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_newFixedThreadPool(3)_方法调用创建了一个有三个线程的线程池，确保最多有三个任务将被并发执行。然后使用_submit()_方法将任务提交给线程池执行，返回一个代表计算结果的_Future_对象。</p><h3 id="_4-2-completablefuture" tabindex="-1"><a class="header-anchor" href="#_4-2-completablefuture"><span>4.2. CompletableFuture</span></a></h3><p>与此相反，_CompletableFuture_为组合异步操作提供了更高级别的抽象。它专注于定义工作流和处理异步任务的最终结果。</p><p>这是一个使用_supplyAsync()_启动返回字符串的异步任务的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompletableFuture</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```` future <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token number">42</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，_supplyAsync()_启动了一个异步任务，返回结果为42。</p><h2 id="_5-异步任务的链式调用" tabindex="-1"><a class="header-anchor" href="#_5-异步任务的链式调用"><span>5. 异步任务的链式调用</span></a></h2><p>_ExecutorService_和_CompletableFuture_都提供了链式异步任务的机制，但它们采取了不同的方法。</p><h3 id="_5-1-executorservice" tabindex="-1"><a class="header-anchor" href="#_5-1-executorservice"><span>5.1. ExecutorService</span></a></h3><p>在_ExecutorService_中，我们通常提交任务以执行，然后使用这些任务返回的_Future_对象来处理依赖关系和链式后续任务。然而，这涉及到阻塞并等待每个任务完成后再继续，这可能导致在处理异步工作流时的效率低下。</p><p>考虑我们向_ExecutorService_提交两个任务，然后使用_Future_对象将它们链在一起的情况：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ExecutorService</span> executor <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">Future</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```` firstTask <span class="token operator">=</span> executor<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token number">42</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">Future</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` secondTask <span class="token operator">=</span> executor<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Integer</span> result <span class="token operator">=</span> firstTask<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> <span class="token string">&quot;Result based on Task 1: &quot;</span> <span class="token operator">+</span> result<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> <span class="token operator">|</span> <span class="token class-name">ExecutionException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">// 处理异常</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nexecutor<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，第二个任务依赖于第一个任务的结果。然而，_ExecutorService_没有提供内置的链式调用，所以我们需要通过使用_get()_显式管理依赖关系——这会阻塞线程——在提交第二个任务之前等待第一个任务完成。</p><h3 id="_5-2-completablefuture" tabindex="-1"><a class="header-anchor" href="#_5-2-completablefuture"><span>5.2. CompletableFuture</span></a></h3><p>另一方面，_CompletableFuture_提供了一种更流畅和表达性的方式来链式异步任务。它通过内置方法如_thenApply()_简化了任务链式调用。这些方法允许你定义一个异步任务序列，其中一个任务的输出成为下一个任务的输入。</p><p>这是一个使用_CompletableFuture_的等效示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompletableFuture</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```` firstTask <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token number">42</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">CompletableFuture</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` secondTask <span class="token operator">=</span> firstTask<span class="token punctuation">.</span><span class="token function">thenApply</span><span class="token punctuation">(</span>result <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token string">&quot;Result based on Task 1: &quot;</span> <span class="token operator">+</span> result<span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，_thenApply()_方法被用来定义第二个任务，它依赖于第一个任务的结果。当我们使用_thenApply()_将任务链式到_CompletableFuture_时，主线程不需要等待第一个任务完成就可以继续执行。它继续执行我们代码的其他部分。</p><h2 id="_6-错误处理" tabindex="-1"><a class="header-anchor" href="#_6-错误处理"><span>6. 错误处理</span></a></h2><p>在这一部分，我们将检查_ExecutorService_和_CompletableFuture_如何处理错误和异常情况。</p><h3 id="_6-1-executorservice" tabindex="-1"><a class="header-anchor" href="#_6-1-executorservice"><span>6.1. ExecutorService</span></a></h3><p>使用_ExecutorService_时，错误可以以两种方式表现：</p><ul><li>提交的任务中抛出的异常：这些异常在尝试使用返回的_Future_对象上的_get()_等方法检索结果时，会传播回主线程。如果处理不当，这可能导致意外行为。</li><li>线程池管理期间的未检查异常：如果在线程池创建或关闭期间发生未检查异常，它通常从_ExecutorService_方法本身抛出。我们需要在代码中捕获并处理这些异常。</li></ul><p>让我们看一个示例，突出潜在问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ExecutorService</span> executor <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">Future</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` future <span class="token operator">=</span> executor<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>someCondition<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">&quot;Something went wrong!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token string">&quot;Success&quot;</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">try</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> result <span class="token operator">=</span> future<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Result: &quot;</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> <span class="token operator">|</span> <span class="token class-name">ExecutionException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 处理异常</span>\n<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>\n    executor<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，提交的任务在满足特定条件时抛出异常。然而，我们需要在_future.get()_周围使用_try-catch_块来捕获任务抛出的异常或在使用_get()_检索时发生的异常。这种方法在管理多个任务的错误时可能会变得繁琐。</p><h3 id="_6-2-completablefuture" tabindex="-1"><a class="header-anchor" href="#_6-2-completablefuture"><span>6.2. CompletableFuture</span></a></h3><p>相比之下，_CompletableFuture_提供了一种更强大的错误处理方法，具有如_exceptionally()_和在链式方法本身内处理异常的方法。这些方法允许我们在异步工作流的不同阶段定义如何处理错误，而无需显式_try-catch_块。</p><p>让我们看一个使用_CompletableFuture_的错误处理示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompletableFuture</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` future <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>someCondition<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">&quot;Something went wrong!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token string">&quot;Success&quot;</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">.</span><span class="token function">exceptionally</span><span class="token punctuation">(</span>ex <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>err<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Error in task: &quot;</span> <span class="token operator">+</span> ex<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token string">&quot;Error occurred&quot;</span><span class="token punctuation">;</span> <span class="token comment">// 可以选择性地返回一个默认值</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nfuture<span class="token punctuation">.</span><span class="token function">thenAccept</span><span class="token punctuation">(</span>result <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Result: &quot;</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，异步任务抛出异常，错误在_exceptionally()_回调中被捕获和处理。它在发生异常时提供了一个默认值（&quot;Error occurred&quot;）。</p><h2 id="_7-超时管理" tabindex="-1"><a class="header-anchor" href="#_7-超时管理"><span>7. 超时管理</span></a></h2><p>超时管理在异步编程中至关重要，以确保任务在指定的时间框架内完成。让我们探讨_ExecutorService_和_CompletableFuture_如何处理超时的不同方式。</p><h3 id="_7-1-executorservice" tabindex="-1"><a class="header-anchor" href="#_7-1-executorservice"><span>7.1. ExecutorService</span></a></h3><p>_ExecutorService_没有内置的超时功能。要实现超时，我们需要使用_Future_对象，并可能中断超过截止时间的任务。这种方法涉及手动协调：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ExecutorService</span> executor <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">Future</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` future <span class="token operator">=</span> executor<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>err<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Error occurred: &quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token string">&quot;Task completed&quot;</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">try</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> result <span class="token operator">=</span> future<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Result: &quot;</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">TimeoutException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>err<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Task execution timed out!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    future<span class="token punctuation">.</span><span class="token function">cancel</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 手动中断任务。</span>\n<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 处理异常</span>\n<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>\n    executor<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，我们向_ExecutorService_提交了一个任务，并在使用_get()<em>方法检索结果时指定了两秒的超时。如果任务完成时间超过指定的超时时间，将抛出_TimeoutException</em>。这种方法可能会出错，需要仔细处理。</p><p>**重要的是要注意，虽然超时机制中断了等待任务结果的过程，但任务本身将继续在后台运行，直到它完成或被中断。**例如，要中断在_ExecutorService_中运行的任务，我们需要使用_Future.cancel(true)_方法。</p><h5 id="_7-2-completablefuture" tabindex="-1"><a class="header-anchor" href="#_7-2-completablefuture"><span>7.2. CompletableFuture</span></a></h5><p><strong>在Java 9中，《CompletableFuture》提供了一种更流畅的超时处理方法，使用如_completeOnTimeout()_等方法。</strong> _completeOnTimeout()<em>方法将在指定的超时持续时间内，如果原始任务未完成，则使用指定的值完成_CompletableFuture</em>。</p><p>让我们看一个示例，说明_completeOnTimeout()_是如何工作的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompletableFuture</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` future <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">// 处理异常</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token string">&quot;Task completed&quot;</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">CompletableFuture</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` timeoutFuture <span class="token operator">=</span> future<span class="token punctuation">.</span><span class="token function">completeOnTimeout</span><span class="token punctuation">(</span><span class="token string">&quot;Timed out!&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">String</span> result <span class="token operator">=</span> timeoutFuture<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Result: &quot;</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，_supplyAsync()_方法启动了一个模拟长时间运行操作的异步任务，需要五秒钟才能完成。然而，我们使用_completeOnTimeout()_指定了两秒钟的超时。如果任务在两秒内未完成，_CompletableFuture_将自动使用值“Timed out!”完成。</p><h2 id="_8-总结" tabindex="-1"><a class="header-anchor" href="#_8-总结"><span>8. 总结</span></a></h2><p>以下是总结_ExecutorService_和_CompletableFuture_关键差异的比较表：</p><table><thead><tr><th>特性</th><th>ExecutorService</th><th>CompletableFuture</th></tr></thead><tbody><tr><td>焦点</td><td>线程池管理和任务执行</td><td>组合异步操作和处理最终结果</td></tr><tr><td>链式调用</td><td>使用_Future_对象手动协调</td><td>内置方法如_thenApply()_</td></tr><tr><td>错误处理</td><td>围绕_Future.get()_的手动try-catch块</td><td><em>exceptionally()</em>, <em>whenComplete()</em>, 在链式方法中处理</td></tr><tr><td>超时管理</td><td>使用_Future.get(timeout)_手动协调和可能的中断</td><td>内置方法如_completeOnTimeout()_</td></tr><tr><td>阻塞与非阻塞</td><td>阻塞（通常等待_Future.get()_以检索结果）</td><td>非阻塞（在不阻塞主线程的情况下链式任务）</td></tr></tbody></table><h2 id="_9-结论" tabindex="-1"><a class="header-anchor" href="#_9-结论"><span>9. 结论</span></a></h2><p>在本文中，我们探讨了处理异步任务的两个基本类：<em>ExecutorService_和_CompletableFuture</em>。_ExecutorService_简化了线程池的管理和并发任务的执行，而_CompletableFuture_提供了一个更高级别的抽象，用于组合异步操作和处理它们的结果。</p><p>我们还检查了它们的功能、差异以及它们如何处理错误处理、超时管理和异步任务的链式调用。</p><p>如常，示例的源代码可在GitHub上找到。</p><p>OK</p>',65),c=[p];function o(u,l){return a(),s("div",null,c)}const k=n(t,[["render",o],["__file","2024-06-20-Guide to ExecutorService vs. CompletableFuture.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Guide%20to%20ExecutorService%20vs.%20CompletableFuture.html","title":"ExecutorService与CompletableFuture：Java并发处理的两种方式","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Java Concurrency","Java Tutorials"],"tag":["ExecutorService","CompletableFuture"],"head":[["meta",{"name":"keywords","content":"Java, ExecutorService, CompletableFuture, Concurrency, Asynchronous Programming"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Guide%20to%20ExecutorService%20vs.%20CompletableFuture.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"ExecutorService与CompletableFuture：Java并发处理的两种方式"}],["meta",{"property":"og:description","content":"ExecutorService与CompletableFuture：Java并发处理的两种方式 在本教程中，我们将探讨Java中处理需要并发运行的任务的两个重要类：ExecutorService_和_CompletableFuture。我们将学习它们的功能以及如何有效地使用它们，并理解它们之间的关键差异。 2. ExecutorService概述 _E..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"ExecutorService"}],["meta",{"property":"article:tag","content":"CompletableFuture"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ExecutorService与CompletableFuture：Java并发处理的两种方式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"ExecutorService与CompletableFuture：Java并发处理的两种方式 在本教程中，我们将探讨Java中处理需要并发运行的任务的两个重要类：ExecutorService_和_CompletableFuture。我们将学习它们的功能以及如何有效地使用它们，并理解它们之间的关键差异。 2. ExecutorService概述 _E..."},"headers":[{"level":2,"title":"2. ExecutorService概述","slug":"_2-executorservice概述","link":"#_2-executorservice概述","children":[]},{"level":2,"title":"3. CompletableFuture概述","slug":"_3-completablefuture概述","link":"#_3-completablefuture概述","children":[]},{"level":2,"title":"4. 焦点和责任","slug":"_4-焦点和责任","link":"#_4-焦点和责任","children":[{"level":3,"title":"4.1. ExecutorService","slug":"_4-1-executorservice","link":"#_4-1-executorservice","children":[]},{"level":3,"title":"4.2. CompletableFuture","slug":"_4-2-completablefuture","link":"#_4-2-completablefuture","children":[]}]},{"level":2,"title":"5. 异步任务的链式调用","slug":"_5-异步任务的链式调用","link":"#_5-异步任务的链式调用","children":[{"level":3,"title":"5.1. ExecutorService","slug":"_5-1-executorservice","link":"#_5-1-executorservice","children":[]},{"level":3,"title":"5.2. CompletableFuture","slug":"_5-2-completablefuture","link":"#_5-2-completablefuture","children":[]}]},{"level":2,"title":"6. 错误处理","slug":"_6-错误处理","link":"#_6-错误处理","children":[{"level":3,"title":"6.1. ExecutorService","slug":"_6-1-executorservice","link":"#_6-1-executorservice","children":[]},{"level":3,"title":"6.2. CompletableFuture","slug":"_6-2-completablefuture","link":"#_6-2-completablefuture","children":[]}]},{"level":2,"title":"7. 超时管理","slug":"_7-超时管理","link":"#_7-超时管理","children":[{"level":3,"title":"7.1. ExecutorService","slug":"_7-1-executorservice","link":"#_7-1-executorservice","children":[]}]},{"level":2,"title":"8. 总结","slug":"_8-总结","link":"#_8-总结","children":[]},{"level":2,"title":"9. 结论","slug":"_9-结论","link":"#_9-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":8.09,"words":2426},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Guide to ExecutorService vs. CompletableFuture.md","localizedDate":"2024年6月21日","excerpt":"\\n<p>在本教程中，我们将探讨Java中处理需要并发运行的任务的两个重要类：<em>ExecutorService_和_CompletableFuture</em>。我们将学习它们的功能以及如何有效地使用它们，并理解它们之间的关键差异。</p>\\n<h2>2. ExecutorService概述</h2>\\n<p>_ExecutorService_是Java的_java.util.concurrent_包中的强大接口，它简化了需要并发运行的任务的管理。它抽象了线程创建、管理和调度的复杂性，让我们可以专注于需要完成的实际工作。</p>\\n<p>_ExecutorService_提供了如_submit()_和_execute()_等方法来提交我们想要并发运行的任务。然后，这些任务被排队并分配给线程池中的可用线程。如果任务返回结果，我们可以使用_Future_对象来检索它们。然而，使用_Future_上的_get()_等方法检索结果可能会阻塞调用线程，直到任务完成。</p>","autoDesc":true}');export{k as comp,d as data};
