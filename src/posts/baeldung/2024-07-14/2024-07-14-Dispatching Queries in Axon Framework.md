---
date: 2022-07-01
category:
  - Axon Framework
  - Microservices
tag:
  - Axon
  - Query Dispatching
  - Microservices
head:
  - - meta
    - name: keywords
      content: Axon Framework, Microservices, Query Dispatching
---
# 在Axon框架中调度查询

Axon Framework 帮助我们构建事件驱动的微服务系统。在《Axon框架指南》中，我们通过一个简单的 Axon Spring Boot 应用程序了解了 Axon，该程序包括构建了一个示例 _订单_ 模型供我们更新和查询。那篇文章使用了简单的点对点查询。

在本教程中，我们将在上述示例的基础上，检查 Axon 中可以调度查询的所有方式。除了更仔细地查看点对点查询之外，我们还将学习流式查询、散布-收集查询和订阅查询。

当我们向 Axon 提交查询时，框架将向所有注册的能够回答我们查询的查询处理器发出该查询。在分布式系统中，可能存在多个节点支持同一种查询，并且一个节点也可能有多个查询处理器支持查询。

那么，Axon 如何决定在其响应中包含哪些结果呢？答案取决于我们如何调度查询。Axon 为我们提供了三个选项：

- **点对点查询从支持我们查询的任何节点获取完整答案**
- **流式查询从支持我们查询的任何节点获取答案流**
- **散布-收集查询从支持我们查询的所有节点获取完整答案**
- **订阅查询获取迄今为止的答案，然后继续监听任何更新**

在接下来的部分中，我们将学习如何支持和调度每种类型的查询。

### 3. 点对点查询

使用点对点查询时，Axon 会向每个支持查询的节点发出查询。**Axon 假定任何节点都能够为点对点查询提供完整答案，并且它将简单地返回它从第一个响应的节点获得的结果。**

在本节中，我们将使用点对点查询获取我们系统中当前的所有 _订单_。

#### 3.1. 定义查询

**Axon 使用强类型类来表示查询类型并封装查询参数。** 在这种情况下，由于我们正在查询所有订单，我们不需要任何查询参数。因此，我们可以用一个空类来表示我们的查询：

```
public class FindAllOrderedProductsQuery {}
```

#### 3.2. 定义查询处理器

**我们可以使用 _@QueryHandler_ 注解来注册查询处理器。**

让我们创一个查询处理器的类，并添加一个可以支持 _FindAllOrderedProductsQuery_ 查询的处理器：

```
@Service
public class InMemoryOrdersEventHandler implements OrdersEventHandler {
    private final Map`<String, Order>` orders = new HashMap<>();

    @QueryHandler
    public List```<Order>``` handle(FindAllOrderedProductsQuery query) {
        return new ArrayList<>(orders.values());
    }
}
```

在上面的示例中，我们注册了 _handle()_ 作为 Axon 查询处理器，它：

1. 能够响应 _FindAllOrderedProductsQuery_ 查询
2. 返回 _订单_ 的 _列表_。正如我们稍后将看到的，**Axon 在决定哪个查询处理器可以响应给定查询时会考虑返回类型。** 这可以使我们更容易地逐步迁移到新的 API。

我们在上面使用 _OrdersEventHandler_ 接口，以便我们稍后可以切换到使用持久数据存储的实现，例如 MongoDB。对于本教程，我们将通过在内存 _Map_ 中存储 _订单_ 对象来保持简单。因此，我们的查询处理器只需要以 _列表_ 的形式返回 _订单_ 对象。

#### 3.3. 调度点对点查询

现在我们已经定义了查询类型和查询处理器，我们准备向 Axon 调度 _FindAllOrderedProductsQuery_。让我们创建一个服务类，其中包含一个发出点对点 _FindAllOrderedProductsQuery_ 的方法：

```
@Service
public class OrderQueryService {
    private final QueryGateway queryGateway;

    public OrderQueryService(QueryGateway queryGateway) {
        this.queryGateway = queryGateway;
    }

    public CompletableFuture`<List````<OrderResponse>`````> findAllOrders() {
        return queryGateway.query(new FindAllOrderedProductsQuery(),
            ResponseTypes.multipleInstancesOf(Order.class))
          .thenApply(r -> r.stream()
            .map(OrderResponse::new)
            .collect(Collectors.toList()));
    }
}
```

在上面的示例中，我们使用 Axon 的 _QueryGateway_ 来调度 _FindAllOrderedProductsQuery_ 的实例。我们使用网关的 _query()_ 方法发出点对点查询。因为我们指定了 _ResponseTypes.multipleInstancesOf(Order.class)_，Axon 知道我们只想与返回类型为 _订单_ 对象集合的查询处理器进行通信。

