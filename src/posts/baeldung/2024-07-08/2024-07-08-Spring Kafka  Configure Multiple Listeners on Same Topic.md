---
date: 2022-04-01
category:
  - Spring Kafka
  - Kafka Listener
tag:
  - Kafka
  - Spring Boot
  - Listeners
head:
  - - meta
    - name: keywords
      content: Spring Kafka, Kafka Listener, Multiple Listeners, Same Topic, Configuration
---
# Spring Kafka：在同一主题上配置多个监听器

在本文中，我们将通过一个实际示例学习如何为同一个Kafka主题配置多个监听器。

如果这是您第一次在Spring上配置Kafka，最好从我们的Apache Kafka与Spring入门开始。

## 2. 项目设置

让我们构建一个书籍消费者服务，监听图书馆内新到的书籍，并为不同目的消费它们，如全文内容搜索、价格索引或用户通知。

首先，让我们创建一个Spring Boot服务，并使用`spring-kafka`依赖项：

```xml
`<dependency>`
    `<groupId>`org.springframework.kafka`</groupId>`
    `<artifactId>`spring-kafka`</artifactId>`
`</dependency>`
```

此外，让我们定义监听器将消费的`BookEvent`：

```java
public class BookEvent {
    private String title;
    private String description;
    private Double price;

    // 标准构造函数，getter和setter
}
```

## 3. 生产消息

Kafka生产者对生态系统至关重要，因为生产者将消息写入Kafka集群。考虑到这一点，我们首先需要定义一个生产者，将消息写入稍后由消费者应用程序消费的主题。

以我们的示例为例，让我们编写一个简单的Kafka生产者函数，将新的`BookEvent`对象写入“books”主题。

```java
private static final String TOPIC = "books";

@Autowired
private KafkaTemplate````<String, BookEvent>```` bookEventKafkaTemplate;

public void sentBookEvent(BookEvent book){
    bookEventKafkaTemplate.send(TOPIC, UUID.randomUUID().toString(), book);
}
```

## 4. 从多个监听器消费相同的Kafka主题

Kafka消费者是订阅Kafka集群一个或多个主题的客户端应用程序。稍后，我们将看到如何在同一个主题上设置多个监听器。

### 4.1. 消费者配置

首先，要配置一个消费者，我们需要定义监听器将需要的`ConcurrentKafkaListenerContainerFactory` Bean。

现在，让我们定义我们将用于消费`BookEvent`对象的容器工厂：

```java
@EnableKafka
@Configuration
public class KafkaConsumerConfig {

    @Bean
    public ConcurrentKafkaListenerContainerFactory````<String, BookEvent>```` kafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory````<String, BookEvent>```` factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory());
        return factory;
    }

    public ConsumerFactory````<String, BookEvent>```` consumerFactory(String groupId) {
        Map`<String, Object>` props = new HashMap<>();

        // 所需的消费者工厂属性

        return new DefaultKafkaConsumerFactory<>(props);
    }
}
```

接下来，我们将查看收听传入消息的不同策略。

### 4.2. 同一消费者组中的多个监听器

将多个监听器添加到同一消费者组的策略之一是增加同一消费者组中的并发级别。因此，我们可以在`@KafkaListener`注解中简单地指定这一点。

为了理解这是如何工作的，让我们为我们的图书馆定义一个通知监听器：

```java
@KafkaListener(topics = "books", groupId = "book-notification-consumer", concurrency = "2")
public void bookNotificationConsumer(BookEvent event) {
    logger.info("Books event received for notification => {}", event);
}
```

接下来，让我们看看发布三条消息后的控制台输出。此外，让我们理解为什么消息只消费一次：

```
Books event received for notification => BookEvent(title=book 1, description=description 1, price=1.0)
Books event received for notification => BookEvent(title=book 2, description=description 2, price=2.0)
Books event received for notification => BookEvent(title=book 3, description=description 3, price=3.0)
```

这是因为，内部地，**对于每个并发级别，Kafka在同一个消费者组内实例化一个新的监听器**。此外，同一消费者组内所有监听器实例的范围是将消息分配给彼此，以更快地完成工作并提高吞吐量。

### 4.3. 不同消费者组中的多个监听器

如果我们需要多次消费相同的消息并为每个监听器应用不同的处理逻辑，我们必须配置`@KafkaListener`以具有不同的组ID。通过这样做，**Kafka将为每个监听器创建专用的消费者组，并将所有发布的消息推送到每个监听器**。

让我们通过定义一个用于全文搜索索引的监听器和一个负责价格索引的监听器来看到这种策略的实际应用。两者都将监听相同的“books”主题：

```java
@KafkaListener(topics = "books", groupId = "books-content-search")
public void bookContentSearchConsumer(BookEvent event) {
    logger.info("Books event received for full-text search indexing => {}", event);
}

@KafkaListener(topics = "books", groupId = "books-price-index")
public void bookPriceIndexerConsumer(BookEvent event) {
    logger.info("Books event received for price indexing => {}", event);
}
```

现在，让我们运行上述代码并分析输出：

```
Books event received for price indexing => BookEvent(title=book 1, description=description 1, price=1.0)
Books event received for full-text search indexing => BookEvent(title=book 1, description=description 1, price=1.0)
Books event received for full-text search indexing => BookEvent(title=book 2, description=description 2, price=2.0)
Books event received for price indexing => BookEvent(title=book 2, description=description 2, price=2.0)
Books event received for full-text search indexing => BookEvent(title=book 3, description=description 3, price=3.0)
Books event received for price indexing => BookEvent(title=book 3, description=description 3, price=3.0)
```

正如我们所看到的，两个监听器都接收每个`BookEvent`，并可以为所有传入的消息应用独立的处理逻辑。

## 5. 使用不同的监听器策略

正如我们已经学到的，我们可以通过配置`@KafkaListener`注解的并发属性大于一，或者通过定义多个监听相同Kafka主题并具有不同消费者ID的`@KafkaListener`方法来设置多个监听器。

选择一种策略或另一种取决于我们想要实现的目标。只要我们解决性能问题以通过更快地处理消息来增加吞吐量，正确的策略就是增加同一消费者组中的监听器数量。

然而，为了多次处理相同的消息以满足不同的要求，我们应该定义专用的监听器，这些监听器具有不同的消费者组，并且监听相同的主题。

作为一般规则，我们应该为我们需要满足的每个要求使用一个消费者组，如果我们需要使该监听器更快，我们可以增加同一消费者组中的监听器数量。

## 6. 结论

在本文中，我们学习了如何使用Spring Kafka库为同一主题配置多个监听器，通过一个实际的图书馆示例。我们从生产者和消费者配置开始，并继续探讨了为同一主题添加多个监听器的不同方式。

如往常一样，示例的完整源代码可以在GitHub上找到。