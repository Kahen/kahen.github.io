---
date: 2022-07-01
category:
  - Java
  - 编程
tag:
  - 静态方法
  - Java
head:
  - - meta
    - name: keywords
      content: Java, 静态方法, 编程
---
# Java中静态方法的使用案例

静态方法是大多数面向对象编程语言中常见的，包括Java。静态方法与实例方法的区别在于它们没有拥有它们的实例对象。相反，**静态方法是在类级别定义的，可以在不创建实例的情况下使用**。

在本教程中，我们将了解Java中静态方法的定义以及它们的限制。然后，我们将看看使用静态方法的常见用例，并推荐何时在我们的代码中应用它们。最后，我们将看到如何测试静态方法以及如何模拟它们。

实例方法是根据对象的运行时类型进行多态解析的。另一方面，**静态方法是在编译时根据它们定义的类解析的**。

### 2.1 类级别

Java中的静态方法是类定义的一部分。我们可以通过添加_static_关键字来定义一个静态方法：

```java
private static int counter = 0;

public static int incrementCounter() {
    return ++counter;
}

public static int getCounterValue() {
    return counter;
}
```

要访问静态方法，我们**使用类名后跟点和方法名**：

```java
int oldValue = StaticCounter.getCounterValue();
int newValue = StaticCounter.incrementCounter();
assertThat(newValue).isEqualTo(oldValue + 1);
```

我们应该注意到这个静态方法可以访问_StaticCounter_类的静态状态。通常静态方法是无状态的，但它们可以作为包括单例模式在内的各种技术的一部分来使用类级数据。

尽管也可以使用对象引用静态方法，但这种反模式通常被Sonar等工具标记为错误。

### 2.2 限制

由于**静态方法不操作实例成员**，我们应该注意一些限制：

- 静态方法不能直接引用实例成员变量
- 静态方法不能直接调用实例方法
- 子类不能覆盖静态方法
- 我们不能在静态方法中使用关键字_this_和_super_

上述每一项都会导致编译时错误。我们还应该注意，如果我们在子类中声明了与基类同名的静态方法，它不会覆盖而是隐藏基类方法。

## 3. 使用案例

现在让我们来看看何时在我们的Java代码中应用静态方法的常见用例。

### 3.1 标准行为

当我们开发**具有标准行为的方法**，这些方法操作它们的输入参数时，使用静态方法是有意义的。

Apache _StringUtils_中的_String_操作是一个很好的例子：

```java
String str = StringUtils.capitalize("baeldung");
assertThat(str).isEqualTo("Baeldung");
```

另一个好例子是_Collections_类，因为它包含操作不同集合的常用方法：

```java
List`<String>` list = Arrays.asList("1", "2", "3");
Collections.reverse(list);
assertThat(list).containsExactly("3", "2", "1");
```

### 3.2 跨实例重用

使用静态方法的一个有效理由是当我们**在不同类的实例之间重用标准行为**时。

例如，我们通常在领域和业务类中使用Java _Collections_和Apache _StringUtils_：

![img](https://www.baeldung.com/wp-content/uploads/2022/07/utils_demo2.png)

由于这些函数没有自己的状态，并且不绑定到我们业务逻辑的特定部分，因此将它们放在一个模块中共享是有意义的。

### 3.3 不改变状态

由于静态方法不能引用实例成员变量，它们是**不需要任何对象状态操作的方法**的好选择。

当我们在不管理状态的操作中使用静态方法时，方法调用就更加实用。调用者可以直接调用方法而无需创建实例。

当我们像静态计数器的情况一样通过类的所有实例共享状态时，操作该状态的方法应该是静态的。管理全局状态可能是错误之源，因此当实例方法直接写入静态字段时，Sonar会报告一个严重问题。

### 3.4 纯函数

如果一个函数的**返回值仅依赖于传递的输入参数**，则称为纯函数。纯函数从它们的参数中获取所有数据并从该数据计算出某些东西。

纯函数不操作任何实例或静态变量。因此，执行纯函数也应该没有副作用。

由于静态方法不允许覆盖并且引用实例变量，它们是Java中实现纯函数的好选择。

## 4. 实用类

由于Java没有为存放一组函数设置特定的类型，我们经常创建一个实用类。实用类**为纯静态函数提供家园**。我们不是一遍又一遍地编写相同的逻辑，而是可以将我们在项目中重复使用的纯函数组合在一起。

Java中的实用类是一个无状态的类，我们永远不应该实例化它。因此，建议将其声明为_final_，以便它不能被子类化（这不会添加价值）。另外，为了防止任何人尝试实例化它，我们可以添加一个私有构造函数：

```java
public final class CustomStringUtils {

    private CustomStringUtils() {
    }

    public static boolean isEmpty(CharSequence cs) {
        return cs == null || cs.length() == 0;
    }
}
```

我们应该注意到我们放在实用类中的所有方法都应该是_static_。

## 5. 测试

让我们检查一下如何使用JUnit对Java中的静态方法进行单元测试和模拟。

### 5.1 单元测试

使用JUnit对设计良好的纯静态方法进行单元测试非常简单。我们可以使用类名调用我们的静态方法并传递一些测试参数。

我们的测试对象将根据其输入参数计算结果。因此，我们可以**对结果进行断言并测试不同的输入输出组合**：

```java
@Test
void givenNonEmptyString_whenIsEmptyMethodIsCalled_thenFalseIsReturned() {
    boolean empty = CustomStringUtils.isEmpty("baeldung");
    assertThat(empty).isFalse();
}
```

### 5.2 模拟

大多数时候，**我们不需要模拟静态方法**，我们可以在测试中简单地使用实际的函数实现。需要模拟静态方法通常暗示着代码设计问题。

如果我们必须这样做，那么我们可以使用Mockito模拟静态函数。然而，我们需要在我们的pom.xml中添加一个额外的_mockito-inline_依赖项：

```xml
`<dependency>`
    `<groupId>`org.mockito`</groupId>`
    `<artifactId>`mockito-inline`</artifactId>`
    `<version>`3.8.0`</version>`
    `<scope>`test`</scope>`
`</dependency>`
```

现在，我们可以使用_Mockito.mockStatic_方法模拟对静态方法调用的调用：

```java
try (MockedStatic`<StringUtils>` utilities = Mockito.mockStatic(StringUtils.class)) {
    utilities.when(() -> StringUtils.capitalize("karoq")).thenReturn("Karoq");

    Car car1 = new Car(1, "karoq");
    assertThat(car1.getModelCapitalized()).isEqualTo("Karoq");
}
```

## 6. 结论

在本文中，**我们探讨了在我们的Java代码中使用静态方法的常见用例**。我们学习了Java中静态方法的定义以及它们的限制。

我们还探讨了何时在我们的代码中使用静态方法是有意义的。我们看到静态方法是具有标准行为的纯函数的好选择，这些函数在实例之间重复使用但不改变它们的状态。最后，我们查看了如何测试和模拟静态方法。

如常，完整的源代码可在GitHub上获得。