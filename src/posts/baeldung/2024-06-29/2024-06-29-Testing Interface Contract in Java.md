---
date: 2022-04-01
category:
  - Java
  - JUnit
tag:
  - JUnit
  - 接口测试
head:
  - - meta
    - name: keywords
      content: Java, JUnit, 接口合约测试
---
# Java中测试接口合约的不同方法

继承是Java中的一个重要概念。接口是实现该概念的方式之一。

接口定义了一个合约，多个类可以实现它。因此，测试这些实现类以确保它们遵守相同的合约是至关重要的。

在本教程中，我们将探讨在Java中为接口编写JUnit测试的不同方法。

## 2. 环境搭建

让我们创建一个基本的环境，用于我们不同方法的测试。

首先，我们创建一个名为_Shape_的简单接口，它有一个方法_area()_：

```java
public interface Shape {
    double area();
}
```

其次，我们定义了一个_Circle_类，它实现了_Shape_接口。它还有一个自己的方法_circumference()_：

```java
public class Circle implements Shape {
    private double radius;

    Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double area() {
        return 3.14 * radius * radius;
    }

    public double circumference() {
        return 2 * 3.14 * radius;
    }
}
```

最后，我们定义了另一个类_Rectangle_，它实现了_Shape_接口。它有一个额外的方法_perimeter()_：

```java
public class Rectangle implements Shape {
    private double length;
    private double breadth;

    public Rectangle(double length, double breadth) {
        this.length = length;
        this.breadth = breadth;
    }

    @Override
    public double area() {
        return length * breadth;
    }

    public double perimeter() {
        return 2 * (length + breadth);
    }
}
```

## 3. 测试方法

现在，让我们看看可以遵循的不同方法来测试实现类。

### 3.1. 实现类的单独测试

最受欢迎的方法之一是为接口的每个实现类创建单独的JUnit测试类。我们将测试类的两个方法——继承的方法以及类自身定义的方法。

首先，我们创建_CircleUnitTest_类，其中包含_area()_和_circumference()_方法的测试用例：

```java
@Test
void whenAreaIsCalculated_thenSuccessful() {
    Shape circle = new Circle(5);
    double area = circle.area();
    assertEquals(78.5, area);
}

@Test
void whenCircumferenceIsCalculated_thenSuccessful(){
    Circle circle = new Circle(2);
    double circumference = circle.circumference();
    assertEquals(12.56, circumference);
}
```

接下来，我们创建_RectangleUnitTest_类，其中包含_area()_和_perimeter()_方法的测试用例：

```java
@Test
void whenAreaIsCalculated_thenSuccessful() {
    Shape rectangle = new Rectangle(5,4);
    double area = rectangle.area();
    assertEquals(20, area);
}

@Test
void whenPerimeterIsCalculated_thenSuccessful() {
    Rectangle rectangle = new Rectangle(5,4);
    double perimeter = rectangle.perimeter();
    assertEquals(18, perimeter);
}
```

正如我们从上面的两个类中看到的，**我们可以成功地测试接口方法以及实现类可能定义的任何额外方法。**

使用这种方法，我们可能需要**为所有实现类重复编写相同的接口方法测试**。正如我们在单独测试中看到的，相同的_area()_方法正在两个实现类中进行测试。

随着实现类的增加，测试在实现中成倍增加，接口定义的方法数量也随之增加。因此，**代码复杂性和冗余也随之增加，这使得维护和随时间变化变得更加困难。**

### 3.2. 参数化测试

为了克服这个问题，让我们创建一个参数化测试，它接受不同实现类的实例作为输入：

```java
@ParameterizedTest
@MethodSource("data")
void givenShapeInstance_whenAreaIsCalculated_thenSuccessful(Shape shapeInstance, double expectedArea){
    double area = shapeInstance.area();
    assertEquals(expectedArea, area);
}

private static Collection`<Object[]>` data() {
    return Arrays.asList(new Object[][] {
      { new Circle(5), 78.5 },
      { new Rectangle(4, 5), 20 }
    });
}
```

使用这种方法，**我们已经成功地测试了实现类的接口合约。**

**然而，我们没有灵活性去定义接口之外的任何内容。** 因此，我们可能仍然需要以其他形式测试实现类。这可能需要在它们自己的JUnit类中测试它们。

### 3.3. 使用基础测试类

使用前两种方法，我们没有足够的灵活性来扩展测试用例，除了验证接口合约之外。同时，我们也希望避免代码冗余。那么，让我们看看另一种可以解决这两个问题的方法。

在这种方法中，我们定义一个基础测试类。这个抽象测试类定义了要测试的方法，即接口合约。随后，实现类的测试类可以扩展这个抽象测试类来构建测试。

我们将使用**模板方法模式**，其中我们在基础测试类中定义了测试_area()_方法的算法，然后，测试子类只需要提供在算法中使用的实现。

让我们定义一个基础测试类来测试_area()_方法：

```java
public abstract Map````<String, Object>```` instantiateShapeWithExpectedArea();

@Test
void givenShapeInstance_whenAreaIsCalculated_thenSuccessful() {
    Map````<String, Object>```` shapeAreaMap = instantiateShapeWithExpectedArea();
    Shape shape = (Shape) shapeAreaMap.get("shape");
    double expectedArea = (double) shapeAreaMap.get("area");
    double area = shape.area();
    assertEquals(expectedArea, area);
}
```

现在，让我们为_Circle_类创建JUnit测试类：

```java
@Override
public Map````<String, Object>```` instantiateShapeWithExpectedArea() {
    Map``<String,Object>`` shapeAreaMap = new HashMap<>();
    shapeAreaMap.put("shape", new Circle(5));
    shapeAreaMap.put("area", 78.5);
    return shapeAreaMap;
}

@Test
void whenCircumferenceIsCalculated_thenSuccessful(){
    Circle circle = new Circle(2);
    double circumference = circle.circumference();
    assertEquals(12.56, circumference);
}
```

最后，是_Rectangle_类的测试类：

```java
@Override
public Map````<String, Object>```` instantiateShapeWithExpectedArea() {
    Map``<String,Object>`` shapeAreaMap = new HashMap<>();
    shapeAreaMap.put("shape", new Rectangle(5,4));
    shapeAreaMap.put("area", 20.0);
    return shapeAreaMap;
}

@Test
void whenPerimeterIsCalculated_thenSuccessful() {
    Rectangle rectangle = new Rectangle(5,4);
    double perimeter = rectangle.perimeter();
    assertEquals(18, perimeter);
}
```

在这种方法中，我们重写了_instantiateShapeWithExpectedArea()_方法。在这个方法中，我们提供了_Shape_实例以及预期的面积。这些参数可以由基础测试类中定义的测试方法使用来执行测试。

总结来说，使用这种方法，**实现类可以拥有它们自己方法的测试，并继承接口方法的测试。**

## 4. 结论

在本文中，我们探讨了编写JUnit测试以验证接口合约的不同方式。

首先，我们看了为每个实现类定义单独的测试类是多么直接。然而，这可能导致很多冗余代码。

然后，我们探索了如何使用参数化测试来帮助我们避免冗余，但它的灵活性较小。

最后，我们看到了基础测试类方法，它解决了其他两种方法中的问题。

如常，源代码可在GitHub上找到。