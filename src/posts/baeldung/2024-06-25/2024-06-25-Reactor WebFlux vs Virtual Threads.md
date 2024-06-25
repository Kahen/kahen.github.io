---
date: 2024-06-26
category:
  - Java
  - WebFlux
tag:
  - Reactor
  - Virtual Threads
head:
  - - meta
    - name: keywords
      content: Java, WebFlux, Virtual Threads, 异步编程, 响应式编程
---
# Reactor WebFlux 与虚拟线程 | Baeldung

在本教程中，我们将比较 Java 19 的虚拟线程与 Reactor 项目的 WebFlux。我们将首先回顾每种方法的基本工作原理，然后分析它们的优势和劣势。

我们将从探索响应式框架的优势开始，并看看为什么 WebFlux 仍然具有价值。之后，我们将讨论每个请求一个线程的方法，并强调虚拟线程可能是更好选择的场景。

## 2. 代码示例

在本文的代码示例中，我们假设我们正在开发一个电子商务应用程序的后端。我们将专注于负责计算和发布添加到购物车中的商品价格的函数：

```java
class ProductService {
    private final String PRODUCT_ADDED_TO_CART_TOPIC = "product-added-to-cart";

    private final ProductRepository repository;
    private final DiscountService discountService;
    private final KafkaTemplate`<String, ProductAddedToCartEvent>` kafkaTemplate;

    // 构造函数

    public void addProductToCart(String productId, String cartId) {
        Product product = repository.findById(productId)
          .orElseThrow(() -> new IllegalArgumentException("not found!"));

        Price price = product.basePrice();
        if (product.category().isEligibleForDiscount()) {
            BigDecimal discount = discountService.discountForProduct(productId);
            price.setValue(price.getValue().subtract(discount));
        }

        var event = new ProductAddedToCartEvent(productId, price.getValue(), price.getCurrency(), cartId);
        kafkaTemplate.send(PRODUCT_ADDED_TO_CART_TOPIC, cartId, event);
    }
}
```

正如我们所看到的，我们首先使用 _MongoRepository_ 从 MongoDB 数据库中检索 _Product_。检索到后，我们确定 _Product_ 是否符合折扣条件。如果符合，我们使用 _DiscountService_ 执行 HTTP 请求以确定产品是否有可用的折扣。

最后，我们计算产品的价格。完成后，我们发送一个包含 _productId, cartId_ 和计算出的价格的 Kafka 消息。

**WebFlux 是一个用于构建异步、非阻塞和事件驱动应用程序的框架**。它基于响应式编程原则，利用 _Flux_ 和 _Mono_ 类型来处理异步通信的复杂性。这些类型实现了发布者-订阅者设计模式，解耦了数据的消费者和生产者。

### 3.1. 响应式库

**Spring 生态系统中的许多模块与 WebFlux 集成，用于响应式编程**。让我们在重构代码向响应式范式转变时使用这些模块。

例如，我们可以将 _MongoRepository_ 切换到 _ReactiveMongoRepository_。这个变化意味着我们将不得不使用 _Mono````<Product>````_ 而不是 _Optional````<Product>````_：

```java
Mono````<Product>```` product = repository.findById(productId)
  .switchIfEmpty(Mono.error(() -> new IllegalArgumentException("not found!")));
```

同样，我们可以改变 _ProductService_，使其异步且非阻塞。例如，我们可以使用 WebClient 执行 HTTP 请求，并相应地返回折扣作为 _Mono``<BigDecimal>``_：

```java
Mono``<BigDecimal>`` discount = discountService.discountForProduct(productId);
```

### 3.2. 不可变性

**在函数式和响应式编程范式中，不可变性总是比可变数据更受青睐**。我们最初的方法涉及使用 setter 修改 _Price_ 的值。然而，随着我们转向响应式方法，让我们重构 _Price_ 对象并使其不可变。

例如，我们可以引入一个专用方法来应用折扣并生成一个新的 _Price_ 实例，而不是修改现有的实例：

```java
record Price(BigDecimal value, String currency) {
    public Price applyDiscount(BigDecimal discount) {
        return new Price(value.subtract(discount), currency);
    }
}
```

现在，我们可以使用 WebFlux 的 _map()_ 方法，根据折扣计算新价格：

```java
Mono````<Price>```` price = discountService.discountForProduct(productId)
  .map(discount -> price.applyDiscount(discount));
```

此外，我们甚至可以在这里使用方法引用，以保持代码紧凑：

```java
Mono````<Price>```` price = discountService.discountForProduct(productId).map(price::applyDiscount);
```

### 3.3. 函数式流水线

**_Mono_ 和 _Flux_ 遵循 functor 和 monad 模式，通过 _map()_ 和 _flatMap()_ 等方法。这允许我们将用例描述为不可变数据上的转换流水线**。

让我们尝试确定我们用例所需的转换：

- 我们从原始的 _productId_ 开始
- 我们将其转换为 _Product_
- 我们使用 _Product_ 计算 _Price_
- 我们使用 _Price_ 创建一个 _event_
- 最后，我们在消息队列上发布 _event_

现在，让我们重构代码以反映这个函数链：

