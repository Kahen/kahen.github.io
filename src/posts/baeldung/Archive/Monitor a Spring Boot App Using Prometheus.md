---
date: 2024-06-14
category:
  - Spring Boot
  - Prometheus
tag:
  - 监控
  - 微服务
---
# 使用Prometheus监控Spring Boot应用 | Baeldung

## 1. 概述

在软件开发的严格要求世界中，确保应用程序在生产环境中部署后能够最佳且可靠地执行不仅是可取的——这是必需的。使用Spring Boot，开发者可以轻松设置独立、高质量的应用程序。然而，要真正提高性能、可用性和可靠性，集成像Prometheus这样复杂的监控工具是关键。

本教程旨在提供**一个详细的教程，介绍如何将Prometheus与Spring Boot应用程序连接**，通过基本和复杂的配置丰富我们的监控策略。

## 2. Prometheus是什么？

Prometheus是一个**开源项目，旨在深入挖掘我们的应用程序数据，创建过滤层来收集和分析从最简单的到最复杂的一切**。这不仅仅是关于数字和图表：它是通过其高级查询语言和时间序列数据能力来理解我们应用程序的心跳。

集成Prometheus使我们能够识别问题发生之前的问题，微调我们的系统，确保我们的应用程序以最佳性能运行，最终意味着为我们的用户带来更好的体验——方便、快速和可靠。

## 3. 在Spring Boot中开始使用Prometheus

将Prometheus与我们的Spring Boot应用程序集成允许我们通过以Prometheus可以理解和抓取的格式公开应用程序指标来有效监控。这个过程涉及两个主要步骤：向我们的项目添加必要的依赖项并配置我们的应用程序以公开指标。

### 3.1. 添加依赖项

要开始，我们向项目的依赖项中添加Spring Boot Actuator和Micrometer Prometheus注册表。**执行器提供了一系列内置端点来显示有关运行中应用程序的性能信息**，例如健康、指标等。**然后，Micrometer Prometheus注册表将这些指标格式化为Prometheus可读的格式。**

让我们将依赖项添加到Maven项目的_pom.xml_文件中：

```xml
\<dependency\>
    \<groupId\>org.springframework.boot\</groupId\>
    \<artifactId\>spring-boot-starter-actuator\</artifactId\>
\</dependency\>

\<dependency\>
    \<groupId\>io.micrometer\</groupId\>
    \<artifactId\>micrometer-registry-prometheus\</artifactId\>
\</dependency\>
```

如果我们使用Gradle，我们在_build.gradle_文件中包含这些：

```groovy
implementation 'org.springframework.boot:spring-boot-starter-actuator'
implementation 'io.micrometer:micrometer-registry-prometheus'
```

### 3.2. 配置应用程序

添加依赖项后，下一步是**配置我们的Spring Boot应用程序以公开Prometheus指标端点。**这是通过更新项目中的_application.properties_或_application.yml_文件来完成的。

对于_application.properties_，我们添加：

```properties
management.endpoints.web.exposure.include=*
management.endpoint.health.show.details=always
```

此配置确保执行器的_/actuator/prometheus_端点被公开，以Prometheus可以抓取的格式提供丰富的应用程序指标。

重要的是**注意，公开所有执行器端点（management.endpoints.web.exposure.include=*）可以在开发期间提供有用的见解，但可能会暴露敏感的操作数据**。对于生产环境，我们最好根据我们的监控和操作需求仔细选择要公开的端点。

通过遵循这些步骤，我们的Spring Boot应用程序现在将公开Prometheus可以收集和存储的有价值的指标。这个基础设置对我们监控策略的下一阶段至关重要，包括使用Prometheus抓取这些指标并使用Grafana等工具进行可视化。

## 4. 设置Prometheus抓取指标

现在我们的应用程序已配置为公开指标，下一步涉及设置Prometheus来收集这些指标。这个过程需要我们下载并配置Prometheus——基于操作系统的详细逐步指南——并调整_prometheus.yml_文件以针对我们的Spring Boot应用程序。

### 4.1. 安装

安装Prometheus非常简单。让我们回顾一下两个最常用的操作系统和Docker的步骤：

对于Windows：

1. 从官方Prometheus网站下载最新版本的Prometheus，选择Windows版本。
2. 将下载的_.zip_文件解压到我们想要的位置，这将作为Prometheus的主目录。
3. 通过打开命令提示符，导航到Prometheus目录，并执行_prometheus.exe_来运行Prometheus。此操作启动Prometheus服务器。

对于Linux/Mac：

1. 从Prometheus下载页面下载Linux或Mac的最新版本。
2. 使用命令_tar xvfz prometheus-*.tar.gz._解压tarball。
3. 导航到提取的目录，将其作为Prometheus的主目录。
4. 通过在终端执行_./prometheus_来启动Prometheus，这将启动Prometheus服务器。

使用Docker：

选择Docker部署Prometheus可以简化设置过程，提供一种无论操作系统如何都一致且简化的安装方法。以下是我们如何实现这一点：

1. 拉取Prometheus镜像：首先，我们从Docker Hub拉取官方Prometheus镜像，以确保我们拥有最新版本：

   ```
   docker pull prom/prometheus
   ```

