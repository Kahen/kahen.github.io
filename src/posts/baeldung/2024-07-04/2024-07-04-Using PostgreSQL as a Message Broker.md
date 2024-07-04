---
date: 2024-07-04
category:
  - Spring
  - PostgreSQL
tag:
  - LISTEN/NOTIFY
  - 消息代理
  - Spring Boot
head:
  - - meta
    - name: keywords
      content: PostgreSQL, Spring Boot, 消息代理, LISTEN/NOTIFY
---

# 使用PostgreSQL作为消息代理

在本教程中，我们将学习如何使用PostgreSQL的_LISTEN/NOTIFY_命令来实现一个简单的消息代理机制。

## 2. PostgreSQL的_LISTEN/NOTIFY_机制简介

简单来说，这些命令允许连接的客户端通过常规的PostgreSQL连接交换消息。客户端使用_NOTIFY_命令向一个_channel_发送通知，还可以附带一个可选的字符串有效载荷。

_channel_可以是任何有效的SQL标识符，它在传统的消息系统中像主题一样工作。这意味着有效载荷将被发送到该特定_channel_的所有活动监听者。如果没有附带有效载荷，监听者将只收到一个空的通知。

要开始接收通知，客户端使用_LISTEN_命令，它以_channel_名称作为其唯一参数。此命令立即返回，允许客户端使用相同的连接继续执行其他任务。

通知机制有一些重要属性：
- _Channel_名称在数据库内是唯一的
- 客户端无需特殊授权即可使用_LISTEN/NOTIFY_
- 如果在事务中使用_NOTIFY_，只有在事务成功完成时客户端才会收到通知

此外，如果在同一事务中向同一个_channel_发送多个具有相同有效载荷的_NOTIFY_命令，客户端将只收到一个通知。

## 3. 使用PostgreSQL作为消息代理的理由

考虑到PostgreSQL通知的特性，我们可能会想知道何时使用它而不是像RabbitMQ这样的完整消息代理是一个可行的选择。像往常一样，有一些权衡。一般来说，选择后者意味着：
- 更多复杂性——消息代理是另一个必须监控、升级等的组件
- 处理分布式事务带来的故障模式

通知机制不受这些问题的影响：
- 假设我们使用PostgreSQL作为主数据库，该功能已经就绪
- 没有分布式事务

当然，也有限制：
- 这是一个专有机制，需要永久采用PostgreSQL（或者至少直到进行重大重构）
- 没有对持久订阅者的直接支持。在客户端开始监听消息之前发送的通知将丢失

即使有这些限制，这个机制也有一些潜在的应用：
- 在“模块化单体”风格应用程序中的通知总线
- 分布式缓存失效
- 使用普通数据库表作为队列的轻量级消息代理
- 事件源架构

## 4. 在Spring Boot应用程序中使用_LISTEN/NOTIFY_

现在我们已经对_LISTEN/NOTIFY_机制有了基本的了解，让我们继续构建一个使用它的简单Spring Boot测试应用程序。我们将创建一个简单的API，允许我们提交买卖订单。有效载荷包括我们愿意购买或出售的证券符号、价格和数量。我们还将添加一个API，允许我们根据其标识符查询订单。

到目前为止，没有什么特别的。但这里有一个问题：**我们希望在将订单插入数据库后立即开始从缓存中提供订单查询服务**。当然，我们可以实现缓存写入，但在需要扩展服务的分布式场景中，我们也需要一个分布式缓存。

这就是通知机制派上用场的地方：**我们将在每次插入时发送一个_NOTIFY_，客户端将使用_LISTEN_将订单预加载到它们各自的本地缓存中**。

### 4.1. 项目依赖

我们的示例应用程序需要一个WebMVC SpringBoot应用程序的标准依赖集，以及PostgreSQL驱动程序：

```xml
```<dependency>```
    ```<groupId>```org.springframework.boot```</groupId>```
    ```<artifactId>```spring-boot-starter-web```</artifactId>```
    ```<version>```2.7.12```</version>```
```</dependency>```
```<dependency>```
    ```<groupId>```org.springframework.boot```</groupId>```
    ```<artifactId>```spring-boot-starter-data-jdbc```</artifactId>```
    ```<version>```2.7.12```</version>```
```</dependency>```
```<dependency>```
    ```<groupId>```org.postgresql```</groupId>```
    ```<artifactId>```postgresql```</artifactId>```
    ```<version>```42.6.0```</version>```
```</dependency>```
```

_spring-boot-starter-web_、spring-boot-starter-data-jdbc和postgresql的最新版本可在Maven Central上找到。

