import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-8nJ1rqSf.js";const t={},p=e(`<h1 id="spring单例bean如何处理并发请求" tabindex="-1"><a class="header-anchor" href="#spring单例bean如何处理并发请求"><span>Spring单例Bean如何处理并发请求？</span></a></h1><p>在本教程中，我们将学习Spring使用_singleton_作用域创建的Bean是如何在后台处理多个并发请求的。此外，我们将了解Java如何在内存中存储Bean实例以及如何处理对它们的并发访问。</p><h2 id="_2-spring-bean和java堆内存" tabindex="-1"><a class="header-anchor" href="#_2-spring-bean和java堆内存"><span>2. Spring Bean和Java堆内存</span></a></h2><p>正如我们所知，Java堆是一个全局共享的内存，应用程序内所有运行的线程都可以访问。**当Spring容器使用单例作用域创建一个Bean时，该Bean存储在堆中。**这样，所有并发线程都能够指向同一个Bean实例。</p><p>接下来，让我们理解线程的栈内存是什么以及它如何帮助服务并发请求。</p><h2 id="_3-如何服务并发请求" tabindex="-1"><a class="header-anchor" href="#_3-如何服务并发请求"><span>3. 如何服务并发请求？</span></a></h2><p>以一个包含名为_ProductService_的单例Bean的Spring应用程序为例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProductService</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">static</span> <span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Product</span><span class="token punctuation">&gt;</span></span>\`\`\` productRepository <span class="token operator">=</span> <span class="token function">asList</span><span class="token punctuation">(</span>
      <span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;Product 1&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Stock</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;Product 2&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Stock</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Optional</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Product</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token function">getProductById</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Optional</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Product</span><span class="token punctuation">&gt;</span></span>\`\`\` product <span class="token operator">=</span> productRepository<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>p <span class="token operator">-&gt;</span> p<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> id<span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> productName <span class="token operator">=</span> product<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">Product</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Thread: %s; bean instance: %s; product id: %s has the name: %s%n&quot;</span><span class="token punctuation">,</span> <span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">,</span> id<span class="token punctuation">,</span> productName<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> product<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个Bean有一个_getProductById()<em>方法，它向调用者返回产品数据。此外，这个Bean返回的数据在端点</em>/product/{id}_上暴露给客户端。</p><p>接下来，让我们探索在运行时当同时调用端点_/product/{id}<em>时会发生什么。具体来说，第一个线程将调用端点</em>/product/1_，第二个线程将调用_/product/2_。</p><p>Spring为每个请求创建一个不同的线程。正如我们在控制台输出中看到的，两个线程使用相同的_ProductService_实例来返回产品数据：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Thread</span><span class="token operator">:</span> pool<span class="token operator">-</span><span class="token number">2</span><span class="token operator">-</span>thread<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> bean instance<span class="token operator">:</span> <span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>concurrentrequest<span class="token punctuation">.</span></span>ProductService</span><span class="token annotation punctuation">@18333b93</span><span class="token punctuation">;</span> product id<span class="token operator">:</span> <span class="token number">1</span> has the name<span class="token operator">:</span> <span class="token class-name">Product</span> <span class="token number">1</span>
<span class="token class-name">Thread</span><span class="token operator">:</span> pool<span class="token operator">-</span><span class="token number">2</span><span class="token operator">-</span>thread<span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">;</span> bean instance<span class="token operator">:</span> <span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>concurrentrequest<span class="token punctuation">.</span></span>ProductService</span><span class="token annotation punctuation">@18333b93</span><span class="token punctuation">;</span> product id<span class="token operator">:</span> <span class="token number">2</span> has the name<span class="token operator">:</span> <span class="token class-name">Product</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Spring能够在多个线程中使用相同的Bean实例，首先是因为对于每个线程，Java都创建了一个私有的栈内存。</p><p>**栈内存负责存储在线程执行期间方法内部使用的局部变量的状态。**这样，Java确保并行执行的线程不会覆盖彼此的变量。</p><p>其次，因为_ProductService_ Bean在堆级别没有设置任何限制或锁，**每个线程的程序计数器能够指向堆内存中相同的Bean实例引用。**因此，两个线程可以同时执行_getProdcutById()_方法。</p><p>接下来，我们将了解为什么单例Bean是无状态的至关重要。</p><h2 id="_4-无状态的单例bean与有状态的单例bean" tabindex="-1"><a class="header-anchor" href="#_4-无状态的单例bean与有状态的单例bean"><span>4. 无状态的单例Bean与有状态的单例Bean</span></a></h2><p>为了理解为什么无状态的单例Bean很重要，让我们看看使用有状态的单例Bean的副作用是什么。</p><p>假设我们将_productName_变量移动到类级别：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProductService</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> productName <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token comment">// ...</span>

    <span class="token keyword">public</span> <span class="token class-name">Optional</span> <span class="token function">getProductById</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>

        productName <span class="token operator">=</span> product<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">Product</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

       <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们再次运行服务并查看输出：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Thread</span><span class="token operator">:</span> pool<span class="token operator">-</span><span class="token number">2</span><span class="token operator">-</span>thread<span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">;</span> bean instance<span class="token operator">:</span> <span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>concurrentrequest<span class="token punctuation">.</span></span>ProductService</span><span class="token annotation punctuation">@7352a12e</span><span class="token punctuation">;</span> product id<span class="token operator">:</span> <span class="token number">2</span> has the name<span class="token operator">:</span> <span class="token class-name">Product</span> <span class="token number">2</span>