2. 运行Prometheus容器：镜像拉取后，我们可以启动一个Prometheus容器。此命令将Prometheus的默认端口（9090）转发到主机上的同一端口，使我们能够通过_http://localhost:9090_访问Prometheus Web UI：

   ```
   docker run --name prometheus -d -p 9090:9090 prom/prometheus
   ```

   对于需要自定义配置的部署，可以将主机上的自定义_prometheus.yml_文件挂载到容器中：

   ```
   docker run --name prometheus -d -p 9090:9090 -v /our/path/to/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
   ```

   我们将_/our/path/to/prometheus.yml_替换为我们配置文件的实际路。

3. 访问Prometheus Web UI：随着Prometheus在Docker容器中积极运行，UI将通过_http://localhost:9090_变得可访问。这个界面对于执行查询、查看收集的指标和验证抓取目标的状态至关重要。

### 4.2. 配置Prometheus抓取指标

安装完成后，我们需要配置Prometheus从我们的Spring Boot应用程序抓取指标。这需要编辑位于Prometheus主目录内的_prometheus.yml_记录。

我们在_scrape_configs_部分下将我们的Spring Boot应用程序作为一个目标添加：

```yaml
scrape_configs:
  - job_name: 'spring-boot-application'
    metrics_path: '/actuator/prometheus'
    scrape_interval: 15s # 这可以根据我们的需求进行调整
    static_configs:
      - targets: ['localhost:8080']
```

这里，_localhost:8080_应该替换为我们的Spring Boot应用程序运行的适当主机和端口。_scrape_interval_指定了Prometheus应该多久从我们的应用程序抓取一次指标。

### 4.3. 使用Grafana可视化指标

虽然Prometheus擅长收集和存储指标，但Grafana是我们通过富有洞察力的仪表板可视化这些指标的首选工具。

**将Grafana与Prometheus集成：**

1. 通过访问官方Grafana下载页面安装Grafana。
2. 启动Grafana，并通过在Web浏览器中访问_http://localhost:3000_来访问其Web界面。
3. 通过在Grafana的UI中导航到_Configuration \> Data Sources \> Add data source_来将Prometheus添加为数据源。我们选择Prometheus作为类型，并指定Prometheus运行的URL，通常是_http://localhost:9090_。
4. 保存并测试以确认Grafana可以成功连接到Prometheus。

**在Grafana中创建仪表板：**

1. 通过点击左侧边栏的图标并选择仪表板来创建一个全新的仪表板。
2. 向仪表板添加一个新面板。在这里，我们选择要显示的指标，决定可视化类型（图表、仪表盘等），并自定义面板的外观。
3. 选择我们的Prometheus记录源，并使用Prometheus查询语言（PromQL）选择我们希望可视化的指标。例如，要显示HTTP请求的负载，我们将使用像_price(http_requests_total[5m])_这样的查询。
4. 保存我们的面板和仪表板。我们可以创建尽可能多的面板来可视化我们的Spring Boot应用程序的异常指标。

按照这些步骤，我们可以设置Prometheus从我们的Spring Boot应用程序抓取指标，并利用Grafana进行可视化。这个设置为我们提供了对应用程序健康状况和整体性能的关键见解。

## 5. 高级配置和最佳实践

本节讨论可以增强我们的Spring Boot应用程序的可观察性和安全性的高级配置。我们将探索在Prometheus中设置警报规则，并使用Micrometer在Spring Boot中创建自定义指标。

遵循这些最佳实践确保我们的应用程序保持健壮、安全和高可用性。

### 5.1. Spring Boot中的自定义指标

Spring Boot与Micrometer的集成为我们提供了一种无缝的方法，将自定义指标添加到我们的应用程序中，使我们能够监控应用程序特定的行为和操作。以下是我们如何创建和注册自定义指标的方法：

```java
@Component
public class CustomMetricsService {

    private final Counter customMetricCounter;

    public CustomMetricsService(MeterRegistry meterRegistry) {
        customMetricCounter = Counter.builder("custom_metric_name")
          .description("Description of custom metric")
          .tags("environment", "development")
          .register(meterRegistry);
    }

    public void incrementCustomMetric() {
        customMetricCounter.increment();
继续翻译：

### 5.2. 监控和警报的最佳实践

让我们回顾一下这项工作的一些最佳实践：

- 在Prometheus中设置警报规则：根据应用程序特定的指标和阈值定义警报规则。这种主动的方法有助于在问题影响用户之前识别和解决问题。
- 监控业务关键事务：除了系统健康之外，跟踪代表关键业务功能的指标，例如订单完成或支付交易。
- 保护对指标的访问：确保指标端点受到保护，以防止未经授权的访问。根据需要使用Spring Security配置访问控制。
- 定期审查指标和警报：定期审查配置的指标和警报，以确保它们仍然与操作和业务需求相关。随着应用程序的发展，调整阈值和指标。

通过实施这些高级配置并遵循最佳实践，我们可以实现一个强大的监控和警报设置，这不仅保护了我们的应用程序，还为我们提供了对其性能和使用模式的深入洞察。

## 6. 结论

利用Prometheus和Grafana监控我们的Spring Boot应用程序提供了一种强大的方法来理解应用程序行为并预防潜在问题。本文指导我们建立了一个有效的监控解决方案，提高了我们软件包的可观察性。

通过将这些工具集成到我们的开发和部署工作流程中，我们大大增强了软件包的可靠性和性能。这不仅确保它们满足用户和业务需求，而且还促进了持续改进的文化。

采用Prometheus和Grafana进行跟踪不仅仅是维护工具健康的一种策略。这是迈向主动管理和优化我们的软件包的一步，为持续的成功和增长奠定了基础。

OK
