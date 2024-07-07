---
date: 2024-07-07
category:
  - Java
  - UUID
tag:
  - 编程
  - 技术
head:
  - - meta
    - name: keywords
      content: Java, UUID, 时间基UUID, 唯一标识符, 分布式系统
---
# 生成基于时间的UUID

在本文中，我们将学习关于UUID和基于时间的UUID。

**我们将看到基于时间的UUID的优势和劣势，以及何时选择它们。**

我们还将探索并比较一些库，这些库将帮助我们实现生成UUID的不同算法。

**UUID代表通用唯一标识符。** 它是一个128位的标识符，每次生成时都预期是唯一的。

我们使用它们来唯一地识别某些事物，即使该事物没有固有的标识符。我们可以在各种环境中使用它们，例如计算机系统、数据库和分布式系统，这些地方我们需要唯一地识别对象。

两个UUID相同的可能性如此之小，以至于被认为是统计上不可能的，这使得它们成为在分布式系统中识别对象的可靠方式。

基于时间的UUID，也称为版本1的UUID，是使用当前时间和特定于生成UUID的计算机或网络的唯一标识符生成的。时间戳确保了UUID的唯一性，即使同时生成多个UUID也是如此。

我们将在下面实现的库中找到两个与时间相关的新版本（v6和v7）。

版本1提供了几个优势——时间排序的ID更适合作为表的主键，包含创建时间戳可以帮助分析和调试。它也有一些劣势——当从同一主机生成多个ID时，碰撞的可能性略高。稍后我们将看到这是否是一个问题。

此外，包含主机地址可能会带来一些安全漏洞，这就是为什么版本6的标准试图提高安全性。

### 3. 基准测试

为了使我们的比较更加直接，让我们编写一个基准程序来比较UUID碰撞的可能性和生成时间。我们首先初始化所有必要的变量：

```java
int threadCount = 128;
int iterationCount = 100_000;
Map`<UUID, Long>` uuidMap = new ConcurrentHashMap<>();
AtomicLong collisionCount = new AtomicLong();
long startNanos = System.nanoTime();
CountDownLatch endLatch = new CountDownLatch(threadCount);
```

我们将在128个线程上运行基准测试，每个线程100,000次迭代。此外，我们将使用ConcurrentHashMap存储所有生成的UUID。除此之外，我们将使用计数器来统计碰撞。为了检查速度性能，我们在执行开始时存储当前时间戳，并将其与最终的时间戳进行比较。最后，我们声明一个锁存器等待所有线程完成。

在初始化了我们测试所需的所有变量之后，我们将循环并启动每个线程：

```java
for (long i = 0; i `< threadCount; i++) {
    long threadId = i;
    new Thread(() ->` {
        for (long j = 0; j `< iterationCount; j++) {
            UUID uuid = UUID.randomUUID();
            Long existingUUID = uuidMap.put(uuid, (threadId * iterationCount) + j);
            if (existingUUID != null) {
                collisionCount.incrementAndGet();
            }
        }
        endLatch.countDown();
    }).start();
}
```

对于每一行执行，我们将再次集成并开始使用java.util.UUID类生成UUID。我们将所有ID及其相应的计数插入到映射中。UUID将是映射的键。

因此，如果我们尝试在映射中插入一个现有的UUID，put()方法将返回我们已经存在的键。当我们得到一个重复的UUID时，我们将增加碰撞计数。在迭代结束时，我们将减少倒计时。

```java
endLatch.await();
System.out.println(threadCount * iterationCount + " UUIDs generated, " + collisionCount + " collisions in "
        + TimeUnit.NANOSECONDS.toMillis(System.nanoTime() - startNanos) + "ms");
```

最后，我们将使用CountDownLatch类的await()方法等待所有线程完成。我们将打印我们的基准测试结果，包括生成的UUID数量、碰撞数量和执行时间。

现在，让我们对JDK内置的UUID生成器运行基准测试：

```java
12800000 UUIDs generated, 0 collisions in 4622ms
```

我们可以看到，所有ID都是在没有碰撞的情况下生成的。在接下来的部分中，我们将这与其他生成器进行比较。

### 4. UUID创建器

#### 4.1. 依赖项

Java UUID创建器库非常有价值和灵活，用于生成UUID。它提供了多种生成UUID的选项，其简单的API使其易于在广泛的应用程序中使用。我们可以将此库添加到我们的项目中：

```xml
`<dependency>``
    ``<groupId>``com.github.f4b6a3``</groupId>``
    ``<artifactId>``uuid-creator``</artifactId>``
    ``<version>``5.2.0``</version>``
``</dependency>``
```

