---
date: 2023-06-03
category:
  - Apache JMeter
  - 性能测试
tag:
  - JMeter
  - 命令行
  - 性能测试
head:
  - - meta
    - name: keywords
      content: Apache JMeter, 命令行, 性能测试, JMX, JTL
---
# Apache JMeter 命令行使用指南

Apache JMeter 是一个开源的基于 Java 的应用程序，旨在分析和测量 Web 应用程序的性能。它基本上是一种应用程序，我们可以使用它来测试和分析服务器在不同负载条件下的整体性能。

JMeter 提供了一个易于使用的 GUI，我们可以使用它来定义、执行和查看各种负载测试的报告。它还支持非 GUI 模式，我们可以在命令行界面中运行脚本。

在本教程中，我们将学习如何从命令行运行 JMeter JMX 文件的同时配置报告文件。

## 2. 设置

在我们开始之前，让我们设置一个我们将在整个演示中使用的 JMeter 脚本。为了模拟一些 API，我们将使用 Postman Echo 提供的示例 REST 端点。

首先，我们将在 JMeter 中创建一个带有线程组的《测试计划》。其次，我们将向线程组添加一个 HTTP 请求采样器，该采样器使用 Postman Echo 服务提供的模拟端点。最后，我们将向线程组添加一个《摘要报告》监听器，该监听器为我们的测试运行生成摘要。

让我们详细看看这些步骤。

### 2.1. 创建 JMeter 测试计划和线程组

我们将使用 JMeter GUI 设置我们的《测试计划》。首先，让我们向《测试计划》添加一个线程组：

