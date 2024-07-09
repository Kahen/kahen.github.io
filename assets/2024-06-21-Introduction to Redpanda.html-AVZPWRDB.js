import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as d}from"./app-DRFG6C5y.js";const n={},i=d(`<h1 id="redpanda-简介" tabindex="-1"><a class="header-anchor" href="#redpanda-简介"><span>Redpanda 简介</span></a></h1><p>在本教程中，我们将讨论一个名为 Redpanda 的强大事件流平台。它是行业流平台 Kafka 的竞争对手，并且有趣的是，它还与 Kafka API 兼容。</p><p>我们将查看 Redpanda 的关键组件、特性和用例，创建 Java 程序以发布消息到 Redpanda 主题，然后从中读取消息。Redpanda 与 Kafka 的比较</p><p>由于 Redpanda 的制作者声称它是 Kafka 的竞争对手，让我们在一些重要因素上对它们进行比较：</p><table><thead><tr><th>特性</th><th>Redpanda</th><th>Kafka</th></tr></thead><tbody><tr><td>开发者体验</td><td>- 包括一个易于安装的单一二进制包<code>&lt;br&gt;</code>- 不依赖 JVM 和第三方工具</td><td>- 依赖 Zookeeper 或 KRaft<code>&lt;br&gt;</code>- 安装时开发者需要更多专业知识</td></tr><tr><td>性能</td><td>- 由于其每个核心一个线程的编程模型，比 Kafka 快 10 倍<code>&lt;br&gt;</code>- 用 C++ 编写<code>&lt;br&gt;</code>- 每个核心可以处理每秒 1GB 的写入<code>&lt;br&gt;</code>- 支持自动内核调整<code>&lt;br&gt;</code>- p99999 延迟是 16ms</td><td>- Kafka 是很久以前开发的，因此没有针对运行多个核心的新时代 CPU 进行优化。<code>&lt;br&gt;</code>- 用 Java 编写<code>&lt;br&gt;</code>- p99999 延迟是 1.8 秒</td></tr><tr><td>成本</td><td>- 比 Kafka 低 6 倍</td><td>- 需要更多的基础设施来支持类似的性能</td></tr><tr><td>连接器</td><td>- Redpanda Cloud 提供一些开箱即用的托管连接器</td><td>- 非常成熟，支持许多开箱即用的连接器</td></tr><tr><td>社区支持</td><td>- 在可接受性方面，与 Kafka 相比还有很长的路要走<code>&lt;br&gt;</code>- 有一个 Slack 频道</td><td>- 它在各个行业中有大量的采用，因此有一个非常成熟的社区</td></tr></tbody></table><p>Redpanda 架构</p><p>Redpanda 的架构不仅简单，而且非常容易理解。有趣的是，它有一个单一的二进制安装包，非常容易安装。这为开发者提供了快速的开始，这也是它受欢迎的原因。此外，它提供了一个具有极高性能的流平台，具有出色的吞吐量。</p><h3 id="_3-1-关键组件和特性" tabindex="-1"><a class="header-anchor" href="#_3-1-关键组件和特性"><span>3.1. 关键组件和特性</span></a></h3><p>让我们深入了解使 Redpanda 非常健壮和高性能的关键组件和特性：</p><p><strong>控制平面支持 Kafka API，用于管理代理、创建消息主题、发布和消费消息等</strong>。因此，依赖 Kafka 的旧系统可以以较少的努力迁移到 Redpanda。然而，还有一组不同的管理 API 用于管理和配置 Redpanda 集群。</p><p><strong>Redpanda 支持分层存储</strong>。这意味着我们可以配置它将其数据日志从本地缓存卸载或归档到云中更便宜的对象存储。此外，在消费者的请求下，数据会实时从远程对象存储移动回本地缓存。</p><p><strong>Redpanda 有一个 Raft 共识算法实现层，可以在其节点之间复制主题分区数据</strong>。这个特性可以在故障事件中防止数据丢失。自然地，它保证了高数据安全性和容错性。</p><p>Redpanda 拥有强大的认证和授权支持。它可以使用 SASL、OAuth、OpenID Connect (OIDC)、基本认证、Kerberos 等方法对外部用户和应用程序进行身份验证。此外，它通过基于角色的访问控制 (RBAC) 机制，使其能够对资源进行细粒度的访问控制。</p><p>模式在定义 Redpanda 代理、消费者和生产者之间交换的数据中至关重要。因此，集群有一个 Schema Registry。<strong>Schema Registry API 帮助注册和修改模式</strong>。</p><p>HTTP 代理 (pandaproxy) API 提供了一种方便的方式来与 Redpanda 交互，用于基本数据操作，如列出主题和代理、获取事件、生成事件等。</p><p>最后，<strong>Redpanda 为其监控提供了指标端点</strong>。这些可以在 Prometheus（监控工具）上配置，以拉取重要指标并在 Grafana 仪表板上显示。</p><h3 id="_3-2-单一二进制安装包" tabindex="-1"><a class="header-anchor" href="#_3-2-单一二进制安装包"><span>3.2. 单一二进制安装包</span></a></h3><p><strong>Redpanda 的安装包包含一个单一的二进制文件，因此其安装比 Kafka 简单得多</strong>。与 Kafka 不同，它不依赖 JVM 或像 Zookeeper 这样的集群管理器。由于这些因素，操作 Redpanda 非常轻松。</p><p>它用 C++ 开发，并具有引人注目的每个核心一个线程的编程模型，这有助于优化 CPU 核心、内存和网络的使用。因此，其部署的硬件成本显著降低。这种模型还导致低延迟和高吞吐量。</p><p>Redpanda 集群由多个节点组成。每个节点可以是数据平面或控制平面。所有这些节点需要的是在它们上安装适当的配置的单一二进制包。如果节点具有高端计算能力，它们可以在没有性能瓶颈的情况下扮演两个角色。</p><h3 id="_3-3-管理工具" tabindex="-1"><a class="header-anchor" href="#_3-3-管理工具"><span>3.3. 管理工具</span></a></h3><p><strong>Redpanda 提供两个管理工具，一个 Web 控制台和一个名为 Redpanda Keeper (RPK) 的 CLI</strong>。控制台是一个用户友好的 Web 应用程序，集群管理员可以使用。</p><p>RPK 主要用于低层次的集群管理和调整。然而，控制台提供了对数据流的可见性以及故障排除和管理集群的能力。</p><p>部署</p><p>Redpanda 支持自托管和 Redpanda Cloud 部署。</p><p><strong>在自托管部署中，客户可以在他们的私有数据中心或公共云的 VPC 中部署 Redpanda 集群</strong>。它可以部署在物理或虚拟机上，以及 Kubernetes 上。作为一般规则，每个代理应该有其专用的节点。目前，支持 RHEL/CentOS 和 Ubuntu 操作系统。</p><p>此外，AWS Simple Storage Service (S3)、Azure Blob Storage (ABS) 和 Google Cloud Storage (GCS) 可用于支持分层存储。</p><p>有趣的是，客户也可以选择 Redpanda Cloud 进行托管服务。他们可以在 Redpanda Cloud 上完全拥有整个集群，或者选择在他们的私有数据中心或公共云账户中运行数据平面。控制平面仍然在 Redpanda Cloud 上，那里负责监控、配置和升级。</p><p>关键用例</p><p>与 Kafka 不同，由于其简单的架构和易于安装，Redpanda 是一个非常适合开发者的非常强大的流平台。让我们快速看一下类似的用例：</p><p>一般来说，流平台的参与者包括：</p><ul><li>源系统生成提要</li><li>提要可以是监控事件、指标、通知等</li><li>集群中的代理管理主题</li><li>生产者从源系统读取提要并将其发布到 Redpanda 集群的主题</li><li>消费者不断轮询他们订阅的主题</li><li>目标系统接收来自消费者的转换消息</li></ul><p>Redpanda 保证以平均延迟低 10 倍的速度将各种来源的实时提要交付给目标系统。</p><p><strong>它支持消费者和生产者模型，用于处理来自各种来源的实时提要或事件</strong>。生产者是读取源系统的数据并将其发布到 Redpanda 集群中主题的应用程序。集群中的代理高度可靠和容错，保证消息传递。</p><p>消费者应用程序订阅集群中的主题。<strong>最终，他们从主题中读取数据，经过进一步转换后，将数据发送到各种目标系统，如分析平台、NoSQL 数据库、关系数据库或其他流平台。</strong></p><p>在微服务架构中，Redpanda 通过促进它们之间的异步通信来帮助解耦微服务。</p><p>因此，它可以在各个行业中发挥重要作用，用于开发：</p><ul><li>用于事件和日志处理、报告、故障排除和自动修复的可观测性平台</li><li>实时合规性和欺诈检测系统</li><li>实时分析仪表板和应用程序</li></ul><p>使用 Kafka API 实现 Redpanda 客户端</p><p>值得注意的是，Redpanda 支持 Kafka API。因此，我们将使用 Kafka 客户端编写可以与 Redpanda 流交互的程序。</p><p>对于我们的示例，我们使用 Java Testcontainers 在 Windows 桌面上部署了一个单节点的 Redpanda。</p><p>此外，<strong>我们将探索涵盖主题创建、消息发布和消息消费的基本程序</strong>。这只是为了演示目的，因此我们不会深入探讨 Kafka API 概念。</p><h3 id="_6-1-先决条件" tabindex="-1"><a class="header-anchor" href="#_6-1-先决条件"><span>6.1. 先决条件</span></a></h3><p>在我们开始之前，让我们导入 Kafka 客户端库的必要 Maven 依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`org.apache.kafka\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`kafka-clients\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`3.6.1\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-创建主题" tabindex="-1"><a class="header-anchor" href="#_6-2-创建主题"><span>6.2. 创建主题</span></a></h3><p>要在 Redpanda 上创建主题，我们首先将实例化 Kafka 客户端库中的 <em>AdminClient</em> 类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>AdminClient createAdminClient() {
    Properties adminProps = new Properties();
    adminProps.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, getBrokerUrl());
    return KafkaAdminClient.create(adminProps);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要设置 <em>AdminClient</em>，我们得到了代理 URL 并将其传递给了它的静态 <em>create()</em> 方法。</p><p>现在，让我们看看如何创建一个主题：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>void createTopic(String topicName) {
    try (AdminClient adminClient = createAdminClient()) {
        NewTopic topic = new NewTopic(topicName, 1, (short) 1);
        adminClient.createTopics(Collections.singleton(topic));
    } catch (Exception e) {
        LOGGER.error(&quot;Error occurred during topic creation:&quot;, e);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>AdminClient</em> 类的 <em>createTopics()</em> 方法以 <em>NewTopic</em> 对象作为参数来创建一个主题。</p><p>最后，让我们看看 <em>createTopic()</em> 方法的实际应用：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void whenCreateTopic_thenSuccess() throws ExecutionException, InterruptedException {
    String topic = &quot;test-topic&quot;;
    createTopic(topic);
    try(AdminClient adminClient = createAdminClient()) {
        assertTrue(adminClient.listTopics()
          .names()
          .get()
          .contains(topic));
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>程序在 Redpanda</p>`,55),r=[i];function p(l,o){return t(),a("div",null,r)}const m=e(n,[["render",p],["__file","2024-06-21-Introduction to Redpanda.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-21-Introduction%20to%20Redpanda.html","title":"Redpanda 简介","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Redpanda","Kafka"],"tag":["事件流平台","性能"],"head":[["meta",{"name":"keywords","content":"Redpanda, Kafka, 事件流, 性能, 架构, 部署, 使用案例"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-21-Introduction%20to%20Redpanda.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Redpanda 简介"}],["meta",{"property":"og:description","content":"Redpanda 简介 在本教程中，我们将讨论一个名为 Redpanda 的强大事件流平台。它是行业流平台 Kafka 的竞争对手，并且有趣的是，它还与 Kafka API 兼容。 我们将查看 Redpanda 的关键组件、特性和用例，创建 Java 程序以发布消息到 Redpanda 主题，然后从中读取消息。Redpanda 与 Kafka 的比较 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"事件流平台"}],["meta",{"property":"article:tag","content":"性能"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Redpanda 简介\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Redpanda 简介 在本教程中，我们将讨论一个名为 Redpanda 的强大事件流平台。它是行业流平台 Kafka 的竞争对手，并且有趣的是，它还与 Kafka API 兼容。 我们将查看 Redpanda 的关键组件、特性和用例，创建 Java 程序以发布消息到 Redpanda 主题，然后从中读取消息。Redpanda 与 Kafka 的比较 ..."},"headers":[{"level":3,"title":"3.1. 关键组件和特性","slug":"_3-1-关键组件和特性","link":"#_3-1-关键组件和特性","children":[]},{"level":3,"title":"3.2. 单一二进制安装包","slug":"_3-2-单一二进制安装包","link":"#_3-2-单一二进制安装包","children":[]},{"level":3,"title":"3.3. 管理工具","slug":"_3-3-管理工具","link":"#_3-3-管理工具","children":[]},{"level":3,"title":"6.1. 先决条件","slug":"_6-1-先决条件","link":"#_6-1-先决条件","children":[]},{"level":3,"title":"6.2. 创建主题","slug":"_6-2-创建主题","link":"#_6-2-创建主题","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":7.61,"words":2283},"filePathRelative":"posts/baeldung/Archive/2024-06-21-Introduction to Redpanda.md","localizedDate":"2024年6月21日","excerpt":"\\n<p>在本教程中，我们将讨论一个名为 Redpanda 的强大事件流平台。它是行业流平台 Kafka 的竞争对手，并且有趣的是，它还与 Kafka API 兼容。</p>\\n<p>我们将查看 Redpanda 的关键组件、特性和用例，创建 Java 程序以发布消息到 Redpanda 主题，然后从中读取消息。Redpanda 与 Kafka 的比较</p>\\n<p>由于 Redpanda 的制作者声称它是 Kafka 的竞争对手，让我们在一些重要因素上对它们进行比较：</p>\\n<table>\\n<thead>\\n<tr>\\n<th>特性</th>\\n<th>Redpanda</th>\\n<th>Kafka</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>开发者体验</td>\\n<td>- 包括一个易于安装的单一二进制包<code>&lt;br&gt;</code>- 不依赖 JVM 和第三方工具</td>\\n<td>- 依赖 Zookeeper 或 KRaft<code>&lt;br&gt;</code>- 安装时开发者需要更多专业知识</td>\\n</tr>\\n<tr>\\n<td>性能</td>\\n<td>- 由于其每个核心一个线程的编程模型，比 Kafka 快 10 倍<code>&lt;br&gt;</code>- 用 C++ 编写<code>&lt;br&gt;</code>- 每个核心可以处理每秒 1GB 的写入<code>&lt;br&gt;</code>- 支持自动内核调整<code>&lt;br&gt;</code>- p99999 延迟是 16ms</td>\\n<td>- Kafka 是很久以前开发的，因此没有针对运行多个核心的新时代 CPU 进行优化。<code>&lt;br&gt;</code>- 用 Java 编写<code>&lt;br&gt;</code>- p99999 延迟是 1.8 秒</td>\\n</tr>\\n<tr>\\n<td>成本</td>\\n<td>- 比 Kafka 低 6 倍</td>\\n<td>- 需要更多的基础设施来支持类似的性能</td>\\n</tr>\\n<tr>\\n<td>连接器</td>\\n<td>- Redpanda Cloud 提供一些开箱即用的托管连接器</td>\\n<td>- 非常成熟，支持许多开箱即用的连接器</td>\\n</tr>\\n<tr>\\n<td>社区支持</td>\\n<td>- 在可接受性方面，与 Kafka 相比还有很长的路要走<code>&lt;br&gt;</code>- 有一个 Slack 频道</td>\\n<td>- 它在各个行业中有大量的采用，因此有一个非常成熟的社区</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}');export{m as comp,u as data};
