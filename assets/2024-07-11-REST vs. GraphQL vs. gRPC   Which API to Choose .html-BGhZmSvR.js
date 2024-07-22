import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BMOUrRO4.js";const p={},e=t('<hr><h1 id="rest-vs-graphql-vs-grpc-–-选择哪种api" tabindex="-1"><a class="header-anchor" href="#rest-vs-graphql-vs-grpc-–-选择哪种api"><span>REST vs. GraphQL vs. gRPC – 选择哪种API？</span></a></h1><p>多年来，REST一直是设计Web API的事实行业标准架构风格。然而，GraphQL和gRPC最近出现，以解决REST的一些限制。每种API方法都带来了巨大的好处和一些权衡。</p><p>在本教程中，我们将首先查看每种API设计方法。然后，我们将使用Spring Boot的三种不同方法构建一个简单服务。接下来，我们将通过查看在决定使用其中一种之前应考虑的几个标准来比较它们。</p><p>最后，由于没有一种方法适合所有情况，们将看到如何在不同的应用层混合使用不同的方法。</p><p>表现层状态转移（REST）是全球最常用的API架构风格。它由Roy Fielding在2000年定义。</p><h3 id="_2-1-架构风格" tabindex="-1"><a class="header-anchor" href="#_2-1-架构风格"><span>2.1. 架构风格</span></a></h3><p>REST不是一个框架或库，而是一种基于URL结构和HTTP协议的接口描述的架构风格。它描述了一个无状态、可缓存、基于约定的客户端-服务器交互架构。它使用URL来定位适当的资源，并使用HTTP方法来表达要执行的操作：</p><ul><li>GET用于获取现有资源或多个资源</li><li>POST用于创建新资源</li><li>PUT用于更新资源或如果不存在则创建它</li><li>DELETE用于删除资源</li><li>PATCH用于部分更新现有资源</li></ul><p>REST可以在多种编程语言中实现，并支持JSON和XML等多种数据格式。</p><h3 id="_2-2-示例服务" tabindex="-1"><a class="header-anchor" href="#_2-2-示例服务"><span>2.2. 示例服务</span></a></h3><p>我们可以通过使用@RestController注解定义一个控制器类来在Spring中构建REST服务。接下来，我们通过@GetMapping注解定义一个与HTTP方法相对应的函数，例如GET。最后，在注解参数中，我们提供一个资源路径，该方法应该在该路径上触发：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/rest/books&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token class-name">List</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">&gt;</span></span>```` <span class="token function">books</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> booksService<span class="token punctuation">.</span><span class="token function">getBooks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MockMvc为Spring中的REST服务提供了集成测试支持。它封装了所有Web应用程序bean，并使它们可用于测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">this</span><span class="token punctuation">.</span>mockMvc<span class="token punctuation">.</span><span class="token function">perform</span><span class="token punctuation">(</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;/rest/books&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">andDo</span><span class="token punctuation">(</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isOk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token function">content</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span>expectedJson<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于它们基于HTTP，REST服务可以在浏览器中或使用Postman或CURL等工具进行测试：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> http://localhost:8082/rest/books\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-3-优点和缺点" tabindex="-1"><a class="header-anchor" href="#_2-3-优点和缺点"><span>2.3. 优点和缺点</span></a></h3><p>REST的最大优势是它是技术界最成熟的API架构风格。由于其普及，许多开发人员已经熟悉REST并发现它很容易使用。然而，由于其灵活性，REST可能在开发人员之间有不同的解释。</p><p>由于每个资源通常位于一个独特的URL后面，因此很容易监控和限制API。REST还通过利用HTTP使缓存变得简单。通过缓存HTTP响应，我们的客户端和服务器不需要不断地相互交互。</p><p>REST容易出现不足和过度获取数据的情况。例如，要获取嵌套实体，我们可能需要发出多个请求。另一方面，在REST API中，通常不可能只获取特定实体数据的一部分。客户端总是接收到请求端点配置返回的所有数据。</p><h2 id="_3-graphql" tabindex="-1"><a class="header-anchor" href="#_3-graphql"><span>3. GraphQL</span></a></h2><p>GraphQL是由Facebook开发的开源API查询语言。</p><h3 id="_3-1-架构风格" tabindex="-1"><a class="header-anchor" href="#_3-1-架构风格"><span>3.1. 架构风格</span></a></h3><p>GraphQL提供了一种用于开发API的查询语言，以及一个框架来满足这些查询。它不依赖于HTTP方法来操作数据，主要只使用POST。相比之下，GraphQL使用查询、变异和订阅：</p><ul><li>查询用于从服务器请求数据</li><li>变异用于修改服务器上的数据</li><li>订阅用于在数据更改时获取实时更新</li></ul><p>GraphQL是由客户端驱动的，因为它使客户端能够确切定义他们需要的特定用例的数据。然后，请求的数据在一次往返中从服务器检索。</p><h3 id="_3-2-示例服务" tabindex="-1"><a class="header-anchor" href="#_3-2-示例服务"><span>3.2. 示例服务</span></a></h3><p>在GraphQL中，<strong>数据是通过定义对象、它们的字段和类型的模式来表示的</strong>。因此，我们将首先为我们的示例服务定义一个GraphQL模式：</p><div class="language-graphql line-numbers-mode" data-ext="graphql" data-title="graphql"><pre class="language-graphql"><code><span class="token keyword">type</span> <span class="token class-name">Author</span> <span class="token punctuation">{</span>\n    <span class="token attr-name">firstName</span><span class="token punctuation">:</span> <span class="token scalar">String</span><span class="token operator">!</span>\n    <span class="token attr-name">lastName</span><span class="token punctuation">:</span> <span class="token scalar">String</span><span class="token operator">!</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">type</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>\n    <span class="token attr-name">title</span><span class="token punctuation">:</span> <span class="token scalar">String</span><span class="token operator">!</span>\n    <span class="token attr-name">year</span><span class="token punctuation">:</span> <span class="token scalar">Int</span><span class="token operator">!</span>\n    <span class="token attr-name">author</span><span class="token punctuation">:</span> <span class="token class-name">Author</span><span class="token operator">!</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">type</span> <span class="token class-name">Query</span> <span class="token punctuation">{</span>\n    <span class="token attr-name">books</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token class-name">Book</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以像REST服务一样使用@RestController类注解在Spring中构建GraphQL服务。接下来，我们使用@QueryMapping注解标记我们的函数，将其标记为GraphQL数据获取组件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@QueryMapping</span>\n<span class="token keyword">public</span> <span class="token class-name">List</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">&gt;</span></span>```` <span class="token function">books</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> booksService<span class="token punctuation">.</span><span class="token function">getBooks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>HttpGraphQlTester为Spring中的GraphQL服务提供了集成测试支持。它封装了所有Web应用程序bean，并使它们可用于测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">this</span><span class="token punctuation">.</span>graphQlTester<span class="token punctuation">.</span><span class="token function">document</span><span class="token punctuation">(</span>document<span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">path</span><span class="token punctuation">(</span><span class="token string">&quot;books&quot;</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">matchesJson</span><span class="token punctuation">(</span>expectedJson<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>GraphQL服务可以使用Postman或CURL等工具进行测试。然而，它们需要在POST正文中指定查询：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token parameter variable">-H</span> <span class="token string">&quot;Content-Type: application/json&quot;</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;{<span class="token entity" title="\\&quot;">\\&quot;</span>query<span class="token entity" title="\\&quot;">\\&quot;</span>:<span class="token entity" title="\\&quot;">\\&quot;</span>query{books{title}}<span class="token entity" title="\\&quot;">\\&quot;</span>}&quot;</span> http://localhost:8082/graphql\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-3-优点和缺点" tabindex="-1"><a class="header-anchor" href="#_3-3-优点和缺点"><span>3.3. 优点和缺点</span></a></h3><p>GraphQL对客户端高度灵活，因为它<strong>允许获取和仅传递请求的数据</strong>。由于没有不必要的数据在网络上传输，GraphQL可以带来更好的性能。</p><p>与REST的模糊性相比，GraphQL使用更严格的规范。此外，GraphQL为调试目的提供了详细的错误描述，并在API更改时自动生成文档。</p><p>由于每个查询都可以不同，GraphQL打破了中间代理缓存，使得缓存实现更加困难。此外，由于GraphQL查询可能执行大量复杂的服务器端操作，查询通常限制在复杂性上，以避免过载服务器。</p><h2 id="_4-grpc" tabindex="-1"><a class="header-anchor" href="#_4-grpc"><span>4. gRPC</span></a></h2><p>RPC代表远程过程调用，gRPC是由Google创建的高性能、开源的RPC框架。</p><h3 id="_4-1-架构风格" tabindex="-1"><a class="header-anchor" href="#_4-1-架构风格"><span>4.1. 架构风格</span></a></h3><p>gRPC框架基于远程过程调用的客户端-服务器模型。<strong>客户端应用程序可以直接调用服务器应用程序上的方法</strong>，就像它是一个本地对象一样。它是一种基于合同的严格方法，客户端和服务器都需要访问相同的模式定义。</p><p>在gRPC中，一种称为协议缓冲区语言的DSL定义了请求和响应类型。然后，协议缓冲区编译器生成服务器和客户端代码工件。我们可以扩展生成的服务器代码，添加自定义业务逻辑并提供响应数据。</p><p>该框架支持几种类型的客户端-服务器交互：</p><ul><li>传统的请求-响应交互</li><li>服务器流，其中一个客户端请求可能产生多个响应</li><li>客户端流，多个客户端请求产生单个响应</li></ul><p>客户端和服务器通过使用紧凑的二进制格式的HTTP/2进行通信，这使得gRPC消息的编码和解码非常高效。</p><h3 id="_4-2-示例服务" tabindex="-1"><a class="header-anchor" href="#_4-2-示例服务"><span>4.2. 示例服务</span></a></h3><p>类似于GraphQL，<strong>我们首先通过定义一个模式来定义服务、请求和响应，包括它们的字段和类型</strong>：</p><div class="language-protobuf line-numbers-mode" data-ext="protobuf" data-title="protobuf"><pre class="language-protobuf"><code><span class="token keyword">message</span> <span class="token class-name">BooksRequest</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n\n<span class="token keyword">message</span> <span class="token class-name">AuthorProto</span> <span class="token punctuation">{</span>\n    <span class="token builtin">string</span> firstName <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>\n    <span class="token builtin">string</span> lastName <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">message</span> <span class="token class-name">BookProto</span> <span class="token punctuation">{</span>\n    <span class="token builtin">string</span> title <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>\n    <span class="token positional-class-name class-name">AuthorProto</span> author <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>\n    <span class="token builtin">int32</span> year <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">message</span> <span class="token class-name">BooksResponse</span> <span class="token punctuation">{</span>\n    <span class="token keyword">repeated</span> <span class="token positional-class-name class-name">BookProto</span> book <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">service</span> <span class="token class-name">BooksService</span> <span class="token punctuation">{</span>\n    <span class="token keyword">rpc</span> <span class="token function">books</span><span class="token punctuation">(</span><span class="token class-name">BooksRequest</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token class-name">BooksResponse</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们需要将我们的协议缓冲区文件传递给协议缓冲区编译器，以生成所需的代码。我们可以选择使用预编译的二进制文件手动执行此操作，或者使用protobuf-maven-plugin将其作为构建过程的一部分：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`org.xolstice.maven.plugins`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`protobuf-maven-plugin`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`${protobuf-plugin.version}`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>protocArtifact</span><span class="token punctuation">&gt;</span></span>`com.google.protobuf:protoc:${protobuf.version}:exe:${os.detected.classifier}`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>protocArtifact</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pluginId</span><span class="token punctuation">&gt;</span></span>`grpc-java`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pluginId</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pluginArtifact</span><span class="token punctuation">&gt;</span></span>`io.grpc:protoc-gen-grpc-java:${grpc.version}:exe:${os.detected.classifier}`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pluginArtifact</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>executions</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>execution</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goals</span><span class="token punctuation">&gt;</span></span>`\n                ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>``compile``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>``\n                ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>``compile-custom``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>``\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goals</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>execution</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>executions</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以扩展生成的BooksServiceImplBase类，使用@GrpcService注解标记它，并覆盖books方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">books</span><span class="token punctuation">(</span><span class="token class-name">BooksRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">StreamObserver</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BooksResponse</span><span class="token punctuation">&gt;</span></span>` responseObserver<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">List</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">&gt;</span></span>```` books <span class="token operator">=</span> booksService<span class="token punctuation">.</span><span class="token function">getBooks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">BooksResponse<span class="token punctuation">.</span>Builder</span> responseBuilder <span class="token operator">=</span> <span class="token class-name">BooksResponse</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    books<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>book <span class="token operator">-&gt;</span> responseBuilder<span class="token punctuation">.</span><span class="token function">addBook</span><span class="token punctuation">(</span><span class="token class-name">GrpcBooksMapper</span><span class="token punctuation">.</span><span class="token function">mapBookToProto</span><span class="token punctuation">(</span>book<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    responseObserver<span class="token punctuation">.</span><span class="token function">onNext</span><span class="token punctuation">(</span>responseBuilder<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    responseObserver<span class="token punctuation">.</span><span class="token function">onCompleted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Spring中的gRPC服务集成测试是可能的，但还没有像REST和GraphQL那样成熟：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">BooksRequest</span> request <span class="token operator">=</span> <span class="token class-name">BooksRequest</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">BooksResponse</span> response <span class="token operator">=</span> booksServiceGrpc<span class="token punctuation">.</span><span class="token function">books</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">List</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">&gt;</span></span>```` books <span class="token operator">=</span> response<span class="token punctuation">.</span><span class="token function">getBookList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">GrpcBooksMapper</span><span class="token operator">::</span><span class="token function">mapProtoToBook</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">JSONAssert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span>objectMapper<span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>books<span class="token punctuation">)</span><span class="token punctuation">,</span> expectedJson<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要使此集成测试工作，我们需要使用以下注解标记我们的测试类：</p><ul><li>@SpringBootTest配置客户端连接所谓的gRPC &quot;in process&quot; 测试服务器</li><li>@SpringJUnitConfig准备和提供应用程序bean</li><li>@DirtiesContext确保每次测试后服务器都能正确关闭</li></ul><p>Postman最近增加了对gRPC服务的测试支持。类似于CURL，一个名为grpcurl的命令行工具使我们能够与gRPC服务器交互：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ grpcurl <span class="token parameter variable">--plaintext</span> localhost:9090 com.baeldung.chooseapi.BooksService/books\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个工具使用JSON编码，使协议缓冲区编码对人类更友好，以便于测试。</p><h3 id="_4-3-优点和缺点" tabindex="-1"><a class="header-anchor" href="#_4-3-优点和缺点"><span>4.3. 优点和缺点</span></a></h3><p>gRPC的最大优势是性能，这得益于其紧凑的数据格式、快速的消息编码和解码，以及使用HTTP/2。此外，它的代码生成功能支持多种编程语言，并帮助我们节省了编写样板代码的时间。</p><p>通过要求使用HTTP 2和TLS/SSL，gRPC提供了更好的安全默认值和内置的流支持。语言中立的接口合同定义使不同编程语言编写的服务之间能够进行通信。</p><p>然而，目前gRPC在开发人员社区中的受欢迎程度远不如REST。它的数据格式对人类来说是不可读的，因此需要额外的工具来分析负载和执行调试。此外，HTTP/2仅在现代浏览器的最新版本中通过TLS支持。</p><h2 id="_5-选择哪种api" tabindex="-1"><a class="header-anchor" href="#_5-选择哪种api"><span>5. 选择哪种API</span></a></h2><p>现在我们已经熟悉了所有三种API设计方法，让我们看看在决定使用其中一种之前应该考虑的几个标准。</p><h3 id="_5-1-数据格式" tabindex="-1"><a class="header-anchor" href="#_5-1-数据格式"><span>5.1. 数据格式</span></a></h3><p>REST在请求和响应数据格式方面是最灵活的方法。我们可以<strong>实现REST服务以支持一个或多个数据格式</strong>，如JSON和XML。</p><p>另一方面，GraphQL定义了自己的查询语言，请数据时需要使用。GraphQL服务以JSON格式响应。尽管可以将响应转换为另一种格式，但这不常见，可能会影响性能。</p><p>gRPC框架使用协议缓冲区，这是一种自定义的二进制格式。它对人类来说是不可读的，但也是使gRPC如此高性能的主要原因之一。尽管在几种编程语言中得到支持，但该格式无法定制。</p><h3 id="_5-2-数据获取" tabindex="-1"><a class="header-anchor" href="#_5-2-数据获取"><span>5.2. 数据获取</span></a></h3><p><strong>GraphQL是获取服务器数据最有效的API方法</strong>。由于它允许客户端选择要获取的数据，因此通常不会在网络上发送额外的数据。</p><p>REST和gRPC都不支持如此高级的客户端查询。因此，除非在服务器上开发和部署了新的端点或过滤器，否则服务器可能会返回额外的数据。</p><h3 id="_5-3-浏览器支持" tabindex="-1"><a class="header-anchor" href="#_5-3-浏览器支持"><span>5.3. 浏览器支持</span></a></h3><p><strong>REST和GraphQL API在所有现代浏览器中都得到支持</strong>。通常，JavaScript客户端代码用于通过HTTP请求从浏览器发送到服务器API。</p><p>gRPC API的浏览器支持不是开箱即用的。然而，gRPC的Web扩展是可用的。它基于HTTP 1.1，但并不提供所有gRPC功能。类似于Java客户端，Web上的gRPC需要浏览器客户端代码从协议缓冲区模式生成gRPC客户端。</p><h3 id="_5-4-代码生成" tabindex="-1"><a class="header-anchor" href="#_5-4-代码生成"><span>5.4. 代码生成</span></a></h3><p>GraphQL需要向像Spring这样的核心框架添加额外的库。这些库增加了处理GraphQL模式、基于注解的编程和服务器处理GraphQL请求的支持。从GraphQL模式生成代码是可能的，但不是必需的。<strong>任何与GraphQL模式中定义的类型匹配的自定义POJO都可以使用</strong>。</p><p>gRPC框架还需要向核心框架添加额外的库，以及强制的代码生成步骤。协议缓冲区编译器生成我们可以扩展的服务器和客户端样板代码。如果我们使用自定义POJO，则需要将它们映射到自动生成的协议缓冲区类型。</p><p>REST是一种架构风格，可以使用任何编程语言和各种HTTP库实现。它不使用预定义的模式，也不需要任何代码生成。也就是说，使用Swagger或OpenAPI允许我们定义模式并生成代码（如果需要）。</p><h3 id="_5-5-响应时间" tabindex="-1"><a class="header-anchor" href="#_5-5-响应时间"><span>5.5. 响应时间</span></a></h3><p>由于其优化的二进制格式，<strong>gRPC的响应时间比REST和GraphQL显著更快</strong>。此外，所有三种方法都可以使用负载均衡来平均分配客户端请求到多个服务器。</p><p>然而，gRPC默认使用HTTP 2.0，这使gRPC的延迟低于REST和GraphQL API。使用HTTP 2.0，几个客户端可以同时发送多个请求，而无需建立新的TCP连接。大多数性能测试报告称，gRPC的速度大约比REST快5到10倍。</p><h3 id="_5-6-缓存" tabindex="-1"><a class="header-anchor" href="#_5-6-缓存"><span>5.6. 缓存</span></a></h3><p>使用<strong>REST进行请求和响应的缓存是简单且成熟的</strong>，因为它允许在HTTP级别缓存数据。每个GET请求都暴露了应用程序资源，这些资源可以很容易地被浏览器、代理服务器或CDN缓存。</p><p>由于GraphQL默认使用POST方法，每个查询都可以不同，这使得缓存实现更加困难。特别是当客户端和服务器地理位置相距甚远时。解决这个问题的一种可能的变通方法是通过GET进行查询，并使用在服务器上预先计算并存储的持久查询。一些GraphQL中间件服务也提供缓存。</p><p>目前，gRPC默认不支持缓存请求和响应。然而，可以实施自定义中间件层来缓存响应。</p><h3 id="_5-7-预期用途" tabindex="-1"><a class="header-anchor" href="#_5-7-预期用途"><span>5.7. 预期用途</span></a></h3><p>REST适合于<strong>可以轻松描述为一组资源的领域</strong>，而不是操作。使用HTTP方法可以对这些资源执行标准的CRUD操作。通过依赖HTTP语义，它对调用者来说是直观的，这使得它适合于公共接口。REST的良好缓存支持使其适合于具有稳定使用模式和地理分布用户的API。</p><p>GraphQL适合于<strong>多个客户端需要不同数据集的公共API</strong>。因此，GraphQL客户端可以通过标准化的查询语言指定他们想要的确切数据。它也是聚合来自多个来源的数据，然后将其提供给多个客户端的API的良好选择。</p><p>gRPC框架适合于开发内部API，其中<strong>微服务之间频繁交互</strong>。它通常用于从低级代理（如不同的IoT设备）收集数据。然而，其有限的浏览器支持使其难以在面向客户的Web应用程序中使用。</p><h2 id="_6-混合搭配" tabindex="-1"><a class="header-anchor" href="#_6-混合搭配"><span>6. 混合搭配</span></a></h2><p>三种API架构风格各有优势。然而，没有一种方法适合所有情况，我们选择哪种方法将取决于我们的用例。</p><p>我们不必每次都做出单一选择。我们还可以<strong>在我们的解决方案架构中混合搭配不同的风格</strong>：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/12/choose-api2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在上面的示例架构图中，我们展示了不同的API风格可能如何应用于不同的应用层。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们探讨了<strong>设计Web API的三种流行的架构风格：REST、GraphQL和gRPC</strong>。我们查看了每种不同风格的用例，并描述了它们的好处和权衡。</p><p>我们探讨了如何使用Spring Boot的所有三种不同方法构建一个简单服务。我们还通过查看在决定方法之前应考虑的几个标准来比较它们。最后，由于没有一种方法适合所有情况，我们看到了如何在不同的应用层中混合搭配不同的方法。</p><p>如往常一样，完整的源代码可在GitHub上获得。</p><p><a href="kimi://action?name=cheer-on-kimi">给Kimi加油</a></p><p>OK</p>',104),o=[e];function c(l,i){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-11-REST vs. GraphQL vs. gRPC   Which API to Choose .html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-REST%20vs.%20GraphQL%20vs.%20gRPC%20%20%20Which%20API%20to%20Choose%20.html","title":"REST vs. GraphQL vs. gRPC – 选择哪种API？","lang":"zh-CN","frontmatter":{"date":"2022-12-01T00:00:00.000Z","category":["Web Services"],"tag":["REST","GraphQL","gRPC"],"head":[["meta",{"name":"keywords","content":"REST, GraphQL, gRPC, API, 架构风格, 比较"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-REST%20vs.%20GraphQL%20vs.%20gRPC%20%20%20Which%20API%20to%20Choose%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"REST vs. GraphQL vs. gRPC – 选择哪种API？"}],["meta",{"property":"og:description","content":"REST vs. GraphQL vs. gRPC – 选择哪种API？ 多年来，REST一直是设计Web API的事实行业标准架构风格。然而，GraphQL和gRPC最近出现，以解决REST的一些限制。每种API方法都带来了巨大的好处和一些权衡。 在本教程中，我们将首先查看每种API设计方法。然后，我们将使用Spring Boot的三种不同方法构建一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/12/choose-api2.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T20:41:21.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"REST"}],["meta",{"property":"article:tag","content":"GraphQL"}],["meta",{"property":"article:tag","content":"gRPC"}],["meta",{"property":"article:published_time","content":"2022-12-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T20:41:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"REST vs. GraphQL vs. gRPC – 选择哪种API？\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/12/choose-api2.png\\"],\\"datePublished\\":\\"2022-12-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T20:41:21.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"REST vs. GraphQL vs. gRPC – 选择哪种API？ 多年来，REST一直是设计Web API的事实行业标准架构风格。然而，GraphQL和gRPC最近出现，以解决REST的一些限制。每种API方法都带来了巨大的好处和一些权衡。 在本教程中，我们将首先查看每种API设计方法。然后，我们将使用Spring Boot的三种不同方法构建一..."},"headers":[{"level":3,"title":"2.1. 架构风格","slug":"_2-1-架构风格","link":"#_2-1-架构风格","children":[]},{"level":3,"title":"2.2. 示例服务","slug":"_2-2-示例服务","link":"#_2-2-示例服务","children":[]},{"level":3,"title":"2.3. 优点和缺点","slug":"_2-3-优点和缺点","link":"#_2-3-优点和缺点","children":[]},{"level":2,"title":"3. GraphQL","slug":"_3-graphql","link":"#_3-graphql","children":[{"level":3,"title":"3.1. 架构风格","slug":"_3-1-架构风格","link":"#_3-1-架构风格","children":[]},{"level":3,"title":"3.2. 示例服务","slug":"_3-2-示例服务","link":"#_3-2-示例服务","children":[]},{"level":3,"title":"3.3. 优点和缺点","slug":"_3-3-优点和缺点","link":"#_3-3-优点和缺点","children":[]}]},{"level":2,"title":"4. gRPC","slug":"_4-grpc","link":"#_4-grpc","children":[{"level":3,"title":"4.1. 架构风格","slug":"_4-1-架构风格","link":"#_4-1-架构风格","children":[]},{"level":3,"title":"4.2. 示例服务","slug":"_4-2-示例服务","link":"#_4-2-示例服务","children":[]},{"level":3,"title":"4.3. 优点和缺点","slug":"_4-3-优点和缺点","link":"#_4-3-优点和缺点","children":[]}]},{"level":2,"title":"5. 选择哪种API","slug":"_5-选择哪种api","link":"#_5-选择哪种api","children":[{"level":3,"title":"5.1. 数据格式","slug":"_5-1-数据格式","link":"#_5-1-数据格式","children":[]},{"level":3,"title":"5.2. 数据获取","slug":"_5-2-数据获取","link":"#_5-2-数据获取","children":[]},{"level":3,"title":"5.3. 浏览器支持","slug":"_5-3-浏览器支持","link":"#_5-3-浏览器支持","children":[]},{"level":3,"title":"5.4. 代码生成","slug":"_5-4-代码生成","link":"#_5-4-代码生成","children":[]},{"level":3,"title":"5.5. 响应时间","slug":"_5-5-响应时间","link":"#_5-5-响应时间","children":[]},{"level":3,"title":"5.6. 缓存","slug":"_5-6-缓存","link":"#_5-6-缓存","children":[]},{"level":3,"title":"5.7. 预期用途","slug":"_5-7-预期用途","link":"#_5-7-预期用途","children":[]}]},{"level":2,"title":"6. 混合搭配","slug":"_6-混合搭配","link":"#_6-混合搭配","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720730481000,"updatedTime":1720730481000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":13.41,"words":4023},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-REST vs. GraphQL vs. gRPC   Which API to Choose .md","localizedDate":"2022年12月1日","excerpt":"<hr>\\n<h1>REST vs. GraphQL vs. gRPC – 选择哪种API？</h1>\\n<p>多年来，REST一直是设计Web API的事实行业标准架构风格。然而，GraphQL和gRPC最近出现，以解决REST的一些限制。每种API方法都带来了巨大的好处和一些权衡。</p>\\n<p>在本教程中，我们将首先查看每种API设计方法。然后，我们将使用Spring Boot的三种不同方法构建一个简单服务。接下来，我们将通过查看在决定使用其中一种之前应考虑的几个标准来比较它们。</p>\\n<p>最后，由于没有一种方法适合所有情况，们将看到如何在不同的应用层混合使用不同的方法。</p>\\n<p>表现层状态转移（REST）是全球最常用的API架构风格。它由Roy Fielding在2000年定义。</p>","autoDesc":true}');export{k as comp,d as data};
