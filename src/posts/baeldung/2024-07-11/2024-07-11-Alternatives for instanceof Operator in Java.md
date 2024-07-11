---
date: 2024-07-11
category:
  - Java
  - 编程
tag:
  - instanceof
  - Java
  - 替代方案
head:
  - - meta
    - name: keywords
      content: Java, instanceof, 替代方案, 编程
---
# Java中instanceof运算符的替代方案

在Java中，instanceof是一个操作符，用于比较一个对象的实例与一个类型。它也被称为类型比较操作符。

在本教程中，我们将探讨传统的instanceof方法的不同替代方案。我们可能需要这些替代方案来改善代码设计和可读性。

## 2. 示例设置

让我们开发一个简单的程序，包括一个父类`Dinosaur`和两个子类，即子类将扩展父类。

首先，让我们创建父类：

```java
public class Dinosaur {
}
```

接下来，让我们创建第一个子类：

```java
public class Anatotitan extends Dinosaur {
    String run() {
        return "running";
    }
}
```

最后，让我们创建第二个子类：

```java
public class Euraptor extends Dinosaur {
    String flies() {
        return "flying";
    }
}
```

`Dinosaur`类有其他子类共有的方法，但为了简单起见，我们跳过了它们。

接下来，让我们编写一个方法来创建我们对象的新实例并调用它们的移动。我们将使用instanceof来检查我们的新实例类型，然后返回结果：

```java
public static void moveDinosaur(Dinosaur dinosaur) {
    if (dinosaur instanceof Anatotitan) {
        Anatotitan anatotitan = (Anatotitan) dinosaur;
        anatotitan.run();
    } else if (dinosaur instanceof Euraptor) {
        Euraptor euraptor = (Euraptor) dinosaur;
        euraptor.flies();
    }
}
```

在接下来的部分中，我们将应用不同的替代方案。

## 3. 使用getClass()

getClass()方法有助于获取一个对象的类。我们可以使用getClass()作为instanceof的替代方案，来检查一个对象是否属于特定的类。

在我们的示例设置中，让我们保持父类和子类的结构不变。然后，让我们编写一个测试方法来实现这种方法。我们将使用getClass()而不是instanceof：

```java
public static String moveDinosaurUsingGetClass(Dinosaur dinosaur) {
    if (dinosaur.getClass().equals(Anatotitan.class)) {
        Anatotitan anatotitan = (Anatotitan) dinosaur;
        return anatotitan.run();
    } else if (dinosaur.getClass().equals(Euraptor.class)) {
        Euraptor euraptor = (Euraptor) dinosaur;
        return euraptor.flies();
    }
    return "";
}
```

让我们为这种方法编写一个单元测试：

```java
@Test
public void givenADinosaurSpecie_whenUsingGetClass_thenGetMovementOfEuraptor() {
    assertEquals("flying", moveDinosaurUsingGetClass(new Euraptor()));
}
```

这种替代方案保持了我们原始的领域对象。变化的是使用getClass()。

## 4. 使用多态性

多态性的概念使得子类可以覆盖父类中的方法。**我们可以利用这一概念来改变我们的示例设置，提高我们的代码设计和可读性。**

由于我们知道所有的恐龙都会移动，我们可以通过在父类中引入一个move()方法来改变我们的设计：

```java
public class Dinosaur {
    String move() {
        return "walking";
    }
}
```

接下来，让我们修改我们的子类，通过覆盖move()方法：

```java
public class Anatotitan extends Dinosaur {
    @Override
    String move() {
        return "running";
    }
}
public class Euraptor extends Dinosaur {
    @Override
    String move() {
        return "flying";
    }
}
```

现在我们可以在不使用instanceof方法的情况下引用子类。让我们编写一个方法，它接受父类作为参数。我们将根据其种类返回恐龙的移动：

```java
public static String moveDinosaurUsingPolymorphism(Dinosaur dinosaur) {
    return dinosaur.move();
}
```

