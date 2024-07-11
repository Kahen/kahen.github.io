---
date: 2022-04-01
category:
  - Java
  - 函数式编程
tag:
  - Functor
  - Java
  - 函数式编程
head:
  - - meta
    - name: keywords
      content: Java, Functor, 函数式编程
---

# Java中的函子

在本教程中，我们将演示如何在Java中创建函子。首先，让我们通过一些关于“函子”这个术语的具体细节来开始，然后我们将查看一些代码示例，展示它在Java中的使用方式。

## 2. 什么是函子？

“函子”这个术语来自数学领域，特别是来自一个称为“范畴论”的子领域。在计算机编程中，函子可以被认为是一个实用类，它允许我们将值映射到特定的上下文中。此外，它代表了两个范畴之间的结构保持映射。

函子受两个法则的约束：

- 恒等性：当一个函子通过一个恒等函数进行映射时，恒等函数是一个返回与其传入参数相同值的函数，我们需要得到最初的函子（容器及其内容保持不变）。
- 组合/结合律：当一个函子用于映射两个部分的复合体时，它应该与分别映射到一个函数后再映射到另一个函数的结果相同。

## 3. 函数式编程中的函子

**函子是受范畴论中定义启发的函数式编程中使用的一种设计模式。** **它使得一个通用类型能够在不影响其结构的情况下应用内部的函数。** 在Scala等编程语言中，我们可以找到许多使用函子的例子。

Java和大多数其他现代编程语言不包括任何被认为是适合的内置函子等价物。然而，自从Java 8以来，函数式编程元素被引入到该语言中。函数式编程的概念在Java编程语言中仍然是相对较新的。

在Java中，可以使用java.util.function包中的Function接口来实现函子。下面是一个接受Function对象并将其应用于值的Functor类的示例：

```java
public class Functor``<T>`` {
    private final T value;
    public Functor(T value) {
        this.value = value;
    }
    public ```<R>``` Functor```<R>``` map(Function`<T, R>` mapper) {
        return new Functor```<R>```(mapper.apply(value));
    }
    // getter
}
```

正如我们所注意到的，map()方法负责执行操作。对于这个新类，我们定义了一个final值属性。这个属性是函数将要应用的地方。此外，我们需要一个方法来比较值。让我们将这个函数添加到Functor类中：

```java
public class Functor``<T>`` {
    // 定义
    boolean eq(T other) {
        return value.equals(other);
    }
    // Getter
}
```

在这个例子中，Functor类是泛型的，因为它接受一个类型参数T，该参数指定了存储在类中的值的类型。map方法接受一个Function对象，该对象接受一个类型为T的值，并返回一个类型为R的值。map方法然后通过将函数应用于原始值并返回它来创建一个新的Functor对象。

下面是一个如何使用这个functor类的示例：

```java
@Test
public void whenProvideAValue_ShouldMapTheValue() {
    Functor``<Integer>`` functor = new Functor<>(5);
    Function`<Integer, Integer>` addThree = (num) -> num + 3;
    Functor``<Integer>`` mappedFunctor = functor.map(addThree);
    assertEquals(8, mappedFunctor.getValue());
}
```

## 5. 法则验证器

那么，我们需要将事情付诸实践。在我们的第一次尝试之后，让我们使用我们的Functor类来演示Functor法则。首先是恒等法则。在这种情况下，我们的代码片段是：

```java
@Test
public void whenApplyAnIdentityToAFunctor_thenResultIsEqualsToInitialValue() {
    String value = "baeldung";
    // 恒等
    Functor`<String>` identity = new Functor<>(value).map(Function.identity());
    assertTrue(identity.eq(value));
}
```

在刚才展示的例子中，我们使用了Function类中可用的identity方法。结果Functor返回的值不受影响，保持与作为参数传递的值相同。这种行为证明了恒等法则正在被遵循。

接下来，我们应用第二个法则。在跳入我们的实现之前，我们需要定义一些假设。

- f是一个将类型T和R相互映射的函数。
- g是一个将类型R和U相互映射的函数。

之后，我们准备实现我们的测试，以演示组合/结合律。这是我们实现的代码片段：

```java
@Test
public void whenApplyAFunctionToOtherFunction_thenResultIsEqualsBetweenBoth() {
    int value = 100;
    Function`<Integer, String>` f = Object::toString;
    Function`<String, Long>` g = Long::valueOf;
    Functor``<Long>`` left = new Functor<>(value).map(f).map(g);
    Functor``<Long>`` right = new Functor<>(value).map(f.andThen(g));
    assertTrue(left.eq(100L));
    assertTrue(right.eq(100L));
}
```

从我们的代码片段中，我们定义了两个标记为f和g的函数。之后，我们使用两种不同的映射策略构建了两个Functor，一个名为left，另一个称为right。两个Functor最终都产生了相同的输出。因此，我们成功地应用了第二个法则的实现。

## 6. Java 8之前的函子

到目前为止，我们已经看到了使用java.util.function.Function接口的代码示例，该接口是在Java 8中引入的。假设我们使用的是Java的早期版本。在这种情况下，我们可以使用类似的接口或创建我们自己的函数式接口来表示一个接受单个参数并返回结果的函数。

另一方面，我们可以通过使用枚举的能力来设计一个Functor。虽然这不是最佳答案，但它确实符合Functor法则，也许最重要的是，它完成了工作。让我们定义我们的EnumFunctor类：

```java
public enum EnumFunctor {
    PLUS {
        public int apply(int a, int b) {
            return a + b;
        }
    }, MINUS {
        public int apply(int a, int b) {
            return a - b;
        }
    }, MULTIPLY {
        public int apply(int a, int b) {
            return a * b;
        }
    }, DIVIDE {
        public int apply(int a, int b) {
            return a / b;
        }
    };
    public abstract int apply(int a, int b);
}
```

apply方法在这个例子中被调用，有两个整数作为参数。该方法执行必要的数学运算并返回结果。此外，在这个例子中使用了abstract关键字，以表明apply过程不是在枚举本身中实现的，而必须由每个常量值实现。现在，让我们测试我们的实现：

```java
@Test
public void whenApplyOperationsToEnumFunctors_thenGetTheProperResult() {
    assertEquals(15, EnumFunctor.PLUS.apply(10, 5));
    assertEquals(5, EnumFunctor.MINUS.apply(10, 5));
    assertEquals(50, EnumFunctor.MULTIPLY.apply(10, 5));
    assertEquals(2, EnumFunctor.DIVIDE.apply(10, 5));
}
```

## 7. 结论

在本文中，我们首先描述了什么是Functor。然后，我们进入了它的法则定义。之后，我们在Java 8中实现了一些代码示例来演示Functor的使用。此外，我们通过示例展示了Functor的两个法则。最后，我们简要解释了如何在Java 8之前的版本中使用Functor，并提供了一个使用枚举的例子。

像往常一样，代码可以在GitHub上找到。