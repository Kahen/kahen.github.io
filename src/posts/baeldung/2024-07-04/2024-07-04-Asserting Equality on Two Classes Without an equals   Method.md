---
date: 2022-04-01
category:
  - Java
  - Testing
tag:
  - equals
  - assert
  - comparison
head:
  - - meta
    - name: keywords
      content: Java, Testing, equals, assert, comparison
---

# 在没有equals()方法的情况下断言两个类的相等性

## 1. 概述

有时我们无法重写一个类中的_equals()_方法。尽管如此，我们仍然希望比较一个对象与另一个对象以检查它们是否相同。

在本教程中，我们将学习几种在不使用_equals()_方法的情况下测试两个对象相等性的方法。

## 2. 示例类

在我们深入之前，让我们创建我们将在示例中使用的类。我们将使用_Person_和_Address_类：

```java
public class Person {
    private Long id;
    private String firstName;
    private String lastName;
    private Address address;

    // getters and setters
}

public class Address {
    private Long id;
    private String city;
    private String street;
    private String country;

    // getters and setters
}
```

我们没有重写这些类中的_equals()_方法。因此，默认实现将在确定相等性时执行。换句话说，**Java在检查相等性时检查两个引用是否指向同一个对象**。

## 3. 使用AssertJ

AssertJ库提供了一种使用递归比较来比较对象的方式。使用内省，它确定应该比较哪些字段和值。

首先，要使用AssertJ库，让我们在_pom.xml_中添加assertj-core依赖项：

```xml
````<dependency>````
    ````<groupId>````org.assertj````</groupId>````
    ````<artifactId>````assertj-core````</artifactId>````
    ````<version>````3.21.0````</version>````
    ````<scope>````test````</scope>````
````</dependency>````
```

要检查两个_Person_实例中的字段是否包含相同的值，我们将在调用_isEqualTo()_方法之前使用_usingRecursiveComparison()_方法：

```java
Person expected = new Person(1L, "Jane", "Doe");
Person actual = new Person(1L, "Jane", "Doe");

assertThat(actual).usingRecursiveComparison().isEqualTo(expected);
```

此外，该算法获取实际对象的字段，然后将它们与预期对象的相应字段进行比较。**然而，比较不是对称的**。预期对象可以比实际对象有更多的字段。

此外，我们可以使用_ignoringFields()_方法忽略某个字段：

```java
Person expected = new Person(1L, "Jane", "Doe");
Person actual = new Person(2L, "Jane", "Doe");

assertThat(actual)
  .usingRecursiveComparison()
  .ignoringFields("id")
  .isEqualTo(expected);
```

此外，当我们想要比较复杂对象时，它也工作得非常有效：

```java
Person expected = new Person(1L, "Jane", "Doe");
Address address1 = new Address(1L, "New York", "Sesame Street", "United States");
expected.setAddress(address1);

Person actual = new Person(1L, "Jane", "Doe");
Address address2 = new Address(1L, "New York", "Sesame Street", "United States");
actual.setAddress(address2);

assertThat(actual)
  .usingRecursiveComparison()
  .isEqualTo(expected);
```

## 4. 使用Hamcrest

Hamcrest库使用反射来检查两个对象是否包含相同的属性。此外，它创建了一个匹配器来检查实际对象是否包含与预期对象相同的值。

首先，让我们在_pom.xml_中添加Hamcrest依赖项：

```xml
````<dependency>````
    ````<groupId>````org.hamcrest````</groupId>````
    ````<artifactId>````hamcrest````</artifactId>````
    ````<version>````2.2````</version>````
    ````<scope>````test````</scope>````
````</dependency>````
```

现在，让我们调用_samePropertyValuesAs()_方法并传递预期对象：

```java
Person expected = new Person(1L, "Jane", "Doe");
Person actual = new Person(1L, "Jane", "Doe");

MatcherAssert.assertThat(actual, samePropertyValuesAs(expected));
```

类似于前面的示例，我们可以传递我们想要忽略的字段名称。它们将从预期和实际对象中删除。

然而，在幕后，Hamcrest使用反射从特定字段获取值。**当检查相等性时，将调用每个字段的_equals()_方法**。

也就是说，**如果我们使用复杂对象，上述代码将不起作用**，因为我们也没有重写_Address_类的_equals()_方法。因此，它将检查两个_Address_引用是否指向内存中的同一个对象。因此，断言将失败。

