---
date: 2024-06-25
category:
  - Java
  - Programming
tag:
  - null
  - default value
  - NullPointerException
head:
  - - meta
    - name: keywords
      content: Java, null, default value, NullPointerException, programming
---
# Java中将空值转换为默认值

在1965年，托尼·霍尔（Tony Hoare）引入了空引用的概念。从那时起，无数小时被用于阅读日志并尝试找到NullPointerExceptions的来源。这种异常如此普遍，以至于我们通常称之为NPE。

在本教程中，我们将学习如何缓解这个问题。我们将回顾几种简化将null转换为默认值的技术。

## 2. 简单的if语句

处理转换的最简单方法是使用if语句。它们是基本的语言结构，并且由于对不同经验和水平的开发人员都很清晰，因此具有优势。这种方法最好的地方在于它很冗长，这同时也是最坏的地方：

```java
@ParameterizedTest
@ArgumentsSource(ObjectsProvider.class)
void givenIfWhenNotNullThenReturnsDefault(String givenValue, String defaultValue) {
    String actual = defaultValue;
    if (givenValue != null) {
        actual = givenValue;
    }
    assertDefaultConversion(givenValue, defaultValue, actual);
}
```

因为我们完全控制逻辑，我们可以轻松地更改、提取和重用它。此外，如果我们想要，我们可以使它变得懒惰：

```java
@ParameterizedTest
@ArgumentsSource(ObjectsSupplierProvider.class)
void givenIfWhenNotNullThenReturnsDefault(String givenValue, String expected, Supplier`````<String>````` expensiveSupplier) {
    String actual;
    if (givenValue != null) {
        actual = givenValue;
    } else {
        actual = expensiveSupplier.get();
    }
    assertDefaultConversion(givenValue, expected, actual);
}
```

如果操作相当简单，我们可以使用三元运算符使它们更加内联。Elvis运算符没有进入Java，但我们仍然可以改进代码：

```java
@ParameterizedTest
@ArgumentsSource(ObjectsProvider.class)
void givenTernaryWhenNotNullThenReturnsDefault(String givenValue, String defaultValue) {
    String actual = givenValue != null ? givenValue : defaultValue;
    assertDefaultConversion(givenValue, defaultValue, actual);
}
```

它还允许懒惰的方法，因为只有所需的表达式被评估：

```java
@ParameterizedTest
@ArgumentsSource(ObjectsSupplierProvider.class)
void givenLazyTernaryWhenNotNullThenReturnsDefault(String givenValue, String expected, Supplier`````<String>````` expensiveSupplier) {
    String actual = givenValue != null ? givenValue : expensiveSupplier.get();
    assertDefaultConversion(givenValue, expected, actual);
}
```

我们可以将这个逻辑提取到一个具有良好名称的单独方法中，使我们的代码更易读。然而，Java和一些外部库已经做到了这一点。

## 3. Java Objects

Java 9为我们提供了两个实用方法：Objects.requireNonNullElse和Objects.requireNonNullElseGet。这些方法的实现类似于我们回顾过的。总的来说，它们提供了更好的API并使代码自我解释：

```java
@ParameterizedTest
@ArgumentsSource(ObjectsProvider.class)
void givenObjectsWhenNotNullThenReturnsDefault(String givenValue, String defaultValue) {
    String actual = requireNonNullElse(givenValue, defaultValue);
    assertDefaultConversion(givenValue, defaultValue, actual);
}
```

静态导入可以帮助我们去除Objects类名以减少噪音。懒惰版本的看起来像这样：

```java
@ParameterizedTest
@ArgumentsSource(ObjectsSupplierProvider.class)
void givenLazyObjectsWhenNotNullThenReturnsDefault(String givenValue, String expected, Supplier`````<String>````` expensiveSupplier) {
    String actual = requireNonNullElseGet(givenValue, expensiveSupplier);
    assertDefaultConversion(givenValue, expected, actual);
}
```

然而，这个API仅从Java 9开始可用。同时，Java 8也提供了一些方便的工具来实现类似的结果。

## 4. Java Optional```````<T>```````

Optional```````<T>```````类背后的主要思想是解决null检查和NullPointerExceptions的问题。我们可以在文档中识别可空API，但更好的解决方案是在代码中明确显示。从某个方法中获取Optional```````<T>```````清楚地告诉我们值可能是null。此外，IDE可以使用静态分析进行通知和高亮显示。

显式null检查不是这个类的目标。然而，我们可以使用它来包装我们想要检查的值，并对其进行一些操作：

```java
@ParameterizedTest
@ArgumentsSource(ObjectsProvider.class)
void givenOptionalWhenNotNullThenReturnsDefault(String givenValue, String defaultValue) {
    String actual = Optional.ofNullable(givenValue).orElse(defaultValue);
    assertDefaultConversion(givenValue, defaultValue, actual);
}
```

懒惰版本看起来非常相似：

