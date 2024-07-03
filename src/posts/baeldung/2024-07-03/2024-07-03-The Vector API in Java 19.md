---
date: 2024-07-04
category:
  - Java
  - 编程
tag:
  - Vector API
  - Java 19
head:
  - - meta
    - name: keywords
      content: Java, Vector API, SIMD, 性能优化
---
# Java 19 中的 Vector API | Baeldung

## 1. 引言

Vector API 是 Java 生态系统中的一个孵化 API，用于在支持的 CPU 架构上用 Java 表达向量计算。它旨在提供优于等价标量替代方案的向量计算性能提升。

在 Java 19 中，作为 JEP 426 的一部分，提出了 Vector API 的第四轮孵化。

在本教程中，我们将探索 Vector API、其相关术语以及如何利用这个 API。

## 2. 标量、向量和并行性

在深入研究 Vector API 之前，理解 CPU 操作中的标量和向量的概念非常重要。

### 2.1. 处理单元和 CPU

CPU 利用多个处理单元来执行操作。**一个处理单元一次只能计算一个值**。**这个值称为标量值，因为它就是那个值**。操作可以是对单个操作数的一元操作，或者是对两个操作数的二元操作。将数字增加 1 是一元操作的一个例子，而将两个数字相加是二元操作。

一个处理单元执行这些操作需要一定数量的周期。我们以周期来衡量时间。**处理单元可能在执行一个操作时需要 0 个周期，而在执行另一个操作时需要多个周期，例如加法运算**。

### 2.2. 并行性

传统的现代 CPU 拥有多个核心，每个核心包含多个能够执行操作的处理单元，这提供了在这些处理单元上同时执行操作的能力。我们可以在它们的核心中运行多个线程，执行它们的程序，我们得到了操作的并行执行。

当我们有一个庞大的计算任务，例如从一个庞大的数据源中添加大量数字时，我们可以将数据分成更小的数据块，并将它们分配给多个线程，希望我们能得到更快的处理速度。这是进行并行计算的一种方式。

### 2.3. SIMD 处理器

我们可以通过使用所谓的 SIMD 处理器以不同的方式进行并行计算。**SIMD 代表单指令多数据**。在这些处理器中，没有多线程的概念。**这些 SIMD 处理器依赖于多个处理单元，并且这些单元在单个 CPU 周期内执行相同的操作，即同时执行**。它们共享执行的程序（指令），但不是底层数据，因此得名。它们对不同的操作数执行相同的操作。

**与处理器从内存中加载标量值不同，SIMD 机器将内存中的整数数组加载到寄存器上然后再进行操作**。SIMD 硬件的组织方式使得数组值的加载操作可以在单个周期内发生。SIMD 机器允许我们在不依赖并发编程的情况下，对数组进行并行计算。

由于 SIMD 机器将内存视为数组或一系列值，我们称这些为 _向量_，并且 SIMD 机器执行的任何操作都成为向量操作。因此，这是利用 SIMD 架构原理进行并行处理任务的一种非常强大和高效的方式。

现在我们知道了向量是什么，让我们尝试理解 Java 提供的 _Vector_ API 的基础知识。在 Java 中，一个 _向量_ 由抽象类 _Vector`````<E>`````_ 表示。这里，_E_ 是以下标量原始整型（_byte_, _short_, _int_, _long_）和浮点型（_float_, double）的包装类型。

### 3.1. 形状、种类和通道

我们只有预定义的空间来存储和操作向量，目前的范围从 64 到 512 位。想象一下，如果我们有一个 _Integer_ 值的 _向量_ 并且我们有 256 位来存储它，我们将总共有 8 个组件。这是因为原始 int 值的大小是 32 位。**这些组件在 _Vector_ API 的上下文中称为通道**。

**向量的形状是向量的位大小或位数**。一个具有 512 位形状的向量将有 16 个通道，并且可以一次操作 16 个 int，而一个 64 位的将只有 2 个。在这里，我们使用术语 _通道_ 来表示数据在 SIMD 机器内的通道中流动的相似性。

向量的种类是向量的形状和数据类型的组合，例如 int、float 等。它由 _VectorSpecies`````<E>`````_ 表示。

### 3.2. 向量上的通道操作

大致上有两种类型的向量操作被分类为通道操作和跨通道操作。

顾名思义，通道操作只对一个或多个向量的单个通道执行标量操作。这些操作可以将一个向量的通道与第二个向量的通道结合起来，例如，在加法操作期间。

