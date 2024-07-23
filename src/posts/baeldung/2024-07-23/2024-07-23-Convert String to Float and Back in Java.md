---
date: 2024-07-23
category:
  - Java
  - 字符串转换
tag:
  - Java
  - 浮点数
  - 字符串
head:
  - - meta
    - name: keywords
      content: Java, 字符串转换, 浮点数
---
# Java中将字符串转换为浮点数及反向转换

将数据从浮点数转换为字符串以及反向操作在Java中是一种常规操作。然而，进行这种转换的多种方法可能会引起混乱和不确定性，使人不确定应该选择哪种方法。

在本文中，我们将展示并比较所有可用的选项。

首先，让我们看看将浮点数值转换为字符串的最常见方式。

### 2.1 字符串拼接

我们可以使用的最直接解决方案是将浮点值与一个空字符串进行拼接。

让我们看一个例子：

```java
float givenFloat = 1.25f;

String result = givenFloat + "";

assertEquals("1.25", result);
```

同样，我们可以将一个Float对象添加到空字符串中，并得到相同的结果。当我们使用一个Float对象时，它的toString()方法会自动被调用：

```java
Float givenFloat = 1.25f;

String result = givenFloat + "";

assertEquals("1.25", result);
```

如果Float对象为null，拼接结果将是“null”字符串：

```java
Float givenFloat = null;

String result = givenFloat + "";

assertEquals("null", result);
```

### 2.2 Float.toString()

我们可以使用Float类的静态toString()方法作为另一种选项，用于字符串转换。我们可以将浮点原始值或Float对象传递给toString()方法：

```java
Float givenFloat = 1.25f;

String result = Float.toString(givenFloat);

assertEquals("1.25", result);
```

如果我们将null作为参数传递给该方法，我们将在运行时得到一个NullPointerException：

```java
Float givenFloat = null;

assertThrows(NullPointerException.class, () -> Float.toString(givenFloat));
```

### 2.3 String.valueOf()

同样，我们可以使用String的静态valueOf()方法：

```java
Float givenFloat = 1.25f;

String result = String.valueOf(givenFloat);

assertEquals("1.25", result);
```

与Float.toString()不同，如果我们传递null作为参数，String.valueOf()不会抛出异常，而是返回“null”字符串：

```java
Float givenFloat = null;

String result = String.valueOf(givenFloat);

assertEquals("null", result);
```

### 2.4 String.format()

String的format()静态方法为我们提供了额外的格式化选项。我们必须意识到，如果不限制小数位数，结果将包含尾随零，即使没有小数部分，如下例所示：

```java
Float givenFloat = 1.25f;

String result = String.format("%f", givenFloat);

assertEquals("1.250000", result);
```

当我们格式化浮点数并指定小数位数时，format()方法也会对结果进行四舍五入：

```java
Float givenFloat = 1.256f;

String result = String.format("%.2f", givenFloat);

assertEquals("1.26", result);
```

如果我们传递一个null的Float，那么转换结果将是一个“null”字符串：

```java
Float givenFloat = null;

String result = String.format("%f", givenFloat);

assertEquals("null", result);
```

### 2.5 DecimalFormat

最后，DecimalFormat类有一个format()方法，允许将浮点值转换为自定义格式的字符串。优势在于我们可以精确定义我们想要的字符串中的小数位数。

让我们看看如何在示例中使用它：

```java
Float givenFloat = 1.25f;

String result = new DecimalFormat("#.0000").format(givenFloat);

assertEquals("1.2500", result);
```

如果我们应用格式化后没有小数部分，DecimalFormat将返回整个数字：

```java
Float givenFloat = 1.0025f;

String result = new DecimalFormat("#.##").format(givenFloat);

assertEquals("1", result);
```

如果我们传递null作为参数，那么我们将得到一个IllegalArgumentException：

```java
Float givenFloat = null;

assertThrows(IllegalArgumentException.class, () -> new DecimalFormat("#.000").format(givenFloat));
```

## 3. 字符串到Float

接下来，让我们看看将字符串值转换为Float的最常见方式。

### 3.1 Float.parseFloat()

最常见的方式之一是使用Float的静态方法：parseFloat()。它将返回一个由字符串参数表示的原始float值。此外，它还会忽略前导和尾随空格：

```java
String givenString = "1.25";

float result = Float.parseFloat(givenString);

assertEquals(1.25f, result);
```

如果我们的字符串参数是null，我们将得到一个NullPointerException：

```java
String givenString = null;

assertThrows(NullPointerException.class, () -> Float.parseFloat(givenString));
```

如果字符串参数不包含可解析的float，我们将得到一个NumberFormatException：

```java
String givenString = "1.23x";

assertThrows(NumberFormatException.class, () -> Float.parseFloat(givenString));
```

### 3.2 Float.valueOf()

同样，我们可以使用Float的静态valueOf()方法。不同之处在于valueOf()返回一个Float对象。具体来说，它调用parseFloat()方法并将结果装箱到一个Float对象中：

```java
String givenString = "1.25";

Float result = Float.valueOf(givenString);

assertEquals(1.25f, result);
```

同样，如果我们传递一个不可解析的字符串，我们将得到一个NumberFormatException：

```java
String givenString = "1.25x";

assertThrows(NumberFormatException.class, () -> Float.valueOf(givenString));
```

### 3.3 DecimalFormat

我们也可以使用DecimalFormat将字符串转换为Float。主要优势之一是指定自定义的小数点分隔符。

```java
String givenString = "1,250";
DecimalFormatSymbols symbols = new DecimalFormatSymbols();
symbols.setDecimalSeparator(',');
DecimalFormat decimalFormat = new DecimalFormat("#.000");
decimalFormat.setDecimalFormatSymbols(symbols);

Float result = decimalFormat.parse(givenString).floatValue();

assertEquals(1.25f, result);
```

### 3.4 Float的构造函数

最后，我们可以直接使用Float的构造函数进行转换。在内部，它将使用Float的静态parseFloat()方法并创建一个Float对象：

```java
String givenString = "1.25";

Float result = new Float(givenString);

assertEquals(1.25f, result);
```

从Java 9开始，这个构造函数已被弃用。相反，我们应该考虑使用其他静态工厂方法，如parseFloat()或valueOf()。

## 4. 结论

在本文中，我们探讨了将字符串实例转换为float或Float实例以及反向转换的多种方式。

对于简单的转换，字符串拼接和Float.toString()是将转换为字符串的首选选项。如果我们需要更复杂的格式化，那么DecimalFormat是完成工作的最佳工具。对于将字符串转换为浮点值，如果我们需要一个float原始值，可以使用Float.parseFloat()，如果我们更喜欢一个Float对象，可以使用Float.valueOf()。同样，对于自定义格式化，DecimalFormat是最佳选项。

如常，这些示例的代码可以在GitHub上找到。