最后，为了在我们的 _订单_ 模型类和外部客户端之间添加一个间接层，我们将结果包装在 _OrderResponse_ 对象中。

#### 3.4. 测试我们的点对点查询

我们将使用 _@SpringBootTest_ 来使用 Axon 集成测试我们的查询。让我们首先向我们的 _pom.xml_ 文件添加 spring-test 依赖项：

```
```<dependency>```
    ```<groupId>```org.springframework```</groupId>```
    ```<artifactId>```spring-test```</artifactId>```
    ``<scope>``test``</scope>``
```</dependency>```
```

接下来，让我们添加一个测试，调用我们的服务方法来检索 _订单_：

```
@SpringBootTest(classes = OrderApplication.class)
class OrderQueryServiceIntegrationTest {

    @Autowired
    OrderQueryService queryService;

    @Autowired
    OrdersEventHandler handler;

    private String orderId;

    @BeforeEach
    void setUp() {
        orderId = UUID.randomUUID().toString();
        Order order = new Order(orderId);
        handler.reset(Collections.singletonList(order));
    }

    @Test
    void givenOrderCreatedEventSend_whenCallingAllOrders_thenOneCreatedOrderIsReturned()
            throws ExecutionException, InterruptedException {
        List````<OrderResponse>```` result = queryService.findAllOrders().get();
        assertEquals(1, result.size());
        OrderResponse response = result.get(0);
        assertEquals(orderId, response.getOrderId());
        assertEquals(OrderStatusResponse.CREATED, response.getOrderStatus());
        assertTrue(response.getProducts().isEmpty());
    }
}
```

在上面的 _@BeforeEach_ 方法中，我们调用了 _reset()_，这是 _OrdersEventHandler_ 中的一个便捷方法，用于从旧系统中预加载 _订单_ 对象，或帮助促进迁移。在这里，我们使用它将 _订单_ 预加载到我们的内存存储中，以进行我们的测试。

然后，我们调用我们的服务方法，并验证在向我们之前设置的查询处理器发出查询后，它是否检索到了我们的测试订单。

### 4. 流式查询

**使用流式查询，我们可以将大型集合作为流发送。**

与点对点查询不同，后者需要在查询处理器端等待整个结果完成，流式查询可以分批返回结果。与订阅查询不同，流式查询预计在某个时候会完成。

通过依赖项目 Reactor，流式查询受益于诸如背压之类的功能，以处理大型结果集合。如果我们还没有 reactor-core 依赖项，我们需要添加它才能使用流式查询。

#### 4.1. 定义查询

我们将重用点对点查询中的查询。

#### 4.2. 定义查询处理器

**流式查询应该返回一个 _Publisher_**。我们可以使用 Reactor 从内存映射中的值创建一个 _Mono_：

```
@QueryHandler
public Publisher```<Order>``` handleStreaming(FindAllOrderedProductsQuery query) {
    return Mono.fromCallable(orders::values).flatMapMany(Flux::fromIterable);
}
```

我们使用 _flatMapMany()_ 将 _Mono_ 转换为 _Publisher_。

#### 4.3. 调度流式查询

添加到 _OrderQueryService_ 的方法与点对点查询非常相似。我们确实给它一个不同的方法名称，以便区分清楚：

```
public Flux````<OrderResponse>```` allOrdersStreaming() {
    Publisher```<Order>``` publisher = queryGateway.streamingQuery(new FindAllOrderedProductsQuery(), Order.class);
    return Flux.from(publisher).map(OrderResponse::new);
}
```

#### 4.4. 测试我们的流式查询

让我们向我们的 _OrderQueryServiceIntegrationTest_ 添加一个测试：

```
@Test
void givenOrderCreatedEventSend_whenCallingAllOrdersStreaming_thenOneOrderIsReturned() {
    Flux````<OrderResponse>```` result = queryService.allOrdersStreaming();
    StepVerifier.create(result)
      .assertNext(order -> assertEquals(orderId, order.getOrderId()))
      .expectComplete()
      .verify();
}
```

我们应该注意，使用 _expectComplete()_，我们验证流确实完成了。

### 5. 散布-收集查询

散布-收集查询被调度到所有支持查询的节点中的所有查询处理器。**对于这些查询，每个查询处理器的结果被组合成单个响应。**如果两个节点具有相同的 Spring 应用程序名称，Axon 将它们视为等效的，并且只会使用第一个响应的节点的结果。

在本节中，我们将创建一个查询，以检索与给定产品 ID 匹配的已发货产品的总数。我们将模拟查询实时系统和旧系统，以展示 Axon 将如何组合来自两个系统的响应。

#### 5.1. 定义查询

与我们的点对点查询不同，这次我们需要提供参数：产品 ID。**我们将创建一个带有我们产品 ID 参数的 POJO，而不是一个空类：**

