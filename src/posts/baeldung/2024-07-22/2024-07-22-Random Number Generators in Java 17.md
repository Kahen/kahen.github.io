---
date: 2022-04-01
category:
  - Java
  - 编程
tag:
  - Java 17
  - 随机数生成器
head:
  - - meta
    - name: keywords
      content: Java 17, 随机数生成器, API, RandomGenerator, 线程安全, 性能
---
# Java 17中的随机数生成器 | Baeldung

## 1. 概述

Java SE 17的发布引入了随机数生成API的更新——JEP 356。

这次API更新引入了新的接口类型，以及方便地列出、查找和实例化生成器工厂的方法。此外，现在还有一组新的随机数生成器实现可用。

在本教程中，我们将比较新的RandomGenerator API与旧的Random API。我们将查看列出所有可用的生成器工厂，并根据其名称或属性选择生成器。

我们还将探索新API的线程安全性和性能。

## 2. 旧的Random API

首先，让我们看看基于Random类的Java旧API进行随机数生成。

### 2.1. API设计

原始API由四个类组成，没有接口：

### 2.2. Random

最常用的随机数生成器是java.util包中的Random。

要生成一系列随机数，我们需要**创建一个随机数生成器类的实例——Random**：

```java
Random random = new Random();
int number = random.nextInt(10);
assertThat(number).isPositive().isLessThan(10);
```

这里，默认构造函数将随机数生成器的种子设置为一个非常可能与任何其他调用不同的值。

### 2.3. 替代方案

除了java.util.Random，还有**三种替代生成器可用于解决线程安全性和安全问题**。

所有Random实例默认情况下都是线程安全的。然而，跨线程同时使用同一实例可能导致性能不佳。因此，java.util.concurrent包中的ThreadLocalRandom类是多线程系统的优选选项。

由于Random实例不是加密安全的，SecureRandom类使我们能够为安全敏感的上下文创建生成器。

最后，java.util包中的SplittableRandom类针对并行流和fork/join风格的计算进行了优化。

## 3. 新的RandomGenerator API

现在，让我们看看基于RandomGenerator接口的新API。

### 3.1. API设计

新API提供了一个更好的整体设计，具有**新的接口类型和生成器实现**：

在上图中，我们可以看到旧API类如何适应新设计。在这些类型之上，还添加了几个随机数生成器实现类：

- Xoroshiro组
  - Xoroshiro128PlusPlus
- Xoshiro组
  - Xoshiro256PlusPlus
- LXM组
  - L128X1024MixRandom
  - L128X128MixRandom
  - L128X256MixRandom
  - L32X64MixRandom
  - L64X1024MixRandom
  - L64X128MixRandom
  - L64X128StarStarRandom
  - L64X256MixRandom

### 3.2. 改进领域

旧API中**缺少接口**使得在不同生成器实现之间切换更加困难。因此，第三方提供自己的实现变得更加困难。

例如，尽管SplittableRandom的某些代码部分与Random完全相同，但它完全脱离了API的其余部分。

因此，新RandomGenerator API的主要目标是：

- 确保不同算法之间的可交换性更容易
- 为基于流的编程提供更好的支持
- 消除现有类中的代码重复
- 保留旧Random API的现有行为

### 3.3. 新接口

新的根接口**RandomGenerator为所有现有和新的生成器提供了统一的API**。

它定义了返回不同类型随机选择值的方法，以及随机选择值的流。

新API提供了四个新的专门生成器接口：

- SplitableGenerator 允许创建一个新的生成器作为当前生成器的后代
- JumpableGenerator 允许向前跳跃一个适度数量的绘制
- LeapableGenerator 允许向前跳跃一个大量的绘制
- ArbitrarilyJumpableGenerator 在LeapableGenerator的基础上增加了跳跃距离

## 4. RandomGeneratorFactory

新API中提供了一个工厂类，用于生成特定算法的多个随机数生成器。

### 4.1. 查找所有

RandomGeneratorFactory方法all生成一个非空流，包含所有可用的生成器工厂。

我们可以使用它来**打印所有注册的生成器工厂并检查其算法属性**：

```java
RandomGeneratorFactory.all()
  .sorted(Comparator.comparing(RandomGeneratorFactory::name))
  .forEach(factory -> System.out.println(String.format("%s\t%s\t%s\t%s",
    factory.group(),
    factory.name(),
    factory.isJumpable(),
    factory.isSplittable())));
```

工厂的可用性是通过定位RandomGenerator接口的实现通过服务提供者API来确定的。

### 4.2. 按属性查找

我们也可以利用all方法来**按随机数生成器算法的属性查询工厂**：

