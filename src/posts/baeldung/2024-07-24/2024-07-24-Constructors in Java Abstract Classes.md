---
date: 2022-04-01
category:
  - Java
  - Abstract Classes
tag:
  - Constructors
  - Java Abstract Classes
head:
  - - meta
    - name: keywords
      content: Java, Abstract Classes, Constructors, Java Abstract Classes Constructors
---
# Java中的抽象类和构造器

## 1. 概述

抽象类和构造器看起来可能不兼容。**构造器是在类实例化时调用的方法**，而**抽象类不能被实例化**。这听起来是不是有点反直觉？

在本文中，我们将看到抽象类为什么可以有构造器，以及在子类实例化时使用它们如何带来好处。

## 2. 默认构造器

**当一个类没有声明任何构造器时，编译器会为我们创建一个默认构造器**。这对于抽象类来说也是成立的。即使没有显式构造器，抽象类也会有一个默认构造器可用。

在抽象类中，其派生类可以通过`_super()`调用抽象默认构造器：

```java
public abstract class AbstractClass {
    // 编译器创建一个默认构造器
}

public class ConcreteClass extends AbstractClass {

    public ConcreteClass() {
        super();
    }
}
```

## 3. 无参数构造器

我们可以在抽象类中声明一个无参数的构造器。它将覆盖默认构造器，任何子类的创建都将首先在构造链中调用它。

让我们通过两个抽象类的子类来验证这种行为：

```java
public abstract class AbstractClass {
    public AbstractClass() {
        System.out.println("Initializing AbstractClass");
    }
}

public class ConcreteClassA extends AbstractClass {
}

public class ConcreteClassB extends AbstractClass {
    public ConcreteClassB() {
        System.out.println("Initializing ConcreteClassB");
    }
}
```

让我们看看调用`new ConcreteClassA()`时得到的输出：

```java
Initializing AbstractClass
```

而调用`new ConcreteClassB()`的输出将是：

```java
Initializing AbstractClass
Initializing ConcreteClassB
```

### 3.1. 安全初始化

声明一个无参数的抽象构造器对于安全初始化很有帮助。

下面的`Counter`类是自然数计数的超类。我们需要它的值从零开始。

让我们看看如何使用无参数构造器来确保安全初始化：

```java
public abstract class Counter {

    int value;

    public Counter() {
        this.value = 0;
    }

    abstract int increment();
}
```

我们的`SimpleCounter`子类用`++`运算符实现了`increment()`方法。每次调用时，它将`value`增加一：

```java
public class SimpleCounter extends Counter {

    @Override
    int increment() {
        return ++value;
    }
}
```

注意`SimpleCounter`没有声明任何构造器。它的创建依赖于计数器的无参数构造器默认被调用。

以下单元测试演示了构造器安全初始化`value`属性：

```java
@Test
void givenNoArgAbstractConstructor_whenSubclassCreation_thenCalled() {
    Counter counter = new SimpleCounter();

    assertNotNull(counter);
    assertEquals(0, counter.value);
}
```

### 3.2. 防止访问

我们的`Counter`初始化工作得很好，但假设我们不希望子类覆盖这种安全初始化。

首先，我们需要使构造器变为私有以防止子类访问：

```java
private Counter() {
    this.value = 0;
    System.out.println("Counter No-Arguments constructor");
}
```

其次，让我们为子类创建另一个构造器来调用：

```java
public Counter(int value) {
    this.value = value;
    System.out.println("Parametrized Counter constructor");
}
```

最后，我们的`SimpleCounter`需要覆盖参数化构造器，否则它将无法编译：

```java
public class SimpleCounter extends Counter {

    public SimpleCounter(int value) {
        super(value);
    }

    // 具体方法
}
```

注意编译器期望我们在该构造器上调用`super(value)`，以限制对我们的私有无参数构造器的访问。

## 4. 参数化构造器

抽象类中构造器最常见的用途之一是避免冗余。让我们通过汽车的例子来看看如何利用参数化构造器。

我们从一个抽象的`Car`类开始，代表所有类型的汽车。我们还需要一个`distance`属性，以知道它行驶了多少距离：

```java
public abstract class Car {

    int distance;

    public Car(int distance) {
        this.distance = distance;
    }
}
```

我们的超类看起来不错，但我们不希望`distance`属性用非零值初始化。我们还希望防止子类更改`distance`属性或覆盖参数化构造器。

让我们看看如何限制对`distance`的访问并使用构造器安全地初始化它：

```java
public abstract class Car {

    private int distance;

    private Car(int distance) {
        this.distance = distance;
    }

    public Car() {
        this(0);
        System.out.println("Car default constructor");
    }

    // getters
}
```

现在，我们的`distance`属性和参数化构造器是私有的。有一个公共默认构造器`Car()`，它委托给私有构造器以初始化`distance`。

为了使用我们的`distance`属性，让我们添加一些行为来获取和显示汽车的基本信息：

```java
abstract String getInformation();

protected void display() {
    String info = new StringBuilder(getInformation())
      .append("\nDistance: " + getDistance())
      .toString();
    System.out.println(info);
}
```

所有子类都需要提供`getInformation()`的实现，`display()`方法将使用它来打印所有详细信息。

现在让我们创建`ElectricCar`和`FuelCar`子类：

```java
public class ElectricCar extends Car {
    int chargingTime;

    public ElectricCar(int chargingTime) {
        this.chargingTime = chargingTime;
    }

    @Override
    String getInformation() {
        return new StringBuilder("Electric Car")
          .append("\nCharging Time: " + chargingTime)
          .toString();
    }
}

public class FuelCar extends Car {
    String fuel;

    public FuelCar(String fuel) {
        this.fuel = fuel;
    }

    @Override
    String getInformation() {
        return new StringBuilder("Fuel Car")
          .append("\nFuel type: " + fuel)
          .toString();
    }
}
```

让我们看看这些子类在行动中的表现：

```java
ElectricCar electricCar = new ElectricCar(8);
electricCar.display();

FuelCar fuelCar = new FuelCar("Gasoline");
fuelCar.display();
```

产生的输出看起来像这样：

```java
Car default constructor
Electric Car
Charging Time: 8
Distance: 0

Car default constructor
Fuel Car
Fuel type: Gasoline
Distance: 0
```

## 5. 结论

像Java中的任何其他类一样，抽象类也可以有构造器，即使它们只从它们的具体子类中被调用。

在本文中，我们从抽象类的角度讨论了每种类型的构造器——它们与具体子类的关联以及我们如何在实际用例中使用它们。

如常，代码示例可以在GitHub上找到。