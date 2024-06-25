import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-hBlfnCEU.js";const t={},o=e(`<h1 id="使用prometheus监控spring-boot应用-baeldung" tabindex="-1"><a class="header-anchor" href="#使用prometheus监控spring-boot应用-baeldung"><span>使用Prometheus监控Spring Boot应用 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在软件开发的严格要求世界中，确保应用程序在生产环境中部署后能够最佳且可靠地执行不仅是可取的——这是必需的。使用Spring Boot，开发者可以轻松设置独立、高质量的应用程序。然而，要真正提高性能、可用性和可靠性，集成像Prometheus这样复杂的监控工具是关键。</p><p>本教程旨在提供<strong>一个详细的教程，介绍如何将Prometheus与Spring Boot应用程序连接</strong>，通过基本和复杂的配置丰富我们的监控策略。</p><h2 id="_2-prometheus是什么" tabindex="-1"><a class="header-anchor" href="#_2-prometheus是什么"><span>2. Prometheus是什么？</span></a></h2><p>Prometheus是一个<strong>开源项目，旨在深入挖掘我们的应用程序数据，创建过滤层来收集和分析从最简单的到最复杂的一切</strong>。这不仅仅是关于数字和图表：它是通过其高级查询语言和时间序列数据能力来理解我们应用程序的心跳。</p><p>集成Prometheus使我们能够识别问题发生之前的问题，微调我们的系统，确保我们的应用程序以最佳性能运行，最终意味着为我们的用户带来更好的体验——方便、快速和可靠。</p><h2 id="_3-在spring-boot中开始使用prometheus" tabindex="-1"><a class="header-anchor" href="#_3-在spring-boot中开始使用prometheus"><span>3. 在Spring Boot中开始使用Prometheus</span></a></h2><p>将Prometheus与我们的Spring Boot应用程序集成允许我们通过以Prometheus可以理解和抓取的格式公开应用程序指标来有效监控。这个过程涉及两个主要步骤：向我们的项目添加必要的依赖项并配置我们的应用程序以公开指标。</p><h3 id="_3-1-添加依赖项" tabindex="-1"><a class="header-anchor" href="#_3-1-添加依赖项"><span>3.1. 添加依赖项</span></a></h3><p>要开始，我们向项目的依赖项中添加Spring Boot Actuator和Micrometer Prometheus注册表。<strong>执行器提供了一系列内置端点来显示有关运行中应用程序的性能信息</strong>，例如健康、指标等。<strong>然后，Micrometer Prometheus注册表将这些指标格式化为Prometheus可读的格式。</strong></p><p>让我们将依赖项添加到Maven项目的_pom.xml_文件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId\\</span><span class="token punctuation">&gt;</span></span>org.springframework.boot\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId\\</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-actuator\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId\\</span><span class="token punctuation">&gt;</span></span>
\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency\\</span><span class="token punctuation">&gt;</span></span>

