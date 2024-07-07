---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - helper class
  - utility class
head:
  - - meta
    - name: keywords
      content: Java helper class, utility class, Java programming
---

# Java 中的辅助类与工具类

在本教程中，我们将探讨Java中的辅助类（helper class）和工具类（utility class）之间的区别。我们首先检查每种类的含义以及如何创建它们。

辅助类提供了Java程序整体运行所需的功能。辅助类**包含其他类用来执行重复任务的方法，这些任务并不是应用程序的核心目的**。

正如其名，它们通过提供一些功能来帮助其他类，这些功能补充了这些类所提供的服务。

它们包含实现平凡和重复任务的方法，使整个代码库模块化，并且可以在多个类中重用。

辅助类可以被实例化，并且可能包含实例变量、实例和静态方法。

在我们的应用程序中可以存在辅助类的多个实例。当不同的类具有共同的功能时，我们可以将这些功能组合在一起，形成一个在应用程序的某些类中可访问的辅助类。

### 2.1. 如何创建Java辅助类

我们将创建一个示例辅助类以进一步理解这个概念。

要创建一个辅助类，我们使用类的默认访问修饰符。默认访问修饰符确保只有同一包中的类才能访问此类、其方法和变量：

```java
class MyHelperClass {
    public double discount;

    public MyHelperClass(double discount) {
        if (discount > 0 && discount `< 1) {
            this.discount = discount;
        }
    }

    public double discountedPrice(double price) {
        return price - (price * discount);
    }

    public static int getMaxNumber(int[] numbers) {
        if (numbers.length == 0) {
            throw new IllegalArgumentException("Ensure array is not empty");
        }
        int max = numbers[0];
        for (int i = 1; i < numbers.length; i++) {
            if (numbers[i] >` max) {
                max = numbers[i];
            }
        }
        return max;
    }

    public static int getMinNumber(int[] numbers) {
        if (numbers.length == 0) {
            throw new IllegalArgumentException("Ensure array is not empty");
        }
        int min = numbers[0];
        for (int i = 1; i < numbers.length; i++) {
            if (numbers[i] < min) {
                min = numbers[i];
            }
        }
        return min;
    }
}
```

在定义了类之后，我们可以添加任意多的相关的实例和静态方法。

辅助类可以有实例方法，因为它们可以被实例化。

如上述代码片段所示，我们在_MyHelperClass_中既有实例方法也有静态方法：

```java
@Test
void whenCreatingHelperObject_thenHelperObjectShouldBeCreated() {
    MyHelperClass myHelperClassObject = new MyHelperClass(0.10);
    assertNotNull(myHelperClassObject);
    assertEquals(90, myHelperClassObject.discountedPrice(100.00));

    int[] numberArray = {15, 23, 66, 3, 51, 79};
    assertEquals(79, MyHelperClass.getMaxNumber(numberArray));
    assertEquals(3, MyHelperClass.getMinNumber(numberArray));
}
```

从测试中我们可以看到，创建了一个辅助对象。辅助类中的静态方法是通过类名访问的。

## 3. Java工具类

Java中的工具类是一个提供静态方法的类，这些方法可以在应用程序中使用。工具类中的静态方法用于执行应用程序中的常见例程。

**工具类不能被实例化**，有时是无状态的，没有静态变量。我们声明工具类为_final_，并且它的所有方法必须是_static_。

由于我们不希望工具类被实例化，因此引入了私有构造函数。有**私有构造函数意味着Java不会为我们的工具类创建默认构造函数**。构造函数可以为空。

**工具类的目的是提供执行程序中某些功能的方法**，而主类专注于它解决的核心问题。

工具类的方法通过类名访问。它使我们的代码在使用时更加灵活，同时保持模块化。

Java有诸如_java.util.Arrays_、_java.lang.Math_、_java.util.Scanner_、_java.util.Collections_等工具类。

### 3.1. 如何创建Java工具类

创建工具类与创建辅助类没有太大不同。创建工具类时，有一些事情需要稍微不同地处理。

要创建一个工具类，**我们使用_public_访问修饰符，并将类声明为_final_**。创建工具类时使用的_final_关键字意味着该类将保持不变。它不能被继承或实例化。

让我们创建一个名为_MyUtilityClass_的工具类：

```java
public final class MyUtilityClass {

    private MyUtilityClass(){}

    public static String returnUpperCase(String stringInput) {
        return stringInput.toUpperCase();
    }

    public static String returnLowerCase(String stringInput) {
        return stringInput.toLowerCase();
    }

    public static String[] splitStringInput(String stringInput, String delimiter) {
        return stringInput.split(delimiter);
    }

}
```

需要遵守的另一个规则是，工具类的所有方法都是_static_，具有_public_访问修饰符。

由于工具类中只有静态方法，这些方法只能通过类名访问：

```java
@Test
void whenUsingUtilityMethods_thenAccessMethodsViaClassName(){
    assertEquals(MyUtilityClass.returnUpperCase("iniubong"), "INIUBONG");
    assertEquals(MyUtilityClass.returnLowerCase("AcCrA"), "accra");
}
```

如上所见，工具类中的_returnUpperCase()_和_returnLowerCase()_方法只能通过类名由其调用者访问。

## 4. Java辅助类与工具类

Java中的辅助类和工具类通常具有相同的目的。**工具类是一个通用的辅助类。开发人员有时交替使用这些术语**。

这是因为它们通过提供处理应用程序核心功能之外的某些任务的方法来补充其他类。

尽管它们非常相似，但它们之间存在一些微妙的区别：

- 辅助类可以被实例化，而工具类不能被实例化，因为它们有私有构造函数。
- 辅助类可以有实例变量，也可以有实例和静态方法。
- 工具类只有静态变量和方法。
- 工具类通常在应用程序中具有全局作用域，而辅助类总是被赋予包作用域。

## 5. 结论

在本文中，我们探讨了Java中的辅助类和工具类是什么。我们还发现，由于它们在应用程序中的使用方式，辅助类和工具类在性质上非常相似。

我们详细讨论了如何创建辅助类或工具类。

在Java中创建健壮的应用程序时，我们应该始终记得将执行重复任务的相似但独立的相似方法分组到辅助类或工具类中。有时创建工具类或辅助类可能会违背Java的面向对象编程范式。然而，它们使我们的代码库非常模块化和可重用。

如常，本教程的代码可以在GitHub上找到。

OK