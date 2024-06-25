import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CSWuVURq.js";const e={},p=t(`<h1 id="grpc-在-java-中使用应用层传输安全-alts-进行认证" tabindex="-1"><a class="header-anchor" href="#grpc-在-java-中使用应用层传输安全-alts-进行认证"><span>gRPC 在 Java 中使用应用层传输安全（ALTS）进行认证</span></a></h1><p>在本教程中，我们将探讨 ALTS（应用层传输安全）在 gRPC 应用程序中的作用。众所周知，在分布式架构中确保认证和数据安全是困难但至关重要的。</p><p>ALTS 是 Google 专为其云基础设施定制构建的内置双向认证和传输加密解决方案。ALTS 简化了 gRPC 服务之间的认证和数据加密，并且可以通过最小的代码更改启用。因此，它在开发者中很受欢迎，因为他们可以更多地专注于编写业务逻辑。</p><p>ALTS 与 TLS 类似，但具有针对 Google 基础设施优化的不同信任模型。让我们快速看一下它们之间的主要区别：</p><table><thead><tr><th>特性</th><th>ALTS</th><th>TLS</th></tr></thead><tbody><tr><td>信任模型</td><td>基于身份，依赖于 GCP IAM 服务账户</td><td>基于证书，需要证书管理，包括续订和撤销</td></tr><tr><td>设计</td><td>更简单</td><td>更复杂</td></tr><tr><td>使用上下文</td><td>用于保护在 Google 数据中心运行的 gRPC 服务</td><td>用于保护 Web 浏览（HTTPS）、电子邮件、即时消息、VoIP 等</td></tr><tr><td>消息序列化</td><td>使用 Protocol Buffers</td><td>使用用 ASN.1 编码的 X.509 证书</td></tr><tr><td>性能</td><td>为通用用途设计</td><td>针对 Google 数据中心中的低延迟、高吞吐量通信进行优化</td></tr></tbody></table><p>ALTS 功能默认在 Google Cloud Platform (GCP) 上启用。它使用 GCP 服务账户来保护 gRPC 服务之间的 RPC 调用。具体来说，它在 Google 的基础设施内运行于 Google Compute Engine 或 Kubernetes Engine (GKE)。</p><p>让我们假设医院有一个手术室（OT）预订系统，由前端和后端服务组成：</p><p>手术室预订系统由在 Google Cloud Platform (GCP) 上运行的两个服务组成。前端服务向后端服务发起远程过程调用。我们将使用 gRPC 框架开发服务。考虑到数据的敏感性，我们将利用 GCP 中内置的 ALTS 功能来启用传输数据的认证和加密。</p><p>首先，让我们定义 protobuf <em>ot_booking.proto</em> 文件：</p><div class="language-protobuf line-numbers-mode" data-ext="protobuf" data-title="protobuf"><pre class="language-protobuf"><code><span class="token keyword">syntax</span> <span class="token operator">=</span> <span class="token string">&quot;proto3&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">package</span> otbooking<span class="token punctuation">;</span>