让我们为这种方法编写一个单元测试：

```java
@Test
public void givenADinosaurSpecie_whenUsingPolymorphism_thenGetMovementOfAnatotitan() {
    assertEquals("running", moveDinosaurUsingPolymorphism(new Anatotitan()));
}
```

当可能时，建议使用这种方法来改变我们的设计本身。使用instanceof通常表明我们的设计违反了里氏替换原则（Liskov Substitution Principle，LSP）。

## 5. 使用枚举

在枚举类型中，**变量可以定义为一组预定义常量**。我们可以使用这种方法来改进我们的简单程序。

首先，让我们创建一个枚举，其中包含具有方法的常量。常量的方法覆盖了枚举中的一个抽象方法：

```java
public enum DinosaurEnum {
    Anatotitan {
        @Override
        public String move() {
            return "running";
        }
    },
    Euraptor {
        @Override
        public String move() {
            return "flying";
        }
    };
    abstract String move();
}
```

枚举常量的行为类似于其他替代方案中使用的子类。

接下来，让我们修改我们的moveDinosaur()方法，使用枚举类型：

```java
public static String moveDinosaurUsingEnum(DinosaurEnum dinosaurEnum) {
    return dinosaurEnum.move();
}
```

最后，让我们为这种方法编写一个单元测试：

```java
@Test
public void givenADinosaurSpecie_whenUsingEnum_thenGetMovementOfEuraptor() {
    assertEquals("flying", moveDinosaurUsingEnum(DinosaurEnum.Euraptor));
}
```

这种设计使我们消除了父类和子类。这种方法在父类将具有比我们的示例设置更多的行为的复杂场景中不推荐使用。

## 6. 使用访问者模式

访问者模式有助于操作相似/相关对象。**它将逻辑从对象类移动到另一个类。**

让我们将这种方法应用到我们的示例设置中。首先，让我们创建一个接口，其中包含一个方法，并将一个访问者作为参数传递。这将帮助我们检索我们对象的类型：

```java
public interface Dinosaur {
    String move(Visitor visitor);
}
```

接下来，让我们创建一个访问者接口，并包含两个方法。这些方法接受我们的子类作为参数：

```java
public interface Visitor {
    String visit(Anatotitan anatotitan);
    String visit(Euraptor euraptor);
}
```

接下来，让我们让我们的子类实现Dinosaur接口并覆盖其方法。该方法具有访问者作为参数，以检索我们的对象类型。这个方法取代了使用instanceof：

```java
public class Anatotitan implements Dinosaur {
    public String run() {
        return "running";
    }
    @Override
    public String move(Visitor dinoMove) {
        return dinoMove.visit(this);
    }
}
```

接下来，让我们创建一个类来实现我们的访问者接口并覆盖方法：

```java
public class DinoVisitorImpl implements Visitor {
    @Override
    public String visit(Anatotitan anatotitan) {
        return anatotitan.run();
    }
    @Override
    public String visit(Euraptor euraptor) {
        return euraptor.flies();
    }
}
```

最后，让我们为这种方法编写一个测试方法：

```java
public static String moveDinosaurUsingVisitorPattern(Dinosaur dinosaur) {
    Visitor visitor = new DinoVisitorImpl();
    return dinosaur.move(visitor);
}
```

让我们为这种方法编写一个单元测试：

```java
@Test
public void givenADinosaurSpecie_whenUsingVisitorPattern_thenGetMovementOfAnatotitan() {
    assertEquals("running", moveDinosaurUsingVisitorPattern(new Anatotitan()));
}
```

这种方法使用了接口。访问者包含了我们的程序逻辑。

## 7. 结论

在本文中，我们检查了不同的instanceof替代方案。**instanceof方法可能违反了里氏替换原则**。采用替代方案为我们提供了更好、更稳固的设计。推荐使用多态性方法，因为它增加了更多的价值。

像往常一样，完整的源代码可在GitHub上找到。