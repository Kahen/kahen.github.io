---
date: 2022-11-01
category:
  - Java
  - 设计模式
tag:
  - 工厂模式
  - 设计模式
head:
  - - meta
    - name: keywords
      content: Java, 设计模式, 工厂模式, 抽象工厂模式, 工厂方法模式
---

# Java 中的工厂设计模式

在本教程中，我们将解释 Java 中的工厂设计模式。我们将描述两种模式，它们都是创建型设计模式：工厂方法和抽象工厂。然后我们将使用一个示例来说明这些模式。

## 2. 工厂方法模式

首先，我们需要定义一个示例。我们正在为一家汽车制造商开发一个应用程序。最初，我们只有一个客户端。这个客户端用纯燃油发动机制造汽车。因此，为了遵循单一职责原则（SRP）和开闭原则（OCP），我们将使用工厂方法设计模式。

在我们深入代码之前，我们将为这个模式定义一个默认的 UML 图：

![img](https://www.baeldung.com/wp-content/uploads/2022/11/factory_design_pattern_base.png)

使用上面的 UML 图作为参考，我们将定义与这个模式相关的一些主要概念。**工厂方法模式通过将产品的构造代码与使用该产品的代码分离，减少了代码的耦合。** 这种设计使得从应用程序的其余部分独立地提取产品构造变得容易。此外，它允许引入新产品而不会破坏现有代码。

现在让我们进入代码。首先，在我们的示例应用程序中，我们将定义 _MotorVehicle_ 接口。这个接口只有一个方法 _build()_。这个方法用于构建特定的机动车辆。接口的代码片段：

```
public interface MotorVehicle {
    void build();
}
```

接下来，我们将实现实现 _MotorVehicle_ 接口的具体类。我们将创建两种类型：_Motorcycle_ 和 _Car_。第一个的代码是：

```
public class Motorcycle implements MotorVehicle {
    @Override
    public void build() {
        System.out.println("构建摩托车");
    }
}
```

在 _Car_ 类的情况下，代码是：

```
public class Car implements MotorVehicle {
    @Override
    public void build() {
        System.out.println("构建汽车");
    }
}
```

然后我们将创建 _MotorVehicleFactory_ 类。这个类负责创建每一个新的车辆实例。它是一个抽象类，因为它为它的特定工厂制造特定的车辆。这个类的代码是：

```
public abstract class MotorVehicleFactory {
    public MotorVehicle create() {
        MotorVehicle vehicle = createMotorVehicle();
        vehicle.build();
        return vehicle;
    }
    protected abstract MotorVehicle createMotorVehicle();
}
```

正如我们所看到的，_create()_ 方法调用抽象方法 _createMotorVehicle()_ 来创建特定类型的机动车辆。这就是为什么每个特定的机动车辆工厂必须实现其正确的 _MotorVehicle_ 类型。之前，我们实现了两种 _MotorVehicle_ 类型：_Motorcycle_ 和 _Car_。现在我们将从我们的基类 _MotorVehicleFactory_ 扩展来实现两者。

首先是 _MotorcycleFactory_ 类：

```
public class MotorcycleFactory extends MotorVehicleFactory {
    @Override
    protected MotorVehicle createMotorVehicle() {
        return new Motorcycle();
    }
}
```

然后是 _CarFactory_ 类：

```
public class CarFactory extends MotorVehicleFactory {
    @Override
    protected MotorVehicle createMotorVehicle() {
        return new Car();
    }
}
```

就是这样；我们的应用程序是使用工厂方法模式设计的。我们现在可以添加尽可能多的新机动车辆。最后，我们需要看看我们的最终设计使用 UML 表示法的样子：

![img](https://www.baeldung.com/wp-content/uploads/2022/11/factory_design_pattern_result.png)

## 3. 抽象工厂模式

在我们的第一个应用程序迭代之后，两家新的汽车品牌公司对我们的系统感兴趣：_NexGen_ 和 _FutureVehicle_。这些新公司不仅制造纯燃油汽车，还制造电动汽车。每家公司都有其车辆设计。

我们当前的系统还没有准备好处理这些新场景。我们必须支持电动汽车，并考虑到每家公司都有其设计。为了解决这些问题，我们可以使用抽象工厂模式。**当我们开始使用工厂方法模式，并且我们需要将我们的系统发展到更复杂的系统时，通常使用这个模式。** **它将产品创建代码集中在一个地方。** UML 表示是：

![img](https://www.baeldung.com/wp-content/uploads/2022/11/abstract_factory_design_pattern_base.png)

我们已经拥有 _MotorVehicle_ 接口。此外，我们必须添加一个接口来表示电动汽车。新接口的代码片段是：

```
public interface ElectricVehicle {
    void build();
}
```

接下来，我们将创建我们的抽象工厂。这个新类是抽象的，因为对象创建的责任将由我们的具体工厂来承担。这种行为遵循 OCP 和 SRP。让我们进入类定义：

```
public abstract class Corporation {
    public abstract MotorVehicle createMotorVehicle();
    public abstract ElectricVehicle createElectricVehicle();
}
```

在我们为每家公司创建具体工厂之前，我们必须为我们的新公司实现一些车辆。让我们为 _FutureVehicle_ 公司制作一些新类：

```
public class FutureVehicleMotorcycle implements MotorVehicle {
    @Override
    public void build() {
        System.out.println("未来车辆摩托车");
    }
}
```

然后是电动汽车实例：

```
public class FutureVehicleElectricCar implements ElectricVehicle {
    @Override
    public void build() {
        System.out.println("未来车辆电动汽车");
    }
}
```

我们将为 _NexGen_ 公司做同样的事情：

```
public class NextGenMotorcycle implements MotorVehicle {
    @Override
    public void build() {
        System.out.println("下一代摩托车");
    }
}
```

另外，另一个电动汽车的具体实现：

```
public class NextGenElectricCar implements ElectricVehicle {
    @Override
    public void build() {
        System.out.println("下一代电动汽车");
    }
}
```

最后，我们准备构建我们的具体工厂。首先，我们将从 _FutureVehicle_ 工厂开始：

```
public class FutureVehicleCorporation extends Corporation {
    @Override
    public MotorVehicle createMotorVehicle() {
        return new FutureVehicleMotorcycle();
    }
    @Override
    public ElectricVehicle createElectricVehicle() {
        return new FutureVehicleElectricCar();
    }
}
```

现在另一个：

```
public class NextGenCorporation extends Corporation {
    @Override
    public MotorVehicle createMotorVehicle() {
        return new NextGenMotorcycle();
    }
    @Override
    public ElectricVehicle createElectricVehicle() {
        return new NextGenElectricCar();
    }
}
```

完成了。我们使用抽象工厂模式完成了实现。这是我们自定义实现的 UML 图：

![img](https://www.baeldung.com/wp-content/uploads/2022/11/abstract_factory_design_pattern_result.png)

## 4. 工厂方法与抽象工厂

总结来说，**工厂方法使用继承作为设计工具**。与此同时，**抽象工厂使用委托**。前者依赖于派生类来实现，而基类提供预期的行为。此外，**它是方法而不是类**。另一方面，**抽象工厂应用于类**。**两者都遵循 OCP 和 SRP**，产生松耦合的代码，为我们的代码库提供更多的未来变更灵活性。创建代码在一个地方。

## 5. 结论

在本文中，我们展示了工厂设计模式。我们描述了工厂方法和抽象工厂。我们提供了一个示例系统来说明这些模式的使用。最后，我们简要比较了两种模式。

像往常一样，代码片段在 GitHub 上。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)