```
public class TotalProductsShippedQuery {
    private final String productId;

    public TotalProductsShippedQuery(String productId) {
        this.productId = productId;
    }

    // getter
}

#### 5.2. 定义查询处理器

首先，我们将查询基于事件的系统，正如我们将要回顾的，它使用内存数据存储。让我们向我们现有的 `InMemoryOrdersEventHandler` 添加一个查询处理器来获取已发货产品的总数：

```
@QueryHandler
public Integer handle(TotalProductsShippedQuery query) {
    return orders.values().stream()
      .filter(o -> o.getOrderStatus() == OrderStatus.SHIPPED)
      .map(o -> Optional.ofNullable(o.getProducts().get(query.getProductId())).orElse(0))
      .reduce(0, Integer::sum);
}
```

在上面的代码中，我们检索了所有的内存 `Order` 对象，并移除了那些尚未发货的订单。然后我们调用每个 `Order` 的 `getProducts()` 来获取已发货且产品 ID 与我们的查询参数匹配的产品数量。我们将这些数量求和，得到已发货产品的总数。

由于我们希望将这些结果与我们假设的旧系统中的数字结合起来，让我们用一个单独的类和查询处理器模拟旧数据：

```
@Service
public class LegacyQueryHandler {
    @QueryHandler
    public Integer handle(TotalProductsShippedQuery query) {
        switch (query.getProductId()) {
        case "Deluxe Chair":
            return 234;
        case "a6aa01eb-4e38-4dfb-b53b-b5b82961fbf3":
            return 10;
        default:
            return 0;
        }
    }
}
```

为了本教程的目的，此查询处理器存在于与我们的 `InMemoryOrdersEventHandler` 处理器相同的 Spring 应用程序中。在现实场景中，我们可能不会在同一个应用程序中为相同类型的查询拥有多个查询处理器。**散布-收集查询通常结合来自每个都有单个处理器的多个 Spring 应用程序的结果。**

#### 5.3. 调度散布-收集查询

让我们向我们的 `OrderQueryService` 添加一个新的方法来调度散布-收集查询：

```
public Integer totalShipped(String productId) {
    return queryGateway.scatterGather(new TotalProductsShippedQuery(productId),
        ResponseTypes.instanceOf(Integer.class), 10L, TimeUnit.SECONDS)
      .reduce(0, Integer::sum);
}
```

这次，我们用 `productId` 参数构造了我们的查询对象。我们还为我们的 `scatterGather()` 调用设置了一个 10 秒的超时。**Axon 将只响应它能够在那个时间窗口内检索到的结果。** 如果一个或多个处理器在那个窗口内没有响应，它们的结果将不会被包括在 `queryGateway` 的响应中。

#### 5.4. 测试我们的散布-收集查询

让我们向我们的 `OrderQueryServiceIntegrationTest` 添加一个测试：

```
void givenThreeDeluxeChairsShipped_whenCallingAllShippedChairs_then234PlusTreeIsReturned() {
    Order order = new Order(orderId);
    order.getProducts().put("Deluxe Chair", 3);
    order.setOrderShipped();
    handler.reset(Collections.singletonList(order));

    assertEquals(237, queryService.totalShipped("Deluxe Chair"));
}
```

在上面的代码中，我们使用我们的 `reset()` 方法来模拟我们的事件驱动系统中的三个订单。之前，在我们的 `LegacyQueryHandler` 中，我们在旧系统中硬编码了 234 个已发货的豪华椅子。因此，我们的测试应该得到 237 个豪华椅子已发货的总数。

### 6. 订阅查询

**使用订阅查询，我们得到一个初始结果，然后是更新的流。** 在本节中，我们将查询系统中当前状态的 _订单_，但随后将保持与 Axon 的连接，以便在该 _订单_ 发生任何新更新时获得通知。

#### 6.1. 定义查询

由于我们想要检索特定的订单，让我们创建一个查询类，其中订单 ID 是其唯一的参数：

```
public class OrderUpdatesQuery {
    private final String orderId;

    public OrderUpdatesQuery(String orderId) {
        this.orderId = orderId;
    }

    // getter
}
```

#### 6.2. 定义查询处理器

从我们的内存映射中检索 _订单_ 的查询处理器非常简单。让我们将它添加到我们的 `InMemoryOrdersEventHandler` 类中：

```
@QueryHandler
public Order handle(OrderUpdatesQuery query) {
    return orders.get(query.getOrderId());
}
```

#### 6.3. 发出查询更新

订阅查询仅在有更新时才有趣。**Axon Framework 提供了一个 `QueryUpdateEmitter` 类，我们可以使用它来通知 Axon 如何以及何时应该更新订阅。** 让我们将那个发射器注入到我们的 `InMemoryOrdersEventHandler` 类中，并在便捷方法中使用它：

```
@Service
public class InMemoryOrdersEventHandler implements OrdersEventHandler {