#### 4.2. 使用方法

这个库为我们提供了三种生成基于时间的UUID的方法：

- `UuidCreator.getTimeBased()` – 基于时间的版本，使用RFC-4122中指定的公历纪元
- `UuidCreator.getTimeOrdered()` – 时间有序版本，使用公历纪元作为新的UUID格式提出
- `UuidCreator.getTimeOrderedEpoch()` – 时间有序版本，使用Unix纪元作为新的UUID格式提出

我们可以在添加依赖项后直接在代码中使用它们：

```java
System.out.println("UUID Version 1: " + UuidCreator.getTimeBased());
System.out.println("UUID Version 6: " + UuidCreator.getTimeOrdered());
System.out.println("UUID Version 7: " + UuidCreator.getTimeOrderedEpoch());
```

我们可以看到在输出中，所有三个都具有相同的经典UUID格式：

```java
UUID Version 1: 0da151ed-c82d-11ed-a2f6-6748247d7506
UUID Version 6: 1edc82d0-da0e-654b-9a98-79d770c05a84
UUID Version 7: 01870603-f211-7b9a-a7ea-4a98f5320ff8
```

**本文将重点介绍使用传统版本1 UUID的_getTimeBased()_方法。** 它由三部分组成：时间戳、时钟序列和节点标识符。

```java
基于时间的UUID结构

 00000000-0000-v000-m000-000000000000
|1-----------------|2---|3-----------|
1: 时间戳
2: 时钟序列
3: 节点标识符
```

#### 4.3. 基准测试

在本节中，我们将使用UuidCreator.getTimeBased()方法运行前一部分的基准测试。之后，我们得到以下结果：

```java
12800000 UUIDs generated, 0 collisions in 2595ms
```

我们可以看到，这个算法也成功地在没有重复的情况下生成了所有的UUID。此外，它甚至比JDK的还要快。这只是一个基本的基准测试，尽管还有更详细的基准测试可用。

### 5. Java UUID生成器（JUG）

#### 5.1. 依赖项

Java UUID生成器（JUG）是一组用于处理UUID的Java类。它包括使用标准方法生成UUID、高效输出、排序等。它根据UUID规范（RFC-4122）生成UUID。

要使用这个库，我们应该添加Maven依赖项：

```xml
`<dependency>`
    ``<groupId>``com.fasterxml.uuid``</groupId>``
    ``<artifactId>``java-uuid-generator``</artifactId>``
    ``<version>``4.1.0``</version>``
``</dependency>``
```

#### 5.2. 使用方法

这个库还提供了三种创建基于时间的UUID的方法（经典的版本1和新版本6和7）。我们可以通过选择一种生成器，然后调用它的generate()方法来生成它们：

```java
System.out.println("UUID Version 1: " + Generators.timeBasedGenerator().generate());
System.out.println("UUID Version 6: " + Generators.timeBasedReorderedGenerator().generate());
System.out.println("UUID Version 7: " + Generators.timeBasedEpochGenerator().generate());
```

然后我们可以在控制台检查UUID：

```java
UUID Version 1: e6e3422c-c82d-11ed-8761-3ff799965458
UUID Version 6: 1edc82de-6e34-622d-8761-dffbc0ff00e8
UUID Version 7: 01870609-81e5-793b-9e4f-011ee370187b
```

#### 5.3. 基准测试

像前一节一样，我们将重点关注这个库提供的第一个UUID变体。我们也可以测试碰撞的可能性，通过将前一个示例中的UUID生成替换为以下内容：

```java
UUID uuid = Generators.timeBasedGenerator().generate();
```

运行代码后，我们可以看到结果：

```java
12800000 UUIDs generated, 0 collisions in 15795ms
```

从这个结果中，我们可以看到我们也像前一个示例一样没有得到UUID的重复。但我们也看到了执行时间的差异。即使差异看起来很大，两个库都快速生成了许多ID。

这个库的文档告诉我们，生成速度不太可能成为瓶颈，基于包的稳定性和API选择更好。

### 6. 结论

在本教程中，我们看到了基于time的UUID的结构、优势和劣势。我们使用两个最流行的UUID库在我们的代码中实现了它们，并在之后进行了比较。

我们看到选择UUID的类型或库可能取决于我们的需求。

正如往常一样，示例源代码可在GitHub上获得。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/247960f62f51e6d222ec2ed29e652eb9?s=50&r=g)![img](https://secure.gravatar.com/avatar/6c3babf3d6ea5d49c2bc4e7957870d75?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK