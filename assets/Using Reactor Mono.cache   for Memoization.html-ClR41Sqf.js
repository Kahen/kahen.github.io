import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as i,a as t}from"./app-DE4beumH.js";const a={},s=t('<h1 id="使用-reactor-mono-cache-进行备忘录模式-baeldung" tabindex="-1"><a class="header-anchor" href="#使用-reactor-mono-cache-进行备忘录模式-baeldung"><span>使用 Reactor Mono.cache() 进行备忘录模式 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>优化代码以提高性能是编程的关键部分，特别是当处理昂贵的操作或数据检索过程时。提高性能的一种有效方法是缓存。</p><p><strong>Project Reactor 库提供了一个 <em>cache()</em> 方法，用于缓存昂贵的操作或几乎不改变的数据，以避免重复操作并提高性能</strong>。</p><p>在本教程中，我们将探讨备忘录模式，这是一种缓存形式，并演示如何使用 Project Reactor 库中的 <em>Mono.cache()</em> 来缓存对 JSONPlaceholder API 的 HTTP GET 请求的结果。我们还将通过一个大理石图来理解 <em>Mono.cache()</em> 方法的内部机制。</p><h2 id="_2-理解备忘录模式" tabindex="-1"><a class="header-anchor" href="#_2-理解备忘录模式"><span>2. 理解备忘录模式</span></a></h2><p><strong>备忘录模式是一种缓存形式，它存储昂贵函数调用的输出。然后，当相同的函数调用再次发生时，它返回缓存的结果</strong>。</p><p>它在涉及递归函数或计算的情况下非常有用，这些函数或计算对于给定的输入始终产生相同的输出。</p><p>让我们通过一个使用斐波那契序列的 Java 示例来演示备忘录模式。首先，让我们创建一个 <em>Map</em> 对象来存储缓存的结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private static final Map`&lt;Integer, Long&gt;` cache = new HashMap&lt;&gt;();\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们定义一个计算斐波那契序列的方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>long fibonacci(int n) {\n    if (n `&lt;= 1) {\n        return n;\n    }\n\n    if (cache.containsKey(n)) {\n        return cache.get(n);\n    }\n\n    long result = fibonacci(n - 1) + fibonacci(n - 2);\n    logger.info(&quot;First occurrence of &quot; + n);\n    cache.put(n, result);\n\n    return result;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们在进一步计算之前检查整数 <em>n</em> 是否已经存储在 <em>Map</em> 对象中。如果它已经存储在 <em>Map</em> 对象中，我们返回缓存的值。否则，我们递归地计算结果并将其存储在 <em>Map</em> 对象中以供将来使用。</p><p>这种方法通过避免冗余计算显著提高了斐波那契计算的性能。</p><p>让我们为该方法编写一个单元测试：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid givenFibonacciNumber_whenFirstOccurenceIsCache_thenReturnCacheResultOnSecondCall() {\n    assertEquals(5, FibonacciMemoization.fibonacci(5));\n    assertEquals(2, FibonacciMemoization.fibonacci(3));\n    assertEquals(55, FibonacciMemoization.fibonacci(10));\n    assertEquals(21, FibonacciMemoization.fibonacci(8));\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的测试中，我们调用 <em>fibonacci()</em> 来计算序列。</p><h2 id="_3-使用大理石图描述-mono-cache" tabindex="-1"><a class="header-anchor" href="#_3-使用大理石图描述-mono-cache"><span>3. 使用大理石图描述 <em>Mono.cache()</em></span></a></h2><p><em>Mono.cache()</em> 操作符有助于缓存 <em>Mono</em> 发布者的结果是，并为后续订阅返回缓存的值。</p><p>大理石图有助于理解反应式类的内部细节以及它们的工作原理。这里有一个大理石图，说明了 <em>cache()</em> 操作符的行为：</p><p><strong>在上面的图像中，第一次订阅 <em>Mono</em> 发布者发出数据并将其缓存。后续订阅检索缓存的数据，而不会触发新的计算或数据获取</strong>。</p><h2 id="_4-示例设置" tabindex="-1"><a class="header-anchor" href="#_4-示例设置"><span>4. 示例设置</span></a></h2><p>为了演示 <em>Mono.cache()</em> 的使用，让我们将 <em>reactor-core</em> 添加到 <em>pom.xml</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;dependency&gt;``\n    ``&lt;groupId&gt;``io.projectreactor``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``reactor-core``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``3.6.5``&lt;/version&gt;``\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该库提供了操作符，<em>Mono</em>, <em>Flux</em> 等，以在 Java 中实现反应式编程。</p><p>此外，让我们将 <em>spring-boot-starter-webflux</em> 添加到 <em>pom.xml</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;dependency&gt;`\n    ``&lt;groupId&gt;``org.springframework.boot``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``spring-boot-starter-webflux``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``3.2.5``&lt;/version&gt;``\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述依赖项提供了 <em>WebClient</em> 类来使用 API。</p><p>让我们也看看当我们向 <em>https://jsonplaceholder.typicode.com/users/2</em> 发送 GET 请求时的示例响应：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{\n    &quot;id&quot;: 2,\n    &quot;name&quot;: &quot;Ervin Howell&quot;,\n    &quot;username&quot;: &quot;Antonette&quot;\n    // ...\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们创建一个名为 <em>User</em> 的 POJO 类来反序列化来自 GET 请求的 JSON 响应：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class User {\n    private int id;\n    private String name;\n\n    // 标准构造函数，getter 和 setter\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，让我们创建一个 <em>WebClient</em> 对象并设置 API 的基础 URL：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>WebClient client = WebClient.create(&quot;https://jsonplaceholder.typicode.com/users&quot;);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将作为将使用 <em>cache()</em> 方法缓存的 HTTP 响应的基础 URL。</p><p>最后，让我们创建一个 <em>AtomicInteger</em> 对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>AtomicInteger counter = new AtomicInteger(0);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面的对象有助于跟踪我们向 API 发送 GET 请求的次数。</p><h2 id="_5-不使用备忘录模式获取数据" tabindex="-1"><a class="header-anchor" href="#_5-不使用备忘录模式获取数据"><span>5. 不使用备忘录模式获取数据</span></a></h2><p>让我们首先定义一个从 <em>WebClient</em> 对象获取用户的方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Mono````````&lt;User&gt;```````` retrieveOneUser(int id) {\n    return client.get()\n      .uri(&quot;/{id}&quot;, id)\n      .retrieve()\n      .bodyToMono(User.class)\n      .doOnSubscribe(i -&gt; counter.incrementAndGet())\n      .onErrorResume(Mono::error);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们使用特定 ID 检索用户，并将响应体映射到 <em>User</em> 对象。此外，我们在每次订阅时增加 <em>counter</em>。</p><p>这是一个演示不使用缓存获取用户的测试用例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid givenRetrievedUser_whenTheCallToRemoteIsNotCache_thenReturnInvocationCountAndCompareResult() {\n    MemoizationWithMonoCache memoizationWithMonoCache = new MemoizationWithMonoCache();\n\n    Mono````````&lt;User&gt;```````` retrieveOneUser = MemoizationWithMonoCache.retrieveOneUser(1);\n    AtomicReference````````&lt;User&gt;```````` firstUser = new AtomicReference&lt;&gt;();\n    AtomicReference````````&lt;User&gt;```````` secondUser = new AtomicReference&lt;&gt;();\n\n    Disposable firstUserCall = retrieveOneUser.map(user -&gt; {\n          firstUser.set(user);\n          return user.getName();\n    })\n    .subscribe();\n\n    Disposable secondUserCall = retrieveOneUser.map(user -&gt; {\n          secondUser.set(user);\n          return user.getName();\n    })\n    .subscribe();\n\n    assertEquals(2, memoizationWithMonoCache.getCounter());\n    assertEquals(firstUser.get(), secondUser.get());\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们两次订阅 <em>retrieveOneUser</em> <em>Mono</em>，每次订阅都会向 <em>WebClient</em> 对象单独触发一个 GET 请求。我们断言 <em>counter</em> 增加了两次。</p><h2 id="_6-使用备忘录模式获取数据" tabindex="-1"><a class="header-anchor" href="#_6-使用备忘录模式获取数据"><span>6. 使用备忘录模式获取数据</span></a></h2><p>现在，让我们修改前一个示例以利用 <em>Mono.cache()</em> 并缓存第一个 GET 请求的结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid givenRetrievedUser_whenTheCallToRemoteIsCache_thenReturnInvocationCountAndCompareResult() {\n    MemoizationWithMonoCache memoizationWithMonoCache = new MemoizationWithMonoCache();\n\n    Mono````````&lt;User&gt;```````` retrieveOneUser = MemoizationWithMonoCache.retrieveOneUser(1).cache();\n    AtomicReference````````&lt;User&gt;```````` firstUser = new AtomicReference&lt;&gt;();\n    AtomicReference````````&lt;User&gt;```````` secondUser = new AtomicReference&lt;&gt;();\n\n    Disposable firstUserCall = retrieveOneUser.map(user -&gt; {\n          firstUser.set(user);\n          return user.getName();\n    })\n    .subscribe();\n\n    Disposable secondUserCall = retrieveOneUser.map(user -&gt; {\n          secondUser.set(user);\n          return user.getName();\n    })\n    .subscribe();\n\n    assertEquals(1, memoizationWithMonoCache.getCounter());\n    assertEquals(firstUser.get(), secondUser.get());\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与前一个示例的主要区别是我们在订阅之前对 <em>retrieveOneUser</em> 对象调用了 <em>cache()</em> 操作符。<strong>这缓存了第一个 GET 请求的结果，后续订阅接收到的是缓存的结果，而不是触发新的请求</strong>。</p><p>在测试用例中，我们断言 <em>counter</em> 只增加了一次，因为第二次订阅使用了缓存的值。</p><h2 id="_7-设置缓存持续时间" tabindex="-1"><a class="header-anchor" href="#_7-设置缓存持续时间"><span>7. 设置缓存持续时间</span></a></h2><p>默认情况下，<em>Mono.Cache()</em> 无限期地缓存结果。然而，在数据可能随时间变得陈旧的情况下，设置缓存持续时间是必要的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>// ...\nMono````````&lt;User&gt;```````` retrieveOneUser = memoizationWithMonoCache.retrieveOneUser(1)\n  .cache(Duration.ofMinutes(5));\n// ...\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，<em>cache()</em> 方法接受一个 <em>Duration</em> 实例作为参数。缓存的值将在 5 分钟后过期，任何在此之后的订阅将触发一个新的 GET 请求。</p><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在本文中，我们学习了备忘录模式的关键概念，并使用斐波那契序列示例在 Java 中实现了它。然后，我们深入研究了 Project Reactor 库中的 <em>Mono.cache()</em> 的使用，并演示了如何缓存 HTTP GET 请求的结果。</p><p>缓存是提高性能的强大技术。然而，考虑缓存失效策略以确保不会无限期地提供陈旧数据是至关重要的。</p><p>如往常一样，示例的完整源代码可在 GitHub 上获取。</p><p>文章发布后 30 天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p>',59),r=[s];function l(c,d){return i(),n("div",null,r)}const v=e(a,[["render",l],["__file","Using Reactor Mono.cache   for Memoization.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/Archive/Using%20Reactor%20Mono.cache%20%20%20for%20Memoization.html","title":"使用 Reactor Mono.cache() 进行备忘录模式 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-16T00:00:00.000Z","category":["Spring","WebFlux"],"tag":["Reactor","Mono","Cache"],"description":"使用 Reactor Mono.cache() 进行备忘录模式 | Baeldung 1. 概述 优化代码以提高性能是编程的关键部分，特别是当处理昂贵的操作或数据检索过程时。提高性能的一种有效方法是缓存。 Project Reactor 库提供了一个 cache() 方法，用于缓存昂贵的操作或几乎不改变的数据，以避免重复操作并提高性能。 在本教程中，我...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Using%20Reactor%20Mono.cache%20%20%20for%20Memoization.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用 Reactor Mono.cache() 进行备忘录模式 | Baeldung"}],["meta",{"property":"og:description","content":"使用 Reactor Mono.cache() 进行备忘录模式 | Baeldung 1. 概述 优化代码以提高性能是编程的关键部分，特别是当处理昂贵的操作或数据检索过程时。提高性能的一种有效方法是缓存。 Project Reactor 库提供了一个 cache() 方法，用于缓存昂贵的操作或几乎不改变的数据，以避免重复操作并提高性能。 在本教程中，我..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Reactor"}],["meta",{"property":"article:tag","content":"Mono"}],["meta",{"property":"article:tag","content":"Cache"}],["meta",{"property":"article:published_time","content":"2024-06-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用 Reactor Mono.cache() 进行备忘录模式 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 理解备忘录模式","slug":"_2-理解备忘录模式","link":"#_2-理解备忘录模式","children":[]},{"level":2,"title":"3. 使用大理石图描述 Mono.cache()","slug":"_3-使用大理石图描述-mono-cache","link":"#_3-使用大理石图描述-mono-cache","children":[]},{"level":2,"title":"4. 示例设置","slug":"_4-示例设置","link":"#_4-示例设置","children":[]},{"level":2,"title":"5. 不使用备忘录模式获取数据","slug":"_5-不使用备忘录模式获取数据","link":"#_5-不使用备忘录模式获取数据","children":[]},{"level":2,"title":"6. 使用备忘录模式获取数据","slug":"_6-使用备忘录模式获取数据","link":"#_6-使用备忘录模式获取数据","children":[]},{"level":2,"title":"7. 设置缓存持续时间","slug":"_7-设置缓存持续时间","link":"#_7-设置缓存持续时间","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":5.46,"words":1639},"filePathRelative":"posts/baeldung/Archive/Using Reactor Mono.cache   for Memoization.md","localizedDate":"2024年6月16日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>优化代码以提高性能是编程的关键部分，特别是当处理昂贵的操作或数据检索过程时。提高性能的一种有效方法是缓存。</p>\\n<p><strong>Project Reactor 库提供了一个 <em>cache()</em> 方法，用于缓存昂贵的操作或几乎不改变的数据，以避免重复操作并提高性能</strong>。</p>\\n<p>在本教程中，我们将探讨备忘录模式，这是一种缓存形式，并演示如何使用 Project Reactor 库中的 <em>Mono.cache()</em> 来缓存对 JSONPlaceholder API 的 HTTP GET 请求的结果。我们还将通过一个大理石图来理解 <em>Mono.cache()</em> 方法的内部机制。</p>","autoDesc":true}');export{v as comp,u as data};