<span class="token keyword">option</span> java_multiple_files <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">option</span> java_package <span class="token operator">=</span> <span class="token string">&quot;com.baeldung.grpc.alts.otbooking&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">service</span> <span class="token class-name">OtBookingService</span> <span class="token punctuation">{</span>
  <span class="token keyword">rpc</span> <span class="token function">getBookingInfo</span><span class="token punctuation">(</span><span class="token class-name">BookingRequest</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token class-name">BookingResponse</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">message</span> <span class="token class-name">BookingRequest</span> <span class="token punctuation">{</span>
  <span class="token builtin">string</span> patientID <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token builtin">string</span> doctorID <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token builtin">string</span> description <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">message</span> <span class="token class-name">BookingResponse</span> <span class="token punctuation">{</span>
  <span class="token builtin">string</span> bookingDate <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token builtin">string</span> condition <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基本上，我们在 protobuf 文件中声明了一个服务 <em>OtBookingService</em> 和 RPC <em>getBookingInfo()</em>，以及两个 DTOs <em>BookingRequest</em> 和 <em>BookingResponse</em>。</p><p>接下来，让我们看看这个应用的重要类：</p><p>Maven 插件编译 protobuf 文件并自动生成一些类，如 <em>OtBookingServiceGrpc</em>、<em>OtBookingServiceImplBase</em>、<em>BookingRequest</em> 和 <em>BookingResponse</em>。<strong>我们将使用 gRPC 库类 <em>AltsChannelBuilder</em> 来启用 ALTS 以在客户端创建 <em>ManagedChannel</em> 对象</strong>。最后，我们将使用 <em>OtBookingServiceGrpc</em> 生成 <em>OtBookingServiceBlockingStub</em> 以调用在服务器端运行的 RPC <em>getBookingInfo()</em> 方法。</p><p><strong>与 <em>AltsChannelBuilder</em> 类似，</strong> <strong><em>AltsServerBuilder</em> 类帮助在服务器端启用 ALTS。我们注册拦截器 <em>ClientAuthInterceptor</em> 以帮助认证客户端</strong>。最后，我们将 <em>OtBookingService</em> 注册到 <em>io.grpc.Server</em> 对象，然后启动服务。</p><p>此外，我们将在下一节中讨论实现。</p><h3 id="_4-1-先决条件" tabindex="-1"><a class="header-anchor" href="#_4-1-先决条件"><span>4.1. 先决条件</span></a></h3><p>由于 ALTS 是 GCP 的内置功能，我们将不得不为运行示例应用程序提供一些云资源。</p><p>首先，我们将创建两个 IAM 服务账户，分别与前端和后端服务器关联：</p><p>然后，我们将创建两个虚拟机，分别托管前端和后端服务：</p><p>虚拟机 <em>prod-booking-client-vm</em> 与 <em>prod-ot-booking-client-svc</em> 服务账户关联。同样，<em>prod-booking-service-vm</em> 与 <em>prod-ot-booking-svc</em> 服务账户关联。服务账户作为服务器的身份，ALTS 用它们进行授权和加密。</p><h3 id="_4-2-实现" tabindex="-1"><a class="header-anchor" href="#_4-2-实现"><span>4.2. 实现</span></a></h3><p>让我们首先进入 <em>pom.xml</em> 文件，解决 Maven 依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>io.grpc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>grpc-alts<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.63.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们将实现后端，从 <em>AltsBookingServer</em> 类开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AltsOtBookingServer</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">CLIENT_SERVICE_ACCOUNT</span> <span class="token operator">=</span> args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token class-name">Server</span> server <span class="token operator">=</span> <span class="token class-name">AltsServerBuilder</span><span class="token punctuation">.</span><span class="token function">forPort</span><span class="token punctuation">(</span><span class="token number">8080</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">intercept</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ClientAuthInterceptor</span><span class="token punctuation">(</span><span class="token constant">CLIENT_SERVICE_ACCOUNT</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">addService</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">OtBookingService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        server<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        server<span class="token punctuation">.</span><span class="token function">awaitTermination</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>gRPC 提供了一个特殊的类 <em>AltsServerBuilder</em> 用于以 ALTS 模式配置服务器。我们在服务器上注册了 <em>ClientAuthInterceptor</em> 来拦截所有 RPC，在它们到达 <em>OtBookingService</em> 类的端点之前。</p><p>让我们看看 <em>ClientAuthInterceptor</em> 类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ClientAuthInterceptor</span> <span class="token keyword">implements</span> <span class="token class-name">ServerInterceptor</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> clientServiceAccount <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">ClientAuthInterceptor</span><span class="token punctuation">(</span><span class="token class-name">String</span> clientServiceAccount<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>clientServiceAccount <span class="token operator">=</span> clientServiceAccount<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ReqT</span><span class="token punctuation">,</span> <span class="token class-name">RespT</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">ServerCall<span class="token punctuation">.</span>Listener</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ReqT</span><span class="token punctuation">&gt;</span></span> <span class="token function">interceptCall</span><span class="token punctuation">(</span><span class="token class-name">ServerCall</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ReqT</span><span class="token punctuation">,</span> <span class="token class-name">RespT</span><span class="token punctuation">&gt;</span></span> serverCall<span class="token punctuation">,</span> <span class="token class-name">Metadata</span> metadata<span class="token punctuation">,</span>
        <span class="token class-name">ServerCallHandler</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ReqT</span><span class="token punctuation">,</span> <span class="token class-name">RespT</span><span class="token punctuation">&gt;</span></span> serverCallHandler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Status</span> status <span class="token operator">=</span> <span class="token class-name">AuthorizationUtil</span><span class="token punctuation">.</span><span class="token function">clientAuthorizationCheck</span><span class="token punctuation">(</span>serverCall<span class="token punctuation">,</span>
            <span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>clientServiceAccount<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>status<span class="token punctuation">.</span><span class="token function">isOk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            serverCall<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>status<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Metadata</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> serverCallHandler<span class="token punctuation">.</span><span class="token function">startCall</span><span class="token punctuation">(</span>serverCall<span class="token punctuation">,</span> metadata<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所有的 RPC 都击中了 <em>ClientAuthInterceptor</em> 中的 <em>intercept()</em> 方法。然后，我们调用 gRPC 库类 <em>AuthorizationUtil</em> 的 <em>clientAuthorizationCheck()</em> 方法来授权客户端服务账户。最后，只有当授权成功时，RPC 才会继续进行。</p><p>接下来，让我们看看前端服务：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AltsOtBookingClient</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">SERVER_ADDRESS</span> <span class="token operator">=</span> args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">SERVER_ADDRESS_SERVICE_ACCOUNT</span> <span class="token operator">=</span> args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token class-name">ManagedChannel</span> managedChannel <span class="token operator">=</span> <span class="token class-name">AltsChannelBuilder</span><span class="token punctuation">.</span><span class="token function">forTarget</span><span class="token punctuation">(</span><span class="token constant">SERVER_ADDRESS</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">addTargetServiceAccount</span><span class="token punctuation">(</span><span class="token constant">SERVER_ADDRESS_SERVICE_ACCOUNT</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">OtBookingServiceGrpc<span class="token punctuation">.</span>OtBookingServiceBlockingStub</span> <span class="token class-name">OTBookingServiceStub</span> <span class="token operator">=</span> <span class="token class-name">OtBookingServiceGrpc</span>
          <span class="token punctuation">.</span><span class="token function">newBlockingStub</span><span class="token punctuation">(</span>managedChannel<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">BookingResponse</span> bookingResponse <span class="token operator">=</span> <span class="token class-name">OTBookingServiceStub</span><span class="token punctuation">.</span><span class="token function">getBookingInfo</span><span class="token punctuation">(</span><span class="token class-name">BookingRequest</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">setPatientID</span><span class="token punctuation">(</span><span class="token string">&quot;PT-1204&quot;</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">setDoctorID</span><span class="token punctuation">(</span><span class="token string">&quot;DC-3904&quot;</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        managedChannel<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与 <em>AltsServerBuilder</em> 类似，gRPC 提供了一个 <em>AltsChannelBuilder</em> 类在客户端启用 ALTS。我们可以多次调用 <em>addTargetServiceAccount()</em> 方法来添加多个潜在的目标服务账户。进一步，我们通过在存根上调用 <em>getBookingInfo()</em> 方法来启动 RPC。</p><p><strong>同一个服务账户可以与多个虚拟机关联。因此，它提供了一定程度的灵活性和敏捷性来水平扩展服务。</strong></p><h3 id="_4-3-在-google-compute-engine-上运行" tabindex="-1"><a class="header-anchor" href="#_4-3-在-google-compute-engine-上运行"><span>4.3. 在 Google Compute Engine 上运行</span></a></h3><p>让我们登录到两个服务器，然后克隆托管示例 gRPC 服务源代码的 GitHub 仓库：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/eugenp/tutorials.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>克隆后，我们将在 <em>tutorials/grpc</em> 目录中编译代码：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>mvn clean compile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>编译成功后，我们将在 <em>prod-booking-service-vm</em> 上启动后端服务：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>mvn exec:java <span class="token parameter variable">-Dexec.mainClass</span><span class="token operator">=</span><span class="token string">&quot;com.baeldung.grpc.alts.server.AltsOtBookingServer&quot;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-Dexec.arguments</span><span class="token operator">=</span><span class="token string">&quot;prod-ot-booking-client-svc@grpc-alts-demo.iam.gserviceaccount.com&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们用前端客户端的服务账户作为参数运行了 <em>AltsOtBookingServer</em> 类。</p><p>服务启动并运行后，我们将在虚拟机 <em>prod-booking-client-vm</em> 上运行的前端服务中发起 RPC：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>mvn exec:java <span class="token parameter variable">-Dexec.mainClass</span><span class="token operator">=</span><span class="token string">&quot;com.baeldung.grpc.alts.client.AltsOtBookingClient&quot;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-Dexec.arguments</span><span class="token operator">=</span><span class="token string">&quot;10.128.0.2:8080,prod-ot-booking-svc@grpc-alts-demo.iam.gserviceaccount.com&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们用两个参数运行了 <em>AltsOtBookingClient</em> 类。第一个参数是后端服务正在运行的目标服务器，第二个参数是与后端服务器关联的服务账户。</p><p>命令成功运行，服务在认证客户端后返回响应：</p><p>让我们假设我们禁用客户端服务账户：</p><p>结果，ALTS 阻止了 RPC 到达后端服务： RPC 因状态 <em>UNAVAILABLE</em> 失败。</p><p>现在，让我们禁用后端服务器的服务账户：</p><p>令人惊讶的是，RPC 通过了，但在重新启动服务器后，它像之前的场景一样失败了： <strong>看起来 ALTS 之前缓存了服务账户的状态，但在服务器重启后，RPC 因状态 <em>UNKNOWN</em> 失败</strong>。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们深入探讨了支持 ALTS 的 gRPC Java 库。通过最小的代码，可以在 gRPC 服务中启用 ALTS。它还通过使用 GCP IAM 服务账户，提供了更大的灵活性来控制 gRPC 服务的授权。</p><p><strong>但是，它只能在 GCP 基础设施中工作，因为它是开箱即用的。因此，要在 GCP 基础设施之外运行 gRPC 服务，gRPC 中的 TLS 支持至关重要，并且必须手动配置。</strong></p><p>像往常一样，这里使用到的代码可以在 GitHub 上找到。 OK</p>`,53),o=[p];function c(l,i){return a(),s("div",null,o)}const d=n(e,[["render",c],["__file","gRPC Authentication in Java Using Application Layer Transport Security (ALTS).html.vue"]]),k=JSON.parse('{"path":"/posts/articles/gRPC%20Authentication%20in%20Java%20Using%20Application%20Layer%20Transport%20Security%20(ALTS).html","title":"gRPC 在 Java 中使用应用层传输安全（ALTS）进行认证","lang":"zh-CN","frontmatter":{"date":"2024-06-13T00:00:00.000Z","category":["Java","gRPC"],"tag":["ALTS","安全"],"description":"gRPC 在 Java 中使用应用层传输安全（ALTS）进行认证 在本教程中，我们将探讨 ALTS（应用层传输安全）在 gRPC 应用程序中的作用。众所周知，在分布式架构中确保认证和数据安全是困难但至关重要的。 ALTS 是 Google 专为其云基础设施定制构建的内置双向认证和传输加密解决方案。ALTS 简化了 gRPC 服务之间的认证和数据加密，并...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/articles/gRPC%20Authentication%20in%20Java%20Using%20Application%20Layer%20Transport%20Security%20(ALTS).html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"gRPC 在 Java 中使用应用层传输安全（ALTS）进行认证"}],["meta",{"property":"og:description","content":"gRPC 在 Java 中使用应用层传输安全（ALTS）进行认证 在本教程中，我们将探讨 ALTS（应用层传输安全）在 gRPC 应用程序中的作用。众所周知，在分布式架构中确保认证和数据安全是困难但至关重要的。 ALTS 是 Google 专为其云基础设施定制构建的内置双向认证和传输加密解决方案。ALTS 简化了 gRPC 服务之间的认证和数据加密，并..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-13T11:10:52.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"ALTS"}],["meta",{"property":"article:tag","content":"安全"}],["meta",{"property":"article:published_time","content":"2024-06-13T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-13T11:10:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"gRPC 在 Java 中使用应用层传输安全（ALTS）进行认证\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-13T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-13T11:10:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":3,"title":"4.1. 先决条件","slug":"_4-1-先决条件","link":"#_4-1-先决条件","children":[]},{"level":3,"title":"4.2. 实现","slug":"_4-2-实现","link":"#_4-2-实现","children":[]},{"level":3,"title":"4.3. 在 Google Compute Engine 上运行","slug":"_4-3-在-google-compute-engine-上运行","link":"#_4-3-在-google-compute-engine-上运行","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718277052000,"updatedTime":1718277052000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6,"words":1801},"filePathRelative":"posts/articles/gRPC Authentication in Java Using Application Layer Transport Security (ALTS).md","localizedDate":"2024年6月13日","excerpt":"\\n<p>在本教程中，我们将探讨 ALTS（应用层传输安全）在 gRPC 应用程序中的作用。众所周知，在分布式架构中确保认证和数据安全是困难但至关重要的。</p>\\n<p>ALTS 是 Google 专为其云基础设施定制构建的内置双向认证和传输加密解决方案。ALTS 简化了 gRPC 服务之间的认证和数据加密，并且可以通过最小的代码更改启用。因此，它在开发者中很受欢迎，因为他们可以更多地专注于编写业务逻辑。</p>\\n<p>ALTS 与 TLS 类似，但具有针对 Google 基础设施优化的不同信任模型。让我们快速看一下它们之间的主要区别：</p>\\n<table>\\n<thead>\\n<tr>\\n<th>特性</th>\\n<th>ALTS</th>\\n<th>TLS</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>信任模型</td>\\n<td>基于身份，依赖于 GCP IAM 服务账户</td>\\n<td>基于证书，需要证书管理，包括续订和撤销</td>\\n</tr>\\n<tr>\\n<td>设计</td>\\n<td>更简单</td>\\n<td>更复杂</td>\\n</tr>\\n<tr>\\n<td>使用上下文</td>\\n<td>用于保护在 Google 数据中心运行的 gRPC 服务</td>\\n<td>用于保护 Web 浏览（HTTPS）、电子邮件、即时消息、VoIP 等</td>\\n</tr>\\n<tr>\\n<td>消息序列化</td>\\n<td>使用 Protocol Buffers</td>\\n<td>使用用 ASN.1 编码的 X.509 证书</td>\\n</tr>\\n<tr>\\n<td>性能</td>\\n<td>为通用用途设计</td>\\n<td>针对 Google 数据中心中的低延迟、高吞吐量通信进行优化</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}');export{d as comp,k as data};
