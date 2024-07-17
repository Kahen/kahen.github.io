import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-YddbDb53.js";const p={},e=t(`<h1 id="apache-kafka中将数据发送到特定分区的技巧" tabindex="-1"><a class="header-anchor" href="#apache-kafka中将数据发送到特定分区的技巧"><span>Apache Kafka中将数据发送到特定分区的技巧</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Apache Kafka是一个分布式流处理平台，擅长处理大规模的实时数据流。Kafka将数据组织成主题(topic)，并将主题进一步划分为分区(partition)。<strong>每个分区充当一个独立的通道，实现并行处理和容错。</strong></p><p>本教程深入探讨了在Kafka中将数据发送到特定分区的技术。我们将探索这种方法的好处、实现方式以及潜在的挑战。</p><h2 id="_2-kafka分区的理解" tabindex="-1"><a class="header-anchor" href="#_2-kafka分区的理解"><span>2. Kafka分区的理解</span></a></h2><p>现在，让我们探索Kafka分区的基本概念。</p><h3 id="_2-1-kafka分区是什么" tabindex="-1"><a class="header-anchor" href="#_2-1-kafka分区是什么"><span>2.1 Kafka分区是什么</span></a></h3><p>当生产者将消息发送到Kafka主题时，Kafka使用指定的分区策略将这些消息组织成分区。分区是表示消息线性有序序列的基本单元。一旦消息被生产，它将根据所选的分区策略被分配到特定的分区。<strong>随后，该消息被追加到该分区的日志末尾。</strong></p><h3 id="_2-2-并行性和消费者组" tabindex="-1"><a class="header-anchor" href="#_2-2-并行性和消费者组"><span>2.2 并行性和消费者组</span></a></h3><p>一个Kafka主题可以被划分为多个分区，消费者组可以被分配这些分区的一个子集。组内的每个消费者独立地从其分配的分区处理消息。这种并行处理机制提高了整体吞吐量和可扩展性，使Kafka能够有效地处理大量数据。</p><h3 id="_2-3-顺序和处理保证" tabindex="-1"><a class="header-anchor" href="#_2-3-顺序和处理保证"><span>2.3 顺序和处理保证</span></a></h3><p>**在单个分区内，Kafka确保消息按照接收的顺序进行处理。**这保证了像金融交易或事件日志这样依赖消息顺序的应用程序的顺序处理。但请注意，由于网络延迟和其他运营考虑，接收到的消息顺序可能与它们最初发送的顺序不同。</p><p>**跨不同分区，Kafka不保证有保证的顺序。**来自不同分区的消息可能会同时被处理，引入了事件顺序变化的可能性。在设计依赖消息严格顺序的应用程序时，这一特性是必须考虑的。</p><h3 id="_2-4-容错和高可用性" tabindex="-1"><a class="header-anchor" href="#_2-4-容错和高可用性"><span>2.4 容错和高可用性</span></a></h3><p>分区还有助于Kafka的卓越容错性。每个分区可以在多个代理(broker)上复制。在代理失败的情况下，复制的分区仍然可以被访问，确保数据的连续访问。</p><p>Kafka集群可以无缝地将消费者重定向到健康的代理，维持数据的可用性和系统的高可靠性。</p><h2 id="_3-为什么要将数据发送到特定分区" tabindex="-1"><a class="header-anchor" href="#_3-为什么要将数据发送到特定分区"><span>3. 为什么要将数据发送到特定分区</span></a></h2><p>在这一部分，我们探讨将数据发送到特定分区的原因。</p><h3 id="_3-1-数据亲和性" tabindex="-1"><a class="header-anchor" href="#_3-1-数据亲和性"><span>3.1 数据亲和性</span></a></h3><p>数据亲和性指的是<strong>有意将相关数据分组在同一个分区内</strong>。通过将相关数据发送到特定的分区，我们确保它一起被处理，从而提高处理效率。</p><p>例如，考虑一个场景，我们可能希望确保一个客户的所有订单都位于同一个分区，以便进行订单跟踪和分析。保证来自特定客户的所有订单最终都进入同一个分区，简化了跟踪和分析过程。</p><h3 id="_3-2-负载均衡" tabindex="-1"><a class="header-anchor" href="#_3-2-负载均衡"><span>3.2 负载均衡</span></a></h3><p>此外，将数据均匀地分布在各个分区上，可以帮助确保<strong>资源的最优利用</strong>。将数据均匀地分布在分区上有助于优化Kafka集群内的资源利用。通过根据负载考虑将数据发送到分区，我们可以防止资源瓶颈，并确保每个分区接收到一个可管理且平衡的工作负载。</p><h3 id="_3-3-优先级" tabindex="-1"><a class="header-anchor" href="#_3-3-优先级"><span>3.3 优先级</span></a></h3><p>在某些情况下，并非所有数据都具有相同的优先级或紧急性。Kafka的分区能力使得通过将关键数据引导到专用分区进行加速处理，从而实现数据的优先级排序。这种优先级排序确保了高优先级消息比不太关键的消息更快地得到处理和关注。</p><h2 id="_4-发送到特定分区的方法" tabindex="-1"><a class="header-anchor" href="#_4-发送到特定分区的方法"><span>4. 发送到特定分区的方法</span></a></h2><p>Kafka提供了多种将消息分配到分区的策略，提供了数据分布和处理的灵活性。以下是一些常用的将消息发送到特定分区的方法。</p><h3 id="_4-1-粘性分区器" tabindex="-1"><a class="header-anchor" href="#_4-1-粘性分区器"><span>4.1 粘性分区器</span></a></h3><p>**在Kafka版本2.4及以上中，粘性分区器旨在将没有键的消息保持在同一分区中。**然而，这种行为并非绝对，并且与批处理设置如_batch.size_和_linger.ms_相互作用。</p><p>为了优化消息传递，Kafka在将消息发送到代理之前将消息分组到批处理中。_batch.size_设置（默认16,384字节）控制最大批处理大小，影响在粘性分区器下消息在同一分区中停留的时间。</p><p>_linger.ms_配置（默认：0毫秒）在发送批处理之前引入延迟，可能延长无键消息的粘性行为。</p><p>在以下测试案例中，假设默认的批处理配置保持不变。我们将发送三条没有明确分配键的消息。我们应该期望它们最初被分配到同一个分区：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>kafkaProducer<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&quot;default-topic&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;message1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
kafkaProducer<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&quot;default-topic&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;message2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
kafkaProducer<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&quot;default-topic&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;message3&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">atMost</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token constant">SECONDS</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">until</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> kafkaMessageConsumer<span class="token punctuation">.</span><span class="token function">getReceivedMessages</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ReceivedMessage</span><span class="token punctuation">&gt;</span></span>\`\`\` records <span class="token operator">=</span> kafkaMessageConsumer<span class="token punctuation">.</span><span class="token function">getReceivedMessages</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Set</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` uniquePartitions <span class="token operator">=</span> records<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">ReceivedMessage</span><span class="token operator">::</span><span class="token function">getPartition</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> uniquePartitions<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-基于键的方法" tabindex="-1"><a class="header-anchor" href="#_4-2-基于键的方法"><span>4.2 基于键的方法</span></a></h3><p>在基于键的方法中，<strong>Kafka将具有相同键的消息导向同一个分区，优化了相关数据的处理</strong>。这是通过哈希函数实现的，确保了消息键到分区的确定性映射。</p><p>在这个测试案例中，具有相同键_partitionA_的消息应该始终落在同一个分区。让我们用以下代码片段来说明基于键的分区：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>kafkaProducer<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&quot;order-topic&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;partitionA&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;critical data&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
kafkaProducer<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&quot;order-topic&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;partitionA&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;more critical data&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
kafkaProducer<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&quot;order-topic&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;partitionB&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;another critical message&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
kafkaProducer<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&quot;order-topic&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;partitionA&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;another more critical data&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">atMost</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token constant">SECONDS</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">until</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> kafkaMessageConsumer<span class="token punctuation">.</span><span class="token function">getReceivedMessages</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ReceivedMessage</span><span class="token punctuation">&gt;</span></span>\`\`\` records <span class="token operator">=</span> kafkaMessageConsumer<span class="token punctuation">.</span><span class="token function">getReceivedMessages</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Map</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ReceivedMessage</span><span class="token punctuation">&gt;</span></span>\`\`\`<span class="token operator">&gt;</span> messagesByKey <span class="token operator">=</span> <span class="token function">groupMessagesByKey</span><span class="token punctuation">(</span>records<span class="token punctuation">)</span><span class="token punctuation">;</span>

messagesByKey<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> messages<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> expectedPartition <span class="token operator">=</span> messages<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">getPartition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">ReceivedMessage</span> message <span class="token operator">:</span> messages<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Messages with key &#39;&quot;</span> <span class="token operator">+</span> key <span class="token operator">+</span> <span class="token string">&quot;&#39; should be in the same partition&quot;</span><span class="token punctuation">,</span> message<span class="token punctuation">.</span><span class="token function">getPartition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> expectedPartition<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，在使用基于键的方法时，共享相同键的消息在特定分区内按照它们生产的顺序一致地接收。<strong>这保证了在分区内，特别是对于相关消息，消息顺序的保持。</strong></p><p>在这个测试案例中，我们以特定的顺序生产具有键_partitionA_的消息，测试积极验证这些消息在分区内以相同的顺序接收：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>kafkaProducer<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&quot;order-topic&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;partitionA&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;message1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
kafkaProducer<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&quot;order-topic&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;partitionA&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;message3&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
kafkaProducer<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&quot;order-topic&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;partitionA&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;message4&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">atMost</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token constant">SECONDS</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">until</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> kafkaMessageConsumer<span class="token punctuation">.</span><span class="token function">getReceivedMessages</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ReceivedMessage</span><span class="token punctuation">&gt;</span></span>\`\`\` records <span class="token operator">=</span> kafkaMessageConsumer<span class="token punctuation">.</span><span class="token function">getReceivedMessages</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">StringBuilder</span> resultMessage <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
records<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>record <span class="token operator">-&gt;</span> resultMessage<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>record<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> expectedMessage <span class="token operator">=</span> <span class="token string">&quot;message1message3message4&quot;</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Messages with the same key should be received in the order they were produced within a partition&quot;</span><span class="token punctuation">,</span>
  expectedMessage<span class="token punctuation">,</span> resultMessage<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-自定义分区" tabindex="-1"><a class="header-anchor" href="#_4-3-自定义分区"><span>4.3 自定义分区</span></a></h3><p>对于细粒度控制，Kafka允许定义自定义分区器。这些类实现_Partitioner_接口，使我们能够根据消息内容、元数据或其他因素编写逻辑，以确定每个消息的目标分区。</p><p>在这一部分，我们将创建一个基于客户类型在向Kafka主题分发订单时的自定义分区逻辑。具体来说，高级客户订单将被引导到一个分区，而普通客户订单将被引导到另一个分区。</p><p>首先，<strong>我们创建一个名为_CustomPartitioner_的类，继承自Kafka的_Partitioner_接口</strong>。在这个类中，我们用自定义逻辑重写_partition()_方法，以确定每条消息的目标分区：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomPartitioner</span> <span class="token keyword">implements</span> <span class="token class-name">Partitioner</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">PREMIUM_PARTITION</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">NORMAL_PARTITION</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">partition</span><span class="token punctuation">(</span><span class="token class-name">String</span> topic<span class="token punctuation">,</span> <span class="token class-name">Object</span> key<span class="token punctuation">,</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> keyBytes<span class="token punctuation">,</span> <span class="token class-name">Object</span> value<span class="token punctuation">,</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> valueBytes<span class="token punctuation">,</span> <span class="token class-name">Cluster</span> cluster<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> customerType <span class="token operator">=</span> <span class="token function">extractCustomerType</span><span class="token punctuation">(</span>key<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token string">&quot;premium&quot;</span><span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>customerType<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token constant">PREMIUM_PARTITION</span> <span class="token operator">:</span> <span class="token constant">NORMAL_PARTITION</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">extractCustomerType</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> parts <span class="token operator">=</span> key<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;_&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> parts<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">1</span> <span class="token operator">?</span> parts<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token string">&quot;normal&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 更多方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，为了在Kafka中应用这个自定义分区</p>`,46),o=[e];function c(i,l){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","2024-06-25-Sending Data to a Specific Partition in Kafka.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-25/2024-06-25-Sending%20Data%20to%20a%20Specific%20Partition%20in%20Kafka.html","title":"Apache Kafka中将数据发送到特定分区的技巧","lang":"zh-CN","frontmatter":{"date":"2024-06-25T00:00:00.000Z","category":["Kafka","分区"],"tag":["分布式系统","消息队列"],"head":[["meta",{"name":"keywords","content":"Kafka, 分区, 消息队列, 分布式系统"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-25/2024-06-25-Sending%20Data%20to%20a%20Specific%20Partition%20in%20Kafka.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Apache Kafka中将数据发送到特定分区的技巧"}],["meta",{"property":"og:description","content":"Apache Kafka中将数据发送到特定分区的技巧 1. 引言 Apache Kafka是一个分布式流处理平台，擅长处理大规模的实时数据流。Kafka将数据组织成主题(topic)，并将主题进一步划分为分区(partition)。每个分区充当一个独立的通道，实现并行处理和容错。 本教程深入探讨了在Kafka中将数据发送到特定分区的技术。我们将探索这种..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-25T02:55:53.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"分布式系统"}],["meta",{"property":"article:tag","content":"消息队列"}],["meta",{"property":"article:published_time","content":"2024-06-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-25T02:55:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Apache Kafka中将数据发送到特定分区的技巧\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-25T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-25T02:55:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Apache Kafka中将数据发送到特定分区的技巧 1. 引言 Apache Kafka是一个分布式流处理平台，擅长处理大规模的实时数据流。Kafka将数据组织成主题(topic)，并将主题进一步划分为分区(partition)。每个分区充当一个独立的通道，实现并行处理和容错。 本教程深入探讨了在Kafka中将数据发送到特定分区的技术。我们将探索这种..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. Kafka分区的理解","slug":"_2-kafka分区的理解","link":"#_2-kafka分区的理解","children":[{"level":3,"title":"2.1 Kafka分区是什么","slug":"_2-1-kafka分区是什么","link":"#_2-1-kafka分区是什么","children":[]},{"level":3,"title":"2.2 并行性和消费者组","slug":"_2-2-并行性和消费者组","link":"#_2-2-并行性和消费者组","children":[]},{"level":3,"title":"2.3 顺序和处理保证","slug":"_2-3-顺序和处理保证","link":"#_2-3-顺序和处理保证","children":[]},{"level":3,"title":"2.4 容错和高可用性","slug":"_2-4-容错和高可用性","link":"#_2-4-容错和高可用性","children":[]}]},{"level":2,"title":"3. 为什么要将数据发送到特定分区","slug":"_3-为什么要将数据发送到特定分区","link":"#_3-为什么要将数据发送到特定分区","children":[{"level":3,"title":"3.1 数据亲和性","slug":"_3-1-数据亲和性","link":"#_3-1-数据亲和性","children":[]},{"level":3,"title":"3.2 负载均衡","slug":"_3-2-负载均衡","link":"#_3-2-负载均衡","children":[]},{"level":3,"title":"3.3 优先级","slug":"_3-3-优先级","link":"#_3-3-优先级","children":[]}]},{"level":2,"title":"4. 发送到特定分区的方法","slug":"_4-发送到特定分区的方法","link":"#_4-发送到特定分区的方法","children":[{"level":3,"title":"4.1 粘性分区器","slug":"_4-1-粘性分区器","link":"#_4-1-粘性分区器","children":[]},{"level":3,"title":"4.2 基于键的方法","slug":"_4-2-基于键的方法","link":"#_4-2-基于键的方法","children":[]},{"level":3,"title":"4.3 自定义分区","slug":"_4-3-自定义分区","link":"#_4-3-自定义分区","children":[]}]}],"git":{"createdTime":1719284153000,"updatedTime":1719284153000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.71,"words":2014},"filePathRelative":"posts/baeldung/2024-06-25/2024-06-25-Sending Data to a Specific Partition in Kafka.md","localizedDate":"2024年6月25日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>Apache Kafka是一个分布式流处理平台，擅长处理大规模的实时数据流。Kafka将数据组织成主题(topic)，并将主题进一步划分为分区(partition)。<strong>每个分区充当一个独立的通道，实现并行处理和容错。</strong></p>\\n<p>本教程深入探讨了在Kafka中将数据发送到特定分区的技术。我们将探索这种方法的好处、实现方式以及潜在的挑战。</p>\\n<h2>2. Kafka分区的理解</h2>\\n<p>现在，让我们探索Kafka分区的基本概念。</p>\\n<h3>2.1 Kafka分区是什么</h3>\\n<p>当生产者将消息发送到Kafka主题时，Kafka使用指定的分区策略将这些消息组织成分区。分区是表示消息线性有序序列的基本单元。一旦消息被生产，它将根据所选的分区策略被分配到特定的分区。<strong>随后，该消息被追加到该分区的日志末尾。</strong></p>","autoDesc":true}');export{r as comp,d as data};
