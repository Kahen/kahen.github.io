---
date: 2024-06-27
category:
  - Java
  - ASCII
tag:
  - Java
  - ASCII
  - 控制台
  - 表格
head:
  - - meta
    - name: keywords
      content: Java ASCII 控制台 表格
---

# 使用ASCII在Java控制台中创建表格 | Baeldung

## 1. 概述

Java标准库提供了`printf()`和`format()`方法，用于将格式化数据输出到控制台。这两种方法使得在控制台应用程序中使用ASCII字符创建表格成为可能。此外，还有一个名为AsciiTable的第三方库，进一步简化了这项任务。

在本教程中，我们将学习如何使用Java标准API和第三方API在Java中使用ASCII字符创建表格。

## 2. 项目设置

为了理解如何在Java中将表格输出到控制台，让我们创建一个简单的项目，将一个人的姓名、身高、体重和体重指数（BMI）输出到控制台。

首先，让我们创建一个名为`BodyMassIndex`的类：

```java
class BodyMassIndex {
    private String name;
    private double height;
    private double weight;

    // 构造函数，getter和setter

    double calculate() {
        double bmi = weight / (height * height);
        String formattedBmi = String.format("%.2f", bmi);
        return Double.parseDouble(formattedBmi);
    }
}
```

在这里，我们创建了一个名为`BodyMassIndex`的类。它的构造函数接受`name`、`height`和`weight`作为参数。我们还定义了一个名为`calculate()`的方法来计算体重指数。

我们还将创建一个名为`BodyMassIndexApplication`的新类，它将使用`BodyMassIndex`对象使用ASCII字符构建表格。

接下来，让我们在类中创建`BodyMassIndex`对象并将它们存储在`ArrayList`中：

```java
List`<BodyMassIndex>` bodyMassIndices = new ArrayList<>();
bodyMassIndices.add(new BodyMassIndex("Tom", 1.8, 80));
bodyMassIndices.add(new BodyMassIndex("Elton", 1.9, 90));
bodyMassIndices.add(new BodyMassIndex("Harry", 1.9, 90));
bodyMassIndices.add(new BodyMassIndex("Hannah", 1.9, 90));
```

在后续部分中，我们将使用`System.out.format()`和AsciiTable以表格形式将数据输出到控制台。

## 3. 使用`System.out.format()`方法

Java `PrintStream`对象`System.out`提供了`format()`和`print()`等方法，用于将格式化字符串输出到控制台。这两种方法都非常适合使用ASCII字符构建表格。我们可以使用这些方法仔细放置ASCII字符以绘制线条和定位数据。

### 3.1. `System.out.format()`

我们将使用格式说明符正确地放置数据列。让我们看一个示例代码，使用ASCII字符将表格输出到控制台：

```java
System.out.format("+---------+---------+---------+-------+%n");
System.out.format("| Name    | Height  |  Weight | BMI   |%n");
System.out.format("+---------+---------+---------+-------+%n");
String leftAlignment = "| %-7s | %-7.2f | %-7.2f | %-5.2f |%n";
for (BodyMassIndex bodyMassIndex : bodyMassIndices) {
    System.out.format(leftAlignment, bodyMassIndex.getName(), bodyMassIndex.getHeight(), bodyMassIndex.getWeight(), bodyMassIndex.calculate());
    System.out.format("+---------+---------+---------+-------+%n");
}
```

在上述代码中，我们为表格创建了四列的标题。首先，我们使用加号表示每列的开始和结束。接下来，我们使用连字符绘制水平线。然后，我们使用换行字符结束每行。

此外，我们使用管道符号绘制垂直线。字符`+`、`-`和`|`根据表格的结构进行排列。

最后，我们声明一个名为`leftAlignment`的字符串变量，并将其分配给格式`String`的值。格式字符串有助于将输出格式化到控制台。格式字符串包含以下元素：

- `|` – 在输出中分隔列
- `%-7s` – 有助于左对齐字符串，并使用最小字段宽度为7个字符
- `%-7.2f` – 有助于左对齐浮点数，并使用最小字段宽度为7个字符和2个小数位
- `%-5.2f` – 有助于设置最小字段宽度为5个字符和2个小数位
- `%n` – 换行字符

**或者，我们可以使用`System.out.printf()`代替`System.out.format()`。两种方法提供相同的结果。**

### 3.2. 输出

这是生成的表格：

控制台显示了使用ASCII字符构建的表格。表格根据我们的规格在控制台上呈现。

## 4. 使用AsciiTable库

AsciiTable是一个第三方库，可以轻松创建外观漂亮的ASCII表格。

### 4.1. AsciiTable库

要使用AsciiTable库，让我们将其依赖项添加到_pom.xml_：

```xml
`<dependency>`
    `<groupId>`de.vandermeer`</groupId>`
    `<artifactId>`asciitable`</artifactId>`
    `<version>`0.3.2`</version>`
`</dependency>`
```

接下来，让我们看一个示例代码，使用该库以ASCII格式创建BMI数据表：

```java
AsciiTable asciiTable = new AsciiTable();
asciiTable.addRule();
asciiTable.addRow("Name", "Height", "Weight", "BMI");
asciiTable.addRule();
for (BodyMassIndex bodyMassIndex : bodyMassIndices) {
    asciiTable.addRow(bodyMassIndex.getName(), bodyMassIndex.getHeight(), bodyMassIndex.getWeight(), bodyMassIndex.calculate());
    asciiTable.addRule();
}
asciiTable.setTextAlignment(TextAlignment.CENTER);
String render = asciiTable.render();
System.out.println(render);
```

在上述代码中，我们创建了一个`AsciiTable`对象。接下来，我们调用它的`addRule()`方法来添加一条水平线。然后，我们使用`addRow()`方法将数据填充到`AsciiTable`表对象中。

**此外，`AsciiTable`类提供了格式化数据的方法。我们通过调用`setTextAlignment()`方法将数据居中对齐。**该方法接受一个枚举作为参数，以指定文本对齐方式。

最后，我们调用`render()`方法，它返回`AsciiTable`对象上的一个字符串。

### 4.2. 输出

这是控制台上的输出：

AsciiTable库提供了一种简单的方法，用最少的代码在控制台创建外观漂亮的ASCII表格。

## 5. 结论

在本文中，我们学习了如何使用内置的`System.out.format()`方法和AsciiTable库将表格输出到控制台。

两种方法都提供了实现任务的工作方式。**然而，使用AsciiTable库需要较少的工作来正确对齐列，而`System.out.format()`方法提供了更直接的样式控制。**

像往常一样，示例的完整源代码可以在GitHub上找到。