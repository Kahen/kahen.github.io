---
date: 2024-06-19
category:
  - Spring Framework
  - Testing
tag:
  - Testing
  - Events
  - Spring
  - Application Events
head:
  - - meta
    - name: keywords
      content: Spring, Testing, Application Events, Tutorial
------
# 如何测试Spring应用程序事件

在本教程中，我们将讨论使用Spring应用程序事件的代码测试。我们将从手动创建测试工具开始，这些工具帮助我们在测试目的下发布和收集应用程序事件。

之后，我们将探索Spring Modulith的测试库，并使用其流畅的场景API来讨论常见的测试案例。使用这种声明性DSL，我们将编写富有表现力的测试，这些测试可以轻松地产生和消费应用程序事件。

**Spring Framework提供应用程序事件，以允许组件在保持松散耦合的同时相互通信。** 我们可以使用_ApplicationEventPublisher_ bean来发布内部事件，这些事件是普通的Java对象。因此，所有注册的监听器都会收到通知。

例如，_OrderService_组件可以在成功下单时发布_OrderCompletedEvent_：

```java
@Service
public class OrderService {

    private final ApplicationEventPublisher eventPublisher;

    // 构造函数

    public void placeOrder(String customerId, String... productIds) {
        Order order = new Order(customerId, Arrays.asList(productIds));
        // 业务逻辑来验证和下单

        OrderCompletedEvent event = new OrderCompletedEvent(savedOrder.id(), savedOrder.customerId(), savedOrder.timestamp());
        eventPublisher.publishEvent(event);
    }

}
```

正如我们所看到的，完成的订单现在被发布为应用程序事件。因此，来自不同模块的组件现在可以监听这些事件并相应地做出反应。

假设_LoyaltyPointsService_对这些事件做出反应，以奖励客户忠诚度积分。为了实现这一点，我们可以利用Spring的_@EventListener_注解：

```java
@Service
public class LoyaltyPointsService {

    private static final int ORDER_COMPLETED_POINTS = 60;

    private final LoyalCustomersRepository loyalCustomers;

    // 构造函数

    @EventListener
    public void onOrderCompleted(OrderCompletedEvent event) {
        // 业务逻辑来奖励客户
        loyalCustomers.awardPoints(event.customerId(), ORDER_COMPLETED_POINTS);
    }

}
```

**使用应用程序事件而不是直接方法调用允许我们保持更松散的耦合，并反转两个模块之间的依赖关系**。换句话说，"orders"模块没有对"rewards"模块中的类源代码的依赖。

## 3. 测试事件监听器

**我们可以通过在测试本身内部发布应用程序事件来测试使用_@EventListener_的组件。**

要测试_LoyaltyPointsService_，我们需要创建一个_@SpringBootTest,_ 注入_ApplicationEventPublisher_ bean，并使用它来发布_OrderCompletedEvent_：

```java
@SpringBootTest
class EventListenerUnitTest {

    @Autowired
    private LoyalCustomersRepository customers;

    @Autowired
    private ApplicationEventPublisher testEventPublisher;

    @Test
    void whenPublishingOrderCompletedEvent_thenRewardCustomerWithLoyaltyPoints() {
        OrderCompletedEvent event = new OrderCompletedEvent("order-1", "customer-1", Instant.now());
        testEventPublisher.publishEvent(event);

        // 断言
    }

}
```

最后，我们需要断言_LoyaltyPointsService_消费了事件，并以正确的积分数量奖励了客户。让我们使用_LoyalCustomersRepository_来看看这个客户获得了多少忠诚度积分：

```java
@Test
void whenPublishingOrderCompletedEvent_thenRewardCustomerWithLoyaltyPoints() {
    OrderCompletedEvent event = new OrderCompletedEvent("order-1", "customer-1", Instant.now());
    testEventPublisher.publishEvent(event);

    assertThat(customers.find("customer-1"))
      .isPresent().get()
      .hasFieldOrPropertyWithValue("customerId", "customer-1")
      .hasFieldOrPropertyWithValue("points", 60);
}
```

正如预期的那样，测试通过了：事件被接收并由"rewards"模块处理，奖金被应用。

## 4. 测试事件发布者

**我们可以通过在测试包中创建自定义事件监听器来测试发布应用程序事件的组件。** 这个监听器也将使用_@EventHandler_注解，类似于生产实现。然而，这次我们将把所有传入的事件收集到一个列表中，该列表将通过一个getter公开：

```java
@Component
class TestEventListener {

    final List`<OrderCompletedEvent>` events = new ArrayList<>();
    // getter

    @EventListener
    void onEvent(OrderCompletedEvent event) {
        events.add(event);
    }

    void reset() {
        events.clear();
    }
}
```

正如我们所观察到的，我们还可以添加实用程序_reset()_。我们可以在每个测试之前调用它，以清除上一个测试产生的事件。让我们创建Spring Boot测试并_@Autowire_我们的_TestEventListener_组件：

```java
@SpringBootTest
class EventPublisherUnitTest {

    @Autowired
    OrderService orderService;

    @Autowired
    TestEventListener testEventListener;

    @BeforeEach
    void beforeEach() {
        testEventListener.reset();
    }

    @Test
    void whenPlacingOrder_thenPublishApplicationEvent() {
        // 下单

        assertThat(testEventListener.getEvents())
          // 验证发布的事件
    }

}
```

为了完成测试，我们需要使用_OrderService_组件下订单。之后，我们将断言_testEventListener_收到了恰好一个应用程序事件，具有适当的属性：

```java
@Test
void whenPlacingOrder_thenPublishApplicationEvent() {
    orderService.placeOrder("customer1", "product1", "product2");

    assertThat(testEventListener.getEvents())
      .hasSize(1).first()
      .hasFieldOrPropertyWithValue("customerId", "customer1")
      .hasFieldOrProperty("orderId")
      .hasFieldOrProperty("timestamp");
}
```

如果我们仔细观察，我们会注意到这两个测试的设置和验证是互补的。这个测试模拟了一个方法调用并监听发布的事件，而前一个测试发布一个事件并验证状态变化。换句话说，**我们通过仅使用两个测试来测试整个过程：每个测试覆盖一个不同的部分，在逻辑模块边界处分割。**

## 5. Spring Modulith的测试支持

Spring Modulith提供了一组可以独立使用的工具。这些库提供了一系列功能，主要旨在在应用程序内建立清晰的逻辑模块边界。

### 5.1. 场景API

这种架构风格通过使用应用程序事件促进模块之间的灵活交互。因此，**Spring Modulith中的一个工具提供了对涉及应用程序事件的测试流程的支持。**

让我们将_spring-modulith-starter-test_ maven依赖项添加到我们的_pom.xml_中：

```xml
`<dependency>`
    `<groupId>`org.springframework.modulith`</groupId>`
    `<artifactId>`spring-modulith-starter-test`</artifactId>`
    `<version>`1.1.3`</version>`
`</dependency>`
```

这使我们能够以声明性方式编写测试，使用场景API。首先，我们将创建一个测试类，并用_@ApplcationModuleTest_进行注解。结果，我们将能够在任何测试方法中注入_Scenario_对象：

```java
@ApplicationModuleTest
class SpringModulithScenarioApiUnitTest {

    @Test
    void test(Scenario scenario) {
        // ...
    }

}
```

简单来说，这个特性提供了一个方便的DSL，允许我们测试最常见的用例。例如，它使启动测试和评估其结果变得容易：

- 执行方法调用
- 发布应用程序事件
- 验证状态变化
- 捕获和验证传出事件

此外，API还提供了一些其他实用程序，例如：

- 轮询和等待异步应用程序事件
- 定义超时
- 对捕获的事件执行过滤和映射
- 创建自定义断言

### 5.2. 使用场景API测试事件监听器

要测试使用_@EventListener_方法的组件，我们必须注入_ApplicationEventPublisher_ bean并发布_OrderCompletedEvent_。然而，Spring Modulith的测试DSL通过_scenario.publish()_提供了一个更简单的解决方案：

```java
@Test
void whenReceivingPublishOrderCompletedEvent_thenRewardCustomerWithLoyaltyPoints(Scenario scenario) {
    scenario.publish(new OrderCompletedEvent("order-1", "customer-1", Instant.now()))
      .andWaitForStateChange(() -> loyalCustomers.find("customer-1"))
      .andVerify(it -> assertThat(it)
        .isPresent().get()
        .hasFieldOrPropertyWithValue("customerId", "customer-1")
        .hasFieldOrPropertyWithValue("points", 60));
}
```

_andWaitforStateChange()_方法接受一个lambda表达式，它会重试执行，直到返回一个非_null_对象或非空_Optional_。这种机制对于异步方法调用特别有用。

总之，**我们定义了一个场景，我们发布一个事件，等待状态变化，然后验证系统的最终状态。**

### 5.3. 使用场景API测试事件发布者

**我们还可以使用场景API模拟方法调用，并拦截并验证传出的应用程序事件。** 让我们使用DSL编写一个测试，验证“_order_”模块的行为：

```java
@Test
void whenPlacingOrder_thenPublishOrderCompletedEvent(Scenario scenario) {
    scenario.stimulate(() -> orderService.placeOrder("customer-1", "product-1", "product-2"))
      .andWaitForEventOfType(OrderCompletedEvent.classtoArriveAndVerify(evt -> assertThat(evt)
        .hasFieldOrPropertyWithValue("customerId", "customer-1")
        .hasFieldOrProperty("orderId")
        .hasFieldOrProperty("timestamp"));
}
```

如我们所见，_andWaitforEventOfType()_方法允许我们声明我们想要捕获的事件类型。之后，_toArriveAndVerify()_被用来等待事件并执行相关的断言。

# 6. 结论

在本文中，我们看到了使用Spring应用程序事件测试代码的多种方式。在我们的第一个测试中，我们使用_ApplicationEventPublisher_手动发布应用程序事件。

同样，我们创建了一个自定义_TestEventListener_，使用_@EventHandler_注解来捕获所有传出的事件。我们使用这个辅助组件在测试期间捕获并验证应用程序产生的事件。

之后，我们学习了Spring Modulith的测试支持，并使用场景API以声明性方式编写了相同的测试。流畅的DSL允许我们发布和捕获应用程序事件，模拟方法调用，并等待状态变化。

如常，完整的源代码可以在GitHub上找到。

评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。

OK