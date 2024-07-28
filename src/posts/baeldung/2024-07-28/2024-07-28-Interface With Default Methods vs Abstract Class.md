---
date: 2024-07-29
category:
  - Java
  - 编程
tag:
  - 接口
  - 默认方法
  - 抽象类
head:
  - - meta
    - name: keywords
      content: Java接口, 默认方法, 抽象类, Java编程
---
# Java接口中的默认方法与抽象类对比

在Java接口引入了默认方法之后，似乎接口和抽象类之间不再有任何区别。但事实并非如此——它们之间存在一些根本性的差异。

在本教程中，我们将深入探讨接口和抽象类，看看它们是如何不同的。

### 为什么使用默认方法？
默认方法的**目的是在不破坏现有实现的情况下提供外部功能**。引入默认方法最初的动机是为集合框架提供与新lambda函数向后兼容的功能。

让我们看看主要的基本差异。

### 3.1. 状态
抽象类可以有状态，其方法可以访问实现的状态。尽管接口中允许使用默认方法，但它们不能访问实现的状态。

我们在默认方法中编写的任何**逻辑应该与接口的其他方法相关——这些方法将独立于对象的状态**。

假设我们创建了一个抽象类_CircleClass_，它包含一个_String_类型的_color_，用来表示_CircleClass_对象的状态：

```java
public abstract class CircleClass {
    private String color;
    private List``<String>`` allowedColors = Arrays.asList("RED", "GREEN", "BLUE");

    public boolean isValid() {
        if (allowedColors.contains(getColor())) {
            return true;
        } else {
            return false;
        }
    }

    // 标准的getter和setter
}
```

在上述抽象类中，我们有一个非抽象方法_isValid()_，根据其状态验证_CircleClass_对象。_isValid()_方法可以访问_CircleClass_对象的状态，并根据允许的颜色验证_CircleClass_的实例。由于这种行为，我们可以在抽象类方法中编写任何基于对象状态的逻辑。

让我们创建一个_CircleClass_的简单实现类：

```java
public class ChildCircleClass extends CircleClass {
}
```

现在，让我们创建一个实例并验证颜色：

```java
CircleClass redCircle = new ChildCircleClass();
redCircle.setColor("RED");
assertTrue(redCircle.isValid());
```

在这里，我们可以看到，当我们在_CircleClass_对象中放入一个有效颜色并调用_isValid()_方法时，内部的_isValid()_方法可以访问_CircleClass_对象的状态，并检查实例是否包含有效颜色。

让我们尝试使用带有默认方法的接口来做类似的事情：

```java
public interface CircleInterface {
    List``<String>`` allowedColors = Arrays.asList("RED", "GREEN", "BLUE");

    String getColor();

    public default boolean isValid() {
        if (allowedColors.contains(getColor())) {
            return true;
        } else {
            return false;
        }
    }
}
```

我们知道，接口不能有状态，因此默认方法不能访问状态。

在这里，我们定义了_getColor()_方法来提供状态信息。子类将重写_getColor()_方法，以在运行时提供实例的状态：

```java
public class ChidlCircleInterfaceImpl implements CircleInterface {
    private String color;

    @Override
    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
```

让我们创建一个实例并验证颜色：

```java
ChidlCircleInterfaceImpl redCircleWithoutState = new ChidlCircleInterfaceImpl();
redCircleWithoutState.setColor("RED");
assertTrue(redCircleWithoutState.isValid());
```

正如我们在这里看到的，我们在子类中重写了_getColor()_方法，以便默认方法在运行时验证状态。

### 3.2. 构造函数
抽象类可以有构造函数，允许我们在创建时初始化状态。接口当然没有构造函数。

### 3.3. 语法差异
此外，还有一些关于语法的差异。一个抽象类可以覆盖_Object_类的方法，但接口不能。

一个抽象类可以声明实例变量，具有所有可能的访问修饰符，并且它们可以在子类中被访问。接口只能有公共的、静态的和最终的变量，并且不能有任何实例变量。

此外，抽象类可以声明实例和静态块，而接口不能有这两种块。

最后，一个抽象类不能引用lambda表达式，而接口可以有一个单一的抽象方法，可以引用lambda表达式。

## 4. 结论
本文展示了带有默认方法的抽象类和接口之间的差异。我们还看到了根据我们的场景选择哪一个最合适。

只要可能，我们**总是选择带有默认方法的接口，因为它允许我们扩展一个类并** **同时实现一个接口**。

像往常一样，本文中展示的所有代码示例都可以在GitHub上找到。