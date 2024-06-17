---
date: 2024-06-17
category:
  - Java
  - 编程
tag:
  - ArrayList
  - 原始类型数组
  - 转换
---
# Java中将Float型ArrayList转换为原始类型数组 | Baeldung

概述

数据序列是任何项目和编程语言中不可或缺的一部分。在Java中，有两种方式来表示元素序列：集合和数组。

本教程将学习如何将包装类数组列表转换为原始类型数组。尽管这听起来是一个简单的任务，但Java API中的一些怪癖使得这个过程不那么直接。

简单For循环

进行这种转换的最简单方式是使用声明性风格的for循环：

```java
@ParameterizedTest
@MethodSource("floatListProvider")
void givenListOfWrapperFloat_whenConvertToPrimitiveArray_thenGetCorrectResult(List`````<Float>````` floats) {
    float[] actual = new float[floats.size()];
    for (int i = 0; i < floats.size(); i++) {
        actual[i] = floats.get(i);
    }
    compareSequences(floats, actual);
}
```

这段代码的主要优点是它明确且易于理解。然而，对于这样一个简单的任务，我们必须处理太多的事情。

集合API提供了一个不错的方法将List转换为数组，但不处理拆箱。然而，它足够有用，值得在本文中考虑：

```java
@ParameterizedTest
@MethodSource("floatListProvider")
void givenListOfWrapperFloat_whenConvertToWrapperArray_thenGetCorrectResult(List`````<Float>````` floats) {
    Float[] actual = floats.toArray(new Float[0]);
    assertSequences(floats, actual);
}
```

List类有toArray()方法，可以帮助我们进行转换。然而，API有点令人困惑。我们需要传递一个数组以确保正确的类型。结果将与我们传递的数组类型相同。

因为我们需要传递一个实例，所以不清楚我们应该使用什么大小，以及结果数组是否会被截断。在这种情况下，我们根本不必担心大小，toArray()将负责并根据需要扩展数组。

同时，直接传递特定大小的数组也是可以的：

```java
@ParameterizedTest
@MethodSource("floatListProvider")
void givenListOfWrapperFloat_whenConvertToWrapperArrayWithPreSizedArray_thenGetCorrectResult(List`````<Float>````` floats) {
    Float[] actual = floats.toArray(new Float[floats.size()]);
    assertSequences(floats, actual);
}
```

虽然看起来是对前一个版本的优化，但这并不一定是真的。Java编译器会在没有问题的情况下处理大小。此外，在创建数组时调用size()可能会在多线程环境中引起问题。因此，推荐使用前面显示的空数组。

拆箱数组

虽然我们对数值和布尔值有拆箱的概念，但尝试拆箱数组将导致编译时错误。因此，我们应该分别拆箱每个元素。这是我们之前看到的例子的变体：

```java
@ParameterizedTest
@MethodSource("floatListProvider")
void givenListOfWrapperFloat_whenUnboxToPrimitiveArray_thenGetCorrectResult(List`````<Float>````` floats) {
    float[] actual = new float[floats.size()];
    Float[] floatArray = floats.toArray(new Float[0]);
    for (int i = 0; i < floats.size(); i++) {
        actual[i] = floatArray[i];
    }
    assertSequences(floats, actual);
}
```

这里有两个问题。首先，我们为临时数组使用了额外的空间；这不会像我们无论如何都需要使用空间来获取结果一样影响时间复杂度。

第二个问题是for循环并没有做太多，因为我们在这里使用了隐式拆箱。消除它是个好主意。我们可以通过Apache Commons的实用类来实现：

```java
@ParameterizedTest
@MethodSource("floatListProvider")
void givenListOfWrapperFloat_whenConvertToPrimitiveArrayWithArrayUtils_thenGetCorrectResult(List`````<Float>````` floats) {
    float[] actual = ArrayUtils.toPrimitive(floats.toArray(new Float[]{}));
    assertSequences(floats, actual);
}
```

这样，我们得到了一个漂亮的一行解决方案来解决我们的问题。toPrimitive()方法只是封装了我们之前使用的逻辑，并添加了一些额外的检查：

```java
public static float[] toPrimitive(final Float[] array) {
    if (array == null) {
        return null;
    }
    if (array.length == 0) {
        return EMPTY_FLOAT_ARRAY;
    }
    final float[] result = new float[array.length];
    for (int i = 0; i < array.length; i++) {
        result[i] = array[i].floatValue();
    }
    return result;
}
```

这是一个漂亮而干净的解决方案，但需要一些额外的库。或者，我们可以在我们的代码中实现和使用类似的方法。

流

当我们使用集合时，我们可以使用流来复制我们在循环中使用的逻辑。流API可以帮助我们同时转换List和拆箱值。然而，有一个警告：Java没有FloatStream。

如果我们对浮点数不是太挑剔，我们可以使用DoubleStream将ArrayList`````<Float>`````转换为double[]：

```java
@ParameterizedTest
@MethodSource("floatListProvider")
void givenListOfWrapperFloat_whenConvertingToPrimitiveArrayUsingStreams_thenGetCorrectResult(List`````<Float>````` floats) {
    double[] actual = floats.stream().mapToDouble(Float::doubleValue).toArray();
    assertSequences(floats, actual);
}
```

我们成功地转换了List，但以稍微不同的浮点表示。这是因为我们只有IntStream、LongStream和DoubleStream可用。

自定义收集器

同时，我们可以实施一个自定义的Collector，并将所有逻辑放在其中：

```java
public class FloatCollector implements Collector``<Float, float[], float[]>`` {
    private final int size;
    private int index = 0;
    public FloatCollector(int size) {
        this.size = size;
    }

    @Override
    public Supplier``<float[]>`` supplier() {
        return () -> new float[size];
    }

    @Override
    public BiConsumer`<float[], Float>` accumulator() {
        return (array, number) -> {
            array[index] = number;
            index++;
        };
    }

    // 其他不重要的方法
}
```

其他不重要的方法包括一些存根，允许我们的代码运行，以及一个无操作的终结器：

```java
public class FloatCollector implements Collector``<Float, float[], float[]>`` {
    // 重要方法

    @Override
    public BinaryOperator``<float[]>`` combiner() {
        return null;
    }

    @Override
    public Function`<float[], float[]>` finisher() {
        return Function.identity();
    }

    @Override
    public Set`<Characteristics>` characteristics() {
        return Collections.emptySet();
    }
}
```

现在我们可以展示我们的新的和有点hacky的Collector：

```java
@ParameterizedTest
@MethodSource("floatListProvider")
void givenListOfWrapperFloat_whenConvertingWithCollector_thenGetCorrectResult(List`````<Float>````` floats) {
    float[] actual = floats.stream().collect(new FloatCollector(floats.size()));
    assertSequences(floats, actual);
}
```

虽然玩弄Stream API接口很有趣，但这个解决方案过于复杂，并没有在这个特定的情况下提供任何好处。此外，这个收集器可能在多线程环境中工作，我们应该考虑到线程安全性。

结论

使用数组和集合是任何应用程序的常规工作。虽然列表提供了更好的接口，但有时我们需要将它们转换为简单的数组。

在这个过程中额外的拆箱使其比应该的更具挑战性。然而，一些技巧、自定义方法或第三方库可以帮助简化它。

像往常一样，本教程的所有代码都可以在GitHub上找到。

评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。