```java
RandomGeneratorFactory.all()
  .filter(RandomGeneratorFactory::isJumpable)
  .findAny()
  .map(RandomGeneratorFactory::create)
  .orElseThrow(() -> new RuntimeException("Error creating a generator"));
```

因此，使用Stream API，我们可以找到一个满足我们要求的工厂，然后使用它来创建一个生成器。

## 5. RandomGenerator 选择

除了更新的API设计，还实现了几种新算法，未来可能会添加更多。

### 5.1. 选择默认

在大多数情况下，我们没有特定的生成器要求。因此，我们可以直接从RandomGenerator接口获取默认生成器。

这是Java 17中推荐的新方法，作为创建Random实例的替代：

```java
RandomGenerator generator = RandomGenerator.getDefault();
```

getDefault方法当前选择L32X64MixRandom生成器。

然而，算法可能会随时间变化。因此，没有保证这个方法将来会继续返回这种算法。

### 5.2. 选择特定

另一方面，当我们有特定的生成器要求时，我们可以使用of方法**检索特定生成器**：

```java
RandomGenerator generator = RandomGenerator.of("L128X256MixRandom");
```

此方法需要将随机数生成器的名称作为参数传递。

如果未找到命名的算法，它将抛出IllegalArgumentException。

## 6. 线程安全

大多数**新生成器实现不是线程安全的**。然而，Random和SecureRandom仍然是。

因此，在多线程环境中，我们可以选择：

- 共享一个线程安全生成器的实例
- 在新线程启动之前，从本地源拆分一个新实例

我们可以使用SplittableGenerator实现第二种情况：

```java
List`<Integer>` numbers = Collections.synchronizedList(new ArrayList<>());
ExecutorService executorService = Executors.newCachedThreadPool();

RandomGenerator.SplittableGenerator sourceGenerator = RandomGeneratorFactory
    .`<RandomGenerator.SplittableGenerator>`of("L128X256MixRandom")
    .create();

sourceGenerator.splits(20).forEach((splitGenerator) -> {
    executorService.submit(() -> {
        numbers.add(splitGenerator.nextInt(10));
    });
})
```

这样，我们确保我们的生成器实例以一种不会产生相同数字流的方式初始化。

## 7. 性能

让我们为Java 17中所有可用的生成器实现运行一个简单的性能测试。

我们将在同一方法上测试生成器，生成四种不同类型的随机数：

```java
private static void generateRandomNumbers(RandomGenerator generator) {
    generator.nextLong();
    generator.nextInt();
    generator.nextFloat();
    generator.nextDouble();
}
```

让我们看看基准测试结果：

| 算法   | 模式 | 分数 | 误差 | 单位  |
| ------ | ---- | ---- | ---- | ----- |
| L128X1024MixRandom | avgt | 95,637 | ±3,274 | ns/op |
| L128X128MixRandom | avgt | 57,899 | ±2,162 | ns/op |
| L128X256MixRandom | avgt | 66,095 | ±3,260 | ns/op |
| L32X64MixRandom | avgt | 35,717 | ±1,737 | ns/op |
| L64X1024MixRandom | avgt | 73,690 | ±4,967 | ns/op |
| L64X128MixRandom | avgt | 35,261 | ±1,985 | ns/op |
| L64X128StarStarRandom | avgt | 34,054 | ±0,314 | ns/op |
| L64X256MixRandom | avgt | 36,238 | ±0,090 | ns/op |
| Random | avgt | 111,369 | ±0,329 | ns/op |
| SecureRandom | avgt | 9,457,881 | ±45,574 | ns/op |
| SplittableRandom | avgt | 27,753 | ±0,526 | ns/op |
| Xoroshiro128PlusPlus | avgt | 31,825 | ±1,863 | ns/op |
| Xoshiro256PlusPlus | avgt | 33,327 | ±0,555 | ns/op |

SecureRandom是最慢的生成器，但这是因为它是唯一的加密强大的生成器。
由于它们不需要是线程安全的，新的生成器实现**比Random性能更好**。

## 8. 结论

在本文中，我们探讨了Java SE 17中随机数生成API的更新。

我们了解了新旧API之间的区别，包括引入的新API设计、接口和实现。

在示例中，我们看到了如何使用RandomGeneratorFactory找到合适的生成器算法。我们还看到了如何根据其名称或属性选择算法。

最后，我们查看了旧的和新的生成器实现的线程安全性和性能。

如常，完整的源代码可在GitHub上找到。

[Baeldung logo] ![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg) [Gravatar icon] ![img](https://secure.gravatar.com/avatar/6df1edf6b70e2fea4c35997d86b15fd5?s=50&r=g) [Gravatar icon] ![img](https://secure.gravatar.com/avatar/6c3babf3d6ea5d49c2bc4e7957870d75?s=50&r=g) [Announcement icon] ![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)

OK