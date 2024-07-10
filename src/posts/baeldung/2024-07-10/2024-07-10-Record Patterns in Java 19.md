---
date: 2024-07-11
category: 
  - Java
tag:
  - Java 19
  - Record Patterns
head:
  - - meta
    - name: keywords
      content: Java 19, Record Patterns, JEP-405, Java SE 19, 模式匹配, 记录模式
---

# Java 19 中的记录模式 | Baeldung

在本教程中，我们将讨论 Java SE 19 中的新预览特性 JEP-405：记录模式。我们将看到如何分解记录值以及如何将记录模式与类型模式结合起来使用。

我们将使用以下两个记录：一个名为 `GPSPoint` 的记录，它包含 `latitude` 和 `longitude`：

```java
public record GPSPoint(double latitude, double longitude) {}
```

以及一个名为 `Location` 的记录，它包含一个 `name` 和一个 `GPSPoint`：

```java
public record Location(String name, GPSPoint gpsPoint) {}
```

记录模式是一种构造，允许我们将值与记录类型进行匹配，并将变量绑定到记录的相应组件上。我们还可以给记录模式一个可选的标识符，这使得它成为一个命名的记录模式，并允许我们引用记录模式变量。

### 3.1. instanceof

在 Java 16 中引入的 `instanceof` 模式匹配允许我们在进行 `instanceof` 检查时直接声明一个变量。从 Java 19 开始，它现在也可以与记录一起使用：

```java
if (o instanceof Location location) {
    System.out.println(location.name());
}
```

我们还可以**使用模式匹配将模式变量 `location` 的值提取到变量中。**我们可以省略模式变量 `location`，因为调用访问器方法 `name()` 变得不必要：

```java
if (o instanceof Location (String name, GPSPoint gpsPoint)) {
    System.out.println(name);
}
```

如果我们有一个对象 `o` 我们想要将其与记录模式进行匹配。该模式只有在它是相应记录类型的实例时才会匹配。如果模式匹配，它会初始化变量并将它们转换为相应的类型。**请记住：`null` 值不匹配任何记录模式。**我们可以将变量的类型替换为 `var`。在特定情况下，编译器将为我们推断类型：

```java
if (o instanceof Location (var name, var gpsPoint)) {
    System.out.println(name);
}
```

我们甚至可以进一步分解 `GPSPoint`：

```java
if (o instanceof Location (var name, GPSPoint(var latitude, var longitude))) {
    System.out.println("lat: " + latitude + ", lng: " + longitude);
}
```

这称为嵌套分解。它有助于我们的数据导航，并允许我们直接访问 `latitude` 和 `longitude`，而无需使用 `Location` 的 getter 来获取 `GPSPoint`，然后使用 `GPSPoint` 对象上的 getter 来获取 `latitude` 和 `longitude` 值。

我们还可以使用此方法处理泛型记录。让我们引入一个新的泛型记录 `Wrapper`：

```java
public record Wrapper`<T>`(T t, String description) { }
```

这个记录包装任何类型的对象，并允许我们添加描述。我们仍然可以像以前一样使用 `instanceof`，甚至可以分解记录：

```java
Wrapper``<Location>`` wrapper = new Wrapper<>(new Location("Home", new GPSPoint(1.0, 2.0)), "Description");
if (wrapper instanceof Wrapper``<Location>``(var location, var description)) {
    System.out.println(description);
}
```

编译器也可以推断变量 `location` 的类型。

### 3.2. Switch 表达式

我们还可以使用 switch 表达式根据我们的对象类型执行特定操作：

```java
String result = switch (o) {
    case Location l -> l.name();
    default -> "default";
};
```

它将寻找第一个匹配的案例。同样，我们也可以使用嵌套分解：

```java
Double result = switch (object) {
    case Location(var name, GPSPoint(var latitude, var longitude)) -> latitude;
    default -> 0.0;
};
```

我们必须记住总是要放入一个 `default` `case` 以应对没有匹配的情况。

如果我们想要避免 `default case`，我们也可以使用一个 `sealed interface` 并 `permit` 必须实现 `interface` 的对象：

```java
public sealed interface ILocation permits Location {
    default String getName() {
        return switch (this) {
            case Location(var name, var ignored) -> name;
        };
    }
}
```

这有助于我们消除 `default` `case` 并仅创建相应的案例。

我们还可以保护特定案例。例如，我们会使用 `when` 关键字来检查等式并引入一个新的 `Location`，如果有一些不想要的行为：

```java
String result = switch (object) {
    case Location(var name, var ignored) when name.equals("Home") -> new Location("Test", new GPSPoint(1.0, 2.0)).getName();
    case Location(var name, var ignored) -> name;
    default -> "default";
};
```

如果这个 switch 表达式被以下对象调用：

```java
Object object = new Location("Home", new GPSPoint(1.0, 2.0));
```

它将把变量 `result` 分配为 “Test”。我们的对象是 `Location` 记录类型，它的名称是 “Home”。因此它直接跳转到 switch 的第一个案例。如果名称不是 “Home”，它将跳转到第二个案例。如果对象根本不是 `Location` 类型，将返回默认值。

## 结论

在本文中，我们看到了记录模式**如何允许我们使用模式匹配将记录的值提取到变量中**。我们可以使用 `instanceof`、`switch` 语句，甚至使用附加条件的守卫来实现这一点。记录模式在处理嵌套记录或封闭记录的层次结构时特别有用。

这些示例也可以在 GitHub 上找到。