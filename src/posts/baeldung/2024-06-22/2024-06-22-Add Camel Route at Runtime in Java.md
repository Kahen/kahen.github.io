---
date: 2024-06-22
category:
  - Java
  - Apache Camel
tag:
  - 动态路由
  - 企业集成模式
head:
  - - meta
    - name: keywords
      content: Apache Camel, 动态路由, Java, 企业集成
------
# 在Java中动态添加Camel路由

Apache Camel是一个Java框架，它简化了各种企业集成模式（EIPs）的实现，为企业提供解决方案。

在集成模式中，一个常见的任务是根据特定规则和条件在运行时确定消息路由。Apache Camel通过提供实现动态路由器EIP的方法简化了这一过程。

在本教程中，我们将深入了解如何在Apache Camel中实现动态路由，并演示一个示例。

### 2. 理解动态路由器

有时，我们希望根据运行时的特定规则和条件将消息发送到不同的路由。像路由滑片EIP这样的解决方案可以帮助解决问题，但由于它使用试错法，效率较低。

在路由滑片EIP中，消息包含按定义顺序路由的端点列表。这需要预先配置端点列表，并使用试错法通过每个端点发送消息。

动态路由器EIP提供了更好的实现，可以在运行时添加路由，特别是在我们有多个接收者或根本没有接收者的情况下。它提供了在没有预先配置严格端点的情况下路由消息的灵活性。

此外，它知道每个目的地和将消息路由到特定目的地的规则。**此外，它有一个控制通道，潜在目的地通过在启动时宣布它们的存在和参与规则来进行通信。**

它还在规则库中存储了所有可能目的地的规则。一旦消息到达，它就会检查规则库并满足接收者的请求。

这里有一张显示动态路由器EIP内部结构的图片：

**此外，一个常见的用例是动态服务发现，客户端应用程序可以通过发送包含服务名称的消息来访问服务。**

动态路由器EIP的核心目标是将路由决策推迟到运行时，而不是提前构建静态规则。

### 3. Maven依赖

让我们通过向_pom.xml_添加_camel-core_和_camel-test-junit5_来启动一个简单的Apache Camel项目：

```xml
``<dependency>``
    ``<groupId>``org.apache.camel``</groupId>``
    ``<artifactId>``camel-core``</artifactId>``
    ``<version>``4.3.0``</version>``
``</dependency>``

``<dependency>``
    ``<groupId>``org.apache.camel``</groupId>``
    ``<artifactId>``camel-test-junit5``</artifactId>``
    ``<version>``4.3.0``</version>``
``</dependency>``
```

Camel Core提供了动态路由器EIP和其他路由功能，Camel Test JUnit5通过_CamelSupport_接口使测试消息路由变得更容易。

值得注意的是，我们也可以将Camel项目作为Spring Boot项目启动。

### 4. 使用动态路由器在运行时添加路由

动态路由器EIP确保我们为集成系统指定规则，以帮助在运行时正确匹配到特定路由。它检查传入消息的正文，并将其匹配到路由。

#### 4.1. 配置

首先，让我们创建一个名为_DynamicRouteBean_的类，并添加一个方法来定义规则和条件：

```java
class DynamicRouterBean {
    public String route(String body, @ExchangeProperties Map``<String, Object>`` properties) {
        int invoked = (int) properties.getOrDefault("invoked", 0) + 1;

        properties.put("invoked", invoked);

        if (invoked == 1) {
            switch (body.toLowerCase()) {
                case "mock":
                    return "mock:dynamicRouter";
                case "direct":
                    return "mock:directDynamicRouter";
                case "seda":
                    return "mock:sedaDynamicRouter";
                case "file":
                    return "mock:fileDynamicRouter";
                default:
                    break;
            }
        }
        return null;
    }
}
```

在上述代码中，我们根据传入消息正文和当前调用次数动态确定适当的路由。_route()_方法检查消息正文是否与任何预定义的关键字规则匹配，并返回相应的路由。

此外，我们在_Map_对象上使用了_@ExchangeProperties_注解。**此映射用作存储和检索交换的当前状态并更新调用次数的容器。**

