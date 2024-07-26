import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-8nJ1rqSf.js";const e={},p=t('<hr><h1 id="spring-cloud-sidecar-介绍" tabindex="-1"><a class="header-anchor" href="#spring-cloud-sidecar-介绍"><span>Spring Cloud Sidecar 介绍</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Spring Cloud 提供了广泛的功能和库，如客户端负载均衡、服务注册/发现、并发控制和配置服务器。另一方面，在微服务世界中，使用不同语言和框架编写的多语言服务是一种常见做法。那么，如果我们希望在整个生态系统中利用 Spring Cloud 的优势呢？Spring Cloud Netflix Sidecar 就是这里的解决方案。</p><p>在本教程中，我们将通过工作示例更深入地了解 Spring Cloud Sidecar。</p><h2 id="_2-什么是-spring-cloud-sidecar" tabindex="-1"><a class="header-anchor" href="#_2-什么是-spring-cloud-sidecar"><span>2. 什么是 Spring Cloud Sidecar？</span></a></h2><p>Cloud Netflix Sidecar 的灵感来自 Netflix Prana，可以用作一个实用工具，以便于使用服务注册，为非 JVM 语言编写的服务提高 Spring Cloud 生态系统内的端点互操作性。</p><p><strong>使用 Cloud Sidecar，非 JVM 服务可以注册到服务注册表中。</strong> 此外，该服务还可以使用服务发现查找其他服务，甚至可以通过主机查找或 Zuul 代理访问配置服务器。非 JVM 服务能够集成的唯一要求是有一个标准的健康检查端点可用。</p><h2 id="_3-示例应用程序" tabindex="-1"><a class="header-anchor" href="#_3-示例应用程序"><span>3. 示例应用程序</span></a></h2><p>我们的示例用例包括 3 个应用程序。为了展示 Cloud Netflix Sidecar 的最佳效果，我们将在 NodeJS 中创建一个 <em>/hello</em> 端点，然后通过一个名为 sidecar 的 Spring 应用程序将其暴露给我们的生态系统。我们还将开发另一个 Spring Boot 应用程序，使用服务发现回显 <em>/hello</em> 端点响应，并使用 Zuul。</p><p>通过这个项目，我们的目标是涵盖请求的两个流程：</p><ul><li>用户在 echo Spring Boot 应用程序上调用 echo 端点。echo 端点使用 <em>DiscoveryClient</em> 查找 Eureka 中的 hello 服务 URL，即指向 NodeJS 服务的 URL。然后 echo 端点在 NodeJS 应用程序上调用 hello 端点</li><li>用户通过 Zuul 代理直接从 echo 应用程序调用 hello 端点</li></ul><h3 id="_3-1-nodejs-hello-端点" tabindex="-1"><a class="header-anchor" href="#_3-1-nodejs-hello-端点"><span>3.1. NodeJS Hello 端点</span></a></h3><p>让我们从创建一个名为 <em>hello.js</em> 的 JS 文件开始。我们使用 <em>express</em> 来处理我们的 hello 请求。在我们的 <em>hello.js</em> 文件中，我们引入了三个端点——默认的“/”端点、<em>/hello</em> 端点和一个 <em>/health</em> 端点，以满足 Spring Cloud Sidecar 的要求：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;express&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> port <span class="token operator">=</span> <span class="token number">3000</span><span class="token punctuation">;</span>\n\napp<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&#39;Hello World!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\napp<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;/health&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string-property property">&quot;status&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UP&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\napp<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;/hello/:me&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&#39;Hello &#39;</span> <span class="token operator">+</span> req<span class="token punctuation">.</span>params<span class="token punctuation">.</span>me <span class="token operator">+</span> <span class="token string">&#39;!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\napp<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span>port<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Hello app listening on port </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>port<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将安装 <em>express</em>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> express\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，让我们启动我们的应用程序：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">node</span> hello.js\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>应用程序启动后，让我们 <em>curl</em> hello 端点：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> http://localhost:3000/hello/baeldung\nHello baeldung<span class="token operator">!</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们测试健康端点：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> http://localhost:3000/health\nstatus:<span class="token string">&quot;UP&quot;</span><span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>有了我们的 Node 应用程序为下一步做好准备，我们将 Spring 化它。</p><h3 id="_3-2-sidecar-应用程序" tabindex="-1"><a class="header-anchor" href="#_3-2-sidecar-应用程序"><span>3.2. Sidecar 应用程序</span></a></h3><p>首先，我们需要有一个 Eureka 服务器。Eureka 服务器启动后，我们可以访问它：http://127.0.0.1:8761</p><p>让我们添加 <em>spring-cloud-netflix-sidecar</em> 作为依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.springframework.cloud```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```spring-cloud-netflix-sidecar```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```2.2.10.RELEASE```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>需要注意的是，目前 <em>spring-cloud-netflix-sidecar</em> 的最新版本是 <em>2.2.10.RELEASE</em>，并且它只支持 spring boot <em>2.3.12.RELEASE</em>。因此，当前最新版本的 Spring Boot 与 Netflix Sidecar 不兼容。</strong></p><p>然后让我们实现我们的 Spring Boot 应用程序类，并启用 sidecar：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>\n<span class="token annotation punctuation">@EnableSidecar</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SidecarApplication</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">SidecarApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们需要设置连接到 Eureka 的属性。此外，我们设置了 sidecar 配置，包括我们的 NodeJS hello 应用程序的端口和健康 URI：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">server.port</span><span class="token punctuation">:</span> <span class="token value attr-value">8084</span>\n<span class="token key attr-name">spring</span><span class="token punctuation">:</span>\n<span class="token key attr-name">  application</span><span class="token punctuation">:</span>\n<span class="token key attr-name">    name</span><span class="token punctuation">:</span> <span class="token value attr-value">sidecar</span>\n<span class="token key attr-name">eureka</span><span class="token punctuation">:</span>\n<span class="token key attr-name">  instance</span><span class="token punctuation">:</span>\n<span class="token key attr-name">    hostname</span><span class="token punctuation">:</span> <span class="token value attr-value">localhost</span>\n<span class="token key attr-name">    leaseRenewalIntervalInSeconds</span><span class="token punctuation">:</span> <span class="token value attr-value">1</span>\n<span class="token key attr-name">    leaseExpirationDurationInSeconds</span><span class="token punctuation">:</span> <span class="token value attr-value">2</span>\n<span class="token key attr-name">  client</span><span class="token punctuation">:</span>\n<span class="token key attr-name">    service-url</span><span class="token punctuation">:</span>\n<span class="token key attr-name">      defaultZone</span><span class="token punctuation">:</span> <span class="token value attr-value">http://127.0.0.1:8761/eureka</span>\n<span class="token key attr-name">healthcheck</span><span class="token punctuation">:</span>\n<span class="token key attr-name">  enabled</span><span class="token punctuation">:</span> <span class="token value attr-value">true</span>\n<span class="token key attr-name">sidecar</span><span class="token punctuation">:</span>\n<span class="token key attr-name">  port</span><span class="token punctuation">:</span> <span class="token value attr-value">3000</span>\n<span class="token key attr-name">  health-uri</span><span class="token punctuation">:</span> <span class="token value attr-value">http://localhost:3000/health</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以启动我们的应用程序。应用程序成功启动后，Spring 在 Eureka 服务器中注册了一个名为“hello”的服务。</p><p>要检查它是否工作，我们可以访问端点：http://localhost:8084/hosts/sidecar。</p><p><em>@EnableSidecar</em> 不仅仅是一个标记，用于将 sidecar 服务注册到 Eureka。它还会导致 <em>@EnableCircuitBreaker</em> 和 <em>@EnableZuulProxy</em> 被添加，随后我们的 Spring Boot 应用程序从 Hystrix 和 Zuul 中受益。</p><p>现在，有了我们的 Spring 应用程序准备好了，让我们进入下一步，看看我们生态系统中服务之间的通信是如何工作的。</p><h3 id="_3-3-echo-应用程序也说-hello" tabindex="-1"><a class="header-anchor" href="#_3-3-echo-应用程序也说-hello"><span>3.3. Echo 应用程序也说 Hello!</span></a></h3><p>对于 echo 应用程序，我们将创建一个端点，该端点使用服务发现调用 NodeJS hello 端点。此外，我们将启用 Zuul 代理以展示这两种服务之间通信的其他选项。</p><p>首先，让我们添加依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.springframework.cloud```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```spring-cloud-starter-netflix-zuul```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```2.2.10.RELEASE```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.springframework.cloud```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```spring-cloud-starter-netflix-eureka-client```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```2.2.10.RELEASE```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>为了与 sidecar 应用程序保持一致，我们在 echo 应用程序中使用 <em>2.2.10.RELEASE</em> 版本，用于 <em>spring-cloud-starter-netflix-zuul</em> 和 <em>spring-cloud-starter-netflix-eureka-client</em> 的依赖项。</strong></p><p>然后让我们创建 Spring Boot 主类并启用 Zuul 代理：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>\n<span class="token annotation punctuation">@EnableEurekaClient</span>\n<span class="token annotation punctuation">@EnableZuulProxy</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EchoApplication</span> <span class="token punctuation">{</span>\n    <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们像前一节中所做的那样配置 Eureka 客户端：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">server.port</span><span class="token punctuation">:</span> <span class="token value attr-value">8085</span>\n<span class="token key attr-name">spring</span><span class="token punctuation">:</span>\n<span class="token key attr-name">  application</span><span class="token punctuation">:</span>\n<span class="token key attr-name">    name</span><span class="token punctuation">:</span> <span class="token value attr-value">echo</span>\n<span class="token key attr-name">eureka</span><span class="token punctuation">:</span>\n<span class="token key attr-name">  instance</span><span class="token punctuation">:</span>\n<span class="token key attr-name">    hostname</span><span class="token punctuation">:</span> <span class="token value attr-value">localhost</span>\n<span class="token key attr-name">    leaseRenewalIntervalInSeconds</span><span class="token punctuation">:</span> <span class="token value attr-value">1</span>\n<span class="token key attr-name">    leaseExpirationDurationInSeconds</span><span class="token punctuation">:</span> <span class="token value attr-value">2</span>\n<span class="token key attr-name">  client</span><span class="token punctuation">:</span>\n<span class="token key attr-name">    service-url</span><span class="token punctuation">:</span>\n<span class="token key attr-name">      defaultZone</span><span class="token punctuation">:</span> <span class="token value attr-value">http://127.0.0.1:8761</span>\n ...\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们启动我们的 echo 应用程序。启动后，我们可以检查我们两个服务之间的互操作性。</p><p>要检查 sidecar 应用程序，让我们查询它以获取 echo 服务的元数据：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> http://localhost:8084/hosts/echo\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，为了验证 echo 应用程序可以通过 sidecar 应用程序暴露的 NodeJS 端点调用，让我们使用 Zuul 代理的魔力并 curl 这个 URL：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> http://localhost:8085/sidecar/hello/baeldung\nHello baeldung<span class="token operator">!</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>既然我们已经验证了一切工作正常，让我们尝试另一种调用 hello 端点的方式。首先，我们将在 echo 应用程序中创建一个控制器并注入 <em>DiscoveryClient</em>。然后我们添加一个 <em>GET</em> 端点，该端点使用 <em>DiscoveryClient</em> 查询 hello 服务并使用 <em>RestTemplate</em> 调用它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>\n<span class="token class-name">DiscoveryClient</span> discoveryClient<span class="token punctuation">;</span>\n\n<span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/hello/{me}&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>` <span class="token function">echo</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">&quot;me&quot;</span><span class="token punctuation">)</span> <span class="token class-name">String</span> me<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">List</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ServiceInstance</span><span class="token punctuation">&gt;</span></span>` instances <span class="token operator">=</span> discoveryClient<span class="token punctuation">.</span><span class="token function">getInstances</span><span class="token punctuation">(</span><span class="token string">&quot;sidecar&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>instances<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">SERVICE_UNAVAILABLE</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span><span class="token string">&quot;hello service is down&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token class-name">String</span> url <span class="token operator">=</span> instances<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getUri</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>restTemplate<span class="token punctuation">.</span><span class="token function">getForObject</span><span class="token punctuation">(</span>url <span class="token operator">+</span> <span class="token string">&quot;/hello/&quot;</span> <span class="token operator">+</span> me<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们重新启动 echo 应用程序并执行这个 curl 以验证从echo 应用程序调用的 echo 端点：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> http://localhost:8085/hello/baeldung\nHello baeldung<span class="token operator">!</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>或者让它更有趣一些，从 sidecar 应用程序调用它：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> http://localhost:8084/echo/hello/baeldung\nHello baeldung<span class="token operator">!</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们了解了 Cloud Netflix Sidecar 并构建了一个工作示例，使用 NodeJS 和两个 Spring 应用程序来展示其在 Spring 生态系统中的使用方式。</p><p>一如既往，示例的完整代码可以在 GitHub 上找到。 OK</p>',60),l=[p];function o(c,i){return s(),a("div",null,l)}const d=n(e,[["render",o],["__file","2024-07-18-Introduction to Spring Cloud Sidecar.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Introduction%20to%20Spring%20Cloud%20Sidecar.html","title":"Spring Cloud Sidecar 介绍","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Cloud","Microservices"],"tag":["Spring Cloud Sidecar","Netflix Sidecar","Service Discovery","Eureka","Zuul Proxy"],"head":[["meta",{"name":"keywords","content":"Spring Cloud Sidecar, Netflix Sidecar, Service Discovery, Eureka, Zuul Proxy"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Introduction%20to%20Spring%20Cloud%20Sidecar.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Cloud Sidecar 介绍"}],["meta",{"property":"og:description","content":"Spring Cloud Sidecar 介绍 1. 概述 Spring Cloud 提供了广泛的功能和库，如客户端负载均衡、服务注册/发现、并发控制和配置服务器。另一方面，在微服务世界中，使用不同语言和框架编写的多语言服务是一种常见做法。那么，如果我们希望在整个生态系统中利用 Spring Cloud 的优势呢？Spring Cloud Netfli..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T10:30:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Cloud Sidecar"}],["meta",{"property":"article:tag","content":"Netflix Sidecar"}],["meta",{"property":"article:tag","content":"Service Discovery"}],["meta",{"property":"article:tag","content":"Eureka"}],["meta",{"property":"article:tag","content":"Zuul Proxy"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T10:30:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Cloud Sidecar 介绍\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T10:30:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Cloud Sidecar 介绍 1. 概述 Spring Cloud 提供了广泛的功能和库，如客户端负载均衡、服务注册/发现、并发控制和配置服务器。另一方面，在微服务世界中，使用不同语言和框架编写的多语言服务是一种常见做法。那么，如果我们希望在整个生态系统中利用 Spring Cloud 的优势呢？Spring Cloud Netfli..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 什么是 Spring Cloud Sidecar？","slug":"_2-什么是-spring-cloud-sidecar","link":"#_2-什么是-spring-cloud-sidecar","children":[]},{"level":2,"title":"3. 示例应用程序","slug":"_3-示例应用程序","link":"#_3-示例应用程序","children":[{"level":3,"title":"3.1. NodeJS Hello 端点","slug":"_3-1-nodejs-hello-端点","link":"#_3-1-nodejs-hello-端点","children":[]},{"level":3,"title":"3.2. Sidecar 应用程序","slug":"_3-2-sidecar-应用程序","link":"#_3-2-sidecar-应用程序","children":[]},{"level":3,"title":"3.3. Echo 应用程序也说 Hello!","slug":"_3-3-echo-应用程序也说-hello","link":"#_3-3-echo-应用程序也说-hello","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721298638000,"updatedTime":1721298638000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.72,"words":1717},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Introduction to Spring Cloud Sidecar.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Spring Cloud Sidecar 介绍</h1>\\n<h2>1. 概述</h2>\\n<p>Spring Cloud 提供了广泛的功能和库，如客户端负载均衡、服务注册/发现、并发控制和配置服务器。另一方面，在微服务世界中，使用不同语言和框架编写的多语言服务是一种常见做法。那么，如果我们希望在整个生态系统中利用 Spring Cloud 的优势呢？Spring Cloud Netflix Sidecar 就是这里的解决方案。</p>\\n<p>在本教程中，我们将通过工作示例更深入地了解 Spring Cloud Sidecar。</p>\\n<h2>2. 什么是 Spring Cloud Sidecar？</h2>","autoDesc":true}');export{d as comp,k as data};
