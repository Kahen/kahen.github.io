---
date: 2022-04-01
category:
  - HttpClient
  - Logging
tag:
  - Apache
  - HttpClient
  - Logging
head:
  - - meta
    - name: keywords
      content: Apache HttpClient, Logging, Enable Logging
------
# 为Apache HttpClient启用日志记录

## 1. 概述

在本教程中，我们将展示如何在Apache的HttpClient中**启用日志记录**。此外，我们将解释库内部的日志实现方式。之后，我们将展示如何启用不同级别的日志记录。

## 2. 日志实现

HttpClient库提供了高效、最新和功能丰富的HTTP协议客户端实现。

**确实作为一个库，HttpClient不强制实现日志记录**。为此，4.5版本使用Commons Logging提供日志记录。类似地，最新版本5.1使用由SLF4J提供的日志门面。两个版本都使用层次结构模式将记录器与它们的配置相匹配。

得益于此，可以为单个类或与相同功能相关的所有类设置记录器。

## 3. 日志类型

让我们看看库定义的日志级别。我们可以区分3种类型的日志：

- 上下文日志记录 - 记录HttpClient的所有内部操作信息。它也包含线路和头部日志。
- 线路日志记录 - 仅记录传输到服务器和从服务器传输的数据
- 头部日志记录 - 仅记录HTTP头部

在4.5版本中，相应的包是**_org.apache.http.impl.client_和_org.apache.http.wire, org.apache.http.headers._**

相应地，在5.1版本中是包**_org.apache.hc.client5.http_, _org.apache.hc.client5.http.wire_和_org.apache.hc.client5.http.headers._**

## 4. Log4j配置

让我们看看如何在两个版本中启用日志记录。我们的目标是在两个版本中实现同样的灵活性。**在4.1版本中，我们将日志重定向到SLF4j。因此，可以使用不同的日志框架。**

### 4.1. 版本4.5配置

让我们添加httpclient依赖项：

```xml
````<dependency>````
    `````<groupId>`````org.apache.httpcomponents`````</groupId>`````
    `````<artifactId>`````httpclient`````</artifactId>`````
    ````<version>````4.5.8````</version>````
    `<exclusions>`
        `<exclusion>`
            `````<artifactId>`````commons-logging`````</artifactId>`````
            `````<groupId>`````commons-logging`````</groupId>`````
        `</exclusion>`
    `</exclusions>`
````</dependency>````
```

我们将使用jcl-over-slf4j将日志重定向到SLF4J。因此我们排除了_commons-logging_。然后让我们添加一个依赖项到JCL和SLF4J之间的桥接：

```xml
````<dependency>````
    `````<groupId>`````org.slf4j`````</groupId>`````
    `````<artifactId>`````jcl-over-slf4j`````</artifactId>`````
    ````<version>````1.7.32````</version>````
````</dependency>````
```

因为SLF4J只是一个门面，我们需要一个绑定。在我们的示例中，我们将使用logback：

```xml
````<dependency>````
    `````<groupId>`````ch.qos.logback`````</groupId>`````
    `````<artifactId>`````logback-classic`````</artifactId>`````
    ````<version>````1.2.6````</version>````
````</dependency>````
```

现在让我们创建_ApacheHttpClientUnitTest_：

```java
public class ApacheHttpClientUnitTest {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    public static final String DUMMY_URL = "https://postman-echo.com/get";

    @Test
    public void whenUseApacheHttpClient_thenCorrect() throws IOException {
        HttpGet request = new HttpGet(DUMMY_URL);

        try (CloseableHttpClient client = HttpClients.createDefault();
             CloseableHttpResponse response = client.execute(request)) {
            HttpEntity entity = response.getEntity();
            logger.debug("Response -> {}", EntityUtils.toString(entity));
        }
    }
}
```

该测试获取一个虚拟网页并将内容打印到日志中。

现在让我们使用_logback.xml_文件定义一个记录器配置：

