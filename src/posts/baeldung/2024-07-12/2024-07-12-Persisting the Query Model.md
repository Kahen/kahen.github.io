---
date: 2022-04-01
category:
  - Axon
  - Spring Boot
tag:
  - Axon Framework
  - MongoDB
head:
  - - meta
    - name: keywords
      content: Axon Framework, MongoDB, Event Sourcing, Query Model
---
# Axon框架持久化查询模型

Axon框架帮助我们构建事件驱动的微服务系统。在Axon框架的指南中，我们通过一个简单的Axon Spring Boot应用程序来了解Axon，其中包括构建了一个示例_订单_模型，供我们更新和查询。在Axon框架中分发查询时，我们添加了所有支持的查询。

本文将**研究Axon框架的查询模型持久化**。我们将涵盖使用MongoDB存储投影，以及测试的挑战以及如何保持流与查询模型同步。

### 2.1. 令牌存储
构建查询模型时，Axon使用_TokenStore_来跟踪。理想情况下，令牌存储与查询模型存储在同一数据库中以确保一致性。使用持久的令牌存储还将确保我们可以运行多个实例，其中每个实例只需要处理部分事件。分割为多个实例可以使用段，其中实例可以申请处理所有或部分段。如果我们使用JPA或JDBC进行持久化，使用_JpaTokenStore_或JdbcTokenStore。这两种令牌存储实现都在Axon框架中可用，无需扩展。

### 3.1. 令牌存储
有了依赖关系，我们可以**配置Axon使用_MongoTokenStore_**：

```java
@Bean
public TokenStore getTokenStore(MongoClient client, Serializer serializer){
    return MongoTokenStore.builder()
      .mongoTemplate(
        DefaultMongoTemplate.builder()
          .mongoDatabase(client)
          .build()
      )
      .serializer(serializer)
      .build();
}
```

### 3.2. 事件处理类
当_mongo_配置文件处于活动状态时，使用_MongoOrdersEventHandler_，以及令牌存储配置。这共同**构成了事件处理类**：

```java
@Service
@ProcessingGroup("orders")
@Profile("mongo")
public class MongoOrdersEventHandler implements OrdersEventHandler {
    // 更新和查询投影的所有方法
}
```

同时，我们在_InMemoryOrdersEventHandler_中添加了`@Profile("!mongo")`，以确保两者不会同时处于活动状态。Spring配置文件是有条件地启用组件的极好方式。

我们将在构造函数中使用依赖注入来获取_MongoClient_和_QueryUpdateEmitter_。我们使用_MongoClient_来创建MongoCollection和索引。我们注入_QueryUpdateEmitter_以启用订阅查询：

```java
public MongoOrdersEventHandler(MongoClient client, QueryUpdateEmitter emitter) {
    orders = client
      .getDatabase(AXON_FRAMEWORK_DATABASE_NAME)
      .getCollection(ORDER_COLLECTION_NAME);
    orders.createIndex(Indexes.ascending(ORDER_ID_PROPERTY_NAME),
      new IndexOptions().unique(true));
    this.emitter = emitter;
}
```

请注意，我们将订单ID设置为唯一。这样，我们可以确保不会有两份具有相同订单ID的文档。

_MongoOrdersEventHandler_使用_orders_ mongo集合来处理查询。我们需要使用_documentToOrder()_方法将Mongo文档映射到订单：

```java
@QueryHandler
public List```<Order>``` handle(FindAllOrderedProductsQuery query) {
    List```<Order>``` orderList = new ArrayList<>();
    orders
      .find()
      .forEach(d -> orderList.add(documentToOrder(d)));
    return orderList;
}
```

### 3.3. 复杂查询
为了能够处理_TotalProductsShippedQuery_，我们添加了一个**_shippedProductFilter_，该过滤器筛选出已发货并具有产品的订单**：

```java
private Bson shippedProductFilter(String productId){
    return and(
      eq(ORDER_STATUS_PROPERTY_NAME, OrderStatus.SHIPPED.toString()),
      exists(String.format(PRODUCTS_PROPERTY_NAME + ".%s", productId))
    );
}
```

然后，该过滤器在查询处理中使用，提取并添加产品的计数：

```java
@QueryHandler
public Integer handle(TotalProductsShippedQuery query) {
    AtomicInteger result = new AtomicInteger();
    orders
      .find(shippedProductFilter(query.getProductId()))
      .map(d -> d.get(PRODUCTS_PROPERTY_NAME, Document.class))
      .map(d -> d.getInteger(query.getProductId(), 0))
      .forEach(result::addAndGet);
    return result.get();
}
```

此查询将获取所有已发货的产品，并检索这些文档中的所有产品。然后，它将计算查询的特定产品并返回总数。

### 4. 测试持久化查询模型
使用持久化模型进行测试可能会使事情变得更加困难，因为我们**希望每个测试都有隔离的环境**。

### 4.1. 单元测试
对于_MongoOrdersEventHandler_，**我们需要确保在每次测试后都删除集合，以便我们不会保留之前测试的状态**。我们通过实现_getHandler()_方法来实现这一点：

```java
@Override
protected OrdersEventHandler getHandler() {
    mongoClient.getDatabase("axonframework").drop();
    return new MongoOrdersEventHandler(mongoClient, emitter);
}
```

使用_@BeforeEach_注解的方法，我们可以确保每个测试都是从新开始的。在这种情况下，我们使用嵌入式Mongo进行测试。另一个选择是使用测试容器。在这方面，测试查询模型与其他需要数据库的应用程序测试没有区别。

### 4.2. 集成测试
对于集成测试，我们使用类似的方法。然而，由于集成测试使用_OrdersEventHandler_接口，**我们依赖于实现的_reset()_方法**。

_reset()_方法的实现是：

```java
@Override
public void reset(List```<Order>``` orderList) {
    orders.deleteMany(new Document());
    orderList.forEach(o -> orders.insertOne(orderToDocument(o)));
}
```

_reset()_方法确保只有列表中的订单是集合的一部分。该方法在_OrderQueryServiceIntegrationTest_中的每个测试之前执行：

```java
@BeforeEach
void setUp() {
    orderId = UUID.randomUUID().toString();
    Order order = new Order(orderId);
    handler.reset(Collections.singletonList(order));
}
```

至于测试查询，我们至少需要一个订单。通过已经存储一个订单，可以使测试本身变得更容易。

### 5. 结论
在本文中，我们展示了如何持久化查询模型。我们学习了如何使用MongoDB查询和测试模型。

如常，本文中使用的全部代码可以在GitHub上找到。