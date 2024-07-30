import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a}from"./app-CbPcg273.js";const i={},s=a(`<h1 id="分布式系统的可观测性" tabindex="-1"><a class="header-anchor" href="#分布式系统的可观测性"><span>分布式系统的可观测性</span></a></h1><p>在本教程中，我们将讨论可观测性以及它在分布式系统中的重要作用。我们将涵盖构成可观测性的数据类型。这将帮助我们理解从分布式系统收集、存储和分析遥测数据的挑战。</p><p>最终，我们将介绍可观测性领域的一些行业标准和流行工具。</p><h2 id="_2-什么是可观测性" tabindex="-1"><a class="header-anchor" href="#_2-什么是可观测性"><span>2. 什么是可观测性？</span></a></h2><p>让我们直接给出正式定义来开始吧！可观测性是<strong>仅通过系统的外部输出就能测量其内部状态的能力</strong>。</p><p>对于像微服务这样的分布式系统，这些外部输出基本上被称为遥测数据。它包括机器的资源消耗、在机器上运行的应用程序生成的日志等信息。</p><h3 id="_2-1-遥测数据的类型" tabindex="-1"><a class="header-anchor" href="#_2-1-遥测数据的类型"><span>2.1. 遥测数据的类型</span></a></h3><p>我们可以将遥测数据分为三个类别，我们称之为**可观测性的三大支柱：**日志、指标和追踪。让我们更详细地了解它们。</p><p><strong>日志是应用程序在代码执行过程中的离散点生成的文本行</strong>。通常这些是结构化的，并且通常在不同的严重性级别生成。这些生成起来相当容易，但往往带有性能成本。此外，我们可能需要像Logstash这样的额外工具来高效地收集、存储和分析日志。</p><p>简单来说，<strong>指标是我们在一段时间内计算或聚合的值，以表示或衡量某些关于系统的数据</strong>，例如，虚拟机每秒的内存消耗。这些可以来自各种来源，如主机、应用程序和云平台。</p><p>追踪对于分布式系统非常重要，其中单个请求可以流经多个应用程序。<strong>追踪是分布式事件的表示，随着请求流经分布式系统</strong>。这在定位问题，如瓶颈、缺陷或其他分布式系统中的问题时非常有帮助。</p><h3 id="_2-2-可观测性的好处" tabindex="-1"><a class="header-anchor" href="#_2-2-可观测性的好处"><span>2.2. 可观测性的好处</span></a></h3><p>首先，我们需要理解为什么我们首先需要系统中的可观测性。我们大多数人可能都面临过在生产系统中排查难以理解的行为的挑战。我们不难理解，我们对生产环境的干扰选项是有限的。这在很大程度上让我们只能分析系统生成的数据。</p><p>可观测性对于调查系统开始偏离其预期状态的情况<strong>非常宝贵</strong>。它也相当有用，可以防止这些情况的发生！基于系统生成的可观测数据精心设置警报，可以帮助我们在系统完全失败之前采取补救措施。此外，这些数据为我们提供了重要的分析洞察，以调整系统以获得更好的体验。</p><p>对可观测性的需求，对于任何系统都很重要，对于分布式系统来说更是如此。此外，我们的系统可以跨越公共和私有云以及本地环境。随着时间的推移，它的规模和复杂性也在不断变化。这经常会导致以前从未预料到的问题。一个高度可观测的系统可以极大地帮助我们处理这种情况。</p><h2 id="_3-可观测性与监控" tabindex="-1"><a class="header-anchor" href="#_3-可观测性与监控"><span>3. 可观测性与监控</span></a></h2><p>我们经常在DevOps实践中听到监控与可观测性相关。那么这些术语之间有什么区别呢？嗯，它们都有类似的功能，使我们能够维护系统的可靠性。但它们之间有微妙的差别，实际上它们之间有关系。我们只有在系统可观测的情况下才能有效地监控它！</p><p>监控基本上指的是<strong>通过一组预定义的指标和日志观察系统状态的做法</strong>。这本质上意味着我们正在观察一组已知的故障。然而，在分布式系统中，有很多动态变化在不断发生。这导致我们从未寻找过的问题。因此，我们的监控系统可能只是错过了它们。</p><p>另一方面，可观测性帮助我们理解系统的内部状态。这可以让我们对系统的行为提出任意问题。例如，我们可以提出复杂的问题，比如在出现问题的情况下，每个服务是如何处理请求的。随着时间的推移，它可以帮助我们建立对系统动态行为的知识。</p><p>要理解为什么会这样，我们需要了解基数的概念。<strong>基数指的是集合中唯一项的数量</strong>。例如，用户社会安全号码的集合将比性别具有更高的基数。要回答关于系统行为的任意问题，我们需要高基数数据。然而，监控通常只处理低基数数据。</p><h2 id="_4-分布式系统中的可观测性" tabindex="-1"><a class="header-anchor" href="#_4-分布式系统中的可观测性"><span>4. 分布式系统中的可观测性</span></a></h2><p>正如我们前面看到的，可观测性对于复杂的分布式系统特别有用。但是，究竟是什么使分布式系统变得复杂，以及在这样的系统中实现可观测性存在哪些挑战呢？了解这个问题对于理解过去几年围绕这个主题发展起来的工具和平台的生态系统至关重要。</p><p>在分布式系统中，<strong>有很多动态变化的组件改变了系统的格局</strong>。此外，动态可扩展性意味着在任何时候运行服务的实例数量都是不确定的。这使得收集、整理和存储系统输出，如日志和指标的工作变得困难：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/06/Observability-Typical-Architecture.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>此外，仅仅理解系统内应用程序的情况是不够的。例如，问题可能在网络层或负载均衡器中。然后还有数据库、消息平台等等。<strong>重要的是，所有这些组件都必须始终可观测</strong>。我们必须能够从系统的各个部分收集和集中有意义的数据。</p><p>此外，由于几个组件正在协同工作，无论是同步还是异步，都不容易确定异常的来源。例如，很难说哪个服务在系统性能下降时导致瓶颈升级。正如我们之前看到的，追踪在调查这类问题时非常有用。</p><h2 id="_5-可观测性的演变" tabindex="-1"><a class="header-anchor" href="#_5-可观测性的演变"><span>5. 可观测性的演变</span></a></h2><p>可观测性的根源在于<strong>控制理论，这是应用数学的一个分支，处理使用反馈影响系统行为以实现预期目标</strong>。我们可以将这一原理应用于从工业工厂到飞机运营等多个行业。对于软件系统，自从一些社交网络站点如Twitter开始大规模运作以来，这已经变得流行。</p><p>直到最近几年，大多数软件系统都是单体的，这使得在事件期间对它们进行推理相当容易。监控在指示典型的故障场景方面相当有效。此外，调试代码以识别问题也是直观的。但是，随着微服务架构和云计算的出现，这很快成为了一项困难的任务。</p><p>随着这种演变的继续，软件系统不再是静态的——它们有许多动态变化的组件。这导致了以前从未预料到的问题。这<strong>催生了许多在应用性能管理（APM）旗下的工具</strong>，如AppDynamics和Dynatrace。这些工具承诺了一种更好地理解应用程序代码和系统行为的方式。</p><p>尽管这些工具在演变中已经取得了长足的进步，但它们当时主要是基于指标的。这阻止了它们提供我们所需的关于系统状态的视角。然而，它们是向前迈出的重要一步。今天，我们有了一套工具来解决可观测性的三大支柱。当然，底层组件也需要可观测！</p><h2 id="_6-可观测性的实践" tabindex="-1"><a class="header-anchor" href="#_6-可观测性的实践"><span>6. 可观测性的实践</span></a></h2><p>现在我们已经讨论了足够的可观测性理论，让我们看看如何将其付诸实践。我们将使用一个简单的基于微服务的分布式系统，我们将使用Java中的Spring Boot开发各个服务。这些服务将使用REST API同步相互通信。</p><p>让我们看看我们的系统服务：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/06/Observability-Distributed-System-1-1024x612.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>这是一个相当简单的分布式系统，其中_math-service_使用_addition-service_、_multiplication-service_等提供的API。此外，_math-service_公开API以计算各种公式。我们将跳过创建这些微服务的细节，因为这非常直接。</p><p>这个练习的重点是要认识到当今在可观测性背景下最常见的标准和流行工具。我们这个系统的目标架构，带有可观测性，看起来像下面的图表：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/06/Observability-Target-Architecture.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>其中许多也在云原生计算基金会（CNCF）的不同认可阶段，这是一个促进容器技术发展的组织。我们将看看如何在我们的分布式系统中使用其中一些。</p><h2 id="_7-使用opentracing进行追踪" tabindex="-1"><a class="header-anchor" href="#_7-使用opentracing进行追踪"><span>7. 使用OpenTracing进行追踪</span></a></h2><p>我们已经看到追踪如何提供宝贵的洞察，以了解单个请求如何在分布式系统中传播。OpenTracing是CNCF旗下的一个孵化项目。它提供了<strong>供应商中立的API和分布式追踪的仪器</strong>。这有助于我们向代码添加不特定于任何供应商的仪器。</p><p>符合OpenTracing的追踪器列表正在迅速增长。最受欢迎的追踪器之一是Jaeger，它也是CNCF下的毕业项目。</p><p>让我们看看如何在我们的应用程序中使用Jaeger与OpenTracing：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/06/Observability-With-OpenTracing.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们将在后面详细介绍。只是要注意，还有几个其他的选择，如LightStep、Instana、SkyWalking和Datadog。我们可以在不改变我们添加仪器的方式的情况下轻松切换这些追踪器。</p><h3 id="_7-1-概念和术语" tabindex="-1"><a class="header-anchor" href="#_7-1-概念和术语"><span>7.1. 概念和术语</span></a></h3><p>OpenTracing中的追踪由span组成。<strong>span是分布式系统中完成的单个工作单元</strong>。基本上，追踪可以看作是一个span的有向无环图（DAG）。我们把span之间的边称为引用。分布式系统中的每个组件都向追踪添加一个span。Span包含对其他span的引用，这有助于追踪重新创建请求的生命周期。</p><p>我们可以在时间轴或图表上可视化追踪中span之间的因果关系：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/06/OpenTracing-Trace.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在这里，我们可以看到<strong>OpenTracing定义的两种类型的引用</strong>，“ChildOf”和“FollowsFrom”。这些建立了子span和父span之间的关系。</p><p>OpenTracing规范定义了span捕获的状态：</p><ul><li>一个操作已完成，以下是翻译的继续部分：</li></ul><p>操作名称</p><ul><li>开始时间戳和完成时间戳</li><li>一组键值对span标签</li><li>一组键值对span日志</li><li>SpanContext</li></ul><p><strong>标签允许用户定义的注释成为span的一部分</strong>，我们使用它来查询和过滤追踪数据。Span标签适用于整个span。同样，日志允许span捕获来自应用程序的日志消息以及其他调试或信息输出。Span日志可以适用于span内的特定时刻或事件。</p><p>最后，<strong>SpanContext是将span联系在一起的东西</strong>。它携带跨进程边界的数据。让我们快速看一下一个典型的SpanContext：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/06/OpenTracing-SpanContext.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>正如我们所看到的，它主要由以下组成：</p><ul><li>实现依赖的状态，如_spanId_和_traceId_</li><li>任何行李项目，这些是跨进程边界的键值对</li></ul><h3 id="_7-2-设置和仪器" tabindex="-1"><a class="header-anchor" href="#_7-2-设置和仪器"><span>7.2. 设置和仪器</span></a></h3><p>我们将从安装Jaeger开始，这是我们将要使用的与OpenTracing兼容的追踪器。尽管它有多个组件，但我们可以用一个简单的Docker命令安装它们全部：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>docker run -d -p 5775:5775/udp -p 16686:16686 jaegertracing/all-in-one:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，我们需要在应用程序中导入必要的依赖项。对于基于Maven的应用程序，这就像添加依赖项一样简单：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`io.opentracing.contrib\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`opentracing-spring-jaeger-web-starter\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`3.3.1\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于基于Spring Boot的应用程序，我们可以利用第三方贡献的这个库。这包括所有必要的依赖项，并提供必要的默认配置，以仪器化Web请求/响应，并将追踪发送到Jaeger。</p><p>在应用程序方面，我们需要创建一个_Tracer_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
public Tracer getTracer() {
    Configuration.SamplerConfiguration samplerConfig = Configuration
      .SamplerConfiguration.fromEnv()
      .withType(&quot;const&quot;).withParam(1);
    Configuration.ReporterConfiguration reporterConfig = Configuration
      .ReporterConfiguration.fromEnv()
      .withLogSpans(true);
    Configuration config = new Configuration(&quot;math-service&quot;)
      .withSampler(samplerConfig)
      .withReporter(reporterConfig);
    return config.getTracer();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这足以为请求经过的服务生成跨度。如果需要，我们也可以在服务内生成子跨度：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Span span = tracer.buildSpan(&quot;my-span&quot;).start();
// Some code for which which the span needs to be reported
span.finish();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这非常简单直观，但在我们分析复杂分布式系统时非常强大。</p><h3 id="_7-3-追踪分析" tabindex="-1"><a class="header-anchor" href="#_7-3-追踪分析"><span>7.3. 追踪分析</span></a></h3><p><strong>Jaeger带有一个用户界面</strong>，默认可在端口16686上访问。它提供了一个简单的方法来查询、过滤和分析追踪数据，并进行可视化。让我们看看我们分布式系统的一个样本追踪：</p><p>正如我们所看到的，这是通过其_traceId_识别的一个特定追踪的可视化。它清楚地显示了这个追踪中的所有跨度，以及它们属于哪个服务以及完成所需的时间等详细信息。这可以帮助我们在异常行为的情况下理解问题可能在哪里。</p><h2 id="_8-使用opencensus进行指标" tabindex="-1"><a class="header-anchor" href="#_8-使用opencensus进行指标"><span>8. 使用OpenCensus进行指标</span></a></h2><p>OpenCensus提供了<strong>多种语言的库，允许我们从应用程序中收集指标和分布式追踪</strong>。它起源于谷歌，但此后已经发展成为一个由不断增长的社区开发的开源项目。OpenCensus的好处是它可以将数据发送到任何后端进行分析。这使我们能够抽象我们的仪器代码，而不是将其与特定的后端耦合。</p><p>尽管OpenCensus可以支持追踪和指标，我们将在我们的示例应用程序中仅使用它进行指标。<strong>我们可以使用几种后端</strong>。最受欢迎的指标工具之一是Prometheus，这是一个开源监控解决方案，也是CNCF下的毕业项目。让我们看看Jaeger如何与OpenCensus集成到我们的应用程序中：</p><p>尽管Prometheus带有一个用户界面，但我们可以使用像Grafana这样的可视化工具，它与Prometheus集成得很好。</p><h3 id="_8-1-概念和术语" tabindex="-1"><a class="header-anchor" href="#_8-1-概念和术语"><span>8.1. 概念和术语</span></a></h3><p>在OpenCensus中，<strong>度量表示要记录的度量类型</strong>。例如，请求有效载荷的大小可以是一个要收集的度量。<strong>测是在通过度量记录数量后产生的数据点</strong>。例如，80 kb可以是请求有效载荷大小度量的测量。所有度量都通过名称、描述和单位来标识。</p><p>为了分析统计数据，我们需要使用视图对数据进行聚合。<strong>视图基本上是应用于度量的聚合</strong>，可选地，还有标签。OpenCensus支持计数、分布、总和和最后一个值等聚合方法。视图由名称、描述、度量、标签键和聚合组成。多个视图可以使用相同的度量进行不同的聚合。</p><p><strong>标签是与记录的测量相关联的键值对数据</strong>，以提供上下文信息，并在分析期间区分和分组指标。当我们聚合测量以创建指标时，我们可以使用标签作为标签来细分指标。标签也可以作为请求头在分布式系统中传播。</p><p>最后，<strong>导出器可以将指标发送到任何能够消费它们的后端</strong>。导出器可以根据后端而改变，而不影响客户端代码。这使得OpenCensus在度量收集方面是供应商中立的。有相当多的导出器可用于多种语言，适用于大多数流行的后端，如Prometheus。</p><h3 id="_8-2-设置和仪器" tabindex="-1"><a class="header-anchor" href="#_8-2-设置和仪器"><span>8.2. 设置和仪器</span></a></h3><p>由于我们将Prometheus作为后端，我们应该从安装它开始。这是使用官方Docker镜像快速简单的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>docker run -d -p 9090:9090 -v \\
  ./prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Prometheus通过抓取这些目标上的指标端点来从监控目标收集指标。因此，我们需要在Prometheus配置YAML文件_prometheus.yml_中提供详细信息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>scrape_configs:
  - job_name: &#39;spring_opencensus&#39;
    scrape_interval: 10s
    static_configs:
      - targets: [&#39;localhost:8887&#39;, &#39;localhost:8888&#39;, &#39;localhost:8889&#39;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个基本配置，告诉Prometheus从哪些目标抓取指标。现在，<strong>我们可以启动Prometheus</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>docker run -d -p 9090:9090 -v \\
  ./prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>对于定义自定义指标，我们从<strong>定义一个度量</strong>开始：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>MeasureDouble M_LATENCY_MS = MeasureDouble
  .create(&quot;math-service/latency&quot;, &quot;The latency in milliseconds&quot;, &quot;ms&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们需要<strong>为我们刚刚定义的度量记录一个测量</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>StatsRecorder STATS_RECORDER = Stats.getStatsRecorder();
STATS_RECORDER.newMeasureMap()
  .put(M_LATENCY_MS, 17.0)
  .record();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们需要<strong>定义一个聚合和视图，以便我们可以将其作为指标导出</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Aggregation latencyDistribution = Distribution.create(BucketBoundaries.create(
  Arrays.asList(0.0, 25.0, 100.0, 200.0, 400.0, 800.0, 10000.0)));
View view = View.create(
  Name.create(&quot;math-service/latency&quot;),
  &quot;The distribution of the latencies&quot;,
  M_LATENCY_MS,
  latencyDistribution,
  Collections.singletonList(KEY_METHOD)),
};
ViewManager manager = Stats.getViewManager();
manager.registerView(view);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，为了将视图导出到Prometheus，我们需要创建并注册收集器，并作为一个守护进程运行HTTP服务器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>PrometheusStatsCollector.createAndRegister();
HTTPServer server = new HTTPServer(&quot;localhost&quot;, 8887, true);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个简单的例子，说明了我们如何从应用程序记录延迟作为度量，并将其实现为Prometheus进行存储和分析的视图。</p><h3 id="_8-3-指标分析" tabindex="-1"><a class="header-anchor" href="#_8-3-指标分析"><span>8.3. 指标分析</span></a></h3><p><strong>OpenCensus提供了称为zPages的进程内网页</strong>，这些网页显示了它们附加到的进程收集的数据。此外，Prometheus提供了表达式浏览器，允许我们输入任何表达式并查看其结果。然而，像Grafana这样的工具提供了更优雅和高效的可视化。</p><p>使用官方Docker镜像安装Grafana相当简单：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>docker run -d --name=grafana -p 3000:3000 grafana/grafana
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Grafana支持查询Prometheus - 我们只需要在Grafana中将Prometheus添加为数据源。然后，我们可以使用常规的Prometheus查询表达式创建图表：</p><p>有许多图表设置可供我们使用，以调整我们的图表。此外，还有许多为Prometheus预构建的Grafana仪表板，我们可能会发现它们很有用。</p><h2 id="_9-使用elastic-stack进行日志记录" tabindex="-1"><a class="header-anchor" href="#_9-使用elastic-stack进行日志记录"><span>9. 使用Elastic Stack进行日志记录</span></a></h2><p>日志可以提供对应用程序对事件反应方式的宝贵见解。不幸的是，在分布式系统中，这是跨多个组件分割的。因此，将所有组件的日志收集并存储在一个地方进行有效分析变得重要。此外，我们需要一个直观的用户界面，以有效查询、过滤和引用日志。</p><p>Elastic Stack基本上是一个<strong>日志管理平台，直到最近还是三个产品的集合</strong> - Elasticsearch、Logstash和Kibana（ELK）。</p><p>然而，从那时起，**已经向这个堆栈中添加了Beats，以实现</p>`,108),r=[s];function l(p,o){return n(),t("div",null,r)}const g=e(i,[["render",l],["__file","2024-07-29-Observability in Distributed Systems.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-29/2024-07-29-Observability%20in%20Distributed%20Systems.html","title":"分布式系统的可观测性","lang":"zh-CN","frontmatter":{"date":"2021-06-01T00:00:00.000Z","category":["Distributed Systems"],"tag":["Observability","Monitoring","Microservices"],"head":[["meta",{"name":"keywords","content":"observability, distributed systems, monitoring, microservices, telemetry data"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-29/2024-07-29-Observability%20in%20Distributed%20Systems.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"分布式系统的可观测性"}],["meta",{"property":"og:description","content":"分布式系统的可观测性 在本教程中，我们将讨论可观测性以及它在分布式系统中的重要作用。我们将涵盖构成可观测性的数据类型。这将帮助我们理解从分布式系统收集、存储和分析遥测数据的挑战。 最终，我们将介绍可观测性领域的一些行业标准和流行工具。 2. 什么是可观测性？ 让我们直接给出正式定义来开始吧！可观测性是仅通过系统的外部输出就能测量其内部状态的能力。 对于..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2021/06/Observability-Typical-Architecture.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-29T04:13:23.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Observability"}],["meta",{"property":"article:tag","content":"Monitoring"}],["meta",{"property":"article:tag","content":"Microservices"}],["meta",{"property":"article:published_time","content":"2021-06-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-29T04:13:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"分布式系统的可观测性\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2021/06/Observability-Typical-Architecture.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2021/06/Observability-Distributed-System-1-1024x612.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2021/06/Observability-Target-Architecture.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2021/06/Observability-With-OpenTracing.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2021/06/OpenTracing-Trace.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2021/06/OpenTracing-SpanContext.jpg\\"],\\"datePublished\\":\\"2021-06-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-29T04:13:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"分布式系统的可观测性 在本教程中，我们将讨论可观测性以及它在分布式系统中的重要作用。我们将涵盖构成可观测性的数据类型。这将帮助我们理解从分布式系统收集、存储和分析遥测数据的挑战。 最终，我们将介绍可观测性领域的一些行业标准和流行工具。 2. 什么是可观测性？ 让我们直接给出正式定义来开始吧！可观测性是仅通过系统的外部输出就能测量其内部状态的能力。 对于..."},"headers":[{"level":2,"title":"2. 什么是可观测性？","slug":"_2-什么是可观测性","link":"#_2-什么是可观测性","children":[{"level":3,"title":"2.1. 遥测数据的类型","slug":"_2-1-遥测数据的类型","link":"#_2-1-遥测数据的类型","children":[]},{"level":3,"title":"2.2. 可观测性的好处","slug":"_2-2-可观测性的好处","link":"#_2-2-可观测性的好处","children":[]}]},{"level":2,"title":"3. 可观测性与监控","slug":"_3-可观测性与监控","link":"#_3-可观测性与监控","children":[]},{"level":2,"title":"4. 分布式系统中的可观测性","slug":"_4-分布式系统中的可观测性","link":"#_4-分布式系统中的可观测性","children":[]},{"level":2,"title":"5. 可观测性的演变","slug":"_5-可观测性的演变","link":"#_5-可观测性的演变","children":[]},{"level":2,"title":"6. 可观测性的实践","slug":"_6-可观测性的实践","link":"#_6-可观测性的实践","children":[]},{"level":2,"title":"7. 使用OpenTracing进行追踪","slug":"_7-使用opentracing进行追踪","link":"#_7-使用opentracing进行追踪","children":[{"level":3,"title":"7.1. 概念和术语","slug":"_7-1-概念和术语","link":"#_7-1-概念和术语","children":[]},{"level":3,"title":"7.2. 设置和仪器","slug":"_7-2-设置和仪器","link":"#_7-2-设置和仪器","children":[]},{"level":3,"title":"7.3. 追踪分析","slug":"_7-3-追踪分析","link":"#_7-3-追踪分析","children":[]}]},{"level":2,"title":"8. 使用OpenCensus进行指标","slug":"_8-使用opencensus进行指标","link":"#_8-使用opencensus进行指标","children":[{"level":3,"title":"8.1. 概念和术语","slug":"_8-1-概念和术语","link":"#_8-1-概念和术语","children":[]},{"level":3,"title":"8.2. 设置和仪器","slug":"_8-2-设置和仪器","link":"#_8-2-设置和仪器","children":[]},{"level":3,"title":"8.3. 指标分析","slug":"_8-3-指标分析","link":"#_8-3-指标分析","children":[]}]},{"level":2,"title":"9. 使用Elastic Stack进行日志记录","slug":"_9-使用elastic-stack进行日志记录","link":"#_9-使用elastic-stack进行日志记录","children":[]}],"git":{"createdTime":1722226403000,"updatedTime":1722226403000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":16.23,"words":4868},"filePathRelative":"posts/baeldung/2024-07-29/2024-07-29-Observability in Distributed Systems.md","localizedDate":"2021年6月1日","excerpt":"\\n<p>在本教程中，我们将讨论可观测性以及它在分布式系统中的重要作用。我们将涵盖构成可观测性的数据类型。这将帮助我们理解从分布式系统收集、存储和分析遥测数据的挑战。</p>\\n<p>最终，我们将介绍可观测性领域的一些行业标准和流行工具。</p>\\n<h2>2. 什么是可观测性？</h2>\\n<p>让我们直接给出正式定义来开始吧！可观测性是<strong>仅通过系统的外部输出就能测量其内部状态的能力</strong>。</p>\\n<p>对于像微服务这样的分布式系统，这些外部输出基本上被称为遥测数据。它包括机器的资源消耗、在机器上运行的应用程序生成的日志等信息。</p>\\n<h3>2.1. 遥测数据的类型</h3>","autoDesc":true}');export{g as comp,u as data};
