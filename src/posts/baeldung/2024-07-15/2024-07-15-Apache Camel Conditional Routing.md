---
date: 2022-04-01
category:
  - Spring
  - Apache Camel
tag:
  - Conditional Routing
  - Message Routing
head:
  - - meta
    - name: keywords
      content: Apache Camel, Conditional Routing, Spring Boot, Enterprise Integration Patterns
------
# Apache Camel 条件路由 | Baeldung

## **1. 概述**

Apache Camel 是一个功能强大的开源集成框架，实现了多种已知的企业集成模式。

通常在使用 Camel 进行消息路由时，我们希望根据消息内容以不同的方式处理消息。为此，Camel 提供了一个强大的特性，称为基于内容的路由器，它来自 EIP 模式集合。

在本教程中，**我们将探讨几种基于某些条件路由消息的方法。**

## **2. 依赖项**

我们开始所需的全部是将 _camel-spring-boot-starter_ 添加到我们的 _pom.xml_：

```xml
``<dependency>``
    ``<groupId>``org.apache.camel.springboot``</groupId>``
    ``<artifactId>``camel-spring-boot-starter``</artifactId>``
    ``<version>``4.3.0``</version>``
``</dependency>``
```

然后，我们需要将 _camel-test-spring-junit5_ 依赖项添加到我们的 _pom.xml_：

```xml
``<dependency>``
    ``<groupId>``org.apache.camel``</groupId>``
    ``<artifactId>``camel-test-spring-junit5``</artifactId>``
    ``<version>``4.3.0``</version>``
``</dependency>``
```

顾名思义，此依赖项专门用于我们的单元测试。

## **3. 定义一个简单的 Camel Spring Boot 应用程序**

本教程的示例重点将是一个简单的 Apache Camel Spring Boot 应用程序。

让我们从定义我们的应用程序入口点开始：

```java
@SpringBootApplication
public class ConditionalRoutingSpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConditionalRoutingSpringApplication.class, args);
    }
}
```

如我们所见，这是一个标准的 Spring Boot 应用程序。

快速回顾一下，Apache Camel 中的路由是构建块的基本单元，通常由 Camel 按顺序执行的一系列步骤组成，这些步骤消费并处理消息。

例如，路由通常会使用来自磁盘上的文件或消息队列的消费者接收消息。然后，Camel 执行路由中的其余步骤，这些步骤以某种方式处理消息或将其发送到其他端点。

毫无疑问，**我们希望根据某些事实有条件地路由消息。为此，Camel 提供了 _choice_ 和 _when_ 构造**。我们可以将其视为 Java 中的 _if-else_ 语句的等价物。

考虑到这一点，让我们继续创建我们的第一个带有一些条件逻辑的路由。

## **5. 创建路由**

在这个例子中，我们将根据接收到的消息正文内容定义一个基本的路由：

```java
@Component
public class ConditionalBodyRouter extends RouteBuilder {

    @Override
    public void configure() throws Exception {

        from("direct:start-conditional")
          .routeId("conditional-body-route")
          .choice()
            .when(body().contains("Baeldung"))
              .setBody(simple("Goodbye, Baeldung!"))
              .to("mock:result-body")
            .otherwise()
              .to("mock:result-body")
          .end();
    }
}
```

正如我们在我们的琐碎示例中看到的，我们配置我们的路由以从称为 _start-conditional_ 的直接端点消费消息。

现在让我们浏览一下我们路由的关键部分：

- 首先，我们使用 _choice()_ 方法开始路由 - **这告诉 Camel 接下来的行将包含一些要评估的条件**
- 接下来，_when()_ 方法指示要评估的新条件 - 在这个例子中，我们简单地检查消息正文是否包含字符串 Baeldung。我们可以添加尽可能多的 when 条件
- 为了结束我们的路由，我们使用 _otherwise()_ 方法定义当前面的 when 条件都不满足时应该做什么。
- 最后，使用 _end()_ 方法终止路由，这将关闭选择块。

