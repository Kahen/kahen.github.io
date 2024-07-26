import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-8nJ1rqSf.js";const e={},p=t('<h1 id="spring-boot-feignclient与webclient比较" tabindex="-1"><a class="header-anchor" href="#spring-boot-feignclient与webclient比较"><span>Spring Boot FeignClient与WebClient比较</span></a></h1><p>在本教程中，我们将比较Spring Feign——一种声明式REST客户端，以及Spring 5中引入的Spring <em>WebClient</em>——一种响应式Web客户端。</p><h2 id="阻塞与非阻塞客户端" tabindex="-1"><a class="header-anchor" href="#阻塞与非阻塞客户端"><span>阻塞与非阻塞客户端</span></a></h2><p>在当今的微服务生态系统中，通常需要后端服务使用HTTP调用其他Web服务。因此，Spring应用程序需要一个Web客户端来执行请求。</p><p>接下来，我们将检查阻塞Feign客户端和非阻塞_WebClient_实现之间的差异。</p><h3 id="_2-1-spring-boot-阻塞feign客户端" tabindex="-1"><a class="header-anchor" href="#_2-1-spring-boot-阻塞feign客户端"><span>2.1 Spring Boot 阻塞Feign客户端</span></a></h3><p>Feign客户端是一种声明式REST客户端，它使编写Web客户端变得更容易。使用Feign时，开发人员只需要定义接口并相应地进行注解。然后，Spring在运行时提供实际的Web客户端实现。</p><p>在幕后，使用_@FeignClient_注解的接口生成基于每个请求一个线程的同步实现。因此，对于每个请求，分配的线程会阻塞，直到收到响应。保持多个线程存活的缺点是每个打开的线程都占用内存和CPU周期。</p><p>接下来，让我们想象一下，如果我们的服务遭受流量激增，每秒接收数千个请求。除此之外，每个请求都需要等待几秒钟才能从上游服务返回结果。</p><p>根据分配给托管服务器的资源和流量激增的持续时间，过一段时间后，所有创建的线程将开始堆积并占用所有分配的资源。因此，这一系列的事件将降低服务的性能，并最终导致服务崩溃。</p><h3 id="_2-2-spring-boot-非阻塞-webclient" tabindex="-1"><a class="header-anchor" href="#_2-2-spring-boot-非阻塞-webclient"><span>2.2 Spring Boot 非阻塞_WebClient_</span></a></h3><p>_WebClient_是Spring WebFlux库的一部分。它是Spring响应式框架提供的非阻塞解决方案，以解决像Feign客户端这样的同步实现的性能瓶颈。</p><p>虽然Feign客户端为每个请求创建一个线程并阻塞它，直到收到响应，但_WebClient_执行HTTP请求并将“等待响应”的任务添加到队列中。稍后，“等待响应”的任务在收到响应后从队列中执行，最终将响应传递给订阅者函数。</p><p>响应式框架实现了由响应式流API驱动的事件驱动架构。正如我们所看到的，这使我们能够编写使用最少数量的阻塞线程执行HTTP请求的服务。</p><p>结果，_WebClient_帮助我们构建在恶劣环境中表现一致的服务，通过使用更少的系统资源处理更多的请求。</p><h2 id="比较示例" tabindex="-1"><a class="header-anchor" href="#比较示例"><span>比较示例</span></a></h2><p>为了看到Feign客户端和_WebClient_之间的差异，我们将实现两个HTTP端点，它们都调用同一个返回产品列表的慢速端点。</p><p>我们将看到，在阻塞Feign实现的情况下，每个请求线程会阻塞两秒钟，直到收到响应。</p><p>另一方面，非阻塞_WebClient_将立即关闭请求线程。</p><p>首先，我们需要添加三个依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.springframework.boot```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```spring-boot-starter-webflux```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.springframework.boot```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```spring-boot-starter-web```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.springframework.cloud```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```spring-cloud-starter-openfeign```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们有慢速端点的定义：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/slow-service-products&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">private</span> <span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Product</span><span class="token punctuation">&gt;</span></span>`````` <span class="token function">getAllProducts</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">2000L</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 延迟</span>\n    <span class="token keyword">return</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>\n      <span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token string">&quot;Fancy Smartphone&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;A stylish phone you need&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token string">&quot;Cool Watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;The only device you need&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token string">&quot;Smart TV&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Cristal clean images&quot;</span><span class="token punctuation">)</span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-使用feign调用慢速服务" tabindex="-1"><a class="header-anchor" href="#_3-1-使用feign调用慢速服务"><span>3.1 使用Feign调用慢速服务</span></a></h3><p>现在，让我们开始使用Feign实现第一个端点。</p><p>第一步是定义接口并使用@ _FeignClient_进行注解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;productsBlocking&quot;</span><span class="token punctuation">,</span> url <span class="token operator">=</span> <span class="token string">&quot;http://localhost:8080&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ProductsFeignClient</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>method <span class="token operator">=</span> <span class="token class-name">RequestMethod</span><span class="token punctuation">.</span><span class="token constant">GET</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">&quot;/slow-service-products&quot;</span><span class="token punctuation">,</span> produces <span class="token operator">=</span> <span class="token string">&quot;application/json&quot;</span><span class="token punctuation">)</span>\n    <span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Product</span><span class="token punctuation">&gt;</span></span>`````` <span class="token function">getProductsBlocking</span><span class="token punctuation">(</span><span class="token class-name">URI</span> baseUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们将使定义的_ProductsFeignClient_接口调用慢速服务：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/products-blocking&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Product</span><span class="token punctuation">&gt;</span></span>`````` <span class="token function">getProductsBlocking</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Starting BLOCKING Controller!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">final</span> <span class="token class-name">URI</span> uri <span class="token operator">=</span> <span class="token constant">URI</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token function">getSlowServiceBaseUri</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Product</span><span class="token punctuation">&gt;</span></span>`````` result <span class="token operator">=</span> productsFeignClient<span class="token punctuation">.</span><span class="token function">getProductsBlocking</span><span class="token punctuation">(</span>uri<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    result<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>product <span class="token operator">-&gt;</span> log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>product<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Exiting BLOCKING Controller!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> result<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们执行一个请求并看看日志是什么样子的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Starting BLOCKING Controller!\nProduct(title=Fancy Smartphone, description=A stylish phone you need)\nProduct(title=Cool Watch, description=The only device you need)\nProduct(title=Smart TV, description=Cristal clean images)\nExiting BLOCKING Controller!\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如预期的那样，<strong>在同步实现的情况下，请求线程正在等待接收所有产品</strong>。之后，它将它们打印到控制台并退出控制器函数，然后最终关闭请求线程。</p><h3 id="_3-2-使用-webclient-调用慢速服务" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-webclient-调用慢速服务"><span>3.2 使用_WebClient_调用慢速服务</span></a></h3><p>其次，让我们实现一个非阻塞_WebClient_来调用同一个端点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/products-non-blocking&quot;</span><span class="token punctuation">,</span> produces <span class="token operator">=</span> <span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">TEXT_EVENT_STREAM_VALUE</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token class-name">Flux</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Product</span><span class="token punctuation">&gt;</span></span>`````` <span class="token function">getProductsNonBlocking</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Starting NON-BLOCKING Controller!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Flux</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Product</span><span class="token punctuation">&gt;</span></span>`````` productFlux <span class="token operator">=</span> <span class="token class-name">WebClient</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span><span class="token function">getSlowServiceBaseUri</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token constant">SLOW_SERVICE_PRODUCTS_ENDPOINT_NAME</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">retrieve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">bodyToFlux</span><span class="token punctuation">(</span><span class="token class-name">Product</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    productFlux<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span>product <span class="token operator">-&gt;</span> log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>product<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Exiting NON-BLOCKING Controller!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> productFlux<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>与返回产品列表不同，控制器函数返回了_Flux_发布者并快速完成方法</strong>。在这种情况下，消费者将订阅_Flux_实例，并在产品可用时处理它们。</p><p>现在，让我们再次查看日志：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Starting NON-BLOCKING Controller!\nExiting NON-BLOCKING Controller!\nProduct(title=Fancy Smartphone, description=A stylish phone you need)\nProduct(title=Cool Watch, description=The only device you need)\nProduct(title=Smart TV, description=Cristal clean images)\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如预期的那样，控制器函数立即完成，并且通过这种方式，它也完成了请求线程。一旦_产品_可用，订阅的函数就会处理它们。</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们比较了Spring中编写Web客户端的两种风格。</p><p>首先，我们探索了Feign客户端，这是一种编写同步和阻塞Web客户端的声明式风格。</p><p>其次，我们探索了_WebClient_，它使得Web客户端的异步实现成为可能。</p><p>尽管Feign客户端在许多情况下是一个很好的选择，并且生成的代码具有较低的认知复杂性，但_WebClient_的非阻塞风格在高流量激增期间使用更少的系统资源。考虑到这一点，对于这些情况，选择_WebClient_是更可取的。</p><p>像往常一样，本文的代码可以在GitHub上找到。</p>',45),o=[p];function i(c,l){return a(),s("div",null,o)}const d=n(e,[["render",i],["__file","2024-07-11-Spring Boot FeignClient vs. WebClient.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Spring%20Boot%20FeignClient%20vs.%20WebClient.html","title":"Spring Boot FeignClient与WebClient比较","lang":"zh-CN","frontmatter":{"date":"2024-07-12T00:00:00.000Z","category":["Spring Boot","Web Client"],"tag":["FeignClient","WebClient"],"head":[["meta",{"name":"keywords","content":"Spring Boot, FeignClient, WebClient, REST, 微服务"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Spring%20Boot%20FeignClient%20vs.%20WebClient.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Boot FeignClient与WebClient比较"}],["meta",{"property":"og:description","content":"Spring Boot FeignClient与WebClient比较 在本教程中，我们将比较Spring Feign——一种声明式REST客户端，以及Spring 5中引入的Spring WebClient——一种响应式Web客户端。 阻塞与非阻塞客户端 在当今的微服务生态系统中，通常需要后端服务使用HTTP调用其他Web服务。因此，Spring应用..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T23:41:20.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"FeignClient"}],["meta",{"property":"article:tag","content":"WebClient"}],["meta",{"property":"article:published_time","content":"2024-07-12T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T23:41:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Boot FeignClient与WebClient比较\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-12T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T23:41:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Boot FeignClient与WebClient比较 在本教程中，我们将比较Spring Feign——一种声明式REST客户端，以及Spring 5中引入的Spring WebClient——一种响应式Web客户端。 阻塞与非阻塞客户端 在当今的微服务生态系统中，通常需要后端服务使用HTTP调用其他Web服务。因此，Spring应用..."},"headers":[{"level":2,"title":"阻塞与非阻塞客户端","slug":"阻塞与非阻塞客户端","link":"#阻塞与非阻塞客户端","children":[{"level":3,"title":"2.1 Spring Boot 阻塞Feign客户端","slug":"_2-1-spring-boot-阻塞feign客户端","link":"#_2-1-spring-boot-阻塞feign客户端","children":[]},{"level":3,"title":"2.2 Spring Boot 非阻塞_WebClient_","slug":"_2-2-spring-boot-非阻塞-webclient","link":"#_2-2-spring-boot-非阻塞-webclient","children":[]}]},{"level":2,"title":"比较示例","slug":"比较示例","link":"#比较示例","children":[{"level":3,"title":"3.1 使用Feign调用慢速服务","slug":"_3-1-使用feign调用慢速服务","link":"#_3-1-使用feign调用慢速服务","children":[]},{"level":3,"title":"3.2 使用_WebClient_调用慢速服务","slug":"_3-2-使用-webclient-调用慢速服务","link":"#_3-2-使用-webclient-调用慢速服务","children":[]}]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720741280000,"updatedTime":1720741280000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.07,"words":1522},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Spring Boot FeignClient vs. WebClient.md","localizedDate":"2024年7月12日","excerpt":"\\n<p>在本教程中，我们将比较Spring Feign——一种声明式REST客户端，以及Spring 5中引入的Spring <em>WebClient</em>——一种响应式Web客户端。</p>\\n<h2>阻塞与非阻塞客户端</h2>\\n<p>在当今的微服务生态系统中，通常需要后端服务使用HTTP调用其他Web服务。因此，Spring应用程序需要一个Web客户端来执行请求。</p>\\n<p>接下来，我们将检查阻塞Feign客户端和非阻塞_WebClient_实现之间的差异。</p>\\n<h3>2.1 Spring Boot 阻塞Feign客户端</h3>\\n<p>Feign客户端是一种声明式REST客户端，它使编写Web客户端变得更容易。使用Feign时，开发人员只需要定义接口并相应地进行注解。然后，Spring在运行时提供实际的Web客户端实现。</p>","autoDesc":true}');export{d as comp,k as data};
