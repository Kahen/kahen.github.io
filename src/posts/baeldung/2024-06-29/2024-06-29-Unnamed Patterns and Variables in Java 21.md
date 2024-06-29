---
date: 2024-06-29
category:
  - Java
  - Programming
tag:
  - Java 21
  - Unnamed Patterns
head:
  - - meta
    - name: keywords
      content: Java 21, Unnamed Patterns, Variables, JEP 443, Java Enhancement Proposal
---
# Java 21 中的无命名模式和变量 | Baeldung

## 1. 概述

Java 21 SE 的发布引入了一个令人兴奋的预览特性：无命名模式和变量（JEP 443）。这个新增加的特性允许我们在只关心副作用时减少样板代码。

无命名模式是对 Java 19 中的记录模式和 Switch 中的模式匹配的改进。我们还应该熟悉作为预览功能在 Java 14 中引入的记录功能。

在本教程中，我们将深入探讨如何使用这些新特性来提高我们的代码质量和可读性。

## 2. 目的

通常，在使用复杂对象时，我们并不总是需要它们持有的所有数据。理想情况下，我们只从对象中获取我们需要的东西，但这种情况很少见。大多数时候，我们最终只使用了我们被给予的一小部分。

这种情况在面向对象编程（OOP）中随处可见，由单一职责原则所体现。无命名模式和变量特性是 Java 在更小规模上解决这个问题的最新尝试。

**由于这是一个预览特性，我们必须确保我们启用它**。在 Maven 中，这是通过修改编译器插件配置来完成的，包括以下编译器参数：

```xml
`<compilerArgs>`
    `<arg>`--enable-preview`</arg>`
`</compilerArgs>`
```

虽然这个特性对 Java 来说是新的，但在其他语言（如 Python 和 Go）中却很受欢迎。由于 Go 并不完全是面向对象的，Java 在面向对象的世界中引入了这个特性。

**无命名变量用于当我们只关心操作的副作用时。它们可以根据需要定义多次，但不能从后面的点引用。**

### 3.1. 增强的 for 循环

首先，假设我们有一个简单的 Car 记录：

```java
public record Car(String name) {}
```

然后，我们需要遍历一个 cars 集合来计算所有汽车的数量并执行一些其他业务逻辑：

```java
for (var car : cars) {
    total++;
    if (total > limit) {
        // 副作用
    }
}
```

虽然我们需要遍历 car 集合的每个元素，但我们并不需要使用它。命名变量会使代码更难阅读，让我们尝试使用新特性：

```java
for (var _ : cars) {
    total++;
    if (total > limit) {
        // 副作用
    }
}
```

这清楚地表明维护者 car 没有被使用。当然，这也可以与基本的 for 循环一起使用：

