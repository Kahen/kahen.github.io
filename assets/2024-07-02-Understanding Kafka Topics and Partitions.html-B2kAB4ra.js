import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-uizvaz9h.js";const p={},e=t(`<h1 id="kafka主题和分区的理解" tabindex="-1"><a class="header-anchor" href="#kafka主题和分区的理解"><span>Kafka主题和分区的理解</span></a></h1><p>在本教程中，我们将探讨Kafka主题和分区以及它们之间的关联。</p><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将探讨Kafka主题和分区以及它们是如何相互关联的。</p><h2 id="_2-kafka主题是什么" tabindex="-1"><a class="header-anchor" href="#_2-kafka主题是什么"><span>2. Kafka主题是什么</span></a></h2><p><strong>主题是一个存储事件序列的机制。</strong> 从根本上说，主题是持久的日志文件，它们按照事件发生的时间顺序保持事件的顺序。因此，每个新事件总是被添加到日志的末尾。此外，<strong>事件是不可变的</strong>。因此，一旦事件被添加到主题中，我们就不能更改它们。</p><p>Kafka主题的一个示例用例是记录一个房间的温度测量序列。一旦记录了温度值，比如下午5:02的25摄氏度，它就不能被改变，因为它已经发生了。此外，下午5:06的温度值不能早于在下午5:02记录的温度值。因此，通过将每个温度测量视为一个事件，Kafka主题将是存储该数据的合适选择。</p><h2 id="_3-kafka分区是什么" tabindex="-1"><a class="header-anchor" href="#_3-kafka分区是什么"><span>3. Kafka分区是什么</span></a></h2><p>Kafka使用主题分区来提高可扩展性。在分区主题时，Kafka将其分解为小部分，并将其存储在分布式系统的不同节点中。这些部分的数量由我们或集群的默认配置确定。</p><p><strong>Kafka保证同一主题分区内的事件顺序。</strong> 然而，默认情况下，它不保证所有分区中事件的顺序。</p><p>例如，为了提高性能，我们可以将主题分成两个不同的分区，并在消费者端从它们中读取。在这种情况下，消费者以相同的顺序读取到达同一分区的事件。相比之下，如果Kafka将两个事件发送到不同的分区，我们就不能保证消费者以它们产生的顺序读取事件。</p><p>为了改善事件的排序，我们可以为事件对象设置事件键。通过这样做，具有相同键的事件被分配到同一个分区，该分区是有序的。因此，具有相同键的事件将以它们产生的顺序到达消费者端。</p><h2 id="_4-消费者组" tabindex="-1"><a class="header-anchor" href="#_4-消费者组"><span>4. 消费者组</span></a></h2><p>消费者组是一组从主题中读取的消费者。Kafka将所有分区分配给组中的消费者，其中任何给定的分区总是由组中的一个成员消费一次。然而，这种分配可能是不平衡的，这意味着一个消费者可以被分配多个分区。</p><p>例如，让我们设想一个有三个分区的主题，应该由两个消费者的消费者组来读取。因此，一种可能的分配是第一个消费者获得第一和第二分区，第二个消费者只获得第三分区。</p><p><strong>在KIP-500更新中，Kafka引入了一种名为KRaft的新共识算法。当我们向组中添加消费者或从组中移除消费者时，KRaft会在剩余的消费者之间按比例重新平衡分区</strong>。因此，它保证没有没有消费者分配的分区。</p><h2 id="_5-配置应用程序" tabindex="-1"><a class="header-anchor" href="#_5-配置应用程序"><span>5. 配置应用程序</span></a></h2><p>在这一部分，我们将创建用于配置主题、消费者和生产者服务的类。</p><h3 id="_5-1-主题配置" tabindex="-1"><a class="header-anchor" href="#_5-1-主题配置"><span>5.1. 主题配置</span></a></h3><p>首先，让我们为我们的主题创建配置类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">KafkaTopicConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;\${spring.kafka.bootstrap-servers}&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> bootstrapAddress<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">KafkaAdmin</span> <span class="token function">kafkaAdmin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Map</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\` configs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        configs<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">AdminClientConfig</span><span class="token punctuation">.</span><span class="token constant">BOOTSTRAP_SERVERS_CONFIG</span><span class="token punctuation">,</span> bootstrapAddress<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">KafkaAdmin</span><span class="token punctuation">(</span>configs<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">NewTopic</span> <span class="token function">celciusTopic</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">TopicBuilder</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string">&quot;celcius-scale-topic&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">partitions</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>KafkaTopicConfig_类注入了两个Spring beans。<em>KafkaAdmin</em> bean使用它应该运行的网络地址初始化Kafka集群，而_NewTopic</em> bean创建了一个名为_celcius-scale-topic_的主题，它有一个分区。</p><h3 id="_5-2-消费者和生产者配置" tabindex="-1"><a class="header-anchor" href="#_5-2-消费者和生产者配置"><span>5.2. 消费者和生产者配置</span></a></h3><p>我们需要必要的类来注入我们主题的消费者和生产者配置。</p><p>首先，让我们创建生产者配置类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">KafkaProducerConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;\${spring.kafka.bootstrap-servers}&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> bootstrapAddress<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">ProducerFactory</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Double</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token function">producerFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Map</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\` configProps <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        configProps<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ProducerConfig</span><span class="token punctuation">.</span><span class="token constant">BOOTSTRAP_SERVERS_CONFIG</span><span class="token punctuation">,</span> bootstrapAddress<span class="token punctuation">)</span><span class="token punctuation">;</span>
        configProps<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ProducerConfig</span><span class="token punctuation">.</span><span class="token constant">KEY_SERIALIZER_CLASS_CONFIG</span><span class="token punctuation">,</span> <span class="token class-name">StringSerializer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        configProps<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ProducerConfig</span><span class="token punctuation">.</span><span class="token constant">VALUE_SERIALIZER_CLASS_CONFIG</span><span class="token punctuation">,</span> <span class="token class-name">DoubleSerializer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DefaultKafkaProducerFactory</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>configProps<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">KafkaTemplate</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Double</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token function">kafkaTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">KafkaTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token function">producerFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_KafkaProducerConfig_注入了两个Spring beans。_ProducerFactory_告诉Kafka应该如何序列化事件以及生产者应该监听哪个服务器。_KafkaTemplate_将在消费者服务类中使用，以创建事件。</p><h3 id="_5-3-kafka生产者服务" tabindex="-1"><a class="header-anchor" href="#_5-3-kafka生产者服务"><span>5.3. Kafka生产者服务</span></a></h3><p>最后，在初始配置之后，我们可以创建驱动应用程序。让我们首先创建生产者应用程序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ThermostatService</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">KafkaTemplate</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Double</span><span class="token punctuation">&gt;</span></span>\`\`\`\` kafkaTemplate<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">ThermostatService</span><span class="token punctuation">(</span><span class="token class-name">KafkaTemplate</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Double</span><span class="token punctuation">&gt;</span></span>\`\`\`\` kafkaTemplate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>kafkaTemplate <span class="token operator">=</span> kafkaTemplate<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">measureCelsiusAndPublish</span><span class="token punctuation">(</span><span class="token keyword">int</span> numMeasurements<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">doubles</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">,</span> <span class="token number">35</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">limit</span><span class="token punctuation">(</span>numMeasurements<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>tmp <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
                    kafkaTemplate<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&quot;celcius-scale-topic&quot;</span><span class="token punctuation">,</span> tmp<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>ThermostatService_包含一个名为_measureCelsiusAndPublish_的单个方法。此方法生成25到35范围内的随机温度测量值，并将它们发布到_celcius-scale-topic</em> Kafka主题。为此，我们使用_Random_类的_doubles()<em>方法创建一个随机数流。然后，我们使用_kafkaTemplate_的_send</em> _()_方法发布事件。</p><h2 id="_6-生产和消费事件" tabindex="-1"><a class="header-anchor" href="#_6-生产和消费事件"><span>6. 生产和消费事件</span></a></h2><p>在这一部分，我们将看到如何使用嵌入式Kafka代理配置Kafka消费者从主题中读取事件。</p><h3 id="_6-1-创建消费者服务" tabindex="-1"><a class="header-anchor" href="#_6-1-创建消费者服务"><span>6.1. 创建消费者服务</span></a></h3><p>要消费事件，我们需要一个或多个消费者类。让我们创建一个_celcius-scale-topic_的消费者：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TemperatureConsumer</span> <span class="token punctuation">{</span>
    <span class="token class-name">Map</span>\`<span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`<span class="token operator">&gt;</span> consumedRecords <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@KafkaListener</span><span class="token punctuation">(</span>topics <span class="token operator">=</span> <span class="token string">&quot;celcius-scale-topic&quot;</span><span class="token punctuation">,</span> groupId <span class="token operator">=</span> <span class="token string">&quot;group-1&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">consumer1</span><span class="token punctuation">(</span><span class="token class-name">ConsumerRecord</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">&gt;</span></span>\` consumerRecord<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">trackConsumedPartitions</span><span class="token punctuation">(</span><span class="token string">&quot;consumer-1&quot;</span><span class="token punctuation">,</span> consumerRecord<span class="token punctuation">.</span><span class="token function">partition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">trackConsumedPartitions</span><span class="token punctuation">(</span><span class="token class-name">String</span> consumerName<span class="token punctuation">,</span> <span class="token keyword">int</span> partitionNumber<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        consumedRecords<span class="token punctuation">.</span><span class="token function">computeIfAbsent</span><span class="token punctuation">(</span>consumerName<span class="token punctuation">,</span> k <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        consumedRecords<span class="token punctuation">.</span><span class="token function">computeIfPresent</span><span class="token punctuation">(</span>consumerName<span class="token punctuation">,</span> <span class="token punctuation">(</span>k<span class="token punctuation">,</span> v<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            v<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>partitionNumber<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> v<span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的_consumer1()_方法使用@KafkaListener注释来启动消费者。_topics_参数是要消费的主题列表，而_groupId_参数标识消费者所属的消费者组。</p><p>为了稍后可视化结果，我们使用_ConcurrentHashMap_来存储消费的事件。_key_对应于消费者的名字，而_value_包含它消费的分区。</p><h3 id="_6-2-创建测试类" tabindex="-1"><a class="header-anchor" href="#_6-2-创建测试类"><span>6.2. 创建测试类</span></a></h3><p>现在，让我们创建我们的集成测试类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span><span class="token punctuation">(</span>classes <span class="token operator">=</span> <span class="token class-name">ThermostatApplicationKafkaApp</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@EmbeddedKafka</span><span class="token punctuation">(</span>partitions <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span> brokerProperties <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;listeners=PLAINTEXT://localhost:9092&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;port=9092&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">KafkaTopicsAndPartitionsIntegrationTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@ClassRule</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">EmbeddedKafkaBroker</span> embeddedKafka <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">EmbeddedKafkaBroker</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token string">&quot;multitype&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">ThermostatService</span> service<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">TemperatureConsumer</span> consumer<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenTopic_andConsumerGroup_whenConsumersListenToEvents_thenConsumeItCorrectly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        service<span class="token punctuation">.</span><span class="token function">measureCelsiusAndPublish</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>consumer<span class="token punctuation">.</span>consumedRecords<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用嵌入式Kafka代理来运行带有Kafka的测试。@EmbeddedKafka注释使用_brokerProperties_参数配置代理将运行的URL和端口。然后，我们使用_EmbeddedKafkaBroker_字段中的JUnit规则启动嵌入式代理。</p><p>最后，在测试方法中，我们调用我们的恒温器服务来产生10,000个事件。</p><p>我们将使用_Thread.sleep()_在产生事件后等待1秒钟。这确保了消费者在代理中正确设置，开始处理消息。</p><p>让我们看看当我们运行测试时会得到什么样的输出示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">{</span>consumer<span class="token operator">-</span><span class="token number">1</span><span class="token operator">=</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这意味着同一个消费者处理了0和1分区中的所有事件，因为我们只有一个消费者和一个消费者组。如果有不同消费者组中的更多消费者，结果可能会有所不同。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们查看了Kafka主题和分区的定义以及它们是如何相互关联的。</p><p>我们还展示了一个消费者使用嵌入式Kafka代理从主题的两个分区中读取事件的场景。</p><p>如往常一样，示例代码在GitHub上可用。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/9dcd3e9d44594a3dd06700c725c7d9d9?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/custom_avatars/brandon_ward_headshot-150x150.jpeg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>`,53),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-02-Understanding Kafka Topics and Partitions.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-Understanding%20Kafka%20Topics%20and%20Partitions.html","title":"Kafka主题和分区的理解","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Kafka","分布式系统"],"tag":["Kafka","主题","分区"],"head":[["meta",{"name":"keywords","content":"Kafka, 主题, 分区, 分布式消息系统"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-Understanding%20Kafka%20Topics%20and%20Partitions.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kafka主题和分区的理解"}],["meta",{"property":"og:description","content":"Kafka主题和分区的理解 在本教程中，我们将探讨Kafka主题和分区以及它们之间的关联。 1. 引言 在本教程中，我们将探讨Kafka主题和分区以及它们是如何相互关联的。 2. Kafka主题是什么 主题是一个存储事件序列的机制。 从根本上说，主题是持久的日志文件，它们按照事件发生的时间顺序保持事件的顺序。因此，每个新事件总是被添加到日志的末尾。此外..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T03:55:09.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kafka"}],["meta",{"property":"article:tag","content":"主题"}],["meta",{"property":"article:tag","content":"分区"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T03:55:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kafka主题和分区的理解\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/9dcd3e9d44594a3dd06700c725c7d9d9?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/custom_avatars/brandon_ward_headshot-150x150.jpeg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T03:55:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kafka主题和分区的理解 在本教程中，我们将探讨Kafka主题和分区以及它们之间的关联。 1. 引言 在本教程中，我们将探讨Kafka主题和分区以及它们是如何相互关联的。 2. Kafka主题是什么 主题是一个存储事件序列的机制。 从根本上说，主题是持久的日志文件，它们按照事件发生的时间顺序保持事件的顺序。因此，每个新事件总是被添加到日志的末尾。此外..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. Kafka主题是什么","slug":"_2-kafka主题是什么","link":"#_2-kafka主题是什么","children":[]},{"level":2,"title":"3. Kafka分区是什么","slug":"_3-kafka分区是什么","link":"#_3-kafka分区是什么","children":[]},{"level":2,"title":"4. 消费者组","slug":"_4-消费者组","link":"#_4-消费者组","children":[]},{"level":2,"title":"5. 配置应用程序","slug":"_5-配置应用程序","link":"#_5-配置应用程序","children":[{"level":3,"title":"5.1. 主题配置","slug":"_5-1-主题配置","link":"#_5-1-主题配置","children":[]},{"level":3,"title":"5.2. 消费者和生产者配置","slug":"_5-2-消费者和生产者配置","link":"#_5-2-消费者和生产者配置","children":[]},{"level":3,"title":"5.3. Kafka生产者服务","slug":"_5-3-kafka生产者服务","link":"#_5-3-kafka生产者服务","children":[]}]},{"level":2,"title":"6. 生产和消费事件","slug":"_6-生产和消费事件","link":"#_6-生产和消费事件","children":[{"level":3,"title":"6.1. 创建消费者服务","slug":"_6-1-创建消费者服务","link":"#_6-1-创建消费者服务","children":[]},{"level":3,"title":"6.2. 创建测试类","slug":"_6-2-创建测试类","link":"#_6-2-创建测试类","children":[]}]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719892509000,"updatedTime":1719892509000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.44,"words":1931},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-Understanding Kafka Topics and Partitions.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将探讨Kafka主题和分区以及它们之间的关联。</p>\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将探讨Kafka主题和分区以及它们是如何相互关联的。</p>\\n<h2>2. Kafka主题是什么</h2>\\n<p><strong>主题是一个存储事件序列的机制。</strong> 从根本上说，主题是持久的日志文件，它们按照事件发生的时间顺序保持事件的顺序。因此，每个新事件总是被添加到日志的末尾。此外，<strong>事件是不可变的</strong>。因此，一旦事件被添加到主题中，我们就不能更改它们。</p>\\n<p>Kafka主题的一个示例用例是记录一个房间的温度测量序列。一旦记录了温度值，比如下午5:02的25摄氏度，它就不能被改变，因为它已经发生了。此外，下午5:06的温度值不能早于在下午5:02记录的温度值。因此，通过将每个温度测量视为一个事件，Kafka主题将是存储该数据的合适选择。</p>","autoDesc":true}');export{r as comp,d as data};
