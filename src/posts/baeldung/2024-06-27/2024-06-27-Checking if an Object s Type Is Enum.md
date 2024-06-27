---
date: 2024-06-27
category:
  - Java
  - Programming
tag:
  - Enum
  - Type Checking
head:
  - - meta
    - name: keywords
      content: Java, Enum, Type Checking
------
# 如何检查对象的类型是否为枚举

当我们使用Java时，理解和操作对象类型是基本技能。一个常见的挑战是检查一个对象是否属于枚举类型（Enum）。在这个快速教程中，我们将探索确定对象类型是否为枚举的各种方法和最佳实践。

## 2. 问题介绍

枚举类型提供了一种强大的方式，在不同的类型中表示一组固定的值。动态确认一个对象是否是枚举类型对于编写健壮和类型安全的代码至关重要。

例如，我们有一个简单的枚举：

```
enum Device {
    Keyboard, Monitor, Mouse, Printer
}
```

现在假设我们有一个对象：

```
Object obj = Device.Keyboard;
```

正如我们所看到的，`obj`被声明为类型`Object`。我们的挑战是检查它的类型是否为枚举。在这个教程中，我们将学习解决这个问题的不同方法。同时，我们将使用单元测试断言来验证结果。

## 3. 使用 instanceof 操作符

我们知道所有枚举都有相同的超类：`java.lang.Enum`。`instanceof`操作符允许我们测试一个对象是否是特定类或接口的实例。

因此，我们可以利用这个操作符来检查一个对象是否是枚举类型：

```
Object obj = Device.Keyboard;
assertTrue(obj instanceof Enum);
```

## 4. 使用 Enum.class.isInstance() 方法

`Class.isInstance()`方法与`instanceof`操作符做同样的事情。由于我们想要检查枚举类型，`Enum.class.isInstance(obj)`解决了问题：

```
Object obj = Device.Keyboard;
assertTrue(Enum.class.isInstance(obj));
```

## 5. 使用 Enum.class.isAssignableFrom() 方法

类似于`Class.isInstance()`方法，`Class.isAssignableFrom()`方法检查左侧的类是否与给定的`Class`参数相同或为超类。这两种方法有轻微的区别。然而，如果我们用它们来解决我们的问题，这并没有区别：

```
Object obj = Device.Keyboard;
assertTrue(Enum.class.isAssignableFrom(obj.getClass()));
```

## 6. 使用 Class.isEnum() 方法

另一种确定一个类是否表示枚举的方法是使用`Class`类提供的`isEnum()`方法：

```
Object obj = Device.Keyboard;
assertTrue(obj.getClass().isEnum());
```

这种方法非常简单直接。然而，它可能无法检查一些枚举实例。所以接下来，让我们更仔细地看看`Class.isEnum()`的陷阱。

## 7. Class.isEnum() 的陷阱：带有体的枚举实例

我们知道枚举可以有自定义方法。此外，枚举实例可以覆盖这些方法。接下来，让我们看另一个枚举示例：

```
enum Weekday {
    Monday, Tuesday, Wednesday, Thursday, Friday,
    Saturday {
        @Override
        boolean isWeekend() {
            return true;
        }
    },
    Sunday {
        @Override
        boolean isWeekend() {
            return true;
        }
    };

    boolean isWeekend() {
        return false;
    }
}
```

正如上面的代码所示，`Weekday`有`isWeekend()`方法。默认情况下，该方法返回`false`。然而，`Saturday`和`Sunday`实例覆盖了这个方法以返回`true`。

接下来，让我们用我们学到的解决方案来验证一些`Weekday`实例，并看看它们是否能够报告正确的结果。首先，让我们以`Monday`为例：

```
Object monday = Weekday.Monday;
assertTrue(monday instanceof Enum);
assertTrue(Enum.class.isInstance(monday));
assertTrue(Enum.class.isAssignableFrom(monday.getClass()));
assertTrue(monday.getClass().isEnum());
```

如果我们运行测试，所有四种方法都按预期工作。接下来，让我们以`Sunday`实例作为输入并重复测试：

```
Object sunday = Weekday.Sunday;
assertTrue(sunday instanceof Enum);
assertTrue(Enum.class.isInstance(sunday));
assertTrue(Enum.class.isAssignableFrom(sunday.getClass()));
assertFalse(sunday.getClass().isEnum()); // <-- 当枚举值带有体时isEnum()检查失败
```

这次，`Class.isEnum()`没有产生正确的答案。接下来，让我们理解为什么会发生这种情况。

当一个枚举实例覆盖一个方法时，例如我们示例中的`Saturday`和`Sunday`，会创建一个作为枚举子类的匿名类。在这种情况下，`Sunday.getClass()`返回的是匿名子类而不是`Weekday`类。因此，在类上调用`isEnum()`会返回`false`。

因此，我们不应该考虑`Class.isEnum()`方法作为解决这个问题的健壮解决方案。

## 8. 结论

确定一个对象的类型是否为枚举对于编写灵活和健壮的Java代码至关重要。在本文中，我们探讨了执行检查的不同方法：

- instanceof 操作符
- Enum.class.isInstance() 方法
- Enum.class.isAssignableFrom() 方法

此外，我们强调了`enumValue.getClass().isEnum()`检查的潜在陷阱，强调当处理枚举实例中的覆盖方法时，其可靠性会降低。因此，我们不应该依赖这种方法作为确定性解决方案。

如常，示例的完整源代码可在GitHub上找到。