import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-BX3-P94R.js";const t={},p=e(`<hr><h1 id="入门指南-apache-pulsar-与-spring-boot-集成" tabindex="-1"><a class="header-anchor" href="#入门指南-apache-pulsar-与-spring-boot-集成"><span>入门指南：Apache Pulsar 与 Spring Boot 集成</span></a></h1><p>Apache Pulsar 是一个分布式发布-订阅消息系统。虽然 Apache Pulsar 提供的功能与 Apache Kafka 类似，但 Pulsar 旨在克服 Kafka 在高延迟、低吞吐量、扩展和地理复制等方面的限制，并且更多。当处理需要实时处理的大量数据时，Apache Pulsar 是一个很好的选择。</p><p>在本教程中，我们将看到如何将 Apache Pulsar 与我们的 Spring Boot 应用程序集成。我们将利用 Pulsar 的 Spring Boot Starter 配置的 <em>PulsarTemplate</em> 和 <em>PulsarListener</em>。我们还将看到如何根据我们的要求修改它们的默认配置。</p><h2 id="_2-maven-依赖" tabindex="-1"><a class="header-anchor" href="#_2-maven-依赖"><span>2. Maven 依赖</span></a></h2><p>我们首先按照 Apache Pulsar 简介中描述的运行一个独立的 Apache Pulsar 服务器。</p><p>接下来，让我们将 <em>spring-pulsar-spring-boot-starter</em> 库添加到我们的项目中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`org.springframework.pulsar\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`spring-pulsar-spring-boot-starter\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`0.2.0\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-pulsarclient" tabindex="-1"><a class="header-anchor" href="#_3-pulsarclient"><span>3. <em>PulsarClient</em></span></a></h2><p>为了与 Pulsar 服务器交互，我们需要配置一个 <em>PulsarClient</em>。默认情况下，<strong>Spring 会自动配置一个连接到 localhost:6650 上 Pulsar 服务器的 <em>PulsarClient</em></strong>：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">spring</span><span class="token punctuation">:</span>
<span class="token key attr-name">  pulsar</span><span class="token punctuation">:</span>
<span class="token key attr-name">    client</span><span class="token punctuation">:</span>
<span class="token key attr-name">      service-url</span><span class="token punctuation">:</span> <span class="token value attr-value">pulsar://localhost:6650</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以更改此配置以在不同的地址上建立连接。</p><p><strong>要连接到安全服务器，我们可以使用 <em>pulsar+ssl</em> 而不是 <em>pulsar</em>。</strong> 我们还可以通过向 <em>application.yml</em> 添加 <em>spring.pulsar.client.</em> 属性来配置诸如连接超时、认证和内存限制等属性。</p><h2 id="_4-为自定义对象指定模式" tabindex="-1"><a class="header-anchor" href="#_4-为自定义对象指定模式"><span>4. 为自定义对象指定模式</span></a></h2><p>我们将使用一个简单的 <em>User</em> 类作为我们的应用程序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> email<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span>

    <span class="token comment">// 标准构造函数，getter 和 setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Spring-Pulsar 自动检测原始数据类型并生成相关的模式。但是，<strong>如果我们需要使用自定义的 JSON 对象，我们将不得不为 <em>PulsarClient</em> 配置其模式信息</strong>：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">spring</span><span class="token punctuation">:</span>
