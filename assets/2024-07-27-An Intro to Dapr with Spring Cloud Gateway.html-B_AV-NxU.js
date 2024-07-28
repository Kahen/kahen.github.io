import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-D4B8YWfq.js";const t={},p=e(`<h1 id="dapr-与-spring-cloud-gateway-入门介绍" tabindex="-1"><a class="header-anchor" href="#dapr-与-spring-cloud-gateway-入门介绍"><span>Dapr 与 Spring Cloud Gateway 入门介绍</span></a></h1><p>在本文中，我们将从Spring Cloud Gateway应用程序和Spring Boot应用程序开始。然后，我们将更新它以使用Dapr（分布式应用程序运行时）。最后，我们将更新Dapr配置以展示Dapr在与云原生组件集成时提供的<strong>灵活性</strong>。</p><p>使用Dapr，我们可以在不影响应用程序本身的情况下管理云原生应用程序的部署。Dapr使用<strong>边车模式</strong>来卸载应用程序的部署问题，这允许我们将应用程序部署到其他环境（例如本地、不同的专有云平台、Kubernetes等）<strong>而无需对应用程序本身进行任何更改</strong>。有关更多详细信息，请查看Dapr网站上的概述。</p><h2 id="_3-创建示例应用程序" tabindex="-1"><a class="header-anchor" href="#_3-创建示例应用程序"><span><strong>3. 创建示例应用程序</strong></span></a></h2><p>我们将通过创建一个示例Spring Cloud Gateway和Spring Boot应用程序开始。按照“Hello world”示例的伟大传统，网关将代理请求到后端Spring Boot应用程序以获取标准的“Hello world”问候。</p><h3 id="_3-1-问候服务" tabindex="-1"><a class="header-anchor" href="#_3-1-问候服务"><span><strong>3.1. 问候服务</strong></span></a></h3><p>首先，让我们为问候服务创建一个Spring Boot应用程序。这是一个标准的Spring Boot应用程序，只有_spring-boot-starter-web_作为依赖项，标准的主类，并将服务器端口配置为3001。</p><p>让我们添加一个控制器来响应_hello_端点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GreetingController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/hello&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Hello world!&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>构建我们的问候服务应用程序后，我们将启动它：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-jar</span> greeting/target/greeting-1.0-SNAPSHOT.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以使用_curl_来测试它，返回“Hello world!”消息：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> http://localhost:3001/hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-2-spring-cloud-gateway" tabindex="-1"><a class="header-anchor" href="#_3-2-spring-cloud-gateway"><span><strong>3.2. Spring Cloud Gateway</strong></span></a></h3><p>现在，我们将在端口3000上创建一个Spring Cloud Gateway，作为一个标准的Spring Boot应用程序，只有_spring-cloud-starter-gateway_作为依赖项和标准的主类。我们还将配置路由以访问问候服务：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> greeting<span class="token punctuation">-</span>service
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3001/
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> Path=/<span class="token important">**</span>
          <span class="token key atrule">filters</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> RewritePath=/<span class="token punctuation">?</span>(<span class="token punctuation">?</span>\`\`&lt;segment<span class="token punctuation">&gt;</span>\`\`.<span class="token important">*)</span><span class="token punctuation">,</span> /$<span class="token punctuation">{</span>segment<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦我们构建了网关应用程序，我们可以启动网关：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-Dspring.profiles.active</span><span class="token operator">=</span>no-dapr <span class="token parameter variable">-jar</span> gateway/target/gateway-1.0-SNAPSHOT.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以使用_curl_来测试它，从问候服务返回“Hello world!”消息：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> http://localhost:3000/hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-添加dapr" tabindex="-1"><a class="header-anchor" href="#_4-添加dapr"><span><strong>4. 添加Dapr</strong></span></a></h2><p>现在我们已经建立了一个基本示例，让我们将Dapr加入其中。</p><p>我们通过<strong>配置网关与Dapr边车通信</strong>而不是直接与问候服务通信来实现这一点。然后，Dapr将负责找到问候服务并将请求转发给它；通信路径现在将从网关，通过Dapr边车，到问候服务。</p><h3 id="_4-1-部署dapr边车" tabindex="-1"><a class="header-anchor" href="#_4-1-部署dapr边车"><span><strong>4.1. 部署Dapr边车</strong></span></a></h3><p>首先，我们需要部署两个Dapr边车的实例——一个用于网关，一个用于问候服务。我们使用Dapr CLI来实现这一点。</p><p>我们将使用一个标准的Dapr配置文件：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> dapr.io/v1alpha1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Configuration
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> daprConfig
<span class="token key atrule">spec</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们使用_dapr_命令在端口4000上启动网关的Dapr边车：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>dapr run --app-id gateway --dapr-http-port <span class="token number">4000</span> --app-port <span class="token number">3000</span> <span class="token parameter variable">--config</span> dapr-config/basic-config.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们使用_dapr_命令在端口4001上启动问候服务的Dapr边车：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>dapr run --app-id greeting --dapr-http-port <span class="token number">4001</span> --app-port <span class="token number">3001</span> <span class="token parameter variable">--config</span> dapr-config/basic-config.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在边车正在运行，我们可以看到它们如何拦截并转发请求到问候服务。当我们使用_curl_进行测试时，它应该返回“Hello world!”问候：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> http://localhost:4001/v1.0/invoke/greeting/method/hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们尝试使用网关边车进行相同的测试，以确认它也返回“Hello world!”问候：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> http://localhost:4000/v1.0/invoke/greeting/method/hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里背后发生了什么？<strong>网关的Dapr边车使用服务发现</strong>（在这种情况下，是本地环境的mDNS），找到问候服务的Dapr边车。然后，它<strong>使用服务调用在问候服务上调用指定的端点</strong>。</p><h3 id="_4-2-更新网关配置" tabindex="-1"><a class="header-anchor" href="#_4-2-更新网关配置"><span><strong>4.2. 更新网关配置</strong></span></a></h3><p>下一步是配置网关路由以使用其Dapr边车：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> greeting<span class="token punctuation">-</span>service
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>4000/
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> Path=/<span class="token important">**</span>
          <span class="token key atrule">filters</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> RewritePath=//<span class="token punctuation">?</span>(<span class="token punctuation">?</span>\`\`&lt;segment<span class="token punctuation">&gt;</span>\`\`.<span class="token important">*)</span><span class="token punctuation">,</span> /v1.0/invoke/greeting/method/$<span class="token punctuation">{</span>segment<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们将使用更新的路由重新启动网关：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-Dspring.profiles.active</span><span class="token operator">=</span>with-dapr <span class="token parameter variable">-jar</span> gateway/target/gateway-1.0-SNAPSHOT.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以使用_curl_命令再次测试，从问候服务获取“Hello world”问候：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> http://localhost:3000/hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当我们使用Wireshark查看网络上发生的事情时，我们可以看到<strong>网关和服务之间的流量通过Dapr边车</strong>。</p><p>恭喜！我们现在成功地将Dapr引入了画面。让我们回顾一下这给我们带来了什么：网关不再需要配置以找到问候服务（也就是说，问候服务的端口号不再需要在路由配置中指定），网关也不需要知道如何将请求转发到问候服务的细节。</p><h2 id="_5-更新dapr配置" tabindex="-1"><a class="header-anchor" href="#_5-更新dapr配置"><span>5. 更新Dapr配置</span></a></h2><p>现在我们已经部署了Dapr，我们可以配置Dapr使用其他云原生组件。</p><h3 id="_5-1-使用consul进行服务发现" tabindex="-1"><a class="header-anchor" href="#_5-1-使用consul进行服务发现"><span><strong>5.1. 使用Consul进行服务发现</strong></span></a></h3><p>让我们使用Consul而不是mDNS进行服务发现。</p><p>首先，我们需要在默认端口8500上安装并启动Consul，然后更新Dapr边车配置以使用Consul：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> dapr.io/v1alpha1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Configuration
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> daprConfig
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">nameResolution</span><span class="token punctuation">:</span>
    <span class="token key atrule">component</span><span class="token punctuation">:</span> <span class="token string">&quot;consul&quot;</span>
    <span class="token key atrule">configuration</span><span class="token punctuation">:</span>
      <span class="token key atrule">selfRegister</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们将使用新的配置重新启动两个Dapr边车：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>dapr run --app-id greeting --dapr-http-port <span class="token number">4001</span> --app-port <span class="token number">3001</span> <span class="token parameter variable">--config</span> dapr-config/consul-config.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>dapr run --app-id gateway --dapr-http-port <span class="token number">4000</span> --app-port <span class="token number">3000</span> <span class="token parameter variable">--config</span> dapr-config/consul-config.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一旦边车重新启动，我们可以在Consul UI的Services页面上看到列出的网关和问候应用程序。注意，我们不需要重新启动应用程序本身。</p><p>看看这有多容易？<strong>Dapr边车的一个简单配置更改现在让我们支持Consul</strong>，最重要的是，<strong>对底层应用程序没有影响</strong>。这与使用Spring Cloud Consul不同，后者需要更新应用程序本身。</p><h3 id="_5-2-使用zipkin进行追踪" tabindex="-1"><a class="header-anchor" href="#_5-2-使用zipkin进行追踪"><span><strong>5.2. 使用Zipkin进行追踪</strong></span></a></h3><p>Dapr还支持与Zipkin集成，以追踪跨应用程序的调用。</p><p>首先，在默认端口9411上安装并启动Zipkin，然后更新Dapr边车的配置以添加Zipkin：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> dapr.io/v1alpha1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Configuration
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> daprConfig
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">nameResolution</span><span class="token punctuation">:</span>
    <span class="token key atrule">component</span><span class="token punctuation">:</span> <span class="token string">&quot;consul&quot;</span>
    <span class="token key atrule">configuration</span><span class="token punctuation">:</span>
      <span class="token key atrule">selfRegister</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">tracing</span><span class="token punctuation">:</span>
    <span class="token key atrule">samplingRate</span><span class="token punctuation">:</span> <span class="token string">&quot;1&quot;</span>
    <span class="token key atrule">zipkin</span><span class="token punctuation">:</span>
      <span class="token key atrule">endpointAddress</span><span class="token punctuation">:</span> <span class="token string">&quot;http://localhost:9411/api/v2/spans&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们需要重新启动两个Dapr边车以获取新的配置：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>dapr run --app-id greeting --dapr-http-port <span class="token number">4001</span> --app-port <span class="token number">3001</span> <span class="token parameter variable">--config</span> dapr-config/consul-zipkin-config.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>dapr run --app-id gateway --dapr-http-port <span class="token number">4000</span> --app-port <span class="token number">3000</span> <span class="token parameter variable">--config</span> dapr-config/consul-zipkin-config.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一旦Dapr重新启动，你可以发出_curl_命令，并在Zipkin UI中查看调用跟踪。</p><p>再次，不需要重新启动网关和问候服务。它<strong>只需要对Dapr配置进行简单的更新</strong>。与使用Spring Cloud Zipkin相比。</p><h3 id="_5-3-其他组件" tabindex="-1"><a class="header-anchor" href="#_5-3-其他组件"><span><strong>5.3. 其他组件</strong></span></a></h3><p>Dapr支持许多其他组件来解决其他问题，如安全性、监控和报告。查看Dapr文档以获取完整列表。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span><strong>6. 结论</strong></span></a></h2><p>我们已经将Dapr添加到一个简单的Spring Cloud Gateway示例中，与后端Spring Boot服务通信。我们已经展示了如何配置和启动Dapr边车，以及它如何处理诸如服务发现、通信和追踪等云原生问题。</p><p>尽管这需要部署和管理一个边车应用程序，但Dapr为部署到不同的云原生环境提供了<strong>灵活性</strong>，并在与Dapr集成后不需要更改应用程序即可解决云原生问题。</p><p>这种方法还意味着开发人员在编写代码时不需要承担云原生问题，这使他们能够专注于业务功能。一旦应用程序配置为使用Dapr边车，就可以在不影响应用程序的情况下解决不同的部署问题——无需重新编码、重新构建或重新部署应用程序。<strong>Dapr提供了应用程序和部署问题之间的清晰分离</strong>。</p><p>正如往一样，本文的完整代码可以在GitHub上找到。</p><p>OK</p>`,73),l=[p];function i(r,o){return s(),n("div",null,l)}const u=a(t,[["render",i],["__file","2024-07-27-An Intro to Dapr with Spring Cloud Gateway.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-27/2024-07-27-An%20Intro%20to%20Dapr%20with%20Spring%20Cloud%20Gateway.html","title":"Dapr 与 Spring Cloud Gateway 入门介绍","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Cloud","Dapr"],"tag":["Spring Cloud Gateway","Dapr"],"head":[["meta",{"name":"keywords","content":"Spring Cloud, Dapr, Spring Cloud Gateway, 分布式应用运行时, 微服务"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-27/2024-07-27-An%20Intro%20to%20Dapr%20with%20Spring%20Cloud%20Gateway.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Dapr 与 Spring Cloud Gateway 入门介绍"}],["meta",{"property":"og:description","content":"Dapr 与 Spring Cloud Gateway 入门介绍 在本文中，我们将从Spring Cloud Gateway应用程序和Spring Boot应用程序开始。然后，我们将更新它以使用Dapr（分布式应用程序运行时）。最后，我们将更新Dapr配置以展示Dapr在与云原生组件集成时提供的灵活性。 使用Dapr，我们可以在不影响应用程序本身的情况..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-27T03:35:48.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Cloud Gateway"}],["meta",{"property":"article:tag","content":"Dapr"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-27T03:35:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Dapr 与 Spring Cloud Gateway 入门介绍\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-27T03:35:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Dapr 与 Spring Cloud Gateway 入门介绍 在本文中，我们将从Spring Cloud Gateway应用程序和Spring Boot应用程序开始。然后，我们将更新它以使用Dapr（分布式应用程序运行时）。最后，我们将更新Dapr配置以展示Dapr在与云原生组件集成时提供的灵活性。 使用Dapr，我们可以在不影响应用程序本身的情况..."},"headers":[{"level":2,"title":"3. 创建示例应用程序","slug":"_3-创建示例应用程序","link":"#_3-创建示例应用程序","children":[{"level":3,"title":"3.1. 问候服务","slug":"_3-1-问候服务","link":"#_3-1-问候服务","children":[]},{"level":3,"title":"3.2. Spring Cloud Gateway","slug":"_3-2-spring-cloud-gateway","link":"#_3-2-spring-cloud-gateway","children":[]}]},{"level":2,"title":"4. 添加Dapr","slug":"_4-添加dapr","link":"#_4-添加dapr","children":[{"level":3,"title":"4.1. 部署Dapr边车","slug":"_4-1-部署dapr边车","link":"#_4-1-部署dapr边车","children":[]},{"level":3,"title":"4.2. 更新网关配置","slug":"_4-2-更新网关配置","link":"#_4-2-更新网关配置","children":[]}]},{"level":2,"title":"5. 更新Dapr配置","slug":"_5-更新dapr配置","link":"#_5-更新dapr配置","children":[{"level":3,"title":"5.1. 使用Consul进行服务发现","slug":"_5-1-使用consul进行服务发现","link":"#_5-1-使用consul进行服务发现","children":[]},{"level":3,"title":"5.2. 使用Zipkin进行追踪","slug":"_5-2-使用zipkin进行追踪","link":"#_5-2-使用zipkin进行追踪","children":[]},{"level":3,"title":"5.3. 其他组件","slug":"_5-3-其他组件","link":"#_5-3-其他组件","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1722051348000,"updatedTime":1722051348000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.75,"words":2026},"filePathRelative":"posts/baeldung/2024-07-27/2024-07-27-An Intro to Dapr with Spring Cloud Gateway.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本文中，我们将从Spring Cloud Gateway应用程序和Spring Boot应用程序开始。然后，我们将更新它以使用Dapr（分布式应用程序运行时）。最后，我们将更新Dapr配置以展示Dapr在与云原生组件集成时提供的<strong>灵活性</strong>。</p>\\n<p>使用Dapr，我们可以在不影响应用程序本身的情况下管理云原生应用程序的部署。Dapr使用<strong>边车模式</strong>来卸载应用程序的部署问题，这允许我们将应用程序部署到其他环境（例如本地、不同的专有云平台、Kubernetes等）<strong>而无需对应用程序本身进行任何更改</strong>。有关更多详细信息，请查看Dapr网站上的概述。</p>","autoDesc":true}');export{u as comp,g as data};