\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId\\</span><span class="token punctuation">&gt;</span></span>io.micrometer\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId\\</span><span class="token punctuation">&gt;</span></span>micrometer-registry-prometheus\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId\\</span><span class="token punctuation">&gt;</span></span>
\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency\\</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们使用Gradle，我们在_build.gradle_文件中包含这些：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>implementation <span class="token string">&#39;org.springframework.boot:spring-boot-starter-actuator&#39;</span>
implementation <span class="token string">&#39;io.micrometer:micrometer-registry-prometheus&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-配置应用程序" tabindex="-1"><a class="header-anchor" href="#_3-2-配置应用程序"><span>3.2. 配置应用程序</span></a></h3><p>添加依赖项后，下一步是**配置我们的Spring Boot应用程序以公开Prometheus指标端点。**这是通过更新项目中的_application.properties_或_application.yml_文件来完成的。</p><p>对于_application.properties_，我们添加：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">management.endpoints.web.exposure.include</span><span class="token punctuation">=</span><span class="token value attr-value">*</span>
<span class="token key attr-name">management.endpoint.health.show.details</span><span class="token punctuation">=</span><span class="token value attr-value">always</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此配置确保执行器的_/actuator/prometheus_端点被公开，以Prometheus可以抓取的格式提供丰富的应用程序指标。</p><p>重要的是<strong>注意，公开所有执行器端点（management.endpoints.web.exposure.include=*）可以在开发期间提供有用的见解，但可能会暴露敏感的操作数据</strong>。对于生产环境，我们最好根据我们的监控和操作需求仔细选择要公开的端点。</p><p>通过遵循这些步骤，我们的Spring Boot应用程序现在将公开Prometheus可以收集和存储的有价值的指标。这个基础设置对我们监控策略的下一阶段至关重要，包括使用Prometheus抓取这些指标并使用Grafana等工具进行可视化。</p><h2 id="_4-设置prometheus抓取指标" tabindex="-1"><a class="header-anchor" href="#_4-设置prometheus抓取指标"><span>4. 设置Prometheus抓取指标</span></a></h2><p>现在我们的应用程序已配置为公开指标，下一步涉及设置Prometheus来收集这些指标。这个过程需要我们下载并配置Prometheus——基于操作系统的详细逐步指南——并调整_prometheus.yml_文件以针对我们的Spring Boot应用程序。</p><h3 id="_4-1-安装" tabindex="-1"><a class="header-anchor" href="#_4-1-安装"><span>4.1. 安装</span></a></h3><p>安装Prometheus非常简单。让我们回顾一下两个最常用的操作系统和Docker的步骤：</p><p>对于Windows：</p><ol><li>从官方Prometheus网站下载最新版本的Prometheus，选择Windows版本。</li><li>将下载的_.zip_文件解压到我们想要的位置，这将作为Prometheus的主目录。</li><li>通过打开命令提示符，导航到Prometheus目录，并执行_prometheus.exe_来运行Prometheus。此操作启动Prometheus服务器。</li></ol><p>对于Linux/Mac：</p><ol><li>从Prometheus下载页面下载Linux或Mac的最新版本。</li><li>使用命令_tar xvfz prometheus-*.tar.gz._解压tarball。</li><li>导航到提取的目录，将其作为Prometheus的主目录。</li><li>通过在终端执行_./prometheus_来启动Prometheus，这将启动Prometheus服务器。</li></ol><p>使用Docker：</p><p>选择Docker部署Prometheus可以简化设置过程，提供一种无论操作系统如何都一致且简化的安装方法。以下是我们如何实现这一点：</p><ol><li><p>拉取Prometheus镜像：首先，我们从Docker Hub拉取官方Prometheus镜像，以确保我们拥有最新版本：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>docker pull prom/prometheus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>运行Prometheus容器：镜像拉取后，我们可以启动一个Prometheus容器。此命令将Prometheus的默认端口（9090）转发到主机上的同一端口，使我们能够通过_http://localhost:9090_访问Prometheus Web UI：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>docker run --name prometheus -d -p 9090:9090 prom/prometheus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>对于需要自定义配置的部署，可以将主机上的自定义_prometheus.yml_文件挂载到容器中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>docker run --name prometheus -d -p 9090:9090 -v /our/path/to/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们将_/our/path/to/prometheus.yml_替换为我们配置文件的实际路。</p></li><li><p>访问Prometheus Web UI：随着Prometheus在Docker容器中积极运行，UI将通过_http://localhost:9090_变得可访问。这个界面对于执行查询、查看收集的指标和验证抓取目标的状态至关重要。</p></li></ol><h3 id="_4-2-配置prometheus抓取指标" tabindex="-1"><a class="header-anchor" href="#_4-2-配置prometheus抓取指标"><span>4.2. 配置Prometheus抓取指标</span></a></h3><p>安装完成后，我们需要配置Prometheus从我们的Spring Boot应用程序抓取指标。这需要编辑位于Prometheus主目录内的_prometheus.yml_记录。</p><p>我们在_scrape_configs_部分下将我们的Spring Boot应用程序作为一个目标添加：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">scrape_configs</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&#39;spring-boot-application&#39;</span>
    <span class="token key atrule">metrics_path</span><span class="token punctuation">:</span> <span class="token string">&#39;/actuator/prometheus&#39;</span>
    <span class="token key atrule">scrape_interval</span><span class="token punctuation">:</span> 15s <span class="token comment"># 这可以根据我们的需求进行调整</span>
    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;localhost:8080&#39;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，_localhost:8080_应该替换为我们的Spring Boot应用程序运行的适当主机和端口。_scrape_interval_指定了Prometheus应该多久从我们的应用程序抓取一次指标。</p><h3 id="_4-3-使用grafana可视化指标" tabindex="-1"><a class="header-anchor" href="#_4-3-使用grafana可视化指标"><span>4.3. 使用Grafana可视化指标</span></a></h3><p>虽然Prometheus擅长收集和存储指标，但Grafana是我们通过富有洞察力的仪表板可视化这些指标的首选工具。</p><p><strong>将Grafana与Prometheus集成：</strong></p><ol><li>通过访问官方Grafana下载页面安装Grafana。</li><li>启动Grafana，并通过在Web浏览器中访问_http://localhost:3000_来访问其Web界面。</li><li>通过在Grafana的UI中导航到_Configuration &gt; Data Sources &gt; Add data source_来将Prometheus添加为数据源。我们选择Prometheus作为类型，并指定Prometheus运行的URL，通常是_http://localhost:9090_。</li><li>保存并测试以确认Grafana可以成功连接到Prometheus。</li></ol><p><strong>在Grafana中创建仪表板：</strong></p><ol><li>通过点击左侧边栏的图标并选择仪表板来创建一个全新的仪表板。</li><li>向仪表板添加一个新面板。在这里，我们选择要显示的指标，决定可视化类型（图表、仪表盘等），并自定义面板的外观。</li><li>选择我们的Prometheus记录源，并使用Prometheus查询语言（PromQL）选择我们希望可视化的指标。例如，要显示HTTP请求的负载，我们将使用像_price(http_requests_total[5m])_这样的查询。</li><li>保存我们的面板和仪表板。我们可以创建尽可能多的面板来可视化我们的Spring Boot应用程序的异常指标。</li></ol><p>按照这些步骤，我们可以设置Prometheus从我们的Spring Boot应用程序抓取指标，并利用Grafana进行可视化。这个设置为我们提供了对应用程序健康状况和整体性能的关键见解。</p><h2 id="_5-高级配置和最佳实践" tabindex="-1"><a class="header-anchor" href="#_5-高级配置和最佳实践"><span>5. 高级配置和最佳实践</span></a></h2><p>本节讨论可以增强我们的Spring Boot应用程序的可观察性和安全性的高级配置。我们将探索在Prometheus中设置警报规则，并使用Micrometer在Spring Boot中创建自定义指标。</p><p>遵循这些最佳实践确保我们的应用程序保持健壮、安全和高可用性。</p><h3 id="_5-1-spring-boot中的自定义指标" tabindex="-1"><a class="header-anchor" href="#_5-1-spring-boot中的自定义指标"><span>5.1. Spring Boot中的自定义指标</span></a></h3><p>Spring Boot与Micrometer的集成为我们提供了一种无缝的方法，将自定义指标添加到我们的应用程序中，使我们能够监控应用程序特定的行为和操作。以下是我们如何创建和注册自定义指标的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomMetricsService</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Counter</span> customMetricCounter<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">CustomMetricsService</span><span class="token punctuation">(</span><span class="token class-name">MeterRegistry</span> meterRegistry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        customMetricCounter <span class="token operator">=</span> <span class="token class-name">Counter</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token string">&quot;custom_metric_name&quot;</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">description</span><span class="token punctuation">(</span><span class="token string">&quot;Description of custom metric&quot;</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">tags</span><span class="token punctuation">(</span><span class="token string">&quot;environment&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;development&quot;</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span>meterRegistry<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">incrementCustomMetric</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        customMetricCounter<span class="token punctuation">.</span><span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