### 4.2. 通知服务

由于通知机制特定于PostgreSQL，我们将在单个类中封装其一般行为：_NotifierService_。这样做可以避免这些细节泄露到应用程序的其他部分。这也简化了单元测试，因为我们可以用模拟版本替换此服务来实现不同的场景。

_NotifierService_有两个职责。首先，它提供了一个发送订单相关通知的门面：

```java
public class NotifierService {
    private static final String ORDERS_CHANNEL = "orders";
    private final JdbcTemplate tpl;

    @Transactional
    public void notifyOrderCreated(Order order) {
        tpl.execute("NOTIFY " + ORDERS_CHANNEL + ", '" + order.getId() + "'");
    }
   // ... 其他方法省略
}
```

其次，它有一个用于_Runnable_实例的工厂方法，应用程序使用这些实例来接收通知。这个工厂接受一个_Consumer_`<_PGNotification_>`对象，它有方法来检索与通知相关联的_channel_和_payload_：

```java
public Runnable createNotificationHandler(Consumer``<PGNotification>`` consumer) {
    return () -> {
        tpl.execute((Connection c) -> {
            c.createStatement().execute("LISTEN " + ORDERS_CHANNEL);
            PGConnection pgconn = c.unwrap(PGConnection.class);
            while(!Thread.currentThread().isInterrupted()) {
                PGNotification[] nts = pgconn.getNotifications(10000);
                if ( nts == null || nts.length == 0 ) {
                    continue;
                }
                for( PGNotification nt : nts) {
                    consumer.accept(nt);
                }
            }
            return 0;
        });
    };
}
```

在这里，我们选择传递原始_PGNotification_以简化。在现实世界的场景中，我们通常会处理多个领域实体，我们可以使用泛型或类似技术扩展这个类以避免代码重复。

关于创建的_Runnable_的一些说明：
- 数据库相关的逻辑使用提供的_JdbcTemplate_的_execute()_方法。这确保了适当的连接处理/清理并简化了错误处理
- 回调一直运行，直到当前线程被中断或某些运行时错误导致它返回

注意使用_PGConnection_而不标准的JDBC_Connection_。我们需要这个来直接访问_getNotifications()_方法，该方法返回一个或多个排队的通知。

_getNotifications()_有两个变体。当不带参数调用时，它会轮询任何待处理的通知并返回它们。如果没有，它返回null。第二个变体接受一个整数，对应于等待通知的最大时间，直到返回null。最后，如果我们将0（零）作为超时值传递，_getNotifications()_将阻塞直到新的通知到达。

在应用程序初始化期间，我们使用一个_Configuration类_中的_CommandLineRunner_ bean，它将启动一个新的_Thread实际上开始接收通知_：

```java
@Configuration
public class ListenerConfiguration {

    @Bean
    CommandLineRunner startListener(NotifierService notifier, NotificationHandler handler) {
        return (args) -> {
            Runnable listener = notifier.createNotificationHandler(handler);
            Thread t = new Thread(listener, "order-listener");
            t.start();
        };
    }
}
```

### 4.3. 连接处理

**虽然技术上是可能的，但使用相同的连接处理通知和常规查询并不方便**。人们将不得不在控制流中分散调用_getNotification()_，导致代码难以阅读和维护。

相反，标准做法是运行一个或多个专用线程来处理通知。每个线程都有自己的连接，这些连接将一直保持打开状态。**这可能会在由Hikari或DBCP等池创建的连接中引起问题**。

为了避免这些问题，我们的示例创建了一个专用的_DriverDataSource_，我们反过来使用它来创建_NotifierService_所需的_JdbcTemplate_：

```java
@Configuration
public class NotifierConfiguration {

    @Bean
    NotifierService notifier(DataSourceProperties props) {

        DriverDataSource ds = new DriverDataSource(
          props.determineUrl(),
          props.determineDriverClassName(),
          new Properties(),
          props.determineUsername(),
          props.determinePassword());

        JdbcTemplate tpl = new JdbcTemplate(ds);
        return new NotifierService(tpl);
    }
}
```

注意我们共享了用于创建主Spring管理_DataSource_的相同连接属性。**然而，我们没有将这个专用_DataSource_作为bean公开，这将禁用Spring Boot的自动配置功能。**

### 4.4. 通知处理程序

缓存逻辑的最后一部分是_NotificationHandler_类，它实现了_Consumer_`<_Notification_>`接口。这个类的作用是处理单个通知，并将配置的_Cache_填充_Order_实例：

