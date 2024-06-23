---
date: 2024-06-24
category:
  - Software Engineering
tag:
  - Java
  - Design Pattern
  - Builder Pattern
head:
  - - meta
    - name: keywords
      content: Java, Builder Pattern, Inheritance, Software Design
---
# 建造者模式与继承

在这个教程中，我们将学习在处理层次继承时实现建造者设计模式所面临的挑战。层次继承的一个例子可能是电动汽车、汽车和车辆之间的继承关系。

建造者模式是一种创建型设计模式，它通过方法链的帮助，以逐步过程简化了构建具有许多属性的复杂对象。虽然继承有助于简化设计，但它也导致了在建造者模式中实现方法链以创建对象时的复杂性。

此外，我们将通过Java泛型API的帮助，找到一个高效的实现方法。

## 2. 问题描述

让我们以在创建_Vehicle_、_Car_和_ElectricCar_类型对象时应用建造者模式为例：

在对象层次结构的顶部，有_Vehicle_类。**类_Car_扩展了_Vehicle_，然后_ElectricCar_扩展了_Car_。类似于这些对象，它们的建造者在它们之间也有层次关系。**

让我们实例化_CarBuilder_类，使用方法链设置其属性，最后调用_build()_方法来获取_car_对象：

```java
CarBuilder carBuilder = new CarBuilder();
Car car = carBuilder.make("Ford")
  .model("F")
  .fuelType("Petrol")
  .colour("red")
  .build();
```

让我们**尝试改变方法调用的顺序**：

```java
CarBuilder carBuilder = new CarBuilder();
Car car = carBuilder.make("Ford")
  .colour("red")
  .fuelType("Petrol")
  .model("F")
  .build();
```

方法_colour()_和_fuelType()_返回_VehicleBuilder_类。因此，后续对_model()_的调用**将导致编译错误**，因为它在_VehicleBuilder_类中不存在。这是不方便的，也是一个缺点。当我们尝试使用_ElectricVehicleBuilder_类构建_ElectricVehicle_对象时，也会出现类似的行为。

## 3. 没有泛型的解决方案

**这是一个非常直接的实现，其中子建造者类覆盖了层次结构中所有基建造者类的链式方法。** 因此，在设置属性值的方法链期间不会出现编译错误。

让我们首先看看_Vehicle_类：

```java
public class Vehicle {

    private String fuelType;
    private String colour;

    // 标准获取器方法...

    public Vehicle(VehicleBuilder builder) {
        this.colour = builder.colour;
        this.fuelType = builder.fuelType;
    }

    public static class VehicleBuilder {

        protected String fuelType;
        protected String colour;

        public VehicleBuilder fuelType(String fuelType) {
            this.fuelType = fuelType;
            return this;
        }

        public VehicleBuilder colour(String colour) {
            this.colour = colour;
            return this;
        }

        public Vehicle build() {
            return new Vehicle(this);
        }
    }
}
```

_Vehicle_类有两个属性_fuelType_和_colour_。它还有一个内部类_VehicleBuilder_，其中的方法名称与_Vehicle_类中的属性相似。它们返回建造者类，以便支持方法链。

现在，让我们看看_Car_类：

```java
public class Car extends Vehicle {

    private String make;
    private String model;

    // 标准获取器方法...

    public Car(CarBuilder builder) {
        super(builder);
        this.make = builder.make;
        this.model = builder.model;
    }

    public static class CarBuilder extends VehicleBuilder {

        protected String make;
        protected String model;

        @Override
        public CarBuilder colour(String colour) {
            this.colour = colour;
            return this;
        }

        @Override
        public CarBuilder fuelType(String fuelType) {
            this.fuelType = fuelType;
            return this;
        }

        public CarBuilder make(String make) {
            this.make = make;
            return this;
        }

        public CarBuilder model(String model) {
            this.model = model;
            return this;
        }

        public Car build() {
            return new Car(this);
        }
    }
}
```

类_Car_从_Vehicle_继承，同样，_CarBuilder_类从_VehicleBuilder_继承。此外，_CarBuilder_类必须覆盖方法_colour()_和_fuelType()_。

让我们现在构建一个_Car_对象：

```java
@Test
void givenNoGenericImpl_whenBuild_thenReturnObject() {
    Car car = new Car.CarBuilder().colour("red")
      .fuelType("Petrol")
      .make("Ford")
      .model("F")
      .build();
    assertEquals("red", car.getColour());
    assertEquals("Ford", car.getMake());
}
```

我们可以在调用_build()_方法之前以任何顺序设置汽车的属性。

