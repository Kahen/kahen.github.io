由于我无法访问外部链接，因此无法获取网页内容进行翻译。请提供网页的具体内容，我将帮助您进行翻译。---
date: 2024-06-20
category:
  - Spring Boot
  - Logging
tag:
  - Loki
  - Grafana
head:
  - - meta
    - name: keywords
      content: Spring Boot, Loki, Grafana, Logging
---

# Spring Boot 中使用 Loki 进行日志记录

无论你是刚开始学习还是拥有多年经验，**Spring Boot** 都是构建新应用程序的绝佳选择，它让开发变得轻松。

Jmix 增强了 Spring Boot 开发者的能力，允许他们构建和交付 **全栈 Web 应用程序**，而无需深入前端技术。它使你能够创建从简单的 Web GUI CRUD 应用程序到复杂的企业解决方案，消除了前端/后端分离及其相关的安全问题。

**Jmix 平台** 包括一个基于 **Spring Boot, JPA, 和 Vaadin** 的框架，并附带 Jmix Studio，这是一个 IntelliJ IDEA 插件，配备了一套开发者生产力工具。该平台还提供了 **即开即用** 的插件，用于报告生成、BPM、地图等，你可以在 Jmix 应用程序中使用它们，或者作为单独的服务。所有技术都是相互连接的，使单个 Java 开发者能够在几乎不需要开始知识的情况下，达到整个团队的水平。

另外！Jmix 可以 **立即生成 CRUD Web 应用程序**，包括其 JPA 数据模型和 UI，**直接从现有的数据库**。然后，继续在 Jmix Studio 的帮助下进行开发。

聪明地开发，而不是辛苦地开发！

**>> 成为全栈开发者**

**使用 Jmix**

现在，随着新版《REST With Spring -》的发布，即“**REST With Spring Boot**”，当前价格将在 6 月 22 日之前有效，之后将永久增加 50 美元。

**>> 立即获取访问权限**

## 1. 引言
由 Grafana Labs 开发的 Loki 是一个受 Prometheus 启发的开源日志聚合系统。它的目的是存储和索引日志数据，便于有效查询和分析由不同应用程序和系统生成的日志。

在本文中，我们将为 Spring Boot 应用程序设置 Grafana Loki 日志记录。Loki 将收集和聚合应用程序日志，而 Grafana 将显示它们。

## 2. 运行 Loki 和 Grafana 服务
我们首先启动 Loki 和 Grafana 服务，以便我们可以收集和观察日志。Docker 容器将帮助我们更容易地配置和运行它们。

首先，让我们在 docker-compose 文件中组合 Loki 和 Grafana 服务：

```yaml
version: "3"
networks:
  loki:
services:
  loki:
    image: grafana/loki:2.9.0
    ports:
      - "3100:3100"
    command: -config.file=/etc/loki/local-config.yaml
    networks:
      - loki
  grafana:
    environment:
      - GF_PATHS_PROVISIONING=/etc/grafana/provisioning
      - GF_AUTH_ANONYMOUS_ENABLED=true
      - GF_AUTH_ANONYMOUS_ORG_ROLE=Admin
    entrypoint:
      - sh
      - -euc
      - |
        mkdir -p /etc/grafana/provisioning/datasources
        cat `<<EOF >` /etc/grafana/provisioning/datasources/ds.yaml
        apiVersion: 1
        datasources:
        - name: Loki
          type: loki
          access: proxy
          orgId: 1
          url: http://loki:3100
          basicAuth: false
          isDefault: true
          version: 1
          editable: false
        EOF
        /run.sh
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    networks:
      - loki
```

接下来，我们使用 _docker-compose_ 命令启动服务：

```shell
docker-compose up
```

最后，让我们确认两个服务是否都已启动：

```shell
docker ps
```

## 3. 使用 Spring Boot 配置 Loki
一旦我们启动了 Grafana 和 Loki 服务，我们需要配置我们的应用程序将其日志发送到 Loki。我们将使用 _loki-logback-appender_，它负责将日志发送到 Loki 聚合器进行存储和索引。

首先，我们需要在 _pom.xml_ 文件中添加 _loki-logback-appender_：

```xml
`<dependency>`
    `<groupId>`com.github.loki4j`</groupId>`
    `<artifactId>`loki-logback-appender`</artifactId>`
    `<version>`1.4.1`</version>`
`</dependency>`
```

