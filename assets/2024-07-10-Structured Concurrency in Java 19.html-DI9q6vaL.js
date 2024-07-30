import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CbPcg273.js";const e={},p=t('<h1 id="java-19中的结构化并发-baeldung" tabindex="-1"><a class="header-anchor" href="#java-19中的结构化并发-baeldung"><span>Java 19中的结构化并发 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将讨论孵化器特性结构化并发（JEP 428），它为Java 19提供了结构化并发的能力。我们将指导您使用新的API来管理多线程代码。</p><h2 id="_2-理念" tabindex="-1"><a class="header-anchor" href="#_2-理念"><span>2. 理念</span></a></h2><p>通过采用减少线程泄漏和取消延迟可能性的并发编程风格，增强多线程代码的可维护性、可靠性和可观察性，这些是与取消和关闭相关的常见风险。为了更好地理解非结构化并发的问题，让我们看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Future</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Shelter</span><span class="token punctuation">&gt;</span></span>`` shelter<span class="token punctuation">;</span>\n<span class="token class-name">Future</span>`<span class="token operator">&lt;</span><span class="token class-name">List</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Dog</span><span class="token punctuation">&gt;</span></span>````<span class="token operator">&gt;</span> dogs<span class="token punctuation">;</span>\n<span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">ExecutorService</span> executorService <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    shelter <span class="token operator">=</span> executorService<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token operator">::</span><span class="token function">getShelter</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    dogs <span class="token operator">=</span> executorService<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token operator">::</span><span class="token function">getDogs</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Shelter</span> theShelter <span class="token operator">=</span> shelter<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 等待shelter</span>\n    <span class="token class-name">List</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Dog</span><span class="token punctuation">&gt;</span></span>``` theDogs <span class="token operator">=</span> dogs<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 等待dogs</span>\n    <span class="token class-name">Response</span> response <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Response</span><span class="token punctuation">(</span>theShelter<span class="token punctuation">,</span> theDogs<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ExecutionException</span> <span class="token operator">|</span> <span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当<code>getShelter()</code>正在运行时，代码不会注意到如果<code>getDogs()</code>可能失败，并且由于阻塞的<code>shelter.get()</code>调用，它将不必要地继续运行。结果，在<code>getShelter()</code>完成并且<code>getDogs()</code>返回后，<code>dogs.get()</code>将抛出异常，我们的代码将失败：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/01/img_63d318d9898a0.svg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>但这并不是唯一的问题。当执行我们代码的线程被中断时，它不会将中断传播到我们的子任务。此外，如果首先执行的子任务shelter抛出异常，它将不会被委托给dogs的子任务，并且它将继续运行，浪费资源。</p><p>结构化并发试图在下一章中解决这些问题。</p><h2 id="_3-示例" tabindex="-1"><a class="header-anchor" href="#_3-示例"><span>3. 示例</span></a></h2><p>对于我们的结构化并发示例，我们将使用以下记录：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">record</span> <span class="token class-name">Shelter</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>\n\n<span class="token keyword">record</span> <span class="token class-name">Dog</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>\n\n<span class="token keyword">record</span> <span class="token class-name">Response</span><span class="token punctuation">(</span><span class="token class-name">Shelter</span> shelter<span class="token punctuation">,</span> <span class="token class-name">List</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Dog</span><span class="token punctuation">&gt;</span></span>``` dogs<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还将提供两个方法。一个用于获取<code>Shelter</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">Shelter</span> <span class="token function">getShelter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Shelter</span><span class="token punctuation">(</span><span class="token string">&quot;Shelter&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一个用于检索<code>Dog</code>元素列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">List</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Dog</span><span class="token punctuation">&gt;</span></span>``` <span class="token function">getDogs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Dog</span><span class="token punctuation">(</span><span class="token string">&quot;Buddy&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Dog</span><span class="token punctuation">(</span><span class="token string">&quot;Simba&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于结构化并发是一个孵化器特性，我们必须使用以下参数运行我们的应用程序：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>--enable-preview --add-modules jdk.incubator.foreign\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>否则，我们可以添加一个<code>module-info.java</code>并标记包为必需的。</p><p>让我们来检查一个示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token keyword">var</span> scope <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StructuredTaskScope<span class="token punctuation">.</span>ShutdownOnFailure</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Future</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Shelter</span><span class="token punctuation">&gt;</span></span>`` shelter <span class="token operator">=</span> scope<span class="token punctuation">.</span><span class="token function">fork</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token operator">::</span><span class="token function">getShelter</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Future</span>`<span class="token operator">&lt;</span><span class="token class-name">List</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Dog</span><span class="token punctuation">&gt;</span></span>````<span class="token operator">&gt;</span> dogs <span class="token operator">=</span> scope<span class="token punctuation">.</span><span class="token function">fork</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token operator">::</span><span class="token function">getDogs</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    scope<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Response</span> response <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Response</span><span class="token punctuation">(</span>shelter<span class="token punctuation">.</span><span class="token function">resultNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> dogs<span class="token punctuation">.</span><span class="token function">resultNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于<code>StructuredTaskScope</code>实现了<code>AutoCloseable</code>接口，我们可以在try-with-resources语句中使用它。<code>StructuredTaskScope</code>为我们提供了两个子类，它们有不同的用途。在本教程中，我们将使用<code>ShutdownOnFailure()</code>，它在出现问题时关闭子任务。</p><p>还有一个<code>ShutdownOnSuccess()</code>构造函数，它的作用相反。它在成功时关闭子任务。这种短路模式帮助我们避免不必要的工作。</p><p>使用<code>StructuredTaskScope</code>的结构强烈类似于同步代码的结构。创建<code>scope</code>的线程是所有者的线程。<code>scope</code>允许我们在<code>scope</code>中<code>fork</code>进一步的子任务。此代码异步调用。借助<code>join()</code>方法，我们可以阻塞所有任务，直到它们提供结果。</p><p>每个任务都可以通过<code>scope</code>的<code>shutdown()</code>方法终止其他任务。<code>throwIfFailed(e -&gt; new RuntimeException(&quot;ERROR_MESSAGE&quot;))</code>方法提供了另一种可能性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>scope<span class="token punctuation">.</span><span class="token function">throwIfFailed</span><span class="token punctuation">(</span>e <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">&quot;ERROR_MESSAGE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>它允许我们在任何<code>fork</code>失败时传播任何异常。此外，我们还可以设置一个期限与<code>joinUntil</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>scope<span class="token punctuation">.</span><span class="token function">joinUntil</span><span class="token punctuation">(</span><span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">plusSeconds</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果任务在时间到期后还没有完成，这将在时间到期后抛出异常。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们讨论了非结构化并发的缺点以及结构化并发如何尝试解决这些问题。我们学习了如何处理错误和实现截止日期。我们还看到了新的构造如何使编写易于维护、可读和可靠的多线程代码同步变得更加容易。</p><p>像往常一样，这些示例也可以在GitHub上找到。</p>',33),o=[p];function c(l,u){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-10-Structured Concurrency in Java 19.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Structured%20Concurrency%20in%20Java%2019.html","title":"Java 19中的结构化并发 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2023-01-28T00:00:00.000Z","category":["Java","Concurrency"],"tag":["Java 19","Structured Concurrency"],"head":[["meta",{"name":"keywords","content":"Java, Concurrency, Java 19, Structured Concurrency"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Structured%20Concurrency%20in%20Java%2019.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 19中的结构化并发 | Baeldung"}],["meta",{"property":"og:description","content":"Java 19中的结构化并发 | Baeldung 1. 概述 在本教程中，我们将讨论孵化器特性结构化并发（JEP 428），它为Java 19提供了结构化并发的能力。我们将指导您使用新的API来管理多线程代码。 2. 理念 通过采用减少线程泄漏和取消延迟可能性的并发编程风格，增强多线程代码的可维护性、可靠性和可观察性，这些是与取消和关闭相关的常见风险..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/01/img_63d318d9898a0.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T05:00:50.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 19"}],["meta",{"property":"article:tag","content":"Structured Concurrency"}],["meta",{"property":"article:published_time","content":"2023-01-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T05:00:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 19中的结构化并发 | Baeldung\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/01/img_63d318d9898a0.svg\\"],\\"datePublished\\":\\"2023-01-28T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T05:00:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 19中的结构化并发 | Baeldung 1. 概述 在本教程中，我们将讨论孵化器特性结构化并发（JEP 428），它为Java 19提供了结构化并发的能力。我们将指导您使用新的API来管理多线程代码。 2. 理念 通过采用减少线程泄漏和取消延迟可能性的并发编程风格，增强多线程代码的可维护性、可靠性和可观察性，这些是与取消和关闭相关的常见风险..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 理念","slug":"_2-理念","link":"#_2-理念","children":[]},{"level":2,"title":"3. 示例","slug":"_3-示例","link":"#_3-示例","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720587650000,"updatedTime":1720587650000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.3,"words":991},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Structured Concurrency in Java 19.md","localizedDate":"2023年1月28日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将讨论孵化器特性结构化并发（JEP 428），它为Java 19提供了结构化并发的能力。我们将指导您使用新的API来管理多线程代码。</p>\\n<h2>2. 理念</h2>\\n<p>通过采用减少线程泄漏和取消延迟可能性的并发编程风格，增强多线程代码的可维护性、可靠性和可观察性，这些是与取消和关闭相关的常见风险。为了更好地理解非结构化并发的问题，让我们看一个例子：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">Future</span>``<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">Shelter</span><span class=\\"token punctuation\\">&gt;</span></span>`` shelter<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token class-name\\">Future</span>`<span class=\\"token operator\\">&lt;</span><span class=\\"token class-name\\">List</span>```<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">Dog</span><span class=\\"token punctuation\\">&gt;</span></span>````<span class=\\"token operator\\">&gt;</span> dogs<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">try</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">ExecutorService</span> executorService <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Executors</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">newFixedThreadPool</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">3</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    shelter <span class=\\"token operator\\">=</span> executorService<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">submit</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">this</span><span class=\\"token operator\\">::</span><span class=\\"token function\\">getShelter</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    dogs <span class=\\"token operator\\">=</span> executorService<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">submit</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">this</span><span class=\\"token operator\\">::</span><span class=\\"token function\\">getDogs</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">Shelter</span> theShelter <span class=\\"token operator\\">=</span> shelter<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">get</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>   <span class=\\"token comment\\">// 等待shelter</span>\\n    <span class=\\"token class-name\\">List</span>```<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">Dog</span><span class=\\"token punctuation\\">&gt;</span></span>``` theDogs <span class=\\"token operator\\">=</span> dogs<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">get</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>  <span class=\\"token comment\\">// 等待dogs</span>\\n    <span class=\\"token class-name\\">Response</span> response <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Response</span><span class=\\"token punctuation\\">(</span>theShelter<span class=\\"token punctuation\\">,</span> theDogs<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">catch</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">ExecutionException</span> <span class=\\"token operator\\">|</span> <span class=\\"token class-name\\">InterruptedException</span> e<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">throw</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">RuntimeException</span><span class=\\"token punctuation\\">(</span>e<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
