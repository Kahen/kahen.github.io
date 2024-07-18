import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app-CE5go3V-.js";const s={},i=n('<hr><h1 id="在apache-kafka主题中获取消息数量" tabindex="-1"><a class="header-anchor" href="#在apache-kafka主题中获取消息数量"><span>在Apache Kafka主题中获取消息数量</span></a></h1><p>Apache Kafka是一个开源的分布式事件流平台。</p><p>在这个快速教程中，我们将学习获取Kafka主题中消息数量的技术。<strong>我们将展示程序化以及原生命令技术。</strong></p><h3 id="_2-程序化技术" tabindex="-1"><a class="header-anchor" href="#_2-程序化技术"><span>2. 程序化技术</span></a></h3><p>Kafka主题可能有多个分区。<strong>我们的技术应该确保我们计算了每个分区中的消息数量。</strong></p><p>**我们必须逐个检查每个分区的最新偏移量。**为此，我们将引入一个消费者：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>KafkaConsumer``&lt;String, String&gt;`` consumer = new KafkaConsumer``&lt;String, String&gt;``(props);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>第二步是<strong>从这个消费者获取所有分区</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>List`&lt;TopicPartition&gt;` partitions = consumer.partitionsFor(topic).stream().map(p -&gt; new TopicPartition(topic, p.partition()))\n    .collect(Collectors.toList());\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>第三步是<strong>在每个分区的末尾对消费者进行偏移，并在分区映射中记录结果</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>consumer.assign(partitions);\nconsumer.seekToEnd(Collections.emptySet());\nMap`&lt;TopicPartition, Long&gt;` endPartitions = partitions.stream().collect(Collectors.toMap(Function.identity(), consumer::position));\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后一步是<strong>获取每个分区中的最后位置并将结果相加以获取主题中的消息数量</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>numberOfMessages = partitions.stream().mapToLong(p -&gt; endPartitions.get(p)).sum();\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-kafka原生命令" tabindex="-1"><a class="header-anchor" href="#_3-kafka原生命令"><span>3. Kafka原生命令</span></a></h3><p>程序化技术对于我们想要对Kafka主题中的消息数量执行一些自动化任务时非常有用。**然而，如果只是为了分析目的，创建这些服务并在机器上运行它们将是一个负担。**一个直接的选择是利用Kafka的原生命令。它将提供快速的结果。</p><h4 id="_3-1-使用getoffsetshell命令" tabindex="-1"><a class="header-anchor" href="#_3-1-使用getoffsetshell命令"><span>3.1. 使用GetoffsetShell命令</span></a></h4><p>在执行原生命令之前，我们必须导航到机器上的Kafka根文件夹。以下命令返回了主题_baeldung_上发布的消息数量：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ bin/kafka-run-class.sh kafka.tools.GetOffsetShell --broker-list localhost:9092 --topic baeldung | awk -F &quot;:&quot; &#39;{sum += $3} END {print &quot;Result: &quot;sum}&#39;\nResult: 3\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-使用消费者控制台" tabindex="-1"><a class="header-anchor" href="#_3-2-使用消费者控制台"><span>3.2. 使用消费者控制台</span></a></h4><p>如前所述，我们将在执行任何命令之前导航到Kafka的根文件夹。以下命令返回了主题_baeldung_上发布的消息数量：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ bin/kafka-console-consumer.sh --from-beginning --bootstrap-server localhost:9092 --property print.key=true --property print.value=false --property print.partition --topic baeldung --timeout-ms 5000 | tail -n 10|grep &quot;Processed a total of&quot;\nProcessed a total of 3 messages\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h3><p>在本文中，我们探讨了获取Kafka主题中消息数量的技术。我们学习了一种程序化技术，它将所有分区分配给一个消费者并检查最新的偏移量。</p><p>我们还看到了两种Kafka原生命令技术。一种是Kafka工具中的_GetoffsetShell_命令。另一种是在控制台上运行消费者并打印从开始的消息数量。</p><p>如往常一样，本文的源代码可以在GitHub上找到。</p>',26),r=[i];function o(l,p){return t(),a("div",null,r)}const h=e(s,[["render",o],["__file","2024-07-16-Get the Number of Messages in an Apache Kafka Topic.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-Get%20the%20Number%20of%20Messages%20in%20an%20Apache%20Kafka%20Topic.html","title":"在Apache Kafka主题中获取消息数量","lang":"zh-CN","frontmatter":{"date":"2024-07-16T00:00:00.000Z","category":["Apache Kafka","消息计数"],"tag":["Kafka","消息数量","编程技巧"],"head":[["meta",{"name":"keywords","content":"Apache Kafka, 消息计数, Kafka主题, 编程技巧"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-Get%20the%20Number%20of%20Messages%20in%20an%20Apache%20Kafka%20Topic.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Apache Kafka主题中获取消息数量"}],["meta",{"property":"og:description","content":"在Apache Kafka主题中获取消息数量 Apache Kafka是一个开源的分布式事件流平台。 在这个快速教程中，我们将学习获取Kafka主题中消息数量的技术。我们将展示程序化以及原生命令技术。 2. 程序化技术 Kafka主题可能有多个分区。我们的技术应该确保我们计算了每个分区中的消息数量。 **我们必须逐个检查每个分区的最新偏移量。**为此，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T12:06:58.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kafka"}],["meta",{"property":"article:tag","content":"消息数量"}],["meta",{"property":"article:tag","content":"编程技巧"}],["meta",{"property":"article:published_time","content":"2024-07-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T12:06:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Apache Kafka主题中获取消息数量\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T12:06:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Apache Kafka主题中获取消息数量 Apache Kafka是一个开源的分布式事件流平台。 在这个快速教程中，我们将学习获取Kafka主题中消息数量的技术。我们将展示程序化以及原生命令技术。 2. 程序化技术 Kafka主题可能有多个分区。我们的技术应该确保我们计算了每个分区中的消息数量。 **我们必须逐个检查每个分区的最新偏移量。**为此，..."},"headers":[{"level":3,"title":"2. 程序化技术","slug":"_2-程序化技术","link":"#_2-程序化技术","children":[]},{"level":3,"title":"3. Kafka原生命令","slug":"_3-kafka原生命令","link":"#_3-kafka原生命令","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721131618000,"updatedTime":1721131618000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.3,"words":689},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-Get the Number of Messages in an Apache Kafka Topic.md","localizedDate":"2024年7月16日","excerpt":"<hr>\\n<h1>在Apache Kafka主题中获取消息数量</h1>\\n<p>Apache Kafka是一个开源的分布式事件流平台。</p>\\n<p>在这个快速教程中，我们将学习获取Kafka主题中消息数量的技术。<strong>我们将展示程序化以及原生命令技术。</strong></p>\\n<h3>2. 程序化技术</h3>\\n<p>Kafka主题可能有多个分区。<strong>我们的技术应该确保我们计算了每个分区中的消息数量。</strong></p>\\n<p>**我们必须逐个检查每个分区的最新偏移量。**为此，我们将引入一个消费者：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>KafkaConsumer``&lt;String, String&gt;`` consumer = new KafkaConsumer``&lt;String, String&gt;``(props);\\n</code></pre></div>","autoDesc":true}');export{h as comp,u as data};
