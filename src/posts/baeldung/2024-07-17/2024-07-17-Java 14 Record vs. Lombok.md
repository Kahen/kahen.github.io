---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Java 14
  - Lombok
head:
  - - meta
    - name: keywords
      content: Java, Java 14, Record, Lombok, Immutable, Data, Builder, Inheritance
---
# Java 14 记录与 Lombok 比较

Java 的记录关键字是在 Java 14 中引入的一项新的语义特性。记录对于创建小型不可变对象非常有用。另一方面，Lombok 是一个 Java 库，可以自动生成一些已知模式作为 Java 字节码。尽管它们都可以用来减少样板代码，但它们是不同的工具。因此，我们应该根据给定上下文的需求选择更适合的那一个。

在本文中，我们将探索各种用例，包括 Java 记录的一些限。对于每个示例，我们将看看 Lombok 如何派上用场，并比较这两种解决方案。

## 2. 小型不可变对象

对于我们的第一个示例，我们将使用 _Color_ 对象。一个 _Color_ 由三个整数值组成，分别代表红色、绿色和蓝色通道。此外，颜色将暴露其十六进制表示。例如，具有 _RGB(255,0,0)_ 的颜色将具有十六进制表示 _#FF0000_。此外，我们希望两个颜色如果具有相同的 RGB 值则视为 _相等_。

由于这些原因，在这种情况下选择一个 _记录_ 是非常有意义的：

```
public record ColorRecord(int red, int green, int blue) {
    public String getHexString() {
        return String.format("#%02X%02X%02X", red, green, blue);
    }
}
```

同样，Lombok 允许我们使用 _@Value_ 注解创建不可变对象：

```
@Value
public class ColorValueObject {
    int red;
    int green;
    int blue;
    public String getHexString() {
        return String.format("#%02X%02X%02X", red, green, blue);
    }
}
```

尽管如此，从 Java 14 开始，_记录_ 将是这些用例的自然方式。

## 3. 透明数据载体

根据 JDK 增强提案（JEP 395），**记录是作为不可变数据的透明载体的类。因此，我们不能阻止记录暴露其成员字段。** 例如，我们不能强制上一个示例中的 _ColorRecord_ 仅暴露 _hexString_ 并完全隐藏三个整型字段。

然而，Lombok 允许我们自定义 getter 的名称、访问级别和返回类型。让我们相应地更新 _ColorValueObject_：

```
@Value
@Getter(AccessLevel.NONE)
public class ColorValueObject {
    int red;
    int green;
    int blue;
    public String getHexString() {
        return String.format("#%02X%02X%02X", red, green, blue);
    }
}
```

**因此，如果我们需要不可变数据对象，记录是一个很好的解决方案。**

**然而，如果我们想要隐藏成员字段并且只暴露使用它们执行的一些操作，Lombok 将更适合。**

## 4. 具有许多字段的类

我们已经看到记录是创建小型不可变对象的一种非常方便的方式。让我们看看如果数据模型需要更多字段，记录会是什么样子。对于这个示例，让我们考虑 _Student_ 数据模型：

```
public record StudentRecord(
  String firstName,
  String lastName,
  Long studentId,
  String email,
  String phoneNumber,
  String address,
  String country,
  int age) {
}
```

我们已经可以猜测，StudentRecord 的实例化将难以阅读和理解，特别是如果某些字段不是强制性的：

```
StudentRecord john = new StudentRecord(
  "John", "Doe", null, "john@doe.com", null, null, "England", 20);
```

为了促进这些用例，Lombok 提供了 Builder 设计模式的实现。

为了使用它，我们只需要用 _@Builder_ 注解我们的类：

```
@Getter
@Builder
public class StudentBuilder {
    private String firstName;
    private String lastName;
    private Long studentId;
    private String email;
    private String phoneNumber;
    private String address;
    private String country;
    private int age;
}
```

现在，让我们使用 _StudentBuilder_ 以相同的属性创建一个对象：

```
StudentBuilder john = StudentBuilder.builder()
  .firstName("John")
  .lastName("Doe")
  .email("john@doe.com")
  .country("England")
  .age(20)
  .build();
```

如果我们比较两者，我们可以注意到使用构建者模式是有利的，导致代码更清晰。

**总之，记录更适合小型对象。虽然，对于具有许多字段的对象，缺乏创建模式将使 Lombok 的 _@Builder_ 成为更好的选择。**

## 5. 可变数据

我们只能将 java 记录用于不可变数据。**如果上下文需要一个可变的 java 对象，我们可以使用 Lombok 的 _@Data_ 对象代替：**

```
@Data
@AllArgsConstructor
public class ColorData {
    private int red;
    private int green;
    private int blue;
    public String getHexString() {
        return String.format("#%02X%02X%02X", red, green, blue);
    }
}
```

一些框架可能需要具有 setter 或默认构造函数的对象。例如，Hibernate 就属于这一类。在创建 _@Entity_ 时，我们将不得不使用 Lombok 的注解或纯 Java。

## 6. 继承

**Java 记录不支持继承。** 因此，它们不能被扩展或继承其他类。另一方面，Lombok 的 _@Value_ 对象可以扩展其他类，但它们是 final 的：

```
@Value
public class MonochromeColor extends ColorData {
    public MonochromeColor(int grayScale) {
        super(grayScale, grayScale, grayScale);
    }
}
```

此外，_@Data_ 对象既可以扩展其他类，也可以被扩展。**总之，如果我们需要继承，我们应该坚持使用 Lombok 的解决方案。**

## 7. 结论

在本文中，我们看到了 Lombok 和 java 记录是不同的工具，服务于不同的目的。此外，我们发现 Lombok 更加灵活，并且可以用于记录受限的场景。

如往常一样，源代码可在 GitHub 上获取。