然而，对于_Car_的子类，如_ElectricCar_，我们必须在_ElectricCarBuilder_中覆盖_CarBuilder_和_VehicleBuilder_的所有方法。因此，**这不是一个非常高效的实现**。

## 4. 使用泛型的解决方案

泛型可以帮助我们克服前面讨论的实现中的挑战。

让我们修改_Vehicle_类中的内部_Builder_类：

```java
public class Vehicle {

    private String colour;
    private String fuelType;

    public Vehicle(Builder builder) {
        this.colour = builder.colour;
        this.fuelType = builder.fuelType;
    }

    // 标准获取器方法...
    public static class Builder``<T extends Builder```<T>`````> {

        protected String colour;
        protected String fuelType;

        T self() {
            return (T) this;
        }

        public T colour(String colour) {
            this.colour = colour;
            return self();
        }

        public T fuelType(String fuelType) {
            this.fuelType = fuelType;
            return self();
        }

        public Vehicle build() {
            return new Vehicle(this);
        }
    }
}
```

注意，在内部_Builder_类的_fuelType()_和_colour()_方法返回泛型类型。这种实现方式促进了流畅风格的编码或方法链。**这是一种众所周知的设计模式，名为** **Curiously Recurring Template Pattern(CRTP)**。

现在让我们实现_Car_类：

```java
public class Car extends Vehicle {

    private String make;
    private String model;

    // 标准获取器...
    public Car(Builder builder) {
        super(builder);
        this.make = builder.make;
        this.model = builder.model;
    }

    public static class Builder``<T extends Builder```<T>`````> extends Vehicle.Builder```<T>``` {

        protected String make;
        protected String model;

        public T make(String make) {
            this.make = make;
            return self();
        }

        public T model(String model) {
            this.model = model;
            return self();
        }

        @Override
        public Car build() {
            return new Car(this);
        }
    }
}
```

我们在内部_Builder_类的签名中应用了CRTP，并使内部类的方法返回泛型类型以支持方法链。

类似地，让我们实现_Car_的子类_ElectricCar_：

```java
public class ElectricCar extends Car {
    private String batteryType;

    public String getBatteryType() {
        return batteryType;
    }

    public ElectricCar(Builder builder) {
        super(builder);
        this.batteryType = builder.batteryType;
    }

    public static class Builder``<T extends Builder```<T>`````> extends Car.Builder```<T>``` {
        protected String batteryType;

        public T batteryType(String batteryType) {
            this.batteryType = batteryType;
            return self();
        }

        @Override
        public ElectricCar build() {
            return new ElectricCar(this);
        }
    }
}
```

实现几乎相同，除了内部_Builder_类扩展了其父类_Builder.Car```<T>```_。相同的技术必须应用于_ElectricCar_的后续子类等等。

让我们看看实现在行动中：

```java
@Test
void givenGenericImpl_whenBuild_thenReturnObject() {
    Car.Builder````<?>```` carBuilder = new Car.Builder();
    Car car = carBuilder.colour("red")
      .fuelType("Petrol")
      .make("Ford")
      .model("F")
      .build();

    ElectricCar.Builder````<?>```` ElectricCarBuilder = new ElectricCar.Builder();
    ElectricCar eCar = ElectricCarBuilder.make("Mercedes")
      .colour("White")
      .model("G")
      .fuelType("Electric")
      .batteryType("Lithium")
      .build();

    assertEquals("red", car.getColour());
    assertEquals("Ford", car.getMake());

    assertEquals("Electric", eCar.getFuelType());
    assertEquals("Lithium", eCar.getBatteryType());
}
```

该方法成功构建了_Car_和_ElectricCar_类型的对象。

**有趣的是，我们使用了原始泛型类型_?_来声明内部类_Car.Builder````<?>````_和_ElectricCar.Builder````<?>````_**。这是因为我们需要确保方法调用如_carBuilder.colour()_和_carBuilder.fuelType()_返回_Car.Builder_而不是其父_Vehicle.Builder_。

同样，方法调用_ElectricCarBuilder.make()_和_ElectricCarBuilder.model()_应该返回_ElectricCarBuilder_而不是_CarBuilder_类。没有这种方法链是不可能的。

## 5. 结论

在本文中，我们讨论了在处理继承时建造者设计模式所面临的挑战。Java泛型和Curiously Recurring Template Pattern帮助我们实现了解决方案。通过这种方式，我们可以使用方法链，而不必担心设置建造者类中属性值的方法调用顺序。

像往常一样，使用的代码可以在GitHub上找到。

OK