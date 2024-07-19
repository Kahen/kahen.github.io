import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as n,a}from"./app-Brt7rjfU.js";const r={},s=a(`<h1 id="使用haproxy作为api网关进行路由和限流" tabindex="-1"><a class="header-anchor" href="#使用haproxy作为api网关进行路由和限流"><span>使用HAProxy作为API网关进行路由和限流</span></a></h1><p>在这个教程中，我们将学习如何使用HAProxy作为API网关进行路由和限流。</p><p>API网关是一个位于客户端和众多后端服务之间的应用程序。它像一个反向代理那样运作。它可以将API调用路由到相应的服务。此外，它还能够承担许多责任，例如保护服务、限制API调用的频率、监控流量，有时还进行负载均衡。</p><p>HAProxy是一个开源的软件负载均衡器和应用交付控制器。它非常高效，在行业中广泛使用。</p><p>在接下来的部分中，我们将配置HAProxy，使其作为API网关运作。</p><h3 id="_3-1-基本配置" tabindex="-1"><a class="header-anchor" href="#_3-1-基本配置"><span>3.1. 基本配置</span></a></h3><p>HAProxy的基本配置是作为一个负载均衡器。我们将为示例定义_frontend_和_backend_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>frontend haproxy_as_api_gateway
    bind 127.0.0.1:80
    default_backend load_balancing
backend load_balancer
    server server1 127.0.0.1:8080
    server server2 127.0.0.1:8081
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们有两个服务器将用于负载均衡。客户端应用程序将在_127.0.0.1:80_解析请求。从那里，HAProxy帮助路由到我们定义的后端_load_balancer_。这个后端位于两个服务器之上，分别解析为_127.0.0.1:8080_和_127.0.0.1:8081_。</p><p>我们将添加更多的配置，使其根据用例作为API网关运作。</p><h3 id="_3-2-按路径隔离请求" tabindex="-1"><a class="header-anchor" href="#_3-2-按路径隔离请求"><span>3.2. 按路径隔离请求</span></a></h3><p>API网关的一个主要功能是根据微服务架构中的相应服务路由HTTP API调用。</p><p>假设我们为在线商店的客户端应用程序提供了两个端点。一个在端点_127.0.0.1:80/order_接收订单。另一个在端点_127.0.0.1:80/invoicing_管理发票。</p><p>对于这两个端点，我们部署了两个独立的微服务。订单服务解析为_127.0.0.1:8080_，发票服务解析为_127.0.0.1:8081_。</p><p>这是配置：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>frontend haproxy_as_api_gateway
    bind 127.0.0.1:80
    acl PATH_order path_beg -i /order
    acl PATH_invoicing path_beg -i /invoicing
    use_backend order_service if PATH_order
    use_backend invoicing_service if PATH_invoicing
backend order_service
    server server1 127.0.0.1:8080
backend invoicing_service
    server server1 127.0.0.1:8081
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个配置中，路径_/order_将始终解析到后端_order_service_。类似地，路径_/invoicing_将始终解析到后端_invoicing_service_。</p><p>如果订单服务的一个服务器无法管理负载，我们可以添加另一个解析为_127.0.0.1:8090_的服务器，并利用HAProxy的负载均衡特性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>frontend haproxy_as_api_gateway
    bind 127.0.0.1:80
    acl PATH_order path_beg -i /order
    acl PATH_invoicing path_beg -i /invoicing
    use_backend order_service if PATH_order
    use_backend invoicing_service if PATH_invoicing
backend order_service
    server server1 127.0.0.1:8080
    server server2 127.0.0.1:8090
backend invoicing_service
    server server1 127.0.0.1:8081
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这种方式，我们不仅将订单服务路由到不同的位置，还进行了负载均衡。</p><h3 id="_3-3-按域名隔离请求" tabindex="-1"><a class="header-anchor" href="#_3-3-按域名隔离请求"><span>3.3. 按域名隔离请求</span></a></h3><p>对于简单场景，上述配置工作得很好。然而，在现实世界中，我们会遇到复杂场景。<strong>其中一个场景是为不同域名隔离API路径</strong>。</p><p>继续以在线商店为例。订单API由消费者使用，而发票由运营团队使用。<strong>我们为消费者网站和运营团队门户有两个不同的域名</strong>。每个域名将有其各自的API路径。</p><p>如果消费者尝试从网站访问发票，这样的请求不应该被解析。类似地，来自运营团队门户的订单请求也不应该被解析。</p><p>这是我们如何实现上述场景的方式：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>frontend haproxy_as_api_gateway
    bind :80
    acl consumerapi_host req.hdr(Host) -i -m dom 127.0.0.1
    acl operationapi_host req.hdr(Host) -i -m dom 127.0.0.2
    acl PATH_order path_beg -i /order
    acl PATH_invoicing path_beg -i /invoicing
    use_backend order_service if consumerapi_host PATH_order
    use_backend invoicing_service if operationapi_host PATH_invoicing
backend order_service
    server server1 127.0.0.1:8080
    server server2 127.0.0.1:8090
backend invoicing_service
    server server1 127.0.0.1:8081
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这个配置，我们为两个域名_127.0.0.1_和_127.0.0.2_分别定义了两个变量_consumerapi_host_和_operationapi_host_。</p><p>HAProxy将仅在请求来自_consumerapi_host_带有路径_order_时，将请求路由到_order_service_后端，即_127.0.0.1:80/order_。类似地，它将仅在请求来自_operationapi_host_带有路径_invoicing_时，将请求路由到_invoicing_service_后端，即_127.0.0.2:80/invoicing_。</p><h3 id="_3-4-按数据格式隔离请求" tabindex="-1"><a class="header-anchor" href="#_3-4-按数据格式隔离请求"><span>3.4. 按数据格式隔离请求</span></a></h3><p>我们可能会遇到需要根据请求的内容类型来隔离订单服务的场景。例如，某个客户端可能以_XML_格式发送数据，而另一个以_JSON_格式。</p><p>这是我们如何满足上述需求的方式：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>frontend haproxy_as_api_gateway
    bind :80
    acl consumerapi_host req.hdr(Host) -i -m dom 127.0.0.1
    acl operationapi_host req.hdr(Host) -i -m dom 127.0.0.2
    acl api_json req.hdr(Content-Type) -i -m dom application/json
    acl api_xml req.hdr(Content-Type) -i -m dom application/xml
    acl PATH_order path_beg -i /order
    acl PATH_invoicing path_beg -i /invoicing
    use_backend order_service_json if consumerapi_host api_json PATH_order
    use_backend order_service_xml if consumerapi_host api_xml PATH_order
    use_backend invoicing_service if operationapi_host PATH_invoicing
backend order_service_json
    server server1 127.0.0.1:8080
backend order_service_xml
    server server2 127.0.0.1:8090
backend invoicing_service
    server server1 127.0.0.1:8081
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们现在为订单服务定义了两个不同的后端。_127.0.0.1:8080_将处理所有的_JSON_请求。_127.0.0.1:8090_将处理所有的_XML_请求。</p><p>我们使用请求头定义了两个变量_api_json_和_api_xml_，并且只有在请求来自消费者域名并且路径中有订单时，才添加它们的使用。</p><h2 id="_4-限流" tabindex="-1"><a class="header-anchor" href="#_4-限流"><span>4. 限流</span></a></h2><p>限流限制了客户端的请求数量。在我们的例子中，我们可能想要限制订单的数量。例如，我们设定在10秒内限制100个订单。<strong>超过这个限制，我们可能会认为有一些恶意活动正在进行。或者我们可能需要增加额外的服务器来管理负载。</strong></p><p>首先，我们将创建一个_file path_param_rates.map_。我们将添加路径及其相应的限制：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>/order 100
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在HAProxy中，粘性表用于跟踪和保存不同的参数。<strong>粘性表是HAProxy中的快速内存存储</strong>。它们以键/值对的形式存储与客户端会话相关的数据。</p><p>在这种情况下，我们将跟踪订单请求被放置的次数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>frontend haproxy_as_api_gateway
    bind :80
    stick-table type string size 1m expire 10s store http_rate_limiting
    http-request track-sc0 base32+src
    http-request set-var(req.rate_limit) path,map_beg(path_param_rates.map,20)
    http-request set-var(req.request_rate) base32+src,table_http_rate_limiting()
    acl rate_abuse var(req.rate_limit),sub(req.request_rate) lt 0
    http-request deny deny_status 429 if rate_abuse

    acl consumerapi_host req.hdr(Host) -i -m dom 127.0.0.1
    acl operationapi_host req.hdr(Host) -i -m dom 127.0.0.2
    acl consumerapi_jsonreq.hdr(Content-Type) -i -m dom application/json
    acl consumerapi_xml req.hdr(Content-Type) -i -m dom application/xml
    acl PATH_order path_beg -i /order
    acl PATH_invoicing path_beg -i /invoicing
    use_backend order_service_json if consumerapi_host consumerapi_json PATH_order
    use_backend order_service_xml if consumerapi_host consumerapi_xml PATH_order
    use_backend invoicing_service if operationapi_host PATH_invoicing
backend order_service_json
    server server1 127.0.0.1:8080
backend order_service_xml
    server server2 127.0.0.1:8090
backend invoicing_service
    server server1 127.0.0.1:8081
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们创建了一个粘性表_http_rate_limiting_。它每10秒清除一次数据。</p><p><strong>通过这个配置，如果订单请求在10秒内超过100次，客户端将收到一个状态码为429的错误。</strong></p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇文章中，我们使用了HAProxy作为API网关。我们研究了HTTP路由和限流的情况。在这些用例中，HAProxy的配置非常简单。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>`,47),t=[s];function d(l,o){return n(),i("div",null,t)}const p=e(r,[["render",d],["__file","2024-07-14-Using HAProxy as an API Gateway for Routing and Rate Limiting.html.vue"]]),_=JSON.parse('{"path":"/posts/baeldung/2024-07-14/2024-07-14-Using%20HAProxy%20as%20an%20API%20Gateway%20for%20Routing%20and%20Rate%20Limiting.html","title":"使用HAProxy作为API网关进行路由和限流","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["DevOps"],"tag":["HAProxy","API Gateway"],"head":[["meta",{"name":"keywords","content":"HAProxy, API Gateway, 路由, 限流"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-14/2024-07-14-Using%20HAProxy%20as%20an%20API%20Gateway%20for%20Routing%20and%20Rate%20Limiting.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用HAProxy作为API网关进行路由和限流"}],["meta",{"property":"og:description","content":"使用HAProxy作为API网关进行路由和限流 在这个教程中，我们将学习如何使用HAProxy作为API网关进行路由和限流。 API网关是一个位于客户端和众多后端服务之间的应用程序。它像一个反向代理那样运作。它可以将API调用路由到相应的服务。此外，它还能够承担许多责任，例如保护服务、限制API调用的频率、监控流量，有时还进行负载均衡。 HAProxy..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-14T02:04:55.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"HAProxy"}],["meta",{"property":"article:tag","content":"API Gateway"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-14T02:04:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用HAProxy作为API网关进行路由和限流\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-14T02:04:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用HAProxy作为API网关进行路由和限流 在这个教程中，我们将学习如何使用HAProxy作为API网关进行路由和限流。 API网关是一个位于客户端和众多后端服务之间的应用程序。它像一个反向代理那样运作。它可以将API调用路由到相应的服务。此外，它还能够承担许多责任，例如保护服务、限制API调用的频率、监控流量，有时还进行负载均衡。 HAProxy..."},"headers":[{"level":3,"title":"3.1. 基本配置","slug":"_3-1-基本配置","link":"#_3-1-基本配置","children":[]},{"level":3,"title":"3.2. 按路径隔离请求","slug":"_3-2-按路径隔离请求","link":"#_3-2-按路径隔离请求","children":[]},{"level":3,"title":"3.3. 按域名隔离请求","slug":"_3-3-按域名隔离请求","link":"#_3-3-按域名隔离请求","children":[]},{"level":3,"title":"3.4. 按数据格式隔离请求","slug":"_3-4-按数据格式隔离请求","link":"#_3-4-按数据格式隔离请求","children":[]},{"level":2,"title":"4. 限流","slug":"_4-限流","link":"#_4-限流","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720922695000,"updatedTime":1720922695000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.73,"words":1719},"filePathRelative":"posts/baeldung/2024-07-14/2024-07-14-Using HAProxy as an API Gateway for Routing and Rate Limiting.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这个教程中，我们将学习如何使用HAProxy作为API网关进行路由和限流。</p>\\n<p>API网关是一个位于客户端和众多后端服务之间的应用程序。它像一个反向代理那样运作。它可以将API调用路由到相应的服务。此外，它还能够承担许多责任，例如保护服务、限制API调用的频率、监控流量，有时还进行负载均衡。</p>\\n<p>HAProxy是一个开源的软件负载均衡器和应用交付控制器。它非常高效，在行业中广泛使用。</p>\\n<p>在接下来的部分中，我们将配置HAProxy，使其作为API网关运作。</p>\\n<h3>3.1. 基本配置</h3>\\n<p>HAProxy的基本配置是作为一个负载均衡器。我们将为示例定义_frontend_和_backend_：</p>","autoDesc":true}');export{p as comp,_ as data};