```java
@ParameterizedTest
@ArgumentsSource(ObjectsSupplierProvider.class)
void givenLazyOptionalWhenNotNullThenReturnsDefault(String givenValue, String expected, Supplier`````<String>````` expensiveSupplier) {
    String actual = Optional.ofNullable(givenValue).orElseGet(expensiveSupplier);
    assertDefaultConversion(givenValue, expected, actual);
}
```

为null检查创建一个单独的包装对象可能是值得怀疑的。同时，它可能对于在没有链式null检查的情况下遍历数据对象很有用：

```java
@Override
public Delivery calculateDeliveryForPerson(Long id) {
    Person person = getPersonById(id);
    if (person != null && person.getAddress() != null && person.getAddress().getZipCode() != null) {
        ZipCode zipCode = person.getAddress().getZipCode();
        String code = zipCode.getCode();
        return calculateDeliveryForZipCode(code);
    }
    return Delivery.defaultDelivery();
}
```

我们可以使用Optional.map(Function`<T, U>`)做同样的事情：

```java
public Delivery calculateDeliveryForPerson(Long id) {
    return Optional.ofNullable(getPersonById(id))
      .map(Person::getAddress)
      .map(Address::getZipCode)
      .map(ZipCode::getCode)
      .map(this::calculateDeliveryForZipCode)
      .orElse(Delivery.defaultDelivery());
}
```

及早将对象包装在Optional```````<T>```````中可以减少我们稍后必须进行的检查。

## 5. Guava库

如果所有先前的方法都不适合，例如在使用Java的早期版本时，我们可以导入Guava来获得类似的功能。让我们首先添加依赖项：

```xml
``<dependency>``
    ``<groupId>``com.google.guava``</groupId>``
    ``<artifactId>``guava``</artifactId>``
    ``<version>``33.0.0-jre``</version>``
``</dependency>``
```

它反映了Java的功能，并没有添加任何明确有用的功能。要获取提供的值如果为null，则可以使用MoreObjects：

```java
@ParameterizedTest
@ArgumentsSource(ObjectsProvider.class)
void givenGuavaWhenNotNullThenReturnsDefault(String givenValue, String defaultValue) {
    String actual = MoreObjects.firstNonNull(givenValue, defaultValue);
    assertDefaultConversion(givenValue, defaultValue, actual);
}
```

MoreObjects取代了Guava的Objects实用程序类，该类已被弃用并计划删除。但是，它不允许延迟提供默认值。此外，它提供了一个与Java同名的Optional```````<T>```````类，但位于不同的包中：

```java
@ParameterizedTest
@ArgumentsSource(ObjectsProvider.class)
void givenGuavaOptionalWhenNotNullThenReturnsDefault(String givenValue, String defaultValue) {
    String actual = com.google.common.base.Optional.fromNullable(givenValue).or(defaultValue);
    assertDefaultConversion(givenValue, defaultValue, actual);
}
```

我们也可以使用这个类来实现一系列修改：

```java
@Override
public Delivery calculateDeliveryForPerson(Long id) {
    return Optional.fromNullable(getPersonById(id))
      .transform(Person::getAddress)
      .transform(Address::getZipCode)
      .transform(ZipCode::getCode)
      .transform(this::calculateDeliveryForZipCode)
      .or(Delivery.defaultDelivery());
}
```

transform方法不允许返回null的函数。因此，我们必须确保管道中的任何方法都不返回null。总的来说，如果Java特性不可用，Guava是Java特性的一个很好的替代品，但它提供的功能比Java Optional```````<T>```````少。

## 6. Apache Commons

另一个可以用来简化我们的null检查的库是Apache Commons。让我们添加依赖项：

```xml
``<dependency>``
    ``<groupId>``org.apache.commons``</groupId>``
    ``<artifactId>``commons-lang3``</artifactId>``
    ``<version>``3.14.0``</version>``
``</dependency>``
```

然而，它只提供了一些简单的方法，用于从几个参数中获取第一个非null值：

```java
@ParameterizedTest
@ArgumentsSource(ObjectsProvider.class)
void givenApacheWhenNotNullThenReturnsDefault(String givenValue, String defaultValue) {
    String actual = ObjectUtils.firstNonNull(givenValue, defaultValue);
    assertDefaultConversion(givenValue, defaultValue, actual);
}
```

懒惰版本的API有点不方便，因为它需要Supplier```````<T>```````，所以我们必须包装一个值，如果我们已经有一个：

```java
@ParameterizedTest
@ArgumentsSource(ObjectsSupplierProvider.class)
void givenLazyApacheWhenNotNullThenReturnsDefault(String givenValue, String expected, Supplier`````<String>````` expensiveSupplier) {
    String actual = ObjectUtils.getFirstNonNull(() -> givenValue, expensiveSupplier);
    assertDefaultConversion(givenValue, expected, actual);
}
```

总的来说，如果由于某种原因我们无法访问Java特性，这也是一个很好的替代品。

## 7. 结论

NullPointerException是开发人员面临的最常见异常。有几种方便的方式来确保null安全性。Java API和外部库提供了许多技术。