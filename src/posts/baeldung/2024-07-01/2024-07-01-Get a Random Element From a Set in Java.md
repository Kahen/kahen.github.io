---
date: {2024-07-01}
category:
  - Java
  - 编程
tag:
  - Set
  - 随机元素
  - Java.util.Random
  - ThreadLocalRandom
head:
  - - meta
    - name: keywords
      content: Java Set, 随机选择, java.util.Random, ThreadLocalRandom
---
# 在Java中从Set集合中获取随机元素

随机从_Set_集合中选择元素是各种Java应用程序中的常见需求，尤其是在游戏和数据处理任务中。

在本文中，我们将探讨从Java _Set_中选择随机元素的不同方法。

### 2. 使用_java.util.Random_类

_java.util.Random_类是生成随机数的便捷工具。要从_Set_中选择一个随机元素，我们可以生成一个随机索引，并使用它来访问元素：

```java
public static ``<T>`` T getByRandomClass(Set``<T>`` set) {
    if (set == null || set.isEmpty()) {
        throw new IllegalArgumentException("The Set cannot be empty.");
    }
    int randomIndex = new Random().nextInt(set.size());
    int i = 0;
    for (T element : set) {
        if (i == randomIndex) {
            return element;
        }
        i++;
    }
    throw new IllegalStateException("Something went wrong while picking a random element.");
}
```

让我们测试我们的方法：

```java
Set`<String>` animals = new HashSet<>();
animals.add("Lion");
animals.add("Elephant");
animals.add("Giraffe");

String randomAnimal = getByRandomClass(animals);
System.out.println("Randomly picked animal: " + randomAnimal);
```

结果应该是随机的：

```
Randomly picked animal: Giraffe
```

### 3. 使用_ThreadLocalRandom_类

从Java 7开始，_ThreadLocalRandom_类提供了一种更有效且线程安全的替代方案来生成随机数。以下是我们如何使用它从_Set_中选择一个随机索引：

```java
int randomIndex = ThreadLocalRandom.current().nextInt(set.size());
```

解决方案与上述相同，只是随机数的选择方式不同。

**使用_ThreadLocalRandom_比_java.util.Random_更可取**，因为它减少了多线程场景中的竞争，并且通常提供更好的性能。

### 4. 结论

总结，我们学到了两种从Java _Set_中选择随机元素的方法。

本文的示例代码可以在GitHub上找到。翻译已经完成，以下是翻译的剩余部分：

文章的示例代码可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/4958d80133796c4d497b124e052f53f5?s=50&r=g)![img](https://secure.gravatar.com/avatar/629fdde67cb23f9d3799635d89c7b250?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK