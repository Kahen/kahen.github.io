---
date: 2022-04-01
category:
  - Java
  - 反射
tag:
  - Java反射
  - 编程实践
head:
  - - meta
    - name: keywords
      content: Java反射, 编程实践, 性能, 安全性, 代码维护
---
# Java反射是否是不良实践？ | Baeldung

## 1. 概述

**Java反射API的使用在Java社区中引发了长时间的广泛讨论，有时被视为不良实践。** 尽管它被流行的Java框架和库广泛使用，但其潜在的缺点阻止了它在常规服务器端应用程序中的频繁使用。

在本教程中，我们将深入探讨反射可能引入到我们的代码库中的优点和缺点。此外，**我们将探讨何时使用反射是适当或不适当的，最终帮助我们确定它是否构成不良实践。**

## 2. 理解Java反射

**在计算机科学中，反射性编程或反射是一个进程检查、内省和修改其结构和行为的能力。** 当一个编程语言完全支持反射时，它允许在运行时检查和修改代码库中类和对象的结构和行为，允许源代码重写自身的某些方面。

根据这个定义，Java提供了对反射的全面支持。除了Java，其他提供反射编程支持的常见编程语言包括C#、Python和JavaScript。

许多流行的Java框架，如Spring和Hibernate，依赖于它来提供高级特性，如依赖注入、面向切面编程和数据库映射。除了通过框架或库间接使用反射外，我们还可以直接使用java.lang.reflect包或Reflections库来使用它。

## 3. Java反射的优点

**如果谨慎使用，Java反射可以是一个强大且多功能的特性。** 在本节中，我们将探讨反射的一些关键优势以及如何在特定场景中有效使用它。

### 3.1. 动态配置

**反射API增强了动态编程，提高了应用程序的灵活性和适应性。** 这一方面在我们遇到直到运行时才知道所需类或模块的场景中证明是有价值的。

此外，通过利用反射的动态能力，开发人员可以构建可以在实时轻松重新配置的系统，无需进行广泛的代码更改。

**例如，Spring框架使用反射来创建和配置bean。** 它扫描类路径组件，并根据注解和XML配置动态实例化和配置bean，允许开发人员在不更改源代码的情况下添加或修改bean。

### 3.2. 可扩展性

**使用反射的另一个显著优势是可扩展性。这使我们能够在不更改应用程序核心代码的情况下，在运行时合并新功能或模块。**

为了说明这一点，假设我们正在使用一个第三方库，该库定义了一个基类，并包含多个用于多态反序列化的子类型。我们希望通过引入我们自己的自定义子类型来扩展功能，这些子类型扩展了同一个基类。反射API在这种特定用例中非常有用，因为我们可以使用它在运行时动态注册这些自定义子类型，并轻松地将它们与第三方库集成。**因此，我们可以在不更改其代码库的情况下适应库以满足我们的特定要求。**

### 3.3. 代码分析

**反射的另一个用例是代码分析，它允许我们动态地检查代码。** 这特别有用，因为它可以导致提高软件开发的质量。

例如，ArchUnit是一个用于架构单元测试的Java库，它使用反射和字节码分析。库无法通过反射API获得的信息在字节码级别获得。这样，库可以动态地分析代码，我们能够执行架构规则和约束，确保我们的软件项目的完整性和高质量。

## 4. Java反射的缺点

正如我们在前一节中看到的，反射是一个功能强大的特性，具有多种应用。**然而，它带来了我们需要在决定在项目中使用它之前考虑的一系列缺点。** 在本节中，我们将深入探讨这个特性的一些主要缺点。

### 4.1. 性能开销

**Java反射动态解析类型，可能会限制某些JVM优化。** 因此，反射操作的性能比非反射操作慢。所以，在处理性能敏感的应用程序时，我们应该考虑避免在频繁调用的代码部分使用反射。

为了演示这一点，我们将创建一个非常简单的_Person_类，并在其上执行一些反射和非反射操作：

```java
public class Person {
    private String firstName;
    private String lastName;
    private Integer age;

    public Person(String firstName, String lastName, Integer age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    // 标准getter和setter
}
```

现在，我们可以创建一个基准测试，以查看调用我们类的_getters_的时间差异：

```java
public class MethodInvocationBenchmark {

    @Benchmark
    @Fork(value = 1, warmups = 1)
    @OutputTimeUnit(TimeUnit.NANOSECONDS)
    @BenchmarkMode(Mode.AverageTime)
    public void directCall(Blackhole blackhole) {
        Person person = new Person("John", "Doe", 50);

        blackhole.consume(person.getFirstName());
        blackhole.consume(person.getLastName());
        blackhole.consume(person.getAge());
    }

    @Benchmark
    @Fork(value = 1, warmups = 1)
    @OutputTimeUnit(TimeUnit.NANOSECONDS)
    @BenchmarkMode(Mode.AverageTime)
    public void reflectiveCall(Blackhole blackhole) throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {
        Person person = new Person("John", "Doe", 50);

        Method getFirstNameMethod = Person.class.getMethod("getFirstName");
        blackhole.consume(getFirstNameMethod.invoke(person));

        Method getLastNameMethod = Person.class.getMethod("getLastName");
        blackhole.consume(getLastNameMethod.invoke(person));

        Method getAgeMethod = Person.class.getMethod("getAge");
        blackhole.consume(getAgeMethod.invoke(person));
    }
}
```

让我们检查我们的方法调用基准测试的结果：

```
Benchmark                                 Mode  Cnt    Score   Error  Units
MethodInvocationBenchmark.directCall      avgt    5    8.428 ± 0.365  ns/op
MethodInvocationBenchmark.reflectiveCall  avgt    5  102.785 ± 2.493  ns/op
```

现在，让我们创建另一个基准测试，测试反射初始化与直接调用构造函数的性能：

```java
public class InitializationBenchmark {

    @Benchmark
    @Fork(value = 1, warmups = 1)
    @OutputTimeUnit(TimeUnit.NANOSECONDS)
    @BenchmarkMode(Mode.AverageTime)
    public void directInit(Blackhole blackhole) {
        blackhole.consume(new Person("John", "Doe", 50));
    }

    @Benchmark
    @Fork(value = 1, warmups = 1)
    @OutputTimeUnit(TimeUnit.NANOSECONDS)
    @BenchmarkMode(Mode.AverageTime)
    public void reflectiveInit(Blackhole blackhole) throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        Constructor`<Person>` constructor = Person.class.getDeclaredConstructor(String.class, String.class, Integer.class);
        blackhole.consume(constructor.newInstance("John", "Doe", 50));
    }
}
```

让我们检查构造函数调用的结果：

```
Benchmark                                 Mode  Cnt    Score   Error  Units
InitializationBenchmark.directInit        avgt    5    5.290 ± 0.395  ns/op
InitializationBenchmark.reflectiveInit    avgt    5   23.331 ± 0.141  ns/op
```

在审查了这两个基准测试的结果之后，我们可以合理地推断，在Java中使用反射在调用方法或初始化对象等用例中可能会显著变慢。

我们的文章《使用Java进行微基准测试》提供了更多关于我们用于比较执行时间的信息。

### 4.2. 内部暴露

**反射允许在非反射代码中可能受到限制的操作。** 一个很好的例子是能够访问和操作类的私有字段和方法。通过这样做，我们违反了封装性，这是面向对象编程的一个基本原则。

例如，让我们创建一个只有一个私有字段的虚拟类，不创建任何_getters_或_setters_：

```java
public class MyClass {

    private String veryPrivateField;

    public MyClass() {
        this.veryPrivateField = "Secret Information";
    }
}
```

现在，让我们尝试在单元测试中访问这个私有字段：

