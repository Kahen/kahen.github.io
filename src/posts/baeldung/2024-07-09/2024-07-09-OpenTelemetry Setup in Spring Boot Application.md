---
date: 2023-02-01
category:
  - Spring Boot
  - OpenTelemetry
tag:
  - Spring Boot
  - OpenTelemetry
  - 微服务
  - 监控
  - 追踪
head:
  - - meta
    - name: keywords
      content: Spring Boot, OpenTelemetry, 微服务监控, 分布式追踪
------
# Spring Boot 应用中的 OpenTelemetry 设置 | Baeldung

## 1. 概述

在分布式系统中，提供请求服务时偶尔出现错误是意料之中的。一个集中的可观测性平台通过捕获应用程序的追踪/日志，并提供一个接口来查询特定请求，从而提供帮助。OpenTelemetry 通过标准化捕获和导出遥测数据的过程来提供帮助。

在本教程中，我们将学习如何将 Spring Boot 应用程序与 OpenTelemetry 集成。我们还将配置 OpenTelemetry 捕获应用程序追踪并将它们发送到中央系统以监控请求。

首先，让我们了解一些基本概念。

## 2. OpenTelemetry 简介

OpenTelemetry (Otel) 是一系列标准化的、与供应商无关的工具、API 和 SDK。它是一个 CNCF 孵化项目，是 OpenTracing 和 OpenCensus 项目的合并。

OpenTracing 是一个供应商中立的 API，用于将遥测数据发送到可观测性后端。OpenCensus 项目提供了一组特定于语言的库，开发人员可以使用这些库来对他们的代码进行仪器化，并将数据发送到任何支持的后端。Otel 使用与其前身项目相同的追踪和跨度概念来表示跨微服务的请求流。

OpenTelemetry 允许我们对代码进行仪器化、生成和收集遥测数据，这有助于分析应用程序的行为或性能。遥测数据可以包括日志、指标和追踪。我们可以自动或手动对 HTTP、数据库调用等进行代码的仪器化。

使用 Otel SDK，我们可以轻松地重写或向追踪添加更多属性。

让我们通过一个例子深入了解。

## 3. 示例应用程序

让我们想象我们需要构建两个微服务，其中一个服务与另一个服务进行交互。为了对应用程序进行遥测数据的仪器化，我们将应用程序与 Spring Cloud 和 OpenTelemetry 集成。

### 3.1. Maven 依赖

_spring-cloud-starter-sleuth_、_spring-cloud-sleuth-otel-autoconfigure_ 和 _opentelemetry-exporter-otlp_ 依赖将自动捕获并导出追踪到任何支持的收集器。

首先，我们将创建一个 Spring Boot Web 项目，并将以下 Spring 和 OpenTelemetry 依赖项包含在两个应用程序中：

```xml
``````<dependency>``````
    ```````<groupId>```````org.springframework.boot```````</groupId>```````
    ```````<artifactId>```````spring-boot-starter-web```````</artifactId>```````
``````</dependency>``````
``````<dependency>``````
    ```````<groupId>```````org.springframework.cloud```````</groupId>```````
    ```````<artifactId>```````spring-cloud-starter-sleuth```````</artifactId>```````
    `<exclusions>`
        `<exclusion>`
            ```````<groupId>```````org.springframework.cloud```````</groupId>```````
            ```````<artifactId>```````spring-cloud-sleuth-brave```````</artifactId>```````
        `</exclusion>`
   `</exclusions>`
``````</dependency>``````
``````<dependency>``````
    ```````<groupId>```````org.springframework.cloud```````</groupId>```````
    ```````<artifactId>```````spring-cloud-sleuth-otel-autoconfigure```````</artifactId>```````
``````</dependency>``````
``````<dependency>``````
    ```````<groupId>```````io.opentelemetry```````</groupId>```````
    ```````<artifactId>```````opentelemetry-exporter-otlp```````</artifactId>```````
    ```<version>```1.23.1```</version>```
``````</dependency>``````
```

