import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as i}from"./app-CtR6X2Br.js";const l={},r=i('<hr><h1 id="apache-activemq-与-kafka-baeldung-1-概述" tabindex="-1"><a class="header-anchor" href="#apache-activemq-与-kafka-baeldung-1-概述"><span>Apache ActiveMQ 与 Kafka | Baeldung## 1. 概述</span></a></h1><p>在分布式架构中，应用程序通常需要在彼此之间交换数据。一方面，这可以通过直接通信来实现。另一方面，为了实现高可用性和分区容错性，并使应用程序之间的耦合度降低，消息传递是一个合适的解决方案。</p><p>因此，我们可以选择多种产品。Apache 基金会提供了 ActiveMQ 和 Kafka，我们将在本文中对它们进行比较。</p><h2 id="_2-一般事实" tabindex="-1"><a class="header-anchor" href="#_2-一般事实"><span>2. 一般事实</span></a></h2><h3 id="_2-1-activemq" tabindex="-1"><a class="header-anchor" href="#_2-1-activemq"><span>2.1. ActiveMQ</span></a></h3><p><strong>ActiveMQ 是一种传统的消息代理，其目标是确保应用程序之间以安全和可靠的方式交换数据。</strong> 它处理的数据量较小，因此专门用于定义良好的消息格式和事务性消息传递。</p><p>我们必须注意到，除了这种“经典”版本外，还有另一个版本：ActiveMQ Artemis。这种下一代代理基于 HornetQ，其代码在 2015 年由 RedHat 提供给 Apache 基金会。在 ActiveMQ 网站上，它说：</p><blockquote><p>一旦 Artemis 达到与“经典”代码库足够的功能一致性，它将成为 ActiveMQ 的下一个主要版本。</p></blockquote><p>因此，在比较中，我们需要考虑这两个版本。我们将通过使用术语 <em>“ActiveMQ”</em> 和 <em>“Artemis”</em> 来区分它们。</p><h3 id="_2-2-kafka" tabindex="-1"><a class="header-anchor" href="#_2-2-kafka"><span>2.2. Kafka</span></a></h3><p>与 ActiveMQ 相反，<strong>Kafka 是一个旨在处理大量数据的分布式系统。</strong> 我们可以使用它进行传统消息传递以及：</p><ul><li>网站活动跟踪</li><li>指标</li><li>日志聚合</li><li>流处理</li><li>事件溯源</li><li>提交日志</li></ul><p>随着使用微服务构建的典型云架构的出现，这些需求变得越来越重要。</p><h3 id="_2-3-jms-及其在消息传递中的演变" tabindex="-1"><a class="header-anchor" href="#_2-3-jms-及其在消息传递中的演变"><span>2.3. JMS 及其在消息传递中的演变</span></a></h3><p>Java 消息服务（JMS）是 Java EE 应用程序内发送和接收消息的通用 API。它是消息系统早期演变的一部分，至今仍是标准。在 Jakarta EE 中，它被采用为 <em>Jakarta Messaging</em>。因此，了解核心概念可能很有帮助：</p><ul><li>一个 Java 原生的，但与供应商无关的 API</li><li>需要一个 <em>JCA 资源适配器</em> 来实现供应商特定的通信协议</li><li>消息目的地模型： <ul><li><em>队列</em>（<em>P2P</em>）以确保消息顺序和即使在多个消费者的情况下也能一次处理消息</li><li><em>主题</em>（<em>PubSub</em>）作为发布-订阅模式的实现，这意味着多个消费者将在他们订阅主题的期间接收消息</li></ul></li><li>消息格式： <ul><li>_头_作为代理处理的标准元信息（如优先级或过期日期）</li><li>_属性_作为消费者可以用于消息处理的非标准化元信息</li><li>包含有效载荷的 <em>主体</em> – JMS 声明了五种类型的消息，但这仅与使用 API 有关，与此比较无关</li></ul></li></ul><p><strong>然而，演变的方向是开放和独立的——独立于消费者和生产者的平台，以及独立于消息代理的供应商。</strong> 有协议定义了它们自己的消息目的地模型：</p><ul><li>AMQP – 用于与供应商无关的消息传递的二进制协议——使用 <em>通用节点</em></li><li>MQTT – 用于嵌入式系统和物联网的轻量级二进制协议——使用 <em>主题</em></li><li>STOMP – 一种简单的基于文本的协议，允许即使从浏览器进行消息传递——使用 <em>通用目的地</em></li></ul><p><strong>另一个发展是将之前可靠的单个消息传输（“传统消息传递”）添加到通过云架构的传播按照“火与忘记”原则处理大量数据。</strong> 我们可以说，ActiveMQ 和 Kafka 之间的比较是这两种方法的典型代表的比较。例如，Kafka 的替代品可能是 NATS。</p><h2 id="_3-比较" tabindex="-1"><a class="header-anchor" href="#_3-比较"><span>3. 比较</span></a></h2><p>在这一部分，我们将比较 ActiveMQ 和 Kafka 在架构和开发中最有趣的特性。</p><h3 id="_3-1-消息目的地模型、协议和-api" tabindex="-1"><a class="header-anchor" href="#_3-1-消息目的地模型、协议和-api"><span>3.1. 消息目的地模型、协议和 API</span></a></h3><p>ActiveMQ 完全实现了 JMS 消息目的地模型的 <em>队列</em> 和 <em>主题</em>，并将 AMQP、MQTT 和 STOMP 消息映射到它们。例如，一个 STOMP 消息被映射到一个 JMS <em>BytesMessage</em> 在一个 <em>主题</em> 中。此外，它还支持 OpenWire，这允许跨语言访问 ActiveMQ。</p><p>Artemis 定义了自己独立于标准 API 和协议的消息目的地模型，并需要将它们映射到这个模型：</p><ul><li><em>消息</em> 发送到一个 <em>地址</em>，该地址被赋予一个唯一的名称、一个 <em>路由类型</em> 和零个或多个 <em>队列</em>。</li><li>一个 <em>路由类型</em> 决定了消息如何从地址路由到绑定到该地址的队列。定义了两种类型： <ul><li><em>ANYCAST</em>：消息被路由到地址上的单个队列</li><li><em>MULTICAST</em>：消息被路由到地址上的所有队列</li></ul></li></ul><p>Kafka 只定义了 <em>主题</em>，它们由多个 <em>分区</em>（至少 1 个）和可以放置在不同代理上的 <em>副本</em> 组成。找到主题分区的最佳策略是一个挑战。我们必须注意：</p><ul><li>一条消息被分发到一个分区。</li><li>仅在一个分区内确保消息顺序。</li><li>默认情况下，后续消息会通过轮询方式分发到主题的分区中。</li><li>如果我们使用消息键，则具有相同键的消息将进入同一个分区。</li></ul><p>Kafka 有自己的 API。尽管也有 JMS 的资源适配器，但我们应该意识到这些概念并不完全兼容。AMQP、MQTT 和 STOMP 并不被官方支持，但有 AMQP 和 MQTT 的连接器。</p><h3 id="_3-2-消息格式和处理" tabindex="-1"><a class="header-anchor" href="#_3-2-消息格式和处理"><span>3.2. 消息格式和处理</span></a></h3><p>ActiveMQ 支持 JMS 标准消息格式，包括头、属性和主体（如上所述）。代理必须维护每条消息的传递状态，导致吞吐量较低。由于它受到 JMS 的支持，消费者可以从目的地同步拉取消息，或者消息可以被代理异步推送。</p><p>Kafka 没有定义任何消息格式——这完全取决于生产者。每条消息没有传递状态，只有每个消费者和分区的 <em>偏移量</em>。一个 <em>偏移量</em> 是最后一条传递消息的索引。这不仅更快，还允许通过重置偏移量重新发送消息，而不必询问生产者。</p><h3 id="_3-3-spring-和-cdi-集成" tabindex="-1"><a class="header-anchor" href="#_3-3-spring-和-cdi-集成"><span>3.3. Spring 和 CDI 集成</span></a></h3><p>JMS 是 Java/Jakarta EE 标准，因此完全集成到 Java/Jakarta EE 应用程序中。因此，ActiveMQ 和 Artemis 的连接可以很容易地由应用服务器管理。对于 Artemis，我们甚至可以使用嵌入式代理。对于 Kafka，只有在使用 JMS 的资源适配器或 Eclipse MicroProfile Reactive 时，才提供管理连接。</p><p>Spring 还为 JMS 以及 AMQP、MQTT 和 STOMP 提供集成。Kafka 也受到支持。使用 Spring Boot，我们可以使用 ActiveMQ、Artemis 和 Kafka 的嵌入式代理。</p><h2 id="_4-activemq-artemis-和-kafka-的用例" tabindex="-1"><a class="header-anchor" href="#_4-activemq-artemis-和-kafka-的用例"><span>4. ActiveMQ/Artemis 和 Kafka 的用例</span></a></h2><p>以下要点为我们提供了何时使用哪种产品的最佳方向。</p><h3 id="_4-1-activemq-artemis-的用例" tabindex="-1"><a class="header-anchor" href="#_4-1-activemq-artemis-的用例"><span>4.1. ActiveMQ/Artemis 的用例</span></a></h3><ul><li>每天只处理少量消息</li><li>高可靠性和事务性</li><li>即时数据转换，ETL 作业</li></ul><h3 id="_4-2-kafka-的用例" tabindex="-1"><a class="header-anchor" href="#_4-2-kafka-的用例"><span>4.2. Kafka 的用例</span></a></h3><ul><li>处理高负载数据 <ul><li>实时数据处理</li><li>应用程序活动跟踪</li><li>日志记录和监控</li></ul></li><li>不进行数据转换的消息传递（这是可能的，但不容易）</li><li>不进行传输保证的消息传递（这是可能的，但不容易）</li></ul><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>正如我们所见，ActiveMQ/Artemis 和 Kafka 都有它们的目的，因此也有它们的理由。了解它们之间的差异以便为正确的情况选择合适的产品是很重要的。以下表格再次简要解释了这些差异：</p><table><thead><tr><th>标准</th><th>ActiveMQ 经典版</th><th>ActiveMQ Artemis</th><th>Kafka</th></tr></thead><tbody><tr><td>用例</td><td>传统消息传递（可靠，事务性）</td><td>分布式事件流</td><td></td></tr><tr><td>P2P 消息传递</td><td>队列</td><td>地址带有路由类型 ANYCAST</td><td>–</td></tr><tr><td>PubSub 消息传递</td><td>主题</td><td>地址带有路由类型 MULTICAST</td><td>主题</td></tr><tr><td>API / 协议</td><td>JMS, AMQP. MQTT, STOMP, OpenWire</td><td>Kafka 客户端，AMQP 和 MQTT 的连接器，JMS 资源适配器</td><td></td></tr><tr><td>拉取 vs. 推送消息</td><td>推送式</td><td>拉取式</td><td></td></tr><tr><td>消息传递的责任</td><td>生产者必须确保消息被传递</td><td>消费者消费它应该消费的消息</td><td></td></tr><tr><td>事务支持</td><td>JMS, XA</td><td>自定义事务管理器</td><td></td></tr><tr><td>可扩展性</td><td>代理网络</td><td>集群</td><td>高度可扩展（分区和副本）</td></tr><tr><td>更多的消费者…</td><td>…性能变慢</td><td>…不会变慢</td><td></td></tr></tbody></table>',44),c=[r];function n(d,p){return a(),t("div",null,c)}const m=e(l,[["render",n],["__file","2024-07-18-Apache ActiveMQ vs. Kafka.html.vue"]]),o=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Apache%20ActiveMQ%20vs.%20Kafka.html","title":"Apache ActiveMQ 与 Kafka | Baeldung## 1. 概述","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Messaging Systems","Apache Kafka"],"tag":["Apache ActiveMQ","Apache Kafka","Messaging","Java"],"head":[["meta",{"name":"keywords","content":"Apache ActiveMQ, Apache Kafka, Messaging Systems, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Apache%20ActiveMQ%20vs.%20Kafka.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Apache ActiveMQ 与 Kafka | Baeldung## 1. 概述"}],["meta",{"property":"og:description","content":"Apache ActiveMQ 与 Kafka | Baeldung## 1. 概述 在分布式架构中，应用程序通常需要在彼此之间交换数据。一方面，这可以通过直接通信来实现。另一方面，为了实现高可用性和分区容错性，并使应用程序之间的耦合度降低，消息传递是一个合适的解决方案。 因此，我们可以选择多种产品。Apache 基金会提供了 ActiveMQ 和 K..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T18:32:58.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Apache ActiveMQ"}],["meta",{"property":"article:tag","content":"Apache Kafka"}],["meta",{"property":"article:tag","content":"Messaging"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T18:32:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Apache ActiveMQ 与 Kafka | Baeldung## 1. 概述\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T18:32:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Apache ActiveMQ 与 Kafka | Baeldung## 1. 概述 在分布式架构中，应用程序通常需要在彼此之间交换数据。一方面，这可以通过直接通信来实现。另一方面，为了实现高可用性和分区容错性，并使应用程序之间的耦合度降低，消息传递是一个合适的解决方案。 因此，我们可以选择多种产品。Apache 基金会提供了 ActiveMQ 和 K..."},"headers":[{"level":2,"title":"2. 一般事实","slug":"_2-一般事实","link":"#_2-一般事实","children":[{"level":3,"title":"2.1. ActiveMQ","slug":"_2-1-activemq","link":"#_2-1-activemq","children":[]},{"level":3,"title":"2.2. Kafka","slug":"_2-2-kafka","link":"#_2-2-kafka","children":[]},{"level":3,"title":"2.3. JMS 及其在消息传递中的演变","slug":"_2-3-jms-及其在消息传递中的演变","link":"#_2-3-jms-及其在消息传递中的演变","children":[]}]},{"level":2,"title":"3. 比较","slug":"_3-比较","link":"#_3-比较","children":[{"level":3,"title":"3.1. 消息目的地模型、协议和 API","slug":"_3-1-消息目的地模型、协议和-api","link":"#_3-1-消息目的地模型、协议和-api","children":[]},{"level":3,"title":"3.2. 消息格式和处理","slug":"_3-2-消息格式和处理","link":"#_3-2-消息格式和处理","children":[]},{"level":3,"title":"3.3. Spring 和 CDI 集成","slug":"_3-3-spring-和-cdi-集成","link":"#_3-3-spring-和-cdi-集成","children":[]}]},{"level":2,"title":"4. ActiveMQ/Artemis 和 Kafka 的用例","slug":"_4-activemq-artemis-和-kafka-的用例","link":"#_4-activemq-artemis-和-kafka-的用例","children":[{"level":3,"title":"4.1. ActiveMQ/Artemis 的用例","slug":"_4-1-activemq-artemis-的用例","link":"#_4-1-activemq-artemis-的用例","children":[]},{"level":3,"title":"4.2. Kafka 的用例","slug":"_4-2-kafka-的用例","link":"#_4-2-kafka-的用例","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721327578000,"updatedTime":1721327578000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.13,"words":2140},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Apache ActiveMQ vs. Kafka.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Apache ActiveMQ 与 Kafka | Baeldung## 1. 概述</h1>\\n<p>在分布式架构中，应用程序通常需要在彼此之间交换数据。一方面，这可以通过直接通信来实现。另一方面，为了实现高可用性和分区容错性，并使应用程序之间的耦合度降低，消息传递是一个合适的解决方案。</p>\\n<p>因此，我们可以选择多种产品。Apache 基金会提供了 ActiveMQ 和 Kafka，我们将在本文中对它们进行比较。</p>\\n<h2>2. 一般事实</h2>\\n<h3>2.1. ActiveMQ</h3>\\n<p><strong>ActiveMQ 是一种传统的消息代理，其目标是确保应用程序之间以安全和可靠的方式交换数据。</strong> 它处理的数据量较小，因此专门用于定义良好的消息格式和事务性消息传递。</p>","autoDesc":true}');export{m as comp,o as data};
