import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o,a as t}from"./app-on0L14Tx.js";const r={},p=t('<h1 id="kafka从zookeeper到kraft的转变" tabindex="-1"><a class="header-anchor" href="#kafka从zookeeper到kraft的转变"><span>Kafka从ZooKeeper到Kraft的转变</span></a></h1><p>Kafka在其架构中最近从ZooKeeper转变为基于仲裁的控制器，该控制器使用一种名为Kafka Raft的新共识协议，简称为Kraft（发音为“craft”）。</p><p>在本教程中，我们将探讨Kafka做出这一决定的原因，以及这一变化如何简化其架构并使其更加强大易用。</p><h3 id="_2-zookeeper简介" tabindex="-1"><a class="header-anchor" href="#_2-zookeeper简介"><span>2. ZooKeeper简介</span></a></h3><p>ZooKeeper是一个<strong>提供高度可靠的分布式协调服务</strong>。它最初由Yahoo!开发，用于简化在大数据集群上运行的流程。它起初是Hadoop的一个子项目，后来在2008年成为一个独立的Apache Foundation项目。它被广泛用于大型分布式系统中的多种用例。</p><h4 id="_2-1-zookeeper架构" tabindex="-1"><a class="header-anchor" href="#_2-1-zookeeper架构"><span>2.1 ZooKeeper架构</span></a></h4><p>ZooKeeper<strong>以分层命名空间存储数据</strong>，类似于标准文件系统。命名空间由称为znodes的数据寄存器组成。名称是由斜杠分隔的路径元素序列。</p><p>命名空间中的每个节点都由路径标识：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/11/ZooKeeper-Data-Model.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>ZooKeeper命名空间中可以有三种类型的znodes：</p><ul><li>第一种是持久性的，这是默认类型，直到被删除才会留在ZooKeeper中。</li><li>第二种是临时性的，如果在创建znode的会话断开连接，则会被删除。此外，临时znodes不能有子节点。</li><li>第三种是顺序的，我们可以使用它来创建像ID这样的顺序号。</li></ul><p>通过其简单的架构，ZooKeeper<strong>提供了一个可靠、快速处理和可扩展的系统</strong>。它旨在在一组称为集合的服务器上进行复制。每个服务器维护状态的内存映像，以及持久存储中的转换日志和快照：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/11/ZooKeeper-Architecture.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>ZooKeeper客户端连接到恰好一个服务器，但如果服务器不可用，可以切换到另一个服务器。读请求由每个服务器数据库的本地副本提供服务。写请求由协议达成一致。这涉及<strong>将所有此类请求转发到领导者服务器</strong>，该服务器使用ZooKeeper原子广播（ZAB）协议进行协调。</p><p>基本上，原子消息传递是ZooKeeper的核心，它保持所有服务器的同步。它确保消息的可靠传递。它还确保消息以完全和因果顺序传递。消息系统基本上在服务器之间建立点对点FIFO通道，利用TCP进行通信。</p><h3 id="_2-2-zookeeper使用情况" tabindex="-1"><a class="header-anchor" href="#_2-2-zookeeper使用情况"><span>2.2 ZooKeeper使用情况</span></a></h3><p>ZooKeeper为所有来自客户端的更新提供<strong>顺序一致性和原子性</strong>。此外，它不允许并发写入。此外，无论客户端连接到哪个服务器，它始终看到服务的相同视图。总的来说，ZooKeeper为高性能、高可用性和严格有序访问提供了极好的保证。</p><p>ZooKeeper还实现了非常高的吞吐量和低延迟数值。这些属性使其成为解决大型分布式系统中几个协调问题的好选择。这些用例包括命名服务、配置管理、数据同步、领导者选举、消息队列和通知系统。</p><p>Kafka是一个<strong>分布式事件存储和流处理平台</strong>。它最初由LinkedIn开发，并随后在2011年在Apache Software Foundation下开源。Kafka为处理实时数据流提供了一个高吞吐量和低延迟的平台。它广泛用于流分析和数据集成等高性能用例。</p><h3 id="_3-1-kafka架构" tabindex="-1"><a class="header-anchor" href="#_3-1-kafka架构"><span>3.1 Kafka架构</span></a></h3><p>Kafka是一个由服务器和客户端组成的分布式系统，它们使用基于二进制的TCP协议进行通信。它旨在作为一台或多台服务器的集群运行，也称为代理。代理还充当事件的存储层。</p><p>Kafka以主题的形式持久地组织事件。主题可以有零个、一个或多个生产者和消费者。主题也是<strong>跨不同代理分区和传播</strong>以实现高可扩展性。此外，每个主题也可以在集群中复制：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/11/Kafka-Architecture-3.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在Kafka集群中，<strong>其中一个代理充当控制器</strong>。控制器负责管理分区和副本的状态，并执行重新分配分区等管理任务。在任何时候，集群中只能有一个控制器。</p><p>客户端使应用程序能够并行、大规模、容错地<strong>读取、写入和处理事件流</strong>。生产者是将事件发布到Kafka的客户端应用程序。同时，消费者是那些从Kafka订阅这些事件的。</p><h3 id="_3-2-zookeeper在kafka中的作用" tabindex="-1"><a class="header-anchor" href="#_3-2-zookeeper在kafka中的作用"><span>3.2 ZooKeeper在Kafka中的作用</span></a></h3><p>Kafka的设计属性使其具有高可用性和容错性。但是，作为一个分布式系统，Kafka<strong>需要一种机制来协调所有活跃代理之间的多个决策</strong>。它还需要维护集群及其配置的一致视图。长期以来，Kafka一直在使用ZooKeeper来实现这一点。</p><p>基本上，直到最近改为Kraft之前，<strong>ZooKeeper一直作为Kafka的元数据管理工具</strong>来完成几个关键功能：</p><ul><li><strong>控制器选举</strong>：控制器选举严重依赖于ZooKeeper。为了选举控制器，每个代理都尝试在ZooKeeper中创建一个临时节点。首先创建这个临时节点的代理承担控制器角色，并被分配一个控制器纪元。</li><li><strong>集群成员资格</strong>：ZooKeeper在管理集群中代理的成员资格方面发挥着重要作用。当代理连接到ZooKeeper实例时，在组节点下创建了一个临时znode。如果代理失败，这个临时znode将被删除。</li><li><strong>主题配置</strong>：Kafka在ZooKeeper中为每个主题维护一组配置。这些配置可以是每个主题的或全局的。它还存储诸如现有主题列表、每个主题的分区数量和副本位置等详细信息。</li><li><strong>访问控制列表（ACLs）</strong>：Kafka还在ZooKeeper中维护所有主题的ACLs。这有助于决定谁或什么被允许在每个主题上读取或写入。它还保存诸如消费者组列表和每个消费者组成员的信息。</li><li><strong>配额</strong>：Kafka代理可以控制客户端可以利用的代理资源。这在ZooKeeper中作为配额存储。有两种类型的配额：按字节速率阈值定义的网络带宽配额和按CPU利用率阈值定义的请求速率配额。</li></ul><h3 id="_3-3-zookeeper的问题" tabindex="-1"><a class="header-anchor" href="#_3-3-zookeeper的问题"><span>3.3 ZooKeeper的问题</span></a></h3><p>正如我们迄今为止所看到的，ZooKeeper在Kafka架构中成功地发挥了重要作用。那么，他们为什么要决定改变它呢？用简单明了的话来说，<strong>ZooKeeper为Kafka增加了一个额外的管理层</strong>。即使像ZooKeeper这样简单和健壮，管理分布式系统也是一个复杂的任务。</p><p>Kafka并不是唯一需要在成员之间协调任务的分布式系统。还有其他几个，比如MongoDB、Cassandra和Elasticsearch，它们都以自己的方式解决了这个问题。然而，它们并不依赖于像ZooKeeper这样的外部工具进行元数据管理。基本上，它们<strong>依赖于内部机制来达到这个目的</strong>。</p><p>除了其他好处外，它还使部署和运营管理更加简单。想象一下，如果我们只需要管理一个分布式系统而不是两个！此外，这也<strong>由于更有效的元数据处理而提高了可扩展性</strong>。在Kafka内部而不是ZooKeeper中存储元数据使管理更容易，并提供了更好的保证。</p><h2 id="_4-kafka-raft-kraft-协议" tabindex="-1"><a class="header-anchor" href="#_4-kafka-raft-kraft-协议"><span>4. Kafka Raft（Kraft）协议</span></a></h2><p>由于Kafka与ZooKeeper的复杂性，提交了一个Kafka改进提案（KIP），以<strong>用自管理的元数据仲裁替换ZooKeeper</strong>。虽然基础KIP 500定义了愿景，但随后有几个KIP来详细说明细节。自管理模式首次作为Kafka 2.8的一部分作为早期访问发布。</p><p>自管理模式将元数据管理的责任整合在Kafka内部。这种模式使用Kafka中的新仲裁控制器服务。仲裁控制器使用<strong>基于事件的存储模型</strong>。此外，它使用Kafka Raft（Kraft）作为共识协议，以确保元数据在仲裁中准确复制。</p><p>Kraft基本上是<strong>基于事件的Raft共识协议的变体</strong>。它还类似于ZAB协议，一个显著的区别是它使用事件驱动架构。仲裁控制器使用事件日志来存储状态，该状态定期缩减为快照，以防止其无限增长：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/11/Kafka-KRaft-Protocol.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>仲裁控制器中的一个充当领导者，并在Kafka中的元数据主题中创建事件。仲裁中的<strong>其他控制器跟随领导者控制器</strong>通过响应这些事件。当一个代理由于分区失败时，它可以在重新加入时从日志中赶上错过的事件。这减少了不可用窗口。</p><p>与基于ZooKeeper的控制器不同，<strong>仲裁控制器不需要从ZooKeeper加载状态</strong>。当领导权变更时，新的活动控制器已经在内存中拥有所有提交的元数据记录。此外，相同的事件驱动机制也用于跟踪集群中的所有元数据。</p><h2 id="_5-简化和更好的kafka" tabindex="-1"><a class="header-anchor" href="#_5-简化和更好的kafka"><span>5. 简化和更好的Kafka！</span></a></h2><p>转向基于仲裁的控制器预计将为Kafka社区带来显著的缓解。首先，系统管理员将发现**更容易地监控、管理和支持Kafka。开发者将不得不处理整个系统单一的安全模型。此外，我们有一个轻量级的单进程部署来开始使用Kafka。</p><p>新的元数据管理还显著提高了Kafka的控制平面性能。首先，它允许控制器更快地进行故障转移。基于ZooKeeper的元数据管理一直是集群范围内分区限制的瓶颈。新的仲裁控制器旨在处理每个集群更多的分区。</p><p>自Kafka版本2.8以来，自管理模式（Kraft）与ZooKeeper一起提供。它在版本3.0中作为预览功能发布。最后，在进行了几项改进之后，它在版本3.3.1中被宣布为生产就绪。Kafka可能会在版本3.4中弃用ZooKeeper。然而，可以肯定地说，<strong>使用Kafka的体验已经显著改善</strong>！</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们讨论了ZooKeeper的细节以及它在Kafka中的作用。进一步地，我们经历了这种架构的复杂性以及为什么Kafka选择用基于仲裁的控制器替换ZooKeeper。</p><p>最后，我们涵盖了这一变化为Kafka带来的简化架构和更好可扩展性方面的好处。</p><figure><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>OK</p>',49),n=[p];function f(s,i){return o(),a("div",null,n)}const g=e(r,[["render",f],["__file","2024-07-12-Kafka s Shift from ZooKeeper to Kraft.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-Kafka%20s%20Shift%20from%20ZooKeeper%20to%20Kraft.html","title":"Kafka从ZooKeeper到Kraft的转变","lang":"zh-CN","frontmatter":{"date":"2024-07-12T00:00:00.000Z","category":["Kafka","ZooKeeper"],"tag":["Kafka","ZooKeeper","Kraft","分布式系统"],"head":[["meta",{"name":"keywords","content":"Kafka, ZooKeeper, Kraft, 分布式系统, 架构, 协调"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-Kafka%20s%20Shift%20from%20ZooKeeper%20to%20Kraft.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kafka从ZooKeeper到Kraft的转变"}],["meta",{"property":"og:description","content":"Kafka从ZooKeeper到Kraft的转变 Kafka在其架构中最近从ZooKeeper转变为基于仲裁的控制器，该控制器使用一种名为Kafka Raft的新共识协议，简称为Kraft（发音为“craft”）。 在本教程中，我们将探讨Kafka做出这一决定的原因，以及这一变化如何简化其架构并使其更加强大易用。 2. ZooKeeper简介 ZooK..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/11/ZooKeeper-Data-Model.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T13:00:54.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kafka"}],["meta",{"property":"article:tag","content":"ZooKeeper"}],["meta",{"property":"article:tag","content":"Kraft"}],["meta",{"property":"article:tag","content":"分布式系统"}],["meta",{"property":"article:published_time","content":"2024-07-12T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T13:00:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kafka从ZooKeeper到Kraft的转变\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/11/ZooKeeper-Data-Model.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2022/11/ZooKeeper-Architecture.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2022/11/Kafka-Architecture-3.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2022/11/Kafka-KRaft-Protocol.jpg\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\"],\\"datePublished\\":\\"2024-07-12T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T13:00:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kafka从ZooKeeper到Kraft的转变 Kafka在其架构中最近从ZooKeeper转变为基于仲裁的控制器，该控制器使用一种名为Kafka Raft的新共识协议，简称为Kraft（发音为“craft”）。 在本教程中，我们将探讨Kafka做出这一决定的原因，以及这一变化如何简化其架构并使其更加强大易用。 2. ZooKeeper简介 ZooK..."},"headers":[{"level":3,"title":"2. ZooKeeper简介","slug":"_2-zookeeper简介","link":"#_2-zookeeper简介","children":[]},{"level":3,"title":"2.2 ZooKeeper使用情况","slug":"_2-2-zookeeper使用情况","link":"#_2-2-zookeeper使用情况","children":[]},{"level":3,"title":"3.1 Kafka架构","slug":"_3-1-kafka架构","link":"#_3-1-kafka架构","children":[]},{"level":3,"title":"3.2 ZooKeeper在Kafka中的作用","slug":"_3-2-zookeeper在kafka中的作用","link":"#_3-2-zookeeper在kafka中的作用","children":[]},{"level":3,"title":"3.3 ZooKeeper的问题","slug":"_3-3-zookeeper的问题","link":"#_3-3-zookeeper的问题","children":[]},{"level":2,"title":"4. Kafka Raft（Kraft）协议","slug":"_4-kafka-raft-kraft-协议","link":"#_4-kafka-raft-kraft-协议","children":[]},{"level":2,"title":"5. 简化和更好的Kafka！","slug":"_5-简化和更好的kafka","link":"#_5-简化和更好的kafka","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720789254000,"updatedTime":1720789254000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":9.17,"words":2751},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-Kafka s Shift from ZooKeeper to Kraft.md","localizedDate":"2024年7月12日","excerpt":"\\n<p>Kafka在其架构中最近从ZooKeeper转变为基于仲裁的控制器，该控制器使用一种名为Kafka Raft的新共识协议，简称为Kraft（发音为“craft”）。</p>\\n<p>在本教程中，我们将探讨Kafka做出这一决定的原因，以及这一变化如何简化其架构并使其更加强大易用。</p>\\n<h3>2. ZooKeeper简介</h3>\\n<p>ZooKeeper是一个<strong>提供高度可靠的分布式协调服务</strong>。它最初由Yahoo!开发，用于简化在大数据集群上运行的流程。它起初是Hadoop的一个子项目，后来在2008年成为一个独立的Apache Foundation项目。它被广泛用于大型分布式系统中的多种用例。</p>","autoDesc":true}');export{g as comp,k as data};
