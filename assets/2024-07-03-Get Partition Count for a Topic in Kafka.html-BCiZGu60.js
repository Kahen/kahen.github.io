import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as i}from"./app-DpYLEM_u.js";const n={},r=i(`<h1 id="获取kafka主题的分区数量" tabindex="-1"><a class="header-anchor" href="#获取kafka主题的分区数量"><span>获取Kafka主题的分区数量</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将探讨检索Kafka主题总分区数的不同方法。在简要介绍Kafka分区是什么以及我们为什么可能需要检索这些信息之后，我们将编写Java代码来执行此操作。然后，我们将看到如何使用命令行界面（CLI）获取这些信息。</p><p>Kafka主题可以被划分为多个分区。拥有多个分区的目标是能够同时从同一主题消费消息。因为拥有比现有分区更多的消费者是没有用的，<strong>主题中的Kafka分区数量代表了消费的最大并行级别</strong>。因此，事先知道给定主题有多少分区对于正确地调整相应消费者的规模是有用的。</p><h2 id="_3-使用java检索分区数量" tabindex="-1"><a class="header-anchor" href="#_3-使用java检索分区数量"><span>3. 使用Java检索分区数量</span></a></h2><p>要使用Java检索特定主题的分区数量，我们可以依赖于_KafkaProducer.partitionFor(topic)_方法。此方法将返回给定主题的分区元数据：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Properties producerProperties = new Properties();
// producerProperties.put(&quot;key&quot;,&quot;value&quot;) ...
KafkaProducer\`&lt;String, String&gt;\` producer = new KafkaProducer&lt;&gt;(producerProperties);
List\`&lt;PartitionInfo&gt;\` info = producer.partitionsFor(TOPIC);
Assertions.assertEquals(3, info.size());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此方法返回的_PartitionInfo_列表的大小将完全等于为特定主题配置的分区数量。</p><p>如果我们无法访问_Producer_，我们可以使用Kafka_AdminClient_以稍微复杂的方式实现相同的结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Properties props = new Properties();
// props.put(&quot;key&quot;,&quot;value&quot;) ...
AdminClient client = AdminClient.create(props);
DescribeTopicsResult describeTopicsResult = client.describeTopics(Collections.singletonList(TOPIC));
Map\`&lt;String, KafkaFuture&gt;\` values = describeTopicsResult.values();
KafkaFuture topicDescription = values.get(TOPIC);
Assertions.assertEquals(3, topicDescription.get().partitions().size());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们依赖于_KafkaClient.describeTopic(topic)<em>方法，该方法返回一个_DescribeTopicsResult_对象，其中包含一个待执行的未来任务的_Map</em>。这里我们只检索我们需要的_Topic_的_TopicDescription_，最后检索分区数量。</p><h2 id="_4-使用cli检索分区数量" tabindex="-1"><a class="header-anchor" href="#_4-使用cli检索分区数量"><span>4. 使用CLI检索分区数量</span></a></h2><p>我们有几种选项可以使用CLI检索给定主题的分区数量。</p><p>首先，我们可以依赖于每个Kafka安装附带的shell脚本并运行：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ kafka-topics --describe --bootstrap-server localhost:9092 --topic topic_name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此命令将输出指定主题的完整描述：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Topic:topic_name        PartitionCount:3        ReplicationFactor:1     Configs: ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>另一个选项是使用Kafkacat，这是一个非JVM的Kafka消费者和生产者。使用元数据列表模式（-L），这个shell实用程序显示了Kafka集群的当前状态，包括其所有主题和分区。要显示特定主题的元数据信息，我们可以运行以下命令：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ kafkacat -L -b localhost:9092 -t topic_name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此命令的输出将是：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Metadata for topic topic_name (from broker 1: mybroker:9092/1):
  topic &quot;topic_name&quot; with 3 partitions:
    partition 0, leader 3, replicas: 1,2,3, isrs: 1,2,3
    partition 1, leader 1, replicas: 1,2,3, isrs: 1,2,3
    partition 2, leader 1, replicas: 1,2, isrs: 1,2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到，这个shell实用程序命令还显示了有关特定主题及其分区的有用详细信息。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这个简短的教程中，我们已经看到了如何使用Java和CLI检索特定Kafka主题的总分区数。</p><p>我们首先看到了检索这些信息的用途，然后使用了_KafkaProducer_和_KafkaAdmin_。最后，我们使用了Kafka脚本实用程序和KafkaCat的shell命令。</p><p>一如既往，文章的完整源代码可以在GitHub上找到。</p>`,26),s=[r];function o(l,d){return t(),a("div",null,s)}const u=e(n,[["render",o],["__file","2024-07-03-Get Partition Count for a Topic in Kafka.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-Get%20Partition%20Count%20for%20a%20Topic%20in%20Kafka.html","title":"获取Kafka主题的分区数量","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Kafka"],"tag":["Kafka","Partitions"],"head":[["meta",{"name":"keywords","content":"Java, Kafka, Partitions"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-Get%20Partition%20Count%20for%20a%20Topic%20in%20Kafka.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"获取Kafka主题的分区数量"}],["meta",{"property":"og:description","content":"获取Kafka主题的分区数量 1. 引言 在本教程中，我们将探讨检索Kafka主题总分区数的不同方法。在简要介绍Kafka分区是什么以及我们为什么可能需要检索这些信息之后，我们将编写Java代码来执行此操作。然后，我们将看到如何使用命令行界面（CLI）获取这些信息。 Kafka主题可以被划分为多个分区。拥有多个分区的目标是能够同时从同一主题消费消息。因..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T23:55:33.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kafka"}],["meta",{"property":"article:tag","content":"Partitions"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T23:55:33.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"获取Kafka主题的分区数量\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T23:55:33.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"获取Kafka主题的分区数量 1. 引言 在本教程中，我们将探讨检索Kafka主题总分区数的不同方法。在简要介绍Kafka分区是什么以及我们为什么可能需要检索这些信息之后，我们将编写Java代码来执行此操作。然后，我们将看到如何使用命令行界面（CLI）获取这些信息。 Kafka主题可以被划分为多个分区。拥有多个分区的目标是能够同时从同一主题消费消息。因..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"3. 使用Java检索分区数量","slug":"_3-使用java检索分区数量","link":"#_3-使用java检索分区数量","children":[]},{"level":2,"title":"4. 使用CLI检索分区数量","slug":"_4-使用cli检索分区数量","link":"#_4-使用cli检索分区数量","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720050933000,"updatedTime":1720050933000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.8,"words":840},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-Get Partition Count for a Topic in Kafka.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将探讨检索Kafka主题总分区数的不同方法。在简要介绍Kafka分区是什么以及我们为什么可能需要检索这些信息之后，我们将编写Java代码来执行此操作。然后，我们将看到如何使用命令行界面（CLI）获取这些信息。</p>\\n<p>Kafka主题可以被划分为多个分区。拥有多个分区的目标是能够同时从同一主题消费消息。因为拥有比现有分区更多的消费者是没有用的，<strong>主题中的Kafka分区数量代表了消费的最大并行级别</strong>。因此，事先知道给定主题有多少分区对于正确地调整相应消费者的规模是有用的。</p>\\n<h2>3. 使用Java检索分区数量</h2>","autoDesc":true}');export{u as comp,m as data};
