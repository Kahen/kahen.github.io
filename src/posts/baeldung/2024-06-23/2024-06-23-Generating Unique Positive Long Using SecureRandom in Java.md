---
date: 2024-06-23
category:
  - Java
  - SecureRandom
tag:
  - SecureRandom
  - 随机数生成
head:
  - - meta
    - name: keywords
      content: Java, SecureRandom, 随机数, 正数, 碰撞概率
---
# 使用Java SecureRandom生成唯一的正Long值

## 1. 概述

在`java.security`包中的`SecureRandom`类是专门为密码学目的和关键安全场景设计的，使用算法确保高度不可预测性。

在本教程中，我们将讨论如何使用`SecureRandom`生成一个唯一的正`long`值，并探讨在生成多个值时碰撞的安全性。

## 2. 使用`nextLong()`方法

`SecureRandom`的`nextLong()`方法返回一个`long`类型的值，这是一个随机的64位数字。这些值在极其广泛的范围内随机分布，从`Long.MIN_VALUE`（-2^63）到`Long.MAX_VALUE`（2^63 - 1）。

**此方法从`Random`类继承而来。然而，由于使用了更多的种子位，它在碰撞概率方面更有保障。**

在内部，它使用伪随机数生成器（PRNG），也称为确定性随机位生成器或DRBG，结合由操作系统提供的熵源。

让我们看看如何使用它来生成一个随机的`long`值：

```
new SecureRandom().nextLong();
```

如果我们打印这个调用方法的几种结果，可能会看到如下输出：

```
4926557902899092186
-2282075914544479463
-4653180235857827604
6589027106659854836
```

所以，如果我们只需要正值，那么我们需要额外使用`Math.abs()`：

```
SecureRandom secureRandom = new SecureRandom();
long randomPositiveLong = Math.abs(secureRandom.nextLong());
```

通过这种方式，结果保证总是正的：

```
assertThat(randomPositiveLong).isNotNegative();
```

## 3. 碰撞概率

**因为我们需要生成唯一值，所以重要的是要确保碰撞的概率足够低。**

正如我们上面所指出的，`nextLong()`方法生成一个64位的随机`long`值，范围从-2^63到2^63 - 1。随后，通过应用`Math.abs()`，我们消除了任何负号。因此，0到2^63范围的随机性减少了2倍。因此，碰撞的概率计算为1 / 2^62。以小数形式表示，这个概率大约是0.000000000000000000216840434497100900。**对于大多数实际应用，我们可以认为这个低概率是微不足道的。**

假设每秒生成一个值，平均来说，大约每146,135,511,523年才会发生一次碰撞。这个延长的时间框架进一步强调了碰撞事件的罕见性。

## 4. 结论

在本文中，我们讨论了如何使用`SecureRandom`生成唯一的正`long`值。这种方法被认为是有效的，因为它确保了高度的不可预测性，并且对于大多数应用来说，碰撞的概率是微不足道的，因此适合在各种情况下使用。

如常，完整的源代码可以在GitHub上找到。