继续翻译：

### <span class="token number">5.2</span><span class="token punctuation">.</span> 监控和警报的最佳实践

让我们回顾一下这项工作的一些最佳实践：

<span class="token operator">-</span> 在<span class="token class-name">Prometheus</span>中设置警报规则：根据应用程序特定的指标和阈值定义警报规则。这种主动的方法有助于在问题影响用户之前识别和解决问题。
<span class="token operator">-</span> 监控业务关键事务：除了系统健康之外，跟踪代表关键业务功能的指标，例如订单完成或支付交易。
<span class="token operator">-</span> 保护对指标的访问：确保指标端点受到保护，以防止未经授权的访问。根据需要使用<span class="token class-name">Spring</span> <span class="token class-name">Security</span>配置访问控制。
<span class="token operator">-</span> 定期审查指标和警报：定期审查配置的指标和警报，以确保它们仍然与操作和业务需求相关。随着应用程序的发展，调整阈值和指标。

通过实施这些高级配置并遵循最佳实践，我们可以实现一个强大的监控和警报设置，这不仅保护了我们的应用程序，还为我们提供了对其性能和使用模式的深入洞察。

## <span class="token number">6.</span> 结论

利用<span class="token class-name">Prometheus</span>和<span class="token class-name">Grafana</span>监控我们的<span class="token class-name">Spring</span> <span class="token class-name">Boot</span>应用程序提供了一种强大的方法来理解应用程序行为并预防潜在问题。本文指导我们建立了一个有效的监控解决方案，提高了我们软件包的可观察性。

通过将这些工具集成到我们的开发和部署工作流程中，我们大大增强了软件包的可靠性和性能。这不仅确保它们满足用户和业务需求，而且还促进了持续改进的文化。