```java
@Component
public class NotificationHandler implements Consumer``<PGNotification>`` {
    private final OrdersService orders;

    @Override
    public void accept(PGNotification t) {
        Optional```<Order>``` order = orders.findById(Long.valueOf(t.getParameter()));
        // ... 日志消息省略
    }
}
```

实现使用_getName()_和_getParameter()_从通知中检索_channel_名称和订单标识符。在这里，我们可以假设通知总是预期的。这不是出于懒惰，而是源于_NotifierService_构造这个处理程序将被调用的_Runnable_的方式。

实际的逻辑很直接：我们使用OrderRepository_从数据库中获取_Order_并将其添加到缓存中：

```java
@Service
public class OrdersService {
    private final OrdersRepository repo;
    // ... 其他私有字段省略

    @Transactional(readOnly = true)
    public Optional```<Order>``` findById(Long id) {
        Optional```<Order>``` o = Optional.ofNullable(ordersCache.get(id, Order.class));
        if (!o.isEmpty()) {
            log.info("findById: cache hit, id={}", id);
            return o;
        }
        log.info("findById: cache miss, id={}", id);
        o = repo.findById(id);
        if (o.isEmpty()) {
            return o;
        }
        ordersCache.put(id, o.get());
        return o;
    }
}
```

## 5. 测试

**要看到通知机制的实际运行，最好的方法是启动两个或更多的测试应用程序实例，每个实例配置在不同的端口上**。我们还需要一个工作的PostgreSQL实例，这两个实例都将连接到它。请参阅_application.properties_文件，并使用您的PostgreSQL实例连接详细信息进行修改。

接下来，为了启动我们的测试环境，我们将打开两个shell，并使用Maven运行应用程序。项目的_pom.xml_包含一个额外的配置文件，_instance1_，它将在不同的端口上启动应用程序：

```shell
# 第一个shell:
$ mvn spring-boot:run
... 许多消息（省略）
[ restartedMain] o.s.b.w.embedded.tomcat.TomcatWebServer : Tomcat started on port(s): 8080 (http) with context path ''
[ restartedMain] c.b.messaging.postgresql.Application : Started Application in 2.615 seconds (JVM running for 2.944)
[ restartedMain] c.b.m.p.config.ListenerConfiguration : Starting order listener thread...
[ order-listener] c.b.m.p.service.NotifierService : notificationHandler: sending LISTEN command...

# 第二个shell
... 许多息（省略）
[ restartedMain] o.s.b.w.embedded.tomcat.TomcatWebServer : Tomcat started on port(s): 8081 (http) with context path ''
[ restartedMain] c.b.messaging.postgresql.Application : Started Application in 1.984 seconds (JVM running for 2.274)
[ restartedMain] c.b.m.p.config.ListenerConfiguration : Starting order listener thread...
[ order-listener] c.b.m.p.service.NotifierService : notificationHandler: sending LISTEN command...
```

过一段时间后，我们应该在每一个上看到一个日志消息，告诉我们应用程序已准备好接收请求。现在，让我们使用_curl_在另一个shell上创建我们的第一个_Order_：

```shell
$ curl --location 'http://localhost:8080/orders/buy' \
--form 'symbol="BAEL"' \
--form 'price="13.34"' \
--form 'quantity="500"'
{"id":30,"symbol":"BAEL","orderType":"BUY","price":13.34,"quantity":500}
```

运行在端口8080上的应用程序实例将打印一些消息。**我们还将在8081实例日志中看到它收到了一个通知**：

```shell
[ order-listener] c.b.m.p.service.NotificationHandler : Notification received: pid=5141, name=orders, param=30
[ order-listener] c.b.m.postgresql.service.OrdersService : findById: cache miss, id=30
[ order-listener] c.b.m.p.service.NotificationHandler : order details: Order(id=30, symbol=BAEL, orderType=BUY, price=13.34, quantity=500.00)
```

这证明了机制按预期工作。

最后，我们可以再次使用_curl_在_instance1_上查询创建的Order：

```shell
curl http://localhost:8081/orders/30
{"id":30,"symbol":"BAEL","orderType":"BUY","price":13.34,"quantity":500.00}
```

正如预期的那样，我们得到了_Order_的详细信息。**此外，应用程序日志还显示这些信息来自缓存**：

```shell
[nio-8081-exec-1] c.b.m.postgresql.service.OrdersService : findById: cache hit, id=30
```

## 6. 结论

在本文中，我们介绍了PostgreSQL的_NOTIFY/LISTEN_机制以及如何使用它来实现一个无需额外组件的轻量级消息代理。

像往常一样，所有代码都可以在GitHub上找到。

[文章结束]

OK