我们应该注意，我们已经**排除了 Spring Cloud Brave 依赖，用 Otel 替换了默认的追踪实现**。

我们还需要包括 Spring 依赖管理 BOM 用于 Spring Cloud Sleuth：

```xml
`<dependencyManagement>`
    `<dependencies>`
        ``````<dependency>``````
            ```````<groupId>```````org.springframework.cloud```````</groupId>```````
            ```````<artifactId>```````spring-cloud-dependencies```````</artifactId>```````
            ```<version>```2021.0.5```</version>```
            ``<type>``pom``</type>``
            ``<scope>``import``</scope>``
        ``````</dependency>``````
        ``````<dependency>``````
            ```````<groupId>```````org.springframework.cloud```````</groupId>```````
            ```````<artifactId>```````spring-cloud-sleuth-otel-dependencies```````</artifactId>```````
            ```<version>```1.1.2```</version>```
            ``<scope>``import``</scope>``
            ``<type>``pom``</type>``
        ``````</dependency>``````
    `</dependencies>`
`</dependencyManagement>`
```

### 3.2. 实现下游应用程序

我们的下游应用程序将有一个端点来返回 _Price_ 数据。

首先，让我们模拟 _Price_ 类：

```java
public class Price {
    private long productId;
    private double priceAmount;
    private double discount;
}
```

接下来，让我们实现带有 _Get Price_ 端点的 _PriceController_：

```java
@RestController(value = "/price")
public class PriceController {

    private static final Logger LOGGER = LoggerFactory.getLogger(PriceController.class);

    @Autowired
    private PriceRepository priceRepository;

    @GetMapping(path = "/{id}")
    public Price getPrice(@PathVariable("id") long productId) {
        LOGGER.info("Getting Price details for Product Id {}", productId);
        return priceRepository.getPrice(productId);
    }
}
```

然后，我们将在 _PriceRepository_ 中实现 _getPrice_ 方法：

```java
public Price getPrice(Long productId){
    LOGGER.info("Getting Price from Price Repo With Product Id {}", productId);
    if(!priceMap.containsKey(productId)){
        LOGGER.error("Price Not Found for Product Id {}", productId);
        throw new PriceNotFoundException("Price Not Found");
    }
    return priceMap.get(productId);
}
```

### 3.3. 实现上游应用程序

上游应用程序还将具有一个端点来获取 _Product_ 详细信息，并与上述 _Get Price_ 端点集成。

首先，让我们实现 _Product_ 类：

```java
public class Product {
    private long id;
    private String name;
    private Price price;
}
```

然后，让我们实现带有获取产品的端点的 _ProductController_ 类：

```java
@RestController
public class ProductController {

    private static final Logger LOGGER = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private PriceClient priceClient;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping(path = "/product/{id}")
    public Product getProductDetails(@PathVariable("id") long productId){
        LOGGER.info("Getting Product and Price Details with Product Id {}", productId);
        Product product = productRepository.getProduct(productId);
        product.setPrice(priceClient.getPrice(productId));
        return product;
    }
}
```

接下来，我们将在 _ProductRepository_ 中实现 _getProduct_ 方法：

```java
public Product getProduct(Long productId){
    LOGGER.info("Getting Product from Product Repo With Product Id {}", productId);
    if(!productMap.containsKey(productId)){
        LOGGER.error("Product Not Found for Product Id {}", productId);
        throw new ProductNotFoundException("Product Not Found");
    }
    return productMap.get(productId);
}
```

最后，让我们在 _PriceClient_ 中实现 _getPrice_ 方法：

```java
public Price getPrice(@PathVariable("id") long productId){
    LOGGER.info("Fetching Price Details With Product Id {}", productId);
    String url = String.format("%s/price/%d", baseUrl, productId);
    ResponseEntity`<Price>` price = restTemplate.getForEntity(url, Price.class);
    return price.getBody();
}
```