    private final QueryUpdateEmitter emitter;

    public InMemoryOrdersEventHandler(QueryUpdateEmitter emitter) {
        this.emitter = emitter;
    }

    private void emitUpdate(Order order) {
        emitter.emit(OrderUpdatesQuery.class, q -> order.getOrderId()
          .equals(q.getOrderId()), order);
    }

    // 我们的事件和查询处理器
}
```

**我们的 `emitter.emit()` 调用告诉 Axon，任何订阅了 `OrderUpdatesQuery` 的客户端可能需要接收更新。** 第二个参数是一个过滤器，告诉 Axon 只有订阅匹配提供的订单 ID 时才应该得到更新。

现在，我们可以在任何修改订单的事件处理器中使用我们的 `emitUpdate()` 方法。例如，如果一个订单被发货了，任何对该订单更新的活跃订阅都应该被通知。让我们为之前文章中提到的 `OrderShippedEvent` 创建一个事件处理器，并让它发出对已发货订单的更新：

```
@Service
public class InMemoryOrdersEventHandler implements OrdersEventHandler {
    @EventHandler
    public void on(OrderShippedEvent event) {
        orders.computeIfPresent(event.getOrderId(), (orderId, order) -> {
            order.setOrderShipped();
            emitUpdate(order);
            return order;
        });
    }

    // 字段，查询处理器，其他事件处理器，以及我们的 emitUpdate() 方法
}
```

我们可以对我们的 `ProductAddedEvent`、`ProductCountIncrementedEvent`、`ProductCountDecrementedEvent` 和 `OrderConfirmedEvent` 事件做同样的事情。

#### 6.4. 订阅查询

接下来，我们将构建一个服务方法来订阅查询。我们将使用 Reactor Core 中的 `Flux` 以流的形式向客户端代码发送更新。

让我们将依赖项添加到我们的 _pom.xml_ 文件中：

```
```<dependency>```
    ```<groupId>```io.projectreactor```</groupId>```
    ```<artifactId>```reactor-core```</artifactId>```
```</dependency>```
```

现在，让我们将我们的服务方法实现添加到 `OrderQueryService` 中：

```
public class OrderQueryService {
    public Flux````<OrderResponse>```` orderUpdates(String orderId) {
        return subscriptionQuery(new OrderUpdatesQuery(orderId), ResponseTypes.instanceOf(Order.class))
                .map(OrderResponse::new);

    }

    private `<Q, R>` Flux``<R>`` subscriptionQuery(Q query, ResponseType``<R>`` resultType) {
        SubscriptionQueryResult`<R, R>` result = queryGateway.subscriptionQuery(query,
          resultType, resultType);
        return result.initialResult()
          .concatWith(result.updates())
          .doFinally(signal -> result.close());
    }

    // 我们的其他服务方法
}
```

上面的公共 `orderUpdates()` 方法将大部分工作委托给我们的私有便捷方法 `subscriptionQuery()`，尽管我们再次将响应打包为 `OrderResponse` 对象，因此我们没有暴露我们的内部 `Order` 对象。

我们通用的 `subscriptionQuery()` 便捷方法是我们将从 Axon 获取的初始结果与任何未来的更新结合起来的地方。

首先，我们调用 Axon 的 `queryGateway.subscriptionQuery()` 来获取一个 `SubscriptionQueryResult` 对象。我们向 `queryGateway.subscriptionQuery()` 提供 `resultType` 是因为我们总是期望得到一个 `Order` 对象，但如果我们想的话，我们也可以使用不同的类型来更新。

接下来，我们使用 `result.getInitialResult()` 和 `result.getUpdates()` 来获取我们需要完成订阅的所有信息。

最后，我们关闭流。

虽然我们这里没有使用，但还有一个 Axon Framework 的响应式扩展，它提供了一个替代的查询网关，可以使使用订阅查询变得更容易。

#### 6.5. 测试我们的订阅查询

为了帮助我们测试返回 `Flux` 的服务方法，我们将使用我们从 reactor-test 依赖项中得到的 `StepVerifier` 类：

```
```<dependency>```
    ```<groupId>```io.projectreactor```</groupId>```
    ```<artifactId>```reactor-test```</artifactId>```
    ``<scope>``test``</scope>``
```</dependency>```
```

让我们添加我们的测试：

```
class OrderQueryServiceIntegrationTest {
    @Test
    void givenOrdersAreUpdated_whenCallingOrderUpdates_thenUpdatesReturned() {
        ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
        executor.schedule(this::addIncrementDecrementConfirmAndShip, 100L, TimeUnit.MILLISECONDS);
        try {
            StepVerifier.create(queryService.orderUpdates(orderId))
              .assertNext(order -> assertTrue(order.getProducts().isEmpty()))
              .assertNext(order -> assertEquals(1, order