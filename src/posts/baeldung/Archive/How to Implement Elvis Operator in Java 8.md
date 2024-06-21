---
date: 2024-06-16
category:
  - Java
  - Programming
tag:
  - Java 8
  - Elvis Operator
---
# 如何在Java 8中实现Elvis操作符 | Baeldung

## 1. 引言

在Java 8中，并没有像Groovy或Kotlin中内置的Elvis操作符。然而，我们可以使用方法引用和三元运算符来实现我们自己的Elvis操作符。在本教程中，我们将探讨如何在Java 8中实现Elvis操作符。

## 2. 理解Elvis操作符

Elvis操作符通常在Groovy和Kotlin等语言中使用。它由`?:`符号表示，用于在原始值为`null`时提供一个默认值。

**操作符评估其左侧的表达式，如果它不是`null`，则返回它。如果左侧的表达式评估为`null`，则返回右侧的表达式。**

例如，在Kotlin中，我们可以写`val name = person.name?: "Unknown"`来返回人的名字，如果它不是`null`，或者如果它是`null`，则返回“Unknown”。

## 3. 使用三元运算符

三元运算符(`?:`)允许在表达式内进行简洁的`if`-`else`结构。虽然它不是Elvis操作符，但它实现了类似的`null`检查和默认赋值。

让我们考虑一个场景，我们有一个方法从数据库中检索用户的名称。如果找不到用户，该方法可能会返回`null`。传统上，我们会使用三元运算符进行`null`检查并分配一个默认值：

```java
User user = new User("Baeldung"); // 模拟从数据库返回的用户对象
String greeting = (user != null && user.getName() != null) ? user.getName() : "Hello, Stranger";

assertEquals("Baeldung", greeting);

User user = new User(null);
String greeting = (user != null && user.getName() != null) ? user.getName() : "Hello, Stranger";

assertEquals("Hello, Stranger", greeting);
```

三元运算符提供了一种在表达式内处理`null`检查和默认赋值的简洁而富有表现力的方式。然而，对于嵌套的`null`检查，它变得笨拙：

```java
String address = user != null ? user.getAddress() != null ? user.getAddress().getCity() : null : null;
```

## 4. 使用Optional类

Java 8中引入的Optional类是安全处理`null`引用的强大工具。它表示值的存在或不存在。

**我们可以使用像`ofNullable()`这样的方法从可能为`null`的值创建一个Optional，然后链式调用`map()`操作来在值存在时对其执行操作。** 最后，我们使用`orElse()`来指定一个默认值，以防Optional为空：

现在，我们想要将用户的名称转换为大写，如果存在，或者返回“Hello Stranger”：

```java
User user = new User("Baeldung");

String greeting = Optional.ofNullable(user.getName())
  .map(String::toUpperCase) // 如果存在则转换
  .orElse("Hello Stranger");

assertEquals("BAELDUNG", greeting);
```

**在这段代码中，`Optional.ofNullable(user.getName())`从用户的名称创建了一个Optional，处理了`null`的可能性。** 然后我们使用`map(String::toUpperCase)`在名称存在时将其转换为大写。最后，`orElse("Hello Stranger")`指定了如果名称为`null`时的默认问候语：

```java
User user = new User(null);

String greeting = Optional.ofNullable(user.getName())
  .map(String::toUpperCase)
  .orElse("Hello Stranger");

assertEquals("Hello Stranger", greeting);
```

**这种方法促进了`null`安全性，并避免了潜在的NullPointerException。**

## 5. 使用自定义方法

我们可以创建一组实用方法，它们接受目标对象和函数，如果目标对象不是`null`，则对目标对象应用该函数。**我们甚至可以将这些方法链接在一起，创建一系列`null`合并操作。**

为了创建一个模仿Elvis操作符的自定义实用方法，我们定义了一个带有泛型的通用方法来处理不同类型的值：

```java
public static `<T>` T elvis(T value, T defaultValue) {
    return value != null ? value : defaultValue;
}
```

这个方法接受两个参数：要检查`null`的值和如果值为`null`时要返回的默认值。**然后，该方法根据`null`检查返回`value`或`defaultValue`：**

```java
User user = new User("Baeldung");
String greeting = elvis(user.getName(), "Hello Stranger");
assertEquals("Baeldung", greeting);

user = new User(null);
String greeting = elvis(user.getName(), "Hello Stranger");
assertEquals("Hello Stranger", greeting);
```

使用像`elvis()`这样的自定义实用方法比嵌套的三元运算符有几个好处。**它通过将`null`检查逻辑封装在单独的方法中来提高代码组织，从而提高代码的可读性和可维护性。**

让我们看看这个例子：

```java
User user = new User("Baeldung");
user.setAddress(new Address("Singapore"));

String cityName = elvis(elvis(user, new User("Stranger")).getAddress(), new Address("Default City")).getCity();

assertEquals("Singapore", cityName);
```

首先，我们检查`user`是否为`null`。如果是，它返回一个带有默认值“Stranger”的新User对象。接下来，我们从user对象中检索`address`。如果`getAddress()`返回`null`，我们返回一个带有默认城市名称“Default City”的新Address对象：

```java
User user = new User("Baeldung");
user.setAddress(null);

String cityName = elvis(elvis(user, new User("Stranger")).getAddress(), new Address("Default City")).getCity();

assertEquals("Default City", cityName);
```

**这种使用`elvis()`方法的链接方法允许我们以简洁和可读的方式处理嵌套的`null`检查，确保我们的代码在不使用冗长的if-else结构的情况下优雅地处理`null`场景。**

## 6. 结论

在本文中，我们使用Optional类和三元运算符在Java 8中实现了Elvis操作符。此外，我们创建了一个自定义实用方法`elvis()`来处理`null`检查和默认赋值。通过将逻辑封装在方法中，我们可以提高代码的可读性和可维护性，同时促进代码的可重用性。

如常，示例的源代码可在GitHub上找到。

评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。