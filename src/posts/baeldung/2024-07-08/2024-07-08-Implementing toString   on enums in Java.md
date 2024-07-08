---
date: 2022-04-01
category:
  - Java
  - Enums
tag:
  - toString()
  - Java Enum
head:
  - - meta
    - name: keywords
      content: Java, Enums, toString(), Enum, Java Enum toString, Java Enum Pattern
---
# Java中枚举的toString()实现方式

枚举是一种特殊类型的类，自Java 5引入以来，它帮助替代了传统的整型枚举模式。尽管技术上是合适的，但我们用于枚举常量的名称通常不是我们希望在日志、数据库或应用程序面向客户部分显示的名称。

在本教程中，我们将学习在Java中实现枚举的toString()方法的各种方式，以便我们可以提供替代或装饰性的名称。

## 2. 默认行为

所有枚举隐式扩展了Enum类，因此我们的枚举将从Enum类继承其默认的toString()行为：

```java
public String toString() {
    return name;
}
```

## 3. 在枚举类型上覆盖toString()

由于我们无法访问Enum类，我们可以控制toString()行为的下一个最高位置是在枚举类型声明中：

```java
enum FastFood {
    PIZZA,
    BURGER,
    TACO,
    CHICKEN,
    ;

    @Override
    public String toString() {
        // ...?
    }
}
```

在toString()方法中，我们可以访问的唯一变量是this.name和this.ordinal。我们已经知道默认行为是打印枚举常量名称，我们并不希望打印序号。然而，我们可以将序号一一映射到我们的装饰字符串：

```java
@Override
public String toString() {
    switch (this.ordinal()) {
        case 0:
            return "Pizza Pie";
        case 1:
            return "Cheese Burger";
        case 2:
            return "Crunchy Taco";
        case 3:
            return "Fried Chicken";
        default:
            return null;
    }
}
```

虽然有效，但将0等同于"Pizza Pie"并不十分直观。然而，因为this本身是一个枚举，我们可以简化上述switch语句，使其更直接：

```java
@Override
public String toString() {
    switch (this) {
        case PIZZA:
            return "Pizza Pie";
        case BURGER:
            return "Cheese Burger";
        case TACO:
            return "Crunchy Taco";
        case CHICKEN:
            return "Fried Chicken";
        default:
            return null;
    }
}
```

## 4. 在枚举常量上覆盖toString()

我们可以在每个单独的枚举常量上覆盖Enum类或枚举类型声明中定义的任何方法。由于我们知道toString()是在Enum类中定义的，我们可以跳过在我们的枚举类型声明中实现它：

```java
enum FastFood {
    PIZZA {
        @Override
        public String toString() {
            return "Pizza Pie";
        }
    },
    BURGER {
        @Override
        public String toString() {
            return "Cheese Burger";
        }
    },
    TACO {
        @Override
        public String toString() {
            return "Crunchy Taco";
        }
    },
    CHICKEN {
        @Override
        public String toString() {
            return "Fried Chicken";
        }
    }
}
```

## 5. 替代名称字段

我们的另一个选择是在枚举类型声明中包含额外的字段，并在创建每个枚举常量时分配将传递给构造函数的值：

```java
enum FastFood {
    PIZZA("Pizza Pie"),
    BURGER("Cheese Burger"),
    TACO("Crunchy Taco"),
    CHICKEN("Fried Chicken"),
    ;

    private final String prettyName;

    FastFood(String prettyName) {
        this.prettyName = prettyName;
    }
}
```

然后，我们可以简单地在我们的枚举类型声明的toString()方法中使用这些值：

```java
@Override
public String toString() {
    return prettyName;
}
```

## 6. 从装饰字符串创建枚举

如果我们要做所有这些工作将我们的枚举转换为装饰字符串，那么建立一种反向操作的方式是有意义的。我们不是要覆盖Enum类的valueOf()方法，该方法将提供的字符串与枚举常量名称进行比较，让我们创建我们自己的，这样我们就可以利用任一行为，如果我们愿意的话：

```java
FastFood fromString(String prettyName) {
    for (FastFood f : values()) {
        if (f.prettyName.equals(prettyName)) {
            return f;
        }
    }
    return null;
}
```

## 7. 结论

在本文中，我们学习了实现枚举的toString()的几种方式。像往常一样，文章中使用的全部源代码可以在GitHub上找到。