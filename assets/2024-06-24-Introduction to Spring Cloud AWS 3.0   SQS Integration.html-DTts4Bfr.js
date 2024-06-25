import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DmJfAgU2.js";const e={},p=t('<hr><h1 id="spring-cloud-aws-3-0-与-sqs-集成介绍" tabindex="-1"><a class="header-anchor" href="#spring-cloud-aws-3-0-与-sqs-集成介绍"><span>Spring Cloud AWS 3.0 与 SQS 集成介绍</span></a></h1><p>Spring Cloud AWS 是一个旨在简化与 AWS 服务交互的项目。Simple Queue Service（SQS）是 AWS 的一个解决方案，用于以可扩展的方式发送和接收异步消息。</p><p>在本教程中，我们将重新介绍 Spring Cloud AWS SQS 集成，该集成已为 Spring Cloud AWS 3.0 完全重写。</p><p>该框架提供了熟悉的 Spring 抽象来处理 SQS 队列，例如 SqsTemplate 和 @SqsListener 注解。</p><p>我们将通过事件驱动的场景，展示发送和接收消息的示例，并展示使用 Testcontainers（一种管理一次性 Docker 容器的工具）和 LocalStack（本地模拟类似 AWS 环境的工具）来设置集成测试的策略。</p><h2 id="_2-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-依赖项"><span>2. 依赖项</span></a></h2><p>Spring Cloud AWS Bill of Materials (BOM) 确保了项目之间的版本兼容。它为许多依赖项声明了版本，包括 Spring Boot，并<strong>应代替 Spring Boot 自己的 BOM 使用</strong>。</p><p>以下是如何在我们的 pom.xml 文件中导入它的方式：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencyManagement</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>`\n        ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``````\n            ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``````io.awspring.cloud``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``````\n            ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````spring-cloud-aws``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`3.0.4`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>type</span><span class="token punctuation">&gt;</span></span>`pom`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>type</span><span class="token punctuation">&gt;</span></span>`\n            ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>````import````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>````\n        ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``````\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencyManagement</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将需要的主要依赖项是 SQS Starter，它包含了项目的所有 SQS 相关类。SQS 集成没有依赖于 Spring Boot，并且可以在任何标准 Java 应用程序中独立使用：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``````\n    ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``````io.awspring.cloud``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``````\n    ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````spring-cloud-aws-starter-sqs``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````\n``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于像本教程中我们正在构建的 Spring Boot 应用程序，我们应该添加项目的核心启动器，因为它允许我们利用 Spring Boot 的自动配置功能，以及 AWS 配置，如凭证和区域：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``````\n    ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``````io.awspring.cloud``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``````\n    ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````spring-cloud-aws-starter``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````\n``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-设置本地测试环境" tabindex="-1"><a class="header-anchor" href="#_3-设置本地测试环境"><span>3. 设置本地测试环境</span></a></h2><p>在这一部分中，我们将介绍如何使用 Testcontainers 设置 LocalStack 环境，以便在本地环境中测试我们的代码。请注意，<strong>本教程中的示例也可以直接针对 AWS 执行</strong>。</p><h3 id="_3-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_3-1-依赖项"><span>3.1. 依赖项</span></a></h3><p>为了使用 JUnit 5 运行 LocalStack 和 TestContainers，我们需要两个额外的依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``````\n    ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``````org.testcontainers``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``````\n    ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````localstack``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>````test````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>````\n``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``````\n``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``````\n    ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``````org.testcontainers``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``````\n    ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````junit-jupiter``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>````test````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>````\n``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还要包括 awaitility 库，以帮助我们断言异步消息消费：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``````\n    ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``````org.awaitility``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``````\n    ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````awaitility``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>````test````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>````\n``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-配置" tabindex="-1"><a class="header-anchor" href="#_3-2-配置"><span>3.2. 配置</span></a></h3><p>现在，我们将创建一个类来管理我们的容器逻辑，这可以由我们的测试套件继承。让我们将其命名为 <em>BaseSqsIntegrationTests</em>。对于扩展此类的每个测试套件，Testcontainers 将创建并启动一个新的容器，这对于<strong>隔离每个套件的数据</strong>至关重要。</p><p>@SpringBootTest 注解是必要的，以便 Spring 上下文被初始化，而 @Testcontainers 注解将我们的 Testcontainers 注解与 JUnit 的运行时关联起来，以便容器在测试套件运行时启动，并在测试完成后停止：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>\n<span class="token annotation punctuation">@Testcontainers</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BaseSqsIntegrationTest</span> <span class="token punctuation">{</span>\n   <span class="token comment">// 我们的测试配置将在这里添加</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们声明 <em>LocalStackContainer</em>。@Container 注解也是必要的，以便框架自动管理容器的生命周期：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">LOCAL_STACK_VERSION</span> <span class="token operator">=</span> <span class="token string">&quot;localstack/localstack:2.3.2&quot;</span><span class="token punctuation">;</span>\n\n<span class="token annotation punctuation">@Container</span>\n<span class="token keyword">static</span> <span class="token class-name">LocalStackContainer</span> localstack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LocalStackContainer</span><span class="token punctuation">(</span><span class="token class-name">DockerImageName</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token constant">LOCAL_STACK_VERSION</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们将绑定 Spring Cloud AWS 框架用于自动配置的属性与 LocalStack。我们将在运行时获取容器端口和主机，因为 Testcontainers 将为我们提供一个随机端口，这对于并行测试是很好的。我们可以使用 @DynamicPropertySource 注解来实现这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@DynamicPropertySource</span>\n<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">overrideProperties</span><span class="token punctuation">(</span><span class="token class-name">DynamicPropertyRegistry</span> registry<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    registry<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;spring.cloud.aws.region.static&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> localStack<span class="token punctuation">.</span><span class="token function">getRegion</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    registry<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;spring.cloud.aws.credentials.access-key&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> localStack<span class="token punctuation">.</span><span class="token function">getAccessKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    registry<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;spring.cloud.aws.credentials.secret-key&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> localStack<span class="token punctuation">.</span><span class="token function">getSecretKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    registry<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;spring.cloud.aws.sqs.endpoint&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> localStack<span class="token punctuation">.</span><span class="token function">getEndpointOverride</span><span class="token punctuation">(</span><span class="token constant">SQS</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">// ...其他 AWS 服务端点可以在这里添加</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这就是我们使用 LocalStack、Testcontainers 和 Spring Cloud AWS 实现 Spring Boot 测试所需的全部。我们还需要<strong>确保 Docker 引擎在我们的本地环境中运行</strong>，然后再运行测试。</p><h2 id="_4-设置队列名称" tabindex="-1"><a class="header-anchor" href="#_4-设置队列名称"><span>4. 设置队列名称</span></a></h2><p>我们可以通过<strong>利用 Spring Boot 的 <em>application.yml</em> 属性机制</strong>来设置队列名称。</p><p>对于本教程，我们将创建三个队列：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">events</span><span class="token punctuation">:</span>\n  <span class="token key atrule">queues</span><span class="token punctuation">:</span>\n    <span class="token key atrule">user-created-by-name-queue</span><span class="token punctuation">:</span> user_created_by_name_queue\n    <span class="token key atrule">user-created-record-queue</span><span class="token punctuation">:</span> user_created_record_queue\n    <span class="token key atrule">user-created-event-type-queue</span><span class="token punctuation">:</span> user_created_event_type_queue\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们创建一个 POJO 来表示这些属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">&quot;events.queues&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EventQueuesProperties</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">String</span> userCreatedByNameQueue<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> userCreatedRecordQueue<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> userCreatedEventTypeQueue<span class="token punctuation">;</span>\n\n    <span class="token comment">// getters and setters</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们需要在带有 @Configuration 注解的类中，或主 Spring 应用程序类中使用 @EnableConfigurationProperties 注解，以让 Spring Boot 知道我们想要用我们的 <em>application.yml</em> 属性填充它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>\n<span class="token annotation punctuation">@EnableConfigurationProperties</span><span class="token punctuation">(</span><span class="token class-name">EventQueuesProperties</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SpringCloudAwsApplication</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">SpringCloudAwsApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以在需要队列名称时注入这些值本身或 POJO。</p><p>默认情况下，<strong>Spring Cloud AWS SQS 会在找不到队列时创建它们</strong>，这有助于我们快速设置开发环境。在生产环境中，应用程序不应该有权限创建队列，所以如果找不到队列，它将无法启动。框架也可以配置为如果找不到队列则显式失败。</p><h2 id="_5-发送和接收消息" tabindex="-1"><a class="header-anchor" href="#_5-发送和接收消息"><span>5. 发送和接收消息</span></a></h2><p>使用 Spring Cloud AWS 发送和接收 SQS 的消息有多种方式。在这里，我们将介绍最常见的几种方式，<strong>使用 SqsTemplate 发送消息和使用 @SqsListener 注解接收它们</strong>。</p><h3 id="_5-1-场景" tabindex="-1"><a class="header-anchor" href="#_5-1-场景"><span>5.1. 场景</span></a></h3><p>在我们的场景中，我们将<strong>模拟一个事件驱动的应用程序</strong>，它响应 UserCreatedEvent 通过在其本地存储库中保存相关信息。</p><p>让我们创建一个 User 实体：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">record</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> email<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们创建一个简单的内存 UserRepository：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserRepository</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Map</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>` persistedUsers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token class-name">User</span> userToSave<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        persistedUsers<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>userToSave<span class="token punctuation">.</span><span class="token function">id</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> userToSave<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">Optional</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>`` <span class="token function">findById</span><span class="token punctuation">(</span><span class="token class-name">String</span> userId<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span>persistedUsers<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>userId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">Optional</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>`` <span class="token function">findByName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> persistedUsers<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>user <span class="token operator">-&gt;</span> user<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们创建一个 UserCreatedEvent Java 记录类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">record</span> <span class="token class-name">UserCreatedEvent</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">,</span> <span class="token class-name">String</span> username<span class="token punctuation">,</span> <span class="token class-name">String</span> email<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-设置" tabindex="-1"><a class="header-anchor" href="#_5-2-设置"><span>5.2. 设置</span></a></h3><p>为了测试我们的场景，我们将创建一个 SpringCloudAwsSQSLiveTest 类，它扩展了我们之前创建的 BaseSqsIntegrationTest 文件。我们将自动装配三个依赖项：由框架自动配置的 SqsTemplate，UserRepository 以便我们可以断言我们的消息处理工作正常，以及我们的 EventQueuesProperties POJO 包含队列名称：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SpringCloudAwsSQSLiveTest</span> <span class="token keyword">extends</span> <span class="token class-name">BaseSqsIntegrationTest</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> logger <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">SpringCloudAwsSQSLiveTest</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Autowired</span>\n    <span class="token keyword">private</span> <span class="token class-name">SqsTemplate</span> sqsTemplate<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Autowired</span>\n    <span class="token keyword">private</span> <span class="token class-name">UserRepository</span> userRepository<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Autowired</span>\n    <span class="token keyword">private</span> <span class="token class-name">EventQueuesProperties</span> eventQueuesProperties<span class="token punctuation">;</span>\n\n   <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',53),o=[p];function c(l,i){return a(),s("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-24-Introduction to Spring Cloud AWS 3.0   SQS Integration.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-Introduction%20to%20Spring%20Cloud%20AWS%203.0%20%20%20SQS%20Integration.html","title":"Spring Cloud AWS 3.0 与 SQS 集成介绍","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Spring Cloud AWS","SQS Integration"],"tag":["Spring Cloud AWS 3.0","SQS","Integration Test","Testcontainers","LocalStack"],"head":[["meta",{"name":"keywords","content":"Spring Cloud AWS, SQS Integration, Event-Driven, Asynchronous Messaging, Java, AWS"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-Introduction%20to%20Spring%20Cloud%20AWS%203.0%20%20%20SQS%20Integration.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Cloud AWS 3.0 与 SQS 集成介绍"}],["meta",{"property":"og:description","content":"Spring Cloud AWS 3.0 与 SQS 集成介绍 Spring Cloud AWS 是一个旨在简化与 AWS 服务交互的项目。Simple Queue Service（SQS）是 AWS 的一个解决方案，用于以可扩展的方式发送和接收异步消息。 在本教程中，我们将重新介绍 Spring Cloud AWS SQS 集成，该集成已为 Spri..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T06:51:13.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Cloud AWS 3.0"}],["meta",{"property":"article:tag","content":"SQS"}],["meta",{"property":"article:tag","content":"Integration Test"}],["meta",{"property":"article:tag","content":"Testcontainers"}],["meta",{"property":"article:tag","content":"LocalStack"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-24T06:51:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Cloud AWS 3.0 与 SQS 集成介绍\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-24T06:51:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Cloud AWS 3.0 与 SQS 集成介绍 Spring Cloud AWS 是一个旨在简化与 AWS 服务交互的项目。Simple Queue Service（SQS）是 AWS 的一个解决方案，用于以可扩展的方式发送和接收异步消息。 在本教程中，我们将重新介绍 Spring Cloud AWS SQS 集成，该集成已为 Spri..."},"headers":[{"level":2,"title":"2. 依赖项","slug":"_2-依赖项","link":"#_2-依赖项","children":[]},{"level":2,"title":"3. 设置本地测试环境","slug":"_3-设置本地测试环境","link":"#_3-设置本地测试环境","children":[{"level":3,"title":"3.1. 依赖项","slug":"_3-1-依赖项","link":"#_3-1-依赖项","children":[]},{"level":3,"title":"3.2. 配置","slug":"_3-2-配置","link":"#_3-2-配置","children":[]}]},{"level":2,"title":"4. 设置队列名称","slug":"_4-设置队列名称","link":"#_4-设置队列名称","children":[]},{"level":2,"title":"5. 发送和接收消息","slug":"_5-发送和接收消息","link":"#_5-发送和接收消息","children":[{"level":3,"title":"5.1. 场景","slug":"_5-1-场景","link":"#_5-1-场景","children":[]},{"level":3,"title":"5.2. 设置","slug":"_5-2-设置","link":"#_5-2-设置","children":[]}]}],"git":{"createdTime":1719211873000,"updatedTime":1719211873000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.31,"words":1594},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-Introduction to Spring Cloud AWS 3.0   SQS Integration.md","localizedDate":"2024年6月24日","excerpt":"<hr>\\n<h1>Spring Cloud AWS 3.0 与 SQS 集成介绍</h1>\\n<p>Spring Cloud AWS 是一个旨在简化与 AWS 服务交互的项目。Simple Queue Service（SQS）是 AWS 的一个解决方案，用于以可扩展的方式发送和接收异步消息。</p>\\n<p>在本教程中，我们将重新介绍 Spring Cloud AWS SQS 集成，该集成已为 Spring Cloud AWS 3.0 完全重写。</p>\\n<p>该框架提供了熟悉的 Spring 抽象来处理 SQS 队列，例如 SqsTemplate 和 @SqsListener 注解。</p>\\n<p>我们将通过事件驱动的场景，展示发送和接收消息的示例，并展示使用 Testcontainers（一种管理一次性 Docker 容器的工具）和 LocalStack（本地模拟类似 AWS 环境的工具）来设置集成测试的策略。</p>","autoDesc":true}');export{d as comp,k as data};
