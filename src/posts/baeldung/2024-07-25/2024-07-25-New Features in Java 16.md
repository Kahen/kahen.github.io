---
date: 2024-07-26
category:
  - Java
  - 编程
tag:
  - Java 16
  - 新特性
head:
  - - meta
    - name: keywords
      content: Java 16, 新特性, 编程, 技术文章
---
# Java 16 新特性概览

Java 16，于2021年3月16日发布，是继Java 15之后的短期增量发布。此版本带来了一些有趣的特性，例如记录（records）和封闭类（sealed classes）。

在本文中，我们将探索这些新特性中的一些。

### 2. 通过代理实例调用接口的默认方法（JDK-8159746）

作为接口中默认方法的增强，Java 16的发布增加了使用反射通过动态代理调用接口的默认方法的支持。

让我们通过一个简单的默认方法示例来说明：

```java
interface HelloWorld {
    default String hello() {
        return "world";
    }
}
```

通过这个增强，我们可以在该接口的代理上使用反射调用默认方法：

```java
Object proxy = Proxy.newProxyInstance(getSystemClassLoader(), new Class`<?>`[] { HelloWorld.class },
    (prox, method, args) -> {
        if (method.isDefault()) {
            return InvocationHandler.invokeDefault(prox, method, args);
        }
        // ...
    }
);
Method method = proxy.getClass().getMethod("hello");
assertThat(method.invoke(proxy)).isEqualTo("world");
```

### 3. 日期时间格式化支持（JDK-8247781）

DateTimeFormatter的一个新增加是时间段符号“_B_”，它提供了一种替代上下午格式的方式：

```java
LocalTime date = LocalTime.parse("15:25:08.690791");
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("h B");
assertThat(date.format(formatter)).isEqualTo("3 in the afternoon");
```

与“3pm”这样的输出不同，我们得到的是“3 in the afternoon”。我们还可以使用“_B_”，“_BBBB_”或“_BBBBB_”DateTimeFormatter模式分别表示短、全和窄样式。

### 4. 增加 Stream.toList 方法（JDK-8180352）

目标是减少一些常用Stream收集器的样板代码，例如Collectors.toList和Collectors.toSet：

```java
List`<String>` integersAsString = Arrays.asList("1", "2", "3");
List``<Integer>`` ints = integersAsString.stream().map(Integer::parseInt).collect(Collectors.toList());
List``<Integer>`` intsEquivalent = integersAsString.stream().map(Integer::parseInt).toList();
```

我们的ints示例使用了旧方法，但intsEquivalent具有相同的结果并且更加简洁。

### 5. Vector API孵化器（JEP-338）

Vector API目前处于Java 16的初始孵化阶段。这个API的想法是提供一种向量计算的方式，最终能够在支持的CPU架构上比传统的标量计算方法更优地执行。

让我们看看如何传统地乘以两个数组：

```java
int[] a = {1, 2, 3, 4};
int[] b = {5, 6, 7, 8};

var c = new int[a.length];

for (int i = 0; i < a.length; i++) {
    c[i] = a[i] * b[i];
}
```

这个标量计算示例，对于长度为4的数组，将在4个周期内执行。现在，让我们看看等效的基于向量的计算：

```java
int[] a = {1, 2, 3, 4};
int[] b = {5, 6, 7, 8};

var vectorA = IntVector.fromArray(IntVector.SPECIES_128, a, 0);
var vectorB = IntVector.fromArray(IntVector.SPECIES_128, b, 0);
var vectorC = vectorA.mul(vectorB);
vectorC.intoArray(c, 0);
```

在基向量的代码中，我们首先使用IntVector类的静态工厂方法fromArray从输入数组创建两个IntVectors。第一个参数是向量的大小，其次是数组和偏移量（这里设置为0）。最重要的是我们得到的向量大小为128位。在Java中，每个int占用4个字节。

因为我们有一个包含4个int的输入数组，它需要128位来存储。我们的单个Vector可以存储整个数组。

在某些架构上，编译器将能够优化字节码，将计算从4个周期减少到只有1个周期。这些优化将使机器学习和密码学等领域受益。

我们应该注意，由于处于孵化阶段，Vector API可能会随着新版本的发布而发生变化。

### 6. 记录（JEP-395）

记录在Java 14中引入。Java 16带来了一些增量变化。

记录类似于枚举，因为它们是类的一种受限形式。定义记录是定义不可变数据持有对象的简洁方式。

#### 6.1. 没有记录的示例

首先，让我们定义一个Book类：

```java
public final class Book {
    private final String title;
    private final String author;
    private final String isbn;

    public Book(String title, String author, String isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public String getIsbn() {
        return isbn;
    }

    @Override
    public boolean equals(Object o) {
        // ...
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, author, isbn);
    }
}
```

