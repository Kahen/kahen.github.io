---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Java
  - Boolean to String
head:
  - - meta
    - name: keywords
      content: Java, Boolean to String, Convert, Tutorial
------
# Java中将布尔值转换为字符串

## 1. 概述

我们经常需要在Java中将布尔值转换为字符串表示。例如，这在用户界面中显示值或将值写入文件或数据库时非常有用。

在这个快速教程中，我们将探讨将布尔值转换为字符串的各种方法。

## 2. 问题介绍

在Java中将布尔值转换为字符串是一个简单的任务。但是，正如我们所知，**Java中有两种布尔类型：原始的_boolean_和对象_Boolean_**。

原始_boolean_值和_Boolean_对象到字符串的转换非常相似。然而，有一些点我们应该考虑。

接下来，让我们从原始_boolean_值开始，看看如何将它们转换为字符串。

为了简单起见，我们将使用单元测试断言来验证转换结果是否符合预期。

## 3. 将原始_boolean_值转换为_String_

**原始_boolean_变量可以携带_true_或_false_**。因此，我们可以使用_if-else_语句将其转换为字符串。此外，在Java中，三元运算符（也称为条件运算符）是编写_if-else_语句的简写方式。

让我们使用三元运算符使转换代码更紧凑和易读：

```
boolean primitiveBoolean = true;
assertEquals("true", primitiveBoolean ? "true" : "false");

primitiveBoolean = false;
assertEquals("false", primitiveBoolean ? "true" : "false");
```

上述代码非常直接。正如我们所看到的，我们将_true_值转换为字符串“_true_”，将_false_转换为“_false_”。这是一种标准的转换方式。然而，有时我们可能想要重新定义转换后的字符串，例如将_true_转换为_“YES”_，将_false_转换为_“NO”_。然后，**我们可以简单地在三元表达式中更改字符串**。

当然，如果我们需要多次调用转换，我们可以将其包装在方法中。接下来，让我们看一个将_boolean_值转换为自定义字符串的示例：

```
String optionToString(String optionName, boolean optionValue) {
    return String.format("The option '%s' is %s.", optionName, optionValue ? "Enabled" : "Disabled");
}
```

_optionToString()_方法接受一个布尔选项的名称及其值，以构建选项状态的描述：

```
assertEquals("The option 'IgnoreWarnings' is Enabled.", optionToString("IgnoreWarnings", true));
```

## 4. 使用_Boolean.toString()_方法将_Boolean_对象转换为_String_

现在，让我们看看如何将_Boolean_变量转换为字符串。**_Boolean_类提供了_Boolean.toString()_方法将_Boolean_转换为_String_**：

```
Boolean myBoolean = Boolean.TRUE;
assertEquals("true", myBoolean.toString());

myBoolean = Boolean.FALSE;
assertEquals("false", myBoolean.toString());
```

如果我们仔细看看_Boolean.toString()_方法，我们会看到它的实现与我们的三元解决方案完全相同：

```
public String toString() {
    return this.value ? "true" : "false";
}
```

对象_Boolean_与原始类型类似。然而，**除了_true_和_false_，它还可以是_null_**。因此，我们需要在调用_Boolean.toString()_方法之前**确保_Boolean_变量不是_null_**。否则，将引发_NullpointerException_：

```
Boolean nullBoolean = null;
assertThrows(NullPointerException.class, () -> nullBoolean.toString());
```

## 5. 使用_String.valueOf()_方法将_Boolean_对象转换为_String_

我们已经看到，标准库中的_Boolean.toString()_可以转换_Boolean_变量为字符串。或者，**我们可以使用_String_类的_valueOf()_方法来解决问题**：

```
Boolean myBoolean = Boolean.TRUE;
assertEquals("true", String.valueOf(myBoolean));

myBoolean = Boolean.FALSE;
assertEquals("false", String.valueOf(myBoolean));
```

值得一提的是，_String.valueOf()_方法是null安全的。换句话说，如果我们的_Boolean_变量是_null_，_String.valueOf()_会产生_“null”_而不是抛出_NullPointerException_：

```
Boolean nullBoolean = null;
assertEquals("null", String.valueOf(nullBoolean));
```

这是因为_String.valueOf(Object obj)_方法进行了null检查：

```
public static String valueOf(Object obj) {
    return obj == null ? "null" : obj.toString();
}
```

## 6. 结论

在这篇文章中，我们探讨了Java中将布尔值转换为字符串的各种方法。

我们讨论了原始_boolean_和对象_Boolean_的情况：

- _boolean_ – 使用三元运算符
- _Boolean_ – 我们可以使用_Boolean.toString()_方法（需要进行null检查）或_String.valueOf()_方法（null安全）

像往常一样，这里展示的所有代码片段都可以在GitHub上找到。