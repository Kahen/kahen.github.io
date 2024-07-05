---
date: 2022-04-01
category:
  - Java
  - 教程
tag:
  - 封装
  - 字符串到整数转换
head:
  - - meta
    - name: 字符串转整数
      content: 探索Java中封装字符串到整数转换的不同方法，优雅地处理异常。
---

# Java中封装字符串到整数转换

在本教程中，我们将探索在Java中封装字符串输入转换为整数的不同方法，同时优雅地处理异常。

## 问题陈述
通常使用`Integer.parseInt()`方法来执行字符串到整数的转换，但如果输入不是数字，它会抛出一个异常。

使用`try-catch`块来处理这个异常可能会使代码重复且难以阅读：

```java
try {
    return Integer.parseInt(input);
} catch (NumberFormatException e) {
    logger.error("在将字符串转换为整数时遇到异常");
}
```

相反，我们可以在方法中封装转换，并在发生错误时返回一个合适的值。这还提供了将来修改或更新错误处理逻辑的便利。

现在让我们探索一些实现封装的方法。

## 通过封装进行转换
在这一部分，我们将探索几种封装字符串到整数转换逻辑的方法。我们可以使用`Optional`来封装由字符串到整数转换得到的`Integer`值，或者指示转换失败：

### 3.1 使用`Integer.parseInt()`
我们可以使用`Integer`类提供的`parseInt()`方法将字符串值转换为整数。`try-catch`块可以处理所有异常，主要是`NumberFormatException`，并在出错时返回一个默认值：

```java
Optional```<Integer>``` convertStringToIntUsingIntegerParseInt(String input) {
    try {
        return Optional.of(Integer.parseInt(input));
    } catch (NumberFormatException e) {
        return Optional.empty();
    }
}
```

这个方法使用自动装箱将基本类型`int`转换为其对应的包装类`Integer`。

### 3.2 使用`Integer.valueOf()`
在Java中，`valueOf()`是一个静态方法，可用于某些类，包括`String`、`Integer`、`Double`等。它用于将值的字符串表示转换为相应类的实例。

如果用于`Integer`包装类，它内部调用`parseInt()`。我们可以使用这个方法来实现转换，并在一个封装的方法中处理错误：

```java
Optional```<Integer>``` convertStringToIntUsingIntegerValueOf(String input) {
    try {
        return Optional.of(Integer.valueOf(input));
    } catch (NumberFormatException e) {
        return Optional.empty();
    }
}
```

### 3.3 使用`Integer.decode()`
`Integer.decode()`的工作方式类似于`Integer.valueOf()`，但它也可以接受一些其他的数字表示，如十进制、十六进制和八进制数字：

```java
Optional```<Integer>``` convertStringToIntUsingIntegerDecode(String input) {
    try {
        return Optional.of(Integer.decode(input));
    } catch (Exception e) {
        return Optional.empty();
    }
}
```

### 3.4 使用Apache Commons的`NumberUtils`
我们可以使用Apache Commons Lang 3库中`NumberUtils`类提供的`Integer`转换方法。要使用这个库，我们可以在`pom.xml`文件中添加依赖：

```xml
`<dependency>`
    `<groupId>`org.apache.commons`</groupId>`
    `<artifactId>`commons-lang3`</artifactId>`
    `<version>`3.14.0`</version>`
`</dependency>`
```

它接受一个默认值，以便在转换失败时返回。我们可以使用`toInt()`方法来实现我们的封装：

```java
int convertIntToStringUsingNumberUtils(String input, Integer defaultValue) {
    return NumberUtils.toInt(input, defaultValue);
}
```

## 结论
在本文中，我们查看了将字符串转换为整数的不同方法，处理错误，并处理需要返回默认值或记录错误的情况。

如常，代码可在GitHub上找到。

OK