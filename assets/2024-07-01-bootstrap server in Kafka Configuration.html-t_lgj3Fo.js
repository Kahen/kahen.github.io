import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as t,a as n}from"./app-c243dxVF.js";const i={},s=n(`<h1 id="kafka配置中的bootstrap服务器" tabindex="-1"><a class="header-anchor" href="#kafka配置中的bootstrap服务器"><span>Kafka配置中的bootstrap服务器</span></a></h1><p>在实现Kafka生产者或消费者时（例如，使用Spring），我们需要配置的一个属性是“bootstrap.servers”。</p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>本文将介绍这个设置的含义及其用途。</p><h2 id="_2-kafka拓扑结构" tabindex="-1"><a class="header-anchor" href="#_2-kafka拓扑结构"><span>2. Kafka拓扑结构</span></a></h2><p>Kafka的拓扑结构设计用于可扩展性和高可用性。这就是为什么有一个服务器集群（代理）处理代理之间复制的主题分区。每个分区有一个代理作为领导者，其他代理作为跟随者。</p><p>生产者将消息发送到分区领导者，然后该领导者将记录传播到每个副本。消费者通常也连接到分区领导者，因为消费消息是状态变化的（消费者偏移量）。</p><p>副本的数量是复制因子。推荐值为3，因为它在性能和容错性之间提供了正确的平衡，并且云服务提供商通常提供三个数据中心（可用区）作为区域的一部分进行部署。</p><p>例如，下图显示了一个由四个代理组成的集群，提供了一个具有两个分区和复制因子为3的主题：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/08/kafka-topology-1024x549-1-300x161.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>当一个分区领导者崩溃时，Kafka会选择另一个代理作为新的分区领导者。然后，消费者和生产者（“客户端”）也必须切换到新的领导者。因此，在Broker 1崩溃的情况下，场景可能会变成这样：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/08/kafka-topology-failure-1024x581-1-300x170.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_3-bootstrapping" tabindex="-1"><a class="header-anchor" href="#_3-bootstrapping"><span>3. Bootstrapping</span></a></h2><p>正如我们所看到的，整个集群是动态的，客户端需要了解拓扑的当前状态，以便连接到正确的分区领导者以发送和接收消息。这就是bootstrapping发挥作用的地方。</p><p>“bootstrap-servers”配置是一系列“hostname:port”对的列表，这些地址指向一个或多个（甚至全部）代理。客户端使用这个列表执行以下步骤：</p><ul><li>从列表中选择第一个代理</li><li>向代理发送请求，获取包含有关主题、分区和每个分区的领导者代理信息的集群元数据（每个代理都可以提供此元数据）</li><li>连接到所选主题的分区的领导者代理</li></ul><p>当然，在列表中指定多个代理是有意义的，因为如果第一个代理不可用，客户端可以选择第二个代理进行bootstrapping。</p><p>Kafka使用Kraft（来自早期的Zookeeper）来管理所有这类编排。</p><h2 id="_4-示例" tabindex="-1"><a class="header-anchor" href="#_4-示例"><span>4. 示例</span></a></h2><p>假设我们在开发环境中使用一个简单的Docker镜像，其中包含Kafka和Kraft（如bashj79/kafka-kraft）。我们可以使用以下命令安装此Docker镜像：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>docker run -p 9092:9092 -d bashj79/kafka-kraft
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这在容器内和主机上运行一个在9092端口上可用的单个Kafka实例。</p><h3 id="_4-1-使用kafka-cli" tabindex="-1"><a class="header-anchor" href="#_4-1-使用kafka-cli"><span>4.1. 使用Kafka CLI</span></a></h3><p>连接到Kafka的一种可能性是使用Kafka安装中提供的Kafka CLI。首先，让我们创建一个名为samples的主题。在容器的Bash中，我们可以运行此命令：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ cd /opt/kafka/bin
$ sh kafka-topics.sh --bootstrap-server localhost:9092 --create --topic samples --partitions 1 --replication-factor 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们想开始消费主题，我们需要再次指定bootstrap服务器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ sh kafka-console-consumer.sh --bootstrap-server localhost:9092,another-host.com:29092 --topic samples
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们还可以通过_kafka-metadata-shell_脚本以虚拟文件系统的形式探索集群元数据。我们使用以下命令连接到元数据：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ sh kafka-metadata-shell.sh --snapshot /tmp/kraft-combined-logs/__cluster_metadata-0/00000000000000000167.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/08/2023_07_31_06_39_45_naughty_newton_Container_Docker_Desktop-300x102.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_4-2-使用java" tabindex="-1"><a class="header-anchor" href="#_4-2-使用java"><span>4.2. 使用Java</span></a></h3><p>在Java应用程序中，我们可以使用Kafka客户端：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>static Consumer\`\`&lt;Long, String&gt;\`\` createConsumer() {
    final Properties props = new Properties();
    props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,
        &quot;localhost:9092,another-host.com:29092&quot;);
    props.put(ConsumerConfig.GROUP_ID_CONFIG,
        &quot;MySampleConsumer&quot;);
    props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,
        LongDeserializer.class.getName());
    props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,
        StringDeserializer.class.getName());
    // 使用props创建消费者。
    final Consumer\`\`&lt;Long, String&gt;\`\` consumer = new KafkaConsumer&lt;&gt;(props);
    // 订阅主题。
    consumer.subscribe(Arrays.asList(&quot;samples&quot;));
    return consumer;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用Spring Boot和Spring的Kafka集成，我们可以简单地配置_application.properties_：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring.kafka.bootstrap-servers=localhost:9092,another-host.com:29092
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们了解到Kafka是一个由多个代理组成的分布式系统，这些代理复制主题分区以确保高可用性、可扩展性和容错性。</p><p>客户端需要从一个代理中检索元数据以找到当前的分区领导者进行连接。这个代理随后就是一个bootstrap服务器，我们通常提供一个bootstrap服务器列表，以便在主代理无法访问时给客户端提供替代方案。</p><p>如常，所有的代码实现都可以在GitHub上找到。</p>`,39),o=[s];function r(p,l){return t(),e("div",null,o)}const u=a(i,[["render",r],["__file","2024-07-01-bootstrap server in Kafka Configuration.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-bootstrap%20server%20in%20Kafka%20Configuration.html","title":"Kafka配置中的bootstrap服务器","lang":"zh-CN","frontmatter":{"date":"2023-08-01T00:00:00.000Z","category":["Java","Kafka"],"tag":["bootstrap.servers","Kafka configuration"],"head":[["meta",{"name":"keywords","content":"Kafka, bootstrap.servers, configuration, Java, scalability, high availability"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-bootstrap%20server%20in%20Kafka%20Configuration.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kafka配置中的bootstrap服务器"}],["meta",{"property":"og:description","content":"Kafka配置中的bootstrap服务器 在实现Kafka生产者或消费者时（例如，使用Spring），我们需要配置的一个属性是“bootstrap.servers”。 1. 概述 本文将介绍这个设置的含义及其用途。 2. Kafka拓扑结构 Kafka的拓扑结构设计用于可扩展性和高可用性。这就是为什么有一个服务器集群（代理）处理代理之间复制的主题分区..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/08/kafka-topology-1024x549-1-300x161.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T19:27:08.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"bootstrap.servers"}],["meta",{"property":"article:tag","content":"Kafka configuration"}],["meta",{"property":"article:published_time","content":"2023-08-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T19:27:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kafka配置中的bootstrap服务器\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/08/kafka-topology-1024x549-1-300x161.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/08/kafka-topology-failure-1024x581-1-300x170.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/08/2023_07_31_06_39_45_naughty_newton_Container_Docker_Desktop-300x102.png\\"],\\"datePublished\\":\\"2023-08-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T19:27:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kafka配置中的bootstrap服务器 在实现Kafka生产者或消费者时（例如，使用Spring），我们需要配置的一个属性是“bootstrap.servers”。 1. 概述 本文将介绍这个设置的含义及其用途。 2. Kafka拓扑结构 Kafka的拓扑结构设计用于可扩展性和高可用性。这就是为什么有一个服务器集群（代理）处理代理之间复制的主题分区..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Kafka拓扑结构","slug":"_2-kafka拓扑结构","link":"#_2-kafka拓扑结构","children":[]},{"level":2,"title":"3. Bootstrapping","slug":"_3-bootstrapping","link":"#_3-bootstrapping","children":[]},{"level":2,"title":"4. 示例","slug":"_4-示例","link":"#_4-示例","children":[{"level":3,"title":"4.1. 使用Kafka CLI","slug":"_4-1-使用kafka-cli","link":"#_4-1-使用kafka-cli","children":[]},{"level":3,"title":"4.2. 使用Java","slug":"_4-2-使用java","link":"#_4-2-使用java","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719862028000,"updatedTime":1719862028000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.89,"words":1168},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-bootstrap server in Kafka Configuration.md","localizedDate":"2023年8月1日","excerpt":"\\n<p>在实现Kafka生产者或消费者时（例如，使用Spring），我们需要配置的一个属性是“bootstrap.servers”。</p>\\n<h2>1. 概述</h2>\\n<p>本文将介绍这个设置的含义及其用途。</p>\\n<h2>2. Kafka拓扑结构</h2>\\n<p>Kafka的拓扑结构设计用于可扩展性和高可用性。这就是为什么有一个服务器集群（代理）处理代理之间复制的主题分区。每个分区有一个代理作为领导者，其他代理作为跟随者。</p>\\n<p>生产者将消息发送到分区领导者，然后该领导者将记录传播到每个副本。消费者通常也连接到分区领导者，因为消费消息是状态变化的（消费者偏移量）。</p>\\n<p>副本的数量是复制因子。推荐值为3，因为它在性能和容错性之间提供了正确的平衡，并且云服务提供商通常提供三个数据中心（可用区）作为区域的一部分进行部署。</p>","autoDesc":true}');export{u as comp,g as data};
