import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-D4B8YWfq.js";const e={},p=t('<h1 id="使用spring-integration接收postgresql推送通知" tabindex="-1"><a class="header-anchor" href="#使用spring-integration接收postgresql推送通知"><span>使用Spring Integration接收PostgreSQL推送通知</span></a></h1><p>在这个教程中，我们将展示如何使用基于Spring Integration的应用程序与PostgreSQL的_NOTIFY/LISTEN_特性。PostgreSQL提供了一种轻量级的消息通知机制，允许客户端使用常规数据库连接相互发送通知。这种机制使用两个非标准SQL语句，<em>NOTIFY_和_LISTEN</em>，因此得名。</p><p>我们将基于Spring Integration核心库和PostgreSQL JDBC驱动进行操作：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.springframework.integration``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``spring-integration-core``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``6.0.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.postgresql``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``postgresql``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``42.3.8``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Spring Integration的_SubscribableChannel_接口是_MessageChannel_的扩展，支持向订阅者异步传递消息。它为其父类添加了两个额外的方法：</p><ul><li><em>subscribe(MessageHandler handler)</em></li><li><em>unsubscribe(MessageHandler handler)</em></li></ul><p>这些方法允许客户端注册/注销一个_MessageHandler_实例来处理接收到的消息。</p><p>尽管它与反应式消息分派相似，但存在一个根本的区别：这里我们有一个基于推送的模型，而在反应式世界中是拉取式的。这意味着没有隐式流量控制，消费者需要实现任何缓冲/丢弃策略来处理过量流量。</p><p>Spring Integration提供了这个接口的简单实现，<em>PublishSubscribeChannel</em>，但这个实现仅在同一VM实例上工作。使用_NOTIFY/LISTEN_机制，我们将不再有这个限制。</p><p>我们将基于Spring Integration核心中的现成基类_AbstractSubscribableChannel_进行实现。虽然不是绝对必要，但选择这种方法有一些好处：</p><ul><li>管理：对于生产环境很重要，可以暴露关键指标以监控系统的健康状况，并帮助解决性能问题。</li><li>拦截器：允许客户端代码添加_ChannelInterceptors_，可以在消息被处理之前/之后检查消息。</li></ul><p>实现本身由两个主要部分组成：消息传递和分派。</p><h3 id="_5-1-消息传递" tabindex="-1"><a class="header-anchor" href="#_5-1-消息传递"><span>5.1. 消息传递</span></a></h3><p>这个功能对应于通道的生产者端。消息生产者通常会使用_MessageChannel_接口上的标准_send()<em>方法，或者使用一个包装了通道的用户友好接口的_MesssageGateway</em>。</p><p>由于我们利用了_AbstractSubscribableChannel_，它又扩展了_AbstractMessageChannel_，我们所要做的就是实现_doSend()_方法。在这里，我们将使用_NOTIFY_将消息发送到PostgreSQL，然后将其传递给任何已经对该相同通道发出_LISTEN_命令的客户端。</p><p>我们使用通过构造函数传递的_DataSource_和通道名称来获取数据库连接，并分别用作通知的通道名称。</p><p>_prepareNotifyPayload()_方法将传入的_Message_对象转换为适合用作通知有效载荷的JSON字符串：</p><p>这种方法有一个重要的限制：默认情况下，PostgreSQL将通知有效载荷的大小限制在大约8 KB。通常，这对于仅信号事件的消息来说已经足够，但在集成场景中，消息可能携带文件的全部内容，这显然是不够的。</p><p>在这些情况下，更好的方法是将“大”数据部分存储在某些共享存储中（例如，数据库表或S3存储桶），并在消息中发送对它的引用。</p><h3 id="_5-2-消息分派" tabindex="-1"><a class="header-anchor" href="#_5-2-消息分派"><span>5.2. 消息分派</span></a></h3><p>这段代码负责接收来自PostgreSQL的异步通知，并将它们分派给订阅者。由于没有订阅者的情况下监听通知毫无意义，实现将在有人调用_subscribe()_时才启动负责此任务的后台线程：</p><p>同样，当没有更多订阅者时，我们将停止监听器：</p><p>后台监听线程将发出初始_LISTEN_语句，然后循环接收通知：</p><p>对于每个接收到的通知，我们首先将其转换为_Message_，然后我们将实际的传递委托给配置的分派器。<strong>这负责与此任务相关的所有内容，例如调用拦截器，更新指标等</strong>。</p><h3 id="_6-集成示例" tabindex="-1"><a class="header-anchor" href="#_6-集成示例"><span>6. 集成示例</span></a></h3><p>现在我们已经实施了实现，让我们用一个简单的集成场景来测试它。我们将使用这个通道传递_BUY/SELL_ _Order_消息，而在接收端，我们将有一个订阅者接收这些订单，并为每个符号保持这些交易的余额。</p><p>首先，让我们为我们的_SubscribableChannel_创建一个_@Bean_：</p><p>请注意，我们使用提供的数据库_URL和凭据创建了两个_DataSource_对象。第一个是_SingleConnectionDataSource_，我们将其用作接收通知所需的连接供应商的来源。第二个DataSource用于发送通知，并使用PostgreSQL的本地实现。</p><p>其次，我们创建一个_@ServiceActivator_方法来接收订单：</p><p>我们使用一个Semaphore来跟踪接收到的消息。其主要目的是使测试变得更容易，因为我们可以使用它来同步运行测试的主线程与后台接收和处理的消息。</p><p>最后，我们还需要一个_@Transformer_将接收到的消息有效载荷，即_JsonNode_实例，转换为_Order_对象：</p><p>请注意，转换后的消息将转到_orderProcessor_通道，这将由Spring Integration自动创建。除非我们明确定义了这个名称的通道，否则实际的通道将是一个_DirectChannel_，它简单地将生产者和消费者联系在一起。</p><p>或者，我们可以将这个通道定义为_QueueChannel_或类似的通道。这将提供一个缓冲区来存储消息，从而允许我们的系统应对任何临时的消息激增。</p><h3 id="_7-测试" tabindex="-1"><a class="header-anchor" href="#_7-测试"><span>7. 测试</span></a></h3><p>最后，让我们编写一个集成测试，看看所有这些一起工作：</p><p>我们利用Spring的测试设施来实例化所有所需的bean，这样我们就可以简单地使用包装我们通道的_MessageGateway_发送一个订单。一旦我们发送了一条消息，测试就使用_awaitNextMessage()_辅助方法，然后查询总订单值。</p><p>请注意，由于这是一个集成测试，我们必须有一个运行中的PostgreSQL实例和所需的凭据来使用它。</p><h3 id="_8-spring-integration-6用户的注意事项" tabindex="-1"><a class="header-anchor" href="#_8-spring-integration-6用户的注意事项"><span>8. Spring Integration 6用户的注意事项</span></a></h3><p>从6版本开始，Spring Integration提供了_PostgresSubscribableChannel_类，它实现了_SubscribableChannel_。<strong>然而，这个版本需要Spring 6，因此意味着使用Java 17作为开发我们应用程序的基线。</strong></p><p>这个新实现没有本教程中代码的相同有效载荷大小限制，但需要在数据库中创建一个表来存储它。然而，由于Java 8和11仍然代表了现有应用程序的很大一部分，这里描述的技术在一段时间内仍然适用。</p><h3 id="_9-结论" tabindex="-1"><a class="header-anchor" href="#_9-结论"><span>9. 结论</span></a></h3><p>在这个教程中，我们已经展示了如何利用PostgreSQL上的_NOTIFY/LISTEN_机制来实现Spring Integration应用程序中的异步消息传递。</p><p>像往常一样，完整的代码可以在GitHub上找到。</p>',43),o=[p];function i(c,l){return s(),a("div",null,o)}const u=n(e,[["render",i],["__file","2024-07-02-Receiving PostreSQL Push Notifications with Spring Integration.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-Receiving%20PostreSQL%20Push%20Notifications%20with%20Spring%20Integration.html","title":"使用Spring Integration接收PostgreSQL推送通知","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring","PostgreSQL"],"tag":["Spring Integration","NOTIFY/LISTEN"],"head":[["meta",{"name":"keywords","content":"Spring, PostgreSQL, NOTIFY/LISTEN, message notification, asynchronous message delivery"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-Receiving%20PostreSQL%20Push%20Notifications%20with%20Spring%20Integration.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Spring Integration接收PostgreSQL推送通知"}],["meta",{"property":"og:description","content":"使用Spring Integration接收PostgreSQL推送通知 在这个教程中，我们将展示如何使用基于Spring Integration的应用程序与PostgreSQL的_NOTIFY/LISTEN_特性。PostgreSQL提供了一种轻量级的消息通知机制，允许客户端使用常规数据库连接相互发送通知。这种机制使用两个非标准SQL语句，NOTIF..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T17:58:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Integration"}],["meta",{"property":"article:tag","content":"NOTIFY/LISTEN"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T17:58:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Spring Integration接收PostgreSQL推送通知\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T17:58:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Spring Integration接收PostgreSQL推送通知 在这个教程中，我们将展示如何使用基于Spring Integration的应用程序与PostgreSQL的_NOTIFY/LISTEN_特性。PostgreSQL提供了一种轻量级的消息通知机制，允许客户端使用常规数据库连接相互发送通知。这种机制使用两个非标准SQL语句，NOTIF..."},"headers":[{"level":3,"title":"5.1. 消息传递","slug":"_5-1-消息传递","link":"#_5-1-消息传递","children":[]},{"level":3,"title":"5.2. 消息分派","slug":"_5-2-消息分派","link":"#_5-2-消息分派","children":[]},{"level":3,"title":"6. 集成示例","slug":"_6-集成示例","link":"#_6-集成示例","children":[]},{"level":3,"title":"7. 测试","slug":"_7-测试","link":"#_7-测试","children":[]},{"level":3,"title":"8. Spring Integration 6用户的注意事项","slug":"_8-spring-integration-6用户的注意事项","link":"#_8-spring-integration-6用户的注意事项","children":[]},{"level":3,"title":"9. 结论","slug":"_9-结论","link":"#_9-结论","children":[]}],"git":{"createdTime":1719943118000,"updatedTime":1719943118000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.84,"words":1751},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-Receiving PostreSQL Push Notifications with Spring Integration.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这个教程中，我们将展示如何使用基于Spring Integration的应用程序与PostgreSQL的_NOTIFY/LISTEN_特性。PostgreSQL提供了一种轻量级的消息通知机制，允许客户端使用常规数据库连接相互发送通知。这种机制使用两个非标准SQL语句，<em>NOTIFY_和_LISTEN</em>，因此得名。</p>\\n<p>我们将基于Spring Integration核心库和PostgreSQL JDBC驱动进行操作：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>``org.springframework.integration``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>``spring-integration-core``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>``6.0.0``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>``org.postgresql``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>``postgresql``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>``42.3.8``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n</code></pre></div>","autoDesc":true}');export{u as comp,d as data};