```xml
``<configuration debug="false">``
    `<appender name="stdout" class="ch.qos.logback.core.ConsoleAppender">`
        `<encoder>`
            `<pattern>`%date [%level] %logger - %msg %n`</pattern>`
        `</encoder>`
    `</appender>`

    `<logger name="com.baeldung.httpclient.readresponsebodystring" level="debug"/>`
    `<logger name="org.apache.http" level="debug"/>`

    `<root level="WARN">`
        `<appender-ref ref="stdout"/>`
    `</root>`
``</configuration>``
```

运行我们的测试后，所有HttpClient的日志都可以在控制台中找到：

```
...
2021-06-19 22:24:45,378 [DEBUG] org.apache.http.impl.execchain.MainClientExec - Executing request GET /get HTTP/1.1
2021-06-19 22:24:45,378 [DEBUG] org.apache.http.impl.execchain.MainClientExec - Target auth state: UNCHALLENGED
2021-06-19 22:24:45,379 [DEBUG] org.apache.http.impl.execchain.MainClientExec - Proxy auth state: UNCHALLENGED
2021-06-19 22:24:45,382 [DEBUG] org.apache.http.headers - http-outgoing-0 >> GET /get HTTP/1.1
...
```

### 4.2. 版本5.1配置

现在让我们看看更高版本的配置。**它包含重新设计的日志记录。因此，它不使用Commons Logging，而是使用SLF4J。** 因此，记录器门面的绑定是唯一的附加依赖项。因此我们将使用_logback-classic_，就像第一个示例一样。

让我们添加httpclient5依赖项：

```xml
````<dependency>````
    `````<groupId>`````org.apache.httpcomponents.client5`````</groupId>`````
    `````<artifactId>`````httpclient5`````</artifactId>`````
    ````<version>````5.1````</version>````
````</dependency>````
```

让我们添加一个类似于前面示例的测试：

```java
public class ApacheHttpClient5UnitTest {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    public static final String DUMMY_URL = "https://postman-echo.com/get";

    @Test
    public void whenUseApacheHttpClient_thenCorrect() throws IOException, ParseException {
        HttpGet request = new HttpGet(DUMMY_URL);

        try (CloseableHttpClient client = HttpClients.createDefault();
             CloseableHttpResponse response = client.execute(request)) {
            HttpEntity entity = response.getEntity();
            logger.debug("Response -> {}", EntityUtils.toString(entity));
        }
    }
}
```

接下来，我们需要在_logback.xml_文件中添加一个记录器：

```xml
``<configuration debug="false">``
    ...
    `<logger name="org.apache.hc.client5.http" level="debug"/>`
    ...
``</configuration>``
```

让我们运行测试类_ApacheHttpClient5UnitTest_并检查输出。它与旧版本类似：

```
...
2021-06-19 22:27:16,944 [DEBUG] org.apache.hc.client5.http.impl.classic.InternalHttpClient - ep-0000000000 endpoint connected
2021-06-19 22:27:16,944 [DEBUG] org.apache.hc.client5.http.impl.classic.MainClientExec - ex-0000000001 executing GET /get HTTP/1.1
2021-06-19 22:27:16,944 [DEBUG] org.apache.hc.client5.http.impl.classic.InternalHttpClient - ep-0000000000 start execution ex-0000000001
2021-06-19 22:27:16,944 [DEBUG] org.apache.hc.client5.http.impl.io.PoolingHttpClientConnectionManager - ep-0000000000 executing exchange ex-0000000001 over http-outgoing-0
2021-06-19 22:27:16,960 [DEBUG] org.apache.hc.client5.http.headers - http-outgoing-0 >> GET /get HTTP/1.1
...
```

## 5. 结论

这就结束了关于如何为Apache的HttpClient配置日志记录的简短教程。首先，我们解释了库中的日志实现方式。其次，我们在两个版本中配置了日志记录并执行了简单的测试用例来显示输出。

一如既往，示例的源代码可以在GitHub上找到。