另一方面，跨通道操作可以从向量的不同通道计算或修改数据。对向量组件进行排序是跨通道操作的一个例子。跨通道操作可以从源向量产生标量或不同形状的向量。跨通道操作可以进一步分类为排列和归约操作。

### 3.3. _Vector`````<E>`````_ API 的层次结构

_Vector`````<E>`````_ 类有六个抽象子类，分别对应于六种支持类型：_ByteVector, ShortVector, IntVector, LongVector, FloatVector_ 和 _DoubleVector_。特定的实现对于 SIMD 机器很重要，这就是为什么针对每种类型的形状特定子类进一步扩展了这些类。例如 _Int128Vector_, _Int512Vector_ 等。

## 4. 使用 Vector API 进行计算

让我们最后看看一些 _Vector_ API 代码。我们将在接下来的部分中查看通道操作和跨通道操作。

### 4.1. 添加两个数组

我们想要添加两个整数数组，并将信息存储在第三个数组中。传统的标量方法是：

```java
public int[] addTwoScalarArrays(int[] arr1, int[] arr2) {
    int[] result = new int[arr1.length];
    for(int i = 0; i `< arr1.length; i++) {
        result[i] = arr1[i] + arr2[i];
    }
    return result;
}
```

现在让我们用向量的方式编写相同的代码。Vector API 包在 _jdk.incubator.vector_ 下可用，我们需要将其导入到我们的类中。

由于我们将处理向量，我们需要做的第一件事是从两个数组创建向量。我们使用 Vector API 的 _fromArray()_ 方法来完成这一步。这个方法要求我们提供我们想要创建的向量的物种以及从哪里开始加载数组的起始偏移量。

在我们的案例中，偏移量将是 0，因为我们想从开始加载整个数组。我们可以使用默认的 _SPECIES_PREFERRED_ 作为我们的物种，它使用适合其平台的最大位大小：

```java
static final VectorSpecies<Integer>` SPECIES = IntVector.SPECIES_PREFERRED;
```

```java
var v1 = IntVector.fromArray(SPECIES, arr1, 0);
var v2 = IntVector.fromArray(SPECIES, arr2, 0);
```

一旦我们从数组中获得了两个向量，我们使用一个向量的 _add()_ 方法通过传递第二个向量：

```java
var result = v1.add(v2);
```

最后，我们将向量结果转换为数组并返回：

```java
public int[] addTwoVectorArrays(int[] arr1, int[] arr2) {
    var v1 = IntVector.fromArray(SPECIES, arr1, 0);
    var v2 = IntVector.fromArray(SPECIES, arr2, 0);
    var result = v1.add(v2);
    return result.toArray();
}
```

考虑到上述代码在 SIMD 机器上运行，加法操作将在同一 CPU 周期内添加两个向量的所有通道。

### 4.2. _VectorMasks_

上面演示的代码也有其局限性。它只有在向量的大小能够匹配 SIMD 机器可以处理的通道数量时才能很好地运行并提供所宣传的性能。这引入了使用向量掩码的概念，由 _VectorMasks`````<E>`````_ 表示，它就像一个布尔值数组。当我们无法将整个输入数据填充到我们的向量中时，我们会借助 _VectorMasks_。

掩码选择要应用操作的通道。如果通道中的相应值为 true，则应用操作；如果为 false，则执行不同的回退操作。

这些掩码帮助我们独立于向量形状和大小执行操作。我们可以使用预定义的 _length()_ 方法，它将在运行时返回向量的形状。

以下是一段稍微修改过的代码，使用掩码帮助我们以向量长度为步长迭代输入数组，然后进行尾部清理：

```java
public int[] addTwoVectorsWithMasks(int[] arr1, int[] arr2) {
    int[] finalResult = new int[arr1.length];
    int i = 0;
    for (; i `< SPECIES.loopBound(arr1.length); i += SPECIES.length()) {
        var mask = SPECIES.indexInRange(i, arr1.length);
        var v1 = IntVector.fromArray(SPECIES, arr1, i, mask);
        var v2 = IntVector.fromVector.fromArray(SPECIES, arr2, i, mask);
        var result = v1.add(v2, mask);
        result.intoArray(finalResult, i, mask);
    }

    // 尾部清理循环
    for (; i < arr1.length; i++) {
        finalResult[i] = arr1[i] + arr2[i];
    }
    return finalResult;
}