## 4. 使用 OpenTelemetry 配置 Spring Boot

OpenTelemetry 提供了一个名为 Otel collector 的收集器，用于处理和导出遥测数据到任何可观测性后端，如 Jaeger、Prometheus 等。

可以使用一些 Spring Sleuth 配置将追踪导出到 Otel collector。

### 4.1. 配置 Spring Sleuth

我们需要使用 Otel 端点配置应用程序以发送遥测数据。

让我们在 _application.properties_ 中包括 Spring Sleuth 配置：

```properties
spring.sleuth.otel.config.trace-id-ratio-based=1.0
spring.sleuth.otel.exporter.otlp.endpoint=http://collector:4317
```

**_trace-id-ratio-based_** 属性定义了收集的跨度的采样比例。值 _1.0_ 表示将导出所有跨度。

### 4.2. 配置 OpenTelemetry Collector

Otel collector 是 OpenTelemetry 追踪的引擎。它由接收器、处理器和导出器组件组成。还有一个可选的扩展组件，用于健康检查、服务发现或数据转发。扩展组件不涉及处理遥测数据。

为了快速启动 Otel 服务，我们将使用托管在端口 _14250_ 的 Jaeger 后端端点。

让我们使用 Otel 管道阶段配置 _otel-config.yml_：

```yaml
receivers:
  otlp:
    protocols:
      grpc:
      http:

processors:
  batch:

exporters:
  logging:
    loglevel: debug
  jaeger:
    endpoint: jaeger-service:14250
    tls:
      insecure: true

service:
  pipelines:
    traces:
      receivers:  [ otlp ]
      processors: [ batch ]
      exporters:  [ logging, jaeger ]
```

我们应该注意到，上述 _processors_ 配置是可选的，默认情况下不启用。_processors_batch_ 选项有助于更好地压缩数据并减少传输数据所需的出站连接数量。

我们还应该注意到，接收器配置了 _GRPC_ 和 _HTTP_ 协议。

## 5. 运行应用程序

我们现在将配置并运行整个设置，应用程序和 Otel collector。

### 5.1. 在应用程序中配置 Dockerfile

让我们为我们的 ProductService 实现 Dockerfile：

```Dockerfile
FROM adoptopenjdk/openjdk11:alpine
COPY target/spring-cloud-open-telemetry1-1.0.0-SNAPSHOT.jar spring-cloud-open-telemetry.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/spring-cloud-open-telemetry.jar"]
```

我们应该注意到，PriceService 的 Dockerfile 本质上是相同的。

### 5.2. 使用 Docker Compose 配置服务

现在，让我们使用整个设置配置 docker-compose.yml：

```yaml
version: "4.0"

services:
  product-service:
    build: spring-cloud-open-telemetry1/
    ports:
      - "8080:8080"

  price-service:
    build: spring-cloud-open-telemetry2/
    ports:
      - "8081"

  collector:
    image: otel/opentelemetry-collector:0.72.0
    command: ["--config=/etc/otel-collector-config.yml"]
    volumes:
      - ./otel-config.yml:/etc/otel-collector-config.yml
    ports:
      - "4317:4317"
    depends_on:
      - jaeger-service

  jaeger-service:
    image: jaegertracing/all-in-one:latest
    ports:
      - "16686:16686"
      - "14250"
```

现在，让我们通过 docker-compose 运行服务：

```sh
$ docker-compose up
```

### 5.3. 验证运行中的 Docker 服务

除了 productService 和 priceService，我们还在整个设置中添加了 collector-service 和 jaeger-service。上述 productService 和 priceService 使用 collector 服务端口 4317 发送追踪数据。collector 服务又依赖于 jaeger-service 端点将追踪数据导出到 Jaeger 后端。

对于 jaeger-service，我们使用的是 jaegertracing/all-in-one 镜像，它包括其后端和 UI 组件。

让我们使用 docker container 命令验证服务的状态：

```sh
$ docker container ls --format "table {{.ID}}\t{{.Names}}\t{{.Status}}\t{{.Ports}}"
```

```plaintext
CONTAINER ID   NAMES                                           STATUS         PORTS
7b874b9ee2e6   spring-cloud-open-telemetry-collector-1         Up 5 minutes   0.0.0.0:4317->4317/tcp, 55678-55679/tcp
29ed09779f98   spring-cloud-open-telemetry-jaeger-service-1    Up 5 minutes   5775/udp, 5778/tcp, 6831-6832/udp, 14268/tcp, 0.0.0.0:16686->16686/tcp, 0.0.0.0:61686->14250/tcp
75bfbf6d3551   spring-cloud-open-telemetry-product-service-1   Up 5 minutes   0.0.0.0:8080->8080/tcp, 8081/tcp
d2ca1457b5ab   spring-cloud-open-telemetry-price-service-1     Up 5 minutes   0.0.0.0:61687->8081/tcp
```

## 6. 在收集器中监控追踪

像 Jaeger 这样的遥测收集器工具提供了前端应用程序来监控请求。我们可以实时查看请求追踪，或者稍后查看。

### 6.1. 监控请求成功时的追踪

首先，让我们调用 Product 端点 http://localhost:8080/product/100003。

请求将产生一些日志：

```plaintext
spring-cloud-open-telemetry-price-service-1 | 2023-01-06 19:03:03.985 INFO [price-service,825dad4a4a308e6f7c97171daf29041a,346a0590f545bbcf] 1 --- [nio-8081-exec-1] c.b.opentelemetry.PriceRepository : Getting Price from Price With Product Id 100003
spring-cloud-open-telemetry-product-service-1 | 2023-01-06 19:03:04.432 INFO [,825dad4a4a308e6f7c97171daf29041a,fb9c54565b028eb8] 1 --- [nio-8080-exec-1] c.b.opentelemetry.ProductRepository : Getting Product from Product Repo With Product Id 100003
spring-cloud-open-telemetry-collector-1 | Trace ID : 825dad4a4a308e6f7c97171daf29041a
```

Spring Sleuth 将自动配置 ProductService 以将 _trace id_ 附加到当前线程，并作为 HTTP _Header_ 附加到下游 API 调用。PriceService 也将自动在线程上下文和日志中包含相同的 _trace id_。Otel 服务将使用此 trace id 来确定跨服务的请求流。

正如预期的那样，上述 _trace id ….f29041a_ 在 PriceService 和 ProductService 日志中是相同的。

让我们在 Jaeger UI 的 16686 端口上可视化整个请求跨度时间线：

![img](https://www.baeldung.com/wp-content/uploads/2023/02/Jaegar-UI-Success-Trace.png)

上述显示了请求流程的时间线，并包含表示请求的元数据。

### 6.2. 监控请求失败时的追踪

想象一下，当下游服务抛出异常导致请求失败的场景。

同样，我们将利用相同的 UI 分析根本原因。

让我们通过调用 Product 端点 /product/100005 来测试上述场景，其中 _Product_ 在下游应用程序中不存在。

现在，让我们可视化失败请求的跨度：

![img](https://www.baeldung.com/wp-content/uploads/2023/03/Jaegar-UI-Error-Trace-e1677333985665.png)

如上所见，我们可以追溯到请求的最终 API 调用，错误就起源于那里。

## 7. 结论

在本文中，我们学习了 OpenTelemetry 如何帮助标准化微服务的可观测性模式。

我们还看到了如何通过示例配置 Spring Boot 应用程序使用 OpenTelemetry。最后，在收集器中追踪了 API 请求流程。

像往常一样，示例代码可以在 GitHub 上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)![img](https://secure.gravatar.com/avatar/6c3babf3d6ea5d49c2bc4e7957870d75?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)

OK