```java
for (int i = 0, _ = sendOneTimeNotification(); i `< cars.size(); i++) {
    // 通知汽车
}
```

**注意，sendOneTimeNotification() 只被调用一次。该方法还必须返回与第一个初始化相同的类型（在我们的例子中是 i）。**

### 3.2. 赋值语句

我们还可以使用无命名变量与赋值语句。**这在我们需要函数的副作用和一些返回值（但不是全部）时最有用。**

假设我们需要一个方法，它从队列中移除前三个元素并返回第一个被移除的元素：

```java
static Car removeThreeCarsAndReturnFirstRemoved(Queue`<Car>`` cars) {
    var car = cars.poll();
    var _ = cars.poll();
    var _ = cars.poll();
    return car;
}
```

正如我们在上面的示例中看到的，我们可以在同一个块中使用多个赋值。我们也可以忽略 poll() 调用的结果，但这样，它更易于阅读。

### 3.3. Try-Catch 块

可能，无命名变量最有帮助的功能形式是无命名的 catch 块。**很多时候，我们想要处理异常而实际上并不需要知道异常包含什么内容。**

有了无命名变量，我们就不再需要担心这个问题：

```java
try {
    someOperationThatFails(car);
} catch (IllegalStateException _) {
    System.out.println("Got an illegal state exception for: " + car.name());
} catch (RuntimeException _) {
    System.out.println("Got a runtime exception!");
}
```

它们也可以用于同一个 catch 中的多种异常类型：

```java
catch (IllegalStateException | NumberFormatException _) { }
```

### 3.4. Try-With Resources

尽管 try-with 语法比 try-catch 遇到的少，但它也从这个特性中受益。例如，当使用数据库时，我们通常不需要事务对象。

让我们先创建一个模拟事务：

```java
class Transaction implements AutoCloseable {

    @Override
    public void close() {
        System.out.println("Closed!");
    }
}
```

让我们看看这是如何工作的：

```java
static void obtainTransactionAndUpdateCar(Car car) {
    try (var _ = new Transaction()) {
        updateCar(car);
    }
}
```

当然，也可以进行多个赋值：

```java
try (var _ = new Transaction(); var _ = new FileInputStream("/some/file"))
```

### 3.5. Lambda 参数

**Lambda 函数本质上提供了一种很好的代码重用方式**。提供这种灵活性时，我们自然会遇到一些我们不感兴趣的情况。

一个很好的例子是 Map 接口中的 computeIfAbsent() 方法。它检查 map 中是否存在值，或者根据函数计算一个新的值。

虽然很有用，但我们通常不需要 lambda 的参数。它与传递给初始方法的键相同：

```java
static Map`<String, List`<Car>``> getCarsByFirstLetter(List`<Car>` cars) {
    Map`<String, List`<Car>``> carMap = new HashMap<>();
    cars.forEach(car ->
        carMap.computeIfAbsent(car.name().substring(0, 1), _ -> new ArrayList<>()).add(car)
    );
    return carMap;
}
```

这适用于多个 lambda 和多个 lambda 参数：

```java
map.forEach((_, _) -> System.out.println("Works!"));
```

## 4. 无命名模式

无命名模式作为对记录模式匹配的增强引入。**它们解决了一个相当明显的问题：我们通常不需要解构记录中的每个字段。**

为了探讨这个话题，让我们首先添加一个名为 Engine 的类：

```java
abstract class Engine { }
```

引擎可以是汽油的、电动的或混合动力的：

```java
class GasEngine extends Engine { }
class ElectricEngine extends Engine { }
class HybridEngine extends Engine { }
```

最后，让我们扩展 Car 以支持参数化类型，以便我们可以根据引擎类型重用它。我们还将添加一个名为 color 的新字段：

```java
public record Car`<T extends Engine>`(String name, String color, T engine) { }
```

### 4.1. instanceof

**在使用模式解构记录时，无命名模式使我们能够忽略我们不需要的字段。**

假设我们得到一个对象，如果它是一辆汽车，我们想要获取它的颜色：

```java
static String getObjectsColor(Object object) {
    if (object instanceof Car(String name, String color, Engine engine)) {
        return color;
    }
    return "No color!";
}
```

虽然这有效，但它很难阅读，我们定义了我们不需要的变量。让我们看看使用无命名模式是什么样子：

```java
static String getObjectsColorWithUnnamedPattern(Object object) {
    if (object instanceof Car(_, String color, _)) {
        return color;
    }
    return "No color!";
}
```

现在很明显我们只需要汽车的 color。

这也适用于简单的 instanceof 定义，但不太有用：

```java
if (car instanceof Car`<?>` _) { }
```

### 4.2. Switch 模式

**使用 switch 模式解构也允许我们忽略字段：**

```java
static String getObjectsColorWithSwitchAndUnnamedPattern(Object object) {
    return switch (object) {
        case Car(_, String color, _) -> color;
        default -> "No color!";
    };
}
```

**此外，我们还可以处理参数化情况**。例如，我们可以在不同的 switch 案例中处理不同的引擎类型：

```java
return switch (car) {
    case Car(_, _, GasEngine _) -> "gas";
    case Car(_, _, ElectricEngine _) -> "electric";
    case Car(_, _, HybridEngine _) -> "hybrid";
    default -> "none";
};
```

我们还可以更容易地将案例配对在一起，并且还可以带守卫：

```java
return switch (car) {
    case Car(_, _, GasEngine _), Car(_, _, ElectricEngine _) when someVariable == someValue -> "not hybrid";
    case Car(_, _, HybridEngine _) -> "hybrid";
    default -> "none";
};
```

## 5. 结论

无命名模式和变量是一个伟大的补充，它解决了单一职责原则。对于 Java 8 之前的版本来说，这是一个破坏性变更，但后来的版本没有受到影响，因为命名变量 __ 是不允许的。

**这个特性通过减少样板代码和提高可读性，使一切看起来更简单，从而大放异彩**。

如常，代码可以在 GitHub 上找到。