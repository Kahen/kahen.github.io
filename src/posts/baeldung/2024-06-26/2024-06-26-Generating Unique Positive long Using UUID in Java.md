---
date: 2024-06-27
category:
  - Java
  - UUID
tag:
  - 唯一性
  - 长整型
head:
  - - meta
    - name: keywords
      content: Java, UUID, 唯一性, 长整型
---
# 在Java中使用UUID生成唯一的正长整型

通用唯一识别码（UUID）表示一个128位的数字，设计上是全球唯一的。在实践中，UUID适用于需要唯一识别的场合，例如创建数据库表的主键。

Java提供了`long`基本数据类型，这是一个易于阅读和理解的数据类型。在许多情况下，使用64位的`long`可以提供足够的唯一性，并且碰撞概率很低。此外，像MySQL、PostgreSQL等数据库已经优化了与数值数据类型的高效工作。

在本文中，我们将讨论**使用UUID生成唯一的正长整型值，重点关注版本4的UUID**。

### 1. 概述

### 2. 生成唯一的正长整型

这个场景**提出了一个有趣的挑战，因为UUID有128位的范围。与此同时，`long`值只有64位。这意味着独特性的潜力有所减少。我们将讨论如何使用随机生成的UUID来获取唯一的正长整型值，以及这种方法的有效性。

#### 2.1. 使用`getLeastSignificantBits()`

`UUID`类的`getLeastSignificantBits()`方法返回UUID的最低64位。这意味着它只提供了128位UUID值的一半。

所以，让我们在`randomUUID()`方法之后调用它：

```
long randomPositiveLong = Math.abs(UUID.randomUUID().getLeastSignificantBits());
```

我们将继续在以下每种方法中使用`Math.abs()`以确保正值。

#### 2.2. 使用`getMostSignificantBits()`

类似地，`UUID`类的`getMostSignificantBits()`方法也返回一个64位的`long`。不同之处在于它取的是128位UUID值中最高位置的位。

再次，我们将在`randomUUID()`方法之后链式调用它：

```
long randomPositiveLong = Math.abs(UUID.randomUUID().getMostSignificantBits());
```

让我们断言结果值是正的（实际上是非负的，因为可能会生成0的值）：

```
assertThat(randomPositiveLong).isNotNegative();
```

### 3. 有效性如何？

让我们讨论在这种情况下使用UUID的有效性。为了找出答案，我们将查看几个因素。

#### 3.1. 安全性和效率

Java中的`UUID.randomUUID()`使用`SecureRandom`类生成安全的随机数以产生版本4的UUID。如果生成的UUID将用于安全或密码学上下文，这一点尤为重要。

为了评估使用UUID生成唯一正长整型值的效率和相关性，让我们看看源代码：

```
public static UUID randomUUID() {
    SecureRandom ng = Holder.numberGenerator;

    byte[] randomBytes = new byte[16];
    ng.nextBytes(randomBytes);
    randomBytes[6]  &= 0x0f;  /* 清除版本        */
    randomBytes[6]  |= 0x40;  /* 设置为版本4     */
    randomBytes[8]  &= 0x3f;  /* 清除变体        */
    randomBytes[8]  |= (byte) 0x80;  /* 设置为IETF变体 */
    return new UUID(randomBytes);
}
```

该方法使用`SecureRandom`生成16个随机字节形成UUID，然后调整这些字节中的几个位以指定UUID版本（版本4）和UUID变体（IETF）。

虽然UUID提供了强大的功能，但在这种特定情况下，更简单的方法可以实现所需的结果。因此，替代方法可能提供更好的效率和更好的适应性。

此外，这种方法可能会降低生成位的随机性。

#### 3.2. 唯一性和碰撞概率

尽管UUID v4有128位的范围，但四位用于表示版本4，两位用于表示变体。如我们所知，在UUID显示格式中，每个字符代表一个四位的十六进制数字：

```
xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
```

数字4表示四位的UUID版本（在这种情况下是版本4）。同时，字母‘y’将包含两位IETF变体。剩余的x部分包含122位随机位。因此，我们可以有1/2^122的碰撞概率。

RFC通常解释了UUID v4是如何创建的。要更清楚地看到位位置是如何分布的，我们可以再次查看`UUID.randomUUID()`的实现：

```
randomBytes[6]  &= 0x0f;  /* 清除版本        */
randomBytes[6]  |= 0x40;  /* 设置为版本4     */
```

我们可以看到，在`randomBytes[6]`中，有四位设置为最高有效位（MSB）位置的版本标记。因此，MSB中只有60位真正随机。因此，我们可以计算MSB的碰撞概率为1/2^59。

在添加`Math.abs()`之后，由于正负数的重叠，碰撞的机会增加了一倍。因此，**MSB中正长整型值的碰撞概率是2^58分之一**。

然后，在`randomBytes[8]`中，有两位设置为最低有效位（LSB）位置的IETF变体：

```
randomBytes[8] &= 0x3f; /* 清除变体 */
randomBytes[8] |= (byte) 0x80; /* 设置为IETF变体 */
```

因此，LSB中只有62位真正随机。因此，我们可以计算LSB的碰撞概率为1/2^61。

在添加`Math.abs()`之后，由于正负数的重叠，碰撞的机会增加了一倍。因此，**LSB中正长整型值的碰撞概率是2^60分之一**。

所以，我们可以看到**碰撞概率很小。但是，如果我们问UUID的内容是否完全随机，那么答案是不**。

#### 3.3. 适用性

UUID旨在实现全球唯一性、标识、安全和可移植性。**对于生成唯一的正长整型值，存在更有效的方法，这使得UUID在这种情况下不必要**。

虽然`UUID.randomUUID()`拥有128位的长度，我们已经看到只有122位实际上是随机的，而Java的`long`数据类型只处理64位。在将128位UUID转换为64位长整型时，一些独特的潜力丢失了。如果唯一性至关重要，请考虑这种权衡。

### 4. SecureRandom作为替代方案

**如果我们需要唯一的长整型值，使用具有适当范围的随机数生成器更有意义**（例如，使用SecureRandom生成唯一的随机长整型值）。这将确保我们在适当的范围内有唯一的长整型值，而不会像我们尝试使用UUID时那样丢失大部分唯一位。

```
SecureRandom secureRandom = new SecureRandom();
long randomPositiveLong = Math.abs(secureRandom.nextLong());
```

它也有更低的碰撞概率，因为它生成完全随机的64位长整型值。

为了确保正值，我们只需添加`Math.abs()`。因此，碰撞概率计算为1/2^62。以十进制形式，这个概率大约是0.000000000000000000216840434497100900。**对于大多数实际应用，我们可以认为这种低概率是微不足道的**。

### 5. 结论

总之，尽管UUID提供了全球唯一的标识符，它们可能不是生成唯一正长整型值的最有效的选择，因为会发生显的位丢失。

使用`getMostSignificantBits()`和`getLeastSignificantBits()`方法仍然可以提供低碰撞概率，但**使用像SecureRandom这样的随机数生成器可能更有效率，更适合直接生成唯一的正长整型值**。

如常，完整的源代码可在GitHub上获得。