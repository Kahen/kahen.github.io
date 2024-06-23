import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CdTnsido.js";const e={},p=t(`<h1 id="grpc请求的重试策略配置-baeldung" tabindex="-1"><a class="header-anchor" href="#grpc请求的重试策略配置-baeldung"><span>gRPC请求的重试策略配置 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将讨论在gRPC中实现重试策略的各种方式，gRPC是由Google开发的远程过程调用框架。gRPC可以在多种编程语言中互操作，但我们将专注于Java实现。</p><h2 id="_2-重试的重要性" tabindex="-1"><a class="header-anchor" href="#_2-重试的重要性"><span>2. 重试的重要性</span></a></h2><p>应用程序越来越多地依赖于分布式架构。这种方法有助于通过水平扩展来处理重负载。它还促进了高可用性。然而，它也引入了更多的潜在故障点。因此，在开发具有多个微服务的应用程序时，容错能力至关重要。</p><p><strong>RPC可能会因各种原因暂时或短暂地失败：</strong></p><ul><li><strong>网络延迟或网络中的连接中断</strong></li><li><strong>服务器由于内部错误而不响应</strong></li><li><strong>系统资源繁忙</strong></li><li><strong>下游服务忙碌或不可用</strong></li><li><strong>其他相关问题</strong></li></ul><p>重试是一种故障处理机制。重试策略可以帮助根据某些条件自动重新尝试失败的请求。它还可以定义客户端可以重试多长时间或多频繁。这种简单的模式可以帮助处理暂时性故障并提高可靠性。</p><h2 id="_3-rpc失败阶段" tabindex="-1"><a class="header-anchor" href="#_3-rpc失败阶段"><span>3. RPC失败阶段</span></a></h2><p>让我们首先了解远程过程调用(RPC)可能在哪些地方失败：</p><p>客户端应用程序发起请求，gRPC客户端库将其发送到服务器。一旦收到，gRPC服务器库将请求转发到服务器应用程序逻辑。</p><p><strong>RPC可以在不同阶段失败：</strong></p><ol><li><strong>在离开客户端之前</strong></li><li><strong>在服务器中但在到达服务器应用程序逻辑之前</strong></li><li><strong>在服务器应用程序逻辑中</strong></li></ol><h2 id="_4-grpc中的重试支持" tabindex="-1"><a class="header-anchor" href="#_4-grpc中的重试支持"><span>4. gRPC中的重试支持</span></a></h2><p>由于重试是一种重要的恢复机制，gRPC在特殊情况下会自动重试失败的请求，并允许开发人员为更大的控制定义重试策略。</p><h3 id="_4-1-透明重试" tabindex="-1"><a class="header-anchor" href="#_4-1-透明重试"><span>4.1. 透明重试</span></a></h3><p>我们必须理解，只有在请求没有到达应用程序服务器逻辑的情况下，gRPC才能安全地重新尝试失败的请求。除此之外，gRPC不能保证事务的幂等性。让我们看看整体的透明重试路径：</p><p>**如前所述，内部重试可以在离开客户端之前或在服务器中但在到达服务器应用程序逻辑之前安全地发生。**这种重试策略被称为透明重试。一旦服务器应用程序成功处理请求，它就会返回响应并不再尝试重试。</p><p>当RPC到达gRPC服务器库时，gRPC可以执行单个重试，因为多次重试可能会给网络增加负载。然而，当RPC无法离开客户端时，它可能会无限次地重试。</p><h3 id="_4-2-重试策略" tabindex="-1"><a class="header-anchor" href="#_4-2-重试策略"><span>4.2. 重试策略</span></a></h3><p>为了给开发人员更多的控制权，gRPC支持在个别服务或方法级别为他们的应用配置适当的重试策略。一旦请求越过第二阶段，它就属于可配置的重试策略的范围。服务所有者或发布者可以通过服务配置的帮助来配置他们的RPC的重试策略，这是一个JSON文件。</p><p><strong>服务所有者通常使用名称解析服务（如DNS）将服务配置分发给gRPC客户端。然而，在名称解析不提供服务配置的情况下，服务消费者或开发人员可以以编程方式进行配置。</strong></p><p>gRPC支持多个重试参数：</p><table><thead><tr><th>配置名称</th><th>描述</th></tr></thead><tbody><tr><td>maxAttempts</td><td>- 包括原始请求在内的RPC尝试的最大次数<code>&lt;br&gt;</code>- 默认最大值是5</td></tr><tr><td>initialBackoff</td><td>- 重试尝试之间的初始后退延迟</td></tr><tr><td>maxBackoff</td><td>- 它对指数后退增长设置了上限<code>&lt;br&gt;</code>- 它是强制性的，必须大于零</td></tr><tr><td>backoffMultiplier</td><td>- 每次重试尝试后，后退将乘以这个值，并在乘数大于1时指数增长<code>&lt;br&gt;</code>- 它是强制性的，必须大于零</td></tr><tr><td>retryableStatusCodes</td><td>- 失败的gRPC调用如果匹配状态将自动重试<code>&lt;br&gt;</code>- 服务所有者在设计可以重试的方法时应该小心。方法应该是幂等的，或者只有在RPC没有在服务器上进行任何更改的错误状态代码时才允许重试</td></tr></tbody></table><p>值得注意的是，gRPC客户端使用_initialBackoff_、_maxBackoff_和_backoffMultiplier_参数来随机化重试请求之前的延迟。</p><p>有时，服务器可能会在响应元数据中发送不重试或在某些延迟后尝试请求的指令。这被称为服务器推回。</p><p>现在我们已经讨论了gRPC的透明和基于策略的重试特性，让我们总结一下gRPC如何总体上管理重试：</p><h2 id="_5-以编程方式应用重试策略" tabindex="-1"><a class="header-anchor" href="#_5-以编程方式应用重试策略"><span>5. 以编程方式应用重试策略</span></a></h2><p>假设我们有一个服务，可以通过调用底层通知服务向公民广播消息，该服务向手机发送短信。政府使用此服务在紧急情况下发布公告。使用此服务的客户端应用程序必须具有重试策略，以减轻由于暂时性故障导致的错误。</p><p>让我们进一步探讨这个问题。</p><h3 id="_5-1-高层设计" tabindex="-1"><a class="header-anchor" href="#_5-1-高层设计"><span>5.1. 高层设计</span></a></h3><p>首先，让我们看看__broadcast.proto__文件中的接口定义：</p><div class="language-protobuf line-numbers-mode" data-ext="protobuf" data-title="protobuf"><pre class="language-protobuf"><code><span class="token keyword">syntax</span> <span class="token operator">=</span> <span class="token string">&quot;proto3&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">option</span> java_multiple_files <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">option</span> java_package <span class="token operator">=</span> <span class="token string">&quot;com.baeldung.grpc.retry&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">package</span> retryexample<span class="token punctuation">;</span>

<span class="token keyword">message</span> <span class="token class-name">NotificationRequest</span> <span class="token punctuation">{</span>
  <span class="token builtin">string</span> message <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token builtin">string</span> type <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token builtin">int32</span> messageID <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">message</span> <span class="token class-name">NotificationResponse</span> <span class="token punctuation">{</span>
  <span class="token builtin">string</span> response <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">service</span> <span class="token class-name">NotificationService</span> <span class="token punctuation">{</span>
  <span class="token keyword">rpc</span> <span class="token function">notify</span><span class="token punctuation">(</span><span class="token class-name">NotificationRequest</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token class-name">NotificationResponse</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>_<em>broadcast.proto__文件定义了_NotificationService</em>，它有一个远程方法_notify()_和两个DTOs <em>NotificationRequest_和_NotificationResponse</em>。</strong></p><p>总的来说，让我们看看gRPC应用程序的客户端和服务器端使用的类：</p><p>稍后，我们可以使用__broadcast.proto__文件生成支持Java源代码，以实现_NotificationService_。Maven插件生成了类_NotificationRequest_、<em>NotificationResponse_和_NotificationServiceGrpc</em>。</p><p>服务器端的_GrpcBroadcastingServer_类使用_ServerBuilder_类来注册_NotificationServiceImpl_以广播消息。<strong>客户端类_GrpcBroadcastingClient_使用gRPC库的_ManagedChannel_类来管理执行RPC的通道。</strong></p><p>服务配置文件_retry-service-config.json_概述了重试策略：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
     <span class="token property">&quot;methodConfig&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
         <span class="token punctuation">{</span>
             <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                 <span class="token punctuation">{</span>
                      <span class="token property">&quot;service&quot;</span><span class="token operator">:</span> <span class="token string">&quot;retryexample.NotificationService&quot;</span><span class="token punctuation">,</span>
                      <span class="token property">&quot;method&quot;</span><span class="token operator">:</span> <span class="token string">&quot;notify&quot;</span>
                 <span class="token punctuation">}</span>
             <span class="token punctuation">]</span><span class="token punctuation">,</span>
             <span class="token property">&quot;retryPolicy&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                 <span class="token property">&quot;maxAttempts&quot;</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
                 <span class="token property">&quot;initialBackoff&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0.5s&quot;</span><span class="token punctuation">,</span>
                 <span class="token property">&quot;maxBackoff&quot;</span><span class="token operator">:</span> <span class="token string">&quot;30s&quot;</span><span class="token punctuation">,</span>
                 <span class="token property">&quot;backoffMultiplier&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
                 <span class="token property">&quot;retryableStatusCodes&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                     <span class="token string">&quot;UNAVAILABLE&quot;</span>
                 <span class="token punctuation">]</span>
             <span class="token punctuation">}</span>
         <span class="token punctuation">}</span>
     <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之前，我们了解了_maxAttempts_、指数退避参数和_retryableStatusCodes_等重试策略。当客户端在_NotificationService_中调用远程过程_notify()_时，如之前在__broadcast.proto__文件中定义的那样，gRPC框架将执行重试设置。</p><h3 id="_5-2-实现重试策略" tabindex="-1"><a class="header-anchor" href="#_5-2-实现重试策略"><span>5.2. 实现重试策略</span></a></h3><p>让我们看看_GrpcBroadcastingClient_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GrpcBroadcastingClient</span> <span class="token punctuation">{</span>
    <span class="token keyword">protected</span> <span class="token keyword">static</span> <span class="token class-name">Map</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">getServiceConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Gson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fromJson</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">JsonReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span><span class="token class-name">GrpcBroadcastingClient</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span><span class="token string">&quot;retry-service-config.json&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Map</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">NotificationResponse</span> <span class="token function">broadcastMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ManagedChannel</span> channel <span class="token operator">=</span> <span class="token class-name">ManagedChannelBuilder</span><span class="token punctuation">.</span><span class="token function">forAddress</span><span class="token punctuation">(</span><span class="token string">&quot;localhost&quot;</span><span class="token punctuation">,</span> <span class="token number">8080</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">usePlaintext</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">disableServiceConfigLookUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">defaultServiceConfig</span><span class="token punctuation">(</span><span class="token function">getServiceConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">enableRetry</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">sendNotification</span><span class="token punctuation">(</span>channel<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">NotificationResponse</span> <span class="token function">sendNotification</span><span class="token punctuation">(</span><span class="token class-name">ManagedChannel</span> channel<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">NotificationServiceGrpc<span class="token punctuation">.</span>NotificationServiceBlockingStub</span> notificationServiceStub <span class="token operator">=</span> <span class="token class-name">NotificationServiceGrpc</span>
          <span class="token punctuation">.</span><span class="token function">newBlockingStub</span><span class="token punctuation">(</span>channel<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">NotificationResponse</span> response <span class="token operator">=</span> notificationServiceStub<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token class-name">NotificationRequest</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">setType</span><span class="token punctuation">(</span><span class="token string">&quot;Warning&quot;</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">setMessage</span><span class="token punctuation">(</span><span class="token string">&quot;Heavy rains expected&quot;</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">setMessageID</span><span class="token punctuation">(</span><span class="token function">generateMessageID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        channel<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> response<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_broadcast()<em>方法构建了带有必要配置的_ManagedChannel_对象。然后，我们将其传递给_sendNotification()</em>，该方法进一步调用了存根上的_notify()_方法。</p><p><strong>在设置包括重试策略的服务配置方面，_ManagedChannelBuilder_类中的方法起着至关重要的作用：</strong></p><ul><li><strong><em>disableServiceConfigLookup()</em>: 明确禁用通过名称解析的服务配置查找</strong></li><li><strong><em>enableRetry()</em>: 启用每个方法的重试配置</strong></li><li><strong><em>defaultServiceConfig()</em>: 明确设置服务配置</strong></li></ul><p>_getServiceConfig()_方法从_retry-service-config.json_文件中读取服务配置，并返回其内容的_Map_表示。随后，这个_Map_被传递到_ManagedChannelBuilder_类的_defaultServiceConfig()_方法中。</p><p>最后，在创建了_ManagedChannel_对象之后，我们调用_notificationServiceStub_对象的_notify()<em>方法，该对象的类型是_NotificationServiceGrpc.NotificationServiceBlockingStub</em>，以广播消息。该策略也适用于非阻塞存根。</p><p><strong>建议使用专用类来创建_ManagedChannel_对象。这允许集中管理，包括配置重试策略。</strong></p><p>为了演示重试功能，服务器中的_NotificationServiceImpl_类被设计为随机不可用。让我们看看_GrpcBroadcastingClient_的实际运行情况：</p><p><code>java</code>java @Test void whenMessageBroadcasting_thenSuccessOrThrowsStatusRuntimeException() { try { NotificationResponse notificationResponse = GrpcBroadcastingClient.sendNotification(managedChannel); assertEquals(&quot;Message received: Warning - Heavy rains expected&quot;, notificationResponse.getResponse()); } catch (Exception ex) { assertTrue(ex instanceof StatusRuntimeException); } }</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>
**该方法调用_GrpcBroadcastingClient_类的_sendNotification()_来调用服务器端远程过程以广播消息。我们可以通过检查日志来验证重试：**

## 结论

在本文中，我们探讨了gRPC库中的重试策略功能。通过JSON文件声明性地设置策略的能力是一个强大的特性。然而，我们应该仅在测试场景中使用它，或者在名称解析期间服务配置不可用时使用。

**重试失败的请求可能导致不可预测的结果，因此我们应该小心仅将其设置为幂等事务。**

像往常一样，本文中使用的所有代码都可以在GitHub上找到。

文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系方式。

OK</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,52),o=[p];function i(c,l){return a(),s("div",null,o)}const d=n(e,[["render",i],["__file","Configuring Retry Policy for gRPC Request.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/Configuring%20Retry%20Policy%20for%20gRPC%20Request.html","title":"gRPC请求的重试策略配置 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-15T00:00:00.000Z","category":["gRPC","Java"],"tag":["重试策略","微服务"],"description":"gRPC请求的重试策略配置 | Baeldung 1. 概述 在本教程中，我们将讨论在gRPC中实现重试策略的各种方式，gRPC是由Google开发的远程过程调用框架。gRPC可以在多种编程语言中互操作，但我们将专注于Java实现。 2. 重试的重要性 应用程序越来越多地依赖于分布式架构。这种方法有助于通过水平扩展来处理重负载。它还促进了高可用性。然而...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Configuring%20Retry%20Policy%20for%20gRPC%20Request.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"gRPC请求的重试策略配置 | Baeldung"}],["meta",{"property":"og:description","content":"gRPC请求的重试策略配置 | Baeldung 1. 概述 在本教程中，我们将讨论在gRPC中实现重试策略的各种方式，gRPC是由Google开发的远程过程调用框架。gRPC可以在多种编程语言中互操作，但我们将专注于Java实现。 2. 重试的重要性 应用程序越来越多地依赖于分布式架构。这种方法有助于通过水平扩展来处理重负载。它还促进了高可用性。然而..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"重试策略"}],["meta",{"property":"article:tag","content":"微服务"}],["meta",{"property":"article:published_time","content":"2024-06-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"gRPC请求的重试策略配置 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-15T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 重试的重要性","slug":"_2-重试的重要性","link":"#_2-重试的重要性","children":[]},{"level":2,"title":"3. RPC失败阶段","slug":"_3-rpc失败阶段","link":"#_3-rpc失败阶段","children":[]},{"level":2,"title":"4. gRPC中的重试支持","slug":"_4-grpc中的重试支持","link":"#_4-grpc中的重试支持","children":[{"level":3,"title":"4.1. 透明重试","slug":"_4-1-透明重试","link":"#_4-1-透明重试","children":[]},{"level":3,"title":"4.2. 重试策略","slug":"_4-2-重试策略","link":"#_4-2-重试策略","children":[]}]},{"level":2,"title":"5. 以编程方式应用重试策略","slug":"_5-以编程方式应用重试策略","link":"#_5-以编程方式应用重试策略","children":[{"level":3,"title":"5.1. 高层设计","slug":"_5-1-高层设计","link":"#_5-1-高层设计","children":[]},{"level":3,"title":"5.2. 实现重试策略","slug":"_5-2-实现重试策略","link":"#_5-2-实现重试策略","children":[]}]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":7.4,"words":2219},"filePathRelative":"posts/baeldung/Archive/Configuring Retry Policy for gRPC Request.md","localizedDate":"2024年6月15日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将讨论在gRPC中实现重试策略的各种方式，gRPC是由Google开发的远程过程调用框架。gRPC可以在多种编程语言中互操作，但我们将专注于Java实现。</p>\\n<h2>2. 重试的重要性</h2>\\n<p>应用程序越来越多地依赖于分布式架构。这种方法有助于通过水平扩展来处理重负载。它还促进了高可用性。然而，它也引入了更多的潜在故障点。因此，在开发具有多个微服务的应用程序时，容错能力至关重要。</p>\\n<p><strong>RPC可能会因各种原因暂时或短暂地失败：</strong></p>\\n<ul>\\n<li><strong>网络延迟或网络中的连接中断</strong></li>\\n<li><strong>服务器由于内部错误而不响应</strong></li>\\n<li><strong>系统资源繁忙</strong></li>\\n<li><strong>下游服务忙碌或不可用</strong></li>\\n<li><strong>其他相关问题</strong></li>\\n</ul>","autoDesc":true}');export{d as comp,k as data};