采用<span class="token class-name">Prometheus</span>和<span class="token class-name">Grafana</span>进行跟踪不仅仅是维护工具健康的一种策略。这是迈向主动管理和优化我们的软件包的一步，为持续的成功和增长奠定了基础。

<span class="token constant">OK</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,51),p=[o];function i(r,l){return a(),s("div",null,p)}const d=n(t,[["render",i],["__file","Monitor a Spring Boot App Using Prometheus.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/Archive/Monitor%20a%20Spring%20Boot%20App%20Using%20Prometheus.html","title":"使用Prometheus监控Spring Boot应用 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-14T00:00:00.000Z","category":["Spring Boot","Prometheus"],"tag":["监控","微服务"],"description":"使用Prometheus监控Spring Boot应用 | Baeldung 1. 概述 在软件开发的严格要求世界中，确保应用程序在生产环境中部署后能够最佳且可靠地执行不仅是可取的——这是必需的。使用Spring Boot，开发者可以轻松设置独立、高质量的应用程序。然而，要真正提高性能、可用性和可靠性，集成像Prometheus这样复杂的监控工具是关键...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Monitor%20a%20Spring%20Boot%20App%20Using%20Prometheus.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Prometheus监控Spring Boot应用 | Baeldung"}],["meta",{"property":"og:description","content":"使用Prometheus监控Spring Boot应用 | Baeldung 1. 概述 在软件开发的严格要求世界中，确保应用程序在生产环境中部署后能够最佳且可靠地执行不仅是可取的——这是必需的。使用Spring Boot，开发者可以轻松设置独立、高质量的应用程序。然而，要真正提高性能、可用性和可靠性，集成像Prometheus这样复杂的监控工具是关键..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"监控"}],["meta",{"property":"article:tag","content":"微服务"}],["meta",{"property":"article:published_time","content":"2024-06-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Prometheus监控Spring Boot应用 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-14T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Prometheus是什么？","slug":"_2-prometheus是什么","link":"#_2-prometheus是什么","children":[]},{"level":2,"title":"3. 在Spring Boot中开始使用Prometheus","slug":"_3-在spring-boot中开始使用prometheus","link":"#_3-在spring-boot中开始使用prometheus","children":[{"level":3,"title":"3.1. 添加依赖项","slug":"_3-1-添加依赖项","link":"#_3-1-添加依赖项","children":[]},{"level":3,"title":"3.2. 配置应用程序","slug":"_3-2-配置应用程序","link":"#_3-2-配置应用程序","children":[]}]},{"level":2,"title":"4. 设置Prometheus抓取指标","slug":"_4-设置prometheus抓取指标","link":"#_4-设置prometheus抓取指标","children":[{"level":3,"title":"4.1. 安装","slug":"_4-1-安装","link":"#_4-1-安装","children":[]},{"level":3,"title":"4.2. 配置Prometheus抓取指标","slug":"_4-2-配置prometheus抓取指标","link":"#_4-2-配置prometheus抓取指标","children":[]},{"level":3,"title":"4.3. 使用Grafana可视化指标","slug":"_4-3-使用grafana可视化指标","link":"#_4-3-使用grafana可视化指标","children":[]}]},{"level":2,"title":"5. 高级配置和最佳实践","slug":"_5-高级配置和最佳实践","link":"#_5-高级配置和最佳实践","children":[{"level":3,"title":"5.1. Spring Boot中的自定义指标","slug":"_5-1-spring-boot中的自定义指标","link":"#_5-1-spring-boot中的自定义指标","children":[]}]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":8.93,"words":2678},"filePathRelative":"posts/baeldung/Archive/Monitor a Spring Boot App Using Prometheus.md","localizedDate":"2024年6月14日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在软件开发的严格要求世界中，确保应用程序在生产环境中部署后能够最佳且可靠地执行不仅是可取的——这是必需的。使用Spring Boot，开发者可以轻松设置独立、高质量的应用程序。然而，要真正提高性能、可用性和可靠性，集成像Prometheus这样复杂的监控工具是关键。</p>\\n<p>本教程旨在提供<strong>一个详细的教程，介绍如何将Prometheus与Spring Boot应用程序连接</strong>，通过基本和复杂的配置丰富我们的监控策略。</p>\\n<h2>2. Prometheus是什么？</h2>\\n<p>Prometheus是一个<strong>开源项目，旨在深入挖掘我们的应用程序数据，创建过滤层来收集和分析从最简单的到最复杂的一切</strong>。这不仅仅是关于数字和图表：它是通过其高级查询语言和时间序列数据能力来理解我们应用程序的心跳。</p>","autoDesc":true}');export{d as comp,m as data};
