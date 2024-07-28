import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as e,a as s}from"./app-DzJ3ruqA.js";const t={},i=s('<h1 id="kafka-streams-与-spring-boot-baeldung" tabindex="-1"><a class="header-anchor" href="#kafka-streams-与-spring-boot-baeldung"><span>Kafka Streams 与 Spring Boot | Baeldung</span></a></h1><p>在本文中，我们将了解如何使用 Spring Boot 设置 Kafka Streams。Kafka Streams 是建立在 Apache Kafka 之上的客户端库。它以声明式的方式使我们可以处理无限的事件流。</p><p>一些流数据的真实生活例子可能是传感器数据、股票市场事件流和系统日志。对于本教程，我们将构建一个简单的单词计数流应用程序。让我们首先了解 Kafka Streams 的概览，然后设置示例及其在 Spring Boot 中的测试。</p><h2 id="_2-概览" tabindex="-1"><a class="header-anchor" href="#_2-概览"><span>2. 概览</span></a></h2><p>Kafka Streams 提供了 Kafka 主题和关系数据库表之间的二元性。它使我们能够对一个或多个流事件执行诸如联接、分组、聚合和过滤等操作。</p><p>Kafka Streams 的一个重要概念是处理器拓扑。<strong>处理器拓扑是 Kafka 流操作在一个或多个事件流上的蓝图</strong>。本质上，处理器拓扑可以被看作是有向无环图。在这图中，节点被分类为源、处理器和接收器节点，而边缘代表流事件的流动。</p><p>拓扑顶部的源从 Kafka 接收流数据，将其传递到处理器节点进行自定义操作，并通过接收器节点流向一个新的 Kafka 主题。除了核心处理外，流的状态还使用检查点定期保存，以实现容错和弹性。</p><h2 id="_3-依赖项" tabindex="-1"><a class="header-anchor" href="#_3-依赖项"><span>3. 依赖项</span></a></h2><p>我们将通过向我们的 POM 添加 <em>spring-kafka</em> 和 <em>kafka-streams</em> 依赖项来开始：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependency&gt;``\n    ``&lt;groupId&gt;``org.springframework.kafka``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``spring-kafka``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``3.1.2``&lt;/version&gt;``\n``&lt;/dependency&gt;``\n``&lt;dependency&gt;``\n    ``&lt;groupId&gt;``org.apache.kafka``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``kafka-streams``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``3.6.1``&lt;/version&gt;``\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-示例" tabindex="-1"><a class="header-anchor" href="#_4-示例"><span>4. 示例</span></a></h2><p>我们的示例应用程序从输入 Kafka 主题读取流事件。一旦记录被读取，它就处理它们来分割文本并计算个别单词。随后，它将更新的单词计数发送到 Kafka 输出。除了输出主题外，我们还将创建一个简单的 REST 服务，通过 HTTP 端点公开此计数。</p><p>总体而言，输出主题将不断更新，包含从输入事件中提取的单词及其更新的计数。</p><h3 id="_4-1-配置" tabindex="-1"><a class="header-anchor" href="#_4-1-配置"><span>4.1. 配置</span></a></h3><p>首先，让我们在 Java 配置类中定义 Kafka 流配置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>\n<span class="token annotation punctuation">@EnableKafka</span>\n<span class="token annotation punctuation">@EnableKafkaStreams</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">KafkaConfig</span> <span class="token punctuation">{</span>\n    <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用了 <em>@EnableKafkaStreams</em> 注解来自动配置所需的组件。这个自动配置需要一个名为 <em>DEFAULT_STREAMS_CONFIG_BEAN_NAME</em> 的 <em>KafkaStreamsConfiguration</em> bean。因此，<strong>Spring Boot 使用此配置并创建一个 <em>KafkaStreams</em> 客户端来管理我们的应用程序生命周期</strong>。</p><p>在我们的示例中，我们提供了应用程序 ID、引导服务器连接详细信息以及我们配置的 SerDes（序列化器/反序列化器）。</p><h3 id="_4-2-拓扑" tabindex="-1"><a class="header-anchor" href="#_4-2-拓扑"><span>4.2. 拓扑</span></a></h3><p>现在我们已经设置了配置，让我们构建应用程序的拓扑，以统计输入消息中的单词：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WordCountProcessor</span> <span class="token punctuation">{</span>\n    <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们定义了一个配置方法，并用 <em>@Autowired</em> 注解。Spring 处理这个注解，并将容器中的匹配 bean 连接到 <em>StreamsBuilder</em> 参数。或者，我们也可以在配置类中创建一个 bean 来生成拓扑。</p><p><em>StreamsBuilder</em> 为我们提供了所有 Kafka Streams API 的访问，它就像一个常规的 Kafka Streams 应用程序。在我们的示例中，我们使用这个 <strong>高级 DSL 来定义我们应用程序的转换</strong>：</p><ul><li>使用指定的键和值 SerDes 从输入主题创建一个 <em>KStream</em>。</li><li>通过转换、分割、分组然后计数来创建一个 <em>KTable</em>。</li><li>将结果物质化到输出流。</li></ul><p>本质上，<strong>Spring Boot 在管理我们的 <em>KStream</em> 实例的生命周期的同时，提供了一个非常薄的包装器</strong>。它为我们的拓扑创建和配置所需的组件，并执行我们的流应用程序。重要的是，这让我们专注于我们的核心业务逻辑，而 Spring 管理生命周期。</p><h3 id="_4-3-rest-服务" tabindex="-1"><a class="header-anchor" href="#_4-3-rest-服务"><span>4.3. REST 服务</span></a></h3><p>在用声明性步骤定义了我们的管道之后，让我们创建 REST 控制器。这提供了端点，以便将消息 POST 到输入主题，并获取指定单词的计数。但重要的是，<strong>应用程序从 Kafka Streams 状态存储而不是输出主题检索数据</strong>。</p><p>首先，让我们修改之前的 <em>KTable</em> 并将聚合计数物化为本地状态存储。然后可以从 REST 控制器查询：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">KTable</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>` wordCounts <span class="token operator">=</span> textStream\n  <span class="token comment">// ...</span>\n  <span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token class-name">Materialized</span><span class="token punctuation">.</span><span class="token function">as</span><span class="token punctuation">(</span><span class="token string">&quot;counts&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在此之后，我们可以更新我们的控制器，从这个 <em>counts</em> 状态存储中检索计数值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/count/{word}&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token class-name">Long</span> <span class="token function">getWordCount</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span> <span class="token class-name">String</span> word<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，<em>factoryBean</em> 是 <em>StreamsBuilderFactoryBean</em> 的一个实例，它被连接到控制器中。这提供了由这个工厂 bean 管理的 <em>KafkaStreams</em> 实例。因此，我们可以获取我们之前创建的 <em>counts</em> 键/值状态存储，由 <em>KTable</em> 表示。在这一点上，我们可以使用它从本地状态存储中获取请求单词的当前计数。</p><h2 id="_5-测试" tabindex="-1"><a class="header-anchor" href="#_5-测试"><span>5. 测试</span></a></h2><p>测试是开发和验证我们应用程序拓扑的关键部分。Spring Kafka 测试库和 Testcontainers 都为我们的应用程序在各个级别上提供了出色的支持。</p><h3 id="_5-1-单元测试" tabindex="-1"><a class="header-anchor" href="#_5-1-单元测试"><span>5.1. 单元测试</span></a></h3><p>首先，让我们使用 <em>TopologyTestDriver</em> 为我们的拓扑设置单元测试。这是测试 Kafka Streams 应用程序的主要工具：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenInputMessages_whenProcessed_thenWordCountIsProduced</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们首先需要的是 <em>Topology</em>，它封装了我们从 <em>WordCountProcessor</em> 测试的业务逻辑。现在，我们可以使用这个与 <em>TopologyTestDriver</em> 一起为我们的测试创建输入和输出主题。至关重要的是，这 <strong>消除了运行代理的需要，并且仍然可以验证管道行为</strong>。换句话说，它使我们能够快速轻松地验证我们的管道行为，而不需要使用真实的 Kafka 代理。</p><h3 id="_5-2-集成测试" tabindex="-1"><a class="header-anchor" href="#_5-2-集成测试"><span>5.2. 集成测试</span></a></h3><p>最后，让我们使用 Testcontainers 框架对我们的应用程序进行端到端测试。这使用运行中的 Kafka 代理，并启动我们的应用程序进行完整测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Testcontainers</span>\n<span class="token annotation punctuation">@SpringBootTest</span><span class="token punctuation">(</span>classes <span class="token operator">=</span> <span class="token class-name">KafkaStreamsApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> webEnvironment <span class="token operator">=</span> <span class="token class-name">WebEnvironment</span><span class="token punctuation">.</span><span class="token constant">RANDOM_PORT</span><span class="token punctuation">)</span>\n<span class="token keyword">class</span> <span class="token class-name">KafkaStreamsApplicationLiveTest</span> <span class="token punctuation">{</span>\n    <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们向我们的 REST 控制器发送了一个 POST，它反过来将消息发送到 Kafka 输入主题。作为设置的一部分，我们还启动了一个 Kafka 消费者。这个消费者异步监听输出 Kafka 主题，并将接收到的单词计数更新到 <em>BlockingQueue</em>。</p><p>在测试执行期间，应用程序应该处理输入消息。随后，我们可以验证来自主题的预期输出以及使用 REST 服务的状态存储。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本教程中，我们看到了如何创建一个简单的事件驱动应用程序来使用 Kafka Streams 和 Spring Boot 处理消息。</p><p>在简要介绍了核心流概念之后，我们查看了流拓扑的配置和创建。然后，我们看到了如何将其与 Spring Boot 提供的 REST 功能集成。最后，我们涵盖了一些有效测试和验证我们的拓扑和应用程序行为的方法。</p><p>如往常一样，完整的源代码可在 GitHub 上获取。</p>',47),o=[i];function p(l,r){return e(),n("div",null,o)}const u=a(t,[["render",p],["__file","2024-07-23-Kafka Streams With Spring Boot.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-23/2024-07-23-Kafka%20Streams%20With%20Spring%20Boot.html","title":"Kafka Streams 与 Spring Boot | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Boot","Kafka Streams"],"tag":["Spring Boot","Kafka","Streams"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Kafka Streams, Event Stream Processing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-23/2024-07-23-Kafka%20Streams%20With%20Spring%20Boot.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kafka Streams 与 Spring Boot | Baeldung"}],["meta",{"property":"og:description","content":"Kafka Streams 与 Spring Boot | Baeldung 在本文中，我们将了解如何使用 Spring Boot 设置 Kafka Streams。Kafka Streams 是建立在 Apache Kafka 之上的客户端库。它以声明式的方式使我们可以处理无限的事件流。 一些流数据的真实生活例子可能是传感器数据、股票市场事件流和系统..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T13:59:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"Kafka"}],["meta",{"property":"article:tag","content":"Streams"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T13:59:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kafka Streams 与 Spring Boot | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-23T13:59:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kafka Streams 与 Spring Boot | Baeldung 在本文中，我们将了解如何使用 Spring Boot 设置 Kafka Streams。Kafka Streams 是建立在 Apache Kafka 之上的客户端库。它以声明式的方式使我们可以处理无限的事件流。 一些流数据的真实生活例子可能是传感器数据、股票市场事件流和系统..."},"headers":[{"level":2,"title":"2. 概览","slug":"_2-概览","link":"#_2-概览","children":[]},{"level":2,"title":"3. 依赖项","slug":"_3-依赖项","link":"#_3-依赖项","children":[]},{"level":2,"title":"4. 示例","slug":"_4-示例","link":"#_4-示例","children":[{"level":3,"title":"4.1. 配置","slug":"_4-1-配置","link":"#_4-1-配置","children":[]},{"level":3,"title":"4.2. 拓扑","slug":"_4-2-拓扑","link":"#_4-2-拓扑","children":[]},{"level":3,"title":"4.3. REST 服务","slug":"_4-3-rest-服务","link":"#_4-3-rest-服务","children":[]}]},{"level":2,"title":"5. 测试","slug":"_5-测试","link":"#_5-测试","children":[{"level":3,"title":"5.1. 单元测试","slug":"_5-1-单元测试","link":"#_5-1-单元测试","children":[]},{"level":3,"title":"5.2. 集成测试","slug":"_5-2-集成测试","link":"#_5-2-集成测试","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721743178000,"updatedTime":1721743178000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.13,"words":1839},"filePathRelative":"posts/baeldung/2024-07-23/2024-07-23-Kafka Streams With Spring Boot.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本文中，我们将了解如何使用 Spring Boot 设置 Kafka Streams。Kafka Streams 是建立在 Apache Kafka 之上的客户端库。它以声明式的方式使我们可以处理无限的事件流。</p>\\n<p>一些流数据的真实生活例子可能是传感器数据、股票市场事件流和系统日志。对于本教程，我们将构建一个简单的单词计数流应用程序。让我们首先了解 Kafka Streams 的概览，然后设置示例及其在 Spring Boot 中的测试。</p>\\n<h2>2. 概览</h2>\\n<p>Kafka Streams 提供了 Kafka 主题和关系数据库表之间的二元性。它使我们能够对一个或多个流事件执行诸如联接、分组、聚合和过滤等操作。</p>","autoDesc":true}');export{u as comp,m as data};
