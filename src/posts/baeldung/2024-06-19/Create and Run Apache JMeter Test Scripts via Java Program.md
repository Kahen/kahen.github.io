---
date: 2024-06-19
category:
  - Java
  - JMeter
tag:
  - 性能测试
  - 自动化测试
head:
  - - meta
    - name: keywords
      content: JMeter, Java, 性能测试, 自动化测试
---
# 通过Java程序创建并运行Apache JMeter测试脚本

Apache JMeter是一个开源的基于Java的应用程序，旨在分析和衡量Web应用程序的性能。它允许测试人员模拟对服务器、网络或对象的重负载，以分析不同负载下的总体性能。JMeter提供了一个易于使用的GUI，用于定义、执行和查看各种负载测试的报告。

尽管JMeter提供了一个用户友好的GUI来创建和执行测试脚本，但在某些情况下，利用Java编程进行自动化可能更有益，特别是在持续集成和部署流程中。

在本教程中，我们将探讨如何使用Java以编程方式创建和执行Apache JMeter测试脚本，并提供一个实际示例来说明所涉及的步骤。

## 2. **设置环境**

在我们开始编码之前，让我们确保所需的环境已经设置好。要安装JMeter，我们可以从JMeter网站下载。JMeter与Java 8或更高版本兼容。或者，在macOS上，我们可以使用Homebrew使用以下命令安装JMeter：

```shell
brew install jmeter
```

我们还需要配置我们的Java项目以包含JMeter属性。对于Maven项目，在_pom.xml_文件中添加以下依赖：

```xml
``<dependency>``
    ``<groupId>``org.apache.jmeter``</groupId>``
    ``<artifactId>``ApacheJMeter_core``</artifactId>``
    ``<version>``5.6.3``</version>``
``</dependency>``
``<dependency>``
    ``<groupId>``org.apache.jmeter``</groupId>``
    ``<artifactId>``ApacheJMeter_http``</artifactId>``
    ``<version>``5.6.3``</version>``
``</dependency>``
```

这些依赖项包括Apache JMeter的核心功能和HTTP组件。它们为在JMeter测试计划中创建和运行JMeter测试计划、发送HTTP请求以及处理HTTP响应提供了必要的类和实用工具。

## 3. 创建测试脚本和环境变量文件

我们将生成一个简单的测试脚本，以模拟对指定URL或应用程序的HTTP GET请求。此脚本的主要目的是对指定的目标应用程序执行负载测试，本例中为_https://www.google.com_。

它将通过发送多个并发请求来模拟对提供的URL的真正负载，使我们能够评估应用程序在不同负载级别下的性能。在下面的脚本中，我们首先检查_JMETER_HOME_环境变量以定位JMeter安装目录。

验证后，我们初始化JMeter引擎_StandardJMeterEngine_并创建测试计划_TestPlan_。以下是实现此目的的Java代码：

```java
@Test
void givenJMeterScript_whenUsingCode_thenExecuteViaJavaProgram() throws IOException {
    String jmeterHome = System.getenv("JMETER_HOME");
    if (jmeterHome == null) {
        throw new RuntimeException("JMETER_HOME environment variable is not set.");
    }

    String file = Objects.requireNonNull(JMeterLiveTest.class.getClassLoader().getResource("jmeter.properties")).getFile();
    JMeterUtils.setJMeterHome(jmeterHome);
    JMeterUtils.loadJMeterProperties(file);
    JMeterUtils.initLocale();

    StandardJMeterEngine jmeter = new StandardJMeterEngine();

    HTTPSamplerProxy httpSampler = getHttpSamplerProxy();

    LoopController loopController = getLoopController();

    ThreadGroup threadGroup = getThreadGroup(loopController);

    TestPlan testPlan = getTestPlan(threadGroup);

    HashTree testPlanTree = new HashTree();
    HashTree threadGroupHashTree = testPlanTree.add(testPlan, threadGroup);
    threadGroupHashTree.add(httpSampler);

    SaveService.saveTree(testPlanTree, Files.newOutputStream(Paths.get("script.jmx")));
    Summariser summer = null;
    String summariserName = JMeterUtils.getPropDefault("summariser.name", "summary");
    if (summariserName.length() > 0) {
        summer = new Summariser(summariserName);
    }

    String logFile = "output-logs.jtl";
    ResultCollector logger = new ResultCollector(summer);
    logger.setFilename(logFile);
    testPlanTree.add(testPlanTree.getArray()[0], logger);

    jmeter.configure(testPlanTree);
    jmeter.run();

    System.out.println("Test completed. See output-logs.jtl file for results");
    System.out.println("JMeter .jmx script is available at script.jmx");
}
```

