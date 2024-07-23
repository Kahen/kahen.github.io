---
date: 2022-04-01
category:
  - Java
  - Enum
tag:
  - Java
  - Enum
  - 枚举
  - 搜索
head:
  - - meta
    - name: keywords
      content: Java, Enum, 枚举, 搜索, 枚举值查找
---
# 在Java中检查枚举值是否存在

## 1. 概述

我们在几乎所有应用程序中都会看到枚举。这些包括订单状态代码，如_草稿(DRAFT)_和_处理中(PROCESSING)_，以及网页错误代码，如400、404、500、501等。每当我们在领域中看到枚举数据时，在我们的应用程序中就会看到对应的_Enum_。我们可以使用传入请求中的数据并找到该枚举。例如，我们可以将网页错误_400_映射到_BadRequest_。

因此，我们需要逻辑来按条件搜索枚举。这可以是它的名称或它的值。或者它甚至可以是任意的整型代码。

在本教程中，我们将学习如何按条件搜索枚举。此外，我们还将探索返回找到的枚举的不同方式。

## 2. 按名称搜索枚举

首先，我们知道枚举类型是一种特殊的数据类型。它允许一个变量成为一组预定义常量。让我们为方向定义一个枚举：

```java
public enum Direction {
    EAST, WEST, SOUTH, NORTH;
}
```

枚举值的名称是常量。例如，_Direction.EAST_的名称是_EAST_。现在我们可以按其名称搜索方向。实现一个不区分大小写的搜索是一个好主意。这样，_East_、_east_和_EAST_都会映射到_Direction.EAST_。让我们向_Direction_枚举添加以下方法：

```java
public static Direction findByName(String name) {
    Direction result = null;
    for (Direction direction : values()) {
        if (direction.name().equalsIgnoreCase(name)) {
            result = direction;
            break;
        }
    }
    return result;
}
```

在这个实现中，如果我们没有找到给定名称的枚举，我们将返回_null_。如何处理未找到的场景取决于我们。一个选择是我们可以返回一个默认的枚举值。相反，我们可以抛出一个异常。我们很快就会看到更多的搜索枚举的例子。现在让我们测试我们的搜索逻辑。首先是积极的情境：

```java
@Test
public void givenWeekdays_whenValidDirectionNameProvided_directionIsFound() {
    Direction result = Direction.findByName("EAST");
    assertThat(result).isEqualTo(Direction.EAST);
}
```

在本文的最后，我们将提供完整代码实现的链接，但现在我们将专注于代码片段。在这里，我们按名称“EAST”搜索方向，我们期望得到_Direction.EAST_。如前所述，我们知道搜索是不区分大小写的，所以我们应该对名称“east”或“East”得到相同的结果。让我们验证我们的期望：

```java
@Test
public void givenWeekdays_whenValidDirectionNameLowerCaseProvided_directionIsFound() {
    Direction result = Direction.findByName("east");
    assertThat(result).isEqualTo(Direction.EAST);
}
```

我们还可以添加另一个测试来验证如果搜索方法对名称“East”返回相同的结果。以下测试将说明我们对名称“East”得到相同的结果。

```java
@Test public void givenWeekdays_whenValidDirectionNameLowerCaseProvided_directionIsFound() {
    Direction result = Direction.findByName("East");
    assertThat(result).isEqualTo(Direction.EAST);
}
```

## 3. 按值搜索枚举

现在让我们定义一个枚举来表示一周的日子。这次，让我们在名称旁边提供一个值。实际上，我们可以在枚举内部定义任何数据成员(一个或多个)，然后将其用于我们的应用程序逻辑。这是_Weekday_枚举的代码：

```java
public enum Weekday {
    MONDAY("Monday"),
    TUESDAY("Tuesday"),
    // ...
    SUNDAY("Sunday"),
    ;
    private final String value;

    Weekday(String value) {
        this.value = value;
    }
}
```

接下来，让我们实现按值搜索。对于“Monday”，我们应该得到_Weekday.MONDAY_。让我们向枚举添加以下方法：

