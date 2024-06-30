---
date: 2022-04-01
category:
  - Java
  - Mockito
tag:
  - Mockito
  - Unit Testing
head:
  - - meta
    - name: keywords
      content: Mockito, MockedConstruction, Java, Unit Testing
---
# Mockito MockedConstruction 概览

在编写单元测试时，有时会遇到一种情况，即在构造新对象时返回一个模拟对象可能会很有用。例如，当测试具有紧密耦合对象依赖性的遗留代码时。

在本教程中，我们将看看Mockito的一个相对较新的特性，它允许我们在构造函数调用时生成模拟对象。

要了解更多关于使用Mockito进行测试的信息，请查看我们全面的Mockito系列。

## **2. 依赖项**

首先，我们需要将_mockito_依赖项添加到我们的项目中：

```xml
``<dependency>``
    ``<groupId>``org.mockito``</groupId>``
    ``<artifactId>``mockito-core``</artifactId>``
    ``<version>``5.11.0``</version>``
    ``<scope>``test``</scope>``
``</dependency>``
```

如果我们使用的Mockito版本低于5.0版本，那么我们还需要显式添加Mockito的mock maker inline依赖项：

```xml
``<dependency>``
    ``<groupId>``org.mockito``</groupId>``
    ``<artifactId>``mockito-inline``</artifactId>``
    ``<version>``5.2.0``</version>``
    ``<scope>``test``</scope>``
``</dependency>``
```

## 3. 关于模拟构造函数调用的快速说明

一般来说，有些人可能会说，当我们编写清晰的面向对象代码时，我们在创建对象时不应该需要返回一个模拟实例。这通常可能暗示我们的应用程序存在设计问题或代码异味。

为什么？首先，一个类依赖于几个具体实现可能是紧密耦合的，其次，这几乎总是导致难以测试的代码。理想情况下，一个类不应该负责获取它的依赖项，如果可能的话，它们应该被外部注入。

因此，我们总是值得调查我们是否可以重构我们的代码，使其更易于测试。**当然，这并不总是可能的，有时我们需要在构造后暂时替换一个类的行为。**

这可能在几种情况下特别有用：

- 测试难以到达的场景 - 特别是如果我们的被测试类具有复杂的对象层次结构
- 测试与外部库或框架的交互
- 使用遗留代码

在接下来的部分中，**我们将看到如何使用Mockito的_MockConstruction_来应对这些情况，以便控制对象的创建并指定它们在构造时的行为。**

## 4. 模拟构造函数

让我们首先创建一个简单的_Fruit_类，它将是我们第一个单元测试的重点：

```java
public class Fruit {
    public String getName() {
        return "Apple";
    }

    public String getColour() {
        return "Red";
    }
}
```

现在，让我们继续编写我们的测试，其中我们模拟对_Fruit_类的构造函数调用：

```java
@Test
void givenMockedContructor_whenFruitCreated_thenMockIsReturned() {
    assertEquals("Apple", new Fruit().getName());
    assertEquals("Red", new Fruit().getColour());

    try (MockedConstruction```<Fruit>``` mock = mockConstruction(Fruit.class)) {
        Fruit fruit = new Fruit();
        when(fruit.getName()).thenReturn("Banana");
        when(fruit.getColour()).thenReturn("Yellow");

        assertEquals("Banana", fruit.getName());
        assertEquals("Yellow", fruit.getColour());

        List```<Fruit>``` constructed = mock.constructed();
        assertEquals(1, constructed.size());
    }
}
```

在我们的示例中，我们首先检查一个真实的_Fruit_对象是否返回了期望的值。

现在，为了使模拟对象构造成为可能，我们将使用_Mockito.mockConstruction()_方法。**这个方法需要一个非抽象的Java类，用于我们即将模拟的构造。在这种情况下，是一个_Fruit_类。**

我们将其定义在一个try-with-resources块内。这意味着当我们的代码在try语句中调用_Fruit_对象的构造函数时，它将返回一个模拟对象。**我们应该注意，Mockito不会在我们的作用域块之外模拟构造函数。**

这是一个特别好的特性，因为它确保我们的模拟是暂时的。正如我们知道的，如果我们在测试运行期间玩弄模拟构造函数调用，这可能会由于测试的并发和顺序性质，对我们的测试结果产生不利影响。

## 5. 在另一个类中模拟构造函数

一个更现实的场景是，我们有一个被测试的类，它在内部创建了一些我们想要模拟的对象。

通常，在我们的被测试类的构造函数内，我们可能会创建一些我们希望从我们的测试中模拟的新对象实例。在这个例子中，我们将看到如何做到这一点。

让我们首先定义一个简单的咖啡制作应用程序：

```java
public class CoffeeMachine {
    private Grinder grinder;
    private WaterTank tank;

    public CoffeeMachine() {
        this.grinder = new Grinder();
        this.tank = new WaterTank();
    }

    public String makeCoffee() {
        String type = this.tank.isEspresso() ? "Espresso" : "Americano";
        return String.format("Finished making a delicious %s made with %s beans", type, this.grinder.getBeans());
    }
}
```

接下来，我们定义_Grinder_类：

```java
public class Grinder {
    private String beans;

    public Grinder() {
        this.beans = "Guatemalan";
    }

    public String getBeans() {
        return beans;
    }

    public void setBeans(String beans) {
        this.beans = beans;
    }
}
```

