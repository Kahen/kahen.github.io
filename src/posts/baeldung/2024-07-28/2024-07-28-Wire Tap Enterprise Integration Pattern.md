---
date: 2021-06-01
category:
  - Enterprise Integration Patterns
  - Apache Camel
tag:
  - Wire Tap
  - EIP
  - Spring Boot
  - ActiveMQ
head:
  - - meta
    - name: keywords
      content: Wire Tap, EIP, Spring Boot, ActiveMQ, Apache Camel
---
# 监控系统消息流的Wire Tap企业集成模式

在这个教程中，我们将介绍Wire Tap企业集成模式（EIP），它帮助我们监控通过系统流动的消息。

这种模式允许我们**拦截消息而不永久地从通道上消耗它们**。

Wire Tap检查在点对点通道上传输的消息。它接收消息，进行复制，然后将其发送到**Tap目的地**：

![img](https://www.baeldung.com/wp-content/uploads/2021/06/Wire-tap-EnterpriseIntegrationPattern.png)

为了更好地理解这一点，让我们创建一个带有ActiveMQ和Camel的Spring Boot应用程序。

## 3. Maven依赖项

让我们添加_camel-spring-boot-dependencies_：

```xml
`<dependencyManagement>`
    `<dependencies>`
        ```<dependency>```
            ```<groupId>```org.apache.camel.springboot```</groupId>```
            ```<artifactId>```camel-spring-boot-dependencies```</artifactId>```
            `<version>`${camel.version}`</version>`
            `<type>`pom`</type>`
            `<scope>`import`</scope>`
        ```</dependency>```
    `</dependencies>`
`</dependencyManagement>`
```

现在，我们将添加_camel-spring-boot-starter_：

```xml
```<dependency>```
    ```<groupId>```org.apache.camel.springboot```</groupId>```
    ```<artifactId>```camel-spring-boot-starter```</artifactId>```
```</dependency>```
```

为了查看通过路由流动的消息，我们还需要包括_ActiveMQ_：

```xml
```<dependency>```
    ```<groupId>```org.apache.camel.springboot```</groupId>```
    ```<artifactId>```camel-activemq-starter```</artifactId>```
```</dependency>```
```

## 4. 消息交换

让我们创建一个消息对象：

```java
public class MyPayload implements Serializable {
    private String value;
    ...
}
```

我们将向_direct:source_发送此消息以启动路由：

```java
try (CamelContext context = new DefaultCamelContext()) {
    ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory("vm://localhost?broker.persistent=false");
    connectionFactory.setTrustAllPackages(true);
    context.addComponent("direct", JmsComponent.jmsComponentAutoAcknowledge(connectionFactory));
    addRoute(context);

    try (ProducerTemplate template = context.createProducerTemplate()) {
        context.start();

        MyPayload payload = new MyPayload("One");
        template.sendBody("direct:source", payload);
        Thread.sleep(10000);
    } finally {
        context.stop();
    }
}
```

接下来，我们将添加一个路由和Tap目的地。

## 5. 监听交换

我们将使用**_wireTap_**方法来设置Tap目的地的端点URI。Camel不会等待来自_wireTap_的响应，因为它**将消息交换模式设置为_InOnly_**。Wire Tap处理器**在单独的线程上处理它**：

```java
wireTap("direct:tap").delay(1000)
```

Camel的Wire Tap节点在监听交换时支持两种风格：

### 5.1. 传统Wire Tap

让我们添加一个传统的Wire Tap路由：

```java
RoutesBuilder traditionalWireTapRoute() {
    return new RouteBuilder() {
        public void configure() {
            from("direct:source").wireTap("direct:tap")
                .delay(1000)
                .bean(MyBean.class, "addTwo")
                .to("direct:destination");

            from("direct:tap").log("Tap Wire route: received");

            from("direct:destination").log("Output at destination: '${body}'");
        }
    };
}
```

在这里，Camel将**只复制_Exchange_** - **它不会进行深度克隆**。所有副本可能共享原始交换中的对象。

**在并发处理多个消息时，有可能** **破坏最终的有效载荷**。我们可以在将其传递给Tap目的地之前创建有效载荷的深度克隆以防止这种情况。

### 5.2. 发送新交换

Wire Tap EIP支持一个_Expression_或_Processor_，预先填充了交换的副本。一个_Expression_只能用于设置消息体。

_Processor_变体提供了完全的控制权，用于如何填充交换（设置属性，头等）。

让我们在有效载荷中实现深度克隆：

```java
public class MyPayload implements Serializable {

    private String value;
    ...
    public MyPayload deepClone() {
        MyPayload myPayload = new MyPayload(value);
        return myPayload;
    }
}
```

现在，让我们实现一个_Processor_类，输入为原始交换的副本：

```java
public class MyPayloadClonePrepare implements Processor {

    public void process(Exchange exchange) throws Exception {
        MyPayload myPayload = exchange.getIn().getBody(MyPayload.class);
        exchange.getIn().setBody(myPayload.deepClone());
        exchange.getIn().setHeader("date", new Date());
    }
}
```

我们将在_wireTap_之后立即使用_onPrepare_调用它：

```java
RoutesBuilder newExchangeRoute() throws Exception {
    return new RouteBuilder() {
        public void configure() throws Exception {

            from("direct:source").wireTap("direct:tap")
                .onPrepare(new MyPayloadClonePrepare())
                .end()
                .delay(1000);

            from("direct:tap").bean(MyBean.class, "addThree");
       };
    }
}
```

## 6. 结论

在本文中，我们实现了Wire Tap模式来监控通过特定消息端点传递的消息。使用Apache Camel的_wireTap_，我们复制消息并将其发送到不同的端点，而不改变现有的流程。

Camel支持两种监听交换的方式。在传统的Wire Tap中，原始交换被复制。在第二种方式中，我们可以创建一个新的交换。我们可以使用_Expression_用新的消息体值填充这个新交换，或者我们可以使用_Processor_设置头 - 并且可选地，使用_Processor_设置体。

代码示例可在GitHub上找到。