import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-BMOUrRO4.js";const p={},e=t('<hr><h1 id="如何在apache-kafka主题中获取最后n条消息" tabindex="-1"><a class="header-anchor" href="#如何在apache-kafka主题中获取最后n条消息"><span>如何在Apache Kafka主题中获取最后N条消息</span></a></h1><ol><li>引言</li></ol><p>在本简短教程中，我们将看到如何从Apache Kafka主题中检索最后N条消息。</p><p>在文章的第一部分，我们将关注执行此操作所需的先决条件。在第二部分，我们将使用Kafka Java API库构建一个小型实用程序来使用Java读取消息。最后，我们将提供简短的指导，以使用KafkaCat从命令行实现相同的结果。</p><ol start="2"><li>先决条件</li></ol><p><strong>从Kafka主题检索最后N条消息就像从明确定义的偏移量开始消费消息一样简单。</strong> Kafka主题中的偏移量表示消费者的当前位置。在之前的文章中，我们已经看到如何利用_consumer.seekToEnd()_方法从一个Apache Kafka主题中获取特定数量的消息。</p><p>考虑到相同的功能，我们可以通过执行简单的减法来计算正确的偏移量：offset = lastOffset – N。然后我们可以从这个位置开始轮询N条消息。</p><p>然而，如果我们使用_事务生产者_生产记录，这种方法将不起作用。在这种情况下，偏移量将跳过一些数字以适应Kafka主题事务记录（提交/回滚等）。事务生产者的一个常见用例是我们需要精确一次处理Kafka消息。简单来说，如果我们从（lastOffset – N）开始读取消息，我们可能会消费少于N条消息，因为一些偏移数字被事务记录消耗了。</p><ol start="3"><li>使用Java在Kafka主题中获取最后N条消息</li></ol><p>首先，我们需要创建一个_生产者_和一个_消费者_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Properties</span> producerProperties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nproducerProperties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ProducerConfig</span><span class="token punctuation">.</span><span class="token constant">BOOTSTRAP_SERVERS_CONFIG</span><span class="token punctuation">,</span> <span class="token constant">KAFKA_CONTAINER</span><span class="token punctuation">.</span><span class="token function">getBootstrapServers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nproducerProperties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ProducerConfig</span><span class="token punctuation">.</span><span class="token constant">KEY_SERIALIZER_CLASS_CONFIG</span><span class="token punctuation">,</span> <span class="token class-name">StringSerializer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nproducerProperties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ProducerConfig</span><span class="token punctuation">.</span><span class="token constant">VALUE_SERIALIZER_CLASS_CONFIG</span><span class="token punctuation">,</span> <span class="token class-name">StringSerializer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">Properties</span> consumerProperties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsumerProperties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ConsumerConfig</span><span class="token punctuation">.</span><span class="token constant">BOOTSTRAP_SERVERS_CONFIG</span><span class="token punctuation">,</span> <span class="token constant">KAFKA_CONTAINER</span><span class="token punctuation">.</span><span class="token function">getBootstrapServers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsumerProperties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ConsumerConfig</span><span class="token punctuation">.</span><span class="token constant">KEY_DESERIALIZER_CLASS_CONFIG</span><span class="token punctuation">,</span> <span class="token class-name">StringDeserializer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsumerProperties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ConsumerConfig</span><span class="token punctuation">.</span><span class="token constant">VALUE_DESERIALIZER_CLASS_CONFIG</span><span class="token punctuation">,</span> <span class="token class-name">StringDeserializer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsumerProperties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ConsumerConfig</span><span class="token punctuation">.</span><span class="token constant">GROUP_ID_CONFIG</span><span class="token punctuation">,</span> <span class="token string">&quot;ConsumerGroup1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">KafkaProducer</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```` producer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">KafkaProducer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">(</span>producerProperties<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">KafkaConsumer</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```` consumer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">KafkaConsumer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">(</span>consumerProperties<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我产生一些消息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">TOPIC1</span> <span class="token operator">=</span> <span class="token string">&quot;baeldung-topic&quot;</span><span class="token punctuation">;</span>\n<span class="token keyword">int</span> messagesInTopic <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i `<span class="token operator">&lt;</span> messagesInTopic<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    producer<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ProducerRecord</span><span class="token punctuation">(</span><span class="token constant">TOPIC1</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token constant">MESSAGE_KEY</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了清晰和简单，让我们假设我们的消费者只需要注册一个分区：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">TopicPartition</span> partition <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TopicPartition</span><span class="token punctuation">(</span><span class="token constant">TOPIC1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TopicPartition</span><span class="token punctuation">&gt;</span></span>` partitions <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\npartitions<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>partition<span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsumer<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>partitions<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们之前提到的，我们需要将偏移量定位在正确的位置，然后我们可以开始轮询：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> messagesToRetrieve <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>\nconsumer<span class="token punctuation">.</span><span class="token function">seekToEnd</span><span class="token punctuation">(</span>partitions<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">long</span> startIndex <span class="token operator">=</span> consumer<span class="token punctuation">.</span><span class="token function">position</span><span class="token punctuation">(</span>partition<span class="token punctuation">)</span> <span class="token operator">-</span> messagesToRetrieve<span class="token punctuation">;</span>\nconsumer<span class="token punctuation">.</span><span class="token function">seek</span><span class="token punctuation">(</span>partition<span class="token punctuation">,</span> startIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">ConsumerRecords</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```` records <span class="token operator">=</span> consumer<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token class-name">Duration</span><span class="token punctuation">.</span><span class="token function">ofMinutes</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>如果网络特别慢，或者要检索的消息数量特别大，我们可能需要增加轮询持续时间。</strong> 在这种情况下，我们需要考虑在内存中拥有大量记录可能会导致资源短缺问题。</p><p>现在让我们最后检查一下我们是否确实检索到了正确数量的消息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">ConsumerRecord</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```` record <span class="token operator">:</span> records<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">MESSAGE_KEY</span><span class="token punctuation">,</span> record<span class="token punctuation">.</span><span class="token function">key</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>record<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token punctuation">(</span>messagesInTopic <span class="token operator">-</span> messagesToRetrieve<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    recordsReceived<span class="token operator">++</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span>messagesToRetrieve<span class="token punctuation">,</span> recordsReceived<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>使用KafkaCat在Kafka主题中获取最后N条消息</li></ol><p>KafkaCat（kcat）是一个命令行工具，我们可以用它来测试和调试Kafka主题。Kafka本身提供了很多脚本和shell工具来执行相同的操作。尽管如此，_KafkaCat_的简单性和易用性使其成为执行如在Apache Kafka主题中检索最后N条消息等操作的事实标准。安装后，可以通过运行这个简单命令来检索Kafka主题中最新产生的N条消息：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kafkacat <span class="token parameter variable">-C</span> <span class="token parameter variable">-b</span> localhost:9092 <span class="token parameter variable">-t</span> topic-name <span class="token parameter variable">-o</span> -<span class="token variable"><span class="token variable">`</span><span class="token operator">&lt;</span>N<span class="token operator">&gt;</span><span class="token variable">`</span></span> <span class="token parameter variable">-e</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><em>-C</em> 表示我们需要消费消息</li><li><em>-b</em> 表示Kafka代理的位置</li><li><em>-t</em> 表示主题名称</li><li><em>-o</em> 表示我们需要从这个偏移量开始读取。负号意味着我们需要从末尾读取N条消息。</li><li><em>-e</em> 选项在读取最后一条消息后退出</li></ul><p>与我们之前讨论的案例相联系，检索名为_“baeldung-topic”_的主题的_最后10条消息_的命令是：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kafkacat <span class="token parameter variable">-C</span> <span class="token parameter variable">-b</span> localhost:9092 <span class="token parameter variable">-t</span> baeldung-topic <span class="token parameter variable">-o</span> <span class="token parameter variable">-10</span> <span class="token parameter variable">-e</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="5"><li>结论</li></ol><p>在本简短教程中，我们看到了如何消费Kafka主题中的最新N条消息。在第一部分，我们使用了Java Kafka API库。在第二部分，我们使用了一个名为KafkaCat的命令行实用程序。</p><p>如常，代码可在GitHub上找到。</p>',30),o=[e];function c(l,i){return s(),n("div",null,o)}const k=a(p,[["render",c],["__file","2024-07-05-Get Last N Messages in Apache Kafka Topic.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Get%20Last%20N%20Messages%20in%20Apache%20Kafka%20Topic.html","title":"如何在Apache Kafka主题中获取最后N条消息","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Apache Kafka"],"tag":["Kafka","Java","Tutorial"],"head":[["meta",{"name":"keywords","content":"Apache Kafka, Java, Tutorial, Last N Messages"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Get%20Last%20N%20Messages%20in%20Apache%20Kafka%20Topic.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Apache Kafka主题中获取最后N条消息"}],["meta",{"property":"og:description","content":"如何在Apache Kafka主题中获取最后N条消息 引言 在本简短教程中，我们将看到如何从Apache Kafka主题中检索最后N条消息。 在文章的第一部分，我们将关注执行此操作所需的先决条件。在第二部分，我们将使用Kafka Java API库构建一个小型实用程序来使用Java读取消息。最后，我们将提供简短的指导，以使用KafkaCat从命令行实现..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T16:38:43.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kafka"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Tutorial"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T16:38:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Apache Kafka主题中获取最后N条消息\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T16:38:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Apache Kafka主题中获取最后N条消息 引言 在本简短教程中，我们将看到如何从Apache Kafka主题中检索最后N条消息。 在文章的第一部分，我们将关注执行此操作所需的先决条件。在第二部分，我们将使用Kafka Java API库构建一个小型实用程序来使用Java读取消息。最后，我们将提供简短的指导，以使用KafkaCat从命令行实现..."},"headers":[],"git":{"createdTime":1720197523000,"updatedTime":1720197523000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.74,"words":1122},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Get Last N Messages in Apache Kafka Topic.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>如何在Apache Kafka主题中获取最后N条消息</h1>\\n<ol>\\n<li>引言</li>\\n</ol>\\n<p>在本简短教程中，我们将看到如何从Apache Kafka主题中检索最后N条消息。</p>\\n<p>在文章的第一部分，我们将关注执行此操作所需的先决条件。在第二部分，我们将使用Kafka Java API库构建一个小型实用程序来使用Java读取消息。最后，我们将提供简短的指导，以使用KafkaCat从命令行实现相同的结果。</p>\\n<ol start=\\"2\\">\\n<li>先决条件</li>\\n</ol>\\n<p><strong>从Kafka主题检索最后N条消息就像从明确定义的偏移量开始消费消息一样简单。</strong> Kafka主题中的偏移量表示消费者的当前位置。在之前的文章中，我们已经看到如何利用_consumer.seekToEnd()_方法从一个Apache Kafka主题中获取特定数量的消息。</p>","autoDesc":true}');export{k as comp,d as data};
