---
date: 2023-02-01
category:
  - JMeter
  - 性能测试
tag:
  - JMeter
  - 性能测试
  - 报告
head:
  - - meta
    - name: keywords
      content: JMeter, 性能测试, 报告, 仪表板
---

# 如何在JMeter中生成仪表板报告

在本教程中，我们将探索JMeter仪表板报告的生成。JMeter是一个用Java编写的流行测试工具。我们使用JMeter进行负载测试、性能测试和压力测试。除了生成丰富的统计数据外，一个重要特性是将测试结果以有用的可视化格式显示出来。JMeter正是这样做的，它允许我们除了生成多种格式的文本报告外，还能生成仪表板报告。

## 1. 概述

## 2. 先决条件

我们需要一个带有JMeter maven插件的Spring Boot应用程序。我们已经设置了一个带有三个端点的示例Spring Boot MVC应用程序。这些端点返回问候消息、每日引用和服务器时间。这就是我们运行JMeter测试并生成仪表板报告所需的全部。

## 3. 运行JMeter测试

现在，让我们看看针对我们的应用程序端点运行JMeter测试。

### 3.1. 创建JMeter测试计划

**使用JMeter GUI，我们将生成一个JMeter测试计划。**

让我们通过JMeter GUI创建一个名为_ReportsDashboardExample.jmx_的测试计划：

```plaintext
${project.basedir}/src/main/resources/dashboard/ReportsDashboardExample.jmx
```

除了将我们的测试计划保存在文件中，我们还可以将现有的测试计划重新加载到我们的JMeter GUI中。此外，我们可以根据需要审查和更新它。在我们的例子中，我们有一个非常简单的测试计划，这足以满足我们的演示目的。

当我们执行我们的测试计划_ReportsDashboardExample.jmx_时，它会将测试结果生成到一个CSV文件_ReportsDashboardExample.csv_中。

接下来，让我们生成JMeter仪表板报告。JMeter使用我们在_ReportsDashboardExample.csv_文件中可用的测试结果来生成仪表板报告。

### 3.2. 配置JMeter Maven插件

JMeter Maven插件的配置非常重要：

```xml
``<configuration>``
    `<testFilesDirectory>`${project.basedir}/src/main/resources/dashboard`</testFilesDirectory>`
    `<resultsDirectory>`${project.basedir}/src/main/resources/dashboard`</resultsDirectory>`
    `<generateReports>`true`</generateReports>`
    `<ignoreResultFailures>`true`</ignoreResultFailures>`
    `<testResultsTimestamp>`false`</testResultsTimestamp>`
``</configuration>``
```

将_generateReports_元素设置为_true_指示插件生成仪表板报告。JMeter默认在_target/jmeter_目录下生成报告。然而，我们也可以覆盖默认行为。

### 3.3. 生成仪表板报告

**为了运行JMeter测试，我们创建了一个名为_dashboard_的Maven配置文件。**将环境变量'_env'设置为'_dash'值可以映射并激活仪表板配置文件：

```xml
`<profile>`
    ````<id>````dashboard````</id>````
    `<activation>`
        `<property>`
            `<name>`env`</name>`
            `<value>`dash`</value>`
        `</property>`
    `</activation>`
`</profile>`
```

使用此配置文件运行我们代码的Maven命令是：

```shell
mvn clean install -Denv=dash
```

尽管我们可以更改全局设置，但设置单独的配置文件可以隔离我们的特定依赖项、插件和配置。这使我们能够避免触及我们的_pom.xml_中的其他配置文件和全局部分。

### 3.4. 查看仪表板报告

在测试运行期间，生成的日志除了其他信息外，还提供了报告的目标路径：

```plaintext
[INFO] Will generate HTML report in [PATH_TO_REPORT]
```

打开此路径中的_index.html_，我们将获得仪表板视图：

![仪表板截图](https://www.baeldung.com/wp-content/uploads/2023/02/dashboard-300x295.jpg)

此仪表板以漂亮的格式为我们的三个端点的统计数据提供了视图。相应图表支持我们的表格数据。饼图全部是绿色的，这表明我们所有的测试都是成功的。然而，我们也可以引入一些错误使其更加真实。例如，我们可以创建一个指向不存在端点的_HTTP Request Sampler_。因此，这也会引入饼图中的红色区域。

这结束了我们的仪表板报告生成练习。接下来，我们来看看我们的项目配置。

## 4. Maven目标

我们的目标之一是在测试环境中运行一个示例应用程序。因此，我们的JMeter测试能够使用我们本地测试环境中的目标端点。让我们深入了解相应的_pom.xml_配置。

### 4.1. Spring Boot Maven插件

在我们的情况下，我们希望Maven目标以守护进程的方式运行Spring Boot应用程序。因此，我们使用来自_spring-boot-maven-plugin_的_start_和_stop_目标。此外，这两个目标包装了JMeter Maven插件的目标。

Spring Boot Maven插件_start_目标保持web服务器运行，直到我们停止它：

```xml
```<execution>```
    ````<id>````launch-web-app````</id>````
    ```<goals>```
        ````<goal>````start````</goal>````
    ```</goals>```
    ``<configuration>``
        `<mainClass>`com.baeldung.dashboard.DashboardApplication`</mainClass>`
    ``</configuration>``
```</execution>```
```

我们Maven配置文件中的最后一个目标是相应的_stop_目标：

```xml
```<execution>```
    ````<id>````stop-web-app````</id>````
    ```<goals>```
        ````<goal>````stop````</goal>````
    ```</goals>```
```</execution>```
```

### 4.2. JMeter Maven插件

我们在Spring Boot _start_和_stop_目标之间包装了JMeter Maven插件的目标。我们希望在JMeter测试完成执行时保持Spring Boot应用程序的运行。我们的_pom.xml_文件定义了来自_jmeter-maven-plugin_的_configure_、_jmeter_和_results_目标。此外，具有_id_为_jmeter-tests_的执行执行了两个目标：_jmeter_目标和_results_目标：

```xml
```<execution>```
    ````<id>````jmeter-tests````</id>````
    ```<goals>```
        ````<goal>````jmeter````</goal>````
        ````<goal>````results````</goal>````
    ```</goals>```
```</execution>```
```

**在某些情况下，如果发生错误，最后一个停止服务器的目标可能无法执行，导致web服务器永久运行。然而，我们可以手动停止web服务器。我们将不得不找出我们的Spring Boot应用程序的进程ID，然后从我们的命令行或Bash shell手动杀死进程。**

## 5. 结论

在本文中，我们学习了JMeter仪表板报告的生成。获取可视化报告总是比纯文本更有用、更高效、更容易分析数据的方式。

在我们的例子中，我们使用JMeter来测试web端点。JMeter还涵盖了其他用例。一些例子包括测试RESTful服务、数据库和消息服务。

我们还可以添加断言来创建通过/失败标准。JMeter GUI提供了一个更简单的界面来构建您的测试计划。然而，在生产中，我们使用JMeter的非GUI模式，因为GUI模式资源密集。

我们还可以使用一组资源来运行我们的JMeter测试，以获得更大的负载。这是JMeter大规模测试的典型配置。

如往常一样，文章示例的源代码可以在GitHub上找到。

OK