<span class="token class-name">Thread</span><span class="token operator">:</span> pool<span class="token operator">-</span><span class="token number">2</span><span class="token operator">-</span>thread<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> bean instance<span class="token operator">:</span> <span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>concurrentrequest<span class="token punctuation">.</span></span>ProductService</span><span class="token annotation punctuation">@7352a12e</span><span class="token punctuation">;</span> product id<span class="token operator">:</span> <span class="token number">1</span> has the name<span class="token operator">:</span> <span class="token class-name">Product</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，对_productId_ 1的调用显示了_productName_ &quot;Product 2&quot;而不是 &quot;Product 1&quot;。这是因为_ProductService_是有状态的，并与所有运行的线程共享相同的_productName_变量。</p><p><strong>为了避免像这样的不良副作用，保持我们的单例Bean无状态至关重要。</strong></p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们看到了Spring中单例Bean的并发访问是如何工作的。首先，我们看到了Java如何在堆内存中存储单例Bean。接下来，我们学习了不同的线程如何从堆中访问相同的单例实例。最后，我们讨论了拥有无状态Bean的重要性，并查看了一个示例，说明了如果Bean不是无状态的会发生什么。</p><p>如常，这些示例的代码可以在GitHub上找到。</p>`,27),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(t,[["render",c],["__file","2024-07-20-How Does the Spring Singleton Bean Serve Concurrent Requests .html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-How%20Does%20the%20Spring%20Singleton%20Bean%20Serve%20Concurrent%20Requests%20.html","title":"Spring单例Bean如何处理并发请求？","lang":"zh-CN","frontmatter":{"date":"2022-04-26T00:00:00.000Z","category":["Spring Framework","Concurrency"],"tag":["Spring Singleton","Concurrency"],"head":[["meta",{"name":"keywords","content":"Spring, Singleton, Concurrency, Java, Heap Memory, Stateless, Stateful"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-How%20Does%20the%20Spring%20Singleton%20Bean%20Serve%20Concurrent%20Requests%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring单例Bean如何处理并发请求？"}],["meta",{"property":"og:description","content":"Spring单例Bean如何处理并发请求？ 在本教程中，我们将学习Spring使用_singleton_作用域创建的Bean是如何在后台处理多个并发请求的。此外，我们将了解Java如何在内存中存储Bean实例以及如何处理对它们的并发访问。 2. Spring Bean和Java堆内存 正如我们所知，Java堆是一个全局共享的内存，应用程序内所有运行的线..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T03:38:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Singleton"}],["meta",{"property":"article:tag","content":"Concurrency"}],["meta",{"property":"article:published_time","content":"2022-04-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T03:38:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring单例Bean如何处理并发请求？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T03:38:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring单例Bean如何处理并发请求？ 在本教程中，我们将学习Spring使用_singleton_作用域创建的Bean是如何在后台处理多个并发请求的。此外，我们将了解Java如何在内存中存储Bean实例以及如何处理对它们的并发访问。 2. Spring Bean和Java堆内存 正如我们所知，Java堆是一个全局共享的内存，应用程序内所有运行的线..."},"headers":[{"level":2,"title":"2. Spring Bean和Java堆内存","slug":"_2-spring-bean和java堆内存","link":"#_2-spring-bean和java堆内存","children":[]},{"level":2,"title":"3. 如何服务并发请求？","slug":"_3-如何服务并发请求","link":"#_3-如何服务并发请求","children":[]},{"level":2,"title":"4. 无状态的单例Bean与有状态的单例Bean","slug":"_4-无状态的单例bean与有状态的单例bean","link":"#_4-无状态的单例bean与有状态的单例bean","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721446736000,"updatedTime":1721446736000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.43,"words":1029},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-How Does the Spring Singleton Bean Serve Concurrent Requests .md","localizedDate":"2022年4月26日","excerpt":"\\n<p>在本教程中，我们将学习Spring使用_singleton_作用域创建的Bean是如何在后台处理多个并发请求的。此外，我们将了解Java如何在内存中存储Bean实例以及如何处理对它们的并发访问。</p>\\n<h2>2. Spring Bean和Java堆内存</h2>\\n<p>正如我们所知，Java堆是一个全局共享的内存，应用程序内所有运行的线程都可以访问。**当Spring容器使用单例作用域创建一个Bean时，该Bean存储在堆中。**这样，所有并发线程都能够指向同一个Bean实例。</p>\\n<p>接下来，让我们理解线程的栈内存是什么以及它如何帮助服务并发请求。</p>\\n<h2>3. 如何服务并发请求？</h2>","autoDesc":true}');export{d as comp,k as data};