![img](https://www.baeldung.com/wp-content/uploads/2023/06/jmeter-thread-group.jpg)

进一步，让我们配置线程组使用五个线程，有一个一秒钟的启动期，循环计数为 10：

![img](https://www.baeldung.com/wp-content/uploads/2023/06/jmeter-thread-group-config-1.png)

### 2.2. 配置 HTTP 请求采样器

现在，让我们在这个线程组内创建一个 HTTP 请求采样器：

![img](https://www.baeldung.com/wp-content/uploads/2023/06/jmeter-http-request-sampler.png)

让我们配置 HTTP 采样器使用 Postman Echo 服务提供的 GET 端点：

![img](https://www.baeldung.com/wp-content/uploads/2023/06/jmeter-http-request-config.png)

### 2.3. 配置摘要报告监听器

最后，让我们向线程组添加一个摘要报告监听器，该监听器总结了我们的测试计划的结果：

![img](https://www.baeldung.com/wp-content/uploads/2023/06/jmeter-summary-report.png)

有了这个，我们的基本 JMeter 脚本就准备好了。让我们在 GUI 中运行这个脚本，看看生成的《摘要报告》：

![img](https://www.baeldung.com/wp-content/uploads/2023/06/jmeter-summary-report-result-1.png)

显然，在运行 JMeter 脚本后，我们能够成功地为我们的测试配置生成摘要报告。我们将此保存为“Summary-Report.jmx”，并使用它从命令行运行测试。

到目前为止，我们有一个带有《测试计划》的示例 JMX 文件，该计划配置为运行具有示例模拟 API 的测试。

正如已经提到的，JMeter JMX 文件可以在非 GUI 模式下使用命令行界面运行。我们使用带有选项的 _jmeter_ 命令从 CLI 运行 JMeter 脚本文件。这个命令可以通过更改目录到 JMeter 安装路径内的 _bin_ 目录来运行。

让我们看看运行我们的“Summary-Report.jmx”文件并生成测试报告的 CLI 命令：

```
$ jmeter -n -t Summary-Report.jmx -l Summary-Report.jtl
```

运行上述命令在 CLI 上产生以下输出：

```
Creating summariser `<summary>`
Created the tree successfully using /Users/baeldung/Summary-Report.jmx
Starting standalone test @ 2023 Jun 3 13:32:11 IST (1685779331706)
Waiting for possible Shutdown/StopTestNow/HeapDump/ThreadDump message on port 4445
summary = 50 in 00:00:08 = 6.6/s Avg: 499 Min: 193 Max: 3601 Err: 0 (0.00%)
Tidying up ... @ 2023 Jun 3 13:32:19 IST (1685779339273)
... end of run
```

该命令基本上运行我们的测试文件“Summary-Report.jmx”并生成“Summary-Report.jtl”文件中的摘要报告。

JMeter CLI 提供了多个选项，以便配置脚本的运行方式。我们使用这些参数来覆盖在 JMX 文件中设置的参数。让我们看看我们在脚本中使用的一些选项：

- _-n_: 指定 JMeter 在非 GUI 模式下运行
- _-t_: 指定包含《测试计划》的 JMX 文件的位置
- _-l_: 指定 JTL（JMeter 测试日志）文件的位置

进一步，让我们看看“Summary-Report.jtl”文件内容的前几行：

```
timeStamp,elapsed,label,responseCode,responseMessage,threadName,dataType,success,failureMessage,bytes,sentBytes,grpThreads,allThreads,URL,Latency,IdleTime,Connect
1685779331808,978,HTTP Request,200,OK,Thread Group 1-1,text,true,,681,143,5,5,https://postman-echo.com/get?foo1=bar1&foo2=bar2,974,0,780
1685779331959,827,HTTP Request,200,OK,Thread Group 1-2,text,true,,679,143,5,5,https://postman-echo.com/get?foo1=bar1&foo2=bar2,823,0,625
1685779332163,786,HTTP Request,200,OK,Thread Group 1-3,text,true,,681,143,5,5,https://postman-echo.com/get?foo1=bar1&foo2=bar2,785,0,589
1685779332787,194,HTTP Request,200,OK,Thread Group 1-2,text,true,,681,143,5,5,https://postman-echo.com/get?foo1=bar1&foo2=bar2,194,0,0
```

我们可以看到生成的 JTL 文件以 CSV 格式包含了每个 API 请求的详细信息。

## 4. 配置 JMeter 摘要报告

我们可以自定义摘要报告中显示的参数以及它们的格式化选项。有两种方法可以自定义摘要报告：

- 更新 JMeter 属性
- 将参数作为命令行选项传递

让我们详细看看这些方法。

### 4.1. 配置 JMeter 属性

JMeter 属性文件“jmeter.properties”位于 JMeter 安装目录的 _bin_ 目录内。与摘要报告相关的属性在属性文件中以“jmeter.save.saveservice.”前缀开头：

```
#jmeter.save.saveservice.output_format=csv
#jmeter.save.saveservice.response_code=true
#jmeter.save.saveservice.latency=true
```

默认情况下，这些属性是注释掉的，我们可以取消注释它们来设置它们的值。让我们取消注释一些属性并更新它们的值：

```
jmeter.save.saveservice.response_code=false
jmeter.save.saveservice.latency=false
jmeter.save.saveservice.output_format=xml
```

现在重新运行 JMeter 脚本，生成以下结果：

```
`<?xml version="1.0" encoding="UTF-8"?>`
`<testResults version="1.2">`
`<httpSample t="801" it="0" ct="593" ts="1685791090172" s="true" lb="HTTP Request" rm="OK" tn="Thread Group 1-3" dt="text" by="679" sby="143" ng="5" na="5">`
  ``<java.net.URL>``https://postman-echo.com/get?foo1=bar1&foo2=bar2``</java.net.URL>``
``</httpSample>``
`<httpSample t="1004" it="0" ct="782" ts="1685791089969" s="true" lb="HTTP Request" rm="OK" tn="Thread Group 1-2" dt="text" by="679" sby="143" ng="5" na="5">`
  ``<java.net.URL>``https://postman-echo.com/get?foo1=bar1&foo2=bar2``</java.net.URL>``
``</httpSample>``
`</testResults>`
```

输出格式现在是 XML 形式，从结果中可以看到。此外，我们观察到响应代码和延迟字段现在不在输出中产生。

### 4.2. 作为 CLI 选项的 JMeter 属性

**我们可以通过将它们作为选项通过命令行传递来覆盖在“jmeter.properties”文件中设置的属性**：

```
$ jmeter -Jjmeter.save.saveservice.output_format=csv -n -t Summary-Reportjmx -l Summary-Report.jtl
```

这里，**我们使用 _-J_ 选项来传递并覆盖在运行测试脚本时的任何现有 JMeter 属性**。

该命令现在生成以下结果：

```
timeStamp,elapsed,label,responseMessage,threadName,dataType,success,failureMessage,bytes,sentBytes,grpThreads,allThreads,URL,IdleTime,Connect
1685792003144,961,HTTP Request,OK,Thread Group 1-1,text,true,,685,143,5,5,https://postman-echo.com/get?foo1=bar1&foo2=bar2,0,741
1685792003306,799,HTTP Request,OK,Thread Group 1-2,text,true,,681,143,5,5,https://postman-echo.com/get?foo1=bar1&foo2=bar2,0,599
1685792004106,200,HTTP Request,OK,Thread Group 1-2,text,true,,681,143,5,5,https://postman-echo.com/get?foo1=bar1&foo2=bar2,0,0
```

因此，我们已经成功地通过将参数作为 CLI 选项传递，将输出格式从 XML 覆盖为 CSV。

## 5. 结论

在本文中，我们学习了如何从命令行运行 JMeter JMX 文件并配置摘要报告文件。

首先，我们看了如何使用 _jmeter_ 命令及其一些选项来运行 JMX 文件。然后，我们看到了如何通过在 _jmeter.properties_ 文件中配置属性来配置摘要报告。最后，我们讨论了如何通过将它们作为选项通过命令行传递来覆盖这些属性。

像往常一样，我们所有示例的 JMeter 脚本都可以在 GitHub 上找到。
OK