在Java中创建简单的数据持有类需要大量的样板代码。这可能很繁琐，并导致开发者在没有提供所有必要的方法（例如equals和hashCode）的情况下出现错误。

同样，有时开发者会跳过创建适当的不可变类的必要步骤。有时我们最终会重用一个通用类，而不是为每个不同的用例定义一个专门的类。

大多数现代IDE提供了自动生成代码的能力（例如setters、getters、构造函数等），这有助于缓解这些问题，并减少开发者编写代码的开销。然而，记录提供了一种内置机制来减少样板代码并创建相同的结果。

#### 6.2. 使用记录的示例

这里是将Book重写为记录的示例：

```java
public record Book(String title, String author, String isbn) { }
```

通过使用record关键字，我们将Book类减少到了两行。这使得它更易于使用且不易出错。

#### 6.3. Java 16中记录的新增加

随着Java 16的发布，我们现在可以将记录定义为内部类的类成员。这是由于在Java 15的增量发布中错过的放宽限制，作为JEP-384的一部分：

```java
class OuterClass {
    class InnerClass {
        Book book = new Book("Title", "author", "isbn");
    }
}
```

### 7. 对instanceof的模式匹配（JEP-394）

从Java 16开始，对instanceof关键字添加了模式匹配。

之前我们可能会这样编写代码：

```java
Object obj = "TEST";

if (obj instanceof String) {
    String t = (String) obj;
    // 执行一些逻辑...
}
```

而不是仅仅关注应用程序所需的逻辑，这段代码必须首先检查obj的实例，然后将对象转换为String并分配给新变量t。

随着模式匹配的引入，我们可以重写这段代码：

```java
Object obj = "TEST";

if (obj instanceof String t) {
    // 执行一些逻辑
}
```

我们现在可以在instanceof检查中声明一个变量——在这个例子中是t。

### 8. 封闭类（JEP-397）

封闭类最初在Java 15中引入，为确定哪些子类被允许扩展或实现一个父类或接口提供了一种机制。

#### 8.1. 示例

让我们通过定义一个接口和两个实现类来说明这一点：

```java
public sealed interface JungleAnimal permits Monkey, Snake { }

public final class Monkey implements JungleAnimal { }

public non-sealed class Snake implements JungleAnimal { }
```

sealed关键字与permits关键字结合使用，以确定确切的允许实现此接口的类。在我们的例子中，这是Monkey和Snake。

封闭类的继承类必须用以下之一标记：

- sealed——意味着它们必须使用permits关键字定义允许哪些类从它继承。
- final——阻止任何进一步的子类。
- non-sealed——允许任何类能够从它继承。

闭类的一个显著好处是，它们允许进行详尽的模式匹配检查，而无需为所有未覆盖的情况进行捕获。例如，使用我们定义的类，我们可以有逻辑来覆盖所有可能的JungleAnimal子类：

```java
JungleAnimal j = // 一些JungleAnimal实例

if (j instanceof Monkey m) {
    // 执行逻辑
} else if (j instanceof Snake s) {
    // 执行逻辑
}
```

我们不需要else块，因为封闭类只允许Monkey和Snake这两种可能的子类型。

#### 8.2. Java 16中封闭类的新增加

Java 16对封闭类进行了一些增加。这些是Java 16对封闭类引入的更改：

- Java语言将sealed、non-sealed和permits识别为上下文关键字（类似于abstract和extends）。
-继续翻译：

- 限制创建封闭类的子类的局部类的能力（类似于无法创建封闭类的匿名类）。
- 对封闭类及其派生类的强制转换进行更严格的检查。

### 9. 其他变化

从Java 15版本中的JEP-383继续，外部链接器API提供了一种灵活的方式来访问主机机器上的本地代码。最初是针对C语言互操作性，将来可能会适应其他语言，如C++或Fortran。这个特性的目标是最终取代Java本地接口。

另一个重要变化是，JDK内部现在默认被强封装。自Java 9以来，这些一直是可访问的。然而，现在JVM需要参数`--illegal-access=permit`。这将影响所有直接使用JDK内部并忽略警告消息的库和应用程序（特别是测试时）。

### 10. 结论

在本文中，我们涵盖了作为增量Java 16版本一部分引入的一些特性和变化。Java 16的完整变化列表在JDK发布说明中。

像往常一样，本文中的所有代码都可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/53ef9be768443f46703ce4b92df78ac9?s=50&r=g)![img](https://secure.gravatar.com/avatar/6c3babf3d6ea5d49c2bc4e7957870d75?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

翻译结束。

OK。