在下面的_getLoopController()_方法中，循环控制器规定了迭代或循环的次数。在这种情况下，我们将循环控制器配置为只执行一次测试计划：

```java
private static LoopController getLoopController() {
    LoopController loopController = new LoopController();
    loopController.setLoops(1);
    loopController.setFirst(true);
    loopController.setProperty(TestElement.TEST_CLASS, LoopController.class.getName());
    loopController.setProperty(TestElement.GUI_CLASS, LoopControlPanel.class.getName());
    loopController.initialize();
    return loopController;
}
```

_getThreadGroup()_方法定义了一个名为“Sample Thread Group”的线程组，指定了要模拟的虚拟用户/线程的数量和启动期间。此组中的每个线程代表一个虚拟用户向目标URL发出请求。“Sample Thread Group”包含10个线程（虚拟用户），并在5秒的间隔内逐渐启动：

```java
private static ThreadGroup getThreadGroup(LoopController loopController) {
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setName("Sample Thread Group");
    threadGroup.setNumThreads(10);
    threadGroup.setRampUp(5);
    threadGroup.setSamplerController(loopController);
    threadGroup.setProperty(TestElement.TEST_CLASS, ThreadGroup.class.getName());
    threadGroup.setProperty(TestElement.GUI_CLASS, ThreadGroupGui.class.getName());
    return threadGroup;
}
```

接下来，在_getHttpSamplerProxy()_方法中，我们创建了一个HTTP采样器_HTTPSamplerProxy_，以向目标URL（https://www.google.com）发送HTTP GET请求。我们使用域、路径和请求方法配置了采样器：

```java
private static HTTPSamplerProxy getHttpSamplerProxy() {
    HTTPSamplerProxy httpSampler = new HTTPSamplerProxy();
    httpSampler.setDomain("www.google.com");
    httpSampler.setPort(80);
    httpSampler.setPath("/");
    httpSampler.setMethod("GET");
    httpSampler.setProperty(TestElement.TEST_CLASS, HTTPSamplerProxy.class.getName());
    httpSampler.setProperty(TestElement.GUI_CLASS, HttpTestSampleGui.class.getName());
    return httpSampler;
}
```

我们通过将线程组和HTTP采样器添加到_HashTree_来构建测试计划：

```java
private static TestPlan getTestPlan(ThreadGroup threadGroup) {
    TestPlan testPlan = new TestPlan("Sample Test Plan");
    testPlan.setProperty(TestElement.TEST_CLASS, TestPlan.class.getName());
    testPlan.setProperty(TestElement.GUI_CLASS, TestPlanGui.class.getName());
    testPlan.addThreadGroup(threadGroup);
    return testPlan;
}
```

最后，我们使用测试计划树配置JMeter引擎，并调用run方法执行测试。

**此脚本概述了一个负载配置文件，模拟了10个并发用户在5秒内逐渐启动。每个用户向目标URL发起一个单一的HTTP GET请求。负载保持一致，因为没有额外的配置用于多次迭代。**

_jmeter.properties_文件用作Apache JMeter使用的配置文件，用于定义测试执行的各种设置和参数。在此文件中，下面的属性指定了在完成测试执行后保存测试结果的格式：

```properties
jmeter.save.saveservice.output_format=xml
```

## 4. 理解输出文件

我们将测试计划保存为与JMeter GUI兼容的.jmx文件格式的_script.jmx_。此外，我们配置了一个_Summarizer_来收集和总结测试结果。此外，还建立了一个结果收集器，将结果存储在名为_output-logs.jtl_的.jtl文件中。

### 4.1. 理解 .jtl 文件

_output-logs.jtl_文件的内容如下：

```xml
``<?xml version="1.0" encoding="UTF-8"?>``
`<testResults version="1.2">`
    `<httpSample t="354" it="0" lt="340" ct="37" ts="1711874302012" s="true" lb="" rc="200" rm="OK" tn="Sample Thread Group 1-1" dt="text" by="22388" sby="111" ng="1" na="1">`
        ````<java.net.URL>````http://www.google.com/````</java.net.URL>````
    ````</httpSample>````
    `<httpSample t="351" it="0" lt="317" ct="21" ts="1711874302466" s="true" lb="" rc="200" rm="OK" tn="Sample Thread Group 1-2" dt="text" by="22343" sby="111" ng="1" na="1">`
        ````<java.net.URL>````http://www.google.com/````</java.net.URL>````
    ````</httpSample>````
    `<httpSample t="410" it="0" lt="366" ct="14" ts="1711874303024" s="true" lb="" rc="200" rm="OK" tn="SampleThread Group 1-3" dt="text" by="22398" sby="111" ng="1" na="1">`
        ````<java.net.URL>````http://www.google.com/````</java.net.URL>````
    ````</httpSample>````
    `<httpSample t="363" it="0" lt="344" ct="19" ts="1711874303483" s="true" lb="" rc="200" rm="OK" tn="Sample Thread Group 1-4" dt="text" by="22367" sby="111" ng="1" na="1">`
        ````<java.net.URL>````http://www.google.com/````</java.net.URL>````
    ````</httpSample>````
`</testResults>`
```

