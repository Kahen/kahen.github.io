import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-B5SPsEv6.js";const p={},e=t(`<hr><h1 id="在spring-boot中动态管理kafka侦听器" tabindex="-1"><a class="header-anchor" href="#在spring-boot中动态管理kafka侦听器"><span>在Spring Boot中动态管理Kafka侦听器</span></a></h1><p>无论你是刚开始还是拥有多年经验，<strong>Spring Boot</strong>显然是构建Web应用程序的不错选择。</p><p>Jmix建立在这个非常强大和成熟的Boot堆栈之上，允许开发人员构建并交付<strong>全栈Web****应用程序</strong>，而无需编写前端代码。也非常灵活，从简单的Web GUI CRUD应用程序到复杂的企业解决方案。</p><p>具体来说，<strong>Jmix平台</strong>包括一个构建在<strong>Spring Boot, JPA和Vaadin</strong>之上的框架，并附带Jmix Studio，这是一个<strong>IntelliJ IDEA插件</strong>，配备了一套开发人员生产力工具。</p><p>该平台提供了相互连接的<strong>现成****插件</strong>，用于报告生成、BPM、地图、从数据库即时生成Web应用程序：</p><p><strong>&gt;&gt; 成为高效的全栈开发人员使用Jmix</strong></p><p>既然新版的_REST With Spring -_ <strong>“REST With Spring Boot”</strong> 终于发布了，当前价格将在6月22日之前有效，之后将永久增加50美元。</p><p><strong>&gt;&gt; 立即获取访问权限</strong></p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在当今的事件驱动架构中，有效管理数据流至关重要。Apache Kafka是这方面的一个受欢迎的选择，但将其集成到我们的应用程序中也有其挑战，尽管有Spring Kafka等辅助框架。一个主要的挑战是实现适当的动态侦听器管理，这为我们的应用程序提供了适应变化的工作负载和维护的关键灵活性和控制。</p><p>在本教程中，我们将学习<strong>如何在Spring Boot应用程序中动态启动和停止Kafka侦听器</strong>。</p><h2 id="_2-先决条件" tabindex="-1"><a class="header-anchor" href="#_2-先决条件"><span>2. 先决条件</span></a></h2><p>首先，让我们将_spring-kafka_依赖项导入我们的项目：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.springframework.kafka\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`spring-kafka\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`3.1.2\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-配置kafka消费者" tabindex="-1"><a class="header-anchor" href="#_3-配置kafka消费者"><span>3. 配置Kafka消费者</span></a></h2><p>生产者是将（写入）事件发布到Kafka主题的应用程序。</p><p>在整个教程中，我们将使用单元测试来模拟生产者向Kafka主题发送事件。消费者是订阅主题并处理事件流的侦听器，在我们的应用程序中由侦听器表示。此侦听器配置为处理来自Kafka的传入消息。</p><p>让我们通过_KafkaConsumerConfig_类配置我们的Kafka消费者，其中包含Kafka代理的地址、消费者组ID以及键和值的反序列化器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">DefaultKafkaConsumerFactory</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">UserEvent</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">consumerFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Map</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\` props <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    props<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ConsumerConfig</span><span class="token punctuation">.</span><span class="token constant">BOOTSTRAP_SERVERS_CONFIG</span><span class="token punctuation">,</span> bootstrapServers<span class="token punctuation">)</span><span class="token punctuation">;</span>
    props<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ConsumerConfig</span><span class="token punctuation">.</span><span class="token constant">KEY_DESERIALIZER_CLASS_CONFIG</span><span class="token punctuation">,</span> <span class="token class-name">StringDeserializer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    props<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ConsumerConfig</span><span class="token punctuation">.</span><span class="token constant">VALUE_DESERIALIZER_CLASS_CONFIG</span><span class="token punctuation">,</span> <span class="token class-name">JsonDeserializer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    props<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ConsumerConfig</span><span class="token punctuation">.</span><span class="token constant">AUTO_OFFSET_RESET_CONFIG</span><span class="token punctuation">,</span> <span class="token string">&quot;earliest&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    props<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">JsonDeserializer</span><span class="token punctuation">.</span><span class="token constant">TRUSTED_PACKAGES</span><span class="token punctuation">,</span> <span class="token string">&quot;com.baeldung.spring.kafka.start.stop.consumer&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DefaultKafkaConsumerFactory</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>props<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">StringDeserializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">JsonDeserializer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">UserEvent</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-配置kafka侦听器" tabindex="-1"><a class="header-anchor" href="#_4-配置kafka侦听器"><span>4. 配置Kafka侦听器</span></a></h2><p><strong>在Spring Kafka中，<strong>使用</strong>@KafkaListener</strong>注解的方法创建一个侦听器，该侦听器从指定主题消费消息。为了定义它，让我们声明一个_UserEventListener_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@KafkaListener</span><span class="token punctuation">(</span>id <span class="token operator">=</span> <span class="token class-name">Constants</span><span class="token punctuation">.</span><span class="token constant">LISTENER_ID</span><span class="token punctuation">,</span> topics <span class="token operator">=</span> <span class="token class-name">Constants</span><span class="token punctuation">.</span><span class="token constant">MULTI_PARTITION_TOPIC</span><span class="token punctuation">,</span> groupId <span class="token operator">=</span> <span class="token string">&quot;test-group&quot;</span><span class="token punctuation">,</span>
  containerFactory <span class="token operator">=</span> <span class="token string">&quot;kafkaListenerContainerFactory&quot;</span><span class="token punctuation">,</span> autoStartup <span class="token operator">=</span> <span class="token string">&quot;false&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">processUserEvent</span><span class="token punctuation">(</span><span class="token class-name">UserEvent</span> userEvent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Received UserEvent: &quot;</span> <span class="token operator">+</span> userEvent<span class="token punctuation">.</span><span class="token function">getUserEventId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    userEventStore<span class="token punctuation">.</span><span class="token function">addUserEvent</span><span class="token punctuation">(</span>userEvent<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述侦听器等待来自_multi_partition_topic_主题的消息，并使用_processUserEvent()<em>方法处理它们。我们将_groupId_指定为_test-group</em>，确保消费者成为更广泛组的一部分，从而促进跨多个实例的分布式处理。</p><p>我们使用_id_属性为每个侦听器分配一个唯一标识符。在这个例子中，分配的侦听器ID是_listener-id-1_。</p><p><strong>autoStartup属性让我们控制侦听器是否在应用程序初始化时启动</strong>。在我们的示例中，我们将它设置为_false_，这意味着当应用程序启动时，侦听器不会自动启动。此配置为我们提供了手动启动侦听器的灵活性。</p><p>这种手动启动可以由各种事件触发，例如新用户注册、应用程序内的特定条件，例如达到某个数据量阈值，或管理操作，例如通过管理界面手动启动侦听器。例如，如果一个在线零售应用程序在限时销售期间检测到流量激增，它可以自动启动额外的侦听器来处理增加的负载，优化性能。</p><p>_UserEventStore_作为侦听器接收事件的临时存储：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserEventStore</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserEvent</span><span class="token punctuation">&gt;</span></span>\`\` userEvents <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addUserEvent</span><span class="token punctuation">(</span><span class="token class-name">UserEvent</span> userEvent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        userEvents<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>userEvent<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserEvent</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">getUserEvents</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> userEvents<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">clearUserEvents</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>userEvents<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-动态控制侦听器" tabindex="-1"><a class="header-anchor" href="#_5-动态控制侦听器"><span><strong>5. 动态控制侦听器</strong></span></a></h2><p>让我们创建一个_KafkaListenerControlService_，使用_KafkaListenerEndpointRegistry_动态启动和停止Kafka侦听器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">KafkaListenerControlService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">KafkaListenerEndpointRegistry</span> registry<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">startListener</span><span class="token punctuation">(</span><span class="token class-name">String</span> listenerId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">MessageListenerContainer</span> listenerContainer <span class="token operator">=</span> registry<span class="token punctuation">.</span><span class="token function">getListenerContainer</span><span class="token punctuation">(</span>listenerId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>listenerContainer <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>listenerContainer<span class="token punctuation">.</span><span class="token function">isRunning</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            listenerContainer<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">stopListener</span><span class="token punctuation">(</span><span class="token class-name">String</span> listenerId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">MessageListenerContainer</span> listenerContainer <span class="token operator">=</span> registry<span class="token punctuation">.</span><span class="token function">getListenerContainer</span><span class="token punctuation">(</span>listenerId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>listenerContainer <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> listenerContainer<span class="token punctuation">.</span><span class="token function">isRunning</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            listenerContainer<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>_KafkaListenerControlService_可以精确地根据分配的ID管理单个侦听器实例</strong>。_startListener()_和_stopListener()_方法都使用_listenerId_作为参数，允许我们根据需要启动和停止来自主题的消息消费。</p><p><strong>_KafkaListenerEndpointRegistry_作为Spring应用程序上下文中定义的所有Kafka侦听器端点的中央存储库</strong>。它监视这些侦听器容器，从而允许对它们的状态进行程序控制，无论是启动、停止还是暂停。这种能力对于需要实时调整其消息处理活动而无需重新启动整个应用程序的应用程序至关重要。</p><h2 id="_6-验证动态侦听器控制" tabindex="-1"><a class="header-anchor" href="#_6-验证动态侦听器控制"><span>6. 验证动态侦听器控制</span></a></h2><p>接下来，让我们专注于测试Spring Boot应用程序中Kafka侦听器的动态启动和停止能力。首先，让我们启动侦听器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>kafkaListenerControlService<span class="token punctuation">.</span><span class="token function">startListener</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span><span class="token constant">LISTENER_ID</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后我们通过发送然后处理一个测试事件来验证侦听器是否被激活：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">UserEvent</span> startUserEventTest <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserEvent</span><span class="token punctuation">(</span><span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
producer<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ProducerRecord</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span><span class="token constant">MULTI_PARTITION_TOPIC</span><span class="token punctuation">,</span> startUserEventTest<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">untilAsserted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>userEventStore<span class="token punctuation">.</span><span class="token function">getUserEvents</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>userEventStore<span class="token punctuation">.</span><span class="token function">clearUserEvents</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在侦听器已经激活，我们将发送一批十条消息进行处理。在发送四条消息后，我们将停止侦听器，然后发送剩余的消息到Kafka主题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">long</span> count <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> count \`<span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">;</span> count<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">UserEvent</span> userEvent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserEvent</span><span class="token punctuation">(</span><span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">RecordMetadata</span><span class="token punctuation">&gt;</span></span>\` future <span class="token operator">=</span> producer<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ProducerRecord</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span><span class="token constant">MULTI_PARTITION_TOPIC</span><span class="token punctuation">,</span> userEvent<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">RecordMetadata</span> metadata <span class="token operator">=</span> future<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">==</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">untilAsserted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>userEventStore<span class="token punctuation">.</span><span class="token function">getUserEvents</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>kafkaListenerControlService<span class="token punctuation">.</span><span class="token function">stopListener</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span><span class="token constant">LISTENER_ID</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>userEventStore<span class="token punctuation">.</span><span class="token function">clearUserEvents</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;User Event ID: &quot;</span> <span class="token operator">+</span> userEvent<span class="token punctuation">.</span><span class="token function">getUserEventId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;, Partition : &quot;</span> <span class="token operator">+</span> metadata<span class="token punctuation">.</span><span class="token function">partition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在启动侦听器之前，我们将验证事件存储中没有消息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>userEventStore<span class="token punctuation">.</span><span class="token function">getUserEvents</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
kafkaListenerControlService<span class="token punctuation">.</span><span class="token function">startListener</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span><span class="token constant">LISTENER_ID</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">untilAsserted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>userEventStore<span class="token punctuation">.</span><span class="token function">getUserEvents</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
kafkaListenerControlService<span class="token punctuation">.</span><span class="token function">stopListener</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span><span class="token constant">LISTENER_ID</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦侦听器再次启动，它将处理我们在侦听器停止后发送到Kafka主题的剩余六条消息。这个测试展示了Spring Boot应用程序动态管理Kafka侦听器的能力。</p><h2 id="_7-使用案例" tabindex="-1"><a class="header-anchor" href="#_7-使用案例"><span>7. 使用案例</span></a></h2><p>动态侦听器管理在需要高度适应性的场景中表现出色。例如，在高峰负载时段，我们可以动态启动额外的侦听器来提高吞吐量并减少处理时间。相反，在维护或低流量期间，我们可以停止侦听器以节省资源。这种灵活性也有助于在特性标志后面部署新功能，允许无缝的即时调整，而不影响整个系统。</p><p>让我们考虑一个场景，其中电子商务平台引入了一个新的推荐引擎，旨在通过根据浏览历史和购买模式推荐产品来增强用户体验。在全面推出之前，我们决定在其后部署特性标志以验证此功能的有效性。</p><p>激活此特性标志将启动Kafka侦听器。当最终用户与平台交互时，由Kafka侦听器驱动的推荐引擎处理传入的用户活动数据流，以生成个性化的产品推荐。</p><p>当我们停用特性标志时，我们将停止Kafka侦听器，平台将默认回退到其现有的推荐引擎。这确保了无论新引擎的测试阶段如何，都能提供无缝的用户体验。</p><p>在功能处于活动状态时，我们积极收集数据，监控性能指标，并对推荐引擎进行调整。我们重复进行多次功能测试，直到达到期望的结果。</p><p>通过这个迭代过程，动态侦听器管理被证明是一个有价值的工具。它允许无缝引入新功能。</p><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在本文中，我们讨论了Spring Boot与Kafka的集成，重点关注动态管理Kafka侦听器。<strong>这种能力对于管理波动的工作负载和执行常规维护至关重要</strong>。此外，它还支持特性切换，根据流量模式扩展服务，并管理具有特定触发器的事件驱动工作流。</p><h2 id="如往常一样-示例的源代码可在github上找到。" tabindex="-1"><a class="header-anchor" href="#如往常一样-示例的源代码可在github上找到。"><span>如往常一样，示例的源代码可在GitHub上找到。</span></a></h2><p>OK</p>`,55),o=[e];function c(i,l){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","2024-06-20-Dynamically Managing Kafka Listeners in Spring Boot.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Dynamically%20Managing%20Kafka%20Listeners%20in%20Spring%20Boot.html","title":"在Spring Boot中动态管理Kafka侦听器","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Spring Boot","Apache Kafka"],"tag":["Spring Kafka","Kafka Listeners"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Apache Kafka, Kafka Listeners, Dynamic Listener Management"}],["meta",{"name":"description","content":"Learn how to dynamically manage Kafka listeners in Spring Boot applications to adapt to changing workloads and for feature toggling."}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Dynamically%20Managing%20Kafka%20Listeners%20in%20Spring%20Boot.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Spring Boot中动态管理Kafka侦听器"}],["meta",{"property":"og:description","content":"在Spring Boot中动态管理Kafka侦听器 无论你是刚开始还是拥有多年经验，Spring Boot显然是构建Web应用程序的不错选择。 Jmix建立在这个非常强大和成熟的Boot堆栈之上，允许开发人员构建并交付全栈Web****应用程序，而无需编写前端代码。也非常灵活，从简单的Web GUI CRUD应用程序到复杂的企业解决方案。 具体来说，J..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Kafka"}],["meta",{"property":"article:tag","content":"Kafka Listeners"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Spring Boot中动态管理Kafka侦听器\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Spring Boot中动态管理Kafka侦听器 无论你是刚开始还是拥有多年经验，Spring Boot显然是构建Web应用程序的不错选择。 Jmix建立在这个非常强大和成熟的Boot堆栈之上，允许开发人员构建并交付全栈Web****应用程序，而无需编写前端代码。也非常灵活，从简单的Web GUI CRUD应用程序到复杂的企业解决方案。 具体来说，J..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 先决条件","slug":"_2-先决条件","link":"#_2-先决条件","children":[]},{"level":2,"title":"3. 配置Kafka消费者","slug":"_3-配置kafka消费者","link":"#_3-配置kafka消费者","children":[]},{"level":2,"title":"4. 配置Kafka侦听器","slug":"_4-配置kafka侦听器","link":"#_4-配置kafka侦听器","children":[]},{"level":2,"title":"5. 动态控制侦听器","slug":"_5-动态控制侦听器","link":"#_5-动态控制侦听器","children":[]},{"level":2,"title":"6. 验证动态侦听器控制","slug":"_6-验证动态侦听器控制","link":"#_6-验证动态侦听器控制","children":[]},{"level":2,"title":"7. 使用案例","slug":"_7-使用案例","link":"#_7-使用案例","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]},{"level":2,"title":"如往常一样，示例的源代码可在GitHub上找到。","slug":"如往常一样-示例的源代码可在github上找到。","link":"#如往常一样-示例的源代码可在github上找到。","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":7.27,"words":2181},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Dynamically Managing Kafka Listeners in Spring Boot.md","localizedDate":"2024年6月21日","excerpt":"<hr>\\n<h1>在Spring Boot中动态管理Kafka侦听器</h1>\\n<p>无论你是刚开始还是拥有多年经验，<strong>Spring Boot</strong>显然是构建Web应用程序的不错选择。</p>\\n<p>Jmix建立在这个非常强大和成熟的Boot堆栈之上，允许开发人员构建并交付<strong>全栈Web****应用程序</strong>，而无需编写前端代码。也非常灵活，从简单的Web GUI CRUD应用程序到复杂的企业解决方案。</p>\\n<p>具体来说，<strong>Jmix平台</strong>包括一个构建在<strong>Spring Boot, JPA和Vaadin</strong>之上的框架，并附带Jmix Studio，这是一个<strong>IntelliJ IDEA插件</strong>，配备了一套开发人员生产力工具。</p>","autoDesc":true}');export{r as comp,d as data};
