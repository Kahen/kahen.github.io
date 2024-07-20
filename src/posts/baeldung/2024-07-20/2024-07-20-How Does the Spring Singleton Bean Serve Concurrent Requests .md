---
date: 2022-04-26
category:
  - Spring Framework
  - Concurrency
tag:
  - Spring Singleton
  - Concurrency
head:
  - - meta
    - name: keywords
      content: Spring, Singleton, Concurrency, Java, Heap Memory, Stateless, Stateful
---
# Spring单例Bean如何处理并发请求？

在本教程中，我们将学习Spring使用_singleton_作用域创建的Bean是如何在后台处理多个并发请求的。此外，我们将了解Java如何在内存中存储Bean实例以及如何处理对它们的并发访问。

## 2. Spring Bean和Java堆内存

正如我们所知，Java堆是一个全局共享的内存，应用程序内所有运行的线程都可以访问。**当Spring容器使用单例作用域创建一个Bean时，该Bean存储在堆中。**这样，所有并发线程都能够指向同一个Bean实例。

接下来，让我们理解线程的栈内存是什么以及它如何帮助服务并发请求。

## 3. 如何服务并发请求？

以一个包含名为_ProductService_的单例Bean的Spring应用程序为例：

```java
@Service
public class ProductService {
    private final static List```<Product>``` productRepository = asList(
      new Product(1, "Product 1", new Stock(100)),
      new Product(2, "Product 2", new Stock(50))
    );

    public Optional```<Product>``` getProductById(int id) {
        Optional```<Product>``` product = productRepository.stream()
          .filter(p -> p.getId() == id)
          .findFirst();
        String productName = product.map(Product::getName)
          .orElse(null);

        System.out.printf("Thread: %s; bean instance: %s; product id: %s has the name: %s%n", currentThread().getName(), this, id, productName);

        return product;
    }
}
```

这个Bean有一个_getProductById()_方法，它向调用者返回产品数据。此外，这个Bean返回的数据在端点_/product/{id}_上暴露给客户端。

接下来，让我们探索在运行时当同时调用端点_/product/{id}_时会发生什么。具体来说，第一个线程将调用端点_/product/1_，第二个线程将调用_/product/2_。

Spring为每个请求创建一个不同的线程。正如我们在控制台输出中看到的，两个线程使用相同的_ProductService_实例来返回产品数据：

```java
Thread: pool-2-thread-1; bean instance: com.baeldung.concurrentrequest.ProductService@18333b93; product id: 1 has the name: Product 1
Thread: pool-2-thread-2; bean instance: com.baeldung.concurrentrequest.ProductService@18333b93; product id: 2 has the name: Product 2
```

Spring能够在多个线程中使用相同的Bean实例，首先是因为对于每个线程，Java都创建了一个私有的栈内存。

**栈内存负责存储在线程执行期间方法内部使用的局部变量的状态。**这样，Java确保并行执行的线程不会覆盖彼此的变量。

其次，因为_ProductService_ Bean在堆级别没有设置任何限制或锁，**每个线程的程序计数器能够指向堆内存中相同的Bean实例引用。**因此，两个线程可以同时执行_getProdcutById()_方法。

接下来，我们将了解为什么单例Bean是无状态的至关重要。

## 4. 无状态的单例Bean与有状态的单例Bean

为了理解为什么无状态的单例Bean很重要，让我们看看使用有状态的单例Bean的副作用是什么。

假设我们将_productName_变量移动到类级别：

```java
@Service
public class ProductService {
    private String productName = null;

    // ...

    public Optional getProductById(int id) {
        // ...

        productName = product.map(Product::getName).orElse(null);

       // ...
    }
}
```

现在，我们再次运行服务并查看输出：

```java
Thread: pool-2-thread-2; bean instance: com.baeldung.concurrentrequest.ProductService@7352a12e; product id: 2 has the name: Product 2
Thread: pool-2-thread-1; bean instance: com.baeldung.concurrentrequest.ProductService@7352a12e; product id: 1 has the name: Product 2
```

正如我们所看到的，对_productId_ 1的调用显示了_productName_ "Product 2"而不是 "Product 1"。这是因为_ProductService_是有状态的，并与所有运行的线程共享相同的_productName_变量。

**为了避免像这样的不良副作用，保持我们的单例Bean无状态至关重要。**

## 5. 结论

在本文中，我们看到了Spring中单例Bean的并发访问是如何工作的。首先，我们看到了Java如何在堆内存中存储单例Bean。接下来，我们学习了不同的线程如何从堆中访问相同的单例实例。最后，我们讨论了拥有无状态Bean的重要性，并查看了一个示例，说明了如果Bean不是无状态的会发生什么。

如常，这些示例的代码可以在GitHub上找到。