<span class="token key attr-name">  pulsar</span><span class="token punctuation">:</span>
<span class="token key attr-name">    defaults</span><span class="token punctuation">:</span>
<span class="token key attr-name">      type-mappings</span><span class="token punctuation">:</span>
<span class="token key attr-name">        -</span> <span class="token value attr-value">message-type: com.baeldung.springpulsar.User</span>
<span class="token key attr-name">          schema-info</span><span class="token punctuation">:</span>
<span class="token key attr-name">            schema-type</span><span class="token punctuation">:</span> <span class="token value attr-value">JSON</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，<em>message-type</em> 属性接受消息类的完全限定名，<em>schema-type</em> 提供要使用的模式类型的信息。对于复杂对象，<em>schema-type</em> 属性接受 <em>AVRO</em> 或 <em>JSON</em> 值。</p><p>尽管使用属性文件指定模式是首选方法，我们也可以通过 bean 提供此模式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">SchemaResolverCustomizer</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DefaultSchemaResolver</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">schemaResolverCustomizer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>schemaResolver<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        schemaResolver<span class="token punctuation">.</span><span class="token function">addCustomSchemaMapping</span><span class="token punctuation">(</span><span class="token class-name">User</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">Schema</span><span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span><span class="token class-name">User</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此配置应该同时添加到生产者和监听器应用程序中。</p><h2 id="_5-发布者" tabindex="-1"><a class="header-anchor" href="#_5-发布者"><span>5. 发布者</span></a></h2><p>要发布 Pulsar 主题上的消息，我们将使用 <em>PulsarTemplate</em>。<em>PulsarTemplate</em> 实现了 <em>PulsarOperations</em> 接口，并提供了同步和异步形式发布记录的方法。<strong><em>send</em> 方法阻塞调用以提供同步操作能力，而 <em>sendAsync</em> 方法提供非阻塞的异步操作。</strong></p><p>在本教程中，我们将使用同步操作发布记录。</p><h3 id="_5-1-发布消息" tabindex="-1"><a class="header-anchor" href="#_5-1-发布消息"><span>5.1. 发布消息</span></a></h3><p>Spring Boot 自动配置了一个现成的 <em>PulsarTemplate</em>，用于向指定主题发布记录。</p><p>让我们创建一个生产者，将 <em>String</em> 消息发布到队列：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PulsarProducer</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">PulsarTemplate</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` stringTemplate<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">STRING_TOPIC</span> <span class="token operator">=</span> <span class="token string">&quot;string-topic&quot;</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sendStringMessageToPulsarTopic</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">PulsarClientException</span> <span class="token punctuation">{</span>
        stringTemplate<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token constant">STRING_TOPIC</span><span class="token punctuation">,</span> str<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们尝试将一个 <em>User</em> 对象发送到一个新的队列：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token class-name">PulsarTemplate</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>\` template<span class="token punctuation">;</span>

<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">USER_TOPIC</span> <span class="token operator">=</span> <span class="token string">&quot;user-topic&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sendMessageToPulsarTopic</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">PulsarClientException</span> <span class="token punctuation">{</span>
    template<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token constant">USER_TOPIC</span><span class="token punctuation">,</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码片段中，我们使用 <em>PulsarTemplate</em> 将 <em>User</em> 类的对象发送到名为 <em>user-topic</em> 的 Apache Pulsar 主题。</p><h3 id="_5-2-生产者端自定义" tabindex="-1"><a class="header-anchor" href="#_5-2-生产者端自定义"><span>5.2. 生产者端自定义</span></a></h3><p><em>PulsarTemplate</em> 接受 <em>TypedMessageBuilderCustomizer</em> 来配置传出消息和 <em>ProducerBuilderCustomizer</em> 来自定义生产者的属性。</p><p>我们可以使用 <em>TypedMessageBuilderCustomizer</em> 来配置消息延迟、在特定时间发送、禁用复制并提供额外的属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sendMessageToPulsarTopic</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">PulsarClientException</span> <span class="token punctuation">{</span>
    template<span class="token punctuation">.</span><span class="token function">newMessage</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">withMessageCustomizer</span><span class="token punctuation">(</span>mc <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        mc<span class="token punctuation">.</span><span class="token function">deliverAfter</span><span class="token punctuation">(</span><span class="token number">10L</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>ProducerBuilderCustomizer</em> 可以用来添加访问模式、自定义消息路由器和拦截器，并启用或禁用分块和批处理：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sendMessageToPulsarTopic</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">PulsarClientException</span> <span class="token punctuation">{</span>
    template<span class="token punctuation">.</span><span class="token function">newMessage</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">withProducerCustomizer</span><span class="token punctuation">(</span>pc <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        pc<span class="token punctuation">.</span><span class="token function">accessMode</span><span class="token punctuation">(</span><span class="token class-name">ProducerAccessMode<span class="token punctuation">.</span>Shared</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-消费者" tabindex="-1"><a class="header-anchor" href="#_6-消费者"><span>6. 消费者</span></a></h2><p>发布消息到我们的主题后，我们现在将为同一主题建立一个监听器。<strong>要启用对主题的监听，我们需要用 <em>@PulsarListener</em> 注解装饰监听方法。</strong></p><p>Spring Boot 为监听方法配置了所有必要的组件。</p><p><strong>我们还需要使用 <em>@EnablePulsar</em> 来使用 <em>PulsarListener</em>。</strong></p><h3 id="_6-1-接收消息" tabindex="-1"><a class="header-anchor" href="#_6-1-接收消息"><span>6.1. 接收消息</span></a></h3><p>我们将首先为前面部分创建的 <em>string-topic</em> 创建一个监听方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PulsarConsumer</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">STRING_TOPIC</span> <span class="token operator">=</span> <span class="token string">&quot;string-topic&quot;</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@PulsarListener</span><span class="token punctuation">(</span>
      subscriptionName <span class="token operator">=</span> <span class="token string">&quot;string-topic-subscription&quot;</span><span class="token punctuation">,</span>
      topics <span class="token operator">=</span> <span class="token constant">STRING_TOPIC</span><span class="token punctuation">,</span>
      subscriptionType <span class="token operator">=</span> <span class="token class-name">SubscriptionType<span class="token punctuation">.</span>Shared</span>
    <span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">stringTopicListener</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Received String message: {}&quot;</span><span class="token punctuation">,</span> str<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，《PulsarListener》注解中，我们已经配置了这个方法将监听的 <em>topicName</em> 在 <em>topicName</em> 属性中，并在 <em>subscriptionName</em> 属性中给出了一个订阅名称。</p><p>现在，让我们为 <em>User</em> 类使用的 <em>user-topic</em> 创建一个监听方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">USER_TOPIC</span> <span class="token operator">=</span> <span class="token string">&quot;user-topic&quot;</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@PulsarListener</span><span class="token punctuation">(</span>
    subscriptionName <span class="token operator">=</span> <span class="token string">&quot;user-topic-subscription&quot;</span><span class="token punctuation">,</span>
    topics <span class="token operator">=</span> <span class="token constant">USER_TOPIC</span><span class="token punctuation">,</span>
    schemaType <span class="token operator">=</span> <span class="token class-name">SchemaType</span><span class="token punctuation">.</span><span class="token constant">JSON</span>
<span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">userTopicListener</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Received user object with email: {}&quot;</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span><span class="token function">getEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了前面 <em>Listener</em> 方法中提供的属性外，我们还添加了一个 <em>schemaType</em> 属性，其值与生产者中的相同。</p><p>我们还将 <em>@EnablePulsar</em> 注解添加到我们的主类中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@EnablePulsar</span>
<span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SpringPulsarApplication</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">SpringPulsarApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-消费者端自定义" tabindex="-1"><a class="header-anchor" href="#_6-2-消费者端自定义"><span>6.2. 消费者端自定义</span></a></h3><p>除了订阅名称和模式类型外，《PulsarListener》还可以用来配置诸如自动启动、批处理和确认模式等属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@PulsarListener</span><span class="token punctuation">(</span>
  subscriptionName <span class="token operator">=</span> <span class="token string">&quot;user-topic-subscription&quot;</span><span class="token punctuation">,</span>
  topics <span class="token operator">=</span> <span class="token constant">USER_TOPIC</span><span class="token punctuation">,</span>
  subscriptionType <span class="token operator">=</span> <span class="token class-name">SubscriptionType<span class="token punctuation">.</span>Shared</span><span class="token punctuation">,</span>
  schemaType <span class="token operator">=</span> <span class="token class-name">SchemaType</span><span class="token punctuation">.</span><span class="token constant">JSON</span><span class="token punctuation">,</span>
  ackMode <span class="token operator">=</span> <span class="token class-name">AckMode</span><span class="token punctuation">.</span><span class="token constant">RECORD</span><span class="token punctuation">,</span>
  properties <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;ackTimeout=60s&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">userTopicListener</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Received user object with email: {}&quot;</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span><span class="token function">getEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们将确认模式设置为 <em>Record</em> 并将确认超时设置为 60 秒。</p><h2 id="_7-使用死信主题" tabindex="-1"><a class="header-anchor" href="#_7-使用死信主题"><span>7. 使用死信主题</span></a></h2><p>如果消息确认超时或服务器收到 <em>nack</em>，Pulsar 会尝试重新交付消息一定次数。这些重试用尽后，<strong>这些未交付的消息可以发送到称为 <em>死信队列</em> (DLQ) 的队列中。</strong></p><p>此选项仅用于 <em>Shared</em> 订阅类型。为了为我们的 <em>user-topic</em> 队列配置 DLQ，我们首先将创建一个 <em>DeadLetterPolicy</em> bean，它将定义重新交付尝试的次数以及用作 DLQ 的队列名称：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">USER_DEAD_LETTER_TOPIC</span> <span class="token operator">=</span> <span class="token string">&quot;user-dead-letter-topic&quot;</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Bean</span>
<span class="token class-name">DeadLetterPolicy</span> <span class="token function">deadLetterPolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">DeadLetterPolicy</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">maxRedeliverCount</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">deadLetterTopic</span><span class="token punctuation">(</span><span class="token constant">USER_DEAD_LETTER_TOPIC</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们将此策略添加到我们之前创建的 <em>PulsarListener</em> 中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@PulsarListener</span><span class="token punctuation">(</span>
  subscriptionName <span class="token operator">=</span> <span class="token string">&quot;user-topic-subscription&quot;</span><span class="token punctuation">,</span>
  topics <span class="token operator">=</span> <span class="token constant">USER_TOPIC</span><span class="token punctuation">,</span>
  subscriptionType <span class="token operator">=</span> <span class="token class-name">SubscriptionType<span class="token punctuation">.</span>Shared</span><span class="token punctuation">,</span>
  schemaType <span class="token operator">=</span> <span class="token class-name">SchemaType</span><span class="token punctuation">.</span><span class="token constant">JSON</span><span class="token punctuation">,</span>
  deadLetterPolicy <span class="token operator">=</span> <span class="token string">&quot;deadLetterPolicy&quot;</span><span class="token punctuation">,</span>
  properties <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;ackTimeout=60s&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">userTopicListener</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Received user object with email: {}&quot;</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span><span class="token function">getEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们已经配置了 <em>userTopicListener</em> 使用我们之前创建的 <em>deadLetterPolicy</em>，并且我们已经配置了 60 秒的确认时间。</p><p>我们可以创建一个单独的 <em>Listener</em> 来处理 DQL 中的消息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@PulsarListener</span><span class="token punctuation">(</span>
  subscriptionName <span class="token operator">=</span> <span class="token string">&quot;dead-letter-topic-subscription&quot;</span><span class="token punctuation">,</span>
  topics <span class="token operator">=</span> <span class="token constant">USER_DEAD_LETTER_TOPIC</span><span class="token punctuation">,</span>
  subscriptionType <span class="token operator">=</span> <span class="token class-name">SubscriptionType<span class="token punctuation">.</span>Shared</span>
<span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">userDlqTopicListener</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Received user object in user-DLQ with email: {}&quot;</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span><span class="token function">getEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在本教程中，我们看到了如何使用 Apache Pulsar 与我们的 Spring Boot 应用程序以及一些改变默认配置的方法。</p><p>正如往常一样，示例实现可以在 GitHub 上找到。</p><p><a href="https://www.baeldung.com/" target="_blank" rel="noopener noreferrer">Baeldung 官网</a></p><p>OK</p>`,69),c=[p];function o(i,l){return a(),s("div",null,c)}const d=n(t,[["render",o],["__file","2024-07-02-Getting Started With Apache Pulsar and Spring Boot.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-Getting%20Started%20With%20Apache%20Pulsar%20and%20Spring%20Boot.html","title":"入门指南：Apache Pulsar 与 Spring Boot 集成","lang":"zh-CN","frontmatter":{"date":"2024-07-02T00:00:00.000Z","category":["Spring Boot","Apache Pulsar"],"tag":["Spring Boot","Apache Pulsar","Messaging System"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Apache Pulsar, PulsarTemplate, PulsarListener, Publisher-Subscriber"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-Getting%20Started%20With%20Apache%20Pulsar%20and%20Spring%20Boot.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"入门指南：Apache Pulsar 与 Spring Boot 集成"}],["meta",{"property":"og:description","content":"入门指南：Apache Pulsar 与 Spring Boot 集成 Apache Pulsar 是一个分布式发布-订阅消息系统。虽然 Apache Pulsar 提供的功能与 Apache Kafka 类似，但 Pulsar 旨在克服 Kafka 在高延迟、低吞吐量、扩展和地理复制等方面的限制，并且更多。当处理需要实时处理的大量数据时，Apache..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T08:55:45.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"Apache Pulsar"}],["meta",{"property":"article:tag","content":"Messaging System"}],["meta",{"property":"article:published_time","content":"2024-07-02T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T08:55:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"入门指南：Apache Pulsar 与 Spring Boot 集成\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-02T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T08:55:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"入门指南：Apache Pulsar 与 Spring Boot 集成 Apache Pulsar 是一个分布式发布-订阅消息系统。虽然 Apache Pulsar 提供的功能与 Apache Kafka 类似，但 Pulsar 旨在克服 Kafka 在高延迟、低吞吐量、扩展和地理复制等方面的限制，并且更多。当处理需要实时处理的大量数据时，Apache..."},"headers":[{"level":2,"title":"2. Maven 依赖","slug":"_2-maven-依赖","link":"#_2-maven-依赖","children":[]},{"level":2,"title":"3. PulsarClient","slug":"_3-pulsarclient","link":"#_3-pulsarclient","children":[]},{"level":2,"title":"4. 为自定义对象指定模式","slug":"_4-为自定义对象指定模式","link":"#_4-为自定义对象指定模式","children":[]},{"level":2,"title":"5. 发布者","slug":"_5-发布者","link":"#_5-发布者","children":[{"level":3,"title":"5.1. 发布消息","slug":"_5-1-发布消息","link":"#_5-1-发布消息","children":[]},{"level":3,"title":"5.2. 生产者端自定义","slug":"_5-2-生产者端自定义","link":"#_5-2-生产者端自定义","children":[]}]},{"level":2,"title":"6. 消费者","slug":"_6-消费者","link":"#_6-消费者","children":[{"level":3,"title":"6.1. 接收消息","slug":"_6-1-接收消息","link":"#_6-1-接收消息","children":[]},{"level":3,"title":"6.2. 消费者端自定义","slug":"_6-2-消费者端自定义","link":"#_6-2-消费者端自定义","children":[]}]},{"level":2,"title":"7. 使用死信主题","slug":"_7-使用死信主题","link":"#_7-使用死信主题","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1719910545000,"updatedTime":1719910545000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.8,"words":1741},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-Getting Started With Apache Pulsar and Spring Boot.md","localizedDate":"2024年7月2日","excerpt":"<hr>\\n<h1>入门指南：Apache Pulsar 与 Spring Boot 集成</h1>\\n<p>Apache Pulsar 是一个分布式发布-订阅消息系统。虽然 Apache Pulsar 提供的功能与 Apache Kafka 类似，但 Pulsar 旨在克服 Kafka 在高延迟、低吞吐量、扩展和地理复制等方面的限制，并且更多。当处理需要实时处理的大量数据时，Apache Pulsar 是一个很好的选择。</p>\\n<p>在本教程中，我们将看到如何将 Apache Pulsar 与我们的 Spring Boot 应用程序集成。我们将利用 Pulsar 的 Spring Boot Starter 配置的 <em>PulsarTemplate</em> 和 <em>PulsarListener</em>。我们还将看到如何根据我们的要求修改它们的默认配置。</p>","autoDesc":true}');export{d as comp,k as data};