其次，我们需要在 _src/main/resources_ 文件夹下创建一个 _logback-spring.xml_ 文件。这个文件将控制我们的 Spring Boot 应用程序的日志行为，例如日志的格式，Loki 服务的端点等：

```xml
`<?xml version="1.0" encoding="UTF-8"?>`
`<configuration>`
   `<appender name="LOKI" class="com.github.loki4j.logback.Loki4jAppender">`
        `<http>`
            `<url>`http://localhost:3100/loki/api/v1/push`</url>`
        `</http>`
        `<format>`
            `<label>`
                ``<pattern>``app=${name},host=${HOSTNAME},level=%level``</pattern>``
                `<readMarkers>`true`</readMarkers>`
            `</label>`
            `<message>`
                ``<pattern>``
                    {
                    "level":"%level",
                    "class":"%logger{36}",
                    "thread":"%thread",
                    "message": "%message",
                    "requestId": "%X{X-Request-ID}"
                    }
                ``</pattern>``
            `</message>`
        `</format>`
   `</appender>`

   `<root level="INFO">`
        `<appender-ref ref="LOKI" />`
   `</root>`
`</configuration>`
```

一旦我们完成设置，让我们编写一个简单的服务，该服务在 INFO 级别记录数据：

```java
@Service
class DemoService {
    private final Logger LOG = LoggerFactory.getLogger(DemoService.class);

    public void log(){
        LOG.info("DemoService.log invoked");
    }
}
```

## 4. 测试验证
让我们通过启动 Grafana 和 Loki 容器，然后执行服务方法将日志推送到 Loki 来进行实时测试。之后，我们将使用 HTTP API 查询 Loki 以确认日志是否确实被推送。关于启动 Grafana 和 Loki 容器，请参见前一节。

首先，让我们执行 _DemoService.log()_ 方法，这将调用 _Logger.info()_。这将使用 _loki-logback-appender_ 发送消息，Loki 将收集它：

```java
DemoService service = new DemoService();
service.log();
```

其次，我们将创建一个请求，调用 Loki 提供的 REST 端点。这个 GET API 接受代表 _query_、_start_ 时间和 _end_ 时间的查询参数。我们将这些参数作为我们的请求对象的一部分添加：

```java
HttpHeaders headers = new HttpHeaders();
headers.setContentType(MediaType.APPLICATION_JSON);

String query = "{\"level\":\"INFO\"} |= `DemoService.log invoked`";

// 获取 UTC 时间
LocalDateTime currentDateTime = LocalDateTime.now(ZoneOffset.UTC);
String current_time_utc = currentDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'"));

LocalDateTime tenMinsAgo = currentDateTime.minusMinutes(10);
String start_time_utc = tenMinsAgo.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'"));

URI uri = UriComponentsBuilder.fromUriString(baseUrl)
  .queryParam("query", query)
  .queryParam("start", start_time_utc)
  .queryParam("end", current_time_utc)
  .build()
  .toUri();
```

接下来，让我们使用请求对象执行 REST 请求：

```java
RestTemplate restTemplate = new RestTemplate();
ResponseEntity``<String>`` response = restTemplate.exchange(uri, HttpMethod.GET, new HttpEntity<>(headers), String.class);
```

现在我们需要处理响应并提取我们感兴趣的日志消息。我们将使用 _ObjectMapper_ 读取 JSON 响应并提取日志消息：

```java
ObjectMapper objectMapper = new ObjectMapper();
List``<String>`` messages = new ArrayList<>();
String responseBody = response.getBody();
JsonNode jsonNode = objectMapper.readTree(responseBody);
JsonNode result = jsonNode.get("data")
  .get("result")
  .get(0)
  .get("values");

result.iterator()
  .forEachRemaining(e -> {
      Iterator`<JsonNode>` elements = e.elements();
      elements.forEachRemaining(f -> messages.add(f.toString()));
  });

```

最后，让我们断言我们在响应中收到的消息包含 _DemoService_ 记录的消息：

```java
assertThat(messages).anyMatch(e -> e.contains(expected));
```

## 5. 日志聚合和可视化
由于我们使用 _loki-logback-appender_ 进行了配置设置，我们的服务日志被推送到 Loki 服务。我们可以通过访问浏览器中的 _http://localhost:3000_（Grafana 服务部署的地方）来可视化它。

**要查看 Loki 中存储和索引的日志，我们需要使用 Grafana。Grafana 数据源提供了可配置的连接参数，我们需要输入 Loki 端点、认证机制等。**

首先，让我们配置日志已被推送到的 Loki 端点：

一旦我们