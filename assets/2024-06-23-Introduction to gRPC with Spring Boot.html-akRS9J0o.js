import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BX3-P94R.js";const e={},p=t('<h1 id="grpc与spring-boot入门指南" tabindex="-1"><a class="header-anchor" href="#grpc与spring-boot入门指南"><span>gRPC与Spring Boot入门指南</span></a></h1><p>无论你是刚开始学习还是拥有多年经验，<strong>Spring Boot</strong> 显然是构建一个web应用程序的极佳选择。</p><p>Jmix基于这个功能强大且成熟的Boot堆栈，允许开发者在不需要编写前端代码的情况下构建和交付<strong>全栈web应用程序</strong>。非常灵活，从简单的web GUI CRUD应用程序到复杂的企业解决方案。</p><p>具体来说，<strong>Jmix平台</strong>包括一个构建在<strong>Spring Boot、JPA和Vaadin</strong>之上的框架，并附带Jmix Studio，这是一个配备了一系列开发者生产力工具的<strong>IntelliJ IDEA插件</strong>。</p><p>该平台带有相互连接的<strong>开箱即用</strong>的插件，用于报告生成、BPM、地图、从数据库即时生成web应用程序等：</p><p><strong>&gt;&gt; 成为一个高效的全栈开发者，使用Jmix</strong></p><p>现在，随着新版《REST With Spring -_ &quot;REST With Spring Boot&quot;_** 最终发布，当前价格将在本周五之前有效，之后将永久增加50美元。</p><p><strong>&gt;&gt; 立即获取访问</strong></p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p><strong>gRPC是一个由Google最初开发的高性能、开源的RPC框架。</strong> 它有助于消除样板代码，并在数据中心内外连接多语言服务。API基于Protocol Buffers，提供了一个_protoc_编译器，用于为不同支持的语言生成代码。</p><p>我们可以将gRPC视为REST、SOAP或GraphQL的替代品，它建立在HTTP/2之上，使用诸如多路复用或流式连接等功能。</p><p>在本教程中，我们将学习如何使用Spring Boot实现gRPC服务提供者和消费者。</p><h2 id="_2-挑战" tabindex="-1"><a class="header-anchor" href="#_2-挑战"><span>2. 挑战</span></a></h2><p>首先，我们可以注意到<strong>Spring Boot中没有直接支持gRPC</strong>。只支持Protocol Buffers，这允许我们实现基于protobuf的REST服务。因此，我们需要通过使用第三方库或自行管理一些挑战来包含gRPC：</p><ul><li>平台依赖编译器：_protoc_编译器是平台依赖的。因此，如果存根应在构建时生成，构建将变得更加复杂且容易出错。</li><li>依赖项：我们需要Spring Boot应用程序中的兼容依赖项。不幸的是，Java的_protoc_添加了一个_javax.annotation.Generated_注释，这迫使我们为编译添加了对旧的_Java EE Annotations for Java_库的依赖。</li><li>服务器运行时：gRPC服务提供者需要在服务器内运行。gRPC for Java项目提供了一个遮蔽的Netty，我们需要将其包含在我们的Spring Boot应用程序中，或者替换为Spring Boot已经提供的服务器。</li><li>消息传输：Spring Boot提供了不同的客户端，如_RestClient_（阻塞）或_WebClient_（非阻塞），不幸的是，它们不能被配置和用于gRPC，因为gRPC对阻塞和非阻塞调用使用自定义传输技术。</li><li>配置：因为gRPC带来了自己的技术，我们需要配置属性来以Spring Boot的方式配置它们。</li></ul><h2 id="_3-示例项目" tabindex="-1"><a class="header-anchor" href="#_3-示例项目"><span>3. 示例项目</span></a></h2><p>幸运的是，有一些第三方Spring Boot Starters我们可以使用来帮助我们掌握这些挑战，例如来自LogNet或grpc生态系统项目的Starters。这两个Starters都很容易集成，但后者既有提供者也有消费者支持以及许多其他集成特性，所以我们选择了后者作为我们的示例。</p><p>在这个示例中，<strong>我们只设计了一个简单的HelloWorld API，使用单个Proto文件</strong>：</p><div class="language-protobuf line-numbers-mode" data-ext="protobuf" data-title="protobuf"><pre class="language-protobuf"><code><span class="token keyword">syntax</span> <span class="token operator">=</span> <span class="token string">&quot;proto3&quot;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">option</span> java_package <span class="token operator">=</span> <span class="token string">&quot;com.baeldung.helloworld.stubs&quot;</span><span class="token punctuation">;</span>\n<span class="token keyword">option</span> java_multiple_files <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n\n<span class="token keyword">message</span> <span class="token class-name">HelloWorldRequest</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 要问候的名字，默认是&quot;World&quot;</span>\n    <span class="token keyword">optional</span> <span class="token builtin">string</span> name <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">message</span> <span class="token class-name">HelloWorldResponse</span> <span class="token punctuation">{</span>\n    <span class="token builtin">string</span> greeting <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">service</span> <span class="token class-name">HelloWorldService</span> <span class="token punctuation">{</span>\n    <span class="token keyword">rpc</span> <span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token keyword">stream</span> <span class="token class-name">HelloWorldRequest</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token keyword">stream</span> <span class="token class-name">HelloWorldResponse</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，我们使用了双向流式传输功能。</p><h3 id="_3-1-grpc存根" tabindex="-1"><a class="header-anchor" href="#_3-1-grpc存根"><span>3.1. gRPC存根</span></a></h3><p>由于存根对于提供者和消费者都是相同的，我们在一个独立的、与Spring无关的项目中生成它们。这样做的好处是，该项目的生命周期，包括_protoc_编译器配置和Java EE Annotations for Java依赖项，可以从Spring Boot项目的生命周期中隔离出来。</p><h3 id="_3-2-服务提供者" tabindex="-1"><a class="header-anchor" href="#_3-2-服务提供者"><span>3.2. 服务提供者</span></a></h3><p>实现服务提供者相当容易。首先，我们需要为Starter和我们的存根项目添加依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````net.devh````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````grpc-server-spring-boot-starter````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````2.15.0.RELEASE````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````com.baeldung.spring-boot-modules````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````helloworld-grpc-java````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````1.0.0-SNAPSHOT````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们不需要包含Spring MVC或WebFlux，因为Starter依赖项带来了遮蔽的Netty服务器。我们可以在_application.yml_中<strong>配置它</strong>，例如，通过配置服务器端口：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">grpc</span><span class="token punctuation">:</span>\n  <span class="token key atrule">server</span><span class="token punctuation">:</span>\n    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9090</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们需要实现服务并用_@GrpcService_注解它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@GrpcService</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloWorldController</span> <span class="token keyword">extends</span> <span class="token class-name">HelloWorldServiceGrpc<span class="token punctuation">.</span>HelloWorldServiceImplBase</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">StreamObserver</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">HelloWorldRequest</span><span class="token punctuation">&gt;</span></span>` <span class="token function">sayHello</span><span class="token punctuation">(</span>\n        <span class="token class-name">StreamObserver</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">HelloWorldResponse</span><span class="token punctuation">&gt;</span></span>` responseObserver\n    <span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">// ...</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-服务消费者" tabindex="-1"><a class="header-anchor" href="#_3-3-服务消费者"><span>3.3. 服务消费者</span></a></h3><p>对于服务消费者，我们需要添加Starter和存根的依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````net.devh````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````grpc-client-spring-boot-starter````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````2.15.0.RELEASE````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````com.baeldung.spring-boot-modules````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````helloworld-grpc-java````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````1.0.0-SNAPSHOT````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，在_application.yml_中<strong>配置对服务的连接</strong>：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">grpc</span><span class="token punctuation">:</span>\n  <span class="token key atrule">client</span><span class="token punctuation">:</span>\n    <span class="token key atrule">hello</span><span class="token punctuation">:</span>\n      <span class="token key atrule">address</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">9090</span>\n      <span class="token key atrule">negotiation-type</span><span class="token punctuation">:</span> plaintext\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>名称_“hello”_是自定义的。这样，我们可以配置多个连接，并在将gRPC客户端注入我们的Spring组件时引用此名称：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@GrpcClient</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span>\n<span class="token class-name">HelloWorldServiceGrpc<span class="token punctuation">.</span>HelloWorldServiceStub</span> stub<span class="token punctuation">;</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-陷阱" tabindex="-1"><a class="header-anchor" href="#_4-陷阱"><span>4. 陷阱</span></a></h2><p>使用Spring Boot实现和消费gRPC服务相当容易。但有一些陷阱我们应该注意。</p><h3 id="_4-1-ssl握手" tabindex="-1"><a class="header-anchor" href="#_4-1-ssl握手"><span>4.1. SSL握手</span></a></h3><p>通过HTTP传输数据意味着发送未加密的信息，除非我们使用SSL。集成的Netty服务器默认不使用SSL，因此我们需要明确配置它。</p><p>否则，对于本地测试，我们可以将连接保持不加密。在这种情况下，我们需要像已经显示的那样配置消费者：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">grpc</span><span class="token punctuation">:</span>\n  <span class="token key atrule">client</span><span class="token punctuation">:</span>\n    <span class="token key atrule">hello</span><span class="token punctuation">:</span>\n      <span class="token key atrule">negotiation-type</span><span class="token punctuation">:</span> plaintext\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>消费者默认使用TLS，而提供者的默认是跳过SSL加密。<strong>因此，消费者和提供者的默认值彼此不匹配</strong>。</p><h3 id="_4-2-没有-autowired的消费者注入" tabindex="-1"><a class="header-anchor" href="#_4-2-没有-autowired的消费者注入"><span>4.2. 没有@Autowired的消费者注入</span></a></h3><p>我们通过将客户端对象注入到我们的Spring组件中来实现消费者：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@GrpcClient</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span>\n<span class="token class-name">HelloWorldServiceGrpc<span class="token punctuation">.</span>HelloWorldServiceStub</span> stub<span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这是通过_BeanPostProcessor_实现的，并且作为Spring内置依赖注入机制的补充。这意味着我们不能将_@GrpcClient_注解与_@Autowired_或构造函数注入结合使用。相反，我们被限制为使用字段注入。</p><p>我们只能通过使用配置类来分离注入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloWorldGrpcClientConfiguration</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@GrpcClient</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span>\n    <span class="token class-name">HelloWorldServiceGrpc<span class="token punctuation">.</span>HelloWorldServiceStub</span> helloWorldClient<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Bean</span>\n    <span class="token class-name">MyHelloWorldClient</span> <span class="token function">helloWorldClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MyHelloWorldClient</span><span class="token punctuation">(</span>helloWorldClient<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-映射传输对象" tabindex="-1"><a class="header-anchor" href="#_4-3-映射传输对象"><span>4.3. 映射传输对象</span></a></h3><p>由_protoc_生成的数据类型在调用带有null值的setter时可能会失败：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">HelloWorldResponse</span> <span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">HelloWorldMessage</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token class-name">HelloWorldResponse</span>\n      <span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">setGreeting</span><span class="token punctuation">(</span> message<span class="token punctuation">.</span><span class="token function">getGreeting</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">)</span> <span class="token comment">// 可能是null</span>\n      <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，在调用setter之前我们需要进行空值检查。当我们使用映射框架时，我们需要配置映射器生成进行这样的空值检查。例如，MapStruct映射器将需要一些特殊的配置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Mapper</span><span class="token punctuation">(</span>\n  componentModel <span class="token operator">=</span> <span class="token string">&quot;spring&quot;</span><span class="token punctuation">,</span>\n  nullValuePropertyMappingStrategy <span class="token operator">=</span> <span class="token class-name">NullValuePropertyMappingStrategy</span><span class="token punctuation">.</span><span class="token constant">IGNORE</span><span class="token punctuation">,</span>\n  nullValueCheckStrategy <span class="token operator">=</span> <span class="token class-name">NullValueCheckStrategy</span><span class="token punctuation">.</span><span class="token constant">ALWAYS</span>\n<span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">HelloWorldMapper</span> <span class="token punctuation">{</span>\n    <span class="token class-name">HelloWorldResponse</span> <span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">HelloWorldMessage</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-测试" tabindex="-1"><a class="header-anchor" href="#_4-4-测试"><span>4.4. 测试</span></a></h3><p>Starter不包括任何特殊支持来实现测试。即使是gRPC for Java项目也只有对JUnit 4的最小支持，并且不支持JUnit 5。</p><h3 id="_4-5-本地映像" tabindex="-1"><a class="header-anchor" href="#_4-5-本地映像"><span>4.5. 本地映像</span></a></h3><p>当我们想要构建本地映像时，目前没有对gRPC的支持。因为客户端注入是通过反射完成的，<strong>没有额外的配置这将无法工作</strong>。</p><h1 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h1>',59),l=[p];function o(c,i){return s(),a("div",null,l)}const d=n(e,[["render",o],["__file","2024-06-23-Introduction to gRPC with Spring Boot.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-Introduction%20to%20gRPC%20with%20Spring%20Boot.html","title":"gRPC与Spring Boot入门指南","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["Spring Boot","gRPC"],"tag":["Baeldung","教程"],"head":[["meta",{"name":"keywords","content":"Spring Boot, gRPC, 教程, Baeldung"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-Introduction%20to%20gRPC%20with%20Spring%20Boot.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"gRPC与Spring Boot入门指南"}],["meta",{"property":"og:description","content":"gRPC与Spring Boot入门指南 无论你是刚开始学习还是拥有多年经验，Spring Boot 显然是构建一个web应用程序的极佳选择。 Jmix基于这个功能强大且成熟的Boot堆栈，允许开发者在不需要编写前端代码的情况下构建和交付全栈web应用程序。非常灵活，从简单的web GUI CRUD应用程序到复杂的企业解决方案。 具体来说，Jmix平台..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T12:58:25.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Baeldung"}],["meta",{"property":"article:tag","content":"教程"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T12:58:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"gRPC与Spring Boot入门指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T12:58:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"gRPC与Spring Boot入门指南 无论你是刚开始学习还是拥有多年经验，Spring Boot 显然是构建一个web应用程序的极佳选择。 Jmix基于这个功能强大且成熟的Boot堆栈，允许开发者在不需要编写前端代码的情况下构建和交付全栈web应用程序。非常灵活，从简单的web GUI CRUD应用程序到复杂的企业解决方案。 具体来说，Jmix平台..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 挑战","slug":"_2-挑战","link":"#_2-挑战","children":[]},{"level":2,"title":"3. 示例项目","slug":"_3-示例项目","link":"#_3-示例项目","children":[{"level":3,"title":"3.1. gRPC存根","slug":"_3-1-grpc存根","link":"#_3-1-grpc存根","children":[]},{"level":3,"title":"3.2. 服务提供者","slug":"_3-2-服务提供者","link":"#_3-2-服务提供者","children":[]},{"level":3,"title":"3.3. 服务消费者","slug":"_3-3-服务消费者","link":"#_3-3-服务消费者","children":[]}]},{"level":2,"title":"4. 陷阱","slug":"_4-陷阱","link":"#_4-陷阱","children":[{"level":3,"title":"4.1. SSL握手","slug":"_4-1-ssl握手","link":"#_4-1-ssl握手","children":[]},{"level":3,"title":"4.2. 没有@Autowired的消费者注入","slug":"_4-2-没有-autowired的消费者注入","link":"#_4-2-没有-autowired的消费者注入","children":[]},{"level":3,"title":"4.3. 映射传输对象","slug":"_4-3-映射传输对象","link":"#_4-3-映射传输对象","children":[]},{"level":3,"title":"4.4. 测试","slug":"_4-4-测试","link":"#_4-4-测试","children":[]},{"level":3,"title":"4.5. 本地映像","slug":"_4-5-本地映像","link":"#_4-5-本地映像","children":[]}]}],"git":{"createdTime":1719147505000,"updatedTime":1719147505000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.22,"words":1867},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-Introduction to gRPC with Spring Boot.md","localizedDate":"2024年6月23日","excerpt":"\\n<p>无论你是刚开始学习还是拥有多年经验，<strong>Spring Boot</strong> 显然是构建一个web应用程序的极佳选择。</p>\\n<p>Jmix基于这个功能强大且成熟的Boot堆栈，允许开发者在不需要编写前端代码的情况下构建和交付<strong>全栈web应用程序</strong>。非常灵活，从简单的web GUI CRUD应用程序到复杂的企业解决方案。</p>\\n<p>具体来说，<strong>Jmix平台</strong>包括一个构建在<strong>Spring Boot、JPA和Vaadin</strong>之上的框架，并附带Jmix Studio，这是一个配备了一系列开发者生产力工具的<strong>IntelliJ IDEA插件</strong>。</p>","autoDesc":true}');export{d as comp,k as data};
