import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-c243dxVF.js";const e={},p=t(`<h1 id="在kafka消费者中实现重试" tabindex="-1"><a class="header-anchor" href="#在kafka消费者中实现重试"><span>在Kafka消费者中实现重试</span></a></h1><p>在本教程中，我们将讨论在Kafka中实现重试的重要性。我们将探索在Spring Boot上实现它的各种选项，并学习最佳实践，以最大化Kafka消费者的可靠性和弹性。</p><p>如果我们是第一次在Spring上配置Kafka，并想学习更多，我们可以从Spring和Kafka的介绍文章开始。</p><h2 id="_2-项目设置" tabindex="-1"><a class="header-anchor" href="#_2-项目设置"><span>2. 项目设置</span></a></h2><p>让我们创建一个新的Spring Boot项目，并添加_spring-kafka_依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.springframework.kafka\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`spring-kafka\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`3.1.2\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们创建一个对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Greeting</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> msg<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token comment">// 标准构造数，getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Kafka消费者是一个从Kafka集群读取数据的客户端应用程序。它订阅一个或多个主题，并消费发布的消息。生产者向主题发送消息，主题是一个存储和发布记录的类别名称。主题被划分为多个分区以允许它们水平扩展。每个分区是消息的不可变序列。</p><p>消费者可以通过指定偏移量从特定分区读取消息，偏移量是消息在分区中的位置。ack（确认）是消费者发送给Kafka代理的消息，表示它已成功处理记录。<strong>一旦发送ack，消费者偏移量将被更新。</strong></p><p>这确保了消息被消费，并且不会被再次传递给当前的监听器。</p><h3 id="_3-1-确认模式" tabindex="-1"><a class="header-anchor" href="#_3-1-确认模式"><span>3.1. 确认模式</span></a></h3><p><strong>确认模式决定了代理何时更新消费者的偏移量。</strong></p><p>有三种确认模式：</p><ol><li>自动提交：消费者一收到消息就向代理发送确认</li><li>处理后提交：消费者只有在成功处理消息后才向代理发送确认</li><li>手动提交：消费者在收到特定指令后才向代理发送确认</li></ol><p>确认模式决定了消费者如何处理它从Kafka集群读取的消息。</p><p>让我们创建一个新的bean，它创建一个新的_ConcurrentKafkaListenerContainerFactory_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">ConcurrentKafkaListenerContainerFactory</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token function">greetingKafkaListenerContainerFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ConcurrentKafkaListenerContainerFactory</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\`\`\` factory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentKafkaListenerContainerFactory</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 其他配置</span>
    factory<span class="token punctuation">.</span><span class="token function">getContainerProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setAckMode</span><span class="token punctuation">(</span><span class="token class-name">ContainerProperties<span class="token punctuation">.</span>AckMode</span><span class="token punctuation">.</span><span class="token constant">RECORD</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    factory<span class="token punctuation">.</span><span class="token function">afterPropertiesSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> factory<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们有几种确认模式可以配置：</p><ol><li><em>AckMode.RECORD</em>: 在这种处理后模式中，消费者为它处理的每条消息发送确认。</li><li><em>AckMode.BATCH</em>: 在这种手动模式中，消费者为一批消息发送确认，而不是每条消息。</li><li><em>AckMode.COUNT</em>: 在这种手动模式中，消费者在处理特定数量的消息后发送确认。</li><li><em>AckMode.MANUAL</em>: 在这种手动模式中，消费者不为其处理的消息发送确认。</li><li><em>AckMode.TIME</em>: 在这种手动模式中，消费者在经过一定时间后发送确认。</li></ol><p>要在Kafka中实现消息处理的重试逻辑，我们需要选择一个_AckMode_。</p><p>**这个_AckMode_应该允许消费者向代理指示哪些特定消息已成功处理。**这样，代理就可以将任何未确认的消息重新传递给另一个消费者。</p><p>这可能是阻塞重试的情况下的_RECORD_或_MANUAL_模式。</p><h2 id="_4-阻塞重试" tabindex="-1"><a class="header-anchor" href="#_4-阻塞重试"><span>4. 阻塞重试</span></a></h2><p>阻塞重试允许消费者在由于临时错误导致初次尝试失败时再次尝试消费消息。消费者在尝试再次消费消息之前等待一定的时间，称为重试退避期。</p><p>此外，消费者可以使用固定延迟或指数退避策略自定义重试退避期。它还可以在放弃并将消息标记为失败之前设置最大重试次数。</p><h3 id="_4-1-错误处理程序" tabindex="-1"><a class="header-anchor" href="#_4-1-错误处理程序"><span>4.1. 错误处理程序</span></a></h3><p>让我们在Kafka配置类上定义两个属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;\${kafka.backoff.interval}&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">Long</span> interval<span class="token punctuation">;</span>

<span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;\${kafka.backoff.max_failure}&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">Long</span> maxAttempts<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了处理在消费过程中抛出的所有异常，我们将定义一个新的错误处理程序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">DefaultErrorHandler</span> <span class="token function">errorHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">BackOff</span> fixedBackOff <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FixedBackOff</span><span class="token punctuation">(</span>interval<span class="token punctuation">,</span> maxAttempts<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">DefaultErrorHandler</span> errorHandler <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultErrorHandler</span><span class="token punctuation">(</span><span class="token punctuation">(</span>consumerRecord<span class="token punctuation">,</span> exception<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// 当所有重试尝试都耗尽时执行的逻辑</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> fixedBackOff<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> errorHandler<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_FixedBackOff_类接受两个参数：</p><ul><li><em>interval</em>: 重试之间等待的时间（毫秒）</li><li><em>maxAttempts</em>: 在放弃之前重试操作的最大次数</li></ul><p>在这种策略中，消费者在重试消息消费之前等待固定时间。</p><p>_DefaultErrorHandler_正在使用一个lambda函数进行初始化，该lambda函数表示当所有重试尝试都耗尽时执行的逻辑。</p><p>lambda函数接受两个参数：</p><ul><li><em>consumerRecord</em>: 表示引起错误的Kafka记录</li><li><em>exception</em>: 表示抛出的异常</li></ul><h3 id="_4-2-容器工厂" tabindex="-1"><a class="header-anchor" href="#_4-2-容器工厂"><span>4.2. 容器工厂</span></a></h3><p>让我们向错误处理程序添加一个容器工厂bean：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">ConcurrentKafkaListenerContainerFactory</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token function">greetingKafkaListenerContainerFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ConcurrentKafkaListenerContainerFactory</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\`\`\` factory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentKafkaListenerContainerFactory</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 其他配置</span>
    factory<span class="token punctuation">.</span><span class="token function">setCommonErrorHandler</span><span class="token punctuation">(</span><span class="token function">errorHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    factory<span class="token punctuation">.</span><span class="token function">getContainerProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setAckMode</span><span class="token punctuation">(</span><span class="token class-name">ContainerProperties<span class="token punctuation">.</span>AckMode</span><span class="token punctuation">.</span><span class="token constant">RECORD</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    factory<span class="token punctuation">.</span><span class="token function">afterPropertiesSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> factory<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果存在重试策略，我们将将确认模式设置为_AckMode.RECORD_，以确保如果处理过程中发生错误，消费者将重新传递消息。</p><p>我们不应该将确认模式设置为_AckMode.BATCH_或_AckMode.TIME_，因为消费者将一次性确认多条消息。这是因为如果处理消息时发生错误，消费者不会将自己一次性或时间窗口中的所有消息重新传递给自己。</p><p>因此，重试策略将无法正确处理错误。</p><h3 id="_4-3-可重试异常和不可重试异常" tabindex="-1"><a class="header-anchor" href="#_4-3-可重试异常和不可重试异常"><span>4.3. 可重试异常和不可重试异常</span></a></h3><p>我们可以指定哪些异常是可重试的，哪些是不可重试的。</p><p>让我们修改_ErrorHandler_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">DefaultErrorHandler</span> <span class="token function">errorHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">BackOff</span> fixedBackOff <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FixedBackOff</span><span class="token punctuation">(</span>interval<span class="token punctuation">,</span> maxAttempts<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">DefaultErrorHandler</span> errorHandler <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultErrorHandler</span><span class="token punctuation">(</span><span class="token punctuation">(</span>consumerRecord<span class="token punctuation">,</span> e<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// 当所有重试尝试都耗尽时执行的逻辑</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> fixedBackOff<span class="token punctuation">)</span><span class="token punctuation">;</span>
    errorHandler<span class="token punctuation">.</span><span class="token function">addRetryableExceptions</span><span class="token punctuation">(</span><span class="token class-name">SocketTimeoutException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    errorHandler<span class="token punctuation">.</span><span class="token function">addNotRetryableExceptions</span><span class="token punctuation">(</span><span class="token class-name">NullPointerException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> errorHandler<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们指定了哪些异常类型应该触发消费者的重试策略。</p><p>_SocketTimeoutException_被认为是可重试的，而_NullPointerException_被认为是不可重试的。</p><p>如果我们没有设置任何可重试的异常，将使用默认的可重试异常集：</p><ul><li><em>MessagingException</em></li><li><em>RetryableException</em></li><li><em>ListenerExecutionFailedException</em></li></ul><h3 id="_4-4-优点和缺点" tabindex="-1"><a class="header-anchor" href="#_4-4-优点和缺点"><span>4.4. 优点和缺点</span></a></h3><p>在阻塞重试中，如果消息处理失败，消费者会阻塞，直到重试机制完成重试，或直到达到最大重试次数。</p><p>使用阻塞重试有几个优点和缺点。</p><p><strong>阻塞重试可以通过允许消费者在发生错误时重试消息消费，从而提高消息处理管道的可靠性。这可以帮助确保即使发生瞬时错误，消息也能成功处理。</strong></p><p>阻塞重试可以通过抽象重试机制来简化消息处理逻辑的实现。消费者可以专注于处理消息，并将错误处理留给重试机制。</p><p>最后，如果消费者需要等待重试机制完成其重试，阻塞重试可能会在消息处理管道中引入延迟。这可能会影响系统的整体性能。阻塞重试也可能使消费者消耗更多资源，如CPU和内存，因为它等待重试机制完成其重试。这可能会影响系统的整体可扩展性。</p><h2 id="_5-非阻塞重试" tabindex="-1"><a class="header-anchor" href="#_5-非阻塞重试"><span>5. 非阻塞重试</span></a></h2><p>非阻塞重试允许消费者在不阻塞消息侦听器方法的执行的情况下异步重试消息消费。</p><h3 id="_5-1-retryabletopic" tabindex="-1"><a class="header-anchor" href="#_5-1-retryabletopic"><span>5.1. @RetryableTopic</span></a></h3><p>让我们向_KafkaListener_添加_@RetryableTopic_注解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@KafkaListener</span><span class="token punctuation">(</span>id <span class="token operator">=</span> <span class="token string">&quot;multiGroup&quot;</span><span class="token punctuation">,</span> topics <span class="token operator">=</span> <span class="token string">&quot;greeting&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MultiTypeKafkaListener</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@KafkaHandler</span>
    <span class="token annotation punctuation">@RetryableTopic</span><span class="token punctuation">(</span>
      backoff <span class="token operator">=</span> <span class="token annotation punctuation">@Backoff</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token number">3000L</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      attempts <span class="token operator">=</span> <span class="token string">&quot;5&quot;</span><span class="token punctuation">,</span>
      autoCreateTopics <span class="token operator">=</span> <span class="token string">&quot;false&quot;</span><span class="token punctuation">,</span>
      include <span class="token operator">=</span> <span class="token class-name">SocketTimeoutException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>
      exclude <span class="token operator">=</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handleGreeting</span><span class="token punctuation">(</span><span class="token class-name">Greeting</span> greeting<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Greeting received: &quot;</span> <span class="token operator">+</span> greeting<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们通过修改几个属性来自定义重试行为，例如：</p><ul><li><em>backoff</em>: 这个属性指定了在重试失败消息时使用的退避策略。</li><li><em>attempts</em>: 这个属性指定了在放弃之前消息应该重试的最大次数。</li><li><em>autoCreateTopics</em>: 这个属性指定了是否在重试主题和DLT（死信主题）不存在时自动创建它们。 -include: 这个属性指定了应该触发重试的异常类型。</li><li>exclude: 这个属性指定了不应该触发重试的异常类型。</li></ul><p>当消息未能成功传递到其预期主题时，它将自动发送到重试主题进行重试。 如果消息在最大尝试次数之后仍然无法传递，它将被发送到DLT进行进一步处理。</p><h3 id="_5-2-优点和缺点" tabindex="-1"><a class="header-anchor" href="#_5-2-优点和缺点"><span>5.2. 优点和缺点</span></a></h3><p>实现非阻塞重试有几个优点：</p><ul><li>性能提升：非阻塞重试允许在不阻塞调用线程的情况下重试失败的消息，这可以提高应用程序的整体性能。</li><li>可靠性增强：非阻塞重试可以帮助应用程序从故障中恢复并继续处理消息，即使某些消息无法成功传递。</li></ul><p>然而，在实现非阻塞重试时也需要考虑一些潜在的缺点：</p><ul><li>复杂性增加：非阻塞重试可能会给应用程序增加额外的复杂性，因为我们需要处理重试逻辑和DLT。</li><li>消息重复的风险：如果消息在重试后成功传递，并且原始传递和重试都成功了，消息可能会被多次传递。我们需要考虑这种风险，并在消息重复是一个问题时实施措施以防止消息重复。</li><li>消息顺序：重试的消息被异步发送到重试主题，并且可能比未重试的消息更晚地传递到原始主题。</li></ul><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们分析了如何在Kafka主题上实现重试逻辑，包括阻塞和非阻塞方法。</p><p>如常，示例的完整源代码可以在GitHub上找到。</p><p><a href="kimi://action?name=cheer-on-kimi">给Kimi加油</a></p><p>OK</p>`,75),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-10-Implementing Retry in Kafka Consumer.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Implementing%20Retry%20in%20Kafka%20Consumer.html","title":"在Kafka消费者中实现重试","lang":"zh-CN","frontmatter":{"date":"2022-04-21T00:00:00.000Z","category":["Spring","Kafka"],"tag":["Retry","Kafka Consumer"],"head":[["meta",{"name":"keywords","content":"Spring, Kafka, Retry, Consumer"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Implementing%20Retry%20in%20Kafka%20Consumer.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Kafka消费者中实现重试"}],["meta",{"property":"og:description","content":"在Kafka消费者中实现重试 在本教程中，我们将讨论在Kafka中实现重试的重要性。我们将探索在Spring Boot上实现它的各种选项，并学习最佳实践，以最大化Kafka消费者的可靠性和弹性。 如果我们是第一次在Spring上配置Kafka，并想学习更多，我们可以从Spring和Kafka的介绍文章开始。 2. 项目设置 让我们创建一个新的Sprin..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T17:40:18.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Retry"}],["meta",{"property":"article:tag","content":"Kafka Consumer"}],["meta",{"property":"article:published_time","content":"2022-04-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T17:40:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Kafka消费者中实现重试\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T17:40:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Kafka消费者中实现重试 在本教程中，我们将讨论在Kafka中实现重试的重要性。我们将探索在Spring Boot上实现它的各种选项，并学习最佳实践，以最大化Kafka消费者的可靠性和弹性。 如果我们是第一次在Spring上配置Kafka，并想学习更多，我们可以从Spring和Kafka的介绍文章开始。 2. 项目设置 让我们创建一个新的Sprin..."},"headers":[{"level":2,"title":"2. 项目设置","slug":"_2-项目设置","link":"#_2-项目设置","children":[{"level":3,"title":"3.1. 确认模式","slug":"_3-1-确认模式","link":"#_3-1-确认模式","children":[]}]},{"level":2,"title":"4. 阻塞重试","slug":"_4-阻塞重试","link":"#_4-阻塞重试","children":[{"level":3,"title":"4.1. 错误处理程序","slug":"_4-1-错误处理程序","link":"#_4-1-错误处理程序","children":[]},{"level":3,"title":"4.2. 容器工厂","slug":"_4-2-容器工厂","link":"#_4-2-容器工厂","children":[]},{"level":3,"title":"4.3. 可重试异常和不可重试异常","slug":"_4-3-可重试异常和不可重试异常","link":"#_4-3-可重试异常和不可重试异常","children":[]},{"level":3,"title":"4.4. 优点和缺点","slug":"_4-4-优点和缺点","link":"#_4-4-优点和缺点","children":[]}]},{"level":2,"title":"5. 非阻塞重试","slug":"_5-非阻塞重试","link":"#_5-非阻塞重试","children":[{"level":3,"title":"5.1. @RetryableTopic","slug":"_5-1-retryabletopic","link":"#_5-1-retryabletopic","children":[]},{"level":3,"title":"5.2. 优点和缺点","slug":"_5-2-优点和缺点","link":"#_5-2-优点和缺点","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720633218000,"updatedTime":1720633218000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":8.02,"words":2407},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Implementing Retry in Kafka Consumer.md","localizedDate":"2022年4月21日","excerpt":"\\n<p>在本教程中，我们将讨论在Kafka中实现重试的重要性。我们将探索在Spring Boot上实现它的各种选项，并学习最佳实践，以最大化Kafka消费者的可靠性和弹性。</p>\\n<p>如果我们是第一次在Spring上配置Kafka，并想学习更多，我们可以从Spring和Kafka的介绍文章开始。</p>\\n<h2>2. 项目设置</h2>\\n<p>让我们创建一个新的Spring Boot项目，并添加_spring-kafka_依赖：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`org.springframework.kafka`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`spring-kafka`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`3.1.2`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
