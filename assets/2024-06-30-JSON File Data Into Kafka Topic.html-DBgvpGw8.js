import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-DRFG6C5y.js";const t={},o=e(`<h1 id="kafka主题中传输json文件数据" tabindex="-1"><a class="header-anchor" href="#kafka主题中传输json文件数据"><span>Kafka主题中传输JSON文件数据</span></a></h1><p>Apache Kafka是一个开源的、容错性强、高度可扩展的流处理平台。它遵循发布-订阅架构来实时流式传输数据。我们可以通过将数据放入队列中，以非常低的延迟处理大量数据。有时，我们需要将JSON类型的数据发送到Kafka主题进行数据处理和分析。</p><p>在本教程中，我们将学习如何将JSON数据流式传输到Kafka主题。此外，我们还将了解如何为JSON数据配置Kafka生产者和消费者。</p><h3 id="_2-kafka中json数据的重要性" tabindex="-1"><a class="header-anchor" href="#_2-kafka中json数据的重要性"><span>2. Kafka中JSON数据的重要性</span></a></h3><p>从架构上讲，Kafka支持系统中的消息流。因此，我们也可以向Kafka服务器发送JSON数据。<strong>如今，在现代应用系统中，每个应用程序主要处理JSON数据，因此以JSON格式进行通信变得非常重要。</strong> 通过以JSON格式发送数据，有助于实时跟踪用户及其在网站和应用程序上的行为。</p><p>将JSON类型的数据流式传输到Kafka服务器有助于实时数据分析。它促进了事件驱动的架构，每个微服务订阅其相关主题，并实时提供更改。使用Kafka主题和JSON格式，可以轻松地传输IOT数据，实现微服务之间的通信，并聚合指标。</p><h3 id="_3-kafka设置" tabindex="-1"><a class="header-anchor" href="#_3-kafka设置"><span>3. Kafka设置</span></a></h3><p>要将JSON流式传输到Kafka服务器，我们首先需要设置Kafka代理和Zookeeper。我们可以按照本教程设置完整的Kafka服务器。现在，让我们检查创建Kafka主题_baeldung_的命令，我们将在该主题上生产和消费JSON数据：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> kafka kafka-topics.sh <span class="token parameter variable">--create</span> <span class="token parameter variable">--topic</span> baeldung
  <span class="token parameter variable">--partitions</span> <span class="token number">1</span> --replication-factor <span class="token number">1</span> --bootstrap-server kafka:9092
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的命令创建了一个具有1个副本因子的Kafka主题_baeldung_。这里，我们创建了一个只有1个副本因子的Kafka主题，因为它仅用于演示目的。在真实情况下，我们可能需要多副本因子**，因为它有助于系统故障转移情况。此外，它提供了数据的高可用性和可靠性。**</p><h3 id="_4-生产数据" tabindex="-1"><a class="header-anchor" href="#_4-生产数据"><span>4. 生产数据</span></a></h3><p>Kafka生产者是整个Kafka生态系统中最基本的组件，它提供了向Kafka服务器生产数据的功能。为了演示，让我们看看使用_docker-compose_命令启动生产者的命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> kafka kafka-console-producer.sh <span class="token parameter variable">--topic</span> baeldung
  --broker-list kafka:9092
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的命令中，我们创建了一个Kafka生产者，向Kafka代理发送消息。此外，要发送JSON数据类型，我们需要调整命令。在继续之前，让我们首先创建一个示例JSON文件_sampledata.json_：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token number">26</span><span class="token punctuation">,</span>
    <span class="token property">&quot;email&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test@baeldung.com&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;city&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Bucharest&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;occupation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Software Engineer&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;company&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Baeldung Inc.&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;interests&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;programming&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;hiking&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;reading&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述_sampledata.json_文件以JSON格式包含用户基本信息。要将JSON数据发送到Kafka主题，我们需要_jq_库，因为它在处理JSON数据方面非常强大。为了演示，让我们安装_jq_库，将此JSON数据传递给Kafka生产者：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> jq
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面的命令简单地在Linux机器上安装了_jq_库。此外，让我们看看发送JSON数据的命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ jq <span class="token parameter variable">-rc</span> <span class="token builtin class-name">.</span> sampledata.json <span class="token operator">|</span> <span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-T</span> kafka kafka-console-producer.sh <span class="token parameter variable">--topic</span> baeldung --broker-list kafka:9092
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述命令是一行命令，用于在Docker环境中处理并将JSON数据流式传输到Kafka主题。首先，<em>jq_命令处理_sampledata.json</em>，然后使用-r_选项，确保JSON数据以行格式且不带引号。之后，-c_选项确保数据以单行显示，以便数据可以轻松地流式传输到相应的Kafka主题。</p><h3 id="_5-消费数据" tabindex="-1"><a class="header-anchor" href="#_5-消费数据"><span>5. 消费数据</span></a></h3><p>到目前为止，我们已经成功地将JSON数据发送到_baeldung_ Kafka主题。现在，让我们看看消费这些数据的命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> kafka kafka-console-consumer.sh <span class="token parameter variable">--topic</span> baeldung  --from-beginning --bootstrap-server kafka:9092
<span class="token punctuation">{</span><span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;test&quot;</span>,<span class="token string">&quot;age&quot;</span>:26,<span class="token string">&quot;email&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;test@baeldung.com&quot;</span>,<span class="token string">&quot;city&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Bucharest&quot;</span>,<span class="token string">&quot;occupation&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Software Engineer&quot;</span>,<span class="token string">&quot;company&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Baeldung Inc.&quot;</span>,<span class="token string">&quot;interests&quot;</span>:<span class="token punctuation">[</span><span class="token string">&quot;programming&quot;</span>,<span class="token string">&quot;hiking&quot;</span>,<span class="token string">&quot;reading&quot;</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的命令从开始消费所有发送到_baeldung_主题的数据。在前一节中，我们发送了JSON数据。因此，它也消费了该JSON数据。简而言之，上述命令允许用户积极监控发送到_baeldung_主题的所有消息。它使用基于Kafka的消息系统促进实时数据消费。</p><h3 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h3><p>在本文中，我们探讨了如何将JSON数据流式传输到Kafka主题。首先，我们创建了一个示例JSON，然后我们使用生产者将该JSON流式传输到Kafka主题。之后，我们使用_docker-compose_命令消费了这些数据。</p><p><strong>简言之，我们涵盖了使用Kafka生产者和消费者将JSON格式数据发送到主题的所有必要步骤。此外，由于JSON可以处理优雅更新而不影响现有数据，因此它提供了模式演化。</strong></p>`,27),p=[o];function i(l,c){return s(),n("div",null,p)}const u=a(t,[["render",i],["__file","2024-06-30-JSON File Data Into Kafka Topic.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-JSON%20File%20Data%20Into%20Kafka%20Topic.html","title":"Kafka主题中传输JSON文件数据","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Kafka"],"tag":["JSON","Kafka","Streaming"],"head":[["meta",{"name":"keywords","content":"Java, JSON, Kafka, Streaming, Data Processing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-JSON%20File%20Data%20Into%20Kafka%20Topic.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kafka主题中传输JSON文件数据"}],["meta",{"property":"og:description","content":"Kafka主题中传输JSON文件数据 Apache Kafka是一个开源的、容错性强、高度可扩展的流处理平台。它遵循发布-订阅架构来实时流式传输数据。我们可以通过将数据放入队列中，以非常低的延迟处理大量数据。有时，我们需要将JSON类型的数据发送到Kafka主题进行数据处理和分析。 在本教程中，我们将学习如何将JSON数据流式传输到Kafka主题。此外..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T19:25:02.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JSON"}],["meta",{"property":"article:tag","content":"Kafka"}],["meta",{"property":"article:tag","content":"Streaming"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T19:25:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kafka主题中传输JSON文件数据\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T19:25:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kafka主题中传输JSON文件数据 Apache Kafka是一个开源的、容错性强、高度可扩展的流处理平台。它遵循发布-订阅架构来实时流式传输数据。我们可以通过将数据放入队列中，以非常低的延迟处理大量数据。有时，我们需要将JSON类型的数据发送到Kafka主题进行数据处理和分析。 在本教程中，我们将学习如何将JSON数据流式传输到Kafka主题。此外..."},"headers":[{"level":3,"title":"2. Kafka中JSON数据的重要性","slug":"_2-kafka中json数据的重要性","link":"#_2-kafka中json数据的重要性","children":[]},{"level":3,"title":"3. Kafka设置","slug":"_3-kafka设置","link":"#_3-kafka设置","children":[]},{"level":3,"title":"4. 生产数据","slug":"_4-生产数据","link":"#_4-生产数据","children":[]},{"level":3,"title":"5. 消费数据","slug":"_5-消费数据","link":"#_5-消费数据","children":[]},{"level":3,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719775502000,"updatedTime":1719775502000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.25,"words":1275},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-JSON File Data Into Kafka Topic.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Apache Kafka是一个开源的、容错性强、高度可扩展的流处理平台。它遵循发布-订阅架构来实时流式传输数据。我们可以通过将数据放入队列中，以非常低的延迟处理大量数据。有时，我们需要将JSON类型的数据发送到Kafka主题进行数据处理和分析。</p>\\n<p>在本教程中，我们将学习如何将JSON数据流式传输到Kafka主题。此外，我们还将了解如何为JSON数据配置Kafka生产者和消费者。</p>\\n<h3>2. Kafka中JSON数据的重要性</h3>\\n<p>从架构上讲，Kafka支持系统中的消息流。因此，我们也可以向Kafka服务器发送JSON数据。<strong>如今，在现代应用系统中，每个应用程序主要处理JSON数据，因此以JSON格式进行通信变得非常重要。</strong> 通过以JSON格式发送数据，有助于实时跟踪用户及其在网站和应用程序上的行为。</p>","autoDesc":true}');export{u as comp,d as data};
