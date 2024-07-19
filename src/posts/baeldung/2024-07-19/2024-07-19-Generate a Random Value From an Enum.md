---
date: 2022-04-01
category:
  - Java
  - Enum
tag:
  - Java Enum
  - Random Value
head:
  - - meta
    - name: keywords
      content: Java, Enum, Random Value
---
# 从枚举生成随机值

在本教程中，我们将学习如何从枚举中生成一个随机值。

## 1. 概述

## 2. 使用静态方法生成随机枚举值
首先，我们将创建一个静态函数，该函数返回特定枚举集中的随机生成值。**枚举值表示一组常量；然而，我们仍然可以在枚举类体中声明静态方法。** **我们将使用静态方法作为辅助工具来生成随机枚举值。**

我们在枚举类体内声明一个静态方法，该方法返回一个枚举值。这个方法将调用一个Random对象的nextInt()，并我们将这个方法命名为randomDirection()：

```java
public enum Direction {
    EAST, WEST, SOUTH, NORTH;

    private static final Random PRNG = new Random();

    public static Direction randomDirection()  {
        Direction[] directions = values();
        return directions[PRNG.nextInt(directions.length)];
    }
}
```

在randomDirection()内部，我们使用一个整数参数调用nextInt()方法。nextInt()方法返回一个随机数以访问directions数组；因此，我们需要确保整数没有超出数组的界限，通过向nextInt()传递一个界限参数。界限参数是总方向数，我们知道这不会超过数组的大小。

此外，values()方法每次调用randomDirection()方法时都会创建枚举值的副本。我们可以通过创建一个final成员变量列表，在生成随机索引后访问它来提高性能：

```java
private static final Direction[] directions = values();
```

现在，randomDirection()方法将如下所示：

```java
public static Direction randomDirection() {
    return directions[PRNG.nextInt(directions.length)];
}
```

最后，我们可以通过调用该方法来生成一个随机的Direction：

```java
Direction direction = Direction.randomDirection();
```

## 3. 使用泛型生成随机枚举值
同样，我们可以使用泛型来生成一个随机枚举值。**通过使用泛型，我们创建一个接受任何类型的枚举数据以生成随机值的类：**

```java
public class RandomEnumGenerator`<T extends Enum`<T>``> {
    private static final Random PRNG = new Random();
    private final T[] values;

    public RandomEnumGenerator(Class`<T>` e) {
        values = e.getEnumConstants();
    }

    public T randomEnum() {
        return values[PRNG.nextInt(values.length)];
    }
}
```

注意randomEnum()方法与前面示例中的randomDirection()方法相似。不同之处在于RandomEnumGenerator类有一个构造函数，它期望一个枚举类型，以便从中获取常量值。

我们可以使用RandomEnumGenerator类生成一个随机方向，如下所示：

```java
RandomEnumGenerator`<Direction>` reg = new RandomEnumGenerator<>(Direction.class);
Direction direction = (Direction) reg.randomEnum();
```

在这里，我们使用前一节中的Direction枚举类。RandomEnumGenerator接受这个类，并且direction对象将引用Direction类中的一个常量值。

## 4. 结论
在本教程中，我们学习了如何从枚举中获取一个随机值。我们介绍了两种方法：首先，我们使用枚举类中的静态方法，该方法生成严格限制在声明该方法的枚举类中的随机值。此外，我们还看到了如何通过缓存常量值来提高性能。最后，我们使用泛型，使用一个接受任何类型的枚举的类来获取一个随机值。

如往常一样，本文的完整代码示例可以在GitHub上找到。