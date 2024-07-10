---
date: 2024-07-10
category:
  - Java
  - 编程
tag:
  - Java
  - 枚举
  - 字符串比较
head:
  - - meta
    - name: keywords
      content: Java, 枚举, 字符串比较, 枚举实例, 枚举属性
---

# Java中将字符串与枚举值进行比较

Java在版本5中引入了枚举，枚举提供了一种安全和简洁的方式来管理常量。

在这篇快速教程中，我们将探讨如何将字符串与枚举对象进行比较。

## 2. 问题介绍

首先，让我们看一个枚举的例子：

```java
enum Weekday {
    Mon("Monday"),
    Tue("Tuesday"),
    Wed("Wednesday"),
    Thu("Thursday"),
    Fri("Friday"),
    Sat("Saturday");

    private String fullName;

    Weekday(String fullName) {
        this.fullName = fullName;
    }

    public String getFullName() {
        return fullName;
    }
}
```

如上代码所示，Weekday枚举包含了六个以每个星期日缩写命名的常量。此外，它还有一个fullName属性，用于存储每个星期日的完整名称。

现在假设我们有一个字符串s。那么将s与枚举实例进行比较可以有两种可能性：

- 将s与枚举实例名称进行比较
- 将s与枚举实例的一个字符串属性进行比较

本教程涵盖了这两种场景。此外，我们将执行不区分大小写的比较。

为了简化，我们将使用单元测试断言来验证比较结果。

接下来，让我们创建两个字符串作为输入：

```java
final String SAT = "sAt";
final String SATURDAY = "sAtuRdAy";
```

我们将使用SAT字符串进行枚举名称比较，使用SATURDAY变量进行枚举属性比较。为了完整性，让我们再创建两个字符串用于负测试：

```java
final String TYPO_FRI = "ffri";
final String TYPO_FRIDAY = "ffriday";
```

在了解了如何比较字符串和枚举实例之后，我们还将讨论这些比较的常见用例。那么接下来，让我们在实际中看看它们。

## 3. 将给定的字符串与枚举实例的名称或属性进行比较

首先，让我们看看将给定的字符串与枚举实例的名称进行比较。

**所有枚举类都继承了抽象的java.lang.Enum类**。这个抽象类定义了name()方法，用于返回枚举实例的名称：

```java
public abstract class Enum`<E extends Enum`<E>``> implements Constable, Comparable`<E>`, Serializable {
    private final String name;
    ...

    public final String name() {
        return this.name;
    }
...
```

因此，我们可以使用name()方法来获取枚举常量的名称，并将其与给定的字符串进行比较：

```java
assertTrue(SAT.equalsIgnoreCase(Sat.name()));
assertFalse(TYPO_FRI.equalsIgnoreCase(Fri.name()));
```

如上测试所示，我们使用了equalsIgnoreCase()方法进行不区分大小写的比较。

我们提到，根据需求，我们可能想要将字符串与枚举常量的属性进行比较，例如Weekday中的fullName属性。这并不困难，因为Weekday枚举有一个getter方法来获取属性的值：

```java
assertTrue(SATURDAY.equalsIgnoreCase(Sat.getFullName()));
assertFalse(TYPO_FRI.equalsIgnoreCase(Fri.getFullName()));
```

所以，正如我们所看到的，无论哪种场景，将字符串与枚举进行比较都是相当直接的。

但我们在实践中何时需要这种比较呢？让我们通过例子来讨论这个问题。

## 4. 通过名称和属性查找枚举实例

需要比较的一个常见用例是**通过给定的字符串确定枚举实例**。例如，我们想通过字符串“SAT”找到Weekday.Sat常量。

接下来，让我们在Weekday枚举中添加两个“find”方法：

```java
enum Weekday {
    Mon("Monday"),
    ...

    static Optional```````<Weekday>``````` byNameIgnoreCase(String givenName) {
        return Arrays.stream(values()).filter(it -> it.name().equalsIgnoreCase(givenName)).findAny();
    }

    static Optional```````<Weekday>``````` byFullNameIgnoreCase(String givenFullName) {
        return Arrays.stream(values()).filter(it -> it.fullName.equalsIgnoreCase(givenFullName)).findAny();
    }
   ...
}
```

这两个方法的实现非常相似。一个是按名称查找，另一个是按fullName属性查找。

我们在实现中使用了Stream API。首先，values()是一个静态方法。此外，**它在任何枚举类型中都可用，并返回相应枚举类型的所有枚举常量的数组**。因此，Weekday.values()给我们提供了所有Weekday常量。

然后，我们将常量数组转换为Stream对象。接下来，我们将不区分大小写的比较逻辑作为lambda表达式传递给filter()方法。

由于我们不知道filter()方法是否可以找到一个匹配的枚举实例，**我们返回findAny()方法的结果，这是一个Optional```````<Weekday>```````对象**。

方法调用者可以通过检查这个Optional结果来决定下一步的操作。接下来，让我们看看它在测试方法中的工作方式：

```java
Optional```````<Weekday>``````` optResult = Weekday.byNameIgnoreCase(SAT);
assertTrue(optResult.isPresent());
assertEquals(Sat, optResult.get());

Optional```````<Weekday>``````` optResult2 = Weekday.byNameIgnoreCase(TYPO_FRI);
assertFalse(optResult2.isPresent());
```

如上测试所示，**只有当byNameIgnoreCase()找到一个常量时，Optional结果的isPresent()才会返回true**。

对于“通过属性查找枚举常量”的场景，情况将非常类似。让我们为byFullNameIgnoreCase()方法创建一个测试以确保完整性：

```java
Optional```````<Weekday>``````` optResult = Weekday.byFullNameIgnoreCase(SATURDAY);
assertTrue(optResult.isPresent());
assertEquals(Sat, optResult.get());

Optional```````<Weekday>``````` optResult2 = Weekday.byFullNameIgnoreCase(TYPO_FRIDAY);
assertFalse(optResult2.isPresent());
```

## 5. 结论

在这篇文章中，我们学习了如何将字符串与枚举常量进行比较。此外，我们还通过例子讨论了比较的常见用例。

像往常一样，这里展示的所有代码片段都可以在GitHub上找到。