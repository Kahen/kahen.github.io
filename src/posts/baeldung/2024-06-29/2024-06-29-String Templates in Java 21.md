---
date: 2023-04-01
category:
  - Java
  - String Templates
tag:
  - Java 21
  - JEP 430
head:
  - - meta
    - name: keywords
      content: Java 21, String Templates, JEP 430, String Interpolation
---
# Java 21中的字符串模板 | Baeldung

## 1. 引言

在本教程中，我们将专注于Java对字符串插值的解决方案，即字符串模板。这个预览版特性作为JEP 430的一部分，被引入到Java 21中。

## 2. Java中的字符串组合

我们在代码中使用_字符串_来表示数字、字母和符号的序列作为文本。_字符串_在编程中无处不在，我们经常需要组合字符串以在代码中使用。有几种方法可以做到这一点，每种技术都有其缺点。

### 2.1. 字符串连接
字符串连接是我们用来构建字符串的最基本操作。我们采用字符串字面量和表达式，然后使用_+_符号将它们组合在一起：

```java
String composeUsingPlus(String feelsLike, String temperature, String unit){
    return "Today's weather is " + feelsLike +
      ", with a temperature of " + temperature + " degrees " + unit;
}
```

**这段代码实现了所需的功能，但由于所有的加号符号，阅读起来很困难，也很难维护和更改。**

### 2.2. _StringBuffer_ 或 _StringBuilder_
我们还可以使用Java提供的实用类，如_StringBuilder_和_StringBuffer_类。这些类提供了_append()_库函数来组合字符串，从而消除了字符串组合中对_\+_的使用：

```java
String composeUsingStringBuilder(String feelsLike, String temperature, String unit) {
    return new StringBuilder()
      .append("Today's weather is ")
      .append(feelsLike)
      .append(", with a temperature of ")
      .append(temperature)
      .append(" degrees ")
      .append(unit)
      .toString();
}
```

_StringBuilder_和_StringBuffer_类提供了高效的字符串操作和组合技术，同时减少了内存开销。**然而，它们遵循_构建者_设计模式，因此变得相当冗长。**

### 2.3. 字符串格式化器
Java提供了将字符串的静态部分与参数（如_temperature_和_unit_）分离的能力，使用_String.format()_或_formatted()_方法：

```java
String composeUsingFormatters(String feelsLike, String temperature, String unit) {
    return String.format("Today's weather is %s, with a temperature of %s degrees %s",
      feelsLike, temperature, unit);
}
```

**基本模板字符串保持静态。然而，这里传递的参数的顺序和数量对于响应的正确性至关重要。**

### 2.4. _MessageFormat_类
Java提供了一个_MessageFormat_类，它属于_Java.text_包，有助于使用动态数据的占位符来组合文本消息。_本地化_和_国际化_大量使用这个。我们可以在普通字符串组合中使用_MessageFormat.format()_：

```java
String composeUsingMessageFormatter(String feelsLike, String temperature, String unit) {
    return MessageFormat.format("Today's weather is {0}, with a temperature of {1} degrees {2}",
      feelsLike, temperature, unit);
}
```

这种技术与上述选项有类似的缺陷。此外，语法结构与我们在代码中编写和使用字符串的方式不同。

## 3. 字符串模板介绍

正如我们所看到的，上述提到的所有字符串组合技术都有其不足之处。现在让我们看看字符串模板如何帮助解决这些问题。

### 3.1. 目标
字符串模板被引入到Java编程生态系统中，具有以下目标：

- 简化在运行时编译的值表达式_字符串_的过程
- 提高_字符串_组合的可读性，克服与_StringBuilder_和_StringBuffer_类相关的冗长
- 克服其他编程语言允许的_字符串_插值技术的安全问题，以牺牲少量的不便
- 允许Java库定义结果字符串字面量的自定义格式化语法

### 3.2. 模板表达式
字符串模板的最重要概念围绕着模板表达式，这是Java中的新型可编程表达式。**可编程模板表达式可以执行插值，还为我们提供了安全高效地组合字符串的灵活性。**

**模板表达式可以将结构化文本转换为任何对象，它们不仅限于字符串。**

模板表达式有三个组成部分：

- 一个处理器
- 一个包含嵌入表达式的数据的模板
- 一个点（.）字符

## 4. 模板处理器

**模板处理器负责评估嵌入表达式（模板），并在运行时将其与_字符串_字面量组合，以产生最终的_字符串_。** Java提供了使用Java提供的内置模板处理器的能力，或者可以切换为我们自己的自定义处理器。

