import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as i}from"./app-CJGTm_7y.js";const s={},p=i('<hr><h1 id="redis-sentinel与集群部署-baeldung" tabindex="-1"><a class="header-anchor" href="#redis-sentinel与集群部署-baeldung"><span>Redis Sentinel与集群部署 | Baeldung</span></a></h1><p>在本教程中，我们将讨论Redis及其两种不同的部署策略：Redis Sentinel和Redis Cluster。然后，我们将讨论这些策略之间的区别及其细微差别。</p><p><strong>最终，我们希望能够充分了解Redis，以判断哪种部署策略更好地满足我们的需求</strong>。</p><h2 id="_2-redis简介" tabindex="-1"><a class="header-anchor" href="#_2-redis简介"><span>2. Redis简介</span></a></h2><p>Redis是一个开源的内存数据结构存储，可以用作键值数据库、缓存以及许多其他用例。它旨在提供对数据的高速访问。</p><p>我们的目标是分析并比较这两种不同的策略：Redis Sentinel和Redis Cluster。</p><p>Redis Sentinel是Redis提供的一个单独进程。其目标是监控Redis实例，提供通知功能、主节点发现、在故障情况下自动故障转移以及通过多数投票进行主节点选举。**换句话说，Sentinel是一个分布式系统，为Redis提供了额外的功能，如高可用性和故障转移。**Redis Sentinel与标准Redis部署相结合。</p><p>Redis Cluster是一种进一步扩展的部署策略。与Sentinel类似，它提供了故障转移、配置管理等。<strong>不同之处在于分片能力，这使我们能够几乎线性地扩展容量，最多可达1000个节点</strong>。</p><h2 id="_3-基本概念" tabindex="-1"><a class="header-anchor" href="#_3-基本概念"><span>3. 基本概念</span></a></h2><p>为了帮助我们理解两种策略的细微差别，我们首先尝试内化一些基本概念和构建块。</p><p>一些概念可能与Redis Cluster或Sentinel没有严格关系。然而，其他概念可能适用于两者，但了解它们将帮助我们理解Redis。</p><h3 id="_3-1-数据库" tabindex="-1"><a class="header-anchor" href="#_3-1-数据库"><span>3.1. 数据库</span></a></h3><p>Redis支持多个逻辑数据库。尽管仍然保存在同一个文件中，但它们允许用户在每个数据库中使用相同的键具有不同的值。它们就像不同的数据库架构。</p><p><strong>默认情况下，Redis提供16个逻辑数据库，但用户可以更改此数量</strong>。这些数据库按其索引标识，从零开始。</p><p><strong>另一个需要强调的重要事项是Redis是一个单线程数据存储</strong>。因此，所有数据库操作都进入同一个执行管道。</p><h3 id="_3-2-哈希槽" tabindex="-1"><a class="header-anchor" href="#_3-2-哈希槽"><span>3.2. 哈希槽</span></a></h3><p>Redis Cluster的工作原理与标准版略有不同。<strong>例如，为了自动分片数据并将其分布在集群的各个节点上，Redis Cluster使用所谓的哈希槽</strong>。</p><p>Redis Cluster不使用一致性哈希来完成分发工作。相反，它使用哈希槽。</p><p><strong>每个集群有16384个哈希槽，可以分布在所有节点上</strong>，<strong>在所有操作期间，Redis客户端使用键来计算哈希，方法是取键的CRC16模16384</strong>。然后，它用它将命令路由到正确的节点。</p><p>每个节点被分配了一组哈希槽，并且可以使用resharding或rebalance操作在节点之间移动槽。此外，由于这种方法的特点，Redis Cluster不允许每个节点有多个逻辑数据库。<strong>因此，每个节点中只有数据库零可用</strong>。</p><p>最后，由于键在哈希槽中的分布，<strong>Redis Cluster在多键操作方面有一个问题。这些操作仍然可用，尽管所有涉及的键都必须属于同一个哈希槽。否则，Redis会拒绝请求</strong>。</p><h3 id="_3-3-哈希标签" tabindex="-1"><a class="header-anchor" href="#_3-3-哈希标签"><span>3.3. 哈希标签</span></a></h3><p><strong>这种机制帮助用户保证一组键进入同一个哈希槽</strong>。要定义一个哈希标签，用户必须在键中添加一个括号内的子字符串。例如，键app1{user:123}.mykey1和app1{user:123}.mykey2将进入同一个哈希槽。</p><p>通过这样做，Redis只使用子字符串生成键的哈希，并据此将所有键路由到同一个哈希槽。</p><h3 id="_3-4-异步复制" tabindex="-1"><a class="header-anchor" href="#_3-4-异步复制"><span>3.4. 异步复制</span></a></h3><p>Redis Cluster和标准版都使用异步复制。这意味着<strong>Redis不等待副本确认写入</strong>。</p><p>此外，总会有一个微小的时间窗口，在这个窗口中，故障可能会导致确认的写入丢失。然而，有方法可以通过尽可能缩短这个时间窗口来减轻这种风险。但再次强调，风险总是存在的，所以Redis不保证强一致性。</p><h3 id="_3-5-故障转移" tabindex="-1"><a class="header-anchor" href="#_3-5-故障转移"><span>3.5. 故障转移</span></a></h3><p>Redis提供了不同的机制来处理故障并保证一定程度的容错。使用Sentinel的标准Redis和Redis Cluster都有这样的工具。这些系统配备了基于健康检查和超时的故障检测器。</p><p>在Redis Cluster的情况下，它使用心跳和gossip协议。为了本文的目的，我们不会深入这些内容。但总的来说，每个节点都与其他节点交谈，交换带有元数据的数据包，并在特定节点不响应时计算一些超时。</p><p>关于Sentinel，每个Sentinel实例监视一个Redis实例。Sentinel实例还在彼此之间通信，并且根据配置，可能会由于通信问题和超时执行故障转移。</p><h3 id="_3-6-主节点选举" tabindex="-1"><a class="header-anchor" href="#_3-6-主节点选举"><span>3.6. 主节点选举</span></a></h3><p>再次，两种实现都有投票策略，过程有不同的阶段。但主要目标是决定是否应该发生故障转移以及提升哪一个。</p><p><strong>Sentinel使用法定人数的概念</strong>。法定人数是至少需要多少个Sentinel实例来达成共识，以确定主节点是否可达。</p><p>一旦发生这种情况，主节点被标记为失败，并且如果可能的话，最终将开始故障转移过程。之后，至少需要多数Sentinel授权故障转移并选举负责故障转移的Sentinel实例。然后，这个实例选择最佳的读取副本进行提升并执行故障转移。最后，实例开始向其他Sentinel实例广播新的设置。</p><p><strong>当涉及到Redis Cluster时，过程会有所改变</strong>。这次，副本节点负责。正如我们之前提到的，在这种情况下，所有节点都相互通信，所以一旦一个或多个副本检测到故障，它们可以开始选举。下一步是请求主节点的投票。投票发生后，副本获得故障转移权。</p><p>鉴于这些投票机制的性质，<strong>Redis建议总是使用奇数个节点的集群，这适用于两种实现</strong>。</p><h3 id="_3-7-网络分区" tabindex="-1"><a class="header-anchor" href="#_3-7-网络分区"><span>3.7. 网络分区</span></a></h3><p>Redis可以承受许多不同的故障，其设计足够健壮，即使在节点故障时也能提供持续操作。然而，我们可能面临的一个关键问题场景是所谓的网络分区。</p><p>这类问题中最直接的问题之一是所谓的脑裂。让我们使用以下示例：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/10/split_brain_step1-1024x553.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在这里，我们可以观察到我们有一个网络分区，从一边，一个客户端正在与我们现在只能到达两个实例的集群通信，即1和2。</p><p>在另一边，另一个客户端与另一个分区通信，其中只有3和4在分区中可达。假设我们的法定人数是2，在某个时候，右侧将发生故障转移，我们将达到以下结果：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/10/split_brain_step2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>现在，我们有两个集群（Redis 3已被提升为主节点）。在某个时候，当网络分区消失时，如果在同一密钥上使用不同的值在分离期间写入了两侧，集群可能会有问题。</p><p>我们可以将相同的原理应用于Redis Cluster，结果将是类似的。**这表明了为什么推荐使用奇数，并且使用诸如_min-replicas-to-write_这样的配置。**想法是始终拥有多数和少数分区，只有多数才能执行故障转移。</p><p>正如我们可以想象的，网络分区期间还有许多其他可能的场景。因此，无论我们选择哪种选项，在设计我们的集群时，了解并记住这一点至关重要。</p><p>下面的表格比较了它们的一些主要特点：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/10/redis_standard_with_sentinel_vs_cluster-1024x472-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们可以通过使用Redis Cluster和标准实现结合Redis Sentinel的所有细节和细微差别来连接点。</p><p>我们可以得出结论，Sentinel提供监控、容错和通知。它还是一个配置提供者。此外，<strong>它可以提供认证能力和客户端服务发现。它可以提供16个逻辑数据库，异步复制和高可用性集群。</strong></p><p>然而，<strong>Redis的单线程特性和垂直扩展的限制是Sentinel扩展能力的限制因素</strong>。然而，对于小型和中型项目，它可能是理想的。</p><p>Sentinel部署需要的节点更少，<strong>因此更具成本效益</strong>。</p><p>值得一提的是，我们还可以进一步扩展只读操作，通过使用只读副本。</p><p><strong>Redis Cluster是一个完全分布式的实现，具有自动化分片能力（水平扩展能力），专为高性能和线性扩展设计，最多可达1000个节点</strong>。此外，它提供了合理的写入安全性，并提供了一种在大多数主数据可以从多数侧访问的情况下生存灾难的手段（通过主节点或副本能够执行故障转移）。</p><p>另一个要点是，在网络分区期间，集群的少数部分将停止接受请求。另一方面，根据配置，Sentinel部署可能继续部分工作。如前所述，集群的可用性和容错取决于集群的配置和组成。</p><p>集群版本还提供了重新配置主节点和副本节点之间映射的能力，以便在单个节点发生多个独立故障时重新平衡。然而，再次强调，为了一个更强大的集群，需要更多的节点，因此成本更高。<strong>此外，管理更多的节点和平衡分片是不可忽视的额外复杂性。</strong></p><p><strong>总之，当涉及到需要高吞吐量和扩展能力的大数据集的大型部署时，Redis Cluster表现出色。</strong></p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们讨论了Redis及其不同的实现，Redis Cluster和使用Sentinel的标准Redis。</p><p>我们还了解了所有解决方案的基本构建块以及如何使用它们来最大限度地利用它们。我们希望根据用例决定使用哪种选项。</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/10/redis_standard_with_sentinel_vs_cluster-1024x472-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/10/split_brain_step1-1024x553.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/10/split_brain_step2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/10/redis_standard_with_sentinel_vs_cluster-1024x472-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>OK</p>',67),a=[p];function l(r,d){return n(),t("div",null,a)}const c=e(s,[["render",l],["__file","2024-07-13-Redis Sentinel vs Clustering.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Redis%20Sentinel%20vs%20Clustering.html","title":"Redis Sentinel与集群部署 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-10-01T00:00:00.000Z","category":["Redis","数据库"],"tag":["Redis Sentinel","Redis Cluster"],"head":[["meta",{"name":"keywords","content":"Redis Sentinel, Redis Cluster, 数据库, 高可用性, 水平扩展"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Redis%20Sentinel%20vs%20Clustering.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Redis Sentinel与集群部署 | Baeldung"}],["meta",{"property":"og:description","content":"Redis Sentinel与集群部署 | Baeldung 在本教程中，我们将讨论Redis及其两种不同的部署策略：Redis Sentinel和Redis Cluster。然后，我们将讨论这些策略之间的区别及其细微差别。 最终，我们希望能够充分了解Redis，以判断哪种部署策略更好地满足我们的需求。 2. Redis简介 Redis是一个开源的内存..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/10/split_brain_step1-1024x553.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T22:44:22.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Redis Sentinel"}],["meta",{"property":"article:tag","content":"Redis Cluster"}],["meta",{"property":"article:published_time","content":"2022-10-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T22:44:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Redis Sentinel与集群部署 | Baeldung\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/10/split_brain_step1-1024x553.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/10/split_brain_step2.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/10/redis_standard_with_sentinel_vs_cluster-1024x472-1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/10/redis_standard_with_sentinel_vs_cluster-1024x472-1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/10/split_brain_step1-1024x553.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/10/split_brain_step2.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/10/redis_standard_with_sentinel_vs_cluster-1024x472-1.png\\"],\\"datePublished\\":\\"2022-10-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T22:44:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Redis Sentinel与集群部署 | Baeldung 在本教程中，我们将讨论Redis及其两种不同的部署策略：Redis Sentinel和Redis Cluster。然后，我们将讨论这些策略之间的区别及其细微差别。 最终，我们希望能够充分了解Redis，以判断哪种部署策略更好地满足我们的需求。 2. Redis简介 Redis是一个开源的内存..."},"headers":[{"level":2,"title":"2. Redis简介","slug":"_2-redis简介","link":"#_2-redis简介","children":[]},{"level":2,"title":"3. 基本概念","slug":"_3-基本概念","link":"#_3-基本概念","children":[{"level":3,"title":"3.1. 数据库","slug":"_3-1-数据库","link":"#_3-1-数据库","children":[]},{"level":3,"title":"3.2. 哈希槽","slug":"_3-2-哈希槽","link":"#_3-2-哈希槽","children":[]},{"level":3,"title":"3.3. 哈希标签","slug":"_3-3-哈希标签","link":"#_3-3-哈希标签","children":[]},{"level":3,"title":"3.4. 异步复制","slug":"_3-4-异步复制","link":"#_3-4-异步复制","children":[]},{"level":3,"title":"3.5. 故障转移","slug":"_3-5-故障转移","link":"#_3-5-故障转移","children":[]},{"level":3,"title":"3.6. 主节点选举","slug":"_3-6-主节点选举","link":"#_3-6-主节点选举","children":[]},{"level":3,"title":"3.7. 网络分区","slug":"_3-7-网络分区","link":"#_3-7-网络分区","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720910662000,"updatedTime":1720910662000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":8.93,"words":2680},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Redis Sentinel vs Clustering.md","localizedDate":"2022年10月1日","excerpt":"<hr>\\n<h1>Redis Sentinel与集群部署 | Baeldung</h1>\\n<p>在本教程中，我们将讨论Redis及其两种不同的部署策略：Redis Sentinel和Redis Cluster。然后，我们将讨论这些策略之间的区别及其细微差别。</p>\\n<p><strong>最终，我们希望能够充分了解Redis，以判断哪种部署策略更好地满足我们的需求</strong>。</p>\\n<h2>2. Redis简介</h2>\\n<p>Redis是一个开源的内存数据结构存储，可以用作键值数据库、缓存以及许多其他用例。它旨在提供对数据的高速访问。</p>\\n<p>我们的目标是分析并比较这两种不同的策略：Redis Sentinel和Redis Cluster。</p>","autoDesc":true}');export{c as comp,u as data};
