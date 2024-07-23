---
date: 2022-04-01
category:
  - Java
  - HashMap
tag:
  - Java
  - HashMap
  - Generics
head:
  - - meta
    - name: keywords
      content: Java, HashMap, Generics, 多类型值
---
# Java HashMap 支持不同值类型

1. 概述

HashMap 存储键值映射。在本教程中，我们将讨论如何在 HashMap 中存储不同类型的值。

2. 问题介绍

自从 Java 泛型引入以来，我们通常以泛型的方式使用 HashMap，例如：

```
Map`<String, Integer>` numberByName = new HashMap<>();
```

在这种情况下，我们只能将 String 和 Integer 数据作为键值对放入 numberByName 映射中。这很好，因为它确保了类型安全。例如，如果我们尝试将 Float 对象放入 Map，我们将得到“类型不兼容”的编译错误。

然而，**有时我们希望将不同类型的数据放入 Map**。例如，我们希望 numberByName 映射也能存储 Float 和 BigDecimal 对象作为值。

在讨论如何实现这一点之前，让我们创建一个示例问题，以便于演示和解释。假设我们有三个不同类型的对象：

```
Integer intValue = 777;
int[] intArray = new int[]{2, 3, 5, 7, 11, 13};
Instant instant = Instant.now();
```

如我们所见，这三种类型完全不同。因此，我们首先尝试将这三个对象放入 HashMap。为了简单起见，我们将使用 String 值作为键。

当然，在某个时候，我们需要从 Map 中读取数据并使用数据。因此，我们将遍历 HashMap 中的条目，并为每个条目打印值和一些描述。

让我们看看如何实现这一点。

3. 使用 Map`````<String, Object>`````

我们知道，在 Java 中，**Object 是所有类型的超类型**。因此，如果我们声明一个 Map 为 Map`````<String, Object>`````，它应该接受任何类型的值。

接下来，让我们看看这种方法是否符合我们的要求。

3.1. 将数据放入 Map

正如我们前面提到的，Map`````<String, Object>````` 允许我们将任何类型的值放入其中：

```
Map`````<String, Object>````` rawMap = new HashMap<>();
rawMap.put("E1 (Integer)", intValue);
rawMap.put("E2 (IntArray)", intArray);
rawMap.put("E3 (Instant)", instant);
```

这非常简单。接下来，让我们访问 Map 中的条目并打印值和描述。

3.2. 使用数据

在我们将值放入 Map`````<String, Object>````` 后，我们失去了值的具体类型。因此，**在实际使用数据之前，我们需要检查并将值转换为适当的类型**。例如，我们可以使用 instanceof 操作符来验证值的类型：

```
rawMap.forEach((k, v) -> {
    if (v instanceof Integer) {
        Integer theV = (Integer) v;
        System.out.println(k + " -> "
          + String.format("The value is a %s integer: %d", theV > 0 ? "positive" : "negative", theV));
    } else if (v instanceof int[]) {
        int[] theV = (int[]) v;
        System.out.println(k + " -> "
          + String.format("The value is an array of %d integers: %s", theV.length, Arrays.toString(theV)));
    } else if (v instanceof Instant) {
        Instant theV = (Instant) v;
        System.out.println(k + " -> "
          + String.format("The value is an instant: %s", FORMATTER.format(theV)));
    } else {
        throw new IllegalStateException("Unknown Type Found.");
    }
});
```

如果我们执行上述代码，我们将看到输出：

```
E1 (Integer) -> The value is a positive integer: 777
E2 (IntArray) -> The value is an array of 6 integers: [2, 3, 5, 7, 11, 13]
E3 (Instant) -> The value is an instant: 2021-11-23 21:48:02
```

这种方法正如我们所期望的那样工作。

然而，它有一些缺点。接下来，让我们更仔细地看看它们。

3.3. 缺点

首先，如果我们计划让 map 支持相对更多的不同类型，**多个 if-else 语句将变成一个大的代码块，使代码难以阅读**。

此外，**如果我们想要使用的类型包含继承关系，instanceof 检查可能会失败**。

例如，如果我们在 map 中放入一个 java.lang.Integer intValue 和一个 java.lang.Number numberValue，我们不能使用 instanceof 操作符来区分它们。这是因为两者 (intValue instanceof Integer) 和 (intValue instanceof Number) 都返回 true。

因此，我们必须添加额外的检查来确定值的具体类型。但当然，这将使代码难以阅读。

最后，由于我们的 map 接受任何类型的值，**我们失去了类型安全**。也就是说，我们必须处理遇到意外类型时的异常情况。

可能会有一个问题出现：有没有一种方法可以接受不同类型的数据并保持类型安全？

接下来，我们将讨论另一种解决问题的方法。

4. 为所有需要的类型创建超类型

在这一部分，我们将介绍一个超类型以保持类型安全。

4.1. 数据模型

首先，我们创建一个接口 DynamicTypeValue：

```
public interface DynamicTypeValue {
    String valueDescription();
}
```

**这个接口将是我们期望 map 支持的所有类型的超类型**。它还可以包含一些共同的操作。例如，我们已经定义了一个 valueDescription 方法。

然后，**我们为每种具体类型创建一个类来包装值并实现我们创建的接口**。例如，我们可以为 Integer 类型创建一个 IntegerTypeValue 类：

```
public class IntegerTypeValue implements DynamicTypeValue {
    private Integer value;

    public IntegerTypeValue(Integer value) {
        this.value = value;
    }

    @Override
    public String valueDescription() {
        if(value == null){
            return "The value is null.";
        }
        return String.format("The value is a %s integer: %d", value > 0 ? "positive" : "negative", value);
    }
}
```

类似地，让我们为其他两种类型创建类：

```
public class IntArrayTypeValue implements DynamicTypeValue {
    private int[] value;

    public IntArrayTypeValue(int[] value) { ... }

    @Override
    public String valueDescription() {
        // null handling omitted
        return String.format("The value is an array of %d integers: %s", value.length, Arrays.toString(value));
    }
}
```

```
public class InstantTypeValue implements DynamicTypeValue {
    private static DateTimeFormatter FORMATTER = ...
    
    private Instant value;

    public InstantTypeValue(Instant value) { ... }

    @Override
    public String valueDescription() {
        // null handling omitted
        return String.format("The value is an instant: %s", FORMATTER.format(value));
    }
}
```

如果我们需要支持更多类型，我们只需添加相应的类。

接下来，让我们看看如何使用上面的数据模型在 map 中存储和使用不同类型的值。

4.2. 在 Map 中放置和使用数据

首先，让我们看看如何声明 Map 并将各种类型的数据放入其中：

```
Map``<String, DynamicTypeValue>`` theMap = new HashMap<>();
theMap.put("E1 (Integer)", new IntegerTypeValue(intValue));
theMap.put("E2 (IntArray)", new IntArrayTypeValue(intArray));
theMap.put("E3 (Instant)", new InstantTypeValue(instant));
```

正如我们所看到的，我们已经声明了 map 为 Map``<String, DynamicTypeValue>``，这样 **类型安全得到了保证**：只有具有 DynamicTypeValue 类型的数据才允许放入 map。

**当我们向 map 添加数据时，我们实例化了我们创建的相应类**。

当我们使用数据时，**不需要类型检查和转换**：

```
theMap.forEach((k, v) -> System.out.println(k + " -> " + v.valueDescription()));
```

如果我们运行代码，它将打印：

```
E1 (Integer) -> The value is a positive integer: 777
E2 (IntArray) -> The value is an array of 5 integers: [2, 3, 5, 7, 11]
E3 (Instant) -> The value is an instant: 2021-11-23 22:32:43
```

正如我们所看到的，**这种方法的代码是干净且更易于阅读的**。

此外，由于我们为我们需要支持的每种类型创建了包装类，具有继承关系类型不会导致任何问题。

得益于类型安全，**我们不需要处理遇到意外类型数据的错误情况**。

5. 结论

在本文中，我们讨论了如何使 Java HashMap 支持不同类型的值数据。

我们还通过示例讨论了两种实现方法。

像往常一样，伴随文章的源代码可在 GitHub 上获得。