这是Java 21中的一个预览特性；因此，我们需要启用预览模式。

### 4.1. _STR_模板处理器
Java提供了一些现成的模板处理器。**_STR_模板处理器通过迭代替换提供的模板中的每个嵌入表达式为该表达式的字符串化值来执行字符串插值。** 我们将在这里应用_STR_处理器字符串模板到我们之前的例子中：

```java
String interpolationUsingSTRProcessor(String feelsLike, String temperature, String unit) {
    return STR
      . "Today's weather is { feelsLike }, with a temperature of { temperature } degrees { unit }" ;
}
```

**_STR_是一个公共静态最终字段，并且会自动导入到每个Java编译单元中。**

我们可以将上述实现扩展到不仅仅是单行字符串，还可以扩展到多行表达式。对于多行文本块，我们用_“””_将文本块包围起来。让我们以插值一个表示JSON的字符串为例：

```java
String interpolationOfJSONBlock(String feelsLike, String temperature, String unit) {
    return STR
      . """
      {
        "feelsLike": "{ feelsLike }",
        "temperature": "{ temperature }",
        "unit": "{ unit }"
      }
      """ ;
}
```

**我们还可以内联注入表达式，这将运行时编译：**

```java
String interpolationWithExpressions() {
    return STR
      . "Today's weather is { getFeelsLike() }, with a temperature of { getTemperature() } degrees { getUnit() }";
}
```

### 4.2. _FMT_模板处理器
Java提供的另一个处理器是_FMT_模板处理器。**它增加了对处理器提供的格式化程序的理解，这些格式化程序根据提供的格式化样式格式化数据。**

提供的_格式化程序_应该类似于_java.util.Formatter_：

```java
String interpolationOfJSONBlockWithFMT(String feelsLike, float temperature, String unit) {
    return FMT
      . """
      {
        "feelsLike": "%1s{ feelsLike }",
        "temperature": "%2.2f{ temperature }",
        "unit": "%1s{ unit }"
      }
      """ ;
}
```

**这里，我们使用_%s_和_%f_以特定格式格式化字符串和温度。**

### 4.3. 模板表达式的评估
评估模板表达式涉及几个步骤：

```java
STR
  . "Today's weather is { feelsLike }, with a temperature of { temperature } degrees { unit }" ;
```

上述是几个步骤的简写。

首先，通过评估点左侧的实例，获得模板处理器_StringTemplate.Processor`<R, E>`_的实例。在我们的例子中，它是_STR_模板处理器。

接下来，通过评估点右侧的实例，获得模板_StringTemplate_的实例：

```java
StringTemplate str = RAW
  . "Today's weather is { getFeelsLike() }, with a temperature of { getTemperature() } degrees { getUnit() }" ;
```

_RAW_是产生未处理_StringTemplate_类型对象的标准模板处理器。

最后，我们将_StringTemplate str_实例传递给处理器（在我们的例子中是_STR）的process()方法：

```java
return STR.process(str);
```

## 5. 字符串插值和字符串模板

现在我们已经看到了使用字符串模板作为字符串组合技术的例子，我们可以看到它与字符串插值非常相似。然而，字符串模板提供了通常在其他平台上不保证的安全性。

**模板表达式故意设计得无法将包含嵌入表达式的字符串字面量或文本块直接插值到输出字符串中。** 处理器的存在确保了危险或错误的字符串不会在代码中传播。**处理器的责任是验证插值是否安全和正确。**

**缺少任何模板处理器将生成编译时错误。此外，如果处理器无法插值，它可以生成_Exception_。**

Java根据嵌入表达式的存在来决定_“``<some text>``”_是被视为_StringLiteral_还是_StringTemplate_。对于_“””``<some text>``”””_，同样用于区分_TextBlock_和_TextBlockTemplate_。**这种区分对Java很重要，因为即使在这两种情况下它都被双引号(_“”_)包围，字符串模板是类型_java.lang.StringTemplate_，一个接口，而不是_java.lang.String._**

## 6. 结在本文中，我们讨论了几种字符串组合技术，并考察了字符串插值的概念。我们还看到了Java如何通过字符串模板引入字符串插值的概念。最后，我们看到了字符串模板比一般的字符串插值更好、更安全。

如常，代码可以在GitHub上找到。

[Baeldung logo](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)[Gravatar image](https://secure.gravatar.com/avatar/0f08492941896785c081f90c7a231caa?s=50&r=g)[Gravatar image](https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g)[Announcement icon](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)[Baeldung REST post footer](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)[Baeldung REST post footer icon](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK