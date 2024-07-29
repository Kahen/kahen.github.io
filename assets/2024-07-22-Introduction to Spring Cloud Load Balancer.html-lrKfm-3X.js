import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BUAgDejY.js";const e={},p=t(`<h1 id="spring-cloud-负载均衡器简介" tabindex="-1"><a class="header-anchor" href="#spring-cloud-负载均衡器简介"><span>Spring Cloud 负载均衡器简介</span></a></h1><p>随着微服务架构越来越受欢迎，跨不同服务器运行多个服务变得越来越普遍。在这个快速教程中，<strong>我们将看看如何使用Spring Cloud Load Balancer来创建更具容错性的应用程序</strong>。</p><h2 id="_2-什么是负载均衡" tabindex="-1"><a class="header-anchor" href="#_2-什么是负载均衡"><span>2. 什么是负载均衡？</span></a></h2><p><strong>负载均衡是将流量分配到同一应用程序的不同实例的过程。</strong></p><p>为了创建一个容错系统，通常运行每个应用程序的多个实例。因此，每当一个服务需要与另一个服务通信时，它需要选择一个特定的实例来发送其请求。</p><p>在负载均衡方面有许多算法：</p><ul><li>随机选择：随机选择一个实例</li><li>轮询：每次以相同的顺序选择一个实例</li><li>最少连接数：选择当前连接数最少的实例</li><li>加权指标：使用加权指标选择最佳实例（例如，CPU或内存使用量）</li><li>IP哈希：使用客户端IP的哈希映射到一个实例</li></ul><p>这些只是负载均衡算法的一些示例，<strong>每种算法都有其优缺点</strong>。</p><p>随机选择和轮询易于实现，但可能不会最优化地使用服务。相反，最少连接数和加权指标更复杂，但通常会创建更优化的服务利用率。而IP哈希在服务器粘性很重要时表现良好，但并不是非常容错。</p><h2 id="_3-spring-cloud-load-balancer-简介" tabindex="-1"><a class="header-anchor" href="#_3-spring-cloud-load-balancer-简介"><span>3. Spring Cloud Load Balancer 简介</span></a></h2><p>Spring Cloud Load Balancer 库<strong>允许我们创建以负载均衡方式与其他应用程序通信的应用程序</strong>。使用我们想要的任何算法，我们可以轻松地在进行远程服务调用时实现负载均衡。</p><p>为了说明，让我们看一些示例代码。我们将从一个简单的服务器应用程序开始。服务器将有一个单一的HTTP端点，并且可以作为多个实例运行。</p><p>然后，我们将创建一个客户端应用程序，该应用程序使用Spring Cloud Load Balancer在服务器的不同实例之间交替请求。</p><h3 id="_3-1-示例服务器" tabindex="-1"><a class="header-anchor" href="#_3-1-示例服务器"><span>3.1 示例服务器</span></a></h3><p>对于我们的示例服务器，我们从一个简单的Spring Boot应用程序开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ServerApplication</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">ServerApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;\${server.instance.id}&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">String</span> instanceId<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/hello&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;Hello from instance %s&quot;</span><span class="token punctuation">,</span> instanceId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们首先注入一个名为_instanceId_的可配置变量。这允许我们在多个运行实例之间进行区分。接下来，我们添加一个单一的HTTP GET端点，它回显消息和实例ID。</p><p>默认实例将在端口8080上运行，ID为1。<strong>要运行第二个实例，们只需要添加几个程序参数</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token parameter variable">--server.instance.id</span><span class="token operator">=</span><span class="token number">2</span> <span class="token parameter variable">--server.port</span><span class="token operator">=</span><span class="token number">8081</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-2-示例客户端" tabindex="-1"><a class="header-anchor" href="#_3-2-示例客户端"><span>3.2 示例客户端</span></a></h3><p>现在，让我们看看客户端代码。<strong>这是我们使用Spring Cloud Load Balancer的地方</strong>，所以让我们先从在我们的应用程序中包含它开始：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.springframework.cloud\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`spring-cloud-starter-loadbalancer\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们创建一个_ServiceInstanceListSupplier_的实现。<strong>这是Spring Cloud Load Balancer中的一个关键接口</strong>。它定义了我们如何找到可用的服务实例。</p><p>对于我们的示例应用程序，我们将硬编码两个不同的示例服务器实例。它们在同一台机器上运行，但使用不同的端口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">DemoInstanceSupplier</span> <span class="token keyword">implements</span> <span class="token class-name">ServiceInstanceListSupplier</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> serviceId<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">DemoInstanceSupplier</span><span class="token punctuation">(</span><span class="token class-name">String</span> serviceId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>serviceId <span class="token operator">=</span> serviceId<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getServiceId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> serviceId<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Flux</span>\`<span class="token operator">&lt;</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ServiceInstance</span><span class="token punctuation">&gt;</span></span>\`<span class="token operator">&gt;</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Flux</span><span class="token punctuation">.</span><span class="token function">just</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span>
            <span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">DefaultServiceInstance</span><span class="token punctuation">(</span>serviceId <span class="token operator">+</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> serviceId<span class="token punctuation">,</span> <span class="token string">&quot;localhost&quot;</span><span class="token punctuation">,</span> <span class="token number">8080</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
              <span class="token keyword">new</span> <span class="token class-name">DefaultServiceInstance</span><span class="token punctuation">(</span>serviceId <span class="token operator">+</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span> serviceId<span class="token punctuation">,</span> <span class="token string">&quot;localhost&quot;</span><span class="token punctuation">,</span> <span class="token number">8081</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在现实世界的系统中，我们将希望使用不硬编码服务地址的实现。我们将在后面更详细地讨论这个问题。</p><p>现在，让我们创建一个_LoadBalancerConfiguration_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@LoadBalancerClient</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;example-service&quot;</span><span class="token punctuation">,</span> configuration <span class="token operator">=</span> <span class="token class-name">DemoServerInstanceConfiguration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">WebClientConfig</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@LoadBalanced</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token class-name">WebClient<span class="token punctuation">.</span>Builder</span> <span class="token function">webClientBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">WebClient</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个类有一个角色：创建一个负载均衡的_WebClient_构建器来进行远程请求。<strong>注意我们的注解使用了一个服务的伪名称</strong>。</p><p>这是因为我们可能事先不知道运行实例的实际主机名和端口。因此，我们使用一个伪名称作为占位符，当框架选择一个运行实例时，它将替换为真实值。</p><p>接下来，让我们创建一个_Configuration_类来实例化我们的服务实例供应商。注意我们使用了与上述相同的伪名称：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">class</span> <span class="token class-name">DemoServerInstanceConfiguration</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token class-name">ServiceInstanceListSupplier</span> <span class="token function">serviceInstanceListSupplier</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DemoInstanceSupplier</span><span class="token punctuation">(</span><span class="token string">&quot;example-service&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以创建实际的客户端应用程序。让我们使用上面的_WebClient_ bean向示例服务器发送十个请求：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ClientApplication</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token class-name">ConfigurableApplicationContext</span> ctx <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SpringApplicationBuilder</span><span class="token punctuation">(</span><span class="token class-name">ClientApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">web</span><span class="token punctuation">(</span><span class="token class-name">WebApplicationType</span><span class="token punctuation">.</span><span class="token constant">NONE</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">WebClient</span> loadBalancedClient <span class="token operator">=</span> ctx<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">WebClient<span class="token punctuation">.</span>Builder</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> response <span class="token operator">=</span>
              loadBalancedClient<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span><span class="token string">&quot;http://example-service/hello&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">retrieve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEntity</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">block</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看输出，我们可以确认我们在两个不同的实例之间进行负载均衡：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Hello from instance 2
Hello from instance 1
Hello from instance 2
Hello from instance 1
Hello from instance 2
Hello from instance 1
Hello from instance 2
Hello from instance 1
Hello from instance 2
Hello from instance 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-其他特性" tabindex="-1"><a class="header-anchor" href="#_4-其他特性"><span>4. 其他特性</span></a></h2><p><strong>示例服务器和客户端展示了Spring Cloud Load Balancer的非常简单的用法</strong>。但是其他库特性值得一提。</p><p>首先，示例客户端使用了默认的_RoundRobinLoadBalancer_策略。库还提供了一个_RandomLoadBalancer_类。我们也可以创建我们自己的_ReactorServiceInstanceLoadBalancer_实现，使用我们想要的任何算法。</p><p>此外，库提供了一种<strong>动态发现服务实例的方式</strong>。我们通过使用_DiscoveryClientServiceInstanceListSupplier_接口来实现这一点。这对于与服务发现系统集成，如Eureka或Zookeeper，非常有用。</p><p>除了不同的负载均衡和服务发现特性外，库还提供了基本的重试能力。在底层，它最终依赖于Spring Retry库。<strong>这允许我们重试失败的请求</strong>，可能在一段时间后使用相同的实例。</p><p>另一个内置特性是指标，它建立在Micrometer库之上。开箱即用，我们为每个实例获得基本的服务级别指标，但我们也可以添加我们自己的。</p><p>最后，Spring Cloud Load Balancer库提供了一种使用_LoadBalancerCacheManager_接口缓存服务实例的方式。这很重要，因为，在现实中，<strong>查找可用服务实例可能涉及远程调用</strong>。这意味着查找不经常更改的数据可能代价高昂，并且它也代表了应用程序中的一个可能的故障点。<strong>通过使用服务实例的缓存，我们的应用程序可以绕过这些缺点。</strong></p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>负载均衡是构建现代、容错系统的重要组成部分。使用Spring Cloud Load Balancer，<strong>我们可以轻松创建使用各种负载均衡技术将请求分发到不同服务实例的应用程序</strong>。</p><p>当然，这里所有的示例代码都可以在GitHub上找到。</p>`,46),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-22-Introduction to Spring Cloud Load Balancer.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-22/2024-07-22-Introduction%20to%20Spring%20Cloud%20Load%20Balancer.html","title":"Spring Cloud 负载均衡器简介","lang":"zh-CN","frontmatter":{"date":"2024-07-23T00:00:00.000Z","category":["Spring Cloud","Load Balancer"],"tag":["Microservices","Fault Tolerance","Load Balancing"],"head":[["meta",{"name":"keywords","content":"Spring Cloud, Load Balancer, Microservices, Fault Tolerance, Load Balancing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-22/2024-07-22-Introduction%20to%20Spring%20Cloud%20Load%20Balancer.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Cloud 负载均衡器简介"}],["meta",{"property":"og:description","content":"Spring Cloud 负载均衡器简介 随着微服务架构越来越受欢迎，跨不同服务器运行多个服务变得越来越普遍。在这个快速教程中，我们将看看如何使用Spring Cloud Load Balancer来创建更具容错性的应用程序。 2. 什么是负载均衡？ 负载均衡是将流量分配到同一应用程序的不同实例的过程。 为了创建一个容错系统，通常运行每个应用程序的多个..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T19:17:10.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Microservices"}],["meta",{"property":"article:tag","content":"Fault Tolerance"}],["meta",{"property":"article:tag","content":"Load Balancing"}],["meta",{"property":"article:published_time","content":"2024-07-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-22T19:17:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Cloud 负载均衡器简介\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-22T19:17:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Cloud 负载均衡器简介 随着微服务架构越来越受欢迎，跨不同服务器运行多个服务变得越来越普遍。在这个快速教程中，我们将看看如何使用Spring Cloud Load Balancer来创建更具容错性的应用程序。 2. 什么是负载均衡？ 负载均衡是将流量分配到同一应用程序的不同实例的过程。 为了创建一个容错系统，通常运行每个应用程序的多个..."},"headers":[{"level":2,"title":"2. 什么是负载均衡？","slug":"_2-什么是负载均衡","link":"#_2-什么是负载均衡","children":[]},{"level":2,"title":"3. Spring Cloud Load Balancer 简介","slug":"_3-spring-cloud-load-balancer-简介","link":"#_3-spring-cloud-load-balancer-简介","children":[{"level":3,"title":"3.1 示例服务器","slug":"_3-1-示例服务器","link":"#_3-1-示例服务器","children":[]},{"level":3,"title":"3.2 示例客户端","slug":"_3-2-示例客户端","link":"#_3-2-示例客户端","children":[]}]},{"level":2,"title":"4. 其他特性","slug":"_4-其他特性","link":"#_4-其他特性","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721675830000,"updatedTime":1721675830000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.99,"words":1797},"filePathRelative":"posts/baeldung/2024-07-22/2024-07-22-Introduction to Spring Cloud Load Balancer.md","localizedDate":"2024年7月23日","excerpt":"\\n<p>随着微服务架构越来越受欢迎，跨不同服务器运行多个服务变得越来越普遍。在这个快速教程中，<strong>我们将看看如何使用Spring Cloud Load Balancer来创建更具容错性的应用程序</strong>。</p>\\n<h2>2. 什么是负载均衡？</h2>\\n<p><strong>负载均衡是将流量分配到同一应用程序的不同实例的过程。</strong></p>\\n<p>为了创建一个容错系统，通常运行每个应用程序的多个实例。因此，每当一个服务需要与另一个服务通信时，它需要选择一个特定的实例来发送其请求。</p>\\n<p>在负载均衡方面有许多算法：</p>\\n<ul>\\n<li>随机选择：随机选择一个实例</li>\\n<li>轮询：每次以相同的顺序选择一个实例</li>\\n<li>最少连接数：选择当前连接数最少的实例</li>\\n<li>加权指标：使用加权指标选择最佳实例（例如，CPU或内存使用量）</li>\\n<li>IP哈希：使用客户端IP的哈希映射到一个实例</li>\\n</ul>","autoDesc":true}');export{d as comp,k as data};