最后，我们添加_WaterTank_类：

```java
public class WaterTank {
    private int mils;

    public WaterTank() {
        this.mils = 25;
    }

    public boolean isEspresso() {
        return getMils() `< 50;
    }

    //Getters and Setters
}
```

在这个简单的例子中，我们的_CoffeeMachine_在构造时创建了一个磨豆机和水箱。我们有一个方法_makeCoffee()_，它打印出有关酿造咖啡的信息。

现在，我们可以继续编写一些测试：

```java
@Test
void givenNoMockedContructor_whenCoffeeMade_thenRealDependencyReturned() {
    CoffeeMachine machine = new CoffeeMachine();
    assertEquals("Finished making a delicious Espresso made with Guatemalan beans", machine.makeCoffee());
}
```

在这个第一个测试中，我们检查当我们不使用_MockedConstruction_时，我们的咖啡机是否返回内部的真实依赖项。

现在让我们看看如何为这些依赖项返回模拟：

```java
@Test
void givenMockedContructor_whenCoffeeMade_thenMockDependencyReturned() {
    try (MockedConstruction`<WaterTank>`` mockTank = mockConstruction(WaterTank.class);
      MockedConstruction``<Grinder>`` mockGrinder = mockConstruction(Grinder.class)) {

        CoffeeMachine machine = new CoffeeMachine();

        WaterTank tank = mockTank.constructed().get(0);
        Grinder grinder = mockGrinder.constructed().get(0);

        when(tank.isEspresso()).thenReturn(false);
        when(grinder.getBeans()).thenReturn("Peruvian");

        assertEquals("Finished making a delicious Americano made with Peruvian beans", machine.makeCoffee());
    }
}
```

这次，我们使用_mockConstruction_在调用_Grinder_和_WaterTank_的构造函数时返回模拟实例。然后，我们使用标准的_when_符号指定这些模拟的期望。

这一次，当我们运行测试时，Mockito确保_Grinder_和_WaterTank_的构造函数返回具有指定行为的模拟实例，允许我们隔离测试_makeCoffee_方法。

## 6. 处理带参数的构造函数

另一个常见的用例是能够处理带参数的构造函数。

幸运的是，_mockedConstruction_提供了一种机制，允许我们访问传递给构造函数的参数：

让我们为我们的_WaterTank_添加一个新的构造函数：

```java
public WaterTank(int mils) {
    this.mils = mils;
}
```

同样，让我们也为我们咖啡应用程序添加一个新的构造函数：

```java
public CoffeeMachine(int mils) {
    this.grinder = new Grinder();
    this.tank = new WaterTank(mils);
}
```

最后，我们可以添加另一个测试：

```java
@Test
void givenMockedContructorWithArgument_whenCoffeeMade_thenMockDependencyReturned() {
    try (MockedConstruction`<WaterTank>` mockTank = mockConstruction(WaterTank.class,
      (mock, context) -> {
          int mils = (int) context.arguments().get(0);
          when(mock.getMils()).thenReturn(mils);
      });
      MockedConstruction``<Grinder>`` mockGrinder = mockConstruction(Grinder.class)) {
          CoffeeMachine machine = new CoffeeMachine(100);

          Grinder grinder = mockGrinder.constructed().get(0);
          when(grinder.getBeans()).thenReturn("Kenyan");
          assertEquals("Finished making a delicious Americano made with Kenyan beans", machine.makeCoffee());
    }
}
```

这次，我们使用一个lambda表达式来处理带参数的_WaterTank_构造函数。**lambda接收模拟实例和构造上下文，允许我们访问传递给构造函数的参数。**

然后，我们可以使用这些参数来设置_getMils_方法的期望行为。

## 7. 更改默认的模拟行为

重要的是要注意，对于方法，我们不会默认地插入一个模拟返回null。**我们可以进一步让我们的_Fruit_示例更进一步，让模拟像真实的_Fruit_实例一样行为：

```java
@Test
void givenMockedContructorWithNewDefaultAnswer_whenFruitCreated_thenRealMethodInvoked() {
    try (MockedConstruction```<Fruit>``` mock = mockConstruction(Fruit.class, withSettings().defaultAnswer(Answers.CALLS_REAL_METHODS))) {

        Fruit fruit = new Fruit();

        assertEquals("Apple", fruit.getName());
        assertEquals("Red", fruit.getColour());
    }
}
```

这一次，我们向_mockConstruction_方法传递了一个额外的参数_MockSettings_，告诉它创建一个模拟，对于我们没有插入的任何方法，它将表现得像一个真实的_Fruit_实例。

## 8. 结论

在这篇简短的文章中，我们看到了几个示例，展示了如何使用Mockito来模拟构造函数调用。总之，Mockito提供了一个优雅的解决方案，用于在当前线程和用户定义的作用域内生成构造函数调用的模拟。

一如既往，本文的完整源代码可在GitHub上找到。

[Baeldung Logo](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)[Gravatar Image](https://secure.gravatar.com/avatar/66d236ad2fbffe8cfd463ebd2b4a43c0?s=50&r=g)[Gravatar Image](https://secure.gravatar.com/avatar/629fdde67cb23f9d3799635d89c7b250?s=50&r=g)[Announcement Icon](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)[Baeldung REST Article Footer Image](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)[Baeldung REST Article Footer Icon](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK