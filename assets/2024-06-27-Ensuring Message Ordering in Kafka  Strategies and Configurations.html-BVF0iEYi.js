import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as n,a as t}from"./app-CJGTm_7y.js";const s={},r=t(`<h1 id="在kafka中确保消息顺序-策略和配置-baeldung" tabindex="-1"><a class="header-anchor" href="#在kafka中确保消息顺序-策略和配置-baeldung"><span>在Kafka中确保消息顺序：策略和配置 | Baeldung</span></a></h1><p>在这篇文章中，我们将探讨Apache Kafka中关于消息顺序的挑战和解决方案。在分布式系统中，按正确顺序处理消息对于维护数据的完整性和一致性至关重要。虽然Kafka提供了维护消息顺序的机制，但在分布式环境中实现这一点有其自身的复杂性。</p><h3 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h3><h3 id="_2-分区内的顺序及其挑战" tabindex="-1"><a class="header-anchor" href="#_2-分区内的顺序及其挑战"><span>2. 分区内的顺序及其挑战</span></a></h3><p>Kafka通过为每条消息分配一个唯一的偏移量来在单个分区内保持顺序。这保证了在该分区内消息的顺序追加。然而，当我们扩展并使用多个分区时，保持全局顺序就变得复杂了。不同的分区以不同的速率接收消息，这使得跨分区的严格排序变得复杂。</p><h4 id="_2-1-生产者和消费者的时间安排" tabindex="-1"><a class="header-anchor" href="#_2-1-生产者和消费者的时间安排"><span>2.1 生产者和消费者的时间安排</span></a></h4><p>让我们谈谈Kafka如何处理消息的顺序。生产者发送消息的顺序和消费者接收它们的顺序之间有一些差异。通过坚持使用一个分区，我们可以按它们到达代理的顺序处理消息。然而，这种顺序可能与我们最初发送它们的顺序不匹配。这种混乱可能发生的原因包括网络延迟或如果我们正在重发消息。为了保持一致性，我们可以实施具有确认和重试的生产者。这样，我们确保消息不仅到达Kafka，而且以正确的顺序到达。</p><h4 id="_2-2-多分区的挑战" tabindex="-1"><a class="header-anchor" href="#_2-2-多分区的挑战"><span>2.2 多分区的挑战</span></a></h4><p>这种跨分区的分布，虽然对可扩展性和容错性有益，但引入了实现全局消息顺序的复杂性。例如，我们按顺序发送两条消息，M1和M2。Kafka就像我们发送的那样接收它们，但是将它们放在不同的分区中。这里的问题是，仅仅因为M1首先发送，并不意味着它将在M2之前被处理。这在处理顺序至关重要的情况下可能具有挑战性，例如金融交易。</p><h4 id="_2-3-单分区消息顺序" tabindex="-1"><a class="header-anchor" href="#_2-3-单分区消息顺序"><span>2.3 单分区消息顺序</span></a></h4><p>我们创建了名为&#39;single_partition_topic&#39;的主题，它有一个分区，以及名为&#39;multi_partition_topic&#39;的主题，它有5个分区。下面是一个具有单个分区的主题的示例，生产者正在向该主题发送消息：</p><p><em>UserEvent</em> 是一个实现了 <em>Comparable</em> 接口的 POJO 类，有助于按 <em>globalSequenceNumber</em>（外部序列号）对消息类进行排序。由于生产者正在发送 POJO 消息对象，我们实现了自定义的 Jackson 序列化器和反序列化器。</p><p>分区 0 接收所有用户事件，事件 ID 以以下顺序出现：</p><p>在 Kafka 中，每个消费者组作为一个独立的实体操作。如果两个消费者属于不同的消费者组，它们都将接收主题上的所有消息。这是因为 <strong>Kafka将每个消费者组视为单独的订阅者</strong>。</p><p>如果两个消费者属于同一个消费者组并订阅了一个有多个分区的主题，<strong>Kafka将确保</strong> <strong>每个消费者从一组唯一的分区中读取</strong>。这是为了允许消息的同时处理。</p><p>Kafka 确保在消费者组内，没有两个消费者读取相同的消息，因此每个消息在每个组中只被处理一次。</p><p>下面的代码是同一个消费者从同一个主题消费消息的示例：</p><p>在这种情况下，我们得到的输出显示消费者以相同的顺序消费消息，以下是输出中的顺序事件 ID：</p><h3 id="_2-4-多分区消息顺序" tabindex="-1"><a class="header-anchor" href="#_2-4-多分区消息顺序"><span>2.4 多分区消息顺序</span></a></h3><p>对于具有多个分区的主题，消费者和生产者的配置是相同的。唯一的区别是消息去往的主题和分区，生产者向主题 &#39;<em>multi_partition_topic</em>&#39; 发送消息：</p><p>消费者从同一个主题消费消息：</p><p>生产者的输出列出了事件 ID 及其相应的分区，如下所示：</p><p>对于消费者，输出将显示消费者不是以相同的顺序消费消息。输出中的事件 ID 如下：</p><h3 id="_3-1-使用单个分区" tabindex="-1"><a class="header-anchor" href="#_3-1-使用单个分区"><span>3.1 使用单个分区</span></a></h3><p>我们可以在 Kafka 中使用单个分区，正如我们之前用 &#39;<em>single_partition_topic</em>&#39; 的示例所示，这确保了消息的顺序。然而，这种方法有其权衡：</p><ul><li>吞吐量限制：想象我们在一家繁忙的披萨店。如果我们只有一个厨师（生产者）和一个服务员（消费者）在一张桌子上（分区）工作，他们在事情开始堆积之前只能服务这么多披萨。在 Kafka 的世界里，当我们处理大量消息时，坚持使用单个分区就像那种一张桌子的场景。在高容量场景中，单个分区成为瓶颈，消息处理速率受到限制，因为只有一个生产者和一个消费者可以同时在单个分区上操作。</li><li>减少并行性：在上述例子中，如果我们有多个厨师（生产者）和服务员（消费者）在多张桌子上（分区）工作，那么完成的订单数量就会增加。Kafka 的优势在于跨多个分区的并行处理。只有一个分区，这种优势就丧失了，导致顺序处理，并进一步限制了消息流。</li></ul><p>本质上，<strong>单个分区保证了顺序，但代价是减少了吞吐量</strong>。</p><h3 id="_3-2-外部排序与时间窗口缓冲" tabindex="-1"><a class="header-anchor" href="#_3-2-外部排序与时间窗口缓冲"><span>3.2 外部排序与时间窗口缓冲</span></a></h3><p>在这种方法中，生产者为每条消息标记一个全局序列号。多个消费者实例并发地从不同分区消费消息，并使用这些序列号重新排序消息，以确保全局顺序。</p><p>在具有多个生产者的现实场景中，<strong>我们将通过所有生产者进程都可以访问的共享资源来管理全局序列，例如数据库序列或分布式计数器</strong>。这确保了序列号在所有消息中是唯一和有序的，无论哪个生产者发送它们：</p><p>在消费者端，我们将消息分组到时间窗口中，然后按顺序处理它们。我们在特定时间框架内到达的消息将其批量在一起，一旦窗口到期，我们处理该批次。这确保了在该时间框架内的有序处理，即使它们在窗口内的到达时间不同。消费者根据序列号缓冲消息并在处理前重新排序。我们需要确保消息按正确顺序处理，为此，消费者应该有一个缓冲期，在处理缓冲消息之前多次轮询消息，并且这个缓冲期足够长，以应对潜在的消息排序问题：</p><p>每个事件 ID 在输出中与其相应的分区一起显示，如下所示：</p><p>消费者输出带有全局序列号和事件 ID：</p><h3 id="_3-3-外部排序与缓冲的考虑因素" tabindex="-1"><a class="header-anchor" href="#_3-3-外部排序与缓冲的考虑因素"><span>3.3 外部排序与缓冲的考虑因素</span></a></h3><p>在这种方法中，每个消费者实例缓冲消息，并根据其序列号按顺序处理它们。然而，有一些考虑因素：</p><ul><li>缓冲区大小：缓冲区的大小可以根据传入消息的数量增加。在优先考虑按序列号严格排序的实现中，我们可能会看到缓冲区的显著增长，特别是如果消息传递有延迟。例如，如果我们每分钟处理 100 条消息，但突然由于延迟收到 200 条，缓冲区将意外增长。因此，我们必须有效地管理缓冲区大小，并在超出预期限制时准备好策略。</li><li>延迟：当我们缓冲消息时，我们实际上是让它们在处理前等待一段时间（引入延迟）。一方面，它帮助我们保持有序；另一方面，它减慢了整个过程。关键是在保持顺序和最小化延迟之间找到正确的平衡。</li><li>故障：如果消费者失败，我们可能会丢失缓冲的消息，为了防止这种情况，我们可能需要定期保存我们的缓冲状态。</li><li>迟到的消息：在处理窗口之后到达的消息将顺序错误。根据用例，我们可能需要策略来处理或丢弃这样的消息。</li><li>状态管理：如果处理涉及有状态操作，我们将需要机制来管理并跨窗口持久化状态。</li><li>资源利用：在缓冲区保留大量消息需要内存。我们需要确保我们有足够的资源来处理这一点，特别是如果消息在缓冲区中停留的时间更长。</li></ul><h3 id="_3-4-幂等生产者" tabindex="-1"><a class="header-anchor" href="#_3-4-幂等生产者"><span>3.4 幂等生产者</span></a></h3><p>Kafka 的幂等生产者功能旨在精确地传递消息一次，从而防止任何重复。这在生产者可能因网络错误或其他瞬时故障而重试发送消息的情况下至关重要。幂等性的主要目标是防止消息重复，但它间接地影响了消息顺序。Kafka 使用两件事来实现幂等性：生产者 ID（PID）和作为幂等性键的序列号，该序列号在特定分区的上下文中是唯一的。</p><ul><li>序列号：Kafka 为生产者发送的每条消息分配序列号。这些序列号在每个分区中是唯一的，确保生产者按特定顺序发送的消息在 Kafka 接收时，在同一分区内以相同的顺序被写入。序列号保证单个分区内的顺序。然而，在向多个分区生产消息时，没有跨分区的全局顺序保证。例如，如果生产者将消息 M1、M2 和 M3 分别发送到分区 P1、P2 和 P3，那么每个消息在其分区内获得一个唯一的序列号。然而，这并不能保证这些分区的相对消费顺序。</li><li>生产者 ID（PID）：启用幂等性时，代理为每个生产者分配一个唯一的生产者 ID（PID）。这个 PID 结合序列号，使 Kafka 能够识别并丢弃由于生产者重试而产生的任何重复消息。</li></ul><p><strong>Kafka 通过按生产顺序将消息写入分区来保证消息顺序，感谢序列号，并通过 PID 和幂等性功能防止重复。</strong> 要启用幂等生产者，我们需要在生产者的配置中将 <em>“enable.idempotence”</em> 属性设置为 true：</p><h3 id="_4-生产者和消费者的关键配置" tabindex="-1"><a class="header-anchor" href="#_4-生产者和消费者的关键配置"><span>4. 生产者和消费者的关键配置</span></a></h3><p>有一些关键的 Kafka 生产者和消费者配置可以影响消息顺序和吞吐量。</p><h4 id="_4-1-4-1-生产者配置" tabindex="-1"><a class="header-anchor" href="#_4-1-4-1-生产者配置"><span>4.1#### 4.1 生产者配置</span></a></h4><ul><li><p><strong>MAX_IN_FLIGHT_REQUESTS_PER_CONNECTION</strong>: 如果我们发送大量消息，Kafka 中的此设置有助于决定我们可以在不等待“读取”回执的情况下发送多少消息。如果我们将此值设置为高于 1 而没有启用幂等性，如果我们需要重发消息，我们可能会扰乱消息的顺序。但是，如果我们启用了幂等性，Kafka 即使我们一次发送很多消息，也能保持消息顺序。如果我们想要非常严格的顺序，比如确保每条消息在发送下一条消息之前都被读取，我们应该将此值设置为 1。如果我们想要优先考虑速度而不是完美的顺序，我们可以设置为 5，但这可能会引入顺序问题。</p></li><li><p><strong>BATCH_SIZE_CONFIG 和 LINGER_MS_CONFIG</strong>: Kafka 控制默认的批处理大小（以字节为单位），目的是将同一分区的记录分组为较少的请求，以获得更好的性能。如果我们将此限制设置得太低，我们将发送很多小的组，这可能会减慢我们的速度。但如果我们设置得太高，可能不是对内存的最佳利用。Kafka 可以在发送组之前稍等片刻，如果它还没有满。这个等待时间由 LINGER_MS_CONFIG 控制。如果更多的消息足够快地到达以填满我们设定的限制，它们会立即发送，如果没有，Kafka 不会继续等待 - 它会在时间到了时发送我们所拥有的任何东西。这就像在速度和效率之间进行平衡，确保我们一次发送足够多的消息，而没有不必要的延迟。</p></li></ul><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">props.put(ProducerConfig.MAX_IN_FLIGHT_REQUESTS_PER_CONNECTION,</span> <span class="token value attr-value">&quot;1&quot;);</span>
<span class="token key attr-name">props.put(ProducerConfig.BATCH_SIZE_CONFIG,</span> <span class="token value attr-value">&quot;16384&quot;);</span>
<span class="token key attr-name">props.put(ProducerConfig.LINGER_MS_CONFIG,</span> <span class="token value attr-value">&quot;5&quot;);</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-2-消费者配置" tabindex="-1"><a class="header-anchor" href="#_4-2-消费者配置"><span>4.2 消费者配置</span></a></h4><ul><li><p><strong>MAX_POLL_RECORDS_CONFIG</strong>: 它是 Kafka 消费者每次请求数据时获取的记录数量的限制。如果我们将这个数字设置得很高，我们可以一次吞噬大量数据，提高我们的吞吐量。但有一个陷阱 - 我们获取的越多，保持一切有序可能就越困难。所以，我们需要找到那个甜蜜点，我们既高效又不被压垮。</p></li><li><p><strong>FETCH_MIN_BYTES_CONFIG</strong>: 如果我们将这个数字设置得很高，Kafka 会等待直到它有足够的数据来满足我们的最小字节数才会发送它。这可能意味着更少的行程（或获取），这对效率有好处。但如果我们急于想要快速获取数据，我们可能会将这个数字设置得更低，这样 Kafka 就会更快地发送它所拥有的任何东西。例如，如果我们的消费者应用程序是资源密集型的或需要维护严格的消息顺序，尤其是在多线程情况下，较小的批次可能更有益。</p></li><li><p><strong>FETCH_MAX_WAIT_MS_CONFIG</strong>: 这将决定我们的消费者等待 Kafka 收集足够的数据以满足我们的 FETCH_MIN_BYTES_CONFIG 的时间。如果我们将这个时间设置得很高，我们的消费者愿意等待更长的时间，可能会一次性获取更多的数据。但如果我们急于行动，我们设置得更低，这样我们的消费者即使没有那么多数据也会更快地获取数据。这是在等待更多收获和快速行动之间的权衡。</p></li></ul><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">props.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG,</span> <span class="token value attr-value">&quot;500&quot;);</span>
<span class="token key attr-name">props.put(ConsumerConfig.FETCH_MIN_BYTES_CONFIG,</span> <span class="token value attr-value">&quot;1&quot;);</span>
<span class="token key attr-name">props.put(ConsumerConfig.FETCH_MAX_WAIT_MS_CONFIG,</span> <span class="token value attr-value">&quot;500&quot;);</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇文章中，我们深入探讨了 Kafka 中消息排序的复杂性。我们探讨了挑战并提出了解决策略。无论是通过单分区、外部排序与时间窗口缓冲，还是幂等生产者，Kafka 提供了定制化的解决方案来满足消息排序的需求。</p><p>如常，示例的源代码可在 GitHub 上获取。</p><p>OK</p>`,52),i=[r];function p(l,o){return n(),e("div",null,i)}const h=a(s,[["render",p],["__file","2024-06-27-Ensuring Message Ordering in Kafka  Strategies and Configurations.html.vue"]]),_=JSON.parse('{"path":"/posts/baeldung/2024-06-27/2024-06-27-Ensuring%20Message%20Ordering%20in%20Kafka%20%20Strategies%20and%20Configurations.html","title":"在Kafka中确保消息顺序：策略和配置 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Kafka","消息排序"],"tag":["Apache Kafka","消息顺序"],"head":[["meta",{"name":"keywords","content":"Kafka, 消息排序, 分布式系统, 数据一致性"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-27/2024-06-27-Ensuring%20Message%20Ordering%20in%20Kafka%20%20Strategies%20and%20Configurations.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Kafka中确保消息顺序：策略和配置 | Baeldung"}],["meta",{"property":"og:description","content":"在Kafka中确保消息顺序：策略和配置 | Baeldung 在这篇文章中，我们将探讨Apache Kafka中关于消息顺序的挑战和解决方案。在分布式系统中，按正确顺序处理消息对于维护数据的完整性和一致性至关重要。虽然Kafka提供了维护消息顺序的机制，但在分布式环境中实现这一点有其自身的复杂性。 1. 概述 2. 分区内的顺序及其挑战 Kafka通过..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-27T09:30:25.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Apache Kafka"}],["meta",{"property":"article:tag","content":"消息顺序"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T09:30:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Kafka中确保消息顺序：策略和配置 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-27T09:30:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Kafka中确保消息顺序：策略和配置 | Baeldung 在这篇文章中，我们将探讨Apache Kafka中关于消息顺序的挑战和解决方案。在分布式系统中，按正确顺序处理消息对于维护数据的完整性和一致性至关重要。虽然Kafka提供了维护消息顺序的机制，但在分布式环境中实现这一点有其自身的复杂性。 1. 概述 2. 分区内的顺序及其挑战 Kafka通过..."},"headers":[{"level":3,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":3,"title":"2. 分区内的顺序及其挑战","slug":"_2-分区内的顺序及其挑战","link":"#_2-分区内的顺序及其挑战","children":[]},{"level":3,"title":"2.4 多分区消息顺序","slug":"_2-4-多分区消息顺序","link":"#_2-4-多分区消息顺序","children":[]},{"level":3,"title":"3.1 使用单个分区","slug":"_3-1-使用单个分区","link":"#_3-1-使用单个分区","children":[]},{"level":3,"title":"3.2 外部排序与时间窗口缓冲","slug":"_3-2-外部排序与时间窗口缓冲","link":"#_3-2-外部排序与时间窗口缓冲","children":[]},{"level":3,"title":"3.3 外部排序与缓冲的考虑因素","slug":"_3-3-外部排序与缓冲的考虑因素","link":"#_3-3-外部排序与缓冲的考虑因素","children":[]},{"level":3,"title":"3.4 幂等生产者","slug":"_3-4-幂等生产者","link":"#_3-4-幂等生产者","children":[]},{"level":3,"title":"4. 生产者和消费者的关键配置","slug":"_4-生产者和消费者的关键配置","link":"#_4-生产者和消费者的关键配置","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719480625000,"updatedTime":1719480625000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":12.48,"words":3745},"filePathRelative":"posts/baeldung/2024-06-27/2024-06-27-Ensuring Message Ordering in Kafka  Strategies and Configurations.md","localizedDate":"2024年6月27日","excerpt":"\\n<p>在这篇文章中，我们将探讨Apache Kafka中关于消息顺序的挑战和解决方案。在分布式系统中，按正确顺序处理消息对于维护数据的完整性和一致性至关重要。虽然Kafka提供了维护消息顺序的机制，但在分布式环境中实现这一点有其自身的复杂性。</p>\\n<h3>1. 概述</h3>\\n<h3>2. 分区内的顺序及其挑战</h3>\\n<p>Kafka通过为每条消息分配一个唯一的偏移量来在单个分区内保持顺序。这保证了在该分区内消息的顺序追加。然而，当我们扩展并使用多个分区时，保持全局顺序就变得复杂了。不同的分区以不同的速率接收消息，这使得跨分区的严格排序变得复杂。</p>\\n<h4>2.1 生产者和消费者的时间安排</h4>","autoDesc":true}');export{h as comp,_ as data};