总之，当我们运行我们的路由时，如果我们的消息正文包含字符串 _Baeldung_，我们将把消息正文设置为 _Goodbye, Baeldung!_ 并将结果发送到一个称为 _result-body_ 的模拟端点。

或者，我们将只将原始消息路由到我们的模拟端点。

## **6. 测试路由**

考虑到上一节，让我们继续编写一个单元测试来探索我们的路由的行为：

```java
@SpringBootTest
@CamelSpringBootTest
class ConditionalBodyRouterUnitTest {

    @Autowired
    private ProducerTemplate template;

    @EndpointInject("mock:result-body")
    private MockEndpoint mock;

    @Test
    void whenSendBodyWithBaeldung_thenGoodbyeMessageReceivedSuccessfully() throws InterruptedException {
        mock.expectedBodiesReceived("Goodbye, Baeldung!");

        template.sendBody("direct:start-conditional", "Hello Baeldung Readers!");

        mock.assertIsSatisfied();
    }
}
```

正如我们所看到的，我们的测试由三个简单的步骤组成：

- 首先，让我们设置一个期望，我们的模拟端点将接收给定的消息正文
- 然后我们将消息发送到我们的 _direct:start-conditional_ 端点，使用我们的模板。注意，我们将确保我们的消息正文包含字符串 _Baeldung_
- 为了结束我们的测试，**我们使用 _assertIsSatisfied_ 方法来验证我们对模拟端点的初始期望是否已经满足**

此测试确认我们的条件路由工作正常。太棒了！

请务必查看我们之前的教程，了解更多关于如何为我们的 Camel 路由编写可靠、自包含的单元测试的信息。

## **7. 构建其他条件谓词**

到目前为止，我们已经探索了构建我们的 when 谓词的一个选项 - 检查我们的交换消息正文。然而，我们还有几种其他选项可用。

例如，**我们也可以通过检查给定消息头的值来控制我们的条件：**

```java
@Component
public class ConditionalHeaderRouter extends RouteBuilder {

    @Override
    public void configure() throws Exception {

        from("direct:start-conditional-header")
            .routeId("conditional-header-route")
            .choice()
              .when(header("fruit").isEqualTo("Apple"))
                .setHeader("favourite", simple("Apples"))
                .to("mock:result")
              .otherwise()
                .setHeader("favourite", header("fruit"))
                .to("mock:result")
            .end();
    }
}
```

这次，我们已经修改了 _when_ 方法以查看名为 fruit 的头的值。在我们的 when 条件中使用 Camel 提供的 Simple 语言也是完全可能的。

## **8. 使用 Java Beans**

此外，当我们想在我们的谓词中使用 Java 方法调用的结果时，我们也可以在 Camel Bean 语言中使用它。

首先，我们需要创建一个包含返回布尔值的方法的 Java bean：

```java
public class FruitBean {

    public static boolean isApple(Exchange exchange) {
        return "Apple".equals(exchange.getIn().getHeader("fruit"));
    }
}
```

**在这里，我们还可以选择性地添加 _Exchange_ 作为参数，以便 Camel 自动将 _Exchange_ 传递给我们的方法。**

然后我们可以继续在我们的 _when_ 块中使用我们的 _FruitBean_：

```java
@Component
public class ConditionalBeanRouter extends RouteBuilder {

    @Override
    public void configure() throws Exception {

        from("direct:start-conditional-bean")
            .routeId("conditional-bean-route")
            .choice()
              .when(method(FruitBean.class, "isApple"))
                .setHeader("favourite", simple("Apples"))
                .to("mock:result")
              .otherwise()
                .setHeader("favourite", header("fruit"))
                .to("mock:result")
            .endChoice()
        .end();
    }
}
```

## 9. 结论

在本文中，我们学习了如何根据我们的路由中的某种条件路由消息。首先，我们创建了一个简单的 Camel 应用程序，其中包含一个检查消息正文的路由。

然后我们学习了使用消息头和 Java beans 在我们的路由中构建谓词的其他几种技术。

如常，本文的完整源代码可在 GitHub 上获取。