```java
@Test
public void givenPrivateField_whenUsingReflection_thenIsAccessible() throws IllegalAccessException, NoSuchFieldException {
    MyClass myClassInstance = new MyClass();

    Field privateField = MyClass.class.getDeclaredField("veryPrivateField");
    privateField.setAccessible(true);

    String accessedField = privateField.get(myClassInstance).toString();
    assertEquals(accessedField, "Secret Information");
}
```

### 4.3. 丢失编译时安全性

**反射的另一个缺点是丢失了编译时的安全性。** 在典型的Java开发中，编译器执行严格的类型检查，并确保我们正确地使用类、方法和字段。然而，反射绕过了这些检查，结果，一些错误直到运行时才被发现。因此，这可能导致难以检测的bug，可能会影响我们代码库的可靠性。

### 4.4. 代码可维护性降低

**使用反射可以显著降低代码的可维护性。** 严重依赖反射的代码往往比依赖反射的代码通常比非反射代码的可读性要差。可读性的降低可能会导致维护困难，因为开发人员更难理解代码的意图和功能。

**另一个挑战是工具支持有限。** 并非所有的开发工具和IDE都完全支持反射。因此，这可能会减慢开发速度，并使开发更容易出错，因为开发人员必须依赖手动检查来发现问题。

### 4.5. 安全问题

Java反射涉及访问和操作程序的内部元素，这可能会引起安全问题。在受限环境中，允许反射访问可能是有风险的，因为**恶意代码可能试图利用反射获得对敏感资源的未授权访问或执行违反安全策略的操作**。

## 5. Java 9对反射的影响

**Java 9中模块的引入对模块封装其代码的方式带来了重大变化。在Java 9之前，使用反射可以轻易地打破封装。**

模块默认不再暴露其内部元素。然而，Java 9提供了一些机制，可以选择性地授予模块之间反射访问的权限。这允许我们在必要时打开特定包，确保与旧代码或第三方库的兼容性。

## 6. 我们应该何时使用Java反射？

在探讨了反射的优点和缺点之后，我们可以确定一些使用这个强大特性的适当或不适当的用例。

**在动态行为至关重要的地方使用反射API证明是有价值的。** 正如我们已经看到的，许多知名的框架和库，如Spring和Hibernate，依赖于它来提供关键特性。在这些情况下，反射使这些框架能够为开发人员提供灵活性和定制性。此外，当我们自己创建库或框架时，反射可以增强其他开发人员扩展和定制与我们代码的交互，使其成为一个合适的选择。

**此外，反射可以作为我们无法修改的代码的扩展选项。** 因此，当我们使用第三方库或遗留代码工作，并需要集成新功能或适应现有功能而无需更改原始代码库时，它可以成为一个强大的工具。它允许我们访问和操作否则无法访问的元素，使其成为这些场景中的实用选择。

**然而，考虑使用反射时要小心。** 在具有强大安全要求的应用程序中，应该谨慎使用反射代码。反射允许访问程序的内部元素，这可能被恶意代码利用。此外，在处理性能关键的应用程序时，特别是在频繁调用的代码部分，反射的性能开销可能成为一个问题。此外，如果我们的项目中编译时类型检查至关重要，我们应该考虑避免使用反射代码，因为它缺乏编译时安全性。

## 7. 结论

正如我们在本文中了解到的，Java中的反射应该被视为一个需要谨慎使用的强大工具，而不是被标记为不良实践。与任何特性一样，过度使用反射确实可以被视为不良实践。然而，当谨慎应用并且在真正必要时使用时，反射可以成为宝贵的资产。

如常，源代码可在GitHub上获得。

[![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)](https://www.baeldung.com)
[![img](https://secure.gravatar.com/avatar/d22d21795b160fbfc43125cc93df8849?s=50&r=g)](https://www.baeldung.com/author/paul-bakker/)
[![img](https://www.baeldung.com/wp-content/uploads/custom_avatars/Michael-Krimgen-150x150.png)](https://www.baeldung.com/author/michael-krimgen/)
[![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)](https://www.baeldung.com/)
[![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)](https://www.baeldung.com/)
[![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)](https://www.baeldung.com/)

OK