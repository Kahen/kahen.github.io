---
date: 2022-04-01
category:
  - Java
  - String Manipulation
tag:
  - Java
  - String
  - Uppercase
head:
  - - meta
    - name: keywords
      content: Java, String, Uppercase
------
# 检查字符串首字母是否大写

## 1. 引言

在本简短教程中，我们将熟悉在Java中检查字符串首字母是否大写的不同选项。

## 2. 示例

首先，我们将定义在所有解决方案中使用的示例字符串：

```java
String example = "Katie";
```

因此，示例字符串只是一个大写的名字。现在，让我们检查首字母是否大写的选项。

## 3. 核心Java解决方案

我们将熟悉的第一个解决方案不需要新依赖项。我们将使用来自_java.lang_包中的_Character_类的_isUpperCase_方法：

```java
public static boolean isUpperCase(int codePoint);
```

**此方法接受一个字符，并确定它是否是大写字符。**

对于我们的情况，我们只需要提取字符串中的第一个字符。首先，我们将使用_charAt_方法进行提取。然后，我们将调用_isUpperCase_方法：

```java
Assertions.assertTrue(Character.isUpperCase(example.charAt(0)));
```

由于示例字符串中的第一个字母是大写字符，因此此断言将通过。

## 4. 使用正则表达式

正则表达式是在输入字符串中查找匹配项的常用解决方案。因此，我们将使用它们来检查字符串中的第一个字符是否为大写。

与之前的解决方案一样，这种方法不需要添加新依赖项。正则表达式已经在_java.util.regex_包中可用。

下一步是定义匹配模式。**对于我们的情况，我们需要一个模式，该模式将匹配如果字符串以大写字符开头，而其他字符可以是大写、小写或数字**。然后，我们只需要检查模式是否与我们的示例字符串匹配：

```java
String regEx = "[A-Z]\\w*";
Assertions.assertTrue(example.matches(regEx));
```

## 5. Guava解决方案

另一种解决方案可以在Guava库中找到。**我们将需要使用_Ascii_类的_isUpperCase_方法来检查字符串首字母是否大写。**

第一步是添加Guava依赖项：

```xml
``<dependency>``
    ``<groupId>``com.google.guava``</groupId>``
    ``<artifactId>``guava``</artifactId>``
    ``<version>``31.0.1-jre``</version>``
``</dependency>``
```

然后，我们将应用_isUpperCase_方法到我们的示例字符串的第一个字母：

```java
Assertions.assertTrue(Ascii.isUpperCase(example.charAt(0)));
```

这种方法实际上与第2.1节中的核心Java解决方案相同。如果没有特别的原因，总是最好使用不需要额外依赖项的解决方案。

## 6. 结论

在本文中，我们检查了检查首字母是否大写的不同解决方案。

首先，我们讨论了核心Java中可用的解决方案。后来，我们看到了如何使用正则表达式进行检查。最后，我们展示了Guava库中的解决方案。

一如既往，这些示例的代码可以在GitHub上找到。---
date: 2022-04-01
category:
  - Java
  - String Manipulation
tag:
  - Java
  - String
  - Uppercase
head:
  - - meta
    - name: keywords
      content: Java, String, Uppercase
------
# 检查字符串首字母是否大写

## 1. 引言

在本简短教程中，我们将熟悉在Java中检查字符串首字母是否大写的不同选项。

## 2. 示例

首先，我们将定义在所有解决方案中使用的示例字符串：

```java
String example = "Katie";
```

这个示例字符串是一个首字母大写的名称。现在，让我们探讨检查首字母是否为大写的不同方法。

## 3. 核心Java解决方案

我们首先了解的解决方案不需要添加新的依赖。我们将使用`java.lang`包中`Character`类的`isUpperCase`方法：

```java
public static boolean isUpperCase(int codePoint);
```

这个方法接受一个字符，并判断它是否为大写字母。

在我们的例子中，我们只需要提取字符串的第一个字符。我们可以使用`charAt`方法来提取，然后调用`isUpperCase`方法：

```java
Assertions.assertTrue(Character.isUpperCase(example.charAt(0)));
```

由于我们示例字符串的第一个字母是大写，这个断言将会通过。

## 4. 使用正则表达式

正则表达式是检查输入字符串中匹配项的常用方法。我们将使用正则表达式来检查字符串的第一个字符是否为大写。

和之前的解决方案一样，这个方法不需要添加新的依赖。正则表达式已经在`java.util.regex`包中可用。

下一步是定义匹配模式。我们需要一个模式，它能够匹配字符串以大写字母开头的情况，而其他字符可以是大写、小写或数字。然后，我们只需要检查这个模式是否与我们的示例字符串匹配：

```java
String regEx = "^[A-Z].*";
Assertions.assertTrue(example.matches(regEx));
```

## 5. Guava解决方案

在Guava库中，我们还可以找到另一种解决方案。我们将使用`Ascii`类的`isUpperCase`方法来检查字符串的第一个字母是否为大写。

首先，我们需要添加Guava依赖：

```xml
``<dependency>``
    ``<groupId>``com.google.guava``</groupId>``
    ``<artifactId>``guava``</artifactId>``
    ``<version>``31.0.1-jre``</version>``
``</dependency>``
```

然后，我们将`isUpperCase`方法应用于示例字符串的第一个字母：

```java
Assertions.assertTrue(Ascii.isUpperCase(example.charAt(0)));
```

这种方法实际上与核心Java解决方案非常相似。如果没有特别的理由，最好使用不需要额外依赖的解决方案。

## 6. 结论

在本文中，我们探讨了不同的方法来检查字符串的第一个字母是否为大写。

首先，我们讨论了Java核心库中的解决方案。接着，我们展示了如何使用正则表达式进行检查。最后，我们介绍了Guava库中的解决方案。

如常，这些示例的代码可以在GitHub上找到。

OK