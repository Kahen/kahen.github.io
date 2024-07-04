---
date: 2023-06-22
category:
  - Java
  - Gatling
tag:
  - HTTP响应体
  - 负载测试
head:
  - - meta
    - name: keywords
      content: Gatling, HTTP响应体, 负载测试, Scala, Maven插件, 性能测试
------
# 如何在Gatling中显示完整的HTTP响应体

Gatling是一个用Scala编写的流行负载测试工具，可以帮助我们在本地和云机器上创建高性能、压力和负载测试。此外，它广泛用于测试HTTP服务器。默认情况下，Gatling专注于捕获和分析性能指标，如响应时间、错误率等，而不显示完整的HTTP响应体。

在本教程中，我们将学习如何在Gatling中显示完整的HTTP响应体。这对于在负载测试期间理解和调试服务器响应非常有用。

## 2. 项目设置

在本教程中，我们将使用Gatling Maven插件来运行Gatling脚本。为此，我们需要将插件添加到_pom.xml_：

```xml
`<plugin>`
    ```<groupId>```io.gatling```</groupId>```
    ```<artifactId>```gatling-maven-plugin```</artifactId>```
    ```<version>```4.3.0```</version>```
    `<configuration>`
        `<includes>`
            ``<include>``org.baeldung.gatling.http.FetchSinglePostSimulation``</include>``
            ``<include>``org.baeldung.gatling.http.FetchSinglePostSimulationLog``</include>``
        `</includes>`
        `<runMultipleSimulations>`true`</runMultipleSimulations>`
    `</configuration>`
`</plugin>`
```

**我们配置插件以运行多个模拟。** 此外，我们还需要Gatling应用程序和Gatling highcharts依赖项：

```xml
``<dependency>``
    ```<groupId>```io.gatling```</groupId>```
    ```<artifactId>```gatling-app```</artifactId>```
    ```<version>```3.9.5```</version>```
``</dependency>``
``<dependency>``
    ```<groupId>```io.gatling.highcharts```</groupId>```
    ```<artifactId>```gatling-charts-highcharts```</artifactId>```
    ```<version>```3.9.2```</version>```
    `<scope>`test`</scope>`
``</dependency>``
```

我们的目标是在控制台和日志文件中显示从示例API端点_https://jsonplaceholder.typicode.com/posts/1_获取的HTTP响应体。

让我们编写一个简单的Gatling模拟类，该类向_https://jsonplaceholder.typicode.com/posts/1_发出HTTP请求：

```java
public class FetchSinglePostSimulation extends Simulation {

    public FetchSinglePostSimulation() {
        HttpProtocolBuilder httpProtocolBuilder = http.baseUrl("https://jsonplaceholder.typicode.com");

        ScenarioBuilder scn = scenario("显示完整的HTTP响应体")
          .exec(http("GET请求")
          .get("/posts/1")
          .check(status().is(200))
          .check(bodyString().saveAs("responseBody")))
          .exec(session -> {
              System.out.println("响应体：");
              System.out.println(session.getString("responseBody"));
              return session;
          });
        setUp(scn.injectOpen(atOnceUsers(1))).protocols(httpProtocolBuilder);
    }
}
```

在上述代码中，**我们定义了一个名为_FetchSinglePostSimulation_的新类，并扩展了Gatling库中的_Simulation_类。**

接下来，我们创建一个_HttpProtocolBuilder_对象，并为HTTP请求设置基本URL为_https://jsonplaceholder.typicode.com/_。

然后，我们定义了一个_ScenarioBuilder_对象。该对象帮助定义一系列模拟场景。首先，我们使用_exec()_方法启动一个HTTP请求。接下来，我们指定请求是对_/posts/1_端点的GET请求。

此外，我们检查响应的HTTP状态码是否为_200_。最后，我们使用_check()_方法将响应体作为字符串保存在会话变量_responseBody_中。

此外，我们开始一个自定义操作，它接受一个_Session_对象作为输入。然后，我们将_responseBody_的值打印到控制台。最后，我们返回会话对象。

**此外，模拟通过一次性注入一个用户到场景中，并使用我们之前创建的_httpProtocolBuilder_对象配置HTTP协议来设置。**

要运行模拟，让我们打开终端并切换到项目的根目录。然后，让我们运行Gatling_test命令：

```shell
mvn gatling:test
```

该命令生成模拟报告，并将响应体输出到控制台。这是测试的响应体：

![img](https://www.baeldung.com/wp-content/uploads/2023/06/gatlingresponsebody.png)

上图显示了模拟报告的响应。

让我们进一步通过将响应记录到文件而不是输出到控制台来进行记录。首先，让我们编写一个处理文件创建的方法：

```java
void writeFile(String fileName, String content) throws IOException {
    try(BufferedWriter writer = new BufferedWriter(new FileWriter(fileName, true))){
        writer.write(content);
        writer.newLine();
    }
}
```

在上述方法中，我们创建了_BufferedWriter_和_FileWriter_的新实例，将HTTP响应体写入文本文件。

最后，让我们修改自定义操作，将响应体写入文件而不是输出到控制台：

```java
public class FetchSinglePostSimulationLog extends Simulation {

    public FetchSinglePostSimulationLog() {
        HttpProtocolBuilder httpProtocolBuilder = http.baseUrl("https://jsonplaceholder.typicode.com");

        ScenarioBuilder scn = scenario("显示完整的HTTP响应体")
          .exec(http("GET请求")
          .get("/posts/1")
          .check(status().is(200))
          .check(bodyString().saveAs("responseBody")))
          .exec(session -> {
              String responseBody = session.getString("responseBody");
              try {
                  writeFile("response_body.log", responseBody);
              } catch (IOException e) {
                  System.err.println("写入文件错误");
              }
              return session;
          });
        setUp(scn.injectOpen(atOnceUsers(1))).protocols(httpProtocolBuilder);
    }
}
```

我们通过调用_writeFile()_方法并添加文件名_response_body.log_和HTTP响应体作为参数来修改自定义操作。_writeFile()_方法执行将响应记录到文件的操作。

## 4. 结论

在本文中，我们学习了如何在Gatling中在控制台显示完整的HTTP响应体。此外，我们还看到了如何将响应记录到文件而不是输出到控制台。

如往常一样，示例的完整源代码可在GitHub上获得。