```java
public static Weekday findByValue(String value) {
    Weekday result = null;
    for (Weekday day : values()) {
        if (day.getValue().equalsIgnoreCase(value)) {
            result = day;
            break;
        }
    }
    return result;
}
```

在这里，我们正在遍历枚举的常量，然后比较输入的值与枚举的值成员。如前所述，我们忽略了值的大小写。现在我们可以测试它：

```java
@Test
public void givenWeekdays_whenValidWeekdayValueProvided_weekdayIsFound() {
    Weekday result = Weekday.findByValue("Monday");
    assertThat(result).isEqualTo(Weekday.MONDAY);
}
```

如果我们没有提供有效的值，我们将返回_null_。让我们验证这一点：

```java
@Test
public void givenWeekdays_whenInvalidWeekdayValueProvided_nullIsReturned() {
    Weekday result = Weekday.findByValue("mon");
    assertThat(result).isNull();
}
```

搜索并不总是需要通过字符串值进行。这将相当不便，因为我们必须先将输入转换为字符串，然后将其传递给搜索方法。现在让我们看看如何按非字符串值搜索，例如整数值。

## 4. 按整数值搜索枚举

让我们定义一个名为_Month_的新枚举。这是_Month_枚举的代码：

```java
public enum Month {
    JANUARY("January", 1),
    FEBRUARY("February", 2),
    // ...
    DECEMBER("December", 12),
    ;

    private final String value;
    private final int code;

    Month(String value, int code) {
        this.value = value;
        this.code = code;
    }
}
```

我们可以看到，月份枚举有两个成员，即值和代码，其中代码是整数值。让我们实现按代码搜索月份的逻辑：

```java
public static Optional```<Month>``` findByCode(int code) {
    return Arrays.stream(values()).filter(month -> month.getCode() == code).findFirst();
}
```

这次搜索与之前的搜索看起来有点不同，因为我们使用了Java 8的特性来演示另一种实现搜索的方式。在这里，我们不是返回枚举本身，而是返回枚举的_Optional_值。同样，而不是_null_，我们将返回一个空的_Optional_。因此，如果我们按代码1搜索一个月，我们应该得到_Month.JANUARY_。让我们用一个测试来验证这一点：

```java
@Test
public void givenMonths_whenValidMonthCodeProvided_optionalMonthIsReturned() {
    Optional```<Month>``` result = Month.findByCode(1);
    assertThat(result).isEqualTo(Optional.of(Month.JANUARY));
}
```

对于无效的代码值，我们应该得到一个空的_Optional_。让我们也用一个测试来验证这一点：

```java
@Test
public void givenMonths_whenInvalidMonthCodeProvided_optionalEmptyIsReturned() {
    Optional```<Month>``` result = Month.findByCode(0);
    assertThat(result).isEmpty();
}
```

可能有的情况下，我们想要实现一个更严格的搜索。这样，我们就不会容忍无效的输入，我们会抛出异常来演示这一点。

## 5. 搜索方法抛出的异常

而不是返回_null_或空的_Optional_值，我们可能想要抛出一个异常。抛出哪种异常完全取决于系统的需求。如果我们没有找到枚举，我们将抛出一个_IllegalArgumentException_。这是搜索方法的代码：

```java
public static Month findByValue(String value) {
    return Arrays.stream(values()).filter(month -> month.getValue().equalsIgnoreCase(value)).findFirst().orElseThrow(IllegalArgumentException::new);
}
```

我们再次看到，我们在抛出异常时使用了Java 8的风格。让我们用一个测试来验证它：

```java
@Test
public void givenMonths_whenInvalidMonthValueProvided_illegalArgExIsThrown() {
    assertThatIllegalArgumentException().isThrownBy(() -> Month.findByValue("Jan"));
}
```

本文中演示的搜索方法并不是唯一的方法，但它们代表了最常见的选项。我们还可以调整这些实现以适应我们系统的需求。

## 6. 结论

在本文中，我们学习了多种搜索枚举的方式。我们还讨论了返回结果的不同方式。最后，我们用坚实的单元测试支持了这些实现。

像往常一样，与本文相关的代码可以在GitHub上找到。