```java
void addProductToCart(String productId, String cartId) {
    Mono````<Product>```` productMono = repository.findById(productId)
      .switchIfEmpty(Mono.error(() -> new IllegalArgumentException("not found!")));

    Mono````<Price>```` priceMono = productMono.flatMap(product -> {
        if (product.category().isEligibleForDiscount()) {
            return discountService.discountForProduct(productId)
              .map(product.basePrice()::applyDiscount);
        }
        return Mono.just(product.basePrice());
    });

    Mono`<ProductAddedToCartEvent>` eventMono = priceMono.map(
      price -> new ProductAddedToCartEvent(productId, price.value(), price.currency(), cartId));

    eventMono.subscribe(event -> kafkaTemplate.send(PRODUCT_ADDED_TO_CART_TOPIC, cartId, event));
}
```

现在，让我们内联局部变量以保持代码紧凑。此外，让我们提取一个计算价格的函数，并在 _flatMap()_ 内部使用它：

```java
void addProductToCart(String productId, String cartId) {
    repository.findById(productId)
      .switchIfEmpty(Mono.error(() -> new IllegalArgumentException("not found!")))
      .flatMap(this::computePrice)
      .map(price -> new ProductAddedToCartEvent(productId, price.value(), price.currency(), cartId))
      .subscribe(event -> kafkaTemplate.send(PRODUCT_ADDED_TO_CART_TOPIC, cartId, event));
}

Mono````<Price>```` computePrice(Product product) {
    if (product.category().isEligibleForDiscount()) {
        return discountService.discountForProduct(product.id())
          .map(product.basePrice()::applyDiscount);
    }
    return Mono.just(product.basePrice());
}
```

## 4. 虚拟线程

**虚拟线程是通过 Project Loom 作为并行处理的替代解决方案引入 Java 的**。它们是轻量级的，由 Java 虚拟机 (JVM) 管理的用户模式线程。因此，它们特别适合 I/O 操作，其中传统线程可能在等待外部资源上花费大量时间。

与传统的异步或响应式解决方案不同，虚拟线程使我们能够继续使用每个请求一个线程的处理模型。换句话说，我们可以继续顺序编写代码，而不需要混合业务逻辑和响应式 API。

### 4.1. 虚拟线程

有几种方法可以利用虚拟线程执行我们的代码。**对于单个方法，如前一个示例中演示的那样，我们可以使用 _startVirtualThread()_。** 这个静态方法是最近添加到 _Thread_ API 中的，它在一个新的虚拟线程上执行一个 _Runnable_：

```java
public void addProductToCart(String productId, String cartId) {
    Thread.startVirtualThread(() -> computePriceAndPublishMessage(productId, cartId));
}

private void computePriceAndPublishMessage(String productId, String cartId) {
    // ...
}
```

**或者，我们可以创建一个依赖于虚拟线程的 _ExecutorService_，使用新的静态工厂方法 _Executors.newVirtualThreadPerTaskExecutor()_。** 此外，对于使用 Spring Framework 6 和 Spring Boot 3 的应用程序，我们可以利用新的 _Executor_ 并配置 Spring 以优先使用虚拟线程而不是平台线程。

### 4.2. 兼容性

虚拟线程通过使用更传统的同步编程模型来简化代码。因此，我们可以以顺序的方式编写代码，类似于阻塞 I/O 操作，而不必担心显式的响应式结构。

**此外，我们可以从常规的单线程代码无缝切换到虚拟线程，几乎不需要或不需要进行修改**。例如，在我们之前的示例中，我们只需要使用静态工厂方法 _startVirtualThread()_ 创建一个虚拟线程，并在其中执行逻辑：

```java
void addProductToCart(String productId, String cartId) {
    Thread.startVirtualThread(() -> computePriceAndPublishMessage(productId, cartId));

    void computePriceAndPublishMessage(String productId, String cartId) {
        Product product = repository.findById(productId)
          .orElseThrow(() -> new IllegalArgumentException("not found!"));

        Price price = computePrice(productId, product);

        var event = new ProductAddedToCartEvent(productId, price.value(), price.currency(), cartId);
        kafkaTemplate.send(PRODUCT_ADDED_TO_CART_TOPIC, cartId, event);
    }

    Price computePrice(String productId, Product product) {
        if (product.category().isEligibleForDiscount()) {
            BigDecimal discount = discountService.discountForProduct(productId);
            return product.basePrice().applyDiscount(discount);
        }
        return product.basePrice();
    }
}
```

### 4.3. 可读性

**使用每个请求一个线程的处理模型，可以更容易地理解和推理业务逻辑。这可以减少与响应式编程范式相关的认知负担。**

换句话说，虚拟线程允许我们清晰地将技术问题与我们的业务逻辑分开。因此，它消除了在实现我们的业务用例时需要外部 API 的需求。

## 5. 结论

在本文中，我们比较了两种不同的并发和异步处理方法。我们首先分析了 Reactor 的 WebFlux 和响应式编程范式。我们发现这种方法偏爱不可变对象和函数式流水线。

之后，我们讨论了虚拟线程以及它们与允许平滑过渡到非阻塞代码的旧代码库的卓越兼容性。此外，它们还有将业务逻辑与基础设施代码和其他技术问题清晰分离的额外好处。

像往常一样，本文中使用的所有代码示例都可以在 GitHub 上找到。

OK