_invoked_变量表示_route()_方法被调用的次数。**如果消息匹配预定义条件，并且是第一次调用，则返回相应的路由。_invoked == 1_检查有助于在第一次调用时执行动态路由逻辑。**这简化了此特定情况下的代码，并防止了不必要的重新执行。

**此外，为了防止动态路由器的无限执行，_route()_方法在路由到适当端点后返回_null_。这确保了在基于消息确定路由后，动态路由将结束。**

简而言之，_route()_方法在每次交换时被调用，直到返回_null_。

最后，让我们在我们的Camel路由构建器中配置动态路由器EIP：

```java
class DynamicRouterRoute extends RouteBuilder {
    @Override
    void configure() {
        from("direct:dynamicRouter")
          .dynamicRouter(method(DynamicRouterBean.class, "route"));
    }
}
```

在上述代码中，我们创建了扩展_RouteBuilder_的_DynamicRouterRoute_类。接下来，我们覆盖了configure方法，并通过调用_dyamicRouter()_方法将动态路由器调用连接到我们的自定义_route()_。

值得注意的是，我们可以在定义我们规则的方法上使用_@DynamicRouter_注解：

```java
class DynamicRouterBean {
    @DynamicRouter
    String route(String body, @ExchangeProperties Map``<String, Object>`` properties) {
        // ...
    }
}
```

该注解消除了在Camel路由中显式配置_dynamicRouter()_方法的需要：

```java
// ...
@Override
void configure() {
    from("direct:dynamicRouter").bean(DynamicRouterBean.class, "route");
}
// ...
```

在上述代码中，我们使用_bean()_方法指定包含路由逻辑的类。不再需要_dynamicRouter()_方法，因为_route()_方法带有_@DynamicRouter_注解。

### 4.2. 单元测试

让我们编写一个单元测试来断言某些条件是否为真。首先，让我们确保我们的测试类扩展_CamelTestSupport_：

```java
class DynamicRouterRouteUnitTest extends CamelTestSupport {
    @Override
    protected RoutesBuilder createRouteBuilder() {
        return new DynamicRouterRoute();
    }
}
```

在这里，为测试提供_DynamicRouterRoute_的实例，用作路由构建器。

接下来，让我们看看名为_mock_的传入消息正文：

```java
@Test
void whenMockEndpointExpectedMessageCountOneAndMockAsMessageBody_thenMessageSentToDynamicRouter() throws InterruptedException {
    MockEndpoint mockDynamicEndpoint = getMockEndpoint("mock:dynamicRouter");
    mockDynamicEndpoint.expectedMessageCount(1);

    template.send("direct:dynamicRouter", exchange -> exchange.getIn().setBody("mock"));
    MockEndpoint.assertIsSatisfied(context);
}
```

在这里，我们模拟动态端点并将其期望的消息路由设置为其值。接下来，我们将期望的消息计数设置为一。最后，我们设置一个传入的消息路由，期望的正文消息，并断言_MockEndpoint_路由已满足。

同样，让我们模拟“_mock:directDynamicRouter_”消息路由：

```java
@Test
void whenMockEndpointExpectedMessageCountOneAndDirectAsMessageBody_thenMessageSentToDynamicRouter() throws InterruptedException {
    MockEndpoint mockDynamicEndpoint = context.getEndpoint("mock:directDynamicRouter", MockEndpoint.class);
    mockDynamicEndpoint.expectedMessageCount(1);

    template.send("direct:dynamicRouter", exchange -> exchange.getIn().setBody("direct"));

    MockEndpoint.assertIsSatisfied(context);
}
```

此测试验证了当“_direct_”作为消息正文发送时，它会被动态路由到“_mock:directDynamicRouter_”端点。**此外，我们将期望的消息计数设置为一，表示端点应接收的消息交换数量。**

### 5. 结论

在本文中，我们学习了如何使用Apache Camel中的动态路由器EIP在运行时添加路由。与使用试错法将消息发送到路由的路由滑片不同，动态路由器EIP提供了一个坚实的实现，根据特定的规则和条件路由到端点。

一如既往，示例的完整源代码可在GitHub上找到。