如果我们想要比较复杂对象，**我们需要单独比较它们**：

```java
Person expected = new Person(1L, "Jane", "Doe");
Address address1 = new Address(1L, "New York", "Sesame Street", "United States");
expected.setAddress(address1);

Person actual = new Person(1L, "Jane", "Doe");
Address address2 = new Address(1L, "New York", "Sesame Street", "United States");
actual.setAddress(address2);

MatcherAssert.assertThat(actual, samePropertyValuesAs(expected, "address"));
MatcherAssert.assertThat(actual.getAddress(), samePropertyValuesAs(expected.getAddress()));
```

在这里，我们首先从第一个断言中排除了_address_字段，然后在第二个断言中进行了比较。

## 5. 使用Apache Commons Lang3

现在，让我们看看如何使用Apache Commons库来检查相等性。

我们将在_pom.xml_中添加Apache Commons Lang3依赖项：

```xml
````<dependency>````
    ````<groupId>````org.apache.commons````</groupId>````
    ````<artifactId>````commons-lang3````</artifactId>````
    ````<version>````3.14.0````</version>````
    ````<scope>````test````</scope>````
````</dependency>````
```

### 5.1. _ReflectionToStringBuilder_ 类

Apache Commons提供的其中一个类是_ReflectionToStringBuilder_类。它允许我们通过反映其字段和值来生成对象的字符串表示。

通过比较两个对象的字符串表示，我们可以在不需要使用_equals()_方法的情况下断言它们的相等性：

```java
Person expected = new Person(1L, "Jane", "Doe");
Person actual = new Person(1L, "Jane", "Doe");

assertThat(ReflectionToStringBuilder.toString(actual, ToStringStyle.SHORT_PREFIX_STYLE))
  .isEqualTo(ReflectionToStringBuilder.toString(expected, ToStringStyle.SHORT_PREFIX_STYLE));
```

**然而，我们仍然需要在我们的类中重写_toString()_方法**。

### 5.2. _EqualsBuilder_ 类

或者，我们可以使用_EqualsBuilder_类：

```java
Person expected = new Person(1L, "Jane", "Doe");
Person actual = new Person(1L, "Jane", "Doe");

assertTrue(EqualsBuilder.reflectionEquals(expected, actual));
```

它使用Java反射API比较两个对象的字段。**需要注意的是，_reflectionEquals()_方法使用浅相等检查**。

因此，当比较两个复杂对象时，我们需要忽略这些字段并单独比较它们：

```java
Person expected = new Person(1L, "Jane", "Doe");
Address address1 = new Address(1L, "New York", "Sesame Street", "United States");
expected.setAddress(address1);

Person actual = new Person(1L, "Jane", "Doe");
Address address2 = new Address(1L, "New York", "Sesame Street", "United States");
actual.setAddress(address2);

assertTrue(EqualsBuilder.reflectionEquals(expected, actual, "address"));
assertTrue(EqualsBuilder.reflectionEquals(expected.getAddress(), actual.getAddress()));
```

## 6. 使用Mockito

我们可以通过使用Mockito来断言两个实例的相等性。

我们需要mockito-core依赖项：

```xml
````<dependency>````
    ````<groupId>````org.mockito````</groupId>````
    ````<artifactId>````mockito-core````</artifactId>````
    ````<version>````5.11.0````</version>````
    ````<scope>````test````</scope>````
````</dependency>````
```

现在，我们可以使用Mockito的_ReflectionEquals_类：

```java
Person expected = new Person(1L, "Jane", "Doe");
Person actual = new Person(1L, "Jane", "Doe");

assertTrue(new ReflectionEquals(expected).matches(actual));
```

**此外，当检查相等性时，将调用Apache Commons库中的_EqualsBuilder_**。

再次，我们将需要使用与_EqualsBuilder_相同的修补程序来比较复杂对象：

```java
Person expected = new Person(1L, "Jane", "Doe");
Address address1 = new Address(1L, "New York", "Sesame Street", "United States");
expected.setAddress(address1);

Person actual = new Person(1L, "Jane", "Doe");
Address address2 = new Address(1L, "New York", "Sesame Street", "United States");
actual.setAddress(address2);

assertTrue(new ReflectionEquals(expected, "address").matches(actual));
assertTrue(new ReflectionEquals(expected.getAddress()).matches(actual.getAddress()));
```

## 7. 结论

在本文中，我们学习了如何在不使用_equals()