输出包含``<httpSample>``元素，表示测试期间发出的HTTP请求，并包含与该请求相关的各种属性和元数据。让我们分解这些属性：

- `t` - 样本执行所需的总时间，以毫秒为单位
- `it` - 空闲时间，即等待响应的时间
- `lt` - 延迟，即请求到达服务器并返回的时间，不包括空闲时间
- `ct` - 连接时间，即与服务器建立连接所需的时间
- `ts` - 执行样本的时间戳，以毫秒表示，自纪元以来
- `s` - 表示样本是否成功（true）或失败（false）
- `lb` - 与样本关联的标签，通常是采样器名称
- `rc` - 服务器返回的HTTP响应代码
- `rm` - 与响应代码相关联的响应消息
- `tn` - 执行样本的线程名称
- `dt` - 样本返回的数据类型（例如，文本、二进制）
- `by` - 响应体中接收到的字节数
- `sby` - 请求中发送的字节数
- `ng/na` - 线程组/所有线程组中的活动线程数

这些数据对于分析测试下的系统性能、识别瓶颈和优化应用程序性能至关重要。

### 4.2. 理解 .jmx 文件

.jmx文件以XML格式表示JMeter测试计划配置。_script.jmx_文件的内容如下：

```xml
``<?xml version="1.0" encoding="UTF-8"?>``
`<jmeterTestPlan version="1.2" properties="5.0" jmeter="5.4.1">`
    ```<org.apache.jorphan.collections.HashTree>```
        `<TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="Sample Test Plan"/>`
        ```<org.apache.jorphan.collections.HashTree>```
            `<ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="Sample Thread Group">`
                `<intProp name="ThreadGroup.num_threads">`10````</intProp>````
                `<intProp name="ThreadGroup.ramp_time">`5````</intProp>````
                `<elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControlPanel" testclass="LoopController">`
                    `<boolProp name="LoopController.continue_forever">`false`</boolProp>`
                    `<intProp name="LoopController.loops">`1````</intProp>````
                ``</elementProp>``
            `</ThreadGroup>`
            ```<org.apache.jorphan.collections.HashTree>```
                `<HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy">`
                    `<elementProp name="HTTPsampler.Arguments" elementType="Arguments">`
                        `<collectionProp name="Arguments.arguments"/>`
                    ``</elementProp>``
                    `<stringProp name="HTTPSampler.domain">`www.google.com```</stringProp>```
                    `<intProp name="HTTPSampler.port">`80````</intProp>````
                    `<stringProp name="HTTPSampler.path">`/```</stringProp>```
                    `<stringProp name="HTTPSampler.method">`GET```</stringProp>```
                `</HTTPSamplerProxy>`
                `<org.apache.jorphan.collections.HashTree/>`
            ```</org.apache.jorphan.collections.HashTree>```
        ```</org.apache.jorphan.collections.HashTree>```
    ```</org.apache.jorphan.collections.HashTree>```
`</jmeterTestPlan>`
```

测试计划在``<jmeterTestPlan>``元素内定义。测试计划内，``<ThreadGroup>``元素描述了将执行测试场景的虚拟用户或线程组。这包括线程数量和启动时间等细节。

线程组由控制器协调，例如``<LoopController>``元素，它管理执行流程，确定循环次数以及是否应无限期地继续执行。

要发送的实际HTTP请求由``<HTTPSampleProxy>``元素表示，每个元素都详细说明了域、端口、路径和HTTP方法等信息。这些元素共同构成了在JMeter框架内协调性能测试的全面蓝图。它使得模拟用户与Web服务器的交互以及随后分析服务器响应成为可能。

## 5. 结论

在本文中，我们展示了如何使用JMeter Java API以编程方式创建和执行Apache JMeter测试脚本。使用这种方法，开发人员可以自动化性能测试，并将其无缝集成到他们的开发工作流程中。

它有助于高效地测试Web应用程序，帮助在开发周期的早期识别和解决性能瓶颈。

如常，本文的源代码可以在GitHub上找到。

评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。

OK