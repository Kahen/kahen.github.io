import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BEVMBw2k.js";const p={},e=t('<h1 id="kafka中的提交偏移量" tabindex="-1"><a class="header-anchor" href="#kafka中的提交偏移量"><span>Kafka中的提交偏移量</span></a></h1><p>在Kafka中，消费者从分区中读取消息。在读取消息时，需要考虑一些问题，比如确定从分区中读取哪些消息，或者防止在故障情况下重复读取消息或消息丢失。解决这些问题的方案是使用偏移量。</p><p>在本教程中，我们将学习Kafka中的偏移量。我们将看到如何提交偏移量来管理消息消费，并讨论其方法和缺点。</p><h2 id="_2-什么是偏移量" tabindex="-1"><a class="header-anchor" href="#_2-什么是偏移量"><span>2. 什么是偏移量？</span></a></h2><p>我们知道Kafka将消息存储在主题中，每个主题可以有多个分区。每个消费者从一个主题的分区中读取消息。在这里，<strong>Kafka通过偏移量来跟踪消费者读取的消息。</strong> 偏移量是从零开始的整数，随着消息的存储而递增。</p><p>假设一个消费者从一个分区中读取了五条消息。然后，根据配置，Kafka将偏移量标记为提交状态，直到_4_（基于零的序列）。下次消费者尝试读取消息时，它将从偏移量_5_开始消费消息。</p><p><strong>没有偏移量，就没有办法避免重复处理或数据丢失。这就是为什么它如此关键。</strong></p><p>我们可以将其与数据库存储进行类比。在数据库中，我们在执行SQL语句后提交以持久化更改。同样，在从分区读取后，我们提交偏移量以标记处理过的消息的位置。</p><h2 id="_3-提交偏移量的方式" tabindex="-1"><a class="header-anchor" href="#_3-提交偏移量的方式"><span>3. 提交偏移量的方式</span></a></h2><p><strong>有四种提交偏移量的方式。</strong> 我们将详细查看每种方式，并讨论它们的用例、优点和缺点。</p><p>让我们首先在_pom.xml_中添加Kafka客户端API依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`org.apache.kafka`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`kafka-clients`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`3.6.1`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-自动提交" tabindex="-1"><a class="header-anchor" href="#_3-1-自动提交"><span>3.1. 自动提交</span></a></h3><p>这是提交偏移量的最简单方式。<strong>Kafka默认使用自动提交——</strong> <strong>每五秒钟提交一次_poll()_方法返回的最大偏移量</strong>。_poll()_返回一组消息，超时时间为_10_秒，正如我们在代码中看到的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">KafkaConsumer</span>``````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````` consumer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">KafkaConsumer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsumer<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token class-name">KafkaConfigProperties</span><span class="token punctuation">.</span><span class="token function">getTopic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">ConsumerRecords</span>``````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````` messages <span class="token operator">=</span> consumer<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token class-name">Duration</span><span class="token punctuation">.</span><span class="token function">ofSeconds</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">ConsumerRecord</span>``````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````` message <span class="token operator">:</span> messages<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// 处理消息</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>自动提交的问题在于，如果应用程序失败，数据丢失的可能性非常高。当_poll()_返回消息时，<strong>Kafka可能会在处理消息之前提交最大的偏移量</strong>。</p><p>假设_poll()_返回了100条消息，消费者在自动提交发生时处理了60条消息。然后，由于某种故障，消费者崩溃了。当新的消费者上线读取消息时，它从偏移量101开始读取，导致61到100之间的消息丢失。</p><p>因此，我们需要其他方式来避免这个缺点。答案是手动提交。</p><h3 id="_3-2-手动同步提交" tabindex="-1"><a class="header-anchor" href="#_3-2-手动同步提交"><span>3.2. 手动同步提交</span></a></h3><p>在手动提交中，无论是同步还是异步，<strong>需要通过设置默认属性（_enabled.auto.commit_属性）为_false_来禁用自动提交</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Properties</span> props <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nprops<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ConsumerConfig</span><span class="token punctuation">.</span><span class="token constant">ENABLE_AUTO_COMMIT_CONFIG</span><span class="token punctuation">,</span> <span class="token string">&quot;false&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>禁用手动提交后，<strong>现在让我们了解_commitSync()_的使用</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">KafkaConsumer</span>``````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````` consumer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">KafkaConsumer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsumer<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token class-name">KafkaConfigProperties</span><span class="token punctuation">.</span><span class="token function">getTopic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">ConsumerRecords</span>``````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````` messages <span class="token operator">=</span> consumer<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token class-name">Duration</span><span class="token punctuation">.</span><span class="token function">ofSeconds</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token comment">// 处理消息</span>\nconsumer<span class="token punctuation">.</span><span class="token function">commitSync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这种方法通过在处理完消息后才提交偏移量来防止数据丢失</strong>。然而，如果消费者在提交偏移量之前崩溃，它并不能防止重复读取。此外，它还会影响应用程序的性能。</p><p>_commitSync()_会阻塞代码直到完成。另外，在出现错误的情况下，它会不断重试。这降低了应用程序的吞吐量，这是我们不希望看到的。因此，Kafka提供了另一种解决方案，异步提交，以解决这些缺点。</p><h3 id="_3-3-手动异步提交" tabindex="-1"><a class="header-anchor" href="#_3-3-手动异步提交"><span>3.3. 手动异步提交</span></a></h3><p>Kafka提供了_commitAsync()_来异步提交偏移量。<strong>它通过在不同的线程中提交偏移量来克服手动同步提交的性能开销</strong>。让我们实现一个异步提交来理解这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">KafkaConsumer</span>``````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````` consumer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">KafkaConsumer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsumer<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token class-name">KafkaConfigProperties</span><span class="token punctuation">.</span><span class="token function">getTopic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">ConsumerRecords</span>``````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````` messages <span class="token operator">=</span> consumer<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token class-name">Duration</span><span class="token punctuation">.</span><span class="token function">ofSeconds</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token comment">// 处理消息</span>\nconsumer<span class="token punctuation">.</span><span class="token function">commitAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>异步提交的问题在于，如果失败，它不会重试。它依赖于下一次_commitAsync()_调用，这将提交最新的偏移量。</p><p>假设300是我们想要提交的最大偏移量，但我们的_commitAsync()_由于某些问题失败了。在它重试之前，可能另一个_commitAsync()_调用已经提交了400作为最大偏移量，因为它是异步的。当失败的_commitAsync()_重试并且如果它成功提交了300的偏移量，它将覆盖之前400的提交，导致重复读取。这就是为什么_commitAsync()_不重试的原因。</p><h3 id="_3-4-提交特定偏移量" tabindex="-1"><a class="header-anchor" href="#_3-4-提交特定偏移量"><span>3.4. 提交特定偏移量</span></a></h3><p>有时，我们需要对偏移量有更多的控制。假设我们正在以小批量处理消息，并希望在处理完消息后立即提交偏移量。<strong>我们可以使用_commitSync()_和_commitAsync()_的重载方法，该方法接受一个映射参数来提交特定的偏移量</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">KafkaConsumer</span>``````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````` consumer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">KafkaConsumer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsumer<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token class-name">KafkaConfigProperties</span><span class="token punctuation">.</span><span class="token function">getTopic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Map</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TopicPartition</span><span class="token punctuation">,</span> <span class="token class-name">OffsetAndMetadata</span><span class="token punctuation">&gt;</span></span>` currentOffsets <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">int</span> messageProcessed <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ConsumerRecords</span>``````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````` messages <span class="token operator">=</span> consumer<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token class-name">Duration</span><span class="token punctuation">.</span><span class="token function">ofSeconds</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">ConsumerRecord</span>``````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````` message <span class="token operator">:</span> messages<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">// 处理一条消息</span>\n      messageProcessed<span class="token operator">++</span><span class="token punctuation">;</span>\n      currentOffsets<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>\n          <span class="token keyword">new</span> <span class="token class-name">TopicPartition</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">topic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> message<span class="token punctuation">.</span><span class="token function">partition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n          <span class="token keyword">new</span> <span class="token class-name">OffsetAndMetadata</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">offset</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>messageProcessed <span class="token operator">%</span> <span class="token number">50</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        consumer<span class="token punctuation">.</span><span class="token function">commitSync</span><span class="token punctuation">(</span>currentOffsets<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段代码中，我们管理一个currentOffsets映射，它以_TopicPartition_作为键，_OffsetAndMetadata_作为值。我们在消息处理期间将处理过的消息的_TopicPartition_和_OffsetAndMetadata_插入到_currentOffsets_映射中。当处理的消息数量达到五十时，我们使用_currentOffsets_映射调用_commitSync()_来标记这些消息为已提交。</p><p>这种方法的行为与同步和异步提交相同。唯一的区别是我们在这里决定提交的偏移量，而不是Kafka。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们学习了偏移量及其在Kafka中的重要性。此外，我们探讨了提交偏移量的四种方式，包括手动和自动。最后，我们分析了它们各自的优缺点。我们可以得出结论，Kafka中没有明确的最佳提交方式；相反，这取决于特定的用例。</p><p>本文中使用的所有代码示例都可以在GitHub上找到。</p>',38),o=[e];function c(l,i){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","2024-06-21-Commit Offsets in Kafka.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-21-Commit%20Offsets%20in%20Kafka.html","title":"Kafka中的提交偏移量","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Kafka","Commit Offsets"],"tag":["Kafka","Offsets","Commit"],"head":[["meta",{"name":"keywords","content":"Kafka, Commit Offsets, Message Consumption, Data Loss, Duplicate Processing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-21-Commit%20Offsets%20in%20Kafka.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kafka中的提交偏移量"}],["meta",{"property":"og:description","content":"Kafka中的提交偏移量 在Kafka中，消费者从分区中读取消息。在读取消息时，需要考虑一些问题，比如确定从分区中读取哪些消息，或者防止在故障情况下重复读取消息或消息丢失。解决这些问题的方案是使用偏移量。 在本教程中，我们将学习Kafka中的偏移量。我们将看到如何提交偏移量来管理消息消费，并讨论其方法和缺点。 2. 什么是偏移量？ 我们知道Kafka将..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kafka"}],["meta",{"property":"article:tag","content":"Offsets"}],["meta",{"property":"article:tag","content":"Commit"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kafka中的提交偏移量\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kafka中的提交偏移量 在Kafka中，消费者从分区中读取消息。在读取消息时，需要考虑一些问题，比如确定从分区中读取哪些消息，或者防止在故障情况下重复读取消息或消息丢失。解决这些问题的方案是使用偏移量。 在本教程中，我们将学习Kafka中的偏移量。我们将看到如何提交偏移量来管理消息消费，并讨论其方法和缺点。 2. 什么是偏移量？ 我们知道Kafka将..."},"headers":[{"level":2,"title":"2. 什么是偏移量？","slug":"_2-什么是偏移量","link":"#_2-什么是偏移量","children":[]},{"level":2,"title":"3. 提交偏移量的方式","slug":"_3-提交偏移量的方式","link":"#_3-提交偏移量的方式","children":[{"level":3,"title":"3.1. 自动提交","slug":"_3-1-自动提交","link":"#_3-1-自动提交","children":[]},{"level":3,"title":"3.2. 手动同步提交","slug":"_3-2-手动同步提交","link":"#_3-2-手动同步提交","children":[]},{"level":3,"title":"3.3. 手动异步提交","slug":"_3-3-手动异步提交","link":"#_3-3-手动异步提交","children":[]},{"level":3,"title":"3.4. 提交特定偏移量","slug":"_3-4-提交特定偏移量","link":"#_3-4-提交特定偏移量","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":5.41,"words":1623},"filePathRelative":"posts/baeldung/Archive/2024-06-21-Commit Offsets in Kafka.md","localizedDate":"2024年6月21日","excerpt":"\\n<p>在Kafka中，消费者从分区中读取消息。在读取消息时，需要考虑一些问题，比如确定从分区中读取哪些消息，或者防止在故障情况下重复读取消息或消息丢失。解决这些问题的方案是使用偏移量。</p>\\n<p>在本教程中，我们将学习Kafka中的偏移量。我们将看到如何提交偏移量来管理消息消费，并讨论其方法和缺点。</p>\\n<h2>2. 什么是偏移量？</h2>\\n<p>我们知道Kafka将消息存储在主题中，每个主题可以有多个分区。每个消费者从一个主题的分区中读取消息。在这里，<strong>Kafka通过偏移量来跟踪消费者读取的消息。</strong> 偏移量是从零开始的整数，随着消息的存储而递增。</p>","autoDesc":true}');export{r as comp,m as data};
