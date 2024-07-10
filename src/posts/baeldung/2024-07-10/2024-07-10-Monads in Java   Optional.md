---
date: 2022-04-01
category:
  - Java
tag:
  - Monad
  - Java 8
  - Optional
head:
  - - meta
    - name: keywords
      content: Java Monad, Optional, Functional Programming
---
# Java中的Monads – Optional

在本教程中，我们将讨论Monads及其在Java中的定义。我们的目标是理解这个概念，它解决的问题，以及Java语言是如何实现它的。

通过本教程，我们希望读者能够理解Monads的概念以及如何充分利用它。

## 2. 概念

**Monad是一种在函数式编程世界中流行的设计模式**。然而，它实际上起源于一个名为范畴论的数学领域。本文将重点讨论软件工程领域的Monad定义。尽管两种定义有许多相似之处，但软件定义和该领域的术语更与我们的上下文相关。

**简而言之，一个通用的概念是一个对象，它可以基于转换将自己映射到不同的结果**。

## 3. 设计模式

Monads是封装值和计算的容器或结构。它们必须具有两个基本操作：

- **单元(Unit)**：Monads表示一种包装给定值的类型，此操作负责包装值。例如，在Java中，此操作可以通过利用泛型接受不同类型的值。
- **绑定(Bind)**：此操作允许使用持有的值执行转换，并返回一个新的Monad值（在Monad类型中包装的值）。

尽管如此，Monad必须遵守一些属性：

- **左单元性(Left identity)**：当应用于Monad时，它应该产生与将转换应用于持有的值相同的结果。
- **右单元性(Right identity)**：当发送Monad转换（将值转换为Monad）时，产生的结果必须与在新Monad中包装该值相同。
- **结合律(Associativity)**：当链式转换时，转换的嵌套方式不应重要。

函数式编程的一个挑战是允许在不损失可读性的情况下对此类操作进行流水线处理。这是采用Monad概念的原因之一。**Monad是函数范式的基础，并有助于实现声明式编程**。

## 4. Java解释

Java 8通过像_Optional_这样的类实现了Monad设计模式。但是，让我们先看一下在添加_Optional_类之前的代码：

```java
public class MonadSample1 {
    //...
    private double multiplyBy2(double n) {
        return n * 2;
    }

    private double divideBy2(double n) {
        return n / 2;
    }

    private double add3(double n) {
        return n + 3;
    }

    private double subtract1(double n) {
        return n - 1;
    }

    public double apply(double n) {
        return subtract1(add3(divideBy2(multiplyBy2(multiplyBy2(n))))));
    }
    //...
}
```

```java
public class MonadSampleUnitTest {
    //...
    @Test
    public void whenNotUsingMonad_shouldBeOk() {
        MonadSample1 test = new MonadSample1();
        Assert.assertEquals(6.0, test.apply(2), 0.000);
    }
    //...
}
```

正如我们所观察到的，_apply_方法看起来相当难以阅读，但是它的替代方案是什么呢？也许是这样的：

```java
public class MonadSample2 {
    //...
    public double apply(double n) {
        double n1 = multiplyBy2(n);
        double n2 = multiplyBy2(n1);
        double n3 = divideBy2(n2);
        double n4 = add3(n3);
        return subtract1(n4);
    }
    //...
}
```

```java
public class MonadSampleUnitTest {
    //...
    @Test
    public void whenNotUsingMonadButUsingTempVars_shouldBeOk() {
        MonadSample2 test = new MonadSample2();
        Assert.assertEquals(6.0, test.apply(2), 0.000);
    }
    //...
}
```

这看起来更好，但它仍然看起来过于冗长。那么让我们看看使用_Optional_会是什么样子：

```java
public class MonadSample3 {
    //...
    public double apply(double n) {
        return Optional.of(n)
          .flatMap(value -> Optional.of(multiplyBy2(value)))
          .flatMap(value -> Optional.of(multiplyBy2(value)))
          .flatMap(value -> Optional.of(divideBy2(value)))
          .flatMap(value -> Optional.of(add3(value)))
          .flatMap(value -> Optional.of(subtract1(value)))
          .get();
    }
    //...
}
```

```java
public class MonadSampleUnitTest {
    //...
    @Test
    public void whenUsingMonad_shouldBeOk() {
        MonadSample3 test = new MonadSample3();
        Assert.assertEquals(6.0, test.apply(2), 0.000);
    }
    //...
}
```

上述代码看起来更清晰。另一方面，这种设计允许开发人员应用尽可能多的后续转换，而不会牺牲可读性并减少临时变量声明的冗长性。

还有更多；想象一下，如果这些函数中的任何一个可以产生_null_值。在这种情况下，我们将不得不在每个转换之前添加验证，使代码更加冗长。这实际上是_Optional_类的主要目的。这个想法是避免使用_null_并提供一种易于使用的方式来应用对象的转换，以便当它们不是_null_时，一系列声明将以null安全的方式执行。还可以检查由_Optional_包装的值是否为空（值为null）。

### 4.1. Optional的陷阱

正如开头所描述的，Monad需要有一些操作和属性，让我们看看Java实现中的这些属性。首先，为什么不检查Monad必须拥有的操作：

- **对于_单元(Unit)_操作，Java提供了不同的风格，如_Optional.of()_和** _Optional.nullable()_。正如我们可能想象的那样，一个接受_null_值，另一个不接受。
- **至于_绑定(Bind)_函数，Java提供了_Optional.flatMap()_操作**，在代码示例中引入。

一个不在Monad定义中的特性是_map_操作。它是一个类似于_flatMap_的转换和链式操作。两者之间的区别在于_map_操作接收一个转换，返回一个原始值以供API内部包装。而_flatMap_已经返回了一个包装值，API返回以形成管道。

现在，让我们检查Monad的属性：

```java
public class MonadSample4 {
    //...
    public boolean leftIdentity() {
         Function```<Integer, Optional>``` mapping = value -> Optional.of(value + 1);
         return Optional.of(3).flatMap(mapping).equals(mapping.apply(3));
    }

    public boolean rightIdentity() {
        return Optional.of(3).flatMap(Optional::of).equals(Optional.of(3));
    }

    public boolean associativity() {
        Function```<Integer, Optional>``` mapping = value -> Optional.of(value + 1);
        Optional leftSide = Optional.of(3).flatMap(mapping).flatMap(Optional::of);
        Optional rightSide = Optional.of(3).flatMap(v -> mapping.apply(v).flatMap(Optional::of));
        return leftSide.equals(rightSide);
    }
    //...
}
```

```java
public class MonadSampleUnitTest {
    //...
    @Test
    public void whenTestingMonadProperties_shouldBeOk() {
        MonadSample4 test = new MonadSample4();
        Assert.assertEquals(true, test.leftIdentity());
        Assert.assertEquals(true, test.rightIdentity());
        Assert.assertEquals(true, test.associativity());
    }
    //...
}
```

乍一看，所有属性似乎都符合要求，Java有一个适当的Monad实现，但实际上并非如此。让我们再试一次测试：

```java
class MonadSample5 {
    //...
    public boolean fail() {
        Function```<Integer, Optional>``` mapping = value -> Optional.of(value == null ? -1 : value + 1);
        return Optional.ofNullable((Integer) null).flatMap(mapping).equals(mapping.apply(null));
    }
    //...
}
```

```java
class MonadSampleUnitTest {
    @Test
    public void whenBreakingMonadProperties_shouldBeFalse() {
        MonadSample5 test = new MonadSample5();
        Assert.assertEquals(false, test.fail());
    }
}
```

**正如所观察到的，Monad的左单元性属性被打破了**。**实际上，这似乎是一个有意识的决定，正如这次讨论。JDK团队的一名成员说_Optional_的范围比其他语言窄，他们不打算让它超过那个范围**。还有其他场景，这些属性可能不成立。

实际上，其他API，如流(stream)，有类似的设计，但也不打算完全实现Monad规范。

## 5. 结论

在本文中，我们探讨了Monad的概念，它们是如何在Java中引入的，以及这种实现的细微差别。

有人可能会争论说Java所拥有的实际上并不是Monad实现，并且在为null安全设计时，他们破坏了原则。然而，这种模式的许多好处仍然存在。

像往常一样，本文中使用的所有代码示例都可以在GitHub上找到。