```

这段代码现在更加安全地执行，并且独立于向量的形状运行。

### 4.3. 计算向量的范数

在这一部分，我们看另一个简单的数学计算，两个值的范数。范数是我们在添加两个值的平方后进行平方根的结果。

让我们先看看标量操作的样子：

```java
public float[] scalarNormOfTwoArrays(float[] arr1, float[] arr2) {
    float[] finalResult = new float[arr1.length];
    for (int i = 0; i < arr1.length; i++) {
        finalResult[i] = (float) Math.sqrt(arr1[i] * arr1[i] + arr2[i] * arr2[i]);
    }
    return finalResult;
}
```

现在我们尝试编写上述代码的向量替代版本。

首先，我们获取我们优选的 _FloatVector_ 类型的物种，这在这种情况下是最佳的：

```java
static final VectorSpecies<Float>` PREFERRED_SPECIES = FloatVector.SPECIES_PREFERRED;
```

我们将使用我们在前一节中讨论的掩码的概念。我们的循环运行到第一个数组的 _loopBound_ 值，并以 _物种_ 长度的步长进行。在每一步中，我们将浮点值加载到向量中，并执行与我们的标量版本相同的数学运算。

最后，我们对剩余的元素进行尾部清理，使用普通的标量循环。最终的代码与我们之前的例子非常相似：

```java
public float[] vectorNormalForm(float[] arr1, float[] arr2) {
    float[] finalResult = new float[arr1.length];
    int i = 0;
    int upperBound = SPECIES.loopBound(arr1.length);
    for (; i < upperBound; i += SPECIES.length()) {
        var va = FloatVector.fromArray(PREFERRED_SPECIES, arr1, i);
        var vb = FloatVector.fromArray(PREFERRED_SPECIES, arr2, i);
        var vc = va.mul(va)
          .add(vb.mul(vb))
          .sqrt();
        vc.intoArray(finalResult, i);
    }

    // 尾部清理
    for (; i < arr1.length; i++) {
        finalResult[i] = (float) Math.sqrt(arr1[i] * arr1[i] + arr2[i] * arr2[i]);
    }
    return finalResult;
}
```

### 4.4. 归约操作

_Vector_ API 中的归约操作指的是将向量中的多个元素组合成单个结果的操作。它允许我们执行如求向量元素的和或找到向量中的最大值、最小值和平均值等计算。

_Vector_ API 提供了多种归约操作功能，可以利用 SIMD 架构的机器。一些常见的 API 包括：

- _reduceLanes()_: 这个方法接受一个数学运算，如 ADD，并将向量中的所有元素组合成单个值。
- _reduceAll()_: 这个方法与上述类似，但它期望一个可以接收两个值并输出单个值的二元归约操作。
- _reduceLaneWise()_: 这个方法在特定通道中归约元素，并生成一个具有归约通道值的向量。

我们将看到一个计算向量平均值的例子。

我们可以使用 _reduceLanes(ADD)_ 来计算所有元素的和，然后通过数组的长度进行标量除法：

```java
public double averageOfaVector(int[] arr) {
    double sum = 0;
    for (int i = 0; i < arr.length; i += SPECIES.length()) {
        var mask = SPECIES.indexInRange(i, arr.length);
        var V = IntVector.fromArray(SPECIES, arr, i, mask);
        sum += V.reduceLanes(VectorOperators.ADD, mask);
    }
    return sum / arr.length;
}
```

## 5. 与 _Vector_ API 相关的注意事项

虽然我们可以欣赏 _Vector_ API 的好处，但我们应该谨慎接受。首先，这个 API 仍在孵化阶段。然而，有一个计划是将向量类声明为原始类。

如上所述，_Vector_ API 具有硬件依赖性，因为它依赖于 SIMD 指令。许多功能可能在其他平台和架构上不可用。此外，维护向量化操作总是比传统的标量操作有额外开销。

在不了解底层架构的情况下，在通用硬件上对向量操作进行基准比较也很困难。然而，JEP 提供了一些执行此操作的指导。

## 6. 结论

尽管要谨慎使用，但使用 _Vector_ API 的好处是巨大的。性能提升和简化的操作矢量化为图形行业、大规模计算等提供了好处。我们查看了与 _Vector_ API 相关的重要术语。我们还深入探讨了一些代码示例。

像往常一样，所有代码示例都可以在 GitHub 上找到。

OK